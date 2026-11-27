// Light summary of every subject's content, generated at build time by
// scripts/gen-content-index.ts. Overview pages read this instead of loading
// subject content chunks.
import INDEX from "@/app/data/content-index.json";

type Entry = { bank: Record<string, string[]>; q: Record<string, number>; fc: Record<string, number>; qDistinct: number };
const IDX = INDEX as Record<string, Entry>;

/** Mock-exam bank as { id, sectionId } refs (sections as the exam homes them). */
export function bankRefs(subjectId: string): { id: string; sectionId: string }[] {
  const e = IDX[subjectId];
  return e ? Object.entries(e.bank).flatMap(([sectionId, ids]) => ids.map((id) => ({ id, sectionId }))) : [];
}
export const bankSize = (subjectId: string) => bankRefs(subjectId).length;
export const sectionQuestionCount = (subjectId: string, sectionId: string) => IDX[subjectId]?.q[sectionId] ?? 0;
export const sectionFlashcardCount = (subjectId: string, sectionId: string) => IDX[subjectId]?.fc[sectionId] ?? 0;
export const distinctQuestionCount = (subjectId: string) => IDX[subjectId]?.qDistinct ?? 0;
export const indexed = (subjectId: string) => subjectId in IDX;
