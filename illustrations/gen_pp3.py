#!/usr/bin/env python3
"""Powerplant part 3 (chapters 12-13): propellers and gas turbine introduction."""
import math
from pp_common import *

PP = []
def chart(x0, y0, x1, y1, xr, yr):
    return (lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)), (lambda v: y1 - (v - yr[0]) / (yr[1] - yr[0]) * (y1 - y0))

# 12_01 blade nomenclature
f = PF('12_01', 'Propeller Blade Nomenclature', 760, 300, 'Plan view of a propeller blade from tip to butt with leading and trailing edges, shank, root and pitch-change peg',
       'Blade stations are measured from the hub centre. The blade back is the cambered face (facing forward); the blade face is the flat side facing the pilot.')
f.P('M60,150 C60,118 90,106 140,104 L520,112 C560,114 590,122 610,128 L640,128 L640,172 L610,172 C590,178 560,186 520,188 L140,196 C90,194 60,182 60,150 Z', 'ink', 1.8, '#a9bac1')
f.P('M60,150 C60,118 90,106 140,104 L148,104 L148,196 L140,196 C90,194 60,182 60,150 Z', 'none', 0, 'hot')
f.R(640, 120, 26, 60, c='ink', sw=1.6, fill='steel', rx=2); f.R(666, 140, 22, 20, c='ink', sw=1.4, fill='gd', rx=2)
f.T(60, 90, 'TIP', 11, 'ink', 'middle', bold=True)
f.T(330, 90, 'LEADING EDGE', 11, 'ink', 'middle', bold=True); f.T(330, 222, 'TRAILING EDGE', 11, 'ink', 'middle', bold=True)
f.T(600, 100, 'SHANK', 10.5, 'ink', 'middle', bold=True); f.L(600, 104, 614, 124, 'dim', 1)
f.T(653, 214, 'BUTT', 10.5, 'ink', 'middle', bold=True); f.L(653, 202, 653, 182, 'dim', 1)
f.P('M560,240 Q560,250 600,250 Q640,250 640,240', 'dim', 1.4); f.T(600, 270, 'ROOT', 10.5, 'ink', 'middle', bold=True)
f.T(690, 60, 'Pitch-change peg', 10, 'gold', 'middle', bold=True); f.L(690, 66, 680, 138, 'gold', 1)
f.T(104, 250, 'tip area (often painted for visibility)', 9.5, 'dim', 'middle')
PP.append(f)

def vtri(f, ox, oy, rot, tas, blade, chord=150, names=True, aoa_lbl='α'):
    """Velocity triangle: rotation to the right, forward (TAS) up. Returns helix angle."""
    hx = math.degrees(math.atan2(tas, rot))
    f.L(ox - 60, oy, ox + rot + 40, oy, 'line', 1.2, dash='5 4')
    aerofoil(f, ox, oy, chord * 0.5, blade)
    cl = chord * 0.9; f.L(ox - 20 * math.cos(math.radians(blade)), oy + 20 * math.sin(math.radians(blade)), ox + cl * math.cos(math.radians(blade)), oy - cl * math.sin(math.radians(blade)), 'gold', 1.4, dash='6 3')
    f.L(ox, oy, ox + rot, oy, 'cool', 2.6, me='cool'); f.L(ox + rot, oy, ox + rot, oy - tas, 'green', 2.6, me='green')
    f.L(ox, oy, ox + rot, oy - tas, 'hot', 2.6, me='hot')
    arcmark(f, ox, oy, 70, 0, hx, 'hot'); arcmark(f, ox, oy, 104, hx, blade, 'gold')
    return hx

# 12_02 terminology
f = PF('12_02', 'Propeller Terminology', 760, 420, 'Velocity triangle for a blade section showing rotational velocity, forward velocity, helix angle, blade angle and angle of attack, with geometric and effective pitch',
       'The blade section moves along a helical path, the resultant of its rotational velocity and the aircraft forward velocity (TAS). Blade angle is measured from the plane of rotation to the chord; angle of attack is between the chord and the relative airflow. Geometric pitch is the theoretical advance per revolution; effective pitch is the actual advance; the difference is slip.')
hx = vtri(f, 110, 250, 300, 120, 34, chord=170)
f.T(260, 276, 'Rotational velocity (plane of rotation)', 10.5, 'cool', 'middle', bold=True)
f.T(420, 196, 'Forward velocity', 10.5, 'green', bold=True); f.T(420, 210, '(TAS)', 10.5, 'green', bold=True)
f.T(300, 146, 'Resultant (helical path)', 10.5, 'hot', bold=True)
f.T(190, 240, 'helix angle', 10, 'hot', bold=True)
f.T(110, 88, 'angle of attack = blade angle − helix angle', 10, 'gold', bold=True); f.L(200, 94, 204, 186, 'gold', 1)
f.T(246, 164, 'Chord line', 10.5, 'gold', bold=True)
f.T(110, 330, 'Blade angle: plane of rotation → chord', 10.5, 'ink', bold=True)
f.T(110, 348, 'Angle of attack: relative airflow → chord', 10.5, 'ink', bold=True)
f.T(110, 366, 'Helix angle (angle of advance): plane of rotation → path', 10.5, 'ink', bold=True)
f.L(560, 60, 560, 380, 'line', 1)
f.T(650, 60, 'PITCH (per revolution)', 10.5, 'gold', 'middle', bold=True)
f.L(600, 100, 600, 340, 'ink', 1.6, me='ink', ms='ink'); f.T(608, 180, 'geometric', 10, 'ink', bold=True); f.T(608, 194, 'pitch', 10, 'ink', bold=True)
f.L(690, 140, 690, 340, 'hot', 1.6, me='hot', ms='hot'); f.T(682, 240, 'effective', 10, 'hot', 'end', bold=True); f.T(682, 254, 'pitch', 10, 'hot', 'end', bold=True)
f.L(690, 100, 690, 136, 'green', 1.4); f.T(706, 120, 'slip', 10, 'green', bold=True)
f.L(590, 100, 700, 100, 'dim', 1, dash='3 3')
PP.append(f)

