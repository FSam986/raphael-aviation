#!/usr/bin/env python3
"""Meteorology (18) + Flight Planning (3) original SVG figures, with label QA."""
import math, sys
from figlib import *

MET, FPP = [], []

# ═══════════════ M1 atmosphere ═══════════════
f = Fig('atmosphere.jpg', 'The Atmosphere — Composition & Vertical Structure', 760, 390,
        'Composition of dry air as bars, and a pole-to-equator cross-section showing the troposphere, tropopause and stratosphere',
        '<b>Composition</b> — dry air is about 78% nitrogen, 21% oxygen and 1% argon, with a trace of carbon dioxide (about 0.04% today; older texts quote 0.03%). <b>Water vapour</b> varies from 0 to 4% and is what makes weather. <b>Structure</b> — the <b>troposphere</b> holds nearly all the weather and water vapour; temperature falls with height at about 1.98°C per 1 000 ft. Its top, the <b>tropopause</b>, is low and relatively warm over the poles (about 8 km, −45°C) and high and cold over the equator (16–18 km, −75°C). ISA uses 11 km (36 090 ft) and −56.5°C. Above it, in the <b>stratosphere</b>, temperature is constant and then rises.')
f.T(30, 34, 'Dry air by volume', 11.5, 'ink', bold=True)
for i, (nm, pct, w, c_) in enumerate((('Nitrogen (N2)', '78.08%', 148, 'cool'), ('Oxygen (O2)', '20.95%', 40, 'hot'), ('Argon (Ar)', '0.93%', 4, 'gold'), ('Carbon dioxide (CO2)', 'about 0.04%', 3, 'green'))):
    y = 62 + i * 38
    f.T(30, y, nm, 10.5, 'ink'); f.R(30, y + 6, w, 10, c=c_, sw=0.5, fill=c_, rx=2); f.T(30 + w + 8, y + 15, pct, 10.5, c_, bold=True)
f.R(30, 222, 220, 66, c='cool', sw=1.4, fill='g2')
f.T(42, 242, 'Water vapour: 0 to 4%', 11, 'cool', bold=True); f.T(42, 258, 'variable, and the most important', 10); f.T(42, 272, 'gas for weather', 10)
f.T(30, 316, 'Half the mass of the atmosphere', 10); f.T(30, 330, 'lies below about 18 000 ft.', 10)
yk = lambda km: 345 - km * 15
f.P(f'M320,{yk(8)} C460,222 560,{yk(16)} 730,{yk(17)} L730,345 L320,345 Z', 'none', 0, '#16303a')
f.L(320, 45, 320, 345, 'ink', 1.6); f.R(320, 345, 410, 9, c='line', sw=1, fill='steel', rx=0)
for km in (0, 5, 10, 15, 20):
    f.L(314, yk(km), 320, yk(km), 'ink', 1.2); f.T(310, yk(km) + 3.5, f'{km} km', 9.5, 'dim', 'end')
f.P(f'M320,{yk(8)} C460,222 560,{yk(16)} 730,{yk(17)}', 'hot', 2.6, dash='8 5')
f.T(525, 68, 'STRATOSPHERE', 11.5, 'ink', 'middle', bold=True); f.T(525, 84, 'temperature constant, then rising', 9.5, 'dim', 'middle')
f.T(500, 272, 'TROPOSPHERE', 11.5, 'ink', 'middle', bold=True)
f.T(500, 288, 'all weather; temperature falls 1.98°C per 1 000 ft', 9.5, 'dim', 'middle'); f.T(500, 302, '(6.5°C per km)', 9.5, 'dim', 'middle')
f.T(330, 244, 'pole: about 8 km, −45°C', 10, 'hot', bold=True)
f.T(728, 150, 'equator: 16–18 km, −75°C', 10, 'hot', 'end', bold=True)
f.Ci(480, yk(11), 4, 'gold', 1, 'gold'); f.T(492, 198, 'ISA tropopause: 11 km (36 090 ft), −56.5°C', 10, 'gold')
f.T(320, 372, 'POLE', 10, 'ink', bold=True); f.T(730, 372, 'EQUATOR', 10, 'ink', 'end', bold=True); f.T(525, 372, 'tropopause height by latitude', 9.5, 'faint', 'middle')
MET.append(f)

# ═══════════════ M2 temperature ═══════════════
f = Fig('temperature.jpg', 'Temperature — Diurnal Variation, Lapse Rate & Inversions', 760, 360,
        'A graph of surface temperature through the day, and a temperature against height profile showing lapse, inversion and isothermal layers',
        '<b>Diurnal variation</b> — the surface is heated by insolation by day and cools by terrestrial radiation at night. The <b>maximum</b> comes about two hours after local noon (around 1500) and the <b>minimum</b> about half an hour after sunrise. Cloud cover and wind reduce the daily range; clear, calm conditions give the largest range. <b>With height</b> — temperature normally falls (a <b>lapse rate</b>; ISA 1.98°C per 1 000 ft). Where it <b>rises</b> with height the layer is an <b>inversion</b>, and where it stays constant it is <b>isothermal</b>. Both are very stable and trap haze, fog and low cloud beneath them.')
f.T(40, 30, 'Diurnal variation of surface temperature', 11.5, 'ink', bold=True)
px = lambda t: 60 + t * 12.5
py = lambda T_: 250 - (T_ - 10) * 9
def temp(t):
    if t <= 6.5: return 19 + 7 * math.cos(math.pi * (t + 9) / 15.5)
    if t <= 15: return 19 - 7 * math.cos(math.pi * (t - 6.5) / 8.5)
    return 19 + 7 * math.cos(math.pi * (t - 15) / 15.5)
f.L(60, 80, 60, 260, 'ink', 1.6); f.L(60, 260, 372, 260, 'ink', 1.6, me='ink')
for t, lab in ((0, '00'), (6, '06'), (12, '12'), (18, '18'), (24, '24')):
    f.L(px(t), 260, px(t), 265, 'ink', 1.2); f.T(px(t), 277, lab, 9.5, 'dim', 'middle')
f.L(px(6), 260, px(6), 104, 'faint', 1, dash='3 4'); f.T(px(6), 98, 'sunrise', 9.5, 'dim', 'middle')
f.L(px(12), 260, px(12), 104, 'faint', 1, dash='3 4'); f.T(px(12), 98, 'noon', 9.5, 'dim', 'middle')
f.raw(f'<polyline points="{" ".join(f"{px(t/4):.1f},{py(temp(t/4)):.1f}" for t in range(0, 97))}" fill="none" stroke="{col("warm")}" stroke-width="2.6"/>')
f.Ci(px(6.5), py(12), 4.5, 'cool', 1, 'cool'); f.T(150, 242, 'minimum: about 30 min', 9.5, 'cool', bold=True); f.T(150, 254, 'after sunrise', 9.5, 'cool')
f.Ci(px(15), py(26), 4.5, 'hot', 1, 'hot'); f.T(256, 84, 'maximum: about 1500', 9.5, 'hot', bold=True); f.T(256, 96, '(2 h after noon)', 9.5, 'hot')
f.T(215, 294, 'local time (h)', 9.5, 'dim', 'middle'); f.T(44, 170, 'temperature', 9.5, 'dim', 'middle', rot=-90)
f.T(60, 322, 'Day: insolation heats the surface. Night: terrestrial', 9.5); f.T(60, 335, 'radiation cools it. Cloud and wind reduce the range.', 9.5)
f.T(430, 30, 'Lapse rate, inversion, isothermal layer', 11.5, 'ink', bold=True)
f.L(450, 300, 450, 56, 'ink', 1.6, me='ink'); f.L(450, 300, 730, 300, 'ink', 1.6, me='ink')
f.T(590, 320, 'temperature', 9.5, 'dim', 'middle'); f.T(434, 180, 'height', 9.5, 'dim', 'middle', rot=-90)
f.L(660, 300, 600, 230, 'cool', 2.8, cap='round'); f.L(600, 230, 640, 180, 'hot', 2.8, cap='round'); f.L(640, 180, 640, 130, 'gold', 2.8, cap='round'); f.L(640, 130, 580, 60, 'cool', 2.8, cap='round')
f.T(596, 262, 'lapse: temperature', 9.5, 'cool', 'end', bold=True); f.T(596, 274, 'falls with height', 9.5, 'cool', 'end')
f.T(596, 200, 'INVERSION: temperature', 9.5, 'hot', 'end', bold=True); f.T(596, 212, 'rises with height', 9.5, 'hot', 'end')
f.T(628, 150, 'ISOTHERMAL layer:', 9.5, 'gold', 'end', bold=True); f.T(628, 162, 'temperature constant', 9.5, 'gold', 'end')
f.T(590, 90, 'lapse resumes', 9.5, 'cool', 'end')
f.T(450, 344, 'ISA lapse rate: 1.98°C per 1 000 ft up to 36 090 ft', 9.5)
MET.append(f)

# ═══════════════ M3 humidity ═══════════════
f = Fig('humidity.jpg', 'Humidity, Saturation & Dew Point', 760, 350,
        'The saturation curve of water vapour against temperature, with a parcel of air cooled to its dew point',
        '<b>Warm air can hold more water vapour than cold air</b> — the curve shows the maximum (saturated) amount at each temperature. The example air at 20°C holds 9.4 g/m³ but could hold 17.3 g/m³, so its <b>relative humidity</b> is 54%. Cool it with no change in moisture and it moves left until it meets the curve at 10°C: that temperature is the <b>dew point</b>, where RH is 100%. Cool it further and the excess condenses as cloud, fog or dew. A small spread between temperature and dew point means high RH and a risk of fog or low cloud.')
