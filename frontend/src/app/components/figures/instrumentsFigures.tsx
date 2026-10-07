// Original, condensed "cheat-code" infographics for the CPL Flight Instruments
// subject. These are in-house vector drawings of GENERIC instrument concepts
// (pitot-static logic, ASI colour code, altimeter settings, gyro properties,
// compass errors, EFIS layout) — not reproductions of any textbook figure or
// branded instrument face. Same visual language as the other figure sets.

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full rounded-lg border border-zinc-800 bg-white p-2">{children}</div>;
}

// A.7.1 — pitot-static system and the blockage/leak cheat table.
import { CockpitScene, SkyDayScene } from "@/app/components/figures/figureScene";

export function PitotStaticLogic() {
  const row = (y: number, label: string, climb: string, desc: string) => (
    <g>
      <text x={12} y={y} fontSize="8.5" fill="#0f172a">{label}</text>
      <text x={196} y={y} fontSize="8.5" textAnchor="middle" fill="#b45309">{climb}</text>
      <text x={286} y={y} fontSize="8.5" textAnchor="middle" fill="#1d4ed8">{desc}</text>
    </g>
  );
  return (
    <Frame>
      <svg viewBox="0 0 340 210" className="w-full">
        <CockpitScene />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Pitot-static: who reads what &amp; blockages</text>
        {/* which instrument uses which pressure */}
        <rect x={12} y={24} width={150} height={16} rx={3} fill="#eff6ff" stroke="#93c5fd" />
        <text x={18} y={35} fontSize="8" fill="#1d4ed8">STATIC → Altimeter · ASI(case) · VSI</text>
        <rect x={12} y={44} width={150} height={16} rx={3} fill="#fff7ed" stroke="#fdba74" />
        <text x={18} y={55} fontSize="8" fill="#b45309">PITOT(total) → ASI capsule only</text>
        <text x={175} y={35} fontSize="8" fill="#64748b">Dynamic = Pt − Ps</text>
        {/* cheat table */}
        <line x1={12} y1={78} x2={328} y2={78} stroke="#e2e8f0" />
        <text x={12} y={90} fontSize="9" fontWeight="bold" fill="#0f172a">Blockage</text>
        <text x={196} y={90} fontSize="8.5" textAnchor="middle" fontWeight="bold" fill="#b45309">CLIMB</text>
        <text x={286} y={90} fontSize="8.5" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">DESCENT</text>
        {row(106, "Pitot blocked (ASI)", "over-reads", "under-reads")}
        {row(122, "Static blocked (ASI)", "under-reads", "over-reads")}
        {row(138, "Static blocked (ALT)", "freezes", "freezes")}
        {row(154, "Static blocked (VSI)", "reads 0", "reads 0")}
        <text x={12} y={176} fontSize="8" fill="#15803d">Memory: blocked static → ASI reads OPPOSITE sense to the altimeter trend.</text>
        <text x={12} y={190} fontSize="8" fill="#64748b">Alt in unpressurised aircraft: break VSI glass → cabin static feeds the instruments.</text>
        <text x={12} y={203} fontSize="8" fill="#64748b">Two static vents (one each side) cancel sideslip / manoeuvre error.</text>
      </svg>
    </Frame>
  );
}

