"use client";

import Link from "next/link";
import { useCourse } from "@/app/hooks/useCourse";
import { subjectContent } from "@/app/lib/subjectContent";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { Icon, SUBJECT_ICON } from "@/app/components/Icon";

export default function Flashcards() {
  const { userName, loading } = useAuthGuard();
  const { syllabus } = useCourse();

  // count cards per subject from the shared content registry
  const countFor = (subject: (typeof syllabus)[number]) => {
    const content = subjectContent(subject.id);
    if (!content) return 0;
    return subject.sections.reduce((n, sec) => n + content.flashcards(sec.id).length, 0);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-chart-ground flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-chart-ground flex">
      <Sidebar active="/flashcards" userName={userName} />

      <main className="flex-1 md:ml-64 pt-14 md:pt-0 overflow-auto">
        <div className="px-5 sm:px-10 pt-10 pb-6 border-b border-zinc-900">
          <h1 className="text-3xl font-black text-white">Flashcards</h1>
          <p className="text-zinc-500 text-sm mt-1">Rapid recall practice, mapped to the SACAA syllabus.</p>
        </div>

        <div className="px-5 sm:px-10 py-8 grid grid-cols-1 gap-3">
          {syllabus.map((subject) => {
            const count = countFor(subject);
            const ready = count > 0;
            return ready ? (
              <Link
                key={subject.id}
                href={`/flashcards/${subject.id}`}
                className="bg-zinc-950 border border-zinc-900 hover:border-yellow-400/40 rounded-2xl p-5 flex items-center gap-5 transition-all group"
              >
                <span className="text-gold"><Icon name={SUBJECT_ICON[subject.id] ?? "book"} size={22} /></span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white">{subject.title}</h3>
                    <span className="text-xs font-mono text-yellow-400">{subject.code}</span>
                    <span className="text-[10px] bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full font-medium">
                      {count} CARDS
                    </span>
                  </div>
                  <div className="text-xs text-zinc-600 mt-1">Flip-card practice, filterable by topic</div>
                </div>
                <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors">→</span>
              </Link>
            ) : (
              <div
                key={subject.id}
                className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-5 flex items-center gap-5 opacity-50"
              >
                <span className="text-chart-ink-faint"><Icon name="flashcards" size={22} /></span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-zinc-400">{subject.title}</h3>
                    <span className="text-xs font-mono text-zinc-600">{subject.code}</span>
                  </div>
                  <div className="text-xs text-zinc-700 mt-1">No flashcards yet</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
