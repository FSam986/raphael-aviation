#!/usr/bin/env python3
"""Powerplant part 5 (chapters 18-27): noise lining, lubrication, thrust, reverse thrust, gearboxes, ignition, APU and starting, fuel systems, bleed air."""
import math
from pp_common import *

PP = []
def chart(x0, y0, x1, y1, xr, yr):
    return (lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)), (lambda v: y1 - (v - yr[0]) / (yr[1] - yr[0]) * (y1 - y0))
def mirror(f, pts, cy, c='ink', sw=1.6):
    for sg in (-1, 1): f.P('M' + ' L'.join(f'{x:.1f},{cy - sg * r:.1f}' for x, r in pts), c, sw)

# 18_08 acoustic lining
f = PF('18_08', 'Acoustic Lining (Noise Suppression)', 760, 340, 'Section through an acoustic lining panel: perforated facesheet over a honeycomb core on a solid backing sheet, and where the panels line the intake and bypass duct',
       'Acoustic linings absorb fan and turbine noise. Sound passes through the perforated facesheet into the honeycomb cells, which act as tuned resonators and dissipate it. Panels line the intake, the fan case and the bypass duct; materials vary from aluminium and composites cool areas to stainless steel near the hot exhaust.')
x0, y0 = 60, 100
f.R(x0, y0, 300, 10, c='ink', sw=1.2, fill='green', rx=0)
for k in range(14): f.Ci(x0 + 12 + k * 21, y0 + 5, 2.4, 'black', 0, 'black')
for k in range(10): f.P(f'M{x0 + k * 30},{y0 + 10} L{x0 + k * 30 + 15},{y0 + 30} L{x0 + k * 30},{y0 + 50} M{x0 + k * 30 + 15},{y0 + 30} L{x0 + k * 30 + 30},{y0 + 30}', 'gd', 1.6)
f.R(x0, y0 + 50, 300, 10, c='ink', sw=1.2, fill='steel', rx=0)
f.T(x0 + 310, y0 + 8, 'Perforated facesheet', 10.5, 'green', bold=True); f.T(x0 + 310, y0 + 34, 'Honeycomb core', 10.5, 'gold', bold=True); f.T(x0 + 310, y0 + 60, 'Solid backing sheet', 10.5, 'ink', bold=True)
for k in range(4): f.L(x0 + 40 + k * 70, y0 - 40, x0 + 50 + k * 70, y0 - 4, 'cool', 1.6, me='cool')
f.T(x0 + 40, y0 - 48, 'sound waves', 10, 'cool', bold=True)
cy = 260
mirror(f, [(80, 60), (300, 62), (480, 56)], cy, 'ink', 2)
mirror(f, [(260, 30), (500, 26), (600, 14)], cy, 'ink', 1.6)
for sg in (-1, 1):
    f.L(90, cy - sg * 56, 240, cy - sg * 58, 'green', 5); f.L(300, cy - sg * 58, 470, cy - sg * 54, 'green', 5)
f.T(165, cy + 4, 'intake lining', 10, 'green', 'middle', bold=True); f.T(390, cy + 4, 'bypass duct lining', 10, 'green', 'middle', bold=True)
f.T(600, 140, 'Facesheet: aluminium, titanium', 9.5, 'dim'); f.T(600, 154, 'or composite; stainless', 9.5, 'dim'); f.T(600, 168, 'steel in hot areas', 9.5, 'dim')
PP.append(f)

# 19_01 schematic oil system
f = PF('19_01', 'Schematic Gas Turbine Oil System', 760, 400, 'Oil tank, pressure pump, filter and relief valve feeding bearing chambers on the rotating shaft, with scavenge pumps returning oil through a chip detector, filter and fuel-cooled oil cooler to the tank',
       'A pressure pump feeds filtered oil to the bearing chambers. Scavenge pumps (of greater capacity than the pressure pump, as the returning oil is aerated) return it through a magnetic chip detector, scavenge filter and the fuel-cooled oil cooler to the tank.')
N = {}
node(f, N, 'tank', 30, 250, 110, 70, ['Oil tank'], 'cool')
node(f, N, 'pp', 30, 140, 110, 50, ['Pressure pump'], 'hot')
node(f, N, 'pf', 180, 70, 130, 40, ['Pressure filter'], 'hot')
node(f, N, 'prv', 180, 140, 130, 50, ['Pressure relief', 'valve (if fitted)'], 'dim', 9.5)
f.R(380, 110, 340, 40, c='ink', sw=1.6, fill='steel', rx=6); f.T(550, 134, 'ROTATING SHAFT — bearing chambers', 10, 'white', 'middle', bold=True, check=False)
for x in (420, 550, 680):
    f.R(x - 20, 96, 40, 68, c='ink', sw=1.4, fill='none', rx=4)
    f.L(x, 70, x, 96, 'hot', 2, me='hot'); f.Ci(x, 210, 12, 'ink', 1.4, 'cool'); f.L(x, 164, x, 198, 'cool', 2, me='cool')
f.P('M310,90 L360,90 L360,70 L680,70', 'hot', 2); f.T(520, 62, 'pressure feed line', 9.5, 'hot', 'middle')
f.T(700, 236, 'scavenge pumps', 9.5, 'cool', 'end')
node(f, N, 'mcd', 560, 280, 160, 40, ['Magnetic chip detector'], 'gold', 9.5)
node(f, N, 'sf', 380, 280, 140, 40, ['Scavenge filter'], 'cool')
node(f, N, 'foc', 190, 280, 150, 50, ['Fuel-cooled', 'oil cooler'], 'cool', 9.5)
f.P('M420,222 L420,250 L680,250 L680,280', 'cool', 2); f.L(550, 222, 550, 250, 'cool', 2)
conn(f, N, 'tank', 'pp', 'hot'); conn(f, N, 'pp', 'pf', 'hot'); conn(f, N, 'pp', 'prv', 'dim', dash='4 3')
conn(f, N, 'mcd', 'sf', 'cool'); conn(f, N, 'sf', 'foc', 'cool'); conn(f, N, 'foc', 'tank', 'cool')
f.Ci(60, 40, 18, 'ink', 1.4, 'black'); f.T(86, 44, 'oil temp', 9.5, 'ink', bold=True); f.Ci(200, 30, 18, 'ink', 1.4, 'black'); f.T(226, 34, 'oil press', 9.5, 'ink', bold=True)
f.L(200, 48, 220, 68, 'dim', 1)
PP.append(f)

# 19_02 pressure relief valve system
f = PF('19_02', 'Pressure Relief Valve Type Oil System', 760, 340, 'Oil system with a relief valve that spills excess pump output back to the inlet to hold a constant feed pressure',
       'The relief valve opens at a set pressure and returns surplus oil to the pump inlet, so feed pressure stays constant once the valve has opened. The flow to the bearings therefore varies with engine speed only up to that point. Centrifugal breathers separate oil from the vented air and de-aerator trays in the tank release entrained air.')
N = {}
node(f, N, 'tank', 30, 140, 140, 60, ['Oil tank', 'de-aerator tray'], 'cool', 10)
node(f, N, 'pump', 220, 140, 130, 60, ['Oil pump pack', '(pressure + scavenge)'], 'hot', 9.5)
node(f, N, 'prv', 220, 40, 130, 50, ['Pressure relief', 'valve'], 'gold')
node(f, N, 'filt', 400, 140, 120, 60, ['Pressure filter'], 'hot')
node(f, N, 'brg', 570, 140, 160, 60, ['Bearings &', 'gearboxes'], 'ink')
node(f, N, 'cool', 400, 250, 120, 50, ['Air-cooled', 'oil cooler'], 'cool', 9.5)
node(f, N, 'br', 570, 40, 160, 50, ['Centrifugal breather', '→ atmosphere'], 'dim', 9.5)
conn(f, N, 'tank', 'pump', 'hot'); conn(f, N, 'pump', 'filt', 'hot'); conn(f, N, 'filt', 'brg', 'hot'); conn(f, N, 'pump', 'prv', 'gold')
f.P('M220,65 L195,65 L195,170 L220,170', 'gold', 1.6, dash='4 3'); f.T(186, 112, 'spill', 9.5, 'gold', 'end')
f.P('M650,200 L650,275 L520,275', 'cool', 1.8, me='cool'); f.P('M400,275 L100,275 L100,200', 'cool', 1.8, me='cool'); f.T(250, 292, 'scavenge (return) oil', 9.5, 'cool', 'middle')
conn(f, N, 'brg', 'br', 'dim', dash='4 3')
f.T(380, 330, 'Feed pressure held constant by the relief valve', 10.5, 'ink', 'middle', bold=True)
PP.append(f)

