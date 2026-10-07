"use client";

import { useEffect, useState } from "react";
import { FlashcardBackdrop } from "@/app/components/FlashcardBackdrop";
import Link from "next/link";
import {
  getFlashcardDeck,
  MET_FLASHCARD_COUNT,
  type MetFlashcard,
} from "@/app/data/met-flashcards";
import { SACAA_SYLLABUS } from "@/app/data/sacaa-syllabus";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function MeteorologyFlashcardsPage() {
  const { userName, loading } = useAuthGuard();

  const metSubject = SACAA_SYLLABUS.find((s) => s.id === "meteorology");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [deck, setDeck] = useState<MetFlashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDeck(getFlashcardDeck(sectionFilter === "all" ? undefined : sectionFilter));
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
  }, [sectionFilter]);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading...</div>
      </div>
    );

  const card = deck[index];
  const progress = deck.length ? Math.round(((index + 1) / deck.length) * 100) : 0;

  function next() {
    setFlipped(false);
    setIndex((i) => (i + 1) % Math.max(1, deck.length));
  }
  function prev() {
    setFlipped(false);
    setIndex((i) => (i - 1 + deck.length) % Math.max(1, deck.length));
  }
  function markKnown() {
    if (card) setKnown((k) => new Set(k).add(card.id));
    next();
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/flashcards" userName={userName} />

      <main className="flex-1 ml-64 overflow-auto">
        <div className="px-10 pt-10 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-2 text-zinc-600 text-sm mb-3">
            <Link href="/flashcards" className="hover:text-zinc-400">Flashcards</Link>
            <span>/</span>
            <span className="text-zinc-400">Meteorology</span>
          </div>
          <h1 className="text-3xl font-black text-white">Meteorology Flashcards</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {MET_FLASHCARD_COUNT} cards across the SACAA syllabus · {known.size} marked known this session
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => setSectionFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                sectionFilter === "all"
                  ? "bg-yellow-400 text-black font-medium"
                  : "bg-zinc-900 text-zinc-500 hover:text-white"
              }`}
            >
              All sections
            </button>
            {metSubject?.sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSectionFilter(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  sectionFilter === s.id
                    ? "bg-yellow-400 text-black font-medium"
                    : "bg-zinc-900 text-zinc-500 hover:text-white"
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-10 py-10">
          {deck.length === 0 || !card ? (
            <div className="text-center text-zinc-600 py-20">No flashcards for this section yet.</div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-zinc-600 mb-3">
                <span>
                  Card {index + 1} / {deck.length}
                </span>
                <span className="font-mono text-yellow-400/60">{card.sectionId}</span>
              </div>
              <div className="h-1 bg-zinc-900 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>

              <button
                onClick={() => setFlipped((f) => !f)}
                className="relative w-full min-h-[280px] bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-colors overflow-hidden"
              >
                <FlashcardBackdrop subjectId="meteorology" difficulty={card.difficulty} flipped={flipped} />
                <div className="relative z-10 text-xs uppercase tracking-widest text-zinc-500 mb-4">
                  {flipped ? "Answer" : "Question"}
                </div>
                <div className={`relative z-10 ${flipped ? "text-zinc-200 text-lg" : "text-white text-xl font-bold"} leading-relaxed`}>
                  {flipped ? card.back : card.front}
                </div>
                <div className="relative z-10 text-xs text-zinc-600 mt-6">Click to {flipped ? "hide" : "reveal"}</div>
              </button>

              <div className="flex items-center justify-between gap-3 mt-6">
                <button
                  onClick={prev}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors"
                >
                  ← Prev
                </button>
                <button
                  onClick={markKnown}
                  className="flex-1 px-5 py-2.5 bg-green-500/15 hover:bg-green-500/25 text-green-400 text-sm font-medium rounded-xl transition-colors"
                >
                  I know this ✓
                </button>
                <button
                  onClick={next}
                  className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
