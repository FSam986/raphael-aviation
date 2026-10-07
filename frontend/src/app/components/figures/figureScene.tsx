// Shared topical "scene" backgrounds for the cheat-code infographics. Each scene
// is original vector art (skies, radar scopes, starfields, maps, storms…) with a
// built-in readability treatment: a soft full-canvas wash plus a title band so
// dark body text stays legible on top. Nothing here is a photograph or reproduced
// chart — it embeds no external assets, so figures stay self-contained and light.
//
// Usage: drop <SkyDayScene/> (etc.) as the FIRST child inside a figure's <svg>,
// before the content. Pass w/h to match the figure's viewBox (defaults 340×210);
// the topical motifs are tuned for 340×210 and simply sit within a wider canvas.

const W = 340;
const H = 210;
type SP = { w?: number; h?: number };

// Faint wash + a lightening band under the title so text at y≈18 always reads.
function Readability({ dark = false, w = W, h = H }: SP & { dark?: boolean }) {
  return (
    <>
      <rect x={0} y={0} width={w} height={h} fill={dark ? "#0b1220" : "#ffffff"} opacity={dark ? 0.1 : 0.14} />
      <rect x={0} y={0} width={w} height={28} fill={dark ? "#0b1220" : "#ffffff"} opacity={dark ? 0.42 : 0.5} />
    </>
  );
}

// A small translucent backing so a floating label reads over busy art.
export function LabelChip({ x, y, w, h = 13, dark = false }: { x: number; y: number; w: number; h?: number; dark?: boolean }) {
  return <rect x={x} y={y} width={w} height={h} rx={3} fill={dark ? "#0b1220" : "#ffffff"} opacity={dark ? 0.5 : 0.62} />;
}

/* ── Light daytime sky: sun glow + soft clouds + horizon ───────────────────── */
export function SkyDayScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <linearGradient id="sc-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfe3ff" /><stop offset="55%" stopColor="#e6f4ff" /><stop offset="100%" stopColor="#f4fbff" />
        </linearGradient>
        <radialGradient id="sc-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7d6" /><stop offset="100%" stopColor="#fff7d6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-day)" />
      <circle cx={w - 54} cy={40} r={64} fill="url(#sc-sun)" />
      <circle cx={w - 54} cy={40} r={15} fill="#fde68a" opacity={0.75} />
      {[[70, 60, 1], [w - 90, 96, 0.85], [w / 2 - 30, 44, 0.7]].map(([x, y, o], i) => (
        <g key={i} fill="#ffffff" opacity={Number(o) * 0.7}>
          <ellipse cx={Number(x)} cy={Number(y)} rx={26} ry={11} />
          <ellipse cx={Number(x) + 18} cy={Number(y) + 3} rx={18} ry={9} />
          <ellipse cx={Number(x) - 18} cy={Number(y) + 4} rx={15} ry={8} />
        </g>
      ))}
      <path d={`M0 ${h - 28} Q${w / 2} ${h - 42} ${w} ${h - 28} L${w} ${h} L0 ${h} Z`} fill="#d9f0dc" opacity={0.6} />
      <Readability w={w} h={h} />
    </>
  );
}

/* ── Dusk approach sky: warm gradient, low sun, horizon, vanishing lines ───── */
export function SkyDuskScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <linearGradient id="sc-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ec5ff" /><stop offset="45%" stopColor="#dbeafe" /><stop offset="72%" stopColor="#ffe4c4" /><stop offset="100%" stopColor="#fcd7a8" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-dusk)" />
      <circle cx={w / 2} cy={h - 60} r={20} fill="#ffedd5" opacity={0.9} />
      <circle cx={w / 2} cy={h - 60} r={34} fill="#ffedd5" opacity={0.35} />
      <path d={`M0 ${h - 52} L${w} ${h - 52} L${w} ${h} L0 ${h} Z`} fill="#c7853f" opacity={0.28} />
      {[40, 110, w - 110, w - 40].map((x) => (
        <line key={x} x1={w / 2} y1={h - 52} x2={x} y2={h} stroke="#a8621f" strokeOpacity={0.14} strokeWidth={1} />
      ))}
      <Readability w={w} h={h} />
    </>
  );
}

/* ── Night approach (darker; for lighting figures — use light text) ────────── */
export function NightApproachScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <linearGradient id="sc-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2044" /><stop offset="60%" stopColor="#1e3a68" /><stop offset="100%" stopColor="#2b4a7a" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-night)" />
      {[[30, 40], [80, 26], [w - 40, 36], [w - 90, 22], [w / 2, 30]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1} fill="#e2e8f0" opacity={0.8} />
      ))}
      <path d={`M0 ${h - 42} L${w} ${h - 42} L${w} ${h} L0 ${h} Z`} fill="#0b1526" opacity={0.5} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={w / 2 - 20 + i * 15} cy={h - 24 - i * 4} r={1.6} fill="#fbbf24" opacity={0.9} />
      ))}
      <Readability dark w={w} h={h} />
    </>
  );
}

/* ── Space: starfield + earth curvature (light text) ──────────────────────── */
export function SpaceScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <radialGradient id="sc-space" cx="50%" cy="18%" r="110%">
          <stop offset="0%" stopColor="#111c33" /><stop offset="100%" stopColor="#070d1a" />
        </radialGradient>
        <radialGradient id="sc-earth" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor="#2563eb" /><stop offset="100%" stopColor="#0b2b6b" />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-space)" />
      {[[24, 30], [60, 18], [110, 40], [200, 24], [250, 46], [300, 20], [w - 10, 60], [150, 70], [40, 80]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.3 : 0.8} fill="#cbd5e1" opacity={0.85} />
      ))}
      <path d={`M-20 ${h + 40} Q${w / 2} ${h - 60} ${w + 20} ${h + 40} Z`} fill="url(#sc-earth)" opacity={0.55} />
      <Readability dark w={w} h={h} />
    </>
  );
}

