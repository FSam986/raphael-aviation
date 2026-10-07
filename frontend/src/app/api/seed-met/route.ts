import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { MET_QUESTIONS } from "@/app/data/met-questions";
import { MET_FLASHCARDS } from "@/app/data/met-flashcards";

// One-shot seeder: populates met_questions and met_flashcards in Supabase from
// the local TypeScript bank. Uses the SERVICE ROLE key so it bypasses RLS.
//
// Setup:
//   1. Run supabase/migrations/001_met_question_bank.sql in the Supabase SQL editor.
//   2. Add SUPABASE_SERVICE_ROLE_KEY to .env.local (never commit it).
//   3. Visit /api/seed-met once (GET) to load the data.
//
// The exam and flashcard UIs work off the local bank even without this step —
// seeding is only needed if you want the data queryable from the database and
// per-user history stored server-side.

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function GET(request: Request) {
  // Destructive route (wipes + reseeds). Requires ?secret= matching SEED_SECRET.
  const secret = process.env.SEED_SECRET;
  if (!secret || new URL(request.url).searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return NextResponse.json(
      {
        error:
          "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local. Add the service role key (Supabase → Project Settings → API) and retry.",
      },
      { status: 500 }
    );
  }

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const questionRows = MET_QUESTIONS.map((q) => ({
    section_id: q.sectionId,
    question: q.question,
    option_a: q.optionA,
    option_b: q.optionB,
    option_c: q.optionC,
    option_d: q.optionD,
    correct_answer: q.correctAnswer,
    explanation: q.explanation,
    difficulty: q.difficulty,
  }));

  const flashcardRows = MET_FLASHCARDS.map((c) => ({
    section_id: c.sectionId,
    front: c.front,
    back: c.back,
    difficulty: c.difficulty,
  }));

  try {
    // Clear existing seed to keep it idempotent.
    await admin.from("met_questions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await admin.from("met_flashcards").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    let insertedQ = 0;
    for (const batch of chunk(questionRows, 200)) {
      const { error } = await admin.from("met_questions").insert(batch);
      if (error) throw new Error(`questions: ${error.message}`);
      insertedQ += batch.length;
    }

    let insertedF = 0;
    for (const batch of chunk(flashcardRows, 200)) {
      const { error } = await admin.from("met_flashcards").insert(batch);
      if (error) throw new Error(`flashcards: ${error.message}`);
      insertedF += batch.length;
    }

    return NextResponse.json({
      ok: true,
      questionsInserted: insertedQ,
      flashcardsInserted: insertedF,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error during seed" },
      { status: 500 }
    );
  }
}
