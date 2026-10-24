// Flight Planning & Performance questions grounded in CAE Oxford (Mass & Balance
// / Performance): Performance Classification (A.4.1), Certification (A.4.2) and
// Factors Affecting Performance (A.4.8). Definitions/figures are the textbook's
// (EASA CS-23/CS-25 framing); answers taken directly from the book's text.

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

const Q = (id: string, sectionId: string, question: string, a: string, b: string, c: string, d: string, correct: "a" | "b" | "c" | "d", explanation: string, difficulty: "easy" | "medium" | "hard" = "medium"): AirLawQuestion =>
  ({ id, sectionId, question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: correct, explanation, difficulty });

export const FPP_OXFORD_QUESTIONS: AirLawQuestion[] = [
  // A.4.1 Performance Classification (textbook definitions)
  Q("FPX-01", "A.4.1", "Per the textbook, Performance Class A comprises:", "multi-engine turbo-propeller aeroplanes with more than 9 passenger seats or MTOM over 5700 kg, and all multi-engine turbojets", "all single-engine aeroplanes", "propeller aeroplanes of 9 seats or fewer and 5700 kg or less", "reciprocating-engine aeroplanes only", "a", "Class A = multi-engine turboprops with >9 seats or >5700 kg, plus all multi-engine turbojets (CS-25).", "medium"),
  Q("FPX-02", "A.4.1", "Performance Class B is defined as:", "propeller-driven aeroplanes with 9 or fewer passenger seats and MTOM 5700 kg or less", "all multi-engine turbojets", "reciprocating aeroplanes over 5700 kg", "supersonic aeroplanes", "a", "Class B = propeller aeroplanes, ≤9 seats and ≤5700 kg (CS-23).", "medium"),
  Q("FPX-03", "A.4.1", "Performance Class C comprises aeroplanes that are:", "reciprocating-engine powered with more than 9 passenger seats or MTOM exceeding 5700 kg", "turbojet powered", "propeller aeroplanes of 9 seats or fewer", "gliders", "a", "Class C = reciprocating-engine aeroplanes with >9 seats or >5700 kg.", "medium"),
  Q("FPX-04", "A.4.1", "Supersonic aeroplanes and seaplanes, whose performance needs special consideration, are placed in which class?", "Unclassified", "Class A", "Class B", "Class C", "a", "The textbook places unique-performance types (e.g. supersonic, seaplanes) in the Unclassified category.", "medium"),
  Q("FPX-05", "A.4.1", "Class A aeroplanes must comply with which EASA Certification Specification?", "CS-25", "CS-23", "CS-27", "CS-31", "a", "Large (Class A) aeroplanes are certificated to CS-25; Class B to CS-23.", "medium"),
  Q("FPX-06", "A.4.1", "The take-off screen height is:", "35 ft for Class A and 50 ft for Class B aeroplanes", "50 ft for Class A and 35 ft for Class B", "35 ft for all classes", "15 ft for all classes", "a", "The textbook states the screen height is 35 ft for Class A and 50 ft for Class B.", "medium"),
  // A.4.2 Certification
  Q("FPX-07", "A.4.2", "A 'large aeroplane' is defined as one with a maximum certificated take-off weight of more than:", "5700 kg", "2730 kg", "8618 kg", "10 000 kg", "a", "The textbook defines a large aeroplane as one exceeding 5700 kg MTOW.", "medium"),
  Q("FPX-08", "A.4.2", "Light propeller aeroplanes (9 seats or fewer, ≤5700 kg) are certificated to:", "CS-23", "CS-25", "CS-29", "CS-34", "a", "Class B light aeroplanes are certificated to CS-23; CS-25 applies to large (Class A) aeroplanes.", "medium"),
  Q("FPX-09", "A.4.2", "A runway is considered 'contaminated' when more than the following proportion of its surface area is covered by water, slush, snow or ice:", "25%", "10%", "50%", "75%", "a", "The textbook defines a contaminated runway as one where more than 25% of the surface is affected.", "hard"),
  Q("FPX-10", "A.4.2", "'Density altitude' is defined as:", "the altitude in the ISA at which the prevailing measured density occurs", "the height above the runway", "pressure altitude corrected for QNH", "the altitude read on the altimeter set to 1013", "a", "Density altitude is the ISA altitude corresponding to the actual measured air density.", "medium"),
  // A.4.8 Factors Affecting Performance
  Q("FPX-11", "A.4.8", "As aeroplane mass increases, the take-off distance required will:", "increase (more inertia and more wheel drag, needing a higher lift-off speed)", "decrease", "stay the same", "decrease then increase", "a", "Greater mass means more inertia, more wheel drag and a higher required lift-off speed — all lengthening the take-off.", "medium"),
  Q("FPX-12", "A.4.8", "A headwind on take-off will:", "reduce the ground speed at the take-off airspeed and reduce the take-off distance", "increase the take-off distance", "have no effect", "require a higher rotation speed", "a", "A headwind lowers the groundspeed needed to reach take-off airspeed, shortening the run.", "easy"),
  Q("FPX-13", "A.4.8", "An increase in density altitude (hot, high, humid) affects take-off performance by:", "lengthening the take-off distance and reducing the climb gradient", "shortening the take-off distance", "increasing engine thrust", "having no effect below 5000 ft", "a", "Lower air density reduces lift, thrust and power, so distances increase and climb degrades.", "medium"),
  Q("FPX-14", "A.4.8", "An uphill runway slope on take-off will:", "increase the take-off distance required", "decrease the take-off distance required", "not affect take-off distance", "only affect the landing distance", "a", "An upslope adds a gravity component opposing acceleration, increasing the take-off distance.", "medium"),
];
