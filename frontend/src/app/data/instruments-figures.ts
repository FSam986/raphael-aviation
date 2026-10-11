// Flight Instruments (A.7) recreated illustrations (CPL Instrumentation figure
// library — already clean, no baked captions). Shown INLINE in the study slide
// deck next to the relevant topic. Each figure's `topic` must match a figureTopics
// entry on a NoteBlock in instruments-notes.ts. Files: /public/figures/instruments/
// as fig_CC_NN.png. Chapters outside the CPL A.7 syllabus (INS, IRS, Basic
// Computers, FANS) are not included.

export interface InsFigureMeta {
  section: string;
  topic: string;
  title: string;
  caption: string;
  file: string;
  id: string;
  folder: string;
}

const I = (section: string, topic: string, n: string, title: string): InsFigureMeta => ({
  section, topic, title, caption: topic, file: `fig_${n}.png`, id: `insfig-${n}`, folder: "instruments",
});

export const INSTRUMENTS_FIGURES: InsFigureMeta[] = [
  // Ch1 — Characteristics & general definitions (A.7.1)
  I("A.7.1", "Instrument displays & scales", "01_01", "Linear circular scale"),
  I("A.7.1", "Instrument displays & scales", "01_02", "Non-linear circular scale"),
  I("A.7.1", "Instrument displays & scales", "01_03", "Single-pointer airspeed with drum"),
  I("A.7.1", "Instrument displays & scales", "01_04", "Pointer + counter airspeed display"),
  I("A.7.1", "Instrument displays & scales", "01_05", "Revolution counter (RPM %)"),
  I("A.7.1", "Instrument displays & scales", "01_07", "The 'basic six' layout"),
  I("A.7.1", "Instrument displays & scales", "01_08", "The 'basic T' layout"),
  I("A.7.1", "Instrument displays & scales", "01_09", "Light-twin instrument panel (Seneca)"),
  I("A.7.1", "Instrument displays & scales", "01_10", "An analogue altimeter"),
  I("A.7.1", "Instrument displays & scales", "01_11", "Combined digital/analogue display"),
  I("A.7.1", "Instrument displays & scales", "01_12", "Traditional analogue flight deck"),
  I("A.7.1", "Instrument displays & scales", "01_13", "Modern glass flight deck (B787)"),
  I("A.7.1", "Instrument displays & scales", "01_14", "Electronic panel — light aircraft"),
  I("A.7.1", "Instrument displays & scales", "01_15", "Colour operating ranges on gauges"),

  // Ch2 — Pitot & static sources (A.7.1)
  I("A.7.1", "Pitot-static system", "02_01", "Pressure heads — pitot vs static"),
  I("A.7.1", "Pitot-static system", "02_02", "Combined pitot/static head (cutaway)"),
  I("A.7.1", "Pitot-static system", "02_04", "Flush static vent"),
  I("A.7.1", "Pitot-static system", "02_05", "Pitot/static probe installation"),
  I("A.7.1", "Pitot-static system", "02_06", "Static source selector valves (normal/alternate)"),

  // Ch3 — Air temperature measurement (A.7.5)
  I("A.7.5", "Temperature measurement", "03_01", "Bimetallic strip (Invar/brass)"),
  I("A.7.5", "Temperature measurement", "03_02", "Bimetallic-helix thermometer"),
  I("A.7.5", "Temperature measurement", "03_03", "Windscreen direct-reading OAT gauge"),
  I("A.7.5", "Temperature measurement", "03_04", "TAT probe construction"),
  I("A.7.5", "Temperature measurement", "03_05", "TAT probe installed"),
  I("A.7.5", "Temperature measurement", "03_06", "Aspirated TAT probe"),
  I("A.7.5", "Temperature measurement", "03_07", "Ram rise — SAT, RAT & TAT vs speed"),
  I("A.7.5", "Temperature measurement", "03_08", "Temp-rise correction on the flight computer"),
  I("A.7.5", "Temperature measurement", "03_09", "Kelvin scale with SAT/TAT example"),
  I("A.7.5", "Temperature measurement", "03_10", "ISA temperature vs altitude"),

  // Ch4 — Airspeed indicator (A.7.1)
  I("A.7.1", "Airspeed indicator", "04_01", "ASI mechanism (dynamic pressure)"),
  I("A.7.1", "Airspeed indicator", "04_02", "ASI colour code & V-speeds"),

  // Ch5 — The pressure altimeter (A.7.1)
  I("A.7.1", "Altimeter", "05_01", "Altimeter datums — QNE/QNH/QFE"),
  I("A.7.1", "Altimeter", "05_02", "Simple altimeter mechanism"),
  I("A.7.1", "Altimeter", "05_03", "Sensitive altimeter mechanism"),
  I("A.7.1", "Altimeter", "05_04", "Three-pointer altimeter face & subscale"),
  I("A.7.1", "Altimeter", "05_06", "Altitude tape on an EFIS display"),
  I("A.7.1", "Altimeter", "05_07", "Servo altimeter (E/I bar, servo motor)"),
  I("A.7.1", "Altimeter", "05_08", "High-to-low pressure error"),
  I("A.7.1", "Altimeter", "05_09", "Blocked static freezes the altimeter"),

  // Ch6 — Vertical speed indicator (A.7.1)
  I("A.7.1", "Vertical speed indicator", "06_01", "VSI mechanism (level flight)"),
  I("A.7.1", "Vertical speed indicator", "06_02", "VSI in a descent"),
  I("A.7.1", "Vertical speed indicator", "06_03", "VSI in a climb"),
  I("A.7.1", "Vertical speed indicator", "06_04", "VSI instrument face"),
  I("A.7.1", "Vertical speed indicator", "06_05", "IVSI — accelerometer dashpots"),

  // Ch7 — The machmeter (A.7.1)
  I("A.7.1", "Machmeter", "07_03", "CAS, TAS & Mach vs speed"),
  I("A.7.1", "Machmeter", "07_06", "Combined airspeed/Mach indicator (VMO)"),
  I("A.7.1", "Machmeter", "07_07", "Machmeter with Mach & knots counters"),

  // Ch8 — Air data computer (A.7.1)
  I("A.7.1", "Air data computer", "08_01", "Air data system — inputs & outputs"),
  I("A.7.1", "Air data computer", "08_02", "Air data computer servo mechanism"),
  I("A.7.1", "Air data computer", "08_03", "Dual ADC architecture with standby instruments"),

  // Ch9 — Terrestrial magnetism (A.7.7)
  I("A.7.7", "Terrestrial magnetism", "09_02", "Bar magnet field"),
  I("A.7.7", "Terrestrial magnetism", "09_03", "Magnetising a bar by stroking"),
  I("A.7.7", "Terrestrial magnetism", "09_05", "A magnet as aligned molecular magnets"),
  I("A.7.7", "Terrestrial magnetism", "09_06", "Earth as a tilted bar magnet"),
  I("A.7.7", "Terrestrial magnetism", "09_07", "Variation (true vs magnetic meridian)"),
  I("A.7.7", "Terrestrial magnetism", "09_08", "Magnetic dip — H, Z & T components"),
  I("A.7.7", "Terrestrial magnetism", "09_09", "Dip varies with magnetic latitude"),

  // Ch10 — Direct indicating compass (A.7.2)
  I("A.7.2", "Direct-indicating compass", "10_01", "Direct-reading compass cutaway"),
  I("A.7.2", "Direct-indicating compass", "10_02", "Forces on the pendulous magnet (R, W, Z)"),
  I("A.7.2", "Direct-indicating compass", "10_03", "Pendulous suspension (side view)"),
  I("A.7.2", "Direct-indicating compass", "10_06", "Magnet pivot & card movement"),

  // Ch11 — Gyroscopes (A.7.2)
  I("A.7.2", "Gyroscope fundamentals", "11_01", "The spinning gyro rotor"),
  I("A.7.2", "Gyroscope fundamentals", "11_04", "Rotor in gimbals (frame, inner, outer)"),
  I("A.7.2", "Gyroscope fundamentals", "11_05", "Precession — torque acts 90° on"),
  I("A.7.2", "Gyroscope fundamentals", "11_06", "Gyroscopic precession demonstration"),
  I("A.7.2", "Gyroscope fundamentals", "11_10", "Apparent wander on the rotating Earth"),
  I("A.7.2", "Gyroscope fundamentals", "11_12", "Earth-rate wander near the pole"),
  I("A.7.2", "Gyroscope fundamentals", "11_13", "Transport wander"),
  I("A.7.2", "Gyroscope fundamentals", "11_14", "Single-gimbal (rate) gyro"),

  // Ch12 — Directional gyro indicator (A.7.2)
  I("A.7.2", "Directional gyro", "12_01", "DGI construction"),
  I("A.7.2", "Directional gyro", "12_03", "Air-driven gyro rotor"),
  I("A.7.2", "Directional gyro", "12_06", "Gyro erection (force → 90° precession)"),
  I("A.7.2", "Directional gyro", "12_07", "DGI heading card"),
  I("A.7.2", "Directional gyro", "12_08", "DGI apparent wander (Earth rotation)"),
  I("A.7.2", "Directional gyro", "12_10", "DGI apparent wander at high latitude"),
  I("A.7.2", "Directional gyro", "12_13", "Gyro wander vs latitude"),

  // Ch13 — The artificial horizon (A.7.2)
  I("A.7.2", "Artificial horizon", "13_01", "Artificial horizon face"),
  I("A.7.2", "Artificial horizon", "13_03", "AH indicating a climb"),
  I("A.7.2", "Artificial horizon", "13_04", "AH indicating a bank"),
  I("A.7.2", "Artificial horizon", "13_05", "AH construction (cutaway)"),
  I("A.7.2", "Artificial horizon", "13_06", "Pendulous-vane erection unit"),
  I("A.7.2", "Artificial horizon", "13_07", "Vane erection reaction force"),
  I("A.7.2", "Artificial horizon", "13_09", "AH acceleration error"),
  I("A.7.2", "Artificial horizon", "13_10", "Electric AH (pitch torque motor)"),
  I("A.7.2", "Artificial horizon", "13_11", "Remote servo-driven horizon"),

  // Ch14 — Turn & slip indicator (A.7.2)
  I("A.7.2", "Turn & slip / coordinator", "14_01", "Turn-indicator rate gyro"),
  I("A.7.2", "Turn & slip / coordinator", "14_02", "Rate gyro — 90° precession vs scale"),
  I("A.7.2", "Turn & slip / coordinator", "14_03", "Level flight — lift balances weight"),
  I("A.7.2", "Turn & slip / coordinator", "14_04", "Balance ball (slip indicator)"),
  I("A.7.2", "Turn & slip / coordinator", "14_05", "Forces in a banked turn"),
  I("A.7.2", "Turn & slip / coordinator", "14_06", "Ball centred in a balanced turn"),
  I("A.7.2", "Turn & slip / coordinator", "14_07", "Ball off-centre — slip/skid"),
  I("A.7.2", "Turn & slip / coordinator", "14_09", "Turn & slip indicator face"),

  // Ch15 — Turn coordinator (A.7.2)
  I("A.7.2", "Turn & slip / coordinator", "15_01", "Turn coordinator face"),

  // Ch16 — Aircraft magnetism (A.7.7)
  I("A.7.7", "Aircraft magnetism", "16_01", "Deviation — magnetic vs compass heading"),
  I("A.7.7", "Aircraft magnetism", "16_02", "Hard-iron magnetism components (plan)"),
  I("A.7.7", "Aircraft magnetism", "16_03", "Vertical hard-iron component & compass bowl"),
  I("A.7.7", "Aircraft magnetism", "16_04", "Deviation varies with heading (coefficients)"),

  // Ch17 — Remote indicating magnetic compass (A.7.2)
  I("A.7.2", "Remote-indicating compass", "17_04", "Flux-valve signal vs heading"),
  I("A.7.2", "Remote-indicating compass", "17_05", "Flux valve — exciter & secondary windings"),
  I("A.7.2", "Remote-indicating compass", "17_07", "Flux-valve output waveforms"),
  I("A.7.2", "Remote-indicating compass", "17_10", "Flux valve wired to the receiver synchro"),
  I("A.7.2", "Remote-indicating compass", "17_11", "Remote compass / HSI display"),

  // Ch20 — Radio altimeter (A.7.3)
  I("A.7.3", "Radio altimeter", "20_01", "Radio altimeter FM-CW principle"),
  I("A.7.3", "Radio altimeter", "20_02", "Radio altimeter dial"),
  I("A.7.3", "Radio altimeter", "20_03", "Radio altitude on the EADI (autoland)"),
  I("A.7.3", "Radio altimeter", "20_04", "Radio-altitude arc on EFIS"),
  I("A.7.3", "Radio altimeter", "20_06", "Radio altitude on the PFD"),
  I("A.7.3", "Radio altimeter", "20_07", "Radio altimeter residual height"),

  // Ch21 — Flight management system (A.7.3)
  I("A.7.3", "EFIS & FMS", "21_01", "FMS / FMC architecture"),
  I("A.7.3", "EFIS & FMS", "21_02", "FMS control display unit (CDU)"),

  // Ch22 — Electronic flight information systems (A.7.3)
  I("A.7.3", "EFIS & FMS", "22_01", "EFIS architecture (symbol generators)"),
  I("A.7.3", "EFIS & FMS", "22_02", "EFIS control panel"),
  I("A.7.3", "EFIS & FMS", "22_05", "Complete EFIS — PFD, ND & control panel"),
  I("A.7.3", "EFIS & FMS", "22_06", "Electronic HSI — full rose"),
  I("A.7.3", "EFIS & FMS", "22_07", "Electronic HSI — arc mode with weather"),
  I("A.7.3", "EFIS & FMS", "22_10", "Navigation display — map mode"),

  // Ch25 — Flight director systems (A.7.3 / A.7.6)
  I("A.7.3", "Flight director", "25_01", "Flight director system architecture"),
  I("A.7.3", "Flight director", "25_03", "Flight director on the PFD"),
  I("A.7.3", "HSI", "25_04", "HSI face explained"),
  I("A.7.6", "Autopilot", "25_06", "Autopilot/FD mode control panel (MCP)"),
  I("A.7.3", "Flight director", "25_07", "FD command bars — climb"),
  I("A.7.3", "Flight director", "25_08", "FD command bars — altitude hold"),
  I("A.7.3", "Flight director", "25_09", "ILS glideslope geometry"),

  // Ch26 — Autopilot (A.7.6)
  I("A.7.6", "Autopilot", "26_01", "Closed-loop control principle"),
  I("A.7.6", "Autopilot", "26_03", "Autopilot servo loop → control surface"),
  I("A.7.6", "Autopilot", "26_04", "Autopilot inner & outer loops"),
  I("A.7.6", "Autopilot", "26_05", "A/P actuator in parallel"),
  I("A.7.6", "Autopilot", "26_06", "A/P actuator in series"),
  I("A.7.6", "Autopilot", "26_07", "Autopilot engage-interlock chain"),
  I("A.7.6", "Autopilot", "26_10", "PFD autopilot/FMA annunciations"),
  I("A.7.6", "Autopilot", "26_11", "Flight mode annunciator (FMA) explained"),
  I("A.7.6", "Autopilot", "26_12", "Dual-channel autopilot architecture"),

  // Ch27–28 — Autoland & autothrottle (A.7.6)
  I("A.7.6", "Autoland & autothrottle", "27_01", "Autoland approach sequence"),
  I("A.7.6", "Autoland & autothrottle", "27_02", "ILS/autoland categories & minima"),
  I("A.7.6", "Autoland & autothrottle", "28_01", "Autothrottle system architecture"),

  // Ch29 — Yaw dampers (A.7.6)
  I("A.7.6", "Autopilot", "29_01", "Dutch roll — stable/neutral/unstable"),
  I("A.7.6", "Autopilot", "29_02", "Dutch roll yaw-roll coupling"),
  I("A.7.6", "Autopilot", "29_04", "Yaw damper washout filter"),
  I("A.7.6", "Autopilot", "29_05", "Yaw damper signal chain"),

  // Ch32 — Flight warning systems (A.7.8)
  I("A.7.8", "Stall & flight warnings", "32_01", "Flight warning display layout (ECAM)"),
  I("A.7.8", "Stall & flight warnings", "32_02", "Central warning system architecture"),
  // Ch33 — Aerodynamic warnings (A.7.8)
  I("A.7.8", "Stall & flight warnings", "33_01", "Altitude alerting"),
  I("A.7.8", "Stall & flight warnings", "33_02", "Altitude alert module"),
  I("A.7.8", "Stall & flight warnings", "33_04", "VMO & high-speed buffet on the speed tape"),
  I("A.7.8", "Stall & flight warnings", "33_05", "Stall warning system architecture"),
  I("A.7.8", "Stall & flight warnings", "33_07", "Angle-of-attack vane sensor"),
  I("A.7.8", "Stall & flight warnings", "33_08", "AoA indicator & indexer"),

  // Ch34 — GPWS / TAWS (A.7.8)
  I("A.7.8", "GPWS / TAWS", "34_01", "GPWS inputs & outputs"),
  I("A.7.8", "GPWS / TAWS", "34_02", "GPWS control panel"),
  I("A.7.8", "GPWS / TAWS", "34_03", "Mode 1 — excessive sink rate"),
  I("A.7.8", "GPWS / TAWS", "34_04", "Mode 2 — excessive terrain closure"),
  I("A.7.8", "GPWS / TAWS", "34_05", "Mode 3 — altitude loss after take-off"),
  I("A.7.8", "GPWS / TAWS", "34_06", "Mode 4 — unsafe terrain clearance"),
  I("A.7.8", "GPWS / TAWS", "34_08", "Mode 5 — below glideslope"),
  I("A.7.8", "GPWS / TAWS", "34_10", "Mode 6 — excessive bank angle"),
  I("A.7.8", "GPWS / TAWS", "34_11", "Mode 7 — windshear"),
  I("A.7.8", "GPWS / TAWS", "34_12", "EGPWS/TAWS terrain display & alerts"),
  I("A.7.8", "GPWS / TAWS", "34_13", "EGPWS look-ahead warning envelope"),
  I("A.7.8", "GPWS / TAWS", "34_14", "EGPWS terrain clearance floor"),
];
void I;