sat = lambda T_: 216.7 * 6.112 * math.exp(17.62 * T_ / (243.12 + T_)) / (T_ + 273.15)
px = lambda T_: 70 + (T_ + 10) * 8.5
py = lambda v: 300 - v * 8
f.L(70, 44, 70, 300, 'ink', 1.6); f.L(70, 300, 462, 300, 'ink', 1.6, me='ink')
for T_ in (-10, 0, 10, 20, 30):
    f.L(px(T_), 300, px(T_), 305, 'ink', 1.2); f.T(px(T_), 317, f'{T_}'.replace('-', '−'), 9.5, 'dim', 'middle')
for v in (0, 10, 20, 30):
    f.L(64, py(v), 70, py(v), 'ink', 1.2); f.T(60, py(v) + 3.5, str(v), 9.5, 'dim', 'end')
pts = [(px(t / 2), py(sat(t / 2))) for t in range(-20, 71) if sat(t / 2) <= 32]
f.raw(f'<polyline points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="none" stroke="{col("cool")}" stroke-width="2.8"/>')
P = (px(20), py(9.4))
f.L(P[0], P[1], P[0], py(sat(20)), 'gold', 1.6, dash='4 4'); f.Ci(P[0], py(sat(20)), 4, 'gold', 1, 'gold')
f.L(P[0] - 6, P[1], px(10) + 6, P[1], 'hot', 2.4, me='hot')
f.Ci(P[0], P[1], 5, 'ink', 1, 'ink'); f.Ci(px(10), P[1], 5, 'hot', 1, 'hot')
f.T(317, 150, 'saturated at 20°C: 17.3 g/m³', 10, 'gold', 'end')
f.T(333, 238, 'actual: 9.4 g/m³ at 20°C', 10, 'ink', bold=True); f.T(333, 252, 'RH = 9.4 / 17.3 = 54%', 10, 'gold')
f.T(86, 206, 'dew point 10°C:', 10, 'hot', bold=True); f.T(86, 220, 'RH 100%, saturated', 10, 'hot')
f.T(283, 240, 'cool the air', 9.5, 'hot', 'middle')
f.T(84, 100, 'air cannot hold this much:', 10); f.T(84, 114, 'the excess condenses', 10)
f.T(385, 76, 'saturation curve (RH 100%)', 10, 'cool', 'end', bold=True)
f.T(266, 338, 'air temperature (°C)', 9.5, 'dim', 'middle'); f.T(30, 172, 'water vapour (g/m³)', 9.5, 'dim', 'middle', rot=-90)
y = 62
for head, lines in (('Relative humidity (RH)', ['actual vapour / maximum possible at', 'that temperature, × 100 (%)']),
                    ('Absolute humidity', ['mass of vapour per volume of air (g/m³)']),
                    ('Humidity mixing ratio', ['mass of vapour per mass of dry air (g/kg)']),
                    ('Dew point', ['temperature at which air, cooled at', 'constant pressure, becomes saturated'])):
    f.T(500, y, head, 10.5, 'ink', bold=True); y += 15
    for t in lines: f.T(500, y, t, 9.5); y += 13
    y += 14
MET.append(f)

# ═══════════════ M4 air density ═══════════════
f = Fig('air-density.jpg', 'Air Density — What Changes It', 760, 320,
        'Four pairs of boxes of air molecules showing how pressure, temperature, humidity and altitude change air density',
        '<b>Density is mass per unit volume</b> (ISA sea level 1.225 kg/m³). It <b>increases with pressure</b> — the air is squeezed into less space — and <b>decreases with temperature</b>, because warm air expands. It also <b>decreases as humidity rises</b>: a water-vapour molecule is lighter than the nitrogen or oxygen molecule it replaces, so moist air is less dense than dry air. And it <b>decreases with altitude</b> as pressure falls. Low density (“hot, high and humid”) means less lift and less engine power: longer take-off runs and poorer climb.')
def dots(f, n, seed, x, y, w, h, r=2.4, fill='#9fc0cb', light=0):
    s = seed
    for i in range(n):
        s = (s * 1103515245 + 12345) % 2147483648; dx = s / 2147483648
        s = (s * 1103515245 + 12345) % 2147483648; dy = s / 2147483648
        lt = i < light
        f.raw(f'<circle cx="{x + 5 + dx*(w-10):.1f}" cy="{y + 5 + dy*(h-10):.1f}" r="{1.8 if lt else r}" fill="{col("cool") if lt else fill}"/>')
cards = (('PRESSURE UP', 8, 24, 0, 'density UP', 'cool', 'the air is compressed'),
         ('TEMPERATURE UP', 24, 8, 0, 'density DOWN', 'hot', 'the air expands'),
         ('HUMIDITY UP', 20, 20, 8, 'density DOWN', 'hot', 'vapour is lighter than dry air'),
         ('ALTITUDE UP', 24, 8, 0, 'density DOWN', 'hot', 'less air above to compress it'))
for i, (ttl, n1, n2, lt, res, c_, sub) in enumerate(cards):
    x = 22 + i * 182
    f.R(x, 30, 170, 210, c='line', sw=1.2, fill='g2')
    f.T(x + 85, 54, ttl, 11, 'ink', 'middle', bold=True)
    f.R(x + 14, 76, 56, 56, c='ink', sw=1.2, fill='bg', rx=3); dots(f, n1, 7 + i, x + 14, 76, 56, 56)
    f.R(x + 100, 76, 56, 56, c='ink', sw=1.2, fill='bg', rx=3); dots(f, n2, 31 + i, x + 100, 76, 56, 56, light=lt)
    f.L(x + 74, 104, x + 96, 104, 'dim', 2, me='dim')
    f.T(x + 42, 148, 'before', 9, 'faint', 'middle'); f.T(x + 128, 148, 'after', 9, 'faint', 'middle')
    f.T(x + 85, 184, res, 12, c_, 'middle', bold=True); f.T(x + 85, 204, sub, 9, 'dim', 'middle')
f.raw(f'<circle cx="398" cy="225" r="1.8" fill="{col("cool")}"/>'); f.T(404, 228, '= water vapour', 8.5, 'cool')
f.T(380, 268, 'ISA sea-level density: 1.225 kg/m³ (1 225 g/m³)', 11, 'ink', 'middle', bold=True)
f.T(380, 288, 'Density is about half the sea-level value at 20 000 ft and a quarter at 40 000 ft.', 10, 'dim', 'middle')
MET.append(f)

# ═══════════════ M5 pressure altitude ═══════════════
f = Fig('pressure-altitude.jpg', 'Pressure Altitude — Worked Example', 760, 360,
        'An airfield at 4000 feet with mean sea level, the 1013 hectopascal level and the resulting pressure altitude marked',
        '<b>Pressure altitude</b> is the height above the <b>1013.25 hPa</b> level — what the altimeter reads with 1013 set. Here the airfield is 4 000 ft above mean sea level and the QNH is 1030 hPa. Pressure falls with height, so the 1013 level lies <b>above</b> sea level: 17 hPa × 30 ft = 510 ft above it. The airfield is therefore only 3 490 ft above the 1013 level: <b>pressure altitude 3 490 ft</b>. Rule: QNH <b>higher</b> than 1013 gives a pressure altitude <b>lower</b> than elevation; QNH lower than 1013 gives a higher one. (30 ft per hPa is the exam approximation; 27 ft is closer at sea level.)')
f.L(30, 300, 650, 300, 'cool', 2); f.L(30, 270, 650, 270, 'gold', 1.8, dash='7 5'); f.L(345, 120, 650, 120, 'green', 1.4, dash='4 4')
poly(f, [(130, 300), (215, 125), (230, 120), (330, 120), (345, 125), (440, 300)])
f.R(250, 114, 60, 6, c='ink', sw=1, fill='dim', rx=0); f.T(280, 106, 'airfield', 10, 'ink', 'middle', bold=True)
f.T(36, 316, 'MSL (QNH 1030 hPa)', 10, 'cool', bold=True); f.T(36, 262, '1013.25 hPa level', 10, 'gold', bold=True)
f.L(500, 298, 500, 122, 'cool', 2.2, me='cool', ms='cool'); f.T(508, 212, 'elevation', 10, 'cool'); f.T(508, 226, '4 000 ft', 10.5, 'cool', bold=True)
f.L(580, 268, 580, 122, 'gold', 2.2, me='gold', ms='gold'); f.T(588, 186, 'pressure', 10, 'gold'); f.T(588, 200, 'altitude', 10, 'gold'); f.T(588, 214, '3 490 ft', 10.5, 'gold', bold=True)
f.L(580, 273, 580, 297, 'hot', 3); f.T(588, 290, '510 ft', 10.5, 'hot', bold=True)
f.T(470, 40, 'QNH 1030 − 1013 = 17 hPa', 10.5, 'ink'); f.T(470, 56, '17 hPa × 30 ft = 510 ft', 10.5, 'ink')
f.T(470, 72, 'QNH is above 1013: subtract', 10.5, 'ink'); f.T(470, 90, 'PA = 4 000 − 510 = 3 490 ft', 11, 'gold', bold=True)
f.T(380, 344, 'QNH higher than 1013 hPa: pressure altitude is LOWER than elevation. QNH lower: it is HIGHER.', 10, 'dim', 'middle')
MET.append(f)

# ═══════════════ M6 altimetry ═══════════════
f = Fig('altimetry.jpg', 'Altimeter Settings — QFE, QNH & Standard', 760, 380,
        'An aircraft above an airfield with three pressure datums: airfield level, mean sea level and the 1013 hectopascal level',
        '<b>The altimeter measures height above whatever pressure is set on its subscale.</b> Set <b>QFE</b> (the pressure at the airfield) and it reads <b>height</b> above the field — zero on landing. Set <b>QNH</b> (airfield pressure reduced to sea level using ISA) and it reads <b>altitude</b> above mean sea level — field elevation on landing. Set <b>1013.25 hPa</b> and it reads <b>pressure altitude</b>, used as flight levels above the transition altitude; <b>QNE</b> is that reading at touchdown. <b>QFF</b> is station pressure reduced to sea level using the actual temperature; it is used to draw isobars on surface charts, not to set altimeters.')
