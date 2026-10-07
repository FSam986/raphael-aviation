// ============================================================================
// SACAA PPL — AIR LAW FLASHCARDS
// Original recall cards for the PPL (Aeroplane) Air Law syllabus (Appendix 1.0),
// paraphrased from the SA CARs / ICAO Convention & Annexes in original wording.
// Section ids match ppl-syllabus.ts.
// ============================================================================

import type { AirLawFlashcard } from "./airlaw-flashcards";

export const PPL_AIRLAW_FLASHCARDS: AirLawFlashcard[] = [
  // 1 ICAO
  { id: "PFC-1-01", sectionId: "1", front: "What is the Chicago Convention?", back: "The Convention on International Civil Aviation (1944) that founded ICAO and set the framework for international flying.", difficulty: "easy" },
  { id: "PFC-1-02", sectionId: "1", front: "Sovereignty over airspace?", back: "Each contracting state has complete and exclusive sovereignty over the airspace above its territory.", difficulty: "medium" },
  { id: "PFC-1-03", sectionId: "1", front: "How are ICAO SARPs published?", back: "As Annexes to the Chicago Convention.", difficulty: "medium" },
  { id: "PFC-1-04", sectionId: "1", front: "Documents carried in the aircraft?", back: "Certificate of Registration, Certificate of Airworthiness, crew licences, journey log, radio station licence.", difficulty: "medium" },
  // 4 Annex 14
  { id: "PFC-4-01", sectionId: "4", front: "Runway vs taxiway marking colours?", back: "Runway markings WHITE; taxiway markings YELLOW.", difficulty: "easy" },
  { id: "PFC-4-02", sectionId: "4", front: "Runway/taxiway light colours?", back: "Threshold GREEN, edge WHITE, runway end RED; taxiway edge BLUE, centreline GREEN.", difficulty: "medium" },
  { id: "PFC-4-03", sectionId: "4", front: "Red square with yellow diagonals?", back: "Aerodrome unsafe — do NOT land.", difficulty: "medium" },
  { id: "PFC-4-04", sectionId: "4", front: "Aerodrome sign colours?", back: "Red/white = mandatory instruction (e.g. holding position); yellow/black = information/location.", difficulty: "medium" },
  // 5.1 Definitions
  { id: "PFC-51-01", sectionId: "5.1", front: "Definition of 'night'?", back: "End of evening civil twilight to start of morning civil twilight (sun 6° below the horizon).", difficulty: "medium" },
  { id: "PFC-51-02", sectionId: "5.1", front: "Accident vs incident?", back: "Accident = fatal/serious injury, aircraft damage/structural failure, or aircraft missing. Incident = affects/could affect safety but isn't an accident.", difficulty: "medium" },
  { id: "PFC-51-03", sectionId: "5.1", front: "Which injuries are NOT 'serious'?", back: "Simple fractures of fingers, toes or the nose.", difficulty: "medium" },
  // 5.2 Part 12
  { id: "PFC-52-01", sectionId: "5.2", front: "How/when to report an accident?", back: "By the quickest available means, without delay; duty on the PIC, then owner/operator.", difficulty: "medium" },
  { id: "PFC-52-02", sectionId: "5.2", front: "When may wreckage be moved?", back: "Only to save life, relieve suffering, prevent destruction, or by the investigator's authority.", difficulty: "medium" },
  // 5.3 Part 61 PPL
  { id: "PFC-53-01", sectionId: "5.3", front: "PPL(A) age and medical?", back: "Min age 17 (solo from 16); Class 2 medical.", difficulty: "easy" },
  { id: "PFC-53-02", sectionId: "5.3", front: "Key PPL privilege limit?", back: "May NOT fly for remuneration or hire and reward — cannot be paid to fly.", difficulty: "easy" },
  { id: "PFC-53-03", sectionId: "5.3", front: "Does the licence expire?", back: "No — but it is exercised only while the medical, ratings and required checks are valid.", difficulty: "medium" },
  { id: "PFC-53-04", sectionId: "5.3", front: "Passenger-carrying recency?", back: "The prescribed recent take-offs and landings within the specified period.", difficulty: "medium" },
  // 5.4 Part 67
  { id: "PFC-54-01", sectionId: "5.4", front: "Medical class for PPL?", back: "Class 2 (CPL = Class 1); issued via a DAME.", difficulty: "easy" },
  // 5.5 Part 91
  { id: "PFC-55-01", sectionId: "5.5", front: "Converging right of way?", back: "The aircraft on the other's RIGHT has priority; head-on and overtaking → turn RIGHT.", difficulty: "medium" },
  { id: "PFC-55-02", sectionId: "5.5", front: "Minimum heights?", back: "500 ft from any person/structure; 1000 ft above the highest obstacle over congested areas (able to glide clear).", difficulty: "medium" },
  { id: "PFC-55-03", sectionId: "5.5", front: "Semi-circular VFR levels?", back: "0–179°M: odd thousands + 500 ft. 180–359°M: even thousands + 500 ft.", difficulty: "hard" },
  { id: "PFC-55-04", sectionId: "5.5", front: "Priority order in the air?", back: "Least manoeuvrable first: balloons > gliders > airships > powered aircraft.", difficulty: "medium" },
  // 5.6 Part 139
  { id: "PFC-56-01", sectionId: "5.6", front: "Who maintains the aerodrome?", back: "The aerodrome operator (licensed under Part 139); changes notified by NOTAM.", difficulty: "medium" },
  // 5.7 Operational procedures
  { id: "PFC-57-01", sectionId: "5.7", front: "The three SAR phases?", back: "Uncertainty (INCERFA) → Alert (ALERFA) → Distress (DETRESFA).", difficulty: "medium" },
  { id: "PFC-57-02", sectionId: "5.7", front: "Ground-air signals V and X?", back: "V = require assistance; X = require medical assistance.", difficulty: "medium" },
  { id: "PFC-57-03", sectionId: "5.7", front: "Purpose of an accident investigation (Annex 13)?", back: "Prevention of future accidents/incidents — never to apportion blame.", difficulty: "easy" },
];

export function getPPLAirLawFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return PPL_AIRLAW_FLASHCARDS.filter((c) => c.sectionId === sectionId);
}

export const PPL_AIRLAW_FLASHCARD_COUNT = PPL_AIRLAW_FLASHCARDS.length;
