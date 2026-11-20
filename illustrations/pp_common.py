"""Drawing helpers for the Powerplant figures (piston cylinder driven by real crank geometry)."""
import math
from figlib import *
from gen_common import note, gallery
from ins_common import arc_band, flowrow, dial

def PF(tag, title, W, H, aria, cap): return Fig('fig_' + tag, title, W, H, aria, cap)

R_CR, L_ROD = 26, 78          # crank radius, connecting-rod length (local units)
def pin_y(th):                 # piston-pin height above crank centre for crank angle th (deg from TDC, clockwise)
    a = math.radians(th); return R_CR * math.cos(a) + math.sqrt(L_ROD ** 2 - (R_CR * math.sin(a)) ** 2)

def cyl(f, cx, cyc, th=0, s=1.0, charge=None, iv=False, ev=False, spark=False, fins=True, plug=True, valves=True):
    """Cross-section of one cylinder. Crank centre (cx, cyc). Returns dict of absolute key points.
    charge: fill colour of the gas above the piston (None = empty)."""
    g = lambda x, y: (cx + x * s, cyc + y * s)
    a = math.radians(th)
    py = -pin_y(th); ptop = py - 14; roof = -pin_y(0) - 14 - 14
    f.raw(f'<g transform="translate({cx} {cyc}) scale({s})">')
    if fins:
        for y in range(int(roof) + 6, -60, 8):
            f.L(-58, y, -42, y, 'steel', 3); f.L(42, y, 58, y, 'steel', 3)
    f.Ci(0, 0, 46, 'ink', 1.8, 'g2')                                   # crankcase
    f.R(-42, roof, 84, -40 - roof, c='ink', sw=1.8, fill='g3', rx=0)  # barrel
    f.R(-38, roof, 76, -40 - roof, c='none', sw=0, fill='bg', rx=0)    # bore
    if charge: f.R(-38, roof - 10, 76, ptop - roof + 10, c='none', sw=0, fill=charge, rx=0, op=0.85)
    # head with dome combustion chamber
    f.P(f'M-50,{roof} L-50,{roof-20} Q-50,{roof-34} -30,{roof-34} L30,{roof-34} Q50,{roof-34} 50,{roof-20} L50,{roof} L38,{roof} '
        f'Q38,{roof-12} 0,{roof-12} Q-38,{roof-12} -38,{roof} Z', 'ink', 1.8, 'g3')
    if charge: f.P(f'M-38,{roof} Q-38,{roof-12} 0,{roof-12} Q38,{roof-12} 38,{roof} Z', 'none', 0, charge, op=0.85)
    if valves:
        for side, op in ((-1, iv), (1, ev)):
            dy = 6 if op else 0; vx = side * 22
            f.L(vx + side * 4, roof - 11 + dy, vx + side * 18, roof - 46 + dy, 'ink', 3)
            f.P(f'M{vx-10},{roof-6+dy} L{vx+10},{roof-6+dy} L{vx+6},{roof-11+dy} L{vx-6},{roof-11+dy} Z', 'ink', 1.2, 'steel')
    if plug:
        f.R(-4, roof - 44, 8, 32, c='ink', sw=1.2, fill='white', rx=1)
        if spark: f.Ci(0, roof - 10, 6, 'gold', 1.4, 'gold')
    # piston, rod, crank
    f.R(-37, ptop, 74, 30, c='ink', sw=1.6, fill='steel', rx=2)
    for k in (5, 10): f.L(-37, ptop + k, 37, ptop + k, 'ink', 0.9)
    cpx, cpy = R_CR * math.sin(a), -R_CR * math.cos(a)
    f.P(f'M{-6},{py} L{cpx-8:.1f},{cpy:.1f} L{cpx+8:.1f},{cpy:.1f} L6,{py} Z', 'ink', 1.4, '#8fa3ab')
    f.Ci(0, py, 5, 'ink', 1.2, 'g3')
    oa = math.radians(th + 180)
    f.P(f'M{cpx:.1f},{cpy:.1f} L{30*math.sin(oa-0.9):.1f},{-30*math.cos(oa-0.9):.1f} A30,30 0 0 1 {30*math.sin(oa+0.9):.1f},{-30*math.cos(oa+0.9):.1f} Z', 'ink', 1.2, '#5d727b')
    f.Ci(cpx, cpy, 8, 'ink', 1.4, 'g3'); f.Ci(0, 0, 6, 'ink', 1.4, 'gold')
    f.raw('</g>')
    return dict(roof=g(0, roof)[1], ptop=g(0, ptop)[1], pin=g(0, py), crankpin=g(cpx, cpy), centre=(cx, cyc),
                head=g(0, roof - 34)[1], plug=g(0, roof - 44), iv=g(-34, roof - 34), ev=g(34, roof - 34), left=cx - 58 * s, right=cx + 58 * s)

