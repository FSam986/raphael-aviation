// Pricing catalogue — the single source for the pricing page AND the server's
// payment validation (the amount PayFast charges is checked against this).
// Prices in rand, VAT inclusive. Every plan is a one-off purchase of N months.

import type { CourseId } from "@/app/lib/course";

export type Tier = "course" | "premium";
export type Months = 1 | 3 | 6 | 12;

type Table = Partial<Record<Months, number>>;
export const PRICES: Record<CourseId, { course: Table; premium: Table }> = {
  cpl: { course: { 1: 549, 3: 1399, 6: 2399, 12: 3999 }, premium: { 1: 699, 3: 1799, 6: 2999, 12: 4999 } },
  ppl: { course: { 1: 449, 3: 1149, 6: 1899, 12: 2999 }, premium: { 1: 549, 3: 1399, 6: 2299, 12: 3599 } },
  ir:  { course: { 1: 499, 3: 1299, 6: 2199 },           premium: { 1: 649, 3: 1649, 6: 2749 } },
  nr:  { course: { 1: 249, 3: 599 },                     premium: { 1: 349, 3: 799 } },
  gr:  { course: { 1: 249, 3: 599 },                     premium: { 1: 349, 3: 799 } },
};
/** Every course, Premium. */
export const ALL_ACCESS: Table = { 1: 899, 12: 7499 };

export interface Plan {
  id: string;              // e.g. "cpl-premium-3", "all-premium-12"
  course: CourseId | "all";
  tier: Tier;
  months: Months;
  price: number;           // rand
}

export function planId(course: CourseId | "all", tier: Tier, months: Months) {
  return `${course}-${tier}-${months}`;
}

/** Look up a plan by id; undefined for anything not in the catalogue. */
export function getPlan(id: string): Plan | undefined {
  const m = /^(cpl|ppl|ir|nr|gr|all)-(course|premium)-(1|3|6|12)$/.exec(id);
  if (!m) return undefined;
  const course = m[1] as CourseId | "all";
  const tier = m[2] as Tier;
  const months = Number(m[3]) as Months;
  const price = course === "all" ? (tier === "premium" ? ALL_ACCESS[months] : undefined) : PRICES[course][tier][months];
  return price ? { id, course, tier, months, price } : undefined;
}

export const monthsLabel = (m: Months) => (m === 1 ? "1 month" : `${m} months`);
export const rand = (n: number) => "R" + n.toLocaleString("en-ZA", { maximumFractionDigits: 0 }).replace(/[, ]/g, " ");

/** Free plan: how many sections at the start of each subject are open, and the sample mock size. */
export const FREE_SECTIONS = 1;
export const FREE_MOCK_QUESTIONS = 10;
