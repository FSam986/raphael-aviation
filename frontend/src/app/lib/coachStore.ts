// Pass Mode's localStorage helpers, split from coachPlan.ts so light pages
// (e.g. Settings) can read the plan / premium flag without bundling every
// subject's content (coachPlan imports the content registry).
import type { CoachPlan } from "@/app/lib/coachPlan";
import { hasFullAccess } from "@/app/lib/entitlement";

export const PLAN_KEY = "coach:plan";
export const PROG_KEY = "coach:progress";
export const PREMIUM_KEY = "coach:premium";

export function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : null; } catch { return null; }
}
export function write(key: string, val: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
}
export const loadPlan = () => read<CoachPlan>(PLAN_KEY);
// Premium gate (placeholder until real billing is wired). Full-access accounts
// (preview/admin allowlist) always count as premium.
export const isPremium = () => hasFullAccess() || read<boolean>(PREMIUM_KEY) === true;
export const setPremium = (v: boolean) => write(PREMIUM_KEY, v);
