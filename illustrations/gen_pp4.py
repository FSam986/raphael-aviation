#!/usr/bin/env python3
"""Powerplant part 4 (chapters 13-18): engine layouts, compressors, combustion, turbines, exhausts."""
import math
from pp_common import *

PP = []
def chart(x0, y0, x1, y1, xr, yr):
    return (lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)), (lambda v: y1 - (v - yr[0]) / (yr[1] - yr[0]) * (y1 - y0))
def mirror(f, pts, cy, c='ink', sw=1.6, fill='none'):
    for sg in (-1, 1): f.P('M' + ' L'.join(f'{x:.1f},{cy - sg * r:.1f}' for x, r in pts), c, sw, fill)
def band(f, outer, inner, cy, fill, c='ink', sw=1.2, op=None):
    for sg in (-1, 1):
        f.P('M' + ' L'.join(f'{x:.1f},{cy - sg * r:.1f}' for x, r in outer) + ' L' + ' L'.join(f'{x:.1f},{cy - sg * r:.1f}' for x, r in inner[::-1]) + ' Z', c, sw, fill, op=op)
def blades(f, x0, x1, n, r_in, r_out, cy, c1='ink', c2='cool', sw=2.4):
    for i in range(n):
        x = x0 + (x1 - x0) * i / max(n - 1, 1); ri = r_in(x) if callable(r_in) else r_in; ro = r_out(x) if callable(r_out) else r_out
        for sg in (-1, 1): f.L(x, cy - sg * ri, x, cy - sg * ro, c1 if i % 2 == 0 else c2, sw)

# 13_10 twin spool low bypass
f = PF('13_10', 'Twin-Spool Low-Bypass Turbofan — Engine Stations', 760, 380, 'Side section of a twin-spool low bypass ratio engine with LP and HP compressors and turbines on concentric shafts, and numbered engine stations',
       'The LP compressor is driven by the LP turbine on the inner shaft (N1); the HP compressor by the HP turbine on the outer shaft (N2). Station numbers: 0 ambient, 1 intake, 2 LP compressor face, 3 HP compressor delivery, 4 turbine entry, 5–6 turbine exit, 7–8 jet pipe and nozzle. P and T at each station are total pressure and temperature.')
cy = 200
band(f, [(60, 92), (680, 92)], [(60, 86), (680, 86)], cy, 'steel')
band(f, [(150, 80), (300, 68), (340, 64), (480, 64), (540, 58), (680, 40)], [(150, 74), (300, 62), (340, 58), (480, 58), (540, 52), (680, 34)], cy, 'steel')
mirror(f, [(60, 0), (90, 6), (150, 26), (300, 40), (460, 40), (540, 36), (620, 0)], cy, 'ink', 1.4)
blades(f, 100, 150, 4, lambda x: 6 + (x - 90) * 0.3, 84, cy, 'cool', 'cool', 3)
blades(f, 170, 300, 9, lambda x: 28 + (x - 150) * 0.08, lambda x: 72 - (x - 150) * 0.06, cy, 'gold', 'ink', 2.4)
for sg in (-1, 1): f.R(340, cy - sg * 50 - 7, 100, 14, c='ink', sw=1, fill='warm', rx=7)
blades(f, 460, 470, 2, 40, 58, cy, 'gold', 'gold', 3); blades(f, 490, 520, 3, 38, 56, cy, 'cool', 'cool', 3)
f.R(90, cy - 4, 440, 8, c='ink', sw=1, fill='cool', rx=2); f.R(170, cy - 10, 300, 4, c='none', sw=0, fill='gold', rx=1); f.R(170, cy + 6, 300, 4, c='none', sw=0, fill='gold', rx=1)
for i, x in enumerate((40, 100, 160, 310, 340, 470, 525, 600, 676)): f.L(x, 96, x, cy - 6, 'line', 1, dash='3 3'); f.T(x, 86, str(i), 11, 'gold', 'middle', bold=True)
f.T(40, 70, 'station', 9.5, 'dim', 'middle')
f.T(125, 330, 'LP compressor', 10, 'cool', 'middle', bold=True); f.T(240, 330, 'HP compressor', 10, 'gold', 'middle', bold=True); f.T(390, 330, 'combustion', 10, 'warm', 'middle', bold=True)
f.T(470, 330, 'HP turb', 10, 'gold', 'middle', bold=True); f.T(530, 348, 'LP turb', 10, 'cool', 'middle', bold=True)
f.T(300, 366, 'N1 = LP spool (inner shaft)      N2 = HP spool (outer shaft)', 10.5, 'ink', 'middle', bold=True)
f.T(610, 130, 'bypass duct', 9.5, 'dim', 'middle')
PP.append(f)

# 13_11 triple spool front fan
f = PF('13_11', 'Triple-Spool Front-Fan Engine', 760, 430, 'High bypass triple-spool engine with a large fan, intermediate and high pressure compressors and three turbines on concentric shafts',
       'A large single-stage fan (LP, N1) driven by the LP turbine moves most of the air through the bypass duct. The intermediate pressure (IP, N2) and high pressure (HP, N3) compressors are driven by their own turbines. Bypass (cold) air produces most of the thrust.')
