// IR Flight Performance & Planning (C.4) reuses the CPL FPP material — the
// syllabus overlaps almost entirely. Maps each IR section to the CPL FPP
// section(s) that cover it.

import { FPP_ALL_QUESTIONS, getFPPQuestionsBySection } from "@/app/data/fpp-questions";
import { getFPPFlashcardsBySection } from "@/app/data/fpp-flashcards";
import { getFPPNoteBySection } from "@/app/data/fpp-notes";
import { getFPPPlottingBySection, type PlottingQuestion } from "@/app/data/fpp-plotting";
import { IR_FPP_MINED_QUESTIONS, getIRFppMinedQuestionsBySection } from "@/app/data/ir-fpp-questions";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

const MAP: Record<string, string[]> = {
  "C.4.2": ["A.4.7"], // performance terminology & theory
  "C.4.3": ["A.4.7", "A.4.10"], // range & endurance
  "C.4.4": ["A.4.4"], // airspeed terminology
  "C.4.5": ["A.4.5"], // met terminology
  "C.4.6": ["A.4.8", "A.4.9"], // factors affecting performance + SEP1 performance data
  "C.4.7": ["A.4.1", "A.4.2"], // performance classification + certification/load factors
  "C.4.9": ["A.4.4"], // stages of flight
  "C.4.10": ["A.4.13"], // PET & PNR
  "C.4.11": ["A.4.13", "A.4.7", "A.4.11"], // specific performance (incl. MEP1 field performance)
  "C.4.12": ["A.4.13"], // fuel planning
  "C.4.14": ["A.4.5"], // IFR altitudes
  "C.4.15": ["A.4.5"], // aerodrome terminology
  "C.4.17": ["A.4.12"], // mass & balance
  // C.4.1 basic aerodynamics, C.4.13 documentation → no direct CPL FPP source.
  // Every CPL FPP section (A.4.1–A.4.13) now maps to an IR code, so the IR
  // Flight Performance bank mirrors the full CPL FPP bank.
};

export function getIRFppQuestionsBySection(s: string): AirLawQuestion[] {
  // CPL FPP reuse (via MAP) plus the dedicated POF IR bank whose questions are
  // already tagged with their own C.4.x section id (notably C.4.1 aerodynamics,
  // which has no CPL FPP source).
  return [...(MAP[s] ?? []).flatMap((c) => getFPPQuestionsBySection(c)), ...getIRFppMinedQuestionsBySection(s)];
}
export function getIRFppFlashcardsBySection(s: string): AirLawFlashcard[] {
  return (MAP[s] ?? []).flatMap((c) => getFPPFlashcardsBySection(c));
}
export function getIRFppNoteBySection(s: string): AirLawSectionNote | undefined {
  const notes = (MAP[s] ?? []).map(getFPPNoteBySection).filter((n): n is AirLawSectionNote => !!n);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return notes[0];
  return { sectionId: s, title: notes[0].title, intro: notes[0].intro, blocks: notes.flatMap((n) => n.blocks), mustKnow: notes.flatMap((n) => n.mustKnow), traps: notes.flatMap((n) => n.traps) };
}
export function getIRFppPlottingBySection(s: string): PlottingQuestion[] {
  return (MAP[s] ?? []).flatMap((c) => getFPPPlottingBySection(c));
}

export const IR_FPP_FIGURE_KEY: Record<string, string> = {
  "C.4.2": "A.4.7", "C.4.3": "A.4.7", "C.4.4": "A.4.4", "C.4.5": "A.4.5", "C.4.6": "A.4.8",
  "C.4.7": "A.4.1", "C.4.9": "A.4.4", "C.4.10": "A.4.13", "C.4.11": "A.4.13", "C.4.12": "A.4.13",
  "C.4.14": "A.4.5", "C.4.15": "A.4.5", "C.4.17": "A.4.12",
};

const IR_FPP_SECTIONS = [...new Set(Object.values(MAP).flat())];
export const IR_FPP_QUESTIONS: AirLawQuestion[] = [
  ...FPP_ALL_QUESTIONS.filter((q) => IR_FPP_SECTIONS.includes(q.sectionId)),
  ...IR_FPP_MINED_QUESTIONS,
];
export const IR_FPP_QUESTION_COUNT = IR_FPP_QUESTIONS.length;
