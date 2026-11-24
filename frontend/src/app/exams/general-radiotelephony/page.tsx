"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { findSubject } from "@/app/lib/course";

const S = findSubject("general-radiotelephony")!;

export default function GeneralRadiotelephonyExamPage() {
  return (
    <MockExam
      subjectId="general-radiotelephony"
      code={S.code}
      title={S.title}
      questions={examBank("general-radiotelephony")}
      examSize={Math.min(S.examQuestions, bankSize("general-radiotelephony"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="gr-mastery"
    />
  );
}
