"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { FPP_ALL_QUESTIONS } from "@/app/data/fpp-questions";
import { getSubject } from "@/app/data/sacaa-syllabus";

const FPP = getSubject("flight-planning")!;

export default function FlightPlanningExamPage() {
  return (
    <MockExam
      subjectId="flight-planning"
      code={FPP.code}
      title={FPP.title}
      questions={examBank("flight-planning")}
      examSize={Math.min(FPP.examQuestions, FPP_ALL_QUESTIONS.length)}
      examMinutes={FPP.examMinutes ?? 120}
      passPercent={FPP.passPercent}
      storeKey="fpp-mastery"
    />
  );
}
