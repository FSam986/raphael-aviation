import { Infographic } from "@/app/components/figures/Infographic";

// Original infographics (our own content, exam-accurate) for the Meteorology
// sections without an uploaded image. Same visual language as the uploads.

// --- small inline diagrams ---
function LowHigh() {
  return (
    <svg viewBox="0 0 300 110" className="w-full">
      {[16, 27, 38].map((r) => <circle key={r} cx={72} cy={55} r={r} fill="none" stroke="#94a3b8" />)}
      <text x={72} y={60} fill="#b91c1c" fontSize="20" fontWeight="800" textAnchor="middle">L</text>
      <text x={72} y={100} fill="#64748b" fontSize="10" textAnchor="middle">in + clockwise (SH)</text>
      {[16, 27, 38].map((r) => <circle key={r} cx={228} cy={55} r={r} fill="none" stroke="#94a3b8" />)}
      <text x={228} y={60} fill="#1d4ed8" fontSize="20" fontWeight="800" textAnchor="middle">H</text>
      <text x={228} y={100} fill="#64748b" fontSize="10" textAnchor="middle">out + anticlockwise</text>
    </svg>
  );
}
function Cyclone() {
  return (
    <svg viewBox="0 0 300 120" className="w-full">
      {[52, 40, 28].map((r, i) => <circle key={r} cx={150} cy={60} r={r} fill="none" stroke={["#1d4ed8", "#3b82f6", "#93c5fd"][i]} strokeWidth="6" strokeDasharray="10 6" />)}
      <circle cx={150} cy={60} r={12} fill="#e0f2fe" stroke="#0369a1" />
      <text x={150} y={64} fontSize="9" textAnchor="middle" fill="#0369a1" fontWeight="700">eye</text>
      <text x={150} y={28} fontSize="9" textAnchor="middle" fill="#1e3a8a">eyewall (worst)</text>
      <text x={252} y={64} fontSize="9" fill="#64748b">rain bands</text>
    </svg>
  );
}
function Belts() {
  const rows = [
    ["Polar HIGH", "#93c5fd"],
    ["Subpolar LOW ~60°", "#bfdbfe"],
    ["Subtropical HIGH ~30°", "#fde68a"],
    ["Equatorial LOW (ITCZ) 0°", "#86efac"],
    ["Subtropical HIGH ~30°", "#fde68a"],
    ["Subpolar LOW ~60°", "#bfdbfe"],
    ["Polar HIGH", "#93c5fd"],
  ];
  return (
    <svg viewBox="0 0 300 150" className="w-full">
      {rows.map((r, i) => (
        <g key={i}>
          <rect x={40} y={8 + i * 20} width={220} height={18} fill={r[1] as string} />
          <text x={150} y={20 + i * 20} fontSize="9.5" textAnchor="middle" fill="#1e293b">{r[0]}</text>
        </g>
      ))}
    </svg>
  );
}

export function ClimatologyMet() {
  return (
    <Infographic
      title="Climatology & Meteorology"
      tagline="Definitions, scope and the elements of weather"
      panels={[
        { heading: "DEFINITIONS", tone: "blue", points: ["Meteorology = the study of the atmosphere and its day-to-day weather (short-term).", "Climatology = the study of the average weather of a place over a long period (30+ years)."] },
        { heading: "ELEMENTS OF WEATHER", tone: "teal", points: ["Temperature, pressure, wind, humidity.", "Cloud, precipitation, visibility.", "Measured at the surface and in the upper air."] },
        { heading: "SCALES OF STUDY", tone: "purple", points: ["Synoptic — large systems (highs, lows, fronts).", "Meso — local (sea breezes, thunderstorms).", "Micro — very local (turbulence, frost pockets)."] },
        { heading: "WHY IT MATTERS TO PILOTS", tone: "green", points: ["Weather drives performance, safety and route/altitude choice.", "Reports (METAR) and forecasts (TAF) are built from these elements."] },
      ]}
      keyPoints={["Meteorology = weather now; Climatology = long-term average (30 yr).", "Weather elements are measured at surface and upper air."]}
      summary="Meteorology tells you today's weather; climatology tells you what to expect on average."
    />
  );
}

