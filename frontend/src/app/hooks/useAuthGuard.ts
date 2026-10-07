"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, supabaseConfigured } from "@/lib/supabase";

// Redirects to /login if not signed in. Also enforces a SINGLE active session per
// account: each tab/device claims the session (stored on the user record); when a
// newer device claims it, older ones are signed out automatically. Returns the
// first name, user id and a loading flag while the check runs.
export function useAuthGuard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let poll: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { router.push("/login"); return; }
      if (cancelled) return;
      setUserId(data.user.id);
      setUserName(data.user.user_metadata?.full_name?.split(" ")[0] || "Student");
      setLoading(false);

      if (!supabaseConfigured) return; // single-session requires Supabase

      // Per-tab token. A brand-new tab has none → it becomes the active session.
      let token = "";
      try { token = sessionStorage.getItem("ra_session_token") || ""; } catch { /* ignore */ }
      const newTab = !token;
      if (!token) {
        token = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        try { sessionStorage.setItem("ra_session_token", token); } catch { /* ignore */ }
      }

      const current = data.user.user_metadata?.active_session as string | undefined;
      const signOutOther = async () => {
        if (poll) clearInterval(poll);
        try { sessionStorage.removeItem("ra_session_token"); } catch { /* ignore */ }
        await supabase.auth.signOut();
        router.push("/login?reason=another-session");
      };

      if (newTab || !current) {
        // Claim the session for this device (evicts others on their next poll).
        if (current !== token) await supabase.auth.updateUser({ data: { active_session: token } });
      } else if (current !== token) {
        // This tab was evicted by a newer session.
        await signOutOther();
        return;
      }

      // Keep checking — if another device takes over, sign this one out.
      poll = setInterval(async () => {
        const { data: fresh } = await supabase.auth.getUser();
        const active = fresh.user?.user_metadata?.active_session as string | undefined;
        if (active && active !== token) await signOutOther();
      }, 15_000);
    }

    init();
    return () => { cancelled = true; if (poll) clearInterval(poll); };
  }, [router]);

  return { userName, userId, loading };
}
