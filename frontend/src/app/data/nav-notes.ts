// CPL Navigation (A.9.x) study notes. Authored in-house from standard general-
// navigation theory (the uploaded question bank is the source of the exam scope;
// no textbook text is reproduced). Shape matches AirLawSectionNote so it plugs
// into the subject content registry.

import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

export const NAV_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "A.9.1",
    title: "The Earth — Shape, Position & Great Circles",
    intro:
      "Navigation starts with describing where you are on a rotating, slightly-flattened sphere. Get the reference system (latitude/longitude), the two kinds of line you can fly (great circle vs rhumb line) and convergency right, and the chart work later becomes routine.",
    blocks: [
      {
        heading: "1. Shape & reference",
        points: [
          "The earth is an oblate spheroid — flattened at the poles (compression ≈ 1/298); for most navigation it is treated as a sphere.",
          "Latitude: angular distance N/S of the equator (0–90°). Longitude: angular distance E/W of the Greenwich prime meridian (0–180°).",
          "1 minute of latitude = 1 NM (along a meridian). 1° = 60 NM. Longitude minutes are only 1 NM at the equator (they shrink by cos latitude).",
        ],
      },
      {
        heading: "2. Great circle vs rhumb line",
        points: [
          "Great circle: the shortest distance between two points; its plane passes through the earth's centre. It cuts each meridian at a different angle (except along a meridian or the equator).",
          "Rhumb line (loxodrome): a line of constant direction — cuts every meridian at the SAME angle. Longer than the great circle, but easy to steer.",
          "Meridians and the equator are both great circles AND rhumb lines. Parallels of latitude (except the equator) are rhumb lines only.",
        ],
      },
      {
        heading: "3. Convergency",
        points: [
          "Meridians converge toward the poles, so the great-circle track direction changes along the route. Convergency = ch.long × sin(mean latitude).",
          "The great circle lies on the POLAR side of the rhumb line; conversion angle = ½ convergency.",
          "In the N hemisphere the initial GC track is more to one side of the RL, reversing in the S hemisphere — always sketch it.",
        ],
      },
    ],
    mustKnow: [
      "1 minute of latitude = 1 NM; 1° = 60 NM.",
      "Great circle = shortest; rhumb line = constant direction (cuts meridians at equal angles).",
      "Convergency = ch.long × sin(mean lat); conversion angle = ½ convergency.",
      "Great circle lies on the pole-ward side of the rhumb line.",
    ],
    traps: [
      "Treating a longitude minute as 1 NM away from the equator — it is 1×cos(lat) NM.",
      "Forgetting the GC track direction changes along the route.",
      "Mixing convergency (full angle) with conversion angle (half).",
    ],
  },
  {
    sectionId: "A.9.2",
    title: "Direction — True, Magnetic & Compass; Radio Bearings",
    intro:
      "Every heading and track is quoted against a north reference. Keep the three norths and the variation/deviation conversions straight, and know the Q-code family of radio bearings.",
    blocks: [
      {
        heading: "1. The three norths",
        points: [
          "TRUE north (geographic), MAGNETIC north (the compass's undisturbed direction), COMPASS north (magnetic north deflected by the aircraft's own magnetism).",
          "VARIATION = angle between true and magnetic north (isogonals join equal variation; agonic = zero). DEVIATION = magnetic→compass error.",
          "Convert: True →(variation)→ Magnetic →(deviation)→ Compass. 'Variation/Deviation West → Best (add); East → least (subtract).'",
        ],
      },
      {
        heading: "2. Radio bearings (Q-codes)",
        points: [
          "QDM = magnetic bearing TO the station (the heading to home in nil wind). QDR = magnetic bearing FROM the station (= QDM ± 180).",
          "QTE = TRUE bearing FROM the station. QUJ = true bearing TO the station.",
          "To plot a VOR radial (magnetic) on a true chart, apply the variation AT THE STATION; for an ADF bearing use the variation AT THE AIRCRAFT.",
        ],
      },
    ],
    mustKnow: [
      "True →(var)→ Magnetic →(dev)→ Compass; West → Best (add), East → least.",
      "QDM = magnetic TO; QDR = magnetic FROM; QTE = true FROM; QUJ = true TO.",
      "VOR radial: apply variation at the STATION; ADF: variation at the AIRCRAFT.",
    ],
    traps: [
      "Adding easterly variation — easterly is subtracted going true→magnetic.",
      "Confusing QDM (to) with QDR (from).",
    ],
  },
  {
    sectionId: "A.9.3",
    title: "Distance & Units",
    intro:
      "A handful of unit relationships underpin every speed/time/fuel sum. Learn the conversions and the NM–latitude link cold.",
    blocks: [
      {
        heading: "1. Key units & conversions",
        points: [
          "1 NM = 1.852 km = 6076 ft ≈ 1.15 statute miles. 1 statute mile = 5280 ft = 1.609 km.",
          "1 NM = 1 minute of latitude (arc). Speed: knots = NM per hour.",
          "1 m = 3.28 ft; 1 inch = 2.54 cm; 1 imperial gallon = 4.55 L; 1 US gallon = 3.785 L.",
        ],
      },
    ],
    mustKnow: [
      "1 NM = 1.852 km = 6076 ft ≈ 1.15 st. miles = 1 minute of latitude.",
      "Knots = NM per hour; 1 m = 3.28 ft.",
    ],
    traps: [
      "Mixing NM and statute miles in a groundspeed sum.",
      "Using a longitude minute as a distance (only valid at the equator).",
    ],
  },
  {
    sectionId: "A.9.4",
    title: "The Solar System & Time",
    intro:
      "Time questions are pure conversion once you know the reference systems and the arc-to-time rule. The rest — twilight, seasons, the date line — hangs off the earth's tilt and rotation.",
    blocks: [
      {
        heading: "1. Time systems",
        points: [
          "UTC (≈ GMT) is the world reference. LMT = local mean time (varies with longitude). Zone/standard time = a whole-degree band offset from UTC.",
          "Arc to time: 360° = 24 h, so 15° = 1 h, 1° = 4 min, 15′ = 1 min. East is ahead of UTC, West is behind.",
          "The International Date Line (~180°) is where the date changes: crossing westbound add a day, eastbound subtract a day.",
        ],
      },
      {
        heading: "2. Seasons, twilight & sun",
        points: [
          "The 23.5° axial tilt gives the seasons; equinoxes (~21 Mar, 23 Sep) have equal day/night; solstices (~21 Jun, 21 Dec) the longest/shortest days.",
          "Tropics of Cancer (23.5°N) and Capricorn (23.5°S) mark the sun's overhead limits.",
          "Civil twilight = sun 6° below the horizon; days lengthen toward summer and toward the pole in that hemisphere's summer.",
        ],
      },
    ],
    mustKnow: [
      "15° = 1 hour, 1° = 4 minutes; East ahead, West behind UTC.",
      "Equinox = equal day/night; solstice = longest/shortest day; tilt 23.5°.",
      "Date line: westbound +1 day, eastbound −1 day.",
    ],
    traps: [
      "Reversing East/West when converting longitude to LMT.",
      "Forgetting to change the date when the sum crosses midnight or the date line.",
    ],
  },
  {
    sectionId: "A.9.5",
    title: "Charts — Projections, Mercator & Lambert",
    intro:
      "A chart trades one property for another. Know which projection preserves what, how great circles and rhumb lines look on each, and how scale behaves — that decides how you plot and measure.",
    blocks: [
      {
        heading: "1. Projection basics",
        points: [
          "Orthomorphic (conformal): bearings/shapes correct locally — required for navigation. Scale should be (nearly) constant.",
          "Cylindrical → Mercator; Conical → Lambert; Azimuthal → polar charts. Each is correct (scale exact) only at its point/line of tangency (or standard parallels).",
        ],
      },
      {
        heading: "2. Mercator (cylindrical, orthomorphic)",
        points: [
          "Rhumb lines are STRAIGHT lines; great circles are CURVES concave to the equator. Meridians and parallels are straight and perpendicular.",
          "Scale is correct only at the equator and expands with latitude (× sec lat) — measure distance against the latitude scale at the mid-latitude of the leg.",
          "Used for plotting constant-heading tracks; not for high latitudes (scale grows too fast).",
        ],
      },
      {
        heading: "3. Lambert's Conformal Conic",
        points: [
          "Great circles are ~straight lines; rhumb lines curve (concave to the parallel of origin). Meridians are straight lines converging to the pole; parallels are arcs.",
          "Scale is nearly constant (correct at the two standard parallels), so distance can be measured anywhere with the mid-scale.",
          "Convergency on the chart = ch.long × sin(parallel of origin) — the chart convergence factor 'n'. Ideal for radio navigation (GC bearings are straight).",
        ],
      },
    ],
    mustKnow: [
      "Mercator: rhumb line straight, great circle curved (concave to equator); scale expands with sec lat.",
      "Lambert: great circle ~straight, rhumb line curved; scale near-constant; meridians converge.",
      "Orthomorphic charts preserve bearings — required for navigation.",
    ],
    traps: [
      "Measuring Mercator distance with a single scale — use the mid-latitude scale.",
      "Assuming a great circle is straight on a Mercator (it curves).",
    ],
  },
  {
    sectionId: "A.9.6",
    title: "Relative Velocity",
    intro:
      "Closing/opening problems are just one-dimensional relative speed. Break them into 'speed of approach' and 'time = distance ÷ relative speed'.",
    blocks: [
      {
        heading: "1. Closing & opening",
        points: [
          "Same direction: relative speed = difference of groundspeeds (catching up). Opposite/converging: relative speed = sum of groundspeeds.",
          "Time to close = distance apart ÷ relative speed. Use it for separation, holding, and controlled time of arrival.",
        ],
      },
    ],
    mustKnow: [
      "Converging: relative speed = sum; same track: relative speed = difference.",
      "Time = distance ÷ relative speed.",
    ],
    traps: [
      "Adding speeds when the aircraft are on the same track (should subtract).",
    ],
  },
  {
    sectionId: "A.9.7",
    title: "Dead Reckoning — The Nav Computer & Triangle of Velocities",
    intro:
      "DR is heading + TAS + wind giving track + groundspeed, then time and fuel. The triangle of velocities is the whole subject in one diagram; the nav computer (CRP-5) does the arithmetic.",
    blocks: [
      {
        heading: "1. The triangle of velocities",
        points: [
          "Air vector: HEADING (°T) and TAS. Wind vector: the direction FROM which the wind blows and its speed. Ground vector: TRACK (°T) and GROUNDSPEED.",
          "Air vector + Wind vector = Ground vector. Drift = angle between heading and track; wind correction angle is applied INTO wind to make good the track.",
          "Head/tailwind changes groundspeed; crosswind causes drift.",
        ],
      },
      {
        heading: "2. Nav-computer routine",
        points: [
          "Speed/distance/time: set speed on the outer scale against the index; read distance vs time. GS × time = distance; distance ÷ GS = time.",
          "IAS→TAS (airspeed window): set pressure altitude against temperature, read TAS opposite CAS. Rule of thumb: TAS ≈ CAS + 2% per 1000 ft (roughly).",
          "Fuel: burn rate × time = fuel; always add the regulatory reserves and alternate.",
        ],
      },
    ],
    mustKnow: [
      "Air vector + wind vector = ground vector; drift = heading − track.",
      "Apply the wind correction angle INTO the wind to make good the track.",
      "GS × time = distance; fuel = flow × time (+ reserves).",
    ],
    traps: [
      "Using wind 'direction to' instead of 'direction from'.",
      "Forgetting to convert IAS→CAS→TAS before the groundspeed sum.",
    ],
  },
  {
    sectionId: "A.9.8",
    title: "Navigation Plotting & the 1-in-60 Rule",
    intro:
      "In flight you fix the aircraft, compare with the DR plan and correct. The 1-in-60 rule turns a measured track error into a heading correction in seconds.",
    blocks: [
      {
        heading: "1. The 1-in-60 rule",
        points: [
          "1° of track error ≈ 1 NM off track per 60 NM flown. Track error angle = (distance off track ÷ distance gone) × 60.",
          "Closing angle = (distance off track ÷ distance to go) × 60. Total heading correction to regain track at the destination = track error + closing angle.",
          "To parallel the required track, alter heading by the track error only.",
        ],
      },
      {
        heading: "2. Fixing & climb/descent nav",
        points: [
          "Position lines: a VOR radial/QTE, a bearing, or a DME arc; two crossing position lines give a fix (three is best). Transfer an earlier line along track for a running fix.",
          "In a climb/descent at constant RAS the TAS and groundspeed change continuously — use mean values for the leg, and the climb wind.",
        ],
      },
    ],
    mustKnow: [
      "Track error = (off-track ÷ gone) × 60; closing angle = (off-track ÷ to-go) × 60.",
      "Heading correction to regain track = track error + closing angle.",
      "Two crossing position lines = a fix.",
    ],
    traps: [
      "Using distance-to-go for the track-error part (that is the closing angle).",
      "Applying only the track error when you need to REGAIN track (add the closing angle).",
    ],
  },
];

export function getNavNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return NAV_NOTES.find((n) => n.sectionId === sectionId);
}
