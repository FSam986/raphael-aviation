"use client";
// Loading screen shown while any page loads: a small animated light aircraft
// over drifting clouds, plus rotating exam facts / formulas / memory aids.
// Facts match the (fact-checked) notes; **marked** text renders as exam red.
import { useEffect, useState } from "react";

const FACTS: [kind: string, subject: string, head: string, body: string][] = [
  ["Formula", "Meteorology", "Cloud base", "Cumulus base ≈ 400 ft × (T − Td). A spread of 5 °C gives a base near **2000 ft**."],
  ["Fact", "Meteorology", "ISA at sea level", "**1013.25 hPa**, **+15 °C**, cooling **1.98 °C per 1000 ft** to the tropopause at 36 090 ft."],
  ["Memory aid", "Altimetry", "High to low, look out below", "Flying into lower pressure (or colder air) without resetting, you are **lower than indicated**."],
  ["Formula", "Navigation", "1-in-60 rule", "Track error ° = off-track × 60 ÷ distance gone."],
  ["Formula", "Principles of Flight", "Load factor in a turn", "n = 1 ÷ cos(bank). At 60° bank: **2 g**, and stall speed rises by **√2 (×1.41)**."],
  ["Fact", "Air Law (SA)", "Night", "SA CAR: **15 minutes after sunset** to **15 minutes before sunrise**."],
  ["Fact", "Air Law (SA)", "Final reserve fuel", "Piston aeroplane: **45 minutes** at normal cruise. Turbine: 30 min holding at 1500 ft."],
  ["Memory aid", "Principles of Flight", "Spin recovery — PARE", "**P**ower idle · **A**ilerons neutral · **R**udder opposite · **E**levator forward."],
  ["Formula", "Radio Nav", "VHF range", "Range NM ≈ 1.23 × (√h aircraft + √h station), heights in feet."],
  ["Fact", "Radio Nav", "ILS outer marker", "**400 Hz**, two dashes per second, **blue** light, about 4 NM out."],
  ["Formula", "Flight Planning", "Point of equal time", "PET = D × H ÷ (O + H) — a time/decision point, independent of endurance."],
  ["Formula", "Flight Planning", "Centre of gravity", "CG = Σ moments ÷ Σ mass · moment = mass × arm."],
  ["Trap", "Meteorology", "Lapse-rate units", "DALR is **3 °C per 1000 ft** (≈1 °C per 100 m). Watch for options that mix the units."],
  ["Fact", "Human Performance", "Time of useful consciousness", "About **30 min at 20 000 ft**, **1–2 min at 30 000 ft**, 15–20 s at 40 000 ft."],
  ["Fact", "Meteorology", "Buys Ballot (southern hemisphere)", "Back to the wind, the **low is on your right**."],
  ["Fact", "Instruments", "Pitot blocked, drain open", "The ASI reads **zero**. With both blocked it behaves like an **altimeter**."],
  ["Formula", "Performance", "Hydroplaning speed", "V ≈ 9 × √(tyre pressure psi) knots."],
  ["Fact", "Radiotelephony", "Message priority", "**Distress** → Urgency → Direction finding → Flight safety → Meteorological → Flight regularity."],
];
const STATUS = ["Pre-flight checks…", "Loading the syllabus…", "Tuning the radios…", "Setting QNH…", "Clearing for take-off…"];

const Rich = ({ t }: { t: string }) => <>{t.split(/\*\*(.+?)\*\*/g).map((p, i) => (i % 2 ? <span key={i} className="exam-term">{p}</span> : p))}</>;