# 19_03 full flow system
f = PF('19_03', 'Full Flow Type Lubricating System', 760, 340, 'Full flow oil system with no relief valve, all pump output going to the bearings, with a pressure transmitter, low pressure warning switch and filter differential pressure switch',
       'With no relief valve, the whole pump output goes to the bearings, so oil pressure and flow increase with engine speed — this gives the best flow at high power. A pressure transmitter and low-pressure warning switch monitor it; a differential pressure switch warns of a blocked filter (whose bypass then opens).')
N = {}
node(f, N, 'tank', 30, 140, 130, 60, ['Oil tank'], 'cool')
node(f, N, 'pump', 210, 140, 130, 60, ['Oil pump pack'], 'hot')
node(f, N, 'filt', 390, 140, 130, 60, ['Pressure filter', '+ bypass'], 'hot', 10)
node(f, N, 'brg', 570, 140, 160, 60, ['Bearings &', 'gearboxes'], 'ink')
node(f, N, 'dp', 390, 40, 130, 50, ['Oil differential', 'pressure switch'], 'gold', 9.5)
node(f, N, 'tx', 570, 40, 160, 50, ['Pressure transmitter', '+ low-P warning'], 'gold', 9.5)
node(f, N, 'oc', 300, 250, 160, 50, ['Oil coolers'], 'cool')
conn(f, N, 'tank', 'pump', 'hot'); conn(f, N, 'pump', 'filt', 'hot'); conn(f, N, 'filt', 'brg', 'hot'); conn(f, N, 'filt', 'dp', 'gold', dash='4 3'); conn(f, N, 'brg', 'tx', 'gold', dash='4 3')
f.P('M650,200 L650,275 L460,275', 'cool', 1.8, me='cool'); f.P('M300,275 L95,275 L95,200', 'cool', 1.8, me='cool')
f.T(380, 330, 'No relief valve: pressure and flow rise with engine speed', 10.5, 'ink', 'middle', bold=True)
PP.append(f)

# 19_04 oil tank
f = PF('19_04', 'A Typical Oil Tank', 760, 380, 'Oil tank with sight glass and float, filler cap and dipstick, pressurising relief valve, overflow drain, pressure fill fitting, tank drain and oil pump mounting',
       'The tank is lightly pressurised (by the pressurising valve) to help prevent oil foaming and pump cavitation at altitude. Space is left above the oil for expansion and de-aeration. Contents are shown by a sight glass and a quantity transmitter; it can be gravity-filled or pressure-filled.')
f.P('M200,80 L560,80 Q620,80 620,140 L620,300 Q620,330 590,330 L230,330 Q200,330 200,300 Z', 'ink', 2, 'g3')
f.R(204, 160, 412, 166, c='none', sw=0, fill='fluid', rx=0, op=0.7)
f.L(204, 160, 616, 160, 'cool', 1.2, dash='4 3'); f.T(612, 154, 'oil level', 9.5, 'cool', 'end')
f.R(120, 120, 40, 200, c='ink', sw=1.6, fill='g2', rx=18); f.R(132, 160, 16, 150, c='none', sw=0, fill='fluid', rx=6); f.Ci(140, 160, 7, 'ink', 1, 'cool'); f.L(160, 220, 200, 220, 'dim', 1, dash='3 3')
f.T(140, 350, 'Sight glass (float shows level)', 10, 'ink', 'middle', bold=True)
f.R(470, 50, 30, 30, c='ink', sw=1.4, fill='steel', rx=3); f.T(485, 40, 'Filler cap & dipstick', 10, 'ink', 'middle', bold=True)
f.R(300, 60, 24, 20, c='ink', sw=1.4, fill='gd', rx=3); f.T(312, 40, 'Pressurising relief valve', 10, 'gold', 'middle', bold=True)
f.R(240, 66, 20, 14, c='ink', sw=1.2, fill='steel', rx=2); f.T(236, 112, 'Quantity transmitter', 9.5, 'ink', bold=True)
f.L(620, 200, 680, 200, 'ink', 4); f.T(686, 196, 'Overflow', 10, 'ink', bold=True); f.T(686, 210, 'drain', 10, 'ink', bold=True)
f.L(620, 270, 680, 270, 'ink', 4); f.T(686, 266, 'Pressure', 10, 'ink', bold=True); f.T(686, 280, 'fill fitting', 10, 'ink', bold=True)
f.L(400, 330, 400, 360, 'ink', 4); f.T(412, 362, 'Tank drain', 10, 'ink', bold=True)
f.R(260, 290, 90, 30, c='ink', sw=1.4, fill='steel', rx=4); f.T(305, 309, 'oil pump mount', 9.5, 'white', 'middle', bold=True, check=False)
PP.append(f)

# 19_06 fuel-cooled oil cooler
f = PF('19_06', 'Fuel-Cooled Oil Cooler', 760, 340, 'Heat exchanger with fuel flowing through a tube matrix and hot oil flowing around the tubes between baffles',
       'Fuel passes through the tubes and hot oil flows round them, guided back and forth by baffles. The oil is cooled and the fuel is usefully warmed (helping to prevent ice in the fuel filter). A thermostatic valve can bypass oil round the matrix when cold, and a pressure relief valve opens if the matrix becomes blocked.')
f.R(140, 80, 460, 180, c='ink', sw=2, fill='g2', rx=8)
for k in range(8): f.L(150, 100 + k * 20, 590, 100 + k * 20, 'gold', 3)
for k, x in enumerate((240, 340, 440, 540)): f.L(x, 82 if k % 2 == 0 else 120, x, 220 if k % 2 == 0 else 258, 'ink', 3)
f.L(60, 110, 140, 110, 'gold', 3, me='gold'); f.L(600, 240, 690, 240, 'gold', 3, me='gold')
f.T(60, 100, 'Fuel in (cold)', 10.5, 'gold', bold=True); f.T(690, 230, 'Fuel out (warmed)', 10.5, 'gold', 'end', bold=True)
f.L(190, 30, 190, 80, 'hot', 3, me='hot'); f.L(570, 260, 570, 310, 'cool', 3, me='cool')
f.T(200, 40, 'Hot oil in', 10.5, 'hot', bold=True); f.T(580, 306, 'Cooled oil out', 10.5, 'cool', bold=True)
f.P('M210,140 L290,140 L290,160 L390,160', 'hot', 1.4, dash='4 3', me='hot')
f.T(370, 290, 'baffles route the oil back and forth across the fuel tubes', 9.5, 'dim', 'middle')
PP.append(f)

# 19_08 centrifugal breather
f = PF('19_08', 'Centrifugal Breather', 760, 320, 'Air/oil mist from the gearbox entering a rotating breather drum, oil flung outward back to the gearbox and clean air vented to atmosphere',
       'Air leaking into the bearing chambers past the seals must be vented, but it carries oil mist. The rotating breather (impeller or perforated drum, driven from the gearbox) flings the heavier oil droplets outward and back to the gearbox, while the air passes through the centre and out to atmosphere.')
