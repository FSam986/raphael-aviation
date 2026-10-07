// PPL Navigation content — reuses the CPL Navigation (A.9.x) material, plus the
// CPL Instruments compass/magnetism topic (A.7.7) for "Aircraft Magnetism". The
// PPL syllabus (10.1–10.7) is a re-grouping of the CPL topics at PPL depth, so we
// MAP each PPL section to the CPL section(s) that cover it rather than duplicate.

import { NAV_QUESTIONS, getNavQuestionsBySection } from "@/app/data/nav-questions";
import { getNavNoteBySection } from "@/app/data/nav-notes";
import { getNavFlashcardsBySection } from "@/app/data/nav-flashcards";
import { ALL_INSTRUMENTS_QUESTIONS, getInstrumentsQuestionsBySection } from "@/app/data/instruments-questions";
import { getInstrumentsNoteBySection } from "@/app/data/instruments-notes";
import { getInstrumentsFlashcardsBySection } from "@/app/data/instruments-flashcards";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const MAP: Record<string, string[]> = {
  "10.1": ["A.9.1"],           // Form of the Earth
  "10.2": ["A.9.4"],           // Time
  "10.3": ["A.9.5", "A.9.3"],  // Mapping (+ distance/scale)
  "10.4": ["A.9.2"],           // Direction — variation & deviation
  "10.5": ["A.7.7"],           // Aircraft Magnetism (compass)
  "10.6": ["A.9.7"],           // The Navigation Computer / triangle of velocities
  "10.7": ["A.9.8", "A.9.6"],  // Practical Navigation (1-in-60, relative velocity)
};
const ins = (id: string) => id.startsWith("A.7");
const q = (id: string) => (ins(id) ? getInstrumentsQuestionsBySection(id) : getNavQuestionsBySection(id));
const f = (id: string) => (ins(id) ? getInstrumentsFlashcardsBySection(id) : getNavFlashcardsBySection(id));
const nt = (id: string) => (ins(id) ? getInstrumentsNoteBySection(id) : getNavNoteBySection(id));

export function getPPLNavQuestionsBySection(s: string): AirLawQuestion[] { return (MAP[s] ?? []).flatMap(q); }
export function getPPLNavFlashcardsBySection(s: string): AirLawFlashcard[] { return (MAP[s] ?? []).flatMap(f); }
export function getPPLNavNoteBySection(s: string): AirLawSectionNote | undefined {
  const notes = (MAP[s] ?? []).map(nt).filter((n): n is AirLawSectionNote => !!n);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return notes[0];
  return { sectionId: s, title: notes[0].title, intro: notes[0].intro, blocks: notes.flatMap((n) => n.blocks), mustKnow: notes.flatMap((n) => n.mustKnow), traps: notes.flatMap((n) => n.traps) };
}
const SECS = [...new Set(Object.values(MAP).flat())];
export const PPL_NAV_QUESTIONS: AirLawQuestion[] = [
  ...NAV_QUESTIONS.filter((x) => SECS.includes(x.sectionId)),
  ...ALL_INSTRUMENTS_QUESTIONS.filter((x) => SECS.includes(x.sectionId)),
];
export const PPL_NAV_FIGURE_KEY: Record<string, string> = {
  "10.1": "A.9.1", "10.3": "A.9.5", "10.4": "A.9.2", "10.5": "A.7.7", "10.6": "A.9.7", "10.7": "A.9.8",
};
