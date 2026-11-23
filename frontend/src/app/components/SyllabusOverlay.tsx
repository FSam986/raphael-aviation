"use client";
// Check-Syllabus overlay. With a subject: that subject's sections and aspects.
// Without (from the sidebar / main pages): pick any subject in the active course.
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useCourse } from "@/app/hooks/useCourse";
import { findSubject } from "@/app/lib/course";

export function SyllabusOverlay({ subjectId, currentSectionId, onClose }: { subjectId?: string; currentSectionId?: string; onClose: () => void }) {
  const { syllabus, course } = useCourse();
  const [pick, setPick] = useState<string | undefined>(subjectId ?? syllabus[0]?.id);
  const subject = pick ? findSubject(pick) : undefined;
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 overflow-auto" onClick={onClose}>
      <div className="w-full max-w-2xl bg-chart-ground border border-chart-line-2 rounded-2xl my-6" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Syllabus">
        <div className="px-6 py-4 border-b border-chart-line sticky top-0 bg-chart-ground rounded-t-2xl z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mono text-[11px] tracking-[0.16em] uppercase text-data">SACAA {course.toUpperCase()} syllabus</div>
              <h2 className="font-display font-bold text-2xl text-chart-ink leading-tight">{subject?.title ?? "Syllabus"}</h2>
              {subject && <p className="text-chart-ink-faint text-xs mt-0.5">{subject.sections.length} sections · official appendix aspects</p>}
            </div>
            <button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-lg bg-chart-ground-2 hover:bg-chart-line text-chart-ink-dim hover:text-chart-ink text-lg leading-none">×</button>
          </div>
          {!subjectId && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {syllabus.map((s) => (
                <button key={s.id} onClick={() => setPick(s.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${s.id === pick ? "bg-gold text-gold-ink font-semibold" : "bg-chart-ground-2 border border-chart-line text-chart-ink-dim hover:text-chart-ink"}`}>
                  {s.title}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          {subject?.sections.map((s) => (
            <Link key={s.id} href={`/study/${subject.id}/${s.id}`} onClick={onClose}
              className={`block rounded-xl border p-4 transition-colors ${s.id === currentSectionId ? "border-gold/40 bg-gold/5" : "border-chart-line hover:border-chart-line-2 bg-chart-ground-2"}`}>
              <div className="flex items-center gap-2">
                <span className="mono text-xs text-gold-deep">{s.id}</span>
                <span className="text-chart-ink font-bold text-sm">{s.title}</span>
                {s.id === currentSectionId && <span className="ml-auto text-[10px] text-gold uppercase tracking-wider">you are here</span>}
              </div>
              {s.items?.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {s.items.map((it) => <li key={it.id} className="text-chart-ink-faint text-xs flex gap-2"><span className="text-chart-line-2">•</span><span>{it.topic}</span></li>)}
                </ul>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
