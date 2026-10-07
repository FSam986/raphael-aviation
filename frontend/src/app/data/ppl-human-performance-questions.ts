// PPL Human Performance & Limitations question bank.
// Sourced from the same Human Performance textbook mined for CPL, remapped to
// the (simpler) PPL HPL syllabus, which has two sections:
//   8.1 Basic Physiology   ← CPL A.6.1 physiology + A.6.2 health + A.6.4 first-aid/survival
//   8.2 Basic Psychology   ← CPL A.6.3 psychology / human factors
// PPL is a subset of CPL, so the CPL bank fully covers the PPL syllabus.

import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import { HUMAN_PERFORMANCE_QUESTIONS } from "@/app/data/human-performance-questions";

const SECTION_MAP: Record<string, string> = {
  "A.6.1": "8.1", // physiology
  "A.6.2": "8.1", // health & hygiene
  "A.6.4": "8.1", // first aid & survival
  "A.6.3": "8.2", // psychology / human factors
};

export const PPL_HPL_QUESTIONS: AirLawQuestion[] = HUMAN_PERFORMANCE_QUESTIONS.map((q) => ({
  ...q,
  id: `PPL-${q.id}`,
  sectionId: SECTION_MAP[q.sectionId] ?? "8.1",
  aspect: undefined,
}));

export function getPPLHplQuestionsBySection(sectionId: string): AirLawQuestion[] {
  return PPL_HPL_QUESTIONS.filter((q) => q.sectionId === sectionId);
}
