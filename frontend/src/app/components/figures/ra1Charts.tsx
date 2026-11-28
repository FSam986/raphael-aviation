// Original performance charts for the fictional RA-1 trainer (PPL FPP practice).
// Rendered from RA1_DATA, the same data the question answers were computed from.

import { RA1_DATA as D } from "@/app/data/ppl-fpp-ra1";
import { Zoomable } from "@/app/components/Zoomable";

const th = "px-2 py-1.5 text-[11px] font-semibold text-zinc-600 border border-zinc-300 bg-zinc-100";
const td = "px-2 py-1 text-[12px] text-zinc-900 border border-zinc-300 text-center tabular-nums";

function Sheet({ title, sub, notes, children }: { title: string; sub: string; notes?: string[]; children: React.ReactNode }) {
  return (
    <Zoomable label={title}>
      <div className="w-full rounded-lg border border-zinc-800 bg-white p-3 text-zinc-900 overflow-x-auto">
        <div className="text-[13px] font-bold">RA-1 · {title}</div>
        <div className="text-[11px] text-zinc-600 mb-2">{sub}</div>
        {children}
        {notes && <ul className="mt-2 text-[11px] text-zinc-700 list-disc pl-4 space-y-0.5">{notes.map((n) => <li key={n}>{n}</li>)}</ul>}
      </div>
    </Zoomable>
  );
}

function Cal() {
  return (
    <Sheet title="Airspeed calibration" sub="Normal static source · KIAS → KCAS">
      {([["Flaps 0°", D.cal0], ["Flaps 10°", D.cal10], ["Flaps 30°", D.cal30]] as const).map(([label, rows]) => (
        <table key={label} className="border-collapse mb-2">
          <tbody>
            <tr><th className={th}>{label} KIAS</th>{rows.map(([i]) => <td key={i} className={td}>{i}</td>)}</tr>
            <tr><th className={th}>KCAS</th>{rows.map(([i, c]) => <td key={i} className={td}>{c}</td>)}</tr>
          </tbody>
        </table>
      ))}
    </Sheet>
  );
}

function Stall() {
  return (
    <Sheet title="Stall speeds" sub="Power off · most forward CG · KCAS">
      <table className="border-collapse">
        <thead><tr><th className={th}>Weight</th><th className={th}>Flaps</th>{D.banks.map((b) => <th key={b} className={th}>{b}° bank</th>)}</tr></thead>
        <tbody>{([["2400 lb", D.stall], ["2000 lb", D.stall2000]] as const).flatMap(([w, tab]) => Object.entries(tab).map(([f, v], i) => <tr key={w + f}>{i === 0 && <th className={th} rowSpan={3}>{w}</th>}<th className={th}>{f}°</th>{(v as readonly number[]).map((x: number, k: number) => <td key={k} className={td}>{x}</td>)}</tr>))}</tbody>
      </table>
    </Sheet>
  );
}

function Distance({ which }: { which: "to" | "ld" }) {
  const to = which === "to";
  const tab = to ? D.to : D.ld;
  return (
    <Sheet
      title={to ? "Take-off distance" : "Landing distance"}
      sub={to ? "2400 lb · flaps 10° · paved, level, dry runway · zero wind · feet" : "2400 lb · flaps 30° · paved, level, dry runway · zero wind · feet"}
      notes={[
        "Decrease distances 10% for each 9 kt of headwind.",
        "Increase distances 10% for each 2 kt of tailwind (tailwinds up to 10 kt).",
        ...(to ? ["Decrease distances 8% for each 100 lb below 2400 lb."] : []),
        to ? "Dry grass runway: increase the ground roll by 15%." : "Dry grass runway: increase the ground roll by 45%.",
      ]}
    >
      <table className="border-collapse">
        <thead>
          <tr><th className={th} rowSpan={2}>Press alt ft</th>{D.temps.map((t) => <th key={t} className={th} colSpan={2}>{t}°C</th>)}</tr>
          <tr>{D.temps.map((t) => [<th key={t + "g"} className={th}>Grd roll</th>, <th key={t + "o"} className={th}>{to ? "To 50 ft" : "From 50 ft"}</th>])}</tr>
        </thead>
        <tbody>
          {D.pas.map((pa) => (
            <tr key={pa}><th className={th}>{pa === 0 ? "S.L." : pa}</th>{tab[String(pa) as keyof typeof tab].map(([g, o], i) => [<td key={i + "g"} className={td}>{g}</td>, <td key={i + "o"} className={td}>{o}</td>])}</tr>
          ))}
        </tbody>
      </table>
    </Sheet>
  );
}

