"use client";

import { MockExam } from "@/app/components/MockExam";
import { AIRLAW_ALL_QUESTIONS } from "@/app/data/airlaw-questions";
import { getSubject } from "@/app/data/sacaa-syllabus";

const LAW = getSubject("air-law")!;

export default function AirLawExamPage() {
  return (
    <MockExam
      subjectId="air-law"
      code={LAW.code}
      title={LAW.title}
      questions={AIRLAW_ALL_QUESTIONS}
      examSize={LAW.examQuestions}
      examMinutes={LAW.examMinutes ?? 120}
      passPercent={LAW.passPercent}
      storeKey="law-mastery"
    />
  );
}
