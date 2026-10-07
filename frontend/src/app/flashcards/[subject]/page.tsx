"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { findSubject } from "@/app/lib/course";
import { subjectContent } from "@/app/lib/subjectContent";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import { FlashcardBackdrop } from "@/app/components/FlashcardBackdrop";

// Reel-style flashcards: one card per full-height slide, swipe up for the next.
export default function SubjectFlashcards() {
  const { userName, loading } = useAuthGuard();
  const params = useParams();
  const subjectId = params.subject as string;
  const subject = findSubject(subjectId);
  const content = subjectContent(subjectId);

  const sections = useMemo(
    () => (subject && content ? subject.sections.filter((s) => content.flashcards(s.id).length > 0) : []),
    [subject, content]
  );
  const [sectionFilter, setSectionFilter] = useState("all");
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement | null>(null);

  const deck: AirLawFlashcard[] = useMemo(() => {
    if (!content) return [];
    return sectionFilter === "all" ? sections.flatMap((s) => content.flashcards(s.id)) : content.flashcards(sectionFilter);
  }, [content, sections, sectionFilter]);

  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); setActive(0); }, [sectionFilter]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading…</div></div>;

  const pct = deck.length ? Math.round(((active + 1) / deck.length) * 100) : 0;
  function onScroll() { const el = scroller.current; if (el) setActive(Math.round(el.scrollTop / el.clientHeight)); }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/flashcards" userName={userName} />
      <main className="flex-1 ml-64 h-screen relative overflow-hidden">
        {/* header overlay: title, progress, section filter */}
        <div className="absolute top-0 inset-x-0 z-30 px-6 pt-4 pb-3 bg-gradient-to-b from-black via-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <Link href="/flashcards" className="text-zinc-500 hover:text-white text-xs">← All</Link>
            <div className="text-white font-bold text-sm truncate">{subject?.title ?? subjectId}</div>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
            <div className="text-[11px] text-zinc-400 tabular-nums flex-shrink-0">{deck.length ? active + 1 : 0}/{deck.length}</div>
          </div>
          <div className="mt-2 flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button onClick={() => setSectionFilter("all")} className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap ${sectionFilter === "all" ? "bg-yellow-400 text-black font-bold" : "bg-zinc-900 text-zinc-400"}`}>All ({sections.reduce((n, s) => n + (content?.flashcards(s.id).length ?? 0), 0)})</button>
            {sections.map((s) => (
              <button key={s.id} onClick={() => setSectionFilter(s.id)} className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap ${sectionFilter === s.id ? "bg-yellow-400 text-black font-bold" : "bg-zinc-900 text-zinc-400"}`}>{s.title} ({content?.flashcards(s.id).length})</button>
            ))}
          </div>
        </div>

        {deck.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-500 text-sm">No flashcards for this subject yet.</div>
        ) : (
          <div ref={scroller} onScroll={onScroll} className="h-[100dvh] overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            {deck.map((card, i) => (
              <section key={card.id} className="h-[100dvh] snap-start flex items-center justify-center px-6">
                <div className="w-full max-w-xl">
                  <ReelCard card={card} subjectId={subjectId} isLast={i === deck.length - 1} />
                  <p className="text-zinc-600 text-xs mt-4 text-center">{i === deck.length - 1 ? "Last card — nice work" : "Swipe up for the next ↑"}</p>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function ReelCard({ card, subjectId }: { card: AirLawFlashcard; subjectId: string; isLast: boolean }) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => setFlipped(false), [card.id]);
  return (
    <button onClick={() => setFlipped((f) => !f)} className="relative w-full min-h-[300px] rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 flex flex-col items-center justify-center text-center overflow-hidden">
      <FlashcardBackdrop subjectId={subjectId} difficulty={card.difficulty} flipped={flipped} />
      <div className="relative z-10 text-[10px] uppercase tracking-widest text-zinc-500 mb-3">{flipped ? "Answer" : "Question"} · tap to flip</div>
      <div className={`relative z-10 ${flipped ? "text-zinc-200 text-base" : "text-white text-lg font-semibold"} leading-relaxed`}>{flipped ? card.back : card.front}</div>
      {card.difficulty && <div className="relative z-10 mt-4 text-[10px] text-zinc-500">{card.sectionId} · {card.difficulty}</div>}
    </button>
  );
}
