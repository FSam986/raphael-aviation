"use client";

import { useState } from "react";

// Original, data-driven performance graph: real grid, axis values, labelled
// curves and a worked red plot path. NOT a copy of the CAP 697/698 artwork —
// it is rebuilt from representative performance data so the student can read
// and plot on screen, then confirm the exact figure on their own CAP manual.

export interface GraphAxis {
  label: string;
  min: number;
  max: number;
  step: number;
}
export interface GraphCurve {
  label: string; // e.g. "3 000 ft"
  pts: [number, number][]; // data coords, left→right
}
export interface GraphSpec {
  x: GraphAxis;
  y: GraphAxis;
  curves: GraphCurve[];
  // red worked path in data coords, in plotting order; last point is the read-off
  red?: [number, number][];
  readout?: string; // label near the final point
}

const RED = "#f87171";
const AX = "#d4d4d8";
const GRID_MAJOR = "#52525b"; // visible major gridlines
const GRID_MINOR = "#2a2a30"; // faint minor gridlines (graph-paper look)
const CURVE = "#60a5fa";

// SVG geometry
const W = 660;
const H = 440;
const M = { t: 20, r: 90, b: 56, l: 68 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;

function ticks(a: GraphAxis): number[] {
  const out: number[] = [];
  for (let v = a.min; v <= a.max + 1e-9; v += a.step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}
// minor gridlines at half the major step, for a graph-paper look
function minorTicks(a: GraphAxis): number[] {
  const out: number[] = [];
  const s = a.step / 2;
  for (let v = a.min; v <= a.max + 1e-9; v += s) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}

export function GraphPlot({ spec, reveal }: { spec: GraphSpec; reveal: boolean }) {
  const [zoom, setZoom] = useState(1);

  const sx = (v: number) => M.l + ((v - spec.x.min) / (spec.x.max - spec.x.min)) * PW;
  const sy = (v: number) => M.t + (1 - (v - spec.y.min) / (spec.y.max - spec.y.min)) * PH;
  const path = (pts: [number, number][]) =>
    pts.map(([x, y], i) => `${i ? "L" : "M"} ${sx(x)} ${sy(y)}`).join(" ");

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1" />
        <span className="text-[10px] text-zinc-600">zoom</span>
        <button onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-zinc-900 text-zinc-300 text-sm">−</button>
        <span className="text-[10px] text-zinc-500 w-8 text-center">{zoom}×</span>
        <button onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-zinc-900 text-zinc-300 text-sm">+</button>
      </div>

      <div className="overflow-auto rounded-lg border border-zinc-900" style={{ maxHeight: 460 }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W * zoom}
          height={H * zoom}
          className="block bg-zinc-950"
        >
          {/* minor gridlines (graph paper) */}
          {minorTicks(spec.x).map((v) => (
            <line key={`xm${v}`} x1={sx(v)} y1={M.t} x2={sx(v)} y2={M.t + PH} stroke={GRID_MINOR} strokeWidth="0.5" />
          ))}
          {minorTicks(spec.y).map((v) => (
            <line key={`ym${v}`} x1={M.l} y1={sy(v)} x2={M.l + PW} y2={sy(v)} stroke={GRID_MINOR} strokeWidth="0.5" />
          ))}
          {/* major gridlines + tick values on both axes */}
          {ticks(spec.x).map((v) => (
            <g key={`x${v}`}>
              <line x1={sx(v)} y1={M.t} x2={sx(v)} y2={M.t + PH} stroke={GRID_MAJOR} strokeWidth="0.9" />
              <line x1={sx(v)} y1={M.t + PH} x2={sx(v)} y2={M.t + PH + 5} stroke={AX} strokeWidth="1" />
              <text x={sx(v)} y={M.t + PH + 17} fill={AX} fontSize="11.5" textAnchor="middle">{v}</text>
            </g>
          ))}
          {ticks(spec.y).map((v) => (
            <g key={`y${v}`}>
              <line x1={M.l} y1={sy(v)} x2={M.l + PW} y2={sy(v)} stroke={GRID_MAJOR} strokeWidth="0.9" />
              <line x1={M.l - 5} y1={sy(v)} x2={M.l} y2={sy(v)} stroke={AX} strokeWidth="1" />
              <text x={M.l - 9} y={sy(v) + 4} fill={AX} fontSize="11.5" textAnchor="end">{v}</text>
            </g>
          ))}

          {/* axes */}
          <line x1={M.l} y1={M.t} x2={M.l} y2={M.t + PH} stroke={AX} strokeWidth="1.5" />
          <line x1={M.l} y1={M.t + PH} x2={M.l + PW} y2={M.t + PH} stroke={AX} strokeWidth="1.5" />
          <text x={M.l + PW / 2} y={H - 8} fill={AX} fontSize="12" textAnchor="middle">{spec.x.label}</text>
          <text x={16} y={M.t + PH / 2} fill={AX} fontSize="12" textAnchor="middle" transform={`rotate(-90 16 ${M.t + PH / 2})`}>{spec.y.label}</text>

          {/* curve family */}
          {spec.curves.map((c) => {
            const last = c.pts[c.pts.length - 1];
            return (
              <g key={c.label}>
                <path d={path(c.pts)} fill="none" stroke={CURVE} strokeWidth="1.75" />
                <text x={sx(last[0]) + 4} y={sy(last[1]) + 3} fill={CURVE} fontSize="10">{c.label}</text>
              </g>
            );
          })}

          {/* red worked path with dashed reference/guide lines to the axes */}
          {reveal && spec.red && (
            <g>
              {/* dashed projection lines from the entry and read-off points to both axes */}
              {[spec.red[0], spec.red[spec.red.length - 1]].map(([x, y], i) => (
                <g key={`guide${i}`}>
                  <line x1={sx(x)} y1={sy(y)} x2={sx(x)} y2={M.t + PH} stroke={RED} strokeWidth="1" strokeDasharray="4 3" opacity="0.7" />
                  <line x1={sx(x)} y1={sy(y)} x2={M.l} y2={sy(y)} stroke={RED} strokeWidth="1" strokeDasharray="4 3" opacity="0.7" />
                </g>
              ))}
              <path d={path(spec.red)} fill="none" stroke={RED} strokeWidth="2.5" />
              {spec.red.map(([x, y], i) => (
                <g key={i}>
                  <circle cx={sx(x)} cy={sy(y)} r="9" fill="#000" stroke={RED} strokeWidth="1.5" />
                  <text x={sx(x)} y={sy(y) + 3.5} fill={RED} fontSize="10" textAnchor="middle">{i + 1}</text>
                </g>
              ))}
              {spec.readout && (
                <text x={sx(spec.red[spec.red.length - 1][0]) + 6} y={sy(spec.red[spec.red.length - 1][1]) - 8} fill={RED} fontSize="11" fontWeight="bold">{spec.readout}</text>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="text-[10px] text-zinc-600 mt-1 px-1">
        Gridded teaching replica with real axis values. Tap "Show plotted solution" for the red reference lines. Confirm the exact figure on your CAP 696/697/698 manual.
      </div>
    </div>
  );
}
