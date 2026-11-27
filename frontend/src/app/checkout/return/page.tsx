"use client";

// PayFast sends the buyer back here. Access is granted by the server-to-server
// notification (not by this page), so poll until it lands, then refresh access.
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { refreshEntitlements } from "@/app/lib/entitlement";

export default function CheckoutReturn() {
  return <Suspense><Return /></Suspense>;
}

function Return() {
  const ref = useSearchParams().get("ref");
  const [state, setState] = useState<"waiting" | "done" | "failed" | "slow">("waiting");

  useEffect(() => {
    if (!ref) return;
    let tries = 0, stop = false;
    const tick = async () => {
      if (stop) return;
      const { data } = await supabase.from("payments").select("status").eq("id", ref).maybeSingle();
      if (data?.status === "complete") { await refreshEntitlements(); setState("done"); return; }
      if (data?.status === "failed" || data?.status === "cancelled") { setState("failed"); return; }
      if (++tries >= 20) { setState("slow"); return; }
      setTimeout(tick, 3000);
    };
    void tick();
    return () => { stop = true; };
  }, [ref]);

  const msg = {
    waiting: ["Confirming your payment…", "This usually takes a few seconds."],
    done: ["You're all set", "Your plan is active. Every topic, question and mock exam in it is now open."],
    failed: ["Payment not completed", "Nothing was charged. You can try again from the plans page."],
    slow: ["Still confirming", "PayFast hasn't confirmed yet. Your plan will switch on automatically once it does — check Settings in a few minutes."],
  }[ref ? state : "failed"];

  return (
    <main className="min-h-screen bg-chart-ground flex items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <h1 className="font-display font-bold text-3xl text-chart-ink">{msg[0]}</h1>
        <p className="text-chart-ink-dim mt-3 text-sm">{msg[1]}</p>
        <Link href={state === "failed" ? "/pricing" : "/dashboard"} className="mt-6 inline-block w-full px-6 py-3 rounded-xl bg-gold text-gold-ink font-bold">
          {state === "failed" ? "Back to plans" : "Go to my dashboard"}
        </Link>
      </div>
    </main>
  );
}
