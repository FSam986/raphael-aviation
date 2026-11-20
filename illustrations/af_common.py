"""Helpers for the Airframes & Systems figures."""
import math
from pp_common import *

def AF(tag, title, W, H, aria, cap):
    c, n = tag.split('_'); return Fig(f'ch{c}_fig_{n}', title, W, H, aria, cap)

# hydraulic schematic symbols (lines: hot = pressure, cool = return)
def reservoir(f, x, y, w=90, h=50, label='Reservoir'):
    f.R(x, y, w, h, c='ink', sw=1.6, fill='g2', rx=4); f.R(x + 2, y + h * 0.4, w - 4, h * 0.6 - 2, c='none', sw=0, fill='fluid', rx=2)
    f.T(x + w / 2, y - 6, label, 10, 'ink', 'middle', bold=True)
def pump(f, x, y, r=16, label='Pump', side='right'):
    f.Ci(x, y, r, 'ink', 1.6, 'g3'); f.P(f'M{x - r * 0.5},{y + r * 0.45} L{x},{y - r * 0.6} L{x + r * 0.5},{y + r * 0.45} Z', 'none', 0, 'hot')
    if label: f.T(x + r + 6 if side == 'right' else x - r - 6, y + 4, label, 10, 'ink', 'start' if side == 'right' else 'end', bold=True)
def valvebox(f, x, y, w, h, label, c='gold', side='right', sub=None):
    f.R(x - w / 2, y - h / 2, w, h, c=c, sw=1.6, fill='g3', rx=3)
    tx = x + w / 2 + 6 if side == 'right' else x - w / 2 - 6
    f.T(tx, y + (0 if sub else 4), label, 10, 'ink', 'start' if side == 'right' else 'end', bold=True)
    if sub: f.T(tx, y + 13, sub, 9, 'dim', 'start' if side == 'right' else 'end')
def filt(f, x, y, s=12, label='Filter', side='right'):
    f.P(f'M{x},{y - s} L{x + s},{y} L{x},{y + s} L{x - s},{y} Z', 'ink', 1.6, 'g3'); f.L(x - s, y, x + s, y, 'dim', 1, dash='2 2')
    if label: f.T(x + s + 6 if side == 'right' else x - s - 6, y + 4, label, 10, 'ink', 'start' if side == 'right' else 'end', bold=True)
def actuator(f, x, y, w=120, h=26, pos=0.5, label='Actuator'):
    f.R(x, y - h / 2, w, h, c='ink', sw=1.8, fill='g2', rx=2)
    px = x + 8 + (w - 24) * pos; f.R(px, y - h / 2 + 2, 8, h - 4, c='ink', sw=1.2, fill='#a9bac1', rx=1)
    f.L(px + 8, y, x + w + 40, y, 'ink', 3); f.Ci(x + w + 44, y, 4, 'ink', 1.4, 'bg')
    if label: f.T(x + w / 2, y + h / 2 + 16, label, 10, 'ink', 'middle', bold=True)
def line(f, pts, c='hot', sw=2.4, dash=None):
    f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts), c, sw, dash=dash, join='round')
def accumulator(f, x, y, r=22, label='Accumulator', side='right'):
    f.R(x - r, y - r * 1.6, 2 * r, 3.2 * r, c='ink', sw=1.6, fill='g2', rx=r)
    f.R(x - r + 2, y, 2 * r - 4, r * 1.6 - 2, c='none', sw=0, fill='hot', rx=r * 0.8, op=0.8); f.L(x - r + 2, y, x + r - 2, y, 'ink', 1.6)
    f.T(x, y - r * 0.5, 'gas', 9.5, 'cool', 'middle', bold=True, check=False)
    if label: f.T(x + r + 6 if side == 'right' else x - r - 6, y + 4, label, 10, 'ink', 'start' if side == 'right' else 'end', bold=True)
def nrv(f, x, y, vertical=True, label=None, side='right'):
    if vertical: f.P(f'M{x - 8},{y - 6} L{x},{y + 6} L{x + 8},{y - 6} Z', 'ink', 1.4, 'gold')
    else: f.P(f'M{x - 6},{y - 8} L{x + 6},{y} L{x - 6},{y + 8} Z', 'ink', 1.4, 'gold')
    if label: f.T(x + 14 if side == 'right' else x - 14, y + 4, label, 10, 'ink', 'start' if side == 'right' else 'end', bold=True)
def gauge(f, x, y, r=16, v=0.6):
    f.Ci(x, y, r, 'ink', 1.4, 'black'); a = math.radians(225 + 270 * v); f.L(x, y, x + (r - 3) * math.sin(a), y - (r - 3) * math.cos(a), 'gold', 1.8)
