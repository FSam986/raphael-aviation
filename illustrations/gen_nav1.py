#!/usr/bin/env python3
"""General Navigation part 1: the Earth, great circles, convergency, magnetism, slide rule, time — 26 figures."""
import math
from figlib import *
from gen_common import note, gallery, pl

NV = []
def globe(f, cx, cy, R, par=(-60, -30, 0, 30, 60), mer=(0.33, 0.66, 1.0), fill='g3'):
    f.Ci(cx, cy, R, 'ink', 2, fill)
    for la in par:
        y = cy - R * math.sin(math.radians(la)); w = R * math.cos(math.radians(la))
        f.El(cx, y, w, w * 0.16, 'cool' if la == 0 else 'line', 1.6 if la == 0 else 1)
    for k in mer: f.El(cx, cy, R * k, R, 'line', 1)
    f.L(cx, cy - R, cx, cy + R, 'line', 1)
def ang(f, cx, cy, r, a0, a1, c='gold', sw=1.6, me=None):
    p, q = pol(cx, cy, r, a0), pol(cx, cy, r, a1)
    f.P(f'M{p[0]:.1f},{p[1]:.1f} A{r},{r} 0 {1 if abs(a1-a0) > 180 else 0} {1 if a1 > a0 else 0} {q[0]:.1f},{q[1]:.1f}', c, sw, me=me)
def N(tag, title, W, H, aria, cap): return Fig('nav_' + tag, title, W, H, aria, cap)

# 1 latitude
f = N('016_figure_02', 'Latitude — Angle from the Equator', 760, 340, 'A section of the Earth with the angle at the centre between the equator and a point at forty degrees north',
    '<b>Latitude</b> is the angular distance of a place <b>north or south of the equator</b>, measured at the centre of the Earth along the meridian through the place, from <b>0° at the equator to 90° at the poles</b>. All points with the same latitude lie on a <b>parallel of latitude</b>, a small circle parallel to the equator (the equator itself is the only parallel that is a great circle). One degree of latitude is <b>60 nautical miles</b> everywhere, and one minute is one nautical mile — which is why distance is always measured on the latitude scale at the side of a chart.')
cx, cy, R = 240, 170, 130
f.Ci(cx, cy, R, 'ink', 2, 'g3'); f.L(cx - R - 20, cy, cx + R + 20, cy, 'cool', 1.8); f.L(cx, cy - R - 16, cx, cy + R + 16, 'ink', 1.4)
A = pol(cx, cy, R, 50); f.L(cx, cy, A[0], A[1], 'hot', 2.4); f.L(cx, cy, cx + R, cy, 'hot', 2.4); f.Ci(A[0], A[1], 5, 'hot', 1, 'hot')
ang(f, cx, cy, 44, 90, 50, 'gold', 2); f.T(cx + 52, cy - 18, '40°', 11, 'gold', bold=True)
ang(f, cx, cy, R + 12, 90, 52, 'gold', 1.8, me='gold')
f.T(A[0] + 12, A[1] - 6, 'A: latitude 40°N', 10.5, 'hot', bold=True)
f.T(cx, cy - R - 22, 'N', 11, 'ink', 'middle', bold=True); f.T(cx, cy + R + 30, 'S', 11, 'ink', 'middle', bold=True)
f.T(cx - R - 26, cy + 4, 'W', 11, 'ink', 'end', bold=True); f.T(cx + R + 26, cy + 4, 'E', 11, 'ink', bold=True)
f.T(cx - 70, cy + 18, 'equator (0°)', 10, 'cool')
note(f, 480, 80, ['Measured at the centre of the Earth,', 'along the meridian, from the equator.'], first='ink')
note(f, 480, 140, ['0° at the equator', '90° at the poles'], first='gold')
note(f, 480, 200, ['1° of latitude = 60 nm', "1' of latitude = 1 nm"], first='cool')
NV.append(f)

# 2 projection principle
f = N('290_figure_01', 'Map Projection — The Light-Source Principle', 760, 340, 'A model globe with a light inside casting points on its surface onto a flat sheet of paper',
    '<b>A chart is a projection of the curved Earth onto a flat surface.</b> Imagine a transparent model of the Earth — the <b>reduced Earth</b> — with a light inside it. Features on the globe cast shadows onto a sheet of paper, and where they fall becomes the chart. The paper may be flat (<b>azimuthal</b>, as here), rolled into a <b>cylinder</b> (Mercator) or a <b>cone</b> (Lambert). No projection can be perfect: a sphere cannot be flattened without distortion, so each chart preserves some properties — shape (<b>conformality</b>), bearing, scale, area — at the expense of others. Navigation charts are chosen to be <b>conformal</b>: angles on the chart equal angles on the Earth.')
cx, cy, R = 250, 150, 96
globe(f, cx, cy, R)
poly(f, [(60, 300), (460, 300), (520, 252), (120, 252)], fill='cool', c='cool', sw=1.2, op=0.2); f.T(470, 316, 'flat sheet of paper (the chart)', 10, 'cool')
f.Ci(cx, cy - R + 8, 7, 'gold', 1, 'gold'); f.T(cx + 14, cy - R - 4, 'light source', 10, 'gold', bold=True)
for (px_, py_, lab) in ((cx - 50, cy + 36, 'A'), (cx + 44, cy + 20, 'B')):
    f.Ci(px_, py_, 4, 'hot', 1, 'hot'); f.T(px_ - 8, py_ - 6, lab, 10.5, 'hot', 'end', bold=True)
    sx, sy = cx, cy - R + 8; k = (276 - sy) / (py_ - sy); qx = sx + (px_ - sx) * k
    f.L(sx, sy, qx, 276, 'gold', 1.4, dash='5 4'); f.Ci(qx, 276, 4, 'hot', 1, 'hot'); f.T(qx, 294, lab + "'", 10.5, 'hot', 'middle', bold=True)
f.T(cx - R - 10, cy - 40, 'reduced Earth', 10, 'ink', 'end')
note(f, 540, 60, ['Three families', 'azimuthal: flat sheet', 'cylindrical: Mercator', 'conical: Lambert'], first='ink')
note(f, 540, 150, ['No chart is perfect', 'a sphere cannot be', 'flattened without', 'distortion.'], first='hot')
NV.append(f)

# 3 Lambert standard parallels
f = N('357_figure_01', 'Lambert Conformal Chart — Standard Parallels', 760, 330, 'A fan-shaped Lambert chart with two standard parallels and the parallel of origin between them',
    '<b>The Lambert chart is a cone that cuts the Earth along two parallels.</b> Those two are the <b>standard parallels</b>, where the scale is <b>exactly correct</b>. <b>Between</b> them the scale is slightly <b>too small</b> (contracted), least of all at the <b>parallel of origin</b> midway between; <b>outside</b> them it is slightly too large (expanded). The rule of thumb is to place the standard parallels at <b>one-sixth and five-sixths</b> of the chart’s latitude spread, which keeps the scale error under about 1%. Meridians are straight lines converging on the pole; parallels are arcs of concentric circles.')
ap = (380, -260)
def arc(r, c_, sw, dash=None):
    a, b = pol(ap[0], ap[1], r, 152), pol(ap[0], ap[1], r, 208)
    f.P(f'M{a[0]:.1f},{a[1]:.1f} A{r},{r} 0 0 1 {b[0]:.1f},{b[1]:.1f}', c_, sw, dash=dash)
