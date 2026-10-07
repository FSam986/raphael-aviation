// IR Instruments (I.x) flashcards. Comprehensive per-section recall cards from
// standard instrument theory. Shape matches AirLawFlashcard.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const c = (id: string, sectionId: string, front: string, back: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawFlashcard => ({ id, sectionId, front, back, difficulty });

export const IR_INSTRUMENTS_FLASHCARDS: AirLawFlashcard[] = [
  // I.1 Air data instruments
  c("IRIF-I1-1", "I.1", "Which instruments use pitot, and which use static?", "Static feeds altimeter, VSI and the ASI case. Pitot (total pressure) feeds the ASI capsule only. Dynamic = Pt − Ps.", "medium"),
  c("IRIF-I1-2", "I.1", "Blocked pitot vs blocked static on the ASI?", "Blocked pitot: ASI acts like an altimeter (over-reads in climb, under-reads in descent). Blocked static: ASI under-reads in climb, over-reads in descent; altimeter freezes.", "hard"),
  c("IRIF-I1-3", "I.1", "Altimeter settings QNH/QFE/QNE?", "QNH reads altitude AMSL; QFE reads height above the datum (0 on the ground); QNE = 1013.25 for flight levels. 1 hPa ≈ 30 ft.", "medium"),
  c("IRIF-I1-4", "I.1", "VSI principle and lag; IVSI?", "Static feeds a capsule plus a metered leak to the case; the pressure difference = rate. Inherent lag ~6–9 s; the IVSI adds an accelerometer pump for an instantaneous reading.", "medium"),
  c("IRIF-I1-5", "I.1", "'High to low, look out below' means?", "Flying into lower pressure (or colder air) with a fixed setting, the altimeter OVER-reads → true altitude is LOWER than indicated.", "medium"),
  // I.2 Gyroscopic instruments
  c("IRIF-I2-1", "I.2", "Two gyro properties?", "Rigidity in space (resists disturbance, ∝ RPM × mass at rim) and precession (a force acts 90° round in the direction of rotation).", "medium"),
  c("IRIF-I2-2", "I.2", "Real vs apparent wander of a DG?", "Real wander = mechanical (bearing friction). Apparent wander = earth rotation & transport; drift ≈ 15 × sin(latitude) °/hr (0 at equator, 15 at pole).", "hard"),
  c("IRIF-I2-3", "I.2", "Attitude indicator errors?", "Small acceleration and turn errors from pendulous erection: on a rapid acceleration the AI shows a slight climb & right bank (and the reverse on deceleration).", "hard"),
  c("IRIF-I2-4", "I.2", "Turn indicator: rate 1 and bank rule?", "Rate 1 = 3°/sec → 360° in 2 min. Bank angle for rate 1 ≈ (TAS ÷ 10) + 7. Turn coordinator senses roll and yaw.", "medium"),
  c("IRIF-I2-5", "I.2", "AHRS?", "Attitude & Heading Reference System — solid-state (ring-laser / MEMS) replaces spinning gyros, feeding attitude and heading to the EFIS.", "medium"),
  // I.3 HSI
  c("IRIF-I3-1", "I.3", "What is an HSI and what does it combine?", "Horizontal Situation Indicator: a DG/compass card combined with a VOR/ILS course deviation display — heading, selected course, CDI, TO/FROM and glide slope in one instrument.", "medium"),
  c("IRIF-I3-2", "I.3", "HSI advantage over a separate DI + CDI?", "The course arrow rotates with the compass card, so deviation is shown relative to the aircraft — no mental reversal on reciprocal headings.", "medium"),
  c("IRIF-I3-3", "I.3", "HSI course bar sensing?", "Fly toward the deviation bar to regain the selected course; the head/tail of the course arrow shows TO/FROM the station.", "medium"),
  // I.4 EFIS
  c("IRIF-I4-1", "I.4", "PFD vs ND?", "PFD (Primary Flight Display) shows attitude, air data, and flight-director command bars. ND (Navigation Display) shows map/track, weather and traffic.", "medium"),
  c("IRIF-I4-2", "I.4", "EFIS data sources?", "Air Data Computer (ADC), AHRS/IRS for attitude & heading, and the FMS/nav radios for navigation. Displays are reconfigurable on failure.", "medium"),
  c("IRIF-I4-3", "I.4", "EFIS colour conventions?", "Magenta = active FD/selected; green = engaged/normal; amber/yellow = caution; red = warning/limit; white = current data; cyan = sky/selected.", "medium"),
  // I.5 Flight director
  c("IRIF-I5-1", "I.5", "What does a flight director do?", "Computes pitch/roll commands for the selected mode and shows them as command bars (or a V-bar); the pilot (or autopilot) flies the aircraft to satisfy the bars.", "medium"),
  c("IRIF-I5-2", "I.5", "FD command bars vs autopilot?", "The FD only advises (command bars); the autopilot actually moves the controls to follow the same commands. You can fly the FD manually.", "medium"),
  c("IRIF-I5-3", "I.5", "Typical FD modes?", "Lateral: HDG, NAV/VOR, LOC, APR. Vertical: ALT hold, V/S, IAS, ALT capture, G/S.", "medium"),
  // I.6 Autopilot
  c("IRIF-I6-1", "I.6", "Autopilot axes?", "Single-axis (roll / wing-leveller), two-axis (roll + pitch), three-axis (adds yaw). A yaw damper counters Dutch roll.", "medium"),
  c("IRIF-I6-2", "I.6", "Autopilot loop: sensing → ?", "Sensing (attitude/air data/nav) → computer → servo actuators move the controls; the pilot can always override or disconnect.", "medium"),
  c("IRIF-I6-3", "I.6", "Lateral vs vertical autopilot modes?", "Lateral (roll): HDG, NAV, LOC, APR. Vertical (pitch): ALT, V/S, IAS, ALT capture, G/S.", "medium"),
  // I.7 Radio altimeter
  c("IRIF-I7-1", "I.7", "Radio altimeter band and principle?", "FM-CW in the SHF band 4200–4400 MHz (±50 MHz sweep). Height is derived from the frequency difference between the transmitted sweep and its ground reflection.", "medium"),
  c("IRIF-I7-2", "I.7", "Radio altimeter range and what it reads?", "0–2500 ft; reads the height of the lowest wheels above the ground directly below. Above 2500 ft the pointer masks. Feeds GPWS and autoland.", "medium"),
  c("IRIF-I7-3", "I.7", "Radio altimeter errors?", "Mushing error (antennas too far apart) and leakage error (too close) — antenna spacing balances the two.", "hard"),
  // I.8 Proximity & warning systems
  c("IRIF-I8-1", "I.8", "GPWS vs TAWS?", "GPWS warns of terrain closure using the radio altimeter (modes 1–7). TAWS/EGPWS adds a terrain database + GPS for a forward-looking, predictive picture.", "medium"),
  c("IRIF-I8-2", "I.8", "TCAS/ACAS — TA vs RA?", "TCAS uses transponder replies to detect traffic. A Traffic Advisory (TA) alerts; a Resolution Advisory (RA) commands a vertical manoeuvre — follow the RA, it is coordinated between aircraft.", "medium"),
  c("IRIF-I8-3", "I.8", "TCAS II RA requirement?", "Both aircraft need Mode C/S transponders; RAs are vertical only and take priority over ATC unless following an RA would be unsafe.", "hard"),
  // I.9 Air temperature
  c("IRIF-I9-1", "I.9", "SAT / RAT / TAT?", "SAT (OAT) = true ambient. RAT = sensed, includes some ram rise. TAT = SAT + full ram rise. TAT = SAT + ram rise; ram rise ≈ (TAS/100)².", "medium"),
  c("IRIF-I9-2", "I.9", "Recovery factor?", "The fraction of the full ram rise the probe actually senses (≈0.8 typical); corrected OAT is needed for TAS and true altitude.", "medium"),
  // I.10 Magnetism
  c("IRIF-I10-1", "I.10", "Direct-reading compass turning error?", "ANDS — Accelerate North, Decelerate South (on E/W headings). UNOS — Undershoot North, Overshoot South (turning through N/S), in the N hemisphere.", "hard"),
  c("IRIF-I10-2", "I.10", "Variation vs deviation?", "Variation = angle between true and magnetic north (isogonals). Deviation = compass error from aircraft magnetism, removed by a compass swing (coefficients A/B/C).", "medium"),
  c("IRIF-I10-3", "I.10", "Dip and where errors are worst?", "The vertical component causes dip; turning/acceleration errors are worst near the magnetic poles (weak horizontal component) and zero at the magnetic equator.", "medium"),
  // I.11 Practical instrument flying
  c("IRIF-I11-1", "I.11", "Control vs performance instruments?", "Control = attitude indicator + power (set attitude/power). Performance = ASI, altimeter, VSI, DG, turn — they show the result of the control inputs.", "medium"),
  c("IRIF-I11-2", "I.11", "Selective radial scan?", "Return to the AI (control) between short glances at the relevant performance instruments; avoid fixation and omission. The AI is the master reference.", "medium"),
  c("IRIF-I11-3", "I.11", "Partial-panel (AI/DG failure)?", "Fly on the remaining instruments — turn coordinator + ASI + altimeter + magnetic compass; use timed turns and known power/attitude settings.", "hard"),
];

export function getIRInstrumentsFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return IR_INSTRUMENTS_FLASHCARDS.filter((f) => f.sectionId === sectionId);
}
