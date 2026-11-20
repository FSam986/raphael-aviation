// "Red-letter" study notes: words in the notes that appear as the CORRECT
// answer of an exam question in the same section are shown in red, so the
// student memorises exam answers while reading.
import type { ReactNode } from "react";

type Q = { correctAnswer: string; optionA: string; optionB: string; optionC: string; optionD: string };

const SKIP = /^(yes|no|true|false|none|all|both|neither|correct|incorrect|increase[sd]?|decrease[sd]?|remains? (the )?same|all of the above|none of the above|both a and b|a and b|1|2|3|4)$/i;

export function buildExamTerms(questions: Q[]): RegExp | null {
  const terms = new Set<string>();
  for (const q of questions) {
    const k = q.correctAnswer.toLowerCase();
    const raw = k === "a" ? q.optionA : k === "b" ? q.optionB : k === "c" ? q.optionC : q.optionD;
    const t = (raw ?? "").trim().replace(/[.;:,]+$/, "");
    const words = t.split(/\s+/).length;
    // ponytail: short answers only (1–5 words); long sentence answers rarely appear verbatim in notes
    if (t.length < 3 || t.length > 40 || words > 5 || SKIP.test(t) || /^[\d\s,&and]+$/i.test(t) || /\bis (in)?correct\b/i.test(t)) continue;
    terms.add(t.toLowerCase());
  }
  if (!terms.size) return null;
  const esc = [...terms].sort((a, b) => b.length - a.length).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`(?<![\\w-])(${esc.join("|")})(?![\\w-])`, "gi");
}

export function ExamText({ text, re }: { text: string; re: RegExp | null }): ReactNode {
  if (!re) return text;
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    out.push(<span key={i} className="exam-term" title="Appears as an exam answer">{m[0]}</span>);
    last = i + m[0].length;
  }
  if (!out.length) return text;
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
