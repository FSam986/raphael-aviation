#!/usr/bin/env python3
"""Instruments gallery batch 4 generator: 21 original SVG figures + built-in
QA (text out-of-bounds and text/text overlap detection)."""
import math, html, sys

C = dict(ink='var(--chart-ink)', dim='var(--chart-ink-dim)', faint='var(--chart-ink-faint)',
         gold='var(--gold)', gd='var(--gold-deep)', hot='var(--hot)', cool='var(--cool)',
         green='var(--green)', warm='var(--warm)', steel='var(--steel)', g2='var(--chart-ground-2)',
         g3='var(--chart-ground-3)', line='var(--chart-line-2)', bg='var(--chart-ground)',
         white='#ffffff', black='#0b0f11', mag='#d94fa0', amber='#f0a830', sky='#2f6f93', gnd='#7a5a34')
def col(c): return C.get(c, c)
WARN = []

class Fig:
    def __init__(s, fid, title, W, H, aria, cap):
        s.fid, s.title, s.W, s.H, s.aria, s.cap = fid, title, W, H, aria, cap
        s.e, s.tb = [], []
    def raw(s, x): s.e.append(x)
    def T(s, x, y, txt, size=10.5, fill='dim', anchor='start', bold=False, mono=False, halo=False, rot=None, check=True):
        w = len(txt) * size * (0.61 if mono else 0.54)
        x0 = x if anchor == 'start' else (x - w if anchor == 'end' else x - w / 2)
        if check and rot is None: s.tb.append((x0, y - size * 0.78, x0 + w, y + size * 0.22, txt))
        fam = 'ui-monospace,Menlo,monospace' if mono else 'Overpass,sans-serif'
        a = f' text-anchor="{anchor}"' if anchor != 'start' else ''
        b = ' font-weight="700"' if bold else ''
        h = f' paint-order="stroke" stroke="{col("bg")}" stroke-width="3.5" stroke-linejoin="round"' if halo else ''
        r = f' transform="rotate({rot} {x} {y})"' if rot is not None else ''
        s.e.append(f'<text x="{x:.1f}" y="{y:.1f}" font-family="{fam}" font-size="{size}" fill="{col(fill)}"{a}{b}{h}{r}>{html.escape(txt)}</text>')
    def L(s, x1, y1, x2, y2, c='ink', sw=1.6, dash=None, me=None, ms=None, cap=None):
        d = f' stroke-dasharray="{dash}"' if dash else ''
        m = (f' marker-end="url(#m-{me})"' if me else '') + (f' marker-start="url(#m-{ms})"' if ms else '')
        k = f' stroke-linecap="{cap}"' if cap else ''
        s.e.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{col(c)}" stroke-width="{sw}"{d}{m}{k}/>')
    def P(s, d, c='ink', sw=1.6, fill='none', dash=None, me=None, ms=None, op=None, join=None):
        da = f' stroke-dasharray="{dash}"' if dash else ''
        m = (f' marker-end="url(#m-{me})"' if me else '') + (f' marker-start="url(#m-{ms})"' if ms else '')
        o = f' opacity="{op}"' if op else ''
        j = f' stroke-linejoin="{join}"' if join else ''
        s.e.append(f'<path d="{d}" stroke="{col(c)}" stroke-width="{sw}" fill="{col(fill)}"{da}{m}{o}{j}/>')
    def R(s, x, y, w, h, c='ink', sw=1.6, fill='g2', rx=6, dash=None, op=None):
        da = f' stroke-dasharray="{dash}"' if dash else ''
        o = f' opacity="{op}"' if op else ''
        s.e.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{col(fill)}" stroke="{col(c)}" stroke-width="{sw}"{da}{o}/>')
    def Ci(s, cx, cy, r, c='ink', sw=1.6, fill='none'):
        s.e.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r}" fill="{col(fill)}" stroke="{col(c)}" stroke-width="{sw}"/>')
    def El(s, cx, cy, rx, ry, c='ink', sw=1.6, fill='none'):
        s.e.append(f'<ellipse cx="{cx:.1f}" cy="{cy:.1f}" rx="{rx}" ry="{ry}" fill="{col(fill)}" stroke="{col(c)}" stroke-width="{sw}"/>')
    def box(s, x, y, w, h, lines, c='ink', fill='g2', size=10.5, bold_first=True, tcol='ink', sub='dim'):
        s.R(x, y, w, h, c=c, fill=fill)
        n = len(lines); lh = size + 3.5
        y0 = y + h / 2 - (n - 1) * lh / 2 + size * 0.35
        for i, t in enumerate(lines):
            s.T(x + w / 2, y0 + i * lh, t, size=size if i == 0 else size - 1, fill=tcol if i == 0 else sub,
                anchor='middle', bold=(bold_first and i == 0))
            if len(t) * size * 0.54 > w - 6: WARN.append(f'{s.fid}: box text too wide: "{t}" in w={w}')
    def badge(s, x, y, n, c='gold'):
        s.e.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="9" fill="{col(c)}"/>')
        s.e.append(f'<text x="{x:.1f}" y="{y + 3.7:.1f}" text-anchor="middle" font-family="Overpass,sans-serif" font-size="10.5" font-weight="700" fill="#10171b">{n}</text>')
        s.tb.append((x - 9, y - 9, x + 9, y + 9, f'badge {n}'))
    def legend(s, x, y0, rows, step=36, maxx=None):
        for i, (n, t, d) in enumerate(rows):
            y = y0 + i * step
            s.badge(x, y, n)
            s.T(x + 18, y - 1, t, size=11, fill='ink', bold=True)
            s.T(x + 18, y + 12.5, d, size=9.5)
    def qa(s):
        for (x0, y0, x1, y1, t) in s.tb:
            if x0 < 2 or x1 > s.W - 2 or y0 < 1 or y1 > s.H - 1:
                WARN.append(f'{s.fid}: OUT OF BOUNDS "{t}" [{x0:.0f},{y0:.0f},{x1:.0f},{y1:.0f}] in {s.W}x{s.H}')
        for i in range(len(s.tb)):
            for j in range(i + 1, len(s.tb)):
                a, b = s.tb[i], s.tb[j]
                if a[0] < b[2] - 1 and b[0] < a[2] - 1 and a[1] < b[3] - 1 and b[1] < a[3] - 1:
                    WARN.append(f'{s.fid}: TEXT OVERLAP "{a[4]}" x "{b[4]}"')
    def html(s, n):
        s.qa()
        return (f'\n  <!-- {n} ─ {s.title.upper()} -->\n  <section class="card">\n    <h2>{html.escape(s.title)}</h2>\n'
                f'    <div class="meta"><span class="tag">{s.fid}</span><span class="tag ok">Original redraw</span></div>\n'
                f'    <div class="stage">\n      <svg viewBox="0 0 {s.W} {s.H}" role="img" aria-label="{html.escape(s.aria)}">\n        '
                + '\n        '.join(s.e) + f'\n      </svg>\n    </div>\n    <p class="cap">{s.cap}</p>\n  </section>\n')

def pol(cx, cy, r, deg):
    """Point at compass angle deg (clockwise from top)."""
    a = math.radians(deg); return cx + r * math.sin(a), cy - r * math.cos(a)

FIGS = []

# ───────────────────────── 1  fig_11_06  precession ─────────────────────────
f = Fig('fig_11_06', 'Gyroscopic Precession', 760, 340,
        'A gimballed gyro with a weight hung on one end of the spin axis; the gyro turns about the vertical axis instead of tilting',
        '<b>Precession</b> — a force applied to a spinning gyro does not move it in the direction of the force. The rotor behaves as if the force had been applied <b>90° further on in the direction of spin</b>. Here a weight pulls down on one end of the spin axis (trying to tilt it about Y–Y); instead of tilting, the whole gyro <b>turns about the vertical axis Z–Z</b>. The rate of precession rises with a bigger force and falls with higher rotor speed or mass (more rigidity). Every gyro erection and slaving system uses this effect deliberately.')
f.L(300, 14, 300, 322, 'faint', 1.2, dash='5 4')
f.L(213, 222, 387, 108, 'faint', 1.2, dash='5 4')
f.El(300, 165, 95, 140, 'gd', 5)
f.El(300, 165, 150, 34, 'gold', 5)
f.L(150, 165, 450, 165, 'ink', 3.2)
f.El(300, 165, 40, 90, 'ink', 1.6, 'steel')
f.P('M150,165 A150,34 0 0 0 450,165', 'gold', 5)
f.Ci(300, 165, 5, 'ink', 1.2, 'dim')
for (x, y) in [(300, 25), (300, 305), (213, 222), (387, 108), (150, 165), (450, 165)]:
    f.Ci(x, y, 4.5, 'ink', 1.2, 'dim')
f.El(300, 318, 70, 8, 'gd', 1.4, 'steel')
f.P('M316,118 A16,48 0 0 1 316,212', 'gold', 2.4, me='gold')
f.T(272, 150, 'spin', 11, 'gold', bold=True)
f.L(450, 165, 450, 205, 'ink', 1.6)
f.P('M438,205 L462,205 L468,238 L432,238 Z', 'ink', 1.6, 'steel')
f.L(450, 238, 450, 292, 'hot', 3, me='hot')
f.T(460, 272, 'applied force', 11, 'hot', bold=True)
f.P('M262,36 A38,11 0 1 0 338,36', 'cool', 2.6, me='cool')
f.T(348, 32, 'precession', 11, 'cool', bold=True)
f.T(290, 18, 'Z', 11, 'ink', 'end', bold=True)
f.T(140, 169, 'X', 11, 'ink', 'end', bold=True)
f.T(462, 160, 'X', 11, 'ink', bold=True)
f.T(203, 238, 'Y', 11, 'ink', 'end', bold=True)
f.T(395, 104, 'Y', 11, 'ink', bold=True)
f.T(40, 50, 'outer gimbal', 10.5); f.L(112, 52, 229, 69, 'dim', 1)
f.T(40, 232, 'inner gimbal', 10.5); f.L(98, 222, 164, 186, 'dim', 1)
y = 86
for i, (c_, lines) in enumerate([('hot', ['1  A force acts on the end', '    of the spin axis X–X.']),
                                 ('dim', ['2  The gyro reacts as if the', '    force acted 90° further on', '    in the direction of spin.']),
                                 ('cool', ['3  Result: it turns about the', '    vertical axis Z–Z instead', '    of tilting — precession.'])]):
    for t in lines:
        f.T(560, y, t, 10.5, c_ if c_ != 'dim' else 'ink'); y += 15
    y += 12