// A.7.1 — altimeter subscale settings QNH / QFE / QNE.
export function AltimeterSettings() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <SkyDayScene h={200} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Altimeter settings &amp; error rules</text>
        {[["QNH", "reads ALTITUDE (amsl); on ground = elevation", "#1d4ed8", 30],
          ["QFE", "reads HEIGHT above the airfield (0 on the ground)", "#15803d", 52],
          ["QNE 1013", "reads PRESSURE ALTITUDE / flight levels", "#7c3aed", 74]].map(([a, b, c, y]) => (
          <g key={a as string}>
            <rect x={12} y={(y as number) - 11} width={64} height={16} rx={3} fill={c as string} opacity="0.12" stroke={c as string} />
            <text x={44} y={(y as number)} fontSize="9" textAnchor="middle" fontWeight="bold" fill={c as string}>{a}</text>
            <text x={84} y={(y as number)} fontSize="8.5" fill="#0f172a">{b}</text>
          </g>
        ))}
        <line x1={12} y1={92} x2={328} y2={92} stroke="#e2e8f0" />
        <text x={12} y={108} fontSize="9" fontWeight="bold" fill="#b45309">The killer rule (terrain safety):</text>
        <rect x={12} y={116} width={316} height={30} rx={4} fill="#fff7ed" stroke="#fdba74" />
        <text x={20} y={130} fontSize="9" fill="#b45309">HIGH → LOW pressure, or WARM → COLD air:</text>
        <text x={20} y={142} fontSize="9" fontWeight="bold" fill="#dc2626">altimeter OVER-reads → true altitude is LOWER → 'High to Low, look out below'.</text>
        <text x={12} y={164} fontSize="8.5" fill="#0f172a">1 hPa ≈ 30 ft.  Set aerodrome QNH within 25 NM.</text>
        <text x={12} y={178} fontSize="8.5" fill="#64748b">Capsule = evacuated (partial vacuum); STATIC feeds the sealed CASE.</text>
        <text x={12} y={192} fontSize="8.5" fill="#64748b">Servo altimeter (E/I pick-off) ≈ removes time-lag error; tol ±60 ft at MSL.</text>
      </svg>
    </Frame>
  );
}

// A.7.1 — ASI colour code arcs.
export function ASIColourCode() {
  // Real ASI markings (typical SEP, kt): VS0 40, VS1 48, VFE 85, VNO 129, VNE 163.
  const cx = 82, cy = 100, r = 64, rIn = 51;
  const A = (v: number) => 215 + (v - 40) * (280 / 140); // 40kt→215°, 180kt→495°(=135°)
  const pt = (deg: number, rr: number): [number, number] => [cx + rr * Math.cos((deg - 90) * Math.PI / 180), cy + rr * Math.sin((deg - 90) * Math.PI / 180)];
  const arcV = (v0: number, v1: number, col: string, rr: number, sw = 7) => {
    const [x0, y0] = pt(A(v0), rr); const [x1, y1] = pt(A(v1), rr);
    const large = A(v1) - A(v0) > 180 ? 1 : 0;
    return <path d={`M ${x0} ${y0} A ${rr} ${rr} 0 ${large} 1 ${x1} ${y1}`} fill="none" stroke={col} strokeWidth={sw} />;
  };
  const radial = (v: number, col: string, sw = 2.6) => { const [x, y] = pt(A(v), r + 1); const [xi, yi] = pt(A(v), r - 12); return <line x1={xi} y1={yi} x2={x} y2={y} stroke={col} strokeWidth={sw} />; };
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <CockpitScene h={200} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Airspeed indicator — colour code</text>
        {/* dial */}
        <circle cx={cx} cy={cy} r={r + 8} fill="#0f172a" />
        <circle cx={cx} cy={cy} r={r + 4} fill="#0b1220" />
        {/* scale ticks + numbers */}
        {[40, 60, 80, 100, 120, 140, 160, 180].map((v) => {
          const [x1, y1] = pt(A(v), r); const [x2, y2] = pt(A(v), r - 6); const [lx, ly] = pt(A(v), r - 15);
          return <g key={v}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e2e8f0" strokeWidth={1.2} /><text x={lx} y={ly + 3} fontSize="6.5" fill="#e2e8f0" textAnchor="middle">{v}</text></g>;
        })}
        {/* colour arcs (green/yellow outer, white flap inner) */}
        {arcV(48, 129, "#16a34a", r - 3)}
        {arcV(129, 163, "#f59e0b", r - 3)}
        {arcV(40, 85, "#ffffff", rIn)}
        {radial(163, "#dc2626", 3)}{/* VNE */}
        {/* needle to ~105 kt */}
        {(() => { const [x, y] = pt(A(105), r - 12); return <line x1={cx} y1={cy} x2={x} y2={y} stroke="#f8fafc" strokeWidth={2.6} />; })()}
        <circle cx={cx} cy={cy} r={4} fill="#e2e8f0" />
        <text x={cx} y={cy + 30} fontSize="6.5" fill="#94a3b8" textAnchor="middle">KNOTS</text>
        {/* arc-end callouts on the dial */}
        {[[40, "VS0"], [85, "VFE"], [48, "VS1"], [129, "VNO"], [163, "VNE"]].map(([v, n], i) => {
          const [x, y] = pt(A(v as number), r + 12);
          return <text key={i} x={x} y={y + 2} fontSize="6" fill="#cbd5e1" textAnchor="middle">{n}</text>;
        })}
        {/* legend */}
        <g fontSize="8">
          <rect x={168} y={26} width={10} height={9} fill="#ffffff" stroke="#94a3b8" /><text x={184} y={34} fill="#0f172a">White arc: VS0→VFE (flap range)</text>
          <rect x={168} y={42} width={10} height={9} fill="#16a34a" /><text x={184} y={50} fill="#0f172a">Green arc: VS1→VNO (normal ops)</text>
          <rect x={168} y={58} width={10} height={9} fill="#f59e0b" /><text x={184} y={66} fill="#0f172a">Yellow arc: VNO→VNE (caution, smooth air)</text>
          <line x1={168} y1={78} x2={178} y2={78} stroke="#dc2626" strokeWidth="3" /><text x={184} y={81} fill="#0f172a">Red radial: VNE (never exceed)</text>
          <line x1={168} y1={92} x2={178} y2={92} stroke="#1d4ed8" strokeWidth="3" /><text x={184} y={95} fill="#0f172a">Blue radial: VYSE — twins only (best 1-eng ROC)</text>
        </g>
        <rect x={168} y={104} width={164} height={42} rx={4} fill="#ffffff" opacity={0.9} stroke="#cbd5e1" />
        <text x={174} y={116} fontSize="8" fontWeight="bold" fill="#15803d">IAS →(+inst/posn) CAS →(+compress) EAS →(+density) TAS</text>
        <text x={174} y={128} fontSize="7.5" fill="#334155">Colder/denser air → lower TAS at a given IAS.</text>
        <text x={174} y={140} fontSize="7.5" fill="#334155">Compressibility makes the ASI OVER-read (EAS &lt; CAS).</text>
        <text x={12} y={192} fontSize="7.5" fill="#64748b">SEP example (kt): VS0 40 · VS1 48 · VFE 85 · VNO 129 · VNE 163. Yellow band = smooth air only.</text>
      </svg>
    </Frame>
  );
}

