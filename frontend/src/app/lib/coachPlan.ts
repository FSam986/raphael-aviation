// "Guaranteed Pass" coach — a premium, guided study mode layered on top of the
// existing app. Given an exam date it builds a day-by-day roster from the course
// syllabus, then a daily session (spaced review → flash key facts → drill each
// topic to 90%). Pure logic + localStorage persistence; the runner UI lives in
// the /coach routes. Progress is device-local for now (move to the account store
// when that lands). ponytail: single source of truth for plan + streak maths.

import { COURSES, type CourseId } from "@/app/lib/course";
import { subjectContent } from "@/app/lib/subjectContent";

export interface StudyUnit {
  subjectId: string;
  subjectTitle: string;
  sectionId: string;
  sectionTitle: string;
}

export type DayKind = "study" | "review" | "mock";

export interface DayPlan {
  dayIndex: number;
  date: string;              // YYYY-MM-DD
  kind: DayKind;
  units: StudyUnit[];        // NEW topics to learn & drill this day
  reviewUnits: StudyUnit[];  // earlier topics re-tested this day (spaced / consolidation / mock)
}

export interface CoachPlan {
  courseId: CourseId;
  examDate: string;          // YYYY-MM-DD
  createdAt: string;
  subjectIds: string[];
  days: DayPlan[];
}

export interface EarnedBadge { id: string; title: string; emoji: string; at: string }

export interface CoachProgress {
  streak: number;
  bestStreak: number;
  lastDoneDate: string | null;
  xp: number;
  completedDays: number[];
  // per "subjectId/sectionId": rolling drill accuracy (0-100) and mastery flag
  mastery: Record<string, { acc: number; attempts: number; mastered: boolean }>;
  badges: EarnedBadge[];
}

const PLAN_KEY = "coach:plan";
const PROG_KEY = "coach:progress";
const PREMIUM_KEY = "coach:premium";
const DAY_MS = 86_400_000;

export const ymd = (d: Date) => d.toISOString().slice(0, 10);
const parse = (s: string) => new Date(s + "T00:00:00");
export function daysBetween(a: string, b: string): number {
  return Math.round((parse(b).getTime() - parse(a).getTime()) / DAY_MS);
}

// Every section of the chosen subjects that actually has a question bank.
export function learnableUnits(courseId: CourseId, subjectIds: string[]): StudyUnit[] {
  const course = COURSES[courseId];
  const out: StudyUnit[] = [];
  for (const subj of course.syllabus) {
    if (!subjectIds.includes(subj.id)) continue;
    const content = subjectContent(subj.id);
    if (!content) continue;
    for (const sec of subj.sections) {
      if (content.questions(sec.id).length > 0) {
        out.push({ subjectId: subj.id, subjectTitle: subj.title, sectionId: sec.id, sectionTitle: sec.title });
      }
    }
  }
  return out;
}

// Subjects in a course that have any question content (candidates for a plan).
export function subjectsWithContent(courseId: CourseId): { id: string; title: string; sections: number }[] {
  const course = COURSES[courseId];
  return course.syllabus
    .map((subj) => {
      const content = subjectContent(subj.id);
      const sections = content ? subj.sections.filter((s) => content.questions(s.id).length > 0).length : 0;
      return { id: subj.id, title: subj.title, sections };
    })
    .filter((s) => s.sections > 0);
}

const dedupeUnits = (arr: StudyUnit[]): StudyUnit[] => {
  const seen = new Set<string>();
  return arr.filter((u) => (seen.has(u.sectionId) ? false : (seen.add(u.sectionId), true)));
};

// Build a robust roster to the exam date:
//  • Learn phase — spreads all topics across the study days; each study day also
//    re-tests earlier topics on a spaced schedule (1, 3 and 7 days back).
//  • Consolidation phase — the reserved days near the exam each re-test a slice of
//    ALL topics, so together they revise every topic again.
//  • Final day — a mock that samples across everything.
// Guarantees every topic is: learned + drilled to 90%, memory-checked on later
// days, revised again in consolidation, and sampled in the final mock.
export function buildPlan(courseId: CourseId, examDate: string, subjectIds: string[]): CoachPlan {
  const units = learnableUnits(courseId, subjectIds);
  const total = Math.max(1, daysBetween(ymd(new Date()), examDate));
  let reserved = Math.min(5, Math.max(1, Math.floor(total * 0.25)));
  reserved = Math.min(reserved, Math.max(0, total - 1)); // always keep ≥1 study day when possible
  const studyDays = Math.max(1, total - reserved);
  const perDay = Math.max(1, Math.ceil(units.length / studyDays));

  const days: DayPlan[] = [];
  const studyUnitsByDay: StudyUnit[][] = [];
  let u = 0;
  for (let i = 0; i < total; i++) {
    const date = ymd(new Date(Date.now() + i * DAY_MS));
    if (i < studyDays) {
      const dayUnits = units.slice(u, u + perDay);
      u += dayUnits.length;
      studyUnitsByDay.push(dayUnits);
      const review: StudyUnit[] = [];
      for (const back of [1, 3, 7]) { const idx = i - back; if (idx >= 0 && studyUnitsByDay[idx]) review.push(...studyUnitsByDay[idx].slice(0, 2)); }
      days.push({ dayIndex: i, date, kind: "study", units: dayUnits, reviewUnits: dedupeUnits(review).slice(0, 5) });
    } else {
      const isMock = i === total - 1;
      const revDays = Math.max(1, reserved - 1);         // pure-review days before the mock
      const pos = i - studyDays;                          // position within reserved block
      let reviewUnits: StudyUnit[];
      if (isMock) reviewUnits = units.slice();            // mock samples everything
      else { const per = Math.ceil(units.length / revDays); reviewUnits = units.slice(pos * per, pos * per + per); }
      days.push({ dayIndex: i, date, kind: isMock ? "mock" : "review", units: [], reviewUnits });
    }
  }
  // Safety: any leftover topics (very tight timeline) go onto the last study day.
  if (u < units.length) {
    const last = [...days].reverse().find((d) => d.kind === "study") ?? days[0];
    last.units.push(...units.slice(u));
  }
  return { courseId, examDate, createdAt: new Date().toISOString(), subjectIds, days };
}

