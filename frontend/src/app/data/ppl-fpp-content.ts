// PPL Flight Performance & Planning content — reuses the CPL Flight Planning
// (A.4.x) material. PPL syllabus 7.x maps to the CPL A.4 topics at PPL depth.

import { FPP_ALL_QUESTIONS, getFPPQuestionsBySection } from "@/app/data/fpp-questions";
import { getFPPNoteBySection } from "@/app/data/fpp-notes";
import { getFPPFlashcardsBySection } from "@/app/data/fpp-flashcards";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const MAP: Record<string, string[]> = {
  "7.1": ["A.4.12"],                       // Mass & Balance
  "7.2": ["A.4.4"],                        // Abbreviations, Definitions & Symbols (V-speeds/airspeeds)
  "7.3": ["A.4.5"],                        // Runways (declared distances)
  "7.4": ["A.4.9", "A.4.7"],               // Aeroplane Performance Graphs
  "7.6": ["A.4.11", "A.4.13"],             // Fuel Weight & Performance
  "7.7": ["A.4.1", "A.4.7", "A.4.8", "A.4.10"], // Aircraft Performance
};
export function getPPLFppQuestionsBySection(s: string): AirLawQuestion[] { return (MAP[s] ?? []).flatMap(getFPPQuestionsBySection); }
export function getPPLFppFlashcardsBySection(s: string): AirLawFlashcard[] { return (MAP[s] ?? []).flatMap(getFPPFlashcardsBySection); }
export function getPPLFppNoteBySection(s: string): AirLawSectionNote | undefined {
  const notes = (MAP[s] ?? []).map(getFPPNoteBySection).filter((n): n is AirLawSectionNote => !!n);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return notes[0];
  return { sectionId: s, title: notes[0].title, intro: notes[0].intro, blocks: notes.flatMap((n) => n.blocks), mustKnow: notes.flatMap((n) => n.mustKnow), traps: notes.flatMap((n) => n.traps) };
}
const SECS = [...new Set(Object.values(MAP).flat())];
export const PPL_FPP_QUESTIONS: AirLawQuestion[] = FPP_ALL_QUESTIONS.filter((x) => SECS.includes(x.sectionId));
export const PPL_FPP_FIGURE_KEY: Record<string, string> = {
  "7.1": "A.4.2", "7.3": "A.4.5", "7.4": "A.4.7", "7.7": "A.4.7",
};
