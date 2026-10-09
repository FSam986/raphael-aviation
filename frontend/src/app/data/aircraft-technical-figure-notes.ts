// Comprehensive, plain-language explanations written AROUND each illustration
// (keyed by the figure id, e.g. "ppfig-fig_15_03"). The study slide shows the
// image together with its explanation here; figures without an entry fall back
// to the topic's bullet points. Authored section by section from the diagrams.
// Each string in the array is one paragraph.

export const FIGURE_NOTES: Record<string, string[]> = {
  // ─── Airframes — Brakes (A.1.2) ───
  "atgfig-ch06_fig_01": [
    "This cutaway shows a multi-disc brake, used on heavy aircraft. A stack of discs — the 'disc pack' — alternates rotors, which are keyed to the wheel and turn with it, and stators, which are keyed to the axle and cannot turn.",
    "When the brakes are applied, hydraulic pistons in the operating cylinders push the pressure/thrust plate so the whole stack is squeezed together; the friction between the rotors and stators slows the wheel. The torque plate carries the braking torque into the axle.",
    "Using many discs gives a large friction area and spreads the huge amount of heat, all in a compact, strong unit.",
  ],
  "atgfig-ch06_fig_02": [
    "This shows the brake's automatic adjuster and return mechanism. When the brakes are applied, a retraction pin is gripped by a friction bush and moves with the piston.",
    "When the brakes are released, an adjuster spring pulls the piston back by a fixed small amount, retracting the pads just clear of the discs so they do not drag.",
    "As the pads wear, the pin slips through the friction bush, so the piston always starts from the correct position — this automatically takes up the wear and keeps the pedal travel constant.",
  ],
  "atgfig-ch06_fig_03": [
    "This shows how brake wear is checked. A wear-indicator pin (the retraction pin) stands proud of the brake; with the brakes applied, the length of pin showing is measured.",
    "As the discs wear, the stack gets thinner, so the pin sits further in and less of it shows.",
    "When the exposed length — measured with the brakes on — falls to the minimum limit, the brake pack is worn out and must be replaced.",
  ],
  "atgfig-ch06_fig_04": [
    "This schematic shows a powered brake system with anti-skid and autobrake. The hydraulic supply (normal and reserve) passes through metering valves — worked by the pilot's pedals — and an autobrake valve on its way to the brakes.",
    "Between these and each wheel is an anti-skid (modulating) valve, one per wheel. Wheel-speed sensors feed an anti-skid controller; if a wheel starts to skid (decelerating too fast), the controller tells that wheel's valve to release some brake pressure until the wheel spins up again, then re-applies it.",
    "A parking-brake valve and an accumulator isolation valve are also fitted. Anti-skid gets the maximum braking without ever locking the wheels.",
  ],
  "atgfig-ch06_fig_10": [
    "This plan view shows the danger zones around the wheels if a tyre bursts or a wheel fails. The most dangerous area is directly abeam the wheel (the red zone, in line with the axle), where fragments and the tyre's energy are thrown sideways.",
    "The hazard reaches out in arcs (R1 to R4) to a considerable distance from the aircraft.",
    "The safe rule is to approach a hot or suspect wheel/brake from the front or the rear — never from the side — and to let the brakes cool before going near them.",
  ],

  // ─── Airframes — Tyres (A.1.2) ───
  "atgfig-ch05_fig_01": [
    "This compares the two ways an aircraft tyre's carcass is built. In bias (cross-ply) construction the casing plies run diagonally across the tyre, each layer crossing the one beneath it. In radial construction the casing plies run straight across (radially) from bead to bead, with separate belt plies — a breaker/belt — laid under the tread.",
    "Both types share the same outer features: the tread with its grooves runs on the ground, the sidewall flexes, and the beads (stiffened by the apex strip and wrapped by the casing-ply turn-ups) grip the wheel rim. An inner liner seals the air in a tubeless tyre.",
    "Radial tyres run cooler and last longer, while bias tyres are simpler and very strong — both are used on aircraft.",
  ],
  "atgfig-ch05_fig_02": [
    "This names the main regions of an aircraft tyre. The crown is the centre of the tread that takes the load on the ground; the shoulder is where the tread meets the sidewall.",
    "The sidewall is the flexible side that carries the tyre markings, and the bead is the stiff inner edge that seats against the wheel flange and holds the tyre on the rim.",
    "These regions help in judging wear — for example, over-inflation wears the crown in the middle, while under-inflation wears the two shoulders.",
  ],
  "atgfig-ch05_fig_03": [
    "This shows how an aircraft tyre tells you when it is worn out. Marker tie bars — small bridges across the bottom of the tread grooves — and wear-indicating grooves gradually become flush with the surface as the tread wears down.",
    "When the tread has worn down to their level, the tyre has reached its wear limit and must be removed.",
    "Checking these indicators is part of the daily and pre-flight inspection; a tyre worn past the indicators, or with the carcass/plies showing, must not be used.",
  ],

  // ─── Airframes — Wheels (A.1.2) ───
  "atgfig-ch04_fig_01": [
    "This cutaway shows a wheel with a detachable (loose) flange — one way of fitting a tubeless tyre onto a one-piece wheel. The tyre is slid over the body, then the loose flange is fitted and held on by a lock ring seated in a groove.",
    "A location ring positions the flange and an 'O' ring seals the join, so the wheel can hold the tyre's air without needing an inner tube. The inflation valve charges the tyre.",
    "The wheel runs on bearings in the body (with oil seals and an excluder to keep dirt out), and drive blocks transmit the braking torque from the brake unit to the wheel.",
  ],
  "atgfig-ch04_fig_02": [
    "This shows a split wheel, made in two halves bolted together (bolts with Nyloc nuts) with a seal between them to make it airtight for a tubeless tyre.",
    "Splitting the wheel lets the tyre be fitted easily, and the halves are then bolted up around it. Inner and outer drive blocks carry the braking torque.",
    "Fusible (thermal) plugs are fitted: if the brakes overheat, the plug's core melts and lets the tyre deflate in a controlled way rather than bursting. The inflation valve charges the tyre.",
  ],

  // ─── Airframes — Landing Gear (A.1.2) ───
  "atgfig-ch03_fig_01": [
    "This cutaway shows an oleo-pneumatic shock absorber, the standard aircraft leg. The upper and lower cylinders telescope together on landing.",
    "The strut is charged with gas (nitrogen) through the inflation valve and with hydraulic fluid through the filler plugs, with a separator piston keeping the two apart. On landing, the leg compresses and forces oil through a small orifice past the flutter valve — the oil does the damping, turning the shock into heat, while the gas acts as the spring.",
    "As the leg extends again, the flutter valve rises to restrict the flow and damp the rebound, so the aircraft does not bounce. The upper and lower torque links stop the lower cylinder and wheel rotating while still letting the leg telescope.",
  ],
  "atgfig-ch03_fig_02": [
    "This shows a complete main landing gear with a multi-wheel bogie. The main oleo leg absorbs the landing shock, while the side stay and lock stay brace the leg and lock it down.",
    "A retraction actuator pulls the gear up, and a downlock actuator — backed up by downlock springs — secures it in the down position. The torque links stop the leg rotating.",
    "The bogie beam carries the wheels and lets them pitch; a pitch trimmer keeps the bogie at the right angle; and a shortening mechanism makes the leg shorter as it retracts so it fits neatly into the wheel bay.",
  ],
  "atgfig-ch03_fig_03": [
    "This shows a nose landing gear. A drag stay braces the leg fore-and-aft and, with the lock stay, locks it down; a retraction actuator raises and lowers it, and a downlock actuator secures it.",
    "Because the nose gear also has to steer the aircraft on the ground, it carries a nosewheel-steering (N/WS) actuator and steering mechanism that turn the lower leg and wheels for taxiing.",
  ],
  "atgfig-ch03_fig_04": [
    "This shows the hydraulic circuit for nosewheel steering. Pressure is fed through a control valve to a steering jack (cylinder) that turns the nose-wheel strut left or right as the pilot commands.",
    "A centring cylinder and centring spring return the wheel to straight-ahead when steering is not selected, and before the gear retracts. An accumulator (with its air charging valve) provides an emergency supply, and a shuttle/change-over valve selects normal or emergency pressure.",
    "Restrictors smooth the movement, and a bypass valve lets the wheels castor freely — for example when the aircraft is being towed.",
  ],
  "atgfig-ch03_fig_06": [
    "This schematic shows how the whole landing gear is raised and lowered in the correct order. Selecting UP or DOWN moves the selector valve, which sends pressure along the up-line (red) or the down-line (yellow) to the various jacks.",
    "Sequence valves (SV1, SV2) make things happen in the right order — for example the doors open before the gear moves and close again after — by only passing pressure on once the previous step is complete.",
    "Uplocks and downlocks hold the gear in each position and are released by pressure before the gear moves. A one-way restrictor in the up-line limits the gear's speed if it free-falls under gravity.",
  ],
  "atgfig-ch03_fig_10": [
    "This shows an electrically-operated landing gear, an alternative to hydraulics used on some light aircraft. A selector switch runs a reversible electric motor, which drives through a gearbox and clutch to a screwjack (the 'screw').",
    "As the screw turns it raises or lowers the gear, operating each leg through a torque tube, side stays and drag struts.",
    "Flexible cables and lock-assist springs (or rubber cords) help pull the gear over-centre into the locked position, and a manual operating lever lets the gear be wound down by hand if the motor fails.",
  ],
  "atgfig-ch03_fig_12": [
    "This is an electronic (ECAM-type) WHEEL page. It shows the door and gear position indicators — whether each gear is up-locked or down — along with the nosewheel-steering and landing-gear control status.",
    "It also shows the anti-skid and autobrake selections and the temperature of each brake, so the crew can watch for an overheating brake.",
    "The hydraulic-system colours (blue/yellow) show which system is feeding the gear, and the aircraft weight and CG are given at the bottom — a single picture of the gear and braking system.",
  ],

  // ─── Airframes — Hydraulics (A.1.2) ───
  "atgfig-ch02_fig_01": [
    "These four columns of liquid have very different shapes and volumes, yet every gauge at the bottom reads the same pressure.",
    "This shows a key fact of hydrostatics: the pressure at the bottom of a liquid depends only on the height (head) of liquid above it — not on the shape of the vessel or the total volume of fluid.",
    "It is why hydraulic pressure is transmitted equally through the system regardless of how the pipes are routed.",
  ],
  "atgfig-ch02_fig_02": [
    "This illustrates Pascal's law. A force pushing on the small piston creates a pressure in the enclosed fluid, and that pressure acts equally in all directions throughout the fluid — which is why all the arrows are the same length.",
    "Because pressure = force ÷ area, a hydraulic system can transmit that force through pipes of any shape, and by changing the piston areas it can multiply it.",
  ],
  "atgfig-ch02_fig_03": [
    "This puts Pascal's law to work. The same fluid pressure (500 kPa) acts on both pistons, but piston B has twice the area of piston A, so it produces twice the force — 2000 N against 1000 N — and the system balances.",
    "This is how a hydraulic system turns a small input force into a large output force: force = pressure × area, so a bigger piston gives a bigger force — at the cost of moving through a shorter distance.",
  ],
  "atgfig-ch02_fig_04": [
    "This is the simplest possible hydraulic system, drawn as a brake. Pressing the foot pedal pushes piston A in the master cylinder, which raises the pressure of the fluid in the pipe.",
    "That pressure is carried to piston B in the slave cylinder, which clamps the brake onto the disc. A fluid reservoir keeps the master cylinder topped up.",
    "This master-and-slave arrangement is the basis of every hydraulic system — an input piston raising the pressure, and an output piston doing the work.",
  ],
  "atgfig-ch02_fig_05": [
    "This shows the basic parts of a hydraulic system. The pump draws fluid from the reservoir and pushes it through a pressure filter to a selector valve, which routes it to the actuator (jack).",
    "A relief valve protects the system by venting fluid back to the reservoir if the pressure gets too high.",
    "When nothing is selected, the fluid simply flows round and straight back to the reservoir — this is an 'open-centre' system.",
  ],
  "atgfig-ch02_fig_06": [
    "This extends the basic system to several services. The engine-driven pump feeds a line that passes through each selector valve in turn ('to another service'); each selector routes pressure to its own actuator when operated, and the flow then continues to the next.",
    "A relief valve caps the pressure.",
    "In this series (open-centre) arrangement only one service can be fully powered at a time, which is its main limitation.",
  ],
  "atgfig-ch02_fig_07": [
    "This is a closed-centre system. A non-return valve downstream of the pump traps the pressure in the system, and an accumulator stores fluid under pressure ready for use.",
    "The selector valves are now arranged in parallel, so several services can be operated at the same time, with the accumulator supplying the initial surge of fluid.",
    "When nothing is being used, the pump builds the pressure and it is held, so a service responds instantly when selected.",
  ],
  "atgfig-ch02_fig_08": [
    "This cutaway shows a hydraulic reservoir. It stores the fluid, provides a head of fluid to the pump, and makes up for small leaks and for the fluid that moves in and out of the jacks and accumulator.",
    "Baffles stop the fluid surging and let any air separate out; a fin helps cool it; a sight glass shows the contents; and a temperature sensor monitors it.",
    "The reservoir is pressurised (the 'pressurised level') to give the pump a positive supply and prevent it cavitating at high altitude.",
  ],
  "atgfig-ch02_fig_09": [
    "This is a hydraulic filter. Fluid passes in, flows through the filter element — which traps the contamination — and leaves clean.",
    "If the element becomes clogged, a bypass valve (shown here closed) opens so the service is not lost, although the fluid passing it is then unfiltered.",
    "The seal and housing contain the fluid, and the element is a replaceable item checked at servicing.",
  ],
  "atgfig-ch02_fig_10": [
    "This is a double-acting hand pump, used for ground servicing or emergencies. Moving the handle drives a piston in and out.",
    "Non-return valves (NRVs) let fluid be drawn from the inlet on one stroke and pushed to the outlet on the other, so fluid is delivered on both strokes of the handle.",
    "A transfer valve directs the flow, and a relief valve protects the pump against over-pressure.",
  ],
  "atgfig-ch02_fig_11": [
    "This is the type of pump used for aircraft main hydraulic systems — a variable-displacement axial piston pump. A ring of pistons sits in a rotating cylinder block.",
    "As the block is driven round, each piston is pushed in and out by an angled plate, drawing fluid in and then delivering it at high pressure.",
    "By changing the angle of that plate the pump can vary how much fluid it delivers, which lets it hold a constant system pressure.",
  ],
  "atgfig-ch02_fig_13": [
    "This shows the inside of a constant-pressure (variable-displacement) axial piston pump. The drive shaft spins the cylinder block, and each piston's shoe rides on the angled swash plate (yoke), so the pistons stroke in and out — drawing fluid from the inlet and delivering it to the outlet.",
    "Here the swash plate is at a large angle, so the pistons have a long stroke and the pump delivers its maximum flow — the condition when the system is calling for fluid.",
    "A case drain returns the small internal leakage back to the reservoir.",
  ],
  "atgfig-ch02_fig_14": [
    "This is the same pump once the system has reached its set pressure. A control piston, sensing that pressure, has moved the swash plate towards the vertical.",
    "Now the pistons barely stroke, so the pump delivers almost no flow — just enough to make up leaks. This 'de-stroking' holds the pressure constant without a relief valve having to dump fluid.",
    "Because the pump is doing almost no work in this state, it wears less and the fluid stays cool.",
  ],
  "atgfig-ch02_fig_15": [
    "On a system with a fixed-delivery pump, an automatic cut-out valve (ACOV) off-loads the pump once the system is fully charged.",
    "When the accumulator/system reaches pressure, the ACOV opens an idling circuit so the pump's output flows freely back to the reservoir at low pressure, while a non-return valve holds the pressure trapped in the system.",
    "This reduces pump wear and stops the fluid overheating. When a service is used and the pressure drops, the ACOV cuts the pump back in.",
  ],
  "atgfig-ch02_fig_16": [
    "An accumulator stores fluid under pressure using a gas charge, usually nitrogen. The gas and the fluid must be kept apart — either by a separator/floating piston or by a flexible diaphragm (or bladder).",
    "A charging point lets the gas pre-charge be set.",
    "The accumulator stores energy, damps out pressure fluctuations (hammering), allows for thermal expansion, and provides an emergency and initial supply of fluid when a service is first selected.",
  ],
  "atgfig-ch02_fig_17": [
    "These are the three kinds of actuator (jack). A single-acting actuator is driven by fluid one way and returned by a spring.",
    "A double-acting actuator is driven by fluid both ways — fluid can be sent to either side of the piston.",
    "A balanced actuator has a piston rod of equal area on both sides, so it produces the same force and the same speed in each direction.",
  ],
  "atgfig-ch02_fig_18": [
    "A priority valve makes sure the most important ('primary') services always get pressure first.",
    "Fluid from the pressure inlet reaches the primary services directly, but the passage to the secondary services is held closed by a spring until the pressure is high enough to overcome it.",
    "So if the system pressure falls, the secondary services are cut off first and the primary (essential) services keep working.",
  ],
  "atgfig-ch02_fig_19": [
    "A pressure-reducing valve supplies a sub-system that needs a lower pressure than the main system — for example a lower-pressure brake or door system.",
    "It takes high-pressure fluid at the inlet and meters it to the low-pressure sub-system, closing off once the reduced pressure is reached. A spring sets the reduced value and a return port bleeds off any excess.",
  ],
  "atgfig-ch02_fig_20": [
    "A non-return (check) valve lets fluid flow one way only. Fluid entering the inlet pushes the ball off its seat, against a light spring, and flows on to the outlet.",
    "If the flow tries to reverse, the ball is pushed back onto its seat and blocks it.",
    "It is used to trap pressure in the system and to stop fluid flowing back towards the pump.",
  ],
  "atgfig-ch02_fig_21": [
    "This restrictor valve gives full flow in one direction and restricted (metered) flow in the other.",
    "In the free direction the fluid pushes the valve open and flows freely around it; in the other direction the valve closes and the fluid can only pass through a small orifice.",
    "It is used to control the speed of an actuator in one direction only — for example to slow part of the landing-gear travel.",
  ],
  "atgfig-ch02_fig_22": [
    "A selector valve directs the pump pressure and the return line to the two sides of an actuator.",
    "In one position it sends pressure to one side of the jack and connects the other side to return, moving the jack one way.",
    "Move the selector and the connections swap over, so the jack is driven the other way.",
  ],
  "atgfig-ch02_fig_23": [
    "This is a spool (linear slide) selector valve, moved by a pilot input. Its lands can connect pressure and return to the service — or, in the centre position shown here, block both ports.",
    "With both ports blocked, the fluid in the actuator is trapped. Because the fluid is incompressible this is a hydraulic lock, which holds the actuator firmly in place.",
  ],
  "atgfig-ch02_fig_24": [
    "A shuttle valve automatically connects a service to whichever of two supplies has the higher pressure.",
    "Normally the normal supply holds the shuttle over and feeds the service. If the normal supply fails and an alternate (emergency) supply is applied, its higher pressure slides the shuttle across so the alternate supply now feeds the service.",
    "It lets one service be fed from either of two independent systems without the two systems being connected.",
  ],
  "atgfig-ch02_fig_26": [
    "This is a flight-deck hydraulic system panel, with its indications and controls labelled.",
    "It shows the reservoir contents, the low-quantity/high-temperature warnings, the firewall shut-off valves, the engine-driven-pump shut-offs, the air-turbine (and electric/RAT) pumps and power transfer unit, the engine-pump case-drain warnings, the brake-accumulator low-pressure warning, and the system pressure gauges.",
    "Together these let the crew monitor each hydraulic system and select which pumps are driving it.",
  ],
  "atgfig-ch02_fig_27": [
    "This is an electronic (ECAM-type) hydraulic system display. The three independent systems — here Green, Blue and Yellow — are shown side by side, each at its normal 3000 psi (green meaning normal).",
    "The display shows which pumps are driving each system — engine-driven, electric ('ELEC') or ram-air turbine ('RAT') — and the power transfer unit (PTU) that lets one system help another without transferring fluid between them.",
    "A loss of pressure is shown in red, so the crew can see at a glance which system has a problem.",
  ],
  "atgfig-ch02_fig_28": [
    "This is a pressure relay/transmitter that drives the cockpit pressure gauge.",
    "System pressure acts on a piston/diaphragm inside it, and that movement is converted into the reading shown on the gauge, so the crew can monitor the hydraulic pressure.",
    "The red arc on the gauge marks the normal/maximum pressure range.",
  ],
  "atgfig-ch02_fig_30": [
    "This system schematic shows how all the components work together to power the aircraft's services. The pump supply, through a priority (pressure-maintaining) valve, feeds the essential services first — the power flying controls, the brakes (with their modulator and fuse) and the landing gear — before the secondary services.",
    "Sequence valves make the gear doors and legs operate in the correct order, and a restrictor valve in the gear-up line limits the free-fall speed. Shuttle valves let the brakes and flying controls be fed from the alternate or standby system if the normal one fails.",
    "A ram-air turbine (HYRAT) provides emergency hydraulic power, and on this layout it supplies the flying controls only — the minimum needed to keep flying.",
  ],
  "atgfig-ch02_fig_31": [
    "This is a high-pressure pneumatic (compressed-air) system, used on some aircraft as an alternative to hydraulics for the brakes, gear and doors.",
    "Engine-driven compressors charge a high-pressure storage bottle through moisture separators, a desiccant to dry the air, non-return valves and a filter. Relief valves cap the pressure, and an isolation valve and a pressure reducer feed the services (normal/emergency brakes, propeller brakes, nosewheel steering, gear and the passenger door). A ground charging port lets it be charged on the ground.",
    "Because air is compressible it gives a spongy feel and cannot provide the precise, powerful actuation that incompressible hydraulic fluid can — which is why most aircraft use hydraulics for the heavy work.",
  ],

  // ─── Airframes — Fuselage, Wings & Structure (A.1.2) ───
  "atgfig-ch01_fig_04": [
    "This shows the fail-safe principle. A main structural member — here a fuselage frame near the wing attachment — is built so that if one part fractures, the load it was carrying is redistributed to the surrounding structure along alternative load paths, instead of the whole thing failing.",
    "The crack would normally be found at a scheduled inspection before it could spread far. This 'redundant load path' design is what lets a structure safely tolerate a certain amount of damage — the basis of fail-safe and damage-tolerant construction.",
  ],
  "atgfig-ch01_fig_05": [
    "This cutaway names the parts of a stressed-skin (semi-monocoque) fuselage. The skin is stiffened lengthwise by stringers and around its circumference by frames; a bulkhead is a heavier, often solid, frame that carries large or concentrated loads.",
    "Tear-stopper flanges and skin reinforcing plates are built in so that a crack in the skin is arrested before it can run. Window-support frames and intercostals (short members between frames) reinforce the openings.",
    "In this construction the skin itself is primary load-bearing structure, not just a cover.",
  ],
  "atgfig-ch01_fig_06": [
    "This is a fatigue (S-N) curve. It plots the alternating stress applied to a component (as a percentage of its ultimate strength) against the number of load cycles it survives before failing — the cycles axis is a log scale.",
    "The higher the stress, the fewer cycles the part lasts. For many materials the curve flattens to a 'fatigue limit' — a stress below which the part can take an effectively unlimited number of cycles.",
    "This is why a pressurised fuselage, which is stressed once per flight, has its fatigue life counted in pressurisation cycles.",
  ],
  "atgfig-ch01_fig_09": [
    "This shows the stresses in a pressurised fuselage, which behaves like an inflated cylinder. The internal pressure tries to burst it outward: hoop stress acts around the circumference and axial (longitudinal) stress acts along the length.",
    "The hoop stress is the larger of the two — about twice the axial stress — which is why fuselage cracks tend to run lengthwise. The front and rear pressure bulkheads cap the pressurised 'tube' at each end.",
    "Because this stress is applied and released on every flight, it is the main driver of the fuselage's fatigue life.",
  ],
  "atgfig-ch01_fig_10": [
    "This is a welded steel-tube space-frame (truss) fuselage, used on many light and vintage aircraft. A lattice of tubes carries all the loads in tension and compression.",
    "The fabric or light skin stretched over it is non-structural — it only gives the shape and keeps the weather out.",
    "This type is simple, strong and easy to repair, but heavier and bulkier than a stressed-skin design, so it is not used on modern transport aircraft.",
  ],
  "atgfig-ch01_fig_11": [
    "This shows monocoque ('single shell') construction. The outside skin carries essentially all of the loads, kept in shape by a few rings (formers) but with no stringers.",
    "Because the skin must resist buckling entirely on its own, a pure monocoque has to be fairly thick and heavy.",
    "For that reason true monocoque is used mainly for smaller or lightly-loaded structures, such as an engine cowling, rather than a whole airliner fuselage.",
  ],
  "atgfig-ch01_fig_12": [
    "This shows semi-monocoque construction, which almost all modern aircraft use. The skin is still load-bearing, but it is now stiffened by lengthwise stringers and by frames or formers.",
    "The stringers stop the thin skin from buckling and share the bending loads, so the skin can be made much lighter than in a pure monocoque.",
    "The result combines light weight with the strength and smoothness of a stressed-skin shell.",
  ],
  "atgfig-ch01_fig_13": [
    "These are the cross-sections of common structural members — spars, longerons and booms. Each has flanges (the 'caps' or 'booms') joined by a 'web'.",
    "The caps/booms carry the bending loads (one in tension, the other in compression) while the web carries the shear.",
    "Built-up sections, made from several riveted pieces (like the built-up T-beam or double-web longeron), are fail-safe because a crack is stopped at a joint. A single extruded section (the non-fail-safe I-beam) lets a crack run straight through, so its fatigue life must be carefully managed.",
  ],
  "atgfig-ch01_fig_14": [
    "This cross-section shows how the pieces fit together. The frame is an open ring that gives the fuselage its shape; the stringers run lengthwise and pass through small cut-outs in the frame; and the stressed skin panels are riveted to both.",
    "The stringers support the skin against buckling, and the whole assembly shares the loads — the essence of semi-monocoque construction.",
  ],
  "atgfig-ch01_fig_15": [
    "This looks like the previous cross-section, but the centre is now closed — this is a bulkhead rather than an open frame.",
    "A bulkhead is a solid or heavily-built partition that carries concentrated loads or seals part of the fuselage — for example a pressure bulkhead sealing the cabin, or a bulkhead carrying the wing or landing-gear loads.",
    "The stringers and stressed skin attach to it just as they do to an ordinary frame.",
  ],
  "atgfig-ch01_fig_16": [
    "This shows a floor crossbeam, which spans across the fuselage to carry the cabin floor and its loads down into the frames and lower structure.",
    "Like a spar, it is built with an upper cap and a lower cap joined by a web — the caps take the bending and the web takes the shear.",
    "The stringers run lengthwise in the surrounding skin, tying the floor structure into the fuselage shell.",
  ],
  "atgfig-ch01_fig_17": [
    "Any opening in a stressed skin — a door or window — interrupts the load paths and concentrates stress at its corners.",
    "To cope with this, doublers (extra layers of material) are built in around the opening to reinforce it and feed the load back into the surrounding skin and frames.",
    "This is why the structure around doors and windows is noticeably heavier and more complex than the plain skin.",
  ],
  "atgfig-ch01_fig_18": [
    "This shows a complete fuselage barrel section. The frames set the shape, the stringers run lengthwise, and the skin is wrapped over both.",
    "Around the cut-outs for doors and windows the frames are reinforced to carry the loads around the openings, and floor beams on a support truss carry the cabin floor.",
    "Together these make the light, strong, stressed-skin tube of a modern transport aircraft.",
  ],
  "atgfig-ch01_fig_19": [
    "This cockpit photo highlights a clear-vision (direct-vision, or 'DV') window — a side cockpit window that can be slid or opened.",
    "It gives the crew a way to see out if the main windscreen is obscured — for example by very heavy rain or a failure of the windscreen heating or wipers — and on the ground it can be opened for ventilation or to pass paperwork.",
    "The cockpit windows themselves are laminated, electrically heated, and much thicker and stronger than the cabin windows.",
  ],
  "atgfig-ch01_fig_20": [
    "This front view shows a braced (biplane) wing. The upper and lower mainplanes are held apart by interplane struts and tied together with wires.",
    "The flying wires carry the flight loads (lift pulling the wings up) and the landing wires carry the loads when the aircraft is on the ground or under negative g.",
    "Bracing lets the wing be very light, but the struts and wires add a lot of drag — which is why modern aircraft use cantilever wings instead.",
  ],
  "atgfig-ch01_fig_21": [
    "This high-wing light aircraft uses a single lift strut on each side to help support the wing — a semi-cantilever design.",
    "The strut carries much of the wing's bending load down to the lower fuselage, so the wing spar can be lighter than on a fully cantilever wing.",
    "The trade-off is a little extra drag from the strut, which is acceptable on the trainers and utility aircraft that commonly use this layout.",
  ],
  "atgfig-ch01_fig_22": [
    "This shows the two motions that combine to cause flutter: bending (the wing flexing up and down) and twisting (the wing rotating about its span).",
    "If these two motions coincide at the right frequency, energy is fed from the airflow into the structure and the oscillation grows rapidly — which can destroy the wing in seconds.",
    "Flutter must be prevented throughout the whole flight envelope, chiefly by mass-balancing the control surfaces and by keeping the structure stiff.",
  ],
  "atgfig-ch01_fig_23": [
    "These are three ways of building a wing spar — the main spanwise member that carries the wing's bending loads.",
    "The two on the left are built up from several riveted plates (the caps and web made of separate pieces). This is fail-safe, because a crack is arrested at a joint.",
    "The one on the right is a single extruded I-section — lighter and simpler, but a crack can run straight through it, so its fatigue life must be carefully controlled (a safe-life approach).",
  ],
  "atgfig-ch01_fig_24": [
    "This shows the wing torsion box — the structural heart of the wing. The front and rear spars (each with top and bottom caps and a shear web), the ribs (which give the aerofoil shape and carry lightening holes to save weight), and the top and bottom skin panels together form a closed box.",
    "Here the skin panels are integrally stiffened — the stiffeners are machined from the same piece of metal as the skin.",
    "This closed box is what resists the wing's bending and twisting (torsion) loads, and the sealed space inside it is normally used to carry fuel.",
  ],
  "atgfig-ch01_fig_25": [
    "These are the common tail (empennage) layouts. The conventional tail has the tailplane on the fuselage. The T-tail puts the tailplane on top of the fin, clear of the wing's downwash — but at risk of a deep (super) stall.",
    "The V-tail (butterfly) combines the jobs of fin and tailplane into two angled surfaces, and the H-tail uses twin fins on the ends of the tailplane.",
    "Each layout is a trade-off between control effectiveness, weight, drag and interference with the rest of the aircraft.",
  ],
  "atgfig-ch01_fig_26": [
    "This exploded view shows the structure of the empennage (tail). The fixed fin and tailplane, and the moving rudder and elevators, are each built like small wings — with spars, ribs and a stressed skin forming torsion boxes.",
    "The fin and tailplane attach to heavy frames or bulkheads at the rear of the fuselage, which carry the large tail loads into the main structure.",
  ],
  "atgfig-ch01_fig_27": [
    "This shows honeycomb sandwich construction, widely used for control surfaces, floors and panels. Two thin, strong facings (skins) are bonded along the bond line to a lightweight honeycomb core.",
    "The result is extremely stiff and strong in bending for its weight — the facings act like the caps of a beam and the core like the web — while being very light.",
    "Its weaknesses are damage and water getting into the core, so it is inspected by tap-testing to find any de-bonds.",
  ],
  "atgfig-ch01_fig_28": [
    "This graph shows how a protective oxide layer grows on a metal such as aluminium: quickly at first, then the rate slows and the thickness levels off.",
    "Because the oxide seals the surface, it protects the metal underneath from further corrosion.",
    "This is the basis of anodising, in which the natural oxide layer is deliberately thickened to give aluminium alloy parts better corrosion protection.",
  ],

  // ─── Piston Engines — Propellers (A.1.4) ───
  "ppfig-fig_12_01": [
    "This names the parts of a propeller blade. The tip is the outer end (it moves fastest); the leading edge cuts into the air and the trailing edge is the rear.",
    "The shank is the thick part near the centre, and the root and butt are where the blade is held in the hub. The peg for the pitch-change mechanism lets the blade be rotated about its own axis to change its pitch (blade angle).",
    "A propeller blade is really a rotating aerofoil — a twisted wing — that produces thrust the way a wing produces lift.",
  ],
  "ppfig-fig_12_02": [
    "These diagrams define the propeller's angles and the idea of slip. The blade is set at a blade angle (pitch) to its plane of rotation. Because the blade both rotates and moves forward, the air actually meets it along the resultant path at the angle of advance (helix angle), and the angle of attack is the small angle between that path and the blade's chord line.",
    "The resultant aerodynamic force is mostly thrust (forward), with some propeller torque resisting the rotation. Geometric pitch is how far the blade would advance in one turn if it didn't slip — like a screw in solid material; the effective pitch is how far it really advances; and the difference between them is the slip.",
    "The lower diagram shows the helix the blade tip actually traces through the air in one revolution.",
  ],
  "ppfig-fig_12_03": [
    "Pitch (blade angle) is how coarsely the blade is 'screwed' into the air. Fine pitch is a small blade angle and small geometric pitch: the blade takes a small bite of air, which lets the engine spin up to high RPM — good for take-off and climb, like a low gear.",
    "Coarse pitch is a large blade angle and large geometric pitch: the blade takes a big bite, moving the aircraft further per turn at lower RPM — efficient for the cruise, like a high gear.",
    "A variable-pitch propeller changes between these to suit each phase of flight, instead of being stuck with the single compromise angle of a fixed-pitch prop.",
  ],
  "ppfig-fig_12_04": [
    "Just like a wing, a propeller blade's angle of attack is the angle between its chord line and the actual airflow reaching it (its actual path through the air).",
    "This is NOT the same as the blade angle (pitch), which is measured to the plane of rotation — the angle of attack is usually much smaller.",
    "Thrust depends on this angle of attack, so anything that changes the direction of the airflow onto the blade changes the thrust. That is the key to understanding how a propeller behaves as RPM and speed change.",
  ],
  "ppfig-fig_12_06": [
    "On a fixed-pitch blade the angle of attack is set by two things together: the blade's rotational speed (RPM) and the aircraft's forward speed (TAS). The airflow onto the blade is the resultant of these two velocities.",
    "If the RPM increases or the forward speed decreases, the resultant airflow comes more from straight ahead, so the angle of attack increases and the blade makes more thrust (right-hand diagram).",
    "If the forward speed increases, the angle of attack decreases. This is why a fixed-pitch propeller is only efficient at one combination of speed and RPM — and why a constant-speed propeller, which can change its blade angle, performs so much better.",
  ],
  "ppfig-fig_12_07": [
    "This plots propeller efficiency against aircraft speed. A fine-pitch propeller is efficient at low speeds but its efficiency falls away as speed rises; a coarse-pitch propeller is the opposite — poor at low speed, good at high speed.",
    "A fixed-pitch propeller is a compromise between the two, only near its best at one speed.",
    "A variable-pitch (constant-speed) propeller can continuously change its blade angle, so it stays near peak efficiency right across the speed range — which is why it gives much better all-round performance.",
  ],
  "ppfig-fig_12_09": [
    "This cutaway shows how the blade angle is changed. Oil under pressure is fed down the hollow engine shaft (the oil tube) to a piston in a cylinder in the hub; as the piston moves, an operating link rotates the blade to change its pitch.",
    "Opposing the oil are a feathering spring and the blade counterweights, which try to drive the blade the other way.",
    "The balance between oil pressure (acting one way) and the spring and counterweights (acting the other) sets the blade angle. If oil pressure is lost, the spring and counterweights drive the blade toward the feathered (or coarse) position.",
  ],
  "ppfig-fig_12_10": [
    "This is a double-acting pitch-change mechanism, where oil pressure is used on BOTH sides of the piston rather than oil against a spring.",
    "Fine-pitch oil is fed to one side of the piston and coarse-pitch oil to the other; porting oil to one side while draining the other drives the blade toward fine or toward coarse.",
    "Because oil actively pushes the blade both ways, the pitch change is quick and powerful in both directions, and the blade angle is held firmly wherever it is set.",
  ],
  "ppfig-fig_12_11": [
    "This simply shows the same propeller blade set to two different pitch angles — a finer angle on the left and a coarser angle on the right.",
    "Rotating the whole blade about its long axis is what 'changing pitch' means.",
    "On a constant-speed propeller the blade is rotated continuously between fine and coarse to hold the selected RPM as the flight conditions change.",
  ],
  "ppfig-fig_12_12": [
    "This is the governor, or constant-speed unit (CSU), that automatically holds the selected RPM. Engine-driven flyweights try to fly outward, while a speeder spring — set by the pilot's RPM lever — pushes them back in.",
    "When the two are balanced the propeller is 'on speed' and the pilot valve sits in the neutral position shown here, blocking both oil passages so the blade angle stays exactly where it is.",
    "Moving the RPM lever changes the speeder-spring tension to select a different RPM. An engine-driven oil pump, with a relief valve, supplies the boosted oil the system works on.",
  ],
  "ppfig-fig_12_13": [
    "This shows the governor when the engine over-speeds — for example the nose drops and the propeller speeds up. The flyweights now spin too fast for the speeder-spring setting and fly outward, lifting the pilot valve.",
    "That ports pressure oil to the COARSE side, which increases the blade angle. A coarser blade takes a bigger bite of air, which loads the engine and brings the RPM back down.",
    "As the RPM returns to the selected value the flyweights move back in and the valve returns to neutral — so the governor has corrected the over-speed automatically.",
  ],
  "ppfig-fig_12_14": [
    "This shows the opposite case — the engine under-speeds, for example the nose rises and the propeller slows. The flyweights slow down and fall inward under the speeder spring, lowering the pilot valve.",
    "That ports pressure oil to the FINE side, which reduces the blade angle. A finer blade takes a smaller bite of air, unloading the engine so the RPM rises again.",
    "As the RPM climbs back to the selected value the valve returns to neutral. Together with the over-speed case, this is how the CSU keeps the RPM constant whatever the aircraft is doing.",
  ],
  "ppfig-fig_12_15": [
    "This is a fuller governor that adds feathering and a pitch lock. The centrifugal weights and governor spring work as before to position the governor valve for fine or coarse pitch within the normal range.",
    "Moving the control beyond minimum RPM selects FEATHER, and a valve-lift solenoid and valve-lift piston drive the blade all the way to the feathered angle. A pitch-lock solenoid and non-return valve can lock the blade angle so it cannot drift if oil pressure is lost.",
    "A separate feather/unfeather oil supply and the normal engine oil inlet feed the unit; the drive shaft turns the flyweights.",
  ],
  "ppfig-fig_12_17": [
    "This shows how a feathered propeller is unfeathered (restarted) in flight. A feathered, stopped engine makes no oil pressure of its own, so a pre-charged unfeathering accumulator stores oil under pressure ready for the job.",
    "Pressing the unfeathering button energises a solenoid valve that releases the accumulator oil into the propeller oil line. This drives the blades out of feather so they begin to windmill, which spins the engine over for a relight.",
    "Non-return valves stop the oil flowing the wrong way, and once the engine is running again its own CSU oil pump takes over control.",
  ],
  "ppfig-fig_12_18": [
    "This shows an electrically-operated feathering system. Pressing the feathering button energises a solenoid relay — held in by a hold-on coil — which runs an electric oil pump from the aircraft battery and main power line.",
    "The pump sends high-pressure oil from the oil tank to the propeller to drive the blades to the feathered position.",
    "A pressure cut-out switch stops the pump once full feather (maximum oil pressure) is reached, breaking the hold-on circuit. Because it runs on electrical power, this system can feather the propeller even after the engine and its own pump have failed.",
  ],
  "ppfig-fig_12_19": [
    "This shows a propeller synchronising system, which keeps all the propellers turning at exactly the same RPM — removing the annoying 'beat' noise you hear when they drift slightly apart.",
    "One engine's governor is the MASTER; a magnetic pickup senses its speed and sends it to a control box. The control box compares the SLAVE engine's speed against the master.",
    "If they differ, the control box drives an actuator — through a flex shaft — to trim the slave governor until its RPM exactly matches the master. (A synchrophaser does the same but also matches the blade positions for the smoothest result.)",
  ],
  "ppfig-fig_12_22": [
    "A propeller has to turn much more slowly than the engine's crankshaft, otherwise its tips would reach supersonic speed and become noisy and inefficient. A reduction gear between the engine and the propeller does this.",
    "Layout A is a simple spur-gear reduction — a small gear on the engine shaft driving a larger gear on the propeller shaft, so the propeller shaft is offset from the engine shaft.",
    "Layout B is a more compact epicyclic (planetary) arrangement, in which the propeller shaft is concentric with — in line with — the engine shaft. Either way, reduction gearing lets the engine run at its efficient high RPM while the propeller turns at its efficient lower RPM.",
  ],

  // ─── Piston Engines — Performance & Power Augmentation (A.1.4) ───
  "ppfig-fig_11_03": [
    "A turbocharger uses the engine's own exhaust gas to drive a turbine, which spins a compressor on the same shaft to force extra air into the engine. The exhaust leaves the cylinders, drives the turbine and then exits; the compressor draws in air and delivers it, pressurised, to the inlet manifold.",
    "The amount of boost is set by a wastegate — a valve in the exhaust that can let some gas bypass the turbine. A wastegate controller, worked by engine oil pressure, closes the wastegate for more boost (more exhaust through the turbine) or opens it for less.",
    "By holding the target manifold pressure this way, the engine can keep making sea-level power well up into thinner air.",
  ],
  "ppfig-fig_11_04": [
    "This is a fuller turbocharger installation controlled by an absolute pressure controller (APC). The compressor and turbine share one shaft; the exhaust drives the turbine, and the wastegate in the by-pass duct decides how much exhaust is used.",
    "An aneroid capsule in the APC senses the compressor delivery (boost) pressure and, through a bleed valve and the oil-operated wastegate actuator, positions the wastegate to hold the set boost. A 'suck-in' flap lets the engine draw air directly if the turbo is not yet providing enough.",
    "The resulting boost is shown to the pilot on the boost pressure gauge.",
  ],
  "ppfig-fig_11_05": [
    "This traces the turbocharger from engine start up to critical altitude. At start and idle the wastegate is almost fully open, so there is little boost. As power is increased for take-off, the wastegate closes and the turbo RPM and compressor delivery pressure rise to give full boost.",
    "As the aircraft then climbs and the air thins, the controller progressively closes the wastegate further to keep the compressor delivery pressure constant — so boost and engine BHP are maintained even though the outside air is thinner.",
    "At the critical altitude the wastegate is fully closed; above that the turbo can no longer hold the boost, so delivery pressure and power finally begin to fall.",
  ],
  "ppfig-fig_11_06": [
    "This compares engine BHP against altitude for a normally-aspirated engine and two turbocharged setups. The normally-aspirated engine loses power steadily as it climbs, simply because the air gets thinner.",
    "A turbocharged engine holds its power up to its critical altitude — the highest altitude at which the turbo can still maintain its rated boost — after which its power also falls away.",
    "A 'ground-boosted' turbo gives extra power right from sea level; an 'altitude-boosted' turbo is arranged to restore sea-level power higher up. Above the critical altitude, every engine is limited by air density.",
  ],
  "ppfig-fig_11_09": [
    "This shows a supercharged engine with automatic boost control feeding a constant-speed propeller. The throttle lever sets the demanded power, and an Automatic Boost Controller adjusts the throttle to hold the chosen manifold (boost) pressure as conditions change — so the same lever position always gives the same boost.",
    "The engine-driven supercharger (turned through a spring drive unit) compresses the charge before it reaches the cylinders. The propeller constant-speed unit (CSU), set by the propeller/RPM lever, varies the blade angle to hold the selected RPM.",
    "So the pilot effectively flies the engine on two levers: the throttle sets the boost (manifold pressure), and the RPM lever sets the propeller speed.",
  ],
  "ppfig-fig_11_10": [
    "This explains 'rated altitude', or full-throttle height. An engine's rated power is the maximum continuous power it is cleared to give at its rated RPM and rated boost.",
    "As the aircraft climbs at full throttle, the supercharger or turbo keeps the boost up to a certain altitude — the full-throttle height — above which the throttle is already fully open and the power starts to fall.",
    "Using less than rated RPM, or less than rated boost, changes that full-throttle height, as the three lines show. Full-throttle height is simply the altitude at which the engine can only just hold its rated power with the throttle fully open.",
  ],
  "ppfig-fig_11_11": [
    "This cutaway shows how an automatic boost controller works. An aneroid capsule senses the boost (inlet-manifold) pressure.",
    "If the boost gets too high, the capsule is compressed and moves a landed (servo) valve that ports engine oil pressure to a servo piston, which eases the throttle valve closed; if the boost is too low, it opens the throttle slightly. A cam, moved by the boost selector lever, sets the datum the capsule works to.",
    "In this way the controller automatically holds the selected boost pressure whatever the altitude or throttle position, so the engine cannot be over-boosted.",
  ],
  "ppfig-fig_11_12": [
    "This compares a supercharged engine with a normally-aspirated one as altitude increases. The normally-aspirated engine loses power steadily from sea level because the air gets thinner.",
    "The supercharged engine is deliberately set to give slightly less than its full sea-level potential low down (so it is not over-boosted), but because the supercharger keeps packing the cylinders, its power holds up — even rising a little — until the full-throttle height, beyond which it too falls away.",
    "So supercharging trades a little sea-level power for much better power at altitude.",
  ],
  "ppfig-fig_11_13": [
    "This summary graph compares four engines against altitude: normally-aspirated, internally-supercharged, altitude-boosted turbo and ground-boosted turbo.",
    "The normally-aspirated engine loses power steadily. The internal supercharger starts lower but holds power up to its full-throttle height. The turbochargers maintain high power up to their critical altitudes (lower or higher, depending on the setup) before falling.",
    "The take-away points: boosting (supercharging or turbocharging) maintains power at altitude; every boosted engine has a critical altitude / full-throttle height beyond which power still falls; and whether it is ground-boosted or altitude-boosted decides whether the extra power is available low down or restored higher up.",
  ],

  // ─── Piston Engines — Fuel Injection (A.1.4) ───
  "ppfig-fig_10_01": [
    "This shows a continuous-flow fuel injection system. Instead of a carburettor, fuel from the engine-driven (M) and electric (E) pumps is delivered under pressure to a fuel/air control unit, which meters it according to throttle position and the pilot's mixture setting.",
    "The metered fuel is then piped to a small spray nozzle at each cylinder's inlet port, so the fuel is injected right at the inlet valve rather than being mixed far upstream. A fuel-pressure gauge reads the metered pressure, which indicates the fuel flow/mixture.",
    "Because the fuel is injected downstream there is no venturi to freeze, so injection largely avoids the carburettor-icing problem and also gives more even fuel distribution between cylinders. An alternate air source is provided in case the normal intake becomes blocked by impact ice.",
  ],
  "ppfig-fig_10_03": [
    "This shows a modern electronically-controlled common-rail injection system, of the kind used on newer aircraft piston engines that run on jet fuel/diesel.",
    "A high-pressure pump raises the fuel to very high pressure and feeds a common rail — a shared pressurised pipe — connected to an electronic injector at each cylinder. An Electronic Control Unit, reading inputs from engine sensors, decides exactly how much fuel each injector delivers and precisely when, and an electronic driver unit fires the injectors.",
    "This gives very accurate fuel metering and timing for low fuel consumption and clean combustion, and it needs no separate mixture control — the ECU manages everything automatically, allowing single-lever power control.",
  ],

  // ─── Piston Engines — Induction Icing (A.1.4) ───
  "ppfig-fig_09_02": [
    "This shows where ice forms in a carburettor. The main problem is carburettor ice (yellow): as the fuel is sprayed in and evaporates it takes heat from the air (a refrigeration effect), and the air also cools as it speeds up and its pressure drops through the venturi and past the throttle.",
    "The temperature can fall by 20–30°C, so ice can build up on the throttle butterfly and the venturi walls even when the outside air is well above freezing — gradually choking the airflow. Fuel icing (red, less common) is water carried in the fuel freezing out.",
    "Carb ice is most likely at low power (throttle nearly closed, where the cooling and restriction are worst) in moist air roughly between 0 and +20°C. The first sign is a drop in RPM (fixed-pitch prop) or manifold pressure (constant-speed prop); the cure is full carburettor heat, which feeds warm air to melt the ice — RPM drops first, then rises again as the ice clears.",
  ],

  // ─── Piston Engines — Carburettors (A.1.4) ───
  "ppfig-fig_08_03": [
    "This shows a simple float-chamber carburettor. Fuel from the pump enters the float chamber, where a float and needle valve keep the fuel at a constant level — exactly like the ball-cock in a water cistern.",
    "From there the fuel is drawn up the main jet into the venturi, where the fast-moving air (and its low pressure) pulls the fuel out as a spray and mixes it with the air going to the engine. The throttle valve downstream controls how much mixture reaches the engine.",
    "The pressure-balance duct connects the top of the float chamber to the carburettor air intake, so the air pressure pressing on the fuel always matches the pressure at the jet. This keeps the fuel metering correct even if the air filter becomes partly blocked.",
  ],
  "ppfig-fig_08_04": [
    "This shows the diffuser well with the engine stopped, so the fuel is at rest. With no air flowing, the fuel level in the well and in the float chamber are the same.",
    "The main jet feeds fuel from the float chamber into the diffuser well, ready to be drawn up into the venturi once the engine runs.",
    "Seeing this static (engine-stopped) condition first makes it easier to understand what the air bleed does when the engine is running: the well starts full, primed to supply fuel.",
  ],
  "ppfig-fig_08_05": [
    "This shows the air bleed (or diffuser), which cures a basic fault of the simple carburettor. A plain main jet would make the mixture progressively RICHER as airflow increases, because the venturi suction grows faster than the jet can meter the fuel.",
    "To prevent this, air is drawn in through an air-bleed jet and mixed with the fuel in the diffuser well before it reaches the venturi. This breaks the fuel into a frothy air/fuel emulsion.",
    "The result is that the mixture strength stays roughly constant as power changes, and the fuel is better atomised for cleaner, more complete combustion.",
  ],
  "ppfig-fig_08_06": [
    "At idle the throttle is almost closed, so there is barely any airflow through the venturi and the main jet delivers little or no fuel. A separate idle (slow-running) system is therefore needed.",
    "An idle jet takes fuel from the float chamber and delivers it just downstream of the nearly-closed throttle valve, where the suction is high — drawing the fuel out to keep the engine running at idle. Air bleeds mix air with this idle fuel.",
    "The idle cut-off, linked to the cockpit mixture control, shuts the fuel off completely to stop the engine. This is why a piston engine is shut down with the mixture control (idle cut-off): it leaves no fuel in the cylinders and the engine stops cleanly, and the magnetos can then be checked dead.",
  ],

  // ─── Piston Engines — Mixture (A.1.4) ───
  "ppfig-fig_07_01": [
    "This chart shows how the air/fuel ratio is chosen for different engine conditions. The chemically-correct (stoichiometric) ratio is about 15:1, where in theory all the fuel and all the oxygen are used up.",
    "To each side of it are two useful mixtures. A slightly RICH mixture (around 12.5:1) gives BEST POWER — used for take-off and maximum cruise, where the extra fuel also cools the charge and guards against detonation. A slightly WEAK/lean mixture (around 16–17:1) gives BEST ECONOMY — the lowest specific fuel consumption, used for economy cruise.",
    "At idle, a richer mixture is needed again just to ensure enough fuel vapour to keep the engine running smoothly. So the rule is: rich for power and cooling, lean for economy, with the chemically-correct ratio in between.",
  ],
  "ppfig-fig_07_02": [
    "This shows how the pilot leans the mixture using the exhaust gas temperature (EGT) gauge. Starting from full rich (lever in), as the mixture is leaned the EGT rises — because the burn becomes more complete — until it reaches a maximum, called PEAK EGT, at roughly the chemically-correct mixture.",
    "If leaning continues past the peak, the EGT falls again because there is now too little fuel. The two sides of the peak are named for what cools the charge: on the rich side the excess fuel does the cooling ('fuel cooling'), and on the lean side the excess air does it ('air cooling').",
    "Pilots lean to a set number of degrees rich of peak for best power, or to peak / lean of peak for best economy, always following the engine manufacturer's figures — and never leaning so far that the engine runs rough or starts to detonate.",
  ],

  // ─── Piston Engines — Fuel / Combustion (A.1.4) ───
  "ppfig-fig_06_01": [
    "This shows normal combustion in the cylinder. The spark plug fires (1. Normal Ignition) and a flame front starts at the plug.",
    "The flame then spreads smoothly and progressively across the combustion chamber (2. Flame Spreads), burning the fuel/air mixture in a controlled way, until the whole charge is burned (3. Combustion Complete).",
    "The key point is that normal combustion is a smooth, progressive burn — not an explosion. This gives a steady, rising push on the piston, which is what delivers power efficiently and without damaging the engine.",
  ],
  "ppfig-fig_06_02": [
    "The spark must be timed to fire BEFORE Top Dead Centre so that the mixture is burning strongly just as the piston passes TDC and starts down. This diagram shows why the amount of this 'advance' has to change with engine speed.",
    "At HIGH rpm there is very little time for the flame to spread, so the spark must be advanced further (fired earlier) for combustion to be complete at the right moment. At LOW rpm there is more time, so less advance is needed.",
    "On a simple magneto the timing is fixed, but many ignition systems automatically vary the advance with rpm to keep the combustion correctly phased across the speed range.",
  ],
  "ppfig-fig_06_03": [
    "This shows detonation — an abnormal and damaging form of combustion. After the spark fires normally (1), the rising pressure and temperature can make the last of the unburnt charge ahead of the flame front (the 'end gas') suddenly self-ignite and explode all at once (2. End Gas Explodes) instead of burning smoothly.",
    "That produces a violent pressure spike and shock wave (3. Detonation) which hammers the piston and overheats the engine — heard as 'knocking' or 'pinking'. It is caused by too high a charge temperature or pressure: high manifold pressure with low rpm, too lean a mixture, too high a cylinder-head temperature, or fuel of too low an octane rating.",
    "The cure is to reduce power, enrich the mixture, open the cowl flaps, and never use a fuel below the specified grade. (Pre-ignition is different — it is the charge being lit by a hot spot BEFORE the spark fires.)",
  ],

  // ─── Piston Engines — Ignition (A.1.4) ───
  "ppfig-fig_05_01": [
    "This shows how a magneto makes the sparks that fire the engine — entirely on its own, with no battery needed. A permanent magnet is spun by the engine past a coil, inducing a current in the primary winding.",
    "The contact breaker (a cam-operated switch) suddenly opens the primary circuit, and the rapid collapse of the magnetic field induces a very high voltage in the secondary winding. The condenser (capacitor) across the points prevents arcing and sharpens the collapse, giving a hotter spark. That high-voltage pulse goes to the distributor, a rotating arm that routes it to each spark plug in the correct firing order (1-2-3-4 here).",
    "The ignition switch works by GROUNDING the primary circuit: in the 'off' position it shorts the magneto so no spark is produced. This is why a broken earth lead (P-lead) leaves the magneto 'live' — the engine then cannot be switched off and the propeller must be treated as dangerous. Mechanical linkage keeps the distributor timed to the engine.",
  ],

  // ─── Piston Engines — Cooling (A.1.4) ───
  "ppfig-fig_04_01": [
    "This shows a liquid (water/glycol) cooling system, of the kind used on some engines and on older high-power types. A pump circulates the coolant through passages in the cylinder block, where it absorbs heat from the cylinders.",
    "The hot coolant then flows to the radiator, where the airflow carries the heat away, before returning to the engine. A header tank allows the coolant to expand and keeps the system topped up.",
    "Liquid cooling gives very even cylinder temperatures, but it adds weight and complexity (pump, radiator, coolant and plumbing) — which is why most light aircraft use the simpler air-cooling method instead.",
  ],

  // ─── Piston Engines — General (A.1.4) ───
  "ppfig-fig_02_01": [
    "Aircraft piston engines come in several cylinder arrangements. In-line engines place the cylinders in a single row; V engines use two rows set at an angle (here 60°) sharing one crankshaft, giving more power in a shorter length.",
    "Radial engines arrange the cylinders in a circle (in a single or double 'bank') around the crankshaft — they cool well and give high power for their length, which is why they were common on older large aircraft.",
    "The flat (horizontally-opposed) engine lays the cylinders in two opposing rows. It is low, compact and smooth-running, so almost all modern light aircraft use the 4- or 6-cylinder flat layout.",
  ],
  "ppfig-fig_02_02": [
    "This defines the basic engine dimensions. The bore is the diameter of the cylinder. The stroke is the distance the piston travels between its highest point (Top Dead Centre, TDC) and its lowest point (Bottom Dead Centre, BDC).",
    "The crank throw is how far the crankpin is offset from the centre of the crankshaft. Because the piston goes from TDC to BDC as the crank turns half a revolution, the stroke is exactly twice the crank throw.",
    "The swept volume (the working capacity of one cylinder) is the bore area multiplied by the stroke.",
  ],
  "ppfig-fig_02_04": [
    "This circular diagram shows when the valves open and close relative to crank angle through the two revolutions (720°) of the four-stroke cycle.",
    "The valves do not open and close exactly at TDC and BDC. The inlet valve opens before TDC and closes after BDC; the exhaust valve opens before BDC and closes after TDC. This 'lead' and 'lag' uses the momentum of the gases to fill and scavenge the cylinder more completely.",
    "The period near TDC when both valves are open together is the valve overlap, which improves cylinder filling (volumetric efficiency). Ignition is timed to occur before TDC so the charge is burning strongly as the piston starts down.",
  ],
  "ppfig-fig_02_05": [
    "This is a practical valve and ignition timing diagram with the actual angles marked, drawn against the piston positions rather than as a circle.",
    "It shows the same idea as the circular diagram — the inlet valve opening before TDC and closing after BDC, the exhaust valve opening before BDC and closing after TDC, and ignition advanced before TDC.",
    "The exact angles are chosen by the designer to get the best cylinder filling and scavenging across the engine's normal speed range.",
  ],
  "ppfig-fig_02_06": [
    "This explains why the valves are timed the way they are. Near TDC (left) the piston barely moves for a given amount of crankshaft rotation — 45° of crank movement shifts the piston only a tiny distance.",
    "Around the middle of the stroke (right) that same 45° of crank rotation moves the piston a large distance and does most of the useful work.",
    "The region near TDC and BDC, where crank rotation produces little piston movement, is the 'ineffective crank angle'. Because so little happens there, the valves can be opened early and closed late without losing much — while gaining much better gas flow.",
  ],
  "ppfig-fig_02_08": [
    "This shows a manifold absolute pressure (MAP) gauge connected to the inlet manifold. MAP is the pressure of the air/fuel charge being delivered to the cylinders.",
    "It is the pilot's measure of how much power the engine is making — set by the throttle (and, on a supercharged/turbocharged engine, by the boost).",
    "Because engine power depends on the mass of charge burned, MAP together with RPM is the key indication of power on an aircraft with a constant-speed propeller.",
  ],
  "ppfig-fig_02_10": [
    "This defines the compression ratio. The total volume is the cylinder volume with the piston at BDC; the clearance volume is the small space left above the piston at TDC; and the swept volume is the difference between them — what the piston actually sweeps through.",
    "The compression ratio is the total volume divided by the clearance volume.",
    "A higher compression ratio squeezes the charge more, raising the engine's thermal efficiency and power — but it also makes the engine more prone to detonation, so the compression ratio is limited by the fuel's anti-knock (octane) rating.",
  ],
  "ppfig-fig_02_12": [
    "This shows the crankshaft, which converts the pistons' up-and-down motion into rotation. Each connecting rod's big end runs on a crankpin that is offset from the main axis, so as a piston is pushed down it turns the crank.",
    "The main journals run in the main bearings, and the web extensions act as balance weights to smooth out the rotation. The rear end carries the drive for the camshaft, and the front flange is where the propeller bolts on.",
    "Oil is fed through passages drilled inside the crankshaft, from the main-bearing journals out to the big-end crankpins, to lubricate the bearings.",
  ],
  "ppfig-fig_02_15": [
    "This shows the valve-operating gear. The rotating camshaft has lobes that, once per cycle, push a cam follower (tappet) and push-rod upward; this rocks the rocker arm about its shaft, and the rocker pad presses on the valve tip to open the valve against its springs.",
    "The valve slides in the valve guide and seats on its face in the cylinder head. A small valve (tappet) clearance is left between the rocker pad and the valve tip so the valve can still close fully when the parts expand with heat.",
    "Too little clearance holds the valve open (giving a burnt valve and a weak cylinder); too much makes the gear noisy and opens the valve late. A hydraulic tappet takes up this clearance automatically.",
  ],
  "ppfig-fig_02_16": [
    "This shows the rear of a flat engine, where the engine-driven accessories are mounted on the accessory housing.",
    "Visible are the two magnetos (the self-contained ignition units), the starter motor, the generator for electrical power, the carburettor and induction manifold feeding the cylinders, and the oil sump at the bottom.",
    "Grouping these drives at the back keeps them accessible for servicing and lets them be driven directly from the crankshaft gear train.",
  ],

  // ─── Piston Engines — Introduction (A.1.4) ───
  "ppfig-fig_01_01": [
    "This cutaway names the main parts of a piston (reciprocating) engine. The piston slides up and down inside the cylinder; above it, the cylinder head carries the inlet and exhaust valves — which let the mixture in and the burnt gas out — and the spark plug that ignites the charge.",
    "The piston is joined by a connecting rod to the crankshaft, which turns the piston's up-and-down (reciprocating) motion into rotation to drive the propeller.",
    "The crankcase is the main body that houses the crankshaft and ties everything together. This basic layout is common to all aircraft piston engines.",
  ],
  "ppfig-fig_01_02": [
    "This shows how airflow behaves in a venturi — a tube that narrows and then widens — which is the principle a carburettor is built on.",
    "In the convergent (narrowing) part the air speeds up, and as it speeds up its pressure and temperature fall. At the narrowest point (the throat) the velocity is greatest and the pressure and temperature are lowest.",
    "In the divergent (widening) part the air slows down again, so its pressure and temperature rise back up. It is the low pressure at the throat that a carburettor uses to draw fuel into the airstream.",
  ],
  "ppfig-fig_01_03": [
    "This shows the four strokes of the piston engine's cycle, in order. INDUCTION: the piston moves down, the volume increases and the pressure falls, drawing the fuel/air mixture in through the open inlet valve.",
    "COMPRESSION: the piston rises with both valves closed, so the volume is reduced and the pressure (and temperature) rise. POWER: the compressed mixture is ignited and the rapid rise in temperature and pressure drives the piston down — this is the only stroke that actually produces power.",
    "EXHAUST: momentum carries the piston back up with the exhaust valve open, pushing the burnt gases out. The whole cycle takes two crankshaft revolutions (720°), and the combustion happens at roughly constant volume.",
  ],

  // ─── Gas Turbines — Introduction (A.1.5) ───
  "ppfig-fig_13_01": [
    "This is the aeolipile (Hero's engine), the oldest demonstration of the reaction principle that every jet engine uses. A fire boils water in the sphere; steam escapes through two bent nozzles and the jets push the sphere round in the opposite direction.",
    "Nothing pushes against the outside air and no paddle or gear touches anything — the turning effort comes purely from throwing mass (steam) out of the nozzles. That is Newton's third law: for every action there is an equal and opposite reaction.",
    "A gas-turbine engine works in exactly the same way: it throws a high-speed jet of gas rearward and the reaction drives the aircraft forward. The only real difference is scale and the use of a compressor and turbine to keep the process going continuously.",
  ],
  "ppfig-fig_13_02": [
    "Two simple jet layouts. The top one is the 'aerodynamic thermal duct' — a ramjet. It is just a cleverly-shaped tube: fast air entering at the front is slowed and compressed by the duct shape, fuel is burned, and the hot gas accelerates out of the back to make thrust. It has no moving parts.",
    "The catch with the ramjet is that it cannot make thrust at rest — it needs high forward speed before the duct can ram-compress the air, so it can't be used to take off.",
    "The bottom engine is Whittle's turbojet. Here a compressor (driven by a turbine behind the flame) does the compressing, so the engine produces thrust from a standing start. This compressor–combustor–turbine arrangement is the basis of every gas-turbine engine flying today.",
  ],
  "ppfig-fig_13_03": [
    "This compares the piston engine's Otto cycle (top) with the gas turbine's Brayton cycle (bottom). Both do the same four jobs — induction, compression, combustion (power) and exhaust.",
    "The difference is timing. In the piston engine the four events happen one after another in the same cylinder, so the process is intermittent — any one cylinder is only making power a quarter of the time.",
    "In the gas turbine the four events happen continuously and all at the same time, each in its own part of the engine: air is always being taken in at the front, compressed, burned in the middle, and exhausted at the back. This continuous flow is why a gas turbine runs so smoothly and can swallow enormous amounts of air.",
  ],
  "ppfig-fig_13_04": [
    "This is the pressure–volume diagram of the gas-turbine (constant-pressure/Brayton) cycle. Follow the loop A→B→C→D→A.",
    "A to B is COMPRESSION: the compressor raises the pressure and the volume falls. B to C is COMBUSTION: heat is added in the combustion chambers and the gas expands — crucially, this happens at roughly CONSTANT PRESSURE. C to D is EXHAUST/EXPANSION: the hot gas expands through the turbine and exhaust nozzle, pressure falling as energy is taken out and the jet is speeded up. D back to A is INDUCTION of fresh ambient air.",
    "The key exam point is the shape of B–C: a gas turbine burns its fuel at constant pressure, unlike the piston engine which burns at (roughly) constant volume.",
  ],
  "ppfig-fig_13_05": [
    "This graph traces what happens to the air's total pressure, axial velocity and temperature as it flows through the engine from the air intake to the propulsion nozzle.",
    "Through the compressor, total pressure climbs steeply (toward compressor-delivery pressure) while the axial velocity is kept fairly low and steady. In the combustion chamber the temperature leaps as fuel burns, while the pressure is roughly held.",
    "Through the turbine and nozzle guide vanes the pressure drops sharply as the turbine extracts energy to drive the compressor, and the remaining energy is turned into speed — so velocity peaks at the propulsion nozzle. Note the highest temperature occurs at turbine entry, which is why the turbine is the most thermally-stressed part of the engine.",
  ],
  "ppfig-fig_13_06": [
    "These two duct shapes behave in opposite ways for subsonic gas flow, and together they explain the whole gas path of the engine.",
    "A DIVERGENT duct (one that widens) slows the gas down and so raises its pressure and temperature. You find this shape at the compressor outlet casing/diffuser, where the job is to convert speed into pressure before combustion.",
    "A CONVERGENT duct (one that narrows) speeds the gas up and so lowers its pressure and temperature. This is the shape of the turbine nozzle guide vanes, which accelerate the gas and aim it onto the turbine blades to spin them. Knowing which duct does which is the key to understanding compressors, nozzles and the exhaust.",
  ],
  "ppfig-fig_13_09": [
    "This is a cutaway of a centrifugal-flow turbojet. Air is drawn in and flung outward by a spinning impeller (the centrifugal compressor), then turned and fed through reverse-flow combustion chambers before passing to the turbine and out the back.",
    "Centrifugal compressors are robust, simple and give a large pressure rise in a single stage. Their drawback is a big frontal area and the difficulty of staging them, which limits the practical pressure ratio to about 15:1.",
    "Because of that limit, large modern engines use axial compressors instead — but the centrifugal type is still common in APUs and small turboprops where simplicity and ruggedness matter more than frontal area.",
  ],
  "ppfig-fig_13_10": [
    "The engine is divided into numbered 'stations' so that conditions at any point can be referred to exactly. P stands for pressure and T for temperature; P0/T0 is the ambient air ahead of the engine and the numbers increase through the engine to the exhaust (P8/T8).",
    "This is a twin-spool engine: N1 is the low-pressure spool (the fan and the LP turbine that drives it) and N2 is the high-pressure spool (the HP compressor and HP turbine). The two spools run on concentric shafts, each free to turn at its own best speed.",
    "This station numbering is how engine instruments and performance figures are defined — for example EGT is a temperature read at a particular station, and EPR compares the pressure at two stations.",
  ],
  "ppfig-fig_13_11": [
    "The same station-numbering idea, but applied to a triple-spool turbofan. Here there are three independent spools: N1 (the fan), N2 (the intermediate-pressure compressor) and N3 (the high-pressure compressor), each on its own concentric shaft.",
    "Giving each compressor its own shaft lets every spool turn at the speed that suits it best, which improves efficiency and widens the surge margin — at the cost of extra mechanical complexity.",
    "PF marks the fan/bypass stream. As before, the P and T station labels let engine conditions be quoted precisely from intake (P0/T0) to exhaust (PE/TE).",
  ],
  "ppfig-fig_13_12": [
    "This graph shows why different engine types suit different speeds — it plots propulsive efficiency against airspeed.",
    "The turboprop is the most efficient at low speed but its curve falls away sharply above about 400 mph. A high-bypass turbofan peaks a little higher and is best around airliner cruise speeds. A pure turbojet is poor at low speed but keeps improving as speed rises, which is why it suited early fast jets.",
    "The underlying rule: propulsive efficiency is highest when the jet is only a little faster than the aircraft. Moving a large mass of air and speeding it up only slightly (high bypass) is more efficient than throwing a small mass of air backwards very fast (pure jet).",
  ],
  "ppfig-fig_13_13": [
    "This exploded view shows how a modern engine is built from separate modules — the LP (fan) module, the IP and HP compressor modules, the combustion/HP-system module, the IP & LP turbine modules and the external accessory gearbox.",
    "Each module is a self-contained unit that can be removed and replaced on its own. If one section is worn or damaged it is swapped out without having to strip the entire engine.",
    "This modular approach dramatically cuts maintenance time and cost, and it is what allows some repairs to be done 'on wing' or an engine to be turned round quickly in the shop.",
  ],

  // ─── Gas Turbines — Air Inlets (A.1.5) ───
  "ppfig-fig_14_01": [
    "This compares the pressure in the engine intake when the aircraft is flying fast (top, ~210 kt) with when it is standing still (bottom) — and the key point is that the intake pressure gauge reads almost the same in both cases.",
    "The engine intake is a divergent duct. When the aircraft is moving, the fast air is slowed inside the duct and its speed is recovered as pressure ('ram recovery'). When stationary, the engine simply draws air in and the intake still delivers close to ambient static pressure.",
    "So the intake's job is to deliver a smooth, steady, high-pressure supply of air to the compressor across the whole speed range. Delivering distortion-free air matters just as much as pressure — turbulent or uneven intake flow is a common cause of compressor surge.",
  ],

  // ─── Gas Turbines — The Turbine Assembly (A.1.5) ───
  "ppfig-fig_17_03": [
    "This cutaway shows the turbine section of a triple-spool engine. The hot gas leaving the combustion chamber flows through alternating rings of fixed nozzle guide vanes and rotating turbine blades, giving up its energy stage by stage.",
    "Each spool has its own turbine on its own shaft, and the shafts run one inside the other. The high-pressure turbine comes first because it meets the hottest, highest-pressure gas and drives the HP compressor; next the intermediate-pressure turbine drives the IP compressor; and finally the low-pressure turbine drives the fan.",
    "Splitting the turbine this way lets each compressor be turned at the speed that suits it best. By the time the gas reaches the LP turbine it has already given up much of its energy and cooled considerably.",
  ],
  "ppfig-fig_17_05": [
    "This shows how a turbine turns a stream of gas into rotation. The fixed nozzle guide vanes (left) form convergent passages that accelerate the gas and aim it onto the moving blades at exactly the right angle.",
    "On a pure impulse blade the passages between the blades stay the same width (a 'parallel duct'), so the gas does not expand further as it crosses them. The blade is simply pushed round by the fast jet striking it — much like water hitting a water wheel.",
    "The small red arrows mark the gas being squeezed and sped up in the guide vanes; the blue arrows show it then striking the rotating blades and driving them in the direction of rotation. In practice most turbine blades use a blend of impulse and reaction from root to tip.",
  ],
  "ppfig-fig_17_07": [
    "This shows how a turbine blade is held in the disc and sealed at its tip. The root of the blade is machined into a 'fir-tree' shape that slides into a matching slot in the rim of the turbine disc.",
    "The fir-tree root is deliberately a loose fit when the engine is cold — the blades actually rattle (often described as 'a bag of nails') if you turn a cold engine by hand. Only when the engine is running does centrifugal force pull each blade firmly outward into its slot. This loose cold fit also lets the blade expand freely as it heats up and helps cooling air flow around the root.",
    "The blade shroud is a small platform on the tip of the blade. When all the blades are fitted, their shrouds meet to form a ring that seals the blade tips against the casing — cutting the amount of gas that leaks over the tips — and also damps blade vibration.",
  ],

  // ─── Gas Turbines — Fuel Systems (A.1.5) ───
  "ppfig-fig_26_01": [
    "This schematic traces the fuel from the tank all the way to the burners. Tank booster pumps push fuel to the engine, and the LP shut-off valve — linked to the fire handle — can cut the supply in an emergency.",
    "The LP pump raises the pressure a little, then the fuel passes through a fuel-cooled oil cooler (which warms the fuel and cools the oil) and a fuel heater to prevent ice, is filtered, and reaches the HP pump that produces the high pressure needed to atomise the fuel.",
    "The Fuel Control Unit (FCU) then meters exactly the right amount of fuel for the thrust demanded, and the HP cock gives a clean engine shutdown. A flow meter measures the fuel used before it reaches the fuel spray nozzles, and a drains tank collects fuel drained on shutdown. The gauges show N1, N2, fuel pressure, temperature and flow.",
  ],
  "ppfig-fig_26_02": [
    "This is a variable-stroke (swash-plate) high-pressure fuel pump — the type that delivers exactly the fuel flow required rather than a fixed amount. Low-pressure fuel (yellow) enters at the inlet and fills the cylinders in the rotor.",
    "As the rotor turns, the plungers ride on the angled swash plate and are pushed in and out, pumping the fuel out at high pressure (red) toward the FCU and burners.",
    "The angle of the swash plate sets how far each plunger strokes, and therefore how much fuel is delivered. A servo piston (purple), moved by servo pressure, changes that angle — so the pump matches its delivery to demand instead of wastefully spilling excess fuel.",
  ],
  "ppfig-fig_26_03": [
    "This shows how a hydro-mechanical Fuel Control Unit (FCU) meters the fuel. Fuel from the pump (red = HP) passes through the main filter and the throttle valve — which the pilot moves to call for more or less fuel — on its way to the burner.",
    "Simply opening the throttle is not safe on its own, so the FCU adds automatic controls. An RPM governor limits the maximum speed: if the engine tries to over-speed it bleeds servo pressure to move the pump's swash plate and reduce the fuel. Barometric/back-pressure controls adjust the fuel for changes in air pressure (altitude) and compressor-outlet pressure.",
    "The HP cock is the final fuel shut-off. The colours trace the LP fuel, HP fuel, servo pressure and governor/air signals through the unit.",
  ],
  "ppfig-fig_26_04": [
    "This shows the signals an engine control system uses to set thrust accurately. The pilot's throttle lever angle is passed by a mechanical linkage to the control unit, together with the aircraft Mach number and the engine's own intake temperature (T1) and intake pressure (P1).",
    "From these the control works out EPR (engine pressure ratio) — the ratio of exhaust pressure to intake pressure, a direct measure of the thrust being produced.",
    "Using these inputs the control maintains the selected thrust constant regardless of changes in outside temperature or pressure, so the same throttle position gives the same thrust whatever the conditions. This is the basis of EPR-based thrust setting.",
  ],
  "ppfig-fig_26_05": [
    "This shows the many inputs used by a Full-Authority Digital Engine Control (FADEC). From the aircraft it receives throttle lever angle, Mach number, altitude, ambient and inlet temperature, air density and signals from the flight management system (FMS).",
    "From the engine it reads a host of sensors — intake pressure and temperature (P1, T1), the spool speeds (N1, N2, N3), other pressures and temperatures (P0, T3) and the oil temperature (TOIL).",
    "The FADEC processes all of these and schedules the fuel (and the variable vanes, bleed valves and so on) to give exactly the demanded thrust, while automatically protecting the engine against over-speed, over-temperature and surge — doing continuously and precisely what the old hydro-mechanical FCU did mechanically.",
  ],

  // ─── Gas Turbines — Bleed Air (A.1.5) ───
  "ppfig-fig_27_01": [
    "This shows the whole bleed-air (pneumatic) system. Hot, high-pressure air is tapped from the engine compressor — from a low stage (here the 5th) at low power, and from a higher stage (the 9th/HP) when more pressure is needed, selected automatically by the engine bleed-air control valves.",
    "The HP shut-off valve and a pre-cooler (cooled by fan air through its own control valve) condition the air before it joins the pneumatic manifold. An isolation valve can separate the left and right sides of the manifold.",
    "From the manifold the air feeds the air-conditioning packs (which cool it and distribute it through the mix manifold and overhead ducts), the wing and tail anti-icing, engine starting (via the starter valve), and hydraulic-reservoir and water-tank pressurisation. On the ground the APU or a ground-service connection can supply the same manifold.",
  ],
  "ppfig-fig_27_02": [
    "This shows how turbine-blade cooling has improved over the decades, which is what has allowed engines to run at ever-higher — and therefore more efficient — gas temperatures.",
    "Early blades (1960s) had simple single-pass internal cooling: cool compressor air passed up through the blade once. By the 1970s blades used multi-feed internal passages plus film cooling, where air bleeds out through tiny holes to lay a protective film of cool air over the blade surface.",
    "Modern blades use a complex multi-pass internal network with extensive film cooling over the whole blade. In every case the cooling air is bled from the compressor — cooling the blades is what lets the turbine-entry temperature be far higher than the bare metal could survive.",
  ],
  "ppfig-fig_27_03": [
    "This shows where the cooling and sealing air actually goes inside the turbine. High-pressure air (red) bled from the compressor is ducted to cool the nozzle guide vanes and the turbine blades — flowing up inside them — and to cool the turbine discs.",
    "The same air pressurises the interstage seals, which stops the hot main-stream gas from leaking down between the stages onto the discs and shafts.",
    "The spent low-pressure cooling air (blue) is finally dumped overboard. Without this constant flow of compressor air, the turbine components would quickly overheat and fail.",
  ],
  "ppfig-fig_27_04": [
    "These show two ways of sealing between the rotating and stationary parts inside the engine, both fed with sealing air bled from the compressor.",
    "The labyrinth air seal (left) is a non-contact seal: a series of thin fins run with a very small clearance so the leakage path is long and twisting, and a flow of sealing air is kept across it to hold the hot gas back.",
    "The hydraulic seal (right) uses sealing air to hold a ring of oil in a groove, forming a liquid barrier. Sealing the bearing chambers and interstage gaps in these ways keeps hot gas out and oil in.",
  ],

  // ─── Gas Turbines — APU & Engine Starting (A.1.5) ───
  "ppfig-fig_24_01": [
    "This is a cutaway of an Auxiliary Power Unit (APU) — a small, self-contained gas turbine, usually mounted in the tail of the aircraft. Its own compressor and turbine drive a generator for electrical power and also feed a load compressor that supplies bleed air through the air ducting.",
    "On the ground the APU provides electrical power and bleed air so the aircraft does not need external ground equipment. That bleed air runs the air-conditioning and, importantly, is used to start the main engines.",
    "The APU is itself started electrically from the aircraft battery, and on many aircraft it can also be run in flight as a backup source of power and air.",
  ],
  "ppfig-fig_24_02": [
    "This is the APU monitoring panel. The two gauges show the APU's speed (NG, as a percentage of maximum RPM) and its turbine gas temperature (TGT).",
    "Below the gauges are the shutdown-fault lights — overspeed, low oil pressure, high oil temperature and over-temperature. Any of these trips the APU and lights a red FAULT caption, which is cleared with the RESET button once the problem is dealt with.",
    "The lower annunciators give other status and warnings: DON'T LOAD (not yet ready to take electrical/pneumatic load), inlet flow, low oil quantity, battery condition, doors in transit (the inlet doors moving), fuel filter and max mode. Together they let the crew start, monitor and protect the APU.",
  ],
  "ppfig-fig_24_04": [
    "This is an air-turbine starter — the usual way of starting a large engine. High-pressure air is fed in at the air inlet and spins a small turbine rotor inside the unit.",
    "That rotor drives through a reduction gear and a clutch to the engine drive, cranking the HP spool up to the speed needed for a start. Once the engine is running on its own, the clutch disengages so the starter is not driven by the engine.",
    "Air starters are light and powerful for their size, which is why they are preferred over electric starters on big engines. The air to run them comes from the APU, a ground air supply, or another engine that is already running (cross-bleed).",
  ],
  "ppfig-fig_24_05": [
    "This schematic shows the three sources of starting air for a twin-engine aircraft. The APU (bottom) supplies bleed air through the air manifold to the start air valve and starter of each engine.",
    "On the ground, an external ground start unit (air cart) can instead feed the manifold through the air delivery hose. In the air — or on the ground with one engine already running — the cross-bleed valves let air from a running engine's compressor start the other engine.",
    "The HP shut-off valves, start air valves and cross-bleed valves route the air, and a cockpit light shows when a start valve is open. This flexibility means an engine can always be started from whatever air source is available.",
  ],

  // ─── Gas Turbines — Ignition Systems (A.1.5) ───
  "ppfig-fig_23_03": [
    "This is a cutaway of a high-energy igniter plug — the gas turbine's equivalent of a spark plug. At the tip, the central hot electrode is separated from the surrounding nickel-chromium shell (the body) by a layer of semiconductor material rather than a simple air gap.",
    "When the ignition unit fires, a small leakage current first ionises the surface of the semiconductor, creating a low-resistance path. The energy stored in the ignition unit's capacitor then discharges across it as a high-intensity flashover that needs only about 2000 volts — giving a very hot, powerful spark that lights the fuel/air mixture reliably during starting.",
    "Unlike a piston engine, the igniters fire only during starting and when continuous ignition is selected (heavy rain, icing, take-off and landing) — not continuously in the cruise.",
  ],

  // ─── Gas Turbines — Gearboxes and Accessory Drives (A.1.5) ───
  "ppfig-fig_22_01": [
    "This shows how the engine drives all its accessories. A radial driveshaft is taken off the HP (high-pressure) spool, passed out through the engine casing, and down to an external gearbox mounted on the outside of the engine — usually on the underside, where it is easy to reach for servicing.",
    "The HP spool is used as the drive because it keeps turning right across the operating range, so the accessories always have a reliable drive.",
    "The external gearbox then turns all the engine- and aircraft-driven accessories through the right step-down gearing.",
  ],
  "ppfig-fig_22_03": [
    "On larger engines the accessory drive is split between more than one gearbox running at different speeds — here a low-speed external gearbox and a high-speed external gearbox — so each accessory can be driven at the speed that suits it best.",
    "Both are driven, through step-down gearing, from the HP spool by way of the radial driveshaft.",
    "Mounting the gearboxes on the outside of the engine keeps the accessories accessible for inspection and replacement without having to open up the engine.",
  ],

  // ─── Gas Turbines — Reverse Thrust (A.1.5) ───
  "ppfig-fig_21_01": [
    "This shows the three main ways of reversing thrust, each drawn in its forward (stowed) position on the left and its reverse (deployed) position on the right.",
    "Clamshell doors (top) swing across the jet pipe to block the hot exhaust and deflect it forward through cascade vanes. Bucket/target reversers (middle) fold two large buckets out behind the nozzle to catch the hot jet and turn it forward. Both of these act on the hot exhaust stream.",
    "The blocker/cold-stream type (bottom) drops blocker doors into the bypass duct to stop the cold fan air going straight back, and cascade vanes turn it forward. This is the type used on high-bypass turbofans — and because most of the engine's thrust is in the cold fan stream, deflecting that stream gives most of the reverse thrust.",
    "In every case the airflow that normally blows rearward is turned to blow forward, so its reaction helps slow the aircraft. Reverse thrust is most effective at high speed just after touchdown; it is cancelled by about 60 kt to avoid re-ingesting debris and hot gas (which could cause FOD damage or a compressor stall), and interlocks prevent it deploying in flight.",
  ],

  // ─── Gas Turbines — Thrust (A.1.5) ───
  "ppfig-fig_20_01": [
    "This shows the engine's fundamental job: it takes in one unit of air and converts energy from one form to another to make thrust. In the compressor and combustor (left) the air gains potential energy — stored as pressure and heat.",
    "In the turbine and nozzle (right) that stored energy is released as kinetic energy — a high-speed jet leaving the back of the engine.",
    "Thrust is simply the reaction to throwing that air out faster than it came in (Newton's third law). The whole engine exists to turn potential energy into a fast-moving jet.",
  ],
  "ppfig-fig_20_02": [
    "This shows where a turbofan's thrust actually comes from. In this example the cold fan (bypass) stream produces 1200 lb at 800 ft/sec, while the hot core stream produces only 300 lb at 1000 ft/sec.",
    "So the large, relatively slow cold stream does most of the work — most of the thrust of a modern airliner engine comes from the fan, not the core jet.",
    "This is the whole idea of a high-bypass engine: moving a big mass of air and speeding it up only a little is far more efficient, and much quieter, than throwing a small mass of air out very fast as a pure jet does.",
  ],
  "ppfig-fig_20_04": [
    "This graph makes an important point: thrust is NOT proportional to engine speed. The line curves upward steeply near the top, so the last 10% of RPM produces roughly 30% of the thrust.",
    "Because of this, a small movement of the throttle near full power changes the thrust a great deal, and the engine has to be spun up close to maximum to get most of its thrust.",
    "It also means throttle handling needs to be smooth and accurate near the top of the range, where the engine is most responsive.",
  ],
  "ppfig-fig_20_05": [
    "These three plots show what happens as the aircraft climbs. Net thrust falls steadily with altitude because the air gets less dense, so the engine passes less mass of air per second.",
    "Fuel consumption also falls with altitude for the same reason — less air means less fuel burned.",
    "Crucially, specific fuel consumption (fuel burned per unit of thrust) stays almost flat and even improves slightly in the mid-altitudes before rising again. This good efficiency high up is a major reason jets cruise at high altitude.",
  ],
  "ppfig-fig_20_06": [
    "This shows how the maximum thrust is limited, and why hot days hurt performance. Below a certain outside air temperature (about 15°C here — the 'flat-rating' or corner temperature) the engine is held to 100% by a power/thrust limit; it could make more, but is deliberately flat-rated to protect it.",
    "Above that temperature the engine becomes EGT (temperature) limited. To keep the exhaust gas temperature within its limit, the thrust that can be produced falls as the outside air temperature rises.",
    "That is why take-off thrust — and therefore take-off performance — drops noticeably on a hot day.",
  ],
  "ppfig-fig_20_07": [
    "These plots show the effect of forward speed on a pure jet. As speed increases, net thrust first falls — because the air is already entering fast, so the engine adds less extra velocity to it.",
    "At the same time fuel consumption rises a little and specific fuel consumption rises steadily with speed.",
    "The message: a pure jet is least efficient at low speed, which is one reason it suits high-speed flight rather than slow flight (and why a turbofan or turboprop is better lower and slower).",
  ],
  "ppfig-fig_20_08": [
    "This compares thrust with and without the intake's ram effect. Without ram recovery, thrust would simply fall in a straight line as forward speed increases, because the engine adds less velocity to air that is already moving fast.",
    "But as the aircraft speeds up, the intake rams and compresses the incoming air, raising its pressure and the mass flow through the engine. This 'ram recovery' partly makes up for the loss.",
    "So the real net-thrust curve (upper line) flattens out and even begins to recover at high speed, instead of continuing to fall. This is why a jet's thrust holds up better with speed than simple theory predicts.",
  ],
  "ppfig-fig_20_09": [
    "A turboprop delivers most of its power to the propeller as shaft horsepower (SHP), with only a small residual jet thrust from the exhaust. These plots show SHP, net jet thrust, fuel consumption and specific fuel consumption against altitude.",
    "SHP, jet thrust and fuel flow all fall as the air thins with altitude, while specific fuel consumption dips to its best value in the mid-altitudes and then rises again.",
    "Notice how low the turboprop's SFC is (around 0.43–0.46) compared with a pure jet — this is why turboprops are so economical for the lower speeds and altitudes they are designed for.",
  ],

  // ─── Gas Turbines — Lubrication (A.1.5) ───
  "ppfig-fig_19_01": [
    "This is the layout of a typical gas-turbine oil system. It is a recirculatory system — the same oil is used over and over, being cleaned and cooled on each pass.",
    "The pressure pump draws oil from the oil tank through a suction filter and pushes it through the pressure filter and the pressure feed line to each bearing chamber along the rotating shaft. A pressure relief valve (if fitted) caps the maximum pressure. After lubricating and cooling the bearings, the oil drains to the bottom of each chamber and is pumped back by the scavenge pumps through a scavenge filter and a fuel-cooled oil cooler to the tank.",
    "There are always more (or bigger) scavenge pumps than pressure pumps, because the returning oil is frothy and takes up more room. A magnetic chip detector in the scavenge line catches metal particles for early warning of wear, and the oil temperature and pressure gauges let the crew monitor the system.",
  ],
  "ppfig-fig_19_02": [
    "This cutaway shows the recirculatory oil system built into a real turboprop. Feed oil (red) is delivered from the oil pump pack through strainers to the bearings and the reduction gearing; return oil (dark blue) is scavenged back.",
    "A de-aerator tray removes air bubbles from the returning frothy oil before it goes back to the tank, and a centrifugal breather separates oil from the air/oil mist in the bearing chambers, venting the clean air overboard.",
    "On a turboprop the same system also feeds the torquemeter (yellow), which measures the power going to the propeller, and an air-cooled oil cooler keeps the oil temperature within limits.",
  ],
  "ppfig-fig_19_03": [
    "Another real installation, this time a turbofan, showing the feed oil (red), return oil (yellow) and vent air (blue) paths. Oil runs from the tank through the oil pump pack and pressure filter to the bearing chambers along the shaft, then is scavenged back through the oil coolers to the tank.",
    "Two important monitoring items are highlighted. The oil pressure transmitter and low-pressure warning switch warn the crew of any loss of oil pressure. The oil differential-pressure switch measures the pressure drop across the filter and warns when it is starting to clog.",
    "As on every turbine engine, the centrifugal breather separates oil from the vent air so the engine does not throw oil overboard.",
  ],
  "ppfig-fig_19_04": [
    "This shows a typical engine oil tank and its fittings. The quantity measuring device uses a simple blue float whose position shows the oil level through a sight glass.",
    "A filler cap and dipstick allow manual checking and topping up, while a separate pressure-fill fitting lets the tank be filled quickly under pressure from a ground rig. An overflow drain prevents over-filling and a tank drain lets the oil be changed.",
    "The pressurizing relief valve keeps the tank slightly pressurised — which helps the pump keep its supply at altitude — while capping the maximum pressure. The oil pump mounts directly on the side of the tank.",
  ],
  "ppfig-fig_19_06": [
    "This cutaway shows the inside of an oil cooler — a matrix heat exchanger that keeps the oil temperature within limits. The hot oil is passed through many thin passages (the matrix) while the cooling medium flows around them and carries the heat away.",
    "On most engines this is a fuel-cooled oil cooler: the cold fuel on its way to the burners absorbs heat from the oil. That both cools the oil and usefully warms the fuel, which helps prevent ice forming in the fuel.",
    "The spring-loaded bypass valve (bottom) lets the oil pass straight through if the matrix is blocked, or if the oil is very cold and thick, so the bearings never lose their oil supply.",
  ],
  "ppfig-fig_19_07": [
    "This is a magnetic chip detector (magnetic plug), fitted in the scavenge (return) oil line. Its tip is a magnet that attracts and holds any ferrous (iron/steel) particles carried in the returning oil.",
    "Metal particles in the oil mean something inside the engine is wearing or breaking up, so inspecting the plug for 'chips' gives an early warning of bearing or gear trouble — before it becomes a failure.",
    "The bayonet fasteners let the plug be pulled and checked quickly without draining the system, and the sealing rings stop oil leaking past it while it is in place.",
  ],
  "ppfig-fig_19_08": [
    "This shows a centrifugal breather, whose job is to separate oil from air before that air is vented overboard. The bearing chambers are deliberately pressurised with sealing air, so an air/oil mist builds up inside them and has to be let out.",
    "The mist is fed into the spinning breather; centrifugal force flings the heavier oil droplets outward so they drain back to the gearbox, while the lighter, now-clean air passes out through the centre and is vented to atmosphere.",
    "This stops the engine throwing oil overboard with the vented air and keeps oil consumption low. The legend shows the air/oil mist in, the oil returned to the gearbox, and the clean air to atmosphere.",
  ],

  // ─── Gas Turbines — The Exhaust System (A.1.5) ───
  "ppfig-fig_18_01": [
    "This cutaway shows the exhaust system of a straight jet. The gas leaving the last turbine stage (the turbine rear stage) is still swirling and moving quite fast, and the exhaust system's whole job is to deliver it to the propelling nozzle with the least possible loss.",
    "The turbine rear support struts straighten out the swirl so the gas flows straight back. The exhaust cone (the central bullet) gradually fills the space behind the turbine disc, forming a divergent passage that slows the gas slightly and raises its pressure, cutting turbulence and drag.",
    "The gas then passes down the jet pipe to the propelling nozzle at the very back, where it is finally squeezed and accelerated to produce the thrust.",
  ],
  "ppfig-fig_18_02": [
    "This shows the danger zones around a running engine — vital ground-safety knowledge. In front, the intake sucks air in hard enough to pull a person or loose objects into the engine; at full power the hazard reaches out roughly 25 ft.",
    "Behind the engine the exhaust jet is both extremely hot and extremely fast. The scales show how the gas temperature and velocity fall with distance, but even a long way back (well over 100 ft) the efflux is still dangerous.",
    "The practical point: never approach the intake from the front or the exhaust from behind while an engine is running — stay outside both the suction zone and the blast zone.",
  ],
  "ppfig-fig_18_03": [
    "These are the two propelling-nozzle types. A simple CONVERGENT nozzle (top) just narrows to the exit. As the gas speeds up its static pressure falls, but it can only be accelerated up to the local speed of sound (Mach 1) at the exit — at that point the nozzle 'chokes' and the gas leaves still above ambient pressure, which gives a bit of extra 'pressure thrust'.",
    "To go faster than Mach 1 you need a CONVERGENT-DIVERGENT (con-di) nozzle (bottom). The gas reaches Mach 1 at the narrow throat, then the diverging section lets it expand and accelerate to supersonic speed while its static pressure keeps falling.",
    "Subsonic airliners use the simple convergent nozzle; con-di nozzles are needed on supersonic aircraft. The small graphs show static pressure falling and velocity rising to the sonic point.",
  ],
  "ppfig-fig_18_04": [
    "On a bypass engine the cold fan (bypass) air and the hot core exhaust can be blended before they leave the engine — this is the mixer that does it.",
    "The hot gas is split into fingers (mixer chutes) that interleave with the cold bypass air, so the two streams mix thoroughly. The turbine rear support struts and splitter fairing guide the streams into the mixer.",
    "Mixing evens out the exhaust velocity, which improves efficiency a little and, more importantly, cuts jet noise — a slower, more uniform jet is quieter. The colours show blue bypass air blending with the red exhaust gas.",
  ],
  "ppfig-fig_18_05": [
    "These show two ways of arranging a bypass engine's exhaust. In the top engine the cold bypass air and hot core gas leave through separate nozzles and only mix in the open air behind the engine (external mix) — simple and light, which is why it is common on high-bypass airliners.",
    "In the bottom engine the two streams are brought together inside one common (integrated) nozzle and partly mixed before they leave (partial internal mixing). This gives slightly better efficiency and lower noise, at the cost of extra weight and complexity.",
    "The legend marks the cold fan airflow (blue) and the hot exhaust gases (red).",
  ],
  "ppfig-fig_18_07": [
    "This explains where jet noise comes from. The noise is made in the shear layer — the boundary where the fast exhaust jet rubs against the still air around it.",
    "Close to the nozzle the shear layer is thin and the turbulence is small-scale, which produces high-frequency noise. Further downstream the jet has spread out and slowed, the turbulence becomes large-scale, and it produces low-frequency noise.",
    "Because noise rises very steeply with jet speed, the single most effective way to make an engine quieter is to lower the jet velocity — which is exactly why high-bypass engines (moving a large mass of air slowly) are so much quieter than the old low-bypass jets.",
  ],
  "ppfig-fig_18_08": [
    "These are the sound-absorbing (acoustic) liners fitted inside the engine intake and bypass ducts to reduce the noise that escapes. The basic liner is a honeycomb sandwich: a perforated facesheet (the holes let sound in) over a honeycomb core backed by a solid sheet.",
    "Each honeycomb cell behaves like a tiny resonator that traps and absorbs sound energy, turning it into a little heat. Variations include a close-woven wire-cloth facing, a 'linear' liner and a double-perforate layer, each tuned to soak up a different range of frequencies.",
    "The liners are made from titanium, aluminium or composite, and together they significantly cut the fan and jet noise heard outside the aircraft.",
  ],

  // ─── Gas Turbines — Combustion Chambers (A.1.5) ───
  "ppfig-fig_16_03": [
    "This is a combustion section of the 'tubo-annular' (cannular) type — several separate flame tubes (cans) arranged in a ring inside one common air casing. It combines the mechanical strength of individual cans with the compactness of a single casing.",
    "Fuel reaches each can through the fuel manifold and enters at the snout, which also admits the primary (combustion) air. The interconnectors are small tubes joining neighbouring cans; during starting they let the flame spread from the lit cans to the unlit ones, and they equalise the pressure between cans.",
    "The drain tube at the bottom lets unburnt fuel drain away safely after a failed (wet) start, so it cannot pool and cause a fire on the next attempt.",
  ],
  "ppfig-fig_16_04": [
    "A cutaway of the same can-in-ring (tubo-annular) arrangement, showing what happens inside. Compressor air enters each flame tube through the snout.",
    "Only about a quarter of the air — the primary air — actually burns. It mixes with the fuel in the primary zone to form a stable, anchored flame. The remaining air (secondary and tertiary) flows around the outside of the flame tube to keep its walls cool, then enters through rows of holes to dilute and cool the hot gas before it reaches the turbine.",
    "The igniter plug lights the mixture only during starting; once burning, combustion is self-sustaining. The interconnectors carry the flame across to the cans that have no igniter of their own.",
  ],
  "ppfig-fig_16_05": [
    "This is the annular combustion chamber — a single continuous ring-shaped flame tube held between an inner and an outer air casing, with no separate cans. Fuel is sprayed in all the way round through the manifold.",
    "As in every chamber, only the primary air burns; the secondary and tertiary air first cool the flame-tube walls and are then fed in through holes to dilute the gas down to a temperature the turbine can survive. The tertiary (dilution) air holes you can see do this final cooling just before the nozzle guide vanes.",
    "The annular design is the lightest, shortest and most efficient type, with the least wall area to cool, which is why almost all modern engines use it. The hot gas passes straight from the ring into the turbine nozzle guide vanes.",
  ],
  "ppfig-fig_16_11": [
    "This is a fuel spray (atomising) nozzle, whose job is to break the fuel into a very fine mist so that it mixes well with air and burns cleanly. Fuel is fed down the feed arm into a swirl chamber and leaves the spray nozzle as a swirling hollow cone of tiny droplets.",
    "The spring-loaded distributor weight adjusts how the fuel is delivered as pressure changes, so the spray stays good across a wide range of flows.",
    "Compressor-delivery air is also led around the nozzle (an 'airspray' design) to help atomise the fuel and to keep carbon from building up on the orifice. Good atomisation is essential for stable, efficient, smoke-free combustion — poor atomisation gives a dirty flame and hot spots.",
  ],
  "ppfig-fig_16_12": [
    "This shows a duplex (two-stage) burner fed through a pressurizing (distributor) valve — the classic way of getting a good fuel spray over a very wide range of flows.",
    "At low flows (starting and idle) only the small PRIMARY orifice is used, so even a tiny fuel flow still leaves the nozzle as a proper spray. As the throttle is opened and fuel pressure rises, the pressurizing valve opens and brings the larger MAIN orifice into use as well, to handle the big flows needed at high power.",
    "The HP fuel cock is the main shut-off valve, used to stop the engine cleanly by cutting the fuel. A filter protects the fine orifices from blockage, and compressor air flowing over the orifice prevents carbon forming on it.",
  ],
  "ppfig-fig_16_13": [
    "This cutaway shows a vaporizing combustion system — an alternative to spraying fuel as a mist. Fuel is fed through the fuel feed tube into heated vaporizing tubes inside the flame tube, where it turns into vapour before it burns.",
    "The primary air mixes with this fuel vapour to form the flame. The secondary air holes feed air along the flame-tube walls to keep them cool, and the dilution air holes add the remaining air to drop the gas temperature before it reaches the turbine nozzle guide vanes.",
    "Because the fuel is already vaporised, this system gives a clean, even flame with little smoke, and it is less sensitive to the fuel spray pattern than an atomising burner.",
  ],

  // ─── Gas Turbines — Compressors (A.1.5) ───
  "ppfig-fig_15_03": [
    "This is a cutaway of a complete axial-flow compressor. Air enters through the intake casing on the left and is squeezed stage by stage as it travels to the right toward the rotor drum and drive shaft.",
    "The rotating rotor blades are carried on rotor discs that together form the rotor drum. Between every row of rotor blades sits a row of fixed stator vanes bolted to the compressor casing. One 'stage' is a single row of rotor blades followed by a single row of stator vanes.",
    "Work happens in two steps each stage: the spinning rotor blades add energy and speed the air up, then the diverging passages between the stator vanes slow that air down again and turn the extra speed into a pressure rise. Repeating this over many stages builds a large overall pressure ratio.",
    "Notice the blades get smaller toward the rear. As pressure rises the air becomes denser and takes up less room, so the annulus (the ring-shaped gap the air flows through) is deliberately narrowed to keep the airflow velocity roughly constant from front to back.",
    "The whole rotor assembly is turned by the turbine through the drive shaft. Because each stage only adds a modest pressure rise, an axial compressor uses many stages in series — which is how it reaches far higher pressure ratios than a single centrifugal compressor could.",
  ],
  "ppfig-fig_15_04": [
    "This shows the mechanism of variable stator vanes (VSVs). The stator vanes in the front stages can each be rotated about their own pivot by the external ring-and-lever linkage you can see running across the casing — move the ring and every vane turns together.",
    "Why bother? At low RPM the compressor passes much less air, so fixed vanes would present the air to the next rotor row at too large an angle of attack and the blades would stall. Re-angling the stator vanes keeps the air meeting the rotor blades at the correct angle across the whole speed range.",
    "Variable inlet guide vanes (VIGVs) do the same job right at the very front, setting the swirl of the air before it reaches the first rotor stage.",
    "Variable vanes are one of the three standard ways of stopping a high-pressure-ratio compressor from surging; the others are compressor bleed valves and splitting the compressor into separate spools. Together they let the engine accelerate smoothly without the airflow breaking down.",
  ],
  "ppfig-fig_15_05": [
    "This is a compressor bleed (surge) valve shown in its two positions — OPEN on the left, CLOSED on the right — with its actuator at the top and a path marked 'to atmosphere'.",
    "The problem it solves happens at low RPM (starting and idle): the rear stages want to pass more air than the lightly-loaded front stages can deliver, which would make the front stages stall and the compressor surge. Opening the bleed valve spills some mid-stage compressor air overboard, relieving the back-pressure and keeping the airflow smooth.",
    "As the engine accelerates up to normal operating speed the actuator closes the valve, so no compressed air is wasted and full pressure is delivered on to the combustion chamber.",
    "The valve is normally operated automatically by the engine's control system in response to RPM and compressor conditions. Bleed valves, variable stator vanes and the multi-spool layout are the three classic anti-surge measures.",
  ],
  "ppfig-fig_15_06": [
    "This is the compressor 'characteristic' graph: pressure ratio is plotted up the side and airflow along the bottom. It maps where the compressor can and cannot run.",
    "The WORKING LINE is where the engine actually operates at each RPM. The SURGE LINE above it is the limit — cross it and the airflow through the compressor breaks down and reverses. The shaded 'unstable area' above the surge line must never be entered: surging gives loud bangs, heavy vibration, rapidly rising EGT and a sudden loss of thrust.",
    "The steep dashed lines are constant-RPM lines (60%, 70% … 100%). For a given RPM, demanding more pressure ratio moves the operating point upward, toward the surge line.",
    "The gap between the working line and the surge line is the SURGE MARGIN — the built-in safety buffer. Anything that eats into this margin can tip the engine into surge: slamming the throttle open, a compressor that is contaminated, damaged or iced, or a distorted/turbulent airflow entering the intake.",
  ],
  "ppfig-fig_15_08": [
    "This shows how compressor stator vanes are actually built and mounted. Instead of fitting hundreds of loose individual vanes, rows of vanes are grouped into curved segments that slot or bolt into the compressor casing.",
    "Each vane is a small aerofoil. The passage between neighbouring vanes widens (diverges), so it works as a diffuser — slowing the fast air leaving the rotor and converting that speed into a pressure rise after each rotating stage.",
    "The stator vanes also straighten the swirling air coming off the rotor so that it enters the next rotor row at the correct angle, ready for the next stage to do its work.",
    "Building the vanes in segments makes the compressor easier to assemble and to repair — a damaged segment can be replaced on its own — and it allows the ring of vanes to expand and contract with temperature without binding.",
  ],
};
