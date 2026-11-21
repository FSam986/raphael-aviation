"""Helpers for the extra Instruments figures."""
import math
from figlib import *
from gen_common import note, gallery, pl

def I(tag, title, W, H, aria, cap): return Fig('fig_' + tag, title, W, H, aria, cap)
def dial(f, cx, cy, r, a0, a1, labels, ptr=None, minor=5, fill='black', lab_r=None, size=11, ring='ink'):
    """labels: list of (value_fraction 0..1, text). Scale from angle a0 to a1 (compass deg, clockwise)."""
    f.Ci(cx, cy, r + 8, ring, 2.2, fill)
    n = (len(labels) - 1) * minor
    for i in range(n + 1):
        a = a0 + (a1 - a0) * i / n; big = i % minor == 0
        p, q = pol(cx, cy, r - (10 if big else 5), a), pol(cx, cy, r, a); f.L(p[0], p[1], q[0], q[1], 'white', 1.8 if big else 0.9)
    for fr, t in labels:
        a = a0 + (a1 - a0) * fr; x, y = pol(cx, cy, lab_r or r - 22, a); f.T(x, y + size * 0.36, t, size, 'white', 'middle', bold=True, check=False)
    if ptr is not None:
        a = a0 + (a1 - a0) * ptr; t = pol(cx, cy, r - 6, a); f.L(cx, cy, t[0], t[1], 'gold', 3, cap='round'); f.Ci(cx, cy, 5, 'ink', 1, 'steel')
def arc_band(f, cx, cy, r, a0, a1, c, w=6):
    p, q = pol(cx, cy, r, a0), pol(cx, cy, r, a1)
    f.P(f'M{p[0]:.1f},{p[1]:.1f} A{r},{r} 0 {1 if (a1 - a0) > 180 else 0} 1 {q[0]:.1f},{q[1]:.1f}', c, w)
def flowrow(f, items, y, x0=30, x1=730, h=50, size=10):
    n = len(items); gap = 22; w = (x1 - x0 - gap * (n - 1)) / n
    for i, (lines, c_) in enumerate(items):
        x = x0 + i * (w + gap); f.box(x, y, w, h, lines, c=c_, size=size)
        if i < n - 1: f.L(x + w + 2, y + h / 2, x + w + gap - 2, y + h / 2, 'dim', 1.8, me='dim')
    return w
def screen(f, x, y, w, h): f.R(x, y, w, h, c='line', sw=2, fill='black', rx=8)
def att(f, cx, cy, w, h, pitch=0, bank=0, uid='a'):
    f.raw(f'<defs><clipPath id="{uid}"><rect x="{cx-w/2}" y="{cy-h/2}" width="{w}" height="{h}" rx="12"/></clipPath></defs><g clip-path="url(#{uid})"><g transform="rotate({-bank} {cx} {cy})">'
          f'<rect x="{cx-w}" y="{cy-h+pitch}" width="{2*w}" height="{h}" fill="{C["sky"]}"/><rect x="{cx-w}" y="{cy+pitch}" width="{2*w}" height="{h}" fill="{C["gnd"]}"/>'
          f'<line x1="{cx-w}" y1="{cy+pitch}" x2="{cx+w}" y2="{cy+pitch}" stroke="#fff" stroke-width="2"/></g></g>')
    f.L(cx - w * 0.36, cy, cx - w * 0.12, cy, 'gold', 4); f.L(cx + w * 0.12, cy, cx + w * 0.36, cy, 'gold', 4); f.R(cx - 4, cy - 4, 8, 8, c='gold', sw=1.6, fill='black', rx=0)
def planview(f, cx, cy, hdg=0, s=1.0, c='#c4d1d6'):
    """Top-down airliner, nose pointing to compass heading hdg (0 = up)."""
    f.raw(f'<g transform="translate({cx} {cy}) rotate({hdg}) scale({s})"><path d="M0,-60 C5,-56 6,-48 6,-40 L6,-8 L58,14 L58,22 L6,10 L5,38 L22,50 L22,56 L0,52 L-22,56 L-22,50 L-5,38 L-6,10 L-58,22 L-58,14 L-6,-8 L-6,-40 C-6,-48 -5,-56 0,-60 Z" fill="{c}" stroke="{C["ink"]}" stroke-width="{1.6/s:.2f}"/></g>')
