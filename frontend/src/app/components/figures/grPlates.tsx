// General Radiotelephony — exam-topic infographics (in-house vector art).
// Topics chosen from the SACAA GR question photos the owner supplied as
// reference (chart frequency boxes, signals-area symbols, survivor signals,
// Q-codes, readability, phonetics, transponder). Facts per ICAO Annex 2/10/12,
// Doc 9432 and the SA AIP; the chart is FICTIONAL (no real aerodrome).

import type { ReactNode } from "react";

/** Greedy word-wrap into lines of at most `max` characters. */
/** Round SVG coordinates so server and browser render identical numbers. */
const r2 = (n: number) => Math.round(n * 100) / 100;

function wrap(t: string, max: number): string[] {
  const out: string[] = [];
  for (const w of t.split(" ")) {
    const last = out[out.length - 1];
    if (last !== undefined && (last + " " + w).length <= max) out[out.length - 1] = last + " " + w;
    else out.push(w);
  }
  return out;
}

function Plate({ badge, title, sub, accent, h, children }: { badge: string; title: string; sub: string; accent: string; h: number; children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-white">
      <svg viewBox={`0 0 400 ${h}`} className="w-full" fontFamily="ui-sans-serif, system-ui, sans-serif" role="img" aria-label={title}>
        <rect width="400" height="54" fill="#0f172a" />
        <rect x="14" y="14" width="62" height="24" rx="6" fill={accent} />
        <text x="45" y="30" fontSize="11.5" fontWeight="800" fill="#fff" textAnchor="middle">{badge}</text>
        <text x="88" y="27" fontSize="14.5" fontWeight="800" fill="#fff">{title}</text>
        <text x="88" y="43" fontSize="9" fill="#94a3b8">{sub}</text>
        {children}
      </svg>
    </div>
  );
}

// ── GR5 · Phonetic alphabet & numbers ───────────────────────────────────────
const NATO = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray", "Yankee", "Zulu"];
const NUMS: [string, string][] = [["0", "ZE-RO"], ["1", "WUN"], ["2", "TOO"], ["3", "TREE"], ["4", "FOW-er"], ["5", "FIFE"], ["6", "SIX"], ["7", "SEV-en"], ["8", "AIT"], ["9", "NIN-er"]];
export function PhoneticAlphabetPlate() {
  return (
    <Plate badge="GR-5" title="Phonetic alphabet & numbers" sub="ICAO spelling · say every digit separately" accent="#7c3aed" h={604}>
      {NATO.map((w, i) => {
        const c = i % 4, r = Math.floor(i / 4), x = 14 + c * 94, y = 68 + r * 46;
        return (
          <g key={w}>
            <rect x={x} y={y} width="88" height="40" rx="8" fill={i % 2 ? "#f5f3ff" : "#ede9fe"} />
            <text x={x + 10} y={y + 27} fontSize="20" fontWeight="900" fill="#6d28d9">{w[0]}</text>
            <text x={x + 34} y={y + 25} fontSize="11" fontWeight="700" fill="#1e1b4b">{w}</text>
          </g>
        );
      })}
      <text x="14" y="404" fontSize="11" fontWeight="800" fill="#0f172a">NUMBERS</text>
      {NUMS.map(([d, s], i) => {
        const c = i % 5, r = Math.floor(i / 5), x = 14 + c * 75, y = 414 + r * 46;
        return (
          <g key={d}>
            <rect x={x} y={y} width="69" height="40" rx="8" fill="#ecfeff" stroke="#a5f3fc" />
            <text x={x + 34.5} y={y + 18} fontSize="14" fontWeight="900" fill="#0e7490" textAnchor="middle">{d}</text>
            <text x={x + 34.5} y={y + 32} fontSize="9.5" fontWeight="700" fill="#164e63" textAnchor="middle">{s}</text>
          </g>
        );
      })}
      <rect x="14" y="510" width="372" height="80" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="26" y="529" fontSize="9.5" fill="#334155"><tspan fontWeight="800">.</tspan> DAY-SEE-MAL  ·  <tspan fontWeight="800">00</tspan> HUN-dred  ·  <tspan fontWeight="800">000</tspan> TOU-SAND</text>
      <text x="26" y="547" fontSize="9.5" fill="#334155">121.5 → “WUN TOO WUN DAY-SEE-MAL FIFE”</text>
      <text x="26" y="565" fontSize="9.5" fill="#334155">FL 100 → “FLIGHT LEVEL WUN ZE-RO ZE-RO”</text>
      <text x="26" y="580" fontSize="9.5" fill="#334155">2500 ft → “TOO TOU-SAND FIFE HUN-dred”</text>
    </Plate>
  );
}

