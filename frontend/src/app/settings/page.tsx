"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/app/components/Sidebar";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { useCourse } from "@/app/hooks/useCourse";
import { COURSES, type CourseId } from "@/app/lib/course";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { isPremium, loadPlan, type CoachPlan } from "@/app/lib/coachPlan";

const pref = {
  get: (k: string, d: string) => { try { return localStorage.getItem("pref:" + k) ?? d; } catch { return d; } },
  set: (k: string, v: string) => { try { localStorage.setItem("pref:" + k, v); } catch { /* ignore */ } },
};

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
      <h2 className="text-white font-bold">{title}</h2>
      {desc && <p className="text-zinc-600 text-xs mt-0.5 mb-4">{desc}</p>}
      <div className={desc ? "" : "mt-4"}>{children}</div>
    </section>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-4 py-2.5 border-b border-zinc-900 last:border-0"><span className="text-sm text-zinc-300">{label}</span><div className="flex items-center gap-2">{children}</div></div>;
}
function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`w-11 h-6 rounded-full transition-colors relative ${on ? "bg-yellow-400" : "bg-zinc-800"}`}><span className={`absolute top-0.5 w-5 h-5 rounded-full bg-black transition-all ${on ? "left-[22px]" : "left-0.5"}`} /></button>;
}

