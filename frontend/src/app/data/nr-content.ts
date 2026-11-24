// ============================================================================
// Night Rating (NR1–NR4) — study notes, questions and flashcards.
// Scope: SACAA Night Rating syllabus 1.1(a)–(d). Teaching prose authored
// in-house; regulation wording comes from the SA CARs (shown via `regs`).
// Each section also pulls the matching full CPL study blocks (NR_PICK) and the
// night-relevant questions already in the CPL / PPL / IR banks, so the rating
// is as deep as the other courses without duplicating text. "§ " = sub-heading.
// ============================================================================

import type { AirLawSectionNote, AirLawNoteBlock } from "./airlaw-notes";
import type { AirLawQuestion } from "./airlaw-questions";
import type { AirLawFlashcard } from "./airlaw-flashcards";
import { pickPplNote } from "./ppl-pick";
import { getQuestionsBySection as metQ } from "./met-questions";
import { getHumanPerformanceQuestionsBySection as hpQ } from "./human-performance-questions";
import { getAirLawQuestionsBySection as lawQ } from "./airlaw-questions";
import { getPPLAirLawQuestionsBySection as pplLawQ } from "./ppl-airlaw-questions";

type NrNote = { title: string; intro: string; blocks: AirLawNoteBlock[]; mustKnow: string[]; traps: string[]; pick?: string[] };

