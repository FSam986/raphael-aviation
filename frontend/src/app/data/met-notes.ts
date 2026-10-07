// ============================================================================
// SACAA CPL — METEOROLOGY STUDY NOTES
// Exam-focused notes distilled from CAE Oxford ATPL Meteorology, mapped to the
// SACAA syllabus (A.8.x). Written to get the student through the exam: key
// facts, the numbers they test, and the traps that catch people out.
// ============================================================================

export interface NoteBlock {
  heading: string;
  points: string[]; // each point is exam-relevant
}

export interface SectionNote {
  sectionId: string; // e.g. "A.8.1"
  title: string;
  intro: string;
  blocks: NoteBlock[];
  mustKnow: string[]; // the highest-yield facts examiners love
  traps: string[]; // common mistakes / distractors
}

export const MET_NOTES: SectionNote[] = [
  {
    sectionId: "A.8.1",
    title: "The Atmosphere",
    intro:
      "The atmosphere is the layer of gases held to the Earth by gravity. Almost all weather — and everything an exam will ask you about clouds, wind, icing and turbulence — happens in the lowest layer, the troposphere. Nail the composition, the vertical structure, and the tropopause figures and you will pick up easy marks here.",
    blocks: [
      {
        heading: "1. Composition of the air",
        points: [
          "By VOLUME, dry air is ~78% Nitrogen, ~21% Oxygen, ~1% Argon, plus trace gases (CO₂ ~0.04%).",
          "Nitrogen + Oxygen together make up ~99% of the atmosphere.",
          "These proportions stay constant up to ~80 km (the 'homosphere') because turbulent mixing keeps the air well stirred.",
          "WATER VAPOUR is the variable gas (0–4%). It is NOT part of 'dry air' figures, yet it has the GREATEST effect on weather — its phase changes make cloud, rain, fog and release latent heat.",
          "Ozone (O₃) sits mainly in the stratosphere and absorbs ultraviolet radiation, warming that layer.",
        ],
      },
      {
        heading: "2. Vertical structure (layers from the surface up)",
        points: [
          "TROPOSPHERE → STRATOSPHERE → MESOSPHERE → THERMOSPHERE. Remember the order 'The Silly Man Turns'.",
          "Troposphere: temperature FALLS with height (avg ~2°C/1000 ft = 6.5°C/km). Contains ~75% of the atmosphere's mass and virtually all water vapour and weather.",
          "Stratosphere: stable, dry, little vertical motion. Temperature is roughly constant then RISES with height (ozone absorbs UV). Acts as a 'lid' on weather.",
          "The boundaries are named with '-pause': tropopause (top of troposphere), stratopause, mesopause.",
        ],
      },
      {
        heading: "3. The tropopause (very high-yield)",
        points: [
          "Definition: the boundary between the troposphere and the stratosphere — where temperature STOPS falling with height.",
          "Height and temperature vary with latitude: EQUATOR ~16–18 km, coldest (~-75°C); MID-LATITUDES (50°N) ~11 km (~-56.5°C); POLES ~8 km (warmer than equatorial tropopause at ~-45°C).",
          "So the tropopause is HIGHEST and COLDEST over the equator, LOWEST over the poles.",
          "It is higher in summer than winter, and jet streams are found near breaks in the tropopause.",
        ],
      },
      {
        heading: "4. How the atmosphere is heated",
        points: [
          "The air is NOT heated directly by the sun to any great degree. Incoming solar radiation (insolation) passes through and heats the SURFACE.",
          "The surface then warms the air above by conduction and convection, and by re-radiating long-wave (infra-red) energy. That is why the lower troposphere is warmest.",
          "Albedo = fraction of radiation reflected (snow high, dark soil low). Convection = vertical heat transfer; advection = horizontal transfer by wind.",
        ],
      },
      {
        heading: "5. Pressure and the height relationship",
        points: [
          "Pressure falls with height at ~1 hPa per 27.2 ft (rounded to 30 ft) — but ONLY in the low levels. Air is compressible, so it thins with height and the relationship is NOT linear.",
          "At about 18,000 ft the pressure is roughly HALF its sea-level value (~500 hPa).",
          "By 20,000 ft, 1 hPa is worth ~47 ft because the column is thinner — the same pressure change now spans more height.",
          "This is exactly why pressure altimeters must be corrected for non-standard temperature and pressure.",
        ],
      },
      {
        heading: "6. The four layers in numbers (Figure 1-1)",
        points: [
          "Layers are divided by how TEMPERATURE behaves with height, and each boundary is a '-pause'.",
          "TROPOSPHERE: surface → 8 km (26,000 ft) at the poles, 16 km (52,000 ft) at the equator, ~11 km (36,090 ft) at 45°. Temperature falls 1.98°C/1000 ft to -56.5°C. Holds almost all weather.",
          "STRATOSPHERE: tropopause → 50 km (98,000 ft). Isothermal at -56.5°C up to ~20 km, then RISES 0.3°C/1000 ft to ~0°C at the stratopause (ozone heating). Dry and stable — excellent flying, but CAT can occur.",
          "MESOSPHERE: stratopause → 80 km (262,000 ft). Temperature falls again to about -80°C at the mesopause — the COLDEST part of the atmosphere.",
          "IONOSPHERE / THERMOSPHERE: mesopause → 1000 km+. Temperature rises towards ~2000°C. Ionised layers reflect, refract and attenuate HF radio waves.",
        ],
      },
      {
        heading: "7. Ozone, UV and condensation nuclei",
        points: [
          "Ozone (O₃) forms in the stratosphere: intense UV splits an O₂ molecule and a freed oxygen atom joins another O₂. It shields the surface from UV and warms the stratosphere — temperature peaks near 0°C at ~50 km.",
          "Ozone is present at only ~2 parts per million by weight, yet is vital to life and to the temperature structure.",
          "Condensation nuclei are hygroscopic (water-attracting) particles — sea salt, dust, volcanic ash, soot, nitrous acids. Water vapour CANNOT condense into cloud droplets without them.",
          "Typical nucleus size is 0.1–1.0 micron, with a few larger at 5–6 microns.",
        ],
      },
    ],
    mustKnow: [
      "Dry air: 78% N₂, 21% O₂, 1% Ar (+ trace CO₂).",
      "Water vapour is the variable gas with the greatest effect on weather.",
      "Layer order: Troposphere, Stratosphere, Mesosphere, Thermosphere.",
      "Troposphere holds ~75% of mass and almost all weather; temp falls ~2°C/1000 ft.",
      "Tropopause: ~11 km / -56.5°C at 50°N; ~16-18 km / -75°C at equator; ~8 km at poles.",
      "Highest & coldest tropopause = equator; lowest = poles.",
      "Air is heated from below (surface up), not directly by the sun.",
      "Pressure halves by ~18,000 ft; ~1 hPa/27 ft low down, ~1 hPa/47 ft at 20,000 ft (not a fixed number).",
      "Stratosphere: isothermal -56.5°C to ~20 km, then warms to ~0°C at 50 km (ozone); mesopause ~-80°C is the coldest point; thermosphere heats to ~2000°C.",
      "Condensation nuclei (0.1–1.0 micron) are essential for cloud to form.",
    ],
    traps: [
      "Don't confuse 'greatest effect on weather' (water vapour) with 'most abundant gas' (nitrogen).",
      "The equatorial tropopause is the COLDEST even though the surface there is hottest — it is simply much higher.",
      "Temperature increasing with height (stratosphere / inversions) is the exception, not the rule.",
      "The stratosphere is stable and DRY — no significant weather forms there.",
      "The layers are divided by TEMPERATURE behaviour, not by composition — Troposphere, Stratosphere, Mesosphere, Ionosphere(Thermosphere).",
      "1 hPa is NOT a fixed number of feet — it grows as air thins with height (~27 ft low, ~47 ft at 20,000 ft).",
    ],
  },
  {
    sectionId: "A.8.2",
    title: "ICAO Standard Atmosphere (ISA)",
    intro:
      "The ISA is a fixed, agreed 'model' atmosphere used to calibrate altimeters and compare aircraft performance. The real atmosphere rarely matches it, so you must know the ISA values cold and be able to work out the ISA temperature at any level and the deviation from it.",
    blocks: [
      {
        heading: "1. ISA sea-level values (memorise exactly)",
        points: [
          "Pressure 1013.25 hPa (29.92 inHg); Temperature +15°C (288 K); Density 1.225 kg/m³.",
          "Temperature lapse rate 1.98°C (≈2°C) per 1000 ft, i.e. 6.5°C/km, up to the tropopause.",
          "Tropopause fixed at 11 km / 36,090 ft, temperature -56.5°C (216.5 K).",
          "From 11 km to 20 km the ISA is ISOTHERMAL at -56.5°C (temperature stops falling).",
        ],
      },
      {
        heading: "2. Working with ISA",
        points: [
          "ISA temp at a level = 15 − (2 × altitude in thousands of ft). e.g. FL200 → 15 − 40 = -25°C.",
          "ISA deviation = actual OAT − ISA temp. Warmer than ISA = 'ISA +'; colder = 'ISA −'.",
          "Approx pressure levels: 850 hPa ≈ 5000 ft, 700 hPa ≈ 10,000 ft, 500 hPa ≈ 18,000 ft, 300 hPa ≈ 30,000 ft.",
          "Warmer than ISA → less dense air → true altitude HIGHER than indicated; colder → LOWER (see Altimetry).",
        ],
      },
      {
        heading: "✍ Worked example — ISA temperature & deviation",
        points: [
          "Given: flight level FL200, actual OAT −15°C.",
          "ISA temp at FL200 = 15 − (2 × 20) = −25°C.",
          "ISA deviation = OAT − ISA temp = −15 − (−25) = +10°C → the day is 'ISA +10'.",
        ],
      },
    ],
    mustKnow: [
      "ISA MSL: 1013.25 hPa, +15°C, 1.225 kg/m³.",
      "Lapse rate 1.98°C/1000 ft (6.5°C/km) to 11 km.",
      "Tropopause 36,090 ft at -56.5°C; isothermal above to 20 km.",
      "ISA temp = 15 − 2×(FL/10... i.e. per 1000 ft).",
      "ISA deviation = actual − ISA.",
    ],
    traps: [
      "The ISA assumes DRY air — it ignores humidity.",
      "-56.5°C is the LOWEST ISA temperature; it does not keep falling above the tropopause.",
      "Don't mix units: lapse rate is ~2°C/1000 ft OR 6.5°C/km — same thing.",
    ],
  },
  {
    sectionId: "A.8.3",
    title: "Pressure",
    intro:
      "Atmospheric pressure is the weight of the air column above you. Everything about altimetry, winds and charts depends on understanding QNH/QFE/QFF and how pressure changes with height and horizontally (the gradient that drives the wind).",
    blocks: [
      {
        heading: "1. Pressure settings (Q-codes)",
        points: [
          "QFE = pressure at aerodrome level (altimeter reads 0 on the ground / height above the field).",
          "QNH = QFE reduced to MSL using ISA (altimeter reads aerodrome ELEVATION on the ground).",
          "QFF = pressure reduced to MSL using ACTUAL conditions — used to draw isobars on surface charts.",
          "Standard Pressure Setting (QNE) = 1013.25 hPa, used for flight levels.",
          "For a field above MSL: QFE < QNH; on a cold day QFF > QNH.",
        ],
      },
      {
        heading: "2. Pressure patterns & change",
        points: [
          "Isobars join points of equal pressure (QFF). Close isobars = strong wind; wide = light wind.",
          "Low = depression; High = anticyclone; trough = extension of low; ridge = extension of high; col = neutral saddle (light winds).",
          "Near the surface pressure falls ~1 hPa per 27–30 ft.",
          "METAR pressure group = QNH rounded DOWN to the nearest whole hPa.",
          "Upper charts use isohypses (height contours in decametres), not isobars.",
        ],
      },
    ],
    mustKnow: [
      "QFE = field level; QNH = QFE to MSL (ISA); QFF = to MSL (actual, for isobars).",
      "1013.25 hPa = standard setting for flight levels.",
      "Field above MSL: QFE < QNH. Cold day: QFF > QNH.",
      "~1 hPa per 27–30 ft near the surface.",
      "Close isobars → strong wind.",
    ],
    traps: [
      "QNH uses ISA in the reduction; QFF uses ACTUAL conditions — that's the whole difference.",
      "METAR QNH is rounded DOWN, not to the nearest.",
      "A col has LIGHT variable winds, not strong.",
    ],
  },
  {
    sectionId: "A.8.4",
    title: "Temperature",
    intro:
      "The air is warmed from below by the surface, so how the surface heats and cools controls temperature, inversions and the daily range. Inversions and advection are the exam favourites.",
    blocks: [
      {
        heading: "1. Heating, cooling and the daily range",
        points: [
          "Surface absorbs insolation and warms the air by conduction/convection; max temp lags noon to mid-afternoon, min just after dawn.",
          "Largest daily range: clear skies + light wind + dry (deserts). Cloud/wind/humidity REDUCE the range.",
          "Sea has high specific heat → moderates coastal (maritime) climates; continental interiors have big ranges.",
        ],
      },
      {
        heading: "2. Inversions (temperature rising with height)",
        points: [
          "Radiation inversion: clear, calm night, ground cools by radiation.",
          "Subsidence inversion: descending air warms by compression.",
          "Advection inversion: warm air moves over a cold surface.",
          "Frontal inversion: warm air lies over cold air at a front.",
          "Effect: very stable, traps haze/pollution → POOR visibility, smooth air.",
        ],
      },
      {
        heading: "📐 Key formulas & worked example — temperature",
        points: [
          "°F = (°C × 1.8) + 32;   °C = (°F − 32) ÷ 1.8;   K = °C + 273.",
          "Example: 100°C → (100 × 1.8) + 32 = 212°F.  Reverse: (212 − 32) ÷ 1.8 = 100°C.",
          "Environmental lapse rate (ELR) ≈ 2°C per 1000 ft in the troposphere.",
        ],
      },
    ],
    mustKnow: [
      "Air is heated from below (surface up).",
      "Max temp mid-afternoon; min just after sunrise.",
      "Biggest daily range: clear, calm, dry.",
      "Inversion = temp INCREASES with height = very stable = poor vis.",
      "Advection = horizontal transport; convection = vertical.",
    ],
    traps: [
      "Cloud at night REDUCES cooling (re-radiates heat down) — clear nights cool fastest.",
      "An inversion traps pollutants → poor visibility (not good).",
      "Dew point spread is largest in DRY air, zero when saturated.",
    ],
  },
  {
    sectionId: "A.8.5",
    title: "Humidity",
    intro:
      "Humidity is the water vapour in the air. Relative humidity, dew point and saturation drive cloud, fog and precipitation, and latent heat drives convection. Get the temperature-capacity relationship right and this section is easy marks.",
    blocks: [
      {
        heading: "1. Key definitions",
        points: [
          "Relative humidity (RH) = actual vapour ÷ maximum the air can hold at that temperature (%). Depends on BOTH moisture and temperature.",
          "Dew point = temperature to which air must be cooled (at constant pressure) to become saturated (RH 100%).",
          "Warm air holds MORE vapour than cold air.",
          "Cooling air (same moisture) → RH INCREASES; warming → RH DECREASES.",
          "Temp = dew point → saturated → fog/cloud likely.",
        ],
      },
      {
        heading: "2. Latent heat & supercooling",
        points: [
          "Evaporation ABSORBS latent heat; condensation RELEASES it (adds buoyancy → instability).",
          "Supercooled water = liquid below 0°C — the cause of airframe icing.",
          "Condensation needs condensation nuclei; humidity measured with a hygrometer/psychrometer (wet & dry bulb).",
        ],
      },
      {
        heading: "📐 Key formula & worked example — humidity",
        points: [
          "Relative humidity (RH) = (amount of water vapour present ÷ maximum the air can hold at that temperature) × 100%.",
          "Dew point = the temperature to which the air must be cooled (at constant pressure) to reach saturation (RH 100%).",
          "Example: air holding 8 g/m³ when it could hold 16 g/m³ → RH = 8/16 × 100 = 50%.",
          "A small temperature/dew-point spread means the air is near saturation → fog/low-cloud risk.",
        ],
      },
    ],
    mustKnow: [
      "RH depends on moisture AND temperature.",
      "Dew point = cool-to-saturation temperature.",
      "Cooling raises RH; warming lowers it.",
      "Temp = dew point → saturation (fog/cloud).",
      "Condensation releases latent heat; supercooled water below 0°C causes icing.",
    ],
    traps: [
      "Warming air LOWERS RH (bigger capacity), even though moisture is unchanged.",
      "Moist air is LESS dense than dry air at the same temp/pressure.",
      "Dew point depends on moisture content, not the current temperature.",
    ],
  },
  {
    sectionId: "A.8.6",
    title: "Density",
    intro:
      "Air density decides how much lift, thrust and power an aircraft gets. 'Hot and high' kills performance because the air is thin. Density altitude packages all of this into one number.",
    blocks: [
      {
        heading: "1. What changes density",
        points: [
          "Gas law: density ∝ pressure, density ∝ 1/absolute temperature (P = ρRT).",
          "Density DECREASES with: increasing altitude, increasing temperature, increasing humidity.",
          "Density INCREASES with: higher pressure, lower temperature.",
          "Moist air is LESS dense than dry air (water vapour is lighter than N₂/O₂).",
        ],
      },
      {
        heading: "2. Density altitude & performance",
        points: [
          "Density altitude = pressure altitude corrected for temperature. Equals pressure altitude only in ISA.",
          "HIGH density altitude (hot, high, low pressure, humid) = thin air = degraded performance: longer take-off/landing, poorer climb, higher TAS for a given IAS.",
          "Best performance: cold, low elevation, high pressure (dense air).",
        ],
      },
      {
        heading: "📐 Key formulas — density",
        points: [
          "Gas law: ρ = P ÷ (R × T)  — density ∝ pressure, density ∝ 1/absolute temperature.",
          "ISA sea-level density ρ₀ = 1.225 kg/m³ (1225 g/m³).",
          "Density altitude ≈ pressure altitude + 120 ft × ISA deviation (see Altimetry for the worked example).",
          "Moist air is LESS dense than dry air at the same temperature and pressure (water vapour is lighter).",
        ],
      },
    ],
    mustKnow: [
      "ISA MSL density 1.225 kg/m³.",
      "Density falls with altitude, temperature and humidity; rises with pressure.",
      "Density altitude = pressure altitude corrected for temperature.",
      "High density altitude → worse performance (hot & high).",
      "Moist air is less dense than dry air.",
    ],
    traps: [
      "Humid air is LESS dense (a common trap — people assume 'heavier').",
      "Stall speed in IAS is unchanged, but TAS at stall is higher in thin air.",
    ],
  },
  {
    sectionId: "A.8.7",
    title: "Altimetry",
    intro:
      "The altimeter is a barometer calibrated to the ISA. When the real atmosphere differs from ISA, it lies to you — and in cold, low-pressure air it says you are HIGHER than you really are. This is a terrain-safety topic examiners push hard.",
    blocks: [
      {
        heading: "1. The golden rules",
        points: [
          "'High to LOW, or hot to COLD, look out BELOW' — flying into lower pressure OR colder air, your true altitude is LOWER than indicated.",
          "Cold air → altimeter OVER-reads (you are lower than shown) — dangerous near terrain.",
          "Warm air → altimeter UNDER-reads (you are higher than shown).",
          "1 hPa on the subscale ≈ 30 ft.",
        ],
      },
      {
        heading: "2. Settings & separation",
        points: [
          "Below transition altitude: fly on QNH (read altitude above MSL) for terrain clearance.",
          "Above transition level: set 1013.25 hPa (flight levels) so all aircraft share one datum for vertical separation.",
          "In cold air, ADD a temperature correction to published minimum altitudes.",
          "Worst case for terrain: LOW pressure AND COLD air together.",
        ],
      },
      {
        heading: "📐 Key formulas",
        points: [
          "Pressure altitude = elevation + (1013 − QNH) × 30 ft  (low QNH → higher PA).",
          "Density altitude ≈ pressure altitude + 120 ft × ISA deviation.",
          "ISA deviation = OAT − ISA temp;  ISA temp = 15 − 2 × (altitude in thousands of ft).",
          "Altimeter error near the surface: 1 hPa ≈ 30 ft (27 ft precise).",
        ],
      },
      {
        heading: "✍ Worked example — pressure & density altitude",
        points: [
          "Given: elevation 2 000 ft, QNH 1003 hPa, OAT +30°C.",
          "PA = 2 000 + (1013 − 1003) × 30 = 2 000 + 300 = 2 300 ft.",
          "ISA temp at 2 300 ft = 15 − 2 × 2.3 = +10.4°C;  ISA deviation ≈ +20°C.",
          "DA ≈ 2 300 + 120 × 20 = 2 300 + 2 400 ≈ 4 700 ft — much reduced take-off/climb performance.",
        ],
      },
    ],
    mustKnow: [
      "High-to-low / hot-to-cold → true altitude LOWER than indicated.",
      "Cold air makes the altimeter OVER-read (aircraft lower than shown).",
      "1 hPa ≈ 30 ft.",
      "Below transition alt: QNH. Above transition level: 1013.",
      "Cold air near terrain: apply a positive altitude correction.",
    ],
    traps: [
      "It is COLD air (not warm) that puts you dangerously low.",
      "A QNH BELOW 1013 means your true altitude is below the flight-level reading.",
      "Setting a higher-than-actual pressure makes the altimeter OVER-read.",
    ],
  },
  {
    sectionId: "A.8.8",
    title: "Winds",
    intro:
      "Wind is air moving from high to low pressure, bent by Coriolis and slowed/turned by friction near the ground. Learn geostrophic vs surface wind, backing/veering and the jet streams.",
    blocks: [
      {
        heading: "1. Forces & the surface wind",
        points: [
          "Geostrophic wind = pressure-gradient force balanced by Coriolis; blows PARALLEL to straight isobars (above the friction layer).",
          "Friction (below ~2000 ft) BACKS the surface wind (NH) and REDUCES its speed, so it crosses isobars toward low pressure.",
          "Backing = anticlockwise change; veering = clockwise. Buys Ballot (NH): back to the wind, low is on your LEFT.",
          "Coriolis: zero at equator, max at poles; deflects right in NH, left in SH.",
        ],
      },
      {
        heading: "2. Jet streams & local winds",
        points: [
          "Jet stream: narrow band near the tropopause, core ≥ 60 kt; polar-front and subtropical jets.",
          "In NH: warm air on the equatorward side, cold air on the poleward side; worst turbulence (CAT) on the cold side/below the core.",
          "Local winds: Föhn/Chinook (warm dry, lee side), Mistral & Bora (cold katabatic), sea breeze (sea→land by day), land breeze (land→sea at night).",
        ],
      },
    ],
    mustKnow: [
      "Geostrophic wind is parallel to straight isobars (PGF vs Coriolis).",
      "Surface friction backs & slows the wind, crossing isobars toward low.",
      "Buys Ballot NH: back to wind → low on the left.",
      "Jet core ≥ 60 kt near the tropopause; cold air poleward side.",
      "Sea breeze by day (sea→land); land breeze at night.",
    ],
    traps: [
      "Surface wind is WEAKER and more backed than the gradient/3000 ft wind.",
      "Föhn wind is WARM and DRY (descending), not cold.",
      "METAR winds are TRUE; tower/ATIS winds are MAGNETIC.",
    ],
  },
  {
    sectionId: "A.8.9",
    title: "Thermodynamics & Stability",
    intro:
      "Stability decides whether you get flat layer cloud and smooth air, or towering convection, showers and turbulence. Compare the environmental lapse rate (ELR) with the dry (DALR) and saturated (SALR) adiabatic rates.",
    blocks: [
      {
        heading: "1. The lapse rates",
        points: [
          "DALR = 3°C/100 m (unsaturated rising parcel). SALR ≈ 1.5°C/100 m (saturated — less, because condensation releases latent heat).",
          "ELR = the actual temperature profile of the surrounding air (a measured value, not a parcel rate).",
          "Adiabatic = no heat exchange; rising air cools by expansion, sinking air warms by compression.",
        ],
      },
      {
        heading: "2. Stability rules & weather",
        points: [
          "ELR < SALR → absolutely STABLE. ELR > DALR → absolutely UNSTABLE. Between the two → CONDITIONALLY unstable.",
          "Stable air: layer (stratiform) cloud, poor visibility, steady precip/drizzle, smooth air.",
          "Unstable air: heap (cumuliform) cloud, showers, good visibility, gusty winds, turbulence.",
          "Subsidence and inversions increase stability and cap cloud development.",
        ],
      },
    ],
    mustKnow: [
      "DALR 3°C/100 m; SALR ≈1.5°C/100 m; SALR < DALR due to latent heat.",
      "ELR<SALR stable; ELR>DALR unstable; between = conditionally unstable.",
      "Stable → stratus, poor vis, smooth. Unstable → cumulus, showers, good vis, turbulent.",
      "0.65°C/100 m (and 1°C/100 m) = conditionally unstable.",
      "Subsidence/inversions increase stability.",
    ],
    traps: [
      "SALR is LESS than DALR (latent heat offsets cooling) — a classic reversed-answer trap.",
      "ELR describes the environment; DALR/SALR describe a moving parcel.",
      "An inversion is the MOST stable case, not neutral.",
    ],
  },
  {
    sectionId: "A.8.10",
    title: "Clouds",
    intro:
      "Clouds are your visible read-out of stability and moisture. Know the genera by level, which are heap vs layer, and what each brings.",
    blocks: [
      {
        heading: "1. Classification by height",
        points: [
          "LOW (surface–6500 ft): Stratus (St), Stratocumulus (Sc), Nimbostratus (Ns).",
          "MEDIUM (6500–20,000 ft): Altocumulus (Ac), Altostratus (As). Prefix 'alto'.",
          "HIGH (>20,000 ft): Cirrus (Ci), Cirrocumulus (Cc), Cirrostratus (Cs) — ICE crystals.",
          "VERTICAL development: Cumulus (Cu), Cumulonimbus (Cb) — extend through levels.",
        ],
      },
      {
        heading: "2. What they mean",
        points: [
          "Cumuliform (heap) = unstable air, showers, turbulence. Stratiform (layer) = stable air, drizzle, poor vis.",
          "Cloud forms when air is cooled to its dew point (condensation level = cloud base).",
          "Cu base (ft) ≈ 400 × (temp − dew point in °C).",
          "Lenticular (Ac lenticularis) = mountain waves; Cs halo = ice crystals; Ns = continuous rain.",
        ],
      },
    ],
    mustKnow: [
      "Low: St, Sc, Ns. Medium: Ac, As. High: Ci, Cc, Cs (ice).",
      "Cu & Cb are vertical-development clouds.",
      "Cumuliform = unstable/showers; stratiform = stable/drizzle.",
      "Cloud base = condensation level; Cu base ≈ 400 ft × spread.",
      "Cloud amount reported in OKTAS (eighths).",
    ],
    traps: [
      "High cloud is ICE crystals, not water droplets.",
      "Ns gives CONTINUOUS rain; Cb gives SHOWERS.",
      "Lenticular clouds mark turbulence (waves), not smooth calm.",
    ],
  },
  {
    sectionId: "A.8.11",
    title: "Precipitation",
    intro:
      "Precipitation type tells you about the cloud and the temperature structure above you — freezing rain in particular reveals a warm layer over a cold one.",
    blocks: [
      {
        heading: "1. Types & source cloud",
        points: [
          "Showery precip ← cumuliform (Cu/Cb). Continuous precip ← stratiform (Ns).",
          "Freezing rain: rain from a warm layer falls into sub-zero air and freezes on impact → clear ice. Often ahead of a WARM front.",
          "Ice pellets on the ground = evidence of freezing rain aloft (warm layer over cold).",
          "Virga = precipitation that evaporates before reaching the ground.",
        ],
      },
      {
        heading: "2. Formation",
        points: [
          "Cold clouds: Bergeron process — ice crystals grow at the expense of supercooled droplets, then may melt to rain.",
          "Warm clouds: coalescence — droplets collide and merge.",
          "Hail needs strong Cb updraughts recirculating stones through the supercooled region.",
        ],
      },
    ],
    mustKnow: [
      "Showers ← cumuliform; continuous ← stratiform (Ns).",
      "Freezing rain = warm layer over cold; forms clear ice; ahead of warm front.",
      "Ice pellets = freezing rain aloft.",
      "Virga evaporates before landing.",
      "Hail from strong Cb updraughts.",
    ],
    traps: [
      "Freezing rain needs a WARM layer ABOVE cold air — not just cold everywhere.",
      "Most intense rain: Ns (continuous) or Cb (showery), not thin cloud.",
    ],
  },
  {
    sectionId: "A.8.12",
    title: "Thunderstorms",
    intro:
      "A Cb is the most hazardous cloud in aviation. Know the three life stages, the ingredients, and hazards like microbursts. Avoidance is the message.",
    blocks: [
      {
        heading: "1. Life cycle & ingredients",
        points: [
          "Stages: CUMULUS (updraughts only) → MATURE (up & down draughts, rain reaches ground, WORST weather) → DISSIPATING (downdraughts).",
          "Ingredients: instability + moisture + a trigger (heating, front, orographic, convergence).",
          "A mature Cb contains water droplets, ice crystals AND supercooled water droplets.",
        ],
      },
      {
        heading: "2. Hazards",
        points: [
          "Severe turbulence, hail, lightning, icing, and MICROBURSTS (intense cold downdraught, avg 1–5 min, severe low-level windshear).",
          "SIGMET Cb descriptors: isolated, occasional, frequent, embedded, squall line.",
          "Avoid Cb by a wide margin (often 10–20 nm); never penetrate.",
        ],
      },
    ],
    mustKnow: [
      "Stages: cumulus, mature (worst), dissipating.",
      "Need instability + moisture + trigger.",
      "Cb holds water, ice AND supercooled droplets.",
      "Microburst = cold downdraught, 1–5 min, severe windshear.",
      "SIGMET: isolated/occasional/frequent/embedded.",
    ],
    traps: [
      "Up AND down draughts coexist in the MATURE stage.",
      "Microbursts are most deadly on take-off/approach near the ground.",
      "Hail can be thrown into clear air beside a Cb.",
    ],
  },
  {
    sectionId: "A.8.13",
    title: "Icing",
    intro:
      "Airframe ice needs supercooled water and a sub-zero airframe. Clear ice (from large drops) is the dangerous one; know the temperature bands and cloud types.",
    blocks: [
      {
        heading: "1. Types of ice",
        points: [
          "RIME: small supercooled droplets freeze on impact, trapping air → white, opaque, brittle.",
          "CLEAR/GLAZE: large supercooled droplets spread before freezing → transparent, hard, fast-building — MOST dangerous. Most likely -10°C to -17°C.",
          "MIXED: combination of rime and clear.",
          "Hoar frost: vapour deposits directly onto a cold airframe (sublimation).",
        ],
      },
      {
        heading: "2. Where & effects",
        points: [
          "Most severe icing in Cb and freezing rain (big supercooled drops). Worst band near 0°C to about -15°C; below ~-40°C little supercooled water so icing unlikely.",
          "Effects: disrupts airflow → less lift, more drag & weight, higher stall speed; pitot/prop/aerial icing.",
          "Factors: droplet size, temperature, liquid water content; thin/sharp aerofoils catch more.",
        ],
      },
    ],
    mustKnow: [
      "Rime = small drops (opaque); clear = large drops (most dangerous, -10 to -17°C).",
      "Most severe icing: Cb / freezing rain.",
      "Worst band near 0 to -15°C; unlikely below -40°C.",
      "Ice reduces lift, adds drag/weight, raises stall speed.",
      "Needs supercooled water + sub-zero airframe.",
    ],
    traps: [
      "Clear ice (not rime) is the most dangerous.",
      "Very cold air (< -40°C) gives LITTLE icing (ice crystals, not liquid).",
      "Frost must be removed before flight — even thin frost spoils lift.",
    ],
  },
  {
    sectionId: "A.8.14",
    title: "Turbulence",
    intro:
      "Turbulence comes from thermals, terrain, shear and other aircraft. Know the types, where windshear bites, and that CAT hides in clear air near jets.",
    blocks: [
      {
        heading: "1. Types",
        points: [
          "Convective (thermals, strongest afternoon over land); Mechanical (wind over rough terrain/obstacles, worse with stronger wind); Orographic (mountain waves, rotors, lenticular cloud).",
          "CAT (Clear Air Turbulence): near jet streams/tropopause, no cloud, worst on the cold side/below the core.",
          "Wake turbulence: wing-tip vortices; strongest behind HEAVY, SLOW, CLEAN aircraft; sinks and drifts downwind.",
        ],
      },
      {
        heading: "2. Windshear",
        points: [
          "Low-level windshear (most dangerous near the ground): top of a surface-based inversion, gust fronts, microbursts.",
          "Vertical shear units: knots per 1000 ft.",
          "Fly at turbulence-penetration (manoeuvring) speed in turbulence.",
        ],
      },
    ],
    mustKnow: [
      "Types: convective, mechanical, orographic, CAT, wake.",
      "CAT = clear air near jets; worst cold side/below core.",
      "Wake strongest behind heavy/slow/clean; vortices sink & drift.",
      "Worst low-level shear: top of a surface-based inversion.",
      "Fly at manoeuvring speed in turbulence.",
    ],
    traps: [
      "CAT has NO cloud warning — hard to avoid.",
      "Mountain-wave turbulence extends far DOWNWIND, not just over the ridge.",
    ],
  },
  {
    sectionId: "A.8.15",
    title: "Visibility",
    intro:
      "Poor visibility is mostly about fog. Distinguish the fog types by how the air is cooled or moistened — radiation vs advection is the key exam split.",
    blocks: [
      {
        heading: "1. Fog types",
        points: [
          "RADIATION fog: clear, calm night, moist air over LAND; ground cools by radiation. Shallow; cleared by wind/sun/mixing. Not over the sea.",
          "ADVECTION fog: warm moist air flows over a COLDER surface (e.g. sea). Persists in moderate wind.",
          "STEAM fog (Arctic sea smoke): cold air over much warmer water.",
          "FRONTAL fog: rain saturates cold air ahead of a warm front.",
        ],
      },
      {
        heading: "2. Definitions & haze",
        points: [
          "Fog = visibility < 1000 m; Mist (BR) = 1000–5000 m; Haze (HZ) = dry particles; Smoke (FU).",
          "Worst vis near industry: low-level inversion traps smoke with light wind.",
          "Fog most likely when temp/dew-point spread is small and closing.",
        ],
      },
    ],
    mustKnow: [
      "Radiation fog: clear, calm, moist night over land; cleared by wind/sun.",
      "Advection fog: warm moist air over a cold surface; persists in wind.",
      "Fog <1000 m; mist 1000–5000 m.",
      "Steam fog: cold air over warm water.",
      "Inversion + light wind + smoke = worst visibility.",
    ],
    traps: [
      "Radiation fog forms over LAND, not the sea; increasing wind CLEARS it.",
      "Advection fog can persist in wind (unlike radiation fog).",
    ],
  },
  {
    sectionId: "A.8.16",
    title: "Air Masses",
    intro:
      "An air mass takes the temperature and moisture of its source region. Whether it is heated or cooled from below over its track decides its stability and weather.",
    blocks: [
      {
        heading: "1. Classification",
        points: [
          "By temperature: Polar/Arctic (cold) vs Tropical (warm). By moisture: maritime (m, moist) vs continental (c, dry). e.g. Pm, Pc, Tm, Tc, Am.",
          "Polar maritime (Pm): cool, moist, UNSTABLE (heated from below over sea) → showers, good vis, Cu/Cb.",
          "Tropical maritime (Tm): warm, moist, STABLE (cooled from below) → stratus, drizzle, poor vis, advection fog.",
          "Extreme cold: Arctic / Polar continental (over ice/cold land).",
        ],
      },
    ],
    mustKnow: [
      "Temperature (Polar/Tropical) + moisture (maritime/continental).",
      "Pm: cool, moist, unstable → showers, good vis.",
      "Tm: warm, moist, stable → stratus, drizzle, poor vis, fog.",
      "Coldest: Arctic/Polar continental.",
      "Heated from below → unstable; cooled from below → stable.",
    ],
    traps: [
      "Tm gives POOR visibility (stable/stratus); Pm gives GOOD visibility.",
      "Maritime vs continental is about MOISTURE; polar vs tropical is about TEMPERATURE.",
    ],
  },
  {
    sectionId: "A.8.17",
    title: "Fronts",
    intro:
      "A front is the boundary between two air masses. Warm fronts are shallow and slow with continuous rain; cold fronts are steep and sharp with showers. Know the sequences.",
    blocks: [
      {
        heading: "1. Warm front",
        points: [
          "Shallow slope ~1:150. Cloud sequence: Ci → Cs → As → Ns with continuous rain.",
          "Pressure falls on approach; after passage temperature RISES into the warm sector; wind veers (NH).",
          "Freezing rain can occur ahead of it (warm layer over cold).",
        ],
      },
      {
        heading: "2. Cold front & warm sector",
        points: [
          "Steep slope ~1:50. Cb with heavy showers/thunder in a narrow band; wind veers (NH), gusty; temperature DROPS; pressure RISES sharply behind.",
          "Warm sector (between the fronts): stable Tm → stratus, drizzle, poor visibility.",
          "Cold front moves faster and catches the warm front → occlusion.",
        ],
      },
    ],
    mustKnow: [
      "Warm front slope ~1:150; cold front ~1:50.",
      "Warm-front cloud: Ci→Cs→As→Ns, continuous rain.",
      "Cold front: Cb, showers, temp drop, wind veers, pressure rises behind.",
      "Warm sector: stratus/drizzle/poor vis.",
      "Cold front overtakes warm front → occlusion.",
    ],
    traps: [
      "Pressure FALLS ahead of, and RISES behind, a cold front.",
      "Temperature RISES at warm-front passage, DROPS at cold-front passage.",
      "Wind VEERS (NH) at both frontal passages.",
    ],
  },
  {
    sectionId: "A.8.18",
    title: "Depressions & Anticyclones",
    intro:
      "Mid-latitude weather is dominated by depressions (lows) forming on the polar front and anticyclones (highs) bringing settled conditions. Know the circulations, occlusions and the col.",
    blocks: [
      {
        heading: "1. Depressions",
        points: [
          "Form on the polar front where warm tropical and cold polar air meet (~35–55°). NH flow: anticlockwise, inward.",
          "Life cycle: wave → mature (warm & cold fronts) → occlusion → fills (weakens).",
          "Warm occlusion: air behind is WARMER than ahead (rides over). Cold occlusion: air behind is COLDER (undercuts).",
          "Deep low = tight isobars = strong winds, low cloud, rain/snow, poor vis.",
        ],
      },
      {
        heading: "2. Anticyclones & col",
        points: [
          "High: subsiding air, NH flow clockwise, outward. Settled/clear; but winter highs trap fog, frost, haze under the inversion ('anticyclonic gloom').",
          "Col: neutral saddle between two highs and two lows → light variable winds; fog/frost (winter), thunderstorms (summer).",
          "Icelandic Low stronger in winter (bigger temperature contrast).",
        ],
      },
    ],
    mustKnow: [
      "Depressions form on the polar front ~35–55°; NH anticlockwise inward.",
      "Warm occlusion: air behind warmer; cold occlusion: air behind colder.",
      "High = subsidence, clock­wise outward, settled (winter: fog/frost).",
      "Col = light variable winds.",
      "Filling = weakening; deepening = intensifying.",
    ],
    traps: [
      "Anticyclones can give POOR winter visibility (trapped fog/haze), not always clear.",
      "NH: low = anticlockwise, high = clockwise.",
    ],
  },
  {
    sectionId: "A.8.19",
    title: "Climatology",
    intro:
      "The global circulation sets up pressure belts, trade winds, the ITCZ and the monsoons. Know the belts and the seasonal migration of the ITCZ.",
    blocks: [
      {
        heading: "1. Global pattern",
        points: [
          "Pressure belts equator→pole: equatorial LOW (ITCZ), subtropical HIGH (~30°), subpolar LOW (~60°), polar HIGH.",
          "Winds: trade winds (NE in NH, SE in SH) toward the equator; mid-latitude westerlies; polar easterlies.",
          "ITCZ = where NH and SH trade winds meet; heavy convection; migrates north/south following the sun.",
        ],
      },
      {
        heading: "2. Monsoon & regional",
        points: [
          "India: SW monsoon in summer (wet), NE monsoon in winter (dry).",
          "Subtropical highs (~30°) = descending dry air → the great deserts.",
          "Mediterranean: dry summers (high), wet mild winters (westerlies).",
        ],
      },
    ],
    mustKnow: [
      "Belts: equatorial low, subtropical high (30°), subpolar low (60°), polar high.",
      "Trades: NE (NH) & SE (SH); mid-latitudes = westerlies.",
      "ITCZ = trade winds meet; follows the sun.",
      "India: SW monsoon summer (wet), NE winter (dry).",
      "Deserts under the subtropical highs.",
    ],
    traps: [
      "ITCZ is a CONVERGENCE/rising zone (wet), not subsidence.",
      "Trade winds blow TOWARD the equator (NE and SE).",
    ],
  },
  {
    sectionId: "A.8.20",
    title: "Tropical Meteorology & TRS",
    intro:
      "Tropical revolving storms (hurricanes/typhoons/cyclones) need warm ocean, deep moist unstable air, and enough Coriolis. Know the regional names, seasons and structure.",
    blocks: [
      {
        heading: "1. Names & formation",
        points: [
          "Hurricanes (Atlantic/E Pacific), Typhoons (W Pacific), Cyclones (Indian Ocean).",
          "Requirements: sea temp ≥ ~26.5°C, deep moist unstable air, Coriolis (poleward of ~5°), LOW vertical wind shear.",
          "Do NOT form within ~5° of the equator (no Coriolis), nor in the SE Pacific/South Atlantic (cold water).",
        ],
      },
      {
        heading: "2. Structure & season",
        points: [
          "Calm clear EYE surrounded by the EYEWALL — strongest winds and heaviest rain.",
          "Move slowly (~10–15 kt), track west then recurve poleward; weaken over land/cold water.",
          "Season: late summer/autumn of each hemisphere (warmest seas).",
        ],
      },
    ],
    mustKnow: [
      "Hurricane (Atlantic), typhoon (W Pacific), cyclone (Indian Ocean).",
      "Need warm sea ≥26.5°C, moist unstable air, Coriolis, low shear.",
      "None within ~5° of equator.",
      "Strongest winds in the eyewall; calm eye.",
      "Peak in late summer/autumn.",
    ],
    traps: [
      "Strong wind shear PREVENTS TRS (low shear is needed).",
      "The EYE is calm; the EYEWALL is the most violent part.",
    ],
  },
  {
    sectionId: "A.8.21",
    title: "Meteorological Information",
    intro:
      "You must read the coded reports and forecasts: METAR (actual), TAF (forecast), SIGMET/AIRMET (warnings). Learn the key abbreviations and validities.",
    blocks: [
      {
        heading: "1. Reports vs forecasts",
        points: [
          "METAR = actual observation (issued half-hourly/hourly); wind averaged over 10 minutes; pressure = QNH rounded DOWN.",
          "TAF = aerodrome forecast; main TAFs valid up to 24 (or 30) hours. TREND/landing forecast valid 2 hours.",
          "SIGMET = en-route hazards (Cb, severe ice/turb, volcanic ash, TC). AIRMET = less-severe, low-level.",
        ],
      },
      {
        heading: "2. Codes to know",
        points: [
          "VV = vertical visibility (hundreds of ft), used when sky obscured. RVR reported when vis below ~1500 m.",
          "Cloud in OKTAS: FEW 1–2, SCT 3–4, BKN 5–7, OVC 8. Heights above aerodrome level.",
          "BECMG = lasting gradual change; TEMPO = temporary (<1 h each, <half the period); PROB30 = 30% probability; CAVOK = vis ≥10 km, no significant cloud/weather.",
          "Change codes: M = minus (M08 = -8°C); 9999 = 10 km+.",
        ],
      },
      {
        heading: "3. Decoding a METAR — worked example",
        points: [
          "Example: FAOR 121500Z 04015G27KT 010V070 8000 -RA SCT018 BKN025 18/12 Q1021 NOSIG",
          "FAOR — station (OR Tambo). 121500Z — issued on the 12th at 1500 UTC (Zulu).",
          "04015G27KT — wind FROM 040°(True) at 15 kt, gusting 27 kt. 010V070 — direction varying between 010° and 070°.",
          "8000 — visibility 8 000 m. -RA — light rain (− light, no sign moderate, + heavy).",
          "SCT018 BKN025 — scattered (3–4 oktas) at 1 800 ft, broken (5–7 oktas) at 2 500 ft ABOVE AERODROME.",
          "18/12 — temperature 18°C, dew point 12°C (small spread → moist, fog/low-cloud risk). Q1021 — QNH 1021 hPa.",
          "NOSIG — no significant change expected in the next 2 hours. (CAVOK would replace vis/wx/cloud if vis ≥10 km, no cloud below 5 000 ft/MSA and no Cb, and no significant weather.)",
        ],
      },
      {
        heading: "4. Decoding a TAF — worked example",
        points: [
          "Example: TAF FACT 121100Z 1212/1312 24012KT 9999 FEW025 BECMG 1218/1220 30020G32KT TEMPO 1214/1218 4000 SHRA BKN015 PROB30 1300/1304 0800 FG",
          "FACT — Cape Town. 121100Z — issued 12th 1100Z. 1212/1312 — VALID from 12th 1200Z to 13th 1200Z (24 h).",
          "24012KT 9999 FEW025 — base forecast: wind 240°/12 kt, vis 10 km+, few cloud at 2 500 ft.",
          "BECMG 1218/1220 30020G32KT — a lasting change BETWEEN 1800Z and 2000Z: wind becomes 300°/20 kt gust 32.",
          "TEMPO 1214/1218 4000 SHRA BKN015 — temporary fluctuations 1400–1800Z: vis 4 000 m in rain showers, broken cloud 1 500 ft (each <1 h, less than half the period).",
          "PROB30 1300/1304 0800 FG — 30% probability between 0000Z and 0400Z of vis 800 m in fog.",
          "Reading order is always: wind → visibility → weather → cloud, then temperature/QNH (METAR) or change groups (TAF).",
        ],
      },
    ],
    mustKnow: [
      "METAR = actual; TAF = forecast (24/30 h); TREND = 2 h.",
      "METAR wind = 10-min mean; QNH rounded DOWN.",
      "Cloud oktas: FEW 1-2, SCT 3-4, BKN 5-7, OVC 8; heights above aerodrome.",
      "SIGMET = en-route hazards; AIRMET = low-level.",
      "VV = vertical visibility; CAVOK criteria; 9999 = 10 km+.",
    ],
    traps: [
      "METAR pressure is QNH rounded DOWN (not nearest).",
      "METAR winds are TRUE and averaged over 10 minutes.",
      "Cloud heights in METAR/TAF are above AERODROME level, not MSL.",
    ],
  },
];

export function getNoteBySection(sectionId: string): SectionNote | undefined {
  return MET_NOTES.find((n) => n.sectionId === sectionId);
}
