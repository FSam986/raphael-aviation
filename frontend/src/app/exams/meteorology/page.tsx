"use client";

import { MockExam } from "@/app/components/MockExam";
import { MET_QUESTIONS } from "@/app/data/met-questions";
import { getSubject } from "@/app/data/sacaa-syllabus";

const MET = getSubject("meteorology")!;

export default function MeteorologyExamPage() {
  return (
    <MockExam
      subjectId="meteorology"
      code={MET.code}
      title={MET.title}
      questions={MET_QUESTIONS}
      examSize={MET.examQuestions}
      examMinutes={MET.examMinutes ?? 120}
      passPercent={MET.passPercent}
      storeKey="met-mastery"
    />
  );
}
