#!/usr/bin/env python3
"""Air Law extra figures (A.3): rules of the air, signals, aerodromes, airspace, altimetry, DG."""
import math
from af_common import *

AL = []
def A(tag, title, W, H, aria, cap): return Fig('al_' + tag, title, W, H, aria, cap)
def plan(f, x, y, hdg, s=0.5, c='#c4d1d6'):
    f.raw(f'<g transform="translate({x} {y}) rotate({hdg}) scale({s})"><path d="M0,-60 C5,-56 6,-48 6,-40 L6,-8 L58,14 L58,22 L6,10 L5,38 L22,50 L22,56 L0,52 L-22,56 L-22,50 L-5,38 L-6,10 L-58,22 L-58,14 L-6,-8 L-6,-40 C-6,-48 -5,-56 0,-60 Z" fill="{col(c)}" stroke="#dfeef2" stroke-width="{1.6 / s:.1f}"/></g>')

# right of way
f = A('x01', 'Right of Way — Converging, Head-On and Overtaking', 760, 360, 'Three plan-view encounters: converging aircraft where the one with the other on its right gives way, head-on aircraft both turning right, and an overtaking aircraft passing to the right',
      'Converging at about the same level: the aircraft that has the other on its RIGHT gives way. Head-on: both alter heading to the RIGHT. Overtaking (approaching from within 70° of the other’s tail): the aircraft being overtaken has right of way and the overtaking aircraft alters heading to the RIGHT to pass.')
plan(f, 90, 220, 90, 0.55, 'hot'); plan(f, 200, 300, 0, 0.55, '#c4d1d6')
f.P('M110,226 Q150,250 160,320', 'hot', 2, me='hot', dash='5 3'); f.T(130, 70, 'CONVERGING', 11, 'gold', 'middle', bold=True)
f.T(130, 100, 'red has the other on its right:', 10, 'hot', 'middle', bold=True); f.T(130, 114, 'red gives way (turns right, behind)', 10, 'hot', 'middle', bold=True)
plan(f, 380, 130, 180, 0.55); plan(f, 380, 290, 0, 0.55)
f.P('M380,160 Q370,190 350,200', 'gold', 2, me='gold'); f.P('M380,260 Q390,230 410,220', 'gold', 2, me='gold')
f.T(380, 70, 'HEAD-ON', 11, 'gold', 'middle', bold=True); f.T(380, 340, 'both turn right', 10.5, 'ink', 'middle', bold=True)
plan(f, 620, 130, 0, 0.55); plan(f, 620, 290, 0, 0.55, 'hot')
f.P('M620,260 Q660,230 660,170', 'hot', 2, me='hot', dash='5 3'); f.T(620, 70, 'OVERTAKING', 11, 'gold', 'middle', bold=True)
f.T(620, 340, 'overtaker (red) passes to the right', 10.5, 'ink', 'middle', bold=True)
AL.append(f)

f = A('x02', 'Right of Way — Order of Precedence', 760, 300, 'Ladder showing that power-driven aeroplanes give way to airships, which give way to gliders, which give way to balloons, and that all give way to aircraft towing or landing',
      'Converging aircraft of different categories: power-driven heavier-than-air aircraft give way to airships, gliders and balloons; airships give way to gliders and balloons; gliders give way to balloons. Power-driven aircraft also give way to aircraft seen to be towing other aircraft or objects. An aircraft in flight or on the ground gives way to an aircraft landing or on final approach.')
for i, (t, c_) in enumerate((('Power-driven aeroplanes / helicopters', 'dim'), ('Airships', 'cool'), ('Gliders', 'gold'), ('Balloons', 'hot'))):
    y = 220 - i * 50; f.box(200, y, 360, 40, [t], c=c_, size=10.5)
    if i < 3: f.L(380, y, 380, y - 8, 'ink', 1.6, me='ink')
f.T(580, 244, 'gives way to', 10, 'dim'); f.T(580, 94, 'right of way', 10, 'hot', bold=True)
f.T(380, 290, 'all give way to aircraft landing or on final approach', 10.5, 'ink', 'middle', bold=True)
AL.append(f)

