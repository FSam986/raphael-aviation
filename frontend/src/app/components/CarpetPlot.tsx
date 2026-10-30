"use client";

import { useState } from "react";

// Faithful replica of the CAP 698 take-off / landing DISTANCE carpet graph
// (Figure 2.1 / 2.4 family). The ARTWORK is original (not a scan of the Crown-
// copyright figure); the axis scales, curve families and the worked path follow
// the manual's own method (CAP 698 §2.2.1):
//   a) enter OAT, go UP to the pressure-altitude curve  → "corrected" PA level
//   b) HORIZONTAL right to the mass reference line, then PARALLEL the grid to mass
//   c) HORIZONTAL to the wind reference line, then PARALLEL the grid to the wind
//   d) HORIZONTAL to the obstacle reference line (ground-roll read), then PARALLEL
//      the grid up to 50 ft → read total take-off/landing DISTANCE.
// The worked line is GENERATED from that chain, so inside every panel it runs
// parallel to the guide family and lands on the answer — it never cuts across.

export interface CarpetSpec {
  variant: "takeoff" | "landing";
  distanceMax: number; // top of the distance axis in ft
  oatC: number; // OAT entry (°C)
  massLb: number; // mass input (lb)
  windKt: number; // wind component, + = headwind, − = tailwind
  // carried DISTANCE levels (ft) at each stage of the chain — see §2.2.1 above.
  paLevelFt: number; // after climbing to the pressure-altitude curve (corrected PA)
  afterMassFt: number; // after paralleling the mass grid to the mass input
  groundRollFt: number; // after paralleling the wind grid (ground roll @ 0 ft obstacle)
  totalFt: number; // after paralleling the obstacle grid to 50 ft (the answer)
  readout: string; // e.g. "≈ 3 450 ft"
}

const RED = "#ef4444";
const AX = "#a1a1aa";
const GRIDMAJ = "#52525b";
const GRIDMIN = "#45454e";
const CURVE = "#60a5fa";
const REFC = "#e4e4e7";

// Dark halo behind labels so text stays readable over grid/reference/curve lines.
const halo = { stroke: "#09090b", strokeWidth: 3, strokeLinejoin: "round" as const, style: { paintOrder: "stroke" as const } };

// SVG geometry
const X0 = 78;
const X1 = 1064;
const Y0 = 40; // top (distance = max)
const Y1 = 484; // bottom (distance = 0)
// panel reference-line x positions
const PX = [X0, 430, 662, 862, X1]; // temp/PA | mass | wind | obstacle | dist-axis

const sy = (f: number) => Y1 - f * (Y1 - Y0); // fraction 0..1 → y (dist)

// axis → pixel x mappings (match the printed scales)
const oatPx = (t: number) => PX[0] + ((t + 40) / 100) * (PX[1] - PX[0]); // −40..+60 °C
const massPx = (m: number) => PX[1] + (1 - (m - 2800) / 850) * (PX[2] - PX[1]); // 3650(left)..2800
// Wind axis is MAGNITUDE only (0..30 kt): the 0 reference line is at the left; head-
// and tail-wind both plot to the right of it and differ only by which guide family is
// paralleled (head = down/shorter, tail = up/longer) — exactly as on CAP 698 Fig 2.1.
const windPx = (magKt: number) => PX[2] + (Math.min(Math.abs(magKt), 30) / 30) * (PX[3] - PX[2]);
const obsPx = (o: number) => PX[3] + (o / 50) * (PX[4] - PX[3]); // 0..50 ft

function grid() {
  const lines: React.ReactElement[] = [];
  let k = 0;
  for (let x = X0; x <= X1 + 0.5; x += (X1 - X0) / 52, k++) {
    lines.push(<line key={`v${k}`} x1={x} y1={Y0} x2={x} y2={Y1} stroke={GRIDMIN} strokeWidth="1" />);
  }
  k = 0;
  for (let y = Y0; y <= Y1 + 0.5; y += (Y1 - Y0) / 40, k++) {
    lines.push(<line key={`h${k}`} x1={X0} y1={y} x2={X1} y2={y} stroke={GRIDMIN} strokeWidth="1" />);
  }
  return lines;
}

