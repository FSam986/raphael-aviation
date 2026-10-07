"use client";

import { MockExam } from "@/app/components/MockExam";
import { PPL_HPL_QUESTIONS } from "@/app/data/ppl-human-performance-questions";
import { findSubject } from "@/app/lib/course";

const S = findSubject("ppl-human-performance")!;

export default function PPLHumanPerformanceExamPage() {
  return (
    <MockExam
      subjectId="ppl-human-performance"
      code={S.code}
      title={S.title}
      questions={PPL_HPL_QUESTIONS}
      examSize={Math.min(S.examQuestions, PPL_HPL_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ppl-hpl-mastery"
    />
  );
}
