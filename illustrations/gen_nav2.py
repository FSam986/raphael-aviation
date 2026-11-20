#!/usr/bin/env python3
"""General Navigation part 2: time, seasons, charts, relative velocity, triangle of velocities, 1-in-60, fixing — 26 figures."""
import math
from figlib import *
from gen_common import note, gallery, pl
from gen_nav1 import globe, ang, N

NV = []
SUNC = 'gold'

# 401 LMT varies with longitude
f = N('401_figure_01', 'Local Mean Time Varies with Longitude', 760, 340, 'A view from above the North Pole with the mean sun over the Greenwich meridian and the local mean time on other meridians',
    '<b>Local Mean Time (LMT)</b> is based on the mean Sun crossing the local meridian: it is <b>1200 LMT</b> when the mean Sun is overhead. The Earth turns 360° in 24 hours — <b>15° of longitude per hour</b>, or 1° every 4 minutes — so every meridian has a different LMT. Places <b>east</b> of Greenwich are <b>ahead</b> (later); places <b>west</b> are <b>behind</b>. To convert: LMT = UTC + longitude in time if east, − if west. In the example it is 0900 UTC: at 45°E it is 1200 LMT, at 90°E 1500, at 180° 2100, while at 45°W it is only 0600.')
cx, cy, R = 240, 172, 104
f.Ci(cx, cy, R, 'cool', 2, 'g3')
for lon, t in ((0, '0900'), (45, '1200'), (90, '1500'), (135, '1800'), (180, '2100'), (-45, '0600'), (-90, '0300'), (-135, '0000')):
    a = 180 - lon; p = pol(cx, cy, R, a); f.L(cx, cy, p[0], p[1], 'line', 1.2)
    lp = pol(cx, cy, R + 34, a); lab = ('0°' if lon == 0 else '180°' if lon == 180 else f'{abs(lon)}°{"E" if lon > 0 else "W"}')
    f.T(lp[0], lp[1] - 2, lab, 9.5, 'dim', 'middle'); f.T(lp[0], lp[1] + 12, t + ' LMT', 9.5, 'gold' if lon == 45 else 'ink', 'middle', bold=(lon == 45))
s = pol(cx, cy, R - 30, 135); f.Ci(s[0], s[1], 12, 'gold', 1, 'gold'); f.T(s[0] + 18, s[1] + 4, 'mean Sun', 9.5, 'gold', bold=True)
f.Ci(cx, cy, 4, 'ink', 1, 'ink'); f.T(cx + 8, cy - 8, 'N Pole', 9.5, 'ink')
note(f, 520, 70, ['15° of longitude = 1 hour', '1° of longitude = 4 minutes'], first='gold')
note(f, 520, 140, ['East of Greenwich: ahead', 'West of Greenwich: behind'], first='ink')
note(f, 520, 210, ['LMT = UTC + long (E)', 'LMT = UTC − long (W)'], first='cool')
f.T(520, 300, 'shown at 0900 UTC,', 9.5, 'faint'); f.T(520, 314, 'viewed from above the North Pole', 9.5, 'faint')
NV.append(f)

# 405 time zones
f = N('405_figure_01', 'Standard Time Zones', 760, 330, 'A strip of the world divided into twenty-four time zones of fifteen degrees, each with its offset from UTC and its letter',
    '<b>Standard time</b> avoids every town keeping its own LMT. The world is divided into <b>24 zones</b>, each nominally <b>15° wide</b> and centred on a meridian divisible by 15°, keeping the time of that meridian. Zone Z (Zulu) is centred on Greenwich and keeps <b>UTC</b>; zones to the east are ahead (+1 to +12) and to the west behind (−1 to −12). Countries bend the boundaries to follow their borders, and some use half-hour offsets. <b>South Africa</b> keeps <b>UTC + 2 (SAST)</b> all year, with no daylight saving. Standard times for every State are published in the Air Almanac and the AIP.')
x0, w = 30, 700 / 24.0
for i in range(24):
    off = i - 11; x = x0 + i * w
    c_ = 'gold' if off == 0 else ('hot' if off == 2 else 'g3')
    f.R(x, 90, w - 2, 120, c='line', sw=1, fill=c_, rx=2, op=0.85 if off in (0, 2) else 1)
    f.T(x + w / 2, 160, f'{off:+d}'.replace('+0', '0').replace('-', '−'), 9.5, '#10171b' if off in (0, 2) else 'ink', 'middle', bold=True, check=False)
letters = 'XWVUTSRQPONZABCDEFGHIKLM'
for i, ch in enumerate(letters): f.T(x0 + i * w + w / 2, 230, ch, 9.5, 'dim', 'middle')
f.T(x0 + 11 * w + w / 2, 80, 'Z: UTC', 10, 'gold', 'middle', bold=True); f.T(x0 + 13 * w + w / 2, 66, 'South Africa: UTC + 2', 10, 'hot', 'middle', bold=True)
f.L(x0 + 13 * w + w / 2, 72, x0 + 13 * w + w / 2, 88, 'hot', 1)
f.T(30, 270, '← behind UTC (west)', 10, 'cool'); f.T(730, 270, 'ahead of UTC (east) →', 10, 'cool', 'end')
f.T(380, 296, 'Each zone is 15° wide and keeps the time of its central meridian.', 10.5, 'ink', 'middle', bold=True)
f.T(380, 316, 'Real boundaries follow national borders; this strip shows the nominal pattern.', 9.5, 'faint', 'middle')
NV.append(f)

# 409 date line
f = N('409_figure_01', 'The International Date Line', 760, 330, 'The 180 degree meridian with the date line bending around island groups and the date on each side',
    '<b>Somewhere the date has to change.</b> Travelling east round the world the clock is advanced an hour every 15°, gaining a whole day by the time the traveller returns; west, a day is lost. The <b>International Date Line</b>, which follows the <b>180° meridian</b> but bends to keep island groups on one date, is where that day is corrected. Crossing it <b>westbound</b> (from the Americas towards Asia) the date <b>advances</b> one day; crossing <b>eastbound</b> it goes <b>back</b> one day. Either side, the clock time is the same — only the date differs. UTC is never affected: always work in UTC and convert at the end.')
