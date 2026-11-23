// CPL Navigation (A.9.x) study notes — TEXTBOOK DEPTH. Teaching prose authored
// in-house from standard general-navigation theory (scope per SA-CATS 61
// Appendix 2.0A A.9). No textbook text or figures reproduced. figureTopics
// resolve to the A.9 inline SVGs. Shape matches AirLawSectionNote.

import type { AirLawSectionNote } from "@/app/data/airlaw-notes";
import { NAV_NOTES_FULL } from "./nav-notes-full";

export const NAV_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "A.9.1",
    title: "The Earth — Shape, Position & Great Circles",
    intro:
      "All navigation begins with a way to say exactly where you are on a large, rotating, slightly flattened ball. That is the job of the latitude/longitude grid. Once positions are nailed down, the next question is what KIND of line you fly between them — the shortest path (a great circle) or a path of constant direction (a rhumb line) — because the two differ, and the difference grows with distance and latitude. Convergency, the way the meridians lean together toward the poles, ties these ideas together and quietly drives most of the chart and radio-bearing work that follows, so it pays to understand it properly now rather than memorise formulae later.",
    blocks: [
      {
        heading: "1. Shape & the reference grid",
        figureTopics: ["Earth & direction"],
        points: [
          "The Earth is not a true sphere but an oblate spheroid — very slightly flattened at the poles, with a compression of about 1 part in 298 (the polar diameter is some 23 NM shorter than the equatorial). The flattening is tiny, so for everyday navigation and plotting the Earth is treated as a perfect sphere; the spheroidal shape only matters for high-precision survey work and the datum a GPS uses.",
          "Latitude is the angular distance north or south of the equator, measured at the Earth's centre, running 0° at the equator to 90° at each pole. Longitude is the angular distance east or west of the Greenwich (prime) meridian, 0° to 180°, and together a latitude and longitude fix any point uniquely.",
          "The grid gives navigation its distance unit: one minute of arc along a meridian (a change of one minute of latitude) is defined as one nautical mile, so 1° of latitude equals 60 NM. A minute of LONGITUDE, however, is only 1 NM at the equator and shrinks toward the poles in proportion to the cosine of the latitude, because the meridians crowd together — a point that trips up countless distance sums.",
        ],
      },
      {
        heading: "2. Great circle vs rhumb line",
        figureTopics: ["Great circle & rhumb line"],
        points: [
          "A great circle is any circle on the Earth's surface whose plane passes through the centre of the Earth; the arc of a great circle is the SHORTEST distance between two points. Because the meridians converge, a great circle (other than a meridian or the equator) crosses each meridian at a steadily changing angle, so its true direction changes continuously along the route.",
          "A rhumb line (loxodrome) is a line of CONSTANT direction: it cuts every meridian at the same angle. That makes it easy to steer with a compass, but it is a longer path than the great circle and it spirals gently toward the pole. The higher the latitude and the longer the east–west leg, the bigger the saving from flying the great circle instead.",
          "Two special cases are worth memorising: the equator and all meridians are BOTH great circles and rhumb lines (constant direction and shortest path at once). Every other parallel of latitude is a rhumb line only — a line of constant direction (due east/west) but not a great circle, so flying along a parallel is not the shortest route between two points on it.",
        ],
      },
      {
        heading: "3. Convergency & conversion angle",
        figureTopics: ["Convergency"],
        points: [
          "Convergency is the angle at which two meridians meet, and it is why a great-circle track changes direction along a route. It is zero at the equator (meridians are parallel there) and grows toward the poles: convergency = change of longitude × sine of the mean latitude. Learn it as 'ch.long × sin(mean lat)'.",
          "On the Earth the great circle always lies on the POLE-ward side of the rhumb line between the same two points, bowing toward the nearer pole. The conversion angle — the difference in direction between the great circle and the rhumb line at either end — is exactly half the convergency: conversion angle = ½ × convergency.",
          "Because of this geometry the initial great-circle track differs from the rhumb-line track by the conversion angle, and the great circle's direction then swings by the full convergency along the whole leg. The sense reverses between hemispheres, so always sketch the leg (which pole is nearer?) before deciding whether to add or subtract — a rough diagram prevents the common sign error.",
        ],
      },
    ],
    mustKnow: [
      "1 minute of latitude = 1 NM; 1° of latitude = 60 NM.",
      "Great circle = shortest path (plane through Earth's centre); rhumb line = constant direction.",
      "Convergency = change of longitude × sin(mean latitude); conversion angle = ½ convergency.",
      "The great circle lies on the POLE-ward side of the rhumb line.",
    ],
    traps: [
      "Treating a minute of longitude as 1 NM away from the equator — it is 1 × cos(lat) NM.",
      "Forgetting that a great-circle track's direction changes along the route (only the rhumb line is constant).",
      "Mixing convergency (the full angle) with conversion angle (half of it).",
    ],
  },
  {
    sectionId: "A.9.2",
    title: "Direction — True, Magnetic & Compass; Radio Bearings",
    intro:
      "Every heading and track is a direction quoted against some 'north', and navigation lives or dies on keeping those norths straight. There are three — true, magnetic and compass — and converting cleanly between them with variation and deviation is a skill you will use on every leg and every plot. Layered on top is the Q-code family of radio bearings, which tell you a direction to or from a ground station in either magnetic or true terms; knowing which is which, and where to apply variation when you plot them, is what turns a raw bearing into a line on the chart.",
    blocks: [
      {
        heading: "1. The three norths, variation & deviation",
        figureTopics: ["North references"],
        points: [
          "TRUE north is the direction of the geographic North Pole, the reference for charts and great circles. MAGNETIC north is where an undisturbed compass needle points, toward the slowly-moving magnetic pole. COMPASS north is where the aircraft's own compass actually points, because the aeroplane's own magnetism and electrics deflect the needle away from magnetic north.",
          "VARIATION is the angle between true and magnetic north at a place; lines joining points of equal variation are isogonals, and the line of zero variation is the agonic line. DEVIATION is the smaller, aircraft-specific error between magnetic and compass north, recorded on a compass deviation card and changing with heading and electrical load.",
          "Convert in order: True →(apply variation)→ Magnetic →(apply deviation)→ Compass, and reverse the order going the other way. The memory aid is 'Variation/Deviation West — Best (add); East — least (subtract)' when going from true toward compass; reverse the add/subtract when converting compass back to true.",
        ],
      },
      {
        heading: "2. Radio bearings (Q-codes)",
        figureTopics: ["Radio bearings"],
        points: [
          "QDM is the MAGNETIC bearing TO the station — the heading you would steer to fly straight to it in nil wind. QDR is the MAGNETIC bearing FROM the station, i.e. the radial you are on, and QDR = QDM ± 180°.",
          "QTE is the TRUE bearing FROM the station and QUJ is the TRUE bearing TO it. The 'T' versions are what you plot directly on a true-oriented chart; the magnetic ones must have variation applied first.",
          "Where you apply the variation depends on the aid. A VOR measures a magnetic radial at the ground station, so to plot it on a true chart you apply the variation AT THE STATION. An ADF relative bearing is referenced to the aircraft's magnetic heading, so you apply the variation AT THE AIRCRAFT. Getting this right is the difference between a correct and a wildly wrong plotted line.",
        ],
      },
    ],
    mustKnow: [
      "Order: True →(variation)→ Magnetic →(deviation)→ Compass; West — Best (add), East — least.",
      "QDM = magnetic TO; QDR = magnetic FROM (QDM ± 180); QTE = true FROM; QUJ = true TO.",
      "Plot a VOR radial with variation AT THE STATION; plot an ADF bearing with variation AT THE AIRCRAFT.",
    ],
    traps: [
      "Adding easterly variation when going true→magnetic — easterly is subtracted in that direction.",
      "Confusing QDM (TO) with QDR (FROM).",
      "Using aircraft variation for a VOR radial (it is set at the station).",
    ],
  },
  {
    sectionId: "A.9.3",
    title: "Distance & Units",
    intro:
      "A small set of unit relationships underpins every speed, time, fuel and mass sum in the subject, and most navigation errors are really unit errors in disguise. The nautical mile's link to latitude, the knot as nautical miles per hour, and the conversions between metric and imperial measures need to be second nature so that the actual navigation — not the arithmetic — is where your attention goes. Fuel adds one more idea: fuel is measured by volume but limits and mass-and-balance work in mass, so specific gravity ties the two together.",
    blocks: [
      {
        heading: "1. Key units & conversions",
        figureTopics: ["Units & conversions"],
        points: [
          "The nautical mile is the navigator's distance: 1 NM = 1.852 km = 6076 ft, and roughly 1.15 statute miles. The statute mile (road miles) is shorter: 1 st. mile = 5280 ft = 1.609 km. Keep the two miles strictly apart — mixing them is a classic groundspeed blunder.",
          "The NM is tied to the Earth: 1 NM equals one minute of arc of latitude. Speed follows directly — a knot is one nautical mile per hour — so groundspeed in knots and distance in NM and time in hours form one consistent set.",
          "Common conversions to know cold: 1 metre = 3.28 ft; 1 inch = 2.54 cm; 1 imperial gallon = 4.55 litres; 1 US gallon = 3.785 litres. Fuel is often quoted in different units on the gauge, the plan and the order, so these conversions appear constantly.",
        ],
      },
      {
        heading: "2. Applying the units — speed, time, distance & fuel",
        figureTopics: ["Units & conversions"],
        points: [
          "The core relationship is Distance = Speed × Time, rearranged as Speed = Distance ÷ Time and Time = Distance ÷ Speed. Keep units consistent: knots with nautical miles and HOURS, converting minutes to decimal hours first (20 min = 0.333 h, 45 min = 0.75 h). Over the ground you must use GROUNDSPEED, not TAS, or the time and fuel will be wrong.",
          "Fuel follows the same pattern: fuel required = fuel flow × time; endurance = usable fuel ÷ fuel flow; and safe range = endurance × groundspeed. Always build in the regulatory reserves and any alternate before calling a range 'safe'.",
          "East–west distance needs the departure formula: departure (NM) = change of longitude (in minutes) × cosine of the latitude. This is the same cosine effect as before — a minute of longitude equals 1 NM only at the equator and shrinks toward the poles — whereas change of latitude converts straight to distance (1' = 1 NM).",
          "Converting fuel volume to mass (for weight and balance, and for endurance from a mass figure) needs the specific gravity: litres × SG = kilograms, with AVGAS about 0.72 and Jet A-1 about 0.80. Forgetting the SG, or using the wrong one, is a frequent source of mass-and-balance and endurance errors.",
        ],
      },
    ],
    mustKnow: [
      "1 NM = 1.852 km = 6076 ft ≈ 1.15 statute miles = 1 minute of latitude.",
      "Knots = NM per hour; 1 m = 3.28 ft; work in decimal hours.",
      "Distance = Speed × Time; use GROUNDSPEED for distance over the ground.",
      "Departure (NM) = change of longitude (min) × cos(lat); litres × SG = kg (AVGAS ≈ 0.72, Jet ≈ 0.80).",
    ],
    traps: [
      "Mixing nautical and statute miles in a groundspeed sum.",
      "Using a minute of longitude as 1 NM away from the equator.",
      "Leaving time in minutes instead of decimal hours.",
    ],
  },
  {
    sectionId: "A.9.4",
    title: "The Solar System & Time",
    intro:
      "Once you know the reference systems and the simple arc-to-time rule, time questions become pure conversion. The underlying physics is just the Earth spinning on a tilted axis while it orbits the Sun: the spin gives day, night and the longitude/time link, and the 23.5° tilt gives the seasons, the changing day length and twilight. Keep the east/west sense and the date-line rule straight and this is one of the most reliable sources of marks in the subject.",
    blocks: [
      {
        heading: "1. Time systems & the arc-to-time rule",
        figureTopics: ["Time"],
        points: [
          "UTC (coordinated universal time, effectively GMT for navigation) is the single world reference against which flight plans, NOTAMs and clearances are quoted. Local Mean Time (LMT) is the time at a particular longitude based on the real Sun, so it varies continuously with longitude; standard/zone time is a whole-hour band offset from UTC that a country adopts for convenience.",
          "The arc-to-time conversion comes straight from the Earth turning 360° in 24 hours: 15° of longitude = 1 hour, 1° = 4 minutes, and 15 minutes of arc = 1 minute of time. Places EAST of Greenwich are AHEAD of UTC (their Sun rises earlier) and places WEST are BEHIND.",
          "The International Date Line lies near the 180° meridian. Crossing it WESTBOUND you ADD a day (you have been gaining hours going east round the clock); crossing it EASTBOUND you SUBTRACT a day. Many time sums also cross local midnight, so always check whether the date must change.",
        ],
      },
      {
        heading: "2. Seasons, twilight & the Sun",
        figureTopics: ["Seasons & sun"],
        points: [
          "The Earth's axis is tilted about 23.5° to its orbit, and that tilt — not any change in distance from the Sun — causes the seasons by changing how directly sunlight strikes each hemisphere through the year. At the equinoxes (around 21 March and 23 September) day and night are equal everywhere; at the solstices (around 21 June and 21 December) one hemisphere has its longest day and the other its shortest.",
          "The Sun is directly overhead only between the Tropic of Cancer (23.5°N) and the Tropic of Capricorn (23.5°S), reaching those limits at the solstices. This is why the Sun never passes overhead in mid and high latitudes.",
          "Twilight is the period of partial light when the Sun is just below the horizon: civil twilight is defined as the Sun between the horizon and 6° below it. Day length and twilight both lengthen toward a hemisphere's summer and toward higher latitudes in that summer, which affects the usable daylight for VFR planning.",
        ],
      },
    ],
    mustKnow: [
      "Arc to time: 15° = 1 hour, 1° = 4 minutes; East is ahead of UTC, West is behind.",
      "Equinox = equal day/night; solstice = longest/shortest day; axial tilt 23.5°.",
      "Date line: westbound ADD a day, eastbound SUBTRACT a day.",
      "Civil twilight = Sun up to 6° below the horizon.",
    ],
    traps: [
      "Reversing East/West when converting longitude to local time.",
      "Forgetting to change the date when the sum crosses midnight or the date line.",
      "Blaming the seasons on distance from the Sun rather than the axial tilt.",
    ],
  },
  {
    sectionId: "A.9.5",
    title: "Charts — Projections, Mercator & Lambert",
    intro:
      "You cannot flatten a curved Earth onto paper without distorting something, so every chart projection is a deliberate trade: it keeps the property the navigator needs and sacrifices the rest. For navigation that essential property is correct bearings and shapes locally (orthomorphism), which is why only conformal charts are used. Knowing how great circles and rhumb lines appear on each projection, and how the scale behaves across the sheet, tells you how to draw your tracks and where to measure your distances — the practical heart of chartwork.",
    blocks: [
      {
        heading: "1. Projection basics",
        figureTopics: ["Chart projections"],
        points: [
          "A chart is orthomorphic (conformal) when bearings and the shapes of small features are correct at any point — meridians and parallels cross at right angles and the scale is the same in all directions about that point. Navigation charts MUST be orthomorphic so that an angle measured on the chart equals the angle flown.",
          "Projections are built on three developable surfaces: a cylinder wrapped round the Earth gives the Mercator, a cone resting on it gives the Lambert conical, and a flat plane touching a pole gives the azimuthal (polar) chart. Each is exactly to scale only along its line or point of contact (the standard parallel(s) or tangent point) and distorts increasingly away from it.",
        ],
      },
      {
        heading: "2. Mercator (cylindrical, orthomorphic)",
        figureTopics: ["Mercator chart"],
        points: [
          "On a Mercator the meridians and parallels are straight lines crossing at right angles, and rhumb lines are STRAIGHT lines — which is why it was the classic chart for steering a constant heading. Great circles appear as CURVES, bowing away from the equator (concave to the equator), so the shortest track is not the straight line on the sheet.",
          "Scale is correct only at the equator and expands with latitude in proportion to the secant of the latitude (× sec lat), so a feature near the poles is drawn far too large. Because of this you must measure a leg's distance against the latitude scale at the MID-LATITUDE of that leg, where the local scale matches.",
          "The expanding scale makes the Mercator unsuitable for high latitudes, where it becomes grossly distorted, and means great-circle flying has to be approximated by a series of rhumb-line steps between points taken off a separate great-circle chart.",
        ],
      },
      {
        heading: "3. Lambert's Conformal Conic",
        figureTopics: ["Lambert chart"],
        points: [
          "On a Lambert the meridians are straight lines converging toward the pole and the parallels are arcs of circles. GREAT CIRCLES appear as very nearly straight lines (slightly concave to the parallel of origin), while rhumb lines curve — the opposite behaviour to the Mercator, and the reason the Lambert is ideal for radio navigation, where bearings are great circles.",
          "Scale is very nearly constant across the sheet because the chart is made correct at TWO standard parallels and only slightly off between and just outside them, so distance can be measured almost anywhere with a single mid-chart scale — much more convenient than the Mercator.",
          "Convergency on a Lambert is built into the chart: chart convergency = change of longitude × sine of the parallel of origin, the constant known as the chart's convergence factor 'n'. This fixed convergence is what keeps great-circle tracks straight and makes the Lambert the standard topographical and radio-navigation chart.",
        ],
      },
    ],
    mustKnow: [
      "Navigation charts must be orthomorphic (bearings/shapes correct locally).",
      "Mercator: rhumb line STRAIGHT, great circle CURVED (concave to equator); scale ∝ sec lat.",
      "Lambert: great circle ~STRAIGHT, rhumb line curved; scale near-constant; meridians converge.",
      "Mercator distance: measure at the mid-latitude of the leg.",
    ],
    traps: [
      "Measuring Mercator distance with a single scale instead of the mid-latitude scale.",
      "Assuming a great circle is straight on a Mercator — it curves away from the equator.",
      "Swapping the two charts' behaviour: it is the LAMBERT on which great circles are straight.",
    ],
  },
  {
    sectionId: "A.9.6",
    title: "Relative Velocity",
    intro:
      "Relative-velocity problems — closing on another aircraft, opening a gap, meeting head-on, catching up in trail — look harder than they are because they are just one-dimensional relative speed. The trick is always to work in terms of the RELATIVE speed between the two aircraft and then apply time = distance ÷ relative speed. Decide first whether the two are converging or travelling the same way, pick sum or difference accordingly, and the arithmetic falls out.",
    blocks: [
      {
        heading: "1. Closing & opening",
        figureTopics: ["Relative velocity"],
        points: [
          "When two aircraft travel in the SAME direction along the same track, the gap between them changes at the DIFFERENCE of their groundspeeds — the faster one gains on the slower at (fast − slow) knots. When they are converging or head-on, the gap closes at the SUM of their groundspeeds.",
          "Once you have the relative speed, everything else is time = distance apart ÷ relative speed. The same idea answers separation problems, holding and sequencing, and controlled-time-of-arrival questions — only the numbers change.",
        ],
      },
      {
        heading: "2. Worked methods & overtaking in trail",
        points: [
          "Head-on example: two aircraft 200 NM apart, each at 250 kt groundspeed, converge at a relative speed of 250 + 250 = 500 kt, so the time to meet is 200 ÷ 500 h = 0.4 h = 24 minutes. Note that neither aircraft's individual speed is used directly — only the relative speed.",
          "Overtaking example: a 480-kt aircraft is 30 NM behind a 420-kt aircraft on the same track; the relative (closing) speed is 480 − 420 = 60 kt, so it catches up in 30 ÷ 60 = 0.5 h = 30 minutes. Same formula, difference instead of sum.",
          "To HOLD a required spacing behind another aircraft, think in the relative frame: the gap only changes at the relative speed, so matching speeds (zero relative speed) freezes the gap, and small speed changes adjust it slowly — it is easy to over-control if you think in absolute speeds.",
          "For a controlled time of arrival, work out the groundspeed needed (distance remaining ÷ time remaining) and adjust to it. Because a given speed change acts over the whole remaining leg, a small change moves the ETA more than it first appears — make early, gentle corrections rather than large late ones.",
        ],
      },
    ],
    mustKnow: [
      "Converging/head-on: relative speed = SUM of groundspeeds; same track: DIFFERENCE.",
      "Time = distance apart ÷ relative speed.",
      "Head-on 200 NM at 250 + 250 kt = 24 min; overtaking 30 NM at a 60-kt difference = 30 min.",
    ],
    traps: [
      "Adding the speeds when the aircraft are on the same track (you should subtract).",
      "Thinking in absolute speeds for spacing — the gap only changes at the RELATIVE speed.",
    ],
  },
  {
    sectionId: "A.9.7",
    title: "Dead Reckoning — The Nav Computer & Triangle of Velocities",
    intro:
      "Dead reckoning is the heart of practical navigation: take a heading and true airspeed (what the aircraft does through the air), add the wind (what the air does over the ground), and you get the track and groundspeed made good over the Earth — from which time and fuel follow. The whole relationship lives in one diagram, the triangle of velocities, and the flight (nav) computer is simply a device for solving that triangle and doing the speed/time/distance and airspeed arithmetic quickly.",
    blocks: [
      {
        heading: "1. The triangle of velocities",
        figureTopics: ["Triangle of velocities"],
        points: [
          "The triangle has three vectors. The AIR vector is what the aeroplane does through the air: its HEADING (°True) and its true airspeed (TAS). The WIND vector is the wind's direction (quoted as the direction it blows FROM) and speed. The GROUND vector is the result over the Earth: the TRACK (°True) made good and the groundspeed.",
          "The vectors add head-to-tail: Air vector + Wind vector = Ground vector. Drift is the angle between heading and track caused by the crosswind component, and the wind correction angle (laid off INTO the wind) is what you apply to the desired track to find the heading to steer so that you make good that track.",
          "Split the wind into components to see the effects: the head/tailwind component changes the GROUNDSPEED (and so time and fuel), while the crosswind component produces DRIFT (and so the heading correction). A pure headwind gives no drift; a pure crosswind changes groundspeed only slightly but drifts you strongly.",
        ],
      },
      {
        heading: "2. Nav-computer routine",
        figureTopics: ["Nav computer"],
        points: [
          "Speed/distance/time on the circular slide-rule face: set the speed on the outer scale against the time index (60) and read any distance against its time, or vice versa. This is just groundspeed × time = distance and distance ÷ groundspeed = time done mechanically, in consistent units.",
          "Indicated to true airspeed in the airspeed window: set the pressure altitude against the outside air temperature, then read TAS on the outer scale opposite the calibrated airspeed (CAS). As a rough check, TAS increases over CAS by about 2% per 1000 ft of altitude — useful for spotting a gross error.",
          "Fuel on the same face: fuel flow × time = fuel required; and always add the regulatory reserves, the alternate fuel and any contingency before signing off the plan. The computer does the ratio; airmanship adds the margins.",
        ],
      },
    ],
    mustKnow: [
      "Air vector + Wind vector = Ground vector; drift = heading − track.",
      "Apply the wind correction angle INTO the wind to make good the desired track.",
      "Headwind/tailwind changes groundspeed; crosswind causes drift.",
      "Groundspeed × time = distance; fuel = flow × time (+ reserves and alternate).",
    ],
    traps: [
      "Using the wind 'direction TO' instead of the standard 'direction FROM'.",
      "Forgetting to convert IAS → CAS → TAS before the groundspeed sum.",
      "Applying the drift the wrong way — the heading is laid off INTO the wind.",
    ],
  },
  {
    sectionId: "A.9.8",
    title: "Navigation Plotting & the 1-in-60 Rule",
    intro:
      "In the air, dead reckoning gives you a plan; plotting checks it against reality. You fix the aircraft's actual position, compare it with where the DR said you would be, and correct the heading to get back on track and on time. The 1-in-60 rule is the pilot's mental tool for turning a measured track error into a heading correction in seconds, without a computer — a small-angle approximation that is accurate enough for the errors a real flight produces.",
    blocks: [
      {
        heading: "1. The 1-in-60 rule",
        figureTopics: ["1-in-60 rule"],
        points: [
          "The rule rests on a simple approximation: being 1 NM off track after 60 NM flown represents a track error of about 1°. Generalised, the track error angle = (distance off track ÷ distance gone) × 60, measured in degrees — so 3 NM off after 90 NM is (3 ÷ 90) × 60 = 2° of track error.",
          "To regain track by the destination you also need the closing angle = (distance off track ÷ distance still to go) × 60. The total heading correction to converge back onto track at the next fix or destination is the track error PLUS the closing angle, applied toward the track.",
          "If you only want to stop diverging and fly PARALLEL to the required track (not regain it), alter heading by the track error alone. Deciding whether you need to parallel or to regain tells you whether to add the closing angle.",
        ],
      },
      {
        heading: "2. Fixing & climb/descent navigation",
        figureTopics: ["Fixing & nav"],
        points: [
          "A position line is a line somewhere on which you must be — a VOR radial or QTE, a visual bearing, or a DME range arc. One position line is not a fix; two crossing lines give a fix, and three that form a small 'cocked hat' give the best confidence. If the lines are taken at different times, transfer the earlier one along the track flown to make a running fix.",
          "In a climb or descent at constant indicated airspeed the TAS and therefore the groundspeed change continuously as height and temperature change, so use MEAN values of TAS and groundspeed for the segment, and use the forecast CLIMB wind rather than the cruise wind. Treating a climb leg as if it were flown at cruise speed is a common timing error.",
        ],
      },
    ],
    mustKnow: [
      "Track error angle = (distance off track ÷ distance gone) × 60.",
      "Closing angle = (distance off track ÷ distance to go) × 60.",
      "Heading correction to REGAIN track = track error + closing angle; to parallel = track error only.",
      "Two crossing position lines = a fix.",
    ],
    traps: [
      "Using distance-to-go for the track-error part — that is the closing angle.",
      "Applying only the track error when you need to REGAIN track (you must add the closing angle).",
      "Using cruise TAS/wind through a climb or descent instead of mean values and the climb wind.",
    ],
  },
];

export function getNavNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  const full = NAV_NOTES_FULL.find((n) => n.sectionId === sectionId);
  if (full) return full;
  return NAV_NOTES.find((n) => n.sectionId === sectionId);
}