f.R(240, 110, 300, 100, c='ink', sw=2, fill='g3', rx=6)
f.R(260, 130, 260, 60, c='ink', sw=1.4, fill='steel', rx=4)
for k in range(9): f.Ci(276 + k * 29, 160, 4, 'ink', 1, 'bg')
f.R(560, 60, 70, 220, c='ink', sw=1.6, fill='g2', rx=4); f.T(595, 300, 'Gearbox', 10.5, 'ink', 'middle', bold=True)
f.L(540, 160, 560, 160, 'ink', 4)
f.R(120, 40, 60, 140, c='ink', sw=1.6, fill='g2', rx=4); f.L(180, 160, 240, 160, 'ink', 0)
f.P('M240,150 L180,150', 'gold', 2.4, me='gold')
for x in (300, 380, 460): f.P(f'M{x},140 Q{x - 10},120 {x - 30},150', 'gold', 1.6, me='gold')
f.L(150, 60, 150, 20, 'gold', 2.6, me='gold'); f.T(170, 30, 'Air to atmosphere', 10.5, 'gold', bold=True)
for x in (320, 420): f.L(x, 210, x, 240, 'ink', 2, me='ink')
f.P('M300,240 L620,240', 'ink', 2, me='ink'); f.T(420, 262, 'Oil returned to gearbox', 10.5, 'ink', 'middle', bold=True)
f.P('M600,120 Q560,100 540,130', 'hot', 2, me='hot'); f.T(640, 110, 'Air/oil mist in', 10.5, 'hot', bold=True)
f.T(390, 100, 'rotating breather drum', 10, 'ink', 'middle', bold=True)
PP.append(f)

# 20_01 energy conversion
f = PF('20_01', 'Energy Conversion in the Gas Turbine', 760, 260, 'An engine section shaded from potential energy at the front to kinetic energy at the exhaust',
       'The compressor and combustion raise the potential (pressure and heat) energy of the air; the turbine extracts enough to drive the compressor, and the nozzle converts the rest into kinetic energy of the jet. Thrust is the reaction to accelerating that mass of air rearward.')
f.raw('<defs><linearGradient id="ek" x1="0" x2="1"><stop offset="0" stop-color="#5aa6c0"/><stop offset="0.55" stop-color="#d94fa0"/><stop offset="1" stop-color="#e0864e"/></linearGradient></defs>')
f.P('M60,70 L300,82 L420,70 L520,82 L700,96 L700,164 L520,178 L420,190 L300,178 L60,190 Z', 'ink', 1.6, 'url(#ek)')
f.T(230, 136, 'POTENTIAL ENERGY', 14, 'black', 'middle', bold=True); f.T(590, 136, 'KINETIC ENERGY', 14, 'black', 'middle', bold=True)
f.T(60, 220, 'pressure + heat energy added', 10.5, 'ink', bold=True); f.T(700, 220, 'converted to jet velocity', 10.5, 'ink', 'end', bold=True)
f.T(380, 40, 'Thrust = mass flow × change of velocity (+ pressure thrust)', 11, 'gold', 'middle', bold=True)
PP.append(f)

# 20_02 bypass streams
f = PF('20_02', 'Thrust from Cold and Hot Streams', 760, 340, 'Turbofan with a large cold fan stream at lower velocity and a smaller hot core stream at higher velocity',
       'A turbofan produces thrust by giving a large mass of air a modest acceleration. Here the fan moves 1200 lb/s at 800 ft/s and the core 300 lb/s at 1000 ft/s: a bypass ratio of 4:1. Most of the thrust comes from the cold stream, and the lower average jet velocity improves propulsive efficiency and reduces noise.')
cy = 170
mirror(f, [(60, 130), (300, 126), (420, 104)], cy, 'ink', 2.4); mirror(f, [(180, 66), (480, 54), (560, 36)], cy, 'ink', 2)
for sg in (-1, 1): f.L(120, cy - sg * 14, 120, cy - sg * 124, 'cool', 6)
for sg in (-1, 1):
    f.L(160, cy - sg * 100, 640, cy - sg * 96, 'cool', 3, me='cool'); f.L(520, cy - sg * 18, 700, cy - sg * 18, 'hot', 3, me='hot')
f.box(520, 20, 230, 50, ['Fan (cold stream)', '1200 lb/s at 800 ft/s'], c='cool', size=10.5)
f.box(560, 270, 190, 50, ['Core (hot stream)', '300 lb/s at 1000 ft/s'], c='hot', size=10.5)
f.T(250, 330, 'bypass ratio = 1200 ÷ 300 = 4 : 1', 11, 'gold', 'middle', bold=True)
PP.append(f)

# 20_04 thrust v rpm
f = PF('20_04', 'Thrust against Engine Speed', 760, 360, 'Thrust rising steeply with engine rpm, the last ten per cent of rpm giving about thirty per cent of the thrust',
       'Thrust does not vary in proportion to rpm: it rises steeply at the top of the range. The last 10% of rpm produces roughly 30% of the thrust, so small rpm changes near maximum have a large effect.')
x0, y0, x1, y1 = 110, 40, 640, 300
X, Y = chart(x0, y0, x1, y1, (45, 100), (2000, 6500))
axes(f, x0, y0, x1, y1, 'ENGINE SPEED (% rpm)', 'THRUST (lb)')
for v in range(50, 101, 10): f.T(X(v), y1 + 16, f'{v}', 10, 'dim', 'middle'); f.L(X(v), y0, X(v), y1, 'line', 0.6)
for v in range(2000, 6001, 1000): f.T(x0 - 8, Y(v) + 4, str(v), 10, 'dim', 'end'); f.L(x0, Y(v), x1, Y(v), 'line', 0.6)
th = lambda r: 2400 + 3600 * ((r - 47) / 53) ** 2.2
smooth(f, [(X(r), Y(th(r))) for r in range(47, 101, 4)] + [(X(100), Y(th(100)))], 'hot', 3)
f.L(X(90), Y(th(90)), X(100), Y(th(90)), 'gold', 1.2, dash='4 3'); f.L(X(100), Y(th(90)), X(100), Y(6000), 'gold', 1.6)
f.T(X(95), Y(6000) - 10, '10% rpm', 10.5, 'gold', 'middle', bold=True); f.T(X(100) + 10, (Y(th(90)) + Y(6000)) / 2, '≈ 30% thrust', 10.5, 'gold', bold=True)
PP.append(f)

# 20_05 thrust/fuel/sfc vs altitude
f = PF('20_05', 'Effect of Altitude on Thrust, Fuel Flow and SFC', 760, 420, 'Three stacked charts against altitude: net thrust falling, fuel consumption falling and specific fuel consumption falling slightly to the tropopause',
       'With altitude the air density falls, so mass flow, thrust and fuel flow all fall. The colder air improves thermal efficiency, so SFC improves slightly up to the tropopause (about 36,000 ft), then stays roughly constant. Sea level ISA, constant rpm.')
stack(f, 120, 560, 30, 96, 18, (0, 35), [
    ('Net thrust (lb)', (3000, 8000), (4000, 6000, 8000), [(0, 7800), (10, 6600), (20, 5300), (30, 4200), (35, 3600)], 'hot'),
    ('Fuel flow (lb/hr)', (3000, 7000), (3000, 5000, 7000), [(0, 6800), (10, 5800), (20, 4800), (30, 3800), (35, 3200)], 'gold'),
    ('SFC (lb/hr/lb)', (0.80, 0.90), (0.80, 0.85, 0.90), [(0, 0.87), (10, 0.86), (20, 0.85), (30, 0.84), (35, 0.84)], 'cool')],
    'ALTITUDE (thousands of feet)', range(0, 36, 5))
PP.append(f)

# 20_06 flat rating
f = PF('20_06', 'Thrust Lapse with OAT — Flat Rating', 760, 340, 'Net thrust constant (power limited) up to 15 degrees Celsius, then falling (EGT limited) as outside air temperature increases',
       'A flat-rated engine gives constant rated thrust up to a set temperature (here ISA +0, 15°C) by limiting fuel to a power (N1/EPR) limit. Above that, the turbine temperature limit is reached first, so thrust must reduce as OAT rises.')
