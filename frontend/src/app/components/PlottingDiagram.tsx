"use client";

import type { PlotDiagram } from "@/app/data/fpp-plotting";

// Clean teaching schematic of the performance-graph plotting METHOD. These are
// NOT the CAP 697/698 graphs (Crown-copyright) and NOT question-specific value
// graphs — several of these questions are table look-ups or factor calculations.
// The schematic shows HOW the chain is plotted; the exact values are read on the
// student's own CAP manual (allowed in the exam). `reveal` shows the worked path.

const RED = "#ef4444";
const AX = "#a1a1aa"; // axes
const GRIDMAJ = "#4a4a53"; // visible major grid
const GRIDMIN = "#2f2f37"; // faint graph-paper minor grid
const CURVE = "#60a5fa"; // family / guide curves
const LBL = "#d4d4d8"; // labels
// Dark halo behind labels so they stay readable over any line.
const halo = { stroke: "#09090b", strokeWidth: 3, strokeLinejoin: "round" as const, style: { paintOrder: "stroke" as const } };

// Reusable graph-paper grid inside a rect (x..x+w, y..y+h).
function GraphPaper({ x, y, w, h, nx, ny }: { x: number; y: number; w: number; h: number; nx: number; ny: number }) {
  const lines: React.ReactElement[] = [];
  for (let i = 0; i <= nx; i++) {
    const gx = x + (w * i) / nx;
    lines.push(<line key={`v${i}`} x1={gx} y1={y} x2={gx} y2={y + h} stroke={i % 2 ? GRIDMIN : GRIDMAJ} strokeWidth={i % 2 ? 0.6 : 0.9} />);
  }
  for (let j = 0; j <= ny; j++) {
    const gy = y + (h * j) / ny;
    lines.push(<line key={`h${j}`} x1={x} y1={gy} x2={x + w} y2={gy} stroke={j % 2 ? GRIDMIN : GRIDMAJ} strokeWidth={j % 2 ? 0.6 : 0.9} />);
  }
  return <g>{lines}</g>;
}

