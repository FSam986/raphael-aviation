"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { Icon } from "@/app/components/Icon";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!supabaseConfigured) {
      setError("Supabase is not connected yet. Add your keys to .env.local to enable login.");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email to confirm your account, then sign in.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-chart-ground flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 border-r border-zinc-900 flex-col items-center justify-center p-16">
        <img src="/logo-emblem.png" alt="Raphael Aviation" className="w-44 mb-4" />
        <div className="font-display text-gold text-2xl tracking-[0.18em] mb-10">RAPHAEL <span className="mono text-chart-ink-faint text-sm tracking-[0.34em] align-middle">AVIATION</span></div>
        <h2 className="font-display text-4xl text-white text-center leading-tight mb-4">
          Chart your course<br />
          to a <span className="text-gold">SACAA pass</span>.
        </h2>
        <p className="text-zinc-500 text-center text-sm max-w-xs leading-relaxed">
          Study smarter, track your readiness, and know exactly when you&apos;re ready
          to sit the exam.
        </p>

        <div className="mt-12 space-y-3.5 w-full max-w-xs">
          {[
            "Every SACAA PPL, CPL & IR subject",
            "Readiness tracked for each subject",
            "SACAA-style mock exams",
            "Illustrated study notes & flashcards",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-zinc-300">
              <span className="text-gold shrink-0"><Icon name="target" size={16} /></span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <img src="/logo-emblem.png" alt="" className="h-9" />
            <span className="text-yellow-400 font-bold tracking-widest text-sm uppercase">
              Raphael Aviation
            </span>
          </div>

          <h1 className="font-display text-3xl text-white mb-2">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-zinc-500 mb-8 text-sm">
            {mode === "signin"
              ? "Sign in to continue your CPL training."
              : "Start your journey to passing SACAA."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Fathima Samreen"
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-700"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-700"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-700"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl text-sm hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? "Please wait..."
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <p className="text-center text-zinc-600 text-sm mt-6">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => { setMode("signup"); setError(""); setMessage(""); }}
                  className="text-yellow-400 hover:text-yellow-300 font-medium"
                >
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => { setMode("signin"); setError(""); setMessage(""); }}
                  className="text-yellow-400 hover:text-yellow-300 font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          <div className="mt-8 pt-8 border-t border-zinc-900">
            <Link
              href="/"
              className="text-zinc-700 text-xs hover:text-zinc-500 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
