// PPL Aircraft Technical & General (AGK) study content — reuses the CPL material.
// The PPL AGK syllabus (6.1–6.6) is a subset of the CPL Aircraft Technical topics
// (airframe/powerplant/propellers/systems → A.1.x) plus the CPL Flight Instruments
// topics (instruments → A.7.x). Rather than duplicate content we MAP each PPL
// section to the CPL section(s) that cover it, so the CPL study notes AND their
// inline figures appear in PPL automatically.

import { ALL_INSTRUMENTS_QUESTIONS, getInstrumentsQuestionsBySection } from "@/app/data/instruments-questions";
import { getInstrumentsNoteBySection } from "@/app/data/instruments-notes";
import { getInstrumentsFlashcardsBySection } from "@/app/data/instruments-flashcards";
import { getAircraftTechnicalQuestionsBySection } from "@/app/data/aircraft-technical-questions";
import { getAircraftTechnicalNote } from "@/app/data/aircraft-technical-notes";
import { getAircraftTechnicalFlashcardsBySection } from "@/app/data/aircraft-technical-flashcards";
import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";
import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import { mergePplNotes, pplQuestionDepth, pplFlashcardDepth } from "@/app/data/ppl-depth";

// PPL AGK section id → the CPL section(s) that cover it.
// A.1.x = CPL Aircraft Technical; A.7.x = CPL Flight Instruments.
const MAP: Record<string, string[]> = {
  "6.1": ["A.1.1", "A.1.2"],                       // Airframe (elements + structure/systems)
  "6.2": ["A.1.4", "A.7.9"],                       // Powerplant — PISTON only (A.1.4) + engine-monitoring instruments (A.7.9). PPL syllabus 6.2 excludes gas-turbine (A.1.5).
  "6.3": ["A.1.4"],                                // Propellers (covered in the piston notes)
  "6.4": ["A.1.2", "A.1.3"],                       // Systems (airframe systems + electrics)
  "6.5": ["A.7.1", "A.7.2", "A.7.7"],              // Instruments — pitot-static (ASI/ALT/VSI), gyros, compass. A.7.5 (TAT/ram-rise) & A.7.8 (GPWS/TAWS/TCAS) are CPL-only.
  "6.6": ["A.1.6", "A.1.7"],                       // Airworthiness & emergency (emergency equip + hazards)
};

const isATG = (id: string) => id.startsWith("A.1");
const cplNote = (id: string): AirLawSectionNote | undefined =>
  (isATG(id) ? getAircraftTechnicalNote(id) : getInstrumentsNoteBySection(id)) as AirLawSectionNote | undefined;
const cplQuestions = (id: string): AirLawQuestion[] =>
  isATG(id) ? getAircraftTechnicalQuestionsBySection(id) : getInstrumentsQuestionsBySection(id);
const cplFlashcards = (id: string): AirLawFlashcard[] =>
  (isATG(id) ? getAircraftTechnicalFlashcardsBySection(id) : getInstrumentsFlashcardsBySection(id)) as AirLawFlashcard[];

// PPL depth filter: exclude the hardest CPL questions (beyond PPL syllabus
// depth) and cap each section so the PPL ATG bank stays a sensible size (the
// CPL bank is ~1600; a PPL student needs variety, not the whole thing).
export function getPPLAgkQuestionsBySection(s: string): AirLawQuestion[] { return pplQuestionDepth((MAP[s] ?? []).flatMap(cplQuestions), 60); }
export function getPPLAgkFlashcardsBySection(s: string): AirLawFlashcard[] { return pplFlashcardDepth((MAP[s] ?? []).flatMap(cplFlashcards)); }
export function getPPLAgkNoteBySection(s: string): AirLawSectionNote | undefined {
  return mergePplNotes(s, (MAP[s] ?? []).map(cplNote).filter((n): n is AirLawSectionNote => !!n));
}
const SECS = [...new Set(Object.values(MAP).flat())];
export const PPL_AGK_QUESTIONS: AirLawQuestion[] = ALL_INSTRUMENTS_QUESTIONS.filter((x) => SECS.includes(x.sectionId) && x.difficulty !== "hard");
export const PPL_AGK_FIGURE_KEY: Record<string, string> = { "6.5": "A.7.1" };
