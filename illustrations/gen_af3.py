#!/usr/bin/env python3
"""Airframes part 3 (chapters 6-10): brakes, flight controls, powered controls, heating."""
import math
from af_common import *

AFS = []
def chart(x0, y0, x1, y1, xr, yr):
    return (lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)), (lambda v: y1 - (v - yr[0]) / (yr[1] - yr[0]) * (y1 - y0))
def labs(f, items, x=500, y0=50, step=40):
    for i, ((px, py), t) in enumerate(items):
        ty = y0 + i * step; f.L(px, py, x - 4, ty - 4, 'dim', 1); f.Ci(px, py, 2.4, 'dim', 1, 'dim'); f.T(x + 2, ty, t, 10.5, 'ink', bold=True)

# 06_02 brake adjuster
f = AF('06_02', 'Automatic Brake Adjuster', 760, 320, 'Brake adjuster with a retraction pin passing through a friction bush, a guide and an adjuster spring acting against the torque plate',
       'When the brake is released the adjuster spring pulls the pressure plate back only by a fixed running clearance. As the discs wear, the pin is drawn through the friction bush, so the clearance stays constant automatically and the pin protrudes less — giving a measure of wear.')
f.R(80, 120, 380, 24, c='ink', sw=1.4, fill='#a9bac1', rx=3); f.R(460, 80, 30, 120, c='ink', sw=1.6, fill='cool', rx=2)
f.R(180, 100, 140, 64, c='ink', sw=1.6, fill='g3', rx=4); f.R(240, 104, 30, 56, c='ink', sw=1.2, fill='gold', rx=2)
for k in range(8): f.P(f'M{330 + k * 14},106 L{338 + k * 14},158', 'cool', 2)
f.R(420, 200, 120, 40, c='ink', sw=1.6, fill='steel', rx=2)
labs(f, (((100, 132), 'Retraction pin'), ((255, 112), 'Friction bush'), ((200, 104), 'Guide'), ((370, 150), 'Adjuster spring'), ((475, 90), 'Pressure plate'), ((480, 220), 'Torque plate')), x=580, y0=40, step=42)
AFS.append(f)

f = AF('06_03', 'Measuring Brake Wear', 760, 300, 'Wear indicator pin protruding from the brake housing, the protrusion measured with the brakes applied',
       'With the brakes applied (parking brake on), the length of the wear indicator pin protruding beyond its housing or reference is measured. When the pin is flush (or below the limit in the maintenance manual) the brake must be changed.')
f.R(220, 80, 200, 140, c='ink', sw=1.8, fill='g3', rx=4)
for k in range(6): f.R(260 + k * 24, 90, 12, 120, c='ink', sw=1, fill='hot' if k % 2 else '#a9bac1', rx=1)
f.R(100, 140, 140, 16, c='ink', sw=1.4, fill='#a9bac1', rx=2); f.R(200, 126, 40, 44, c='ink', sw=1.4, fill='steel', rx=2)
f.L(100, 180, 200, 180, 'gold', 1.6, me='gold', ms='gold'); f.T(150, 200, 'distance measured', 10.5, 'gold', 'middle', bold=True); f.T(150, 216, 'with brakes applied', 10, 'gold', 'middle')
f.T(130, 120, 'wear pin', 10.5, 'ink', 'middle', bold=True); f.T(320, 250, 'disc stack', 10.5, 'ink', 'middle', bold=True)
f.T(560, 140, 'pin flush = brake worn', 11, 'hot', 'middle', bold=True)
AFS.append(f)

f = AF('06_04', 'Brake and Anti-Skid System', 760, 380, 'Brake pedals operating metering valves, anti-skid valves controlled by a control unit using wheel speed transducers, and the brakes',
       'The pedals operate metering valves that send pressure, proportional to pedal travel, to the brakes. Wheel-speed transducers feed the anti-skid control unit; if a wheel decelerates too fast (about to skid) the anti-skid valve releases pressure to that brake, then reapplies it. An accumulator gives alternate and parking braking; anti-skid is inhibited at low speed.')
N = {}
node(f, N, 'ped', 20, 30, 150, 40, ['Brake pedals'], 'gold', 10)
node(f, N, 'sys', 220, 30, 160, 40, ['Hydraulic supply'], 'hot', 10)
node(f, N, 'acc', 420, 30, 160, 40, ['Accumulator (alt/park)'], 'hot', 9.5)
node(f, N, 'mv', 220, 120, 160, 44, ['Metering valves'], 'gold', 10)
node(f, N, 'as', 220, 210, 160, 44, ['Anti-skid valves'], 'hot', 10)
node(f, N, 'br', 220, 300, 160, 44, ['Wheel brakes'], 'ink', 10)
node(f, N, 'cu', 470, 210, 170, 44, ['Anti-skid control unit'], 'cool', 9.5)
node(f, N, 'ws', 470, 300, 170, 44, ['Wheel speed transducers'], 'cool', 9.5)
for a, b, c_ in (('ped', 'mv', 'gold'), ('sys', 'mv', 'hot'), ('acc', 'mv', 'hot'), ('mv', 'as', 'hot'), ('as', 'br', 'hot'), ('ws', 'cu', 'cool'), ('cu', 'as', 'cool')): conn(f, N, a, b, c_)
f.T(40, 300, 'releases a brake', 10, 'dim'); f.T(40, 314, 'before the wheel locks', 10, 'dim')
AFS.append(f)

f = AF('06_10', 'Ground Turning — Wingtip and Tail Radii', 760, 470, 'Plan view of an aircraft turning about a centre just inside the inner main gear, with circles traced by the nosewheel, wingtip and tailplane',
       'In a tight turn the aircraft rotates about a turn centre just inside the inner main gear. The wingtip and tail sweep circles much larger than the gear track — the outer wingtip radius is the largest — so wingtip clearance, not the nosewheel path, limits manoeuvring near obstacles.')
