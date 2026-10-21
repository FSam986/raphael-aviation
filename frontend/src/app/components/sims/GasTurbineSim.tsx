"use client";

import { useEffect, useRef, useState } from "react";

// Gas turbine (Brayton cycle): intake → compressor (pressure ↑) → combustion
// (heat added) → turbine (drives compressor) → nozzle (velocity ↑ = thrust).
export default function GasTurbineSim() {
  const [thr, setThr] = useState(70); // throttle %
  const [a, setA] = useState(0);
  const raf = useRef<number | null>(null);
  const last = useRef(0);
  useEffect(() => {
    const tick = (t: number) => {
      if (!last.current) last.current = t;
      const dt = t - last.current; last.current = t;
      setA((p) => (p + dt * 0.02 * (0.3 + thr / 100)) % 1);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); last.current = 0; };
  }, [thr]);

  const n1 = Math.round(25 + thr * 0.73);
  const n2 = Math.round(55 + thr * 0.43);
  const egt = Math.round(380 + thr * 4.4);
  const epr = (1.0 + thr / 100 * 0.6).toFixed(2);

  // particles flow left→right, speeding up through the engine
  const parts = Array.from({ length: 16 }).map((_, i) => {
    const base = (a + i / 16) % 1;
    // speed profile: slow in, fast out
    const x = 40 + base * 420;
    const speedCol = x < 140 ? "#60a5fa" : x < 240 ? "#93c5fd" : x < 320 ? "#f59e0b" : "#f87171";
    const y = 120 + Math.sin((base * 6 + i) * 2) * (x > 320 ? 26 : 10);
    return { x, y, c: speedCol, r: x > 320 ? 3 : 2.4 };
  });

  const bladeRot = (a * 360 * (0.3 + thr / 100)) % 360;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        <Stat label="N1 (fan)" value={`${n1}%`} />
        <Stat label="N2 (core)" value={`${n2}%`} />
        <Stat label="EGT" value={`${egt}°C`} color={egt > 720 ? "#ef4444" : egt > 640 ? "#f59e0b" : "#fff"} />
        <Stat label="EPR" value={epr} />
      </div>

      <svg viewBox="0 0 500 240" className="w-full rounded-xl border border-zinc-800">
        <defs>
          <linearGradient id="tbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#141922" /><stop offset="1" stopColor="#0a0d13" /></linearGradient>
          <radialGradient id="tmetal" cx="0.4" cy="0.3" r="0.9"><stop offset="0" stopColor="#e5e7eb" /><stop offset="0.5" stopColor="#94a3b8" /><stop offset="1" stopColor="#475569" /></radialGradient>
          <radialGradient id="flame" cx="0.5" cy="0.5" r="0.6"><stop offset="0" stopColor="#fff3b0" /><stop offset="0.45" stopColor="#f97316" /><stop offset="1" stopColor="#7f1d1d" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width={500} height={240} fill="url(#tbg)" />

        {/* engine nacelle outline */}
        <path d="M30,96 L150,88 L250,96 L330,96 L410,78 L470,120 L410,162 L330,144 L250,144 L150,152 L30,144 Z" fill="#1b2029" stroke="#334155" />
        {/* stage dividers */}
        {[150, 250, 330].map((x) => <line key={x} x1={x} y1={90} x2={x} y2={150} stroke="#2a3340" />)}

        {/* compressor blades */}
        {[70, 100, 130].map((x, i) => (
          <g key={x} transform={`rotate(${bladeRot + i * 15} ${x} 120)`}>
            {Array.from({ length: 10 }).map((_, k) => <line key={k} x1={x} y1={120} x2={x + 26 * Math.cos((k * 36 * Math.PI) / 180)} y2={120 + 26 * Math.sin((k * 36 * Math.PI) / 180)} stroke="url(#tmetal)" strokeWidth={2} />)}
          </g>
        ))}
        {/* combustion */}
        <circle cx={290} cy={120} r={28} fill="url(#flame)" opacity={0.6 + thr / 250} />
        {/* turbine blades */}
        {[355, 385].map((x, i) => (
          <g key={x} transform={`rotate(${-(bladeRot + i * 20)} ${x} 120)`}>
            {Array.from({ length: 12 }).map((_, k) => <line key={k} x1={x} y1={120} x2={x + 24 * Math.cos((k * 30 * Math.PI) / 180)} y2={120 + 24 * Math.sin((k * 30 * Math.PI) / 180)} stroke="url(#tmetal)" strokeWidth={2} />)}
          </g>
        ))}
        {/* shaft */}
        <line x1={40} y1={120} x2={400} y2={120} stroke="#334155" strokeWidth={4} />

        {parts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity={0.9} />)}

        {/* labels */}
        <text x={95} y={185} fill="#93c5fd" fontSize={10} textAnchor="middle">Compressor</text>
        <text x={290} y={185} fill="#fdba74" fontSize={10} textAnchor="middle">Combustor</text>
        <text x={370} y={185} fill="#fca5a5" fontSize={10} textAnchor="middle">Turbine</text>
        <text x={445} y={110} fill="#f87171" fontSize={11} fontWeight={700} textAnchor="middle">THRUST →</text>
        <text x={40} y={70} fill="#60a5fa" fontSize={10}>air in</text>
      </svg>

      <div className="flex items-center gap-3">
        <span className="text-zinc-400 text-xs w-28 shrink-0">Throttle (N1)</span>
        <input type="range" min={20} max={100} value={thr} onChange={(e) => setThr(+e.target.value)} className="flex-1 accent-yellow-400" />
        <span className="text-white text-sm font-mono w-10 text-right">{thr}%</span>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed">
        &lsquo;Suck, squeeze, burn, blow&rsquo; — continuously. The compressor raises pressure; fuel is burned at roughly constant pressure; the turbine extracts just enough energy to drive the compressor; the rest accelerates out of the nozzle as thrust. High-bypass fans move more air at a lower velocity change — more efficient and quieter. Watch EGT rise with throttle (a key limit).
      </p>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-2">
      <div className="text-[10px] text-zinc-500">{label}</div>
      <div className="text-sm font-bold" style={{ color: color ?? "#fff" }}>{value}</div>
    </div>
  );
}
