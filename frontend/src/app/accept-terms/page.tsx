"use client";

// Shown after sign-in until the user accepts the current TERMS_VERSION
// (useAuthGuard sends them here). Declining signs them out.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { TermsBody, TERMS_UPDATED, TERMS_VERSION } from "@/app/components/TermsBody";
import { markTermsAccepted } from "@/app/lib/terms";

export default function AcceptTermsPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/login");
      else setUserId(session.user.id);
    });
  }, [router]);

  async function accept() {
    if (!userId) return;
    setBusy(true); setError("");
    const { error } = await supabase.rpc("accept_terms", { version: TERMS_VERSION });
    // ponytail: if the backend migration isn't run yet, remember acceptance on this device only.
    if (error && !/function|schema cache|does not exist/i.test(error.message)) { setBusy(false); setError("Couldn't save your acceptance. Check your connection and try again."); return; }
    markTermsAccepted(userId);
    router.replace("/dashboard");
  }

  async function decline() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (!userId) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-chart-ground px-5 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mono text-[11px] tracking-[0.16em] uppercase text-chart-ink-faint">Before you continue · version {TERMS_UPDATED}</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-chart-ink mt-2">Terms of Use</h1>
        <p className="text-chart-ink-dim text-sm mt-2">Please read and accept the terms to use Raphael Aviation.</p>

        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-chart-ink">
          <strong className="text-red-300">Screenshots and screen recording are not allowed.</strong> You will be warned up to five times;
          any further screenshot or recording will block your account.
        </div>

        <article className="mt-6 max-h-[55vh] overflow-auto rounded-2xl border border-chart-line bg-chart-ground-2 p-5 text-chart-ink-dim text-[14px] leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-lg [&_h2]:text-chart-ink [&_h2]:mt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-chart-ink">
          <TermsBody />
        </article>

        <label className="mt-5 flex items-start gap-3 text-sm text-chart-ink cursor-pointer">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-yellow-400" />
          <span>I have read and agree to the Terms of Use, including the screenshot and screen-recording rules.</span>
        </label>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button onClick={accept} disabled={!agree || busy} className="px-6 py-3 rounded-xl bg-gold text-gold-ink font-bold disabled:opacity-40">
            {busy ? "Saving…" : "Accept and continue"}
          </button>
          <button onClick={decline} className="px-6 py-3 rounded-xl bg-zinc-900 text-zinc-300 text-sm">Decline and sign out</button>
        </div>
      </div>
    </main>
  );
}
