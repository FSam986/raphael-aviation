// PPL Principles of Flight flashcards (11.1–11.13). Authored in-house at PPL
// depth — formula- and number-focused for rapid recall. Section ids match
// ppl-syllabus.ts. Shape matches AirLawFlashcard.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const c = (id: string, sectionId: string, front: string, back: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawFlashcard => ({ id, sectionId, front, back, difficulty });

export const PPL_POF_FLASHCARDS: AirLawFlashcard[] = [
  // 11.1 The Atmosphere
  c("PPOF-111-1", "11.1", "ISA sea-level values?", "Pressure 1013.25 hPa · Temperature +15°C · Density 1.225 kg/m³ · Lapse ≈2°C per 1000 ft to 36 090 ft.", "medium"),
  c("PPOF-111-2", "11.1", "How does density change with altitude, temp and humidity?", "Density FALLS with increasing altitude, increasing temperature and increasing humidity (water vapour is lighter than dry air). Low density = worse performance.", "medium"),
  c("PPOF-111-3", "11.1", "1 hPa ≈ how many feet?", "≈30 ft near sea level (27 ft). Pressure and density both decrease with height.", "easy"),

  // 11.2 Lift
  c("PPOF-112-1", "11.2", "Lift equation?", "L = ½ρV²·S·CL. Lift ∝ the SQUARE of speed, and ∝ air density ρ, wing area S and lift coefficient CL (set by angle of attack & shape).", "medium"),
  c("PPOF-112-2", "11.2", "How does CL vary with angle of attack?", "CL rises roughly linearly with AoA up to the stalling angle (~15–16°), then falls sharply at the stall. Max CL is just before the critical angle.", "medium"),
  c("PPOF-112-3", "11.2", "Centre of pressure movement?", "As AoA increases the centre of pressure moves FORWARD (up to the stall); on a cambered aerofoil it moves aft at low AoA. Bernoulli + Newton explain lift.", "hard"),
  c("PPOF-112-4", "11.2", "Angle of attack vs angle of incidence?", "AoA = angle between the chord line and the relative airflow (varies in flight). Angle of incidence = fixed rigging angle of the wing to the fuselage.", "easy"),

  // 11.3 Drag
  c("PPOF-113-1", "11.3", "Drag equation & the two types?", "D = ½ρV²·S·CD. Parasite drag (form + skin friction + interference) ∝ V²; induced drag (from lift/wingtip vortices) ∝ 1/V². Total drag is their sum.", "medium"),
  c("PPOF-113-2", "11.3", "Where is total drag minimum?", "Where induced = parasite drag — this speed gives maximum L/D (best glide, best range, min drag speed VMD).", "medium"),
  c("PPOF-113-3", "11.3", "What reduces induced drag?", "Higher aspect ratio, wingtip devices (winglets), tapered/elliptical planform, and higher speed (lower AoA). Induced drag is greatest slow and heavy.", "medium"),

  // 11.4 Thrust
  c("PPOF-114-1", "11.4", "Thrust vs drag in steady flight?", "In unaccelerated straight & level flight Thrust = Drag and Lift = Weight. Excess thrust → accelerate or climb; deficit → decelerate or descend.", "easy"),
  c("PPOF-114-2", "11.4", "Power available vs power required?", "Max excess POWER (not thrust) gives best rate of climb; max excess THRUST gives best angle of climb. A fixed-pitch prop is efficient only over a narrow speed range.", "medium"),

  // 11.5 Flying Controls
  c("PPOF-115-1", "11.5", "Three axes & primary controls?", "Longitudinal axis — ailerons — ROLL. Lateral axis — elevator — PITCH. Normal (vertical) axis — rudder — YAW. Each rotates about the CG.", "easy"),
  c("PPOF-115-2", "11.5", "Adverse yaw — cause & cure?", "The down-going aileron adds lift AND drag, yawing the nose away from the turn. Cured by differential ailerons, Frise ailerons and coordinated rudder.", "medium"),

  // 11.6 Trimming Controls
  c("PPOF-116-1", "11.6", "What does a trim tab do?", "Holds a control surface in position so the pilot needs no sustained stick force. A trim tab moves OPPOSITE to the desired control-surface movement.", "medium"),
  c("PPOF-116-2", "11.6", "Balance vs anti-balance tab?", "Balance tab moves opposite the surface to lighten the load; anti-balance (anti-servo) tab moves the SAME way to add feel and prevent over-controlling (e.g. a stabilator).", "hard"),

  // 11.7 Flaps & Slats
  c("PPOF-117-1", "11.7", "Effect of lowering flaps?", "Increase CL (and drag). First stages add mostly lift (lower stall speed, shorter take-off); larger stages add mostly drag (steeper approach, shorter landing). Nose attitude lowers.", "medium"),
  c("PPOF-117-2", "11.7", "What do slats/slots do?", "Re-energise the boundary layer, delaying the stall to a HIGHER angle of attack and higher CL — they raise the stalling angle rather than just adding camber.", "medium"),

  // 11.8 Flight Mechanics
  c("PPOF-118-1", "11.8", "Four forces & the two couples?", "Lift, Weight, Thrust, Drag. Lift–Weight and Thrust–Drag couples; their pitching moments are balanced by the tailplane download. CG position sets the trim.", "medium"),
  c("PPOF-118-2", "11.8", "Load factor & stall speed in a level turn?", "n = 1 ÷ cos(bank): 30°→1.15 g, 45°→1.41 g, 60°→2 g. Stall speed in the turn = Vs × √n (60° bank → 1.41 × Vs).", "hard"),
  c("PPOF-118-3", "11.8", "Rate-1 turn figures?", "Rate 1 = 3°/sec = 360° in 2 minutes. Bank angle for rate 1 ≈ (TAS ÷ 10) + 7. A level turn needs back-pressure (increased AoA) to offset the lift used for turning.", "medium"),
  c("PPOF-118-4", "11.8", "Climb & descent gradient idea?", "In a climb Lift is slightly LESS than Weight (thrust supports part of weight). Glide distance = height × (L/D); best glide speed gives max L/D.", "medium"),

  // 11.9 The Stall
  c("PPOF-119-1", "11.9", "What actually causes the stall?", "Exceeding the CRITICAL angle of attack (~15–16°) — the boundary layer separates and CL collapses. A wing can stall at ANY speed and ANY attitude.", "medium"),
  c("PPOF-119-2", "11.9", "What raises the stall SPEED?", "Vs ∝ √weight and ∝ √load factor. Higher weight, aft-to-forward CG shift (forward CG), bank/g, and ice/contamination all raise the stall speed. Flaps LOWER it.", "hard"),
  c("PPOF-119-3", "11.9", "Why wash-out / spanwise stall order?", "Wash-out (tips at a lower incidence) makes the ROOT stall first, preserving aileron effectiveness and giving nose-drop warning before the tips let go.", "medium"),
  c("PPOF-119-4", "11.9", "Stall recovery?", "Reduce angle of attack (lower the nose) FIRST, apply max available power, level the wings with rudder/aileron, then recover to the climb — minimum height loss.", "easy"),

  // 11.10 Avoidance of Spins
  c("PPOF-1110-1", "11.10", "What is a spin?", "An autorotation following a stall with YAW: one wing is more deeply stalled than the other, so the aircraft rotates and descends steeply in a stalled condition.", "medium"),
  c("PPOF-1110-2", "11.10", "Standard spin recovery (PARE)?", "Power idle · Ailerons neutral · Rudder FULL opposite the spin · Elevator forward to unstall · then centralise rudder and recover from the dive. Prevent by not stalling with yaw.", "hard"),

  // 11.11 Stability
  c("PPOF-1111-1", "11.11", "Static vs dynamic stability?", "Static = initial tendency to return to trim after a disturbance. Dynamic = what the resulting motion does over time (damped, neutral or divergent oscillation).", "medium"),
  c("PPOF-1111-2", "11.11", "Longitudinal stability & CG?", "Pitch stability about the lateral axis, provided mainly by the tailplane. An AFT CG reduces longitudinal stability (too far aft = unstable); a forward CG increases it.", "hard"),
  c("PPOF-1111-3", "11.11", "What gives lateral & directional stability?", "Lateral (roll): wing DIHEDRAL, keel effect, sweepback. Directional (yaw): the fin/vertical stabiliser. Too much of one vs the other causes Dutch roll or spiral instability.", "medium"),

  // 11.12 Load Factor & Manoeuvres
  c("PPOF-1112-1", "11.12", "Load factor definition & limits?", "n = Lift ÷ Weight (g). Normal category limits +3.8/−1.52 g; Utility +4.4/−1.76; Acrobatic +6.0/−3.0. Ultimate = limit × 1.5.", "medium"),
  c("PPOF-1112-2", "11.12", "The V-n diagram & VA?", "Plots load factor vs speed, bounded by the stall curve and the limit load factors. VA (manoeuvre speed) is where they meet — below VA a full control input stalls the wing before overstressing it.", "hard"),
  c("PPOF-1112-3", "11.12", "ASI arcs (markings)?", "White arc = flap operating range (VS0–VFE). Green = normal range (VS1–VNO). Yellow = caution (smooth air only). Red line = VNE (never exceed).", "medium"),

  // 11.13 Stress Loads on the Ground
  c("PPOF-1113-1", "11.13", "Main structural stresses?", "Tension, compression, shear, bending (tension + compression) and torsion (twisting). The wing spar carries bending; skin carries torsion in the torsion box.", "medium"),
  c("PPOF-1113-2", "11.13", "Ground loads & a 'firm' landing?", "The undercarriage absorbs vertical landing loads; a heavy/firm landing imposes a high load factor on the gear and airframe. Taxiing stresses come from bumps and braking.", "medium"),
];

export function getPPLPofFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return PPL_POF_FLASHCARDS.filter((f) => f.sectionId === sectionId);
}