function Climb() {
  return (
    <Sheet title="Time, fuel & distance to climb" sub="2400 lb · from sea level · ISA · climb at 75 KIAS" notes={["Add 1.1 USG for engine start, taxi and take-off.", "Increase time, fuel and distance 10% for each 10°C above ISA.", "From an aerodrome above sea level, subtract the values for the aerodrome's pressure altitude."]}>
      <table className="border-collapse">
        <thead><tr>{["Press alt ft", "Time min", "Fuel USG", "Distance NM"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>{D.climb.map(([pa, t, f, d]) => <tr key={pa}><td className={td}>{pa === 0 ? "S.L." : pa}</td><td className={td}>{t}</td><td className={td}>{f.toFixed(1)}</td><td className={td}>{d}</td></tr>)}</tbody>
      </table>
    </Sheet>
  );
}

function Cruise() {
  return (
    <Sheet title="Cruise performance" sub="2400 lb · ISA · recommended lean mixture">
      <table className="border-collapse">
        <thead><tr>{["Press alt ft", "RPM", "% BHP", "KTAS", "GPH"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>{Object.entries(D.cruise).flatMap(([pa, rows]) => rows.map(([rpm, p, tas, g], i) => (
          <tr key={pa + rpm}>{i === 0 && <th className={th} rowSpan={rows.length}>{pa}</th>}<td className={td}>{rpm}</td><td className={td}>{p}</td><td className={td}>{tas}</td><td className={td}>{g}</td></tr>
        )))}</tbody>
      </table>
    </Sheet>
  );
}

function Roc() {
  // x: pressure altitude 0–10 000 ft; y: rate of climb 0–800 fpm.
  const W = 360, H = 220, L = 44, B = 30, T = 12, R = 12;
  const x = (pa: number) => L + (pa / 10000) * (W - L - R);
  const y = (v: number) => H - B - (v / 800) * (H - B - T);
  return (
    <Sheet title="Rate of climb" sub="2400 lb · flaps 0° · full throttle · 75 KIAS" notes={["Decrease rate of climb 20 fpm for each 10°C above ISA."]}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md">
        {[0, 2000, 4000, 6000, 8000, 10000].map((pa) => <g key={pa}><line x1={x(pa)} y1={y(0)} x2={x(pa)} y2={y(800)} stroke="#d4d4d8" /><text x={x(pa)} y={H - 14} fontSize="9" textAnchor="middle" fill="#52525b">{pa / 1000}</text></g>)}
        {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((v) => <g key={v}><line x1={L} y1={y(v)} x2={W - R} y2={y(v)} stroke={v % 200 ? "#ececef" : "#d4d4d8"} /><text x={L - 5} y={y(v) + 3} fontSize="9" textAnchor="end" fill="#52525b">{v}</text></g>)}
        <polyline fill="none" stroke="#1d4ed8" strokeWidth="2" points={D.roc.map(([pa, v]) => `${x(pa)},${y(v)}`).join(" ")} />
        {D.roc.map(([pa, v]) => <circle key={pa} cx={x(pa)} cy={y(v)} r="2.5" fill="#1d4ed8" />)}
        <text x={x(5000)} y={y(560)} fontSize="10" fill="#1d4ed8" fontWeight="bold">ISA</text>
        <text x={(L + W - R) / 2} y={H - 2} fontSize="9.5" textAnchor="middle" fill="#3f3f46">Pressure altitude (×1000 ft)</text>
        <text x={10} y={(T + H - B) / 2} fontSize="9.5" textAnchor="middle" fill="#3f3f46" transform={`rotate(-90 10 ${(T + H - B) / 2})`}>Rate of climb (fpm)</text>
      </svg>
    </Sheet>
  );
}

function ToSpeeds() {
  return (
    <Sheet title="Take-off speeds" sub="Flaps 10° · short-field technique · KIAS">
      <table className="border-collapse">
        <thead><tr>{["Weight lb", "Lift-off", "At 50 ft"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>{D.tospd.map(([w, lo, b]) => <tr key={w}><td className={td}>{w}</td><td className={td}>{lo}</td><td className={td}>{b}</td></tr>)}</tbody>
      </table>
    </Sheet>
  );
}

function Profile() {
  return (
    <Sheet title="Range & endurance profile" sub="48 USG usable · includes start, taxi, take-off & climb · zero wind · ISA" notes={["Reserve = 45 minutes at the cruise fuel flow shown."]}>
      <table className="border-collapse">
        <thead>
          <tr><th className={th} rowSpan={2}>Press alt ft</th><th className={th} rowSpan={2}>RPM</th><th className={th} rowSpan={2}>KTAS</th><th className={th} colSpan={2}>Range NM</th><th className={th} colSpan={2}>Endurance h</th></tr>
          <tr><th className={th}>No reserve</th><th className={th}>45 min reserve</th><th className={th}>No reserve</th><th className={th}>45 min reserve</th></tr>
        </thead>
        <tbody>{Object.entries(D.profile).flatMap(([pa, rows]) => rows.map(([rpm, tas, r0, rr, e0, er], i) => (
          <tr key={pa + rpm}>{i === 0 && <th className={th} rowSpan={rows.length}>{pa}</th>}<td className={td}>{rpm}</td><td className={td}>{tas}</td><td className={td}>{r0}</td><td className={td}>{rr}</td><td className={td}>{e0.toFixed(1)}</td><td className={td}>{er.toFixed(1)}</td></tr>
        )))}</tbody>
      </table>
    </Sheet>
  );
}

function Descent() {
  return (
    <Sheet title="Time, fuel & distance to descend" sub="To sea level · 500 fpm · 110 KIAS · ISA · zero wind" notes={["Descending to an aerodrome above sea level: subtract the values for its pressure altitude."]}>
      <table className="border-collapse">
        <thead><tr>{["Press alt ft", "Time min", "Fuel USG", "Distance NM"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>{D.descent.map(([pa, t, f, d]) => <tr key={pa}><td className={td}>{pa}</td><td className={td}>{t}</td><td className={td}>{f.toFixed(1)}</td><td className={td}>{d}</td></tr>)}</tbody>
      </table>
    </Sheet>
  );
}

function Glide() {
  const W = 360, H = 220, L = 44, B = 30, T = 12, R = 12;
  const x = (nm: number) => L + (nm / 20) * (W - L - R);
  const y = (ft: number) => H - B - (ft / 12000) * (H - B - T);
  return (
    <Sheet title="Maximum glide" sub="2400 lb · 70 KIAS · flaps 0° · propeller windmilling · zero wind" notes={[`About ${D.glide} NM per 1000 ft of height lost.`]}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md">
        {[0, 4, 8, 12, 16, 20].map((nm) => <g key={nm}><line x1={x(nm)} y1={y(0)} x2={x(nm)} y2={y(12000)} stroke="#d4d4d8" /><text x={x(nm)} y={H - 14} fontSize="9" textAnchor="middle" fill="#52525b">{nm}</text></g>)}
        {[0, 2000, 4000, 6000, 8000, 10000, 12000].map((ft) => <g key={ft}><line x1={L} y1={y(ft)} x2={W - R} y2={y(ft)} stroke="#e4e4e7" /><text x={L - 5} y={y(ft) + 3} fontSize="9" textAnchor="end" fill="#52525b">{ft}</text></g>)}
        <line x1={x(0)} y1={y(0)} x2={x(12 * D.glide)} y2={y(12000)} stroke="#1d4ed8" strokeWidth="2" />
        <text x={(L + W - R) / 2} y={H - 2} fontSize="9.5" textAnchor="middle" fill="#3f3f46">Ground distance (NM)</text>
        <text x={10} y={(T + H - B) / 2} fontSize="9.5" textAnchor="middle" fill="#3f3f46" transform={`rotate(-90 10 ${(T + H - B) / 2})`}>Height above terrain (ft)</text>
      </svg>
    </Sheet>
  );
}

const CHARTS: Record<string, () => React.ReactNode> = {
  "ra1-tospd": () => <ToSpeeds />, "ra1-profile": () => <Profile />, "ra1-descent": () => <Descent />, "ra1-glide": () => <Glide />,
  "ra1-cal": () => <Cal />, "ra1-stall": () => <Stall />, "ra1-to": () => <Distance which="to" />,
  "ra1-ld": () => <Distance which="ld" />, "ra1-climb": () => <Climb />, "ra1-cruise": () => <Cruise />, "ra1-roc": () => <Roc />,
};

/** The chart a question refers to (null if none). */
export function QuestionFigure({ id }: { id?: string }) {
  const c = id ? CHARTS[id] : undefined;
  return c ? <div className="mb-4">{c()}</div> : null;
}
