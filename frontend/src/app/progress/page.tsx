"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { useCourse } from "@/app/hooks/useCourse";
import { SUBJECT_BANKS, subjectReadiness, READY_GATE, type SubjectReadiness } from "@/app/lib/readiness";
import { getProgress, type ProgressSummary } from "@/app/lib/progress";

function Dial({ pct }: { pct: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  const colour = pct >= READY_GATE ? "#22c55e" : pct >= 60 ? "#eab308" : pct >= 30 ? "#f97316" : "#ef4444";
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
      <circle cx="40" cy="40" r={r} fill="none" stroke="#27272a" strokeWidth="8" />
      <circle cx="40" cy="40" r={r} fill="none" stroke={colour} strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      <text x="40" y="40" transform="rotate(90 40 40)" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="18" fontWeight="800">{pct}%</text>
    </svg>
  );
}

export default function Progress() {
  const { userName, loading } = useAuthGuard();
  const { syllabus } = useCourse();
  const [data, setData] = useState<Record<string, SubjectReadiness | null>>({});
  const [open, setOpen] = useState<string | null>(null);
  const [prog, setProg] = useState<ProgressSummary | null>(null);

  const subjects = useMemo(() => syllabus.filter((s) => SUBJECT_BANKS[s.id]), [syllabus]);

  useEffect(() => {
    const read = () => setProg(getProgress());
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

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/progress" userName={userName} />
      <main className="flex-1 ml-64 overflow-auto">
        <div className="px-10 pt-10 pb-5 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <h1 className="text-3xl font-black text-white">Exam Readiness</h1>
          </div>
          <p className="text-zinc-500 text-sm mt-1">
            Built from every question you answer. Aim for <span className="text-green-400 font-semibold">{READY_GATE}%</span> in a subject before you sit the real exam.
          </p>
        </div>

        {prog && (
          <div className="px-10 pt-8 max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Questions Worked", value: prog.attempted.toLocaleString() },
                { label: "Overall Accuracy", value: `${prog.accuracy}%` },
                { label: "Topics Studied", value: String(prog.topicsStudied) },
                { label: "Day Streak", value: `${prog.streak}` },
              ].map((c) => (
                <div key={c.label} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
                  <div className="text-2xl font-black text-yellow-400">{c.value}</div>
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

        <div className="px-10 py-8 space-y-4 max-w-4xl">
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
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: ready ? "#22c55e" : "#eab308" }} />
                      <div className="absolute top-0 bottom-0 w-0.5 bg-green-400/70" style={{ left: `${READY_GATE}%` }} title={`${READY_GATE}% gate`} />
                    </div>
                  </div>
                  <span className="text-zinc-600 text-sm">{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && r && (
                  <div className="border-t border-zinc-900 p-5 space-y-2">
                    {[...r.topics].sort((a, b) => a.pct - b.pct).map((t) => (
                      <div key={t.sectionId} className="flex items-center gap-3">
                        <div className="w-56 shrink-0 text-xs text-zinc-400 truncate">{titleFor(s.id, t.sectionId)}</div>
                        <div className="flex-1 h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${t.pct}%`, background: t.pct >= READY_GATE ? "#22c55e" : t.pct >= 50 ? "#eab308" : t.pct >= 25 ? "#f97316" : "#ef4444" }} />
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
