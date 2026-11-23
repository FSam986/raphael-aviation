"use client";

// Pass Mode as a flight: departure → one waypoint per plan day → EXAM airport.
// Flown legs are solid gold, the aircraft sits at today, future legs dashed.
// Small checkpoint dots around each waypoint are that day's topics, lit when
// the topic is strong (≥90%). Tap a waypoint for that day's briefing.

import { useState } from "react";
import Link from "next/link";
import { isStrong, type CoachPlan, type CoachProgress, type DayPlan } from "@/app/lib/coachPlan";

const PER_ROW = 6;
const COL_W = 110;
const ROW_H = 120;
const PAD_X = 70;
const PAD_Y = 60;

function pos(i: number, n: number) {
  const row = Math.floor(i / PER_ROW);
  const col = i % PER_ROW;
  const c = row % 2 === 0 ? col : PER_ROW - 1 - col; // serpentine
  const cols = Math.min(PER_ROW, n);
  const x = PAD_X + c * COL_W + (cols < PER_ROW ? ((PER_ROW - cols) * COL_W) / 2 : 0);
  return { x, y: PAD_Y + row * ROW_H };
}

function Plane({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} aria-label="Your aircraft">
      <circle r="17" fill="var(--gold)" opacity="0.15">
        <animate attributeName="r" values="14;20;14" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <path d="M12 0 L-4 -3 L-9 -11 L-12 -11 L-8 -3 L-12 -2 L-14 -6 L-16 -6 L-14 0 L-16 6 L-14 6 L-12 2 L-8 3 L-12 11 L-9 11 L-4 3 Z" fill="var(--gold)" stroke="var(--gold-ink)" strokeWidth="0.8" />
    </g>
  );
}

