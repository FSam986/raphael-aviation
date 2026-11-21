#!/usr/bin/env python3
"""Powerplant part 2 (chapters 2-11): accessories, cooling, ignition, combustion, mixture, carburettors, injection, supercharging."""
import math
from pp_common import *
from elec_common import coilH, ground, cap, magnet, wire

PP = []
CH_IN, CH_BN = 'cool', 'warm'
def chart(x0, y0, x1, y1, xr, yr):
    X = lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)
    Y = lambda v: y1 - (v - yr[0]) / (yr[1] - yr[0]) * (y1 - y0)
    return X, Y

# 02_16 accessory housing (rear view of flat engine)
f = PF('02_16', 'Accessory Housing (Rear of Engine)', 760, 400, 'Rear view of a flat engine showing the accessory case with starter, magnetos, generator, sump and carburettor',
       'The accessories are driven from the rear of the crankshaft through the accessory gearbox.')
for sx in (-1, 1):
    for j in range(2):
        f.R(380 + sx * 110 - (90 if sx < 0 else 0), 110 + j * 70, 90, 56, c='ink', sw=1.6, fill='steel', rx=3)
        for k in range(8): xx = 380 + sx * 110 - (90 if sx < 0 else 0) + 6 + k * 11; f.L(xx, 106 + j * 70, xx, 170 + j * 70, 'ink', 1)
f.R(270, 90, 220, 180, c='ink', sw=2, fill='g3', rx=10)
f.R(300, 270, 160, 40, c='ink', sw=1.6, fill='g2', rx=6); f.T(380, 295, 'Sump', 10.5, 'ink', 'middle', bold=True)
f.R(350, 310, 60, 46, c='ink', sw=1.6, fill='#5d727b', rx=4)
pipe(f, [(380, 316), (380, 300)], 'cool', 8)
for sx in (-1, 1): pipe(f, [(380 + sx * 30, 330), (380 + sx * 150, 330), (380 + sx * 150, 240)], 'cool', 10)
f.Ci(330, 130, 26, 'ink', 1.6, 'gd'); f.Ci(430, 130, 26, 'ink', 1.6, 'gd')
f.Ci(380, 200, 32, 'ink', 1.6, '#8fa3ab'); f.Ci(450, 220, 24, 'ink', 1.6, 'cool')
lab(f, 330, 130, 160, 40, 'Left magneto', 'end'); lab(f, 430, 130, 600, 40, 'Right magneto')
lab(f, 380, 200, 160, 90, 'Starter motor', 'end'); lab(f, 450, 220, 600, 100, 'Generator / alternator')
lab(f, 340, 290, 160, 290, 'Sump (oil)', 'end'); lab(f, 380, 345, 600, 380, 'Carburettor')
lab(f, 230, 330, 160, 370, 'Induction manifold', 'end')
lab(f, 290, 160, 160, 200, 'Accessory case', 'end')
PP.append(f)

# 04_01 liquid cooling
f = PF('04_01', 'Liquid Cooling System', 760, 380, 'Engine block, pump, radiator and header tank connected in a coolant circuit',
       'The pump circulates coolant through the jackets round the cylinders, then through the radiator where airflow removes the heat. The header tank allows for expansion and keeps the system full.')
f.R(80, 120, 280, 120, c='ink', sw=2, fill='g3', rx=6)
for i in range(3): f.Ci(140 + i * 80, 180, 30, 'ink', 1.6, 'steel'); f.T(140 + i * 80, 184, f'cyl {i+1}', 9.5, 'ink', 'middle', bold=True, check=False)
f.T(220, 108, 'Cylinder block (coolant jackets)', 10.5, 'ink', 'middle', bold=True)
f.R(540, 40, 120, 50, c='ink', sw=1.6, fill='g2', rx=6); f.R(542, 66, 116, 22, c='none', sw=0, fill='cool', rx=2, op=0.7); f.T(600, 34, 'Header tank', 10.5, 'ink', 'middle', bold=True)
f.R(540, 220, 120, 130, c='ink', sw=1.6, fill='g2', rx=4)
for y in range(228, 346, 9): f.L(546, y, 654, y, 'steel', 2.6)
f.T(600, 372, 'Radiator', 10.5, 'ink', 'middle', bold=True)
pipe(f, [(300, 120), (300, 64), (540, 64)], 'hot', 10); pipe(f, [(600, 90), (600, 220)], 'hot', 10)
pipe(f, [(540, 330), (240, 330), (240, 300)], 'cool', 10)
f.Ci(240, 280, 22, 'ink', 1.8, 'g3'); f.T(196, 284, 'Pump', 10.5, 'ink', 'end', bold=True); pipe(f, [(240, 258), (240, 240)], 'cool', 10)
for (x1, y1, x2, y2, c_) in ((360, 64, 420, 64, 'gold'), (600, 140, 600, 190, 'gold'), (480, 330, 420, 330, 'gold')): flow(f, x1, y1, x2, y2, c_)
f.L(690, 240, 670, 240, 'dim', 1.6, me='dim'); f.L(690, 290, 670, 290, 'dim', 1.6, me='dim'); f.T(700, 270, 'airflow', 9.5, 'dim', check=False)
f.T(420, 52, 'hot coolant', 9.5, 'hot', 'middle'); f.T(400, 352, 'cooled coolant', 9.5, 'cool', 'middle')
PP.append(f)

# 05_01 magneto circuit
f = PF('05_01', 'Magneto Circuit', 760, 440, 'Magneto with rotating magnet, primary and secondary windings, contact breaker, condenser, ignition switch and distributor to four plugs',
       'The rotating magnet induces current in the primary winding. When the cam opens the contact breaker the primary field collapses and a very high voltage is induced in the secondary, which the distributor sends to each plug in firing order. The ignition switch earths the primary: switch closed = magneto OFF. A broken P-lead leaves the magneto LIVE.')
