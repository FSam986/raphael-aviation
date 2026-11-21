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
import { getRadioNavQuestionsBySection } from "@/app/data/radionav-questions";
import { getRadioNavNoteBySection } from "@/app/data/radionav-notes";
import { getRadioNavFlashcardsBySection } from "@/app/data/radionav-flashcards";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import { mergePplNotes, pplQuestionDepth, pplFlashcardDepth } from "@/app/data/ppl-depth";

const MAP: Record<string, string[]> = {
  "10.1": ["A.9.1"],           // Form of the Earth
  "10.2": ["A.9.4"],           // Time
  "10.3": ["A.9.5", "A.9.3"],  // Mapping (+ distance/scale)
  "10.4": ["A.9.2"],           // Direction — variation & deviation
  "10.5": ["A.7.7"],           // Aircraft Magnetism (compass)
  "10.6": ["A.9.7"],           // The Navigation Computer / triangle of velocities
  "10.7": ["A.9.8"],           // Practical Navigation (1-in-60). A.9.6 Relative Velocity is CPL-only — not in PPL syllabus.
  "10.8": ["A.10.1", "A.10.2", "A.10.3", "A.10.4", "A.10.12"], // Radio nav aids — ADF/NDB, VOR, DME, GNSS
};
const ins = (id: string) => id.startsWith("A.7");
const rad = (id: string) => id.startsWith("A.10");
const q = (id: string) => (rad(id) ? getRadioNavQuestionsBySection(id) : ins(id) ? getInstrumentsQuestionsBySection(id) : getNavQuestionsBySection(id));
const f = (id: string) => (rad(id) ? getRadioNavFlashcardsBySection(id) : ins(id) ? getInstrumentsFlashcardsBySection(id) : getNavFlashcardsBySection(id));
const nt = (id: string) => (rad(id) ? getRadioNavNoteBySection(id) : ins(id) ? getInstrumentsNoteBySection(id) : getNavNoteBySection(id));

// PPL depth filter: exclude the hardest CPL questions (beyond PPL syllabus depth).
export function getPPLNavQuestionsBySection(s: string): AirLawQuestion[] { return pplQuestionDepth((MAP[s] ?? []).flatMap(q)); }
export function getPPLNavFlashcardsBySection(s: string): AirLawFlashcard[] { return pplFlashcardDepth((MAP[s] ?? []).flatMap(f)); }
export function getPPLNavNoteBySection(s: string): AirLawSectionNote | undefined {
  return mergePplNotes(s, (MAP[s] ?? []).map(nt).filter((n): n is AirLawSectionNote => !!n));
}
const SECS = [...new Set(Object.values(MAP).flat())];
export const PPL_NAV_QUESTIONS: AirLawQuestion[] = pplQuestionDepth([
  ...NAV_QUESTIONS.filter((x) => SECS.includes(x.sectionId)),
  ...ALL_INSTRUMENTS_QUESTIONS.filter((x) => SECS.includes(x.sectionId)),
  ...SECS.filter((s) => s.startsWith("A.10")).flatMap((s) => getRadioNavQuestionsBySection(s)),
], Number.MAX_SAFE_INTEGER);
export const PPL_NAV_FIGURE_KEY: Record<string, string> = {
  "10.1": "A.9.1", "10.3": "A.9.5", "10.4": "A.9.2", "10.5": "A.7.7", "10.6": "A.9.7", "10.7": "A.9.8",
};
