// SACAA CPL Air Law: full study text for the ICAO/AIP-based sections
// (A.3.14 airspace & ATS, A.3.16 AIP, A.3.17 Jeppesen, A.3.18 Annex 14).
// Original wording, from ICAO Annex 11/14, PANS-ATM, the RSA AIP and the
// AVEX CPL Air Law text. "§ " = sub-heading.
import type { AirLawSectionNote } from "./airlaw-notes";

export const AIRLAW_NOTES_FULL_B: AirLawSectionNote[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.3.14",
    title: "Airspace & Air Traffic Services (SA-CATS 172)",
    intro:
      "Airspace is divided into classes (A to G) that decide which flights may enter, whether a clearance is needed, what separation and information ATS provides, and the radio and speed requirements. South Africa uses Classes A, C, F and G. This section also covers the three air traffic services and the airspace structure (FIR, CTA, TMA, CTR, ATZ, advisory airspace and special-use areas).",
    blocks: [
      {
        heading: "Classification of airspace (A–G) and level of ATS provision",
        figureTopics: ["Airspace"],
        points: [
          "§ The air traffic services",
          "Air traffic control service (ATC): prevents collisions between aircraft and between aircraft and obstructions on the manoeuvring area, and expedites and maintains an orderly flow of traffic. It is provided as area control (en route), approach control (arrivals and departures) and aerodrome control (traffic on and around the aerodrome).",
          "Flight information service (FIS): advice and information useful for the safe and efficient conduct of flights (weather, changes in navaid serviceability, aerodrome conditions, traffic information where possible).",
          "Alerting service: notifies the appropriate organisations about aircraft in need of search and rescue, and assists them. Its phases are INCERFA (uncertainty), ALERFA (alert) and DETRESFA (distress).",
          "Air traffic advisory service: provided in advisory airspace to IFR flights, to keep them separated as far as practicable (advice, not clearances).",
          "§ The ICAO airspace classes",
          "Class A: IFR only. All flights receive ATC and are separated from each other. Clearance and continuous two-way radio required. VFR not permitted (91.06.21(2)).",
          "Class B: IFR and VFR. All flights are separated from each other. (Not used in South Africa.)",
          "Class C: IFR and VFR. All flights need a clearance and two-way radio. IFR is separated from IFR and from VFR; VFR is separated from IFR and receives traffic information on other VFR flights (and avoidance advice on request). Speed limit of 250 kt IAS below FL100 for VFR. This is the main controlled airspace class in South Africa (CTRs, TMAs, CTAs).",
          "Class D: IFR and VFR; IFR separated from IFR only; traffic information to all. (Not used in SA.)",
          "Class E: IFR and VFR; IFR separated from IFR; VFR need no clearance. (Not used in SA.)",
          "Class F: IFR and VFR. IFR participating flights receive an air traffic ADVISORY service; all flights receive FIS on request. No clearance; advisory airspace and advisory routes in SA are Class F.",
          "Class G: IFR and VFR. No separation; FIS on request. No clearance. All airspace not otherwise classified (uncontrolled airspace below the controlled airspace) is Class G.",
          "Controlled airspace = Classes A to E. Uncontrolled airspace = Classes F and G.",
          "§ VFR minima by class (summary from 91.06.21)",
          "Classes C, F, G at and above 10 000 ft AMSL: 8 km, 1 500 m horizontally and 1 000 ft vertically from cloud. Below 10 000 ft: 5 km, 1 500 m and 1 000 ft. At or below 3 000 ft AMSL or 1 000 ft above terrain (whichever is higher) in Classes F and G: 5 km, clear of cloud and in sight of the surface. Inside CTRs and ATZs: 5 km, 600 m and 500 ft from cloud, with ground visibility 5 km and ceiling 1 500 ft.",
          "§ The airspace structure",
          "Flight Information Region (FIR): the largest division, in which FIS and alerting are provided. South Africa has the Johannesburg FIR, the Cape Town FIR and the Johannesburg Oceanic FIR. An Upper Information Region (UIR) may be established above.",
          "Control area (CTA): controlled airspace extending upwards from a specified level above the surface, including airways.",
          "Terminal control area (TMA): a control area at the confluence of ATS routes around one or more major aerodromes (e.g. the Johannesburg TMA, Cape Town TMA, Durban TMA). TMAs are built in stepped layers.",
          "Control zone (CTR): controlled airspace from the SURFACE to a specified upper limit around an aerodrome, protecting arriving and departing IFR traffic (e.g. the FAOR CTR).",
          "Aerodrome traffic zone (ATZ): airspace around an aerodrome where aerodrome control or AFIS is provided. In SA, an ATZ typically has a radius of about 5 NM (larger at some aerodromes) from the surface to a specified height (e.g. 2 000 ft above aerodrome level, published in the AIP).",
          "Advisory airspace and advisory routes (ADR): Class F, where an air traffic advisory service is available; flight plan required and radio watch (91.06.17).",
          "Airways: control areas in the form of corridors (usually 10 NM wide in SA, 5 NM either side of the centreline) linking navaids or waypoints.",
          "§ Special-use airspace",
          "Prohibited area (FAP…): flight is prohibited. Restricted area (FAR…): flight is restricted in accordance with specified conditions. Danger area (FAD…): activities dangerous to flight may exist at specified times (entering is not prohibited, but pilots must be aware). Special rules areas: non-standard rules apply for safety and order. Details and active times are in ENR 5 of the AIP and in NOTAMs.",
          "§ Transponder codes to remember",
          "7700 emergency; 7600 radio communication failure; 7500 unlawful interference; 2000 when entering an area from one where no code was assigned (ICAO); VFR conspicuity codes as published in the AIP.",
        ],
      },
    ],
    mustKnow: [
      "SA uses Classes A, C, F and G.",
      "Class A: IFR only, all separated. Class C: IFR+VFR, all cleared; IFR separated from all; VFR gets traffic info on VFR.",
      "Class F: advisory service to IFR; FIS to all; no clearance. Class G: FIS only, no separation.",
      "Controlled = A–E; uncontrolled = F–G. VFR not permitted in Class A.",
      "Three services: ATC, FIS, alerting (INCERFA, ALERFA, DETRESFA).",
      "CTR: surface upwards; CTA: from a level above the surface; TMA: control area around major aerodromes.",
      "Prohibited (FAP), restricted (FAR), danger (FAD) areas.",
      "Squawk 7700 emergency, 7600 RCF, 7500 hijack.",
    ],
    traps: [
      "In Class C, VFR flights are NOT separated from other VFR flights; they only get traffic information.",
      "Advisory airspace is Class F, which is uncontrolled.",
      "Flying in a danger area is not prohibited, but you must know its activity times.",
      "The alerting service does not separate traffic.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.3.16",
    title: "RSA AIP — Enroute & Aerodrome Information",
    intro:
      "The Aeronautical Information Publication (AIP) is the State's official manual of permanent aeronautical information, kept current by amendments, supplements, AICs and NOTAMs. You must know its structure (GEN, ENR, AD), the ATC and altimeter procedures it publishes, and how to read aerodrome information and charts.",
    blocks: [
      {
        heading: "Airspace classification (ENR 1.4), ATC procedures, radar, altimeter setting",
        figureTopics: ["Altimetry & transition"],
        points: [
          "§ The Aeronautical Information Service (AIS) products",
          "AIP: permanent information essential to air navigation, in three parts. GEN (general): regulations, abbreviations, units, charts available, services, fees. ENR (en route): rules and procedures, airspace classification and structure, ATS routes, navaids, special-use areas, charts. AD (aerodromes): aerodrome data, facilities, procedures and charts for each aerodrome.",
          "AIP Amendments (AMDT): permanent changes, issued on a regular schedule (AIRAC dates for operationally significant changes, every 28 days). AIP Supplements (SUP): temporary changes of long duration (three months or longer) or extensive information, printed on yellow pages. Aeronautical Information Circulars (AIC): explanatory or advisory information that does not qualify for the AIP or a NOTAM (e.g. administrative, technical or regulatory notes). NOTAM: notices of temporary or short-notice information that is essential (e.g. navaid unserviceable, runway closed, restricted area active), distributed by telecommunication. Pre-flight information bulletins (PIB) collect current NOTAMs for a flight.",
          "§ ENR 1.4: airspace classification in SA",
          "Lists the classes of ATS airspace used in South Africa (A, C, F, G) and the services, VFR minima, speed limits and radio requirements for each (see A.3.14).",
          "§ ATC procedures (ENR 1.1–1.10)",
          "General rules, VFR and IFR procedures, flight planning (when required, filing times, changes, arrival reports), position reporting (compulsory and on-request points, report format: identification, position, time, level, next position and ETA), RCF procedures, interception procedures, and ATS messages.",
          "§ Radar services",
          "Radar (ATS surveillance) services in SA include radar vectoring, radar separation and approach control, primarily in the Johannesburg, Cape Town and Durban TMAs. Pilots must comply with vectors and use their assigned SSR code. When under radar control, the controller assumes terrain clearance responsibility when vectoring. 'Radar contact' means identified; 'radar service terminated' means resume own navigation.",
          "§ Altimeter setting procedures (ENR 1.7)",
          "Below the transition altitude: QNH, report altitude. Above it: 1013.2 hPa, report flight levels. Transition altitudes in SA are published per area: typically 18 000 ft in the Johannesburg area and 7 500 ft or as published elsewhere (check the current AIP). The transition level is given by ATC or ATIS. During the climb, set standard after passing the TA; during the descent, set QNH on passing the TL (or when cleared to an altitude). The layer between is the transition layer. Vertical position in the transition layer is reported as a flight level in the climb and as an altitude in the descent.",
          "§ Semi-circular and quadrantal rule references",
          "Cruising levels by magnetic track follow 91.06.33 (odd levels eastbound 000–179°, even levels westbound 180–359°; VFR +500 ft).",
        ],
      },
      {
        heading: "Aerodrome information and chart interpretation",
        points: [
          "§ What AD 2 gives for each aerodrome",
          "Location indicator (e.g. FAOR) and name; aerodrome reference point (ARP) coordinates and elevation; magnetic variation; operating hours; services (fuel types, handling, fire-fighting category); physical characteristics of runways (designation, true and magnetic bearings, dimensions, surface and PCN strength, slope, threshold elevations, stopways and clearways); declared distances (TORA, TODA, ASDA, LDA); approach and runway lighting; ATS airspace (CTR or ATZ dimensions and class); ATS communication facilities (frequencies of tower, ground, approach, ATIS); navaids; local traffic regulations; noise abatement; and charts.",
          "§ Pavement strength: the ACN–PCN system",
          "The PCN (pavement classification number) is reported as, for example, PCN 60/F/A/W/T: the number is the bearing strength; F = flexible (R = rigid) pavement; A–D = subgrade strength (A high, D ultra-low); W–Z = maximum allowed tyre pressure (W unlimited, X up to 1,75 MPa, Y up to 1,25 MPa, Z up to 0,5 MPa); T = technical evaluation (U = using aircraft experience). An aircraft may operate without restriction if its ACN is equal to or less than the PCN.",
          "§ Charts in the AD section",
          "Aerodrome chart (layout, runways, taxiways, aprons, lighting, frequencies, elevations); aerodrome obstacle charts; parking and docking charts; standard instrument departure (SID) and standard arrival (STAR) charts; instrument approach charts (IAC) with plan view, profile and minima; and visual approach charts.",
          "§ AIP aerodrome symbols (examples)",
          "Aerodrome reference point (a circle with a cross); wind indicator; runway with markings; taxiways; obstacles (with elevation AMSL and height AGL); lighting (approach, PAPI/VASI); helicopter landing areas; and the signal area. (The AVEX text Figure 16-2 reproduces the full legend.)",
          "§ Reading an aerodrome entry: a quick checklist",
          "Elevation (for QFE/QNH and performance); runway headings (magnetic) and lengths (TORA/LDA); surface and PCN; lighting (for night); circuit direction and altitude; frequencies (ATIS, tower, ground); fuel available; operating hours; and any local restrictions or NOTAMs.",
        ],
      },
    ],
    mustKnow: [
      "AIP parts: GEN, ENR, AD.",
      "AMDT = permanent changes (AIRAC cycle 28 days); SUP = temporary long-duration (yellow); AIC = explanatory/advisory; NOTAM = short-notice essential information.",
      "Altimeter: QNH at or below TA; 1013.2 above; set standard passing TA in climb, QNH passing TL in descent.",
      "PCN format: number/F or R/subgrade A–D/tyre pressure W–Z/T or U; ACN ≤ PCN = no restriction.",
      "AD 2 gives ARP, elevation, runways, declared distances, lighting, frequencies, airspace.",
      "Under radar vectoring, ATC is responsible for terrain clearance.",
    ],
    traps: [
      "AIP Supplements are temporary (often three months or more); AICs are advisory and do not change the AIP.",
      "In PCN, 'R' is rigid and 'F' is flexible pavement.",
      "Report a flight level when climbing through the transition layer but an altitude when descending through it.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.3.17",
    title: "Jeppesen Enroute Charts",
    intro:
      "Jeppesen en route charts show the airways, navaids, reporting points, airspace boundaries and minimum altitudes used for planning and flying IFR (and, at lower levels, VFR). You must be able to read the symbols and the altitude information (MEA, MOCA, MORA and others) without hesitation.",
    blocks: [
      {
        heading: "High/low altitude en route chart symbols, airways, reporting points, MEA/MOCA",
        figureTopics: ["Enroute minimum altitudes"],
        points: [
          "§ Chart types",
          "Low altitude en route charts (below FL245/FL200 depending on area) and high altitude charts (above). They are not drawn for terrain, so terrain is not shown in detail; the minimum altitudes are what protect you.",
          "§ Navaids",
          "VOR: a hexagon-type compass rose symbol with frequency, identifier and Morse code in a box. VOR/DME and VORTAC: combined symbols. NDB: a dotted circle symbol with frequency and identifier. DME: a square symbol. The navaid box also gives the coordinates, and 'D' before the frequency box shows DME capability.",
          "§ Airways",
          "Airway centrelines are shown with their designator (e.g. UA405, G653, B533, or RNAV routes such as UQ…), the magnetic track (outbound from a navaid), and the distance between points in NM. A total distance between navaids is shown in a hexagon or box. Changeover points (COP) between navaids are shown by a 'Z' symbol with the distances to each navaid. Airway widths are usually 10 NM (5 NM each side) unless otherwise stated. Direction-of-flight restrictions (one-way routes) are shown with arrows.",
          "§ Reporting points",
          "A SOLID (filled) triangle = COMPULSORY reporting point (report without being asked when not under radar control). An OPEN (hollow) triangle = ON-REQUEST reporting point. Waypoints and fixes are named with five-letter codes (e.g. EXOBI); some are defined by a radial and DME distance.",
          "§ Minimum altitudes",
          "MEA (minimum en route altitude): the lowest altitude between fixes that assures acceptable NAVIGATION SIGNAL coverage AND obstacle clearance along the airway.",
          "MOCA (minimum obstruction clearance altitude): the lowest altitude giving obstacle clearance along the route segment (in SA, typically 1 000 ft above obstacles, 2 000 ft in mountainous areas), but guaranteeing navaid coverage only within 22 NM of the VOR. It is shown with a 'T' or 'a' suffix depending on the chart (e.g. 6500T).",
          "MORA (minimum off-route altitude, Jeppesen): Route MORA (shown with 'a') gives clearance of 1 000 ft (terrain up to 5 000 ft) or 2 000 ft (terrain above 5 000 ft) within 10 NM of the route centreline; Grid MORA (large numbers in each latitude/longitude grid square, in hundreds of feet, e.g. 98 = 9 800 ft) gives the same clearance within the grid square (see 91.07.2 and SA-CATS).",
          "MRA (minimum reception altitude): lowest altitude at which an intersection can be identified using the navaids. MCA (minimum crossing altitude): minimum altitude at which a fix must be crossed when proceeding in a given direction towards a higher MEA. MAA (maximum authorised altitude).",
          "§ Airspace and other information",
          "Boundaries of FIRs, CTAs, TMAs and CTRs with their classes and vertical limits (e.g. FL245/FL145); prohibited, restricted and danger areas (with identifiers such as FAR52 and limits); communication frequencies for each sector (area control, FIS) in boxes; aerodromes (civil and military) with their status; magnetic variation (isogonic lines); time zones; and holding patterns at fixes.",
          "§ Using the chart",
          "To plan an airway route: identify the airway, magnetic tracks and distances for each leg; check the MEA (the planned level must be at or above it, and follow the semi-circular rule by magnetic track); note compulsory reporting points; note frequencies; and check special-use airspace along the route.",
        ],
      },
    ],
    mustKnow: [
      "MEA = navaid signal coverage + obstacle clearance; MOCA = obstacle clearance only (signal guaranteed only within 22 NM).",
      "Solid triangle = compulsory reporting point; open triangle = on request.",
      "Grid MORA in hundreds of feet: 1 000 ft clearance (terrain ≤ 5 000 ft), 2 000 ft (terrain > 5 000 ft).",
      "Airways usually 10 NM wide (5 NM each side).",
      "Changeover point (COP) shown by 'Z' with distances to each navaid.",
      "MRA = lowest altitude to identify an intersection; MCA = minimum crossing altitude at a fix.",
    ],
    traps: [
      "MOCA does NOT guarantee navaid reception beyond 22 NM.",
      "A grid MORA figure such as 98 means 9 800 ft, not FL98.",
      "Airway tracks on the chart are MAGNETIC.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    sectionId: "A.3.18",
    title: "ICAO Annex 14 — Aerodromes",
    intro:
      "ICAO Annex 14 (Volume I) sets the international standards for aerodrome design and operation, which South Africa applies through CAR Part 139 and SA-CATS 139. For the CPL you must know the definitions of the parts of an aerodrome, the declared distances, and the visual aids: markings, lights and signs.",
    blocks: [
      {
        heading: "Definitions: runway, clearway, stopway, taxiway, threshold, markings",
        points: [
          "Aerodrome: a defined area on land or water (including buildings, installations and equipment) intended to be used for the arrival, departure and surface movement of aircraft.",
          "Movement area: the manoeuvring area plus the aprons. Manoeuvring area: the part of the aerodrome used for take-off, landing and taxiing, excluding aprons. Apron: the area for loading and unloading, fuelling, parking and maintenance.",
          "Runway: a defined rectangular area on a land aerodrome prepared for the landing and take-off of aircraft. Runway strip: a defined area including the runway (and stopway) intended to reduce the risk of damage to aircraft running off the runway and to protect aircraft flying over it during take-off or landing. Runway end safety area (RESA): an area symmetrical about the extended centreline beyond the end of the strip, to reduce damage from undershooting or overrunning.",
          "Threshold: the beginning of that portion of the runway usable for landing. Displaced threshold: a threshold not at the extremity of the runway (the area before it may be used for take-off and taxiing but not for landing).",
          "Stopway: a defined rectangular area on the ground at the end of the take-off run available, prepared as a suitable area in which an aircraft can be stopped in the case of an abandoned take-off.",
          "Clearway: a defined rectangular area on the ground or water under the control of the appropriate authority, selected or prepared as a suitable area over which an aeroplane may make a portion of its initial climb to a specified height. It must be free of obstacles (an upward slope of not more than 1.25%) and at least 150 m wide.",
          "Taxiway: a defined path on a land aerodrome for the taxiing of aircraft, linking one part of the aerodrome with another, including aircraft stand taxilanes, apron taxiways and rapid-exit taxiways. Holding positions: runway-holding positions protect the runway; intermediate holding positions control traffic on taxiways.",
          "Aerodrome reference point (ARP): the designated geographical location of the aerodrome. Aerodrome elevation: the elevation of the highest point of the landing area.",
          "Aerodrome reference code: a code number (1 to 4, by the aeroplane reference field length: 1 < 800 m, 2 = 800 to < 1 200 m, 3 = 1 200 to < 1 800 m, 4 ≥ 1 800 m) and a code letter (A to F, by wingspan) describing the design aircraft.",
        ],
      },
      {
        heading: "Declared distances: TORA, TODA, ASDA, LDA",
        figureTopics: ["Declared distances"],
        points: [
          "TORA (take-off run available): the length of runway declared available and suitable for the ground run of an aeroplane taking off. Normally the full runway length.",
          "TODA (take-off distance available): TORA plus the length of any CLEARWAY provided.",
          "ASDA (accelerate-stop distance available): TORA plus the length of any STOPWAY provided.",
          "LDA (landing distance available): the length of runway declared available and suitable for the ground run of an aeroplane landing. It is reduced by a displaced threshold.",
          "Relationships: with no stopway or clearway, TORA = TODA = ASDA (= LDA if the threshold is not displaced). With a clearway, TODA > TORA. With a stopway, ASDA > TORA. A displaced threshold reduces LDA but not TORA (in the direction of take-off from the runway end).",
          "Example: runway 2 500 m, stopway 200 m, clearway 400 m, threshold displaced 300 m. TORA = 2 500 m; TODA = 2 900 m; ASDA = 2 700 m; LDA = 2 200 m.",
          "The required distances from the aeroplane's performance data (TORR, TODR, ASDR, LDR) must not exceed the corresponding distances available (see Flight Planning & Performance).",
        ],
      },
      {
        heading: "Visual aids: runway markings, lights, signs (Chapter 5)",
        figureTopics: ["Visual aids"],
        points: [
          "§ Colours (general rule)",
          "Runway markings are WHITE. Taxiway markings, runway-holding position markings and apron safety lines are YELLOW. Mandatory instruction signs: WHITE inscription on a RED background. Information signs: YELLOW on BLACK (location signs) or BLACK on YELLOW (direction and destination signs).",
          "§ Runway markings",
          "Runway designation: a two-digit number (the magnetic heading to the nearest 10°, divided by 10), with L, C or R for parallel runways. Threshold marking: longitudinal stripes ('piano keys'); the number of stripes depends on runway width (e.g. 4 for 18 m, 6 for 23 m, 8 for 30 m, 12 for 45 m, 16 for 60 m). Runway centreline marking: broken line of white stripes. Aiming point marking: two broad rectangular stripes about 300 m (or 400 m) from the threshold. Touchdown zone markings: pairs of rectangular bars indicating distance from the threshold (on precision runways). Runway side stripe markings: white lines along the edges where there is no contrast. A displaced threshold is marked by a transverse white bar with arrows pointing towards it along the centreline before it.",
          "Closed runway or taxiway: white crosses (X) on the runway; yellow on a taxiway. Unserviceable areas: marked with markers or flags. Pre-threshold area unsuitable for normal use (but usable as a stopway): yellow chevrons.",
          "§ Taxiway and holding markings",
          "Taxiway centreline: a continuous yellow line. Runway-holding position Pattern A: two solid and two dashed yellow lines (solid side on the taxiway side — the aircraft stops at the solid lines). Pattern B (for ILS critical/sensitive areas, CAT II/III): a 'ladder' pattern. Intermediate holding position: a single dashed yellow line. A 'Mandatory instruction' painted marking: white characters on a red background on the taxiway surface.",
          "§ Runway and approach lights",
          "Runway edge lights: white (yellow on the last 600 m or last third, whichever is less, on instrument runways — the 'caution zone'). Threshold lights: GREEN (seen from the approach). Runway end lights: RED (seen from the runway). Wing-bar lights may supplement the threshold. Runway centreline lights: white, then alternating red and white from 900 m to 300 m from the end, then all red for the last 300 m. Touchdown zone lights: white barrettes in the first 900 m.",
          "Approach lighting: a simple approach lighting system (420 m long with a crossbar at 300 m) for non-instrument and non-precision runways; a precision approach category I system (900 m, with a crossbar at 300 m and centreline barrettes); and CAT II/III systems with side rows of red barrettes in the inner 300 m.",
          "PAPI (precision approach path indicator): four light units in a row, each showing red or white. On the correct glide path: 2 white + 2 red. Slightly high: 3 white + 1 red; too high: 4 white. Slightly low: 1 white + 3 red; too low: 4 red. APAPI uses two units. VASIS (older systems) use two or three bars: 'red over white, you're all right'.",
          "Taxiway lights: edge lights BLUE; centreline lights GREEN (alternating green and yellow where they cross the runway's ILS area or lead off a runway). Stop bars: a row of RED lights across the taxiway at a runway-holding position, meaning do not proceed while lit. Runway guard lights ('wig-wags'): flashing yellow lights warning of a runway ahead.",
          "Aerodrome beacon: an aerodrome identification or location beacon, flashing white (or alternating white and green) at land aerodromes.",
          "§ Signs",
          "Mandatory instruction signs (red background, white letters): runway designation signs at a runway-holding position (e.g. 21–03), Category I/II/III holding position signs, NO ENTRY signs, and STOP signs. You must not pass a mandatory sign without a clearance.",
          "Information signs: location sign (yellow letters on a black background, with a yellow border) shows the taxiway or runway you are on; direction sign (black letters on yellow with an arrow) shows the direction to other taxiways; destination signs (black on yellow) show the way to a destination (e.g. APRON); runway exit signs; runway vacated signs; and take-off run available signs at intersections (e.g. 'TORA 2 150 m').",
          "§ Ground signals (signal area)",
          "Examples: a horizontal red square with yellow diagonals means landing prohibited; a red square with one yellow diagonal means take special precautions while approaching or landing; a white 'dumbbell' means use only hard surfaces; a white T shows the landing direction (land along the stem towards the crossbar); a right-hand arrow means right-hand circuit; a white cross means area unfit for use. Light signals from the tower (91.06.13) are covered in the rules of the air.",
        ],
      },
    ],
    mustKnow: [
      "TODA = TORA + clearway; ASDA = TORA + stopway; LDA reduced by a displaced threshold.",
      "Clearway is for the initial climb (≥ 150 m wide, slope ≤ 1.25%); stopway is for stopping after a rejected take-off.",
      "Runway markings white; taxiway markings yellow.",
      "Threshold lights green; runway end lights red; edge lights white with yellow on the last 600 m (instrument runways).",
      "Centreline lights: alternate red/white 900–300 m from the end, red in the last 300 m.",
      "PAPI on slope: 2 white + 2 red; 4 white too high; 4 red too low.",
      "Taxiway edge lights blue, centreline green; stop bar red.",
      "Mandatory signs: white on red. Location sign: yellow on black. Direction sign: black on yellow.",
      "Holding position Pattern A: solid lines on the side where aircraft hold.",
    ],
    traps: [
      "A clearway adds to TODA, not ASDA; a stopway adds to ASDA, not TODA.",
      "A displaced threshold reduces LDA, not TORA.",
      "Taxiway EDGE lights are blue; taxiway CENTRELINE lights are green.",
      "Do not cross a lit red stop bar even if cleared; ask ATC.",
    ],
  },
];
