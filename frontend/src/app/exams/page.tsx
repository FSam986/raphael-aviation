"use client";

import { LoadingScreen } from "@/app/components/LoadingScreen";
import Link from "next/link";
import { useCourse } from "@/app/hooks/useCourse";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
// Bank size per subject from the build-time content index (no question banks downloaded).
import { bankSize } from "@/app/lib/contentIndex";
import { Icon, SUBJECT_ICON } from "@/app/components/Icon";

export default function Exams() {
  const { userName, loading } = useAuthGuard();
  const { course, syllabus } = useCourse();

  if (loading)
    return (
      <LoadingScreen />
    );

  return (
    <div className="min-h-screen bg-chart-ground flex">
      <Sidebar active="/exams" userName={userName} />

      <main className="flex-1 md:ml-64 pt-14 md:pt-0 overflow-auto">
        <div className="px-5 sm:px-10 pt-10 pb-6 border-b border-zinc-900">
          <h1 className="text-3xl font-black text-white">Mock Exams</h1>
          <p className="text-zinc-500 text-sm mt-1">
            SACAA-style papers. Each re-sit draws fresh, non-repeating questions from the bank.
          </p>
        </div>

        {/* The Instrument Rating is examined as ONE combined 100-question paper. */}
        {course === "ir" ? (
          <div className="px-5 sm:px-10 py-8">
            <Link
              href="/exams/ir-combined"
              className="block bg-zinc-950 border border-zinc-900 hover:border-yellow-400/40 rounded-2xl p-6 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-gold"><Icon name="cap" size={28} /></span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white text-lg">Instrument Rating</h3>
                    <span className="text-[10px] bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full font-medium">SACAA STYLE</span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    100 questions · 3 hours · 75% pass — all subjects mixed in the exam&apos;s subject order (Meteorology, Radio Navigation, Air Law &amp; AWO, Flight Performance, Special Procedures, Instruments, Human Performance).
                  </div>
                </div>
                <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors">→</span>
              </div>
            </Link>
            <p className="text-zinc-600 text-xs mt-3">
              Subjects still being built contribute their questions as they&apos;re completed; the paper fills toward the full 100 as more content lands.
            </p>
          </div>
        ) : (
        <div className="px-5 sm:px-10 py-8 grid grid-cols-1 gap-3">
          {syllabus.map((subject) => {
            const count = bankSize(subject.id);
            const ready = !!count;
            return ready ? (
              <Link
                key={subject.id}
                href={`/exams/${subject.id}`}
                className="bg-zinc-950 border border-zinc-900 hover:border-yellow-400/40 rounded-2xl p-5 flex items-center gap-5 transition-all group"
              >
                <span className="text-gold"><Icon name={SUBJECT_ICON[subject.id] ?? "book"} size={22} /></span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white">{subject.title}</h3>
                    <span className="text-xs font-mono text-yellow-400">{subject.code}</span>
                    <span className="text-[10px] bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full font-medium">
                      READY
                    </span>
                  </div>
                  <div className="text-xs text-zinc-600 mt-1">
                    {count} question bank · {subject.examQuestions}-question timed paper · {subject.passPercent}% pass
                  </div>
                </div>
                <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors">→</span>
              </Link>
            ) : (
              <div
                key={subject.id}
                className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-5 flex items-center gap-5 opacity-50"
              >
                <span className="text-zinc-500"><Icon name="doc" size={22} /></span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-zinc-400">{subject.title}</h3>
                    <span className="text-xs font-mono text-zinc-600">{subject.code}</span>
                  </div>
                  <div className="text-xs text-zinc-700 mt-1">No questions yet</div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </main>
    </div>
  );
}
