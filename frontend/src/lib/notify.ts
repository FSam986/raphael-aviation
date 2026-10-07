// Pilot-themed notifications & reminders. Uses Capacitor Local Notifications on
// the native apps (real background/scheduled delivery) and the Web Notifications
// API in the browser (foreground / soon-after). Degrades quietly when neither is
// available. No hard dependency on the Capacitor plugin — accessed dynamically so
// the web build never breaks.

type Pair = [string, string];

export const PILOT_STREAK: Pair[] = [
  ["🔥 Keep your streak airborne", "Don't let it stall — a short session keeps you current."],
  ["✈️ Pre-flight check complete?", "Your daily brief is holding for you. Log today's session."],
  ["🧭 Stay on course", "Miss today and your streak drifts off track. Tap to resume."],
  ["🛫 Cleared for departure", "Runway's clear — knock out today's topics before the day ends."],
  ["📡 Radio check", "Your instructor's standing by. A few questions keeps you sharp."],
  ["⛽ Top up your knowledge", "Fuel the streak — today's tasks won't take long."],
  ["🎯 Maintain the glidepath", "You're on profile for a first-time pass. Keep the streak alive."],
];

export const PILOT_RESUME: Pair[] = [
  ["🛬 Cleared to continue", "You left your session on the taxiway — back to the runway?"],
  ["📻 Holding for you", "Your Guaranteed-Pass session is paused. Resume when ready."],
  ["🧑‍✈️ Back to the flight deck", "Pick up where you left off — a few more topics to go."],
];

export const PILOT_BREAK: Pair[] = [
  ["🧑‍✈️ Crew rest", "Good pilots manage fatigue. Stretch, hydrate, and continue when ready."],
  ["☕ Short hold", "Take a breather — retention improves after a quick break."],
  ["🛩️ Level off", "Nice work. Rest a moment, then climb back in."],
];

export const pick = (pool: Pair[]): Pair => pool[Math.floor(Math.random() * pool.length)];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function capPlugin(): any {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cap = (window as any).Capacitor;
  return cap?.isNativePlatform?.() ? cap.Plugins?.LocalNotifications ?? null : null;
}

export function notifySupported(): boolean {
  return !!capPlugin() || (typeof window !== "undefined" && "Notification" in window);
}
export function notifyPermission(): "granted" | "denied" | "default" {
  if (typeof window === "undefined" || !("Notification" in window)) return "default";
  return Notification.permission;
}

export async function requestNotifyPermission(): Promise<boolean> {
  const native = capPlugin();
  if (native) {
    try { const r = await native.requestPermissions(); return r.display === "granted"; } catch { return false; }
  }
  if (typeof window !== "undefined" && "Notification" in window) {
    try { return (await Notification.requestPermission()) === "granted"; } catch { return false; }
  }
  return false;
}

// Fire a notification now.
export function notifyNow([title, body]: Pair): void {
  const native = capPlugin();
  if (native) {
    try { native.schedule({ notifications: [{ id: Date.now() % 100000, title, body }] }); return; } catch { /* fall through */ }
  }
  if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
    try { new Notification(title, { body, icon: "/favicon.ico" }); } catch { /* ignore */ }
  }
}

// Schedule (or reschedule) the recurring daily streak reminder at hour:minute.
// Native: a real repeating local notification. Web: best-effort one-shot if the
// tab stays open (true background push needs the native app or a push server).
let webTimer: ReturnType<typeof setTimeout> | undefined;
export async function scheduleDailyStreak(hour = 18, minute = 0): Promise<void> {
  const native = capPlugin();
  if (native) {
    try {
      await native.cancel({ notifications: [{ id: 7100 }] });
      const [title, body] = pick(PILOT_STREAK);
      await native.schedule({ notifications: [{ id: 7100, title, body, schedule: { on: { hour, minute }, repeats: true }, smallIcon: "ic_stat_icon" }] });
    } catch { /* ignore */ }
    return;
  }
  // Web fallback — schedule the next occurrence if the tab is open long enough.
  if (typeof window === "undefined" || Notification?.permission !== "granted") return;
  if (webTimer) clearTimeout(webTimer);
  const now = new Date();
  const next = new Date(now); next.setHours(hour, minute, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  const ms = Math.min(next.getTime() - now.getTime(), 2 ** 31 - 1);
  webTimer = setTimeout(() => notifyNow(pick(PILOT_STREAK)), ms);
}

export async function cancelDailyStreak(): Promise<void> {
  const native = capPlugin();
  if (native) { try { await native.cancel({ notifications: [{ id: 7100 }] }); } catch { /* ignore */ } }
  if (webTimer) { clearTimeout(webTimer); webTimer = undefined; }
}