f.R(300, 140, 200, 24, c='ink', sw=1.6, fill='#5d727b', rx=2)
f.R(300, 164, 24, 120, c='ink', sw=1.6, fill='#5d727b', rx=2); f.R(476, 164, 24, 120, c='ink', sw=1.6, fill='#5d727b', rx=2)
f.R(324, 264, 50, 20, c='ink', sw=1.4, fill='#5d727b', rx=2); f.R(426, 264, 50, 20, c='ink', sw=1.4, fill='#5d727b', rx=2)
f.raw(f'<g transform="rotate(-30 400 250)">'); magnet(f, 360, 238, 80, 24); f.raw('</g>')
f.T(400, 312, 'rotating magnet', 10, 'dim', 'middle')
coilH(f, 330, 470, 138, 'hot', 7, 2.4); coilH(f, 330, 470, 126, 'cool', 14, 1.2)
f.T(400, 102, 'secondary (many turns)', 10, 'cool', 'middle', bold=True); f.T(400, 186, 'primary (few turns)', 10, 'hot', 'middle', bold=True)
wire(f, [(330, 138), (180, 138), (180, 230)], 'hot', 2)
wire(f, [(180, 230), (180, 250)], 'hot', 2); f.Ci(180, 252, 3, 'hot', 1.4, 'bg'); f.L(181, 254, 196, 276, 'hot', 2.2); f.Ci(180, 280, 3, 'hot', 1.4, 'bg')
wire(f, [(180, 283), (180, 330)], 'hot', 2); ground(f, 180, 330, 'hot')
f.T(200, 252, 'Contact breaker', 10, 'ink', bold=True); f.T(200, 266, '(opened by cam)', 9.5, 'dim')
wire(f, [(180, 200), (110, 200), (110, 260)], 'hot', 1.8); cap(f, 110, 264, vertical=True, c='hot'); wire(f, [(110, 268), (110, 330)], 'hot', 1.8); ground(f, 110, 330, 'hot'); f.T(110, 364, 'Condenser', 10, 'ink', 'middle', bold=True)
wire(f, [(110, 200), (40, 200), (40, 252)], 'hot', 1.8); f.Ci(40, 252, 3, 'hot', 1.4, 'bg'); f.L(41, 254, 56, 276, 'hot', 2.2); f.Ci(40, 280, 3, 'hot', 1.4, 'bg'); wire(f, [(40, 283), (40, 330)], 'hot', 1.8); ground(f, 40, 330, 'hot')
f.T(14, 384, 'Ignition switch (P-lead)', 10, 'ink', bold=True); f.T(14, 398, 'closed = earthed = OFF', 9.5, 'gold')
wire(f, [(470, 126), (540, 126), (540, 90), (580, 90)], 'cool', 1.8)
f.Ci(620, 90, 40, 'ink', 1.8, 'g3'); f.L(620, 90, 620, 60, 'gold', 3); f.T(620, 150, 'Distributor', 10.5, 'ink', 'middle', bold=True)
for i, (ang, n) in enumerate(((0, 1), (90, 3), (180, 4), (270, 2))):
    px, py = pol(620, 90, 32, ang); f.Ci(px, py, 4, 'cool', 1.4, 'cool')
for i, n in enumerate((1, 3, 4, 2)):
    y = 210 + i * 46; x0 = 700
    f.R(x0 - 6, y - 14, 12, 26, c='ink', sw=1.2, fill='white', rx=2); f.T(x0 + 12, y + 4, f'plug {n}', 9.5, 'ink', bold=True); ground(f, x0, y + 12)
    wire(f, [(652, 100 + i * 6), (664 + i * 6, 100 + i * 6), (664 + i * 6, y - 22), (700, y - 22), (700, y - 14)], 'cool', 1.2)
f.L(400, 250, 400, 400, 'dim', 1.2, dash='5 4'); f.L(400, 400, 620, 400, 'dim', 1.2, dash='5 4'); f.L(620, 400, 620, 130, 'dim', 1.2, dash='5 4')
f.L(400, 400, 230, 400, 'dim', 1.2, dash='5 4'); f.L(230, 400, 230, 270, 'dim', 1.2, dash='5 4', me='dim')
f.T(240, 418, 'mechanical drive: magnet, cam and distributor rotor', 9.5, 'dim', 'start')
f.T(600, 430, 'firing order 1-3-4-2', 9.5, 'gold', 'end')
PP.append(f)

# combustion panels
def comb_panels(tag, title, aria, cap, stages):
    f = PF(tag, title, 760, 360, aria, cap)
    for i, (th, name, kind) in enumerate(stages):
        cx = 130 + i * 250
        k = cyl(f, cx, 300, th=th, s=0.95, charge=CH_IN, spark=(i == 0))
        top, pt = k['roof'] - 10, k['ptop']
        if kind == 'kernel': f.Ci(cx, top + 6, 9, 'gold', 1.4, 'warm')
        if kind == 'front': f.El(cx, top + 8, 26, (pt - top) * 0.6, 'gold', 1.6, 'warm')
        if kind == 'full': f.R(cx - 36, top, 72, pt - top, c='none', sw=0, fill='warm', rx=0, op=0.95); f.El(cx, top + 6, 20, 8, 'none', 0, 'gold')
        if kind == 'endgas':
            f.El(cx, top + 6, 16, 10, 'gold', 1.4, 'warm')
            for sx in (-1, 1):
                ex, ey = cx + sx * 26, pt - 8
                f.P(' '.join(f'{"M" if j == 0 else "L"}{ex + (11 if j % 2 == 0 else 4) * math.cos(j * math.pi / 5):.1f},{ey + (11 if j % 2 == 0 else 4) * math.sin(j * math.pi / 5):.1f}' for j in range(10)) + ' Z', 'gold', 1, 'hot')
        if kind == 'det': f.R(cx - 36, top, 72, pt - top, c='none', sw=0, fill='hot', rx=0); f.El(cx, top + 8, 30, 10, 'none', 0, 'gold')
        f.T(cx, 30, f'{i+1}  {name}', 11.5, 'gold', 'middle', bold=True)
    return f
PP.append(comb_panels('06_01', 'Normal Combustion', 'Three cylinders showing the spark igniting the mixture, a smooth flame front spreading and combustion complete',
    'The flame front spreads smoothly from the plug across the chamber, so pressure rises progressively and peaks shortly after TDC.',
    ((-12, 'Normal ignition', 'kernel'), (4, 'Flame spreads', 'front'), (16, 'Combustion complete', 'full'))))
PP.append(comb_panels('06_03', 'Detonation', 'Three cylinders showing normal ignition, the unburnt end gas exploding ahead of the flame front, and violent detonation',
    'Detonation: heat and pressure ahead of the flame front make the remaining end gas explode spontaneously instead of burning. The pressure rise is violent and can damage pistons and rings. Causes include fuel of too low a grade, a weak mixture at high power and high cylinder temperature.',
    ((-12, 'Normal ignition', 'kernel'), (2, 'End gas explodes', 'endgas'), (12, 'Detonation', 'det'))))

# 06_02 ignition timing vs rpm
f = PF('06_02', 'Ignition Timing — Effect of RPM', 760, 320, 'Three crank dials showing the ignition point at TDC theoretically, slightly advanced at low rpm and well advanced at high rpm',
       'Burning takes roughly the same time at any rpm, so at high rpm the crank turns further while the charge burns. Ignition is therefore advanced so that peak pressure still occurs just after TDC. For starting, ignition is retarded (impulse coupling) to prevent kickback.')
