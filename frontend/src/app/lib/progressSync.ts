"use client";
// Cloud sync for study progress. The app keeps writing to localStorage as before;
// this layer (1) pulls the user's cloud copy on sign-in and merges it in,
// (2) watches writes to progress keys and pushes them to Supabase a few seconds
// later, and (3) clears progress from the device on sign-out.
//
// Merge rules: mastery maps merge per question (the more-practised record wins),
// so studying on two devices never loses work; any other key: newest write wins.
import { supabase, supabaseConfigured } from "@/lib/supabase";

type Entry = { v: string; ts: number };
type Blob = Record<string, Entry>;

const META = "sync:ts"; // local key → last-write timestamp
const isSynced = (k: string) => /-mastery$/.test(k) || k === "ra-progress" || k.startsWith("coach:") || k === "coach-session-v1";

let userId: string | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let patched = false;
let applying = false; // true while we write merged data, so it doesn't echo back as a "local change"

const rawSet = typeof window !== "undefined" ? Storage.prototype.setItem : null;
const rawRemove = typeof window !== "undefined" ? Storage.prototype.removeItem : null;

function readMeta(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(META) || "{}"); } catch { return {}; }
}
function writeMeta(m: Record<string, number>) {
  try { rawSet!.call(localStorage, META, JSON.stringify(m)); } catch { /* ignore */ }
}

function localBlob(): Blob {
  const meta = readMeta(); const out: Blob = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!;
    if (!isSynced(k)) continue;
    const v = localStorage.getItem(k);
    if (v != null) out[k] = { v, ts: meta[k] ?? 0 };
  }
  return out;
}

type QM = { seen: number; correct: number; wrong: number };
function mergeMastery(a: string, b: string): string {
  let A: Record<string, QM> = {}, B: Record<string, QM> = {};
  try { A = JSON.parse(a); } catch { /* ignore */ }
  try { B = JSON.parse(b); } catch { /* ignore */ }
  const out: Record<string, QM> = { ...A };
  for (const [id, r] of Object.entries(B)) if (!out[id] || (r?.seen ?? 0) > (out[id].seen ?? 0)) out[id] = r;
  return JSON.stringify(out);
}

export function merge(local: Blob, remote: Blob): Blob {
  const out: Blob = { ...local };
  for (const [k, r] of Object.entries(remote)) {
    const l = out[k];
    if (!l) out[k] = r;
    else if (/-mastery$/.test(k)) out[k] = { v: mergeMastery(l.v, r.v), ts: Math.max(l.ts, r.ts) };
    else if (r.ts > l.ts) out[k] = r;
  }
  return out;
}

// Merge with the cloud copy before writing, so another device's newer work is never overwritten.
async function push() {
  if (!userId) return;
  try {
    const { data } = await supabase.from("user_progress").select("data").eq("user_id", userId).maybeSingle();
    const merged = merge(localBlob(), (data?.data as Blob) ?? {});
    await supabase.from("user_progress").upsert({ user_id: userId, data: merged, updated_at: new Date().toISOString() });
  } catch { /* offline or table missing — the next write retries */ }
}
function schedule() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(push, 3000);
}

// Route every progress write through the timestamp + push schedule (one place,
// so the many existing localStorage writers need no changes).
function patchStorage() {
  if (patched || typeof window === "undefined") return;
  patched = true;
  Storage.prototype.setItem = function (k: string, v: string) {
    rawSet!.call(this, k, v);
    if (this === localStorage && isSynced(k) && !applying) { const m = readMeta(); m[k] = Date.now(); writeMeta(m); schedule(); }
  };
  Storage.prototype.removeItem = function (k: string) {
    rawRemove!.call(this, k);
    if (this === localStorage && isSynced(k) && !applying) schedule();
  };
}

/** Start syncing for the signed-in user: pull + merge the cloud copy, then push changes. */
export async function startProgressSync(uid: string) {
  if (!supabaseConfigured || typeof window === "undefined" || userId === uid) return;
  userId = uid;
  patchStorage();
  try {
    const { data } = await supabase.from("user_progress").select("data").eq("user_id", uid).maybeSingle();
    const merged = merge(localBlob(), (data?.data as Blob) ?? {});
    applying = true;
    const meta = readMeta();
    for (const [k, e] of Object.entries(merged)) { rawSet!.call(localStorage, k, e.v); meta[k] = e.ts; }
    writeMeta(meta);
    applying = false;
    window.dispatchEvent(new Event("progress-change"));
    window.dispatchEvent(new Event("course-change"));
    await push();
  } catch {
    applying = false;
  }
}

/** Clear progress from this device (after sign-out, so the next user starts clean). */
export function clearLocalProgress() {
  if (typeof window === "undefined") return;
  if (timer) { clearTimeout(timer); timer = null; }
  userId = null;
  applying = true;
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i)!; if (isSynced(k) || k === META) keys.push(k); }
  keys.forEach((k) => rawRemove!.call(localStorage, k));
  applying = false;
}

/** Save pending progress to the cloud, sign out, then clear this device. */
export async function signOutWithSync() {
  if (timer) { clearTimeout(timer); timer = null; }
  await push();
  await supabase.auth.signOut();
  clearLocalProgress();
}
