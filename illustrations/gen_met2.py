#!/usr/bin/env python3
"""Meteorology extra figures (A.8). Southern Hemisphere conventions where relevant."""
import math
from af_common import *

MT = []
def M(tag, title, W, H, aria, cap): return Fig('mx_' + tag, title, W, H, aria, cap)
def chart(x0, y0, x1, y1, xr, yr):
    return (lambda v: x0 + (v - xr[0]) / (xr[1] - xr[0]) * (x1 - x0)), (lambda v: y1 - (v - yr[0]) / (yr[1] - yr[0]) * (y1 - y0))

f = M('layers', 'Layers of the Atmosphere', 760, 380, 'Atmosphere layers from the troposphere to the thermosphere with the tropopause higher over the equator than over the poles',
      'The troposphere contains nearly all the weather; temperature falls with height (ISA 1.98°C per 1000 ft). Its top, the tropopause, is about 16–18 km over the equator and about 8–9 km over the poles (ISA 11 km / 36 090 ft). Above, in the stratosphere, temperature is constant then rises (ozone).')
for y0, y1, t, c_ in ((300, 210, 'TROPOSPHERE — weather, temperature falls', 'cool'), (210, 120, 'STRATOSPHERE — isothermal, then warming (ozone)', 'gold'), (120, 60, 'MESOSPHERE', 'dim'), (60, 20, 'THERMOSPHERE', 'hot')):
    f.R(60, y1, 640, y0 - y1, c='none', sw=0, fill=c_, rx=0, op=0.12); f.T(380, (y0 + y1) / 2 + 4 - (24 if c_ == 'gold' else 0), t, 11, c_, 'middle', bold=True)
f.P('M60,260 Q380,190 700,260', 'hot', 2.6); f.T(70, 280, 'pole ≈ 8–9 km', 10, 'hot', bold=True); f.T(380, 204, 'equator ≈ 16–18 km', 10, 'hot', 'middle', bold=True); f.T(690, 280, 'pole', 10, 'hot', 'end', bold=True)
f.T(600, 236, 'tropopause', 10.5, 'hot', bold=True)
f.L(60, 300, 700, 300, 'gnd', 3); f.T(380, 330, 'ISA tropopause 11 km (36 090 ft), −56.5°C', 10.5, 'ink', 'middle', bold=True)
MT.append(f)

f = M('isobars', 'Pressure Systems on a Synoptic Chart', 760, 360, 'Isobars showing a high, a low, a ridge of high pressure, a trough of low pressure and a col between two highs and two lows',
      'Closed isobars form highs (anticyclones) and lows (depressions); a ridge is an extension of high pressure and a trough an extension of low pressure; a col is the area between two highs and two lows. Close isobars mean a steep pressure gradient and strong wind.')
for k in range(4): f.El(160, 140, 30 + k * 26, 24 + k * 20, 'cool', 1.4)
f.T(160, 145, 'H', 18, 'cool', 'middle', bold=True)
for k in range(4): f.El(560, 140, 30 + k * 26, 24 + k * 20, 'hot', 1.4)
f.T(560, 145, 'L', 18, 'hot', 'middle', bold=True)
f.P('M90,300 Q160,190 230,300', 'cool', 1.4); f.P('M60,320 Q160,160 260,320', 'cool', 1.4); f.T(160, 340, 'ridge', 10.5, 'cool', 'middle', bold=True)
f.P('M490,300 Q560,200 630,300', 'hot', 1.4); f.P('M470,320 Q560,180 650,320', 'hot', 1.4); f.T(560, 340, 'trough', 10.5, 'hot', 'middle', bold=True)
f.T(360, 220, 'COL', 12, 'gold', 'middle', bold=True); f.T(360, 240, 'between two highs and two lows', 9.5, 'dim', 'middle')
MT.append(f)

f = M('bb', 'Geostrophic Wind and Buys Ballot’s Law (Southern Hemisphere)', 760, 360, 'Straight isobars with the pressure gradient force towards low pressure balanced by Coriolis force, giving a geostrophic wind parallel to the isobars with low pressure on the right',
      'Air starts to move from high to low pressure; Coriolis force (to the LEFT of the motion in the Southern Hemisphere) turns it until the two forces balance and the wind blows parallel to the isobars — the geostrophic wind. Buys Ballot (SH): stand with your back to the wind and LOW pressure is on your RIGHT. Winds blow clockwise round a low and anticlockwise round a high in the SH.')
