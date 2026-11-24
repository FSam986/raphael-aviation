"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { findSubject } from "@/app/lib/course";

const S = findSubject("night-rating")!;

export default function NightRatingExamPage() {
  return (
    <MockExam
      subjectId="night-rating"
      code={S.code}
      title={S.title}
      questions={examBank("night-rating")}
      examSize={Math.min(S.examQuestions, bankSize("night-rating"))}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="nr-mastery"
    />
  );
}
