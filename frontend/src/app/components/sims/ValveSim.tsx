"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "check" | "relief" | "selector";

const DEFS = (
  <defs>
    <linearGradient id="vbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#141922" /><stop offset="1" stopColor="#0a0d13" /></linearGradient>
    <radialGradient id="vmetal" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor="#e5e7eb" /><stop offset="0.5" stopColor="#9ca3af" /><stop offset="1" stopColor="#4b5563" /></radialGradient>
    <linearGradient id="vblue" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1e3a8a" /><stop offset="1" stopColor="#3b82f6" /></linearGradient>
    <linearGradient id="vred" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7f1d1d" /><stop offset="1" stopColor="#ef4444" /></linearGradient>
    <linearGradient id="vgreen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#15803d" /><stop offset="1" stopColor="#22c55e" /></linearGradient>
  </defs>
);

export default function ValveSim() {
  const [kind, setKind] = useState<Kind>("check");
  return (
    <div className="space-y-4">
      <div className="flex gap-1.5 flex-wrap">
        {([["check", "Check (non-return)"], ["relief", "Pressure relief"], ["selector", "Selector"]] as [Kind, string][]).map(([k, l]) => (
          <button key={k} onClick={() => setKind(k)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${kind === k ? "bg-yellow-400 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>{l}</button>
        ))}
      </div>
      {kind === "check" && <Check />}
      {kind === "relief" && <Relief />}
      {kind === "selector" && <Selector />}
    </div>
  );
}

function flowDots(fwd: boolean, open: boolean, phase: number) {
  return Array.from({ length: 7 }).map((_, i) => {
    let x = ((phase + i * 55) % 340) + 40;
    const blocked = !open || (fwd ? false : x > 185);
    if (!fwd) x = 420 - x;
    const show = open ? (x < 180 || x > 220) : (fwd ? x < 180 : x > 220);
    return show && !(!fwd && blocked && x < 220) ? <circle key={i} cx={x} cy={90} r={3.5} fill={fwd ? "#60a5fa" : "#f87171"} opacity={0.85} /> : null;
  });
}

function Check() {
  const [fwd, setFwd] = useState(true);
  const [phase, setPhase] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => { let last = 0; const tick = (t: number) => { if (!last) last = t; setPhase((p) => (p + (t - last) * 0.08) % 340); last = t; raf.current = requestAnimationFrame(tick); }; raf.current = requestAnimationFrame(tick); return () => { if (raf.current) cancelAnimationFrame(raf.current); }; }, []);
  const open = fwd;
  return (
    <>
      <svg viewBox="0 0 400 180" className="w-full rounded-xl border border-zinc-800">
        {DEFS}
        <rect width={400} height={180} fill="url(#vbg)" />
        <rect x={40} y={74} width={320} height={32} rx={6} fill="#1f2630" stroke="#3f4654" />
        <rect x={40} y={78} width={145} height={24} fill="url(#vblue)" opacity={0.25} />
        <rect x={215} y={78} width={145} height={24} fill={open ? "url(#vblue)" : "#1f2630"} opacity={open ? 0.25 : 1} />
        <path d="M188,74 L206,90 L188,106" fill="none" stroke="#64748b" strokeWidth={3} />
        <circle cx={open ? 176 : 196} cy={90} r={12} fill="url(#vmetal)" stroke="#334155" />
        {flowDots(fwd, open, phase)}
        <text x={200} y={150} fill={open ? "#4ade80" : "#f87171"} fontSize={13} fontWeight={700} textAnchor="middle">{open ? "OPEN — free forward flow" : "CLOSED — reverse flow blocked"}</text>
      </svg>
      <button onClick={() => setFwd((f) => !f)} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-white text-sm hover:bg-zinc-700">Reverse the flow direction</button>
      <p className="text-zinc-500 text-xs leading-relaxed">A check (non-return) valve allows flow in ONE direction only. Forward flow lifts the ball off its seat; any reverse flow pushes it back onto the seat and seals — so a pump&rsquo;s delivery can&rsquo;t drain back.</p>
    </>
  );
}

function Relief() {
  const [p, setP] = useState(1800);
  const crack = 2000;
  const open = p >= crack;
  const lift = open ? Math.min(18, (p - crack) / 36) : 0;
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-zinc-400 text-xs w-28 shrink-0">System pressure</span>
        <input type="range" min={0} max={3000} value={p} onChange={(e) => setP(+e.target.value)} className="flex-1 accent-yellow-400" />
        <span className="text-white text-sm font-mono w-20 text-right">{p} psi</span>
      </div>
      <svg viewBox="0 0 400 210" className="w-full rounded-xl border border-zinc-800">
        {DEFS}
        <rect width={400} height={210} fill="url(#vbg)" />
        <rect x={60} y={128} width={280} height={30} rx={6} fill="#1f2630" stroke="#3f4654" />
        <rect x={64} y={132} width={272} height={22} fill="url(#vred)" opacity={open ? 0.5 : 0.2 + (p / crack) * 0.3} />
        <line x1={200} y1={26} x2={200} y2={72 - lift} stroke="#94a3b8" strokeWidth={2} />
        {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={188} y1={30 + i * 7} x2={212} y2={34 + i * 7} stroke="#94a3b8" strokeWidth={2} />)}
        <polygon points={`183,${92 - lift} 217,${92 - lift} 206,${116 - lift} 194,${116 - lift}`} fill="url(#vmetal)" stroke={open ? "#ef4444" : "#334155"} strokeWidth={open ? 2 : 1} />
        {open && Array.from({ length: 4 }).map((_, i) => <polygon key={i} points={`200,${78 - lift - i * 13} 193,${90 - lift - i * 13} 207,${90 - lift - i * 13}`} fill="#f87171" opacity={0.85} />)}
        <text x={262} y={44} fill="#94a3b8" fontSize={10}>spring · crack {crack} psi</text>
        <text x={200} y={188} fill={open ? "#f87171" : "#94a3b8"} fontSize={13} fontWeight={700} textAnchor="middle">{open ? "RELIEVING — excess fluid returns to reservoir" : "Seated — below cracking pressure"}</text>
      </svg>
      <p className="text-zinc-500 text-xs leading-relaxed">A pressure-relief valve stays shut until system pressure reaches the spring&rsquo;s cracking pressure ({crack} psi). Above it the poppet lifts and dumps the excess back to the reservoir, protecting the system and the positive-displacement pump from over-pressure.</p>
    </>
  );
}

