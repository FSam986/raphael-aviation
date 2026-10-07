// IR All-Weather-Operations study notes for the flight-procedure / AIP-chart
// sections of C.3 (departure, en-route, arrival & approach, aerodromes & lights,
// general chart reading). Authored in-house from standard IR curriculum — the
// uploaded AVEX "All Weather Operations Part 2 & 3" books are collections of
// copyrighted SACAA AIP and Jeppesen charts, so nothing is reproduced from them;
// these notes teach how to read and fly the procedures those charts depict.
// Shape matches AirLawSectionNote so they merge with the CPL Air Law reuse.

import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

export const AWO_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "C.3.2",
    title: "General Flight Procedures & Instrument Chart Reading",
    intro:
      "Instrument flying is chart-driven. Every phase — departure, en-route, arrival, approach — has its own chart type built to a common design so the same symbols mean the same thing everywhere. This section is about reading those charts fluently: knowing where each piece of information lives and what the standard symbols represent.",
    blocks: [
      {
        heading: "1. The families of instrument charts",
        points: [
          "SID (Standard Instrument Departure): the published route from the runway to the en-route structure.",
          "STAR (Standard Terminal Arrival Route): the published route from the en-route structure to the initial approach point.",
          "IAC / IAP (Instrument Approach Chart/Procedure): the final descent and manoeuvre to land, or the missed approach.",
          "Enroute chart (area / low / high altitude): airways, navaids, reporting points and minimum altitudes between terminals.",
          "Aerodrome chart: the runway/taxiway layout, lighting, physical characteristics and declared distances.",
        ],
      },
      {
        heading: "2. How a plate is laid out",
        points: [
          "Heading block: aerodrome name, chart title (procedure & runway), category of aircraft (A–D) and the controlling frequencies (APP/TWR/ATIS/GND).",
          "Plan view: the horizontal picture — tracks, navaids, holding, terrain/obstacles, MSA circle and the transition altitude/level box.",
          "Profile view: the vertical picture — the descent path, altitudes/heights at each fix, the glide-path angle and the MAPt.",
          "Minima box: OCA/OCH (and derived DA/MDA) by aircraft category, plus the rate-of-descent / groundspeed table.",
          "Notes & communication-failure block: procedure-specific restrictions and what to do if radio contact is lost.",
        ],
      },
      {
        heading: "3. Standard symbol categories",
        points: [
          "Navaids: VOR (compass-rose symbol), VOR/DME or VORTAC (rose with the DME/TACAN marker), NDB (dot-ring), locator, ILS (feather/localiser splay with the glide-slope wedge in profile), marker beacons (OM/MM/IM).",
          "Airspace & boundaries: CTR/TMA/CTA outlines, danger/restricted/prohibited areas, special rules areas.",
          "Fixes & holding: intersections, DME fixes, the racetrack hold symbol with inbound track and timing.",
          "Terrain & obstacles: spot heights, the highest obstacle, and the MSA circle giving 25 NM minimum sector altitudes.",
          "Every navaid box shows its name, frequency/channel, ident (in Morse) and coordinates — always confirm the ident before using a navaid.",
        ],
      },
      {
        heading: "4. Bearings, distances and datums",
        points: [
          "Bearings are magnetic and tracks are °M unless a plate states otherwise; distances are in NM, heights/altitudes in feet, elevations related to the runway threshold or aerodrome.",
          "Radials (QDR) run outbound FROM a VOR; QDM is the magnetic track TO the station.",
          "Watch the effective date and any 'CHANGE' note in the margin — charts are amended regularly and an out-of-date plate is a trap.",
        ],
      },
    ],
    mustKnow: [
      "The four data areas of any approach plate: heading block, plan view, profile view, minima box.",
      "MSA is a 25 NM minimum sector altitude giving 1000 ft obstacle clearance — it is not a descent altitude for the approach.",
      "All tracks/bearings on SA plates are magnetic unless the chart says true; distances are NM.",
      "Always identify a navaid by its Morse ident before relying on it.",
    ],
    traps: [
      "Reading a radial (FROM) as a track TO the station — check the QDM/QDR sense.",
      "Using an amended/expired chart — confirm the effective date and revision note.",
      "Confusing MSA (25 NM, whole sector) with the procedure's minimum altitudes at each fix.",
    ],
  },
  {
    sectionId: "C.3.4",
    title: "Departure Procedures (SIDs)",
    intro:
      "A Standard Instrument Departure gets an aircraft from the runway into the en-route structure while guaranteeing obstacle clearance, provided the published minimum climb gradient is met. The SID chart is read as a set of instructions: fly this track, cross this fix at/above this altitude, then join your flight-planned route.",
    blocks: [
      {
        heading: "1. Straight vs turning departures",
        points: [
          "Straight departure: the initial departure track stays within 15° of the extended runway centre line.",
          "Turning departure: any departure requiring a turn of more than 15°; a turn is not normally specified until at least 120 m (394 ft) of obstacle clearance is assured, and turns above 500 ft AGL.",
          "Omnidirectional departure: used where no SID is published — it defines sectors to avoid (for obstacles) rather than a fixed track.",
        ],
      },
      {
        heading: "2. Minimum climb gradient (PDG)",
        points: [
          "The default Procedure Design Gradient gives obstacle clearance; if a SID needs more, the chart states the required percentage and the altitude to which it applies.",
          "Convert a gradient to a rate of climb: ROC (fpm) ≈ gradient(%) × groundspeed(kt) × 1.013 (≈ gradient % × GS × 6076/60/100). SID charts publish the fpm required at typical IAS values.",
          "If you cannot meet the published gradient, you cannot use the SID — request an alternative or an omnidirectional departure.",
        ],
      },
      {
        heading: "3. Reading the SID",
        points: [
          "The routing text spells out the sequence: initial runway track, the DME/turn points, the tracks/radials to intercept, and the SID termination point where you 'set course as per flight plan'.",
          "Speed/altitude constraints and the transition altitude are shown; climb is under radar control after the stated point.",
          "SIDs and STARs are only in force when announced on ATIS / when surveillance radar is in operation — otherwise notify ATC if unable to comply.",
        ],
      },
      {
        heading: "4. Communication-failure on a SID",
        points: [
          "Each SID carries its own comms-failure block (squawk 7600): typically comply with the SID, climbing to the last assigned level or the SID level, then continue as per flight plan.",
          "An aircraft wishing to return continues to the SID termination point and climbs to the last assigned level (or MSA if that is higher), then follows the published return/STAR comms-failure routing.",
        ],
      },
    ],
    mustKnow: [
      "Straight departure = initial track within 15° of the runway centre line.",
      "A SID guarantees obstacle clearance only if the published minimum climb gradient is achieved.",
      "SIDs/STARs apply only when announced/when radar is operating; otherwise notify ATC.",
      "Comms failure on a SID: squawk 7600, comply with the SID to the last assigned/SID level, continue per flight plan.",
    ],
    traps: [
      "Accepting a SID you cannot climb-gradient-comply with.",
      "Forgetting that the 15° test is measured against the extended runway centre line, not the assigned heading.",
      "Turning before the minimum obstacle-clearance height when no early turn is authorised.",
    ],
  },
  {
    sectionId: "C.3.5",
    title: "En-route Charts & Minimum Altitudes",
    intro:
      "The en-route (area / low / high) chart links the SID and the STAR. It shows the airway structure, navaids, reporting points and — critically — the minimum altitudes that keep the aircraft clear of terrain and within navaid coverage.",
    blocks: [
      {
        heading: "1. Airway & route information",
        points: [
          "Each airway segment shows its designator, magnetic track, segment distance and the navaids/fixes that define it.",
          "Reporting points are compulsory (solid triangle) or on-request (open triangle); position reports are made at compulsory points when not under radar.",
          "Changeover points on a VOR airway mark where you retune from the behind station to the ahead station.",
        ],
      },
      {
        heading: "2. The minimum-altitude family",
        points: [
          "MEA (Minimum En-route Altitude): lowest altitude giving obstacle clearance AND navaid signal AND communications along a segment.",
          "MOCA (Minimum Obstruction Clearance Altitude): obstacle clearance only, with navaid coverage guaranteed only within 22 NM of the station.",
          "MORA / Grid MORA: minimum off-route altitude giving obstacle clearance within a stated distance of the route or within a grid square.",
          "MSA: 25 NM minimum sector altitude around a navaid/aerodrome for the approach environment.",
          "MRA (Minimum Reception Altitude): lowest altitude at which an intersection can be determined; MAA: maximum authorised altitude for a segment.",
        ],
      },
      {
        heading: "3. Using the chart in the descent",
        points: [
          "As you leave the en-route structure onto a STAR, respect the STAR's speed and altitude constraints and cross the transition to QNH before descending below the transition level.",
          "Hold as published where required; entry (direct / parallel / offset) is chosen from the inbound track relative to the holding pattern, with a ±5° zone of flexibility.",
        ],
      },
    ],
    mustKnow: [
      "MEA = obstacle clearance + navaid signal + comms; MOCA = obstacle clearance, navaid only within 22 NM.",
      "MORA/Grid MORA is the off-route obstacle-clearance altitude.",
      "Compulsory reporting points require a position report when not under radar.",
    ],
    traps: [
      "Descending to MOCA and expecting full-airway navaid coverage beyond 22 NM.",
      "Confusing MSA (approach, 25 NM) with the en-route MEA/MORA figures.",
    ],
  },
  {
    sectionId: "C.3.6",
    title: "Arrival & Approach Procedures",
    intro:
      "The STAR delivers the aircraft to the approach; the instrument approach procedure (IAP) then takes it, in a series of defined segments, from the initial approach fix down to a point from which a landing can be completed visually — or to the missed-approach point.",
    blocks: [
      {
        heading: "1. Approach segments",
        points: [
          "Arrival → Initial (IAF) → Intermediate (IF) → Final (FAF/FAP) → Missed approach (MAPt). Each segment has its own obstacle-clearance and descent-gradient design.",
          "The initial approach positions and descends the aircraft toward the intermediate; the intermediate aligns and slows it; the final provides descent for landing.",
          "A straight-in approach is acceptable when the final approach track is within 30° of the runway centre line; otherwise it is a circling (visual manoeuvring) approach.",
        ],
      },
      {
        heading: "2. Precision vs non-precision",
        points: [
          "Precision (ILS/GLS/PAR): lateral AND vertical guidance; flown to a Decision Altitude/Height (DA/DH). CAT I (DH ≥ 200 ft, RVR ≥ 550 m), CAT II (DH 100–200 ft), CAT III (DH below 100 ft or none).",
          "Non-precision (VOR, NDB, LOC, RNAV/LNAV): lateral guidance only; flown to a Minimum Descent Altitude/Height (MDA/MDH) — you must not descend below MDA without the required visual reference.",
          "APV (e.g. Baro-VNAV, LNAV/VNAV): approach with vertical guidance that is not full precision; flown to a DA.",
          "CDFA (Continuous Descent Final Approach): flying the non-precision final as a continuous descent from the FAF to ~50 ft over the threshold rather than a dive-and-drive.",
        ],
      },
      {
        heading: "3. Minima — OCA/OCH, DA/MDA",
        points: [
          "OCA/OCH (Obstacle Clearance Altitude/Height) is the lowest altitude/height above threshold (or aerodrome) elevation that still meets obstacle-clearance criteria; it is the base figure.",
          "Add an operational margin to OCH: on a precision approach the result is the Decision Height (DH); on a non-precision approach it is the Minimum Descent Height (MDH). Referenced to a datum they become DA / MDA.",
          "Minima are tabulated by aircraft category A–D (based on threshold speed) — read the row for your category.",
          "The profile shows the glide-path angle (3° standard) and the rate of descent needed for each groundspeed.",
        ],
      },
      {
        heading: "4. Missed approach & circling",
        points: [
          "The missed approach begins at the MAPt (or at the DA/DH on a precision approach) and has initial, intermediate and final phases; fly the published track and climb.",
          "If the glide path fails during an ILS, go around or, if practicable, continue as a localiser (non-precision) approach to the higher LOC minima.",
          "Circling: a visual manoeuvre to position for a runway not suited to a straight-in landing — remain within the circling area and at/above circling OCH until in position to land; where a prominent obstacle exists, a sector may be prohibited for circling.",
        ],
      },
    ],
    mustKnow: [
      "The approach segments: arrival, initial, intermediate, final, missed approach.",
      "Precision → DA/DH (vertical guidance); non-precision → MDA/MDH (no vertical guidance).",
      "OCH + operational margin = DH (precision) or MDH (non-precision); read minima by category A–D.",
      "Straight-in allowed when the final track is within 30° of the runway centre line.",
      "CAT I minima: DH ≥ 200 ft, RVR ≥ 550 m.",
    ],
    traps: [
      "Descending below MDA on a non-precision approach without the required visual reference.",
      "Reading the wrong category row in the minima box.",
      "Treating a glide-path failure as a reason to keep flying the ILS minima instead of reverting to LOC minima or going around.",
    ],
  },
  {
    sectionId: "C.3.7",
    title: "Aerodromes, Lighting & Declared Distances",
    intro:
      "The aerodrome chart and its lighting/physical-characteristics tables describe the landing environment: what the runway offers (declared distances, strength, slope) and what visual aids guide the approach and landing in low visibility.",
    blocks: [
      {
        heading: "1. Declared distances",
        points: [
          "TORA (Take-off Run Available): length of runway available for the ground run.",
          "TODA (Take-off Distance Available): TORA + clearway (if provided).",
          "ASDA (Accelerate-Stop Distance Available): TORA + stopway (if provided).",
          "LDA (Landing Distance Available): runway length available for landing.",
          "Clearway: a defined area beyond the runway, ≥ 150 m wide, under the aerodrome authority's control, over which the initial climb may be made; stopway: a defined area beyond TORA able to support an aborted take-off.",
        ],
      },
      {
        heading: "2. Approach lighting systems",
        points: [
          "Simple approach lighting: a centre-line row of lights (≥ 420 m where possible) with a crossbar — used for non-precision runways.",
          "Precision approach CAT I: a 900 m centre-line row with a crossbar 300 m from the threshold; centre-line and crossbar lights are variable-intensity white. CAT II/III systems are 900 m with added red barrettes/side rows.",
          "PAPI (Precision Approach Path Indicator): a wing-bar of four units left of the runway — two white/two red = on slope; all white = high; all red = low; three white/one red = slightly high, one white/three red = slightly low.",
        ],
      },
      {
        heading: "3. Runway & other lighting",
        points: [
          "Runway threshold and wing-bar lights are fixed green (seen on approach); runway end lights are fixed red.",
          "Runway edge lights are white (yellow in the last portion on some runways); a displaced threshold shows red toward the approach between the runway start and the threshold.",
          "Aeronautical ground lights may be switched off only if restorable at least one hour before an aircraft's expected arrival; an aerodrome beacon is provided where the aerodrome is used at night.",
        ],
      },
      {
        heading: "4. Physical characteristics & ground signals",
        points: [
          "PCN (Pavement Classification Number) vs ACN (Aircraft Classification Number) governs whether an aircraft may use a pavement.",
          "Runway slope, surface (ASPH/etc.) and bearing strength are tabulated per runway direction.",
          "Ground signal square: e.g. a two-figure sign on the tower = magnetic heading of the runway in use; a white dumbbell/other markings convey manoeuvring-area status.",
        ],
      },
    ],
    mustKnow: [
      "TODA = TORA + clearway; ASDA = TORA + stopway.",
      "Clearway minimum width 150 m; must be under the aerodrome authority's control.",
      "CAT I approach lighting = 900 m centre-line row, crossbar 300 m from threshold, variable-intensity white.",
      "PAPI on slope = two white / two red; threshold/wing-bar lights green, runway end lights red.",
      "Aeronautical ground lights: switch-off only if restorable ≥ 1 hour before expected arrival.",
    ],
    traps: [
      "Swapping TODA (clearway) and ASDA (stopway).",
      "Reading a PAPI all-white as 'on slope' — all white is high, all red is low.",
      "Assuming a clearway must be a paved, load-bearing surface (it need not be).",
    ],
  },
];

export function getAWONoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return AWO_NOTES.find((n) => n.sectionId === sectionId);
}
