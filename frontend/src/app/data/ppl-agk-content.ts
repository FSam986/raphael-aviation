// PPL Aircraft Technical & General — only the "Instruments" section (6.5) has a CPL
// source (the CPL Flight Instruments material, A.7.x). Airframe/powerplant/
// propellers/systems/airworthiness need the AGK textbook and are not yet wired.

import { ALL_INSTRUMENTS_QUESTIONS, getInstrumentsQuestionsBySection } from "@/app/data/instruments-questions";
import { getInstrumentsNoteBySection } from "@/app/data/instruments-notes";
import { getInstrumentsFlashcardsBySection } from "@/app/data/instruments-flashcards";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const MAP: Record<string, string[]> = {
  "6.5": ["A.7.1", "A.7.2", "A.7.7", "A.7.5", "A.7.8"], // Instruments (air data, gyros, compass, temp, stall warning)
};
export function getPPLAgkQuestionsBySection(s: string): AirLawQuestion[] { return (MAP[s] ?? []).flatMap(getInstrumentsQuestionsBySection); }
export function getPPLAgkFlashcardsBySection(s: string): AirLawFlashcard[] { return (MAP[s] ?? []).flatMap(getInstrumentsFlashcardsBySection); }
export function getPPLAgkNoteBySection(s: string): AirLawSectionNote | undefined {
  const notes = (MAP[s] ?? []).map(getInstrumentsNoteBySection).filter((n): n is AirLawSectionNote => !!n);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return notes[0];
  return { sectionId: s, title: notes[0].title, intro: notes[0].intro, blocks: notes.flatMap((n) => n.blocks), mustKnow: notes.flatMap((n) => n.mustKnow), traps: notes.flatMap((n) => n.traps) };
}
const SECS = [...new Set(Object.values(MAP).flat())];
export const PPL_AGK_QUESTIONS: AirLawQuestion[] = ALL_INSTRUMENTS_QUESTIONS.filter((x) => SECS.includes(x.sectionId));
export const PPL_AGK_FIGURE_KEY: Record<string, string> = { "6.5": "A.7.1" };
