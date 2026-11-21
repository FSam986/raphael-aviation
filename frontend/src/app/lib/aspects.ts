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

// ── Per-section sub-topic assignment ──────────────────────────────────────
// aspect-map.json is keyed by question id, but PPL / IR subjects reuse CPL
// questions under their OWN sub-topic ids. So resolve against the open
// section's items: (1) a stored tag that is one of these items, (2) the only
// item of a single-sub-topic section, (3) best keyword overlap with the item
// descriptions, else (4) the first item (never drop a question from the count).
type QText = Pick<AirLawQuestion, "id" | "aspect"> & { question?: string; optionA?: string; optionB?: string; optionC?: string; optionD?: string };
type Item = { id: string; topic: string };
const STOP = new Set("the and for with from that this which what when into their there these those than then they them your will would should could must have been being does each other more less only also such most very what aircraft aeroplane flight".split(" "));
const toks = (s: string) => new Set((s.toLowerCase().match(/[a-z0-9]{3,}/g) ?? []).filter((w) => !STOP.has(w)).map((w) => w.slice(0, 6)));

export function itemOf(q: QText, items: Item[]): string | null {
  if (!items.length) return null;
  const tagged = aspectOf(q);
  if (tagged && items.some((i) => i.id === tagged)) return tagged;
  if (items.length === 1) return items[0].id;
  const qt = toks([q.question, q.optionA, q.optionB, q.optionC, q.optionD].join(" "));
  let best = items[0].id, score = 0; // ponytail: keyword overlap heuristic; tag questions with `aspect` for exact counts
  for (const it of items) {
    let sc = 0;
    for (const w of toks(it.topic)) if (qt.has(w)) sc++;
    if (sc > score) { score = sc; best = it.id; }
  }
  return best;
}

export function countByItem(questions: QText[], items: Item[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const q of questions) { const a = itemOf(q, items); if (a) out[a] = (out[a] ?? 0) + 1; }
  return out;
}

export function filterByItem<T extends QText>(questions: T[], items: Item[], itemId: string): T[] {
  return questions.filter((q) => itemOf(q, items) === itemId);
}
