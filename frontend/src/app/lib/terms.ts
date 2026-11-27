// Has this user accepted the current Terms of Use? Server is the source of truth
// (account_flags.terms_version, migration 005); a per-device cache avoids a
// network call on every page.
import { supabase } from "@/lib/supabase";
import { TERMS_VERSION } from "@/app/components/TermsBody";

const key = (userId: string) => `ra-terms:${userId}`;

export function markTermsAccepted(userId: string) {
  try { localStorage.setItem(key(userId), TERMS_VERSION); } catch { /* ignore */ }
}

export async function hasAcceptedTerms(userId: string): Promise<boolean> {
  try { if (localStorage.getItem(key(userId)) === TERMS_VERSION) return true; } catch { /* ignore */ }
  const { data, error } = await supabase.from("account_flags").select("terms_version").eq("user_id", userId).maybeSingle();
  if (error) return false;
  if (data?.terms_version === TERMS_VERSION) { markTermsAccepted(userId); return true; }
  return false;
}