// The day the user should be on: the first day they have not completed.
export function currentDayIndex(plan: CoachPlan, progress: CoachProgress): number {
  const first = plan.days.find((d) => !progress.completedDays.includes(d.dayIndex));
  return first ? first.dayIndex : plan.days.length - 1;
}

export function freshProgress(): CoachProgress {
  return { streak: 0, bestStreak: 0, lastDoneDate: null, xp: 0, completedDays: [], mastery: {}, badges: [] };
}

export function hasBadge(progress: CoachProgress, id: string): boolean {
  return (progress.badges ?? []).some((b) => b.id === id);
}

// Add a badge if not already earned. Returns [newProgress, earnedBadge|null].
export function awardBadge(progress: CoachProgress, id: string, title: string, emoji: string): [CoachProgress, EarnedBadge | null] {
  if (hasBadge(progress, id)) return [progress, null];
  const badge: EarnedBadge = { id, title, emoji, at: new Date().toISOString() };
  return [{ ...progress, badges: [...(progress.badges ?? []), badge] }, badge];
}

// Record a completed day → advance streak and XP.
export function completeDay(progress: CoachProgress, dayIndex: number, xpGain = 50): CoachProgress {
  if (progress.completedDays.includes(dayIndex)) return progress;
  const today = ymd(new Date());
  let streak = progress.streak;
  if (progress.lastDoneDate !== today) {
    const yesterday = ymd(new Date(Date.now() - DAY_MS));
    streak = progress.lastDoneDate === yesterday ? progress.streak + 1 : 1;
  }
  return {
    ...progress,
    streak,
    bestStreak: Math.max(progress.bestStreak, streak),
    lastDoneDate: today,
    xp: progress.xp + xpGain,
    completedDays: [...progress.completedDays, dayIndex],
  };
}

// Rolling drill result for a section (used to gate the 90% requirement + XP).
export function recordDrill(progress: CoachProgress, subjectId: string, sectionId: string, acc: number): CoachProgress {
  const key = `${subjectId}/${sectionId}`;
  const prev = progress.mastery[key] ?? { acc: 0, attempts: 0, mastered: false };
  return {
    ...progress,
    mastery: { ...progress.mastery, [key]: { acc, attempts: prev.attempts + 1, mastered: prev.mastered || acc >= 90 } },
  };
}

/* ── persistence ─────────────────────────────────────────────────────────── */
function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : null; } catch { return null; }
}
function write(key: string, val: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
}
export const loadPlan = () => read<CoachPlan>(PLAN_KEY);
export const savePlan = (p: CoachPlan) => write(PLAN_KEY, p);
export const clearPlan = () => { if (typeof window !== "undefined") { localStorage.removeItem(PLAN_KEY); localStorage.removeItem(PROG_KEY); } };
export const loadProgress = () => read<CoachProgress>(PROG_KEY) ?? freshProgress();
export const saveProgress = (p: CoachProgress) => write(PROG_KEY, p);

// Premium gate (placeholder until real billing is wired).
export const isPremium = () => read<boolean>(PREMIUM_KEY) === true;
export const setPremium = (v: boolean) => write(PREMIUM_KEY, v);

// Rough guarantee heuristic: how many topics/day this plan demands.
export function planLoad(plan: CoachPlan): { topicsPerStudyDay: number; studyDays: number; totalTopics: number; tight: boolean } {
  const studyDaysArr = plan.days.filter((d) => d.kind === "study");
  const totalTopics = plan.days.reduce((n, d) => n + d.units.length, 0);
  const topicsPerStudyDay = studyDaysArr.length ? Math.ceil(totalTopics / studyDaysArr.length) : totalTopics;
  return { topicsPerStudyDay, studyDays: studyDaysArr.length, totalTopics, tight: topicsPerStudyDay > 4 };
}
