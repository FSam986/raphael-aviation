"""Circuit-drawing helpers for the Electrics figures."""
import math
from figlib import *

def wire(f, pts, c='ink', sw=1.8):
    f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts), c, sw, join='round')
def resH(f, x1, x2, y, c='hot', sw=2, n=6):
    w = x2 - x1; seg = w / (n * 2); d = f'M{x1},{y}'
    for i in range(n * 2): d += f' L{x1 + seg * (i + 0.5):.1f},{y + (-7 if i % 2 == 0 else 7)}'
    d += f' L{x2},{y}'; f.P(d, c, sw, join='round')
def resV(f, x, y1, y2, c='hot', sw=2, n=6):
    h = y2 - y1; seg = h / (n * 2); d = f'M{x},{y1}'
    for i in range(n * 2): d += f' L{x + (-7 if i % 2 == 0 else 7)},{y1 + seg * (i + 0.5):.1f}'
    d += f' L{x},{y2}'; f.P(d, c, sw, join='round')
def battV(f, x, y, c='ink', label=None, cells=1):
    """battery across a vertical wire gap centred at y; long plate (+) on top."""
    for k in range(cells):
        yy = y - (cells - 1) * 7 + k * 14
        f.L(x - 14, yy - 4, x + 14, yy - 4, c, 2.4); f.L(x - 7, yy + 4, x + 7, yy + 4, c, 4)
    if label: f.T(x + 20, y + 4, label, 10.5, 'ink', bold=True)
def battH(f, x, y, c='ink', label=None):
    """battery across a horizontal wire gap centred at x; long plate (+) on left."""
    f.L(x - 4, y - 14, x - 4, y + 14, c, 2.4); f.L(x + 4, y - 7, x + 4, y + 7, c, 4)
    if label: f.T(x, y + 30, label, 10.5, 'ink', 'middle', bold=True)
def ground(f, x, y, c='ink'):
    f.L(x, y, x, y + 8, c, 1.8)
    for i, w in enumerate((12, 8, 4)): f.L(x - w, y + 8 + i * 4, x + w, y + 8 + i * 4, c, 1.6)
def circ(f, x, y, r, txt, c='ink', fill='g3', size=12):
    f.Ci(x, y, r, c, 2, fill); f.T(x, y + size * 0.36, txt, size, c, 'middle', bold=True, check=False)
def lamp(f, x, y, r=12, c='gold'):
    f.Ci(x, y, r, c, 2, 'g3'); f.L(x - r * 0.7, y - r * 0.7, x + r * 0.7, y + r * 0.7, c, 1.6); f.L(x - r * 0.7, y + r * 0.7, x + r * 0.7, y - r * 0.7, c, 1.6)
def coilH(f, x1, x2, y, c='cool', n=6, sw=2):
    w = (x2 - x1) / n; d = f'M{x1},{y}'
    for i in range(n): d += f' a{w/2:.1f},{w/2:.1f} 0 0 1 {w:.1f},0'
    f.P(d, c, sw)
def coilV(f, x, y1, y2, c='cool', n=6, sw=2):
    h = (y2 - y1) / n; d = f'M{x},{y1}'
    for i in range(n): d += f' a{h/2:.1f},{h/2:.1f} 0 0 1 0,{h:.1f}'
    f.P(d, c, sw)
def switchH(f, x1, x2, y, closed=False, c='ink'):
    f.Ci(x1, y, 3, c, 1.4, 'bg'); f.Ci(x2, y, 3, c, 1.4, 'bg')
    if closed: f.L(x1 + 3, y, x2 - 3, y, c, 2.2)
    else: f.L(x1 + 2, y - 2, x2 - 4, y - 18, c, 2.2)
def cap(f, x, y, vertical=False, c='ink'):
    if vertical: f.L(x - 14, y - 4, x + 14, y - 4, c, 3); f.L(x - 14, y + 4, x + 14, y + 4, c, 3)
    else: f.L(x - 4, y - 14, x - 4, y + 14, c, 3); f.L(x + 4, y - 14, x + 4, y + 14, c, 3)
def magnet(f, x, y, w, h, left='N', right='S', vertical=False):
    if not vertical:
        f.R(x, y, w / 2, h, c='ink', sw=1.4, fill='hot', rx=2); f.R(x + w / 2, y, w / 2, h, c='ink', sw=1.4, fill='cool', rx=2)
        f.T(x + w / 4, y + h / 2 + 5, left, 13, 'white', 'middle', bold=True, check=False); f.T(x + 3 * w / 4, y + h / 2 + 5, right, 13, 'white', 'middle', bold=True, check=False)
    else:
        f.R(x, y, w, h / 2, c='ink', sw=1.4, fill='hot', rx=2); f.R(x, y + h / 2, w, h / 2, c='ink', sw=1.4, fill='cool', rx=2)
        f.T(x + w / 2, y + h / 4 + 5, left, 13, 'white', 'middle', bold=True, check=False); f.T(x + w / 2, y + 3 * h / 4 + 5, right, 13, 'white', 'middle', bold=True, check=False)
def into(f, x, y, r=12, c='ink'):
    f.Ci(x, y, r, c, 2, 'g3'); f.L(x - r * 0.6, y - r * 0.6, x + r * 0.6, y + r * 0.6, c, 2); f.L(x - r * 0.6, y + r * 0.6, x + r * 0.6, y - r * 0.6, c, 2)
def outof(f, x, y, r=12, c='ink'):
    f.Ci(x, y, r, c, 2, 'g3'); f.Ci(x, y, 3, c, 1, c)
def circle_arrows(f, x, y, r, cw=True, c='gold', n=4):
    for k in range(n):
        a0 = k * 360 / n + 20; a1 = a0 + 50
        p, q = pol(x, y, r, a0 if cw else a1), pol(x, y, r, a1 if cw else a0)
        f.P(f'M{p[0]:.1f},{p[1]:.1f} A{r},{r} 0 0 {1 if cw else 0} {q[0]:.1f},{q[1]:.1f}', c, 1.6, me=c)
def wave(f, x0, x1, y, amp, cycles, phase=0, c='gold', sw=2.4, n=200, fn=math.sin):
    pts = ' '.join(f'{x0 + (x1-x0)*i/n:.1f},{y - amp*fn(2*math.pi*cycles*i/n + phase):.1f}' for i in range(n + 1))
    f.raw(f'<polyline points="{pts}" fill="none" stroke="{col(c)}" stroke-width="{sw}" stroke-linejoin="round"/>')
def E(tag, title, W, H, aria, cap): return Fig('ch' + tag, title, W, H, aria, cap)
