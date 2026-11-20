"use client";
// Story Flight: a bird's-eye minimap of every section, then the subject played
// out as a sequence of "stops" (scene picture + story line + exam answers).
// Built entirely from existing syllabus, notes, figures and question banks, so
// every subject gets one with no extra content to maintain.
import Link from "next/link";
import { useMemo } from "react";
import type { SyllabusSubject } from "@/app/data/sacaa-syllabus";
import { subjectContent } from "@/app/lib/subjectContent";
import { figuresForSection } from "@/app/lib/figures";
import { buildExamTerms, ExamText, examAnswers } from "@/app/lib/examTerms";

const tone = (pct: number, seen: number) =>
  !seen ? "var(--chart-line)" : pct >= 75 ? "var(--success)" : pct >= 50 ? "var(--gold)" : "#ff6b6b";

export function StoryFlight({ subject, pctOf, seenOf }: { subject: SyllabusSubject; pctOf: (id: string) => number; seenOf: (id: string) => number }) {
  const stops = useMemo(() => {
    const content = subjectContent(subject.id);
    return subject.sections.map((sec) => {
      const qs = content?.questions(sec.id) ?? [];
      const note = content?.note(sec.id);
      const story = note?.mustKnow?.[0] ?? note?.intro ?? sec.items[0]?.topic ?? "";
      return { sec, qs: qs.length, story, answers: examAnswers(qs, 5), re: buildExamTerms(qs), fig: figuresForSection(sec.id)[0] };
    });
  }, [subject]);
  const href = (id: string) => `/study/${subject.id}/${id}`;
  const next = stops.findIndex((s) => s.qs > 0 && pctOf(s.sec.id) < 75);

  return (
    <div className="space-y-6">
      {/* Bird's-eye minimap: every section, coloured by readiness, widened by exam weight */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="mono text-[11px] tracking-[0.16em] uppercase text-data">Bird&apos;s-eye · {stops.length} stops</span>
          <span className="mono text-[11px] text-chart-ink-faint">width = exam weight</span>
        </div>
        <div className="flex gap-1 h-5" role="list">
          {stops.map((s, i) => (
            <a key={s.sec.id} href={`#stop-${i}`} role="listitem" title={`${s.sec.title} · ${s.qs} Q · ${pctOf(s.sec.id)}%`}
              className={`rounded-[3px] hover:brightness-125 transition ${i === next ? "outline outline-2 outline-offset-1 outline-gold" : ""}`}
              style={{ flex: Math.max(1, s.qs), background: tone(pctOf(s.sec.id), seenOf(s.sec.id)) }} />
          ))}
        </div>
      </div>

      {/* The story, stop by stop */}
      <ol className="relative space-y-5 before:absolute before:left-[7px] before:top-3 before:bottom-3 before:w-px before:bg-chart-line">
        {stops.map((s, i) => {
          const pct = pctOf(s.sec.id), done = seenOf(s.sec.id) > 0 && pct >= 75;
          return (
            <li key={s.sec.id} id={`stop-${i}`} className="relative pl-8 scroll-mt-20">
              <span className={`absolute left-0 top-3 w-[15px] h-[15px] rotate-45 border-2 ${done ? "bg-success border-success" : i === next ? "bg-gold border-gold" : "bg-chart-ground border-chart-line-2"}`} />
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display font-bold text-gold text-[15px] tracking-wide">STOP {i + 1}</span>
                <span className="mono text-[11px] text-chart-ink-faint">{s.sec.id}</span>
                {s.qs > 0 && <span className="mono text-[11px] ml-auto" style={{ color: tone(pct, seenOf(s.sec.id)) }}>{s.qs} Q · {pct}%</span>}
              </div>
              <Link href={href(s.sec.id)} className="group grid sm:grid-cols-[220px_1fr] rounded-2xl border border-chart-line bg-chart-ground-2 overflow-hidden hover:border-gold/45 transition-colors">
                <div className="bg-[#10171b] min-h-[120px] max-h-[170px] flex items-center justify-center overflow-hidden p-2 [&_img]:max-h-[150px] [&_img]:w-auto [&_img]:object-contain [&_svg]:max-h-[150px]">
                  {s.fig ? s.fig.render() : <span className="font-display font-bold text-5xl text-chart-line-2">{String(i + 1).padStart(2, "0")}</span>}
                </div>
                <div className="p-4 sm:p-5 space-y-2 min-w-0">
                  <h3 className="font-display font-bold text-2xl text-chart-ink leading-none group-hover:text-gold transition-colors">{s.sec.title}</h3>
                  {s.story && <p className="text-chart-ink-dim text-[14px] leading-relaxed"><ExamText text={s.story} re={s.re} /></p>}
                  {s.answers.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="mono text-[10px] tracking-wider uppercase text-chart-ink-faint mr-1">Exam answers</span>
                      {s.answers.map((a) => <span key={a} className="exam-term text-[11.5px] px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20">{a}</span>)}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