# light signals
def lights_fig(tag, title, rows, aria, cap):
    f = A(tag, title, 760, 340, aria, cap)
    f.R(40, 40, 680, 34, c='gold', sw=1.4, fill='g3', rx=3); f.T(60, 62, 'Light signal from ATC', 11, 'gold', bold=True); f.T(330, 62, 'Meaning', 11, 'gold', bold=True)
    for i, (col_, flash, t) in enumerate(rows):
        y = 80 + i * 48; f.R(40, y, 680, 44, c='line', sw=0.8, fill='g2' if i % 2 == 0 else 'bg', rx=0)
        if flash:
            for k in range(3): f.Ci(70 + k * 26, y + 22, 8, 'ink', 1, col_)
            f.T(160, y + 26, 'flashing', 10.5, 'ink', bold=True)
        else: f.Ci(84, y + 22, 13, 'ink', 1, col_); f.T(160, y + 26, 'steady', 10.5, 'ink', bold=True)
        f.T(330, y + 26, t, 10.5, 'ink', bold=True)
    AL.append(f)
lights_fig('x03', 'ATC Light Signals — Aircraft in Flight', [('green', False, 'Cleared to land'), ('hot', False, 'Give way to other aircraft and continue circling'), ('green', True, 'Return for landing (landing clearance to follow)'), ('hot', True, 'Aerodrome unsafe, do not land'), ('white', True, 'Land at this aerodrome and proceed to the apron')],
    'Table of light signals to aircraft in flight: steady green, steady red, flashing green, flashing red and flashing white with their meanings',
    'Light signals from the control tower (ICAO Annex 2, applied in SA). A red pyrotechnic means: notwithstanding any previous instructions, do not land for the time being. Acknowledge in flight by rocking the wings (daytime) or flashing the landing lights (night).')
lights_fig('x04', 'ATC Light Signals — Aircraft on the Ground', [('green', False, 'Cleared for take-off'), ('hot', False, 'Stop'), ('green', True, 'Cleared to taxi'), ('hot', True, 'Taxi clear of the landing area in use'), ('white', True, 'Return to starting point on the aerodrome')],
    'Table of light signals to aircraft on the ground: steady green, steady red, flashing green, flashing red and flashing white with their meanings',
    'On the ground the same colours mean different things. Acknowledge by moving the ailerons or rudder (daytime) or flashing the landing or navigation lights (night). Flashing runway or taxiway lights mean vacate the landing area and watch the tower for signals.')

f = A('x05', 'Transponder Emergency Codes', 760, 260, 'Three transponder code boxes: 7500 unlawful interference, 7600 radio communication failure and 7700 emergency',
      'Special SSR codes: 7500 — unlawful interference (hijack); 7600 — radio communication failure; 7700 — emergency. Avoid passing through these codes when changing the code, and select ALT so that pressure altitude is reported.')
for i, (code, t, c_) in enumerate((('7500', 'Unlawful interference', 'hot'), ('7600', 'Radio failure', 'gold'), ('7700', 'Emergency', 'hot'))):
    x = 60 + i * 230; f.R(x, 60, 180, 90, c=c_, sw=2, fill='black', rx=8); f.T(x + 90, 118, code, 30, c_, 'middle', bold=True, check=False); f.T(x + 90, 180, t, 11.5, 'ink', 'middle', bold=True)
f.T(380, 230, 'mode C / S: select ALT so pressure altitude is transmitted', 10.5, 'dim', 'middle')
AL.append(f)

f = A('x06', 'Minimum Heights', 760, 320, 'A congested area with an aircraft at least 1000 ft above the highest obstacle within 600 metres, and open country with an aircraft at least 500 ft above the surface',
      'Except for take-off and landing or with approval: over congested areas of cities, towns or settlements or an open-air assembly of people, at least 1000 ft above the highest obstacle within a radius of 600 m of the aircraft; elsewhere at least 500 ft above the ground or water. Always high enough to land without undue hazard if a power unit fails. Check CAR Part 91 for the current text.')
