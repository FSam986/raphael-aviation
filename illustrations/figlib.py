#!/usr/bin/env python3
"""Instruments gallery batch 4 generator: 21 original SVG figures + built-in
QA (text out-of-bounds and text/text overlap detection)."""
import math, html, sys

C = dict(ink='var(--chart-ink)', dim='var(--chart-ink-dim)', faint='var(--chart-ink-faint)',
         gold='var(--gold)', gd='var(--gold-deep)', hot='var(--hot)', cool='var(--cool)',
         green='var(--green)', warm='var(--warm)', steel='var(--steel)', g2='var(--chart-ground-2)',
         g3='var(--chart-ground-3)', fluid='var(--fluid)', line='var(--chart-line-2)', bg='var(--chart-ground)',
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


# ── shared scene primitives ──────────────────────────────────────────────
CLOUD='#b9c8ce'; DCLOUD='#7f9199'; LAND='#2c3d35'; SEA='#1f4c5e'
def cloud(f, cx, cy, w, h, fill=CLOUD, op=1):
    o = f' opacity="{op}"' if op != 1 else ''
    f.raw(f'<g fill="{fill}"{o}><rect x="{cx-w/2:.1f}" y="{cy+h*0.05:.1f}" width="{w:.1f}" height="{h*0.42:.1f}" rx="{h*0.21:.1f}"/>'
          f'<ellipse cx="{cx-w*0.24:.1f}" cy="{cy+h*0.05:.1f}" rx="{w*0.24:.1f}" ry="{h*0.36:.1f}"/>'
          f'<ellipse cx="{cx+w*0.04:.1f}" cy="{cy-h*0.14:.1f}" rx="{w*0.27:.1f}" ry="{h*0.48:.1f}"/>'
          f'<ellipse cx="{cx+w*0.29:.1f}" cy="{cy+h*0.08:.1f}" rx="{w*0.2:.1f}" ry="{h*0.32:.1f}"/></g>')
def tower(f, cx, base, top, w, anvil=0):
    m = (top + base) / 2
    g = [f'<g fill="{CLOUD}">']
    if anvil: g.append(f'<ellipse cx="{cx}" cy="{top+6}" rx="{anvil}" ry="13"/>')
    g.append(f'<rect x="{cx-w/2:.1f}" y="{top+14:.1f}" width="{w}" height="{base-top-14:.1f}" rx="16"/>')
    for dx, dy, r in ((-w/3, 22, w/4), (0, 12, w/3.2), (w/3, 24, w/4.2)):
        g.append(f'<circle cx="{cx+dx:.1f}" cy="{top+dy:.1f}" r="{r:.1f}"/>')
    for dx, yy in ((-w/2, m - 12), (w/2, m + 8), (-w/2, m + 40), (w/2, m - 40)):
        if top + 30 < yy < base - 20: g.append(f'<circle cx="{cx+dx:.1f}" cy="{yy:.1f}" r="15"/>')
    g.append(f'</g><rect x="{cx-w/2:.1f}" y="{base-12:.1f}" width="{w}" height="12" rx="6" fill="{DCLOUD}"/>')
    f.raw(''.join(g))
def rain(f, x0, x1, y0, y1, step=12, c='cool'):
    x = x0
    while x <= x1:
        f.L(x, y0, x - 4, y1, c, 1.2, dash='5 5'); x += step
def poly(f, pts, fill=LAND, c='ink', sw=1.4, op=None):
    o = f' opacity="{op}"' if op else ''
    f.raw(f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="{col(fill)}" stroke="{col(c)}" stroke-width="{sw}"{o}/>')
def wavy(f, x, y0, y1, c='warm', sw=1.8):
    """vertical wavy arrow from y0 up to y1 (y1 < y0)"""
    n = max(2, int((y0 - y1) / 12)); d = f'M{x},{y0}'; step = (y0 - y1) / n
    for i in range(n):
        d += f' q{5 if i % 2 == 0 else -5},{-step/2:.1f} 0,{-step:.1f}'
    f.P(d, c, sw, me=c)
def aircraft(tx, ty, rot=0, s=0.5, flip=False, cross=False, gear=False):
    g = (f'<g transform="translate({tx} {ty}) rotate({rot}) scale({-s if flip else s} {s})">'
         f'<path d="M58,-12 L82,-44 L96,-44 L90,-7 Z" fill="#9fb2b9" stroke="{col("ink")}" stroke-width="2"/>')
    if gear: g += (f'<line x1="10" y1="8" x2="10" y2="22" stroke="{col("ink")}" stroke-width="2.4"/><line x1="-70" y1="8" x2="-70" y2="22" stroke="{col("ink")}" stroke-width="2"/>'
                   f'<circle cx="10" cy="25" r="5" fill="#10171b" stroke="{col("ink")}" stroke-width="1.6"/><circle cx="-70" cy="25.5" r="4.5" fill="#10171b" stroke="{col("ink")}" stroke-width="1.6"/>')
    g += (f'<path d="M-92,0 C-90,-9 -75,-12 -60,-12 L55,-12 L95,-6 L95,-2 L50,8 L-65,8 C-80,8 -90,5 -92,0 Z" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="2"/>'
          f'<path d="M-22,1 L26,1 L42,9 L-6,9 Z" fill="#8497a0" stroke="{col("ink")}" stroke-width="1.6"/>'
          f'<ellipse cx="-8" cy="13" rx="14" ry="5" fill="#a9bac1" stroke="{col("ink")}" stroke-width="1.6"/>')
    if cross: g += f'<path d="M-20,5 L4,21 M4,5 L-20,21" stroke="{col("hot")}" stroke-width="5" stroke-linecap="round"/>'
    return g + '</g>'
def table(f, x, y, colw, header, rows, hc):
    X = [x]
    for w in colw: X.append(X[-1] + w)
    f.R(x, y, sum(colw), 22, c=hc, sw=1.4, fill='g3', rx=3)
    for i, h in enumerate(header):
        f.T(X[i] + 8, y + 15, h, 10, hc if i == 0 else 'ink', bold=True)
    for r, row in enumerate(rows):
        yy = y + 22 + r * 20
        f.R(x, yy, sum(colw), 20, c='line', sw=0.8, fill='g2' if r % 2 == 0 else 'bg', rx=0)
        for i, t in enumerate(row):
            f.T(X[i] + 8, yy + 14, t, 9.5, 'ink' if i == 0 else 'dim', bold=(i == 0))
            if len(t) * 9.5 * 0.54 > colw[i] - 10: WARN.append(f'{f.fid}: table cell too wide: "{t}"')
    for xx in X[1:-1]: f.L(xx, y, xx, y + 22 + len(rows) * 20, 'line', 0.8)
