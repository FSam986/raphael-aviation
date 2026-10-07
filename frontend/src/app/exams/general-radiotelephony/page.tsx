"use client";

import { MockExam } from "@/app/components/MockExam";
import { GR_QUESTIONS } from "@/app/data/gr-questions";
import { findSubject } from "@/app/lib/course";

const S = findSubject("general-radiotelephony")!;

export default function GeneralRadiotelephonyExamPage() {
  return (
    <MockExam
      subjectId="general-radiotelephony"
      code={S.code}
      title={S.title}
      questions={GR_QUESTIONS}
      examSize={Math.min(S.examQuestions, GR_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="gr-mastery"
    />
  );
}
