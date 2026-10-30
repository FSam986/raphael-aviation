"use client";

import { useState } from "react";

// Gridded performance-graph with a reveal-gated worked solution line. The axis
// SCALES are factual (from the manual); the guide curves are drawn as clearly
// ILLUSTRATIVE shapes (dashed, labelled) — not a reproduction of the Crown-
// copyright CAP artwork — so the student reads the exact figures on their own CAP
// manual. On "Show solution" the worked path is drawn: enter at the value → up to
// the curve → read across to the answer axis, landing on the verified answer.

export interface GraphAxis { label: string; min: number; max: number; step: number }
export interface GraphCurve { label: string; pts: [number, number][] }
export interface GraphSpec {
  x: GraphAxis;
  y: GraphAxis;
  curves: GraphCurve[];
  red?: [number, number][]; // worked path in data coords, plotting order; last = read-off
  readout?: string;
}

const RED = "#f87171";
const AX = "#d4d4d8";
const GRID_MAJOR = "#6b6b76";
const GRID_MINOR = "#3a3a42";
const CURVE = "#5a7fb0"; // muted = clearly illustrative
const halo = { stroke: "#09090b", strokeWidth: 3, strokeLinejoin: "round" as const, style: { paintOrder: "stroke" as const } };

const W = 680, H = 450, M = { t: 22, r: 96, b: 58, l: 72 };
const PW = W - M.l - M.r, PH = H - M.t - M.b;

function ticks(a: GraphAxis) { const o: number[] = []; for (let v = a.min; v <= a.max + 1e-9; v += a.step) o.push(Math.round(v * 1e6) / 1e6); return o; }
function minor(a: GraphAxis) { const o: number[] = []; for (let v = a.min; v <= a.max + 1e-9; v += a.step / 2) o.push(v); return o; }

export function GraphSolve({ spec, reveal, figure }: { spec: GraphSpec; reveal: boolean; figure?: string }) {
  const [zoom, setZoom] = useState(1);
  const sx = (v: number) => M.l + ((v - spec.x.min) / (spec.x.max - spec.x.min)) * PW;
  const sy = (v: number) => M.t + (1 - (v - spec.y.min) / (spec.y.max - spec.y.min)) * PH;
  const path = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"} ${sx(x)} ${sy(y)}`).join(" ");
  const red = spec.red ?? [];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">Graph</span>
        {figure && <span className="text-[10px] text-zinc-500 truncate">{figure}</span>}
        <div className="flex-1" />
        <button onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-zinc-900 text-zinc-300 text-sm">−</button>
        <span className="text-[10px] text-zinc-500 w-8 text-center">{zoom}×</span>
        <button onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-zinc-900 text-zinc-300 text-sm">+</button>
      </div>

      <div className="overflow-auto rounded-lg border border-zinc-900" style={{ maxHeight: 540 }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="block bg-zinc-950"
          style={zoom === 1 ? { width: "100%", height: "auto" } : { width: W * zoom, height: H * zoom }}>
          {/* minor + major grid */}
          {minor(spec.x).map((v) => <line key={`xm${v}`} x1={sx(v)} y1={M.t} x2={sx(v)} y2={M.t + PH} stroke={GRID_MINOR} strokeWidth="0.8" />)}
          {minor(spec.y).map((v) => <line key={`ym${v}`} x1={M.l} y1={sy(v)} x2={M.l + PW} y2={sy(v)} stroke={GRID_MINOR} strokeWidth="0.8" />)}
          {ticks(spec.x).map((v) => (
            <g key={`x${v}`}>
              <line x1={sx(v)} y1={M.t} x2={sx(v)} y2={M.t + PH} stroke={GRID_MAJOR} strokeWidth="1.2" />
              <text x={sx(v)} y={M.t + PH + 17} {...halo} fill={AX} fontSize="12" textAnchor="middle">{v}</text>
            </g>
          ))}
          {ticks(spec.y).map((v) => (
            <g key={`y${v}`}>
              <line x1={M.l} y1={sy(v)} x2={M.l + PW} y2={sy(v)} stroke={GRID_MAJOR} strokeWidth="1.2" />
              <text x={M.l - 9} y={sy(v) + 4} {...halo} fill={AX} fontSize="12" textAnchor="end">{v}</text>
            </g>
          ))}
          <line x1={M.l} y1={M.t} x2={M.l} y2={M.t + PH} stroke={AX} strokeWidth="1.5" />
          <line x1={M.l} y1={M.t + PH} x2={M.l + PW} y2={M.t + PH} stroke={AX} strokeWidth="1.5" />
          <text x={M.l + PW / 2} y={H - 8} {...halo} fill={AX} fontSize="12.5" textAnchor="middle">{spec.x.label}</text>
          <text x={16} y={M.t + PH / 2} {...halo} fill={AX} fontSize="12.5" textAnchor="middle" transform={`rotate(-90 16 ${M.t + PH / 2})`}>{spec.y.label}</text>

          {/* illustrative guide curves (dashed) */}
          {spec.curves.map((c) => {
            const last = c.pts[c.pts.length - 1];
            return (
              <g key={c.label}>
                <path d={path(c.pts)} fill="none" stroke={CURVE} strokeWidth="1.6" strokeDasharray="5 4" />
                <text x={sx(last[0]) + 4} y={sy(last[1]) + 3} {...halo} fill={CURVE} fontSize="11">{c.label}</text>
              </g>
            );
          })}
          <text x={M.l + PW - 4} y={M.t + 12} {...halo} fill={CURVE} fontSize="9" textAnchor="end">guide curves — illustrative; read exact values on your CAP manual</text>

          {/* worked solution (reveal only) */}
          {reveal && red.length > 0 && (
            <g>
              {[red[0], red[red.length - 1]].map(([x, y], i) => (
                <g key={`g${i}`}>
                  <line x1={sx(x)} y1={sy(y)} x2={sx(x)} y2={M.t + PH} stroke={RED} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                  <line x1={sx(x)} y1={sy(y)} x2={M.l} y2={sy(y)} stroke={RED} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                </g>
              ))}
              <path d={path(red)} fill="none" stroke={RED} strokeWidth="2.6" />
              {red.map(([x, y], i) => (
                <g key={i}>
                  <circle cx={sx(x)} cy={sy(y)} r="9" fill="#000" stroke={RED} strokeWidth="1.5" />
                  <text x={sx(x)} y={sy(y) + 3.4} {...halo} fill={RED} fontSize="10" textAnchor="middle">{i + 1}</text>
                </g>
              ))}
              {spec.readout && (
                <text x={sx(red[red.length - 1][0]) + 8} y={sy(red[red.length - 1][1]) - 9} {...halo} fill={RED} fontSize="12" fontWeight="bold">{spec.readout}</text>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="text-[10px] text-zinc-600 mt-1 px-1">
        {reveal ? "Worked line: ① enter with your value → ② up to the curve → ③ read the answer." : "Attempt it, then press Show solution to see the worked line."} Confirm exact figures on your CAP 697/698{figure ? ` (${figure})` : ""}.
      </div>
    </div>
  );
}