cy = 210
band(f, [(70, 160), (330, 156), (450, 130)], [(70, 152), (330, 148), (450, 122)], cy, 'steel')
band(f, [(160, 98), (300, 80), (360, 76), (500, 72), (600, 56), (690, 40)], [(160, 92), (300, 74), (360, 70), (500, 66), (600, 50), (690, 34)], cy, 'steel')
mirror(f, [(70, 0), (100, 20), (160, 40), (300, 42), (500, 42), (600, 34), (660, 0)], cy, 'ink', 1.4)
for sg in (-1, 1): f.P(f'M120,{cy - sg * 24} L134,{cy - sg * 24} L150,{cy - sg * 150} L136,{cy - sg * 150} Z', 'ink', 1.2, 'cool')
blades(f, 180, 240, 4, 44, 88, cy, 'green', 'ink'); blades(f, 260, 320, 6, 44, 74, cy, 'gold', 'ink')
for sg in (-1, 1): f.R(360, cy - sg * 56 - 7, 100, 14, c='ink', sw=1, fill='warm', rx=7)
blades(f, 480, 486, 2, 42, 64, cy, 'gold', 'gold', 3); blades(f, 506, 512, 2, 42, 62, cy, 'green', 'green', 3); blades(f, 530, 580, 4, 40, 58, cy, 'cool', 'cool', 3)
f.R(128, cy - 3, 460, 6, c='none', sw=0, fill='cool', rx=2); f.R(180, cy - 9, 340, 4, c='none', sw=0, fill='green'); f.R(180, cy + 5, 340, 4, c='none', sw=0, fill='green')
f.R(260, cy - 15, 230, 4, c='none', sw=0, fill='gold'); f.R(260, cy + 11, 230, 4, c='none', sw=0, fill='gold')
for y in (cy - 128, cy + 128): f.L(170, y, 420, y + (6 if y < cy else -6), 'cool', 2.2, me='cool')
f.L(670, cy, 748, cy, 'hot', 2.4, me='hot')
f.T(300, cy - 136, 'BYPASS (cold) air', 10, 'cool', 'middle', bold=True); f.T(708, cy + 20, 'hot core', 10, 'hot', 'middle', bold=True)
f.T(140, 412, 'Fan (N1)', 10, 'cool', 'middle', bold=True); f.T(210, 396, 'IP comp (N2)', 10, 'green', 'middle', bold=True); f.T(300, 412, 'HP comp (N3)', 10, 'gold', 'middle', bold=True)
f.T(410, 396, 'combustion', 10, 'warm', 'middle', bold=True); f.T(500, 412, 'HP / IP turbines', 10, 'ink', 'middle', bold=True); f.T(590, 396, 'LP turbine', 10, 'cool', 'middle', bold=True)
PP.append(f)

# 13_12 propulsive efficiency
f = PF('13_12', 'Propulsive Efficiency against Airspeed', 760, 380, 'Propulsive efficiency against airspeed for turboprop, high and low bypass turbofans and the pure turbojet',
       'Propulsive efficiency is highest when the jet velocity is only a little above the aircraft speed. The turboprop (large mass, small acceleration) is best at low speed; high-bypass fans suit high subsonic cruise; the pure turbojet only becomes efficient at very high speed.')
x0, y0, x1, y1 = 100, 40, 720, 320
X, Y = chart(x0, y0, x1, y1, (0, 1000), (0, 90))
axes(f, x0, y0, x1, y1, 'AIRSPEED (mph)', 'PROPULSIVE EFFICIENCY %')
for v in range(0, 1001, 200): f.T(X(v), y1 + 16, str(v), 10, 'dim', 'middle'); f.L(X(v), y0, X(v), y1, 'line', 0.6)
for v in range(0, 91, 20): f.T(x0 - 8, Y(v) + 4, str(v), 10, 'dim', 'end'); f.L(x0, Y(v), x1, Y(v), 'line', 0.6)
smooth(f, [(X(0), Y(0)), (X(100), Y(55)), (X(250), Y(80)), (X(380), Y(84)), (X(480), Y(70)), (X(560), Y(45))], 'hot', 2.8)
smooth(f, [(X(0), Y(0)), (X(150), Y(40)), (X(350), Y(68)), (X(550), Y(84)), (X(650), Y(88))], 'cool', 2.8)
smooth(f, [(X(0), Y(0)), (X(200), Y(32)), (X(450), Y(60)), (X(700), Y(80)), (X(800), Y(86))], 'gold', 2.8)
smooth(f, [(X(0), Y(0)), (X(300), Y(30)), (X(600), Y(56)), (X(850), Y(74)), (X(1000), Y(82))], 'ink', 2.8)
for i, (t, c_) in enumerate((('Turboprop', 'hot'), ('High-ratio bypass', 'cool'), ('Low-ratio bypass', 'gold'), ('Pure turbojet', 'ink'))):
    f.L(X(640), Y(36) + i * 18 - 4, X(675), Y(36) + i * 18 - 4, c_, 3); f.T(X(690), Y(36) + i * 18, t, 10.5, c_, bold=True)
PP.append(f)

# 13_13 modular construction
f = PF('13_13', 'Modular Construction', 760, 330, 'Exploded view of an engine split into its major modules along the engine axis',
       'Modern engines are built from modules that can be removed and replaced separately, so a damaged section can be changed without stripping the whole engine.')
cy = 160
mods = [('LP compressor', '(fan) module', 26, 120, 'cool'), ('IP compressor', 'module', 100, 70, 'green'), ('Intermediate', 'case module', 90, 90, 'steel'), ('HP system', 'module', 90, 60, 'gold'), ('IP & LP turbine', 'module', 90, 74, 'warm')]
x = 40
for i, (a, b, w, h, c_) in enumerate(mods):
    f.R(x, cy - h, w, 2 * h, c='ink', sw=1.6, fill=c_, rx=10, op=0.9); f.El(x, cy, 8, h, 'ink', 1.4, 'g3')
    f.T(x + w / 2, cy + h + 22 + (i % 2) * 28, a, 10, 'ink', 'middle', bold=True); f.T(x + w / 2, cy + h + 35 + (i % 2) * 28, b, 9.5, 'dim', 'middle')
    x += w + 46
f.L(20, cy, 740, cy, 'hot', 1.2, dash='8 4')
f.T(380, 30, 'modules separate along the engine axis', 10.5, 'gold', 'middle', bold=True)
PP.append(f)

# 14_01 ram recovery
f = PF('14_01', 'Ram Recovery — Intake Pressure', 760, 340, 'Two intake pressure gauges: aircraft stationary reading below ambient and aircraft airborne at 210 knots reading above ambient',
       'Stationary at full power the intake accelerates air in from rest, so pressure at the compressor face is slightly below ambient. In flight the intake converts the air’s kinetic energy into pressure (ram recovery): at 210 kt the ideal rise is about 1 psi, so the compressor face is above ambient and thrust and mass flow increase.')
for i, (ty, t, v) in enumerate(((90, 'AIRCRAFT AIRBORNE, 210 kt', 0.65), (250, 'AIRCRAFT STATIONARY', 0.36))):
    f.raw(aircraft(230, ty, s=1.2, flip=True, gear=(i == 1)))
    f.T(230, ty - 56, t, 10.5, 'gold', 'middle', bold=True)
    dial(f, 560, ty, 56, 225, 495, [(0, '13'), (0.25, '14'), (0.5, '15'), (0.75, '16'), (1, '17')], ptr=v, minor=5, size=10)
    f.T(660, ty - 6, f'{13 + 4 * v:.1f} psi', 11, 'ink', bold=True); f.T(660, ty + 10, 'above ambient' if v > 0.42 else 'below ambient', 10, 'cool' if v > 0.42 else 'hot', bold=True)
