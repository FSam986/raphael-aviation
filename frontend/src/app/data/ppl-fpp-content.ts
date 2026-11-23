// PPL Flight Performance & Planning content — reuses the CPL Flight Planning
// (A.4.x) material. PPL syllabus 7.x maps to the CPL A.4 topics at PPL depth.

import { FPP_ALL_QUESTIONS, getFPPQuestionsBySection } from "@/app/data/fpp-questions";
import { getFPPNoteBySection } from "@/app/data/fpp-notes";
import { getFPPFlashcardsBySection } from "@/app/data/fpp-flashcards";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import { mergePplNotes, pplQuestionDepth, pplFlashcardDepth } from "@/app/data/ppl-depth";

const MAP: Record<string, string[]> = {
  "7.1": ["A.4.12"],                       // Mass & Balance
  "7.2": ["A.4.4"],                        // Abbreviations, Definitions & Symbols (V-speeds/airspeeds)
  "7.3": ["A.4.6"],                        // Runways (declared distances)
  "7.4": ["A.4.9", "A.4.7"],               // Aeroplane Performance Graphs
  "7.6": ["A.4.13"],                       // Fuel Weight & Planning (A.4.11 Cruise Control is CPL-only)
  "7.7": ["A.4.7", "A.4.8"],               // Aircraft Performance (A.4.1 Perf Classification & A.4.10 MEP/multi-engine are CPL-only — PPL is single-engine)
};
// PPL depth filter: exclude the hardest CPL questions (e.g. CAP-graph/performance
// calculations beyond the PPL syllabus).
export function getPPLFppQuestionsBySection(s: string): AirLawQuestion[] { return pplQuestionDepth((MAP[s] ?? []).flatMap(getFPPQuestionsBySection)); }
export function getPPLFppFlashcardsBySection(s: string): AirLawFlashcard[] { return pplFlashcardDepth((MAP[s] ?? []).flatMap(getFPPFlashcardsBySection)); }
export function getPPLFppNoteBySection(s: string): AirLawSectionNote | undefined {
  return mergePplNotes(s, (MAP[s] ?? []).map(getFPPNoteBySection).filter((n): n is AirLawSectionNote => !!n));
}
const SECS = [...new Set(Object.values(MAP).flat())];
export const PPL_FPP_QUESTIONS: AirLawQuestion[] = pplQuestionDepth(FPP_ALL_QUESTIONS.filter((x) => SECS.includes(x.sectionId)), Number.MAX_SAFE_INTEGER);
export const PPL_FPP_FIGURE_KEY: Record<string, string> = {
  "7.1": "A.4.2", "7.3": "A.4.5", "7.4": "A.4.7", "7.7": "A.4.7",
};
