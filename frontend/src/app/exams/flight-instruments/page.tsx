"use client";

import { MockExam } from "@/app/components/MockExam";
import { ALL_INSTRUMENTS_QUESTIONS } from "@/app/data/instruments-questions";
import { findSubject } from "@/app/lib/course";

const S = findSubject("flight-instruments")!;

export default function FlightInstrumentsExamPage() {
  return (
    <MockExam
      subjectId="flight-instruments"
      code={S.code}
      title={S.title}
      questions={ALL_INSTRUMENTS_QUESTIONS}
      examSize={Math.min(S.examQuestions, ALL_INSTRUMENTS_QUESTIONS.length)}
      examMinutes={S.examMinutes ?? 120}
      passPercent={S.passPercent}
      storeKey="instruments-mastery"
    />
  );
}
