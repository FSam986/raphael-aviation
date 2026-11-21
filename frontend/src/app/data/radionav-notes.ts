// CPL Radio Navigation & Communications (A.10.x) study notes — TEXTBOOK DEPTH.
// Authored in-house from standard radio-aids theory (scope follows SA-CATS 61
// Appendix 2.0A A.10 and the AVEX "Radio Aids and Communication" chapter). No
// textbook text or figures are reproduced. Each block's figureTopics entry
// resolves to an ORIGINAL inline SVG via atgFiguresByTopic() in lib/figures.tsx.
// Shape matches AirLawSectionNote so it plugs into the subject content registry.

import type { AirLawSectionNote } from "@/app/data/airlaw-notes";

export const RADIONAV_NOTES: AirLawSectionNote[] = [
  {
    sectionId: "A.10.1",
    title: "Radio Wave Propagation & Basic Radio",
    intro:
      "Every aid in this subject is a radio wave put to work, so the physics here pays off in every later chapter. A radio wave is an electromagnetic disturbance that radiates from an antenna at the speed of light, 3×10⁸ metres per second, carrying energy in a self-sustaining electric and magnetic field. Three things define it — its frequency (how many cycles pass per second, in Hz), its wavelength (the physical length of one cycle), and the way it travels from transmitter to receiver. Master the frequency/wavelength relationship, the behaviour of each frequency band, and the vocabulary of modulation and antennas, and ADF, VOR, radar and GPS stop being magic and become obvious.",
    blocks: [
      {
        heading: "1. The wave & the frequency–wavelength law",
        figureTopics: ["Radio waves & propagation"],
        points: [
          "Speed is fixed: every radio wave travels at 3×10⁸ m/s in free space (the speed of light), regardless of frequency. Because speed = frequency × wavelength, if you know one of frequency or wavelength you can always find the other.",
          "The working formula: λ(metres) = 300 / f(MHz), or equivalently λ(metres) = 300 000 / f(kHz). Learn it both ways — you will be asked to go from a frequency to a wavelength and back. Example: a 125 MHz VHF COM frequency has a wavelength of 300/125 = 2.4 m.",
          "Amplitude is the peak displacement of the wave from its mean (zero) line and represents the strength or 'loudness' of the signal. Wavelength is the distance covered in one complete cycle. Phase is the position reached within a cycle, measured in degrees (0°–360°), and comparing the phase of two signals is how VOR and some other aids measure direction.",
          "A pure carrier on its own carries no information — it is a steady tone. Intelligence (speech, an ident, data) is added by modulation and recovered at the receiver by demodulation.",
        ],
      },
      {
        heading: "2. Modulation & emissions",
        figureTopics: ["Frequency bands"],
        points: [
          "Modulation impresses information onto the carrier. In amplitude modulation (AM) the carrier's amplitude is varied in step with the audio while its frequency stays constant; in frequency modulation (FM) the carrier's frequency is varied while its amplitude stays constant. FM is more immune to amplitude noise (static), which is why quality audio and some data links use it, but it needs more bandwidth.",
          "Modulating a carrier creates sidebands — new frequencies above and below the carrier, spaced by the modulating frequency. The band of frequencies occupied is the bandwidth; the higher the modulating frequency or the more information carried, the wider the bandwidth required.",
          "Emission designators you must recognise: A1A = a keyed, unmodulated carrier (Morse made by switching the carrier on and off — the receiver needs a Beat Frequency Oscillator, BFO, to make it audible). A2A = a keyed, amplitude-modulated audio tone (self-identifying, audible without a BFO). A3E = double-sideband AM telephony, i.e. ordinary voice. NDBs are usually A1A or A2A; VHF voice is A3E.",
        ],
      },
      {
        heading: "3. How each band propagates",
        points: [
          "Ground (surface) wave follows the curvature of the Earth by diffraction. It is strongest at LOW frequencies and attenuates more rapidly as frequency rises, so VLF/LF give the greatest surface-wave range and VHF gives almost none. This is why long-range, low-frequency aids (and submarine comms) use the bottom of the spectrum.",
          "Sky wave radiates upward and is refracted back to Earth by the ionosphere, whose ionisation is densest by day and in summer. The skip distance is the distance from the transmitter to the point where the first sky wave returns; the dead space is the silent gap between the limit of useful ground-wave coverage and that first sky-wave return. Sky-wave returns make HF useful over oceanic distances but they are unreliable and vary with the time of day.",
          "Space (direct) wave travels in a straight line from transmitter to receiver and is the only practical mode at VHF and above. Because it is line-of-sight, range depends on the heights of both stations: range(NM) ≈ 1.25 × (√h₁ + √h₂) with the heights in feet. Double your altitude and you extend VHF range, which is why high-level aircraft hear distant stations low aircraft cannot.",
          "Static (atmospheric noise from thunderstorms) is worst at the low frequencies and falls away as frequency rises — VHF is essentially static-free, one of its great advantages. Fading is caused by a ground wave and a sky wave (or two sky waves) arriving out of phase and alternately reinforcing and cancelling. Duct propagation, in which a temperature inversion traps a VHF/UHF wave and carries it far beyond normal line-of-sight, is an occasional anomaly to be aware of.",
        ],
      },
      {
        heading: "4. Antennas & polarisation",
        points: [
          "The polarisation of a radio wave is defined by the plane of its ELECTRIC field. A vertical aerial radiates a vertically polarised wave; for best reception the receiving aerial should lie in the same plane. NDBs radiate vertically polarised waves, so the sense aerial of an ADF is vertical.",
          "An antenna's polar diagram shows how strongly it radiates (or receives) in each direction. A simple vertical rod is omni-directional in the horizontal plane; a loop is bi-directional (a figure-of-eight, with two nulls); directional arrays concentrate energy into a beam, trading coverage for range and bearing discrimination.",
          "Half-wave and quarter-wave aerials are cut to a simple fraction of the wavelength so they resonate efficiently at the design frequency — another reason the frequency/wavelength sum matters in practice.",
        ],
      },
    ],
    mustKnow: [
      "Speed of a radio wave = 3×10⁸ m/s.",
      "λ(m) = 300 / f(MHz) = 300 000 / f(kHz).",
      "VHF COM band 118.0–136.975 MHz; VHF as a band = 30–300 MHz.",
      "Line-of-sight (VHF+) range ≈ 1.25 (√h₁ + √h₂), heights in feet.",
      "Polarisation is set by the ELECTRIC field; NDBs are vertically polarised.",
    ],
    traps: [
      "Ground-wave attenuation RISES with frequency, but static immunity ALSO rises with frequency — don't confuse the two trends.",
      "Skip distance ≠ dead space: skip distance is transmitter-to-first-sky-wave; dead space is the gap between ground-wave and sky-wave coverage.",
      "AM varies amplitude (frequency constant); FM varies frequency (amplitude constant) — the exam loves to swap these.",
    ],
  },
  {
    sectionId: "A.10.2",
    title: "ADF / NDB (Automatic Direction Finding)",
    intro:
      "The ADF is the oldest radio aid still in everyday use and the simplest in principle: a non-directional beacon (NDB) on the ground radiates equally in all directions, and the aircraft equipment measures the direction from which that signal arrives relative to the nose. It is cheap, needs no line-of-sight (it works on ground and sky wave in the LF/MF band), and gives a continuous relative bearing — but it is also the least accurate aid, riddled with errors you must be able to name, explain and minimise.",
    blocks: [
      {
        heading: "1. How the ADF finds direction",
        figureTopics: ["ADF / NDB"],
        points: [
          "The NDB transmits in the LF/MF band, roughly 190–1750 kHz, usually as A1A or A2A so it can be identified by its Morse ident. Because it is low frequency it propagates by ground wave (and sky wave at night), giving ranges well beyond line-of-sight.",
          "The airborne equipment uses a loop aerial, which is directional and produces a sharp null when its plane is edge-on to the incoming wave, together with a sense aerial (omni-directional) that resolves the 180° ambiguity the loop alone would leave. Combining the two lets the needle point unambiguously at the station.",
          "The result is displayed as a relative bearing (RB) on a fixed-card Radio Bearing Indicator, or — on a Radio Magnetic Indicator (RMI) fed by the compass — directly as a magnetic bearing, because the RMI card rotates with heading so the needle reads the QDM against the compass rose.",
        ],
      },
      {
        heading: "2. Bearings and the QDM sum",
        figureTopics: ["ADF / NDB"],
        points: [
          "Relative bearing (RB) is measured clockwise from the aircraft's nose to the station. To convert it to a magnetic bearing to the station: QDM = Magnetic Heading + Relative Bearing (subtract 360° if the total exceeds 360°). This single sum answers most ADF exam questions.",
          "The Q-codes: QDM is the magnetic bearing TO the station; QDR is the magnetic bearing FROM the station (QDR = QDM ± 180°); QTE is the true bearing FROM the station; QUJ is the true bearing TO the station. Convert between magnetic and true using variation at the station.",
          "To home to an NDB you turn to keep the needle on the nose (RB 000). To track a specific inbound/outbound QDM in a crosswind you must apply a drift correction, holding a wind-corrected heading so the needle sits off the nose by the drift angle.",
        ],
      },
      {
        heading: "3. ADF errors",
        points: [
          "Night effect: after sunset sky waves return and interfere with the ground wave, making the needle wander — worst around dawn and dusk and near the limits of range. Treat ADF bearings with caution at night.",
          "Coastal refraction: a wave crossing a coastline at an angle bends toward the coast as its speed changes over land versus sea, pulling the bearing toward the coast. It is minimised by using beacons on or near the coast and by taking bearings as near to 90° to the coast as possible.",
          "Quadrantal error: the aircraft's own metal structure re-radiates the signal and distorts the bearing, largest on the quadrantal headings; it is largely compensated on installation. Mountain effect (reflections off high ground) and thunderstorms (the ADF points at the lightning) are further sources of error — never trust a needle that is pointing at a Cb.",
        ],
      },
    ],
    mustKnow: [
      "QDM = Magnetic Heading + Relative Bearing (−360 if > 360).",
      "QDR = QDM ± 180°; QTE/QUJ are the TRUE versions.",
      "Loop finds direction; sense aerial removes the 180° ambiguity — both are needed.",
      "NDBs: LF/MF, ground + sky wave, identified by Morse ident.",
    ],
    traps: [
      "No ident, or a wandering needle at night = do not use the bearing.",
      "RB is from the NOSE, not from north — add heading to get a magnetic bearing.",
      "Coastal refraction bends the bearing TOWARD the coast; cross the coast near 90° to minimise it.",
    ],
  },
  {
    sectionId: "A.10.3",
    title: "VOR & ILS",
    intro:
      "These are the VHF phase-comparison workhorses of airways and approach flying. The VOR gives an aircraft a precise magnetic bearing (a 'radial') from a ground station anywhere within line-of-sight, and strings of VORs define the airway network. The ILS bolts a localiser and a glide path onto a specific runway to guide an aircraft down a precise approach path to low minima. Crucially, both ignore the aircraft's heading entirely — they measure the phase (VOR) or the depth of modulation (ILS) of signals in space, so the needle means the same thing whichever way the nose points.",
    blocks: [
      {
        heading: "1. VOR — how the radial is measured",
        figureTopics: ["VOR"],
        points: [
          "The VOR operates in the VHF band 108.0–117.95 MHz (it shares 108.0–111.95 with the ILS localiser, which uses the odd tenths-plus-0.05 channels). It transmits two 30 Hz signals: a reference phase that is frequency-modulated and therefore identical in every direction, and a variable (directional) phase that is amplitude-modulated by a rotating radiation pattern so its phase depends on the bearing of the receiver.",
          "The two 30 Hz signals are arranged to be exactly in phase to the magnetic north of the station. In any other direction the variable phase lags the reference by an angle equal to the magnetic bearing FROM the station. The receiver measures that phase difference and displays it as the radial — so the radial is a QDR (a bearing FROM the beacon).",
          "The Course Deviation Indicator (CDI) with its Omni-Bearing Selector (OBS) shows how far you are from a radial you dial up, not where your nose points. Centre the needle with a FROM flag and the OBS reads the radial you are on; centre it with a TO flag and the OBS reads the course to the station (the reciprocal radial). Full-scale deflection is ±10°, so each dot is roughly 2°.",
        ],
      },
      {
        heading: "2. VOR accuracy, checks & limits",
        points: [
          "Overhead the station the signal climbs almost vertically and the equipment cannot resolve a bearing — this is the cone of confusion, where the TO/FROM flag flickers and the needle swings. It is normal; fly through it on heading.",
          "A VOR with no ident, or showing the maintenance ident, is unserviceable — do not use its bearings. Being VHF, the VOR is line-of-sight: range grows with altitude and is typically protected only within a published Designated Operational Coverage.",
          "Nominal accuracy is about ±4–5°. Ground checks: a VOR Test facility (VOT) should read 360° FROM / 180° TO within ±4°; a designated airborne or ground checkpoint has its own published tolerance. Doppler VOR (DVOR) sites swap the roles of the two signals to reduce site error but read identically in the cockpit.",
        ],
      },
      {
        heading: "3. ILS — localiser, glide path & markers",
        figureTopics: ["ILS"],
        points: [
          "The localiser aerial sits about 300 m beyond the upwind end of the runway on the centreline and carries the ILS ident. It radiates two overlapping lobes modulated at 90 Hz and 150 Hz; 150 Hz (blue) predominates to the right of the centreline and 90 Hz (yellow) to the left, and the aircraft centres the needle where the two are equal — on the centreline. Because this is measured from modulation depth, the OBS has no effect on the localiser needle.",
          "The glide-path aerial is offset to one side, about 300 m up from the threshold, and radiates 90 Hz above and 150 Hz below a path that is typically 3°. Full-scale deflection on the glide path is about ±0.7° — far tighter than the localiser, which is why small vertical errors show up quickly.",
          "The marker beacons all transmit on 75 MHz straight up: the outer marker gives low-tone continuous dashes, the middle marker alternating dot-dash of medium tone, and (where fitted) the inner marker high-tone dots. False glide paths exist at multiples of the true angle (the first near 6°) — always intercept the glide path from below. A Category I ILS is protected down to a 200 ft decision height.",
        ],
      },
      {
        heading: "4. Rate of descent on the glide path",
        points: [
          "To stay on a glide path you must match your rate of descent to your groundspeed: ROD (ft/min) ≈ glide-path angle° × groundspeed(kt) × 100 / 60. For the common 3° path this simplifies to the rule of thumb ROD ≈ 5 × groundspeed.",
          "Because the required ROD follows groundspeed, changing wind changes the descent rate needed. As a headwind decreases on the approach (groundspeed rising) you must INCREASE the rate of descent to stay on the path; a strengthening headwind needs a lower ROD.",
        ],
      },
    ],
    mustKnow: [
      "VOR radial = phase difference = a bearing FROM the station (QDR); in phase to magnetic north.",
      "VOR: TO + centred needle = tracking the reciprocal of the radial you are on; ±10° full scale.",
      "Localiser carries the ident; markers all on 75 MHz; glide path full-scale ±0.7°.",
      "ROD ≈ GP° × GS × 100 / 60 (≈ 5 × GS for 3°). Intercept the glide path from below.",
    ],
    traps: [
      "The localiser and glide path ignore the OBS — dialling a wrong course does NOT move those needles.",
      "150 Hz predominant = right of centreline (blue); relate it to runway heading to get east/west.",
      "A reducing headwind needs a HIGHER rate of descent, not lower.",
    ],
  },
  {
    sectionId: "A.10.4",
    title: "DME (Distance Measuring Equipment)",
    intro:
      "DME is secondary radar you carry with you: instead of bouncing a pulse off a passive target, your interrogator sends paired pulses to a ground transponder, which waits a fixed delay and replies on a different frequency. The equipment times the round trip and converts it to distance. It is accurate, immune to most of the propagation errors that plague the ADF, and — paired with a VOR or ILS — gives the position fixes and DME arcs that modern procedures rely on.",
    blocks: [
      {
        heading: "1. Principle of operation",
        figureTopics: ["DME"],
        points: [
          "DME works in the UHF band, 962–1213 MHz. The interrogation and reply frequencies are deliberately offset by 63 MHz so that ground reflections of the aircraft's own interrogation can never be mistaken for a transponder reply.",
          "Each aircraft interrogates at its own randomly jittered pulse-repetition frequency. The transponder replies to everyone, but each interrogator only recognises the replies that come back at its own unique jitter pattern — so many aircraft can share one transponder without confusion.",
          "The ground transponder adds a fixed delay (50 µs on the standard X channel) before replying, which the equipment subtracts before computing range. Distance comes from the remaining round-trip time: range(NM) = 0.162 × (T − 50) / 2, with T the total measured time in microseconds.",
        ],
      },
      {
        heading: "2. Slant range, saturation & modes",
        points: [
          "DME measures SLANT range — the straight-line distance from aircraft to station — not distance over the ground. The difference (slant-range error) is greatest when you are high and close: directly overhead a station at 6000 ft the DME reads about 1 NM, which is your height, not zero. At normal ranges the error is negligible.",
          "A transponder can handle roughly 100 aircraft at once. Beyond that it SATURATES: it raises its threshold (reduces gain) to limit its reply rate, and the weakest, most distant signals are dropped first. This protects the service for nearer aircraft at the cost of range.",
          "When it first comes into range the interrogator sees the transponder's squitter (random filler pulses that keep the transponder active) and comes out of standby to begin searching, then locks on and tracks. Accuracy is about ±0.5 NM or better and DME does not suffer night effect, static or refraction.",
        ],
      },
    ],
    mustKnow: [
      "Interrogation and reply frequencies differ by 63 MHz; band 962–1213 MHz (UHF).",
      "Range = 0.162 × (T − 50) / 2 NM; fixed transponder delay 50 µs.",
      "DME = SLANT range; error worst when high and close.",
      "Transponder saturates above ~100 aircraft (raises threshold / reduces gain).",
    ],
    traps: [
      "Overhead a station the DME shows your height in NM, not zero.",
      "DME is immune to the propagation errors that affect ADF — accuracy ≈ ±0.5 NM.",
      "Each aircraft is recognised by its own jittered PRF, not a frequency of its own.",
    ],
  },
  {
    sectionId: "A.10.5",
    title: "Primary Radar, Ground Radar & SSR",
    intro:
      "Radar — Radio Detection And Ranging — measures range from the time a pulse takes to travel to a target and back, and bearing from the direction the antenna is pointing when the echo returns. Primary radar relies on the energy reflected by the target itself; secondary surveillance radar (SSR) instead asks a transponder in the aircraft to reply, which is far more powerful because the reply is a fresh, coded signal rather than a weak echo. Almost every exam question here comes down to pulse timing, beamwidth and the interrogation/reply pulse scheme.",
    blocks: [
      {
        heading: "1. Primary radar fundamentals",
        figureTopics: ["Primary radar & SSR"],
        points: [
          "The pulse-repetition frequency (PRF) sets the MAXIMUM unambiguous range — each pulse must return before the next is transmitted, otherwise a late echo is read against the wrong pulse. A lower PRF gives longer range; a higher PRF gives better low-range performance but shorter maximum range.",
          "Pulse width (duration) sets the MINIMUM range (the set is deaf while transmitting) and the range resolution — two targets closer together than half the pulse length merge into one. Beamwidth sets the bearing (azimuth) discrimination: a narrow beam separates targets that are close in bearing and gives a sharper position.",
          "Received power falls off as the fourth power of range (range⁴) because the beam spreads going out AND the echo spreads coming back, so doubling the detection range needs sixteen times the transmitter power. Range from timing: range(NM) = 0.081 × T(µs), i.e. about 12.35 µs per nautical mile for the round trip.",
        ],
      },
      {
        heading: "2. Secondary Surveillance Radar (SSR)",
        figureTopics: ["SSR"],
        points: [
          "The ground interrogator transmits on 1030 MHz; the airborne transponder replies on 1090 MHz. Because the reply is a transmitted coded pulse train, not a passive echo, SSR needs far less power, gives positive identification, and can carry data (the squawk code and, in Mode C, altitude).",
          "Interrogation mode is set by the spacing between pulses P1 and P3: Mode A (8 µs) asks for the identity/squawk code, Mode C (21 µs) asks for pressure altitude. A control pulse P2 radiated through a near-omnidirectional pattern lets the transponder suppress replies to the interrogator's side-lobes, so only aircraft in the main beam reply (side-lobe suppression).",
          "Mode S is selective: each aircraft has a unique 24-bit address, so the ground can interrogate one specific aircraft, reducing clutter ('garbling' and 'fruit') and supporting data link and ACAS/TCAS. The emergency squawks are 7500 (unlawful interference/hijack), 7600 (radio failure) and 7700 (general emergency) — 'seven-five been taken alive, seven-six radio's in a fix, seven-seven going to heaven'.",
        ],
      },
    ],
    mustKnow: [
      "PRF sets maximum range; pulse width sets minimum range & resolution; beamwidth sets bearing discrimination.",
      "Primary radar power varies as range⁴ — double the range needs ×16 power.",
      "SSR: interrogate 1030 MHz, reply 1090 MHz; Mode A = ident, Mode C = altitude, Mode S = selective.",
      "Squawks: 7500 hijack, 7600 radio failure, 7700 emergency.",
    ],
    traps: [
      "A narrower beam improves BEARING discrimination; shorter pulse improves RANGE resolution — don't swap them.",
      "P2 (control pulse) enables side-lobe suppression; it is not an interrogation mode.",
      "Mode C sends pressure (1013) altitude regardless of your altimeter sub-scale setting.",
    ],
  },
  {
    sectionId: "A.10.6",
    title: "Airborne Weather Radar",
    intro:
      "Airborne weather radar is a primary radar carried in the nose that paints precipitation ahead of the aircraft, letting the crew see and avoid thunderstorms, heavy rain and (in mapping mode) terrain and coastlines. It detects water droplets — the bigger and more numerous the drops, the stronger the echo — so it is really a map of rainfall rate, which the crew interprets as turbulence and storm severity.",
    blocks: [
      {
        heading: "1. What it detects and how it is displayed",
        figureTopics: ["Weather radar"],
        points: [
          "The radar returns are strongest from large water droplets; it therefore shows areas of heavy precipitation, not cloud as such. Dry, frozen or very small particles reflect poorly, so thin cloud, ice crystals and clear-air turbulence can be invisible — an important limitation.",
          "Returns are displayed in colour by intensity: typically black (little or no return) through green and yellow to red for the heaviest rainfall, with magenta used for turbulence on sets with that feature. Rapidly changing colour gradients (tight packing of the bands) indicate strong up/down-draughts and the worst turbulence.",
          "Contour mode blanks the centre of the strongest returns to a hole, so a 'contoured' cell with steep edges flags the most dangerous area to avoid. Give the greatest berth to cells with sharp gradients, scalloped or hooked edges, or fast-growing tops.",
        ],
      },
      {
        heading: "2. Beams, tilt and operating technique",
        points: [
          "A narrow pencil beam is used for weather, concentrating energy to probe cells at range. For ground mapping a fan-shaped cosecant-squared beam spreads energy so that near and far ground return at similar strength, giving an even picture of terrain and coastlines.",
          "Tilt control aims the beam up or down. Correct tilt keeps the beam on the weather at range without either overshooting cells (tilt too high) or filling the screen with ground return (tilt too low). Scanning with tilt helps judge the vertical extent and tops of a cell.",
          "Beware attenuation (the 'radar shadow'): a strong near cell absorbs the beam so that a second, equally strong cell behind it shows weak or not at all. A weak return directly behind a strong one may be hiding severe weather — never fly into the shadow of a strong cell.",
        ],
      },
    ],
    mustKnow: [
      "Weather radar paints PRECIPITATION (large water drops), not cloud; ice/small particles reflect poorly.",
      "Colour = intensity: green→yellow→red (→magenta turbulence); tight gradients = worst turbulence.",
      "Pencil beam for weather; cosecant² (fan) beam for ground mapping.",
      "Attenuation/shadow: a strong cell can hide an equally dangerous cell behind it.",
    ],
    traps: [
      "No return does not mean no cloud or no turbulence — dry/icy air and CAT are poorly detected.",
      "A weak echo directly behind a strong cell may be attenuation — give it a wide berth.",
      "Wrong tilt fills the screen with ground return and masks the weather.",
    ],
  },
  {
    sectionId: "A.10.7",
    title: "Secondary Surveillance Radar (SSR)",
    intro:
      "SSR deserves its own treatment because modern air traffic control is built on it. Rather than straining to see a faint echo, the ground station interrogates a transponder in the aircraft, which answers with a coded pulse train that carries the aircraft's identity and altitude. The result is a strong, reliable, labelled return that supports the altitude read-outs, conflict alerting and collision-avoidance systems controllers and crews depend on.",
    blocks: [
      {
        heading: "1. Interrogation, reply and modes",
        figureTopics: ["SSR"],
        points: [
          "Interrogations go out on 1030 MHz and replies come back on 1090 MHz. The interrogation mode is coded by the spacing of pulses P1 and P3: Mode A (8 µs) requests the 4-digit octal identity code; Mode C (21 µs) requests pressure altitude in 100 ft increments, always referenced to 1013.25 hPa regardless of the altimeter sub-scale.",
          "A separate control pulse, P2, is radiated through a near-omnidirectional pattern. A transponder compares P2 with P1: if P2 is the stronger (meaning the interrogation arrived via a side lobe, not the main beam) it suppresses its reply. This side-lobe suppression stops false returns from aircraft that are not actually in the beam.",
          "Mode S addresses each aircraft individually through a unique 24-bit address, so the ground can poll one specific aircraft. This cuts garbling (overlapping replies) and 'fruit' (replies meant for other interrogators), and provides the data link that underpins enhanced surveillance and ACAS II / TCAS.",
        ],
      },
      {
        heading: "2. Codes, limitations & TCAS",
        points: [
          "The pilot sets the assigned squawk on the transponder and selects ALT (Mode C) so that altitude is reported. Conspicuity and emergency codes: 7500 = unlawful interference (hijack), 7600 = radio communication failure, 7700 = general emergency; 2000 is often the default for uncontrolled airspace entry unless otherwise assigned.",
          "SSR limitations include garbling when two aircraft at similar range and bearing reply together, and over-interrogation of a transponder by many ground stations. Mode S and monopulse techniques largely overcome these.",
          "TCAS/ACAS uses the same 1030/1090 MHz transponder scheme to interrogate nearby aircraft directly, compute closing geometry, and issue Traffic Advisories and coordinated Resolution Advisories — it depends on other aircraft having at least a Mode C (for TA) or Mode S (for full RA coordination) transponder switched on.",
        ],
      },
    ],
    mustKnow: [
      "Interrogate 1030 MHz, reply 1090 MHz; Mode A = ident, Mode C = altitude (always 1013 referenced), Mode S = selective address.",
      "P2 enables side-lobe suppression (reply only in the main beam).",
      "7500 hijack, 7600 radio failure, 7700 emergency; select ALT for Mode C.",
      "TCAS/ACAS uses the transponder; needs other aircraft transponding to work.",
    ],
    traps: [
      "Mode C altitude is ALWAYS referenced to 1013.25 hPa, not to your QNH setting.",
      "Side-lobe suppression comes from comparing P2 with P1 — it is not an interrogation mode.",
      "Turning the transponder to standby makes you invisible to TCAS-equipped traffic.",
    ],
  },
  {
    sectionId: "A.10.8",
    title: "Airborne Weather Radar — Operational Use",
    intro:
      "Having covered how weather radar works, this section is about flying with it: how to set it up, interpret the picture in real time, and make avoidance decisions. The radar is only as good as the operator — correct gain, tilt and range selection, and a healthy respect for its blind spots, are what turn a colourful display into a safe track through convective weather.",
    blocks: [
      {
        heading: "1. Setting up and scanning",
        figureTopics: ["Weather radar"],
        points: [
          "Select a range appropriate to the task: a long range to plan a deviation around a line of cells well ahead, a shorter range to study the detail and gaps as you approach. Keep gain in the calibrated (automatic) position for weather so that colours mean the standard intensities; manual gain is for special techniques only.",
          "Use tilt actively. Tilt up to confirm the tops of a cell and whether you can out-climb it; tilt down to check how far a cell extends toward the surface and to pick out ground return for orientation. A cell that still paints red when you tilt well up has great vertical extent and must be avoided by a wide margin.",
          "Scan across the whole frontal area, not just dead ahead, so you can plan a deviation early. The smoothest, safest routing is usually upwind of a cell (into the direction it is moving from), avoiding the hail and turbulence thrown downwind.",
        ],
      },
      {
        heading: "2. Avoidance rules and traps",
        points: [
          "Avoid the heaviest returns by a wide margin — a common rule is at least 20 NM from a cell top that reaches the tropopause, and more at high level where storms are most violent. Steep colour gradients, hooks, scalloped edges and 'fingers' mark the most dangerous areas.",
          "Remember what the radar cannot show: dry hail, clear-air turbulence, and the turbulence in the clear air around and above a cell. Visual lightning and a ride report can reveal hazards the screen misses.",
          "Guard against attenuation: a strong near cell casts a radar shadow in which a second cell, just as dangerous, shows weak or not at all. Treat any suspiciously clear area directly behind a strong return as potentially hazardous and route around, not through, the line.",
        ],
      },
    ],
    mustKnow: [
      "Keep gain calibrated/auto for weather so colours mean standard intensities.",
      "Tilt up to read tops/vertical extent, tilt down to check depth and get ground orientation.",
      "Avoid severe cells by a wide margin (≈20 NM at high level); deviate early and upwind.",
      "The radar misses dry hail, CAT and clear-air turbulence around cells.",
    ],
    traps: [
      "A clear area directly behind a strong cell may be a radar shadow hiding worse weather.",
      "Manual gain can make a dangerous cell look benign — use calibrated gain for avoidance.",
      "Deviating downwind of a storm runs you into hail and the strongest turbulence.",
    ],
  },
  {
    sectionId: "A.10.9",
    title: "Radio Altimeter",
    intro:
      "The radio (radar) altimeter is the only instrument that measures the aircraft's actual height above the ground directly, by timing a radio signal bounced off the surface straight below. Unlike the pressure altimeter it needs no sub-scale setting and is unaffected by temperature or pressure, which is why it drives the decision height on precision approaches, the automatic call-outs in the flare, and the ground-proximity and auto-land systems.",
    blocks: [
      {
        heading: "1. Principle and display",
        figureTopics: ["Radio altimeter"],
        points: [
          "It operates in the 4200–4400 MHz band and uses frequency-modulated continuous-wave (FM-CW), not pulses. The transmitter sweeps its frequency continuously; by the time the reflected signal returns, the transmitter is on a slightly different frequency, and the difference (Δf) between transmitted and received signals is proportional to the time of flight and therefore to the height above the surface.",
          "It reads true height above ground level (AGL), usually over the range 0–2500 ft, and is most accurate close to the ground where it matters most. Because it measures to the surface directly below, it responds to the actual terrain — height increases over a valley and decreases over a ridge.",
          "The display shows the height AGL with a pilot-settable Decision Height bug; reaching the set height triggers an aural and visual warning. On modern aircraft the radio altimeter also feeds the automatic height call-outs during the flare and the inputs to EGPWS and autoland.",
        ],
      },
      {
        heading: "2. Use and limitations",
        points: [
          "On a precision approach the radio altimeter gives the Decision Height, measured above the actual ground at the threshold, where the pressure altimeter would give height above a datum. It is the authoritative height reference in the final stages of the approach.",
          "Its indication is height above the terrain immediately below, so over uneven ground on the approach the reading can change rapidly — crews cross-check it against the expected profile rather than chasing every fluctuation.",
          "It is a low-level instrument only: beyond its design ceiling (around 2500 ft) it drops out and the pressure altimeter remains the sole height reference. Its accuracy and the fixed antenna-to-wheel offset are accounted for in the aircraft's approach limits.",
        ],
      },
    ],
    mustKnow: [
      "Radio altimeter uses FM-CW at 4200–4400 MHz; height from the frequency difference Δf.",
      "Reads true height AGL, typically 0–2500 ft; most accurate near the ground.",
      "Provides the Decision Height on precision approaches and feeds EGPWS/autoland.",
      "No sub-scale setting; unaffected by pressure/temperature.",
    ],
    traps: [
      "It reads height above the ground directly below, so terrain changes the indication — it is not a pressure altitude.",
      "Above about 2500 ft it is out of range; the pressure altimeter takes over.",
      "FM-CW (continuous wave), not a pulse radar — don't confuse it with DME-style pulse timing.",
    ],
  },
  {
    sectionId: "A.10.10",
    title: "Emergency Locator Transmitter (ELT)",
    intro:
      "An ELT is a self-contained, battery-powered beacon that transmits a distress signal to help search-and-rescue find a downed aircraft. Modern units broadcast a digital burst on 406 MHz that satellites receive and decode — giving the aircraft's identity and, with GPS, its position — together with a homing tone on 121.5 MHz that rescuers use to walk or fly the last distance to the wreck.",
    blocks: [
      {
        heading: "1. Frequencies and the Cospas-Sarsat system",
        figureTopics: ["ELT"],
        points: [
          "The primary distress frequency is 406 MHz, a short digital transmission detected and located by the Cospas-Sarsat satellite constellation. The coded message carries a unique beacon identity (registered to the aircraft/operator) and, if the ELT is GPS-equipped, an accurate position — dramatically cutting search time.",
          "121.5 MHz (and, for military, 243.0 MHz) is retained as a low-power homing/aural signal: an easily recognised downward-swept audio tone that SAR aircraft and ground teams home on over the last leg. Since 2009 satellites no longer monitor 121.5 MHz, so it is a homing aid, not the primary alert.",
          "ELTs may activate automatically on crash impact (a g-switch), or manually by a cockpit or beacon switch. Portable versions (personal locator beacons / survival ELTs) can be taken from the aircraft and operated by survivors.",
        ],
      },
      {
        heading: "2. Testing, false alarms and carriage",
        points: [
          "Routine testing is restricted to protect the distress frequencies: tests are made only in the first five minutes of each hour and for a few seconds, per the operating instructions, to avoid triggering a false SAR response.",
          "A high proportion of ELT activations are false alarms (hard landings, maintenance, inadvertent switching). If you hear the 121.5 MHz tone, report it; if your own ELT may have fired, check it and advise ATC so a needless search is not launched.",
          "The battery has a limited life and a marked replacement date, and the beacon must be registered so that the 406 MHz identity leads SAR straight to the operator's contact and aircraft details.",
        ],
      },
    ],
    mustKnow: [
      "ELT alerts on 406 MHz (satellite, digital, coded identity + optional GPS position).",
      "121.5 MHz (243.0 military) is the low-power homing/aural tone (downward sweep).",
      "Satellites stopped monitoring 121.5 MHz in 2009 — 406 MHz is the alerting channel.",
      "Activates automatically on impact (g-switch) or manually; may be portable.",
    ],
    traps: [
      "Test only within the first 5 minutes of the hour, for a few seconds, to avoid false alerts.",
      "Most ELT activations are false alarms — report and cancel promptly.",
      "121.5 MHz is for homing, not satellite alerting; the coded alert is on 406 MHz.",
    ],
  },
  {
    sectionId: "A.10.11",
    title: "Area Navigation (RNAV)",
    intro:
      "Area navigation frees an aircraft from flying directly over ground beacons. An RNAV system computes the aircraft's position from one or more sensors and lets the crew fly any desired track within the coverage of those aids, defined by a string of waypoints rather than a chain of VORs. The simplest form derives position from a single VOR/DME (Rho-Theta); modern systems blend GNSS, DME/DME and inertial data to achieve tight, continuously monitored accuracy.",
    blocks: [
      {
        heading: "1. How RNAV builds a position and a track",
        figureTopics: ["RNAV"],
        points: [
          "A basic Rho-Theta RNAV takes a bearing (Theta) from a VOR and a distance (Rho) from a co-located DME and solves the triangle to fix the aircraft, then computes track and distance to a phantom waypoint defined relative to that station. The crew flies to the waypoint, not to the beacon.",
          "The navigation computer continuously resolves position and presents deviation from the planned track on a CDI or map display — but crucially the CDI reads in nautical miles of cross-track error, not degrees, so sensitivity is constant regardless of distance from a station.",
          "More capable systems fix position from multiple DMEs (DME/DME), from GNSS, or from inertial reference units, selecting and blending the best available sensors and flying a coded route of waypoints from the flight-management database.",
        ],
      },
      {
        heading: "2. RNAV accuracy standards (RNP)",
        points: [
          "RNAV specifications are stated as the lateral accuracy the system must keep for 95% of the flight time. Typical en-route values are B-RNAV (RNAV 5) ±5 NM and P-RNAV (RNAV 1) ±1 NM; terminal and approach specifications are tighter still.",
          "Required Navigation Performance (RNP) adds on-board performance monitoring and alerting: an RNP system not only meets an accuracy but continuously checks that it is meeting it and warns the crew if it cannot — the key difference from plain RNAV.",
          "Approach RNAV typically narrows full-scale CDI deflection to about 1.25 NM and requires the aircraft to be within a set distance of the reference facilities; GNSS-based approaches may use RAIM or SBAS to provide the required integrity.",
        ],
      },
    ],
    mustKnow: [
      "Basic RNAV solves a Rho-Theta (DME range + VOR bearing) triangle to a phantom waypoint.",
      "RNAV CDI reads NAUTICAL MILES of cross-track error, not degrees.",
      "B-RNAV (RNAV 5) ±5 NM; P-RNAV (RNAV 1) ±1 NM, 95% of flight time.",
      "RNP = RNAV plus on-board performance monitoring and alerting.",
    ],
    traps: [
      "RNAV accuracy is a 95% lateral figure — not a guaranteed maximum error.",
      "The RNAV CDI's constant NM sensitivity differs from a VOR CDI, whose degrees spread with distance.",
      "Only RNP (not plain RNAV) guarantees it will alert you when accuracy is lost.",
    ],
  },
  {
    sectionId: "A.10.12",
    title: "GNSS / GPS",
    intro:
      "GNSS — of which GPS is the best-known constellation — fixes position by measuring the aircraft's distance from several satellites whose positions are known precisely. Each satellite broadcasts the exact time and its orbital data; the receiver measures how long each signal took to arrive, turns that into a range, and intersects the ranges to compute a three-dimensional position. It is the backbone of modern RNAV, but its accuracy and, above all, its integrity have to be understood to use it safely.",
    blocks: [
      {
        heading: "1. Ranging and the position fix",
        figureTopics: ["GNSS / GPS"],
        points: [
          "GNSS has three segments: the space segment (the satellite constellation), the control segment (ground stations that track the satellites and update their clocks and orbital data), and the user segment (the aircraft receiver). GPS satellites orbit at about 20 200 km in several planes so that enough are always in view.",
          "Each satellite transmits its precise time and ephemeris (orbit) data. The receiver measures the signal's travel time, multiplies by the speed of light to get the range to that satellite, and does this for several satellites at once; the point where the range spheres intersect is the receiver's position.",
          "A minimum of three satellites fixes a two-dimensional position, but because the receiver's own clock is not perfect a fourth satellite is needed to solve for time as well and give a reliable three-dimensional (latitude, longitude, altitude) fix. More satellites, well spread across the sky, improve the solution.",
        ],
      },
      {
        heading: "2. Errors, geometry and integrity",
        points: [
          "Error sources include satellite clock and ephemeris errors, ionospheric and tropospheric delays that slow the signal, receiver noise, and multipath (signals reflected off the airframe or ground). Most are small and partly correctable, but they set the baseline accuracy.",
          "Satellite geometry matters as much as the number of satellites: when the satellites used are well spread across the sky the fix is strong (low Geometric Dilution of Precision, GDOP); when they are clustered together the same range errors produce a much larger position error (high GDOP).",
          "Integrity — timely warning when the system should not be used — is provided by RAIM (Receiver Autonomous Integrity Monitoring), which uses extra satellites to cross-check the fix and flag or exclude a faulty one, or by augmentation systems (SBAS such as WAAS/EGNOS, or GBAS) that broadcast corrections and integrity data to support precision-like approaches.",
        ],
      },
    ],
    mustKnow: [
      "Three segments: space (satellites), control (ground), user (receiver).",
      "Position by ranging: travel time × c = range; intersect several ranges.",
      "3 satellites give 2D; a 4th resolves receiver clock error for a 3D fix.",
      "Good geometry = low GDOP; integrity from RAIM or augmentation (SBAS/GBAS).",
    ],
    traps: [
      "A 3D fix needs FOUR satellites (the extra one solves the clock), not three.",
      "Many satellites clustered together (high GDOP) still give a poor fix — spread matters.",
      "GPS gives accuracy, but it is RAIM/augmentation that gives the INTEGRITY needed for IFR.",
    ],
  },
];

export function getRadioNavNoteBySection(sectionId: string): AirLawSectionNote | undefined {
  return RADIONAV_NOTES.find((n) => n.sectionId === sectionId);
}