for i, (adv, name, sub) in enumerate(((0, 'Theoretical', 'ignition at TDC'), (10, 'Low rpm', 'small advance'), (34, 'High rpm', 'large advance'))):
    cx, cy = 130 + i * 250, 160
    f.Ci(cx, cy, 80, 'line', 1.6, 'g2'); f.L(cx, cy - 92, cx, cy + 92, 'line', 1, dash='4 4')
    f.T(cx, cy - 98, 'TDC', 10, 'ink', 'middle', bold=True)
    if adv: arc_band(f, cx, cy, 80, -adv, 0, 'gold', 5)
    px, py = pol(cx, cy, 80, -adv); f.L(cx, cy, px, py, 'hot', 2.4); f.Ci(px, py, 7, 'ink', 1.4, 'gold')
    f.P(f'M{cx+40},{cy-70} A80,80 0 0 1 {cx+70},{cy-40}', 'dim', 1.6, me='dim')
    f.T(cx, cy + 112, name, 11.5, 'gold', 'middle', bold=True); f.T(cx, cy + 128, f'{sub}' + (f' ({adv}° BTDC)' if adv else ''), 10, 'ink', 'middle')
PP.append(f)

# 07_01 mixture curve
f = PF('07_01', 'A Typical Air/Fuel Mixture Curve', 760, 440, 'Air/fuel ratio against air consumption showing rich mixtures at idle and high power and a weaker mixture in the cruise range',
       'Rich at idle (to ensure enough vapour), weakest in the cruise (economy), and rich again at high power to cool the charge and prevent detonation. 15:1 is chemically correct.')
x0, y0, x1, y1 = 110, 60, 700, 360
X, Y = chart(x0, y0, x1, y1, (0, 10), (17.5, 10.5))
for a, b, c_, n in ((0, 3, 'cool', 'IDLING'), (3, 7, 'gold', 'CRUISING'), (7, 10, 'hot', 'HIGH POWER')):
    f.R(X(a), y0, X(b) - X(a), y1 - y0, c='none', sw=0, fill=c_, rx=0, op=0.12); f.T((X(a) + X(b)) / 2, y1 - 10, n, 10, c_, 'middle', bold=True)
axes(f, x0, y0 - 10, x1 + 10, y1, 'AIR CONSUMPTION (lb/hr) →', 'AIR / FUEL RATIO')
for v in (10.5, 12.5, 15, 17.5): f.T(x0 - 8, Y(v) + 4, f'{v:g} : 1', 10, 'dim', 'end'); f.L(x0, Y(v), x1, Y(v), 'line', 0.8)
f.L(x0, Y(15), x1, Y(15), 'ink', 1.4, dash='6 4'); f.T(x1 - 4, Y(15) - 6, '15 : 1 chemically correct', 10, 'ink', 'end', bold=True)
smooth(f, [(X(0.2), Y(11)), (X(2), Y(12)), (X(4), Y(12.6)), (X(6), Y(12.6)), (X(8), Y(11.6)), (X(9.8), Y(10.8))], 'hot', 2.8)
smooth(f, [(X(0.2), Y(11)), (X(2), Y(13.6)), (X(3.5), Y(15.8)), (X(5.5), Y(16.2)), (X(7), Y(14)), (X(8.5), Y(12)), (X(9.8), Y(10.8))], 'cool', 2.8)
f.T(X(5), Y(12.6) - 10, 'Rich cruise — best power', 10.5, 'hot', 'middle', bold=True)
f.T(X(4.6), Y(16.2) + 18, 'Economy cruise — best SFC', 10.5, 'cool', 'middle', bold=True)
note(f, X(0.15), 30, ['More fuel to ensure enough', 'vapour for combustion'], size=10, lh=13, c='ink')
note(f, X(7.0), 30, ['More fuel to cool the charge', 'and prevent detonation'], size=10, lh=13, c='ink')
PP.append(f)

# 07_02 EGT vs leaning
f = PF('07_02', 'EGT Changes with Mixture Leaning', 760, 400, 'Exhaust gas temperature rising as the mixture is leaned from full rich to a peak and then falling',
       'Leaning from full rich, EGT rises (less excess fuel cooling the charge) to a peak at about the chemically correct mixture, then falls as excess air cools it. Best power is about 100°F rich of peak; follow the POH for the cruise setting.')
x0, y0, x1, y1 = 110, 60, 700, 320
X, Y = chart(x0, y0, x1, y1, (0, 10), (0, 10))
axes(f, x0, y0, x1, y1, 'MIXTURE: FULL RICH → LEAN', 'EGT')
pk = 6.6
f.R(X(0), y0, X(pk) - X(0), y1 - y0, c='none', sw=0, fill='cool', rx=0, op=0.10); f.R(X(pk), y0, X(10) - X(pk), y1 - y0, c='none', sw=0, fill='gold', rx=0, op=0.10)
smooth(f, [(X(0), Y(3)), (X(2), Y(4.6)), (X(4), Y(6.6)), (X(5.6), Y(8.2)), (X(pk), Y(8.6)), (X(7.6), Y(8.0)), (X(9), Y(6.2)), (X(10), Y(4.8))], 'hot', 3)
f.L(X(pk), y0, X(pk), y1, 'ink', 1.2, dash='5 4'); f.T(X(pk), y0 - 8, 'PEAK EGT', 10.5, 'ink', 'middle', bold=True)
f.T(X(3), y1 - 16, 'rich of peak: excess FUEL cools', 10.5, 'cool', 'middle', bold=True); f.T(X(8.3), y1 - 16, 'lean of peak: excess AIR cools', 10.5, 'gold', 'middle', bold=True)
bp = 4.9; f.Ci(X(bp), Y(7.55), 5, 'ink', 1.2, 'white'); f.L(X(bp), Y(7.55), X(bp) - 40, Y(7.55) - 40, 'dim', 1); f.T(X(bp) - 44, Y(7.55) - 44, 'best power ≈ 100°F rich of peak', 10, 'ink', 'end', bold=True)
f.T(380, 384, 'Exceeding peak on the lean side at high power risks detonation and rough running.', 10, 'dim', 'middle')
PP.append(f)

