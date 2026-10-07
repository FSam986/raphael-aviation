// Runway lighting & markings — accurate to ICAO Annex 14 / CAR layouts, drawn as
// original vector art with glowing lights for an appealing night scene. Nothing
// reproduced from any chart or manual.

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-hidden rounded-lg border border-zinc-800 bg-white">{children}</div>;
}

// Glowing light dot.
function Light({ x, y, c, r = 2.4 }: { x: number; y: number; c: string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.6} fill={c} opacity={0.18} />
      <circle cx={x} cy={y} r={r} fill={c} />
      <circle cx={x} cy={y} r={r * 0.42} fill="#ffffff" opacity={0.9} />
    </g>
  );
}

/* ── C.3.7 — Night runway lighting (perspective) ──────────────────────────── */
export function RunwayLighting() {
  const cx = 180;
  const ts = [0, 0.16, 0.32, 0.48, 0.64, 0.8, 0.92];
  const Y = (t: number) => 188 - t * 104;          // near (bottom) → far (top)
  const HW = (t: number) => 46 * (1 - t) + 5;       // half-width narrows to horizon
  return (
    <Frame>
      <svg viewBox="0 0 360 210" className="w-full">
        <defs>
          <linearGradient id="rw-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050b1a" /><stop offset="70%" stopColor="#0c1a33" /><stop offset="100%" stopColor="#132743" />
          </linearGradient>
          <linearGradient id="rw-surf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" /><stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
        </defs>
        <rect width={360} height={210} fill="url(#rw-sky)" />
        {[[40, 20], [90, 12], [300, 16], [250, 26], [330, 34]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={0.8} fill="#e2e8f0" opacity={0.7} />)}
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#e2e8f0">Runway lighting (night approach)</text>
        {/* runway surface */}
        <polygon points={`${cx - HW(0)},${Y(0)} ${cx + HW(0)},${Y(0)} ${cx + HW(0.92)},${Y(0.92)} ${cx - HW(0.92)},${Y(0.92)}`} fill="url(#rw-surf)" />
        {/* centreline dashes (white, red near far end) */}
        {ts.map((t, i) => <Light key={"c" + i} x={cx} y={Y(t)} c={t > 0.75 ? "#ef4444" : "#f8fafc"} r={1.5} />)}
        {/* edge lights: white, amber caution zone near far end */}
        {ts.map((t, i) => (
          <g key={"e" + i}>
            <Light x={cx - HW(t)} y={Y(t)} c={t > 0.8 ? "#f59e0b" : "#f8fafc"} r={1.8} />
            <Light x={cx + HW(t)} y={Y(t)} c={t > 0.8 ? "#f59e0b" : "#f8fafc"} r={1.8} />
          </g>
        ))}
        {/* threshold green (near) + runway-end red (far) */}
        {[-0.7, -0.35, 0, 0.35, 0.7].map((f, i) => <Light key={"g" + i} x={cx + f * HW(0)} y={Y(0) + 2} c="#22c55e" r={1.8} />)}
        {[-0.6, 0, 0.6].map((f, i) => <Light key={"r" + i} x={cx + f * HW(0.92)} y={Y(0.92) - 1} c="#ef4444" r={1.4} />)}
        {/* touchdown-zone bars */}
        {[0.1, 0.22].map((t, i) => [-0.5, -0.3, 0.3, 0.5].map((f, j) => <Light key={"z" + i + j} x={cx + f * HW(t)} y={Y(t)} c="#f8fafc" r={1.2} />))}
        {/* PAPI left of threshold — 2 white / 2 red (on slope) */}
        {["#f8fafc", "#f8fafc", "#ef4444", "#ef4444"].map((c, i) => <Light key={"p" + i} x={cx - HW(0) - 16 + i * 6} y={Y(0) - 4} c={c} r={2} />)}
        {/* approach lights ahead of threshold (toward viewer) + crossbar */}
        {[0, 1, 2, 3].map((i) => <Light key={"a" + i} x={cx} y={196 + i * 4} c="#f8fafc" r={1.6} />)}
        {[-3, -1.5, 1.5, 3].map((f, i) => <Light key={"x" + i} x={cx + f * 6} y={200} c="#f8fafc" r={1.3} />)}
        {/* labels */}
        <text x={cx - HW(0) - 30} y={Y(0) - 14} fontSize="7" fill="#e2e8f0">PAPI</text>
        <text x={cx + HW(0) + 6} y={Y(0)} fontSize="7" fill="#f59e0b">amber last 600 m</text>
        <text x={cx + 8} y={Y(0.9) + 3} fontSize="6.6" fill="#fca5a5">red end</text>
        <text x={cx - 46} y={Y(0) + 3} fontSize="6.6" fill="#86efac">green THR</text>
        <text x={cx + 12} y={205} fontSize="6.6" fill="#cbd5e1">approach + crossbar</text>
      </svg>
    </Frame>
  );
}

