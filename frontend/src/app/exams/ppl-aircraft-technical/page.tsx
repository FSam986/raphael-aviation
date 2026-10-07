"use client";

import { MockExam } from "@/app/components/MockExam";
import { PPL_AGK_QUESTIONS } from "@/app/data/ppl-agk-content";
import { getPPLSubject } from "@/app/data/ppl-syllabus";

const S = getPPLSubject("ppl-aircraft-technical")!;

export default function PPLExamPage() {
  return (
    <MockExam
      subjectId="ppl-aircraft-technical"
      code={S.code}
      title={`PPL ${S.title}`}
      questions={PPL_AGK_QUESTIONS}
      examSize={Math.min(S.examQuestions, PPL_AGK_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ppl-agk-mastery"
    />
  );
}