poly(f, [(30, 250), (220, 250), (300, 320), (300, 345), (30, 345)])
f.R(300, 320, 180, 25, c='cool', sw=1, fill=SEA, rx=0)
f.L(220, 250, 480, 250, 'green', 1.6, dash='6 4'); f.L(266, 290, 480, 290, 'gold', 1.6, dash='6 4'); f.L(300, 320, 480, 320, 'cool', 2)
f.R(110, 244, 70, 6, c='ink', sw=1, fill='dim', rx=0); f.R(90, 226, 8, 24, c='ink', sw=1, fill='steel', rx=1); f.T(145, 238, 'airfield', 10, 'ink', 'middle', bold=True)
f.raw(aircraft(380, 82, 0, 0.5))
f.L(340, 96, 340, 248, 'green', 2.2, me='green'); f.L(380, 96, 380, 288, 'gold', 2.2, me='gold'); f.L(420, 96, 420, 318, 'cool', 2.2, me='cool')
f.T(334, 180, 'height', 10, 'green', 'end', bold=True)
f.T(372, 190, 'pressure altitude', 10, 'gold', 'middle', bold=True, rot=-90)
f.T(428, 200, 'altitude', 10, 'cool', bold=True)
f.T(486, 254, 'QFE', 10, 'green', bold=True); f.T(486, 294, '1013', 10, 'gold', bold=True); f.T(486, 324, 'QNH', 10, 'cool', bold=True)
f.T(390, 362, 'mean sea level', 9.5, 'cool', 'middle')
y = 44
for c_, head, lines in (('green', 'QFE', ['pressure at the airfield.', 'Altimeter reads HEIGHT above the', 'field: zero at touchdown.']),
                        ('cool', 'QNH', ['airfield pressure reduced to MSL', 'using ISA. Reads ALTITUDE: field', 'elevation at touchdown.']),
                        ('gold', '1013.25 hPa (standard)', ['reads PRESSURE ALTITUDE, used as', 'flight levels. QNE is that reading', 'at touchdown.']),
                        ('dim', 'QFF', ['station pressure reduced to MSL at', 'the actual temperature: for isobars', 'on charts, not for altimeters.'])):
    f.R(530, y - 9, 10, 10, c=c_, sw=1, fill=c_, rx=2); f.T(548, y, head, 11, c_ if c_ != 'dim' else 'ink', bold=True); y += 15
    for t in lines: f.T(548, y, t, 9.5); y += 13
    y += 16
MET.append(f)

# ═══════════════ M7 stability ═══════════════
f = Fig('stability.jpg', 'Stability — ELR against the Adiabatic Lapse Rates', 760, 380,
        'Temperature against height graph with the dry and saturated adiabatic lapse rate lines dividing absolute instability, conditional instability and absolute stability',
        '<b>Stability depends on how the environment (ELR) compares with a rising parcel.</b> Unsaturated air cools at the <b>DALR, 3°C per 1 000 ft</b>; saturated air cools more slowly, at the <b>SALR, about 1.5°C per 1 000 ft</b>, because condensation releases latent heat. If the environment cools faster than the DALR, a lifted parcel is always warmer than its surroundings and keeps rising: <b>absolute instability</b>. If the ELR is less than the SALR the parcel is always colder and sinks back: <b>absolute stability</b>. In between, the air is stable if dry but unstable once saturated: <b>conditional instability</b>. Unstable air gives cumuliform cloud, showers and turbulence; stable air gives layer cloud, drizzle, fog and smooth flight.')
px = lambda T_: 70 + (T_ + 15) * 8
py = lambda h: 320 - h * 0.026
S = (px(20), 320)
poly(f, [S, (px(-10), 60), (70, 60), (70, 320)], fill='hot', c='none', sw=0, op=0.2)
poly(f, [S, (px(-10), 60), (px(5), 60)], fill='gold', c='none', sw=0, op=0.2)
poly(f, [S, (px(5), 60), (390, 60), (390, 320)], fill='green', c='none', sw=0, op=0.2)
f.L(70, 60, 70, 320, 'ink', 1.6); f.L(70, 320, 402, 320, 'ink', 1.6, me='ink')
for T_ in (-10, 0, 10, 20): f.L(px(T_), 320, px(T_), 325, 'ink', 1.2); f.T(px(T_), 337, f'{T_}'.replace('-', '−'), 9.5, 'dim', 'middle')
for h, lab in ((0, '0'), (5000, '5 000'), (10000, '10 000')): f.L(64, py(h), 70, py(h), 'ink', 1.2); f.T(60, py(h) + 3.5, lab, 9.5, 'dim', 'end')
f.L(S[0], S[1], px(-10), 60, 'ink', 2.8); f.L(S[0], S[1], px(5), 60, 'cool', 2.8)
f.T(110, 50, 'DALR 3°C/1 000 ft', 9.5, 'ink', 'middle', bold=True); f.T(232, 50, 'SALR 1.5°C/1 000 ft', 9.5, 'cool', 'middle', bold=True)
f.T(150, 246, 'ELR greater than DALR', 9.5, 'ink', 'middle'); f.T(150, 260, 'ABSOLUTE INSTABILITY', 10, 'hot', 'middle', bold=True)
f.T(212, 108, 'CONDITIONAL', 10, 'gold', 'middle', bold=True); f.T(213, 121, 'INSTABILITY', 10, 'gold', 'middle', bold=True)
f.T(322, 86, 'ELR less than SALR', 9.5, 'ink', 'middle'); f.T(322, 100, 'ABSOLUTE STABILITY', 10, 'green', 'middle', bold=True)
f.T(236, 356, 'temperature (°C)', 9.5, 'dim', 'middle'); f.T(22, 190, 'height (ft)', 9.5, 'dim', 'middle', rot=-90)
f.T(430, 56, 'Compare the environmental lapse rate (ELR)', 10.5, 'ink', bold=True); f.T(430, 71, 'with the two adiabatic lapse rates:', 10.5, 'ink')
y = 104
for c_, head, l1, l2 in (('hot', 'ELR > DALR', 'absolute instability:', 'unstable even when dry'),
                         ('gold', 'SALR < ELR < DALR', 'conditional instability:', 'unstable only when saturated'),
                         ('green', 'ELR < SALR', 'absolute stability:', 'stable even when saturated'),
                         ('dim', 'ELR = DALR (dry) or SALR (saturated)', 'neutral stability:', 'a displaced parcel stays where it is')):
    f.R(430, y - 10, 11, 11, c=c_, sw=1, fill=c_, rx=2); f.T(450, y, head, 10.5, 'ink', bold=True)
    f.T(450, y + 14, l1, 9.5, c_ if c_ != 'dim' else 'dim'); f.T(450, y + 27, l2, 9.5); y += 56
f.T(430, 338, 'Rising unsaturated air cools at the DALR;', 9.5); f.T(430, 351, 'once saturated it cools at the SALR.', 9.5)
MET.append(f)

# ═══════════════ M8 clouds ═══════════════
f = Fig('clouds-precip.jpg', 'Cloud Types by Height & How Cloud Forms', 760, 440,
        'The ten cloud types arranged in high, medium and low height bands, with four ways air is lifted to form cloud',
        '<b>Ten cloud types in three height bands.</b> High (cirro-): <b>Ci, Cc, Cs</b> — ice crystals, no significant icing or turbulence. Medium (alto-): <b>Ac, As</b>. Low: <b>St, Sc</b>. Three have great vertical extent: <b>Ns</b> (thick rain-bearing layer), <b>Cu</b> and <b>Cb</b> (base low, top up to the tropopause, with an anvil). “Nimbo/nimbus” means rain-bearing; “strato” means layered (stable air); “cumulo” means heaped (unstable air). Cloud forms when air is <b>lifted and cooled to its dew point</b> — by convection, by terrain (orographic), by convergence, or at a front. Band heights are for temperate latitudes.')
for y in (40, 120, 210, 300): f.L(100, y, 735, y, 'faint', 1, dash=None if y == 300 else '4 5')
f.R(100, 300, 635, 7, c='line', sw=1, fill='steel', rx=0)
for y, a, b in ((74, 'HIGH', 'above 20 000 ft'), (160, 'MEDIUM', '6 500–20 000 ft'), (250, 'LOW', 'below 6 500 ft')):
    f.T(22, y, a, 11, 'ink', bold=True); f.T(22, y + 14, b, 9, 'dim')
for dx in (0, 14, 28):
    f.P(f'M{150+dx},{84-dx*0.5} q26,-22 62,-16', 'white', 1.6)
f.T(185, 110, 'Ci cirrus', 9.5, 'ink', 'middle')
for i in range(5):
    for j in range(3): f.raw(f'<ellipse cx="{300+i*15+j*4}" cy="{62+j*10}" rx="5" ry="3" fill="{CLOUD}"/>')