for y, p in ((80, '1012 hPa'), (180, '1016'), (280, '1020 hPa')): f.L(80, y, 680, y, 'ink', 1.6); f.T(690, y + 4, p, 10, 'dim')
f.T(80, 66, 'LOW', 11, 'hot', bold=True); f.T(80, 304, 'HIGH', 11, 'cool', bold=True)
f.L(380, 180, 690 - 310, 110, 'hot', 2.6, me='hot'); f.T(392, 120, 'pressure gradient force', 10.5, 'hot', bold=True)
f.L(380, 180, 380, 250, 'cool', 2.6, me='cool'); f.T(392, 246, 'Coriolis (left of motion, SH)', 10.5, 'cool', bold=True)
f.L(200, 180, 360, 180, 'gold', 3.4, me='gold'); f.T(240, 170, 'geostrophic wind', 10.5, 'gold', bold=True)
f.T(380, 340, 'SH: back to the wind, low pressure on the right', 11, 'gold', 'middle', bold=True)
MT.append(f)

f = M('friction', 'Surface Friction — Surface Wind Veers and Slows (SH)', 760, 320, 'Wind at 2000 ft parallel to the isobars and the surface wind slower and turned across the isobars towards low pressure',
      'Friction slows the wind near the surface, reducing Coriolis force, so the pressure gradient turns the wind across the isobars towards low pressure. In the Southern Hemisphere the surface wind is therefore VEERED (and in the NH backed) from the 2000 ft wind by about 30° over land (10° over sea) and roughly half to two-thirds the speed.')
for y in (80, 240): f.L(80, y, 680, y, 'ink', 1.4)
f.T(80, 66, 'low pressure', 10.5, 'hot', bold=True); f.T(80, 264, 'high pressure', 10.5, 'cool', bold=True)
f.L(200, 160, 560, 160, 'gold', 3, me='gold'); f.T(380, 150, '2000 ft wind (geostrophic)', 10.5, 'gold', 'middle', bold=True)
f.L(250, 200, 420, 130, 'hot', 2.6, me='hot'); f.T(430, 128, 'surface wind: slower, turned towards the low', 10.5, 'hot', bold=True)
f.T(380, 300, '≈ 30° over land, 10° over sea', 10.5, 'dim', 'middle')
MT.append(f)

f = M('breeze', 'Sea Breeze and Land Breeze', 760, 340, 'By day air rises over the warm land and the sea breeze blows onshore at low level; by night the land cools and the land breeze blows offshore',
      'By day the land heats faster than the sea; air rises over the land and a sea breeze (typically 10–15 kt, up to about 1000–2000 ft deep) blows onshore, with a return flow aloft. At night the land cools faster and a weaker land breeze blows offshore.')
for i, (y0, t, on) in enumerate(((40, 'DAY — SEA BREEZE', True), (190, 'NIGHT — LAND BREEZE', False))):
    f.T(380, y0, t, 11, 'gold', 'middle', bold=True); yb = y0 + 110
    f.R(60, yb, 300, 20, c='none', sw=0, fill='fluid', rx=0); f.R(360, yb - 10, 340, 30, c='none', sw=0, fill='gnd', rx=0)
    f.T(210, yb + 14, 'sea', 10, 'white', 'middle', bold=True, check=False); f.T(530, yb + 10, 'land', 10, 'white', 'middle', bold=True, check=False)
    if on: f.L(200, yb - 14, 470, yb - 18, 'cool', 2.6, me='cool'); f.L(520, yb - 30, 520, y0 + 20, 'hot', 2, me='hot'); f.L(500, y0 + 24, 220, y0 + 28, 'dim', 1.6, me='dim')
    else: f.L(470, yb - 18, 200, yb - 14, 'cool', 2.6, me='cool'); f.L(200, y0 + 50, 470, y0 + 46, 'dim', 1.6, me='dim')
MT.append(f)

