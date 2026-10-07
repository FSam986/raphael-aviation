// CPL Flight Instruments (A.7.x) flashcards. Authored in-house from standard
// instrument theory. Shape matches AirLawFlashcard.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

export const INSTRUMENTS_FLASHCARDS: AirLawFlashcard[] = [
  // ── Ch1 Temperature Measurement → A.7.5 ──
  { id: "IFC-A75-01", sectionId: "A.7.5", front: "SAT vs RAT vs TAT?", back: "SAT = true static temperature (no ram rise, used for TAS). RAT = SAT + part of the ram rise (recovery factor 0.75–0.90). TAT = SAT + 100% of the ram rise (recovery factor 1.00).", difficulty: "medium" },
  { id: "IFC-A75-02", sectionId: "A.7.5", front: "When does TAT = RAT?", back: "When the probe's recovery factor = 1.00 (it senses all of the ram rise).", difficulty: "medium" },
  { id: "IFC-A75-03", sectionId: "A.7.5", front: "Quick formula for ram rise?", back: "Ram rise (°C) ≈ (TAS/100)², TAS in knots. It is SUBTRACTED to recover SAT.", difficulty: "medium" },
  { id: "IFC-A75-04", sectionId: "A.7.5", front: "When is ram rise negligible?", back: "Below about Mach 0.30 (and zero when stationary, so RAT = SAT then).", difficulty: "easy" },
  { id: "IFC-A75-05", sectionId: "A.7.5", front: "How does a bi-metallic (direct-reading) thermometer work?", back: "Two bonded metals of different expansion coefficients form a helix that coils/uncoils with temperature, moving a pointer.", difficulty: "medium" },
  { id: "IFC-A75-06", sectionId: "A.7.5", front: "How does an electrical thermometer work?", back: "A platinum/nickel element's resistance rises with temperature; the change is measured by a Wheatstone bridge.", difficulty: "medium" },
  { id: "IFC-A75-07", sectionId: "A.7.5", front: "Aneroid vs pressure capsule vs bellows?", back: "Aneroid = sealed, partial vacuum (measures absolute/low pressure, e.g. altimeter). Pressure capsule = has an opening to a pressure source. Bellows = compares two pressures (medium pressures).", difficulty: "medium" },
  { id: "IFC-A75-08", sectionId: "A.7.5", front: "Thermocouple vs resistance thermometer — where used?", back: "Thermocouple (two dissimilar metals, junction emf) for high temps: EGT, CHT. Resistance thermometer (Wheatstone bridge) for air/oil temps.", difficulty: "medium" },

  // ── A.7.1 Air data ──
  { id: "IFC-A71-01", sectionId: "A.7.1", front: "Which pressure feeds each instrument?", back: "STATIC → altimeter, ASI case, VSI. TOTAL (pitot) → ASI capsule only. Dynamic = total − static.", difficulty: "easy" },
  { id: "IFC-A71-02", sectionId: "A.7.1", front: "Altimeter capsule — sealed or open?", back: "Evacuated (partial vacuum). STATIC pressure is fed to the sealed CASE; the capsule expands as the aircraft climbs.", difficulty: "medium" },
  { id: "IFC-A71-03", sectionId: "A.7.1", front: "QNH / QFE / QNE read what?", back: "QNH → altitude amsl (elevation on the ground). QFE → height above the airfield. QNE (1013) → pressure altitude / flight levels.", difficulty: "easy" },
  { id: "IFC-A71-04", sectionId: "A.7.1", front: "High→Low pressure or Warm→Cold air: altimeter?", back: "OVER-reads — true altitude is LOWER. 'High to Low (or hot to cold), look out below.' 1 hPa ≈ 30 ft.", difficulty: "medium" },
  { id: "IFC-A71-05", sectionId: "A.7.1", front: "Static blocked in a descent — ALT and ASI?", back: "Altimeter FREEZES at the blockage value; ASI OVER-reads (trapped low static).", difficulty: "medium" },
  { id: "IFC-A71-06", sectionId: "A.7.1", front: "Pitot blocked, level flight then climb — ASI?", back: "Level: unchanged with power. Climb: over-reads. Descent: under-reads (acts like an altimeter).", difficulty: "medium" },
  { id: "IFC-A71-07", sectionId: "A.7.1", front: "IAS → TAS chain?", back: "IAS →(+instrument/position) CAS →(+compressibility) EAS →(+density) TAS.", difficulty: "medium" },
  { id: "IFC-A71-08", sectionId: "A.7.1", front: "ASI colour arcs?", back: "White VS0→VFE (flap); Green VS1→VNO (normal); Yellow VNO→VNE (caution); red line VNE; blue line VYSE.", difficulty: "easy" },
  { id: "IFC-A71-09", sectionId: "A.7.1", front: "VSI capsule vs case feed?", back: "Capsule gets DIRECT static; case gets static DELAYED by a metering choke. Differential exists only while altitude changes; blocked static → reads zero.", difficulty: "medium" },

  // ── A.7.2 Gyros & compasses ──
  { id: "IFC-A72-01", sectionId: "A.7.2", front: "Rigidity vs precession?", back: "Rigidity ∝ RPM × inertia (mass at rim). Precession = force effect 90° round in the spin direction, and INVERSELY ∝ RPM.", difficulty: "medium" },
  { id: "IFC-A72-02", sectionId: "A.7.2", front: "Drift vs topple; real vs apparent wander?", back: "Drift = horizontal, topple = vertical. Real wander = mechanical (bearing friction); apparent = earth rotation.", difficulty: "medium" },
  { id: "IFC-A72-03", sectionId: "A.7.2", front: "DG apparent drift formula?", back: "15 × sin(latitude) °/hr — 0 at equator, 15 at pole. Latitude nut cancels it; real wander removed by re-setting to the compass.", difficulty: "medium" },
  { id: "IFC-A72-04", sectionId: "A.7.2", front: "Which gyro: AH, DG, turn indicator?", back: "AH = earth gyro (vertical axis). DG = tied gyro (horizontal axis). Turn indicator = rate gyro (1 gimbal, low RPM).", difficulty: "medium" },
  { id: "IFC-A72-05", sectionId: "A.7.2", front: "AH acceleration error?", back: "Acceleration → false CLIMB + right bank (deceleration → false descent + left bank). Outer gimbal = roll, inner = pitch.", difficulty: "hard" },
  { id: "IFC-A72-06", sectionId: "A.7.2", front: "Turn needle vs ball; low RPM effect?", back: "Needle = rate + direction of turn; ball = slip/skid (step on the ball). Low rotor RPM → turn needle under-reads; ball unaffected.", difficulty: "medium" },
  { id: "IFC-A72-07", sectionId: "A.7.2", front: "Slaved (remote) compass — how it works?", back: "Flux valve senses earth's field → error detector compares with DG → torque motor slaves DG to magnetic north. Turning-error-free.", difficulty: "medium" },

  // ── A.7.3 FD/EFIS ──
  { id: "IFC-A73-01", sectionId: "A.7.3", front: "How do you fly the flight-director bars?", back: "Fly the aircraft symbol INTO the command bars: bars up = pitch up, bars right = bank right. FD is independent of the autopilot.", difficulty: "easy" },
  { id: "IFC-A73-02", sectionId: "A.7.3", front: "PFD vs ND?", back: "PFD = primary flying display (attitude, speed, altitude, QNH, FD bars, FMA). ND = map/route, weather radar, traffic.", difficulty: "easy" },
  { id: "IFC-A73-03", sectionId: "A.7.3", front: "EFIS colour for command information?", back: "MAGENTA (pink) = command/'fly-to'. Green = engaged/normal, amber = caution, red = warning.", difficulty: "medium" },
  { id: "IFC-A73-04", sectionId: "A.7.3", front: "Radio-altitude display range on the EADI?", back: "Shows below 2500 ft (blank above); digital 2500→1000, white ring below 1000; at DH the marker turns amber.", difficulty: "medium" },

  // ── A.7.6 Autopilot ──
  { id: "IFC-A76-01", sectionId: "A.7.6", front: "Inner vs outer autopilot loop?", back: "Inner = stabilisation (attitude, about the CG, CLOSED loop). Outer = guidance (path of the CG through space).", difficulty: "medium" },
  { id: "IFC-A76-02", sectionId: "A.7.6", front: "Autopilot auto-trim — axis & purpose?", back: "Pitch axis: offloads the elevator hinge moment/servo and leaves the aircraft trimmed → no jerk on disengagement.", difficulty: "medium" },
  { id: "IFC-A76-03", sectionId: "A.7.6", front: "Fail-passive vs fail-operational autoland?", back: "Fail-passive: a failure disconnects cleanly, pilot lands. Fail-operational: a single failure leaves autoland intact (redundant).", difficulty: "medium" },
  { id: "IFC-A76-04", sectionId: "A.7.6", front: "Altitude hold + subscale change?", back: "No effect — altitude hold references static pressure directly, so changing the subscale does not climb/descend the aircraft.", difficulty: "hard" },

  // ── A.7.7 Magnetism ──
  { id: "IFC-A77-01", sectionId: "A.7.7", front: "Where is H (directive force) greatest?", back: "At the magnetic EQUATOR (dip 0°); zero at the poles. So the compass is least reliable near the poles.", difficulty: "medium" },
  { id: "IFC-A77-02", sectionId: "A.7.7", front: "Variation vs deviation?", back: "Variation = true↔magnetic (isogonals). Deviation = aircraft magnetism, magnetic↔compass. 'Variation/Deviation West → Best (add).'", difficulty: "medium" },
  { id: "IFC-A77-03", sectionId: "A.7.7", front: "Compass acceleration error?", back: "ANDS on E/W: Accelerate → shows North, Decelerate → shows South (N hemisphere; reversed in S).", difficulty: "medium" },
  { id: "IFC-A77-04", sectionId: "A.7.7", front: "Compass turning error?", back: "Through N/S: UNOS (N hemi) — Undershoot North, Overshoot South; ONUS in the S hemisphere.", difficulty: "medium" },
  { id: "IFC-A77-05", sectionId: "A.7.7", front: "Deviation coefficients A/B/C?", back: "A = constant (all headings, micro-adjuster). B = max E/W = (devE−devW)/2. C = max N/S = (devN−devS)/2.", difficulty: "hard" },

  // ── A.7.8 Warning systems ──
  { id: "IFC-A78-01", sectionId: "A.7.8", front: "Stall warning — sensed on what?", back: "ANGLE OF ATTACK (not airspeed) + configuration; set ~7% above the stall. Stick shaker (warn) / pusher (protect).", difficulty: "medium" },
  { id: "IFC-A78-02", sectionId: "A.7.8", front: "GPWS active range & inputs?", back: "50–2500 ft RADIO height. Inputs: radio altimeter, ADC (VS/Mach), glide-slope, gear/flap. Modes 1-5 (SINK RATE, TERRAIN, DON'T SINK, TOO LOW, GLIDESLOPE).", difficulty: "medium" },
  { id: "IFC-A78-03", sectionId: "A.7.8", front: "TCAS — how it sees traffic; RA type?", back: "Interrogates other aircraft's SSR transponders (blind to non-transponders). TCAS II RAs are VERTICAL only (climb/descend).", difficulty: "medium" },
  { id: "IFC-A78-04", sectionId: "A.7.8", front: "TCAS display symbols?", back: "Other = hollow diamond; proximate = solid white diamond; TA = solid amber circle; RA = solid red square.", difficulty: "medium" },

  // ── A.7.9 Powerplant monitoring ──
  { id: "IFC-A79-01", sectionId: "A.7.9", front: "Pressure elements by range?", back: "Aneroid capsule (low, e.g. MAP/intake) → bellows (medium) → Bourdon tube (high, e.g. oil pressure).", difficulty: "medium" },
  { id: "IFC-A79-02", sectionId: "A.7.9", front: "EPR — what is it, and thrust parameters?", back: "EPR = turbine exhaust pressure ÷ compressor inlet pressure (∝ thrust). Thrust set by N1 (fan) or EPR.", difficulty: "medium" },
  { id: "IFC-A79-03", sectionId: "A.7.9", front: "Float vs capacitance fuel gauge?", back: "Float reads VOLUME (affected by attitude/accel/temperature). Capacitance reads MASS (dielectric tracks density) — temperature-independent, used on transports.", difficulty: "medium" },
  { id: "IFC-A79-04", sectionId: "A.7.9", front: "FDR & CVR retention and location?", back: "FDR ≥ 25 h, CVR ≥ 30 min; mounted as far aft as practicable; crash/fire protected; start before the aircraft moves under its own power.", difficulty: "medium" },
];

export function getInstrumentsFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return INSTRUMENTS_FLASHCARDS.filter((f) => f.sectionId === sectionId);
}