FIGS.append(f)

# ───────────────────────── 2  fig_11_12  earth rate at the pole ─────────────
f = Fig('fig_11_12', 'Earth-Rate (Apparent) Wander at the Pole', 760, 340,
        'Polar view of the Earth with a gyro at two times; the gyro axis stays fixed in space while the local meridian rotates away from it',
        '<b>Apparent wander</b> — a perfect gyro holds its spin axis fixed <b>in space</b>, but we measure it against the Earth, which turns at <b>15° per hour</b>. Seen from above the North Pole, a horizontal-axis gyro is lined up with a meridian at position 1; four hours later the Earth has carried it to position 2 and the meridian has swung 60°, while the gyro still points the same way in space. To an observer on the Earth the gyro appears to have drifted. Apparent drift is <b>15 × sin(latitude) °/h</b>: maximum at the poles, zero at the equator.')
cx, cy, R = 240, 175, 140
f.Ci(cx, cy, R, 'cool', 2, 'g3')
for a in range(0, 360, 30):
    x, y = pol(cx, cy, R, a); f.L(cx, cy, x, y, 'line', 1)
for r in (47, 93): f.Ci(cx, cy, r, 'line', 1)
# meridians of interest
f.L(cx, cy, cx, cy - R, 'gold', 1.8, dash='6 4')
ex, ey = pol(cx, cy, R, -60); f.L(cx, cy, ex, ey, 'gold', 1.8, dash='6 4')
p1 = (cx, cy - 70); p2 = pol(cx, cy, 70, -60)
for (px, py) in (p1, p2):
    f.L(px, py - 35, px, py + 35, 'hot', 3.2, cap='round')
    f.El(px, py, 17, 6, 'ink', 1.4, 'steel')
ax, ay = pol(p2[0], p2[1], 26, -60)
f.P(f'M{p2[0]:.1f},{p2[1]-26:.1f} A26,26 0 0 0 {ax:.1f},{ay:.1f}', 'ink', 1.6)
f.T(30, 30, 'apparent wander 60°', 10.5, 'ink', bold=True); f.L(118, 35, 166, 116, 'dim', 1)
f.badge(264, 98, 1); f.badge(209, 123, 2)
f.Ci(cx, cy, 3.5, 'ink', 1, 'ink')
f.T(cx + 8, cy + 16, 'N Pole', 10, 'ink', halo=True, bold=True)
sx, sy = cx + 154 * math.cos(math.radians(20)), cy + 154 * math.sin(math.radians(20))
f.P(f'M{sx:.1f},{sy:.1f} A154,154 0 0 0 {sx:.1f},{2*cy-sy:.1f}', 'cool', 2.4, me='cool')
f.T(404, 170, 'Earth turns', 10.5, 'cool'); f.T(404, 184, '15°/h', 10.5, 'cool', bold=True)
y = 52
for t in ["Rigidity keeps the gyro's spin axis", 'pointing at a fixed point in space.', 'The Earth turns beneath it, so against',
          'the local meridian the axis appears', 'to wander, with no real force acting.', '', 'Horizontal-axis gyro at the pole:',
          'apparent drift = 15°/h (maximum).', 'At the equator: zero drift.']:
    if t: f.T(492, y, t, 10.5, 'ink' if 'drift' in t else 'dim', bold=('15°/h' in t))
    y += 16
f.L(492, 226, 518, 226, 'hot', 3.2, cap='round'); f.T(526, 230, 'gyro spin axis (fixed in space)', 10)
f.L(492, 248, 518, 248, 'gold', 1.8, dash='6 4'); f.T(526, 252, 'local meridian (turns with Earth)', 10)
f.badge(501, 278, 1); f.T(518, 282, 'start: axis along the meridian', 10)
f.badge(501, 302, 2); f.T(518, 306, '4 hours later: Earth has turned 60°', 10)
FIGS.append(f)

# ───────────────────────── 3  fig_12_10  DGI apparent wander ────────────────
f = Fig('fig_12_10', 'DGI Apparent Wander at High Latitude', 760, 330,
        'A stationary directional gyro near the South Pole; after three hours the Earth has turned 45 degrees and the DGI reading has changed from 360 to 045',
        '<b>DGI apparent wander</b> — a stationary directional gyro with <b>no real wander</b> still changes its reading. At A it is aligned with the meridian and reads 360°. Three hours later the Earth has turned 45° (15°/h × 3 h, at the pole); the gyro still points the same way in space, but the aircraft’s north has rotated, so the DGI now reads <b>045°</b>. The rate is <b>15 × sin(latitude) °/h</b>: readings <b>increase in the Southern Hemisphere</b> and decrease in the Northern. The latitude nut (or regular re-synchronising with the compass) removes it.')
cx, cy, R = 150, 160, 100
f.Ci(cx, cy, R, 'cool', 2, 'g3')
for a in range(0, 360, 45):
    x, y = pol(cx, cy, R, a); f.L(cx, cy, x, y, 'line', 1)
f.Ci(cx, cy, 50, 'line', 1)
f.L(cx, cy, cx, cy - R, 'gold', 1.8, dash='6 4')
ex, ey = pol(cx, cy, R, 45); f.L(cx, cy, ex, ey, 'gold', 1.8, dash='6 4')
A = (cx, cy - 45); B = pol(cx, cy, 45, 45)
for (px, py) in (A, B):
    f.L(px, py - 22, px, py + 22, 'hot', 3.2, cap='round'); f.El(px, py, 12, 4.5, 'ink', 1.2, 'steel')
bx, by = pol(B[0], B[1], 28, 45)
f.P(f'M{B[0]:.1f},{B[1]-28:.1f} A28,28 0 0 1 {bx:.1f},{by:.1f}', 'ink', 1.5)
lx, ly = pol(B[0], B[1], 41, 22.5)
f.T(lx, ly + 3, '45°', 10, 'ink', 'middle', bold=True, halo=True)
f.T(136, 112, 'A', 11.5, 'ink', 'end', bold=True, halo=True)
f.T(B[0] + 10, B[1] + 24, 'B', 11.5, 'ink', bold=True, halo=True)
f.Ci(cx, cy, 3.5, 'ink', 1, 'ink'); f.T(cx, cy + 17, 'S Pole', 10, 'ink', 'middle', bold=True, halo=True)
sx, sy = cx + 112 * math.cos(math.radians(25)), cy - 112 * math.sin(math.radians(25))
f.P(f'M{sx:.1f},{sy:.1f} A112,112 0 0 1 {sx:.1f},{2*cy-sy:.1f}', 'cool', 2.4, me='cool')
f.T(150, 284, 'viewed from above the South Pole', 10, 'dim', 'middle')
f.T(150, 298, 'Earth turns clockwise, 15°/h', 10, 'cool', 'middle')
f.L(40, 316, 62, 316, 'hot', 3.2, cap='round'); f.T(68, 320, 'gyro axis', 9.5)
f.L(140, 316, 162, 316, 'gold', 1.8, dash='6 4'); f.T(168, 320, 'true north (meridian)', 9.5)
def dgi(f, cx, cy, hdg, top, bottom):
    f.Ci(cx, cy, 62, 'ink', 2.2, 'g3')
    for a in range(0, 360, 10):
        r0 = 50 if a % 30 == 0 else 55
        x1, y1 = pol(cx, cy, r0, a - hdg); x2, y2 = pol(cx, cy, 60, a - hdg)
        f.L(x1, y1, x2, y2, 'ink', 1.6 if a % 30 == 0 else 1)
    for lab, a in (('N', 0), ('E', 90), ('S', 180), ('W', 270)):
        x, y = pol(cx, cy, 40, a - hdg); f.T(x, y + 4, lab, 11, 'gold' if lab == 'N' else 'ink', 'middle', bold=True)
    f.P(f'M{cx},{cy-63} L{cx-6},{cy-75} L{cx+6},{cy-75} Z', 'gold', 1, 'gold')
    f.L(cx, cy - 16, cx, cy + 16, 'gd', 3, cap='round'); f.L(cx - 14, cy - 2, cx + 14, cy - 2, 'gd', 3, cap='round'); f.L(cx - 6, cy + 13, cx + 6, cy + 13, 'gd', 2.4, cap='round')
    f.T(cx, cy - 86, top, 10.5, 'dim', 'middle'); f.T(cx, cy + 86, bottom, 12, 'ink', 'middle', bold=True)
dgi(f, 400, 140, 0, 'At A — time 0', 'DGI reads 360°')
dgi(f, 620, 140, 45, 'At B — 3 hours later', 'DGI reads 045°')
f.L(474, 140, 546, 140, 'cool', 2.4, me='cool'); f.T(510, 130, 'Earth turns 45°', 9.5, 'cool', 'middle')
f.R(330, 262, 410, 56, c='line', fill='g2')
f.T(535, 284, 'Apparent wander = 15 × sin(latitude) °/h', 11, 'ink', 'middle', bold=True)
f.T(535, 303, 'Southern Hemisphere: readings increase | Northern: decrease', 10, 'dim', 'middle')
FIGS.append(f)

# ───────────────────────── 4  fig_12_13  wander vs latitude ─────────────────
f = Fig('fig_12_13', 'DGI Total Wander vs Latitude (Latitude Nut Set for 60°N)', 760, 380,
        'Graph of total DGI wander in degrees per hour against latitude for a gyro whose latitude nut is set for 60 degrees north',
        '<b>Latitude-nut compensation</b> — Earth-rate drift (15 × sin latitude °/h) is cancelled by a small <b>latitude nut</b> that makes the gyro precess at an equal and opposite rate. But the nut gives a <b>fixed</b> correction, exact only at the latitude it was set for. Here it is set for 60°N (+13°/h): the total wander is <b>zero at 60°N</b>, +13°/h at the equator (no Earth rate to cancel), −2°/h at the North Pole and <b>+28°/h at the South Pole</b>, where the correction and the Earth rate add. Away from the set latitude the DGI must be re-synchronised more often.')
px = lambda w: 150 + (w + 2) * 12
py = lambda lat: 50 + (90 - lat) * 1.5
f.R(150, 50, 360, 270, c='line', sw=1.4, fill='bg', rx=0)
for w, lab in ((-2, '−2'), (0, '0'), (5, '+5'), (10, '+10'), (15, '+15'), (20, '+20'), (25, '+25'), (28, '+28')):
    f.L(px(w), 50, px(w), 320, 'line', 1.4 if w == 0 else 0.7)
    f.T(px(w), 42, lab, 10, 'dim', 'middle')