# 12_03 fine / coarse
f = PF('12_03', 'Blade Angle — Fine and Coarse Pitch', 760, 300, 'Two blade sections, one at a small blade angle (fine pitch) and one at a large blade angle (coarse pitch)',
       'Fine pitch: small blade angle and small geometric pitch, used for take-off (high rpm, good acceleration). Coarse pitch: large blade angle and large geometric pitch, efficient at high speed.')
for cx, ang, name, sub in ((200, 14, 'FINE PITCH', 'small blade angle, small geometric pitch'), (560, 45, 'COARSE PITCH', 'large blade angle, large geometric pitch')):
    cy = 180; f.L(cx - 140, cy, cx + 140, cy, 'line', 1.2, dash='5 4')
    aerofoil(f, cx, cy, 160, ang)
    f.L(cx, cy, cx + 130 * math.cos(math.radians(ang)), cy - 130 * math.sin(math.radians(ang)), 'gold', 1.4, dash='6 3')
    arcmark(f, cx, cy, 110, 0, ang, 'gold', f'{ang}°', lr=124)
    f.T(cx, 40, name, 13, 'hot', 'middle', bold=True); f.T(cx, 270, sub, 10.5, 'ink', 'middle', bold=True)
f.T(380, 196, 'plane of rotation', 9.5, 'dim', 'middle')
PP.append(f)

# 12_04 angle of attack
f = PF('12_04', 'Propeller Blade Angle of Attack', 760, 320, 'Blade section showing the angle between the actual blade path and the chord line',
       'Angle of attack is the angle between the chord line and the actual path of the blade through the air (the relative airflow comes from the opposite direction).')
cx, cy = 230, 200
f.L(cx - 140, cy, cx + 360, cy, 'line', 1.2, dash='5 4'); f.T(cx + 360, cy + 18, 'plane of rotation', 9.5, 'dim', 'end')
aerofoil(f, cx, cy, 170, 36)
hx = 22
f.L(cx, cy, cx + 330 * math.cos(math.radians(hx)), cy - 330 * math.sin(math.radians(hx)), 'hot', 2.4, me='hot'); f.T(cx + 330, cy - 140, 'actual blade path', 10.5, 'hot', 'end', bold=True)
f.L(cx, cy, cx + 260 * math.cos(math.radians(36)), cy - 260 * math.sin(math.radians(36)), 'gold', 1.6, dash='6 3'); f.T(cx + 214, cy - 166, 'chord line', 10.5, 'gold', 'end', bold=True)
arcmark(f, cx, cy, 150, hx, 36, 'ink', 'α', lr=160, size=12)
f.box(500, 60, 230, 50, ['Angle of attack (α)', 'between blade path and chord'], c='gold')
PP.append(f)

# 12_06 reduced TAS + increased rpm
f = PF('12_06', 'Reduced TAS and Increased RPM', 760, 360, 'Two velocity triangles for a fixed-pitch blade: normal cruise and with reduced airspeed and increased rpm, showing a larger angle of attack',
       'For a fixed blade angle, reducing forward speed or increasing rpm reduces the helix angle, so the angle of attack increases. Increasing TAS at constant rpm does the opposite and can make α negative (windmilling).')
for ox, rot, tas, ttl in ((70, 240, 110, 'CRUISE'), (420, 280, 60, 'INCREASED RPM, REDUCED TAS')):
    blade = 32; hx = vtri(f, ox, 270, rot, tas, blade, chord=140)
    f.T(ox + 120, 34, ttl, 11, 'gold', 'middle', bold=True)
    f.T(ox + rot / 2, 296, 'rotational velocity (rpm)', 9.5, 'cool', 'middle')
    f.T(ox + rot + 6, 270 - tas / 2, 'TAS', 10, 'green', bold=True)
    f.T(ox + 20, 330, f'blade angle {blade}° − helix {hx:.0f}° = α {blade - hx:.0f}°', 10.5, 'ink', bold=True)
PP.append(f)

# 12_07 efficiency curves
f = PF('12_07', 'Propeller Efficiency Curves', 760, 360, 'Propeller efficiency against aircraft speed for fine and coarse pitch propellers, with a variable pitch propeller following the peaks',
       'A fixed-pitch propeller is efficient over only a narrow speed range: fine pitch at low speed, coarse at high speed. A variable-pitch propeller keeps the blade near its best angle of attack, maintaining near-peak efficiency between the two.')
x0, y0, x1, y1 = 100, 50, 720, 300
axes(f, x0, y0, x1, y1, 'AIRCRAFT SPEED →', 'PROPELLER EFFICIENCY')
smooth(f, [(x0, y1), (200, 180), (300, 106), (380, 92), (430, 120), (470, 190)], 'hot', 2.6)
smooth(f, [(x0, y1), (260, 220), (420, 130), (540, 92), (610, 106), (660, 170)], 'cool', 2.6)
f.P('M380,92 C440,84 500,84 540,92', 'gold', 3, dash='6 4')
f.T(250, 120, 'FINE PITCH', 10.5, 'hot', 'end', bold=True); f.T(640, 196, 'COARSE PITCH', 10.5, 'cool', 'middle', bold=True)
f.T(460, 66, 'Variable pitch: near-peak efficiency throughout', 10.5, 'gold', 'middle', bold=True)
PP.append(f)

