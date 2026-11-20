// Glass-cockpit building blocks shared by every page: ATIS ticker, readiness
// attitude instrument, subject arc gauge, and the route-to-licence map.
import Link from "next/link";
import type { ReactNode } from "react";

export const statusColor = (v: number) => (v >= 75 ? "var(--success)" : v >= 40 ? "var(--gold)" : v > 0 ? "#f0a830" : "var(--chart-line-2)");

export function Atis({ items }: { items: (string | false | null | undefined)[] }) {
  return (
    <div className="mono text-[12px] tracking-[0.06em] text-success bg-[#06100c] border border-[#143225] rounded-lg px-4 py-2.5 overflow-x-auto whitespace-nowrap no-scrollbar">
      <span className="animate-pulse">●</span> {items.filter(Boolean).join(" · ").toUpperCase()}
    </div>
  );
}

// Page title block used across pages: cyan eyebrow + condensed display heading.
export function CockpitHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-6">
      <div className="mono text-[11px] tracking-[0.16em] uppercase text-data">{eyebrow}</div>
      <h1 className="font-display font-bold text-4xl sm:text-5xl text-chart-ink leading-none mt-1.5">{title}</h1>
      {children && <div className="mt-3 text-chart-ink-dim text-[15px] leading-relaxed max-w-2xl">{children}</div>}
    </div>
  );
}

// Artificial horizon with a readiness ring around it.
export function Attitude({ pct, size = 230 }: { pct: number; size?: number }) {
  const C = 2 * Math.PI * 108;
  return (
    <svg width={size} height={size} viewBox="0 0 250 250" role="img" aria-label={`Overall readiness ${pct} percent`} className="shrink-0">
      <defs>
        <clipPath id="att-hz"><circle cx="125" cy="125" r="96" /></clipPath>
        <linearGradient id="att-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f6d93" /><stop offset="1" stopColor="#2f88b2" /></linearGradient>
        <linearGradient id="att-gnd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7a5a34" /><stop offset="1" stopColor="#4e3920" /></linearGradient>
      </defs>
      <circle cx="125" cy="125" r="118" fill="var(--chart-ground)" stroke="var(--chart-line)" strokeWidth="2" />
      <g clipPath="url(#att-hz)">
        <g transform="rotate(-8 125 125)">
          <rect x="0" y="0" width="250" height="140" fill="url(#att-sky)" />
          <rect x="0" y="140" width="250" height="120" fill="url(#att-gnd)" />
          <line x1="0" y1="140" x2="250" y2="140" stroke="#fff" strokeWidth="2" />
          <g stroke="#fff" strokeWidth="1.5" opacity=".8"><line x1="105" y1="120" x2="145" y2="120" /><line x1="112" y1="100" x2="138" y2="100" /><line x1="105" y1="160" x2="145" y2="160" /></g>
        </g>
      </g>
      <circle cx="125" cy="125" r="108" fill="none" stroke="var(--chart-line)" strokeWidth="10" />
      <circle cx="125" cy="125" r="108" fill="none" stroke="var(--success)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${(C * pct) / 100} ${C}`} transform="rotate(-90 125 125)" />
      <path d="M88 128 L112 128 L118 136 M162 128 L138 128 L132 136" stroke="var(--gold)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="125" cy="128" r="4" fill="var(--gold)" />
      <rect x="85" y="168" width="80" height="34" rx="6" fill="var(--chart-ground)" stroke="var(--success)" />
      <text x="125" y="192" textAnchor="middle" fill="var(--success)" fontSize="22" fontFamily="var(--font-overpass-mono)">{pct}%</text>
    </svg>
  );
}