for lat, lab in ((90, '90°N'), (60, '60°N'), (30, '30°N'), (0, '0°'), (-30, '30°S'), (-60, '60°S'), (-90, '90°S')):
    f.L(150, py(lat), 510, py(lat), 'line', 0.7)
    f.T(142, py(lat) + 3.5, lab, 10, 'dim', 'end')
neg = ' '.join(f'{px(13 - 15*math.sin(math.radians(l))):.1f},{py(l):.1f}' for l in range(90, 59, -2))
pos = ' '.join(f'{px(13 - 15*math.sin(math.radians(l))):.1f},{py(l):.1f}' for l in range(60, -91, -2))
f.raw(f'<polyline points="{neg}" fill="none" stroke="{col("hot")}" stroke-width="2.6"/>')
f.raw(f'<polyline points="{pos}" fill="none" stroke="{col("cool")}" stroke-width="2.6"/>')
f.T(330, 20, 'total wander (degrees per hour)', 11, 'ink', 'middle', bold=True)
f.T(92, 185, 'latitude', 11, 'ink', 'middle', bold=True, rot=-90)
f.L(180, py(60), 524, py(60), 'gold', 1, dash='3 4'); f.Ci(px(0), py(60), 4.5, 'gold', 1, 'gold')
f.T(530, py(60) - 2, '60°N: zero wander', 10.5, 'gold', bold=True); f.T(530, py(60) + 12, '(the latitude the nut is set for)', 9.5)
f.L(px(13) + 6, py(0), 524, py(0), 'cool', 1, dash='3 4'); f.Ci(px(13), py(0), 4.5, 'cool', 1, 'cool')
f.T(530, py(0) - 2, 'Equator: +13°/h', 10.5, 'cool', bold=True); f.T(530, py(0) + 12, '(nut correction only)', 9.5)
f.Ci(px(-2), py(90), 4.5, 'hot', 1, 'hot'); f.T(530, 54, '90°N: −2°/h', 10.5, 'hot', bold=True)
f.Ci(px(28), py(-90), 4.5, 'cool', 1, 'cool'); f.T(530, 324, '90°S: +28°/h', 10.5, 'cool', bold=True)
f.T(380, 356, 'total wander = +13 (latitude nut, real)  −  15 × sin(latitude) (Earth rate, apparent)', 10.5, 'dim', 'middle')
FIGS.append(f)

# ───────────────────────── 5/6  artificial horizon faces ────────────────────
def ah(f, cx, cy, R, pitch_px, bank, uid):
    f.raw(f'<defs><clipPath id="{uid}"><circle cx="{cx}" cy="{cy}" r="{R-3}"/></clipPath></defs>')
    g = [f'<g clip-path="url(#{uid})"><g transform="rotate({-bank} {cx} {cy})">']
    hy = cy + pitch_px
    g.append(f'<rect x="{cx-2*R}" y="{cy-2*R}" width="{4*R}" height="{2*R+pitch_px}" fill="{C["sky"]}"/>')
    g.append(f'<rect x="{cx-2*R}" y="{hy}" width="{4*R}" height="{2*R}" fill="{C["gnd"]}"/>')
    g.append(f'<line x1="{cx-2*R}" y1="{hy}" x2="{cx+2*R}" y2="{hy}" stroke="#fff" stroke-width="3"/>')
    for d, hw in ((10, 20), (20, 28), (-10, 20), (-20, 28)):
        g.append(f'<line x1="{cx-hw}" y1="{hy-d*2.7}" x2="{cx+hw}" y2="{hy-d*2.7}" stroke="#fff" stroke-width="1.4" opacity=".85"/>')
    for d in (5, 15, -5, -15):
        g.append(f'<line x1="{cx-9}" y1="{hy-d*2.7}" x2="{cx+9}" y2="{hy-d*2.7}" stroke="#fff" stroke-width="1.1" opacity=".7"/>')
    g.append(f'<path d="M{cx},{cy-R+5} L{cx-7},{cy-R+19} L{cx+7},{cy-R+19} Z" fill="#fff"/>')
    g.append('</g></g>')
    f.raw(''.join(g))
    f.Ci(cx, cy, R, 'ink', 3)
    for a in (0, 10, 20, 30, 60, -10, -20, -30, -60):
        x1, y1 = pol(cx, cy, R + 2, a); x2, y2 = pol(cx, cy, R + (12 if a in (0, 30, -30, 60, -60) else 8), a)
        f.L(x1, y1, x2, y2, 'ink', 2 if a == 0 else 1.4)
    f.L(cx - 44, cy, cx - 16, cy, 'gold', 4, cap='round'); f.L(cx + 16, cy, cx + 44, cy, 'gold', 4, cap='round')
    f.L(cx - 16, cy, cx - 16, cy + 8, 'gold', 4, cap='round'); f.L(cx + 16, cy, cx + 16, cy + 8, 'gold', 4, cap='round')
    f.Ci(cx, cy, 3.5, 'gold', 1, 'gold')

f = Fig('fig_13_03', 'Artificial Horizon — Climb Indication', 760, 300,
        'Two artificial horizon faces: level flight, and a climb with the horizon bar below the miniature aircraft',
        '<b>Reading pitch</b> — the miniature aircraft is fixed to the instrument case (and so to the real aircraft); the horizon bar is held level by the gyro. In a <b>climb</b> the nose — and the miniature aircraft — rise above the real horizon, so the <b>horizon bar appears below the aircraft symbol</b>. In a descent the bar sits above it. The display is “inside-looking-out”: it shows exactly what the pilot would see through the windscreen.')
ah(f, 140, 142, 95, 0, 0, 'ah1'); ah(f, 390, 142, 95, 27, 0, 'ah2')
f.T(140, 272, 'level flight', 11, 'ink', 'middle', bold=True)
f.T(390, 272, 'climb — 10° nose-up', 11, 'ink', 'middle', bold=True)
y = 66
for t in ['Climb: the nose rises above the', 'real horizon, so the horizon bar', 'sits BELOW the miniature aircraft.', '',
          'The miniature aircraft is fixed to', 'the case; the gyro keeps the', 'horizon bar level with the Earth.']:
    if t: f.T(520, y, t, 10.5, 'ink' if 'BELOW' in t else 'dim', bold=('BELOW' in t))
    y += 16
f.L(520, 200, 548, 200, 'gold', 4, cap='round'); f.T(556, 204, 'miniature aircraft (fixed)', 10)
f.L(520, 222, 548, 222, 'white', 3); f.T(556, 226, 'horizon bar (gyro-stabilised)', 10)
f.T(520, 250, 'pitch marks every 5°', 10)
FIGS.append(f)

f = Fig('fig_13_04', 'Artificial Horizon — Bank Indication', 760, 300,
        'Two artificial horizon faces showing a 30 degree right bank and a 30 degree left bank',
        '<b>Reading bank</b> — when the aircraft rolls, the case and miniature aircraft roll with it while the gyro holds the horizon bar level, so the bar appears tilted the <b>opposite way</b>. In a <b>right bank</b> the right wing of the miniature aircraft drops toward the ground half of the display and the horizon slopes up to the right. The <b>bank pointer</b> stays at the true vertical; read the bank angle where it sits against the fixed scale (marks at 10°, 20°, 30° and 60°).')
ah(f, 140, 142, 95, 0, 30, 'ah3'); ah(f, 390, 142, 95, 0, -30, 'ah4')
f.T(140, 272, '30° right bank', 11, 'ink', 'middle', bold=True)
f.T(390, 272, '30° left bank', 11, 'ink', 'middle', bold=True)
y = 66
for t in ['Right bank: the aircraft symbol’s', 'right wing drops below the horizon', 'bar; the bar slopes up to the right.', '',
          'The white bank pointer stays at the', 'true vertical. Read the angle where', 'it sits on the fixed scale.']:
    if t: f.T(520, y, t, 10.5);
    y += 16
f.L(520, 200, 548, 200, 'gold', 4, cap='round'); f.T(556, 204, 'miniature aircraft (fixed)', 10)
f.L(520, 222, 548, 222, 'white', 3); f.T(556, 226, 'horizon bar (stays level)', 10)
f.P('M534,238 L527,252 L541,252 Z', 'white', 1, 'white'); f.T(556, 250, 'bank pointer', 10)
f.T(520, 274, 'scale: 10°, 20°, 30°, 60°', 10)
FIGS.append(f)

# ───────────────────────── 7  fig_13_06  pendulous vanes ────────────────────
f = Fig('fig_13_06', 'Pendulous-Vane Erection Unit', 760, 330,
        'Side view of an air-driven horizon rotor housing with a pendulous vane unit, and plan views of the four exhaust ports with the gyro vertical and tilted',
        '<b>Air-driven erection</b> — air that has driven the rotor exhausts through <b>four ports</b> in a pendulous unit under the rotor housing. Each port is half covered by a <b>vane that hangs freely</b>, opposite vanes sharing one spindle. With the gyro vertical all four ports are equally open and the jet reactions cancel. If the gyro tilts, the vanes stay vertical under gravity: <b>one port opens and its opposite closes</b>. The unbalanced reaction acts at 90° to the tilt, and <b>precession</b> brings the gyro back to the vertical. In an acceleration or a turn the vanes swing falsely — the cause of the air-driven horizon’s acceleration and turning errors.')
