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
