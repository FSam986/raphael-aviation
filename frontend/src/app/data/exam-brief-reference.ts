// Exam-day quick reference — the formulas, unit conversions, V-speeds, key
// values, tables and mnemonics distilled from the question banks, grouped by
// subject family. Rendered in the Exam-Day Brief as a complete cram cheat sheet:
// every must-know number, table and memory aid for the subject, on one page.
// Each subject is built out topic-by-topic to cover the whole SACAA syllabus.

export interface BriefRef {
  heading: string;
  items: [string, string][]; // [label / formula / rule, value / detail / mnemonic]
}

export const BRIEF_REFERENCE: Record<string, BriefRef[]> = {
  // ══════════════════════════ NAVIGATION (A.9) ══════════════════════════
  nav: [
    { heading: "Core formulas", items: [
      ["Convergency", "ch.long × sin(mean latitude)"],
      ["Conversion angle", "½ × convergency"],
      ["Earth convergence", "= ch.long at the poles · = 0 at the equator"],
      ["1-in-60 track error", "(off-track ÷ dist gone) × 60"],
      ["1-in-60 closing angle", "(off-track ÷ dist to go) × 60"],
      ["Total alteration", "track error + closing angle"],
      ["Departure (E-W NM)", "ch.long(min) × cos(mean lat)"],
      ["Time / speed / distance", "time = dist ÷ speed · speed = dist ÷ time"],
      ["Air / ground NM", "ANM = TAS × time · GNM = GS × time"],
      ["Drift (1-in-60)", "≈ 60 × crosswind ÷ TAS"],
      ["GS (pure crosswind)", "√(TAS² − Xw²)"],
      ["Wind components", "head/cross = wind × cos / sin(angle off)"],
    ]},
    { heading: "Conversions (learn cold)", items: [
      ["1 NM", "1.852 km · 6080 ft · 1.15 SM · 1′ latitude"],
      ["1 statute mile", "1.609 km · 5280 ft"],
      ["1 km", "0.54 NM · 3280 ft"],
      ["1 m / 1 inch", "3.28 ft · 2.54 cm"],
      ["1° latitude", "60 NM · 1° longitude = 60 × cos(lat) NM"],
      ["Fuel volume", "1 imp gal = 4.55 L · 1 US gal = 3.785 L"],
      ["Temperature", "°C = (°F − 32) × 5/9 · K = °C + 273"],
    ]},
    { heading: "Direction & Q-codes", items: [
      ["True ↔ Magnetic", "Variation West → Magnetic Best (add W, subtract E)"],
      ["Magnetic ↔ Compass", "Deviation East → Compass Least"],
      ["QDM / QDR", "magnetic heading TO / bearing FROM"],
      ["QTE / QUJ", "true bearing FROM / true track TO"],
      ["QUJ − variation", "= QDM (true track to → magnetic heading to)"],
    ]},
    { heading: "Great circle vs rhumb line", items: [
      ["Great circle", "shortest distance · curves toward the nearer pole · track changes"],
      ["Rhumb line", "constant track · curves toward equator (concave to pole) · longer"],
      ["On equator / meridians", "GC and RL coincide"],
      ["GC vs RL at mid-lat", "GC is poleward of RL · difference = conversion angle"],
    ]},
    { heading: "Charts — properties", items: [
      ["Lambert conformal", "scale correct at 2 std parallels · GC ≈ straight · used mid-lat"],
      ["Mercator", "rhumb line = straight · scale expands as sec(lat) · GC curves to pole"],
      ["Polar stereographic", "used near poles · GC ≈ straight near pole"],
      ["Conformal (orthomorphic)", "bearings & shapes correct — required for aero charts"],
      ["Scale", "1:500 000 = 1 cm → 5 km · larger denominator = smaller scale"],
    ]},
    { heading: "Time & the solar system", items: [
      ["Arc → time", "360°=24 h · 15°=1 h · 1°=4 min · 15′=1 min · 1′=4 sec"],
      ["LMT vs UTC", "East of Greenwich = time ahead (add longitude in time)"],
      ["Sunrise/sunset", "earlier in the east · varies with latitude & season"],
      ["Day/night (SA law)", "15 min before sunrise → 15 min after sunset"],
      ["Seasons", "aphelion ~July (farthest) · perihelion ~Jan (nearest)"],
    ]},
  ],

  // ══════════════════════════ RADIO NAV (A.10) ══════════════════════════
  radionav: [
    { heading: "Core formulas", items: [
      ["Wavelength", "λ(m) = 300 ÷ f(MHz)"],
      ["Line-of-sight range", "1.25 (√h₁ + √h₂), heights in ft"],
      ["DME slant range", "slant, not ground — error greatest high & overhead"],
      ["ILS rate of descent", "GP° × GS × 100 ÷ 60 (≈ 5 × GS for 3°)"],
      ["Time/dist to NDB", "60 × min flown ÷ bearing change"],
      ["QDM (ADF)", "Heading(M) + Relative Bearing"],
    ]},
    { heading: "Frequency bands", items: [
      ["NDB / ADF", "LF/MF 190–1750 kHz"],
      ["VOR", "VHF 108.0–117.95 MHz"],
      ["ILS LOC / G-S / markers", "108–112 MHz / 329–335 MHz / 75 MHz"],
      ["DME", "UHF 962–1213 MHz (50 µs reply delay)"],
      ["SSR", "1030 ↑ / 1090 ↓ MHz"],
      ["Wx radar / Rad alt", "SHF ~9375 MHz / 4200–4400 MHz"],
      ["GPS L₁ / ELT", "1575.42 MHz / 121.5·243·406 MHz"],
    ]},
    { heading: "NDB / ADF", items: [
      ["Principle", "radial pattern · ADF needle shows RELATIVE bearing"],
      ["Errors", "night effect, coastal refraction, quadrantal, thunderstorm, static"],
      ["Advantages", "cheap, no line-of-sight limit (ground/sky wave)"],
      ["Radial is", "always FROM the beacon"],
    ]},
    { heading: "VOR", items: [
      ["Principle", "phase comparison — reference (omni) vs variable (rotating)"],
      ["Radial", "always magnetic & FROM the station (heading-independent)"],
      ["Errors", "site, terrain, scalloping · ±5° (±2° CVOR cone of confusion overhead)"],
      ["Cone of confusion", "no signal overhead — ‘OFF’/TO-FROM flips"],
    ]},
    { heading: "ILS", items: [
      ["Localiser", "runway centreline · 2–3° wide · more sensitive laterally"],
      ["Glideslope", "nominal 3° · FALSE glideslopes exist ABOVE the true one"],
      ["Categories", "CAT I DH 200 ft · II 100 ft · IIIa <100/50 · IIIb <50/15"],
      ["Markers", "Outer ~4 NM (blue, 400 Hz) · Middle ~0.5 NM (amber) · Inner (white)"],
    ]},
    { heading: "DME · SSR · GNSS", items: [
      ["DME", "slant range · pulse pair · max ~100 aircraft · UHF"],
      ["SSR modes", "A = ident · C = pressure altitude · S = selective/data"],
      ["Squawks", "7500 hijack · 7600 comms fail · 7700 emergency"],
      ["GNSS", "needs 4 sats for 3-D fix · RAIM for integrity · ≥5 for fault detect"],
      ["VDF bearing classes", "A ±2° · B ±5° · C ±10°"],
    ]},
  ],

  // ═══════════════════════ FLIGHT PLANNING (A.4) ═══════════════════════
  fpp: [
    { heading: "Core formulas", items: [
      ["ISA temperature", "15 − 2 × (alt ÷ 1000) °C"],
      ["ISA deviation", "OAT − ISA temperature"],
      ["Density altitude", "pressure alt + 120 × ISA deviation"],
      ["Pressure altitude", "elevation + (1013 − QNH) × 30"],
      ["Moment / CG", "moment = mass × arm · CG = Σmoment ÷ Σmass"],
      ["%MAC", "(CG − LEMAC) ÷ MAC × 100"],
      ["Mass shift", "shift = (mass moved × dist moved) ÷ total mass"],
      ["PET (critical point)", "D × H ÷ (O + H)"],
      ["PNR", "E × O × H ÷ (O + H) · E = safe endurance"],
      ["Fuel mass ↔ volume", "mass(kg) = volume(L) × SG"],
      ["Climb gradient", "ROC ÷ (GS ÷ 60) ft/NM · 1% ≈ 60 ft/NM"],
      ["Specific range", "GS ÷ fuel flow (ground) · TAS ÷ FF (air)"],
    ]},
    { heading: "V-speeds", items: [
      ["VS0 / VS1 / VSR", "stall landing / stall clean / reference stall"],
      ["V1 / VR / V2", "decision / rotate / take-off safety (V2 ≥ 1.2 Vs, 1.1 VMCA)"],
      ["V1 limits", "VMCG ≤ V1 ≤ VR"],
      ["VMCG / VMCA", "min control ground (rudder only) / air (critical eng out)"],
      ["VX / VY", "best ANGLE (obstacle) / best RATE of climb"],
      ["VYSE", "blue line — best 1-engine ROC (twin)"],
      ["VFE / VLE / VLO", "max flap / gear extended / gear operating"],
      ["VNO / VNE / VA", "max cruise / never exceed / manoeuvring (↓ at low mass)"],
      ["VREF", "landing ref ≈ 1.23–1.3 VS0"],
    ]},
    { heading: "Mass & balance terms", items: [
      ["BEM → DOM", "Basic Empty + crew/oil/removable = Dry Operating Mass"],
      ["ZFM", "DOM + traffic load (no usable fuel)"],
      ["TOM / LM", "ZFM + take-off fuel / TOM − trip fuel"],
      ["Useful load", "TOM − DOM (= traffic load + usable fuel)"],
      ["Datum / arm / moment", "reference · dist from datum · mass × arm"],
      ["Aft CG", "↓ stall speed, ↓ drag, LESS stable"],
      ["Fwd CG", "↑ stall speed, ↑ trim drag/fuel, MORE stable"],
    ]},
    { heading: "Performance factors", items: [
      ["Worst take-off", "Hot + High + Humid + Heavy + downwind + upslope"],
      ["Headwind", "↓ ground run, steepens climb over ground"],
      ["Tailwind (landing)", "sharply ↑ landing distance (heavily penalised)"],
      ["Glide distance", "independent of weight — only the speed changes"],
      ["Perf Class B", "light props ≤9 pax / ≤5700 kg (most CPL trainers)"],
      ["Declared distances", "TODA = TORA + clearway · ASDA = TORA + stopway · LDA"],
    ]},
    { heading: "Limits", items: [
      ["Load factors — Normal", "+3.8 / −1.52 g"],
      ["Utility / Acrobatic", "+4.4 / −1.76 · +6.0 / −3.0 g"],
      ["Ultimate load", "1.5 × limit load"],
      ["Fuel reserve (private)", "recip 45 min · turbine to alt + 30 min"],
    ]},
  ],

  // ══════════════════════════ INSTRUMENTS (A.7) ══════════════════════════
  instruments: [
    { heading: "Formulas & rules", items: [
      ["Pressure/altitude", "1 hPa ≈ 30 ft (≈27 ft at altitude)"],
      ["Total air temp", "TAT = SAT + ram rise (≈ (TAS÷100)²)"],
      ["Rate of turn", "Rate 1 = 3°/s = 360° in 2 min"],
      ["Bank for rate 1", "≈ (TAS ÷ 10) + 7"],
      ["Turn radius", "∝ TAS² (faster = wider)"],
      ["Airspeed chain", "IAS →(inst/posn) CAS →(compress) EAS →(density) TAS"],
    ]},
    { heading: "Pitot-static failures", items: [
      ["Pitot blocked, drain open", "ASI drops toward zero"],
      ["Pitot + drain blocked", "ASI acts like an ALTIMETER (reads ↑ in climb)"],
      ["Static blocked, descending", "ASI OVER-reads · ALT & VSI freeze at block height"],
      ["Static blocked, climbing", "ASI under-reads"],
      ["Alt static source", "cabin pressure < outside → ALT & ASI read a little HIGH"],
    ]},
    { heading: "ASI arcs & altimeter", items: [
      ["White arc", "VS0 → VFE (flap operating range)"],
      ["Green / Yellow arc", "VS1 → VNO / VNO → VNE (caution, smooth air only)"],
      ["Red / Blue radial", "VNE / VYSE (twin best 1-eng ROC)"],
      ["QNH / QFE / QNE", "altitude AMSL / height above datum / 1013 flight levels"],
      ["Servo altimeter", "induction pick-off → more accurate than simple capsule"],
    ]},
    { heading: "Compass & gyros", items: [
      ["Turning error", "UNOS — Undershoot North, Overshoot South (N. hemisphere)"],
      ["Acceleration error", "ANDS — Accelerate North, Decelerate South (E/W headings)"],
      ["Dip", "greatest at the poles, nil at the magnetic equator"],
      ["Gyro precession", "reaction acts 90° round in direction of rotation"],
      ["DG apparent drift", "≈ 15 × sin(latitude) °/hr"],
      ["Rigidity / precession", "rigidity ∝ rpm & mass · DI = earth/space rigidity"],
    ]},
    { heading: "Gyro instruments", items: [
      ["Attitude indicator", "earth gyro · vertical axis · tied to earth gravity"],
      ["Heading indicator (DI)", "space gyro · horizontal axis · needs realignment"],
      ["Turn coordinator", "rate gyro · shows rate of turn + balance (slip/skid)"],
      ["Balance ball", "step on the ball — slip = too little bank"],
    ]},
  ],

  // ══════════════════════════ METEOROLOGY (A.8) ══════════════════════════
  met: [
    { heading: "ISA & altimetry", items: [
      ["ISA at MSL", "15°C · 1013.25 hPa · 1.225 kg/m³"],
      ["Lapse rate", "1.98°C (≈2°) per 1000 ft to the tropopause"],
      ["Tropopause", "36 090 ft (11 km) · −56.5°C (mid-latitude)"],
      ["ISA deviation", "OAT − (15 − 2 × alt/1000)"],
      ["Pressure lapse", "≈ 1 hPa / 30 ft near MSL (27 ft/hPa at altitude)"],
      ["High to low / cold", "altimeter OVER-reads → true height LESS: ‘look out below’"],
    ]},
    { heading: "Lapse rates & stability", items: [
      ["DALR / SALR", "3.0°C / ~1.5–1.8°C per 1000 ft"],
      ["Stable / unstable", "ELR < SALR stable · ELR > DALR unstable · between = conditional"],
      ["Convective cloud base", "(T − Dp) ÷ 2.5 × 1000 ft AGL"],
      ["Inversion", "temp ↑ with height = very stable (traps haze/fog)"],
      ["Stable → cloud", "layer/stratiform · poor vis · steady precip"],
      ["Unstable → cloud", "heap/cumuliform · good vis · showers, turbulence"],
    ]},
    { heading: "Fronts", items: [
      ["Warm front slope", "≈ 1:150 · wide cloud 600 NM ahead · steady rain"],
      ["Cold front slope", "≈ 1:50 · narrow, CB, showers/TS · moves faster"],
      ["Warm front cloud seq", "CI → CS → AS → NS (then rain)"],
      ["Passage — wind", "VEERS (N. hem) at both fronts"],
      ["Occlusion", "cold overtakes warm · warm air lifted off surface"],
    ]},
    { heading: "Cloud, icing & hazards", items: [
      ["Low / med / high", "SF ST SC CU CB <6500 · AS AC NS to 23 000 · CI CS CC high"],
      ["Clear ice", "large supercooled drops, 0 to −15°C · heaviest, hardest"],
      ["Rime ice", "small drops freeze on impact · opaque, brittle"],
      ["Worst icing", "freezing rain · dense NS · CB cores"],
      ["TS stages", "cumulus (updraught) → mature (up+down, rain) → dissipating"],
      ["TS needs", "moisture + instability + lift (trigger)"],
    ]},
    { heading: "Fog & visibility", items: [
      ["Radiation fog", "clear night, light wind <5 kt, moist air · clears with sun/wind"],
      ["Advection fog", "warm moist air over cold surface · day or night"],
      ["Steam fog", "cold air over warm water (arctic sea smoke)"],
      ["Fog vs mist", "vis < 1000 m = fog · 1000–5000 m = mist/haze"],
      ["Freezing fog", "supercooled droplets"],
    ]},
    { heading: "Wind & pressure", items: [
      ["Buys Ballot (S. Hem)", "back to wind → LOW on your RIGHT"],
      ["Backing / veering", "backs = anticlockwise · veers = clockwise"],
      ["Surface wind (S. Hem)", "backs ~ left & slows vs gradient (friction)"],
      ["Geostrophic", "∝ pressure gradient, inverse sin(lat) · along isobars"],
      ["Jet stream", "near tropopause · ≥60 kt · polar front & subtropical"],
      ["QNH / QFE / QNE", "MSL / aerodrome datum / standard 1013"],
    ]},
    { heading: "South African weather", items: [
      ["Berg wind", "hot dry offshore (Föhn), ahead of a coastal low"],
      ["Cape Doctor", "strong SE, ridging South Atlantic high (Table cloth)"],
      ["Winter rainfall", "SW Cape (Mediterranean) · summer rain over interior/Highveld"],
      ["Namib / west coast", "cold Benguela → advection fog, low rain"],
      ["Coastal low", "berg wind → wind switch to cool SW ‘buster’"],
    ]},
  ],

  // ══════════════════════════ AIR LAW (A.3) ══════════════════════════
  airlaw: [
    { heading: "Cruising levels & VMC", items: [
      ["VFR cruising (mag track)", "000–179° → ODD +500 ft · 180–359° → EVEN +500 ft"],
      ["IFR cruising", "odd / even flight levels (no +500)"],
      ["Semi-circular applies", "above 1500 ft AGL · based on magnetic TRACK"],
      ["VMC ≥ FL100", "8 km vis · 1500 m horiz / 1000 ft vert from cloud"],
      ["VMC < FL100 (CTR)", "5 km vis · 1500 m horiz / 1000 ft vert"],
      ["Special VFR", "control zone · ground vis ≥ 1500 m · 2-way radio"],
    ]},
    { heading: "Recency & currency", items: [
      ["Day passengers", "3 TO & ldg in same class/category, prev 90 days"],
      ["Night passengers", "3 TO & ldg BY NIGHT, same class/category, 90 days"],
      ["IFR approach recency", "2 instrument approaches (or skill test) in 90 days"],
      ["IR validity", "12 months · lapsed >5 yrs → full initial requirements"],
      ["Flight-time limit", "≤100 hr / 30 days · ≤1000 hr / year"],
    ]},
    { heading: "Medical & licensing", items: [
      ["Class 1 medical", "12 months (<40 yr) · 6 months (≥40)"],
      ["Blood donation / scuba", "no flying within 72 h / 24 h"],
      ["CPL applicant", "≥18 yr · 200 hr incl 20 hr XC as PIC · 100 hr PIC"],
      ["IR applicant", "100 hr PIC incl 50 XC · 40 hr instrument (max 20 sim)"],
      ["Change of address", "notify CAA within 14 days"],
    ]},
    { heading: "Heights, oxygen & fuel", items: [
      ["Minimum heights", "500 ft from person/vessel/structure · 1000 ft over congested (2000 ft radius)"],
      ["Built-up / crowd", "1000 ft above highest obstacle · open-air assembly 3000 ft"],
      ["Oxygen", ">120 min between 10 000–12 000 ft · always above 12 000 ft"],
      ["Speed limit", "250 kt below FL100 outside CAS · 160 kt recip in CTR"],
      ["Fuel", "taxi+trip+contingency+alternate+final reserve — never below reserve"],
    ]},
    { heading: "Altimetry & procedures", items: [
      ["Transition altitude", "if unpublished = field elevation + 2000 ft"],
      ["Transition level (VMC)", "3000 ft AGL (≥1000 ft above transition alt)"],
      ["Notify ATS", "ETA change > 3 min · TAS change > 5%"],
      ["Flight plan filing", "up to 120 h ahead · cancelled if not activated in 1 h"],
      ["Right-hand circuit", "overtake by passing on the LEFT"],
    ]},
    { heading: "Signals, codes & reporting", items: [
      ["Emergency squawks", "7500 hijack · 7600 comms · 7700 emergency"],
      ["Steady green (air/grnd)", "cleared to land / cleared to taxi"],
      ["Steady red", "give way & circle (air) / STOP (ground)"],
      ["Red flashes (ground)", "taxi clear of landing area in use"],
      ["Transponder / ELT", "Mode C/S · ELT 121.5 / 406 MHz"],
      ["Accident abroad (SA a/c)", "report to that State's authority, then the Commissioner"],
    ]},
  ],

  // ══════════════════════ GENERAL RADIO (GR) ══════════════════════
  gr: [
    { heading: "Formulas & codes", items: [
      ["Line-of-sight range", "1.25 (√h₁ + √h₂), ft"],
      ["Wavelength", "λ(m) = 300 ÷ f(MHz)"],
      ["Emergency squawks", "7500 hijack · 7600 comms · 7700 emergency"],
      ["Channel spacing", "25 kHz / 8.33 kHz · VHF 118–137 MHz"],
      ["ELT frequencies", "121.5 · 243 · 406 MHz"],
    ]},
    { heading: "Phraseology & readback", items: [
      ["Must read back", "clearances, level, heading, speed, SSR, QNH, runway, freq"],
      ["Readability scale", "1 unreadable · 2 now & then · 3 w/ difficulty · 4 readable · 5 perfect"],
      ["Confirm / Say again", "verify details / repeat (all before/after = portion)"],
      ["Numbers 1500", "wun tousand fife hundred · QDM = mag heading TO"],
      ["ATC vs report wind", "tower wind = MAGNETIC · METAR/TAF = TRUE"],
    ]},
    { heading: "Airspace & flight plans", items: [
      ["Class A / C / F / G", "IFR only / IFR+VFR separated / advisory / information only"],
      ["Transition layer", "≥1000 ft between transition alt & level"],
      ["FPL fields", "Item 7 ID (≤7) · 8 rules (Y=IFR→VFR, Z=VFR→IFR) · 10 equip (S=std)"],
      ["Levels in FPL", "F085 = FL085 · A045 = 4500 ft · N = knots"],
      ["RVSM", "FL290–FL410"],
    ]},
    { heading: "Emergency & RCF", items: [
      ["Distress / urgency", "MAYDAY ×3 / PAN PAN ×3"],
      ["Message priority", "Distress > Urgency > DF > Flight safety > Met > Regularity"],
      ["SAR phases", "INCERFA (uncertainty) → ALERFA (alert) → DETRESFA (distress)"],
      ["RCF hold time", "7 min (radar/surveillance) · 20 min (no surveillance)"],
      ["Test transmission", "max 10 seconds"],
    ]},
  ],

  // ══════════════════════ HUMAN PERFORMANCE (A.6) ══════════════════════
  hp: [
    { heading: "Physiology — numbers", items: [
      ["Atmosphere", "78% N₂ · 21% O₂ · 1% other (constant to ~70 000 ft)"],
      ["Alveolar O₂", "~14% (diluted by CO₂ + water vapour)"],
      ["TUC", "~30 min @20 000 · 1–2 min @30 000 · 15–20 s explosive @40 000 ft"],
      ["Oxygen cover", "air/O₂ mix to 33 700 ft · 100% O₂ to 40 000 ft · pressure breathing above"],
      ["Cabin altitude", "max ~6000–8000 ft · DCS = N₂ bubbles out of solution"],
      ["g-tolerance", "highest fore-and-aft · barotrauma worst on DESCENT"],
    ]},
    { heading: "The senses", items: [
      ["Fovea / rods", "fovea = cones, sharp colour · rods = night/peripheral, monochrome"],
      ["Blind spot", "optic-nerve exit (no receptors)"],
      ["Empty-field myopia", "no refs → eye focuses ~1–2 m (scan small & frequent)"],
      ["Somatogravic illusion", "accel = nose-UP · decel = nose-DOWN"],
      ["Deafness", "conductive = eardrum/ossicles · presbycusis = age · NIHL = noise"],
    ]},
    { heading: "Health & sleep", items: [
      ["Circadian", "free-run ≈ 25 h · re-sync ~1–1.5 h/day · EAST harder · trough ~0500"],
      ["Sleep", "slow-wave (3–4) restores BODY · REM consolidates MEMORY · cycle ~90 min"],
      ["Alcohol / diving", "only time clears alcohol · no fly 12 h diving (24 h if >30 ft)"],
      ["Donation", "blood 24 h · bone marrow 48 h before flying"],
      ["BMI / CO", ">25 overweight, >30 obese · CO cherry-red, smoking 20/day ≈ +5–6000 ft"],
      ["Incapacitation", "acute gastro-enteritis is the top cause"],
    ]},
    { heading: "Psychology & CRM", items: [
      ["Sensory stores", "iconic (visual) 0.5–1 s · echoic (auditory) 2–8 s"],
      ["Working memory", "7 ± 2 items · lost ~10–20 s unless rehearsed · chunking expands"],
      ["Reaction time", "simple ≈ 0.2 s · saccade ≈ 0.33 s"],
      ["5 hazardous attitudes", "anti-authority · impulsivity · invulnerability · macho · resignation"],
      ["Rasmussen", "skill (slips) · rule (if–then) · knowledge (novel)"],
      ["Stress / arousal", "perceived demand vs perceived ability · inverted-U"],
      ["Colours", "red = warning · amber = caution · green = normal"],
    ]},
    { heading: "First aid & survival", items: [
      ["First-aid order", "DRABC — Danger, Response, Airway, Breathing, Circulation"],
      ["Survival order", "Protection → Location → Water → Food"],
      ["ELT", "121.5 MHz (homing) + 406 MHz (satellite)"],
    ]},
  ],
  // ══════════════════════ AIRCRAFT TECHNICAL (A.1) ══════════════════════
  atg: [
    { heading: "Piston engine", items: [
      ["4-stroke cycle", "Induction · Compression · Power · Exhaust (‘Suck Squeeze Bang Blow’)"],
      ["Detonation", "uncontrolled explosion · high CHT · cured by rich mixture / lower power"],
      ["Pre-ignition", "charge fires early (hot spot) before the plug"],
      ["Mixture with altitude", "air thins → mixture richens → lean on the climb"],
      ["Magnetos", "engine-driven, self-sufficient · drop on single mag test (dead cut = fault)"],
      ["Carb icing", "most likely low power, high humidity, +℃ to +25℃ · apply carb heat"],
    ]},
    { heading: "Gas turbine", items: [
      ["Working cycle", "Suck · Squeeze · Bang · Blow (continuous, constant pressure)"],
      ["Modules", "intake → compressor → combustion → turbine → exhaust"],
      ["Start sequence", "rotate → igniters ON → fuel ON (igniter BEFORE fuel)"],
      ["Hung / wet start", "low rpm/EGT / fuel pooled, no light-up — low battery cause"],
      ["EGT", "key limit — overtemp on start = hot start"],
      ["EPR / N1", "thrust indication (pressure ratio turbine-out : compressor-in)"],
    ]},
    { heading: "Subsonic aerodynamics", items: [
      ["Lift", "L = ½ρV²S·CL · stall = CLmax exceeded (critical AoA ~16°)"],
      ["Induced drag", "∝ 1/V² · greatest slow/high AoA · reduced by winglets/high AR"],
      ["Parasite drag", "∝ V² · total drag min at VMD (best glide)"],
      ["Stall speed", "↑ with weight, load factor, forward CG · Vs ∝ √(load factor)"],
      ["Load factor in turn", "n = 1 ÷ cos(bank) · 60° bank = 2 g · stall speed ×√n"],
      ["Centre of pressure", "moves FORWARD as AoA ↑ (to the stall)"],
    ]},
    { heading: "Electrics & systems", items: [
      ["DC generator vs alternator", "alternator better at low rpm · needs battery to excite field"],
      ["Bus bar", "central distribution · split to shed load on failure"],
      ["Paralleled generators", "share load equally · equalising circuit"],
      ["Hydraulic reservoir", "accumulator stores pressure · relief valve limits max"],
      ["Pressurisation", "outflow valve controls cabin · differential limit protects fuselage"],
      ["Static bonding", "prevents radio static / lightning build-up"],
    ]},
    { heading: "Hazards & emergency", items: [
      ["Fire triangle", "fuel + heat + oxygen · extinguish by removing one"],
      ["Fire extinguishers", "hand extinguisher required on ALL aircraft"],
      ["Fuel contamination", "water (drain sumps) · check grade/colour"],
      ["Oxygen", "needed with altitude — hypoxia insidious, no warning"],
      ["Bonding → radio", "poor bonding causes precipitation static"],
    ]},
  ],
};

export function briefFamily(subjectId: string): string | null {
  const id = subjectId;
  if (id.includes("air-law") || id.includes("awo")) return "airlaw";
  if (id.includes("radiotelephony")) return "gr";
  if (id.includes("radio-nav")) return "radionav";
  if (id.includes("nav")) return "nav";
  if (id.includes("met")) return "met";
  if (id.includes("flight-planning") || id.includes("flight-performance")) return "fpp";
  if (id.includes("instrument")) return "instruments";
  if (id.includes("aircraft-technical") || id.includes("atg")) return "atg";
  if (id.includes("human-performance") || id.includes("hpl")) return "hp";
  return null;
}

export function getBriefReference(subjectId: string): BriefRef[] {
  const fam = briefFamily(subjectId);
  return fam ? BRIEF_REFERENCE[fam] ?? [] : [];
}
