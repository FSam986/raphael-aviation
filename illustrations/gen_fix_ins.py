#!/usr/bin/env python3
"""Replacement redraws for six older Instruments figures that failed label QA
(clipped / overlapping text, thin detail). Rewrites those cards in
instruments-gallery.html in place, matched by figure tag."""
import math, re
from figlib import *

OUT = {}

# ───────────── fig_02_02  combined pitot/static head ─────────────
f = Fig('fig_02_02', 'Combined Pitot/Static Head', 760, 270,
        'Section through a combined pitot-static head showing the open pitot tube, static slots, heater and drain hole',
        '<b>One probe, two pressures.</b> The open front of the head faces the airflow and brings the air to rest, so the central tube senses <b>total (pitot) pressure</b> — static plus dynamic. <b>Static slots</b> in the side of the head, where the flow is undisturbed, feed a separate chamber with <b>static pressure</b>. Each has its own pipe to the instruments. An electric <b>heater</b> keeps the head free of ice, and a <b>drain hole</b> lets water out of the pitot tube. A blocked pitot tube or static slot gives false airspeed, altitude and vertical-speed readings.')
f.P('M120,90 L600,90 L640,110 L640,170 L600,190 L120,190 Q60,190 60,140 Q60,90 120,90 Z', 'ink', 2, 'g3')
f.R(60, 132, 580, 16, c='hot', sw=1.6, fill='bg', rx=0); f.L(60, 132, 60, 148, 'bg', 3)
f.R(260, 100, 300, 22, c='cool', sw=1.6, fill='bg', rx=3); f.R(260, 158, 300, 22, c='cool', sw=1.6, fill='bg', rx=3)
for x in (300, 460):
    f.L(x, 88, x, 101, 'cool', 5); f.L(x, 179, x, 192, 'cool', 5)
f.R(110, 100, 105, 22, c='warm', sw=1, fill='warm', rx=3, op=0.85); f.R(110, 158, 105, 22, c='warm', sw=1, fill='warm', rx=3, op=0.85)
f.L(236, 149, 236, 191, 'fluid', 4)
f.L(640, 140, 712, 140, 'hot', 3); f.P('M560,111 L712,111', 'cool', 3)
f.L(20, 140, 54, 140, 'hot', 2.4, me='hot')
f.T(20, 62, 'airflow: total (pitot) pressure', 10.5, 'hot', bold=True); f.L(60, 70, 64, 132, 'hot', 1)
f.T(380, 56, 'static slots', 10.5, 'cool', 'middle', bold=True); f.L(352, 60, 302, 86, 'cool', 1); f.L(408, 60, 458, 86, 'cool', 1)
f.T(162, 228, 'heating element (anti-ice)', 10, 'warm', 'middle'); f.L(162, 216, 162, 182, 'warm', 1)
f.T(300, 228, 'drain hole', 10, 'fluid'); f.L(296, 222, 240, 194, 'fluid', 1)
f.T(420, 228, 'static chamber', 10, 'cool'); f.L(455, 216, 455, 182, 'cool', 1)
f.T(350, 144, 'pitot tube', 9.5, 'hot', 'middle')
f.T(748, 102, 'to static line', 10, 'cool', 'end'); f.T(748, 160, 'to pitot line', 10, 'hot', 'end')
f.T(380, 258, 'Total pressure enters the open nose; static pressure is sensed through slots in the side.', 10, 'dim', 'middle')
OUT[f.fid] = f

# ───────────── shared capsule mechanism ─────────────
def mech(f, capw, capfill, ptr_deg):
    f.R(40, 40, 460, 250, c='ink', sw=2, fill='g2', rx=8)
    P = (300, 110); pin = pol(P[0], P[1], 99, 130)
    a1, a2 = pol(P[0], P[1], 85, 100), pol(P[0], P[1], 85, 160)
    f.P(f'M{P[0]},{P[1]} L{a1[0]:.1f},{a1[1]:.1f} A85,85 0 0 1 {a2[0]:.1f},{a2[1]:.1f} Z', 'ink', 1.4, 'steel')
    f.P(f'M{a1[0]:.1f},{a1[1]:.1f} A85,85 0 0 1 {a2[0]:.1f},{a2[1]:.1f}', 'ink', 5, dash='3 3')
    f.L(P[0], P[1], 262, 165, 'ink', 5, cap='round'); f.Ci(P[0], P[1], 5, 'ink', 1.4, 'gold')
    f.El(150, 165, capw, 55, 'ink', 1.6, capfill)
    f.L(150 + capw, 165, 262, 165, 'ink', 3.2); f.Ci(262, 165, 4, 'ink', 1.2, 'dim')
    f.Ci(pin[0], pin[1], 14, 'ink', 1.4, 'steel'); f.raw(f'<circle cx="{pin[0]:.1f}" cy="{pin[1]:.1f}" r="14" fill="none" stroke="{col("ink")}" stroke-width="3" stroke-dasharray="2 3"/>')
    tip = pol(pin[0], pin[1], 86, ptr_deg)
    f.L(pin[0], pin[1], tip[0], tip[1], 'white', 4, cap='round'); f.Ci(pin[0], pin[1], 4.5, 'ink', 1, 'white')
    return pin

