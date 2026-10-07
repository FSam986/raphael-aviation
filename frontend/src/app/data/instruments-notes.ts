// CPL Flight Instruments (A.7.x) study notes. Authored in-house from standard
// instrument theory (the AVEX "Instruments & Electronics" guides are the study
// source, but their text and figures are NOT reproduced here). Shape matches
// AirLawSectionNote so they plug into the subject content registry.

import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

export const INSTRUMENTS_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "A.7.1",
    title: "Air Data Instruments — Pitot-Static, Altimeter, ASI & VSI",
    intro:
      "The pitot-static system feeds three instruments: the altimeter, the airspeed indicator and the vertical speed indicator. All three are pressure instruments, so understanding what pressure each one senses — and what happens when a line blocks or leaks — is the key to the whole topic.",
    blocks: [
      {
        heading: "1. The pitot-static system",
        points: [
          "Pitot (total) pressure = dynamic + static, sensed by the forward-facing pitot hole; static (still air) pressure is sensed at the static vent(s).",
          "Dynamic pressure = pitot − static (Pt − Ps) — this is what drives the ASI capsule.",
          "A static vent on EACH side of the fuselage (static balancing) cancels sideslip/manoeuvre errors — reducing position error.",
          "The alternate static source admits cabin static (slightly below true static in an unpressurised aircraft), used if the normal vent blocks.",
          "Errors: position (pressure) error, and manoeuvre-induced error (random, temporary, uncorrectable).",
        ],
      },
      {
        heading: "2. Altimeter",
        points: [
          "Static pressure is fed to the sealed CASE; the evacuated (partial-vacuum) capsules expand as the aircraft climbs and case pressure falls.",
          "Simple altimeter = one capsule, no subscale (set on the ground only). Sensitive altimeter = 2–3 capsules + barometric subscale. Servo altimeter = E/I inductive pick-off + servo motor, which virtually eliminates time-lag error.",
          "Subscale settings: QNH → reads altitude (amsl); QFE → reads height above the airfield; QNE/1013.25 → reads pressure altitude / flight levels.",
          "1 hPa ≈ 30 ft. Flying HIGH→LOW pressure (or WARM→COLD air) the altimeter OVER-reads (true altitude lower); LOW→HIGH (or COLD→WARM) it UNDER-reads.",
          "Time-lag error: after a rapid descent the altimeter momentarily over-reads. A blocked static freezes the reading.",
          "Altitude alerting warns approaching (~1000 ft to go) and again on departing the selected level by ~250–300 ft.",
        ],
      },
      {
        heading: "3. Airspeed Indicator (ASI)",
        points: [
          "Total pressure to the capsule, static to the case; the capsule measures dynamic pressure → IAS.",
          "IAS → (instrument + position error) → CAS/RAS → (compressibility) → EAS → (density) → TAS.",
          "Colour code: white arc = flap operating range (VS0 to VFE); green arc = normal range (VS1 to VNO); yellow arc = caution (VNO to VNE, smooth air only); red line = VNE; blue line = VYSE (multi).",
          "Blockages: pitot blocked → in level flight IAS unchanged with power, but errs with altitude (climb → over-read, descent → under-read). Static blocked in a climb → under-read; in a descent → over-read. ASI reads zero only if the pitot is blocked AND the pitot line leaks.",
          "Colder/denser air → lower TAS at a given IAS; warmer air → higher TAS. Compressibility makes the ASI over-read (corrected out to give EAS).",
        ],
      },
      {
        heading: "4. Vertical Speed Indicator (VSI)",
        points: [
          "Direct static feeds the capsule; static delayed by a metering choke fills the case, so a pressure differential appears only while altitude is changing — this differential drives the pointer.",
          "In level flight the pressures equalise and the VSI reads zero. Time-lag of 4–12 s before a steady reading; a metering unit (orifice + capillary) compensates temperature.",
          "A blocked static makes the VSI read zero; breaking the glass with a blocked static reverses the indications.",
          "IVSI (instantaneous VSI) adds accelerometer dashpots to give an immediate reading (no lag) — but introduces a turning error under g.",
        ],
      },
    ],
    mustKnow: [
      "Altimeter: static to the sealed case, evacuated capsules expand with climb. 1 hPa ≈ 30 ft.",
      "High→Low pressure / Warm→Cold air ⇒ altimeter OVER-reads (true altitude lower).",
      "ASI chain: IAS → CAS → EAS → TAS (position, then compressibility, then density).",
      "ASI colour code: white VS0–VFE, green VS1–VNO, yellow VNO–VNE, red line VNE, blue VYSE.",
      "VSI: capsule gets direct static, case gets delayed static; reads zero level, blocked static reads zero.",
    ],
    traps: [
      "Saying the altimeter capsule is fed static — it is evacuated; the CASE gets the static.",
      "Confusing which blockage over-reads vs under-reads the ASI — work it from 'trapped pressure vs current real pressure'.",
      "Forgetting a blocked static freezes the ASI/VSI/altimeter rather than sending them to zero (except the VSI, which goes to zero).",
    ],
  },
  {
    sectionId: "A.7.5",
    title: "Temperature Measurement (SAT, RAT, TAT & Ram Rise)",
    intro:
      "Accurate air-temperature measurement underpins true airspeed, density-altitude and performance calculations. Because a moving aircraft compresses and heats the air it flies through, what a probe reads is not the true (static) temperature — you must understand ram rise and the recovery factor to interpret it.",
    blocks: [
      {
        heading: "1. The three temperatures",
        points: [
          "SAT (Static Air Temperature) — also OAT/free-air temperature: the true temperature of the undisturbed air, with no ram rise. This is the value used for TAS and performance.",
          "RAT (Ram Air Temperature): SAT plus a proportion of the ram rise — the proportion set by the probe's recovery factor (typically 0.75–0.90).",
          "TAT (Total Air Temperature), also IOAT: SAT plus 100% of the ram rise. A probe reads TAT when its recovery factor is 1.00.",
          "So: TAT = RAT when recovery factor = 1.00; and RAT = SAT when the aircraft is stationary (or below about Mach 0.3, where ram rise is negligible).",
        ],
      },
      {
        heading: "2. Ram rise & recovery factor",
        points: [
          "Ram rise is the temperature increase from adiabatic compression as air is brought to rest on the probe; it grows with speed and is negligible below ~Mach 0.30.",
          "Quick estimate: Ram rise (°C) ≈ (TAS/100)², with TAS in knots — e.g. 250 kt → ≈ 6.25 °C, 300 kt → ≈ 9 °C.",
          "Because the indicated temperature is higher than SAT, ram rise is always SUBTRACTED to recover SAT.",
          "Recovery factor is how much of the ram rise a probe senses: a Rosemount probe ≈ 1.00 (reads TAT); a Lewis flush bulb ≈ 0.75–0.90 (reads RAT).",
        ],
      },
      {
        heading: "3. Thermometer types",
        points: [
          "Bi-metallic (direct-reading): two bonded metals of different expansion coefficients form a helix that coils/uncoils with temperature, driving a pointer — simple, cockpit-window mounted, shielded from solar radiation.",
          "Bourdon tube: a curved liquid/gas-filled tube that straightens as the sensed fluid expands with temperature (also used for pressure).",
          "Electrical (resistance) thermometer: a platinum or nickel element whose resistance rises with temperature, measured by a Wheatstone bridge — the basis of most modern SAT systems.",
        ],
      },
    ],
    mustKnow: [
      "SAT = true/static temperature (used for TAS); RAT = SAT + part of ram rise; TAT = SAT + all of ram rise.",
      "TAT = RAT only when the recovery factor = 1.00.",
      "Ram rise ≈ (TAS/100)² °C, and it is subtracted to obtain SAT.",
      "Bi-metallic = differential metal expansion; electrical thermometer = change of resistance with temperature (Wheatstone bridge).",
    ],
    traps: [
      "Adding ram rise instead of subtracting it — the indicated value is already too high.",
      "Assuming RAT equals TAT for any probe — only true when recovery factor = 1.00.",
      "Ignoring ram rise at low speed is fine, but not above ~Mach 0.30.",
    ],
  },
  {
    sectionId: "A.7.2",
    title: "Gyroscopic Instruments — Gyro, DG, Artificial Horizon, Turn & Slip, Compasses",
    intro:
      "Three cockpit instruments run on a spinning gyroscope: the directional gyro (heading), the artificial horizon (attitude) and the turn indicator (rate of turn). Master the two gyro properties — rigidity and precession — and the rest follows: which gyro each instrument uses, why it wanders, and how it errs in turns and accelerations.",
    blocks: [
      {
        heading: "1. The two gyro properties",
        points: [
          "Rigidity (gyroscopic inertia): a spinning gyro resists any change to its spin-axis direction. Rigidity ∝ rotor mass (at the rim) × rotor RPM.",
          "Precession: a force applied to a spinning gyro takes effect 90° round the rotor in the direction of spin. Precession rate ∝ applied force, and inversely ∝ rotor speed & inertia.",
          "Wander: DRIFT is movement of the spin axis in the horizontal plane; TOPPLE is movement in the vertical plane.",
          "Real wander = random mechanical forces (bearing friction/wear). Apparent wander = the gyro appearing to move because the EARTH rotates (and 'transport wander' from the aircraft moving over the earth).",
        ],
      },
      {
        heading: "2. Directional Gyro (DG) — a tied horizontal-axis gyro (2 gimbals)",
        points: [
          "Rotor ~10 000 RPM, ±55° of gimbal freedom; holds a heading by rigidity — it cannot find north, so it is set and re-synchronised from the compass.",
          "Apparent drift (earth rate) = 15°/hr × sin(latitude): 0 at the equator, 15°/hr at the pole, clockwise (increasing) in the N hemisphere. The latitude rider/nut applies a torque to cancel it at a chosen latitude.",
          "Transport wander adds when tracking east/west (changes longitude). Real wander is removed only by re-setting to the magnetic compass.",
        ],
      },
      {
        heading: "3. Artificial Horizon (AH) — an earth (tied vertical-axis) gyro",
        points: [
          "Spin axis is held VERTICAL by rigidity, tied to the true vertical by a pendulous/mercury erection system. Outer gimbal pivots fore-aft (gives ROLL), inner gimbal pivots laterally (gives PITCH).",
          "ACCELERATION error: the pendulous erector is thrown back, precessing the gyro to show a false CLIMB and false RIGHT bank (deceleration → false descent + left bank).",
          "TURN error: pendulous + erection errors combine, maximum around 180° of a sustained turn, back to zero by 360°.",
        ],
      },
      {
        heading: "4. Turn & Slip / Turn Coordinator — a rate gyro (1 gimbal)",
        points: [
          "A horizontal-axis RATE gyro with one plane of freedom, deliberately run at LOWER RPM (low rigidity) so it precesses with the turn; a spring balances the precession, so the tilt indicates rate of turn.",
          "The needle shows RATE and DIRECTION of turn; the BALL is a separate gravity/inertia device showing slip/skid (step on the ball). A low rotor speed makes the turn needle UNDER-read; the ball is unaffected.",
          "Rate one = 3°/sec = 360° in 2 minutes. Rate-one bank ≈ (TAS/10) + 7 (e.g. 120 kt → ~18°).",
        ],
      },
      {
        heading: "5. Magnetic & remote-indicating compasses",
        points: [
          "Direct compass needs horizontality (CG below the pivot → residual dip ~2°), sensitivity (2–4 short magnets in damping fluid) and aperiodicity (settles without oscillation).",
          "Acceleration error (E/W headings only): 'ANDS' — Accelerate North, Decelerate South (N hemisphere; reversed in the S). Turning error (through N/S): N hemisphere UNOS — Undershoot North, Overshoot South (S hemisphere ONUS).",
          "Deviation = aircraft magnetism (hard + soft iron); corrected by a compass swing. Coefficient A (constant, all headings, micro-adjuster), B (max E/W, = (dev E−dev W)/2), C (max N/S, = (dev N−dev S)/2).",
          "Remote-indicating (slaved gyro) compass: a flux valve (detector) senses the earth's field → error detector compares it with the DG → torque motor slaves the DG to magnetic north, giving a steady, turning-error-free heading.",
        ],
      },
    ],
    mustKnow: [
      "Rigidity ∝ RPM × inertia; precession is 90° round in the spin direction and INVERSELY ∝ RPM.",
      "DG apparent drift = 15·sin(lat)°/hr; corrected by the latitude rider, re-set from the compass.",
      "AH: acceleration → false climb + right bank; outer gimbal = roll, inner gimbal = pitch.",
      "Compass: ANDS (accel N, decel S) on E/W; turning error UNOS (N hemi) / ONUS (S hemi).",
      "Turn needle = rate + direction; ball = slip/skid. Low RPM → turn needle under-reads.",
    ],
    traps: [
      "Saying a faster gyro precesses faster — it precesses SLOWER (more rigid).",
      "Mixing drift (horizontal) and topple (vertical), or real (mechanical) and apparent (earth) wander.",
      "Forgetting acceleration error is on E/W headings and turning error is through N/S.",
    ],
  },
  {
    sectionId: "A.7.3",
    title: "Flight Director & EFIS (ADI/HSI, PFD/ND, EADI)",
    intro:
      "The flight director computes the pitch and roll manoeuvre needed to fly a selected path and shows it as command bars on the ADI; EFIS puts the same information onto electronic PFD/ND screens. The exam tests what each display shows, the standard colours, and the failure/comparator logic.",
    blocks: [
      {
        heading: "1. Flight Director (FD)",
        points: [
          "The FD computer drives command bars on the ADI (Attitude Director Indicator). Fly the aircraft symbol INTO the bars: bars up → pitch up, bars right → bank right.",
          "It is independent of the autopilot (computer + command bars only). Modes: heading hold, VOR/LOC (roll), ALT/GS (pitch), GA. 'LOC ARM' = armed, couples on centre-line capture.",
          "Heading capture uses track deviation, its rate of closure and the rate of change of closure for a smooth, damped capture.",
        ],
      },
      {
        heading: "2. HSI (Horizontal Situation Indicator)",
        points: [
          "A slaved compass card (from a remote gyro/flux valve) with a course pointer/CDI and a glide-slope pointer — combines heading, VOR/ILS deviation and TO/FROM in one picture.",
          "Each CDI dot ≈ 2° on VOR (full scale ~10°/5 dots); the localiser is more sensitive. Beyond 90° from the selected course the LOC sense reverses (for back-course).",
        ],
      },
      {
        heading: "3. EFIS — PFD / ND / EADI, symbol generators & comparator",
        points: [
          "PFD (Primary Flight Display) = the main flying instrument: attitude, speed tape, altitude tape, QNH, vertical speed, heading, FD bars and the FMA mode strip along the top.",
          "ND (Navigation Display): map/route, weather radar (MAP and expanded VOR/ILS modes), traffic.",
          "Symbol Generators (SG) build the pictures; a standby 3rd SG can be selected if one fails; the Instrument Comparator Unit (ICU) monitors the two pilots' displays for pitch/roll/heading/track disagreement.",
        ],
      },
      {
        heading: "4. Standard EFIS colours & the radio-altitude display",
        points: [
          "MAGENTA (pink) = command/'fly-to' information and pointers; GREEN = engaged/normal; CYAN/white = reference & scales; AMBER = caution; RED = warning.",
          "Radio altitude on the EADI: blank above 2500 ft, digital 2500→1000 ft, then a white ring below 1000 ft; at DH the marker changes magenta→amber. The DH is set in the ADI section of the MCP.",
        ],
      },
    ],
    mustKnow: [
      "Fly the aircraft symbol INTO the FD command bars (bars up = pitch up, bars right = bank right).",
      "PFD = primary flying display (attitude/speed/altitude/QNH/FD/FMA); ND = map/WXR/traffic.",
      "Magenta = command information; the ICU compares the two pilots' displays.",
      "Radio altitude shows below 2500 ft; blank above.",
    ],
    traps: [
      "Thinking the FD needs the autopilot — it is independent.",
      "Confusing PFD (flying) with ND (navigation).",
      "Forgetting the localiser sense reverses beyond 90° from the selected course.",
    ],
  },
  {
    sectionId: "A.7.6",
    title: "Autopilot & Auto-throttle",
    intro:
      "An autopilot stabilises the aircraft (inner loop, about the CG) and guides its path (outer loop, the CG through space). Learn the loop structure, the mode families, the auto-trim role and the fail-operational/passive landing categories.",
    blocks: [
      {
        heading: "1. Loops, axes & basic modes",
        points: [
          "Single-axis = wing leveller (roll); two-axis adds pitch; three-axis adds yaw (yaw damper). Inner (stabilisation) loop is CLOSED (feedback); outer loop provides guidance.",
          "Stabilisation (inner) modes: pitch-attitude hold, wings-level, yaw damping. Guidance (outer) modes: heading/track hold, altitude hold, VS, IAS/Mach hold, VOR/LOC/GS capture.",
          "CWS/Touch Control Steering: the crew manoeuvres in pitch/roll with the AP still engaged; on release it holds the new attitude.",
        ],
      },
      {
        heading: "2. Auto-trim & the speed/altitude split",
        points: [
          "Auto-trim (pitch axis) offloads the elevator hinge moment and the servo, so the aircraft is left trimmed and there is no out-of-trim jerk on disengagement.",
          "In a climb the AP holds SPEED with pitch and the autothrottle sets thrust; in altitude/glide-path hold the autothrottle holds the speed. Altitude hold references static pressure directly — changing the subscale does not move the aircraft.",
          "Mach trim (above a set Mach) adds nose-up to counter the aft CP shift (Mach tuck).",
        ],
      },
      {
        heading: "3. Autoland categories & auto-throttle",
        points: [
          "Fail-passive (fail-soft): a failure disconnects without a significant out-of-trim — the pilot then lands manually. Fail-operational (fail-survival): a single failure leaves the autoland function intact (needs dual/triple redundancy).",
          "Full autoland keeps the AP + autothrottle engaged through the flare (thrust retard ~30–50 ft), touchdown and roll-out; CAT II/III decision heights use the radio altimeter.",
          "Auto-throttle holds a thrust target (N1/EPR) or a speed target (IAS/Mach); its mode is shown on the FMA. TO/GA on the thrust levers commands the go-around.",
        ],
      },
    ],
    mustKnow: [
      "Inner loop = stabilisation (attitude, about the CG, closed loop); outer loop = guidance (path).",
      "Auto-trim is on the pitch axis: leaves the aircraft trimmed for a jerk-free disconnect.",
      "Fail-passive → pilot lands after failure; fail-operational → autoland survives one failure.",
      "Altitude hold uses static pressure directly; changing the subscale does not climb/descend.",
    ],
    traps: [
      "Confusing which loop (stabilisation vs guidance) a mode belongs to.",
      "Thinking a subscale change in altitude hold makes the aircraft climb — it does not.",
      "Mixing fail-passive and fail-operational.",
    ],
  },
  {
    sectionId: "A.7.7",
    title: "Magnetism — Terrestrial & Aircraft, the Magnetic Compass",
    intro:
      "The compass points to magnetic north because of the earth's horizontal field component (H). Understand how the field changes with latitude, how the aircraft's own magnetism (deviation) is measured and corrected, and the acceleration/turning errors that make the compass unreliable when manoeuvring.",
    blocks: [
      {
        heading: "1. The earth's field",
        points: [
          "Total field T splits into a horizontal component H (the DIRECTIVE force that aligns the compass) and a vertical component Z. Dip is the angle T makes with the horizontal.",
          "H is greatest at the magnetic EQUATOR (dip 0°, aclinic line) and zero at the poles; Z is greatest at the poles. So a compass is least reliable near the poles.",
          "Lines: isogonals join equal VARIATION (agonic = zero variation); isoclinals join equal DIP; isodynes join equal H. Secular change = slow westerly drift of the poles (~960-yr cycle).",
        ],
      },
      {
        heading: "2. Variation & deviation",
        points: [
          "VARIATION = angle between true and magnetic north (converts True↔Magnetic). 'Variation West, magnetic Best (add); Variation East, magnetic least (subtract)'.",
          "DEVIATION = the aircraft's own magnetism deflecting the compass (converts Magnetic↔Compass). 'Deviation West, compass Best'.",
          "Hard iron = permanent magnetism (retained). Soft iron = temporary, magnetised by the earth's field. Deviation is measured and minimised by a compass SWING.",
        ],
      },
      {
        heading: "3. Coefficients A, B, C",
        points: [
          "A = constant deviation on ALL headings (misalignment) — corrected mechanically (micro-adjuster).",
          "B = varies as sine heading, maximum on E/W: B = (dev E − dev W)/2.",
          "C = varies as cosine heading, maximum on N/S: C = (dev N − dev S)/2.",
          "Deviation on any heading ≈ A + B·sin(hdg) + C·cos(hdg).",
        ],
      },
      {
        heading: "4. Compass turning & acceleration errors",
        points: [
          "Acceleration error (E/W headings): 'ANDS' — Accelerate shows a turn to North, Decelerate to South (N hemisphere; reversed in the S).",
          "Turning error (through N/S): N hemisphere 'UNOS' — Undershoot North, Overshoot South; S hemisphere 'ONUS'. Roll out early/late accordingly.",
          "Both errors come from the pendulous magnet assembly and are worst at high latitude/steep bank, zero at the magnetic equator.",
        ],
      },
    ],
    mustKnow: [
      "H (directive force) is max at the magnetic equator, zero at the poles.",
      "Variation West → add to true to get magnetic; deviation West → compass Best.",
      "Coefficient B max on E/W = (dev E−dev W)/2; C max on N/S = (dev N−dev S)/2.",
      "ANDS (accelerate North, decelerate South); UNOS (N hemi) / ONUS (S hemi) turning error.",
    ],
    traps: [
      "Swapping variation (true↔magnetic) with deviation (magnetic↔compass).",
      "Mixing hard iron (permanent) and soft iron (induced).",
      "Forgetting acceleration error is E/W and turning error is through N/S.",
    ],
  },
  {
    sectionId: "A.7.8",
    title: "Stall Warning & Protection; GPWS/TAWS & TCAS",
    intro:
      "This aspect groups the safety-net warning systems: the stall warner (angle-of-attack based), the ground proximity warning system (GPWS/TAWS) and the traffic collision avoidance system (TCAS). Learn what each senses, its warning envelope and its standard aural calls.",
    blocks: [
      {
        heading: "1. Stall warning & protection",
        points: [
          "Stall warning is based on ANGLE OF ATTACK (not airspeed), plus configuration (flap/slat). Simple aircraft: a leading-edge vane/reed. Transport: a stick shaker (and stick pusher for protection).",
          "The warning is set to give ~7% margin above the stall speed; alpha (AoA) probes are vane-type or differential-pressure conical probes, heated, on the forward fuselage.",
        ],
      },
      {
        heading: "2. GPWS / TAWS",
        points: [
          "Active on RADIO height between about 50 ft and 2500 ft. Inputs: radio altimeter, ADC (vertical speed/Mach), glide-slope deviation, gear/flap position.",
          "Modes & calls: 1 excessive descent rate ('SINK RATE' → 'PULL UP'); 2 excessive terrain closure ('TERRAIN'); 3 altitude loss after take-off/GA ('DON'T SINK'); 4 unsafe terrain clearance/not landing configured ('TOO LOW'); 5 glide-slope deviation ('GLIDESLOPE').",
          "Enhanced GPWS/TAWS adds a terrain database for predictive/look-ahead warnings.",
        ],
      },
      {
        heading: "3. TCAS (ACAS)",
        points: [
          "TCAS interrogates the SSR TRANSPONDERS of nearby aircraft — it cannot see non-transponding traffic. Mode C/S altitude reporting is needed for a vertical resolution.",
          "TCAS I = Traffic Advisory (TA) only. TCAS II = TA + Resolution Advisory (RA), VERTICAL only (climb/descend).",
          "Display symbols: other traffic = hollow diamond; proximate = solid white/cyan diamond; TA = solid amber circle; RA = solid red square. Corrective RA = change vertical speed; preventive RA = don't change it. ACAS never reduces ATC separation.",
        ],
      },
    ],
    mustKnow: [
      "Stall warning is angle-of-attack based, set ~7% above the stall.",
      "GPWS is active 50–2500 ft radio height; know the five modes and their calls.",
      "TCAS uses transponder replies; TCAS II RAs are vertical only.",
      "TCAS symbols: TA = amber circle, RA = red square.",
    ],
    traps: [
      "Saying the stall warner uses airspeed — it uses angle of attack.",
      "Expecting TCAS to protect against non-transponding traffic — it cannot.",
      "Thinking a TCAS RA can command a turn — RAs are vertical only.",
    ],
  },
  {
    sectionId: "A.7.9",
    title: "Powerplant & System Monitoring Instruments",
    intro:
      "Engine and system gauges measure pressure, temperature, RPM, torque, fuel quantity/flow and vibration. Know which sensing element each uses, and the recorder requirements (FDR/CVR).",
    blocks: [
      {
        heading: "1. Pressure & temperature sensing",
        points: [
          "Pressure elements by range: aneroid capsule (low, e.g. manifold/intake absolute pressure) → bellows (medium) → Bourdon tube (high, e.g. oil pressure). MAP is absolute manifold pressure.",
          "Temperature: resistance thermometers (Wheatstone bridge) for air/oil; THERMOCOUPLES (two dissimilar metals) for high temperatures — CHT and EGT/turbine gas temperature. EGT is sensed at the turbine outlet; a ratiometer indicator is independent of supply voltage.",
          "EPR = turbine (exhaust) pressure ÷ compressor inlet pressure — proportional to thrust. N1 (fan) or EPR are the thrust-setting parameters.",
        ],
      },
      {
        heading: "2. RPM, torque, fuel & vibration",
        points: [
          "Tachometers: electronic (phonic/notched wheel + magnetic pickup, counts pulse frequency) or AC-generator (frequency ∝ RPM, drives a drag-cup) — AC types are self-powered and insensitive to line resistance.",
          "Torque: hydro-mechanical (oil pressure reacting the fixed gear of the reduction gearbox). Vibration: accelerometers, amplified and filtered.",
          "Fuel quantity: float gauge reads VOLUME (affected by attitude/accel/temperature); CAPACITANCE gauge reads MASS (fuel's dielectric tracks density) and is largely independent of temperature/attitude — used on transports. Mass flowmeter accounts for density.",
        ],
      },
      {
        heading: "3. Recorders (FDR / CVR)",
        points: [
          "FDR retains at least the last 25 hours; CVR the last 30 minutes. Both are mounted as far aft as practicable (survivability), crash- and fire-protected, and start recording before the aircraft can move under its own power.",
          "CVR channels record R/T, cockpit area mic (ambient + alarms), interphone and PA; ECAM/EICAS centralise the monitoring, warnings and system synoptics.",
        ],
      },
    ],
    mustKnow: [
      "Pressure elements by range: aneroid (low) → bellows (medium) → Bourdon (high).",
      "Thermocouples (dissimilar metals) for EGT/CHT; resistance thermometers for air/oil.",
      "Capacitance fuel gauge reads MASS (temperature-independent); float gauge reads volume.",
      "FDR ≥ 25 h, CVR ≥ 30 min, mounted as far aft as practicable.",
    ],
    traps: [
      "Using a Bourdon tube for low pressures — it is for high pressures.",
      "Saying a capacitance gauge reads volume — it reads mass.",
      "Confusing EPR (pressure ratio) with N1 (fan speed) as the thrust parameter.",
    ],
  },
];

export function getInstrumentsNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return INSTRUMENTS_NOTES.find((n) => n.sectionId === sectionId);
}
