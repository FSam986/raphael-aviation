"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useCourse } from "@/app/hooks/useCourse";
import { subjectContent } from "@/app/lib/subjectContent";
import { subjectReadiness } from "@/app/lib/readiness";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

const SUBJECT_META: Record<string, { icon: string; color: string }> = {
  "aircraft-technical":   { icon: "⚙️",  color: "text-orange-400" },
  "air-law":              { icon: "⚖️",  color: "text-purple-400" },
  "flight-planning":      { icon: "📋",  color: "text-cyan-400"   },
  "human-performance":    { icon: "🧠",  color: "text-pink-400"   },
  "flight-instruments":   { icon: "🎛️", color: "text-slate-400"  },
  "meteorology":          { icon: "☁️",  color: "text-blue-400"   },
  "navigation":           { icon: "🧭",  color: "text-green-400"  },
  "radio-navigation":     { icon: "📡",  color: "text-indigo-400" },
  "mass-and-balance":     { icon: "⚖️",  color: "text-teal-400"   },
  "principles-of-flight": { icon: "✈️",  color: "text-yellow-400" },
};

export default function StudyPage() {
  const { userName, loading } = useAuthGuard();
  const { course, syllabus } = useCourse();
  const [query, setQuery] = useState("");

  // Per-subject syllabus progress (client-only; reads mastery localStorage).
  const [pctBySubject, setPctBySubject] = useState<Record<string, number>>({});
  useEffect(() => {
    const m: Record<string, number> = {};
    syllabus.forEach((s) => { m[s.id] = subjectReadiness(s.id)?.pct ?? 0; });
    setPctBySubject(m);
  }, [syllabus]);

  // Quick search across the whole syllabus — subject, section and aspect wording.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const out: { subjectId: string; subjectTitle: string; sectionId: string; sectionTitle: string; topic: string; href: string }[] = [];
    for (const subject of syllabus) {
      for (const section of subject.sections) {
        const sectionHit = section.title.toLowerCase().includes(q) || section.id.toLowerCase().includes(q) || subject.title.toLowerCase().includes(q);
        for (const item of section.items) {
          if (sectionHit || item.topic.toLowerCase().includes(q) || item.id.toLowerCase().includes(q)) {
            out.push({ subjectId: subject.id, subjectTitle: subject.title, sectionId: section.id, sectionTitle: section.title, topic: item.topic, href: `/study/${subject.id}/${section.id}?item=${item.id}` });
          }
        }
      }
    }
    return out.slice(0, 40);
  }, [query, syllabus]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading...</div></div>;
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/study" userName={userName} />

      <main className="flex-1 ml-64 overflow-auto">
        <div className="px-10 pt-10 pb-6 border-b border-zinc-900">
          <h1 className="text-3xl font-black text-white">Study</h1>
          <p className="text-zinc-500 text-sm mt-1">SACAA {course.toUpperCase()} syllabus — pick a subject to begin</p>
          <div className="mt-5 relative max-w-xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the syllabus — topics, sections, aspects…"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-400/60 outline-none rounded-xl pl-11 pr-10 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 transition-colors"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 text-sm">✕</button>
            )}
          </div>
        </div>

        {/* Search results replace the subject grid while searching */}
        {query.trim().length >= 2 ? (
          <div className="px-10 py-8">
            <div className="text-xs text-zinc-600 mb-3">{results.length} result{results.length === 1 ? "" : "s"} for “{query.trim()}”</div>
            <div className="flex flex-col gap-1.5">
              {results.map((r, i) => (
                <Link key={i} href={r.href} className="bg-zinc-950 border border-zinc-900 hover:border-zinc-700 rounded-xl px-4 py-3 flex items-center gap-3 group hover:bg-zinc-900/50 transition-all">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-zinc-300 group-hover:text-white transition-colors truncate">{r.topic}</div>
                    <div className="text-xs text-zinc-600 mt-0.5">
                      <span className="text-yellow-400/60">{r.subjectTitle}</span>
                      <span className="mx-1.5">·</span>
                      <span className="font-mono text-zinc-500">{r.sectionId}</span> {r.sectionTitle}
                    </div>
                  </div>
                  <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors shrink-0">→</span>
                </Link>
              ))}
              {results.length === 0 && <div className="text-zinc-600 text-sm py-8 text-center">No syllabus topics match that search.</div>}
            </div>
          </div>
        ) : (
        <div className="px-10 py-8">
          <div className="grid grid-cols-1 gap-3">
            {syllabus.map((subject) => {
              const meta = SUBJECT_META[subject.id] ?? { icon: "📚", color: "text-zinc-400" };
              const totalItems = subject.sections.reduce((n, s) => n + s.items.length, 0);
              const content = subjectContent(subject.id);
              // Count DISTINCT questions: IR subjects re-map several syllabus
              // codes to the same underlying CPL section, so a plain per-section
              // sum would count shared questions two or three times.
              const qIds = new Set<string>();
              subject.sections.forEach((s) => (content?.questions(s.id) ?? []).forEach((q) => qIds.add(q.id)));
              const totalQuestions = qIds.size;
              return (
                <Link
                  key={subject.id}
                  href={`/study/${subject.id}`}
                  className="bg-zinc-950 border border-zinc-900 hover:border-zinc-700 rounded-2xl p-5 flex items-center gap-5 transition-all group hover:bg-zinc-900/50"
                >
                  <span className="text-3xl">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-white">{subject.title}</h3>
                      <span className={`text-xs font-mono ${meta.color}`}>{subject.code}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-600">
                      <span>{subject.sections.length} sections</span>
                      <span>{totalItems} exam topics</span>
                      <span className={totalQuestions > 0 ? "text-yellow-400/80" : ""}>
                        {totalQuestions > 0 ? `${totalQuestions} questions` : "questions coming soon"}
                      </span>
                      <span>{subject.passPercent}% pass mark</span>
                    </div>
                  </div>
                  {totalQuestions > 0 && (
                    <div className="text-right shrink-0">
                      <div className="text-xs text-zinc-700 mb-2">{pctBySubject[subject.id] ?? 0}% ready</div>
                      <div className="w-32 h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${pctBySubject[subject.id] ?? 0}%` }} />
                      </div>
                    </div>
                  )}
                  <span className="text-zinc-700 group-hover:text-yellow-400 transition-colors ml-4">→</span>
                </Link>
              );
            })}
          </div>
        </div>
        )}
      </main>
    </div>
  );
}
