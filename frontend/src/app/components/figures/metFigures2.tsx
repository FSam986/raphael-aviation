// Additional illustrated "cheat-code" infographics for CPL Meteorology, covering
// the A.8 aspects that had no figure. In-house vector weather art (ISA column,
// stability/lapse rates, cloud ladder, thunderstorm life cycle, fronts, fog)
// with sky-gradient grounds and original motifs — nothing reproduced.

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-hidden rounded-lg border border-zinc-800 bg-white">{children}</div>;
}

// A.8.2 — ICAO Standard Atmosphere key figures.
import { SkyDayScene, StormScene, SkyDuskScene, FogScene } from "@/app/components/figures/figureScene";

export function ISAColumn() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <linearGradient id="isa-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" /><stop offset="55%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>
        <SkyDayScene />
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#0f172a">ICAO Standard Atmosphere (ISA)</text>
        {/* altitude ladder */}
        <line x1={70} y1={30} x2={70} y2={190} stroke="#334155" strokeOpacity="0.6" />
        {[["MSL", "15°C · 1013.25 hPa · 1.225 kg/m³", 186],
          ["5 000 ft", "+5°C (≈ 843 hPa)", 150],
          ["10 000 ft", "−5°C", 116],
          ["18 000 ft", "≈ 500 hPa (½ MSL pressure)", 86],
          ["36 090 ft", "−56.5°C — TROPOPAUSE", 52],
          ["above trop.", "isothermal −56.5°C", 34]].map(([a, b, y]) => (
          <g key={a as string}>
            <circle cx={70} cy={y as number} r={3} fill="#1d4ed8" />
            <text x={80} y={(y as number) - 1} fontSize="8.5" fontWeight="bold" fill="#0f172a">{a}</text>
            <text x={80} y={(y as number) + 9} fontSize="7.5" fill="#1e293b">{b}</text>
          </g>
        ))}
        <rect x={12} y={196} width={316} height={0} />
        <rect x={214} y={150} width={116} height={44} rx={5} fill="#ffffff" opacity="0.92" />
        <text x={220} y={164} fontSize="8.5" fontWeight="bold" fill="#1d4ed8">Lapse rate ISA</text>
        <text x={220} y={177} fontSize="8" fill="#0f172a">1.98°C / 1000 ft (≈ 2°)</text>
        <text x={220} y={189} fontSize="8" fill="#0f172a">to the tropopause</text>
      </svg>
    </Frame>
  );
}

// A.8.9 — stability & lapse rates (DALR/SALR/ELR).
export function StabilityLapseRates() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <linearGradient id="stab-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" /><stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>
        <SkyDayScene />
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#0f172a">Lapse rates &amp; stability</text>
        {/* stability regions (temperature falls with height → lines lean up-LEFT) */}
        <polygon points="150,150 100,40 40,40 40,150" fill="#ef4444" opacity={0.1} />
        <polygon points="150,150 100,40 128,40" fill="#f59e0b" opacity={0.12} />
        <polygon points="150,150 128,40 180,40 180,150" fill="#22c55e" opacity={0.1} />
        {/* axes */}
        <line x1={40} y1={40} x2={40} y2={150} stroke="#94a3b8" /><line x1={40} y1={150} x2={182} y2={150} stroke="#94a3b8" />
        <text x={18} y={48} fontSize="7.5" fill="#64748b">alt ↑</text><text x={150} y={164} fontSize="7.5" fill="#64748b">warmer →</text>
        <circle cx={150} cy={150} r={2.5} fill="#0f172a" /><text x={140} y={162} fontSize="6.5" fill="#334155">surface</text>
        {/* DALR (steeper cool) and SALR reference lines, both rising up-left */}
        <line x1={150} y1={150} x2={100} y2={40} stroke="#dc2626" strokeWidth="2" /><text x={88} y={37} fontSize="7.5" fill="#dc2626" fontWeight="bold" textAnchor="middle">DALR</text>
        <line x1={150} y1={150} x2={128} y2={40} stroke="#16a34a" strokeWidth="2" /><text x={132} y={37} fontSize="7.5" fill="#16a34a" fontWeight="bold" textAnchor="middle">SALR</text>
        <line x1={150} y1={150} x2={86} y2={40} stroke="#1d4ed8" strokeWidth="1.8" strokeDasharray="4 3" /><text x={44} y={52} fontSize="7.5" fill="#1d4ed8">ELR (actual)</text>
        <text x={46} y={92} fontSize="6.5" fill="#b91c1c">unstable</text>
        <text x={150} y={108} fontSize="6.5" fill="#15803d">stable</text>
        {/* stability rules */}
        <rect x={196} y={30} width={132} height={124} rx={6} fill="#ffffff" stroke="#c7d2fe" />
        <text x={202} y={45} fontSize="9" fontWeight="bold" fill="#4338ca">Compare ELR with:</text>
        <text x={202} y={62} fontSize="8" fill="#dc2626" fontWeight="bold">ELR &gt; DALR → UNSTABLE</text>
        <text x={202} y={73} fontSize="7.5" fill="#334155">(CU/CB, showers, good vis)</text>
        <text x={202} y={90} fontSize="8" fill="#16a34a" fontWeight="bold">ELR &lt; SALR → STABLE</text>
        <text x={202} y={101} fontSize="7.5" fill="#334155">(ST, layer cloud, poor vis)</text>
        <text x={202} y={118} fontSize="8" fill="#b45309" fontWeight="bold">between → conditional</text>
        <text x={202} y={129} fontSize="7.5" fill="#334155">(unstable once saturated)</text>
        <text x={202} y={146} fontSize="7.5" fill="#64748b">Inversion = temp ↑ with height</text>
        <text x={12} y={176} fontSize="8" fill="#0f172a">DALR 3.0°C/1000 ft (dry) · SALR ~1.5°C (latent heat slows cooling) · ELR = actual.</text>
        <text x={12} y={190} fontSize="8" fill="#64748b">Turbulent mixing of an unsaturated layer drives its profile toward the DALR.</text>
      </svg>
    </Frame>
  );
}