def lab(f, x, y, tx, ty, txt, anchor='start', size=10.5, c='ink', lc='dim'):
    """Leader line from (x, y) on the drawing to a label at (tx, ty)."""
    f.L(x, y, tx + (-4 if anchor == 'end' else 4 if anchor == 'start' else 0), ty - 4, lc, 1)
    f.Ci(x, y, 2, lc, 1, lc)
    f.T(tx + (-6 if anchor == 'end' else 6 if anchor == 'start' else 0), ty, txt, size, c, anchor, bold=True)

def axes(f, x0, y0, x1, y1, xl, yl, c='dim'):
    f.L(x0, y1, x1, y1, c, 1.6, me='dim'); f.L(x0, y1, x0, y0, c, 1.6, me='dim')
    f.T((x0 + x1) / 2, y1 + 34, xl, 10.5, 'ink', 'middle', bold=True)
    f.T(x0 - 44, (y0 + y1) / 2, yl, 10.5, 'ink', 'middle', bold=True, rot=-90)

def curve(f, pts, c, sw=2.6, dash=None):
    f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts), c, sw, dash=dash, join='round')

def smooth(f, pts, c, sw=2.6, dash=None):
    """Catmull-Rom through pts."""
    d = f'M{pts[0][0]:.1f},{pts[0][1]:.1f}'
    for i in range(len(pts) - 1):
        p0 = pts[max(i - 1, 0)]; p1, p2 = pts[i], pts[i + 1]; p3 = pts[min(i + 2, len(pts) - 1)]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6); c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f' C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}'
    f.P(d, c, sw, dash=dash)

def pipe(f, pts, c='cool', w=14, edge='ink'):
    d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    f.P(d, edge, w + 3, join='round'); f.P(d, c, w, join='round')

def flow(f, x1, y1, x2, y2, c='gold', sw=2.4): f.L(x1, y1, x2, y2, c, sw, me=c)

def aerofoil(f, cx, cy, chord, ang, fill='#a9bac1', c='ink'):
    """Blade section, leading edge pointing right, chord inclined `ang` deg above horizontal (plane of rotation)."""
    h = chord / 2
    d = (f'M{h},0 C{h*0.6},{-chord*0.16} {-h*0.4},{-chord*0.1} {-h},0 C{-h*0.4},{chord*0.03} {h*0.6},{chord*0.05} {h},0 Z')
    f.raw(f'<g transform="translate({cx} {cy}) rotate({-ang})"><path d="{d}" fill="{col(fill)}" stroke="{col(c)}" stroke-width="1.4"/></g>')

def arcmark(f, cx, cy, r, a0, a1, c, label=None, lr=None, size=10):
    """Angle arc measured in maths degrees (0 = right, anticlockwise positive)."""
    p0 = (cx + r * math.cos(math.radians(a0)), cy - r * math.sin(math.radians(a0)))
    p1 = (cx + r * math.cos(math.radians(a1)), cy - r * math.sin(math.radians(a1)))
    f.P(f'M{p0[0]:.1f},{p0[1]:.1f} A{r},{r} 0 0 {0 if a1 > a0 else 1} {p1[0]:.1f},{p1[1]:.1f}', c, 1.6)
    if label:
        m = math.radians((a0 + a1) / 2); rr = lr or r + 14
        f.T(cx + rr * math.cos(m), cy - rr * math.sin(m) + 4, label, size, c, 'start', bold=True)

