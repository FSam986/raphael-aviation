"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getPPLSubject } from "@/app/data/ppl-syllabus";

const S = getPPLSubject("ppl-aircraft-technical")!;

export default function PPLExamPage() {
  return (
    <MockExam
      subjectId="ppl-aircraft-technical"
      code={S.code}
      title={`PPL ${S.title}`}
      questions={examBank("ppl-aircraft-technical")}
      examSize={Math.min(S.examQuestions, bankSize("ppl-aircraft-technical"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ppl-agk-mastery"
    />
  );
}