f.L(135, 34, 135, 58, 'faint', 1.2, dash='5 4'); f.L(135, 232, 135, 252, 'faint', 1.2, dash='5 4')
f.T(142, 46, 'spin axis', 9.5)
f.R(70, 60, 130, 80, c='gd', sw=2, fill='g3', rx=8); f.T(135, 104, 'rotor housing', 10.5, 'ink', 'middle')
f.R(120, 140, 30, 20, c='ink', sw=1.4, fill='steel', rx=0)
f.R(95, 160, 80, 70, c='ink', sw=1.8, fill='g3', rx=4)
f.R(127, 185, 16, 30, c='ink', sw=1.2, fill='black', rx=1)
f.R(135, 178, 15, 42, c='gd', sw=1.2, fill='gd', rx=1, op=0.9); f.Ci(142.5, 178, 3, 'ink', 1, 'dim')
f.L(95, 200, 62, 200, 'cool', 2.4, me='cool'); f.L(175, 200, 208, 200, 'cool', 2.4, me='cool')
f.T(58, 190, 'air out', 9.5, 'cool', 'end'); f.T(212, 190, 'air out', 9.5, 'cool')
f.T(190, 166, 'vane', 10, 'ink'); f.L(188, 164, 152, 182, 'dim', 1)
f.T(58, 228, 'port', 10, 'ink', 'end'); f.L(60, 224, 127, 206, 'dim', 1)
f.T(135, 272, 'pendulous unit: four ports, each', 10, 'dim', 'middle'); f.T(135, 286, 'half covered by a hanging vane', 10, 'dim', 'middle')
def plan(f, cx, cy, title, opens):
    f.R(cx - 40, cy - 40, 80, 80, c='ink', sw=1.8, fill='g3', rx=4)
    f.T(cx, 58, title, 11, 'ink', 'middle', bold=True)
    for side, (dx, dy) in (('L', (-1, 0)), ('R', (1, 0)), ('T', (0, -1)), ('B', (0, 1))):
        o = opens[side]                       # 0 closed, .5 half, 1 open
        ex, ey = cx + dx * 40, cy + dy * 40
        if dx:  # vertical slot
            f.R(ex - 4, ey - 14, 8, 28, c='ink', sw=1, fill='black', rx=1)
            if o < 1: f.R(ex - 4, ey - 14, 8, 28 * (1 - o), c='gd', sw=1, fill='gd', rx=1)
        else:
            f.R(ex - 14, ey - 4, 28, 8, c='ink', sw=1, fill='black', rx=1)
            if o < 1: f.R(ex - 14, ey - 4, 28 * (1 - o), 8, c='gd', sw=1, fill='gd', rx=1)
        if o > 0:
            ln = 30 if o == .5 else 55
            off = 7 if o == .5 else 0
            f.L(ex + dx * 6 + (off if dy else 0), ey + dy * 6 + (off if dx else 0), ex + dx * (6 + ln) + (off if dy else 0), ey + dy * (6 + ln) + (off if dx else 0), 'cool', 2.2 if o == .5 else 3.4, me='cool')
plan(f, 380, 165, 'gyro vertical (plan view)', dict(L=.5, R=.5, T=.5, B=.5))
plan(f, 610, 165, 'gyro tilted (plan view)', dict(L=1, R=0, T=.5, B=.5))
f.L(592, 160, 630, 160, 'hot', 3, me='hot'); f.T(610, 180, 'net reaction', 9, 'hot', 'middle', bold=True)
f.T(380, 272, 'all four ports half open:', 10, 'dim', 'middle'); f.T(380, 286, 'the reactions cancel', 10, 'dim', 'middle')
f.T(610, 272, 'one port opens, its opposite closes:', 10, 'dim', 'middle'); f.T(610, 286, 'the unbalanced reaction precesses', 10, 'dim', 'middle'); f.T(610, 300, 'the gyro back to the vertical', 10, 'dim', 'middle')
f.R(292, 312, 10, 10, c='gd', sw=1, fill='gd', rx=1); f.T(308, 321, 'vane', 9.5); f.L(350, 317, 376, 317, 'cool', 2.2, me='cool'); f.T(384, 321, 'exhaust air', 9.5)
FIGS.append(f)

# ───────────────────────── 8  fig_13_10  electric AH torque motors ──────────
f = Fig('fig_13_10', 'Electric Artificial Horizon — Levelling Switches & Torque Motors', 760, 350,
        'Plan view of an electric horizon gyro in its inner and outer gimbals with pitch and roll torque motors and levelling switches',
        '<b>Electric erection</b> — the electric horizon keeps its spin axis vertical with <b>levelling (mercury) switches</b> and <b>torque motors</b>. Because a gyro moves at 90° to an applied torque, each motor sits on the <b>other</b> axis: the fore-and-aft switch senses a pitch error and energises the <b>pitch torque motor on the roll axis</b>; the lateral switch senses a roll error and energises the <b>roll torque motor on the pitch axis</b>. The higher rotor speed (about 22 000 rpm) gives more rigidity, and the erection can be cut off during accelerations and turns — so the electric horizon has far smaller errors than the air-driven type.')
f.L(40, 180, 190, 180, 'hot', 1.4, dash='10 4 2 4'); f.L(530, 180, 640, 180, 'hot', 1.4, dash='10 4 2 4')
f.L(330, 30, 330, 62, 'hot', 1.4, dash='10 4 2 4'); f.L(330, 270, 330, 292, 'hot', 1.4, dash='10 4 2 4')
f.L(150, 162, 150, 198, 'dim', 3); f.L(560, 162, 560, 198, 'dim', 3)
f.T(150, 212, 'case', 9, 'faint', 'middle'); f.T(560, 212, 'case', 9, 'faint', 'middle')
f.R(190, 90, 280, 180, c='gd', sw=6, fill='none', rx=6)
f.R(176, 172, 14, 16, c='ink', sw=1.2, fill='steel', rx=2)
f.L(330, 100, 330, 115, 'ink', 3); f.L(330, 245, 330, 268, 'ink', 3); f.Ci(330, 257, 4.5, 'ink', 1.2, 'dim')
f.L(405, 180, 470, 180, 'ink', 3); f.L(190, 180, 255, 180, 'ink', 3)
f.R(255, 115, 150, 130, c='gold', sw=5, fill='g2', rx=6)
f.Ci(330, 180, 45, 'ink', 1.8, 'steel')
f.T(330, 177, 'spin axis', 9.5, 'ink', 'middle', bold=True); f.T(330, 190, 'X–X1 (vertical)', 9, 'ink', 'middle')
f.R(470, 150, 60, 60, c='cool', sw=2.4, fill='g3', rx=6)
f.R(300, 62, 60, 38, c='green', sw=2.4, fill='g3', rx=6)
f.R(262, 122, 40, 10, c='cool', sw=1.6, fill='cool', rx=5)
f.R(388, 150, 10, 60, c='green', sw=1.6, fill='green', rx=5)
f.T(34, 184, 'Z', 11, 'ink', 'end', bold=True); f.T(648, 184, 'Z1', 11, 'ink', bold=True)
f.T(44, 170, 'roll axis (fore-aft)', 10)
f.T(322, 26, 'Y', 11, 'ink', 'end', bold=True); f.T(342, 46, 'pitch axis (lateral)', 10)
f.T(342, 296, 'Y1', 11, 'ink', bold=True)
f.T(476, 128, 'PITCH torque motor', 10, 'cool', bold=True); f.T(476, 141, '(acts about the roll axis)', 9)
f.T(292, 66, 'ROLL torque motor', 10, 'green', 'end', bold=True); f.T(292, 79, '(acts about the pitch axis)', 9, 'dim', 'end')
f.T(36, 112, 'pitch levelling switch', 10, 'cool'); f.L(152, 114, 262, 126, 'cool', 1)
f.T(540, 262, 'roll levelling switch', 10, 'green'); f.L(536, 258, 399, 205, 'green', 1)
f.T(574, 108, 'outer gimbal', 10); f.L(572, 105, 472, 96, 'dim', 1)
f.T(36, 262, 'inner gimbal', 10); f.L(100, 258, 256, 236, 'dim', 1)
f.R(60, 311, 10, 10, c='cool', sw=1, fill='cool', rx=2)
f.T(78, 320, 'pitch error → fore-aft switch → pitch torque motor → torque about the ROLL axis → gyro precesses in pitch', 9.5)
f.R(60, 328, 10, 10, c='green', sw=1, fill='green', rx=2)
f.T(78, 337, 'roll error → lateral switch → roll torque motor → torque about the PITCH axis → gyro precesses in roll', 9.5)
FIGS.append(f)

# ───────────────────────── 9  fig_20_01  FM-CW principle ────────────────────
f = Fig('fig_20_01', 'Radio Altimeter — FM-CW Principle', 760, 380,
        'Triangular frequency sweep of the transmitted signal and the delayed received signal, with the constant frequency difference that represents height',
        '<b>How the radio altimeter measures height</b> — it transmits a <b>continuous wave</b> straight down whose frequency is swept up and down around <b>4 300 MHz</b> (band 4 200–4 400 MHz, SHF). The echo returns after a short delay Δt, by which time the transmitter has moved on to a new frequency. The <b>difference between transmitted and received frequency (Δf)</b> is proportional to the delay, and so to the <b>height above the surface directly below</b>. Δf drops to zero for an instant at each sweep reversal; the sweep rate is low so this has no effect on the reading. Range 0–2 500 ft, accuracy about ±3% or ±1 ft.')
k = 140 / 150.0
tx = [(110, 130), (185, 60), (335, 200), (485, 60), (635, 200), (720, 200 - 85 * k)]
rx = [(110, 130 + 24 * k), (209, 60), (359, 200), (509, 60), (659, 200), (720, 200 - 61 * k)]
f.L(110, 36, 110, 346, 'ink', 1.6); f.L(110, 346, 730, 346, 'ink', 1.6, me='ink')
f.L(110, 130, 720, 130, 'line', 1, dash='4 4'); f.L(110, 228, 720, 228, 'line', 1)
for t0 in (185, 335, 485, 635):
    for x in (t0, t0 + 24): f.L(x, 60 if t0 in (185, 485) else 200, x, 340, 'line', 0.8, dash='2 3')
