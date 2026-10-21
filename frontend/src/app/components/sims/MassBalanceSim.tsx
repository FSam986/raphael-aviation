"use client";

import { useState } from "react";

// SEP1 mass & balance (CAP 696 Section 2). Datum 39 in fwd of firewall.
// BEM 2415 lb @ 77.7 in (moment/100 = 1876.46). Arms (in): front seats 79,
// seats 3&4 = 117, seats 5&6 = 152, baggage A 108, baggage C 180, fuel 75.
// MTOM 3650 lb. CG limits: fwd 74.0–80.4 in (varies with mass), aft 87.7 in.
const BEM = 2415;
const BEM_MOMENT = 187646; // lb·in (= moment/100 × 100)
const ARM = { front: 79, mid: 117, rear: 152, bagA: 108, bagC: 180, fuel: 75 };
const MTOM = 3650;

// CG envelope boundary (weight → [fwd, aft] limit in inches), approximating Fig 2.5.
function fwdLimit(w: number): number {
  if (w <= 2350) return 74;
  return 74 + ((w - 2350) / (MTOM - 2350)) * (80.4 - 74);
}
const AFT = 87.7;

// px mapping of the envelope plot (CG 68–92, weight 2000–3800)
const PX = (cg: number) => 60 + ((cg - 68) / (92 - 68)) * 560;
const PY = (w: number) => 30 + (1 - (w - 2000) / (3800 - 2000)) * 260;

export default function MassBalanceSim() {
  const [front, setFront] = useState(340);
  const [mid, setMid] = useState(0);
  const [rear, setRear] = useState(0);
  const [bagA, setBagA] = useState(40);
  const [bagC, setBagC] = useState(0);
  const [fuelGal, setFuelGal] = useState(50);

  const fuelLb = fuelGal * 6;
  const mass = BEM + front + mid + rear + bagA + bagC + fuelLb;
  const moment = BEM_MOMENT + front * ARM.front + mid * ARM.mid + rear * ARM.rear + bagA * ARM.bagA + bagC * ARM.bagC + fuelLb * ARM.fuel;
  const cg = moment / mass;

  const overMass = mass > MTOM;
  const fwd = fwdLimit(mass);
  const outCg = cg < fwd || cg > AFT;
  const ok = !overMass && !outCg;

  // envelope polygon points
  const poly = [
    [PX(74), PY(2100)], [PX(74), PY(2350)], [PX(80.4), PY(MTOM)],
    [PX(AFT), PY(MTOM)], [PX(AFT), PY(2100)],
  ].map((p) => p.join(",")).join(" ");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Take-off mass" value={`${Math.round(mass)} lb`} color={overMass ? "#ef4444" : "#fff"} sub={`max ${MTOM}`} />
        <Stat label="CG position" value={`${cg.toFixed(1)} in`} color={outCg ? "#ef4444" : "#fff"} sub={`limits ${fwd.toFixed(1)}–${AFT}`} />
        <Stat label="Status" value={ok ? "WITHIN LIMITS" : "OUT OF LIMITS"} color={ok ? "#22c55e" : "#ef4444"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2.5">
          <Slider label="Front seats" unit="lb" v={front} set={setFront} max={400} />
          <Slider label="Seats 3 & 4" unit="lb" v={mid} set={setMid} max={400} />
          <Slider label="Seats 5 & 6" unit="lb" v={rear} set={setRear} max={400} />
          <Slider label="Baggage A (fwd)" unit="lb" v={bagA} set={setBagA} max={200} />
          <Slider label="Baggage C (aft)" unit="lb" v={bagC} set={setBagC} max={200} />
          <Slider label="Fuel" unit="gal" v={fuelGal} set={setFuelGal} max={74} />
        </div>

        <svg viewBox="0 0 680 320" className="w-full rounded-xl bg-zinc-900 border border-zinc-800">
          {[2200, 2600, 3000, 3400, 3800].map((w) => (
            <g key={w}>
              <line x1={60} y1={PY(w)} x2={620} y2={PY(w)} stroke="#27272a" />
              <text x={54} y={PY(w) + 4} fill="#71717a" fontSize={10} textAnchor="end">{w}</text>
            </g>
          ))}
          {[70, 74, 78, 82, 86, 90].map((c) => (
            <g key={c}>
              <line x1={PX(c)} y1={30} x2={PX(c)} y2={290} stroke="#27272a" />
              <text x={PX(c)} y={305} fill="#71717a" fontSize={10} textAnchor="middle">{c}</text>
            </g>
          ))}
          <polygon points={poly} fill="#22c55e18" stroke="#22c55e" strokeWidth={1.5} />
          <text x={340} y={315} fill="#71717a" fontSize={11} textAnchor="middle">CG — inches aft of datum</text>
          {/* loaded point */}
          <line x1={PX(cg)} y1={30} x2={PX(cg)} y2={290} stroke={ok ? "#22c55e" : "#ef4444"} strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
          <line x1={60} y1={PY(Math.min(mass, 3800))} x2={620} y2={PY(Math.min(mass, 3800))} stroke={ok ? "#22c55e" : "#ef4444"} strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
          <circle cx={PX(cg)} cy={PY(Math.min(mass, 3800))} r={7} fill={ok ? "#22c55e" : "#ef4444"} stroke="#fff" strokeWidth={2} />
        </svg>
      </div>

      <p className="text-zinc-500 text-xs leading-relaxed">
        Load the aircraft on the left and the dot shows where the CG and mass fall on the certified envelope. Moment = mass × arm; CG = total moment ÷ total mass. Aft loads (Baggage C, arm 180 in) push the CG aft; fuel (arm 75 in) is near the CG so it barely moves it. The dot must stay inside the green envelope and at or below MTOM.
      </p>
    </div>
  );
}

function Slider({ label, unit, v, set, max }: { label: string; unit: string; v: number; set: (n: number) => void; max: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-zinc-400 text-xs w-28 shrink-0">{label}</span>
      <input type="range" min={0} max={max} value={v} onChange={(e) => set(+e.target.value)} className="flex-1 accent-yellow-400" />
      <span className="text-white text-xs font-mono w-16 text-right">{v} {unit}</span>
    </div>
  );
}

function Stat({ label, value, color, sub }: { label: string; value: string; color?: string; sub?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
      <div className="text-[11px] text-zinc-500">{label}</div>
      <div className="text-base font-bold" style={{ color: color ?? "#fff" }}>{value}</div>
      {sub && <div className="text-[10px] text-zinc-600">{sub}</div>}
    </div>
  );
}
