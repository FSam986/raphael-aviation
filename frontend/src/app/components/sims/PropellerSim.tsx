"use client";

import { useEffect, useRef, useState } from "react";

// Propeller: each blade is a rotating aerofoil. Blade angle of attack =
// blade (pitch) angle − helix angle, where the helix angle comes from the
// forward (TAS) and rotational speeds. Fine pitch = high RPM/low speed (take-off);
// coarse pitch = low RPM/high speed (cruise). A constant-speed unit varies pitch
// to hold RPM.
export default function PropellerSim() {
  const [pitch, setPitch] = useState(20); // blade angle, deg
  const [tas, setTas] = useState(60); // kt
  const [a, setA] = useState(0);
  const raf = useRef<number | null>(null);
  const last = useRef(0);
  useEffect(() => {
    const tick = (t: number) => {
      if (!last.current) last.current = t;
      const dt = t - last.current; last.current = t;
      setA((p) => (p + dt * 0.6) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); last.current = 0; };
  }, []);

  // helix angle at a representative 0.75R station: atan(TAS / rotational speed)
  const rotKt = 180; // representative rotational speed at the station
  const helix = (Math.atan2(tas, rotKt) * 180) / Math.PI;
  const bladeAoA = pitch - helix;
  const stalled = bladeAoA > 16;
  const windmill = bladeAoA < 0;
  const thrust = windmill ? -0.3 : stalled ? 0.4 : Math.max(0, Math.sin((bladeAoA * Math.PI) / 180) * 1.6);
  const state = windmill ? "Windmilling (negative AoA — drag)" : stalled ? "Blade stalled (AoA too high)" : "Producing thrust";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Blade (pitch) angle" value={`${pitch}°`} />
        <Stat label="Helix angle" value={`${helix.toFixed(1)}°`} />
        <Stat label="Blade angle of attack" value={`${bladeAoA.toFixed(1)}°`} color={stalled ? "#ef4444" : windmill ? "#f59e0b" : "#22c55e"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* front view: spinning disc */}
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px] mx-auto rounded-xl border border-zinc-800">
          <defs>
            <linearGradient id="prbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#141922" /><stop offset="1" stopColor="#0a0d13" /></linearGradient>
            <radialGradient id="prhub" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor="#e5e7eb" /><stop offset="1" stopColor="#475569" /></radialGradient>
          </defs>
          <rect width={220} height={220} fill="url(#prbg)" />
          <circle cx={110} cy={110} r={92} fill="none" stroke="#1f2937" strokeWidth={1} strokeDasharray="3 5" />
          <g transform={`rotate(${a} 110 110)`}>
            {[0, 120, 240].map((off) => (
              <g key={off} transform={`rotate(${off} 110 110)`}>
                <path d="M110,110 Q122,60 114,26 Q106,60 110,110 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth={0.8} opacity={0.9} />
              </g>
            ))}
          </g>
          <circle cx={110} cy={110} r={14} fill="url(#prhub)" stroke="#334155" />
          <text x={110} y={210} fill="#64748b" fontSize={10} textAnchor="middle">front view</text>
        </svg>

        {/* blade cross-section: angles */}
        <svg viewBox="0 0 260 220" className="w-full rounded-xl border border-zinc-800">
          <rect width={260} height={220} fill="#0b0e13" />
          <text x={130} y={20} fill="#94a3b8" fontSize={11} textAnchor="middle">Blade cross-section (0.75 R)</text>
          {/* plane of rotation (horizontal) */}
          <line x1={20} y1={150} x2={240} y2={150} stroke="#334155" strokeWidth={1} strokeDasharray="4 3" />
          <text x={210} y={166} fill="#64748b" fontSize={9}>plane of rotation</text>
          {/* relative airflow (resultant) at helix angle below the plane */}
          <g transform={`rotate(${helix} 130 150)`}>
            <line x1={240} y1={150} x2={40} y2={150} stroke="#60a5fa" strokeWidth={2} />
            <polygon points="40,150 52,144 52,156" fill="#60a5fa" />
            <text x={70} y={142} fill="#93c5fd" fontSize={9}>relative airflow</text>
          </g>
          {/* blade chord at pitch angle above the plane */}
          <g transform={`rotate(${-pitch} 130 150)`}>
            <path d="M60,150 C90,140 180,140 205,150 C180,156 90,158 60,150 Z" fill={stalled ? "#ef4444" : "#e5e7eb"} stroke="#64748b" />
          </g>
          <text x={130} y={205} fill={stalled ? "#f87171" : windmill ? "#fbbf24" : "#4ade80"} fontSize={12} fontWeight={700} textAnchor="middle">{state}</text>
        </svg>
      </div>

      <div className="space-y-2.5">
        <Slider label="Blade pitch angle" unit="°" v={pitch} set={setPitch} min={5} max={45} />
        <Slider label="True airspeed" unit="kt" v={tas} set={setTas} min={0} max={180} />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-zinc-400">Thrust</span>
        <div className="flex-1 h-2.5 bg-zinc-800 rounded overflow-hidden">
          <div className="h-full transition-all" style={{ width: `${Math.max(0, thrust) * 55}%`, background: thrust > 0 ? "#22c55e" : "#ef4444" }} />
        </div>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed">
        Blade angle of attack = pitch angle − helix angle. As TAS rises the helix angle increases, so the blade AoA falls — thrust decays. <span className="text-white font-medium">Fine pitch</span> keeps a good AoA at low speed (take-off); <span className="text-white font-medium">coarse pitch</span> is needed at high speed/cruise. A constant-speed prop automatically coarsens pitch as speed rises to hold RPM. Too fine at high speed → blade stalls; too coarse at low speed → windmills (negative AoA, drag).
      </p>
    </div>
  );
}

function Slider({ label, unit, v, set, min, max }: { label: string; unit: string; v: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-zinc-400 text-xs w-28 shrink-0">{label}</span>
      <input type="range" min={min} max={max} value={v} onChange={(e) => set(+e.target.value)} className="flex-1 accent-yellow-400" />
      <span className="text-white text-xs font-mono w-14 text-right">{v} {unit}</span>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
      <div className="text-[11px] text-zinc-500">{label}</div>
      <div className="text-base font-bold" style={{ color: color ?? "#fff" }}>{value}</div>
    </div>
  );
}