f = M('katabatic', 'Katabatic and Anabatic Winds', 760, 320, 'A valley slope with cold air draining downhill at night (katabatic) and warm air flowing upslope by day (anabatic)',
      'At night, air in contact with a cooling slope becomes dense and drains downhill — a katabatic wind, which can be strong in mountain valleys and causes frost and fog in hollows. By day, heated slopes produce a weaker upslope anabatic wind.')
for x0, t, down in ((40, 'NIGHT — KATABATIC (downslope)', True), (400, 'DAY — ANABATIC (upslope)', False)):
    f.P(f'M{x0},280 L{x0 + 140},120 L{x0 + 320},280 Z', 'none', 0, 'gnd', op=0.8); f.T(x0 + 160, 50, t, 10.5, 'gold', 'middle', bold=True)
    for k in range(3):
        a = (x0 + 30 + k * 30, 250 - k * 36); b = (a[0] + 26, a[1] - 30)
        f.L(*(b if down else a), *(a if down else b), 'cool' if down else 'hot', 2.4, me='cool' if down else 'hot')
MT.append(f)

f = M('lapse', 'Lapse Rates and Stability', 760, 390, 'Temperature against height with the dry adiabatic lapse rate, saturated adiabatic lapse rate and three environmental lapse rates showing absolute stability, conditional instability and absolute instability',
      'DALR ≈ 3°C/1000 ft; SALR ≈ 1.5°C/1000 ft (varies); ISA ELR 1.98°C/1000 ft. If the ELR is less than the SALR the air is absolutely stable; between SALR and DALR it is conditionally unstable (unstable only if saturated); greater than the DALR it is absolutely unstable.')
x0, y0, x1, y1 = 100, 40, 700, 320
axes(f, x0, y0, x1, y1, 'TEMPERATURE →', 'HEIGHT')
base = (560, y1)
for rate, t, c_, d in ((3, 'DALR 3°C/1000 ft', 'hot', None), (1.5, 'SALR ≈ 1.5°C/1000 ft', 'cool', None)):
    f.L(*base, base[0] - rate * 80, y0 + 20, c_, 2.6); f.T(base[0] - rate * 80 - 6, y0 + 16, t, 10.5, c_, 'end' if rate > 2 else 'start', bold=True)
f.L(*base, base[0] - 0.8 * 80, y0 + 20, 'green', 2, dash='6 4'); f.T(base[0] - 50, y0 + 60, 'ELR < SALR: stable', 10, 'green', bold=True)
f.L(*base, base[0] - 4 * 70, y0 + 60, 'gold', 2, dash='6 4'); f.T(150, 110, 'ELR > DALR: absolutely unstable', 10, 'gold', bold=True)
f.T(380, 378, 'ELR between SALR and DALR: conditionally unstable', 10.5, 'ink', 'middle', bold=True)
MT.append(f)

f = M('lifting', 'How Air Is Lifted to Form Cloud', 760, 320, 'Four panels: convection over heated ground, orographic lifting over a mountain, frontal lifting of warm air over cold, and convergence',
      'Cloud forms when air is cooled to its dew point, almost always by being lifted and cooling adiabatically. Lifting is by convection (thermals over heated ground), orography (forced over high ground), fronts (warm air lifted over cold) and convergence (air flowing together and rising, e.g. in a low or the ITCZ).')
for i, t in enumerate(('CONVECTION', 'OROGRAPHIC', 'FRONTAL', 'CONVERGENCE')):
    x = 30 + i * 180; f.T(x + 80, 40, t, 10.5, 'gold', 'middle', bold=True); f.L(x, 260, x + 160, 260, 'gnd', 3)
    if i == 0: f.L(x + 80, 250, x + 80, 140, 'hot', 2.4, me='hot'); cloud(f, x + 80, 110, 70, 36)
    if i == 1: f.P(f'M{x},260 L{x + 90},150 L{x + 160},260 Z', 'none', 0, 'gnd', op=0.8); f.L(x + 10, 240, x + 80, 150, 'cool', 2.4, me='cool'); cloud(f, x + 90, 120, 70, 30)
    if i == 2: f.P(f'M{x},260 L{x + 160},200', 'cool', 2); f.L(x + 40, 230, x + 140, 150, 'hot', 2.4, me='hot'); cloud(f, x + 120, 120, 70, 30)
    if i == 3: f.L(x + 10, 240, x + 70, 240, 'cool', 2.4, me='cool'); f.L(x + 150, 240, x + 90, 240, 'cool', 2.4, me='cool'); f.L(x + 80, 230, x + 80, 150, 'hot', 2.4, me='hot'); cloud(f, x + 80, 120, 70, 30)
