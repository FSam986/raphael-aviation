// General Radiotelephony (GR1–GR9) flashcards. Authored in-house.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";
import { GR_FLASHCARDS_BOOST } from "@/app/data/gr-flashcards-boost";

const GR_FLASHCARDS_BASE: AirLawFlashcard[] = [
  { id: "GFC-GR1-01", sectionId: "GR1", front: "Ground vs sky vs space wave?", back: "Ground = follows earth's curvature (LF best). Sky = refracted by ionosphere (LF/MF/HF, night). Space = line-of-sight (VHF+).", difficulty: "medium" },
  { id: "GFC-GR1-02", sectionId: "GR1", front: "Frequency vs antenna length?", back: "Higher frequency → shorter wavelength → shorter antenna. Fading = sky + ground wave together; skip distance to first sky-wave return.", difficulty: "medium" },
  { id: "GFC-GR2-01", sectionId: "GR2", front: "VHF band, spacing & range?", back: "≈118–137 MHz; line-of-sight; range grows with height & power. Spacing 25 kHz (8.33 kHz in upper airspace).", difficulty: "medium" },
  { id: "GFC-GR2-02", sectionId: "GR2", front: "Radio licensing?", back: "Any transmitting station needs a station licence AND the operator must be licensed (by the state of registry).", difficulty: "easy" },
  { id: "GFC-GR3-01", sectionId: "GR3", front: "What service does a FIR provide?", back: "Flight information service + alerting service.", difficulty: "easy" },
  { id: "GFC-GR3-02", sectionId: "GR3", front: "Class A / C / G rules?", back: "A = IFR only. C = IFR+VFR; IFR sep from IFR&VFR, VFR sep from IFR + traffic info on other VFR. G = FIS only (uncontrolled).", difficulty: "medium" },
  { id: "GFC-GR4-01", sectionId: "GR4", front: "Emergency VHF frequency & QNH rule?", back: "121.5 MHz. Set QNH before descending below the transition level. Semi-circular cruising rule uses MAGNETIC track.", difficulty: "medium" },
  { id: "GFC-GR4-02", sectionId: "GR4", front: "Special VFR?", back: "A clearance to operate in a control zone — remain VFR outside the CTR until issued, comply with ATC, remain clear of cloud.", difficulty: "medium" },
  { id: "GFC-GR5-01", sectionId: "GR5", front: "When is 'take-off' used?", back: "ONLY to acknowledge a take-off clearance; use 'departure' otherwise. Abandon a take-off with 'Stop immediately'.", difficulty: "medium" },
  { id: "GFC-GR5-02", sectionId: "GR5", front: "Mandatory read-back items?", back: "SSR code, QNH, take-off/landing clearance, level, heading, speed instructions.", difficulty: "hard" },
  { id: "GFC-GR5-03", sectionId: "GR5", front: "Message priority order?", back: "Distress > Urgency > Direction-finding > Flight safety > Meteorological > Flight regularity.", difficulty: "medium" },
  { id: "GFC-GR5-04", sectionId: "GR5", front: "Abbreviated registration call sign?", back: "First letter + last two characters (YRBTA → Y-TA). Flight-number call signs are NOT abbreviated. Solo student prefixes 'Student'.", difficulty: "medium" },
  { id: "GFC-GR5-05", sectionId: "GR5", front: "ATIS / VOLMET / SIGMET?", back: "ATIS = recorded aerodrome info (≥30 min). VOLMET = broadcast of METARs. SIGMET = en-route hazardous weather.", difficulty: "medium" },
  { id: "GFC-GR6-01", sectionId: "GR6", front: "Wake categories & 'Heavy'?", back: "Light <7 t, Medium 7–136 t, Heavy >136 t, Super (A380). 'Heavy' is a suffix on the initial call to tower/approach.", difficulty: "medium" },
  { id: "GFC-GR7-01", sectionId: "GR7", front: "Who files the flight plan; SAR phases?", back: "The pilot-in-command. SAR phases: INCERFA (uncertainty), ALERFA (alert), DETRESFA (distress).", difficulty: "medium" },
  { id: "GFC-GR7-02", sectionId: "GR7", front: "Call-sign suffixes?", back: "Tower (aerodrome), Ground (surface), Approach, Departure/Radar (radar), Control (area), Delivery (clearance), Apron, Information (FIS).", difficulty: "medium" },
  { id: "GFC-GR8-01", sectionId: "GR8", front: "MAYDAY vs PAN PAN?", back: "MAYDAY ×3 = distress (grave/imminent danger). PAN PAN ×3 = urgency (safety concern, no immediate danger). PAN PAN MEDICAL = protected medical transport.", difficulty: "medium" },
  { id: "GFC-GR8-02", sectionId: "GR8", front: "VDF bearing classes?", back: "A ±2°, B ±5°, C ±10°. VDF gives bearings from the aircraft's ordinary VHF transmissions.", difficulty: "medium" },
  { id: "GFC-GR9-01", sectionId: "GR9", front: "Radio failure — squawk & VFR action?", back: "Squawk 7600, transmit blind on the frequency in use. VFR/VMC: continue in VMC, land at the nearest suitable aerodrome, report arrival.", difficulty: "medium" },
  { id: "GFC-GR9-02", sectionId: "GR9", front: "Radio failure — IFR in IMC?", back: "Continue per the current flight plan to the destination navaid; commence the approach at/near the flight-plan ETA (or last acknowledged EAT); land within ~30 min.", difficulty: "hard" },
];

export const GR_FLASHCARDS: AirLawFlashcard[] = [...GR_FLASHCARDS_BASE, ...GR_FLASHCARDS_BOOST];

export function getGRFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return GR_FLASHCARDS.filter((f) => f.sectionId === sectionId);
}
