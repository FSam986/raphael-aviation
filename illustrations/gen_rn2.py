#!/usr/bin/env python3
"""Radio Navigation extra figures (A.10)."""
import math
from af_common import *

RN = []
def R_(tag, title, W, H, aria, cap): return Fig('rn_x' + tag, title, W, H, aria, cap)

f = R_('01', 'Frequency and Wavelength', 760, 300, 'A long-wavelength low-frequency wave above a short-wavelength high-frequency wave, with the formula wavelength equals speed of light divided by frequency',
       'Radio waves travel at the speed of light, c ≈ 300 000 km/s. Wavelength λ = c ÷ f: the higher the frequency, the shorter the wavelength. 300 kHz → 1000 m; 300 MHz → 1 m; 3 GHz → 10 cm.')
for i, (y, cyc, t) in enumerate(((90, 2, 'LOW frequency — long wavelength'), (210, 7, 'HIGH frequency — short wavelength'))):
    pts = [(60 + k * 6, y - 40 * math.sin(2 * math.pi * cyc * k / 100)) for k in range(101)]
    f.P('M' + ' L'.join(f'{x:.1f},{yy:.1f}' for x, yy in pts), 'cool' if i else 'gold', 2.4); f.T(380, y + 66, t, 10.5, 'cool' if i else 'gold', 'middle', bold=True)
f.L(60, 40, 360, 40, 'gold', 1.4, me='gold', ms='gold'); f.T(210, 32, 'one wavelength λ', 10, 'gold', 'middle', bold=True)
f.T(620, 44, 'λ = c ÷ f', 18, 'ink', 'middle', bold=True); f.T(620, 66, 'c ≈ 3 × 10⁸ m/s'.replace('⁸', '^8'), 11, 'dim', 'middle')
RN.append(f)

f = R_('02', 'Radio Frequency Bands and Their Navigation Aids', 760, 380, 'Table of radio frequency bands from VLF to EHF with frequency ranges and the navigation and communication systems in each',
       'Each band has typical uses: LF/MF for NDBs (ground wave, long range); HF for long-range communication (sky wave); VHF for VOR, ILS localiser and communication (line of sight); UHF for glide path, DME, SSR and GNSS; SHF for radio altimeters and weather radar.')
rows = [('VLF', '3–30 kHz', '—'), ('LF', '30–300 kHz', 'NDB (from 190 kHz)'), ('MF', '300 kHz–3 MHz', 'NDB (to 1750 kHz), AM broadcast'), ('HF', '3–30 MHz', 'long-range HF communication'),
        ('VHF', '30–300 MHz', 'VOR, ILS LOC, VHF comm (118–137)'), ('UHF', '300 MHz–3 GHz', 'ILS GP, DME, SSR 1030/1090, GPS'), ('SHF', '3–30 GHz', 'radio altimeter, weather radar'), ('EHF', '30–300 GHz', '—')]
table(f, 60, 30, [80, 160, 400], ['Band', 'Frequency', 'Aviation use'], rows, 'gold')
f.T(380, 250 + 50, 'each band is ×10 the one below', 10.5, 'dim', 'middle')
RN.append(f)

f = R_('03', 'Ground Wave, Sky Wave and Space Wave', 760, 360, 'Earth curve with a ground wave following the surface, a sky wave refracted from the ionosphere with skip distance and dead space, and a line-of-sight space wave',
       'LF/MF ground waves follow the Earth’s curvature (NDB range). HF sky waves are refracted back by the ionosphere: the first returning sky wave lands at the skip distance, and the dead space is the gap between the end of the ground wave and that point. VHF and above travel as space waves in line of sight.')