export function AtmosphericPressure() {
  return (
    <Infographic
      title="Atmospheric Pressure"
      tagline="Units, altimeter settings, gradient and pressure systems"
      panels={[
        { heading: "WHAT IT IS & UNITS", tone: "blue", points: ["The weight of the air column above a point.", "Units: hPa / mb (1 hPa = 1 mb), inHg, mmHg.", "ISA at MSL = 1013.25 hPa = 29.92 inHg."] },
        { heading: "PRESSURE SETTINGS (Q-CODES)", tone: "teal", points: ["QFE — airfield level (reads 0 ft on the ground / height above field).", "QNH — reduced to MSL by ISA (reads elevation on the ground).", "QFF — reduced to MSL by ACTUAL conditions (used for isobars).", "QNE 1013.25 hPa — flight levels."] },
        { heading: "CHANGE WITH HEIGHT", tone: "purple", points: ["Falls ~1 hPa per 27–30 ft low down.", "~1 hPa per 47 ft by 20,000 ft (air thins).", "Half of MSL value by ~18,000 ft. NOT linear."] },
        { heading: "ISOBARS & SYSTEMS", tone: "green", points: ["Isobars join points of equal QFF; close isobars = strong wind.", "LOW / depression, HIGH / anticyclone.", "Trough = extension of a low; ridge = extension of a high; col = saddle (light wind)."] },
        { heading: "BUYS-BALLOT (SOUTHERN HEMISPHERE)", tone: "red", wide: true, svg: <LowHigh />, points: ["Back to the wind → LOW pressure on your RIGHT (SH).", "Air spirals IN and clockwise around a low; OUT and anticlockwise around a high."] },
      ]}
      keyPoints={["MSL ISA = 1013.25 hPa.", "QNH→altitude, QFE→height, QFF→isobars, QNE→FL.", "Close isobars → strong wind.", "Buys-Ballot (SH): low on your right."]}
      summary="Get the pressure setting right — it defines your altitude reference and terrain safety."
    />
  );
}

export function Wind() {
  return (
    <Infographic
      title="Wind"
      tagline="Pressure gradient, Coriolis, friction and local winds"
      panels={[
        { heading: "WHAT DRIVES WIND", tone: "blue", points: ["Pressure Gradient Force (PGF) pushes air from HIGH to LOW.", "Steeper gradient (close isobars) = stronger wind."] },
        { heading: "CORIOLIS & GEOSTROPHIC", tone: "teal", points: ["Coriolis deflects moving air (LEFT in the Southern Hemisphere).", "Zero at the equator, maximum at the poles; grows with speed.", "Geostrophic wind = PGF balanced by Coriolis → parallel to straight isobars (above ~2000 ft)."] },
        { heading: "GRADIENT & SURFACE WIND", tone: "purple", points: ["Gradient wind = balance around curved isobars.", "Friction below ~2000 ft slows the wind and turns it toward low pressure.", "Surface wind backs ~10–30° and drops to ~⅔ (sea) or ~⅓ (land) of the gradient wind."] },
        { heading: "BACKING & VEERING", tone: "green", points: ["Backing = wind changes anticlockwise (e.g. N→W).", "Veering = wind changes clockwise (e.g. N→E).", "Diurnal (NH terms): surface wind veers & strengthens by day, backs & eases at night."] },
        { heading: "LOCAL WINDS", tone: "amber", points: ["Sea breeze (day, sea→land) / land breeze (night, land→sea).", "Anabatic (up-slope, day) / katabatic (down-slope, night).", "Berg wind / Föhn — warm, dry, gusty down-slope wind."] },
        { heading: "JET STREAMS & CAT", tone: "red", points: ["Fast narrow ribbons near the tropopause breaks (~30,000–40,000 ft).", "Polar-front and subtropical jets.", "Clear-air turbulence (CAT) on their flanks."] },
      ]}
      keyPoints={["PGF high→low; Coriolis deflects LEFT (SH).", "Geostrophic wind ∥ isobars above the friction layer.", "Friction backs & slows the surface wind.", "Jets sit near the tropopause; CAT on their edges."]}
      summary="Wind is the pressure gradient, bent by Coriolis and dragged round by surface friction."
    />
  );
}

