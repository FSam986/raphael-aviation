#!/usr/bin/env python3
"""Airframes part 4 (chapters 10-13): air conditioning, pressurisation, ice protection, oxygen."""
import math
from af_common import *

AFS = []
def chart(x0, y0, x1, y1, xr, yr):
    return (lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)), (lambda v: y1 - (v - yr[0]) / (yr[1] - yr[0]) * (y1 - y0))
def chain(f, N, keys, c='dim'):
    for a, b in zip(keys, keys[1:]): conn(f, N, a, b, c)

f = AF('10_05', 'Bleed Air Sources and Uses on the Aircraft', 760, 360, 'Plan view of an airliner with engine bleed air ducted through pre-coolers to a crossfeed duct supplying the air conditioning packs, wing anti-ice, APU and ground connector',
       'Engine bleed air passes through each pre-cooler into the crossfeed duct (with a crossfeed / isolation valve). From it air goes to the air-conditioning packs, wing and engine anti-icing, engine starting and other services; the APU and a ground connector can also supply it.')
f.raw('<g transform="translate(380 190) scale(2.6)"><path d="M0,-60 C5,-56 6,-48 6,-40 L6,-8 L58,14 L58,22 L6,10 L5,38 L22,50 L22,56 L0,52 L-22,56 L-22,50 L-5,38 L-6,10 L-58,22 L-58,14 L-6,-8 L-6,-40 C-6,-48 -5,-56 0,-60 Z" fill="#c4d1d6" fill-opacity="0.25" stroke="#dfeef2" stroke-width="0.6"/></g>')
for sg in (-1, 1):
    ex = 380 + sg * 80; f.R(ex - 10, 190, 20, 40, c='ink', sw=1.4, fill='steel', rx=4)
    f.L(ex, 190, ex, 175, 'hot', 3); f.L(ex, 175, 380 + sg * 10, 175, 'hot', 3); f.L(380 + sg * 30, 175, 380 + sg * 140, 210, 'cool', 3)
f.R(372, 168, 16, 14, c='ink', sw=1.2, fill='gd', rx=2)
f.L(380, 175, 380, 300, 'hot', 3); f.R(370, 290, 20, 20, c='ink', sw=1.2, fill='hot', rx=2)
f.T(520, 60, 'to air-conditioning packs', 10.5, 'hot', bold=True); f.L(516, 58, 386, 168, 'hot', 1.2, dash='3 3')
f.T(600, 200, 'wing anti-ice', 10.5, 'cool', bold=True); f.T(460, 260, 'engine bleed + pre-cooler', 10.5, 'hot', bold=True)
f.T(400, 304, 'APU', 10.5, 'hot', bold=True); f.T(150, 160, 'crossfeed valve (centre)', 10.5, 'gold', bold=True); f.L(250, 162, 370, 172, 'gold', 1)
AFS.append(f)

f = AF('10_06', 'Bootstrap Air Cycle System', 760, 400, 'Bleed air through a primary heat exchanger, compressor, secondary heat exchanger and expansion turbine driving the compressor, then water separator to the cabin, with a temperature control bypass valve',
       'Bleed air is cooled in the primary heat exchanger, then compressed (raising its temperature so the secondary heat exchanger can remove more heat), cooled again, and finally expanded through the turbine, which drives the compressor ("bootstrap"). Expansion cools it well below ambient. A water separator removes moisture and a bypass valve mixes in hot air to control cabin temperature.')
N = {}
node(f, N, 'b', 20, 40, 130, 44, ['Bleed air in'], 'hot', 10)
node(f, N, 'phx', 190, 40, 150, 44, ['Primary heat exch.'], 'cool', 9.5)
node(f, N, 'c', 380, 40, 130, 44, ['Compressor'], 'hot', 10)
node(f, N, 'shx', 560, 40, 170, 44, ['Secondary heat exch.'], 'cool', 9.5)
node(f, N, 't', 560, 160, 170, 44, ['Expansion turbine'], 'cool', 10)
node(f, N, 'ws', 560, 270, 170, 44, ['Water separator'], 'cool', 10)
node(f, N, 'cab', 300, 300, 160, 44, ['To cabin'], 'ink', 10)
node(f, N, 'tcv', 190, 180, 170, 44, ['Temp control valve', '(hot bypass)'], 'gold', 9.5)
chain(f, N, ['b', 'phx', 'c', 'shx', 't', 'ws', 'cab'], 'cool')
f.P('M560,182 L445,182 L445,86', 'ink', 3, dash='6 4'); f.T(450, 136, 'common shaft', 9.5, 'dim')
conn(f, N, 'b', 'tcv', 'hot', dash='4 3'); conn(f, N, 'tcv', 'cab', 'gold')
f.T(20, 130, 'ram air cools both', 9.5, 'cool'); f.T(20, 144, 'heat exchangers', 9.5, 'cool')
AFS.append(f)

f = AF('10_07', 'Typical Performance of a Bootstrap System', 760, 360, 'Temperature and pressure through the stages of a bootstrap air cycle system: primary heat exchanger, compressor, secondary heat exchanger and turbine',
       'Example values: bleed air at about 168°C and 30 psi is cooled to 82°C in the primary heat exchanger, compressed to 140°C and 43 psi, cooled to 58°C in the secondary heat exchanger and expanded in the turbine to about +2°C and 16.6 psi. The large drop through the turbine is what makes the system effective.')