const NR_FULL: Record<string, NrNote> = {
  // ─────────────────────────────── (a) AIR LAW ───────────────────────────────
  NR1: {
    title: "Air Law (Night)",
    intro:
      "Night flying is legal, routine and safe — but only inside a tighter set of rules than day flying. The law defines exactly when 'night' starts, what the rating lets you do, what the aircraft must carry and display, how VFR changes once the sun is down, and which aerodromes you may use. Every rule here exists because at night you lose the natural horizon, most ground features and much of your margin for error.",
    blocks: [
      {
        heading: "Definition of night",
        points: [
          "CAR Part 1 defines night as the period from 15 minutes after sunset to 15 minutes before sunrise, sunset and sunrise being as published by the South African Astronomical Observatory (or a similar publication approved by the Director).",
          "So 'night' starts a fixed 15 minutes after the published sunset for your place and date — not when it 'looks dark'. A flight landing 20 minutes after sunset is a night landing in law, even with a bright western sky.",
          "Sunset/sunrise vary with latitude, longitude and season. On a flight planned close to sunset, look up the times for the destination (not only the departure point) and note the 'night' time on the log: an eastbound flight meets darkness earlier.",
          "The same definition drives the night lighting rules, night recency, night equipment and the night VFR limits that follow.",
        ],
      },
      {
        heading: "Privileges and limitations of the night rating",
        points: [
          "A night rating is endorsed on the pilot licence (CAR 61.01: a 'night rating' is one of the ratings that may be issued). Without it a PPL holder may fly as pilot-in-command by day only.",
          "Privilege: to act as pilot-in-command of an aeroplane by night, in the category/class the licence covers, under VFR (visual reference to identifiable objects).",
          "Limitation: the night rating is NOT an instrument rating. It does not permit flight in IMC or under IFR. If the weather deteriorates and the lights on the ground disappear, the night-rated pilot must turn back or divert while still visual.",
          "The training for the rating includes instrument flying (attitude flying by sole reference) precisely so that the pilot can keep control if visual references are briefly lost — it is an escape skill, not a privilege to continue.",
          "A CPL(A) holder must hold a valid night rating (CAR 61.05.1(h)); for the CPL the experience requirements include night flying as PIC with night take-offs and landings and a night cross-country.",
          "Carrying passengers at night also needs night recency (see PIC responsibilities).",
          "§ Note",
          "The detailed training hours and the skills test for issue of the rating are in CAR 61.14 and SA-CATS 61. Check the current text with your ATO; exam questions test the privilege (night, VFR, PIC) and the limitation (no IMC) most often.",
        ],
        regs: ["61.05.1"],
      },
      {
        heading: "The pilot-in-command's responsibilities at night",
        points: [
          "The PIC is responsible for the safe operation of the aircraft and has final authority (CAR 91.01, 91.02). At night these duties carry more weight because the safety margins are smaller.",
          "§ Recency",
          "To carry passengers by night as PIC, the pilot must, within the preceding 90 days, have made at least three take-offs and three landings BY NIGHT in the same class (or type) of aeroplane (CAR 91.02.4(2)). Day landings do not count towards night recency.",
          "§ Pre-flight at night",
          "Obtain full weather: actual and forecast temperature/dew-point spread (fog risk), wind, cloud base, and any thunderstorm activity. Check NOTAMs for aerodrome lighting outages and pilot-operated lighting frequencies.",
          "Use a torch for the walk-round: check every external light works, look for frost or dew on the wings, and check the fuel visually. Know where the torch and spare batteries are before engine start.",
          "Plan routes over well-lit areas and along lit roads where possible, and set a personal minimum safe altitude that clears all terrain by the legal margin (see VFR differences).",
          "Plan alternates that are lit and open at night, and carry extra fuel for the higher chance of a diversion.",
          "§ In flight",
          "Keep cockpit lighting as dim as practicable, monitor engine and electrics (alternator failure at night means loss of all lights), and turn back early if weather or visibility starts to fall.",
        ],
        regs: ["91.02.4"],
      },
      {
        heading: "Equipment to be carried for night flying",
        points: [
          "In addition to the normal VFR instruments, an aeroplane operated by night must carry (CAR 91.04.3):",
          "• serviceable NAVIGATION lights;",
          "• two serviceable LANDING lights, or one landing-light housing with two separately energised filaments (so one failure still leaves a landing light);",
          "• a serviceable ROTATING BEACON or STROBE light (anti-collision light);",
          "• a serviceable electric TORCH for each required crew member, within reach from the seat.",
          "The aircraft's electrical system must give adequate illumination for all instruments and equipment essential for safe operation, and for any passenger compartment.",
          "For VFR by night there must also be a chart holder in an easily readable position which can be illuminated (CAR 91.04.4(f)).",
          "Practical point: everything on this list depends on the electrical system. An alternator failure at night is serious — load-shed early, keep the battery for the landing light and radio, and land at the nearest suitable lit aerodrome.",
        ],
        regs: ["91.04.3", "91.04.4"],
      },
      {
        heading: "Aircraft lighting — navigation and anti-collision lights",
        points: [
          "CAR 91.06.10 requires every aircraft to show anti-collision lights in flight by day and AT ALL TIMES at night, and navigation lights while operating at night. With engines running on the movement area it must show a rotating beacon.",
          "Aircraft moving on the movement area at night must show navigation lights; aircraft parked on the movement area at night must show lights marking their extremities unless otherwise adequately lit.",
          "No other light may be shown if it could be mistaken for the navigation lights.",
          "The pilot may switch off or dim flashing lights (strobes, beacon) if they impair the crew's duties or dazzle an outside observer — for example strobes in cloud or haze, or strobes on the apron facing other aircraft.",
          "§ The navigation-light pattern",
          "RED on the LEFT wing tip and GREEN on the RIGHT wing tip, each showing from dead ahead through 110° to its own side. A WHITE tail light shows rearward through 140° (70° either side of dead astern).",
          "Reading another aircraft's lights: red and green together = it is coming head-on; only red = it is crossing from right to left in front of you and you see its left side; only green = you see its right side (it is crossing left to right); only white = you are behind it.",
          "Right of way: an aircraft that has another on its right gives way. If you see a RED light steady on a constant bearing on your right, you see that aircraft's left side — it has you on its left, so you have it on your right: you must give way. 'Red to red' (each sees the other's red) means passing left side to left side, safely.",
          "A light that stays on a constant relative bearing and grows brighter is a collision risk.",
        ],
        figureTopics: ["Navigation & Anti-Collision Lights"],
        regs: ["91.06.10"],
      },
      {
        heading: "VFR at night — differences from day flying",
        points: [
          "VFR by night is flown with visual reference to IDENTIFIABLE OBJECTS (by day the rule is visual reference to the surface) and, as by day, never above more than 3/8 cloud within 5 NM (CAR 91.06.21). The VMC visibility and cloud-distance minima for the airspace still apply.",
          "§ Minimum height",
          "Except for take-off and landing, an aircraft at night (or in IMC or under IFR) must be flown at least 1 000 ft above the highest terrain or obstacle within 5 NM where that terrain does not exceed 5 000 ft AMSL, or at least 2 000 ft above it where the terrain exceeds 5 000 ft AMSL (CAR 91.06.32(3)). Much of the SA highveld is above 5 000 ft, so the 2 000 ft rule often applies.",
          "§ Special VFR",
          "Special VFR for aeroplanes is permitted BY DAY ONLY (CAR 91.06.22). A night-rated pilot cannot request Special VFR at night.",
          "§ Practical differences",
          "Cloud is hard to see at night: the first sign is often that ground lights become fuzzy or disappear. Treat that as the signal to turn back.",
          "Navigation is by lit towns, roads and aerodrome beacons; unlit terrain is invisible, so plan safe altitudes from the chart, not from what you can see.",
          "Distances and heights are harder to judge, illusions are stronger and fatigue is greater (see Human Performance).",
        ],
        regs: ["91.06.21", "91.06.22", "91.06.32"],
      },
      {
        heading: "Aerodrome requirements for night flying",
        points: [
          "Except in an emergency, no pilot may take off or land by night unless the place of take-off or landing is equipped with night-flying facilities (CAR 91.07.3(2)).",
          "For night operations at least runway EDGE, THRESHOLD and runway END lights must be on (CAR 91.07.5(5)).",
          "Before planning to use an aerodrome at night, confirm in the AIP / aerodrome directory that it is lit, the lighting hours, any pilot-operated lighting procedure, and NOTAMs for lights out of service.",
          "Choose alternates the same way: an unlit farm strip is not an alternate at night, however close it is.",
          "Wind sock lighting, the aerodrome beacon and obstacle lighting help you find and approach the field; approach-slope lights (PAPI/VASI) are the best defence against the black-hole illusion.",
        ],
        figureTopics: ["Runway Lighting (Night)"],
        regs: ["91.07.3"],
      },
    ],
    mustKnow: [
      "Night = 15 min after sunset to 15 min before sunrise (SA Astronomical Observatory times).",
      "Night rating = PIC by night under VFR only — NOT IMC/IFR.",
      "Passengers at night: 3 take-offs and 3 landings BY NIGHT in the previous 90 days, same class/type.",
      "Night equipment: nav lights, 2 landing lights (or 1 with 2 filaments), beacon/strobe, torch per crew member, lit chart holder.",
      "Nav lights: red LEFT, green RIGHT (110° each), white tail (140°).",
      "Anti-collision lights in flight by day and at all times at night; may be switched off if they dazzle or impair duties.",
      "Night VFR minimum height: 1 000 ft above obstacles within 5 NM (terrain ≤5 000 ft AMSL), 2 000 ft if terrain >5 000 ft.",
      "Special VFR (aeroplanes) is by day only.",
      "No night take-off or landing (except emergency) unless the aerodrome has night-flying facilities; at least edge, threshold and end lights on.",
    ],
    traps: [
      "'Night' does not start at sunset — it starts 15 minutes AFTER sunset.",
      "Day landings do not count towards night passenger recency.",
      "A night rating does not allow flight into cloud or IMC.",
      "Steady red light on your right = you must give way (you see its left side; it has right of way).",
      "Special VFR for aeroplanes is not available at night.",
    ],
  },

  // ───────────────────────────── (b) METEOROLOGY ─────────────────────────────
  NR2: {
    title: "Meteorology (Night)",
    intro:
      "After sunset the ground loses heat by radiation, the lowest air cools from below, and a surface inversion forms. Almost every night-weather hazard follows from that one change: fog and frost form, cold air drains downhill as katabatic wind, the surface wind dies and veers while a jet may blow just above, and over some areas thunderstorms build or keep going through the night. This section collects those effects; the full met theory follows from the CPL text.",
    blocks: [
      {
        heading: "Night cooling and the surface inversion",
        points: [
          "By day the sun heats the ground, which heats the air above it by conduction and convection. After sunset there is no incoming solar radiation, but the ground keeps radiating heat to space, so it cools — fastest under CLEAR skies, in DRY air and with LIGHT winds.",
          "The air in contact with the cold ground cools by conduction. Cold air is dense and stays at the bottom, so temperature now INCREASES with height for the first few hundred feet: a radiation (surface) INVERSION.",
          "Cloud cover acts like a blanket — it absorbs the ground's radiation and re-radiates it back, so cloudy nights stay warmer and fog/frost are less likely.",
          "Wind stirs the lowest layer, mixing the cold surface air with warmer air above, which spreads the cooling through a deeper layer and slows the drop in surface temperature.",
          "The coldest time is usually just after dawn, so fog and frost are often worst just after sunrise.",
        ],
      },
      {
        heading: "The formation of fog",
        points: [
          "Fog is a cloud on the ground: suspended water droplets reducing visibility below 1 000 m. It forms when air is cooled to its DEW POINT (or moisture is added until it is saturated) and there are condensation nuclei (dust, smoke, salt).",
          "The warning sign is a small and decreasing temperature/dew-point spread. In the evening, if the spread is 2–3°C and the sky is clear with light wind, expect fog or low stratus by early morning.",
          "Pollution and smoke around towns add nuclei, so fog and smog are often thicker there.",
          "Visibility can drop from good to near zero in minutes as fog forms, and fog often forms first in low ground, valleys and near rivers or dams. At night you may not see it until the lights you are using for navigation fade.",
          "§ Dispersal",
          "Fog clears when the air is warmed (sunshine after sunrise, or warm advection), dried, or mixed by a stronger wind. Radiation fog usually lifts into low stratus and burns off during the morning; over the sea, advection fog can persist for days.",
        ],
        figureTopics: ["Radiation Fog and Advection Fog"],
      },
      {
        heading: "Types of fog",
        points: [
          "§ Radiation fog",
          "Forms over LAND on clear nights with light wind (about 2–8 kt) and moist air, as the ground cools the air to its dew point. Calm air gives only dew or a shallow ground fog; too much wind lifts it into low stratus. It does not form over the sea (the sea temperature hardly changes overnight). Most common in autumn and winter (long nights) and in valleys.",
          "§ Advection fog",
          "Forms when warm moist air moves over a COLDER surface and is cooled from below. It can form by day or night and persists in stronger winds (up to about 15 kt or more). In South Africa it is typical of the West Coast, where moist sea air crosses the cold Benguela current and drifts inland at night.",
          "§ Upslope (orographic) fog",
          "Moist air forced up rising ground cools adiabatically to saturation — e.g. moist easterly air pushed up the escarpment.",
          "§ Steam (sea-smoke) fog",
          "Very cold air moving over much warmer water: evaporation saturates the cold air immediately above the water.",
          "§ Frontal fog",
          "Rain falling from warm air above a front evaporates into the colder air below, saturating it — mainly ahead of a warm front.",
          "§ Valley fog",
          "Katabatic drainage collects cold air in valleys overnight, where it cools to the dew point. Aerodromes in valleys can be fogged in while the surrounding high ground is clear.",
        ],
        figureTopics: ["Fog Types"],
      },
      {
        heading: "Katabatic winds",
        points: [
          "On clear nights the slopes of hills and mountains cool by radiation; the air touching them becomes colder and denser than the air at the same level away from the slope, so it flows DOWNHILL under gravity. That downslope wind is a katabatic wind (from the Greek for 'going down').",
          "The opposite daytime upslope flow, caused by heated slopes, is the anabatic wind.",
          "Katabatic winds are strongest with clear skies, light gradient wind and long nights, over snow or bare slopes, and where valleys channel the flow. They are usually light (a few knots) but can be much stronger in steep terrain.",
          "Effects for the night pilot: the cold air pools in valleys, forming FROST HOLLOWS and VALLEY FOG; an aerodrome at the foot of a slope may have a local surface wind blowing down the valley, different from the forecast gradient wind; and there can be shear and turbulence where the katabatic flow meets the air above.",
        ],
        figureTopics: ["Katabatic and Anabatic Winds"],
      },
      {
        heading: "Mixing, veering and backing of the wind at night",
        points: [
          "Friction slows the surface wind. In the SOUTHERN hemisphere this makes the surface wind blow at an angle across the isobars towards low pressure, VEERED (clockwise) from the gradient wind above (about 2 000 ft) and lighter.",
          "§ By day",
          "Surface heating causes convection and turbulence, which MIX the faster gradient-level air down to the surface. The surface wind therefore increases, becomes gusty, and BACKS towards the gradient direction (SH).",
          "§ At night",
          "The surface inversion stops the mixing. The surface layer is cut off from the upper flow, so the surface wind DECREASES (often to calm) and VEERS further away from the gradient direction (SH).",
          "Just above the inversion the wind may be stronger than by day — the nocturnal LOW-LEVEL JET — so climbing or descending through the inversion at night can give marked wind shear.",
          "§ Remember the hemisphere",
          "In the NORTHERN hemisphere the turning is the other way (surface wind backed from the gradient; at night it backs further and decreases). SACAA questions use the southern hemisphere unless stated.",
        ],
        figureTopics: ["Surface Friction — Surface Wind Veers and Slows (SH)"],
      },
      {
        heading: "Formation of ice and frost",
        points: [
          "§ Hoar frost",
          "On a clear night, a surface (the wing, the windscreen, the ground) may cool below 0°C. If the dew point is below 0°C, water vapour turns directly into ice crystals on it (deposition) — white, feathery HOAR FROST. If the dew point is above 0°C, dew forms first and may then freeze as rime-like 'white frost' or clear ice.",
          "Frost on wings and tail spoils the airflow, increasing stall speed and drag and lengthening the take-off run. All frost must be removed from the lifting and control surfaces before flight; never 'blow it off' with the take-off run.",
          "Frost can also form in flight when an aircraft cold-soaked at altitude descends rapidly into warm moist air — the windscreen may frost over on a night descent.",
          "§ Airframe icing at night",
          "Airframe ice forms when the aircraft flies through supercooled water droplets (cloud or rain below 0°C). The night-VFR pilot must stay out of cloud, but beware freezing rain/drizzle below cloud and patches of cloud that are hard to see at night.",
          "§ Carburettor icing",
          "Damp night air with a high relative humidity, at temperatures from about −10°C to +30°C, gives a serious risk of carburettor icing, especially at low power on descent. Use carburettor heat as the POH requires.",
        ],
        figureTopics: ["Airframe Ice Types and Temperatures"],
      },
      {
        heading: "Nocturnal thunderstorms",
        points: [
          "Most air-mass thunderstorms are driven by daytime heating and die out after sunset. NOCTURNAL thunderstorms are ones that form or keep going at night.",
          "Causes: cloud-top radiative cooling at night steepens the lapse rate in the cloud layer and increases instability; a moist low-level jet feeds warm humid air into storms overnight; large storm systems (squall lines and clusters) built during the afternoon keep themselves going into the night; over the sea and large lakes the relatively warm water heats the air from below at night.",
          "In southern Africa, storms over the interior plateau often continue into the late evening and night in summer.",
          "Hazards are the same as by day — severe turbulence, hail, lightning, icing, microburst wind shear and heavy rain — but at night the cloud is invisible until lightning shows it. A bright, continuous lightning display means an active storm; keep at least 10–20 NM clear and never try to fly under or between storms.",
          "Lightning at night can cause temporary flash-blindness; turn the cockpit lights up to full and look inside when flying near storms.",
        ],
        figureTopics: ["Thunderstorm Life Cycle"],
      },
    ],
    pick: ["A.8.15#Fog types", "A.8.8#Gradient wind, surface|Local winds", "A.8.13#Types", "A.8.12#Classification|Hazards"],
    mustKnow: [
      "Night cooling → surface (radiation) inversion; clear sky + light wind + moist air = fog/frost.",
      "Small and decreasing temp/dew-point spread in the evening = fog warning.",
      "Radiation fog: over land, clear night, light wind 2–8 kt; burns off in the morning; not over sea.",
      "Advection fog: warm moist air over a colder surface; any time; persists in stronger wind (SA West Coast).",
      "Katabatic = cold air draining DOWN slopes at night → valley fog, frost hollows.",
      "SH: by day surface wind increases and BACKS; at night it decreases and VEERS (NH opposite). Low-level jet above the inversion.",
      "Hoar frost: deposition on a surface below 0°C with dew point below 0°C. Remove all frost before flight.",
      "Nocturnal Cbs are hidden by darkness — lightning is the only warning; avoid by 10–20 NM.",
    ],
    traps: [
      "Calm wind gives dew or shallow ground fog, not thick radiation fog; strong wind gives low stratus.",
      "Radiation fog doesn't form over the sea — sea fog is advection fog.",
      "Hemisphere: in SA the night surface wind VEERS, it doesn't back.",
      "Fog is often thickest just AFTER sunrise, not at midnight.",
    ],
  },

  // ────────────────────────── (c) HUMAN PERFORMANCE ──────────────────────────
  NR3: {
    title: "Human Performance (Night)",
    intro:
      "The eye works very differently at night, and the brain — deprived of a horizon and ground detail — is easily fooled. This section explains how night vision works and how to protect it, the illusions that cause night approach accidents, and why hypoxia, vertigo and autokinesis matter more in the dark.",
    blocks: [
      {
        heading: "How the eye sees at night — rods and cones",
        points: [
          "The retina has two kinds of light receptor. CONES are concentrated in the centre (the fovea); they see colour and fine detail but need good light. RODS are spread around the periphery; they are far more sensitive to dim light but see no colour and little detail.",
          "In bright light we use cones (photopic vision); at night we use rods (scotopic vision).",
          "§ The night blind spot",
          "The fovea contains almost no rods, so in the dark the CENTRE of your vision is blind: an object looked at directly can disappear. To see a dim object at night, look about 10–15° to one side of it (OFF-CENTRE viewing) and keep the eyes moving slowly, because rods also stop responding to an image that stays still on the retina.",
          "Rods are not sensitive to deep red light, and they detect movement better than detail — a moving light is easier to spot than a stationary one.",
          "Colours fade at night: a red-printed chart feature may vanish under red light, and white/grey become hard to tell apart.",
        ],
        figureTopics: ["Night Vision — Rods, Cones & Dark Adaptation"],
      },
      {
        heading: "Dark adaptation and the preservation of night vision",
        points: [
          "Dark adaptation is the eye regaining full sensitivity in the dark as the rods' pigment (rhodopsin, 'visual purple') rebuilds. The cones adapt in about 5–10 minutes; the rods take about 30 minutes to reach full sensitivity.",
          "A single exposure to bright white light (a torch in the eyes, apron floodlights, a lightning flash, a landing light reflected from cloud) bleaches the rods in seconds and the 30-minute process starts again.",
          "§ Protecting night vision",
          "Avoid bright lights for about 30 minutes before flight; if you must use one, close one eye to protect its adaptation.",
          "Keep cockpit lighting as LOW as possible while still reading the instruments; use dim white or red lighting. Red light protects rod adaptation but hides red markings on charts, so many pilots prefer very dim white light.",
          "Wear good sunglasses during a bright day before a night flight — long exposure to bright sun slows dark adaptation for hours.",
          "§ Factors that reduce night vision",
          "HYPOXIA — night vision is impaired at cabin altitudes as low as about 5 000 ft; some operators use oxygen from the ground on night flights. SMOKING — carbon monoxide binds to haemoglobin and gives the smoker the night vision of someone several thousand feet higher. ALCOHOL, FATIGUE, low blood sugar, and lack of vitamin A all reduce night vision. Dirty or scratched windscreens scatter light and add glare.",
          "§ Night scanning",
          "Scan in short steps of about 10° with brief stops (about 1–2 seconds) at each, using off-centre viewing, and look for movement. A light that stays fixed in the windscreen while growing larger is on a collision course.",
        ],
        figureTopics: ["Structure of the eye", "Visual acuity falls away from the fovea", "The empty-field / blind-spot scan"],
      },
      {
        heading: "Visual illusions at night",
        points: [
          "§ Black-hole approach",
          "On a dark night, approaching a lit runway over unlit ground or water with no lights between you and the runway, the brain sees only the runway lights and judges the approach as TOO HIGH. Pilots respond by descending — and fly a dangerously LOW, flat approach that can hit terrain short of the runway. Defence: fly the published approach slope using the PAPI/VASI (or ILS), cross-check altimeter and distance (300 ft per NM for a 3° slope), and never descend below the slope indicator's on-slope signal.",
          "§ Runway width and slope",
          "A narrower-than-usual runway looks farther away → feels high → pilot flies low. An upsloping runway looks steeper → feels high → flies low. A wider runway or downslope gives the opposite (feel low, fly high).",
          "§ Bright lights and atmosphere",
          "Bright runway lights make the runway seem CLOSER (and you may feel too high); dim lights or haze make it seem farther away. Rain on the windscreen can make you feel higher than you are.",
          "§ False horizon",
          "Sloping cloud tops, a sloping line of ground lights, or stars merging with ground lights can create a false horizon; the pilot unconsciously banks to line up with it. Over a dark sea or desert, ground lights (ships, farms) can be mistaken for stars and the aircraft may be flown into a steep bank or descent.",
          "§ Featureless terrain",
          "Flying over dark, featureless ground gives no visual height cues, so pilots usually judge themselves higher than they are.",
          "§ Somatogravic illusion on a dark take-off",
          "Strong forward acceleration on a dark night take-off feels like nose-up pitch. With no visible horizon the pilot may push forward and fly into the ground. Fly the attitude indicator and confirm a positive climb.",
          "The universal defence is to trust and cross-check the flight instruments whenever the outside picture is poor.",
        ],
        figureTopics: ["False horizon (sloping cloudbank)", "Sloping-runway illusions", "Approach angle & visual aiming point", "Somatogravic illusion (acceleration & G)"],
      },
      {
        heading: "Hypoxia at night",
        points: [
          "Hypoxia is a lack of oxygen in the body tissues. As altitude increases the partial pressure of oxygen falls, so less oxygen enters the blood even though the air is still about 21% oxygen.",
          "The first function to suffer is NIGHT VISION: the retina's rods are extremely oxygen-hungry, and night vision begins to deteriorate at about 5 000 ft cabin altitude, well before any other symptom is noticed.",
          "Other symptoms come on gradually and the pilot is usually unaware of them: euphoria, poor judgement, slow thinking, poor co-ordination, headache, tingling, blue lips and fingernails (cyanosis), and finally unconsciousness.",
          "Many SA aerodromes are already 5 000–6 000 ft AMSL; at night the safe altitude for terrain clearance can be 8 000–10 000 ft. So a night-rated pilot in SA may be flying in the altitude band where night vision is already reduced.",
          "Smoking, alcohol, anaemia, fatigue and cold all lower the tolerance to altitude.",
          "Treatment: descend and/or use supplemental oxygen. Recovery is quick once oxygen is restored.",
        ],
      },
      {
        heading: "Vertigo and spatial disorientation at night",
        points: [
          "Our sense of balance comes from the eyes, the vestibular organs of the inner ear (semicircular canals for rotation, otoliths for linear acceleration and gravity) and pressure sensors in the skin, muscles and joints. By day the eyes dominate; at night, with no horizon, the inner ear takes over — and it is easily fooled.",
          "'Vertigo' in aviation usually means spatial disorientation: not knowing your attitude, height or motion relative to the earth.",
          "§ The leans",
          "A slow roll into a bank goes unnoticed (below the canals' threshold). When the pilot rolls level briskly, the canals report a roll the other way, and the pilot feels banked and leans or rolls back into the original bank.",
          "§ Graveyard spiral",
          "In a prolonged turn the canal fluid catches up and the turn no longer feels like a turn. On rolling level the pilot feels a turn the opposite way and re-enters the original turn; the nose drops, height is lost, and pulling back only tightens the spiral.",
          "§ Coriolis illusion",
          "Moving the head (e.g. looking down to change a frequency or pick up a chart) during a prolonged turn stimulates two canals at once and produces an overwhelming tumbling sensation. Keep head movements slow and minimal at night, especially in turns.",
          "§ Defence",
          "Believe the instruments, not the body. Keep up basic instrument-flying skill, avoid flying into cloud or poor visibility, and transfer to instruments immediately if the outside picture becomes unreliable.",
        ],
        figureTopics: ["Semicircular-canal disorientation (the leans)", "The vestibular apparatus"],
      },
      {
        heading: "Autokinesis",
        points: [
          "AUTOKINESIS is the apparent movement of a STATIONARY light when it is stared at against a dark background for more than a few seconds (typically 6–12 seconds). Because there are no other references, small involuntary eye movements make the light seem to wander.",
          "A pilot fixating on a single star or ground light may believe it is another aircraft and manoeuvre to avoid it, or may unconsciously follow it and lose control — or a lone runway light may seem to move during a final approach.",
          "Prevention: do not stare at a single light. Keep the eyes moving with a normal scan, shift your gaze frequently, compare the light with fixed references (a window frame or strut), and cross-check the instruments.",
        ],
      },
    ],
    pick: ["A.6.1#Night vision|Optical illusions|Partial pressure|Time of useful|Equilibrium|Integration"],
    mustKnow: [
      "Cones = centre, colour, detail, daylight. Rods = periphery, dim light, no colour, movement.",
      "Night blind spot at the fovea → use off-centre viewing (10–15° to one side) and keep scanning.",
      "Dark adaptation ≈ 30 min (rods); destroyed in seconds by bright light.",
      "Keep cockpit lights dim; red light protects adaptation but hides red chart markings.",
      "Night vision degrades from ≈5 000 ft cabin altitude (hypoxia); smoking (CO) makes it worse.",
      "Black-hole approach → feels high → flies LOW. Use PAPI/VASI and 300 ft/NM.",
      "Narrow / upsloping runway → feels high → flies low.",
      "Autokinesis: a fixed light stared at for 6–12 s appears to move — keep scanning.",
      "Leans, graveyard spiral, Coriolis: trust the instruments; minimise head movement in turns.",
    ],
    traps: [
      "Looking straight at a dim light at night can make it disappear — that's the foveal blind spot, not the light going out.",
      "Black-hole approach is LOW, not high.",
      "Red cockpit lighting is not 'best for everything' — red chart detail disappears under it.",
      "Hypoxia affects night vision long before you feel any other symptom.",
    ],
  },

  // ─────────────────────────── (d) LIGHTING SYSTEMS ──────────────────────────
  NR4: {
    title: "Lighting Systems",
    intro:
      "At night the aerodrome, the runway and the obstacles around them are known only by their lights. Each kind of lighting has a standard colour and pattern (ICAO Annex 14, applied in SA through Part 139 and the AIP), so a pilot who knows the code can read the aerodrome like a map. This section covers the lights on the aircraft, in the cockpit and on the ground, where to find what an aerodrome has, and how to switch on pilot-operated lighting.",
    blocks: [
      {
        heading: "External aircraft lighting",
        points: [
          "NAVIGATION lights — red left wing tip, green right wing tip (each 110° from dead ahead), white tail light (140° rearwards). They show other pilots your relative direction of travel.",
          "ANTI-COLLISION lights — a red rotating/flashing BEACON (usually on the fin or fuselage) and/or white STROBES (usually on the wing tips). Their job is to attract attention. The beacon is switched on just before engine start as a warning to ground staff, and stays on while the engine runs.",
          "Strobes are normally switched on when entering the runway and off after vacating; they may be switched off in cloud, haze or near other aircraft on the ground because they dazzle (CAR 91.06.10(4)).",
          "LANDING light(s) — forward and downward illumination for take-off and landing. At night two lights (or one twin-filament light) are required. Use them also in the circuit and near aerodromes to be seen.",
          "TAXI light — a wider, dimmer beam for taxiing; avoid shining it into the eyes of other pilots.",
          "Other lights: wing-inspection (ice) lights, logo lights, and on larger aircraft runway turn-off lights.",
        ],
        figureTopics: ["Navigation & Anti-Collision Lights"],
      },
      {
        heading: "Internal cockpit lighting",
        points: [
          "Cockpit lighting must give adequate illumination for all instruments and equipment used by the crew (CAR 91.04.3(2)).",
          "Typical systems: internally lit (post-lit or panel-lit) instruments controlled by a dimmer (rheostat); a flood (dome / glareshield) light; a map light; electroluminescent switch panels; and the required crew torch.",
          "Set the lighting to the MINIMUM that lets you read every instrument — bright cockpit light ruins dark adaptation and causes reflections in the windscreen that hide outside lights.",
          "Turn the lights up to full when flying near thunderstorms to reduce flash-blindness from lightning.",
          "Red lighting preserves dark adaptation but distorts colour (red markings on charts and red instrument arcs are hard to see). Dim white light is more versatile.",
          "Carry a torch with a red filter or red/white switch, plus spare batteries, in case the panel lighting fails.",
        ],
      },
      {
        heading: "Taxiway lighting",
        points: [
          "Taxiway EDGE lights are BLUE (omnidirectional).",
          "Taxiway CENTRELINE lights are GREEN. On a taxiway leaving a runway (and within an ILS sensitive area) the centreline lights alternate GREEN and YELLOW, telling you when you have cleared the runway / sensitive area.",
          "Runway-holding position: STOP BARS are a row of RED lights across the taxiway — never cross a lit stop bar. Runway guard lights ('wig-wags') are pairs of flashing YELLOW lights warning that a runway lies ahead.",
          "Many small aerodromes have no taxiway lights; then you taxi slowly using the taxi light and blue edge reflectors, and the apron floodlights.",
        ],
        figureTopics: ["Aerodrome Night Lighting"],
      },
      {
        heading: "Runway lighting",
        points: [
          "Runway EDGE lights: WHITE, along both sides. On an instrument runway the last 600 m (or last third, if less) of the edge lights show YELLOW (caution zone).",
          "THRESHOLD lights: GREEN, across the runway start, seen by the approaching aircraft. Wing-bars of green lights may extend beyond the edges. A displaced threshold has its own green bar.",
          "Runway END lights: RED, across the far end, seen when looking along the runway towards it.",
          "Runway CENTRELINE lights (on larger/precision runways): WHITE from the threshold until 900 m from the end, then alternating RED and WHITE until 300 m from the end, then all RED for the final 300 m.",
          "TOUCHDOWN ZONE lights: rows of WHITE barrettes either side of the centreline for the first 900 m (precision runways).",
          "Intensity is usually variable; ask ATC to change it if the lights are too bright (dazzle) or too dim.",
          "For night operations at least runway edge, threshold and end lights must be on (CAR 91.07.5).",
        ],
        figureTopics: ["Runway Lighting (Night)"],
      },
      {
        heading: "Approach lighting systems and approach-slope indicators",
        points: [
          "Approach lighting extends the runway centreline out into the approach to help the pilot line up and judge the transition to the runway.",
          "SIMPLE approach lighting: a row of lights on the extended centreline for about 420 m, with a crossbar at 300 m from the threshold.",
          "PRECISION (CAT I) approach lighting: a centreline of lights (or barrettes) about 900 m long, with a crossbar 300 m from the threshold. CAT II/III systems add side-row barrettes in the inner 300 m.",
          "§ PAPI",
          "Precision Approach Path Indicator: a row of four lights beside the runway (usually left). On the slope (normally 3°): 2 WHITE + 2 RED. Slightly high: 3 white + 1 red. Too high: 4 white. Slightly low: 1 white + 3 red. Too low: 4 red.",
          "§ VASI / APAPI",
          "Older VASI uses two bars: white over white = high, red over white = on slope, red over red = low ('red over white, you're all right'). An abbreviated PAPI (APAPI) has two lights: one white + one red = on slope.",
          "Approach-slope lights give vertical guidance and are the main defence against the black-hole illusion. Do not descend below the slope until the runway is assured.",
        ],
        figureTopics: ["Approach Lighting & PAPI", "PAPI — approach slope indications", "VASI — approach slope indications"],
      },
      {
        heading: "Obstruction lighting",
        points: [
          "Obstacles that penetrate the approach/take-off surfaces or are tall enough to be a hazard (masts, towers, chimneys, cranes, buildings) are lit.",
          "LOW-intensity obstacle lights: steady RED (smaller or less important obstacles).",
          "MEDIUM-intensity: flashing RED (or flashing white by day/night on some types).",
          "HIGH-intensity: flashing WHITE (very tall structures such as large masts), visible by day and night.",
          "Tall structures carry lights at the top and at intermediate levels. Wind turbines are lit with synchronised flashing red lights.",
          "Unserviceable obstacle lights are notified by NOTAM. Many obstacles are not lit at all — another reason for the night minimum-height rule.",
        ],
        figureTopics: ["Aerodrome Night Lighting"],
      },
      {
        heading: "Aerodrome beacons and identification beacons",
        points: [
          "An AERODROME BEACON helps the pilot find the aerodrome from a distance. For a land aerodrome it shows either flashes of WHITE only or alternating WHITE and GREEN (coloured flashes green for a land aerodrome, yellow for a water aerodrome).",
          "An IDENTIFICATION BEACON flashes the aerodrome's identification code in MORSE — GREEN at a land aerodrome (yellow at a water aerodrome) — where the aerodrome is hard to identify by other means.",
          "Aerodrome beacons are often switched on only during published hours or on request; check the AIP/AD entry.",
          "The lit WIND SOCK (or wind direction indicator) is also part of the visual aids at a night aerodrome.",
        ],
        figureTopics: ["Aerodrome Night Lighting"],
      },
      {
        heading: "Where to find information on lighting systems",
        points: [
          "The AIP, Part 3 Aerodromes (AD 2 entry for each aerodrome): approach and runway lighting, PAPI/VASI and slope angle, beacon, lighting hours, secondary power supply and any pilot-operated lighting procedure.",
          "Aerodrome directories / approach and aerodrome charts (e.g. Jeppesen airport charts) — lighting is shown in the runway data and chart symbols.",
          "NOTAMs — temporary changes, unserviceable lights and obstacle-light failures. Always check before a night flight.",
          "SA-CATS 91 (lights to be displayed by aircraft) and Part 139 / ICAO Annex 14 for the standards (colours and layouts).",
          "ATC/ATIS — current lighting status; ask the tower to change intensity.",
        ],
      },
      {
        heading: "Pilot-operated (pilot-activated) lighting",
        points: [
          "At many unmanned or after-hours aerodromes the runway lights are switched on by the pilot from the air by keying the VHF transmitter on a published frequency — 'pilot-controlled lighting' (PCL / ARCAL).",
          "The pilot presses the transmit switch a set number of times within a set period; the lights come on for a set time and can be re-triggered. Some systems select LOW / MEDIUM / HIGH intensity by the number of clicks (commonly 3, 5 and 7 clicks within 5 seconds).",
          "The exact frequency, number of clicks and 'on' time differ per aerodrome — use the procedure published in the AIP/AD entry or aerodrome chart.",
          "Activate the lights early enough to see them on the approach, and re-trigger before they time out — many systems give a warning (e.g. flashing) before switching off. Re-activate before take-off at night so the lights cannot time out during the take-off run.",
          "Lights that fail to come on mean no landing (unless an emergency): an aerodrome without its lights is not a night aerodrome.",
        ],
      },
    ],
    pick: ["A.3.18#Visual aids"],
    mustKnow: [
      "Taxiway edge BLUE, centreline GREEN (green/yellow leaving runway); stop bar RED.",
      "Runway edge WHITE (yellow last 600 m on instrument runways); threshold GREEN; end RED.",
      "Centreline: white → red/white from 900 m to go → all red last 300 m. TDZ white barrettes.",
      "CAT I approach lights ≈ 900 m with crossbar at 300 m; simple ≈ 420 m.",
      "PAPI on slope 2W/2R; 4W too high; 4R too low. VASI: red over white = on slope.",
      "Obstacles: low = steady red, medium = flashing red, high = flashing white.",
      "Aerodrome beacon: white, or alternating white/green (land). Identification beacon: Morse in green (land).",
      "Lighting info: AIP AD 2, aerodrome charts, NOTAMs, ATIS/ATC.",
      "PCL: key the mic N times within a set time on the published frequency; check the AD entry.",
    ],
    traps: [
      "Taxiway edge lights are BLUE, not green; green is the centreline.",
      "Runway edge lights turning YELLOW warn of the last 600 m — they don't mean the runway is closed.",
      "4 white PAPI = too HIGH (not on slope).",
      "PCL procedures are aerodrome-specific — don't assume the same click count everywhere.",
    ],
  },
};