f.raw(f'<polyline points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in tx)}" fill="none" stroke="{col("ink")}" stroke-width="2.6" stroke-linejoin="round"/>')
f.raw(f'<polyline points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in rx)}" fill="none" stroke="{col("hot")}" stroke-width="2.4" stroke-dasharray="7 4" stroke-linejoin="round"/>')
f.T(102, 64, '4 350 MHz', 10, 'dim', 'end'); f.T(102, 134, '4 300 MHz', 10, 'ink', 'end', bold=True); f.T(102, 204, '4 250 MHz', 10, 'dim', 'end')
f.T(22, 130, 'frequency', 11, 'ink', 'middle', bold=True, rot=-90)
f.T(132, 182, 'transmitted frequency', 10.5, 'ink', bold=True); f.L(200, 171, 261, 133, 'dim', 1)
f.T(262, 84, 'received frequency', 10.5, 'hot', bold=True); f.T(262, 98, '(echo, delayed by Δt)', 10, 'hot'); f.L(258, 81, 238, 86, 'hot', 1)
ty, ry = 200 - 85 * k, 200 - 61 * k
f.L(420, ty + 1.5, 420, ry - 1.5, 'gold', 3); f.L(414, ty, 426, ty, 'gold', 1.6); f.L(414, ry, 426, ry, 'gold', 1.6)
f.T(430, 160, 'Δf', 10.5, 'gold', bold=True); f.T(430, 173, 'proportional to height', 10, 'gold')
f.L(185, 48, 209, 48, 'gold', 1.6); f.L(185, 43, 185, 53, 'gold', 1.6); f.L(209, 43, 209, 53, 'gold', 1.6); f.T(197, 39, 'Δt', 10.5, 'gold', 'middle', bold=True)
beat = [(110, 300)]
for t0 in (185, 335, 485, 635): beat += [(t0, 300), (t0 + 12, 340), (t0 + 24, 300)]
beat.append((720, 300))
f.raw(f'<polyline points="{" ".join(f"{x},{y}" for x, y in beat)}" fill="none" stroke="{col("gold")}" stroke-width="2.6" stroke-linejoin="round"/>')
f.T(102, 304, 'Δf', 10.5, 'gold', 'end', bold=True); f.T(102, 344, 'zero', 10, 'dim', 'end')
f.T(22, 300, 'beat', 10, 'ink', 'middle', bold=True, rot=-90)
f.T(422, 290, 'Δf constant', 10, 'gold', 'middle')
f.T(347, 366, 'Δf dips to zero at each sweep reversal', 9.5, 'dim', 'middle'); f.T(724, 366, 'time', 10, 'ink', 'end', bold=True)
FIGS.append(f)

# ───────────────────────── 10  fig_20_02  rad alt dial ──────────────────────
f = Fig('fig_20_02', 'Radio Altimeter Indicator', 760, 340,
        'A radio altimeter dial reading 320 feet with a decision height bug, pointer mask, failure flag, DH lamp and test button',
        '<b>The analogue indicator</b> — the scale is <b>expanded at low level</b> (0–500 ft takes half the dial) where precision matters most, then compressed up to 2 500 ft. Above 2 500 ft, or with no valid signal, the pointer hides <b>behind the mask</b>. The pilot sets a <b>decision height</b> with the DH bug; the DH lamp lights (often with an audio tone) as the aircraft descends through it. A <b>failure flag</b> covers the face if power or signal is lost. The reading is height above the terrain directly below — not altitude — and it feeds the GPWS and the autoland flare.')
cx, cy = 190, 170
f.R(55, 35, 270, 270, c='line', sw=2, fill='g3', rx=16)
f.Ci(cx, cy, 122, 'ink', 2.4, 'black')
ang = {0: 0, 100: 36, 200: 72, 300: 108, 400: 144, 500: 180, 1000: 232, 2000: 284}
def hang(h):
    ks = sorted(ang)
    for a, b in zip(ks, ks[1:]):
        if a <= h <= b: return ang[a] + (h - a) / (b - a) * (ang[b] - ang[a])
    return 292
m1, m2 = pol(cx, cy, 106, 292), pol(cx, cy, 106, 352)
f.P(f'M{cx},{cy} L{m1[0]:.1f},{m1[1]:.1f} A106,106 0 0 1 {m2[0]:.1f},{m2[1]:.1f} Z', 'gd', 1, 'gold', op=0.92)
for h in list(range(0, 501, 20)) + [600, 700, 800, 900, 1000, 1500, 2000]:
    major = h in ang
    a = hang(h); p, q = pol(cx, cy, 106 if major else 112, a), pol(cx, cy, 120, a)
    f.L(p[0], p[1], q[0], q[1], 'white', 2.2 if major else 1.1)
for h, lab in ((0, '0'), (100, '1'), (200, '2'), (300, '3'), (400, '4'), (500, '5'), (1000, '10'), (2000, '20')):
    x, y = pol(cx, cy, 88, ang[h]); f.T(x, y + 4.2, lab, 12, 'white', 'middle', bold=True)
f.T(206, 153, 'RAD ALT', 10, 'white', bold=True); f.T(148, 196, 'FEET ×100', 9, 'white', 'middle')
f.raw(f'<defs><pattern id="flagstripe" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#0b0f11"/><rect width="4" height="8" fill="{col("hot")}"/></pattern></defs>')
f.raw(f'<rect x="165" y="206" width="50" height="30" rx="2" fill="url(#flagstripe)" stroke="{col("ink")}" stroke-width="1.2"/>')
pa = hang(320); tip = pol(cx, cy, 100, pa)
f.L(cx, cy, tip[0], tip[1], 'white', 4, cap='round'); f.Ci(cx, cy, 9, 'ink', 1.4, 'steel')
b0, b1, b2 = pol(cx, cy, 104, 72), pol(cx, cy, 121, 68), pol(cx, cy, 121, 76)
f.P(f'M{b0[0]:.1f},{b0[1]:.1f} L{b1[0]:.1f},{b1[1]:.1f} L{b2[0]:.1f},{b2[1]:.1f} Z', 'ink', 1, 'warm')
f.Ci(84, 64, 11, 'ink', 1.4, 'amber'); f.Ci(296, 276, 10, 'ink', 1.4, 'steel'); f.Ci(84, 276, 12, 'ink', 1.4, 'steel'); f.L(84, 276, 84, 266, 'ink', 2)
f.badge(246.6, 178.7, 1); f.L(333, 129, 306, 133, 'gold', 1.2); f.badge(342, 129, 2); f.badge(151.8, 121.1, 3)
f.badge(228, 221, 4); f.badge(108, 56, 5); f.badge(300, 250, 6); f.badge(80, 250, 7)
f.legend(392, 62, [(1, 'Pointer', 'height above the surface, 0–2 500 ft (expanded low scale)'),
                   (2, 'Decision-height (DH) bug', 'set by the pilot with the DH knob'),
                   (3, 'Mask', 'pointer parks behind it above 2 500 ft or with no signal'),
                   (4, 'Failure (OFF) flag', 'shows on power loss or an unreliable signal'),
                   (5, 'DH lamp', 'lights when the aircraft is at or below the decision height'),
                   (6, 'Press-to-test', 'drives the pointer to a known test reading'),
                   (7, 'DH set knob', 'moves the DH bug around the scale')])
FIGS.append(f)

# ───────────────────────── 11  fig_20_04  RA arc on EFIS ────────────────────
f = Fig('fig_20_04', 'Radio Altitude on an EFIS Attitude Display (Ring Scale)', 760, 300,
        'Three states of an electronic radio altitude ring display at 950, 400 and 200 feet',
        '<b>Electronic radio-height display</b> — on many EFIS attitude displays the radio height is shown as <b>digits only above 1 000 ft</b>. Below 1 000 ft a <b>circular scale</b> appears around the digits: its circumference represents 1 000 ft, and the white ring <b>unwinds as the aircraft descends</b>, giving a strong sense of closure rate. The selected decision height is shown by a magenta marker; on reaching DH the ring and digits <b>change colour</b> (amber) and flash as the alert.')
def ring(f, cx, h, colr, caption):
    cy = 125
    f.R(cx - 100, 40, 200, 180, c='line', sw=1.6, fill='black', rx=10)
    for i in range(10):
        p, q = pol(cx, cy, 47, i * 36), pol(cx, cy, 55, i * 36); f.L(p[0], p[1], q[0], q[1], 'white', 1.2)
    a = h / 1000 * 360; e = pol(cx, cy, 55, a)
    f.P(f'M{cx},{cy-55} A55,55 0 {1 if a > 180 else 0} 1 {e[0]:.1f},{e[1]:.1f}', colr, 5)
    p, q = pol(cx, cy, 55, 72), pol(cx, cy, 70, 72); f.L(p[0], p[1], q[0], q[1], 'mag', 5)
    f.T(cx + 71, 100, 'DH', 9, 'mag', bold=True)
    f.T(cx, cy + 8, str(h), 22, colr, 'middle', bold=True, mono=True)
    f.T(cx, 244, caption, 9.5, 'dim', 'middle')
ring(f, 140, 950, 'white', '950 ft — ring nearly complete')
ring(f, 380, 400, 'white', '400 ft — ring unwinds as height reduces')
ring(f, 620, 200, 'amber', 'at DH (200 ft) — ring & digits turn amber')
f.T(380, 26, 'below 1 000 ft radio height: ring scale + digital readout', 11, 'ink', 'middle', bold=True)
f.T(380, 276, 'One full circle = 1 000 ft. Above 1 000 ft only the digits are shown (up to 2 500 ft).', 10, 'dim', 'middle')
FIGS.append(f)

# ───────────────────────── 12  fig_20_06  RA on the PFD ─────────────────────
f = Fig('fig_20_06', 'Radio Altitude on the Primary Flight Display', 760, 370,
        'A generic primary flight display with the radio altitude readout at the bottom of the attitude display',
        '<b>Where to find it on a glass cockpit</b> — the PFD shows radio altitude as a <b>digital readout at the bottom of the attitude display</b>, appearing automatically <b>below 2 500 ft</b>. It usually changes colour (or the ground “rises” to meet the aircraft symbol) near the selected minimums. Do not confuse it with the <b>barometric altitude tape</b> on the right: the tape shows altitude above the pressure datum set (QNH), the radio altitude shows actual <b>height above the ground beneath the aircraft</b>.')
f.R(40, 20, 360, 330, c='line', sw=2, fill='black', rx=14)
for i, (t, c_) in enumerate((('SPEED', '#7ccf6a'), ('G/S', '#7ccf6a'), ('LOC', '#7ccf6a'), ('CAT 3', '#ffffff'), ('AP 1+2', '#ffffff'))):
    x0 = 52 + i * 67.2
    f.T(x0 + 33.6, 56, t, 10, c_, 'middle', mono=True, bold=True)
    if i: f.L(x0, 34, x0, 72, '#8a979c', 1)
f.R(56, 100, 50, 180, c='#3b474d', sw=1, fill='#232b30', rx=2)
for v, y in ((180, 134), (160, 174), (140, 214), (120, 254)): f.T(81, y + 4, str(v), 11, 'white', 'middle', mono=True)
f.P('M106,190 L118,184 L118,196 Z', 'gold', 1, 'gold')
f.raw('<defs><clipPath id="pfdatt"><rect x="140" y="105" width="150" height="170" rx="40"/></clipPath></defs>')
f.raw(f'<g clip-path="url(#pfdatt)"><rect x="140" y="105" width="150" height="85" fill="{C["sky"]}"/><rect x="140" y="190" width="150" height="85" fill="{C["gnd"]}"/><line x1="140" y1="190" x2="290" y2="190" stroke="#fff" stroke-width="2"/></g>')
for dy in (-30, 30):
    f.L(195, 190 + dy, 235, 190 + dy, 'white', 1.4)
    f.T(189, 194 + dy, '10', 9.5, 'white', 'end', mono=True); f.T(241, 194 + dy, '10', 9.5, 'white', mono=True)
