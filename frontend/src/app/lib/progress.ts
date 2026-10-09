// User progress record — an auditable log of what the student has actually
// done: questions attempted/correct (per subject), study topics opened, active
// days / streak, and a "resume where you left off" pointer. Stored per-browser
// in localStorage under one key; every write dispatches "progress-change" so
// open pages refresh. Wrapped in try/catch — it must never break the UI, and a
// private window simply starts empty.
//
// This is the client record used for the progress dashboard and the resume
// feature. Mock exams and study quizzes also log attempts to Supabase
// separately (see MockExam); a future step can sync this summary server-side
// for a cross-device, auditable record to show a regulator.

const KEY = "ra-progress";

export interface ProgressState {
  q: { attempted: number; correct: number; bySubject: Record<string, { attempted: number; correct: number }> };
  study: { topics: Record<string, number>; bySubject: Record<string, number> };
  days: Record<string, { q: number; s: number }>;
  resume?: { href: string; subjectId: string; sectionId: string; itemId: string; ts: number };
  firstSeen?: number;
  lastSeen?: number;
}

function empty(): ProgressState {
  return { q: { attempted: 0, correct: 0, bySubject: {} }, study: { topics: {}, bySubject: {} }, days: {} };
}

function load(): ProgressState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as ProgressState;
    // defensive defaults for older records
    p.q ??= { attempted: 0, correct: 0, bySubject: {} };
    p.q.bySubject ??= {};
    p.study ??= { topics: {}, bySubject: {} };
    p.study.topics ??= {}; p.study.bySubject ??= {};
    p.days ??= {};
    return p;
  } catch {
    return empty();
  }
}

function save(p: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    const now = Date.now();
    p.firstSeen ??= now;
    p.lastSeen = now;
    localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event("progress-change"));
  } catch {
    /* storage unavailable — ignore */
  }
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Record the result of a study-page quiz (or any question set). */
export function recordQuiz(subjectId: string, attempted: number, correct: number) {
  if (attempted <= 0) return;
  const p = load();
  p.q.attempted += attempted;
  p.q.correct += correct;
  const s = (p.q.bySubject[subjectId] ??= { attempted: 0, correct: 0 });
  s.attempted += attempted; s.correct += correct;
  const d = (p.days[today()] ??= { q: 0, s: 0 });
  d.q += attempted;
  save(p);
}

/** Record that a study topic was opened, and set it as the resume point. */
export function recordStudyOpen(subjectId: string, sectionId: string, itemId: string, href: string) {
  const p = load();
  const key = `${subjectId}|${sectionId}|${itemId}`;
  const firstTime = !p.study.topics[key];
  p.study.topics[key] = Date.now();
  if (firstTime) p.study.bySubject[subjectId] = (p.study.bySubject[subjectId] ?? 0) + 1;
  const d = (p.days[today()] ??= { q: 0, s: 0 });
  d.s += 1;
  p.resume = { href, subjectId, sectionId, itemId, ts: Date.now() };
  save(p);
}

export function getResume(): ProgressState["resume"] | null {
  return load().resume ?? null;
}

/** Current consecutive-day streak ending today (or yesterday). */
function streak(days: Record<string, unknown>): number {
  let n = 0;
  const d = new Date();
  // allow the streak to still count if the user hasn't acted yet today
  if (!days[d.toISOString().slice(0, 10)]) d.setDate(d.getDate() - 1);
  for (;;) {
    const key = d.toISOString().slice(0, 10);
    if (days[key]) { n += 1; d.setDate(d.getDate() - 1); } else break;
  }
  return n;
}

export interface ProgressSummary {
  attempted: number;
  correct: number;
  accuracy: number; // 0-100
  topicsStudied: number;
  activeDays: number;
  streak: number;
  firstSeen?: number;
  lastSeen?: number;
  bySubject: Record<string, { attempted: number; correct: number; topics: number }>;
}

export function getProgress(): ProgressSummary {
  const p = load();
  const bySubject: ProgressSummary["bySubject"] = {};
  for (const [sid, v] of Object.entries(p.q.bySubject)) bySubject[sid] = { attempted: v.attempted, correct: v.correct, topics: p.study.bySubject[sid] ?? 0 };
  for (const [sid, t] of Object.entries(p.study.bySubject)) (bySubject[sid] ??= { attempted: 0, correct: 0, topics: 0 }).topics = t;
  return {
    attempted: p.q.attempted,
    correct: p.q.correct,
    accuracy: p.q.attempted ? Math.round((p.q.correct / p.q.attempted) * 100) : 0,
    topicsStudied: Object.keys(p.study.topics).length,
    activeDays: Object.keys(p.days).length,
    streak: streak(p.days),
    firstSeen: p.firstSeen,
    lastSeen: p.lastSeen,
    bySubject,
  };
}
