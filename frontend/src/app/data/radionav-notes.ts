// CPL Radio Navigation & Communications (A.10.x) study notes. Authored in-house
// from standard radio-aids theory (scope taken from the AVEX "Radio Aids and
// Communication" chapter questions; no textbook text or figures are reproduced).
// Shape matches AirLawSectionNote so it plugs into the subject content registry.

import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

export const RADIONAV_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "A.10.1",
    title: "Radio Wave Propagation & Basic Radio",
    intro:
      "Everything else in this subject is one of these waves put to work. Nail the frequency/wavelength sum, how each band travels, and the modulation vocabulary, and the ADF/VOR/radar chapters stop being magic.",
    blocks: [
      {
        heading: "1. The wave",
        points: [
          "Speed of a radio wave = 3×10⁸ m/s (speed of light).",
          "λ(m) = 300 / f(MHz), or λ(m) = 300000 / f(KHz). Learn both directions.",
          "Amplitude = peak displacement from the mean. Wavelength = distance in one cycle. Phase = position within a cycle, in degrees.",
          "Polarisation is defined by the plane of the ELECTRICAL field — NDBs radiate vertically polarised waves.",
        ],
      },
      {
        heading: "2. Modulation",
        points: [
          "Modulation = impressing intelligence onto a carrier. AM varies amplitude (frequency constant); FM varies frequency (amplitude constant).",
          "Demodulation recovers the audio from the carrier.",
          "Emission designators: A1A = keyed unmodulated carrier (needs BFO); A2A = keyed modulated tone (self-identifying, no BFO); A3E = telephony (voice).",
        ],
      },
      {
        heading: "3. Propagation & bands",
        points: [
          "Surface (ground-wave) attenuation INCREASES with frequency; diffraction/bending around the earth is greatest at the LOWEST frequency (VLF).",
          "Static interference is worst at low frequencies (VLF/LF) and falls as frequency rises — VHF is essentially static-free.",
          "Sky waves reflect off the ionosphere (densest at midday in summer). Skip distance = transmitter to first sky-wave return; dead space = gap between end of ground wave and first sky-wave return.",
          "Fading = a ground wave and sky wave arriving out of phase. Duct propagation is caused by a temperature inversion.",
          "VHF/UHF are line-of-sight: range(NM) ≈ 1.25(√ht₁ + √ht₂) with heights in feet.",
        ],
      },
    ],
    mustKnow: [
      "λ(m) = 300 / f(MHz).",
      "Speed = 3×10⁸ m/s.",
      "VHF COM band 118.0–136.975 MHz; VHF as a band = 30–300 MHz.",
      "Line-of-sight range ≈ 1.25(√ht₁ + √ht₂), feet.",
    ],
    traps: [
      "Ground-wave attenuation rises with frequency, but so does static IMMUNITY — don't mix the two.",
      "Skip distance ≠ dead space: skip is to the first sky wave, dead space is the silent gap between ground and sky coverage.",
    ],
  },
  {
    sectionId: "A.10.2",
    title: "ADF / NDB (Automatic Direction Finding)",
    intro:
      "The oldest nav aid still flying. A ground NDB radiates in all directions; the aircraft loop+sense aerial finds the bearing to it. Cheap and simple, but riddled with errors you must be able to name and minimise.",
    blocks: [
      {
        heading: "1. NDB & the receiver",
        points: [
          "NDB: vertically polarised, LF/MF band (usually 200–500 KHz). A1A = long-range (unmodulated, BFO on); A2A = short-range approach/locator (modulated tone).",
          "The loop aerial resolves direction (its null is sharp); the sense aerial removes the 180° ambiguity, giving a single-null cardioid. BEARINGS need both aerials.",
          "Presentation: RBI shows relative bearing; RMI (a compass repeater) shows QDM directly.",
        ],
      },
      {
        heading: "2. Bearings (Q-codes)",
        points: [
          "QDM = magnetic bearing TO the station; QDR = magnetic bearing FROM; QTE = true bearing FROM; QUJ = true bearing TO.",
          "QDM = Heading(M) + Relative Bearing (subtract 360 if over). QDR = QDM ± 180.",
          "1-in-60 for time/distance to the NDB: time to station = 60 × minutes flown / degrees of bearing change.",
        ],
      },
      {
        heading: "3. Errors",
        points: [
          "Quadrantal error: airframe re-radiates the signal — worst at the 45° quadrantal points.",
          "Coastal refraction: bends the bearing as it crosses a coast; minimise by choosing an NDB on/near the coast (path crosses ~90°). A fix from inland NDBs while at sea plots LANDWARDS of true.",
          "Night effect: sky-wave contamination, worst at dawn/dusk — use lower frequencies and nearby NDBs.",
          "Static (thunderstorm) interference can drag the needle toward the Cb.",
        ],
      },
    ],
    mustKnow: [
      "QDM = Heading + RB.",
      "Sense aerial resolves the 180° ambiguity.",
      "Coastal-refraction fix from inland NDBs plots landwards.",
      "Time to NDB = 60 × min flown / bearing change.",
    ],
    traps: [
      "The loop gives direction, but you need BOTH loop and sense aerials for an unambiguous bearing.",
      "A1A needs the BFO on for tuning AND ident; A2A does not.",
    ],
  },
  {
    sectionId: "A.10.3",
    title: "VOR & ILS",
    intro:
      "The VHF phase-comparison workhorses. VOR gives you a radial anywhere; the ILS glues a localiser and glide path to a runway. Both ignore the compass — they measure phase, not where you're pointing.",
    blocks: [
      {
        heading: "1. VOR",
        points: [
          "Band 108.0–117.95 MHz. Bearing by phase comparison of a reference phase (9960 Hz sub-carrier, FM at 30 Hz) and a variable/directional phase (rotating limaçon, AM at 30 Hz).",
          "CDI ignores heading. TO with needle centred = you are on the reciprocal of the selected radial. No ident = under maintenance, DON'T use the bearings.",
          "Accuracy ±4°; VOT ground check tolerance ±4° of 180°/360°. Line-of-sight range like all VHF.",
        ],
      },
      {
        heading: "2. ILS geometry",
        points: [
          "Localiser (~300 m beyond the upwind runway end, on centreline) — carries the IDENT; 150 Hz/blue right of centreline, 90 Hz/yellow left. On the centreline the needle centres irrespective of OBS.",
          "Glide path array offset to the side, ~300 m upwind of the threshold; typically 3°. Full-scale deflection ±0.7° (GP), localiser tighter.",
          "Markers all transmit on 75 MHz. Outer marker = continuous low-tone dashes.",
          "False glide paths appear at multiples of the true angle (first ~6°+). CAT I protected to 200 ft above the reference point.",
        ],
      },
      {
        heading: "3. Rate of descent",
        points: [
          "ROD ≈ GP° × GS × 100 / 60. Rule of thumb: ROD ≈ 5 × GS for a 3° path.",
          "Because ROD follows groundspeed, a reducing headwind (higher GS) needs a HIGHER rate of descent to stay on the path.",
        ],
      },
    ],
    mustKnow: [
      "VOR: TO + centred needle = on the reciprocal of the selected radial.",
      "Localiser carries the ident; markers on 75 MHz.",
      "ROD ≈ GP × GS × 100 / 60.",
      "GP full-scale = ±0.7°.",
    ],
    traps: [
      "The localiser/glide path ignore the OBS — setting a wrong course does not move the needle.",
      "150 Hz predominant = right of centreline (blue); relate to runway heading to get east/west.",
    ],
  },
  {
    sectionId: "A.10.4",
    title: "DME (Distance Measuring Equipment)",
    intro:
      "Secondary radar you carry. The interrogator asks, the ground transponder answers 63 MHz away, and the time-of-flight becomes slant range. Simple, accurate, and immune to most propagation errors.",
    blocks: [
      {
        heading: "1. Principle",
        points: [
          "UHF band 962–1213 MHz. Interrogator and transponder frequencies differ by 63 MHz so ground reflections aren't mistaken for replies.",
          "Random PRF (jitter) is unique to each aircraft, so a receiver only accepts its own replies. Fixed transponder delay 50 µs (X-channel).",
          "Range = 0.162 × (T − 50) / 2 NM, T in µs.",
        ],
      },
      {
        heading: "2. Range, slant & saturation",
        points: [
          "DME reads SLANT range in NM. Slant/ground error is greatest when high AND close (overhead a station at 6000 ft ≈ 1 NM).",
          "A transponder serves ~100 aircraft; beyond that it SATURATES and raises its threshold (reduces gain), dropping the weakest/most distant signals.",
          "Squitter (random filler pulses) brings an interrogator off auto-standby when it comes into range.",
        ],
      },
    ],
    mustKnow: [
      "Interrogation/reply differ by 63 MHz.",
      "Range = 0.162 × (T − 50) / 2.",
      "DME = slant range; error worst high and close.",
      "Saturates above ~100 aircraft.",
    ],
    traps: [
      "DME does not suffer night effect/static/refraction — accuracy ~±0.5 NM.",
      "Overhead a station the DME shows your height (in NM), not zero.",
    ],
  },
  {
    sectionId: "A.10.5",
    title: "Primary Radar, Ground Radar & SSR",
    intro:
      "Primary radar bounces a pulse off the target; secondary (SSR) asks a transponder to answer. Everything here comes down to pulse timing, beamwidth and the P1/P2/P3 pulse game.",
    blocks: [
      {
        heading: "1. Primary radar",
        points: [
          "PRF sets MAXIMUM range (each pulse must return before the next is sent); pulse width sets MINIMUM range and range resolution.",
          "Beamwidth sets bearing (azimuth) discrimination — a narrow beam separates close targets. Power varies as range⁴, so doubling range needs ×16 power.",
          "Range(NM) = 162000 × T(µs) / 10⁶ / 2.",
        ],
      },
      {
        heading: "2. Ground radars",
        points: [
          "Long-range surveillance: longer pulse, low PRF, slow antenna (~5 RPM). Terminal/approach: faster refresh, shorter pulse.",
          "Aerodrome Surface Movement Radar (ASMR): SHF (15–17 GHz), very short pulse, fast antenna (60–75 RPM) for a rapid ground picture.",
        ],
      },
      {
        heading: "3. SSR",
        points: [
          "Ground interrogates on 1030 MHz; aircraft replies on 1090 MHz (both UHF). Reply frame = 20.3 µs. 4096 codes (2¹²).",
          "Modes: A (8 µs, ident), B (17 µs), C (21 µs, pressure altitude). Special squawks: 7500 hijack, 7600 comms failure, 7700 emergency.",
          "Side-Lobe Suppression: P2 control pulse, stronger than side lobes; if P2 > P1/P3 the transponder ignores the interrogation. Garbling from close targets is resolved by killer circuits.",
          "Fruit = unsynchronised replies; removed by de-fruiting (different PRFs on adjacent interrogators). Mode S = selective, 24-bit address, 25 ft altitude resolution.",
        ],
      },
    ],
    mustKnow: [
      "PRF → max range; pulse width → min range.",
      "SSR: interrogate 1030, reply 1090 MHz.",
      "Modes A/B/C = 8/17/21 µs; C = altitude.",
      "7500/7600/7700 = hijack/comms/emergency.",
    ],
    traps: [
      "Double the RANGE of primary radar = ×16 power (out-and-back), not ×4.",
      "P2 is the side-lobe suppression pulse; comparing P1/P3 with P2 defeats side-lobe interrogation.",
    ],
  },
  {
    sectionId: "A.10.6",
    title: "Airborne Weather Radar",
    intro:
      "A nose-mounted primary radar tuned to paint water. Short SHF wavelength reflects off large drops, a narrow beam gives resolution, and colour/contour modes turn returns into a turbulence map.",
    blocks: [
      {
        heading: "1. Principle",
        points: [
          "~3 cm wavelength (9375 MHz, SHF): short enough to reflect off large drops/hail, long enough to see ahead through cloud. Below 3 cm too much is absorbed.",
          "A conical PENCIL beam (narrow in both planes, ~3.5°) gives the best target resolution. Antenna gyro-stabilised in pitch and roll.",
          "Low PRF (long range needs the echo back before the next pulse). STC keeps near/far clouds at even brightness.",
        ],
      },
      {
        heading: "2. Modes & display",
        points: [
          "WEA: weather using the pencil beam. MAP: ground mapping using a cosecant (fan) beam out to ~60 NM; beyond that MAN + pencil beam.",
          "CONTOUR / iso-echo blanks the strongest returns to black, highlighting the most turbulent cores. Colour: green→yellow→red→magenta (increasing intensity/turbulence).",
          "Distortion: the beam adds half a beamwidth each side, enlarging targets; worst at long range.",
        ],
      },
    ],
    mustKnow: [
      "SHF (~3 cm) reflects off large water drops.",
      "Conical pencil beam = best resolution; cosecant beam for mapping ≤60 NM.",
      "Iso-echo/contour = turbulence (black cores).",
      "Never radiate on the ground near people/buildings.",
    ],
    traps: [
      "Cloud-top height by 1-in-60: use the LOWER beam edge (tilt − half-beam) that just clears the top.",
      "Colour order magenta = most severe, not red.",
    ],
  },
  {
    sectionId: "A.10.9",
    title: "Radio Altimeter",
    intro:
      "The only altimeter that measures actual height above the ground beneath you. An FM continuous wave sweeps up and down; the frequency difference between transmit and echo is your height.",
    blocks: [
      {
        heading: "1. Principle",
        points: [
          "FM-CW in the SHF band, 4200–4400 MHz, swept ±50 MHz about the centre.",
          "Height ∝ the frequency difference between the transmitted sweep and its ground reflection (proportional to twice the height).",
          "Reads the height of the lowest part of the aircraft above the ground directly below; range 0–2500 ft.",
        ],
      },
      {
        heading: "2. Display & use",
        points: [
          "Above ~2500 ft the pointer hides behind the pointer mask. A DH bug/alert lights at the selected decision height.",
          "Accuracy ±3 ft or 3% (0–500 ft), ±5% (500–2500 ft). Feeds GPWS and autoland (CAT II/III).",
          "Errors: mushing error (antennas too far apart), leakage error (too close — use spacing to balance the two).",
        ],
      },
    ],
    mustKnow: [
      "4200–4400 MHz, FM-CW, ±50 MHz sweep.",
      "Height from the transmit/echo frequency difference.",
      "Range 0–2500 ft; pointer masks above that.",
    ],
    traps: [
      "It measures height by FREQUENCY change, not pulse timing.",
      "It reads AGL directly below — not QNH altitude.",
    ],
  },
  {
    sectionId: "A.10.10",
    title: "Emergency Locator Transmitter (ELT)",
    intro:
      "A crash-activated beacon so search-and-rescue can find you. Know the two analogue distress frequencies, the digital 406 MHz upgrade, and the test rules.",
    blocks: [
      {
        heading: "1. Frequencies & emission",
        points: [
          "Analogue ELT: 121.5 MHz and 243 MHz (the two international distress frequencies), emission A3X.",
          "Digital ELT / EPIRB: 406 MHz — stronger, carries aircraft/owner ID, satellite-detected.",
          "Audio = a distinctive downward sweep from ~1600 Hz to 300 Hz, 2–4 sweeps per second.",
        ],
      },
      {
        heading: "2. Operation & testing",
        points: [
          "Impact of 5 G or more arms/activates it; ~87 NM (161 km) line-of-sight range from 10 000 ft; transmits for 50 hours (−20 to +50 °C).",
          "Fixed in the tail cone (minimal crash damage). Overwater life-raft ELTs are water-activated.",
          "Analogue ELTs are tested at 3-monthly intervals, within the first 5 minutes of the hour, transmitting only a few pulses.",
        ],
      },
    ],
    mustKnow: [
      "Analogue: 121.5 & 243 MHz. Digital/EPIRB: 406 MHz.",
      "Downsweep 1600→300 Hz.",
      "Test in the first 5 min of the hour, every 3 months.",
    ],
    traps: [
      "406 is MHz (not KHz); 121.5/243 are MHz.",
      "Testing is FIRST five minutes of the hour, few pulses only.",
    ],
  },
  {
    sectionId: "A.10.11",
    title: "Area Navigation (RNAV)",
    intro:
      "Fly direct between any two points without overflying beacons. Basic 2D RNAV moves a VOR/DME to a phantom waypoint and steers you there; the accuracy spec depends on whether it's B- or P-RNAV.",
    blocks: [
      {
        heading: "1. Types & levels",
        points: [
          "B-RNAV: ±5 NM on 95% of occasions. P-RNAV: ±1 NM on 95% of occasions.",
          "Levels: 2D (horizontal), 3D (adds vertical), 4D (adds a time function).",
          "Broader RNAV includes VOR/DME, INS/IRS and GNSS sources.",
        ],
      },
      {
        heading: "2. VOR/DME (Rho-Theta) RNAV",
        points: [
          "A Course Line Computer solves the waypoint triangle from DME range (Rho) and VOR bearing (Theta) using sine/cosine rules.",
          "CDI shows deviation in NM (not degrees). Approach mode: full-scale = 1.25 NM (0.25 NM/dot); use only within 25 NM of the VOR/DME.",
          "Simple computers use slant range (error); better ones convert to ground range using altitude + station elevation.",
        ],
      },
    ],
    mustKnow: [
      "B-RNAV ±5 NM; P-RNAV ±1 NM (95%).",
      "Rho-Theta = DME distance + VOR bearing.",
      "Approach mode full-scale = 1.25 NM.",
    ],
    traps: [
      "RNAV CDI is linear (NM), not angular like a raw VOR.",
      "2D adds nothing vertical — you need 3D for vertical guidance.",
    ],
  },
  {
    sectionId: "A.10.12",
    title: "GNSS / GPS",
    intro:
      "Satellite ranging. Time-of-arrival from several satellites gives spheres of position that intersect at your location; a fourth satellite fixes the receiver clock. Know the segments, the errors and RAIM.",
    blocks: [
      {
        heading: "1. System & fix",
        points: [
          "24 satellites in 6 orbital planes, ~20 200 km, inclined 55°, ~12-hour orbits. Segments: space, control (MCS + monitor stations + ground antennas), user.",
          "3 ranges give a 2D fix; a 4th satellite resolves receiver clock bias for a 3D fix. Civil C/A code on L₁ = 1575.42 MHz (L₂ 1227.6 MHz is military P-code).",
          "Each satellite has a unique C/A code so the receiver can tell them apart on the shared frequency.",
        ],
      },
      {
        heading: "2. Errors & integrity",
        points: [
          "Ephemeris error = satellite not exactly in its predicted orbit. Ionospheric error = signal delay corrupting pseudo-range (dual-frequency corrects most). Multipath = reflections off the airframe.",
          "GDOP is worst when satellites are close together (shallow cuts). Mask angle (5–10°) ignores low satellites.",
          "Doppler shift on the carrier gives groundspeed. DGPS uses a surveyed reference station to broadcast corrections and greatly improve accuracy.",
          "RAIM: the receiver checks its own integrity — needs a 5th satellite (6 for continuous). Parallel offset builds a track parallel to the route to stay clear of airspace.",
        ],
      },
    ],
    mustKnow: [
      "24 sats, 6 planes, 55°. 4 sats for a 3D fix.",
      "Civil C/A on L₁ 1575.42 MHz.",
      "RAIM needs a 5th satellite.",
      "GDOP worst when satellites close together.",
    ],
    traps: [
      "Ephemeris ≠ ionospheric: orbit position vs signal delay.",
      "Doppler is used for groundspeed, not altitude.",
    ],
  },
];

export function getRadioNavNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return RADIONAV_NOTES.find((n) => n.sectionId === sectionId);
}