x0, y0, x1, y1 = 120, 40, 680, 280
axes(f, x0, y0, x1, y1, 'OAT →', 'NET THRUST')
f.L(x0, 80, 420, 80, 'hot', 3); f.L(420, 80, 660, 220, 'hot', 3)
f.L(420, y0, 420, y1, 'dim', 1.2, dash='5 4'); f.T(420, y1 + 18, '15°C', 10.5, 'ink', 'middle', bold=True)
f.T(x0 - 8, 84, '100%', 10.5, 'ink', 'end', bold=True)
f.T(270, 70, 'POWER LIMITED', 10.5, 'hot', 'middle', bold=True); f.T(560, 130, 'EGT LIMITED', 10.5, 'hot', bold=True)
f.T(180, y1 + 18, 'decrease', 10, 'dim', 'middle'); f.T(600, y1 + 18, 'increase', 10, 'dim', 'middle')
PP.append(f)

# 20_07 airspeed
f = PF('20_07', 'Effect of Low Airspeed on Thrust, Fuel Flow and SFC', 760, 420, 'Three stacked charts against airspeed from 0 to 30 knots: net thrust falling, fuel flow rising slightly and SFC rising',
       'As the aircraft accelerates, ram drag (the momentum of the air taken in) increases, so net thrust falls, while ram pressure slightly increases mass flow and fuel flow. SFC (fuel flow per pound of thrust) therefore increases.')
stack(f, 120, 560, 30, 96, 18, (0, 30), [
    ('Net thrust (lb)', (6500, 11000), (6500, 8000, 9500, 11000), [(0, 10600), (10, 9300), (20, 8000), (30, 7000)], 'hot'),
    ('Fuel flow (lb/hr)', (6500, 6700), (6500, 6600, 6700), [(0, 6560), (10, 6600), (20, 6640), (30, 6690)], 'gold'),
    ('SFC (lb/hr/lb)', (0.5, 0.9), (0.5, 0.7, 0.9), [(0, 0.6), (10, 0.7), (20, 0.8), (30, 0.9)], 'cool')],
    'AIRSPEED (knots)', range(0, 31, 5))
PP.append(f)

# 20_08 ram effect
f = PF('20_08', 'Net Thrust and Ram Effect with Forward Speed', 760, 380, 'Thrust against airspeed: thrust excluding ram pressure falling steeply, thrust including the ram pressure rise falling much less',
       'Net thrust = gross thrust − ram drag. If the intake gave no pressure recovery, net thrust would fall steeply with speed. In practice the ram pressure rise increases mass flow and gross thrust, so the net thrust curve falls far less and recovers at high speed.')
x0, y0, x1, y1 = 110, 40, 640, 320
X, Y = chart(x0, y0, x1, y1, (0, 600), (2000, 9000))
axes(f, x0, y0, x1, y1, 'AIRSPEED (knots)', 'THRUST (lb)')
for v in range(0, 601, 100): f.T(X(v), y1 + 16, str(v), 10, 'dim', 'middle'); f.L(X(v), y0, X(v), y1, 'line', 0.6)
for v in range(2000, 9001, 1000): f.T(x0 - 8, Y(v) + 4, str(v), 10, 'dim', 'end'); f.L(x0, Y(v), x1, Y(v), 'line', 0.6)
smooth(f, [(X(0), Y(8800)), (X(150), Y(7600)), (X(300), Y(6700)), (X(450), Y(6200)), (X(600), Y(6100))], 'cool', 3)
smooth(f, [(X(0), Y(8800)), (X(150), Y(7000)), (X(300), Y(5200)), (X(450), Y(3500)), (X(520), Y(2200))], 'hot', 3)
f.T(X(330), Y(7000), 'including ram pressure rise (net thrust)', 10.5, 'cool', bold=True)
f.T(X(30), Y(3400), 'excluding ram pressure rise', 10.5, 'hot', bold=True)
f.T(X(600), y0 - 10, 'sea level ISA', 10, 'dim', 'end')
PP.append(f)

# 20_09 turboprop altitude
f = PF('20_09', 'Turboprop Performance with Altitude', 760, 460, 'Four stacked charts against altitude for a turboprop: shaft horsepower, net jet thrust and fuel flow falling, and SFC falling to about 20,000 ft then rising',
       'Shaft horsepower, residual jet thrust and fuel flow all fall with altitude as density falls. Specific fuel consumption improves with the colder air up to around 20,000 ft and then worsens as the engine moves away from its design point.')
stack(f, 120, 560, 24, 80, 14, (0, 35), [
    ('Shaft horsepower', (2000, 5750), (2000, 3500, 5000), [(0, 5200), (10, 4500), (20, 3700), (30, 2800), (35, 2300)], 'hot'),
    ('Net jet thrust (lb)', (200, 400), (200, 300, 400), [(0, 380), (10, 360), (20, 320), (30, 250), (35, 220)], 'gold'),
    ('Fuel flow (lb/hr)', (1000, 2500), (1000, 1750, 2500), [(0, 2350), (10, 1950), (20, 1600), (30, 1250), (35, 1050)], 'green'),
    ('SFC (lb/hr/shp)', (0.40, 0.46), (0.40, 0.43, 0.46), [(0, 0.452), (10, 0.44), (20, 0.43), (28, 0.437), (35, 0.448)], 'cool')],
    'ALTITUDE (thousands of feet)', range(0, 36, 5))
PP.append(f)

# 21_01 reverse thrust
f = PF('21_01', 'Reverse Thrust Systems', 760, 460, 'Clamshell door, bucket (target) and cold-stream blocker-door thrust reversers shown in forward and reverse positions',
       'Clamshell doors (inside the jet pipe) and bucket or target doors (behind the nozzle) deflect the hot jet forward. On high-bypass engines a translating cowl and blocker doors turn the cold fan stream out through cascade vanes; the core usually stays in forward thrust. The reversed flow is directed outward and forward to avoid re-ingestion.')
rows = (('CLAMSHELL DOORS', 70), ('BUCKET / TARGET', 210), ('COLD STREAM (blocker doors + cascades)', 350))
for name, cy in rows:
    f.T(380, cy - 52, name, 10.5, 'gold', 'middle', bold=True)
    for k, (x0, rev) in enumerate(((60, False), (420, True))):
        f.T(x0 + 140, cy + 60, 'FORWARD THRUST' if not rev else 'REVERSE THRUST', 9.5, 'ink', 'middle', bold=True)
        mirror(f, [(x0, 30), (x0 + 200, 28)], cy, 'ink', 2.4)
        if name.startswith('CLAMSHELL'):
            if rev:
                for sg in (-1, 1): f.L(x0 + 130, cy - sg * 28, x0 + 170, cy, 'hot', 4); f.L(x0 + 130, cy - sg * 26, x0 + 100, cy - sg * 56, 'hot', 2.4, me='hot')
            else:
                f.L(x0 + 20, cy, x0 + 270, cy, 'hot', 2.4, me='hot')
        elif name.startswith('BUCKET'):
            if rev:
                f.P(f'M{x0 + 230},{cy - 36} Q{x0 + 260},{cy} {x0 + 230},{cy + 36}', 'ink', 4)
                for sg in (-1, 1): f.L(x0 + 220, cy - sg * 14, x0 + 180, cy - sg * 54, 'hot', 2.4, me='hot')
            else:
                f.L(x0 + 20, cy, x0 + 270, cy, 'hot', 2.4, me='hot')
        else:
            mirror(f, [(x0, 14), (x0 + 270, 12)], cy, 'dim', 1.4)
            f.L(x0 + 20, cy, x0 + 280, cy, 'hot', 2, me='hot')
            if rev:
                for sg in (-1, 1): f.L(x0 + 150, cy - sg * 14, x0 + 160, cy - sg * 28, 'cool', 3); f.L(x0 + 140, cy - sg * 22, x0 + 100, cy - sg * 52, 'cool', 2.4, me='cool')
                f.T(x0 + 210, cy - 36, 'cascade', 9.5, 'dim')
            else:
                for sg in (-1, 1): f.L(x0 + 20, cy - sg * 21, x0 + 270, cy - sg * 21, 'cool', 2, me='cool')
