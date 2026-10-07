// Flight Instruments — gap-fill for A.7.2.f (HSI / EFIS) (aspect-tagged).

import type { AirLawQuestion } from "@/app/data/airlaw-questions";

const q = (
  id: string, sectionId: string, aspect: string, question: string,
  a: string, b: string, c: string, d: string,
  correct: "a" | "b" | "c" | "d", explanation: string,
  difficulty: "easy" | "medium" | "hard", tag: "recall" | "apply" | "calc" | "trap",
): AirLawQuestion => ({ id, sectionId, aspect, question, optionA: a, optionB: b, optionC: c, optionD: d, correctAnswer: correct, explanation, difficulty, tag });

export const INSTRUMENTS_GAP_QUESTIONS: AirLawQuestion[] = [
  // ───── A.7.2.f HSI / EFIS ─────
  q("INSG-001", "A.7.2", "A.7.2.f", "A Horizontal Situation Indicator (HSI) combines the:", "airspeed and altitude", "heading indicator with VOR/ILS deviation", "artificial horizon with turn coordinator", "VSI with the altimeter", "b", "The HSI merges the directional gyro (heading) with VOR/LOC and glideslope deviation in one display.", "medium", "recall"),
  q("INSG-002", "A.7.2", "A.7.2.f", "In an EFIS cockpit, the Primary Flight Display (PFD) presents:", "engine parameters", "attitude, airspeed, altitude, heading and vertical speed", "the navigation map only", "weather radar only", "b", "The PFD integrates the primary flight parameters (attitude, ASI, altimeter, heading, VSI) on one screen.", "medium", "recall"),
  q("INSG-003", "A.7.2", "A.7.2.f", "The Navigation Display (ND) of an EFIS typically shows:", "the attitude indicator", "route, track, waypoints and (optionally) weather/terrain", "oil pressure and temperature", "the standby compass", "b", "The ND shows the navigation picture — track, waypoints, map — often overlaid with weather/terrain.", "medium", "recall"),
  q("INSG-004", "A.7.2", "A.7.2.f", "On an EFIS, the ND can usually be selected to modes such as:", "RMI only", "MAP, VOR, ILS and PLAN", "PFD and EADI", "QNH and QFE", "b", "The ND offers MAP, VOR, ILS (APP) and PLAN modes.", "medium", "recall"),
  q("INSG-005", "A.7.2", "A.7.2.f", "The Mode Control Panel (MCP) / Flight Control Unit is used to:", "set engine thrust limits", "select autopilot/flight-director targets (heading, altitude, speed, V/S)", "tune the standby radio", "control cabin pressurisation", "b", "The MCP/FCU is where the crew select the autoflight targets (heading, altitude, speed, vertical speed).", "medium", "recall"),
  q("INSG-006", "A.7.2", "A.7.2.f", "A major advantage of EFIS over traditional (clockwork) instruments is:", "it needs no electrical power", "integrated, decluttered, reconfigurable displays with clear failure flags", "it removes the need for any standby instruments", "it cannot fail", "b", "EFIS integrates data into clear, selectable displays and flags failures — reducing scan workload and clutter.", "medium", "recall"),
  q("INSG-007", "A.7.2", "A.7.2.f", "On many EFIS displays the colour magenta is conventionally used for:", "warnings requiring immediate action", "the selected/commanded value or active flight-plan track", "engine limits exceeded", "terrain below the aircraft", "b", "Magenta typically denotes selected/commanded information (e.g. the active flight-plan track, selected bug).", "hard", "recall"),
];

export function getInstrumentsGapQuestionsBySection(sectionId: string): AirLawQuestion[] {
  return INSTRUMENTS_GAP_QUESTIONS.filter((x) => x.sectionId === sectionId);
}
