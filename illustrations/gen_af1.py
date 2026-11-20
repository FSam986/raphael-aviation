#!/usr/bin/env python3
"""Airframes part 1 (chapters 1-2): structures and hydraulic basics."""
import math
from af_common import *

AFS = []
def chart(x0, y0, x1, y1, xr, yr):
    return (lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)), (lambda v: y1 - (v - yr[0]) / (yr[1] - yr[0]) * (y1 - y0))

# 01_04 load paths
f = AF('01_04', 'Fail-Safe Structure — Multiple Load Paths', 760, 340, 'A wing-to-fuselage attachment fitting with several bolts and straps, one of which has fractured while the others carry the load',
       'A fail-safe structure has more than one load path. If one member (here one lug of the wing attachment fitting) cracks, the load is redistributed to the others, which can carry it safely until the damage is found at inspection.')
f.R(120, 30, 60, 250, c='ink', sw=1.8, fill='steel', rx=4); f.T(150, 300, 'Main fuselage frame', 10.5, 'ink', 'middle', bold=True)
f.R(180, 150, 360, 70, c='ink', sw=1.8, fill='#a9bac1', rx=6); f.T(360, 240, 'Wing-to-fuselage attachment fitting', 10.5, 'ink', 'middle', bold=True)
for k, y in enumerate((165, 185, 205)):
    f.Ci(210, y, 6, 'ink', 1.4, 'g3'); f.Ci(510, y, 6, 'ink', 1.4, 'g3')
    f.L(216, y, 504, y, 'gold' if k != 1 else 'hot', 2.4, dash=None if k != 1 else '10 6')
f.P('M352,178 L360,186 L354,192 L364,198', 'hot', 2.4); f.T(370, 130, 'fracture in one load path', 10.5, 'hot', 'middle', bold=True); f.L(370, 136, 358, 180, 'hot', 1)
f.R(540, 120, 180, 130, c='ink', sw=1.8, fill='g3', rx=4); f.T(630, 190, 'Wing spar', 10.5, 'ink', 'middle', bold=True)
f.T(380, 290, 'remaining load paths (gold) carry the load', 10.5, 'gold', 'middle', bold=True)
for y in (60, 100): f.L(150, y, 150, y + 30, 'gold', 2, me='gold')
f.T(196, 80, 'load paths', 10, 'gold')
AFS.append(f)

# 01_05 damage tolerant structure
f = AF('01_05', 'Damage-Tolerant Fuselage Structure', 760, 380, 'A fuselage panel with frames and stringers, tear stopper straps, skin reinforcing plates, window support frames, intercostals and a bulkhead',
       'A damage-tolerant structure is designed so that a crack grows slowly and is stopped or slowed — by tear-stopper straps, reinforcing plates and closely spaced frames and stringers — long enough to be found at scheduled inspection.')
x0, y0, W, H = 80, 50, 560, 260
f.R(x0, y0, W, H, c='ink', sw=1.8, fill='g2', rx=0)
for k in range(1, 9): f.L(x0, y0 + k * H / 9, x0 + W, y0 + k * H / 9, 'cool', 1.4)
for k in range(8): x = x0 + 35 + k * 70; f.L(x, y0, x, y0 + H, 'ink', 3)
for k in range(4): x = x0 + 70 + k * 140; f.R(x - 4, y0, 8, H, c='none', sw=0, fill='gold', rx=0, op=0.85)
for k in range(3): x = x0 + 140 + k * 140; f.R(x - 22, 110, 44, 64, c='ink', sw=3, fill='bg', rx=14); f.R(x - 30, 102, 60, 80, c='green', sw=1.6, fill='none', rx=16)
f.L(x0 + W - 35, y0 + 30, x0 + W - 35 + 0, y0 + 230, 'hot', 6)
f.L(x0 + 140, 220, x0 + 210, 220, 'dim', 3); f.T(x0 + 175, 240, 'intercostal', 9.5, 'dim', 'middle')
f.T(80, 34, 'Tear stopper straps (gold)', 10.5, 'gold', bold=True)
f.T(330, 34, 'Window support frames + reinforcing plates (green)', 10.5, 'green', bold=True)
f.T(80, 334, 'Frames (vertical)', 10.5, 'ink', bold=True); f.T(240, 334, 'Stringers (horizontal)', 10.5, 'cool', bold=True)
f.T(640, 334, 'Bulkhead', 10.5, 'hot', 'end', bold=True)
AFS.append(f)

# 01_06 S-N curve
f = AF('01_06', 'Fatigue — The S-N Curve', 760, 360, 'Applied alternating stress as a percentage of ultimate against number of cycles to failure on a logarithmic scale',
       'The lower the alternating stress, the more cycles a part survives before fatigue failure. At 80% of ultimate stress failure comes after a few hundred cycles; at about 20% after around ten million. Fatigue is the main reason for life-limited parts.')
x0, y0, x1, y1 = 110, 40, 680, 290
X, Y = chart(x0, y0, x1, y1, (0, 7.5), (0, 100))
axes(f, x0, y0, x1, y1, 'NUMBER OF CYCLES TO FAILURE (log scale)', 'STRESS (% of ultimate)')
for e in range(0, 8): f.T(X(e), y1 + 16, f'10^{e}' if e > 1 else ('1' if e == 0 else '10'), 9.5, 'dim', 'middle')
for v in (20, 30, 50, 80): f.T(x0 - 8, Y(v) + 4, str(v), 10, 'dim', 'end'); f.L(x0, Y(v), x1, Y(v), 'line', 0.6, dash='4 4')
smooth(f, [(X(0), Y(92)), (X(1.5), Y(86)), (X(2.6), Y(80)), (X(3.6), Y(55)), (X(4.6), Y(34)), (X(5.6), Y(25)), (X(7), Y(21)), (X(7.5), Y(20.5))], 'hot', 3)
for e, v in ((2.6, 80), (3.6, 55), (4.6, 34)): f.L(X(e), Y(v), X(e), y1, 'gold', 1, dash='3 3')
f.T(X(6.2), Y(30), 'endurance region', 10, 'hot', 'middle', bold=True)
AFS.append(f)