function Selector() {
  const [pos, setPos] = useState<"gear" | "flap">("gear");
  return (
    <>
      <svg viewBox="0 0 400 200" className="w-full rounded-xl border border-zinc-800">
        {DEFS}
        <rect width={400} height={200} fill="url(#vbg)" />
        <rect x={40} y={94} width={140} height={14} rx={6} fill="url(#vred)" />
        <text x={46} y={86} fill="#fca5a5" fontSize={10}>pressure</text>
        <circle cx={200} cy={101} r={30} fill="url(#vmetal)" stroke="#334155" strokeWidth={2} />
        <g transform={`rotate(${pos === "gear" ? -90 : 0} 200 101)`}><rect x={197} y={74} width={6} height={30} rx={2} fill="#1f2937" /></g>
        <rect x={228} y={97} width={132} height={10} rx={4} fill={pos === "flap" ? "url(#vgreen)" : "#334155"} />
        <line x1={228} y1={101} x2={360} y2={55} stroke={pos === "flap" ? "#22c55e" : "#334155"} strokeWidth={9} strokeLinecap="round" />
        <line x1={200} y1={71} x2={200} y2={28} stroke={pos === "gear" ? "#22c55e" : "#334155"} strokeWidth={9} strokeLinecap="round" />
        <text x={210} y={26} fill="#d4d4d8" fontSize={11}>Landing gear</text>
        <text x={300} y={48} fill="#d4d4d8" fontSize={11}>Flaps</text>
        <text x={200} y={180} fill="#4ade80" fontSize={13} fontWeight={700} textAnchor="middle">Pressure routed to: {pos === "gear" ? "Landing gear" : "Flaps"}</text>
      </svg>
      <div className="flex gap-2">
        <button onClick={() => setPos("gear")} className={`px-3 py-1.5 rounded-lg text-sm ${pos === "gear" ? "bg-yellow-400 text-black" : "bg-zinc-800 text-white"}`}>Select gear</button>
        <button onClick={() => setPos("flap")} className={`px-3 py-1.5 rounded-lg text-sm ${pos === "flap" ? "bg-yellow-400 text-black" : "bg-zinc-800 text-white"}`}>Select flaps</button>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed">A selector valve directs the pump&rsquo;s pressure to the chosen service (gear, flaps, brakes…) and connects the other side back to the reservoir. Move the selector to re-route the flow.</p>
    </>
  );
}