f.L(20, 280, 740, 280, 'gnd', 3)
for x, h in ((80, 60), (110, 90), (140, 70), (170, 120), (200, 80), (230, 100), (260, 60)): f.R(x, 280 - h, 24, h, c='ink', sw=1, fill='steel', rx=0)
f.raw(aircraft(180, 60, s=0.5, flip=True))
f.L(182, 70, 182, 158, 'gold', 1.6, me='gold', ms='gold'); f.T(192, 118, '≥ 1000 ft above highest obstacle', 10.5, 'gold', bold=True)
f.P('M40,90 L320,90', 'cool', 1.2, dash='4 3'); f.T(180, 30, 'within 600 m radius', 10.5, 'cool', 'middle', bold=True)
f.T(170, 310, 'CONGESTED AREA', 11, 'ink', 'middle', bold=True)
f.raw(aircraft(560, 180, s=0.5, flip=True)); f.L(562, 190, 562, 276, 'gold', 1.6, me='gold', ms='gold'); f.T(572, 236, '≥ 500 ft AGL', 10.5, 'gold', bold=True)
f.T(560, 310, 'ELSEWHERE', 11, 'ink', 'middle', bold=True)
AL.append(f)

f = A('x07', 'Altimeter Settings — QFE, QNH and Standard', 760, 340, 'An aircraft over an aerodrome with QFE reading height above the aerodrome, QNH reading altitude above mean sea level and 1013.25 hPa reading flight level',
      'QFE: the altimeter reads height above the aerodrome (zero on the runway). QNH: it reads altitude above mean sea level (aerodrome elevation on the runway). Standard setting 1013.25 hPa: it reads pressure altitude, used as flight levels above the transition altitude.')
f.L(40, 300, 720, 300, 'cool', 2); f.T(700, 292, 'mean sea level', 10, 'cool', 'end')
f.P('M200,220 L560,220 L600,300 L160,300 Z', 'none', 0, 'gnd', op=0.6); f.L(220, 220, 540, 220, 'ink', 4); f.T(380, 240, 'aerodrome', 10, 'white', 'middle', bold=True, check=False)
f.raw(aircraft(380, 90, s=0.5, flip=True))
f.L(330, 100, 330, 218, 'gold', 1.6, me='gold', ms='gold'); f.T(320, 160, 'QFE: height', 10.5, 'gold', 'end', bold=True)
f.L(430, 100, 430, 298, 'green', 1.6, me='green', ms='green'); f.T(440, 200, 'QNH: altitude', 10.5, 'green', bold=True)
f.L(560, 100, 560, 30, 'line', 1, dash='3 3'); f.L(40, 30, 720, 30, 'hot', 1.4, dash='6 4'); f.T(60, 24, '1013.25 hPa pressure datum (may be above or below MSL)', 10, 'hot', bold=True)
f.T(570, 70, '1013: flight level', 10.5, 'hot', bold=True)
AL.append(f)

f = A('x08', 'Controlled Airspace Structure', 760, 360, 'Cross-section of an aerodrome with its control zone from the surface, a terminal control area above with a base and upper limit, and an airway joining it',
      'The control zone (CTR) extends from the surface to protect arrivals and departures; the terminal control area (TMA) above it has a defined base and upper limit; airways and control areas (CTA) link them. Limits and classes are published in the SA AIP (ENR section).')
f.L(20, 310, 740, 310, 'gnd', 3); f.R(340, 300, 80, 10, c='ink', sw=1, fill='steel', rx=0); f.T(380, 334, 'aerodrome', 10.5, 'ink', 'middle', bold=True)
f.R(280, 200, 200, 110, c='cool', sw=2, fill='cool', rx=0, op=0.25); f.T(380, 260, 'CTR', 13, 'cool', 'middle', bold=True); f.T(380, 280, 'surface → upper limit', 10, 'ink', 'middle')
f.P('M120,200 L640,200 L640,70 L120,70 Z', 'gold', 2, 'gold', op=0.12); f.T(380, 130, 'TMA', 13, 'gold', 'middle', bold=True); f.T(380, 150, 'base above the surface', 10, 'ink', 'middle')
f.R(640, 110, 120, 50, c='hot', sw=1.6, fill='hot', rx=0, op=0.2); f.T(700, 104, 'airway', 10.5, 'hot', 'middle', bold=True)
f.T(60, 300, 'uncontrolled (class G) below the TMA, outside the CTR', 10, 'dim')
AL.append(f)

