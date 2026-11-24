"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getIRSubject } from "@/app/data/ir-syllabus";

const MET = getIRSubject("ir-meteorology")!;

export default function IRMeteorologyExamPage() {
  return (
    <MockExam
      subjectId="ir-meteorology"
      code={MET.code}
      title={`IR ${MET.title}`}
      questions={examBank("ir-meteorology")}
      examSize={Math.min(MET.examQuestions, bankSize("ir-meteorology"))}
      examMinutes={MET.examMinutes ?? 120}
      passPercent={MET.passPercent}
      storeKey="ir-met-mastery"
    />
  );
}
