"use client";

import { MockExam } from "@/app/components/MockExam";
import { PPL_POF_QUESTIONS } from "@/app/data/ppl-principles-of-flight-questions";
import { findSubject } from "@/app/lib/course";

const S = findSubject("ppl-principles-of-flight")!;

export default function PPLPofExamPage() {
  return (
    <MockExam
      subjectId="ppl-principles-of-flight"
      code={S.code}
      title={S.title}
      questions={PPL_POF_QUESTIONS}
      examSize={Math.min(S.examQuestions, PPL_POF_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ppl-pof-mastery"
    />
  );
}