f = A('x09', 'ICAO Airspace Classes and Services', 760, 260, 'Table of airspace classes A to G showing flights permitted, separation provided and whether clearance is required',
      'ICAO airspace classes. A: IFR only, all separated. C: IFR separated from IFR and VFR; VFR gets traffic information on other VFR. F: advisory service to IFR. G: flight information service only. South Africa uses mainly classes A, C, F and G — always check the AIP for current classification.')
rows = [('A', 'IFR only', 'all flights', 'yes'), ('B', 'IFR and VFR', 'all flights', 'yes'), ('C', 'IFR and VFR', 'IFR from IFR and VFR', 'yes'), ('D', 'IFR and VFR', 'IFR from IFR', 'yes'),
        ('E', 'IFR and VFR', 'IFR from IFR', 'IFR only'), ('F', 'IFR and VFR', 'IFR from IFR as far as practical', 'no'), ('G', 'IFR and VFR', 'none (FIS only)', 'no')]
table(f, 40, 30, [70, 160, 300, 150], ['Class', 'Flights', 'Separation provided', 'ATC clearance'], rows, 'gold')
f.T(380, 240, 'South Africa: mainly classes A, C, F and G (check the AIP)', 10.5, 'gold', 'middle', bold=True)
AL.append(f)

f = A('x10', 'Accident, Serious Incident or Incident?', 760, 360, 'Decision flow: death or serious injury, substantial damage or missing aircraft means accident; an occurrence where an accident nearly happened is a serious incident; otherwise an incident',
      'Accident: between boarding with intention of flight and disembarking, a person is fatally or seriously injured, the aircraft sustains damage or structural failure that adversely affects it and would normally need major repair, or it is missing. Serious incident: circumstances indicating an accident nearly occurred. Incident: any other occurrence affecting the safety of operation. Report to the SACAA as required by CAR Part 12.')
N = {}
node(f, N, 'q1', 40, 30, 300, 60, ['Fatal or serious injury?', 'Substantial damage? Missing?'], 'hot', 10)
node(f, N, 'acc', 460, 30, 260, 60, ['ACCIDENT'], 'hot', 12)
node(f, N, 'q2', 40, 150, 300, 60, ['Did an accident nearly occur?'], 'gold', 10)
node(f, N, 'si', 460, 150, 260, 60, ['SERIOUS INCIDENT'], 'gold', 12)
node(f, N, 'inc', 40, 270, 300, 60, ['INCIDENT', 'other safety occurrence'], 'cool', 11)
conn(f, N, 'q1', 'acc', 'hot', label='yes'); conn(f, N, 'q1', 'q2', 'dim', label='no'); conn(f, N, 'q2', 'si', 'gold', label='yes'); conn(f, N, 'q2', 'inc', 'dim', label='no')
f.T(460, 300, 'report to the SACAA (CAR Part 12)', 10.5, 'ink', bold=True)
AL.append(f)

# aerodrome
f = A('x11', 'Runway Markings', 760, 360, 'Plan view of an instrument runway end with threshold stripes, runway designation, centreline, touchdown zone and aiming point markings and edge lines',
      'Runway markings are white. From the threshold: threshold stripes (number depends on runway width), the designation number (magnetic heading to the nearest 10°, e.g. 047° → 05, with L/C/R for parallels), the dashed centreline, touchdown zone markings in pairs and the large aiming point markings, plus side stripes along the edges.')