# 12_09 single-acting pitch change mechanism
f = PF('12_09', 'Pitch Change Mechanism — Single Acting', 760, 400, 'Propeller hub with an oil-operated piston and cylinder, feathering spring, operating link to the blade and counterweight',
       'Oil from the CSU through the oil tube drives the piston, which turns the blades towards fine pitch through the operating links. The feathering spring and the blade counterweights turn them towards coarse and feather when oil pressure is reduced or lost.')
f.R(20, 168, 120, 64, c='ink', sw=1.4, fill='steel', rx=3); f.T(80, 252, 'Engine shaft', 10.5, 'ink', 'middle', bold=True)
f.R(140, 160, 200, 80, c='ink', sw=1.8, fill='g3', rx=6)
for sg in (-1, 1):
    f.R(220, 40 if sg > 0 else 240, 60, 120, c='ink', sw=1.6, fill='#a9bac1', rx=4)
    f.R(176, 136 if sg > 0 else 248, 44, 16, c='ink', sw=1.4, fill='gd', rx=4)
    py = 200 - sg * 50; f.P(f'M520,{200 - sg * 50} L520,{200 - sg * 70} L290,{200 - sg * 70}', 'ink', 2.4); f.Ci(286, 200 - sg * 70, 6, 'ink', 1.4, 'g3')
f.R(340, 150, 220, 100, c='ink', sw=1.8, fill='g2', rx=8)
for i in range(10): f.P(f'M{352 + i * 15},156 L{360 + i * 15},244', 'cool', 2)
f.R(506, 154, 28, 92, c='ink', sw=1.6, fill='hot', rx=2)
f.R(20, 194, 490, 12, c='ink', sw=1.2, fill='hot', rx=2)
f.T(250, 26, 'Propeller blade', 10.5, 'ink', 'middle', bold=True)
f.T(110, 110, 'Counterweight', 10.5, 'gold', 'middle', bold=True); f.L(140, 116, 186, 136, 'gold', 1)
f.T(410, 116, 'Operating link', 10.5, 'ink', 'middle', bold=True)
f.T(610, 166, 'Cylinder', 10.5, 'ink', bold=True)
f.T(610, 210, 'Piston', 10.5, 'ink', bold=True)
f.T(400, 304, 'Feathering spring', 10.5, 'cool', 'middle', bold=True); f.L(400, 292, 400, 246, 'cool', 1)
f.T(30, 150, 'Oil tube (from CSU)', 10, 'hot', bold=True); f.L(80, 154, 80, 192, 'hot', 1)
f.T(380, 388, 'Oil pressure → FINE;  Spring + counterweights → COARSE / FEATHER', 11, 'ink', 'middle', bold=True)
PP.append(f)

# 12_10 double acting
f = PF('12_10', 'Pitch Change Mechanism — Double Acting', 760, 340, 'Cylinder and piston with fine pitch oil supplied to one side and coarse pitch oil to the other through concentric tubes',
       'In a double-acting unit oil pressure moves the piston both ways: fine-pitch oil through the centre tube to one side, coarse-pitch oil through the outer annulus to the other. The piston motion is converted to blade rotation through a cam or link.')
f.raw('<defs><clipPath id="dac"><rect x="300" y="80" width="360" height="180" rx="60"/></clipPath></defs>')
f.raw('<g clip-path="url(#dac)">'); f.R(300, 80, 160, 180, c='none', sw=0, fill='hot', rx=0, op=0.85); f.R(490, 80, 170, 180, c='none', sw=0, fill='green', rx=0, op=0.85); f.raw('</g>')
f.R(300, 80, 360, 180, c='ink', sw=2, fill='none', rx=60)
f.R(460, 82, 30, 176, c='ink', sw=1.6, fill='#a9bac1', rx=2); f.T(475, 278, 'Piston', 10.5, 'ink', 'middle', bold=True)
f.R(40, 158, 300, 24, c='ink', sw=1.4, fill='hot', rx=0); f.R(40, 164, 560, 12, c='ink', sw=1.2, fill='green', rx=0)
f.T(150, 150, 'Coarse pitch oil (outer annulus)', 10.5, 'hot', 'middle', bold=True)
f.T(150, 202, 'Fine pitch oil (centre tube)', 10.5, 'green', 'middle', bold=True)
f.T(380, 60, 'coarse-pitch chamber', 10, 'hot', 'middle', bold=True); f.T(580, 60, 'fine-pitch chamber', 10, 'green', 'middle', bold=True)
f.T(380, 316, 'Piston moves towards the lower-pressure side; the link turns the blades.', 10, 'dim', 'middle')
PP.append(f)

# 12_11 various pitch angles
f = PF('12_11', 'Blade Sections at Various Pitch Angles', 760, 300, 'Blade sections at reverse, fine, coarse and feathered angles relative to the plane of rotation',
       'From reverse (negative blade angle, for braking on the ground) through fine and coarse to feathered (about 90°, edge-on to the airflow so a failed engine is not windmilled).')
for i, (ang, name, sub) in enumerate(((-12, 'REVERSE', 'negative angle'), (12, 'FINE', 'take-off, high rpm'), (40, 'COARSE', 'cruise'), (86, 'FEATHERED', '≈ 90°, edge-on'))):
    cx, cy = 100 + i * 186, 160
    f.L(cx - 80, cy, cx + 80, cy, 'line', 1.2, dash='5 4'); aerofoil(f, cx, cy, 120, ang)
    f.T(cx, 50, name, 12, 'gold', 'middle', bold=True); f.T(cx, 254, f'{ang}°', 12, 'ink', 'middle', bold=True); f.T(cx, 272, sub, 10, 'dim', 'middle')