f.T(335, 110, 'Cc cirrocumulus', 9.5, 'ink', 'middle')
f.R(425, 64, 110, 14, c='none', sw=0, fill=CLOUD, rx=7, op=0.4); f.T(480, 110, 'Cs cirrostratus', 9.5, 'ink', 'middle')
for i in range(4): cloud(f, 152 + i * 22, 156, 24, 16)
f.T(185, 196, 'Ac altocumulus', 9.5, 'ink', 'middle')
f.R(280, 150, 110, 18, c='none', sw=0, fill=DCLOUD, rx=9, op=0.85); f.T(335, 196, 'As altostratus', 9.5, 'ink', 'middle')
f.R(130, 244, 110, 14, c='none', sw=0, fill=CLOUD, rx=7, op=0.8); f.T(185, 286, 'St stratus', 9.5, 'ink', 'middle')
for i in range(4): cloud(f, 296 + i * 26, 250, 34, 20, fill=DCLOUD if i % 2 else CLOUD)
f.T(335, 286, 'Sc stratocumulus', 9.5, 'ink', 'middle')
f.R(430, 150, 100, 112, c='none', sw=0, fill=DCLOUD, rx=22); rain(f, 440, 524, 266, 298, 14)
f.T(480, 210, 'Ns', 13, '#10171b', 'middle', bold=True)
cloud(f, 590, 238, 64, 52); f.T(590, 246, 'Cu', 12, '#10171b', 'middle', bold=True)
tower(f, 680, 262, 52, 64, anvil=52); rain(f, 660, 704, 266, 298, 14); f.T(680, 170, 'Cb', 13, '#10171b', 'middle', bold=True)
f.T(480, 322, 'Ns nimbostratus', 9.5, 'ink', 'middle'); f.T(590, 322, 'Cu cumulus', 9.5, 'ink', 'middle'); f.T(683, 322, 'Cb cumulonimbus', 9.5, 'ink', 'middle')
f.T(185, 322, 'layer and heap clouds, by band', 9, 'faint', 'middle')
for cx_, ttl in ((120, 'Convection'), (300, 'Orographic lift'), (480, 'Convergence'), (660, 'Frontal lift')):
    f.T(cx_, 352, ttl, 10.5, 'ink', 'middle', bold=True); f.L(cx_ - 70, 414, cx_ + 70, 414, 'faint', 1.2)
cloud(f, 120, 376, 54, 18); [f.L(x, 410, x, 393, 'warm', 2, me='warm') for x in (104, 120, 136)]
poly(f, [(262, 414), (304, 378), (344, 414)]); f.L(262, 404, 292, 380, 'cool', 2, me='cool'); cloud(f, 318, 372, 44, 16)
f.L(430, 404, 470, 404, 'cool', 2, me='cool'); f.L(530, 404, 490, 404, 'cool', 2, me='cool'); f.L(480, 400, 480, 388, 'warm', 2, me='warm'); cloud(f, 480, 374, 50, 18)
f.L(612, 414, 706, 376, 'hot', 2.4); f.L(606, 400, 660, 378, 'warm', 2, me='warm'); cloud(f, 692, 364, 46, 16)
f.T(380, 432, 'Cloud forms when air is lifted and cooled to its dew point.', 9.5, 'dim', 'middle')
MET.append(f)

# ═══════════════ M9 thunderstorms ═══════════════
f = Fig('thunderstorms.jpg', 'Thunderstorms — Ingredients & Life Cycle', 760, 420,
        'The three stages of a thunderstorm cell: cumulus stage with updraughts, mature stage with updraughts and downdraughts, and dissipating stage with downdraughts',
        '<b>A thunderstorm needs three things:</b> a deep layer of <b>instability</b>, plenty of <b>moisture</b>, and a <b>trigger</b> to start the lift (convection, a front, convergence or high ground). Each cell passes through three stages. <b>Cumulus stage</b>: updraughts throughout, the cloud builds rapidly, no rain yet. <b>Mature stage</b>: precipitation begins and drags air down, so strong up- and downdraughts exist side by side — the most dangerous stage, with heavy rain, hail, lightning, severe turbulence, icing and a gust front at the surface. <b>Dissipating stage</b>: downdraughts spread through the cell, cutting off the supply of warm air; the anvil remains.')
f.T(380, 14, 'A thunderstorm needs all three:', 10, 'dim', 'middle')
f.box(40, 22, 180, 26, ['deep instability'], c='hot', bold_first=False); f.box(290, 22, 180, 26, ['high moisture'], c='cool', bold_first=False); f.box(540, 22, 180, 26, ['trigger action (lift)'], c='gold', bold_first=False)
f.L(30, 350, 730, 350, 'ink', 1.6); f.L(255, 64, 255, 350, 'line', 1, dash='3 5'); f.L(505, 64, 505, 350, 'line', 1, dash='3 5')
tower(f, 130, 300, 170, 110)
for x in (105, 130, 155): f.L(x, 342, x, 236, 'warm', 2.4, me='warm')
tower(f, 380, 300, 140, 130, anvil=88)
for x in (346, 364): f.L(x, 342, x, 196, 'warm', 2.4, me='warm')
for x in (398, 416): f.L(x, 196, x, 342, 'cool', 2.4, me='cool')
rain(f, 392, 440, 304, 346, 12)
tower(f, 630, 300, 140, 120, anvil=104)
for x in (600, 630, 660): f.L(x, 196, x, 342, 'cool', 2.4, me='cool')
for cx_, a, b in ((130, 'CUMULUS STAGE', 'updraughts only'), (380, 'MATURE STAGE', 'updraughts and downdraughts'), (630, 'DISSIPATING STAGE', 'downdraughts only')):
    f.T(cx_, 76, a, 11, 'ink', 'middle', bold=True); f.T(cx_, 91, b, 9.5, 'dim', 'middle')
for cx_, a, b in ((130, 'about 15–20 minutes', 'no precipitation yet'), (380, 'about 20–30 minutes: most hazardous', 'heavy rain, hail, lightning'), (630, 'rain eases; the anvil remains', 'can last 30 min to 2 h or more')):
    f.T(cx_, 368, a, 9.5, 'ink', 'middle'); f.T(cx_, 382, b, 9.5, 'dim', 'middle')
f.L(280, 404, 310, 404, 'warm', 2.4, me='warm'); f.T(318, 408, 'updraught', 9.5); f.L(400, 404, 430, 404, 'cool', 2.4, me='cool'); f.T(438, 408, 'downdraught', 9.5)
MET.append(f)

# ═══════════════ M10 thunderstorm hazards ═══════════════
f = Fig('thunderstorm-hazards.jpg', 'Thunderstorm Hazards', 760, 370,
        'A cumulonimbus with six numbered hazards: turbulence, hail, icing, lightning, static and windshear',
        '<b>Every hazard in the book lives in a cumulonimbus.</b> Severe <b>turbulence</b> and vertical draughts can exceed the aircraft’s structural limits. <b>Hail</b> can be thrown out of the anvil into clear air. <b>Icing</b> is severe where supercooled water droplets exist, worst between 0°C and about −20°C. <b>Lightning</b> can blind the crew, damage the airframe and upset the magnetic compass; <b>static</b> causes radio noise. Near the ground the outflow produces <b>windshear, gust fronts and microbursts</b>. Pressure changes under the storm can also cause altimeter errors. Avoid thunderstorms visually or by weather radar — never fly under or through one.')
f.L(30, 340, 370, 340, 'ink', 1.6)
tower(f, 190, 290, 80, 150, anvil=130)
f.L(100, 200, 285, 200, 'steel', 1.4, dash='5 4'); f.L(100, 140, 285, 140, 'steel', 1.4, dash='5 4')
f.T(92, 204, '0°C', 9.5, 'dim', 'end'); f.T(92, 144, '−20°C', 9.5, 'dim', 'end')
rain(f, 180, 228, 294, 336, 12)
f.P('M168,292 L156,314 L166,314 L150,338', 'gold', 2.6, join='round')
f.L(250, 334, 318, 334, 'cool', 2.2, me='cool'); f.L(130, 334, 62, 334, 'cool', 2.2, me='cool')
f.badge(222, 240, 1); f.badge(245, 312, 2); f.badge(160, 170, 3); f.badge(132, 312, 4); f.badge(312, 66, 5); f.badge(336, 318, 6)
f.legend(402, 56, [(1, 'Turbulence and draughts', 'severe turbulence; strong up- and downdraughts'),
                   (2, 'Hail', 'airframe damage, even in clear air under the anvil'),
                   (3, 'Icing', 'severe in supercooled water, worst 0°C to −20°C'),
                   (4, 'Lightning', 'temporary blindness; compass and avionics errors'),
                   (5, 'Static', 'radio noise and interference'),
                   (6, 'Windshear and microburst', 'sudden loss of airspeed and height near the ground')], step=44)
f.T(402, 330, 'Never fly under, through or close to a Cb:', 10, 'ink', bold=True); f.T(402, 345, 'avoid it visually or by weather radar.', 10)
MET.append(f)

# ═══════════════ M11 turbulence ═══════════════
f = Fig('turbulence.jpg', 'Turbulence — The Four Main Causes', 760, 330,
        'Four panels: mechanical turbulence over an obstacle, convective thermals, wake vortices behind an aircraft and clear-air turbulence beside a jet stream',
        '<b>Mechanical</b> turbulence comes from wind blowing over rough ground, buildings and trees; it grows with wind speed and usually reaches about 2 000 ft above the surface. <b>Convective</b> (thermal) turbulence comes from uneven heating: rising thermals with sinking air between, worst on hot afternoons and smooth above the cumulus tops. <b>Wake turbulence</b> is the pair of counter-rotating vortices shed from the wingtips of every aircraft; they are strongest behind an aircraft that is heavy, slow and clean, and they sink and drift with the wind. <b>Clear-air turbulence</b> (CAT) is found in strong windshear near jet streams, typically on the cold (polar) side, with no cloud to warn of it.')
X0 = (25, 207, 389, 571)
for x0, ttl, c1, c2 in zip(X0, ('MECHANICAL', 'CONVECTIVE (THERMAL)', 'WAKE TURBULENCE', 'CLEAR-AIR (CAT)'),
                           ('wind over terrain, buildings,', 'thermals over heated ground:', 'wingtip vortices: strongest', 'near jet streams, worst on'),
                           ('trees: eddies downwind', 'bumpy below the cumulus', 'behind heavy, slow, clean aircraft', 'the cold (polar) side')):
    f.R(x0, 44, 170, 200, c='line', sw=1.2, fill='g2'); f.T(x0 + 85, 34, ttl, 10.5, 'ink', 'middle', bold=True)
    f.T(x0 + 85, 266, c1, 9, 'dim', 'middle'); f.T(x0 + 85, 279, c2, 9, 'dim', 'middle')
