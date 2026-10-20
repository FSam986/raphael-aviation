// SACAA IR — SPECIAL OPERATIONAL PROCEDURES & HAZARDS study notes.
// Original plain-language notes for the IR "Special Operational Procedures &
// Hazards" syllabus (C.5.x). Section ids match ir-syllabus.ts. Reuses the Air
// Law note shape so the Learn tab renders it directly.

import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

export const IR_SOP_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "C.5.1",
    title: "Ground De-icing / Anti-icing",
    intro:
      "Frozen contamination on the wings and tail destroys lift and increases drag and weight long before the aircraft leaves the ground. The exam tests the clean-aircraft concept, the fluid types, and holdover time.",
    blocks: [
      {
        heading: "1. The clean-aircraft concept & fluids",
        points: [
          "No aircraft may take off with frost, ice, snow or slush adhering to the wings, control surfaces, propellers, engine inlets or other critical surfaces — even a thin layer of roughness can reduce lift by a large margin and increase stall speed.",
          "DE-ICING removes existing contamination; ANTI-ICING is applied to clean surfaces to delay further build-up. Type I fluid (thin, usually orange, heated) de-ices; Types II, III and IV (thicker, pseudoplastic) give anti-icing protection.",
          "A two-step process (de-ice with Type I, then anti-ice with a Type II/IV) is used in active precipitation; the clock for holdover starts at the beginning of the final (anti-icing) application.",
        ],
      },
      {
        heading: "2. Holdover time",
        points: [
          "Holdover Time (HOT) is the estimated time the anti-icing fluid will prevent the formation of frost/ice and the accumulation of snow on the protected surfaces. It is a range, not a fixed value.",
          "HOT shortens with heavier precipitation, lower temperature, higher humidity and wind; it is taken from the manufacturer's/regulator's HOT tables for the fluid type, concentration and weather.",
          "If the holdover time is exceeded, or contamination is seen or suspected before take-off, a pre-take-off contamination check (or re-treatment) is required.",
        ],
      },
    ],
    mustKnow: [
      "No take-off with frost/ice/snow/slush on critical surfaces — the clean-aircraft concept.",
      "Type I = de-icing (thin/heated); Types II/III/IV = anti-icing (thicker, longer protection).",
      "Holdover time is a range that shortens with heavier precipitation, colder temperature and wind.",
      "Exceed the HOT, or see contamination → re-check/re-treat before take-off.",
    ],
    traps: [
      "Even a thin layer of frost on the wing significantly raises stall speed — 'polished frost' is not acceptable.",
      "Holdover time starts at the beginning of the ANTI-icing (final) application, not when de-icing began.",
    ],
  },
  {
    sectionId: "C.5.2",
    title: "Bird Strike Risk & Avoidance",
    intro:
      "Bird strikes are most likely at low level around aerodromes and are most dangerous during take-off, initial climb and the approach. Know when the risk is highest and how to reduce it.",
    blocks: [
      {
        heading: "1. Risk & avoidance",
        points: [
          "The greatest risk is below 2000 ft near aerodromes, especially during take-off, initial climb, approach and landing, around dawn and dusk and during migration seasons.",
          "Avoidance: heed bird-activity NOTAMs and ATIS warnings, use landing lights and (where fitted) weather radar to make the aircraft conspicuous, and increase thrust/avoid unnecessary low flying over known bird areas.",
          "If a large flock is seen ahead, the safest action is usually to climb (birds tend to dive to escape), avoid rapid manoeuvres, and be prepared for an engine or windshield strike.",
          "Report every strike — a struck engine should be monitored and may require a precautionary shutdown; after landing an inspection is required before further flight.",
        ],
      },
    ],
    mustKnow: [
      "Highest risk: below 2000 ft near aerodromes, on take-off/climb and approach; dawn/dusk and migration.",
      "Reduce risk with landing lights, radar, and avoiding low flight over bird concentrations.",
      "Seeing a flock ahead — generally climb (birds dive to escape).",
      "Report all strikes; inspect before further flight.",
    ],
    traps: [
      "Birds generally escape by diving — climbing is usually the safer avoidance manoeuvre.",
    ],
  },
  {
    sectionId: "C.5.3",
    title: "Fire & Smoke",
    intro:
      "Fire in flight is time-critical. The exam tests the fire triangle, the correct extinguishing agent for each fire, and smoke/fume management.",
    blocks: [
      {
        heading: "1. Fire types & agents",
        points: [
          "Fire needs three elements (the fire triangle): fuel, oxygen and a source of heat/ignition — remove any one to extinguish it.",
          "Engine fire: close the throttle and fuel/LP cock, operate the engine fire extinguisher (usually a gaseous agent such as Halon/BCF), and follow the memory drill; land as soon as possible.",
          "Electrical fire: isolate the source (master/affected bus off); use a non-conductive agent (Halon/CO₂), never water. Cabin/cargo fire: Halon or water-glycol as appropriate; a cargo compartment relies on its built-in suppression and containment.",
          "Overheated brakes after a rejected take-off can ignite — approach from fore/aft (not the side where a wheel/tyre may burst) and allow them to cool.",
        ],
      },
      {
        heading: "2. Smoke & fumes",
        points: [
          "Smoke/fumes: don oxygen masks (100%) and smoke goggles, establish crew communication, and remove the source (electrical isolation) while ventilating per the checklist.",
          "A smoke-filled cockpit is an emergency — consider an immediate diversion/landing; carbon-monoxide from a cabin-heater exhaust leak is odourless and causes headache, drowsiness and impaired judgement.",
        ],
      },
    ],
    mustKnow: [
      "Fire triangle: fuel + oxygen + heat; remove one to extinguish.",
      "Electrical fire: isolate the source, use a non-conductive agent (Halon/CO₂) — never water.",
      "Engine fire: throttle/fuel/LP cock off, fire bottle, land ASAP.",
      "Smoke/fumes: oxygen 100% + goggles, isolate source, ventilate, consider immediate landing.",
    ],
    traps: [
      "Never use water on an electrical fire.",
      "Carbon monoxide is odourless — a heater-exhaust leak can incapacitate without warning.",
    ],
  },
  {
    sectionId: "C.5.4",
    title: "Windshear & Microburst",
    intro:
      "Windshear is a sudden change in wind speed/direction over a short distance. A microburst is the most dangerous form on approach and departure — recognition and the escape manoeuvre are examined.",
    blocks: [
      {
        heading: "1. Effects & recognition",
        points: [
          "Windshear changes the headwind/tailwind and therefore the indicated airspeed: an increasing headwind (or decreasing tailwind) raises IAS and the aircraft tends to balloon above the path; a decreasing headwind (or increasing tailwind) drops IAS and the aircraft sinks below the path.",
          "A microburst is a strong, localised downdraught (often from a thunderstorm or virga) that spreads out on hitting the ground. Flying through one, the aircraft first meets a performance-increasing headwind, then the downdraught, then a performance-decreasing tailwind — a dangerous sequence close to the ground.",
          "Clues: rapid airspeed fluctuations, a heavy rain shaft or virga, blowing dust/ring of dust on the surface, and large, rapid power/attitude changes needed to hold the path.",
        ],
      },
      {
        heading: "2. Avoidance & escape",
        points: [
          "Avoid: delay take-off/approach, or go around, if windshear or a microburst is reported or suspected; stay clear of thunderstorm cells by a wide margin.",
          "Escape manoeuvre (if encountered): apply maximum available thrust, pitch to the target (go-around) attitude, and follow the flight-director/windshear guidance — do NOT chase airspeed, and accept stick-shaker/intermittent warnings while maintaining a positive climb; retract flap/gear only when safely climbing.",
        ],
      },
    ],
    mustKnow: [
      "Increasing headwind → IAS up, balloon high; decreasing headwind/increasing tailwind → IAS down, sink.",
      "Microburst sequence on approach: headwind, then downdraught, then tailwind — very dangerous low down.",
      "Escape: max thrust, go-around attitude, follow guidance, don't chase airspeed, maintain climb.",
      "Avoid thunderstorm cells and reported windshear — delay or go around.",
    ],
    traps: [
      "In a microburst the initial airspeed INCREASE is a trap — reducing power then leaves you exposed to the following downdraught/tailwind.",
    ],
  },
  {
    sectionId: "C.5.5",
    title: "Wake Turbulence",
    intro:
      "Wake turbulence is the pair of counter-rotating wingtip vortices trailing any aircraft producing lift. It is strongest behind a heavy, clean, slow aircraft — exactly the configuration on take-off and landing.",
    blocks: [
      {
        heading: "1. Cause & behaviour",
        points: [
          "Vortices are generated from the moment of rotation until touchdown. They are strongest when the generating aircraft is HEAVY, CLEAN (no flap/gear) and SLOW — 'heavy, clean and slow'.",
          "The vortices sink at a few hundred feet per minute, level off about 900 ft below the generating aircraft's path, and drift with the wind. In a light crosswind one vortex can be held over the runway while the upwind one is carried away — a calm or light-wind day keeps them on the runway longest.",
        ],
      },
      {
        heading: "2. Separation & avoidance",
        points: [
          "On the same approach path behind a heavier aircraft, stay AT or ABOVE its flight path and land BEYOND its touchdown point. On departure behind a heavier aircraft, rotate BEFORE its rotation point and climb above its path, turning upwind of its track.",
          "ICAO wake-turbulence categories (Super/Heavy/Medium/Light) determine the time or distance separation ATC applies; a lighter aircraft following a heavier one needs the greatest separation.",
        ],
      },
    ],
    mustKnow: [
      "Vortices are strongest behind a HEAVY, CLEAN, SLOW aircraft.",
      "They sink ~900 ft below the path and drift downwind; light/calm wind keeps them on the runway.",
      "Landing behind a heavier aircraft: stay at/above its path, touch down beyond its touchdown point.",
      "Departing behind a heavier aircraft: rotate before its rotation point, climb above and upwind.",
    ],
    traps: [
      "Light and variable winds are the WORST for wake turbulence on a runway — the vortices neither disperse nor blow clear.",
    ],
  },
  {
    sectionId: "C.5.6",
    title: "Contaminated Runways & Hydroplaning",
    intro:
      "Water, slush, snow or ice on the runway reduce braking and directional control and lengthen the landing and accelerate-stop distances. Hydroplaning (aquaplaning) and its critical speed are commonly examined.",
    blocks: [
      {
        heading: "1. Contamination & its effect",
        points: [
          "A runway is 'contaminated' when more than a defined fraction (e.g. 25%) of the required area is covered by standing water, slush, snow or ice. Contamination reduces the available friction and so reduces braking and steering and increases the stopping distance.",
          "Slush and standing water also cause displacement (impingement) drag, which can reduce take-off acceleration and increase the take-off run; performance corrections from the AFM must be applied.",
        ],
      },
      {
        heading: "2. Hydroplaning (aquaplaning)",
        points: [
          "Dynamic hydroplaning occurs when a wheel rides up on a film of water and loses contact with the surface; braking and nosewheel steering become ineffective. Viscous hydroplaning occurs on a thin film over a smooth surface at lower speeds, and reverted-rubber hydroplaning from a locked-wheel skid that boils the water to steam.",
          "The approximate dynamic hydroplaning speed (knots) ≈ 9 × √(tyre pressure in psi) for a landing (rotating) wheel, or ≈ 7.7 × √(psi) for a non-rotating wheel. Higher tyre pressure raises the hydroplaning speed.",
          "Reduce the risk: land firmly in the touchdown zone, avoid locking the wheels, use available anti-skid, and do not rely on wheel braking alone — consider reverse thrust and aerodynamic braking.",
        ],
      },
    ],
    mustKnow: [
      "Contamination reduces friction → longer stopping distance and reduced directional control.",
      "Dynamic hydroplaning speed ≈ 9 × √(tyre pressure psi) for a rotating wheel.",
      "Higher tyre pressure → higher hydroplaning speed.",
      "Reverted-rubber hydroplaning comes from a locked-wheel skid (steam between tyre and runway).",
    ],
    traps: [
      "Once hydroplaning, wheel braking and nosewheel steering are largely INEFFECTIVE — don't rely on them.",
    ],
  },
  {
    sectionId: "C.5.7",
    title: "Controlled Flight Into Terrain (CFIT)",
    intro:
      "CFIT is an accident in which an airworthy aircraft, under the control of the crew, is unintentionally flown into terrain, water or an obstacle — usually with no prior awareness. It is a leading cause of fatal accidents.",
    blocks: [
      {
        heading: "1. Definition & avoidance",
        points: [
          "CFIT: an airworthy aircraft under positive control is flown unintentionally into the ground, water or an obstacle, with the crew generally unaware until too late. It is distinct from a loss-of-control accident.",
          "Contributing factors: loss of situational/vertical awareness, descending below minima, non-precision approaches, poor weather/visibility, mis-set altimeter, and complacency or fatigue.",
          "Avoidance: respect minimum safe/sector altitudes and the MDA/DA, fly a stabilised approach, cross-check altimeter settings, maintain terrain awareness (charts/GPS), and ALWAYS respond immediately to a GPWS/TAWS 'PULL UP' warning with a maximum-performance climb.",
        ],
      },
    ],
    mustKnow: [
      "CFIT = airworthy aircraft under control flown unintentionally into terrain/water/obstacle.",
      "Main defences: minimum safe altitudes, MDA/DA discipline, stabilised approach, TAWS.",
      "An immediate, maximum-performance climb is the correct response to a GPWS/TAWS 'PULL UP'.",
    ],
    traps: [
      "CFIT is NOT a loss of control — the aircraft is flyable and under command; the failure is awareness.",
      "Never delay or second-guess a genuine 'PULL UP' warning to diagnose it.",
    ],
  },
  {
    sectionId: "C.5.8",
    title: "The Stabilised Approach",
    intro:
      "A stabilised approach is the single biggest defence against approach-and-landing accidents (including CFIT and runway excursions). Know the criteria and the gate.",
    blocks: [
      {
        heading: "1. Requirements & advantages",
        points: [
          "By the stabilisation height (typically 1000 ft above aerodrome elevation in IMC, 500 ft in VMC) the aircraft should be: on the correct track and glidepath; in the landing configuration; at the target approach speed (within a small tolerance); with a stable, normal rate of descent (not excessive); with thrust stabilised; and the checklists complete.",
          "If the approach is not stabilised by the gate — or becomes unstable below it — the required response is a GO-AROUND. 'Ducking under' or trying to recover a destabilised approach close to the ground is a primary cause of landing accidents.",
          "Advantages: more time to monitor instruments and the runway environment, smaller corrections, consistent flare and touchdown in the touchdown zone, and a built-in defence against CFIT and runway overruns.",
        ],
      },
    ],
    mustKnow: [
      "Stabilised by ~1000 ft (IMC) / 500 ft (VMC): on path, in configuration, on speed, normal descent rate, thrust set, checklists done.",
      "Not stabilised by the gate (or unstable below it) → GO AROUND.",
      "A stabilised approach is the key defence against approach-and-landing accidents and CFIT.",
    ],
    traps: [
      "The correct action for an unstable approach is a go-around — not an attempt to salvage the landing.",
    ],
  },
];

export function getIRSpecProcNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return IR_SOP_NOTES.find((n) => n.sectionId === sectionId);
}
