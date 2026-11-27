"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getIRSubject } from "@/app/data/ir-syllabus";

const FPP = getIRSubject("ir-flight-performance")!;

export default function IRFppExamPage() {
  return (
    <MockExam
      subjectId="ir-flight-performance"
      code={FPP.code}
      title={`IR ${FPP.title}`}
      questions={examBank("ir-flight-performance")}
      examSize={Math.min(FPP.examQuestions, bankSize("ir-flight-performance"))}
      examMinutes={FPP.examMinutes ?? 120}
      passPercent={FPP.passPercent}
      storeKey="ir-fpp-mastery"
    />
  );
}