f.L(30, 100, 30, 60, 'green', 2.2, me='green'); f.T(40, 84, 'direction', 9.5, 'green'); f.T(40, 96, 'of flight', 9.5, 'green')
f.L(680, 214, 730, 214, 'cool', 2.2, me='cool'); f.T(705, 232, 'rotation', 9.5, 'cool', 'middle')
PP.append(f)

# CSU figures
def csu_fig(tag, title, state, aria, cap, note_):
    f = PF(tag, title, 760, 440, aria, cap)
    cx = 300
    P, by, fy = csu(f, cx, state, top=40)
    pr = {'on': None, 'over': 'coarse', 'under': 'fine'}[state]
    for k in ('coarse', 'fine'):
        x, y = P[k]; c_ = 'hot' if k == pr else ('cool' if pr else 'dim')
        pipe(f, [(x, y), (x + 120, y)], c_, 10)
        f.T(x + 130, y + 4, k.upper() + (' ← oil from prop' if (pr and k != pr) else (' → oil to prop' if k == pr else '')), 10.5, 'ink', bold=True)
    pipe(f, [(P['press'][0] - 120, P['press'][1]), P['press']], 'hot', 10); f.T(P['press'][0] - 124, P['press'][1] - 12, 'Pressure oil', 10.5, 'hot', bold=True)
    for k in ('ret1', 'ret2'): pipe(f, [(P[k][0] - 120, P[k][1]), P[k]], 'cool', 8)
    f.T(P['ret1'][0] - 124, P['ret1'][1] - 12, 'Return oil', 10.5, 'cool', bold=True)
    f.T(cx + 70, 50, 'rpm lever input', 10, 'ink', bold=True)
    f.T(cx - 24, 100, 'Speeder spring', 10.5, 'cool', 'end', bold=True)
    f.T(cx - 70, fy - 10, 'Flyweights', 10.5, 'ink', 'end', bold=True)
    f.T(cx, by + 150, 'Pilot valve', 10.5, 'ink', 'middle', bold=True)
    if state != 'on':
        a = 'gold'; yy = fy - 50
        if state == 'over': f.L(cx - 90, yy + 10, cx - 110, yy - 10, a, 2, me=a); f.L(cx + 90, yy + 10, cx + 110, yy - 10, a, 2, me=a); f.L(cx + 14, by + 20, cx + 14, by - 4, a, 2.2, me=a)
        else: f.L(cx - 110, yy - 10, cx - 90, yy + 10, a, 2, me=a); f.L(cx + 110, yy - 10, cx + 90, yy + 10, a, 2, me=a); f.L(cx + 14, by - 4, cx + 14, by + 20, a, 2.2, me=a)
    note(f, 500, 90, note_, size=10.5, lh=16, c='ink', first='gold')
    return f
PP.append(csu_fig('12_12', 'Constant Speed Unit — On Speed', 'on', 'CSU with flyweights upright balanced against the speeder spring and the pilot valve lands covering both oil ports',
    'On speed, flyweight force exactly balances the speeder spring set by the rpm lever. The pilot valve is central, its lands block both the coarse and fine ports and the blade angle is held.',
    ['ON SPEED (neutral)', 'Flyweight force = spring force.', 'Pilot valve blocks both', 'ports: blade angle held.']))
PP.append(csu_fig('12_13', 'Constant Speed Unit — Overspeed', 'over', 'CSU with flyweights thrown outwards lifting the pilot valve so pressure oil flows to the coarse port',
    'Overspeed (e.g. after diving or reducing load): the flyweights fly out and lift the pilot valve against the speeder spring. Pressure oil goes to coarse pitch, increasing the blade angle and load until rpm returns to the selected value.',
    ['OVERSPEED', 'Flyweights out, valve lifted.', 'Oil → COARSE: blade angle', 'increases, rpm falls back.']))
PP.append(csu_fig('12_14', 'Constant Speed Unit — Underspeed', 'under', 'CSU with flyweights moved inwards and the pilot valve lowered so pressure oil flows to the fine port',
    'Underspeed (e.g. in a climb): the flyweights move in and the speeder spring pushes the pilot valve down. Pressure oil goes to fine pitch, reducing the blade angle and load until rpm recovers.',
    ['UNDERSPEED', 'Flyweights in, valve lowered.', 'Oil → FINE: blade angle', 'decreases, rpm rises back.']))

# 12_15 PCU (turboprop)
f = PF('12_15', 'Turboprop Propeller Control Unit (PCU)', 760, 400, 'Block diagram of a turboprop propeller control unit: governor, oil pump, pitch lock, feather and unfeather supply, valve lift solenoid and coarse/fine lines',
       'The turboprop PCU combines a governor (flyweights against a governor spring set by the condition lever) with a high-pressure oil pump, a pitch lock that stops the blades fining off if oil pressure is lost, and feather/unfeather and beta (ground fine) controls.')
