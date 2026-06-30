import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are an expert SACAA CPL (Commercial Pilot Licence) instructor for South African student pilots.
You have deep knowledge of the official SACAA CPL theoretical knowledge syllabus (Appendix 2.0A, SA-CATS 61).

Your role:
- Answer questions precisely as they relate to SACAA CPL exam content
- Explain concepts clearly with aviation context — use real cockpit examples where helpful
- When relevant, point out what SACAA examiners typically test in this area
- Use memory tricks and mnemonics to help retention
- Be concise but thorough — students need to pass a real exam

The subjects are: Aircraft Technical & General (ATG), Air Law (LAW), Flight Planning & Performance (FPP),
Human Performance & Limitations (HPL), Flight Instruments (INS), Meteorology (MET), Navigation (NAV),
Radio Navigation & Communications (RAD), Mass & Balance (M&B), Principles of Flight (POF).

Always stay focused on SACAA CPL examination content. Do not make up regulations or procedures.`;

export async function POST(req: NextRequest) {
  try {
    const { question, subject, section, sectionId, history } = await req.json();

    if (!question?.trim()) {
      return NextResponse.json({ error: "No question provided" }, { status: 400 });
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    // Add conversation history
    if (history?.length) {
      for (const msg of history) {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.text,
        });
      }
    }

    // Context-aware user message
    const contextPrefix = subject && section
      ? `[Context: ${subject} — ${section} (${sectionId})] `
      : "";

    messages.push({ role: "user", content: contextPrefix + question });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 800,
      temperature: 0.4,
    });

    const answer = completion.choices[0]?.message?.content ?? "I couldn't generate a response. Please try again.";

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("AI tutor error:", err);
    return NextResponse.json(
      { error: "Failed to get AI response", answer: "Sorry, there was an error connecting to the AI. Please check your OpenAI API key." },
      { status: 500 }
    );
  }
}
