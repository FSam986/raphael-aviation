"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { useCourse } from "@/app/hooks/useCourse";
import {
  buildPlan, savePlan, loadPlan, clearPlan, loadProgress, saveProgress, freshProgress,
  subjectsWithContent, currentDayIndex, planLoad, daysBetween, ymd,
  isPremium, setPremium, type CoachPlan, type CoachProgress,
} from "@/app/lib/coachPlan";
import { notifySupported, notifyPermission, requestNotifyPermission, scheduleDailyStreak, cancelDailyStreak, notifyNow, pick, PILOT_STREAK } from "@/lib/notify";

export default function CoachPage() {
  const { userName, loading } = useAuthGuard();
  const { course } = useCourse();
  const [premium, setPremiumState] = useState(false);
  const [plan, setPlan] = useState<CoachPlan | null>(null);
  const [progress, setProgress] = useState<CoachProgress>(freshProgress());
  const [hydrated, setHydrated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [remindersOn, setRemindersOn] = useState(false);

  // onboarding form
  const [examDate, setExamDate] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const subjects = useMemo(() => (hydrated ? subjectsWithContent(course) : []), [course, hydrated]);

  useEffect(() => {
    setPremiumState(isPremium());
    let p = loadPlan();
    // Discard plans saved by an older schema (missing reviewUnits) so they rebuild.
    if (p && !p.days?.every((d) => Array.isArray(d.reviewUnits))) { clearPlan(); p = null; }
    setPlan(p); setProgress(loadProgress());
    if (p) { setExamDate(p.examDate); setSelected(p.subjectIds); }
    setRemindersOn(notifyPermission() === "granted");
    setHydrated(true);
  }, []);

  async function enableReminders() {
    const ok = await requestNotifyPermission();
    setRemindersOn(ok);
    if (ok) { await scheduleDailyStreak(18, 0); notifyNow(pick(PILOT_STREAK)); }
  }
  async function disableReminders() { await cancelDailyStreak(); setRemindersOn(false); }

  if (loading || !hydrated)
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading…</div></div>;

  function generate() {
    if (!examDate || selected.length === 0) return;
    const p = buildPlan(course, examDate, selected);
    savePlan(p); setPlan(p);
    // keep streak / XP / badges, but reset day + topic progress for the new plan
    const prev = loadProgress();
    const kept: CoachProgress = { ...freshProgress(), streak: prev.streak, bestStreak: prev.bestStreak, lastDoneDate: prev.lastDoneDate, xp: prev.xp, badges: prev.badges };
    saveProgress(kept); setProgress(kept);
    setEditing(false);
  }
  function fullReset() {
    if (!confirm("Delete this plan and all progress? This cannot be undone.")) return;
    clearPlan(); setPlan(null); setProgress(freshProgress()); setSelected([]); setExamDate(""); setEditing(false);
  }

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/coach" userName={userName} />
      <main className="flex-1 ml-64 overflow-auto">{children}</main>
    </div>
  );

  /* ── Premium gate ─────────────────────────────────────────────────────── */
  if (!premium) {
    return (
      <Shell>
        <div className="max-w-xl mx-auto px-8 py-16">
          <div className="text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h1 className="text-3xl font-black text-white">Guaranteed Pass</h1>
            <p className="text-zinc-400 mt-3 leading-relaxed">Tell us your exam date. We build a day-by-day plan and walk you through it — flash the memory table, drill each topic to 90%, and re-test your memory daily. Keep the streak, pass first time.</p>
          </div>
          <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6 text-center">
            <div className="text-white font-bold text-lg">Unlock Guaranteed Pass</div>
            <div className="text-zinc-500 text-xs mt-1">Premium feature · billed separately</div>
            <button onClick={() => { setPremium(true); setPremiumState(true); }} className="mt-4 w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl transition-colors">Unlock now</button>
            <p className="text-zinc-600 text-[11px] mt-3">Payment integration is pending — this unlocks the full flow for now.</p>
          </div>
        </div>
      </Shell>
    );
  }

  /* ── Onboarding / edit (date input page) ──────────────────────────────── */
  if (!plan || editing) {
    const minDate = ymd(new Date(Date.now() + 86_400_000));
    return (
      <Shell>
        <div className="max-w-2xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-white">{plan ? "Change my plan" : "Build my plan"}</h1>
            {plan && <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs">← Back to plan</button>}
          </div>
          <p className="text-zinc-500 mt-2 text-sm">Pick your date and the subject(s) you&apos;re sitting. You can change this any time.</p>

          <div className="mt-8 rounded-2xl border border-zinc-900 bg-zinc-950 p-6">
            <label className="block text-sm font-bold text-white mb-2">1 · When is your exam?</label>
            <input type="date" min={minDate} value={examDate} onChange={(e) => setExamDate(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400" />
            {examDate && <div className="text-zinc-500 text-xs mt-2">{Math.max(1, daysBetween(ymd(new Date()), examDate))} days from today.</div>}
          </div>

          <div className="mt-5 rounded-2xl border border-zinc-900 bg-zinc-950 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-white">2 · Which paper(s)?</label>
              <div className="flex gap-2 text-xs">
                <button onClick={() => setSelected(subjects.map((s) => s.id))} className="text-yellow-400 hover:underline">Select all</button>
                <span className="text-zinc-700">·</span>
                <button onClick={() => setSelected([])} className="text-zinc-500 hover:underline">Clear</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {subjects.map((s) => {
                const on = selected.includes(s.id);
                return (
                  <button key={s.id} onClick={() => setSelected((x) => on ? x.filter((i) => i !== s.id) : [...x, s.id])}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left text-sm transition-colors ${on ? "border-yellow-400/50 bg-yellow-400/5 text-white" : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"}`}>
                    <span className="flex items-center gap-2"><span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${on ? "bg-yellow-400 border-yellow-400 text-black" : "border-zinc-600"}`}>{on ? "✓" : ""}</span>{s.title}</span>
                    <span className="text-xs text-zinc-600">{s.sections} topics</span>
                  </button>
                );
              })}
            </div>
            {selected.length === 0 && <div className="text-amber-400/80 text-xs mt-3">Pick at least one paper to build a plan.</div>}
          </div>

          <button onClick={generate} disabled={!examDate || selected.length === 0}
            className="mt-6 w-full px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-black font-bold rounded-xl transition-colors">
            {plan ? "Rebuild my plan →" : "Generate my plan →"}
          </button>
        </div>
      </Shell>
    );
  }

  /* ── Dashboard (plan exists) ──────────────────────────────────────────── */
  const load = planLoad(plan);
  const masteredCount = Object.values(progress.mastery).filter((m) => m.mastered).length;
  const todayIdx = currentDayIndex(plan, progress);
  const today = plan.days[todayIdx];
  const daysLeft = Math.max(0, daysBetween(ymd(new Date()), plan.examDate));
  const doneCount = progress.completedDays.length;
  const pct = Math.round((doneCount / plan.days.length) * 100);
  const allDone = doneCount >= plan.days.length;
  const subjTitles = subjects.filter((s) => plan.subjectIds.includes(s.id)).map((s) => s.title);

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-8 py-8">
        {/* back to date input + subjects being studied */}
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => { setExamDate(plan.examDate); setSelected(plan.subjectIds); setEditing(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs transition-colors">
            ← Change date &amp; subjects
          </button>
          <div className="text-xs text-zinc-500 truncate max-w-[55%] text-right">{subjTitles.join(" · ")}</div>
        </div>

        {/* stat bar */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Guaranteed Pass</div>
            <h1 className="text-2xl font-black text-white">Exam in {daysLeft} day{daysLeft === 1 ? "" : "s"}</h1>
            <div className="text-zinc-600 text-sm">{plan.examDate} · {plan.subjectIds.length} paper{plan.subjectIds.length === 1 ? "" : "s"}</div>
          </div>
          <div className="flex items-center gap-4 text-center">
            <div><div className="text-2xl font-black text-orange-400">🔥 {progress.streak}</div><div className="text-[10px] text-zinc-600 uppercase">streak</div></div>
            <div><div className="text-2xl font-black text-yellow-400">{progress.xp}</div><div className="text-[10px] text-zinc-600 uppercase">XP</div></div>
            <div><div className="text-2xl font-black text-green-400">🎓 {masteredCount}</div><div className="text-[10px] text-zinc-600 uppercase">mastered</div></div>
          </div>
        </div>

        {(progress.badges?.length ?? 0) > 0 && (
          <div className="mt-5">
            <div className="text-xs text-zinc-500 mb-2">Expert badges ({progress.badges.length})</div>
            <div className="flex gap-2 flex-wrap">
              {progress.badges.slice().reverse().map((b) => (
                <div key={b.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/25 text-xs text-yellow-200" title={b.title}><span>{b.emoji}</span><span className="truncate max-w-[180px]">{b.title}</span></div>
              ))}
            </div>
          </div>
        )}

        {/* overall progress */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-zinc-500 mb-1"><span>{doneCount} / {plan.days.length} days done</span><span>{pct}%</span></div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full" style={{ width: `${pct}%` }} /></div>
        </div>

        {load.tight && (
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-300">⚠ Tight timeline: ~{load.topicsPerStudyDay} topics/day. Doable if you keep the streak — or pick a slightly later date.</div>
        )}

        {/* pilot-themed reminders */}
        {notifySupported() && (
          <div className="mt-4 rounded-xl border border-zinc-900 bg-zinc-950 p-3 flex items-center justify-between gap-3">
            <div className="text-xs text-zinc-400">🔔 Streak reminders — pilot-themed nudges to keep your streak airborne{notifyPermission() === "denied" ? " (blocked in browser settings)" : ""}.</div>
            {remindersOn
              ? <button onClick={disableReminders} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex-shrink-0">Turn off</button>
              : <button onClick={enableReminders} disabled={notifyPermission() === "denied"} className="text-xs px-3 py-1.5 rounded-lg bg-yellow-400 disabled:opacity-40 text-black font-bold flex-shrink-0">Enable</button>}
          </div>
        )}

        {/* today's session */}
        {allDone ? (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/5 p-6 text-center">
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-white font-bold text-lg">Plan complete — you&apos;re exam-ready.</div>
            <Link href="/exams" className="inline-block mt-4 px-5 py-2.5 bg-yellow-400 text-black font-bold text-sm rounded-xl">Go to mock exams →</Link>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-yellow-400/80">Today · Day {todayIdx + 1}</div>
                <div className="text-white font-bold text-lg mt-0.5">{today.kind === "study" ? `Learn ${today.units.length} new topic${today.units.length === 1 ? "" : "s"}` : today.kind === "mock" ? "Final mock & full review" : "Consolidation & review"}</div>
              </div>
              <Link href="/coach/session" className="px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors">Start session →</Link>
            </div>
            {(today.reviewUnits ?? []).length > 0 && <div className="text-zinc-500 text-xs mt-3">Starts with a memory check on {(today.reviewUnits ?? []).length} earlier topic{(today.reviewUnits ?? []).length === 1 ? "" : "s"}, then {today.units.length > 0 ? "today's learning" : "revision"}.</div>}
            {today.units.length > 0 && (
              <ul className="mt-3 space-y-1">
                {today.units.map((u) => <li key={u.subjectId + u.sectionId} className="text-zinc-400 text-sm flex gap-2"><span className="text-yellow-400/60">•</span><span>{u.sectionTitle} <span className="text-zinc-600">— {u.subjectTitle}</span></span></li>)}
              </ul>
            )}
          </div>
        )}

        {/* roster */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-bold text-sm">Your full plan to exam day</h2>
            <button onClick={fullReset} className="text-xs text-zinc-600 hover:text-red-400">Delete plan</button>
          </div>
          <div className="space-y-1.5">
            {plan.days.map((d) => {
              const done = progress.completedDays.includes(d.dayIndex);
              const isToday = d.dayIndex === todayIdx && !allDone;
              const learn = d.units.map((u) => u.sectionTitle);
              const review = (d.reviewUnits ?? []).map((u) => u.sectionTitle);
              return (
                <div key={d.dayIndex} className={`rounded-xl border px-4 py-3 ${isToday ? "border-yellow-400/40 bg-yellow-400/5" : done ? "border-zinc-900 bg-zinc-950 opacity-60" : "border-zinc-900 bg-zinc-950"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${done ? "bg-green-500/20 text-green-400" : isToday ? "bg-yellow-400 text-black" : "bg-zinc-900 text-zinc-500"}`}>{done ? "✓" : d.dayIndex + 1}</span>
                    <span className="text-zinc-300 flex-shrink-0 w-16 text-xs">{d.date.slice(5)}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 uppercase tracking-wide ${d.kind === "study" ? "bg-blue-500/15 text-blue-300" : d.kind === "mock" ? "bg-red-500/15 text-red-300" : "bg-purple-500/15 text-purple-300"}`}>{d.kind === "study" ? "learn" : d.kind}</span>
                    {isToday && <span className="text-[10px] text-yellow-400 ml-auto">today</span>}
                  </div>
                  <div className="mt-1.5 pl-9 space-y-0.5">
                    {learn.length > 0 && <div className="text-xs text-zinc-300"><span className="text-yellow-400/70">Learn + drill to 90%: </span>{learn.join(", ")}</div>}
                    {review.length > 0 && <div className="text-xs text-zinc-500"><span className="text-purple-300/70">{d.kind === "mock" ? "Mock across: " : "Revise & re-test: "}</span>{d.kind === "mock" ? "all topics" : review.join(", ")}</div>}
                    {learn.length === 0 && review.length === 0 && <div className="text-xs text-zinc-600">Review earlier topics</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Shell>
  );
}