x0 = X0[0]; f.L(x0 + 8, 224, x0 + 162, 224, 'ink', 1.4); f.R(x0 + 62, 164, 26, 60, c='ink', sw=1.2, fill='steel', rx=1)
f.L(x0 + 12, 150, x0 + 56, 150, 'cool', 2, me='cool'); f.L(x0 + 12, 190, x0 + 54, 190, 'cool', 2, me='cool')
f.P(f'M{x0+56},{150} Q{x0+78},{128} {x0+104},{150}', 'cool', 2, me='cool')
for (cx_, cy_) in ((x0 + 112, 186), (x0 + 140, 204)): f.P(f'M{cx_+11},{cy_} A11,11 0 1 1 {cx_},{cy_-11}', 'hot', 1.8, me='hot')
x0 = X0[1]; f.L(x0 + 8, 224, x0 + 162, 224, 'ink', 1.4); cloud(f, x0 + 85, 92, 76, 30)
for x in (x0 + 48, x0 + 85, x0 + 122): wavy(f, x, 220, 124)
for x in (x0 + 66, x0 + 104): f.L(x, 130, x, 212, 'cool', 1.6, me='cool')
x0 = X0[2]; f.L(x0 + 36, 120, x0 + 134, 120, 'ink', 4, cap='round'); f.Ci(x0 + 85, 120, 9, 'ink', 1.4, '#c4d1d6'); f.L(x0 + 85, 111, x0 + 85, 92, 'ink', 3, cap='round'); f.L(x0 + 72, 96, x0 + 98, 96, 'ink', 2.4, cap='round')
f.P(f'M{x0+22},{140} A14,14 0 1 1 {x0+36},{154}', 'hot', 2, me='hot'); f.P(f'M{x0+148},{140} A14,14 0 1 0 {x0+134},{154}', 'hot', 2, me='hot')
f.L(x0 + 36, 166, x0 + 36, 206, 'cool', 1.8, me='cool'); f.L(x0 + 134, 166, x0 + 134, 206, 'cool', 1.8, me='cool')
f.T(x0 + 85, 196, 'vortices sink', 9, 'cool', 'middle'); f.T(x0 + 85, 70, 'seen from behind', 9, 'faint', 'middle')
x0 = X0[3]; f.El(x0 + 95, 130, 58, 34, 'faint', 1.2); f.El(x0 + 95, 130, 34, 17, 'hot', 2.2, 'g3'); f.T(x0 + 95, 134, 'JET', 10, 'hot', 'middle', bold=True)
for i in range(5): f.L(x0 + 22 + i * 7, 108 + i * 2, x0 + 14 + i * 7, 150 + i * 2, 'gold', 1.6)
f.T(x0 + 34, 92, 'CAT', 10, 'gold', 'middle', bold=True)
f.T(x0 + 34, 190, 'cold side', 9, 'cool', 'middle'); f.T(x0 + 130, 190, 'warm side', 9, 'warm', 'middle'); f.T(x0 + 95, 222, 'cross-section through the jet', 8.5, 'faint', 'middle')
f.T(380, 312, 'Turbulence is reported as light, moderate or severe.', 10, 'dim', 'middle')
MET.append(f)

# ═══════════════ M12 mountain waves & windshear ═══════════════
f = Fig('mountain-waves-windshear.jpg', 'Mountain Waves & Windshear on the Approach', 760, 460,
        'Airflow over a ridge forming lee waves with cap, rotor and lenticular clouds; and an approach path sagging as the headwind decreases near the ground',
        '<b>Mountain (standing) waves</b> form when a strong wind — about 15 kt or more at the summit, increasing with height — blows within about 30° of perpendicular to a ridge, with a <b>stable layer</b> near the summit. The air oscillates downwind for many miles. <b>Lenticular clouds</b> sit in the wave crests, a <b>cap cloud</b> covers the summit, and under the first crest a <b>rotor</b> produces severe turbulence. Expect strong downdraughts in the lee. <b>Windshear</b> is a change of wind speed or direction over a short distance. On the approach, a headwind that dies away near the ground makes airspeed and lift fall suddenly: the aircraft sinks below the glide path unless power is added at once.')
f.L(20, 240, 740, 240, 'ink', 1.4)
poly(f, [(120, 240), (190, 112), (215, 104), (250, 240)])
def wave(y0, A):
    pts = []
    for x in range(30, 731, 5):
        if x < 205: y = y0 - A * math.exp(-((x - 205) / 45.0) ** 2)
        else: y = y0 - A * math.exp(-(x - 205) / 600.0) * math.cos(2 * math.pi * (x - 205) / 150.0)
        pts.append((x, y))
    return pts
for y0, A in ((92, 18), (52, 14)):
    pts = wave(y0, A)
    f.raw(f'<polyline points="{" ".join(f"{x},{y:.1f}" for x, y in pts[:-2])}" fill="none" stroke="{col("cool")}" stroke-width="2"/>')
    f.L(pts[-3][0], pts[-3][1], pts[-1][0], pts[-1][1], 'cool', 2, me='cool')
cloud(f, 206, 98, 52, 14)
for x in (355, 505, 655): f.raw(f'<ellipse cx="{x}" cy="{52 - 14*math.exp(-(x-205)/600.0)}" rx="34" ry="7" fill="{CLOUD}"/>')
f.T(430, 16, 'lenticular clouds mark the wave crests', 10, 'ink', 'middle')
cloud(f, 355, 170, 56, 22, fill=DCLOUD); f.P('M338,196 A20,12 0 1 0 372,196', 'hot', 1.8, me='hot')
f.T(355, 226, 'ROTOR: severe turbulence', 10, 'hot', 'middle', bold=True)
f.T(264, 130, 'cap cloud', 9.5, 'ink'); f.L(261, 126, 230, 103, 'dim', 1)
f.T(30, 30, 'wind', 10, 'cool', bold=True)
for i, t in enumerate(('Needs: wind of 15 kt or more blowing', 'within 30° of perpendicular to the ridge,', 'stronger with height, and a stable layer', 'near the summit.')):
    f.T(452, 148 + i * 14, t, 9.5)
f.L(20, 258, 740, 258, 'line', 1, dash='3 5')
f.T(30, 284, 'WINDSHEAR ON THE APPROACH: headwind decreasing near the ground', 11, 'ink', bold=True)
f.L(20, 430, 740, 430, 'ink', 1.4); f.R(560, 430, 160, 7, c='ink', sw=1, fill='dim', rx=0); f.T(640, 450, 'runway', 9.5, 'dim', 'middle')
f.L(120, 322, 600, 428, 'dim', 1.6, dash='7 5')
f.P('M120,322 L320,366.2 Q420,392 480,428', 'hot', 2.6)
f.raw(aircraft(112, 316, 12, 0.3, flip=True))
for y, ln, lab in ((322, 80, '30 kt'), (368, 52, '20 kt'), (410, 26, '10 kt')):
    f.L(724, y, 724 - ln, y, 'cool', 2.2, me='cool'); f.T(724 - ln - 8, y + 3.5, lab, 9.5, 'cool', 'end')
f.T(684, 304, 'headwind', 9.5, 'cool', 'middle', bold=True)
f.T(372, 346, 'intended glide path', 9.5, 'dim'); f.T(385, 418, 'actual path', 9.5, 'hot', 'end', bold=True)
for i, t in enumerate(('Headwind falls: airspeed and lift drop,', 'the aircraft sinks below the glide path.', 'Add power at once; go around if unstable.')):
    f.T(30, 384 + i * 14, t, 9.5)
MET.append(f)

# ═══════════════ M13 microburst ═══════════════
f = Fig('microburst-surface-turbulence.jpg', 'Microburst on the Approach', 760, 390,
        'A microburst downdraught spreading out at the surface under a storm cloud, with an approach path that first balloons above then sinks below the glide path',
        '<b>A microburst</b> is a concentrated downdraught from a convective cloud that hits the ground and spreads out in all directions. It is small — <b>less than 4 km across</b> — and short-lived, typically <b>1 to 5 minutes</b>, with winds that can exceed 60 kt. An aircraft flying through it meets three things in quick succession: an <b>increasing headwind</b> (airspeed rises, the aircraft balloons above the path — and the pilot is tempted to reduce power), then the <b>downdraught</b>, then an <b>increasing tailwind</b> that destroys airspeed and lift close to the ground. Avoid: delay the approach or take-off when microbursts are reported or heavy rain shafts or virga are seen beneath a storm. (Mechanical surface turbulence is shown in the Turbulence figure.)')
f.L(20, 250, 740, 250, 'ink', 1.4); f.R(590, 250, 130, 7, c='ink', sw=1, fill='dim', rx=0)
cloud(f, 380, 58, 240, 56, fill=DCLOUD)
for x in (350, 380, 410): f.L(x, 92, x, 196, 'cool', 2.4, me='cool')
f.P('M350,204 Q346,238 232,240', 'cool', 2.4, me='cool'); f.P('M410,204 Q414,238 528,240', 'cool', 2.4, me='cool')
f.P('M366,204 Q362,226 300,228', 'cool', 1.6, me='cool'); f.P('M394,204 Q398,226 460,228', 'cool', 1.6, me='cool')
f.L(60, 120, 700, 245, 'dim', 1.6, dash='7 5')
f.P('M60,120 L200,147.3 C260,152 300,148 340,175 C400,215 470,240 530,249', 'hot', 2.6)
f.raw(aircraft(54, 112, 11, 0.3, flip=True))
f.badge(262, 128, 1); f.badge(446, 150, 2); f.badge(462, 214, 3)
f.T(150, 110, 'intended glide path', 9.5, 'dim'); f.T(655, 270, 'runway', 9.5, 'dim', 'middle')
f.L(240, 266, 520, 266, 'gold', 1.4, me='gold', ms='gold'); f.T(380, 282, 'under 4 km across; lasts 1–5 minutes; winds can exceed 60 kt', 10, 'gold', 'middle')
for i, (n, t) in enumerate(((1, 'Increasing headwind: airspeed rises and the aircraft balloons above the glide path.'),
                            (2, 'Downdraught: the aircraft is forced down.'),
                            (3, 'Increasing tailwind: airspeed and lift collapse; the aircraft sinks, possibly into the ground.'))):
    f.badge(52, 312 + i * 24, n); f.T(70, 316 + i * 24, t, 10, 'ink')
