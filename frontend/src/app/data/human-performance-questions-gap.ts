// Human Performance — gap-fill for the thin First Aid & Survival section (aspect-tagged).

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

const q = (
  id: string, sectionId: string, aspect: string, question: string,
  a: string, b: string, c: string, d: string,
  correct: "a" | "b" | "c" | "d", explanation: string,
  difficulty: "easy" | "medium" | "hard", tag: "recall" | "apply" | "calc" | "trap",
): AirLawQuestion => ({ id, sectionId, aspect, question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: correct, explanation, difficulty, tag });

export const HP_GAP_QUESTIONS: AirLawQuestion[] = [
  // ───── A.6.4.a First aid ─────
  q("HPG-001", "A.6.4", "A.6.4.a", "The first action for a person who has fainted is to:", "give them water to drink", "lay them down and raise the legs to restore blood flow to the brain", "sit them upright", "give oxygen at high flow only", "b", "Fainting is transient reduced cerebral blood flow — lay flat and elevate the legs.", "easy", "recall"),
  q("HPG-002", "A.6.4", "A.6.4.a", "To control a nosebleed the casualty should:", "tilt the head back and pinch the bridge", "lean forward and pinch the soft part of the nose", "lie flat and swallow the blood", "blow the nose hard", "b", "Lean forward (so blood doesn't run back) and pinch the soft part of the nostrils.", "easy", "recall"),
  q("HPG-003", "A.6.4", "A.6.4.a", "Severe external bleeding is best controlled initially by:", "a tourniquet in all cases", "direct firm pressure on the wound and elevation", "applying ice only", "giving the casualty a hot drink", "b", "Direct pressure and elevation control most external bleeding; a tourniquet is a last resort.", "medium", "recall"),
  q("HPG-004", "A.6.4", "A.6.4.a", "The signs of shock (hypovolaemic) include:", "slow strong pulse, flushed warm skin", "rapid weak pulse, pale cold clammy skin", "high fever and rash", "no change in pulse", "b", "Shock: fast weak pulse, pale cold clammy skin — keep the casualty lying, warm and reassured.", "medium", "recall"),
  q("HPG-005", "A.6.4", "A.6.4.a", "A suspected fracture of a limb should be:", "straightened forcibly and splinted", "immobilised/supported in the position found", "massaged to reduce swelling", "exercised to keep circulation", "b", "Immobilise and support the limb as found; do not force it straight.", "medium", "recall"),
  q("HPG-006", "A.6.4", "A.6.4.a", "The immediate treatment of a minor burn is to:", "apply butter or grease", "cool it with clean running water for several minutes", "burst any blisters", "cover with cotton wool", "b", "Cool a burn with running water (≥10 min); never apply grease or burst blisters.", "easy", "recall"),
  q("HPG-007", "A.6.4", "A.6.4.a", "A common cause of in-flight food poisoning risk is mitigated by:", "all crew eating the same meal", "flight crew eating different meals from different sources", "skipping meals entirely", "eating only before flight", "b", "Pilots eat different meals so a single contaminated meal cannot incapacitate the whole flight crew.", "medium", "apply"),

  // ───── A.6.4.b Survival ─────
  q("HPG-011", "A.6.4", "A.6.4.b", "The greatest immediate threat to a survivor in cold water is:", "dehydration", "hypothermia (loss of body heat)", "sunburn", "hunger", "b", "Cold water removes body heat rapidly; hypothermia is the primary early killer — minimise movement, keep clothing on.", "medium", "recall"),
  q("HPG-012", "A.6.4", "A.6.4.b", "In a hot, arid survival situation the priority is to:", "ration sweat by minimising exertion and staying shaded, conserving water", "keep moving to find help quickly", "ration water strictly while working hard", "drink sea water", "a", "'Ration sweat, not water' — rest in shade during heat, work at night, to conserve body water.", "medium", "apply"),
  q("HPG-013", "A.6.4", "A.6.4.b", "Survivors in a life raft should NOT drink sea water because it:", "tastes bad", "accelerates dehydration due to its high salt content", "is too cold", "contains oxygen", "b", "Salt water worsens dehydration (the body uses more water to excrete the salt).", "medium", "recall"),
  q("HPG-014", "A.6.4", "A.6.4.b", "The normal core body temperature is approximately:", "33 °C", "37 °C", "40 °C", "30 °C", "b", "Normal core temperature is ~37 °C; hypothermia and hyperthermia are dangerous departures from it.", "easy", "recall"),
  q("HPG-015", "A.6.4", "A.6.4.b", "After a ditching, survivors are generally advised to:", "swim toward the nearest shore immediately", "stay with the aircraft/raft to aid detection and conserve energy", "discard life jackets to swim faster", "separate to cover more area", "b", "Stay with the raft/wreckage — it is easier for searchers to spot and conserves energy.", "medium", "apply"),
  q("HPG-016", "A.6.4", "A.6.4.b", "In a cold climate, heat loss is reduced most effectively by:", "removing wet outer layers only", "insulating from the ground and keeping dry, trapping air in layered clothing", "vigorous continuous exercise", "eating snow for water", "b", "Insulate from the ground, stay dry and layer clothing to trap air; eating snow lowers core temperature.", "medium", "recall"),
];

export function getHPGapQuestionsBySection(sectionId: string): AirLawQuestion[] {
  return HP_GAP_QUESTIONS.filter((x) => x.sectionId === sectionId);
}
