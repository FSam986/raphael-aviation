// IR Air Law & All-Weather Operations (C.3) — the Air Law parts reuse the CPL
// Air Law material (definitions, airspace/AIP/charts, Annex 14). The pure
// flight-procedure sections (general procedures, altimeter setting, departure,
// arrival/approach) come from the uploaded Flight Procedures textbook and stay
// unmapped here until built.

import { AIRLAW_ALL_QUESTIONS, getAirLawQuestionsBySection, type AirLawQuestion } from "@/app/data/airlaw-questions";
import { getAirLawFlashcardsBySection, type AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import { getAirLawNoteBySection, type AirLawSectionNote } from "@/app/data/airlaw-notes";
import { IR_AWO_MINED_QUESTIONS, getIRAwoMinedQuestionsBySection } from "@/app/data/ir-awo-questions";
import { getAWONoteBySection } from "@/app/data/awo-notes";

// IR section → CPL Air Law section(s) that cover it.
const MAP: Record<string, string[]> = {
  // C.3.1 carries the general SA CARs & rules of the air so that the IR Air Law
  // bank mirrors the full CPL Air Law bank (the IR combined exam reuses it).
  "C.3.1": ["A.3.1", "A.3.2", "A.3.3", "A.3.4", "A.3.5", "A.3.6", "A.3.7", "A.3.8", "A.3.10", "A.3.12", "A.3.13"],
  "C.3.5": ["A.3.14", "A.3.15", "A.3.16", "A.3.17"], // En-route: airspace, AIP, Jeppesen
  "C.3.7": ["A.3.18"], // ICAO Annex 14 — aerodromes
  // C.3.2 general procedures, C.3.3 altimeter setting, C.3.4 departure,
  // C.3.6 arrival/approach → from the Flight Procedures textbook (pending).
  // Every CPL Air Law section now maps to an IR code, so the IR Air Law bank
  // mirrors the full CPL Air Law bank.
};

export function getIRAwoQuestionsBySection(s: string): AirLawQuestion[] {
  // CPL Air Law reuse (via MAP) plus the dedicated AWOPS/AIR LAW IR bank whose
  // questions are already tagged with their own C.3.x section id.
  return [...(MAP[s] ?? []).flatMap((c) => getAirLawQuestionsBySection(c)), ...getIRAwoMinedQuestionsBySection(s)];
}
export function getIRAwoFlashcardsBySection(s: string): AirLawFlashcard[] {
  return (MAP[s] ?? []).flatMap((c) => getAirLawFlashcardsBySection(c));
}
export function getIRAwoNoteBySection(s: string): AirLawSectionNote | undefined {
  // Dedicated flight-procedure notes (C.3.2/3.4/3.5/3.6/3.7) take priority; other
  // sections fall back to the reused CPL Air Law notes via MAP.
  const awo = getAWONoteBySection(s);
  if (awo) return awo;
  const notes = (MAP[s] ?? []).map(getAirLawNoteBySection).filter((n): n is AirLawSectionNote => !!n);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return notes[0];
  return { sectionId: s, title: notes[0].title, intro: notes[0].intro, blocks: notes.flatMap((n) => n.blocks), mustKnow: notes.flatMap((n) => n.mustKnow), traps: notes.flatMap((n) => n.traps) };
}

export const IR_AWO_FIGURE_KEY: Record<string, string> = {
  "C.3.1": "A.3.1", "C.3.5": "A.3.16", "C.3.7": "A.3.18",
};

const IR_AWO_SECTIONS = [...new Set(Object.values(MAP).flat())];
export const IR_AWO_QUESTIONS: AirLawQuestion[] = [
  ...AIRLAW_ALL_QUESTIONS.filter((q) => IR_AWO_SECTIONS.includes(q.sectionId)),
  ...IR_AWO_MINED_QUESTIONS,
];
export const IR_AWO_QUESTION_COUNT = IR_AWO_QUESTIONS.length;
