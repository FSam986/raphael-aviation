"use client";

// Click / tap a figure to open it full screen with zoom (buttons, ctrl/⌘-wheel,
// double-click, pinch on touch screens) and drag-to-pan. Works for raster
// images and inline SVG diagrams alike — the overlay re-renders the same children.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const MIN = 1, MAX = 4, STEP = 0.5;

export function Zoomable({ children, label = "figure" }: { children: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative group">
        <button type="button" onClick={() => setOpen(true)} aria-label={`Enlarge ${label}`} className="block w-full text-left cursor-zoom-in">
          {children}
        </button>
        <button type="button" onClick={() => setOpen(true)} aria-label={`Zoom ${label}`}
          className="absolute top-2 right-2 rounded-lg bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity">
          ⤢ Zoom
        </button>
      </div>
      {open && createPortal(<Viewer onClose={() => setOpen(false)} label={label}>{children}</Viewer>, document.body)}
    </>
  );
}

function Viewer({ children, onClose, label }: { children: ReactNode; onClose: () => void; label: string }) {
  const [scale, setScale] = useState(1);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; l: number; t: number } | null>(null);
  const pinch = useRef<{ d: number; s: number } | null>(null);
  const clamp = (s: number) => Math.min(MAX, Math.max(MIN, Math.round(s * 4) / 4));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setScale((s) => clamp(s + STEP));
      if (e.key === "-") setScale((s) => clamp(s - STEP));
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  // Ctrl/⌘ + wheel (and trackpad pinch) zooms; plain wheel scrolls.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => { if (!e.ctrlKey && !e.metaKey) return; e.preventDefault(); setScale((s) => clamp(s * (e.deltaY < 0 ? 1.15 : 1 / 1.15))); };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const dist = (t: React.TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

  return (
    <div role="dialog" aria-modal="true" aria-label={`Enlarged ${label}`} className="fixed inset-0 z-[9500] bg-black/95 flex flex-col">
      <div className="flex items-center justify-end gap-2 p-3 text-white">
        <button onClick={() => setScale((s) => clamp(s - STEP))} disabled={scale <= MIN} aria-label="Zoom out" className="h-9 w-9 rounded-lg bg-white/10 text-lg disabled:opacity-30">−</button>
        <button onClick={() => setScale(1)} className="h-9 min-w-[3.5rem] rounded-lg bg-white/10 text-sm tabular-nums">{Math.round(scale * 100)}%</button>
        <button onClick={() => setScale((s) => clamp(s + STEP))} disabled={scale >= MAX} aria-label="Zoom in" className="h-9 w-9 rounded-lg bg-white/10 text-lg disabled:opacity-30">+</button>
        <button onClick={onClose} aria-label="Close" className="ml-2 h-9 w-9 rounded-lg bg-white/10 text-lg">✕</button>
      </div>
      <div
        ref={box}
        className="flex-1 overflow-auto select-none"
        style={{ touchAction: scale > 1 ? "pan-x pan-y" : "manipulation", cursor: scale > 1 ? "grab" : "zoom-in" }}
        onDoubleClick={() => setScale((s) => (s > 1 ? 1 : 2))}
        onClick={(e) => { if (e.target === e.currentTarget && scale === 1) onClose(); }}
        onPointerDown={(e) => { if (scale > 1 && e.pointerType === "mouse" && box.current) drag.current = { x: e.clientX, y: e.clientY, l: box.current.scrollLeft, t: box.current.scrollTop }; }}
        onPointerMove={(e) => { const d = drag.current, el = box.current; if (d && el) { el.scrollLeft = d.l - (e.clientX - d.x); el.scrollTop = d.t - (e.clientY - d.y); } }}
        onPointerUp={() => { drag.current = null; }}
        onPointerLeave={() => { drag.current = null; }}
        onTouchStart={(e) => { if (e.touches.length === 2) pinch.current = { d: dist(e.touches), s: scale }; }}
        onTouchMove={(e) => { if (e.touches.length === 2 && pinch.current) setScale(clamp(pinch.current.s * (dist(e.touches) / pinch.current.d))); }}
        onTouchEnd={() => { pinch.current = null; }}
      >
        {/* Width grows with zoom so the scroll container can pan the enlarged figure. */}
        <div className="mx-auto p-4 transition-[width] duration-150" style={{ width: `min(${scale * 100}%, ${scale * 1400}px)` }}>
          <div className="w-full [&_img]:w-full [&_img]:h-auto [&_svg]:w-full [&_svg]:h-auto">{children}</div>
        </div>
      </div>
      <p className="pb-3 text-center text-[11px] text-white/50">Pinch, double-click or use + / − to zoom · drag to move · Esc to close</p>
    </div>
  );
}