f.box(30, 40, 170, 50, ['Condition / power lever', 'sets governor spring'], c='gold', size=10)
f.box(30, 130, 170, 60, ['Governor', 'flyweights v spring'], c='ink')
f.box(30, 230, 170, 50, ['Oil pump', '(engine driven)'], c='cool')
f.box(30, 320, 170, 50, ['Engine oil inlet'], c='dim')
f.box(280, 130, 180, 60, ['Governor (pilot) valve', 'directs oil'], c='ink', size=10)
f.box(280, 40, 180, 50, ['Valve lift solenoid', 'feather / beta'], c='hot', size=10)
f.box(280, 230, 180, 50, ['Relief valve', 'limits pressure'], c='dim', size=10)
f.box(540, 60, 190, 50, ['COARSE line', 'to prop'], c='cool')
f.box(540, 150, 190, 50, ['FINE line', 'to prop'], c='hot')
f.box(540, 240, 190, 60, ['Pitch lock', 'holds blade angle if', 'oil pressure lost'], c='gold', size=10)
f.box(540, 330, 190, 50, ['Feather / unfeather', 'oil supply'], c='hot', size=10)
for a, b in (((115, 90), (115, 130)), ((115, 230), (115, 190)), ((115, 320), (115, 280)), ((200, 160), (280, 160)), ((200, 255), (280, 255)), ((370, 90), (370, 130)),
             ((460, 150), (540, 85)), ((460, 170), (540, 175)), ((460, 180), (540, 270)), ((460, 190), (540, 355))): f.L(*a, *b, 'dim', 1.6, me='dim')
PP.append(f)

# 12_17 CSU with unfeathering accumulator
f = PF('12_17', 'CSU with Unfeathering Accumulator', 760, 400, 'Block diagram of a constant speed unit with an unfeathering accumulator, solenoid valve, non-return valves and feather button',
       'The accumulator stores oil under pressure while the engine runs. To unfeather in flight with the engine stopped, the unfeathering button opens the solenoid valve and the stored oil drives the blades out of feather until the propeller windmills and the engine-driven pump takes over.')
f.box(250, 30, 260, 50, ['Propeller control lever', '→ control (speeder) spring'], c='gold', size=10)
f.box(250, 120, 260, 70, ['CSU', 'centrifugal weights, pilot valve', 'non-return valve'], c='ink', size=10)
f.box(250, 240, 120, 50, ['CSU oil pump'], c='cool', size=10)
f.box(390, 240, 120, 50, ['Relief valve'], c='dim', size=10)
f.box(40, 120, 150, 70, ['Unfeathering', 'accumulator', '(stored oil)'], c='hot', size=10)
f.box(40, 240, 150, 50, ['Solenoid valve'], c='hot', size=10)
f.box(40, 330, 150, 50, ['Unfeathering button'], c='gold', size=10)
f.box(570, 120, 160, 70, ['Propeller', 'oil line', '(pitch change)'], c='ink', size=10)
f.box(250, 330, 260, 50, ['Engine oil supply, drive shaft'], c='dim', size=10)
for a, b in (((380, 80), (380, 120)), ((310, 240), (310, 190)), ((380, 330), (310, 290)), ((510, 155), (570, 155)), ((115, 190), (115, 240)), ((115, 330), (115, 290)), ((190, 265), (250, 175)), ((250, 140), (190, 140))):
    f.L(*a, *b, 'dim', 1.6, me='dim')
f.T(220, 132, 'charges', 9.5, 'dim', 'middle')
PP.append(f)

# 12_18 feathering installation
f = PF('12_18', 'Typical Feathering Installation', 760, 360, 'Feathering button with hold-in coil, battery, solenoid relay, electric feathering pump drawing from the oil tank, and pressure cut-out switch',
       'Pressing the feathering button energises the relay, which runs the electric feathering pump. Oil from a reserve in the tank is pumped to the CSU and propeller to drive the blades to feather. When the blades reach the feathered stop, pressure rises and the pressure cut-out switch de-energises the hold-in coil, releasing the button.')
f.box(30, 40, 170, 60, ['Feathering button', 'with hold-in coil'], c='hot', size=10)
f.box(30, 250, 140, 50, ['Battery / bus'], c='gold', size=10)
f.box(280, 250, 160, 50, ['Solenoid relay'], c='gold', size=10)
f.box(280, 140, 160, 60, ['Electric feathering', 'pump'], c='cool', size=10)
f.box(520, 40, 160, 50, ['Oil tank', '(feathering reserve)'], c='cool', size=10)
f.box(520, 140, 200, 60, ['CSU / propeller', 'drives blades to feather'], c='ink', size=10)
f.box(280, 40, 160, 50, ['Pressure cut-out', 'switch'], c='hot', size=10)
for a, b, c_ in (((100, 250), (100, 100), 'gold'), ((170, 275), (280, 275), 'gold'), ((360, 250), (360, 200), 'gold'), ((600, 90), (420, 150), 'cool'), ((440, 170), (520, 170), 'cool'), ((520, 150), (440, 65), 'hot'), ((280, 65), (200, 70), 'hot')):
    f.L(*a, *b, c_, 1.8, me=c_)
f.T(240, 60, 'releases', 9.5, 'hot', 'middle'); f.T(480, 230, 'feathering oil', 9.5, 'cool', 'middle')
PP.append(f)

# 12_19 synchronisation
f = PF('12_19', 'Propeller Synchronisation System', 760, 360, 'Master governor and slave governor with magnetic pickups feeding a control box which drives an actuator to trim the slave governor',
       'Magnetic pickups measure the rpm of both propellers. The control box compares them and drives an actuator (through a flexible shaft) to trim the slave governor speed setting until it matches the master, removing the beat from unsynchronised propellers. The trim range is limited, so a failure cannot cause a large rpm change.')