f.R(40, 120, 680, 140, c='ink', sw=1, fill='#3b4246', rx=0)
for k in range(8): f.R(54, 128 + k * 16, 60, 10, c='none', sw=0, fill='white', rx=0)
f.raw('<text x="160" y="190" font-family="Overpass,sans-serif" font-size="40" font-weight="700" fill="#fff" transform="rotate(90 160 190)" text-anchor="middle">05</text>')
for x in range(220, 720, 50): f.R(x, 188, 28, 4, c='none', sw=0, fill='white', rx=0)
for x in (300, 420):
    for y in (140, 230): f.R(x, y, 50, 8, c='none', sw=0, fill='white', rx=0)
for y in (150, 218): f.R(500, y, 110, 14, c='none', sw=0, fill='white', rx=0)
f.L(40, 124, 720, 124, 'white', 2); f.L(40, 256, 720, 256, 'white', 2)
for (x, t) in ((84, 'threshold'), (160, 'designation'), (330, 'touchdown zone'), (555, 'aiming point')): f.T(x, 100, t, 10.5, 'gold', 'middle', bold=True); f.L(x, 106, x, 122, 'gold', 1)
f.T(660, 290, 'centreline (dashed)', 10.5, 'gold', 'middle', bold=True); f.T(240, 290, 'side stripes', 10.5, 'gold', 'middle', bold=True)
f.T(380, 330, 'all runway markings white; taxiway markings yellow', 10.5, 'ink', 'middle', bold=True)
AL.append(f)

f = A('x12', 'Runway and Taxiway Lighting Colours', 760, 380, 'Plan view of a runway with green threshold lights, white edge lights turning yellow in the last 600 metres, red runway end lights, centreline lights becoming red and white then red, and blue taxiway edge and green taxiway centreline lights',
      'Threshold: green (towards the approaching aircraft). Runway end: red. Edge lights: white, but yellow over the last 600 m (or third) on instrument runways. Centreline: white, then alternate red and white from 900 m to 300 m from the end, then red for the last 300 m. Taxiway: blue edge lights, green centreline lights; stop bars red.')
f.R(60, 120, 640, 100, c='ink', sw=1, fill='#3b4246', rx=0)
for k in range(7): f.Ci(64, 128 + k * 14, 4, 'green', 0.8, 'green'); f.Ci(696, 128 + k * 14, 4, 'hot', 0.8, 'hot')
for x in range(90, 700, 30):
    c_ = 'white' if x < 560 else 'amber'
    f.Ci(x, 120, 3.5, 'ink', 0.6, c_); f.Ci(x, 220, 3.5, 'ink', 0.6, c_)