MT.append(f)

f = M('cbstages', 'Thunderstorm Life Cycle', 760, 380, 'Three stages of a thunderstorm cell: cumulus with updraughts, mature with updraughts and downdraughts and precipitation, and dissipating with downdraughts',
      'Cumulus stage: updraughts throughout, the cloud builds rapidly. Mature stage: begins when precipitation falls from the base; strong updraughts and downdraughts side by side, lightning, hail, severe turbulence, gust front and microbursts — the most dangerous stage. Dissipating stage: downdraughts dominate and the cloud decays. Each cell lasts roughly 1–2 hours in total.')
for i, (t, h) in enumerate((('CUMULUS', 150), ('MATURE', 230), ('DISSIPATING', 200))):
    cx = 130 + i * 250
    tower(f, cx, 320, 320 - h, 100, anvil=(i > 0) * 80)
    if i == 0:
        for dx in (-25, 25): f.L(cx + dx, 300, cx + dx, 200, 'hot', 2.4, me='hot')
    if i == 1: f.L(cx - 25, 300, cx - 25, 140, 'hot', 2.4, me='hot'); f.L(cx + 25, 140, cx + 25, 300, 'cool', 2.4, me='cool'); rain(f, cx, cx + 50, 320, 350)
    if i == 2:
        for dx in (-25, 25): f.L(cx + dx, 180, cx + dx, 300, 'cool', 2.4, me='cool')
    f.T(cx, 372, t, 11, 'gold', 'middle', bold=True)
MT.append(f)

f = M('icetypes', 'Airframe Ice Types and Temperatures', 760, 340, 'Temperature scale from 0 to −40 °C with clear ice from large supercooled drops near 0 to −15, mixed ice around −10 to −15, and rime from small drops at colder temperatures',
      'Clear (glaze) ice: large supercooled droplets freeze slowly, spreading back before freezing — heavy, hard to remove; most likely 0 to −15°C, especially in cumuliform cloud and freezing rain. Rime: small droplets freeze instantly, trapping air — white, brittle, on leading edges; most likely −10 to −40°C in layer cloud. Mixed ice in between. Hoar frost forms in clear air when a cold aircraft enters warm moist air.')
X, _ = chart(80, 0, 680, 0, (0, -40), (0, 1))
f.L(80, 260, 680, 260, 'ink', 2)
for v in range(0, -41, -10): f.L(X(v), 254, X(v), 266, 'ink', 2); f.T(X(v), 286, f'{v}°C', 10.5, 'ink', 'middle', bold=True)
for a, b, y, t, c_ in ((0, -15, 100, 'CLEAR ICE — large drops (Cu, freezing rain)', 'cool'), (-10, -15, 150, 'MIXED', 'gold'), (-10, -40, 200, 'RIME — small drops (St, layer cloud)', 'white')):
    f.R(X(a), y, X(b) - X(a), 30, c=c_, sw=1.4, fill=c_, rx=4, op=0.35); f.T(X(a) + 6, y - 6, t, 10.5, c_, bold=True)
f.T(380, 320, 'icing risk greatest between 0 and −15°C', 11, 'hot', 'middle', bold=True)
MT.append(f)

f = M('fogs', 'Radiation Fog and Advection Fog', 760, 340, 'Radiation fog forming over land on a clear calm night, and advection fog forming as warm moist air flows over a cold surface',
      'Radiation fog: clear skies at night, light wind (about 2–8 kt), high humidity — the ground cools by radiation and cools the air above to its dew point; it usually clears after sunrise. Advection fog: warm, moist air moves over a colder surface (e.g. sea fog onto the West Coast); it can form by day or night and persists in winds up to about 15 kt or more.')
