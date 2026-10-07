// Solved worked examples for every numerical/plotting topic. Each shows the
// problem, a step-by-step method and the final answer. Keyed by CPL aspect id;
// PPL/IR study sections resolve through the same figure-key maps used elsewhere,
// so a PPL/IR topic sees the matching worked example too.

import { PPL_MET_FIGURE_KEY } from "@/app/data/ppl-met-content";
import { PPL_NAV_FIGURE_KEY } from "@/app/data/ppl-nav-content";
import { PPL_FPP_FIGURE_KEY } from "@/app/data/ppl-fpp-content";
import { PPL_AGK_FIGURE_KEY } from "@/app/data/ppl-agk-content";
import { IR_MET_FIGURE_KEY } from "@/app/data/ir-met-content";
import { IR_FPP_FIGURE_KEY } from "@/app/data/ir-fpp-content";
import { IR_AWO_FIGURE_KEY } from "@/app/data/ir-awo-content";

export interface WorkedExample {
  id: string;
  sectionId: string;
  title: string;
  problem: string;
  steps: string[];   // ordered solution steps
  answer: string;
}

const E = (id: string, sectionId: string, title: string, problem: string, steps: string[], answer: string): WorkedExample => ({ id, sectionId, title, problem, steps, answer });

export const WORKED_EXAMPLES: WorkedExample[] = [
  // ── Navigation (A.9.x) ──
  E("WEX-A91", "A.9.1", "Convergency", "Two positions lie on 30°N, at 010°E and 040°E. Find the convergency between them.",
    ["Formula: Convergency = ch.long × sin(mean latitude).", "Change of longitude = 040° − 010° = 30°.", "Mean latitude = 30°N, so sin 30° = 0.5.", "Convergency = 30° × 0.5 = 15°."], "Convergency = 15°"),
  E("WEX-A93", "A.9.3", "Distance, time & Air/Ground nautical miles", "You must cover 50 NM over the ground. TAS is 120 kt and groundspeed is 100 kt. Find the time, and the air distance flown (ANM).",
    ["Ground distance to run (GNM) = 50 NM.", "Time = GNM ÷ GS = 50 ÷ 100 = 0.5 h = 30 min.", "Air Nautical Miles = the still-air distance = TAS × time = 120 × 0.5 = 60 ANM.", "(GNM uses groundspeed; ANM uses TAS — the aircraft flies 60 NM through the air to make good 50 NM over the ground into a headwind.)"], "Time 30 min · 60 ANM to make good 50 GNM"),
  E("WEX-A94", "A.9.4", "Arc-to-time (Local Mean Time)", "An aircraft is over longitude 075°W. What is the Local Mean Time offset from UTC?",
    ["Earth turns 360° in 24 h → 15° per hour (1° = 4 min).", "Offset = 075 ÷ 15 = 5 hours.", "Longitude is WEST → LMT is BEHIND UTC.", "LMT = UTC − 05:00."], "LMT = UTC − 5 h"),
  E("WEX-A96", "A.9.6", "Relative velocity — time to meet", "Two aircraft are 180 NM apart on reciprocal tracks, closing head-on at groundspeeds of 240 kt and 200 kt. How long until they meet?",
    ["Head-on ⇒ closing speed = sum of groundspeeds = 240 + 200 = 440 kt.", "Time = distance ÷ closing speed = 180 ÷ 440 h.", "= 0.409 h × 60 ≈ 24.5 min."], "≈ 24.5 minutes"),
  E("WEX-A97", "A.9.7", "Triangle of velocities (drift & GS)", "TAS 120 kt, heading 090°(T). Wind is 360°/30 kt (from the north). Find approximate drift, track and groundspeed.",
    ["The wind is 90° to the heading → it is pure crosswind (30 kt), no head/tail component.", "Drift (1-in-60): drift° ≈ 60 × crosswind ÷ TAS = 60 × 30 ÷ 120 = 15°.", "A north wind pushes an eastbound aircraft south → drift is to the right → Track = 090 + 15 = 105°(T).", "GS ≈ √(TAS² − Xw²) = √(120² − 30²) = √13500 ≈ 116 kt."], "Drift 15°R · Track 105° · GS ≈ 116 kt"),
  E("WEX-A98", "A.9.8", "1-in-60 rule — regaining track", "After flying 80 NM you find you are 6 NM right of the required track, with 40 NM still to run. What single heading alteration will regain track at the destination?",
    ["Track error° = (off-track ÷ distance gone) × 60 = (6 ÷ 80) × 60 = 4.5°.", "Closing angle° = (off-track ÷ distance to go) × 60 = (6 ÷ 40) × 60 = 9°.", "Total alteration = track error + closing angle = 4.5 + 9 = 13.5°.", "You are RIGHT of track → alter LEFT."], "Alter 13.5° LEFT"),

  // ── Radio Navigation (A.10.x) ──
  E("WEX-A101a", "A.10.1", "Wavelength from frequency", "A transmitter operates on 125 MHz. Find the wavelength.",
    ["Formula: λ(m) = 300 ÷ f(MHz).", "λ = 300 ÷ 125 = 2.4 m."], "λ = 2.4 m"),
  E("WEX-A101b", "A.10.1", "VHF / line-of-sight range", "An aircraft at FL100 (10 000 ft) works a station at 500 ft AMSL. Find the maximum line-of-sight range.",
    ["Formula: range(NM) ≈ 1.25 (√h₁ + √h₂), heights in feet.", "√10000 = 100, √500 = 22.4.", "Range = 1.25 × (100 + 22.4) = 1.25 × 122.4 ≈ 153 NM."], "≈ 153 NM"),
  E("WEX-A102", "A.10.2", "ADF — time & distance to the NDB", "At 1000 an NDB bears 090 relative; at 1005 it bears 100 relative. TAS 150 kt. Find the time and distance to the NDB.",
    ["Bearing change = 100 − 090 = 10° in 5 minutes.", "Time to station = 60 × minutes ÷ bearing change = 60 × 5 ÷ 10 = 30 min.", "Distance = TAS × minutes ÷ bearing change = 150 × 5 ÷ 10 = 75 NM."], "30 min · 75 NM"),
  E("WEX-A103", "A.10.3", "ILS rate of descent", "You are flying a 3° glide path at a groundspeed of 140 kt. What rate of descent maintains the path?",
    ["Formula: ROD (fpm) = GP° × GS × 100 ÷ 60.", "= 3 × 140 × 100 ÷ 60 = 42000 ÷ 60 = 700 fpm.", "(Rule of thumb: ROD ≈ 5 × GS for a 3° path = 5 × 140 = 700.)"], "700 ft/min"),
  E("WEX-A104", "A.10.4", "DME slant range from timing", "The DME reply arrives 1000 µs after interrogation. The transponder's fixed delay is 50 µs. Find the slant range.",
    ["Formula: R(NM) = 0.162 × (T − 50) ÷ 2, T in µs.", "= 0.162 × (1000 − 50) ÷ 2.", "= 0.162 × 950 ÷ 2 = 0.162 × 475 ≈ 77 NM."], "≈ 77 NM (slant)"),

  // ── Flight Planning & Performance (A.4.x) ──
  E("WEX-A45", "A.4.5", "Density altitude", "Pressure altitude is 5000 ft and the OAT is +25°C. Find the density altitude.",
    ["ISA temperature at 5000 ft = 15 − (2 × 5) = +5°C.", "ISA deviation = OAT − ISA temp = 25 − 5 = +20°C.", "DA = pressure altitude + 120 ft × ISA deviation = 5000 + 120 × 20.", "= 5000 + 2400 = 7400 ft."], "Density altitude = 7400 ft"),
  E("WEX-A47", "A.4.7", "Best-glide distance", "With the engine failed you have 5000 ft AGL and a best glide ratio (L/D) of 10:1 in still air. How far can you glide?",
    ["Glide distance = L/D × height. Keep the units consistent.", "= 10 × 5000 ft = 50 000 ft.", "Convert to NM: 50 000 ÷ 6076 ≈ 8.2 NM."], "≈ 8.2 NM"),
  E("WEX-A49", "A.4.9", "Reading a performance graph (plot → factor)", "From the SEP take-off graph you enter with pressure altitude 3000 ft, OAT +20°C and mass 1000 kg, and read a take-off distance of 620 m. The runway is dry grass (factor 1.15) with a 1.0 safety factor. Find the take-off distance required.",
    ["Step 1 — read the graph: enter the carpet plot at 3000 ft / +20°C, carry across to the 1000 kg reference line and read off = 620 m (this is the value you derive from the plot).", "Step 2 — apply the surface/condition factor: dry grass ×1.15.", "TODR = 620 × 1.15 = 713 m.", "(Always compare TODR against TODA — the runway's declared take-off distance available.)"], "TODR ≈ 713 m"),
  E("WEX-A411", "A.4.11", "Specific range — air vs ground", "TAS 100 kt into a 20 kt headwind (GS 80 kt). Fuel flow is 20 L/h. Find the air and ground specific range.",
    ["Ground specific range = GS ÷ fuel flow = 80 ÷ 20 = 4 NM per litre (over the ground).", "Air specific range = TAS ÷ fuel flow = 100 ÷ 20 = 5 ANM per litre.", "Wind changes the GROUND figure, never the air figure — plan fuel on ground miles."], "4 GNM/L · 5 ANM/L"),
  E("WEX-A412", "A.4.12", "Mass & balance — finding the CG", "Empty aircraft 700 kg at arm 2.0 m. Add a pilot 80 kg at 2.5 m and fuel 100 kg at 3.0 m. Find the loaded CG.",
    ["Moment = mass × arm for each item:", "Empty 700 × 2.0 = 1400 · Pilot 80 × 2.5 = 200 · Fuel 100 × 3.0 = 300.", "Total mass = 700 + 80 + 100 = 880 kg.", "Total moment = 1400 + 200 + 300 = 1900 kg·m.", "CG = total moment ÷ total mass = 1900 ÷ 880 = 2.16 m.", "Check 2.16 m lies inside the fore/aft CG limits."], "CG = 2.16 m aft of datum"),
  E("WEX-A413", "A.4.13", "Point of Equal Time (PET)", "The leg A→B is 400 NM. Groundspeed out (O) is 100 kt, groundspeed home (H) is 140 kt. Find the distance from A to the PET.",
    ["Formula: distance to PET = D × H ÷ (O + H).", "= 400 × 140 ÷ (100 + 140).", "= 56000 ÷ 240 ≈ 233 NM from A.", "(A headwind out / tailwind home moves the PET downwind — past the half-way point.)"], "≈ 233 NM from A"),

  // ── Flight Instruments (A.7.x) ──
  E("WEX-A71", "A.7.1", "Altimeter pressure error", "The subscale is set to 1013 hPa and reads 3000 ft. The actual QNH is 1003 hPa. What is your true altitude? (1 hPa ≈ 30 ft.)",
    ["Difference = 1013 − 1003 = 10 hPa; the set value is HIGHER than the actual pressure.", "Error = 10 hPa × 30 ft = 300 ft.", "Flying from higher to lower pressure with a fixed setting, the altimeter OVER-reads.", "True altitude = 3000 − 300 = 2700 ft ('High to Low, look out below')."], "True altitude = 2700 ft"),
  E("WEX-A72", "A.7.2", "Bank angle for a rate-1 turn", "You are cruising at TAS 150 kt. What bank angle gives a rate-1 turn?",
    ["Rule of thumb: bank for rate 1 ≈ (TAS ÷ 10) + 7.", "= (150 ÷ 10) + 7 = 15 + 7 = 22°.", "(Rate 1 = 3°/sec = 360° in 2 minutes.)"], "≈ 22° of bank"),
  E("WEX-A75", "A.7.5", "Ram rise / Total Air Temperature", "TAS 300 kt, static air temperature (SAT) −40°C. Estimate the TAT.",
    ["Ram rise ≈ (TAS ÷ 100)² °C = (300 ÷ 100)² = 3² = 9°C.", "TAT = SAT + ram rise = −40 + 9 = −31°C.", "(The probe reads warmer than the true air because of adiabatic compression.)"], "TAT ≈ −31°C"),

  // ── Meteorology (A.8.x) ──
  E("WEX-A82", "A.8.2", "ISA temperature at altitude", "Using the ISA, what is the temperature at 20 000 ft?",
    ["ISA MSL = +15°C; lapse rate = 2°C per 1000 ft up to the tropopause.", "Drop = 2 × 20 = 40°C.", "Temperature = 15 − 40 = −25°C."], "−25°C"),
  E("WEX-A87", "A.8.7", "Pressure altitude from QNH", "An aerodrome has elevation 1000 ft and QNH 1030 hPa. What pressure altitude will the altimeter show when you set 1013? (1 hPa ≈ 30 ft.)",
    ["Pressure altitude = elevation + (1013 − QNH) × 30.", "= 1000 + (1013 − 1030) × 30.", "= 1000 + (−17 × 30) = 1000 − 510 = 490 ft."], "Pressure altitude ≈ 490 ft"),
  E("WEX-A810", "A.8.10", "Convective cloud base", "Surface temperature 20°C, surface dew point 10°C. Estimate the base of convective (cumulus) cloud.",
    ["Temperature/dew-point spread = 20 − 10 = 10°C.", "Cloud base (ft AGL) = spread ÷ 2.5 × 1000.", "= 10 ÷ 2.5 × 1000 = 4000 ft AGL."], "≈ 4000 ft AGL"),

  // ── General Radiotelephony (GR) ──
  E("WEX-GR1", "GR1", "VHF line-of-sight range", "An aircraft at 3600 ft talks to a tower antenna at 100 ft. What is the maximum VHF range?",
    ["Formula: range(NM) ≈ 1.25 (√h₁ + √h₂), feet.", "√3600 = 60, √100 = 10.", "Range = 1.25 × (60 + 10) = 1.25 × 70 = 87.5 NM."], "≈ 87.5 NM"),

  // ── ISA deviation (Met + Flight Planning) ──
  E("WEX-ISADEV-82", "A.8.2", "ISA deviation", "At FL180 the outside air temperature is −10°C. What is the ISA deviation?",
    ["ISA temperature at a level = 15 − (2 × altitude in thousands of ft), to the tropopause.", "ISA temp at 18 000 ft = 15 − (2 × 18) = 15 − 36 = −21°C.", "ISA deviation = actual OAT − ISA temp = −10 − (−21) = +11°C.", "Report it as ISA +11 (the air is warmer than standard)."], "ISA +11°C"),
  E("WEX-ISADEV-45", "A.4.5", "ISA deviation (for performance)", "Pressure altitude 5000 ft, OAT +25°C. Find the ISA deviation used in performance/density-altitude work.",
    ["ISA temp at 5000 ft = 15 − (2 × 5) = +5°C.", "ISA deviation = OAT − ISA temp = 25 − 5 = +20°C → ISA +20.", "This feeds density altitude: DA = pressure alt + 120 × ISA deviation."], "ISA +20°C"),

  // ── Direction: True / Magnetic / Compass ──
  E("WEX-TMC", "A.9.2", "True → Magnetic → Compass", "True track 090°, variation 10°W, deviation 2°E. Find the compass heading to steer.",
    ["Variation West → Magnetic Best (add West variation): Magnetic = 090 + 10 = 100°.", "Deviation East → Compass Least (subtract East deviation): Compass = 100 − 2 = 098°.", "(Memory: 'Variation West, Magnetic best; Deviation East, Compass least.')"], "Compass 098°"),

  // ── Wind components ──
  E("WEX-XWIND", "A.9.7", "Head & crosswind components", "Landing on runway 09 (heading 090°). The wind is 120°/20 kt. Find the headwind and crosswind components.",
    ["Angle between wind and runway = 120 − 090 = 30°.", "Headwind = wind × cos(angle) = 20 × cos 30° = 20 × 0.87 = 17.3 kt.", "Crosswind = wind × sin(angle) = 20 × sin 30° = 20 × 0.5 = 10 kt.", "(Rule-of-thumb clock: 30° ≈ ½ crosswind, 45° ≈ 0.7, 60°+ ≈ full.)"], "Headwind 17 kt · Crosswind 10 kt"),

  // ── Mass & balance: %MAC ──
  E("WEX-MAC", "A.4.12", "CG as a percentage of MAC", "The MAC is 2.0 m and its leading edge (LEMAC) is 3.0 m aft of the datum. The CG is at 3.5 m. Find the CG in %MAC.",
    ["Distance of CG aft of LEMAC = 3.5 − 3.0 = 0.5 m.", "%MAC = (CG aft of LEMAC ÷ MAC) × 100 = (0.5 ÷ 2.0) × 100 = 25%.", "Check 25% lies within the %MAC limits."], "CG = 25% MAC"),

  // ── Fuel: mass ↔ volume (specific gravity) ──
  E("WEX-FUELSG", "A.4.13", "Fuel mass ↔ litres (specific gravity)", "You need 300 kg of fuel with a specific gravity of 0.72. How many litres must you uplift?",
    ["Relationship: mass (kg) = volume (L) × SG.", "So volume = mass ÷ SG = 300 ÷ 0.72.", "= 417 litres.", "(Higher SG = denser fuel = more kg per litre. Colder fuel is denser.)"], "≈ 417 litres"),

  // ── Climb gradient ──
  E("WEX-GRAD", "A.4.7", "Climb gradient from ROC & groundspeed", "You are climbing at 500 ft/min with a groundspeed of 100 kt. What is the climb gradient?",
    ["Distance covered per minute = 100 kt = 100 ÷ 60 = 1.67 NM/min.", "Height gained per NM = ROC ÷ distance/min = 500 ÷ 1.67 = 300 ft/NM.", "As a percentage: 300 ft ÷ 6076 ft × 100 ≈ 4.9%.", "(Obstacle clearance is assessed on the gross/net gradient.)"], "≈ 300 ft/NM (≈ 4.9%)"),

  // ── Top of descent ──
  E("WEX-TOD", "A.4.7", "Top of descent distance", "You must descend 12 000 ft on a 3° path (≈ 300 ft per NM). How far out do you start down?",
    ["A 3° path loses ≈ 300 ft per NM.", "Distance = height to lose ÷ 300 = 12 000 ÷ 300 = 40 NM.", "(Rule of thumb: distance ≈ height (ft) ÷ 300, or flight-level ÷ 3.)"], "≈ 40 NM before the point"),
];

const KEY_MAPS = [PPL_MET_FIGURE_KEY, PPL_NAV_FIGURE_KEY, PPL_FPP_FIGURE_KEY, PPL_AGK_FIGURE_KEY, IR_MET_FIGURE_KEY, IR_FPP_FIGURE_KEY, IR_AWO_FIGURE_KEY];

export function getWorkedExamplesBySection(sectionId: string): WorkedExample[] {
  const direct = WORKED_EXAMPLES.filter((e) => e.sectionId === sectionId);
  if (direct.length) return direct;
  for (const map of KEY_MAPS) {
    const mapped = map[sectionId];
    if (mapped) {
      const via = WORKED_EXAMPLES.filter((e) => e.sectionId === mapped);
      if (via.length) return via;
    }
  }
  return [];
}
