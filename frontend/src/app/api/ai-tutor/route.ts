import { NextResponse } from "next/server";

// The AI Tutor is intentionally disabled for preview deployments.
// This route does not initialise an AI client or make external AI requests.
export async function POST() {
  return NextResponse.json(
    {
      error: "The AI Tutor is not enabled in this preview.",
      answer: "The AI Tutor is coming soon. Other Raphael Aviation features remain available."
    },
    { status: 503 }
  );
}