// ── GR5 · Readability scale ─────────────────────────────────────────────────
const READ: [number, string][] = [[1, "Unreadable"], [2, "Readable now and then"], [3, "Readable but with difficulty"], [4, "Readable"], [5, "Perfectly readable"]];
export function ReadabilityScalePlate() {
  return (
    <Plate badge="GR-5" title="Readability scale" sub="Answer to “How do you read?” — e.g. “Readability 4”" accent="#0891b2" h={360}>
      {READ.map(([n, t], i) => {
        const y = 70 + i * 48, col = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"][i];
        return (
          <g key={n}>
            <rect x="14" y={y} width="372" height="40" rx="9" fill={i % 2 ? "#f8fafc" : "#f1f5f9"} />
            <text x="40" y={y + 27} fontSize="20" fontWeight="900" fill={col} textAnchor="middle">{n}</text>
            {[0, 1, 2, 3, 4].map((b) => <rect key={b} x={64 + b * 11} y={y + 30 - (b + 1) * 4.5} width="7" height={(b + 1) * 4.5} rx="1.5" fill={b < n ? col : "#cbd5e1"} />)}
            <text x="130" y={y + 25} fontSize="12" fontWeight="700" fill="#0f172a">{t}</text>
          </g>
        );
      })}
      <text x="14" y="327" fontSize="9.5" fill="#475569">Radio check: “Raphael Tower, ZS-ABC, radio check 118.1”</text>
      <text x="14" y="343" fontSize="9.5" fill="#475569">Reply: “ZS-ABC, readability 5”.</text>
    </Plate>
  );
}

// ── GR5 · Transponder codes & phraseology ───────────────────────────────────
export function TransponderPlate() {
  const codes: [string, string, string][] = [["7500", "Unlawful interference", "#dc2626"], ["7600", "Radio failure", "#d97706"], ["7700", "Emergency", "#b91c1c"]];
  const phr: [string, string][] = [
    ["“Squawk 4512”", "Set code 4512"],
    ["“Squawk ident”", "Press the IDENT button"],
    ["“Squawk Charlie”", "Select altitude reporting (Mode C)"],
    ["“Recycle 4512”", "Reselect the code"],
    ["“Confirm squawk”", "Read back the code set"],
    ["“Squawk standby”", "Switch to standby"],
  ];
  return (
    <Plate badge="GR-5" title="Transponder (SSR)" sub="Emergency codes & ATC instructions" accent="#dc2626" h={500}>
      <rect x="64" y="68" width="272" height="72" rx="12" fill="#111827" />
      <text x="200" y="118" fontSize="34" fontWeight="800" fill="#4ade80" textAnchor="middle" fontFamily="var(--font-overpass-mono), monospace" letterSpacing="6">7700</text>
      <text x="200" y="134" fontSize="8" fill="#9ca3af" textAnchor="middle">ALT · ON · SBY · IDENT</text>
      {codes.map(([c, m, col], i) => (
        <g key={c}>
          <rect x={14 + i * 126} y="156" width="120" height="62" rx="10" fill={col} />
          <text x={74 + i * 126} y="184" fontSize="20" fontWeight="900" fill="#fff" textAnchor="middle" fontFamily="var(--font-overpass-mono), monospace">{c}</text>
          <text x={74 + i * 126} y="204" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{m}</text>
        </g>
      ))}
      <text x="14" y="242" fontSize="9" fill="#475569">Memory aid: 75 — taken alive · 76 — radio fix · 77 — going to heaven</text>
      {phr.map(([a, b], i) => (
        <g key={a}>
          <rect x="14" y={256 + i * 38} width="372" height="32" rx="8" fill={i % 2 ? "#f8fafc" : "#f1f5f9"} />
          <text x="26" y={276 + i * 38} fontSize="11" fontWeight="800" fill="#0f172a">{a}</text>
          <text x="196" y={276 + i * 38} fontSize="10.5" fill="#334155">{b}</text>
        </g>
      ))}
      <text x="14" y="490" fontSize="8.5" fill="#64748b">Avoid selecting 7500/7600/7700 by accident when changing codes.</text>
    </Plate>
  );
}