export function PassModeRoute({ plan, progress, todayIdx, allDone }: { plan: CoachPlan; progress: CoachProgress; todayIdx: number; allDone: boolean }) {
  const days = plan.days;
  const n = days.length;
  const [sel, setSel] = useState<number>(allDone ? n - 1 : todayIdx);
  const done = new Set(progress.completedDays);
  const pts = days.map((_, i) => pos(i, n));
  const W = PAD_X * 2 + (PER_ROW - 1) * COL_W;
  const dest = (() => {
    const last = pts[n - 1];
    const lastRow = Math.floor((n - 1) / PER_ROW);
    return { x: last.x, y: PAD_Y + (lastRow + 1) * ROW_H - 30 };
  })();
  const dep = { x: pts[0].x - 48, y: pts[0].y };
  const H = dest.y + 60;

  // route path through departure, every waypoint and the destination
  const all = [dep, ...pts, dest];
  const seg = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    if (a.y === b.y) return `L ${b.x} ${b.y}`;
    const mx = Math.abs(b.x - a.x) < 1 ? a.x + (a.x > W / 2 ? 40 : -40) : (a.x + b.x) / 2;
    return `Q ${mx} ${(a.y + b.y) / 2} ${b.x} ${b.y}`;
  };
  const pathTo = (k: number) => all.slice(0, k + 1).reduce((d, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${d} ${seg(all[i - 1], p)}`), "");
  const flownIdx = allDone ? all.length - 1 : todayIdx + 1; // index in `all` of the aircraft
  const plane = all[flownIdx];
  const prev = all[Math.max(0, flownIdx - 1)];
  const angle = (Math.atan2(plane.y - prev.y, plane.x - prev.x) * 180) / Math.PI;

  const strongIn = (d: DayPlan) => d.units.filter((u) => isStrong(progress, u.subjectId, u.sectionId)).length;
  const totalTopics = days.reduce((a, d) => a + d.units.length, 0);
  const strongTopics = days.reduce((a, d) => a + strongIn(d), 0);
  const daysLeft = Math.max(0, n - progress.completedDays.length);
  const day = days[sel];

  return (
    <div className="mt-6">
      {/* Flight strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden border border-chart-line bg-chart-line">
        {[
          ["ROUTE", `DEP → EXAM`],
          ["ETE", `${daysLeft} day${daysLeft === 1 ? "" : "s"}`],
          ["ETA", plan.examDate],
          ["CHECKPOINTS", `${strongTopics}/${totalTopics} lit`],
        ].map(([k, v]) => (
          <div key={k} className="bg-chart-ground-2 px-3 py-2">
            <div className="mono text-[10px] tracking-[0.16em] text-chart-ink-faint">{k}</div>
            <div className="font-display text-gold text-sm tabular-nums">{v}</div>
          </div>
        ))}
      </div>

      {/* Route chart */}
      <div className="mt-3 rounded-2xl border border-chart-line bg-chart-ground-2 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[560px] h-auto" role="img" aria-label={`Study route: ${n} days to the exam`}>
          {/* chart grid */}
          <defs>
            <pattern id="pm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="var(--chart-line)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#pm-grid)" opacity="0.5" />

          {/* route: whole route dashed, flown part solid gold */}
          <path d={pathTo(all.length - 1)} fill="none" stroke="var(--chart-line-2)" strokeWidth="2" strokeDasharray="6 6" />
          <path d={pathTo(flownIdx)} fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />

          {/* departure */}
          <g>
            <circle cx={dep.x} cy={dep.y} r="9" fill="none" stroke="var(--chart-ink-dim)" strokeWidth="2" />
            <circle cx={dep.x} cy={dep.y} r="3" fill="var(--chart-ink-dim)" />
            <text x={dep.x} y={dep.y + 26} textAnchor="middle" className="mono" fontSize="10" fill="var(--chart-ink-faint)">DEP</text>
          </g>

          {/* waypoints */}
          {days.map((d, i) => {
            const p = pts[i];
            const isDone = done.has(d.dayIndex);
            const isToday = i === todayIdx && !allDone;
            const fill = isDone ? "var(--success, #3fbf7f)" : isToday ? "var(--gold)" : "var(--chart-ground)";
            const stroke = isDone ? "var(--success, #3fbf7f)" : isToday ? "var(--gold)" : "var(--chart-line-2)";
            const units = d.units.length;
            return (
              <g key={d.dayIndex} onClick={() => setSel(i)} className="cursor-pointer" role="button" aria-label={`Day ${i + 1}, ${d.date}`}>
                <rect x={p.x - 40} y={p.y - 40} width="80" height="80" fill="transparent" />
                {/* topic checkpoints in an arc above the waypoint */}
                {d.units.map((u, k) => {
                  const a = Math.PI + ((k + 1) / (units + 1)) * Math.PI;
                  const lit = isStrong(progress, u.subjectId, u.sectionId);
                  return <circle key={k} cx={p.x + Math.cos(a) * 22} cy={p.y + Math.sin(a) * 22} r="3" fill={lit ? "var(--gold)" : "var(--chart-line-2)"} />;
                })}
                {d.kind === "mock" ? (
                  <g>
                    <path d={`M ${p.x - 2} ${p.y + 9} V ${p.y - 12} L ${p.x + 11} ${p.y - 7} L ${p.x - 2} ${p.y - 2}`} fill={isDone ? "var(--success, #3fbf7f)" : "var(--danger, #e06c6c)"} stroke={stroke} strokeWidth="1.5" />
                  </g>
                ) : (
                  <rect x={p.x - 8} y={p.y - 8} width="16" height="16" transform={`rotate(45 ${p.x} ${p.y})`} fill={fill} stroke={stroke} strokeWidth="2" opacity={d.kind === "review" ? 0.75 : 1} />
                )}
                {i === sel && <circle cx={p.x} cy={p.y} r="15" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 3" />}
                <text x={p.x} y={p.y + 28} textAnchor="middle" className="mono" fontSize="10" fill={isToday ? "var(--gold)" : "var(--chart-ink-faint)"}>D{i + 1} · {d.date.slice(5)}</text>
              </g>
            );
          })}

          {/* destination: exam airport */}
          <g>
            <rect x={dest.x - 26} y={dest.y - 5} width="52" height="10" rx="2" fill="var(--chart-ink-dim)" />
            <path d={`M ${dest.x - 20} ${dest.y} H ${dest.x + 20}`} stroke="var(--chart-ground)" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x={dest.x} y={dest.y + 24} textAnchor="middle" className="font-display" fontSize="12" fontWeight="700" fill="var(--gold)">EXAM · {plan.examDate.slice(5)}</text>
          </g>

          <Plane x={plane.x} y={plane.y} angle={angle} />
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 mono text-[11px] text-chart-ink-faint">
        <span><span className="inline-block w-2.5 h-2.5 rotate-45 bg-success mr-1.5 align-middle" />flown</span>
        <span><span className="inline-block w-2.5 h-2.5 rotate-45 bg-gold mr-1.5 align-middle" />today</span>
        <span><span className="inline-block w-2.5 h-2.5 rotate-45 border border-chart-line-2 mr-1.5 align-middle" />ahead</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-gold mr-1.5 align-middle" />topic mastered</span>
        <span className="text-danger">▶ mock exam</span>
      </div>

      {/* Briefing for the selected waypoint */}
      {day && (
        <div className="mt-4 rounded-2xl border border-chart-line bg-chart-ground-2 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="mono text-[11px] tracking-[0.16em] uppercase text-chart-ink-faint">Waypoint D{sel + 1} · {day.date}{done.has(day.dayIndex) ? " · flown" : sel === todayIdx && !allDone ? " · today" : ""}</div>
              <div className="text-chart-ink font-bold mt-0.5">{day.kind === "study" ? `Learn ${day.units.length} topic${day.units.length === 1 ? "" : "s"}` : day.kind === "mock" ? "Final mock & full review" : "Consolidation & review"}</div>
            </div>
            {sel === todayIdx && !allDone && (
              <Link href="/coach/session" className="px-4 py-2 bg-gold hover:brightness-110 text-gold-ink font-bold text-sm rounded-xl flex-shrink-0">Take off →</Link>
            )}
          </div>
          {day.units.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {day.units.map((u) => {
                const lit = isStrong(progress, u.subjectId, u.sectionId);
                return (
                  <li key={u.subjectId + u.sectionId} className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${lit ? "bg-gold" : "bg-chart-line-2"}`} />
                    <Link href={`/study/${u.subjectId}/${u.sectionId}`} className="text-chart-ink-dim hover:text-chart-ink">{u.sectionTitle}</Link>
                    <span className="text-chart-ink-faint text-xs">— {u.subjectTitle}</span>
                    {lit && <span className="ml-auto mono text-[10px] text-gold">STRONG</span>}
                  </li>
                );
              })}
            </ul>
          )}
          {(day.reviewUnits ?? []).length > 0 && (
            <div className="mt-3 text-xs text-chart-ink-faint">
              {day.kind === "mock" ? "Mock across all topics." : `Re-test: ${(day.reviewUnits ?? []).map((u) => u.sectionTitle).join(", ")}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