export default function Settings() {
  const { userName, loading } = useAuthGuard();
  const { course, setCourse } = useCourse();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [saved, setSaved] = useState("");
  const [plan, setPlan] = useState<CoachPlan | null>(null);
  const [premium, setPremium] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // preferences
  const [dailyGoal, setDailyGoal] = useState("20");
  const [units, setUnits] = useState("kt");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [remindDaily, setRemindDaily] = useState(true);
  const [remindExam, setRemindExam] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
      setFullName((data.user?.user_metadata?.full_name as string) ?? "");
    });
    setPlan(loadPlan()); setPremium(isPremium());
    setDailyGoal(pref.get("dailyGoal", "20"));
    setUnits(pref.get("units", "kt"));
    setReduceMotion(pref.get("reduceMotion", "0") === "1");
    setRemindDaily(pref.get("remindDaily", "1") === "1");
    setRemindExam(pref.get("remindExam", "1") === "1");
    setHydrated(true);
  }, []);

  if (loading || !hydrated)
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-zinc-600 text-sm">Loading…</div></div>;

  const flash = (m: string) => { setSaved(m); setTimeout(() => setSaved(""), 2000); };

  async function saveName() {
    if (supabaseConfigured) await supabase.auth.updateUser({ data: { full_name: fullName } });
    flash("Name saved");
  }
  async function resetPassword() {
    if (!email) return;
    if (supabaseConfigured) await supabase.auth.resetPasswordForEmail(email);
    flash("Password reset email sent");
  }
  async function signOut() {
    try { sessionStorage.removeItem("ra_session_token"); } catch { /* ignore */ }
    await supabase.auth.signOut();
    router.push("/login");
  }
  function resetStudyProgress() {
    if (!confirm("Reset all study mastery/readiness for every subject? Your notes and content stay; only your progress is cleared.")) return;
    try { Object.keys(localStorage).filter((k) => k.endsWith("-mastery")).forEach((k) => localStorage.removeItem(k)); } catch { /* ignore */ }
    flash("Study progress reset");
  }
  function resetCoach() {
    if (!confirm("Delete your Guaranteed-Pass plan and its progress?")) return;
    try { localStorage.removeItem("coach:plan"); localStorage.removeItem("coach:progress"); } catch { /* ignore */ }
    setPlan(null); flash("Plan deleted");
  }
  function savePref(k: string, v: string, setter: (x: string) => void) { pref.set(k, v); setter(v); flash("Saved"); }
  function togglePref(k: string, cur: boolean, setter: (x: boolean) => void) { pref.set(k, cur ? "0" : "1"); setter(!cur); }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar active="/settings" userName={userName} />
      <main className="flex-1 ml-64 overflow-auto">
        <div className="max-w-2xl mx-auto px-8 py-10 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-white">Settings</h1>
            {saved && <span className="text-green-400 text-xs">✓ {saved}</span>}
          </div>

          <Card title="Account">
            <Row label="Name">
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-3 py-1.5 w-44 focus:outline-none focus:border-yellow-400" />
              <button onClick={saveName} className="text-xs px-3 py-1.5 rounded-lg bg-yellow-400 text-black font-bold">Save</button>
            </Row>
            <Row label="Email"><span className="text-sm text-zinc-500">{email || "—"}</span></Row>
            <Row label="Password"><button onClick={resetPassword} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200">Send reset email</button></Row>
            <Row label="Session"><button onClick={signOut} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300">Sign out</button></Row>
          </Card>

          <Card title="Subscription">
            <Row label="Plan"><span className={`text-sm font-bold ${premium ? "text-yellow-400" : "text-zinc-400"}`}>{premium ? "Guaranteed Pass (Premium)" : "Free"}</span></Row>
            <Row label="Manage">
              {premium ? <span className="text-xs text-zinc-600">Billing portal coming soon</span>
                : <Link href="/coach" className="text-xs px-3 py-1.5 rounded-lg bg-yellow-400 text-black font-bold">Upgrade →</Link>}
            </Row>
            <p className="text-zinc-600 text-[11px] mt-2">Payment integration is pending — premium currently unlocks in-app.</p>
          </Card>

          <Card title="Exam target" desc="Drives your dashboard countdown and the Guaranteed-Pass plan.">
            <Row label="Default course">
              <select value={course} onChange={(e) => setCourse(e.target.value as CourseId)} className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400">
                {Object.values(COURSES).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Row>
            <Row label="Exam date">
              <span className="text-sm text-zinc-500">{plan?.examDate ?? "Not set"}</span>
              <Link href="/coach" className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200">Set in plan →</Link>
            </Row>
          </Card>

          <Card title="Study preferences">
            <Row label="Daily goal (questions/cards)">
              <input type="number" min={5} max={200} value={dailyGoal} onChange={(e) => savePref("dailyGoal", e.target.value, setDailyGoal)} className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-3 py-1.5 w-20 focus:outline-none focus:border-yellow-400" />
            </Row>
            <Row label="Units">
              <div className="flex gap-1 bg-zinc-900 rounded-lg p-0.5">
                {["kt", "km/h"].map((u) => <button key={u} onClick={() => savePref("units", u, setUnits)} className={`text-xs px-3 py-1 rounded-md ${units === u ? "bg-yellow-400 text-black font-bold" : "text-zinc-400"}`}>{u}</button>)}
              </div>
            </Row>
            <Row label="Reduce motion (reels)"><Toggle on={reduceMotion} onClick={() => togglePref("reduceMotion", reduceMotion, setReduceMotion)} /></Row>
          </Card>

          <Card title="Notifications" desc="Reminders to keep your streak alive (push delivery coming with the mobile app).">
            <Row label="Daily study reminder"><Toggle on={remindDaily} onClick={() => togglePref("remindDaily", remindDaily, setRemindDaily)} /></Row>
            <Row label="Exam countdown nudges"><Toggle on={remindExam} onClick={() => togglePref("remindExam", remindExam, setRemindExam)} /></Row>
          </Card>

          <Card title="Data & progress">
            <Row label="Reset study mastery"><button onClick={resetStudyProgress} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200">Reset</button></Row>
            <Row label="Guaranteed-Pass plan"><button onClick={resetCoach} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200">Delete plan</button></Row>
            <p className="text-zinc-600 text-[11px] mt-2">Progress is stored on this device. Account-synced progress (across devices) is planned.</p>
          </Card>

          <Card title="Feedback">
            <Row label="Report a wrong question / answer"><a href="mailto:support@raphaelaviation.co.za?subject=Report%20a%20question" className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200">Email us</a></Row>
            <Row label="Request a subject / feature"><a href="mailto:support@raphaelaviation.co.za?subject=Feature%20request" className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200">Email us</a></Row>
          </Card>

          <Card title="About">
            <Row label="App"><span className="text-sm text-zinc-500">Raphael Aviation · v1.0</span></Row>
            <Row label="Legal"><div className="flex gap-3 text-xs"><Link href="#" className="text-zinc-400 hover:text-white">Terms</Link><Link href="#" className="text-zinc-400 hover:text-white">Privacy</Link></div></Row>
          </Card>
        </div>
      </main>
    </div>
  );
}
