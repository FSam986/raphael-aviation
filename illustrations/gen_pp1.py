#!/usr/bin/env python3
"""Powerplant part 1 (chapters 1-2): piston engine basics."""
import math
from pp_common import *

PP = []
CH_IN, CH_CP, CH_BN, CH_EX = 'cool', '#9b6fd0', 'warm', '#8a6a4a'

# 01_01 components
f = PF('01_01', 'Piston Engine Components', 760, 400, 'Cross-section of a cylinder showing head, valves, spark plug, piston, connecting rod, crankshaft and crankcase',
       'The main parts of a reciprocating engine. The piston slides in the cylinder; the connecting rod turns its up-and-down motion into rotation of the crankshaft.')
k = cyl(f, 380, 300, th=50, charge=CH_IN, iv=True)
lab(f, k['iv'][0] - 8, k['iv'][1] + 4, 200, 64, 'Inlet valve', 'end')
lab(f, k['ev'][0] + 8, k['ev'][1] + 4, 560, 64, 'Exhaust valve')
lab(f, k['plug'][0], k['plug'][1], 470, 30, 'Spark plug')
lab(f, 330, k['head'] + 8, 200, 104, 'Cylinder head', 'end')
lab(f, 326, k['roof'] + 30, 200, 160, 'Cylinder', 'end')
lab(f, 434, k['roof'] + 20, 560, 130, 'Cooling fins')
lab(f, 400, k['ptop'] + 14, 560, 190, 'Piston')
lab(f, (k['pin'][0] + k['crankpin'][0]) / 2, (k['pin'][1] + k['crankpin'][1]) / 2, 560, 248, 'Connecting rod')
lab(f, 380, 300, 200, 330, 'Crankshaft', 'end')
lab(f, 340, 330, 200, 370, 'Crankcase', 'end')
PP.append(f)

# 01_02 venturi
f = PF('01_02', 'A Venturi', 760, 340, 'A duct narrowing to a throat and widening again, with streamlines closing together at the throat',
       'In the convergent section velocity rises and pressure and temperature fall; they reach their extremes at the throat. In the divergent section the process reverses.')
top = [(40 + i * 6.8, 120 - 40 * math.exp(-((40 + i * 6.8 - 380) / 90) ** 2)) for i in range(101)]
f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in top) + ' L720,60 L40,60 Z', 'none', 0, 'steel')
f.P('M' + ' L'.join(f'{x:.1f},{240 - (y - 120):.1f}' for x, y in top) + ' L720,300 L40,300 Z', 'none', 0, 'steel')
f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in top), 'ink', 2)
f.P('M' + ' L'.join(f'{x:.1f},{240 - (y - 120):.1f}' for x, y in top), 'ink', 2)
for k_ in range(1, 8):
    fr = k_ / 8
    pts = [(x, y + (240 - (y - 120) - y) * fr) for x, y in top]
    f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts[::2]), 'cool', 1.1)
for x in (90, 250, 510, 670): f.L(x, 180, x + 18, 180, 'gold', 2.4, me='gold')
f.R(300, 10, 160, 44, c='gold', sw=1.4, fill='g3', rx=4); f.T(380, 28, 'THROAT — narrowest point', 10, 'gold', 'middle', bold=True); f.T(380, 44, 'max velocity, min P, min T', 9.5, 'ink', 'middle')
f.box(60, 260, 220, 50, ['Convergent duct', 'velocity ↑   pressure ↓   temp ↓'], c='cool', size=10.5)
f.box(480, 260, 220, 50, ['Divergent duct', 'velocity ↓   pressure ↑   temp ↑'], c='warm', size=10.5)
PP.append(f)

# 01_03 four-stroke cycle
f = PF('01_03', 'Four-Stroke Cycle — Pressure & Volume Changes', 760, 560, 'Four cylinders showing induction, compression, power and exhaust strokes',
       'Each stroke is half a crankshaft revolution, so the four strokes take two revolutions (720°).')
