"use client";

import { MockExam } from "@/app/components/MockExam";
import { IR_EXAM_PLAN, IR_EXAM_TOTAL, IR_EXAM_MINUTES, IR_EXAM_PASS } from "@/app/lib/irExam";

// The single SACAA-style Instrument Rating paper: 100 questions, 3 hours,
// all subjects mixed in the exam's subject order.
export default function IRCombinedExamPage() {
  return (
    <MockExam
      subjectId="ir-combined"
      code="IR"
      title="Instrument Rating"
      questions={[]}
      examSize={IR_EXAM_TOTAL}
      examMinutes={IR_EXAM_MINUTES}
      passPercent={IR_EXAM_PASS}
      storeKey="ir-combined-mastery"
      plan={IR_EXAM_PLAN}
    />
  );
}
