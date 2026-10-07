"use client";

import type { PlotDiagram } from "@/app/data/fpp-plotting";

// ORIGINAL, generic teaching schematics of the performance-graph plotting
// TECHNIQUE. These are NOT the CAP 697/698 graphs (which are Crown-copyright)
// — they are simplified illustrations of the method. Actual values are read on
// the student's own CAP manual. `reveal` shows the red worked path.

const RED = "#ef4444";
const AX = "#71717a"; // zinc-500 axes
const GRID = "#3f3f46"; // zinc-700 faint lines
const LBL = "#a1a1aa"; // zinc-400 labels

function Carpet({ reveal }: { reveal: boolean }) {
  // Zones: OAT/altitude | mass | wind | distance readout
  return (
    <svg viewBox="0 0 640 360" className="w-full">
      <rect x="40" y="20" width="560" height="280" fill="none" stroke={AX} strokeWidth="1.5" />
      {/* zone reference lines */}
      {[210, 360, 490].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="300" stroke={AX} strokeWidth="1.5" strokeDasharray="2 3" />
      ))}
      {/* zone 1: pressure-altitude family (rising diagonals) */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="40" y1={280 - i * 55} x2="210" y2={230 - i * 55} stroke={GRID} strokeWidth="1" />
      ))}
      {/* zone 2: mass fan (curving down to the right) */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M 210 ${70 + i * 30} Q 300 ${150 + i * 25} 360 ${210 + i * 25}`} fill="none" stroke={GRID} strokeWidth="1" />
      ))}
      {/* zone 3: wind guides */}
      {[0, 1].map((i) => (
        <line key={i} x1="360" y1={120 + i * 60} x2="490" y2={180 + i * 50} stroke={GRID} strokeWidth="1" />
      ))}
      {/* axis labels */}
      <text x="125" y="325" fill={LBL} fontSize="12" textAnchor="middle">OAT / Pressure altitude</text>
      <text x="285" y="325" fill={LBL} fontSize="12" textAnchor="middle">Mass</text>
      <text x="425" y="325" fill={LBL} fontSize="12" textAnchor="middle">Wind</text>
      <text x="545" y="325" fill={LBL} fontSize="12" textAnchor="middle">Distance</text>
      <text x="30" y="160" fill={LBL} fontSize="11" textAnchor="middle" transform="rotate(-90 30 160)">Reference lines →</text>

      {/* RED worked path */}
      {reveal && (
        <g stroke={RED} strokeWidth="2.5" fill="none">
          {/* 1: up from OAT to PA line */}
          <line x1="95" y1="300" x2="95" y2="205" />
          {/* 2: right to first reference */}
          <line x1="95" y1="205" x2="210" y2="205" />
          {/* 3: down the mass fan to next reference */}
          <path d="M 210 205 Q 290 235 360 250" />
          {/* 4: along wind guide */}
          <line x1="360" y1="250" x2="490" y2="270" />
          {/* 5: down to distance axis */}
          <line x1="490" y1="270" x2="490" y2="300" />
          {[
            [95, 300],
            [95, 205],
            [210, 205],
            [360, 250],
            [490, 270],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="9" fill="#000" stroke={RED} />
              <text x={cx} y={cy + 3.5} fill={RED} fontSize="10" textAnchor="middle" strokeWidth="0">
                {i + 1}
              </text>
            </g>
          ))}
          <text x="500" y="295" fill={RED} fontSize="11" strokeWidth="0">read distance</text>
        </g>
      )}
    </svg>
  );
}

function Curve({ reveal }: { reveal: boolean }) {
  // simple x→curve→y lookup schematic (climb / cruise)
  return (
    <svg viewBox="0 0 640 360" className="w-full">
      {/* axes */}
      <line x1="70" y1="300" x2="600" y2="300" stroke={AX} strokeWidth="1.5" />
      <line x1="70" y1="300" x2="70" y2="30" stroke={AX} strokeWidth="1.5" />
      {/* grid */}
      {[120, 220, 320, 420, 520].map((x) => (
        <line key={x} x1={x} y1="300" x2={x} y2="34" stroke={GRID} strokeWidth="0.75" />
      ))}
      {[240, 170, 100].map((y) => (
        <line key={y} x1="70" y1={y} x2="600" y2={y} stroke={GRID} strokeWidth="0.75" />
      ))}
      {/* performance curve */}
      <path d="M 90 90 Q 300 120 590 250" fill="none" stroke={LBL} strokeWidth="1.75" />
      <text x="335" y="330" fill={LBL} fontSize="12" textAnchor="middle">Input (altitude / temperature / power)</text>
      <text x="40" y="170" fill={LBL} fontSize="12" textAnchor="middle" transform="rotate(-90 40 170)">Output (RoC / range / endurance)</text>

      {reveal && (
        <g stroke={RED} strokeWidth="2.5" fill="none">
          <line x1="320" y1="300" x2="320" y2="163" />
          <line x1="320" y1="163" x2="70" y2="163" />
          {[
            [320, 300],
            [320, 163],
            [70, 163],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="9" fill="#000" stroke={RED} />
              <text x={cx} y={cy + 3.5} fill={RED} fontSize="10" textAnchor="middle" strokeWidth="0">
                {i + 1}
              </text>
            </g>
          ))}
          <text x="80" y="155" fill={RED} fontSize="11" strokeWidth="0">read value</text>
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
        Illustrative method only — plot the actual values on your CAP 697/698 manual.
      </div>
    </div>
  );
}
