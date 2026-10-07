"use client";

import { MockExam } from "@/app/components/MockExam";
import { IR_SPECPROC_QUESTIONS } from "@/app/data/ir-special-procedures-questions";
import { getIRSubject } from "@/app/data/ir-syllabus";

const S = getIRSubject("ir-special-procedures")!;

export default function IRExamPage() {
  return (
    <MockExam
      subjectId="ir-special-procedures"
      code={S.code}
      title={`IR ${S.title}`}
      questions={IR_SPECPROC_QUESTIONS}
      examSize={Math.min(S.examQuestions, IR_SPECPROC_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ir-specproc-mastery"
    />
  );
}
