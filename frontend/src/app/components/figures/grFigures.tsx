// Original illustrated "cheat-code" infographics for General Radiotelephony.
// In-house vector art (message-priority pyramid, RCF flow, phraseology card)
// with soft gradient grounds — nothing reproduced from any source.

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-hidden rounded-lg border border-zinc-800 bg-white">{children}</div>;
}

// GR5 — message priority pyramid + key phraseology.
import { RadioWaveScene, SkyDuskScene } from "@/app/components/figures/figureScene";

export function MessagePriority() {
  const rows: [string, string, string][] = [
    ["1  DISTRESS", "MAYDAY ×3 — grave & imminent danger", "#dc2626"],
    ["2  URGENCY", "PAN PAN ×3 — safety concern, no immediate danger", "#f59e0b"],
    ["3  DIRECTION FINDING", "bearings (VDF)", "#d97706"],
    ["4  FLIGHT SAFETY", "ATC clearances & instructions, position reports", "#16a34a"],
    ["5  METEOROLOGICAL", "met reports & forecasts", "#0891b2"],
    ["6  FLIGHT REGULARITY", "servicing, scheduling", "#64748b"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <linearGradient id="gr-pri" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef2f2" /><stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>
        <RadioWaveScene />
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#0f172a">Order of message priority</text>
        {rows.map(([a, b, c], i) => {
          const y = 26 + i * 29;
          return (
            <g key={a}>
              <rect x={12 + i * 4} y={y} width={316 - i * 8} height={24} rx={4} fill={c} opacity="0.14" stroke={c} />
              <text x={20 + i * 4} y={y + 15} fontSize="9" fontWeight="bold" fill={c}>{a}</text>
              <text x={150} y={y + 15} fontSize="8" fill="#334155">{b}</text>
            </g>
          );
        })}
        <text x={12} y={205} fontSize="8" fill="#64748b">Higher = answered first. Distress silence: 'STOP TRANSMITTING — MAYDAY'.</text>
      </svg>
    </Frame>
  );
}

// GR9 — radio-communication failure flow.
export function RCFFlow() {
  const box = (x: number, y: number, w: number, t: string, sub: string, col: string) => (
    <g>
      <rect x={x} y={y} width={w} height={30} rx={5} fill={col} opacity="0.12" stroke={col} />
      <text x={x + 8} y={y + 13} fontSize="8.5" fontWeight="bold" fill={col}>{t}</text>
      <text x={x + 8} y={y + 25} fontSize="7.5" fill="#334155">{sub}</text>
    </g>
  );
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <defs>
          <linearGradient id="gr-rcf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" /><stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>
        <SkyDuskScene h={200} />
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#0f172a">Radio failure (RCF) — what to do</text>
        {box(12, 26, 316, "1 · FAULT-FIND", "frequency · volume · plugs · station open · in range · try alternate & 121.5", "#1d4ed8")}
        {box(12, 64, 316, "2 · SQUAWK 7600 & TRANSMIT BLIND", "'transmitting blind due to receiver failure' on the frequency in use", "#7c3aed")}
        {box(12, 108, 150, "3a · VFR in VMC", "continue VMC → land at nearest suitable aerodrome → report arrival", "#16a34a")}
        {box(178, 108, 150, "3b · IFR in IMC", "continue per flight plan to dest navaid → approach at ETA/EAT", "#dc2626")}
        <line x1={170} y1={56} x2={170} y2={64} stroke="#94a3b8" /><line x1={170} y1={94} x2={170} y2={108} stroke="#94a3b8" />
        <text x={12} y={180} fontSize="8" fill="#334155">A STUCK transmit button jams the whole frequency. Land within ~30 min of the ETA (IFR/IMC).</text>
        <text x={12} y={193} fontSize="8" fill="#64748b">SA CAR 2011 differs from ICAO mainly in the hold-times at the last assigned level/speed.</text>
      </svg>
    </Frame>
  );
}

// GR5 — phraseology quick card (standard words).
export function PhraseologyCard() {
  const words: [string, string][] = [
    ["AFFIRM / NEGATIVE", "yes / no (no = permission not granted)"],
    ["WILCO", "understood & will comply"],
    ["ROGER", "received all of your last transmission"],
    ["CONFIRM", "verify / did you receive?"],
    ["DISREGARD", "consider that message as not sent"],
    ["MONITOR / CONTACT", "listen out / establish two-way"],
    ["SQUAWK 1234 / STBY / IDENT", "set code / standby / press IDENT"],
    ["'TAKE-OFF'", "ONLY to acknowledge a take-off clearance"],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <defs>
          <linearGradient id="gr-ph" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0fdfa" /><stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>
        <RadioWaveScene />
        <text x={12} y={17} fontSize="11" fontWeight="bold" fill="#0f172a">Standard words — quick card</text>
        {words.map(([a, b], i) => {
          const y = 30 + i * 21;
          return (
            <g key={a}>
              <text x={14} y={y} fontSize="8.5" fontWeight="bold" fill="#0e7490">{a}</text>
              <text x={158} y={y} fontSize="8.5" fill="#0f172a">{b}</text>
              <line x1={12} y1={y + 5} x2={328} y2={y + 5} stroke="#e2e8f0" />
            </g>
          );
        })}
        <text x={12} y={205} fontSize="8" fill="#64748b">Numbers digit-by-digit with 'DECIMAL'. Read back: SSR code · QNH · take-off/landing · level · heading · speed.</text>
      </svg>
    </Frame>
  );
}