// A.8.10 — cloud types ladder.
export function CloudLadder() {
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <linearGradient id="cl-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bfdbfe" /><stop offset="100%" stopColor="#f0f9ff" />
          </linearGradient>
        </defs>
        <SkyDayScene />
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#0f172a">Cloud types by height</text>
        {[["HIGH (cirro-) 16 500 ft+", "Ci, Cc, Cs — ice crystals", 40, "#e0e7ff"],
          ["MEDIUM (alto-) 6 500–23 000", "Ac, As", 92, "#c7d2fe"],
          ["LOW below 6 500 ft", "St, Sc, Ns", 144, "#a5b4fc"]].map(([a, b, y, c]) => (
          <g key={a as string}>
            <ellipse cx={80} cy={y as number} rx={54} ry={16} fill={c as string} />
            <ellipse cx={110} cy={(y as number) - 6} rx={30} ry={14} fill={c as string} />
            <text x={150} y={(y as number) - 4} fontSize="9" fontWeight="bold" fill="#3730a3">{a}</text>
            <text x={150} y={(y as number) + 8} fontSize="8" fill="#334155">{b}</text>
          </g>
        ))}
        {/* vertical development */}
        <path d="M40 190 q6 -40 22 -44 q-4 -30 26 -30 q22 -2 22 20 q18 2 14 24 q10 8 -2 30 z" fill="#c7d2fe" stroke="#818cf8" />
        <text x={20} y={200} fontSize="8" fill="#4338ca" fontWeight="bold">Vertical: Cu / CB (towering)</text>
        <text x={150} y={186} fontSize="8" fill="#0f172a">CB = thunderstorm; Ns = rain-bearing.</text>
        <text x={150} y={199} fontSize="8" fill="#64748b">Cloud base (ft) ≈ (Temp − Dewpoint)/2.5 × 1000 (spread rule).</text>
      </svg>
    </Frame>
  );
}

// A.8.12 — thunderstorm life cycle.
export function ThunderstormCycle() {
  const cell = (x: number, title: string, up: boolean, down: boolean, note: string) => (
    <g>
      <path d={`M${x - 30} 120 q6 -46 30 -50 q24 4 30 50 z`} fill="#cbd5e1" stroke="#64748b" />
      <text x={x} y={62} fontSize="9" textAnchor="middle" fontWeight="bold" fill="#0f172a">{title}</text>
      {up && <line x1={x - 8} y1={116} x2={x - 8} y2={78} stroke="#dc2626" strokeWidth="2" markerEnd="url(#tsu)" />}
      {down && <line x1={x + 8} y1={80} x2={x + 8} y2={118} stroke="#1d4ed8" strokeWidth="2" markerEnd="url(#tsd)" />}
      <text x={x} y={136} fontSize="7.5" textAnchor="middle" fill="#334155">{note}</text>
    </g>
  );
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <defs>
          <linearGradient id="ts-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" /><stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <marker id="tsu" markerWidth="6" markerHeight="6" refX="3" refY="1" orient="auto"><path d="M0,6 L3,0 L6,6 Z" fill="#dc2626" /></marker>
          <marker id="tsd" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><path d="M0,0 L3,6 L6,0 Z" fill="#1d4ed8" /></marker>
        </defs>
        <StormScene h={200} />
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#0f172a">Thunderstorm life cycle</text>
        {cell(70, "CUMULUS", true, false, "updraught only, building")}
        {cell(170, "MATURE", true, true, "up + downdraught · hail, gust, lightning")}
        {cell(270, "DISSIPATING", false, true, "downdraught only, spreading anvil")}
        <line x1={100} y1={90} x2={140} y2={90} stroke="#fff" markerEnd="url(#tsu)" opacity="0" />
        <path d="M104 100 L136 100" stroke="#fff" strokeWidth="1.4" markerEnd="url(#arw)" /><path d="M204 100 L236 100" stroke="#fff" strokeWidth="1.4" markerEnd="url(#arw)" />
        <defs><marker id="arw" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#fff" /></marker></defs>
        <rect x={12} y={150} width={316} height={40} rx={6} fill="#ffffff" opacity="0.95" />
        <text x={18} y={165} fontSize="8.5" fill="#0f172a" fontWeight="bold">Needs: moisture + instability + a lift trigger.</text>
        <text x={18} y={179} fontSize="8" fill="#334155">Hazards: severe turbulence, hail, icing, wind shear/microburst, lightning. Avoid by 10 NM.</text>
      </svg>
    </Frame>
  );
}

