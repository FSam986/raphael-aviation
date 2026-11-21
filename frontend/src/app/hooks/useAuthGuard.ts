"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { setCurrentEmail } from "@/app/lib/entitlement";
import { startProgressSync, clearLocalProgress } from "@/app/lib/progressSync";

// Redirects to /login only when there is genuinely no stored session. Reads the
// session from local storage (getSession) rather than hitting the network on
// every navigation, so a slow/flaky connection never bounces a signed-in user
// to the login page. onAuthStateChange keeps it in sync if the user signs out.
export function useAuthGuard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Student");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      if (!session) { setCurrentEmail(null); router.push("/login"); return; }
      setCurrentEmail(session.user.email);
      setUserId(session.user.id);
      void startProgressSync(session.user.id);
      setUserName(session.user.user_metadata?.full_name?.split(" ")[0] || "Student");
      setLoading(false);
    });

    // Only react to an explicit sign-out; token refreshes keep the session.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") { setCurrentEmail(null); clearLocalProgress(); router.push("/login"); }
    });

    return () => { cancelled = true; sub.subscription.unsubscribe(); };
  }, [router]);

  return { userName, userId, loading };
}
