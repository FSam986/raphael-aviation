"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { subjectContent } from "@/app/lib/subjectContent";
import { atgFiguresForSection, type FigureDef } from "@/app/lib/figures";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import {
  loadPlan, loadProgress, saveProgress, completeDay, recordDrill, awardBadge, currentDayIndex,
  type CoachPlan, type CoachProgress, type StudyUnit,
} from "@/app/lib/coachPlan";
import { pick as pickMsg, PILOT_BREAK, scheduleDailyStreak, notifyPermission } from "@/lib/notify";

const PASS = 90;
const MAX_ROUNDS = 4;
const DRILL_N = 8;
const SECS_PER_SLIDE = 22;
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

// ── In-progress session snapshot (so the Back button doesn't lose the day) ──
const SESSION_KEY = "coach-session-v1";
interface SessionSnap {
  dayIdx: number;
  slides: Slide[];
  answers: Record<string, { opt: "a" | "b" | "c" | "d"; correct: boolean }>;
  active: number;
  mastered: string[];
  savedAt: number;
}
function loadSession(): SessionSnap | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionSnap) : null;
  } catch {
    return null;
  }
}
function saveSession(s: SessionSnap) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  } catch {
    /* ignore storage failures */
  }
}
function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

type Slide =
  | { id: string; kind: "intro"; dayIdx: number; topics: number; reviewN: number }
  | { id: string; kind: "mustknow"; unit: StudyUnit; mustKnow: string[]; cards: AirLawFlashcard[]; figures: FigureDef[] }
  | { id: string; kind: "question"; unit: StudyUnit | null; q: AirLawQuestion; roundKey: string; label: string }
  | { id: string; kind: "score"; unit: StudyUnit; roundKey: string; round: number; qids: string[]; resolved: boolean }
  | { id: string; kind: "badge"; emoji: string; title: string; sub: string }
  | { id: string; kind: "break"; title: string; body: string }
  | { id: string; kind: "done" };

