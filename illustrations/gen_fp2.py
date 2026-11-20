#!/usr/bin/env python3
"""Flight Planning & Performance extra figures (A.4)."""
import math
from af_common import *

FP = []
def F(tag, title, W, H, aria, cap): return Fig('fig_x_' + tag, title, W, H, aria, cap)
def chart(x0, y0, x1, y1, xr, yr):
    return (lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)), (lambda v: y1 - (v - yr[0]) / (yr[1] - yr[0]) * (y1 - y0))

f = F('vn', 'The V-n (Manoeuvring) Diagram', 760, 400, 'Load factor against airspeed: positive and negative stall curves meeting the limit load factors at VA, with the envelope closed at the design dive speed VD',
      'Below VA the aircraft stalls before it can exceed the limit load factor; above VA a full control input could overstress it. The envelope is bounded by the stall curves, the positive and negative limit load factors and the design dive speed VD. Shown for the normal category (+3.8 g / −1.52 g).')
x0, y0, x1, y1 = 100, 40, 700, 340
X, Y = chart(x0, y0, x1, y1, (0, 200), (-2.5, 4.5))
f.L(x0, Y(0), x1, Y(0), 'dim', 1.4, me='dim'); f.L(x0, y1, x0, y0, 'dim', 1.4, me='dim')
f.T(745, Y(0) + 4, 'IAS', 10.5, 'ink', 'end', bold=True); f.T(x0 - 44, 190, 'LOAD FACTOR n', 10.5, 'ink', 'middle', bold=True, rot=-90)
vs = 50; va = vs * math.sqrt(3.8); vsn = vs * math.sqrt(1.52 / 1) * 1.1; vd = 190
pos = [(X(v), Y((v / vs) ** 2)) for v in [vs + k * (va - vs) / 20 for k in range(21)]]
neg = [(X(v), Y(-(v / (vs * 1.1)) ** 2)) for v in [vs * 1.1 + k * (vs * 1.1 * math.sqrt(1.52) - vs * 1.1) / 20 for k in range(21)]]
f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pos) + f' L{X(vd)},{Y(3.8)} L{X(vd)},{Y(0)} L{X(160)},{Y(-1.52)} L' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in neg[::-1]) + ' Z', 'gold', 2.4, 'gold', op=0.12)
f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pos), 'hot', 2.6); f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in neg), 'hot', 2.6)
f.L(X(va), Y(3.8), X(vd), Y(3.8), 'gold', 2.6); f.L(X(vd), Y(3.8), X(vd), Y(0), 'gold', 2.6); f.L(X(vd), Y(0), X(160), Y(-1.52), 'gold', 2.6); f.L(neg[-1][0], Y(-1.52), X(160), Y(-1.52), 'gold', 2.6)
for v, t in ((vs, 'VS'), (va, 'VA'), (vd, 'VD')): f.L(X(v), Y(0) - 4, X(v), Y(0) + 4, 'ink', 2); f.T(X(v), Y(0) + 18, t, 10.5, 'ink', 'middle', bold=True)
f.T(X(va) + 60, Y(3.8) - 8, '+3.8 g limit', 10.5, 'gold', bold=True); f.T(X(120), Y(-1.52) + 18, '−1.52 g limit', 10.5, 'gold', 'middle', bold=True)
f.T(X(68), Y(2.6), 'stall', 10.5, 'hot', 'end', bold=True); f.T(X(70), Y(0.9), 'n = 1', 9.5, 'dim')
f.L(x0, Y(1), x1, Y(1), 'line', 1, dash='3 3')
FP.append(f)

f = F('lf', 'Limit Load Factors by Category', 760, 260, 'Table of positive and negative limit load factors for normal, utility and aerobatic category aeroplanes',
      'Limit load factors (CS-23 / FAR 23): the aeroplane must withstand these without permanent deformation; the ultimate load (×1.5 safety factor) without failure. Utility allows limited aerobatics (spins, steep turns); aerobatic has no restriction other than those in the flight manual.')
