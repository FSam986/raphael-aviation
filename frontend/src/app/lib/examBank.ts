// One question bank per subject, shared by Mock Exams and readiness, built from
// exactly what Study shows: every syllabus section's questions (incl. gap-fill),
// de-duplicated by id, re-homed to the subject's OWN section id (PPL / IR banks
// reuse CPL questions filed under CPL sections) and tagged with the sub-topic
// they belong to. So papers balance across the real syllabus and never repeat.
import { findSubject } from "@/app/lib/course";
import { subjectContent } from "@/app/lib/subjectContent";
import { itemOf } from "@/app/lib/aspects";
import type { ExamQuestion } from "@/app/components/MockExam";

const cache = new Map<string, ExamQuestion[]>();

export function examBank(subjectId: string): ExamQuestion[] {
  const hit = cache.get(subjectId);
  if (hit) return hit;
  const subject = findSubject(subjectId);
  const content = subjectContent(subjectId);
  const out: ExamQuestion[] = [];
  if (subject && content) {
    // Which sections list each question (several PPL / IR sections can share one CPL pool).
    const homes = new Map<string, { q: ExamQuestion; secs: string[] }>();
    for (const sec of subject.sections)
      for (const q of content.questions(sec.id)) {
        const h = homes.get(q.id);
        if (h) { if (!h.secs.includes(sec.id)) h.secs.push(sec.id); }
        else homes.set(q.id, { q: q as ExamQuestion, secs: [sec.id] });
      }
    // A shared question goes to whichever of its sections has the fewest so far,
    // so no section ends up empty and each question appears once.
    const count = new Map(subject.sections.map((s) => [s.id, 0]));
    for (const { q, secs } of homes.values()) {
      const home = secs.reduce((a, b) => (count.get(b)! < count.get(a)! ? b : a));
      count.set(home, count.get(home)! + 1);
      const items = subject.sections.find((s) => s.id === home)!.items;
      out.push({ ...q, sectionId: home, aspect: itemOf(q, items) ?? undefined } as ExamQuestion);
    }
  }
  cache.set(subjectId, out);
  return out;
}