// ── GR7 · Survivors' ground-to-air signals (ICAO Annex 12) ──────────────────
export function SurvivorSignalsPlate() {
  const sig: [string, string][] = [["V", "Require assistance"], ["X", "Require medical assistance"], ["N", "No or negative"], ["Y", "Yes or affirmative"], ["↑", "Proceeding in this direction"]];
  return (
    <Plate badge="GR-7" title="Ground-to-air signals" sub="Laid out by survivors · symbols at least 2.5 m long" accent="#ea580c" h={430}>
      <rect x="0" y="54" width="400" height="300" fill="#d9c7a3" />
      {[...Array(28)].map((_, i) => <circle key={i} cx={(i * 53) % 400} cy={64 + ((i * 37) % 280)} r={2 + (i % 3)} fill="#b8a27a" opacity="0.6" />)}
      {sig.map(([s, m], i) => {
        const x = i < 3 ? 70 + i * 130 : 135 + (i - 3) * 130, y = i < 3 ? 140 : 270;
        return (
          <g key={s}>
            <rect x={x - 52} y={y - 66} width="104" height="112" rx="12" fill="#ffffff" opacity="0.82" />
            <text x={x} y={y + 4} fontSize="58" fontWeight="900" fill="#ea580c" textAnchor="middle">{s}</text>
            <text x={x} y={y + 26} fontSize="9.5" fontWeight="800" fill="#0f172a" textAnchor="middle">{wrap(m, 16).map((ln, j) => <tspan key={j} x={x} dy={j ? 11 : 0}>{ln}</tspan>)}</text>
          </g>
        );
      })}
      <rect x="14" y="366" width="372" height="52" rx="10" fill="#fff7ed" stroke="#fdba74" />
      <text x="26" y="386" fontSize="9.5" fontWeight="800" fill="#9a3412">Aircraft acknowledges the message:</text>
      <text x="26" y="404" fontSize="9.5" fill="#7c2d12">by day — rocking the wings · by night — flashing the landing lights twice</text>
    </Plate>
  );
}