f.T(560, 326, 'Intake pressure; ambient = 14.7 psi', 10, 'dim', 'middle')
PP.append(f)

# 15_03 single spool compressor
f = PF('15_03', 'A Single-Spool Axial Compressor', 760, 360, 'Section of an axial compressor showing intake casing, compressor casing, rotor drum and discs carrying rotor blades, stator vanes between them and the drive shaft',
       'Each stage is a row of rotating blades followed by a row of stationary vanes. The rotor blades accelerate the air; the stator vanes diffuse it (raising pressure) and direct it at the correct angle onto the next stage. The annulus narrows towards the rear to keep axial velocity nearly constant as the air is compressed.')
cy = 180
band(f, [(60, 128), (140, 120), (600, 76), (680, 76)], [(60, 120), (140, 112), (600, 68), (680, 68)], cy, 'steel')
mirror(f, [(60, 0), (110, 20), (160, 50), (600, 50), (680, 20)], cy, 'ink', 1.4)
for i in range(16):
    x = 170 + i * 26; ro = 112 - (x - 140) * (44 / 460) - 2
    for sg in (-1, 1): f.L(x, cy - sg * 52, x, cy - sg * ro, 'hot' if i % 2 == 0 else 'cool', 4)
f.R(160, cy - 50, 440, 100, c='ink', sw=1.2, fill='g3', rx=0); f.R(600, cy - 8, 100, 16, c='ink', sw=1.2, fill='#a9bac1', rx=2)
for i in range(8): x = 170 + i * 52; f.R(x - 4, cy - 46, 8, 92, c='ink', sw=1, fill='#5d727b', rx=1)
f.T(150, 30, 'Intake casing', 10.5, 'ink', 'middle', bold=True); f.L(150, 36, 110, 56, 'dim', 1)
f.T(380, 30, 'Compressor casing', 10.5, 'ink', 'middle', bold=True); f.L(380, 36, 380, 82, 'dim', 1)
f.T(700, 140, 'Drive shaft', 10.5, 'ink', 'middle', bold=True)
f.T(208, 330, 'Rotor blade', 10.5, 'hot', 'middle', bold=True); f.L(208, 318, 170, 290, 'hot', 1)
f.T(330, 330, 'Stator vane', 10.5, 'cool', 'middle', bold=True); f.L(330, 318, 300, 285, 'cool', 1)
f.T(470, 330, 'Rotor disc', 10.5, 'ink', 'middle', bold=True); f.L(470, 318, 482, 226, 'dim', 1)
f.T(380, 186, 'ROTOR DRUM', 10, 'dim', 'middle', bold=True)
PP.append(f)

# 15_04 variable stator vanes
f = PF('15_04', 'Variable Stator Vanes', 760, 360, 'Stator vane sections pivoted on spindles and linked to a unison ring, shown closed at low rpm and open at high rpm',
       'At low rpm the front stages would receive air at too high an angle of attack and stall. Variable inlet guide vanes and stator vanes are turned (via levers and a unison ring moved by a fuel-pressure actuator) to a more closed angle at low rpm, opening progressively as rpm increases.')
for row, (yy, ang, t) in enumerate(((120, 55, 'LOW RPM — vanes closed'), (270, 20, 'HIGH RPM — vanes open'))):
    f.T(380, yy - 76, t, 11, 'gold', 'middle', bold=True)
    for i in range(6):
        cx = 140 + i * 100; aerofoil(f, cx, yy, 70, ang, fill='cool'); f.Ci(cx, yy, 3.5, 'ink', 1, 'white')
        f.L(cx, yy, cx + 22 * math.cos(math.radians(ang + 90)), yy - 22 * math.sin(math.radians(ang + 90)), 'ink', 1.6)
    f.L(80, yy - 42, 720, yy - 42, 'gold', 2.2); f.T(80, yy - 50, 'unison ring', 9.5, 'gold')
    f.L(40, yy, 90, yy, 'dim', 2, me='dim'); f.T(40, yy + 18, 'airflow', 9.5, 'dim')
PP.append(f)

# 15_05 bleed valve
f = PF('15_05', 'Compressor Bleed Valve', 760, 360, 'Compressor air flow with a bleed valve open to atmosphere at low rpm and closed at high rpm',
       'At low rpm (starting and acceleration) the rear stages cannot pass all the air delivered by the front, so the front stages stall. Opening a bleed valve between stages dumps some air overboard, keeping the front stages unstalled. The valve closes as rpm rises.')
for i, (x0, op, t) in enumerate(((30, True, 'BLEED VALVE OPEN (low rpm)'), (400, False, 'BLEED VALVE CLOSED (high rpm)'))):
    f.T(x0 + 165, 40, t, 11, 'gold', 'middle', bold=True)
    f.R(x0, 220, 330, 70, c='ink', sw=1.6, fill='g2', rx=4)
    for k in range(8): f.L(x0 + 30 + k * 36, 226, x0 + 30 + k * 36, 284, 'cool' if k % 2 else 'ink', 2.4)
    f.L(x0 + 10, 256, x0 + 320, 256, 'gold', 2, me='gold'); f.T(x0 + 165, 306, 'compressor air flow', 9.5, 'dim', 'middle')
    f.R(x0 + 140, 120, 60, 100, c='ink', sw=1.6, fill='g3', rx=3)
    vy = 140 if op else 196
    f.R(x0 + 146, vy, 48, 20, c='ink', sw=1.4, fill='hot', rx=2); f.T(x0 + 170, 112, 'bleed valve', 10, 'ink', 'middle', bold=True)
    if op:
        f.L(x0 + 170, 214, x0 + 170, 170, 'gold', 2, me='gold'); f.L(x0 + 200, 170, x0 + 280, 170, 'gold', 2, me='gold'); f.T(x0 + 210, 160, 'to atmosphere', 9.5, 'gold')
PP.append(f)

# 15_06 compressor map
f = PF('15_06', 'Compressor Characteristic — Surge Line and Working Line', 760, 380, 'Pressure ratio against airflow with constant rpm lines, a surge line bounding an unstable area, and the working line below it',
       'Each constant-rpm line shows how pressure ratio varies with airflow. Left of the surge line flow breaks down (stall and surge). The engine operates along the working line; the gap between them is the surge margin, which bleed valves and variable vanes help to keep.')
