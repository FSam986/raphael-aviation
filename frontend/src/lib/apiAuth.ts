// Server-side guard for the AI routes: require a signed-in user and cap request
// rate, so the OpenAI key can't be abused by anonymous callers. When Supabase is
// not configured (local dev), it no-ops so the app still runs.

import { createClient } from "@supabase/supabase-js";
import { supabaseConfigured } from "@/lib/supabase";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// In-memory token bucket (per serverless instance — good enough to stop runaway
// abuse; move to a shared store/Upstash for multi-instance production).
const hits = new Map<string, { n: number; t: number }>();
export function rateLimited(key: string, limit = 20, windowMs = 60_000): boolean {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || now - h.t > windowMs) { hits.set(key, { n: 1, t: now }); return false; }
  h.n += 1;
  return h.n > limit;
}

// Returns the user id for a request, or null if unauthenticated.
export async function getUserFromRequest(req: Request): Promise<string | null> {
  if (!supabaseConfigured) return "dev"; // dev/local: allow
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  try {
    const c = createClient(url, anon, { global: { headers: { Authorization: `Bearer ${token}` } } });
    const { data } = await c.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}

export function clientIp(req: Request): string {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
}