for dy in (-15, 15): f.L(205, 190 + dy, 225, 190 + dy, 'white', 1.1)
f.L(158, 190, 194, 190, 'gold', 4); f.L(236, 190, 272, 190, 'gold', 4); f.R(211, 186, 8, 8, c='gold', sw=1.6, fill='black', rx=0)
f.T(215, 266, '390', 14, 'white', 'middle', bold=True, mono=True)
f.R(318, 100, 66, 180, c='#3b474d', sw=1, fill='#232b30', rx=2)
f.T(351, 122, '015', 11, 'white', 'middle', mono=True); f.T(351, 268, '005', 11, 'white', 'middle', mono=True)
f.R(314, 178, 74, 24, c='gold', sw=1.6, fill='black', rx=2); f.T(351, 195, '1 000', 12, 'white', 'middle', bold=True, mono=True)
f.R(150, 294, 130, 26, c='#3b474d', sw=1, fill='#232b30', rx=2)
for v, x in (('32', 175), ('33', 215), ('34', 255)): f.T(x, 313, v, 10, 'white', 'middle', mono=True)
f.P('M215,294 L209,285 L221,285 Z', 'gold', 1, 'gold')
f.badge(22, 52, 1); f.badge(22, 190, 2); f.badge(162, 124, 3); f.badge(418, 190, 4); f.badge(254, 261, 5); f.badge(300, 307, 6)
f.legend(452, 70, [(1, 'Flight-mode annunciator (FMA)', 'autopilot / autothrottle modes and landing status'),
                   (2, 'Airspeed tape', 'current speed against the fixed pointer'),
                   (3, 'Attitude display', 'pitch and roll — the electronic artificial horizon'),
                   (4, 'Barometric altitude tape', 'altitude from the air-data computer (QNH set)'),
                   (5, 'Radio altitude readout', 'height above the ground — shown below 2 500 ft'),
                   (6, 'Heading tape', 'magnetic heading')], step=44)
FIGS.append(f)

# ───────────────────────── 13  fig_20_07  residual height ───────────────────
f = Fig('fig_20_07', 'Radio Altimeter — Residual Height', 760, 340,
        'An aircraft on approach and on the runway, showing the radio altimeter aerials on the belly and the residual height between aerials and wheels',
        '<b>Residual height</b> — the radio-altimeter aerials are on the fuselage belly, well above the wheels, and the signal also takes time to travel through the aerial cables. That built-in offset — the <b>residual height</b> — is <b>calibrated out</b>, so the indicator shows the height of the <b>main wheels above the runway in the landing attitude</b> and reads <b>zero at touchdown</b>. On the ground, with the oleos compressed and the aircraft level, the true gap is slightly smaller, so the indicator may show a small negative value.')
def plane(tx_, ty_, rot):
    return (f'<g transform="translate({tx_} {ty_}) rotate({rot})">'
            f'<path d="M58,-12 L82,-44 L96,-44 L90,-7 Z" fill="#9fb2b9" stroke="{col("ink")}" stroke-width="1.2"/>'
            f'<line x1="10" y1="8" x2="10" y2="22" stroke="{col("ink")}" stroke-width="2.4"/><line x1="-70" y1="8" x2="-70" y2="22" stroke="{col("ink")}" stroke-width="2"/>'
            f'<path d="M-92,0 C-90,-9 -75,-12 -60,-12 L55,-12 L95,-6 L95,-2 L50,8 L-65,8 C-80,8 -90,5 -92,0 Z" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="1.4"/>'
            f'<path d="M-22,1 L26,1 L42,9 L-6,9 Z" fill="#8497a0" stroke="{col("ink")}" stroke-width="1"/>'
            f'<ellipse cx="-8" cy="13" rx="14" ry="5" fill="#a9bac1" stroke="{col("ink")}" stroke-width="1"/>'
            f'<circle cx="10" cy="25" r="5" fill="#10171b" stroke="{col("ink")}" stroke-width="1.6"/><circle cx="-70" cy="25.5" r="4.5" fill="#10171b" stroke="{col("ink")}" stroke-width="1.6"/>'
            f'<circle cx="30" cy="8.5" r="3.5" fill="{col("hot")}"/></g>')
f.R(20, 270, 720, 16, c='line', sw=1, fill='steel', rx=0)
f.raw(plane(220, 120, 12)); f.raw(plane(570, 240, 0))
th = math.radians(12)
loc = lambda x, y: (220 + x * math.cos(th) - y * math.sin(th), 120 + x * math.sin(th) + y * math.cos(th))
antx, anty = loc(30, 8.5); wx, wy = loc(10, 30)
f.L(214, wy, 262, wy, 'dim', 1, dash='3 3')
f.L(antx, anty + 4, antx, wy, 'hot', 2.4); f.L(antx - 5, wy, antx + 5, wy, 'hot', 1.6)
f.L(236, wy + 2, 236, 268, 'cool', 2.2, me='cool', ms='cool')
f.T(228, 208, 'indicated height', 10.5, 'cool', 'end', bold=True); f.T(228, 222, '= main wheels above', 10, 'cool', 'end'); f.T(228, 236, 'the runway', 10, 'cool', 'end')
f.T(300, 174, 'residual height', 10.5, 'hot', bold=True); f.T(300, 188, '(aerials to wheels) — calibrated out', 9.5, 'hot'); f.L(296, 170, antx + 4, (anty + wy) / 2 + 2, 'hot', 1)
f.T(60, 40, 'Airborne', 12, 'ink', bold=True); f.T(60, 56, 'nose-up landing attitude', 10)
f.L(600, 252, 600, 269, 'hot', 2.4); f.L(595, 269, 605, 269, 'hot', 1.6); f.T(609, 264, 'residual', 9, 'hot', bold=True)
f.T(500, 150, 'On the runway', 12, 'ink', bold=True); f.T(500, 166, 'the aerials are still above the surface,', 10); f.T(500, 180, 'but the indicator reads 0 ft at touchdown', 10)
f.Ci(64, 311, 3.5, 'hot', 1, 'hot'); f.T(76, 315, 'radio-altimeter aerials on the belly (one transmits, one receives)', 10)
FIGS.append(f)

# ───────────────────────── 14  fig_21_01  FMS architecture ──────────────────
f = Fig('fig_21_01', 'Flight Management System — Architecture', 760, 400,
        'Block diagram of a dual flight management computer installation with control display units, sensor inputs, inertial reference systems and outputs',
        '<b>The FMS</b> — two <b>flight management computers</b> (FMC), each with its own <b>navigation and performance database</b>, are programmed by the pilots through the <b>control display units</b> (CDU). Each FMC blends position from the <b>IRS</b>, <b>GPS</b> and <b>DME/VOR</b> updating, air data from the ADC, and fuel/engine data to compute position, the lateral and vertical flight path (LNAV/VNAV) and performance. The two FMCs <b>cross-talk</b> so they agree, and each can take over from the other. Outputs go to the autopilot/flight director, the autothrottle and the EFIS map.')
f.box(215, 40, 80, 36, ['CDU 1'], c='gold'); f.box(465, 40, 80, 36, ['CDU 2'], c='gold')
f.L(255, 78, 255, 108, 'gold', 2, me='gold', ms='gold'); f.L(505, 78, 505, 108, 'gold', 2, me='gold', ms='gold')
for x0, n in ((210, 1), (460, 2)):
    f.R(x0, 110, 90, 134, c='ink', sw=2.2, fill='g3')
    f.T(x0 + 45, 150, f'FMC {n}', 14, 'ink', 'middle', bold=True)
    f.R(x0 + 8, 176, 74, 44, c='gd', sw=1.2, fill='g2', rx=5)
    f.T(x0 + 45, 194, 'nav + perf', 9.5, 'gold', 'middle'); f.T(x0 + 45, 208, 'database', 9.5, 'gold', 'middle')
for i, lab in enumerate(('VOR', 'DME', 'GPS', 'ADC')):
    y = 110 + i * 36
    f.box(40, y, 110, 26, [f'{lab} 1'], bold_first=False, size=10.5); f.L(150, y + 13, 208, y + 13, 'cool', 2, me='cool')
    f.box(610, y, 110, 26, [f'{lab} 2'], bold_first=False, size=10.5); f.L(610, y + 13, 552, y + 13, 'cool', 2, me='cool')
f.box(40, 254, 110, 36, ['fuel & engine', 'data'], bold_first=False, size=10); f.P('M150,272 L232,272 L232,246', 'cool', 2, me='cool', join='round')
f.box(610, 254, 110, 36, ['fuel & engine', 'data'], bold_first=False, size=10); f.P('M610,272 L528,272 L528,246', 'cool', 2, me='cool', join='round')
f.L(302, 135, 458, 135, 'gold', 2, me='gold', ms='gold'); f.T(380, 126, 'cross-talk', 10, 'gold', 'middle')
f.R(330, 156, 100, 82, c='green', sw=1.8, fill='g2')
f.T(380, 173, 'OUTPUTS', 10, 'green', 'middle', bold=True)
for i, t in enumerate(('autopilot / FD', 'autothrottle', 'EFIS map')): f.T(380, 190 + i * 15, t, 9.5, 'ink', 'middle')
f.L(300, 200, 328, 200, 'green', 2, me='green'); f.L(460, 200, 432, 200, 'green', 2, me='green')
f.L(255, 290, 505, 290, 'cool', 2.4)
f.L(255, 290, 255, 246, 'cool', 2, me='cool'); f.L(505, 290, 505, 246, 'cool', 2, me='cool')
for i, x in enumerate((290, 380, 470)):
    f.box(x - 35, 316, 70, 28, [f'IRS {i+1}'], bold_first=False); f.L(x, 316, x, 291, 'cool', 2)
f.T(380, 282, 'all three IRS feed both FMCs', 9.5, 'cool', 'middle')
f.T(380, 372, 'CDU = control display unit | IRS = inertial reference system | ADC = air data computer', 10, 'dim', 'middle')
f.T(380, 388, 'FD = flight director | nav + perf = navigation and performance', 10, 'dim', 'middle')
FIGS.append(f)

