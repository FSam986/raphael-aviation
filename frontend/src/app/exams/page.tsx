"use client";

import Link from "next/link";
import { useCourse } from "@/app/hooks/useCourse";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
// CPL banks
import { MET_QUESTIONS } from "@/app/data/met-questions";
import { AIRLAW_ALL_QUESTIONS } from "@/app/data/airlaw-questions";
import { FPP_ALL_QUESTIONS } from "@/app/data/fpp-questions";
import { ATG_QUESTIONS } from "@/app/data/aircraft-technical-questions";
import { HUMAN_PERFORMANCE_QUESTIONS } from "@/app/data/human-performance-questions";
import { NAV_QUESTIONS } from "@/app/data/nav-questions";
import { RADIONAV_QUESTIONS } from "@/app/data/radionav-questions";
import { GR_QUESTIONS } from "@/app/data/gr-questions";
import { ALL_INSTRUMENTS_QUESTIONS } from "@/app/data/instruments-questions";
// PPL banks
import { PPL_AIRLAW_QUESTIONS } from "@/app/data/ppl-airlaw-questions";
import { PPL_MET_QUESTIONS } from "@/app/data/ppl-met-content";
import { PPL_NAV_QUESTIONS } from "@/app/data/ppl-nav-content";
import { PPL_AGK_QUESTIONS } from "@/app/data/ppl-agk-content";
import { PPL_FPP_QUESTIONS } from "@/app/data/ppl-fpp-content";
import { PPL_POF_QUESTIONS } from "@/app/data/ppl-principles-of-flight-questions";
import { PPL_HPL_QUESTIONS } from "@/app/data/ppl-human-performance-questions";

// Subjects with a built mock-exam engine (value = question-bank size).
const READY: Record<string, number> = {
  // CPL — all nine subjects
  meteorology: MET_QUESTIONS.length,
  "air-law": AIRLAW_ALL_QUESTIONS.length,
  "flight-planning": FPP_ALL_QUESTIONS.length,
  "aircraft-technical": ATG_QUESTIONS.length,
  "human-performance": HUMAN_PERFORMANCE_QUESTIONS.length,
  navigation: NAV_QUESTIONS.length,
  "radio-navigation": RADIONAV_QUESTIONS.length,
  "general-radiotelephony": GR_QUESTIONS.length,
  "flight-instruments": ALL_INSTRUMENTS_QUESTIONS.length,
  // PPL
  "ppl-air-law": PPL_AIRLAW_QUESTIONS.length,
  "ppl-meteorology": PPL_MET_QUESTIONS.length,
  "ppl-navigation": PPL_NAV_QUESTIONS.length,
  "ppl-aircraft-technical": PPL_AGK_QUESTIONS.length,
  "ppl-flight-planning": PPL_FPP_QUESTIONS.length,
  "ppl-principles-of-flight": PPL_POF_QUESTIONS.length,
  "ppl-human-performance": PPL_HPL_QUESTIONS.length,
};

export default function Exams() {
  const { userName, loading } = useAuthGuard();
  const { course, syllabus } = useCourse();

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/exams" userName={userName} />

      <main className="flex-1 ml-64 overflow-auto">
        <div className="px-10 pt-10 pb-6 border-b border-zinc-900">
          <h1 className="text-3xl font-black text-white">Mock Exams</h1>
          <p className="text-zinc-500 text-sm mt-1">
            SACAA-style papers. Each re-sit draws fresh, non-repeating questions from the bank.
          </p>
        </div>

        {/* The Instrument Rating is examined as ONE combined 100-question paper. */}
        {course === "ir" ? (
          <div className="px-10 py-8">
            <Link
              href="/exams/ir-combined"
              className="block bg-zinc-950 border border-zinc-900 hover:border-yellow-400/40 rounded-2xl p-6 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🎓</span>
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
        <div className="px-10 py-8 grid grid-cols-1 gap-3">
          {syllabus.map((subject) => {
            const count = READY[subject.id];
            const ready = !!count;
            return ready ? (
              <Link
                key={subject.id}
                href={`/exams/${subject.id}`}
                className="bg-zinc-950 border border-zinc-900 hover:border-yellow-400/40 rounded-2xl p-5 flex items-center gap-5 transition-all group"
              >
                <span className="text-2xl">☁️</span>
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
                <span className="text-2xl grayscale">📄</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-zinc-400">{subject.title}</h3>
                    <span className="text-xs font-mono text-zinc-600">{subject.code}</span>
                  </div>
                  <div className="text-xs text-zinc-700 mt-1">Question bank coming soon</div>
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