x0, y0, x1, y1 = 100, 60, 700, 300
st = ['bleed in', 'after primary HX', 'after compressor', 'after secondary HX', 'after turbine']
xs = [x0 + i * (x1 - x0) / 4 for i in range(5)]
X, Yt = chart(x0, y0, x1, y1, (0, 4), (-10, 180)); Yp = lambda v: y1 - v / 50 * (y1 - y0)
f.L(x0, y1, x1, y1, 'dim', 1.4)
for x, t in zip(xs, st): f.L(x, y0, x, y1, 'line', 1, dash='3 3'); f.T(x, y1 + 18, t, 9.5, 'ink', 'middle', bold=True)
T = [168, 82, 140, 58, 2]; P = [30, 26, 43, 42.5, 16.6]
curve(f, [(x, Yt(v)) for x, v in zip(xs, T)], 'hot', 3); curve(f, [(x, Yp(v)) for x, v in zip(xs, P)], 'cool', 3)
for x, v, p_ in zip(xs, T, P): up = Yt(v) < Yp(p_); f.Ci(x, Yt(v), 4, 'hot', 1, 'hot'); f.T(x + 8, Yt(v) - 8 if up else Yt(v) + 20, f'{v}°C', 10, 'hot', bold=True)
for x, v, t_ in zip(xs, P, T): up = Yp(v) <= Yt(t_); f.Ci(x, Yp(v), 4, 'cool', 1, 'cool'); f.T(x + 8, Yp(v) - 8 if up else Yp(v) + 20, f'{v:g} psi', 10, 'cool', bold=True)
f.T(x0, 40, 'temperature (red)  ·  pressure (blue)'.replace('·', '|'), 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('10_09', 'Humidity Control — Venturi Humidifier', 760, 300, 'Cabin supply duct with a venturi into which water from a tank is sprayed, controlled by a humidistat in the cabin',
       'At altitude the cabin air is very dry. A venturi humidifier sprays a fine mist of water into the supply duct (the venturi suction drawing water from a pressurised tank); a humidistat controls the water valve. Most airliners have no humidifier, and dry air is accepted.')
f.P('M60,140 L260,140 L330,160 L400,140 L700,140 L700,220 L400,220 L330,200 L260,220 L60,220 Z', 'ink', 2, 'hot', op=0.5)
f.R(300, 30, 120, 50, c='ink', sw=1.6, fill='g2', rx=4); f.R(302, 54, 116, 24, c='none', sw=0, fill='fluid', rx=2); f.T(360, 22, 'water tank', 10.5, 'cool', 'middle', bold=True)
f.L(330, 80, 330, 160, 'cool', 3); f.R(320, 100, 20, 16, c='ink', sw=1.2, fill='gd', rx=2); f.T(346, 112, 'control valve', 10, 'gold', bold=True)
for k in range(6): f.Ci(350 + k * 14, 170 + (k % 2) * 10, 2.5, 'cool', 1, 'cool')
f.L(60, 180, 240, 180, 'hot', 2.4, me='hot'); f.T(60, 170, 'charge air', 10.5, 'hot', bold=True); f.L(500, 180, 690, 180, 'cool', 2.4, me='cool'); f.T(690, 170, 'humidified to cabin', 10.5, 'cool', 'end', bold=True)
f.R(600, 240, 60, 30, c='ink', sw=1.4, fill='g3', rx=4); f.T(630, 290, 'humidistat (cabin)', 10, 'ink', 'middle', bold=True); f.P('M600,255 L440,255 L440,92 L340,92 L330,100', 'gold', 1.2, dash='4 3')
f.T(330, 250, 'venturi', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('10_10', 'Cabin Temperature Control by Hot Air Mixing', 760, 300, 'Cold air from the air cycle machine mixed with hot air through a hot air valve controlled by a temperature sensor in the mixed air duct',
       'Cold air from the air cycle machine and heat exchangers is mixed with hot bleed air bypassed round them. A temperature sensor in the mixed-air duct (and in the cabin) signals the controller, which positions the hot-air valve to give the selected temperature.')
f.R(100, 180, 220, 70, c='ink', sw=1.6, fill='cool', rx=4, op=0.7); f.T(210, 220, 'ACM and heat exchangers', 10.5, 'black', 'middle', bold=True, check=False)
pipe(f, [(60, 215), (100, 215)], 'hot', 10); pipe(f, [(80, 215), (80, 60), (500, 60), (500, 200)], 'hot', 10)
f.Ci(260, 60, 18, 'ink', 1.6, 'g3'); f.L(247, 73, 273, 47, 'ink', 2); f.T(260, 30, 'hot air valve', 10.5, 'gold', 'middle', bold=True)
pipe(f, [(320, 215), (680, 215)], 'mag', 12); f.R(560, 170, 24, 30, c='ink', sw=1.4, fill='gd', rx=2); f.T(572, 160, 'temperature sensor', 10.5, 'gold', 'middle', bold=True)
f.T(680, 250, 'mixed air to cabin', 10.5, 'mag', 'end', bold=True); f.P('M572,170 L572,110 L270,110 L262,78', 'gold', 1.2, dash='4 3')
AFS.append(f)

f = AF('10_11', 'Cabin Air Distribution', 760, 360, 'Fuselage cross-section with the main supply duct below the floor, risers up the sidewalls to overhead outlets and lower sidewall outlets, and exhaust through floor-level grilles',
       'Conditioned air rises from the mixing unit through riser ducts to the overhead and sidewall outlets, flows across the cabin and leaves through grilles at floor level, then passes to the outflow valve. The flow pattern is mainly circumferential, limiting front-to-back spread of contaminants.')
f.El(380, 180, 200, 160, 'ink', 4, 'g2'); f.L(190, 230, 570, 230, 'gold', 6); f.T(380, 222, 'cabin floor', 10, 'gold', 'middle', bold=True)
f.R(340, 280, 80, 30, c='ink', sw=1.4, fill='cool', rx=4); f.T(380, 330, 'main supply duct', 10.5, 'cool', 'middle', bold=True)
for sg in (-1, 1):
    f.P(f'M{380 + sg * 40},295 L{380 + sg * 180},280 L{380 + sg * 190},120 L{380 + sg * 80},60', 'cool', 3)
    f.L(380 + sg * 80, 64, 380 + sg * 40, 110, 'cool', 2, me='cool'); f.L(380 + sg * 150, 160, 380 + sg * 110, 180, 'cool', 2, me='cool')
    f.L(380 + sg * 150, 226, 380 + sg * 170, 250, 'dim', 2, me='dim')
f.T(380, 140, 'air flows across the cabin', 10, 'dim', 'middle')
f.T(600, 60, 'overhead outlets', 10.5, 'cool', bold=True); f.T(600, 250, 'floor-level exhaust', 10.5, 'dim', bold=True)
AFS.append(f)

f = AF('11_01', 'Pressurised and Unpressurised Areas', 760, 360, 'Side view of an airliner with the pressure hull from the front to the rear pressure bulkhead shaded, and unpressurised radome, gear bays, centre-section and tail cone',
       'The pressure hull runs from the front pressure bulkhead (behind the radome) to the rear pressure bulkhead and includes the flight deck, cabin and cargo holds. Unpressurised areas include the radome, nose and main gear bays, the wing centre-section/torque box and the tail cone.')
f.raw(aircraft(380, 150, s=3.2, flip=True))
f.R(170, 130, 330, 42, c='gold', sw=1.6, fill='gold', rx=10, op=0.45)
f.R(200, 166, 60, 10, c='hot', sw=1, fill='hot', rx=1, op=0.7); f.R(330, 166, 80, 12, c='hot', sw=1, fill='hot', rx=1, op=0.7)
f.box(60, 240, 300, 100, ['Pressurised (gold)', 'Flight deck, cabins', 'Forward and aft cargo holds'], c='gold', size=10.5)
f.box(400, 240, 320, 100, ['Unpressurised (red / outside)', 'Radome, nose and main gear bays', 'Centre-section box, tail cone'], c='hot', size=10.5)
AFS.append(f)

f = AF('11_02', 'Pressurisation Control Valves', 760, 340, 'Outflow valve, inward relief valve and pressure (safety) relief valve on the pressure hull',
       'The outflow valve controls cabin pressure by regulating how much air leaves the hull. The safety (pressure) relief valve opens if the maximum differential is exceeded. The inward (negative) relief valve opens if outside pressure exceeds cabin pressure, e.g. in a rapid descent. A dump function opens the outflow valve fully.')
for i, (x, t, sub, c_, d) in enumerate(((140, 'Outflow valve', 'regulates cabin pressure', 'gold', 'out'), (380, 'Safety relief valve', 'opens at max ΔP'.replace('Δ', 'diff. '), 'hot', 'out'), (620, 'Inward relief valve', 'outside P > cabin P', 'cool', 'in'))):
    f.R(x - 70, 160, 140, 20, c='ink', sw=1.6, fill='steel', rx=0); f.R(x - 30, 150, 60, 40, c=c_, sw=2, fill='g3', rx=6)
    if d == 'out': f.L(x, 150, x, 80, c_, 2.6, me=c_)
    else: f.L(x, 80, x, 150, c_, 2.6, me=c_)
    f.T(x, 230, t, 11, c_, 'middle', bold=True); f.T(x, 248, sub, 10, 'ink', 'middle')
f.T(40, 60, 'outside', 10.5, 'dim', bold=True); f.T(40, 300, 'cabin (pressure hull)', 10.5, 'dim', bold=True)
f.L(20, 170, 740, 170, 'line', 1, dash='4 4')
AFS.append(f)

f = AF('11_03', 'Electronic Pressurisation Control', 760, 360, 'Pressure controllers using landing field elevation and air data to command the outflow valve, with manual control and the safety and inward relief valves',
       'Two digital pressure controllers (one active, one standby) use landing field elevation (from the FMS or set manually) and air data to schedule cabin altitude and rate, and drive the outflow valve motors. In manual mode the crew drive the outflow valve directly.')
N = {}
node(f, N, 'pan', 20, 40, 180, 54, ['CABIN PRESS panel', 'AUTO / MAN, LDG ELEV'], 'gold', 9.5)
node(f, N, 'fms', 20, 140, 180, 44, ['FMS / air data'], 'cool', 9.5)
node(f, N, 'pc', 270, 80, 200, 64, ['Pressure controllers', 'AUTO 1 / AUTO 2'], 'gold', 9.5)
node(f, N, 'ofv', 540, 80, 190, 64, ['Outflow valve', 'motors'], 'hot', 9.5)
node(f, N, 'sr', 270, 240, 200, 44, ['Safety relief valves'], 'hot', 9.5)
node(f, N, 'ir', 540, 240, 190, 44, ['Inward relief valve'], 'cool', 9.5)
conn(f, N, 'pan', 'pc', 'gold'); conn(f, N, 'fms', 'pc', 'cool'); conn(f, N, 'pc', 'ofv', 'hot')
f.P('M110,94 L110,110 L230,110 L230,190 L630,190 L630,146', 'dim', 1.6, dash='5 3', me='dim'); f.T(420, 206, 'manual mode', 9.5, 'dim', 'middle')
f.T(380, 320, 'relief valves are pneumatic and independent of the controllers', 10, 'dim', 'middle')
AFS.append(f)

f = AF('11_04', 'Pressurisation Profile', 760, 380, 'Aircraft altitude and cabin altitude through taxi, take-off and climb, cruise, descent and landing',
       'On the ground the outflow valve is open. After take-off the cabin climbs at a limited rate (typically 500 ft/min) while the aircraft climbs much faster; in cruise the cabin is held at up to 8000 ft, the differential approaching its maximum. In the descent the cabin descends (about 300 ft/min) to slightly below the landing field elevation, and is depressurised after touchdown.')
x0, y0, x1, y1 = 100, 40, 700, 300
axes(f, x0, y0, x1, y1, '', 'ALTITUDE')
f.P(f'M{x0},{y1} L180,{y1} L300,80 L500,80 L620,240 L680,{y1}', 'cool', 3)
f.P(f'M{x0},{y1} L180,{y1} L300,190 L500,190 L620,{y1 - 8} L680,{y1}', 'hot', 3)
for x, t in ((140, 'TAXI'), (240, 'TAKE-OFF + CLIMB'), (400, 'CRUISE'), (560, 'DESCENT'), (660, 'LAND')): f.T(x, y1 + 20, t, 9.5, 'ink', 'middle', bold=True)
f.T(400, 70, 'aircraft altitude', 10.5, 'cool', 'middle', bold=True); f.T(400, 180, 'cabin altitude (max 8000 ft)', 10.5, 'hot', 'middle', bold=True)
f.L(400, 88, 400, 186, 'gold', 1.4, me='gold', ms='gold'); f.T(408, 140, 'differential pressure', 10, 'gold', bold=True)
f.T(400, 360, 'cabin climbs ~500 ft/min, descends ~300 ft/min', 10, 'dim', 'middle')
AFS.append(f)

f = AF('11_05', 'Cabin Pressure Instrumentation (ECAM CAB PRESS)', 760, 360, 'Cabin pressure display with differential pressure, cabin vertical speed and cabin altitude, outflow valve position and safety valve status',
       'The CAB PRESS page shows the pressure differential, cabin vertical speed and cabin altitude, landing elevation, which controller is in use and the outflow and safety valve positions. Conventional aircraft use three gauges: cabin altitude, differential pressure and cabin rate of climb.')
f.R(40, 20, 680, 320, c='line', sw=2, fill='black', rx=8); f.T(120, 46, 'CAB PRESS', 12, 'white', 'middle', bold=True, check=False)
for x, t, v in ((170, 'diff P (psi)', 0.7), (380, 'V/S (ft/min)', 0.45), (590, 'CAB ALT (ft)', 0.55)):
    dial(f, x, 130, 50, 225, 405, [(0, ''), (1, '')], ptr=v, minor=6, size=8); f.T(x, 210, t, 10.5, 'white', 'middle', bold=True, check=False)
f.T(170, 166, '6.1', 13, 'green', 'middle', bold=True, check=False); f.T(380, 166, '+250', 13, 'green', 'middle', bold=True, check=False); f.T(590, 166, '7200', 13, 'green', 'middle', bold=True, check=False)
f.R(240, 250, 280, 50, c='white', sw=1.4, fill='none', rx=4); f.T(380, 280, 'outflow valve  |  safety valve', 11, 'green', 'middle', bold=True, check=False)
f.T(560, 46, 'LDG ELEV AUTO 500 FT', 10, 'green', 'middle', check=False)
AFS.append(f)

f = AF('12_01', 'Areas Most Susceptible to Ice Formation', 760, 340, 'Airliner with the leading edges, engine intakes, propellers, windscreens and pitot-static probes highlighted',
       'Ice forms first on small-radius, forward-facing parts: wing and tail leading edges, engine intakes and spinners, propeller blades, windscreens, pitot and static probes, aerials and other protuberances. These are the areas protected.')
f.raw('<g transform="translate(380 180) scale(2.4)"><path d="M0,-60 C5,-56 6,-48 6,-40 L6,-8 L58,14 L58,22 L6,10 L5,38 L22,50 L22,56 L0,52 L-22,56 L-22,50 L-5,38 L-6,10 L-58,22 L-58,14 L-6,-8 L-6,-40 C-6,-48 -5,-56 0,-60 Z" fill="#c4d1d6" stroke="#dfeef2" stroke-width="0.6"/></g>')
for sg in (-1, 1):
    f.L(380 + sg * 15, 161, 380 + sg * 139, 214, 'cool', 5); f.L(380 + sg * 14, 296, 380 + sg * 53, 300, 'cool', 4)
    f.Ci(380 + sg * 70, 200, 9, 'cool', 2, 'none')
f.Ci(380, 50, 6, 'cool', 2, 'cool')
f.T(600, 150, 'wing leading edges', 10.5, 'cool', bold=True); f.T(560, 230, 'engine intakes', 10.5, 'cool', bold=True)
f.T(470, 40, 'windscreen, pitot/static probes', 10.5, 'cool', bold=True); f.T(560, 310, 'tail leading edges', 10.5, 'cool', bold=True)
f.T(60, 300, '(and propellers on turboprops)', 10, 'dim')
AFS.append(f)

f = AF('12_02', 'Where Airframe Icing Occurs', 760, 360, 'Altitude bands with temperature showing no icing above about 40,000 ft, moderate icing in middle and high cloud and moderate to severe icing in low and convective cloud near the freezing level',
       'Icing needs supercooled water droplets. Above about 40,000 ft (−40°C) cloud is ice crystals that do not stick: no icing. In altostratus/altocumulus moderate icing is likely; the most severe icing is in cumulus/cumulonimbus and nimbostratus between 0°C and about −15°C. Below the freezing level there is no airframe icing.')
for y0, y1, t, c_, cl in ((30, 100, 'no icing', 'cool', 'Cirrus, cirrostratus, cirrocumulus'), (100, 190, 'moderate icing', 'gold', 'Altostratus, altocumulus'), (190, 290, 'moderate – severe icing', 'hot', 'Cumulus, cumulonimbus, nimbostratus'), (290, 340, 'no icing', 'cool', 'below the freezing level')):
    f.R(120, y0, 360, y1 - y0, c='line', sw=1, fill=c_, rx=0, op=0.18); f.T(300, (y0 + y1) / 2 + 4, t, 11.5, c_, 'middle', bold=True); f.T(500, (y0 + y1) / 2 + 4, cl, 10.5, 'ink', bold=True)
for y, t in ((100, '40,000 ft  −40°C'), (190, '23,000 ft  −15°C'), (290, '6500 ft  0°C')): f.T(110, y + 4, t, 10, 'ink', 'end', bold=True)
AFS.append(f)

def detector(tag, title, aria, cap, draw):
    f = AF(tag, title, 760, 320, aria, cap); draw(f); AFS.append(f)
def smiths(f):
    f.R(320, 60, 30, 160, c='ink', sw=1.6, fill='#a9bac1', rx=6); f.R(260, 220, 150, 50, c='ink', sw=1.6, fill='steel', rx=10)
    for y in (90, 120, 150, 180): f.Ci(320, y, 4, 'ink', 1, 'bg')
    f.Ci(350, 110, 4, 'ink', 1, 'bg'); f.Ci(350, 150, 4, 'ink', 1, 'bg')
    f.R(326, 40, 18, 20, c='ink', sw=1, fill='hot', rx=2)
    f.T(200, 90, '4 holes in leading edge', 10.5, 'ink', 'end', bold=True); f.T(400, 130, '2 holes in trailing edge', 10.5, 'ink', bold=True)
    f.T(400, 50, 'heating element', 10.5, 'hot', bold=True); f.T(440, 250, 'pressure switch → cockpit warning', 10.5, 'gold', bold=True)
    f.L(150, 160, 300, 160, 'cool', 2.4, me='cool'); f.T(150, 180, 'airflow', 10, 'cool')
detector('12_04', 'Pressure-Type (Smiths) Ice Detector', 'Probe with holes in its leading and trailing edges connected to a pressure switch, and a heating element',
         'In clear air the pressures through the front and rear holes keep the switch balanced. Ice blocks the small front holes, the pressure difference changes and the switch gives a warning; the probe heater then melts the ice and the cycle repeats while icing continues.', smiths)
def napier(f):
    f.Ci(300, 160, 70, 'ink', 2, 'steel'); f.Ci(300, 160, 10, 'ink', 1.4, 'g3'); f.R(370, 152, 120, 16, c='ink', sw=1.4, fill='#a9bac1', rx=2)
    f.R(220, 80, 12, 60, c='ink', sw=1.4, fill='gold', rx=2); f.T(200, 70, 'knife edge (scraper)', 10.5, 'gold', 'end', bold=True)
    f.T(500, 164, 'rotating splined shaft', 10.5, 'ink', bold=True); f.T(300, 260, 'rotor (drum) exposed to the airflow', 10.5, 'ink', 'middle', bold=True)
    f.T(560, 70, 'ice on the drum increases', 10, 'dim'); f.T(560, 84, 'torque at the knife edge', 10, 'dim'); f.T(560, 98, '→ microswitch → warning', 10, 'gold', bold=True)
detector('12_05', 'Rotary (Napier) Ice Detector', 'A slowly rotating drum exposed to the airflow with a knife-edge scraper close to it; ice build-up increases torque and operates a microswitch',
         'A small motor turns a drum in the airflow. Ice forming on it is shaved off by a fixed knife edge; the extra torque turns the motor housing slightly and closes a microswitch, giving an icing warning.', napier)
def rosemount(f):
    f.P('M180,240 L580,240 L560,280 L200,280 Z', 'ink', 1.6, 'steel'); f.R(360, 120, 30, 120, c='ink', sw=1.6, fill='#a9bac1', rx=10)
    f.L(375, 120, 375, 60, 'ink', 1, dash='3 3'); f.T(375, 50, 'vibrating rod ≈ 40 kHz', 10.5, 'gold', 'middle', bold=True)
    f.T(560, 160, 'ice mass lowers the', 10.5, 'ink', bold=True); f.T(560, 176, 'frequency → warning,', 10.5, 'ink', bold=True); f.T(560, 192, 'then probe heater on', 10.5, 'hot', bold=True)
    f.T(380, 304, 'frequency-sensitive circuit in the base', 10, 'dim', 'middle')
detector('12_06', 'Vibrating-Rod (Rosemount) Ice Detector', 'Probe with a rod vibrating ultrasonically whose frequency falls as ice accretes',
         'A strut-mounted rod is vibrated at its natural frequency (about 40 kHz). Ice on it adds mass and lowers the frequency; when the drop reaches a threshold, the detector signals icing and heats the probe to shed the ice ready for the next cycle.', rosemount)
def weston(f):
    f.R(260, 200, 240, 80, c='ink', sw=1.6, fill='steel', rx=10); f.T(380, 246, 'detector controller', 10.5, 'white', 'middle', bold=True, check=False)
    for x, c_ in ((320, 'cool'), (440, 'hot')): f.R(x - 14, 100, 28, 100, c='ink', sw=1.4, fill=c_, rx=6)
    f.L(120, 140, 300, 140, 'cool', 2.4, me='cool'); f.T(120, 130, 'airflow', 10.5, 'cool', bold=True)
    f.T(320, 90, 'sensing probe', 10, 'cool', 'middle', bold=True); f.T(440, 90, 'reference probe (shielded)', 10, 'hot', 'middle', bold=True)
    f.T(560, 160, 'water droplets cool the', 10, 'ink', bold=True); f.T(560, 174, 'sensing probe more than', 10, 'ink', bold=True); f.T(560, 188, 'the reference → icing signal', 10, 'gold', bold=True)
detector('12_07', 'Temperature-Differential Ice Detector', 'Two heated probes, one exposed to the airflow and one shielded from water droplets, connected to a controller',
         'Two heated thermistor probes are compared. Liquid water striking the exposed probe cools it (evaporation) more than the shielded reference probe; with the outside temperature below freezing the temperature difference signals icing conditions.', weston)
def beta(f):
    f.raw(aircraft(380, 160, s=2.6, flip=True)); f.Ci(520, 152, 6, 'gold', 1.4, 'gold')
    f.T(560, 80, 'probe: beta emitter + detector', 10.5, 'gold', bold=True); f.L(560, 86, 522, 148, 'gold', 1)
    f.T(380, 280, 'ice on the probe absorbs beta particles → count rate falls → icing warning', 10.5, 'ink', 'middle', bold=True)
detector('12_08', 'Beta-Particle Ice Detection Probe', 'Aircraft with an ice detection probe in which a radioactive beta source faces a detector across a gap',
         'A weak beta source faces a detector. Ice forming between them absorbs the particles and the count falls, triggering the warning and the probe heater.', beta)

f = AF('12_09', 'Pneumatic De-Icer Boots', 760, 340, 'Rubber de-icing boots on a leading edge with span-wise and chord-wise inflatable tubes, shown deflated and inflated',
       'De-icer boots are rubber sheets with inflatable tubes bonded to the leading edges. Ice is allowed to build up to a recommended thickness, then the tubes inflate in sequence, cracking the ice so the airflow removes it. Between cycles vacuum holds the boots flat. Tubes may run span-wise or chord-wise.')
for i, (y, inflated, t) in enumerate(((100, False, 'deflated (vacuum)'), (250, True, 'inflated:'), )):
    f.P(f'M200,{y + 40} Q120,{y} 200,{y - 40} L600,{y - 40} L600,{y + 40} Z', 'ink', 1.6, '#c4d1d6')
    for k in range(4):
        yy = y - 30 + k * 20; f.P(f'M{(170 if inflated else 180) - abs(k - 1.5) * 10},{yy} L560,{yy}', 'hot', 7 if inflated else 3)
    if inflated:
        for k in range(5): f.P(f'M{110 - k * 8},{y - 40 + k * 20} l-14,-6 l4,12 Z', 'cool', 1, 'cool')
    else: f.P(f'M200,{y + 46} Q106,{y} 200,{y - 46}', 'cool', 6)
    f.T(620, y + 4, t, 10.5, 'ink', bold=True)
f.T(620, 268, 'ice cracked off', 10.5, 'ink', bold=True)
f.T(380, 30, 'span-wise tubes', 10.5, 'hot', 'middle', bold=True); f.T(140, 80, 'ice', 10, 'cool', 'end', bold=True)
AFS.append(f)

f = AF('12_10', 'Pneumatic De-Icing System — Schematic', 760, 380, 'Engine-driven pump and vacuum source with a timer and solenoid distributor valves inflating groups of boots on the wings and tail in sequence',
       'An electronic timer operates distributor (solenoid) valves to inflate the boot groups in sequence — e.g. tail then wings — from the pressure source, then switches them back to vacuum to hold them flat. The cycle delay can be set for light or heavy icing.')
N = {}
node(f, N, 'pump', 20, 40, 170, 44, ['Pressure / vacuum', 'source'], 'cool', 9.5)
node(f, N, 'tim', 20, 160, 170, 44, ['Electronic cyclic timer'], 'gold', 9.5)
node(f, N, 'dv', 280, 100, 180, 54, ['Distributor', '(solenoid) valves'], 'gold', 9.5)
for i, t in enumerate(('Group 1: outer wings', 'Group 2: inner wings', 'Group 3: tailplane + fin')): node(f, N, f'g{i}', 540, 40 + i * 90, 200, 44, [t], 'hot', 9.5); conn(f, N, 'dv', f'g{i}', 'hot')
conn(f, N, 'pump', 'dv', 'cool'); conn(f, N, 'tim', 'dv', 'gold')
f.T(20, 280, 'pressure line (red), vacuum holds boots flat between cycles', 10, 'dim')
f.T(20, 300, 'short delay for heavy icing, long delay for light icing', 10, 'dim')
AFS.append(f)

f = AF('12_11', 'Exhaust Heat Exchanger Anti-Icing', 760, 320, 'Outside air heated in a heat exchanger by exhaust gas, the hot air ducted to the leading edges, with a thermostatically controlled flap',
       'On some piston aircraft, outside air is heated by the exhaust in a heat exchanger and ducted to the leading edges. A thermostatically controlled flap or valve regulates the exhaust (or air) flow to keep the temperature within limits.')
f.R(250, 120, 220, 80, c='ink', sw=1.6, fill='g3', rx=6); f.T(360, 166, 'heat exchanger', 10.5, 'ink', 'middle', bold=True)
f.L(80, 140, 248, 140, 'cool', 2.4, me='cool'); f.T(80, 130, 'outside air', 10.5, 'cool', bold=True)
f.L(472, 140, 680, 140, 'mag', 2.4, me='mag'); f.T(680, 130, 'hot air to leading edges', 10.5, 'mag', 'end', bold=True)
f.L(680, 186, 472, 186, 'hot', 2.4, me='hot'); f.T(680, 210, 'exhaust gas', 10.5, 'hot', 'end', bold=True)
f.L(248, 186, 80, 186, 'warm', 2.4, me='warm'); f.T(80, 210, 'overboard', 10, 'warm', bold=True)
f.R(520, 60, 40, 24, c='ink', sw=1.4, fill='gd', rx=3); f.T(540, 50, 'thermostatic flap / valve', 10.5, 'gold', 'middle', bold=True); f.L(540, 84, 540, 140, 'gold', 1.2, dash='3 3')
AFS.append(f)

f = AF('12_12', 'Areas Heated by Hot-Air (Thermal) Anti-Icing', 760, 340, 'Airliner with the wing leading edge slats and engine intakes highlighted as areas heated by bleed air',
       'On jet transports, hot bleed air (thermal anti-icing) heats the wing leading edges (often only the outboard slats) and the engine intake lips; the tail is usually left unprotected. Air is distributed by piccolo tubes and exhausted overboard.')
f.raw('<g transform="translate(380 180) scale(2.4)"><path d="M0,-60 C5,-56 6,-48 6,-40 L6,-8 L58,14 L58,22 L6,10 L5,38 L22,50 L22,56 L0,52 L-22,56 L-22,50 L-5,38 L-6,10 L-58,22 L-58,14 L-6,-8 L-6,-40 C-6,-48 -5,-56 0,-60 Z" fill="#c4d1d6" stroke="#dfeef2" stroke-width="0.6"/></g>')
for sg in (-1, 1): f.L(380 + sg * 60, 180, 380 + sg * 139, 214, 'hot', 6); f.Ci(380 + sg * 70, 200, 10, 'hot', 3, 'none')
f.T(560, 150, 'wing leading edges (slats)', 10.5, 'hot', bold=True); f.T(560, 240, 'engine intake lips', 10.5, 'hot', bold=True)
f.T(380, 330, 'hot bleed air via piccolo tubes, exhausted overboard', 10, 'dim', 'middle')
AFS.append(f)

f = AF('12_13', 'Electrical Heater Mats', 760, 320, 'A propeller spinner and a leading edge with electrical heater mats: continuously heated parting strips and intermittently heated (cyclic) elements',
       'Electrical de-icing uses heater mats of resistance elements between layers of glass cloth or rubber. Parting strips are heated continuously to divide the ice; the areas between are heated intermittently (cyclically) so the ice loosens and is shed by airflow or centrifugal force — saving power.')
f.Ci(170, 170, 100, 'ink', 2, 'steel'); f.Ci(170, 170, 60, 'ink', 1.6, 'g3')
for a in range(0, 360, 60): p, q = pol(170, 170, 62, a), pol(170, 170, 98, a); f.L(p[0], p[1], q[0], q[1], 'hot', 5)
f.T(170, 300, 'spinner / intake', 10.5, 'ink', 'middle', bold=True)
f.P('M420,220 Q380,170 420,120 L680,120 L680,220 Z', 'ink', 1.6, '#c4d1d6')
f.R(430, 162, 250, 16, c='none', sw=0, fill='hot', rx=0); f.R(440, 130, 240, 28, c='none', sw=0, fill='gold', rx=0, op=0.8); f.R(440, 182, 240, 28, c='none', sw=0, fill='gold', rx=0, op=0.8)
f.R(440, 250, 18, 14, c='none', sw=0, fill='hot', rx=0); f.T(466, 262, 'continuously heated (parting strip)', 10, 'ink', bold=True)
f.R(440, 274, 18, 14, c='none', sw=0, fill='gold', rx=0); f.T(466, 286, 'intermittently heated (cyclic)', 10, 'ink', bold=True)
AFS.append(f)

f = AF('12_14', 'Fluid De-Icing System', 760, 320, 'Fluid tank and pump feeding de-icing fluid to porous leading edge panels on the wing and tail and to the propeller slinger rings',
       'A glycol-based fluid is pumped from a tank to porous ("weeping wing") panels or strips in the leading edges and to propeller slinger rings. The fluid lowers the freezing point of water on the surface, preventing ice forming and loosening ice already there.')
N = {}
node(f, N, 'tank', 20, 120, 150, 50, ['Fluid tank'], 'cool', 10)
node(f, N, 'pump', 220, 120, 140, 50, ['Pump + filter'], 'gold', 10)
node(f, N, 'dist', 420, 120, 140, 50, ['Distribution', 'panels'], 'ink', 9.5)
for i, t in enumerate(('Wing porous panels', 'Tail porous panels', 'Propeller slinger rings')): node(f, N, f'u{i}', 600, 30 + i * 100, 150, 44, [t], 'cool', 9.5); conn(f, N, 'dist', f'u{i}', 'cool')
chain(f, N, ['tank', 'pump', 'dist'], 'cool')
f.T(40, 280, 'glycol fluid lowers the freezing point on the surface', 10, 'dim')
AFS.append(f)

f = AF('12_15', 'Windscreen Wipers and Rain Repellent', 760, 320, 'Flight deck windscreens with independent wipers for each pilot and a rain repellent spray, with the overhead wiper selector panel',
       'Each pilot’s windscreen normally has an independent (electric or hydraulic) wiper with OFF / SLOW / FAST selection, so one failure does not affect both. Rain repellent fluid, sprayed on in heavy rain, makes the water bead and blow off; it must not be used on a dry screen.')
f.P('M280,260 L320,80 L560,80 L640,260 Z', 'ink', 2, 'sky'); f.L(460, 80, 460, 260, 'ink', 3)
for x in (370, 550): f.L(x, 250, x - 40, 110, 'ink', 4); f.Ci(x, 250, 6, 'ink', 1.4, 'g3')
f.R(40, 60, 180, 200, c='ink', sw=1.6, fill='g2', rx=6)
for i, t in enumerate(('CAPT WIPER', 'F/O WIPER')): f.Ci(90, 110 + i * 80, 20, 'ink', 1.6, 'black'); f.T(130, 114 + i * 80, t, 9.5, 'ink', bold=True)
f.R(70, 220, 100, 24, c='hot', sw=1.4, fill='black', rx=3); f.T(120, 237, 'RAIN RPLNT', 9.5, 'hot', 'middle', bold=True, check=False)
f.T(460, 300, 'independent wiper for each pilot', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('12_16', 'Windscreen Fluid De-Icing System', 760, 320, 'Fluid tank feeding a pump through a filter and check valve to spray tubes along the base of the windscreen',
       'On some aircraft a methyl-alcohol-based fluid is pumped through a filter and check valves to spray tubes at the base of the windscreen, clearing ice. Most modern aircraft use electrically heated windscreens instead.')
N = {}
node(f, N, 'tank', 20, 60, 140, 50, ['Fluid tank'], 'cool', 10)
node(f, N, 'filt', 20, 180, 140, 44, ['Filter'], 'cool', 10)
node(f, N, 'pump', 220, 180, 130, 44, ['Pump'], 'gold', 10)
node(f, N, 'cv', 400, 180, 150, 44, ['Check valves'], 'gold', 10)
node(f, N, 'spr', 590, 60, 150, 54, ['Spray tubes at', 'windscreen base'], 'ink', 9.5)
chain(f, N, ['tank', 'filt', 'pump', 'cv', 'spr'], 'cool')
AFS.append(f)

f = AF('12_17', 'Windscreen Heating Control', 760, 340, 'Windscreen heating circuit from the AC busbar through a power relay and control switch to an autotransformer and heating film, with a temperature control unit and sensor',
       'AC power is fed through a relay to the conductive film in the windscreen; an autotransformer gives NORMAL or HIGH voltage. Sensors in the windscreen feed the temperature control unit, which switches the power to hold the temperature (and warns of overheat). Heat keeps the vinyl interlayer resilient for bird-strike protection and prevents ice and misting.')
N = {}
node(f, N, 'ac', 20, 30, 150, 40, ['AC busbar'], 'hot', 10)
node(f, N, 'rel', 20, 100, 150, 40, ['Power relay'], 'hot', 10)
node(f, N, 'sw', 20, 170, 150, 40, ['Control switch'], 'hot', 10)
node(f, N, 'at', 20, 260, 150, 50, ['Autotransformer', 'NORMAL / HIGH'], 'hot', 9.5)
node(f, N, 'ws', 260, 120, 250, 70, ['Windscreen heating film', '+ temperature sensors'], 'gold', 9.5)
node(f, N, 'tcu', 580, 120, 160, 64, ['Temperature', 'control unit'], 'cool', 9.5)
node(f, N, 'dc', 580, 260, 160, 44, ['DC busbar'], 'cool', 10)
chain(f, N, ['ac', 'rel', 'sw', 'at'], 'hot'); conn(f, N, 'at', 'ws', 'hot'); conn(f, N, 'ws', 'tcu', 'cool'); conn(f, N, 'dc', 'tcu', 'cool')
f.P('M660,120 L660,90 L95,90 L95,100', 'cool', 1.4, dash='4 3', me='cool'); f.T(380, 84, 'controls the relay', 9.5, 'cool', 'middle')
AFS.append(f)

def oxy(tag, title, aria, cap, draw):
    f = AF(tag, title, 760, 360, aria, cap); draw(f); AFS.append(f)
def cf(f):
    f.R(40, 200, 60, 120, c='ink', sw=1.6, fill='green', rx=20); f.T(70, 340, 'O₂ cylinder'.replace('₂', '2'), 10.5, 'green', 'middle', bold=True)
    line(f, [(70, 200), (70, 160), (700, 160)], 'hot', 3)
    for x, t in ((140, 'shut-off valve'), (260, 'pressure reducer'), (380, 'flow regulator'), (500, 'filter')):
        f.Ci(x, 160, 12, 'ink', 1.6, 'g3'); f.T(x, 136, t, 10, 'ink', 'middle', bold=True)
    gauge(f, 140, 220, 16); f.T(166, 224, 'contents', 10, 'ink', bold=True)
    for k in range(3): x = 580 + k * 50; f.L(x, 160, x, 220, 'cool', 2); f.El(x, 236, 14, 16, 'ink', 1.4, 'g3')
    f.T(630, 290, 'masks: continuous flow', 10.5, 'cool', 'middle', bold=True)
    f.T(380, 330, 'high pressure (red) → low pressure (blue) distribution', 10, 'dim', 'middle')
oxy('13_01', 'Continuous Flow Oxygen System', 'Oxygen cylinder with shut-off valve, pressure reducer, flow regulator and filter feeding masks that receive a continuous flow',
    'A continuous flow system delivers oxygen to the mask all the time it is turned on, regardless of breathing — simple but wasteful. Used for passengers and in light aircraft; the flow may be adjusted for altitude.', cf)
def demand(f):
    f.R(40, 200, 60, 120, c='ink', sw=1.6, fill='green', rx=20)
    line(f, [(70, 200), (70, 120), (300, 120)], 'hot', 3)
    for x, t in ((140, 'cylinder valve'), (220, 'pressure reducer')): f.Ci(x, 120, 12, 'ink', 1.6, 'g3'); f.T(x, 96, t, 10, 'ink', 'middle', bold=True)
    gauge(f, 140, 200, 16); f.T(166, 204, 'high-pressure gauge', 10, 'ink', bold=True)
    f.R(300, 90, 160, 70, c='gold', sw=1.6, fill='g3', rx=6); f.T(380, 120, 'Demand regulator', 10.5, 'gold', 'middle', bold=True); f.T(380, 138, 'N / 100% / EMERGENCY', 9.5, 'ink', 'middle')
    line(f, [(460, 125), (600, 125)], 'cool', 3); f.El(630, 125, 24, 30, 'ink', 1.6, 'g3'); f.T(630, 180, 'crew mask', 10.5, 'ink', 'middle', bold=True)
    f.T(380, 230, 'flow only on inhalation; dilutes with cabin air at low altitude', 10.5, 'ink', 'middle', bold=True)
    f.T(380, 250, '(diluter-demand), 100% oxygen selectable, pressure breathing at high altitude', 10, 'dim', 'middle')
    f.T(70, 340, 'cylinder', 10.5, 'green', 'middle', bold=True)
oxy('13_02', 'Diluter-Demand Oxygen System (Crew)', 'Crew oxygen system: cylinder, pressure reducer and demand regulator supplying oxygen to the mask only on inhalation',
    'Crew systems use diluter-demand regulators: oxygen flows only when the user inhales, mixed with cabin air in a proportion that increases with cabin altitude (N), or 100% when selected. EMERGENCY gives positive pressure. Much more economical than continuous flow.', demand)
def regulator(f):
    f.R(240, 40, 280, 280, c='ink', sw=2, fill='g2', rx=10)
    f.Ci(380, 110, 40, 'ink', 1.6, 'g3'); f.T(380, 166, 'demand diaphragm', 10, 'ink', 'middle', bold=True)
    for i, t in enumerate(('Supply lever  ON / OFF', 'Oxygen selector  NORMAL / 100%', 'Emergency lever  (positive pressure)', 'Flow indicator (blinker)')):
        f.T(260, 190 + i * 30, t, 10.5, 'gold' if i else 'ink', bold=True)
    line(f, [(100, 300), (240, 300)], 'hot', 4); f.T(100, 290, 'oxygen inlet', 10.5, 'hot', bold=True)
    line(f, [(520, 110), (680, 110)], 'cool', 4); f.T(680, 100, 'to mask', 10.5, 'cool', 'end', bold=True)
    f.L(110, 80, 238, 80, 'dim', 2, me='dim'); f.T(110, 70, 'cabin air (dilution)', 10, 'dim', bold=True)
oxy('13_03', 'Diluter-Demand Regulator', 'Demand regulator with supply lever, oxygen selector, emergency lever and flow indicator',
    'The diluter-demand regulator: supply lever (on/off), oxygen selector (NORMAL dilutes with cabin air, 100% gives pure oxygen), emergency lever (continuous positive pressure, e.g. for smoke), and a flow indicator that blinks with each breath.', regulator)
def panel(f):
    f.R(160, 60, 440, 220, c='ink', sw=2, fill='g2', rx=10)
    for i, (t, c_) in enumerate((('SUPPLY  ON', 'green'), ('DILUTER  100%', 'gold'), ('EMERGENCY', 'hot'))):
        x = 220 + i * 140; f.R(x - 30, 120, 60, 30, c=c_, sw=1.6, fill='black', rx=4); f.T(x, 176, t, 10, c_, 'middle', bold=True)
    f.Ci(380, 230, 18, 'ink', 1.6, 'black'); f.T(410, 234, 'flow indicator', 10, 'ink', bold=True); gauge(f, 240, 230, 16); f.T(260, 234, 'pressure', 10, 'ink', bold=True)
    f.T(380, 320, 'crew oxygen regulator panel', 10.5, 'dim', 'middle')
oxy('13_04', 'Crew Oxygen Regulator Panel', 'Panel-mounted crew oxygen regulator with supply, diluter and emergency levers, pressure gauge and flow indicator',
    'The panel-mounted regulator for each crew member: supply ON/OFF, diluter (NORMAL / 100%) and emergency selections, with a pressure gauge and flow indicator. The crew check the system before flight.', panel)
def eros(f):
    f.El(300, 180, 90, 110, 'ink', 2, 'g3'); f.El(300, 200, 50, 60, 'ink', 1.6, 'bg')
    f.R(250, 60, 100, 40, c='hot', sw=1.6, fill='black', rx=6); f.T(300, 85, 'N / 100%', 11, 'hot', 'middle', bold=True, check=False)
    f.P('M210,120 Q140,60 220,40 Q300,30 380,40 Q460,60 390,120', 'cool', 6); f.T(470, 50, 'inflatable harness', 10.5, 'cool', bold=True)
    f.Ci(300, 290, 10, 'hot', 1.6, 'hot'); f.T(320, 320, 'emergency (overpressure) / PRESS TO TEST', 10.5, 'hot', bold=True)
    f.T(470, 180, 'quick-donning: squeeze the red grips,', 10.5, 'ink', bold=True); f.T(470, 196, 'harness inflates; release to fit', 10.5, 'ink', bold=True)
oxy('13_05', 'Quick-Donning Crew Oxygen Mask', 'Quick-donning crew mask with an inflatable harness, a N/100% selector and an emergency pressure / test control',
    'The quick-donning mask can be put on with one hand within 5 seconds: squeezing the grips inflates the harness, which then contracts to hold the mask firmly. A selector gives normal (diluted) or 100% oxygen and an emergency setting gives overpressure, also used with smoke goggles.', eros)

if __name__ == '__main__':
    gallery(AFS, 'Airframes Gallery 4', 'Airframes — Air Conditioning, Pressurisation, Ice Protection & Oxygen', 'Original figures for air conditioning, pressurisation, ice and rain protection and oxygen.', 'af4-gallery.html')
    print(len(AFS), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
