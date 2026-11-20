// PPL Meteorology content — reuses the CPL Meteorology material (notes,
// questions, flashcards). The PPL syllabus (9.1–9.15) is essentially a
// re-grouping of the CPL topics (A.8.x) at PPL depth, so rather than duplicate
// content we MAP each PPL section to the CPL section(s) that cover it.

import { MET_QUESTIONS, getQuestionsBySection, type MetQuestion } from "@/app/data/met-questions";
import { getFlashcardsBySection, type MetFlashcard } from "@/app/data/met-flashcards";
import { getNoteBySection, type SectionNote } from "@/app/data/met-notes";
import { mergePplNotes, pplQuestionDepth, pplFlashcardDepth } from "@/app/data/ppl-depth";

// PPL section id → the CPL met content section(s) that cover it.
// (Content keys follow met-notes numbering: A.8.1 = Atmosphere, A.8.2 = ISA …)
const MAP: Record<string, string[]> = {
  "9.1": ["A.8.1", "A.8.2"], // The Atmosphere (+ ISA)
  "9.2": ["A.8.3", "A.8.4", "A.8.6"], // Pressure, Density & Temperature
  "9.3": ["A.8.5", "A.8.11"], // Humidity & Precipitation
  "9.4": ["A.8.8"], // Pressure & Wind
  "9.5": ["A.8.10"], // Cloud Formation
  "9.6": ["A.8.15"], // Fog, Mist & Haze
  "9.7": ["A.8.16"], // Air Masses
  "9.8": ["A.8.17"], // Frontology
  "9.9": ["A.8.13"], // Ice Accretion
  "9.10": ["A.8.12"], // Thunderstorms
  "9.11": ["A.8.14"], // Flight over mountainous areas (turbulence)
  "9.12": ["A.8.19"], // Climatology (A.8.20 Tropical Revolving Storms is CPL-only — not in PPL syllabus)
  "9.13": ["A.8.7"], // Altimetry
  "9.14": ["A.8.21"], // Weather analysis & forecasting
  "9.15": ["A.8.21"], // Weather information for flight planning
};

// PPL depth filter: PPL candidates sit an easier paper than the CPL, so the
// hardest CPL questions (which probe beyond the PPL syllabus depth) are excluded.
export function getPPLMetQuestionsBySection(pplSection: string): MetQuestion[] {
  return pplQuestionDepth((MAP[pplSection] ?? []).flatMap((cpl) => getQuestionsBySection(cpl)));
}

// Full PPL Met exam bank = a reduced, PPL-depth subset of the CPL met questions
// for the mapped topics (not the whole CPL bank).
const PPL_MET_SECTIONS = [...new Set(Object.values(MAP).flat())];
export const PPL_MET_QUESTIONS: MetQuestion[] = pplQuestionDepth(
  MET_QUESTIONS.filter((q) => PPL_MET_SECTIONS.includes(q.sectionId)),
  Number.MAX_SAFE_INTEGER,
);
export const PPL_MET_QUESTION_COUNT = PPL_MET_QUESTIONS.length;

export function getPPLMetFlashcardsBySection(pplSection: string): MetFlashcard[] {
  return pplFlashcardDepth((MAP[pplSection] ?? []).flatMap((cpl) => getFlashcardsBySection(cpl)));
}

// Merge the mapped CPL notes into one PPL note (intro from the first; blocks,
// mustKnow and traps concatenated).
export function getPPLMetNoteBySection(pplSection: string): SectionNote | undefined {
  return mergePplNotes(pplSection, (MAP[pplSection] ?? []).map(getNoteBySection).filter((n): n is SectionNote => !!n));
}

// PPL section id → the figures.tsx key whose illustration covers it.
// (Figure keys follow the SACAA syllabus numbering: A.8.2 = Atmosphere image.)
export const PPL_MET_FIGURE_KEY: Record<string, string> = {
  "9.1": "A.8.2",
  "9.2": "A.8.3",
  "9.3": "A.8.5",
  "9.4": "A.8.8",
  "9.5": "A.8.10",
  "9.6": "A.8.15",
  "9.7": "A.8.16",
  "9.8": "A.8.17",
  "9.9": "A.8.13",
  "9.10": "A.8.12",
  "9.11": "A.8.14",
  "9.12": "A.8.19",
  "9.13": "A.8.7",
  "9.14": "A.8.21",
  "9.15": "A.8.21",
};
