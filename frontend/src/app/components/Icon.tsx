import type { ReactNode } from "react";

// Drawn line-icon set for the Aeronautical Chart world. One consistent 1.5
// stroke, currentColor, no emoji. Sized by the `size` prop (px). Subject marks
// plus the UI glyphs the app needs.
const PATHS: Record<string, ReactNode> = {
  // ---- subjects ----
  "aircraft-technical": <><circle cx="12" cy="12" r="3.2" /><path d="M12 4v2.4M12 17.6V20M4 12h2.4M17.6 12H20M6.3 6.3l1.7 1.7M16 16l1.7 1.7M17.7 6.3L16 8M8 16l-1.7 1.7" /></>,
  "air-law": <><path d="M12 3v18M7 21h10" /><path d="M5 7h14l-3 2M5 7l3 2M5 7l-2 5a3 3 0 0 0 6 0zM19 7l2 5a3 3 0 0 1-6 0z" /></>,
  "flight-planning": <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v3H9z" /><path d="M8.5 11h7M8.5 15h7" /></>,
  "human-performance": <><path d="M15.5 8.5a3.5 3.5 0 0 0-7 0c0 1 .3 1.6-.5 2.6-.6.8-1 1.3-1 2.2 0 1 .8 1.5 1.5 1.7 0 1.5.8 3 3 3 2 0 3-1.2 3-3.2V8.5z" /><path d="M12 8.5v9M9.5 11h2.5M12 14h2" /></>,
  "flight-instruments": <><circle cx="12" cy="12" r="8.5" /><path d="M12 12l4-2.5" /><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" /><path d="M12 4v1.5M20 12h-1.5M12 20v-1.5M4 12h1.5" /></>,
  "meteorology": <><path d="M7 18a4 4 0 0 1 .3-7.9A5 5 0 0 1 17 11a3.5 3.5 0 0 1-.5 7z" /></>,
  "navigation": <><circle cx="12" cy="12" r="8.5" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  "radio-navigation": <><path d="M12 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /><path d="M8.5 15a5 5 0 0 1 0-7M15.5 8a5 5 0 0 1 0 7M6 17.5a9 9 0 0 1 0-12M18 5.5a9 9 0 0 1 0 12" /></>,
  "mass-and-balance": <><path d="M12 3v18M6 21h12" /><path d="M4 9l8-3 8 3" /><path d="M4 9l-1.5 4a2.5 2.5 0 0 0 5 0zM20 9l1.5 4a2.5 2.5 0 0 1-5 0z" /></>,
  "principles-of-flight": <><path d="M3 15c6 0 9-2 13-7 1.5-1.8 3-2.5 4.5-2.5-.5 5-3 9-8 10.5-3 .9-6.5 1-9.5-1z" /><path d="M8 14l-2 5" /></>,
  book: <><path d="M4 5.5A2 2 0 0 1 6 4h6v15H6a2 2 0 0 0-2 2z" /><path d="M20 5.5A2 2 0 0 0 18 4h-6v15h6a2 2 0 0 1 2 2z" /></>,
  // ---- UI ----
  search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4-4" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  bell: <><path d="M6 16V10a6 6 0 0 1 12 0v6l1.5 2h-15z" /><path d="M10 21h4" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  cap: <><path d="M3 9l9-4 9 4-9 4z" /><path d="M7 11v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4" /><path d="M21 9v4" /></>,
  chart: <><path d="M4 19V5M4 19h16" /><path d="M7 15l3-4 3 2 4-6" /></>,
  trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0z" /><path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3" /><path d="M12 12v4M9 20h6M10 20v-2.5a2 2 0 0 1 4 0V20" /></>,
  warning: <><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17.5v.1" /></>,
  flame: <><path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-1.5.5-2.5 1.5-3.5.3 1 1 1.5 1.5 1.5-.5-3 1-5.5 2-7z" /></>,
  party: <><path d="M4 20l5-13 6 6z" /><path d="M14 4l1 1M18 6l2-1M19 10l1.5.5M15 9l1.5.5" /></>,
  doc: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></>,
  formula: <><path d="M6 4h8l-3 8 3 8H6" /><path d="M6 4l5 8-5 8" /></>,
  plane: <><path d="M3 15c6 0 9-2 13-7 1.5-1.8 3-2.5 4.5-2.5-.5 5-3 9-8 10.5-3 .9-6.5 1-9.5-1z" /></>,
  quiz: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v3H9z" /><path d="M8.5 11l1.5 1.5L13 9M8.5 16l1.5 1.5L13 14" /></>,
  flashcards: <><rect x="3" y="7" width="14" height="12" rx="2" /><path d="M7 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" /></>,
  image: <><rect x="4" y="5" width="16" height="14" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="M5 17l4.5-4.5 3 3L16 11l3 3" /></>,
  check: <><path d="M5 12.5l4.5 4.5L19 6.5" /></>,
  x: <><path d="M6 6l12 12M18 6L6 18" /></>,
  warn: <><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17.5v.1" /></>,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5.9 1 1 1.6h5c.1-.6.4-1.1 1-1.6A6 6 0 0 0 12 3z" /></>,
  pause: <><rect x="7" y="5" width="3.5" height="14" rx="1" /><rect x="13.5" y="5" width="3.5" height="14" rx="1" /></>,
};

export function Icon({ name, size = 20, className = "", strokeWidth = 1.5 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const p = PATHS[name] ?? PATHS.book;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {p}
    </svg>
  );
}

// Subject id → icon name (shared by dashboard, study index, etc.).
export const SUBJECT_ICON: Record<string, string> = {
  "aircraft-technical": "aircraft-technical",
  "air-law": "air-law",
  "flight-planning": "flight-planning",
  "human-performance": "human-performance",
  "flight-instruments": "flight-instruments",
  "meteorology": "meteorology",
  "navigation": "navigation",
  "radio-navigation": "radio-navigation",
  "mass-and-balance": "mass-and-balance",
  "principles-of-flight": "principles-of-flight",
};
