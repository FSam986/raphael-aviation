// Plotting exercises generated from the CAP graph questions (book Q1–86). Each
// mirrors a bank MCQ: the CAP figure to open, the scenario, the plotting method,
// and the book's answer. The on-screen schematic shows the technique; students
// plot the exact value on their own CAP 697/698 manual.

import type { PlottingQuestion, PlotDiagram } from "@/app/data/fpp-plotting";
import { FPP_GUIDE_GRAPH_QUESTIONS } from "@/app/data/fpp-questions-guide";

function diagramFor(text: string): PlotDiagram {
  if (/landing/i.test(text)) return "landing";
  if (/rate of climb|to climb|\bclimb\b|gradient/i.test(text)) return "climb";
  if (/range|endurance|descent|\bTAS\b|fuel flow|cruise|GPH/i.test(text)) return "cruise";
  return "takeoff"; // take-off / accelerate-stop / ground roll
}

function graphRefOf(question: string): string {
  const m = question.match(/\(([^)]*Fig[^)]*)\)/i);
  return m ? m[1] : "CAP 697/698";
}

function stepsFor(d: PlotDiagram): string[] {
  switch (d) {
    case "takeoff":
      return [
        "Open the CAP figure named above and confirm the header conditions match (surface, flap, slope).",
        "Enter the temperature/pressure-altitude panel and carry across to the mass reference line.",
        "Follow the mass, then wind, then obstacle guides in turn.",
        "Read the distance, then apply the runway-surface and slope factors (dry grass 1.2, wet grass 1.3, slope 1.05–1.1).",
      ];
    case "landing":
      return [
        "Open the CAP landing figure and confirm the header conditions (flap, surface, slope).",
        "Enter the temperature/pressure-altitude panel and carry to the mass reference line.",
        "Follow the mass and wind guides to the reference.",
        "Read the landing distance; apply surface/slope factors and, if 'required', the 1.43 landing factor.",
      ];
    case "climb":
      return [
        "Open the CAP climb figure and confirm the header conditions.",
        "Enter at the pressure altitude / temperature and follow to the mass line.",
        "Read the rate of climb (or time/fuel/distance to climb).",
        "Correct ground distance for the wind component if asked.",
      ];
    case "cruise":
      return [
        "Open the CAP cruise/range/endurance figure and set the power/mixture from the header or power table.",
        "Enter at the cruise altitude and follow the curve to the fuel/mass condition.",
        "Read the range (nm), endurance (h) or TAS as required.",
        "Deduct any reserve and correct for the wind component to get the ground figure.",
      ];
  }
}

const LETTER: Record<string, "optionA" | "optionB" | "optionC" | "optionD"> = {
  a: "optionA", b: "optionB", c: "optionC", d: "optionD",
};

export const FPP_GUIDE_PLOTTING: PlottingQuestion[] = FPP_GUIDE_GRAPH_QUESTIONS.map((q) => {
  const diagram = diagramFor(q.question);
  const answer = q[LETTER[q.correctAnswer]] as string;
  return {
    id: `PLOT-${q.id}`,
    sectionId: q.sectionId,
    graphRef: graphRefOf(q.question),
    diagram,
    given: [q.question.replace(/^\([^)]*\)\s*/, "")],
    ask: "Plot this on your CAP manual and read the value.",
    steps: stepsFor(diagram),
    answer: `${answer} (Flight Planning Examination Guide answer).`,
    difficulty: "hard" as const,
  };
});