# 01_09 pressure stresses
f = AF('01_09', 'Pressurisation Stresses — Hoop and Axial', 760, 300, 'Pressurised fuselage between front and rear pressure bulkheads, with hoop stress around the circumference and axial stress along the length',
       'Cabin pressure differential stresses the fuselage skin in two directions: hoop (circumferential) stress, which tries to burst the cylinder, and axial (longitudinal) stress, which acts along it and is reacted by the pressure bulkheads. Hoop stress is twice the axial stress for a cylinder.')
f.P('M110,150 Q110,100 170,96 L600,96 Q680,96 700,150 Q680,204 600,204 L170,204 Q110,200 110,150 Z', 'ink', 2, 'g2')
for x, t in ((150, 'Front pressure bulkhead'), (640, 'Rear pressure bulkhead')): f.El(x, 150, 14, 50, 'gold', 2, 'g3'); f.T(x, 230 if x < 400 else 76, t, 10.5, 'gold', 'middle', bold=True)
f.El(380, 150, 24, 54, 'cool', 2, 'none')
for a in range(0, 360, 45): p = pol(380, 150, 20, a); q = pol(380, 150, 34, a); f.L(p[0], p[1], q[0], q[1], 'cool', 1.6, me='cool')
f.T(380, 250, 'HOOP STRESS (circumferential)', 10.5, 'cool', 'middle', bold=True)
f.L(470, 150, 560, 150, 'hot', 2.4, me='hot'); f.L(290, 150, 200, 150, 'hot', 2.4, me='hot'); f.T(515, 140, 'AXIAL', 10.5, 'hot', 'middle', bold=True)
AFS.append(f)

# 01_10 truss
f = AF('01_10', 'Truss (Framework) Fuselage', 760, 300, 'Side view of a welded steel tube fuselage frame with longerons, uprights and diagonal bracing forming triangles',
       'Light aircraft such as the Auster use a welded steel-tube truss: longerons with vertical and diagonal members forming triangles (a Warren or Pratt truss) carry all the loads; the fabric covering carries none.')
top = lambda x: 80 + max(0, x - 260) * 0.12
bot = lambda x: 220 - max(0, x - 260) * 0.18
xs = [80, 160, 260, 360, 460, 560, 660]
f.P('M' + ' L'.join(f'{x},{top(x):.0f}' for x in xs), 'ink', 3); f.P('M' + ' L'.join(f'{x},{bot(x):.0f}' for x in xs), 'ink', 3)
for i, x in enumerate(xs):
    f.L(x, top(x), x, bot(x), 'ink', 2)
    if i < len(xs) - 1: f.L(x, bot(x) if i % 2 == 0 else top(x), xs[i + 1], top(xs[i + 1]) if i % 2 == 0 else bot(xs[i + 1]), 'gold', 2)
f.T(370, 50, 'Longerons (top and bottom)', 10.5, 'ink', 'middle', bold=True)
f.T(380, 270, 'Diagonals form triangles: each member in tension or compression', 10.5, 'gold', 'middle', bold=True)
AFS.append(f)

def shell(f, cx, cy, frames=True, stringers=False):
    f.El(cx - 90, cy, 50, 90, 'ink', 2, 'g3'); f.El(cx - 90, cy, 40, 78, 'ink', 1.4, 'bg')
    f.P(f'M{cx - 90},{cy - 90} L{cx + 160},{cy - 70} A40,70 0 0 1 {cx + 160},{cy + 70} L{cx - 90},{cy + 90}', 'ink', 2, 'g2')
    if frames:
        for k in range(1, 5): x = cx - 90 + k * 50; h = 90 - k * 4; f.P(f'M{x},{cy - h} A{40 - k * 1},{h} 0 0 1 {x},{cy + h}', 'cool', 2.4)
    if stringers:
        for k in range(-3, 4): f.L(cx - 80, cy + k * 22, cx + 150, cy + k * 18, 'gold', 1.6)
f = AF('01_11', 'Monocoque Construction', 760, 300, 'A shell fuselage section with formers giving shape and the outside skin carrying the loads',
       'In a monocoque structure the skin carries all the loads; formers only give the shape. It is light but easily damaged and buckles under compression, so it is rarely used except for small parts.')
shell(f, 340, 150); f.T(560, 70, 'Formers (shape only)', 10.5, 'cool', bold=True); f.T(560, 240, 'Outside skin carries all loads', 10.5, 'ink', bold=True)
AFS.append(f)
f = AF('01_12', 'Semi-Monocoque Construction', 760, 300, 'A fuselage section with frames, longitudinal stringers and a stressed skin sharing the loads',
       'Semi-monocoque: frames (formers) and longitudinal stringers stiffen a stressed skin. The skin carries shear and pressure loads, the stringers carry bending and stop the skin buckling, and the frames keep the shape. Almost all modern aircraft are built this way.')
shell(f, 340, 150, stringers=True); f.T(560, 70, 'Frames / formers', 10.5, 'cool', bold=True); f.T(560, 150, 'Stringers', 10.5, 'gold', bold=True); f.T(560, 240, 'Stressed skin', 10.5, 'ink', bold=True)
AFS.append(f)

# 01_13 beam sections
f = AF('01_13', 'Spar and Longeron Sections', 760, 360, 'Cross-sections of built-up T beam, double-web, I beam, non fail-safe, C section and Z section members with web and caps labelled',
       'Beams carry bending in their caps (booms) and shear in the web. Built-up and double-web sections are fail-safe: a crack in one part leaves another to carry the load. A one-piece (non fail-safe) extrusion has no alternative load path.')
