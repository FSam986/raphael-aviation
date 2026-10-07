// Aircraft Technical & General — flashcards. Mapped to SACAA A.1.
// A.1.1 structures · A.1.2 airframe/systems · A.1.6 emergency equipment ·
// A.1.7 hazards. Distilled from CAE Oxford ATPL Book 2 "Airframes & Systems".
// Front = prompt, Back = the exam-critical answer.

export interface ATGFlashcard {
  id: string;
  sectionId: string;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

export const AIRCRAFT_TECHNICAL_FLASHCARDS: ATGFlashcard[] = [
  // ───────── A.1.1 Structures ─────────
  { id: "ATGFC-11-01", sectionId: "A.1.2", front: "Design Ultimate Load (DUL)?", back: "DLL × 1.5 safety factor — the structure must not fail below it.", difficulty: "medium" },
  { id: "ATGFC-11-02", sectionId: "A.1.2", front: "What does the wing main spar carry?", back: "Bending (and a share of torsional) loads.", difficulty: "medium" },
  { id: "ATGFC-11-03", sectionId: "A.1.2", front: "Job of wing ribs and stringers?", back: "Ribs shape the wing and support the skin; stringers stiffen the skin against buckling.", difficulty: "medium" },
  { id: "ATGFC-11-04", sectionId: "A.1.2", front: "Safe-life vs fail-safe vs damage-tolerant?", back: "Safe-life = replace before fatigue life; fail-safe = redundant paths + inspection; damage-tolerant = redundant strength spread over a large area.", difficulty: "hard" },
  { id: "ATGFC-11-05", sectionId: "A.1.2", front: "Fuselage fatigue life is counted in…?", back: "Pressurisation cycles (hoop stress applied cyclically).", difficulty: "medium" },
  { id: "ATGFC-11-06", sectionId: "A.1.2", front: "How is control-surface flutter prevented?", back: "Mass balancing — CG moved forward of the hinge line.", difficulty: "medium" },
  { id: "ATGFC-11-07", sectionId: "A.1.2", front: "Primary vs secondary stops?", back: "Primary stops limit control-surface travel; secondary stops at the cockpit control back them up.", difficulty: "medium" },
  { id: "ATGFC-11-08", sectionId: "A.1.2", front: "What forms the wing torsion box?", back: "The spars + skin acting together to resist twisting.", difficulty: "medium" },
  { id: "ATGFC-11-09", sectionId: "A.1.2", front: "Maximum Zero Fuel Mass (MZFM)?", back: "Max permissible mass with no usable fuel — a structural (wing-bending-relief) limit.", difficulty: "medium" },
  { id: "ATGFC-11-10", sectionId: "A.1.2", front: "Main airframe materials?", back: "Aluminium-alloy sheet + rivets, with steel/titanium at high-strength points; composites increasingly.", difficulty: "easy" },

  // ───────── A.1.2 Hydraulics ─────────
  { id: "ATGFC-12-01", sectionId: "A.1.2", front: "Pascal's law / pressure formula?", back: "Pressure in an enclosed fluid acts equally in all directions; P = F/A.", difficulty: "easy" },
  { id: "ATGFC-12-02", sectionId: "A.1.2", front: "Purpose of a hydraulic reservoir?", back: "Make up for leaks, jack displacement and thermal expansion; feed the pump with a positive supply.", difficulty: "medium" },
  { id: "ATGFC-12-03", sectionId: "A.1.2", front: "What does an accumulator do?", back: "Stores fluid under pressure — energy store, damps surges, emergency reserve, extends pump cut-in/out.", difficulty: "medium" },
  { id: "ATGFC-12-04", sectionId: "A.1.2", front: "Mineral vs Skydrol fluid — colour & seals?", back: "Mineral (DEF STAN 91-48) = RED, neoprene/nitrile seals; Skydrol ester = fire-resistant, attacks skin/paint, BUTYL seals. Never mix.", difficulty: "hard" },
  { id: "ATGFC-12-05", sectionId: "A.1.2", front: "Shuttle valve vs priority valve?", back: "Shuttle = two sources feed one service; priority = reserves pressure for essential services when supply is low.", difficulty: "medium" },
  { id: "ATGFC-12-06", sectionId: "A.1.2", front: "What is a hydraulic fuse for?", back: "Limits fluid loss (shuts off after a set volume) if a line ruptures.", difficulty: "medium" },
  { id: "ATGFC-12-07", sectionId: "A.1.2", front: "How is pump cavitation prevented?", back: "A positive inlet supply — pressurised/bootstrapped reservoir mounted above the pump.", difficulty: "medium" },
  { id: "ATGFC-12-08", sectionId: "A.1.2", front: "Effect of low accumulator pre-charge?", back: "Pressure fluctuation / hammering in operation.", difficulty: "medium" },

  // ───────── A.1.2 Landing gear / wheels / tyres / brakes ─────────
  { id: "ATGFC-12-09", sectionId: "A.1.2", front: "Oleo strut — role of gas vs oil?", back: "Gas provides the springing; oil provides the damping (compression and extension).", difficulty: "medium" },
  { id: "ATGFC-12-10", sectionId: "A.1.2", front: "What prevents gear retraction on the ground?", back: "Air/ground (weight-on-wheels) logic; plus ground-lock pins removed before flight.", difficulty: "medium" },
  { id: "ATGFC-12-11", sectionId: "A.1.2", front: "What gas inflates tyres, and why?", back: "Nitrogen (inert) — avoids supporting combustion in a hot wheel/brake.", difficulty: "medium" },
  { id: "ATGFC-12-12", sectionId: "A.1.2", front: "Tyre ply rating means?", back: "An index of the tyre's STRENGTH — not the actual number of plies.", difficulty: "medium" },
  { id: "ATGFC-12-13", sectionId: "A.1.2", front: "Fusible plug release temperatures?", back: "Red 155 °C, green 177 °C, amber 199 °C.", difficulty: "hard" },
  { id: "ATGFC-12-14", sectionId: "A.1.2", front: "Over- vs under-inflation tyre wear?", back: "Over-inflation → crown wear; under-inflation → shoulder wear.", difficulty: "medium" },
  { id: "ATGFC-12-15", sectionId: "A.1.2", front: "Aquaplaning speed formula?", back: "Vp = 9√P, with P in psi and Vp in knots.", difficulty: "medium" },
  { id: "ATGFC-12-16", sectionId: "A.1.2", front: "Best extinguishant for a wheel/brake fire?", back: "Dry powder (not CO₂ or water).", difficulty: "medium" },
  { id: "ATGFC-12-17", sectionId: "A.1.2", front: "Cause of nose-wheel shimmy?", back: "Worn/damaged torque link (or damper).", difficulty: "medium" },
  { id: "ATGFC-12-18", sectionId: "A.1.2", front: "When is anti-skid available?", back: "On both take-off and landing runs; cuts out at low speed (~10 mph).", difficulty: "medium" },

  // ───────── A.1.2 Flight controls ─────────
  { id: "ATGFC-12-19", sectionId: "A.1.2", front: "Reversible vs irreversible flying controls?", back: "Manual = reversible (feedback felt); fully powered = irreversible (needs an artificial feel unit). Power-assisted stays reversible.", difficulty: "hard" },
  { id: "ATGFC-12-20", sectionId: "A.1.2", front: "How is control-cable tension set & measured?", back: "Adjusted by turnbuckles, measured with a tensiometer; a temperature compensator holds correct tension.", difficulty: "medium" },
  { id: "ATGFC-12-21", sectionId: "A.1.2", front: "TE flap types & lift gain (rough)?", back: "Plain ~50%, split ~60%, slotted ~65%, Fowler ~90% + extra area.", difficulty: "hard" },
  { id: "ATGFC-12-22", sectionId: "A.1.2", front: "What arms the ground spoilers?", back: "A weight-on-wheels switch (plus spoiler/thrust-lever logic).", difficulty: "medium" },

  // ───────── A.1.2 Pneumatics / air-con / pressurization ─────────
  { id: "ATGFC-12-23", sectionId: "A.1.2", front: "Air-con standards: fresh air, cabin temp, CO limit?", back: "~1 lb fresh air/seat/min; cabin 18–24 °C; CO must not exceed 1:20 000.", difficulty: "medium" },
  { id: "ATGFC-12-24", sectionId: "A.1.2", front: "Bootstrap (air-cycle) cooling — how?", back: "Charge air drives an expansion turbine that drives a compressor; cooled via heat exchanger + water separator.", difficulty: "hard" },
  { id: "ATGFC-12-25", sectionId: "A.1.2", front: "Typical max differential & max cabin altitude?", back: "~8–9 psi max diff; cabin held to ~8000 ft.", difficulty: "medium" },
  { id: "ATGFC-12-26", sectionId: "A.1.2", front: "Pressurisation control schedule?", back: "Proportional (climb) → isobaric (cruise) → max-diff; outflow valve modulates with constant mass inflow.", difficulty: "hard" },
  { id: "ATGFC-12-27", sectionId: "A.1.2", front: "Which pressurisation valves must be duplicated?", back: "The safety (positive-relief) and inward-relief (negative-diff) valves.", difficulty: "medium" },
  { id: "ATGFC-12-28", sectionId: "A.1.2", front: "Cabin rate limits climb vs descent?", back: "~500 ft/min climb, ~300 ft/min descent (comfort of ears).", difficulty: "medium" },
  { id: "ATGFC-12-29", sectionId: "A.1.2", front: "When does the cabin-altitude warning sound?", back: "When cabin altitude exceeds 10 000 ft (aural + visual).", difficulty: "medium" },

  // ───────── A.1.2 Fuel ─────────
  { id: "ATGFC-12-30", sectionId: "A.1.2", front: "AVGAS 100LL vs 100 — colours & SG?", back: "100LL blue, 100 green; both SG ~0.72, same 100/130 anti-knock.", difficulty: "medium" },
  { id: "ATGFC-12-31", sectionId: "A.1.2", front: "Jet A1 key properties?", back: "Kerosene, SG ~0.8, flash point 38 °C, waxing −47 °C; undyed (clear to straw).", difficulty: "medium" },
  { id: "ATGFC-12-32", sectionId: "A.1.2", front: "What does FSII do?", back: "Fuel System Icing Inhibitor — anti-icing plus anti-fungal (Cladosporium resinae).", difficulty: "medium" },
  { id: "ATGFC-12-33", sectionId: "A.1.2", front: "Capacitance vs float fuel gauging?", back: "Capacitance = measures MASS, SG- and attitude-compensated; float = VOLUME, has manoeuvre error, no SG compensation.", difficulty: "hard" },
  { id: "ATGFC-12-34", sectionId: "A.1.2", front: "What type are fuel booster pumps?", back: "Low-pressure centrifugal (AC-driven); a collector/feeder box keeps them submerged.", difficulty: "medium" },
  { id: "ATGFC-12-35", sectionId: "A.1.2", front: "Why is fuel heated?", back: "To stop ice crystals blocking the low-pressure (LP) fuel filter.", difficulty: "medium" },
  { id: "ATGFC-12-36", sectionId: "A.1.2", front: "Fuel jettison — CS-25 minimum remaining?", back: "Enough to climb to 10 000 ft + 45 min cruise; jettison stopped by low-level float switches.", difficulty: "hard" },
  { id: "ATGFC-12-37", sectionId: "A.1.2", front: "Cloudy fuel sample means?", back: "Water contamination (drain/settle before flight).", difficulty: "easy" },

  // ───────── A.1.6 Emergency equipment ─────────
  { id: "ATGFC-16-01", sectionId: "A.1.6", front: "TUC at 20 000 / 30 000 / 40 000 ft?", back: "~30 min / ~1–2 min / ~15–20 s (halved by exertion).", difficulty: "hard" },
  { id: "ATGFC-16-02", sectionId: "A.1.6", front: "Diluter-demand: NORMAL vs EMERGENCY?", back: "NORMAL = air/O₂ mix (100% by ~32–34 kft); EMERGENCY = 100% O₂ at positive pressure.", difficulty: "hard" },
  { id: "ATGFC-16-03", sectionId: "A.1.6", front: "When do passenger masks deploy?", back: "Automatically to the half-hung position at ~14 000 ft cabin altitude.", difficulty: "medium" },
  { id: "ATGFC-16-04", sectionId: "A.1.6", front: "Oxygen cylinder charge pressure & overpressure relief?", back: "~1800 psi; relieved by a bursting disc with an external discharge indicator.", difficulty: "medium" },
  { id: "ATGFC-16-05", sectionId: "A.1.6", front: "Chemical oxygen generator — reagents & quirks?", back: "Sodium chlorate + iron, electrically fired; can't be stopped once started; ~232 °C; ~10-year shelf life.", difficulty: "hard" },
  { id: "ATGFC-16-06", sectionId: "A.1.6", front: "Oxygen cylinder colours & lubrication?", back: "US/Euro green, British black with white neck; no oil/grease — graphite only.", difficulty: "medium" },
  { id: "ATGFC-16-07", sectionId: "A.1.6", front: "Fire/overheat detector types?", back: "Melting-link, differential-expansion (IEOH), continuous fire-wire FFFD (resistance/capacitance), gas-filled.", difficulty: "hard" },
  { id: "ATGFC-16-08", sectionId: "A.1.6", front: "Fire-wire loop logic?", back: "Double loop — AND (both loops) for a warning; OR when one loop is inoperative.", difficulty: "medium" },
  { id: "ATGFC-16-09", sectionId: "A.1.6", front: "Engine fire drill sequence?", back: "Cancel aural → shut off fuel/bleed air/electrics/hydraulics → discharge the bottle(s).", difficulty: "medium" },
  { id: "ATGFC-16-10", sectionId: "A.1.6", front: "SQUIB / AGENT / DISCH meaning; bottles per engine?", back: "SQUIB = armed; AGENT = fires cartridge; DISCH = discharged. CS-25 requires two discharges (bottles) per engine.", difficulty: "hard" },
  { id: "ATGFC-16-11", sectionId: "A.1.6", front: "What does a flow indicator actually tell you?", back: "That oxygen is flowing — NOT the quantity or whether it's adequate.", difficulty: "medium" },

  // ───────── A.1.7 Hazards ─────────
  { id: "ATGFC-17-01", sectionId: "A.1.7", front: "Why is oxygen a fire hazard if it doesn't burn?", back: "It vigorously SUPPORTS combustion; it's heavier than air and pools in low areas — ventilate, no oil/grease.", difficulty: "medium" },
  { id: "ATGFC-17-02", sectionId: "A.1.7", front: "Corrosion protection: aluminium vs magnesium?", back: "Anodising for aluminium; chromate treatment for magnesium (Electron); plus paint/sealant.", difficulty: "medium" },
  { id: "ATGFC-17-03", sectionId: "A.1.7", front: "Wake-vortex decay time?", back: "Roughly 2–3 minutes for a heavy/wide-body.", difficulty: "medium" },
  { id: "ATGFC-17-04", sectionId: "A.1.7", front: "Effect of frost/snow on the wing?", back: "Raises stalling speed and spoils lift — must be removed before flight.", difficulty: "medium" },
  { id: "ATGFC-17-05", sectionId: "A.1.7", front: "Refuelling static precaution & zone size?", back: "Bond/ground the nozzle to the aircraft; fuelling zone ~6 m (20 ft), no smoking, extinguishers accessible.", difficulty: "medium" },
  { id: "ATGFC-17-06", sectionId: "A.1.7", front: "Embedded foreign body in a tyre — action?", back: "Report and probe to assess depth — do NOT pull it out on the line.", difficulty: "medium" },

  // ───────── A.1.3 Electrics ─────────
  { id: "ATGFC-13-01", sectionId: "A.1.3", front: "Ohm's law and power formulas?", back: "V = I×R; P = V·I = I²·R = V²/R.", difficulty: "easy" },
  { id: "ATGFC-13-02", sectionId: "A.1.3", front: "Battery capacity: 60 A·h at the 10-hour rate means?", back: "6 A for 10 hours. (Capacity in ampere-hours at a stated discharge rate.)", difficulty: "medium" },
  { id: "ATGFC-13-03", sectionId: "A.1.3", front: "How should a battery's voltage be checked?", back: "ON LOAD — off-load it can read full volts yet be flat.", difficulty: "medium" },
  { id: "ATGFC-13-04", sectionId: "A.1.3", front: "Batteries in series vs parallel?", back: "Series adds voltage (capacity unchanged); parallel adds capacity (voltage unchanged).", difficulty: "medium" },
  { id: "ATGFC-13-05", sectionId: "A.1.3", front: "NiCad battery overheating after start means?", back: "Thermal runaway — a fire risk (rising temperature and charge current).", difficulty: "medium" },
  { id: "ATGFC-13-06", sectionId: "A.1.3", front: "What does the voltage regulator do?", back: "Holds system voltage by varying generator field current, regardless of RPM/load.", difficulty: "medium" },
  { id: "ATGFC-13-07", sectionId: "A.1.3", front: "Purpose of the reverse-current cut-out?", back: "Stops the battery feeding back into the generator when generator volts fall below battery volts.", difficulty: "hard" },
  { id: "ATGFC-13-08", sectionId: "A.1.3", front: "How is a generator failure indicated — and does the engine stop?", back: "Red warning light + ammeter zero/discharge. The engine runs normally (failure is electrical only).", difficulty: "medium" },
  { id: "ATGFC-13-09", sectionId: "A.1.3", front: "Why must paralleled generators share voltage equally?", back: "Unequal voltages drive a circulating current between them.", difficulty: "hard" },
  { id: "ATGFC-13-10", sectionId: "A.1.3", front: "Replacing a blown fuse — the rule?", back: "Replace ONCE with the correct rating (never higher); if it blows again, investigate.", difficulty: "easy" },
  { id: "ATGFC-13-11", sectionId: "A.1.3", front: "What does electrical bonding do?", back: "Provides a low-resistance earth-return path and safely dissipates static charge and lightning.", difficulty: "medium" },
  { id: "ATGFC-13-12", sectionId: "A.1.3", front: "What is an inertia switch for?", back: "Isolates electrical power automatically on heavy deceleration (crash).", difficulty: "medium" },

  // ───────── A.1.8 Subsonic Aerodynamics ─────────
  { id: "ATGFC-18-01", sectionId: "A.1.8", front: "Lift equation and dynamic pressure?", back: "Lift = ½ρV²·S·CL; dynamic pressure q = ½ρV².", difficulty: "easy" },
  { id: "ATGFC-18-02", sectionId: "A.1.8", front: "Define a stall.", back: "Exceeding the critical ANGLE OF ATTACK — independent of speed, weight or attitude.", difficulty: "medium" },
  { id: "ATGFC-18-03", sectionId: "A.1.8", front: "Angle of attack vs angle of incidence?", back: "AoA = chord line to the relative airflow; incidence = chord line to the longitudinal axis (fixed rigging angle).", difficulty: "medium" },
  { id: "ATGFC-18-04", sectionId: "A.1.8", front: "How does stall speed vary with weight and load factor?", back: "Vs ∝ √(weight) and ∝ √(load factor n).", difficulty: "medium" },
  { id: "ATGFC-18-05", sectionId: "A.1.8", front: "Stall-speed increase in a 45° and 60° bank?", back: "45° → +19% (n=1.41); 60° → ×1.41 (n=2). Vs ∝ √n, n = 1/cosθ.", difficulty: "hard" },
  { id: "ATGFC-18-06", sectionId: "A.1.8", front: "Parasite vs induced drag with speed?", back: "Parasite ∝ V²; induced ∝ 1/V² (CDi ∝ CL²). Equal at VIMD, where L/D is maximum.", difficulty: "hard" },
  { id: "ATGFC-18-07", sectionId: "A.1.8", front: "How do you reduce induced drag?", back: "High aspect ratio and winglets (weaken the tip vortices).", difficulty: "medium" },
  { id: "ATGFC-18-08", sectionId: "A.1.8", front: "Effect of TE flaps vs LE slats on the stall?", back: "TE flaps raise CLmax but LOWER the stall AoA (add drag, nose-down); slats RAISE the critical AoA.", difficulty: "hard" },
  { id: "ATGFC-18-09", sectionId: "A.1.8", front: "Why does a swept wing pitch-up at the stall?", back: "It tip-stalls first → CP moves forward → nose-up. A blanked T-tail gives a deep stall.", difficulty: "hard" },
  { id: "ATGFC-18-10", sectionId: "A.1.8", front: "Effect of aft CG on longitudinal stability?", back: "Reduces static longitudinal stability and the control deflection needed.", difficulty: "medium" },
  { id: "ATGFC-18-11", sectionId: "A.1.8", front: "Load factor, and lift needed in a 45° bank?", back: "n = lift/weight; a 45° level turn needs +41% lift (n = 1.41).", difficulty: "medium" },
  { id: "ATGFC-18-12", sectionId: "A.1.8", front: "What is VA and why respect it?", back: "Manoeuvre speed (varies with mass); above it, full control deflection can overstress the airframe.", difficulty: "hard" },
  { id: "ATGFC-18-13", sectionId: "A.1.8", front: "Transonic range, and Mach in a constant-IAS climb?", back: "Transonic ≈ MCRIT to M1.3; climbing at constant IAS, Mach increases.", difficulty: "hard" },
  { id: "ATGFC-18-14", sectionId: "A.1.8", front: "Advantage of a constant-speed propeller?", back: "Keeps the blade near its best angle of attack across the whole speed range (fine pitch + high RPM for take-off).", difficulty: "medium" },
];

export function getAircraftTechnicalFlashcardsBySection(sectionId: string): ATGFlashcard[] {
  return AIRCRAFT_TECHNICAL_FLASHCARDS.filter((x) => x.sectionId === sectionId);
}
