"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { IR_MET_QUESTIONS } from "@/app/data/ir-met-content";
import { getIRSubject } from "@/app/data/ir-syllabus";

const MET = getIRSubject("ir-meteorology")!;

export default function IRMeteorologyExamPage() {
  return (
    <MockExam
      subjectId="ir-meteorology"
      code={MET.code}
      title={`IR ${MET.title}`}
      questions={examBank("ir-meteorology")}
      examSize={Math.min(MET.examQuestions, IR_MET_QUESTIONS.length)}
      examMinutes={MET.examMinutes ?? 120}
      passPercent={MET.passPercent}
      storeKey="ir-met-mastery"
    />
  );
}
