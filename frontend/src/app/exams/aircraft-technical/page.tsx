"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { ATG_QUESTIONS } from "@/app/data/aircraft-technical-questions";
import { findSubject } from "@/app/lib/course";

const S = findSubject("aircraft-technical")!;

export default function AircraftTechnicalExamPage() {
  return (
    <MockExam
      subjectId="aircraft-technical"
      code={S.code}
      title={S.title}
      questions={examBank("aircraft-technical")}
      examSize={Math.min(S.examQuestions, ATG_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="atg-mastery"
    />
  );
}