x0, y0, x1, y1 = 100, 40, 720, 330
axes(f, x0, y0, x1, y1, 'AIRFLOW →', 'PRESSURE RATIO')
sx = lambda t: x0 + 40 + t * 560; sy = lambda t: y1 - 40 - t * 250
surge = [(sx(t), sy(t ** 0.8)) for t in [k / 10 for k in range(11)]]
f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in surge) + f' L{x0},{y0} L{x0},{surge[0][1]:.1f} Z', 'none', 0, 'hot', op=0.18)
smooth(f, surge, 'hot', 3); f.T(sx(0.35) - 20, sy(0.35 ** 0.8) - 14, 'SURGE LINE', 10.5, 'hot', 'end', bold=True)
work = [(sx(t) + 60, sy(t ** 0.8) + 30) for t in [k / 10 for k in range(11)]]
smooth(f, work, 'gold', 3); f.T(work[7][0] + 16, work[7][1] + 14, 'WORKING LINE', 10.5, 'gold', bold=True)
for k, pc in enumerate((60, 70, 80, 90, 100)):
    t = 0.14 + k * 0.17; px, py = sx(t), sy(t ** 0.8)
    f.P(f'M{px:.1f},{py:.1f} Q{px + 70:.1f},{py - 4:.1f} {px + 110:.1f},{py + 60:.1f}', 'ink', 1.4)
    f.T(px + 112, py + 74, f'{pc}%', 10, 'ink', 'middle', bold=True)
f.T(200, 90, 'UNSTABLE AREA', 11, 'hot', 'middle', bold=True)
f.T(660, 318, 'constant rpm lines', 9.5, 'dim', 'middle')
f.T(470, 300, 'surge margin = gap between the lines', 10, 'ink', 'middle', bold=True)
PP.append(f)

# 15_08 shrouded stator segment
f = PF('15_08', 'Segment of Shrouded Stator Vanes', 760, 300, 'A curved segment of stator vanes joined between an inner and an outer shroud',
       'Stator vanes are often made in segments, with the vanes fixed between inner and outer shrouds. The shrouds stiffen the vanes against vibration and, with seals on the inner shroud, reduce air leakage between stages.')
cx, cy = 380, 520
f.P(f'M{cx + 330 * math.cos(math.radians(240))},{cy + 330 * math.sin(math.radians(240))} A330,330 0 0 1 {cx + 330 * math.cos(math.radians(300))},{cy + 330 * math.sin(math.radians(300))}', 'ink', 14)
f.P(f'M{cx + 330 * math.cos(math.radians(240))},{cy + 330 * math.sin(math.radians(240))} A330,330 0 0 1 {cx + 330 * math.cos(math.radians(300))},{cy + 330 * math.sin(math.radians(300))}', 'steel', 11)
f.P(f'M{cx + 450 * math.cos(math.radians(242))},{cy + 450 * math.sin(math.radians(242))} A450,450 0 0 1 {cx + 450 * math.cos(math.radians(298))},{cy + 450 * math.sin(math.radians(298))}', 'ink', 14)
f.P(f'M{cx + 450 * math.cos(math.radians(242))},{cy + 450 * math.sin(math.radians(242))} A450,450 0 0 1 {cx + 450 * math.cos(math.radians(298))},{cy + 450 * math.sin(math.radians(298))}', 'steel', 11)
for k in range(11):
    a = math.radians(244 + k * 5.2); p, q = (cx + 336 * math.cos(a), cy + 336 * math.sin(a)), (cx + 444 * math.cos(a), cy + 444 * math.sin(a))
    f.L(p[0], p[1], q[0], q[1], '#a9bac1', 6); f.L(p[0], p[1], q[0], q[1], 'ink', 0.8)
f.T(380, 56, 'OUTER SHROUD', 10.5, 'ink', 'middle', bold=True); f.T(380, 230, 'INNER SHROUD', 10.5, 'ink', 'middle', bold=True)
f.T(640, 140, 'stator vanes', 10.5, 'cool', bold=True); f.L(636, 136, 590, 136, 'cool', 1)
PP.append(f)

# combustion chamber front views
def cc_front(tag, title, kind, aria, cap):
    f = PF(tag, title, 760, 380, aria, cap)
    cx, cy = 250, 190
    f.Ci(cx, cy, 160, 'ink', 2, 'steel'); f.Ci(cx, cy, 150, 'ink', 1, 'g2'); f.Ci(cx, cy, 70, 'ink', 2, 'steel'); f.Ci(cx, cy, 60, 'ink', 1, 'bg')
    if kind == 'annular':
        f.Ci(cx, cy, 128, 'warm', 18);
        for k in range(16): p = pol(cx, cy, 128, k * 22.5); f.Ci(p[0], p[1], 5, 'ink', 1.2, 'gold')
    else:
        for k in range(8):
            p = pol(cx, cy, 110, k * 45); f.Ci(p[0], p[1], 32, 'ink', 1.6, 'warm' if kind == 'tubo' else 'steel')
            if kind == 'can': f.Ci(p[0], p[1], 26, 'ink', 1, 'warm')
            f.Ci(p[0], p[1], 6, 'ink', 1.2, 'gold')
            q = pol(cx, cy, 110, k * 45 + 22.5); f.Ci(q[0], q[1], 5, 'ink', 1.2, 'cool')
    return f, cx, cy
f, cx, cy = cc_front('16_03', 'Multiple (Can) Combustion Chambers', 'can', 'Front view of eight separate combustion chambers, each with its own air casing, around the engine, joined by interconnectors',
                     'Each flame tube has its own air casing. Interconnectors between chambers equalise pressure and carry the flame from the igniter chambers to the others on start. Easy to remove individually, but heavy and long.')
f.T(450, 60, 'each can: own air casing + flame tube', 10.5, 'ink', bold=True)
lab(f, 250 + 110 * math.sin(math.radians(22.5)), 190 - 110 * math.cos(math.radians(22.5)), 450, 100, 'Interconnector'); lab(f, 250, 80, 450, 140, 'Air casing'); lab(f, 250, 94, 450, 180, 'Flame tube')
lab(f, 250 + 110, 190, 450, 220, 'Fuel burner')
note(f, 450, 280, ['+ individually removable', '− heavy, long, poor relight', '   at altitude'], size=10.5, lh=16, c='ink')
PP.append(f)
f, cx, cy = cc_front('16_04', 'Tubo-Annular Combustion Chambers', 'tubo', 'Front view of separate flame tubes housed together inside a common annular air casing',
                     'Separate flame tubes (cans) sit within a single annular air casing formed by inner and outer casings. It combines the compactness of the annular type with the easy flame-tube maintenance of the can type.')