f.P('M40,320 Q380,250 720,320', 'gnd', 4)
f.P('M40,140 Q380,60 720,140', 'line', 1.6, dash='6 4'); f.T(380, 80, 'ionosphere', 10.5, 'dim', 'middle')
f.Ci(120, 304, 6, 'gold', 1, 'gold')
f.P('M120,300 Q200,290 280,288', 'green', 3); f.T(200, 280, 'ground wave', 10.5, 'green', 'middle', bold=True)
f.P('M120,300 L330,102 L540,282', 'hot', 2.4); f.T(560, 270, 'sky wave', 10.5, 'hot', bold=True)
f.L(280, 330, 540, 330, 'gold', 1.4, me='gold', ms='gold'); f.T(410, 350, 'dead space', 10.5, 'gold', 'middle', bold=True)
f.L(120, 230, 300, 200, 'cool', 2.4, me='cool'); f.T(180, 200, 'space wave (LOS)', 10.5, 'cool', bold=True)
f.T(600, 230, 'skip distance:', 10, 'dim'); f.T(600, 244, 'transmitter → first sky wave', 10, 'dim')
RN.append(f)

f = R_('04', 'VHF Line-of-Sight Range', 760, 320, 'Aircraft at height above a curved Earth with the line of sight to a ground station tangent to the surface, and the formula range equals 1.23 times the square root of height',
       'VHF and higher frequencies are limited to line of sight. Maximum range (nm) ≈ 1.23 × (√ transmitter height + √ receiver height), heights in feet. At 10 000 ft over a sea-level station: 1.23 × 100 = 123 nm.')
f.P('M40,300 Q380,180 720,300', 'gnd', 4)
f.R(120, 250, 10, 26, c='ink', sw=1.2, fill='gold', rx=1); f.raw(aircraft(620, 90, s=0.4))
f.L(125, 250, 610, 96, 'cool', 2, dash='6 4'); f.T(380, 140, 'line of sight (tangent to the Earth)', 10.5, 'cool', 'middle', bold=True)
f.T(380, 290, 'range (nm) ≈ 1.23 × (√h₁ + √h₂)'.replace('₁', '1').replace('₂', '2'), 13, 'gold', 'middle', bold=True)
f.T(380, 312, 'heights in feet: 10 000 ft → about 123 nm', 10.5, 'dim', 'middle')
RN.append(f)

f = R_('05', 'ADF Bearings — Relative Bearing to QDM', 760, 360, 'Plan view of an aircraft with its heading, the relative bearing to an NDB measured clockwise from the nose, and the resulting magnetic bearing to the station',
       'The ADF shows the relative bearing (RB) of the NDB, measured clockwise from the aircraft’s nose. Magnetic bearing TO the station (QDM) = magnetic heading + relative bearing (subtract 360 if over 360). QDR (from the station) = QDM ± 180. Example: MH 060° + RB 090° = QDM 150°, QDR 330°.')
f.raw(f'<g transform="translate(300 220) rotate(60) scale(1.1)"><path d="M0,-60 C5,-56 6,-48 6,-40 L6,-8 L58,14 L58,22 L6,10 L5,38 L22,50 L22,56 L0,52 L-22,56 L-22,50 L-5,38 L-6,10 L-58,22 L-58,14 L-6,-8 L-6,-40 C-6,-48 -5,-56 0,-60 Z" fill="#c4d1d6" stroke="#dfeef2" stroke-width="1.4"/></g>')
f.L(300, 220, 300, 60, 'dim', 1.4, dash='4 3'); f.T(300, 50, 'magnetic north', 10, 'dim', 'middle')
hx, hy = pol(300, 220, 150, 60); f.L(300, 220, hx, hy, 'cool', 2, dash='6 3'); f.T(hx + 6, hy, 'heading 060°M', 10.5, 'cool', bold=True)
nx, ny = pol(300, 220, 120, 150); f.L(300, 220, nx, ny, 'hot', 2.4, me='hot'); f.Ci(nx, ny, 8, 'gold', 1.6, 'gold'); f.T(nx + 12, ny + 4, 'NDB', 10.5, 'gold', bold=True)
arcmark(f, 300, 220, 60, 90 - 60, 90 - 150, 'gold', None); f.T(380, 250, 'RB 090°', 10.5, 'gold', bold=True)
f.box(540, 60, 200, 80, ['QDM = MH + RB', '060 + 090 = 150°', 'QDR = 330°'], c='gold', size=10.5)
RN.append(f)