/* ── Radar scope: concentric rings + sweep wedge (light) ──────────────────── */
export function RadarScopeScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <radialGradient id="sc-radar" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#eafff2" /><stop offset="100%" stopColor="#d7f2e6" />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-radar)" />
      <g stroke="#34d399" strokeOpacity={0.22} fill="none">
        {[26, 52, 78, 104].map((r) => <circle key={r} cx={w / 2} cy={h / 2} r={r} />)}
        <line x1={0} y1={h / 2} x2={w} y2={h / 2} /><line x1={w / 2} y1={0} x2={w / 2} y2={h} />
      </g>
      <path d={`M${w / 2} ${h / 2} L${w / 2 + 120} ${h / 2 - 40} A128 128 0 0 1 ${w / 2 + 128} ${h / 2} Z`} fill="#10b981" opacity={0.1} />
      <Readability w={w} h={h} />
    </>
  );
}

/* ── Storm: cumulonimbus silhouette + rain + bolt ─────────────────────────── */
export function StormScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <linearGradient id="sc-storm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c7d2df" /><stop offset="100%" stopColor="#e8edf3" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-storm)" />
      <g fill="#94a3b8" opacity={0.28}>
        <ellipse cx={110} cy={70} rx={70} ry={40} />
        <ellipse cx={170} cy={54} rx={54} ry={34} />
        <ellipse cx={210} cy={82} rx={60} ry={38} />
        <rect x={70} y={70} width={170} height={60} />
      </g>
      <g stroke="#64748b" strokeOpacity={0.2} strokeWidth={1}>
        {[90, 120, 150, 180, 210].map((x) => <line key={x} x1={x} y1={130} x2={x - 10} y2={172} />)}
      </g>
      <path d="M165 96 l-14 30 l12 0 l-8 26 l26 -34 l-12 0 l10 -22 z" fill="#facc15" opacity={0.5} />
      <Readability w={w} h={h} />
    </>
  );
}

/* ── Map grid: parchment + lat/long graticule + compass rose ──────────────── */
export function MapGridScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <linearGradient id="sc-map" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf6e9" /><stop offset="100%" stopColor="#f2ead2" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-map)" />
      <g stroke="#b59f6b" strokeOpacity={0.22} strokeWidth={1}>
        {[42, 84, 126, 168].map((y) => <line key={"h" + y} x1={0} y1={y} x2={w} y2={y} />)}
        {[48, 96, 144, 192, 240, 288].map((x) => <line key={"v" + x} x1={x} y1={0} x2={x} y2={h} />)}
      </g>
      <g transform={`translate(${w - 48} ${h - 52})`} opacity={0.3}>
        <circle r={22} fill="none" stroke="#a1743a" strokeWidth={1.2} />
        <path d="M0 -22 L4 0 L0 22 L-4 0 Z" fill="#a1743a" />
        <path d="M-22 0 L0 -4 L22 0 L0 4 Z" fill="#c9a24a" />
      </g>
      <Readability w={w} h={h} />
    </>
  );
}

/* ── Cockpit / instrument panel: soft dark bezels ─────────────────────────── */
export function CockpitScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <linearGradient id="sc-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7edf3" /><stop offset="100%" stopColor="#cfd8e3" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-panel)" />
      <g opacity={0.16}>
        {[[60, h - 60], [w / 2, h - 42], [w - 60, h - 60]].map(([x, y], i) => (
          <g key={i}><circle cx={x} cy={y} r={34} fill="#0f172a" /><circle cx={x} cy={y} r={34} fill="none" stroke="#334155" strokeWidth={3} /><circle cx={x} cy={y} r={26} fill="none" stroke="#64748b" strokeWidth={1} /></g>
        ))}
      </g>
      <Readability w={w} h={h} />
    </>
  );
}

/* ── Radio waves: concentric arcs from a corner antenna ───────────────────── */
export function RadioWaveScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <linearGradient id="sc-wave" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e6fbfa" /><stop offset="100%" stopColor="#d5f0f7" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-wave)" />
      <g stroke="#22d3ee" fill="none" strokeOpacity={0.22}>
        {[26, 52, 78, 104, 130].map((r) => <path key={r} d={`M${34 + r} ${h - 14} A${r} ${r} 0 0 1 34 ${h - 14 - r}`} strokeWidth={1.4} />)}
      </g>
      <line x1={34} y1={h - 14} x2={34} y2={h - 42} stroke="#0e7490" strokeOpacity={0.4} strokeWidth={2} />
      <Readability w={w} h={h} />
    </>
  );
}

/* ── Fog: layered mist bands + faint sun disc ─────────────────────────────── */
export function FogScene({ w = W, h = H }: SP) {
  return (
    <>
      <defs>
        <linearGradient id="sc-fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dde3e8" /><stop offset="100%" stopColor="#eef1f3" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#sc-fog)" />
      <circle cx={w - 80} cy={54} r={20} fill="#f8fafc" opacity={0.8} />
      {[70, 96, 122, 148, 174].map((y, i) => (
        <ellipse key={y} cx={w / 2 + (i % 2 ? 30 : -30)} cy={y} rx={200} ry={9} fill="#ffffff" opacity={0.4} />
      ))}
      <Readability w={w} h={h} />
    </>
  );
}
