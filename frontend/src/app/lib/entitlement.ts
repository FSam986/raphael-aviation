"use client";

// Per-course entitlement. ponytail: localStorage placeholder until real billing
// is wired, mirroring the `coach:premium` pattern. Owning a course grants its
// study/exam/flashcard content; everything else is locked. Billing/admin grants
// a course by calling grantCourse().

import { COURSES, type CourseId } from "@/app/lib/course";

const KEY = "entitlement:courses";
const EMAIL_KEY = "auth:email";

// Accounts with full access to every course + premium (e.g. preview/admin).
// Compared lowercased. ponytail: hardcoded allowlist until role-based access.
const FULL_ACCESS_EMAILS = new Set<string>(["bobbyisgood@gmail.com"]);

/** Record the signed-in user's email (called from the auth guard). */
export function setCurrentEmail(email: string | null | undefined) {
  if (typeof window === "undefined") return;
  try {
    const prev = localStorage.getItem(EMAIL_KEY);
    const next = email ? email.toLowerCase() : null;
    if (next) localStorage.setItem(EMAIL_KEY, next);
    else localStorage.removeItem(EMAIL_KEY);
    // Let guards/course UI re-evaluate access now that the account is known.
    if (prev !== next) window.dispatchEvent(new Event("course-change"));
  } catch {
    /* ignore */
  }
}

/** True when the signed-in account is on the full-access allowlist. */
export function hasFullAccess(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const email = localStorage.getItem(EMAIL_KEY);
    return !!email && FULL_ACCESS_EMAILS.has(email);
  } catch {
    return false;
  }
}
// Default grant for a fresh/free account. A PPL subscriber owns ["ppl"] only,
// so CPL stays locked — closing the cross-course leak.
const DEFAULT: CourseId[] = ["cpl"];

export function ownedCourses(): CourseId[] {
  if (typeof window === "undefined") return DEFAULT;
  if (hasFullAccess()) return Object.keys(COURSES) as CourseId[];
  try {
    const v = localStorage.getItem(KEY);
    if (!v) return DEFAULT;
    const arr = JSON.parse(v) as unknown;
    const owned = Array.isArray(arr) ? arr.filter((c): c is CourseId => typeof c === "string" && c in COURSES) : [];
    return owned.length ? owned : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function ownsCourse(id: CourseId): boolean {
  return ownedCourses().includes(id);
}

export function setOwnedCourses(ids: CourseId[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify([...new Set(ids)]));
    window.dispatchEvent(new Event("course-change"));
  } catch {
    /* ignore */
  }
}

export const grantCourse = (id: CourseId) => setOwnedCourses([...ownedCourses(), id]);
export const revokeCourse = (id: CourseId) => setOwnedCourses(ownedCourses().filter((c) => c !== id));
