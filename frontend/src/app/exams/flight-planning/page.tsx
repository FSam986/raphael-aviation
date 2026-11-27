"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getSubject } from "@/app/data/sacaa-syllabus";

const FPP = getSubject("flight-planning")!;

export default function FlightPlanningExamPage() {
  return (
    <MockExam
      subjectId="flight-planning"
      code={FPP.code}
      title={FPP.title}
      questions={examBank("flight-planning")}
      examSize={Math.min(FPP.examQuestions, bankSize("flight-planning"))}
      examMinutes={FPP.examMinutes ?? 120}
      passPercent={FPP.passPercent}
      storeKey="fpp-mastery"
    />
  );
}
