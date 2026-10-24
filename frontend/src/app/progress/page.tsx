"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { useCourse } from "@/app/hooks/useCourse";
import { SUBJECT_BANKS, subjectReadiness, READY_GATE, type SubjectReadiness } from "@/app/lib/readiness";
import { getProgress, getHistory, type ProgressSummary, type SessionRecord } from "@/app/lib/progress";
import { Icon } from "@/app/components/Icon";

function Dial({ pct }: { pct: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  const colour = pct >= READY_GATE ? "#7fd6a2" : pct >= 60 ? "#e8c877" : pct >= 30 ? "#e8a657" : "#e8775a";
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
      <circle cx="40" cy="40" r={r} fill="none" stroke="#243640" strokeWidth="8" />
      <circle cx="40" cy="40" r={r} fill="none" stroke={colour} strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      <text x="40" y="40" transform="rotate(90 40 40)" textAnchor="middle" dominantBaseline="central" fill="#dfeef2" fontSize="18" fontWeight="700" fontFamily="var(--font-spectral)">{pct}%</text>
    </svg>
  );
}

export default function Progress() {
  const { userName, loading } = useAuthGuard();
  const { syllabus } = useCourse();
  const [data, setData] = useState<Record<string, SubjectReadiness | null>>({});
  const [open, setOpen] = useState<string | null>(null);
  const [prog, setProg] = useState<ProgressSummary | null>(null);
  const [hist, setHist] = useState<SessionRecord[]>([]);

  const subjects = useMemo(() => syllabus.filter((s) => SUBJECT_BANKS[s.id]), [syllabus]);

  useEffect(() => {
    const read = () => { setProg(getProgress()); setHist(getHistory()); };
    read();
    window.addEventListener("progress-change", read);
    return () => window.removeEventListener("progress-change", read);
  }, []);

  // readiness reads localStorage → compute after mount
  useEffect(() => {
    const next: Record<string, SubjectReadiness | null> = {};
    for (const s of subjects) next[s.id] = subjectReadiness(s.id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(next);
  }, [subjects]);

  const titleFor = (subjectId: string, sectionId: string) =>
    subjects.find((s) => s.id === subjectId)?.sections.find((x) => x.id === sectionId)?.title ?? sectionId;
  const subjectTitle = (subjectId: string) => subjects.find((s) => s.id === subjectId)?.title ?? subjectId;

  // Strongest / weakest subject from the readiness dials (only rated subjects).
  const rated = subjects
    .map((s) => ({ s, r: data[s.id] }))
    .filter((x): x is { s: typeof subjects[number]; r: SubjectReadiness } => !!x.r && x.r.seen > 0);
  const strongest = rated.length ? rated.reduce((a, b) => (b.r.pct > a.r.pct ? b : a)) : null;
  const weakest = rated.length ? rated.reduce((a, b) => (b.r.pct < a.r.pct ? b : a)) : null;

  if (loading)
    return (
      <div className="min-h-screen bg-chart-ground flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-chart-ground flex">
      <Sidebar active="/progress" userName={userName} />
      <main className="flex-1 md:ml-64 pt-14 md:pt-0 overflow-auto">
        <div className="px-5 sm:px-10 pt-10 pb-5 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-gold"><Icon name="chart" size={22} /></span>
            <h1 className="text-3xl font-black text-white">Briefing</h1>
          </div>
          <p className="text-zinc-500 text-sm mt-1">
            Your readiness and attempt history, built from every question you answer. Aim for <span className="text-green-400 font-semibold">{READY_GATE}%</span> in a subject before you sit the real exam.
          </p>
        </div>

        {prog && (
          <div className="px-5 sm:px-10 pt-8 max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Questions Worked", value: prog.attempted.toLocaleString() },
                { label: "Overall Accuracy", value: `${prog.accuracy}%` },
                { label: "Topics Studied", value: String(prog.topicsStudied) },
                { label: "Day Streak", value: `${prog.streak}` },
              ].map((c) => (
                <div key={c.label} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
                  <div className="text-2xl font-display text-gold">{c.value}</div>
                  <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1">{c.label}</div>
                </div>
              ))}
            </div>
            <p className="text-zinc-600 text-xs mt-3">
              {prog.firstSeen ? `Studying since ${new Date(prog.firstSeen).toLocaleDateString()} · ` : ""}
              {prog.activeDays} active day{prog.activeDays === 1 ? "" : "s"}
              {prog.lastSeen ? ` · last active ${new Date(prog.lastSeen).toLocaleDateString()}` : ""}
            </p>
          </div>
        )}

        {/* Strongest / weakest reference */}
        {(strongest || weakest) && (
          <div className="px-5 sm:px-10 pt-8 max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strongest && (
                <div className="bg-zinc-950 border border-green-500/25 rounded-2xl p-5">
                  <div className="text-[11px] uppercase tracking-wider text-green-400/80">Strongest subject</div>
                  <div className="text-white font-bold mt-1">{strongest.s.title}</div>
                  <div className="text-zinc-500 text-xs mt-0.5">{strongest.r.pct}% ready · {strongest.r.seen}/{strongest.r.total} attempted</div>
                </div>
              )}
              {weakest && (
                <div className="bg-zinc-950 border border-red-500/25 rounded-2xl p-5">
                  <div className="text-[11px] uppercase tracking-wider text-red-400/80">Needs the most work</div>
                  <div className="text-white font-bold mt-1">{weakest.s.title}</div>
                  <div className="text-zinc-500 text-xs mt-0.5">{weakest.r.pct}% ready · {weakest.r.seen}/{weakest.r.total} attempted</div>
                  <Link href={`/study/${weakest.s.id}`} className="inline-block mt-2 text-[11px] text-yellow-400/80 hover:text-yellow-400">Go study it →</Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Attempt history — quizzes & mock exams */}
        {hist.length > 0 && (
          <div className="px-5 sm:px-10 pt-8 max-w-4xl">
            <h2 className="text-white font-bold text-sm mb-3">Recent attempts</h2>
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl divide-y divide-zinc-900 overflow-hidden">
              {hist.slice(0, 40).map((h, i) => {
                const pct = h.total ? Math.round((h.score / h.total) * 100) : 0;
                const pass = pct >= READY_GATE;
                return (
                  <div key={i} className="flex items-center gap-3 px-4 sm:px-5 py-3">
                    <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${h.kind === "mock" ? "bg-yellow-400/15 text-yellow-400" : "bg-zinc-800 text-zinc-400"}`}>
                      {h.kind === "mock" ? "Mock" : "Quiz"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{subjectTitle(h.subjectId)}{h.label ? <span className="text-zinc-500"> · {h.label}</span> : null}</div>
                      <div className="text-[11px] text-zinc-600">{new Date(h.ts).toLocaleDateString()} {new Date(h.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-sm font-bold tabular-nums ${pass ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</div>
                      <div className="text-[11px] text-zinc-600 tabular-nums">{h.score}/{h.total}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-zinc-600 text-xs mt-2">Your last {Math.min(hist.length, 40)} attempt{hist.length === 1 ? "" : "s"} — use the pattern to see where to focus.</p>
          </div>
        )}

        <div className="px-5 sm:px-10 py-8 space-y-4 max-w-4xl">
          <h2 className="text-white font-bold text-sm">Readiness by subject &amp; topic</h2>
          {subjects.map((s) => {
            const r = data[s.id];
            const pct = r?.pct ?? 0;
            const ready = pct >= READY_GATE;
            const isOpen = open === s.id;
            return (
              <div key={s.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : s.id)} className="w-full flex items-center gap-5 p-5 text-left hover:bg-zinc-900/40 transition-colors">
                  <Dial pct={pct} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{s.title}</h3>
                      <span className="text-xs font-mono text-yellow-400">{s.code}</span>
                      {ready ? (
                        <span className="text-[10px] bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full font-medium">EXAM READY</span>
                      ) : (
                        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{READY_GATE - pct}% to go</span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">
                      {r ? `${r.seen} of ${r.total} questions attempted · ${r.topics.length} topics` : "No attempts yet — start a quiz or mock exam."}
                    </div>
                    {/* gate bar */}
                    <div className="mt-2 h-2 bg-zinc-800 rounded-full relative overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: ready ? "#7fd6a2" : "#e8c877" }} />
                      <div className="absolute top-0 bottom-0 w-0.5 bg-success/70" style={{ left: `${READY_GATE}%` }} title={`${READY_GATE}% gate`} />
                    </div>
                  </div>
                  <span className="text-zinc-600 text-sm">{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && r && (
                  <div className="border-t border-zinc-900 p-5 space-y-2">
                    {[...r.topics].sort((a, b) => a.pct - b.pct).map((t) => (
                      <div key={t.sectionId} className="flex items-center gap-3">
                        <div className="w-28 sm:w-56 shrink-0 text-xs text-zinc-400 truncate">{titleFor(s.id, t.sectionId)}</div>
                        <div className="flex-1 h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${t.pct}%`, background: t.pct >= READY_GATE ? "#7fd6a2" : t.pct >= 50 ? "#e8c877" : t.pct >= 25 ? "#e8a657" : "#e8775a" }} />
                        </div>
                        <div className="w-10 text-right text-xs text-zinc-500">{t.pct}%</div>
                        <Link href={`/study/${s.id}/${t.sectionId}?tab=quiz`} className="text-[11px] text-yellow-400/70 hover:text-yellow-400 shrink-0">practise →</Link>
                      </div>
                    ))}
                    <div className="pt-2 flex gap-2">
                      <Link href={`/exams/${s.id}`} className="px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold">Sit a mock exam →</Link>
                      <Link href={`/exam-brief`} className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs">Exam-day brief</Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {subjects.length === 0 && <div className="text-zinc-600 text-sm">No subjects with question banks in this course yet.</div>}
        </div>
      </main>
    </div>
  );
}