export function getNRNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  const full = NR_FULL[sectionId];
  if (!full) return undefined;
  const cpl = full.pick ? pickPplNote(sectionId, full.title, full.pick) : undefined;
  return {
    sectionId,
    title: full.title,
    intro: full.intro,
    blocks: [...full.blocks, ...(cpl?.blocks ?? [])],
    mustKnow: [...full.mustKnow, ...(cpl?.mustKnow ?? [])],
    traps: [...full.traps, ...(cpl?.traps ?? [])],
  };
}

// ─────────────────────────────── QUESTIONS ───────────────────────────────
type Q = [string, string, string, string, string, string, "a" | "b" | "c" | "d", string, "easy" | "medium" | "hard"];
const q = (sectionId: string, rows: Q[]): AirLawQuestion[] =>
  rows.map(([id, question, optionA, optionB, optionC, optionD, correctAnswer, explanation, difficulty]) => ({
    id, sectionId, question, optionA, optionB, optionC, optionD, correctAnswer, explanation, difficulty,
  }));

const NR_AUTHORED: AirLawQuestion[] = [
  ...q("NR1", [
    ["NR1-01", "In South Africa, 'night' is defined as the period:", "From sunset to sunrise", "From 15 minutes after sunset to 15 minutes before sunrise", "From 30 minutes after sunset to 30 minutes before sunrise", "When the sun is more than 6° below the horizon", "b", "CAR Part 1: night is from 15 minutes after sunset to 15 minutes before sunrise, using SA Astronomical Observatory times.", "easy"],
    ["NR1-02", "Sunset at your destination is 17h40 local time. Your landing is a night landing in law if it is made after:", "17h40", "17h55", "18h10", "18h40", "b", "Night begins 15 minutes after sunset: 17h40 + 15 min = 17h55.", "medium"],
    ["NR1-03", "The holder of a PPL with a night rating may act as PIC at night:", "Under VFR only", "Under IFR in IMC", "Under VFR and, if needed, briefly in IMC", "Only with an instructor on board", "a", "The night rating gives night VFR privileges only; it is not an instrument rating.", "easy"],
    ["NR1-04", "To carry passengers at night as PIC you must, within the preceding 90 days, have completed:", "3 take-offs and 3 landings by day or night", "3 take-offs and 3 landings by night in the same class or type", "1 night flight of at least 1 hour", "5 night circuits with an instructor", "b", "CAR 91.02.4(2): three take-offs and three landings by night in the same class/type within 90 days.", "easy"],
    ["NR1-05", "Which item is NOT required by CAR 91.04.3 for an aeroplane operated at night?", "Navigation lights", "Two landing lights or one twin-filament landing light", "A rotating beacon or strobe", "A radio altimeter", "d", "Night equipment: nav lights, two landing lights (or one twin-filament housing), beacon or strobe and a torch per crew member. A radio altimeter is not required.", "easy"],
    ["NR1-06", "Each required crew member on a night flight must have:", "A spare set of spectacles", "A serviceable electric torch readily accessible from the seat", "An oxygen mask", "A portable VHF radio", "b", "CAR 91.04.3(1)(d): a serviceable torch for each required crew member, readily accessible from their station.", "easy"],
    ["NR1-07", "The arc of the left navigation light is:", "Red, 110° from dead ahead to the left", "Green, 110° from dead ahead to the left", "Red, 140° from dead astern", "White, 110° to the left", "a", "Left = red, covering 110° from dead ahead to the left; right = green 110°; tail white 140°.", "easy"],
    ["NR1-08", "At night you see a single steady red light on a constant bearing on your right, getting brighter. You should:", "Maintain heading — you have right of way", "Give way — the other aircraft is on your right", "Climb immediately", "Flash your landing light and continue", "b", "You see its left (red) side; it has you on its left, so you have it on your right and must give way. A constant bearing and increasing brightness means collision risk.", "hard"],
    ["NR1-09", "You see a steady white light ahead at the same level. You are most likely:", "Approaching another aircraft head-on", "Behind another aircraft", "Seeing an aircraft crossing from left to right", "Seeing an aerodrome beacon", "b", "The white tail light is visible only from behind (within 70° either side of dead astern).", "medium"],
    ["NR1-10", "You see both a red and a green light side by side, steady, at your level. The other aircraft is:", "Flying away from you", "Heading towards you", "Crossing left to right", "On the ground", "b", "Seeing red and green together means you are looking at the front of the aircraft: it is head-on. Both turn right.", "medium"],
    ["NR1-11", "Anti-collision lights must be displayed:", "Only at night", "In flight by day and at all times at night", "Only on the ground with engines running", "Only in controlled airspace", "b", "CAR 91.06.10(1)(a).", "easy"],
    ["NR1-12", "A pilot may switch off the strobe lights when:", "Never", "They are likely to dazzle an outside observer or impair crew duties", "Flying below 1 000 ft", "Ordered by passengers", "b", "CAR 91.06.10(4) allows flashing lights to be switched off or dimmed if they impair duties or dazzle.", "easy"],
    ["NR1-13", "At night, over terrain lower than 5 000 ft AMSL, a VFR aircraft (except for take-off/landing) must be flown at least:", "500 ft above the highest obstacle within 1 NM", "1 000 ft above the highest terrain or obstacle within 5 NM", "1 500 ft above the highest obstacle within 5 NM", "2 000 ft above the highest obstacle within 10 NM", "b", "CAR 91.06.32(3).", "medium"],
    ["NR1-14", "At night over terrain that exceeds 5 000 ft AMSL, the minimum height (unless reduced by the Director) is:", "1 000 ft above the highest obstacle within 5 NM", "2 000 ft above the highest terrain or obstacle within 5 NM", "1 500 ft above ground level", "500 ft above the terrain", "b", "CAR 91.06.32(3): 2 000 ft where terrain within 5 NM exceeds 5 000 ft AMSL.", "medium"],
    ["NR1-15", "Special VFR for an aeroplane is permitted:", "By day only", "By night only", "By day or night", "Only outside a control zone", "a", "CAR 91.06.22(1)(b): aeroplane Special VFR by day only.", "easy"],
    ["NR1-16", "VFR by night requires the aircraft to be flown with visual reference to:", "The natural horizon only", "Identifiable objects", "The surface at all times", "The instruments", "b", "CAR 91.06.21(1): visual reference to the surface by day and to identifiable objects by night.", "medium"],
    ["NR1-17", "Except in an emergency, a pilot may land by night only at a place that:", "Has an ATC tower", "Is equipped with night-flying facilities", "Has a runway longer than 1 000 m", "Has an ILS", "b", "CAR 91.07.3(2).", "easy"],
    ["NR1-18", "For night operations, which runway lights must at least be on?", "Edge, threshold and runway end lights", "Approach and centreline lights", "PAPI only", "Edge lights only", "a", "CAR 91.07.5(5).", "medium"],
    ["NR1-19", "A VFR aircraft operated at night must have a chart holder that is:", "Fitted to the yoke", "In an easily readable position and can be illuminated", "Fire-resistant", "Removable", "b", "CAR 91.04.4(f).", "easy"],
    ["NR1-20", "Aircraft moving on the movement area of an aerodrome at night must display:", "Landing lights only", "Navigation lights", "No lights", "Strobe lights only", "b", "CAR 91.06.10(2)(a).", "easy"],
  ]),
  ...q("NR2", [
    ["NR2-01", "The conditions most favourable for radiation fog are:", "Overcast sky, strong wind, dry air", "Clear sky, light wind, moist air, long night", "Clear sky, calm, very dry air", "Warm air over a cold sea", "b", "Radiation fog forms over land on clear nights with light wind (2–8 kt) and high humidity.", "easy"],
    ["NR2-02", "A calm wind on a clear, moist night is most likely to produce:", "Thick radiation fog", "Dew or shallow ground fog", "Low stratus", "Advection fog", "b", "With no wind there is no mixing, so only a very shallow layer cools: dew or shallow fog. Light wind deepens it; stronger wind gives stratus.", "medium"],
    ["NR2-03", "Advection fog forms when:", "The ground cools at night under clear skies", "Warm moist air moves over a colder surface", "Cold air moves over warm water", "Rain falls through cold air", "b", "Advection fog = warm moist air cooled from below by a colder surface. It can form by day or night.", "easy"],
    ["NR2-04", "Fog along the South African West Coast is mostly:", "Radiation fog", "Advection fog from moist air over the cold Benguela current", "Steam fog", "Frontal fog", "b", "Moist sea air crossing the cold Benguela current gives advection fog that drifts inland at night.", "medium"],
    ["NR2-05", "Radiation fog does not form over the sea because:", "The sea has no condensation nuclei", "The sea surface temperature hardly changes overnight", "The wind is always too strong", "The air over the sea is too dry", "b", "The sea's high specific heat means little diurnal cooling, so radiation fog forms over land.", "medium"],
    ["NR2-06", "In the evening the temperature is 12°C and the dew point 10°C under a clear sky with light winds. You should expect:", "Thunderstorms", "Fog or low stratus by morning", "Strong winds", "Clear conditions all night", "b", "A small temperature/dew-point spread with radiation cooling is the classic fog warning.", "easy"],
    ["NR2-07", "A katabatic wind is:", "A warm wind blowing up a slope by day", "Cold dense air flowing down a slope at night", "A sea breeze at night", "A wind associated with a cold front", "b", "Slopes cool at night; the cold dense air drains downhill as a katabatic wind.", "easy"],
    ["NR2-08", "Katabatic drainage is likely to cause at a valley aerodrome:", "Higher temperatures than the hills", "Frost hollows and valley fog", "Strong upslope winds", "Thunderstorms at dawn", "b", "Cold air collects in valleys, forming frost and fog.", "medium"],
    ["NR2-09", "In the southern hemisphere, at night, compared with the afternoon the surface wind normally:", "Increases and backs", "Decreases and veers", "Increases and veers", "Decreases and backs", "b", "At night the inversion stops mixing; the SH surface wind decreases and veers further from the gradient direction.", "hard"],
    ["NR2-10", "In the southern hemisphere, during the day, surface heating causes the surface wind to:", "Decrease and veer", "Increase and back", "Become calm", "Increase and veer", "b", "Daytime mixing brings the gradient wind down: surface wind increases, becomes gusty and backs (SH).", "hard"],
    ["NR2-11", "The night surface wind changes because:", "Coriolis force increases at night", "The surface inversion stops turbulent mixing with the faster air above", "The pressure gradient reverses", "Friction decreases at night", "b", "Without mixing the surface layer is decoupled from the gradient flow.", "medium"],
    ["NR2-12", "A low-level jet at night can cause:", "Fog to clear at once", "Marked wind shear when climbing or descending through the inversion", "Hoar frost on the wings", "Autokinesis", "b", "A strong wind just above a calm surface inversion gives a sharp change of wind with height.", "medium"],
    ["NR2-13", "Hoar frost forms when:", "Supercooled droplets freeze on impact", "Water vapour deposits directly as ice on a surface below 0°C with a dew point below 0°C", "Rain freezes on the ground", "Dew evaporates", "b", "Hoar frost is deposition: vapour → ice on a sub-zero surface.", "medium"],
    ["NR2-14", "Frost on the wings before a night or dawn take-off:", "Can be ignored if it is thin", "Must be removed — it increases stall speed and take-off distance", "Melts during the take-off run", "Only affects the propeller", "b", "Even thin frost roughens the surface, increasing drag and stall speed.", "easy"],
    ["NR2-15", "Nocturnal thunderstorms can form or persist at night mainly because:", "The ground heats up after sunset", "Cloud tops cool by radiation, increasing instability, and low-level moisture is still fed in", "The wind always strengthens at night", "Fronts only move at night", "b", "Cloud-top cooling steepens the lapse rate; a low-level jet and organised systems keep storms going.", "medium"],
    ["NR2-16", "The main extra danger of thunderstorms for a night VFR pilot is that:", "They are weaker at night", "The cloud cannot be seen except when lit by lightning", "They only produce rain at night", "They do not cause turbulence at night", "b", "Darkness hides the Cb; lightning is the only warning.", "easy"],
    ["NR2-17", "Radiation fog usually disperses:", "At midnight", "After sunrise as the ground warms or the wind increases", "When the wind drops to calm", "When the temperature falls", "b", "Heating or stronger wind mixes or evaporates the fog; it is often worst just after sunrise.", "easy"],
    ["NR2-18", "Upslope fog forms when:", "Moist air is forced up rising ground and cools adiabatically", "Cold air drains down a slope", "Warm air moves over cold water", "Rain evaporates below a front", "a", "Orographic lifting cools the air to saturation.", "medium"],
  ]),
  ...q("NR3", [
    ["NR3-01", "The receptors used mainly for night vision are the:", "Cones, at the fovea", "Rods, in the periphery of the retina", "Cones, in the periphery", "Lens and cornea", "b", "Rods are sensitive to low light, in the periphery, and see no colour.", "easy"],
    ["NR3-02", "To see a dim object at night you should:", "Look directly at it", "Look about 10–15° to one side of it", "Close one eye", "Stare at it without moving the eyes", "b", "The fovea has no rods; off-centre viewing puts the image on rod-rich retina.", "easy"],
    ["NR3-03", "Full dark adaptation of the rods takes about:", "1 minute", "5 minutes", "30 minutes", "2 hours", "c", "Rods take about 30 minutes to reach full sensitivity.", "easy"],
    ["NR3-04", "Dark adaptation can be lost:", "Only after several minutes of bright light", "Within seconds of exposure to bright white light", "Only by alcohol", "Never once fully achieved", "b", "A bright flash bleaches the rods' pigment almost instantly.", "easy"],
    ["NR3-05", "Red cockpit lighting:", "Has no drawbacks", "Protects dark adaptation but makes red markings on charts hard to see", "Destroys dark adaptation", "Improves colour vision", "b", "Rods are insensitive to red, but red chart detail disappears under red light.", "medium"],
    ["NR3-06", "Night vision begins to deteriorate due to hypoxia at a cabin altitude of about:", "1 000 ft", "5 000 ft", "10 000 ft", "18 000 ft", "b", "The rods are very oxygen-hungry; night vision is affected from about 5 000 ft.", "medium"],
    ["NR3-07", "A smoker's night vision is impaired mainly because:", "Nicotine dilates the pupils", "Carbon monoxide reduces the blood's oxygen carrying capacity", "Smoke dirties the windscreen", "Tar blocks the rods", "b", "CO binds to haemoglobin, giving the effect of a higher altitude.", "medium"],
    ["NR3-08", "On a dark night approaching a lit runway over unlit terrain (black-hole approach), the pilot tends to:", "Fly too high", "Fly too low", "Land long", "Over-bank", "b", "The pilot feels high and descends, flying a low, flat approach.", "medium"],
    ["NR3-09", "The best defence against the black-hole illusion is to:", "Use a steeper approach", "Fly the approach-slope indicator (PAPI/VASI) or a 3° profile by altitude and distance", "Keep the landing light off", "Look only at the runway lights", "b", "Use vertical guidance and cross-check 300 ft per NM.", "medium"],
    ["NR3-10", "A runway narrower than the pilot is used to will tend to make the pilot:", "Feel too low and fly high", "Feel too high and fly low", "Land short of the threshold with a steep approach", "Flare too late", "b", "A narrow runway looks farther away, so the pilot feels high and descends too low.", "medium"],
    ["NR3-11", "Very bright runway lights tend to make the runway appear:", "Farther away", "Closer than it is", "Wider", "Upsloping", "b", "Bright lights look closer; dim lights or haze look farther.", "medium"],
    ["NR3-12", "Autokinesis is:", "Apparent movement of a stationary light stared at in darkness", "Loss of colour vision at night", "Spinning sensation after a turn", "Seeing double", "a", "Staring at a fixed light for 6–12 s against a dark background makes it appear to move.", "easy"],
    ["NR3-13", "Autokinesis is best prevented by:", "Staring harder at the light", "Keeping the eyes moving and comparing the light with fixed references", "Turning the cockpit lights off", "Using oxygen", "b", "Scan normally and avoid fixating on a single light.", "easy"],
    ["NR3-14", "After a prolonged turn at night the pilot rolls level and feels a turn in the opposite direction. This can lead to:", "Autokinesis", "A graveyard spiral", "Black-hole illusion", "Hypoxia", "b", "Re-entering the original turn to cancel the false sensation leads to a descending spiral.", "medium"],
    ["NR3-15", "The Coriolis illusion is produced by:", "Staring at a single light", "Moving the head during a prolonged turn", "A narrow runway", "Strong acceleration on take-off", "b", "Head movement in a turn stimulates more than one semicircular canal, causing a tumbling sensation.", "medium"],
    ["NR3-16", "Strong acceleration during a dark-night take-off can give the false sensation of:", "Nose-down pitch", "Nose-up pitch", "A left bank", "A descent", "b", "The somatogravic illusion feels like pitch-up; the danger is pushing forward into the ground.", "hard"],
    ["NR3-17", "Ground lights mistaken for stars, or a sloping line of lights, can cause:", "A false horizon", "Autokinesis", "Hypoxia", "Flicker vertigo", "a", "The pilot may bank or pitch to align with a false horizon.", "easy"],
    ["NR3-18", "The cones of the eye are:", "Responsible for colour and detail, concentrated at the fovea", "Most sensitive in dim light", "Spread evenly over the retina", "Not affected by light level", "a", "Cones need good light and give colour and fine detail.", "easy"],
  ]),
  ...q("NR4", [
    ["NR4-01", "Taxiway edge lights are:", "Green", "Blue", "White", "Yellow", "b", "Taxiway edge = blue; taxiway centreline = green.", "easy"],
    ["NR4-02", "Taxiway centreline lights are:", "Blue", "Green", "White", "Red", "b", "Green centreline; alternating green/yellow where leaving the runway or in an ILS sensitive area.", "easy"],
    ["NR4-03", "Runway threshold lights are:", "Red", "White", "Green", "Yellow", "c", "Threshold = green (seen from the approach); end = red.", "easy"],
    ["NR4-04", "Runway end lights, seen when looking along the runway, are:", "Green", "Red", "White", "Blue", "b", "Runway end lights show red towards the runway.", "easy"],
    ["NR4-05", "On an instrument runway, runway edge lights in the last 600 m are:", "Red", "Yellow", "Blue", "Green", "b", "Yellow edge lights mark the caution zone (last 600 m or last third).", "medium"],
    ["NR4-06", "Runway centreline lights that alternate red and white indicate:", "The first 900 m of the runway", "Between 900 m and 300 m from the runway end", "The last 300 m", "The touchdown zone", "b", "White → red/white from 900 m to go → all red in the last 300 m.", "medium"],
    ["NR4-07", "A PAPI showing four white lights means the aircraft is:", "On the approach slope", "Slightly low", "Too high", "Too low", "c", "Four white = too high; two white/two red = on slope; four red = too low.", "easy"],
    ["NR4-08", "A PAPI showing one white and three red lights means:", "Slightly high", "On slope", "Slightly low", "Too high", "c", "1W/3R = slightly low.", "medium"],
    ["NR4-09", "On a two-bar VASI, 'red over white' means:", "Too high", "On the approach slope", "Too low", "Runway closed", "b", "Red over white, you're all right.", "easy"],
    ["NR4-10", "A CAT I precision approach lighting system extends about:", "420 m with a crossbar at 150 m", "900 m with a crossbar at 300 m", "300 m with no crossbar", "1 500 m", "b", "Precision CAT I: about 900 m with a crossbar at 300 m from the threshold.", "medium"],
    ["NR4-11", "Low-intensity obstruction lights are:", "Flashing white", "Steady red", "Flashing green", "Steady blue", "b", "Low = steady red; medium = flashing red; high = flashing white.", "medium"],
    ["NR4-12", "A very tall mast is likely to be marked with:", "Steady blue lights", "High-intensity flashing white lights", "Green lights", "No lights", "b", "High-intensity obstacle lights are flashing white.", "medium"],
    ["NR4-13", "An aerodrome beacon at a land aerodrome shows:", "Flashing red", "White flashes, or alternating white and green", "Steady green", "Alternating white and yellow", "b", "Land aerodrome: white or white/green; water aerodrome: white/yellow.", "medium"],
    ["NR4-14", "An aerodrome identification beacon at a land aerodrome flashes:", "The identifier in Morse in green", "Alternating white and green", "The identifier in Morse in red", "Steady white", "a", "Identification beacon = Morse code identifier, green for land aerodromes.", "medium"],
    ["NR4-15", "The best source for the lighting available at an aerodrome and its pilot-operated lighting procedure is:", "The aircraft's POH", "The AIP aerodrome (AD) entry / aerodrome chart, plus NOTAMs", "The weather forecast", "The flight plan", "b", "AIP AD 2 and aerodrome charts give the facilities; NOTAMs give outages.", "easy"],
    ["NR4-16", "Pilot-controlled lighting is normally switched on by:", "Phoning the aerodrome", "Keying the VHF transmitter a set number of times on the published frequency", "Squawking 7000", "Flashing the landing light", "b", "Mic clicks on the published frequency activate the lights for a set time.", "easy"],
    ["NR4-17", "A row of red lights across a taxiway at a runway-holding position is a:", "Stop bar — do not cross while lit", "Runway end", "Threshold", "Obstacle", "a", "Stop bars are red; never cross a lit stop bar.", "easy"],
    ["NR4-18", "Before engine start at night you should switch on the:", "Landing lights", "Rotating beacon", "Strobes", "Taxi light", "b", "The beacon warns ground staff the engine is about to start/running.", "easy"],
    ["NR4-19", "Touchdown zone lights are:", "Green barrettes at the threshold", "White barrettes either side of the centreline in the first 900 m", "Red lights along the edge", "Blue lights on the taxiway", "b", "TDZ lights: white barrettes for the first 900 m of a precision runway.", "medium"],
    ["NR4-20", "Cockpit lighting at night should be set:", "As bright as possible", "To the minimum needed to read the instruments", "Off, using only a torch", "Red only", "b", "Low lighting preserves dark adaptation and reduces windscreen reflections.", "easy"],
  ]),
];

