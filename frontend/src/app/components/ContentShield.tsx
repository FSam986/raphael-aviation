"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Mounted once in the root layout. For a signed-in user it:
//  1. stamps a traceable watermark over the whole app (screenshots can't be
//     blocked on the web, but a per-user stamp makes any leak identifiable), and
//  2. enforces one screen at a time — claims this device as the active one and
//     signs out if another login takes over.
function deviceId(): string {
  try {
    let id = localStorage.getItem("ra_device");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("ra_device", id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

export default function ContentShield() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const me = deviceId();

    async function check(userId: string) {
      const { data } = await supabase
        .from("user_sessions")
        .select("active_device")
        .eq("user_id", userId)
        .maybeSingle();
      if (!cancelled && data && data.active_device !== me) {
        await supabase.auth.signOut(); // another screen took over
      }
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled || !session) return;
      setEmail(session.user.email ?? null);
      // Newest login wins: claim this device as the only active screen.
      await supabase.from("user_sessions").upsert({
        user_id: session.user.id,
        active_device: me,
        updated_at: new Date().toISOString(),
      });
      timer = setInterval(() => check(session.user.id), 15000);
    });

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, []);

  if (!email) return null;

  const stamp = `${email} · Raphael Aviation`;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      <div
        className="absolute inset-[-50%] text-chart-ink opacity-[0.055]"
        style={{
          transform: "rotate(-30deg)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 300px)",
          gap: "110px 48px",
          fontSize: "12px",
          fontFamily: "var(--font-overpass-mono), monospace",
          whiteSpace: "nowrap",
        }}
      >
        {Array.from({ length: 140 }).map((_, i) => (
          <span key={i}>{stamp}</span>
        ))}
      </div>
    </div>
  );
}