export function IceAccretion() {
  return (
    <Infographic
      title="Ice Accretion — Airframe & Engine Icing"
      tagline="Supercooled water, ice types, and their effects"
      panels={[
        { heading: "HOW IT FORMS", tone: "blue", points: ["Supercooled water droplets (still liquid below 0°C) freeze on impact.", "Needs visible moisture + surface temperature near/below 0°C.", "Worst between 0°C and −20°C (especially 0 to −10°C)."] },
        { heading: "CLEAR (GLAZE) ICE", tone: "teal", points: ["Large supercooled drops, 0 to −10°C.", "Flows back before freezing → hard, clear, heavy, hard to shed.", "The most dangerous type."] },
        { heading: "RIME ICE", tone: "purple", points: ["Small drops, colder temperatures (−10 to −20°C).", "Freezes instantly → white, opaque, brittle, rough.", "Builds on the leading edge."] },
        { heading: "MIXED ICE & HOAR FROST", tone: "green", points: ["Mixed = a combination of clear and rime.", "Hoar frost = vapour sublimating straight to ice on a cold airframe.", "Frost roughens the surface and spoils lift — remove before flight."] },
        { heading: "ENGINE / INDUCTION ICING", tone: "amber", points: ["Carburettor icing: fuel vaporisation + venturi pressure drop cools the air.", "Can occur +10 to +25°C in humid air — use CARB HEAT.", "Also impact and fuel-evaporation icing."] },
        { heading: "EFFECTS & ACTION", tone: "red", points: ["Disrupts lift, adds weight & drag, unbalances the prop.", "Blocks pitot/static and control surfaces.", "Avoid; use anti/de-ice and carb heat; leave icing conditions."] },
      ]}
      keyPoints={["Supercooled water is the cause; worst 0 to −10°C.", "Clear ice = most dangerous; rime = white & brittle.", "Carb icing even in warm, humid air.", "Hoar frost forms by sublimation."]}
      summary="Ice steals lift and adds weight — avoid it, and apply heat/de-ice promptly."
    />
  );
}

export function AirMasses() {
  return (
    <Infographic
      title="Air Masses"
      tagline="Source regions, classification and modification"
      panels={[
        { heading: "WHAT IS AN AIR MASS", tone: "blue", points: ["A large body of air with fairly uniform temperature and humidity.", "Takes the character of its source region.", "Named: Maritime (m, moist) / Continental (c, dry) × Polar (P, cold) / Tropical (T, warm)."] },
        { heading: "TYPES", tone: "teal", points: ["Pm — Polar maritime: cool, moist, unstable → showers, good visibility.", "Pc — Polar continental: cold, dry, stable in winter.", "Tm — Tropical maritime: warm, moist → stratus, sea fog, drizzle.", "Tc — Tropical continental: hot, dry, hazy."] },
        { heading: "SOURCE REGIONS", tone: "purple", points: ["Form over large, uniform surfaces (oceans, deserts, ice caps).", "Air stagnates and takes on the surface's temperature & moisture."] },
        { heading: "MODIFICATION (from below)", tone: "green", points: ["Warm mass over a cold surface → cooled from below → STABLE (fog, stratus).", "Cold mass over a warm surface → heated from below → UNSTABLE (Cu, showers)."] },
        { heading: "FRONTS", tone: "amber", wide: true, points: ["Boundaries between air masses are fronts (warm / cold / occluded).", "Most active weather forms along these boundaries."] },
      ]}
      keyPoints={["m = moist/maritime, c = dry/continental; P = cold, T = warm.", "Warm-over-cold = stable (fog); cold-over-warm = unstable (showers).", "Air masses are modified from below as they travel."]}
      summary="An air mass carries its birthplace's character — and its weather changes as it moves."
    />
  );
}

