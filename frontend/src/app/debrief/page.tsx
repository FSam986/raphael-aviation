"use client";

// Exam Debrief: upload SACAA result sheet(s) → weak topics per subject → targeted mocks.
import { useMemo, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/app/components/Sidebar";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { useCourse } from "@/app/hooks/useCourse";
import { COURSES, courseOfSubject, findSubject } from "@/app/lib/course";
import { loadSubjects, subjectContent, useSubjects } from "@/app/lib/subjectContent";
import { examBank } from "@/app/lib/examBank";
import { itemOf } from "@/app/lib/aspects";
import { SUBJECT_BANKS, loadMastery } from "@/app/lib/readiness";
import {
  parseReports, matchRows, guessSubject, guessCourse, saveDebrief, loadDebrief, clearDebrief, spotStrength,
  type WeakSpot, type Debrief,
} from "@/app/lib/debrief";

type Step = "upload" | "reading" | "review" | "saved";
interface Group { subjectId: string; scoreText?: string; spots: WeakSpot[] }
const COLORS = ["#ff6b6b", "#f0a94a", "#e2b65a", "#5fa0c8", "#c89cff", "#5fcf8f"];

const optionsFor = (subjectId: string) => {
  const s = findSubject(subjectId);
  return s ? s.sections.flatMap((x) => [{ id: x.id, t: `${x.id} · ${x.title}` }, ...x.items.map((i) => ({ id: i.id, t: `   ${i.id} · ${i.topic}` }))]) : [];
};
const titleOf = (subjectId: string, id: string) =>
  findSubject(subjectId)?.sections.flatMap((s) => [{ id: s.id, topic: s.title }, ...s.items]).find((x) => x.id === id)?.topic ?? id;

/** Section text (syllabus + notes + questions) used to place topics the syllabus wording doesn't name. */
function corpusFor(subjectId: string): Record<string, string> | undefined {
  const s = findSubject(subjectId), g = subjectContent(subjectId);
  if (!s || !g) return undefined;
  return Object.fromEntries(s.sections.map((sec) => {
    const n = g.note(sec.id);
    return [sec.id, [sec.title, ...sec.items.map((x) => x.topic), ...(n ? n.blocks.flatMap((b) => [b.heading, ...b.points]) : []), ...g.questions(sec.id).map((q) => q.question)].join(" ")];
  }));
}

export default function DebriefPage() {
  const { userName, loading } = useAuthGuard();
  const { course, setCourse, syllabus, access } = useCourse();
  const [subjectId, setSubjectId] = useState("");
  const sid = subjectId || syllabus[0]?.id;
  const subject = sid ? findSubject(sid) : undefined;
  const [step, setStep] = useState<Step>("upload");
  const [msg, setMsg] = useState(""); const [pct, setPct] = useState(0);
  const [error, setError] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [paste, setPaste] = useState("");
  const [rev, setRev] = useState(0); // bump to re-read saved debriefs
  // eslint-disable-next-line react-hooks/exhaustive-deps -- rev/step trigger a re-read of localStorage
  const saved = useMemo<Debrief | null>(() => (sid ? loadDebrief(sid) : null), [sid, step, rev]);

  const contentReady = useSubjects(sid ? [sid] : []);
  const strength = useMemo(() => {
    if (!saved || !contentReady || !subject) return null;
    const bank = examBank(subject.id);
    const m = loadMastery(SUBJECT_BANKS[subject.id]?.storeKey ?? "");
    const items = new Map(subject.sections.map((s) => [s.id, s.items]));
    return saved.spots.map((s) => spotStrength(s, bank, m, (q) => itemOf(q, items.get(q.sectionId) ?? [])));
  }, [saved, contentReady, subject]);

  async function analyse(text: string) {
    const reports = parseReports(text);
    const placed = reports.map((r) => {
      const c = guessCourse(r.licenceText) ?? course;
      return { r, subjectId: guessSubject(r.subjectText, COURSES[c].syllabus) ?? (reports.length === 1 ? sid : undefined) };
    }).filter((x): x is { r: (typeof reports)[number]; subjectId: string } => !!x.subjectId);
    await loadSubjects(placed.map((p) => p.subjectId)); // content lets us place topics the syllabus wording doesn't name
    const gs = placed.map(({ r, subjectId }) => ({ subjectId, scoreText: r.scoreText, spots: matchRows(r.rows, findSubject(subjectId)!, corpusFor(subjectId)) })).filter((g) => g.spots.length);
    if (!gs.length) { setError("We couldn't find any wrong answers on that sheet. Try a clearer photo, paste the text, or add topics yourself."); setGroups([{ subjectId: sid!, spots: [] }]); setStep("review"); return; }
    setError(""); setGroups(gs); setSubjectId(gs[0].subjectId); setStep("review");
  }

  async function onFile(f: File | undefined) {
    if (!f) return;
    setError(""); setStep("reading"); setPct(0); setMsg("");
    try {
      const { readSheet } = await import("@/app/lib/debriefRead");
      await analyse(await readSheet(f, (m, p) => { setMsg(m); if (p !== undefined) setPct(p); }));
    } catch {
      setError("Couldn't read that file. Try a sharper photo or paste the text instead."); setStep("upload");
    }
  }

  const editSpot = (gi: number, si: number, patch: Partial<WeakSpot> | null) =>
    setGroups(groups.map((g, k) => (k !== gi ? g : { ...g, spots: patch === null ? g.spots.filter((_, j) => j !== si) : g.spots.map((s, j) => (j === si ? { ...s, ...patch } : s)) })));

  function saveAll() {
    for (const g of groups) {
      if (!g.spots.length) continue;
      const merged = new Map<string, WeakSpot>();
      for (const s of g.spots) { const p = merged.get(s.target); if (p) p.weight += s.weight; else merged.set(s.target, { ...s, title: titleOf(g.subjectId, s.target) }); }
      saveDebrief({ subjectId: g.subjectId, createdAt: new Date().toISOString(), scoreText: g.scoreText, spots: [...merged.values()].sort((a, b) => b.weight - a.weight) });
    }
    const first = groups.find((g) => g.spots.length)?.subjectId ?? sid!;
    const c = courseOfSubject(first);
    if (c && c !== course) setCourse(c); // e.g. a PPL sheet while studying CPL
    setSubjectId(first);
    setRev((n) => n + 1); setStep("saved");
  }

  if (loading) return <LoadingScreen />;
  const max = Math.max(1, ...(saved?.spots ?? []).map((s) => s.weight));
  const unsure = groups.reduce((n, g) => n + g.spots.filter((s) => s.confidence === "unsure").length, 0);

  return (
    <div className="min-h-screen bg-chart-ground flex">
      <Sidebar active="/debrief" userName={userName} />
      <main className="flex-1 md:ml-64 pt-14 md:pt-0 overflow-auto">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8">
          <div className="mono text-[11px] tracking-[0.18em] uppercase text-gold">Exam Debrief</div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-chart-ink mt-1">Turn your result sheet into a plan</h1>
          <p className="text-chart-ink-dim mt-2 max-w-2xl text-sm">Upload your SACAA result sheet: a Coaching Report or a Knowledge Deficiency Report, one subject or several in one file. We read the topics you got wrong, map them to your syllabus, and build your next mock exams around them until they&apos;re strong. Everything is read on your device; nothing is uploaded.</p>

          {step !== "review" && step !== "reading" && (
            <div className="mt-6 grid md:grid-cols-2 gap-3">
              <label className="cursor-pointer rounded-2xl border-2 border-dashed border-chart-line-2 bg-chart-ground-2 p-6 text-center hover:border-gold/60 transition-colors">
                <input type="file" accept="application/pdf,image/*" className="sr-only" onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = ""; }} />
                <div className="text-chart-ink font-bold">Upload or photograph your sheet</div>
                <div className="text-chart-ink-faint text-xs mt-1">PDF or photo · read on this device</div>
              </label>
              <div className="rounded-2xl border border-chart-line bg-chart-ground-2 p-4">
                <textarea value={paste} onChange={(e) => setPaste(e.target.value)} rows={4} placeholder="…or paste the text of the sheet here" className="w-full bg-chart-ground border border-chart-line rounded-lg p-2 text-sm text-chart-ink" />
                <button disabled={!paste.trim()} onClick={() => analyse(paste)} className="mt-2 px-4 py-2 rounded-lg bg-gold text-gold-ink text-sm font-bold disabled:opacity-40">Read text</button>
              </div>
            </div>
          )}

          {step === "reading" && (
            <div className="mt-6 rounded-2xl border border-chart-line bg-chart-ground-2 p-6" role="status">
              <div className="text-chart-ink text-sm">{msg || "Starting…"}</div>
              <div className="mt-3 h-2 rounded-full bg-chart-line overflow-hidden"><div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} /></div>
              <p className="mt-2 text-xs text-chart-ink-faint">The first time takes a little longer while the text reader loads.</p>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          {step === "review" && (
            <div className="mt-6 space-y-4">
              {unsure > 0 && <p className="text-sm text-amber-300">{unsure} topic{unsure === 1 ? "" : "s"} marked <b>CONFIRM</b>: check the suggested syllabus topic and change it if needed.</p>}
              {groups.map((g, gi) => (
                <section key={gi} className="rounded-2xl border border-chart-line bg-chart-ground-2 p-5">
                  <h2 className="text-chart-ink font-bold">{findSubject(g.subjectId)?.title ?? g.subjectId}{g.scoreText ? <span className="text-chart-ink-faint font-normal"> · {g.scoreText}</span> : null}</h2>
                  <ul className="mt-2 divide-y divide-chart-line">
                    {g.spots.map((s, si) => (
                      <li key={si} className="py-3 grid sm:grid-cols-[1fr_1.3fr_auto] gap-2 items-center">
                        <div>
                          <div className="text-sm text-chart-ink">{s.label}</div>
                          <div className="text-[11px] text-chart-ink-faint">{s.weight} {s.weight === 1 ? "mark" : "marks"} lost</div>
                        </div>
                        <select aria-label={`Syllabus topic for ${s.label}`} value={s.target} onChange={(e) => editSpot(gi, si, { target: e.target.value, title: titleOf(g.subjectId, e.target.value), confidence: "exact" })}
                          className={`w-full bg-chart-ground border rounded-lg px-2 py-1.5 text-xs text-chart-ink ${s.confidence === "unsure" ? "border-amber-400/70" : "border-chart-line"}`}>
                          {optionsFor(g.subjectId).map((t) => <option key={t.id} value={t.id}>{t.t}</option>)}
                        </select>
                        <div className="flex items-center gap-2 justify-end">
                          <span className={`mono text-[10px] px-1.5 py-0.5 rounded border ${s.confidence === "unsure" ? "text-amber-300 border-amber-400/50" : "text-success border-success/40"}`}>{s.confidence === "unsure" ? "CONFIRM" : s.confidence === "exact" ? "EXACT" : "MATCHED"}</span>
                          <button onClick={() => editSpot(gi, si, null)} aria-label={`Remove ${s.label}`} className="text-chart-ink-faint hover:text-red-400 text-sm">✕</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => { const f = findSubject(g.subjectId)!.sections[0]; setGroups(groups.map((x, k) => (k === gi ? { ...x, spots: [...x.spots, { label: "Added by you", target: f.id, title: f.title, weight: 1, confidence: "exact" }] } : x))); }} className="mt-2 px-3 py-1.5 rounded-lg border border-chart-line-2 text-chart-ink text-xs">+ Add a topic</button>
                </section>
              ))}
              <div className="flex flex-wrap gap-2">
                <button disabled={!groups.some((g) => g.spots.length)} onClick={saveAll} className="px-5 py-2.5 rounded-xl bg-gold text-gold-ink text-sm font-bold disabled:opacity-40">Save debrief{groups.length > 1 ? `s (${groups.length} subjects)` : ""}</button>
                <button onClick={() => { setStep("upload"); setGroups([]); }} className="px-3 py-2 text-sm text-chart-ink-faint">Cancel</button>
              </div>
            </div>
          )}

          {step !== "review" && step !== "reading" && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <label className="text-xs text-chart-ink-faint" htmlFor="subj">Your debrief for</label>
              <select id="subj" value={sid} onChange={(e) => setSubjectId(e.target.value)} className="bg-chart-ground-2 border border-chart-line text-chart-ink text-sm rounded-lg px-3 py-2">
                {syllabus.map((s) => <option key={s.id} value={s.id}>{s.title}{loadDebrief(s.id) ? " ●" : ""}</option>)}
              </select>
            </div>
          )}

          {saved && step !== "review" && step !== "reading" && (
            <div className="mt-4 rounded-2xl border border-chart-line bg-chart-ground-2 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-chart-ink font-bold">Weak spots · {subject?.title}</h2>
                <span className="text-xs text-chart-ink-faint">Sheet saved {new Date(saved.createdAt).toLocaleDateString("en-ZA")}{saved.scoreText ? ` · ${saved.scoreText}` : ""}</span>
              </div>
              <div className="mt-4 space-y-3">
                {saved.spots.map((s, i) => {
                  const st = strength?.[i];
                  return (
                    <div key={s.target}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm text-chart-ink truncate">{s.title} <span className="mono text-[10px] text-chart-ink-faint">{s.target}</span></div>
                        <div className="text-xs tabular-nums text-chart-ink-dim shrink-0">{st?.closed ? <span className="text-success font-bold">CLOSED OUT ✓</span> : st && st.answered ? `${st.pct}% right since` : `${s.weight} lost`}</div>
                      </div>
                      <div className="h-2 mt-1 rounded-full bg-chart-line overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${st?.closed ? 100 : (s.weight / max) * 100}%`, background: st?.closed ? "var(--success)" : COLORS[i % COLORS.length] }} /></div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-chart-ink-faint">Your mock exams now give about half their questions to these topics. Each closes out once you answer 90% of its questions right (at least 5 answers).</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/exams/${saved.subjectId}`} className="px-5 py-2.5 rounded-xl bg-gold text-gold-ink font-bold text-sm">Start targeted mock →</Link>
                <button onClick={() => { clearDebrief(saved.subjectId); setRev((n) => n + 1); }} className="px-3 py-2 text-sm text-chart-ink-faint hover:text-red-400">Clear debrief</button>
              </div>
              {access === "free" && <p className="mt-3 text-xs text-chart-ink-faint">On the free plan, mocks are 10-question samples from the first topic. <Link href="/pricing" className="text-gold underline">Upgrade</Link> for full targeted papers.</p>}
            </div>
          )}
          {!saved && step === "upload" && sid && <p className="mt-4 text-sm text-chart-ink-faint">No debrief saved for {subject?.title} yet.</p>}
        </div>
      </main>
    </div>
  );
}
