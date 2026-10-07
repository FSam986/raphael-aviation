// Decorative, subject-themed backdrop for flashcards. Sits behind the text at low
// opacity so cards look interesting while staying readable on the dark card.

const GLOW: Record<string, string> = { easy: "#22c55e", medium: "#f59e0b", hard: "#f43f5e" };

function motif(subjectId: string) {
  const id = subjectId;
  if (id.includes("radio-nav") || id.includes("radiotelephony")) return "waves";
  if (id.includes("nav")) return "compass";
  if (id.includes("met")) return "weather";
  if (id.includes("instrument")) return "dial";
  if (id.includes("law")) return "seal";
  if (id.includes("performance") || id.includes("planning") || id.includes("flight-perf")) return "graph";
  if (id.includes("human")) return "eye";
  if (id.includes("special")) return "warn";
  return "grid";
}

export function FlashcardBackdrop({ subjectId, difficulty, flipped }: { subjectId: string; difficulty?: string; flipped: boolean }) {
  const glow = GLOW[difficulty ?? "medium"] ?? "#f59e0b";
  const kind = motif(subjectId);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {/* soft radial wash — a single round glow that shifts side on flip. Full-cover
          gradient (not a clipped blurred circle) so it never reads as a hard-edged box. */}
      <div className="absolute inset-0 transition-all duration-700"
        style={{ background: `radial-gradient(60% 55% at ${flipped ? "78% 88%" : "22% 12%"}, ${glow}22, transparent 70%)` }} />
      <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g stroke="#ffffff" fill="none" strokeOpacity="0.06">
          {kind === "compass" && (
            <g transform="translate(330 60)">
              <circle r="46" strokeOpacity="0.09" /><circle r="30" strokeOpacity="0.07" />
              {Array.from({ length: 16 }).map((_, i) => { const a = i * Math.PI / 8; return <line key={i} x1={40 * Math.cos(a)} y1={40 * Math.sin(a)} x2={46 * Math.cos(a)} y2={46 * Math.sin(a)} strokeOpacity="0.1" />; })}
              <path d="M0,-44 L7,0 L0,44 L-7,0 Z" fill="#ffffff" fillOpacity="0.05" stroke="none" />
            </g>
          )}
          {kind === "waves" && Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M-20 ${250} A ${40 + i * 34} ${40 + i * 34} 0 0 1 ${40 + i * 34 - 20} ${250 - (40 + i * 34)}`} strokeOpacity={0.07} />)}
          {kind === "weather" && (<g><circle cx="340" cy="54" r="26" strokeOpacity="0.08" /><g transform="translate(60 60)" fill="#ffffff" fillOpacity="0.05" stroke="none"><ellipse cx="0" cy="0" rx="34" ry="15" /><ellipse cx="24" cy="6" rx="24" ry="12" /><ellipse cx="-22" cy="7" rx="20" ry="11" /></g></g>)}
          {kind === "dial" && (<g transform="translate(330 60)"><circle r="44" strokeOpacity="0.09" />{Array.from({ length: 24 }).map((_, i) => { const a = i * Math.PI / 12; return <line key={i} x1={38 * Math.cos(a)} y1={38 * Math.sin(a)} x2={44 * Math.cos(a)} y2={44 * Math.sin(a)} strokeOpacity="0.1" />; })}<line x1="0" y1="0" x2="26" y2="-20" strokeOpacity="0.14" /></g>)}
          {kind === "graph" && (<g><path d="M40 220 L40 60 M40 220 L360 220" strokeOpacity="0.08" /><path d="M40 210 C120 200 160 120 220 110 C300 96 340 150 360 190" strokeOpacity="0.1" /></g>)}
          {kind === "eye" && (<g transform="translate(320 70)"><path d="M-46 0 Q0 -34 46 0 Q0 34 -46 0 Z" strokeOpacity="0.09" /><circle r="15" strokeOpacity="0.1" /></g>)}
          {kind === "warn" && (<g transform="translate(322 70)" strokeOpacity="0.1"><path d="M0 -40 L40 34 L-40 34 Z" /><line x1="0" y1="-14" x2="0" y2="14" /><circle cx="0" cy="26" r="1.6" fill="#ffffff" fillOpacity="0.14" stroke="none" /></g>)}
          {kind === "seal" && (<g transform="translate(330 60)"><circle r="42" strokeOpacity="0.09" /><circle r="30" strokeOpacity="0.06" />{Array.from({ length: 20 }).map((_, i) => { const a = i * Math.PI / 10; return <circle key={i} cx={36 * Math.cos(a)} cy={36 * Math.sin(a)} r="1.4" fill="#ffffff" fillOpacity="0.08" stroke="none" />; })}</g>)}
          {kind === "grid" && Array.from({ length: 9 }).map((_, i) => <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="260" strokeOpacity="0.04" />)}
        </g>
      </svg>
    </div>
  );
}
