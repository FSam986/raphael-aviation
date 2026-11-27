"use client";

// Rotating, subject-themed page background. Pure CSS strings (gradients +
// tiny inline SVG data-URIs) — no image downloads, no canvas, no per-frame JS.
// Two stacked layers cross-fade every ROTATE_MS; rotation pauses while the tab
// is hidden and is disabled for prefers-reduced-motion. A dark scrim keeps text
// contrast identical to the plain page on every option.

import { useEffect, useState } from "react";

const svg = (s: string) => `url("data:image/svg+xml,${encodeURIComponent(s)}") center/cover`;
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

const SETS: Record<string, string[]> = {
  met: [
    "radial-gradient(120% 80% at 80% 0%, #2c3e66 0%, transparent 60%), linear-gradient(180deg,#14203a 0%,#0a1014 100%)",
    `${svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#3a6b8a" stroke-opacity=".45" stroke-width="1.2">${[40, 70, 100, 130, 160, 190].map((r) => `<ellipse cx="290" cy="110" rx="${r * 1.4}" ry="${r}"/>`).join("")}</g><text x="282" y="116" fill="#5fa0c8" font-size="18" font-family="sans-serif" font-weight="700">L</text></svg>`)}, linear-gradient(160deg,#0e1c26,#0a1014)`,
    "linear-gradient(180deg, rgba(160,190,210,.18) 0 18%, transparent 18% 30%, rgba(160,190,210,.12) 30% 42%, transparent 42% 58%, rgba(160,190,210,.08) 58% 66%, transparent 66%), linear-gradient(180deg,#1b2d3d,#0a1014)",
  ],
  airlaw: [
    "repeating-linear-gradient(0deg, rgba(226,182,90,.06) 0 1px, transparent 1px 22px), linear-gradient(135deg,#1a1710,#0a1014)",
    `${svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke-width="2"><circle cx="230" cy="120" r="70" stroke="#3b6fd1" stroke-opacity=".55"/><circle cx="230" cy="120" r="120" stroke="#3b6fd1" stroke-opacity=".3" stroke-dasharray="8 6"/><path d="M20 230 L380 40" stroke="#c94f7c" stroke-opacity=".45" stroke-dasharray="2 5"/></g></svg>')}, #0d141b`,
    "radial-gradient(60% 70% at 100% 100%, rgba(226,182,90,.22), transparent 60%), radial-gradient(40% 50% at 0% 0%, rgba(120,90,40,.25), transparent 70%), #0c0f12",
  ],
  nav: [
    `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><path d="M60 0H0V60" fill="none" stroke="#2f4a3c"/></svg>')}"), linear-gradient(160deg,#0f1d17,#0a1014)`,
    `${svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g transform="translate(320 70)" stroke="#e2b65a" stroke-opacity=".35" fill="none"><circle r="110"/><circle r="80"/>${range(36).map((i) => `<line x1="0" y1="-110" x2="0" y2="${i % 9 ? -102 : -90}" transform="rotate(${i * 10})"/>`).join("")}</g></svg>`)}, #0b1418`,
    `${svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#5c7a4e" stroke-opacity=".35">${[20, 40, 60, 80, 100, 120, 140].map((r) => `<path d="M-20 ${150 + r * 0.3} C 100 ${60 + r} 220 ${220 - r} 420 ${120 + r * 0.5}"/>`).join("")}</g></svg>`)}, linear-gradient(180deg,#141a12,#0a1014)`,
  ],
  radionav: [
    "conic-gradient(from 200deg at 80% 30%, rgba(80,220,140,.28), transparent 25%), radial-gradient(circle at 80% 30%, transparent 0 60px, rgba(80,220,140,.15) 61px 62px, transparent 63px 120px, rgba(80,220,140,.12) 121px 122px, transparent 123px), #071210",
    `${svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#4fb3d9" stroke-opacity=".4" stroke-width="1.5">${range(4).map((i) => { const y = 60 + i * 45; return `<path d="M0 ${y} Q 25 ${y - 30} 50 ${y}${range(7).map((k) => ` T ${100 + k * 50} ${y}`).join("")}"/>`; }).join("")}</g></svg>`)}, #0a141b`,
    `${svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g transform="translate(80 200)" fill="none" stroke="#7fd4ff" stroke-opacity=".3">${range(12).map((i) => `<line x1="0" y1="0" x2="0" y2="-260" transform="rotate(${i * 30})"/>`).join("")}<circle r="60"/><circle r="140"/></g></svg>`)}, linear-gradient(135deg,#0e1a24,#0a1014)`,
  ],
  instruments: [
    "linear-gradient(172deg, #1d4f7a 0 52%, #e9eef2 52% 52.6%, #6b4a2b 52.6% 100%)",
    "radial-gradient(circle at 75% 45%, transparent 0 70px, rgba(255,255,255,.12) 71px 73px, transparent 74px 90px, rgba(226,182,90,.18) 91px 92px, transparent 93px), radial-gradient(circle at 75% 45%, #16202a, #07090b 70%)",
    `${svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#9fb3bf" stroke-opacity=".22" stroke-width="2">${[0, 1, 2].flatMap((c) => [0, 1].map((r) => `<circle cx="${80 + c * 120}" cy="${70 + r * 110}" r="48"/>`)).join("")}</g></svg>`)}, #0b0e11`,
  ],
  hp: [
    "radial-gradient(circle at 75% 40%, #000 0 22px, #1f5d6a 23px 60px, #0f2f38 61px 90px, transparent 91px), #0a1014",
    `${svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><path d="M0 120 H120 L135 90 L150 160 L168 40 L185 140 L200 120 H400" fill="none" stroke="#e25a6a" stroke-opacity=".5" stroke-width="2"/></svg>')}, linear-gradient(180deg,#180d12,#0a1014)`,
    "radial-gradient(3px 3px at 20% 30%, #c89cff 50%, transparent), radial-gradient(3px 3px at 60% 20%, #c89cff 50%, transparent), radial-gradient(3px 3px at 80% 55%, #c89cff 50%, transparent), radial-gradient(3px 3px at 40% 60%, #c89cff 50%, transparent), radial-gradient(70% 60% at 60% 30%, rgba(140,90,220,.25), transparent), #0d0b16",
  ],
  atg: [
    `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M24 0H0V24" fill="none" stroke="#3d6fa8" stroke-opacity=".35"/></svg>')}"), linear-gradient(135deg,#0d2340,#0a1424)`,
    "radial-gradient(circle, rgba(200,210,220,.25) 1.5px, transparent 2px) 0 0/28px 28px, linear-gradient(90deg, transparent 0 49.6%, rgba(255,255,255,.06) 49.6% 50.4%, transparent 50.4%) 0 0/200px 100%, linear-gradient(160deg,#2a3138,#121619)",
    "repeating-conic-gradient(from 0deg at 85% 40%, rgba(200,210,220,.14) 0 6deg, transparent 6deg 20deg), radial-gradient(circle at 85% 40%, #1a2026, #0a0d10 60%)",
  ],
  fpp: [
    "linear-gradient(rgba(226,182,90,.08) 1px, transparent 1px) 0 0/20px 20px, linear-gradient(90deg, rgba(226,182,90,.08) 1px, transparent 1px) 0 0/20px 20px, linear-gradient(rgba(226,182,90,.16) 1px, transparent 1px) 0 0/100px 100px, linear-gradient(90deg, rgba(226,182,90,.16) 1px, transparent 1px) 0 0/100px 100px, #11100c",
    `${svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke-width="2"><path d="M0 240 C 120 230 220 140 400 30" stroke="#e2b65a" stroke-opacity=".5"/><path d="M0 250 C 140 245 250 180 400 90" stroke="#5fa0c8" stroke-opacity=".4"/></g></svg>')}, #0c1216`,
    "repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 26px, transparent 26px 52px), linear-gradient(90deg, rgba(226,182,90,.25) 0 3px, transparent 3px), #0d1114",
  ],
  pof: [
    `${svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#7fd4ff" stroke-opacity=".3">${range(7).map((i) => `<path d="M0 ${40 + i * 28} C 150 ${40 + i * 28} 200 ${40 + i * 28 - (i < 4 ? 30 - i * 7 : 0)} 400 ${40 + i * 28}"/>`).join("")}</g><path d="M150 140 Q 230 100 330 140 Q 230 150 150 140Z" fill="#e2b65a" fill-opacity=".25"/></svg>`)}, #0a131a`,
    "linear-gradient(180deg,#2e6aa1 0%,#16324d 55%,#0a1014 100%)",
    "repeating-radial-gradient(circle at 85% 50%, rgba(255,255,255,.08) 0 2px, transparent 2px 16px), #0b1117",
  ],
  gr: [
    "radial-gradient(70% 70% at 0% 100%, rgba(226,140,60,.25), transparent 60%), #0e0b09",
    `${svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><g fill="#e2b65a" fill-opacity=".35">${range(50).map((i) => { const h = Math.round(10 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 110); return `<rect x="${i * 8}" y="${130 - h / 2}" width="4" height="${h}" rx="2"/>`; }).join("")}</g></svg>`)}, #0b0e10`,
    "repeating-linear-gradient(90deg, rgba(127,212,255,.25) 0 1px, transparent 1px 12px) 0 70%/100% 24px no-repeat, repeating-linear-gradient(90deg, rgba(127,212,255,.45) 0 2px, transparent 2px 60px) 0 70%/100% 36px no-repeat, #0a1218",
  ],
  night: [
    "radial-gradient(1.5px 1.5px at 10% 20%, #fff, transparent), radial-gradient(1px 1px at 30% 70%, #fff, transparent), radial-gradient(1.5px 1.5px at 55% 15%, #fff, transparent), radial-gradient(1px 1px at 75% 40%, #fff, transparent), radial-gradient(1.2px 1.2px at 90% 10%, #fff, transparent), radial-gradient(1px 1px at 45% 45%, #cbd5e1, transparent), linear-gradient(180deg,#050816,#0c1430)",
    `${svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">${range(10).map((i) => { const y = 250 - i * 14, s = 1 - i * 0.08, dx = 120 * s; return `<circle cx="${200 - dx}" cy="${y}" r="${3 * s}" fill="#fff"/><circle cx="${200 + dx}" cy="${y}" r="${3 * s}" fill="#fff"/>`; }).join("")}<g fill="#22c55e">${[-1, -0.5, 0, 0.5, 1].map((k) => `<circle cx="${200 + k * 120}" cy="252" r="3"/>`).join("")}</g></svg>`)}, linear-gradient(180deg,#02040a 0 55%,#0a0f1c)`,
    "radial-gradient(80% 40% at 50% 110%, rgba(255,170,70,.35), transparent 70%), linear-gradient(180deg,#03050c,#101629)",
  ],
  awo: [
    "radial-gradient(60% 50% at 30% 40%, rgba(180,190,200,.22), transparent 70%), radial-gradient(50% 50% at 75% 70%, rgba(180,190,200,.16), transparent 70%), linear-gradient(180deg,#2a3138,#12161a)",
    `${svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><path d="M0 40 L400 220" stroke="#e879f9" stroke-opacity=".5" stroke-width="2"/><path d="M0 0 L400 200 M0 80 L400 240" stroke="#e879f9" stroke-opacity=".18"/><rect x="330" y="225" width="70" height="8" fill="#94a3b8" fill-opacity=".5"/></svg>')}, #0c0e16`,
    "linear-gradient(rgba(232,121,249,.08) 1px, transparent 1px) 0 0/40px 40px, linear-gradient(90deg, rgba(232,121,249,.08) 1px, transparent 1px) 0 0/40px 40px, linear-gradient(160deg,#151020,#0a0b10)",
  ],
};

