// CPL Aircraft Technical — detailed solved examples (A.1.x). Original problems.
import type { WorkedExample } from "./worked-examples";

const X = (e: WorkedExample) => e;

export const ATG_WORKED_EXAMPLES: WorkedExample[] = [
  X({
    id: "ATGW-131", sectionId: "A.1.3", title: "Ohm's law — series and parallel loads",
    problem: "A 28 V DC bus supplies two lamps of 14 Ω each. Find the current and power when they are wired in parallel and in series.",
    given: ["V = 28 V", "R₁ = R₂ = 14 Ω"],
    find: "Total resistance, current and power in each case.",
    concept: "V = IR; P = VI. Series resistances add; parallel: 1/R = 1/R₁ + 1/R₂.",
    steps: [
      "§ Parallel",
      "R = 14 ÷ 2 = 7 Ω → I = 28 ÷ 7 = 4 A (2 A per lamp) → P = 28 × 4 = 112 W.",
      "§ Series",
      "R = 28 Ω → I = 1 A → each lamp gets 14 V → P = 28 W (a quarter of the parallel power — dim lamps).",
    ],
    answer: "Parallel 4 A, 112 W · series 1 A, 28 W",
    trap: "Adding parallel resistances instead of combining reciprocals.",
  }),
  X({
    id: "ATGW-141", sectionId: "A.1.4", title: "Swept volume and compression ratio",
    problem: "A four-cylinder engine has a bore of 130 mm, a stroke of 98 mm and a clearance volume of 175 cm³ per cylinder.",
    given: ["Bore 13.0 cm; stroke 9.8 cm", "Clearance 175 cm³", "4 cylinders"],
    find: "Swept volume per cylinder, engine capacity and compression ratio.",
    concept: "Swept volume = π/4 × bore² × stroke. CR = (swept + clearance) ÷ clearance.",
    steps: [
      "Piston area = 0.7854 × 13² = 132.7 cm².",
      "Swept volume = 132.7 × 9.8 = 1 301 cm³ per cylinder.",
      "Capacity = 4 × 1 301 = 5 203 cm³ (≈ 5.2 litres / 318 in³).",
      "CR = (1 301 + 175) ÷ 175 = 8.4 : 1.",
    ],
    answer: "1 301 cm³ · 5.2 l · 8.4 : 1",
    trap: "Dividing swept volume alone by clearance (7.4) — the total volume goes on top.",
  }),
  X({
    id: "ATGW-171", sectionId: "A.1.7", title: "Hydroplaning speed",
    problem: "A light twin has main tyre pressure 64 psi; a jet has 196 psi. Both land on a runway with 5 mm standing water.",
    given: ["Vp ≈ 9√psi (rotating)", "Vp ≈ 7.7√psi (non-rotating at touchdown)"],
    find: "Dynamic hydroplaning speeds for each.",
    concept: "Dynamic hydroplaning begins when the water pressure under the tyre equals tyre pressure — set by tyre pressure.",
    steps: [
      "Twin: √64 = 8 → rotating 72 kt; non-rotating ≈ 62 kt.",
      "Jet: √196 = 14 → rotating 126 kt; non-rotating ≈ 108 kt.",
      "Touchdown speeds above these risk hydroplaning — once started it may continue below them. Land firmly, use reverse/spoilers, brake gently.",
    ],
    answer: "Twin ≈ 72 / 62 kt · jet ≈ 126 / 108 kt",
    trap: "Using the rotating figure for the touchdown case — a non-rotating tyre hydroplanes at a lower speed.",
  }),
  X({
    id: "ATGW-181", sectionId: "A.1.8", title: "Stall speed with mass and bank",
    problem: "An aeroplane stalls at 60 kt (IAS) at 1 000 kg in level flight. It is loaded to 1 210 kg and makes a level 60° turn.",
    given: ["VS ∝ √mass", "VS ∝ √n; n = 1/cos φ"],
    find: "Stall speed at 1 210 kg level, and in the 60° turn.",
    concept: "Lift needed rises with weight and load factor; stall speed rises with the square root.",
    steps: [
      "Mass ratio 1.21 → √ = 1.1 → VS = 66 kt.",
      "60° bank → n = 2 → √2 = 1.414 → VS = 66 × 1.414 = 93 kt.",
    ],
    answer: "66 kt level · 93 kt in a 60° turn",
    trap: "Multiplying by n (2) instead of √n.",
  }),
  X({
    id: "ATGW-182", sectionId: "A.1.8", title: "Turn radius, rate and load factor",
    problem: "An aircraft flies a level 30° banked turn at TAS 120 kt, then at 240 kt with the same bank.",
    given: ["r = V²/(g tan φ)", "ω = g tan φ / V", "120 kt = 61.7 m/s", "tan 30 = 0.577"],
    find: "Radius, rate of turn and load factor at each speed.",
    concept: "At a fixed bank, radius ∝ V² and rate ∝ 1/V; load factor depends only on bank.",
    steps: [
      "n = 1/cos 30 = 1.15 g at both speeds.",
      "120 kt: r = 61.7² ÷ (9.81 × 0.577) = 3 807 ÷ 5.66 = 673 m (0.36 nm); ω = 5.66 ÷ 61.7 = 0.092 rad/s = 5.3°/s.",
      "240 kt: radius × 4 = 2 690 m (1.45 nm); rate ÷ 2 = 2.6°/s.",
    ],
    answer: "120 kt: 673 m, 5.3°/s · 240 kt: 2 690 m, 2.6°/s · 1.15 g",
    trap: "Thinking a faster aircraft turns faster at the same bank — it turns slower and wider.",
  }),
  X({
    id: "ATGW-183", sectionId: "A.1.8", title: "Glide range and the effect of weight",
    problem: "An aircraft with L/D max 9 glides from 4 500 ft AGL. Its best-glide speed is 70 kt at 1 000 kg. Compare a 1 200 kg loading.",
    given: ["Range = height × L/D", "Best-glide speed ∝ √mass"],
    find: "Still-air glide range and best-glide speed at each mass.",
    concept: "L/D doesn't depend on weight, so range is unchanged — only the speed (and sink rate) rise.",
    steps: [
      "Range = 4 500 × 9 = 40 500 ft = 6.7 nm (both masses).",
      "Speed at 1 200 kg = 70 × √1.2 = 70 × 1.095 = 77 kt.",
      "Time airborne: 6.7 nm at 70 kt = 5.7 min; at 77 kt = 5.2 min — heavier comes down sooner.",
    ],
    answer: "6.7 nm both · 70 kt vs 77 kt",
    trap: "Assuming the heavier aircraft glides less far.",
  }),
];