lab(f, 250, 30, 450, 70, 'Outer air casing'); lab(f, 250, 120, 450, 120, 'Inner air casing'); lab(f, 250 + 110 * math.sin(math.radians(45)) + 20, 190 - 110 * math.cos(math.radians(45)), 450, 170, 'Flame tube')
lab(f, 250 + 110 * math.sin(math.radians(67.5)), 190 - 110 * math.cos(math.radians(67.5)), 450, 220, 'Interconnector')
note(f, 450, 280, ['common air casing,', 'separate flame tubes'], size=10.5, lh=16, c='ink')
PP.append(f)
f, cx, cy = cc_front('16_05', 'Annular Combustion Chamber', 'annular', 'Front view of a single continuous annular flame tube between inner and outer air casings, with burners spaced round it',
                     'One continuous annular flame tube between the inner and outer air casings. Shortest and lightest, with the most even outlet temperature and best relight, which is why it is used on almost all modern engines; the whole chamber must be removed for maintenance.')
lab(f, 250, 30, 450, 70, 'Outer air casing'); lab(f, 250, 120, 450, 120, 'Inner air casing'); lab(f, 250, 52, 450, 170, 'Annular flame tube')
p = pol(250, 190, 128, 67.5); lab(f, p[0], p[1], 450, 220, 'Fuel burners')
note(f, 450, 280, ['+ shortest, lightest, even', '   temperature, best relight', '− whole chamber removed', '   for maintenance'], size=10.5, lh=16, c='ink')
PP.append(f)

# 16_11 airspray nozzle
f = PF('16_11', 'Airspray Fuel Nozzle', 760, 380, 'Section through an airspray nozzle with fuel feed arm, inner and outer swirl vanes and spray nozzle',
       'Compressor delivery air passes through inner and outer swirl vanes either side of the fuel annulus. The fuel is sheared into a fine, well-mixed spray at low pressure, giving lower smoke and even combustion.')
f.R(200, 40, 40, 200, c='ink', sw=1.6, fill='#a9bac1', rx=4); f.R(212, 40, 16, 200, c='none', sw=0, fill='gold', rx=2); f.T(250, 120, 'Feed arm', 10.5, 'ink', bold=True)
f.R(160, 240, 120, 80, c='ink', sw=1.8, fill='g3', rx=6)
f.R(200, 240, 40, 80, c='none', sw=0, fill='gold', rx=0)
for x in (168, 270):
    for k in range(4): f.L(x, 250 + k * 18, x + 10, 262 + k * 18 - 6, 'cool', 2)
f.R(210, 250, 20, 70, c='ink', sw=1, fill='cool', rx=0)
for k in range(9): a = math.radians(-40 + k * 10); f.L(220, 322, 220 + 120 * math.sin(a), 322 + 50 * math.cos(a) , 'mag', 1.6)
f.T(130, 270, 'Outer swirl vanes', 10.5, 'cool', 'end', bold=True); f.T(300, 250, 'Inner swirl', 10.5, 'cool', bold=True)
f.T(300, 300, 'Fuel annulus', 10.5, 'gold', bold=True); f.L(296, 296, 240, 290, 'gold', 1)
f.T(320, 360, 'Fuel / air spray', 10.5, 'mag', bold=True)
for y in (260, 290): f.L(100, y, 156, y, 'cool', 2.2, me='cool')
f.T(30, 316, 'compressor air', 9.5, 'cool')
for i, (t, c_) in enumerate((('Compressor delivery air', 'cool'), ('Fuel', 'gold'), ('Fuel / air mixture', 'mag'))): f.R(480, 80 + i * 26, 16, 14, c='none', sw=0, fill=c_, rx=2); f.T(504, 92 + i * 26, t, 10.5, 'ink', bold=True)
PP.append(f)

# 16_12 duplex
f = PF('16_12', 'The Duplex Burner System', 760, 380, 'Duplex burner with a pressurising valve feeding a primary line to a small central orifice and a main line to an annular orifice',
       'At low fuel flow (starting, altitude) only the primary line flows, through the small primary orifice, giving good atomisation at low pressure. As pressure rises the pressurising valve opens the main line to the larger annular main orifice. Air flow across the face prevents carbon forming on the orifices.')
f.box(40, 40, 160, 50, ['Fuel inlet', 'from HP fuel cock'], c='gold', size=10)
f.R(260, 40, 160, 60, c='ink', sw=1.6, fill='g3', rx=6); f.T(340, 64, 'Pressurising valve', 10.5, 'ink', 'middle', bold=True); f.T(340, 80, 'opens as pressure rises', 9.5, 'dim', 'middle')
f.L(200, 65, 260, 65, 'gold', 2, me='gold')
pipe(f, [(300, 100), (300, 250), (360, 270)], 'cool', 8); pipe(f, [(380, 100), (380, 230), (420, 260)], 'gold', 8)
f.T(290, 180, 'PRIMARY', 10, 'cool', 'end', bold=True); f.T(392, 180, 'MAIN', 10, 'gold', bold=True)
f.R(350, 240, 120, 90, c='ink', sw=1.8, fill='g2', rx=10)
f.Ci(470, 285, 8, 'ink', 1.4, 'cool'); f.P('M470,270 A15,15 0 0 1 470,300', 'gold', 4)
for k in range(5): a = math.radians(-20 + k * 10); f.L(474, 285, 474 + 160 * math.cos(a), 285 + 160 * math.sin(a), 'gold', 1.2)
for k in range(3): a = math.radians(-50 + k * 50); f.L(474, 285, 474 + 70 * math.cos(a), 285 + 70 * math.sin(a), 'cool', 2)
f.T(560, 220, 'wide main spray', 10, 'gold', bold=True); f.T(520, 350, 'primary spray (low flow)', 10, 'cool', bold=True)
f.T(470, 236, 'orifices', 9.5, 'dim', 'middle')
PP.append(f)