// Night-relevant questions already in the CPL / PPL banks (matched on the question text).
const POOL: [string, () => AirLawQuestion[], RegExp][] = [
  ["NR1", () => [...lawQ("A.3.1"), ...lawQ("A.3.4"), ...lawQ("A.3.6"), ...pplLawQ("5.3"), ...pplLawQ("5.5"), ...pplLawQ("5.7")], /\bnight\b|navigation light|anti-collision|landing light|rotating beacon|strobe/i],
  ["NR2", () => [...metQ("A.8.15"), ...metQ("A.8.8"), ...metQ("A.8.13"), ...metQ("A.8.12")] as unknown as AirLawQuestion[], /\bfog\b|katabatic|frost|nocturnal|\bat night\b|radiation/i],
  ["NR3", () => [...hpQ("A.6.1"), ...hpQ("A.6.3")] as unknown as AirLawQuestion[], /night|\brods?\b|\bcones?\b|dark adapt|illusion|hypoxi|vertigo|autokines|disorient|black.?hole|false horizon|leans|coriolis|somatogravic/i],
  ["NR4", () => lawQ("A.3.18"), /light|PAPI|VASI|beacon|obstacle|obstruction/i],
];

const cache = new Map<string, AirLawQuestion[]>();
export function getNRQuestionsBySection(sectionId: string): AirLawQuestion[] {
  const hit = cache.get(sectionId);
  if (hit) return hit;
  const own = NR_AUTHORED.filter((x) => x.sectionId === sectionId);
  const p = POOL.find(([s]) => s === sectionId);
  const seen = new Set(own.map((x) => x.id));
  const pooled = p ? p[1]().filter((x) => p[2].test(x.question) && !seen.has(x.id) && (seen.add(x.id), true)) : [];
  const out = [...own, ...pooled];
  cache.set(sectionId, out);
  return out;
}
export const NR_QUESTION_COUNT = () => ["NR1", "NR2", "NR3", "NR4"].reduce((n, s) => n + getNRQuestionsBySection(s).length, 0);

