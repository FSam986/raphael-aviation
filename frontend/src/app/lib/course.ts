// Course registry — the app supports multiple SACAA courses (CPL, PPL).
// The active course is stored per-browser and decides which syllabus the
// subject-listing pages show. Subject ids are unique across courses
// (PPL subjects are "ppl-" prefixed) so routes never collide.

import { SACAA_SYLLABUS, type SyllabusSubject } from "@/app/data/sacaa-syllabus";
import { PPL_SYLLABUS } from "@/app/data/ppl-syllabus";
import { IR_SYLLABUS } from "@/app/data/ir-syllabus";
import { GR_SYLLABUS } from "@/app/data/gr-syllabus";

export type CourseId = "cpl" | "ppl" | "ir" | "gr";
export type CourseKind = "licence" | "rating";

export const COURSES: Record<
  CourseId,
  { id: CourseId; label: string; name: string; kind: CourseKind; syllabus: SyllabusSubject[] }
> = {
  cpl: { id: "cpl", label: "CPL", name: "Commercial Pilot Licence", kind: "licence", syllabus: SACAA_SYLLABUS },
  ppl: { id: "ppl", label: "PPL", name: "Private Pilot Licence", kind: "licence", syllabus: PPL_SYLLABUS },
  ir: { id: "ir", label: "IR", name: "Instrument Rating", kind: "rating", syllabus: IR_SYLLABUS },
  gr: { id: "gr", label: "GR", name: "General Radiotelephony", kind: "rating", syllabus: GR_SYLLABUS },
};

const KEY = "raphael-course";

export function getActiveCourse(): CourseId {
  if (typeof window === "undefined") return "cpl";
  try {
    const v = localStorage.getItem(KEY);
    return v === "ppl" || v === "ir" || v === "gr" ? (v as CourseId) : "cpl";
  } catch {
    return "cpl";
  }
}

export function setActiveCourse(id: CourseId) {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* ignore */
  }
}

/** Resolve a subject by id across every course (routes may hit either). */
export function findSubject(id: string): SyllabusSubject | undefined {
  for (const c of Object.values(COURSES)) {
    const s = c.syllabus.find((sub) => sub.id === id);
    if (s) return s;
  }
  return undefined;
}

/** Which course a subject belongs to (by syllabus membership, not id prefix —
 *  GR subjects aren't prefixed). Drives per-course access gating. */
export function courseOfSubject(id: string): CourseId | undefined {
  for (const c of Object.values(COURSES)) {
    if (c.syllabus.some((sub) => sub.id === id)) return c.id;
  }
  // Composite ids that aren't a single syllabus subject (e.g. "ir-combined").
  if (id.startsWith("ppl-")) return "ppl";
  if (id.startsWith("ir-")) return "ir";
  return undefined;
}

// Equivalent subject in another course (CPL "meteorology" ↔ PPL "ppl-meteorology"
// ↔ IR "ir-meteorology"), so switching course keeps the student on the same topic.
const BASE_ALIAS: Record<string, string> = { "air-law-awo": "air-law", "flight-performance": "flight-planning", "instruments": "flight-instruments" };
const baseOf = (id: string) => { const b = id.replace(/^(ppl|ir)-/, ""); return BASE_ALIAS[b] ?? b; };
export function equivalentSubject(id: string, course: CourseId): string | undefined {
  const b = baseOf(id);
  return COURSES[course].syllabus.find((s) => baseOf(s.id) === b)?.id;
}

/** Where to go after switching to `course` from `path` (null = stay on this page). */
export function pathForCourse(path: string, course: CourseId): string | null {
  const m = path.match(/^\/(study|exams|flashcards)\/([^/?#]+)/);
  if (!m) return null;                        // dashboard, progress, coach… re-render in place
  const [, area, subjectId] = m;
  if (courseOfSubject(subjectId) === course) return null;
  const eq = equivalentSubject(subjectId, course);
  if (eq) return `/${area}/${eq}`;
  if (area === "exams" && course === "ir") return "/exams/ir-combined";
  return `/${area}`;
}