PP.append(f)

# 22_01 external gearbox
f = PF('22_01', 'External Gearbox and Radial Driveshaft', 760, 340, 'Turbofan section with a radial driveshaft taken from the HP shaft down to an external gearbox mounted under the fan case',
       'Accessories are driven from the HP shaft through an internal gearbox, a radial driveshaft and the external (accessory) gearbox, usually mounted on the fan case or core where it is cooler and accessible. Driving from the HP spool lets the starter turn the HP rotor for starting.')
cy = 150
mirror(f, [(60, 120), (300, 116), (420, 96)], cy, 'ink', 2.4); mirror(f, [(180, 60), (500, 50), (600, 30)], cy, 'ink', 2)
for sg in (-1, 1): f.L(120, cy - sg * 14, 120, cy - sg * 114, 'cool', 6)
f.R(120, cy - 3, 430, 6, c='none', sw=0, fill='cool'); f.R(220, cy - 9, 240, 4, c='none', sw=0, fill='gold'); f.R(220, cy + 5, 240, 4, c='none', sw=0, fill='gold')
f.Ci(240, cy + 10, 8, 'ink', 1.4, 'hot'); f.L(240, cy + 18, 240, 290, 'hot', 4)
f.R(180, 290, 160, 40, c='hot', sw=1.6, fill='g3', rx=6); f.T(260, 315, 'External gearbox', 10.5, 'ink', 'middle', bold=True)
f.T(250, 240, 'Radial driveshaft', 10.5, 'hot', bold=True)
f.T(380, 170, 'HP shaft', 10, 'gold', bold=True); f.T(560, 168, 'LP shaft', 10, 'cool', bold=True)
f.T(500, 300, 'drives fuel & oil pumps, generators,', 10, 'dim'); f.T(500, 314, 'hydraulic pumps; starter drives in', 10, 'dim')
PP.append(f)

# 22_03 two gearboxes
f = PF('22_03', 'Spreading Accessory Load — Two External Gearboxes', 760, 340, 'Engine with a low-speed external gearbox driven from the LP shaft and a high-speed external gearbox driven from the HP shaft',
       'Some engines spread the accessory load between two gearboxes: a low-speed gearbox driven from the LP spool and a high-speed gearbox driven from the HP spool (which also carries the starter).')
cy = 170
mirror(f, [(60, 90), (520, 80), (700, 50)], cy, 'ink', 2.4)
f.R(80, cy - 3, 560, 6, c='none', sw=0, fill='cool'); f.R(220, cy - 9, 260, 4, c='none', sw=0, fill='gold'); f.R(220, cy + 5, 260, 4, c='none', sw=0, fill='gold')
f.L(140, cy - 3, 140, 40, 'cool', 4); f.R(80, 20, 160, 36, c='cool', sw=1.6, fill='g3', rx=6); f.T(160, 43, 'Low-speed gearbox', 10.5, 'ink', 'middle', bold=True)
f.L(280, cy + 9, 280, 290, 'gold', 4); f.R(200, 290, 170, 36, c='gold', sw=1.6, fill='g3', rx=6); f.T(285, 313, 'High-speed gearbox', 10.5, 'ink', 'middle', bold=True)
f.T(150, 110, 'driven by LP shaft', 9.5, 'cool', 'start'); f.T(290, 250, 'driven by HP shaft (+ starter)', 9.5, 'gold')
PP.append(f)

# 23_03 igniter plug
f = PF('23_03', 'Surface Discharge Igniter Plug', 760, 300, 'Section of a surface discharge igniter plug with a central electrode, insulator, semiconductor pellet at the tip and nickel-chromium outer shell',
       'The high-energy ignition unit discharges across the semiconductor pellet at the tip, from the central (hot) electrode to the earthed outer shell. The semiconductor lets the spark form at lower voltage and is not affected by fuel wetting. Typical output 4 to 20 joules.')
f.R(120, 90, 480, 120, c='ink', sw=1.8, fill='steel', rx=6)
f.R(120, 110, 480, 80, c='none', sw=0, fill='warm', rx=0)
f.R(120, 140, 520, 20, c='ink', sw=1.4, fill='hot', rx=2)
f.R(100, 136, 20, 28, c='ink', sw=1.4, fill='gold', rx=2)
for k in range(10): f.R(380 + k * 22, 80, 16, 140, c='ink', sw=1, fill='steel', rx=2)
f.T(110, 70, 'Semiconductor pellet', 10.5, 'gold', bold=True); f.L(110, 76, 110, 134, 'gold', 1)
f.T(250, 60, 'Central (hot) electrode', 10.5, 'hot', bold=True); f.L(300, 66, 300, 138, 'hot', 1)
f.T(250, 250, 'Insulator', 10.5, 'warm', bold=True); f.L(250, 238, 250, 192, 'warm', 1)
f.T(480, 250, 'Nickel-chromium shell (earthed)', 10.5, 'ink', bold=True); f.L(480, 238, 480, 222, 'dim', 1)
f.T(110, 230, 'tip in the flame tube', 9.5, 'dim', 'middle')
PP.append(f)

# 24_01 free turbine APU
f = PF('24_01', 'Free Turbine Turboshaft APU', 760, 320, 'APU gas generator with compressor, combustion and turbine, and a free power turbine driving a gearbox, generator and load compressor',
       'The gas generator (compressor, combustor and its turbine) produces hot gas that drives a separate free power turbine. The power turbine drives the gearbox carrying the AC generator and a load compressor that supplies bleed air for engine starting and air conditioning.')
N = {}
node(f, N, 'in', 20, 130, 100, 50, ['Air intake'], 'cool')
node(f, N, 'c', 160, 130, 110, 50, ['Compressor'], 'cool')
node(f, N, 'cc', 300, 130, 100, 50, ['Combustion'], 'warm')
node(f, N, 't', 430, 130, 110, 50, ['Gas generator', 'turbine'], 'warm', 9.5)
node(f, N, 'pt', 570, 130, 160, 50, ['Free power', 'turbine'], 'hot', 10)
node(f, N, 'gb', 570, 230, 160, 40, ['Gearbox'], 'ink')
node(f, N, 'gen', 360, 240, 160, 40, ['AC generator'], 'gold')
node(f, N, 'lc', 570, 30, 160, 50, ['Load compressor', '→ bleed air'], 'cool', 10)
for a, b, c_ in (('in', 'c', 'cool'), ('c', 'cc', 'cool'), ('cc', 't', 'warm'), ('t', 'pt', 'warm'), ('pt', 'gb', 'ink'), ('gb', 'gen', 'gold')): conn(f, N, a, b, c_)
f.P('M730,250 L748,250 L748,55 L732,55', 'cool', 1.6, me='cool')
f.P('M485,180 L485,205 L215,205 L215,180', 'ink', 1.6, dash='4 3'); f.T(350, 222, 'gas generator shaft', 9.5, 'dim', 'middle')
PP.append(f)

# 24_02 APU panel
f = PF('24_02', 'APU Indications', 760, 380, 'APU panel with rpm and EGT gauges, fault lights for overspeed, low oil pressure, high oil temperature and over temperature, and status lights',
       'Typical APU indications: rpm (%) and EGT gauges; fault lights that also trigger an automatic shutdown (overspeed, low oil pressure, high oil temperature, over-temperature); and status/advisory lights.')
f.R(150, 20, 460, 340, c='ink', sw=2, fill='g2', rx=10)
dial(f, 280, 110, 52, 225, 495, [(0, '0'), (0.5, '60'), (1, '120')], ptr=0.84, minor=6, size=10); f.T(280, 184, '% RPM', 10, 'ink', 'middle', bold=True)
dial(f, 480, 110, 52, 225, 495, [(0, '0'), (0.5, '5'), (1, '10')], ptr=0.48, minor=5, size=10); f.T(480, 184, 'EGT ×100 °C', 10, 'ink', 'middle', bold=True)
for k, t in enumerate(('OVER SPEED', 'LOW OIL P', 'HIGH OIL T', 'OVER TEMP')):
    x = 180 + k * 104; f.R(x, 214, 90, 40, c='ink', sw=1.4, fill='hot', rx=4); f.T(x + 45, 238, t, 9.5, 'white', 'middle', bold=True, check=False)
