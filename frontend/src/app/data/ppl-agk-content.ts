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

// PPL AGK section id → the CPL section(s) that cover it.
// A.1.x = CPL Aircraft Technical; A.7.x = CPL Flight Instruments.
const MAP: Record<string, string[]> = {
  "6.1": ["A.1.1", "A.1.2"],                       // Airframe (elements + structure/systems)
  "6.2": ["A.1.4", "A.1.5", "A.7.9"],              // Powerplant (piston + turbine + engine instruments)
  "6.3": ["A.1.4"],                                // Propellers (covered in the piston notes)
  "6.4": ["A.1.2", "A.1.3"],                       // Systems (airframe systems + electrics)
  "6.5": ["A.7.1", "A.7.2", "A.7.7", "A.7.5", "A.7.8"], // Instruments
  "6.6": ["A.1.6", "A.1.7"],                       // Airworthiness & emergency (emergency equip + hazards)
};

const isATG = (id: string) => id.startsWith("A.1");
const cplNote = (id: string): AirLawSectionNote | undefined =>
  (isATG(id) ? getAircraftTechnicalNote(id) : getInstrumentsNoteBySection(id)) as AirLawSectionNote | undefined;
const cplQuestions = (id: string): AirLawQuestion[] =>
  isATG(id) ? getAircraftTechnicalQuestionsBySection(id) : getInstrumentsQuestionsBySection(id);
const cplFlashcards = (id: string): AirLawFlashcard[] =>
  (isATG(id) ? getAircraftTechnicalFlashcardsBySection(id) : getInstrumentsFlashcardsBySection(id)) as AirLawFlashcard[];

// PPL depth filter: exclude the hardest CPL questions (beyond PPL syllabus depth).
export function getPPLAgkQuestionsBySection(s: string): AirLawQuestion[] { return (MAP[s] ?? []).flatMap(cplQuestions).filter((q) => q.difficulty !== "hard"); }
export function getPPLAgkFlashcardsBySection(s: string): AirLawFlashcard[] { return (MAP[s] ?? []).flatMap(cplFlashcards); }
export function getPPLAgkNoteBySection(s: string): AirLawSectionNote | undefined {
  const notes = (MAP[s] ?? []).map(cplNote).filter((n): n is AirLawSectionNote => !!n);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return notes[0];
  return { sectionId: s, title: notes[0].title, intro: notes[0].intro, blocks: notes.flatMap((n) => n.blocks), mustKnow: notes.flatMap((n) => n.mustKnow), traps: notes.flatMap((n) => n.traps) };
}
const SECS = [...new Set(Object.values(MAP).flat())];
export const PPL_AGK_QUESTIONS: AirLawQuestion[] = ALL_INSTRUMENTS_QUESTIONS.filter((x) => SECS.includes(x.sectionId) && x.difficulty !== "hard");
export const PPL_AGK_FIGURE_KEY: Record<string, string> = { "6.5": "A.7.1" };
