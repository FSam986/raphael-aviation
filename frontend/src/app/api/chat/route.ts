import { NextResponse } from "next/server";
import { getUserFromRequest, rateLimited, clientIp } from "@/lib/apiAuth";

export async function POST(req: Request) {
  const userId = await getUserFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  if (rateLimited(userId === "dev" ? clientIp(req) : userId, 20, 60_000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }
  const { message } = await req.json();

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:1b",
        prompt: message,
        stream: false,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      reply: data.response,
    });
  } catch {
    return NextResponse.json({
      reply: "Unable to connect to Ollama.",
    });
  }
}