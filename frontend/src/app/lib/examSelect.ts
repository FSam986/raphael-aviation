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

// ── Staged exam-priority progression ───────────────────────────────────────
// Stars (1/2/3) set drill WEIGHT, not inclusion. The weighting shifts across the
// mock sequence: early papers drill the high-yield ★★★ core; later papers
// broaden to ★★ then ★ for a full exam-representative spread. Coverage floors
// keep lower-star aspects present once the student advances. See exam-priority.ts.
export type ExamStage = 0 | 1 | 2;
interface StageCfg { name: string; blurb: string; targetPct: string; ratio: Record<number, number>; floorStars: number[]; }
export const STAGES: StageCfg[] = [
  { name: "Foundation", blurb: "Drilling the high-yield ★★★ topics first.", targetPct: "~70%", ratio: { 3: 70, 2: 25, 1: 5 }, floorStars: [3] },
  { name: "Expansion", blurb: "Broadening into ★★ topics.", targetPct: "~80–85%", ratio: { 3: 45, 2: 40, 1: 15 }, floorStars: [3, 2] },
  { name: "Completion", blurb: "Full exam-representative spread across every topic.", targetPct: "~85–90%", ratio: { 3: 35, 2: 35, 1: 30 }, floorStars: [3, 2, 1] },
];

/** Which stage the student is in, from how many papers they've sat (≈ total
 *  attempts ÷ paper size). Foundation 0–2 papers, Expansion 3–6, Completion 7+. */
export function examStage(m: MasteryMap, examSize: number): ExamStage {
  const totalSeen = Object.values(m).reduce((n, s) => n + s.seen, 0);
  const papers = examSize > 0 ? totalSeen / examSize : 0;
  return papers < 3 ? 0 : papers < 7 ? 1 : 2;
}

/** Largest-remainder apportionment of `target` slots across sections, by weight,
 *  respecting each section's capacity (`cap`) and a minimum (`floor`). Sum of the
 *  returned quotas equals `target` (capacity permitting). Deterministic. */
function apportion(sections: string[], weight: Map<string, number>, cap: Map<string, number>, floor: Map<string, number>, target: number): Map<string, number> {
  const q = new Map(sections.map((s) => [s, Math.min(floor.get(s) ?? 0, cap.get(s) ?? 0)]));
  const spare = (s: string) => (cap.get(s) ?? 0) - q.get(s)!;
  let assigned = [...q.values()].reduce((a, b) => a + b, 0);
  if (assigned >= target) {
    // Floors already meet/exceed target — trim lowest-weight sections down.
    for (const s of [...sections].sort((a, b) => weight.get(a)! - weight.get(b)!)) {
      while (assigned > target && q.get(s)! > 0) { q.set(s, q.get(s)! - 1); assigned--; }
    }
    return q;
  }
  let remaining = target - assigned;
  const wsum = sections.reduce((a, s) => a + (spare(s) > 0 ? weight.get(s)! : 0), 0) || 1;
  const frac: [string, number][] = [];
  for (const s of sections) {
    const want = spare(s) > 0 ? (remaining * weight.get(s)!) / wsum : 0;
    const give = Math.min(Math.floor(want), spare(s));
    q.set(s, q.get(s)! + give);
    frac.push([s, want - Math.floor(want)]);
  }
  remaining = target - [...q.values()].reduce((a, b) => a + b, 0);
  frac.sort((a, b) => b[1] - a[1]);
  for (const [s] of frac) { if (remaining <= 0) break; if (spare(s) > 0) { q.set(s, q.get(s)! + 1); remaining--; } }
  // Capacity-limited rounding leftovers: hand out anywhere with spare room.
  while (remaining > 0) {
    let gave = false;
    for (const s of sections) { if (spare(s) > 0) { q.set(s, q.get(s)! + 1); remaining--; gave = true; if (remaining <= 0) break; } }
    if (!gave) break;
  }
  return q;
}

/**
 * Build a balanced, full-syllabus paper. Two-level round-robin so no single
 * topic — and, when `aspectOf` is supplied, no single sub-topic within a topic —
 * can crowd the paper. Within each sub-topic the draw is weighted toward
 * weak/unseen questions. When `starOf` is supplied, Level-1 topic shares are
 * biased by the staged exam-priority ratios (★★★ drilled early, broadening over
 * the mock sequence), with coverage floors so topics are never abandoned.
 * Returned length equals `count` (capped by the bank).
 */
export function pickAdaptiveExam<T extends HasId>(
  all: T[], count: number, m: MasteryMap,
  aspectOf?: (q: T) => string | null,
  starOf?: (sectionId: string) => number
): T[] {
  const bySection = groupBy(all, (q) => q.sectionId);
  const sections = shuffle([...bySection.keys()]);
  if (sections.length === 0) return [];
  const target = Math.min(count, all.length);

  // Level 1: balance across topics (sections) — equal share, or staged
  // star-weighted share when a priority classification is available.
  const secSizes = new Map([...bySection].map(([s, arr]) => [s, arr.length]));
  let secQuota: Map<string, number>;
  if (starOf) {
    const cfg = STAGES[examStage(m, target)];
    const starCount: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
    for (const s of sections) starCount[starOf(s)]++;
    // Per-section weight = its star band's ratio spread over the sections in that band.
    const weight = new Map(sections.map((s) => {
      const st = starOf(s);
      return [s, (cfg.ratio[st] ?? 0) / (starCount[st] || 1)];
    }));
    const floor = new Map(sections.map((s) => [s, cfg.floorStars.includes(starOf(s)) ? 1 : 0]));
    secQuota = apportion(sections, weight, secSizes, floor, target);
  } else {
    secQuota = allocate(sections, secSizes, target);
  }

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
