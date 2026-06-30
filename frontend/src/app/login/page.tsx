"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, supabaseConfigured } from "@/lib/supabase";

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
    <main className="min-h-screen bg-black flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 border-r border-zinc-900 flex-col items-center justify-center p-16">
        <img src="/logo.png" alt="Raphael Aviation" className="w-40 mb-8" />
        <h2 className="text-3xl font-black text-white text-center leading-tight mb-4">
          Your personal<br />
          <span className="text-yellow-400">CPL instructor</span><br />
          is waiting.
        </h2>
        <p className="text-zinc-500 text-center text-sm max-w-xs leading-relaxed">
          Study smarter. Track your mastery. Know exactly when you're ready to
          pass SACAA.
        </p>

        <div className="mt-12 space-y-4 w-full max-w-xs">
          {[
            "✅ All 12 SACAA CPL subjects",
            "✅ AI that knows your weak spots",
            "✅ SACAA-style mock exams",
            "✅ Predicted pass probability",
          ].map((item) => (
            <div key={item} className="text-sm text-zinc-400">
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
            <img src="/logo.png" alt="Raphael Aviation" className="h-10" />
            <span className="text-yellow-400 font-bold tracking-widest text-sm uppercase">
              Raphael Aviation
            </span>
          </div>

          <h1 className="text-3xl font-black text-white mb-2">
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
                Don't have an account?{" "}
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
