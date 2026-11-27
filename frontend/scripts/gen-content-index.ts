// Writes src/app/data/content-index.json — a light summary of every subject's
// content (bank question ids per section, question/flashcard counts) so overview
// pages (lists, progress, Pass Mode, readiness) don't download any subject's
// content. Runs automatically before every build (npm "prebuild").
import { writeFileSync } from "node:fs";
import { COURSES } from "../src/app/lib/course";
import { loadSubjects, subjectContent } from "../src/app/lib/subjectContent";
import { examBank } from "../src/app/lib/examBank";

type Entry = { bank: Record<string, string[]>; q: Record<string, number>; fc: Record<string, number>; qDistinct: number };

async function main() {
  const subjects = Object.values(COURSES).flatMap((c) => c.syllabus);
  await loadSubjects(subjects.map((s) => s.id));
  const out: Record<string, Entry> = {};
  for (const s of subjects) {
    const c = subjectContent(s.id);
    if (!c) continue;
    const e: Entry = { bank: {}, q: {}, fc: {}, qDistinct: 0 };
    const distinct = new Set<string>();
    for (const sec of s.sections) {
      const qs = c.questions(sec.id);
      qs.forEach((q) => distinct.add(q.id));
      e.q[sec.id] = qs.length;
      e.fc[sec.id] = c.flashcards(sec.id).length;
    }
    e.qDistinct = distinct.size;
    for (const q of examBank(s.id)) (e.bank[q.sectionId] ??= []).push(q.id);
    out[s.id] = e;
  }
  writeFileSync(new URL("../src/app/data/content-index.json", import.meta.url), JSON.stringify(out));
  console.log(`content-index: ${Object.keys(out).length} subjects`);
}
main();