# ---------- carburettor ----------
def carb(f, stopped=False, bleed=False, diffuser=False, idle=False, ice=False):
    cx = 230
    yv = 230  # throat
    wall = lambda y: 60 - 30 * math.exp(-((y - yv) / 50) ** 2)
    L = [(cx - wall(y), y) for y in range(40, 381, 10)]; Rr = [(cx + wall(y), y) for y in range(40, 381, 10)]
    f.P('M' + ' L'.join(f'{x:.1f},{y}' for x, y in L) + ' L125,380 L125,40 Z', 'ink', 1.6, 'g3')
    f.P('M' + ' L'.join(f'{x:.1f},{y}' for x, y in Rr) + ' L330,380 L330,40 Z', 'ink', 1.6, 'g3')
    f.raw(f'<g transform="rotate(-35 {cx} 120)"><rect x="{cx-58}" y="116" width="116" height="8" rx="3" fill="{col("steel")}" stroke="{col("ink")}" stroke-width="1.4"/></g>'); f.Ci(cx, 120, 5, 'ink', 1.2, 'gold')
    f.R(330, 200, 180, 140, c='ink', sw=1.8, fill='g2', rx=4)
    lvl = 250
    f.R(332, lvl, 176, 88, c='none', sw=0, fill='fluid', rx=0)
    f.R(380, lvl - 18, 90, 34, c='ink', sw=1.4, fill='#5d727b', rx=8); f.T(425, lvl + 4, 'FLOAT', 10.5, 'white', 'middle', bold=True, check=False)
    f.L(425, lvl - 18, 470, 214, 'ink', 2); f.P('M466,214 L478,200 L486,214 Z', 'ink', 1.2, 'gold')
    pipe(f, [(478, 196), (478, 170), (620, 170)], 'fluid', 10); f.T(630, 168, 'Fuel supply', 10.5, 'ink', bold=True); f.T(630, 182, '(from pump)', 9.5, 'dim')
    f.T(530, 236, 'needle valve', 9.5, 'dim')
    # main jet & discharge nozzle
    jy = 328
    pipe(f, [(334, jy), (cx, jy), (cx, yv - 4)], 'fluid', 7)
    f.R(300, jy - 8, 10, 16, c='gold', sw=1.4, fill='none', rx=1)
    if not stopped:
        for a in range(-50, 51, 12): x2, y2 = pol(cx, yv - 6, 46, a); f.L(cx, yv - 6, x2, y2, 'cool', 1.4)
    else:
        f.L(cx - 3, lvl, cx + 3, lvl, 'white', 1)
    # pressure balance duct
    f.P(f'M288,370 L360,370 L360,352 L520,352 L520,210 L510,210', 'gold', 2.2, dash='5 3')
    f.P(f'M{cx-6},432 L{cx-6},404 L{cx-14},404 L{cx},386 L{cx+14},404 L{cx+6},404 L{cx+6},432 Z', 'none', 0, 'hot')
    return dict(cx=cx, yv=yv, jy=jy, lvl=lvl)

f = PF('08_03', 'Simple Float-Type Carburettor', 760, 450, 'Updraught carburettor with venturi, throttle butterfly, float chamber, needle valve, main jet, discharge nozzle and pressure balance duct',
       'Air accelerating through the venturi lowers the pressure at the discharge nozzle. Float-chamber pressure (kept equal to intake pressure by the balance duct) pushes fuel through the metering jet and out of the nozzle. The float and needle valve hold a constant fuel level.')
k = carb(f)
f.T(230, 446, 'AIR FLOW', 10.5, 'hot', 'middle', bold=True)
f.T(20, 112, 'Throttle', 10.5, 'ink', bold=True); f.T(20, 126, 'butterfly', 10.5, 'ink', bold=True); f.L(84, 118, 178, 118, 'dim', 1)
f.T(20, 228, 'Venturi', 10.5, 'ink', bold=True); f.L(70, 224, 196, 224, 'dim', 1)
f.T(20, 300, 'Discharge', 10.5, 'ink', bold=True); f.T(20, 314, 'nozzle', 10.5, 'ink', bold=True); f.L(80, 304, 222, 240, 'dim', 1)
lab(f, 305, k['jy'], 330, 410, 'Main (metering) jet', 'start')
f.T(530, 286, 'Float chamber', 10.5, 'ink', bold=True)
f.T(530, 384, 'Pressure balance duct', 10.5, 'gold', bold=True); f.L(526, 380, 520, 356, 'gold', 1)
f.T(230, 30, 'TO ENGINE ↑', 10.5, 'ink', 'middle', bold=True)
PP.append(f)

f = PF('08_04', 'Diffuser Well — Engine Stopped', 760, 450, 'Carburettor with the engine stopped and a diffuser well around the main jet full of fuel to float level',
       'With the engine stopped fuel stands at the same level in the float chamber and in the diffuser well, just below the nozzle outlet, so nothing flows. When the engine accelerates the well empties first, giving a quick extra supply, and the air-bleed holes then uncover progressively to emulsify the fuel and stop the mixture getting richer as airflow rises.')
k = carb(f, stopped=True)
f.R(214, 254, 32, 70, c='ink', sw=1.4, fill='fluid', rx=2)
for y in (266, 282, 298): f.Ci(214, y, 2.6, 'white', 1, 'bg'); f.Ci(246, y, 2.6, 'white', 1, 'bg')
f.L(180, k['lvl'], 520, k['lvl'], 'gold', 1, dash='4 3'); f.T(560, 254, 'same fuel level', 10, 'gold', bold=True)
f.T(20, 290, 'Diffuser well', 10.5, 'ink', bold=True); f.T(20, 304, 'with air-bleed holes', 9.5, 'dim'); f.L(110, 286, 210, 282, 'dim', 1)
f.T(20, 112, 'Throttle closed', 10.5, 'ink', bold=True); f.L(110, 108, 178, 118, 'dim', 1)
f.T(600, 60, 'ENGINE STOPPED', 14, 'ink', 'middle', bold=True)
lab(f, 305, k['jy'], 330, 410, 'Main jet', 'start')
PP.append(f)

f = PF('08_05', 'Air Bleed Jet', 760, 450, 'Carburettor with an air bleed drawing air into the main fuel passage before the discharge nozzle',
       'An air bleed admits a small amount of air into the fuel passage. It reduces the suction on the main jet and breaks the fuel into an emulsion, so the mixture does not become progressively richer as airflow increases, and atomisation is improved.')
k = carb(f)
f.P('M250,40 L250,150 L262,150 L262,290 L236,290', 'gold', 2.4, dash='4 3')
for y in (300, 312, 322): f.Ci(230, y, 3, 'gold', 1, 'white')
f.R(256, 286, 12, 10, c='gold', sw=1.4, fill='none', rx=1)
f.T(560, 120, 'Air drawn in through', 10.5, 'gold', bold=True); f.T(560, 134, 'the air bleed', 10.5, 'gold', bold=True); f.L(556, 126, 268, 150, 'gold', 1)
f.T(20, 300, 'Fuel/air emulsion', 10.5, 'ink', bold=True); f.T(20, 314, 'to nozzle', 9.5, 'dim'); f.L(110, 304, 222, 310, 'dim', 1)
lab(f, 262, 291, 330, 410, 'Air bleed jet', 'start')
f.T(20, 400, 'Main jet', 10.5, 'ink', bold=True); f.L(70, 396, 300, 330, 'dim', 1)
f.T(230, 446, 'AIR FLOW', 10.5, 'hot', 'middle', bold=True)
PP.append(f)

