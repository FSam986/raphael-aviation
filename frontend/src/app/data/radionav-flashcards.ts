// CPL Radio Navigation & Communications (A.10.x) flashcards. Original recall
// cards; scope from the AVEX radio-aids chapters, wording in-house. Section ids
// match sacaa-syllabus.ts.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

export const RADIONAV_FLASHCARDS: AirLawFlashcard[] = [
  // A.10.1 Basic radio
  { id: "RNFC-101-1", sectionId: "A.10.1", front: "Wavelength ↔ frequency?", back: "λ(m) = 300 / f(MHz). Radio waves travel at 3×10⁸ m/s.", difficulty: "easy" },
  { id: "RNFC-101-2", sectionId: "A.10.1", front: "Which band bends most around the earth, and which has worst static?", back: "Bending (diffraction) greatest at VLF (lowest freq); static worst at VLF/LF and falls as frequency rises.", difficulty: "medium" },
  { id: "RNFC-101-3", sectionId: "A.10.1", front: "Skip distance vs dead space?", back: "Skip = transmitter to first sky-wave return. Dead space = silent gap between end of ground wave and first sky wave.", difficulty: "medium" },
  { id: "RNFC-101-4", sectionId: "A.10.1", front: "VHF line-of-sight range?", back: "≈ 1.25(√ht₁ + √ht₂), heights in feet.", difficulty: "medium" },
  // A.10.2 ADF
  { id: "RNFC-102-1", sectionId: "A.10.2", front: "QDM formula?", back: "QDM = Heading(M) + Relative Bearing (−360 if over). QDR = QDM ± 180.", difficulty: "medium" },
  { id: "RNFC-102-2", sectionId: "A.10.2", front: "What resolves the ADF 180° ambiguity?", back: "The sense aerial (combines with the loop to make a single-null cardioid).", difficulty: "easy" },
  { id: "RNFC-102-3", sectionId: "A.10.2", front: "Coastal refraction — which way is the fix wrong?", back: "A fix from inland NDBs while at sea plots LANDWARDS of the true position.", difficulty: "hard" },
  { id: "RNFC-102-4", sectionId: "A.10.2", front: "When is ADF night effect worst?", back: "At dawn and dusk; reduce with lower frequencies and nearby NDBs.", difficulty: "medium" },
  // A.10.3 VOR & ILS
  { id: "RNFC-103-1", sectionId: "A.10.3", front: "VOR: TO + needle centred means?", back: "You are on the RECIPROCAL of the selected radial. CDI ignores heading.", difficulty: "medium" },
  { id: "RNFC-103-2", sectionId: "A.10.3", front: "Which ILS element carries the ident? Marker frequency?", back: "The localiser carries the ident. All markers transmit on 75 MHz.", difficulty: "medium" },
  { id: "RNFC-103-3", sectionId: "A.10.3", front: "ILS rate of descent?", back: "ROD ≈ GP° × GS × 100 / 60 (≈ 5 × GS for 3°). GP full-scale = ±0.7°.", difficulty: "medium" },
  { id: "RNFC-103-4", sectionId: "A.10.3", front: "150 Hz predominant on the localiser = ?", back: "Right of the centreline (blue sector). Relate to runway heading for east/west.", difficulty: "hard" },
  // A.10.4 DME
  { id: "RNFC-104-1", sectionId: "A.10.4", front: "DME interrogation/reply frequency separation & fixed delay?", back: "63 MHz apart; fixed transponder delay 50 µs. Range = 0.162(T−50)/2 NM.", difficulty: "hard" },
  { id: "RNFC-104-2", sectionId: "A.10.4", front: "DME range type & saturation point?", back: "Slant range (error worst high & close). Saturates above ~100 aircraft, then raises threshold (drops weakest).", difficulty: "medium" },
  // A.10.5 Radar & SSR
  { id: "RNFC-105-1", sectionId: "A.10.5", front: "PRF vs pulse width?", back: "PRF sets MAXIMUM range; pulse width sets MINIMUM range/resolution. Doubling primary-radar range = ×16 power.", difficulty: "medium" },
  { id: "RNFC-105-2", sectionId: "A.10.5", front: "SSR frequencies & modes?", back: "Interrogate 1030, reply 1090 MHz. A/B/C = 8/17/21 µs; C = altitude. 4096 codes.", difficulty: "medium" },
  { id: "RNFC-105-3", sectionId: "A.10.5", front: "SSR special squawks?", back: "7500 hijack, 7600 comms failure, 7700 emergency. P2 = side-lobe suppression pulse.", difficulty: "easy" },
  // A.10.6 Weather radar
  { id: "RNFC-106-1", sectionId: "A.10.6", front: "Why SHF (~3 cm) for weather radar, and which beam for mapping?", back: "Short wavelength reflects off large water drops. Pencil beam for weather; cosecant fan beam for mapping ≤60 NM.", difficulty: "medium" },
  { id: "RNFC-106-2", sectionId: "A.10.6", front: "Iso-echo/contour & colour order?", back: "Contour blanks strongest returns to black (turbulence). Colours green→yellow→red→magenta (magenta = worst).", difficulty: "medium" },
  // A.10.9 Radio altimeter
  { id: "RNFC-109-1", sectionId: "A.10.9", front: "Radio altimeter — band & principle?", back: "FM-CW, 4200–4400 MHz (±50 MHz sweep). Height from the transmit/echo frequency difference. Range 0–2500 ft AGL.", difficulty: "medium" },
  // A.10.10 ELT
  { id: "RNFC-110-1", sectionId: "A.10.10", front: "ELT frequencies (analogue vs digital)?", back: "Analogue 121.5 & 243 MHz; digital/EPIRB 406 MHz. Audio downsweeps 1600→300 Hz.", difficulty: "easy" },
  // A.10.11 RNAV
  { id: "RNFC-111-1", sectionId: "A.10.11", front: "B-RNAV vs P-RNAV accuracy?", back: "B-RNAV ±5 NM, P-RNAV ±1 NM (95%). Rho-Theta = DME distance + VOR bearing; approach full-scale 1.25 NM.", difficulty: "medium" },
  // A.10.12 GPS
  { id: "RNFC-112-1", sectionId: "A.10.12", front: "GPS constellation & satellites for a 3D fix?", back: "24 sats, 6 planes, 55° incl. 3 ranges = 2D; a 4th fixes clock bias for 3D. Civil C/A on L₁ 1575.42 MHz.", difficulty: "medium" },
  { id: "RNFC-112-2", sectionId: "A.10.12", front: "RAIM & GDOP?", back: "RAIM (receiver self-integrity check) needs a 5th satellite. GDOP is worst when satellites are close together.", difficulty: "hard" },

  // ───── Frequencies & numbers to memorise (added) ─────
  { id: "RNFC-101-5", sectionId: "A.10.1", front: "Frequency bands & aero uses (table)", back: "VLF 3–30 kHz · LF 30–300 kHz (NDB) · MF 300 kHz–3 MHz (NDB) · HF 3–30 MHz (oceanic) · VHF 30–300 MHz (COM 118–136.975, VOR 108–117.95, ILS LOC) · UHF 300 MHz–3 GHz (DME, GPS, GS) · SHF 3–30 GHz (radar).", difficulty: "hard" },
  { id: "RNFC-101-6", sectionId: "A.10.1", front: "Propagation paths by band?", back: "Surface/ground wave: LF/MF. Sky wave (ionospheric refraction): HF. Space/line-of-sight: VHF and above. Static falls, line-of-sight dominates, as frequency rises.", difficulty: "medium" },
  { id: "RNFC-103-5", sectionId: "A.10.3", front: "VOR/ILS frequency ranges & GP angle?", back: "VOR 108.00–117.95 MHz (odd .05 tenths = ILS LOC 108–111.975). Glidepath 329–335 MHz, nominal 3°. Markers 75 MHz (outer 400 Hz, middle 1300 Hz, inner 3000 Hz).", difficulty: "hard" },
  { id: "RNFC-109-2", sectionId: "A.10.9", front: "Radio altimeter — use & callouts?", back: "Reads AGL 0–2500 ft; feeds the DH alert, auto callouts, GPWS/TAWS and autoland. Independent of QNH, but reads over the terrain under the approach (may differ from field elevation).", difficulty: "medium" },
  { id: "RNFC-110-2", sectionId: "A.10.10", front: "ELT/COSPAS-SARSAT detail?", back: "406 MHz is satellite-detected (digital, encodes a unique ID & often GPS position); 121.5 MHz is the homing/analogue beacon no longer satellite-monitored. VHF emergency = 121.5 MHz (guard).", difficulty: "medium" },
  { id: "RNFC-111-2", sectionId: "A.10.11", front: "RNAV / PBN specs (table)?", back: "RNAV 10 (±10 NM oceanic) · RNAV 5/B-RNAV (±5 NM) · RNAV 1 & P-RNAV (±1 NM) · RNP APCH (±0.3 NM). 'RNP' adds on-board performance monitoring & alerting; 'RNAV' does not.", difficulty: "hard" },
  { id: "RNFC-112-3", sectionId: "A.10.12", front: "GNSS systems & augmentation?", back: "GPS (USA) · GLONASS (RU) · Galileo (EU) · BeiDou (CN). Augmentation: SBAS (e.g. WAAS/EGNOS, wide-area) & GBAS (local, for precision approach). L1 C/A = 1575.42 MHz.", difficulty: "medium" },

  // A.10.7 SSR / transponder
  { id: "RNFC-107-1", sectionId: "A.10.7", front: "SSR interrogation/reply frequencies?", back: "Ground interrogates on 1030 MHz; the transponder replies on 1090 MHz. An ACTIVE coded reply (not a skin echo) — so the display is free of weather/ground clutter.", difficulty: "medium" },
  { id: "RNFC-107-2", sectionId: "A.10.7", front: "SSR modes A / C / S?", back: "Mode A = 4-digit identity (squawk); Mode C = pressure altitude (1013, ±50 ft to ATC); Mode S = selective, unique 24-bit address + data link (underpins ACAS/TCAS and ADS-B).", difficulty: "medium" },
  { id: "RNFC-107-3", sectionId: "A.10.7", front: "Squawk codes & special codes?", back: "4 octal digits = 4096 codes (all modes). 7500 hijack · 7600 radio failure · 7700 emergency · 2000 entering SSR airspace · 7000 VFR conspicuity. Set codes in STANDBY.", difficulty: "medium" },
  { id: "RNFC-107-4", sectionId: "A.10.7", front: "SSR advantages over primary radar?", back: "Strong coded reply (far less power), positive identification and altitude read-out. P2 pulse = side-lobe suppression; garbling if two aircraft reply together at a similar range.", difficulty: "hard" },
  // A.10.8 Airborne weather radar
  { id: "RNFC-108-1", sectionId: "A.10.8", front: "Airborne weather radar — band & principle?", back: "Active primary radar, X-band (~9.3 GHz / ~3 cm). Reflects off precipitation (bigger droplets = stronger return), colour-coded green→yellow→red→magenta (magenta = heaviest).", difficulty: "medium" },
  { id: "RNFC-108-2", sectionId: "A.10.8", front: "TILT, GAIN and beam types?", back: "TILT scans weather at different heights and avoids ground returns; GAIN sets sensitivity. Pencil beam for weather; cosecant fan beam for ground mapping (≤~60 NM).", difficulty: "medium" },
  { id: "RNFC-108-3", sectionId: "A.10.8", front: "Weather-radar hazards: attenuation & gradients?", back: "Heavy rain close in absorbs the beam and hides stronger cells behind it (radar shadow). Steep colour gradients/hooks = severe turbulence/hail — avoid cells by 10–20 NM. It can't see dry turbulence or thin cloud.", difficulty: "hard" },
];

export function getRadioNavFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return RADIONAV_FLASHCARDS.filter((c) => c.sectionId === sectionId);
}