# 16_13 vaporising tube
f = PF('16_13', 'Vaporising Tube Combustion System', 760, 340, 'Flame tube section with a walking-stick vaporising tube turning fuel and primary air back upstream, and secondary and dilution air holes',
       'Fuel and some primary air enter a vaporiser tube (often walking-stick shaped) heated by the flame. The fuel vaporises inside and the rich vapour leaves facing upstream into the flame. Secondary air holes complete combustion and dilution holes cool the gas before the turbine nozzle guide vanes.')
f.P('M80,90 L560,90 L640,130 L640,210 L560,250 L80,250 Z', 'ink', 2, 'g2'); f.T(360, 70, 'Flame tube', 10.5, 'ink', 'middle', bold=True)
f.P('M80,170 L300,170 Q340,170 340,140 Q340,120 310,120 L290,120', 'warm', 12); f.P('M80,170 L300,170 Q340,170 340,140 Q340,120 310,120 L290,120', 'ink', 1)
f.L(40, 170, 80, 170, 'gold', 2.4, me='gold'); f.T(40, 196, 'fuel + primary air', 9.5, 'gold')
f.L(290, 120, 250, 120, 'mag', 2.4, me='mag'); f.T(200, 112, 'vapour', 10, 'mag', bold=True)
f.T(360, 150, 'Vaporising tube', 10.5, 'warm', bold=True)
for x in (380, 430):
    for y in (90, 250): f.Ci(x, y, 6, 'ink', 1.2, 'bg')
for x in (520, 560):
    for y in (90, 250): f.Ci(x, y, 9, 'ink', 1.2, 'bg')
f.T(405, 290, 'Secondary air holes', 10, 'cool', 'middle', bold=True); f.T(540, 290, 'Dilution holes', 10, 'cool', 'middle', bold=True)
f.T(700, 170, 'to NGVs', 10, 'ink', 'end', bold=True); f.L(645, 180, 720, 180, 'hot', 2, me='hot')
PP.append(f)

# 17_03 turbine assembly triple spool
f = PF('17_03', 'Turbine Assembly — Triple Spool', 760, 360, 'Side section of the turbine section with nozzle guide vanes ahead of the HP, IP and LP turbines on three concentric shafts',
       'Nozzle guide vanes precede each turbine. The HP turbine drives the HP compressor on the outer shaft, the IP turbine the IP compressor on the intermediate shaft and the LP turbine the fan on the inner shaft, all rotating independently.')
cy = 180
mirror(f, [(200, 70), (700, 110)], cy, 'ink', 2)
for i, (x, c_, n) in enumerate(((300, 'gold', 'HP'), (400, 'green', 'IP'), (500, 'cool', 'LP'), (560, 'cool', ''), (620, 'cool', ''))):
    for sg in (-1, 1): f.L(x - 24, cy - sg * 30, x - 24, cy - sg * (72 + (x - 200) * 0.08), 'dim', 3); f.L(x, cy - sg * 30, x, cy - sg * (72 + (x - 200) * 0.08), c_, 5)
f.R(40, cy - 4, 600, 8, c='none', sw=0, fill='cool', rx=2); f.R(80, cy - 12, 340, 5, c='none', sw=0, fill='green'); f.R(80, cy + 7, 340, 5, c='none', sw=0, fill='green')
f.R(120, cy - 19, 190, 5, c='none', sw=0, fill='gold'); f.R(120, cy + 14, 190, 5, c='none', sw=0, fill='gold')
f.T(300, 70, 'HP turbine', 10.5, 'gold', 'middle', bold=True); f.T(400, 60, 'IP turbine', 10.5, 'green', 'middle', bold=True); f.T(560, 48, 'LP turbine', 10.5, 'cool', 'middle', bold=True)
f.T(276, 320, 'Nozzle guide vanes (ahead of each turbine)', 10.5, 'dim', bold=True); f.L(290, 308, 276, 270, 'dim', 1)
f.T(60, 240, 'HP shaft (outer)', 10, 'gold', bold=True); f.T(60, 256, 'IP shaft (intermediate)', 10, 'green', bold=True); f.T(60, 272, 'LP shaft (inner)', 10, 'cool', bold=True)
PP.append(f)

# 17_05 NGV and impulse blades
f = PF('17_05', 'Nozzle Guide Vanes and Impulse Turbine Blades', 760, 360, 'Cascade of nozzle guide vanes forming convergent passages followed by impulse turbine blades forming parallel passages',
       'The NGVs form convergent passages: the gas accelerates, pressure falls and the flow is turned onto the blades. In a pure impulse turbine the blade passages are parallel, so the blades are turned only by the change of direction of the high-velocity gas. Most turbines are impulse–reaction, with the reaction proportion increasing towards the tip.')
for k in range(6):
    y = 60 + k * 46
    f.P(f'M200,{y + 40} Q240,{y + 30} 260,{y} Q232,{y + 18} 200,{y + 40} Z', 'ink', 1.4, 'cool')
    f.P(f'M380,{y + 6} Q420,{y - 16} 460,{y + 6} Q420,{y - 4} 380,{y + 6} Z', 'ink', 1.4, 'warm')
    f.L(100, y + 20, 180, y + 20, 'gold', 1.8, me='gold')
f.T(230, 40, 'NGVs — convergent', 10.5, 'cool', 'middle', bold=True); f.T(420, 30, 'Impulse blades — parallel', 10.5, 'warm', 'middle', bold=True)
f.T(100, 340, 'gas flow', 10, 'gold', bold=True)
f.L(560, 300, 560, 80, 'ink', 4, me='ink'); f.T(574, 190, 'direction of rotation', 10.5, 'ink', bold=True)
PP.append(f)

# 17_07 fir tree root
f = PF('17_07', 'Fir-Tree Root Blade Attachment', 760, 360, 'Turbine blade with a shroud at the tip and a fir-tree root sliding into a matching slot in the disc rim',
       'The fir-tree root gives a large bearing area in a small space, carrying the very high centrifugal loads while allowing for thermal expansion between the hot blade and the cooler disc. Tip shrouds reduce tip leakage and vibration.')