table(f, 120, 40, [200, 160, 160], ['Category', 'Positive limit', 'Negative limit'], [('Normal', '+3.8 g', '−1.52 g'), ('Utility', '+4.4 g', '−1.76 g'), ('Aerobatic', '+6.0 g', '−3.0 g')], 'gold')
f.T(380, 170, 'ultimate load = limit load × 1.5', 11, 'gold', 'middle', bold=True)
f.T(380, 200, 'flaps extended: typically +2.0 g, 0 g', 10.5, 'dim', 'middle')
FP.append(f)

f = F('as', 'The Airspeed Chain — IAS to TAS and Mach', 760, 260, 'Chain from indicated airspeed to calibrated, equivalent and true airspeed, with the corrections applied at each step, and Mach number',
      'IAS corrected for instrument and position (pressure) error gives CAS; CAS corrected for compressibility gives EAS (significant above about 300 kt); EAS corrected for density gives TAS. Mach number = TAS ÷ local speed of sound, which depends only on temperature.')
items = [('IAS', 'indicated'), ('CAS', 'calibrated'), ('EAS', 'equivalent'), ('TAS', 'true')]
for i, (a, b) in enumerate(items):
    x = 40 + i * 180; f.box(x, 70, 130, 60, [a, b], c='gold' if i == 3 else 'ink', size=12)
    if i < 3: f.L(x + 132, 100, x + 178, 100, 'gold', 2, me='gold')
for i, t in enumerate(('instrument + position error', 'compressibility', 'density')): f.T(212 + i * 180 - 4, 160, t, 10, 'cool', 'middle', bold=True)
f.box(580, 180, 140, 54, ['MACH', 'TAS ÷ LSS'], c='hot', size=11); f.L(645, 132, 650, 178, 'hot', 2, me='hot')
f.T(300, 220, 'LSS (kt) ≈ 38.95 × √(absolute temperature K)', 10.5, 'ink', 'middle', bold=True)
FP.append(f)

f = F('vs', 'Take-off Speeds', 760, 320, 'A take-off run along a runway with VMCG, V1, VR, VLOF and V2 at the screen height marked in sequence',
      'VMCG ≤ V1 ≤ VR. V1 is the decision speed: an engine failure before V1 → reject; at or after V1 → continue. VR: rotation. VLOF: lift-off. V2: take-off safety speed, to be reached by the screen height (35 ft for Class A), not less than 1.13 VSR and 1.1 VMCA.')
f.L(40, 240, 720, 240, 'ink', 8); f.L(40, 240, 720, 240, '#3b4246', 6)
f.P('M60,236 L520,236 Q600,234 700,140', 'gold', 2.4, dash='6 4')
for x, t, sub in ((180, 'VMCG', 'min control (ground)'), (320, 'V1', 'decision speed'), (430, 'VR', 'rotate'), (520, 'VLOF', 'lift-off'), (680, 'V2', 'at 35 ft screen')):
    y = 236 if x < 600 else 158; f.L(x, y, x, 100, 'line', 1, dash='3 3'); f.Ci(x, y, 5, 'gold', 1.4, 'gold')
    f.T(x, 86, t, 12, 'hot' if t == 'V1' else 'ink', 'middle', bold=True); f.T(x, 280, sub, 10, 'dim', 'middle')
f.T(380, 312, 'VMCG ≤ V1 ≤ VR     V2 ≥ 1.13 VSR and ≥ 1.1 VMCA', 11, 'gold', 'middle', bold=True)
FP.append(f)

f = F('alt', 'Pressure Altitude and Density Altitude', 760, 320, 'Aerodrome elevation corrected by the QNH difference to give pressure altitude, then corrected for temperature deviation from ISA to give density altitude',
      'Pressure altitude = elevation + (1013 − QNH) × about 27–30 ft per hPa. ISA temperature at that altitude = 15 − 2 × (PA in thousands of ft). Density altitude ≈ PA + 120 ft for every °C the OAT is above ISA. High, hot and humid conditions raise density altitude and degrade performance.')