for r, c_, sw, d in ((330, 'ink', 1.6, None), (380, 'hot', 2.6, None), (440, 'gold', 1.6, '6 4'), (500, 'hot', 2.6, None), (550, 'ink', 1.6, None)): arc(r, c_, sw, d)
for a in (152, 166, 180, 194, 208): p, q = pol(ap[0], ap[1], 330, a), pol(ap[0], ap[1], 550, a); f.L(p[0], p[1], q[0], q[1], 'line', 1)
f.T(600, 84, 'standard parallel:', 10, 'hot', bold=True); f.T(600, 98, 'scale correct', 10, 'hot', bold=True); f.T(630, 196, 'standard parallel:', 10, 'hot', bold=True); f.T(630, 210, 'scale correct', 10, 'hot', bold=True)
f.T(380, 174, 'parallel of origin: scale least', 10, 'gold', 'middle', bold=True)
f.T(380, 110, 'scale contracted between', 9.5, 'dim', 'middle'); f.T(380, 60, 'scale expanded outside', 9.5, 'dim', 'middle'); f.T(380, 276, 'scale expanded outside', 9.5, 'dim', 'middle')
f.T(380, 314, 'Standard parallels at 1/6 and 5/6 of the latitude spread keep scale error below about 1%.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 4 drift across current
f = N('132_figure_01', 'Relative Motion — Crossing a Current', 760, 330, 'A boat aiming straight across a river from A to B while the current flows across its path',
    '<b>The classic relative-velocity problem.</b> A boat must cross a river 10 nm wide from A to B, directly opposite, and the water is flowing sideways at 5 kt. If the boat simply points at B, the moving water carries it downstream and it lands somewhere else. The boat’s motion <b>through the water</b> and the water’s motion <b>over the ground</b> add together as vectors — exactly as an aircraft’s heading and true airspeed combine with the wind to give its track and ground speed. To arrive at B the boat must point <b>upstream</b>, into the current, just as an aircraft heads into wind to hold a track.')
f.R(120, 70, 420, 200, c='none', sw=0, fill=SEA, rx=0); f.L(100, 70, 560, 70, 'ink', 1.8); f.L(100, 270, 560, 270, 'ink', 1.8)
f.Ci(330, 270, 6, 'ink', 1, 'ink'); f.T(330, 296, 'A (start)', 11, 'ink', 'middle', bold=True); f.Ci(330, 70, 6, 'ink', 1, 'ink'); f.T(330, 56, 'B (destination)', 11, 'ink', 'middle', bold=True)
f.L(330, 264, 330, 78, 'gold', 2, dash='7 5', me='gold'); f.T(340, 170, '10 nm', 11, 'gold', bold=True)
for y in (110, 150, 190, 230): f.P(f'M150,{y} q14,-8 28,0 t28,0 t28,0 t28,0', 'white', 1.6, op=0.5)
f.L(160, 250, 250, 250, 'cool', 2.6, me='cool'); f.T(205, 240, 'current 5 kt', 10.5, 'white', 'middle', bold=True, check=False)
f.P('M330,264 L440,78', 'hot', 2.2, me='hot'); f.T(452, 120, 'where the boat goes', 10, 'hot', bold=True); f.T(452, 134, 'if it points at B', 10, 'hot')
note(f, 590, 90, ['Like an aircraft:', 'boat speed = TAS', 'current = wind', 'path = track'], first='ink')
f.T(380, 320, 'Movement through the water plus movement of the water = movement over the ground.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 5 nav computer
f = N('085_figure_03', 'The Navigation Computer — Circular Slide Rule', 760, 350, 'A generic circular slide rule with a fixed outer scale, a rotating inner scale and the unit index marks',
    '<b>The calculator side of the navigation computer.</b> It is a circular slide rule: a <b>fixed outer scale</b> and a <b>rotating inner scale</b>, both logarithmic, so setting one number against another performs multiplication or division. By convention <b>distance or fuel goes on the outer scale and time on the inner</b>. The black triangular <b>60 index</b> on the inner scale is the “per hour” mark: put it against the speed on the outer scale and every time on the inner scale lies opposite the distance flown. The scales carry no decimal point — the user supplies it — so always make a rough mental estimate first. Extra windows convert units and solve true airspeed and density altitude.')
cx, cy = 230, 175
f.Ci(cx, cy, 150, 'ink', 2.2, 'g3'); f.Ci(cx, cy, 118, 'gold', 2, 'g2'); f.Ci(cx, cy, 70, 'line', 1.4, 'bg')
vals = (10, 12, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90)
for v in range(10, 100):
    a = 360 * math.log10(v / 10.0)
    big = v in vals
    p, q = pol(cx, cy, 150, a), pol(cx, cy, 150 - (12 if big else 6), a); f.L(p[0], p[1], q[0], q[1], 'ink', 1.6 if big else 0.7)
    p, q = pol(cx, cy, 118, a + 36), pol(cx, cy, 118 - (10 if big else 5), a + 36); f.L(p[0], p[1], q[0], q[1], 'gold', 1.6 if big else 0.7)
for v in vals:
    a = 360 * math.log10(v / 10.0)
    x, y = pol(cx, cy, 130, a); f.T(x, y + 3.5, str(v), 9, 'ink', 'middle', bold=True, check=False)
    x, y = pol(cx, cy, 98, a + 36); f.T(x, y + 3.5, str(v), 8.5, 'gold', 'middle', check=False)
a60 = 360 * math.log10(6) + 36; t = pol(cx, cy, 118, a60); u = pol(cx, cy, 104, a60 - 5); w = pol(cx, cy, 104, a60 + 5)
f.P(f'M{t[0]:.1f},{t[1]:.1f} L{u[0]:.1f},{u[1]:.1f} L{w[0]:.1f},{w[1]:.1f} Z', 'ink', 1, 'white')
f.T(cx, cy - 6, 'windows:', 9, 'dim', 'middle'); f.T(cx, cy + 8, 'TAS, altitude', 9, 'dim', 'middle')
f.badge(418, 70, 1); f.badge(418, 130, 2); f.badge(418, 190, 3)
for y, a, b in ((70, 'Outer scale (fixed)', 'distance, fuel, speed'), (130, 'Inner scale (rotates)', 'time, in minutes'), (190, '60 index (triangle)', 'the “per hour” mark: set it against the speed')):
    f.T(436, y - 1, a, 11, 'ink', bold=True); f.T(436, y + 13, b, 9.5)
f.R(410, 230, 320, 70, c='gold', sw=1.4, fill='g2'); f.T(570, 254, 'Example: 120 kt', 11, 'gold', 'middle', bold=True)
f.T(570, 272, 'set the 60 index against 12 (= 120 kt);', 9.5, 'dim', 'middle'); f.T(570, 286, 'opposite 25 min read 50 nm', 9.5, 'dim', 'middle')
f.T(570, 326, 'No decimal points: estimate the answer first.', 10, 'ink', 'middle', bold=True)
NV.append(f)

# 6 1-in-60
f = N('198_figure_01', 'The 1-in-60 Rule', 760, 320, 'A long thin right-angled triangle sixty units long and eight units high with the small angle marked',
    '<b>A quick way to turn distance off track into an angle.</b> In a long, thin triangle, <b>1 nm off track after 60 nm is 1° of track error</b> (because the tangent of a small angle is close to the angle divided by 60). So: <b>track error (°) = distance off track × 60 ÷ distance gone</b>. In the figure, 8 nm off track after 60 nm is 8°; 4 nm off after 30 nm is also 8°. The rule is accurate enough for practical navigation up to about 20°. It is used for track corrections, for judging VOR and NDB off-track distances, and for descent gradients.')
f.P('M80,230 L620,230 L620,158 Z', 'gold', 2.4, 'g3'); f.R(606, 216, 14, 14, c='ink', sw=1.2, fill='none', rx=0)
f.T(350, 256, 'distance gone: 60 nm', 11, 'ink', 'middle', bold=True); f.T(632, 198, 'off track:', 10.5, 'hot', bold=True); f.T(632, 213, '8 nm', 11, 'hot', bold=True)
ang(f, 80, 230, 110, 90, 82.4, 'cool', 2); f.T(200, 222, '8°', 11.5, 'cool', bold=True)
f.T(330, 180, 'track made good', 10, 'dim', 'middle'); f.T(80, 250, 'start', 9.5, 'dim', 'middle')
f.R(150, 40, 460, 56, c='gold', sw=1.6, fill='g2'); f.T(380, 64, 'track error (°) = distance off × 60 / distance gone', 12, 'gold', 'middle', bold=True); f.T(380, 84, '8 × 60 / 60 = 8°', 10.5, 'dim', 'middle')
f.T(380, 296, '1 nm off track in 60 nm = 1°.  Good to about 20°.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 7 direction on the Earth
f = N('010_figure_01', 'Direction on the Earth', 760, 340, 'A globe turning from west to east about its polar axis, and a compass rose with cardinal and intercardinal points',
    '<b>Direction is defined by the Earth’s rotation.</b> The Earth spins about an axis through the <b>geographic (true) poles</b>. The direction in which it turns is <b>east</b>; the opposite is west; towards the North Pole along a meridian is <b>true north</b>. Direction is measured <b>clockwise from north</b> through 360° and always given as three figures: east is 090°, south 180°, west 270°, north 360° (or 000°). The four cardinal points are N, E, S and W; the intercardinal (quadrantal) points are NE 045°, SE 135°, SW 225° and NW 315°.')
globe(f, 190, 165, 110); f.L(190, 30, 190, 300, 'hot', 1.6, dash='8 4')
f.T(190, 22, 'North Pole', 10.5, 'ink', 'middle', bold=True); f.T(190, 318, 'South Pole', 10.5, 'ink', 'middle', bold=True)
f.P('M110,196 Q190,226 270,196', 'gold', 2.4, me='gold'); f.T(190, 240, 'rotation: west to east', 10, 'gold', 'middle', bold=True)
f.T(68, 170, 'West', 10.5, 'ink', 'end'); f.T(312, 170, 'East', 10.5, 'ink')
cx, cy = 560, 165
f.Ci(cx, cy, 108, 'ink', 1.8, 'g3')
for a, lab, deg in ((0, 'N', '360°'), (45, 'NE', '045°'), (90, 'E', '090°'), (135, 'SE', '135°'), (180, 'S', '180°'), (225, 'SW', '225°'), (270, 'W', '270°'), (315, 'NW', '315°')):
    big = a % 90 == 0; t = pol(cx, cy, 78 if big else 54, a); l_, r_ = pol(cx, cy, 12, a - 90), pol(cx, cy, 12, a + 90)
    f.P(f'M{t[0]:.1f},{t[1]:.1f} L{l_[0]:.1f},{l_[1]:.1f} L{r_[0]:.1f},{r_[1]:.1f} Z', 'ink', 1, 'gold' if big else 'steel')
    x, y = pol(cx, cy, 92, a); f.T(x, y + 4, lab, 11 if big else 9.5, 'ink', 'middle', bold=big, check=False)
    x, y = pol(cx, cy, 126, a); f.T(x, y + 4, deg, 9, 'dim', 'middle')
f.T(380, 334, 'Direction is measured clockwise from north, 000° to 360°, always as three figures.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 8 graticule
f = N('015_figure_01', 'The Graticule — Parallels & Meridians', 760, 340, 'A globe with parallels of latitude running east to west and meridians running pole to pole',
    '<b>The grid that fixes position.</b> <b>Meridians</b> are semi-great circles joining the poles; they run true north–south and are used to measure <b>longitude</b>. A meridian and its <b>anti-meridian</b> on the far side together make a complete great circle. <b>Parallels of latitude</b> are circles parallel to the equator; they run true east–west and are used to measure <b>latitude</b>. Parallels are <b>small circles</b>, except the <b>equator</b>, which is a great circle. Meridians and parallels cross at right angles everywhere. Together the network is the <b>graticule</b>, and a position is given as latitude first, then longitude.')
globe(f, 250, 170, 130, par=(-60, -30, 0, 30, 60), mer=(0.3, 0.6, 0.86))
f.T(250, 28, 'North Pole', 10.5, 'ink', 'middle', bold=True); f.T(250, 322, 'South Pole', 10.5, 'ink', 'middle', bold=True)
f.L(470, 80, 340, 104, 'dim', 1); f.L(470, 80, 362, 140, 'dim', 1); f.T(476, 76, 'parallels of latitude', 10.5, 'cool', bold=True); f.T(476, 91, 'small circles, east–west', 9.5)
f.L(470, 170, 381, 170, 'dim', 1); f.T(476, 166, 'equator', 10.5, 'cool', bold=True); f.T(476, 181, 'the only parallel that is a great circle', 9.5)
f.L(470, 250, 330, 230, 'dim', 1); f.L(470, 250, 290, 250, 'dim', 1); f.T(476, 246, 'meridians', 10.5, 'gold', bold=True); f.T(476, 261, 'semi-great circles, pole to pole', 9.5)
f.El(250, 170, 78, 130, 'gold', 2)
f.T(580, 316, 'Position: latitude first, then longitude.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 9 geocentric vs geodetic
f = N('017_figure_01', 'Geocentric vs Geodetic Latitude', 760, 340, 'A flattened ellipse representing the Earth with one line from a surface point to the centre and another perpendicular to the surface',
    '<b>The Earth is slightly flattened</b> — an <b>oblate spheroid</b>, with the polar diameter about 43 km (23 nm) shorter than the equatorial, a compression of about 1/298. This gives two ways to define latitude. <b>Geocentric</b> latitude is the angle at the <b>centre</b> of the Earth between the equatorial plane and the line to the point. <b>Geodetic (geographic)</b> latitude is the angle between the equatorial plane and the <b>normal</b> — the line perpendicular to the surface at the point — and is the one used on charts. They agree at the equator and the poles and differ most, by about <b>11.6 minutes</b>, at <b>45°</b> latitude. For most navigation the Earth is treated as a perfect sphere.')
cx, cy, a, b = 280, 180, 200, 130
f.El(cx, cy, a, b, 'ink', 2, 'g3'); f.L(cx - a - 20, cy, cx + a + 20, cy, 'cool', 1.6); f.L(cx, cy - b - 16, cx, cy + b + 16, 'ink', 1.2)
t = math.radians(52); P = (cx + a * math.cos(t), cy - b * math.sin(t))
nx, ny = math.cos(t) / a, math.sin(t) / b; L_ = math.hypot(nx, ny); nx, ny = nx / L_, ny / L_
f.L(cx, cy, P[0], P[1], 'hot', 2.2)
k = (P[1] - cy) / ny; Q = (P[0] - nx * k, cy)
f.L(Q[0], Q[1], P[0] + nx * 40, P[1] - ny * 40, 'gold', 2.2); f.Ci(P[0], P[1], 5, 'ink', 1, 'ink')
f.L(P[0] - ny * 46, P[1] - nx * 46, P[0] + ny * 46, P[1] + nx * 46, 'dim', 1.4)
f.T(cx - 8, cy - b - 22, 'NP', 10.5, 'ink', 'end', bold=True); f.T(cx - 8, cy + b + 14, 'SP', 10.5, 'ink', 'end', bold=True); f.T(cx - a + 14, cy - 8, 'equator', 10, 'cool')
f.T(P[0] + 48, P[1] - 30, 'tangent to the surface', 9.5, 'dim')
f.T(cx - 16, cy + 22, 'centre', 9.5, 'dim', 'end')
note(f, 540, 70, ['GEOCENTRIC latitude', 'angle at the centre', 'of the Earth'], first='hot')
note(f, 540, 150, ['GEODETIC latitude', 'angle of the normal', '(perpendicular to the', 'surface): used on charts'], first='gold')
note(f, 540, 250, ['Maximum difference', "about 11.6' at 45°"], first='ink')
f.T(420, 334, 'flattening exaggerated', 9, 'faint', 'middle')
NV.append(f)

# 10 longitude
f = N('018_figure_02', 'Longitude — East & West of Greenwich', 760, 340, 'A view from above the North Pole with the Greenwich meridian, the 180 degree meridian and a point B measured east of Greenwich',
    '<b>Longitude</b> is the angular distance <b>east or west of the Prime (Greenwich) Meridian</b>, measured along the equator — or, equivalently, as the angle at the pole between the Greenwich meridian and the meridian through the place — from <b>0° to 180°</b> east or west. The <b>180° meridian</b> is the anti-meridian of Greenwich. Unlike latitude, a degree of longitude is <b>not a constant distance</b>: it is 60 nm at the equator but shrinks towards the poles, in proportion to the cosine of the latitude. That shrinking distance is the <b>departure</b>: departure (nm) = change of longitude (minutes) × cos latitude.')
cx, cy, R = 240, 172, 130
f.Ci(cx, cy, R, 'cool', 2, 'g3'); f.T(cx, cy - R - 8, 'equator (seen from above the pole)', 9.5, 'cool', 'middle')
f.L(cx, cy, cx, cy + R, 'ink', 2.2); f.L(cx, cy, cx, cy - R, 'hot', 1.6, dash='6 4')
B = pol(cx, cy, R, 130); f.L(cx, cy, B[0], B[1], 'hot', 2.2); f.Ci(B[0] * 0.55 + cx * 0.45, B[1] * 0.55 + cy * 0.45, 5, 'hot', 1, 'hot')
ang(f, cx, cy, 50, 180, 130, 'gold', 2, me='gold'); f.T(cx - 12, cy + 62, 'longitude of B', 10, 'gold', 'end', bold=True)
f.Ci(cx, cy, 5, 'ink', 1, 'ink'); f.T(cx - 10, cy - 8, 'N Pole', 10.5, 'ink', 'end', bold=True)
f.T(cx, cy + R + 18, '0° Greenwich', 10.5, 'ink', 'middle', bold=True); f.T(cx + 10, cy - R + 24, '180° meridian', 10, 'hot')
f.T(B[0] + 12, B[1] + 18, 'meridian of B', 10, 'hot', bold=True)
ang(f, cx, cy, R + 18, 200, 240, 'ink', 1.6, me='ink'); f.T(cx - R - 30, cy + 84, 'WEST', 10.5, 'ink', 'end', bold=True)
ang(f, cx, cy, R + 18, 160, 120, 'ink', 1.6, me='ink'); f.T(cx + R + 30, cy + 84, 'EAST', 10.5, 'ink', bold=True)
note(f, 500, 80, ['Measured east or west of', 'Greenwich, 0° to 180°.'], first='ink')
note(f, 500, 150, ['1° of longitude', '= 60 nm at the equator,', 'less towards the poles.'], first='gold')
note(f, 500, 240, ['Departure (nm) =', "ch.long (') × cos latitude"], first='cool')
NV.append(f)

# 11 great circle
f = N('013_figure_01', 'Great Circle — The Shortest Distance', 760, 340, 'A globe cut by a plane through its centre, giving a great circle, with the shorter arc between two points marked',
    '<b>A great circle is a circle on the surface whose plane passes through the centre of the Earth.</b> It is the largest circle that can be drawn on a sphere, and it divides it into two equal halves. Only <b>one</b> great circle can be drawn through any two points (unless they are exactly opposite each other), and the <b>shorter arc of it is the shortest distance</b> between them. The equator and all meridians are great circles. A <b>small circle</b> is any circle whose plane does <b>not</b> pass through the centre — every parallel of latitude except the equator. A great circle generally crosses successive meridians at a <b>changing angle</b>, so its track direction changes along the route.')
cx, cy, R = 240, 170, 130
globe(f, cx, cy, R, par=(0,), mer=(0.5,))
f.raw(f'<ellipse cx="{cx}" cy="{cy}" rx="{R}" ry="42" transform="rotate(-28 {cx} {cy})" fill="{col("hot")}" opacity=".28" stroke="{col("hot")}" stroke-width="2.4"/>')
f.Ci(cx, cy, 4, 'ink', 1, 'ink'); f.T(cx + 8, cy + 16, 'centre of the Earth', 9.5, 'dim')
A, B = (cx + 14, cy + 28), (cx + 84, cy - 6); f.Ci(A[0], A[1], 5, 'ink', 1, 'white'); f.Ci(B[0], B[1], 5, 'ink', 1, 'white')
f.T(A[0] - 8, A[1] + 16, 'A', 11, 'ink', 'end', bold=True); f.T(B[0] + 8, B[1] - 8, 'B', 11, 'ink', bold=True)
f.L(470, 110, B[0] - 20, B[1] + 14, 'dim', 1); f.T(476, 106, 'shortest distance A to B:', 10.5, 'gold', bold=True); f.T(476, 121, 'the shorter arc of the great circle', 9.5)
note(f, 476, 170, ['Great circle', 'plane passes through the', 'centre of the Earth'], first='hot')
note(f, 476, 250, ['Small circle', 'plane does NOT pass', 'through the centre'], first='cool')
f.T(240, 326, 'the great-circle plane cuts the globe in half', 9.5, 'dim', 'middle')
NV.append(f)

# 12 vertex
f = N('022_figure_01', 'Great-Circle Vertex', 760, 340, 'A globe with an inclined great circle, its northern and southern vertices and the two points where it crosses the equator',
    '<b>The vertex is the highest latitude a great circle reaches.</b> Every great circle (other than the equator and the meridians) has a <b>northern vertex</b> and a <b>southern vertex</b>, at equal and opposite latitudes and exactly 180° of longitude apart. At the vertex the great circle is travelling due <b>east or west</b> (090° or 270°): it has stopped climbing in latitude and is about to descend. It <b>crosses the equator</b> at two points 90° of longitude from the vertices, and the angle at which it crosses the equator equals the latitude of the vertex. Here the vertices are at 63°N and 63°S, so the track cuts the equator at 63°.')
cx, cy, R = 250, 172, 130
globe(f, cx, cy, R, par=(0,), mer=())
f.raw(f'<ellipse cx="{cx}" cy="{cy}" rx="{R}" ry="52" transform="rotate(-38 {cx} {cy})" fill="{col("hot")}" opacity=".22" stroke="{col("hot")}" stroke-width="2.4"/>')
nv = (cx + R * math.cos(math.radians(38)), cy - R * math.sin(math.radians(38))); sv = (2 * cx - nv[0], 2 * cy - nv[1])
for p, lab, dx in ((nv, 'northern vertex: 63°N', 14), (sv, 'southern vertex: 63°S', -14)):
    f.Ci(p[0], p[1], 5, 'gold', 1, 'gold'); f.T(p[0] + dx, p[1] - 8 if dx > 0 else p[1] + 20, lab, 10.5, 'gold', 'start' if dx > 0 else 'end', bold=True)
for dx in (-66, 66): f.Ci(cx + dx, cy, 5, 'cool', 1, 'cool')
f.T(cx - 66, cy + 22, 'crosses the equator', 9.5, 'cool', 'middle')
ang(f, cx + 66, cy, 30, 90, 52, 'ink', 1.4); f.T(cx + 104, cy - 12, '63°', 10, 'ink', bold=True)
note(f, 520, 90, ['At the vertex', 'track is 090° or 270°:', 'highest latitude reached'], first='gold')
note(f, 520, 180, ['At the equator', 'crossing angle =', 'latitude of the vertex'], first='cool')
note(f, 520, 270, ['Vertices are 180° of', 'longitude apart.'], first='ink')
NV.append(f)

# 13 GC vs RL polar
f = N('030_figure_01', 'Great Circle vs Rhumb Line — Polar View', 760, 340, 'A view from above the North Pole with two places at the same latitude, the rhumb line following the parallel and the great circle cutting closer to the pole',
    '<b>Two ways to fly between the same two places.</b> A <b>rhumb line</b> crosses every meridian at the <b>same angle</b>, so it has a <b>constant true direction</b> — easy to fly, but it is not the shortest route. Between two places on the same parallel it simply follows the parallel. The <b>great circle</b> is the <b>shortest</b> route, but its direction <b>changes continuously</b>, and it always lies on the <b>polar side</b> of the rhumb line. The difference in distance is small at low latitudes and over short legs, and largest at high latitudes over long east–west legs — which is why long-haul routes between northern cities arc up over the Arctic.')
cx, cy = 250, 170
f.Ci(cx, cy, 140, 'cool', 1.8, 'g3')
for r in (46, 93): f.Ci(cx, cy, r, 'line', 1)
for a in range(0, 360, 30): p = pol(cx, cy, 140, a); f.L(cx, cy, p[0], p[1], 'line', 1)
A, B = pol(cx, cy, 93, 250), pol(cx, cy, 93, 110)
ang(f, cx, cy, 93, 250, 110, 'hot', 2.8); f.L(A[0], A[1], B[0], B[1], 'gold', 2.8)
for p, lab, an in ((A, 'A', 'end'), (B, 'B', 'start')): f.Ci(p[0], p[1], 5, 'ink', 1, 'white'); f.T(p[0] + (-10 if an == 'end' else 10), p[1] + 16, lab, 11, 'ink', an, bold=True)
f.Ci(cx, cy, 4, 'ink', 1, 'ink'); f.T(cx, cy - 10, 'N Pole', 10, 'ink', 'middle', bold=True)
f.T(cx, cy + 50, 'great circle (straight)', 10, 'gold', 'middle', bold=True); f.T(cx, cy + 118, 'rhumb line (along the parallel)', 10, 'hot', 'middle', bold=True)
note(f, 500, 80, ['Rhumb line', 'constant true direction;', 'longer'], first='hot')
note(f, 500, 160, ['Great circle', 'shortest distance;', 'direction keeps changing;', 'lies on the polar side'], first='gold')
f.T(250, 330, 'viewed from above the North Pole', 9.5, 'faint', 'middle')
NV.append(f)

# 14 GC bulges to nearer pole
f = N('034_figure_01', 'The Great Circle Lies on the Polar Side of the Rhumb Line', 760, 340, 'Two diagrams, one for each hemisphere, with a straight rhumb line and a great circle curving towards the nearer pole',
    '<b>On a chart where the rhumb line is straight, the great circle curves towards the nearer pole.</b> In the <b>Northern Hemisphere</b> the great circle bows <b>north</b> of the rhumb line; flying east along it the track starts <b>less than 090°</b> (about 060° here), reaches 090° at the mid-point and ends more than 090° — the track <b>increases</b> eastbound. In the <b>Southern Hemisphere</b> the great circle bows <b>south</b>, and eastbound the track <b>decreases</b>. The initial and final great-circle tracks differ from the rhumb line by the <b>conversion angle</b>. Memory aid: the great circle is always nearer the pole; the rhumb line nearer the equator.')
f.L(60, 170, 520, 170, 'cool', 1.6); f.T(290, 164, 'equator', 9.5, 'cool', 'middle')
for yb, sgn, hemi in ((110, -1, 'NORTHERN HEMISPHERE'), (230, 1, 'SOUTHERN HEMISPHERE')):
    f.L(130, yb, 450, yb, 'hot', 3); f.P(f'M130,{yb} Q290,{yb + sgn * 110} 450,{yb}', 'green', 3)
    f.T(290, yb - sgn * 16 + 4, 'rhumb line', 10, 'hot', 'middle', bold=True); f.T(290, yb + sgn * 66 + 4, 'great circle', 10, 'green', 'middle', bold=True)
    f.T(560, yb + sgn * 30, hemi, 10.5, 'ink', bold=True)
    f.T(560, yb + sgn * 30 + 15, 'great circle on the ' + ('north' if sgn < 0 else 'south') + ' side', 9.5)
    f.T(118, yb + sgn * 22 + 4, '060°' if sgn < 0 else '120°', 9.5, 'green', 'end'); f.T(462, yb + sgn * 22 + 4, '120°' if sgn < 0 else '060°', 9.5, 'green')
    f.T(118, yb - sgn * 12 + 4, '090°', 9.5, 'hot', 'end')
f.T(380, 326, 'Eastbound: great-circle track increases in the Northern Hemisphere and decreases in the Southern.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 15 meridians converge
f = N('246_figure_01', 'Meridians Converge Towards the Pole', 760, 340, 'A globe with two meridians that are parallel at the equator and meet at the North Pole',
    '<b>Two meridians are parallel at the equator and meet at the pole.</b> The angle between them — their inclination to one another — is the <b>convergency</b>. It is <b>zero at the equator</b>, where the meridians are parallel, and reaches its <b>maximum, equal to the change of longitude</b>, at the poles. In between it grows with the sine of the latitude: <b>convergency = change of longitude × sin(latitude)</b>. Convergency is why a great circle’s direction changes along its length — it crosses each successive meridian at a different angle — and why straight lines on most charts are not lines of constant direction.')
cx, cy, R = 240, 180, 130
globe(f, cx, cy, R, par=(0, 30, 60), mer=())
f.P(f'M{cx-52},{cy} Q{cx-52},{cy-90} {cx},{cy-R}', 'gold', 3); f.P(f'M{cx+52},{cy} Q{cx+52},{cy-90} {cx},{cy-R}', 'gold', 3)
f.Ci(cx, cy - R, 5, 'ink', 1, 'ink'); f.T(cx, cy - R - 12, 'North Pole', 10.5, 'ink', 'middle', bold=True)
f.L(cx - 52, cy + 4, cx - 52, cy + 30, 'gold', 1.4); f.L(cx + 52, cy + 4, cx + 52, cy + 30, 'gold', 1.4); f.L(cx - 52, cy + 22, cx + 52, cy + 22, 'gold', 1.4, me='gold', ms='gold')
f.T(cx, cy + 42, 'parallel at the equator', 9.5, 'gold', 'middle')
lines = (('At the pole', 'convergency = change of longitude (maximum)', 70), ('At 60° latitude', 'convergency = 0.87 × change of longitude', 150), ('At the equator', 'convergency = zero', 230))
for a, b, y in lines: f.T(430, y, a, 11, 'ink', bold=True); f.T(430, y + 16, b, 10)
f.R(420, 270, 320, 44, c='gold', sw=1.6, fill='g2'); f.T(580, 297, 'convergency = ch.long × sin latitude', 11.5, 'gold', 'middle', bold=True)
NV.append(f)

# 16 convergency mid-lat
f = N('248_figure_01', 'Convergency Between Two Positions', 760, 340, 'Two meridians forty degrees apart with tangents drawn at thirty degrees north showing the angle of convergency between them',
    '<b>Calculating convergency.</b> For two positions, <b>convergency (°) = change of longitude (°) × sin(mean latitude)</b>. In the example the meridians are 40° of longitude apart and both positions are at 30°N: convergency = 40 × sin 30° = 40 × 0.5 = <b>20°</b>. That is the amount by which the great-circle track between the two positions changes direction from one end to the other. If the two positions are at different latitudes, use the <b>mean</b> (middle) latitude. Convergency is always measured as an angle, never as a distance.')
cx, cy, R = 240, 190, 140
f.Ci(cx, cy, R, 'ink', 2, 'g3'); f.L(cx - R, cy, cx + R, cy, 'cool', 1.6)
y30 = cy - R * 0.5; w30 = R * math.cos(math.radians(30)); f.L(cx - w30, y30, cx + w30, y30, 'line', 1.2)
f.P(f'M{cx-60},{cy+R*0.9} Q{cx-78},{cy-30} {cx},{cy-R}', 'gold', 2.4); f.P(f'M{cx+60},{cy+R*0.9} Q{cx+78},{cy-30} {cx},{cy-R}', 'gold', 2.4)
xl, xr = cx - 54, cx + 54
f.L(xl - 14, y30 + 40, xl + 22, y30 - 60, 'hot', 1.8); f.L(xr + 14, y30 + 40, xr - 22, y30 - 60, 'hot', 1.8)
f.T(cx, cy - R - 10, 'North Pole', 10.5, 'ink', 'middle', bold=True); f.T(cx - w30 - 8, y30 + 4, '30°N', 10, 'ink', 'end'); f.T(cx - R - 8, cy + 4, 'equator', 10, 'cool', 'end')
f.L(xl, y30 + 14, xr, y30 + 14, 'gold', 1.4, me='gold', ms='gold'); f.T(cx, y30 + 30, 'ch.long 40°', 10, 'gold', 'middle', bold=True)
f.T(cx + 66, y30 - 70, 'convergency 20°', 10, 'hot', bold=True); f.L(cx + 64, y30 - 74, cx + 8, y30 - 84, 'hot', 1)
f.R(430, 70, 310, 60, c='gold', sw=1.6, fill='g2'); f.T(585, 94, 'convergency =', 11, 'gold', 'middle', bold=True); f.T(585, 114, 'ch.long × sin (mean latitude)', 11, 'gold', 'middle', bold=True)
note(f, 440, 170, ['Example', 'ch.long 40°, latitude 30°N', '40 × sin 30° = 40 × 0.5', '= 20°'], lh=17, first='ink')
f.T(440, 270, 'Red lines: tangents to the two meridians.', 9.5); f.T(440, 284, 'The angle between them is the convergency.', 9.5)
NV.append(f)

# 17 convergency & GC direction
f = N('249_figure_02', 'Convergency & the Change of Great-Circle Direction', 760, 340, 'A great circle crossing two meridians, with the track angle measured at each and the difference equal to the convergency',
    '<b>The change in great-circle track equals the convergency.</b> A great circle is “straight” on the globe, but it is measured against meridians that are converging. So the track angle <b>a</b> measured at the first meridian differs from the angle <b>b</b> at the second, and <b>b − a = convergency</b> between the two meridians. In the <b>Northern Hemisphere</b> the track <b>increases when flying east</b> and decreases when flying west; in the <b>Southern Hemisphere</b> it is the opposite. Knowing this, the initial great-circle track can be found from the final, or either from the rhumb-line track using the conversion angle.')
cx, cy, R = 240, 190, 140
f.Ci(cx, cy, R, 'ink', 2, 'g3'); f.L(cx - R, cy + 30, cx + R, cy + 30, 'cool', 1.6)
f.P(f'M{cx-60},{cy+R*0.9} Q{cx-78},{cy-30} {cx},{cy-R}', 'gold', 2.4); f.P(f'M{cx+60},{cy+R*0.9} Q{cx+78},{cy-30} {cx},{cy-R}', 'gold', 2.4)
P1, P2 = (cx - 66, cy + 4), (cx + 62, cy - 30)
f.L(P1[0] - 50, P1[1] + 13, P2[0] + 60, P2[1] - 16, 'hot', 2.4, me='hot'); f.T(cx - 2, cy - 26, 'great circle', 10, 'hot', 'middle', bold=True)
f.L(P1[0] + 2, P1[1], P1[0] + 12, P1[1] - 60, 'ink', 1.4); f.L(P2[0] - 2, P2[1], P2[0] - 16, P2[1] - 60, 'ink', 1.4)
f.Ci(P1[0], P1[1], 4, 'ink', 1, 'ink'); f.Ci(P2[0], P2[1], 4, 'ink', 1, 'ink')
f.T(P1[0] + 22, P1[1] - 18, 'a', 12, 'cool', bold=True); f.T(P2[0] + 10, P2[1] - 22, 'b', 12, 'cool', bold=True)
f.T(cx, cy - R - 10, 'North Pole', 10.5, 'ink', 'middle', bold=True); f.T(cx - R - 8, cy + 34, 'equator', 10, 'cool', 'end')
f.R(430, 60, 310, 50, c='gold', sw=1.6, fill='g2'); f.T(585, 90, 'b − a = convergency', 12.5, 'gold', 'middle', bold=True)
note(f, 440, 150, ['Northern Hemisphere', 'eastbound: track increases', 'westbound: track decreases'], first='ink')
note(f, 440, 230, ['Southern Hemisphere', 'eastbound: track decreases', 'westbound: track increases'], first='ink')
f.T(240, 334, 'a and b: track measured from the local meridian', 9.5, 'faint', 'middle')
NV.append(f)

# 18 conversion angle
f = N('257_figure_01', 'Conversion Angle', 760, 330, 'A straight rhumb line and a curved great circle between two positions, with the angle between them at each end marked',
    '<b>The conversion angle is the angle between the great circle and the rhumb line at either end.</b> It is exactly <b>half the convergency</b>: <b>conversion angle = ½ × change of longitude × sin(mean latitude)</b>. In the example A is at 30°N 020°W and B at 30°N 020°E: change of longitude 40°, so convergency = 40 × sin 30° = 20° and the conversion angle is <b>10°</b>. The rhumb-line track A to B is 090°, so the great-circle track is 080° leaving A and 100° arriving at B. It is used to convert a radio (great-circle) bearing into a rhumb-line bearing for plotting on a Mercator chart.')
f.L(140, 40, 140, 250, 'line', 1.4); f.L(620, 40, 620, 250, 'line', 1.4); f.T(140, 30, '020°W', 10.5, 'ink', 'middle'); f.T(620, 30, '020°E', 10.5, 'ink', 'middle')
f.L(100, 180, 660, 180, 'hot', 2.6); f.P('M140,180 Q380,70 620,180', 'green', 2.8)
f.Ci(140, 180, 5, 'ink', 1, 'white'); f.Ci(620, 180, 5, 'ink', 1, 'white'); f.T(128, 200, 'A', 11.5, 'ink', 'end', bold=True); f.T(632, 200, 'B', 11.5, 'ink', bold=True)
f.T(380, 112, 'great circle', 10.5, 'green', 'middle', bold=True); f.T(380, 198, 'rhumb line 090°', 10.5, 'hot', 'middle', bold=True); f.T(672, 176, '30°N', 10, 'ink')
ang(f, 140, 180, 70, 90, 65.4, 'cool', 2); ang(f, 620, 180, 70, 270, 294.6, 'cool', 2)
f.T(218, 158, '10°', 10.5, 'cool', bold=True); f.T(542, 158, '10°', 10.5, 'cool', 'end', bold=True)
f.T(380, 250, 'conversion angle = ½ convergency = ½ × ch.long × sin (mean latitude)', 11.5, 'gold', 'middle', bold=True)
f.T(380, 274, '½ × 40° × sin 30° = 10°', 10.5, 'dim', 'middle')
f.T(380, 306, 'Great-circle track: 080° leaving A, 100° arriving at B.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 19 magnetic field
f = N('051_figure_01', "The Earth's Magnetic Field", 760, 340, 'The Earth with a bar magnet inside tilted from the spin axis and field lines looping from one magnetic pole to the other',
    '<b>The Earth behaves as if it had a bar magnet inside it</b>, tilted about 11° from the spin axis, so the <b>magnetic poles</b> are not at the geographic poles — and they wander slowly. Lines of force leave near the south magnetic pole and re-enter near the north. A compass needle aligns with the local field: its <b>horizontal component (H)</b> gives direction and is strongest at the <b>magnetic equator</b>; its <b>vertical component (Z)</b> pulls the needle downwards — the <b>dip</b> — and is greatest at the magnetic poles, where H falls to zero and the compass is useless. Lines joining places of equal dip are <b>isoclinals</b>; the line of zero dip is the <b>aclinic line</b> (magnetic equator).')
cx, cy, R = 250, 170, 96
f.Ci(cx, cy, R, 'ink', 2, 'g3'); f.L(cx, cy - R - 26, cx, cy + R + 26, 'ink', 1.6)
f.raw(f'<g transform="rotate(-14 {cx} {cy})"><rect x="{cx-10}" y="{cy-56}" width="20" height="56" fill="{col("cool")}" stroke="{col("ink")}" stroke-width="1"/><rect x="{cx-10}" y="{cy}" width="20" height="56" fill="{col("hot")}" stroke="{col("ink")}" stroke-width="1"/>'
      + ''.join(f'<ellipse cx="{cx + s*rx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="{col("gold")}" stroke-width="1.3" stroke-dasharray="5 4"/>' for s in (-1, 1) for rx, ry in ((46, 78), (84, 118)))
      + f'<line x1="{cx}" y1="{cy-130}" x2="{cx}" y2="{cy+130}" stroke="{col("gold")}" stroke-width="1.2" stroke-dasharray="3 4"/></g>')
f.T(cx + 10, cy - R - 30, 'True N', 10.5, 'ink', bold=True); f.T(cx - 44, cy - R - 30, 'Magnetic N', 10.5, 'gold', 'end', bold=True)
f.T(cx + 10, cy + R + 40, 'True S', 10.5, 'ink', bold=True)
note(f, 480, 60, ['Horizontal component (H)', 'directs the compass; greatest', 'at the magnetic equator,', 'zero at the magnetic poles'], first='gold')
note(f, 480, 160, ['Vertical component (Z)', 'causes dip; zero at the', 'magnetic equator, greatest', 'at the magnetic poles'], first='cool')
note(f, 480, 260, ['Dip angle', '0° at the aclinic line,', '90° at the magnetic poles'], first='ink')
NV.append(f)

# 20 variation
f = N('052_figure_02', 'Variation & the Agonic Line', 760, 340, 'A globe with the true and magnetic north poles, observers with easterly and westerly variation and the agonic line of zero variation',
    '<b>Variation is the angle between true north and magnetic north</b> at a given place. If magnetic north lies to the <b>east</b> of true north the variation is <b>easterly</b> (positive); if to the <b>west</b>, <b>westerly</b> (negative). To convert: <b>“variation west, magnetic best; variation east, magnetic least”</b> — with westerly variation the magnetic heading is greater than the true. Lines on a chart joining places of equal variation are <b>isogonals</b>; the line of <b>zero variation</b>, where true and magnetic north are in line, is the <b>agonic line</b>. Variation changes slowly over the years as the magnetic poles move, so charts carry the year and the annual change.')
cx, cy, R = 250, 180, 130
f.Ci(cx, cy, R, 'ink', 2, 'g3')
TP, MP = (cx, cy - 104), (cx - 30, cy - 78)
f.Ci(TP[0], TP[1], 5, 'ink', 1, 'white'); f.T(TP[0] + 10, TP[1] - 8, 'True Pole', 10, 'ink', bold=True)
f.Ci(MP[0], MP[1], 5, 'gold', 1, 'gold'); f.T(MP[0] - 10, MP[1] - 8, 'Magnetic Pole', 10, 'gold', 'end', bold=True)
f.P(f'M{TP[0]},{TP[1]} L{MP[0]},{MP[1]} Q{cx-70},{cy+30} {cx-60},{cy+R-12}', 'hot', 2.4); f.T(cx - 60, cy + R + 16, 'agonic line: zero variation', 10, 'hot', 'middle', bold=True)
for P, lab, vt in (((cx - 104, cy - 10), 'A', 'easterly'), ((cx + 76, cy + 10), 'B', 'westerly')):
    f.L(P[0], P[1], TP[0], TP[1], 'ink', 1.4); f.L(P[0], P[1], MP[0], MP[1], 'gold', 1.4, dash='5 4'); f.Ci(P[0], P[1], 5, 'hot', 1, 'hot')
    f.T(P[0], P[1] + 20, lab + ': variation ' + vt, 9.5, 'ink', 'middle', bold=True)
note(f, 480, 70, ['Variation', 'angle between true north', 'and magnetic north'], first='ink')
note(f, 480, 150, ['Isogonal', 'line joining places of', 'equal variation'], first='gold')
note(f, 480, 230, ['Variation west, magnetic best', 'Variation east, magnetic least'], first='cool')
f.L(480, 296, 506, 296, 'ink', 1.4); f.T(512, 300, 'to true north', 9.5); f.L(600, 296, 626, 296, 'gold', 1.4, dash='5 4'); f.T(632, 300, 'to magnetic north', 9.5)
NV.append(f)

# 21 variation near the poles
f = N('053_figure_01', 'Variation Near the Poles — Up to 180°', 760, 330, 'The true pole and the magnetic pole with a point on the line between them, where true north and magnetic north are in opposite directions',
    '<b>Variation can reach 180°.</b> On the line joining the true and magnetic poles, at any point <b>between</b> the two poles, true north lies in one direction and magnetic north in exactly the opposite direction: the variation is <b>180°</b>. On the extensions of that line <b>beyond</b> either pole, both norths lie the same way and the variation is <b>zero</b>. So close to the poles variation changes very rapidly over short distances, the horizontal field strength is too weak to drive a compass reliably, and magnetic references are abandoned in favour of <b>true</b> or <b>grid</b> navigation with gyro or inertial heading.')
f.L(60, 170, 700, 170, 'gold', 1.6, dash='7 5')
MP, TP, A = (250, 170), (510, 170), (380, 170)
f.Ci(MP[0], MP[1], 7, 'gold', 1, 'gold'); f.T(MP[0], 206, 'MAGNETIC POLE', 10.5, 'gold', 'middle', bold=True)
f.Ci(TP[0], TP[1], 7, 'ink', 1, 'white'); f.T(TP[0], 206, 'TRUE POLE', 10.5, 'ink', 'middle', bold=True)
f.Ci(A[0], A[1], 6, 'hot', 1, 'hot'); f.T(A[0], 150, 'A', 11.5, 'hot', 'middle', bold=True)
f.L(374, 130, 284, 130, 'gold', 2.2, me='gold'); f.T(330, 120, 'magnetic north', 9.5, 'gold', 'middle')
f.L(386, 130, 476, 130, 'ink', 2.2, me='ink'); f.T(430, 120, 'true north', 9.5, 'ink', 'middle')
f.T(380, 240, 'at A, between the poles: variation 180°', 11, 'hot', 'middle', bold=True)
f.T(130, 150, 'variation zero', 10.5, 'green', 'middle', bold=True); f.T(630, 150, 'variation zero', 10.5, 'green', 'middle', bold=True)
f.T(130, 196, 'both poles in the', 9.5, 'dim', 'middle'); f.T(130, 209, 'same direction', 9.5, 'dim', 'middle'); f.T(630, 196, 'both poles in the', 9.5, 'dim', 'middle'); f.T(630, 209, 'same direction', 9.5, 'dim', 'middle')
f.T(380, 290, 'Near the poles variation changes rapidly and the compass is unreliable: use true or grid navigation.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 22 true / magnetic / compass
f = N('066_figure_02', 'True, Magnetic & Compass Heading', 760, 340, 'An aircraft with three north references, true, magnetic and compass, and the heading measured from each',
    '<b>Three norths, three headings.</b> <b>True heading</b> is measured from true north. Apply <b>variation</b> to get <b>magnetic heading</b>, measured from magnetic north. Apply <b>deviation</b> — the error caused by the aircraft’s own magnetism, read from the deviation card — to get <b>compass heading</b>, what the compass actually shows. In the example: true 100°, variation 25°W gives magnetic 125°; deviation 10°W gives compass 135°. Working from true to compass, <b>add westerly</b> and <b>subtract easterly</b>; from compass to true, do the reverse. Memory aid: “<b>C</b>adbury’s <b>D</b>airy <b>M</b>ilk <b>V</b>ery <b>T</b>asty” — Compass, Deviation, Magnetic, Variation, True.')
O = (200, 250)
for a, lab, c_, r in ((0, 'TRUE N', 'ink', 190), (-25, 'MAGNETIC N', 'gold', 176), (-35, 'COMPASS N', 'cool', 160)):
    p = pol(O[0], O[1], r, a); f.L(O[0], O[1], p[0], p[1], c_, 2, me=c_)
f.T(206, 50, 'TRUE N', 10, 'ink', bold=True); f.T(118, 82, 'MAG N', 10, 'gold', 'end', bold=True); f.T(100, 122, 'COMPASS N', 10, 'cool', 'end', bold=True)
h = pol(O[0], O[1], 170, 100); f.L(O[0], O[1], h[0], h[1], 'hot', 2.6, me='hot'); f.raw(aircraft(h[0] - 50, h[1] - 8, 10, 0.3, flip=True))
f.T(h[0] - 30, h[1] + 30, 'aircraft heading', 10, 'hot', 'middle', bold=True)
ang(f, O[0], O[1], 50, 0, 100, 'ink', 1.8); ang(f, O[0], O[1], 74, -25, 100, 'gold', 1.8); ang(f, O[0], O[1], 98, -35, 100, 'cool', 1.8)
table(f, 440, 50, [96, 100, 104], ['step', 'apply', 'result'], [('True', '', '100° (T)'), ('Variation', '25°W: add', '125° (M)'), ('Deviation', '10°W: add', '135° (C)')], 'gold')
note(f, 440, 170, ['True to compass:', 'add WEST, subtract EAST'], first='ink')
note(f, 440, 220, ['Compass to true:', 'subtract WEST, add EAST'], first='ink')
f.T(590, 290, 'C  D  M  V  T', 13, 'gold', 'middle', bold=True, mono=True); f.T(590, 308, 'compass, deviation, magnetic, variation, true', 9.5, 'dim', 'middle')
NV.append(f)

# 23 true, magnetic, relative bearing
f = N('487_figure_01', 'True Heading, Relative Bearing & True Bearing', 760, 340, 'An aircraft heading 030 degrees with a station 060 degrees to the right of the nose, giving a true bearing of 090 degrees',
    '<b>Relative bearing is measured from the nose; true bearing from true north.</b> A <b>relative bearing</b> is the angle, measured clockwise, between the aircraft’s <b>fore-and-aft axis</b> and the line to the object — it is what a fixed-card ADF shows. Add it to the heading to get the bearing from north: <b>true bearing = true heading + relative bearing</b> (subtract 360° if the answer exceeds 360°). In the example: heading 030°(T), relative bearing 060°, so the true bearing <b>to</b> the station is <b>090°</b>, and the bearing <b>from</b> the station to plot is the reciprocal, 270°. Use magnetic heading and the answer is a magnetic bearing (QDM).')
O = (200, 270)
f.L(O[0], O[1], O[0], 50, 'ink', 1.8, me='ink'); f.T(O[0], 40, 'TN', 11, 'ink', 'middle', bold=True)
h = pol(O[0], O[1], 200, 30); f.L(O[0], O[1], h[0], h[1], 'hot', 2.4, me='hot'); f.T(h[0] + 8, h[1] + 2, 'aircraft heading', 10, 'hot', bold=True)
f.L(O[0], O[1], 520, O[1], 'cool', 1.8, dash='7 5'); f.Ci(530, O[1], 7, 'ink', 1.2, 'cool'); f.T(544, O[1] + 4, 'station', 10.5, 'cool', bold=True)
f.raw(f'<g transform="translate({O[0]} {O[1]}) rotate(-60)">' + aircraft(0, 0, 0, 0.32, flip=True)[aircraft(0, 0, 0, 0.32, flip=True).index('>') + 1:])
ang(f, O[0], O[1], 60, 0, 30, 'hot', 2); ang(f, O[0], O[1], 96, 30, 90, 'gold', 2); ang(f, O[0], O[1], 132, 0, 90, 'cool', 2)
f.T(226, 196, '030°', 10, 'hot', bold=True); f.T(284, 222, '060°', 10, 'gold', bold=True); f.T(322, 172, '090°', 10, 'cool', bold=True)
note(f, 470, 60, ['True heading 030°', 'from true north to the nose'], first='hot')
note(f, 470, 110, ['Relative bearing 060°', 'from the nose to the station'], first='gold')
note(f, 470, 160, ['True bearing 090°', 'from true north to the station'], first='cool')
f.T(380, 316, 'true bearing = true heading + relative bearing        030° + 060° = 090°', 11, 'ink', 'middle', bold=True)
NV.append(f)

# 24 slide rule principle
f = N('080_figure_01', 'The Circular Slide-Rule Principle', 760, 330, 'Two logarithmic rings: with one on the inner ring set against two on the outer, three on the inner lies opposite six on the outer',
    '<b>A slide rule multiplies by adding lengths.</b> Both rings are marked <b>logarithmically</b>, so the distance round the ring to a number is proportional to its logarithm; adding two such distances multiplies the numbers. To work out 2 × 3: turn the inner ring until its <b>1 (the index, marked 10)</b> lies against <b>2</b> on the outer ring. Now every number on the inner ring lies opposite <b>twice</b> its value on the outer: opposite <b>3</b> read <b>6</b>. Division is the same setting read the other way. The whole ring is now a <b>ratio</b> — which is why one setting solves speed, distance and time for any time.')
cx, cy = 230, 165
f.Ci(cx, cy, 130, 'ink', 2.2, 'g3'); f.Ci(cx, cy, 98, 'gold', 2, 'g2'); f.Ci(cx, cy, 62, 'line', 1.2, 'bg')
off = 360 * math.log10(2)
for v in range(1, 10):
    a = 360 * math.log10(v); p, q = pol(cx, cy, 130, a), pol(cx, cy, 118, a); f.L(p[0], p[1], q[0], q[1], 'ink', 1.6); x, y = pol(cx, cy, 108, a); f.T(x, y + 4, str(v), 10, 'ink', 'middle', bold=True, check=False)
    p, q = pol(cx, cy, 98, a + off), pol(cx, cy, 88, a + off); f.L(p[0], p[1], q[0], q[1], 'gold', 1.6); x, y = pol(cx, cy, 78, a + off); f.T(x, y + 4, str(v), 9.5, 'gold', 'middle', check=False)
for v, c_ in ((1, 'cool'), (3, 'hot')):
    a = 360 * math.log10(v) + off; x, y = pol(cx, cy, 103, a); f.Ci(x, y, 17, c_, 2.2)
f.T(cx, cy + 4, '2 × 3 = 6', 12, 'ink', 'middle', bold=True)
f.badge(430, 80, 1); f.T(448, 79, 'Set 1 on the inner ring', 11, 'cool', bold=True); f.T(448, 94, 'against 2 on the outer ring', 10)
f.badge(430, 150, 2); f.T(448, 149, 'Find 3 on the inner ring', 11, 'hot', bold=True); f.T(448, 164, 'read 6 opposite it on the outer ring', 10)
note(f, 430, 220, ['Outer ring = inner ring × 2', 'all the way round: a ratio.'], first='ink')
f.T(380, 316, 'Logarithmic scales: adding lengths multiplies numbers.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 25 sidereal vs solar day
f = N('390_figure_01', 'Sidereal Day vs Apparent Solar Day', 760, 340, 'The Earth at two positions on its orbit one day apart, having to turn slightly more than once to bring the Sun back overhead',
    '<b>Two ways to time one rotation.</b> A <b>sidereal day</b> is one complete 360° rotation measured against the <b>distant stars</b>: 23 h 56 min 4 s. But during that day the Earth has also moved about 1° along its orbit, so it must turn a little <b>further</b> — nearly 361° — before the <b>Sun</b> is back on the same meridian. That interval, from one transit of the Sun to the next, is the <b>apparent solar day</b>, about 4 minutes longer. Because the Earth’s orbital speed varies (Kepler’s second law) and its axis is tilted, the apparent solar day is <b>not constant</b> in length through the year — hence the invention of the <b>mean solar day</b> of exactly 24 hours.')
f.Ci(380, 190, 30, 'gold', 1.6, 'gold'); f.T(380, 194, 'SUN', 10, '#10171b', 'middle', bold=True, check=False)
f.P('M110,120 Q90,190 130,270', 'cool', 1.6, dash='7 5', me='cool'); f.T(96, 300, "Earth's orbit", 9.5, 'cool', 'middle')
E1, E2 = (120, 120), (118, 240)
for (x, y), lab in ((E1, 'day 1'), (E2, 'day 2')): f.Ci(x, y, 24, 'ink', 1.8, 'g3'); f.T(x - 34, y + 4, lab, 10, 'ink', 'end', bold=True)
f.L(E1[0], E1[1], E1[0] + 24, E1[1], 'hot', 3); f.L(E1[0] + 26, E1[1] + 2, 350, 180, 'gold', 1.2, dash='5 4')
f.L(E2[0], E2[1], E2[0] + 24, E2[1], 'hot', 3); f.L(E2[0] + 26, E2[1], 700, E2[1], 'dim', 1.2, dash='5 4'); f.T(704, E2[1] - 8, 'to a distant star', 9.5, 'dim', 'end')
s = pol(E2[0], E2[1], 24, 79); f.L(E2[0], E2[1], s[0], s[1], 'gold', 3); f.L(s[0], s[1], 352, 196, 'gold', 1.2, dash='5 4')
f.L(E1[0] + 26, E1[1], 700, E1[1], 'dim', 1.2, dash='5 4'); f.T(704, E1[1] - 8, 'to a distant star', 9.5, 'dim', 'end')
f.T(160, 214, '360°: sidereal day', 9.5, 'hot'); f.T(200, 268, 'extra turn to face the Sun: solar day', 9.5, 'gold')
note(f, 480, 60, ['Sidereal day', '23 h 56 min 4 s:', 'one turn against the stars'], first='hot')
note(f, 480, 260, ['Apparent solar day', 'about 4 minutes longer;', 'its length varies through the year'], first='gold')
NV.append(f)

# 26 equation of time
f = N('391_figure_01', 'The Equation of Time', 760, 340, 'A graph through the year of the difference between apparent solar time and mean time, swinging between plus sixteen and minus fourteen minutes',
    '<b>The real Sun is an irregular clock.</b> Because the Earth’s orbit is an <b>ellipse</b> and its axis is <b>tilted</b>, the apparent Sun runs fast at some times of year and slow at others. Clocks therefore follow an imaginary <b>mean Sun</b> moving at a constant rate, giving the 24-hour mean solar day. The difference between <b>apparent solar time and mean solar time</b> is the <b>equation of time</b>. It is zero four times a year (mid-April, mid-June, early September and late December) and reaches about <b>+16 minutes in early November</b> (Sun ahead of the clock) and about <b>−14 minutes in mid-February</b> (Sun behind).')
px = lambda d: 90 + d * 1.7
py = lambda m: 170 - m * 6.5
def eot(d):
    B = 2 * math.pi * (d - 81) / 364.0
    return 9.87 * math.sin(2 * B) - 7.53 * math.cos(B) - 1.5 * math.sin(B)
f.L(90, 50, 90, 290, 'ink', 1.6); f.L(90, 170, 716, 170, 'ink', 1.6)
pl(f, ' '.join(f'{px(d):.1f},{py(eot(d)):.1f}' for d in range(0, 366, 3)), 'hot', 2.8)
for i, m in enumerate('JFMAMJJASOND'): x = px(15 + i * 30.4); f.L(px(i * 30.4), 166, px(i * 30.4), 174, 'ink', 1); f.T(x, 306, m, 10, 'dim', 'middle')
for m in (-15, -10, -5, 5, 10, 15): f.L(84, py(m), 90, py(m), 'ink', 1); f.T(80, py(m) + 4, f'{m:+d}'.replace('-', '−'), 9.5, 'dim', 'end')
f.T(30, 170, 'minutes', 9.5, 'dim', 'middle', rot=-90)
f.Ci(px(307), py(eot(307)), 4.5, 'gold', 1, 'gold'); f.T(px(307) - 10, py(eot(307)) - 8, 'about +16 min, early November', 10, 'gold', 'end', bold=True)
f.Ci(px(42), py(eot(42)), 4.5, 'cool', 1, 'cool'); f.T(px(42) + 12, py(eot(42)) + 14, 'about −14 min, mid-February', 10, 'cool', bold=True)
f.T(700, 162, 'mean time', 9.5, 'ink', 'end'); f.T(110, 64, 'Sun ahead of the clock', 9.5, 'dim'); f.T(700, 284, 'Sun behind the clock', 9.5, 'dim', 'end')
f.T(400, 330, 'equation of time = apparent solar time − mean solar time', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

gallery(NV, 'Navigation Gallery 1', 'General Navigation — The Earth, Direction & Time', 'Original figures for latitude and longitude, great circles and rhumb lines, convergency, magnetism and time.', 'nav1-gallery.html')
print(f'NAV1 {len(NV)}  QA warnings: {len(WARN)}')
for w in WARN: print('  ⚠', w)
