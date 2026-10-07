// Reference tables & accurately-plotted performance graphs for the study figures.
// Original vector art / computed curves — no reproduced charts. Tables sit on a
// crisp white panel over a subtle topical scene so rows stay razor-readable.

import { RadioWaveScene, CockpitScene, SkyDayScene } from "@/app/components/figures/figureScene";

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-hidden rounded-lg border border-zinc-800 bg-white">{children}</div>;
}

// Small table renderer: header + striped rows on a white panel.
export function Table({ x, y, w, cols, rows, colX, title, titleColor = "#0f172a" }: {
  x: number; y: number; w: number; cols: string[]; rows: string[][]; colX: number[]; title?: string; titleColor?: string;
}) {
  const rh = 14, hy = title ? y + 16 : y;
  const bodyH = (rows.length + 1) * rh + 8;
  return (
    <g>
      {title && <text x={x} y={y + 9} fontSize="10" fontWeight="bold" fill={titleColor}>{title}</text>}
      <rect x={x} y={hy} width={w} height={bodyH} rx={5} fill="#ffffff" opacity={0.95} stroke="#cbd5e1" />
      <rect x={x} y={hy} width={w} height={rh + 4} rx={5} fill="#1e293b" />
      {cols.map((c, i) => <text key={i} x={x + colX[i]} y={hy + 12} fontSize="7.5" fontWeight="bold" fill="#f1f5f9">{c}</text>)}
      {rows.map((row, r) => {
        const ry = hy + rh + 4 + r * rh;
        return (
          <g key={r}>
            {r % 2 === 1 && <rect x={x + 1} y={ry - 1} width={w - 2} height={rh} fill="#eef2f7" />}
            {row.map((cell, i) => (
              <text key={i} x={x + colX[i]} y={ry + 9} fontSize="7.3" fill={i === 0 ? "#0f172a" : "#334155"} fontWeight={i === 0 ? "bold" : "normal"}>{cell}</text>
            ))}
          </g>
        );
      })}
    </g>
  );
}

