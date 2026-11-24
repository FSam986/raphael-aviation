"use client";

import { MockExam } from "@/app/components/MockExam";
import { examBank } from "@/app/lib/examBank";
import { bankSize } from "@/app/lib/contentIndex";
import { getPPLSubject } from "@/app/data/ppl-syllabus";

const LAW = getPPLSubject("ppl-air-law")!;

export default function PPLAirLawExamPage() {
  return (
    <MockExam
      subjectId="ppl-air-law"
      code={LAW.code}
      title={`PPL ${LAW.title}`}
      questions={examBank("ppl-air-law")}
      examSize={Math.min(LAW.examQuestions, bankSize("ppl-air-law"))}
      examMinutes={LAW.examMinutes ?? 120}
      passPercent={LAW.passPercent}
      storeKey="ppl-law-mastery"
    />
  );
}