// A.8.17 — fronts (warm / cold / occluded).
export function FrontsDiagram() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <defs>
          <linearGradient id="fr-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" /><stop offset="100%" stopColor="#eef2ff" />
          </linearGradient>
        </defs>
        <SkyDuskScene h={200} />
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#0f172a">Fronts — warm, cold &amp; occluded</text>
        {/* warm front */}
        <text x={14} y={40} fontSize="9" fontWeight="bold" fill="#dc2626">WARM FRONT</text>
        <path d="M20 90 L120 90" stroke="#dc2626" strokeWidth="2" />
        {[24,44,64,84,104].map((x)=><path key={x} d={`M${x} 90 a5 5 0 0 1 10 0`} fill="none" stroke="#dc2626" strokeWidth="2" />)}
        <path d="M20 88 L110 56" stroke="#94a3b8" strokeWidth="1" />
        <text x={14} y={104} fontSize="7.5" fill="#334155">shallow slope · widespread Ns · steady rain</text>
        {/* cold front */}
        <text x={200} y={40} fontSize="9" fontWeight="bold" fill="#1d4ed8">COLD FRONT</text>
        <path d="M206 90 L306 90" stroke="#1d4ed8" strokeWidth="2" />
        {[210,232,254,276,298].map((x)=><path key={x} d={`M${x} 90 l5 -8 l5 8`} fill="none" stroke="#1d4ed8" strokeWidth="2" />)}
        <path d="M300 90 L266 54" stroke="#94a3b8" strokeWidth="1" />
        <text x={200} y={104} fontSize="7.5" fill="#334155">steep slope · CB · showers, gusts, brief</text>
        {/* occluded */}
        <text x={14} y={140} fontSize="9" fontWeight="bold" fill="#7c3aed">OCCLUDED</text>
        <path d="M20 156 L200 156" stroke="#7c3aed" strokeWidth="2" />
        {[26,66,106,146,186].map((x,i)=> i%2? <path key={x} d={`M${x} 156 l5 -8 l5 8`} fill="none" stroke="#7c3aed" strokeWidth="2"/> : <path key={x} d={`M${x} 156 a5 5 0 0 1 10 0`} fill="none" stroke="#7c3aed" strokeWidth="2"/>)}
        <text x={14} y={170} fontSize="7.5" fill="#334155">cold catches warm · lifts the warm sector aloft</text>
        <text x={210} y={140} fontSize="8" fill="#0f172a">Mid-latitude depression:</text>
        <text x={210} y={153} fontSize="7.5" fill="#334155">warm sector between warm &amp; cold fronts;</text>
        <text x={210} y={165} fontSize="7.5" fill="#334155">veer of wind at each frontal passage.</text>
      </svg>
    </Frame>
  );
}

// A.8.15 — fog types & visibility.
export function FogTypes() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <defs>
          <linearGradient id="fog-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" /><stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>
        <FogScene h={200} />
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#0f172a">Fog types (vis &lt; 1000 m)</text>
        {[["RADIATION", "clear, calm, moist night; land cools by radiation; light wind ~2–8 kt. Clears with sun/wind.", "#1d4ed8", 34],
          ["ADVECTION", "warm moist air over a cooler surface (e.g. sea); persists in stronger wind; can be extensive.", "#0891b2", 74],
          ["STEAMING / FRONTAL", "cold air over warm water (steam fog); or rain into cold air below a warm front (frontal fog).", "#7c3aed", 114],
          ["UPSLOPE / HILL", "moist air forced up rising ground, cooling to saturation.", "#16a34a", 154]].map(([a, b, c, y]) => (
          <g key={a as string}>
            <rect x={12} y={(y as number) - 12} width={316} height={34} rx={5} fill={c as string} opacity="0.10" stroke={c as string} />
            <text x={20} y={(y as number) + 1} fontSize="9" fontWeight="bold" fill={c as string}>{a}</text>
            <text x={20} y={(y as number) + 14} fontSize="7.8" fill="#334155">{b}</text>
          </g>
        ))}
        <text x={12} y={192} fontSize="8" fill="#64748b">Fog = saturated air + condensation nuclei; needs the temperature to reach the dew point.</text>
      </svg>
    </Frame>
  );
}