def jet(f, x0, cy, L, R=60, comp='axial', fan=False, labels=True, flame=True):
    """Side section of a simple turbojet, nose left. Returns X(t) station mapper."""
    X = lambda t: x0 + t * L
    out = [(0, .92), (.04, 1), (.16, 1), (.46, .84), (.52, .92), (.64, .92), (.72, .84), (1, .58)]
    hub = [(0, 0), (.05, .02), (.16, .36), (.46, .6), (.52, .5), (.64, .5), (.72, .5), (.88, 0)]
    for sg in (-1, 1):
        f.P('M' + ' L'.join(f'{X(t):.1f},{cy - sg * r * R:.1f}' for t, r in out) + ' L' + ' L'.join(f'{X(t):.1f},{cy - sg * (r * R + 7):.1f}' for t, r in out[::-1]) + ' Z', 'ink', 1.4, 'steel')
        f.P('M' + ' L'.join(f'{X(t):.1f},{cy - sg * r * R:.1f}' for t, r in hub), 'ink', 1.4)
        if comp == 'axial':
            for i in range(11):
                t = .18 + i * .026; ro = (1 - (t - .16) / .30 * .16) * R; ri = (.36 + (t - .16) / .30 * .24) * R
                f.L(X(t), cy - sg * ri, X(t), cy - sg * (ro - 2), 'ink' if i % 2 == 0 else 'cool', 2.4)
        if flame:
            f.R(X(.47), cy - sg * .78 * R - (12 if sg > 0 else -12) * 0 - 9, X(.63) - X(.47), 18, c='ink', sw=1.2, fill='warm', rx=9)
        for i in range(3):
            t = .655 + i * .022; f.L(X(t), cy - sg * .5 * R, X(t), cy - sg * (.9 * R - 2), 'warm', 2.6)
    f.R(X(.16), cy - 3, X(.68) - X(.16), 6, c='ink', sw=1, fill='#5d727b', rx=2)
    if labels:
        for a, b, t in ((0, .16, 'INTAKE'), (.16, .46, 'COMPRESSOR'), (.46, .64, 'COMBUSTION'), (.64, .72, 'TURBINE'), (.72, 1, 'EXHAUST')):
            f.T((X(a) + X(b)) / 2, cy + R + 26, t, 9.5, 'ink', 'middle', bold=True)
    return X