export function LoadingScreen() {
  const [n, setN] = useState(0);
  const [start, setStart] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    setStart(Math.floor(Math.random() * FACTS.length));
    const id = setInterval(() => {
      setOut(true);
      setTimeout(() => { setN((x) => x + 1); setOut(false); }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, []);
  const [kind, subject, head, body] = FACTS[(start + n) % FACTS.length];

  return (
    <div className="min-h-screen bg-chart-ground flex items-center justify-center px-4 py-8" style={{ background: "radial-gradient(120% 80% at 50% 0%, #10222b 0%, var(--chart-ground) 60%)" }}>
      <div className="w-full max-w-[560px] flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <img src="/logo-emblem.png" alt="" className="h-10 w-auto" />
          <div className="leading-tight text-left">
            <div className="font-display text-gold text-xl tracking-[0.2em]">RAPHAEL</div>
            <div className="mono text-chart-ink-faint text-[10px] tracking-[0.34em]">AVIATION</div>
          </div>
        </div>

        <svg viewBox="0 0 280 110" className="w-full max-w-[280px] rounded-2xl border border-chart-line" aria-hidden="true">
          <defs><clipPath id="ls-win"><rect width="280" height="110" rx="14" /></clipPath></defs>
          <g clipPath="url(#ls-win)">
            <rect width="280" height="110" fill="#0d1a21" />
            <g className="ls-clouds" fill="#1f3340">
              {[0, 280].map((dx) => (
                <g key={dx} transform={`translate(${dx} 0)`}>
                  <path d="M30 36 q4 -10 14 -8 q6 -8 16 -2 q10 -2 10 8 z" /><path d="M170 24 q3 -7 10 -6 q5 -6 12 -1 q7 -1 7 6 z" />
                  <path d="M110 84 q4 -9 13 -7 q6 -7 14 -2 q9 -1 9 8 z" /><path d="M230 70 q3 -8 11 -6 q5 -6 12 -1 q8 -1 8 7 z" />
                </g>
              ))}
            </g>
            <g className="ls-lines" stroke="#2a3b44" strokeWidth="1.5" strokeLinecap="round"><path d="M40 52 h26" /><path d="M28 62 h34" /><path d="M46 72 h20" /></g>
            <g className="ls-plane">
              <g transform="translate(140 60)">
                <path d="M-44 -2 C-30 -8 10 -10 26 -7 L34 -4 L34 4 L22 7 C0 9 -30 8 -44 4 Z" fill="#dfe7ea" />
                <path d="M-44 -2 L-56 -18 L-48 -18 L-36 -4 Z" fill="#dfe7ea" />
                <path d="M-50 2 L-36 2 L-38 5 L-50 5 Z" fill="#c8d4d9" />
                <path d="M-14 -11 L22 -11 L24 -8 L-14 -8 Z" fill="#e2b65a" />
                <path d="M8 -8 L14 -1 M-6 -8 L-10 -1" stroke="#97a8af" strokeWidth="1.5" />
                <path d="M4 -7 L18 -7 L22 -3 L6 -3 Z" fill="#62d0e8" opacity=".85" />
                <path d="M-40 0 H18" stroke="#e2b65a" strokeWidth="1.6" />
                <path d="M-2 7 L-6 15 M14 6 L16 15" stroke="#97a8af" strokeWidth="1.5" />
                <circle cx="-6" cy="16" r="2.6" fill="#0a1014" stroke="#97a8af" /><circle cx="16" cy="16" r="2.6" fill="#0a1014" stroke="#97a8af" />
                <circle cx="35" cy="0" r="2.2" fill="#97a8af" />
                <ellipse className="ls-prop" cx="37" cy="0" rx="1.6" ry="11" fill="#dfe7ea" opacity=".55" />
              </g>
            </g>
          </g>
        </svg>

        <div className="mono text-[11.5px] tracking-[0.14em] uppercase text-success" role="status">{STATUS[n % STATUS.length]}</div>

        <article aria-live="polite" className={`w-full rounded-2xl border border-chart-line bg-chart-ground-2 px-6 py-5 min-h-[150px] flex flex-col justify-center gap-2.5 transition-all duration-300 motion-reduce:transition-none ${out ? "opacity-0 translate-y-1.5" : "opacity-100"}`}>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="mono text-[10.5px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-md border border-chart-line text-data">{kind}</span>
            <span className="mono text-[10.5px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-md border border-chart-line text-chart-ink-faint">{subject}</span>
          </div>
          <div className="font-display font-bold text-[28px] leading-none text-chart-ink">{head}</div>
          <div className="text-chart-ink-dim text-[15px] leading-relaxed"><Rich t={body} /></div>
        </article>
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((j) => <i key={j} className={`w-1.5 h-1.5 rounded-full ${j === n % 5 ? "bg-gold" : "bg-chart-line"}`} />)}
        </div>
      </div>
    </div>
  );
}