f.box(40, 60, 170, 60, ['Master governor', '(left engine)'], c='gold')
f.box(550, 60, 170, 60, ['Slave governor', '(right engine)'], c='cool')
f.box(290, 160, 180, 70, ['Control box', 'compares rpm'], c='ink')
f.box(550, 230, 170, 60, ['Actuator', 'trims slave setting'], c='hot')
f.L(125, 120, 300, 190, 'gold', 1.8, me='gold'); f.T(170, 176, 'magnetic pickup', 9.5, 'gold')
f.L(635, 120, 460, 190, 'cool', 1.8, me='cool'); f.T(590, 176, 'magnetic pickup', 9.5, 'cool', 'end')
f.L(470, 215, 550, 255, 'hot', 1.8, me='hot'); f.L(635, 230, 635, 122, 'hot', 1.8, me='hot', dash='5 3'); f.T(645, 180, 'flex shaft', 9.5, 'hot')
PP.append(f)

# 12_22 reduction gears
f = PF('12_22', 'Spur-Type Reduction Gears', 760, 340, 'Two reduction gear arrangements: A, external spur gears with offset shafts turning in opposite directions; B, a pinion inside an internal ring gear turning the same way',
       'A: a small pinion on the crankshaft drives a larger gear on an offset propeller shaft — the propeller turns slower and in the opposite direction. B: the pinion drives an internal (ring) gear — slower, same direction. Reduction ratio = driven teeth ÷ driving teeth.')
def gear(cx, cy, r, n, c_='#a9bac1'):
    pts = []
    for k in range(n * 2):
        a = math.pi * k / n; rr = r if k % 2 == 0 else r - 8
        for da in (-0.25, 0.25): pts.append((cx + rr * math.cos(a + da * math.pi / n), cy + rr * math.sin(a + da * math.pi / n)))
    f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + ' Z', 'ink', 1.4, c_); f.Ci(cx, cy, 8, 'ink', 1.2, 'g3')
gear(250, 150, 90, 24); gear(152, 223, 38, 10, 'gd')
f.P('M240,46 A104,104 0 0 1 340,110', 'cool', 2, me='cool'); f.P('M106,195 A54,54 0 0 0 114,263', 'gold', 2, me='gold')
f.T(152, 300, 'crankshaft pinion', 10, 'gold', 'middle', bold=True); f.T(330, 40, 'propeller gear', 10, 'cool', bold=True)
f.T(200, 326, 'A  opposite rotation, offset shaft', 11, 'ink', 'middle', bold=True)
f.Ci(570, 160, 110, 'ink', 1.4, 'g2'); f.Ci(570, 160, 96, 'ink', 1.4, 'bg')
for k in range(40): a = k * 9; p, q = pol(570, 160, 96, a), pol(570, 160, 88, a); f.L(p[0], p[1], q[0], q[1], 'ink', 3)
gear(570, 102, 30, 9, 'gd')
f.P('M560,40 A120,120 0 0 1 670,90', 'cool', 2, me='cool'); f.P('M594,140 A34,34 0 0 1 546,140', 'gold', 2, me='gold')
f.T(570, 300, 'B  internal ring gear, same rotation', 11, 'ink', 'middle', bold=True)
PP.append(f)

# 13_01 aeolipile
f = PF('13_01', 'Hero’s Aeolipile — Reaction Principle', 760, 340, 'A sphere mounted above a boiler, with steam escaping from two bent nozzles making the sphere spin',
       'About 2000 years ago Hero of Alexandria showed jet reaction: steam escaping rearwards from two bent nozzles pushes the sphere round the other way — Newton’s third law, the principle of every jet engine.')
f.P('M250,250 Q380,320 510,250 L500,200 L260,200 Z', 'ink', 1.8, 'steel'); f.T(380, 236, 'boiler (water)', 10, 'white', 'middle', bold=True, check=False)
f.L(380, 200, 380, 110, 'ink', 6); f.T(392, 196, 'steam feed / pivot', 9.5, 'dim')
f.Ci(380, 110, 56, 'ink', 1.8, '#a9bac1'); f.Ci(380, 110, 6, 'ink', 1.2, 'g3')
f.P('M380,54 L380,38 L414,38', 'ink', 6); f.P('M380,166 L380,182 L346,182', 'ink', 6)
for k in range(4): f.L(418, 38, 470 + k * 10, 26 + k * 8, 'cool', 1.4)
for k in range(4): f.L(342, 182, 290 - k * 10, 194 - k * 8, 'cool', 1.4)
f.T(510, 40, 'steam jet', 10, 'cool', bold=True); f.T(250, 216, 'steam jet', 10, 'cool', 'end', bold=True)
f.P('M326,76 A66,66 0 0 0 326,144', 'gold', 2.4, me='gold'); f.T(300, 110, 'rotation', 10, 'gold', 'end', bold=True)
for x in (330, 370, 410, 440): f.P(f'M{x},300 Q{x - 10},286 {x},270 Q{x + 10},284 {x},300', 'warm', 1.6, 'hot')
f.T(380, 330, 'heat', 10, 'hot', 'middle')
PP.append(f)

# 13_02 athodyd and Whittle
f = PF('13_02', 'Athodyd (Ramjet) and Whittle Turbojet', 760, 420, 'An aerodynamic thermal duct with fuel and flame holders, and a Whittle-type turbojet with centrifugal compressor, combustion chamber and turbine',
       'The athodyd (ramjet) has no moving parts: forward speed rams air in, fuel is burnt and the hot gas accelerates out. It cannot produce thrust when stationary. Whittle added a compressor driven by a turbine, so the engine works from rest.')