for k, t in enumerate(('DOOR', 'INLET FLOW', 'LOW OIL QTY', 'FUEL FILTER')):
    x = 180 + k * 104; f.R(x, 280, 90, 40, c='ink', sw=1.4, fill='black', rx=4); f.T(x + 45, 304, t, 9.5, 'amber', 'middle', bold=True, check=False)
f.T(640, 238, 'fault: auto', 9.5, 'hot'); f.T(640, 252, 'shutdown', 9.5, 'hot'); f.T(640, 304, 'status', 9.5, 'amber')
PP.append(f)

# 24_04 air starter
f = PF('24_04', 'An Air Starter Motor', 760, 320, 'Air starter with air inlet, turbine rotor, reduction gear, clutch and output drive to the engine gearbox, and air outlet',
       'Compressed air (from the APU, a ground cart or another engine) spins a small turbine at high speed. A reduction gear increases torque and a clutch drives the engine HP rotor through the gearbox; the clutch overruns and disengages once the engine is self-sustaining.')
N = {}
node(f, N, 'in', 20, 130, 120, 50, ['Air inlet'], 'cool')
node(f, N, 'tr', 180, 130, 120, 50, ['Turbine rotor'], 'cool')
node(f, N, 'rg', 340, 130, 120, 50, ['Reduction gear'], 'gold')
node(f, N, 'cl', 500, 130, 100, 50, ['Clutch'], 'gold')
node(f, N, 'ed', 630, 130, 110, 50, ['Engine drive', '(gearbox)'], 'ink', 10)
node(f, N, 'out', 180, 40, 120, 40, ['Air outlet'], 'dim')
for a, b, c_ in (('in', 'tr', 'cool'), ('tr', 'rg', 'gold'), ('rg', 'cl', 'gold'), ('cl', 'ed', 'gold'), ('tr', 'out', 'dim')): conn(f, N, a, b, c_)
f.T(380, 250, 'Clutch overruns and disengages when the engine is self-sustaining;', 10, 'ink', 'middle', bold=True)
f.T(380, 266, 'starter air valve then closes.', 10, 'ink', 'middle', bold=True)
PP.append(f)

# 24_05 two-engine starter layout
f = PF('24_05', 'Two-Engine Air Starting Layout', 760, 400, 'Air manifold connecting the APU, a ground connector and engine cross-bleed valves to the start air valves and starters of two engines',
       'Start air can come from the APU, a ground start unit or the other running engine (via the cross-bleed valves). Opening the start air valve sends it to the starter; a cockpit light shows the valve open. Manifold pressure is shown in the cockpit.')
N = {}
node(f, N, 'e1', 20, 40, 160, 60, ['Engine 1', 'starter'], 'ink')
node(f, N, 'e2', 580, 40, 160, 60, ['Engine 2', 'starter'], 'ink')
node(f, N, 'sv1', 20, 150, 160, 40, ['Start air valve 1'], 'gold', 9.5)
node(f, N, 'sv2', 580, 150, 160, 40, ['Start air valve 2'], 'gold', 9.5)
node(f, N, 'xb1', 220, 150, 130, 40, ['Cross-bleed 1'], 'cool', 9.5)
node(f, N, 'xb2', 410, 150, 130, 40, ['Cross-bleed 2'], 'cool', 9.5)
node(f, N, 'apu', 290, 240, 180, 40, ['APU (bleed valve)'], 'hot', 9.5)
node(f, N, 'gpu', 290, 320, 180, 40, ['Ground connector'], 'dim', 9.5)
f.L(100, 216, 660, 216, 'cool', 4); f.T(380, 208, 'air manifold', 9.5, 'cool', 'middle')
for a, b, c_ in (('sv1', 'e1', 'gold'), ('sv2', 'e2', 'gold')): conn(f, N, a, b, c_)
for k in ('sv1', 'sv2', 'xb1', 'xb2'):
    x, y, w, h = N[k]; f.L(x + w / 2, y + h, x + w / 2, 216, 'cool', 2)
f.L(380, 216, 380, 240, 'hot', 2); f.L(380, 280, 380, 320, 'dim', 2)
f.T(30, 260, 'Engine bleed via cross-bleed', 9.5, 'dim'); f.T(30, 274, 'valves (cross-start)', 9.5, 'dim')
dial(f, 640, 300, 30, 225, 495, [(0, '0'), (0.5, '40'), (1, '80')], ptr=0.45, minor=4, size=8); f.T(640, 360, 'manifold pressure (psi)', 9.5, 'ink', 'middle', bold=True)
PP.append(f)

# 26_01 engine fuel system
f = PF('26_01', 'Engine Fuel System — Schematic', 760, 360, 'Fuel flow from tank booster pumps through LP shut-off valve, LP pump, fuel-cooled oil cooler, heater and filter to the HP pump, fuel control unit, flowmeter and spray nozzles',
       'Booster pumps feed the engine-driven LP pump, which supplies the fuel-cooled oil cooler, fuel heater and LP filter, preventing ice and cavitation. The HP pump feeds the fuel control unit (FCU), which meters fuel according to throttle position and engine parameters (N1, N2, intake pressure, compressor delivery pressure). The HP shut-off cock stops the engine; the LP valve (fire handle) isolates the engine.')
items = [('Booster', 'pumps', 'cool'), ('LP shut-off', 'fire handle', 'hot'), ('LP pump', '', 'cool'), ('Fuel-cooled', 'oil cooler', 'cool'), ('Fuel', 'heater', 'warm'), ('LP filter', '', 'cool'), ('HP pump', '', 'gold'), ('FCU', '+ HP cock', 'gold'), ('Flow-', 'meter', 'ink'), ('Spray', 'nozzles', 'hot')]
for i, (a, b, c_) in enumerate(items):
    x = 20 + i * 74; f.box(x, 150, 64, 50, [a, b] if b else [a], c=c_, size=9)
    if i: f.L(x - 10, 175, x - 2, 175, 'dim', 1.6, me='dim')
f.T(400, 120, 'low pressure ← | → high pressure', 10, 'ink', 'middle', bold=True); f.L(480, 128, 480, 240, 'line', 1.2, dash='4 3')
for i, t in enumerate(('throttle', 'N1, N2', 'P1 intake', 'P3 compressor')): f.T(560 + 0 * i, 40 + i * 16, t, 9.5, 'gold')
f.L(574, 100, 574, 148, 'gold', 1.4, me='gold'); f.T(560, 26, 'FCU inputs:', 10, 'gold', bold=True)
f.T(380, 260, 'Drains tank collects fuel from the manifold on shutdown', 10, 'dim', 'middle')
PP.append(f)

# 26_02 axial piston pump
f = PF('26_02', 'Axial Piston (Swash Plate) Fuel Pump', 760, 340, 'Rotor carrying plungers bearing on a swash plate whose angle is set by a servo piston, varying pump stroke and delivery',
       'The rotor turns, and each plunger rides on the inclined swash plate, so it reciprocates once per revolution, drawing fuel in and delivering it at high pressure. The servo piston changes the swash plate angle: a greater angle gives a longer stroke and more delivery. The FCU controls the servo pressure.')
f.R(260, 100, 220, 140, c='ink', sw=1.8, fill='g3', rx=8); f.T(370, 262, 'Rotor', 10.5, 'ink', 'middle', bold=True)
for k, y in enumerate((120, 150, 180, 210)):
    ext = 20 + 24 * math.sin(k * 1.2); f.R(260 - ext, y - 7, ext + 120, 14, c='ink', sw=1.2, fill='#a9bac1', rx=3)
