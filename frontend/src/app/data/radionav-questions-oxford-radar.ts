// Radio-Navigation radar questions mined from CAE Oxford (Radio Navigation),
// chapters 11 Radar Principles & 12 Ground Radar. Stems/options are the
// textbook's end-of-chapter questions; every answer was re-derived by hand
// (PRF↔range, the power^4 range law, resolution, min-range, bearing) and all 14
// matched the book's key. A.10.5 = pulse techniques, A.10.6 = ground radar.

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

const Q = (id: string, sectionId: string, question: string, a: string, b: string, c: string, d: string, correct: "a" | "b" | "c" | "d", explanation: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawQuestion =>
  ({ id, sectionId, question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: correct, explanation, difficulty });

export const RADIONAV_OXFORD_RADAR_QUESTIONS: AirLawQuestion[] = [
  Q("RNXR-01", "A.10.5", "The factor which determines the maximum (unambiguous) range of a pulsed radar is:", "pulse repetition rate (PRF)", "pulse width", "power", "beamwidth", "a", "The next pulse must not be sent until the echo of the first returns, so the PRF sets maximum unambiguous range.", "medium"),
  Q("RNXR-02", "A.10.6", "The main advantage of a continuous-wave (CW) radar is:", "no maximum range limitation", "better range resolution", "no minimum range limitation", "lower power", "c", "CW radar transmits continuously, so it has no blanked period and hence no minimum-range limitation (used by the radio altimeter).", "medium"),
  Q("RNXR-03", "A.10.5", "If the PRF of a primary radar is 500 pulses per second, the maximum range will be about:", "324 NM", "300 NM", "162 NM", "600 NM", "c", "Rmax = c/(2·PRF) = 3×10⁸/(1000) = 300 km ≈ 162 NM.", "hard"),
  Q("RNXR-04", "A.10.6", "To double the maximum range of a primary radar, the transmitted power must be increased by a factor of:", "2", "4", "8", "16", "d", "Radar range varies as the fourth root of power, so doubling range needs 2⁴ = 16 times the power.", "hard"),
  Q("RNXR-05", "A.10.5", "The time between transmission of a pulse and reception of its echo is 1720 microseconds. The range of the target is:", "139 km", "258 km", "278 km", "516 km", "b", "Range = c·t/2 = 3×10⁸ × 1720×10⁻⁶ / 2 ≈ 258 km.", "hard"),
  Q("RNXR-06", "A.10.5", "A radar is required to have a maximum range of 100 NM. The maximum PRF that will achieve this is about:", "1620 pps", "1234 pps", "617 pps", "810 pps", "d", "100 NM = 185.2 km; PRF = c/(2·R) = 3×10⁸/(2×185200) ≈ 810 pps.", "hard"),
  Q("RNXR-07", "A.10.5", "If the pulse recurrence interval (PRI) of a radar is 2100 microseconds, the maximum range is about:", "170 NM", "315 NM", "340 NM", "630 NM", "a", "Rmax = c·PRI/2 = 3×10⁸ × 2100×10⁻⁶ / 2 = 315 km ≈ 170 NM.", "hard"),
  Q("RNXR-08", "A.10.5", "To improve the resolution of a radar display requires:", "a narrow pulse width and a narrow beamwidth", "a high frequency and a large reflector", "a wide beamwidth and a wide pulse width", "a low frequency and a narrow pulse width", "a", "Range resolution improves with a shorter pulse; bearing resolution with a narrower beam.", "medium"),
  Q("RNXR-09", "A.10.6", "An advantage of a phased-array (slotted) antenna is:", "better resolution", "less power required", "reduced side lobes and clutter", "all of the above", "d", "Slotted/phased-array antennas improve resolution, are more efficient and reduce side-lobe clutter.", "medium"),
  Q("RNXR-10", "A.10.5", "An echo is received from a target 900 microseconds after the pulse was transmitted. The range to the target is:", "73 NM", "270 NM", "135 NM", "146 NM", "a", "Range = c·t/2 = 3×10⁸ × 900×10⁻⁶ / 2 = 135 km ≈ 73 NM.", "hard"),
  Q("RNXR-11", "A.10.5", "The factor which limits the minimum detection range of a radar is:", "pulse repetition interval", "transmitter power", "pulse width", "pulse repetition frequency", "c", "The receiver is blanked while the pulse is transmitted, so a longer pulse width gives a larger minimum range.", "medium"),
  Q("RNXR-12", "A.10.6", "Second-trace returns generated when Doppler techniques discriminate between aircraft and fixed objects are removed by:", "using a different frequency for transmission and reception", "jittering the PRF", "making regular changes in pulse width", "limiting the power output", "b", "Jittering (staggering) the PRF prevents second-trace returns from appearing at a fixed (false) range.", "hard"),
  Q("RNXR-13", "A.10.5", "A radar is designed to have a maximum range of 12 km. The maximum PRF that would permit this is:", "25 000 pps", "6700 pps", "12 500 pps", "13 400 pps", "c", "PRF = c/(2·R) = 3×10⁸/(2×12000) = 12 500 pps.", "hard"),
  Q("RNXR-14", "A.10.6", "The bearing of a target on a primary radar is measured by the:", "phase comparison", "searchlight principle", "lobe comparison", "DF techniques", "b", "A primary radar derives bearing from the direction the narrow beam points when the echo returns — the searchlight principle.", "medium"),
  // Ground Radar facts (ch12 prose), authored faithfully from the textbook
  Q("RNXR-15", "A.10.6", "Area Surveillance Radars (ASR) used for airway surveillance are typically:", "long-range radars of about 200–300 NM", "short-range radars of about 25 NM", "ground-movement radars only", "medium-range radars of about 75 NM", "a", "Per the textbook, ASRs are long-range (200–300 NM) airway-surveillance radars, supplemented by SSR.", "medium"),
  Q("RNXR-16", "A.10.6", "Terminal (TMA) surveillance radars typically provide coverage up to about:", "75 NM", "300 NM", "25 NM", "10 NM", "a", "Terminal Area radars are medium-range (up to ~75 NM) for controlling traffic in TMAs.", "medium"),
  Q("RNXR-17", "A.10.6", "Aerodrome surveillance/approach radars typically provide positional information up to about:", "25 NM", "75 NM", "200 NM", "150 NM", "a", "Aerodrome surveillance approach radars are short-range (~25 NM), wavelengths 3/10 cm, pulse 0.5–1 µs.", "medium"),
  Q("RNXR-18", "A.10.6", "Airport Surface Movement Radar (ASMR/ASMI) is used to:", "display aircraft and vehicles on runways, taxiways and aprons in all weather", "measure aircraft altitude", "provide long-range airway surveillance", "transmit the ATIS", "a", "ASMR/ASMI gives a detailed all-weather display of surface traffic so ATC can confirm runways are clear.", "medium"),
];