def csu(f, cx, state='on', top=40):
    """Constant speed unit: flyweights, speeder spring, pilot valve. state: on / over / under."""
    d = {'on': 0, 'over': -16, 'under': 16}[state]; tilt = {'on': 0, 'over': 22, 'under': -16}[state]
    f.Ci(cx + 46, top + 10, 14, 'ink', 1.4, 'g3')
    for k in range(10): a = k * 36; p = pol(cx + 46, top + 10, 16, a); f.Ci(p[0], p[1], 2.4, 'ink', 0.8, 'ink')
    f.R(cx - 6, top - 6, 12, 60, c='ink', sw=1.2, fill='#a9bac1', rx=2)
    for i in range(7): f.P(f'M{cx-16},{top + 60 + i * 8 + d * i / 7:.1f} L{cx+16},{top + 64 + i * 8 + d * i / 7:.1f}', 'cool', 2)
    fy = top + 130
    f.R(cx - 54, fy + 20, 108, 10, c='ink', sw=1.2, fill='steel', rx=2)
    for sg in (-1, 1):
        f.raw(f'<g transform="rotate({sg * tilt} {cx + sg * 40} {fy + 24})"><path d="M{cx + sg * 40},{fy + 24} L{cx + sg * 40},{fy - 34} L{cx + sg * 52},{fy - 34} L{cx + sg * 52},{fy + 18} Z M{cx + sg * 40},{fy + 24} L{cx + sg * 14},{fy + 24}" fill="{col("#8fa3ab")}" stroke="{col("ink")}" stroke-width="1.4"/></g>')
    vy = fy + 20 + d
    f.R(cx - 5, top + 116 + d, 10, 250, c='ink', sw=1.2, fill='#a9bac1', rx=2)
    by = fy + 60
    f.R(cx - 70, by, 140, 130, c='ink', sw=1.8, fill='g3', rx=4)
    f.R(cx - 24, by + 6, 48, 118, c='none', sw=0, fill='bg', rx=0)
    P = dict(coarse=(cx + 70, by + 36), fine=(cx + 70, by + 92), press=(cx - 70, by + 64), ret1=(cx - 70, by + 14), ret2=(cx - 70, by + 116))
    for k, (x, y) in P.items():
        f.R(cx + 20 if x > cx else cx - 72, y - 6, 52, 12, c='none', sw=0, fill='bg', rx=0)
    for y in (by + 36 + d, by + 92 + d): f.R(cx - 24, y - 11, 48, 22, c='ink', sw=1.2, fill='#a9bac1', rx=2)
    return P, by, fy

def node(f, N, k, x, y, w, h, lines, c='ink', size=10):
    f.box(x, y, w, h, lines, c=c, size=size); N[k] = (x, y, w, h)
def _edge(b, tx, ty):
    x, y, w, h = b; cx, cy = x + w / 2, y + h / 2; dx, dy = tx - cx, ty - cy
    if dx == 0 and dy == 0: return cx, cy
    s = min((w / 2) / abs(dx) if dx else 1e9, (h / 2) / abs(dy) if dy else 1e9)
    return cx + dx * s, cy + dy * s
def conn(f, N, a, b, c='dim', sw=1.6, dash=None, label=None, lc=None):
    A, B = N[a], N[b]
    ca, cb = (A[0] + A[2] / 2, A[1] + A[3] / 2), (B[0] + B[2] / 2, B[1] + B[3] / 2)
    p, q = _edge(A, *cb), _edge(B, *ca)
    f.L(p[0], p[1], q[0], q[1], c, sw, dash=dash, me=c if c in ('dim', 'ink', 'hot', 'cool', 'gold', 'green', 'warm') else 'dim')
    if label: f.T((p[0] + q[0]) / 2 + 4, (p[1] + q[1]) / 2 - 4, label, 9.5, lc or c)

def stack(f, x0, x1, y0, ph, gap, xr, panels, xlabel, xt):
    """Stacked mini-charts sharing an x axis. panels: (title, (ymin, ymax), yticks, [(x, y), ...], colour)."""
    X = lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)
    for i, (ttl, (a, b), ticks, pts, c_) in enumerate(panels):
        top = y0 + i * (ph + gap); bot = top + ph
        Y = lambda v, a=a, b=b, top=top, bot=bot: bot - (v - a) / (b - a) * (bot - top)
        f.R(x0, top, x1 - x0, ph, c='line', sw=1, fill='g2', rx=0)
        for t in ticks: f.L(x0, Y(t), x1, Y(t), 'line', 0.6); f.T(x0 - 6, Y(t) + 4, f'{t:g}', 9.5, 'dim', 'end')
        smooth(f, [(X(u), Y(v)) for u, v in pts], c_, 2.6)
        f.T(x1 + 10, top + ph / 2 + 4, ttl, 10.5, c_, bold=True)
    bot = y0 + len(panels) * (ph + gap) - gap
    for t in xt: f.T(X(t), bot + 16, f'{t:g}', 9.5, 'dim', 'middle')
    f.T((x0 + x1) / 2, bot + 34, xlabel, 10.5, 'ink', 'middle', bold=True)
    return X
