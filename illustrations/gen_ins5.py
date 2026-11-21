#!/usr/bin/env python3
"""Instruments extra A (chapters 1-17): displays, temperature, ASI, altimeter, VSI, Mach, ADC, magnetism, compass, gyros, turn & slip, deviation, remote compass."""
import math
from figlib import *
from ins_common import *

IN = []

# 01_04 pointer + counter
f = I('01_04', 'Pointer & Counter Display', 760, 300, 'An airspeed dial with a pointer for fine reading and a digital counter window showing the value',
    '<b>The best of both.</b> A <b>pointer</b> moving round a scale shows <b>trend and rate of change</b> at a glance, while a <b>digital counter</b> gives an exact value that cannot be misread. Combining them — a counter in a window, plus a pointer for the last digits or the trend — gives fast, accurate reading. It is used on airspeed, altimeter and engine displays; the counter-pointer altimeter replaced the three-pointer type for exactly this reason.')
dial(f, 230, 150, 110, -150, 150, [(i / 10, str(i * 20 + 40)) for i in range(11)], ptr=0.38)
f.R(194, 196, 72, 28, c='gold', sw=1.6, fill='black', rx=3); f.T(230, 216, '116', 15, 'white', 'middle', bold=True, mono=True, check=False)
f.T(230, 296, 'pointer: trend   |   counter: exact value', 10.5, 'ink', 'middle', bold=True)
note(f, 420, 80, ['Pointer', 'rate and direction of change', 'seen at a glance'], first='gold')
note(f, 420, 170, ['Counter', 'exact figure, cannot be', 'misread by a whole revolution'], first='cool')
IN.append(f)

f = I('01_05', 'Revolution Counter — Percentage RPM', 760, 300, 'A turbine engine RPM gauge reading in percent with a small vernier dial and a red line at the maximum',
    '<b>Turbine speeds are shown as a percentage.</b> Rather than 10 000 or 30 000 rpm, the gauge reads <b>% RPM</b> of a reference speed (100%), so engines of different sizes read alike and limits are easy to remember. The main pointer covers 0–100% with an expanded scale near the top; a small <b>vernier</b> dial gives each 1% in tenths. A <b>red radial</b> marks the maximum. N1 and N2 gauges on two-spool engines use this format.')
dial(f, 230, 150, 110, -120, 140, [(i / 10, str(i * 10)) for i in range(11)], ptr=0.94)
arc_band(f, 230, 150, 112, 140, 146, 'hot', 8); f.T(180, 214, '% RPM', 11, 'white', 'middle', bold=True, check=False)
f.Ci(272, 120, 22, 'ink', 1.4, 'g3'); [f.L(*pol(272, 120, 16, k * 36), *pol(272, 120, 21, k * 36), 'white', 1) for k in range(10)]; t = pol(272, 120, 16, 144); f.L(272, 120, t[0], t[1], 'gold', 2)
f.T(272, 156, 'vernier', 9, 'dim', 'middle', check=False)
note(f, 420, 80, ['100% = the reference speed,', 'not the maximum.'], first='ink'); note(f, 420, 150, ['Red radial: maximum.', 'Vernier: tenths of 1%.'], first='hot')
IN.append(f)

def panel6(f, x0, y0, s, basic_t=False):
    pos = [(0, 0, 'airspeed'), (1, 0, 'attitude'), (2, 0, 'altimeter'), (0, 1, 'turn'), (1, 1, 'heading'), (2, 1, 'VSI')]
    for cx, cy, lab in pos:
        x, y = x0 + cx * s, y0 + cy * s; f.Ci(x, y, s * 0.42, 'gold' if basic_t and lab in ('airspeed', 'attitude', 'altimeter', 'heading') else 'ink', 2, 'g3')
        f.T(x, y + 4, lab, 10, 'ink', 'middle', bold=True, check=False)
f = I('01_07', "The 'Basic Six' Layout", 760, 300, 'Six flight instruments in two rows of three: airspeed, attitude, altimeter; turn coordinator, heading, vertical speed',
    '<b>The standard six.</b> Light aircraft panels group the six primary flight instruments in two rows: <b>airspeed, attitude, altimeter</b> on top; <b>turn coordinator, heading indicator, vertical speed</b> below. The <b>pitot-static</b> instruments (ASI, altimeter, VSI) and the <b>gyroscopic</b> ones (attitude, heading, turn) are each powered differently, so a single failure affects only part of the panel. The standard arrangement lets a pilot fly any aircraft with the same scan.')
panel6(f, 150, 90, 120); f.T(270, 270, 'pitot-static: airspeed, altimeter, VSI', 10, 'cool', 'middle'); f.T(270, 288, 'gyroscopic: attitude, heading, turn', 10, 'gold', 'middle')
note(f, 520, 100, ['Top: airspeed, attitude,', 'altimeter.', 'Bottom: turn, heading,', 'vertical speed.'], first='ink')
IN.append(f)

f = I('01_08', "The 'Basic T' Layout", 760, 300, 'The six instruments with the airspeed, attitude, altimeter and heading highlighted in a T shape',
    '<b>Four instruments in a T.</b> The <b>attitude indicator</b> sits top centre with <b>airspeed</b> to its left, <b>altitude</b> to its right and <b>heading</b> directly below: the <b>basic T</b>, required by certification standards so that the most important information is always in the same place. The same arrangement survives on glass cockpits — speed tape left, attitude centre, altitude tape right, heading below.')
panel6(f, 150, 90, 120, True); f.P('M86,40 L454,40 L454,140 L330,140 L330,262 L210,262 L210,140 L86,140 Z', 'gold', 1.8, dash='7 4')
note(f, 500, 100, ['The basic T: airspeed,', 'attitude, altimeter and', 'heading.'], first='gold'); note(f, 500, 190, ['Same layout on glass', 'cockpits (tapes and PFD).'], first='ink')
IN.append(f)

f = I('01_09', 'Light-Twin Instrument Panel', 760, 300, 'A schematic light twin panel with the flight instruments in front of the pilot and paired engine gauges in the centre',
    '<b>A typical light twin.</b> The flight instruments in the basic-six arrangement are directly in front of the pilot, radios and navigation displays in the centre stack, and the <b>engine instruments in pairs</b> — left engine on the left, right on the right — so a difference between engines stands out. Paired gauges are often combined in one case with two needles (manifold pressure, RPM, fuel flow). Switches and circuit breakers run along the bottom of the panel.')