f = PF('08_06', 'Idling System & Idle Cut-Off', 760, 450, 'Carburettor with an idle jet discharging at the edge of the nearly closed throttle, air bleeds and an idle cut-off valve',
       'At idle the throttle is nearly closed and venturi suction is too weak to lift fuel from the main nozzle. The low pressure at the throttle edge draws fuel through the idle jet instead. The idle cut-off (mixture fully lean) stops the fuel to shut the engine down cleanly.')
k = carb(f)
f.P('M300,330 L300,90 L268,90', 'fluid', 4); f.P('M300,330 L300,90 L268,90', 'cool', 1.6)
f.Ci(268, 90, 3, 'cool', 1, 'cool'); f.R(294, 196, 12, 14, c='gold', sw=1.4, fill='none', rx=1)
f.P('M300,150 L350,150 L350,60', 'gold', 2, dash='4 3'); f.T(360, 70, 'Idle air bleed', 10, 'gold', bold=True)
f.R(560, 100, 60, 26, c='ink', sw=1.4, fill='g3', rx=3); f.L(530, 113, 560, 113, 'ink', 2); f.L(620, 113, 700, 113, 'ink', 2, me='ink', ms='ink')
f.T(560, 94, 'Idle cut-off valve', 10.5, 'ink', bold=True); f.T(580, 140, 'to cockpit mixture control', 9.5, 'dim')
f.L(530, 113, 306, 200, 'dim', 1, dash='3 3')
f.T(20, 76, 'Idle discharge at', 10.5, 'ink', bold=True); f.T(20, 90, 'throttle edge', 10.5, 'ink', bold=True); f.L(100, 86, 262, 90, 'dim', 1)
lab(f, 300, 203, 360, 410, 'Idle jet', 'start')
f.T(230, 446, 'AIR FLOW', 10.5, 'hot', 'middle', bold=True)
PP.append(f)

f = PF('09_02', 'Carburettor Icing — Where Ice Forms', 760, 450, 'Carburettor showing fuel evaporation ice downstream of the nozzle and throttle ice at the butterfly',
       'Fuel evaporation ice forms where fuel vaporises downstream of the nozzle, absorbing latent heat. Throttle ice forms on and around the butterfly where the airflow accelerates and cools, most likely at part throttle. Risk is serious in humid air from about −10°C to +30°C.')
k = carb(f)
wl = lambda y: 60 - 30 * math.exp(-((y - 230) / 50) ** 2)
for sx in (-1, 1):
    ys = list(range(150, 216, 5))
    f.P('M' + ' L'.join(f'{230 + sx * wl(y):.1f},{y}' for y in ys) + ' L' + ' L'.join(f'{230 + sx * (wl(y) - 5 - 2 * math.sin(y / 4)):.1f},{y}' for y in ys[::-1]) + ' Z', 'white', 0.8, 'white')
f.raw('<g transform="rotate(-35 230 120)"><rect x="168" y="112" width="12" height="16" rx="5" fill="#ffffff"/><rect x="280" y="112" width="12" height="16" rx="5" fill="#ffffff"/></g>')
f.T(560, 60, 'Fuel evaporation ice', 10.5, 'white', bold=True); f.T(560, 74, 'downstream of nozzle', 9.5, 'dim'); f.L(556, 66, 268, 180, 'dim', 1)
f.T(20, 76, 'Throttle ice', 10.5, 'white', bold=True); f.T(20, 90, 'at the butterfly', 9.5, 'dim'); f.L(96, 84, 180, 98, 'dim', 1)
f.T(230, 446, 'AIR FLOW', 10.5, 'hot', 'middle', bold=True)
PP.append(f)

# 10_01 fuel injection
f = PF('10_01', 'Fuel Injection — General Arrangement', 760, 420, 'Fuel injection system with engine-driven and electric pumps, fuel servo with throttle and mixture, flow divider and nozzles in the inlet ports',
       'The fuel control (servo) unit meters fuel in proportion to the air flowing through the throttle body. The flow divider shares it equally between nozzles that spray continuously into each inlet port. Free of a venturi and float chamber, the system is far less prone to induction icing.')
f.box(30, 60, 140, 40, ['Fuel tank'], c='fluid')
f.box(30, 140, 140, 50, ['Electric pump', '(boost, start, standby)'], c='cool', size=10)
f.box(30, 210, 140, 50, ['Engine-driven pump'], c='cool')
f.box(230, 170, 150, 70, ['Fuel servo /', 'control unit', 'meters fuel to airflow'], c='gold', size=10)
f.box(440, 170, 130, 60, ['Flow divider', '(distributor)'], c='gold', size=10)
pipe(f, [(100, 100), (100, 140)], 'fluid', 6); pipe(f, [(100, 190), (100, 210)], 'fluid', 6); pipe(f, [(170, 235), (230, 215)], 'fluid', 6)
pipe(f, [(380, 205), (440, 200)], 'fluid', 6)
for i in range(4):
    y = 100 + i * 34; pipe(f, [(570, 200), (610, 200), (610, y), (680, y)], 'fluid', 3)
    f.P(f'M680,{y-6} L700,{y} L680,{y+6} Z', 'ink', 1, 'gold'); f.T(708, y + 4, f'nozzle {i+1}', 9.5, 'ink', bold=True)
f.T(600, 80, 'to each inlet port', 9.5, 'dim')
f.box(230, 300, 150, 50, ['Throttle body', '(air metering)'], c='ink')
f.L(305, 300, 305, 240, 'dim', 1.4, dash='4 3')
f.box(30, 300, 140, 50, ['Air filter / intake'], c='ink'); f.L(170, 325, 228, 325, 'gold', 2.2, me='gold'); f.L(380, 325, 470, 325, 'gold', 2.2, me='gold')
f.T(480, 330, 'induction manifold → cylinders', 10, 'ink', bold=True)
f.box(30, 370, 140, 40, ['Alternate air door'], c='dim', size=10); f.L(170, 390, 230, 345, 'dim', 1.4, me='dim')
f.T(305, 150, 'throttle, mixture', 10, 'gold', 'middle', bold=True); f.L(305, 156, 305, 168, 'gold', 1.4, me='gold')
f.T(505, 260, 'fuel-flow gauge', 9.5, 'dim', 'middle'); f.L(505, 250, 505, 232, 'dim', 1)
PP.append(f)

# 10_03 common rail
f = PF('10_03', 'A Common Rail System', 760, 380, 'Tank, high-pressure pump, common rail and electronically controlled injectors with an electronic control unit',
       'A high-pressure pump keeps the common rail at very high pressure. The electronic control unit, using inputs from engine sensors, opens each injector for exactly the time needed, so injection timing and quantity are controlled precisely. Used on aero diesel engines.')
