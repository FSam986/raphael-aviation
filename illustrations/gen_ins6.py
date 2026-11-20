#!/usr/bin/env python3
"""Instruments extra B (chapters 20-33): radio altimeter, EFIS/FMS, flight director, HSI, autopilot, autothrottle, yaw damper, warnings, stall."""
import math
from figlib import *
from ins_common import *

IN = []

def tapes(f, x0, y0, w=300, h=200, uid='p'):
    screen(f, x0, y0, w, h); att(f, x0 + w / 2, y0 + h / 2, w * 0.5, h * 0.62, uid=uid)
    f.R(x0 + 8, y0 + 20, 44, h - 40, c='line', sw=1, fill='#232b30', rx=2); f.R(x0 + w - 52, y0 + 20, 44, h - 40, c='line', sw=1, fill='#232b30', rx=2)

f = I('20_03', 'Radio Altitude on the Attitude Display', 760, 300, 'An electronic attitude display showing the radio altitude readout, the decision height setting and the rising runway symbol on approach',
    '<b>Radio altitude where the pilot is looking.</b> Below about <b>2 500 ft</b> the radio altitude appears on the attitude display as a digital readout (here 180 ft). The selected <b>decision height</b> (DH) is shown alongside; at DH the display flashes and an aural “minimums” sounds. On many displays a <b>rising runway</b> symbol climbs towards the aircraft symbol below about 200 ft, giving a pictorial sense of height and of lateral (localiser) deviation during an autoland.')
tapes(f, 230, 40, 300, 220, 'r1')
f.R(410, 214, 70, 26, c='white', sw=1.4, fill='black', rx=2); f.T(445, 232, '180', 14, 'white', 'middle', bold=True, mono=True, check=False)
f.T(445, 60, 'DH 200', 11, 'cool', 'middle', bold=True, mono=True, check=False)
f.P('M366,232 L394,232 L388,214 L372,214 Z', 'mag', 1.6, 'none')
f.legend(560, 60, [(1, 'Radio altitude', 'shown below about 2 500 ft'), (2, 'Decision height', 'set by the pilot; alert at DH'), (3, 'Rising runway', 'rises below 200 ft; shows localiser')], step=52)
f.badge(500, 226, 1); f.badge(492, 56, 2); f.badge(352, 222, 3)
IN.append(f)

f = I('21_02', 'FMS Control Display Unit (CDU)', 760, 300, 'A control display unit with a screen, six line select keys each side, a scratchpad line, function keys and an alphanumeric keypad',
    '<b>The crew’s keyboard to the FMS.</b> The <b>CDU</b> has a screen with <b>six line-select keys</b> (LSK) down each side for choosing or entering data on that line, and a <b>scratchpad</b> on the bottom line where typed entries appear before being line-selected into place. <b>Function keys</b> call up pages — INIT REF, RTE, DEP ARR, LEGS, HOLD, PROG — and the <b>EXEC</b> key (lit when a change is pending) activates a modified route. Two CDUs allow each pilot to work independently.')
f.R(200, 20, 280, 270, c='line', sw=2, fill='g3', rx=8); screen(f, 230, 32, 220, 130)
for k in range(6):
    y = 44 + k * 19; f.R(208, y, 18, 12, c='ink', sw=1, fill='g2', rx=2); f.R(454, y, 18, 12, c='ink', sw=1, fill='g2', rx=2)
f.T(340, 52, 'ACT RTE 1 LEGS', 10, 'white', 'middle', bold=True, mono=True, check=False)
for k, t in enumerate(('FAOR   045°', 'APLES  /FL120', 'TEBLI  /FL240', 'GBV    /FL350')): f.T(240, 74 + k * 19, t, 9.5, 'green' if k else 'mag', mono=True, check=False)
f.T(240, 156, 'FL370', 10, 'white', mono=True, check=False)
for k, t in enumerate(('INIT', 'RTE', 'DEP', 'LEGS', 'HOLD', 'PROG')): f.R(230 + k * 37, 172, 32, 18, c='ink', sw=1, fill='g2', rx=2); f.T(246 + k * 37, 185, t, 8, 'ink', 'middle', bold=True, check=False)
f.R(410, 200, 42, 18, c='green', sw=1.4, fill='g2', rx=2); f.T(431, 213, 'EXEC', 8.5, 'green', 'middle', bold=True, check=False)
for r in range(3):
    for c_ in range(6): f.R(230 + c_ * 28, 200 + r * 26, 24, 20, c='ink', sw=1, fill='g2', rx=2)
f.legend(520, 40, [(1, 'Line-select keys', '6 each side: select or enter data'), (2, 'Scratchpad', 'typed entries before selection'), (3, 'Function keys', 'call up pages'), (4, 'EXEC', 'activates a modified route')], step=52)
f.badge(194, 70, 1); f.badge(216, 150, 2); f.badge(216, 180, 3); f.badge(466, 210, 4)
IN.append(f)

f = I('22_02', 'EFIS Control Panel', 760, 260, 'An EFIS control panel with a mode selector, range selector, map option buttons and a minimums selector',
    '<b>Choosing what the displays show.</b> Each pilot’s <b>EFIS control panel</b> sets their own displays: the <b>mode selector</b> picks the navigation display format — APP, VOR, MAP or PLAN — and centred or expanded (arc) view; the <b>range selector</b> sets the map scale (e.g. 10–640 nm); <b>map buttons</b> add weather radar, stations, waypoints, airports and data; the <b>minimums</b> knob sets the radio (DH) or baro (DA) minimum; and the <b>baro</b> knob sets the altimeter setting.')
f.R(40, 50, 680, 150, c='line', sw=2, fill='g3', rx=8)
for x, lab, opts in ((130, 'MODE', ('APP', 'VOR', 'MAP', 'PLN')), (330, 'RANGE', ('10', '40', '160', '640')), (620, 'MINIMUMS', ('RADIO', 'BARO'))):
    f.Ci(x, 130, 30, 'ink', 2, 'g2'); f.L(x, 130, x + 14, 106, 'white', 3); f.T(x, 186, lab, 10, 'gold', 'middle', bold=True)
    for k, o in enumerate(opts): a = -70 + k * (140 / max(1, len(opts) - 1)); p = pol(x, 130, 48, a); f.T(p[0], p[1] + 4, o, 8.5, 'ink', 'middle', check=False)