N = {}
node(f, N, 'el', 30, 60, 170, 50, ['Elevation'], 'ink')
node(f, N, 'pa', 290, 60, 180, 50, ['Pressure altitude'], 'gold')
node(f, N, 'da', 560, 60, 170, 50, ['Density altitude'], 'hot')
conn(f, N, 'el', 'pa', 'gold'); conn(f, N, 'pa', 'da', 'hot')
f.T(245, 140, '+ (1013 − QNH) × 27–30 ft', 10.5, 'gold', 'middle', bold=True)
f.T(515, 140, '+ 120 ft per °C above ISA', 10.5, 'hot', 'middle', bold=True)
f.T(380, 200, 'Example: elevation 5500 ft, QNH 1023, OAT +30°C', 10.5, 'ink', 'middle', bold=True)
f.T(380, 222, 'PA ≈ 5500 − 10 × 30 = 5200 ft;  ISA temp = 15 − 10.4 = 4.6°C', 10.5, 'dim', 'middle')
f.T(380, 244, 'ISA deviation ≈ +25°C → DA ≈ 5200 + 25 × 120 = 8200 ft', 10.5, 'dim', 'middle')
FP.append(f)

f = F('todr', 'Take-off Distance and Screen Height', 760, 300, 'Take-off from brake release to the point where the aircraft reaches the screen height of 35 ft for Class A or 50 ft for Class B',
      'Take-off distance is measured from brake release to the point where the aircraft reaches the screen height: 35 ft (Class A, dry runway) or 50 ft (Class B). The ground roll ends at lift-off; the airborne part is the transition and initial climb. Regulatory factors are applied to give the distance required.')
f.L(40, 240, 720, 240, '#3b4246', 8)
f.P('M60,236 L420,236 Q520,232 660,130', 'gold', 2.4)
f.L(660, 130, 660, 236, 'hot', 1.6, me='hot', ms='hot'); f.T(650, 190, '35 ft (A) / 50 ft (B)', 10.5, 'hot', 'end', bold=True)
f.L(60, 270, 420, 270, 'cool', 1.6, me='cool', ms='cool'); f.T(240, 290, 'ground roll', 10.5, 'cool', 'middle', bold=True)
f.L(60, 60, 660, 60, 'gold', 1.6, me='gold', ms='gold'); f.T(360, 50, 'TAKE-OFF DISTANCE', 11, 'gold', 'middle', bold=True)
f.L(60, 60, 60, 236, 'line', 1, dash='3 3'); f.L(660, 60, 660, 130, 'line', 1, dash='3 3'); f.T(60, 226, 'brake release', 10, 'dim', 'start')
FP.append(f)

f = F('vxvy', 'Best Angle and Best Rate of Climb', 760, 360, 'Thrust and drag (and power) curves against speed: best angle of climb where excess thrust is greatest and best rate where excess power is greatest',
      'Climb angle depends on excess THRUST (thrust − drag); climb rate depends on excess POWER (power available − power required). VX, the best-angle speed, is where excess thrust is greatest; VY, best rate, is where excess power is greatest. VX < VY; both change with altitude and meet at the absolute ceiling.')
x0, y0, x1, y1 = 100, 40, 700, 300
axes(f, x0, y0, x1, y1, 'TAS →', 'POWER')
smooth(f, [(140, 120), (260, 230), (380, 250), (500, 210), (660, 80)], 'hot', 3); f.T(660, 70, 'power required', 10.5, 'hot', 'end', bold=True)
smooth(f, [(140, 210), (300, 120), (460, 95), (660, 90)], 'cool', 3); f.T(470, 84, 'power available (prop)', 10.5, 'cool', bold=True)
f.L(380, 120, 380, 250, 'gold', 2, me='gold', ms='gold'); f.T(388, 190, 'max excess power → VY', 10.5, 'gold', bold=True)
f.L(330, 40, 330, 300, 'line', 1, dash='3 3'); f.T(320, 320, 'VX', 11, 'ink', 'end', bold=True); f.T(380, 320, 'VY', 11, 'ink', 'middle', bold=True)
f.T(400, 350, 'VX from the thrust–drag curves (max excess thrust), below VY', 10, 'dim', 'middle')
FP.append(f)