f.box(30, 270, 130, 60, ['Fuel tank'], c='fluid')
f.box(190, 150, 140, 60, ['High-pressure', 'pump'], c='cool')
f.R(250, 50, 460, 30, c='ink', sw=1.8, fill='steel', rx=14); f.T(480, 70, 'COMMON RAIL (high pressure)', 10.5, 'white', 'middle', bold=True, check=False)
pipe(f, [(95, 270), (95, 180), (190, 180)], 'fluid', 5); pipe(f, [(260, 150), (260, 80)], 'fluid', 5)
for i in range(4):
    x = 380 + i * 90; pipe(f, [(x, 80), (x, 120)], 'fluid', 4)
    f.R(x - 10, 120, 20, 70, c='ink', sw=1.4, fill='#a9bac1', rx=3); f.P(f'M{x-6},190 L{x},208 L{x+6},190 Z', 'ink', 1, 'gold')
f.T(690, 156, 'Injectors', 10.5, 'ink', bold=True)
f.box(440, 290, 200, 60, ['Electronic control unit', '(ECU)'], c='gold')
for i in range(4): x = 380 + i * 90; f.L(x + 10, 160, x + 24, 160, 'gold', 1.2); f.L(x + 24, 160, x + 24, 270, 'gold', 1.2)
f.L(404, 270, 674, 270, 'gold', 1.2); f.L(540, 270, 540, 290, 'gold', 1.2)
f.L(660, 320, 640, 320, 'gold', 1.4, me='gold'); f.T(666, 316, 'inputs from', 9.5, 'gold'); f.T(666, 330, 'engine sensors', 9.5, 'gold')
f.P('M330,195 L360,195 L360,300 L160,300', 'fluid', 1.6, dash='5 3'); f.T(260, 318, 'return', 9.5, 'dim', 'middle')
PP.append(f)

# 11_03 turbocharger
def turbo_layout(f, apc=False):
    k = cyl(f, 380, 300, th=150, s=0.95, charge=CH_IN, iv=True)
    f.Ci(170, 300, 40, 'ink', 1.8, 'cool'); f.T(170, 304, 'COMP', 10, 'black', 'middle', bold=True, check=False)
    f.Ci(170, 390, 34, 'ink', 1.8, 'warm'); f.T(170, 394, 'TURB', 10, 'black', 'middle', bold=True, check=False)
    f.L(170, 340, 170, 356, 'ink', 5); f.T(214, 352, 'common shaft', 9.5, 'dim')
    pipe(f, [(20, 300), (130, 300)], 'cool', 14); f.T(24, 288, 'Air inlet', 10, 'ink', bold=True)
    pipe(f, [(170, 260), (170, 70), (330, 70), (k['iv'][0], k['iv'][1] + 6)], 'cool', 14)
    f.raw(f'<g transform="rotate(-35 170 150)"><rect x="160" y="146" width="20" height="8" fill="{col("steel")}" stroke="{col("ink")}" stroke-width="1.2"/></g>'); f.T(150, 154, 'Throttle', 10, 'ink', 'end', bold=True)
    pipe(f, [(k['ev'][0], k['ev'][1] + 6), (460, 70), (560, 70), (560, 390), (204, 390)], 'warm', 14)
    pipe(f, [(560, 300), (680, 300), (680, 420)], 'warm', 10)
    f.raw(f'<g transform="rotate(45 620 300)"><rect x="606" y="296" width="28" height="8" fill="{col("steel")}" stroke="{col("ink")}" stroke-width="1.2"/></g>')
    f.T(620, 280, 'Wastegate', 10.5, 'ink', 'middle', bold=True); f.T(690, 416, 'overboard', 9.5, 'dim')
    f.T(170, 446, 'exhaust out', 9.5, 'dim', 'middle'); f.L(170, 424, 170, 436, 'dim', 1.4, me='dim')
    return k
f = PF('11_03', 'Turbocharger — General Arrangement', 760, 460, 'Exhaust-driven turbine on a common shaft with a compressor, wastegate in the exhaust bypass and controller',
       'Exhaust gas drives the turbine, which drives the compressor on the same shaft, raising manifold pressure. The wastegate lets exhaust bypass the turbine: closing it sends more gas through the turbine and raises boost. It is moved by an oil-pressure actuator under the control of the wastegate controller.')
k = turbo_layout(f)
f.box(560, 150, 140, 50, ['Wastegate actuator', '(engine oil pressure)'], c='ink', size=9.5)
f.L(630, 200, 625, 290, 'dim', 1.4, dash='4 3')
f.box(590, 10, 150, 50, ['Wastegate controller', 'senses manifold P'], c='gold', size=9.5)
f.L(665, 60, 665, 148, 'gold', 1.4, dash='4 3')
f.L(300, 70, 300, 40, 'ink', 1.4); f.Ci(300, 28, 14, 'ink', 1.4, 'black')
f.T(322, 30, 'MAP', 10, 'ink', bold=True)
PP.append(f)

f = PF('11_04', 'Operation of the Absolute Pressure Controller', 760, 460, 'Turbocharger system with an absolute pressure controller containing an aneroid capsule that controls oil bleed from the wastegate actuator',
       'The APC senses compressor delivery pressure on an aneroid capsule. As pressure reaches the set value the capsule is compressed, opening a bleed that lets oil escape from the wastegate actuator, so the spring opens the wastegate and boost is limited. Below that pressure the bleed closes, oil pressure closes the wastegate and boost rises.')
k = turbo_layout(f)
f.box(560, 150, 140, 50, ['Wastegate actuator', 'oil closes, spring opens'], c='ink', size=9.5)
f.L(630, 200, 625, 290, 'dim', 1.4, dash='4 3')
f.R(590, 8, 150, 122, c='gold', sw=1.6, fill='g2', rx=6); f.T(665, 26, 'Absolute pressure', 10, 'gold', 'middle', bold=True); f.T(665, 40, 'controller (APC)', 10, 'gold', 'middle', bold=True)
for i in range(5): f.El(665, 62 + i * 9, 26, 4, 'ink', 1.4, 'steel')
f.T(665, 118, 'aneroid capsule', 9.5, 'ink', 'middle')
f.P('M590,50 L250,50 L250,62', 'cool', 1.6, dash='4 3'); f.T(420, 44, 'senses compressor delivery pressure', 9.5, 'cool', 'middle')
f.L(700, 150, 700, 130, 'gold', 1.6, dash='4 3'); f.T(706, 144, 'oil bleed', 9.5, 'gold')
PP.append(f)

# 11_05 turbo sequence chart
f = PF('11_05', 'Turbocharger Operation — Start to Critical Altitude', 760, 420, 'Wastegate position, turbo rpm and engine power from engine start, through take-off and the climb, to critical altitude',
       'Wastegate fully open at start and idle. Opening the throttle for take-off, the controller part-closes it to give rated manifold pressure. In the climb it closes progressively to hold that pressure, until at the critical altitude it is fully shut; above that, power falls.')