def duct(y, h1, h2):
    pts = [(80, h1), (200, h2 * 0.8), (330, h2), (560, h2), (680, h1 * 0.8)]
    for sg in (-1, 1): f.P('M' + ' L'.join(f'{x},{y - sg * h}' for x, h in pts) + ' L' + ' L'.join(f'{x},{y - sg * (h + 12)}' for x, h in pts[::-1]) + ' Z', 'ink', 1.4, 'steel')
duct(110, 40, 64)
for yy in (90, 110, 130): f.P(f'M300,{yy} q14,-10 28,0 q-14,10 -28,0', 'gold', 1, 'warm')
f.L(300, 190, 300, 132, 'cool', 2); f.T(300, 206, 'fuel supply', 9.5, 'cool', 'middle')
f.T(380, 28, 'ATHODYD (aerodynamic thermal duct / ramjet)', 11, 'gold', 'middle', bold=True)
for yy in (100, 120): f.L(20, yy, 70, yy, 'gold', 2, me='gold')
f.T(20, 88, 'ram air', 9.5, 'gold')
duct(320, 46, 64)
f.P('M120,320 L160,300 L160,340 Z', 'ink', 1.2, '#a9bac1'); f.R(160, 268, 26, 104, c='ink', sw=1.4, fill='cool', rx=4); f.T(173, 392, 'centrifugal', 9.5, 'cool', 'middle'); f.T(173, 404, 'compressor', 9.5, 'cool', 'middle')
for sg in (-1, 1): f.R(260, 320 - sg * 40 - 10, 160, 20, c='ink', sw=1.2, fill='warm', rx=10)
f.T(340, 392, 'combustion chamber', 9.5, 'warm', 'middle')
f.R(460, 276, 14, 88, c='ink', sw=1.4, fill='warm', rx=2); f.T(467, 392, 'turbine', 9.5, 'warm', 'middle')
f.L(186, 320, 460, 320, 'ink', 4); f.T(320, 314, 'shaft', 9.5, 'dim', 'middle')
f.T(380, 236, 'WHITTLE-TYPE TURBOJET', 11, 'gold', 'middle', bold=True)
f.L(600, 320, 720, 320, 'hot', 3, me='hot'); f.T(700, 306, 'jet', 10, 'hot', bold=True)
PP.append(f)

# 13_03 Otto vs Brayton
f = PF('13_03', 'Otto Cycle and Brayton Cycle', 760, 440, 'Four piston strokes of the Otto cycle above a gas turbine showing the same four processes happening continuously in separate components',
       'Both engines induce, compress, burn and exhaust. In the piston (Otto) engine the four happen one after another in the same cylinder; in the gas turbine (Brayton cycle) they happen continuously and simultaneously in separate components, and combustion is at constant pressure.')
f.T(380, 22, 'THE OTTO CYCLE (piston engine): intermittent, one cylinder', 11, 'gold', 'middle', bold=True)
for i, (th, ch, iv, ev, n) in enumerate(((120, 'cool', True, False, 'INDUCTION'), (240, '#9b6fd0', False, False, 'COMPRESSION'), (60, 'warm', False, False, 'POWER'), (300, '#8a6a4a', False, True, 'EXHAUST'))):
    cyl(f, 110 + i * 180, 180, th=th, s=0.62, charge=ch, iv=iv, ev=ev, spark=(i == 2)); f.T(110 + i * 180, 230, n, 10, 'ink', 'middle', bold=True)
f.T(380, 262, 'THE BRAYTON CYCLE (gas turbine): continuous, separate components', 11, 'gold', 'middle', bold=True)
jet(f, 60, 340, 640, R=50, labels=True)
PP.append(f)

# 13_04 PV diagram
f = PF('13_04', 'The Brayton Cycle on a Pressure–Volume Diagram', 760, 400, 'Pressure against volume: compression from A to B, combustion at nearly constant pressure B to C, expansion C to D and induction D to A',
       'A→B compression in the compressor (pressure rises, volume falls). B→C combustion at almost constant pressure — volume increases greatly as heat is added. C→D expansion through the turbine and nozzle back to ambient. D→A: the cycle is completed with ambient air entering the intake.')
x0, y0, x1, y1 = 100, 40, 700, 340
axes(f, x0, y0, x1, y1, 'VOLUME', 'PRESSURE')
A, B, C, D = (190, 320), (150, 90), (300, 96), (620, 320)
smooth(f, [A, (164, 260), (152, 160), B], 'cool', 3); f.L(*B, *C, 'hot', 3); smooth(f, [C, (380, 200), (480, 280), D], 'gold', 3); f.L(*D, *A, 'dim', 3)
for p, n in ((A, 'A'), (B, 'B'), (C, 'C'), (D, 'D')): f.Ci(*p, 5, 'ink', 1.2, 'white'); f.T(p[0] - 10 if n in 'AB' else p[0] + 10, p[1] - 8, n, 12, 'ink', 'end' if n in 'AB' else 'start', bold=True)
f.T(150, 200, 'COMPRESSION', 10.5, 'cool', 'end', bold=True)
f.T(225, 80, 'COMBUSTION', 10.5, 'hot', 'middle', bold=True)
f.T(430, 200, 'EXPANSION (turbine + nozzle)', 10.5, 'gold', bold=True)
f.T(405, 312, 'INDUCTION (ambient)', 10.5, 'dim', 'middle', bold=True)
note(f, 400, 70, ['Heat energy added in the combustion', 'chambers at constant pressure;', 'useful work = area enclosed.'], size=10, lh=14, c='ink')
PP.append(f)

