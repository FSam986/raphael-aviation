import { pickPplNote } from "@/app/data/ppl-pick";
// PPL 8.1/8.2 topics per the PPL syllabus (first aid & survival are not in it;
// stress, fatigue and sleep sit under PPL 8.2 Basic psychology).
const PICK: Record<string, [string, string[]]> = {
  "8.1": ["Basic Physiology", ["A.6.1", "A.6.2#Personal hygiene|Problem areas|Tropical|Intoxication|Incapacitation"]],
  "8.2": ["Basic Psychology", ["A.6.3#Human information processing|Memory|Motor skills|Personality|Behaviour and skills|Judgement|Communication", "A.6.2#Stress|Fatigue|Body rhythms|Sleep"]],
};
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
  "8.1": ["A.6.1", "A.6.2"], // Basic Physiology + health (first aid/survival is not in the PPL syllabus)
  "8.2": ["A.6.3"], // Basic Psychology / human factors
};

export function getPPLHplNoteBySection(pplSection: string): SectionNote | undefined {
  const e = PICK[pplSection];
  return e ? (pickPplNote(pplSection, e[0], e[1]) as unknown as SectionNote | undefined) : undefined;
}

export function getPPLHplFlashcardsBySection(pplSection: string): HPFlashcard[] {
  return pplFlashcardDepth((MAP[pplSection] ?? []).flatMap((cpl) => getHumanPerformanceFlashcardsBySection(cpl)));
}
