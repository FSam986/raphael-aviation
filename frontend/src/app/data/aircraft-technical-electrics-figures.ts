// Electrics & Electronics (A.1.3) recreated illustrations, textbook-numbered.
// Shown INLINE in the study slide deck next to the relevant topic. Each figure's
// `topic` must match a NoteBlock heading in aircraft-technical-notes.ts (A.1.3).
// Files live in /public/figures/electrics/ as chNN_MM.png. Culled (text-filled,
// baked-caption, attributed, duplicate or half-cut) figures are removed here and
// their content captured as text in the note blocks.

export interface AtgElecFigureMeta {
  section: string;
  topic: string;
  title: string;
  caption: string;
  file: string;
  id: string;
  folder: string;
}

const E = (topic: string, n: string, title: string): AtgElecFigureMeta => ({
  section: "A.1.3", topic, title, caption: topic, file: `ch${n}.png`, id: `elecfig-ch${n}`, folder: "electrics",
});

export const ATG_ELECTRICS_FIGURES: AtgElecFigureMeta[] = [
  // ── Ch1: DC principles & circuits ──
  E("DC principles & circuits", "01_01", "Structure of an atom"),
  E("DC principles & circuits", "01_02", "Electron flow vs conventional current"),
  E("DC principles & circuits", "01_03", "Voltage drives current (water analogy)"),
  E("DC principles & circuits", "01_04", "Resistor symbols — fixed & variable"),
  E("DC principles & circuits", "01_05", "Series circuit"),
  E("DC principles & circuits", "01_06", "Parallel circuit"),
  E("DC principles & circuits", "01_07", "Series-parallel circuit"),
  E("DC principles & circuits", "01_08", "Kirchhoff's current law"),
  E("DC principles & circuits", "01_09", "Kirchhoff's voltage law"),

  // ── Ch2: Switches & sensors ──
  E("Switches & sensors", "02_01", "Two- and three-position switches"),
  E("Switches & sensors", "02_02", "Guarded & flowbar switch-lights"),
  E("Switches & sensors", "02_03", "Microswitch internals"),
  E("Switches & sensors", "02_04", "Proximity switch / sensor"),
  E("Switches & sensors", "02_05", "Magnetic (variable-reluctance) speed pickup"),
  E("Switches & sensors", "02_06", "Proximity sensors on the landing gear"),

  // ── Ch3: Circuit protection + Capacitors ──
  E("Circuit protection", "03_01", "Fuse construction"),
  E("Circuit protection", "03_02", "High-current fuse (current limiter)"),
  E("Circuit protection", "03_03", "Circuit breaker construction"),
  E("Capacitors", "03_04", "Capacitor construction"),
  E("Capacitors", "03_05", "Capacitor symbols"),
  E("Capacitors", "03_09", "Capacitors in series"),

  // ── Ch4: Batteries ──
  E("Batteries", "04_01", "Basic cell — electrodes & electrolyte"),
  E("Batteries", "04_02", "Dry (primary) cell"),
  E("Batteries", "04_03", "Cells in series vs parallel"),
  E("Batteries", "04_04", "Lead-acid cell construction"),
  E("Batteries", "04_05", "Lead-acid cell chemistry"),
  E("Batteries", "04_09", "Secondary batteries — lead-acid vs alkaline (summary)"),

  // ── Ch5: Magnetism & electromagnetism ──
  E("Magnetism & electromagnetism", "05_01", "Magnetic field patterns & poles"),
  E("Magnetism & electromagnetism", "05_02", "Flux concentration / magnetic screening"),
  E("Magnetism & electromagnetism", "05_03", "Domain theory — un/magnetised/saturated"),
  E("Magnetism & electromagnetism", "05_04", "Field around a current-carrying conductor"),
  E("Magnetism & electromagnetism", "05_05", "Into/out-of-paper current convention"),
  E("Magnetism & electromagnetism", "05_06", "Force between parallel conductors"),
  E("Magnetism & electromagnetism", "05_07", "Solenoid (coil) field"),
  E("Magnetism & electromagnetism", "05_08", "Solenoid vs relay"),
  E("Magnetism & electromagnetism", "05_09", "Motor principle — catapult field"),

  // ── Ch6: Generation & regulation ──
  E("Generation & regulation", "06_01", "Induced EMF needs relative motion"),
  E("Generation & regulation", "06_03", "Direction of induced EMF follows motion"),
  E("Generation & regulation", "06_04", "Fleming's right-hand (generator) rule"),
  E("Generation & regulation", "06_05", "Three ways to increase induced EMF"),
  E("Generation & regulation", "06_08", "Split-ring commutator (DC output)"),
  E("Generation & regulation", "06_09", "Single-loop DC output waveform"),
  E("Generation & regulation", "06_10", "Series-wound DC generator"),
  E("Generation & regulation", "06_11", "Single vs multiple coil — smoothing DC"),
  E("Generation & regulation", "06_13", "Compound-wound DC generator"),
  E("Generation & regulation", "06_14", "DC generator vs alternator"),
  E("Generation & regulation", "06_15", "Carbon-pile voltage regulator"),
  E("Generation & regulation", "06_16", "Vibrating-contact voltage & current regulator"),
  E("Generation & regulation", "06_17", "Generator, bus-bar & battery"),
  E("Generation & regulation", "06_18", "Paralleled generators with equalizing circuit"),

  // ── Ch7: DC motors & actuators ──
  E("DC motors & actuators", "07_01", "Fleming's left-hand (motor) rule"),
  E("DC motors & actuators", "07_02", "Motor loop & multi-coil armature"),
  E("DC motors & actuators", "07_03", "DC motor construction"),
  E("DC motors & actuators", "07_04", "Starter motor with slow-start resistor"),
  E("DC motors & actuators", "07_05", "Series-wound DC motor"),
  E("DC motors & actuators", "07_06", "Shunt-wound DC motor"),
  E("DC motors & actuators", "07_07", "Starter-generator"),
  E("DC motors & actuators", "07_08", "Reversible actuator motor circuit"),
  E("DC motors & actuators", "07_09", "Rotary electric actuator"),
  E("DC motors & actuators", "07_10", "Linear (screw-jack) actuator"),
  E("DC motors & actuators", "07_11", "Magnetic position indicators (doll's eye / prism)"),

  // ── Ch8: Distribution, bus-bars & meters ──
  E("Distribution & bus-bars", "08_01", "Generator → bus-bar → parallel loads"),
  E("Distribution & bus-bars", "08_02", "Earth-return (single-pole) distribution"),
  E("Distribution & bus-bars", "08_03", "Reverse-current cut-out"),
  E("Distribution & bus-bars", "08_04", "Moving-coil meter movement"),
  E("Distribution & bus-bars", "08_05", "Left-zero vs centre-zero ammeter"),
  E("Batteries", "08_07", "Aircraft battery container & connections"),
  E("Distribution & bus-bars", "08_08", "Complete light-aircraft DC system"),
  E("Distribution & bus-bars", "08_09", "Typical single-alternator light-aircraft system"),

  // ── Ch11: AC — generation & properties ──
  E("AC — generation & properties", "11_01", "Simple AC generator (slip rings)"),
  E("AC — generation & properties", "11_04", "Frequency — cycles per second"),
  E("AC — generation & properties", "11_05", "AC waveform — peak, RMS & cycle"),
  E("AC — generation & properties", "11_06", "Resistive circuit — V and I in phase"),
  E("AC — generation & properties", "11_07", "Mutual induction (transformer principle)"),
  E("AC — generation & properties", "11_08", "Self-inductance & back-EMF"),
  E("AC — generation & properties", "11_09", "Inductive circuit — current lags 90°"),
  E("Capacitors", "11_10", "Capacitor charge & discharge curves"),
  E("Capacitors", "11_11", "Capacitor in an AC circuit"),
  E("AC — generation & properties", "11_12", "Capacitive circuit — current leads 90°"),
  E("AC — generation & properties", "11_13", "Impedance triangle"),
  E("AC — generation & properties", "11_14", "Reactance vs frequency & resonance"),
  E("AC — generation & properties", "11_15", "True (real) power"),
  E("AC — generation & properties", "11_17", "Reactive power (VAR)"),

  // ── Ch12: AC generators & paralleling ──
  E("AC generators & paralleling", "12_01", "Rotating-field alternator"),
  E("AC generators & paralleling", "12_02", "Single-phase alternator"),
  E("AC generators & paralleling", "12_03", "Three-phase alternator (120° apart)"),
  E("AC generators & paralleling", "12_04", "Star vs delta connection"),
  E("AC generators & paralleling", "12_05", "Star — line vs phase values"),
  E("AC generators & paralleling", "12_06", "Delta — line vs phase values"),
  E("AC generators & paralleling", "12_07", "Alternator excitation & regulation"),
  E("AC generators & paralleling", "12_08", "Brushless alternator (exciter + rotating rectifier)"),
  E("AC generators & paralleling", "12_10", "Synchronising conditions"),
  E("AC generators & paralleling", "12_12", "Real-load sharing (speed governors)"),
  E("AC generators & paralleling", "12_13", "Reactive-load sharing (field control)"),
];
