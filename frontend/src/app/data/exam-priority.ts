// Exam-priority star ratings — cluster-level, one rating per syllabus aspect.
// See docs/met-priority-pilot.md for the method and evidence.
//
// NON-DESTRUCTIVE: these ratings only WEIGHT mock-exam sampling; they never gate
// or remove questions. Stars = drill weight, not inclusion. Every mock still
// touches every aspect (see examSelect.ts coverage floors).
//
// Ratings rest on syllabus centrality + cross-source overlap with the independent
// True North "Typical Questions" bank. There is NO exam-sitting/recurrence data,
// so no rating claims verified recurrence.

export type Star = 1 | 2 | 3;

// Meteorology (A.8.x). A.8.16 (Air Masses — prerequisite for Fronts) and
// A.8.20 (South African Weather — SACAA is SA-specific) were bumped 1→2 on
// review, as the keyword proxy under-counted them.
const MET_STARS: Record<string, Star> = {
  "A.8.3": 3, "A.8.4": 3, "A.8.7": 3, "A.8.8": 3, "A.8.9": 3,
  "A.8.10": 3, "A.8.15": 3, "A.8.17": 3, "A.8.21": 3,
  "A.8.1": 2, "A.8.2": 2, "A.8.5": 2, "A.8.6": 2, "A.8.11": 2,
  "A.8.12": 2, "A.8.13": 2, "A.8.14": 2, "A.8.16": 2, "A.8.20": 2,
  "A.8.18": 1, "A.8.19": 1,
};

const BY_SUBJECT: Record<string, Record<string, Star>> = {
  meteorology: MET_STARS,
};

/** Star lookup for a subject, or undefined if that subject isn't classified yet
 *  (callers then fall back to unweighted/equal sampling — no behaviour change). */
export function starOfSubject(subjectId: string): ((sectionId: string) => Star) | undefined {
  const map = BY_SUBJECT[subjectId];
  if (!map) return undefined;
  return (sectionId: string) => map[sectionId] ?? 1;
}