ax, ay, sc = 360, 236, 1.4
f.raw(f'<g transform="translate({ax} {ay}) scale({sc})"><path d="M0,-60 C5,-56 6,-48 6,-40 L6,-8 L58,14 L58,22 L6,10 L5,38 L22,50 L22,56 L0,52 L-22,56 L-22,50 L-5,38 L-6,10 L-58,22 L-58,14 L-6,-8 L-6,-40 C-6,-48 -5,-56 0,-60 Z" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="1.2"/></g>')
px, py = ax - 120, ay + 14 * sc
for (tx, ty), t, c_, dy in (((ax, ay - 60 * sc), 'R1 nose', 'cool', 0), ((ax, ay + 54 * sc), 'R2 tail', 'green', 16), ((ax + 58 * sc, ay + 18 * sc), 'R3 outer wingtip', 'hot', 32)):
    r = math.hypot(tx - px, ty - py); f.Ci(px, py, round(r, 1), c_, 1.6); f.L(px, py, tx, ty, c_, 1.2, dash='3 3')
    f.T(600, 60 + dy, t, 10.5, c_, bold=True)
f.Ci(px, py, 5, 'gold', 1, 'gold'); f.T(px, py + 22, 'turn centre', 10, 'gold', 'middle', bold=True)
f.T(600, 120, 'outer wingtip sweeps', 10.5, 'ink', bold=True); f.T(600, 136, 'the largest circle', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('07_04', 'Cable Tensiometer', 760, 300, 'Tensiometer clamped on a control cable between two anvils with a riser deflecting the cable and a dial reading',
       'The tensiometer deflects the cable between two anvils with a riser; the force needed gives a dial reading converted to tension with the instrument’s calibration chart for that cable size. Readings are corrected for temperature against the rigging chart.')
f.L(40, 140, 720, 140, 'ink', 3)
f.P('M240,140 L380,170 L520,140', 'ink', 3)
f.P('M220,150 L540,150 L520,240 Q380,280 240,240 Z', 'ink', 2, 'g3')
for x in (240, 520): f.R(x - 8, 128, 16, 24, c='ink', sw=1.2, fill='steel', rx=2)
f.R(372, 166, 16, 16, c='ink', sw=1.2, fill='gold', rx=2)
dial(f, 380, 230, 34, 225, 495, [(0, '0'), (0.5, '50'), (1, '100')], ptr=0.4, minor=5, size=8)
f.T(240, 110, 'anvil', 10.5, 'ink', 'middle', bold=True); f.T(520, 110, 'anvil', 10.5, 'ink', 'middle', bold=True); f.T(420, 186, 'riser', 10.5, 'gold', bold=True)
f.T(60, 130, 'control cable', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('07_05', 'Cable Tension Regulator (Temperature Compensator)', 760, 340, 'Quadrant with spring units on each cable run maintaining tension as the airframe expands or contracts',
       'An aluminium airframe expands and contracts more than steel cables, so cable tension changes with temperature. A tension regulator — spring units acting on a quadrant — takes up or pays out cable to keep the tension nearly constant; a damper prevents control feedback.')
f.Ci(380, 170, 100, 'ink', 2, 'g3'); f.Ci(380, 170, 12, 'ink', 1.4, 'gold')
for sg in (-1, 1): f.L(380, 170 + sg * 100, 60, 170 + sg * 100, 'ink', 3); f.R(260, 170 + sg * 100 - 12, 70, 24, c='cool', sw=1.6, fill='g2', rx=4)
f.L(380, 170, 560, 120, 'ink', 4); f.T(570, 124, 'push-pull rod (to surface)', 10.5, 'ink', bold=True)
f.T(60, 60, 'control cables', 10.5, 'ink', bold=True); f.T(200, 160, 'spring units on each run', 10.5, 'cool', 'middle', bold=True)
f.T(470, 250, 'Quadrant (bell crank)', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('07_08', 'Trailing Edge Flaps', 760, 380, 'Wing sections showing plain, split, slotted and Fowler flaps deployed',
       'Plain and split flaps increase camber (split flaps add much drag). Slotted flaps let high-energy air through a slot to delay separation. Fowler flaps move aft and down, increasing wing area as well as camber — the largest lift increase. Smaller settings are used for take-off, larger for landing.')
def wing(x, y, kind):
    f.P(f'M{x},{y} Q{x + 10},{y - 22} {x + 80},{y - 22} L{x + 170},{y - 8} L{x + 170},{y + 6} L{x + 80},{y + 8} Q{x + 10},{y + 8} {x},{y} Z', 'ink', 1.6, '#c4d1d6')
    if kind == 'plain': f.P(f'M{x + 170},{y - 8} L{x + 220},{y + 20} L{x + 214},{y + 26} L{x + 170},{y + 6} Z', 'ink', 1.4, 'gold')
    if kind == 'split': f.P(f'M{x + 120},{y + 8} L{x + 200},{y + 40} L{x + 196},{y + 46} L{x + 120},{y + 12} Z', 'ink', 1.4, 'gold')
    if kind == 'slotted': f.P(f'M{x + 178},{y - 2} Q{x + 190},{y - 6} {x + 230},{y + 26} L{x + 224},{y + 32} Q{x + 186},{y + 14} {x + 178},{y - 2} Z', 'ink', 1.4, 'gold'); f.L(x + 150, y - 14, x + 200, y + 6, 'cool', 1.4, me='cool')
    if kind == 'fowler': f.P(f'M{x + 210},{y + 2} Q{x + 222},{y - 2} {x + 270},{y + 26} L{x + 264},{y + 32} Q{x + 218},{y + 16} {x + 210},{y + 2} Z', 'ink', 1.4, 'gold')
for i, (k, t) in enumerate((('plain', 'PLAIN'), ('split', 'SPLIT'), ('slotted', 'SLOTTED'), ('fowler', 'FOWLER (moves aft + down)'))):
    x, y = 40 + (i % 2) * 380, 90 + (i // 2) * 170; wing(x, y, k); f.T(x + 130, y + 80, t, 11, 'gold', 'middle', bold=True)
AFS.append(f)

f = AF('07_09', 'Flap and Slat Position Indication', 760, 340, 'An analogue flap gauge with UP to 45 degree marks and an electronic display showing slat and flap positions',
       'Flap position is shown on an analogue gauge (often with a leading-edge-extended light) or on the electronic display, where the S (slat) and F (flap) symbols and the selected configuration (1, 2, 3, FULL) are shown with a travel indication.')
f.R(80, 60, 70, 240, c='ink', sw=1.8, fill='black', rx=6)
for v, y in (('UP', 80), ('5', 110), ('10', 140), ('15', 170), ('30', 220), ('45', 280)): f.L(100, y, 116, y, 'white', 1.6); f.T(122, y + 4, v, 10, 'white', check=False)
f.P('M96,170 L84,164 L84,176 Z', 'none', 0, 'gold'); f.T(115, 320, 'FLAP gauge', 10.5, 'ink', 'middle', bold=True)
f.R(186, 60, 80, 24, c='ink', sw=1.4, fill='black', rx=3); f.T(226, 77, 'LE EXT', 10, 'green', 'middle', bold=True, check=False)
f.R(340, 60, 380, 240, c='line', sw=2, fill='black', rx=8)
f.P('M440,150 L520,150 L600,180', 'white', 3); f.T(420, 156, 'S', 13, 'cool', 'end', bold=True); f.T(620, 186, 'F', 13, 'cool', bold=True)
for i, x in enumerate((450, 470, 490)): f.Ci(x - 20, 172 + i * 6, 3, 'white', 1, 'white')
for i, x in enumerate((540, 570, 600)): f.Ci(x, 186 + i * 8, 3, 'white', 1, 'white')
f.T(530, 250, 'FULL', 16, 'cool', 'middle', bold=True); f.T(530, 100, 'electronic display (ECAM)', 10.5, 'white', 'middle', check=False)
AFS.append(f)

f = AF('07_10', 'Leading Edge Slats and Drive System', 760, 360, 'Plan view of a wing with leading edge slats driven by a power drive unit, torque shafts and rotary actuators, retracted and extended',
       'A central power drive unit (hydraulic and/or electric motors) turns torque shafts running along the leading edge; rotary actuators or rack-and-pinion units at each slat track extend the slats. Asymmetry and wing-tip brakes stop the shafts if one side disconnects.')
f.P('M80,320 L80,280 L640,80 L700,80 L700,120 L360,320 Z', 'ink', 2, '#c4d1d6')
for k in range(4):
    x0, y0 = 120 + k * 130, 270 - k * 46
    f.P(f'M{x0},{y0 + 10} L{x0 + 120},{y0 - 34} L{x0 + 110},{y0 - 50} L{x0 - 10},{y0 - 6} Z', 'ink', 1.4, 'gold')
f.L(90, 290, 650, 92, 'hot', 3); f.R(40, 290, 60, 30, c='hot', sw=1.6, fill='g3', rx=4); f.T(70, 340, 'Power drive unit', 10.5, 'hot', 'middle', bold=True)
f.T(470, 250, 'torque shaft (along leading edge)', 10.5, 'hot', bold=True); f.T(200, 160, 'slats (extended)', 10.5, 'gold', bold=True)
for k in range(4): f.Ci(140 + k * 130, 283 - k * 46, 5, 'ink', 1.2, 'cool')
f.T(600, 300, 'rotary actuators at each track', 10, 'cool', 'middle', bold=True)
AFS.append(f)

f = AF('07_11', 'Speed Brake and Lift Dumper System', 760, 360, 'Speed brake lever and ground spoiler logic commanding flight spoilers and ground spoilers through hydraulic actuators',
       'In flight, the speed brake lever raises the flight spoilers symmetrically to increase drag and reduce lift; they also assist roll asymmetrically. On landing, the ground spoilers and flight spoilers deploy fully (lift dumpers) when armed and the wheels spin up / weight is on the wheels, putting weight on the wheels for braking.')
N = {}
node(f, N, 'lev', 20, 40, 170, 50, ['Speed brake lever', '(ARM / flight detents)'], 'gold', 9.5)
node(f, N, 'ail', 20, 130, 170, 44, ['Aileron input'], 'cool', 9.5)
node(f, N, 'wow', 20, 220, 170, 50, ['Weight on wheels /', 'wheel spin-up, thrust idle'], 'ink', 9.5)
node(f, N, 'cmp', 270, 120, 190, 64, ['Spoiler control', '(mixer / computers)'], 'gold', 9.5)
node(f, N, 'fs', 540, 60, 190, 50, ['Flight spoilers', 'speed brake + roll'], 'hot', 9.5)
node(f, N, 'gs', 540, 200, 190, 50, ['Ground spoilers', 'lift dump on landing'], 'hot', 9.5)
for a, b, c_ in (('lev', 'cmp', 'gold'), ('ail', 'cmp', 'cool'), ('wow', 'cmp', 'ink'), ('cmp', 'fs', 'hot'), ('cmp', 'gs', 'hot')): conn(f, N, a, b, c_)
f.T(540, 300, 'hydraulic actuators move the panels', 10, 'dim')
AFS.append(f)

# aerodynamic balance
def surf(f, x, y, hingex, horn=False):
    f.P(f'M{x},{y} Q{x + 20},{y - 34} {x + 200},{y - 30} L{x + 330},{y - 10} L{x + 330},{y + 4} L{x + 200},{y + 16} Q{x + 20},{y + 16} {x},{y} Z', 'ink', 1.6, 'fluid')
f = AF('08_04', 'Aerodynamic Balance — Set-Back (Inset) Hinge', 760, 300, 'Control surface with its hinge line set back from the leading edge so that the air load in front of the hinge reduces the hinge moment',
       'Moving the hinge line aft (inset hinge) puts part of the surface ahead of the hinge. The air load on that part opposes the load behind it, so the hinge moment — and the stick force — is reduced. Too much balance can cause over-balance.')
f.P('M60,170 Q80,110 300,110 L420,120 L420,220 L300,226 Q80,226 60,170 Z', 'ink', 1.6, 'fluid')
f.P('M420,140 Q440,140 460,150 L700,172 L700,180 L460,200 Q440,206 420,200 Z', 'ink', 1.6, 'cool')
f.Ci(470, 172, 6, 'ink', 1.4, 'gold'); f.T(470, 238, 'hinge line', 10.5, 'gold', 'middle', bold=True)
f.L(430, 260, 470, 260, 'ink', 1.4, ms='ink', me='ink'); f.T(450, 280, 'd (set-back)', 10.5, 'ink', 'middle', bold=True)
f.L(560, 200, 600, 60, 'hot', 2.4, me='hot'); f.T(612, 70, 'F (air load)', 10.5, 'hot', bold=True)
f.T(340, 60, 'part ahead of the hinge balances the part behind', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('08_05', 'Horn Balance', 760, 300, 'Plan view of an elevator with a horn at the tip extending forward of the hinge line',
       'A horn balance is an extension of the control surface at its tip, ahead of the hinge line. Air load on the horn helps move the surface, reducing stick force (an aerodynamic balance); with a weight in it, it can also act as a mass balance.')
f.P('M100,80 L460,80 L460,220 L100,220 Z', 'ink', 1.6, 'g3'); f.T(280, 150, 'tailplane', 11, 'ink', 'middle', bold=True)
f.P('M460,110 L620,110 L620,250 L460,250 Z', 'ink', 1.6, 'cool'); f.P('M460,40 L560,40 Q620,40 620,110 L460,110 Z', 'ink', 1.6, 'gold')
f.L(460, 30, 460, 270, 'hot', 1.6, dash='6 4'); f.T(460, 290, 'hinge line', 10.5, 'hot', 'middle', bold=True)
f.T(640, 70, 'horn (ahead of', 10.5, 'gold', bold=True); f.T(640, 84, 'the hinge)', 10.5, 'gold', bold=True); f.T(640, 180, 'elevator', 10.5, 'cool', bold=True)
AFS.append(f)

f = AF('08_06', 'Internal Balance (Balance Panel and Seal)', 760, 300, 'Section of a wing trailing edge with a balance panel ahead of the aileron hinge inside a chamber divided by a flexible seal',
       'A balance panel projects forward of the hinge into a chamber in the wing, divided by a flexible seal. When the surface is deflected, the pressure difference between the upper and lower vents acts on the panel and helps move the surface, reducing the stick force without external drag.')
f.P('M40,150 Q80,70 300,70 L420,80 L420,220 L300,226 Q80,226 40,150 Z', 'ink', 1.6, 'fluid')
f.R(300, 100, 120, 100, c='ink', sw=1.4, fill='bg', rx=0)
f.L(330, 150, 480, 150, 'gold', 6); f.Ci(430, 150, 6, 'ink', 1.4, 'hot')
f.P('M330,150 Q316,120 302,104', 'hot', 2.4); f.T(260, 50, 'balance seal (flexible)', 10.5, 'hot', bold=True); f.L(300, 56, 310, 112, 'hot', 1)
f.P('M420,120 Q440,130 460,140 L700,150 L700,156 L460,170 Q440,178 420,180 Z', 'ink', 1.6, 'cool')
f.T(380, 260, 'balance panel ahead of the hinge', 10.5, 'gold', 'middle', bold=True)
AFS.append(f)

f = AF('08_09', 'Effect of a Spring Tab on Stick Force', 760, 320, 'Stick force against speed rising steeply without a spring tab and much less with a spring tab',
       'Without help, stick force rises with the square of speed. A spring tab only moves (to assist the pilot) when the control load exceeds the spring preload, so it gives little assistance at low speed, where full control feel is kept, and increasing assistance at high speed.')
x0, y0, x1, y1 = 100, 40, 680, 270
axes(f, x0, y0, x1, y1, 'SPEED →', 'STICK FORCE')
smooth(f, [(x0, y1), (300, 240), (450, 180), (560, 110), (640, 40)], 'hot', 3)
smooth(f, [(x0, y1), (300, 240), (450, 200), (560, 170), (660, 140)], 'cool', 3, dash='8 4')
f.T(560, 60, 'without spring tab', 10.5, 'hot', 'end', bold=True); f.T(660, 128, 'with spring tab', 10.5, 'cool', 'end', bold=True)
AFS.append(f)

f = AF('08_12', 'Mass Balance', 760, 320, 'Control surfaces with mass balance weights ahead of the hinge line: a horn weight and a weight on an arm',
       'Mass balance weights place the control surface centre of gravity on or ahead of the hinge line. This prevents control-surface flutter, in which wing or tail bending and surface inertia couple into a destructive oscillation. It does not reduce stick force.')
for i, (x, kind) in enumerate(((60, 'arm'), (400, 'leading'))):
    f.P(f'M{x},150 Q{x + 20},120 {x + 120},118 L{x + 120},182 Q{x + 20},180 {x},150 Z', 'ink', 1.6, 'g3')
    f.P(f'M{x + 130},126 L{x + 300},146 L{x + 300},154 L{x + 130},174 Z', 'ink', 1.6, 'cool'); f.Ci(x + 136, 150, 5, 'ink', 1.4, 'hot')
    if kind == 'arm': f.L(x + 136, 150, x + 80, 230, 'ink', 3); f.Ci(x + 80, 236, 14, 'ink', 1.6, 'gold')
    else: f.R(x + 126, 136, 14, 28, c='ink', sw=1.2, fill='gold', rx=3)
    f.T(x + 150, 290, ['weight on an arm', 'weight in the leading edge'][i], 10.5, 'ink', 'middle', bold=True)
f.T(380, 40, 'surface CG brought to or ahead of the hinge (red) → prevents flutter', 10.5, 'gold', 'middle', bold=True)
AFS.append(f)

f = AF('08_14', 'Air Brakes — Fuselage and Wing Mounted', 760, 300, 'Side view of a fuselage-mounted air brake panel and a wing-mounted air brake panel deployed',
       'Air brakes increase drag to steepen the descent or reduce speed without changing configuration. Fuselage-mounted panels cause little change of lift or trim; wing-mounted panels (spoilers used as speed brakes) also reduce lift.')
f.raw(aircraft(220, 120, s=1.1))
f.P('M220,128 L270,170 L276,164 L232,124 Z', 'ink', 1.4, 'gold'); f.T(240, 210, 'fuselage-mounted air brake', 10.5, 'gold', 'middle', bold=True)
f.P('M440,180 L720,150 L720,160 L440,196 Z', 'ink', 1.6, '#c4d1d6'); f.P('M560,170 L610,130 L616,136 L570,174 Z', 'ink', 1.4, 'gold')
f.T(580, 220, 'wing-mounted air brake (spoiler)', 10.5, 'gold', 'middle', bold=True)
AFS.append(f)

f = AF('08_17', 'Variable Incidence (Trimming) Tailplane', 760, 320, 'Tailplane before and after trim, its incidence changed by a trim jack at its leading edge',
       'A trimming tailplane (stabiliser) is moved by a screw jack at its front spar to change its incidence. Trimming with the whole tailplane leaves the elevator streamlined, keeping full elevator authority and low drag across the wide CG and speed range of transport aircraft.')
for i, (y, ang, t) in enumerate(((100, 0, 'BEFORE TRIM'), (240, -6, 'AFTER TRIM'))):
    f.raw(f'<g transform="rotate({ang} 400 {y})"><path d="M260,{y} Q280,{y - 18} 420,{y - 16} L540,{y - 4} L540,{y + 4} L420,{y + 10} Q280,{y + 12} 260,{y} Z" fill="{col("fluid")}" stroke="{col("ink")}" stroke-width="1.6"/></g>')
    f.L(280, y + 20, 280, y + 50, 'gold', 4); f.R(270, y + 50, 20, 20, c='gold', sw=1.4, fill='g3', rx=2)
    f.Ci(470, y, 5, 'hot', 1, 'hot'); f.T(600, y + 4, t, 11, 'gold', bold=True)
f.T(170, 160, 'trim jack', 10.5, 'gold', 'end', bold=True); f.T(170, 176, '(input from trim control)', 9.5, 'dim', 'end')
f.T(470, 300, 'pivot near the rear spar', 10, 'hot', 'middle')
AFS.append(f)

f = AF('08_18', 'Mach Trim by Fuel Transfer', 760, 330, 'Side views of an airliner before and after fuel is transferred to a rear trim tank, moving the centre of gravity aft',
       'At high Mach number the centre of pressure moves aft (tuck under). Moving fuel to a rear (tail) trim tank shifts the CG aft to match, reducing the download needed on the tailplane and so reducing trim drag; the process is reversed before landing.')
for i, (y, cg) in enumerate(((100, 380), (240, 320))):
    f.raw(aircraft(380, y, s=1.4, flip=True))
    f.Ci(cg, y, 7, 'ink', 1.4, 'gold'); f.T(cg, y + 34, 'CG', 10.5, 'gold', 'middle', bold=True)
    f.L(420, y - 40, 420, y - 10, 'hot', 2, me='hot'); f.T(430, y - 36, 'CP', 10.5, 'hot', bold=True)
f.P('M440,262 Q360,240 270,236', 'cool', 2, me='cool', dash='5 3'); f.T(560, 230, 'fuel moved aft to tail trim tank', 10.5, 'cool', bold=True)
f.T(60, 60, 'before', 10.5, 'ink', bold=True); f.T(60, 200, 'after transfer', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('08_19', 'Centre Console Controls — Flaps, Trim and Speed Brake', 760, 360, 'Plan view of a centre console with thrust levers, speed brake lever, flap lever, pitch trim wheels, and aileron and rudder trim controls',
       'Typical centre pedestal: speed brake lever, thrust levers, flap (and slat) lever with gated positions, pitch trim wheels either side, and the aileron and rudder trim controls (usually at the aft end).')
f.R(220, 20, 320, 320, c='ink', sw=2, fill='g2', rx=10)
f.R(250, 60, 30, 70, c='ink', sw=1.4, fill='cool', rx=4); f.T(265, 50, 'speed brake', 10, 'cool', 'middle', bold=True)
for x in (330, 380): f.R(x - 12, 60, 24, 90, c='ink', sw=1.4, fill='#a9bac1', rx=4)
f.T(355, 50, 'thrust levers', 10, 'ink', 'middle', bold=True)
f.R(460, 60, 40, 70, c='ink', sw=1.4, fill='gold', rx=4); f.T(480, 50, 'flap lever', 10, 'gold', 'middle', bold=True)
for x in (200, 560): f.R(x - 14, 120, 28, 120, c='ink', sw=1.6, fill='black', rx=12)
f.T(150, 180, 'pitch trim wheel', 10.5, 'ink', 'end', bold=True)
f.Ci(380, 280, 26, 'ink', 1.6, 'black'); f.T(380, 324, 'rudder trim', 10, 'ink', 'middle', bold=True)
f.R(300, 230, 40, 20, c='ink', sw=1.4, fill='black', rx=4); f.T(320, 222, 'aileron trim', 10, 'ink', 'middle', bold=True)
AFS.append(f)

# powered controls
f = AF('09_01', 'Powered Flying Controls — System Requirements', 760, 340, 'Block diagram: control input to servo valve, actuator and control surface, with artificial feel, follow-up feedback and a cut-out for manual reversion',
       'A powered control needs: a servo valve controlled by the pilot’s input, an actuator to move the surface, follow-up (feedback) so the surface stops at a position proportional to the input, artificial feel because air loads no longer reach the pilot, and in some aircraft a means of reverting to manual control if hydraulic power fails.')
N = {}
node(f, N, 'in', 20, 40, 140, 44, ['Pilot input'], 'gold')
node(f, N, 'sv', 230, 40, 140, 44, ['Servo valve'], 'hot')
node(f, N, 'ac', 440, 40, 140, 44, ['Actuator'], 'hot')
node(f, N, 'cs', 620, 120, 120, 44, ['Control surface'], 'ink', 9.5)
node(f, N, 'fu', 440, 200, 180, 44, ['Follow-up / feedback'], 'cool', 9.5)
node(f, N, 'fe', 20, 200, 160, 44, ['Artificial feel unit'], 'gold', 9.5)
node(f, N, 'mr', 230, 280, 200, 44, ['Manual reversion (cut-out)'], 'dim', 9.5)
for a, b, c_ in (('in', 'sv', 'gold'), ('sv', 'ac', 'hot'), ('ac', 'cs', 'hot'), ('cs', 'fu', 'cool'), ('fu', 'sv', 'cool'), ('fe', 'in', 'gold')): conn(f, N, a, b, c_)
AFS.append(f)

f = AF('09_03', 'A Power-Assisted Flying Control Unit', 760, 320, 'Control column input to a servo valve on a hydraulic jack whose ram is bolted to the structure, the jack body moving the elevator',
       'The column moves the servo valve, which ports pressure to one side of the jack. Here the ram is fixed and the jack body moves, carrying the valve with it — so the movement of the body closes the valve again (follow-up). Because part of the load is fed back to the column, this is power-assisted rather than fully powered.')
f.R(250, 150, 260, 60, c='ink', sw=2, fill='hot', rx=4); f.R(330, 110, 90, 40, c='gold', sw=1.6, fill='g3', rx=4); f.T(322, 134, 'servo valve', 10.5, 'gold', 'end', bold=True)
f.L(510, 180, 640, 180, 'ink', 6); f.R(640, 160, 30, 40, c='ink', sw=1.6, fill='steel', rx=2); f.T(655, 220, 'ram bolted to structure', 10, 'ink', 'middle', bold=True)
f.L(250, 180, 120, 180, 'ink', 4); f.P('M60,150 L120,180 L60,210 Z', 'ink', 1.6, 'cool'); f.T(70, 240, 'elevator', 10.5, 'cool', 'middle', bold=True)
f.L(380, 110, 380, 50, 'ink', 3); f.L(380, 50, 600, 50, 'ink', 3); f.T(610, 54, 'input from control column', 10.5, 'ink', bold=True)
f.T(380, 260, 'hydraulic jack (body moves)', 10.5, 'hot', 'middle', bold=True)
AFS.append(f)

def feel(tag, title, aria, cap, kind):
    f = AF(tag, title, 760, 320, aria, cap)
    f.L(80, 280, 80, 80, 'ink', 4); f.Ci(80, 70, 12, 'ink', 1.6, 'g3'); f.L(80, 120, 260, 120, 'ink', 3); f.T(60, 300, 'control column', 10.5, 'ink', bold=True)
    f.R(260, 90, 260, 60, c='ink', sw=2, fill='g2', rx=4); f.R(380, 92, 20, 56, c='ink', sw=1.2, fill='#a9bac1', rx=2)
    if kind == 'spring':
        for k in range(6): f.P(f'M{276 + k * 16},96 L{284 + k * 16},144', 'cool', 2); f.P(f'M{410 + k * 16},96 L{418 + k * 16},144', 'cool', 2)
        f.T(390, 180, 'spring feel: force proportional to deflection only', 10.5, 'cool', 'middle', bold=True)
    else:
        f.R(262, 92, 116, 56, c='none', sw=0, fill='hot', rx=0, op=0.7)
        f.box(560, 60, 170, 50, ['Pitot pressure', 'Static pressure'], c='cool', size=9.5); f.L(560, 85, 520, 110, 'cool', 1.6, me='cool')
        f.box(560, 150, 170, 50, {'q': ['q (dynamic pressure)', '= pitot − static'], 'qpot': ['q pot: diaphragm', 'positions spool valve'], 'valve': ['Control valve', 'relief to return'], 'comp': ['Feel computer', '+ stabiliser position']}[kind], c='gold', size=9.5)
        f.box(560, 240, 170, 50, ['Hydraulic pressure', 'to feel jack'], c='hot', size=9.5); f.L(560, 265, 470, 150, 'hot', 1.6, me='hot')
        f.T(390, 190, 'q feel: force increases with airspeed', 10.5, 'hot', 'middle', bold=True)
    return f
AFS.append(feel('09_04', 'Artificial Feel — Spring Feel Unit', 'Control column connected to a spring box giving a centring force proportional to deflection', 'A simple spring feel unit gives a force proportional to control deflection only; it does not vary with airspeed, so the pilot could overstress the aircraft at high speed.', 'spring'))
AFS.append(feel('09_05', 'Artificial Feel — q Feel', 'Control column connected to a feel jack whose pressure is set from pitot minus static pressure', 'A q-feel unit uses dynamic pressure (pitot minus static) to set the hydraulic pressure in a feel jack, so the force to move the controls increases with deflection and with airspeed, as it would in a manual system.', 'q'))
AFS.append(feel('09_06', 'q Feel Unit with q Pot', 'q feel unit in which a q pot meters hydraulic pressure to the feel piston according to pitot and static pressure', 'In the q pot, a diaphragm with pitot pressure one side and static the other positions a spool valve that meters hydraulic pressure to the feel piston: the higher the q, the higher the feel pressure.', 'qpot'))
AFS.append(feel('09_07', 'q Feel — Control Valve and Feel Piston', 'Control valve supplying the feel piston with pressure proportional to q, with return and pitot and static inputs', 'The control valve in the q feel system holds feel-piston pressure proportional to dynamic pressure; a relief path to return limits it. Movement of the control column against the feel piston gives the pilot a realistic force.', 'valve'))
AFS.append(feel('09_08', 'Elevator Feel Computer', 'Feel computer using pitot and static pressure and stabiliser position to set elevator feel pressure', 'On large jets the elevator feel computer combines dynamic pressure with stabiliser position (which indicates CG and speed trim) to set the feel pressure in the feel and centring unit.', 'comp'))

f = AF('09_10', 'Dual Hydraulic Systems and Tandem Actuator', 760, 360, 'Control input, feel computer and autopilot driving a tandem actuator powered by hydraulic systems A and B to move a control surface',
       'Critical surfaces use tandem actuators with two independent pistons supplied by separate hydraulic systems (A and B), so the surface can still be moved if one system fails. Inputs come from the pilot (with artificial feel), the autopilot servos and the trim system.')
N = {}
node(f, N, 'ci', 20, 30, 160, 44, ['Control column'], 'gold')
node(f, N, 'fc', 20, 120, 160, 44, ['Feel computer'], 'gold', 9.5)
node(f, N, 'ap', 20, 210, 160, 44, ['Autopilot servos'], 'cool', 9.5)
node(f, N, 'tv', 260, 110, 180, 64, ['Tandem actuator', 'servo valves'], 'hot', 9.5)
node(f, N, 'a', 260, 20, 180, 44, ['Hydraulic system A'], 'hot', 9.5)
node(f, N, 'b', 260, 220, 180, 44, ['Hydraulic system B'], 'hot', 9.5)
node(f, N, 'cs', 540, 110, 180, 64, ['Control surface'], 'ink')
for a, b_, c_ in (('ci', 'tv', 'gold'), ('fc', 'ci', 'gold'), ('ap', 'tv', 'cool'), ('a', 'tv', 'hot'), ('b', 'tv', 'hot'), ('tv', 'cs', 'hot')): conn(f, N, a, b_, c_)
AFS.append(f)

f = AF('09_11', 'Fly-by-Wire — Block Diagram', 760, 380, 'Sidestick, rudder pedals and autopilot commands to digital flight control computers driving hydraulic actuators on the elevators, ailerons, spoilers and rudder, with a mechanical backup',
       'In fly-by-wire the pilot’s inputs are electrical signals to several independent flight control computers, which apply the control laws and protections and command the hydraulic actuators. A limited mechanical backup (e.g. stabiliser trim and rudder) remains on some types.')
N = {}
node(f, N, 'ss', 20, 30, 150, 40, ['Sidestick'], 'gold', 10)
node(f, N, 'ap', 20, 90, 150, 40, ['Autopilot'], 'cool', 10)
node(f, N, 'rp', 20, 230, 150, 40, ['Rudder pedals'], 'gold', 10)
node(f, N, 'st', 20, 300, 150, 40, ['Stabiliser trim'], 'gold', 10)
node(f, N, 'fcc', 230, 50, 180, 110, ['Flight control', 'computers', '(ELAC, SEC, FAC)'], 'hot', 10)
node(f, N, 'ha', 470, 80, 130, 50, ['Hydraulic', 'actuators'], 'hot', 9.5)
for i, t in enumerate(('Elevators', 'Ailerons', 'Spoilers', 'Rudder')): node(f, N, f'c{i}', 640, 30 + i * 60, 110, 36, [t], 'ink', 9.5); conn(f, N, 'ha', f'c{i}', 'hot')
for a, b_ in (('ss', 'fcc'), ('ap', 'fcc'), ('fcc', 'ha')): conn(f, N, a, b_, 'gold' if a != 'fcc' else 'hot')
f.P('M170,250 L560,250 L640,214', 'dim', 1.6, dash='5 3', me='dim'); f.P('M170,320 L600,320', 'dim', 1.6, dash='5 3'); f.T(380, 340, 'mechanical backup', 10, 'dim', 'middle', bold=True)
AFS.append(f)

f = AF('09_12', 'Flight Envelope Protection', 760, 340, 'Flight envelope protection at the centre linked to pitch attitude, load factor, bank angle, angle of attack and high speed protections',
       'In normal law the fly-by-wire computers keep the aircraft inside its flight envelope: load-factor limits, pitch-attitude and bank-angle limits, high angle-of-attack (alpha) protection against the stall, and high-speed (overspeed) protection.')
N = {}
node(f, N, 'c', 290, 140, 180, 56, ['Flight envelope', 'protection'], 'gold')
for k, (x, y, t) in enumerate(((40, 30, ['Pitch attitude', 'protection']), (290, 30, ['Load factor', 'protection']), (540, 30, ['Bank angle', 'protection']), (100, 260, ['Angle of attack', 'protection']), (480, 260, ['High speed', 'protection']))):
    node(f, N, f'p{k}', x, y, 180, 50, t, 'cool', 9.5); conn(f, N, 'c', f'p{k}', 'cool')
AFS.append(f)

f = AF('10_01', 'Light Aircraft Cabin Heating and Ventilation', 760, 340, 'Exhaust muff heat exchanger round the exhaust pipe heating ram air for the cabin and windscreen, with cold air inlets and controls',
       'Ram air passes through a muff (shroud) round the exhaust pipe and is heated, then ducted through the cabin-heat valve to the cabin and windscreen demister; surplus goes overboard. Separate ram-air inlets supply cold air. A cracked exhaust can let carbon monoxide into the cabin — CO detectors are recommended.')
f.R(80, 200, 300, 30, c='ink', sw=1.6, fill='warm', rx=6); f.R(140, 190, 160, 50, c='ink', sw=1.6, fill='none', rx=10); f.T(220, 262, 'exhaust muff (heat exchanger)', 10.5, 'warm', 'middle', bold=True)
f.L(40, 160, 140, 200, 'cool', 2.4, me='cool'); f.T(40, 150, 'ram air', 10.5, 'cool', bold=True)
pipe(f, [(300, 200), (420, 120), (560, 120)], 'hot', 10); f.R(440, 106, 30, 28, c='ink', sw=1.4, fill='gd', rx=3); f.T(455, 98, 'cabin heat valve', 10, 'gold', 'middle', bold=True)
f.L(560, 120, 700, 120, 'hot', 2.4, me='hot'); f.T(700, 110, 'cabin + windscreen', 10.5, 'ink', 'end', bold=True)
f.L(470, 134, 520, 200, 'dim', 2, me='dim'); f.T(530, 214, 'overboard', 10, 'dim', bold=True)
pipe(f, [(560, 300), (700, 300)], 'cool', 8); f.T(560, 288, 'cold air inlet + control', 10.5, 'cool', bold=True)
f.L(380, 215, 440, 215, 'warm', 2, me='warm'); f.T(450, 220, 'exhaust out', 10, 'warm', bold=True)
AFS.append(f)

f = AF('10_02', 'A Combustion Heater', 760, 300, 'Combustion heater with blower, fuel sprayer, igniter and combustion chamber inside a jacket heating ventilation air',
       'A combustion heater burns aircraft fuel in a sealed chamber. A blower supplies combustion air; fuel is sprayed and ignited. Ventilating (ram) air passes over the outside of the chamber and is heated, the combustion gases going overboard through the exhaust. Overheat switches shut it down.')
f.R(200, 80, 380, 140, c='ink', sw=2, fill='g2', rx=50); f.R(240, 110, 300, 80, c='ink', sw=1.6, fill='warm', rx=30)
f.T(390, 154, 'combustion chamber', 11, 'black', 'middle', bold=True, check=False)
f.Ci(150, 220, 26, 'ink', 1.6, 'g3'); f.T(150, 270, 'combustion blower', 10.5, 'ink', 'middle', bold=True); f.L(176, 210, 240, 170, 'cool', 2, me='cool')
f.L(260, 60, 260, 110, 'gold', 2.4, me='gold'); f.T(260, 50, 'fuel sprayer', 10.5, 'gold', 'middle', bold=True)
f.R(300, 200, 20, 30, c='ink', sw=1.2, fill='gold', rx=2); f.T(310, 250, 'igniter', 10.5, 'gold', 'middle', bold=True)
f.L(540, 150, 700, 150, 'warm', 2.4, me='warm'); f.T(700, 140, 'exhaust overboard', 10.5, 'warm', 'end', bold=True)
f.L(100, 100, 200, 100, 'cool', 2.4, me='cool'); f.T(100, 90, 'ram (ventilating) air', 10.5, 'cool', bold=True)
f.L(560, 210, 680, 260, 'hot', 2.4, me='hot'); f.T(700, 280, 'hot air to cabin', 10.5, 'hot', 'end', bold=True)
AFS.append(f)

f = AF('10_04', 'Air Sources and Uses', 760, 380, 'Air sources — engine bleed (low and high stage), APU and ground connection — feeding a manifold that supplies air conditioning packs, anti-icing, engine starting and pressurisation of hydraulic reservoirs and water tanks',
       'Air comes from the engine compressors (low stage normally, high stage at low power) through pre-coolers, from the APU, or from a ground air cart. The manifold supplies the air-conditioning packs (cabin pressurisation and temperature), wing and engine anti-ice, engine starting, and pressurisation of the hydraulic reservoirs and potable water tank.')
N = {}
for i, (t, c_) in enumerate(((['Engine bleed', 'LP / HP stage'], 'hot'), (['APU bleed'], 'hot'), (['Ground connection'], 'dim'))): node(f, N, f's{i}', 20, 40 + i * 110, 170, 50, t, c_, 9.5)
node(f, N, 'm', 280, 140, 170, 60, ['Bleed manifold', '(via pre-coolers)'], 'gold', 9.5)
for i, t in enumerate(('Air-conditioning packs', 'Wing + engine anti-ice', 'Engine starting', 'Hydraulic reservoir press.', 'Water tank pressurisation')):
    node(f, N, f'u{i}', 540, 20 + i * 70, 200, 44, [t], 'cool', 9.5); conn(f, N, 'm', f'u{i}', 'cool')
for i in range(3): conn(f, N, f's{i}', 'm', 'hot')
AFS.append(f)

if __name__ == '__main__':
    gallery(AFS, 'Airframes Gallery 3', 'Airframes — Brakes, Flight Controls & Heating', 'Original figures for brakes, flight controls, powered controls and heating.', 'af3-gallery.html')
    print(len(AFS), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