def sec(x, y, kind):
    c, w = 'cool', 'hot'
    if kind == 'I': f.R(x - 30, y - 60, 60, 10, c='ink', sw=1, fill=c, rx=0); f.R(x - 30, y + 50, 60, 10, c='ink', sw=1, fill=c, rx=0); f.R(x - 4, y - 50, 8, 100, c='ink', sw=1, fill=w, rx=0)
    if kind == 'T': sec(x, y, 'I'); f.R(x - 14, y - 50, 28, 8, c='ink', sw=1, fill='gold', rx=0); f.R(x - 14, y + 42, 28, 8, c='ink', sw=1, fill='gold', rx=0)
    if kind == 'D': f.R(x - 34, y - 60, 68, 10, c='ink', sw=1, fill=c, rx=0); f.R(x - 34, y + 50, 68, 10, c='ink', sw=1, fill=c, rx=0); f.R(x - 30, y - 50, 8, 100, c='ink', sw=1, fill=w, rx=0); f.R(x + 22, y - 50, 8, 100, c='ink', sw=1, fill=w, rx=0)
    if kind == 'N': f.P(f'M{x - 30},{y - 60} L{x + 30},{y - 60} L{x + 30},{y - 50} L{x + 5},{y - 50} L{x + 5},{y + 50} L{x + 30},{y + 50} L{x + 30},{y + 60} L{x - 30},{y + 60} L{x - 30},{y + 50} L{x - 5},{y + 50} L{x - 5},{y - 50} L{x - 30},{y - 50} Z', 'ink', 1.2, 'steel')
    if kind == 'C': f.P(f'M{x + 26},{y - 60} L{x - 20},{y - 60} L{x - 20},{y + 60} L{x + 26},{y + 60} L{x + 26},{y + 50} L{x - 10},{y + 50} L{x - 10},{y - 50} L{x + 26},{y - 50} Z', 'ink', 1.2, 'gold')
    if kind == 'Z': f.P(f'M{x + 30},{y - 60} L{x - 4},{y - 60} L{x - 4},{y + 50} L{x - 30},{y + 50} L{x - 30},{y + 60} L{x + 6},{y + 60} L{x + 6},{y - 50} L{x + 30},{y - 50} Z', 'ink', 1.2, 'gold')
for i, (k, t) in enumerate((('T', 'Built-up T beam'), ('D', 'Double-web'), ('I', 'I beam'), ('N', 'Non fail-safe (one piece)'), ('C', '"C" section'), ('Z', '"Z" section'))):
    x = 80 + (i % 3) * 300 if i < 3 else 80 + (i - 3) * 300; y = 100 if i < 3 else 260
    x = [100, 380, 640][i % 3]
    sec(x, y, k); f.T(x, y + 82, t, 10.5, 'ink', 'middle', bold=True)
f.L(130, 50, 160, 40, 'dim', 1); f.T(166, 42, 'cap (boom)', 10, 'cool', bold=True); f.L(104, 120, 160, 140, 'dim', 1); f.T(166, 144, 'web', 10, 'hot', bold=True)
AFS.append(f)

def ring(f, cx, cy, bulkhead=False):
    f.El(cx, cy, 110, 140, 'ink', 9, 'none'); f.El(cx, cy, 110, 140, 'steel', 6, 'none')
    f.El(cx, cy, 94, 124, 'ink', 1.6, 'gd' if bulkhead else 'none')
    if bulkhead: f.El(cx, cy, 90, 120, 'none', 0, 'steel')
    else: f.El(cx, cy, 80, 110, 'ink', 1.6, 'g2'); f.El(cx, cy, 70, 98, 'ink', 1.2, 'bg')
    for k in range(18): a = math.radians(k * 20); f.Ci(cx + 102 * math.sin(a), cy - 132 * math.cos(a), 5, 'ink', 1, 'cool')
for tag, bh, name in (('01_14', False, 'Frame'), ('01_15', True, 'Bulkhead')):
    f = AF(tag, f'Stressed Skin with Stringers and {name}', 760, 330, f'Cross-section of a fuselage with stressed skin panels, stringers around the inside and a {name.lower()}',
           'Skin panels are joined over the stringers, which run lengthwise around the inside of the skin. ' + ('A frame keeps the cross-section shape and carries loads into the skin.' if not bh else 'A pressure bulkhead closes the section and reacts the cabin pressure load.'))
    ring(f, 260, 165, bh)
    f.T(420, 60, 'Stressed skin panels', 10.5, 'ink', bold=True); f.L(416, 56, 340, 70, 'dim', 1)
    f.T(420, 140, 'Stringers', 10.5, 'cool', bold=True); f.L(416, 136, 360, 140, 'dim', 1)
    f.T(420, 220, name, 10.5, 'gold' if bh else 'ink', bold=True); f.L(416, 216, 336, 220, 'dim', 1)
    AFS.append(f)

f = AF('01_16', 'A Floor Crossbeam', 760, 320, 'Fuselage section with floor crossbeams, and a single crossbeam with upper and lower caps',
       'Floor crossbeams span the fuselage between frames and support the floor and its loads. Like any beam they have an upper and lower cap joined by a web; they also help tie the frame against pressurisation loads.')
f.El(200, 160, 110, 130, 'ink', 4, 'g2'); f.L(98, 200, 302, 200, 'gold', 8); f.T(200, 190, 'floor', 10, 'gold', 'middle', bold=True); f.L(200, 204, 200, 286, 'dim', 2)
f.R(400, 140, 300, 50, c='ink', sw=1.6, fill='hot', rx=0, op=0.5); f.R(400, 132, 300, 12, c='ink', sw=1.6, fill='cool', rx=0); f.R(400, 186, 300, 12, c='ink', sw=1.6, fill='cool', rx=0)
f.T(550, 120, 'Upper cap', 10.5, 'cool', 'middle', bold=True); f.T(550, 220, 'Lower cap', 10.5, 'cool', 'middle', bold=True); f.T(550, 169, 'web', 10.5, 'white', 'middle', bold=True, check=False)
f.T(550, 270, 'one crossbeam (enlarged)', 10, 'dim', 'middle')
AFS.append(f)

f = AF('01_17', 'Doublers Around a Cut-Out', 760, 320, 'Skin panel with a door cut-out surrounded by a doubler plate and edge frames',
       'Any hole in the stressed skin (door, window, hatch) interrupts the load paths. Doublers (extra layers of skin) and heavier edge members around the cut-out carry the loads round it.')
