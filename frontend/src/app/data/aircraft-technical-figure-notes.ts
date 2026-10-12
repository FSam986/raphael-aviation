// Comprehensive, plain-language explanations written AROUND each illustration
// (keyed by the figure id, e.g. "ppfig-fig_15_03"). The study slide shows the
// image together with its explanation here; figures without an entry fall back
// to the topic's bullet points. Authored section by section from the diagrams.
// Each string in the array is one paragraph.

export const FIGURE_NOTES: Record<string, string[]> = {
  // ═══ Flight Planning & Performance (A.4 — performance) ═══
  "fppfig-pf_2_4": [
    "This shows the 'declared distances' at an aerodrome. The RUNWAY may be extended by a STOPWAY (a firm paved area able to take the aeroplane during a rejected take-off) and a CLEARWAY (a cleared area over which the aircraft can make its initial climb).",
    "From these come: TORA (take-off run available, the runway), ASDA (accelerate-stop distance available = runway + stopway), and TODA (take-off distance available = runway + clearway, out to the first significant obstacle).",
    "Performance calculations must show the aircraft can take off (or stop) within the appropriate declared distance — which is which depends on whether the take-off is continued or rejected.",
  ],
  "fppfig-pf_2_11": [
    "This shows the forces during the take-off run. Thrust is high at the start and falls a little as speed builds; the total drag is made up of wheel drag (which falls as weight comes off the wheels) and aerodynamic drag (which grows with speed).",
    "The gap between thrust and total drag is the EXCESS THRUST — the net accelerating force. The bigger this gap, the faster the aircraft accelerates to lift-off.",
    "Anything that cuts the excess thrust (higher weight, higher/hotter airfield, up-slope, contamination) lengthens the take-off run.",
  ],
  "fppfig-pf_6_7": [
    "This graph shows how runway contamination lengthens the stopping distance. For a given ground speed, stopping on a DRY runway takes the least distance; a wet-but-good surface a little more; a medium (slush/snow) surface more again; and a poor, icy or hydroplaning surface by far the most.",
    "The curves fan out with speed, so the penalty for contamination grows rapidly the faster the aircraft is moving.",
    "This is why landing-distance calculations apply large factors for wet and contaminated runways — the stopping distance can more than double.",
  ],
  "fppfig-pf_4_14": [
    "This shows how wind affects a descent (glide). A HEADWIND steepens the descent angle and SHORTENS the distance covered over the ground; a TAILWIND shallows the angle and LENGTHENS the ground distance.",
    "Crucially, the RATE of descent (feet per minute) is unchanged — in head, tail or zero wind the aircraft reaches the lower altitude in the same time. Wind only changes how far it travels over the ground, not how fast it sinks.",
    "So for a given glide, plan the ground distance for the wind, but expect the same time to descend.",
  ],
  "fppfig-pf_5_5": [
    "This shows the drag (thrust-required) curve against speed, with the thrust-available line across it. Drag is high at low speed (induced drag) and high again at high speed (parasite drag), with a minimum in between.",
    "The aircraft can only fly where thrust available is at least equal to thrust required — i.e. between the two points where the lines cross. These crossings are the minimum and maximum level-flight speeds; the gap between them is the usable speed range.",
    "At altitude the thrust-available line falls, so the speed range narrows — until, at the ceiling, it shrinks to a single speed.",
  ],
  "fppfig-pf_5_10": [
    "This shows how the three speeds change as an aircraft climbs at a constant calibrated airspeed (CAS). Because the air thins with height, the TRUE airspeed (TAS) rises for the same CAS, and the MACH number rises faster still (the speed of sound also falls).",
    "So holding a constant CAS in the climb means TAS and Mach both increase — important because the aircraft can run into its Mach limit high up even though the CAS is unchanged.",
    "This is why a climb is flown at a constant CAS lower down and then a constant Mach higher up, swapping over where the two meet.",
  ],
  "fppfig-pf_14_1": [
    "This shows how the ideal V1 (decision speed) is found for a balanced field. The red curve is the distance to CONTINUE the take-off after an engine failure (it shortens as the failure speed increases); the blue curve is the distance to STOP (accelerate-stop, which lengthens with speed).",
    "Where the two curves cross, the distance to go and the distance to stop are equal — this failure speed is the ideal V1, giving the shortest 'balanced field length'.",
    "Below V1 a failure means STOP; at or above V1 it means GO. Setting V1 correctly is central to Class A take-off performance.",
  ],

  // ═══ Flight Planning & Performance (A.4 — mass & balance) ═══
  "fppfig-mb_2_2": [
    "This shows the basic mass-and-balance geometry. A fixed reference line, the DATUM, is chosen; the distance from the datum to any mass is its ARM. The aircraft's whole weight acts down through the centre of gravity (CG).",
    "Arms measured AFT of the datum are POSITIVE, arms FORWARD of it are NEGATIVE. A mass's MOMENT is its weight × its arm; the CG is the total moment ÷ the total weight.",
    "The CG must stay between the forward and aft CG limits shown; keeping it there is what mass-and-balance calculations are all about.",
  ],
  "fppfig-mb_2_10": [
    "This is a CG envelope — a graph of weight (up the side) against CG position (along the bottom), with the forward and aft CG limits drawn as the sloping boundary lines.",
    "After loading, the aircraft's total weight and its CG are plotted; the point MUST fall inside the envelope for every phase (take-off, and after burning fuel, landing).",
    "If the plotted point is outside the envelope the aircraft is unsafe to fly as loaded, and the load must be moved, added or removed to bring the CG back within limits.",
  ],
  "fppfig-mb_2_12": [
    "This shows what happens when a mass is MOVED (for example cargo shifted from hold A to hold B). Moving a mass m through a distance d shifts the whole aircraft's CG by an amount cc.",
    "The CG shift is found from: CG shift = (mass moved × distance moved) ÷ total aircraft mass, i.e. cc = m·d ÷ M. The CG always moves in the SAME direction as the mass is moved.",
    "This lets the loaders calculate exactly how far the CG will move, and check it stays within the CG limits.",
  ],
  "fppfig-mb_2_15": [
    "This shows ADDING or REMOVING a mass (e.g. loading or unloading cargo at hold B). Unlike moving a mass, this changes both the total weight AND the CG.",
    "The CG shift is: CG shift = (mass added or removed × distance of that mass from the OLD CG) ÷ the NEW total mass. Adding mass moves the CG TOWARDS the added mass; removing it moves the CG AWAY.",
    "Both the new weight and the new CG must then be checked against the envelope — adding freight aft, for instance, can push the CG past the aft limit.",
  ],
  "fppfig-mb_2_19": [
    "This shows the take-off stabilizer trim setting read against CG position (as a percentage of the mean aerodynamic chord, %MAC), with separate lines for different flap settings (here Flaps 5 and Flaps 15).",
    "Because the CG sets how much the tailplane must balance, the correct stabilizer trim for take-off depends on the CG: a forward CG needs more nose-up trim, an aft CG less.",
    "Setting the stabilizer trim from this chart for the actual CG and flap setting is a vital pre-take-off step — a mis-set stabilizer trim can make the aircraft very hard to rotate or control.",
  ],

  // ═══ Flight Planning & Performance (A.4) ═══
  "fppfig-03_01": [
    "This shows the difference between air distance and ground distance. The AIR distance is how far the aircraft travels through the air; the GROUND distance is how far it moves over the ground; the gap is the WIND component.",
    "With a headwind the aircraft is pushed back relative to the ground, so it flies further through the air than it covers over the ground — the air distance (nautical air miles, NAM) is GREATER than the ground distance (NGM).",
    "Fuel is burned per air mile (it depends on the airspeed), so fuel planning is done in NAM; the wind then converts NAM to the ground distance actually flown.",
  ],
  "fppfig-03_02": [
    "This shows the opposite case: with a TAILWIND the aircraft is helped along, so it covers more ground than it flies through the air — the nautical air miles (NAM) are LESS than the ground nautical miles (NGM).",
    "The wind component is added to the air distance to give the (larger) ground distance.",
    "So the rule is: headwind → NAM greater than NGM; tailwind → NAM less than NGM. Fuel is always figured on the air distance, and the wind sets how far over the ground that buys you.",
  ],
  "fppfig-13_01": [
    "This shows the all-engine Point of Equal Time (PET, or critical point) — the point along the route from which it takes the same time to carry on to the destination (ON) as to turn back HOME.",
    "It is NOT the halfway point unless there is no wind: a headwind outbound (which becomes a tailwind home) moves the PET DOWNWIND of the midpoint. The ground speeds home (H) and on (O) are worked out from the all-engine TAS and the wind.",
    "The PET matters because, in an emergency needing a diversion, it tells the crew whether it is quicker to press on or turn back.",
  ],
  "fppfig-13_04": [
    "This shows the engine-failure PET. After an engine fails the aircraft 'drifts down' to a lower stabilising level and flies at the slower engine-out TAS, so the ground speeds home (H) and on (O) are different from the all-engine case — and so the PET moves.",
    "The elapsed TIME to reach the PET is still worked out on the all-engine TAS/GS (because both engines are running until the failure), but the speeds used to balance 'time on = time home' are the ENGINE-OUT speeds.",
    "So an aircraft usually has two PETs — a normal (all-engine) one and an engine-failure one — and the crew must know which applies to the emergency they are facing.",
  ],
  "fppfig-14_01": [
    "This shows the Point of Safe Return (PSR, or point of no return) — the furthest point to which the aircraft can fly and still return to base (or a chosen airfield) within its safe endurance.",
    "By definition the DISTANCE out to the PSR equals the distance home from it. Because the wind is usually different on the two legs, the PSR is not simply 'half the endurance out' — a headwind outbound moves the PSR closer in.",
    "The PSR is vital when there is no suitable destination alternate: it is the last point at which the aircraft can safely abandon the trip and get home.",
  ],
  "fppfig-14_02": [
    "This derives the PSR time formula. Using DISTANCE = TIME × SPEED, and the definition that the distance out equals the distance home: T×O = (E−T)×H, where E is the safe endurance, T the time out to the PSR, O the ground speed out and H the ground speed home.",
    "Rearranging gives T(O+H) = E×H, so the time to the PSR is T = E·H ÷ (O+H).",
    "This neat formula lets the crew work out the PSR directly from the safe endurance and the two ground speeds — the key result to remember for flight planning.",
  ],
  "fppfig-14_03": [
    "This shows how the PSR formula is solved on the circular navigation computer instead of by arithmetic. The relationship T = E·H ÷ (O+H) is set up on the slide rule, and the time to the PSR is read off directly.",
    "The outer and inner scales handle the multiply-and-divide in one setting, which is faster and less error-prone than long-hand in the cockpit.",
    "It is the same formula as the algebraic derivation — just mechanised on the nav computer for quick, reliable in-flight use.",
  ],


  // ═══ Flight Instruments (A.7.2 — turn coordinator) ═══
  "insfig-15_01": [
    "This is a turn coordinator, a development of the turn indicator. Its rate gyro is tilted (canted about 30°), so it senses ROLL as well as yaw; the miniature aircraft symbol banks to show the turn, with wing-tip marks for a standard-rate turn.",
    "Because it also senses the roll into the turn, it responds a little sooner than a plain turn needle and is better suited to driving a wing-leveller autopilot.",
    "It still carries a balance ball below and is marked 'NO PITCH INFORMATION' — the banking aircraft symbol shows rate of turn and roll only, never pitch.",
  ],

  // ═══ Flight Instruments (A.7.2 — turn & slip) ═══
  "insfig-14_01": [
    "This shows the rate gyro inside a turn indicator. The rotor has only ONE gimbal, and that gimbal is held by a calibrated spring, so the gyro cannot hold a direction — it can only be deflected.",
    "When the aircraft turns (a torque about the vertical), precession tips the gimbal against the spring; the faster the turn, the more it precesses and the further the pointer moves.",
    "Because the spring opposes the precession, the deflection is proportional to the RATE of turn — which is exactly what a turn indicator is meant to show.",
  ],
  "insfig-14_02": [
    "This shows the same rate gyro in action. The turning of the aircraft applies a torque; precession acts 90° round and swings the gimbal, moving the pointer across the scale.",
    "The calibrated spring balances the precession at a deflection that matches the rate of turn, so a 'rate one' turn (3° per second) gives a standard pointer deflection.",
    "This is why a turn indicator shows how FAST you are turning, not how far you have turned or which way you are heading.",
  ],
  "insfig-14_03": [
    "This front view shows an aircraft in straight-and-level flight. Lift (L) acts straight up and weight (W) straight down, equal and opposite, so the aircraft is in balance with no sideways force.",
    "With no turn, there is nothing to throw the balance ball off centre and nothing to precess the turn gyro.",
    "This is the baseline the turn-and-slip instrument shows as 'wings level, ball centred' — the next figures show what a turn does to it.",
  ],
  "insfig-14_04": [
    "This shows the slip indicator — a ball in a curved, liquid-filled tube. In balanced flight the only forces on the ball are its weight (down) and the tube's reaction, so it settles at the bottom, in the centre.",
    "The ball is really a simple pendulum/accelerometer: it hangs where the combined force on it points.",
    "A centred ball means the aircraft is 'in balance' (no slip or skid) — the pilot's goal in every turn.",
  ],
  "insfig-14_05": [
    "This shows the forces in a correctly banked turn. The aircraft banks so its lift (L) tilts inward; the horizontal part of that lift provides the centripetal force (C) that pulls the aircraft round the turn, while the vertical part still balances the weight (W).",
    "The combination of weight and the centripetal reaction gives a RESULTANT force that acts straight 'down' through the aircraft's floor.",
    "Because the resultant is square to the floor, a correctly banked turn feels like normal 'down' to the crew — and keeps the balance ball centred.",
  ],
  "insfig-14_06": [
    "This shows the balance ball in a correctly banked turn. Even though the aircraft is turning, the resultant of weight and centripetal reaction acts straight down through the tube.",
    "So the ball still sits in the centre — the turn is 'balanced' (coordinated), with no sideways force sliding the ball either way.",
    "A centred ball in a turn tells the pilot the bank angle matches the rate of turn: not too little (slip) and not too much (skid).",
  ],
  "insfig-14_07": [
    "This shows the ball off-centre, which happens when the turn is NOT balanced. If the bank is too shallow for the rate of turn the aircraft slips inwards and the ball rolls to the inside; if over-banked it skids outwards and the ball rolls to the outside.",
    "The ball always rolls towards the side where the net sideways force points, acting as a simple accelerometer.",
    "The pilot corrects with rudder — 'step on the ball' — to bring it back to centre and balance the turn.",
  ],
  "insfig-14_09": [
    "This is the face of a turn-and-slip indicator. The needle (TURN, L–R) shows the rate and direction of turn from the rate gyro, and the ball (SLIP) below shows whether the turn is balanced.",
    "Read together they give the full turn picture: needle deflection for how fast you are turning, ball position for whether you are in balance.",
    "A standard-rate turn with the ball centred — needle on the mark, ball in the middle — is the aim for accurate instrument flying.",
  ],

  // ═══ Flight Instruments (A.7.2 — artificial horizon) ═══
  "insfig-13_01": [
    "This is the face of an artificial horizon (attitude indicator). A fixed miniature-aircraft symbol (the little wings) represents the aeroplane, and a moving horizon bar represents the real horizon.",
    "The pilot judges attitude by how the wings sit against the horizon line: wings on the line and level means straight and level flight.",
    "Because it is driven by a gyro held vertical, the horizon bar gives a stable artificial picture of the real horizon even in cloud or at night.",
  ],
  "insfig-13_03": [
    "This shows the artificial horizon indicating a CLIMB. The miniature-aircraft wings sit ABOVE the horizon bar, and the sky area grows — just as the real horizon drops below the nose when you pitch up.",
    "The amount the wings sit above the line shows roughly how steep the nose-up attitude is.",
    "Reading pitch this way lets the pilot set and hold a climb attitude precisely without looking outside.",
  ],
  "insfig-13_04": [
    "This shows the artificial horizon indicating a BANK (turn). The horizon bar tilts while the miniature-aircraft wings stay fixed, so the angle between them shows the angle of bank.",
    "A bank index around the top of the dial marks standard bank angles (10°, 20°, 30°, 45°, 60°) for precise turns.",
    "Together with the pitch indication, this gives the pilot a complete attitude picture — pitch and bank — on one instrument.",
  ],
  "insfig-13_05": [
    "This cutaway shows how an artificial horizon is built. The rotor spins about a VERTICAL axis inside inner and outer gimbals, so its rigidity holds a true-vertical reference.",
    "The outer gimbal drives the horizon bar, which the pilot sees against the fixed aircraft symbol. A pendulous unit with vanes at the bottom keeps the spin axis erected to the true vertical.",
    "The gimbal arrangement lets the case (and aircraft) pitch and roll around the steady gyro, so the horizon bar always shows the real attitude.",
  ],
  "insfig-13_06": [
    "This shows the pendulous-vane erection system that keeps the gyro vertical. Under the gyro hang four vanes covering air-exhaust ports (A, C and two others); the spinning rotor's air escapes through them.",
    "When the spin axis is truly vertical, all four ports are half-covered equally, so the air escapes evenly and no correcting force is produced.",
    "This balanced exhaust is the 'at rest' condition — the next figure shows what happens when the gyro tilts.",
  ],
  "insfig-13_07": [
    "This shows the vane system correcting a tilt. When the gyro leans, gravity swings the hanging vanes so one port opens more and the opposite one closes; the air then escapes unevenly.",
    "The escaping air produces a REACTION force on that side, and because of precession this force acts 90° round to tip the spin axis back towards vertical.",
    "So the pendulous vanes continuously 'erect' the gyro to the true vertical, keeping the horizon bar honest.",
  ],
  "insfig-13_09": [
    "This shows an acceleration (and turning) error of the artificial horizon. During a forward acceleration the pendulous erection system is thrown back, so it wrongly 'corrects' the gyro and it becomes PRECESSED.",
    "The tilted gyro then shows a small false climb and turn, so the horizon bar lies for a few seconds until the erection system settles.",
    "Pilots learn that just after a rapid acceleration the attitude indicator can briefly show a false nose-up/turn, and allow for it.",
  ],
  "insfig-13_10": [
    "This shows a modern ELECTRIC artificial horizon. The rotor is spun by an electric motor, and small pitch and roll TORQUE MOTORS are used to erect and control the gyro instead of air vanes.",
    "Sensors detect any tilt of the spin axis from vertical and feed the torque motors, which apply a tiny torque; precession then moves the gyro back upright — a faster, more precise version of the vane system.",
    "Electric drive removes the need for a vacuum system and gives a reliable attitude reference that can also feed other systems electrically.",
  ],
  "insfig-13_11": [
    "This shows a remote (servo) artificial horizon. A separate vertical-reference gyro, mounted elsewhere in the aircraft, senses pitch and roll; pitch and roll synchros turn those into electrical signals.",
    "The signals are amplified and drive motors in the cockpit indicator, which move the horizon disc to match the real attitude — the display is driven electrically, not by a gyro behind the panel.",
    "Separating the gyro from the display lets one accurate reference feed several indicators, autopilot and recorders, and keeps the heavy gyro in a well-protected location.",
  ],

  // ═══ Flight Instruments (A.7.2 — directional gyro) ═══
  "insfig-12_01": [
    "This shows the inside of a directional gyro indicator (DGI). The rotor is spun by an air jet from the nozzle pillar, and the whole assembly is carried in gimbals so the spin axis can hold a horizontal direction.",
    "A caging arm lets the pilot cage (lock) and re-set the gyro to a known heading, and a synchroniser gear links the gyro to the heading card. A latitude adjustment nut sets a small built-in precession to cancel Earth-rate wander for the local latitude.",
    "The DGI itself has no north-seeking ability — it simply holds the heading it is set to, so the pilot must align it with the magnetic compass periodically.",
  ],
  "insfig-12_03": [
    "This shows how an air (vacuum) driven gyro is spun. A fine jet of air is blown onto buckets (small scoops) cut around the rim of the rotor, like a water wheel, spinning it up to high speed.",
    "The spin axis (X) is held in the chosen plane by the gimbals, giving the rigidity the instrument relies on.",
    "Air drive is simple and needs no electrics — a engine-driven vacuum pump sucks cabin air through a filter and out through the nozzle, which is why gyro failure often follows a vacuum-pump failure.",
  ],
  "insfig-12_06": [
    "This shows how a gyro is 'erected' (kept aligned) using precession. An air jet (R1) pushing on the rotor applies a force F; because of precession the gyro responds 90° round, producing a controlled tilt P that corrects the gyro back to its proper position.",
    "By arranging the correcting jets or vanes to apply force where a drift has occurred, the system continuously nudges the spin axis back to where it should be.",
    "This same precession principle is used to erect the artificial horizon to vertical and to keep the DGI's axis horizontal.",
  ],
  "insfig-12_07": [
    "This shows the heading card (compass card) of a DGI, wrapped around the gyro drum and marked 000–360°. The card turns with the gyro's fixed direction while the aircraft (and the instrument case) turn around it.",
    "The pilot reads the current heading where the card lines up with the fixed lubber line in the window, and a setting knob lets the card be synchronised to the magnetic compass.",
    "Because the DGI is steady and free of the compass's turning and acceleration errors, it gives a smooth heading reference for accurate flying and turns.",
  ],
  "insfig-12_08": [
    "This shows the DGI's apparent wander caused by the Earth's rotation. The gyro holds its axis fixed in space, but the Earth turns beneath it, so the heading card slowly appears to drift from the correct reading.",
    "The two positions show the same space-fixed gyro reading differently as the Earth carries it round; the drift rate depends on latitude.",
    "This is why the DGI must be re-synchronised with the magnetic compass about every 10–15 minutes — its reading slowly wanders off on its own.",
  ],
  "insfig-12_10": [
    "This shows DGI apparent wander at high latitude (near the South Pole). Here the Earth's spin is almost entirely 'under' the gyro, so the apparent drift of the heading card is at its greatest.",
    "A person looking north reads a heading on the DGI, but as the Earth rotates that reading changes even though the aircraft has not turned — the gyro has a large Earth-rate wander.",
    "Near the poles this wander becomes so large that a simple DGI is of little use without frequent correction — one reason polar navigation needs other references.",
  ],
  "insfig-12_13": [
    "This graph shows how much a gyro's apparent wander (in degrees per hour) depends on latitude, for both hemispheres. At the equator the Earth-rate drift of a horizontal-axis gyro is small; towards either pole it grows rapidly, reaching the full Earth rate (about 15°/hour) at 90°.",
    "The curve lets the latitude-adjustment mechanism be set to apply an equal and opposite precession, cancelling the drift for the latitude being flown.",
    "It explains why the DGI needs a latitude setting and why its drift is worst at high latitudes and least near the equator.",
  ],

  // ═══ Flight Instruments (A.7.2 — gyroscopes) ═══
  "insfig-11_01": [
    "This shows the heart of every gyro instrument: a heavy rotor (wheel) spun at high speed about its own axis. The faster it spins and the more its mass is concentrated at the rim, the more 'angular momentum' it has.",
    "A fast-spinning rotor has a strong tendency to keep its spin axis pointing the same way in space — the property called RIGIDITY (gyroscopic inertia).",
    "This rigidity is what lets a gyro provide a steady reference for attitude or heading while the aircraft moves around it.",
  ],
  "insfig-11_04": [
    "This shows the rotor mounted in two gimbal rings inside a frame: an inner gimbal and an outer gimbal. Each gimbal pivot adds a direction in which the rotor can tilt freely.",
    "With two gimbals the spin axis has freedom in all three planes — this is a 'free' gyro, which can hold its direction in space while the frame (and the aircraft) move around it.",
    "Different instruments restrain one or more of these freedoms to make the gyro measure what they need (heading, attitude or rate of turn).",
  ],
  "insfig-11_05": [
    "This shows precession, the gyro's second property. When a force (torque) is applied to try to tilt the spinning rotor, the rotor does NOT move where pushed — instead it moves as if the force had been applied 90° further round in the direction of spin.",
    "So a torque applied here produces a tilt (precession) a quarter-turn away. The rate of precession depends on how big the force is and how much angular momentum the rotor has.",
    "Precession is used deliberately to control and correct gyros, and it is also the cause of some of their errors.",
  ],
  "insfig-11_06": [
    "This is the classic gyroscope demonstration. A spinning rotor is hung from a gimbal with a weight (M) pulling down on one side. Instead of simply toppling, the whole gyro slowly rotates (precesses) about the vertical axis.",
    "The downward force of the weight is a torque; because of precession the gyro responds 90° round, swinging horizontally rather than falling.",
    "It shows the two properties together — rigidity keeps the rotor spinning upright, and precession turns an applied torque into a steady circling motion.",
  ],
  "insfig-11_10": [
    "This illustrates APPARENT wander caused by the Earth's rotation. A perfect free gyro holds its axis fixed in SPACE, but the Earth turns underneath it, so to an observer on the ground the gyro's axis appears to drift.",
    "Two gyros at different places (1 and 2) see this apparent drift differently; the effect depends on latitude, being greatest at the poles and zero at the equator for the horizontal 'drift' component.",
    "This 'Earth rate' apparent wander is why a directional gyro must be corrected (or realigned) regularly to keep showing the right heading.",
  ],
  "insfig-11_12": [
    "This shows apparent wander near a pole (here looking down on the South Pole). Because the Earth's rotation axis comes straight up out of the pole, a gyro here sees the ground spinning fastest beneath it.",
    "So the apparent drift of the gyro's axis is at its maximum near the poles — one full turn per day of Earth rotation shows up directly as drift.",
    "This is why gyro-based direction references become hard to use at very high latitudes and need special handling or alternative references.",
  ],
  "insfig-11_13": [
    "This shows TRANSPORT wander. As the aircraft carries the gyro from one place to another over the curved Earth, the local 'vertical' and 'north' directions change, so the gyro's fixed-in-space axis appears to wander relative to them.",
    "The two aircraft positions show how the same space-fixed axis lines up differently with the local meridian at each place.",
    "Transport wander adds to Earth-rate wander, and both must be allowed for (by a latitude-set correction) to keep a directional gyro reading true.",
  ],
  "insfig-11_14": [
    "This shows a gyro with only ONE gimbal, giving the rotor a single degree of freedom. A spring (red) restrains that one freedom.",
    "Because it can only move in one plane and is held by a spring, this 'rate gyro' does not hold a direction — instead, when the aircraft rotates, precession deflects the rotor against the spring by an amount proportional to the RATE of turn.",
    "This is the gyro used in the turn-and-slip indicator and turn coordinator, where what matters is how fast the aircraft is turning, not which way it points.",
  ],

  // ═══ Flight Instruments (A.7.3 — flight director) ═══
  "insfig-25_01": [
    "This shows the flight-director system. A computer gathers attitude (from the vertical gyro), air data (ADC), navigation (VOR/ILS), radio altitude and heading (gyro compass), then works out how the aircraft should be flown to follow the selected mode.",
    "The result is drawn as command bars on the attitude director indicator (ADI) and guidance on the HSI, via an amplifier. A mode selector panel chooses what the FD should do, and an annunciator panel shows which modes are active.",
    "The flight director does not move the controls — it shows the pilot (or autopilot) how to fly; the pilot keeps the command bars centred to follow the commanded path.",
  ],
  "insfig-25_03": [
    "This shows the flight director on a modern PFD. The magenta command bars sit over the attitude display; the pilot (or autopilot) flies the aircraft symbol into the bars to follow the guidance.",
    "The mode annunciations along the top (e.g. HDG SEL, VNAV PTH, and the armed modes) tell the crew exactly what the flight director is commanding and what it will do next.",
    "Because the guidance is drawn right on the attitude, the pilot can follow a complex departure, approach or level-off just by keeping the bars centred.",
  ],
  "insfig-25_04": [
    "This is the horizontal situation indicator (HSI), which combines the compass and the navigation picture. The compass card shows heading under the lubber line; a course-deviation bar shows displacement from the selected VOR/ILS course.",
    "Flags show when the NAV or glideslope signals are valid, a glideslope scale down one side shows vertical deviation on an ILS, and a heading-selector 'bug' marks a chosen heading. DME distance and the selected course are shown in windows.",
    "Bringing heading, course, deviation and glideslope onto one instrument gives the pilot the whole lateral-and-vertical navigation picture at a glance.",
  ],
  "insfig-25_07": [
    "This shows the flight director command bars guiding a climb after take-off. With the FD in heading mode and a climb attitude set, the command bar moves UP, telling the pilot to pitch up.",
    "The pilot pitches the aircraft until the aircraft symbol sits in the command bars; as the target altitude and heading are reached and captured, the bars re-centre to command level flight.",
    "It shows the basic technique: fly the aircraft symbol into the command bars and keep them centred, and the aircraft follows the commanded path.",
  ],
  "insfig-25_08": [
    "This shows the flight director holding an altitude. If the aircraft drifts above the selected level, the command bar deflects DOWN to command a descent back; if it drops below, the bar deflects UP.",
    "Keeping the aircraft symbol centred in the bars (middle picture) holds the aircraft exactly on the chosen altitude.",
    "This is the same follow-the-bars principle applied to level flight — the FD continuously commands the small corrections needed to stay on altitude.",
  ],
  "insfig-25_09": [
    "This shows the geometry of an ILS glideslope on the approach. The glide path is a narrow beam at about 3°; the aircraft follows it down to the runway, and the flight director commands pitch to stay on it.",
    "Because the beam is angular, the same fraction-of-a-degree deviation is a large height error far out (about 600 ft well up the approach) but only a few tens of feet close in (54 ft at 0.5 NM).",
    "So the glideslope becomes more sensitive as the aircraft nears the runway, which is why small, smooth corrections are needed near the threshold.",
  ],

  // ═══ Flight Instruments (A.7.9 — EICAS / ECAM) ═══
  "insfig-39_01": [
    "This shows the Boeing EICAS (Engine Indicating and Crew Alerting System). Two display units (upper for warnings/cautions and the primary engine display, lower for secondary/status/maintenance) are driven by two computers, with a display-select panel and automatic display switching.",
    "Engine and system sensors feed the computers, which also drive discrete caution/warning lights and standby engine indicators, and a maintenance panel for the engineers.",
    "EICAS replaces rows of engine gauges and warning lights with a prioritised electronic display that shows the crew what matters and hides what doesn't.",
  ],
  "insfig-39_02": [
    "This shows how EICAS splits the engine information. The upper (primary) display always shows the key thrust parameters — N1 (LP compressor speed), EGT (and often EPR) — the things the crew must always see.",
    "The lower (secondary) display shows the rest — N2, oil pressure, temperature and quantity, fuel flow and vibration — and can also show system status and maintenance pages when needed.",
    "Separating primary from secondary keeps the most important numbers always in view while the detail is available on demand.",
  ],
  "insfig-39_04": [
    "This shows an EICAS/ECAM system (status) display page. It presents system data in a compact form — here hydraulic quantities (left/centre/right), APU EGT and RPM, oxygen pressure, and the positions of the flight control surfaces (aileron, elevator, rudder).",
    "Rather than separate gauges for each, the crew call up the relevant system page to see its state at a glance.",
    "These system synoptic pages are a major benefit of electronic displays — the whole state of a system on one clear picture.",
  ],
  "insfig-39_05": [
    "This shows how EICAS/ECAM ranks its alert messages by level. LEVEL A (red) are warnings needing immediate action — e.g. ENGINE FIRE, CABIN ALTITUDE. LEVEL B (amber) are cautions needing timely action — e.g. ENG OVHT, AUTOPILOT.",
    "LEVEL C (amber, lower urgency) are advisories — e.g. YAW DAMPER, a bus off — awareness items.",
    "Colour and position tell the crew instantly how urgent a message is, and the messages are listed in priority order so the most important is dealt with first.",
  ],
  "insfig-39_06": [
    "This is a complete EICAS engine display in flight. The round N1 gauges (86.0, with a command bug and TO reference) dominate, with EGT (455), N2 (97.0) and fuel flow (8.4) alongside, plus oil pressure/temperature/quantity, vibration and TAT.",
    "Combining dials for the primary parameters with digital read-outs for the rest gives both a quick trend picture and exact values.",
    "Red radial limit marks and amber bands warn as a parameter nears its limit, so the crew can manage the engines within limits at a glance.",
  ],
  "insfig-39_07": [
    "This is a standby engine indicator — an independent digital display of N1, EGT and N2, with the operating limits marked, used if the main EICAS/ECAM displays fail.",
    "It has its own self-test switch and a display-control switch (AUTO/ON) so it can be brought up when needed, and it is powered and fed independently of the main displays.",
    "Providing a simple, independent back-up of the key engine numbers means the crew never lose the essential engine information even with a major display failure.",
  ],
  "insfig-39_08": [
    "This shows the Airbus ECAM (Electronic Centralised Aircraft Monitor) architecture. Left and right display panels are driven by symbol generators, fed and controlled by two flight warning computers, an ECAM control panel and a system data analogue converter.",
    "The flight warning computers gather the aircraft systems' data, decide the alerts, drive the warning-light display unit and the aural warnings, and output to the AIDS (data recording).",
    "ECAM is Airbus's equivalent of EICAS; it not only shows the alerts but also displays the corrective-action checklist for each warning.",
  ],
  "insfig-39_10": [
    "This shows an ECAM STATUS page, shown after dealing with a failure. It is divided into LIMITATIONS (what the crew must now observe, e.g. speed or approach restrictions), SYSTEMS/FUNCTIONS LOST (what no longer works) and INFORMATION.",
    "So after a fault, ECAM first leads the crew through the actions, then leaves this status summary of the consequences for the rest of the flight.",
    "Having the limitations and lost systems summarised in one place helps the crew plan the approach and landing with the remaining systems.",
  ],
  "insfig-39_13": [
    "This is the ECAM control panel. SGU (symbol generator unit) select switches and left/right brightness knobs manage the displays; CLR clears a message, STS calls the status page and RCL recalls cleared messages.",
    "The row of system buttons (ENG, HYD, AC, DC, BLEED, COND, PRESS, FUEL, APU, F/CTL, DOOR, WHEEL) lets the crew call up any system's synoptic page on demand.",
    "Normally ECAM shows pages automatically by flight phase and on a failure, but this panel lets the crew choose exactly which system to look at.",
  ],

  // ═══ Flight Instruments (A.7.9 — engine instruments) ═══
  "insfig-38_01": [
    "This shows the many things measured on a jet engine. At the front, intake pressure and the low-pressure (LP) and high-pressure (HP) shaft speeds are sensed; through the engine, fuel flow, pressure and temperature, and oil temperature and pressure are monitored.",
    "At the hot end, thermocouples measure the exhaust gas temperature and a probe senses the exhaust pressure.",
    "Together these parameters tell the crew how much thrust the engine is making and whether it is healthy — the basis of all the engine gauges.",
  ],
  "insfig-38_02": [
    "This shows engine pressure ratio (EPR), a common thrust indication on jets. A probe at the intake measures the inlet pressure (P1) and a manifold of probes at the exhaust measures the turbine-exit pressure (P7).",
    "A transmitter divides P7 by P1 to give the ratio, displayed on the EPR gauge (here 2.4). The higher the ratio, the more the engine is 'pumping up' the pressure — and so the more thrust it is producing.",
    "EPR is used because it relates directly to thrust; the crew set take-off and climb thrust by EPR.",
  ],
  "insfig-38_03": [
    "This shows a torquemeter, used on turboprops to measure the power going to the propeller. The reduction gear uses helical gears, which are pushed sideways (axial thrust) by an amount proportional to the torque being transmitted.",
    "That axial thrust is balanced by oil pressure (the torquemeter oil pressure); the stronger the torque, the higher the oil pressure needed, so the pressure is a direct measure of torque, shown in psi.",
    "Because a turboprop's thrust comes from the propeller, torque (not EPR) is the key power indication, so the torquemeter is a primary engine gauge.",
  ],
  "insfig-38_04": [
    "This shows a phonic-wheel (magnetic) speed probe. A toothed wheel on the shaft turns past a magnetic pickup; each tooth changes the magnetic field and induces a pulse in the coil.",
    "The number of pulses per second is proportional to the rotational speed, so counting them gives RPM — with no electrical contact and no power needed at the probe.",
    "This is the standard way the N1/N2 shaft speeds are sensed on a jet engine.",
  ],
  "insfig-38_05": [
    "This shows a drag-cup (eddy-current) tachometer. The input shaft spins a permanent magnet inside an aluminium 'drag cup'; the moving magnetic field drags the cup round against a hairspring.",
    "The faster the magnet spins, the stronger the drag and the further the cup (and the pointer) turns against the spring — so the pointer reads speed. A soft-iron flux return path concentrates the field and a bimetal strip compensates for temperature.",
    "This gives a simple, reliable RPM indication driven directly by a flexible drive shaft from the engine.",
  ],
  "insfig-38_06": [
    "This shows a tacho-generator (AC) speed system. The engine drives, through a gearbox, a small three-phase generator; the frequency of its output is proportional to the engine speed.",
    "The three-phase output is sent to the indicator, which measures the frequency and displays RPM — the signal can be carried a long way with no loss of accuracy.",
    "Because the output frequency depends only on speed (not voltage), this system is accurate and is widely used for engine RPM.",
  ],
  "insfig-38_07": [
    "This is a percent-RPM tachometer. The main scale reads 0–100% of the maximum rated speed, and a small inner vernier dial shows the last digit for a precise reading.",
    "Showing RPM as a percentage lets the same gauge be used on different engines and makes limits easy to remember (e.g. a red line at 100%).",
    "The vernier lets the crew set speeds precisely — useful for synchronising engines or matching a target RPM.",
  ],
  "insfig-38_09": [
    "This shows an N1 (fan) speed sensor on a modern jet. A magnetic sensor head is mounted just above the fan; as each fan blade passes, it disturbs the sensor's magnetic field and generates a pulse.",
    "Counting the blade pulses gives the fan rotational speed (N1), the primary thrust-setting parameter on a high-bypass engine.",
    "Sensing the blades directly, with no separate toothed wheel, keeps the system simple and reliable.",
  ],
  "insfig-38_10": [
    "This is a synchroscope, used to match the speeds of engines (or propellers) on a multi-engine aircraft. It compares each engine against a reference; if an engine is running FAST its pointer rotates one way, if SLOW the other way.",
    "The pilot adjusts that engine's RPM until its pointer stops rotating, meaning it is exactly matched to the reference.",
    "Synchronising the engines removes the throbbing beat-note of slightly different speeds, reducing noise and vibration.",
  ],
  "insfig-38_11": [
    "This shows the exhaust-gas-temperature (EGT) thermocouple system. Several chromel-and-alumel thermocouples are placed in the hot gas stream (the hot junctions) and wired in parallel to average the temperature around the turbine.",
    "A thermocouple makes a small voltage proportional to the temperature difference between its hot junction (in the gas) and its cold junction (at the cockpit instrument), so the gauge reads that voltage as temperature — it needs no power supply.",
    "Chromel/alumel is used because it withstands the high turbine temperatures and gives a reliable output; EGT is a key limit the crew must not exceed.",
  ],
  "insfig-38_16": [
    "This shows a manifold absolute pressure (MAP) gauge, used on piston engines. Two capsules work against each other: one is evacuated (an aneroid) and the other is fed with the induction-manifold pressure.",
    "The difference moves the linkage and pointer, reading absolute pressure in inches of mercury. Because it reads ABSOLUTE pressure, it shows the actual charge pressure reaching the cylinders, even with the engine stopped (it reads ambient).",
    "MAP, with RPM, tells the pilot the power the engine is developing — the two together set the power on a constant-speed-propeller aircraft.",
  ],
  "insfig-38_17": [
    "This shows a Bourdon-tube pressure gauge, used for oil and fuel pressures. A curved, flattened tube tends to straighten as the pressure inside rises; the movement of its free end is magnified through a link and quadrant (toothed gear) to drive the pointer.",
    "A bimetal strip compensates for temperature, a hairspring takes up backlash, a limit stop protects the mechanism and a damping choke steadies the pointer.",
    "The Bourdon tube is simple and robust, which is why it is the standard mechanism for direct-reading pressure gauges.",
  ],
  "insfig-38_18": [
    "This shows an engine vibration monitoring system. A vibration sensor bolted to the engine contains a magnet suspended on springs inside a fixed coil; when the engine vibrates, the magnet moves relative to the coil and generates a signal proportional to the vibration.",
    "That signal is filtered (to the frequencies of interest), tested, and shown on an engine-vibration (VIB) meter, with a warning circuit and light if it becomes excessive.",
    "Rising vibration is an early sign of a developing fault — a failing bearing or a damaged/iced fan blade — so the crew watch it closely.",
  ],
  "insfig-38_19": [
    "This shows a simple float-type fuel-quantity gauge, used on light aircraft. A float on an arm rides on the fuel surface; as the level changes, the arm moves a variable resistor (a potentiometer).",
    "The changing resistance changes the current to the cockpit fuel-quantity gauge, which reads from Empty to Full. It measures VOLUME, so it is affected by aircraft attitude and does not compensate for fuel density.",
    "It is cheap and simple but less accurate than the capacitance system used on larger aircraft.",
  ],
  "insfig-38_20": [
    "This shows a large-aircraft fuel system's instruments. A capacitance tank unit (with temperature compensation) feeds an amplifier that drives the fuel-quantity gauge in POUNDS (mass), which is what matters for weight and range.",
    "Separately, a fuel-flow meter with an integrator drives a fuel-flow gauge (lb/hr) and totaliser, while temperature and pressure sensors drive their own gauges.",
    "Measuring fuel by MASS (via capacitance, which responds to fuel density) rather than volume makes the quantity accurate regardless of temperature and attitude.",
  ],
  "insfig-38_21": [
    "This shows the construction of a capacitance fuel-tank unit (probe). It is essentially two concentric metal tubes — an inner and an outer tube — forming a capacitor, held apart by nylon sleeves and insulating pins, with co-axial connectors at the top.",
    "Fuel between the tubes acts as the dielectric; because fuel and air have different dielectric constants, the capacitance changes with the fuel level (and, helpfully, with density).",
    "Measuring that capacitance gives the mass of fuel in the tank — the basis of the accurate capacitance fuel-gauging system.",
  ],
  "insfig-38_23": [
    "This is a fuel-flow transmitter (flowmeter) cutaway. Fuel entering the chamber spins an impeller that carries a magnetic insert; as it turns, the magnet induces pulses in an induction coil through the electrical connector.",
    "The rate the impeller spins is proportional to the fuel flow, so the pulse rate gives the flow, which the cockpit gauge displays and the totaliser integrates into fuel used.",
    "Knowing fuel flow lets the crew manage range and endurance and spot an abnormal consumption early.",
  ],

  // ═══ Flight Instruments (A.7.9 — flight recorders) ═══
  "insfig-36_01": [
    "This shows the flight data recorder (FDR) system. A flight data acquisition unit (FDAU) collects data from the aircraft's systems, including a dedicated accelerometer (for the g-loads) and the flight warning computer.",
    "On the pedestal there is a DFDR event button the crew can press to 'mark' the recording at a point of interest, alongside the flood light and AIDS controls.",
    "The FDR captures hundreds of parameters continuously so that, after an incident, investigators can reconstruct exactly what the aircraft and its systems were doing.",
  ],
  "insfig-36_02": [
    "This shows the architecture of a digital flight data recorder (DFDR). A digital flight data acquisition unit (DFDAU) gathers the mandatory parameters (the minimum list the regulations require) plus optional ones, and an accelerometer input.",
    "It formats them and sends them as 'flight data' to the DFDR itself — the crash-protected recorder (shown red, though the real crash-survivable case is bright orange). A control panel and status/playback lines let the recording be monitored and read out.",
    "The recorder is built to survive crash impact, fire and immersion, and carries an underwater locator beacon, so the data can be recovered after an accident.",
  ],
  "insfig-37_01": [
    "This shows the cockpit voice recorder (CVR) and its controls. A recorder control panel (RCDR) carries a ground-control AUTO/ON switch, a CVR ERASE button and a CVR TEST button, and is located on the overhead panel.",
    "The CVR continuously records the flight crew's voices, radio transmissions and cockpit area sounds on a loop, keeping the last period (typically 2 hours on modern recorders).",
    "The erase function only works on the ground with the parking brake set, so the recording cannot be wiped in flight.",
  ],
  "insfig-37_02": [
    "This shows the CVR control unit face. It has an area MICROPHONE that picks up the general cockpit sounds, a MONITOR indicator to confirm the recorder is working, a TEST button and an ERASE button, and a HEADSET (600 ohm) jack to listen to the monitor.",
    "Pressing TEST checks the recorder and deflects the monitor needle; ERASE (on the ground only) wipes the loop.",
    "Together with the flight data recorder, the CVR gives investigators the crew's words and the cockpit sounds to go with the recorded flight data.",
  ],

  // ═══ Flight Instruments (A.7.8 — TCAS / ACAS) ═══
  "insfig-35_01": [
    "This shows the protected airspace TCAS builds around the aircraft. An outer volume generates a traffic advisory (TA) — the yellow cylinder — and an inner volume generates a resolution advisory (RA) — the orange cylinder — with the aircraft in the protected core.",
    "The volumes are shaped by TIME to the closest point of approach, not just distance, so they stretch out ahead where the closing speed is high.",
    "TCAS watches other aircraft's transponders; when one is predicted to enter these volumes it warns the crew (TA) and, if the threat grows, tells them what to do (RA).",
  ],
  "insfig-35_02": [
    "This shows the coverage of the TCAS directional antenna. Mounted on top (and bottom) of the aircraft, it can tell roughly which direction an interrogated aircraft's reply comes from, giving the bearing to the traffic.",
    "By interrogating nearby transponders and timing the replies, TCAS measures each intruder's range, and from the Mode C/S data its altitude and trend.",
    "Knowing range, bearing and relative altitude lets TCAS place the traffic on the display and decide whether it is a threat.",
  ],
  "insfig-35_03": [
    "This shows a complete TCAS installation. A Mode S transponder and TCAS computer work with top and bottom antennas to interrogate other aircraft's transponders and listen for the replies.",
    "The transmitter/receiver computer works out the threats and drives the displays: the traffic is shown on a dedicated TCAS display or the ND, and resolution advisories appear on the PFD/VSI (e.g. 'INCREASE CLIMB'). A control panel sets the mode (STBY/TA/RA-TA) and range.",
    "Crucially, two TCAS-equipped aircraft coordinate over the Mode S link so their resolution advisories are complementary — one told to climb, the other to descend.",
  ],
  "insfig-35_04": [
    "This shows the TCAS alerting zones by time to collision. In the outer CAUTION area (about 35–45 seconds away) TCAS issues a Traffic Advisory (TA) — 'TRAFFIC, TRAFFIC' — to draw the crew's attention.",
    "In the inner WARNING area (about 15–35 seconds away) it issues a Resolution Advisory (RA), telling the crew to climb or descend to avoid the COLLISION area.",
    "Because the thresholds are in time, not distance, a fast closure triggers the alerts further out — giving the crew a roughly constant warning time.",
  ],
  "insfig-35_05": [
    "This shows how a resolution advisory is flown on the vertical-speed indicator. A RED band marks the vertical speeds to AVOID, and a GREEN band the vertical speed to FLY TO; the pilot simply moves the VSI needle out of the red and into the green.",
    "So an RA like 'CLIMB' puts the green band in the climb region and reds-out the descent; 'DESCEND' does the opposite.",
    "Presenting the RA as a 'fly-to' zone on the VSI makes the required manoeuvre instant to read and fly.",
  ],
  "insfig-35_06": [
    "This explains the TCAS traffic display. Own aircraft is the symbol in the centre with a range ring around it; the selected range (e.g. 10 NM) is shown in the corner. Each intruder is drawn at its relative bearing and range, tagged with its relative altitude and a trend arrow.",
    "Messages tell the crew the state of the system: 'TA ONLY' (RAs inhibited, e.g. at low level), 'TD FAIL'/'TCAS OFF' for failures, 'OFF SCALE' when traffic is beyond the selected range, and 'NO BEARING' when the direction cannot be determined.",
    "Reading the display tells the crew where the traffic is, whether it is above or below and climbing or descending, and whether TCAS is fully working.",
  ],
  "insfig-35_07": [
    "This shows the standard TCAS traffic symbols. A cyan (open) diamond is 'other traffic'; a filled cyan diamond is 'proximate traffic' (close but not a threat); an amber filled circle is a Traffic Advisory (TA); and a red filled square is a Resolution Advisory (RA).",
    "Each carries its relative altitude (e.g. −03 = 300 ft below) and an up/down arrow for its vertical trend. The red/green VSI scale around the edge shows the RA fly-to guidance.",
    "The colour and shape instantly rank the threat — red square and the RA guidance demand action, amber circle is a heads-up, cyan diamonds are just awareness.",
  ],
  "insfig-35_08": [
    "This shows TCAS traffic overlaid on the navigation display in map mode. The intruders (RA red square, TA amber, proximate cyan diamonds) appear in their real positions relative to the route, waypoints and weather.",
    "Combining traffic with the moving map lets the crew see conflicting traffic in the context of where they are going, and an annunciation (e.g. 'TA 2.5') flags the threat.",
    "Integrating TCAS into the ND means the crew do not need a separate instrument to see where the traffic is relative to their flight path.",
  ],

  // ═══ Flight Instruments (A.7.8 — GPWS / TAWS) ═══
  "insfig-34_01": [
    "This shows the inputs and outputs of a ground proximity warning system (GPWS). Into the central processing unit go radio altitude, Mach/airspeed, air data, ILS glidepath deviation, and the undercarriage, flap and navigation inputs.",
    "From these it decides whether the aircraft is dangerously close to the ground for its configuration and flight path, and drives a master indicator, visual warning and audio (voice) warning.",
    "GPWS exists because 'controlled flight into terrain' — flying a serviceable aircraft into the ground — was a major killer; it watches the ground for the crew.",
  ],
  "insfig-34_02": [
    "This is a GPWS control panel. An INOP light shows if the system has failed, a SYS TEST button checks it, and a FLAP/GEAR INHIBIT (versus NORMAL) switch lets the crew inhibit certain alerts for a deliberate non-standard approach (e.g. a flapless landing).",
    "Inhibiting is used sparingly and knowingly — it stops nuisance warnings when the crew have a good reason to be in a configuration GPWS would otherwise flag.",
    "The simple panel reflects that GPWS is normally fully automatic; the crew only test it and, rarely, inhibit a mode.",
  ],
  "insfig-34_03": [
    "This is GPWS Mode 1 — excessive rate of descent for the height above the ground. The chart plots descent rate against radio height: inside the amber area the aircraft calls 'SINK RATE', and inside the red area 'PULL UP'.",
    "The closer to the ground, the lower the descent rate that triggers the warning — a high sink rate is fine at altitude but dangerous near the surface.",
    "Mode 1 protects against simply descending into the ground too fast, regardless of configuration.",
  ],
  "insfig-34_04": [
    "This is GPWS Mode 2 — excessive closure rate with rising terrain. Even at a modest descent rate, flying towards rising ground closes the gap quickly; the chart triggers 'TERRAIN TERRAIN' and then 'PULL UP' as the closure becomes dangerous.",
    "It uses the rate of change of radio altitude, so it catches terrain coming up to meet the aircraft (e.g. flying towards a hill) that Mode 1 would miss.",
    "Mode 2 is the classic protection against flying into rising ground in poor visibility.",
  ],
  "insfig-34_05": [
    "This is GPWS Mode 3 — altitude loss after take-off or go-around. If the aircraft sinks back towards the ground just after getting airborne, the 'DON'T SINK' alert warns the crew.",
    "The envelope allows a little settling but calls out any significant height loss when the aircraft should be climbing away.",
    "Mode 3 guards the critical few seconds after take-off, where an inadvertent descent is especially dangerous.",
  ],
  "insfig-34_06": [
    "This is GPWS Mode 4 — unsafe terrain clearance when not in the landing configuration. If the aircraft is low with the gear up it calls 'TOO LOW GEAR'; low and fast without enough terrain clearance it calls 'TOO LOW TERRAIN' (a related sub-mode calls 'TOO LOW FLAP' if the flaps are not set for landing).",
    "The speed boundary (shown with a Mach–IAS conversion) makes the warning come earlier at higher speed, where less time is available to react.",
    "Mode 4 ensures the aircraft is properly configured (gear and flap down) before it gets close to the ground on an approach.",
  ],
  "insfig-34_08": [
    "This is GPWS Mode 5 — descent below the ILS glideslope. The chart shows a 'soft' alerting area (quiet 'glideslope' callout) above a 'hard' alerting area (louder, more insistent) as the aircraft sinks further below the beam (beyond about 1.3 dots).",
    "A below-glideslope deviation close to the ground is a strong sign of an unsafe approach, so the warning gets more urgent the lower and further below the aircraft gets.",
    "Mode 5 backs up the crew's monitoring of the glideslope during an ILS approach.",
  ],
  "insfig-34_10": [
    "This is GPWS Mode 6 — excessive bank angle near the ground. The envelope allows a generous bank at height, but as radio altitude decreases the permitted bank shrinks (e.g. 10° near the ground, 40° higher up); exceeding it triggers a 'BANK ANGLE' callout.",
    "A steep bank close to the ground risks a wingtip strike or an accelerated stall, so it is only allowed higher up.",
    "Mode 6 also handles the altitude callouts ('minimums', height callouts) — the gentle voice cues as the aircraft nears decision height.",
  ],
  "insfig-34_11": [
    "This is GPWS Mode 7 — windshear detection. Flying into a microburst, the aircraft first meets a performance-increasing headwind, then a strong downdraught and a performance-decreasing tailwind that can push it into the ground.",
    "When the system detects the windshear signature it gives a caution (light/voice) and, for a severe shear, a red warning and a 'WINDSHEAR, WINDSHEAR, WINDSHEAR' aural alert, prompting the escape manoeuvre.",
    "Windshear near the ground on take-off or approach has caused fatal accidents, which is why its detection was added to GPWS.",
  ],
  "insfig-34_12": [
    "This shows an enhanced GPWS (EGPWS/TAWS) terrain display. Using a worldwide terrain database and GPS position, it paints the terrain on the navigation display in green, and colours it yellow then red as it becomes a threat.",
    "About 40–60 seconds from a projected impact it gives a 'CAUTION TERRAIN' (solid yellow); about 20–30 seconds out it escalates to solid red and 'TERRAIN, TERRAIN — PULL UP'.",
    "Because it 'looks ahead' using the database rather than just straight down with the radio altimeter, EGPWS gives far earlier warning of terrain ahead, even terrain the aircraft is not yet over.",
  ],
  "insfig-34_13": [
    "This shows the EGPWS 'look-ahead' warning envelope. Ahead of the aircraft the system projects a protected volume — a look-ahead distance plus a small altitude offset below the flight path — and checks it against the terrain database.",
    "If terrain intrudes into that volume, a warning is given with time to react (the example shows a warning at 1.1 NM, about 22 seconds at 180 kt).",
    "Projecting the protection ahead of, and slightly below, the aircraft is what lets EGPWS warn of terrain before the aircraft reaches it.",
  ],
  "insfig-34_14": [
    "This shows the EGPWS terrain clearance floor (TCF) around a runway. The system builds an envelope that steps up with distance from the runway (e.g. 400 ft AGL by 5 NM, 700 ft AGL by 15 NM), creating a protective 'floor' on the approach.",
    "If the aircraft descends below this floor when it is not yet close enough to the runway to be landing, the system warns — catching an approach to the wrong place or a premature descent.",
    "The TCF guards against landing-short and approaches to terrain even where the basic modes, tied to configuration, might not alert.",
  ],

  // ═══ Flight Instruments (A.7.8 — flight & stall warnings) ═══
  "insfig-32_01": [
    "This shows a glass flight deck's warning displays. Each pilot has a PFD and ND; in the centre are the engine/warning display (E/WD) and the system display (SD), where the warning system writes its messages and checklists.",
    "Red master WARNING and amber master CAUTION lights sit in front of each pilot, backed by a loudspeaker for the aural alerts, and an ECAM control panel lets the crew call up system pages.",
    "This layout (Airbus ECAM / Boeing EICAS) replaces dozens of separate warning lights with a central, prioritised display of what is wrong and what to do about it.",
  ],
  "insfig-32_02": [
    "This shows the warning electronic unit that drives the central warning system. Inputs from the fire warnings, GPWS, communications, and flap/gear/speedbrake positions are gathered and prioritised into warning 'levels'.",
    "Level-A (red WARNING) items demand immediate action and drive the master warning, a bell/chime and the siren/owl aural modules to the warning speakers; level-B (amber CAUTION) items drive the master caution. Take-off and landing configuration modules check the aircraft is correctly set up.",
    "So one unit collects every alert, decides its urgency, and presents it as the right light, sound and EICAS/ECAM message — the heart of the central warning system.",
  ],
  "insfig-33_01": [
    "This shows altitude alerting. As the aircraft approaches the selected altitude (set on the autopilot), an aural alert and light warn the crew at about 900 ft to go, so the level-off is anticipated.",
    "If the aircraft then DEPARTS the selected altitude (drifts off the level it should be holding), another alert sounds at about 300 ft away to catch the deviation.",
    "This 'approaching' and 'departing' alerting guards against both busting an assigned level and drifting off it — a common source of altitude errors.",
  ],
  "insfig-33_02": [
    "This shows the altitude-alert module. It compares the barometric altitude with the selected altitude set on the autoflight mode control panel, and when they are within the alerting band it triggers the warnings.",
    "The outputs are an aural 'beep-beep-beep' through the warning speakers, an amber ALT ALERT caution light, the master caution lights and an altitude-alert annunciation.",
    "A simple comparison of 'where I am' against 'where I should be' is all it takes to give the crew timely warning of an approaching or departing level.",
  ],
  "insfig-33_04": [
    "This shows the overspeed warning on an EFIS speed tape. The maximum operating speed (VMO/MMO) is marked by a red-and-black 'barber pole'; the airspeed pointer must stay below it.",
    "A yellow band below it marks the high-speed buffet limit — the speed at which the aircraft would start to buffet from shock-induced separation at high Mach.",
    "Painting these limits right on the speed tape lets the crew see instantly how much margin they have, and an aural overspeed warning sounds if VMO/MMO is exceeded.",
  ],
  "insfig-33_05": [
    "This shows the stall warning system. A stall warning module takes in the angle of attack, the flap and slat positions, airspeed (from the ADC), thrust and the landing-gear position, because the stalling angle and speed depend on configuration.",
    "When a stall is approaching it drives a stick-shaker motor, the master warning light, a synthetic 'STALL STALL' voice and an aural warning, and feeds the AoA indicator and EFIS. A test input checks the system.",
    "Taking configuration into account means the warning fires at the right margin before the stall whether the aircraft is clean or with flaps and gear down.",
  ],
  "insfig-33_07": [
    "This shows an angle-of-attack (AoA) vane sensor mounted on the fuselage skin. A small vane sticks into the airflow and weathercocks to line up with the relative wind; its angle relative to the aircraft is the angle of attack.",
    "The vane is heated to prevent icing and is mounted forward on the fuselage where the airflow is clean. Aircraft carry more than one, on each side, for redundancy.",
    "Because the stall happens at a fixed angle of attack (not a fixed speed), measuring AoA directly is the most reliable way to drive the stall warning and protection.",
  ],
  "insfig-33_08": [
    "This shows how the AoA signal is used. The AoA probe feeds a flight-control/management computer (together with flap position), which drives an AoA indicator, an approach indexer and the flight-director interface.",
    "The AoA indicator shows the margin to the stall, with marks for STALL, STALL WARNING and the correct LANDING AoA; the indexer (red chevron / green doughnut / amber chevron) gives the pilot a simple fast/on-speed/slow cue on the approach.",
    "Flying the indexer 'doughnut' keeps the aircraft exactly on the right approach angle of attack regardless of weight, which is why carrier and precise approaches use it.",
  ],

  // ═══ Flight Instruments (A.7.6 — yaw damper) ═══
  "insfig-29_01": [
    "This shows 'Dutch roll' — a combined rolling-and-yawing oscillation that swept-wing jets are prone to. The traces show bank angle over time: a STABLE aircraft damps the oscillation out on its own, a NEUTRAL one keeps oscillating at a steady amplitude, and an UNSTABLE one builds up.",
    "Dutch roll is uncomfortable and, if poorly damped, hard to fly manually.",
    "Because many jets have weak natural Dutch-roll damping, a yaw damper is fitted to damp it automatically — this is the oscillation the yaw damper exists to kill.",
  ],
  "insfig-29_02": [
    "This explains why Dutch roll couples yaw and roll. When the aircraft yaws, the wing that moves forward has a greater projected span and speed, so it makes more lift and rises, while the retreating wing drops — so a yaw produces a roll.",
    "That roll then feeds back into more yaw, and the two keep swapping energy, giving the rolling-plus-yawing wallow of Dutch roll.",
    "Understanding this coupling shows why damping the YAW (with the rudder) is the effective way to stop the whole Dutch-roll motion.",
  ],
  "insfig-29_04": [
    "This shows how the yaw damper tells a wanted turn from an unwanted Dutch roll. A rate gyro senses yaw rate; in a steady, CONSTANT-rate turn the signal, after filtering (a 'washout'), fades to nothing — so the yaw damper does NOT fight the pilot's turn.",
    "But a Dutch-roll OSCILLATION is a changing, back-and-forth yaw rate; that passes through the filter and produces an output.",
    "So the washout filter lets the yaw damper ignore deliberate turns but respond to oscillations — damping Dutch roll without opposing normal flying.",
  ],
  "insfig-29_05": [
    "This shows the yaw-damper signal chain. The rate gyro's signal is given a phase advance, demodulated, passed through a narrow band-pass filter (tuned to the Dutch-roll frequency), re-modulated, amplified and sent to the rudder servo motor.",
    "The band-pass filter is the key: it passes only the Dutch-roll frequency and rejects both steady turns and high-frequency noise, so the damper acts on exactly the motion it should.",
    "The output drives a series actuator on the rudder, applying small, rapid rudder movements to damp the oscillation — without moving the pilot's pedals.",
  ],

  // ═══ Flight Instruments (A.7.6 — autoland & autothrottle) ═══
  "insfig-27_01": [
    "This shows the sequence of an automatic landing. As the aircraft intercepts the ILS, the autopilot captures the localiser (LOC CAP) and then the glideslope (GS CAP), and the mode annunciations change at each stage.",
    "Using radio altitude, the system arms and engages the later modes: at about 330 ft the flare is armed, at around 45 ft it begins the FLARE that rounds out the descent, the autothrottle retards the thrust, and at a few feet it de-crabs and touches down, then rolls out on the runway centreline.",
    "The small A/P status boxes show how the engaged (R) and armed (P) modes step through the approach — the crew monitor these to confirm the autoland is progressing correctly.",
  ],
  "insfig-27_02": [
    "This shows the ILS/autoland categories, set by how low the decision height (DH) and runway visual range (RVR) are allowed to be. CAT I: DH not below 200 ft, RVR not less than 550 m. CAT II: DH down to 100 ft, RVR not less than 300 m.",
    "CAT III goes lower still: IIIA (DH below 100 ft or none, RVR not less than 200 m), IIIB (DH below 50 ft or none, RVR 50–200 m), and IIIC (no DH, no RVR limit — nil visibility).",
    "Flying to the lower categories needs more capable, redundant automatics (fail-passive or fail-operational autoland) and suitable ground equipment — which is why the aircraft annunciates its current CAT capability.",
  ],
  "insfig-28_01": [
    "This shows the autothrottle system. An autothrottle computer takes in the mode selection (from the AFCS mode control panel) and data from the air-data computer, the inertial reference, the N1 (engine) and angle-of-attack sensors, radio altitude and the air/ground (gear) logic.",
    "From these it drives the A/T servo actuator on the thrust levers to set and hold the demanded thrust or speed, shows the target as an N1 index on the engine gauge, and annunciates its mode on the PFD. It coordinates with the flight-control and flight-management computers.",
    "So the autothrottle is the 'autopilot for the engines' — it moves the thrust levers to hold a speed or a thrust setting, including the retard during an autoland flare.",
  ],

  // ═══ Flight Instruments (A.7.6 — autopilot) ═══
  "insfig-26_01": [
    "This is the closed-loop control principle behind every autopilot. An INPUT (the demanded attitude, heading or altitude) is compared by a DETECTOR; the difference drives an OUTPUT that moves the aircraft, and the CONTROL stage drives the surface.",
    "A FEEDBACK path measures the actual result and feeds it back to the detector, so the loop keeps correcting until the output matches the input and the error is zero.",
    "This constant 'compare, correct, re-measure' is why an autopilot can hold a value steadily without the pilot — it is always nulling its own error.",
  ],
  "insfig-26_03": [
    "This shows the autopilot's control loop driving a flight control. The autopilot computer turns the demanded change into an electrical signal that drives a SERVOMOTOR (actuator); through a mechanical coupling this moves the control surface (or its power unit, the PFCU).",
    "Two feedback paths close the loop: rate-and-position feedback tells the computer exactly where the servo is, and aerodynamic feedback is the aircraft's actual response.",
    "Because the computer always knows the surface position and the aircraft's response, it can apply just the right amount of control and stop cleanly on target.",
  ],
  "insfig-26_04": [
    "This shows the autopilot's two nested loops. The INNER loop (autopilot computer → servomotor → control surface → error detector) is fast; it stabilises the aircraft's attitude and damps out disturbances.",
    "The OUTER loop is slower and does the navigating — for example MCP heading hold compares the gyro-magnetic compass heading with the selected heading and feeds a demand into the inner loop.",
    "So the outer loop decides WHAT to do (hold this heading/altitude) and the inner loop decides HOW to move the controls to achieve it smoothly.",
  ],
  "insfig-26_05": [
    "This shows an autopilot actuator connected in PARALLEL with the manual control run. The A/P actuator moves the whole control linkage, so when the autopilot flies, the pilot's control wheel moves too (you can see it follow the inputs).",
    "An artificial-feel unit still provides control feel, and the PFCU powers the surface. Because the linkage is shared, a parallel actuator has enough authority to fly the aircraft fully.",
    "The moving control wheel gives the crew a clear cue of what the autopilot is doing, and the pilot can override it by force on the wheel.",
  ],
  "insfig-26_06": [
    "This shows an autopilot actuator connected in SERIES within the control run. Here the actuator inserts small movements into the linkage WITHOUT moving the pilot's control wheel.",
    "Series actuators have limited authority and are used for jobs like yaw damping or stability augmentation, where only small, fast corrections are needed and the controls should not be seen to move.",
    "Parallel for full flight-path control (wheel moves), series for small automatic corrections (wheel still) — the two arrangements suit different autopilot functions.",
  ],
  "insfig-26_07": [
    "This shows the engage-interlock chain of an autopilot. Pressing the MCP engage switch only energises the engage relay — and so the servomotor clutch — if EVERY protective condition in the chain is satisfied.",
    "Those conditions include power-monitor OK, the rate gyro valid, the computer and servomotor self-tests passed, and hydraulic pressure present. A disengage button (and loss of any condition) breaks the chain and drops the autopilot out.",
    "This series of interlocks ensures the autopilot can only engage when it is healthy, and disconnects instantly if a fault appears.",
  ],
  "insfig-26_10": [
    "This PFD shows the autopilot/flight-director status along the top — the flight mode annunciator (FMA). It reads the auto-throttle mode (SPEED), the pitch mode (ALT / GS), the roll mode (HDG / LOC), the approach capability (CAT 2 DUAL, DH 100) and what is engaged (AP1, FD1, A/THR).",
    "The crew's primary check of the automatics is this FMA band: it says exactly what the aircraft is doing and what it is armed to do next.",
    "Colour and position are standardised (green active, etc.) so a glance confirms the automatics are in the expected modes.",
  ],
  "insfig-26_11": [
    "This explains the flight mode annunciator (FMA) in full. It is split into columns: the auto-throttle engaged mode, the pitch engaged mode, the roll engaged mode and the A/P status, with the armed modes shown below the active ones.",
    "The lists show the many possible annunciations (N1, RETARD, FMC SPD; TO/GA, ALT HOLD, VNAV PTH, G/S, FLARE; HDG SEL, VOR/LOC, LNAV; CMD, FD, CWS). A highlight box flags a mode that has just changed so the crew notice it.",
    "Reading the FMA correctly is the single most important monitoring task when the automatics are flying — it is how the crew keep 'ahead' of what the aircraft will do.",
  ],
  "insfig-26_12": [
    "This shows a dual-channel (A and B) autopilot. Each channel has its own roll, pitch and yaw inner loops, fed from the air-data, attitude (VG/INS/IRS), magnetic-heading, VOR/ILS and flight-management sources; the MCP selects the modes and engages the channels.",
    "Running two independent channels allows 'fail-operational' automatic landings: if one channel fails, the other keeps flying the approach, which is what CAT III autoland requires.",
    "Duplicating (or triplicating) the channels and their sensors is how the automatics are made safe enough to land the aircraft in very low visibility.",
  ],

  // ═══ Flight Instruments (A.7.6 — autopilot MCP) ═══
  "insfig-25_06": [
    "This is the mode control panel (MCP) — the autopilot and flight-director 'master switch' panel. The crew select the target COURSE, IAS/MACH, HEADING, ALTITUDE and VERTICAL SPEED here, and arm the modes to fly them.",
    "Mode buttons (LNAV/VNAV, VOR LOC, APP, LVL CHG, HDG SEL, ALT HOLD, VS, SPEED, N1) tell the autopilot/FD what to do; A/P ENGAGE (CMD A/B) turns the autopilot on, CWS gives control-wheel steering, and F/D switches the flight director on.",
    "The MCP is how the crew tell the automatics what to fly; the flight director then shows it and the autopilot flies it.",
  ],

  // ═══ Flight Instruments (A.7.3 — EFIS) ═══
  "insfig-22_01": [
    "This shows how an EFIS (electronic flight instrument system) is built. Three symbol generators (left, centre, right) take in raw data — from the VOR, DME, ILS, radio altimeter, weather radar, inertial reference, flight-control and flight-management computers — and draw the pictures on the screens.",
    "Each pilot's attitude director indicator (ADI/PFD) and horizontal situation indicator (HSI/ND) are driven by a symbol generator; the centre generator is a spare that can take over either side. Control panels set the modes and brightness, and remote light sensors dim the screens automatically.",
    "Gathering everything through symbol generators lets the same data be drawn in different ways on either side and sent on to the flight-data recorder.",
  ],
  "insfig-22_02": [
    "This is an EFIS control panel. The left knob sets the barometric reference and minimums (BARO/STD, RADIO/BARO minimums), and the right knob the altimeter setting (IN/HPA).",
    "The CTR (mode) selector chooses how the navigation display is drawn — APP, VOR, MAP or PLN — and the TFC (range) knob sets the map range (5 to 640 NM). VOR/ADF selectors pick the needle sources.",
    "The row of buttons (WXR, STA, WPT, ARPT, DATA, POS, TERR) overlay extra information — weather, navaids, waypoints, airports, terrain — on the navigation display as the crew need it.",
  ],
  "insfig-22_05": [
    "This shows a complete EFIS installation: the control panel at the top, the primary flight display (PFD) on the left and the navigation display (ND) on the right.",
    "The PFD gathers attitude, airspeed, altitude, vertical speed, heading and the ILS deviations — plus radio altitude and the autopilot/flight-director modes — into one picture. The ND shows the compass, track, the flight-planned route and navaids.",
    "Side by side they give the crew the full flying and navigation picture that used to be spread across a dozen separate round instruments.",
  ],
  "insfig-22_06": [
    "This is an electronic HSI (the navigation display in full-compass-rose mode). A 360° compass card turns under a fixed heading pointer, with the aircraft symbol in the centre.",
    "A course deviation indicator (the magenta bar) shows displacement from the selected VOR/ILS track, and the data blocks give heading, DME distance, the tuned frequency and TO/FROM.",
    "The full rose is useful for tracking a radial or localiser, giving the same information as the old mechanical HSI but drawn electronically and in colour.",
  ],
  "insfig-22_07": [
    "This is the electronic HSI in EXPANDED (arc) mode with the weather radar overlaid. Only the forward portion of the compass is shown, enlarged, so detail ahead is clearer.",
    "The coloured returns are weather radar echoes painted onto the display, so the crew can see storms relative to their track and planned turns, with the CDI still showing navigation guidance.",
    "Overlaying weather on the navigation picture, in the arc mode, is one of the big advantages of EFIS over separate instruments.",
  ],
  "insfig-22_10": [
    "This is the navigation display in MAP mode — the 'moving map' driven by the flight management system. The aircraft symbol sits at the bottom, with the flight-planned route drawn ahead through its waypoints (ZAPPO, BANTU, EDNOR…), each tagged with its altitude and time.",
    "Navaids and airfields are shown as symbols, weather radar is overlaid, and a green range arc marks a selected distance; track and time are shown at the top.",
    "This map-mode display, oriented to track and continuously updated by the FMS, gives the crew an at-a-glance picture of where they are, what is ahead and how the flight plan is progressing.",
  ],

  // ═══ Flight Instruments (A.7.3 — FMS) ═══
  "insfig-21_01": [
    "This shows the architecture of a flight management system (FMS). At its heart are two flight management computers (FMCs), one per side, cross-linked so either can take over if the other fails.",
    "Each FMC gathers position and air data from many sources — VOR, DME, GPS, the inertial reference systems (IRS), the air data computers (ADC) and engine/fuel data — and holds a navigation database. The crew interact through the control display unit (CDU), and the FMC drives the flight guidance system (FGS/autopilot).",
    "By combining all these inputs, the FMS works out the aircraft's best position, flies the planned route, and manages speed and fuel automatically.",
  ],
  "insfig-21_02": [
    "This is the control display unit (CDU/MCDU) — the keypad-and-screen the crew use to talk to the FMS. The screen shows pages of data (here the identification page with the navigation-database validity dates), and line-select keys down each side pick items on the screen.",
    "Function keys (RTE, CLB, CRZ, DES, LEGS, HOLD, PROG, FIX, INIT REF) call up the pages for building and monitoring the flight plan, and a full alphanumeric keypad lets the crew type entries into the scratchpad.",
    "A message light and a fail light warn of FMS messages or faults. The CDU is how the route, performance data and settings are loaded and reviewed before and during flight.",
  ],

  // ═══ Flight Instruments (A.7.3 — radio altimeter) ═══
  "insfig-20_01": [
    "This shows how a radio altimeter measures height using FM-CW (frequency-modulated continuous wave). The aircraft transmits a radio signal (around 4300 MHz) whose frequency is continuously swept up and down.",
    "By the time the reflection returns from the ground, the transmitter has moved on to a different frequency, so there is a FREQUENCY DIFFERENCE between the transmitted and received signals at any instant. That difference is directly proportional to the time of flight — and so to the height.",
    "Measuring the beat frequency gives an accurate height above the ground, used in the last few thousand feet of the approach and for autoland.",
  ],
  "insfig-20_02": [
    "This is a dedicated radio-altimeter dial, reading FEET × 100. Below a few thousand feet the pointer shows the actual height above the terrain directly beneath the aircraft.",
    "A movable 'bug' with a yellow sector sets a decision height; a low-altitude warning light and a failure flag (a striped mask over the pointer) warn the crew, and a 'press to test' button checks the system.",
    "Unlike the pressure altimeter (height above a pressure datum), the radio altimeter shows true height above the ground — vital for the flare and for low-visibility approaches.",
  ],
  "insfig-20_03": [
    "This shows the radio altitude displayed on an electronic attitude director indicator (EADI) during an autoland. The radio altitude (here 1500) appears near the top, with the decision height (DH 100) set alongside.",
    "As the aircraft descends, autoland annunciations (FLARE, ROLL OUT) and the LAND 3 / G/S / LOC status show the automatic landing is armed and progressing.",
    "The radio altimeter is what triggers the flare and the autothrottle retard at the right height above the runway, so its reading is central to the autoland.",
  ],
  "insfig-20_04": [
    "This shows radio altitude on a glass display as a small arc (dial) with a moving pointer and a digital read-out (here 950 ft). The arc fills in as the aircraft descends, giving a quick sense of height above the ground.",
    "Showing it as an arc near the attitude display keeps the height-above-terrain in the pilot's scan during the approach.",
    "The colour and a bug change as the aircraft nears the decision height, drawing the eye at the critical moment.",
  ],
  "insfig-20_06": [
    "This shows the radio altitude integrated into a full primary flight display. The large figure (1390) in the lower part of the attitude sphere is the height above the ground from the radio altimeter.",
    "Around it are the speed and altitude tapes, the ILS deviation, and the autoland/autopilot status (CAT3 DUAL, AP1+2, A/THR) — everything the crew need for a low-visibility approach in one picture.",
    "Combining the radio altitude with the attitude and guidance lets the crew monitor an automatic approach down to the runway from a single display.",
  ],
  "insfig-20_07": [
    "This explains 'residual height'. The radio altimeter measures from its ANTENNA (under the fuselage) to the ground, not from the wheels. So at the moment the wheels touch, the antenna is still some height above the runway — the residual height — and the radio altimeter does not read exactly zero.",
    "A nose-up attitude at touchdown increases this residual height; a flatter attitude reduces it, as the second aircraft shows.",
    "The system is calibrated to allow for this, but it explains why the radio altimeter indication at touchdown is a small positive value rather than zero.",
  ],

  // ═══ Flight Instruments (A.7.2 — remote-indicating compass) ═══
  "insfig-17_04": [
    "This shows how the output of a flux detector (flux valve) varies with heading. As the aircraft turns, the signal picked up by the valve changes smoothly, following the horizontal component of the Earth's field in a sine-like way over 360°.",
    "Because the output is a known function of heading, the system can work out exactly which way the aircraft is pointing from the strength of the signal in each of the valve's legs.",
    "This continuous electrical signal is what makes a remote-indicating compass possible — unlike the mechanical card of a direct-reading compass.",
  ],
  "insfig-17_05": [
    "This shows the heart of the flux valve. A central exciter coil is fed with AC (commonly 400 Hz; the drawing shows 800 Hz as the doubled frequency it produces), which magnetises soft 'Permalloy' legs A and B.",
    "The Earth's horizontal field adds to the excitation in one leg and subtracts in the other, so the secondary winding picks up a signal whose size depends on how the valve lies relative to magnetic north.",
    "The flux valve has no moving parts — it senses direction purely electrically, which is why it can be mounted in a quiet spot (like a wingtip) away from the aircraft's own magnetism.",
  ],
  "insfig-17_07": [
    "This shows the signals in the two legs of the flux valve (A and B). The excitation drives each leg into magnetic saturation twice per cycle, and the Earth's field makes one leg saturate a little earlier and the other a little later.",
    "The difference shifts the combined signal off its 'zero' baseline by an amount set by the Earth's field, producing a second-harmonic output that the electronics measure.",
    "Reading how far the baseline has shifted (and in which sense) in each leg lets the system calculate the heading.",
  ],
  "insfig-17_10": [
    "This shows the flux valve (the three-spoked star) wired to a receiver. The three pick-off coils are 120° apart, so the valve's signal is carried on three wires — exactly like a synchro (selsyn) system.",
    "Those three wires feed a receiver synchro, which reproduces the flux valve's 'magnetic north' direction as a shaft position that can drive the compass card or feed other systems.",
    "This three-wire synchro link is how the heading sensed out at the flux valve is transmitted to the cockpit display and to the autopilot, radio compass and recorders.",
  ],
  "insfig-17_11": [
    "This is the cockpit display of a remote-indicating (slaved) compass, often combined with navigation as an HSI. The compass card is driven from the flux valve via the synchro link, and read against a fixed lubber line at the top.",
    "A heading bug, set by the heading selector, marks a chosen heading for the autopilot to fly, and a heading warning flag appears if the slaving system fails.",
    "Because the card is driven electrically from the remote flux valve and continuously 'slaved' to magnetic north, it is steady and free of the swings and turning errors of a direct-reading compass.",
  ],

  // ═══ Flight Instruments (A.7.2 — direct-indicating compass) ═══
  "insfig-10_01": [
    "This cutaway shows a direct-reading (magnetic) compass. A set of small bar magnets is fixed to a compass card; the whole assembly is pivoted on a jewelled bearing so it can swing freely to line up with the Earth's field.",
    "The assembly floats in a bowl of liquid, which supports the weight on the pivot, damps out swinging, and lubricates the bearing. The pilot reads heading against a fixed lubber line through the window.",
    "Being self-contained and needing no power, this compass is the required standby direction reference in every aircraft.",
  ],
  "insfig-10_02": [
    "This shows the forces on the compass magnet in the Earth's field. The field's vertical component (Z) tries to pull one end of the magnet down, tilting it. To keep the card roughly level, the magnet is hung so its centre of gravity is BELOW the pivot (pendulous mounting).",
    "The weight (W) acting below the pivot and the support reaction (R) together produce a righting effect that opposes the magnetic tilt, so the card settles at a small angle rather than standing on end.",
    "This balance of magnetic dip against the pendulous weight is exactly what gives rise to the compass's turning and acceleration errors.",
  ],
  "insfig-10_03": [
    "This side view shows the pendulous suspension: the magnet and card hang below the pivot point. Because the pivot is above the centre of gravity, the assembly behaves like a pendulum.",
    "In steady level flight gravity acts straight down through the pivot and the card sits level. But any tilt caused by the Earth's vertical field (dip) is partly resisted by this pendulous hang.",
    "The downside is that during acceleration or a turn the whole assembly swings like a pendulum, which deflects the card and causes the classic acceleration and turning errors.",
  ],
  "insfig-10_06": [
    "This shows the magnet assembly pivoting about its bearing, with the card free to rotate clockwise or anticlockwise. The east/west arrows show how a sideways force on the low-hung magnet swings the whole card.",
    "During an acceleration or a turn, the inertia of the pendulous magnet acts at its centre of gravity (below the pivot), producing a turning force that rotates the card away from the true heading.",
    "This is the mechanism behind acceleration errors (felt most on east/west headings) and northerly turning error — the card is physically swung off its correct reading.",
  ],

  // ═══ Flight Instruments (A.7.7 — aircraft magnetism) ═══
  "insfig-16_01": [
    "This shows deviation — the error the aircraft's own magnetism causes in the compass. The aircraft's magnetic field pulls the compass needle away from magnetic north, so the compass reads a slightly different heading from the true magnetic one.",
    "Here the magnetic heading is 090 but the compass reads 095, so there is 5° of westerly deviation (the compass reads MORE than magnetic, so the correction is 5°W).",
    "Deviation is listed on a compass-correction card and must be applied, along with variation, to convert between compass, magnetic and true headings.",
  ],
  "insfig-16_02": [
    "This plan view shows the aircraft's 'hard-iron' magnetism — permanent magnetism in the steel parts, represented as little magnets lying along the fore-and-aft and the lateral axes of the aircraft.",
    "The fore-and-aft component mainly causes deviation that changes like a sine of heading (coefficient B); the lateral component causes deviation that changes like a cosine of heading (coefficient C).",
    "Because these magnets are fixed in the airframe, their effect on the compass changes as the aircraft turns, which is why deviation varies with heading.",
  ],
  "insfig-16_03": [
    "This side view shows the vertical hard-iron magnetism (the Z component) and where the compass bowl sits. Vertical magnetism in the airframe, and the change of the Earth's vertical field with the aircraft's attitude, affect the compass.",
    "This vertical component is the source of the deviation that only shows up when the aircraft is banked or pitched, and it contributes to the turning and acceleration errors.",
    "Siting the compass well away from large steel masses and electrical wiring keeps these effects as small as possible.",
  ],
  "insfig-16_04": [
    "This graph shows how deviation changes as the aircraft turns through all headings. The curve is roughly a sine wave: deviation grows to a maximum, falls to zero, reverses and repeats over 360°.",
    "A deviation that follows a sine of heading comes from fore-and-aft magnetism (coefficient B); one that follows a cosine comes from lateral magnetism (coefficient C); a constant offset at all headings is coefficient A.",
    "A compass swing measures the deviation on a series of headings and the coefficients are worked out, so small correction magnets can be adjusted to minimise the error.",
  ],

  // ═══ Flight Instruments (A.7.7 — terrestrial magnetism) ═══
  "insfig-09_02": [
    "This shows the magnetic field of a bar magnet. Invisible field lines leave the north (red/blue) pole, curve round through the surrounding space, and return to the south pole; inside the magnet they run the other way to make a closed loop.",
    "The lines are closest together at the poles, which is where the field is strongest, and spread out in between.",
    "This simple picture matters because the Earth itself behaves like one huge bar magnet, and a compass needle lines up with these field lines.",
  ],
  "insfig-09_03": [
    "This shows how an iron bar is magnetised by 'stroking' it with a permanent magnet, always in the same direction. Each stroke nudges the bar's internal magnetism to line up.",
    "After enough strokes the bar becomes a magnet itself, with its own north and south poles.",
    "This is how soft iron in the airframe can pick up unwanted magnetism — which later shows up as compass deviation that has to be corrected.",
  ],
  "insfig-09_05": [
    "This pictures a magnet as made up of countless tiny 'molecular magnets'. In an unmagnetised piece they point every which way and cancel out; when the piece is magnetised they line up end to end.",
    "With all the little magnets pointing the same way, their north poles add up at one end and their south poles at the other, giving the bar its overall field.",
    "It also explains saturation (no more alignment is possible) and why heat or hammering, which jumble the alignment, can weaken or destroy a magnet.",
  ],
  "insfig-09_06": [
    "This shows the Earth behaving like a giant bar magnet, tilted inside the planet. Its magnetic poles do NOT sit at the geographic (true) poles where the axis of spin comes out.",
    "So the magnetic north pole is offset from true north, and the field lines run between the magnetic poles, crossing the geographical equator at an angle.",
    "Because the magnetic and true poles differ, a compass points to magnetic north, not true north — the gap between them is 'variation'.",
  ],
  "insfig-09_07": [
    "This defines variation. At a point X on the Earth, the direction to the true (geographic) north pole and the direction to the magnetic north pole are different; the angle between the true meridian and the magnetic meridian is the VARIATION at that point.",
    "Variation is named east or west depending on which side of true north the magnetic north lies, and it is different at every place and slowly changes over the years.",
    "A pilot must apply variation to convert between true directions (from the chart) and magnetic directions (from the compass).",
  ],
  "insfig-09_08": [
    "This shows the Earth's magnetic field acting on a freely suspended magnet. The total field T is not horizontal — it dips into the ground. The DIP (angle of dip) is the angle it makes with the horizontal.",
    "The field splits into a horizontal component H (which a compass uses to point north) and a vertical component Z (which tries to tip the needle). The relationships are Z/H = tan(dip), Z = T·sin(dip), H = T·cos(dip).",
    "Only the horizontal component H is useful for direction — so where dip is large, H is small and the compass becomes weak and sluggish.",
  ],
  "insfig-09_09": [
    "This shows how the angle of dip changes with magnetic latitude. Near the magnetic poles the field points almost straight down, so the dip is very steep and the horizontal component is tiny.",
    "At mid-latitudes the dip is moderate, and near the magnetic equator the field is almost horizontal, so the dip is near zero and the horizontal component is at its strongest.",
    "This is why a direct-reading compass works well near the equator but becomes unreliable at high magnetic latitudes, where there is almost no horizontal field to align with.",
  ],

  // ═══ Flight Instruments (A.7.1 — air data computer) ═══
  "insfig-08_01": [
    "This shows the air-data system built around an air data computer (ADC). Into the ADC go the raw inputs: pitot pressure, static pressure, the total-temperature sensor and a weight-on-wheels signal.",
    "The ADC works these into every derived quantity and sends them out electrically to many users — the airspeed/Mach and altitude displays, the EFIS, the transponder, the altitude alerter, the overspeed warning, and the flight-control and navigation computers.",
    "So instead of each instrument having its own pressure capsules, one computer calculates everything once and distributes it, keeping all the displays consistent.",
  ],
  "insfig-08_02": [
    "This shows the heart of an (electromechanical) air data computer. Pitot and static pressures act on a pivoted beam; any imbalance moves a pick-off that produces an electrical signal.",
    "That out-of-balance signal is amplified and drives a two-phase servomotor, which turns a lead screw to re-balance the beam against a precision control spring — a closed loop that always nulls itself.",
    "The servomotor's shaft rotation is then a precise measure of the pressure, and it drives the computer's other sections and output shafts. This servo-follow-up is what gives the ADC its accuracy and lets it feed many systems.",
  ],
  "insfig-08_03": [
    "This shows the redundancy built into a large aircraft's air-data system. Two independent air data computers (No.1 and No.2) are fed from separate pitot and static sources, and there are also standby altimeter and airspeed instruments on a third (standby) static line.",
    "Change-over valves let the static sources be reconfigured if one blocks, and the captain, first officer and standby each have their own lines.",
    "Triplicating the sources and computers means no single blockage or failure can leave the crew without airspeed and altitude — the standby instruments give a direct, independent back-up.",
  ],

  // ═══ Flight Instruments (A.7.1 — machmeter) ═══
  "insfig-07_03": [
    "This graph shows how three speeds behave as true speed increases. Calibrated airspeed (CAS) grows the slowest, true airspeed (TAS) faster, and the Mach number (speed as a fraction of the local speed of sound) is a separate scale again.",
    "They differ because CAS depends on dynamic pressure (which falls off with thinner air), TAS is the real speed through the air, and Mach compares that speed to the speed of sound — which itself changes with temperature.",
    "This is why a fast aircraft needs a MACHMETER as well as an airspeed indicator: near the speed of sound it is the Mach number, not the airspeed, that governs the compressibility limits.",
  ],
  "insfig-07_06": [
    "This is a combined airspeed/Mach indicator. The main pointer reads knots on the outer scale, while a small window shows the Mach number, worked out from the same pitot and static pressures plus an altitude (height) capsule.",
    "A VMO 'barber-pole' pointer, set by the VMO SET knob, shows the maximum operating speed; the pilot keeps the airspeed needle below it.",
    "Putting airspeed, Mach and the speed limit on one face lets the crew respect both the airspeed limit low down and the Mach limit high up from a single instrument.",
  ],
  "insfig-07_07": [
    "This Mach/airspeed indicator uses counters as well as a pointer. One window shows the Mach number (here around 0.7) and another the airspeed in knots (285), while the main pointer sweeps the knots scale.",
    "A striped VMO/MMO cursor marks the never-exceed speed, and a cursor-control knob lets the crew set a reference bug; the pointer must stay below the cursor.",
    "Combining a quick-to-read pointer with exact digital counters, plus the moving limit cursor, gives the crew a clear picture of how close they are to both the airspeed and the Mach limits.",
  ],

  // ═══ Flight Instruments (A.7.1 — VSI) ═══
  "insfig-06_01": [
    "This shows how a vertical speed indicator works, here in level flight. Static pressure feeds the capsule DIRECTLY, but the same static reaches the surrounding case only slowly, through a fine metering choke and capillary.",
    "In level flight the pressure inside and outside the capsule are equal, so there is no difference across it and the pointer sits on zero.",
    "The clever part is the deliberate delay: only when the altitude is changing does a pressure difference build up, and that difference is what will deflect the pointer.",
  ],
  "insfig-06_02": [
    "This shows the VSI in a DESCENT. As the aircraft goes down, the static pressure rises; this new higher pressure reaches the capsule immediately but the case only slowly through the choke.",
    "So the capsule pressure is momentarily higher than the case, the capsule expands, and the linkage drives the pointer to show a rate of descent.",
    "The faster the descent, the bigger the steady pressure difference, so the pointer shows a bigger rate — until the descent stops and the pressures equalise again.",
  ],
  "insfig-06_03": [
    "This shows the VSI in a CLIMB. Now the static pressure is falling; the lower pressure reaches the capsule at once but the case lags behind through the metering choke.",
    "So the case is momentarily at higher pressure than the capsule, the capsule is squeezed, and the pointer swings the other way to show a rate of climb.",
    "Together with the previous two figures this shows the whole principle: the pointer reads the pressure difference set up by the lag, which exists only while altitude is changing.",
  ],
  "insfig-06_04": [
    "This is the face of a vertical speed indicator, calibrated in hundreds of feet per minute, with CLIMB (up) above the zero and DOWN (descent) below it.",
    "The pointer rests at zero in level flight and swings up or down to show the rate of climb or descent.",
    "Note the scale is cramped near zero and more open further out — the VSI is a non-linear instrument, read most accurately away from the centre.",
  ],
  "insfig-06_05": [
    "This is an instantaneous VSI (IVSI). It works like an ordinary VSI (capsule, main metering restriction) but adds small accelerometer 'dashpot' pumps that respond to vertical acceleration.",
    "When the aircraft first pitches into a climb or descent, those pumps instantly create the small pressure change the capsule needs, so the pointer responds AT ONCE instead of after the usual few-second lag.",
    "The IVSI therefore gives an immediate, lag-free indication — but the accelerometers also make it misread briefly during a steep turn (a g-induced error).",
  ],

  // ═══ Flight Instruments (A.7.1 — altimeter) ═══
  "insfig-05_01": [
    "This shows the three altimeter datums and the measurements they give. With the subscale set to QNE/standard 1013 hPa the altimeter reads PRESSURE ALTITUDE / a flight level; set to QNH (sea-level pressure) it reads ALTITUDE above mean sea level; set to QFE (airfield pressure) it reads HEIGHT above the airfield.",
    "The worked example shows how QFE and QNH relate: an elevation of 270 ft is about 10 hPa (270 ÷ 27), so if QFE is 990 hPa then QNH is 990 + 10 = 1000 hPa.",
    "Choosing the right setting is what makes the altimeter read the quantity the pilot wants — height for circuits, altitude for terrain clearance, flight levels for cruising.",
  ],
  "insfig-05_02": [
    "This shows the mechanism of a simple altimeter. Static pressure (A) is fed into the sealed case; an evacuated (partial-vacuum) capsule (B) expands as the aircraft climbs and the surrounding pressure falls.",
    "That expansion is picked up by a linkage (C) and magnified through a quadrant and gear (D), which rotates the pointer (E) around the scale.",
    "A simple altimeter has just one capsule and no barometric subscale, so it can only be set on the ground — fine for basic use but not accurate enough for flight-level flying.",
  ],
  "insfig-05_03": [
    "This is a sensitive altimeter. It uses two or three capsules stacked together so a small pressure change gives a larger movement, and a temperature-compensated bimetal spring to cancel the effect of temperature on the mechanism.",
    "A suitable linkage of gears and levers drives several pointers, and a subscale (set by the setting knob) lets the pilot dial in QNH, QFE or 1013 hPa.",
    "The extra capsules and compensation make it far more accurate and readable than the simple type — this is the altimeter used for serious navigation and level flying.",
  ],
  "insfig-05_04": [
    "This is the face of a sensitive (three-pointer) altimeter. Like a clock, a long pointer reads hundreds of feet, a shorter one thousands, and a small one tens of thousands — all over a 0–9 (×100 ft) scale.",
    "A small window shows the barometric subscale (here around 1010–1020 hPa) that the pilot sets to the required pressure datum.",
    "Its weakness is that the three pointers can be misread by 10,000 ft at a glance — the very trap that led to counter-pointer and electronic altimeters.",
  ],
  "insfig-05_06": [
    "This shows the altimeter on a modern electronic flight display (PFD). Instead of a round dial, altitude is shown as a moving vertical TAPE on the right, with the current altitude in a counter box in the middle of the tape.",
    "The number is read directly (no pointers to confuse), the tape shows trend as it scrolls, and the barometric setting (STD / hPa) is shown at the bottom.",
    "Presenting altitude this way removes the three-pointer misreading problem and sits it right beside the attitude and speed for an easy scan.",
  ],
  "insfig-05_07": [
    "This is a servo (electric) altimeter. The capsules still sense static pressure, but instead of driving the pointer directly, their movement is detected electrically by an E-and-I bar inductive pick-off.",
    "The tiny signal is amplified and drives a servo motor and gearbox, which turns the pointers and counters through a worm drive — and also feeds back to re-centre the E/I bar.",
    "Because a powered motor does the work, the servo altimeter has almost no lag and can drive very accurate counters and send altitude data to other systems — the type used on large aircraft.",
  ],
  "insfig-05_08": [
    "This shows the classic pressure error: flying from high pressure to low pressure without resetting the subscale. The altimeter keeps indicating against the old high setting (QNH 1025), but the real 1025 hPa pressure level has sloped down beneath the aircraft.",
    "So the aircraft is lower than the altimeter shows — here a 30 hPa fall (1025 to 995) means about 900 ft of over-read.",
    "This is the origin of the saying 'High to Low (or Hot to Cold), look out below': the altimeter OVER-reads, so true height is less than indicated — a terrain-clearance danger if the setting is not updated.",
  ],
  "insfig-05_09": [
    "This shows what a blocked static line does to the altimeter. With the static source blocked, the pressure trapped in the case stays constant, so the capsule cannot sense the real change.",
    "The result is that the indicated height WILL NOT CHANGE — the altimeter simply freezes at whatever it was reading when the blockage occurred, even as the aircraft climbs or descends.",
    "A frozen altimeter is dangerous because it looks normal; this is why the alternate static source and cross-checks against the other altimeter and the VSI matter.",
  ],

  // ═══ Flight Instruments (A.7.1 — ASI) ═══
  "insfig-04_01": [
    "This shows how an airspeed indicator works. Pitot (total) pressure — dynamic plus static (Dy + S) — is fed INSIDE the capsule, while static pressure (S) alone fills the surrounding case.",
    "The static part cancels out, so the capsule is left responding only to the DYNAMIC pressure (Dy = Pt − Ps). As dynamic pressure rises with speed, the capsule expands, and a system of levers and gears turns that movement into pointer movement on the knots scale.",
    "So the ASI is really a pressure gauge measuring dynamic pressure, which it displays as indicated airspeed.",
  ],
  "insfig-04_02": [
    "This shows the standard ASI colour code. The WHITE arc is the flap operating range, from VS0 (stall, flaps/gear down) to VFE (max flaps-extended speed). The GREEN arc is the normal operating range, from VS1 (clean stall) to VNO (max structural cruising speed).",
    "The YELLOW arc is the caution range (VNO to VNE), to be used only in smooth air, and the RED line is VNE, the never-exceed speed. On a twin, a BLUE line marks VYSE, the best single-engine rate-of-climb speed.",
    "Reading these colours lets a pilot fly within limits at a glance — stay in the green, treat the yellow with care, and never pass the red line.",
  ],

  // ═══ Flight Instruments (A.7.5 — temperature) ═══
  "insfig-03_01": [
    "This shows a bimetallic strip — two different metals (here Invar and brass) bonded together. The two metals expand by different amounts when heated: brass expands a lot, Invar hardly at all.",
    "Because one side grows more than the other, the strip bends when the temperature changes — and the amount it bends is a direct measure of the temperature.",
    "This simple, robust effect is the basis of the direct-reading thermometers used for outside air temperature in light aircraft.",
  ],
  "insfig-03_02": [
    "This is a bimetallic thermometer built as a HELIX (coiled bimetallic strip). One end is fixed at the anchor point inside a metal case; the other end carries the pointer.",
    "As the temperature changes the helix winds or unwinds, rotating the pointer over the scale — coiling the strip into a helix magnifies the small bending into a usable amount of pointer movement.",
    "It needs no electrical power, which is why this type is used as a simple, reliable outside-air-temperature gauge.",
  ],
  "insfig-03_03": [
    "This is a direct-reading bimetallic thermometer installed in the cockpit: the dial pokes through the windscreen or a window pillar so its sensing helix sits in the outside air, and the pilot reads the temperature off the face in °C and °F.",
    "Because the sensor is exposed to the airflow, at speed it reads a little high (ram rise), but for a slow light aircraft it is close enough to the true outside air temperature.",
    "Its simplicity (no power, no wiring to the sensor) makes it ideal for small aircraft.",
  ],
  "insfig-03_04": [
    "This shows a total-air-temperature (TAT) probe for fast aircraft. Air enters the probe, and a right-angle bend makes heavier water droplets and ice particles carry straight on and separate out, so only clean air reaches the sensing element.",
    "Boundary-layer control holes bleed off the slow, skin-affected air so the probe samples the true airflow, and a heating element stops the probe icing — carefully designed so the heat does not corrupt the reading.",
    "The probe measures TAT (the temperature the moving air reaches when brought to rest on the sensor), from which the air-data system works out the static air temperature.",
  ],
  "insfig-03_05": [
    "This is a real TAT probe mounted on the skin of a jet — the small L-shaped (often gold-coloured) sensor you see near the nose of airliners.",
    "It is positioned in clean airflow, standing proud of the boundary layer, so it samples the true oncoming air.",
    "Seeing it installed shows how the construction diagram translates into the small probe that feeds the air-data computers.",
  ],
  "insfig-03_06": [
    "This is an ASPIRATED TAT probe. In flight the aircraft's motion drives air through the probe, but on the ground (or at low speed) there is little airflow, so an ejector uses engine BLEED AIR to suck air past the sensing element.",
    "The bleed air entering the ejector fitting draws a flow out of the probe cavity, keeping air moving over the sensor so it reads correctly even when the aircraft is stationary.",
    "Heating elements prevent icing, and side ports vent the used air. Aspiration ensures an accurate temperature at all speeds, which matters because air-data computations depend on it.",
  ],
  "insfig-03_07": [
    "This graph explains 'ram rise'. Static air temperature (SAT) is the true temperature of the still air. As an aircraft speeds up, bringing the air to rest on a probe heats it, so the temperature the probe would read climbs above SAT.",
    "Total air temperature (TAT) is the full temperature of air brought completely to rest — the maximum. Ram air temperature (RAT) is what is actually measured, a little below TAT because real probes recover only part of the rise (the 'recovery factor').",
    "The gap grows with speed, so at high Mach the ram rise is large (tens of degrees). The crew's SAT is worked back from the measured RAT/TAT and the aircraft's speed.",
  ],
  "insfig-03_08": [
    "This shows the back of a navigation (flight) computer being used to correct airspeed for temperature. In the small window the pilot sets the outside air temperature (here 17°C) against the pressure altitude.",
    "Lining these up applies the density correction so that rectified airspeed (RAS) can be read off as true airspeed (TAS) on the outer scales.",
    "It is the manual way of doing what an air-data computer does electronically — turning indicated/rectified airspeed into true airspeed using temperature and altitude.",
  ],
  "insfig-03_09": [
    "This compares temperatures on the Kelvin (absolute) scale. Absolute zero is 0 K, water freezes at 273 K and boils at 373 K. Aviation calculations use Kelvin because it has no negative numbers.",
    "The example shows a static air temperature (SAT) of 229 K and, after the ram rise from the aircraft's speed, a total air temperature (TAT) of 253 K — the air brought to rest on the probe is 24 K warmer.",
    "Using Kelvin makes the ram-rise and air-density formulas straightforward, since they multiply and divide temperatures directly.",
  ],
  "insfig-03_10": [
    "This shows how temperature changes with altitude in the standard atmosphere (ISA). At mean sea level ISA is +15°C, 1013.25 hPa. Temperature falls steadily with height up to the tropopause.",
    "At about 36,090 ft (11 km) it reaches −56.5°C and then stays constant through the lower stratosphere (shown the same at 20 km), before slowly rising again much higher up (about −44.7°C at 32 km).",
    "These standard figures are the reference every air-data instrument and performance calculation is built on — real conditions are then compared against this ISA model.",
  ],

  // ═══ Flight Instruments (A.7.1 — pitot-static) ═══
  "insfig-02_01": [
    "This shows what the pressure heads sense. Facing straight into the airflow (along the aircraft's longitudinal axis), a forward-facing hole catches TOTAL (pitot) pressure — the still-air pressure plus the 'ram' from the aircraft's speed.",
    "Separate holes set at right angles to the flow sense only the STATIC (atmospheric) pressure — the ambient pressure with no ram effect.",
    "These two pressures are the raw material for the whole air-data system: the altimeter and VSI use static alone, while the airspeed indicator uses the difference between pitot and static.",
  ],
  "insfig-02_02": [
    "This cutaway shows a combined pitot/static head. The forward-facing opening collects pitot (total) pressure down the centre tube, while static slots around the side collect static pressure into a separate passage.",
    "An electric heating element and cable prevent ice from blocking the holes, and small drain holes let any water escape so it cannot collect and give false readings.",
    "Combining both sensors in one probe is neat, but it means a single strike or blockage can affect both pressures — which is why the heater and drains matter and why alternate sources are provided.",
  ],
  "insfig-02_04": [
    "This shows a flush static vent — a small plate with a hole set flush in the fuselage skin, away from the airflow disturbance. It senses static (ambient) pressure without any ram effect.",
    "Mounting it flush and smooth keeps the local airflow undisturbed, so the pressure at the hole is as close as possible to the true free-stream static pressure.",
    "Static vents are usually fitted as a pair, one on each side of the fuselage, so that sideslip or a manoeuvre raising pressure on one side is cancelled by the other.",
  ],
  "insfig-02_05": [
    "This shows pitot and static probes installed under the nose of an aircraft. Several separate heads are mounted clear of the skin so they sit in clean, undisturbed air.",
    "Spacing them apart and positioning them carefully reduces the 'position error' caused by the airframe disturbing the local pressure.",
    "Large aircraft carry multiple independent probes feeding separate systems (captain, first officer, standby) so that one blockage or failure does not deprive everyone of air data.",
  ],
  "insfig-02_06": [
    "This shows a pitot-static system with selector valves. Left and right pitot and static sources feed up to the instruments, and selector valves can choose the NORMAL source or an ALTERNATE one.",
    "If a normal static vent blocks or ices up, the pilot selects the alternate static source (often cabin static) so the altimeter, ASI and VSI keep working.",
    "Providing left/right sources and normal/alternate selection builds in redundancy, so a single blockage does not leave the crew without airspeed or altitude.",
  ],

  // ═══ Flight Instruments (A.7.1 — displays & scales) ═══
  "insfig-01_01": [
    "This is a LINEAR circular scale: the numbers (here Kts × 10) are spaced evenly all the way round, so each degree of pointer movement represents the same change in value.",
    "A linear scale is easy to read accurately because the spacing never changes — equal gaps mean equal amounts.",
    "Most instruments aim for a linear scale where they can, because it makes the needle position directly proportional to the quantity being measured.",
  ],
  "insfig-01_02": [
    "This is a NON-LINEAR circular scale (a rate-of-climb dial). Notice the numbers are bunched together near the top and bottom and spread out in the middle — equal pointer movements do NOT represent equal changes everywhere.",
    "This happens when the instrument's mechanism responds unevenly, so the scale has to be cramped at the ends and open in the middle.",
    "A non-linear scale is read most accurately in its open, spread-out portion, and least accurately where the markings crowd together.",
  ],
  "insfig-01_03": [
    "This airspeed indicator combines a pointer on a circular scale with a small digital drum (counter) in a window. The pointer gives the quick visual trend; the drum gives a precise number.",
    "Pairing a pointer with a counter plays to the strengths of both: the eye reads rate and trend from the needle's position, while the exact value is read off the drum.",
    "This 'pointer plus counter' idea reappears on altimeters and other instruments where both a quick glance and an exact figure are useful.",
  ],
  "insfig-01_04": [
    "This ASI uses a pointer on the main dial together with a small counter window near the top. The pointer sweeps the 0–90 scale while the counter shows the higher-order digits.",
    "Splitting the display this way lets one instrument cover a wide range without a cluttered scale: the pointer handles the fine detail, the counter the coarse value.",
    "It is another example of combining analogue (pointer) and digital (counter) presentation on a single face.",
  ],
  "insfig-01_05": [
    "This is a revolution counter (RPM gauge), shown reading in per-cent RPM. It uses two pointers, like a clock — a long one for the fine value and a short one for the coarse value.",
    "Two concentric pointers let a single small dial show a large range precisely: the small pointer counts the big steps, the large pointer the fine ones.",
    "Reading it means checking the small (coarse) pointer first, then the large (fine) pointer — exactly as you read hours then minutes on a clock.",
  ],
  "insfig-01_07": [
    "This is the classic 'basic six' instrument grouping found in older cockpits: airspeed indicator, attitude (gyro horizon) and altimeter across the top, with turn-and-slip, heading (course) indicator and vertical speed below.",
    "The six are arranged so the most important flying instruments sit together in front of the pilot, making a quick, repeatable scan possible.",
    "This standard grouping means a pilot can move between aircraft types and still find each instrument roughly where they expect it.",
  ],
  "insfig-01_08": [
    "This shows the 'basic T' arrangement, the modern standardised layout. The attitude indicator sits top-centre, with airspeed to its left and altimeter to its right, and the heading indicator directly below — the four forming a 'T'.",
    "These four are the primary instruments, so putting them in a fixed T lets the pilot scan them efficiently, always returning to attitude in the centre.",
    "The other instruments (here machmeter, HSI and rate-of-climb) fill in around the T. This layout is now required on certificated panels so it transfers between aircraft.",
  ],
  "insfig-01_09": [
    "This is a real light-twin instrument panel (a Piper Seneca), showing the basic-six/basic-T instruments fitted in a working cockpit: airspeed, attitude and altimeter on top, turn coordinator, HSI and direction indicator below.",
    "Seeing them installed shows how the standard grouping translates from the textbook diagram to a real aircraft.",
    "The surrounding placards (crosswind component, calibration notes) and extra gauges are typical of a real panel built around the standard instrument core.",
  ],
  "insfig-01_10": [
    "This is a traditional analogue altimeter. Its pointers move over a circular scale to show altitude, and a small window carries the barometric subscale where the pilot sets the pressure datum (e.g. QNH).",
    "Everything is mechanical: the needle position is driven directly by the aneroid capsules inside, giving a continuous, familiar 'clock-face' read-out.",
    "Analogue presentation like this is quick to read for trend, but the exact figure takes more care — which is why counter-pointer and digital altimeters were later developed.",
  ],
  "insfig-01_11": [
    "This display combines a digital counter with an analogue pointer on the same face — a 'counter-pointer' instrument. The digits give the precise value while the moving element shows rate and trend.",
    "Combining the two formats gives the best of both: an exact number to read and a moving indication to catch a trend or a rapid change at a glance.",
    "This hybrid presentation was a step on the way from pure analogue dials to today's fully electronic displays.",
  ],
  "insfig-01_12": [
    "This is a traditional analogue flight deck (a classic jet), where every parameter has its own round mechanical instrument. The panel is a dense array of individual dials.",
    "Each instrument does one job, so the crew must scan many separate gauges and mentally combine them to build the overall picture.",
    "This is the arrangement that electronic (glass) displays later replaced, gathering the same information onto a few screens.",
  ],
  "insfig-01_13": [
    "This is a modern 'glass' flight deck (a Boeing 787), where large electronic screens replace the rows of individual dials. The same air-data, attitude and navigation information is drawn on the displays.",
    "Presenting everything on a few reconfigurable screens cuts clutter, lets information be shown only when relevant, and allows colour coding and alerts.",
    "The flying information (attitude, speed, altitude) is still arranged in the familiar basic-T pattern on the screen, so the scan carries over from analogue panels.",
  ],
  "insfig-01_14": [
    "This is an electronic (glass) panel in a light aircraft, showing that glass-cockpit technology is no longer just for airliners. A primary flight display and a multi-function display replace the traditional dials.",
    "Even in a small aircraft, the screen gathers airspeed, attitude, altitude and navigation into one tidy, colour-coded picture.",
    "The layout keeps the basic-T arrangement of speed, attitude and altitude so a pilot trained on steam gauges can adapt quickly.",
  ],
  "insfig-01_15": [
    "This strip of engine gauges shows the use of coloured operating ranges. A GREEN band marks the normal operating range, a YELLOW (amber) band a caution range, and a RED line or band a limit that must not be exceeded.",
    "The colours let the crew judge a value at a glance without reading the number: a needle in the green is fine, in the yellow needs attention, and at the red is a limit.",
    "This colour convention (green normal, amber caution, red limit/danger) is used on instruments throughout the aircraft, not just the engine gauges.",
  ],


  // ═══ Human Performance (A.6.1 — physiology) ═══
  "hpfig-05": [
    "This cutaway shows the heart, the pump that drives the blood. It has four chambers: two upper atria that receive blood, and two lower ventricles that pump it out. The right side handles oxygen-poor blood, the left side oxygen-rich blood.",
    "Blood returning from the body enters the right atrium, is pumped by the right ventricle to the lungs, comes back to the left atrium, and is driven by the powerful left ventricle out through the aorta to the whole body.",
    "The heart's own muscle is fed by the coronary arteries. Because every tissue depends on this circulation for its oxygen, anything that weakens the heart or the blood directly limits what a pilot's body can tolerate.",
  ],
  "hpfig-06": [
    "This shows the two circulations working as one loop. The right heart drives the PULMONARY circulation (blue) — blood out to the lungs to collect oxygen and dump carbon dioxide — which returns, now oxygen-rich (red), to the left heart.",
    "The left heart then drives the SYSTEMIC circulation (red) out to the head, organs, muscles and legs, where the oxygen is used; the now oxygen-poor blood (blue) returns to the right heart to start again.",
    "So the lungs and the body sit on two halves of the same circuit. This is why good lungs and good circulation together determine how much oxygen reaches the brain — the organ least tolerant of being starved of it.",
  ],
  "hpfig-07": [
    "This shows what blood pressure means. As the heart contracts (beats), it pushes a surge of pressure through the arteries — the peak is the SYSTOLIC pressure (about 120 mmHg in a healthy adult).",
    "Between beats, when the heart relaxes and refills, the pressure falls to its lowest value — the DIASTOLIC pressure (about 80 mmHg), the 'permanent' background pressure the arteries always hold.",
    "Blood pressure is written as systolic over diastolic (120/80). It must stay high enough to push blood up to the brain — which is why rapid G-forces or standing suddenly can briefly drop brain blood flow and cause grey-out.",
  ],
  "hpfig-08": [
    "This shows how we smell. Air drawn in through the nose carries scent molecules up past the nasal sinuses to a small patch high in the nose containing the olfactory (smell) sensors.",
    "There, tiny sensory cells sit in a film of moisture; scent molecules dissolve and trigger them, and their nerve fibres pass the signal through the olfactory bulb straight to the brain.",
    "For a pilot, smell is an early warning — of smoke, fuel or electrical burning — but it tires quickly (you stop noticing a constant smell), so a faint smell should never be ignored just because it fades.",
  ],
  "hpfig-09": [
    "This shows the respiratory system. Air passes the voice box and down the windpipe (trachea), which branches into the two bronchi, then into ever-smaller bronchioles, ending in millions of tiny air sacs called alveoli.",
    "Each alveolus is wrapped in capillaries; across their thin shared wall, oxygen passes into the blood and carbon dioxide passes out. The diaphragm and the rib muscles do the breathing by expanding and squeezing the chest.",
    "The huge combined area of the alveoli is what lets enough oxygen cross into the blood. At altitude the outside air is thinner, so less oxygen crosses here — the root cause of hypoxia.",
  ],
  "hpfig-14": [
    "This is the structure of the eye. Light enters through the clear cornea (which does most of the focusing), passes the pupil and the lens (which fine-tunes focus), and is projected onto the retina at the back.",
    "The fovea is the tiny central spot of sharpest, colour vision; the rest of the retina gives peripheral and low-light vision. The blind spot is where the optic nerve and blood vessels leave the eye — there are no light sensors there.",
    "Knowing this explains a pilot's vision limits: fine detail only in the centre, a natural blind spot, and a lens that must keep accommodating — all of which affect how (and how reliably) traffic and the runway are seen.",
  ],
  "hpfig-15": [
    "This graph shows that sharp vision exists only in a tiny central area. At the fovea (0°) visual acuity is at its best (6/6, or 20/20); just a few degrees to either side it falls off very steeply.",
    "By the edges of vision (50–60° off-centre) acuity is down to about 6/60 — good only for detecting movement, not detail.",
    "The practical lesson: you can only read detail in the small central cone, so to search the sky you must move your eyes in small steps and look DIRECTLY at each sector — a glance 'out of the corner of the eye' will miss distant traffic.",
  ],
  "hpfig-16": [
    "This cockpit view shows the see-and-avoid problem. Distant traffic (the aircraft on the right) is a tiny image that can easily fall on the eye's natural blind spot or simply be too small to notice against a plain background.",
    "With nothing to focus on — an empty sky or haze — the relaxed eye focuses only a metre or two ahead (empty-field myopia), so far-off traffic is not even in focus. The crosshair marks where the eye should be deliberately aimed.",
    "The defence is an active, systematic scan: move the eyes in small steps, pause to focus on each block of sky, and occasionally focus on a distant object (a cloud, a wingtip) to reset the eyes for distance.",
  ],
  "hpfig-17": [
    "This explains the two common focusing faults. In LONG sight (hypermetropia) the eyeball is too short, so the image of a near object would form behind the retina — near objects are blurred; it is corrected with a converging (convex) lens.",
    "In SHORT sight (myopia) the eyeball is too long, so the image of a distant object forms in front of the retina — distant objects are blurred; it is corrected with a diverging (concave) lens.",
    "A pilot's vision standard matters because reading instruments (near) and spotting traffic (far) both have to be sharp; this is why corrective lenses, when required, must be worn and a spare pair carried.",
  ],
  "hpfig-38": [
    "This shows why an aircraft on a collision course is so hard to see. Because it stays on a constant bearing, its image hardly grows at first: 1° across 1.5 seconds before impact, only 2° at 0.75 s.",
    "Then in the final fraction of a second it 'blossoms' — 4° at 0.38 s, then 'very big indeed' at 0.1 s — far too late to react. A constant-bearing target also appears stationary in the windscreen, so the eye is not drawn to it.",
    "The lesson for see-and-avoid: traffic that is NOT moving across your windscreen is the dangerous one, and you cannot rely on it 'growing' in time — a disciplined scan and a lookout for stationary dots are essential.",
  ],
  "hpfig-31": [
    "This shows a false-horizon illusion. A long sloping cloud bank can be mistaken for the real horizon; the pilot lines the aircraft up with it and ends up flying with a wing low or the nose mis-set relative to the TRUE horizon near the ground.",
    "The eye naturally takes the biggest, strongest line in view as 'level', and a tilted cloud, coastline or line of lights can easily win over the faint true horizon.",
    "The cure is to cross-check the attitude indicator: when the outside references are unreliable (sloping cloud, night, haze) the instruments, not the eyes, define which way is level.",
  ],
  "hpfig-32": [
    "This shows how a pilot judges the approach using the angle between the horizon and the aiming point. The eye measures the angle θ down from the horizon to the spot on the ground that is not moving in the windscreen — the aiming point.",
    "If the approach angle is correct, that aiming point stays fixed in the window; if the aircraft goes high, the aiming point appears to move down, and if it goes low, it moves up.",
    "This angular judgement is how a visual approach is flown, but it can be fooled by unusual runway slope, width or terrain — which is why the following illusions matter.",
  ],
  "hpfig-33": [
    "This shows runway-slope illusions. A DOWN-sloping runway makes the aircraft look lower than it really is, so the pilot tends to fly a HIGHER-than-normal approach (and may land long or fast).",
    "An UP-sloping runway does the opposite: it makes the aircraft look higher than it is, tempting the pilot to fly a LOWER approach — dangerously close to obstacles and the ground.",
    "Knowing a runway's slope in advance, and backing up the visual picture with the glidepath (PAPI/VASI) and the instruments, protects against being fooled.",
  ],
  "hpfig-36": [
    "This distinguishes two points on the approach. The visual AIMING point is the spot that stays still in the windscreen — where the aircraft would touch if the descent continued unflared. The TOUCHDOWN point is further on, where the wheels actually meet the runway after the flare.",
    "A pilot aims at the fixed aiming point to hold a steady approach path, then rounds out (flares) so the aircraft floats on to the touchdown point beyond it.",
    "Confusing the two, or misjudging them on an unusually sloped or sized runway, leads to undershooting or overshooting — a common cause of approach-and-landing errors.",
  ],
  "hpfig-39": [
    "This shows how rain on the windscreen deceives the eye. A film or layer of water acts like a prism, bending the light coming from the runway as it passes through the screen to the pilot's eye.",
    "The brain assumes light travels in a straight line, so it imagines the runway to be where the straight dashed line points — LOWER and FURTHER away than it really is.",
    "Believing the runway is low and far, the pilot may push down and approach too low. The defence is to expect this in heavy rain and trust the glidepath and instruments rather than the wet-windscreen picture.",
  ],
  "hpfig-10": [
    "This shows the structure of the ear in three parts. The OUTER ear (pinna and ear canal) funnels sound to the eardrum. The MIDDLE ear's three tiny bones (ossicles — malleus, incus, stapes) pass the eardrum's vibration on to the oval window.",
    "The INNER ear contains the cochlea, which turns vibration into nerve signals for hearing, and the semicircular canals, which sense movement. The Eustachian tube links the middle ear to the throat to equalise pressure.",
    "The Eustachian tube is why the ears 'pop' on climb and descent; if it is blocked (a cold), pressure cannot equalise and painful ear barotrauma results — worst on the descent.",
  ],
  "hpfig-11": [
    "This shows the vestibular apparatus — the inner-ear balance organs. The three semicircular canals, set at right angles, each end in a swelling (the ampulla) containing a jelly flap (the cupula) that senses rotation.",
    "The utricle and saccule contain maculae — patches of sensory hairs topped with tiny chalk granules (otoliths) that sense linear acceleration and the pull of gravity (which way is down).",
    "Together these tell the brain how the head is moving and tilting. They work well on the ground but are easily fooled in flight, where sustained accelerations and turns produce false sensations.",
  ],
  "hpfig-12": [
    "This shows how the two kinds of balance sensor work. In a MACULA, the heavy otoliths rest on sensory hairs; when the head tilts or the body speeds up or slows down, the otoliths drag on the hairs, which signal the movement to the brain.",
    "In a SEMICIRCULAR CANAL, a turn makes the fluid (endolymph) lag behind, apparently flowing the opposite way and bending the cupula, which stimulates the hair cells.",
    "The weakness is that both respond to CHANGE: in a steady turn the fluid catches up and the sensation fades, so the brain can wrongly feel 'straight and level' while still turning — the basis of spatial disorientation.",
  ],
  "hpfig-13": [
    "This shows how the semicircular canals cause disorientation (the 'leans'). (A) Straight and level, the fluid is still and the sensation is correct. (B) As a roll begins, the fluid lags and bends the sense hairs — correctly signalling rotation.",
    "(C) In a prolonged, constant-rate turn the fluid catches up and the hairs return upright, giving a FALSE sensation of no rotation — the pilot feels wings-level while still turning. (D) When the turn is stopped, the fluid over-runs, bending the hairs the other way, giving a false sensation of turning the OPPOSITE way.",
    "This is why a pilot can roll level yet still feel they are banked (and be tempted to re-bank). The only cure is to believe the attitude indicator, not the seat-of-the-pants feeling.",
  ],
  "hpfig-37": [
    "This shows the somatogravic illusion. The inner-ear otoliths cannot tell gravity apart from acceleration — they only feel the combined (resultant) force. In steady flight that force is simply the aircraft's weight, straight down.",
    "During a strong forward acceleration (e.g. a go-around or take-off into the dark), an inertial force acts backwards; combined with weight, the resultant tilts back, and the brain reads this as the whole aircraft being pitched NOSE-UP.",
    "The danger is the instinct to push the nose DOWN to 'correct' a climb that isn't happening — flying into the ground. The defence is to ignore the sensation and fly the attitude and performance instruments.",
  ],

  // ═══ Human Performance (A.6.2 — health) ═══
  "hpfig-40": [
    "This shows the body's natural daily sleep pattern over several days. Left to itself, the body clock drives one long block of sleep at roughly the same time each night (here about 2400 to 08).",
    "This daily rhythm is set by light, routine and the internal clock, and it strongly 'wants' to sleep at night and be awake by day.",
    "Shift work and time-zone changes fight this rhythm, which is why a pilot cannot simply sleep on demand at any hour — the body resists sleeping when the clock says 'day'.",
  ],
  "hpfig-41": [
    "This shows that body temperature follows a daily (circadian) rhythm, swinging only about one degree but on a reliable cycle. It is LOWEST in the very early morning (around 0500) and HIGHEST in the late afternoon/early evening.",
    "Mental and physical performance track this curve closely — we are at our worst around the 0400–0600 temperature trough and sharpest in the late afternoon.",
    "This is why errors and microsleeps are most likely in the early hours, and why a long night flight or an early report time puts a crew at their natural low point.",
  ],
  "hpfig-42": [
    "This shows the structure of a night's sleep. Sleep is not uniform — it cycles about every 90 minutes through light sleep (stages 1–2), deep 'slow-wave' sleep (stages 3–4) and periods of REM (dreaming) sleep.",
    "Deep slow-wave sleep dominates the early cycles and restores the BODY; REM periods lengthen towards morning and consolidate MEMORY and learning.",
    "Because the restorative and the memory stages come at different times of the night, broken or shortened sleep (common with shift work) robs a pilot of one or both — and only real sleep, not caffeine, can replace it.",
  ],
  "hpfig-43": [
    "This shows why jet lag depends on direction. Flying WESTWARD lengthens the day — you chase the sun — so the body clock only has to delay, which it does fairly easily (here New York gives about 4 hours of jet lag).",
    "Flying EASTWARD shortens the day and forces the clock to jump FORWARD, which the body finds much harder, giving more severe and longer-lasting jet lag (about 6 hours here).",
    "The rule of thumb: the body re-synchronises only about one hour per day, and eastward is worse than westward — so crews need planned rest to recover before performance returns to normal.",
  ],
  "hpfig-19": [
    "This models how stress arises. The brain compares the PERCEIVED demand of a task with the PERCEIVED ability to cope; the evaluation of that gap is what produces stress — not the raw situation itself.",
    "Stress then drives both a psychological response (worry, narrowed attention) and a physiological response (adrenaline, heart rate), which together affect performance; the result feeds back and changes the next appraisal.",
    "The key exam point: because it is about PERCEPTION, two pilots in the same situation feel different stress, and training (raising perceived ability) is one of the best ways to reduce it.",
  ],
  "hpfig-20": [
    "This is the arousal–performance curve, an inverted U. With too LITTLE arousal (bored, under-loaded) performance is poor — attention wanders and things are missed.",
    "Performance peaks at an OPTIMAL, moderate level of arousal, where the pilot is alert and engaged. Push arousal too HIGH (overload, panic) and performance collapses again as attention narrows and the pilot fixates.",
    "The practical message: some stress is good and necessary, but both extremes are dangerous — the aim is to manage workload to stay near the top of the curve, not to remove all pressure.",
  ],
  "hpfig-21": [
    "This shows that stress comes from many sources at once. Pressures from work (workload, lack of training, rostering, noise, vibration) pile in from one side, and life pressures (money, domestic and health problems, bereavement, moving house) from the other.",
    "These stressors ADD UP: several small ones together can overwhelm a person just as much as one big crisis, and stress carried from home follows the pilot into the cockpit.",
    "Recognising the full list matters because managing stress means spotting and reducing the load wherever it comes from — and knowing when the total has grown too high to fly safely.",
  ],
  "hpfig-18": [
    "This shows the digestive system — the tract that turns food into usable energy. Food passes down the oesophagus to the stomach, then through the small intestine (duodenum and ileum) where most absorption happens, and finally the large intestine.",
    "The liver, gall bladder and pancreas add digestive juices along the way. Gas is produced as food is broken down, and this gas expands as cabin pressure falls with altitude.",
    "For a pilot this matters two ways: an upset gut (gastro-enteritis) is a leading cause of in-flight incapacitation, and trapped gas expanding on the climb causes abdominal discomfort — made worse by fizzy drinks and gas-forming foods before flight.",
  ],

  // ═══ Human Performance (A.6.3 — psychology) ═══
  "hpfig-24": [
    "This is the information-processing model of how the mind handles flying. Stimuli arrive at the senses and are held briefly in sensory stores; an attention mechanism selects what to deal with, and perception makes sense of it.",
    "A central decision-maker then decides what to do, drawing on short-term (working) memory and long-term memory, and sends commands to motor programmes that produce the actions. Feedback from the result loops back to the start.",
    "The model explains human limits: attention and working memory are the bottlenecks, so overloading them (too much at once) is where errors creep in — and why good cockpit design and workload management matter.",
  ],
  "hpfig-28": [
    "These are geometric optical illusions, which show that perception is an interpretation, not a direct readout. In each pair the brain is tricked into seeing lengths or sizes wrongly — for example two identical lines look different because of the arrowheads or converging lines around them.",
    "The context (surrounding lines, perspective cues) changes how the brain judges size and length, even when a ruler proves the shapes are identical.",
    "The lesson for flight: the eyes can be systematically fooled by the surroundings, so a pilot must be aware that a confident visual impression (of height, distance or slope) can simply be wrong.",
  ],
  "hpfig-29": [
    "These are 'impossible figures' — drawings that look like solid objects at first glance but cannot actually exist, such as a triangle whose three corners each look correct yet can never join up in three dimensions.",
    "They work because the brain builds a 3-D interpretation from small local cues without checking the whole, and only on closer study does the contradiction appear.",
    "The point for pilots is the same as the other illusions: the brain jumps to a confident 'answer' from incomplete information, so a first impression needs cross-checking before it is trusted.",
  ],
  "hpfig-25": [
    "This is an expectation (set) illusion. Most people read the sign as 'BIRD IN THE HAND' and completely miss that the word 'THE' is written twice.",
    "It happens because the brain reads what it EXPECTS to see rather than what is actually there — a powerful shortcut that usually helps but sometimes hides the obvious.",
    "In the cockpit the same effect makes a pilot 'read back' the clearance or checklist they expected, not the one actually given — which is why deliberate, careful reading and cross-checking matter so much.",
  ],
  "hpfig-49": [
    "This shows the basic 'T' arrangement of the primary flight instruments: the attitude indicator on top centre, with the airspeed indicator to its left and the altimeter to its right, and the direction indicator below.",
    "This standard layout lets a pilot build an efficient SCAN — eyes returning again and again to the attitude indicator in the middle, checking each surrounding instrument in turn.",
    "A consistent scan pattern keeps the whole picture updated and stops the pilot fixating on one instrument; the standard 'T' means the scan transfers from aircraft to aircraft.",
  ],
  "hpfig-50": [
    "This is a classic three-pointer (plus drum) altimeter reading 2230 ft. Its danger is that the small pointer (×10 000 ft) and the large pointer (×100 ft) are easily confused, so an altitude can be misread by 10 000 ft.",
    "This is a 'design-induced error': the instrument itself invites mistakes, especially under workload or fatigue, and such misreadings have caused accidents.",
    "It illustrates why display design matters — later counter/drum and electronic altimeters present the number directly to remove this trap.",
  ],
  "hpfig-51": [
    "This is a modern glass-cockpit primary flight display (PFD). It gathers the information that used to be spread over many dials onto one screen: the attitude in the centre, a speed tape on the left, an altitude and vertical-speed tape on the right.",
    "Presenting everything together, in colour and in one place, reduces the scanning and mental effort compared with separate round dials.",
    "But it changes the human-factors challenge: the pilot must understand the display's modes and symbols and guard against 'automation complacency' — trusting the screen without cross-checking.",
  ],
  "hpfig-52": [
    "This shows the power of pattern recognition in monitoring. A panel of identical gauges all reading the same way forms an easy-to-read PATTERN; the one gauge that is out of line (here one pointer at a different angle) jumps out instantly.",
    "The matching set of engine instruments, and the power levers lined up below, let the crew spot an abnormal engine at a glance rather than reading each value.",
    "This is why instruments are grouped and aligned so a normal state makes a tidy pattern — the eye detects the break in the pattern far faster than it reads numbers.",
  ],
  "hpfig-01": [
    "This chart tracks world airline fatal accidents and the number of fatalities over about a decade. Both lines stay low and, against the huge growth in flying, the trend shows aviation becoming steadily safer.",
    "The numbers are small because engineering and procedures have removed most mechanical causes of accidents.",
    "This sets up the central point of human-factors study: with machines now so reliable, the majority of remaining accidents come down to human performance — which is what this subject sets out to improve.",
  ],
  "hpfig-03": [
    "This pie chart shows what actually causes accidents today. Human-factor errors account for the large majority — about 73% — far outweighing mechanical failure, weather or ATC.",
    "In other words, roughly three out of four accidents trace back not to a broken part but to a human decision, perception or action.",
    "This single figure is the justification for the whole Human Performance subject: the biggest safety gains now come from understanding and reducing human error, not from building better machines.",
  ],
  "hpfig-04": [
    "This is Reason's 'Swiss-cheese' model of how accidents happen. Each slice is a layer of defence (procedures, checks, training, equipment). Each layer has holes — latent weaknesses and active errors — that open and close over time.",
    "Normally a hazard is stopped by one of the layers. An accident occurs only on the rare occasion when the holes in EVERY layer line up, letting the hazard pass straight through to cause harm.",
    "The lesson is that accidents are rarely one person's single mistake; they are a chain through many weakened defences — so safety means strengthening every layer, not just blaming the last person in the chain.",
  ],
  "hpfig-54": [
    "This uses a brick-wall analogy for error tolerance. In a well-designed ('protected') system the bricks overlap, so a single faulty brick (an error) is contained and the wall still stands.",
    "In a poorly designed ('vulnerable') system the joints line up, so one bad brick can crack straight through and weaken the whole structure.",
    "The message for operations: systems and procedures should be designed so that an inevitable human error is caught and absorbed, rather than being allowed to bring the whole operation down.",
  ],
  "hpfig-55": [
    "This shows design-induced error from inconsistent controls. Three similar altimeter subscale knobs are turned the same way, yet because the displays are not standardised the result is 'decrease, decrease, increase' — the same action gives opposite effects.",
    "When a control's direction of movement does not reliably match the expected ('natural') direction of the display, the operator is set up to make mistakes, especially under stress.",
    "Good ergonomics obey population stereotypes — up/clockwise means 'more' — so that habits learned on one device transfer safely to the next.",
  ],
  "hpfig-26": [
    "This is Maslow's hierarchy of needs. The base holds the physiological needs (hunger, thirst, oxygen); above them come safety and security, then belonging and affection, then self-esteem, and at the top self-fulfilment.",
    "The idea is that lower needs must be reasonably satisfied before the higher ones motivate behaviour — a cold, frightened or exhausted person is driven by those needs, not by higher goals.",
    "For crews it is a reminder that basic needs (rest, food, feeling safe) underlie motivation and performance: a pilot whose basic needs are unmet will not perform at their best however skilled.",
  ],
  "hpfig-27": [
    "This models motivation. The value a person places on a reward and their expectation of getting it combine into the 'reward utility', which decides how much EFFORT they put in.",
    "That effort, together with the person's natural abilities and learned skills, produces the performance achieved — which brings intrinsic rewards (satisfaction) and extrinsic rewards (pay, recognition).",
    "The point is that effort is not automatic: people apply themselves when they believe the reward is both worthwhile and attainable — which is why fair, achievable goals motivate better than impossible or meaningless ones.",
  ],
  "hpfig-44": [
    "This shows the three classic body types (somatotypes): the lean ectomorph, the rounded endomorph, and the muscular mesomorph.",
    "Early theories tried to link these body shapes to personality, but the link is weak and unreliable — the figure is really a caution against judging people (or crew) by appearance.",
    "The useful point for CRM is that individuals differ physically and psychologically, and stereotyping a colleague by their build or looks is a poor and misleading basis for working together.",
  ],
  "hpfig-45": [
    "This is Eysenck's map of personality, using two axes. One runs from INTROVERSION to EXTROVERSION; the other from STABLE to anxious (neurotic).",
    "The four quadrants give broad types — for example a stable extrovert is responsive and easy-going, while an anxious introvert is sober and pessimistic.",
    "The value for crews is self-awareness and understanding others: knowing roughly where you and your colleagues sit helps anticipate how each will react under pressure and communicate better as a team.",
  ],
  "hpfig-46": [
    "This leadership grid plots two concerns: how much a leader is GOAL-directed (getting the task done) against how much they are PERSON-directed (caring for the people).",
    "A good captain needs BOTH — high on task and high on people — rather than driving the task while ignoring the crew, or being popular while the job slips.",
    "The grid is a tool for thinking about leadership style: the most effective style flexes with the situation but keeps both the mission and the team in view.",
  ],
  "hpfig-47": [
    "This shows the cockpit authority gradient — the balance of power between captain and first officer. The AUTOCRATIC cockpit has too steep a gradient: the captain dominates and the first officer is reluctant to speak up.",
    "The LAISSEZ-FAIRE cockpit has almost no gradient: no one is clearly in charge, so monitoring and decisions fall through the gaps. The SYNERGISTIC cockpit (the ideal) has a moderate gradient — the captain leads, but the first officer is encouraged to contribute and challenge.",
    "The accident record shows both extremes are dangerous; CRM aims for the synergistic middle, where the team's combined performance exceeds that of any individual.",
  ],
  "hpfig-48": [
    "This is the SHELL model, a framework for human factors. The central L is Liveware — the human being — and the model studies how well that person fits with the parts around them.",
    "Those parts are Software (procedures, checklists, symbology), Hardware (controls, displays, seats), Environment (noise, light, weather, time pressure) and the other Liveware (other people — crew, ATC).",
    "The ragged edges show that each interface must be matched to human capabilities; a mismatch at any edge (confusing procedure, awkward control, poor communication) is where human error is bred.",
  ],


  // ─── Airframes — Fuel Systems (A.1.2) ───
  "atgfig-ch16_fig_01": [
    "This is a gravity-feed fuel system, used on high-wing light aircraft. Fuel sits in a tank in each wing, high above the engine, so it simply flows down to the engine under its own weight — no pump is needed.",
    "Each tank has a filler cap and a vent (so air can replace the fuel used), and the two tanks are joined by an interconnect vent to keep them balanced. Fuel passes a finger screen, then a fuel shut-off valve, then a main line strainer with a quick-drain valve before reaching the carburettor.",
    "Water and sediment collect at the lowest points, so there are sump drain plugs and a quick-drain at the strainer for the pre-flight water check. An engine primer squirts fuel straight to the intake manifold to help starting.",
  ],
  "atgfig-ch16_fig_02": [
    "This is a pumped fuel system for a low-wing light aircraft, where the tanks are below the engine so gravity cannot do the job. An engine-driven fuel pump supplies the engine in flight, backed up by an electric fuel pump (used for start, take-off, landing and as a standby).",
    "A fuel tank selector valve lets the pilot draw from the left or right main tank (or off). The fuel passes a strainer on its way to the carburettor; a priming pump, throttle and mixture control complete the engine side.",
    "The instruments show left and right fuel quantity (from tank level sensors) plus fuel pressure, oil temperature and oil pressure, so the pilot can confirm the system is delivering fuel correctly.",
  ],
  "atgfig-ch16_fig_04": [
    "This is a modern twin-engine (ETOPS) jet fuel system. Each wing holds a main tank with two AC boost pumps (a forward and an aft pump) that push fuel through the engine fuel manifold, past a spar valve and the engine fuel shut-off valve, to its engine.",
    "A cross-feed valve in the middle lets either tank feed either engine — essential for ETOPS, where an engine must keep running on the good tank's fuel. A centre tank with its own AC pumps feeds first (it is used up before the wing tanks), and a DC fuel pump gives a back-up and feeds the APU through the APU isolation and shut-off valves.",
    "Non-return (check) valves stop fuel flowing backwards, and the spar valves (at the wing root) give a fireproof shut-off right where the fuel leaves the tank for the engine.",
  ],
  "atgfig-ch16_fig_05": [
    "This shows a representative large-jet fuel system with several tanks. Each tank has boost pumps (P) and the centre/stabiliser tanks also have transfer arrangements. A refuel & jettison gallery runs across the aircraft.",
    "Cross-feed valves and a fuel-transfer cross-feed valve let fuel be moved side to side and fed to any engine, while inter-engine and fuel shut-off valves control the supply to each engine. A stabiliser (tail trim) tank is used to shift the centre of gravity for trim and can be transferred forward.",
    "The same gallery is used for pressure refuelling on the ground and for jettison (fuel dumping) in flight, so the aircraft can quickly reduce weight to a safe landing weight in an emergency.",
  ],

  // ─── Airframes — Fire Detection & Protection (A.1.6) ───
  "atgfig-ch15_fig_01": [
    "This is the fire (combustion) triangle. A fire needs three things at once: heat (a source of ignition), fuel (something to burn) and oxygen (to support the burning).",
    "The practical point for firefighting is that removing any one side puts the fire out. An aircraft fire drill does exactly this: shutting off the fuel removes the fuel side, and discharging an extinguishing agent smothers or removes the oxygen side.",
    "Understanding the triangle explains why the drill shuts off fuel, air and ignition sources to the engine before (and as well as) firing the bottle.",
  ],
  "atgfig-ch15_fig_03": [
    "This is a continuous-wire ('fire-wire') detector, the most common engine/APU fire detector. A thin central electrode runs down the middle of a steel tube, separated from it by a special filling material, with a dual clamp, support tube and quick-release connectors.",
    "The filling material changes its electrical properties sharply with temperature — its resistance falls and its capacitance rises as it gets hot. A control unit watches these changes along the whole length of the wire.",
    "Because the whole length senses heat, it catches a fire anywhere along the run, and (depending on type) it can distinguish a small local hot-spot from a large overheat by how much of the wire is affected.",
  ],
  "atgfig-ch15_fig_04": [
    "This is a gas-filled (pneumatic) detector. The sensing tube holds an inert 'averaging' gas plus a core of hydride material that holds a reserve of active gas.",
    "A general overheat along the whole tube warms the inert gas so it expands and raises the pressure, closing the responder alarm switch — this gives an average-temperature (overheat) warning. A fierce local fire heats the hydride core, which releases its active gas, giving a big pressure rise and a discrete (local fire) warning.",
    "So one tube senses both a broad overheat and a localised fire, and the pressure switch (normally open) closes to raise the alarm in either case.",
  ],
  "atgfig-ch15_fig_05": [
    "This shows a dual-loop fire detection system on an engine. Two independent loops of sensing element (Loop A and Loop B) run around the hot zones and feed a fire detection unit (FDU).",
    "Normally the FDU needs BOTH loops to signal fire before it declares a warning (AND logic) — this guards against a false alarm from a single damaged wire. But if one loop is found faulty, the system reverts to acting on either loop (OR logic) so protection is not lost.",
    "A confirmed fire drives the warnings: the continuous repetitive chime (CRC), the engine page on ECAM/EICAS, and the master warning lights.",
  ],
  "atgfig-ch15_fig_06": [
    "This shows the flight-deck fire-warning controls. On the overhead panel each engine and the APU has a fire push-handle that lights red FIRE when a fire is detected; beside each are the AGENT 1 / AGENT 2 SQUIB and DISCH legends and a TEST button.",
    "On the engine master panel, FIRE/FAULT lights repeat the warning near the engine master switches. Pulling (or pushing) the fire handle shuts off fuel, hydraulics, bleed air and electrics to that engine and arms the extinguisher bottles.",
    "Grouping the warnings and the drill controls together lets the crew carry out the fire drill quickly and in the right order.",
  ],
  "atgfig-ch15_fig_07": [
    "This is a close-up of one engine's fire panel. The central red FIRE push-handle illuminates when fire is detected; pulling it isolates the engine (fuel, bleed, hydraulics, electrics) and arms the bottles.",
    "AGENT 1 and AGENT 2 each have a SQUIB light (shows the bottle circuit is armed) and a DISCH light (confirms that bottle has fired). A TEST button checks the detection and warning circuits.",
    "Having two agents means the crew can fire a first bottle and, if the fire warning persists after about 30 seconds, fire the second — two shots per engine as required by certification.",
  ],
  "atgfig-ch15_fig_08": [
    "This is the pedestal engine-start and fire panel. The MASTER 1 and MASTER 2 switches turn each engine's fuel on/off, and the mode selector (CRANK / NORM / IGN-START) controls starting and ignition.",
    "Below each master switch a FIRE/FAULT light repeats the fire warning right next to the control the crew use to shut the engine down.",
    "Putting the fire indication beside the master switch means that, in the fire drill, the pilot shutting the engine down sees the warning exactly where their hand is working.",
  ],
  "atgfig-ch15_fig_09": [
    "This shows how the two extinguisher bottles are plumbed to the engines. The fire handles on the flight deck fire the bottles electrically, each bottle being set off by a cartridge (squib) that bursts a disc and releases the agent.",
    "Crucially, the two bottles are cross-plumbed: either bottle can be directed to either engine. So if an engine has a persistent fire, both bottles can be discharged into that one engine in turn.",
    "This gives two shots of agent per engine from a shared pair of bottles, saving weight while still meeting the two-discharge requirement.",
  ],
  "atgfig-ch15_fig_10": [
    "This is a typical two-engine fire-protection layout. Each engine has a discharge handle (1 and 2) that is pulled and twisted LEFT or RIGHT to select which bottle to fire into which engine.",
    "The left and right fire extinguisher bottles are fired by a squib (cartridge) and are cross-connected so that twisting the handle the other way sends the second bottle to the same engine.",
    "The 'pull and twist left or right' action is the heart of the two-shot cross-feed system: pull to fire the first bottle, and if the fire persists, twist the other way to fire the second.",
  ],
  "atgfig-ch15_fig_13": [
    "This shows the two portable fire extinguishers carried in the cabin. BCF (a halon-type agent) is colour-coded GREEN and is the general-purpose extinguisher — safe on electrical and flammable-liquid fires because it does not conduct and smothers the flame.",
    "The WATER extinguisher is colour-coded RED and is for solid 'ordinary combustible' fires (paper, furnishings); it must NOT be used on live-electrical or burning-liquid fires, where it would spread the fire or cause a shock.",
    "Both are stored-pressure types: lift the safety catch, hold upright, squeeze the lever and sweep the base of the flame. A red disc marked FULL drops off once the extinguisher has been fired, and the discharge lasts only about 15 seconds — so aim before firing.",
  ],

  // ─── Airframes — Smoke Detection (A.1.6) ───
  "atgfig-ch14_fig_01": [
    "This shows where smoke and fire detection, and the extinguisher bottles, are fitted on a typical airliner. Smoke detectors watch the places no one can see continuously: the forward, aft and bulk cargo holds and the avionics bay.",
    "Fire/overheat detectors and extinguisher bottles protect the engines and the APU — areas that run hot and carry fuel. The cargo holds have their own smoke detectors and fire-extinguisher bottles plumbed to spray into the affected hold.",
    "The idea is layered protection: continuous automatic detection in unmanned spaces, with the means to fight the fire (bottles) built in right where it could start.",
  ],
  "atgfig-ch14_fig_03": [
    "This shows an ionization smoke detector. A small radioactive source ionises the air in a chamber, letting a tiny steady current flow between two charged plates as air passes through.",
    "When smoke particles enter, they attach to the ions and slow them down, so the current drops. The detector senses this fall in current and raises a smoke warning.",
    "Ionization detectors are good at catching the invisible particles of fast, flaming fires, and respond very quickly to the early products of combustion.",
  ],
  "atgfig-ch14_fig_04": [
    "This shows a smoke detector unit (left) and its cockpit indicator panel (right). The detector samples air from the protected bay; the panel shows which zone has smoke.",
    "The indicator lights are split by zone — for example FWD and AFT freight bays — and there are discharge-valve indications plus a TEST/NORM/RESET switch so the crew can test the system and reset it after a warning.",
    "Clear per-zone indication matters because the crew need to know exactly which hold to fire the extinguisher into and to confirm the system is serviceable before flight.",
  ],
  "atgfig-ch14_fig_05": [
    "This is a cargo-smoke control panel of the Airbus pattern. SMOKE lights for the FWD and AFT holds light (red) when smoke is detected; a TEST button checks the system.",
    "To fight the fire the crew arm an AGENT (fire bottle) with the guarded switches and press DISCH; DISCH 1 and DISCH 2 lights confirm each bottle has fired. Two agents allow an initial knock-down shot and a later metered shot to keep the hold inert for the rest of the flight.",
    "Everything is grouped and clearly guarded so the drill can be done quickly but not triggered by accident.",
  ],
  "atgfig-ch14_fig_06": [
    "This shows how a toilet (lavatory) smoke detector works — toilets are a classic hidden fire risk from illicit smoking. When smoke is sensed, several warnings happen together: a red light flashes outside the toilet, a bleeper sounds at the attendant panel, and the cabin-call chime sounds.",
    "At the attendant's panel a light shows which toilet (e.g. REAR 1 / REAR 2) is affected. The crew can silence the audible warning with HORN OFF, but the red lights keep flashing until the smoke clears and RESET is pressed.",
    "Making the alert loud, visible and latching ensures a toilet fire cannot be missed or silently ignored.",
  ],
  "atgfig-ch14_fig_07": [
    "This shows a protective breathing equipment (PBE) smoke hood worn by a crew member. The hood covers the whole head, protecting it from heat and flames and keeping smoke out via a neck seal — long hair must be pushed clear so the seal works.",
    "Breathing air is supplied by a chemical reaction inside the hood (it makes its own oxygen), and a speech diaphragm lets the wearer still talk to passengers and the flight deck. Glasses can be worn underneath.",
    "It gives a minimum of about 15 minutes' protection; the end of its life is felt as increasing resistance to breathing and the bag starting to deflate — the signal to get clear.",
  ],

  // ─── Airframes — Oxygen Equipment (A.1.6) ───
  "atgfig-ch13_fig_01": [
    "This is a continuous-flow oxygen system, the simple type used mainly for passengers and for light aircraft. Gas is stored at high pressure in cylinders; a pressure-reducing valve drops it to a low working pressure fed to the mask connection points.",
    "The high-pressure (contents) gauge shows how much oxygen is left; the low-pressure gauge shows the delivery pressure. A line valve turns the supply on, filters keep it clean, and a non-return valve and charging valve allow the cylinder to be refilled without losing the stored gas.",
    "In continuous flow, oxygen simply flows to the mask the whole time it is selected on — it is wasteful but simple, which is fine for the relatively short time passengers need it.",
  ],
  "atgfig-ch13_fig_02": [
    "This is a demand oxygen system, used for the crew. It stores oxygen at high pressure, reduces it through a pressure regulator, and delivers it to individual demand regulators at each crew station rather than flowing continuously.",
    "A cylinder shut-off valve and a system shut-off valve isolate the supply; a safety disc with an external discharge indicator vents and shows if the cylinder has over-pressured. Filters and a non-return valve protect the line, and a charging valve allows refilling.",
    "Because a demand system only delivers oxygen when the user breathes in, it uses the stored gas far more economically than continuous flow — important for the flight crew, who may need it for long periods.",
  ],
  "atgfig-ch13_fig_03": [
    "This cutaway shows how a diluter-demand regulator works. When the user breathes in, a demand diaphragm is pulled over, opening the demand valve so oxygen flows only on demand (during inhalation).",
    "With the oxygen-selection lever at NORMAL, an air-metering valve lets cabin air in through the air-inlet valve and mixes ('dilutes') it with the oxygen; as cabin altitude rises the mixture is automatically richened until it is 100% oxygen. Selecting 100% closes off the air so only oxygen is delivered.",
    "The EMERGENCY lever adds a positive pressure to the mask (pressure-demand) to force oxygen in at very high altitude and keep smoke out, while a relief valve limits the pressure and a flow indicator shows that oxygen is actually flowing.",
  ],
  "atgfig-ch13_fig_04": [
    "This is the cockpit face of the same diluter-demand regulator. Three levers are used: the supply lever (ON/OFF) turns the whole regulator on, the oxygen lever selects NORMAL (air diluted) or 100% oxygen, and the emergency lever adds positive pressure.",
    "A flow indicator (often a 'blinker') shows a change each time oxygen flows, confirming the mask and regulator are working.",
    "Having these as simple, clearly marked levers lets a crew member set the regulator quickly and correctly, even in a hurry during a decompression.",
  ],
  "atgfig-ch13_fig_05": [
    "This shows the stowage box of an EROS quick-donning crew mask. The mask inflates its harness when the red grips are squeezed, so a pilot can pull it on one-handed in a few seconds.",
    "The box face carries the controls: a selector (here marked N / 100% PUSH) for normal/100% oxygen, a 'press to test' button to check flow, and an emergency position for positive pressure.",
    "Quick-donning masks are a certification requirement for the flight crew so that oxygen can be on the face within seconds of a cabin decompression.",
  ],
  "atgfig-ch13_fig_06": [
    "This is a chemical oxygen generator, the type that feeds the drop-down passenger masks on many airliners. Instead of storing gas, it holds a solid charge of sodium chlorate; a firing mechanism (set off when a passenger pulls a mask) starts the reaction.",
    "The burning charge releases oxygen, which passes through filters and a manifold to the mask outlets, with a relief valve for safety. Thermal insulation surrounds the core because the reaction runs hot (the casing can reach over 200°C).",
    "Key exam points: once started it cannot be switched off and runs for a fixed time (about 15 minutes), and it generates oxygen chemically rather than storing it — so no heavy high-pressure bottle is needed near the cabin.",
  ],
  "atgfig-ch13_fig_09": [
    "This is a crew portable oxygen set, carried for first-aid use and for moving about the cabin during smoke or a decompression. It has its own small oxygen cylinder (marked OXYGEN ONLY) with a yellow on-off valve and a contents pressure gauge.",
    "A pressure regulator drops the cylinder pressure, and a demand regulator feeds a full-face mask, giving the wearer both breathing oxygen and eye protection from smoke.",
    "Being portable, it lets a crew member leave a fixed oxygen point to fight a fire, help a passenger, or reach the flight deck while still protected.",
  ],

  // ─── Airframes — Ice & Rain Protection (A.1.2) ───
  "atgfig-ch12_fig_01": [
    "This shows the parts of an aircraft most likely to pick up ice. The leading edges of the wings and tail, the engine intakes, the windscreens, the pitot and static probes, and the propellers are all exposed to the oncoming air and so catch ice first.",
    "Ice on these surfaces is dangerous for different reasons: on wings and intakes it spoils the airflow and cuts lift and engine air, on probes it corrupts the airspeed and altitude readings, and on windscreens it blocks the view.",
    "On propellers, ice causes vibration (because the blades ice up unequally) and can cause structural damage when chunks shed off — which is why all these areas are given some form of ice protection.",
  ],
  "atgfig-ch12_fig_02": [
    "This links icing severity to altitude, temperature and cloud type. The worst icing is usually found in the band from around freezing (0°C) up to about −15°C, in the big water-laden clouds (cumulus, cumulonimbus, nimbostratus) — here supercooled water droplets freeze on contact and build ice fast.",
    "Higher up and colder (the altocumulus/altostratus levels) the icing is moderate. Very high and very cold, in the cirrus-type clouds above about 40,000 ft, the water is already frozen into ice crystals, which mostly bounce off and do not stick — so little airframe icing forms.",
    "Right down near the surface, above freezing, there is no icing at all. The key point: the most dangerous icing is in the mid-levels, just below the freezing level, in thick cloud.",
  ],
  "atgfig-ch12_fig_04": [
    "This is a pressure-type ice detector (a Smiths pattern). A small heated probe sticks into the airflow; it has four holes facing forward (the leading edge) and two holes facing aft (the trailing edge).",
    "In clear air the pressures at the two sets of holes stay in a fixed relationship. When ice begins to form, it blocks the forward-facing holes first, changing the pressure balance; this change operates a relay that sends an ice warning to the cockpit.",
    "A heating element then clears the probe so it can keep sensing. This type detects the actual onset of ice forming on a surface, not just the presence of moisture.",
  ],
  "atgfig-ch12_fig_05": [
    "This is a rotary (Napier) ice detector. A splined shaft with a knife edge rotates continuously against a fixed scraper; in clear air it turns freely.",
    "When ice forms on the exposed part, it builds up between the knife edge and the scraper and jams or loads the rotation. This resistance operates a microswitch, which sets off the ice warning in the cockpit.",
    "It is a simple mechanical way of sensing that ice is actually accreting, rather than just detecting damp air.",
  ],
  "atgfig-ch12_fig_06": [
    "This is a Rosemount vibrating-probe ice detector, the type most widely used on modern aircraft. A small rod is driven to vibrate at a fixed natural frequency (around 35 kHz).",
    "When ice forms on the rod it adds mass, which lowers the vibration frequency. A frequency-sensitive circuit watches for this drop and, when it reaches a set amount, declares an ice warning and usually triggers the anti-ice automatically.",
    "The probe then heats to shed the ice and resets, ready to detect the next build-up. Because it senses the ice itself and responds quickly, it is both accurate and reliable.",
  ],
  "atgfig-ch12_fig_07": [
    "This is a moisture/thermal (Sangamo Weston) ice detector. Air flows past two moisture-sensing heads feeding a moisture-detector controller, combined with a thermal switch that senses temperature.",
    "The system only warns of icing when BOTH conditions are met together: there is moisture in the air AND the temperature is low enough for it to freeze. That avoids false warnings in cold-but-dry or warm-but-wet air.",
    "It is an example of detecting the icing conditions (cold plus moisture) rather than waiting for ice to actually form on a probe.",
  ],
  "atgfig-ch12_fig_08": [
    "This is a beta-particle (radioactive) ice-detection probe. A small source emits beta particles across a gap to a detector built into the skin of the aircraft.",
    "When ice forms over the probe, the layer of ice absorbs some of the beta particles, so the detector receives fewer. That drop in count is read as ice forming and raises the warning.",
    "Because the measurement depends on the thickness of ice absorbing the radiation, it gives a direct indication that ice is building up on the surface.",
  ],
  "atgfig-ch12_fig_09": [
    "These are pneumatic de-icer boots — rubber sheets bonded to the leading edge containing inflatable tubes. The tubes can run span-wise (along the leading edge) or chord-wise (across it).",
    "In use, ice is first allowed to build up a little; then the tubes are inflated with air, which swells the rubber and cracks the ice off, after which the air-flow blows the broken ice away. The boots are then deflated flush again.",
    "This is a de-icing system (it removes ice that has already formed), not an anti-icing system (which would stop ice forming at all). It is common on turboprop and piston aircraft that do not have lots of spare hot bleed air.",
  ],
  "atgfig-ch12_fig_10": [
    "This schematic shows how a pneumatic boot system is plumbed. Air pressure and vacuum lines run to each boot through solenoid distributor valves, controlled electrically and sequenced by an electronic cyclic timer.",
    "The boots are split into groups (1, 2, 3) that are inflated in turn rather than all at once, so the aircraft's trim is not disturbed and the air supply is not overloaded. A vacuum line holds the boots flat against the skin between cycles so they do not spoil the airflow.",
    "The cyclic timer sets the delay between inflations to suit the conditions: a long delay for light icing (let more ice build before cracking it) and a short delay for heavy icing.",
  ],
  "atgfig-ch12_fig_11": [
    "This shows an exhaust heat-exchanger anti-ice/heating system used on some piston aircraft. Outside air is ducted around the hot engine exhaust so it picks up heat, then is fed to where it is needed (cabin, windscreen, or leading edges).",
    "A thermostatically controlled flap or valve, fitted between the exhaust unit and the heat exchanger, regulates how much exhaust heat is used, holding the delivered air at the right temperature.",
    "As always with exhaust heat, the burnt gases are kept separate from the heating air — a leak in the heat exchanger would be a carbon-monoxide hazard, so these units are inspected carefully.",
  ],
  "atgfig-ch12_fig_12": [
    "This shows the areas warmed by hot anti-icing air tapped from the engine/bleed system. The red areas are the aerofoil leading edges — the wings, the slats, the fin and the tailplane — plus the engine intakes and wing-fence areas.",
    "Because the hot air flows continuously along the inside of the leading-edge skin, it stops ice forming in the first place — this is anti-icing, not de-icing.",
    "Using bleed air this way is the normal method on jets, which have plenty of hot high-pressure air available from the engine compressors.",
  ],
  "atgfig-ch12_fig_13": [
    "This shows electrically heated 'heater mats' built into a component, here an engine intake lip. Thin electrical heating elements are sandwiched between layers of glass cloth for insulation and strength, then bonded under the skin.",
    "The elements are arranged in two kinds of zone: continuously heated areas (kept ice-free all the time, for example a parting strip) and intermittently heated areas (switched on and off in sequence to crack ice off cyclically).",
    "Electrical heating is used where only a modest area needs protection and electrical power is easier to route than hot air — for example probes, intake lips and some propeller and windscreen applications.",
  ],
  "atgfig-ch12_fig_14": [
    "This shows a fluid ('weeping wing' / TKS) ice-protection system. A fluid tank feeds, through a filter and pump, a network of main feed pipes and gallery pipes that run along the leading edges.",
    "The fluid seeps out through microporous panels — leading-edge skins drilled with thousands of tiny holes, backed by a distribution plate — so a thin film of anti-icing fluid weeps over the surface and stops ice bonding.",
    "The same fluid lowers the freezing point of any water on the surface, so it both prevents ice forming and helps clear any that has started. It is simple and effective but limited by the amount of fluid carried.",
  ],
  "atgfig-ch12_fig_15": [
    "This shows typical windscreen rain-clearance controls, one panel for the captain and one for the first officer. Each has a wiper switch (OFF/LOW/HIGH) and a rain-repellent button, and the picture shows the wipers on the screen.",
    "Giving each pilot an independent, separately powered wiper means a single failure cannot leave both forward windows without a working wiper.",
    "The controls also release rain-repellent fluid, which makes water bead up and blow away, improving the view in heavy rain when wipers alone struggle.",
  ],
  "atgfig-ch12_fig_16": [
    "This shows a windscreen fluid de-icing/anti-icing system. A fluid tank feeds through a filter to twin pumps (so there is a spare), then through a twin non-return valve and a check valve to spray tubes along the base of the windscreen.",
    "The spray tubes lay a film of methyl-alcohol-based fluid over the glass, which melts frost and stops ice forming while the wipers clear the liquid.",
    "Duplicated pumps and non-return valves give redundancy and stop the fluid draining back, so the system is ready the moment it is switched on.",
  ],
  "atgfig-ch12_fig_17": [
    "This shows an electrically heated windscreen circuit. A thin transparent conductive film inside the laminated screen is fed from the AC busbar through a power relay, with an auto-transformer giving NORMAL and HIGH heat settings selected by a control switch.",
    "A temperature-control unit, powered from the DC busbar, senses the screen temperature with embedded sensors and switches the heating to hold the glass at the right temperature.",
    "Heating the windscreen does two jobs: it keeps it clear of ice and mist, and it warms the laminate so it stays flexible and much more resistant to bird-strike impact.",
  ],

  // ─── Airframes — Pressurisation (A.1.2) ───
  "atgfig-ch11_fig_01": [
    "This shows which parts of the fuselage are pressurised (yellow) and which are not (pink). The pressurised 'pressure hull' holds the cockpit, the forward and aft passenger cabins, and the forward and aft cargo holds — everywhere people or sensitive cargo need a breathable, comfortable atmosphere.",
    "The unpressurised areas are the radome in the nose, the nose and main undercarriage bays, the centre-section wing torque box, and the tail cone. These are sealed off from the cabin by pressure bulkheads.",
    "Keeping the pressurised volume as a simple, strong barrel shape (closed by a front and a rear pressure bulkhead) is what lets the structure carry the pressure loads safely for thousands of flights.",
  ],
  "atgfig-ch11_fig_02": [
    "These are the three safety valves that protect the pressure hull. The inwards relief valve opens if the cabin pressure ever falls below the outside pressure (for example in a fast descent), letting air back in so the structure is not crushed inwards (negative differential).",
    "The outflow valve is the main working valve: the pressurisation controller constantly adjusts how far it opens to let air escape, setting the cabin pressure. The pressure relief valve is a back-up that blows off automatically if the cabin-to-outside difference (ΔP) ever exceeds the maximum the structure is designed for.",
    "Together they stop the cabin from over-pressurising, from going into negative differential, and keep the day-to-day pressure under control.",
  ],
  "atgfig-ch11_fig_03": [
    "This shows a modern electronic pressurisation system. The crew set a landing elevation and a mode on the CABIN PRESS panel; a pressure controller (usually with two automatic channels plus a manual back-up) then drives the outflow valve.",
    "The controller schedules the outflow valve throughout the flight to follow a planned cabin-altitude profile, with the display (here an ECAM-style page) showing differential pressure ΔP, cabin vertical speed and cabin altitude.",
    "The inwards relief, outflow and pressure relief valves are all shown — the controller works the outflow valve normally, while the relief valves stand by to protect the hull if anything goes wrong.",
  ],
  "atgfig-ch11_fig_04": [
    "This is a typical pressurisation profile for one flight. On the ground with doors open the cabin is at airfield pressure (zero differential). After take-off the cabin 'climbs' gently — note the cabin vertical speed is limited (about 500 ft/min up) so ears have time to adjust, far slower than the aircraft itself climbs.",
    "In the cruise the cabin is held at a maximum cabin altitude (about 8,000 ft) and the structure carries the resulting maximum differential pressure (about 8 psi on this type). During the descent the cabin 'descends' gently (about 300 ft/min) to arrive at the landing field elevation.",
    "The whole point is a gentle, controlled cabin-altitude schedule that keeps passengers comfortable while never exceeding the airframe's differential-pressure limit.",
  ],
  "atgfig-ch11_fig_05": [
    "This is the cabin-pressure display page in more detail. ΔP shows the pressure difference between cabin and outside (here 4.1 psi), V/S shows how fast the cabin altitude is changing, and CAB ALT shows the present cabin altitude.",
    "The lower picture is a mimic of the system: the two air-conditioning packs feed in, the inlet and extract vents and the outflow valve set the cabin pressure, and a safety valve stands by. Green shows a normal/open path.",
    "Having all this on one page lets the crew see at a glance that the cabin is being controlled correctly and spot a pressurisation problem early.",
  ],

  // ─── Airframes — Pneumatics, air-con & pressurisation (A.1.2) ───
  "atgfig-ch10_fig_01": [
    "This shows a simple light-aircraft heating system. Ram air is taken in and ducted around a muff (jacket) fitted over the engine exhaust; the hot exhaust warms the air without the exhaust gases mixing with it.",
    "A cold-air control lets the pilot blend unheated ram air with the hot air to set the cabin and windscreen-demister temperature. Spent exhaust is dumped overboard.",
    "The key safety point is the exhaust muff: if it cracks, carbon monoxide can leak into the cabin air — which is why these systems are inspected carefully and a CO detector is a wise fit.",
  ],
  "atgfig-ch10_fig_02": [
    "This shows a combustion heater, used where exhaust-muff heat is not enough. A combustion blower feeds air into a sealed burner can where fuel is sprayed and lit by an igniter, giving a contained flame.",
    "Separate ram air is blown around the outside of the hot can and picks up the heat, then goes to the cabin — again the burnt gases never mix with the cabin air; they go out of the exhaust. A hot-air control sets the output temperature.",
    "Because it burns fuel, a combustion heater has its own safety controls (overheat switches, fuel shut-off) to prevent fire or fumes.",
  ],
  "atgfig-ch10_fig_04": [
    "This schematic shows the bleed-air (pneumatic) manifold of a jet. Hot high-pressure air is bled from the engine compressor through an engine bleed-air control valve and an HP shut-off valve, and passed through a pre-cooler (cooled by fan air) before joining the main duct.",
    "An isolation valve in the middle lets the left and right engine supplies be joined or split. The APU and a ground service connection can also feed the manifold on the ground.",
    "From the duct the air is tapped off for all the big users: air-conditioning packs, wing and tail anti-icing, engine starting (starter valve), and pressurising the hydraulic reservoir and water tank.",
  ],
  "atgfig-ch10_fig_05": [
    "This pictorial view puts the same pneumatic system onto the aircraft. Each engine bleeds HP/IP air, which is pre-cooled with fan air and fed into a common duct running through the aircraft.",
    "A crossfeed valve lets either engine (or the APU in the tail) supply the whole system, and a ground service connector allows a ground cart to supply air with the engines off.",
    "The duct feeds the air-conditioning packs, wing and tail anti-ice, and wing leading-edge ventilation — showing how one bleed system serves many jobs around the airframe.",
  ],
  "atgfig-ch10_fig_06": [
    "This is a bootstrap air-cycle machine (ACM) — the heart of a jet's air conditioning. Hot bleed air passes a non-return valve, a shut-off valve, a pressure-reducing valve and a flow controller, then a primary heat exchanger cooled by ram air.",
    "The cooled-but-still-warm air is compressed further by the ACM compressor (which heats it again), cooled once more in the secondary heat exchanger, then expanded through the ACM turbine. Expanding through the turbine does work and drops the temperature sharply, so very cold air leaves the 'cold air unit'.",
    "The turbine drives the compressor on a common shaft — that is the 'bootstrap'. A water separator removes condensation, a temperature-control valve adds a little hot air to set the final temperature, and the conditioned air goes to the cabin.",
  ],
  "atgfig-ch10_fig_07": [
    "This graph tracks the air's temperature (red) and pressure (blue) as it passes through the bootstrap system. It enters the primary heat exchanger hot (about 168°C) and is cooled (to about 82°C).",
    "The ACM compressor then raises both temperature and pressure (back up to about 140°C); the secondary heat exchanger cools it again. Finally the turbine expands the air, and here is the key point — the temperature falls steeply (to just a few degrees) while the pressure also drops, because the air gives up energy to drive the compressor.",
    "The diagram makes clear that the big cooling effect comes from expansion through the turbine, not just from the heat exchangers.",
  ],
  "atgfig-ch10_fig_09": [
    "This shows a venturi humidifier used to add moisture to very dry conditioned air. The charge air is passed through a venturi — a throat that speeds the air up and drops its pressure.",
    "At the low-pressure throat a diffuser injects a fine spray of water drawn from a water tank, fed by HP air; a control valve metered by a humidistat sets how much water is added.",
    "The result is comfortable cabin humidity. Cabin air from engine bleed is naturally bone-dry at altitude, so a humidifier improves passenger comfort on long flights.",
  ],
  "atgfig-ch10_fig_10": [
    "This shows how final cabin temperature is trimmed. Cold air from the ACM and heat exchangers is mixed with hot bleed air let in through a hot-air (trim-air) valve.",
    "A temperature sensor in the mixed-air duct feeds a controller that opens or closes the hot-air valve until the mix matches the selected temperature.",
    "Mixing a controlled amount of hot air with the cold pack output is the normal way to give each zone of the cabin its own steady, selectable temperature.",
  ],
  "atgfig-ch10_fig_11": [
    "This shows how conditioned air is distributed through the cabin. Air travels along distribution ducting, usually under the floor and up riser ducts in the sidewalls, to reach outlets at several levels.",
    "Upper air outlets (and passenger 'gaspers') feed from above, lower air outlets feed at floor level, and an outlet to the underfloor keeps air moving down and out. The arrows show the circulation: air enters high, sweeps across the cabin and is drawn out low.",
    "Spreading the inlets and outlets like this avoids draughts and stagnant pockets, and keeps fresh air flowing evenly past every seat before it is extracted and partly recirculated.",
  ],

  // ─── Airframes — Powered Flying Controls (A.1.2) ───
  "atgfig-ch09_fig_01": [
    "This block diagram shows what a powered flying control system needs. The pilot's input from the control column goes to a servo-valve, which ports hydraulic power to the actuator; the actuator moves the control surface.",
    "A follow-up (feedback) link runs from the surface back to the servo-valve. As the surface reaches the position the pilot asked for, this feedback re-centres the valve and 'cuts out the operation', so the surface stops exactly where commanded rather than running to the stop.",
    "Because the surface loads are carried entirely by the hydraulic jack, the pilot feels nothing natural through the controls — so artificial feel units are added to give the pilot a sense of how hard the aircraft is being flown.",
  ],
  "atgfig-ch09_fig_03": [
    "This shows a power-assisted flying control unit. Here the pilot's input and the hydraulic jack work together: the jack ram is bolted to the control column, so some of the load is carried by the pilot and some by the hydraulics.",
    "Moving the column shifts the servo valve, which admits pressure to one side of the jack (the other side going to return), driving the output to the elevator. Because the pilot is still mechanically linked to the surface, the system is reversible and the pilot feels a proportion of the real aerodynamic load — so little or no artificial feel is needed.",
    "Power assistance is used where the loads are too high for muscle alone but full power operation (with artificial feel) is not justified.",
  ],
  "atgfig-ch09_fig_04": [
    "This shows a simple spring feel unit. The control run passes through a unit containing springs on each side of a piston; moving the controls compresses one spring, which pushes back.",
    "This gives the pilot an artificial 'feel' in a fully powered (irreversible) system, where the real surface loads can no longer be felt. The harder the pilot pulls, the more the spring resists, so there is a sensible relationship between stick force and surface deflection.",
    "A plain spring feel has one drawback: the force depends only on how far the controls are moved, not on airspeed — so at high speed it can feel too light. That is why many aircraft use airspeed-sensitive (Q) feel instead.",
  ],
  "atgfig-ch09_fig_05": [
    "This shows an airspeed-sensitive artificial feel, often called 'Q feel'. Pitot pressure and static pressure are fed to the unit; the difference between them is dynamic pressure (½ρV²), which represents how fast the aircraft is flying.",
    "This dynamic pressure acts on a diaphragm that loads the PFCU control rod, so the resistance the pilot feels increases with airspeed. At low speed the controls feel light; at high speed they feel firm, which stops the pilot from over-stressing the aircraft.",
    "Combining Q feel with the control geometry gives a feel force that matches the real aerodynamic loads far better than a plain spring, improving both safety and handling.",
  ],
  "atgfig-ch09_fig_06": [
    "This cutaway shows the inside of a Q-feel unit. Pitot and static pressures act across a capsule in the 'Q pot'; the resulting dynamic pressure moves a spool valve.",
    "The spool valve meters hydraulic pressure to a piston connected into the feel system, with excess fluid bled back to return. The higher the airspeed, the more the capsule deflects, the more hydraulic feel pressure is let through, and the firmer the controls become.",
    "So the unit turns an air-data signal (dynamic pressure) into a hydraulic feel force that rises with speed — giving the pilot realistic, speed-related resistance in a fully powered control system.",
  ],
  "atgfig-ch09_fig_07": [
    "This ties the whole fully-powered control together. The control column moves a control valve (servo valve); hydraulic pressure and return are ported through it to a jack that drives the control surface, with the valve mechanically followed up so the surface stops where commanded.",
    "At the same time a Q-feel unit, fed by pitot and static pressure, loads the control run to give the pilot airspeed-related artificial feel.",
    "Together these give the three things a powered system must provide: the muscle to move the surface against high loads, accurate positioning through feedback, and realistic feel so the pilot does not over-control.",
  ],
  "atgfig-ch09_fig_08": [
    "This shows a feel computer, which produces artificial feel from more than one source. A bellows fed by pitot and static pressure provides the airspeed (Q) component, while a spring provides a basic spring-feel component.",
    "These are combined through a metering valve that sets the hydraulic feel pressure, with a relief valve to limit it and return for excess fluid. The feel force is fed back into the control run between the quadrants and the power control unit (PCU).",
    "By blending spring feel and air-data feel, and often adjusting for the trimmable stabiliser position, the feel computer gives the right stick force across the whole speed and configuration range.",
  ],
  "atgfig-ch09_fig_10": [
    "This shows a redundant powered elevator with two independent hydraulic systems, 'A' and 'B', each with its own power control unit driving the same surface. If one system fails, the other still moves the elevator.",
    "The pilot's control system and an autopilot actuator both feed the input, via quadrants, to the power units. A feel computer (fed by the pitot 'Q' system and spring feel) and a neutral-shift input from the stabiliser position trim set the artificial feel.",
    "Duplicating the hydraulic supply and the actuators is how large aircraft meet the safety requirement that no single failure may jam or disable a primary flight control.",
  ],
  "atgfig-ch09_fig_11": [
    "This is a fly-by-wire (FBW) block diagram. The pilot's sidestick and the autopilot send electrical 'orders' to a set of digital flight-control computers (for example ELACs, SECs and FACs on an Airbus), which decide how to move each surface.",
    "The computers drive hydraulic actuators on the elevator, stabiliser, ailerons, spoilers and rudder. There are no heavy cable runs for the primary surfaces — just electrical signalling, which saves weight and allows the computers to shape the controls.",
    "A mechanical backup (rudder pedals and manual stabiliser trim) is kept so the aircraft can still be flown if all the electrical control is lost, giving a safe reversion path.",
  ],
  "atgfig-ch09_fig_12": [
    "This shows flight-envelope protection, a key benefit of fly-by-wire. While the computers are in the normal (flight) mode, they stop the pilot from taking the aircraft outside safe limits no matter how hard the controls are moved.",
    "The protections cover pitch attitude, load factor (g), bank angle, angle of attack (stall) and high speed. For example, the aircraft will not let itself be stalled or over-stressed, and will not roll past a set bank angle without extra effort.",
    "These protections make the aircraft easier and safer to fly, especially in an upset or an avoidance manoeuvre, because the pilot can pull or roll firmly and let the system hold the limit.",
  ],

  // ─── Electrics — DC principles & circuits (A.1.3) ───
  "elecfig-ch01_01": [
    "This shows the structure of an atom, the basis of all electricity. At the centre is the nucleus, made of protons (positively charged) and neutrons (no charge). Electrons (negatively charged) orbit around it.",
    "Electricity is the movement of the outer 'free' electrons from atom to atom. In a conductor (like copper) these outer electrons are loosely held and move easily; in an insulator they are tightly held and hardly move.",
    "Because the electron carries a negative charge, a flow of electrons is a flow of negative charge — which is why 'electron flow' and 'conventional current' are drawn in opposite directions.",
  ],
  "elecfig-ch01_02": [
    "This contrasts the two ways we describe current. Electron flow is the real movement of electrons, which go from the negative terminal, through the circuit, to the positive terminal.",
    "Conventional current flow is the older convention still used in all circuit diagrams: it is drawn from positive to negative, i.e. the opposite direction to the electrons.",
    "For exams, unless told otherwise, 'current' means conventional current (positive to negative). The two are just opposite labels for the same flow.",
  ],
  "elecfig-ch01_03": [
    "This uses a water analogy to explain voltage and current. The height of water (pressure, in psi) is like voltage (EMF) — the 'push'. The amount of water flowing out is like current.",
    "With a high pressure (12 psi / 12 volts) you get a high flow; with a low pressure (2 psi / 2 volts) you get a low flow. More voltage drives more current through the same resistance.",
    "This is Ohm's law in picture form: current depends on the voltage (push) driving it against the resistance (how narrow the pipe is).",
  ],
  "elecfig-ch01_04": [
    "These are the circuit symbols for resistors. A fixed resistor (a set value) is drawn either as a zig-zag line or as a plain rectangle.",
    "A variable resistor (one whose value can be changed) is the same symbol with an arrow through it; it is used as a rheostat or potentiometer to adjust current or voltage.",
    "Knowing these symbols lets you read a circuit diagram and tell a fixed component from an adjustable one at a glance.",
  ],
  "elecfig-ch01_05": [
    "This is a series circuit: the resistors R₁ (4Ω), R₂ (6Ω) and R₃ (10Ω) are connected one after another in a single loop with the 12 V supply.",
    "In series the total resistance is simply the sum: 4 + 6 + 10 = 20Ω. The same current flows through every component (there is only one path), here 12 V ÷ 20Ω = 0.6 A.",
    "The key feature of series: one break anywhere stops all current — like old Christmas-tree lights where one failed bulb kills the whole string.",
  ],
  "elecfig-ch01_06": [
    "This is a parallel circuit: R₁ (4Ω), R₂ (6Ω) and R₃ (10Ω) are each connected straight across the 12 V supply, giving three separate paths.",
    "In parallel the total resistance is found from 1/R = 1/4 + 1/6 + 1/10, which works out LESS than the smallest single resistor. Each branch gets the full 12 V, and the branch currents add up to the total from the supply.",
    "The key feature of parallel: each path is independent, so if one branch fails the others keep working — which is why aircraft loads are wired in parallel across the bus-bar.",
  ],
  "elecfig-ch01_07": [
    "This is a series-parallel circuit. R₁ (4Ω) is in series with a parallel pair, R₂ (6Ω) and R₃ (10Ω), across the 12 V supply.",
    "You solve it in steps: first combine the parallel pair (6Ω ‖ 10Ω = 3.75Ω), then add the series resistor (4 + 3.75 = 7.75Ω total). The supply current then splits between R₂ and R₃.",
    "Most real circuits are mixtures like this; the trick is always to reduce the parallel groups first, then add the series parts.",
  ],
  "elecfig-ch01_08": [
    "This illustrates Kirchhoff's current law at a junction. Two currents, I₁ and I₂, flow in, and the current flowing out, I₃, equals their sum: I₃ = I₁ + I₂.",
    "The law simply says charge cannot pile up or vanish at a point — whatever flows into a junction must flow out of it.",
    "This is exactly why the branch currents in a parallel circuit add up to the total current drawn from the supply.",
  ],
  "elecfig-ch01_09": [
    "This shows Kirchhoff's voltage law in a series circuit. The supply is 12 V, and the voltage 'dropped' across each resistor (2 V across 2Ω, 4 V across 4Ω, 6 V across 6Ω) adds up to the supply: 2 + 4 + 6 = 12 V.",
    "Each drop is found from Ohm's law on the common current (here 1 A): V = I × R. The bigger the resistor, the bigger its share of the voltage.",
    "The law says the voltage rises and falls around any closed loop must balance — the energy given by the supply is all used up in the resistors.",
  ],

  // ─── Electrics — Switches & sensors (A.1.3) ───
  "elecfig-ch02_01": [
    "This shows two common cockpit switch types. A two-position switch simply makes or breaks one circuit — OFF and ON. A three-position switch has a centre OFF with a selection either side, for example IN / OFF / OUT to drive something both ways.",
    "The moving blade inside bridges the supply (here 28 V) to the chosen output terminal. In the three-position switch the centre position connects to neither output, giving a safe neutral.",
    "Choosing the right number of positions lets one switch control a simple load or a two-direction actuator such as a trim or a valve.",
  ],
  "elecfig-ch02_02": [
    "These are switch-lights — pushbuttons that also show the system's state in the button face. A guarded momentary switch-light must be pressed deliberately (and may sit under a guard) and lights to show it is selected.",
    "An 'alternate' switch-light with a flowbar indicator shows not just that it was pressed but that something actually happened — the flowbar changes when the valve or contactor really moves, confirming the action.",
    "Combining the control and its indication in one button saves panel space and gives the crew immediate feedback (e.g. OVHT/PRESS, OPEN/TRIP shown right in the switch).",
  ],
  "elecfig-ch02_03": [
    "This is the inside of a microswitch. An operating plunger, pushed by some moving part, snaps a moving contact from one position to another.",
    "The contact connects a common terminal to one of the fixed terminals, so the switch can both make one circuit and break another at the same instant. The snap-action gives a clean, fast change-over.",
    "Microswitches are used all over the aircraft as limit and position sensors — to tell the system when flaps, gear, doors or levers have reached a set position.",
  ],
  "elecfig-ch02_04": [
    "This is a proximity switch (sensor). The top pictures show the sensor itself; the diagram shows it is basically a coil that detects a nearby metal 'target' without ever touching it.",
    "When the target comes close, it changes the sensor's magnetic field, which the electronics turn into an ON/OFF signal sent to the proximity-switch electronics unit.",
    "Because there is no physical contact, there is nothing to wear out or stick — which is why proximity sensors have largely replaced microswitches for important jobs like landing-gear position.",
  ],
  "elecfig-ch02_05": [
    "This is a magnetic (variable-reluctance) speed pickup. A coil is wound on a pole piece attached to a permanent magnet, with its magnetic field reaching out to a toothed gear or phonic wheel.",
    "As each gear tooth passes the pole piece, it changes the magnetic field through the coil, and this changing field induces a voltage pulse in the coil. The faster the gear turns, the more pulses per second.",
    "Counting the pulses gives rotational speed, so this type of sensor is used for engine/rotor RPM, wheel speed (anti-skid) and similar speed indications — and it needs no power supply of its own.",
  ],
  "elecfig-ch02_06": [
    "This shows proximity sensors doing a real job on a landing gear. An uplock sensor and a downlock sensor each face a metal 'target' on the moving gear structure.",
    "When the gear reaches the fully up (locked) or fully down (locked) position, its target comes close to the matching sensor, which signals the system that the gear is locked in that position.",
    "Using non-contact proximity sensors here is safer than microswitches because there are no exposed contacts to be damaged by the harsh wheel-well environment, and nothing mechanical to wear out.",
  ],

  // ─── Electrics — Circuit protection & capacitors (A.1.3) ───
  "elecfig-ch03_01": [
    "This shows how a fuse is built. The replaceable fuse cartridge contains a thin fuse element (resistance wire) running between the two end terminals, held in a ceramic barrel.",
    "The barrel is packed with sand and sealed with cement; if the current gets too high the element heats up and melts, breaking the circuit, while the sand quenches the arc so it cannot keep conducting. The cartridge sits in a holder with a screw cap and clamp nut.",
    "A fuse is a one-shot protector: once it has 'blown' it must be replaced with one of the same current rating — never a higher one, which would defeat the protection.",
  ],
  "elecfig-ch03_02": [
    "This is a heavy-duty bolt-in fuse, often called a current limiter. Its tags are bolted directly into the circuit rather than plugged into a holder.",
    "It does the same job as a small fuse but at much higher currents — protecting the big feeder cables between the generators, the battery and the main bus-bars.",
    "Because it carries a large current, it is made as a solid metal link that melts only on a serious overload or short-circuit.",
  ],
  "elecfig-ch03_03": [
    "This shows a circuit breaker, the re-settable alternative to a fuse. Inside the housing a mechanism holds the contacts closed; an overload heats a bimetal strip (or energises a coil) that trips the mechanism open.",
    "When it trips, the push-pull button pops out and a white marker band shows it has operated. The crew can reset it by pushing the button back in — but only once the fault has cleared.",
    "A good circuit breaker is 'trip-free': it will still trip even if you hold the button in, so you cannot force power onto a faulty circuit.",
  ],
  "elecfig-ch03_04": [
    "This shows what a capacitor actually is: two metal plates placed close together but separated by an insulating layer called the dielectric, with an electrical connection to each plate.",
    "When a voltage is applied, charge builds up on the plates — negative on one, positive on the other — and energy is stored in the electric field across the dielectric. No charge crosses the dielectric itself.",
    "The bigger the plates, the thinner the gap and the better the dielectric, the more charge it can store — that is its capacitance.",
  ],
  "elecfig-ch03_05": [
    "These are the circuit symbols for capacitors. A fixed non-polarised capacitor (two parallel lines) can be connected either way round. A fixed polarised capacitor (one straight plate, one curved or a '+' mark) must be connected the correct way or it can be damaged.",
    "A variable capacitor (arrow through it) can be adjusted by the user; a preset is set once on installation and then left.",
    "Recognising these lets you read a circuit and, importantly, spot a polarised capacitor that must go in the right way round.",
  ],
  "elecfig-ch11_10": [
    "This shows a capacitor charging and discharging over time. When first connected, a big current flows to charge the plates, but the voltage across the capacitor starts at zero and climbs; as it charges, the current falls away and the voltage levels off at the supply value.",
    "When the capacitor is then discharged into a resistor, the current flows the other way and both current and voltage decay back towards zero.",
    "The curves are exponential: charge/discharge is fast at first then slows. How fast depends on the resistance and capacitance (the 'time constant' R × C).",
  ],
  "elecfig-ch11_11": [
    "This shows why a capacitor appears to 'pass' AC. On the first half-cycle the supply charges the plates one way; on the second half-cycle the supply reverses and charges them the other way.",
    "So the plates are charged and discharged every half-cycle, and current keeps flowing in the wires to and from the capacitor — even though no charge ever actually crosses the dielectric.",
    "The result: a capacitor blocks steady DC but readily passes AC, and the higher the frequency the more easily it passes (lower capacitive reactance).",
  ],
  "elecfig-ch03_09": [
    "This shows two capacitors, C₁ and C₂, connected in series (one after the other).",
    "In series, capacitors combine like resistors in parallel: 1/C = 1/C₁ + 1/C₂, so the total capacitance is LESS than either one on its own. This is the opposite of resistors.",
    "Series connection is used when you need to share a high voltage across two capacitors, each then seeing only part of the total voltage.",
  ],

  // ─── Electrics — Batteries (A.1.3) ───
  "elecfig-ch04_01": [
    "This shows a basic cell — the building block of every battery. Two different electrodes are dipped into an electrolyte (a conducting liquid or paste).",
    "A chemical reaction between the electrodes and the electrolyte pushes electrons onto the negative electrode and pulls them from the positive one, creating a voltage (EMF) between the two terminals.",
    "Connect a circuit across the terminals and this voltage drives a current — the cell is turning chemical energy into electrical energy.",
  ],
  "elecfig-ch04_02": [
    "This is a dry cell, the 'primary' (non-rechargeable) type like a torch battery. The positive electrode is a central carbon rod; the negative electrode is the outer zinc case; between them is a moist paste electrolyte.",
    "As it supplies current the chemicals are used up, and once they are exhausted the cell is finished — a primary cell cannot be recharged, only replaced.",
    "It shows the same three essentials as any cell: a positive electrode, a negative electrode and an electrolyte.",
  ],
  "elecfig-ch04_03": [
    "This shows the two ways to connect cells. In series (left), the cells are joined + to −, so their voltages add: three 2 V cells give 6 V, but the capacity stays 10 Ah.",
    "In parallel (right), all the + terminals join and all the − terminals join, so the voltage stays 2 V but the capacities add: three 10 Ah cells give 30 Ah.",
    "The rule to remember: series adds VOLTAGE, parallel adds CAPACITY (ampere-hours). Aircraft batteries stack cells in series to reach 12 V or 24 V.",
  ],
  "elecfig-ch04_04": [
    "This shows how a lead-acid cell is built. Interleaved groups of positive and negative plates hang from the terminal posts, packed close together to give a large plate area (and so more current).",
    "The positive and negative plate groups are interlocked but kept apart by separators (not shown) so they cannot touch and short out. A vent cap lets the gas produced on charge escape and allows topping-up.",
    "More plate area means more current can be drawn — which is why a starting battery has many thin, closely-spaced plates.",
  ],
  "elecfig-ch04_05": [
    "This shows the chemistry of a charged lead-acid cell. The positive plate is lead peroxide, the negative plate is spongy lead, and the electrolyte is dilute sulphuric acid and water. A fully charged cell gives about 2.2 V.",
    "On discharge both plates slowly turn to lead sulphate and the acid gets weaker, so the electrolyte's specific gravity (SG) falls — which is how a hydrometer reading tells you the state of charge.",
    "Charging reverses the reaction, restoring the plates and the acid strength. The electrolyte is corrosive, so spills are neutralised with sodium bicarbonate.",
  ],
  "elecfig-ch04_09": [
    "This table sums up the two secondary (rechargeable) battery types for the exam. For lead-acid: positive plate lead peroxide, negative spongy lead, electrolyte sulphuric acid; spills neutralised with sodium bicarbonate; SG about 1.270 charged, 1.170 discharged.",
    "For alkaline (NiCad): positive plate nickel oxide/hydroxide, negative cadmium, electrolyte potassium hydroxide; spills neutralised with boric acid; SG about 1.240–1.300.",
    "The crucial difference: a lead-acid cell's SG drops as it discharges (so SG shows its charge), but a NiCad's SG hardly changes — so you cannot judge a NiCad's charge from its SG.",
  ],

  // ─── Electrics — Magnetism & electromagnetism (A.1.3) ───
  "elecfig-ch05_01": [
    "These show magnetic field patterns. Field lines always run out of the north pole, round the outside, and into the south pole; they never cross. The spacing shows field strength — close lines mean a strong field.",
    "When two magnets face each other the patterns tell the story: unlike poles (N facing S) have lines joining them and pull together (attract); like poles (N facing N) have lines pushing apart (repel).",
    "A horseshoe magnet brings the two poles close together to give a strong, concentrated field in the gap between them.",
  ],
  "elecfig-ch05_02": [
    "This shows how a piece of soft iron affects a magnetic field. Placed between two poles, the iron offers an easy path for the field lines, so they crowd into it.",
    "This does two useful jobs: it concentrates the flux where you want it (as in an instrument or motor), and it screens the space behind it — components inside an iron box are shielded from the outside field.",
    "This is why sensitive instruments are housed in soft-iron ('mu-metal') cans: the iron soaks up the stray magnetism before it can reach the instrument.",
  ],
  "elecfig-ch05_03": [
    "This illustrates domain theory. A magnetic material is full of tiny regions called domains, each a little magnet. In an UNMAGNETISED bar they point in all directions, so their effects cancel and there is no overall magnetism.",
    "As the bar is MAGNETISED, more and more domains swing round to point the same way, so the bar develops north and south poles.",
    "When every domain is aligned the bar is SATURATED — it cannot be made any stronger however hard you try, because there are no more domains left to line up.",
  ],
  "elecfig-ch05_04": [
    "This shows that an electric current always creates a magnetic field. A current flowing through a straight conductor is surrounded by circular field lines, centred on the wire.",
    "The direction of these circles is given by the right-hand grip rule: point your right thumb along the (conventional) current and your fingers curl the way the field goes. More current gives a stronger field.",
    "This simple fact — current makes magnetism — is the basis of every electromagnet, relay, solenoid, motor and generator.",
  ],
  "elecfig-ch05_05": [
    "This explains the dot-and-cross convention used to draw current direction on a flat page, using the picture of an arrow. Looking at the tail of an arrow flying away from you, you see a cross (⊗) — this means current flowing INTO the paper.",
    "Looking at the point of an arrow coming towards you, you see a dot (⊙) — this means current flowing OUT of the paper.",
    "The circular field lines around each then let you work out, with the right-hand rule, which way the magnetic field turns — essential for reading motor and generator diagrams.",
  ],
  "elecfig-ch05_06": [
    "This shows the magnetic fields around two parallel conductors. When the currents flow the SAME way (left), the fields between the wires cancel and the outer fields join, so the wires are pulled together (attract).",
    "When the currents flow in OPPOSITE directions (right), the fields between the wires reinforce and push the wires apart (repel).",
    "This force between current-carrying conductors is the direct cause of the turning force in an electric motor.",
  ],
  "elecfig-ch05_07": [
    "This shows the field of a solenoid — a coil of wire carrying current. Each turn adds its circular field, and together they combine into a field just like a bar magnet, with a north pole at one end and a south at the other.",
    "The more turns and the more current, the stronger the field; winding the coil on a soft-iron core concentrates it further to make a powerful electromagnet.",
    "Because the field appears only while current flows, a solenoid can be switched on and off — which is how electromagnets, contactors and actuators work.",
  ],
  "elecfig-ch05_08": [
    "This compares a solenoid and a relay — both use a coil's magnetism to let a small switching current control a large load current. The small current energises the coil; the magnetism then closes (or opens) heavy-duty contacts.",
    "The difference is mechanical: a solenoid has a MOVING core (plunger) that is pulled in to do work or move the contacts, while a relay has a STATIONARY core and a separate hinged armature that carries the contacts.",
    "Both keep the heavy current away from the cockpit switch — the pilot's small switch just energises the coil, and the relay/solenoid does the heavy switching out at the load.",
  ],
  "elecfig-ch05_09": [
    "This shows the motor principle. On its own, a current-carrying conductor has a circular field around it; placed in the field between a north and a south pole, the two fields interact.",
    "On one side of the conductor the two fields point the same way and ADD (field strengthened); on the other they oppose and CANCEL (field weakened). The conductor is pushed from the strong side towards the weak side.",
    "This force is what turns an electric motor; its direction is given by Fleming's left-hand rule (field, current, motion). Reverse the current or the field and the force reverses.",
  ],

  // ─── Electrics — Generation & regulation (A.1.3) ───
  "elecfig-ch06_01": [
    "This shows the basic law of electromagnetic induction. When the magnet is MOVED near the coil, the changing magnetic field through the coil induces a voltage (EMF), and the meter needle swings.",
    "When the magnet is held STILL (right-hand picture), the field is no longer changing, so no EMF is induced and the meter reads zero — even though the magnet is right there.",
    "The key point: it is the relative MOTION (the changing flux) that generates electricity, not the mere presence of the magnet. This is the principle behind every generator.",
  ],
  "elecfig-ch06_03": [
    "This shows that the DIRECTION of the induced EMF depends on the direction of the motion. Moving the coil one way over the magnet deflects the meter one way; moving it the opposite way deflects it the other way.",
    "So reversing the motion reverses the induced voltage — which is exactly why a loop spinning in a field produces alternating current (AC), swinging positive then negative each half-turn.",
    "Faster motion also gives a bigger deflection, showing the EMF grows with the speed of the movement.",
  ],
  "elecfig-ch06_04": [
    "This is Fleming's right-hand rule, used to find the direction of the induced current in a GENERATOR. Hold the thumb and first two fingers of the right hand at right angles.",
    "The thuMb points the way the conductor Moves, the First finger points along the Field (N to S), and the seCond finger then gives the direction of the induced Current.",
    "It is the generator counterpart of the left-hand (motor) rule — right hand for generating electricity, left hand for producing motion.",
  ],
  "elecfig-ch06_05": [
    "This shows the three ways to get a bigger induced EMF from a generator. First, move the conductor through the field FASTER (spin it quicker).",
    "Second, make the magnetic FIELD stronger. Third, use MORE turns of wire on the coil, so more conductors cut the flux.",
    "In a real generator these become: higher RPM, a stronger field current, and more armature windings — all of which raise the output voltage.",
  ],
  "elecfig-ch06_08": [
    "This shows how a DC generator gets direct current out of a rotating loop. The ends of the loop connect to a split-ring commutator — a single ring split into two halves (A and B).",
    "As the loop spins, each brush stays in contact with whichever half is on its side. At the instant the loop's current would reverse, the split ring swaps the connections too, so the current in the external LOAD always flows the same way.",
    "The commutator is therefore a mechanical rectifier: AC is generated in the loop, but DC comes out to the load.",
  ],
  "elecfig-ch06_09": [
    "This shows the output of a single-loop DC generator over one revolution. Because the commutator flips the connection every half-turn, the output never goes negative — the would-be negative half is turned positive.",
    "The result is a series of positive humps (peaking at 90° and 270°, zero at 0°, 180°, 360°): direct current, but very 'lumpy' or pulsating.",
    "This pulsating DC is not smooth enough for most uses, which is why real generators use many coils (see the next figure).",
  ],
  "elecfig-ch06_10": [
    "This shows a series-wound DC generator, where the field coil is in series with the armature and the load, so all the current flows through the field.",
    "Its characteristic load curve rises steeply as load current increases (more current = stronger field = more volts) until the iron reaches its field saturation point and the voltage levels off.",
    "Because its output voltage changes a lot with load, a pure series generator is rarely used for aircraft supplies on its own.",
  ],
  "elecfig-ch06_11": [
    "This compares the output of a single-coil and a multi-coil armature. The single coil gives the lumpy pulsating DC seen earlier, dropping to zero between each hump.",
    "With MULTIPLE coils set at angles around the armature, each produces its own hump at a slightly different time. The commutator always connects to whichever coil is giving the highest voltage, so the humps overlap.",
    "The overlapping outputs add up to an almost flat, smooth DC (the dotted top line) with only a small ripple — which is what a real generator delivers.",
  ],
  "elecfig-ch06_13": [
    "This shows a compound-wound DC generator, which has BOTH a shunt field (across the armature) and a series field (in line with the load), plus a voltage control.",
    "Combining the two field windings cancels out their opposite tendencies: the shunt keeps the voltage up at light load and the series props it up as load increases, giving the nearly FLAT characteristic load curve shown.",
    "A steady output voltage from no-load to full-load is exactly what an aircraft bus needs, so the compound generator (with regulation) is a common choice.",
  ],
  "elecfig-ch06_14": [
    "This contrasts a DC generator with an alternator. In the DC generator the armature (where the power is made) ROTATES in a stationary field, and a commutator with brushes takes the power off and rectifies it to DC.",
    "In the alternator the arrangement is turned inside-out: the FIELD rotates (fed through small slip rings) while the armature is STATIONARY, so the heavy power winding has no sliding contacts. A separate rectifier turns its AC into DC.",
    "The alternator is lighter, more reliable and copes with high speed far better — because the big current is taken from fixed windings, not through brushes and a commutator.",
  ],
  "elecfig-ch06_15": [
    "This shows a carbon-pile voltage regulator. A stack of carbon washers (the carbon pile) sits in series with the generator's field coil; squeezing the stack lowers its resistance, loosening it raises it.",
    "A control coil senses the generator's output voltage (the 14 V sample). If the voltage rises, the coil pulls harder and, against a spring, eases the squeeze on the pile — raising its resistance, cutting the field current and bringing the voltage back down.",
    "By constantly adjusting the field current this way, the regulator holds the output voltage steady regardless of engine speed or electrical load.",
  ],
  "elecfig-ch06_16": [
    "This shows a vibrating-contact regulator with two units: a voltage regulator and a current regulator, each with a shunt and a series winding and a spring-loaded contact.",
    "The voltage regulator senses the 14 V output and rapidly opens and closes its contacts to switch a resistor in and out of the field circuit, holding the voltage constant. The current regulator does the same to stop the generator exceeding its maximum current.",
    "Spring adjusters set the exact voltage and current points; together the two units protect the generator and keep the bus voltage steady.",
  ],
  "elecfig-ch06_17": [
    "This simple circuit shows a generator, the battery and the loads all connected to a common bus-bar. The generator (marked +) supplies the bus; the battery sits across the bus in parallel.",
    "When the generator output is higher than the battery voltage, it powers the loads AND charges the battery. If the generator fails or output drops, the battery takes over and feeds the loads from the same bus.",
    "The bus-bar is just the common distribution point where the sources (generator, battery) and the loads all meet.",
  ],
  "elecfig-ch06_18": [
    "This shows two DC generators running in PARALLEL to share the aircraft's electrical load, each feeding the main bus through its own line contactor.",
    "For them to share fairly, their voltages must be matched. An equalizing circuit — equalizing contacts and an equalizing coil linking the two voltage-control coils — senses any imbalance and nudges one generator's field so neither hogs the load or drives current into the other.",
    "Variable resistors and the voltage-control coils trim each generator's field; the line contactors connect or isolate a generator from the bus. This keeps the two 14 V generators sharing the load evenly.",
  ],

  // ─── Electrics — DC motors & actuators (A.1.3) ───
  "elecfig-ch07_01": [
    "This is Fleming's left-hand rule, used to find which way a MOTOR turns. Hold the thumb and first two fingers of the left hand at right angles.",
    "The First finger points along the Field (N to S), the seCond finger points the way the Current flows, and the thuMb then shows the direction of the resulting Motion (force on the conductor).",
    "Left hand for motors (motion out), right hand for generators (current out) — a handy way to keep the two rules apart.",
  ],
  "elecfig-ch07_02": [
    "This shows the heart of a DC motor. A current-carrying loop sits in the magnetic field between the poles; the force on its two sides (one up, one down) makes it rotate — just the motor principle applied to a loop.",
    "The right-hand view shows a real armature with several coils and a commutator split into segments (1, 2, 3, 4). Current is fed in through brushes to whichever coils are best placed to give turning force.",
    "As the armature turns, the commutator keeps switching the current to the next coils, so the push is continuous and the motor spins smoothly.",
  ],
  "elecfig-ch07_03": [
    "This cutaway shows how a DC motor is built. The armature (the rotating winding) is carried on bearings — a roller bearing at one end, a ball bearing at the other.",
    "The field coils are wound on pole pieces fixed inside the case to provide the magnetic field. Current reaches the spinning armature through carbon brushes, held against the commutator by springs in brush boxes.",
    "A fan on the shaft cools the motor, and a pulley (or shaft) takes the drive out to the load. These are the parts to be able to name for the exam.",
  ],
  "elecfig-ch07_04": [
    "This shows why a starter motor needs a slow-start resistor. At the instant of starting the motor is not yet turning, so it generates no back-EMF, and a very large inrush current would flow.",
    "A resistor is put in series to limit this starting current. Once the motor is up to speed, a centrifugal switch (or a time switch) closes and shorts the resistor out, so the motor then gets the full voltage.",
    "This protects the battery and the motor from the heavy surge that would otherwise occur at switch-on.",
  ],
  "elecfig-ch07_05": [
    "This is a series-wound DC motor: the field coil is in series with the armature, so all the motor current flows through the field.",
    "That gives it a very high starting torque (lots of current at start means a strong field), which is why series motors are used for starter motors. The downside is that its speed varies a lot with load, and off-load it can over-speed dangerously.",
    "So a series motor is ideal for a job needing a big initial pull against a heavy load, like turning an engine over.",
  ],
  "elecfig-ch07_06": [
    "This is a shunt-wound DC motor: the field coil is connected in PARALLEL (across) the armature rather than in series.",
    "Because the field current is almost constant, the motor runs at a fairly steady speed whatever the load — it does not run away off-load like a series motor.",
    "That steady speed makes the shunt motor the choice where a constant running speed matters more than a huge starting torque.",
  ],
  "elecfig-ch07_07": [
    "This shows a starter-generator — one machine that does two jobs. In MOTOR mode it is fed from the aircraft supply and turns the engine to start it (using its series field for high torque).",
    "Once the engine is running, the machine is switched to GENERATOR mode: now driven by the engine, it generates electrical power, with a voltage regulator controlling its shunt field to hold the output steady.",
    "Combining the starter and the generator in one unit saves weight and space, which is why it is common on turbine aircraft.",
  ],
  "elecfig-ch07_08": [
    "This is the control circuit of a reversible actuator motor, run from the 28 V DC bus. A control switch selects OPEN or SHUT, feeding current into the motor so it drives one way or the other.",
    "Limit switches cut the power when the actuator reaches the fully-open or fully-shut position, so it cannot over-run and damage itself. A brake coil holds it in place once stopped.",
    "Indicator lights (OPEN / SHUT) tell the crew which end the actuator has reached, confirming the item has actually moved.",
  ],
  "elecfig-ch07_09": [
    "This shows a complete rotary electric actuator. The motor drives through a reduction gear (to turn fast rotation into slow, powerful rotation) and a clutch to the output drive.",
    "Separate OPEN and CLOSE brake coils stop and hold the actuator at each end. Open and close limit switches, operated as the output reaches its travel limits, cut the motor; a selector switch chooses the direction.",
    "A magnetic 'doll's eye' position indicator shows OPEN, SHUT or (striped) in-transit, so the crew always know where the actuator is. This is the standard way a valve or flap is driven electrically.",
  ],
  "elecfig-ch07_10": [
    "This is a linear electric actuator — it produces a straight push/pull instead of rotation. The motor drives through a reduction gear and clutch to a screw jack: a rotating screw turns a drive nut, which moves the output drive in or out.",
    "A selector switch chooses IN or OUT, energising the matching motor winding. A limit-switch operating arm trips the IN or OUT limit switch at the end of travel to stop the motor.",
    "Screw-jack actuators are used to move things that need a strong straight-line force, such as a trimmable stabiliser or a flap screw.",
  ],
  "elecfig-ch07_11": [
    "This shows magnetic position indicators, the little displays that confirm a valve or actuator's position. In the 'doll's eye' type, a magnet assembly on a spindle is turned by a coil; it shows a striped face for NO POWER, then OPEN or SHUT as it is driven.",
    "The prism type works the same way but flips small prisms to spell OPEN or SHUT (or show a striped 'no power' flag) in a window.",
    "Both are magnetically operated, so they fall to the striped 'no-power' indication if the supply is lost — telling the crew the indication can no longer be trusted rather than giving a false reading.",
  ],

  // ─── Electrics — Distribution, bus-bars & meters (A.1.3) ───
  "elecfig-ch08_01": [
    "This shows the basic idea of power distribution. The generator feeds a single heavy conductor called the bus-bar, and every load taps off the bus-bar in parallel.",
    "Because the loads are in parallel, each gets the full bus voltage and can be switched on or off without affecting the others. The bus-bar is simply the common meeting point for the supply and all the loads.",
    "This is a two-wire system: current flows out to each load and returns on a separate wire.",
  ],
  "elecfig-ch08_02": [
    "This shows an earth-return (single-pole) distribution system. Instead of running a second return wire from every load back to the generator, each load returns its current through the metal airframe, which is used as the common negative.",
    "The generator's negative is also connected to the airframe, so the structure completes every circuit. Only one 'live' wire is needed per load.",
    "This saves a large amount of wire and weight, which is why almost all aircraft use earth-return — but it makes good bonding of the structure essential.",
  ],
  "elecfig-ch08_03": [
    "This shows a reverse-current cut-out, which protects the generator. It has a series (current) coil carrying the main current and a shunt (voltage) coil sensing the generator voltage; together they work sprung contacts.",
    "Normally the generator volts are higher than the battery's, so current flows the normal way (generator → bus) and the contacts are held closed. If the generator output falls below the battery voltage, current tries to flow BACKWARDS (battery → generator).",
    "That reverse current reverses the magnetic pull and snaps the contacts open, disconnecting the generator so the battery cannot drive it like a motor and drain itself.",
  ],
  "elecfig-ch08_04": [
    "This shows how a moving-coil meter works — the movement behind most ammeters and voltmeters. A coil is pivoted in the field of a permanent magnet, with a pointer attached and a hairspring holding it at zero.",
    "When current flows through the coil it becomes an electromagnet; its field adds to the permanent field on one side and opposes it on the other, so the coil is turned (just the motor principle). The pointer swings across the scale.",
    "The more current, the stronger the turning force and the further the pointer moves, until the hairspring balances it — giving a reading proportional to current.",
  ],
  "elecfig-ch08_05": [
    "This compares two ammeter scales. A left-zero ammeter (a 'load meter') starts at zero on the left and reads upwards; it shows how much current a generator or circuit is supplying.",
    "A centre-zero ammeter has zero in the middle, with CHARGE (+) to one side and DISCHARGE (−) to the other. It is wired in the battery line to show whether the battery is being charged by the generator or is discharging into the loads.",
    "So the scale tells you the meter's job: left-zero for how much load is being drawn, centre-zero for the direction of battery current.",
  ],
  "elecfig-ch08_07": [
    "This shows an aircraft battery assembly in its container. Heavy terminal connectors and a connector bar link the cells; a single Cannon plug/receptacle makes the whole battery connect or disconnect quickly with one plug.",
    "The vented, gasketed cover (with a locking ring) contains any spillage and lets gas escape through a vent stopper, while a carrying handle allows the battery to be removed easily for servicing.",
    "Packaging the battery this way makes it quick to swap, keeps corrosive electrolyte contained, and gives a reliable high-current connection to the aircraft.",
  ],
  "elecfig-ch08_08": [
    "This is a complete light-aircraft DC system on one page. The 14 V generator feeds through a load meter and a generator cut-out to the bus-bar, which supplies the loads; a voltage regulator and an overvoltage protection unit control and protect the output.",
    "The 12 V battery connects to the bus through the battery switch and a centre-zero ammeter, which shows whether it is charging or discharging. A voltmeter monitors bus voltage, and a red generator-failure warning light alerts the crew if the generator stops supplying.",
    "It shows how all the pieces studied separately — generator, regulator, cut-out, battery, meters and warning light — fit together around the bus-bar.",
  ],
  "elecfig-ch08_09": [
    "This is a fuller single-alternator light-aircraft system. From the bus-bar, fused feeders supply the alternator field, the starter circuit, lights and accessories (cabin light, cigar lighter), each protected by a circuit breaker of the stated rating.",
    "Key items: a master solenoid and starter solenoid switch the heavy currents; a voltage regulator and overvoltage protector control the alternator; a radio-interference capacitor suppresses noise; and an external-power solenoid/receptacle lets a ground cart power the aircraft.",
    "A master interlock battery-and-alternator switch, an ammeter and an ALT warning light complete the system — the realistic wiring behind the simpler block diagram.",
  ],

  // ─── Electrics — AC generation & properties (A.1.3) ───
  "elecfig-ch11_01": [
    "This shows a simple AC generator (alternator). A loop (armature) is spun in the magnetic field between the poles, and its ends connect to two continuous SLIP RINGS, each touched by a carbon brush.",
    "Unlike the split commutator of a DC generator, the slip rings never swap the connections — so as the loop turns, the output rises, falls, reverses and rises again, giving alternating current in the load.",
    "This is the basic machine behind all AC generation: slip rings (not a commutator) are the key to getting AC out.",
  ],
  "elecfig-ch11_04": [
    "This illustrates frequency — how many complete cycles the AC goes through each second, measured in hertz (Hz). The top trace shows two cycles in one second (2 Hz); the bottom shows eight cycles in the same second (8 Hz).",
    "A higher frequency simply means the waveform repeats more often. Aircraft AC systems commonly run at 400 Hz (far higher than the 50/60 Hz mains) because it lets transformers and motors be smaller and lighter.",
    "Frequency is set by how fast the generator spins and how many pole-pairs it has — which is why constant-frequency AC needs a constant-speed drive.",
  ],
  "elecfig-ch11_05": [
    "This labels the parts of an AC sine wave over one complete cycle (0° to 360°). The PEAK value (amplitude) is the maximum it reaches, positive and negative.",
    "The RMS (root-mean-square) value is 0.707 × the peak; it is the 'effective' value — the DC voltage that would give the same heating. This is why AC meters read RMS, and why '115 V AC' means 115 V RMS, not peak.",
    "One cycle is split into a positive half-cycle and a negative half-cycle; the time for one full cycle is the period, and the number of cycles per second is the frequency.",
  ],
  "elecfig-ch11_06": [
    "This shows a purely RESISTIVE AC circuit. The voltage and current rise and fall exactly together — they are 'in phase', reaching their peaks and zeros at the same instants.",
    "The phasor diagram (left) draws V and I as arrows pointing the same way (0° between them), confirming they are in step.",
    "In a resistor, all the power delivered does useful work (heat/light) — there is no phase shift to waste any, so a resistive load has a power factor of 1.",
  ],
  "elecfig-ch11_07": [
    "This shows mutual induction, the principle behind the transformer. With DC (top row), a current induces a magnetic field, but the second coil only sees a changing field — and so gets an induced current — at the instant the switch is turned ON or OFF; while the DC is steady, nothing is induced.",
    "With AC (bottom row), the current (and its field) is changing all the time, so it continuously induces a current in the second coil, half-cycle by half-cycle.",
    "This is why transformers work on AC but not on steady DC: they need a constantly changing field to keep inducing voltage in the second winding.",
  ],
  "elecfig-ch11_08": [
    "This shows self-inductance and back-EMF. When the current in a coil changes, the coil's own changing field induces a voltage in itself that OPPOSES the change (Lenz's law) — the 'back-EMF'.",
    "So a coil resists any change in the current through it: it is slow to let the current rise and slow to let it fall. The faster the current tries to change, the bigger the opposing back-EMF.",
    "This opposition to changing current is inductance, and it is why an inductor passes DC easily but chokes back rapidly changing or high-frequency AC.",
  ],
  "elecfig-ch11_09": [
    "This shows a purely INDUCTIVE AC circuit. Because the inductor's back-EMF opposes the change in current, the current cannot keep up with the voltage.",
    "The result, shown in both the phasor diagram and the waveforms, is that the current LAGS the voltage by 90° (a quarter of a cycle) — the voltage peaks first, then the current.",
    "The memory aid is 'CIVIL': in an inductor (L), V leads I — equivalently, I lags V by 90°.",
  ],
  "elecfig-ch11_12": [
    "This shows a purely CAPACITIVE AC circuit. A capacitor opposes a change in voltage, so the current flows first to charge it and the voltage builds up afterwards.",
    "The phasor diagram and waveforms show the current LEADS the voltage by 90° — the current peaks a quarter-cycle before the voltage.",
    "The memory aid 'CIVIL' again: in a Capacitor (C), I leads V — the opposite of an inductor. This is why L and C have opposite effects and can cancel.",
  ],
  "elecfig-ch11_13": [
    "This is the impedance triangle, which combines resistance and reactance. Resistance R is drawn along the base; the net reactance X (XL − XC) is drawn up the side at right angles.",
    "The hypotenuse is the impedance Z — the total opposition to AC — found by Pythagoras: Z = √(R² + (XL − XC)²). The angle of Z is the circuit's phase angle.",
    "Impedance (not just resistance) is what limits the current in an AC circuit: I = V ÷ Z.",
  ],
  "elecfig-ch11_14": [
    "This graph shows how reactance changes with frequency. Inductive reactance XL (red) increases as frequency rises (an inductor chokes high frequencies more). Capacitive reactance XC (blue) decreases as frequency rises (a capacitor passes high frequencies more easily).",
    "Where the two lines cross, XL = XC: this is the resonant frequency. At resonance the inductive and capacitive effects cancel, leaving only resistance, so the circuit's impedance is at a minimum (series) and current is maximum.",
    "Resonance is used in tuning circuits — selecting one frequency (a radio station, a filter) while rejecting others.",
  ],
  "elecfig-ch11_15": [
    "This shows TRUE (real) power. When voltage and current are in phase (a resistive load), multiplying them instant by instant gives a power curve (black) that is always positive.",
    "The average of that curve is the true power, found from RMS volts × RMS amps, measured in watts (or kW). This is the power that actually does useful work.",
    "Because both halves of the power curve are positive, energy flows steadily to the load — none is handed back to the supply.",
  ],
  "elecfig-ch11_17": [
    "This shows REACTIVE power. When current is 90° out of phase with voltage (a pure inductor or capacitor), the instantaneous power curve has equal positive and negative humps.",
    "Over a full cycle these cancel, so the average (true) power is ZERO — energy is just borrowed from the supply and handed straight back. This borrowed power is called reactive power, measured in VAR or kVAR.",
    "Reactive power does no useful work but it still flows in the wires, so it must be managed; the ratio of true power to total (apparent) power is the power factor.",
  ],

  // ─── Electrics — AC generators & paralleling (A.1.3) ───
  "elecfig-ch12_01": [
    "This shows the standard aircraft alternator layout: a rotating FIELD inside a stationary ARMATURE. The magnet (field) is spun by the engine while the output windings stay still around the outside.",
    "The cross-section and side views show the field fed with current (through small slip rings) and the output taken from the fixed armature winding.",
    "The big advantage of this 'inside-out' arrangement is that the heavy power current comes from fixed windings — only the small field current needs slip rings, so there is far less brush wear than a DC generator.",
  ],
  "elecfig-ch12_02": [
    "This is a single-phase alternator. One stator winding surrounds the rotating field; as the rotor's north and south poles sweep past the winding, they induce a single alternating voltage.",
    "That output feeds the bus-bar and the load. With just one winding there is only one phase — one sine wave.",
    "Single-phase is simple but gives a pulsating power delivery, which is why larger aircraft systems use three phases instead.",
  ],
  "elecfig-ch12_03": [
    "This is a three-phase alternator. Three separate stator windings are spaced 120° apart around the rotating field, so each produces its own sine wave but one-third of a cycle (120°) after the previous one.",
    "The result is the three overlapping waveforms (Phase A, B, C) shown below. Together they deliver power far more smoothly and evenly than a single phase.",
    "Three-phase also lets the same generator deliver more power for its size, which is why it is the standard for large-aircraft AC systems.",
  ],
  "elecfig-ch12_04": [
    "This shows the two ways to connect a three-phase winding. In STAR (Y) the three windings join at a common point (the neutral), and the three line wires come off the free ends — giving a neutral/earth point.",
    "In DELTA the three windings are joined end-to-end in a triangle, with a line taken from each junction — there is no neutral.",
    "The choice matters because star and delta give different relationships between the line and phase voltages and currents (shown in the next two figures).",
  ],
  "elecfig-ch12_05": [
    "This shows the star (Y) connection's values. Because each line wire connects straight to one winding, the LINE current equals the PHASE current.",
    "But the voltage between any two lines is made of two windings in series (at 120°), so the LINE voltage = √3 × the PHASE voltage. The neutral point gives a reference for the phase voltages.",
    "So in star you get a higher line voltage (e.g. 200 V line from 115 V phase) while the current stays equal to the phase current.",
  ],
  "elecfig-ch12_06": [
    "This shows the delta connection's values — the mirror image of star. Because each pair of lines is connected straight across one winding, the LINE voltage equals the PHASE voltage.",
    "But each line wire draws current from two windings, so the LINE current = √3 × the PHASE current. There is no neutral.",
    "So delta gives a higher line current for the same phase current, while the line voltage equals the phase voltage — the opposite trade-off to star.",
  ],
  "elecfig-ch12_07": [
    "This shows how an alternator's output voltage is controlled. The rotating field is fed with excitation current through slip rings and brushes; the more field current, the higher the output voltage.",
    "A voltage regulator senses the output (voltage sample input) and adjusts a variable resistance in the field circuit to hold the voltage steady as speed and load change. A rectifier and TRU (transformer-rectifier unit) also provide the 28 V DC bus.",
    "So the regulator controls AC output voltage by controlling field current — just as it does on a DC generator, but feeding the rotating field.",
  ],
  "elecfig-ch12_08": [
    "This is a brushless alternator, which removes the slip rings and brushes entirely. A small exciter generator is built on the same shaft; its output is rectified by a ROTATING RECTIFIER (diodes spinning with the shaft) and fed straight into the main generator's field.",
    "The voltage regulator now controls only the small, stationary exciter field; everything that needs to reach the rotating main field goes through the shaft-mounted rectifier, so no sliding contacts carry the field current.",
    "With no brushes to wear or spark, the brushless alternator is more reliable and needs less maintenance — the standard for modern aircraft.",
  ],
  "elecfig-ch12_10": [
    "This shows the conditions that must be met before two AC generators can be connected in parallel (synchronised). Each pair of traces compares Gen 1 and Gen 2.",
    "The first three cases are rejected (red X): the frequencies differ, OR the phase sequence differs, OR the voltages differ — connecting in any of these states would cause huge circulating currents and damage.",
    "Only the last case is accepted (green tick): frequency, voltage AND phase sequence all match. All three must be correct before the generator breaker is allowed to close.",
  ],
  "elecfig-ch12_12": [
    "This shows how the REAL (working, kW) load is shared between paralleled AC generators. An error detector on each generator compares its share of the load current and feeds a magnetic amplifier.",
    "The output drives each engine's speed governor: real load depends on how hard each engine is driving, so to make a generator take more (or less) load, its governor trims the engine speed/torque slightly.",
    "This keeps all three generators carrying an equal share of the real load, rather than one doing all the work.",
  ],
  "elecfig-ch12_13": [
    "This shows how the REACTIVE (kVAR) load is shared between paralleled AC generators. Here a mutual reactor and error detector on each generator sense its share of the reactive current.",
    "The correction is fed to each generator's FIELD circuit: reactive load depends on excitation, so trimming a generator's field current changes how much reactive load it takes.",
    "So real load is balanced through the engine governors (speed) and reactive load through the field (excitation) — two separate loops keeping the generators sharing fairly.",
  ],

  // ─── Electrics — AC distribution system (A.1.3) ───
  "elecfig-ch13_01": [
    "This shows how the AC power is routed around a twin-engine aircraft. Each engine drives a constant-speed-drive (CSD) generator, and the APU generator can supply too; three-phase cables (three colours) run from each through an engine/wing disconnect.",
    "The cables reach the generator breakers and line current transformers near the nose, then the flight-deck circuit-breaker panel, and on to the load bus-bars that feed the aircraft.",
    "The line current transformers around the cables sense the current in each phase — used by the protection system to detect faults and unbalanced loads.",
  ],
  "elecfig-ch13_02": [
    "This is the heart of a split-bus electrical system. Generator No 1 feeds the No 1 AC bus (through GCB 1) and Generator No 2 feeds the No 2 AC bus (through GCB 2); a bus-tie breaker can join the two, and the APU or external power can feed either side.",
    "Transformer-rectifier units (TRUs) convert AC to 28 V DC for the DC buses; a static inverter (INV) can make AC from the battery to keep the AC essential bus alive. A change-over relay selects the AC essential bus's source.",
    "The DC side splits into DC essential and DC non-essential buses, a battery bus and a vital bus, linked by relays — so the most important services keep power even when a generator or TRU fails.",
  ],
  "elecfig-ch13_03": [
    "This is the overhead electrical control panel for a twin-generator system. Each switch-light lets the crew control and monitor a source: IDG disconnect, generator control (GCB), APU generator, bus tie and external power.",
    "FAULT/OFF legends in the buttons warn of a problem and show what has been switched off; battery voltages and the AC essential bus alternate-supply selector are also here.",
    "From this one panel the crew can reconfigure the whole electrical system — isolating a faulty generator, tying the buses, or bringing in the APU or external power.",
  ],
  "elecfig-ch13_04": [
    "This is the electrical system display (ECAM/EICAS) page. It shows, at a glance, the battery volts and amps, the DC bus bars, the TRU outputs (volts and amps), the AC bus bars, and each generator's output (percent load, voltage and frequency).",
    "It also shows IDG oil temperature and overall data like TAT/SAT and gross weight. Green normally means a healthy, connected item.",
    "Having the whole electrical state on one page lets the crew confirm the system is configured and working correctly, and quickly spot a failed generator, TRU or bus.",
  ],
  "elecfig-ch13_06": [
    "This is the electrical control panel for a large four-generator aircraft. Each of the four engine generators has its own column: a bus-tie (AUTO/ISLN) control, a generator-control breaker (GCB ON/OFF) and a drive-disconnect switch.",
    "Across the top are the shared controls: standby power (AUTO/OFF/BATT), the utility and galley power switches, the battery, the two APU generators and the two external-power inputs.",
    "It lets the crew manage four generators and the APU/external sources together — isolating any faulty generator and keeping the essential buses supplied.",
  ],
  "elecfig-ch13_07": [
    "This is the synoptic (schematic) display for the four-generator system. It mirrors the hardware: the four load bus-bars, each fed via its generator-control breaker, the bus-tie breakers (BTB) and the synchronising bus (SSB) that can link them.",
    "It shows the APU and external-power inputs, GCB indications (open/closed), the utility and galley loads on each bus, and generator drive-fault warnings (high temperature / low pressure).",
    "The crew read it to see how the system is currently connected and to confirm that breakers have opened or closed as commanded.",
  ],

  // ─── Electrics — Transformers & rectifiers (A.1.3) ───
  "elecfig-ch14_01": [
    "This shows how a transformer is built. Two separate coils — a primary and a secondary winding — are wound on a shared core made of thin, laminated soft-iron sheets.",
    "AC fed into the primary creates a constantly changing magnetic flux in the core; the core guides that flux through the secondary, where it induces an AC output (mutual induction). The two windings are not electrically joined — energy passes across magnetically.",
    "The core is laminated (thin insulated layers) to cut down wasteful eddy currents, and it must be AC: steady DC would make a constant flux that induces nothing in the secondary.",
  ],
  "elecfig-ch14_02": [
    "This shows the two ways a transformer changes voltage, set by the turns ratio. In a STEP-UP transformer the secondary has MORE turns than the primary, so the output voltage is higher than the input.",
    "In a STEP-DOWN transformer the secondary has FEWER turns, so the output voltage is lower. The rule is Vs/Vp = Ns/Np.",
    "Because the power is (almost) unchanged, stepping the voltage UP steps the current DOWN, and vice-versa — you cannot get more power out than you put in.",
  ],
  "elecfig-ch14_03": [
    "This shows an autotransformer, which uses a SINGLE tapped winding instead of two separate ones. Part of the winding is shared between the input and the output.",
    "Tapping off fewer or more turns gives a step-down or step-up output, just like an ordinary transformer, following the same turns-ratio rule.",
    "An autotransformer is lighter and cheaper because it has only one winding, but primary and secondary are electrically connected — so it gives no electrical isolation between input and output.",
  ],
  "elecfig-ch14_04": [
    "This shows a half-wave rectifier — the simplest way to turn AC into DC. A single diode acts as a one-way valve: it lets current through on the positive half-cycle but blocks it on the negative half-cycle.",
    "So the output is a series of positive humps with gaps where the negative halves have been removed — direct current (always positive), but very lumpy and only present half the time.",
    "It is simple but wasteful (half the input is thrown away), so it is used only for small, undemanding loads.",
  ],
  "elecfig-ch14_05": [
    "This shows a full-wave bridge rectifier, which uses FOUR diodes arranged in a diamond. On each half-cycle, two of the diodes conduct and route the current to the output the same way round.",
    "So BOTH halves of the AC are used — the negative half is flipped up to positive — giving twice as many humps as a half-wave rectifier and a smoother, more continuous DC output.",
    "Using the whole input makes it far more efficient, which is why bridge rectifiers are the standard choice.",
  ],
  "elecfig-ch14_06": [
    "This shows a three-phase full-wave rectifier, the heart of a transformer-rectifier unit (TRU). Six diodes rectify all three phases (A, B, C), each pair handling the line voltage between two phases.",
    "Because the three phases peak at different times, their rectified humps overlap and fill in each other's gaps — so the DC output at the top is very smooth, with only a small ripple and no need for heavy smoothing.",
    "This is how an aircraft's 115 V AC is turned into smooth 28 V DC: a transformer steps the voltage down and this six-diode bridge rectifies it in the TRU.",
  ],

  // ─── Electrics — AC motors (A.1.3) ───
  "elecfig-ch15_01": [
    "This shows how three-phase AC creates a ROTATING magnetic field — the key to the AC motor. Three stator windings (A, B, C) are spaced 120° apart; the waveforms at the top show their currents peaking one after another.",
    "The five snapshots (positions 1–5) show that as each phase rises and falls in turn, the combined north–south field of the stator steadily sweeps round the inside of the motor.",
    "So with no moving part in the stator, the magnetic field itself rotates — and that rotating field is what will drag the rotor round.",
  ],
  "elecfig-ch15_02": [
    "This shows a three-phase induction motor. The stator (left) carries the three windings that make the rotating field. The rotor (right) is a 'squirrel cage': heavy copper bars joined at each end by end rings, with no windings and no brushes.",
    "The rotating stator field sweeps across the rotor bars and induces currents in them; those currents create their own field, which is dragged round by the stator field — so the rotor turns and follows it.",
    "The rotor always lags the field a little (this 'slip' is what keeps inducing current). With no brushes or slip rings to wear out, the squirrel-cage motor is simple, rugged and reliable — ideal for aircraft pumps and fans.",
  ],

  // ─── Electrics — Semiconductors & electronics (A.1.3) ───
  "elecfig-ch16_01": [
    "This revisits the atom as the basis of electronics. The nucleus holds protons (positive) and neutrons (no charge); electrons (negative) orbit in shells around it.",
    "It is the electrons in the outer shell that matter for electricity — whether they are free to move (a conductor) or tightly held (an insulator).",
    "Semiconductors sit in between, and electronics is all about controlling how easily these outer electrons can move.",
  ],
  "elecfig-ch16_02": [
    "This shows a pure semiconductor crystal, such as silicon. Each atom has four outer electrons and shares them with its neighbours in covalent bonds, so every atom ends up with a stable set of eight shared electrons.",
    "Because all the electrons are locked into bonds, pure silicon hardly conducts at all — it is neither a good conductor nor a good insulator.",
    "To make it useful we deliberately add tiny amounts of other elements ('doping'), which is what the next figures show.",
  ],
  "elecfig-ch16_03": [
    "This shows N-type doping. An impurity atom with FIVE outer electrons (+5, pentavalent) replaces a silicon atom. Four of its electrons form bonds with neighbours, but the fifth has no bond to join.",
    "That spare electron is free to move through the crystal, so it can carry current. Because the free carriers are negative electrons, this is called N-type ('negative') material.",
    "Adding these donor atoms turns the near-insulator into a useful conductor whose current is carried by free electrons.",
  ],
  "elecfig-ch16_04": [
    "This shows P-type doping — the opposite of N-type. An impurity with only THREE outer electrons (+3, trivalent) replaces a silicon atom. It can form only three of the four bonds, leaving a gap.",
    "That gap is a 'hole' — a missing electron. A nearby electron can jump into it, which moves the hole along, so the hole behaves like a positive carrier of current.",
    "Because the carriers act positive, this is P-type ('positive') material. P-type and N-type together make the diodes and transistors of electronics.",
  ],
  "elecfig-ch16_05": [
    "This shows what happens when P-type and N-type are joined — a PN junction. At the boundary, free electrons from the N side fill holes on the P side, leaving a thin region with no free carriers: the DEPLETION LAYER.",
    "This leaves a small built-in voltage across the junction, the BARRIER POTENTIAL, which opposes further flow (about 0.6 V for silicon).",
    "This junction is the basis of the diode: whether current can cross depends on which way an external voltage pushes against this barrier.",
  ],
  "elecfig-ch16_06": [
    "This shows the two ways to connect a battery across a PN junction. In REVERSE bias (battery + to the N side), the voltage pulls the carriers away from the junction, so the depletion layer gets WIDER and almost no current flows — the diode blocks.",
    "In FORWARD bias (battery + to the P side), the voltage pushes carriers towards the junction; once it overcomes the barrier potential, the depletion layer collapses and current flows freely — the diode conducts.",
    "So the same junction either blocks or conducts depending on the direction of the applied voltage.",
  ],
  "elecfig-ch16_07": [
    "This shows a diode: a single PN junction with two leads, and its circuit symbol — a triangle (arrow) pointing to a bar.",
    "The diode only lets conventional current flow in the direction the arrow points (from P, the anode, to N, the cathode). Push current the other way and it blocks.",
    "This one-way behaviour is why diodes are used to rectify AC into DC, protect circuits against reverse polarity, and steer current where it is wanted.",
  ],
  "elecfig-ch16_08": [
    "This shows the transistor, made of three doped layers. An NPN transistor is a thin P layer between two N layers; a PNP is a thin N layer between two P layers. The three connections are the emitter, the base (the thin middle) and the collector.",
    "The circuit symbols differ only by the arrow direction on the emitter (pointing out for NPN, in for PNP), which shows the direction of conventional current.",
    "A transistor is essentially two PN junctions back-to-back, and the thin base in the middle is what lets a small signal control a large current.",
  ],
  "elecfig-ch16_09": [
    "This shows how a transistor works as a switch. With no (or reverse) bias on the base, the collector–base junction is reverse-biased and blocks, so no current flows through the transistor — it is OFF ('not conducting').",
    "Apply a small forward bias voltage to the base and the transistor turns ON: a large current now flows from collector to emitter, shown by the meter reading. A small base current has switched a big main current.",
    "This control of a large current by a small one is the basis of both amplifiers (smooth control) and digital electronics (fully on/off switching).",
  ],

  // ─── Electrics — Logic gates (A.1.3) ───
  "elecfig-ch17_01": [
    "This shows an AND gate. Its output C is 1 (on) ONLY when both inputs A AND B are 1 — the truth table shows 1 in the last row only.",
    "The switch analogy is two switches in SERIES: the lamp lights only if the first switch AND the second switch are both closed. One open switch breaks the circuit.",
    "So AND means 'all conditions must be met' — useful where something may only happen when several things are true at once.",
  ],
  "elecfig-ch17_02": [
    "This shows an OR gate. Its output C is 1 whenever A OR B (or both) is 1 — the truth table is 0 only when both inputs are 0.",
    "The switch analogy is two switches in PARALLEL: the lamp lights if either switch is closed, because either path completes the circuit.",
    "So OR means 'any one condition is enough' — for example a warning that comes on if any of several sensors trips.",
  ],
  "elecfig-ch17_03": [
    "This shows a NOT gate (inverter). It has one input and one output, and the output is always the OPPOSITE of the input: 0 becomes 1, and 1 becomes 0.",
    "The relay analogy uses normally-closed contacts: energising the relay (input 1) OPENS the circuit and turns the lamp off (output 0), and vice-versa.",
    "The small circle on the symbol means 'invert'. The NOT gate is the building block that turns AND into NAND and OR into NOR.",
  ],
  "elecfig-ch17_04": [
    "This shows a NAND gate — an AND gate followed by a NOT (note the small circle on the output). Its output is the inverse of AND: 0 only when BOTH inputs are 1, and 1 in every other case.",
    "So where AND gives 0,0,0,1 for the four input combinations, NAND gives 1,1,1,0.",
    "NAND is special because any logic function at all can be built from NAND gates alone, which makes it a very common building block in digital circuits.",
  ],
  "elecfig-ch17_05": [
    "This shows a NOR gate — an OR gate followed by a NOT. Its output is the inverse of OR: 1 ONLY when both inputs are 0, and 0 otherwise.",
    "So where OR gives 0,1,1,1, NOR gives 1,0,0,0.",
    "Like NAND, NOR is a 'universal' gate — any logic circuit can be made entirely from NOR gates.",
  ],
  "elecfig-ch17_06": [
    "This shows an exclusive-OR (XOR) gate. Its output is 1 ONLY when the two inputs are DIFFERENT (one 1 and one 0), and 0 when they are the same (both 0 or both 1).",
    "The truth table is 0,1,1,0 — unlike a plain OR, it does NOT give 1 when both inputs are 1.",
    "XOR is used wherever 'these two should differ/agree' matters — for example comparing bits, adding binary numbers, or detecting a disagreement between two sources.",
  ],

  // ─── Airframes — Flight Controls: balance, tabs & trim (A.1.2) ───
  "atgfig-ch08_fig_04": [
    "This shows set-back hinge (inset hinge) aerodynamic balance. The hinge line is moved back from the control's leading edge, so part of the surface sits ahead of the hinge.",
    "When the surface deflects, the airflow pushing on the part ahead of the hinge creates a force F acting at a small distance d in front of the hinge. This force helps to move the surface in the direction the pilot wants, reducing the effort needed on the controls.",
    "The designer picks how far to set the hinge back carefully: too little and the controls stay heavy, too much and the balance 'over-balances', making the surface want to deflect on its own.",
  ],
  "atgfig-ch08_fig_05": [
    "This profile shows a horn balance. A portion of the control surface — the 'horn' — is extended forward of the hinge line, usually at the tip of the surface.",
    "When the surface moves, airflow acting on this forward area produces a force that assists the movement, lightening the stick or pedal force in the same way as a set-back hinge.",
    "Horn balances are simple and effective and are often seen on rudders and elevators of light and older aircraft.",
  ],
  "atgfig-ch08_fig_06": [
    "This shows internal (shrouded) balance using a balance seal. Part of the control surface extends forward of the hinge into a sealed bay inside the fixed surface, divided by a flexible balance seal.",
    "When the control deflects, a pressure difference builds up across the seal in the balance bay. This pressure acts on the forward extension to help move the surface, giving aerodynamic balance without any part sticking out into the airflow — so there is no extra drag.",
    "Because it is hidden inside the wing or tail, internal balance is common on fast jet transport aircraft where a horn would cause drag.",
  ],
  "atgfig-ch08_fig_09": [
    "This graph compares stick force against airspeed with and without a spring tab. Without the spring tab, the force the pilot must hold rises steeply with speed, because control-surface loads grow with the square of speed.",
    "With a spring tab fitted, the tab deflects more as the loads rise, adding more aerodynamic assistance exactly when it is needed. The result is the flatter dashed line — the stick force still increases, but much more gently at high speed.",
    "A spring tab therefore gives light, manageable controls across the speed range, while still letting the pilot feel a sensible increase in force as speed builds.",
  ],
  "atgfig-ch08_fig_12": [
    "These 3D views show the main ways a control surface is balanced. Top left is a horn balance — area carried forward of the hinge at the tip. Top right is an inset/shrouded hinge, with the balance area built into the fixed surface.",
    "The lower two views show a set-back hinge with the surface area ahead of the hinge line, and a mass balance weight carried on an arm below and ahead of the hinge.",
    "Aerodynamic balances (horn, inset, set-back) reduce the pilot's effort; the mass balance weight is different — it is there to move the surface's centre of gravity onto or ahead of the hinge to prevent flutter, not to lighten the controls.",
  ],
  "atgfig-ch08_fig_14": [
    "This shows the two common positions for air brakes (speed brakes). A fuselage-mounted air brake is a panel in the side or belly of the fuselage that hinges out into the airflow.",
    "A wing-mounted air brake is a panel on the wing (often the same panels used as spoilers) that is raised into the airflow.",
    "Both add drag to slow the aircraft or increase the rate of descent without changing attitude. Fuselage air brakes keep the disturbed air away from the wing and tail; wing air brakes also spoil some lift, which can be useful on the approach.",
  ],
  "atgfig-ch08_fig_17": [
    "This shows a variable-incidence (trimmable) tailplane, drawn before and after trimming. Instead of using a small trim tab, the whole horizontal stabiliser is pivoted and its angle of incidence is changed.",
    "Input from the trim control drives a screwjack — the trim jack — that raises or lowers the leading edge of the tailplane, setting a new angle. This changes the download or upload from the tail to balance the aircraft for the chosen speed.",
    "A moving tailplane gives a very powerful and drag-free trim, which is why it is used on most jet transports. Because it is so powerful, a runaway is serious, so the trim system has safeguards and a clear cut-out for the crew.",
  ],
  "atgfig-ch08_fig_18": [
    "This shows trimming (and Mach trim) by transferring fuel between a front trim tank and a rear trim tank. The centre of gravity (CG) and the centre of pressure (CoP) must stay in a sensible relationship for the aircraft to be balanced.",
    "At high Mach numbers the centre of pressure moves aft, which would pitch the nose down. By pumping fuel rearward into the rear trim tank, the CG is moved aft to follow the CoP, keeping the aircraft in trim with no drag penalty.",
    "Moving fuel fore and aft is a very efficient way to trim a large aircraft because it needs no control-surface deflection, so it saves drag and fuel on long cruises.",
  ],
  "atgfig-ch08_fig_19": [
    "This shows trim controls grouped on the cockpit centre console. A small wheel or switch sets aileron trim (to hold the wings level) and a rotary knob sets rudder trim (to keep the aircraft in balance, for example with an engine out or in a crosswind).",
    "Putting these trims together on the centre console, within reach of both pilots, lets the crew fine-tune the aircraft's balance about all three axes from one place.",
    "Trimming removes the steady stick and pedal forces, so the pilot does not have to hold pressure continuously and can fly accurately with light control inputs.",
  ],

  // ─── Airframes — Flight Control Systems (A.1.2) ───
  "atgfig-ch07_fig_04": [
    "This shows a cable tensiometer clamped onto a control cable. Control runs that use steel cables must be kept at the right tension: too slack and the controls feel sloppy and lag, too tight and they are stiff and wear quickly.",
    "The tool works by pushing a central anvil against the cable while two outer anvils support it, bending the cable slightly. The force needed to do this depends on the cable tension, and is read off the dial. A conversion table turns the reading into cable tension for that cable size.",
    "Because cables expand and contract with temperature, the correct tension is set against the airframe temperature at the time, which is why rigging is always done with a tensiometer and a chart rather than by feel.",
  ],
  "atgfig-ch07_fig_05": [
    "This traces a typical cable control run from the cockpit to the control surface. The pilot's input moves a cable, which runs over pulleys and through fairleads to a quadrant — a grooved wheel that converts the pull of the cable into rotation.",
    "From the quadrant the movement passes through a bell crank, which changes the direction of the drive, and then along a push-pull rod to the control surface. A spring unit (bungee) can be fitted to give artificial feel, and a damper to smooth out any flutter or snatching.",
    "Mixing cables, quadrants and push-pull rods lets the designer route the controls around the structure, change direction, and get the right amount and sense of surface movement for a given stick or pedal input.",
  ],
  "atgfig-ch07_fig_08": [
    "This shows a wing fitted with Fowler flaps and spoilers, drawn in the take-off and the landing settings. A Fowler flap first slides rearwards, increasing the wing area, and then also deflects down, increasing the camber — so it adds a lot of lift for take-off with little drag, and a lot of lift and drag for landing.",
    "The gaps that open up between the flap segments are slots: they let fast air from under the wing flow over the top of the flap, re-energising the airflow so it stays attached at the steeper flap angles.",
    "The spoilers on the upper surface can be raised to dump lift and add drag. Used a little in flight they help control; raised fully on touchdown they spoil the lift so the wheels take the weight and the brakes bite.",
  ],
  "atgfig-ch07_fig_09": [
    "This shows the flap and slat position indicators the crew watch. One style is an electronic strip or dial reading flap angle; the other is an analogue pointer. Both tell the crew exactly where the surfaces are, because selecting a lever is not proof the surfaces have actually run.",
    "Separate indications, or disagreement lights, show if the left and right sides are not matched — an asymmetric (split) flap or slat condition, which is dangerous because it rolls the aircraft.",
    "Leading-edge slat position is shown too, often as simple transit/extended lights, so the crew can confirm the high-lift devices are set correctly for take-off and landing.",
  ],
  "atgfig-ch07_fig_10": [
    "This shows how leading-edge slats are driven. A single power drive unit (PDU) — a hydraulic or pneumatic motor — turns a long torque shaft (driveshaft) that runs out along the wing to both sides.",
    "At each slat, a rotary actuator geared to the shaft converts the shaft's rotation into the movement that extends or retracts that slat panel. Because every slat is driven off the same shaft, they all move together and in step, which keeps the two wings symmetrical.",
    "Gearboxes (tee and bevel) split and turn the drive to reach the inboard and outboard slats and to carry it across to the opposite wing, so one motor drives the whole leading edge.",
  ],
  "atgfig-ch07_fig_11": [
    "This schematic shows a combined speed-brake and lift-dumper (spoiler) system. The panels on each wing are split into flight spoilers, used in the air, and ground spoilers, which are only allowed to deploy on the ground.",
    "A spoiler mixer blends two inputs: the speed-brake lever (both wings together, to add drag or dump lift) and the roll control (raising the spoiler on one wing to help bank). Hydraulic power reaches the actuators through a ground-spoiler control valve and a ground-spoiler shutoff valve.",
    "The shutoff valve is interlocked with the landing gear (weight-on-wheels) so the ground spoilers can only work once the aircraft is actually on the ground. An armed state means that, on touchdown, the spoilers deploy automatically to kill the lift and make the brakes effective.",
  ],

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