/* ── C.3.7 / Annex 14 — Runway markings (plan view) ───────────────────────── */
export function RunwayMarkings() {
  const cx = 96, top = 26, bot = 182, w = 34;
  const L = cx - w, R = cx + w;
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <rect width={340} height={200} fill="#0f172a" />
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#e2e8f0">Runway markings</text>
        {/* runway surface */}
        <rect x={L} y={top} width={w * 2} height={bot - top} fill="#334155" stroke="#1e293b" />
        {/* piano-key thresholds both ends */}
        {[-3, -2, -1, 1, 2, 3].map((k, i) => <rect key={"pt" + i} x={cx + k * 5 - 2} y={top + 3} width={3.4} height={16} fill="#e2e8f0" />)}
        {[-3, -2, -1, 1, 2, 3].map((k, i) => <rect key={"pb" + i} x={cx + k * 5 - 2} y={bot - 19} width={3.4} height={16} fill="#e2e8f0" />)}
        {/* centreline dashes */}
        {Array.from({ length: 9 }).map((_, i) => <rect key={"cl" + i} x={cx - 1.2} y={top + 26 + i * 16} width={2.4} height={9} fill="#e2e8f0" />)}
        {/* designation numbers */}
        <text x={cx} y={bot - 26} fontSize="15" fontWeight="bold" fill="#e2e8f0" textAnchor="middle">27</text>
        <text x={cx} y={top + 38} fontSize="15" fontWeight="bold" fill="#e2e8f0" textAnchor="middle" transform={`rotate(180 ${cx} ${top + 33})`}>09</text>
        {/* aiming point (two thick bars) */}
        <rect x={L + 5} y={bot - 58} width={8} height={22} fill="#e2e8f0" /><rect x={R - 13} y={bot - 58} width={8} height={22} fill="#e2e8f0" />
        {/* touchdown-zone bars (pairs) */}
        {[[-1, 74], [1, 74], [-1, 92], [1, 92]].map(([s, dy], i) => <rect key={"tz" + i} x={cx + (s as number) * 16 - 4} y={bot - (dy as number)} width={8} height={8} fill="#e2e8f0" />)}
        {/* side edge stripes */}
        <rect x={L} y={top} width={2.5} height={bot - top} fill="#e2e8f0" opacity={0.8} /><rect x={R - 2.5} y={top} width={2.5} height={bot - top} fill="#e2e8f0" opacity={0.8} />
        {/* legend */}
        <g fontSize="7.6" fill="#e2e8f0">
          <text x={148} y={40} fontWeight="bold" fill="#7dd3fc">Reading the markings</text>
          <text x={148} y={56}>• Designator = magnetic heading ÷ 10 (27 = 270°M)</text>
          <text x={148} y={70}>• Threshold "piano keys" = start of usable surface</text>
          <text x={148} y={84}>• Aiming point bars ~400 m in — the touchdown target</text>
          <text x={148} y={98}>• Touchdown-zone bars in coded pairs each side</text>
          <text x={148} y={112}>• Centreline dashes; continuous side stripes = edge</text>
          <text x={148} y={130} fontWeight="bold" fill="#86efac">Displaced threshold</text>
          <text x={148} y={144}>arrows lead to a moved threshold (obstacle/noise).</text>
          <text x={148} y={158}>Area before it: usable for take-off, not landing.</text>
          <text x={148} y={176} fill="#cbd5e1">Numbers painted so they read right-way-up on approach.</text>
        </g>
      </svg>
    </Frame>
  );
}