f.R(80, 40, 600, 240, c='ink', sw=1.6, fill='g2', rx=0)
for k in range(1, 6): f.L(80, 40 + k * 40, 680, 40 + k * 40, 'cool', 1)
f.R(270, 60, 220, 200, c='gold', sw=2, fill='gd', rx=24, op=0.45); f.R(310, 90, 140, 150, c='ink', sw=3, fill='bg', rx=18)
f.T(380, 170, 'door', 11, 'dim', 'middle', bold=True); f.T(560, 30, 'Doubler around cut-out', 10.5, 'gold', bold=True); f.L(556, 34, 480, 70, 'gold', 1)
f.T(80, 300, 'Stressed skin panel with stringers', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('01_18', 'Reinforced Frames at Cut-Outs', 760, 330, 'Fuselage barrel with frames and stringers, heavier reinforced frames either side of door and window cut-outs, and the floor',
       'Where large cut-outs interrupt stringers, the frames either side are made much heavier (reinforced frames) and short intercostals carry the load from the cut stringers round the opening.')
f.R(80, 50, 600, 230, c='ink', sw=1.6, fill='g2', rx=0)
for k in range(1, 7): f.L(80, 50 + k * 33, 680, 50 + k * 33, 'cool', 1.2)
for k in range(9): x = 110 + k * 70; f.L(x, 50, x, 280, 'ink', 4 if x in (250, 390) else 2)
f.R(262, 90, 116, 150, c='ink', sw=2.4, fill='bg', rx=10); f.T(320, 170, 'cut-out', 10, 'dim', 'middle')
f.T(320, 36, 'Reinforced frames (heavy) either side', 10.5, 'gold', 'middle', bold=True)
f.L(250, 40, 250, 50, 'gold', 2); f.L(390, 40, 390, 50, 'gold', 2)
f.T(80, 304, 'Frames', 10.5, 'ink', bold=True); f.T(160, 304, 'Stringers', 10.5, 'cool', bold=True); f.T(260, 304, 'Skin', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('01_19', 'Flight Deck Windscreen Construction', 760, 340, 'Front of an airliner nose with windscreen panels, and a section through a laminated heated windscreen',
       'Flight deck windscreens are laminated: toughened glass or acrylic plies bonded with vinyl interlayers. The vinyl gives strength and fail-safety and becomes more resilient when warm, so a transparent conductive heating film keeps it warm for bird-strike protection and also prevents ice and misting.')
f.P('M60,300 Q60,120 200,100 Q340,120 340,300 Z', 'ink', 2, '#c4d1d6')
f.P('M110,170 L150,140 L196,140 L196,186 L110,196 Z', 'ink', 1.6, 'sky'); f.P('M290,170 L250,140 L204,140 L204,186 L290,196 Z', 'ink', 1.6, 'sky')
f.T(200, 326, 'nose (front view)', 10, 'dim', 'middle')
for i, (t, c_, w) in enumerate((('Outer glass ply', 'cool', 14), ('Heating film', 'gold', 4), ('Vinyl interlayer', 'mag', 16), ('Structural glass ply', 'cool', 22), ('Vinyl interlayer', 'mag', 12), ('Inner glass ply', 'cool', 14))):
    y = 70 + sum([14, 4, 16, 22, 12, 14][:i]) * 2.4
    f.R(420, y, 120, w * 2.4, c='ink', sw=1, fill=c_, rx=0, op=0.85); f.T(552, y + w * 1.2 + 4, t, 10.5, c_, bold=True)
f.T(480, 50, 'outside', 10, 'dim', 'middle'); f.T(480, 300, 'inside (flight deck)', 10, 'dim', 'middle')
AFS.append(f)

# 01_20 biplane
f = AF('01_20', 'Biplane Structure', 760, 320, 'Front view of a biplane showing upper and lower mainplanes, centre section, interplane struts, flying wires and landing wires',
       'Flying wires run from the lower wing root up to the upper wing and carry the lift loads in flight. Landing wires run the other way and support the wings on the ground and on landing. Interplane struts separate the wings.')
f.L(60, 90, 700, 90, 'ink', 8); f.L(60, 210, 700, 210, 'ink', 8)
f.R(330, 90, 100, 150, c='ink', sw=1.6, fill='#c4d1d6', rx=30)
for x in (110, 650): f.L(x, 94, x, 206, 'ink', 4)
for sg in (-1, 1):
    xo = 380 + sg * 270; xi = 380 + sg * 60
    f.L(xi, 210, xo, 94, 'hot', 1.8); f.L(xi, 94, xo, 206, 'cool', 1.8)
f.T(380, 70, 'Centre section', 10.5, 'ink', 'middle', bold=True); f.T(160, 70, 'Upper mainplane', 10.5, 'ink', bold=True); f.T(160, 240, 'Lower mainplane', 10.5, 'ink', bold=True)
f.T(660, 70, 'Interplane strut', 10.5, 'ink', 'middle', bold=True)
f.T(520, 290, 'Flying wires (carry lift in flight)', 10.5, 'hot', 'middle', bold=True); f.T(240, 290, 'Landing wires', 10.5, 'cool', 'middle', bold=True)
f.L(330, 240, 330, 262, 'ink', 2); f.L(430, 240, 430, 262, 'ink', 2); f.Ci(330, 268, 7, 'ink', 1.4, 'g3'); f.Ci(430, 268, 7, 'ink', 1.4, 'g3')
AFS.append(f)

f = AF('01_21', 'Strut-Braced High-Wing Monoplane', 760, 300, 'Front view of a high-wing monoplane with wing struts from the lower fuselage to the wing',
       'A strut-braced wing transfers part of the wing bending load through the strut to the lower fuselage, allowing a lighter wing structure than a full cantilever wing, at the cost of some drag.')
f.L(60, 80, 700, 80, 'ink', 8); f.R(330, 76, 100, 130, c='ink', sw=1.6, fill='#c4d1d6', rx=30)
for sg in (-1, 1): f.L(380 + sg * 50, 190, 380 + sg * 230, 84, 'gold', 4)
f.T(160, 60, 'Wing', 10.5, 'ink', bold=True); f.T(520, 170, 'Wing strut', 10.5, 'gold', bold=True)
for x in (300, 460): f.L(x, 200, x, 240, 'ink', 3); f.Ci(x, 248, 10, 'ink', 1.4, 'g3')
AFS.append(f)

f = AF('01_22', 'Wing Loads — Bending and Twisting', 760, 320, 'Front view of an aircraft with the wing bending upward under lift, and a wing section twisting about its span',
       'In flight the lift bends the wings upward (the upper surface in compression, the lower in tension) and the aerodynamic pitching moment and aileron loads twist them. The wing box must resist both bending and torsion.')
f.P('M60,180 Q220,170 340,200 L420,200 Q540,170 700,180', 'line', 2, dash='5 4')
f.P('M60,150 Q220,170 340,200 L420,200 Q540,170 700,150', 'ink', 6); f.R(350, 180, 60, 60, c='ink', sw=1.6, fill='#c4d1d6', rx=24)
f.L(710, 180, 710, 150, 'gold', 2, me='gold'); f.T(600, 130, 'BENDING (tips rise)', 11, 'gold', 'middle', bold=True)
f.El(200, 70, 70, 16, 'cool', 2, 'none'); f.raw('<ellipse cx="200" cy="70" rx="70" ry="16" transform="rotate(-12 200 70)" fill="none" stroke="#d9533a" stroke-width="2" stroke-dasharray="5 3"/>')
f.T(200, 40, 'TWISTING (torsion)', 11, 'hot', 'middle', bold=True)
f.T(380, 290, 'upper surface in compression, lower surface in tension', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('01_23', 'Typical Spar Sections', 760, 300, 'Three spar designs: a solid I-section, a built-up spar with lightening holes in the web, and a box spar',
       'Spars carry the main wing bending loads in their caps and shear in their webs. Lightening holes save weight in lightly loaded webs; flanged holes also stiffen the web. Front and rear spars joined by skins form a torsion box.')
for i, (x, t) in enumerate(((140, 'I-section spar'), (380, 'Built-up spar, lightening holes'), (620, 'Box spar'))):
    f.R(x - 70, 60, 140, 14, c='ink', sw=1.4, fill='cool', rx=0); f.R(x - 70, 196, 140, 14, c='ink', sw=1.4, fill='cool', rx=0)
    if i < 2: f.R(x - 6, 74, 12, 122, c='ink', sw=1.4, fill='hot', rx=0) if i == 0 else f.R(x - 60, 74, 120, 122, c='ink', sw=1.4, fill='hot', rx=0, op=0.6)
    if i == 1:
        for k in range(3): f.Ci(x - 40 + k * 40, 135, 14, 'ink', 1.4, 'bg')
    if i == 2: f.R(x - 70, 74, 10, 122, c='ink', sw=1.4, fill='hot', rx=0); f.R(x + 60, 74, 10, 122, c='ink', sw=1.4, fill='hot', rx=0)
    f.T(x, 240, t, 10.5, 'ink', 'middle', bold=True)
f.T(380, 280, 'caps (blue) carry bending, webs (red) carry shear', 10.5, 'dim', 'middle')
AFS.append(f)

f = AF('01_24', 'Wing Torsion Box Structure', 760, 320, 'Wing section with front and rear spars and upper and lower skin panels with stringers forming a closed torsion box, plus leading and trailing edge structure',
       'The front spar, rear spar and the upper and lower skins form a closed box — the torsion box — which resists bending and twisting and often forms the integral fuel tank. The leading and trailing edges are lighter structures attached to it.')
f.P('M80,160 Q90,90 220,80 L520,90 Q640,110 700,160 Q640,180 520,190 L220,200 Q90,200 80,160 Z', 'ink', 2, 'g2')
f.R(220, 80, 300, 120, c='gold', sw=3, fill='gd', rx=0, op=0.4)
f.L(220, 80, 220, 200, 'hot', 6); f.L(520, 90, 520, 190, 'hot', 6)
for k in range(1, 6): x = 220 + k * 50; f.R(x - 4, 84, 8, 8, c='none', sw=0, fill='cool', rx=0); f.R(x - 4, 190, 8, 8, c='none', sw=0, fill='cool', rx=0)
f.T(220, 230, 'Front spar', 10.5, 'hot', 'middle', bold=True); f.T(520, 230, 'Rear spar', 10.5, 'hot', 'middle', bold=True)
f.T(370, 145, 'TORSION BOX', 11, 'gold', 'middle', bold=True); f.T(370, 160, '(often the fuel tank)', 9.5, 'ink', 'middle')
f.T(370, 60, 'Upper skin + stringers', 10.5, 'cool', 'middle', bold=True); f.T(120, 270, 'Leading edge', 10.5, 'ink', 'middle', bold=True); f.T(640, 270, 'Trailing edge', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('01_25', 'Tail Configurations', 760, 300, 'Rear views of conventional, T-tail, V-tail and H-tail arrangements',
       'Conventional: tailplane on the fuselage. T-tail: tailplane on top of the fin, clear of wing wake but prone to deep stall. V-tail: two surfaces combine pitch and yaw (ruddervators). H-tail: twin fins at the tailplane tips.')
def tail(x, y, kind):
    if kind in ('conv', 'H'): f.L(x - 90, y, x + 90, y, 'ink', 5)
    f.Ci(x, y + (0 if kind != 'T' else 0), 14, 'ink', 1.6, '#c4d1d6')
    if kind == 'conv': f.L(x, y - 14, x, y - 70, 'ink', 5)
    if kind == 'T': f.L(x, y - 14, x, y - 70, 'ink', 5); f.L(x - 80, y - 70, x + 80, y - 70, 'ink', 5)
    if kind == 'V': f.L(x - 10, y - 10, x - 70, y - 60, 'ink', 5); f.L(x + 10, y - 10, x + 70, y - 60, 'ink', 5)
    if kind == 'H':
        for sg in (-1, 1): f.L(x + sg * 90, y - 30, x + sg * 90, y + 20, 'ink', 5)
for i, (k, t) in enumerate((('conv', 'Conventional'), ('T', 'T-tail'), ('V', 'V-tail'), ('H', 'H-tail'))):
    x = 120 + (i % 2) * 380 + (i // 2) * 0; y = 110 + (i // 2) * 130
    tail(x + 60, y, k); f.T(x + 60, y + 44, t, 11, 'gold', 'middle', bold=True)
AFS.append(f)

f = AF('01_26', 'The Empennage', 760, 320, 'Side view of the tail with fin, rudder, tailplane (horizontal stabiliser), elevator and trim tab',
       'The empennage (tail unit) comprises the fin (vertical stabiliser) with the rudder, and the tailplane (horizontal stabiliser) with the elevators, usually with trim tabs. Like the wing, each surface is built around spars and ribs.')
f.P('M60,220 L420,200 L700,200 L700,240 L420,250 L60,250 Z', 'ink', 1.8, '#c4d1d6')
f.P('M480,200 L560,60 L640,60 L660,200 Z', 'ink', 1.8, 'g3'); f.P('M640,60 L680,60 L700,200 L660,200 Z', 'ink', 1.8, 'cool')
f.P('M460,222 L640,214 L640,230 L460,236 Z', 'ink', 1.6, 'steel'); f.P('M640,214 L700,212 L700,232 L640,230 Z', 'ink', 1.6, 'cool')
f.R(686, 216, 14, 12, c='ink', sw=1, fill='gold', rx=0)
f.T(560, 40, 'Fin', 10.5, 'ink', 'middle', bold=True); f.T(706, 130, 'Rudder', 10.5, 'cool', bold=True)
f.T(500, 280, 'Tailplane (horizontal stabiliser)', 10.5, 'ink', 'middle', bold=True); f.L(540, 268, 540, 234, 'dim', 1)
f.T(690, 300, 'Elevator', 10.5, 'cool', 'end', bold=True); f.L(670, 288, 670, 232, 'dim', 1); f.T(600, 180, 'Trim tab', 10, 'gold', 'end', bold=True)
f.L(604, 184, 686, 220, 'gold', 1)
AFS.append(f)

f = AF('01_27', 'Honeycomb Sandwich Construction', 760, 300, 'A sandwich panel with two thin facings bonded to a lightweight honeycomb core, one facing peeled back',
       'Two thin, strong facings bonded to a light honeycomb core make a panel that is very stiff for its weight — the core holds the facings apart, as the web of a beam separates its caps. Used for floors, control surfaces and fairings.')
f.P('M120,200 L520,200 L600,140 L200,140 Z', 'ink', 1.6, 'steel')
for r in range(4):
    for c in range(10):
        cx_ = 200 + c * 38 + r * 20; cy_ = 160 + r * 10
        f.P(' '.join(f'{"M" if k == 0 else "L"}{cx_ + 9 * math.cos(math.radians(60 * k)):.1f},{cy_ + 5 * math.sin(math.radians(60 * k)):.1f}' for k in range(6)) + ' Z', 'gold', 1, 'none')
f.P('M200,140 L600,140 Q640,140 640,90 L240,90 Q200,90 200,140 Z', 'ink', 1.6, '#a9bac1', op=0.9)
f.T(660, 100, 'Facing', 10.5, 'ink', bold=True); f.T(620, 170, 'Honeycomb core', 10.5, 'gold', bold=True); f.T(560, 230, 'Facing', 10.5, 'ink', bold=True)
f.T(120, 240, 'Bond line', 10.5, 'hot', bold=True); f.L(150, 230, 200, 202, 'hot', 1)
AFS.append(f)

f = AF('01_28', 'Oxidation — Growth of an Oxide Film', 760, 300, 'Oxide thickness against time rising rapidly then levelling off',
       'On aluminium the oxide film forms quickly and then stops growing, because the film itself seals the metal from the air: it is protective (and anodising thickens it deliberately). Iron oxide (rust) is porous and keeps growing.')
x0, y0, x1, y1 = 110, 40, 680, 240
axes(f, x0, y0, x1, y1, 'TIME →', 'OXIDE THICKNESS')
smooth(f, [(x0, y1), (140, 160), (200, 110), (300, 86), (450, 76), (660, 72)], 'hot', 3)
f.T(440, 64, 'film seals the surface: growth stops', 10.5, 'hot', 'middle', bold=True)
AFS.append(f)

# hydraulics basics
f = AF('02_01', 'Pressure Depends on Depth, Not Shape', 760, 320, 'Four containers of different shape filled to the same depth, each with a gauge at the bottom showing the same pressure',
       'The pressure at the bottom of a liquid depends only on its depth and density, not on the shape or volume of the container. All four gauges read the same.')
shapes = ['M60,60 L100,60 L100,230 L60,230 Z', 'M170,60 L330,60 L330,230 L170,230 Z', 'M390,60 L510,60 L460,230 L440,230 Z', 'M570,60 L640,60 L640,180 Q600,180 610,210 Q620,230 610,230 L600,230 Z']
for d, gx in zip(shapes, (80, 250, 450, 605)):
    f.P(d, 'ink', 1.6, 'fluid'); gauge(f, gx, 268, 18, 0.55)
f.L(40, 60, 720, 60, 'cool', 1.2, dash='5 4'); f.T(720, 52, 'same liquid level', 10, 'cool', 'end')
f.T(380, 310, 'same depth → same pressure on every gauge', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('02_02', 'Pascal’s Law', 760, 300, 'A force on a piston creating pressure in an enclosed fluid that acts equally in all directions',
       'Pressure applied to a confined fluid is transmitted equally and undiminished in all directions and acts at right angles to the container walls. Pressure = force ÷ area.')
f.P('M300,60 L520,60 L520,260 L300,260 L300,180 L220,180 L220,140 L300,140 Z', 'ink', 2, 'gold')
f.R(170, 142, 60, 36, c='ink', sw=1.6, fill='#a9bac1', rx=2); f.L(110, 160, 166, 160, 'hot', 3, me='hot'); f.T(110, 150, 'FORCE', 11, 'hot', bold=True)
for x, y, dx, dy in ((410, 60, 0, -1), (410, 260, 0, 1), (520, 120, 1, 0), (520, 200, 1, 0), (360, 60, 0, -1), (460, 260, 0, 1), (300, 220, -1, 0), (300, 100, -1, 0)):
    f.L(x - dx * 34, y - dy * 34, x - dx * 6, y - dy * 6, 'hot', 2.4, me='hot')
f.T(410, 165, 'PRESSURE', 13, 'black', 'middle', bold=True)
f.T(600, 150, 'equal in all', 10.5, 'ink', bold=True); f.T(600, 166, 'directions', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('02_03', 'The Bramah Press (Force Multiplication)', 760, 340, 'Two connected cylinders of different area; 1000 N on 0.002 square metres balances 2000 N on 0.004 square metres at 500 kPa',
       'Pressure is the same throughout the fluid: P = F ÷ A = 1000 ÷ 0.002 = 500 kPa. On the larger piston F = P × A = 500 000 × 0.004 = 2000 N. Force is multiplied by the area ratio — but the larger piston moves only half as far.')
f.P('M120,80 L170,80 L170,250 L560,250 L560,80 L660,80 L660,290 L120,290 Z', 'ink', 2, 'cool')
f.R(122, 100, 46, 18, c='ink', sw=1.4, fill='#a9bac1', rx=1); f.R(562, 100, 96, 18, c='ink', sw=1.4, fill='#a9bac1', rx=1)
f.R(122, 118, 46, 172, c='none', sw=0, fill='cool', rx=0); f.R(562, 118, 96, 172, c='none', sw=0, fill='cool', rx=0)
f.R(130, 74, 30, 26, c='ink', sw=1.2, fill='steel', rx=2); f.R(580, 60, 60, 40, c='ink', sw=1.2, fill='steel', rx=2)
f.T(145, 40, 'Piston A', 10.5, 'ink', 'middle', bold=True); f.T(145, 56, '0.002 m², 1000 N', 10, 'gold', 'middle', bold=True)
f.T(610, 26, 'Piston B', 10.5, 'ink', 'middle', bold=True); f.T(610, 42, '0.004 m², 2000 N', 10, 'gold', 'middle', bold=True)
f.T(380, 280, 'FLUID PRESSURE = 500 kPa everywhere', 11, 'black', 'middle', bold=True)
f.T(380, 180, 'BALANCED', 14, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('02_04', 'A Light Aircraft Braking System', 760, 320, 'Foot pedal operating a master cylinder fed from a reservoir, connected by a pipe to a slave cylinder pressing pads on a brake disc',
       'Pressing the pedal pushes piston A in the master cylinder; the pressure is transmitted through the pipe to piston B in the slave cylinder, which clamps the pads on the brake disc. The reservoir tops up the master cylinder.')
f.L(80, 60, 140, 140, 'ink', 4); f.R(60, 50, 50, 14, c='ink', sw=1.4, fill='steel', rx=3); f.T(70, 40, 'Foot pedal', 10.5, 'ink', bold=True)
f.R(140, 130, 110, 40, c='ink', sw=1.6, fill='g2', rx=3); f.R(146, 136, 20, 28, c='ink', sw=1.2, fill='#a9bac1', rx=1); f.R(166, 136, 82, 28, c='none', sw=0, fill='hot', rx=0)
f.T(195, 196, 'Master cylinder', 10.5, 'ink', 'middle', bold=True); f.T(170, 124, 'Piston A', 10, 'ink', bold=True)
f.R(200, 70, 70, 36, c='ink', sw=1.4, fill='g2', rx=3); f.R(202, 86, 66, 18, c='none', sw=0, fill='hot', rx=0); f.L(236, 106, 236, 130, 'hot', 3); f.T(280, 84, 'Fluid reservoir', 10.5, 'ink', bold=True)
line(f, [(250, 150), (300, 150), (300, 250), (560, 250), (560, 190)], 'hot', 4)
f.R(530, 120, 60, 70, c='ink', sw=1.6, fill='g2', rx=4); f.R(540, 128, 40, 40, c='ink', sw=1.2, fill='hot', rx=2)
f.R(600, 60, 16, 220, c='ink', sw=1.6, fill='steel', rx=2); f.R(586, 130, 12, 50, c='ink', sw=1.2, fill='gold', rx=1); f.R(618, 130, 12, 50, c='ink', sw=1.2, fill='gold', rx=1)
f.T(480, 106, 'Slave cylinder (piston B)', 10.5, 'ink', 'middle', bold=True); f.T(640, 290, 'Brake disc', 10.5, 'ink', bold=True)
AFS.append(f)

def basic_sys(f, x0=200, sel=2):
    reservoir(f, x0 - 45, 40); line(f, [(x0, 90), (x0, 110)], 'cool'); pump(f, x0, 126)
    line(f, [(x0, 142), (x0, 180)], 'hot'); filt(f, x0, 192, label='Pressure filter')
    return x0
f = AF('02_05', 'Basic Hydraulic System', 760, 400, 'Reservoir, pump, pressure relief valve, filter, selector valve and actuator with pressure and return lines',
       'The pump draws fluid from the reservoir and delivers it through the filter to the selector valve, which directs it to one side of the actuator while connecting the other side to return. The relief valve protects the system by returning fluid to the reservoir if pressure becomes too high.')
x0 = basic_sys(f)
line(f, [(x0, 204), (x0, 250)], 'hot'); valvebox(f, x0, 262, 60, 24, 'Selector valve')
line(f, [(x0 - 20, 274), (x0 - 20, 330), (300, 330)], 'hot'); line(f, [(x0 + 20, 274), (x0 + 20, 300), (440, 300), (440, 318)], 'cool')
actuator(f, 300, 330, 160, 26, 0.35)
line(f, [(x0, 160), (90, 160), (90, 70), (x0 - 45, 70)], 'gold', 1.8, dash='5 3'); f.R(80, 150, 20, 20, c='gold', sw=1.6, fill='g3', rx=2); f.T(90, 192, 'Relief valve', 10, 'gold', 'middle', bold=True)
line(f, [(440, 300), (560, 300), (560, 66), (x0 + 45, 66)], 'cool', 2)
f.T(600, 120, 'red: pressure', 10.5, 'hot', bold=True); f.T(600, 140, 'blue: return', 10.5, 'cool', bold=True)
AFS.append(f)

f = AF('02_06', 'Open-Centre Hydraulic System', 760, 400, 'Pump flow passing through selector valves in series and back to the reservoir when all are in neutral',
       'In an open-centre system the selector valves are in series. With all selectors in neutral, fluid circulates freely back to the reservoir at low pressure, so the pump is offloaded. Selecting a service closes its centre and pressure builds only for that service. Only one service can work at a time.')
x0 = basic_sys(f)
for i, y in enumerate((250, 320)):
    line(f, [(x0, 204 if i == 0 else 262), (x0, y - 12)], 'hot'); valvebox(f, x0, y, 60, 24, f'Selector valve {i + 1}')
    line(f, [(x0 - 30, y), (110, y)], 'dim', 1.8, dash='4 3'); f.T(100, y + 4, 'to service', 9.5, 'dim', 'end')
line(f, [(x0, 332), (x0, 370), (560, 370), (560, 66), (x0 + 45, 66)], 'cool', 2.4)
f.T(380, 362, 'neutral: flow returns to reservoir at low pressure', 10, 'cool', 'middle', bold=True)
AFS.append(f)

f = AF('02_07', 'Closed (Constant Pressure) Hydraulic System', 760, 400, 'Pump with non-return valve and accumulator keeping the pressure line charged, with selector valves in parallel feeding two actuators',
       'In a closed system the whole pressure line is kept at system pressure (the pump is offloaded by an automatic cut-out or a variable-delivery pump). Selector valves are in parallel, so several services can work at once. A non-return valve and accumulator store pressure and damp surges.')
x0 = basic_sys(f, 160)
nrv(f, x0, 220, label='NRV'); line(f, [(x0, 226), (x0, 246), (560, 246)], 'hot')
accumulator(f, 300, 210, 16)
for i, x in enumerate((420, 560)):
    line(f, [(x, 246), (x, 268)], 'hot'); valvebox(f, x, 280, 50, 24, '', 'gold')
    line(f, [(x - 14, 292), (x - 14, 330)], 'hot'); actuator(f, x - 60, 340, 90, 22, 0.4, label=None)
f.T(490, 380, 'selector valves in parallel → actuators', 10, 'ink', 'middle', bold=True)
f.T(560, 236, 'pressure line always charged', 9.5, 'hot', 'end')
AFS.append(f)

f = AF('02_08', 'Hydraulic Reservoir', 760, 360, 'Pressurised reservoir with sight glass, baffles, an anti-swirl fin, temperature sensor and a standpipe holding an emergency reserve',
       'The reservoir stores fluid and allows for expansion and leakage. It is pressurised (air or bleed) to prevent pump cavitation and foaming at altitude. Baffles and fins stop surging and swirling; a standpipe keeps a reserve for the emergency pump if the main supply leaks away.')
f.R(250, 40, 220, 280, c='ink', sw=2, fill='g2', rx=16); f.R(254, 140, 212, 176, c='none', sw=0, fill='hot', rx=12, op=0.8)
f.L(254, 140, 466, 140, 'gold', 1.4, dash='4 3'); f.T(500, 144, 'Pressurised level', 10.5, 'gold', bold=True)
f.R(470, 60, 16, 200, c='ink', sw=1.4, fill='g3', rx=6); f.R(473, 140, 10, 118, c='none', sw=0, fill='hot', rx=4); f.T(496, 80, 'Sight glass', 10.5, 'ink', bold=True)
for y in (200, 250): f.L(260, y, 400, y, 'ink', 3)
f.T(230, 220, 'Baffles', 10.5, 'ink', 'end', bold=True)
f.R(340, 260, 10, 60, c='ink', sw=1.2, fill='steel', rx=0); f.T(230, 300, 'Anti-swirl fin', 10.5, 'ink', 'end', bold=True); f.L(234, 296, 336, 290, 'dim', 1)
f.R(420, 220, 10, 100, c='ink', sw=1.2, fill='#a9bac1', rx=0); f.T(500, 226, 'Standpipe (main pump)', 10, 'ink', bold=True)
f.T(500, 242, 'reserve below it: emergency pump', 10, 'dim')
f.R(440, 290, 50, 10, c='ink', sw=1.2, fill='gold', rx=2); f.T(496, 300, 'Temperature sensor', 10, 'gold', bold=True)
f.L(300, 40, 300, 10, 'cool', 3); f.T(310, 20, 'pressurising air', 10, 'cool', bold=True)
AFS.append(f)

f = AF('02_09', 'Hydraulic Filter', 760, 340, 'Filter housing with fluid entering, passing through the filter element and leaving, with a bypass (relief) valve in the head shown closed',
       'Fluid passes from outside to inside through the filter element. If the element becomes clogged, the pressure difference opens the bypass valve so the system still gets (unfiltered) fluid; a pop-out indicator usually shows that the bypass has opened.')
f.R(200, 60, 360, 60, c='ink', sw=2, fill='g3', rx=4); f.R(260, 120, 240, 190, c='ink', sw=2, fill='g2', rx=20)
f.R(320, 130, 120, 160, c='ink', sw=1.4, fill='none', rx=4)
for y in range(140, 285, 12): f.P(f'M324,{y} L436,{y + 6}', 'hot', 1.4)
f.R(370, 66, 20, 36, c='ink', sw=1.4, fill='cool', rx=3); f.T(400, 46, 'Bypass valve (shown closed)', 10.5, 'cool', 'middle', bold=True)
f.L(100, 90, 200, 90, 'hot', 4, me='hot'); f.T(100, 80, 'IN', 12, 'hot', bold=True)
f.L(560, 90, 660, 90, 'hot', 4, me='hot'); f.T(640, 80, 'OUT', 12, 'hot', bold=True)
f.P('M240,110 L240,200 L318,200', 'hot', 1.8, me='hot'); f.P('M380,200 L380,124', 'hot', 1.8, me='hot')
f.T(600, 230, 'Filter element', 10.5, 'ink', bold=True); f.L(596, 226, 440, 220, 'dim', 1)
f.T(600, 290, 'Filter housing (bowl)', 10.5, 'ink', bold=True); f.L(596, 286, 500, 280, 'dim', 1)
f.T(140, 320, 'flow: outside → inside the element', 10, 'dim')
AFS.append(f)

if __name__ == '__main__':
    gallery(AFS, 'Airframes Gallery 1', 'Airframes — Structures & Hydraulic Principles', 'Original figures for airframe structures and hydraulic basics.', 'af1-gallery.html')
    print(len(AFS), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