MET.append(f)

# ═══════════════ M14 visibility & fog ═══════════════
f = Fig('visibility-fogs.jpg', 'Visibility & the Formation of Fog', 760, 400,
        'A visibility scale separating fog and mist, and four scenes showing radiation, advection, upslope and steam fog',
        '<b>Fog</b> is visibility below 1 000 m caused by water droplets; <b>mist</b> is 1 000 to 5 000 m with relative humidity of 95% or more; <b>haze</b> is reduced visibility from dry particles such as dust and smoke. Runway visual range (RVR) is reported when visibility falls below 1 500 m. <b>Radiation fog</b> forms over land on clear nights with moist air and a light wind of 2–8 kt, and often pools in valleys. <b>Advection fog</b> forms when warm moist air moves over a colder surface, day or night, in winds up to about 15 kt. <b>Upslope fog</b> forms when moist air is forced up rising ground and cools adiabatically. <b>Steam fog</b> forms when very cold air moves over much warmer water.')
f.R(60, 30, 180, 26, c='ink', sw=1.2, fill='steel', rx=4); f.T(150, 47, 'FOG: below 1 000 m', 9.5, 'ink', 'middle', bold=True)
f.R(240, 30, 280, 26, c='ink', sw=1.2, fill='g3', rx=4); f.T(380, 47, 'MIST: 1 000 to 5 000 m, RH 95% or more', 9.5, 'ink', 'middle', bold=True)
f.R(520, 30, 180, 26, c='ink', sw=1.2, fill='g2', rx=4); f.T(610, 47, 'above 5 000 m', 9.5, 'dim', 'middle')
f.T(380, 76, 'Haze: visibility reduced by dry particles (dust, smoke). RVR is reported when visibility is below 1 500 m.', 9.5, 'dim', 'middle')
X0 = (30, 212, 394, 576)
caps = (('clear night, moist air,', 'light wind (2–8 kt), over land;', 'clears as wind or sun increases'),
        ('warm moist air moves over', 'a colder sea or land surface;', 'day or night, wind to 15 kt'),
        ('moist air forced up a slope', 'cools adiabatically to its', 'dew point'),
        ('very cold air over much', 'warmer water: evaporation', 'condenses at once'))
for x0, ttl, cp in zip(X0, ('RADIATION FOG', 'ADVECTION FOG', 'UPSLOPE FOG', 'STEAM FOG'), caps):
    f.R(x0, 96, 160, 216, c='line', sw=1.2, fill='g2'); f.T(x0 + 80, 116, ttl, 10.5, 'ink', 'middle', bold=True)
    for i, t in enumerate(cp): f.T(x0 + 80, 332 + i * 13, t, 9, 'dim', 'middle')
x0 = X0[0]; f.L(x0 + 8, 296, x0 + 152, 296, 'ink', 1.4)
f.raw(f'<path d="M{x0+128},140 a14,14 0 1 0 10,24 a11,11 0 1 1 -10,-24 z" fill="{col("gold")}"/>')
for x in (x0 + 36, x0 + 70, x0 + 104): wavy(f, x, 262, 214, sw=1.4)
f.R(x0 + 12, 268, 136, 26, c='none', sw=0, fill=CLOUD, rx=13, op=0.75); f.T(x0 + 80, 206, 'ground loses heat', 8.5, 'warm', 'middle')
x0 = X0[1]; f.R(x0 + 8, 296, 144, 9, c='cool', sw=1, fill=SEA, rx=0); f.L(x0 + 14, 236, x0 + 70, 236, 'warm', 2.2, me='warm')
f.T(x0 + 14, 224, 'warm moist air', 9, 'warm'); f.R(x0 + 56, 266, 92, 28, c='none', sw=0, fill=CLOUD, rx=14, op=0.75)
x0 = X0[2]; poly(f, [(x0 + 30, 296), (x0 + 112, 180), (x0 + 150, 296)]); f.L(x0 + 8, 296, x0 + 152, 296, 'ink', 1.4)
f.L(x0 + 22, 280, x0 + 74, 206, 'cool', 2.2, me='cool'); cloud(f, x0 + 84, 196, 60, 24, op=0.85)
x0 = X0[3]; f.R(x0 + 8, 296, 144, 9, c='warm', sw=1, fill='#5a3a2a', rx=0); f.L(x0 + 14, 220, x0 + 74, 220, 'cool', 2.2, me='cool'); f.T(x0 + 14, 208, 'very cold air', 9, 'cool')
for x in (x0 + 40, x0 + 66, x0 + 92, x0 + 118): f.P(f'M{x},292 q6,-8 0,-16 q-6,-8 0,-16 q6,-8 0,-16', CLOUD, 2.2)
f.T(380, 388, 'Valley fog is radiation fog that pools as cold air drains into low ground.', 9.5, 'dim', 'middle')
MET.append(f)

# ═══════════════ M15 frontal & tropical-air fog ═══════════════
f = Fig('fog-frontal-tropical.jpg', 'Frontal Fog & Tropical-Air Fog', 760, 340,
        'Rain from a warm front falling into the cold air beneath to form frontal fog; and warm moist tropical air cooled to fog as it moves over a progressively colder sea',
        '<b>Frontal fog</b> forms in the cold air <b>ahead of a warm front</b> (or occlusion). Continuous rain falls from the warm air aloft into the cold air beneath; it evaporates, raises the moisture content of the cold air and saturates it. It can cover a wide belt and lasts until the front has passed. <b>Tropical-air fog</b> is an advection fog: warm, moist tropical maritime air moving towards the pole passes over a steadily colder surface, is cooled from below to its dew point, and forms widespread fog and low stratus over sea and coast.')
f.T(200, 30, 'FRONTAL FOG', 10.5, 'ink', 'middle', bold=True)
f.L(30, 270, 370, 270, 'ink', 1.4); f.L(60, 270, 350, 110, 'hot', 2.6)
cloud(f, 112, 216, 84, 34, fill=DCLOUD); cloud(f, 196, 168, 70, 24); f.R(238, 118, 80, 10, c='none', sw=0, fill=CLOUD, rx=5, op=0.45)
f.T(96, 190, 'Ns', 10, 'ink', 'middle', bold=True); f.T(190, 146, 'As', 10, 'ink', 'middle', bold=True); f.T(272, 108, 'Cs', 10, 'ink', 'middle', bold=True)
rain(f, 96, 144, 236, 266, 12); f.R(150, 248, 160, 20, c='none', sw=0, fill=CLOUD, rx=10, op=0.7)
f.T(250, 240, 'FOG', 10, 'ink', 'middle', bold=True)
f.T(40, 96, 'warm air', 10, 'hot', bold=True); f.L(40, 106, 96, 106, 'hot', 2, me='hot'); f.T(318, 208, 'cold air', 10, 'cool', bold=True)
f.T(200, 298, 'Rain from the warm air evaporates into the cold air', 9.5, 'dim', 'middle'); f.T(200, 312, 'ahead of the warm front and saturates it.', 9.5, 'dim', 'middle')
f.L(385, 20, 385, 322, 'line', 1, dash='3 5')
f.T(570, 30, 'TROPICAL-AIR (ADVECTION) FOG', 10.5, 'ink', 'middle', bold=True)
for x, w, c_, lab in ((410, 110, 'hot', 'sea 25°C'), (520, 110, 'gold', 'sea 18°C'), (630, 100, 'cool', 'sea 12°C')):
    f.R(x, 262, w, 10, c='none', sw=0, fill=c_, rx=0); f.T(x + w / 2, 288, lab, 9.5, c_, 'middle')
f.L(420, 200, 530, 200, 'warm', 2.4, me='warm'); f.T(412, 188, 'warm moist tropical air', 9.5, 'warm', bold=True)
f.R(548, 246, 70, 14, c='none', sw=0, fill=CLOUD, rx=7, op=0.4); f.R(612, 234, 118, 26, c='none', sw=0, fill=CLOUD, rx=13, op=0.75)
f.T(671, 226, 'FOG', 10, 'ink', 'middle', bold=True); f.T(720, 150, 'towards the pole →', 9.5, 'dim', 'end')
f.T(570, 310, 'The air is cooled from below to its dew point', 9.5, 'dim', 'middle'); f.T(570, 324, 'as it moves over a colder surface.', 9.5, 'dim', 'middle')
MET.append(f)

# ═══════════════ M16 fronts ═══════════════
f = Fig('fronts.jpg', 'Warm Front & Cold Front — Cross-Sections', 760, 390,
        'Cross-sections of a warm front with layered cloud on a shallow slope, and a cold front with cumulonimbus on a steep slope',
        '<b>Warm front</b> — warm air rides up over a retreating wedge of cold air on a very shallow slope, about <b>1:150</b>. The cloud is layered and arrives in sequence over hundreds of miles: <b>Ci, Cs, As, Ns</b>, with continuous rain from the As/Ns ahead of the surface front. <b>Cold front</b> — advancing cold air undercuts the warm air on a much steeper slope, about <b>1:50 to 1:80</b>, lifting it sharply: a narrow band of <b>Cu and Cb</b> with heavy showers, squalls and thunderstorms, followed by rapid clearance. A cold front moves faster than the warm front ahead of it and eventually overtakes it, forming an <b>occlusion</b>. On charts a warm front carries semicircles, a cold front triangles, pointing the way the front is moving.')
