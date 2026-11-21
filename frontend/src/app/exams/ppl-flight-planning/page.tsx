"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { PPL_FPP_QUESTIONS } from "@/app/data/ppl-fpp-content";
import { getPPLSubject } from "@/app/data/ppl-syllabus";

const S = getPPLSubject("ppl-flight-planning")!;

export default function PPLExamPage() {
  return (
    <MockExam
      subjectId="ppl-flight-planning"
      code={S.code}
      title={`PPL ${S.title}`}
      questions={examBank("ppl-flight-planning")}
      examSize={Math.min(S.examQuestions, PPL_FPP_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ppl-fpp-mastery"
    />
  );
}
