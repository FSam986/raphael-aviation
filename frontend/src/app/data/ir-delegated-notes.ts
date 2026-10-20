// IR study-note delegation. The IR Radio Navigation, Instruments and Human
// Performance syllabi re-group the same material as the CPL subjects, so rather
// than duplicate content we MAP each IR section to the CPL section(s) that cover
// it and reuse the (deep) CPL study notes. Questions/flashcards for these IR
// subjects already have their own banks; only the notes were missing.

import { getRadioNavNoteBySection } from "@/app/data/radionav-notes";
import { getInstrumentsNoteBySection } from "@/app/data/instruments-notes";
import { getHumanPerformanceNote } from "@/app/data/human-performance-notes";
import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

type NoteGetter = (id: string) => AirLawSectionNote | undefined;

// Authored notes for IR sections with no clean CPL equivalent.
const AUTHORED: Record<string, AirLawSectionNote> = {
  "C.2.6": {
    sectionId: "C.2.6", title: "Airborne Weather Radar",
    intro: "Airborne weather radar is an active primary radar that paints precipitation ahead of the aircraft so the crew can avoid the worst weather.",
    blocks: [{ heading: "1. Principle & use", points: [
      "It transmits pulses (typically in the X-band, ~9 GHz) from a stabilised dish in the nose; energy reflected by precipitation (the larger the water droplets, the stronger the return) is painted on the display, colour-coded by intensity (green→yellow→red→magenta).",
      "TILT is used to scan the weather at different heights and to avoid ground returns; GAIN adjusts sensitivity. The radar detects precipitation, not cloud or clear-air turbulence — dry (frozen) hail or turbulence in cloud may give weak returns.",
      "ATTENUATION: heavy rain close in absorbs the beam and can hide stronger weather behind it ('radar shadow'/the attenuation trap). Avoid the strongest returns and sharp gradients by a wide margin.",
    ] }],
    mustKnow: ["Paints precipitation by droplet size; red/magenta = heaviest.", "Use tilt to scan height and avoid ground returns.", "Attenuation can hide severe weather behind heavy rain.", "It does not detect dry turbulence or thin cloud."],
    traps: ["A weak return behind a strong one may be attenuation, not weak weather — give it a wide berth."],
  },
  "C.2.7": {
    sectionId: "C.2.7", title: "Secondary Surveillance Radar (SSR) & Transponder",
    intro: "SSR interrogates an aircraft transponder which replies with a coded signal, giving ATC identity and (in Mode C/S) altitude without relying on a skin echo.",
    blocks: [{ heading: "1. Modes, codes & principle", points: [
      "The ground interrogates on 1030 MHz; the transponder replies on 1090 MHz. Mode A gives the 4-digit identity (squawk) code; Mode C adds pressure altitude; Mode S is selective, data-linked and underlies ACAS/ADS-B.",
      "Special codes: 7500 = unlawful interference (hijack), 7600 = radio communications failure, 7700 = general emergency; 2000 is a common conspicuity code.",
      "Advantages over primary radar: a strong coded reply (no weak skin echo), positive identification, and altitude read-out. The IDENT button highlights the return when ATC asks you to 'squawk ident'.",
    ] }],
    mustKnow: ["Interrogate 1030 MHz, reply 1090 MHz.", "Mode A = identity, Mode C = altitude, Mode S = selective/data-link.", "7500 hijack, 7600 radio failure, 7700 emergency.", "SSR gives positive ID and altitude without a skin echo."],
    traps: ["7500/7600/7700 — know the order: unlawful interference, radio failure, emergency."],
  },
  "I.7": {
    sectionId: "I.7", title: "Radio Altimeter",
    intro: "The radio (radar) altimeter measures the aircraft's actual height above the terrain directly below — not above sea level — for low-level operations and approach.",
    blocks: [{ heading: "1. Principle & use", points: [
      "It transmits a frequency-modulated continuous-wave signal (around 4.3 GHz) straight down; the frequency difference between the transmitted and reflected signal is proportional to the height above the surface.",
      "It reads AGL height, normally over the range 0–2500 ft, and feeds the decision height alert on an ILS, the GPWS/TAWS and the autoland system. A 'bug' sets the DH.",
      "Because it reads height above whatever is below, the reading changes with terrain (hills, buildings) and is only meaningful close to the ground.",
    ] }],
    mustKnow: ["Reads actual height above the terrain (AGL), not altitude above sea level.", "FM-CW around 4.3 GHz; typical range 0–2500 ft.", "Feeds DH alerting, GPWS/TAWS and autoland."],
    traps: ["The radio altimeter reads AGL — it is not corrected to sea level and varies with the terrain below."],
  },
  "I.8": {
    sectionId: "I.8", title: "Proximity & Warning Systems (GPWS/TAWS, TCAS/ACAS)",
    intro: "Terrain and traffic warning systems are the last-line defences against CFIT and mid-air collision.",
    blocks: [{ heading: "1. Terrain (GPWS/TAWS)", points: [
      "GPWS uses radio-altimeter and air-data inputs to warn of dangerous closure with terrain (modes: excessive descent rate, excessive terrain closure, altitude loss after take-off, unsafe terrain clearance not in landing config, excessive glideslope deviation, and the 'minimums' callout).",
      "TAWS (enhanced GPWS) adds a terrain database and position (GPS) to give forward-looking terrain alerts and a terrain display. The correct response to a hard 'PULL UP' is an immediate maximum-performance climb.",
    ] }, { heading: "2. Traffic (TCAS/ACAS)", points: [
      "TCAS/ACAS interrogates nearby transponders. A Traffic Advisory (TA) alerts the crew to conflicting traffic; a Resolution Advisory (RA) commands a vertical manoeuvre (climb/descend) to resolve the conflict — the crew must follow the RA promptly, even against an ATC clearance.",
      "An RA is only generated against Mode C/S transponder-equipped traffic; it provides vertical guidance only, not turns.",
    ] }],
    mustKnow: ["GPWS/TAWS warn of terrain; respond to 'PULL UP' with a maximum climb.", "TCAS TA = advisory; RA = a commanded vertical manoeuvre — follow it, even against ATC.", "TCAS gives vertical guidance only and needs the other aircraft to have a transponder."],
    traps: ["A TCAS RA is followed even if it conflicts with an ATC instruction.", "TCAS cannot see non-transponder traffic and never commands a turn."],
  },
  "I.11": {
    sectionId: "I.11", title: "Principles of Practical Instrument Flying",
    intro: "Instrument flying is flown by a disciplined scan of control and performance instruments, with the attitude indicator as the master reference.",
    blocks: [{ heading: "1. Control vs performance & the scan", points: [
      "CONTROL instruments (attitude indicator and power) set the aircraft's attitude and thrust; PERFORMANCE instruments (ASI, altimeter, VSI, heading, turn coordinator) show the result. You set an attitude and power, then check the performance and trim.",
      "The attitude indicator is the master instrument and the centre of the scan. A selective radial scan returns to it between each performance instrument, avoiding fixation on any one gauge.",
      "Know the failure implications: a blocked pitot/static affects ASI/ALT/VSI; a failed attitude or heading gyro (vacuum loss) is dangerous because the master reference is lost — cross-check with the 'partial-panel' instruments (turn coordinator, ASI, altimeter, compass) and recognise the failure early.",
    ] }],
    mustKnow: ["Control instruments (AI + power) set attitude/thrust; performance instruments show the result.", "The attitude indicator is the master instrument and centre of the scan.", "Avoid fixation — use a selective radial scan.", "Recognise instrument failures (pitot/static, vacuum) and fly partial panel."],
    traps: ["On a vacuum failure the AI and DG are unreliable — revert to partial panel; don't chase the failed master instrument."],
  },
};