for i, (th, ch, iv, ev, sp, name, arr, txt) in enumerate((
        (120, CH_IN, True, False, False, '1  INDUCTION', 1, ['Piston moves down, inlet', 'valve open. Volume', 'increases, pressure falls.']),
        (240, CH_CP, False, False, False, '2  COMPRESSION', -1, ['Piston rises, both valves', 'closed. Volume falls,', 'pressure and temp rise.']),
        (60, CH_BN, False, False, True, '3  POWER', 1, ['Mixture ignited: rapid rise', 'in temperature and pressure', 'drives the piston down.']),
        (300, CH_EX, False, True, False, '4  EXHAUST', -1, ['Piston rises, exhaust valve', 'open: burnt gas pushed out.', 'Pressure slightly above ambient.']))):
    x0, y0 = (i % 2) * 380, (i // 2) * 280
    cyl(f, x0 + 90, y0 + 210, th=th, s=0.78, charge=ch, iv=iv, ev=ev, spark=sp)
    f.T(x0 + 180, y0 + 50, name, 12, 'gold', bold=True)
    ay = y0 + 80
    if arr > 0: f.L(x0 + 168, ay, x0 + 168, ay + 50, 'hot', 2.6, me='hot')
    else: f.L(x0 + 168, ay + 50, x0 + 168, ay, 'hot', 2.6, me='hot')
    note(f, x0 + 180, y0 + 84, txt, size=10.5, lh=16, c='ink')
PP.append(f)

# 02_01 layouts
f = PF('02_01', 'Engine Layouts', 760, 330, 'Front views of in-line, V, radial and horizontally opposed engines',
       'Cylinder arrangements seen from the front, crankshaft at the centre of each.')
def cylblk(x, y, ang, L=46, w=30):
    f.raw(f'<g transform="translate({x} {y}) rotate({ang})"><rect x="{-w/2}" y="{-L-24}" width="{w}" height="{L}" rx="3" fill="{col("steel")}" stroke="{col("ink")}" stroke-width="1.6"/>'
          + ''.join(f'<line x1="{-w/2-5}" y1="{-L-20+j*8}" x2="{w/2+5}" y2="{-L-20+j*8}" stroke="{col("ink")}" stroke-width="1"/>' for j in range(6)) + '</g>')
def hub(x, y, r=22): f.Ci(x, y, r, 'ink', 1.8, 'g3'); f.Ci(x, y, 5, 'ink', 1.2, 'gold')
cylblk(100, 180, 0); hub(100, 180); f.T(100, 250, 'IN-LINE', 11, 'ink', 'middle', bold=True)
cylblk(270, 180, -30); cylblk(270, 180, 30); hub(270, 180); f.T(270, 250, 'V', 11, 'ink', 'middle', bold=True)
f.P('M253,110 A80,80 0 0 1 287,110', 'gold', 1.2); f.T(270, 100, 'V angle', 9.5, 'gold', 'middle')
for j in range(7): cylblk(460, 175, j * 360 / 7, L=40, w=26)
hub(460, 175, 30); f.T(460, 285, 'RADIAL (single row)', 11, 'ink', 'middle', bold=True); f.T(460, 300, 'odd number of cylinders per row', 9.5, 'dim', 'middle')
cylblk(650, 180, -90, L=44); cylblk(650, 180, 90, L=44); hub(650, 180); f.T(650, 250, 'HORIZONTALLY OPPOSED', 11, 'ink', 'middle', bold=True); f.T(650, 266, '4 or 6 cylinders, flat', 9.5, 'dim', 'middle')
PP.append(f)

# 02_02 TDC BDC
f = PF('02_02', 'TDC, BDC, Stroke & Crank Throw', 760, 400, 'Two cylinders, one with the piston at top dead centre and one at bottom dead centre',
       'The stroke is the distance the piston travels between TDC and BDC; it equals twice the crank throw.')
s_ = 1.2
a = cyl(f, 150, 320, th=0, s=s_); b = cyl(f, 610, 320, th=180, s=s_)
f.L(210, a['ptop'], 550, a['ptop'], 'gold', 1.4, dash='6 4'); f.L(210, b['ptop'], 550, b['ptop'], 'hot', 1.4, dash='6 4')
f.T(380, a['ptop'] - 8, 'TOP DEAD CENTRE (TDC)', 11, 'gold', 'middle', bold=True)
f.T(380, b['ptop'] + 18, 'BOTTOM DEAD CENTRE (BDC)', 11, 'hot', 'middle', bold=True)
f.L(300, a['ptop'] + 3, 300, b['ptop'] - 3, 'ink', 1.6, me='ink', ms='ink'); f.T(312, (a['ptop'] + b['ptop']) / 2 + 4, 'STROKE', 11, 'ink', bold=True)
f.L(210, a['crankpin'][1], 300, a['crankpin'][1], 'cool', 1.2, dash='4 3'); f.L(210, 320, 300, 320, 'cool', 1.2, dash='4 3')
f.L(260, a['crankpin'][1] + 2, 260, 318, 'cool', 1.6, me='cool', ms='cool'); f.T(272, (a['crankpin'][1] + 320) / 2 + 4, 'CRANK THROW', 10.5, 'cool', bold=True)
f.T(380, 388, 'stroke = 2 × crank throw', 11, 'ink', 'middle', bold=True)
f.T(150, 388, 'piston at TDC', 10, 'dim', 'middle'); f.T(610, 388, 'piston at BDC', 10, 'dim', 'middle')
PP.append(f)

# timing diagram helper (compass degrees, 0 = TDC at top, clockwise = rotation)
def timing(f, cx, cy, ev, r0=150, gap=20, w=14, lbl=True, small=False):
    segs = [('INDUCTION', 'cool', ev['IVO'], 180 + ev['IVC']), ('COMPRESSION', 'gold', 180 + ev['IVC'], 360 - ev['IGN']),
            ('POWER', 'hot', 360 - ev['IGN'], 540 - ev['EVO']), ('EXHAUST', 'dim', 540 - ev['EVO'], 720 + ev['EVC'])]
    rs = []
    for i, (n, c_, a0, a1) in enumerate(segs):
        r = r0 - i * gap; rs.append(r)
        span = a1 - a0
        if span >= 359: span = 359
        arc_band(f, cx, cy, r, a0, a0 + span, c_, w)
        if lbl:
            mid = a0 + span / 2; m = mid % 360; x, y = pol(cx, cy, r, mid)
            rot = m if (m <= 90 or m >= 270) else m - 180
            f.raw(f'<text x="{x:.1f}" y="{y:.1f}" dy="3.4" font-family="Overpass,sans-serif" font-size="{9 if small else 10}" font-weight="700" fill="#0b0f11" text-anchor="middle" transform="rotate({rot:.1f} {x:.1f} {y:.1f})">{n}</text>')
    return rs
f = PF('02_04', 'Theoretical Valve & Ignition Timing', 760, 440, 'Spiral timing diagram for the theoretical four-stroke cycle with every event exactly at TDC or BDC',
       'In the theoretical cycle every event happens exactly at TDC or BDC. Real engines use lead, lag and overlap (next figure).')
cx, cy = 300, 220
timing(f, cx, cy, dict(IVO=0, IVC=0, IGN=0, EVO=0, EVC=0), r0=180, gap=34, w=24)
f.L(cx, 20, cx, 420, 'line', 1.2, dash='4 4')
f.T(cx, 16, 'TDC', 12, 'ink', 'middle', bold=True); f.T(cx, 436, 'BDC', 12, 'ink', 'middle', bold=True)
note(f, 520, 120, ['Events (theoretical):', 'TDC  inlet valve opens', 'TDC  exhaust valve closes', 'TDC  ignition', 'BDC  inlet valve closes', 'BDC  exhaust valve opens'], size=10.5, lh=20, c='ink', first='gold')
note(f, 520, 270, ['Read outward ring first:', 'one revolution per pair of strokes,', 'two revolutions (720°) per cycle.', 'Rotation clockwise.'], size=10, lh=16)
PP.append(f)

f = PF('02_05', 'Practical Valve & Ignition Timing', 760, 470, 'Spiral timing diagram showing valve lead, lag, overlap and ignition advance',
       'Valve lead (IVO 20° BTDC), valve lag (IVC 71° ABDC, EVC 29° ATDC), valve overlap of 49° and ignition about 34° BTDC. Figures are typical, not universal.')
cx, cy = 300, 240
EV = dict(IVO=-20, IVC=71, IGN=34, EVO=62, EVC=29)
timing(f, cx, cy, EV, r0=180, gap=34, w=24)
f.L(cx, 34, cx, 446, 'line', 1.2, dash='4 4'); f.T(cx, 26, 'TDC', 12, 'ink', 'middle', bold=True); f.T(cx, 458, 'BDC', 12, 'ink', 'middle', bold=True)
for ang, r, t, x, y, an in ((-20, 180, 'IVO 20° BTDC', 70, 60, 'start'), (29, 78, 'EVC 29° ATDC', 470, 60, 'start'), (-34, 112, 'Ignition 34° BTDC', 70, 130, 'start'),
                             (180 + 71, 180, 'IVC 71° ABDC', 70, 420, 'start'), (180 - 62, 112, 'EVO 62° BBDC', 470, 420, 'start')):
    px, py = pol(cx, cy, r, ang); f.Ci(px, py, 5, 'ink', 1.4, 'white'); f.L(px, py, x + (60 if x < 300 else 0), y - 4, 'dim', 1)
    f.T(x, y, t, 11, 'ink', an, bold=True)
note(f, 520, 200, ['Valve lead: opens early', 'Valve lag: closes late', 'Overlap: IVO to EVC, both', 'valves open (20° + 29° = 49°)', 'Ignition advance: before TDC'], size=10.5, lh=18, c='ink', first='gold')
PP.append(f)

# 02_06 ineffective crank angle
f = PF('02_06', 'Ineffective Crank Angle', 760, 420, 'Two cylinders comparing piston travel for 45 degrees of crank rotation near TDC and at mid-stroke',
       'Around TDC and BDC the crank turns through a large angle while the piston hardly moves — the ineffective crank angle. Near mid-stroke the same 45° moves the piston much further.')
s_ = 1.1
for cx, a0, a1, t in ((200, -45, 0, ['Last 45° of crank up to TDC:', 'piston moves {d:.0f}% of the stroke']), (560, 67.5, 112.5, ['45° of crank around mid-stroke:', 'piston moves {d:.0f}% of the stroke'])):
    k = cyl(f, cx, 330, th=a0, s=s_)
    d = abs(pin_y(a0) - pin_y(a1)) * s_
    for ang in (a0, a1):
        x, y = pol(cx, 330, R_CR * s_ * 1.9, ang); f.L(cx, 330, x, y, 'hot', 2)
    p0, p1 = pol(cx, 330, R_CR * s_ * 1.7, a0), pol(cx, 330, R_CR * s_ * 1.7, a1)
    f.P(f'M{p0[0]:.1f},{p0[1]:.1f} A{R_CR*s_*1.7},{R_CR*s_*1.7} 0 0 1 {p1[0]:.1f},{p1[1]:.1f}', 'gold', 2)
    y0, y1 = 330 - pin_y(a0) * s_ - 15 * s_, 330 - pin_y(a1) * s_ - 15 * s_
    f.L(cx + 80, y0, cx + 110, y0, 'gold', 1.2); f.L(cx + 80, y1, cx + 110, y1, 'gold', 1.2)
    f.L(cx + 100, min(y0, y1) - 18, cx + 100, min(y0, y1), 'gold', 1.6, me='gold'); f.L(cx + 100, max(y0, y1) + 18, cx + 100, max(y0, y1), 'gold', 1.6, me='gold')
    note(f, cx - 120, 392, [t[0], t[1].format(d=100 * d / s_ / (2 * R_CR))], size=10.5, lh=15, c='ink', first='gold')
f.T(380, 20, 'Same 45° of crank rotation — very different piston travel', 11, 'ink', 'middle', bold=True)
PP.append(f)

# 02_08 MAP gauge
f = PF('02_08', 'Manifold Absolute Pressure Gauge', 760, 380, 'A cylinder with its induction manifold connected to a manifold pressure gauge',
       'The MAP gauge reads absolute pressure in the induction manifold, in inches of mercury. Engine stopped, it reads ambient pressure (about 29.9 inHg at sea level).')
k = cyl(f, 420, 300, th=120, s=1.05, charge=CH_IN, iv=True)
pipe(f, [(80, 84), (300, 84), (k['iv'][0] + 4, k['iv'][1] + 8)], 'cool', 18)
f.T(110, 72, 'Induction manifold', 10.5, 'ink', bold=True)
f.L(200, 76, 200, 130, 'ink', 2); dial(f, 200, 200, 52, 225, 495, [(0, '10'), (0.25, '20'), (0.5, '30'), (0.75, '40'), (1, '50')], ptr=0.3, minor=5, size=10)
f.T(200, 280, 'MAP  inHg', 10.5, 'ink', 'middle', bold=True)
note(f, 560, 120, ['Reads absolute pressure', 'in the manifold, after', 'the throttle.', '', 'Engine stopped: reads', 'ambient (≈ 29.9 at MSL).', 'Running, unsupercharged:', 'always below ambient.'], size=10.5, lh=16, c='ink', first='gold')
PP.append(f)

# 02_10 volumes
f = PF('02_10', 'Total, Swept & Clearance Volume', 760, 420, 'Three cylinders showing total volume at BDC, swept volume and clearance volume at TDC',
       'Compression ratio = total volume ÷ clearance volume = (swept + clearance) ÷ clearance.')
s_ = 1.05
k1 = cyl(f, 130, 330, th=180, s=s_, charge='hot', valves=False)
k2 = cyl(f, 380, 330, th=180, s=s_, valves=False)
f.R(380 - 38 * s_, k2['ptop'] - (pin_y(0) - pin_y(180)) * s_, 76 * s_, (pin_y(0) - pin_y(180)) * s_, c='none', sw=0, fill='hot', rx=0, op=0.8)
k3 = cyl(f, 630, 330, th=0, s=s_, charge='hot', valves=False)
for x, t in ((130, 'TOTAL VOLUME'), (380, 'SWEPT VOLUME'), (630, 'CLEARANCE VOLUME')): f.T(x, 30, t, 11, 'ink', 'middle', bold=True)
f.T(130, 405, 'piston at BDC', 10, 'dim', 'middle'); f.T(380, 405, 'TDC to BDC', 10, 'dim', 'middle'); f.T(630, 405, 'piston at TDC', 10, 'dim', 'middle')
PP.append(f)

# 02_12 crankshaft
f = PF('02_12', 'A Four-Cylinder Crankshaft', 760, 360, 'Side view of a four-throw crankshaft with main journals, crankpins, webs, balance weights and propeller flange',
       'Crankpins 1 and 4 are in line, 2 and 3 are opposite them (180°). Oil reaches the big-end bearings through drillings from the main journals.')
ax = 190
f.L(40, ax, 720, ax, 'line', 1, dash='6 4')
xs = [90, 230, 370, 510, 650]
for x in xs: f.R(x - 22, ax - 14, 44, 28, c='ink', sw=1.6, fill='steel', rx=3)
for i, up in enumerate((1, -1, -1, 1)):
    x0, x1 = xs[i] + 22, xs[i + 1] - 22; py = ax - up * 60
    for wx in (x0, x1 - 16):
        f.R(wx, min(py, ax) - 22, 16, abs(py - ax) + 44, c='ink', sw=1.4, fill='#5d727b', rx=4)
        f.P(f'M{wx},{ax + up*22} L{wx+16},{ax + up*22} L{wx+20},{ax + up*52} L{wx-4},{ax + up*52} Z', 'ink', 1.2, 'g3')
    f.R(x0 + 16, py - 13, x1 - x0 - 32, 26, c='ink', sw=1.6, fill='#a9bac1', rx=3)
    f.T((x0 + x1) / 2, py + (-22 if up > 0 else 34), str(i + 1), 12, 'gold', 'middle', bold=True)
    f.P(f'M{xs[i]+10},{ax} L{(x0+x1)/2},{py}', 'gold', 1.4, dash='3 3')
f.R(700, ax - 52, 14, 104, c='ink', sw=1.6, fill='steel', rx=3); f.T(708, 340, 'Propeller flange', 10, 'ink', 'middle', bold=True); f.L(708, ax + 54, 708, 326, 'dim', 1)
f.R(28, ax - 30, 20, 60, c='ink', sw=1.4, fill='g3', rx=2); f.T(38, 340, 'Camshaft drive gear', 10, 'ink', 'start', bold=True); f.L(38, ax + 32, 38, 326, 'dim', 1)
lab(f, 230, ax + 14, 230, 290, 'Main journal', 'middle')
lab(f, 160, ax - 60, 300, 40, 'Crankpin (big-end)', 'middle')
lab(f, 132, ax + 44, 132, 290, 'Balance weight', 'middle')
lab(f, 540, ax - 70, 500, 40, 'Web', 'middle')
lab(f, 565, ax - 45, 640, 40, 'Oil drilling', 'middle', c='gold')
PP.append(f)

# 02_15 valve clearance
f = PF('02_15', 'Valve Operating Mechanism & Valve Clearance', 760, 440, 'Cam, tappet, push rod and rocker opening a poppet valve, with the clearance gap at the valve tip',
       'The valve (tappet) clearance is the gap between rocker pad and valve tip with the valve closed. It allows for expansion; too little holds the valve open, too much makes it open late and close early.')
vx = 200
f.R(60, 340, 300, 50, c='ink', sw=1.6, fill='g3', rx=0); f.T(110, 370, 'Cylinder head', 10, 'ink', bold=True)
f.R(vx - 10, 240, 20, 100, c='ink', sw=1.2, fill='#5d727b', rx=1); f.T(vx + 20, 300, 'Valve guide', 10, 'ink', bold=True)
f.R(vx - 4, 127, 8, 263, c='ink', sw=1.2, fill='#a9bac1', rx=1)
f.P(f'M{vx-4},390 L{vx-34},404 L{vx+34},404 L{vx+4},390 Z', 'ink', 1.4, '#a9bac1'); f.T(vx + 44, 404, 'Valve head', 10, 'ink', bold=True)
for i in range(9): f.P(f'M{vx-22},{226 - i*10} L{vx+22},{221 - i*10}', 'cool', 1.8)
f.T(vx - 30, 186, 'Valve springs', 10, 'ink', 'end', bold=True)
f.R(vx - 26, 132, 52, 8, c='ink', sw=1.2, fill='steel', rx=1)
f.T(vx - 30, 266, 'Valve stem', 10, 'ink', 'end', bold=True); f.L(vx - 28, 262, vx - 6, 262, 'dim', 1)
# rocker
pv = (360, 92)
f.P(f'M{vx-14},104 L{pv[0]},80 L590,74 L590,92 L{pv[0]},104 L{vx+14},116 Z', 'ink', 1.6, 'steel')
f.Ci(pv[0], 92, 12, 'ink', 1.6, 'g3'); f.T(pv[0], 50, 'Rocker shaft (pivot)', 10, 'ink', 'middle', bold=True); f.L(pv[0], 54, pv[0], 78, 'dim', 1)
f.T(470, 66, 'Rocker arm', 10, 'ink', 'middle', bold=True)
f.L(vx - 24, 117, vx + 24, 117, 'gold', 1); f.L(vx - 24, 127, vx + 24, 127, 'gold', 1)
f.T(vx - 30, 112, 'Clearance', 10.5, 'gold', 'end', bold=True); f.T(vx - 30, 128, '(gap at valve tip)', 9.5, 'gold', 'end')
f.R(574, 92, 14, 220, c='ink', sw=1.4, fill='#a9bac1', rx=4); f.T(600, 200, 'Push rod', 10, 'ink', bold=True)
f.R(566, 312, 30, 40, c='ink', sw=1.4, fill='#5d727b', rx=3); f.T(604, 336, 'Tappet / cam follower', 10, 'ink', bold=True)
f.P('M581,352 C548,360 548,410 581,414 C620,414 622,358 595,352 Z', 'ink', 1.6, 'g3'); f.Ci(584, 386, 6, 'ink', 1.2, 'gold')
f.T(604, 420, 'Cam lobe on camshaft', 10, 'ink', bold=True)
PP.append(f)

if __name__ == '__main__':
    gallery(PP, 'Powerplant Gallery 1', 'Powerplant — Piston Engines (1)', 'Original figures for piston engine basics.', 'pp1-gallery.html')
    print(len(PP), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