bx = 230
f.R(bx - 40, 40, 120, 16, c='ink', sw=1.6, fill='steel', rx=2); f.T(bx + 20, 30, 'Blade shroud', 10.5, 'ink', 'middle', bold=True)
f.P(f'M{bx},56 Q{bx + 50},150 {bx + 10},220 L{bx + 40},220 Q{bx + 80},150 {bx + 40},56 Z', 'ink', 1.6, '#a9bac1'); f.T(bx + 70, 140, 'Aerofoil', 10.5, 'ink', bold=True)
f.R(bx - 10, 220, 80, 12, c='ink', sw=1.4, fill='steel', rx=1)
fx = bx + 30; pts = [(fx - 26, 232)]
for k in range(4): y = 240 + k * 18; w = 26 - k * 4; pts += [(fx - w, y), (fx - w + 8, y + 9)]
pts += [(fx - 10, 312), (fx + 10, 312)]
for k in range(3, -1, -1): y = 240 + k * 18; w = 26 - k * 4; pts += [(fx + w - 8, y + 9), (fx + w, y)]
pts += [(fx + 26, 232)]
f.P('M' + ' L'.join(f'{x},{y}' for x, y in pts) + ' Z', 'ink', 1.4, '#a9bac1')
f.T(bx - 30, 290, 'Fir-tree root', 10.5, 'gold', 'end', bold=True); f.L(bx - 26, 286, fx - 22, 270, 'gold', 1)
f.R(440, 220, 280, 110, c='ink', sw=1.6, fill='g3', rx=0); f.T(580, 350, 'Disc rim', 10.5, 'ink', 'middle', bold=True)
sx = 580; spts = [(sx - 26, 220)]
for k in range(4): y = 228 + k * 18; w = 26 - k * 4; spts += [(sx - w, y), (sx - w + 8, y + 9)]
spts += [(sx - 10, 300), (sx + 10, 300)]
for k in range(3, -1, -1): y = 228 + k * 18; w = 26 - k * 4; spts += [(sx + w - 8, y + 9), (sx + w, y)]
spts += [(sx + 26, 220)]
f.P('M' + ' L'.join(f'{x},{y}' for x, y in spts) + ' Z', 'ink', 1.2, 'bg')
f.P(f'M{fx + 60},270 Q420,200 {sx - 40},200', 'gold', 2, me='gold', dash='5 3'); f.T(440, 190, 'slides axially into slot', 10, 'gold', bold=True)
PP.append(f)

# 18_01 basic jet pipe
f = PF('18_01', 'A Basic Jet Pipe', 760, 320, 'Side section of the exhaust system: turbine rear stage, rear support struts, exhaust cone, jet pipe and propelling nozzle',
       'The exhaust cone and struts straighten and diffuse the gas leaving the turbine to reduce friction losses in the jet pipe; the propelling nozzle then accelerates it to produce thrust.')
cy = 160
mirror(f, [(60, 90), (200, 90), (580, 80), (700, 56)], cy, 'ink', 2.4)
for sg in (-1, 1): f.L(90, cy - sg * 30, 90, cy - sg * 86, 'warm', 6)
f.P(f'M100,{cy - 34} L170,{cy - 34} L300,{cy} L170,{cy + 34} L100,{cy + 34} Z', 'ink', 1.6, 'steel')
for sg in (-1, 1): f.L(140, cy - sg * 34, 160, cy - sg * 88, 'ink', 4)
for y in (cy - 50, cy, cy + 50): f.L(340, y, 420, y, 'hot', 2, me='hot')
f.L(600, cy, 740, cy, 'hot', 3, me='hot')
f.T(90, 40, 'Turbine rear stage', 10.5, 'warm', 'middle', bold=True); f.L(90, 46, 90, 70, 'dim', 1)
f.T(210, 40, 'Rear support struts', 10.5, 'ink', 'middle', bold=True); f.L(200, 46, 156, 84, 'dim', 1)
f.T(220, 280, 'Exhaust cone', 10.5, 'ink', 'middle', bold=True); f.L(220, 268, 220, 178, 'dim', 1)
f.T(440, 280, 'Jet pipe', 10.5, 'ink', 'middle', bold=True); f.L(440, 268, 440, 246, 'dim', 1)
f.T(660, 280, 'Propelling nozzle', 10.5, 'ink', 'middle', bold=True); f.L(660, 268, 680, 222, 'dim', 1)
PP.append(f)

# 18_03 nozzle parameters
f = PF('18_03', 'Gas Parameter Changes in Propelling Nozzles', 760, 490, 'A choked convergent nozzle with sonic exit velocity and exit static pressure above ambient, and a convergent-divergent nozzle with sonic throat and supersonic exit expanding to ambient',
       'Convergent nozzle: velocity rises to Mach 1 at the exit (choked) and the remaining pressure above ambient gives pressure thrust. Convergent–divergent nozzle: sonic at the throat, the gas then keeps accelerating supersonically in the divergent section while static pressure falls to ambient, converting the excess into velocity.')
for row, (y0, cd) in enumerate(((40, False), (270, True))):
    f.T(380, y0 - 8, 'CONVERGENT NOZZLE (choked)' if not cd else 'CONVERGENT–DIVERGENT NOZZLE', 11, 'gold', 'middle', bold=True)
    cy = y0 + 50
    shape = [(100, 40), (260, 22)] + ([(420, 36)] if cd else [])
    mirror(f, shape, cy, 'ink', 2.4)
    f.L(50, cy, 96, cy, 'hot', 3, me='hot')
    gy = y0 + 200
    f.L(100, gy, 560, gy, 'line', 1)
    f.L(260, cy + 30, 260, gy, 'dim', 1, dash='3 3')
    if not cd:
        curve(f, [(100, gy - 20), (260, gy - 70), (560, gy - 70)], 'hot', 2.6); f.T(570, gy - 66, 'velocity: Mach 1', 10, 'hot', bold=True); f.T(570, gy - 52, 'at the exit', 10, 'hot')
        curve(f, [(100, gy - 80), (260, gy - 40), (300, gy - 10), (560, gy - 10)], 'cool', 2.6); f.T(570, gy - 14, 'static pressure', 10, 'cool', bold=True); f.T(570, gy, 'falls to ambient', 10, 'cool')
        f.T(266, gy - 30, 'exit P > ambient', 9.5, 'cool')
    else:
        curve(f, [(100, gy - 20), (260, gy - 55), (420, gy - 90), (560, gy - 90)], 'hot', 2.6); f.T(570, gy - 86, 'velocity: supersonic', 10, 'hot', bold=True)
        curve(f, [(100, gy - 80), (260, gy - 45), (420, gy - 10), (560, gy - 10)], 'cool', 2.6); f.T(570, gy - 6, 'static P = ambient', 10, 'cool', bold=True)
        f.T(266, gy - 70, 'throat: Mach 1', 9.5, 'hot')
