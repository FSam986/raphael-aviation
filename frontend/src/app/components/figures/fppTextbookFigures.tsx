// Clean SVG remakes of the distinctive *method* diagrams from the AVEX
// "Flight Planning & Performance Part 1" textbook — the accelerate-stop /
// accelerate-go geometry (Ch3 Figs 3-10/3-11) and the Point of Equal Time /
// Point of No Return constructions (Ch8/Ch9). These are teaching schematics,
// not the Crown-copyright CAP 696/697/698 carpet graphs (students read those
// from their own manual). Rebuilt as vectors so they are light and watermark-
// free. Same visual language as the other FPP infographics.

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full rounded-lg border border-zinc-800 bg-white p-2">{children}</div>;
}

// Ch3 Fig 3-10 & 3-11 — accelerate-stop and accelerate-go distances.
export function AccelerateStopGo() {
  const plane = (x: number, y: number, s = 1) => (
    <g transform={`translate(${x},${y}) scale(${s})`} fill="#0f172a">
      <polygon points="0,0 16,3 16,5 0,8" />
      <polygon points="6,4 9,-4 11,-4 10,4" />
      <polygon points="6,4 9,12 11,12 10,4" />
    </g>
  );
  return (
    <Frame>
      <svg viewBox="0 0 340 220" className="w-full">
        {/* accelerate-stop */}
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Accelerate-Stop Distance</text>
        <rect x={16} y={30} width={308} height={12} fill="#94a3b8" />
        <line x1={170} y1={24} x2={170} y2={54} stroke="#b45309" strokeWidth="1.4" />
        <text x={170} y={22} fontSize="9" textAnchor="middle" fill="#b45309">V₁</text>
        {plane(60, 32, 1)}
        {plane(230, 32, 1)}
        <line x1={16} y1={60} x2={170} y2={60} stroke="#1d4ed8" strokeWidth="1.4" />
        <text x={93} y={72} fontSize="8" textAnchor="middle" fill="#1d4ed8">all-engine acceleration</text>
        <line x1={170} y1={60} x2={324} y2={60} stroke="#15803d" strokeWidth="1.4" />
        <text x={247} y={72} fontSize="8" textAnchor="middle" fill="#15803d">one-engine-out stopping</text>
        <text x={170} y={86} fontSize="8" textAnchor="middle" fill="#64748b">engine fails at V₁ → reject → stop within ASDA</text>

        {/* accelerate-go */}
        <text x={10} y={116} fontSize="11" fontWeight="bold" fill="#0f172a">Accelerate-Go Distance</text>
        <rect x={16} y={168} width={308} height={12} fill="#94a3b8" />
        {[["V₁", 120], ["V_R", 175], ["V_LOF", 220]].map(([l, x]) => (
          <g key={l as string}>
            <line x1={x as number} y1={162} x2={x as number} y2={182} stroke="#b45309" strokeWidth="1.2" />
            <text x={x as number} y={160} fontSize="8" textAnchor="middle" fill="#b45309">{l}</text>
          </g>
        ))}
        {plane(60, 170, 1)}
        {plane(230, 150, 1)}
        {/* climb path to 35 ft */}
        <path d="M220 172 Q280 172 316 140" stroke="#0f172a" strokeWidth="1" fill="none" strokeDasharray="2 2" />
        <line x1={316} y1={140} x2={316} y2={180} stroke="#334155" strokeWidth="0.8" />
        <text x={320} y={158} fontSize="8" fill="#334155">35 ft</text>
        <line x1={16} y1={196} x2={120} y2={196} stroke="#1d4ed8" strokeWidth="1.4" />
        <text x={68} y={208} fontSize="8" textAnchor="middle" fill="#1d4ed8">all engines</text>
        <line x1={120} y1={196} x2={316} y2={196} stroke="#15803d" strokeWidth="1.4" />
        <text x={218} y={208} fontSize="8" textAnchor="middle" fill="#15803d">one engine inoperative — continue to 35 ft</text>
      </svg>
    </Frame>
  );
}

// Ch8 — Point of Equal Time construction (Figs 8-3 / 8-4).
export function PETConstruction() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Point of Equal Time (PET)</text>
        {/* A --- PET --- B line */}
        <line x1={30} y1={70} x2={310} y2={70} stroke="#334155" strokeWidth="1.5" />
        {[["A", 30], ["B", 310]].map(([l, x]) => (
          <g key={l as string}><circle cx={x as number} cy={70} r={3} fill="#0f172a" /><text x={x as number} y={62} fontSize="10" textAnchor="middle" fill="#0f172a">{l}</text></g>
        ))}
        <line x1={186} y1={62} x2={186} y2={150} stroke="#b45309" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx={186} cy={70} r={3} fill="#b45309" />
        <text x={186} y={162} fontSize="9" textAnchor="middle" fill="#b45309">PET</text>
        {/* time-back and time-on arrows */}
        <path d="M186 88 Q108 108 30 88" stroke="#1d4ed8" strokeWidth="1.2" fill="none" />
        <text x={108} y={116} fontSize="8" textAnchor="middle" fill="#1d4ed8">time home (GS home)</text>
        <path d="M186 88 Q248 108 310 88" stroke="#15803d" strokeWidth="1.2" fill="none" />
        <text x={248} y={116} fontSize="8" textAnchor="middle" fill="#15803d">time on (GS out)</text>
        <text x={10} y={182} fontSize="9" fill="#0f172a">Dist to PET = GS_home ÷ (GS_out + GS_home) × Distance</text>
        <text x={10} y={196} fontSize="8" fill="#64748b">at the PET, time on to B = time back to A</text>
      </svg>
    </Frame>
  );
}

// Ch9 — Point of No Return / Critical Point construction.
export function PNRConstruction() {
  return (
    <Frame>
      <svg viewBox="0 0 340 190" className="w-full">
        <text x={10} y={16} fontSize="11" fontWeight="bold" fill="#0f172a">Point of No Return (PNR)</text>
        <line x1={30} y1={64} x2={310} y2={64} stroke="#334155" strokeWidth="1.5" />
        {[["A", 30], ["B", 310]].map(([l, x]) => (
          <g key={l as string}><circle cx={x as number} cy={64} r={3} fill="#0f172a" /><text x={x as number} y={56} fontSize="10" textAnchor="middle" fill="#0f172a">{l}</text></g>
        ))}
        <line x1={210} y1={56} x2={210} y2={140} stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx={210} cy={64} r={3} fill="#dc2626" />
        <text x={210} y={152} fontSize="9" textAnchor="middle" fill="#dc2626">PNR</text>
        <path d="M30 80 Q120 100 210 80" stroke="#15803d" strokeWidth="1.2" fill="none" />
        <text x={120} y={108} fontSize="8" textAnchor="middle" fill="#15803d">out (GS_out)</text>
        <path d="M210 80 Q120 128 30 80" stroke="#1d4ed8" strokeWidth="1.2" fill="none" />
        <text x={120} y={132} fontSize="8" textAnchor="middle" fill="#1d4ed8">return to A (GS_home)</text>
        <text x={10} y={172} fontSize="9" fill="#0f172a">Dist to PNR = Endurance × GS_out × GS_home ÷ (GS_out + GS_home)</text>
      </svg>
    </Frame>
  );
}
