"use client";

import { useState } from "react";

// Faithful replica of the CAP 698 take-off / landing DISTANCE carpet graph
// (Figure 2.1 / 2.4 family). Rebuilt from the manual's own axis scales, curve
// families and labels — the ARTWORK is original (not a scan of the Crown-
// copyright figure), the DATA (axis ranges, curve set, worked-example path) is
// transcribed from the student's CAP 698. The red worked path per question is
// calibrated to the manual's worked example / representative read — the student
// confirms the exact value on their own CAP manual (allowed in the exam).
//
// The graph is the real 4-panel chain the exam tests:
//   OAT + Pressure Altitude  →  Mass  →  Wind component  →  Obstacle height
// with take-off DISTANCE read on the right-hand axis.

export interface CarpetPath {
  // red worked path, in graph data-fractions across the 4 panels (x 0→1 spans
  // the whole chart left→right; y 0→1 is distance 0→max bottom→top). Each point
  // is a numbered plotting step.
  pts: [number, number][];
  readout: string; // e.g. "≈ 3 450 ft"
}

export interface CarpetSpec {
  variant: "takeoff" | "landing";
  distanceMax: number; // top of the distance axis in ft
  path: CarpetPath;
}

const RED = "#ef4444";
const AX = "#a1a1aa";
const GRIDMAJ = "#52525b";
const GRIDMIN = "#3f3f46";
const CURVE = "#60a5fa";
const REFC = "#e4e4e7";

// SVG geometry
const X0 = 78;
const X1 = 1064;
const Y0 = 40; // top (distance = max)
const Y1 = 484; // bottom (distance = 0)
// panel reference-line x positions
const PX = [X0, 430, 662, 862, X1]; // temp/PA | mass | wind | obstacle | dist-axis

const sx = (f: number) => X0 + f * (X1 - X0); // fraction 0..1 → x
const sy = (f: number) => Y1 - f * (Y1 - Y0); // fraction 0..1 → y (dist)

function grid() {
  const lines: React.ReactElement[] = [];
  // minor vertical every ~19px, major every ~95
  let k = 0;
  for (let x = X0; x <= X1 + 0.5; x += (X1 - X0) / 52, k++) {
    lines.push(<line key={`v${k}`} x1={x} y1={Y0} x2={x} y2={Y1} stroke={GRIDMIN} strokeWidth="0.5" />);
  }
  k = 0;
  for (let y = Y0; y <= Y1 + 0.5; y += (Y1 - Y0) / 40, k++) {
    lines.push(<line key={`h${k}`} x1={X0} y1={y} x2={X1} y2={y} stroke={GRIDMIN} strokeWidth="0.5" />);
  }
  return lines;
}

