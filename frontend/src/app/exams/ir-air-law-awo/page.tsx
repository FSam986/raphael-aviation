"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getIRSubject } from "@/app/data/ir-syllabus";

const AWO = getIRSubject("ir-air-law-awo")!;

export default function IRAwoExamPage() {
  return (
    <MockExam
      subjectId="ir-air-law-awo"
      code={AWO.code}
      title={`IR ${AWO.title}`}
      questions={examBank("ir-air-law-awo")}
      examSize={Math.min(AWO.examQuestions, bankSize("ir-air-law-awo"))}
      examMinutes={AWO.examMinutes ?? 120}
      passPercent={AWO.passPercent}
      storeKey="ir-awo-mastery"
    />
  );
}