# ───────────────────────── 15  fig_22_01  EFIS architecture ─────────────────
f = Fig('fig_22_01', 'EFIS — Architecture (Symbol Generators)', 760, 430,
        'Block diagram of an EFIS with captain and first officer displays, three symbol generators, control panels and sensor inputs',
        '<b>EFIS architecture</b> — each pilot has two displays: an <b>EADI</b> (attitude/flight director — the PFD) and an <b>EHSI</b> (navigation — the ND). The pictures are drawn by <b>symbol generators</b> (SG), which take raw data from the sensors and turn it into display symbology. The left SG drives the captain’s displays and the right SG the first officer’s; a <b>centre SG is a hot spare</b> that can replace either. Each pilot’s <b>EFIS control panel</b> selects the display mode, range and decision height. Light sensors adjust brightness automatically, and the SGs cross-compare to flag disagreements.')
f.box(60, 30, 160, 30, ["Captain's EFIS control panel"], c='gold', size=10); f.box(540, 30, 160, 30, ["F/O's EFIS control panel"], c='gold', size=10)
for x0 in (80, 560):
    f.box(x0, 90, 120, 60, ['EADI', 'attitude, FD'], c='ink', fill='black'); f.box(x0, 165, 120, 60, ['EHSI', 'navigation'], c='ink', fill='black')
f.box(90, 280, 120, 50, ['LEFT SG'], c='hot', size=11); f.box(320, 280, 120, 50, ['CENTRE SG', '(standby)'], c='warm', size=11); f.box(550, 280, 120, 50, ['RIGHT SG'], c='green', size=11)
f.P('M205,280 L205,265 L222,265 L222,120', 'hot', 2.4, join='round'); f.L(222, 120, 203, 120, 'hot', 2.4, me='hot'); f.L(222, 195, 203, 195, 'hot', 2.4, me='hot')
f.P('M555,280 L555,265 L538,265 L538,120', 'green', 2.4, join='round'); f.L(538, 120, 557, 120, 'green', 2.4, me='green'); f.L(538, 195, 557, 195, 'green', 2.4, me='green')
f.P('M350,280 L350,245 L226,245', 'warm', 2, dash='6 4', me='warm', join='round'); f.P('M410,280 L410,245 L534,245', 'warm', 2, dash='6 4', me='warm', join='round')
f.T(380, 237, 'standby feed to either side', 9.5, 'warm', 'middle')
f.P('M70,60 L70,305 L88,305', 'gold', 2, me='gold', join='round'); f.P('M690,60 L690,305 L672,305', 'gold', 2, me='gold', join='round')
f.L(212, 312, 318, 312, 'dim', 1.4, me='dim', ms='dim'); f.L(442, 312, 548, 312, 'dim', 1.4, me='dim', ms='dim')
f.T(265, 304, 'compare', 9, 'dim', 'middle'); f.T(495, 304, 'compare', 9, 'dim', 'middle')
f.R(60, 378, 640, 30, c='cool', sw=1.8, fill='g2')
f.T(380, 397, 'sensor inputs:  VOR, DME, ILS, radio altimeter, weather radar, IRS, FCC, FMC', 10.5, 'ink', 'middle')
for x in (150, 380, 610): f.L(x, 378, x, 332, 'cool', 2.2, me='cool')
for i, t in enumerate(('EADI = electronic attitude director indicator', 'EHSI = electronic horizontal situation indicator', 'SG = symbol generator: builds the display picture', 'FCC = flight control computer')):
    f.T(380, 98 + i * 17, t, 9.5, 'dim', 'middle')
f.T(46, 190, 'mode, range, DH', 9, 'gold', 'middle', rot=-90)
FIGS.append(f)

# ───────────────────────── 16  fig_26_01  closed loop ───────────────────────
f = Fig('fig_26_01', 'Closed-Loop Control Principle', 760, 240,
        'Block diagram of a closed control loop: input, error detector, output and control, with feedback from the result to the detector',
        '<b>Closed-loop control</b> — every autopilot channel is a closed loop. A <b>demand</b> (input) is compared with what the aircraft is actually doing; the <b>error detector</b> produces a signal proportional to the difference; this is amplified and drives a <b>servo</b> that moves the control. The result is measured and <b>fed back</b> to the detector, so the loop keeps acting until the error is zero. Without feedback (open loop) the system could not know when to stop — feedback is what makes the control accurate and stable.')
f.box(30, 120, 110, 70, ['INPUT', 'demand'], c='gold'); f.box(190, 120, 150, 70, ['ERROR DETECTOR', 'compares demand', 'with actual'], c='ink')
f.box(390, 120, 120, 70, ['OUTPUT', 'amplified', 'error signal'], c='ink'); f.box(560, 120, 120, 70, ['CONTROL', 'servo moves', 'the surface'], c='ink')
f.L(140, 155, 188, 155, 'gold', 2.4, me='gold'); f.L(340, 155, 388, 155, 'ink', 2.4, me='ink'); f.L(510, 155, 558, 155, 'ink', 2.4, me='ink')
f.L(680, 155, 738, 155, 'green', 2.4, me='green'); f.T(709, 145, 'result', 10, 'green', 'middle')
f.P('M620,120 L620,60 L265,60 L265,118', 'cool', 2.4, dash='7 4', me='cool', join='round')
f.T(442, 50, 'FEEDBACK — the actual result is measured and returned', 10.5, 'cool', 'middle', bold=True)
f.T(380, 222, 'the loop acts until demand and actual agree (error = 0)', 10.5, 'dim', 'middle')
FIGS.append(f)

# ───────────────────────── 17  fig_26_03  servo loop ────────────────────────
f = Fig('fig_26_03', 'Autopilot Servo Loop to the Control Surface', 760, 360,
        'An autopilot loop: attitude sensors and pilot selections feed the autopilot computer, which drives a servomotor coupled to a control surface, with position and aerodynamic feedback',
        '<b>One autopilot channel</b> — <b>attitude sensors</b> detect a disturbance and send an electrical signal to the <b>autopilot computer</b>, which processes it and commands the <b>servomotor</b>. The servo moves the control surface through a mechanical coupling. Two feedbacks close the loop: <b>rate and position feedback</b> from the servo tells the computer how far and how fast the surface has moved (so it does not over-control), and <b>aerodynamic feedback</b> — the aircraft’s response — is sensed again by the attitude sensors. The pilot engages the system and selects modes through the control panel.')
f.T(450, 122, 'CLOSED LOOP', 24, 'g3', 'middle', bold=True, check=False)
f.box(40, 30, 150, 50, ['ATTITUDE SENSING', 'gyros / IRS'], c='ink'); f.box(40, 150, 150, 70, ['AUTOPILOT', 'COMPUTER', 'signal processing'], c='gold', size=10.5)
f.box(40, 290, 150, 46, ['ENGAGE & MODES', 'pilot selections'], c='ink')
f.L(115, 80, 115, 148, 'hot', 2.6, me='hot'); f.T(124, 118, 'electrical signal', 10, 'hot')
f.L(90, 290, 90, 222, 'hot', 2.6, me='hot')
f.L(190, 185, 288, 185, 'hot', 2.6, me='hot')
f.box(290, 150, 150, 70, ['SERVOMOTOR', '(actuator)'], c='ink', fill='steel', sub='ink')
f.L(440, 185, 562, 185, 'ink', 6); f.L(440, 185, 562, 185, 'bg', 3, dash='8 8')
f.T(492, 207, 'mechanical coupling', 9.5, 'dim', 'middle')
f.P('M560,168 C542,168 538,202 560,202 L712,188 Z', 'ink', 1.6, 'cool'); f.Ci(563, 185, 4, 'ink', 1.4, 'bg')
f.T(628, 158, 'CONTROL SURFACE', 10.5, 'ink', 'middle', bold=True)
f.P('M365,220 L365,262 L150,262 L150,222', 'gold', 2.2, dash='7 4', me='gold', join='round')
f.T(258, 278, 'rate & position feedback', 10, 'gold', 'middle')
f.P('M712,188 L736,188 L736,55 L192,55', 'gold', 2.2, dash='7 4', me='gold', join='round')
f.T(464, 45, 'aerodynamic feedback — the aircraft responds and the sensors detect it', 10, 'gold', 'middle')
FIGS.append(f)

# ───────────────────────── 18  fig_26_04  inner & outer loops ───────────────
f = Fig('fig_26_04', 'Autopilot Inner & Outer Loops', 760, 390,
        'The autopilot inner stabilisation loop of computer, servo, control surface and attitude sensor, with an outer guidance loop through the mode control panel and a heading reference',
        '<b>Two loops</b> — the <b>inner loop</b> is the stabilisation loop: attitude sensor → error detector → autopilot computer → servo → control surface → aircraft attitude, and round again. It holds the attitude it is given. The <b>outer loop</b> provides guidance: a flight-path demand (here a heading selected on the mode control panel) is compared with a reference (the gyro-magnetic compass), and the difference is fed <b>into the inner loop as a new attitude demand</b> — e.g. bank to turn. Heading, altitude, speed, VOR/LOC, glideslope and LNAV/VNAV are all outer-loop modes; the outer loop never drives the servos directly.')
f.R(60, 110, 500, 262, c='faint', sw=1.4, fill='none', rx=10, dash='7 5')
f.T(310, 362, 'INNER LOOP — stabilisation (holds attitude)', 10.5, 'gold', 'middle', bold=True)
f.box(90, 200, 140, 60, ['Autopilot', 'computer'], c='gold', size=11); f.box(240, 290, 140, 50, ['Servomotor'], c='ink', size=11)
f.box(390, 200, 140, 60, ['Control surface', '→ aircraft attitude'], c='ink', size=11); f.box(240, 125, 140, 50, ['Attitude sensor', '& error detector'], c='ink', size=11)
f.P('M160,260 L160,315 L238,315', 'gold', 2.4, me='gold', join='round'); f.P('M380,315 L460,315 L460,262', 'gold', 2.4, me='gold', join='round')
f.P('M460,200 L460,150 L382,150', 'gold', 2.4, me='gold', join='round'); f.P('M240,150 L160,150 L160,198', 'gold', 2.4, me='gold', join='round')
f.box(70, 30, 130, 50, ['MCP', 'heading selected'], c='cool', size=11); f.box(600, 200, 140, 60, ['Gyro-magnetic', 'compass (heading)'], c='cool', size=11)
f.L(110, 80, 110, 198, 'cool', 2.4, me='cool'); f.T(100, 100, 'demand', 9.5, 'cool', 'end')
f.L(530, 230, 598, 230, 'cool', 2.4, me='cool')
f.P('M670,200 L670,55 L202,55', 'cool', 2.4, me='cool', join='round')
f.T(436, 44, 'OUTER LOOP — guidance (flight path): actual heading compared with selected', 10.5, 'cool', 'middle', bold=True)
f.T(564, 222, 'heading', 9, 'cool')
FIGS.append(f)

