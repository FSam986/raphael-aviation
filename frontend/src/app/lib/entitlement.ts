"use client";

// Per-course access level: "free" (explore: first topic of each subject),
// "course" (everything) or "premium" (everything + Pass Mode).
// Source of truth is the server `entitlements` table (written only by the
// verified PayFast notification, migration 006). It's cached per device so
// gating is instant and works offline; refreshEntitlements() re-syncs it.

import { supabase } from "@/lib/supabase";
import { COURSES, type CourseId } from "@/app/lib/course";
import type { Tier } from "@/app/lib/plans";

export type Access = "free" | Tier;

const KEY = "entitlement:v2";
const EMAIL_KEY = "auth:email";

// Accounts with full access to every course + premium (e.g. preview/admin).
// Compared lowercased. ponytail: hardcoded allowlist until role-based access.
const FULL_ACCESS_EMAILS = new Set<string>(["bobbyisgood@gmail.com"]);

type Cache = Partial<Record<CourseId, { tier: Tier; expires_at: string }>>;

function readCache(): Cache {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}") as Cache; } catch { return {}; }
}
const changed = () => window.dispatchEvent(new Event("course-change"));

/** Record the signed-in user's email (called from the auth guard). */
export function setCurrentEmail(email: string | null | undefined) {
  if (typeof window === "undefined") return;
  try {
    const prev = localStorage.getItem(EMAIL_KEY);
    const next = email ? email.toLowerCase() : null;
    if (next) localStorage.setItem(EMAIL_KEY, next);
    else { localStorage.removeItem(EMAIL_KEY); localStorage.removeItem(KEY); } // signed out: forget access
    if (prev !== next) changed();
  } catch { /* ignore */ }
}

/** True when the signed-in account is on the full-access allowlist. */
export function hasFullAccess(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const email = localStorage.getItem(EMAIL_KEY);
    return !!email && FULL_ACCESS_EMAILS.has(email);
  } catch { return false; }
}

/** The signed-in user's access level for a course right now. */
export function accessFor(course: CourseId | undefined): Access {
  if (typeof window === "undefined" || !course) return "free";
  if (hasFullAccess()) return "premium";
  const e = readCache()[course];
  return e && new Date(e.expires_at).getTime() > Date.now() ? e.tier : "free";
}

/** Paid access (Course or Premium) to a course. */
export const ownsCourse = (id: CourseId) => accessFor(id) !== "free";
/** Courses with paid access. */
export const ownedCourses = (): CourseId[] => (Object.keys(COURSES) as CourseId[]).filter(ownsCourse);
/** Active paid entitlements with expiry, for Settings. */
export function entitlementList(): { course: CourseId; tier: Tier; expires: Date }[] {
  if (hasFullAccess()) return (Object.keys(COURSES) as CourseId[]).map((course) => ({ course, tier: "premium" as Tier, expires: new Date(8.64e15) }));
  return Object.entries(readCache())
    .map(([course, e]) => ({ course: course as CourseId, tier: e!.tier, expires: new Date(e!.expires_at) }))
    .filter((e) => e.expires.getTime() > Date.now());
}

/** Re-read entitlements from the server into the device cache. */
export async function refreshEntitlements(): Promise<void> {
  const { data, error } = await supabase.from("entitlements").select("course, tier, expires_at");
  if (error || !data) return; // offline / not migrated: keep the cache
  const next: Cache = {};
  for (const r of data as { course: CourseId; tier: Tier; expires_at: string }[]) next[r.course] = { tier: r.tier, expires_at: r.expires_at };
  try {
    const prev = localStorage.getItem(KEY);
    const s = JSON.stringify(next);
    if (prev !== s) { localStorage.setItem(KEY, s); changed(); }
  } catch { /* ignore */ }
}