// Panel 1: pressure-altitude curve family over OAT −40..+60 °C.
const PA_SET = [0, 2000, 4000, 6000, 8000, 10000];
function paCurve(pa: number): string {
  const base = 0.1 + (pa / 10000) * 0.42;
  const pts: string[] = [];
  for (let t = -40; t <= 60; t += 10) {
    const h = base + (t - 15) * 0.0032 + (pa / 10000) * (t - 15) * 0.0006;
    const y = Y1 - Math.max(0.02, Math.min(0.95, h)) * (Y1 - Y0);
    pts.push(`${pts.length ? "L" : "M"} ${oatPx(t).toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

// A family of parallel guide lines (slope m) filling a panel [xL,xR]; the worked
// segment in that panel shares this slope, so the red line is provably parallel.
function GuideFan({ xL, xR, m, keyp }: { xL: number; xR: number; m: number; keyp: string }) {
  const lines: React.ReactElement[] = [];
  const span = Y1 - Y0;
  const n = 7;
  for (let i = -2; i <= n + 2; i++) {
    const b = Y0 + (span * i) / n;
    lines.push(<line key={`${keyp}${i}`} x1={xL} y1={b} x2={xR} y2={b + m * (xR - xL)} stroke={CURVE} strokeWidth="1" opacity="0.6" />);
  }
  return <g clipPath="url(#carpetClip)">{lines}</g>;
}

export function CarpetPlot({ spec, reveal }: { spec: CarpetSpec; reveal: boolean }) {
  const [zoom, setZoom] = useState(1);

  const oatTicks = [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60];
  const massTicks = [3650, 3400, 3200, 3000, 2800];
  const windTicks = [0, 10, 20, 30];
  const obsTicks = [0, 25, 50];
  const distTicks: number[] = [];
  for (let d = 0; d <= spec.distanceMax; d += 1000) distTicks.push(d);

  const yf = (ft: number) => sy(ft / spec.distanceMax);

  // Worked-path vertices (CAP 698 §2.2.1 chain).
  const V = {
    foot: [oatPx(spec.oatC), Y1] as const, // enter at OAT
    pa: [oatPx(spec.oatC), yf(spec.paLevelFt)] as const, // up to PA curve (corrected PA)
    massRef: [PX[1], yf(spec.paLevelFt)] as const, // horizontal to mass ref
    mass: [massPx(spec.massLb), yf(spec.afterMassFt)] as const, // parallel mass grid
    windRef: [windPx(0), yf(spec.afterMassFt)] as const, // horizontal to wind ref (0 kt)
    wind: [windPx(Math.abs(spec.windKt)), yf(spec.groundRollFt)] as const, // parallel head/tail grid (to the right of 0)
    obsRef: [PX[3], yf(spec.groundRollFt)] as const, // horizontal to obstacle ref (0 ft) = ground roll
    total: [obsPx(50), yf(spec.totalFt)] as const, // parallel obstacle grid to 50 ft = answer
  };
  const order = [V.foot, V.pa, V.massRef, V.mass, V.windRef, V.wind, V.obsRef, V.total];
  const redPath = order.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

  // Guide-fan slopes derived from the worked segments → guaranteed parallel.
  const slope = (a: readonly [number, number], b: readonly [number, number], fallback: number) =>
    Math.abs(b[0] - a[0]) < 1 ? fallback : (b[1] - a[1]) / (b[0] - a[0]);
  const mMass = slope(V.massRef, V.mass, (0.22 * (Y1 - Y0)) / (PX[2] - PX[1])); // down-right default
  const mObs = slope(V.obsRef, V.total, (-0.1 * (Y1 - Y0)) / (PX[4] - PX[3]));
  // Wind: two families drawn from the 0 reference — head slopes DOWN (+), tail UP (−).
  // The worked segment parallels whichever matches, so use |slope| for both fans.
  const sWind = Math.abs(slope(V.windRef, V.wind, (0.14 * (Y1 - Y0)) / (PX[3] - PX[2])));

  // numbered plotting steps (match the manual's triangle markers)
  const steps: { p: readonly [number, number]; n: number }[] = [
    { p: V.pa, n: 1 },
    { p: V.mass, n: 2 },
    { p: V.wind, n: 3 },
    { p: V.obsRef, n: 4 },
    { p: V.total, n: 5 },
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1" />
        <span className="text-[10px] text-zinc-600">zoom</span>
        <button onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-zinc-900 text-zinc-300">−</button>
        <span className="text-[10px] text-zinc-500 w-8 text-center">{zoom}×</span>
        <button onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-zinc-900 text-zinc-300">+</button>
      </div>

      <div className="overflow-auto rounded-lg border border-zinc-900" style={{ maxHeight: 560 }}>
        <svg viewBox="0 0 1120 560" preserveAspectRatio="xMidYMid meet" className="block bg-zinc-950"
          style={zoom === 1 ? { width: "100%", height: "auto" } : { width: 1120 * zoom, height: 560 * zoom }}>
          <defs>
            <clipPath id="carpetClip"><rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} /></clipPath>
          </defs>
          {grid()}

          {/* panel reference lines */}
          {PX.map((x, i) => (
            <line key={`ref${i}`} x1={x} y1={Y0} x2={x} y2={Y1} stroke={i === 0 || i === PX.length - 1 ? AX : REFC} strokeWidth={i === 0 || i === PX.length - 1 ? 1.6 : 1.2} />
          ))}
          <line x1={X0} y1={Y1} x2={X1} y2={Y1} stroke={AX} strokeWidth="1.6" />

          {/* ── Panel 1: pressure-altitude family ── */}
          {PA_SET.map((pa) => (
            <path key={pa} d={paCurve(pa)} fill="none" stroke={CURVE} strokeWidth="1.4" />
          ))}
          {PA_SET.map((pa) => {
            const x = oatPx(15);
            const base = 0.1 + (pa / 10000) * 0.42;
            const y = Y1 - base * (Y1 - Y0);
            return (
              <text key={`l${pa}`} x={x - 6} y={y - 3} {...halo} fill={CURVE} fontSize="12" textAnchor="end">
                {pa === 0 ? "SL" : pa === 10000 ? "10 000" : pa}
              </text>
            );
          })}
          {oatTicks.map((t) => (
            <text key={`o${t}`} x={oatPx(t)} y={Y1 + 15} {...halo} fill={AX} fontSize="13" textAnchor="middle">{t}</text>
          ))}
          <text x={(PX[0] + PX[1]) / 2} y={Y1 + 34} {...halo} fill={AX} fontSize="14" textAnchor="middle">OUTSIDE AIR TEMPERATURE °C</text>
          <text x={PX[0] + 8} y={Y0 + 14} {...halo} fill={AX} fontSize="12">PRESSURE ALTITUDE (ft)</text>

          {/* ── Panel 2: mass ── */}
          <GuideFan xL={PX[1]} xR={PX[2]} m={mMass} keyp="mf" />
          {massTicks.map((mm) => (
            <g key={`m${mm}`}>
              <line x1={massPx(mm)} y1={Y0} x2={massPx(mm)} y2={Y1} stroke={GRIDMAJ} strokeWidth="0.6" strokeDasharray="2 3" />
              <text x={massPx(mm)} y={Y1 + 15} {...halo} fill={AX} fontSize="13" textAnchor="middle">{mm}</text>
            </g>
          ))}
          <text x={PX[1] + 4} y={Y0 + 14} {...halo} fill={REFC} fontSize="11">REF</text>
          <text x={(PX[1] + PX[2]) / 2} y={Y1 + 34} {...halo} fill={AX} fontSize="14" textAnchor="middle">MASS — lb</text>

          {/* ── Panel 3: wind (magnitude axis; HEAD fan descends, TAIL fan ascends) ── */}
          <GuideFan xL={PX[2]} xR={PX[3]} m={sWind} keyp="wfh" />
          <GuideFan xL={PX[2]} xR={PX[3]} m={-sWind} keyp="wft" />
          {windTicks.map((w) => (
            <g key={`w${w}`}>
              <line x1={windPx(w)} y1={Y0} x2={windPx(w)} y2={Y1} stroke={w === 0 ? REFC : GRIDMAJ} strokeWidth={w === 0 ? 1.2 : 0.6} strokeDasharray={w === 0 ? undefined : "2 3"} />
              <text x={windPx(w)} y={Y1 + 15} {...halo} fill={AX} fontSize="13" textAnchor="middle">{w}</text>
            </g>
          ))}
          <text x={windPx(0) + 4} y={Y0 + 14} {...halo} fill={REFC} fontSize="11">REF (0)</text>
          <text x={windPx(26)} y={Y0 + 28} {...halo} fill={CURVE} fontSize="11" textAnchor="middle">TAIL WIND ↑</text>
          <text x={windPx(26)} y={Y1 - 20} {...halo} fill={CURVE} fontSize="11" textAnchor="middle">HEAD WIND ↓</text>
          <text x={(PX[2] + PX[3]) / 2} y={Y1 + 34} {...halo} fill={AX} fontSize="14" textAnchor="middle">WIND COMPONENT — kt</text>

          {/* ── Panel 4: obstacle height ── */}
          <GuideFan xL={PX[3]} xR={PX[4]} m={mObs} keyp="of" />
          {obsTicks.map((o) => (
            <g key={`ob${o}`}>
              <line x1={obsPx(o)} y1={Y0} x2={obsPx(o)} y2={Y1} stroke={o === 0 ? REFC : GRIDMAJ} strokeWidth={o === 0 ? 1.2 : 0.6} strokeDasharray={o === 0 ? undefined : "2 3"} />
              <text x={obsPx(o)} y={Y1 + 15} {...halo} fill={AX} fontSize="13" textAnchor="middle">{o}</text>
            </g>
          ))}
          <text x={PX[3] + 4} y={Y0 + 14} {...halo} fill={REFC} fontSize="11">REF</text>
          <text x={(PX[3] + PX[4]) / 2} y={Y1 + 34} {...halo} fill={AX} fontSize="14" textAnchor="middle">OBSTACLE HT — ft</text>

          {/* ── Distance axis (right) ── */}
          {distTicks.map((d) => (
            <g key={`d${d}`}>
              <line x1={X0} y1={yf(d)} x2={X1} y2={yf(d)} stroke={GRIDMAJ} strokeWidth="0.4" opacity="0.5" />
              <text x={X1 + 6} y={yf(d) + 3} {...halo} fill={AX} fontSize="13">{d}</text>
            </g>
          ))}
          <text x={X1 + 40} y={(Y0 + Y1) / 2} {...halo} fill={AX} fontSize="14" textAnchor="middle" transform={`rotate(-90 ${X1 + 40} ${(Y0 + Y1) / 2})`}>DISTANCE — ft</text>

          {/* ── Red worked path ── */}
          {reveal && (
            <g>
              <path d={redPath} fill="none" stroke={RED} strokeWidth="2.4" />
              {/* ground-roll read-off (horizontal from the obstacle reference line) */}
              <line x1={PX[3]} y1={yf(spec.groundRollFt)} x2={X1} y2={yf(spec.groundRollFt)} stroke={RED} strokeWidth="1.3" strokeDasharray="4 4" opacity="0.8" />
              <text x={X1 - 4} y={yf(spec.groundRollFt) - 5} {...halo} fill={RED} fontSize="11" textAnchor="end">ground roll ≈ {spec.groundRollFt.toLocaleString()} ft</text>
              {/* total read-off */}
              <line x1={V.total[0]} y1={V.total[1]} x2={X1} y2={V.total[1]} stroke={RED} strokeWidth="1.3" strokeDasharray="4 4" opacity="0.8" />
              {steps.map(({ p, n }) => (
                <g key={n}>
                  <circle cx={p[0]} cy={p[1]} r="8.5" fill="#000" stroke={RED} strokeWidth="1.4" />
                  <text x={p[0]} y={p[1] + 3.2} {...halo} fill={RED} fontSize="9.5" textAnchor="middle">{n}</text>
                </g>
              ))}
              <text x={X1 - 4} y={V.total[1] - 8} {...halo} fill={RED} fontSize="12" fontWeight="bold" textAnchor="end">
                {spec.readout}
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="text-[10px] text-zinc-600 mt-1 px-1">
        CAP 698 {spec.variant === "takeoff" ? "Fig 2.1 Take-off" : "Fig 2.4 Landing"} distance method — enter OAT → up to the
        pressure-altitude curve → parallel the mass, wind and obstacle grids. Confirm the exact read on your own CAP 698.
      </div>
    </div>
  );
}