f.P('M180,80 L230,80 L200,260 L150,260 Z', 'ink', 1.8, 'steel'); f.T(150, 290, 'Swash plate', 10.5, 'ink', 'middle', bold=True)
f.R(80, 40, 80, 30, c='ink', sw=1.4, fill='mag', rx=4); f.L(160, 55, 200, 80, 'mag', 3); f.T(120, 30, 'Servo piston', 10.5, 'mag', 'middle', bold=True)
f.L(480, 170, 560, 170, 'ink', 6); f.T(570, 174, 'Pump drive', 10.5, 'ink', bold=True)
f.L(600, 110, 490, 110, 'gold', 3, me='gold'); f.T(610, 114, 'Fuel inlet (LP)', 10.5, 'gold', bold=True)
f.L(490, 230, 600, 230, 'hot', 3, me='hot'); f.T(610, 234, 'Delivery (HP)', 10.5, 'hot', bold=True)
f.T(380, 320, 'Greater swash plate angle → longer plunger stroke → more fuel', 10.5, 'ink', 'middle', bold=True)
PP.append(f)

# 26_03 hydromechanical FCU
f = PF('26_03', 'Hydro-Mechanical Fuel Control', 760, 380, 'Block diagram of a hydro-mechanical fuel control: pump, rpm governor, throttle valve, barometric pressure control, servo, HP cock and back-pressure valve',
       'The pump delivery is controlled by the servo piston. The rpm governor and the throttle set the fuel flow for the selected rpm; the barometric pressure control (BPC) reduces fuel as intake pressure falls with altitude or speed changes so that the rpm for a given throttle setting is maintained. Excess fuel is spilled back; the HP cock shuts off fuel to the burners.')
N = {}
node(f, N, 'filt', 20, 290, 130, 50, ['Main filter'], 'cool')
node(f, N, 'pump', 20, 160, 130, 60, ['Pump + servo', 'piston'], 'gold')
node(f, N, 'gov', 210, 60, 160, 50, ['RPM governor'], 'ink')
node(f, N, 'thr', 210, 160, 160, 50, ['Throttle valve'], 'gold')
node(f, N, 'bpc', 430, 60, 140, 50, ['BPC', 'senses intake P'], 'cool', 10)
node(f, N, 'cock', 430, 160, 140, 50, ['HP cock'], 'hot')
node(f, N, 'bpv', 430, 270, 140, 50, ['Back-pressure', 'valve'], 'dim', 10)
node(f, N, 'burn', 620, 160, 120, 50, ['Burners'], 'hot')
for a, b, c_ in (('filt', 'pump', 'cool'), ('pump', 'thr', 'hot'), ('thr', 'cock', 'hot'), ('cock', 'burn', 'hot'), ('gov', 'pump', 'gold'), ('bpc', 'pump', 'cool'), ('thr', 'bpv', 'dim')): conn(f, N, a, b, c_, dash='4 3' if c_ in ('gold', 'cool') else None)
f.T(140, 50, 'servo signals', 9.5, 'dim', 'middle')
PP.append(f)

# 26_04 supervisory EEC
f = PF('26_04', 'Supervisory Engine Electronic Control', 760, 360, 'Throttle mechanically linked to a hydro-mechanical control which is trimmed by a supervisory EEC using Mach number, inlet temperature, inlet pressure and EPR',
       'The throttle still moves the hydro-mechanical fuel control directly. The supervisory EEC uses throttle lever angle, Mach number, inlet temperature and pressure and EPR to trim fuel flow and hold the thrust set constant regardless of temperature or pressure change. If the EEC fails, the hydro-mechanical unit continues to control the engine.')
N = {}
node(f, N, 'tla', 20, 40, 170, 50, ['Throttle lever angle'], 'gold')
node(f, N, 'hmu', 20, 230, 170, 60, ['Hydro-mechanical', 'fuel control'], 'ink')
node(f, N, 'eec', 290, 130, 180, 70, ['Supervisory EEC', 'trims fuel flow'], 'gold')
node(f, N, 'eng', 560, 230, 180, 60, ['Engine'], 'hot')
node(f, N, 'adc', 560, 40, 180, 50, ['Mach no. (ADC)'], 'cool')
conn(f, N, 'tla', 'hmu', 'ink', label='mechanical linkage', lc='dim'); conn(f, N, 'tla', 'eec', 'gold'); conn(f, N, 'adc', 'eec', 'cool'); conn(f, N, 'eec', 'hmu', 'gold', label='trim', lc='gold'); conn(f, N, 'hmu', 'eng', 'hot')
conn(f, N, 'eng', 'eec', 'cool', dash='4 3', label='T1, P1, EPR', lc='cool')
f.T(380, 330, 'EEC failure: hydro-mechanical control carries on', 10.5, 'ink', 'middle', bold=True)
PP.append(f)

# 26_05 FADEC
f = PF('26_05', 'FADEC — Full Authority Digital Engine Control', 760, 380, 'A dual-channel FADEC receiving throttle angle, air data, FMS and engine sensor inputs and commanding fuel metering, bleed valves and variable stators',
       'FADEC has full authority over the engine: there is no mechanical back-up. It takes throttle lever angle, air data (Mach, altitude, ambient and inlet temperature) and FMS data, plus engine sensors (N1, N2, pressures, temperatures, oil temperature), and commands fuel metering, compressor bleeds, variable stator vanes and turbine clearance control. Two independent channels give redundancy.')
for k, t in enumerate(('Throttle lever angle', 'Mach no.', 'Altitude', 'Ambient temp', 'Inlet temp', 'Air density', 'FMS')):
    y = 30 + k * 44; f.box(20, y, 160, 32, [t], c='cool', size=9.5); f.L(180, y + 16, 270, 190, 'cool', 1.2)
f.R(270, 130, 200, 120, c='gold', sw=2, fill='g3', rx=8); f.T(370, 180, 'FADEC', 14, 'gold', 'middle', bold=True); f.T(370, 200, 'channel A + channel B', 10, 'ink', 'middle')
for k, t in enumerate(('N1, N2', 'P and T sensors', 'Oil temp')): y = 60 + k * 44; f.box(560, y, 180, 32, [t], c='hot', size=9.5); f.L(560, y + 16, 470, 160, 'hot', 1.2)
for k, t in enumerate(('Fuel metering valve', 'Bleed valves, VSVs', 'Clearance control')): y = 230 + k * 44; f.box(560, y, 180, 32, [t], c='gold', size=9.5); f.L(470, 220, 560, y + 16, 'gold', 1.2, me='gold')
f.T(370, 360, 'no mechanical back-up: full authority', 10.5, 'ink', 'middle', bold=True)
PP.append(f)

# 27_01 bleed air system
f = PF('27_01', 'Bleed Air System', 760, 420, 'Engine bleed air from LP and HP compressor stages through valves and pre-coolers to a manifold supplying air conditioning packs, wing anti-ice, engine start and pressurisation, with APU and ground connections',
       'Air is bled from a low-pressure stage, or from a high-pressure stage (via the HP valve) at low engine power. It passes through the pressure-regulating valve and the pre-cooler into the bleed manifold, which supplies the air-conditioning packs, wing and engine anti-ice, engine starting and hydraulic reservoir pressurisation. An isolation valve divides left and right; the APU and a ground connector can supply the manifold.')
N = {}
for side, x in (('L', 30), ('R', 590)):
    node(f, N, 'lp' + side, x, 330, 140, 40, ['LP stage bleed'], 'cool', 9.5)
    node(f, N, 'hp' + side, x, 270, 140, 40, ['HP valve (low power)'], 'hot', 9.5)
    node(f, N, 'prv' + side, x, 200, 140, 40, ['Pressure reg. valve'], 'gold', 9.5)
    node(f, N, 'pc' + side, x, 130, 140, 40, ['Pre-cooler'], 'cool', 9.5)
    conn(f, N, 'lp' + side, 'hp' + side, 'cool'); conn(f, N, 'hp' + side, 'prv' + side, 'hot'); conn(f, N, 'prv' + side, 'pc' + side, 'gold')
