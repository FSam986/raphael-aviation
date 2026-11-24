import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client for trusted server code (payment notifications). Never
// import this from a client component — the "server-only" import enforces it.
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role not configured");
  return createClient(url, key, { auth: { persistSession: false } });
}
