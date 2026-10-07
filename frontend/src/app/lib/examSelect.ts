// Adaptive exam selection + mastery tracking.
// The more papers a student sits, the more the draw targets their weak areas:
// wrong/unseen questions are favoured, mastered ones fade out. Purely local
// (localStorage) so it works with no backend.

export interface QMastery {
  seen: number;
  correct: number;
  wrong: number;
}
export type MasteryMap = Record<string, QMastery>;

interface HasId {
  id: string;
  sectionId: string;
}

// Higher weight = more likely to be drawn.
function weight(id: string, m: MasteryMap): number {
  const s = m[id];
  if (!s || s.seen === 0) return 3; // never seen → learn it
  if (s.wrong > s.correct) return 5; // struggling → drill it
  if (s.correct >= 2 && s.wrong === 0) return 0.4; // mastered → rarely
  return 1.5; // in progress
}

// Weighted sample without replacement.
function weightedPick<T extends HasId>(pool: T[], n: number, m: MasteryMap): T[] {
  const items = [...pool];
  const out: T[] = [];
  while (out.length < n && items.length) {
    const weights = items.map((it) => weight(it.id, m));
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    let idx = 0;
    for (; idx < items.length - 1; idx++) {
      r -= weights[idx];
      if (r <= 0) break;
    }
    out.push(items.splice(idx, 1)[0]);
  }
  return out;
}

const shuffle = <T,>(a: T[]): T[] => [...a].sort(() => Math.random() - 0.5);

function groupBy<T>(arr: T[], key: (x: T) => string): Map<string, T[]> {
  const m = new Map<string, T[]>();
  for (const x of arr) { const k = key(x); const a = m.get(k); if (a) a.push(x); else m.set(k, [x]); }
  return m;
}

// Round-robin quota: hand one slot to each group in turn (respecting each
// group's available size) until `target` slots are assigned. Guarantees the
// counts across groups never differ by more than 1 — no group can dominate.
function allocate(groups: string[], sizes: Map<string, number>, target: number): Map<string, number> {
  const quota = new Map<string, number>(groups.map((g) => [g, 0]));
  const n = groups.length;
  if (n === 0) return quota;
  let assigned = 0, i = 0, guard = 0;
  while (assigned < target && guard < target * n + n * 2) {
    const g = groups[i % n];
    if (quota.get(g)! < (sizes.get(g) ?? 0)) { quota.set(g, quota.get(g)! + 1); assigned++; }
    i++; guard++;
  }
  return quota;
}

/**
 * Build a balanced, full-syllabus paper. Two-level round-robin so no single
 * topic — and, when `aspectOf` is supplied, no single sub-topic within a topic —
 * can crowd the paper: every topic gets an (almost) equal share, and that share
 * is then spread evenly across the topic's sub-topics. Within each sub-topic the
 * draw is weighted toward weak/unseen questions. Returned length equals `count`
 * (capped by the bank).
 */
export function pickAdaptiveExam<T extends HasId>(
  all: T[], count: number, m: MasteryMap, aspectOf?: (q: T) => string | null
): T[] {
  const bySection = groupBy(all, (q) => q.sectionId);
  const sections = shuffle([...bySection.keys()]);
  if (sections.length === 0) return [];
  const target = Math.min(count, all.length);

  // Level 1: balance across topics (sections).
  const secSizes = new Map([...bySection].map(([s, arr]) => [s, arr.length]));
  const secQuota = allocate(sections, secSizes, target);

  const picked: T[] = [];
  for (const s of sections) {
    const q = secQuota.get(s)!;
    if (q <= 0) continue;
    const items = bySection.get(s)!;
    if (!aspectOf) { picked.push(...weightedPick(items, q, m)); continue; }
    // Level 2: balance across sub-topics within this topic.
    const byAspect = groupBy(items, (it) => aspectOf(it) ?? s);
    const aspects = shuffle([...byAspect.keys()]);
    const aspSizes = new Map([...byAspect].map(([a, arr]) => [a, arr.length]));
    const aspQuota = allocate(aspects, aspSizes, q);
    for (const a of aspects) {
      const aq = aspQuota.get(a)!;
      if (aq > 0) picked.push(...weightedPick(byAspect.get(a)!, aq, m));
    }
  }
  return shuffle(picked);
}

/** Record the results of a completed paper into the mastery map. */
export function recordResults(
  m: MasteryMap,
  results: { id: string; correct: boolean }[]
): MasteryMap {
  const next: MasteryMap = { ...m };
  for (const r of results) {
    const s = next[r.id] ?? { seen: 0, correct: 0, wrong: 0 };
    next[r.id] = {
      seen: s.seen + 1,
      correct: s.correct + (r.correct ? 1 : 0),
      wrong: s.wrong + (r.correct ? 0 : 1),
    };
  }
  return next;
}

/** A question counts as "mastered" once answered right ≥2 times with no misses. */
export function masteryStats(all: HasId[], m: MasteryMap) {
  let mastered = 0;
  let seen = 0;
  for (const q of all) {
    const s = m[q.id];
    if (s && s.seen > 0) {
      seen++;
      if (s.correct >= 2 && s.wrong === 0) mastered++;
    }
  }
  return { mastered, seen, total: all.length };
}
