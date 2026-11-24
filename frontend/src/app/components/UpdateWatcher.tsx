"use client";

// Smooth updates after a deploy, mounted once in the root layout.
//  1. Stale chunks: an open tab still references the previous build's files.
//     If loading a code/content chunk fails, reload once to pick up the new build.
//  2. New version: every 10 min and whenever the tab regains focus, compare the
//     server's build id with ours; if different, show a small "Update ready"
//     bar. Never reloads mid-exam on its own — the user chooses when.

import { useEffect, useState } from "react";

const MINE = process.env.NEXT_PUBLIC_APP_VERSION ?? "dev";
const RELOADED = "ra-chunk-reload";

export function isChunkError(e: unknown): boolean {
  const msg = String((e as { message?: string })?.message ?? e ?? "");
  return /ChunkLoadError|Loading chunk [\w-]+ failed|Loading CSS chunk|dynamically imported module|Importing a module script failed/i.test(msg);
}

/** Reload once (per tab session) to recover from a stale-build chunk failure. */
export function recoverFromChunkError() {
  try {
    if (sessionStorage.getItem(RELOADED)) return;
    sessionStorage.setItem(RELOADED, "1");
  } catch { /* ignore */ }
  window.location.reload();
}

export default function UpdateWatcher() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // A successful load clears the one-shot guard after a short while.
    const clear = setTimeout(() => { try { sessionStorage.removeItem(RELOADED); } catch { /* ignore */ } }, 10_000);
    const onError = (ev: ErrorEvent) => { if (isChunkError(ev.error ?? ev.message)) recoverFromChunkError(); };
    const onRejection = (ev: PromiseRejectionEvent) => { if (isChunkError(ev.reason)) recoverFromChunkError(); };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    if (MINE === "dev") return () => { clearTimeout(clear); window.removeEventListener("error", onError); window.removeEventListener("unhandledrejection", onRejection); };

    let last = 0;
    const check = async () => {
      if (Date.now() - last < 60_000) return;
      last = Date.now();
      try {
        const r = await fetch("/api/version", { cache: "no-store" });
        const { version } = await r.json();
        if (version && version !== MINE) setReady(true);
      } catch { /* offline: try later */ }
    };
    const onVisible = () => { if (document.visibilityState === "visible") void check(); };
    const t = setInterval(check, 10 * 60_000);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(clear); clearInterval(t);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  if (!ready) return null;
  return (
    <div role="status" className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 z-[9000] flex items-center gap-3 rounded-xl border border-chart-line bg-chart-ground-2 px-4 py-3 shadow-xl">
      <span className="text-sm text-chart-ink">A new version of Raphael Aviation is ready.</span>
      <button onClick={() => window.location.reload()} className="px-3 py-1.5 rounded-lg bg-gold text-gold-ink text-sm font-bold">Refresh</button>
      <button onClick={() => setReady(false)} aria-label="Later" className="text-chart-ink-faint text-sm">Later</button>
    </div>
  );
}
