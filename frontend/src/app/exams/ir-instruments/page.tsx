"use client";

import { MockExam } from "@/app/components/MockExam";
import { IR_INSTRUMENTS_QUESTIONS } from "@/app/data/ir-instruments-questions";
import { getIRSubject } from "@/app/data/ir-syllabus";

const S = getIRSubject("ir-instruments")!;

export default function IRExamPage() {
  return (
    <MockExam
      subjectId="ir-instruments"
      code={S.code}
      title={`IR ${S.title}`}
      questions={IR_INSTRUMENTS_QUESTIONS}
      examSize={Math.min(S.examQuestions, IR_INSTRUMENTS_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ir-instruments-mastery"
    />
  );
}
