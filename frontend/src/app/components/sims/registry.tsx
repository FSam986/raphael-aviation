"use client";

// Interactive topic simulators. Each sim is code-split (dynamic import, client
// only) so it loads ONLY on the topic page that uses it — no weight on the rest
// of the app. One sim usually serves several related syllabus sections.

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

function Loading() {
  return (
    <div className="h-72 flex items-center justify-center text-zinc-600 text-sm">
      Loading simulator…
    </div>
  );
}

const d = (loader: () => Promise<{ default: ComponentType }>) =>
  dynamic(loader, { ssr: false, loading: Loading });

export interface SimDef {
  id: string;
  title: string;
  blurb: string;
  Component: ComponentType;
}

// Simulator definitions.
const SIMS: Record<string, SimDef> = {
  aerofoil: {
    id: "aerofoil",
    title: "Angle of Attack, Lift & the Stall",
    blurb: "Change the angle of attack and watch the airflow, the lift vector and the lift curve — until the wing stalls.",
    Component: d(() => import("./AerofoilSim")),
  },
  fourstroke: {
    id: "fourstroke",
    title: "The Four-Stroke Piston Engine",
    blurb: "Drive the Otto cycle stroke by stroke — valves, spark, pressure and power.",
    Component: d(() => import("./FourStrokeSim")),
  },
  pumps: {
    id: "pumps",
    title: "Pumps — Gear, Vane, Piston & Centrifugal",
    blurb: "See how each pump type moves fluid, and why positive-displacement pumps build pressure.",
    Component: d(() => import("./PumpSim")),
  },
  valves: {
    id: "valves",
    title: "Valves — Check, Relief & Selector",
    blurb: "Open and close the valves and watch flow, cracking pressure and relief in action.",
    Component: d(() => import("./ValveSim")),
  },
  // (valves defined above; included in SIMS map)
  massbalance: {
    id: "massbalance",
    title: "Mass & Balance — Loading & the CG Envelope",
    blurb: "Load the aircraft and watch the CG move across the certified envelope in real time.",
    Component: d(() => import("./MassBalanceSim")),
  },
};

// Syllabus section id → one or more sim ids (first is shown by default).
// Shared across PPL/CPL/IR where the topic recurs.
const SECTION_SIM: Record<string, string[]> = {
  // Aerodynamics / Principles of Flight
  "A.1.8": ["aerofoil"], "C.4.1": ["aerofoil"], "11.2": ["aerofoil"], "11.3": ["aerofoil"],
  "11.8": ["aerofoil"], "11.9": ["aerofoil"], "11.12": ["aerofoil"],
  // Piston engine
  "A.1.4": ["fourstroke"], "6.2": ["fourstroke", "valves"], "6.3": ["fourstroke"],
  // Elements & hydraulics — pumps + valves
  "A.1.1": ["pumps", "valves"], "A.1.2": ["pumps", "valves"], "6.4": ["pumps", "valves"],
  // Mass & balance
  "A.4.12": ["massbalance"], "C.4.17": ["massbalance"], "5.5": ["massbalance"],
};

export function simsForSection(sectionId: string): SimDef[] {
  return (SECTION_SIM[sectionId] ?? []).map((k) => SIMS[k]).filter(Boolean);
}