f.T(190, 40, 'RADIATION FOG', 11, 'gold', 'middle', bold=True); f.L(40, 260, 340, 260, 'gnd', 4)
for k in range(5): f.L(80 + k * 50, 250, 80 + k * 50 - 10, 120, 'hot', 1.6, me='hot')
f.R(40, 200, 300, 56, c='none', sw=0, fill='white', rx=0, op=0.3); f.T(190, 98, 'clear sky, calm, night', 10.5, 'ink', 'middle', bold=True)
f.T(570, 40, 'ADVECTION FOG', 11, 'gold', 'middle', bold=True); f.R(420, 252, 150, 16, c='none', sw=0, fill='gnd', rx=0); f.R(570, 252, 150, 16, c='none', sw=0, fill='fluid', rx=0)
f.L(440, 200, 640, 200, 'hot', 2.6, me='hot'); f.T(500, 190, 'warm moist air', 10.5, 'hot', 'middle', bold=True)
f.R(570, 210, 150, 40, c='none', sw=0, fill='white', rx=0, op=0.3); f.T(645, 290, 'cold sea or ground', 10.5, 'cool', 'middle', bold=True)
f.T(380, 320, 'radiation fog clears with heating; advection fog persists in wind', 10.5, 'dim', 'middle')
MT.append(f)

def front(tag, title, cold, aria, cap):
    f = M(tag, title, 760, 340, aria, cap)
    f.L(40, 290, 720, 290, 'gnd', 3)
    if cold:
        tower(f, 360, 290, 60, 110, anvil=80)
        f.P('M380,290 Q440,250 480,170 Q520,100 560,60', 'cool', 3); f.T(620, 250, '← COLD AIR', 11, 'cool', 'middle', bold=True); f.T(160, 250, 'warm air (lifted)', 11, 'hot', 'middle', bold=True); f.T(420, 30, 'Cb, heavy showers, squalls along the front', 10.5, 'ink', 'middle', bold=True)
        f.T(380, 324, 'steep slope (≈ 1:50 – 1:100), narrow band of weather', 10.5, 'dim', 'middle')
    else:
        f.P('M620,290 Q340,250 60,100', 'hot', 3); f.T(160, 270, 'cold air (retreating)', 11, 'cool', 'middle', bold=True); f.T(620, 150, '← WARM AIR', 11, 'hot', 'middle', bold=True)
        for x, y, t in ((110, 70, 'Ci'), (230, 120, 'Cs'), (360, 170, 'As'), (500, 220, 'Ns, rain')): cloud(f, x, y, 80, 22); f.T(x, y + 28, t, 10, 'ink', 'middle', bold=True)
        f.T(380, 324, 'shallow slope (≈ 1:150), wide band of cloud and rain ahead', 10.5, 'dim', 'middle')
    MT.append(f)
front('coldfront', 'Cold Front — Cross-Section', True, 'Cross-section of a cold front with cold air undercutting warm air, a steep frontal slope and cumulonimbus along it',
      'Cold air undercuts the warm air and forces it up sharply: a narrow band of cumuliform cloud and Cb, heavy showers, squalls, possible thunder; behind the front the temperature and dew point fall, the wind veers (SH: backs) and pressure rises; visibility improves.')
front('warmfront', 'Warm Front — Cross-Section', False, 'Cross-section of a warm front with warm air rising gently over cold air and the cloud sequence cirrus, cirrostratus, altostratus and nimbostratus',
      'Warm air rides slowly up over the cold air on a gentle slope: cloud thickens and lowers ahead of the front (Ci, Cs, As, Ns) with a wide belt of continuous rain and poor visibility; freezing rain is possible in winter where rain falls into sub-zero air.')

f = M('shlow', 'Frontal Depression in the Southern Hemisphere', 760, 380, 'Plan view of a Southern Hemisphere frontal depression with clockwise circulation, the warm sector to the north, the warm front ahead and the cold front trailing to the north-west',
      'In the Southern Hemisphere a frontal depression has CLOCKWISE circulation. The warm sector lies on the equator (north) side; the warm front lies ahead (east) and the cold front trails to the north-west. The system moves generally eastward; these cold fronts bring the Cape winter rain.')
