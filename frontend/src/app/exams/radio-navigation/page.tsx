"use client";

import { MockExam } from "@/app/components/MockExam";
import { RADIONAV_QUESTIONS } from "@/app/data/radionav-questions";
import { findSubject } from "@/app/lib/course";

const S = findSubject("radio-navigation")!;

export default function RadioNavigationExamPage() {
  return (
    <MockExam
      subjectId="radio-navigation"
      code={S.code}
      title={S.title}
      questions={RADIONAV_QUESTIONS}
      examSize={Math.min(S.examQuestions, RADIONAV_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="radionav-mastery"
    />
  );
}