# 13_05 gas flow parameters
f = PF('13_05', 'Pressure, Temperature and Velocity Through the Engine', 760, 460, 'A turbojet above a graph of total pressure, temperature and axial velocity through each section of the engine',
       'Pressure rises through the compressor to its maximum at compressor delivery, falls slightly in the combustion chambers and drops through the turbine and nozzle. Temperature rises through the compressor and sharply in combustion, then falls through turbine and nozzle. Axial velocity is kept fairly constant through the compressor, reduced in the diffuser for combustion, then rises through the turbine and accelerates in the nozzle.')
X = jet(f, 80, 100, 600, R=56, labels=True)
x0, y0, x1, y1 = 80, 190, 680, 420
f.L(x0, y1, x1, y1, 'dim', 1.6); f.L(x0, y1, x0, y0, 'dim', 1.6)
for t in (.16, .46, .64, .72): f.L(X(t), 160, X(t), y1, 'line', 1, dash='4 4')
curve(f, [(X(0), 390), (X(.16), 386), (X(.46), 214), (X(.64), 226), (X(.72), 340), (X(1), 396)], 'cool', 3)
curve(f, [(X(0), 404), (X(.16), 402), (X(.46), 340), (X(.5), 340), (X(.64), 230), (X(.72), 300), (X(1), 340)], 'hot', 3)
curve(f, [(X(0), 380), (X(.16), 370), (X(.46), 372), (X(.52), 384), (X(.64), 370), (X(.72), 330), (X(1), 250)], 'gold', 3)
for i, (t, c_) in enumerate((('Total pressure', 'cool'), ('Temperature', 'hot'), ('Axial velocity', 'gold'))):
    f.L(100, 210 + i * 18, 124, 210 + i * 18, c_, 3); f.T(130, 214 + i * 18, t, 10.5, c_, bold=True)
f.T(X(.46), 206, 'max pressure (compressor delivery)', 9.5, 'cool', 'middle')
PP.append(f)

# 13_06 ducts
f = PF('13_06', 'Divergent and Convergent Ducts', 760, 390, 'Subsonic airflow in a divergent duct slowing with rising pressure, and in a convergent duct accelerating with falling pressure',
       'For subsonic flow a divergent duct slows the air and raises its pressure and temperature (diffuser, compressor outlet, combustion inlet). A convergent duct accelerates it, lowering pressure and temperature (nozzle guide vanes, propelling nozzle).')
for y, a, b, name, sub, c_ in ((90, 26, 64, 'DIVERGENT DUCT', 'velocity ↓   pressure ↑   temperature ↑', 'cool'), (290, 64, 26, 'CONVERGENT DUCT', 'velocity ↑   pressure ↓   temperature ↓', 'hot')):
    for sg in (-1, 1): f.L(140, y - sg * a, 620, y - sg * b, 'ink', 2.4)
    for k in range(-2, 3):
        fr = k / 2.6
        f.L(150, y + fr * a, 610, y + fr * b, c_, 1.2)
    for k in range(3): x = 200 + k * 160; L = (30 if a < b else 14) + (k * (-8 if a < b else 10)); f.L(x, y, x + L, y, 'gold', 2.4, me='gold')
    f.T(380, y - max(a, b) - 14, name, 11.5, c_, 'middle', bold=True); f.T(380, y + max(a, b) + 24, sub, 10.5, 'ink', 'middle', bold=True)
PP.append(f)

# 13_09 centrifugal flow turbojet
f = PF('13_09', 'Centrifugal-Flow Turbojet', 760, 380, 'A turbojet with a double-entry centrifugal compressor, combustion chambers around the engine and a single-stage turbine',
       'Air enters both faces of a double-sided impeller, is flung outward and diffused, then turned into the combustion chambers arranged around the engine. The hot gas drives the turbine, which drives the impeller, and leaves through the jet pipe.')
cy = 190
f.R(180, cy - 110, 40, 220, c='ink', sw=1.6, fill='cool', rx=8); f.T(200, cy + 140, 'double-entry impeller', 10, 'cool', 'middle', bold=True)
for sg in (-1, 1):
    f.P(f'M220,{cy - sg * 100} C320,{cy - sg * 160} 420,{cy - sg * 150} 460,{cy - sg * 70}', 'warm', 18)
    f.P(f'M220,{cy - sg * 100} C320,{cy - sg * 160} 420,{cy - sg * 150} 460,{cy - sg * 70}', 'ink', 1)
    f.L(60, cy - sg * 60, 170, cy - sg * 60, 'gold', 2.2, me='gold'); f.L(300, cy - sg * 20, 230, cy - sg * 20, 'gold', 2.2, me='gold')
f.T(340, cy - 160, 'combustion chambers', 10, 'warm', 'middle', bold=True)
f.R(470, cy - 70, 16, 140, c='ink', sw=1.4, fill='warm', rx=2); f.T(478, cy + 96, 'turbine', 10, 'warm', 'middle', bold=True)
f.L(200, cy, 480, cy, 'ink', 5); f.T(340, cy - 8, 'shaft', 9.5, 'dim', 'middle')
for sg in (-1, 1): f.L(486, cy - sg * 70, 690, cy - sg * 40, 'ink', 2.4)
f.L(560, cy, 720, cy, 'hot', 3, me='hot'); f.T(620, cy - 10, 'jet pipe', 10, 'ink', 'middle', bold=True)
f.T(60, cy - 70, 'air', 10, 'gold', bold=True); f.T(260, cy - 30, 'rear entry', 9.5, 'gold', 'middle')
PP.append(f)

if __name__ == '__main__':
    gallery(PP, 'Powerplant Gallery 3', 'Powerplant — Propellers & Gas Turbine Introduction', 'Original figures for propellers and the gas turbine introduction.', 'pp3-gallery.html')
    print(len(PP), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