x0, y0, x1, y1 = 120, 40, 720, 340
xs = dict(start=x0, idle=200, to=320, crit=600)
for k_, x in xs.items(): f.L(x, y0, x, y1, 'line', 1, dash='4 4')
f.L(x0, y1, x1, y1, 'dim', 1.6, me='dim')
for x, t in ((x0, 'ENGINE START'), (200, 'IDLE'), (320, 'TAKE-OFF POWER'), (600, 'CRITICAL ALTITUDE')): f.T(x, y1 + 18, t, 9.5, 'ink', 'middle', bold=True)
f.T(470, y1 + 40, 'climbing →', 10, 'dim', 'middle')
for y, t in ((70, 'wastegate'), (84, 'shut'), (300, 'wastegate'), (314, 'open')): f.T(x0 - 8, y + 4, t, 10, 'gold', 'end')
curve(f, [(x0, 310), (320, 310), (320, 250), (600, 70), (720, 70)], 'gold', 3)
curve(f, [(x0, 330), (200, 320), (320, 220), (600, 150), (720, 140)], 'cool', 2.6)
curve(f, [(x0, 330), (200, 322), (320, 110), (600, 110), (720, 170)], 'hot', 2.6)
f.T(450, 64, 'wastegate closes progressively', 10, 'gold', 'middle', bold=True)
f.T(470, 98, 'ENGINE BHP (held constant)', 10, 'hot', 'middle', bold=True)
f.T(470, 226, 'TURBO RPM rises', 10, 'cool', 'middle', bold=True)
f.T(690, 190, 'BHP falls', 10, 'hot', 'end', bold=True)
PP.append(f)

def bhp_chart(tag, title, aria, cap, lines, crits):
    f = PF(tag, title, 760, 400, aria, cap)
    x0, y0, x1, y1 = 110, 40, 720, 330
    X, Y = chart(x0, y0, x1, y1, (0, 14), (300, 700))
    axes(f, x0, y0, x1, y1, 'Altitude (thousands of feet)', 'Engine BHP')
    for v in range(0, 15, 2): f.T(X(v), y1 + 16, str(v), 10, 'dim', 'middle')
    for v in range(300, 701, 100): f.T(x0 - 8, Y(v) + 4, str(v), 10, 'dim', 'end'); f.L(x0, Y(v), x1, Y(v), 'line', 0.7)
    for a, t, c_ in crits: f.L(X(a), y0, X(a), y1, c_, 1.4, dash='5 4'); f.T(X(a), y0 - 8, t, 9.5, c_, 'middle', bold=True)
    for i, (pts, c_, t, lx, ly) in enumerate(lines):
        curve(f, [(X(a), Y(b)) for a, b in pts], c_, 2.6)
        yy = y1 - 18 - i * 18; f.L(x0 + 12, yy - 4, x0 + 34, yy - 4, c_, 3); f.T(x0 + 40, yy, t, 10, c_, 'start', bold=True)
    return f
PP.append(bhp_chart('11_06', 'Turbocharged & Normally Aspirated Power with Altitude', 'Engine brake horsepower against altitude for normally aspirated, altitude-boosted and ground-boosted turbocharged engines',
    'A normally aspirated engine loses power steadily from sea level. A ground-boosted turbo gives more than rated sea-level power but the wastegate is fully shut at a lower critical altitude; an altitude-boosted turbo holds closer to sea-level power to a higher critical altitude.',
    [([(0, 500), (11.6, 300)], 'dim', 'Normally aspirated', 1.2, 445),
     ([(0, 500), (10, 400), (14, 335)], 'hot', 'Altitude-boosted turbo', 7.5, 452),
     ([(0, 600), (6.7, 545), (14, 410)], 'green', 'Ground-boosted turbo', 0.3, 620)],
    [(6.7, 'Critical alt (lower)', 'green'), (10, 'Critical alt (higher)', 'hot')]))
PP.append(bhp_chart('11_13', 'Supercharged, Turbocharged & Normally Aspirated Power', 'Engine BHP against altitude for an internally supercharged engine compared with turbocharged and normally aspirated engines',
    'An internally driven supercharger is geared to the crankshaft; with the throttle progressively opening, power rises with altitude (lower air temperature and exhaust back-pressure) until full-throttle height, then falls.',
    [([(0, 500), (11.6, 300)], 'dim', 'Normally aspirated', 1.2, 445),
     ([(0, 500), (10, 400), (14, 335)], 'hot', 'Alt-boosted turbo', 9.4, 360),
     ([(0, 600), (6.7, 545), (14, 410)], 'green', 'Ground-boosted turbo', 0.3, 620),
     ([(0, 450), (12, 620), (14, 585)], 'cool', 'Internal supercharger', 3.4, 545)],
    [(6.7, 'Crit alt (lower)', 'green'), (10, 'Crit alt (higher)', 'hot'), (12, 'Full throttle ht', 'cool')]))

# 11_09 internally driven supercharger
f = PF('11_09', 'Internally Driven Supercharger — General Arrangement', 760, 420, 'Gear-driven supercharger impeller between the throttle and the induction manifold, with an automatic boost controller and constant speed unit',
       'The impeller is driven from the crankshaft through gears (often with a spring drive to absorb shock). The automatic boost control (ABC) moves the throttle to hold the boost selected; the propeller CSU keeps rpm constant.')
k = cyl(f, 420, 230, th=140, s=0.85, charge=CH_IN, iv=True)
pipe(f, [(20, 300), (120, 300)], 'cool', 14); f.T(24, 288, 'Air inlet', 10, 'ink', bold=True)
f.Ci(170, 300, 46, 'ink', 1.8, 'cool'); f.T(170, 304, 'IMPELLER', 9.5, 'black', 'middle', bold=True, check=False)
pipe(f, [(170, 254), (170, 70), (320, 70), (k['iv'][0], k['iv'][1] + 6)], 'cool', 14)
f.raw(f'<g transform="rotate(-35 170 150)"><rect x="160" y="146" width="20" height="8" fill="{col("steel")}" stroke="{col("ink")}" stroke-width="1.2"/></g>'); f.T(150, 154, 'Throttle', 10, 'ink', 'end', bold=True)
f.box(60, 180, 70, 40, ['ABC'], c='gold')
f.L(130, 200, 162, 160, 'gold', 1.4, dash='4 3'); f.L(95, 180, 95, 90, 'gold', 1.2, dash='4 3'); f.L(95, 90, 166, 80, 'gold', 1.2, dash='4 3'); f.T(60, 236, 'boost sensed', 9.5, 'gold')
f.box(230, 280, 110, 40, ['Spring drive', '+ gears'], c='dim', size=9.5)
f.L(216, 300, 230, 300, 'ink', 4); f.L(340, 300, 420, 300, 'ink', 4); f.L(420, 300, 420, 230, 'ink', 4)
f.L(420, 230, 640, 230, 'ink', 5)
f.P('M640,230 L740,150 L748,160 L652,236 Z M640,230 L740,310 L732,320 L652,224 Z', 'ink', 1.4, '#a9bac1'); f.Ci(640, 230, 10, 'ink', 1.4, 'g3')
f.box(560, 340, 150, 40, ['Constant speed unit', '(propeller rpm lever)'], c='dim', size=9.5); f.L(600, 340, 600, 236, 'dim', 1.2, dash='4 3')
f.T(300, 50, 'Manifold pressure (boost) →', 10, 'ink', 'middle', bold=True)
f.T(170, 368, 'Fuel enters with the air', 9.5, 'dim', 'middle')
PP.append(f)