cx, cy = 300, 250
for k in range(4): f.El(cx, cy, 40 + k * 28, 30 + k * 22, 'line', 1.2)
f.T(cx, cy + 6, 'L', 18, 'hot', 'middle', bold=True)
f.P(f'M{cx},{cy} Q430,220 580,150', 'hot', 3); f.P(f'M{cx},{cy} Q220,170 140,60', 'cool', 3)
for k in range(1, 5): t = k / 5; x, y = cx + t * 280, cy - t * 100; f.Ci(x + 4, y - 8, 6, 'hot', 0, 'hot')
for k in range(1, 5): t = k / 5; x, y = cx - t * 160, cy - t * 190; f.P(f'M{x - 6},{y} L{x + 10},{y - 4} L{x},{y + 8} Z', 'none', 0, 'cool')
f.T(380, 110, 'WARM SECTOR (north side)', 11, 'gold', 'middle', bold=True)
f.P('M230,330 A90,70 0 0 1 400,320', 'gold', 2, me='gold'); f.T(300, 360, 'clockwise (SH)', 10.5, 'gold', 'middle', bold=True)
f.T(600, 140, 'warm front', 10.5, 'hot', bold=True); f.T(150, 50, 'cold front', 10.5, 'cool', bold=True)
f.L(700, 70, 700, 30, 'ink', 2, me='ink'); f.T(710, 50, 'N', 11, 'ink', bold=True); f.L(560, 330, 660, 330, 'dim', 2, me='dim'); f.T(560, 320, 'movement: east', 10, 'dim')
MT.append(f)

f = M('cells', 'General Circulation — Cells and Pressure Belts', 760, 400, 'Southern Hemisphere cross-section from equator to pole showing the Hadley, Ferrel and polar cells, the equatorial trough, subtropical high, subpolar low and polar high, and the surface winds',
      'Three cells in each hemisphere: Hadley (equator to about 30°), Ferrel (30–60°) and Polar (60–90°). Surface pressure belts: equatorial trough (ITCZ, low) at the equator, subtropical highs near 30° (South Atlantic and Indian Ocean highs that dominate SA weather), subpolar lows near 60° and the polar high. Surface winds: SE trades from 30° to the equator, westerlies 30–60°, polar easterlies.')
X, _ = chart(60, 0, 700, 0, (0, 90), (0, 1))
f.L(60, 320, 700, 320, 'gnd', 3)
for a, b, t in ((0, 30, 'HADLEY'), (30, 60, 'FERREL'), (60, 90, 'POLAR')):
    f.El((X(a) + X(b)) / 2, 230, (X(b) - X(a)) / 2 - 10, 70, 'cool', 1.6); f.T((X(a) + X(b)) / 2, 234, t, 11, 'cool', 'middle', bold=True)
for v, t, c_ in ((0, 'ITCZ low', 'hot'), (30, 'subtropical high', 'cool'), (60, 'subpolar low', 'hot'), (90, 'polar high', 'cool')):
    f.T(X(v), 346, t, 10, c_, 'middle', bold=True); f.T(X(v), 366, f'{v}°S', 10, 'ink', 'middle')
for a, b, t in ((25, 5, 'SE trades'), (35, 55, 'westerlies'), (85, 65, 'polar easterlies')): f.L(X(a), 300, X(b), 300, 'gold', 2.2, me='gold'); f.T((X(a) + X(b)) / 2, 292, t, 10, 'gold', 'middle', bold=True)
f.T(380, 50, 'equator → South Pole', 11, 'ink', 'middle', bold=True)
MT.append(f)

f = M('trs', 'Tropical Revolving Storm — Structure', 760, 360, 'Cross-section of a tropical cyclone with a clear calm eye, a towering eyewall of cumulonimbus with the strongest winds, spiral rain bands and outflow aloft',
      'A tropical revolving storm forms over warm sea (≥ about 26–27°C) away from the equator (Coriolis needed), typically 5–20° latitude. The eye (20–50 km) is calm with descending air; the surrounding eyewall of Cb has the strongest winds and heaviest rain; spiral bands extend outwards. In the South-West Indian Ocean (affecting Mozambique and SA) the season is about November to April; circulation is clockwise in the SH.')
f.L(40, 300, 720, 300, 'fluid', 6)
for sg in (-1, 1):
    tower(f, 380 + sg * 70, 300, 70, 90, anvil=0)
    for k in range(3): tower(f, 380 + sg * (160 + k * 70), 300, 160 + k * 30, 50)