f = F('rng', 'Range and Endurance Speeds', 760, 380, 'Drag against TAS with the minimum drag speed and the tangent from the origin, and power required with the minimum power speed',
      'Jet: maximum endurance at VMD (minimum drag, so minimum fuel flow); maximum range at about 1.32 VMD (the tangent from the origin to the drag curve). Piston/propeller: maximum endurance at VMP (minimum power); maximum range at VMD (tangent from the origin to the power curve).')
x0, y0, x1, y1 = 100, 40, 700, 300
axes(f, x0, y0, x1, y1, 'TAS →', 'DRAG')
X, Y = chart(x0, y0, x1, y1, (0, 2.6), (0, 3.2))
D = lambda v: 0.5 * (1 / v ** 2 + v ** 2)
smooth(f, [(X(v), Y(D(v))) for v in [0.55 + k * 0.1 for k in range(19)]], 'hot', 3); f.T(X(2.35), Y(D(2.35)) - 8, 'total drag', 10.5, 'hot', 'end', bold=True)
f.L(X(1), Y(1), X(1), y1, 'gold', 1.4, dash='4 3'); f.T(X(1), y1 + 18, 'VMD', 10.5, 'gold', 'middle', bold=True)
vr = 3 ** 0.25; f.L(X(0), Y(0), X(2.2), Y(D(vr) / vr * 2.2), 'cool', 1.6, dash='6 4')
f.L(X(vr), Y(D(vr)), X(vr), y1, 'cool', 1.4, dash='4 3'); f.T(X(vr) + 70, y1 + 18, '≈ 1.32 VMD (tangent)', 10.5, 'cool', 'middle', bold=True)
f.T(130, 60, 'jet: endurance at VMD, range at 1.32 VMD', 10.5, 'ink', bold=True); f.T(130, 80, 'prop: endurance at VMP, range at VMD', 10.5, 'ink', bold=True)
FP.append(f)

f = F('fac', 'Factors Affecting Take-off and Landing Distance', 760, 360, 'Table of the effect of increased mass, altitude, temperature, humidity, headwind, tailwind, upslope, downslope and contaminated surface on take-off and landing distances',
      'Anything that reduces air density (altitude, temperature, humidity) or adds mass increases both distances. A headwind reduces them; a tailwind increases them (performance charts use 50% of headwind and 150% of tailwind). Upslope lengthens take-off but shortens landing; downslope the reverse. Wet, grass or contaminated surfaces lengthen both.')
rows = [('Mass ↑', 'longer', 'longer'), ('Pressure altitude ↑', 'longer', 'longer'), ('Temperature ↑', 'longer', 'longer'), ('Humidity ↑', 'longer', 'longer'), ('Headwind', 'shorter', 'shorter'), ('Tailwind', 'longer', 'longer'),
        ('Upslope', 'longer', 'shorter'), ('Downslope', 'shorter', 'longer'), ('Wet / grass / contaminated', 'longer', 'longer'), ('Flap (normal setting)', 'shorter', 'shorter')]
table(f, 100, 20, [260, 140, 140], ['Factor', 'Take-off', 'Landing'], rows, 'gold')
f.T(380, 266 + 60, 'charts: 50% of headwind, 150% of tailwind', 10.5, 'gold', 'middle', bold=True)
FP.append(f)

f = F('wc', 'Headwind and Crosswind Components', 760, 340, 'Runway with a wind vector at an angle, resolved into a headwind component along the runway and a crosswind component across it, with a sine table',
      'Headwind component = wind speed × cos(angle between wind and runway); crosswind component = wind speed × sin(angle). Quick rule: 30° → crosswind ½ of the wind, 45° → about 0.7, 60° → about 0.9, 90° → all of it.')