def vsi(fid, title, capw, capfill, ptr, state, lines, cap, flow):
    f = Fig(fid, title, 760, 330, cap[0], cap[1])
    pin = mech(f, capw, capfill, ptr)
    s1, s2 = pol(pin[0], pin[1], 100, 35), pol(pin[0], pin[1], 100, 145)
    f.P(f'M{s1[0]:.1f},{s1[1]:.1f} A100,100 0 0 1 {s2[0]:.1f},{s2[1]:.1f}', 'ink', 1.8)
    for a in (35, 62, 90, 118, 145):
        p, q = pol(pin[0], pin[1], 94, a), pol(pin[0], pin[1], 106, a); f.L(p[0], p[1], q[0], q[1], 'ink', 2 if a == 90 else 1.4)
    f.T(424, 78, 'CLIMB', 10, 'green', bold=True); f.T(424, 274, 'DESCENT', 10, 'hot', bold=True); f.T(486, 177, '0', 11, 'ink', bold=True)
    f.P('M10,86 L90,86 L90,165 L' + f'{150 - capw},165', 'cool', 3.2, join='round'); f.L(90, 86, 120, 86, 'cool', 3.2)
    f.R(120, 77, 18, 18, c='warm', sw=2, fill='bg', rx=2); f.L(129, 77, 129, 95, 'warm', 2)
    f.T(4, 76, 'static', 10, 'cool', bold=True); f.T(146, 62, 'metering unit (choke)', 10, 'warm')
    f.T(150, 240, 'capsule', 10, 'ink', 'middle'); f.T(150, 254, state, 10, 'ink', 'middle', bold=True)
    f.T(52, 280, 'case: fed slowly through the choke', 9.5, 'dim')
    if flow == 'in':
        for dy in (-14, 0, 14): f.L(142, 86 + dy * 0.5, 176, 86 + dy * 0.8, 'warm', 1.6, me='warm')
    elif flow == 'out':
        for dy in (-14, 0, 14): f.L(180, 86 + dy * 0.8, 146, 86 + dy * 0.5, 'warm', 1.6, me='warm')
    y = 70
    for i, t in enumerate(lines):
        f.T(520, y, t, 10.5 if i == 0 else 10, 'ink' if i == 0 else 'dim', bold=(i == 0)); y += 18 if i == 0 else 15
    f.T(270, 312, 'static pressure reaches the capsule at once, but the case only through the choke', 10, 'dim', 'middle')
    OUT[fid] = f

vsi('fig_06_01', 'VSI — Level Flight', 22, '#2c4a57', 90, 'at rest',
    ['Level flight', 'Static pressure is steady, so', 'pressure inside the capsule', 'equals pressure in the case.', '', 'No pressure difference:', 'the pointer reads zero.'],
    ('Vertical speed indicator mechanism in level flight with the pointer at zero',
     '<b>How the VSI works</b> — static pressure is fed <b>directly to the capsule</b> and, through a <b>metering unit (choke)</b>, slowly to the case. In level flight the pressure is not changing, so capsule and case are equal and the pointer rests at <b>zero</b>. The instrument measures the <b>rate of change</b> of static pressure, not the pressure itself. The choke is compensated for temperature and density so the calibration holds at all altitudes.'), None)
vsi('fig_06_02', 'VSI — Descent', 32, '#5a2f2a', 128, 'EXPANDS',
    ['Descent', 'Static pressure is increasing.', 'The capsule feels it at once;', 'the case lags behind because', 'of the choke.', '', 'Capsule pressure is higher:', 'it expands, and the pointer', 'shows a rate of descent.'],
    ('Vertical speed indicator mechanism in a descent with the capsule expanded and the pointer showing descent',
     '<b>Descent</b> — static pressure <b>rises</b>. The capsule receives the higher pressure immediately, but air can only enter the case slowly through the choke, so the case lags at a lower pressure. The capsule <b>expands</b> and the linkage moves the pointer to show a <b>rate of descent</b>. The faster the descent, the bigger the pressure difference. When the aircraft levels off, the case catches up after a few seconds (the instrument’s lag) and the pointer returns to zero.'), 'in')
