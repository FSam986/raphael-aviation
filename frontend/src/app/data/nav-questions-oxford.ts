// General Navigation questions mined from CAE Oxford ATPL (General Navigation)
// end-of-chapter question banks. Stems and options are from the textbook; every
// correct answer was re-verified by hand (the PDF's auto-extracted answer keys
// were unreliable and were not trusted). Only cleanly-verifiable items kept.

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

const Q = (id: string, sectionId: string, question: string, a: string, b: string, c: string, d: string, correct: "a" | "b" | "c" | "d", explanation: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawQuestion =>
  ({ id, sectionId, question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: correct, explanation, difficulty });

export const NAV_OXFORD_QUESTIONS: AirLawQuestion[] = [
  // ── A.9.1 The Earth ──
  Q("NVOX-001", "A.9.1", "What is the approximate compression (flattening) of the Earth?", "3%", "0.03%", "0.3%", "1/3000", "c", "Compression ≈ 1/297 ≈ 0.0034 ≈ 0.3%."),
  Q("NVOX-002", "A.9.1", "A graticule is the name given to:", "any series of lines drawn on a chart", "a series of latitude and longitude lines drawn on a chart or map", "a selection of small circles near the poles", "the lines of equal variation on a chart", "b", "A graticule is the network of meridians (longitude) and parallels (latitude) drawn on a chart."),
  Q("NVOX-003", "A.9.1", "The compression value of the Earth is 1/297 and the semi-major axis (at the Equator) is 6378.4 km. The semi-minor (polar) axis is approximately:", "6399.9 km", "6356.9 km", "6378.4 km", "6367.0 km", "b", "Polar radius = 6378.4 × (1 − 1/297) = 6378.4 − 21.5 ≈ 6356.9 km.", "hard"),
  // ── A.9.5 Charts ──
  Q("NVOX-004", "A.9.5", "A direct (normal) Mercator graticule is:", "rectangular", "square", "circular", "convergent", "a", "Meridians and parallels are straight lines crossing at right angles — a rectangular graticule (parallel spacing increases toward the poles)."),
  Q("NVOX-005", "A.9.5", "On a direct Mercator chart, great circles (other than the meridians and the Equator) appear as:", "curves concave to the nearer pole", "curves convex to the Equator", "curves concave to the Equator", "straight lines", "a", "Great circles curve on a Mercator, bowing toward the pole — i.e. concave to the nearer pole."),
  Q("NVOX-006", "A.9.5", "The angle between a straight line (rhumb line) on a Mercator chart and the corresponding great circle is:", "greater than Earth convergency", "equal to Earth convergency", "less than Earth convergency", "equal to change of longitude", "c", "The conversion angle = ½ × convergency, which is less than the full Earth convergency."),
  Q("NVOX-007", "A.9.5", "A Lambert’s conical conformal chart has standard parallels at 63°N and 41°N. The constant of the cone (n) is approximately:", "0.891", "0.788", "0.656", "0.707", "b", "n = sin(parallel of origin) = sin((63 + 41)/2) = sin 52° ≈ 0.788.", "hard"),
  Q("NVOX-008", "A.9.5", "Scale on a Lambert’s conformal conic chart is:", "constant everywhere", "constant along a meridian", "varies greatly with longitude", "constant along a parallel of latitude", "d", "Lambert scale is correct at the two standard parallels and is effectively constant along any given parallel of latitude."),
  Q("NVOX-009", "A.9.2", "Isogonal lines converge as follows:", "At the North Magnetic Pole", "At the North and South Magnetic and Geographical Poles", "At the North and South Magnetic Poles", "At the Magnetic equator", "b", "Isogonals (lines of equal variation) converge at the North and South Magnetic and Geographical Poles.", "medium"),
  Q("NVOX-010", "A.9.2", "What is the maximum possible value of dip angle?", "66°", "180°", "90°", "45°", "c", "The maximum angle of dip is 90°, occurring at the magnetic poles (zero at the magnetic equator).", "easy"),
  Q("NVOX-011", "A.9.2", "What is a line of equal magnetic variation?", "An isocline", "An isogonal", "An isogriv", "An isovar", "b", "A line joining places of equal magnetic variation is an isogonal.", "easy"),
  Q("NVOX-012", "A.9.3", "Your position is 5833N 17400W. You fly exactly 6 NM eastwards. What is your new position?", "5833N 17411.5W", "5833N 17355W", "5833N 17340W", "5833N 17348.5W", "d", "Departure = 6 NM; ch.long = 6 ÷ cos 58°33′ ≈ 11.5′; from 174°00′W eastward the longitude decreases to 173°48.5′W.", "hard"),
  Q("NVOX-013", "A.9.3", "An aircraft at latitude 02°20’N tracks 180°(T) for 685 km. What is its latitude at the end of the flight? (2 Marks)", "03°50’S", "02°50’S", "02°10’S", "08°55’S", "a", "685 km = 370 NM = 6°10′ of latitude; 02°20′N tracking south gives 02°20′N − 6°10′ = 03°50′S.", "hard"),
];