// Merge the mapped CPL notes into a single note for the IR section.
function mergeNotes(ids: string[], get: NoteGetter): AirLawSectionNote | undefined {
  const notes = ids.map(get).filter((n): n is AirLawSectionNote => !!n);
  if (!notes.length) return undefined;
  return {
    sectionId: notes[0].sectionId,
    title: notes[0].title,
    intro: notes[0].intro,
    blocks: notes.flatMap((n) => n.blocks),
    mustKnow: notes.flatMap((n) => n.mustKnow),
    traps: notes.flatMap((n) => n.traps),
  };
}

// ---- IR Radio Navigation (C.2.x) → CPL Radio Navigation (A.10.x) ----
const RNV_MAP: Record<string, string[]> = {
  "C.2.1": ["A.10.1"],            // VDF / basic radio
  "C.2.2": ["A.10.2"],            // NDB / ADF
  "C.2.3": ["A.10.3"],            // VOR
  "C.2.4": ["A.10.4"],            // DME
  "C.2.5": ["A.10.3"],            // ILS (with VOR geometry in CPL A.10.3)
  "C.2.6": ["A.10.8"],            // Airborne Weather Radar
  "C.2.7": ["A.10.7"],            // Secondary Radar / Transponder
  "C.2.8": ["A.10.12"],           // GNSS / GPS
};
export function getIRRadioNavNoteBySection(s: string): AirLawSectionNote | undefined {
  return AUTHORED[s] ?? mergeNotes(RNV_MAP[s] ?? [], getRadioNavNoteBySection);
}

// ---- IR Instruments (I.x) → CPL Flight Instruments (A.7.x) ----
const INS_MAP: Record<string, string[]> = {
  "I.1": ["A.7.1"],               // Air Data Instruments
  "I.2": ["A.7.2"],               // Gyroscopic Instruments
  "I.3": ["A.7.2"],               // HSI (heading / gyro)
  "I.4": ["A.7.3"],               // EFIS
  "I.5": ["A.7.6"],               // Flight Director (with autopilot)
  "I.6": ["A.7.6"],               // Autopilot
  "I.9": ["A.7.5"],               // Air Temperature Indicators
  "I.10": ["A.7.7"],              // Magnetism / compass
};
export function getIRInstrumentsNoteBySection(s: string): AirLawSectionNote | undefined {
  return AUTHORED[s] ?? mergeNotes(INS_MAP[s] ?? [], getInstrumentsNoteBySection);
}

// ---- IR Human Performance (H.x) → CPL Human Performance (A.6.x) ----
const HPL_MAP: Record<string, string[]> = {
  "H.1": ["A.6.1"],               // Man & the sensory system
  "H.2": ["A.6.1"],               // Nervous system
  "H.3": ["A.6.1"],               // Vision
  "H.4": ["A.6.1"],               // Hearing
  "H.5": ["A.6.3"],               // Integration / disorientation (psychology)
};
export function getIRHumanPerfNoteBySection(s: string): AirLawSectionNote | undefined {
  return mergeNotes(HPL_MAP[s] ?? [], getHumanPerformanceNote);
}
