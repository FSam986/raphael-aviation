"use client";

import { useState } from "react";

type Kind = "check" | "relief" | "selector";

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

function Check() {
  const [fwd, setFwd] = useState(true);
  const open = fwd;
  return (
    <>
      <svg viewBox="0 0 400 180" className="w-full rounded-xl bg-zinc-900 border border-zinc-800">
        <rect x={40} y={75} width={320} height={30} rx={4} fill="#18181b" stroke="#52525b" />
        {/* seat */}
        <path d="M190,75 L205,90 L190,105" fill="none" stroke="#71717a" strokeWidth={3} />
        {/* ball/poppet */}
        <circle cx={open ? 178 : 198} cy={90} r={11} fill={open ? "#22c55e" : "#ef4444"} stroke="#fff" strokeWidth={1.5} />
        {/* flow arrows */}
        {Array.from({ length: 5 }).map((_, i) => {
          const x = 60 + i * 60;
          const show = open ? x < 185 || x > 215 : x < 185;
          return show ? <polygon key={i} points={fwd ? `${x},90 ${x - 10},85 ${x - 10},95` : `${x},90 ${x + 10},85 ${x + 10},95`} fill={fwd ? "#60a5fa" : "#f87171"} /> : null;
        })}
        <text x={200} y={145} fill={open ? "#4ade80" : "#f87171"} fontSize={13} fontWeight={600} textAnchor="middle">{open ? "OPEN — free flow" : "CLOSED — reverse flow blocked"}</text>
      </svg>
      <button onClick={() => setFwd((f) => !f)} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-white text-sm hover:bg-zinc-700">Reverse the flow direction</button>
      <p className="text-zinc-500 text-xs leading-relaxed">A check (non-return) valve allows flow in ONE direction only. Forward flow lifts the ball/poppet off its seat; any reverse flow pushes it back onto the seat and seals. Used so a pump&rsquo;s delivery can&rsquo;t drain back.</p>
    </>
  );
}

function Relief() {
  const [p, setP] = useState(1800);
  const crack = 2000;
  const open = p >= crack;
  const lift = open ? Math.min(16, (p - crack) / 40) : 0;
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-zinc-400 text-xs w-28 shrink-0">System pressure</span>
        <input type="range" min={0} max={3000} value={p} onChange={(e) => setP(+e.target.value)} className="flex-1 accent-yellow-400" />
        <span className="text-white text-sm font-mono w-20 text-right">{p} psi</span>
      </div>
      <svg viewBox="0 0 400 200" className="w-full rounded-xl bg-zinc-900 border border-zinc-800">
        <rect x={60} y={120} width={280} height={28} rx={4} fill="#18181b" stroke="#52525b" />
        {/* spring */}
        <line x1={200} y1={30} x2={200} y2={70 - lift} stroke="#a1a1aa" strokeWidth={2} />
        {Array.from({ length: 5 }).map((_, i) => <line key={i} x1={190} y1={34 + i * 7} x2={210} y2={38 + i * 7} stroke="#a1a1aa" strokeWidth={2} />)}
        {/* poppet */}
        <polygon points={`185,${90 - lift} 215,${90 - lift} 205,${110 - lift} 195,${110 - lift}`} fill={open ? "#ef4444" : "#52525b"} stroke="#fff" strokeWidth={1} />
        {/* relief outlet */}
        {open && Array.from({ length: 3 }).map((_, i) => <polygon key={i} points={`${200},${80 - lift - i * 12} ${194},${90 - lift - i * 12} ${206},${90 - lift - i * 12}`} fill="#f87171" opacity={0.8} />)}
        <text x={260} y={46} fill="#a1a1aa" fontSize={10}>spring (crack {crack} psi)</text>
        <text x={200} y={175} fill={open ? "#f87171" : "#71717a"} fontSize={13} fontWeight={600} textAnchor="middle">{open ? "RELIEVING — excess fluid returns to reservoir" : "Seated — pressure below cracking point"}</text>
      </svg>
      <p className="text-zinc-500 text-xs leading-relaxed">A pressure-relief valve stays shut until system pressure reaches the spring&rsquo;s cracking pressure ({crack} psi). Above it the poppet lifts and dumps the excess back to the reservoir, protecting the system (and the positive-displacement pump) from over-pressure.</p>
    </>
  );
}

function Selector() {
  const [pos, setPos] = useState<"gear" | "flap">("gear");
  return (
    <>
      <svg viewBox="0 0 400 200" className="w-full rounded-xl bg-zinc-900 border border-zinc-800">
        <line x1={40} y1={100} x2={180} y2={100} stroke="#f59e0b" strokeWidth={10} opacity={0.5} />
        <text x={44} y={90} fill="#fbbf24" fontSize={10}>pressure</text>
        <circle cx={200} cy={100} r={28} fill="#27272a" stroke="#71717a" />
        <line x1={200} y1={100} x2={pos === "gear" ? 200 : 228} y2={pos === "gear" ? 72 : 100} stroke="#eab308" strokeWidth={5} strokeLinecap="round" transform={pos === "gear" ? "rotate(0 200 100)" : "rotate(0 200 100)"} />
        {/* services */}
        <line x1={228} y1={100} x2={360} y2={60} stroke={pos === "flap" ? "#22c55e" : "#3f3f46"} strokeWidth={8} />
        <line x1={200} y1={72} x2={200} y2={30} stroke={pos === "gear" ? "#22c55e" : "#3f3f46"} strokeWidth={8} />
        <text x={210} y={28} fill="#d4d4d8" fontSize={11}>Landing gear</text>
        <text x={300} y={52} fill="#d4d4d8" fontSize={11}>Flaps</text>
        <text x={200} y={175} fill="#4ade80" fontSize={13} fontWeight={600} textAnchor="middle">Pressure routed to: {pos === "gear" ? "Landing gear" : "Flaps"}</text>
      </svg>
      <div className="flex gap-2">
        <button onClick={() => setPos("gear")} className={`px-3 py-1.5 rounded-lg text-sm ${pos === "gear" ? "bg-yellow-400 text-black" : "bg-zinc-800 text-white"}`}>Select gear</button>
        <button onClick={() => setPos("flap")} className={`px-3 py-1.5 rounded-lg text-sm ${pos === "flap" ? "bg-yellow-400 text-black" : "bg-zinc-800 text-white"}`}>Select flaps</button>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed">A selector valve directs the pump&rsquo;s pressure to the chosen service (gear, flaps, brakes…) and connects the other side back to the reservoir (return). Move the selector to re-route the flow.</p>
    </>
  );
}
