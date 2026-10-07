// ============================================================================
// SACAA CPL — METEOROLOGY FLASHCARDS
// Source: CAE Oxford Aviation Academy ATPL Meteorology + SACAA syllabus
// Mapped to SACAA Appendix 2.0A sections A.8.1 – A.8.21
// ============================================================================

export interface MetFlashcard {
  id: string; // e.g. "FC-A81-01"
  sectionId: string; // e.g. "A.8.1"
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

export const MET_FLASHCARDS: MetFlashcard[] = [
  // A.8.1 THE ATMOSPHERE
  { id: "FC-A81-01", sectionId: "A.8.1", front: "Composition of dry air by volume?", back: "≈78% nitrogen, 21% oxygen, 1% argon + trace CO₂ (~0.04%).", difficulty: "easy" },
  { id: "FC-A81-02", sectionId: "A.8.1", front: "What is the tropopause?", back: "Boundary between troposphere and stratosphere; ~11 km at 50°N, ~16-18 km equator, ~8 km poles.", difficulty: "easy" },
  { id: "FC-A81-03", sectionId: "A.8.1", front: "Where does virtually all weather occur?", back: "In the troposphere — it holds nearly all water vapour.", difficulty: "easy" },
  { id: "FC-A81-04", sectionId: "A.8.1", front: "Average environmental lapse rate?", back: "≈0.65°C/100 m (≈2°C/1000 ft) in the troposphere.", difficulty: "medium" },
  { id: "FC-A81-05", sectionId: "A.8.1", front: "Which gas has the greatest effect on weather?", back: "Water vapour — its phase changes drive cloud and precipitation.", difficulty: "easy" },
  { id: "FC-A81-06", sectionId: "A.8.1", front: "Convection vs advection?", back: "Convection = vertical heat transfer; advection = horizontal transfer by wind.", difficulty: "easy" },
  { id: "FC-A81-07", sectionId: "A.8.1", front: "Fixed gases of dry air (exact %)?", back: "Nitrogen 78.08%, Oxygen 20.95%, Argon 0.93% by volume; rare/trace gases ~0.04%.", difficulty: "medium" },
  { id: "FC-A81-08", sectionId: "A.8.1", front: "Density of water vapour vs dry air?", back: "Water vapour is lighter — about ⅝ (five-eighths) the density of dry air at the same temp/pressure. So moist air is LESS dense.", difficulty: "medium" },
  { id: "FC-A81-09", sectionId: "A.8.1", front: "Typical water vapour content, poles vs tropics?", back: "~0.2% by volume over cold dry polar regions; up to ~4% over warm moist tropics.", difficulty: "medium" },
  { id: "FC-A81-10", sectionId: "A.8.1", front: "The four atmospheric layers (surface up)?", back: "Troposphere, Stratosphere, Mesosphere, Ionosphere(Thermosphere) — divided by temperature behaviour; boundaries are '-pauses'.", difficulty: "easy" },
  { id: "FC-A81-11", sectionId: "A.8.1", front: "Troposphere height: poles, equator, 45°?", back: "~8 km (26,000 ft) poles, ~16 km (52,000 ft) equator, ~11 km (36,090 ft) at 45°.", difficulty: "medium" },
  { id: "FC-A81-12", sectionId: "A.8.1", front: "Troposphere temperature lapse & top temp?", back: "Falls 1.98°C/1000 ft to -56.5°C at the tropopause (~36,090 ft at mid-latitudes).", difficulty: "medium" },
  { id: "FC-A81-13", sectionId: "A.8.1", front: "Stratosphere temperature profile?", back: "Isothermal -56.5°C up to ~20 km, then rises 0.3°C/1000 ft to ~0°C at the stratopause (~50 km) — ozone heating.", difficulty: "hard" },
  { id: "FC-A81-14", sectionId: "A.8.1", front: "Coldest and hottest parts of the atmosphere?", back: "Coldest ~-80°C at the mesopause (~80 km); thermosphere/ionosphere heats towards ~2000°C.", difficulty: "hard" },
  { id: "FC-A81-15", sectionId: "A.8.1", front: "At what altitude does pressure halve?", back: "About 18,000 ft (FL180) — pressure ≈ 500 hPa, half the ~1013 hPa MSL value.", difficulty: "medium" },
  { id: "FC-A81-16", sectionId: "A.8.1", front: "Pressure/height: 1 hPa = how many feet?", back: "~27 ft (rounded 30 ft) low down; ~47 ft at 20,000 ft. It grows as air thins — NOT constant.", difficulty: "hard" },
  { id: "FC-A81-17", sectionId: "A.8.1", front: "How is ozone formed and why does it matter?", back: "UV splits O₂; a freed O atom joins another O₂ → O₃. Shields UV and warms the stratosphere (peak ~0°C near 50 km). ~2 ppm by weight.", difficulty: "medium" },
  { id: "FC-A81-18", sectionId: "A.8.1", front: "What are condensation nuclei and why needed?", back: "Hygroscopic particles (salt, dust, ash, soot) 0.1–1.0 micron. Water vapour cannot condense into cloud droplets without them.", difficulty: "medium" },
  { id: "FC-A81-19", sectionId: "A.8.1", front: "Tropopause offset?", back: "Tropopause is HIGH where surface pressure is high, LOW where pressure is low; breaks near 45°/60° form jet streams & CAT.", difficulty: "hard" },
  // A.8.2 ISA
  { id: "FC-A82-01", sectionId: "A.8.2", front: "ISA MSL values?", back: "1013.25 hPa, +15°C (288 K), density 1.225 kg/m³.", difficulty: "easy" },
  { id: "FC-A82-02", sectionId: "A.8.2", front: "ISA lapse rate & tropopause?", back: "1.98°C/1000 ft (6.5°C/km) up to 11 km (36,090 ft); tropopause temp -56.5°C.", difficulty: "medium" },
  { id: "FC-A82-03", sectionId: "A.8.2", front: "Lowest ISA temperature?", back: "-56.5°C (216.5 K) — constant from 11 km to 20 km.", difficulty: "medium" },
  { id: "FC-A82-04", sectionId: "A.8.2", front: "How to find ISA temp at a flight level?", back: "15 − (2 × FL in thousands). e.g. FL200 → 15 − 40 = -25°C.", difficulty: "medium" },
  { id: "FC-A82-05", sectionId: "A.8.2", front: "What is ISA deviation?", back: "Actual OAT − ISA temperature at that level.", difficulty: "medium" },
  { id: "FC-A82-06", sectionId: "A.8.2", front: "Approx pressure levels vs altitude?", back: "850 hPa≈5000 ft, 700 hPa≈10,000 ft, 500 hPa≈18,000 ft, 300 hPa≈30,000 ft.", difficulty: "hard" },
  // A.8.3 PRESSURE
  { id: "FC-A83-01", sectionId: "A.8.3", front: "QNH vs QFE vs QFF?", back: "QFE = airfield-level pressure; QNH = QFE reduced to MSL (ISA); QFF = reduced to MSL (actual conditions).", difficulty: "medium" },
  { id: "FC-A83-02", sectionId: "A.8.3", front: "What are isobars drawn with?", back: "QFF (pressure reduced to MSL with actual conditions) on surface charts.", difficulty: "medium" },
  { id: "FC-A83-03", sectionId: "A.8.3", front: "Standard Pressure Setting?", back: "1013.25 hPa (QNE) — used for flight levels above transition altitude.", difficulty: "easy" },
  { id: "FC-A83-04", sectionId: "A.8.3", front: "Close isobars mean?", back: "Steep pressure gradient → strong winds.", difficulty: "easy" },
  { id: "FC-A83-05", sectionId: "A.8.3", front: "Trough, ridge, col?", back: "Trough = extension of low; ridge = extension of high; col = neutral saddle between 2 highs & 2 lows (light winds).", difficulty: "medium" },
  { id: "FC-A83-06", sectionId: "A.8.3", front: "Near-surface pressure change with height?", back: "≈1 hPa per 27-30 ft.", difficulty: "medium" },
  // A.8.4 TEMPERATURE
  { id: "FC-A84-01", sectionId: "A.8.4", front: "What is an inversion?", back: "A layer where temperature increases with height (very stable).", difficulty: "easy" },
  { id: "FC-A84-02", sectionId: "A.8.4", front: "Types of inversion?", back: "Radiation (night cooling), subsidence (descending air), advection (warm air over cold surface), frontal.", difficulty: "medium" },
  { id: "FC-A84-03", sectionId: "A.8.4", front: "When is daily temp range greatest?", back: "Clear skies + light wind (max heating & radiative cooling); largest over dry deserts.", difficulty: "medium" },
  { id: "FC-A84-04", sectionId: "A.8.4", front: "Sea breeze vs land breeze?", back: "Sea breeze: sea→land by day; land breeze: land→sea at night.", difficulty: "easy" },
  { id: "FC-A84-05", sectionId: "A.8.4", front: "Katabatic vs anabatic wind?", back: "Katabatic = cold air draining downhill (night); anabatic = warm air up sunlit slope (day).", difficulty: "medium" },
  { id: "FC-A84-06", sectionId: "A.8.4", front: "Effect of strong low-level inversion?", back: "Traps pollution/haze → poor visibility beneath; smooth air.", difficulty: "medium" },
  // A.8.5 HUMIDITY
  { id: "FC-A85-01", sectionId: "A.8.5", front: "Relative humidity depends on?", back: "Both actual moisture content AND temperature (which sets capacity).", difficulty: "medium" },
  { id: "FC-A85-02", sectionId: "A.8.5", front: "Dew point?", back: "Temperature to which air must be cooled (constant pressure) to saturate.", difficulty: "easy" },
  { id: "FC-A85-03", sectionId: "A.8.5", front: "Cooling air (same moisture) → RH?", back: "RH increases (capacity falls toward saturation).", difficulty: "medium" },
  { id: "FC-A85-04", sectionId: "A.8.5", front: "Temp = dew point means?", back: "Saturation (RH 100%) → fog/cloud likely.", difficulty: "easy" },
  { id: "FC-A85-05", sectionId: "A.8.5", front: "Latent heat in cloud formation?", back: "Absorbed on evaporation; released on condensation — adds buoyancy/instability.", difficulty: "medium" },
  { id: "FC-A85-06", sectionId: "A.8.5", front: "Supercooled water?", back: "Liquid water below 0°C — key cause of airframe icing.", difficulty: "medium" },
  // A.8.6 DENSITY
  { id: "FC-A86-01", sectionId: "A.8.6", front: "Density relationship (gas law)?", back: "ρ ∝ pressure, ρ ∝ 1/absolute temperature (P = ρRT).", difficulty: "medium" },
  { id: "FC-A86-02", sectionId: "A.8.6", front: "Density altitude?", back: "Pressure altitude corrected for temperature; high DA = degraded performance.", difficulty: "medium" },
  { id: "FC-A86-03", sectionId: "A.8.6", front: "Highest density altitude conditions?", back: "Hot, high elevation, low pressure (and humid) → least dense air.", difficulty: "medium" },
  { id: "FC-A86-04", sectionId: "A.8.6", front: "Moist vs dry air density?", back: "Moist air is LESS dense (water vapour lighter than N₂/O₂).", difficulty: "medium" },
  { id: "FC-A86-05", sectionId: "A.8.6", front: "Effect of high DA on take-off?", back: "Longer take-off run, reduced climb, higher TAS for same IAS.", difficulty: "medium" },
  // A.8.7 ALTIMETRY
  { id: "FC-A87-01", sectionId: "A.8.7", front: "High to low / warm to cold?", back: "'High to low OR hot to cold, look out below' — true altitude is LOWER than indicated.", difficulty: "medium" },
  { id: "FC-A87-02", sectionId: "A.8.7", front: "Cold air altimeter error?", back: "Altimeter OVER-reads — aircraft lower than shown (danger near terrain).", difficulty: "hard" },
  { id: "FC-A87-03", sectionId: "A.8.7", front: "1 hPa subscale change = ?", back: "≈30 ft on the altimeter near sea level.", difficulty: "medium" },
  { id: "FC-A87-04", sectionId: "A.8.7", front: "Transition altitude vs level?", back: "At/below transition altitude use QNH (altitude); above transition level use 1013 (flight levels).", difficulty: "medium" },
  { id: "FC-A87-05", sectionId: "A.8.7", front: "Why 1013 in the cruise?", back: "Common datum → preserves vertical separation regardless of actual pressure.", difficulty: "medium" },
  // A.8.8 WINDS
  { id: "FC-A88-01", sectionId: "A.8.8", front: "Geostrophic wind?", back: "Balance of pressure-gradient force & Coriolis; blows parallel to straight isobars above friction layer.", difficulty: "medium" },
  { id: "FC-A88-02", sectionId: "A.8.8", front: "Surface wind vs gradient wind?", back: "Friction backs the surface wind (NH) and reduces its speed (~2/3 over sea, ~1/3 over land) and crosses isobars toward low.", difficulty: "hard" },
  { id: "FC-A88-03", sectionId: "A.8.8", front: "Backing vs veering?", back: "Backing = wind changes anticlockwise; veering = clockwise.", difficulty: "easy" },
  { id: "FC-A88-04", sectionId: "A.8.8", front: "Buys Ballot's Law (NH)?", back: "Back to the wind, low pressure is on your LEFT.", difficulty: "medium" },
  { id: "FC-A88-05", sectionId: "A.8.8", front: "Jet stream?", back: "Narrow band of strong winds near the tropopause; polar-front & subtropical jets; ≥60 kt core.", difficulty: "medium" },
  { id: "FC-A88-06", sectionId: "A.8.8", front: "Windshear?", back: "Change of wind speed/direction over a short distance; hazardous on approach (e.g. microburst, inversions).", difficulty: "medium" },
  // A.8.9 THERMODYNAMICS / STABILITY
  { id: "FC-A89-01", sectionId: "A.8.9", front: "DALR vs SALR?", back: "DALR = 3°C/100 m (dry/unsaturated); SALR ≈1.5°C/100 m (saturated, less due to latent heat).", difficulty: "medium" },
  { id: "FC-A89-02", sectionId: "A.8.9", front: "Stability rule?", back: "ELR < SALR → absolutely stable; ELR > DALR → absolutely unstable; between → conditionally unstable.", difficulty: "hard" },
  { id: "FC-A89-03", sectionId: "A.8.9", front: "ELR 0.65°C/100 m stability?", back: "Between SALR & DALR → conditionally unstable.", difficulty: "medium" },
  { id: "FC-A89-04", sectionId: "A.8.9", front: "Stable air characteristics?", back: "Layer cloud (St/Sc), poor visibility, steady precip, smooth air.", difficulty: "medium" },
  { id: "FC-A89-05", sectionId: "A.8.9", front: "Unstable air characteristics?", back: "Heap cloud (Cu/Cb), good visibility, showers, turbulence, gusty wind.", difficulty: "medium" },
  // A.8.10 CLOUDS
  { id: "FC-A810-01", sectionId: "A.8.10", front: "Low cloud genera?", back: "Stratus (St), Stratocumulus (Sc), Nimbostratus (Ns) — base below ~6500 ft.", difficulty: "medium" },
  { id: "FC-A810-02", sectionId: "A.8.10", front: "Medium cloud genera?", back: "Altocumulus (Ac), Altostratus (As) — ~6500-20,000 ft.", difficulty: "medium" },
  { id: "FC-A810-03", sectionId: "A.8.10", front: "High cloud genera?", back: "Cirrus (Ci), Cirrocumulus (Cc), Cirrostratus (Cs) — ice crystals, above ~20,000 ft.", difficulty: "medium" },
  { id: "FC-A810-04", sectionId: "A.8.10", front: "Clouds of vertical development?", back: "Cumulus (Cu) and Cumulonimbus (Cb) — extend through multiple levels.", difficulty: "easy" },
  { id: "FC-A810-05", sectionId: "A.8.10", front: "Orographic cloud?", back: "Forms when stable moist air is forced up terrain; lenticular (Ac lenticularis) in standing waves.", difficulty: "medium" },
  // A.8.11 PRECIPITATION
  { id: "FC-A811-01", sectionId: "A.8.11", front: "Freezing rain forms how?", back: "Rain falls from warm layer into sub-zero air below and freezes on impact; often ahead of a warm front.", difficulty: "medium" },
  { id: "FC-A811-02", sectionId: "A.8.11", front: "Ice pellets on the ground indicate?", back: "Freezing rain aloft — a warm layer over a cold layer (warm front).", difficulty: "medium" },
  { id: "FC-A811-03", sectionId: "A.8.11", front: "Which cloud gives showers?", back: "Cumuliform (Cu, Cb) → showery precip; stratiform (Ns) → continuous.", difficulty: "easy" },
  { id: "FC-A811-04", sectionId: "A.8.11", front: "What is virga?", back: "Precipitation that evaporates before reaching the ground.", difficulty: "easy" },
  { id: "FC-A811-05", sectionId: "A.8.11", front: "Most intense rain from which cloud?", back: "Nimbostratus (Ns) for continuous; Cb for heaviest showers/thunder.", difficulty: "medium" },
  // A.8.12 THUNDERSTORMS
  { id: "FC-A812-01", sectionId: "A.8.12", front: "Three stages of a thunderstorm?", back: "Cumulus (updraughts), Mature (up & downdraughts, rain, worst), Dissipating (downdraughts).", difficulty: "medium" },
  { id: "FC-A812-02", sectionId: "A.8.12", front: "Conditions for thunderstorms?", back: "Instability, high moisture, and a trigger (lifting) e.g. heating, front, orographic.", difficulty: "medium" },
  { id: "FC-A812-03", sectionId: "A.8.12", front: "Microburst?", back: "Intense localised downdraught (colder than surroundings); avg 1-5 min; severe windshear hazard.", difficulty: "hard" },
  { id: "FC-A812-04", sectionId: "A.8.12", front: "CB cloud contents?", back: "Water droplets, ice crystals AND supercooled water droplets.", difficulty: "medium" },
  { id: "FC-A812-05", sectionId: "A.8.12", front: "SIGMET CB descriptors?", back: "Isolated, occasional, frequent, embedded, squall line.", difficulty: "medium" },
  // A.8.13 ICING
  { id: "FC-A813-01", sectionId: "A.8.13", front: "Types of airframe ice?", back: "Rime (small droplets, opaque), Clear/glaze (large droplets, most dangerous), Mixed.", difficulty: "medium" },
  { id: "FC-A813-02", sectionId: "A.8.13", front: "Clear ice temp range?", back: "Most likely ~-10°C to -17°C (large supercooled droplets).", difficulty: "hard" },
  { id: "FC-A813-03", sectionId: "A.8.13", front: "Most severe in-flight icing?", back: "In Cb / freezing rain (large supercooled droplets → clear ice).", difficulty: "medium" },
  { id: "FC-A813-04", sectionId: "A.8.13", front: "Rime ice cause?", back: "Small supercooled droplets freezing on impact, trapping air (opaque, brittle).", difficulty: "medium" },
  { id: "FC-A813-05", sectionId: "A.8.13", front: "Icing factors?", back: "Supercooled water present, temperature range, droplet size, and airframe shape/speed.", difficulty: "medium" },
  // A.8.14 TURBULENCE
  { id: "FC-A814-01", sectionId: "A.8.14", front: "Types of turbulence?", back: "Convective (thermals/Cb), mechanical (friction/obstacles), orographic (mountain waves), CAT, wake.", difficulty: "medium" },
  { id: "FC-A814-02", sectionId: "A.8.14", front: "CAT (clear air turbulence)?", back: "Occurs near jet streams/tropopause with no cloud; strong wind shear zones.", difficulty: "medium" },
  { id: "FC-A814-03", sectionId: "A.8.14", front: "Mountain waves indicator?", back: "Lenticular (Ac lenticularis) and rotor clouds; standing waves downwind of ridges.", difficulty: "medium" },
  { id: "FC-A814-04", sectionId: "A.8.14", front: "Where is low-level windshear greatest?", back: "At the top of a surface-based inversion (e.g. after clear night radiation).", difficulty: "hard" },
  // A.8.15 VISIBILITY
  { id: "FC-A815-01", sectionId: "A.8.15", front: "Radiation fog formation?", back: "Clear night, light wind, moist air; ground cools by radiation → air cooled to dew point. Cleared by wind/heating/mixing.", difficulty: "medium" },
  { id: "FC-A815-02", sectionId: "A.8.15", front: "Advection fog?", back: "Warm moist air flows over a colder surface (e.g. sea) → cooled to dew point; can persist in wind.", difficulty: "medium" },
  { id: "FC-A815-03", sectionId: "A.8.15", front: "Steam fog (Arctic sea smoke)?", back: "Cold air over much warmer water; rapid evaporation & condensation.", difficulty: "medium" },
  { id: "FC-A815-04", sectionId: "A.8.15", front: "Mist vs fog?", back: "Fog = visibility < 1000 m; mist = 1000-5000 m (RH high).", difficulty: "easy" },
  { id: "FC-A815-05", sectionId: "A.8.15", front: "Worst visibility with smoke?", back: "Under a low-level inversion (traps pollutants), light winds.", difficulty: "medium" },
  // A.8.16 AIR MASSES
  { id: "FC-A816-01", sectionId: "A.8.16", front: "Air mass classification?", back: "By source: Polar/Arctic vs Tropical; and Maritime (m) vs Continental (c). e.g. Pm, Pc, Tm, Tc.", difficulty: "medium" },
  { id: "FC-A816-02", sectionId: "A.8.16", front: "Polar maritime (Pm) character?", back: "Cool, moist, unstable (heated from below over sea) → showers, good vis, Cu/Cb.", difficulty: "medium" },
  { id: "FC-A816-03", sectionId: "A.8.16", front: "Tropical maritime (Tm) character?", back: "Warm, moist, stable (cooled from below) → stratus, drizzle, poor vis, advection fog.", difficulty: "medium" },
  { id: "FC-A816-04", sectionId: "A.8.16", front: "Extreme cold air mass?", back: "Arctic / Polar continental (Pc) — sourced over ice/cold land.", difficulty: "medium" },
  // A.8.17 FRONTS
  { id: "FC-A817-01", sectionId: "A.8.17", front: "Warm front gradient & weather?", back: "Shallow slope ~1:150; sequence Ci→Cs→As→Ns, continuous rain, then warm sector.", difficulty: "medium" },
  { id: "FC-A817-02", sectionId: "A.8.17", front: "Cold front weather?", back: "Steep slope ~1:50; Cb, heavy showers/thunder, temperature drop, veering wind, pressure rise behind.", difficulty: "medium" },
  { id: "FC-A817-03", sectionId: "A.8.17", front: "Warm front pressure/temperature?", back: "Pressure falls on approach; temperature rises after passage into warm sector.", difficulty: "medium" },
  { id: "FC-A817-04", sectionId: "A.8.17", front: "Cold front passage wind?", back: "Wind veers (NH), often gusty; pressure rises sharply behind.", difficulty: "medium" },
  // A.8.18 DEPRESSIONS & ANTICYCLONES
  { id: "FC-A818-01", sectionId: "A.8.18", front: "Polar front depression location?", back: "Mid-latitudes, ~35-55°N/S where polar & tropical air meet.", difficulty: "medium" },
  { id: "FC-A818-02", sectionId: "A.8.18", front: "Warm vs cold occlusion?", back: "Warm occlusion: air behind is warmer than ahead (cold front rides over). Cold occlusion: air behind is colder (undercuts).", difficulty: "hard" },
  { id: "FC-A818-03", sectionId: "A.8.18", front: "Anticyclone weather?", back: "Subsiding air → stable, clear/settled; but can trap fog/haze & inversions in winter.", difficulty: "medium" },
  { id: "FC-A818-04", sectionId: "A.8.18", front: "Col weather?", back: "Light variable winds; fog/frost in winter, thunderstorms in summer.", difficulty: "medium" },
  // A.8.19 CLIMATOLOGY
  { id: "FC-A819-01", sectionId: "A.8.19", front: "Global pressure belts?", back: "Equatorial low (ITCZ), subtropical highs ~30°, subpolar lows ~60°, polar highs.", difficulty: "medium" },
  { id: "FC-A819-02", sectionId: "A.8.19", front: "ITCZ?", back: "Inter-Tropical Convergence Zone — where NH & SH trade winds meet; migrates with the sun; heavy convection.", difficulty: "medium" },
  { id: "FC-A819-03", sectionId: "A.8.19", front: "Trade winds direction?", back: "NE trades (NH) and SE trades (SH) blowing toward the equator.", difficulty: "medium" },
  { id: "FC-A819-04", sectionId: "A.8.19", front: "Monsoon (India)?", back: "SW monsoon in summer (wet), NE monsoon in winter (dry).", difficulty: "medium" },
  // A.8.20 TROPICAL / TRS
  { id: "FC-A820-01", sectionId: "A.8.20", front: "TRS regional names?", back: "Hurricanes (Atlantic/E Pacific), Typhoons (W Pacific), Cyclones (Indian Ocean).", difficulty: "medium" },
  { id: "FC-A820-02", sectionId: "A.8.20", front: "Where do TRS NOT form & why?", back: "Within ~5° of equator (no Coriolis) and cold-water regions (SE Pacific, S Atlantic).", difficulty: "hard" },
  { id: "FC-A820-03", sectionId: "A.8.20", front: "TRS formation requirements?", back: "Sea surface >26.5°C, deep moist unstable air, sufficient Coriolis (>5° lat), low shear.", difficulty: "hard" },
  { id: "FC-A820-04", sectionId: "A.8.20", front: "Strongest winds in a TRS?", back: "In the wall of cloud surrounding the calm eye.", difficulty: "medium" },
  // A.8.21 MET INFORMATION
  { id: "FC-A821-01", sectionId: "A.8.21", front: "METAR wind averaging period?", back: "10 minutes immediately before the observation.", difficulty: "medium" },
  { id: "FC-A821-02", sectionId: "A.8.21", front: "TAF validity (main aerodromes)?", back: "Typically up to 24 (or 30) hours.", difficulty: "medium" },
  { id: "FC-A821-03", sectionId: "A.8.21", front: "What is VV in a METAR?", back: "Vertical visibility (in hundreds of ft) when the sky is obscured, e.g. VV002 = 200 ft.", difficulty: "medium" },
  { id: "FC-A821-04", sectionId: "A.8.21", front: "When is RVR reported?", back: "When met visibility is below 1500 m (or 2000 m depending on state).", difficulty: "medium" },
  { id: "FC-A821-05", sectionId: "A.8.21", front: "SIGMET purpose?", back: "Warns of en-route weather hazardous to aircraft (Cb, TS, severe ice/turb, volcanic ash, TC).", difficulty: "medium" },
  { id: "FC-A821-06", sectionId: "A.8.21", front: "METAR pressure group?", back: "QNH rounded DOWN to the nearest whole hectopascal, e.g. Q1013.", difficulty: "medium" },
  // __FLASHCARDS_INSERT_POINT__
];

/** All flashcards for one SACAA section. */
export function getFlashcardsBySection(sectionId: string): MetFlashcard[] {
  return MET_FLASHCARDS.filter((c) => c.sectionId === sectionId);
}

/** A shuffled deck, optionally filtered to one section. */
export function getFlashcardDeck(sectionId?: string): MetFlashcard[] {
  const pool = sectionId ? getFlashcardsBySection(sectionId) : [...MET_FLASHCARDS];
  return pool.sort(() => Math.random() - 0.5);
}

export const MET_FLASHCARD_COUNT = MET_FLASHCARDS.length;
