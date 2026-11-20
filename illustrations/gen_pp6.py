#!/usr/bin/env python3
"""Powerplant extra: piston engine lubrication (fills the A.1.4 Lubrication note)."""
from pp_common import *

PP = []
f = PF('03_01', 'Wet-Sump Lubrication System', 760, 380, 'Oil carried in the sump under the engine, drawn through a suction screen by the pressure pump, through a relief valve and filter to the bearings, draining back to the sump',
       'In a wet-sump system the oil is carried in the sump under the crankcase. The engine-driven pressure pump draws it through a suction screen and sends it through the filter (with bypass) to the bearings and galleries; a relief valve limits the pressure. The oil drains back to the sump by gravity. Simple and light — used on most light aircraft.')
N = {}
node(f, N, 'sump', 40, 290, 240, 60, ['Sump (oil under crankcase)'], 'cool', 10)
node(f, N, 'pump', 40, 170, 180, 50, ['Pressure pump', '(engine driven)'], 'hot', 9.5)
node(f, N, 'filt', 290, 170, 170, 50, ['Oil filter', '+ bypass valve'], 'hot', 9.5)
node(f, N, 'eng', 530, 160, 200, 70, ['Bearings & galleries', 'crankshaft, cam, rockers'], 'ink', 9.5)
node(f, N, 'rv', 40, 50, 180, 50, ['Pressure relief valve'], 'gold', 9.5)
node(f, N, 'cool', 290, 50, 170, 50, ['Oil cooler', '(thermostatic bypass)'], 'cool', 9.5)
conn(f, N, 'sump', 'pump', 'cool', label='suction screen', lc='cool'); conn(f, N, 'pump', 'filt', 'hot'); conn(f, N, 'filt', 'eng', 'hot')
conn(f, N, 'pump', 'rv', 'gold', dash='4 3'); conn(f, N, 'filt', 'cool', 'cool', dash='4 3')
f.P('M630,230 L630,320 L282,320', 'cool', 2, me='cool'); f.T(456, 340, 'drains back by gravity', 10, 'cool', 'middle', bold=True)
f.box(530, 40, 200, 70, ['Gauges', 'oil pressure + temperature'], c='gold', size=9.5)
PP.append(f)

f = PF('03_02', 'Dry-Sump Lubrication System', 760, 400, 'Oil tank feeding a pressure pump through a suction filter to the engine, with a larger scavenge pump returning oil through a filter and thermostatically bypassed cooler to the tank',
       'In a dry-sump system the oil is held in a separate tank. The pressure pump feeds the engine through the pressure filter (relief valve limits pressure). A scavenge pump — larger than the pressure pump because the returning oil is frothy — draws the oil from the crankcase through a scavenge filter and the oil cooler (with an anti-surge / thermostatic bypass) back to the tank, where a de-aerator removes the air. Needed for aerobatic and large engines.')
N = {}
node(f, N, 'tank', 40, 40, 190, 60, ['Oil tank', '+ de-aerator'], 'cool', 10)
node(f, N, 'sf', 40, 150, 190, 44, ['Suction filter'], 'cool', 10)
node(f, N, 'pp', 40, 240, 190, 50, ['Pressure pump'], 'hot', 10)
node(f, N, 'pf', 290, 240, 180, 50, ['Pressure filter', '+ relief valve'], 'hot', 9.5)
node(f, N, 'eng', 530, 230, 200, 70, ['Engine bearings', '& galleries'], 'ink', 10)
node(f, N, 'sc', 530, 330, 200, 50, ['Scavenge pump', '(larger capacity)'], 'gold', 9.5)
node(f, N, 'scf', 290, 140, 180, 44, ['Scavenge filter'], 'gold', 10)
node(f, N, 'oc', 290, 40, 180, 60, ['Oil cooler', 'thermostatic bypass'], 'cool', 9.5)
for a, b, c_ in (('tank', 'sf', 'cool'), ('sf', 'pp', 'cool'), ('pp', 'pf', 'hot'), ('pf', 'eng', 'hot'), ('eng', 'sc', 'gold')): conn(f, N, a, b, c_)
f.P('M732,355 L748,355 L748,162 L472,162', 'gold', 2, me='gold'); conn(f, N, 'scf', 'oc', 'gold'); conn(f, N, 'oc', 'tank', 'cool')
f.T(380, 384, 'scavenge pump > pressure pump: return oil is frothy', 10, 'dim', 'middle')
PP.append(f)

if __name__ == '__main__':
    gallery(PP, 'Powerplant Gallery 6', 'Powerplant — Piston Lubrication', 'Original figures for wet- and dry-sump lubrication.', 'pp6-gallery.html')
    print(len(PP), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
