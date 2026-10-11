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
];
void I;