for x in range(80, 700, 15):
    c_ = 'white' if x < 520 else ('hot' if x > 640 or (x // 15) % 2 else 'white')
    f.Ci(x, 170, 2.5, 'ink', 0.4, c_)
f.L(300, 220, 300, 330, 'line', 0.1); f.R(290, 220, 20, 110, c='none', sw=0, fill='#3b4246', rx=0)
for y in range(236, 330, 18): f.Ci(286, y, 3.5, 'ink', 0.6, 'cool'); f.Ci(314, y, 3.5, 'ink', 0.6, 'cool'); f.Ci(300, y + 9, 2.5, 'ink', 0.4, 'green')
f.L(282, 240, 318, 240, 'hot', 3)
for x, t, c_ in ((64, 'threshold: green', 'green'), (700, 'end: red', 'hot'), (560, 'edge: yellow last 600 m', 'amber'), (300, 'edge: white', 'white')): f.T(x, 100, t, 10, c_, 'middle', bold=True)
f.T(570, 250, 'centreline: red/white 900–300 m, red last 300 m', 10, 'hot', 'middle', bold=True)
f.T(330, 300, 'taxiway: blue edge, green centreline', 10, 'cool', bold=True); f.T(330, 250, 'stop bar: red', 10, 'hot', bold=True)
f.T(380, 365, 'landing direction →', 10.5, 'dim', 'middle')
AL.append(f)

f = A('x13', 'Ground Signals in the Signals Area', 760, 380, 'Signals-area panels: red square with yellow diagonals, red square with one yellow diagonal, white dumb-bell, dumb-bell with black stripes, white landing T, double white cross and right-hand traffic arrow',
      'Ground signals displayed in the signals area (ICAO Annex 2): red square with yellow diagonals — landing prohibited; one yellow diagonal — special precautions in approach and landing; white dumb-bell — use hard surfaces only; dumb-bell with black bars — take-off and land on runways only, other manoeuvres need not be on hard surfaces; landing T — land and take off towards the cross-bar; double white cross — glider flying in progress; right-turn arrow — right-hand circuit.')
cells = [(80, 'landing prohibited'), (260, 'special precautions'), (440, 'hard surfaces only'), (620, 'runways only (land / T-O)'), (80, 'land towards cross-bar'), (260, 'glider flying'), (440, 'right-hand circuit'), (620, 'ATC reporting point')]
for i, (x, t) in enumerate(cells):
    y = 70 if i < 4 else 230; cx, cy = x, y + 40
    f.R(cx - 70, y, 140, 90, c='line', sw=1, fill='#3a6b2f', rx=4)
    if i in (0, 1):
        f.R(cx - 34, cy - 34, 68, 68, c='none', sw=0, fill='hot', rx=0); f.L(cx - 34, cy - 34, cx + 34, cy + 34, 'gold', 6)
        if i == 0: f.L(cx - 34, cy + 34, cx + 34, cy - 34, 'gold', 6)
    if i in (2, 3):
        f.R(cx - 40, cy - 6, 80, 12, c='none', sw=0, fill='white', rx=0); f.Ci(cx - 40, cy, 16, 'none', 0, 'white'); f.Ci(cx + 40, cy, 16, 'none', 0, 'white')
        if i == 3: f.L(cx - 40, cy - 14, cx - 40, cy + 14, 'black', 4); f.L(cx + 40, cy - 14, cx + 40, cy + 14, 'black', 4)
    if i == 4: f.R(cx - 40, cy - 34, 80, 12, c='none', sw=0, fill='white', rx=0); f.R(cx - 6, cy - 22, 12, 56, c='none', sw=0, fill='white', rx=0)
    if i == 5:
        for dx in (-22, 22): f.L(cx + dx - 16, cy - 16, cx + dx + 16, cy + 16, 'white', 6); f.L(cx + dx - 16, cy + 16, cx + dx + 16, cy - 16, 'white', 6)
    if i == 6: f.P(f'M{cx - 36},{cy + 20} L{cx - 36},{cy - 10} L{cx + 10},{cy - 10} L{cx + 10},{cy - 24} L{cx + 36},{cy} L{cx + 10},{cy + 24} L{cx + 10},{cy + 10} L{cx - 18},{cy + 10} L{cx - 18},{cy + 20} Z', 'none', 0, 'hot')
    if i == 7:
        for r in range(4):
            for c in range(4):
                if (r + c) % 2 == 0: f.R(cx - 32 + c * 16, cy - 32 + r * 16, 16, 16, c='none', sw=0, fill='hot', rx=0)
                else: f.R(cx - 32 + c * 16, cy - 32 + r * 16, 16, 16, c='none', sw=0, fill='gold', rx=0)
    f.T(cx, y + 110, t, 10, 'ink', 'middle', bold=True)
AL.append(f)

def marshaller(f, cx, kind, label):
    y0 = 90
    f.Ci(cx, y0, 14, 'ink', 1.6, 'g3'); f.L(cx, y0 + 14, cx, y0 + 80, 'ink', 4); f.L(cx, y0 + 80, cx - 20, y0 + 140, 'ink', 4); f.L(cx, y0 + 80, cx + 20, y0 + 140, 'ink', 4)
    sh = (cx, y0 + 30)
    arms = {'ident': [(-10, -70), (10, -70)], 'ahead': [(-30, -30), (30, -30)], 'stop': [(30, -70), (-30, -70)], 'slow': [(-40, 40), (40, 40)]}[kind]
    for dx, dy in arms:
        ex, ey = sh[0] + dx, sh[1] + dy; f.L(sh[0], sh[1], ex, ey, 'ink', 4); f.L(ex, ey, ex + dx * 0.4, ey + (dy * 0.4 if kind != 'ahead' else -20), 'amber', 6, cap='round')
    if kind == 'ahead': f.L(cx + 50, y0 - 10, cx + 50, y0 + 40, 'gold', 1.6, me='gold', ms='gold')
    if kind == 'slow': f.L(cx + 60, y0 + 50, cx + 60, y0 + 90, 'gold', 1.6, me='gold', ms='gold')
    f.T(cx, 270, label[0], 11, 'gold', 'middle', bold=True); f.T(cx, 286, label[1], 9.5, 'ink', 'middle')
f = A('x14', 'Marshalling Signals (Selected)', 760, 320, 'Four marshaller figures with illuminated wands: identify gate, straight ahead, stop and slow down',
      'Selected ICAO marshalling signals, given facing the aircraft. Identify gate: both arms straight up, wands vertical. Straight ahead: arms bent at the elbows, wands moved up and down from chest to head. Stop: wands crossed above the head. Slow down: arms down, wands moved up and down between waist and knees.')
for cx, k, lab in ((110, 'ident', ('IDENTIFY GATE', 'arms straight up')), (290, 'ahead', ('STRAIGHT AHEAD', 'wands up and down at chest')), (470, 'stop', ('STOP', 'wands crossed above head')), (650, 'slow', ('SLOW DOWN', 'wands patting at knee level'))): marshaller(f, cx, k, lab)
AL.append(f)

f = A('x15', 'Runway Designation', 760, 300, 'A runway oriented 047 degrees magnetic numbered 05 at one end and 23 at the other, and three parallel runways labelled L, C and R',
      'Runway numbers are the magnetic direction of the runway rounded to the nearest 10° and divided by ten: 047°M is runway 05, and the reciprocal 227°M is 23. Parallel runways add L, C, R (left, centre, right) as seen from the approach.')
f.raw('<g transform="rotate(-43 230 150)"><rect x="80" y="130" width="300" height="40" fill="#3b4246" stroke="#dfeef2" stroke-width="1.4"/><text x="110" y="157" font-family="Overpass,sans-serif" font-size="18" font-weight="700" fill="#fff" transform="rotate(90 110 150)" text-anchor="middle">05</text><text x="350" y="157" font-family="Overpass,sans-serif" font-size="18" font-weight="700" fill="#fff" transform="rotate(-90 350 150)" text-anchor="middle">23</text></g>')
f.T(230, 290, '047°M → 05,  227°M → 23', 11, 'gold', 'middle', bold=True)
for i, t in enumerate(('L', 'C', 'R')):
    x = 480 + i * 80; f.R(x, 60, 40, 200, c='ink', sw=1.4, fill='#3b4246', rx=0); f.T(x + 20, 240, f'36{t}', 13, 'white', 'middle', bold=True, check=False)
f.T(600, 290, 'parallel runways: L, C, R', 11, 'gold', 'middle', bold=True)
AL.append(f)

f = A('x16', 'Runway Strip, RESA, Stopway and Clearway', 760, 300, 'Plan view of a runway within its strip, with a stopway beyond the end, a runway end safety area and a clearway over which the aircraft may climb',
      'The runway strip surrounds the runway to reduce damage to an aircraft running off it. A stopway (beyond the end, able to support the aircraft) may be used for a rejected take-off and adds to ASDA. A clearway (an area under the control of the aerodrome, free of obstacles, which the aircraft may climb over) adds to TODA. The runway end safety area (RESA) beyond the strip protects against undershoots and overruns.')
f.R(40, 90, 640, 120, c='green', sw=1.4, fill='green', rx=0, op=0.15); f.T(360, 82, 'runway strip', 10.5, 'green', 'middle', bold=True)
f.R(80, 130, 460, 40, c='ink', sw=1.4, fill='#3b4246', rx=0); f.T(310, 155, 'RUNWAY (TORA)', 11, 'white', 'middle', bold=True, check=False)
f.R(540, 130, 70, 40, c='gold', sw=1.4, fill='gold', rx=0, op=0.6); f.T(575, 206, 'stopway', 10.5, 'gold', 'middle', bold=True)
f.R(540, 112, 200, 76, c='cool', sw=1.6, fill='none', rx=0, dash='6 4'); f.T(690, 106, 'clearway', 10.5, 'cool', 'middle', bold=True)
f.R(680, 120, 60, 60, c='hot', sw=1.4, fill='hot', rx=0, op=0.25); f.T(710, 226, 'RESA', 10.5, 'hot', 'middle', bold=True)
f.T(380, 260, 'ASDA = TORA + stopway      TODA = TORA + clearway', 11, 'ink', 'middle', bold=True)
AL.append(f)

f = A('x17', 'Minimum Altitudes on Enroute Charts', 760, 340, 'Airway profile with terrain showing the minimum obstacle clearance altitude, the higher minimum enroute altitude, and a grid square with its grid MORA',
      'MEA (minimum enroute altitude): guarantees obstacle clearance, navigation-aid reception and (normally) communications along the segment. MOCA (minimum obstacle clearance altitude): obstacle clearance only, but navaid reception is guaranteed only near the facility. Grid MORA (Jeppesen): clears the highest terrain or obstacle in the grid square by 1000 ft (where that is 5000 ft or lower) or 2000 ft (higher).')
f.P('M40,300 L120,250 L200,280 L280,200 L340,240 L420,170 L500,250 L600,220 L720,300 Z', 'none', 0, 'gnd', op=0.7)
f.L(40, 120, 720, 120, 'hot', 2.4); f.T(60, 112, 'MEA: obstacles + navaid reception + comms', 10.5, 'hot', bold=True)
f.L(40, 140, 720, 140, 'gold', 2, dash='8 4'); f.T(60, 160, 'MOCA: obstacle clearance only', 10.5, 'gold', bold=True)
f.L(420, 170, 420, 142, 'gold', 1.4, me='gold', ms='gold'); f.T(430, 194, 'clearance', 10, 'gold')
f.R(560, 30, 160, 70, c='cool', sw=1.6, fill='none', rx=0); f.T(640, 60, '125', 22, 'cool', 'middle', bold=True); f.T(640, 88, 'grid MORA 12 500 ft', 9.5, 'cool', 'middle')
AL.append(f)

f = A('x18', 'Dangerous Goods — The Nine Classes', 760, 400, 'Nine hazard classes of dangerous goods: explosives, gases, flammable liquids, flammable solids, oxidisers and organic peroxides, toxic and infectious substances, radioactive material, corrosives and miscellaneous',
      'Dangerous goods are divided into nine classes (ICAO Technical Instructions, applied by CAR Part 92). Each package carries a diamond-shaped hazard label; the pilot-in-command must be told in writing (NOTOC) what dangerous goods are on board and where.')
cls = [('1', 'Explosives', 'warm'), ('2', 'Gases', 'green'), ('3', 'Flammable liquids', 'hot'), ('4', 'Flammable solids', 'hot'), ('5', 'Oxidisers, organic peroxides', 'gold'), ('6', 'Toxic and infectious', 'white'), ('7', 'Radioactive', 'gold'), ('8', 'Corrosives', 'dim'), ('9', 'Miscellaneous', 'white')]
for i, (n, t, c_) in enumerate(cls):
    cx = 100 + (i % 5) * 140; cy = 110 + (i // 5) * 170
    f.P(f'M{cx},{cy - 50} L{cx + 50},{cy} L{cx},{cy + 50} L{cx - 50},{cy} Z', 'ink', 2, c_, op=0.85); f.T(cx, cy + 34, n, 16, 'black', 'middle', bold=True, check=False)
    f.T(cx, cy + 74, t, 10, 'ink', 'middle', bold=True)
f.T(380, 390, 'PIC informed in writing (NOTOC); CAR Part 92', 10.5, 'gold', 'middle', bold=True)
AL.append(f)

if __name__ == '__main__':
    gallery(AL, 'Air Law Gallery 2', 'Air Law — Additional Figures', 'Original figures for rules of the air, signals, aerodromes, airspace, altimetry and dangerous goods.', 'al2-gallery.html')
    print(len(AL), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