// ─────────────────────────────── FLASHCARDS ───────────────────────────────
type F = [string, string, string, "easy" | "medium" | "hard"];
const f = (sectionId: string, rows: F[]): AirLawFlashcard[] => rows.map(([id, front, back, difficulty]) => ({ id, sectionId, front, back, difficulty }));

const NR_FLASHCARDS: AirLawFlashcard[] = [
  ...f("NR1", [
    ["NFC-1-01", "Definition of night (SA)?", "15 min after sunset to 15 min before sunrise (SA Astronomical Observatory times).", "easy"],
    ["NFC-1-02", "Night rating privilege?", "PIC by night under VFR (visual reference to identifiable objects). Not IMC/IFR.", "easy"],
    ["NFC-1-03", "Night passenger recency?", "3 take-offs + 3 landings BY NIGHT in the last 90 days, same class/type (91.02.4).", "easy"],
    ["NFC-1-04", "Night equipment (91.04.3)?", "Nav lights; 2 landing lights or 1 twin-filament; beacon or strobe; torch per crew member; adequate instrument lighting.", "medium"],
    ["NFC-1-05", "Chart requirement for night VFR?", "Chart holder in an easily readable position that can be illuminated (91.04.4(f)).", "easy"],
    ["NFC-1-06", "Nav light colours & arcs?", "Red left 110°, green right 110°, white tail 140° (70° each side of astern).", "easy"],
    ["NFC-1-07", "Steady red light on a constant bearing on your right?", "You see its left side; it's on your right → YOU give way. Constant bearing = collision risk.", "hard"],
    ["NFC-1-08", "Red + green seen together?", "Head-on — both alter to the right.", "medium"],
    ["NFC-1-09", "When must anti-collision lights be on?", "In flight by day, and at all times at night. Beacon with engines running on the movement area.", "medium"],
    ["NFC-1-10", "When may strobes be switched off?", "If they impair crew duties or dazzle outside observers (e.g. in cloud/haze, on the apron).", "medium"],
    ["NFC-1-11", "Night minimum height (91.06.32(3))?", "1 000 ft above highest obstacle within 5 NM (terrain ≤5 000 ft AMSL); 2 000 ft if terrain >5 000 ft.", "medium"],
    ["NFC-1-12", "Special VFR at night (aeroplane)?", "Not allowed — aeroplane SVFR is by day only.", "easy"],
    ["NFC-1-13", "Night VFR visual reference?", "Identifiable objects (by day: the surface). Never above >3/8 cloud within 5 NM.", "medium"],
    ["NFC-1-14", "Aerodrome requirement for night take-off/landing?", "Night-flying facilities (91.07.3); at least edge, threshold and end lights on (91.07.5).", "medium"],
    ["NFC-1-15", "Alternator failure at night?", "Load-shed, keep battery for radio and landing light, land at the nearest suitable lit aerodrome.", "medium"],
    ["NFC-1-16", "Night rating & CPL?", "A CPL(A) holder must hold a valid night rating (61.05.1(h)).", "easy"],
  ]),
  ...f("NR2", [
    ["NFC-2-01", "Why does a surface inversion form at night?", "Ground radiates heat, cools, and cools the air touching it from below.", "easy"],
    ["NFC-2-02", "Radiation fog conditions?", "Over land; clear sky; light wind 2–8 kt; moist air; long night.", "easy"],
    ["NFC-2-03", "Calm vs light vs strong wind on a clear moist night?", "Calm → dew/shallow ground fog. Light → radiation fog. Strong → low stratus.", "medium"],
    ["NFC-2-04", "Advection fog?", "Warm moist air over a colder surface; day or night; persists in stronger wind (SA West Coast/Benguela).", "easy"],
    ["NFC-2-05", "Fog warning sign in the evening?", "Small and decreasing temperature/dew-point spread under clear skies, light wind.", "easy"],
    ["NFC-2-06", "Upslope fog?", "Moist air forced up rising ground, cools adiabatically to saturation.", "medium"],
    ["NFC-2-07", "Steam fog?", "Very cold air over much warmer water.", "medium"],
    ["NFC-2-08", "Frontal fog?", "Rain from warm air evaporates into colder air below — ahead of a warm front.", "medium"],
    ["NFC-2-09", "Katabatic wind?", "Cold dense air draining DOWN slopes at night (anabatic = up by day).", "easy"],
    ["NFC-2-10", "Katabatic effects on a valley aerodrome?", "Frost hollows, valley fog, local down-valley surface wind, shear.", "medium"],
    ["NFC-2-11", "SH surface wind: day vs night?", "Day: increases, gusty, BACKS. Night: decreases, VEERS (NH opposite).", "hard"],
    ["NFC-2-12", "Nocturnal low-level jet?", "Stronger wind just above the night inversion → wind shear on climb/descent.", "medium"],
    ["NFC-2-13", "Hoar frost?", "Deposition of vapour as ice on a surface below 0°C when the dew point is below 0°C.", "medium"],
    ["NFC-2-14", "Frost on wings?", "Remove all before flight — raises stall speed, drag and take-off distance.", "easy"],
    ["NFC-2-15", "Nocturnal thunderstorm causes?", "Cloud-top radiative cooling, low-level jet moisture, organised systems persisting, warm sea/lakes.", "medium"],
    ["NFC-2-16", "Night Cb avoidance?", "Only lightning reveals it — stay 10–20 NM clear; cockpit lights up full against flash-blindness.", "medium"],
    ["NFC-2-17", "When is radiation fog often thickest?", "Just after sunrise (coldest time); then lifts to stratus and burns off.", "medium"],
  ]),
  ...f("NR3", [
    ["NFC-3-01", "Rods vs cones?", "Cones: fovea, colour, detail, daylight. Rods: periphery, dim light, no colour, movement.", "easy"],
    ["NFC-3-02", "Night blind spot & cure?", "Fovea has no rods → look 10–15° off-centre and keep the eyes moving.", "easy"],
    ["NFC-3-03", "Dark adaptation time?", "Cones ≈5–10 min; rods ≈30 min. Lost in seconds to bright light.", "easy"],
    ["NFC-3-04", "Preserve night vision?", "Avoid bright light 30 min before; dim cockpit light; close one eye if a bright light is unavoidable; sunglasses by day.", "medium"],
    ["NFC-3-05", "Red cockpit light — pro & con?", "Protects rod adaptation; hides red chart markings.", "medium"],
    ["NFC-3-06", "Hypoxia & night vision?", "Night vision degrades from ≈5 000 ft cabin altitude — the first function affected.", "medium"],
    ["NFC-3-07", "Factors reducing night vision?", "Hypoxia, smoking (CO), alcohol, fatigue, low blood sugar, lack of vitamin A, dirty windscreen.", "medium"],
    ["NFC-3-08", "Night scan technique?", "Steps of ~10°, pause 1–2 s each, off-centre viewing, look for movement.", "medium"],
    ["NFC-3-09", "Black-hole approach?", "Lit runway over dark terrain → feel HIGH → fly LOW. Use PAPI/VASI, 300 ft/NM.", "medium"],
    ["NFC-3-10", "Narrow or upsloping runway?", "Feel high → fly low.", "medium"],
    ["NFC-3-11", "Bright vs dim runway lights?", "Bright = looks closer. Dim/haze = looks farther.", "medium"],
    ["NFC-3-12", "False horizon at night?", "Sloping cloud tops, lines of lights, ground lights vs stars → pilot banks to match.", "medium"],
    ["NFC-3-13", "Somatogravic illusion on dark take-off?", "Acceleration feels like pitch-up → danger of pushing forward into the ground. Fly the AI.", "hard"],
    ["NFC-3-14", "Autokinesis?", "Fixed light stared at 6–12 s in darkness appears to move. Keep scanning, use references.", "easy"],
    ["NFC-3-15", "The leans?", "Slow unnoticed roll, brisk recovery → feel banked the other way → lean back into bank.", "medium"],
    ["NFC-3-16", "Graveyard spiral?", "Prolonged turn feels level; rolling out feels like opposite turn → re-enter turn, nose drops, spiral.", "medium"],
    ["NFC-3-17", "Coriolis illusion?", "Head movement in a prolonged turn → tumbling sensation. Minimise head movement.", "medium"],
  ]),
  ...f("NR4", [
    ["NFC-4-01", "Taxiway lights?", "Edge BLUE; centreline GREEN (green/yellow leaving runway / ILS area).", "easy"],
    ["NFC-4-02", "Stop bar & runway guard lights?", "Stop bar = row of red — don't cross lit. Guard lights = flashing yellow pairs.", "medium"],
    ["NFC-4-03", "Runway edge lights?", "White; yellow in the last 600 m (or last third) on instrument runways.", "medium"],
    ["NFC-4-04", "Threshold / end lights?", "Threshold GREEN; runway end RED.", "easy"],
    ["NFC-4-05", "Runway centreline lights?", "White → red/white from 900 m to go → red in the last 300 m.", "medium"],
    ["NFC-4-06", "Touchdown zone lights?", "White barrettes either side of centreline, first 900 m (precision runways).", "medium"],
    ["NFC-4-07", "Approach lighting lengths?", "Simple ≈420 m; CAT I ≈900 m with crossbar at 300 m.", "medium"],
    ["NFC-4-08", "PAPI indications?", "4W too high · 3W1R slightly high · 2W2R on slope · 1W3R slightly low · 4R too low.", "easy"],
    ["NFC-4-09", "VASI?", "White/white high · red over white on slope · red/red low.", "easy"],
    ["NFC-4-10", "Obstruction lights?", "Low = steady red; medium = flashing red; high = flashing white.", "medium"],
    ["NFC-4-11", "Aerodrome beacon?", "Land: white flashes or alternating white/green. Water: white/yellow.", "medium"],
    ["NFC-4-12", "Identification beacon?", "Aerodrome identifier in Morse — green (land), yellow (water).", "medium"],
    ["NFC-4-13", "Where to find aerodrome lighting info?", "AIP AD 2 entry, aerodrome charts, NOTAMs, ATIS/ATC; standards in Annex 14/Part 139.", "easy"],
    ["NFC-4-14", "Pilot-controlled lighting?", "Key mic N times within a set time on published freq; lights on for a set time; check AD entry.", "medium"],
    ["NFC-4-15", "External aircraft lights?", "Nav, beacon (before start), strobes (on runway), landing, taxi.", "easy"],
    ["NFC-4-16", "Cockpit lighting setting?", "Minimum that lets you read all instruments; full bright near thunderstorms.", "easy"],
  ]),
];

export function getNRFlashcardsBySection(sectionId: string): AirLawFlashcard[] {
  return NR_FLASHCARDS.filter((x) => x.sectionId === sectionId);
}
