// Writes src/app/data/exam-counts.json = mock-exam bank size per subject, taken
// from examBank() (the exact bank the mock exam uses). The Exams list reads this
// instead of importing every question bank. Re-run after changing questions:
//   npx -y tsx scripts/gen-exam-counts.ts
import { writeFileSync } from "node:fs";
import { COURSES } from "../src/app/lib/course";
import { examBank } from "../src/app/lib/examBank";

const out: Record<string, number> = {};
for (const c of Object.values(COURSES)) for (const s of c.syllabus) out[s.id] = examBank(s.id).length;
writeFileSync(new URL("../src/app/data/exam-counts.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
console.log(out);