for k, t in enumerate(('WXR', 'STA', 'WPT', 'ARPT', 'DATA')): f.R(392 + k * 34, 110, 30, 22, c='ink', sw=1.2, fill='g2', rx=3); f.T(407 + k * 34, 125, t, 8, 'ink', 'middle', bold=True, check=False)
f.T(477, 186, 'MAP OPTIONS', 10, 'gold', 'middle', bold=True)
f.T(380, 236, 'Each pilot has an EFIS panel controlling their own PFD and ND.', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('22_05', 'Complete EFIS — PFD, ND & Control Panel', 760, 300, 'A primary flight display and navigation display side by side with the EFIS control panel above, and the symbol generator feeding both',
    '<b>How the parts fit.</b> The <b>primary flight display</b> (attitude, speed, altitude, heading, flight-mode annunciations) and the <b>navigation display</b> (map, route, weather, traffic) are drawn by a <b>symbol generator</b> (display computer) from the inertial or AHRS attitude, air data, FMS, radio navigation, weather radar and TCAS inputs. The <b>EFIS control panel</b> above selects the ND mode, range and options. If one display fails, its picture can be transferred to the other or to a centre screen.')
f.R(180, 20, 400, 40, c='line', sw=1.6, fill='g3', rx=6); f.T(380, 45, 'EFIS control panel', 10.5, 'ink', 'middle', bold=True)
tapes(f, 80, 80, 260, 170, 'r2'); f.T(210, 270, 'PFD', 12, 'cool', 'middle', bold=True)
screen(f, 420, 80, 260, 170); f.P('M470,210 A80,80 0 0 1 630,210', 'white', 1.6); f.P('M550,232 L542,246 L558,246 Z', 'white', 1.4, 'white'); f.P('M550,232 L590,140 L620,100', 'mag', 2.4)
f.Ci(590, 140, 4, 'mag', 1.4); f.T(550, 270, 'ND', 12, 'cool', 'middle', bold=True)
f.box(300, 262, 160, 32, ['symbol generator'], c='gold', size=10); f.L(340, 262, 300, 252, 'gold', 1.4, me='gold'); f.L(420, 262, 460, 252, 'gold', 1.4, me='gold')
IN.append(f)

def rose(f, cx, cy, r, hdg=0, arc=False):
    rng = range(-60, 61, 5) if arc else range(0, 360, 5)
    for d in rng:
        a = d if arc else d - hdg; big = (d % 30 == 0) if not arc else ((d + hdg) % 30 == 0)
        p, q = pol(cx, cy, r - (12 if (d % 10 == 0) else 6), a), pol(cx, cy, r, a); f.L(p[0], p[1], q[0], q[1], 'white', 1.4 if d % 10 == 0 else 0.8)
        if big:
            v = (d + hdg) % 360 if arc else d; x, y = pol(cx, cy, r - 24, a); f.T(x, y + 4, str(v // 10), 10, 'white', 'middle', bold=True, check=False)
f = I('22_06', 'Electronic HSI — Full Rose', 760, 300, 'An electronic HSI full compass rose with course pointer, deviation bar, to/from arrow, heading bug and glideslope scale',
    '<b>The HSI on a screen.</b> In full-rose (VOR or APP) mode the navigation display reproduces a <b>horizontal situation indicator</b>: a full <b>compass rose</b> with the aircraft heading at the top under the lubber line; the <b>course pointer</b> set to the selected VOR radial or ILS course; the <b>deviation bar</b> showing displacement from it against a dot scale (two dots each side: VOR 2° per dot, full scale 10°; localiser full scale about 2.5°); a <b>TO/FROM</b> indicator; the <b>heading bug</b>; and on an ILS, the <b>glideslope</b> pointer on the right.')
cx, cy = 240, 155; f.Ci(cx, cy, 120, 'line', 1.6, 'black'); rose(f, cx, cy, 116)
f.L(cx, cy - 104, cx, cy - 40, 'mag', 4); f.L(cx, cy + 40, cx, cy + 104, 'mag', 4); f.P(f'M{cx},{cy-108} l-8,14 l16,0 Z', 'mag', 1.4, 'mag')
f.L(cx + 22, cy - 38, cx + 22, cy + 38, 'mag', 4)
for k in (-2, -1, 1, 2): f.Ci(cx + k * 20, cy, 3.5, 'white', 1.2)
f.P(f'M{cx-6},{cy-54} l6,-10 l6,10 Z', 'white', 1.2, 'white')
f.P(f'M{cx},{cy-6} l0,22 M{cx-16},{cy+4} l32,0 M{cx-6},{cy+16} l12,0', 'gold', 2.4)
b = pol(cx, cy, 120, 30); f.R(b[0] - 6, b[1] - 6, 12, 12, c='mag', sw=1.4, fill='mag', rx=2)
for k in (-2, -1, 1, 2): f.Ci(cx + 140, cy + k * 20, 3.5, 'white', 1.2)
f.P(f'M{cx+134},{cy-14} l12,0 l-6,10 Z', 'mag', 1.4, 'mag')
f.legend(450, 40, [(1, 'Course pointer', 'selected radial or ILS course'), (2, 'Deviation bar', 'displacement from the course'), (3, 'TO/FROM', 'triangle points to or from'), (4, 'Heading bug', 'selected heading'), (5, 'Glideslope', 'pointer: fly towards it')], step=46)
f.badge(cx - 18, cy - 90, 1); f.badge(cx + 44, cy + 40, 2); f.badge(cx - 22, cy - 60, 3); f.badge(b[0] + 18, b[1] - 4, 4); f.badge(cx + 160, cy - 40, 5)
IN.append(f)

f = I('22_07', 'Electronic HSI — Arc (Expanded) Mode with Weather', 760, 300, 'A navigation display in expanded arc mode showing a 90 degree segment of the compass ahead with weather radar returns in green, amber and red',
    '<b>Expanded mode.</b> The arc mode shows only the sector <b>ahead</b> (about 90°) on a larger scale, with the aircraft symbol near the bottom. Weather radar returns can be overlaid: <b>green</b> light precipitation, <b>amber</b> moderate, <b>red</b> heavy, and <b>magenta</b> turbulence (on some radars). Range rings help judge distance. Crews use it to plan deviations — commonly around red cells by at least 20 nm.')
cx, cy = 260, 270; screen(f, 60, 20, 400, 268)
rose_r = 220
for d in range(-50, 51, 5):
    p, q = pol(cx, cy, rose_r - (12 if d % 10 == 0 else 6), d), pol(cx, cy, rose_r, d); f.L(p[0], p[1], q[0], q[1], 'white', 1.4 if d % 10 == 0 else 0.8)
for d, t in ((-30, '33'), (0, '36'), (30, '3')): x, y = pol(cx, cy, rose_r - 24, d); f.T(x, y + 4, t, 10, 'white', 'middle', bold=True, check=False)
f.P(f'M{cx-110},{cy} A110,110 0 0 1 {cx+110},{cy}', 'white', 1, dash='4 4')
for (x, y, rx, ry, c_) in ((340, 130, 50, 30, 'green'), (340, 130, 30, 18, 'amber'), (340, 130, 12, 8, 'hot'), (180, 160, 30, 18, 'green')): f.raw(f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{col(c_)}" opacity=".85"/>')
f.P(f'M{cx},{cy-14} l-8,14 l16,0 Z', 'white', 1.4, 'white'); f.L(cx, cy - 14, cx, 70, 'mag', 2)
table(f, 490, 60, [80, 150], ['colour', 'intensity'], [('green', 'light'), ('amber', 'moderate'), ('red', 'heavy'), ('magenta', 'turbulence')], 'gold')
f.T(590, 230, 'Avoid red cells by about 20 nm.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('22_10', 'Navigation Display — Map Mode', 760, 300, 'A navigation display in map mode with track-up arc, the active route in magenta, waypoints, a curved trend vector, and wind, ground speed and next-waypoint data',
    '<b>The moving map.</b> In <b>MAP</b> mode the display shows the aircraft symbol at the bottom, normally <b>track up</b>, and the FMS route ahead: the <b>active leg in magenta</b>, other legs white, waypoints as stars, airports and navaids if selected. Top left shows <b>ground speed and TAS</b>, below them <b>wind</b> direction/speed with an arrow; top right the <b>next waypoint</b>, its ETA and distance. A curved <b>trend vector</b> predicts the path over the next 30, 60 and 90 seconds. Range is set on the EFIS panel.')
screen(f, 60, 20, 400, 268); cx, cy = 260, 270
f.P(f'M{cx-200},{cy-40} A210,210 0 0 1 {cx+200},{cy-40}', 'white', 1.6)
f.P(f'M{cx},{cy-14} L{cx+40},{cy-120} L{cx+120},{cy-170}', 'mag', 2.6); f.P(f'M{cx+120},{cy-170} L{cx+170},{cy-180}', 'white', 2)
for (x, y, t) in ((cx + 40, cy - 120, 'APLES'), (cx + 120, cy - 170, 'TEBLI')): f.P(f'M{x},{y-7} L{x+2},{y-2} L{x+7},{y} L{x+2},{y+2} L{x},{y+7} L{x-2},{y+2} L{x-7},{y} L{x-2},{y-2} Z', 'mag', 1.4, 'none'); f.T(x + 10, y + 18, t, 9.5, 'mag', mono=True, check=False)
f.P(f'M{cx},{cy-14} Q{cx+4},{cy-60} {cx+20},{cy-90}', 'white', 1.4, dash='3 3')
f.P(f'M{cx},{cy-14} l-8,14 l16,0 Z', 'white', 1.4, 'white')
f.T(76, 44, 'GS 420  TAS 438', 10, 'white', mono=True, check=False); f.T(76, 62, '270°/35', 10, 'white', mono=True, check=False); f.L(140, 58, 150, 70, 'white', 1.6, me='white')
f.T(444, 44, 'APLES', 10, 'mag', 'end', mono=True, check=False); f.T(444, 62, '0843.2z  32 NM', 10, 'white', 'end', mono=True, check=False)
f.legend(490, 50, [(1, 'Active leg', 'magenta; other legs white'), (2, 'Trend vector', 'path over the next 30–90 s'), (3, 'GS, TAS, wind', 'top left'), (4, 'Next waypoint', 'ETA and distance, top right')], step=52)
f.badge(cx + 48, cy - 80, 1); f.badge(cx - 16, cy - 70, 2); f.badge(76, 84, 3); f.badge(444, 84, 4)
IN.append(f)

f = I('25_01', 'Flight Director System Architecture', 760, 300, 'Inputs from attitude, air data, radio navigation and the mode control panel feeding a flight director computer that drives the command bars',
    '<b>A computed steering command.</b> The <b>flight director computer</b> compares where the aircraft is with where the selected mode wants it to be. Inputs: <b>attitude</b> (AHRS/IRS), <b>air data</b> (altitude, speed), <b>radio navigation</b> (VOR, localiser, glideslope), <b>FMS</b> lateral and vertical paths, and the <b>modes and targets</b> set on the mode control panel. Output: pitch and roll <b>command bars</b> on the attitude display. The pilot flies the aircraft to centre the bars; the same commands can be fed to the autopilot.')
for k, lab in enumerate(('attitude (AHRS / IRS)', 'air data', 'VOR / LOC / GS', 'FMS', 'mode control panel')): y = 30 + k * 50; f.box(30, y, 180, 36, [lab], c='cool', size=10); f.L(210, y + 18, 288, 150, 'cool', 1.3, me='cool')
f.box(290, 110, 170, 80, ['FLIGHT DIRECTOR', 'COMPUTER'], c='gold', size=11)
f.L(460, 150, 520, 150, 'gold', 2, me='gold'); screen(f, 522, 80, 200, 140); att(f, 622, 150, 180, 120, pitch=8, uid='fd1')
f.L(552, 138, 692, 138, 'mag', 4); f.L(622, 90, 622, 210, 'mag', 4)
f.T(622, 246, 'command bars: fly to centre them', 10.5, 'mag', 'middle', bold=True); f.T(375, 220, 'also to the autopilot', 10, 'dim', 'middle')
IN.append(f)

f = I('25_03', 'Flight Director on the PFD', 760, 300, 'A primary flight display with crossed flight director command bars and the flight mode annunciations above',
    '<b>Reading the command bars.</b> On the PFD the flight director appears either as <b>cross-pointer bars</b> (a horizontal pitch bar and a vertical roll bar) or as a <b>V-bar</b> that the aircraft symbol is flown into. Here the pitch bar is <b>above</b> the aircraft symbol and the roll bar to the <b>right</b>: the command is <b>pitch up and roll right</b>. When the bars are centred on the symbol the aircraft is following the selected modes, shown in the flight mode annunciator along the top.')
tapes(f, 180, 30, 360, 240, 'fd2')
f.L(250, 128, 470, 128, 'mag', 4); f.L(392, 70, 392, 230, 'mag', 4)
for k, t in enumerate(('SPD', 'HDG SEL', 'V/S')): f.T(270 + k * 90, 52, t, 11, 'green', 'middle', bold=True, mono=True, check=False)
f.T(360, 292, 'Pitch bar above, roll bar right: pitch up and roll right.', 11, 'ink', 'middle', bold=True)
f.legend(570, 80, [(1, 'Pitch bar', 'above: pitch up'), (2, 'Roll bar', 'right: roll right'), (3, 'FMA', 'active modes')], step=50)
f.badge(250, 112, 1); f.badge(410, 220, 2); f.badge(220, 52, 3)
IN.append(f)

f = I('25_04', 'HSI Face Explained', 760, 300, 'An electromechanical horizontal situation indicator with numbered parts: compass card, lubber line, heading bug, course pointer, deviation bar, to-from indicator, glideslope pointer and flags',
    '<b>Every part of the HSI.</b> The HSI combines a slaved heading indicator with a VOR/ILS course deviation indicator, so the picture is a plan view: the deviation bar shows where the course is <b>relative to the aircraft symbol</b>. Set the course with the course knob; the bar drifts off-centre towards the side the course lies. Red <b>NAV</b> and <b>HDG</b> flags appear when the signal or heading source is unreliable; the <b>GS</b> pointers hide when no glideslope is received.')
cx, cy = 230, 150; f.Ci(cx, cy, 128, 'ink', 2.4, 'black'); rose(f, cx, cy, 120, hdg=20)
f.L(cx, cy - 136, cx, cy - 122, 'gold', 4)
c = pol(cx, cy, 104, 40); c2 = pol(cx, cy, 104, 220); f.L(c[0], c[1], pol(cx, cy, 48, 40)[0], pol(cx, cy, 48, 40)[1], 'gold', 4); f.L(c2[0], c2[1], pol(cx, cy, 48, 220)[0], pol(cx, cy, 48, 220)[1], 'gold', 4)
dc = pol(cx, cy, 24, 130); d0, d1 = pol(dc[0], dc[1], 44, 40), pol(dc[0], dc[1], 44, 220); f.L(d0[0], d0[1], d1[0], d1[1], 'gold', 4)
planview(f, cx, cy, 0, 0.6, 'white')
b = pol(cx, cy, 124, 50); f.R(b[0] - 6, b[1] - 6, 12, 12, c='mag', sw=1.4, fill='mag', rx=2)
f.R(cx - 70, cy - 40, 30, 14, c='hot', sw=1, fill='hot', rx=2); f.T(cx - 55, cy - 30, 'NAV', 8, 'white', 'middle', bold=True, check=False)
f.P(f'M{cx+138},{cy-6} l14,0 l-7,12 Z', 'white', 1.2, 'white')
f.legend(420, 30, [(1, 'Lubber line', 'heading under it: 020°'), (2, 'Heading bug', 'selected heading'), (3, 'Course pointer', 'selected course (060°)'), (4, 'Deviation bar', 'course lies that side'), (5, 'NAV flag', 'signal unreliable'), (6, 'GS pointer', 'glideslope position')], step=42)
f.badge(cx + 18, cy - 136, 1); f.badge(b[0] + 18, b[1], 2); f.badge(c[0] + 18, c[1] - 6, 3); f.badge(d0[0] + 26, d0[1] + 20, 4); f.badge(cx - 86, cy - 34, 5); f.badge(cx + 160, cy + 16, 6)
IN.append(f)

f = I('25_06', 'Autopilot / FD Mode Control Panel (MCP)', 760, 260, 'A glareshield mode control panel with windows for speed, heading, vertical speed and altitude, mode buttons, and autopilot and flight director engage switches',
    '<b>Setting targets and modes.</b> The <b>MCP</b> (or FCU) on the glareshield has a window and knob for each <b>target</b> — IAS/Mach, heading, vertical speed and altitude — and push-buttons for the <b>modes</b>: lateral (HDG SEL, LNAV, VOR LOC, APP) and vertical (LVL CHG, VNAV, V/S, ALT HOLD). Flight director switches sit at each end; autopilot <b>CMD</b> engage buttons and the <b>disengage bar</b> sit on the right. A light in a button shows the mode is selected; the FMA on the PFD confirms what is actually engaged.')
f.R(20, 50, 720, 150, c='line', sw=2, fill='g3', rx=8)
for k, (lab, val, x) in enumerate((('IAS/MACH', '250', 110), ('HEADING', '270', 270), ('V/S', '-1500', 440), ('ALTITUDE', '12000', 600))):
    f.T(x, 76, lab, 9.5, 'gold', 'middle', bold=True); f.R(x - 46, 84, 92, 26, c='ink', sw=1.2, fill='black', rx=2); f.T(x, 103, val, 13, 'white', 'middle', mono=True, bold=True, check=False); f.Ci(x, 136, 13, 'ink', 1.4, 'steel')
for k, t in enumerate(('LNAV', 'VOR LOC', 'APP')): f.R(186 + k * 58, 160, 52, 22, c='ink', sw=1.2, fill='g2', rx=3); f.T(212 + k * 58, 175, t, 8, 'ink', 'middle', bold=True, check=False)
for k, t in enumerate(('VNAV', 'LVL CHG', 'ALT HOLD')): f.R(380 + k * 60, 160, 54, 22, c='ink', sw=1.2, fill='g2', rx=3); f.T(407 + k * 60, 175, t, 8, 'ink', 'middle', bold=True, check=False)
f.R(670, 96, 50, 22, c='green', sw=1.4, fill='g2', rx=3); f.T(695, 111, 'CMD A', 8.5, 'green', 'middle', bold=True, check=False)
f.R(670, 130, 50, 10, c='ink', sw=1.2, fill='steel', rx=2); f.T(695, 156, 'disengage', 8, 'dim', 'middle', check=False)
f.T(40, 176, 'F/D', 9.5, 'gold', bold=True, check=False); f.L(54, 140, 54, 160, 'ink', 4)
f.T(380, 236, 'Targets in the windows; modes on the buttons; the FMA confirms what is engaged.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

def fdbars(f, x0, pitch, title, sub):
    tapes(f, x0, 40, 300, 200, 'fd' + str(x0)); f.L(x0 + 70, 140 - pitch, x0 + 230, 140 - pitch, 'mag', 4); f.L(x0 + 150, 72, x0 + 150, 208, 'mag', 4)
    f.T(x0 + 150, 262, title, 11, 'ink', 'middle', bold=True); f.T(x0 + 150, 280, sub, 10, 'dim', 'middle')
f = I('25_07', 'FD Command Bars — Climb', 760, 300, 'A flight director showing the pitch bar above the aircraft symbol when a climb is commanded, then centred once the climb attitude is reached',
    '<b>Following a climb command.</b> When a climb mode is selected the <b>pitch bar moves up</b>: the pilot raises the nose until the aircraft symbol sits on the bar. Once established at the commanded climb attitude the bar stays centred on the symbol. The FD commands an <b>attitude</b>, not a rate; the climb speed or vertical speed depends on the mode chosen (e.g. LVL CHG holds speed, V/S holds the selected rate).')
fdbars(f, 40, 30, '1. Climb selected', 'pitch bar above: raise the nose'); fdbars(f, 420, 0, '2. Climb attitude reached', 'bars centred: hold it')
IN.append(f)

f = I('25_08', 'FD Command Bars — Altitude Hold', 760, 300, 'A flight director commanding a level-off as the selected altitude is captured, then centred in level flight',
    '<b>Capturing and holding an altitude.</b> As the aircraft nears the selected altitude, the FD changes to <b>ALT ACQ / ALT*</b> and the pitch bar moves <b>down</b> to command a smooth level-off. Once level, the mode becomes <b>ALT HOLD</b> and the bar sits centred; any drift from the altitude moves the bar to command the correction. The level-off begins earlier at higher vertical speeds to keep the manoeuvre gentle.')
fdbars(f, 40, -24, '1. Altitude capture', 'pitch bar below: lower the nose'); fdbars(f, 420, 0, '2. ALT HOLD', 'bars centred in level flight')
IN.append(f)

f = I('25_09', 'ILS Glideslope Geometry', 760, 300, 'Side view of a 3 degree glideslope from the runway touchdown zone, with full-scale deflection limits and height at distances',
    '<b>The glide path in numbers.</b> The glideslope transmitter beside the touchdown zone radiates a beam normally at <b>3°</b>, which descends about <b>300 ft per nm</b> (318 ft/nm). The indicator shows deviation over a total of <b>±0.7°</b> (full scale, 2 dots) — each dot about 0.35°. On a 3° slope the rate of descent needed is roughly <b>5 × ground speed</b> (ft/min): 600 ft/min at 120 kt. At 5 nm the aircraft should be about 1 500 ft above the threshold.')
f.L(40, 250, 720, 250, 'ink', 2); f.R(600, 246, 120, 8, c='ink', sw=1, fill='steel', rx=1); f.T(660, 274, 'runway', 10, 'dim', 'middle')
f.L(620, 250, 80, 110, 'gold', 2.6); f.L(620, 250, 80, 72, 'gold', 1.2, dash='5 4'); f.L(620, 250, 80, 146, 'gold', 1.2, dash='5 4')
f.T(90, 62, '+0.7° (full fly-down)', 9.5, 'gold'); f.T(90, 136, '−0.7° (full fly-up)', 9.5, 'gold'); f.T(400, 226, '3° glide path', 11, 'gold', bold=True)
f.P('M560,250 A60,60 0 0 0 562,235', 'white', 1.6); f.T(540, 240, '3°', 10, 'white', 'end', bold=True)
f.raw(aircraft(250, 160, 8, 0.32, flip=True))
for nm, x in ((5, 220), (3, 380), (1, 540)): f.L(x, 250, x, 250 - (620 - x) * 140 / 540, 'cool', 1, dash='3 3'); f.T(x, 290, f'{nm} nm: {nm * 300} ft', 10, 'cool', 'middle', bold=True)
note(f, 40, 20, ['About 300 ft per nm.   Rate of descent ≈ 5 × ground speed (ft/min).'], first='ink')
IN.append(f)

f = I('26_06', 'Series Autopilot Actuator', 760, 300, 'A control run from the control column to the elevator with a series actuator inserted that changes the length of the linkage without moving the column',
    '<b>Two ways to move a control surface.</b> A <b>series actuator</b> is built <b>into</b> the control run, extending or shortening it, so it moves the surface <b>without moving the pilot’s controls</b>. Its authority is deliberately limited (a few degrees of surface movement), so a runaway is easily overpowered — it suits fast, small corrections such as the <b>yaw damper</b> and stability augmentation. A <b>parallel actuator</b> drives the whole control run, moving the column or rudder pedals as well; it is used for the main autopilot axes and can be overpowered through a clutch or detent.')
f.L(110, 70, 110, 200, 'ink', 6); f.Ci(110, 60, 14, 'ink', 2); f.T(110, 226, 'control column', 10, 'ink', 'middle', bold=True)
f.L(110, 180, 300, 180, 'ink', 3); f.R(300, 164, 120, 32, c='gold', sw=2, fill='g3', rx=4); f.T(360, 184, 'series actuator', 10, 'gold', 'middle', bold=True, check=False)
f.L(320, 160, 320, 140, 'gold', 1.4, me='gold', ms='gold'); f.T(330, 140, 'changes length', 9.5, 'gold')
f.L(420, 180, 620, 180, 'ink', 3); f.P('M620,180 L700,150 L700,210 Z', 'ink', 2, 'g3'); f.T(660, 236, 'control surface', 10, 'ink', 'middle', bold=True)
f.T(110, 260, 'column does NOT move', 10.5, 'green', 'middle', bold=True)
note(f, 420, 230, ['Limited authority: suits yaw dampers.', 'Parallel actuators move the controls.'], first='ink')
IN.append(f)

f = I('26_07', 'Autopilot Engage Interlocks', 760, 260, 'A chain of conditions in series - power, valid attitude, valid air data, no trim fault, no pilot force, engage switch - that must all be met to engage the autopilot',
    '<b>All conditions must be met.</b> The autopilot <b>engage circuit</b> is a series chain of interlocks: correct <b>power</b> supplies, valid <b>attitude</b> and heading reference (gyros up to speed, no flags), valid <b>air data</b>, no <b>trim</b> fault, no excessive attitude or control force, and the engage switch selected. If any link breaks while engaged, the autopilot <b>disconnects</b> with a warning (light and aural) so the pilot knows to take over.')
flowrow(f, [(['power', 'supplies'], 'cool'), (['attitude', 'valid'], 'cool'), (['air data', 'valid'], 'cool'), (['no trim', 'fault'], 'cool'), (['engage', 'switch'], 'gold'), (['AP', 'ENGAGED'], 'green')], 90, h=56)
f.T(380, 200, 'Any interlock lost: autopilot disconnects, with a warning light and aural.', 11, 'hot', 'middle', bold=True)
IN.append(f)

def fma(f, x0, y0, cols, w=110):
    for k, (top, bot) in enumerate(cols):
        x = x0 + k * w; f.R(x, y0, w, 56, c='line', sw=1.2, fill='black', rx=0)
        f.T(x + w / 2, y0 + 22, top, 11, 'green', 'middle', bold=True, mono=True, check=False)
        if bot: f.T(x + w / 2, y0 + 44, bot, 10, 'white', 'middle', mono=True, check=False)
f = I('26_10', 'Autopilot Annunciations on the PFD', 760, 300, 'The top of a primary flight display showing the flight mode annunciator columns above the attitude display, with the autopilot status',
    '<b>The PFD tells you what the automation is doing.</b> Along the top of the PFD the <b>flight mode annunciator</b> shows, from left to right, the <b>autothrottle</b> mode, the <b>roll</b> (lateral) mode and the <b>pitch</b> (vertical) mode, with <b>engaged</b> modes in green and <b>armed</b> modes in white beneath. The autopilot/FD status (e.g. CMD, FD, LAND 3) is shown below. A box drawn round a newly changed mode for ten seconds draws the eye. Crews call out every FMA change.')
screen(f, 160, 20, 440, 270); fma(f, 215, 30, (('SPD', ''), ('LNAV', ''), ('VNAV PTH', 'G/S')), 110)
f.T(545, 58, 'CMD', 13, 'green', 'middle', bold=True, mono=True, check=False)
att(f, 380, 190, 240, 150, uid='fma1'); f.R(214, 30, 110, 56, c='white', sw=2, fill='none', rx=0)
f.T(380, 296, 'green = engaged   white = armed   box = just changed', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('26_11', 'Flight Mode Annunciator (FMA) Explained', 760, 280, 'The four columns of the FMA labelled autothrottle, roll, pitch and autopilot status, with examples of engaged and armed modes',
    '<b>Reading the FMA column by column.</b> <b>Autothrottle</b>: N1, SPD, RETARD, THR HOLD. <b>Roll</b>: HDG SEL, LNAV, VOR/LOC; an armed mode (e.g. VOR/LOC) appears in white below the engaged one until captured. <b>Pitch</b>: ALT HOLD, V/S, VNAV, LVL CHG, G/S. <b>AP status</b>: CMD (autopilot), FD (flight director only), or the autoland status (LAND 3, LAND 2, NO AUTOLAND). The FMA, not the MCP lights, is the authority on what is engaged.')
fma(f, 50, 60, (('N1', ''), ('HDG SEL', 'VOR/LOC'), ('V/S', 'G/S'), ('CMD', '')), 165)
for k, t in enumerate(('autothrottle', 'roll (lateral)', 'pitch (vertical)', 'AP status')): f.T(50 + 82 + k * 165, 50, t, 10.5, 'gold', 'middle', bold=True)
f.L(272, 150, 272, 112, 'white', 1.4, me='white'); f.T(272, 166, 'armed: white, waiting to capture', 10, 'white', 'middle')
f.L(380, 150, 380, 88, 'green', 1.4, me='green'); f.T(470, 190, 'engaged: green', 10, 'green', 'middle', bold=True)
f.T(380, 246, 'The FMA, not the MCP button lights, shows what is engaged.', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('26_12', 'Dual-Channel Autopilot Architecture', 760, 300, 'Two independent autopilot channels with separate sensors and computers, a comparator monitoring their outputs and disconnecting on disagreement',
    '<b>Making automation fail safe.</b> In a <b>dual-channel</b> system two independent autopilot computers, each with its own sensors and power, compute the same commands. A <b>comparator</b> monitors them: if they disagree, the system disconnects — a <b>fail-passive</b> system: a failure leaves the aircraft in trim with no significant deviation, and the pilot takes over (allows Cat III with a DH). With <b>three</b> channels the odd one out can be voted out and the approach continued — <b>fail-operational</b>, required for the lowest minima (no DH).')
for k, y in enumerate((50, 170)):
    f.box(40, y, 140, 50, ['sensors ' + 'AB'[k]], c='cool', size=10.5); f.L(180, y + 25, 228, y + 25, 'cool', 1.6, me='cool')
    f.box(230, y, 160, 50, ['AP computer ' + 'AB'[k]], c='gold', size=10.5); f.L(390, y + 25, 468, 140 - 20 + k * 40, 'gold', 1.6, me='gold')
f.box(470, 110, 130, 60, ['comparator'], c='hot', size=11); f.L(600, 140, 640, 140, 'ink', 2, me='ink'); f.box(642, 115, 90, 50, ['servos'], c='ink', size=10.5)
f.T(535, 200, 'disagree: disconnect', 10.5, 'hot', 'middle', bold=True)
note(f, 40, 250, ['Two channels: fail-passive.   Three channels: fail-operational (vote out the faulty one).'], first='ink')
IN.append(f)

f = I('28_01', 'Autothrottle System Architecture', 760, 300, 'An autothrottle computer taking speed and thrust targets from the MCP and FMS, air data and engine data, and driving the thrust levers through a servo and clutch',
    '<b>Automatic thrust control.</b> The <b>autothrottle computer</b> receives the <b>target</b> — a speed (SPD mode) from the MCP or FMS, or a thrust limit (N1/EPR mode) from the thrust management computer — plus <b>air data</b> (speed, Mach) and <b>engine data</b> (N1 or EPR). It drives a <b>servo motor</b> that physically moves the <b>thrust levers</b> through a clutch, so the pilot sees and can override the movement. Modes include take-off/go-around thrust, climb thrust, speed hold and RETARD at flare.')
for k, lab in enumerate(('MCP / FMS targets', 'air data (IAS, Mach)', 'engine N1 / EPR', 'thrust limits')): y = 40 + k * 56; f.box(30, y, 190, 40, [lab], c='cool', size=10); f.L(220, y + 20, 288, 150, 'cool', 1.3, me='cool')
f.box(290, 110, 160, 80, ['AUTOTHROTTLE', 'COMPUTER'], c='gold', size=11)
f.L(450, 150, 500, 150, 'gold', 2, me='gold'); f.box(502, 125, 100, 50, ['servo +', 'clutch'], c='ink', size=10)
f.L(602, 150, 640, 150, 'ink', 2, me='ink'); f.L(660, 230, 690, 90, 'ink', 8); f.L(690, 230, 720, 100, 'ink', 8); f.T(690, 256, 'thrust levers move', 10, 'ink', 'middle', bold=True)
IN.append(f)

def wing(f, cx, cy, bank, yaw, s=1):
    f.raw(f'<g transform="translate({cx} {cy}) rotate({bank})"><line x1="{-80*s}" y1="0" x2="{80*s}" y2="0" stroke="{col("gold")}" stroke-width="6" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="14" ry="12" fill="#c4d1d6"/><line x1="0" y1="-12" x2="0" y2="-34" stroke="{col("gold")}" stroke-width="5" stroke-linecap="round"/></g>')
f = I('29_01', 'Dutch Roll — Stable, Neutral & Unstable', 760, 300, 'Three traces of yaw angle against time: a decaying oscillation, a constant-amplitude oscillation and a growing oscillation',
    '<b>How the oscillation develops.</b> <b>Dutch roll</b> is a coupled yawing and rolling oscillation. If the aircraft’s <b>directional (weathercock) stability</b> is strong relative to its <b>lateral (dihedral)</b> stability, the oscillation <b>dies away</b> (stable). If they are balanced it continues at constant amplitude (neutral); if lateral stability dominates — common in swept-wing jets at high altitude — it <b>grows</b> (unstable). Swept-wing airliners therefore need a <b>yaw damper</b>.')
for k, (lab, g, c_) in enumerate((('stable: dies away', -0.9, 'green'), ('neutral: constant', 0, 'gold'), ('unstable: grows', 0.7, 'hot'))):
    y = 66 + k * 86; f.L(80, y, 700, y, 'line', 1); f.T(76, y + 4, '0', 9, 'dim', 'end')
    amp = (lambda x: 30 * math.exp(-1.8 * x / 620)) if g < 0 else ((lambda x: 22) if g == 0 else (lambda x: 30 * math.exp(1.2 * (x / 620 - 1))))
    pl(f, ' '.join(f'{80 + x:.1f},{y - amp(x) * math.sin(x / 620 * 6 * 2 * math.pi):.1f}' for x in range(0, 621, 4)), c_, 2.2)
    f.T(706, y - 30, lab, 10.5, c_, 'end', bold=True, halo=True)
f.T(390, 292, 'time  →', 10, 'dim', 'middle')
IN.append(f)

f = I('29_02', 'Dutch Roll — Yaw-Roll Coupling', 760, 300, 'Plan and rear views of an aircraft yawing right, the advancing left wing producing more lift and rolling the aircraft right, then the cycle reversing',
    '<b>Why yaw causes roll.</b> If a swept-wing aircraft <b>yaws right</b>, the left wing advances: it meets the airflow more nearly at right angles (less effective sweep) and moves slightly faster, so it produces <b>more lift</b> and the aircraft <b>rolls right</b>. The resulting sideslip and the fin’s weathercock stability then yaw it back to the left, which rolls it left — and the cycle repeats. The wingtip traces a figure-of-eight like a skater, giving the name.')
for k, (x, yaw, bank, t) in enumerate(((140, 15, 0, '1. yaws right'), (380, 0, 20, '2. advancing wing lifts: rolls right'), (620, -15, 0, '3. yaws back left'))):
    if k == 1: wing(f, x, 120, 20, 0, 0.9); f.T(x, 176, 'view from behind', 9.5, 'dim', 'middle')
    else: planview(f, x, 120, yaw, 1.1); f.T(x, 196, 'view from above', 9.5, 'dim', 'middle')
    f.T(x, 220, t, 10.5, 'ink', 'middle', bold=True)
f.L(220, 120, 280, 120, 'dim', 1.6, me='dim'); f.L(480, 120, 540, 120, 'dim', 1.6, me='dim')
f.P('M100,260 C200,240 280,290 380,260 C480,230 560,290 660,260', 'gold', 1.6, dash='5 4'); f.T(380, 290, 'wingtip path: a figure-of-eight, repeated', 10, 'gold', 'middle')
IN.append(f)

f = I('29_04', 'Yaw Damper Washout Filter', 760, 300, 'A graph of yaw rate during a steady turn and dutch roll, showing the washout filter removing the steady part and passing only the oscillation',
    '<b>Damping the oscillation without fighting turns.</b> A rate gyro senses <b>all</b> yaw rate — including the steady yaw rate of a normal turn. If the yaw damper opposed that, it would apply rudder against every turn. A <b>washout (high-pass) filter</b> removes slowly-changing, steady signals and passes only the <b>oscillating</b> dutch-roll component, so the damper corrects the oscillation and ignores the steady turn.')
for y0, lab, steady in ((90, 'gyro output: steady turn + dutch roll', 40), (210, 'after the washout filter: oscillation only', 0)):
    f.L(80, y0, 700, y0, 'line', 1); f.T(80, y0 + 44, lab, 10.5, 'gold' if steady else 'green', bold=True)
    pl(f, ' '.join(f'{80 + x:.1f},{y0 - (steady * min(1, x / 120)) - 18 * math.sin(x / 620 * 7 * 2 * math.pi):.1f}' for x in range(0, 621, 4)), 'gold' if steady else 'green', 2.2)
f.T(380, 290, 'washout = high-pass: blocks steady signals, passes oscillations', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('29_05', 'Yaw Damper Signal Chain', 760, 260, 'A yaw rate gyro feeding a washout filter, amplifier and series rudder actuator, with position feedback',
    '<b>From gyro to rudder.</b> A <b>yaw rate gyro</b> (or the inertial reference) senses yaw rate; the <b>washout filter</b> removes the steady-turn component; the <b>yaw damper computer</b> amplifies the remaining signal (with gain scheduled for airspeed) and drives a <b>series actuator</b> in the rudder control run, which moves the rudder without moving the pedals. <b>Position feedback</b> from the actuator closes the loop. A yaw damper indicator shows the rudder movement; most jets need the yaw damper engaged for flight at high altitude.')
flowrow(f, [(['yaw rate', 'gyro'], 'cool'), (['washout', 'filter'], 'gold'), (['YD computer', '+ amplifier'], 'ink'), (['series rudder', 'actuator'], 'ink'), (['rudder'], 'green')], 80, h=56)
f.P('M590,136 L590,190 L380,190 L380,138', 'green', 1.6, dash='6 4', me='green', join='round'); f.T(485, 210, 'position feedback', 10, 'green', 'middle', bold=True)
f.T(380, 246, 'The pedals do not move: the actuator is in series.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('32_01', 'Flight Warning Display Layout (ECAM)', 760, 300, 'An engine and warning display with primary engine gauges at the top left, flap and fuel data at the top right, and warning and memo messages at the bottom',
    '<b>Where the warnings appear.</b> On an ECAM-type upper display — the <b>engine/warning display</b> — the top shows the <b>primary engine parameters</b> (N1, EGT, N2, fuel flow), fuel on board and flap/slat position. The lower part carries the <b>warning and caution messages</b> on the left, with the <b>actions</b> to take as a checklist, and <b>memo</b> or status messages on the right. The lower display (system display) automatically shows the synoptic page of the affected system.')
screen(f, 160, 20, 440, 270)
for k in range(2):
    for j in range(2): x, y = 230 + k * 110, 80 + j * 70; arc_band(f, x, y, 30, -120, 60, 'green', 4); t = pol(x, y, 28, 20); f.L(x, y, t[0], t[1], 'white', 2)
f.T(520, 60, 'FOB 12 400 kg', 10, 'cool', 'middle', mono=True, check=False); f.T(520, 110, 'FLAP  1', 10, 'cool', 'middle', mono=True, check=False)
f.L(170, 180, 590, 180, 'line', 1.4); f.L(400, 180, 400, 282, 'line', 1.4)
f.T(180, 202, 'ENG 1 FIRE', 11, 'hot', bold=True, mono=True, check=False); f.T(190, 222, '- THR LEVER 1 . . IDLE', 9.5, 'cool', mono=True, check=False); f.T(190, 240, '- ENG MASTER 1 . . OFF', 9.5, 'cool', mono=True, check=False)
f.T(412, 202, 'SEAT BELTS', 10, 'green', mono=True, check=False); f.T(412, 220, 'NO SMOKING', 10, 'green', mono=True, check=False)
f.T(290, 296, 'warnings + actions', 10, 'gold', 'middle', bold=True); f.T(495, 296, 'memo', 10, 'gold', 'middle', bold=True)
f.T(380, 14, 'engine / warning display', 10, 'gold', 'middle', bold=True)
IN.append(f)

f = I('32_02', 'Central Warning System Architecture', 760, 300, 'Aircraft systems sending fault signals to flight warning computers which drive the master warning and caution lights, aural alerts and display messages',
    '<b>One system to alert the crew.</b> Sensors in every aircraft system send their status to the <b>flight warning computers</b> (two, for redundancy). These prioritise the alerts and drive the outputs: the <b>MASTER WARNING</b> (red) or <b>MASTER CAUTION</b> (amber) lights in front of each pilot, the <b>aural</b> alerts (bell, chime, voice), and the <b>messages</b> on the warning display. Pressing a master light cancels it and the aural, ready for the next alert, but the message stays until the fault clears.')
for k, lab in enumerate(('engines', 'hydraulics', 'electrics', 'fire detection', 'flight controls')): y = 30 + k * 50; f.box(30, y, 160, 36, [lab], c='cool', size=10); f.L(190, y + 18, 288, 150, 'cool', 1.2, me='cool')
f.box(290, 100, 170, 100, ['FLIGHT WARNING', 'COMPUTERS (2)'], c='gold', size=11)
for k, (lab, c_) in enumerate((('MASTER WARNING (red)', 'hot'), ('MASTER CAUTION (amber)', 'amber'), ('aural alerts', 'ink'), ('display messages', 'green'))): y = 50 + k * 56; f.box(530, y, 200, 38, [lab], c=c_, size=10); f.L(460, 150, 528, y + 19, c_, 1.3, me=c_)
IN.append(f)

f = I('33_01', 'Altitude Alerting', 760, 300, 'Side view of an aircraft climbing to a selected altitude with an alert band starting about 900 ft before and a deviation alert band about 300 ft either side once level',
    '<b>Two alerts around the selected altitude.</b> <b>Approaching:</b> when the aircraft comes within about <b>900 ft</b> (system dependent, typically 900–1 000 ft) of the altitude set on the MCP, a <b>chime</b> sounds and the altitude box is highlighted, reminding the crew to level off. <b>Deviating:</b> once at the altitude, if it drifts by more than about <b>200–300 ft</b>, an aural alert sounds and the alert light or box flashes. The system uses the same altitude source as the altimeter.')
f.L(60, 120, 700, 120, 'gold', 2.4); f.T(700, 112, 'selected altitude FL120', 10.5, 'gold', 'end', bold=True)
f.R(60, 120, 640, 90, c='none', sw=0, fill='cool', rx=0, op=0.12); f.L(60, 210, 360, 210, 'cool', 1.4, dash='5 4'); f.T(70, 228, '900 ft below: approach chime', 10.5, 'cool', bold=True)
f.R(420, 96, 280, 48, c='none', sw=0, fill='hot', rx=0, op=0.12); f.L(420, 96, 700, 96, 'hot', 1.2, dash='4 4'); f.L(420, 144, 700, 144, 'hot', 1.2, dash='4 4'); f.T(560, 168, '±200–300 ft: deviation alert', 10.5, 'hot', 'middle', bold=True)
f.P('M60,280 Q300,250 400,122 L700,120', 'white', 2); f.raw(aircraft(300, 186, -40, 0.3, flip=True))
IN.append(f)

f = I('33_02', 'Altitude Alert Module', 760, 260, 'An altitude alert controller with a selected altitude window and setting knob, an alert light, and inputs from the air data computer',
    '<b>The hardware.</b> On older or smaller aircraft a separate <b>altitude alerter</b> has a window showing the <b>selected altitude</b>, a knob to set it, and an <b>ALERT</b> light. It compares the selected altitude with the <b>pressure altitude</b> from the air data computer or encoding altimeter and drives the light and aural tone. On modern aircraft the same function is built into the MCP and PFD: the altitude window and the selected-altitude box on the tape.')
f.R(140, 70, 300, 110, c='line', sw=2, fill='g3', rx=8); f.R(170, 96, 150, 44, c='ink', sw=1.4, fill='black', rx=3); f.T(245, 128, '12 000', 20, 'white', 'middle', bold=True, mono=True, check=False)
f.Ci(380, 118, 22, 'ink', 1.6, 'steel'); f.R(250, 150, 60, 20, c='amber', sw=1.2, fill='amber', rx=3); f.T(280, 164, 'ALERT', 9, '#10171b', 'middle', bold=True, check=False)
f.box(530, 90, 180, 50, ['air data computer', 'pressure altitude'], c='cool', size=10); f.L(528, 115, 442, 115, 'cool', 1.6, me='cool')
f.T(290, 220, 'selected altitude compared with pressure altitude: light and tone', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('33_04', 'Speed Tape — VMO & Buffet Limits', 760, 300, 'A PFD airspeed tape with a red and black barber pole at the top for VMO, an amber high-speed buffet band, an amber minimum manoeuvre band and a red barber pole at stick shaker speed at the bottom',
    '<b>The protected speed range on the tape.</b> At the top a <b>red-and-black barber pole</b> starts at the maximum operating speed (<b>VMO/MMO</b>), with an <b>amber</b> band below it marking the <b>high-speed buffet</b> or maximum manoeuvring margin. At the bottom an <b>amber</b> band marks the <b>minimum manoeuvre speed</b> (about 1.3 g buffet margin) and a <b>red-and-black</b> barber pole starts at the <b>stick-shaker</b> speed. The aircraft flies safely between them; the bands move with weight, altitude and g.')
x0 = 300; screen(f, x0 - 20, 20, 120, 270); f.R(x0, 30, 80, 250, c='line', sw=1, fill='#232b30', rx=2)
for y0, y1 in ((30, 80), (230, 280)):
    for k in range(int((y1 - y0) / 10)): f.R(x0 + 64, y0 + k * 10, 14, 10, c='none', sw=0, fill='hot' if k % 2 == 0 else 'black', rx=0)
f.R(x0 + 70, 80, 8, 26, c='none', sw=0, fill='amber', rx=0); f.R(x0 + 70, 204, 8, 26, c='none', sw=0, fill='amber', rx=0)
for k, v in enumerate((340, 300, 260, 220, 180, 140)): f.T(x0 + 30, 44 + k * 46, str(v), 11, 'white', 'middle', mono=True, check=False)
f.R(x0 - 6, 140, 70, 26, c='gold', sw=2, fill='black', rx=2); f.T(x0 + 30, 159, '248', 13, 'white', 'middle', bold=True, mono=True, check=False)
f.legend(470, 40, [(1, 'VMO/MMO', 'red and black barber pole'), (2, 'High-speed buffet', 'amber band below VMO'), (3, 'Minimum manoeuvre', 'amber: about 1.3 g margin'), (4, 'Stick shaker', 'red and black barber pole')], step=52)
f.badge(x0 + 104, 52, 1); f.badge(x0 + 104, 94, 2); f.badge(x0 + 104, 216, 3); f.badge(x0 + 104, 258, 4)
IN.append(f)

f = I('33_05', 'Stall Warning System Architecture', 760, 300, 'Angle of attack vanes and flap position feeding a stall warning computer that drives stick shakers and, on some aircraft, a stick pusher',
    '<b>Warning before the stall.</b> <b>Angle-of-attack</b> sensors on each side of the nose, with <b>flap/slat position</b> (which changes the stalling angle), feed the <b>stall warning computers</b>. When the angle of attack reaches a margin below the stall (about 5–7% above stall speed), they fire the <b>stick shaker</b> on the control column — a strong tactile and aural warning. Aircraft with poor natural stall behaviour (e.g. T-tails) also have a <b>stick pusher</b> that pushes the column forward if the crew does not respond. Light aircraft use a simple leading-edge vane switch or reed horn.')
for k, lab in enumerate(('AoA vane L', 'AoA vane R', 'flap / slat position', 'air / ground')): y = 40 + k * 56; f.box(30, y, 180, 40, [lab], c='cool', size=10); f.L(210, y + 20, 288, 150, 'cool', 1.3, me='cool')
f.box(290, 110, 170, 80, ['STALL WARNING', 'COMPUTERS'], c='gold', size=11)
f.box(530, 70, 190, 44, ['stick shaker'], c='hot', size=11); f.L(460, 140, 528, 92, 'hot', 1.6, me='hot')
f.box(530, 160, 190, 44, ['stick pusher (some types)'], c='amber', size=10); f.L(460, 160, 528, 182, 'amber', 1.6, me='amber')
f.T(380, 280, 'Shaker fires about 5–7% above the stall speed for the configuration.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('33_07', 'Angle-of-Attack Vane Sensor', 760, 300, 'A wind vane on the fuselage side aligning with the local airflow, its angle measured by a synchro or resolver inside the fuselage, with a heater',
    '<b>Measuring the angle of attack.</b> A small <b>vane</b> on the side of the forward fuselage is free to rotate and aligns itself with the <b>local airflow</b>, like a weathervane. Its angle relative to the fuselage is measured by a <b>synchro or resolver</b> inside and sent to the stall warning, air data and flight control computers, which correct for the local flow at the sensor’s position. The vane is electrically <b>heated</b> against ice; a jammed or damaged vane can give false stall warnings.')
f.P('M40,240 Q40,120 200,100 L720,100', 'ink', 2); f.L(40, 240, 720, 240, 'ink', 2)
f.raw(f'<g transform="translate(330 100) rotate(-12)"><path d="M0,0 L-80,-6 L-90,-26 L-50,-10 Z" fill="{col("steel")}" stroke="{col("ink")}" stroke-width="1.6"/></g>')
f.Ci(330, 100, 7, 'ink', 1.4, 'g3'); f.L(140, 60, 330, 100, 'cool', 1.6, me='cool'); f.T(140, 50, 'local airflow', 10, 'cool', bold=True)
f.box(290, 140, 140, 44, ['synchro / resolver'], c='gold', size=10); f.L(330, 108, 330, 138, 'gold', 1.4)
f.T(250, 70, 'vane', 10.5, 'ink', bold=True); f.T(380, 210, 'heated against ice', 10, 'hot', 'middle')
note(f, 470, 130, ['Vane aligns with the airflow;', 'its angle relative to the', 'fuselage = local AoA.'], first='ink')
IN.append(f)

f = I('33_08', 'AoA Indicator & Indexer', 760, 300, 'A dial angle-of-attack indicator with coloured bands and an approach indexer with chevrons and a central doughnut',
    '<b>Displaying angle of attack.</b> An <b>AoA indicator</b> shows angle of attack directly (in units or as a fraction of the stall angle), with a band for the optimum approach angle and a red band near the stall. The <b>approach indexer</b> on the glareshield gives a heads-up cue: an upper <b>chevron</b> (fast: angle too low — reduce speed), the central <b>doughnut</b> (on speed) and a lower chevron (slow: angle too high — increase speed). Because the stalling angle is constant, AoA gives a correct margin at any weight.')
cx, cy = 220, 160
dial(f, cx, cy, 100, -120, 120, [(i / 5, f'{i * 0.2:.1f}') for i in range(6)], ptr=0.6, size=10)
arc_band(f, cx, cy, 102, 10, 40, 'green', 8); arc_band(f, cx, cy, 102, 96, 120, 'hot', 8); f.T(cx, cy + 50, 'AoA (fraction of stall)', 9, 'white', 'middle', check=False)
X = 560
f.P(f'M{X-30},70 L{X},100 L{X+30},70', 'green', 8); f.Ci(X, 150, 20, 'amber', 8); f.P(f'M{X-30},230 L{X},200 L{X+30},230', 'hot', 8)
f.T(X + 50, 92, 'fast: AoA low', 10.5, 'green', bold=True); f.T(X + 50, 154, 'on speed', 10.5, 'amber', bold=True); f.T(X + 50, 222, 'slow: AoA high', 10.5, 'hot', bold=True)
f.T(X, 276, 'approach indexer', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

if __name__ == '__main__':
    gallery(IN, 'Instruments Gallery 6', 'Flight Instruments — Additional Figures (2)', 'Original figures for EFIS, FMS, flight director, autopilot, autothrottle, yaw damper and warning systems.', 'ins6-gallery.html')
    print(f'INS6 {len(IN)}  QA warnings: {len(WARN)}')
    for w in WARN: print('  ⚠', w)