// 270° arc gauge for one subject.
export function Gauge({ pct, label, sub, href }: { pct: number; label: string; sub?: string; href: string }) {
  const Cy = 44, P = (r: number, t: number) => [50 + r * Math.cos(t), Cy - r * Math.sin(t)];
  const a = Math.PI * (1.25 - (1.5 * pct) / 100);
  const [sx, sy] = P(38, 1.25 * Math.PI), [ex, ey] = P(38, -0.25 * Math.PI), [x, y] = P(38, a), [nx, ny] = P(28, a);
  const c = statusColor(pct);
  return (
    <Link href={href} className="group rounded-xl border border-chart-line bg-chart-ground-2 p-3 flex flex-col items-center text-center hover:border-gold/45 transition-colors">
      <svg width="104" height="84" viewBox="0 0 100 80" aria-hidden="true">
        <path d={`M${sx} ${sy} A38 38 0 1 1 ${ex} ${ey}`} fill="none" stroke="var(--chart-line)" strokeWidth="7" strokeLinecap="round" />
        {pct > 0 && <path d={`M${sx} ${sy} A38 38 0 ${pct > 66.7 ? 1 : 0} 1 ${x} ${y}`} fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" />}
        <line x1="50" y1={Cy} x2={nx} y2={ny} stroke="var(--chart-ink)" strokeWidth="2" />
        <circle cx="50" cy={Cy} r="3" fill="var(--chart-ink)" />
        <text x="50" y="74" textAnchor="middle" fill={pct ? c : "var(--chart-ink-faint)"} fontSize="13" fontFamily="var(--font-overpass-mono)">{pct}%</text>
      </svg>
      <div className="text-chart-ink text-[13px] font-medium leading-snug group-hover:text-gold transition-colors">{label}</div>
      {sub && <div className="mono text-[10px] text-chart-ink-faint mt-0.5">{sub}</div>}
    </Link>
  );
}

// Route map: subjects as waypoints along a curved track to the SACAA exam.
export function RouteMap({ legs }: { legs: { id: string; label: string; pct: number }[] }) {
  const W = 900, H = 330, n = legs.length;
  const pt = (t: number) => [60 + t * 780, 190 - 70 * Math.sin(t * Math.PI * 2.2) - 60 * t];
  const d = Array.from({ length: 61 }, (_, i) => pt(i / 60)).map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const cur = legs.findIndex((l) => l.pct < 75);
  const tAt = (i: number) => (i + 0.5) / n * 0.94;
  const planeT = cur < 0 ? 0.97 : tAt(cur) - 0.05;
  const doneD = Array.from({ length: 41 }, (_, i) => pt((i / 40) * planeT)).map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [px, py] = pt(planeT), [qx, qy] = pt(planeT + 0.01);
  const rot = (Math.atan2(qy - py, qx - px) * 180) / Math.PI + 90;
  const [dx, dy] = pt(1);
  return (
    <div className="rounded-2xl overflow-hidden border border-chart-line" style={{ background: "radial-gradient(120% 90% at 70% 0%, #10222b 0%, var(--chart-ground) 60%)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" role="img" aria-label="Route to the licence">
        <g stroke="var(--chart-ground-2)" strokeWidth="1">
          {[60, 120, 180, 240, 300].map((y) => <line key={y} x1="0" y1={y} x2={W} y2={y} />)}
          {[150, 300, 450, 600, 750].map((x) => <line key={x} x1={x} y1="0" x2={x} y2={H} />)}
        </g>
        <g fill="none" stroke="#1b3440" strokeWidth="1.2">
          <path d="M40 300 C160 250 200 330 330 290 S520 330 640 300 S820 250 880 280" />
          <ellipse cx="560" cy="190" rx="120" ry="60" /><ellipse cx="560" cy="190" rx="70" ry="34" />
        </g>
        <path d={d} fill="none" stroke="var(--chart-line-2)" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
        <path d={doneD} fill="none" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" />
        {legs.map((l, i) => {
          const [x, y] = pt(tAt(i)), up = i % 2 ? -1 : 1, c = statusColor(l.pct), active = i === cur;
          return (
            <a key={l.id} href={`/study/${l.id}`}>
              <g transform={`translate(${x.toFixed(0)} ${y.toFixed(0)})`}>
                {active && <circle r="16" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity=".6" />}
                <path d="M0 -9 L9 0 L0 9 L-9 0Z" fill={l.pct >= 75 || active ? c : "var(--chart-ground)"} stroke={active ? "var(--gold)" : c} strokeWidth="2" />
                <text y={up * 28 + 4} textAnchor="middle" fill={l.pct ? "var(--chart-ink)" : "var(--chart-ink-faint)"} fontSize="12" fontFamily="var(--font-overpass-mono)">{l.label.toUpperCase()}</text>
                <text y={up * 28 + (up > 0 ? 18 : -13)} textAnchor="middle" fill={l.pct ? c : "var(--chart-ink-faint)"} fontSize="11" fontFamily="var(--font-overpass-mono)">{l.pct}%</text>
              </g>
            </a>
          );
        })}
        <g transform={`translate(${px.toFixed(0)} ${py.toFixed(0)}) rotate(${rot.toFixed(0)})`}>
          <path d="M0 -16 L4 -4 L16 2 L16 6 L4 3 L3 12 L7 15 L7 17 L0 15 L-7 17 L-7 15 L-3 12 L-4 3 L-16 6 L-16 2 L-4 -4 Z" fill="#fff" />
        </g>
        <g transform={`translate(${dx.toFixed(0)} ${dy.toFixed(0)})`}>
          <circle r="18" fill="none" stroke="#d94fa0" strokeWidth="2" /><circle r="6" fill="#d94fa0" />
          <text x="0" y="-28" textAnchor="end" fill="#d94fa0" fontSize="13" fontFamily="var(--font-overpass-mono)">SACAA EXAM</text>
        </g>
      </svg>
    </div>
  );
}
