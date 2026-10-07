// Comprehensive, plain-language explanations written AROUND each illustration
// (keyed by the figure id, e.g. "ppfig-fig_15_03"). The study slide shows the
// image together with its explanation here; figures without an entry fall back
// to the topic's bullet points. Authored section by section from the diagrams.
// Each string in the array is one paragraph.

export const FIGURE_NOTES: Record<string, string[]> = {
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