f.R(80, 260, 360, 40, c='ink', sw=1, fill='#3b4246', rx=0); f.T(260, 286, 'RWY 36', 12, 'white', 'middle', bold=True, check=False)
ox, oy = 300, 250; a = math.radians(40); L = 180
f.L(ox + L * math.sin(a), oy - L * math.cos(a), ox, oy, 'hot', 3, me='hot'); f.T(ox + L * math.sin(a) + 6, oy - L * math.cos(a) + 24, 'wind 040°/20 kt', 10.5, 'hot', bold=True)
f.L(ox, oy - L * math.cos(a), ox, oy, 'gold', 2.4, me='gold'); f.T(ox - 8, oy - 80, 'headwind 20 cos40 ≈ 15 kt', 10.5, 'gold', 'end', bold=True)
f.L(ox + L * math.sin(a), oy - L * math.cos(a), ox, oy - L * math.cos(a), 'cool', 2.4, me='cool'); f.T(ox + 60, oy - L * math.cos(a) - 10, 'crosswind 20 sin40 ≈ 13 kt', 10.5, 'cool', bold=True)
table(f, 520, 150, [80, 120], ['Angle', 'Crosswind'], [('30°', '0.5 × W'), ('45°', '0.7 × W'), ('60°', '0.9 × W'), ('90°', '1.0 × W')], 'cool')
FP.append(f)

f = F('vmc', 'The Critical Engine and VMC', 760, 360, 'Plan view of a twin with the left engine failed and the right engine at full power, showing the yawing moment, rudder force and bank towards the live engine',
      'With one engine failed the thrust of the live engine yaws the aircraft towards the dead one; full rudder and up to 5° of bank towards the live engine counter it. VMC is the minimum speed at which control can be maintained, established with: take-off power, the critical engine windmilling, aft CG, flaps take-off, gear up and max 5° bank. On clockwise-rotating propellers the left engine is critical (P-factor puts the right engine’s thrust further from the centreline).')
f.raw('<g transform="translate(380 180) scale(2.4)"><path d="M0,-60 C5,-56 6,-48 6,-40 L6,-8 L58,14 L58,22 L6,10 L5,38 L22,50 L22,56 L0,52 L-22,56 L-22,50 L-5,38 L-6,10 L-58,22 L-58,14 L-6,-8 L-6,-40 C-6,-48 -5,-56 0,-60 Z" fill="#c4d1d6" stroke="#dfeef2" stroke-width="0.6"/></g>')
for sg, c_ in ((-1, 'dim'), (1, 'hot')): f.R(380 + sg * 72 - 10, 150, 20, 40, c='ink', sw=1.4, fill='steel', rx=4)
f.L(452, 150, 452, 70, 'hot', 3, me='hot'); f.T(462, 80, 'live engine thrust', 10.5, 'hot', bold=True)
f.P('M308,150 L280,150', 'dim', 3); f.T(290, 214, 'failed (windmilling drag)', 10.5, 'dim', 'end', bold=True)
f.P('M300,80 A100,100 0 0 0 290,170', 'gold', 2.4, me='gold'); f.T(280, 66, 'yaw towards dead engine', 10.5, 'gold', 'end', bold=True)
f.L(380, 300, 330, 300, 'cool', 3, me='cool'); f.T(400, 320, 'rudder force + up to 5° bank towards live engine', 10.5, 'cool', 'middle', bold=True)
FP.append(f)

f = F('dd', 'Engine-Inoperative Drift-Down', 760, 340, 'Profile from cruise altitude after an engine failure descending at drift-down speed to the net level-off altitude, with the net flight path clearing terrain by 2000 ft',
      'After an engine failure at cruise altitude the aircraft cannot hold height and drifts down at the recommended speed to the altitude it can maintain on the remaining engines. The NET flight path (gross degraded by a set gradient) must clear all terrain and obstacles along the route by at least 2000 ft vertically.')