// A.7.2 — gyro rigidity & precession, wander types.
export function GyroProperties() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <CockpitScene h={200} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Gyro: rigidity, precession &amp; wander</text>
        {/* spinning rotor */}
        <ellipse cx={70} cy={72} rx={44} ry={16} fill="none" stroke="#0f172a" strokeWidth="2" />
        <line x1={70} y1={40} x2={70} y2={104} stroke="#0f172a" strokeWidth="2" />
        <path d="M108 60 a40 24 0 0 1 -6 26" fill="none" stroke="#1d4ed8" strokeWidth="1.6" markerEnd="url(#ga)" />
        <defs><marker id="ga" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8" /></marker></defs>
        <text x={70} y={122} fontSize="8" textAnchor="middle" fill="#64748b">spin axis</text>
        {/* force + precession 90 */}
        <line x1={70} y1={40} x2={70} y2={22} stroke="#dc2626" strokeWidth="2" markerEnd="url(#gr)" />
        <defs><marker id="gr" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" /></marker></defs>
        <text x={78} y={30} fontSize="8" fill="#dc2626">force</text>
        <path d="M96 72 q18 0 26 12" stroke="#15803d" strokeWidth="1.8" fill="none" markerEnd="url(#gg)" />
        <defs><marker id="gg" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#15803d" /></marker></defs>
        <text x={120} y={96} fontSize="8" fill="#15803d">precesses 90° round</text>
        {/* rules */}
        <g fontSize="8.5">
          <text x={158} y={36} fontWeight="bold" fill="#0f172a">Rigidity ∝ RPM × inertia (mass at rim)</text>
          <text x={158} y={52} fill="#0f172a">Precession: 90° in the spin direction,</text>
          <text x={158} y={64} fill="#0f172a">and INVERSELY ∝ RPM (fast gyro = slow precess)</text>
        </g>
        <line x1={158} y1={74} x2={330} y2={74} stroke="#e2e8f0" />
        <g fontSize="8.5">
          <text x={158} y={90} fontWeight="bold" fill="#7c3aed">DRIFT = horizontal · TOPPLE = vertical</text>
          <text x={158} y={104} fill="#0f172a">REAL wander = bearing friction/wear</text>
          <text x={158} y={116} fill="#0f172a">APPARENT wander = earth rotation</text>
        </g>
        <rect x={12} y={140} width={316} height={20} rx={4} fill="#f5f3ff" stroke="#c4b5fd" />
        <text x={18} y={154} fontSize="9" fill="#7c3aed">DG apparent drift = 15 × sin(latitude) °/hr  (0 at equator, 15 at pole)</text>
        <text x={12} y={176} fontSize="8.5" fill="#0f172a">AH = earth gyro (axis vertical) · DG = tied gyro (axis horizontal) · Turn = rate gyro (1 gimbal)</text>
        <text x={12} y={190} fontSize="8" fill="#64748b">Rate one = 3°/s = 360° in 2 min · bank ≈ TAS/10 + 7</text>
      </svg>
    </Frame>
  );
}

