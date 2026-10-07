"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { findSubject } from "@/app/lib/course";
import { subjectContent } from "@/app/lib/subjectContent";
import { subjectReadiness, type SubjectReadiness } from "@/app/lib/readiness";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function SubjectPage() {
  const params = useParams();
  const subjectId = params.subject as string;
  const { userName, loading } = useAuthGuard();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Real syllabus progress from the adaptive-mastery localStorage (client only).
  const [readiness, setReadiness] = useState<SubjectReadiness | null>(null);
  useEffect(() => {
    setReadiness(subjectReadiness(subjectId));
  }, [subjectId]);
  const sectionPct = (sectionId: string) => readiness?.topics.find((t) => t.sectionId === sectionId)?.pct ?? 0;
  const sectionSeen = (sectionId: string) => readiness?.topics.find((t) => t.sectionId === sectionId);

  const subject = findSubject(subjectId);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading...</div></div>;

  if (!subject) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-4">
        <div className="text-white text-xl font-bold">Subject not found</div>
        <Link href="/study" className="text-yellow-400 text-sm hover:underline">← Back to Study</Link>
      </div>
    );
  }

  const totalItems = subject.sections.reduce((n, s) => n + s.items.length, 0);
  const content = subjectContent(subjectId);
  const qCount = (sectionId: string) => content?.questions(sectionId).length ?? 0;
  // Distinct count — IR subjects re-map several syllabus codes onto the same
  // CPL section, so summing per-section would double-count shared questions.
  const qIds = new Set<string>();
  subject.sections.forEach((s) => (content?.questions(s.id) ?? []).forEach((q) => qIds.add(q.id)));
  const totalQuestions = qIds.size;

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/study" userName={userName} />

      <main className="flex-1 ml-64 overflow-auto">
        {/* Header */}
        <div className="px-10 pt-10 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-2 text-zinc-600 text-sm mb-4">
            <Link href="/study" className="hover:text-zinc-400 transition-colors">Study</Link>
            <span>/</span>
            <span className="text-zinc-400">{subject.title}</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-black text-white">{subject.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                <span className="text-yellow-400 font-mono font-bold">{subject.code}</span>
                <span>{subject.sections.length} sections</span>
                <span>{totalItems} exam topics</span>
                {totalQuestions > 0 && <span className="text-yellow-400/80">{totalQuestions} questions</span>}
                <span>Pass: {subject.passPercent}%</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/flashcards/${subjectId}`} className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors border border-zinc-800">
                🃏 Flashcards
              </Link>
              <Link href={`/exams/${subjectId}`} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors">
                📝 Mock Exam
              </Link>
            </div>
          </div>

          {/* Overall syllabus progress */}
          {totalQuestions > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-zinc-600 mb-2">
                <span>Syllabus progress</span>
                <span>
                  {readiness ? `${readiness.pct}% ready` : "…"}
                  {readiness && <span className="text-zinc-700"> · {readiness.seen}/{readiness.total} questions practised</span>}
                </span>
              </div>
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${readiness?.pct ?? 0}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Sections */}
        <div className="px-10 py-8 space-y-3 pb-16">
          {subject.sections.map((section, idx) => {
            const isOpen = expandedSection === section.id;
            return (
              <div key={section.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedSection(isOpen ? null : section.id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500 text-xs font-mono shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white">{section.title}</div>
                    <div className="text-xs text-zinc-600 mt-0.5">
                      <span className="font-mono text-yellow-400/60">{section.id}</span>
                      <span className="ml-2">{section.items.length} exam topics</span>
                      {qCount(section.id) > 0 && <span className="ml-2 text-yellow-400/70">· {qCount(section.id)} questions</span>}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-4">
                    {qCount(section.id) > 0 && (
                      <div className="text-right">
                        <div className="text-xs text-zinc-600 mb-1">
                          {sectionSeen(section.id)?.seen ?? 0} / {qCount(section.id)} practised · {sectionPct(section.id)}%
                        </div>
                        <div className="w-24 h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${sectionPct(section.id)}%` }} />
                        </div>
                      </div>
                    )}
                    <span className={`text-zinc-600 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>›</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-900">
                    {section.items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/study/${subjectId}/${section.id}?item=${item.id}`}
                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-zinc-900/40 transition-colors border-b border-zinc-900/50 last:border-0 group"
                      >
                        <div className="w-5 h-5 rounded-full border border-zinc-800 group-hover:border-yellow-400/50 transition-colors shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-zinc-400 text-xs font-mono mr-2 text-zinc-600">{item.id}</span>
                          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{item.topic}</span>
                        </div>
                        <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded-md">Study</span>
                          <span className="text-xs text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded-md">Quiz</span>
                        </div>
                      </Link>
                    ))}
                    <div className="px-5 py-3 flex gap-3">
                      <Link href={`/study/${subjectId}/${section.id}?tab=flashcards`} className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                        🃏 Flashcards for this section →
                      </Link>
                      <Link href={`/study/${subjectId}/${section.id}?tab=quiz`} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors ml-4">
                        📝 Section quiz →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
