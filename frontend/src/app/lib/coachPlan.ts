// "Guaranteed Pass" coach — a premium, guided study mode layered on top of the
// existing app. Given an exam date it builds a day-by-day roster from the course
// syllabus, then a daily session (spaced review → flash key facts → drill each
// topic to 90%). Pure logic + localStorage persistence; the runner UI lives in
// the /coach routes. Progress is device-local for now (move to the account store
// when that lands). ponytail: single source of truth for plan + streak maths.

import { COURSES, type CourseId } from "@/app/lib/course";
import { subjectContent } from "@/app/lib/subjectContent";
import { starOfSubject } from "@/app/data/exam-priority";

export interface StudyUnit {
  subjectId: string;
  subjectTitle: string;
  sectionId: string;
  sectionTitle: string;
  star: 1 | 2 | 3;           // pedagogical priority: 3 = foundational, 1 = specialised
}

export type DayKind = "study" | "review" | "mock";
// Master-Ladder phase a study day belongs to (foundations first, then build up).
export type Phase = "Foundations" | "Build" | "Complete";
export const PHASE_OF: Record<1 | 2 | 3, Phase> = { 3: "Foundations", 2: "Build", 1: "Complete" };

export interface DayPlan {
  dayIndex: number;
  date: string;              // YYYY-MM-DD
  kind: DayKind;
  units: StudyUnit[];        // NEW topics to learn & drill this day
  reviewUnits: StudyUnit[];  // earlier topics re-tested this day (spaced / consolidation / mock)
  phase?: Phase;             // which ladder phase this study day sits in
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
    const star = starOfSubject(subj.id);
    for (const sec of subj.sections) {
      if (content.questions(sec.id).length > 0) {
        out.push({ subjectId: subj.id, subjectTitle: subj.title, sectionId: sec.id, sectionTitle: sec.title, star: star ? star(sec.id) : 2 });
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
  // Master-Ladder ordering: foundations (3★) first, then build (2★), then
  // complete (1★). Stable sort preserves each subject's syllabus (teaching)
  // sequence within a tier, so prerequisites still come before what builds on
  // them. This replaces the old syllabus-linear topic-by-topic spread.
  const units = learnableUnits(courseId, subjectIds)
    .map((u, i) => [u, i] as const)
    .sort((a, b) => b[0].star - a[0].star || a[1] - b[1])
    .map(([u]) => u);
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
      const topStar = (dayUnits.reduce<number>((m, un) => Math.max(m, un.star), 0) || 1) as 1 | 2 | 3;
      days.push({ dayIndex: i, date, kind: "study", units: dayUnits, reviewUnits: dedupeUnits(review).slice(0, 5), phase: dayUnits.length ? PHASE_OF[topStar] : undefined });
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

// ── Master-Ladder mastery gate ─────────────────────────────────────────────
// A topic is "strong" once drilled ≥2 rounds with the latest round ≥90%. Using
// the latest accuracy (not a sticky flag) means a topic that later slips below
// 90% becomes un-strong again and resurfaces — "drill until it sticks".
export function isStrong(pr: CoachProgress, subjectId: string, sectionId: string): boolean {
  const m = pr.mastery[`${subjectId}/${sectionId}`];
  return !!m && m.acc >= 90 && m.attempts >= 2;
}

// Every study unit in ladder order (foundations first), deduped.
export function orderedUnits(plan: CoachPlan): StudyUnit[] {
  return dedupeUnits(plan.days.flatMap((d) => d.units));
}

// Highest tier (3→2→1) that still has an un-strong topic — the tier the student
// is gated at. null = everything strong. 2★ can't start while any 3★ is weak.
export function activeTier(plan: CoachPlan, pr: CoachProgress): 1 | 2 | 3 | null {
  const u = orderedUnits(plan);
  for (const s of [3, 2, 1] as const) {
    if (u.some((x) => x.star === s && !isStrong(pr, x.subjectId, x.sectionId))) return s;
  }
  return null;
}

// Next topics to drill now: the active tier's un-strong topics, foundations
// first, capped at `batch`. Weak topics stay in until strong; mastered ones drop.
export function nextSessionUnits(plan: CoachPlan, pr: CoachProgress, batch: number): StudyUnit[] {
  const tier = activeTier(plan, pr);
  if (tier == null) return [];
  return orderedUnits(plan)
    .filter((x) => x.star === tier && !isStrong(pr, x.subjectId, x.sectionId))
    .slice(0, Math.max(1, batch));
}

// Per-tier tally (strong / total) for the gate display.
export function ladderProgress(plan: CoachPlan, pr: CoachProgress): Record<1 | 2 | 3, { total: number; strong: number }> {
  const out = { 1: { total: 0, strong: 0 }, 2: { total: 0, strong: 0 }, 3: { total: 0, strong: 0 } };
  for (const x of orderedUnits(plan)) {
    const t = out[x.star];
    t.total++;
    if (isStrong(pr, x.subjectId, x.sectionId)) t.strong++;
  }
  return out;
}

// ── Human-factors timeline + readiness ─────────────────────────────────────
// Planning model from attention-span / spaced-repetition realities. These are
// ESTIMATES that make a pass likely with margin — never a guarantee. Tunable.
export const HF = {
  newTopicsPerDay: 6,        // attention-span cap on NEW topics/day (retention drops above this)
  comfortableNewPerDay: 4,   // lighter load → better retention and higher %
  studyDaysPerWeek: 6,       // 1 rest/light day per week (retention + anti-burnout)
};

export interface Timeline {
  totalTopics: number;
  minDays: number;           // intense but realistic (6 new topics/day)
  recommendedDays: number;   // comfortable load → stronger result
}

// Calendar days needed to learn every topic AND drill each to strong (≥2 spaced
// rounds), given a new-topics/day load, a consolidation buffer and weekly rest.
function daysFor(totalTopics: number, perDay: number): number {
  const introDays = Math.ceil(totalTopics / perDay);
  const consolidation = Math.max(3, Math.ceil(introDays * 0.35)); // 2nd spaced rounds + final review
  const studyDays = introDays + consolidation;
  return Math.ceil((studyDays * 7) / HF.studyDaysPerWeek);         // add weekly rest day
}

export function estimateTimeline(courseId: CourseId, subjectIds: string[]): Timeline {
  const T = learnableUnits(courseId, subjectIds).length;
  return { totalTopics: T, minDays: daysFor(T, HF.newTopicsPerDay), recommendedDays: daysFor(T, HF.comfortableNewPerDay) };
}

export type Feasibility = "comfortable" | "doable" | "tight" | "unrealistic";
export interface FeasibilityInfo { daysAvailable: number; requiredNewPerDay: number; verdict: Feasibility; recommendedDays: number; }

// Is a chosen exam date realistic? Required new-topics/day vs the healthy caps.
export function feasibility(courseId: CourseId, subjectIds: string[], examDate: string): FeasibilityInfo {
  const T = learnableUnits(courseId, subjectIds).length;
  const cal = Math.max(1, daysBetween(ymd(new Date()), examDate));
  const studyDays = Math.max(1, Math.floor((cal * HF.studyDaysPerWeek) / 7));
  const introDays = Math.max(1, studyDays - Math.max(3, Math.ceil(studyDays * 0.25))); // reserve consolidation
  const req = Math.ceil(T / introDays);
  const verdict: Feasibility =
    req <= HF.comfortableNewPerDay ? "comfortable" :
    req <= HF.newTopicsPerDay ? "doable" :
    req <= HF.newTopicsPerDay * 1.6 ? "tight" : "unrealistic";
  return { daysAvailable: cal, requiredNewPerDay: req, verdict, recommendedDays: daysFor(T, HF.comfortableNewPerDay) };
}

export type PaceStatus = "ahead" | "on-track" | "behind" | "at-risk";
export interface Pace { strong: number; total: number; daysLeft: number; neededPerDay: number; status: PaceStatus; }

// Mastery-based readiness: how many topics are strong vs how many days remain.
export function pace(plan: CoachPlan, pr: CoachProgress): Pace {
  const units = orderedUnits(plan);
  const total = units.length;
  const strong = units.filter((u) => isStrong(pr, u.subjectId, u.sectionId)).length;
  const daysLeft = Math.max(0, daysBetween(ymd(new Date()), plan.examDate));
  const studyLeft = Math.max(0, Math.floor((daysLeft * HF.studyDaysPerWeek) / 7));
  const remaining = total - strong;
  const neededPerDay = studyLeft > 0 ? remaining / studyLeft : remaining;
  let status: PaceStatus;
  if (remaining === 0) status = "ahead";
  else if (daysLeft === 0) status = "at-risk";
  else if (neededPerDay <= HF.comfortableNewPerDay) status = "on-track";
  else if (neededPerDay <= HF.newTopicsPerDay) status = "behind";
  else status = "at-risk";
  return { strong, total, daysLeft, neededPerDay: Math.ceil(neededPerDay), status };
}

export interface Nudge { tone: "mild" | "push" | "urgent"; title: string; body: string }

// Escalating nudge from pace + streak + whether today is done. Mild when on
// track; firmer when behind; urgent when at risk near the exam.
export function coachNudge(plan: CoachPlan, pr: CoachProgress, doneToday: boolean): Nudge {
  const p = pace(plan, pr);
  const streakBroken = pr.streak === 0 && pr.bestStreak > 0;
  if (p.status === "at-risk")
    return { tone: "urgent", title: p.daysLeft <= 1 ? "Final push — exam is here" : `At risk: ${p.total - p.strong} topics left, ${p.daysLeft} days`,
      body: p.daysLeft === 0 ? "Exam day. Do a full review pass of your weakest topics now." : `You'd need ${p.neededPerDay}/day — above the healthy limit. Do a double session today, and consider moving the date for a safer pass.` };
  if (p.status === "behind")
    return { tone: "push", title: `Behind pace — ${p.neededPerDay} topics/day to stay ready`,
      body: streakBroken ? "Your streak reset — restart it today. One solid session puts you back on track." : "A bit behind, but recoverable. Add one extra topic each day this week." };
  if (streakBroken)
    return { tone: "push", title: "Your streak reset", body: "Jump back in today — consistency is what makes it stick. One session rebuilds momentum." };
  if (!doneToday)
    return { tone: "mild", title: p.status === "ahead" ? "Ahead of schedule — keep it sharp" : "On track — today's session is ready",
      body: p.status === "ahead" ? "Everything's strong. Today, refresh your weakest topics so they stay that way." : `${p.strong}/${p.total} topics strong. Keep the daily habit and you'll pass with margin.` };
  return { tone: "mild", title: "Done for today ✓", body: `Streak ${pr.streak}. ${p.strong}/${p.total} topics strong — come back tomorrow to keep it climbing.` };
}

// Ladder/streak milestones → one-off badges (idempotent via hasBadge). Returns
// updated progress + any newly-earned badges to celebrate.
export function checkMilestones(plan: CoachPlan, pr: CoachProgress): [CoachProgress, EarnedBadge[]] {
  const l = ladderProgress(plan, pr);
  const got: EarnedBadge[] = [];
  let cur = pr;
  const award = (id: string, title: string, emoji: string, when: boolean) => {
    if (when && !hasBadge(cur, id)) { const [c, b] = awardBadge(cur, id, title, emoji); cur = c; if (b) got.push(b); }
  };
  award("ms:foundations", "Foundations mastered", "", l[3].total > 0 && l[3].strong >= l[3].total);
  award("ms:build", "Build phase cleared", "", l[2].total > 0 && l[2].strong >= l[2].total && l[3].strong >= l[3].total);
  const totalStrong = l[1].strong + l[2].strong + l[3].strong;
  const totalAll = l[1].total + l[2].total + l[3].total;
  award("ms:half", "Halfway — 50% strong", "", totalAll > 0 && totalStrong >= totalAll / 2);
  award("ms:ready", "Exam-ready — all topics strong", "", totalAll > 0 && totalStrong >= totalAll);
  award("ms:streak7", "7-day streak", "", pr.streak >= 7);
  award("ms:streak14", "14-day streak", "", pr.streak >= 14);
  return [cur, got];
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
