// IR Meteorology (C.1.x) reuses the CPL Meteorology material — the syllabus is
// the same. Maps each IR section to the CPL met section(s) that cover it.

import { MET_QUESTIONS, getQuestionsBySection, type MetQuestion } from "@/app/data/met-questions";
import { getFlashcardsBySection, type MetFlashcard } from "@/app/data/met-flashcards";
import { getNoteBySection, type SectionNote } from "@/app/data/met-notes";
import { IR_MET_MINED_QUESTIONS, getIRMetMinedQuestionsBySection } from "@/app/data/ir-met-questions";

// Reverse map: CPL met section (A.8.x) → the IR section(s) that use it, so the
// mined IR-met questions (tagged with A.8.x) surface under the right IR section.

// IR section id → CPL met content section(s) (met-notes numbering: A.8.1=Atmosphere).
const MAP: Record<string, string[]> = {
  "C.1.1": ["A.8.1", "A.8.2"],
  "C.1.2": ["A.8.3"],
  "C.1.3": ["A.8.4"],
  "C.1.4": ["A.8.5"],
  "C.1.5": ["A.8.6"],
  "C.1.6": ["A.8.7"],
  "C.1.7": ["A.8.8", "A.8.9"],
  "C.1.8": ["A.8.10"],
  "C.1.9": ["A.8.11"],
  "C.1.10": ["A.8.12"],
  "C.1.11": ["A.8.13"],
  "C.1.12": ["A.8.14"],
  "C.1.13": ["A.8.15", "A.8.16"],
  "C.1.14": ["A.8.17", "A.8.18"],
  "C.1.15": ["A.8.19"],
  "C.1.16": ["A.8.19", "A.8.20"],
  "C.1.17": ["A.8.21"],
};

export function getIRMetQuestionsBySection(s: string): MetQuestion[] {
  // CPL Met reuse (via MAP) plus the mined IR-MET-only questions, which are
  // tagged with the A.8.x id this IR section maps to.
  const cplSections = MAP[s] ?? [];
  return [
    ...cplSections.flatMap((cpl) => getQuestionsBySection(cpl)),
    ...cplSections.flatMap((cpl) => getIRMetMinedQuestionsBySection(cpl)),
  ];
}
export function getIRMetFlashcardsBySection(s: string): MetFlashcard[] {
  return (MAP[s] ?? []).flatMap((cpl) => getFlashcardsBySection(cpl));
}
export function getIRMetNoteBySection(s: string): SectionNote | undefined {
  const notes = (MAP[s] ?? []).map(getNoteBySection).filter((n): n is SectionNote => !!n);
  if (notes.length === 0) return undefined;
  if (notes.length === 1) return notes[0];
  return { sectionId: s, title: notes[0].title, intro: notes[0].intro, blocks: notes.flatMap((n) => n.blocks), mustKnow: notes.flatMap((n) => n.mustKnow), traps: notes.flatMap((n) => n.traps) };
}

// IR section → figures.tsx key (syllabus A.8.x numbering: A.8.2=Atmosphere image).
export const IR_MET_FIGURE_KEY: Record<string, string> = {
  "C.1.1": "A.8.2", "C.1.2": "A.8.3", "C.1.3": "A.8.4", "C.1.4": "A.8.5", "C.1.5": "A.8.6",
  "C.1.6": "A.8.7", "C.1.7": "A.8.8", "C.1.8": "A.8.10", "C.1.9": "A.8.11", "C.1.10": "A.8.12",
  "C.1.11": "A.8.13", "C.1.12": "A.8.14", "C.1.13": "A.8.15", "C.1.14": "A.8.17", "C.1.15": "A.8.19",
  "C.1.16": "A.8.20", "C.1.17": "A.8.21",
};

const IR_MET_SECTIONS = [...new Set(Object.values(MAP).flat())];
export const IR_MET_QUESTIONS: MetQuestion[] = [
  ...MET_QUESTIONS.filter((q) => IR_MET_SECTIONS.includes(q.sectionId)),
  ...IR_MET_MINED_QUESTIONS.filter((q) => IR_MET_SECTIONS.includes(q.sectionId)),
];
export const IR_MET_QUESTION_COUNT = IR_MET_QUESTIONS.length;
