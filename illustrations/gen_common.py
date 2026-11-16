"""Shared helpers for the figure generators."""
import math
from figlib import *

def note(f, x, y, lines, size=10, lh=14, c='dim', first=None):
    for i, t in enumerate(lines):
        if t: f.T(x, y + i * lh, t, size, (first or c) if i == 0 else c, bold=(i == 0 and first is not None))

def runway(f, x, y, w, h=16, num=None):
    f.R(x, y, w, h, c='ink', sw=1.2, fill='steel', rx=0)
    f.L(x + 14, y + h / 2, x + w - 14, y + h / 2, 'white', 1.2, dash='10 8')
    for i in range(4): f.L(x + 4, y + 3 + i * (h - 6) / 3, x + 10, y + 3 + i * (h - 6) / 3, 'white', 1.2)

def persp_rwy(f, cx, top, bot, wt=14, wb=40):
    poly(f, [(cx - wt, top), (cx + wt, top), (cx + wb, bot), (cx - wb, bot)], fill='steel', c='ink', sw=1.2)
    f.L(cx, top + 6, cx, bot - 6, 'white', 1.4, dash='8 7')

def lights(f, x, y, cols, r=5, gap=14):
    for i, c_ in enumerate(cols): f.Ci(x + i * gap, y, r, 'ink', 0.8, 'white' if c_ == 'W' else 'hot')


def sine(x0, x1, y0, amp, cycles, phase=0, n=160):
    return ' '.join(f'{x0 + (x1-x0)*i/n:.1f},{y0 - amp*math.sin(2*math.pi*cycles*i/n + phase):.1f}' for i in range(n + 1))

def pl(f, pts, c, sw=2.4, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    f.raw(f'<polyline points="{pts}" fill="none" stroke="{col(c)}" stroke-width="{sw}"{d}/>')


def gallery(figs, title, h1, lede, out):
    head = open('instruments-gallery.html').read()
    head = head[:head.index('<header>')].replace('<title>Instruments Gallery</title>', f'<title>{title}</title>')
    n = len(figs)
    open(out, 'w').write(head + f'<header>\n    <h1>{h1}</h1>\n    <p class="lede">{lede}</p>\n    <div class="prog"><span class="pct">{n} / {n} drawn</span><div class="bar"><i></i></div><span class="pct">complete</span></div>\n  </header>\n'
                         + ''.join(g.html(i + 1) for i, g in enumerate(figs)) + f'\n  <footer>\n    {h1}: {n} original figures.\n  </footer>\n</div>\n</body></html>')