export default function CoachSessionReel() {
  const { userName, loading } = useAuthGuard();
  const router = useRouter();
  const [plan, setPlan] = useState<CoachPlan | null>(null);
  const progressRef = useRef<CoachProgress | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const [slides, setSlides] = useState<Slide[]>([]);
  const [answers, setAnswers] = useState<Record<string, { opt: "a" | "b" | "c" | "d"; correct: boolean }>>({});
  const [active, setActive] = useState(0);
  const [masteredNow, setMasteredNow] = useState<Set<string>>(new Set());
  const [streakEnd, setStreakEnd] = useState<{ streak: number; xp: number } | null>(null);
  const [pendingResume, setPendingResume] = useState<SessionSnap | null>(null);
  const idc = useRef(0);
  const nid = () => `s${idc.current++}`;
  const scroller = useRef<HTMLDivElement | null>(null);
  const pendingScrollRef = useRef<number | null>(null);

  // Build the day's reel from scratch and show it.
  function buildAndHydrate(p: CoachPlan, idx: number) {
    idc.current = 0;
    const day = p.days[idx];
    const out: Slide[] = [{ id: nid(), kind: "intro", dayIdx: idx, topics: day.units.length, reviewN: 0 }];
    if (day.reviewUnits.length) {
      const rq: AirLawQuestion[] = [];
      for (const u of day.reviewUnits) { const bank = subjectContent(u.subjectId)?.questions(u.sectionId) ?? []; if (bank.length) rq.push(shuffle(bank)[0]); }
      shuffle(rq).slice(0, 8).forEach((q) => out.push({ id: nid(), kind: "question", unit: null, q, roundKey: "review", label: "Memory check" }));
      (out[0] as Extract<Slide, { kind: "intro" }>).reviewN = Math.min(8, rq.length);
    }
    day.units.forEach((u, ui) => {
      const content = subjectContent(u.subjectId);
      const note = content?.note(u.sectionId);
      const cards = content?.flashcards(u.sectionId) ?? [];
      // Surface up to 4 illustrations for this topic, rotated each session.
      const figs = shuffle(atgFiguresForSection(u.sectionId)).slice(0, 4);
      out.push({ id: nid(), kind: "mustknow", unit: u, mustKnow: note?.mustKnow ?? [], cards, figures: figs });
      const bank = shuffle(content?.questions(u.sectionId) ?? []).slice(0, DRILL_N);
      const roundKey = `${u.sectionId}#1`;
      const qids: string[] = [];
      bank.forEach((q) => { const id = nid(); qids.push(id); out.push({ id, kind: "question", unit: u, q, roundKey, label: u.sectionTitle }); });
      out.push({ id: nid(), kind: "score", unit: u, roundKey, round: 1, qids, resolved: false });
      if ((ui + 1) % 2 === 0 && ui < day.units.length - 1) {
        const [title, body] = pickMsg(PILOT_BREAK);
        out.push({ id: nid(), kind: "break", title, body });
      }
    });
    if (day.units.length === 0) {
      const rq: AirLawQuestion[] = [];
      for (const u of day.reviewUnits) { const bank = subjectContent(u.subjectId)?.questions(u.sectionId) ?? []; if (bank.length) rq.push(...shuffle(bank).slice(0, 2)); }
      shuffle(rq).slice(0, 20).forEach((q) => out.push({ id: nid(), kind: "question", unit: null, q, roundKey: "review", label: day.kind === "mock" ? "Final mock" : "Review" }));
    }
    out.push({ id: nid(), kind: "done" });
    setSlides(out); setHydrated(true);
  }

  useEffect(() => {
    const p = loadPlan(); const pr = loadProgress();
    // Old-schema plan (no reviewUnits) → send back to rebuild.
    if (!p || !p.days?.every((d) => Array.isArray(d.reviewUnits))) { router.replace("/coach"); return; }
    progressRef.current = pr;
    const idx = currentDayIndex(p, pr);
    setPlan(p); setDayIdx(idx);

    // Resume an unfinished session for this same day if one was saved.
    const snap = loadSession();
    if (snap && snap.dayIdx === idx && snap.slides?.length) {
      setPendingResume(snap); // ask the user; don't hydrate yet
      return;
    }
    buildAndHydrate(p, idx);
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist the live session so leaving mid-day can be resumed.
  useEffect(() => {
    if (!hydrated || streakEnd || !slides.length) return;
    saveSession({ dayIdx, slides, answers, active, mastered: [...masteredNow], savedAt: Date.now() });
  }, [hydrated, streakEnd, slides, answers, active, masteredNow, dayIdx]);

  // After resuming, jump back to the saved slide.
  useEffect(() => {
    if (!hydrated || pendingScrollRef.current == null) return;
    const target = pendingScrollRef.current;
    pendingScrollRef.current = null;
    requestAnimationFrame(() => { const el = scroller.current; if (el) el.scrollTop = target * el.clientHeight; });
  }, [hydrated]);

  function resumeSession(snap: SessionSnap) {
    let max = 0;
    for (const s of snap.slides) { const n = parseInt(s.id.slice(1), 10); if (!isNaN(n) && n > max) max = n; }
    idc.current = max + 1;
    setSlides(snap.slides);
    setAnswers(snap.answers);
    setMasteredNow(new Set(snap.mastered));
    setActive(snap.active);
    pendingScrollRef.current = snap.active;
    setPendingResume(null);
    setHydrated(true);
  }
  function restartSession() {
    clearSession();
    setPendingResume(null);
    if (plan) buildAndHydrate(plan, dayIdx);
  }

  // active slide from scroll position
  function onScroll() {
    const el = scroller.current; if (!el) return;
    setActive(Math.round(el.scrollTop / el.clientHeight));
  }

  // resolve a score slide when it becomes active
  useEffect(() => {
    const s = slides[active]; if (!s || s.kind !== "score" || s.resolved) return;
    const total = s.qids.length || 1;
    const got = s.qids.filter((qid) => answers[qid]?.correct).length;
    const acc = Math.round((got / total) * 100);
    const pr = progressRef.current!;
    let merged = recordDrill(pr, s.unit.subjectId, s.unit.sectionId, acc);

    setSlides((prev) => {
      const copy = prev.map((x) => (x.id === s.id ? { ...x, resolved: true } as Slide : x));
      const at = copy.findIndex((x) => x.id === s.id);
      const inserts: Slide[] = [];
      if (acc >= PASS) {
        if (!masteredNow.has(s.unit.sectionId)) {
          const [p2, badge] = awardBadge(merged, `topic:${s.unit.sectionId}`, `${s.unit.sectionTitle} — Expert`, "🎓");
          merged = p2;
          if (badge) inserts.push({ id: nid(), kind: "badge", emoji: badge.emoji, title: badge.title, sub: `${s.unit.subjectTitle} · +30 XP` });
          setMasteredNow((m) => new Set(m).add(s.unit.sectionId));
        }
      } else if (s.round < MAX_ROUNDS) {
        // re-run this topic to reach 90%
        const content = subjectContent(s.unit.subjectId);
        const bank = shuffle(content?.questions(s.unit.sectionId) ?? []).slice(0, DRILL_N);
        const roundKey = `${s.unit.sectionId}#${s.round + 1}`;
        const qids: string[] = [];
        bank.forEach((q) => { const id = nid(); qids.push(id); inserts.push({ id, kind: "question", unit: s.unit, q, roundKey, label: s.unit.sectionTitle }); });
        inserts.push({ id: nid(), kind: "score", unit: s.unit, roundKey, round: s.round + 1, qids, resolved: false });
      }
      if (inserts.length) copy.splice(at + 1, 0, ...inserts);
      return copy;
    });
    progressRef.current = merged; saveProgress(merged);
  }, [active, slides, answers]); // eslint-disable-line react-hooks/exhaustive-deps

  function pick(slideId: string, q: AirLawQuestion, opt: "a" | "b" | "c" | "d") {
    setAnswers((a) => (a[slideId] ? a : { ...a, [slideId]: { opt, correct: q.correctAnswer === opt } }));
  }
  function scrollTo(i: number) {
    const el = scroller.current; if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: "smooth" });
  }
  function finish() {
    const pr = progressRef.current!;
    const bonus = masteredNow.size * 30;
    const withDay = completeDay(pr, dayIdx, 40 + bonus);
    saveProgress(withDay); progressRef.current = withDay;
    clearSession(); // day finished — nothing to resume
    setStreakEnd({ streak: withDay.streak, xp: 40 + bonus });
    // Keep the streak alive — reschedule tomorrow's pilot-themed reminder.
    try { if (notifyPermission() === "granted") scheduleDailyStreak(18, 0); } catch { /* ignore */ }
  }

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading…</div></div>;

  // Resume prompt — shown when an unfinished session for today was found.
  if (pendingResume) {
    const answered = Object.keys(pendingResume.answers).length;
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-4">⏸️</div>
          <h1 className="text-2xl font-black text-white">Continue where you left off?</h1>
          <p className="text-zinc-400 text-sm mt-2">
            You have an unfinished Day {pendingResume.dayIdx + 1} session
            {answered > 0 ? ` — ${answered} question${answered === 1 ? "" : "s"} answered` : ""}
            {pendingResume.mastered.length > 0 ? `, ${pendingResume.mastered.length} topic${pendingResume.mastered.length === 1 ? "" : "s"} mastered` : ""}.
          </p>
          <button onClick={() => resumeSession(pendingResume)} className="mt-6 w-full px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl">
            Continue previous session →
          </button>
          <button onClick={restartSession} className="mt-3 w-full px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm rounded-xl">
            Start a new session
          </button>
          <Link href="/coach" className="block text-zinc-600 hover:text-zinc-400 text-sm mt-4">← Back to my plan</Link>
        </div>
      </div>
    );
  }

  if (!hydrated) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading…</div></div>;

  const topics = plan!.days[dayIdx].units;
  const remaining = Math.max(0, slides.length - active - 1);
  const minsLeft = Math.max(1, Math.round((remaining * SECS_PER_SLIDE) / 60));
  const pct = slides.length > 1 ? Math.round((active / (slides.length - 1)) * 100) : 0;

  if (streakEnd) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🔥</div>
          <h1 className="text-3xl font-black text-white">Day {dayIdx + 1} complete</h1>
          <p className="text-zinc-400 mt-2">Streak {streakEnd.streak} · +{streakEnd.xp} XP · {masteredNow.size} topic{masteredNow.size === 1 ? "" : "s"} mastered</p>
          <Link href="/coach" className="inline-block mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl">Back to my plan →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* top progress + map + timer */}
      <div className="absolute top-0 inset-x-0 z-30 px-4 pt-3 pb-2 bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
        <div className="flex items-center gap-3">
          <Link href="/coach" className="pointer-events-auto flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium">← Back</Link>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
          <div className="text-[11px] text-zinc-400 tabular-nums">~{minsLeft}m left</div>
        </div>
        {topics.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            {topics.map((t) => (
              <div key={t.sectionId} className={`h-1.5 flex-1 rounded-full ${masteredNow.has(t.sectionId) ? "bg-green-400" : "bg-white/15"}`} title={t.sectionTitle} />
            ))}
            <span className="text-[10px] text-zinc-500 ml-1">{masteredNow.size}/{topics.length} topics</span>
          </div>
        )}
      </div>

      {/* reel */}
      <div ref={scroller} onScroll={onScroll} className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {slides.map((s, i) => (
          <section key={s.id} className="h-[100dvh] w-full snap-start flex flex-col items-center justify-center px-6 relative">
            <div className="w-full max-w-xl">
              {s.kind === "intro" && (
                <div className="text-center">
                  <div className="text-5xl mb-4">🚀</div>
                  <h1 className="text-2xl font-black">Day {s.dayIdx + 1}</h1>
                  <p className="text-zinc-400 mt-2 text-sm">{s.reviewN > 0 ? `${s.reviewN}-question memory check, then ` : ""}{s.topics} new topic{s.topics === 1 ? "" : "s"} to master.</p>
                  <p className="text-zinc-600 text-xs mt-6">Swipe up to begin ↑</p>
                </div>
              )}

              {s.kind === "mustknow" && (
                <div className="max-h-[82vh] overflow-y-auto">
                  <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider">📋 Quick memory table</div>
                  <h2 className="text-xl font-black mt-1">{s.unit.sectionTitle}</h2>
                  <p className="text-zinc-500 text-xs">{s.unit.subjectTitle} · scan this, then answer the questions</p>
                  {s.mustKnow.length > 0 && (
                    <div className="mt-4 rounded-2xl bg-green-500/5 border border-green-500/15 p-3">
                      <div className="text-green-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Must know</div>
                      <ul className="space-y-1.5">{s.mustKnow.map((m, k) => <li key={k} className="text-zinc-200 text-sm flex gap-2"><span className="text-green-400">✓</span><span>{m}</span></li>)}</ul>
                    </div>
                  )}
                  {s.cards.length > 0 && (
                    <div className="mt-3 rounded-2xl border border-zinc-800 overflow-hidden divide-y divide-zinc-900">
                      {s.cards.map((c) => (
                        <div key={c.id} className="flex gap-3 px-4 py-2.5 odd:bg-zinc-900/30">
                          <div className="text-white text-sm font-semibold w-2/5 flex-shrink-0">{c.front}</div>
                          <div className="text-zinc-400 text-sm">{c.back}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {s.figures.length > 0 && (
                    <div className="mt-3 rounded-2xl border border-zinc-800 p-3">
                      <div className="text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-2">🖼️ Illustrations</div>
                      <div className="grid grid-cols-2 gap-3">
                        {s.figures.map((f) => (
                          <figure key={f.id}>
                            <div className="bg-white rounded-lg overflow-hidden border border-zinc-800">{f.render()}</div>
                            <figcaption className="text-zinc-500 text-[11px] mt-1 leading-snug">{f.title}</figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  )}
                  {s.mustKnow.length === 0 && s.cards.length === 0 && s.figures.length === 0 && <p className="mt-4 text-zinc-400 text-sm">Focus on the key facts for this topic, then answer the questions.</p>}
                  <p className="text-zinc-600 text-xs mt-5 text-center">Swipe up to start the questions ↑</p>
                </div>
              )}

              {s.kind === "question" && (
                <QuestionSlide q={s.q} label={s.label} chosen={answers[s.id]?.opt} onPick={(opt) => pick(s.id, s.q, opt)} onNext={() => scrollTo(i + 1)} />
              )}

              {s.kind === "score" && (() => {
                const total = s.qids.length || 1; const got = s.qids.filter((qid) => answers[qid]?.correct).length; const acc = Math.round((got / total) * 100);
                const passed = acc >= PASS;
                return (
                  <div className="text-center">
                    <div className="text-5xl mb-3">{passed ? "✅" : "🔁"}</div>
                    <div className="text-3xl font-black" style={{ color: passed ? "#4ade80" : "#fbbf24" }}>{acc}%</div>
                    <div className="text-white font-bold mt-1">{s.unit.sectionTitle}</div>
                    <p className="text-zinc-400 text-sm mt-2">{passed ? "Topic mastered — 90% reached." : s.round < MAX_ROUNDS ? "Below 90% — let's run this topic again to lock it in." : "Best effort logged — moving on."}</p>
                    <button onClick={() => scrollTo(i + 1)} className="mt-5 px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl">{passed ? "Continue ↑" : s.round < MAX_ROUNDS ? "Redo topic ↑" : "Continue ↑"}</button>
                  </div>
                );
              })()}

              {s.kind === "badge" && (
                <div className="text-center">
                  <div className="text-7xl mb-3 animate-bounce">{s.emoji}</div>
                  <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Badge unlocked</div>
                  <div className="text-2xl font-black mt-1">{s.title}</div>
                  <div className="text-zinc-500 text-sm mt-1">{s.sub}</div>
                  <button onClick={() => scrollTo(i + 1)} className="mt-5 px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl">Nice ↑</button>
                </div>
              )}

              {s.kind === "break" && <BreakSlide title={s.title} body={s.body} onDone={() => scrollTo(i + 1)} />}

              {s.kind === "done" && (
                <div className="text-center">
                  <div className="text-6xl mb-4">🏁</div>
                  <h2 className="text-2xl font-black">That&apos;s today done</h2>
                  <p className="text-zinc-400 text-sm mt-2">{masteredNow.size} topic{masteredNow.size === 1 ? "" : "s"} mastered. Lock in the streak.</p>
                  <button onClick={finish} className="mt-6 px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl">Complete day 🔥</button>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function BreakSlide({ title, body, onDone }: { title: string; body: string; onDone: () => void }) {
  const [left, setLeft] = useState(30);
  useEffect(() => { if (left <= 0) return; const t = setTimeout(() => setLeft((l) => l - 1), 1000); return () => clearTimeout(t); }, [left]);
  return (
    <div className="text-center">
      <div className="text-6xl mb-3">🧑‍✈️</div>
      <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Crew rest</div>
      <div className="text-2xl font-black mt-1">{title}</div>
      <p className="text-zinc-400 text-sm mt-2 max-w-sm mx-auto">{body}</p>
      <div className="mt-5 text-4xl font-mono tabular-nums text-yellow-400">{left > 0 ? `0:${String(left).padStart(2, "0")}` : "✓ Ready"}</div>
      <button onClick={onDone} className="mt-5 px-8 py-3 bg-yellow-400 text-black font-bold rounded-xl">{left > 0 ? "Skip break — continue ↑" : "Back to it ↑"}</button>
    </div>
  );
}

function QuestionSlide({ q, label, chosen, onPick, onNext }: { q: AirLawQuestion; label: string; chosen?: "a" | "b" | "c" | "d"; onPick: (o: "a" | "b" | "c" | "d") => void; onNext: () => void }) {
  return (
    <div>
      <div className="text-yellow-400/90 text-xs font-bold uppercase tracking-wider mb-2">📝 {label}</div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="text-white font-semibold">{q.question}</div>
        <div className="mt-4 space-y-2">
          {(["a", "b", "c", "d"] as const).map((opt) => {
            const text = q[`option${opt.toUpperCase()}` as "optionA"];
            const isCorrect = q.correctAnswer === opt; const isChosen = chosen === opt;
            let cls = "bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-700";
            if (chosen) { if (isCorrect) cls = "bg-green-500/10 border-green-500/50 text-green-300"; else if (isChosen) cls = "bg-red-500/10 border-red-500/50 text-red-300"; else cls = "bg-zinc-900/40 border-zinc-800 text-zinc-500"; }
            return (
              <button key={opt} disabled={!!chosen} onClick={() => onPick(opt)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-sm border transition-colors ${cls}`}>
                <span className="font-bold uppercase">{opt}.</span><span>{text}</span>
                {chosen && isCorrect && <span className="ml-auto text-green-400">✓</span>}
                {chosen && isChosen && !isCorrect && <span className="ml-auto text-red-400">✗</span>}
              </button>
            );
          })}
        </div>
        {chosen && (
          <div className={`mt-4 rounded-xl p-4 text-sm ${chosen === q.correctAnswer ? "bg-green-500/5 border border-green-500/20 text-green-200" : "bg-red-500/5 border border-red-500/20 text-red-200"}`}>
            <div className="font-bold mb-1">{chosen === q.correctAnswer ? "Correct ✓" : `Answer: ${q.correctAnswer.toUpperCase()}`}</div>
            <div className="text-zinc-300 leading-relaxed">{q.explanation}</div>
          </div>
        )}
      </div>
      {chosen ? <button onClick={onNext} className="mt-4 w-full px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl">Next ↑</button>
        : <p className="text-zinc-600 text-xs mt-4 text-center">Pick an answer to continue</p>}
    </div>
  );
}