export function TropicalCyclones() {
  return (
    <Infographic
      title="Tropical Cyclones (Hurricanes / Typhoons)"
      tagline="Structure, formation, hazards and season"
      panels={[
        { heading: "STRUCTURE", tone: "blue", svg: <Cyclone />, points: ["Eye — calm, clear, very low-pressure centre.", "Eyewall — the most violent wind and rain.", "Spiral rain bands; diameter of hundreds of km."] },
        { heading: "FORMATION CONDITIONS", tone: "teal", points: ["Sea-surface temperature ≥ ~26.5°C over deep warm water.", "Latitude ~5–20° — needs Coriolis, so NOT at the equator.", "Pre-existing disturbance, low wind shear, high humidity."] },
        { heading: "HAZARDS", tone: "red", points: ["Extreme wind (>64 kt = hurricane force), storm surge.", "Torrential rain and flooding.", "Severe turbulence and embedded Cb/thunderstorms."] },
        { heading: "MOVEMENT & SEASON", tone: "purple", points: ["Track generally westward then curve poleward.", "Rotate CLOCKWISE in the Southern Hemisphere.", "SH season roughly November–April."] },
        { heading: "NAMING BY REGION", tone: "green", points: ["Hurricane — Atlantic / East Pacific.", "Typhoon — NW Pacific.", "Cyclone — Indian Ocean / SW Pacific."] },
      ]}
      keyPoints={["Sea ≥ 26.5°C, latitude 5–20° (not the equator), low shear.", "Eye calm; eyewall the most violent.", "SH: clockwise; season Nov–Apr."]}
      summary="Warm ocean + Coriolis + low shear spins up Earth's most powerful storm — avoid entirely."
    />
  );
}

export function WorldClimatology() {
  return (
    <Infographic
      title="Global Circulation & World Weather"
      tagline="Pressure belts, trade winds, ITCZ and monsoons"
      panels={[
        { heading: "PRESSURE BELTS", tone: "blue", svg: <Belts />, points: ["Equatorial LOW (ITCZ), Subtropical HIGH (~30°), Subpolar LOW (~60°), Polar HIGH.", "Driven by uneven solar heating → three cells (Hadley, Ferrel, Polar)."] },
        { heading: "TRADE WINDS", tone: "teal", points: ["Blow from the subtropical highs toward the equatorial low.", "SE trades in the Southern Hemisphere (Coriolis).", "Hadley cell: rising at the equator, sinking near 30°."] },
        { heading: "ITCZ", tone: "green", points: ["Inter-Tropical Convergence Zone — where the trades meet.", "Belt of convection, Cb and heavy rain.", "Migrates seasonally toward the summer hemisphere."] },
        { heading: "MONSOONS", tone: "purple", points: ["Seasonal reversal of wind from differential land/sea heating.", "Wet summer monsoon (onshore) / dry winter monsoon (offshore)."] },
        { heading: "DOLDRUMS & HORSE LATITUDES", tone: "amber", wide: true, points: ["Doldrums — calm, low-pressure equatorial belt (the ITCZ).", "Horse latitudes — calm subtropical high-pressure belt (~30°)."] },
      ]}
      keyPoints={["Belts: eq LOW, 30° HIGH, 60° LOW, polar HIGH.", "Trades blow toward the equator; ITCZ migrates to the summer hemisphere.", "Monsoon = seasonal wind reversal."]}
      summary="Uneven solar heating sets up the pressure belts, trade winds and ITCZ that govern world weather."
    />
  );
}

