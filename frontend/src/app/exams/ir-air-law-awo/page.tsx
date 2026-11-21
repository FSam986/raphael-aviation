"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { IR_AWO_QUESTIONS } from "@/app/data/ir-awo-content";
import { getIRSubject } from "@/app/data/ir-syllabus";

const AWO = getIRSubject("ir-air-law-awo")!;

export default function IRAwoExamPage() {
  return (
    <MockExam
      subjectId="ir-air-law-awo"
      code={AWO.code}
      title={`IR ${AWO.title}`}
      questions={examBank("ir-air-law-awo")}
      examSize={Math.min(AWO.examQuestions, IR_AWO_QUESTIONS.length)}
      examMinutes={AWO.examMinutes ?? 120}
      passPercent={AWO.passPercent}
      storeKey="ir-awo-mastery"
    />
  );
}