// ── GR4 · Signals area / ground signals (ICAO Annex 2, Appendix 1) ──────────
function Sym({ k }: { k: string }) {
  switch (k) {
    case "red1": return <g><rect x="-26" y="-26" width="52" height="52" fill="#dc2626" /><line x1="-26" y1="26" x2="26" y2="-26" stroke="#facc15" strokeWidth="7" /></g>;
    case "red2": return <g><rect x="-26" y="-26" width="52" height="52" fill="#dc2626" /><line x1="-26" y1="26" x2="26" y2="-26" stroke="#facc15" strokeWidth="7" /><line x1="-26" y1="-26" x2="26" y2="26" stroke="#facc15" strokeWidth="7" /></g>;
    case "db": return <g><rect x="-18" y="-5" width="36" height="10" fill="#fff" stroke="#334155" /><circle cx="-24" cy="0" r="13" fill="#fff" stroke="#334155" /><circle cx="24" cy="0" r="13" fill="#fff" stroke="#334155" /></g>;
    case "db2": return <g><rect x="-18" y="-5" width="36" height="10" fill="#fff" stroke="#334155" /><circle cx="-24" cy="0" r="13" fill="#fff" stroke="#334155" /><circle cx="24" cy="0" r="13" fill="#fff" stroke="#334155" /><rect x="-27" y="-13" width="6" height="26" fill="#111827" /><rect x="21" y="-13" width="6" height="26" fill="#111827" /></g>;
    case "dx": return <g fill="#fff" stroke="#334155">{[-14, 14].map((dx) => <g key={dx}><rect x={dx - 4} y="-22" width="8" height="44" /><rect x={dx - 12} y="-4" width="24" height="8" /></g>)}</g>;
    case "T": return <g fill="#fff" stroke="#334155"><rect x="-26" y="-22" width="52" height="10" /><rect x="-5" y="-12" width="10" height="36" /></g>;
    case "num": return <g><rect x="-17" y="-28" width="34" height="56" fill="#111827" /><text y="-4" fontSize="20" fontWeight="900" fill="#fff" textAnchor="middle">0</text><text y="21" fontSize="20" fontWeight="900" fill="#fff" textAnchor="middle">9</text></g>;
    case "arrow": return <path d="M-26,-6 H8 V-18 L28,0 L8,18 V6 H-26 Z" fill="#f97316" stroke="#9a3412" />;
    case "C": return <g><rect x="-20" y="-26" width="40" height="52" fill="#facc15" /><text y="12" fontSize="34" fontWeight="900" fill="#111827" textAnchor="middle">C</text></g>;
    default: return <g><rect x="-30" y="-14" width="60" height="28" fill="#475569" />{[0].map((i) => <g key={i} stroke="#fff" strokeWidth="5"><line x1="-9" y1="-9" x2="9" y2="9" /><line x1="-9" y1="9" x2="9" y2="-9" /></g>)}</g>;
  }
}
export function SignalsAreaPlate() {
  const items: [string, string, string][] = [
    ["red2", "Landing prohibited", "red square, yellow diagonals"],
    ["red1", "Special precautions", "bad state of manoeuvring area"],
    ["db", "Runways & taxiways only", "land, take off & taxi on them"],
    ["db2", "Runways only for T/O & landing", "taxiing may also use other surfaces"],
    ["dx", "Gliders in operation", "white double cross"],
    ["T", "Landing direction", "land toward the cross-arm"],
    ["num", "Take-off direction", "tens of degrees magnetic (090°)"],
    ["arrow", "Right-hand circuit", "turns right before landing / after T/O"],
    ["C", "ATS reporting office", "black C on yellow"],
    ["cross", "Area unfit for movement", "crosses on runway / taxiway"],
  ];
  return (
    <Plate badge="GR-4" title="Signals area & ground signals" sub="What each signal on the aerodrome means" accent="#16a34a" h={620}>
      {items.map(([k, t, s], i) => {
        const c = i % 2, r = Math.floor(i / 2), x = 14 + c * 190, y = 66 + r * 108;
        return (
          <g key={k}>
            <rect x={x} y={y} width="182" height="100" rx="10" fill="#4d7c0f" opacity="0.13" />
            <g transform={`translate(${x + 44} ${y + 50})`}><Sym k={k} /></g>
            <text x={x + 86} y={y + 30} fontSize="10" fontWeight="800" fill="#14532d">
              {wrap(t, 15).map((ln, j) => <tspan key={j} x={x + 86} dy={j ? 12 : 0}>{ln}</tspan>)}
            </text>
            <text x={x + 86} y={y + 66} fontSize="7.5" fill="#3f6212">
              {wrap(s, 21).map((ln, j) => <tspan key={j} x={x + 86} dy={j ? 10 : 0}>{ln}</tspan>)}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

// ── GR5/GR8 · Q-codes on a compass (worked example, variation 25°W) ─────────
export function QCodesPlate() {
  const cx = 200, cy = 250, R = 130;
  const pt = (deg: number, r: number) => [r2(cx + r * Math.sin((deg * Math.PI) / 180)), r2(cy - r * Math.cos((deg * Math.PI) / 180))];
  const [ax, ay] = pt(45, 112);
  const [mx, my] = pt(-25, R + 6);
  return (
    <Plate badge="GR-8" title="Q-codes for bearings" sub="Station S, aircraft A · variation 25°W (true 045° = magnetic 070°)" accent="#2563eb" h={614}>
      <circle cx={cx} cy={cy} r={R} fill="#eff6ff" stroke="#bfdbfe" />
      {[...Array(36)].map((_, i) => { const [x1, y1] = pt(i * 10, R); const [x2, y2] = pt(i * 10, R - (i % 9 ? 6 : 12)); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#93c5fd" />; })}
      <line x1={cx} y1={cy} x2={cx} y2={cy - R - 10} stroke="#0f172a" strokeWidth="2" />
      <text x={cx} y={cy - R - 14} fontSize="10" fontWeight="800" fill="#0f172a" textAnchor="middle">TN</text>
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#64748b" strokeWidth="2" strokeDasharray="5 4" />
      <text x={mx - 4} y={my - 4} fontSize="10" fontWeight="800" fill="#64748b" textAnchor="end">MN</text>
      <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="#2563eb" strokeWidth="3" />
      <circle cx={cx} cy={cy} r="7" fill="#0f172a" /><text x={cx - 12} y={cy + 18} fontSize="11" fontWeight="900" fill="#0f172a">S</text>
      <g transform={`translate(${ax} ${ay}) rotate(-135)`}><path d="M0,-11 L3,-2 L14,3 L14,6 L3,3 L3,10 L7,13 L7,15 L0,13 L-7,15 L-7,13 L-3,10 L-3,3 L-14,6 L-14,3 L-3,-2 Z" fill="#dc2626" /></g>
      <text x={ax + 14} y={ay - 8} fontSize="11" fontWeight="900" fill="#dc2626">A</text>
      {([
        ["QTE", "045°", "TRUE bearing FROM the station", "#1d4ed8"],
        ["QDR", "070°", "MAGNETIC bearing FROM the station", "#2563eb"],
        ["QUJ", "225°", "TRUE track TO the station", "#7c3aed"],
        ["QDM", "250°", "MAGNETIC heading TO the station (no wind)", "#9333ea"],
      ] as [string, string, string, string][]).map(([q, v, d, col], i) => (
        <g key={q}>
          <rect x="14" y={398 + i * 40} width="372" height="34" rx="8" fill={i % 2 ? "#f8fafc" : "#f1f5f9"} />
          <rect x="22" y={404 + i * 40} width="46" height="22" rx="6" fill={col} />
          <text x="45" y={419 + i * 40} fontSize="11" fontWeight="900" fill="#fff" textAnchor="middle">{q}</text>
          <text x="80" y={420 + i * 40} fontSize="13" fontWeight="900" fill="#0f172a">{v}</text>
          <text x="126" y={419 + i * 40} fontSize="10" fill="#334155">{d}</text>
        </g>
      ))}
      <text x="14" y="574" fontSize="9" fill="#475569">From = R/E · To = M/J · Magnetic = true + west variation. QDM = QDR ± 180°.</text>
      <text x="14" y="589" fontSize="9" fill="#475569">Altimeter: QNH → reads elevation on the ground · QFE → reads zero</text>
      <text x="14" y="602" fontSize="9" fill="#475569">on the ground · 1013.2 (standard) → pressure altitude / flight level.</text>
    </Plate>
  );
}

// ── GR8 · VDF bearing classes ───────────────────────────────────────────────
export function VdfClassesPlate() {
  const cx = 200, cy = 330;
  const wedge = (half: number, r: number) => { const a = (d: number) => [r2(cx + r * Math.sin((d * Math.PI) / 180)), r2(cy - r * Math.cos((d * Math.PI) / 180))]; const [x1, y1] = a(-half), [x2, y2] = a(half); return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} Z`; };
  return (
    <Plate badge="GR-8" title="VDF bearing classes" sub="Accuracy of a bearing from your VHF transmission" accent="#0d9488" h={430}>
      <path d={wedge(10, 250)} fill="#99f6e4" opacity="0.55" />
      <path d={wedge(5, 250)} fill="#2dd4bf" opacity="0.6" />
      <path d={wedge(2, 250)} fill="#0f766e" opacity="0.85" />
      <circle cx={cx} cy={cy} r="7" fill="#0f172a" />
      <text x={cx} y={cy + 22} fontSize="10" fontWeight="800" fill="#0f172a" textAnchor="middle">VDF station</text>
      {([["A", "± 2°", 72, "#0f766e"], ["B", "± 5°", 132, "#0d9488"], ["C", "± 10°", 192, "#14b8a6"]] as [string, string, number, string][]).map(([c, v, y, col]) => (
        <g key={c}>
          <rect x="268" y={y} width="118" height="44" rx="9" fill="#f0fdfa" stroke={col} />
          <text x="282" y={y + 28} fontSize="18" fontWeight="900" fill={col}>{c}</text>
          <text x="306" y={y + 27} fontSize="12" fontWeight="800" fill="#134e4a">{v}</text>
        </g>
      ))}
      <rect x="268" y="252" width="118" height="44" rx="9" fill="#f8fafc" stroke="#94a3b8" />
      <text x="282" y="279" fontSize="18" fontWeight="900" fill="#64748b">D</text>
      <text x="306" y="273" fontSize="9" fontWeight="700" fill="#334155">worse than</text>
      <text x="306" y="285" fontSize="9" fontWeight="700" fill="#334155">class C</text>
      <rect x="14" y="368" width="372" height="50" rx="10" fill="#f0fdfa" stroke="#99f6e4" />
      <text x="26" y="388" fontSize="9.5" fill="#134e4a">“Raphael Homer, ZS-ABC, request QDM, ZS-ABC.”</text>
      <text x="26" y="405" fontSize="9.5" fill="#134e4a">“ZS-ABC, QDM 250, class Bravo.” → ±5° accuracy</text>
    </Plate>
  );
}

// ── GR3 · Reading a VFR chart (fictional) ───────────────────────────────────
export function ChartReadingPlate() {
  return (
    <Plate badge="GR-3" title="Reading frequencies off a chart" sub="Fictional aerodrome — what each box and symbol tells you" accent="#2563eb" h={620}>
      <rect x="0" y="54" width="400" height="352" fill="#fbf7ec" />
      <path d="M0,230 C80,200 140,260 220,236 S360,200 400,226" fill="none" stroke="#93c5fd" strokeWidth="5" opacity="0.7" />
      {/* TMA (solid) and CTR (dashed) */}
      <circle cx="200" cy="232" r="150" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="200" cy="232" r="72" fill="#2563eb" fillOpacity="0.06" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="8 5" />
      {/* restricted area */}
      <path d="M300,96 L360,96 L372,150 L310,160 Z" fill="#dc2626" fillOpacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="318" y="124" fontSize="9" fontWeight="800" fill="#b91c1c">FAR 99</text>
      <text x="318" y="136" fontSize="7.5" fill="#b91c1c">GND–8500</text>
      {/* aerodrome */}
      <circle cx="200" cy="232" r="10" fill="#fff" stroke="#be185d" strokeWidth="2.5" />
      <line x1="193" y1="239" x2="207" y2="225" stroke="#be185d" strokeWidth="4" />
      {/* VOR-DME */}
      <g transform="translate(118 186)"><rect x="-11" y="-11" width="22" height="22" fill="none" stroke="#1d4ed8" strokeWidth="1.8" /><polygon points="-7,0 -3.5,-6 3.5,-6 7,0 3.5,6 -3.5,6" fill="none" stroke="#1d4ed8" strokeWidth="1.8" /><circle r="1.6" fill="#1d4ed8" /></g>
      {/* NDB */}
      <g transform="translate(262 346)">{[...Array(16)].map((_, i) => <circle key={i} cx={r2(10 * Math.cos(i / 8 * Math.PI))} cy={r2(10 * Math.sin(i / 8 * Math.PI))} r="1.1" fill="#be185d" />)}<circle r="2.5" fill="#be185d" /></g>
      {/* boxes */}
      <g><rect x="16" y="66" width="128" height="40" rx="3" fill="#fff" stroke="#1d4ed8" strokeWidth="1.5" /><text x="24" y="82" fontSize="9" fontWeight="800" fill="#1d4ed8">RAPHAEL TMA  C</text><text x="24" y="97" fontSize="8.5" fill="#1d4ed8">APP 124.50 · FL195/4500</text></g>
      <g><rect x="208" y="268" width="122" height="40" rx="3" fill="#fff" stroke="#1d4ed8" strokeWidth="1.5" /><text x="216" y="284" fontSize="9" fontWeight="800" fill="#1d4ed8">RAPHAEL CTR  C</text><text x="216" y="299" fontSize="8.5" fill="#1d4ed8">TWR 118.10 · 4500/GND</text></g>
      <g><rect x="16" y="140" width="96" height="40" rx="3" fill="#fff" stroke="#1d4ed8" strokeWidth="1.5" /><text x="24" y="156" fontSize="9" fontWeight="800" fill="#1d4ed8">RAX VOR-DME</text><text x="24" y="171" fontSize="8.5" fill="#1d4ed8">115.30 · CH 100</text></g>
      <g><rect x="294" y="318" width="86" height="40" rx="3" fill="#fff" stroke="#be185d" strokeWidth="1.5" /><text x="302" y="334" fontSize="9" fontWeight="800" fill="#be185d">RX NDB</text><text x="302" y="349" fontSize="8.5" fill="#be185d">385 kHz</text></g>
      <g><rect x="150" y="150" width="84" height="22" rx="3" fill="#fff" stroke="#0f172a" /><text x="158" y="165" fontSize="8.5" fontWeight="800" fill="#0f172a">ATIS 127.40</text></g>
      {/* letter markers */}
      {([["A", 150, 66], ["B", 330, 268], ["C", 116, 140], ["D", 384, 318], ["E", 238, 150], ["F", 372, 96]] as [string, number, number][]).map(([l, x, y]) => (
        <g key={l}><circle cx={x} cy={y} r="9" fill="#f59e0b" /><text x={x} y={y + 3.5} fontSize="10" fontWeight="900" fill="#fff" textAnchor="middle">{l}</text></g>
      ))}
      {([
        ["A", "TMA box: class C, approach 124.50, limits FL195 / 4500 ft"],
        ["B", "CTR box: class C, tower 118.10, from the ground up to 4500 ft"],
        ["C", "VOR-DME: identifier RAX, 115.30 MHz, DME channel 100"],
        ["D", "NDB: identifier RX on 385 kHz (LF/MF band)"],
        ["E", "ATIS: listen before first contact (127.40)"],
        ["F", "Restricted area FAR 99: ground to 8500 ft — avoid unless cleared"],
      ] as [string, string][]).map(([l, t], i) => (
        <g key={l}>
          <circle cx="24" cy={426 + i * 31} r="9" fill="#f59e0b" />
          <text x="24" y={429.5 + i * 31} fontSize="10" fontWeight="900" fill="#fff" textAnchor="middle">{l}</text>
          <text x="40" y={430 + i * 31} fontSize="9.5" fill="#1e293b">{t}</text>
        </g>
      ))}
    </Plate>
  );
}

// ── GR2 · VHF line-of-sight range (+ ducting) ───────────────────────────────
export function LineOfSightPlate() {
  const r = (h: number) => Math.round(1.23 * (Math.sqrt(h) + Math.sqrt(100)));
  return (
    <Plate badge="GR-2" title="VHF line-of-sight range" sub="Range (NM) ≈ 1.23 × (√h₁ + √h₂), heights in feet" accent="#0284c7" h={540}>
      <defs><clipPath id="los-sky"><rect x="0" y="54" width="400" height="250" /></clipPath></defs>
      <g clipPath="url(#los-sky)">
        <rect x="0" y="54" width="400" height="250" fill="#e0f2fe" />
        {/* the Earth's curve (exaggerated) */}
        <circle cx="200" cy="620" r="360" fill="#65a30d" stroke="#365314" strokeWidth="2" />
      </g>
      {/* ground station on the surface */}
      <rect x="57" y="242" width="6" height="46" fill="#334155" /><circle cx="60" cy="241" r="4.5" fill="#dc2626" />
      <text x="60" y="230" fontSize="9" fontWeight="800" fill="#0f172a" textAnchor="middle">ground aerial h₁</text>
      {/* horizon ray: tangent to the Earth at ~(240, 262) */}
      <line x1="60" y1="241" x2="396" y2="279.4" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="239.5" cy="262.2" r="3" fill="#0284c7" />
      <text x="150" y="243" fontSize="8.5" fontWeight="800" fill="#0369a1" transform="rotate(6.5 150 243)">horizon ray</text>
      {/* high aircraft: above the ray → line of sight */}
      <line x1="60" y1="241" x2="300" y2="122" stroke="#16a34a" strokeWidth="1.5" />
      <g transform="translate(306 118) rotate(90)"><path d="M0,-9 L2,-2 L13,3 L13,6 L2,3 L2,9 L6,12 L6,14 L0,12 L-6,14 L-6,12 L-2,9 L-2,3 L-13,6 L-13,3 L-2,-2 Z" fill="#16a34a" /></g>
      <text x="300" y="94" fontSize="9.5" fontWeight="800" fill="#166534" textAnchor="middle">high: in line of sight ✓</text>
      {/* low aircraft: below the ray, hidden by the curve */}
      <g transform="translate(362 296) rotate(90) scale(0.85)"><path d="M0,-9 L2,-2 L13,3 L13,6 L2,3 L2,9 L6,12 L6,14 L0,12 L-6,14 L-6,12 L-2,9 L-2,3 L-13,6 L-13,3 L-2,-2 Z" fill="#dc2626" /></g>
      <text x="318" y="192" fontSize="9.5" fontWeight="800" fill="#991b1b" textAnchor="middle">low &amp; far: below the</text>
      <text x="318" y="205" fontSize="9.5" fontWeight="800" fill="#991b1b" textAnchor="middle">horizon → no contact ✗</text>
      <line x1="345" y1="210" x2="362" y2="280" stroke="#991b1b" strokeWidth="1" strokeDasharray="2 2" />
      {/* table */}
      <text x="14" y="324" fontSize="11" fontWeight="800" fill="#0f172a">Worked ranges (ground aerial 100 ft)</text>
      {[1000, 4000, 9000].map((h, i) => (
        <g key={h}>
          <rect x={14 + i * 126} y="336" width="120" height="52" rx="10" fill="#f0f9ff" stroke="#bae6fd" />
          <text x={74 + i * 126} y="356" fontSize="10" fontWeight="700" fill="#075985" textAnchor="middle">aircraft {h.toLocaleString("en")} ft</text>
          <text x={74 + i * 126} y="378" fontSize="16" fontWeight="900" fill="#0c4a6e" textAnchor="middle">≈ {r(h)} NM</text>
        </g>
      ))}
      <rect x="14" y="402" width="372" height="124" rx="10" fill="#fff7ed" stroke="#fed7aa" />
      <text x="26" y="422" fontSize="10.5" fontWeight="800" fill="#9a3412">Things that change the range</text>
      <text x="26" y="442" fontSize="9.5" fill="#7c2d12">• Power: range ∝ √power — double the range needs 4× the power.</text>
      <text x="26" y="460" fontSize="9.5" fill="#7c2d12">• Terrain between you and the station blocks the direct wave.</text>
      <text x="26" y="478" fontSize="9.5" fill="#7c2d12">• Ducting (temperature inversion, high-pressure nights): abnormally</text>
      <text x="36" y="494" fontSize="9.5" fill="#7c2d12">long range → interference between stations on the same frequency.</text>
      <text x="26" y="512" fontSize="9.5" fill="#7c2d12">• Sporadic-E scatter: occasional, unreliable long-range reception.</text>
    </Plate>
  );
}
