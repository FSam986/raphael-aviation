"use client";

import { MockExam } from "@/app/components/MockExam";
import { IR_RADIONAV_QUESTIONS } from "@/app/data/ir-radio-navigation-questions";
import { getIRSubject } from "@/app/data/ir-syllabus";

const S = getIRSubject("ir-radio-navigation")!;

export default function IRExamPage() {
  return (
    <MockExam
      subjectId="ir-radio-navigation"
      code={S.code}
      title={`IR ${S.title}`}
      questions={IR_RADIONAV_QUESTIONS}
      examSize={Math.min(S.examQuestions, IR_RADIONAV_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="ir-radionav-mastery"
    />
  );
}