f.L(100, 110, 660, 110, 'hot', 4); f.L(100, 130, 100, 110, 'hot', 3); f.L(660, 130, 660, 110, 'hot', 3)
f.T(220, 102, 'bleed air manifold', 10, 'hot', 'middle', bold=True)
f.R(368, 100, 24, 20, c='ink', sw=1.4, fill='gd', rx=3); f.T(380, 140, 'isolation valve', 9.5, 'gold', 'middle')
node(f, N, 'pk', 220, 20, 140, 50, ['Air-con packs'], 'cool', 10)
node(f, N, 'wai', 400, 20, 140, 50, ['Wing anti-ice'], 'cool', 10)
f.L(290, 110, 290, 72, 'hot', 2, me='hot'); f.L(470, 110, 470, 72, 'hot', 2, me='hot')
node(f, N, 'apu', 250, 220, 120, 40, ['APU bleed'], 'hot', 9.5); node(f, N, 'gc', 400, 220, 120, 40, ['Ground connector'], 'dim', 9.5)
f.L(310, 220, 310, 114, 'hot', 2, me='hot'); f.L(460, 220, 460, 114, 'dim', 2, me='dim')
f.T(380, 300, 'Also supplies engine start,', 10, 'dim', 'middle'); f.T(380, 314, 'hydraulic reservoir pressurisation', 10, 'dim', 'middle')
PP.append(f)

# 27_02 NGV cooling
f = PF('27_02', 'Nozzle Guide Vane and Blade Cooling', 760, 360, 'Three cooled aerofoils: single-pass internal cooling, single-pass multi-feed with film cooling, and multi-pass multi-feed with extensive film cooling',
       'Cooling air from the HP compressor flows through internal passages in the vanes and blades. Later designs added film cooling — air bled through rows of small holes forms a cool film over the surface — and multi-pass passages, allowing turbine entry temperatures far above the melting point of the metal.')
for k, (x, name, sub, holes, passes) in enumerate(((130, 'Single pass,', 'internal cooling', 0, 1), (380, 'Single pass, multi-feed,', 'film cooling', 3, 2), (630, 'Multi-pass, multi-feed,', 'extensive film cooling', 6, 5))):
    f.P(f'M{x - 40},60 Q{x + 50},60 {x + 44},180 Q{x + 40},260 {x + 10},260 L{x - 30},260 Q{x - 50},160 {x - 40},60 Z', 'ink', 1.8, '#a9bac1')
    for p in range(passes):
        px = x - 26 + p * (60 / max(passes, 1)) + 8; f.L(px, 250, px, 76, 'cool', 2)
    for h in range(holes):
        for r in range(5): f.Ci(x - 20 + h * 10, 90 + r * 32, 2, 'black', 0, 'black')
    f.L(x - 10, 300, x - 10, 266, 'cool', 2.4, me='cool'); f.L(x + 30, 50, x + 50, 24, 'hot', 2, me='hot')
    f.T(x, 316, name, 10, 'ink', 'middle', bold=True); f.T(x, 330, sub, 10, 'ink', 'middle', bold=True)
f.T(40, 290, 'cooling air in', 9.5, 'cool')
PP.append(f)

# 27_03 turbine cooling & sealing
f = PF('27_03', 'Cooling and Sealing in the Turbine', 760, 340, 'Turbine section with high-pressure air flowing to the nozzle guide vanes and blades and through interstage seals, and low-pressure air vented overboard',
       'HP compressor air is ducted inward of the combustion chamber to cool the NGVs, turbine discs and blades, and to pressurise the interstage seals so that hot gas cannot leak inward. Lower-pressure air cools the rear stages and is vented overboard.')
f.R(60, 60, 640, 60, c='ink', sw=1.6, fill='warm', rx=0, op=0.55); f.T(380, 52, 'hot gas path', 10, 'warm', 'middle', bold=True)
for x, t in ((200, 'NGV'), (280, 'HP blade'), (400, 'NGV'), (480, 'LP blade')): f.R(x - 10, 64, 20, 52, c='ink', sw=1.2, fill='cool' if t == 'NGV' else '#a9bac1', rx=3); f.T(x, 140, t, 9.5, 'ink', 'middle', bold=True)
for x in (280, 480): f.R(x - 30, 150, 60, 110, c='ink', sw=1.4, fill='steel', rx=6)
f.L(60, 290, 640, 290, 'ink', 6)
for x in (240, 440):
    for k in range(4): f.L(x - 8 + k * 6, 260, x - 8 + k * 6, 276, 'gold', 2)
f.T(340, 312, 'interstage seals', 10, 'gold', 'middle', bold=True); f.L(300, 304, 244, 278, 'gold', 1)
f.P('M60,200 L180,200 L200,120', 'hot', 2.2, me='hot'); f.P('M180,200 L260,200 L280,150', 'hot', 2, me='hot'); f.P('M260,200 L380,200 L400,120', 'hot', 2, me='hot')
f.T(60, 190, 'HP cooling air', 10, 'hot', bold=True)
f.P('M520,200 L720,200 L720,150', 'cool', 2, me='cool'); f.T(560, 190, 'LP air overboard', 10, 'cool', bold=True)
PP.append(f)

# 27_04 seals
f = PF('27_04', 'Interstage and Intershaft Seals', 760, 320, 'A labyrinth air seal with rotating fins close to a static land and sealing air, and a hydraulic seal using an oil-filled rotating annulus',
       'Labyrinth seal: rows of fins on the rotor run very close to a static land; the pressure drops across each restriction, so leakage is small, and sealing air flows inward to block oil or hot gas. Hydraulic seal: a rotating oil-filled annulus forms a liquid seal between two shafts rotating at different speeds.')
f.R(40, 90, 300, 20, c='ink', sw=1.6, fill='steel', rx=0); f.T(190, 80, 'static land', 10, 'ink', 'middle', bold=True)
f.R(40, 150, 300, 30, c='ink', sw=1.6, fill='#a9bac1', rx=0); f.T(190, 200, 'rotor', 10, 'ink', 'middle', bold=True)
for k in range(8): x = 60 + k * 36; f.P(f'M{x},150 L{x + 6},114 L{x + 12},150 Z', 'ink', 1.2, '#a9bac1')
f.P('M60,132 Q78,124 96,132 Q114,140 132,132 Q150,124 168,132 Q186,140 204,132 Q222,124 240,132 Q258,140 276,132 Q294,124 312,132', 'hot', 1.6, me='hot')
f.T(190, 232, 'INTERSTAGE (LABYRINTH) AIR SEAL', 10.5, 'gold', 'middle', bold=True); f.T(190, 250, 'sealing air leaks across each fin', 10, 'dim', 'middle')
f.R(440, 80, 280, 30, c='ink', sw=1.6, fill='steel', rx=4); f.R(440, 160, 280, 30, c='ink', sw=1.6, fill='#a9bac1', rx=4)
f.P('M520,110 L520,150 L640,150 L640,110', 'ink', 2); f.R(522, 128, 116, 20, c='none', sw=0, fill='gold', rx=2)
f.R(570, 110, 20, 30, c='ink', sw=1.4, fill='steel', rx=2)
f.T(580, 232, 'INTERSHAFT HYDRAULIC SEAL', 10.5, 'gold', 'middle', bold=True); f.T(580, 250, 'oil held in a rotating annulus', 10, 'dim', 'middle')
f.T(580, 70, 'outer shaft', 10, 'ink', 'middle', bold=True); f.T(580, 210, 'inner shaft', 10, 'ink', 'middle', bold=True)
PP.append(f)

if __name__ == '__main__':
    gallery(PP, 'Powerplant Gallery 5', 'Powerplant — Gas Turbine Systems & Performance', 'Original figures for lubrication, thrust, reverse thrust, gearboxes, ignition, APU and starting, fuel control and bleed air.', 'pp5-gallery.html')
    print(len(PP), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