PP.append(f)

# 18_04 mixer
f = PF('18_04', 'Low-Bypass Exhaust Mixer', 760, 320, 'Exhaust unit where bypass air and hot exhaust gas are mixed through mixer chutes behind the turbine before leaving a common nozzle',
       'In a low-ratio bypass engine the cold bypass air and hot core gas are mixed behind the turbine by lobed mixer chutes before the common propelling nozzle. Mixing improves thrust slightly and reduces jet noise.')
cy = 160
mirror(f, [(60, 110), (500, 110), (700, 80)], cy, 'ink', 2.4)
mirror(f, [(60, 60), (260, 60)], cy, 'ink', 2)
for sg in (-1, 1):
    f.P(' '.join(f'{"M" if k == 0 else "L"}{260 + k * 20},{cy - sg * (60 + (12 if k % 2 else -12))}' for k in range(8)), 'ink', 2)
    f.L(70, cy - sg * 86, 230, cy - sg * 86, 'cool', 2.4, me='cool')
    f.L(70, cy - sg * 30, 230, cy - sg * 30, 'hot', 2.4, me='hot')
f.P(f'M60,{cy - 24} L180,{cy - 24} L280,{cy} L180,{cy + 24} L60,{cy + 24} Z', 'ink', 1.4, 'steel')
for k in range(5): f.L(440, cy - 60 + k * 30, 520, cy - 60 + k * 30, 'mag', 2, me='mag')
f.T(140, 40, 'Bypass duct (cold air)', 10.5, 'cool', 'middle', bold=True); f.T(330, 40, 'Mixer chutes', 10.5, 'ink', 'middle', bold=True); f.L(330, 46, 330, 92, 'dim', 1)
f.T(120, 300, 'Exhaust unit inner cone', 10.5, 'ink', 'middle', bold=True); f.L(120, 288, 140, 186, 'dim', 1)
f.T(560, 300, 'mixed stream to nozzle', 10.5, 'mag', 'middle', bold=True)
PP.append(f)

# 18_05 high bypass exhausts
f = PF('18_05', 'High-Bypass Exhaust Systems', 760, 410, 'Separate fan and core nozzles with external mixing, and a common integrated nozzle with partial internal mixing',
       'Most high-bypass engines have separate cold (fan) and hot (core) nozzles, the streams mixing outside the engine. Some have a long common nozzle in which the streams partly mix internally, reducing noise and giving a small thrust gain.')
for row, (cy, common) in enumerate(((110, False), (300, True))):
    f.T(380, cy - 86, 'SEPARATE NOZZLES — external mixing' if not common else 'COMMON NOZZLE — partial internal mixing', 11, 'gold', 'middle', bold=True)
    fo = [(60, 74), (300, 72), (380, 60)] if not common else [(60, 74), (300, 72), (560, 46)]
    band(f, fo, [(x, r - 8) for x, r in fo], cy, 'steel')
    co = [(200, 40), (420, 34), (520, 22)]
    band(f, co, [(x, r - 8) for x, r in co], cy, 'steel')
    for sg in (-1, 1):
        f.L(90, cy - sg * 52, 300, cy - sg * 50, 'cool', 2.4, me='cool')
        if not common: f.L(400, cy - sg * 46, 640, cy - sg * 42, 'cool', 2.4, me='cool')
        else: f.L(440, cy - sg * 40, 540, cy - sg * 34, 'cool', 2.4, me='cool'); f.L(580, cy - sg * 26, 700, cy - sg * 22, 'mag', 2.4, me='mag')
        f.L(530, cy - sg * 8, 660 if not common else 560, cy - sg * 8, 'hot', 2.4, me='hot')
    f.T(140, cy + 4, 'fan', 10, 'cool', 'middle', bold=True); f.T(300, cy + 4, 'core', 10, 'hot', 'middle', bold=True)
for i, (t, c_) in enumerate((('cold bypass (fan) air', 'cool'), ('hot exhaust gas', 'hot'), ('mixed stream', 'mag'))):
    f.L(80 + i * 220, 388, 104 + i * 220, 388, c_, 3); f.T(110 + i * 220, 392, t, 10, c_, bold=True)
PP.append(f)

# 18_07 jet noise
f = PF('18_07', 'Jet Exhaust Noise', 760, 330, 'A jet stream leaving the nozzle with small-scale turbulence near the nozzle and large-scale turbulence further downstream in the shear layer',
       'Jet noise comes from the turbulent mixing of the high-velocity jet with the surrounding air in the shear layer. Near the nozzle the eddies are small and produce high-frequency noise; downstream the eddies grow and produce low-frequency noise. Noise rises steeply with jet velocity, so lower-velocity (high-bypass) jets are much quieter.')
f.P('M40,120 L140,130 L140,170 L40,180 Z', 'ink', 1.6, '#a9bac1'); f.T(80, 210, 'nozzle', 10.5, 'ink', 'middle', bold=True)
f.raw(f'<defs><linearGradient id="jn" x1="0" x2="1"><stop offset="0" stop-color="#f0d77a"/><stop offset="1" stop-color="#d9533a"/></linearGradient></defs>')
f.P('M140,130 L720,50 L720,250 L140,170 Z', 'none', 0, 'url(#jn)', op=0.85)
for k in range(9):
    x = 180 + k * 62; r = 4 + k * 2.4
    for sg in (-1, 1): f.Ci(x, 150 - sg * (20 + (x - 140) * 0.17), r, 'ink', 1, 'none')
f.T(200, 40, 'small turbulence — high-frequency noise', 10.5, 'ink', bold=True); f.L(230, 46, 200, 120, 'dim', 1)
f.T(720, 318, 'large turbulence — low-frequency noise', 10.5, 'ink', 'end', bold=True); f.L(640, 306, 640, 290, 'dim', 1)
f.T(450, 150, 'JET', 13, 'black', 'middle', bold=True)
f.T(470, 30, 'shear layer', 10.5, 'gold', 'middle', bold=True); f.L(470, 36, 470, 76, 'gold', 1)
PP.append(f)

if __name__ == '__main__':
    gallery(PP, 'Powerplant Gallery 4', 'Powerplant — Gas Turbine Construction', 'Original figures for engine layouts, compressors, combustion chambers, turbines and exhausts.', 'pp4-gallery.html')
    print(len(PP), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