f.T(200, 30, 'WARM FRONT', 11, 'hot', 'middle', bold=True)
f.L(130, 46, 270, 46, 'hot', 2.4)
for x in (150, 185, 220, 255): f.raw(f'<path d="M{x-8},46 a8,8 0 0 1 16,0 z" fill="{col("hot")}"/>')
f.L(30, 300, 370, 300, 'ink', 1.4); f.L(60, 300, 350, 100, 'hot', 2.8)
cloud(f, 108, 228, 84, 34, fill=DCLOUD); cloud(f, 190, 164, 70, 24); f.R(228, 112, 76, 9, c='none', sw=0, fill=CLOUD, rx=4.5, op=0.45)
for dx in (0, 12): f.P(f'M{300+dx},{74-dx*0.5} q22,-18 50,-12', 'white', 1.5)
f.T(92, 202, 'Ns', 10, 'ink', 'middle', bold=True); f.T(186, 142, 'As', 10, 'ink', 'middle', bold=True); f.T(262, 102, 'Cs', 10, 'ink', 'middle', bold=True); f.T(296, 62, 'Ci', 10, 'ink', 'middle', bold=True)
rain(f, 84, 144, 248, 296, 12)
f.T(40, 120, 'warm air', 10, 'hot', bold=True); f.L(40, 130, 96, 130, 'hot', 2, me='hot'); f.T(300, 270, 'cold air', 10, 'cool', bold=True)
f.T(200, 326, 'slope about 1:150; a wide belt of layer cloud', 9.5, 'dim', 'middle'); f.T(200, 340, 'and steady rain ahead of the surface front', 9.5, 'dim', 'middle')
f.L(385, 20, 385, 350, 'line', 1, dash='3 5')
f.T(570, 30, 'COLD FRONT', 11, 'cool', 'middle', bold=True)
f.L(500, 46, 640, 46, 'cool', 2.4)
for x in (520, 555, 590, 625): f.raw(f'<path d="M{x-8},46 L{x},34 L{x+8},46 z" fill="{col("cool")}"/>')
f.L(400, 300, 740, 300, 'ink', 1.4)
tower(f, 626, 246, 84, 80, anvil=66); rain(f, 604, 654, 250, 296, 12)
f.P('M610,300 Q570,210 440,100', 'cool', 2.8)
cloud(f, 480, 236, 60, 28); f.T(480, 214, 'Cu', 10, 'ink', 'middle', bold=True); f.T(628, 170, 'Cb', 12, '#10171b', 'middle', bold=True)
f.T(410, 270, 'cold air', 10, 'cool', bold=True); f.L(410, 280, 466, 280, 'cool', 2, me='cool'); f.T(690, 276, 'warm air', 10, 'hot', bold=True)
f.T(570, 326, 'slope about 1:50 to 1:80; a narrow band of Cb,', 9.5, 'dim', 'middle'); f.T(570, 340, 'heavy showers, squalls and thunderstorms', 9.5, 'dim', 'middle')
f.T(380, 374, 'Both diagrams: front moving left to right. The cold front is faster and eventually overtakes the warm front.', 9.5, 'dim', 'middle')
MET.append(f)

# ═══════════════ M17 front passage ═══════════════
f = Fig('front-passage.jpg', 'Weather Changes as a Front Passes', 760, 410,
        'Two tables listing temperature, dew point, pressure, wind, cloud, weather and visibility ahead of, at and behind a warm front and a cold front',
        '<b>Recognising a front from the changes it brings.</b> At a <b>warm front</b> the changes are gradual: pressure falls steadily and then stops falling, temperature and dew point rise, and long-lasting rain gives way to drizzle or dry, often misty, conditions in the warm sector. At a <b>cold front</b> they are abrupt: a line of Cb with heavy showers, a sudden drop in temperature and dew point, a sharp rise in pressure, and then very good visibility in the cold, clear air behind. The wind <b>veers</b> at both fronts in the Northern Hemisphere and <b>backs</b> in the Southern Hemisphere.')
cw = [96, 198, 198, 198]
f.T(35, 24, 'WARM FRONT', 11, 'hot', bold=True)
table(f, 35, 32, cw, ['', 'ahead', 'as it passes', 'behind'],
      [('Temperature', 'steady', 'rises', 'warmer'), ('Dew point', 'rises slowly in the rain', 'rises', 'steady, high'),
       ('Pressure', 'falls steadily', 'fall stops', 'steady or slow fall'), ('Wind', 'increases', 'veers (NH) / backs (SH)', 'steady direction'),
       ('Cloud', 'Ci, Cs, As, then Ns', 'low Ns and St', 'St or Sc'), ('Weather', 'continuous rain or snow', 'rain eases', 'drizzle or dry'),
       ('Visibility', 'good, then poor in rain', 'poor; mist or fog', 'moderate or poor')], 'hot')
f.T(35, 222, 'COLD FRONT', 11, 'cool', bold=True)
table(f, 35, 230, cw, ['', 'ahead', 'as it passes', 'behind'],
      [('Temperature', 'warm', 'falls suddenly', 'cold'), ('Dew point', 'high', 'falls', 'low'),
       ('Pressure', 'falls', 'rises suddenly', 'rises, then steadies'), ('Wind', 'increasing, gusty', 'sharp veer (NH) / back (SH); squalls', 'gusty, then easing'),
       ('Cloud', 'St or Sc, then Cu and Cb', 'Cb, sometimes with Ns', 'Cu, with clear spells'), ('Weather', 'light rain or drizzle', 'heavy showers, hail, thunder', 'showers, then fine'),
       ('Visibility', 'moderate or poor', 'poor in the showers', 'very good outside showers')], 'cool')
MET.append(f)

# ═══════════════ M18 occlusions ═══════════════
PURP = '#b58be0'
f = Fig('occluded-front.jpg', 'Occluded & Stationary Fronts', 760, 420,
        'Cross-sections of a cold occlusion and a warm occlusion with the warm air lifted off the surface, and the chart symbols for occluded and stationary fronts',
        '<b>An occlusion</b> forms when a cold front catches up with the warm front ahead and lifts the warm-sector air clear of the surface. What happens next depends on which cold air mass is colder. In a <b>cold occlusion</b> the air behind is colder than the air ahead, so it <b>undercuts</b> it — the weather resembles a cold front. In a <b>warm occlusion</b> the air behind is less cold, so it <b>rides up</b> over the colder air ahead — more like a warm front. Either way the lifted warm air gives thick cloud and prolonged rain, and Cb can be <b>embedded</b> in the layer cloud, hidden from view. A <b>stationary front</b> shows little or no movement; its symbols point in opposite directions.')
f.T(200, 30, 'COLD OCCLUSION', 11, 'ink', 'middle', bold=True); f.T(200, 46, 'air behind is COLDER than the air ahead: it undercuts', 9.5, 'dim', 'middle')
f.L(30, 250, 370, 250, 'ink', 1.4)
cloud(f, 196, 156, 76, 44, fill=DCLOUD); rain(f, 176, 226, 180, 246, 12)
f.P('M200,250 Q170,170 60,90', 'cool', 2.8); f.P('M174.8,202 Q250,150 350,95', 'hot', 2.8)
f.T(40, 226, 'COLDEST air', 10, 'cool', bold=True); f.T(290, 226, 'cool air', 10, 'cool', bold=True); f.T(200, 104, 'warm air (lifted)', 10, 'hot', 'middle', bold=True)
f.L(385, 20, 385, 280, 'line', 1, dash='3 5')
f.T(570, 30, 'WARM OCCLUSION', 11, 'ink', 'middle', bold=True); f.T(570, 46, 'air behind is LESS COLD than the air ahead: it rides up', 9.5, 'dim', 'middle')
f.L(400, 250, 740, 250, 'ink', 1.4)
cloud(f, 606, 166, 76, 44, fill=DCLOUD); rain(f, 586, 636, 190, 246, 12)
f.P('M560,250 Q650,200 730,100', 'hot', 2.8); f.P('M613,215.5 Q540,160 420,95', 'cool', 2.8)
f.T(420, 226, 'cool air', 10, 'cool', bold=True); f.T(654, 240, 'COLDEST air', 10, 'cool', bold=True); f.T(580, 104, 'warm air (lifted)', 10, 'hot', 'middle', bold=True)
f.T(200, 272, 'cold front (blue) has overtaken the warm front (red)', 9.5, 'dim', 'middle'); f.T(570, 272, 'both diagrams: system moving left to right', 9.5, 'dim', 'middle')
f.L(60, 326, 300, 326, PURP, 2.6)
for i, x in enumerate(range(80, 300, 34)):
    f.raw(f'<path d="M{x-8},326 a8,8 0 0 1 16,0 z" fill="{PURP}"/>' if i % 2 == 0 else f'<path d="M{x-8},326 L{x},314 L{x+8},326 z" fill="{PURP}"/>')
f.T(320, 330, 'occluded front (chart symbol)', 10, 'ink')
f.L(60, 376, 300, 376, 'dim', 2.6)
for i, x in enumerate(range(80, 300, 34)):
    f.raw(f'<path d="M{x-8},376 a8,8 0 0 1 16,0 z" fill="{col("hot")}"/>' if i % 2 == 0 else f'<path d="M{x-8},376 L{x},388 L{x+8},376 z" fill="{col("cool")}"/>')
