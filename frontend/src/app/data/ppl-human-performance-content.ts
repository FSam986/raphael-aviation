// PPL Human Performance study content — reuses the CPL Human Performance
// material (notes + flashcards). The PPL HPL syllabus (8.1, 8.2) is a subset of
// the CPL A.6 topics, so rather than duplicate content we MAP each PPL section to
// the CPL section(s) that cover it, exactly as PPL Met reuses CPL Met.

import { getHumanPerformanceNote, type SectionNote } from "@/app/data/human-performance-notes";
import { getHumanPerformanceFlashcardsBySection } from "@/app/data/human-performance-flashcards";
import type { HPFlashcard } from "@/app/data/human-performance-flashcards";
import { mergePplNotes, pplFlashcardDepth } from "@/app/data/ppl-depth";

// PPL section id → the CPL A.6 section(s) that cover it.
const MAP: Record<string, string[]> = {
  "8.1": ["A.6.1", "A.6.2", "A.6.4"], // Basic Physiology (+ health, first aid/survival)
  "8.2": ["A.6.3"], // Basic Psychology / human factors
};

export function getPPLHplNoteBySection(pplSection: string): SectionNote | undefined {
  return mergePplNotes(pplSection, (MAP[pplSection] ?? []).map(getHumanPerformanceNote).filter((n): n is SectionNote => !!n));
}

export function getPPLHplFlashcardsBySection(pplSection: string): HPFlashcard[] {
  return pplFlashcardDepth((MAP[pplSection] ?? []).flatMap((cpl) => getHumanPerformanceFlashcardsBySection(cpl)));
}
