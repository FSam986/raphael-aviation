"use client";

// Landing page for the password-reset email. Supabase reads the recovery token
// from the link and opens a short-lived session; the user then sets a new password.
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) return setError("Use at least 8 characters.");
    if (password !== confirm) return setError("The two passwords don't match.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return setError("This reset link has expired or was already used. Request a new one from the sign-in page.");
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  const input = "w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors";
  return (
    <main className="min-h-screen bg-chart-ground flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="font-display text-3xl text-white mb-2">Choose a new password</h1>
        {done ? (
          <p className="text-green-400 text-sm">Password updated. Taking you to your dashboard…</p>
        ) : !ready ? (
          <p className="text-zinc-500 text-sm leading-relaxed">
            Checking your reset link… If nothing happens, the link may have expired.{" "}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300">Request a new one</Link>.
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-4 mt-6">
            <div>
              <label htmlFor="pw" className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">New password</label>
              <input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" className={input} />
            </div>
            <div>
              <label htmlFor="pw2" className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Confirm new password</label>
              <input id="pw2" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} autoComplete="new-password" className={input} />
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>}
            <button type="submit" disabled={busy} className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl text-sm hover:bg-yellow-300 transition-colors disabled:opacity-50">
              {busy ? "Saving…" : "Save new password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
