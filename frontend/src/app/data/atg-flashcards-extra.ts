// CPL Aircraft Technical — extra recall cards so every A.1 section has ≥ 16.
import type { ATGFlashcard } from "./aircraft-technical-flashcards";

type D = ATGFlashcard["difficulty"];
const n: Record<string, number> = {};
const C = (sectionId: string, front: string, back: string, difficulty: D = "medium"): ATGFlashcard => {
  n[sectionId] = (n[sectionId] ?? 0) + 1;
  return { id: `ATGX-${sectionId.slice(2)}-${n[sectionId]}`, sectionId, front, back, difficulty };
};

export const ATG_FLASHCARDS_EXTRA: ATGFlashcard[] = [
  // A.1.1
  C("A.1.1", "Check valve?", "Allows flow in one direction only.", "easy"),
  C("A.1.1", "Pressure relief valve?", "Opens above a set pressure to protect the system — a safety device."),
  C("A.1.1", "Thermal relief valve?", "Relieves pressure from expansion of trapped, heated fluid."),
  C("A.1.1", "Restrictor (one-way)?", "Slows flow rate in one direction (e.g. gear extension)."),
  C("A.1.1", "Selector valve?", "Directs pressure to one side of an actuator and return from the other."),
  C("A.1.1", "Plain/split bearings used where?", "Crankshaft mains and big ends — oil-film, high load."),
  C("A.1.1", "Ball vs roller bearing?", "Ball: low friction, radial + thrust. Roller: higher radial load."),
  C("A.1.1", "How does a gear pump move fluid?", "Round the outside of the gears, not between them."),
  C("A.1.1", "Positive vs non-positive displacement?", "Positive (gear, vane, piston) — fixed volume, needs relief; centrifugal — non-positive."),
  C("A.1.1", "Variable-displacement piston pump?", "Swash-plate angle varies stroke — constant pressure, variable volume."),
  C("A.1.1", "Filter bypass valve?", "Opens when the filter clogs — flow continues unfiltered."),
  C("A.1.1", "Gascolator?", "Strainer/sediment bowl at the lowest point — drain for water."),
  // A.1.3
  C("A.1.3", "28 V across 7 Ω — current and power?", "4 A; 112 W."),
  C("A.1.3", "NiCd battery hazard?", "Thermal runaway — monitor battery temperature."),
  C("A.1.3", "Centre-zero ammeter vs loadmeter?", "Ammeter: battery charge/discharge. Loadmeter: generator load."),
  C("A.1.3", "Line voltage of 115 V three-phase (star)?", "≈ 200 V (115 × √3)."),
  C("A.1.3", "Why 400 Hz?", "Smaller, lighter transformers and motors."),
  // A.1.4
  C("A.1.4", "Compression ratio?", "(Swept + clearance volume) ÷ clearance volume."),
  C("A.1.4", "Valve overlap?", "Inlet and exhaust valves open together around TDC — scavenging."),
  C("A.1.4", "BHP?", "IHP – FHP — useful shaft power."),
  C("A.1.4", "Detonation vs pre-ignition?", "Detonation: end gas explodes after the spark. Pre-ignition: hot spot fires the charge before the spark."),
  C("A.1.4", "Stopping detonation?", "Enrich, reduce power, cool (cowl flaps, speed)."),
  C("A.1.4", "Impulse coupling?", "Gives a strong, retarded spark at cranking speed."),
  C("A.1.4", "Why shield the ignition harness?", "Prevent radio interference."),
  C("A.1.4", "100LL colour?", "Blue. (100/130 green, 80 red, Jet A clear.)", "easy"),
  C("A.1.4", "Dynamic dampers?", "Pendulum counterweights absorbing crankshaft torsional vibration."),
  C("A.1.4", "Order of power increase on a CSU propeller?", "RPM first, then MAP (reverse to decrease)."),
  // A.1.5
  C("A.1.5", "Compressor stall cause?", "Blade AoA too high — disturbed intake flow, rapid acceleration, damage."),
  C("A.1.5", "Surge signs?", "Bangs, vibration, rising EGT, fluctuating RPM, flames."),
  C("A.1.5", "Stall action?", "Throttle back, monitor EGT, re-advance slowly; shut down if persists."),
  C("A.1.5", "Duplex burner?", "Primary + secondary orifices — good atomisation over the range."),
  C("A.1.5", "FSII?", "Fuel system icing inhibitor — prevents ice crystals; also biocide."),
  C("A.1.5", "Microbial contamination?", "Bugs at fuel/water interface — sludge blocks filters, corrosion."),
  C("A.1.5", "Jet A-1 freezing point?", "≤ –47 °C."),
  C("A.1.5", "Jet B?", "Wide-cut — more volatile, greater fire risk."),
  C("A.1.5", "Refuelling static protection?", "Bond aircraft and bowser before opening tanks."),
  C("A.1.5", "Fuel heater purpose?", "Prevents ice crystals blocking the filter."),
  C("A.1.5", "Flame-out causes?", "Fuel starvation, severe surge, water/ice ingestion."),
  // A.1.6
  C("A.1.6", "Photoelectric smoke detector?", "Smoke scatters light onto a photocell."),
  C("A.1.6", "Thermocouple fire detector responds to?", "Rate of temperature rise."),
  C("A.1.6", "Red vs yellow discharge disc?", "Red: thermal (overheat) discharge; yellow: normal discharge."),
  C("A.1.6", "Chemical oxygen generator duration / risk?", "≈ 12–22 min; very hot, can't be stopped."),
  C("A.1.6", "Oxygen safety?", "No oil/grease, no smoking, open valves slowly."),
  // A.1.7
  C("A.1.7", "Most bird strikes occur below?", "≈ 3 000 ft AGL, dawn/dusk."),
  C("A.1.7", "Class B fire agent?", "Halon/CO₂/powder/foam — not a water jet."),
  C("A.1.7", "Carburettor fire on start?", "Keep cranking."),
  C("A.1.7", "Hot brakes approach?", "From front or rear only; no parking brake."),
  C("A.1.7", "Microburst first effect on approach?", "Headwind increase — balloon above path (then sink)."),
  C("A.1.7", "Windshear escape?", "Max thrust, pitch ~15° up to stick shaker, keep configuration."),
  C("A.1.7", "Wake vortices strongest when?", "Heavy, clean, slow."),
  C("A.1.7", "Landing behind a heavy?", "Stay above its path, land beyond its touchdown."),
  C("A.1.7", "SA contaminated runway?", "> 25 % covered with > 3 mm water/slush, compacted snow or ice."),
  C("A.1.7", "Hydroplaning speed formula?", "≈ 9√psi (rotating), ≈ 7.7√psi (non-rotating).", "hard"),
];