f.R(30, 40, 700, 220, c='line', sw=2, fill='g2', rx=12)
panel6(f, 90, 100, 80)
for k, lab in enumerate(('MP', 'RPM', 'FF', 'EGT')):
    x = 380 + (k % 2) * 80; y = 90 + (k // 2) * 80; f.Ci(x, y, 32, 'ink', 1.6, 'g3'); f.L(x, y, x - 14, y - 18, 'gold', 2); f.L(x, y, x - 8, y - 20, 'cool', 2); f.T(x, y + 22, lab, 9, 'ink', 'middle', bold=True, check=False)
f.R(560, 60, 150, 160, c='ink', sw=1.4, fill='black', rx=4); f.T(635, 140, 'radios / GPS', 10, 'ink', 'middle', check=False)
for k in range(10): f.R(80 + k * 30, 232, 20, 14, c='ink', sw=1, fill='g3', rx=2)
f.T(420, 236, 'engine gauges paired: two needles, left and right engine', 9.5, 'gold')
IN.append(f)

f = I('01_10', 'Analogue Altimeter', 760, 300, 'A counter-pointer altimeter with a drum counter for thousands, a pointer for hundreds and a pressure-setting window',
    '<b>The counter-pointer altimeter.</b> A single long <b>pointer</b> makes one revolution per <b>1 000 ft</b>, read against a scale of 0–9 (hundreds of feet). A <b>drum counter</b> shows thousands (here 12 thousand), so the reading is <b>12 350 ft</b> and cannot be misread by 10 000 ft like a three-pointer instrument. A striped flag may appear below 10 000 ft. The <b>subscale window</b> shows the pressure setting in hPa, changed with the knob.')
dial(f, 230, 150, 110, 0, 360, [(i / 10, str(i)) for i in range(10)], ptr=0.35)
f.R(166, 120, 64, 30, c='gold', sw=1.6, fill='black', rx=3); f.T(198, 142, '12', 16, 'white', 'middle', bold=True, mono=True, check=False)
f.R(236, 196, 64, 22, c='ink', sw=1.2, fill='black', rx=3); f.T(268, 212, '1013', 11, 'white', 'middle', mono=True, check=False)
f.Ci(140, 250, 14, 'ink', 1.4, 'steel')
f.T(230, 294, 'reads 12 350 ft', 11.5, 'gold', 'middle', bold=True)
f.legend(420, 70, [(1, 'Drum counter', 'thousands of feet: 12'), (2, 'Pointer', 'hundreds: one turn per 1 000 ft'), (3, 'Subscale window', 'pressure setting (hPa)'), (4, 'Setting knob', 'sets QNH, QFE or 1013')], step=48)
f.badge(198, 106, 1); f.badge(300, 110, 2); f.badge(310, 208, 3); f.badge(118, 240, 4)
IN.append(f)

f = I('01_11', 'Combined Digital & Analogue Display', 760, 280, 'An electronic gauge with an arc and pointer plus a digital readout and coloured operating bands',
    '<b>Electronic gauges keep the pointer.</b> Glass engine displays draw a <b>circular arc</b> with a moving pointer — giving instant trend information — together with a <b>digital readout</b> of the exact value. The arc carries the same coloured bands as an analogue gauge, and the digits and pointer <b>change colour</b> (amber, red) when a limit is exceeded, sometimes with a box round the digits. The best of analogue and digital in one symbol.')
cx, cy = 230, 170
arc_band(f, cx, cy, 100, -120, 60, 'green', 8); arc_band(f, cx, cy, 100, 60, 90, 'amber', 8); arc_band(f, cx, cy, 100, 90, 100, 'hot', 8)
t = pol(cx, cy, 92, 40); f.L(cx, cy, t[0], t[1], 'white', 3); f.R(cx - 10, cy + 20, 100, 34, c='white', sw=1.4, fill='black', rx=3); f.T(cx + 40, cy + 44, '84.2', 16, 'green', 'middle', bold=True, mono=True, check=False)
f.T(cx - 50, cy + 70, 'N1 %', 10, 'cool', check=False)
note(f, 420, 70, ['Arc and pointer: trend.', 'Digits: exact value.'], first='ink'); note(f, 420, 140, ['Green: normal.', 'Amber: caution.', 'Red: limit exceeded.'], first='gold')
IN.append(f)

f = I('01_12', 'Traditional Analogue Flight Deck', 760, 300, 'A schematic airliner flight deck with many round dial instruments for each pilot and a centre engine panel',
    '<b>The “steam gauge” flight deck.</b> Before glass cockpits, each pilot had a full set of electromechanical instruments — attitude director, HSI, airspeed, altimeter, VSI, RMI — and the centre panel carried <b>dozens of engine gauges</b>, with more on a flight engineer’s panel. It worked, but scanning so many dials was demanding, each instrument could fail individually, and there was little integration of information. Many of these instruments’ principles survive as the logic behind the electronic displays.')
f.R(30, 40, 700, 220, c='line', sw=2, fill='g2', rx=12)
for side in (0, 1):
    x0 = 70 + side * 440
    for k in range(6): f.Ci(x0 + (k % 3) * 70, 90 + (k // 3) * 70, 26, 'ink', 1.6, 'g3')
for k in range(12): f.Ci(330 + (k % 4) * 34, 80 + (k // 4) * 40, 14, 'ink', 1.2, 'g3')
f.T(140, 236, 'captain’s instruments', 10, 'ink', 'middle'); f.T(380, 236, 'engine instruments', 10, 'ink', 'middle'); f.T(580, 236, 'first officer’s instruments', 10, 'ink', 'middle')
f.T(380, 290, 'Many individual dials: a demanding scan and little integration.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('01_13', 'Modern Glass Flight Deck', 760, 300, 'A schematic glass cockpit with large display screens for each pilot showing flight and navigation information and a central engine display',
    '<b>Large screens replace the dials.</b> A modern airliner flight deck has a few large <b>multi-function displays</b>: each pilot has a <b>primary flight display</b> (attitude, speed, altitude, heading, flight modes) and a <b>navigation display</b> (map, route, weather, traffic); the centre screens show <b>engine indications and crew alerts</b> (EICAS/ECAM) and system synoptics. Information can be moved between screens if one fails, and standby instruments remain for total display failure.')
f.R(30, 40, 700, 220, c='line', sw=2, fill='g2', rx=12)
for k, (x, lab) in enumerate(((60, 'PFD'), (170, 'ND'), (300, 'EICAS'), (420, 'MFD'), (530, 'ND'), (640, 'PFD'))):
    f.R(x, 70, 90 if k not in (2, 3) else 100, 110, c='ink', sw=1.6, fill='black', rx=4); f.T(x + (45 if k not in (2, 3) else 50), 130, lab, 12, 'cool', 'middle', bold=True, check=False)
f.R(345, 196, 70, 40, c='ink', sw=1.4, fill='black', rx=4); f.T(380, 222, 'standby', 9, 'ink', 'middle', check=False)
f.T(380, 290, 'PFD and ND for each pilot; engine and alert displays in the centre; standby instruments.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('01_14', 'Electronic Panel — Light Aircraft', 760, 300, 'A light aircraft glass panel with a primary flight display on the left and a multifunction display with map and engine data on the right',
    '<b>Glass in light aircraft.</b> Integrated systems put a <b>PFD</b> in front of the pilot — attitude with speed and altitude tapes, heading, and an HSI — and an <b>MFD</b> beside it showing a moving map, navigation and <b>engine indications</b>. The attitude and heading come from an <b>AHRS</b> (solid-state attitude and heading reference) and the air data from an air data computer. A battery-backed <b>standby</b> attitude, airspeed and altimeter (often one electronic unit) is required in case the main displays fail.')
f.R(30, 40, 700, 220, c='line', sw=2, fill='g2', rx=12)
f.R(60, 60, 280, 180, c='ink', sw=2, fill='black', rx=6); att(f, 200, 130, 150, 110, uid='l14'); f.T(200, 228, 'PFD', 11, 'cool', 'middle', bold=True, check=False)
f.R(420, 60, 280, 180, c='ink', sw=2, fill='black', rx=6); f.R(440, 80, 180, 140, c='none', sw=0, fill=LAND, rx=4); f.T(530, 152, 'moving map', 10, 'ink', 'middle', check=False)
for k in range(4): f.R(632, 82 + k * 34, 52, 26, c='ink', sw=1, fill='g3', rx=2)
f.T(658, 236, 'engine', 9, 'ink', 'middle', check=False); f.T(560, 252, 'MFD', 11, 'cool', 'middle', bold=True, check=False)
f.R(356, 110, 50, 70, c='ink', sw=1.4, fill='black', rx=4); f.T(381, 196, 'standby', 9, 'ink', 'middle', check=False)
f.T(380, 292, 'Attitude and heading from an AHRS; air data from an ADC; battery-backed standby.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('01_15', 'Colour Operating Ranges on Gauges', 760, 280, 'A gauge arc with green normal range, yellow caution range and a red line limit, plus a blue radial and white arc on an airspeed indicator',
    '<b>Gauge markings follow a standard code.</b> A <b>green arc</b> is the normal operating range; a <b>yellow (amber) arc</b> a caution or take-off/limited-time range; a <b>red radial line</b> a limit that must not be exceeded (minimum or maximum). Airspeed indicators add a <b>white arc</b> (flap operating range) and, on light twins, a <b>blue radial</b> (best single-engine rate of climb, VYSE) and a <b>red radial</b> (minimum control speed, VMC). A slip mark on the glass shows if the glass has rotated relative to the case.')
cx, cy = 230, 170
arc_band(f, cx, cy, 100, -120, 30, 'green', 9); arc_band(f, cx, cy, 100, 30, 90, 'amber', 9); p, q = pol(cx, cy, 86, 92), pol(cx, cy, 112, 92); f.L(p[0], p[1], q[0], q[1], 'hot', 5)
p, q = pol(cx, cy, 86, -120), pol(cx, cy, 112, -120); f.L(p[0], p[1], q[0], q[1], 'hot', 5)
table(f, 400, 60, [110, 220], ['marking', 'meaning'], [('green arc', 'normal operating range'), ('yellow arc', 'caution / limited time'), ('red radial', 'limit: do not exceed'), ('white arc', 'ASI: flap operating range'), ('blue radial', 'ASI twin: VYSE'), ('red radial', 'ASI twin: VMC (minimum)')], 'gold')
IN.append(f)

# Temperature
f = I('03_01', 'Bimetallic Strip', 760, 280, 'A strip of Invar bonded to brass, straight when cold and curling towards the Invar when heated',
    '<b>Two metals that expand differently.</b> A <b>bimetallic strip</b> is two metals bonded together — typically <b>Invar</b> (which barely expands) and <b>brass</b> (which expands a lot). When heated, the brass grows more than the Invar and the strip <b>bends towards the Invar side</b>; when cooled, the other way. The movement is proportional to temperature, so it can drive a pointer directly (an OAT gauge) or open contacts (a thermostat or circuit breaker).')
f.R(80, 80, 300, 12, c='ink', sw=1, fill='steel', rx=1); f.R(80, 92, 300, 12, c='ink', sw=1, fill='warm', rx=1); f.T(230, 70, 'cold: straight', 11, 'cool', 'middle', bold=True)
f.T(400, 90, 'Invar (low expansion)', 10, 'dim'); f.T(400, 104, 'brass (high expansion)', 10, 'warm')
f.P('M80,190 Q240,190 370,130', 'steel', 12); f.P('M80,202 Q246,202 380,140', 'warm', 12); f.T(230, 250, 'heated: bends towards the Invar', 11, 'hot', 'middle', bold=True)
f.R(66, 180, 14, 34, c='ink', sw=1, fill='g3', rx=1)
IN.append(f)

f = I('03_02', 'Bimetallic-Helix Thermometer', 760, 280, 'A bimetallic strip wound into a helix inside a probe, turning a pointer over a temperature scale as it winds and unwinds',
    '<b>Making the strip turn a pointer.</b> Winding the bimetallic strip into a <b>helix (coil)</b> converts its bending into <b>rotation</b>: as temperature rises, the helix winds or unwinds, turning a spindle and <b>pointer</b> directly over the dial — no linkage, no power. One end is fixed in the probe that projects into the airflow. Simple and reliable, it is the classic direct-reading outside air temperature gauge on light aircraft.')
f.R(80, 120, 260, 40, c='ink', sw=1.6, fill='g3', rx=20)
for k in range(10): f.raw(f'<ellipse cx="{110 + k * 22}" cy="140" rx="9" ry="14" fill="none" stroke="{col("warm")}" stroke-width="2.4"/>')
f.L(340, 140, 420, 140, 'ink', 3); dial(f, 500, 140, 70, -120, 120, [(0, '−40'), (0.5, '0'), (1, '+40')], ptr=0.62, size=10)
f.T(210, 190, 'bimetallic helix in the probe', 10.5, 'warm', 'middle', bold=True); f.T(380, 128, 'spindle', 9.5, 'dim', 'middle')
f.T(380, 262, 'the helix winds or unwinds with temperature, turning the pointer', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('03_03', 'Direct-Reading OAT Gauge', 760, 280, 'An outside air temperature gauge mounted through the windscreen with its probe outside and dial inside',
    '<b>The light-aircraft OAT gauge.</b> The bimetallic probe is mounted <b>through the windscreen</b> (or a side panel) so the sensing element is in the outside airflow and the dial faces the pilot. It reads <b>ram air temperature</b>, slightly above the true static air temperature because of the airflow — negligible at light-aircraft speeds. It is needed for density altitude, true airspeed and icing judgements; it can be affected by sun heating the probe on the ground.')
f.P('M300,40 L360,260', 'cool', 8); f.T(330, 30, 'windscreen', 10, 'cool', 'middle', bold=True)
f.L(330, 140, 470, 140, 'ink', 6); f.R(440, 128, 50, 24, c='ink', sw=1.4, fill='steel', rx=10); f.T(520, 144, 'probe in the airflow', 10, 'ink')
for y in (110, 170): f.L(700, y, 560, y, 'cool', 1.6, me='cool')
dial(f, 200, 140, 70, -120, 120, [(0, '−40'), (0.5, '0'), (1, '+40')], ptr=0.45, size=10); f.T(200, 240, 'dial inside the cockpit', 10, 'ink', 'middle', bold=True)
f.T(380, 272, 'Reads close to static air temperature at light-aircraft speeds.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

def tat_probe(f, x, y, aspirated=False):
    f.P(f'M{x},{y} L{x+160},{y} L{x+200},{y+30} L{x+200},{y+70} L{x+40},{y+70} Z', 'ink', 2, 'g3')
    f.R(x + 130, y + 30, 26, 30, c='hot', sw=1.4, fill='hot', rx=3, op=0.85)
    f.P(f'M{x-50},{y+20} L{x+120},{y+20} Q{x+160},{y+20} {x+150},{y+50} L{x+150},{y+66}', 'cool', 2, me='cool')
    f.P(f'M{x-50},{y+10} L{x+190},{y+10}', 'cool', 1.4, me='cool', dash='4 3')
    if aspirated: f.P(f'M{x+150},{y+70} L{x+150},{y+110} L{x+260},{y+110}', 'gold', 2.4, me='gold')
f = I('03_04', 'Total Air Temperature (TAT) Probe', 760, 300, 'A section through a TAT probe with air entering, turning sharply so water and particles carry straight on, and flowing past a platinum resistance sensor',
    '<b>Measuring temperature at high speed.</b> A <b>TAT probe</b> brings a sample of air almost to rest around a <b>platinum resistance element</b>, so it measures total (stagnation) air temperature — static temperature plus the full ram rise. The air path turns sharply: heavier water drops and dust carry straight on and out, so they do not wet the sensor. The probe body is electrically <b>de-iced</b>, and the airflow design keeps the heater’s warmth away from the element. Recovery factor is close to 1.')
tat_probe(f, 180, 80)
f.T(180, 64, 'airflow', 10, 'cool'); f.T(400, 176, 'platinum resistance element', 10, 'hot'); f.L(396, 172, 338, 140, 'dim', 1)
f.T(390, 92, 'water and particles carry straight on', 10, 'cool'); f.T(240, 186, 'de-iced body', 10, 'ink')
note(f, 460, 200, ['Measures TOTAL air temperature:', 'static + full ram rise.', 'Recovery factor about 1.'], first='ink')
IN.append(f)

f = I('03_05', 'TAT Probe Installation', 760, 280, 'A TAT probe mounted on the fuselage nose outside the boundary layer, wired to the air data computer',
    '<b>Where the probe goes.</b> The TAT probe is mounted on the forward fuselage, standing out <b>clear of the boundary layer</b> so it samples undisturbed air. Its resistance element is wired to the <b>air data computer</b>, which uses TAT with Mach number to compute <b>static air temperature</b> (SAT) and <b>true airspeed</b>. A probe heater prevents icing; on the ground with no airflow, the heated probe reads high unless it is <b>aspirated</b>.')
f.P('M60,200 Q60,120 200,110 L700,110 L700,200 Z', 'ink', 2, 'g3'); f.L(260, 110, 270, 70, 'ink', 6); f.R(264, 58, 30, 18, c='ink', sw=1.4, fill='steel', rx=6)
f.T(310, 64, 'TAT probe, clear of the boundary layer', 10.5, 'ink', bold=True)
f.L(270, 110, 270, 160, 'gold', 1.6, dash='4 3'); f.box(300, 140, 160, 44, ['air data computer'], c='cool', size=10.5); f.L(270, 162, 298, 162, 'gold', 1.6, me='gold')
f.T(380, 250, 'ADC computes SAT and TAS from TAT and Mach.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('03_06', 'Aspirated TAT Probe', 760, 300, 'A TAT probe with engine bleed air ejected through a nozzle to draw outside air past the sensor when the aircraft is stationary',
    '<b>Reading correctly on the ground.</b> With no airflow, a heated TAT probe on the ground reads much too high — heat from the de-icing heater and sun soak the element. An <b>aspirated</b> probe has a small jet of <b>bleed air</b> blown through an ejector at its base, which <b>draws</b> outside air through the probe past the sensor even when stationary, giving a valid temperature for take-off performance calculations.')
tat_probe(f, 180, 60, True)
f.T(450, 174, 'bleed air jet draws outside air', 10, 'gold', bold=True); f.T(450, 188, 'through the probe', 10, 'gold')
note(f, 120, 230, ['On the ground, without aspiration, the heated probe reads high.'], first='hot')
IN.append(f)

f = I('03_07', 'Ram Rise — SAT, RAT & TAT', 760, 300, 'A graph of temperature rise against speed, with total air temperature above static and ram air temperature between them',
    '<b>Three temperatures.</b> <b>Static air temperature (SAT)</b> is the true temperature of the undisturbed air — what forecasts and ISA use. Moving air brought to rest heats up by compression: the <b>ram rise</b>, which grows with the <b>square of the TAS</b> (about 1°C at 100 kt, 9°C at 300 kt, 25°C at 500 kt). A probe that recovers all of it reads <b>total air temperature (TAT)</b>; a practical probe recovers a fraction, the <b>recovery factor</b> (K), and reads <b>RAT = SAT + K × ram rise</b>.')
f.L(100, 250, 100, 50, 'ink', 1.4, me='ink'); f.L(100, 250, 700, 250, 'ink', 1.4, me='ink'); f.T(700, 270, 'TAS', 10, 'dim', 'end'); f.T(92, 60, 'temperature', 9.5, 'dim', 'end')
f.L(100, 200, 680, 200, 'cool', 2.4); f.T(684, 204, 'SAT', 11, 'cool', bold=True)
pl(f, ' '.join(f'{100 + x:.1f},{200 - 150 * (x / 580) ** 2:.1f}' for x in range(0, 581, 10)), 'hot', 2.6); f.T(684, 54, 'TAT', 11, 'hot', bold=True)
pl(f, ' '.join(f'{100 + x:.1f},{200 - 120 * (x / 580) ** 2:.1f}' for x in range(0, 581, 10)), 'gold', 2.2); f.T(684, 84, 'RAT', 11, 'gold', bold=True)
f.L(600, 199, 600, 103, 'white', 1.4, me='white', ms='white'); f.T(594, 150, 'ram rise', 10, 'white', 'end', bold=True)
f.T(380, 290, 'ram rise grows with TAS²:  RAT = SAT + K × ram rise   (K = recovery factor)', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('03_08', 'Temperature-Rise Correction on the Navigation Computer', 760, 280, 'A navigation computer temperature rise scale with TAS and the correction to subtract from indicated temperature',
    '<b>Getting SAT from an indicated temperature.</b> On the navigation computer’s temperature-rise scale, enter the <b>TAS</b> and read the <b>ram rise</b> to subtract from the indicated (ram) air temperature, allowing for the recovery factor quoted for the probe. Example: indicated −20°C at 400 kt TAS with a ram rise of about 16°C gives SAT about −36°C. Because TAS itself depends on temperature, the solution is refined by iteration — or done automatically by the air data computer.')
f.R(80, 90, 600, 60, c='ink', sw=1.6, fill='g3', rx=6)
for k in range(11):
    x = 100 + k * 56; f.L(x, 90, x, 104, 'white', 1.4); f.T(x, 120, str(k * 50), 9.5, 'white', 'middle', check=False)
    rr = (k * 50 / 100) ** 2; f.L(x, 136, x, 150, 'gold', 1.4); f.T(x, 166, f'{rr:.0f}', 9.5, 'gold', 'middle')
f.T(60, 120, 'TAS kt', 10, 'ink', 'end', bold=True); f.T(60, 166, 'rise °C', 10, 'gold', 'end', bold=True)
f.L(548, 76, 548, 128, 'hot', 2.4); f.T(548, 70, '400 kt: about 16°C', 10.5, 'hot', 'middle', bold=True)
f.T(380, 220, 'SAT = indicated temperature − ram rise × recovery factor', 11.5, 'ink', 'middle', bold=True); f.T(380, 244, '−20°C − 16°C = −36°C (recovery factor 1)', 10.5, 'dim', 'middle')
IN.append(f)

f = I('03_09', 'Kelvin & Celsius Scales', 760, 280, 'Two thermometer scales side by side showing that zero Celsius is 273 Kelvin and fifteen Celsius is 288 Kelvin',
    '<b>Absolute temperature.</b> The <b>Kelvin</b> scale starts at <b>absolute zero</b> (−273°C), so K = °C + 273. A 1 K step equals a 1°C step. Kelvin must be used whenever temperatures appear in ratios — the gas laws, density, the speed of sound (proportional to √T) and TAT/SAT calculations. ISA sea level is +15°C = <b>288 K</b>; at the tropopause, −56.5°C = 216.5 K.')
for x, lab, vals in ((240, '°C', ('−273', '−56.5', '0', '+15', '+100')), (480, 'K', ('0', '216.5', '273', '288', '373'))):
    f.R(x - 14, 50, 28, 210, c='ink', sw=1.6, fill='g3', rx=14); f.T(x, 40, lab, 13, 'ink', 'middle', bold=True)
    for k, v in enumerate(vals): y = 250 - [0, 0.42, 0.62, 0.8, 1.0][k] * 190; f.L(x - 20, y, x + 20, y, 'gold', 1.4); f.T(x + (-26 if lab == '°C' else 26), y + 4, v, 10.5, 'ink', 'end' if lab == '°C' else 'start', bold=True)
f.T(600, 120, 'K = °C + 273', 13, 'gold', bold=True); f.T(600, 150, 'ISA sea level:', 10, 'dim'); f.T(600, 166, '15°C = 288 K', 10.5, 'ink', bold=True)
IN.append(f)

f = I('03_10', 'ISA Temperature vs Altitude', 760, 300, 'A graph of ISA temperature falling from fifteen degrees at sea level to minus fifty-six point five at the tropopause and constant above',
    '<b>The standard atmosphere temperature profile.</b> ISA starts at <b>+15°C</b> at mean sea level and falls at <b>1.98°C per 1 000 ft</b> (6.5°C per km) up to the <b>tropopause at 36 090 ft</b> (11 km), where it is <b>−56.5°C</b>. Above that it stays constant to 65 600 ft (20 km). Instruments are calibrated to ISA, and the difference between actual and ISA temperature (ISA deviation) is used in performance and altimeter-error calculations.')
f.L(120, 260, 120, 40, 'ink', 1.4, me='ink'); f.L(120, 260, 680, 260, 'ink', 1.4, me='ink')
tx = lambda t: 120 + (t + 70) * 6.0; hy = lambda h: 260 - h * 0.0045
f.P(f'M{tx(15)},{hy(0)} L{tx(-56.5)},{hy(36090)} L{tx(-56.5)},{hy(48000)}', 'gold', 2.8)
f.Ci(tx(15), hy(0), 4, 'gold', 1, 'gold'); f.T(tx(15) + 8, hy(0) - 6, '+15°C at MSL', 10, 'gold', bold=True)
f.Ci(tx(-56.5), hy(36090), 4, 'hot', 1, 'hot'); f.T(tx(-56.5) + 10, hy(36090) + 4, 'tropopause: 36 090 ft, −56.5°C', 10, 'hot', bold=True)
for t in (-60, -40, -20, 0, 20): f.L(tx(t), 260, tx(t), 265, 'ink', 1); f.T(tx(t), 280, f'{t}', 9.5, 'dim', 'middle')
for h in (0, 10000, 20000, 30000, 40000): f.L(114, hy(h), 120, hy(h), 'ink', 1); f.T(110, hy(h) + 4, f'{h // 1000}k', 9.5, 'dim', 'end')
f.T(430, 120, 'lapse rate 1.98°C per 1 000 ft', 10.5, 'ink', bold=True); f.T(400, 296, 'temperature (°C)', 9.5, 'dim', 'middle')
IN.append(f)

# ASI colour code
f = I('04_02', 'ASI Colour Code & V-Speeds', 760, 300, 'An airspeed indicator with white flap arc, green normal arc, yellow caution arc and red never-exceed line, with the V-speeds at the arc ends',
    '<b>Reading the ASI markings</b> (light aircraft, IAS). <b>White arc</b>: flap operating range, from <b>VS0</b> (stall, landing configuration) to <b>VFE</b> (maximum flap extended). <b>Green arc</b>: normal operating range, from <b>VS1</b> (stall, clean) to <b>VNO</b> (maximum structural cruising speed). <b>Yellow arc</b>: caution range, VNO to VNE — smooth air only. <b>Red line</b>: <b>VNE</b>, never exceed. Twins add a red radial at VMC and a blue radial at VYSE.')
cx, cy = 220, 160
dial(f, cx, cy, 110, -150, 150, [(i / 6, str(40 + i * 30)) for i in range(7)], ptr=0.4, size=10, lab_r=72)
sp = lambda v: -150 + (v - 40) / 180 * 300
arc_band(f, cx, cy, 92, sp(50), sp(100), 'white', 7); arc_band(f, cx, cy, 102, sp(55), sp(130), 'green', 8); arc_band(f, cx, cy, 102, sp(130), sp(165), 'amber', 8)
p, q = pol(cx, cy, 88, sp(165)), pol(cx, cy, 116, sp(165)); f.L(p[0], p[1], q[0], q[1], 'hot', 5)
table(f, 400, 50, [70, 270], ['mark', 'speed'], [('white arc', 'VS0 (bottom) to VFE (top)'), ('green arc', 'VS1 (bottom) to VNO (top)'), ('yellow arc', 'VNO to VNE: smooth air only'), ('red line', 'VNE: never exceed'), ('red radial', 'twins: VMC'), ('blue radial', 'twins: VYSE')], 'gold')
IN.append(f)

# Altimeter
def capsule_stack(f, x, y, n=2, w=80):
    for k in range(n): f.P(f'M{x},{y + k * 30} Q{x + w / 2},{y - 14 + k * 30} {x + w},{y + k * 30} Q{x + w / 2},{y + 14 + k * 30} {x},{y + k * 30} Z', 'ink', 1.6, 'steel')
f = I('05_02', 'Simple Altimeter Mechanism', 760, 300, 'An evacuated aneroid capsule in a sealed case fed with static pressure, connected by a linkage to a pointer',
    '<b>An aneroid barometer marked in feet.</b> A partially <b>evacuated capsule</b> sits in a sealed case connected to the <b>static</b> source. As the aircraft climbs, static pressure falls and the capsule <b>expands</b>; a leaf spring stops it collapsing and sets its rate. The movement is magnified by a linkage and gears to a pointer calibrated in feet to the <b>ISA</b> pressure–height relationship. A simple altimeter has one pointer and no pressure-setting facility, or only a coarse one.')
f.R(80, 60, 400, 200, c='ink', sw=2, fill='g2', rx=10); capsule_stack(f, 150, 170, 1, 110); f.T(205, 210, 'evacuated capsule', 10, 'ink', 'middle', bold=True)
f.L(205, 158, 205, 120, 'ink', 3); f.L(205, 120, 330, 110, 'ink', 3); f.Ci(330, 110, 6, 'gold', 1, 'gold'); t = pol(330, 110, 70, 30); f.L(330, 110, t[0], t[1], 'white', 3)
f.L(20, 230, 80, 230, 'cool', 4, me='cool'); f.T(20, 218, 'static', 10, 'cool', bold=True)
f.T(360, 160, 'linkage and', 9.5, 'dim'); f.T(360, 174, 'gearing', 9.5, 'dim'); f.T(380, 70, 'pointer', 9.5, 'dim')
note(f, 520, 80, ['Climb: static pressure falls,', 'capsule expands, pointer', 'shows a height increase.'], first='ink')
note(f, 520, 170, ['Calibrated to the ISA', 'pressure–height relationship.'], first='gold')
IN.append(f)

f = I('05_03', 'Sensitive Altimeter Mechanism', 760, 300, 'A stack of evacuated capsules with temperature compensation, a rocking shaft, multiplying gears driving three pointers, and a subscale setting knob',
    '<b>More capsules, more precision.</b> The sensitive altimeter has a <b>stack</b> of two or three evacuated capsules for greater movement, a <b>bimetallic</b> compensator for temperature effects on the mechanism, jewelled bearings and a precise multiplying gear train driving the pointers. A <b>subscale knob</b> rotates the whole capsule-and-dial system relative to the case so the pilot can set any datum pressure (QNH, QFE or 1013) in the window. It reads to about ±30 ft near sea level.')
f.R(80, 50, 420, 220, c='ink', sw=2, fill='g2', rx=10); capsule_stack(f, 130, 140, 3, 110); f.T(185, 236, 'capsule stack', 10, 'ink', 'middle', bold=True)
f.L(240, 140, 290, 140, 'ink', 3); f.L(290, 140, 290, 100, 'ink', 3); f.Ci(380, 110, 30, 'gold', 1.6, 'g3'); f.Ci(380, 110, 14, 'gold', 1.6, 'g3'); f.L(290, 100, 350, 110, 'ink', 2)
f.T(380, 160, 'multiplying gears', 9.5, 'gold', 'middle'); f.T(296, 172, 'rocking shaft', 9.5, 'dim')
f.Ci(460, 230, 16, 'ink', 1.4, 'steel'); f.T(460, 260, 'subscale knob', 9.5, 'dim', 'middle'); f.L(20, 200, 80, 200, 'cool', 4, me='cool'); f.T(20, 188, 'static', 10, 'cool', bold=True)
f.P('M130,90 L230,90', 'warm', 3); f.T(180, 80, 'temperature compensator', 9.5, 'warm', 'middle')
note(f, 530, 70, ['2–3 capsules: more', 'movement, more accuracy.'], first='ink'); note(f, 530, 140, ['Subscale knob sets the', 'datum pressure.'], first='gold')
IN.append(f)

f = I('05_04', 'Three-Pointer Altimeter & Subscale', 760, 300, 'A three pointer altimeter reading 13 460 feet, with long, short and small pointers and a subscale window',
    '<b>Reading the three-pointer altimeter.</b> The <b>long</b> pointer shows hundreds of feet (one turn = 1 000 ft), the <b>short</b> pointer thousands (one turn = 10 000 ft) and the <b>small</b> pointer, often with a triangular tip, tens of thousands. Here: 13 460 ft. The <b>subscale</b> window shows the setting in hPa. Because the tens-of-thousands pointer is small and easily hidden, this design has caused 10 000 ft misreadings; it is being replaced by counter-pointer and electronic displays.')
cx, cy = 210, 150
f.Ci(cx, cy, 118, 'ink', 2.4, 'black')
for i in range(50): a = i * 7.2; p, q = pol(cx, cy, 104 if i % 5 else 98, a), pol(cx, cy, 114, a); f.L(p[0], p[1], q[0], q[1], 'white', 1.6 if i % 5 == 0 else 0.8)
for i in range(10): x, y = pol(cx, cy, 82, i * 36); f.T(x, y + 5, str(i), 14, 'white', 'middle', bold=True, check=False)
t = pol(cx, cy, 96, 4.6 * 36); f.L(cx, cy, t[0], t[1], 'white', 3, cap='round'); t = pol(cx, cy, 60, 3.46 * 36); f.L(cx, cy, t[0], t[1], 'white', 7, cap='round')
t = pol(cx, cy, 42, 1.346 * 36); f.L(cx, cy, t[0], t[1], 'hot', 3); f.Ci(cx, cy, 7, 'ink', 1.2, 'steel')
f.R(cx - 28, cy - 62, 56, 20, c='ink', sw=1, fill='g3', rx=2); f.T(cx, cy - 48, '1013', 10, 'white', 'middle', mono=True, check=False)
table(f, 380, 60, [110, 230], ['pointer', 'reads'], [('long', 'hundreds: 460'), ('short, broad', 'thousands: 3'), ('small', 'tens of thousands: 1'), ('total', '13 460 ft')], 'gold')
f.T(550, 220, 'The small pointer is easily missed:', 10.5, 'hot', 'middle', bold=True); f.T(550, 236, 'misread risk of exactly 10 000 ft.', 10.5, 'hot', 'middle')
IN.append(f)

f = I('05_06', 'Altitude Tape on an EFIS Display', 760, 300, 'A vertical altitude tape with the current altitude in a box, the selected altitude bug, a trend vector and the baro setting below',
    '<b>Reading the electronic altimeter.</b> Altitude is shown as a <b>moving vertical tape</b> with the current value in a <b>box</b> (often with a rolling digit). The <b>selected altitude</b> from the autopilot panel is shown above the tape and as a bug on it; a <b>vertical-speed</b> scale may sit alongside. Below the tape is the <b>barometric setting</b> (QNH, or STD for 1013), which flashes if not reset at the transition. The radio altitude and minimums are shown nearby.')
screen(f, 260, 20, 240, 270); f.R(330, 60, 90, 200, c='line', sw=1, fill='#232b30', rx=2)
for k, v in enumerate(('7000', '6500', '6000', '5500', '5000')): f.T(375, 74 + k * 46, v, 11, 'white', 'middle', mono=True, check=False)
f.R(318, 146, 112, 30, c='gold', sw=2, fill='black', rx=2); f.T(374, 167, '6 120', 14, 'white', 'middle', bold=True, mono=True, check=False)
f.P('M420,64 L432,64 L432,82 L420,82', 'mag', 3); f.T(374, 46, '7000', 12, 'mag', 'middle', bold=True, mono=True, check=False)
f.L(326, 160, 326, 120, 'green', 3, me='green'); f.T(374, 280, 'QNH 1018', 11, 'cool', 'middle', mono=True, check=False)
f.legend(530, 50, [(1, 'Selected altitude', 'magenta, from the MCP/FCU'), (2, 'Current altitude', 'boxed digital readout'), (3, 'Trend vector', 'where it will be in 6 s'), (4, 'Baro setting', 'QNH, or STD for 1013')], step=48)
f.badge(300, 46, 1); f.badge(300, 161, 2); f.badge(300, 116, 3); f.badge(300, 276, 4)
IN.append(f)

f = I('05_07', 'Servo-Assisted Altimeter', 760, 300, 'A capsule moving an E and I bar pickoff whose signal drives a servo motor that positions the pointer and counter and nulls the error',
    '<b>Removing friction errors.</b> In a <b>servo altimeter</b> the capsule does not drive the pointer directly. Its tiny movement shifts an <b>I-bar</b> relative to an <b>E-bar</b> transformer; any misalignment produces an error signal that is amplified and drives a <b>servo motor</b>. The motor turns the pointer and counter and, through a cam, moves the E-bar until the signal is zero again. The capsule therefore moves almost no load, giving high accuracy and fast response; on power failure a warning flag appears.')
f.R(40, 100, 120, 80, c='ink', sw=1.6, fill='g3', rx=6); capsule_stack(f, 60, 140, 1, 80); f.T(100, 200, 'capsule', 10, 'ink', 'middle', bold=True)
f.R(200, 110, 20, 60, c='ink', sw=1.4, fill='steel', rx=1); f.T(210, 196, 'I-bar', 9.5, 'dim', 'middle'); f.L(160, 140, 200, 140, 'ink', 2.4)
f.P('M240,110 L280,110 L280,170 L240,170 M240,140 L280,140', 'gold', 3); f.T(260, 196, 'E-bar', 9.5, 'gold', 'middle')
f.box(320, 115, 110, 50, ['amplifier'], c='cool', size=10.5); f.L(282, 140, 318, 140, 'cool', 1.8, me='cool')
f.box(470, 115, 110, 50, ['servo motor'], c='ink', size=10.5); f.L(430, 140, 468, 140, 'ink', 1.8, me='ink')
f.box(620, 110, 110, 60, ['pointer and', 'counter'], c='gold', size=10.5); f.L(580, 140, 618, 140, 'ink', 3)
f.P('M525,165 L525,240 L260,240 L260,172', 'green', 1.8, dash='6 4', me='green', join='round'); f.T(390, 258, 'cam feedback moves the E-bar to null the signal', 10, 'green', 'middle', bold=True)
f.T(380, 40, 'the capsule only moves the I-bar: almost no load, high accuracy', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('05_08', 'Pressure Error — Flying from High to Low', 760, 300, 'An aircraft holding a constant altimeter reading while flying towards lower pressure, its true altitude falling',
    '<b>“High to low, look out below.”</b> An altimeter shows height above the pressure set on its subscale. Flying towards an area of <b>lower</b> pressure without resetting, the aircraft follows a constant-pressure surface that slopes <b>down</b>: the altimeter keeps reading the same but the aircraft is getting <b>lower</b>, and the instrument <b>over-reads</b>. About 30 ft per hPa: a 10 hPa drop means about 300 ft lower than indicated. The same applies to flying into colder air (“high to low temperature”). Regular QNH updates remove the error.')
f.L(40, 260, 720, 260, 'ink', 1.6); f.T(80, 284, 'MSL', 10, 'cool')
f.P('M60,90 L700,180', 'gold', 2.2, dash='8 5'); f.T(330, 184, 'aircraft follows the pressure surface set on the subscale', 10, 'gold', 'middle')
f.L(60, 90, 700, 90, 'dim', 1.4, dash='3 4'); f.T(700, 82, 'where the pilot thinks the aircraft is', 9.5, 'dim', 'end')
f.raw(aircraft(110, 86, 8, 0.32, flip=True)); f.raw(aircraft(640, 170, 8, 0.32, flip=True))
f.T(110, 120, 'altimeter: 5 000 ft', 10, 'ink', 'middle', bold=True); f.T(640, 200, 'still reads 5 000 ft', 10, 'ink', 'middle', bold=True)
f.L(680, 94, 680, 174, 'hot', 1.8, me='hot', ms='hot'); f.T(674, 136, 'about 300 ft lower', 10, 'hot', 'end', bold=True)
f.L(360, 40, 470, 40, 'cool', 2, me='cool'); f.T(360, 30, 'towards LOW pressure', 10, 'cool')
f.T(380, 236, '“High to low, look out below”: the altimeter over-reads.', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('05_09', 'Blocked Static Source — Altimeter Freezes', 760, 300, 'A blocked static vent trapping pressure in the altimeter case so the reading stays constant while the aircraft climbs or descends',
    '<b>Effects of a blocked static source.</b> If ice or debris blocks the static vent, the pressure trapped in the instruments no longer changes. The <b>altimeter freezes</b> at the altitude where the blockage occurred; the <b>VSI</b> reads <b>zero</b>; the <b>ASI</b> becomes a reverse altimeter — in a climb the trapped static is higher than the real static, so it <b>under-reads</b>; in a descent it <b>over-reads</b>. Remedy: select the <b>alternate static</b> source, or break the VSI glass in an emergency. Cross-check with GPS altitude.')
f.R(60, 120, 160, 80, c='ink', sw=1.6, fill='g3', rx=6); f.T(140, 166, 'altimeter', 11, 'ink', 'middle', bold=True)
f.L(220, 160, 400, 160, 'cool', 4); f.R(400, 140, 40, 40, c='hot', sw=1.6, fill='hot', rx=4, op=0.85); f.T(420, 214, 'ice blocks the static vent', 10, 'hot', 'middle', bold=True)
table(f, 480, 60, [80, 170], ['instrument', 'effect'], [('altimeter', 'freezes'), ('VSI', 'reads zero'), ('ASI (climb)', 'under-reads'), ('ASI (descent)', 'over-reads')], 'gold')
f.T(380, 280, 'Select the alternate static source; cross-check with GPS altitude.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

# VSI face and IVSI
f = I('06_04', 'VSI Instrument Face', 760, 300, 'A vertical speed indicator face with zero at nine o\'clock, climb above and descent below, scaled in hundreds of feet per minute',
    '<b>Reading the VSI.</b> Zero is at the <b>9 o’clock</b> position; the pointer moves <b>up</b> for a climb and <b>down</b> for a descent, scaled in hundreds (or thousands) of feet per minute. The scale is usually <b>non-linear</b> — expanded near zero for precise level-flight and approach work, compressed at high rates. A conventional VSI <b>lags</b> by several seconds, so it shows trend; the pilot sets pitch with the attitude indicator and uses the VSI to confirm.')
cx, cy = 230, 150
f.Ci(cx, cy, 118, 'ink', 2.4, 'black')
for v, a in ((0, 270), (5, 300), (10, 330), (15, 0), (20, 30), (5, 240), (10, 210), (15, 180), (20, 150)):
    p, q = pol(cx, cy, 96, a), pol(cx, cy, 112, a); f.L(p[0], p[1], q[0], q[1], 'white', 2); x, y = pol(cx, cy, 78, a); f.T(x, y + 5, str(v), 13, 'white', 'middle', bold=True, check=False)
t = pol(cx, cy, 100, 300); f.L(cx, cy, t[0], t[1], 'gold', 3, cap='round'); f.Ci(cx, cy, 6, 'ink', 1, 'steel')
f.T(cx + 36, cy - 26, 'UP', 11, 'green', 'middle', bold=True, check=False); f.T(cx + 36, cy + 36, 'DOWN', 11, 'hot', 'middle', bold=True, check=False)
f.T(cx, cy + 6, '×100 ft/min', 9, 'white', 'middle', check=False)
note(f, 420, 80, ['Pointer shows 500 ft/min', 'climb.'], first='gold'); note(f, 420, 150, ['Expanded scale near', 'zero; lags several', 'seconds.'], first='ink')
IN.append(f)

f = I('06_05', 'Instantaneous VSI — Accelerometer Dashpots', 760, 300, 'An IVSI with two small dashpots containing weighted pistons that respond to vertical acceleration and create an immediate pressure difference',
    '<b>Removing the lag.</b> The <b>IVSI</b> adds an <b>accelerometer</b> unit: two small cylinders (dashpots) with weighted pistons held by springs, in the line to the capsule. When the aircraft starts to climb, the pistons lag under inertia and immediately change the pressure in the capsule, so the pointer moves <b>at once</b>; by the time the pistons settle, the normal metered pressure difference has built up and takes over. Turns can produce a brief false climb indication as the pistons respond to g.')
f.R(80, 70, 400, 180, c='ink', sw=2, fill='g2', rx=10); capsule_stack(f, 120, 160, 1, 100); f.T(170, 200, 'capsule', 10, 'ink', 'middle', bold=True)
for x in (300, 380):
    f.R(x, 90, 40, 110, c='ink', sw=1.6, fill='g3', rx=4); f.R(x + 4, 130, 32, 22, c='ink', sw=1.2, fill='gold', rx=2)
    f.P(f'M{x+20},{94} l-6,6 l12,6 l-12,6 l12,6 l-6,6 l0,6', 'green', 1.6)
f.T(360, 226, 'accelerometer dashpots', 10, 'gold', 'middle', bold=True); f.L(20, 230, 80, 230, 'cool', 4, me='cool'); f.T(20, 218, 'static', 10, 'cool', bold=True)
note(f, 520, 80, ['Weighted pistons lag in', 'a climb or descent: an', 'instant pressure change.'], first='gold'); note(f, 520, 170, ['Turns can give a brief', 'false climb indication.'], first='hot')
IN.append(f)

# Mach
f = I('07_03', 'CAS, TAS & Mach Number with Speed', 760, 300, 'Graph of Mach number, TAS and CAS, showing that at constant CAS in a climb TAS and Mach both increase',
    '<b>Why high-altitude aircraft fly Mach.</b> Climbing at constant CAS, TAS rises (lower density) and Mach rises faster still (the speed of sound falls with temperature). At high altitude the limiting factor becomes <b>Mach number</b> — the effects of compressibility — rather than dynamic pressure, so the crew changes from flying IAS/CAS to flying <b>Mach</b> at the crossover altitude, and the limits change from VMO to <b>MMO</b>. Mach = TAS ÷ local speed of sound (LSS = 38.94 √T kt, T in kelvin).')
f.L(100, 260, 100, 50, 'ink', 1.4, me='ink'); f.L(100, 260, 680, 260, 'ink', 1.4, me='ink'); f.T(680, 280, 'speed', 9.5, 'dim', 'end'); f.T(92, 60, 'altitude', 9.5, 'dim', 'end')
f.L(300, 260, 300, 80, 'cool', 2.6); f.T(300, 70, 'CAS constant', 10.5, 'cool', 'middle', bold=True)
f.L(300, 260, 470, 80, 'gold', 2.6); f.T(470, 70, 'TAS', 10.5, 'gold', 'middle', bold=True)
f.L(300, 260, 620, 80, 'hot', 2.6); f.T(620, 70, 'Mach', 10.5, 'hot', 'middle', bold=True)
f.L(100, 140, 680, 140, 'dim', 1, dash='4 4'); f.T(110, 132, 'crossover altitude: change to flying Mach', 10, 'ink', bold=True)
f.T(380, 290, 'Mach = TAS / LSS      LSS = 38.94 √T (kt, T in kelvin)', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('07_06', 'Combined Airspeed / Mach Indicator', 760, 300, 'An airspeed indicator with a moving red and white striped barber pole showing the maximum operating speed VMO or MMO',
    '<b>One instrument, two limits.</b> The combined ASI/Machmeter shows IAS on the dial and Mach in a window, and carries a <b>striped “barber’s pole”</b> pointer that shows the current <b>maximum operating speed</b>. At low altitude it shows <b>VMO</b> (a constant IAS); higher up, the barber’s pole moves <b>down</b> the scale as it tracks <b>MMO</b>, because a constant Mach number means a falling IAS with altitude. The crew keeps the pointer below the barber’s pole; exceeding it sounds the overspeed warning (clacker).')
cx, cy = 230, 150
dial(f, cx, cy, 110, -150, 150, [(i / 6, str(100 + i * 50)) for i in range(7)], ptr=0.6, size=10)
t = pol(cx, cy, 104, 120); f.raw(f'<line x1="{cx}" y1="{cy}" x2="{t[0]:.1f}" y2="{t[1]:.1f}" stroke="{col("hot")}" stroke-width="7" stroke-dasharray="6 6"/>')
f.R(cx - 30, cy + 34, 60, 22, c='gold', sw=1.4, fill='black', rx=2); f.T(cx, cy + 50, 'M .78', 11, 'white', 'middle', bold=True, mono=True, check=False)
f.legend(420, 80, [(1, "Barber's pole", 'VMO, or MMO converted to IAS'), (2, 'Airspeed pointer', 'IAS: keep below the barber’s pole'), (3, 'Mach window', 'current Mach number')], step=50)
f.badge(318, 82, 1); f.badge(300, 120, 2); f.badge(cx + 44, cy + 46, 3)
f.T(560, 250, 'With altitude the barber’s pole moves', 10, 'ink', 'middle'); f.T(560, 266, 'down the scale (MMO governs).', 10, 'ink', 'middle')
IN.append(f)

f = I('07_07', 'Machmeter', 760, 300, 'A machmeter with an airspeed capsule and an altitude capsule combining through a ratio arm to give Mach number',
    '<b>Mach number from two capsules.</b> Mach = TAS ÷ LSS, and the instrument computes it as a ratio of pressures: an <b>airspeed capsule</b> fed with pitot (expanding with dynamic pressure) and an <b>altitude capsule</b> (evacuated, expanding as static falls) both act on a <b>ratio arm</b>, so the pointer shows (pitot − static) ÷ static — which depends only on Mach. Temperature does not enter, so the machmeter needs <b>no temperature correction</b>. It suffers position error and, like the ASI, errors from blockages.')
f.R(60, 50, 440, 220, c='ink', sw=2, fill='g2', rx=10)
capsule_stack(f, 100, 120, 1, 100); f.T(150, 156, 'airspeed capsule', 9.5, 'hot', 'middle', bold=True); f.L(20, 120, 100, 120, 'hot', 3, me='hot'); f.T(20, 108, 'pitot', 10, 'hot', bold=True)
capsule_stack(f, 100, 220, 1, 100); f.T(150, 256, 'altitude capsule (evacuated)', 9.5, 'cool', 'middle', bold=True); f.L(20, 240, 60, 240, 'cool', 3, me='cool'); f.T(20, 228, 'static', 10, 'cool', bold=True)
f.L(200, 120, 300, 160, 'ink', 3); f.L(200, 220, 300, 180, 'ink', 3); f.L(300, 160, 300, 180, 'gold', 4); f.T(320, 174, 'ratio arm', 10, 'gold', bold=True)
f.L(300, 170, 420, 110, 'white', 2.4); f.T(430, 106, 'Mach', 10, 'ink', bold=True)
note(f, 530, 80, ['Mach = (pitot − static) / static', 'ratio: no temperature', 'correction needed.'], first='gold')
IN.append(f)

# ADC
f = I('08_01', 'Air Data System — Inputs & Outputs', 760, 300, 'Pitot, static, total air temperature and angle of attack inputs to an air data computer with outputs to displays and systems',
    '<b>One computer, many users.</b> The <b>air data computer (ADC)</b> takes <b>pitot</b> and <b>static</b> pressure, <b>total air temperature</b> and sometimes <b>angle of attack</b>, applies corrections (position error, compressibility), and computes <b>altitude, vertical speed, IAS/CAS, Mach, TAS, SAT</b> and overspeed warnings. Its outputs drive the displays, the flight management system, the autopilot and autothrottle, the transponder (altitude reporting), the GPWS, the pressurisation and the flight data recorder — replacing many separate pneumatic instruments.')
f.box(290, 100, 180, 100, ['AIR DATA', 'COMPUTER'], c='gold', size=13)
for k, lab in enumerate(('pitot', 'static', 'TAT', 'angle of attack')): y = 70 + k * 52; f.box(40, y, 160, 36, [lab], c='cool', size=10.5); f.L(200, y + 18, 288, 150, 'cool', 1.4, me='cool')
for k, lab in enumerate(('altitude, VS', 'IAS, Mach, TAS', 'SAT', 'to FMS, AP, A/T', 'transponder, GPWS, FDR')): y = 50 + k * 46; f.box(560, y, 170, 34, [lab], c='green', size=10); f.L(470, 150, 558, y + 17, 'green', 1.4, me='green')
IN.append(f)

f = I('08_02', 'Air Data Computer — Servo Mechanism', 760, 300, 'A pressure transducer feeding an error amplifier and servo motor that positions an output shaft driving synchros, with a feedback loop',
    '<b>How an analogue ADC computes.</b> Each channel uses a <b>pressure transducer</b> (a capsule with an E-and-I pickoff, or a solid-state sensor), an <b>amplifier</b> and a <b>servo motor</b> that drives an output shaft until the pickoff signal is nulled. Cams on the shaft shape the output to match the required function (e.g. pressure to altitude), and <b>synchros</b> or digital encoders on the shaft send the result to the instruments and systems. Modern digital ADCs use solid-state sensors and software, but the principle — measure, compute, output — is the same.')
w = flowrow(f, [(['pressure', 'transducer'], 'cool'), (['amplifier'], 'ink'), (['servo motor'], 'ink'), (['output shaft', 'cams'], 'gold'), (['synchros to', 'instruments'], 'green')], 110)
f.P('M500,160 L500,230 L110,230 L110,162', 'green', 1.8, dash='6 4', me='green', join='round'); f.T(300, 250, 'feedback nulls the pickoff signal', 10, 'green', 'middle', bold=True)
IN.append(f)

# Magnetism
f = I('09_03', 'Magnetising a Bar by Stroking', 760, 280, 'A permanent magnet stroked repeatedly along an iron bar in one direction, inducing poles in the bar',
    '<b>The simplest way to make a magnet.</b> Stroking a steel bar repeatedly from one end to the other with <b>one pole</b> of a magnet, always in the <b>same direction</b>, gradually aligns the bar’s domains. The end where each stroke <b>finishes</b> acquires the <b>opposite</b> polarity to the stroking pole: stroking with a north pole leaves a south pole at the finishing end. Hard steel keeps its magnetism (a permanent magnet); soft iron loses it.')
f.R(140, 170, 400, 40, c='ink', sw=1.6, fill='steel', rx=4); f.T(160, 196, 'N', 14, 'hot', bold=True, check=False); f.T(510, 196, 'S', 14, 'cool', bold=True, check=False)
f.R(400, 70, 50, 80, c='ink', sw=1.4, fill='hot', rx=4); f.T(425, 140, 'N', 13, 'white', 'middle', bold=True, check=False)
for k in range(3): f.P(f'M{180 + k * 10},{150 - k * 8} Q{340},{110 - k * 10} {510 - k * 10},{150 - k * 8}', 'gold', 1.4, me='gold', dash='5 4')
f.T(340, 60, 'stroke repeatedly in ONE direction', 11, 'gold', 'middle', bold=True)
f.T(340, 250, 'finishing end takes the OPPOSITE pole to the stroking pole', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('09_05', 'A Magnet as Aligned Molecular Magnets', 760, 260, 'A bar magnet broken into pieces, each piece still a complete magnet with its own north and south poles',
    '<b>Breaking a magnet makes more magnets.</b> Cut a bar magnet in half and each half has its own north and south pole; cut again and the same happens. This is because magnetism comes from countless tiny <b>aligned domains</b> (molecular magnets) throughout the material. In the middle of the bar the poles of neighbouring domains cancel; only at the ends are free poles left — so it is impossible to isolate a single magnetic pole.')
for k, (x, w) in enumerate(((80, 240), (380, 110), (510, 110))):
    f.R(x, 110, w / 2, 40, c='ink', sw=1.4, fill='hot', rx=2); f.R(x + w / 2, 110, w / 2, 40, c='ink', sw=1.4, fill='cool', rx=2)
    f.T(x + w / 4, 136, 'N', 12, 'white', 'middle', bold=True, check=False); f.T(x + 3 * w / 4, 136, 'S', 12, 'white', 'middle', bold=True, check=False)
f.T(200, 90, 'whole magnet', 10.5, 'ink', 'middle', bold=True); f.T(510, 90, 'broken: each piece is a magnet', 10.5, 'ink', 'middle', bold=True)
f.L(340, 130, 370, 130, 'dim', 1.6, me='dim')
f.T(380, 220, 'A single magnetic pole cannot be isolated.', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('09_06', 'The Earth as a Tilted Bar Magnet', 760, 300, 'The Earth with an imaginary bar magnet inside, its south pole under the north magnetic pole, tilted from the spin axis',
    '<b>Why a compass points north.</b> The Earth’s field is roughly that of a huge bar magnet inside it, tilted about 11° from the spin axis. Because a compass needle’s <b>north-seeking</b> end is attracted to it, the pole near the geographic North Pole is magnetically a <b>south</b> pole — the “blue” pole — even though it is called the north magnetic pole. Lines of force leave the southern hemisphere, run north over the surface and enter near the north magnetic pole.')
cx, cy, R = 250, 150, 110
f.Ci(cx, cy, R, 'ink', 2, 'g3'); f.L(cx, cy - R - 24, cx, cy + R + 24, 'ink', 1.4, dash='5 4')
f.raw(f'<g transform="rotate(-11 {cx} {cy})"><rect x="{cx-12}" y="{cy-70}" width="24" height="70" fill="{col("cool")}"/><rect x="{cx-12}" y="{cy}" width="24" height="70" fill="{col("hot")}"/>'
      f'<text x="{cx}" y="{cy-30}" font-family="Overpass,sans-serif" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">S</text><text x="{cx}" y="{cy+44}" font-family="Overpass,sans-serif" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">N</text></g>')
for d in (-1, 1): f.P(f'M{cx + d * 18},{cy + 100} C{cx + d * 160},{cy + 60} {cx + d * 160},{cy - 60} {cx + d * 18},{cy - 100}', 'gold', 1.4, dash='5 4', me='gold')
f.T(cx + 10, cy - R - 28, 'true (geographic) north', 10, 'ink'); f.T(cx - 34, cy - R - 10, 'north magnetic pole', 10, 'cool', 'end', bold=True)
note(f, 420, 80, ['The magnetic pole in the', 'north is magnetically a', 'SOUTH (blue) pole: it', 'attracts the north-seeking', 'end of a compass needle.'], first='cool')
note(f, 420, 200, ['Magnetic axis tilted', 'about 11° from the', 'spin axis.'], first='ink')
IN.append(f)

f = I('09_07', 'Variation — True vs Magnetic Meridian', 760, 300, 'At one place the true meridian points to true north and the magnetic meridian to magnetic north, with the angle between them labelled variation',
    '<b>Variation</b> is the angle, at any place, between the <b>true meridian</b> (towards the geographic pole) and the <b>magnetic meridian</b> (the direction a freely suspended needle settles). It is <b>east</b> if magnetic north lies east of true north and <b>west</b> if it lies west, and is shown on charts by <b>isogonals</b>. To convert: true = magnetic + easterly variation, or − westerly. “Variation east, magnetic least; variation west, magnetic best.”')
O = (300, 260); f.L(O[0], O[1], O[0], 50, 'ink', 2.2, me='ink'); f.T(O[0], 40, 'TRUE N', 11, 'ink', 'middle', bold=True)
m = pol(O[0], O[1], 200, -15); f.L(O[0], O[1], m[0], m[1], 'cool', 2.2, me='cool'); f.T(m[0] - 6, m[1] - 8, 'MAGNETIC N', 11, 'cool', 'end', bold=True)
p, q = pol(O[0], O[1], 120, -15), pol(O[0], O[1], 120, 0); f.P(f'M{p[0]:.1f},{p[1]:.1f} A120,120 0 0 1 {q[0]:.1f},{q[1]:.1f}', 'gold', 2); f.T(O[0] - 30, O[1] - 130, 'variation 15°W', 11, 'gold', 'end', bold=True)
note(f, 420, 80, ['Variation east, magnetic least.', 'Variation west, magnetic best.'], first='gold')
note(f, 420, 160, ['Example: true track 090°,', 'variation 15°W:', 'magnetic track 105°.'], first='ink')
IN.append(f)

f = I('09_08', 'Magnetic Dip — H, Z & T Components', 760, 300, 'The total field T at an angle below the horizontal resolved into a horizontal component H and a vertical component Z, with the dip angle',
    '<b>The field is not horizontal.</b> Except at the magnetic equator, the Earth’s total field <b>T</b> slopes down into the ground at an angle — the <b>dip</b> (inclination). It resolves into a <b>horizontal component H</b>, which aligns the compass with the magnetic meridian, and a <b>vertical component Z</b>, which tilts the needle down and causes compass errors. tan(dip) = Z ÷ H. As H weakens towards the magnetic poles, the compass becomes sluggish and unreliable; within about 1 000 nm of the poles it is not usable.')
O = (180, 90); H = (560, 90); Z = (180, 240)
f.L(O[0], O[1], H[0], H[1], 'gold', 3, me='gold'); f.T(370, 80, 'H: horizontal component', 11, 'gold', 'middle', bold=True)
f.L(O[0], O[1], Z[0], Z[1], 'cool', 3, me='cool'); f.T(170, 170, 'Z: vertical', 11, 'cool', 'end', bold=True)
f.L(O[0], O[1], H[0], Z[1], 'hot', 3.4, me='hot'); f.T(400, 190, 'T: total field', 11, 'hot', bold=True)
f.L(H[0], H[1], H[0], Z[1], 'dim', 1.2, dash='4 4'); f.L(Z[0], Z[1], H[0], Z[1], 'dim', 1.2, dash='4 4')
ang = math.degrees(math.atan2(150, 380)); f.P(f'M{O[0]+90},{O[1]} A90,90 0 0 1 {O[0] + 90 * math.cos(math.radians(ang)):.1f},{O[1] + 90 * math.sin(math.radians(ang)):.1f}', 'white', 1.6)
f.T(O[0] + 100, O[1] + 26, 'dip', 11, 'white', bold=True)
f.T(380, 282, 'tan (dip) = Z / H', 12, 'gold', 'middle', bold=True)
IN.append(f)

f = I('09_09', 'Dip Varies with Magnetic Latitude', 760, 300, 'The Earth with small compass needles showing horizontal at the magnetic equator, tilted at mid latitudes and vertical at the magnetic poles',
    '<b>Dip goes from 0° to 90°.</b> At the <b>magnetic equator</b> (aclinic line) the field is horizontal: dip is <b>0°</b>, H is at its maximum and Z is zero — the compass works best. Moving towards either magnetic pole the field tilts more steeply; at the poles it is <b>vertical</b>: dip <b>90°</b>, H zero, and a compass has no directive force at all. Lines joining places of equal dip are <b>isoclinals</b>. In the northern hemisphere the north-seeking end dips; in the southern, the south-seeking end.')
cx, cy, R = 230, 165, 100
f.Ci(cx, cy, R, 'ink', 2, 'g3'); f.L(cx - R, cy, cx + R, cy, 'cool', 1.4, dash='5 4'); f.T(cx + R + 26, cy + 4, 'magnetic equator: dip 0°', 10, 'cool', bold=True)
for lat in (-90, -60, -30, 0, 30, 60, 90):
    a = 90 - lat; p = pol(cx, cy, R + 18, a); d = math.atan(2 * math.tan(math.radians(lat)))
    ang = math.degrees(d); dx, dy = 12 * math.cos(math.radians(ang)), 12 * math.sin(math.radians(ang))
    f.L(p[0] - dx, p[1] - dy, p[0] + dx, p[1] + dy, 'hot', 3, cap='round')
f.T(cx, cy - R - 32, 'magnetic pole: dip 90°', 10, 'hot', 'middle', bold=True)
note(f, 520, 70, ['Dip 0° at the magnetic equator:', 'H maximum, compass best.'], first='cool')
note(f, 520, 210, ['Dip 90° at the magnetic poles:', 'H zero, compass useless.'], first='hot')
IN.append(f)

f = I('10_02', 'Forces on the Pendulous Magnet', 760, 300, 'A compass magnet system hung below its pivot, with the vertical component of the field trying to dip it and its weight acting below the pivot to keep it nearly level',
    '<b>Keeping the magnet level.</b> To stop the vertical component <b>Z</b> pulling the magnets down (dip), the magnet system is hung <b>below</b> its pivot — <b>pendulous</b>. Its <b>weight W</b> acts through the centre of gravity, displaced slightly from the pivot towards the equator, and balances Z, leaving only a small residual dip of a few degrees. But because the CG is now displaced from the pivot, any <b>acceleration or turn</b> makes the inertia of the magnet act through the CG and swing it — the origin of acceleration and turning errors.')
P = (380, 90); f.Ci(P[0], P[1], 6, 'ink', 1, 'ink'); f.T(P[0] + 10, P[1] - 6, 'pivot', 10, 'ink')
f.L(P[0], P[1], 380, 170, 'ink', 2); f.raw(f'<g transform="rotate(-4 380 180)"><rect x="300" y="170" width="160" height="16" fill="{col("hot")}" stroke="{col("ink")}" stroke-width="1.4"/></g>')
f.Ci(366, 178, 4, 'gold', 1, 'gold'); f.L(366, 182, 366, 250, 'gold', 2.4, me='gold'); f.T(372, 246, 'W (weight, through the CG)', 10, 'gold', bold=True)
f.L(450, 172, 450, 230, 'cool', 2.4, me='cool'); f.T(458, 226, 'Z (vertical field)', 10, 'cool', bold=True)
f.L(300, 172, 260, 172, 'hot', 1.6, me='hot'); f.T(250, 176, 'H', 11, 'hot', 'end', bold=True)
note(f, 40, 70, ['Magnet hung below the pivot:', 'weight balances Z, leaving a', 'small residual dip.'], first='ink')
note(f, 520, 70, ['CG offset from the pivot:', 'accelerations swing the magnet', '(acceleration and turning errors).'], first='hot')
IN.append(f)

f = I('10_06', 'Direct-Reading Compass — Magnet & Card', 760, 300, 'A compass bowl with the magnet system, card and float on a pivot in liquid, with the lubber line and expansion chamber',
    '<b>Inside the E2B-type compass.</b> Two or more <b>magnets</b> are fixed to a <b>card</b> (marked in degrees) and a <b>float</b> that reduces the weight on the jewelled <b>pivot</b>. The assembly sits in a bowl of <b>liquid</b> (a non-freezing fluid) that damps oscillations, with an <b>expansion chamber</b> to allow for temperature changes. The pilot reads the heading against the <b>lubber line</b>, fixed to the bowl and aligned with the aircraft’s longitudinal axis. Deviation-compensating magnets are adjusted during a compass swing.')
f.Ci(260, 160, 120, 'ink', 2.4, 'g3'); f.raw(f'<circle cx="260" cy="160" r="114" fill="{col("cool")}" opacity=".18"/>')
f.R(170, 150, 180, 20, c='ink', sw=1.4, fill='gold', rx=4); f.T(260, 164, 'card', 10, '#10171b', 'middle', bold=True, check=False)
f.R(196, 176, 128, 10, c='ink', sw=1, fill='hot', rx=2); f.R(196, 192, 128, 10, c='ink', sw=1, fill='hot', rx=2)
f.L(260, 206, 260, 250, 'ink', 3); f.P('M252,250 L268,250 L260,240 Z', 'ink', 1, 'white'); f.T(276, 254, 'pivot', 9.5, 'ink')
f.L(260, 30, 260, 60, 'white', 3); f.T(272, 24, 'lubber line', 10, 'white', bold=True)
f.R(380, 140, 20, 50, c='ink', sw=1.4, fill='steel', rx=4); f.T(410, 170, 'expansion chamber', 9.5, 'ink')
f.T(186, 200, 'magnets', 9.5, 'white', 'end'); f.T(260, 294, 'bowl filled with damping liquid', 10, 'cool', 'middle')
note(f, 470, 70, ['Read heading against the', 'lubber line.'], first='ink'); note(f, 470, 130, ['Liquid damps swinging;', 'float lightens the pivot.'], first='cool')
IN.append(f)

# gyros
f = I('11_01', 'The Spinning Gyro Rotor', 760, 300, 'A heavy rotor spinning about its axis with its rigidity in space and the factors that increase it',
    '<b>Rigidity in space.</b> A spinning rotor resists any change in the direction of its spin axis. That <b>rigidity</b> increases with the rotor’s <b>mass</b> — especially mass concentrated at the <b>rim</b> (moment of inertia) — and with its <b>speed of rotation</b>. Instrument gyros use a heavy brass or steel rotor spun at 10 000–25 000 rpm. The second property, <b>precession</b>, is what happens when a force does manage to act on it.')
f.El(250, 150, 140, 46, 'ink', 2, 'steel'); f.El(250, 150, 140, 46, 'gold', 6); f.L(70, 150, 430, 150, 'hot', 2.4, dash='8 4')
f.P('M330,110 A80,26 0 0 1 340,190', 'gold', 2.4, me='gold'); f.T(360, 100, 'spin', 11, 'gold', bold=True)
f.T(250, 240, 'heavy rim: high moment of inertia', 10.5, 'ink', 'middle', bold=True); f.T(70, 172, 'spin axis', 10, 'hot')
note(f, 470, 80, ['Rigidity increases with:', 'mass (at the rim),', 'rotor speed.'], first='gold'); note(f, 470, 170, ['Instrument gyros:', '10 000–25 000 rpm.'], first='ink')
IN.append(f)

f = I('11_14', 'Single-Gimbal (Rate) Gyro', 760, 300, 'A gyro rotor in one gimbal with freedom about a single axis, restrained by springs, used to measure rate of turn',
    '<b>Measuring a rate.</b> A <b>rate gyro</b> has only <b>one</b> gimbal, so it is free to move about just one axis, and that movement is <b>restrained by springs</b>. When the aircraft turns about the measured axis, the gyro is forced to turn with it; precession tilts the gimbal against the springs until the spring force balances the precessing force — and that happens at a deflection <b>proportional to the rate of turn</b>. It is the heart of the turn indicator and of yaw dampers and stabilisation systems.')
f.R(160, 80, 220, 140, c='gold', sw=4, fill='none', rx=10); f.El(270, 150, 80, 26, 'ink', 2, 'steel'); f.L(160, 150, 120, 150, 'ink', 4); f.L(380, 150, 420, 150, 'ink', 4)
f.P('M120,150 l0,-30 l10,-6 l-20,-6 l20,-6 l-10,-6', 'green', 2); f.P('M420,150 l0,-30 l10,-6 l-20,-6 l20,-6 l-10,-6', 'green', 2)
f.T(270, 250, 'one gimbal, restrained by springs', 10.5, 'gold', 'middle', bold=True); f.T(110, 96, 'spring', 9.5, 'green', 'end')
note(f, 470, 80, ['Turn about the input axis:', 'gimbal precesses against', 'the springs.'], first='ink'); note(f, 470, 170, ['Deflection proportional', 'to RATE of turn.'], first='gold')
IN.append(f)

f = I('12_08', 'DGI Apparent Wander from Earth Rotation', 760, 280, 'A directional gyro at the North Pole holding its direction in space while the Earth turns beneath it at fifteen degrees per hour',
    '<b>Why a perfect DGI still drifts.</b> The gyro holds its direction fixed <b>in space</b>, but the Earth turns beneath it at 15° per hour. At the pole a DGI therefore appears to wander by 15°/h; at the equator, by zero; in between, by <b>15 × sin(latitude) °/h</b>. It decreases the reading in the northern hemisphere and increases it in the southern. Instrument makers fit a <b>latitude nut</b> to cancel the drift for one latitude, and pilots realign the DGI with the compass every 10–15 minutes.')
f.Ci(200, 140, 100, 'cool', 2, 'g3'); [f.L(200, 140, *pol(200, 140, 100, a), 'line', 1) for a in range(0, 360, 30)]
p, q = pol(200, 140, 118, 20), pol(200, 140, 118, 80); f.P(f'M{p[0]:.1f},{p[1]:.1f} A118,118 0 0 1 {q[0]:.1f},{q[1]:.1f}', 'gold', 2.4, me='gold'); f.T(326, 100, '15° per hour', 11, 'gold', bold=True)
f.T(200, 264, 'viewed from above the pole', 10, 'faint', 'middle')
note(f, 420, 60, ['Apparent wander =', '15 × sin(latitude) °/h'], first='gold'); note(f, 420, 130, ['N hemisphere: reading decreases.', 'S hemisphere: reading increases.'], first='ink'); note(f, 420, 200, ['Realign with the compass', 'every 10–15 minutes.'], first='hot')
IN.append(f)

f = I('13_07', 'Air-Driven Horizon — Vane Erection Reaction', 760, 280, 'The four exhaust ports under a tilted air driven gyro, with one fully open producing a reaction force that precesses the gyro back upright',
    '<b>How the erection force works.</b> Air leaving the gyro housing escapes through four slots, each half-covered by a pendulous vane. Upright, the four jets balance. If the gyro tilts, gravity keeps the vanes hanging vertically, so one slot <b>opens fully</b> and the opposite one <b>closes</b>. The unbalanced jet produces a <b>reaction force</b> on the housing; because of precession that force acts 90° on, moving the spin axis back to the <b>vertical</b>. In a sustained acceleration or turn the vanes swing falsely, causing the classic pitch and bank errors of the air-driven horizon.')
f.R(250, 60, 160, 90, c='gold', sw=2, fill='g3', rx=10); f.T(330, 110, 'rotor housing', 10, 'ink', 'middle', bold=True)
f.R(290, 150, 80, 60, c='ink', sw=1.6, fill='g2', rx=4)
f.L(290, 180, 200, 180, 'cool', 4, me='cool'); f.T(196, 170, 'full jet', 10, 'cool', 'end', bold=True)
f.L(370, 180, 384, 180, 'cool', 1.2); f.T(392, 184, 'slot closed', 10, 'dim')
f.T(330, 250, 'reaction force on the housing; precession erects the gyro', 10.5, 'hot', 'middle', bold=True)
note(f, 470, 70, ['Tilted gyro: vanes hang', 'vertical, one slot opens,', 'its opposite closes.'], first='ink')
IN.append(f)

# Turn & slip
f = I('14_02', 'Rate Gyro — Precession Against the Scale', 760, 300, 'A turn indicator rate gyro in plan view with the aircraft yawing, the gimbal precessing and the pointer moving across the scale',
    '<b>From turn to pointer.</b> The turn indicator’s gyro spins about the aircraft’s lateral axis in a gimbal free to tilt about the longitudinal axis. When the aircraft <b>yaws</b> (turns), the gyro is forced round; <b>precession</b> makes it tilt about the longitudinal axis, against a calibrated spring. A linkage turns the tilt into pointer movement, so the pointer shows the <b>rate of turn</b>. At the <b>rate-one</b> mark the aircraft turns at <b>3° per second</b> — 360° in 2 minutes.')
f.R(180, 90, 200, 120, c='gold', sw=3, fill='none', rx=8); f.El(280, 150, 28, 52, 'ink', 2, 'steel'); f.L(160, 150, 180, 150, 'ink', 4); f.L(380, 150, 400, 150, 'ink', 4)
f.P('M240,240 A70,30 0 0 0 330,240', 'hot', 2.4, me='hot'); f.T(285, 278, 'aircraft yaws (turns)', 10, 'hot', 'middle', bold=True)
f.P('M390,90 A40,40 0 0 1 400,130', 'gold', 2.4, me='gold'); f.T(410, 96, 'gimbal precesses', 10, 'gold', bold=True)
dial(f, 590, 150, 80, -60, 60, [(0, 'L'), (0.5, ''), (1, 'R')], ptr=0.75, size=12)
f.T(590, 260, 'rate-one mark: 3° per second', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('14_03', 'Level Flight — Lift Balances Weight', 760, 260, 'An aircraft in wings level flight from behind with lift up and weight down balanced',
    '<b>The starting point for the balance ball.</b> In straight and level, unaccelerated flight, <b>lift</b> acts straight up and equals <b>weight</b> acting straight down. There is no sideways force, so a ball in a curved tube — the slip indicator — rests in the <b>centre</b> under gravity alone.')
f.raw(f'<g transform="translate(380 150)"><line x1="-160" y1="0" x2="160" y2="0" stroke="{col("gold")}" stroke-width="7" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="22" ry="20" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="1.6"/><line x1="0" y1="-20" x2="0" y2="-52" stroke="{col("gold")}" stroke-width="6" stroke-linecap="round"/></g>')
f.L(380, 128, 380, 50, 'green', 3, me='green'); f.T(392, 60, 'LIFT', 11, 'green', bold=True); f.L(380, 172, 380, 240, 'hot', 3, me='hot'); f.T(392, 232, 'WEIGHT', 11, 'hot', bold=True)
f.P('M560,200 Q620,230 680,200', 'ink', 2); f.Ci(620, 214, 9, 'ink', 1, 'white'); f.T(620, 250, 'ball centred', 10, 'ink', 'middle', bold=True)
IN.append(f)

f = I('14_04', 'The Balance Ball (Slip Indicator)', 760, 260, 'A curved glass tube filled with damping liquid containing a ball, with two reference wires at the centre',
    '<b>A pendulum in a tube.</b> The slip indicator is a <b>curved glass tube</b> filled with a damping liquid (kerosene-type) containing a <b>steel or agate ball</b>. Gravity and any sideways acceleration act on the ball; it settles where the <b>resultant</b> force points. Two vertical reference wires mark the centre. The ball is centred whenever the resultant of gravity and centrifugal force acts straight down through the floor of the aircraft — balanced (coordinated) flight.')
f.P('M180,120 Q380,230 580,120', 'ink', 18); f.P('M180,120 Q380,230 580,120', 'cool', 12); f.Ci(380, 174, 12, 'ink', 1.4, 'white')
f.L(364, 150, 364, 196, 'ink', 1.6); f.L(396, 150, 396, 196, 'ink', 1.6)
f.T(380, 60, 'curved tube filled with damping liquid', 10.5, 'cool', 'middle', bold=True); f.T(380, 236, 'ball and reference wires', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('14_05', 'Forces in a Banked Turn', 760, 300, 'An aircraft banked in a turn with tilted lift split into a vertical component balancing weight and a horizontal component providing the centripetal force',
    '<b>Banking provides the turning force.</b> In a turn, lift is tilted with the wings. Its <b>vertical component</b> must still equal weight, so total lift — and the load factor — must increase (1.15 g at 30° bank, 2 g at 60°). Its <b>horizontal component</b> provides the <b>centripetal force</b> that pulls the aircraft round the turn. Inside the aircraft, the occupants and the ball feel an equal and opposite <b>centrifugal</b> reaction. In a balanced turn the resultant of weight and centrifugal force acts straight down through the floor.')
f.raw(f'<g transform="translate(320 160) rotate(-30)"><line x1="-150" y1="0" x2="150" y2="0" stroke="{col("gold")}" stroke-width="7" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="22" ry="20" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="1.6"/></g>')
t = pol(320, 160, 130, -30); f.L(320, 160, t[0], t[1], 'green', 3, me='green'); f.T(t[0] - 6, t[1] - 4, 'total lift', 11, 'green', 'end', bold=True)
f.L(320, 160, 320, 48, 'green', 1.8, dash='5 4', me='green'); f.T(326, 60, 'vertical component = weight', 10, 'green')
f.L(320, 160, 255, 160, 'gold', 2.4, me='gold'); f.T(250, 156, 'centripetal', 10, 'gold', 'end', bold=True)
f.L(320, 160, 320, 270, 'hot', 3, me='hot'); f.T(330, 262, 'weight', 10.5, 'hot', bold=True)
f.L(320, 200, 400, 200, 'cool', 2, me='cool', dash='5 4'); f.T(406, 204, 'centrifugal reaction', 10, 'cool')
f.T(560, 90, 'turning left', 10.5, 'ink', 'middle', bold=True); f.T(560, 110, 'load factor = 1 / cos(bank)', 10, 'dim', 'middle')
IN.append(f)

f = I('14_06', 'Ball Centred in a Balanced Turn', 760, 260, 'A banked aircraft with the resultant of weight and centrifugal force acting through the floor and the ball centred',
    '<b>Coordinated flight.</b> When the angle of bank is correct for the rate of turn, the resultant of <b>weight</b> and <b>centrifugal reaction</b> acts exactly perpendicular to the cabin floor. The occupants are pressed straight down into their seats and the ball sits in the <b>centre</b>. This is a balanced, coordinated turn: no slip or skid, minimum drag.')
f.raw(f'<g transform="translate(260 140) rotate(-25)"><line x1="-130" y1="0" x2="130" y2="0" stroke="{col("gold")}" stroke-width="7" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="20" ry="18" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="1.6"/></g>')
r = pol(260, 140, 110, 155); f.L(260, 140, r[0], r[1], 'gold', 3, me='gold'); f.T(r[0] + 8, r[1], 'resultant: through the floor', 10, 'gold', bold=True)
f.P('M500,170 Q590,210 680,170', 'ink', 2); f.Ci(590, 190, 9, 'ink', 1, 'white'); f.T(590, 236, 'ball centred: balanced', 10.5, 'green', 'middle', bold=True)
IN.append(f)

f = I('14_07', 'Ball Off-Centre — Slip & Skid', 760, 300, 'Two turn and slip displays: a slip with the ball to the inside of the turn and a skid with the ball to the outside, with the rudder correction',
    '<b>Step on the ball.</b> In a <b>slip</b> the bank is too steep for the rate of turn: the aircraft slides inward and the ball moves to the <b>inside</b> of the turn. In a <b>skid</b> the rate of turn is too high for the bank (too much rudder): centrifugal force throws the ball to the <b>outside</b>. In either case, apply rudder on the side the ball has moved to — “<b>step on the ball</b>” — to centre it (or adjust bank).')
for i, (x0, ttl, bx, rule, c_) in enumerate(((60, 'SLIP: ball to the INSIDE (left turn)', -40, 'too much bank: more left rudder', 'hot'), (420, 'SKID: ball to the OUTSIDE (left turn)', 40, 'too much rudder: more right rudder', 'cool'))):
    f.T(x0 + 140, 50, ttl, 11, c_, 'middle', bold=True)
    f.R(x0 + 40, 80, 200, 140, c='ink', sw=1.8, fill='black', rx=8); f.L(x0 + 140, 140, x0 + 90, 120, 'white', 4, cap='round')
    f.P(f'M{x0+60},170 Q{x0+140},210 {x0+220},170', 'cool', 10); f.Ci(x0 + 140 + bx, 186 - abs(bx) * 0.25, 8, 'ink', 1, 'white'); f.L(x0 + 132, 176, x0 + 132, 200, 'white', 1); f.L(x0 + 148, 176, x0 + 148, 200, 'white', 1)
    f.T(x0 + 140, 250, rule, 10.5, 'ink', 'middle', bold=True)
f.T(380, 290, '“Step on the ball”: rudder on the side the ball has gone.', 11, 'gold', 'middle', bold=True)
IN.append(f)

f = I('14_09', 'Turn & Slip Indicator Face', 760, 280, 'A turn and slip indicator with a vertical needle showing rate of turn against rate one marks and a balance ball below',
    '<b>Reading the turn and slip indicator.</b> The <b>needle</b> (pivoted at the bottom) shows <b>rate of turn</b>: deflected to one doghouse mark it indicates a <b>rate-one</b> turn of 3°/s (a 2-minute turn). It shows rate only — not bank. The <b>ball</b> below shows balance (slip or skid). Instruments marked “2 MIN” are calibrated for rate one; “4 MIN” (on some fast aircraft) for half-rate. The gyro is usually electrically driven, so it serves as a backup to a vacuum-driven attitude indicator.')
cx, cy = 230, 150; f.Ci(cx, cy, 110, 'ink', 2.4, 'black')
P0 = (cx, cy + 30)  # needle pivot, below centre
p, q = pol(*P0, 92, 0), pol(*P0, 104, 0); f.L(p[0], p[1], q[0], q[1], 'white', 3)
for a in (-18, 18):  # doghouse marks: one needle-width either side = rate one
    t = pol(*P0, 96, a); f.P(f'M{t[0]-7:.1f},{t[1]+6:.1f} L{t[0]-7:.1f},{t[1]-4:.1f} L{t[0]:.1f},{t[1]-11:.1f} L{t[0]+7:.1f},{t[1]-4:.1f} L{t[0]+7:.1f},{t[1]+6:.1f}', 'white', 2)
t = pol(*P0, 88, -18); f.L(P0[0], P0[1], t[0], t[1], 'white', 5, cap='round'); f.Ci(P0[0], P0[1], 7, 'ink', 1.2, 'steel')
f.P(f'M{cx-58},{cy+58} Q{cx},{cy+84} {cx+58},{cy+58}', 'cool', 10); f.Ci(cx, cy + 71, 7, 'ink', 1, 'white'); f.L(cx - 9, cy + 60, cx - 9, cy + 82, 'white', 1); f.L(cx + 9, cy + 60, cx + 9, cy + 82, 'white', 1)
f.T(cx, cy - 26, '2 MIN', 10, 'white', 'middle', bold=True, check=False); f.T(cx - 74, cy + 16, 'L', 12, 'white', 'middle', bold=True, check=False); f.T(cx + 74, cy + 16, 'R', 12, 'white', 'middle', bold=True, check=False)
f.legend(420, 70, [(1, 'Needle', 'rate of turn only, not bank'), (2, 'Doghouse marks', 'rate one: 3°/s, 2-minute turn'), (3, 'Ball', 'balance: slip or skid')], step=52)
f.badge(cx - 52, cy - 10, 1); f.badge(cx + 60, cy - 70, 2); f.badge(cx + 76, cy + 86, 3)
IN.append(f)

f = I('15_01', 'Turn Coordinator Face', 760, 280, 'A turn coordinator with a miniature aircraft symbol banked to the rate one mark and a balance ball below',
    '<b>Rate of turn and rate of roll.</b> The turn coordinator’s gyro is canted upwards about 30°, so it senses <b>roll as well as yaw</b>: it responds as soon as the aircraft starts to roll into a turn, giving an earlier indication. The display is a miniature aircraft that banks to the <b>L or R</b> mark for a <b>rate-one</b> turn. Despite its look it does <b>not</b> show bank angle or pitch — it is still a rate instrument (“NO PITCH INFORMATION” is often printed on it). The ball shows balance as usual.')
cx, cy = 230, 150; f.Ci(cx, cy, 110, 'ink', 2.4, 'black')
for a in (250, 270, 90, 110): p, q = pol(cx, cy, 86, a), pol(cx, cy, 100, a); f.L(p[0], p[1], q[0], q[1], 'white', 3)
f.raw(f'<g transform="translate({cx} {cy}) rotate(-20)"><line x1="-70" y1="0" x2="70" y2="0" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="0" cy="0" r="10" fill="#fff"/><line x1="0" y1="-8" x2="0" y2="-24" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>')
f.P(f'M{cx-60},{cy+56} Q{cx},{cy+82} {cx+60},{cy+56}', 'cool', 10); f.Ci(cx, cy + 69, 7, 'ink', 1, 'white')
f.T(cx - 66, cy + 44, 'L', 12, 'white', 'middle', bold=True, check=False); f.T(cx + 66, cy + 44, 'R', 12, 'white', 'middle', bold=True, check=False); f.T(cx, cy - 60, 'NO PITCH INFORMATION', 8.5, 'white', 'middle', check=False)
note(f, 420, 70, ['Gyro canted about 30°:', 'senses roll and yaw,', 'responds earlier.'], first='gold'); note(f, 420, 160, ['Shows RATE of turn,', 'not bank angle or pitch.'], first='hot')
IN.append(f)

f = I('16_01', 'Deviation — Magnetic vs Compass Heading', 760, 280, 'Magnetic north and compass north at slightly different angles with the deviation between them',
    '<b>Deviation</b> is the angle between <b>magnetic north</b> and <b>compass north</b> — the direction the compass actually points, deflected by the aircraft’s own magnetism (steel parts, electrical currents). It is <b>east</b> (positive) if compass north is east of magnetic north, <b>west</b> (negative) if west, and it <b>changes with heading</b>. Residual deviation after compensation is recorded on the <b>deviation card</b> beside the compass. Magnetic = compass + easterly deviation (− westerly).')
O = (300, 250); m = pol(O[0], O[1], 200, 0); c = pol(O[0], O[1], 200, 8)
f.L(O[0], O[1], m[0], m[1], 'cool', 2.4, me='cool'); f.T(m[0] - 8, m[1] - 4, 'MAGNETIC N', 11, 'cool', 'end', bold=True)
f.L(O[0], O[1], c[0], c[1], 'hot', 2.4, me='hot'); f.T(c[0] + 8, c[1] - 4, 'COMPASS N', 11, 'hot', bold=True)
p, q = pol(O[0], O[1], 130, 0), pol(O[0], O[1], 130, 8); f.P(f'M{p[0]:.1f},{p[1]:.1f} A130,130 0 0 1 {q[0]:.1f},{q[1]:.1f}', 'gold', 2); f.T(q[0] + 8, q[1] + 4, 'deviation 8°E', 11, 'gold', bold=True)
table(f, 470, 60, [80, 80], ['for (M)', 'steer (C)'], [('000°', '358°'), ('090°', '093°'), ('180°', '182°'), ('270°', '267°')], 'gold')
f.T(550, 190, 'deviation card', 10, 'gold', 'middle', bold=True)
IN.append(f)

f = I('16_02', 'Hard-Iron Magnetism — Components', 760, 300, 'A plan view of an aircraft with the permanent magnetism of hard iron resolved into fore-and-aft P, athwartships Q and vertical R components',
    '<b>Hard iron</b> — steel parts that hold permanent magnetism — behaves like a magnet fixed in the aircraft. Its field at the compass is resolved into three components: <b>P</b> along the fore-and-aft axis, <b>Q</b> athwartships and <b>R</b> vertical. P causes <b>coefficient B</b> deviation, greatest on east and west headings; Q causes <b>coefficient C</b>, greatest on north and south. They are removed by adjusting the <b>compensating magnets</b> in the compass during a compass swing. Soft iron (temporarily magnetised by the Earth’s field) causes deviations that change with latitude and is harder to compensate.')
planview(f, 300, 160, 0, 1.9)
f.Ci(300, 130, 6, 'gold', 1, 'gold'); f.T(286, 150, 'compass', 9.5, 'gold', 'end')
f.L(300, 130, 300, 50, 'hot', 3, me='hot'); f.T(310, 60, 'P (fore and aft)', 11, 'hot', bold=True)
f.L(300, 130, 400, 130, 'cool', 3, me='cool'); f.T(406, 134, 'Q (athwartships)', 11, 'cool', bold=True)
f.Ci(300, 130, 14, 'green', 2); f.T(280, 106, 'R (vertical)', 11, 'green', 'end', bold=True)
table(f, 480, 160, [70, 180], ['comp.', 'deviation'], [('P', 'coefficient B: max on E/W'), ('Q', 'coefficient C: max on N/S')], 'gold')
IN.append(f)

f = I('17_04', 'Flux-Valve Signal vs Heading', 760, 280, 'A graph of the outputs of the three flux valve legs varying sinusoidally with heading, 120 degrees apart',
    '<b>The flux valve outputs a heading.</b> The flux valve has three legs 120° apart, each picking up the component of the Earth’s horizontal field along it. As heading changes, the signal from each leg varies like a <b>sine wave</b>, the three 120° out of phase — exactly like a three-phase synchro transmitter. The combination of the three signals defines the direction of magnetic north relative to the aircraft, which the receiver synchro reproduces as a heading.')
f.L(80, 140, 680, 140, 'ink', 1.4, me='ink'); f.L(80, 40, 80, 240, 'ink', 1.4)
for k, c_ in enumerate(('hot', 'gold', 'cool')): pl(f, ' '.join(f'{80 + x:.1f},{140 - 80 * math.cos(math.radians(x * 360 / 580 - k * 120)):.1f}' for x in range(0, 581, 5)), c_, 2.4)
for d in (0, 90, 180, 270, 360): x = 80 + d * 580 / 360; f.L(x, 140, x, 146, 'ink', 1); f.T(x, 162, f'{d:03d}°', 10, 'dim', 'middle')
f.T(380, 266, 'three leg signals vary with heading, 120° apart: a three-phase synchro signal', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('17_10', 'Flux Valve to Receiver Synchro', 760, 280, 'A flux valve with three legs wired to the three stator windings of a receiver synchro whose rotor aligns with the field direction',
    '<b>Reproducing the field direction.</b> The flux valve’s three pick-off coils are wired to the three <b>stator</b> windings of a <b>synchro</b> in the remote compass system. The currents recreate, inside the synchro, a field in the same direction as the Earth’s field relative to the aircraft. The synchro <b>rotor</b>, driven by a servo through the slaving amplifier, is turned until it is aligned (null), and its position — combined with the directional gyro — drives the heading card.')
f.Ci(170, 140, 70, 'ink', 2, 'g3')
for k, c_ in enumerate(('hot', 'gold', 'cool')):
    a = k * 120; p = pol(170, 140, 60, a); f.L(170, 140, p[0], p[1], c_, 6)
    q = pol(530, 140, 60, a); f.L(p[0], p[1], q[0] - 260 + 260, q[1], c_, 1.4, dash='5 4')
f.Ci(530, 140, 70, 'ink', 2, 'g3'); t = pol(530, 140, 50, 20); f.L(530, 140, t[0], t[1], 'white', 4)
f.T(170, 236, 'flux valve (3 legs)', 10.5, 'ink', 'middle', bold=True); f.T(530, 236, 'receiver synchro', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('17_11', 'Remote-Indicating Compass Display (HSI)', 760, 280, 'A horizontal situation indicator with a rotating heading card, heading bug, course pointer and annunciator',
    '<b>The output of the remote compass.</b> The slaved heading drives the <b>rotating compass card</b> of an RMI or HSI, read against the lubber line at the top. A <b>heading bug</b>, set by the pilot, feeds the autopilot heading mode. A small <b>annunciator</b> (dot and cross, or + / −) shows the slaving signal oscillating gently when the system is synchronised. A <b>slaved / free</b> (DG) switch lets the pilot disconnect the flux valve and use the gyro alone, for example in polar regions.')
cx, cy = 230, 140; f.Ci(cx, cy, 110, 'ink', 2.4, 'black')
for a in range(0, 360, 10): p, q = pol(cx, cy, 96 if a % 30 else 90, a - 40), pol(cx, cy, 104, a - 40); f.L(p[0], p[1], q[0], q[1], 'white', 1.4 if a % 30 == 0 else 0.8)
for a in range(0, 360, 30): x, y = pol(cx, cy, 78, a - 40); f.T(x, y + 4, {0: 'N', 90: 'E', 180: 'S', 270: 'W'}.get(a, str(a // 10)), 11, 'white', 'middle', bold=True, check=False)
f.P(f'M{cx},{cy-112} L{cx-7},{cy-124} L{cx+7},{cy-124} Z', 'gold', 1, 'gold')
b = pol(cx, cy, 104, 20); f.R(b[0] - 6, b[1] - 6, 12, 12, c='mag', sw=1.4, fill='mag', rx=2)
f.L(cx, cy - 60, cx, cy + 60, 'mag', 3); f.Ci(cx + 70, cy - 70, 7, 'white', 1.4)
f.legend(420, 70, [(1, 'Compass card', 'slaved magnetic heading'), (2, 'Heading bug', 'set by the pilot, drives the AP'), (3, 'Annunciator', 'oscillates when synchronised')], step=50)
f.badge(cx - 112, cy, 1); f.badge(b[0] + 18, b[1], 2); f.badge(cx + 90, cy - 82, 3)
IN.append(f)

if __name__ == '__main__':
    gallery(IN, 'Instruments Gallery 5', 'Flight Instruments — Additional Figures (1)', 'Additional original figures for displays, temperature, air data, magnetism, compasses, gyros and turn indication.', 'ins5-gallery.html')
    print(f'INS5 {len(IN)}  QA warnings: {len(WARN)}')
    for w in WARN: print('  ⚠', w)
