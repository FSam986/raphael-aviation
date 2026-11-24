"use client";

// Screenshot deterrent, mounted once in the root layout for signed-in users.
//
// What each platform can actually do (no web page can stop an OS screenshot):
//  • Android app — FLAG_SECURE (MainActivity) makes screenshots/recordings come
//    out black at OS level; Android 14+ also reports the attempt → strike.
//  • iOS app — iOS can't block screenshots; it reports them after the fact →
//    strike. Screen recording is covered with a black view natively.
//  • Web — the PrintScreen key (Windows) is caught: the clipboard image is
//    replaced with a warning, so a pasted screenshot is blank → strike.
//    Win+Shift+S is caught where the browser sees it. macOS shortcuts never
//    reach the page, so they can't be detected. Printing / Save-as-PDF are
//    blanked by CSS (globals.css @media print).
// Every strike goes through the record_screenshot() RPC (migration 004), which
// blocks the account at 5. Blocked accounts are signed out on every load.

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { clearLocalProgress } from "@/app/lib/progressSync";

const LIMIT = 5;

export default function ScreenshotGuard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [warning, setWarning] = useState<number | null>(null); // strikes so far, null = hidden
  const [blocked, setBlocked] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) setUserId(session.user.id); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUserId(session?.user.id ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Re-checked on every sign-in, so a blocked account can't just log in again.
  useEffect(() => {
    if (!userId) return;
    supabase.from("account_flags").select("blocked").eq("user_id", userId).maybeSingle()
      .then(({ data }) => { if (data?.blocked) setBlocked(true); });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    async function strike(source: string) {
      const now = Date.now();
      if (now - last.current < 2000) return; // one strike per burst
      last.current = now;
      setWarning(0);
      const { data, error } = await supabase.rpc("record_screenshot", { source });
      const row = Array.isArray(data) ? data[0] : data;
      if (error || !row) { setWarning(-1); return; } // backend not set up: warn only
      setWarning(row.screenshot_strikes);
      if (row.blocked) setBlocked(true);
    }

    const isWindows = /Win/i.test(navigator.platform || navigator.userAgent);
    function onKey(e: KeyboardEvent) {
      const printScreen = e.key === "PrintScreen" || e.code === "PrintScreen";
      const snip = isWindows && e.metaKey && e.shiftKey && e.key.toLowerCase() === "s";
      if (!printScreen && !snip) return;
      // Replace the captured image on the clipboard (PrintScreen copies to it).
      navigator.clipboard?.writeText("Screenshots of Raphael Aviation are not allowed.").catch(() => {});
      void strike("web");
    }
    const onNative = () => void strike("app");

    window.addEventListener("keyup", onKey);
    window.addEventListener("keydown", onKey);
    window.addEventListener("raScreenshot", onNative); // fired by the Android / iOS shell
    return () => {
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("raScreenshot", onNative);
    };
  }, [userId]);

  // Blocked: sign out and keep the notice up.
  useEffect(() => {
    if (!blocked) return;
    void supabase.auth.signOut().then(() => clearLocalProgress());
  }, [blocked]);

  useEffect(() => {
    if (warning === null || blocked) return;
    const t = setTimeout(() => setWarning(null), 4000);
    return () => clearTimeout(t);
  }, [warning, blocked]);

  if (blocked)
    return (
      <div role="alertdialog" aria-modal="true" className="fixed inset-0 z-[10000] bg-black flex items-center justify-center p-6 text-center">
        <div className="max-w-sm">
          <div className="text-red-400 font-black text-xl">Account blocked</div>
          <p className="text-zinc-300 text-sm mt-3">This account was blocked after {LIMIT} screenshot attempts. Taking screenshots of course content breaks the terms of use.</p>
          <p className="text-zinc-500 text-xs mt-3">If you think this is a mistake, contact support.</p>
        </div>
      </div>
    );

  if (warning === null) return null;
  const left = warning > 0 ? LIMIT - warning : null;
  return (
    <div role="alert" className="fixed inset-0 z-[10000] bg-black flex items-center justify-center p-6 text-center">
      <div className="max-w-sm">
        <div className="text-red-400 font-black text-xl">Screenshots are not allowed</div>
        <p className="text-zinc-300 text-sm mt-3">
          {warning > 0 ? <>Strike {warning} of {LIMIT}. {left! > 0 ? `${left} more and your account will be blocked.` : ""}</> : warning === 0 ? "Recording this attempt…" : `After ${LIMIT} attempts the account will be blocked.`}
        </p>
      </div>
    </div>
  );
}
