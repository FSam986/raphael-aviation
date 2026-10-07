// IR Radio Navigation (C.2.x) flashcards. Comprehensive recall cards covering the
// whole of each section, authored from standard radio-aids theory (British
// spelling). Shape matches AirLawFlashcard so it plugs into the registry.

import type { AirLawFlashcard } from "@/app/data/airlaw-flashcards";

const c = (id: string, sectionId: string, front: string, back: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawFlashcard => ({ id, sectionId, front, back, difficulty });

export const IR_RADIONAV_FLASHCARDS: AirLawFlashcard[] = [
  // C.2.1 VDF
  c("IRRNF-C21-1", "C.2.1", "What is VDF and what does it give you?", "A ground VHF direction finder: the ATC station measures the bearing of your transmission and passes you a QDM/QDR/QTE/QUJ. No airborne equipment beyond the VHF radio.", "easy"),
  c("IRRNF-C21-2", "C.2.1", "VDF bearing classes (accuracy)?", "Class A ±2°, Class B ±5°, Class C ±10°, Class D worse than C.", "medium"),
  c("IRRNF-C21-3", "C.2.1", "VDF Q-codes?", "QDM = mag bearing TO, QDR = mag bearing FROM, QTE = true bearing FROM, QUJ = true bearing TO. QDL requests a series.", "medium"),
  c("IRRNF-C21-4", "C.2.1", "VDF range and limitation?", "VHF line-of-sight only: range ≈ 1.25(√ht₁+√ht₂) ft. Needs the aircraft to transmit; accuracy degrades at low level / long range.", "medium"),
  // C.2.2 NDB/ADF
  c("IRRNF-C22-1", "C.2.2", "NDB band, polarisation and emissions?", "LF/MF (≈190–1750 kHz), vertically polarised. A1A = keyed carrier (BFO on); A2A = keyed tone (self-identifying).", "medium"),
  c("IRRNF-C22-2", "C.2.2", "How is an ADF bearing formed?", "Loop aerial gives the direction (sharp null); the sense aerial removes the 180° ambiguity → single-null cardioid. Both are needed.", "medium"),
  c("IRRNF-C22-3", "C.2.2", "ADF errors?", "Quadrantal (airframe re-radiation), coastal refraction (fix plots landwards), night effect (worst dawn/dusk), static/thunderstorm, station interference.", "hard"),
  c("IRRNF-C22-4", "C.2.2", "RBI vs RMI?", "RBI shows relative bearing (angle from nose). RMI is a compass repeater and shows the QDM directly.", "medium"),
  c("IRRNF-C22-5", "C.2.2", "QDM from heading and RB?", "QDM = Heading(M) + Relative Bearing (−360 if over 360). QDR = QDM ± 180.", "medium"),
  // C.2.3 VOR
  c("IRRNF-C23-1", "C.2.3", "VOR band and principle?", "108.0–117.95 MHz. Bearing by phase comparison of a reference phase (9960 Hz sub-carrier FM at 30 Hz) and a rotating variable phase (AM at 30 Hz).", "hard"),
  c("IRRNF-C23-2", "C.2.3", "VOR: TO with the needle centred means?", "You are on the RECIPROCAL of the selected radial. The CDI ignores heading.", "medium"),
  c("IRRNF-C23-3", "C.2.3", "VOR accuracy and the no-ident rule?", "±4°; VOT ground check within ±4° of 180°/360°. No ident = under maintenance → do not use the bearings.", "medium"),
  c("IRRNF-C23-4", "C.2.3", "Doppler VOR — why used?", "A wide-aperture DVOR is far less affected by site/terrain reflection errors than a conventional VOR, giving cleaner bearings.", "medium"),
  // C.2.4 DME
  c("IRRNF-C24-1", "C.2.4", "DME band, principle and offset?", "UHF 962–1213 MHz secondary radar. Interrogator/transponder differ by 63 MHz; fixed 50 µs reply delay; random PRF (jitter) picks out your own replies.", "hard"),
  c("IRRNF-C24-2", "C.2.4", "DME range type and slant error?", "Reads SLANT range in NM. Error is greatest high and close (overhead a station at 6000 ft ≈ 1 NM, not zero).", "medium"),
  c("IRRNF-C24-3", "C.2.4", "VOR/DME vs VORTAC vs TACAN?", "VOR/DME = co-located civil pair. VORTAC = VOR + military TACAN (civil gets VOR bearing + TACAN DME). TACAN alone gives DME only to civil users.", "medium"),
  c("IRRNF-C24-4", "C.2.4", "DME saturation?", "A transponder serves ~100 aircraft; beyond that it saturates, raises its threshold (reduces gain) and drops the weakest/most distant signals.", "medium"),
  // C.2.5 ILS
  c("IRRNF-C25-1", "C.2.5", "ILS localiser & glide path — bands and modulation?", "Localiser VHF 108–112 MHz; glide path UHF 329–335 MHz. 90 Hz / 150 Hz difference in depth of modulation (DDM) gives deviation; on-course DDM = 0.", "hard"),
  c("IRRNF-C25-2", "C.2.5", "ILS full-scale deflection and which element carries ident?", "Glide path full-scale ±0.7° (localiser tighter). The localiser carries the ident; markers all on 75 MHz.", "medium"),
  c("IRRNF-C25-3", "C.2.5", "Which sector is 150 Hz predominant?", "150 Hz (blue) is to the RIGHT of the centreline; 90 Hz (yellow) to the left. Relate to the runway QDM for east/west.", "hard"),
  c("IRRNF-C25-4", "C.2.5", "CAT I/II/III decision heights?", "CAT I: DH 200 ft, RVR 550 m. CAT II: DH 100 ft. CAT III: DH <100 ft / none, very low RVR. False glide paths appear above ~6°.", "medium"),
  // C.2.6 Weather radar
  c("IRRNF-C26-1", "C.2.6", "Weather radar band and why?", "SHF ~9375 MHz (3 cm): short wavelength reflects off large water drops; a narrow pencil beam gives good resolution.", "medium"),
  c("IRRNF-C26-2", "C.2.6", "Beam types and stabilisation?", "Pencil beam for weather (WEA); cosecant fan beam for ground mapping ≤60 NM. Antenna gyro-stabilised in pitch and roll; tilt ±15°.", "medium"),
  c("IRRNF-C26-3", "C.2.6", "Contour / iso-echo and colour order?", "Contour blanks the strongest returns to black = worst turbulence. Colours green→yellow→red→magenta (magenta most severe).", "medium"),
  c("IRRNF-C26-4", "C.2.6", "Ground-use precaution and limitations?", "Never radiate on the ground near people/buildings. Attenuation/rain shadowing can hide cells behind a nearer storm.", "medium"),
  // C.2.7 SSR
  c("IRRNF-C27-1", "C.2.7", "SSR frequencies and modes?", "Ground interrogates 1030 MHz, aircraft replies 1090 MHz (both UHF). Mode A (8 µs) ident, Mode C (21 µs) pressure altitude, Mode S selective (24-bit, 25 ft).", "medium"),
  c("IRRNF-C27-2", "C.2.7", "Emergency squawks?", "7500 hijack, 7600 comms failure, 7700 emergency. Reply frame 20.3 µs; 4096 codes.", "easy"),
  c("IRRNF-C27-3", "C.2.7", "Side-lobe suppression?", "P2 control pulse is stronger than the side lobes; if P2 > P1/P3 the transponder recognises a side-lobe interrogation and suppresses its reply.", "hard"),
  c("IRRNF-C27-4", "C.2.7", "Fruit and garbling?", "Fruit = unsynchronised replies from other interrogators (removed by de-fruiting / different PRFs). Garbling = overlapping replies from close aircraft, resolved by killer circuits.", "medium"),
  // C.2.8 GNSS/GPS
  c("IRRNF-C28-1", "C.2.8", "GPS constellation and 3D fix?", "24 satellites in 6 planes, ~20 200 km, 55° inclination. 3 ranges fix position; a 4th resolves receiver clock bias for a 3D fix.", "medium"),
  c("IRRNF-C28-2", "C.2.8", "Civil frequency and codes?", "Civil C/A code on L₁ = 1575.42 MHz (L₂ 1227.6 MHz is military P-code). Each satellite has a unique C/A code.", "medium"),
  c("IRRNF-C28-3", "C.2.8", "GPS errors?", "Ephemeris (orbit position), ionospheric/tropospheric delay, multipath, receiver clock, and geometry (GDOP worst when satellites are close together).", "hard"),
  c("IRRNF-C28-4", "C.2.8", "RAIM and DGPS?", "RAIM = the receiver's own integrity check, needs a 5th satellite (6 for continuous). DGPS uses a surveyed reference station to broadcast corrections.", "medium"),
];

export function getIRRadioNavFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return IR_RADIONAV_FLASHCARDS.filter((f) => f.sectionId === sectionId);
}
