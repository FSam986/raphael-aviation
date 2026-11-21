"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { getSubject } from "@/app/data/sacaa-syllabus";

const LAW = getSubject("air-law")!;

export default function AirLawExamPage() {
  return (
    <MockExam
      subjectId="air-law"
      code={LAW.code}
      title={LAW.title}
      questions={examBank("air-law")}
      examSize={LAW.examQuestions}
      examMinutes={LAW.examMinutes ?? 120}
      passPercent={LAW.passPercent}
      storeKey="law-mastery"
    />
  );
}
