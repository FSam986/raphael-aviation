"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import {
  pickAdaptiveExam,
  recordResults,
  masteryStats,
  type MasteryMap,
} from "@/app/lib/examSelect";
import { aspectOf } from "@/app/lib/aspects";

// Structural shape shared by every subject's question bank.
export interface ExamQuestion {
  id: string;
  sectionId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "a" | "b" | "c" | "d";
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

// One subject's slice of a combined (multi-subject) paper.
export interface ExamPlanEntry {
  label: string; // e.g. "Meteorology"
  storeKey: string; // that subject's mastery key
  questions: ExamQuestion[]; // that subject's bank
  count: number; // how many questions this subject contributes, in order
}

export interface MockExamProps {
  subjectId: string; // e.g. "meteorology" (Supabase subject field)
  code: string; // e.g. "MET"
  title: string; // e.g. "Meteorology"
  questions: ExamQuestion[]; // the full subject bank (single-subject mode)
  examSize: number;
  examMinutes: number;
  passPercent: number;
  storeKey: string; // localStorage key for this subject's mastery map
  // Combined mode: an ordered list of per-subject slices (SACAA-style paper).
  plan?: ExamPlanEntry[];
}

type Phase = "intro" | "running" | "results";

function loadMastery(key: string): MasteryMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

export function MockExam({
  subjectId,
  code,
  title,
  questions: bank,
  examSize,
  examMinutes,
  passPercent,
  storeKey,
  plan,
}: MockExamProps) {
  const { userName, userId, loading } = useAuthGuard();

  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  // question id → mastery storeKey (per-subject in combined mode).
  const [keyMap, setKeyMap] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "a" | "b" | "c" | "d">>({});
  const [secondsLeft, setSecondsLeft] = useState(examMinutes * 60);
  const [startedAt, setStartedAt] = useState<number>(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  // Bumped after each paper so the intro's mastery stats refresh.
  const [masteryVersion, setMasteryVersion] = useState(0);

  const planTotal = plan ? plan.reduce((n, p) => n + Math.min(p.count, p.questions.length), 0) : examSize;
  const bankTotal = plan ? plan.reduce((n, p) => n + p.questions.length, 0) : bank.length;

  const mastery = useMemo(() => {
    void masteryVersion; // recompute when a paper is recorded
    if (plan) {
      return plan.reduce(
        (acc, p) => {
          const m = masteryStats(p.questions, loadMastery(p.storeKey));
          return { mastered: acc.mastered + m.mastered, seen: acc.seen + m.seen, total: acc.total + m.total };
        },
        { mastered: 0, seen: 0, total: 0 }
      );
    }
    return masteryStats(bank, loadMastery(storeKey));
  }, [bank, storeKey, masteryVersion, plan]);

  const startExam = useCallback(() => {
    const km: Record<string, string> = {};
    let assembled: ExamQuestion[];
    if (plan) {
      assembled = [];
      for (const p of plan) {
        const picked = pickAdaptiveExam(p.questions, Math.min(p.count, p.questions.length), loadMastery(p.storeKey), aspectOf);
        for (const q of picked) {
          assembled.push(q);
          km[q.id] = p.storeKey;
        }
      }
    } else {
      assembled = pickAdaptiveExam(bank, examSize, loadMastery(storeKey), aspectOf);
      for (const q of assembled) km[q.id] = storeKey;
    }
    setQuestions(assembled);
    setKeyMap(km);
    setAnswers({});
    setCurrent(0);
    setSecondsLeft(examMinutes * 60);
    setStartedAt(Date.now());
    setPhase("running");
  }, [bank, examSize, examMinutes, storeKey, plan]);

  const score = useMemo(
    () => questions.reduce((n, q) => (answers[q.id] === q.correctAnswer ? n + 1 : n), 0),
    [questions, answers]
  );

  const finishExam = useCallback(async () => {
    setElapsedSec(startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0);
    setPhase("results");
    // Mastery: record each answer so future papers target weak areas and retire
    // mastered questions. Purely local, so it works with no backend.
    try {
      // Group results by the mastery key each question belongs to (per-subject
      // in combined mode) and record into each map.
      const byKey: Record<string, { id: string; correct: boolean }[]> = {};
      for (const q of questions) {
        const key = keyMap[q.id] ?? storeKey;
        (byKey[key] ??= []).push({ id: q.id, correct: answers[q.id] === q.correctAnswer });
      }
      for (const [key, results] of Object.entries(byKey)) {
        const updated = recordResults(loadMastery(key), results);
        localStorage.setItem(key, JSON.stringify(updated));
      }
      setMasteryVersion((v) => v + 1);
    } catch {
      /* ignore storage failures */
    }

    // Best-effort persistence to Supabase (won't block the UI if not configured).
    if (userId) {
      try {
        await supabase.from("exam_sessions").insert({
          user_id: userId,
          subject: subjectId,
          questions_used: questions.map((q) => q.id),
          score,
          total: questions.length,
          time_taken_sec: Math.round((Date.now() - startedAt) / 1000),
          completed: true,
        });
        await supabase.from("user_question_history").upsert(
          questions.map((q) => ({
            user_id: userId,
            question_id: q.id,
            last_seen: new Date().toISOString(),
            correct_count: answers[q.id] === q.correctAnswer ? 1 : 0,
          })),
          { onConflict: "user_id,question_id" }
        );
      } catch {
        /* Supabase optional — rotation still works via localStorage */
      }
    }
  }, [questions, score, userId, startedAt, answers, subjectId, storeKey, keyMap]);

  // Countdown timer
  useEffect(() => {
    if (phase !== "running") return;
    if (secondsLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      finishExam();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, secondsLeft, finishExam]);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading...</div>
      </div>
    );

  const q = questions[current];
  const answeredCount = Object.keys(answers).length;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const passed = pct >= passPercent;
  // Results analysis
  const attempted = questions.filter((qq) => answers[qq.id]).length;
  const incorrect = attempted - score;
  const unanswered = questions.length - attempted;
  const elapsedMin = Math.floor(elapsedSec / 60);
  const elapsedRem = elapsedSec % 60;
  const sectionAnalysis = (() => {
    const m: Record<string, { correct: number; total: number }> = {};
    for (const qq of questions) {
      const s = (m[qq.sectionId] ??= { correct: 0, total: 0 });
      s.total += 1;
      if (answers[qq.id] === qq.correctAnswer) s.correct += 1;
    }
    return Object.entries(m)
      .map(([sectionId, v]) => ({ sectionId, ...v, pct: Math.round((v.correct / v.total) * 100) }))
      .sort((a, b) => a.pct - b.pct);
  })();

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/exams" userName={userName} />

      <main className="flex-1 ml-64 overflow-auto">
        {/* INTRO */}
        {phase === "intro" && (
          <div className="max-w-2xl mx-auto px-10 py-16">
            <div className="text-yellow-400 font-mono text-sm mb-2">
              {code} · {title}
            </div>
            <h1 className="text-3xl font-black text-white mb-4">{title} Mock Exam</h1>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              A SACAA-style paper drawn from a bank of{" "}
              <strong className="text-white">{bankTotal}</strong> questions across the {title} syllabus.
              It <strong className="text-white">adapts to you</strong> — each paper targets the questions
              you got wrong or haven&apos;t seen and retires the ones you&apos;ve mastered, so the more
              papers you sit, the more exam-ready you become.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { k: "Questions", v: planTotal },
                { k: "Time limit", v: `${examMinutes} min` },
                { k: "Pass mark", v: `${passPercent}%` },
              ].map((s) => (
                <div key={s.k} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 text-center">
                  <div className="text-2xl font-black text-white">{s.v}</div>
                  <div className="text-xs text-zinc-600 mt-1">{s.k}</div>
                </div>
              ))}
            </div>

            {/* Mastery progress — climbs as the student sits more papers */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 mb-8">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-400 font-medium">Your mastery</span>
                <span className="text-zinc-500">
                  {mastery.mastered} / {mastery.total} mastered · {mastery.seen} attempted
                </span>
              </div>
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${mastery.total ? (mastery.mastered / mastery.total) * 100 : 0}%` }}
                />
              </div>
              <div className="text-[11px] text-zinc-600 mt-2">
                {mastery.mastered === 0
                  ? "Sit your first paper to start building mastery."
                  : mastery.mastered >= mastery.total
                  ? "Every question mastered — you're exam-ready. 🎯"
                  : "Keep sitting papers — weak areas will keep coming back until they stick."}
              </div>
            </div>
            <button
              onClick={startExam}
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-2xl transition-colors"
            >
              Start Exam →
            </button>
            <Link href="/exams" className="block text-center text-zinc-600 hover:text-zinc-400 text-sm mt-4">
              ← Back to exams
            </Link>
          </div>
        )}

        {/* RUNNING */}
        {phase === "running" && q && (
          <div className="max-w-3xl mx-auto px-10 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-zinc-500">
                Question <span className="text-white font-bold">{current + 1}</span> / {questions.length}
                <span className="ml-4 text-zinc-700">{answeredCount} answered</span>
              </div>
              <div
                className={`font-mono text-lg font-bold ${
                  secondsLeft < 300 ? "text-red-400" : "text-yellow-400"
                }`}
              >
                {mins}:{secs.toString().padStart(2, "0")}
              </div>
            </div>

            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-7 mb-6">
              <div className="text-xs font-mono text-yellow-400/60 mb-3">{q.sectionId}</div>
              <h2 className="text-lg font-bold text-white leading-relaxed mb-6">{q.question}</h2>
              <div className="space-y-3">
                {(["a", "b", "c", "d"] as const).map((opt) => {
                  const text = q[`option${opt.toUpperCase()}` as "optionA"];
                  const selected = answers[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left text-sm transition-colors border ${
                        selected
                          ? "bg-yellow-400/10 border-yellow-400 text-white"
                          : "bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          selected ? "bg-yellow-400 text-black" : "bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        {opt.toUpperCase()}
                      </span>
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors disabled:opacity-30"
              >
                ← Previous
              </button>
              {current < questions.length - 1 ? (
                <button
                  onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={finishExam}
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors"
                >
                  Submit Exam ✓
                </button>
              )}
            </div>

            {/* Question navigator */}
            <div className="mt-8 flex flex-wrap gap-2">
              {questions.map((qq, i) => (
                <button
                  key={qq.id}
                  onClick={() => setCurrent(i)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors ${
                    i === current
                      ? "bg-yellow-400 text-black"
                      : answers[qq.id]
                      ? "bg-yellow-400/20 text-yellow-400"
                      : "bg-zinc-900 text-zinc-600 hover:bg-zinc-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {phase === "results" && (
          <div className="max-w-3xl mx-auto px-10 py-10">
            <div
              className={`rounded-2xl p-8 mb-8 text-center border ${
                passed ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
              }`}
            >
              <div className="text-6xl mb-3">{passed ? "🎉" : "📉"}</div>
              <div className={`text-5xl font-black mb-2 ${passed ? "text-green-400" : "text-red-400"}`}>
                {pct}%
              </div>
              <div className="text-white font-bold text-lg">
                {score} / {questions.length} correct — {passed ? "PASS" : "Below pass mark"}
              </div>
              <div className="text-zinc-500 text-sm mt-1">Pass mark {passPercent}%</div>
              <div className="flex gap-3 justify-center mt-6">
                <button
                  onClick={startExam}
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-colors"
                >
                  Retake (new questions) ↻
                </button>
                <Link
                  href="/exams"
                  className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded-xl transition-colors"
                >
                  Done
                </Link>
              </div>
            </div>

            {/* Analysis: attempted / correct / incorrect / unanswered + time */}
            <h3 className="text-white font-bold mb-3">Analysis</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              {[
                { k: "Attempted", v: `${attempted} / ${questions.length}`, c: "text-white" },
                { k: "Correct", v: score, c: "text-green-400" },
                { k: "Incorrect", v: incorrect, c: "text-red-400" },
                { k: "Unanswered", v: unanswered, c: "text-zinc-400" },
                { k: "Time taken", v: `${elapsedMin}:${elapsedRem.toString().padStart(2, "0")}`, c: "text-white" },
              ].map((s) => (
                <div key={s.k} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 text-center">
                  <div className={`text-2xl font-black ${s.c}`}>{s.v}</div>
                  <div className="text-[11px] text-zinc-600 mt-1">{s.k}</div>
                </div>
              ))}
            </div>

            {/* Per-section accuracy (weakest first) */}
            {sectionAnalysis.length > 1 && (
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 mb-8">
                <div className="text-xs text-zinc-400 font-medium mb-3">Accuracy by topic — focus your revision on the lowest</div>
                <div className="space-y-2.5">
                  {sectionAnalysis.map((s) => (
                    <div key={s.sectionId} className="flex items-center gap-3">
                      <div className="font-mono text-[11px] text-yellow-400/70 w-16 shrink-0">{s.sectionId}</div>
                      <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.pct >= passPercent ? "bg-green-500" : "bg-red-500"}`}
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                      <div className="text-xs text-zinc-400 w-20 text-right tabular-nums">
                        {s.correct}/{s.total} · {s.pct}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-white font-bold mb-4">Review</h3>
            <div className="space-y-3">
              {questions.map((qq, i) => {
                const chosen = answers[qq.id];
                const correct = chosen === qq.correctAnswer;
                return (
                  <div
                    key={qq.id}
                    className={`bg-zinc-950 border rounded-2xl p-5 ${
                      correct ? "border-zinc-900" : "border-red-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`text-lg ${correct ? "text-green-400" : "text-red-400"}`}>
                        {correct ? "✓" : "✗"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-mono text-yellow-400/60 mb-1">
                          {i + 1}. {qq.sectionId}
                        </div>
                        <div className="text-sm text-white font-medium mb-2">{qq.question}</div>
                        <div className="text-xs text-zinc-400">
                          Correct:{" "}
                          <span className="text-green-400 font-medium">
                            {qq.correctAnswer.toUpperCase()}.{" "}
                            {qq[`option${qq.correctAnswer.toUpperCase()}` as "optionA"]}
                          </span>
                          {!correct && chosen && (
                            <span className="text-red-400 ml-3">You chose {chosen.toUpperCase()}</span>
                          )}
                          {!chosen && <span className="text-zinc-600 ml-3">Not answered</span>}
                        </div>
                        <div className="text-xs text-zinc-500 mt-2 leading-relaxed">{qq.explanation}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