/* ── A.10.1 — Radio aid frequency bands (exam values) ─────────────────────── */
export function FrequencyBands() {
  const rows = [
    ["NDB / ADF", "LF / MF", "190–1750 kHz"],
    ["VDF", "VHF", "118–137 MHz"],
    ["VOR", "VHF", "108.0–117.95 MHz"],
    ["ILS localiser", "VHF", "108–112 MHz"],
    ["ILS glide path", "UHF", "329–335 MHz"],
    ["Marker beacons", "VHF", "75 MHz"],
    ["DME", "UHF", "962–1213 MHz"],
    ["SSR", "UHF", "1030 ↑ / 1090 ↓ MHz"],
    ["Weather radar", "SHF", "~9375 MHz (3 cm)"],
    ["Radio altimeter", "SHF", "4200–4400 MHz"],
    ["GPS (civil L₁)", "UHF", "1575.42 MHz"],
    ["ELT", "VHF/UHF", "121.5 · 243 · 406 MHz"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 224" className="w-full">
        <RadioWaveScene h={224} />
        <Table x={10} y={6} w={320} cols={["Aid", "Band", "Frequency"]} colX={[6, 120, 190]} rows={rows} title="Radio-aid frequency bands — learn these" />
      </svg>
    </Frame>
  );
}

/* ── A.10.1 — Radio-nav numerical formulas ────────────────────────────────── */
export function RadioFormulas() {
  const items: [string, string][] = [
    ["Wavelength", "λ (m) = 300 ÷ f (MHz)"],
    ["VHF / line-of-sight range", "d (NM) = 1.25 (√h₁ + √h₂)   heights in ft"],
    ["DME slant range", "R (NM) = 0.162 × (T − 50) ÷ 2   (T in µs)"],
    ["Primary-radar range", "R (NM) = 162000 × T ÷ 10⁶ ÷ 2   (T in µs)"],
    ["ILS rate of descent", "ROD (fpm) = GP° × GS × 100 ÷ 60  (≈5×GS for 3°)"],
    ["Time / dist to NDB (1-in-60)", "t = 60 × min flown ÷ bearing change"],
    ["Convergency", "ch.long × sin(mean latitude)"],
    ["QDM", "QDM = Heading (M) + Relative Bearing"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <RadioWaveScene />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Radio-nav formulas for the numericals</text>
        {items.map(([label, f], i) => {
          const y = 26 + i * 22;
          return (
            <g key={i}>
              <rect x={10} y={y} width={320} height={19} rx={4} fill="#ffffff" opacity={0.95} stroke="#bae6fd" />
              <text x={16} y={y + 8} fontSize="7.5" fontWeight="bold" fill="#0369a1">{label}</text>
              <text x={16} y={y + 16.5} fontSize="8.2" fill="#0f172a">{f}</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ── A.7.1 — V-speeds reference (ASI markings + definitions) ───────────────── */
export function VSpeedTable() {
  const rows = [
    ["VS0", "Stall, landing config (gear/flap down)", "White arc ↓", "40"],
    ["VS1", "Stall, specified clean config", "Green arc ↓", "48"],
    ["VFE", "Max flap-extended speed", "White arc ↑", "85"],
    ["VNO", "Max structural cruising", "Green arc ↑", "129"],
    ["VNE", "Never-exceed speed", "Red radial", "163"],
    ["VA", "Manoeuvring (full deflection safe)", "not marked", "≈99"],
    ["VYSE", "Best rate of climb, 1 engine (twin)", "Blue radial", "—"],
    ["V1/VR/V2", "Decision / rotate / take-off safety", "not marked", "—"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 168" className="w-full">
        <CockpitScene h={168} />
        <Table x={10} y={6} w={320} cols={["V-speed", "Meaning", "ASI mark", "kt*"]} colX={[6, 62, 218, 290]} rows={rows} title="V-speeds — ASI markings & meanings" />
        <text x={12} y={162} fontSize="6.8" fill="#475569">*typical SEP values (varies by type). VA reduces at lighter weight.</text>
      </svg>
    </Frame>
  );
}

/* ── A.4.7 — Drag vs speed (L/Dmax at Vmd), accurately computed ────────────── */
export function DragCurve() {
  const x0 = 46, x1 = 210, yb = 156, yt = 40;
  const Vmin = 40, Vmax = 180, Vmd = 95;
  const sx = (v: number) => x0 + ((v - Vmin) / (Vmax - Vmin)) * (x1 - x0);
  // parasite ∝ V², induced ∝ 1/V²; scaled so total(Vmd) sits ~⅔ up the axis.
  const cp = 1, ci = cp * Math.pow(Vmd, 4);
  const para = (v: number) => cp * v * v;
  const ind = (v: number) => ci / (v * v);
  const tot = (v: number) => para(v) + ind(v);
  const dmax = tot(Vmin) * 1.02;
  const sy = (d: number) => yb - (d / dmax) * (yb - yt);
  const path = (f: (v: number) => number) => {
    let p = "";
    for (let v = Vmin; v <= Vmax; v += 4) p += (v === Vmin ? "M" : "L") + sx(v).toFixed(1) + " " + sy(f(v)).toFixed(1) + " ";
    return p;
  };
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <SkyDayScene h={200} />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Drag vs speed — Vmd = L/D max</text>
        {/* axes */}
        <line x1={x0} y1={yt} x2={x0} y2={yb} stroke="#94a3b8" /><line x1={x0} y1={yb} x2={x1 + 4} y2={yb} stroke="#94a3b8" />
        <text x={16} y={48} fontSize="7.5" fill="#64748b">drag</text><text x={x1 - 34} y={yb + 12} fontSize="7.5" fill="#64748b">speed (IAS) →</text>
        {/* curves */}
        <path d={path(ind)} fill="none" stroke="#1d4ed8" strokeWidth="1.6" strokeDasharray="4 3" />
        <path d={path(para)} fill="none" stroke="#059669" strokeWidth="1.6" strokeDasharray="4 3" />
        <path d={path(tot)} fill="none" stroke="#dc2626" strokeWidth="2.2" />
        {/* Vmd marker */}
        <line x1={sx(Vmd)} y1={sy(tot(Vmd))} x2={sx(Vmd)} y2={yb} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={sx(Vmd)} cy={sy(tot(Vmd))} r={3} fill="#dc2626" />
        <text x={sx(Vmd) - 6} y={yb + 11} fontSize="7.5" fill="#334155" fontWeight="bold">Vmd</text>
        {/* labels */}
        <text x={sx(60)} y={sy(ind(60)) - 4} fontSize="7" fill="#1d4ed8">induced (∝1/V²)</text>
        <text x={sx(150) - 40} y={sy(para(150)) - 4} fontSize="7" fill="#059669">parasite (∝V²)</text>
        <text x={sx(120)} y={sy(tot(120)) - 5} fontSize="7.5" fill="#dc2626" fontWeight="bold">total drag</text>
        {/* facts */}
        <rect x={222} y={30} width={110} height={120} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={228} y={44} fontSize="8" fontWeight="bold" fill="#b45309">At Vmd (min drag):</text>
        <text x={228} y={57} fontSize="7.3" fill="#0f172a">• L/D is MAXIMUM</text>
        <text x={228} y={69} fontSize="7.3" fill="#0f172a">• induced = parasite drag</text>
        <text x={228} y={81} fontSize="7.3" fill="#0f172a">• best glide range (still air)</text>
        <text x={228} y={93} fontSize="7.3" fill="#0f172a">• best endurance (jet)</text>
        <text x={228} y={110} fontSize="7.3" fill="#334155">Vmp (min power) ≈ 0.76 Vmd</text>
        <text x={228} y={122} fontSize="7.3" fill="#334155">→ best endurance (piston)</text>
        <text x={228} y={138} fontSize="7" fill="#64748b">Heavier → curve shifts up-right;</text>
        <text x={228} y={148} fontSize="7" fill="#64748b">glide RANGE unchanged.</text>
      </svg>
    </Frame>
  );
}

/* ── A.4.2 — V-n (flight envelope) diagram with limit load factors ─────────── */
export function VnDiagram() {
  const x0 = 44, x1 = 220, xc = 44, yc = 108; // origin left, n=0 line at yc
  const Vs = 48, Va = 99, Vno = 129, Vne = 163, Vmax = 180;
  const nPos = 3.8, nNeg = -1.52;
  const sx = (v: number) => x0 + (v / Vmax) * (x1 - x0);
  const sy = (n: number) => yc - n * (56 / nPos); // +3.8 → 56px up
  // positive stall curve n = (V/Vs)^2 up to Va
  const stall = (sign: number) => {
    let p = "";
    const nlim = sign > 0 ? nPos : nNeg;
    const Vlim = sign > 0 ? Va : Vs * Math.sqrt(Math.abs(nNeg));
    for (let v = Vs * Math.sqrt(sign > 0 ? 1 : 1); v <= Vlim; v += 2) {
      const n = sign * Math.pow(v / Vs, 2);
      const nn = Math.abs(n) > Math.abs(nlim) ? nlim : n;
      p += (p === "" ? "M" : "L") + sx(v).toFixed(1) + " " + sy(nn).toFixed(1) + " ";
    }
    return p;
  };
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <SkyDayScene h={200} />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">V-n flight envelope (load factor limits)</text>
        {/* axes */}
        <line x1={xc} y1={30} x2={xc} y2={186} stroke="#94a3b8" /><line x1={xc} y1={yc} x2={x1 + 6} y2={yc} stroke="#94a3b8" />
        <text x={16} y={sy(nPos) + 3} fontSize="7" fill="#64748b">+3.8g</text>
        <text x={16} y={sy(nNeg) + 3} fontSize="7" fill="#64748b">−1.52g</text>
        <text x={16} y={yc + 3} fontSize="7" fill="#64748b">1g</text>
        <text x={x1 - 24} y={yc + 12} fontSize="7.5" fill="#64748b">IAS →</text>
        {/* envelope */}
        <path d={stall(1)} fill="none" stroke="#dc2626" strokeWidth="1.8" />
        <path d={stall(-1)} fill="none" stroke="#dc2626" strokeWidth="1.8" />
        <line x1={sx(Va)} y1={sy(nPos)} x2={sx(Vne)} y2={sy(nPos)} stroke="#dc2626" strokeWidth="1.8" />
        <line x1={sx(Vs * Math.sqrt(1.52))} y1={sy(nNeg)} x2={sx(Vno)} y2={sy(nNeg)} stroke="#dc2626" strokeWidth="1.8" />
        <line x1={sx(Vne)} y1={sy(nPos)} x2={sx(Vne)} y2={yc} stroke="#dc2626" strokeWidth="1.8" />
        <line x1={sx(Vno)} y1={sy(nNeg)} x2={sx(Vne)} y2={yc} stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 3" />
        {/* speed markers */}
        {[[Vs, "Vs"], [Va, "VA"], [Vno, "VNO"], [Vne, "VNE"]].map(([v, n], i) => (
          <g key={i}><line x1={sx(v as number)} y1={yc - 2} x2={sx(v as number)} y2={yc + 2} stroke="#334155" /><text x={sx(v as number)} y={yc + 12} fontSize="6.8" fill="#334155" textAnchor="middle">{n}</text></g>
        ))}
        {/* facts */}
        <rect x={230} y={28} width={102} height={120} rx={5} fill="#ffffff" opacity={0.94} stroke="#cbd5e1" />
        <text x={236} y={42} fontSize="8" fontWeight="bold" fill="#4338ca">Normal category</text>
        <text x={236} y={55} fontSize="7.3" fill="#0f172a">Limit load +3.8 / −1.52g</text>
        <text x={236} y={67} fontSize="7.3" fill="#0f172a">Utility +4.4 / −1.76g</text>
        <text x={236} y={79} fontSize="7.3" fill="#0f172a">Acrobatic +6.0 / −3.0g</text>
        <text x={236} y={95} fontSize="7.3" fill="#334155">Below VA: stalls before</text>
        <text x={236} y={105} fontSize="7.3" fill="#334155">it over-stresses.</text>
        <text x={236} y={121} fontSize="7.3" fill="#334155">VA reduces at lighter</text>
        <text x={236} y={131} fontSize="7.3" fill="#334155">weight (√ mass ratio).</text>
        <text x={236} y={144} fontSize="7" fill="#64748b">Ultimate = 1.5 × limit.</text>
      </svg>
    </Frame>
  );
}