f.R(350, 70, 60, 230, c='none', sw=0, fill='bg', rx=0); f.T(380, 200, 'EYE', 12, 'gold', 'middle', bold=True); f.L(380, 90, 380, 180, 'cool', 2, me='cool')
f.T(380, 40, 'outflow aloft', 10.5, 'dim', 'middle'); f.L(400, 50, 600, 50, 'dim', 1.6, me='dim'); f.L(360, 50, 160, 50, 'dim', 1.6, me='dim')
f.T(240, 330, 'eyewall: strongest wind', 10.5, 'hot', 'middle', bold=True); f.T(560, 330, 'spiral rain bands', 10.5, 'ink', 'middle', bold=True)
MT.append(f)

f = M('metar', 'Decoding a METAR', 760, 360, 'A METAR for FAOR broken into its groups with the meaning of each: station, time, wind, visibility, cloud, temperature and dew point, QNH and trend',
      'METAR groups in order: station (ICAO), day and time (UTC), wind (direction true / speed kt, gusts), visibility (m, 9999 = 10 km or more), weather, cloud (amount in oktas: FEW 1–2, SCT 3–4, BKN 5–7, OVC 8; base in hundreds of ft), temperature/dew point (°C), QNH (hPa) and trend (NOSIG = no significant change in the next 2 h).')
groups = [('FAOR', 'O. R. Tambo'), ('121200Z', '12th, 1200 UTC'), ('34012KT', '340° true, 12 kt'), ('9999', '≥ 10 km'), ('FEW030', '1–2 oktas at 3000 ft'), ('SCT250', '3–4 oktas at 25 000 ft'), ('24/08', 'temp 24, dew pt 8'), ('Q1022', 'QNH 1022 hPa'), ('NOSIG', 'no change 2 h')]
x = 14
for i, (g, m) in enumerate(groups):
    w = len(g) * 8.6 + 10
    f.R(x, 80, w, 40, c='gold', sw=1.4, fill='g3', rx=4); f.T(x + w / 2, 106, g, 10, 'gold', 'middle', bold=True, mono=True)
    yy = 160 + (i % 3) * 50; f.L(x + w / 2, 122, x + w / 2, yy - 14, 'dim', 1); f.T(x + w / 2, yy, m, 10, 'ink', 'middle', bold=True); x += w + 5
f.T(380, 330, 'FEW 1–2, SCT 3–4, BKN 5–7, OVC 8 oktas', 10.5, 'dim', 'middle')
MT.append(f)

f = M('altim', 'Altimeter Errors — High to Low, Look Out Below', 760, 340, 'An aircraft flying from high pressure to low pressure with a constant altimeter setting, descending gradually while the altimeter still reads the same altitude',
      'Flying from high to low pressure (or into colder air) with the subscale unchanged, the altimeter over-reads: the aircraft is lower than indicated. "High to low (or hot to cold), look out below." The reverse is safe-side. Updating the QNH en route removes the pressure error; cold-temperature corrections are applied to minimum altitudes.')
f.L(40, 300, 720, 300, 'gnd', 3)
f.P('M60,110 Q380,120 700,190', 'line', 1.4, dash='6 4'); f.T(380, 96, 'constant pressure level (indicated 5000 ft)', 10, 'dim', 'middle', bold=True)
f.raw(aircraft(120, 104, s=0.4, flip=True)); f.raw(aircraft(640, 178, s=0.4, flip=True))
f.T(120, 260, 'HIGH pressure / warm', 11, 'cool', 'middle', bold=True); f.T(640, 260, 'LOW pressure / cold', 11, 'hot', 'middle', bold=True)
f.L(640, 120, 640, 172, 'hot', 1.6, me='hot'); f.T(560, 140, 'actually lower', 10.5, 'hot', 'end', bold=True)
f.T(380, 330, 'altimeter over-reads: aircraft is lower than indicated', 11, 'gold', 'middle', bold=True)
MT.append(f)

if __name__ == '__main__':
    gallery(MT, 'Meteorology Gallery 2', 'Meteorology — Additional Figures', 'Original figures for the atmosphere, pressure, wind, stability, cloud, thunderstorms, icing, fog, fronts, circulation and met information.', 'met2-gallery.html')
    print(len(MT), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
