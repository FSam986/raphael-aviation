import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
  } catch (error) {
    return NextResponse.json({
      reply: "Unable to connect to Ollama.",
    });
  }
}