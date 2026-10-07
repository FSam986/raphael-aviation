"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { useCourse } from "@/app/hooks/useCourse";
import { subjectContent } from "@/app/lib/subjectContent";
import { getBriefReference } from "@/app/data/exam-brief-reference";

// Exam-Day Brief — a last-minute cram summary per subject, assembled from the
// mustKnow + traps already written in every section note. No new content to
// maintain: it re-uses the study notes.

export default function ExamBrief() {
  const { userName, loading } = useAuthGuard();
  const { syllabus } = useCourse();

  // subjects that actually have content getters
  const readySubjects = useMemo(
    () => syllabus.filter((s) => subjectContent(s.id)),
    [syllabus]
  );
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const active = subjectId ?? readySubjects[0]?.id ?? null;
  const subject = readySubjects.find((s) => s.id === active);

  const brief = useMemo(() => {
    if (!subject) return [];
    const content = subjectContent(subject.id);
    if (!content) return [];
    return subject.sections
      .map((sec) => {
        const note = content.note(sec.id);
        return note && (note.mustKnow.length || note.traps.length)
          ? { id: sec.id, title: sec.title, mustKnow: note.mustKnow, traps: note.traps }
          : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [subject]);

  const totalPoints = brief.reduce((n, b) => n + b.mustKnow.length + b.traps.length, 0);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/exam-brief" userName={userName} />
      <main className="flex-1 ml-64 overflow-auto">
        <div className="px-10 pt-10 pb-5 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <h1 className="text-3xl font-black text-white">Exam-Day Brief</h1>
          </div>
          <p className="text-zinc-500 text-sm mt-1">
            Your last-minute cram sheet — every must-know fact and trap for the subject, on one page.
          </p>
        </div>

        {/* subject tabs */}
        <div className="px-10 pt-5 flex flex-wrap gap-2">
          {readySubjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubjectId(s.id)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                s.id === active ? "bg-yellow-400 text-black font-bold" : "bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              <span className="font-mono text-xs mr-1.5 opacity-70">{s.code}</span>
              {s.title}
            </button>
          ))}
        </div>

        {subject && (
          <div className="px-10 py-6 no-copy" onContextMenu={(e) => e.preventDefault()}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-zinc-500 text-xs">
                {brief.length} topics · {totalPoints} key points. Skim top-to-bottom on the morning of your {subject.title} exam.
              </p>
              <span className="text-zinc-700 text-[11px]">🔒 For your personal use only</span>
            </div>

            {/* Quick reference — formulas, conversions, V-speeds, key values */}
            {(() => { const reference = getBriefReference(subject.id); return reference.length > 0 && (
              <div className="max-w-4xl mb-5">
                <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">📐 Formulas, conversions &amp; key values</div>
                <div className="grid md:grid-cols-3 gap-3">
                  {reference.map((blk) => (
                    <div key={blk.heading} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 break-inside-avoid">
                      <div className="text-white font-bold text-sm mb-2">{blk.heading}</div>
                      <dl className="space-y-1.5">
                        {blk.items.map(([k, v], j) => (
                          <div key={j} className="text-[12px] leading-snug">
                            <dt className="text-yellow-400/80 font-medium">{k}</dt>
                            <dd className="text-zinc-400">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            ); })()}

            {brief.length === 0 ? (
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 text-center text-zinc-500 text-sm">
                No cram notes for this subject yet.
              </div>
            ) : (
              <div className="space-y-4 max-w-4xl">
                {brief.map((b, i) => (
                  <section key={b.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 break-inside-avoid">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-yellow-400/60 font-mono text-xs">{i + 1}.</span>
                      <h2 className="text-white font-bold">{b.title}</h2>
                      <span className="text-zinc-700 font-mono text-[11px] ml-auto">{b.id}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {b.mustKnow.length > 0 && (
                        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3">
                          <div className="text-green-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">✓ Must know</div>
                          <ul className="space-y-1">
                            {b.mustKnow.map((p, j) => (
                              <li key={j} className="text-zinc-300 text-[12.5px] leading-snug flex gap-1.5"><span className="text-green-400/70">•</span><span>{p}</span></li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {b.traps.length > 0 && (
                        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                          <div className="text-red-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">⚠ Traps</div>
                          <ul className="space-y-1">
                            {b.traps.map((p, j) => (
                              <li key={j} className="text-zinc-300 text-[12.5px] leading-snug flex gap-1.5"><span className="text-red-400/70">•</span><span>{p}</span></li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