f.P('M40,320 L180,260 L300,300 L420,200 L520,260 L720,320 Z', 'none', 0, 'gnd', op=0.7)
f.L(40, 60, 200, 60, 'cool', 3); f.P('M200,60 Q380,70 520,140 L720,140', 'cool', 3); f.T(80, 50, 'cruise altitude', 10.5, 'cool', bold=True)
f.P('M200,60 Q380,90 520,170 L720,170', 'gold', 2.4, dash='8 4'); f.T(560, 186, 'net flight path', 10.5, 'gold', bold=True); f.T(560, 132, 'gross (actual)', 10.5, 'cool', bold=True)
f.Ci(200, 60, 6, 'hot', 1.4, 'hot'); f.T(210, 80, 'engine failure', 10.5, 'hot', bold=True)
f.L(420, 120, 420, 198, 'hot', 1.6, me='hot', ms='hot'); f.T(430, 162, '≥ 2000 ft', 10.5, 'hot', bold=True)
FP.append(f)

f = F('tofp', 'Take-off Flight Path Segments (Class A)', 760, 360, 'Take-off flight path from 35 ft to 1500 ft showing the first segment with gear retracting, second segment at V2 gear up, third segment acceleration and flap retraction, and final segment',
      'First segment: 35 ft until gear retracted, at V2. Second segment: gear up, take-off flap, V2 — the most limiting, minimum gross gradient 2.4% for a twin. Third segment: level acceleration and flap retraction. Final segment: en-route configuration to at least 1500 ft, minimum 1.2% (twin). The NET flight path (gross − 0.8% for a twin) must clear obstacles by 35 ft.')
pts = [(60, 300), (160, 280), (440, 150), (560, 150), (720, 90)]
f.P('M' + ' L'.join(f'{x},{y}' for x, y in pts), 'gold', 3)
for x in (160, 440, 560): f.L(x, 60, x, 310, 'line', 1, dash='3 3')
for (a, b), t in (((60, 160), '1st: gear retracting'), ((160, 440), '2nd: gear up, V2 (2.4%)'), ((440, 560), '3rd: accelerate, flaps up'), ((560, 720), 'final (1.2%)')): f.T((a + b) / 2, 330, t, 9.5, 'ink', 'middle', bold=True)
f.T(60, 290, '35 ft', 10, 'hot', 'end'); f.T(720, 80, '≥ 1500 ft', 10, 'hot', 'end', bold=True)
f.P('M60,300 L160,285 L440,175 L560,175 L720,120', 'cool', 1.6, dash='6 4'); f.T(450, 196, 'net flight path', 10, 'cool', bold=True)
FP.append(f)

f = F('mass', 'The Mass Ladder', 760, 380, 'Stacked masses: basic empty mass plus operating items gives dry operating mass, plus traffic load gives zero fuel mass, plus take-off fuel gives take-off mass, minus trip fuel gives landing mass',
      'BEM + variable load (crew, catering, removable equipment) = DOM. DOM + traffic load (passengers, baggage, cargo) = ZFM. ZFM + take-off fuel = TOM. TOM − trip fuel = LM. Each must not exceed its limit: MZFM, MTOM (and performance-limited TOM) and MLM.')
blocks = [('Basic empty mass (BEM)', 'steel', 90), ('+ variable load → DOM', 'cool', 50), ('+ traffic load → ZFM', 'gold', 70), ('+ take-off fuel → TOM', 'hot', 80)]
y = 330
for t, c_, h in blocks:
    f.R(200, y - h, 220, h, c='ink', sw=1.4, fill=c_, rx=0, op=0.7); f.T(310, y - h / 2 + 4, t, 10.5, 'black' if c_ != 'steel' else 'white', 'middle', bold=True, check=False); y -= h
for yy, t in ((240, 'DOM'), (190, 'ZFM ≤ MZFM'), (120, 'TOM ≤ MTOM')): f.L(420, yy, 460, yy, 'ink', 1.4); f.T(470, yy + 4, t, 11, 'ink', bold=True)
f.T(470, 70, 'LM = TOM − trip fuel ≤ MLM', 11, 'hot', bold=True)
FP.append(f)