function Carpet({ reveal }: { reveal: boolean }) {
  // 4-zone carpet method: OAT/altitude → mass → wind → distance read-off.
  const X0 = 48, X1 = 600, Y0 = 24, Y1 = 276;
  const zones = [X0, 186, 324, 462, X1];
  const zoneNames = ["OAT / Press. alt", "Mass", "Wind", "Obstacle / dist"];
  return (
    <svg viewBox="0 0 640 340" preserveAspectRatio="xMidYMid meet" className="block w-full">
      <GraphPaper x={X0} y={Y0} w={X1 - X0} h={Y1 - Y0} nx={32} ny={16} />
      <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="none" stroke={AX} strokeWidth="1.4" />
      {/* zone reference lines */}
      {zones.slice(1, -1).map((x) => (
        <line key={x} x1={x} y1={Y0} x2={x} y2={Y1} stroke={LBL} strokeWidth="1.3" strokeDasharray="4 3" />
      ))}
      {/* zone 1: pressure-altitude family (rising diagonals) */}
      {[0, 1, 2, 3].map((i) => (
        <line key={`a${i}`} x1={X0} y1={Y1 - 10 - i * 52} x2={zones[1]} y2={Y1 - 56 - i * 52} stroke={CURVE} strokeWidth="1.3" opacity="0.9" />
      ))}
      {/* zone 2: mass fan (curving down-right) */}
      {[0, 1, 2].map((i) => (
        <path key={`m${i}`} d={`M ${zones[1]} ${Y0 + 46 + i * 28} Q ${(zones[1] + zones[2]) / 2} ${Y0 + 120 + i * 24} ${zones[2]} ${Y0 + 170 + i * 24}`} fill="none" stroke={CURVE} strokeWidth="1.2" opacity="0.85" />
      ))}
      {/* zone 3: wind guides */}
      {[0, 1].map((i) => (
        <line key={`w${i}`} x1={zones[2]} y1={Y0 + 96 + i * 56} x2={zones[3]} y2={Y0 + 150 + i * 48} stroke={CURVE} strokeWidth="1.2" opacity="0.85" />
      ))}
      {/* zone 4: obstacle guides */}
      {[0, 1].map((i) => (
        <line key={`o${i}`} x1={zones[3]} y1={Y0 + 110 + i * 48} x2={X1} y2={Y0 + 90 + i * 48} stroke={CURVE} strokeWidth="1.2" opacity="0.85" />
      ))}
      {/* zone labels */}
      {zoneNames.map((n, i) => (
        <text key={n} x={(zones[i] + zones[i + 1]) / 2} y={Y1 + 22} {...halo} fill={LBL} fontSize="12" textAnchor="middle">{n}</text>
      ))}
      <text x={X0 + 6} y={Y0 + 14} {...halo} fill={LBL} fontSize="10">enter here →</text>
      <text x={X1 - 6} y={Y0 + 14} {...halo} fill={LBL} fontSize="10" textAnchor="end">→ read distance</text>

      {reveal && (
        <g stroke={RED} strokeWidth="2.6" fill="none">
          <line x1="92" y1={Y1} x2="92" y2="190" />
          <line x1="92" y1="190" x2={zones[1]} y2="190" />
          <path d={`M ${zones[1]} 190 Q ${(zones[1] + zones[2]) / 2} 220 ${zones[2]} 232`} />
          <line x1={zones[2]} y1="232" x2={zones[3]} y2="250" />
          <line x1={zones[3]} y1="250" x2={X1} y2="240" />
          <line x1={X1} y1="240" x2={X1} y2={Y1} strokeDasharray="4 3" />
          {[[92, Y1], [92, 190], [zones[1], 190], [zones[2], 232], [zones[3], 250], [X1, 240]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="9" fill="#000" stroke={RED} />
              <text x={cx} y={cy + 3.5} {...halo} fill={RED} fontSize="10" textAnchor="middle">{i + 1}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

function Curve({ reveal }: { reveal: boolean }) {
  // single input → curve → output look-up.
  const X0 = 64, X1 = 600, Y0 = 26, Y1 = 276;
  return (
    <svg viewBox="0 0 640 340" preserveAspectRatio="xMidYMid meet" className="block w-full">
      <GraphPaper x={X0} y={Y0} w={X1 - X0} h={Y1 - Y0} nx={28} ny={14} />
      <line x1={X0} y1={Y1} x2={X1} y2={Y1} stroke={AX} strokeWidth="1.5" />
      <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={AX} strokeWidth="1.5" />
      {/* representative performance curve + a second family member */}
      <path d={`M ${X0 + 20} ${Y0 + 40} Q 300 ${Y0 + 70} ${X1 - 10} ${Y1 - 30}`} fill="none" stroke={CURVE} strokeWidth="2" />
      <path d={`M ${X0 + 20} ${Y0 + 90} Q 300 ${Y0 + 120} ${X1 - 10} ${Y1 - 70}`} fill="none" stroke={CURVE} strokeWidth="1.6" opacity="0.7" />
      <text x={(X0 + X1) / 2} y={Y1 + 30} {...halo} fill={LBL} fontSize="12" textAnchor="middle">Input (altitude / temperature / mass / power)</text>
      <text x={24} y={(Y0 + Y1) / 2} {...halo} fill={LBL} fontSize="12" textAnchor="middle" transform={`rotate(-90 24 ${(Y0 + Y1) / 2})`}>Output (RoC / fuel / distance / speed)</text>

      {reveal && (
        <g stroke={RED} strokeWidth="2.6" fill="none">
          <line x1="320" y1={Y1} x2="320" y2="156" />
          <line x1="320" y1="156" x2={X0} y2="156" />
          {[[320, Y1], [320, 156], [X0, 156]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="9" fill="#000" stroke={RED} />
              <text x={cx} y={cy + 3.5} {...halo} fill={RED} fontSize="10" textAnchor="middle">{i + 1}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

export function PlottingDiagram({ type, reveal }: { type: PlotDiagram; reveal: boolean }) {
  const isCarpet = type === "takeoff" || type === "landing";
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
      {isCarpet ? <Carpet reveal={reveal} /> : <Curve reveal={reveal} />}
      <div className="text-[10px] text-zinc-600 mt-1 px-1">
        Illustrates the plotting method — this question is read (or calculated) on the actual CAP 697/698 figure/table. Use your CAP manual for the exact values.
      </div>
    </div>
  );
}