// A.7.7 — compass acceleration & turning errors.
export function CompassErrors() {
  return (
    <Frame>
      <svg viewBox="0 0 340 200" className="w-full">
        <CockpitScene h={200} />
        <text x={10} y={15} fontSize="11" fontWeight="bold" fill="#0f172a">Magnetic compass errors (N hemisphere)</text>
        <rect x={12} y={24} width={158} height={70} rx={5} fill="#eff6ff" stroke="#93c5fd" />
        <text x={20} y={40} fontSize="9.5" fontWeight="bold" fill="#1d4ed8">ACCELERATION — 'ANDS'</text>
        <text x={20} y={56} fontSize="9" fill="#0f172a">on E/W headings only:</text>
        <text x={20} y={72} fontSize="9" fill="#0f172a">Accelerate → shows turn to NORTH</text>
        <text x={20} y={86} fontSize="9" fill="#0f172a">Decelerate → shows turn to SOUTH</text>
        <rect x={176} y={24} width={152} height={70} rx={5} fill="#f0fdf4" stroke="#86efac" />
        <text x={184} y={40} fontSize="9.5" fontWeight="bold" fill="#15803d">TURNING — 'UNOS'</text>
        <text x={184} y={56} fontSize="9" fill="#0f172a">through N/S headings:</text>
        <text x={184} y={72} fontSize="9" fill="#0f172a">Undershoot NORTH (roll out late)</text>
        <text x={184} y={86} fontSize="9" fill="#0f172a">Overshoot SOUTH (roll out early)</text>
        <rect x={12} y={104} width={316} height={18} rx={4} fill="#fff7ed" stroke="#fdba74" />
        <text x={18} y={116} fontSize="9" fill="#b45309">Southern hemisphere: REVERSE both → 'ONUS' &amp; accelerate-South.</text>
        <line x1={12} y1={132} x2={328} y2={132} stroke="#e2e8f0" />
        <text x={12} y={148} fontSize="9" fontWeight="bold" fill="#0f172a">Deviation coefficients:</text>
        <text x={12} y={162} fontSize="8.5" fill="#0f172a">A = constant (all hdgs, micro-adjuster) · B max E/W = (devE−devW)/2 · C max N/S = (devN−devS)/2</text>
        <text x={12} y={178} fontSize="8.5" fill="#64748b">Variation West → magnetic Best (add) · Deviation West → compass Best</text>
        <text x={12} y={192} fontSize="8" fill="#64748b">H (directive force) max at magnetic equator, zero at poles → errors worst near poles.</text>
      </svg>
    </Frame>
  );
}