f.T(320, 380, 'stationary front: little or no movement; symbols on opposite sides', 10, 'ink')
MET.append(f)

# ═══════════════ FPP ═══════════════
BAND = 'g3'
f = Fig('fig_13_01', 'Point of Equal Time (PET) — All Engines', 760, 330,
        'A route from home to destination with the point of equal time marked, showing continuing on at one level or returning home at another',
        '<b>The PET (critical point)</b> is the point on track from which it takes the <b>same time to continue</b> to the destination as to <b>return</b> to the departure aerodrome. It depends only on the ground speeds on and home, not on fuel: <b>distance to PET = D × H ÷ (O + H)</b>, where D is the total distance, H the ground speed home and O the ground speed on. In still air it is the mid-point; with wind it always moves <b>into wind</b>. For the all-engine case the normal cruise TAS is used for both O and H, and the time to reach the PET is found from the ground speed out.')
f.R(60, 98, 640, 24, c='line', sw=1, fill=BAND, rx=4); f.R(60, 198, 352, 24, c='line', sw=1, fill=BAND, rx=4); f.R(388, 110, 24, 100, c='none', sw=0, fill=BAND, rx=0)
f.T(668, 114, 'FL370', 9.5, 'dim', 'end'); f.T(100, 214, 'FL350', 9.5, 'dim')
f.raw(aircraft(220, 108, 0, 0.42, flip=True)); f.raw(aircraft(560, 108, 0, 0.42, flip=True)); f.raw(aircraft(230, 208, 0, 0.42))
f.P('M400,98 L391,78 L409,78 Z', 'hot', 1, 'hot'); f.T(400, 66, 'PET (critical point)', 11, 'hot', 'middle', bold=True)
f.T(54, 114, 'HOME', 10.5, 'ink', 'end', bold=True); f.T(706, 114, 'ON', 10.5, 'ink', bold=True)
f.T(220, 82, 'out to the PET: all-engine GS', 9.5, 'dim', 'middle'); f.T(570, 82, 'O = GS on from the PET', 10, 'cool', 'middle', bold=True)
f.T(230, 244, 'H = GS home from the PET', 10, 'gold', 'middle', bold=True)
f.L(300, 140, 250, 140, 'gold', 2, me='gold'); f.L(480, 140, 530, 140, 'cool', 2, me='cool')
f.R(440, 170, 290, 100, c='gold', sw=1.4, fill='g2')
f.T(452, 192, 'Distance to PET = D × H / (O + H)', 11, 'gold', bold=True)
f.T(452, 210, 'D = total distance, H = GS home, O = GS on', 9.5); f.T(452, 226, 'Time to PET = distance / GS out', 9.5)
f.T(452, 242, 'All-engine TAS is used throughout.', 9.5); f.T(452, 258, 'The PET lies into wind of the mid-point.', 9.5)
f.T(380, 312, 'At the PET it takes the same time to continue as to return.', 10.5, 'ink', 'middle', bold=True)
FPP.append(f)

f = Fig('fig_13_04', 'Point of Equal Time (PET) — Engine Failure', 760, 350,
        'A cruise at flight level 370 to the engine-failure point of equal time, then a drift-down to a lower level either home or on',
        '<b>Engine-failure PET</b> — the same idea, planned for the loss of an engine. After the failure the aircraft cannot hold its cruise level: it <b>drifts down</b> to a lower stabilising level and flies at a lower TAS, whichever way it goes. So O and H are calculated with the <b>engine-failure TAS</b> and the winds at the lower level, which moves the PET. But the aircraft is still on all engines until it gets there, so the <b>time (ETA) at the PET is calculated with the all-engine ground speed</b>.')
STY = f'stroke="{col("g3")}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"'
f.raw(f'<path d="M60,110 L400,110" {STY}/><path d="M400,110 C340,110 330,230 250,230 L60,230" {STY}/><path d="M400,110 C460,110 470,230 550,230 L700,230" {STY}/>')
f.T(96, 114, 'FL370', 9.5, 'dim')
f.raw(aircraft(210, 108, 0, 0.42, flip=True)); f.raw(aircraft(150, 228, 0, 0.42, cross=True)); f.raw(aircraft(620, 228, 0, 0.42, flip=True, cross=True))
f.P('M400,97 L391,77 L409,77 Z', 'hot', 1, 'hot'); f.T(400, 64, 'engine-failure PET', 11, 'hot', 'middle', bold=True)
f.T(210, 82, 'ETA at the PET: all-engine TAS / GS', 9.5, 'dim', 'middle')
f.T(400, 240, 'drift down to the', 9.5, 'dim', 'middle'); f.T(400, 253, 'stabilising flight level', 9.5, 'dim', 'middle')
f.T(150, 264, 'H = GS home, engine-failure TAS', 10, 'gold', 'middle', bold=True); f.T(620, 264, 'O = GS on, engine-failure TAS', 10, 'cool', 'middle', bold=True)
f.T(44, 174, 'HOME', 10.5, 'ink', 'end', bold=True, rot=None); f.T(716, 234, 'ON', 10.5, 'ink', bold=True)
f.T(380, 300, 'Distance to PET = D × H / (O + H), with H and O found from the engine-failure TAS', 10.5, 'gold', 'middle', bold=True)
f.T(380, 318, 'The time to reach the PET is still calculated with the all-engine ground speed.', 10, 'dim', 'middle')
f.T(380, 334, 'A red cross marks the failed engine.', 9.5, 'faint', 'middle')
FPP.append(f)

f = Fig('fig_14_01', 'Point of Safe Return (PSR)', 760, 320,
        'An outbound leg at one flight level to the point of safe return, and the return leg home at another level',
        '<b>The PSR (point of no return)</b> is the furthest point along track to which the aircraft can fly and <b>still return to the departure aerodrome</b> with the required reserves intact. It matters when the destination has no usable alternate. Unlike the PET it depends on <b>fuel</b>: <b>time to PSR = E × H ÷ (O + H)</b>, where E is the safe endurance, O the ground speed out and H the ground speed home. The distance out equals the distance home. Any wind component, head or tail, <b>reduces</b> the distance to the PSR compared with still air.')
f.R(60, 88, 472, 24, c='line', sw=1, fill=BAND, rx=4); f.R(60, 178, 472, 24, c='line', sw=1, fill=BAND, rx=4); f.R(508, 100, 24, 90, c='none', sw=0, fill=BAND, rx=0)
f.L(536, 100, 690, 100, 'faint', 1.6, dash='6 5')
f.T(100, 104, 'FL310', 9.5, 'dim'); f.T(100, 194, 'FL290', 9.5, 'dim')
f.raw(aircraft(290, 98, 0, 0.42, flip=True)); f.raw(aircraft(290, 188, 0, 0.42))
f.P('M520,88 L511,68 L529,68 Z', 'hot', 1, 'hot'); f.T(520, 56, 'PSR: point of safe return', 11, 'hot', 'middle', bold=True)
f.T(290, 72, 'O = GS out to the PSR', 10, 'cool', 'middle', bold=True); f.T(290, 224, 'H = GS home from the PSR', 10, 'gold', 'middle', bold=True)
f.T(54, 150, 'HOME', 10.5, 'ink', 'end', bold=True); f.T(700, 90, 'destination', 10, 'ink', 'end'); f.T(700, 124, '(no alternate available)', 9.5, 'dim', 'end')
f.L(380, 132, 440, 132, 'cool', 2, me='cool'); f.L(440, 158, 380, 158, 'gold', 2, me='gold')
f.T(380, 254, 'Time to PSR = E × H / (O + H)', 11.5, 'gold', 'middle', bold=True)
f.T(380, 272, 'E = safe endurance (fuel available, less reserves), O = GS out, H = GS home', 10, 'dim', 'middle')
f.T(380, 288, 'Distance to PSR = time to PSR × GS out. Distance out = distance home.', 10, 'dim', 'middle')
f.T(380, 306, 'Beyond the PSR the aircraft cannot return to the departure aerodrome with its reserves intact.', 10, 'ink', 'middle')
FPP.append(f)

# ═══════════════ output ═══════════════
def gallery(figs, title, h1, lede, footer, out):
    head = open('instruments-gallery.html').read()
    head = head[:head.index('<header>')].replace('<title>Instruments Gallery</title>', f'<title>{title}</title>').replace('width:100%; background:var(--gold)', 'width:100%; background:var(--gold)')
    body = ''.join(g.html(i + 1) for i, g in enumerate(figs))
    n = len(figs)
    open(out, 'w').write(head + f'<header>\n    <h1>{h1}</h1>\n    <p class="lede">{lede}</p>\n    <div class="prog"><span class="pct">{n} / {n} drawn</span><div class="bar"><i></i></div><span class="pct">complete</span></div>\n  </header>\n'
                         + body + f'\n  <footer>\n    {footer}\n  </footer>\n</div>\n</body></html>')
gallery(MET, 'Meteorology Gallery', 'Meteorology — Illustrations',
        'Original redraws for the 18 Meteorology study sheets. Each sheet is reduced to its key teaching diagram, drawn fresh from the underlying physics, with the facts checked and corrected where the old sheet was wrong. Nothing deploys into the app until you approve it.',
        'Meteorology set complete — 18 of 18 sheets redrawn. Point at anything to change.', 'met-gallery.html')
gallery(FPP, 'Flight Planning Gallery', 'Flight Planning — Illustrations',
        'Original redraws of the three Flight Planning figures (PET and PSR), replacing the textbook scans. Nothing deploys into the app until you approve it.',
        'Flight Planning set complete — 3 of 3 scans replaced. Point at anything to change.', 'fpp-gallery.html')
print(f'met: {len(MET)}  fpp: {len(FPP)}  QA warnings: {len(WARN)}')
for w in WARN: print('  ⚠', w)