f = R_('06', 'ADF Errors', 760, 360, 'Five ADF errors illustrated: night effect from sky waves, coastal refraction, mountain effect, thunderstorm effect and quadrantal error',
       'Night effect: around dusk and dawn sky waves from the ionosphere interfere with the ground wave — the needle wanders. Coastal refraction: the ground wave bends crossing a coastline at an acute angle (use beacons near the coast, cross at right angles). Mountain effect: reflections from high ground. Thunderstorm effect: the needle points at a Cb. Quadrantal error: signals distorted by the airframe, greatest on the quadrants.')
items = [('NIGHT EFFECT', 'sky + ground wave interfere at dusk/dawn'), ('COASTAL REFRACTION', 'bending crossing the coast at an acute angle'), ('MOUNTAIN EFFECT', 'reflections from high ground'), ('THUNDERSTORM EFFECT', 'needle points towards the Cb'), ('QUADRANTAL ERROR', 'airframe distortion on the quadrants'), ('STATION INTERFERENCE', 'other NDBs on similar frequencies')]
for i, (a, b) in enumerate(items):
    x = 40 + (i % 2) * 360; y = 40 + (i // 2) * 100
    f.box(x, y, 320, 70, [a, b], c=['hot', 'cool', 'gnd', 'gold', 'ink', 'dim'][i] if i != 2 else 'warm', size=11)
f.T(380, 345, 'always identify the NDB (Morse) and check the needle is steady', 10.5, 'dim', 'middle')
RN.append(f)

f = R_('07', 'VOR TO / FROM Indication', 760, 380, 'VOR station with a selected course of 090; the area west of the line perpendicular to the course shows TO and the area east shows FROM, with ambiguity along the perpendicular',
       'The TO/FROM flag shows whether the selected course would take the aircraft TO or FROM the station, regardless of heading. With 090 selected, anywhere west of the line through the station at 000/180 shows TO; east of it shows FROM; near that line the flag is ambiguous (OFF).')
f.L(380, 40, 380, 340, 'dim', 1.6, dash='6 4'); f.T(380, 30, 'ambiguity (000° / 180°)', 10, 'dim', 'middle')
f.R(60, 50, 310, 280, c='none', sw=0, fill='cool', rx=0, op=0.08); f.R(390, 50, 310, 280, c='none', sw=0, fill='gold', rx=0, op=0.08)
f.Ci(380, 190, 10, 'ink', 1.6, 'hot'); f.T(398, 214, 'VOR', 10.5, 'hot', bold=True)
f.L(120, 190, 640, 190, 'gold', 2, me='gold'); f.T(520, 180, 'selected course 090', 10.5, 'gold', bold=True)
f.T(210, 120, 'TO', 22, 'cool', 'middle', bold=True); f.T(560, 120, 'FROM', 22, 'gold', 'middle', bold=True)
RN.append(f)

f = R_('08', 'ILS Coverage', 760, 360, 'Plan view of localiser coverage to 25 nm within 10 degrees and 17 nm within 35 degrees, and glide path coverage 8 degrees either side to 10 nm',
       'Localiser coverage: ±10° of the centreline to 25 nm, and ±35° to 17 nm (from the localiser antenna). Glide path coverage: ±8° in azimuth to 10 nm, vertically from 0.45θ to 1.75θ (θ = glide path angle, normally 3°).')
ox, oy = 680, 190
def wedge(r, a, c_, op):
    p1 = (ox - r * math.cos(math.radians(a)), oy - r * math.sin(math.radians(a))); p2 = (ox - r * math.cos(math.radians(a)), oy + r * math.sin(math.radians(a)))
    f.P(f'M{ox},{oy} L{p1[0]:.1f},{p1[1]:.1f} A{r},{r} 0 0 0 {p2[0]:.1f},{p2[1]:.1f} Z', c_, 1.4, c_, op=op)
wedge(420, 35, 'cool', 0.1); wedge(620, 10, 'gold', 0.15); wedge(250, 8, 'hot', 0.25)
f.L(40, oy, ox, oy, 'line', 1, dash='4 4'); f.R(ox - 4, oy - 20, 8, 40, c='ink', sw=1, fill='steel', rx=0)
f.T(200, 160, '±10° to 25 nm', 10.5, 'gold', bold=True); f.T(380, 70, '±35° to 17 nm', 10.5, 'cool', bold=True); f.T(470, 214, 'GP ±8° to 10 nm', 10.5, 'hot', bold=True)
f.T(380, 340, 'glide path vertical coverage 0.45θ to 1.75θ', 10.5, 'ink', 'middle', bold=True)
RN.append(f)

f = R_('09', 'Glide Path — Height and Rate of Descent', 760, 320, 'A 3 degree glide path with heights of about 300 ft per nautical mile from the threshold and the rule rate of descent equals five times groundspeed',
       'On a 3° glide path the aircraft descends about 300 ft per nm (height ≈ 318 ft × distance in nm, often rounded to 300). Rate of descent (ft/min) ≈ groundspeed (kt) × 5 for 3°. Example: 140 kt groundspeed → about 700 ft/min.')
f.L(60, 270, 720, 270, 'gnd', 3); f.L(660, 270, 80, 70, 'gold', 2.6)
for k, d in enumerate((1, 2, 3, 4, 5)):
    x = 660 - d * 112; y = 270 - d * 38; f.L(x, y, x, 270, 'line', 1, dash='3 3'); f.T(x, 290, f'{d} nm', 10, 'ink', 'middle', bold=True); f.T(x + 6, y - 6, f'{d * 300} ft', 10, 'gold', bold=True)
f.T(500, 60, 'ROD ≈ 5 × groundspeed', 13, 'hot', 'middle', bold=True); f.T(500, 82, '140 kt → ≈ 700 ft/min', 10.5, 'dim', 'middle')
f.T(660, 300, 'threshold', 10, 'dim', 'middle')
RN.append(f)

f = R_('10', 'DME Slant Range', 760, 320, 'An aircraft at height above a DME station with the slant range longer than the ground distance, and directly overhead the DME reading the height',
       'DME measures slant range — the straight-line distance to the station — not ground distance. The error is small at long range but large close to the station; directly overhead the DME shows the aircraft’s height (6080 ft ≈ 1 nm). The error is negligible when the range in nm is greater than the height in thousands of feet.')
f.L(60, 270, 720, 270, 'gnd', 3); f.R(180, 250, 20, 20, c='ink', sw=1.4, fill='gold', rx=2); f.T(190, 292, 'DME', 10.5, 'gold', 'middle', bold=True)
f.raw(aircraft(560, 90, s=0.4, flip=True))
f.L(190, 250, 556, 98, 'hot', 2.4); f.T(360, 150, 'slant range (DME reading)', 10.5, 'hot', 'middle', bold=True)
f.L(190, 270, 560, 270, 'cool', 2, me='cool', ms='cool'); f.T(380, 262, 'ground distance', 10.5, 'cool', 'middle', bold=True)
f.L(560, 98, 560, 268, 'dim', 1.4, dash='4 3'); f.T(570, 190, 'height', 10.5, 'dim', bold=True)
RN.append(f)

f = R_('11', 'Primary Radar — Range and PRF', 760, 320, 'A radar pulse travelling to a target and back, with range equal to the speed of light times the time divided by two, and maximum range set by the pulse repetition frequency',
       'Primary radar measures range from the echo time: range = c × t ÷ 2 (the pulse goes out and back). One radar mile ≈ 12.36 µs. The maximum unambiguous range is set by the pulse repetition frequency: max range = c ÷ (2 × PRF) — e.g. PRF 1000 pps → about 81 nm.')
f.R(60, 200, 40, 40, c='ink', sw=1.4, fill='steel', rx=4); f.P('M80,200 L60,160 L100,160 Z', 'ink', 1.4, '#a9bac1')
f.raw(aircraft(600, 120, s=0.4, flip=True))
f.L(110, 180, 560, 126, 'hot', 2.4, me='hot'); f.L(560, 140, 110, 194, 'cool', 2.4, me='cool', dash='6 4')
f.T(330, 132, 'pulse out', 10.5, 'hot', 'middle', bold=True); f.T(330, 212, 'echo back', 10.5, 'cool', 'middle', bold=True)
f.T(380, 270, 'range = c × t ÷ 2        max range = c ÷ (2 × PRF)', 12, 'gold', 'middle', bold=True)
f.T(380, 296, '1 radar nm ≈ 12.36 µs', 10.5, 'dim', 'middle')
RN.append(f)

f = R_('12', 'SSR — Interrogation and Reply', 760, 320, 'A ground SSR interrogator transmitting on 1030 MHz and an aircraft transponder replying on 1090 MHz with Mode A identity, Mode C altitude or Mode S data',
       'Secondary radar interrogates the aircraft transponder on 1030 MHz; the transponder replies on 1090 MHz. Mode A gives the 4-digit identity code (4096 codes), Mode C adds pressure altitude in 100 ft steps, Mode S adds a unique 24-bit address and data link (used by TCAS and ADS-B).')
f.R(60, 200, 40, 50, c='ink', sw=1.4, fill='steel', rx=4); f.T(80, 274, 'SSR interrogator', 10.5, 'ink', 'middle', bold=True)
f.raw(aircraft(600, 110, s=0.45, flip=True)); f.T(600, 160, 'transponder', 10.5, 'ink', 'middle', bold=True)
f.L(110, 200, 550, 116, 'gold', 2.4, me='gold'); f.T(320, 140, '1030 MHz interrogation', 10.5, 'gold', 'middle', bold=True)
f.L(550, 132, 110, 216, 'cool', 2.4, me='cool'); f.T(360, 210, '1090 MHz reply', 10.5, 'cool', 'middle', bold=True)
table(f, 240, 236, [90, 330], ['Mode', 'Reply'], [('A', 'identity code (4096 codes)'), ('C', 'pressure altitude, 100 ft steps'), ('S', '24-bit address + data link')], 'gold')
RN.append(f)

f = R_('13', 'Weather Radar Tilt', 760, 320, 'An aircraft with its weather radar beam tilted up and down: too low paints the ground, correct tilt paints the storm core, too high overshoots the top',
       'The antenna tilt sets where the pencil beam looks. Tilted too far down the beam returns ground clutter; too far up it passes over the storm and under-reads it. Scan the full tilt range regularly, and remember the most reflective part of a storm is the rain core below the freezing level — dry hail and the top return weakly.')
f.L(40, 300, 720, 300, 'gnd', 3); f.raw(aircraft(110, 150, s=0.4, flip=True))
tower(f, 560, 300, 70, 120, anvil=90)
for ang, c_, t in ((-4, 'cool', 'correct tilt: rain core'), (12, 'dim', 'too high: overshoots'), (-18, 'hot', 'too low: ground clutter')):
    a = math.radians(ang); f.L(140, 152, 140 + 520 * math.cos(a), 152 - 520 * math.sin(a), c_, 2, dash='6 3')
    f.T(140 + 200 * math.cos(a), 152 - 200 * math.sin(a) - 10, t, 10.5, c_, 'middle', bold=True)
RN.append(f)

f = R_('14', 'Radio Altimeter Principle', 760, 300, 'Aircraft transmitting a frequency-modulated signal to the ground and receiving the reflection, the frequency difference giving the height',
       'The radio altimeter transmits a frequency-modulated continuous wave (4.2–4.4 GHz) straight down. Because the transmitted frequency is changing, the reflected signal returns at a slightly different frequency; the difference is proportional to the time taken and so to the height above the surface. Typically used from 0 to 2500 ft.')
f.L(40, 270, 720, 270, 'gnd', 3); f.raw(aircraft(380, 80, s=0.5, flip=True))
f.L(360, 100, 360, 266, 'hot', 2.4, me='hot'); f.L(400, 266, 400, 100, 'cool', 2.4, me='cool', dash='6 3')
f.T(350, 190, 'transmitted (FMCW)', 10.5, 'hot', 'end', bold=True); f.T(410, 190, 'reflected', 10.5, 'cool', bold=True)
f.T(600, 130, '4.2–4.4 GHz', 12, 'gold', 'middle', bold=True); f.T(600, 156, 'Δf proportional to height'.replace('Δ', 'freq. diff '), 10.5, 'ink', 'middle', bold=True); f.T(600, 178, '0–2500 ft', 10.5, 'dim', 'middle')
RN.append(f)

f = R_('15', 'GNSS Position Fix', 760, 360, 'Four satellites with range spheres intersecting at the receiver, giving latitude, longitude, altitude and the receiver clock error',
       'A GNSS receiver measures its range to each satellite from the signal travel time. Three ranges fix a position in space, but the receiver clock is not accurate enough, so a fourth satellite is needed to solve for the clock error: 4 satellites → 3D position + time. RAIM (integrity monitoring) needs 5, and 6 to exclude a faulty satellite. GPS L1 is 1575.42 MHz.')
rx, ry = 380, 280
for i, (sx, sy) in enumerate(((120, 70), (300, 40), (480, 50), (650, 90))):
    f.Ci(sx, sy, 10, 'ink', 1.4, 'gold'); f.L(sx - 16, sy, sx + 16, sy, 'gold', 4); r = math.hypot(rx - sx, ry - sy)
    f.L(sx, sy, rx, ry, 'cool', 1.4, dash='5 3'); f.T(sx, sy - 18, f'SV{i + 1}', 10, 'gold', 'middle', bold=True)
f.Ci(rx, ry, 8, 'ink', 1.4, 'hot'); f.T(rx, ry + 30, 'receiver', 10.5, 'hot', 'middle', bold=True)
f.T(740, 250, '4 satellites: 3D position + clock', 10.5, 'ink', 'end', bold=True); f.T(740, 270, '5 for RAIM, 6 to exclude a fault', 10.5, 'dim', 'end', bold=True)
RN.append(f)

f = R_('16', 'RNAV Waypoint from VOR/DME (Rho-Theta)', 760, 320, 'A VOR/DME station with a waypoint defined by a radial and distance, the RNAV computer giving track and distance from the aircraft to the waypoint',
       'Basic area navigation uses a VOR/DME (rho-theta) to define a phantom waypoint by radial and distance. The RNAV computer solves the triangle between the station, the aircraft and the waypoint and gives track, distance and cross-track guidance direct to the waypoint. Modern FMS combine DME/DME, GNSS and IRS.')
sx, sy = 200, 220
f.Ci(sx, sy, 10, 'ink', 1.6, 'hot'); f.T(sx, sy + 28, 'VOR/DME', 10.5, 'hot', 'middle', bold=True)
wx, wy = pol(sx, sy, 300, 60); f.L(sx, sy, wx, wy, 'gold', 2); f.Ci(wx, wy, 8, 'gold', 1.6, 'none'); f.T(wx + 12, wy, 'waypoint: R060 / 40 nm', 10.5, 'gold', bold=True)
f.raw(aircraft(200, 80, s=0.4, flip=True)); f.L(230, 84, wx - 8, wy, 'cool', 2.4, me='cool'); f.T(400, 66, 'RNAV track direct', 10.5, 'cool', 'middle', bold=True)
f.L(sx, sy, 200, 92, 'dim', 1.2, dash='4 3'); arcmark(f, sx, sy, 50, 90, 30, 'gold', None)
RN.append(f)

f = R_('17', 'RNP — Navigation Accuracy', 760, 300, 'A track with the RNP lateral accuracy limit either side, within which the aircraft must remain 95 per cent of the flight time, and the containment limit at twice the RNP value',
       'RNP x: the total system error must be within ±x nm of the desired track for at least 95% of the flight time (e.g. RNP 1 = ±1 nm). Containment is at twice the RNP value. RNP (unlike RNAV) also requires on-board performance monitoring and alerting.')
f.R(60, 90, 640, 120, c='none', sw=0, fill='gold', rx=0, op=0.1); f.R(60, 120, 640, 60, c='none', sw=0, fill='cool', rx=0, op=0.2)
f.L(60, 150, 700, 150, 'ink', 2.4, me='ink'); f.T(380, 142, 'desired track', 10.5, 'ink', 'middle', bold=True)
f.T(710, 124, '±RNP (95%)', 10.5, 'cool', 'end', bold=True); f.T(710, 98, '±2 × RNP containment', 10.5, 'gold', 'end', bold=True)
f.P('M60,160 Q200,140 320,156 Q480,168 700,148', 'hot', 1.8); f.T(380, 250, 'RNP 1 → within ±1 nm for 95% of the time', 11, 'gold', 'middle', bold=True)
RN.append(f)

f = R_('18', 'ELT and Cospas-Sarsat', 760, 320, 'An ELT transmitting on 406 MHz to Cospas-Sarsat satellites which relay to a ground station and rescue centre, and on 121.5 MHz for homing',
       'A 406 MHz ELT sends a digitally coded message (identity and, if equipped, GNSS position) to the Cospas-Sarsat satellites, which relay it via ground stations to a rescue coordination centre. The 121.5 MHz signal is used by search aircraft for homing. ELTs activate automatically on impact (g-switch) or manually.')
f.L(40, 280, 720, 280, 'gnd', 3); f.R(130, 250, 40, 30, c='ink', sw=1.4, fill='hot', rx=4); f.T(150, 302, 'ELT', 10.5, 'hot', 'middle', bold=True)
f.Ci(380, 60, 12, 'ink', 1.4, 'gold'); f.L(358, 60, 402, 60, 'gold', 5); f.T(380, 36, 'Cospas-Sarsat satellite', 10.5, 'gold', 'middle', bold=True)
f.L(160, 248, 372, 72, 'hot', 2.2, me='hot'); f.T(220, 160, '406 MHz (coded ID + position)', 10.5, 'hot', 'end', bold=True)
f.L(390, 72, 580, 248, 'gold', 2.2, me='gold'); f.R(560, 250, 60, 30, c='ink', sw=1.4, fill='steel', rx=3); f.T(590, 302, 'ground station → RCC', 10.5, 'ink', 'middle', bold=True)
f.raw(aircraft(300, 220, s=0.3, flip=True)); f.P('M170,262 Q230,240 280,226', 'cool', 1.6, dash='4 3'); f.T(240, 268, '121.5 MHz homing', 10, 'cool', bold=True)
RN.append(f)

if __name__ == '__main__':
    gallery(RN, 'Radio Nav Gallery 2', 'Radio Navigation — Additional Figures', 'Original figures for radio waves and bands, ADF, VOR, ILS, DME, radar, SSR, radio altimeter, GNSS, RNAV and ELT.', 'rn2-gallery.html')
    print(len(RN), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