# ───────────────────────── 19  fig_26_05  parallel actuator ─────────────────
f = Fig('fig_26_05', 'Autopilot Actuator Connected in Parallel', 760, 270,
        'A control run from the control wheel to a powered flying control unit and control surface, with the autopilot actuator linked in parallel to the run',
        '<b>Parallel actuator</b> — the autopilot servo is connected <b>alongside</b> the pilot’s control run, so when it moves the run it moves <b>both the control surface and the pilot’s controls</b>. The pilot can see and feel what the autopilot is doing, and it has full control authority — but the pilot cannot make inputs without overriding or disconnecting it. (A <b>series</b> actuator, used for yaw dampers and stability augmentation, sits <i>in</i> the run and moves the surface without moving the cockpit controls, with limited authority.) The <b>artificial-feel unit</b> gives control forces where a powered flying control unit (PFCU) removes the natural feel.')
f.L(90, 95, 90, 215, 'ink', 3.4, cap='round'); f.P('M68,95 A22,22 0 0 1 112,95', 'ink', 3.4); f.Ci(90, 170, 5, 'ink', 1.4, 'gold')
f.L(28, 128, 28, 152, 'dim', 3)
f.P('M28,140 L38,140 L42,133 L50,147 L58,133 L66,147 L74,133 L78,140 L90,140', 'warm', 2, join='round')
f.T(124, 90, 'control wheel', 10.5, 'ink')
f.T(76, 162, 'artificial', 10, 'warm', 'end'); f.T(76, 175, 'feel unit', 10, 'warm', 'end')
f.L(90, 215, 498, 215, 'ink', 3.2)
f.box(230, 100, 140, 50, ['A/P ACTUATOR', '(servo)'], c='gold', size=11)
f.L(300, 150, 300, 215, 'gold', 3); f.Ci(300, 215, 5, 'ink', 1.4, 'gold')
f.T(312, 186, 'connected in parallel', 10, 'gold')
f.box(500, 190, 130, 50, ['PFCU', 'powered control unit'], c='ink', size=11)
f.L(630, 215, 642, 215, 'ink', 3.2)
f.P('M660,203 C644,203 640,227 660,227 L738,217 Z', 'ink', 1.6, 'cool'); f.Ci(661, 215, 3.5, 'ink', 1.2, 'bg')
f.T(690, 190, 'control surface', 10.5, 'ink', 'middle')
f.L(150, 232, 210, 232, 'cool', 2, me='cool', ms='cool'); f.T(222, 236, 'control run', 10, 'cool')
f.T(380, 262, 'the autopilot moves the whole run — the control wheel moves with it', 10.5, 'dim', 'middle')
FIGS.append(f)

# ───────────────────────── 20  fig_27_01  autoland sequence ─────────────────
f = Fig('fig_27_01', 'Autoland — Approach Sequence', 760, 420,
        'Side profile of an automatic landing from localiser capture through glideslope capture, the radio-height gates, flare, touchdown and rollout',
        '<b>Automatic landing</b> — the sequence is driven first by the ILS and then by <b>radio height</b>. After localiser and glideslope capture, the remaining autopilot channels engage at about <b>1 500 ft</b> RA and FLARE/ROLLOUT arm; from here the system must be fail-operational or fail-passive. Near <b>330 ft</b> the aircraft is trimmed nose-up. At about <b>45 ft</b> the flare mode commands a reducing rate of descent while the autothrottle retards; at about <b>5 ft</b> the flare gives way to touchdown and rollout guidance on the localiser. Exact heights are type-specific; the order of events is what matters.')
sl = 144 / 310.0
f.R(40, 240, 710, 10, c='line', sw=1, fill='steel', rx=0); f.R(672, 233, 78, 7, c='ink', sw=1, fill='dim', rx=0)
f.P(f'M60,70 L300,70 L610,214 Q650,231 700,232 L744,232', 'hot', 2.8, join='round')
f.L(300, 70, 250, 70 - 50 * sl, 'cool', 1.2, dash='5 4'); f.T(262, 30, 'glideslope beam', 9.5, 'cool', 'end')
pts = dict(A=(60, 70), B=(170, 70), C=(300, 70), D=(390, 70 + 90 * sl), E=(520, 70 + 220 * sl), F=(610, 214), G=(662, 229.5), H=(716, 232))
off = dict(A=(0, -20), B=(0, -20), C=(0, -20), D=(16, -15), E=(16, -15), F=(14, -17), G=(8, -22), H=(8, -20))
for k_, (x, y) in pts.items():
    f.Ci(x, y, 4, 'ink', 1.2, 'ink'); f.badge(x + off[k_][0], y + off[k_][1], k_)
f.T(380, 132, '1 500 ft RA', 9.5, 'ink', 'end'); f.T(510, 192, '330 ft RA', 9.5, 'ink', 'end')
f.T(600, 232, '≈45 ft', 9.5, 'ink', 'end')
f.T(711, 262, 'runway', 9.5, 'dim', 'middle')
rows = [('A', 'Approach mode selected: localiser (LOC) and glideslope (G/S) armed.'),
        ('B', 'LOC capture: the aircraft turns onto the runway centreline.'),
        ('C', 'G/S capture: descent on the glideslope begins.'),
        ('D', '≈1 500 ft radio height: remaining autopilots engage (multi-channel); FLARE and ROLLOUT arm.'),
        ('E', '≈330 ft: nose-up trim bias applied, ready for the flare or a go-around.'),
        ('F', '≈45 ft: FLARE engages, rate of descent reduces; autothrottle retards (about 27 ft).'),
        ('G', '≈5 ft: flare ends; touchdown and ROLLOUT mode, steering on the localiser.'),
        ('H', 'Rollout: the autopilot stays engaged until the pilot disconnects it.')]
for i, (k_, t) in enumerate(rows):
    y = 282 + i * 17.5
    f.badge(52, y, k_); f.T(70, y + 3.7, t, 10.5, 'ink' if k_ in 'DFG' else 'dim')
FIGS.append(f)

# ───────────────────────── 21  fig_27_02  ILS categories ────────────────────
f = Fig('fig_27_02', 'ILS / Autoland Categories & Minima', 760, 340,
        'Decision height and runway visual range limits for ILS categories one, two, three A, three B and three C shown along the approach path',
        '<b>Operating minima by category</b> — the lower the decision height (DH) and runway visual range (RVR), the more capable and redundant the equipment must be. <b>CAT I</b>: DH not below 200 ft, RVR not less than 550 m (or visibility 800 m). <b>CAT II</b>: DH below 200 ft but not below 100 ft, RVR not less than 300 m. <b>CAT IIIA</b>: DH below 100 ft or none, RVR not less than 200 m. <b>CAT IIIB</b>: DH below 50 ft or none, RVR less than 200 m but not less than 75 m. <b>CAT IIIC</b>: no DH and no RVR limit. CAT II/III need a radio altimeter for DH; CAT III needs an automatic landing system. Not drawn to scale.')
X = lambda y: 100 + (y - 50) * 580 / 240.0
f.L(60, 34, 60, 290, 'ink', 1.6); f.L(60, 290, 750, 290, 'ink', 1.6)
f.R(680, 284, 70, 7, c='ink', sw=1, fill='dim', rx=0)
segs = [(50, 130, 'cool'), (130, 210, 'green'), (210, 250, 'gold'), (250, 290, 'warm')]
for y0, y1, c_ in segs: f.L(X(y0), y0, X(y1), y1, c_, 5, cap='round')
for y_, lab, rvr in ((130, '200 ft', '550 m'), (210, '100 ft', '300 m'), (250, '50 ft', '200 m')):
    f.L(60, y_, X(y_), y_, 'faint', 1, dash='4 4'); f.L(X(y_), y_, X(y_), 290, 'faint', 1, dash='4 4')
    f.T(54, y_ + 3.5, lab, 10, 'ink', 'end', bold=True); f.T(X(y_), 305, rvr, 10, 'ink', 'middle', bold=True)
    f.Ci(X(y_), y_, 4, 'ink', 1.2, 'ink')
f.T(26, 74, 'decision height', 10.5, 'ink', 'middle', bold=True, rot=-90)
f.T(64, 322, 'minimum runway visual range (RVR) for each category →', 10, 'dim')
def cat(x, y, w, name, l1, l2, c_, lx, ly):
    f.R(x, y, w, 52, c=c_, sw=1.8, fill='g2')
    f.T(x + 10, y + 17, name, 11.5, c_, bold=True); f.T(x + 10, y + 31, l1, 9.5, 'ink'); f.T(x + 10, y + 44, l2, 9.5, 'ink')
    f.L(lx, y + 52, lx, ly, c_, 1.2)
cat(150, 4, 180, 'CAT I', 'DH ≥ 200 ft, RVR ≥ 550 m', '(or visibility ≥ 800 m)', 'cool', 196, X_y := 50 + (196 - 100) * 240 / 580 - 4)
cat(345, 64, 180, 'CAT II', 'DH < 200 ft, not below 100 ft', 'RVR ≥ 300 m', 'green', 390, 50 + (390 - 100) * 240 / 580 - 4)
cat(455, 128, 190, 'CAT IIIA', 'DH < 100 ft (or no DH)', 'RVR ≥ 200 m', 'gold', 535, 50 + (535 - 100) * 240 / 580 - 4)
cat(590, 190, 160, 'CAT IIIB', 'DH < 50 ft (or no DH)', 'RVR < 200 m, ≥ 75 m', 'warm', 632, 50 + (632 - 100) * 240 / 580 - 4)
f.T(748, 322, 'CAT IIIC — no DH, no RVR limit', 10.5, 'hot', 'end', bold=True)
f.T(715, 279, 'runway', 9, 'dim', 'middle')
FIGS.append(f)

# ───────────────────────── output ───────────────────────────────────────────
start = int(sys.argv[1]) if len(sys.argv) > 1 else 35
out = ''.join(f.html(start + i) for i, f in enumerate(FIGS))
open(sys.argv[2] if len(sys.argv) > 2 else 'b4_fragment.html', 'w').write(out)
print(f'figures: {len(FIGS)}   bytes: {len(out)}   QA warnings: {len(WARN)}')
for w in WARN: print('  ⚠', w)