vsi('fig_06_03', 'VSI — Climb', 12, '#2f5038', 52, 'COMPRESSED',
    ['Climb', 'Static pressure is decreasing.', 'The capsule feels it at once;', 'the case lags behind because', 'of the choke.', '', 'Case pressure is higher:', 'the capsule is compressed, and', 'the pointer shows a rate of climb.'],
    ('Vertical speed indicator mechanism in a climb with the capsule compressed and the pointer showing climb',
     '<b>Climb</b> — static pressure <b>falls</b>. The capsule follows it immediately, but air can only escape from the case slowly through the choke, so the case stays at a higher pressure. The capsule is <b>compressed</b> and the pointer shows a <b>rate of climb</b>. If the static source blocks, capsule and case equalise and the VSI reads zero whatever the aircraft is doing.'), 'out')

# ───────────── fig_04_01  ASI mechanism ─────────────
f = Fig('fig_04_01', 'Airspeed Indicator Mechanism', 760, 330,
        'Airspeed indicator mechanism: pitot pressure inside the capsule, static pressure in the case, and a linkage driving the pointer',
        '<b>The ASI measures dynamic pressure.</b> Pitot pressure — dynamic plus static (Dy + S) — is fed <b>inside the capsule</b>; static pressure (S) fills the <b>case</b> around it. The static part cancels, so the capsule expands in proportion to <b>dynamic pressure</b> alone, ½ρV². A lever, toothed quadrant and pinion magnify the tiny movement and turn the pointer over a scale marked in knots. Because it is calibrated for ISA sea-level density, the ASI shows <b>indicated</b> airspeed, which under-reads true airspeed as altitude increases.')
pin = mech(f, 30, '#5a2f2a', 112)
s1, s2 = pol(pin[0], pin[1], 100, 30), pol(pin[0], pin[1], 100, 150)
f.P(f'M{s1[0]:.1f},{s1[1]:.1f} A100,100 0 0 1 {s2[0]:.1f},{s2[1]:.1f}', 'ink', 1.8)
for i in range(13):
    a = 30 + i * 10; p, q = pol(pin[0], pin[1], 94 if i % 3 == 0 else 97, a), pol(pin[0], pin[1], 104, a); f.L(p[0], p[1], q[0], q[1], 'ink', 1.8 if i % 3 == 0 else 1)
for a, lab in ((30, '40'), (60, '60'), (90, '80'), (120, '100'), (150, '120')):
    x, y = pol(pin[0], pin[1], 82, a); f.T(x, y + 3.5, lab, 9.5, 'ink', 'middle', bold=True, halo=True)
f.T(436, 62, 'knots', 9.5, 'dim')
f.L(10, 165, 120, 165, 'hot', 3.2, me='hot'); f.T(46, 152, 'pitot', 10, 'hot', bold=True)
f.L(10, 262, 40, 262, 'cool', 3.2); f.L(40, 262, 74, 262, 'cool', 2, me='cool')
f.T(80, 266, 'static (S) fills the case', 10, 'cool', bold=True)
f.T(150, 232, 'capsule', 10, 'ink', 'middle'); f.T(150, 100, 'Dy + S inside', 10, 'hot', 'middle', bold=True)
f.T(52, 60, 'case = static pressure (S)', 9.5, 'cool')
f.T(214, 154, 'link', 9, 'dim', 'middle'); f.T(318, 92, 'quadrant', 9, 'dim'); f.T(362, 226, 'pinion + pointer', 9, 'dim', 'middle')
y = 70
for i, t in enumerate(['Inside the capsule: Dy + S', 'Outside (the case): S', '', 'Difference = Dy, the dynamic', 'pressure, which grows with', 'the square of airspeed.', '', 'The linkage turns the small', 'capsule movement into a', 'pointer reading in knots.']):
    if t: f.T(520, y, t, 10.5 if i < 2 else 10, ('hot' if i == 0 else 'cool') if i < 2 else 'dim', bold=(i < 2))
    y += 16
f.T(270, 312, 'capsule expansion is proportional to pitot minus static = dynamic pressure', 10, 'dim', 'middle')
OUT[f.fid] = f

