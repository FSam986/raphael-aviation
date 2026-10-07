// Sub-topic (syllabus aspect) helpers for per-sub-topic counts and drills.
//
// Questions are tagged at section level; their sub-topic comes from (in order):
//   1. an explicit `aspect` field on the question (exact), else
//   2. the generated aspect-map.json produced by scripts/classify-aspects.py
//      — "exact" for single-sub-topic sections, "estimated" otherwise.
// Re-generate the map with:  python3 scripts/classify-aspects.py

import type { AirLawQuestion } from "@/app/data/airlaw-questions";
import aspectMapRaw from "@/app/data/aspect-map.json";

type MapEntry = { aspect: string | null; conf: "exact" | "estimated" | "unmatched" };
const aspectMap = aspectMapRaw as Record<string, MapEntry>;

/** Best-known sub-topic id for a question (e.g. "A.8.3.c"), or null if unknown. */
export function aspectOf(q: Pick<AirLawQuestion, "id" | "aspect">): string | null {
  return q.aspect ?? aspectMap[q.id]?.aspect ?? null;
}

/** Confidence of a question's sub-topic tag. */
export function aspectConfidence(q: Pick<AirLawQuestion, "id" | "aspect">): "exact" | "estimated" | "unmatched" {
  if (q.aspect) return "exact";
  return aspectMap[q.id]?.conf ?? "unmatched";
}

/** Count of questions per sub-topic id within a list (e.g. a section's bank). */
export function countByAspect(questions: Pick<AirLawQuestion, "id" | "aspect">[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const q of questions) {
    const a = aspectOf(q);
    if (a) out[a] = (out[a] ?? 0) + 1;
  }
  return out;
}

/** Filter a question list to a single sub-topic. */
export function filterByAspect<T extends Pick<AirLawQuestion, "id" | "aspect">>(questions: T[], aspectId: string): T[] {
  return questions.filter((q) => aspectOf(q) === aspectId);
}