f = F('mac', 'Centre of Gravity as % MAC', 760, 300, 'Wing chord with the mean aerodynamic chord, leading edge of MAC, and the CG position expressed as a percentage of MAC from the LEMAC',
      'CG position as %MAC = (CG arm − LEMAC arm) ÷ MAC × 100. Example: LEMAC at 620 in, MAC 140 in, CG at 655 in → (655 − 620) ÷ 140 × 100 = 25% MAC.')
f.P('M120,150 Q140,100 300,96 L640,120 L640,130 L300,170 Q140,168 120,150 Z', 'ink', 1.6, '#c4d1d6')
f.L(130, 210, 640, 210, 'gold', 2, me='gold', ms='gold'); f.T(385, 230, 'MAC = 140 in', 10.5, 'gold', 'middle', bold=True)
f.L(130, 80, 130, 210, 'line', 1, dash='3 3'); f.T(130, 70, 'LEMAC 620 in', 10.5, 'ink', 'middle', bold=True)
f.L(258, 90, 258, 210, 'hot', 1.6, dash='4 3'); f.Ci(258, 150, 8, 'hot', 1.4, 'hot'); f.T(258, 70, 'CG 655 in', 10.5, 'hot', 'middle', bold=True)
f.T(380, 280, '(655 − 620) ÷ 140 × 100 = 25% MAC', 11.5, 'ink', 'middle', bold=True)
FP.append(f)

f = F('opt', 'Optimum Altitude and Step Climbs', 760, 320, 'Optimum altitude rising as weight decreases during the flight, and a stepped cruise profile following it',
      'As fuel is burnt the aircraft gets lighter and its optimum altitude (best specific range) rises. Since a continuous cruise climb is not normally allowed by ATC, the aircraft flies step climbs (typically 2000 or 4000 ft) to stay close to the optimum. Winds at different levels may make a lower level better.')
x0, y0, x1, y1 = 100, 40, 700, 260
axes(f, x0, y0, x1, y1, 'DISTANCE / TIME (weight decreasing) →', 'ALTITUDE')
f.P(f'M{x0},220 L{x1},90', 'gold', 2.4, dash='6 4'); f.T(600, 92, 'optimum altitude', 10.5, 'gold', 'end', bold=True)
f.P(f'M{x0},230 L250,230 L270,190 L450,190 L470,150 L650,150 L670,110 L{x1},110', 'cool', 3); f.T(300, 180, 'step climbs', 10.5, 'cool', bold=True)
FP.append(f)

f = F('fuel', 'Fuel Plan Components', 760, 320, 'Stacked bar of fuel: taxi, trip, contingency, alternate, final reserve, additional and extra fuel',
      'A fuel plan is built from: taxi fuel; trip fuel to destination; contingency fuel (a percentage of trip, for unforeseen factors); alternate fuel to reach the alternate; final reserve fuel; additional fuel if required (e.g. for ETOPS or isolated aerodromes); and extra fuel at the commander’s discretion. Amounts are set by the regulations and the operations manual.')
items = [('taxi', 'dim', 30), ('trip', 'hot', 200), ('contingency', 'gold', 50), ('alternate', 'cool', 90), ('final reserve', 'green', 70), ('additional', 'mag', 40), ('extra (discretionary)', 'steel', 60)]
x = 60
for t, c_, w in items:
    f.R(x, 120, w, 60, c='ink', sw=1.2, fill=c_, rx=0, op=0.85); f.T(x + w / 2, 110 if items.index((t, c_, w)) % 2 == 0 else 206, t, 10, c_ if c_ != 'steel' else 'ink', 'middle', bold=True); x += w
f.L(90, 240, 590, 240, 'gold', 1.4, me='gold', ms='gold'); f.T(340, 260, 'take-off fuel (from brake release)', 10, 'gold', 'middle', bold=True)
f.T(380, 300, 'amounts per regulations and the operations manual', 10.5, 'dim', 'middle')
FP.append(f)

if __name__ == '__main__':
    gallery(FP, 'FPP Gallery 2', 'Flight Planning & Performance — Additional Figures', 'Original figures for certification, speeds, altitudes, take-off and climb performance, range, mass and balance and fuel planning.', 'fp2-gallery.html')
    print(len(FP), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