# ───────────── fig_12_03  air-driven gyro rotor ─────────────
f = Fig('fig_12_03', 'Air-Driven Gyro Rotor', 760, 320,
        'An air-driven gyro rotor with buckets cut in its rim, spun by an air jet, shown face-on and from the side',
        '<b>Air-driven gyros</b> are spun by the aircraft’s vacuum (suction) system. Air drawn into the instrument case is directed by a <b>nozzle</b> onto <b>buckets cut into the rim</b> of the rotor, driving it like a small turbine at roughly <b>10 000–15 000 rpm</b>. The rotor is made with most of its mass in the rim, which maximises its moment of inertia and therefore its <b>rigidity</b>. Low suction — an engine at idle, a failed pump or a blocked filter — means low rotor speed, less rigidity and an unreliable, slow-to-erect instrument; always check the suction gauge.')
cx, cy = 230, 160
f.Ci(cx, cy, 86, 'ink', 2, 'steel')
for i in range(24):
    x, y = pol(cx, cy, 77, i * 15); f.Ci(x, y, 5.5, 'ink', 1, 'bg')
f.Ci(cx, cy, 52, 'line', 1.2); f.Ci(cx, cy, 14, 'ink', 1.4, 'g3'); f.Ci(cx, cy, 4, 'ink', 1, 'ink')
f.P('M132,292 L148,292 L144,222 L136,222 Z', 'ink', 1.4, 'g3'); f.L(140, 218, 140, 172, 'cool', 3, me='cool')
a, b = pol(cx, cy, 102, 325), pol(cx, cy, 102, 35)
f.P(f'M{a[0]:.1f},{a[1]:.1f} A102,102 0 0 1 {b[0]:.1f},{b[1]:.1f}', 'gold', 2.4, me='gold')
f.T(230, 46, 'rotation', 10, 'gold', 'middle', bold=True)
bx, by = pol(cx, cy, 77, 45)
f.T(336, 86, 'buckets cut in the rim', 10.5, 'ink'); f.L(333, 84, bx + 6, by - 2, 'dim', 1)
f.T(30, 310, 'air jet from the nozzle (drawn in by suction)', 10, 'cool')
f.T(92, 204, 'nozzle', 10, 'ink', 'end'); f.L(96, 204, 134, 236, 'dim', 1)
f.T(230, 268, 'face-on', 9.5, 'faint', 'middle')
f.L(470, 160, 650, 160, 'hot', 1.4, dash='10 4 2 4')
f.R(546, 78, 28, 164, c='ink', sw=1.8, fill='steel', rx=7); f.R(546, 78, 28, 22, c='ink', sw=1, fill='g3', rx=5); f.R(546, 220, 28, 22, c='ink', sw=1, fill='g3', rx=5)
f.R(498, 152, 16, 16, c='ink', sw=1.4, fill='gold', rx=2); f.R(606, 152, 16, 16, c='ink', sw=1.4, fill='gold', rx=2)
f.P('M506,168 L506,262 L614,262 L614,168', 'ink', 2, join='round')
f.T(462, 164, 'X', 11, 'ink', 'end', bold=True); f.T(658, 164, 'X', 11, 'ink', bold=True)
f.T(560, 56, 'side view: spin axis X–X', 10.5, 'ink', 'middle', bold=True)
f.T(664, 118, 'heavy rim', 10, 'ink'); f.L(660, 114, 576, 90, 'dim', 1)
f.T(664, 216, 'bearings', 10, 'ink'); f.L(660, 212, 624, 166, 'dim', 1)
f.T(560, 286, 'mass in the rim = high rigidity', 10, 'dim', 'middle'); f.T(560, 302, 'typically 10 000–15 000 rpm', 10, 'gold', 'middle')
OUT[f.fid] = f

# ───────────── splice into the gallery ─────────────
g = 'instruments-gallery.html'; s = open(g).read()
for fid, fig in OUT.items():
    m = re.search(r'\n  <!-- [^\n]*-->\n  <section class="card">\s*<h2>[^<]*</h2>\s*<div class="meta"><span class="tag">' + fid + r'</span>.*?</section>\n', s, flags=re.S)
    assert m, fid
    num = re.search(r'<!-- (\d+)', m.group(0)).group(1)
    s = s[:m.start()] + fig.html(num) + s[m.end():]
open(g, 'w').write(s)
print('replaced', len(OUT), 'cards; QA warnings:', len(WARN))
for w in WARN: print('  ⚠', w)
