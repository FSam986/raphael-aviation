"use client";
// Story Flight: a bird's-eye minimap of every section, then the subject played
// out as a sequence of "stops" (scene picture + story line + exam answers).
// Built entirely from existing syllabus, notes, figures and question banks, so
// every subject gets one with no extra content to maintain.
import Link from "next/link";
import { useMemo } from "react";
import type { SyllabusSubject } from "@/app/data/sacaa-syllabus";
import { subjectContent } from "@/app/lib/subjectContent";
import { figuresForSection, mappedSection } from "@/app/lib/figures";
import { STORY_THUMBS } from "@/app/data/story-thumbs";
import { buildExamTerms, ExamText, examAnswers } from "@/app/lib/examTerms";
import { STORY_NARRATIVES } from "@/app/data/story-narratives";
import { STORY_SCENE_KEY } from "@/app/data/story-narratives";

// Scene key: the section's own scene, an explicit override, or the CPL section it maps onto.
const sceneKey = (id: string) => (STORY_NARRATIVES[id] ? id : STORY_SCENE_KEY[id] ?? mappedSection(id) ?? id);

// Story text: **marked** facts in red, the rest still auto-highlights exam answers.
function Story({ text, re }: { text: string; re: RegExp | null }) {
  return <>{text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <span key={i} className="exam-term">{part}</span> : <ExamText key={i} text={part} re={re} />))}</>;
}

// Best fact for a stop: the unused note line sharing most words with the section
// title (several PPL / IR sections share one note, so the first line repeats).
const STOP = new Set(["flight", "aircraft", "aeroplane", "general", "basic", "theory", "system", "systems", "terminology", "with", "from", "into", "their", "they", "procedures", "performance", "altitude", "altitudes"]);
const words = (t: string) => new Set((t.toLowerCase().match(/[a-z]{4,}/g) ?? []).filter((w) => !STOP.has(w)));
export function pickFact(title: string, lines: string[], used: Set<string>): string | undefined {
  const w = words(title);
  let best: string | undefined, score = 0; // ponytail: require ≥1 shared word; else caller falls back to the syllabus topic
  for (const l of lines) {
    if (used.has(l)) continue;
    const sc = [...words(l)].filter((x) => [...w].some((y) => x === y || (y.length >= 5 && x.startsWith(y.slice(0, 5))))).length;
    if (sc > score) { best = l; score = sc; }
  }
  return best;
}

const tone = (pct: number, seen: number) =>
  !seen ? "var(--chart-line)" : pct >= 75 ? "var(--success)" : pct >= 50 ? "var(--gold)" : "#ff6b6b";

export function StoryFlight({ subject, pctOf, seenOf }: { subject: SyllabusSubject; pctOf: (id: string) => number; seenOf: (id: string) => number }) {
  const stops = useMemo(() => {
    const content = subjectContent(subject.id);
    // Never repeat a scene or a picture within one subject (several PPL / IR
    // sections can map onto the same CPL section).
    const usedScenes = new Set<string>(), usedPics = new Set<string>(), usedFacts = new Set<string>();
    return subject.sections.map((sec) => {
      const qs = content?.questions(sec.id) ?? [];
      const note = content?.note(sec.id);
      const key = sceneKey(sec.id);
      const scene = !usedScenes.has(key) ? STORY_NARRATIVES[key] : undefined;
      if (scene) usedScenes.add(key);
      const fact = scene ? undefined : pickFact(sec.title, [...(note?.mustKnow ?? []), ...(note?.traps ?? [])], usedFacts);
      if (fact) usedFacts.add(fact);
      const story = scene?.story ?? fact ?? sec.items.map((it) => it.topic).join(" · ");
      const mapped = mappedSection(sec.id);
      const pics = [STORY_THUMBS[sec.id], STORY_THUMBS[key], mapped && STORY_THUMBS[mapped], ...figuresForSection(sec.id).map((f) => f.src)]
        .filter((x): x is string => !!x);
      const pic = pics.find((x) => !usedPics.has(x));
      if (pic) usedPics.add(pic);
      return { sec, time: scene?.time, qs: qs.length, story, answers: examAnswers(qs, 5), re: buildExamTerms(qs), pic };
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
                <span className="font-display font-bold text-gold text-[15px] tracking-wide">STOP {i + 1}{s.time ? ` · ${s.time.toUpperCase()}` : ""}</span>
                <span className="mono text-[11px] text-chart-ink-faint">{s.sec.id}</span>
                {s.qs > 0 && <span className="mono text-[11px] ml-auto" style={{ color: tone(pct, seenOf(s.sec.id)) }}>{s.qs} Q · {pct}%</span>}
              </div>
              <Link href={href(s.sec.id)} className="group grid sm:grid-cols-[220px_1fr] rounded-2xl border border-chart-line bg-chart-ground-2 overflow-hidden hover:border-gold/45 transition-colors">
                <div className="bg-[#10171b] min-h-[120px] max-h-[170px] flex items-center justify-center overflow-hidden p-2 [&_img]:max-h-[150px] [&_img]:w-auto [&_img]:object-contain [&_svg]:max-h-[150px]">
                  {s.pic ? <picture><source srcSet={`/figures/${s.pic.replace(/\.(png|jpe?g)$/i, ".webp")}`} type="image/webp" /><img src={`/figures/${s.pic}`} alt="" loading="lazy" decoding="async" /></picture> : <span className="font-display font-bold text-5xl text-chart-line-2">{String(i + 1).padStart(2, "0")}</span>}
                </div>
                <div className="p-4 sm:p-5 space-y-2 min-w-0">
                  <h3 className="font-display font-bold text-2xl text-chart-ink leading-none group-hover:text-gold transition-colors">{s.sec.title}</h3>
                  {s.story && <p className="text-chart-ink-dim text-[14px] leading-relaxed"><Story text={s.story} re={s.re} /></p>}
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