export function SouthAfricanWeather() {
  return (
    <Infographic
      title="South African Weather"
      tagline="Seasonal set-up and the key local phenomena"
      panels={[
        { heading: "SEASONAL SET-UP", tone: "blue", points: ["Summer — ITCZ & tropical lows bring rain and thunderstorms to the interior.", "Winter — cold fronts sweep the SW Cape (winter rainfall).", "Sub-tropical highs (Atlantic & Indian Ocean) dominate the sub-continent."] },
        { heading: "BERG WIND", tone: "amber", points: ["Hot, dry, gusty offshore wind descending from the interior plateau.", "Warms adiabatically on the way down; often ahead of a coastal low/front.", "High fire danger."] },
        { heading: "COASTAL LOW & CAPE DOCTOR", tone: "teal", points: ["Coastal low tracks along the coast ahead of a front.", "Cape Doctor = strong SE wind at Cape Town in summer.", "Forms the 'tablecloth' cloud on Table Mountain."] },
        { heading: "CUT-OFF LOW", tone: "red", points: ["Upper cold low that detaches from the westerlies.", "Slow-moving; heavy rain, flooding and severe weather.", "A major South African hazard."] },
        { heading: "GUTI & BLACK SOUTH-EASTER", tone: "purple", points: ["Guti — drizzle / low stratus in moist SE flow (E coast & escarpment).", "Black south-easter — a SE wind bringing cloud and rain."] },
        { heading: "FRONTS & THE SW BUSTER", tone: "green", points: ["Cold fronts with a sharp wind shift behind them.", "A Berg wind ahead is replaced by a cool, moist change as the front passes."] },
      ]}
      keyPoints={["Summer rain interior (ITCZ/lows); winter rain SW Cape (fronts).", "Berg wind = hot, dry, fire risk.", "Cut-off low = heavy rain & flooding.", "Cape Doctor = summer SE at Cape Town."]}
      summary="SA weather swings from summer tropical rain inland to winter frontal rain in the SW Cape — with Berg winds and cut-off lows as key hazards."
    />
  );
}

export function MeteorologicalInformation() {
  return (
    <Infographic
      title="Meteorological Information — METAR / TAF / Charts"
      tagline="Reading the codes and the charts"
      panels={[
        { heading: "REPORTS vs FORECASTS", tone: "blue", points: ["METAR = actual observation (½-hourly / hourly).", "TAF = aerodrome forecast (valid up to 24 / 30 h).", "TREND = 2 h; SPECI = special report on a significant change."] },
        { heading: "METAR DECODE (order)", tone: "teal", points: ["Station · time (Z) · wind (°T/kt, gusts) · visibility (m) · weather · cloud · temp/dew · QNH.", "e.g. 04015G27KT 8000 -RA SCT018 BKN025 18/12 Q1021.", "QNH is rounded DOWN to the whole hPa."] },
        { heading: "CLOUD & CAVOK", tone: "green", points: ["Oktas: FEW 1–2, SCT 3–4, BKN 5–7, OVC 8. Heights are above aerodrome.", "CAVOK = vis ≥10 km, no cloud below 5000 ft/MSA, no Cb, no significant weather."] },
        { heading: "TAF CHANGE GROUPS", tone: "purple", points: ["BECMG — lasting (gradual) change.", "TEMPO — temporary (<1 h each, < half the period).", "PROB30/40 — probability; FM — from a time."] },
        { heading: "SIGMET / AIRMET", tone: "red", points: ["SIGMET — en-route hazards (Cb, severe ice/turb, volcanic ash, tropical cyclone).", "AIRMET — less-severe, low-level phenomena."] },
        { heading: "CHARTS", tone: "amber", points: ["Synoptic — surface pressure & fronts.", "SIGWX prognostic — turbulence, icing, jets, fronts, hazard areas.", "Upper wind / temperature charts."] },
      ]}
      keyPoints={["METAR = actual, TAF = forecast (24/30 h), TREND = 2 h.", "QNH rounded DOWN.", "Oktas FEW/SCT/BKN/OVC; know CAVOK criteria.", "SIGMET = en-route hazards."]}
      summary="Read the code fluently — wind → vis → weather → cloud → temp/QNH — and cross-check the SIGWX & synoptic charts."
    />
  );
}