f.R(40, 40, 680, 220, c='line', sw=1, fill='g2', rx=8)
f.L(380, 40, 380, 260, 'dim', 1.2, dash='6 5'); f.T(380, 278, '180° meridian', 9.5, 'dim', 'middle')
f.P('M386,40 L386,90 L420,120 L420,150 L360,190 L360,220 L386,240 L386,260', 'hot', 3, join='round')
f.T(420, 100, 'date line', 10.5, 'hot', bold=True)
f.T(200, 120, 'WEST of the line', 11, 'ink', 'middle', bold=True); f.T(200, 140, '(Asia, New Zealand side)', 9.5, 'dim', 'middle'); f.T(200, 170, 'Tuesday 1200', 13, 'gold', 'middle', bold=True)
f.T(560, 120, 'EAST of the line', 11, 'ink', 'middle', bold=True); f.T(560, 140, '(Americas side)', 9.5, 'dim', 'middle'); f.T(560, 170, 'Monday 1200', 13, 'cool', 'middle', bold=True)
f.L(520, 220, 420, 220, 'gold', 2.2, me='gold'); f.T(560, 224, 'westbound: date +1', 10, 'gold', bold=True)
f.L(240, 240, 340, 240, 'cool', 2.2, me='cool'); f.T(200, 244, 'eastbound: date −1', 10, 'cool', 'end', bold=True)
f.T(380, 312, 'Same clock time on both sides; only the date changes. Always work in UTC.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 386 orbit
f = N('386_figure_02', "The Earth's Orbit — Perihelion & Aphelion", 760, 330, "The Earth's slightly elliptical orbit around the Sun with its closest point in early January and farthest in early July",
    '<b>The orbit is an ellipse, with the Sun at one focus.</b> The Earth is <b>closest</b> to the Sun — <b>perihelion</b>, about 91.4 million statute miles — in early <b>January</b>, and <b>farthest</b> — <b>aphelion</b>, about 94.6 million — in early <b>July</b>. By <b>Kepler’s second law</b> it moves <b>fastest at perihelion</b> and slowest at aphelion, which is one reason the length of the apparent solar day varies. The difference in distance is small: it is the <b>tilt of the axis</b>, not distance, that causes the seasons — the Southern Hemisphere has summer when the Earth is nearest the Sun.')
f.El(380, 160, 290, 110, 'cool', 1.8)
f.Ci(330, 160, 26, 'gold', 1, 'gold'); f.T(330, 164, 'SUN', 10, '#10171b', 'middle', bold=True, check=False)
f.Ci(90, 160, 11, 'cool', 1.4, 'cool'); f.Ci(670, 160, 11, 'cool', 1.4, 'cool')
f.T(90, 196, 'PERIHELION', 11, 'ink', 'middle', bold=True); f.T(90, 212, 'closest: early January', 9.5, 'dim', 'middle'); f.T(90, 226, 'fastest', 9.5, 'gold', 'middle', bold=True)
f.T(670, 196, 'APHELION', 11, 'ink', 'middle', bold=True); f.T(670, 212, 'farthest: early July', 9.5, 'dim', 'middle'); f.T(670, 226, 'slowest', 9.5, 'cool', 'middle', bold=True)
f.L(104, 160, 302, 160, 'hot', 1.4, me='hot', ms='hot'); f.T(200, 150, '91.4 million mi', 9.5, 'hot', 'middle')
f.L(358, 160, 656, 160, 'hot', 1.4, me='hot', ms='hot'); f.T(500, 150, '94.6 million mi', 9.5, 'hot', 'middle')
f.T(380, 36, "the orbit seen from above the North Pole (ellipse exaggerated)", 10, 'dim', 'middle')
f.T(380, 304, 'Orbital speed is greatest at perihelion. The seasons are caused by axial tilt, not distance.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 387 axial tilt
f = N('387_figure_01', "The Earth's Axial Tilt", 760, 320, 'The Earth with its spin axis tilted twenty-three and a half degrees from the perpendicular to the plane of its orbit',
    '<b>The spin axis is tilted about 23½° from the perpendicular to the orbital plane</b> (the axis makes 66½° with the plane itself), and it stays pointing the same way in space — towards the Pole Star — all year. As the Earth goes round the Sun, first one hemisphere and then the other is tilted towards it, so the Sun’s rays strike each hemisphere more or less directly and the days are longer or shorter. That, not the change in distance, is what produces the <b>seasons</b>. The tilt also fixes the <b>tropics</b> (23½°N and S) and the <b>polar circles</b> (66½°N and S).')
cx, cy, R = 200, 170, 90
f.Ci(cx, cy, R, 'ink', 2, 'g3'); f.L(cx - 140, cy, cx + 260, cy, 'dim', 1.2, dash='6 5'); f.T(cx + 260, cy - 8, 'plane of the orbit', 9.5, 'dim', 'end')
f.L(cx, cy - 130, cx, cy + 130, 'line', 1.4, dash='4 4')
t = pol(cx, cy, 128, -23.5); b = pol(cx, cy, 128, 156.5); f.L(b[0], b[1], t[0], t[1], 'hot', 2.4)
ang(f, cx, cy, 108, -23.5, 0, 'gold', 1.8); f.T(cx - 8, cy - 112, '23½°', 11, 'gold', 'end', bold=True)
ang(f, cx, cy, 50, -23.5, -90, 'cool', 1.6); f.T(cx - 74, cy - 30, '66½°', 10.5, 'cool', bold=True)
f.T(t[0] - 6, t[1] - 8, 'spin axis', 10, 'hot', 'end', bold=True)
f.Ci(600, 170, 60, 'gold', 1, 'gold'); f.T(600, 174, 'SUN', 12, '#10171b', 'middle', bold=True, check=False)
note(f, 340, 60, ['The axis keeps the same', 'direction in space all year.'], first='ink')
note(f, 340, 240, ['Tilt sets the tropics (23½°)', 'and polar circles (66½°).'], first='gold')
NV.append(f)

# 387_02 solstices & equinoxes
f = N('387_figure_02', 'Solstices & Equinoxes', 760, 340, 'The Earth at four points of its orbit with the tilted axis, marking the two solstices and the two equinoxes',
    '<b>Four turning points of the year</b> (Northern-Hemisphere names; the seasons are reversed in the south). At the <b>summer solstice, about 21 June</b>, the Sun is overhead at <b>23½°N</b> (the Tropic of Cancer) and the Northern Hemisphere has its longest day. At the <b>winter solstice, about 21 December</b>, it is overhead at <b>23½°S</b> (the Tropic of Capricorn) — midsummer in South Africa. At the <b>equinoxes, about 21 March and 23 September</b>, the Sun is overhead at the <b>equator</b> and day and night are equal everywhere. Between them the Sun’s <b>declination</b> moves steadily north and south.')
f.raw(f'<ellipse cx="380" cy="170" rx="260" ry="110" fill="none" stroke="{col("cool")}" stroke-width="1.6" stroke-dasharray="6 5"/>')
f.Ci(380, 170, 34, 'gold', 1, 'gold'); f.T(380, 174, 'SUN', 10, '#10171b', 'middle', bold=True, check=False)
pos = (((120, 170), '21 June', 'summer solstice (N)', 'Sun over 23½°N'), ((380, 60), '21 March', 'equinox', 'Sun over the equator'),
       ((640, 170), '21 December', 'winter solstice (N)', 'Sun over 23½°S'), ((380, 280), '23 September', 'equinox', 'Sun over the equator'))
for (x, y), d, nm, s in pos:
    f.Ci(x, y, 18, 'ink', 1.6, 'cool'); t = pol(x, y, 30, 23.5); b = pol(x, y, 30, 203.5); f.L(b[0], b[1], t[0], t[1], 'hot', 2)
for (x, y, anc, dx, dy), (_, d, nm, s) in zip(((120, 170, 'start', -20, 36), (380, 60, 'start', 30, -10), (640, 170, 'end', 20, 36), (380, 280, 'start', 30, 6)), pos):
    f.T(x + dx, y + dy, d, 10.5, 'ink', anc, bold=True); f.T(x + dx, y + dy + 14, nm, 9.5, 'gold', anc); f.T(x + dx, y + dy + 27, s, 9.5, 'dim', anc)
f.T(380, 332, 'Red line: the spin axis, always tilted the same way in space. Seasons are reversed in the Southern Hemisphere.', 9.5, 'faint', 'middle')
NV.append(f)

# 389 declination
f = N('389_figure_01', "The Sun's Declination Through the Year", 760, 340, 'A graph of the latitude at which the Sun is overhead, swinging between twenty-three and a half north and south through the year',
    '<b>Declination</b> is the latitude of the point on the Earth where the Sun is directly overhead. It swings smoothly between <b>23½°N</b> at the June solstice and <b>23½°S</b> at the December solstice, passing through <b>0° at the equinoxes</b>. The curve is steepest at the equinoxes — declination changes by about <b>0.4° a day</b> in March and September — and flattest at the solstices, where it barely changes for several days (hence “sol-stice”, the Sun standing still). Declination, with latitude, sets the times of sunrise and sunset and the length of daylight.')
px = lambda d: 90 + d * 1.66
py = lambda dec: 170 - dec * 5.4
f.L(90, 40, 90, 300, 'ink', 1.6); f.L(90, 170, 700, 170, 'ink', 1.4)
pl(f, ' '.join(f'{px(d):.1f},{py(23.44 * math.sin(2 * math.pi * (d - 80) / 365.0)):.1f}' for d in range(0, 366, 3)), 'gold', 2.8)
for dec, lab in ((23.44, '23½°N'), (10, '10°N'), (-10, '10°S'), (-23.44, '23½°S')): f.L(84, py(dec), 90, py(dec), 'ink', 1); f.T(80, py(dec) + 4, lab, 9.5, 'dim', 'end')
f.L(90, py(23.44), 700, py(23.44), 'line', 0.8, dash='3 4'); f.L(90, py(-23.44), 700, py(-23.44), 'line', 0.8, dash='3 4')
for i, m in enumerate('JFMAMJJASOND'): f.T(px(15 + i * 30.4), 320, m, 10, 'dim', 'middle')
for d, lab, y in ((80, '21 Mar: equinox, 0°', 196), (172, '21 Jun: 23½°N', 36), (266, '23 Sep: equinox, 0°', 196), (305, '21 Dec: 23½°S', 300)):
    dd = 355 if d == 305 else d; f.Ci(px(dd), py(23.44 * math.sin(2 * math.pi * (dd - 80) / 365.0)), 4.5, 'hot', 1, 'hot'); f.T(px(d), y, lab, 9.5, 'hot', 'middle', bold=True)
f.T(30, 170, 'declination', 9.5, 'dim', 'middle', rot=-90)
f.T(560, 250, 'changes fastest at the equinoxes', 9.5, 'ink', 'middle'); f.T(560, 264, '(about 0.4° a day)', 9.5, 'ink', 'middle')
NV.append(f)

# 427 terminator
f = N('427_figure_01', 'Day, Night & the Terminator', 760, 330, 'The Earth lit from one side, with the terminator separating day from night and the tilted axis giving long days in one hemisphere',
    '<b>The terminator</b> is the great circle separating the sunlit half of the Earth from the dark half. Because the axis is tilted, at the June solstice (shown) the terminator does not pass through the poles: everywhere north of <b>66½°N</b> (the Arctic Circle) stays in daylight all day, everywhere south of <b>66½°S</b> stays dark, and the further north a place is, the longer its day. At the equator day and night are always about 12 hours each. At the equinoxes the terminator passes through both poles and every place has 12 hours of day and night.')
cx, cy, R = 280, 170, 120
f.raw(f'<defs><clipPath id="t427"><circle cx="{cx}" cy="{cy}" r="{R}"/></clipPath></defs><g clip-path="url(#t427)"><rect x="{cx-R}" y="{cy-R}" width="{2*R}" height="{2*R}" fill="{col("g3")}"/><rect x="{cx-R}" y="{cy-R}" width="{R}" height="{2*R}" fill="#05080a"/></g>')
f.Ci(cx, cy, R, 'ink', 2); f.L(cx, cy - R, cx, cy + R, 'white', 1.6, dash='4 3')
def latl(la, c_, sw, dash=None):
    w = R * math.cos(math.radians(la)); y = -R * math.sin(math.radians(la)); t = math.radians(23.5)
    pts = [(cx + x * math.cos(t) - y * math.sin(t), cy + x * math.sin(t) + y * math.cos(t)) for x in (-w, w)]
    f.L(pts[0][0], pts[0][1], pts[1][0], pts[1][1], c_, sw, dash=dash); return pts
t = pol(cx, cy, R + 20, 23.5); b = pol(cx, cy, R + 20, 203.5); f.L(b[0], b[1], t[0], t[1], 'hot', 2); f.T(t[0] + 8, t[1], 'N', 11, 'hot', bold=True)
e = latl(0, 'cool', 1.4); f.T(e[1][0] + 6, e[1][1] + 4, 'equator', 9.5, 'cool')
n = latl(66.5, 'gold', 1.6, '5 4'); sx = latl(-66.5, 'gold', 1.6, '5 4')
f.T(cx + 140, cy - 92, '66½°N: 24 h daylight', 9.5, 'gold', bold=True); f.T(cx - 60, cy + 136, '66½°S: 24 h darkness', 9.5, 'gold', 'end', bold=True)
f.T(cx - 4, cy - R - 8, 'terminator', 9.5, 'white', 'end')
f.T(cx - 60, cy + 40, 'NIGHT', 12, 'dim', 'middle', bold=True); f.T(cx + 60, cy - 40, 'DAY', 12, 'ink', 'middle', bold=True)
for y in range(60, 300, 30): f.L(720, y, 520, y, 'gold', 1.4, me='gold')
f.T(620, 40, "Sun's rays", 10, 'gold', 'middle', bold=True)
f.T(380, 320, 'June solstice shown. The terminator is the great circle between the lit and dark halves.', 10, 'dim', 'middle')
NV.append(f)

# 290_03 polar stereographic
f = N('290_figure_03', 'Polar Stereographic Chart', 760, 340, 'A chart centred on the pole with meridians as straight radial lines and parallels as concentric circles',
    '<b>The chart for polar regions.</b> The projection is <b>azimuthal</b>: the paper touches the Earth at the pole and the light is at the opposite pole. <b>Meridians</b> are straight lines radiating from the pole and <b>parallels</b> are concentric circles. The chart is <b>conformal</b>; scale is correct at the pole and <b>expands away from it</b> (about 2% at 75°, 7% at 60°), so it is used for latitudes above about 70°. A straight line is very nearly a <b>great circle</b> near the pole. <b>Convergency on the chart equals change of longitude</b>, the same as at the pole itself — so it overstates the real convergency at lower latitudes.')
cx, cy = 250, 172
for r, la in ((36, 80), (72, 70), (108, 60), (138, 50)):
    f.Ci(cx, cy, r, 'line', 1.2); q = pol(cx, cy, r, 200); f.T(q[0] + 3, q[1] + 12, f'{la}°', 9, 'dim')
for a in range(0, 360, 30):
    p = pol(cx, cy, 142, a); f.L(cx, cy, p[0], p[1], 'line', 1.2)
for a, lab in ((0, '180°'), (90, '90°E'), (180, '0°'), (270, '90°W')):
    p = pol(cx, cy, 154, a); f.T(p[0], p[1] + 4, lab, 9.5, 'ink', 'middle', bold=True)
f.Ci(cx, cy, 5, 'ink', 1, 'ink'); f.T(cx + 8, cy + 16, 'Pole', 9.5, 'ink')
A, B = pol(cx, cy, 108, 230), pol(cx, cy, 108, 120); f.L(A[0], A[1], B[0], B[1], 'gold', 2.2); f.T(cx - 4, cy + 30, 'straight line ≈ great circle', 9.5, 'gold', 'middle', bold=True)
note(f, 470, 60, ['Meridians', 'straight lines from the pole'], first='ink')
note(f, 470, 116, ['Parallels', 'concentric circles'], first='ink')
note(f, 470, 172, ['Scale', 'correct at the pole,', 'expands away from it'], first='gold')
note(f, 470, 246, ['Chart convergency', '= change of longitude'], first='cool')
NV.append(f)

# 291 Mercator cylinder
f = N('291_figure_02', 'Mercator — The Cylindrical Projection', 760, 340, 'A globe inside a cylinder touching it at the equator, and the resulting chart with straight meridians and widening parallels',
    '<b>Mercator wraps a cylinder round the Earth, touching it at the equator.</b> On the unrolled chart the <b>meridians</b> are straight, parallel and equally spaced, and the <b>parallels</b> are straight lines at right angles to them. Because real meridians converge but chart meridians do not, east–west distances are stretched by the secant of the latitude; to keep the chart <b>conformal</b> the parallels are spaced further apart in exactly the same proportion. The result: scale is correct only at the <b>equator</b> and expands as <b>sec(latitude)</b> — doubling at 60° — and the poles cannot be shown at all. A <b>rhumb line is a straight line</b>, which is why Mercator charts are used for plotting.')
f.R(60, 60, 160, 230, c='cool', sw=1.4, fill='none', rx=0, dash='6 5'); f.El(140, 60, 80, 12, 'cool', 1.2); f.El(140, 290, 80, 12, 'cool', 1.2)
globe(f, 140, 175, 80, par=(0, 30, 60, -30, -60), mer=(0.5,)); f.T(140, 312, 'cylinder touches at the equator', 9.5, 'dim', 'middle')
f.R(300, 40, 400, 270, c='line', sw=1.4, fill='g2', rx=0)
for i in range(9): x = 300 + i * 50; f.L(x, 40, x, 310, 'line', 1)
yl = lambda la: 175 - 60 * math.log(math.tan(math.pi / 4 + math.radians(la) / 2))
for la in (0, 20, 40, 60, 70, -20, -40, -60, -70):
    y = yl(la); f.L(300, y, 700, y, 'cool' if la == 0 else 'line', 1.6 if la == 0 else 1); f.T(706, y + 4, f'{abs(la)}°' + ('' if la == 0 else ('N' if la > 0 else 'S')), 9, 'dim')
f.L(320, yl(-30), 680, yl(50), 'hot', 2.4); f.T(470, yl(-20) + 4, 'rhumb line = straight', 10, 'hot', bold=True)
f.L(240, 175, 296, 175, 'dim', 1.6, me='dim')
f.T(500, 30, 'parallels spread apart towards the poles', 9.5, 'dim', 'middle')
NV.append(f)

# 300 Mercator latitude expansion
f = N('300_figure_02', 'Mercator — Expansion of the Latitude Scale', 760, 330, 'Equal steps of latitude on the globe projected onto a cylinder, becoming more widely spaced towards the poles',
    '<b>Why Greenland looks enormous.</b> On a Mercator chart the spacing between parallels grows with latitude: the chart scale at any latitude is the equatorial scale × <b>sec(latitude)</b> — × 1.15 at 30°, × 1.41 at 45°, × 2.0 at 60°, × 3.9 at 75°. Equal steps of latitude on the Earth therefore become longer and longer steps on the chart. Because scale varies across the chart, <b>distance must always be measured on the latitude scale at the side, level with the mid-latitude of the line being measured</b> — never at the equator and never on the longitude scale at the top or bottom.')
cx, cy, R = 150, 170, 90
f.Ci(cx, cy, R, 'ink', 1.8, 'g3')
yl = lambda la: 170 - 52 * math.log(math.tan(math.pi / 4 + math.radians(la) / 2))
for la in (0, 15, 30, 45, 60, 75, -15, -30, -45, -60, -75):
    gy = cy - R * math.sin(math.radians(la)); gx = cx + R * math.cos(math.radians(la))
    f.L(cx - R * math.cos(math.radians(la)), gy, gx, gy, 'line', 1)
    f.L(gx, gy, 300, yl(la), 'gold', 1, dash='3 3'); f.L(300, yl(la), 640, yl(la), 'cool' if la == 0 else 'ink', 1.6 if la == 0 else 1)
    f.T(648, yl(la) + 4, ('EQ' if la == 0 else f'{abs(la)}°' + ('N' if la > 0 else 'S')), 9.5, 'dim')
f.L(300, 20, 300, 320, 'ink', 1.4)
f.T(150, 290, 'equal 15° steps on the globe', 9.5, 'dim', 'middle'); f.T(470, 318, 'ever-wider steps on the chart', 9.5, 'dim', 'middle')
note(f, 480, 140, ['scale × sec(latitude)'], first='gold')
NV.append(f)

# 304 area exaggeration
f = N('304_figure_01', 'Mercator — Area Exaggeration at High Latitude', 760, 320, 'Two equal squares on the Earth, one near the equator and one at sixty degrees, drawn on a Mercator chart where the high-latitude one appears four times larger',
    '<b>Equal areas on the Earth are not equal on a Mercator chart.</b> Both dimensions of a small area are stretched by sec(latitude), so its <b>area</b> is multiplied by <b>sec²(latitude)</b>: × 2 at 45°, × 4 at 60°, × 15 at 75°. A country near the pole therefore appears far bigger than an equal one near the equator — the reason Greenland looks as large as Africa, although Africa is about 14 times larger. Shapes of small areas are correct (the chart is conformal), but sizes are not, so distances must always be measured with the latitude scale, never by eye.')
f.R(40, 40, 680, 230, c='line', sw=1.2, fill='g2', rx=0)
for la in (0, 30, 60): y = 230 - [0, 31, 105][[0, 30, 60].index(la)] * 1.6; f.L(40, y, 720, y, 'cool' if la == 0 else 'line', 1.2); f.T(30, y + 4, f'{la}°', 9.5, 'dim', 'end')
f.R(120, 196, 40, 34, c='gold', sw=1.6, fill='gold', rx=0, op=0.8); f.T(140, 254, 'near the equator', 9.5, 'ink', 'middle')
f.R(380, 52, 80, 68, c='gold', sw=1.6, fill='gold', rx=0, op=0.8); f.T(420, 140, 'same area at 60°N', 9.5, 'ink', 'middle')
f.T(560, 80, 'drawn 4 times larger', 11, 'hot', bold=True); f.T(560, 96, '(sec² 60° = 4)', 9.5, 'hot')
f.T(380, 296, 'Area is exaggerated by sec² latitude: × 2 at 45°, × 4 at 60°, × 15 at 75°.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 306 GC vs RL on Mercator
f = N('306_figure_01', 'Great Circle vs Rhumb Line on a Mercator Chart', 760, 330, 'Straight rhumb lines and curved great circles on a Mercator chart in both hemispheres, with the great circle always on the polar side',
    '<b>On a Mercator chart the rhumb line is straight and the great circle is curved</b>, concave towards the <b>equator</b> — that is, it bows towards the <b>nearer pole</b>. Northern-hemisphere routes bow north, southern-hemisphere routes bow south, and a route crossing the equator has a great circle that changes its side of curvature where it crosses. Because the great circle is not straight, radio bearings (which travel along great circles) must be <b>converted</b> to rhumb-line bearings, using the conversion angle, before they are plotted on a Mercator chart.')
f.L(40, 170, 720, 170, 'cool', 1.6); f.T(36, 174, 'EQ', 10, 'cool', 'end', bold=True)
for x in (120, 380, 640): f.L(x, 30, x, 310, 'line', 1.2)
f.L(120, 140, 640, 50, 'hot', 2.2); f.P('M120,140 Q360,40 640,50', 'green', 2.4)
f.L(120, 200, 640, 290, 'hot', 2.2); f.P('M120,200 Q360,300 640,290', 'green', 2.4)
f.T(390, 112, 'RL', 10.5, 'hot', bold=True); f.T(330, 64, 'GC', 10.5, 'green', bold=True); f.T(390, 236, 'RL', 10.5, 'hot', bold=True); f.T(330, 290, 'GC', 10.5, 'green', bold=True)
f.T(650, 74, 'N hemisphere:', 9.5, 'ink'); f.T(650, 88, 'GC bows north', 9.5, 'green')
f.T(650, 260, 'S hemisphere:', 9.5, 'ink'); f.T(650, 274, 'GC bows south', 9.5, 'green')
f.T(380, 326, 'RL = rhumb line (straight).  GC = great circle (curves towards the nearer pole).', 10, 'dim', 'middle')
NV.append(f)

# 032 GC vs RL route
f = N('032_figure_01', 'Great Circle vs Rhumb Line — A Real Route', 760, 330, 'A Mercator outline with a great-circle route arcing far north between two cities at similar latitude and a straight rhumb line between them',
    '<b>Example: Vancouver (49°N 123°W) to Moscow (56°N 037°E).</b> On a Mercator chart the rhumb line is a nearly horizontal straight line, but the great circle arcs far to the north, over Greenland and close to the Arctic. Although it looks much longer on the chart, the great circle is the <b>shorter</b> route on the Earth — the chart stretches high latitudes. For long-range flight planning a <b>great circle</b> is plotted on a Lambert or polar chart (where it is nearly straight) and broken into rhumb-line legs of a few hundred miles, each flown on a constant heading, so the aircraft follows the great circle closely.')
f.R(40, 40, 680, 250, c='line', sw=1.2, fill='g2', rx=0)
for la, y in ((70, 70), (60, 120), (50, 170), (40, 210)): f.L(40, y, 720, y, 'line', 1); f.T(34, y + 4, f'{la}°N', 9, 'dim', 'end')
A, B = (110, 180), (620, 156)
f.L(A[0], A[1], B[0], B[1], 'hot', 2.6); f.P(f'M{A[0]},{A[1]} Q360,0 {B[0]},{B[1]}', 'cool', 2.6)
for p, lab, anc in ((A, 'Vancouver 49°N', 'start'), (B, 'Moscow 56°N', 'end')): f.Ci(p[0], p[1], 5, 'ink', 1, 'white'); f.T(p[0] + (8 if anc == 'start' else -8), p[1] + 20, lab, 10, 'ink', anc, bold=True)
f.T(360, 80, 'great circle: SHORTER, though it looks longer', 10.5, 'cool', 'middle', bold=True)
f.T(360, 192, 'rhumb line: constant direction, longer', 10.5, 'hot', 'middle', bold=True)
f.T(380, 314, 'Mercator stretches high latitudes, so the great-circle arc looks long but is the shortest route.', 10, 'ink', 'middle', bold=True)
NV.append(f)

# 292 conic projection
f = N('292_figure_02', 'The Conic Projection', 760, 340, 'A cone placed over the globe touching along a parallel, and the cone unrolled into a fan-shaped chart',
    '<b>A cone fits the middle latitudes.</b> In a simple conic projection a cone is placed over the globe touching it along one parallel, the <b>parallel of origin</b>; meridians project as straight lines meeting at the cone’s apex and parallels as arcs of circles. Cut the cone along one meridian and unroll it, and the result is a <b>fan-shaped</b> chart. Scale is correct along the parallel of origin. The <b>Lambert conformal</b> chart refines this with a cone that <b>cuts</b> the Earth along <b>two standard parallels</b>, giving very small scale error over a wide band of latitude — ideal for mid-latitude navigation charts, on which a great circle is very nearly a straight line.')
cx, cy, R = 160, 210, 70
globe(f, cx, cy, R, par=(0, 30, 60), mer=(0.5,))
poly(f, [(cx, 60), (cx - 104, 230), (cx + 104, 230)], fill='gold', c='gold', sw=1.6, op=0.3)
f.L(cx - 62, cy - 34, cx + 62, cy - 34, 'hot', 2.4); f.T(250, 160, 'parallel of origin', 9.5, 'hot', bold=True)
f.T(cx, 50, 'apex', 9.5, 'dim', 'middle')
ap = (520, 40)
for a in range(150, 211, 10): p = pol(ap[0], ap[1], 280, a); f.L(ap[0], ap[1], p[0], p[1], 'line', 1)
for r, c_, sw in ((150, 'line', 1), (200, 'hot', 2.4), (250, 'line', 1)):
    a_, b_ = pol(ap[0], ap[1], r, 150), pol(ap[0], ap[1], r, 210); f.P(f'M{a_[0]:.1f},{a_[1]:.1f} A{r},{r} 0 0 1 {b_[0]:.1f},{b_[1]:.1f}', c_, sw)
f.T(520, 300, 'the cone unrolled: a fan-shaped chart', 10, 'ink', 'middle', bold=True)
f.L(290, 180, 360, 180, 'dim', 1.6, me='dim')
NV.append(f)

# 344 Lambert convergence factor
f = N('344_figure_01', 'Lambert Chart — Convergence Factor', 760, 340, 'A Lambert chart fan of meridians where the angle between two meridians equals the change of longitude times the constant of the cone',
    '<b>On a Lambert chart the meridians converge by a fixed proportion.</b> The angle between two meridians on the chart is <b>change of longitude × n</b>, where <b>n</b> is the <b>constant of the cone</b> (the convergence factor), equal to <b>sin(parallel of origin)</b>. It is the same anywhere on the chart, which is why a straight line on a Lambert chart closely approximates a great circle. Example: parallel of origin 45°N, n = sin 45° = 0.707; meridians 100° of longitude apart converge by 100 × 0.707 = <b>70.7°</b> on the chart. Chart convergency is correct at the parallel of origin, too small nearer the equator and too large nearer the pole.')
ap = (380, 20)
for i, a in enumerate(range(145, 216, 7)):
    p = pol(ap[0], ap[1], 300, a); f.L(ap[0], ap[1], p[0], p[1], 'line' if 0 < i < 10 else 'gold', 1 if 0 < i < 10 else 2.2)
a1, a2 = pol(ap[0], ap[1], 200, 145), pol(ap[0], ap[1], 200, 215); f.P(f'M{a1[0]:.1f},{a1[1]:.1f} A200,200 0 0 1 {a2[0]:.1f},{a2[1]:.1f}', 'line', 1)
ang(f, ap[0], ap[1], 90, 145, 215, 'hot', 2.2); f.T(380, 128, '70.7°', 12, 'hot', 'middle', bold=True)
p1, p2 = pol(ap[0], ap[1], 300, 145), pol(ap[0], ap[1], 300, 215); f.T(p2[0] - 6, p2[1] + 16, '100°W', 10, 'gold', 'end', bold=True); f.T(p1[0] + 6, p1[1] + 16, '0°', 10, 'gold', bold=True)
f.R(470, 40, 270, 64, c='gold', sw=1.6, fill='g2'); f.T(605, 64, 'chart convergence = ch.long × n', 11, 'gold', 'middle', bold=True); f.T(605, 86, 'n = sin (parallel of origin)', 10, 'dim', 'middle')
note(f, 30, 50, ['Example', 'parallel of origin 45°N', 'n = 0.707', '100° × 0.707 = 70.7°'], first='ink', lh=16)
NV.append(f)

# 348 Lambert scale
f = N('348_figure_01', 'Lambert Chart — Scale & the Standard Parallels', 760, 330, 'A Lambert chart band with scale correct on two standard parallels, least between them, and expanding outside',
    '<b>Scale on a Lambert chart.</b> It is correct along the two <b>standard parallels</b>; <b>between</b> them it is slightly too small, contracting most at the parallel of origin midway between; <b>outside</b> them it is slightly too large and expands increasingly towards the edges. With the standard parallels at one-sixth and five-sixths of the band the error is under about 1% — small enough that distances may be measured with a constant scale line, and why ICAO 1:1 000 000 and 1:500 000 aeronautical charts use this projection. In the example the standard parallels are 47°N and 43°N, with the parallel of origin at about 45°N.')
ap = (380, -360)
for r, c_, sw, lab, d in ((410, 'ink', 1, '48°N', 'scale expanded'), (440, 'cool', 2.4, '47°N', 'standard parallel: correct'), (500, 'hot', 2.4, '45°N', 'parallel of origin: least'), (560, 'cool', 2.4, '43°N', 'standard parallel: correct'), (590, 'ink', 1, '42°N', 'scale expanded')):
    a_, b_ = pol(ap[0], ap[1], r, 160), pol(ap[0], ap[1], r, 200); f.P(f'M{a_[0]:.1f},{a_[1]:.1f} A{r},{r} 0 0 1 {b_[0]:.1f},{b_[1]:.1f}', c_, sw)
    f.T(b_[0] - 8, b_[1] + 4, lab, 9.5, c_ if c_ != 'ink' else 'dim', 'end'); f.T(a_[0] + 8, a_[1] + 4, d, 9.5, c_ if c_ != 'ink' else 'dim', bold=(c_ != 'ink'))
for a in range(160, 201, 8): p, q = pol(ap[0], ap[1], 410, a), pol(ap[0], ap[1], 590, a); f.L(p[0], p[1], q[0], q[1], 'line', 1)
f.T(380, 290, 'Scale correct on the standard parallels, contracted between, expanded outside.', 10.5, 'ink', 'middle', bold=True)
f.T(380, 310, 'Error stays under about 1%: a constant scale line may be used.', 10, 'dim', 'middle')
NV.append(f)

# 351 GC straight on Lambert
f = N('351_figure_02', 'Great Circle ≈ Straight Line on a Lambert Chart', 760, 320, 'A Lambert chart with the great circle between two points drawn as an almost straight line and the rhumb line curving away from the pole',
    '<b>Why Lambert charts are used for radio navigation.</b> Because chart convergence equals real convergency at the parallel of origin and is very close to it elsewhere, a <b>great circle is very nearly a straight line</b> on a Lambert chart — exactly straight only where it crosses the parallel of origin, and curving very slightly, <b>concave towards the parallel of origin</b>, elsewhere. Radio bearings, which follow great circles, can therefore be plotted with a ruler, measured from the meridian at the <b>station</b>. A <b>rhumb line</b>, by contrast, appears as a <b>curve</b>, concave towards the nearer pole.')
ap = (380, -260)
for r in (360, 430, 500): a_, b_ = pol(ap[0], ap[1], r, 160), pol(ap[0], ap[1], r, 200); f.P(f'M{a_[0]:.1f},{a_[1]:.1f} A{r},{r} 0 0 1 {b_[0]:.1f},{b_[1]:.1f}', 'line', 1)
for a in range(160, 201, 10): p, q = pol(ap[0], ap[1], 360, a), pol(ap[0], ap[1], 500, a); f.L(p[0], p[1], q[0], q[1], 'line', 1)
A, B = pol(ap[0], ap[1], 470, 196), pol(ap[0], ap[1], 400, 164)
f.L(A[0], A[1], B[0], B[1], 'green', 2.6); f.P(f'M{A[0]:.1f},{A[1]:.1f} Q380,232 {B[0]:.1f},{B[1]:.1f}', 'hot', 2.2, dash='7 4')
for p, lab in ((A, 'A'), (B, 'B')): f.Ci(p[0], p[1], 5, 'ink', 1, 'white'); f.T(p[0], p[1] - 10, lab, 11, 'ink', 'middle', bold=True)
f.T(380, 166, 'great circle: almost straight', 10.5, 'green', 'middle', bold=True); f.T(380, 250, 'rhumb line: curved', 10.5, 'hot', 'middle', bold=True)
f.T(380, 300, 'Radio bearings follow great circles: plot them straight, measured at the station meridian.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 132_02 crossing current solution
f = N('132_figure_02', 'Crossing a Current — The Vector Solution', 760, 330, 'The boat pointed upstream so that its velocity through the water plus the current gives a path straight across the river',
    '<b>Head into the current.</b> To cross 10 nm from A to B against a 5 kt current, the boat must point upstream so that the sideways part of its own speed exactly cancels the current. The three vectors form a triangle: <b>boat through the water</b> (its heading and speed), <b>current</b> (set and rate) and <b>path over the ground</b> (the resultant). With a boat speed of 10 kt the crossing needs a heading 30° upstream and makes good about 8.7 kt over the ground, taking about 69 minutes. This is the <b>triangle of velocities</b>: replace boat with aircraft, water speed with TAS and current with wind.')
f.R(140, 50, 400, 230, c='none', sw=0, fill=SEA, rx=0); f.L(120, 50, 560, 50, 'ink', 1.8); f.L(120, 280, 560, 280, 'ink', 1.8)
A, B = (340, 280), (340, 50)
f.L(A[0], A[1], B[0], B[1] + 6, 'green', 2.6, me='green'); f.T(352, 160, 'ground path', 10.5, 'green', bold=True); f.T(352, 174, '8.7 kt', 10.5, 'green')
C = (A[0] - 115, A[1] - 199); f.L(A[0], A[1], C[0] + 4, C[1] + 6, 'gold', 2.6, me='gold'); f.T(212, 160, 'heading and', 10, 'gold', 'end', bold=True); f.T(212, 174, 'speed: 10 kt', 10, 'gold', 'end')
f.L(C[0], C[1], B[0] - 6, B[1] + 32, 'cool', 2.6, me='cool'); f.T(266, 74, 'current 5 kt', 10, 'cool', bold=True)
ang(f, A[0], A[1], 60, 0, -30, 'white', 1.6); f.T(318, 208, '30°', 10, 'white', bold=True)
f.Ci(A[0], A[1], 5, 'ink', 1, 'white'); f.Ci(B[0], B[1], 5, 'ink', 1, 'white'); f.T(A[0], 302, 'A', 11, 'ink', 'middle', bold=True); f.T(B[0] + 12, 44, 'B', 11, 'ink', bold=True)
note(f, 580, 80, ['Point upstream so the', 'current is cancelled.'], first='gold')
note(f, 580, 150, ['sin(angle) = current /', 'boat speed = 5/10:', 'angle = 30°'], first='ink')
note(f, 580, 236, ['10 nm at 8.7 kt', '≈ 69 minutes'], first='green')
NV.append(f)

# 165 two tracks relative motion
f = N('165_figure_01', 'Relative Motion — Two Aircraft from One Point', 760, 320, 'Two aircraft leaving the same point on slightly different tracks at different speeds, and the vector between them',
    '<b>How fast are two aircraft separating?</b> Two aircraft leave point A together: one on 040° at 120 kt, the other on 075° at 140 kt. Their positions after any time are found by plotting each track and distance, and the line joining them is their separation. The rate at which that separation grows is the <b>relative velocity</b>: the vector difference of the two ground velocities. Draw both velocity vectors from one point; the line joining their tips is the relative velocity, in both direction and speed. The same method solves interception, closing speed and “where will the other aircraft be when I get there” problems.')
O = (90, 270)
f.L(O[0], O[1], O[0], 40, 'ink', 1.4, me='ink'); f.T(O[0], 32, 'N', 10, 'ink', 'middle', bold=True)
p1 = pol(O[0], O[1], 300, 40); p2 = pol(O[0], O[1], 360, 75)
f.L(O[0], O[1], p1[0], p1[1], 'cool', 2.4, me='cool'); f.L(O[0], O[1], p2[0], p2[1], 'gold', 2.4, me='gold')
f.L(p1[0], p1[1], p2[0], p2[1], 'hot', 2.4, me='hot', dash='6 4')
f.T(p1[0] + 8, p1[1] - 4, '040° at 120 kt', 10, 'cool', bold=True); f.T(p2[0] + 8, p2[1] + 16, '075° at 140 kt', 10, 'gold', bold=True)
f.T((p1[0] + p2[0]) / 2 + 10, (p1[1] + p2[1]) / 2 + 4, 'relative velocity', 10, 'hot', bold=True)
ang(f, O[0], O[1], 70, 0, 40, 'cool', 1.4); ang(f, O[0], O[1], 90, 0, 75, 'gold', 1.4)
f.Ci(O[0], O[1], 5, 'ink', 1, 'hot'); f.T(O[0] - 10, O[1] + 4, 'A', 11, 'ink', 'end', bold=True)
f.T(380, 306, 'Relative velocity = difference between the two velocity vectors (joins their tips).', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 181 crosswind & headwind components
f = N('181_figure_02', 'Crosswind & Headwind Components', 760, 330, 'A runway on 270 degrees with a wind from 300 degrees at 30 knots resolved into a headwind and a crosswind component',
    '<b>Resolving the wind for take-off and landing.</b> Split the wind into a component <b>along</b> the runway and one <b>across</b> it, using the angle between wind direction and runway direction. <b>Headwind = wind speed × cos(angle)</b>; <b>crosswind = wind speed × sin(angle)</b>. Example: runway 27 (270°M), wind 300°M at 30 kt: angle 30°, headwind 30 × cos 30° = <b>26 kt</b>, crosswind 30 × sin 30° = <b>15 kt</b> from the right. Rule of thumb: for angles of 30°, 45° and 60° the crosswind is ½, ¾ and 9/10 of the wind speed. Compare the crosswind with the aircraft’s maximum demonstrated crosswind.')
f.R(60, 230, 640, 46, c='ink', sw=1.2, fill='steel', rx=0); f.L(80, 253, 680, 253, 'white', 1.6, dash='14 10'); f.T(640, 262, '27', 16, 'white', 'middle', bold=True, check=False)
f.L(660, 300, 120, 300, 'dim', 1.6, me='dim'); f.T(380, 318, 'landing direction 270°(M)', 10, 'dim', 'middle')
W = (380, 236); S = (W[0] + 230 * math.cos(math.radians(30)), W[1] - 230 * math.sin(math.radians(30)))
f.L(S[0], S[1], W[0] + 6, W[1] - 4, 'cool', 3, me='cool'); f.T(S[0] - 20, S[1] - 12, 'wind 300°(M) / 30 kt', 11, 'cool', 'end', bold=True)
f.L(S[0], S[1], S[0], W[1] - 6, 'hot', 2.4, dash='6 4', me='hot'); f.T(S[0] + 10, (S[1] + W[1]) / 2, 'crosswind 15 kt', 10.5, 'hot', bold=True)
f.L(S[0], W[1] - 2, W[0] + 6, W[1] - 2, 'gold', 2.4, me='gold'); f.T(W[0] - 10, W[1] - 14, 'headwind 26 kt', 10.5, 'gold', 'end', bold=True)
ang(f, W[0], W[1], 70, 90, 60, 'white', 1.4); f.T(W[0] + 80, W[1] - 10, '30°', 10, 'white', bold=True)
table(f, 60, 40, [110, 110, 130], ['angle', 'crosswind', 'headwind'], [('30°', '½ × wind', '0.9 × wind'), ('45°', '0.7 × wind', '0.7 × wind'), ('60°', '0.9 × wind', '½ × wind')], 'gold')
NV.append(f)

# 134 triangle of velocities
f = N('134_figure_02', 'The Triangle of Velocities', 760, 340, 'A vector triangle with heading and true airspeed, wind velocity, and track and ground speed, with the drift angle',
    '<b>The basis of dead-reckoning navigation.</b> Three vectors form a closed triangle. The <b>air vector</b> is the aircraft’s <b>heading and true airspeed</b> (one arrow). The <b>wind vector</b> is the <b>wind velocity</b> — direction it blows towards and speed (three arrows). Their sum is the <b>ground vector</b>: <b>track and ground speed</b> (two arrows). The angle between heading and track is the <b>drift</b> — wind from the left drifts the aircraft right (starboard drift). Know any four of the six quantities and the triangle gives the other two, on the navigation computer or by drawing. The wind arrows always run from the end of the air vector to the end of the ground vector.')
O = (230, 300); H = pol(O[0], O[1], 230, 10); T = pol(O[0], O[1], 250, 28)
f.L(O[0], O[1], H[0], H[1], 'gold', 3); f.L(H[0], H[1], T[0], T[1], 'cool', 3); f.L(O[0], O[1], T[0], T[1], 'green', 3)
for p, q, n, c_ in ((O, H, 1, 'gold'), (H, T, 3, 'cool'), (O, T, 2, 'green')):
    for k in range(n):
        m = 0.55 + k * 0.06; x, y = p[0] + (q[0] - p[0]) * m, p[1] + (q[1] - p[1]) * m; a = math.degrees(math.atan2(q[0] - p[0], p[1] - q[1]))
        l_, r_ = pol(x, y, 12, a + 155), pol(x, y, 12, a - 155); f.P(f'M{x:.1f},{y:.1f} L{l_[0]:.1f},{l_[1]:.1f} L{r_[0]:.1f},{r_[1]:.1f} Z', c_, 1, c_)
f.T(H[0] - 74, (O[1] + H[1]) / 2 - 20, 'heading and TAS', 11, 'gold', 'end', bold=True); f.T(H[0] - 74, (O[1] + H[1]) / 2 - 6, '(air vector, one arrow)', 9.5, 'dim', 'end')
f.T((H[0] + T[0]) / 2 + 12, (H[1] + T[1]) / 2 - 18, 'wind velocity', 11, 'cool', bold=True); f.T((H[0] + T[0]) / 2 + 12, (H[1] + T[1]) / 2 - 4, '(three arrows)', 9.5, 'dim')
f.T(T[0] - 20, (O[1] + T[1]) / 2 + 30, 'track and ground speed', 11, 'green', bold=True); f.T(T[0] - 20, (O[1] + T[1]) / 2 + 44, '(ground vector, two arrows)', 9.5, 'dim')
ang(f, O[0], O[1], 70, 10, 28, 'hot', 2); f.T(O[0] + 8, O[1] - 76, 'drift', 10, 'hot', 'end', bold=True)
note(f, 520, 70, ['Know any four of:', 'heading, TAS, wind direction,', 'wind speed, track, ground speed', '— the triangle gives the other two.'], first='ink')
NV.append(f)

# 205 track error
f = N('205_figure_03', 'Track Error — Track Made Good vs Planned Track', 760, 300, 'From a starting point, the planned track, the heading flown and the track actually made good, with track error and drift angle marked',
    '<b>Three directions from the same start point.</b> The <b>planned track</b> (here 090°) is the line intended. The <b>heading</b> (here 100°) is where the nose was pointed. The <b>track made good (TMG)</b> is the line actually achieved over the ground, found from a fix. The angle between planned track and TMG is the <b>track error (TE)</b>; the angle between heading and TMG is the actual <b>drift</b>. If the TMG is <b>left</b> of the planned track the aircraft is drifting left more than planned and the correction is to turn <b>right</b>. Track error is found with the 1-in-60 rule from the distance off track and the distance gone.')
O = (60, 160)
for a, lab, c_ in ((90, 'planned track 090°', 'ink'), (100, 'heading 100°', 'hot'), (84, 'track made good', 'green')):
    p = pol(O[0], O[1], 560, a); f.L(O[0], O[1], p[0], p[1], c_, 2.2, me=c_); f.T(p[0] + 8, p[1] + 4, lab, 10.5, c_, bold=True)
ang(f, O[0], O[1], 210, 84, 90, 'gold', 2); f.T(O[0] + 214, O[1] - 12, 'track error', 10, 'gold', bold=True)
ang(f, O[0], O[1], 130, 84, 100, 'cool', 2); f.T(O[0] + 136, O[1] + 34, 'drift', 10, 'cool', bold=True)
f.Ci(O[0], O[1], 5, 'ink', 1, 'white'); f.T(O[0] - 8, O[1] + 4, 'start', 10, 'ink', 'end')
f.T(380, 284, 'TMG left of the planned track: turn right to correct (and allow for the extra drift).', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

# 207 regaining track
f = N('207_figure_03', 'Regaining Track with the 1-in-60 Rule', 760, 320, 'A leg of sixty nautical miles with the aircraft four miles off track after thirty miles, and the heading changes to parallel or to reach the destination',
    '<b>The two-part correction.</b> After 30 nm the aircraft is found 4 nm right of track. <b>Track error</b> = 4 × 60 ÷ 30 = <b>8°</b>: alter heading 8° left and the aircraft flies <b>parallel</b> to the planned track, 4 nm off. To regain track at the destination 30 nm further on, the <b>closing angle</b> = 4 × 60 ÷ 30 = another <b>8°</b>. Total alteration: 8° + 8° = <b>16° left</b> to reach the destination. Once on track, turn back by the closing angle (8°) to hold it. When the distance to go equals the distance gone, the total correction is simply twice the track error.')
f.L(60, 240, 700, 240, 'ink', 2, dash='8 6'); f.T(60, 262, 'start', 10, 'ink', 'middle'); f.Ci(700, 240, 6, 'gold', 1, 'gold'); f.T(700, 262, 'destination', 10, 'gold', 'middle', bold=True)
P = (380, 158); f.L(60, 240, P[0], P[1], 'hot', 2.4, me='hot'); f.Ci(P[0], P[1], 5, 'hot', 1, 'hot'); f.T(P[0] - 6, P[1] - 12, 'fix: 4 nm right of track', 10, 'hot', 'end', bold=True)
f.L(P[0], P[1], 700, P[1], 'cool', 2, dash='6 4', me='cool'); f.T(560, P[1] - 10, 'parallel track: alter 8°', 10, 'cool', 'middle', bold=True)
f.L(P[0], P[1], 694, 238, 'green', 2.4, me='green'); f.T(560, 222, 'to destination: alter 16°', 10, 'green', 'middle', bold=True)
f.L(P[0], P[1] + 6, P[0], 234, 'gold', 1.4, me='gold', ms='gold'); f.T(P[0] + 6, 210, '4 nm', 10, 'gold', bold=True)
f.L(60, 290, P[0], 290, 'dim', 1.2, me='dim', ms='dim'); f.T(220, 306, '30 nm gone', 9.5, 'dim', 'middle'); f.L(P[0], 290, 700, 290, 'dim', 1.2, me='dim', ms='dim'); f.T(540, 306, '30 nm to go', 9.5, 'dim', 'middle')
f.T(380, 40, 'track error = 4 × 60 / 30 = 8°      closing angle = 4 × 60 / 30 = 8°', 11, 'ink', 'middle', bold=True)
f.T(380, 62, 'total alteration = track error + closing angle = 16° left', 11, 'gold', 'middle', bold=True)
f.T(380, 120, 'vertical scale exaggerated', 9, 'faint', 'middle')
NV.append(f)

# 217 descent gradient
f = N('217_figure_01', '1-in-60 Applied to Descent Gradient', 760, 320, 'A side view of a descent to a runway with the height, the range and the descent angle',
    '<b>Angles and gradients by the same rule.</b> One nautical mile is about 6 080 ft, so on a 1° slope the height changes by about <b>100 ft per nm</b> (6 080 ÷ 60). A <b>3° glide path</b> therefore loses <b>300 ft per nm</b>. Height to lose ÷ 300 gives the descent distance; and <b>rate of descent (ft/min) ≈ ground speed (kt) × 5</b> on a 3° path (300 ft per nm × GS ÷ 60). Example: 3 000 ft above the runway on a 3° approach, start descent 10 nm out; at 120 kt GS descend at about 600 ft/min. A 5% gradient is about 300 ft per nm too.')
f.L(40, 270, 720, 270, 'ink', 1.6); f.R(60, 266, 110, 8, c='ink', sw=1, fill='dim', rx=0); f.T(56, 262, 'runway', 9.5, 'dim', 'end')
f.L(120, 270, 640, 100, 'gold', 2.6); f.raw(aircraft(650, 94, -18, 0.32))
f.L(640, 104, 640, 266, 'hot', 1.8, me='hot', ms='hot'); f.T(650, 190, 'height: 3 000 ft', 10.5, 'hot', bold=True)
f.L(124, 290, 636, 290, 'cool', 1.6, me='cool', ms='cool'); f.T(380, 308, 'range: 10 nm', 10.5, 'cool', 'middle', bold=True)
ang(f, 120, 270, 100, 90, 72, 'white', 1.6); f.T(230, 256, '3°', 11, 'white', bold=True)
note(f, 60, 50, ['1° = about 100 ft per nm', '3° = about 300 ft per nm', 'ROD (ft/min) ≈ GS × 5 on 3°'], first='gold', lh=17)
NV.append(f)

# 489 cocked hat
f = N('489_figure_02', "Fixing by Position Lines — The 'Cocked Hat'", 760, 340, 'Three position lines that fail to meet at a point, forming a small triangle, with the fix taken at its centre',
    '<b>Three position lines rarely meet exactly.</b> A <b>position line</b> is a line on which the aircraft is known to lie — from a bearing, a radial or a DME range. Two lines crossing give a <b>fix</b>; a third line checks it, and because every bearing carries a small error the three usually form a little triangle, the <b>cocked hat</b>. Take the fix at the point found by visually <b>bisecting the angles</b> of the triangle. A small cocked hat means good bearings; a large one means at least one bearing is wrong and the fix should be treated with caution. Lines that cross at angles close to <b>90°</b> give the most accurate fix; shallow crossing angles magnify errors.')
L1 = ((80, 290), (500, 40)); L2 = ((140, 50), (420, 310)); L3 = ((60, 250), (560, 196))
for (a, b), c_, lab in ((L1, 'cool', 'position line 1'), (L2, 'gold', 'position line 2'), (L3, 'green', 'position line 3')):
    f.L(a[0], a[1], b[0], b[1], c_, 2, me=c_, ms=c_); f.T(b[0] + 6, b[1] + 4, lab, 10, c_, bold=True)
def inter(p1, p2, p3, p4):
    x1, y1 = p1; x2, y2 = p2; x3, y3 = p3; x4, y4 = p4; d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d; return (x1 + t * (x2 - x1), y1 + t * (y2 - y1))
P = [inter(*L1, *L2), inter(*L2, *L3), inter(*L1, *L3)]
poly(f, P, fill='hot', c='hot', sw=1.6, op=0.3)
C = (sum(p[0] for p in P) / 3, sum(p[1] for p in P) / 3); f.Ci(C[0], C[1], 4, 'hot', 1, 'hot'); f.Ci(C[0], C[1], 16, 'hot', 1.6)
f.T(C[0] - 60, C[1] + 70, 'FIX: centre of the cocked hat', 11, 'hot', 'end', bold=True); f.L(C[0] - 58, C[1] + 64, C[0] - 10, C[1] + 10, 'hot', 1)
note(f, 560, 230, ['Small cocked hat:', 'good bearings.', 'Large: treat with caution.'], first='ink')
f.T(380, 330, 'Lines crossing near 90° give the most accurate fix.', 10.5, 'ink', 'middle', bold=True)
NV.append(f)

gallery(NV, 'Navigation Gallery 2', 'General Navigation — Time, Charts & Dead Reckoning', 'Original figures for time and the seasons, chart projections, relative velocity, the triangle of velocities and the 1-in-60 rule.', 'nav2-gallery.html')
print(f'NAV2 {len(NV)}  QA warnings: {len(WARN)}')
for w in WARN: print('  ⚠', w)