# 11_10 & 11_12 power vs altitude
f = PF('11_10', 'Rated Power and Full-Throttle Height', 760, 380, 'Power against altitude for an internally supercharged engine at rated rpm and boost, and at reduced settings',
       'At rated rpm and rated boost, power increases with height until the throttle is fully open at the rated altitude (full-throttle height); above it power falls. A lower boost setting gives a higher FTH; lower rpm drives the supercharger slower and gives a lower FTH.')
x0, y0, x1, y1 = 100, 50, 720, 320
axes(f, x0, y0, x1, y1, 'ALTITUDE →', 'POWER')
curve(f, [(x0, 150), (500, 110), (680, 180)], 'hot', 2.6); f.L(500, 110, 500, y1, 'hot', 1.2, dash='4 4')
curve(f, [(x0, 190), (560, 150), (690, 220)], 'gold', 2.4); f.L(560, 150, 560, y1, 'gold', 1.2, dash='4 4')
curve(f, [(x0, 210), (440, 180), (640, 260)], 'cool', 2.4); f.L(440, 180, 440, y1, 'cool', 1.2, dash='4 4')
for i, (t, c_) in enumerate((('Rated rpm and rated boost', 'hot'), ('Rated rpm, less than rated boost', 'gold'), ('Less than rated rpm, rated boost', 'cool'))):
    f.L(116, 252 + i * 18, 138, 252 + i * 18, c_, 3); f.T(144, 256 + i * 18, t, 10.5, c_, bold=True)
f.T(500, 96, 'Rated altitude (FTH)', 10.5, 'hot', 'middle', bold=True)
f.T(566, 300, 'higher FTH', 10, 'gold', bold=True); f.T(434, 300, 'lower FTH', 10, 'cool', 'end', bold=True)
PP.append(f)

f = PF('11_12', 'Supercharged vs Normally Aspirated Power', 760, 360, 'Power against altitude: normally aspirated falling steadily, supercharged rising to full-throttle height then falling',
       'The normally aspirated engine loses power from sea level as density falls. The supercharged engine holds boost by opening the throttle as it climbs, and power actually rises slightly until full-throttle height.')
x0, y0, x1, y1 = 100, 50, 720, 300
axes(f, x0, y0, x1, y1, 'ALTITUDE →', 'POWER')
curve(f, [(x0, 170), (480, 120), (700, 230)], 'cool', 2.8); f.L(480, 70, 480, y1, 'cool', 1.2, dash='4 4'); f.T(480, 62, 'Full-throttle height', 10.5, 'cool', 'middle', bold=True)
curve(f, [(x0, 150), (600, 296)], 'hot', 2.8)
f.T(200, 140, 'Supercharged engine', 10.5, 'cool', bold=True); f.T(160, 250, 'Normally aspirated engine', 10.5, 'hot', bold=True)
PP.append(f)

# 11_11 ABC unit
f = PF('11_11', 'An Automatic Boost Control Unit', 760, 420, 'Aneroid capsule in a chamber at boost pressure moving a pilot valve that directs oil to a servo piston connected to the throttle',
       'If boost rises the capsule is compressed and moves the pilot valve, sending oil to the servo piston to close the throttle; if boost falls the opposite happens. The boost selector lever moves the datum (via a cam) to select a different boost.')
f.R(220, 60, 160, 160, c='ink', sw=1.8, fill='g2', rx=6)
for i in range(6): f.El(300, 90 + i * 16, 50, 7, 'ink', 1.4, 'warm')
f.L(300, 60, 300, 30, 'ink', 3); f.L(260, 30, 520, 30, 'ink', 4); f.Ci(520, 30, 14, 'ink', 1.6, 'g3'); f.T(540, 34, 'Cam on boost selector lever', 10, 'ink', bold=True)
f.L(300, 176, 300, 240, 'ink', 4)
f.R(260, 240, 80, 120, c='ink', sw=1.6, fill='g3', rx=3)
for y in (260, 300, 340): f.R(270, y - 8, 60, 16, c='ink', sw=1.2, fill='#5d727b', rx=1)
for y, t, c_ in ((260, 'Return oil', 'cool'), (300, 'Pressure oil', 'hot'), (340, 'Return oil', 'cool')): pipe(f, [(140, y), (260, y)], c_, 6); f.T(130, y + 4, t, 10, c_, 'end', bold=True)
f.R(440, 260, 160, 80, c='ink', sw=1.6, fill='g2', rx=4); f.R(500, 266, 30, 68, c='ink', sw=1.4, fill='green', rx=2); f.L(530, 300, 680, 300, 'ink', 4, me='ink')
pipe(f, [(340, 280), (470, 280)], 'hot', 5); pipe(f, [(340, 320), (560, 320)], 'hot', 5)
f.T(520, 250, 'Servo piston', 10.5, 'ink', 'middle', bold=True); f.T(690, 296, 'to', 10, 'ink', bold=True); f.T(690, 310, 'throttle', 10, 'ink', bold=True)
f.T(400, 130, 'Aneroid capsule', 10.5, 'ink', bold=True); f.L(396, 126, 352, 130, 'dim', 1)
f.T(10, 100, 'Boost pressure from', 10, 'ink', bold=True); f.T(10, 114, 'induction manifold', 10, 'ink', bold=True); pipe(f, [(20, 126), (220, 126)], 'cool', 6)
f.T(300, 386, 'Pilot valve', 10.5, 'ink', 'middle', bold=True); f.L(300, 376, 300, 362, 'dim', 1)
PP.append(f)

if __name__ == '__main__':
    gallery(PP, 'Powerplant Gallery 2', 'Powerplant — Piston Engines (2)', 'Original figures for accessories, cooling, ignition, combustion, carburettors, injection and supercharging.', 'pp2-gallery.html')
    print(len(PP), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
