"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { IR_FPP_QUESTIONS } from "@/app/data/ir-fpp-content";
import { getIRSubject } from "@/app/data/ir-syllabus";

const FPP = getIRSubject("ir-flight-performance")!;

export default function IRFppExamPage() {
  return (
    <MockExam
      subjectId="ir-flight-performance"
      code={FPP.code}
      title={`IR ${FPP.title}`}
      questions={examBank("ir-flight-performance")}
      examSize={Math.min(FPP.examQuestions, IR_FPP_QUESTIONS.length)}
      examMinutes={FPP.examMinutes ?? 120}
      passPercent={FPP.passPercent}
      storeKey="ir-fpp-mastery"
    />
  );
}