/** Which background family a subject id belongs to (CPL, PPL, IR, GR, NR ids). */
export function backdropFamily(subjectId: string): string {
  const id = subjectId;
  if (id.includes("night")) return "night";
  if (id.includes("awo") || id.includes("special-procedures")) return "awo";
  if (id.includes("radiotelephony")) return "gr";
  if (id.includes("radio-nav")) return "radionav";
  if (id.includes("nav")) return "nav";
  if (id.includes("met")) return "met";
  if (id.includes("law")) return "airlaw";
  if (id.includes("instrument")) return "instruments";
  if (id.includes("human")) return "hp";
  if (id.includes("principles")) return "pof";
  if (id.includes("planning") || id.includes("performance")) return "fpp";
  return "atg";
}

const ROTATE_MS = 45_000;

export function SubjectBackdrop({ subjectId }: { subjectId: string }) {
  const set = SETS[backdropFamily(subjectId)];
  // Start on a random option per visit; client-only to avoid hydration mismatch.
  const [i, setI] = useState(-1);
  useEffect(() => {
    const first = setTimeout(() => setI(Math.floor(Math.random() * set.length)), 0);
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return () => clearTimeout(first);
    const t = setInterval(() => { if (!document.hidden) setI((k) => (k + 1) % set.length); }, ROTATE_MS);
    return () => { clearTimeout(first); clearInterval(t); };
  }, [set]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-chart-ground">
      {set.map((bg, k) => (
        <div key={k} className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out motion-reduce:transition-none"
          style={{ background: bg, opacity: k === i ? 1 : 0 }} />
      ))}
      {/* scrim: keeps body text contrast the same as the plain page */}
      <div className="absolute inset-0 bg-gradient-to-b from-chart-ground/55 via-chart-ground/70 to-chart-ground/85" />
    </div>
  );
}