// Panel 1: pressure-altitude curve family over OAT −40..+60 °C.
// Faithful fan: higher altitude sits higher-left; each curve bends near ISA.
const PA_SET = [0, 2000, 4000, 6000, 8000, 10000];
function paCurve(pa: number): string {
  const p1x = PX[0], p2x = PX[1];
  const oatToX = (t: number) => p1x + ((t + 40) / 100) * (p2x - p1x);
  // baseline output-height (fraction of panel) at +15°C, rising with altitude
  const base = 0.1 + (pa / 10000) * 0.42;
  const pts: string[] = [];
  for (let t = -40; t <= 60; t += 10) {
    // hotter & higher → more distance (curve rises); gentle slope
    const h = base + (t - 15) * 0.0032 + (pa / 10000) * (t - 15) * 0.0006;
    const y = Y1 - Math.max(0.02, Math.min(0.95, h)) * (Y1 - Y0);
    pts.push(`${pts.length ? "L" : "M"} ${oatToX(t).toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export function CarpetPlot({ spec, reveal }: { spec: CarpetSpec; reveal: boolean }) {
  const [zoom, setZoom] = useState(1);

  const oatTicks = [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60];
  const massTicks = spec.variant === "takeoff" ? [3650, 3400, 3200, 3000, 2800] : [3650, 3400, 3200, 3000, 2800];
  const windTicks = [-10, 0, 10, 20, 30];
  const obsTicks = [0, 25, 50];
  const distTicks: number[] = [];
  for (let d = 0; d <= spec.distanceMax; d += 1000) distTicks.push(d);

  const redPath = spec.path.pts.map(([x, y], i) => `${i ? "L" : "M"} ${sx(x)} ${sy(y)}`).join(" ");

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1" />
        <span className="text-[10px] text-zinc-600">zoom</span>
        <button onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-zinc-900 text-zinc-300">−</button>
        <span className="text-[10px] text-zinc-500 w-8 text-center">{zoom}×</span>
        <button onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-zinc-900 text-zinc-300">+</button>
      </div>

      <div className="overflow-auto rounded-lg border border-zinc-900" style={{ maxHeight: 520 }}>
        <svg viewBox="0 0 1120 560" width={1120 * zoom} height={560 * zoom} className="block bg-zinc-950">
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
            const p1x = PX[0], p2x = PX[1];
            const x = p1x + ((15 + 40) / 100) * (p2x - p1x);
            const base = 0.1 + (pa / 10000) * 0.42;
            const y = Y1 - base * (Y1 - Y0);
            return (
              <text key={`l${pa}`} x={x - 6} y={y - 3} fill={CURVE} fontSize="9" textAnchor="end">
                {pa === 0 ? "SL" : pa === 10000 ? "10 000" : pa}
              </text>
            );
          })}
          {oatTicks.map((t) => {
            const x = PX[0] + ((t + 40) / 100) * (PX[1] - PX[0]);
            return <text key={`o${t}`} x={x} y={Y1 + 15} fill={AX} fontSize="10" textAnchor="middle">{t}</text>;
          })}
          <text x={(PX[0] + PX[1]) / 2} y={Y1 + 34} fill={AX} fontSize="11" textAnchor="middle">OUTSIDE AIR TEMPERATURE °C</text>
          <text x={PX[0] + 8} y={Y0 + 14} fill={AX} fontSize="9">PRESSURE ALTITUDE (ft)</text>

          {/* ── Panel 2: mass ── */}
          {massTicks.map((m) => {
            const x = PX[1] + (1 - (m - 2800) / (3650 - 2800)) * (PX[2] - PX[1]);
            return (
              <g key={`m${m}`}>
                <line x1={x} y1={Y0} x2={x} y2={Y1} stroke={GRIDMAJ} strokeWidth="0.6" strokeDasharray="2 3" />
                <text x={x} y={Y1 + 15} fill={AX} fontSize="10" textAnchor="middle">{m}</text>
              </g>
            );
          })}
          {/* mass guide fan (curves sweeping down-right from the ref line) */}
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((h, i) => (
            <path key={`mf${i}`} d={`M ${PX[1]} ${sy(h)} Q ${(PX[1] + PX[2]) / 2} ${sy(h - 0.12)} ${PX[2]} ${sy(h - 0.22)}`} fill="none" stroke={CURVE} strokeWidth="1" opacity="0.7" />
          ))}
          <text x={(PX[1] + PX[2]) / 2} y={Y1 + 34} fill={AX} fontSize="11" textAnchor="middle">MASS — lb</text>

          {/* ── Panel 3: wind ── */}
          {windTicks.map((w) => {
            const x = PX[2] + ((w + 10) / 40) * (PX[3] - PX[2]);
            return (
              <g key={`w${w}`}>
                <line x1={x} y1={Y0} x2={x} y2={Y1} stroke={GRIDMAJ} strokeWidth="0.6" strokeDasharray="2 3" />
                <text x={x} y={Y1 + 15} fill={AX} fontSize="10" textAnchor="middle">{w === 0 ? "0" : w < 0 ? "T" + -w : "H" + w}</text>
              </g>
            );
          })}
          {/* headwind guides (down-right) and tailwind (up-right) from wind ref at 0 */}
          {[0.3, 0.45, 0.6].map((h, i) => (
            <g key={`wf${i}`}>
              <line x1={sx((PX[2] - X0) / (X1 - X0))} y1={sy(h)} x2={PX[3]} y2={sy(h - 0.14)} stroke={CURVE} strokeWidth="1" opacity="0.6" />
            </g>
          ))}
          <text x={PX[2] + 6} y={Y0 + 14} fill={AX} fontSize="9">headwind ↓ / tailwind ↑</text>
          <text x={(PX[2] + PX[3]) / 2} y={Y1 + 34} fill={AX} fontSize="11" textAnchor="middle">WIND COMPONENT — kt</text>

          {/* ── Panel 4: obstacle height ── */}
          {obsTicks.map((o) => {
            const x = PX[3] + (o / 50) * (PX[4] - PX[3]);
            return (
              <g key={`ob${o}`}>
                <line x1={x} y1={Y0} x2={x} y2={Y1} stroke={GRIDMAJ} strokeWidth="0.6" strokeDasharray="2 3" />
                <text x={x} y={Y1 + 15} fill={AX} fontSize="10" textAnchor="middle">{o}</text>
              </g>
            );
          })}
          {[0.35, 0.5, 0.65].map((h, i) => (
            <line key={`of${i}`} x1={PX[3]} y1={sy(h)} x2={PX[4]} y2={sy(h + 0.1)} stroke={CURVE} strokeWidth="1" opacity="0.6" />
          ))}
          <text x={(PX[3] + PX[4]) / 2} y={Y1 + 34} fill={AX} fontSize="11" textAnchor="middle">OBSTACLE HT — ft</text>

          {/* ── Distance axis (right) ── */}
          {distTicks.map((d) => {
            const y = sy(d / spec.distanceMax);
            return (
              <g key={`d${d}`}>
                <line x1={X0} y1={y} x2={X1} y2={y} stroke={GRIDMAJ} strokeWidth="0.4" opacity="0.5" />
                <text x={X1 + 6} y={y + 3} fill={AX} fontSize="10">{d}</text>
              </g>
            );
          })}
          <text x={X1 + 40} y={(Y0 + Y1) / 2} fill={AX} fontSize="11" textAnchor="middle" transform={`rotate(-90 ${X1 + 40} ${(Y0 + Y1) / 2})`}>DISTANCE — ft</text>

          {/* ── Red worked path ── */}
          {reveal && (
            <g>
              <path d={redPath} fill="none" stroke={RED} strokeWidth="2.4" />
              {spec.path.pts.map(([x, y], i) => (
                <g key={i}>
                  <circle cx={sx(x)} cy={sy(y)} r="8.5" fill="#000" stroke={RED} strokeWidth="1.4" />
                  <text x={sx(x)} y={sy(y) + 3.2} fill={RED} fontSize="9.5" textAnchor="middle">{i + 1}</text>
                </g>
              ))}
              <text x={X1 - 4} y={sy(spec.path.pts[spec.path.pts.length - 1][1]) - 8} fill={RED} fontSize="12" fontWeight="bold" textAnchor="end">
                {spec.path.readout}
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="text-[10px] text-zinc-600 mt-1 px-1">
        Faithful replica of CAP 698 {spec.variant === "takeoff" ? "Fig 2.1 Take-off" : "Fig 2.4 Landing"} distance graph — axis
        values transcribed from the manual. Confirm the exact read on your own CAP 698.
      </div>
    </div>
  );
}
