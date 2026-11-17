#!/usr/bin/env python3
"""Instruments extra C (chapters 34-39): GPWS/TAWS, TCAS, flight recorders, engine instruments, EICAS/ECAM."""
import math
from figlib import *
from ins_common import *

IN = []

def envelope(f, pts_warn, pts_caut, xlab, ylab, xt, yt, xmax, ymax, X0=100, Y0=250, W=360, H=200):
    """Plot GPWS-style envelope: x in data units 0..xmax, y 0..ymax. pts lists of (x,y)."""
    f.L(X0, Y0, X0 + W, Y0, 'ink', 1.4, me='ink'); f.L(X0, Y0, X0, Y0 - H, 'ink', 1.4, me='ink')
    sx = lambda x: X0 + x / xmax * W; sy = lambda y: Y0 - y / ymax * H
    if pts_caut: f.P('M' + ' L'.join(f'{sx(x):.1f},{sy(y):.1f}' for x, y in pts_caut) + ' Z', 'amber', 1.6, 'amber', op=0.3)
    if pts_warn: f.P('M' + ' L'.join(f'{sx(x):.1f},{sy(y):.1f}' for x, y in pts_warn) + ' Z', 'hot', 1.6, 'hot', op=0.4)
    for v in xt: f.L(sx(v), Y0, sx(v), Y0 + 5, 'ink', 1); f.T(sx(v), Y0 + 18, f'{v:,}'.replace(',', ' '), 9, 'dim', 'middle')
    for v in yt: f.L(X0 - 5, sy(v), X0, sy(v), 'ink', 1); f.T(X0 - 8, sy(v) + 3, f'{v:,}'.replace(',', ' '), 9, 'dim', 'end')
    f.T(X0 + W / 2, Y0 + 36, xlab, 9.5, 'dim', 'middle'); f.T(X0 - 4, Y0 - H - 10, ylab, 9.5, 'dim')
    return sx, sy

f = I('34_01', 'GPWS Inputs & Outputs', 760, 300, 'Radio altitude, air data, glideslope, configuration and position inputs to a GPWS computer that produces aural alerts, warning lights and terrain display',
    '<b>What the GPWS uses.</b> The <b>ground proximity warning computer</b> takes <b>radio altitude</b> (height above terrain and its rate of change), <b>barometric altitude and vertical speed</b> from the air data computer, <b>glideslope deviation</b> from the ILS, <b>landing gear and flap position</b>, and — for an enhanced system (EGPWS/TAWS) — <b>GPS/FMS position</b> compared with a worldwide <b>terrain database</b>. Outputs are voice <b>alerts</b> (“SINK RATE”, “PULL UP”), the GPWS/glideslope lights, and the terrain display on the ND.')
for k, lab in enumerate(('radio altitude', 'air data: baro alt, V/S', 'ILS glideslope', 'gear / flap position', 'GPS + terrain database')): y = 30 + k * 50; f.box(30, y, 190, 36, [lab], c='cool', size=10); f.L(220, y + 18, 288, 150, 'cool', 1.3, me='cool')
f.box(290, 110, 160, 80, ['GPWS / EGPWS', 'COMPUTER'], c='gold', size=11)
for k, (lab, c_) in enumerate((('voice alerts', 'hot'), ('warning lights', 'amber'), ('terrain on the ND', 'green'))): y = 60 + k * 70; f.box(530, y, 190, 40, [lab], c=c_, size=10.5); f.L(450, 150, 528, y + 20, c_, 1.4, me=c_)
IN.append(f)

f = I('34_02', 'GPWS Control Panel', 760, 260, 'A GPWS panel with a red PULL UP light, an amber below glideslope light, a test switch and inhibit switches for flap, gear and terrain',
    '<b>Few controls — on purpose.</b> The GPWS panel has the warning lights — red <b>PULL UP</b> (GND PROX) and amber <b>BELOW G/S</b> — a <b>TEST</b> switch, and guarded <b>inhibit</b> switches: <b>FLAP INHIBIT</b> and <b>GEAR INHIBIT</b> (to prevent nuisance “too low” alerts when deliberately landing with non-standard flap or in an emergency) and <b>TERRAIN INHIBIT</b> (to silence the database alerts where the database is known to be wrong, e.g. at an airport missing from it). The basic modes cannot be switched off.')
f.R(60, 50, 640, 140, c='line', sw=2, fill='g3', rx=8)
f.R(100, 80, 110, 44, c='hot', sw=1.6, fill='hot', rx=4, op=0.9); f.T(155, 108, 'PULL UP', 12, 'white', 'middle', bold=True, check=False)
f.R(230, 80, 110, 44, c='amber', sw=1.6, fill='amber', rx=4, op=0.9); f.T(285, 101, 'BELOW', 10, '#10171b', 'middle', bold=True, check=False); f.T(285, 115, 'G/S', 10, '#10171b', 'middle', bold=True, check=False)
for k, t in enumerate(('FLAP INHIBIT', 'GEAR INHIBIT', 'TERR INHIBIT')):
    x = 400 + k * 90; f.R(x, 76, 60, 56, c='hot', sw=1.4, fill='none', rx=4, dash='4 3'); f.L(x + 30, 116, x + 30, 92, 'white', 4, cap='round'); f.T(x + 30, 150, t, 8.5, 'ink', 'middle', bold=True)
f.T(155, 150, 'warning', 9.5, 'dim', 'middle'); f.T(285, 150, 'caution / test', 9.5, 'dim', 'middle')
f.T(380, 226, 'Guarded inhibit switches stop nuisance alerts; the basic modes cannot be switched off.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('34_03', 'Mode 1 — Excessive Sink Rate', 760, 300, 'GPWS mode 1 envelope of radio altitude against barometric rate of descent with a SINK RATE caution area and a PULL UP warning area',
    '<b>Descending too fast for the height.</b> Mode 1 compares <b>barometric descent rate</b> with <b>radio altitude</b> (roughly from 2 500 ft down to 50 ft). Entering the outer boundary gives the caution “<b>SINK RATE</b>”; continuing into the inner boundary gives the warning “<b>PULL UP</b>” (or “WHOOP WHOOP PULL UP”). It does not depend on gear or flap position. Response: reduce the rate of descent; for a pull-up warning, apply the full escape manoeuvre.')
sx, sy = envelope(f, [(1700, 50), (2200, 50), (7500, 2450), (5000, 2450)], [(1000, 50), (1700, 50), (5000, 2450), (3500, 2450)], 'barometric descent rate (ft/min)', 'radio altitude (ft)', (0, 2000, 4000, 6000), (0, 1000, 2000), 7500, 2500)
f.T(sx(3200), sy(1600), 'SINK RATE', 11, 'amber', 'middle', bold=True, halo=True); f.T(sx(5600), sy(1200), 'PULL UP', 11, 'hot', 'middle', bold=True, halo=True)
note(f, 500, 70, ['Mode 1: excessive descent', 'rate for the radio altitude.', 'Active in any configuration.'], first='ink')
note(f, 500, 160, ['Caution: “SINK RATE”.', 'Warning: “PULL UP”.'], first='hot')
IN.append(f)

f = I('34_04', 'Mode 2 — Excessive Terrain Closure Rate', 760, 300, 'An aircraft in level flight approaching rising terrain with the radio altitude decreasing rapidly, triggering TERRAIN then PULL UP',
    '<b>The ground is coming up fast.</b> Mode 2 watches the <b>rate at which radio altitude decreases</b> — the closure rate with rising terrain, even if the aircraft is level. It first calls “<b>TERRAIN TERRAIN</b>” and then “<b>PULL UP</b>”. Mode 2A (flaps not in landing position) is active from about 2 450 ft radio altitude down; Mode 2B (landing flap) has a reduced envelope to avoid nuisance alerts during approaches over uneven ground. Because it sees terrain only directly below, it can give little warning of a steep cliff — the gap EGPWS look-ahead closes.')
f.P('M40,270 L300,270 L460,170 L540,120 L640,150 L720,140 L720,280 L40,280 Z', 'none', 0, LAND)
f.L(60, 80, 600, 80, 'white', 1.4, dash='5 4'); f.raw(aircraft(330, 76, 0, 0.3, flip=True))
for x in (150, 280, 400): ty = 270 if x < 300 else 270 - (x - 300) * 100 / 160; f.L(x, 90, x, ty, 'cool', 1.4, me='cool', dash='3 3')
f.T(150, 186, 'RA 1 900', 10, 'cool', 'middle', bold=True, halo=True); f.T(400, 160, 'RA 1 100', 10, 'cool', 'middle', bold=True, halo=True)
f.T(520, 60, '“TERRAIN TERRAIN” … “PULL UP”', 11, 'hot', 'middle', bold=True)
f.T(380, 296, 'Level flight, but radio altitude falling fast: excessive closure rate.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('34_05', 'Mode 3 — Altitude Loss after Take-off', 760, 300, 'An aircraft climbing after take-off then losing height, triggering DON\'T SINK before reaching about 1500 ft radio altitude',
    '<b>Sinking when you should be climbing.</b> Mode 3 is active after <b>take-off or go-around</b> until the aircraft reaches a set radio altitude (about <b>1 500 ft</b> on modern systems). If the aircraft <b>loses barometric altitude</b> — for example from a flap retraction or thrust reduction too early, or windshear — it calls “<b>DON’T SINK</b>”. The alert threshold is proportional to height: the higher the aircraft, the more height it may lose before the alert.')
f.L(40, 250, 720, 250, 'ink', 2); f.R(40, 246, 160, 8, c='ink', sw=1, fill='steel', rx=1)
f.P('M120,250 Q260,240 360,150 Q420,110 470,130 Q520,150 560,160', 'white', 2.2); f.raw(aircraft(520, 150, 10, 0.28, flip=True))
f.L(40, 90, 720, 90, 'gold', 1.4, dash='6 4'); f.T(700, 82, 'about 1 500 ft RA: mode 3 ends', 10, 'gold', 'end', bold=True)
f.L(430, 116, 430, 156, 'hot', 1.8, me='hot'); f.T(440, 200, '“DON’T SINK”', 12, 'hot', bold=True)
f.T(380, 292, 'Height lost after take-off or go-around, before reaching the mode 3 limit.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('34_06', 'Mode 4 — Unsafe Terrain Clearance', 760, 300, 'GPWS mode 4 envelope against airspeed: TOO LOW GEAR below 500 ft with gear up, TOO LOW FLAPS below 245 ft with flaps not in landing position, and TOO LOW TERRAIN at higher speed',
    '<b>Close to the ground in the wrong configuration.</b> Mode 4 alerts when the aircraft is low but <b>not configured to land</b>. <b>4A</b> (gear up): “<b>TOO LOW GEAR</b>” below about <b>500 ft</b> radio altitude at low speed. <b>4B</b> (gear down, flaps not in landing position): “<b>TOO LOW FLAPS</b>” below about <b>245 ft</b>. At higher speeds the boundaries rise (to about 1 000 ft) and the alert becomes “<b>TOO LOW TERRAIN</b>”. The flap and gear inhibit switches suppress the configuration alerts when needed.')
sx, sy = envelope(f, None, [(0, 0), (190, 0), (190, 500), (250, 1000), (400, 1000), (400, 0)], 'airspeed (kt)', 'radio altitude (ft)', (0, 100, 190, 250, 400), (0, 245, 500, 1000), 400, 1100)
f.P(f'M{sx(0)},{sy(500)} L{sx(190)},{sy(500)}', 'hot', 2.4); f.T(sx(95), sy(500) - 6, 'TOO LOW GEAR (4A)', 10, 'hot', 'middle', bold=True)
f.P(f'M{sx(0)},{sy(245)} L{sx(159)},{sy(245)}', 'gold', 2.4); f.T(sx(80), sy(245) - 6, 'TOO LOW FLAPS (4B)', 10, 'gold', 'middle', bold=True)
f.T(sx(320), sy(700), 'TOO LOW', 10.5, 'hot', 'middle', bold=True, halo=True); f.T(sx(320), sy(600), 'TERRAIN', 10.5, 'hot', 'middle', bold=True, halo=True)
note(f, 500, 70, ['Low, and not configured', 'to land.'], first='ink'); note(f, 500, 140, ['Gear up: below ~500 ft.', 'Flaps up: below ~245 ft.', 'Fast: up to ~1 000 ft.'], first='gold')
IN.append(f)

f = I('34_08', 'Mode 5 — Below Glideslope', 760, 300, 'An aircraft on an ILS approach descending below the glideslope beam with a soft GLIDESLOPE alert and a louder alert closer to the ground',
    '<b>Too far below the glide path.</b> Mode 5 operates on an ILS approach below about <b>1 000 ft</b> radio altitude with the gear down. If the aircraft goes more than about <b>1.3 dots below</b> the glideslope, a soft “<b>GLIDESLOPE</b>” alert sounds, getting louder and faster as the deviation increases; below about 300 ft with more than 2 dots the alert becomes loud. The amber <b>BELOW G/S</b> light illuminates, and the crew can cancel the alert by pressing it (e.g. when deliberately flying a visual approach below the slope).')
f.L(40, 250, 720, 250, 'ink', 2); f.R(600, 246, 120, 8, c='ink', sw=1, fill='steel', rx=1)
f.L(620, 250, 60, 100, 'gold', 2.4); f.T(120, 98, 'glideslope', 10.5, 'gold', bold=True)
f.L(620, 250, 60, 150, 'amber', 1.4, dash='5 4'); f.T(80, 172, '1.3 dots below', 10, 'amber', bold=True)
f.P('M100,130 Q260,170 400,200 L520,228', 'white', 2.2); f.raw(aircraft(360, 192, 12, 0.28, flip=True))
f.L(40, 116, 720, 116, 'cool', 1, dash='3 4'); f.T(700, 108, '1 000 ft RA', 10, 'cool', 'end')
f.T(420, 70, '“GLIDESLOPE” (soft, then louder)', 11, 'amber', 'middle', bold=True)
f.R(560, 20, 80, 32, c='amber', sw=1.2, fill='amber', rx=3); f.T(600, 41, 'BELOW G/S', 9, '#10171b', 'middle', bold=True, check=False)
IN.append(f)

f = I('34_10', 'Mode 6 — Bank Angle & Altitude Callouts', 760, 300, 'An aircraft banked steeply at low altitude triggering BANK ANGLE, with a list of automatic radio altitude callouts during the approach',
    '<b>Two kinds of advisory.</b> Mode 6 provides <b>altitude callouts</b> on approach from the radio altitude — e.g. “<b>FIVE HUNDRED</b>”, “<b>MINIMUMS</b>” at the decision height, and “FIFTY, FORTY, THIRTY, TWENTY, TEN” to touchdown — chosen by the operator. It also gives “<b>BANK ANGLE, BANK ANGLE</b>” if the bank exceeds a limit that reduces with height (e.g. about 35° above 150 ft, about 10° at 5 ft) to protect against wingtip strikes and loss of control.')
f.raw(f'<g transform="translate(220 150) rotate(-40)"><line x1="-110" y1="0" x2="110" y2="0" stroke="{col("gold")}" stroke-width="7" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="18" ry="16" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="1.6"/><line x1="0" y1="-16" x2="0" y2="-40" stroke="{col("gold")}" stroke-width="6" stroke-linecap="round"/></g>')
f.L(60, 260, 380, 260, 'ink', 2); f.T(220, 54, '“BANK ANGLE, BANK ANGLE”', 11.5, 'hot', 'middle', bold=True)
table(f, 450, 50, [110, 160], ['height (RA)', 'callout'], [('500 ft', '“FIVE HUNDRED”'), ('DH', '“MINIMUMS”'), ('50 ft', '“FIFTY”'), ('30 ft', '“THIRTY”'), ('10 ft', '“TEN”')], 'gold')
f.T(220, 290, 'bank limit decreases with height', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('34_11', 'Mode 7 — Windshear', 760, 300, 'An aircraft on approach flying through a microburst, first gaining airspeed in the headwind then losing it in the tailwind and downdraught, triggering a WINDSHEAR warning',
    '<b>Reactive windshear warning.</b> Mode 7 uses air data, inertial accelerations and angle of attack to detect a <b>sudden loss of performance</b> — typically a microburst, where the aircraft first meets an increasing headwind, then a <b>downdraught</b> and a <b>tailwind</b>. A decreasing-performance shear triggers the red <b>WINDSHEAR</b> light with a siren and “<b>WINDSHEAR, WINDSHEAR, WINDSHEAR</b>”: apply full thrust and fly the escape pitch attitude, following the flight director. (Predictive windshear from the weather radar warns before entering it.)')
f.L(40, 270, 720, 270, 'ink', 2)
for dx in (-60, -30, 0, 30, 60): f.L(380 + dx, 40, 380 + dx * 1.4, 240, 'cool', 2, me='cool')
f.P('M300,240 Q200,260 140,200', 'cool', 2, me='cool'); f.P('M460,240 Q560,260 620,200', 'cool', 2, me='cool')
f.P('M60,110 L300,150 Q380,190 470,230', 'white', 2.2); f.raw(aircraft(440, 214, 18, 0.26, flip=True))
f.T(170, 100, '1. headwind: IAS rises', 10, 'green', 'middle', bold=True); f.T(380, 30, '2. downdraught', 10, 'cool', 'middle', bold=True); f.T(590, 140, '3. tailwind: IAS falls', 10, 'hot', 'middle', bold=True)
f.R(60, 210, 120, 34, c='hot', sw=1.4, fill='hot', rx=4); f.T(120, 232, 'WINDSHEAR', 11, 'white', 'middle', bold=True, check=False)
IN.append(f)

f = I('34_12', 'EGPWS / TAWS Terrain Display', 760, 300, 'A navigation display with the terrain database picture in green, amber and red dot patterns relative to the aircraft altitude, with a red solid area for a warning',
    '<b>Seeing the terrain.</b> Enhanced GPWS (TAWS) compares the aircraft’s position and altitude with its <b>terrain database</b> and paints the ground on the navigation display relative to the <b>aircraft’s altitude</b>: <b>green</b> dots for terrain well below (more than ~500–2 000 ft below), <b>amber</b> dots within about 500 ft below to 2 000 ft above, <b>red</b> dots for terrain more than 2 000 ft above. When a look-ahead alert fires, the threatening terrain turns <b>solid amber</b> (“CAUTION TERRAIN”) or <b>solid red</b> (“TERRAIN, TERRAIN, PULL UP”) and the display pops up automatically.')
screen(f, 60, 20, 400, 268); cx, cy = 260, 270
f.P(f'M{cx-200},{cy-40} A210,210 0 0 1 {cx+200},{cy-40}', 'white', 1.4)
import random; random.seed(3)
for (x0, y0, w, h, c_) in ((80, 200, 120, 60, 'green'), (300, 180, 140, 70, 'green'), (190, 120, 120, 60, 'amber'), (310, 70, 100, 60, 'hot')):
    for i in range(int(w * h / 90)): f.Ci(x0 + random.random() * w, y0 + random.random() * h, 1.6, 'none', 0, c_)
f.P('M210,140 L270,120 L290,160 L230,175 Z', 'amber', 1, 'amber', op=0.85)
f.P(f'M{cx},{cy-14} l-8,14 l16,0 Z', 'white', 1.4, 'white')
table(f, 474, 50, [84, 192], ['colour', 'terrain vs aircraft altitude'], [('green', 'well below'), ('amber', '500 ft below to 2 000 ft above'), ('red', 'more than 2 000 ft above'), ('solid amber', 'caution alert'), ('solid red', 'warning alert')], 'gold')
IN.append(f)

f = I('34_13', 'EGPWS Look-Ahead Alert Envelope', 760, 300, 'Side view of an aircraft with a caution envelope extending about 40-60 seconds ahead and a warning envelope about 20-30 seconds ahead, intersecting a mountain',
    '<b>Looking ahead along the flight path.</b> EGPWS projects envelopes <b>ahead and below</b> the aircraft, based on ground speed, track and flight path. If terrain from the database penetrates the outer <b>caution</b> envelope — about <b>40–60 seconds</b> ahead — it calls “<b>CAUTION TERRAIN</b>”; if it penetrates the inner <b>warning</b> envelope — about <b>20–30 seconds</b> ahead — “<b>TERRAIN, TERRAIN, PULL UP</b>”. This gives far earlier warning of a steep mountain than the basic modes, which only see the radio altitude directly below.')
f.P('M40,280 L380,280 L520,120 L600,180 L720,160 L720,290 L40,290 Z', 'none', 0, LAND)
f.raw(aircraft(120, 120, 0, 0.3, flip=True))
f.P('M150,120 L620,130 L620,190 L150,140 Z', 'amber', 1.4, 'amber', op=0.25); f.P('M150,120 L400,125 L400,160 L150,134 Z', 'hot', 1.4, 'hot', op=0.35)
f.T(280, 108, 'warning: 20–30 s', 10.5, 'hot', 'middle', bold=True); f.T(540, 108, 'caution: 40–60 s', 10.5, 'amber', 'middle', bold=True)
f.T(520, 240, 'terrain penetrates the caution envelope', 10, 'ink', 'middle', bold=True, halo=True)
f.T(380, 30, '“CAUTION TERRAIN” … then “TERRAIN, TERRAIN, PULL UP”', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('34_14', 'EGPWS Terrain Clearance Floor', 760, 300, 'Side view of a runway with a protective floor rising from the runway out to several nautical miles, alerting TOO LOW TERRAIN if the aircraft descends below it',
    '<b>Protecting the approach.</b> Using its database of runways, EGPWS builds a <b>terrain clearance floor</b> around each runway: a surface rising from close to the runway end to about <b>400 ft</b> above it at around 4 nm, then higher further out. If the aircraft descends below the floor — for example landing short or a premature descent in the landing configuration, which basic mode 4 would not catch — it calls “<b>TOO LOW TERRAIN</b>”. A related “runway field clearance floor” uses runway elevation.')
f.L(40, 250, 720, 250, 'ink', 2); f.R(600, 246, 120, 8, c='ink', sw=1, fill='steel', rx=1)
f.P('M590,250 L540,250 L300,170 L60,150 L60,250 Z', 'hot', 1.4, 'hot', op=0.22); f.T(260, 220, 'terrain clearance floor', 11, 'hot', 'middle', bold=True)
f.P('M60,110 L300,150 L360,206', 'white', 2.2); f.raw(aircraft(350, 196, 20, 0.26, flip=True))
f.T(380, 160, '“TOO LOW TERRAIN”', 11, 'hot', bold=True)
for nm, x in ((4, 300), (12, 60)): f.T(x, 274, f'{nm} nm', 9.5, 'dim', 'middle')
note(f, 440, 40, ['Floor rises to about 400 ft', 'at 4 nm from the runway.'], first='ink')
IN.append(f)

def tcas_sym(f, x, y, kind, s=8, tag=None):
    if kind == 'RA': f.R(x - s, y - s, 2 * s, 2 * s, c='hot', sw=1, fill='hot', rx=0); c_ = 'hot'
    elif kind == 'TA': f.Ci(x, y, s, 'amber', 1, 'amber'); c_ = 'amber'
    elif kind == 'PROX': f.P(f'M{x},{y-s} L{x+s},{y} L{x},{y+s} L{x-s},{y} Z', 'white', 1, 'white'); c_ = 'white'
    else: f.P(f'M{x},{y-s} L{x+s},{y} L{x},{y+s} L{x-s},{y} Z', 'white', 1.4, 'none'); c_ = 'white'
    if tag: f.T(x, y - s - 6, tag[0], 10, c_, 'middle', bold=True, mono=True, check=False); f.T(x + s + 6, y + 4, tag[1], 13, c_, bold=True, check=False) if tag[1] else None

f = I('35_01', 'TCAS Protection Volumes (TA / RA)', 760, 300, 'Plan and side views of the airspace around an aircraft with an outer traffic advisory volume and an inner resolution advisory volume, defined by time to closest approach',
    '<b>Volumes defined by time, not distance.</b> TCAS computes for each intruder the <b>time to closest approach</b> (tau = range ÷ closure rate) and the predicted vertical separation. When an intruder will reach closest approach in about <b>35–48 s</b> (depending on altitude), it becomes a <b>traffic advisory (TA)</b>; at about <b>20–35 s</b> a <b>resolution advisory (RA)</b> with a vertical manoeuvre. Small fixed distance thresholds (DMOD) protect against slow-closing traffic. Because the volumes are times, they extend further ahead towards fast head-on traffic.')
cx, cy = 230, 150
f.El(cx, cy, 190, 110, 'amber', 2); f.raw(f'<ellipse cx="{cx}" cy="{cy}" rx="190" ry="110" fill="{col("amber")}" opacity=".15"/>')
f.El(cx, cy, 110, 64, 'hot', 2); f.raw(f'<ellipse cx="{cx}" cy="{cy}" rx="110" ry="64" fill="{col("hot")}" opacity=".2"/>')
planview(f, cx, cy, 90, 0.5, 'white'); f.T(cx + 150, cy - 96, 'TA: 35–48 s', 11, 'amber', 'middle', bold=True); f.T(cx, cy - 74, 'RA: 20–35 s', 11, 'hot', 'middle', bold=True)
note(f, 460, 80, ['tau = range / closure rate.', 'TA: traffic advisory only.', 'RA: climb or descend command.'], first='ink')
note(f, 460, 180, ['RAs are vertical only;', 'TCAS II, Mode S coordinated.'], first='hot')
IN.append(f)

f = I('35_02', 'TCAS Directional Antenna Coverage', 760, 300, 'A side view of an aircraft with a directional antenna on top and another underneath, and the transponder interrogation and reply paths with an intruder',
    '<b>How TCAS finds traffic.</b> TCAS <b>interrogates</b> the transponders of nearby aircraft (1 030 MHz) and listens for their <b>replies</b> (1 090 MHz). The time to reply gives <b>range</b>; the reply’s encoded <b>altitude</b> (Mode C or S) gives relative height; a <b>directional antenna</b> on top of the fuselage (and usually another underneath) gives <b>bearing</b>. TCAS cannot see aircraft without a working transponder, and needs altitude reporting to issue RAs against them. Bearing is the least accurate element — never manoeuvre laterally on the TCAS display.')
f.raw(aircraft(240, 160, 0, 0.9, flip=True)); f.R(234, 138, 16, 8, c='gold', sw=1.4, fill='gold', rx=2); f.R(234, 168, 16, 8, c='gold', sw=1.4, fill='gold', rx=2)
f.T(260, 120, 'top directional antenna', 10, 'gold'); f.T(260, 204, 'bottom antenna', 10, 'gold')
f.raw(aircraft(600, 80, 0, 0.4)); f.L(258, 136, 560, 86, 'cool', 1.8, me='cool'); f.L(560, 96, 258, 146, 'green', 1.8, me='green', dash='6 4')
f.T(420, 98, 'interrogation 1 030 MHz', 10, 'cool', 'middle', bold=True); f.T(400, 140, 'reply 1 090 MHz (altitude)', 10, 'green', 'middle', bold=True)
table(f, 440, 190, [100, 200], ['element', 'from'], [('range', 'time to reply'), ('altitude', 'Mode C / S reply'), ('bearing', 'directional antenna')], 'gold')
IN.append(f)

f = I('35_03', 'TCAS System Architecture & Displays', 760, 300, 'A TCAS computer with top and bottom antennas, linked to the Mode S transponder, with outputs to the traffic display, the RA display on the VSI or PFD, and aural alerts',
    '<b>The parts of TCAS II.</b> The <b>TCAS computer</b> drives the <b>top and bottom antennas</b>, tracks intruders, and computes advisories. It works with the <b>Mode S transponder</b>, which also exchanges <b>coordination</b> messages with another TCAS aircraft so that their RAs are complementary (one climbs, the other descends). Outputs: the <b>traffic display</b> (on the ND or a dedicated display), the <b>RA</b> guidance on the VSI or PFD, and <b>aural</b> messages (“TRAFFIC, TRAFFIC”, “CLIMB, CLIMB”). The TCAS/transponder control panel selects STBY, TA ONLY or TA/RA.')
f.box(40, 40, 140, 40, ['top antenna'], c='gold', size=10); f.box(40, 200, 140, 40, ['bottom antenna'], c='gold', size=10)
f.L(180, 60, 278, 130, 'gold', 1.4, me='gold', ms='gold'); f.L(180, 220, 278, 160, 'gold', 1.4, me='gold', ms='gold')
f.box(280, 110, 160, 70, ['TCAS', 'COMPUTER'], c='gold', size=11); f.box(300, 220, 120, 40, ['Mode S', 'transponder'], c='cool', size=9.5); f.L(360, 180, 360, 218, 'cool', 1.4, me='cool', ms='cool')
f.T(360, 280, 'RA coordination with the other TCAS', 9.5, 'cool', 'middle')
for k, (lab, c_) in enumerate((('traffic display (ND)', 'ink'), ('RA on VSI / PFD', 'hot'), ('aural alerts', 'amber'), ('control panel: STBY / TA / TA-RA', 'green'))): y = 30 + k * 62; f.box(510, y, 220, 42, [lab], c=c_, size=10); f.L(440, 145, 508, y + 21, c_, 1.3, me=c_)
IN.append(f)

f = I('35_04', 'TCAS TA / RA Timing Zones', 760, 260, 'A time line of an encounter showing traffic advisory at about forty seconds and resolution advisory at about twenty-five seconds before closest point of approach',
    '<b>The sequence of an encounter.</b> As an intruder closes, TCAS first shows it as <b>other</b> or <b>proximate</b> traffic. Roughly <b>40 s</b> before the closest point of approach (CPA), a <b>TA</b>: “TRAFFIC, TRAFFIC” — look for the traffic and prepare, but do not manoeuvre. Roughly <b>25 s</b> before CPA, an <b>RA</b>: follow it promptly and smoothly within 5 seconds (2.5 s for an increase or reversal). When separation is assured: “CLEAR OF CONFLICT” — return to the clearance and inform ATC. (Exact times vary with altitude.)')
f.L(60, 120, 700, 120, 'ink', 2, me='ink'); f.T(700, 146, 'CPA', 11, 'ink', 'end', bold=True)
f.R(300, 100, 200, 40, c='amber', sw=1.4, fill='amber', rx=0, op=0.3); f.R(500, 100, 190, 40, c='hot', sw=1.4, fill='hot', rx=0, op=0.35)
f.T(400, 90, 'TA: about 40 s', 11, 'amber', 'middle', bold=True); f.T(595, 90, 'RA: about 25 s', 11, 'hot', 'middle', bold=True)
f.T(400, 166, '“TRAFFIC, TRAFFIC”', 10.5, 'amber', 'middle', bold=True); f.T(595, 166, '“CLIMB, CLIMB”', 10.5, 'hot', 'middle', bold=True)
f.T(180, 166, 'proximate / other traffic', 10.5, 'white', 'middle')
f.T(380, 226, 'Follow an RA within 5 s; then “CLEAR OF CONFLICT”: return to the clearance, tell ATC.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('35_05', 'TCAS RA on the VSI', 760, 300, 'A TCAS vertical speed indicator with red arcs over the prohibited vertical speeds and a green arc showing the commanded climb',
    '<b>Flying the RA on a TCAS VSI.</b> On an RA, the VSI shows a <b>red arc</b> over the vertical speeds to be <b>avoided</b> and a <b>green arc</b> (“fly-to”) over the target range. Here the RA is “<b>CLIMB, CLIMB</b>”: red from level down through all descent rates, green from 1 500 to 2 000 ft/min climb. The pilot adjusts pitch to put the needle in the green, disconnecting the autopilot. On a PFD the same information appears as red and green bands on the vertical speed scale or as a pitch “avoid” region on the attitude display.')
cx, cy = 230, 150
f.Ci(cx, cy, 118, 'ink', 2.4, 'black')
vs = lambda v: 270 + (v / 6000) * 160 if abs(v) <= 1000 else 270 + math.copysign(26.7 + (abs(v) - 1000) / 5000 * 133.3, v)
def ang(v):
    return 270 + math.copysign(min(abs(v), 1000) / 1000 * 50 + max(0, abs(v) - 1000) / 5000 * 120, v)
arc_band(f, cx, cy, 104, ang(-6000), ang(1400), 'hot', 12); arc_band(f, cx, cy, 104, ang(1500), ang(2000), 'green', 12)
for v in (0, 500, 1000, 2000, 4000, 6000, -500, -1000, -2000, -4000, -6000):
    a = ang(v); p, q = pol(cx, cy, 90, a), pol(cx, cy, 98, a); f.L(p[0], p[1], q[0], q[1], 'white', 2)
    if v in (0, 1000, 2000, 4000, -1000, -2000, -4000): x, y = pol(cx, cy, 74, a); f.T(x, y + 4, str(abs(v) // 1000) if v else '0', 12, 'white', 'middle', bold=True, check=False)
t = pol(cx, cy, 96, ang(1700)); f.L(cx, cy, t[0], t[1], 'white', 3); f.Ci(cx, cy, 6, 'ink', 1, 'steel')
f.T(cx, cy + 40, '×1000 ft/min', 9, 'white', 'middle', check=False)
note(f, 420, 80, ['Red: vertical speeds', 'to AVOID.'], first='hot'); note(f, 420, 150, ['Green: fly-to range.', 'RA: “CLIMB, CLIMB”.'], first='green')
IN.append(f)

f = I('35_06', 'TCAS Traffic Display Explained', 760, 300, 'A TCAS traffic display with the own aircraft symbol, a range ring at 2 nm, and four traffic symbols with relative altitude tags and climb or descent arrows',
    '<b>Reading the traffic display.</b> Own aircraft is at the centre, with a ring of dots at <b>2 nm</b> (or 3 nm). Each intruder shows a symbol, a <b>data tag</b> of relative altitude in hundreds of feet — <b>+</b> above, <b>−</b> below — and an <b>arrow</b> if it is climbing or descending at 500 ft/min or more. Example: “−05↑” = 500 ft below and climbing. The display shows position for situational awareness only; the bearing is not accurate enough for lateral avoidance.')
screen(f, 60, 20, 360, 268); cx, cy = 240, 200
for a in range(0, 360, 30): p = pol(cx, cy, 70, a); f.Ci(p[0], p[1], 2, 'white', 1, 'white')
planview(f, cx, cy, 0, 0.35, 'white')
tcas_sym(f, 300, 110, 'RA', 8, ('+02', '↓')); tcas_sym(f, 150, 130, 'TA', 8, ('−05', '↑')); tcas_sym(f, 330, 230, 'PROX', 8, ('−12', '')); tcas_sym(f, 110, 240, 'OTHER', 8, ('+24', ''))
f.T(240, 272, '2 nm ring', 9.5, 'white', 'middle', check=False)
f.legend(450, 50, [(1, 'Relative altitude', 'hundreds of ft: +02 = 200 ft above'), (2, 'Arrow', 'climbing or descending ≥ 500 ft/min'), (3, 'Own aircraft', 'centre, with a 2 nm ring')], step=52)
f.badge(276, 90, 1); f.badge(176, 126, 2); f.badge(266, 214, 3)
IN.append(f)

f = I('35_07', 'TCAS Traffic Symbology', 760, 260, 'The four TCAS traffic symbols: a red square for a resolution advisory, an amber circle for a traffic advisory, a filled white diamond for proximate traffic and a hollow diamond for other traffic',
    '<b>Four symbols.</b> <b>Red filled square</b>: the intruder causing a <b>resolution advisory</b>. <b>Amber filled circle</b>: a <b>traffic advisory</b> intruder. <b>Filled white (or cyan) diamond</b>: <b>proximate</b> traffic — within about 6 nm and ±1 200 ft, but not a threat. <b>Hollow diamond</b>: <b>other</b> traffic in range. Traffic not reporting altitude shows no data tag and cannot generate RAs.')
for k, (kind, t, d) in enumerate((('RA', 'resolution advisory', 'red filled square'), ('TA', 'traffic advisory', 'amber filled circle'), ('PROX', 'proximate traffic', 'within 6 nm, ±1 200 ft'), ('OTHER', 'other traffic', 'hollow diamond'))):
    x = 120 + k * 175; tcas_sym(f, x, 110, kind, 16); f.T(x, 160, t, 11, 'ink', 'middle', bold=True); f.T(x, 178, d, 10, 'dim', 'middle')
f.T(380, 236, 'Traffic without altitude reporting: no tag, no RA.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('35_08', 'TCAS Traffic on the Navigation Display', 760, 300, 'A navigation display in map mode with the route and TCAS traffic symbols overlaid, and the TRAFFIC annunciation',
    '<b>Traffic in context.</b> On EFIS aircraft TCAS traffic is overlaid on the <b>navigation display</b> together with the route, so the crew sees threats relative to their planned path. A TA or RA makes the traffic appear automatically even if the TFC option is off, with a “<b>TRAFFIC</b>” annunciation in amber (TA) or red (RA). In expanded modes, traffic behind the aircraft is not visible — the off-scale or no-bearing messages (e.g. “TA 2.5 +03”) show it.')
screen(f, 60, 20, 400, 268); cx, cy = 260, 270
f.P(f'M{cx-200},{cy-40} A210,210 0 0 1 {cx+200},{cy-40}', 'white', 1.4); f.P(f'M{cx},{cy-14} L{cx+30},{cy-200}', 'mag', 2.4)
for a in range(-60, 61, 20): p = pol(cx, cy, 80, a); f.Ci(p[0], p[1], 2, 'white', 1, 'white')
tcas_sym(f, 330, 140, 'TA', 8, ('−05', '↑')); tcas_sym(f, 170, 120, 'OTHER', 8, ('+18', ''))
f.P(f'M{cx},{cy-14} l-8,14 l16,0 Z', 'white', 1.4, 'white'); f.T(80, 50, 'TRAFFIC', 13, 'amber', bold=True, check=False)
note(f, 490, 80, ['TA or RA: traffic shown', 'automatically, with', '“TRAFFIC” in amber or red.'], first='amber')
note(f, 490, 180, ['Behind the aircraft in arc', 'mode: shown as a text', 'message instead.'], first='ink')
IN.append(f)

f = I('36_01', 'Flight Data Recorder System', 760, 300, 'Aircraft sensors feeding a flight data acquisition unit that sends data to the crash-protected flight data recorder in the tail, with an event button on the flight deck',
    '<b>Recording the flight.</b> Sensors throughout the aircraft send data to the <b>flight data acquisition unit</b> (FDAU), which formats it and passes it to the <b>flight data recorder</b> (FDR) — a crash-protected unit in the <b>tail</b>, painted orange, with an <b>underwater locator beacon</b> (37.5 kHz). It records at least the last <b>25 hours</b>. An <b>EVENT</b> button on the flight deck lets the crew mark a point in the data for later analysis. The recorder starts automatically before the aircraft moves under its own power.')
f.P('M40,170 Q40,120 160,110 L640,110 L720,60 L740,60 L720,170 Z', 'ink', 2, 'g3')
f.R(640, 120, 50, 34, c='amber', sw=1.6, fill='amber', rx=3); f.T(665, 141, 'FDR', 10, '#10171b', 'middle', bold=True, check=False)
f.box(320, 120, 120, 40, ['FDAU'], c='gold', size=11); f.L(440, 140, 638, 137, 'gold', 1.6, me='gold')
for k, lab in enumerate(('air data', 'attitude', 'engines', 'controls')): x = 100 + k * 100; f.box(x - 40, 210, 80, 32, [lab], c='cool', size=9.5); f.L(x, 210, 380, 162, 'cool', 1.1, me='cool')
f.R(80, 124, 40, 22, c='hot', sw=1.4, fill='hot', rx=3); f.T(100, 139, 'EVENT', 8, 'white', 'middle', bold=True, check=False); f.L(120, 135, 318, 140, 'hot', 1.2, me='hot', dash='4 3')
note(f, 460, 200, ['Crash-protected, orange, in the tail.', 'At least 25 hours; locator beacon.'], first='amber')
IN.append(f)

f = I('36_02', 'Digital FDR Architecture', 760, 260, 'Analogue, discrete and digital inputs entering a data acquisition unit, multiplexed into a serial data stream and written to solid-state memory in a crash-survivable module',
    '<b>Inside a digital FDR system.</b> The acquisition unit samples <b>analogue</b> signals (e.g. synchro positions), <b>discrete</b> on/off states (e.g. gear, warnings) and <b>digital bus</b> data (ARINC 429), converts them, and <b>multiplexes</b> them into a serial data stream at a fixed rate (e.g. 64–1 024 words per second). The recorder writes the stream to <b>solid-state memory</b> in a <b>crash-survivable memory unit</b> designed to withstand impact (3 400 g), fire (1 100°C for 30 min) and deep-sea pressure. Older recorders used magnetic tape.')
flowrow(f, [(['analogue,', 'discrete, digital'], 'cool'), (['acquisition', 'unit (FDAU)'], 'gold'), (['multiplexed', 'serial stream'], 'ink'), (['solid-state', 'memory'], 'green'), (['crash-survivable', 'module'], 'amber')], 80, h=60)
f.T(380, 200, 'Survives about 3 400 g impact and 1 100°C fire for 30 minutes.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('37_01', 'Cockpit Voice Recorder — Control Panel & Location', 760, 300, 'A cockpit voice recorder control panel with an area microphone, test button, erase button and headset jack, and the recorder located in the tail',
    '<b>Recording what is heard.</b> The <b>CVR</b> records the crew’s <b>radio and intercom</b> audio and a cockpit <b>area microphone</b> on separate channels, retaining at least the last <b>2 hours</b> (modern requirements up to 25 hours), overwriting the oldest. The flight-deck <b>control panel</b> carries the area microphone, a <b>TEST</b> button (a meter or light confirms all channels), a headset jack for monitoring, and an <b>ERASE</b> button that works only on the ground with the parking brake set. The recorder itself is in the tail, crash-protected, with a locator beacon.')
f.R(80, 60, 240, 160, c='line', sw=2, fill='g3', rx=8); f.Ci(140, 110, 22, 'ink', 1.6, 'g2')
for k in range(5): f.L(126, 100 + k * 5, 154, 100 + k * 5, 'dim', 1)
f.R(200, 90, 90, 30, c='green', sw=1.4, fill='g2', rx=4); f.T(245, 110, 'TEST', 10, 'green', 'middle', bold=True, check=False)
f.R(200, 140, 90, 30, c='hot', sw=1.4, fill='g2', rx=4); f.T(245, 160, 'ERASE', 10, 'hot', 'middle', bold=True, check=False)
f.Ci(140, 180, 9, 'ink', 1.4, 'black'); f.T(140, 204, 'headset', 9, 'dim', 'middle'); f.T(140, 146, 'area mic', 9, 'dim', 'middle')
f.P('M380,200 Q380,160 460,150 L680,150 L730,110 L745,110 L730,210 Z', 'ink', 2, 'g3'); f.R(660, 160, 44, 28, c='amber', sw=1.4, fill='amber', rx=3); f.T(682, 178, 'CVR', 9, '#10171b', 'middle', bold=True, check=False)
f.T(560, 240, 'recorder in the tail', 10.5, 'ink', 'middle', bold=True)
f.T(200, 250, 'ERASE: on the ground, parking brake set only', 10, 'hot', 'middle', bold=True)
IN.append(f)

f = I('37_02', 'CVR Control Unit Face', 760, 260, 'A close-up of the cockpit voice recorder control unit face with a monitor meter, test button, erase button, headphone jack and area microphone grille',
    '<b>The face of the CVR panel.</b> Pressing <b>TEST</b> runs a tone through each channel; the <b>monitor meter</b> needle moves into the green band (or a light illuminates) if the recorder is working, and the tone can be heard on a headset plugged into the <b>jack</b>. <b>ERASE</b>, held for a couple of seconds, bulk-erases the recording — inhibited in flight and unless the parking brake is set. The <b>area microphone</b> grille picks up all cockpit sounds, including alerts and engine noise, which help investigators.')
f.R(170, 40, 420, 180, c='line', sw=2, fill='g3', rx=10)
dial(f, 270, 130, 50, -60, 60, [(0, '0'), (1, '')], ptr=0.85, size=9); arc_band(f, 270, 130, 52, 30, 60, 'green', 6); f.T(270, 200, 'monitor', 9.5, 'dim', 'middle')
f.R(360, 80, 80, 30, c='green', sw=1.4, fill='g2', rx=4); f.T(400, 100, 'TEST', 10, 'green', 'middle', bold=True, check=False)
f.R(360, 140, 80, 30, c='hot', sw=1.4, fill='g2', rx=4); f.T(400, 160, 'ERASE', 10, 'hot', 'middle', bold=True, check=False)
f.Ci(520, 90, 26, 'ink', 1.6, 'g2'); [f.L(500, 80 + k * 5, 540, 80 + k * 5, 'dim', 1) for k in range(5)]; f.T(520, 132, 'area mic', 9.5, 'dim', 'middle')
f.Ci(520, 170, 9, 'ink', 1.4, 'black'); f.T(520, 196, 'headset jack', 9.5, 'dim', 'middle')
f.T(380, 246, 'TEST: needle in the green.  ERASE: on the ground, parking brake set.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

# --- Engine instruments ---
f = I('38_01', 'Engine Parameters Measured', 760, 300, 'A cutaway turbofan with stations marked where fan speed, core speed, pressures, exhaust gas temperature, fuel flow, oil and vibration are measured',
    '<b>Where the engine is measured.</b> On a turbofan the main indications are <b>N1</b> (fan/low-pressure spool speed) and <b>N2</b> (high-pressure spool speed), <b>EPR</b> (engine pressure ratio, exhaust total pressure ÷ inlet total pressure) on some engines, <b>EGT</b> (exhaust gas temperature, measured between or after the turbines), <b>fuel flow</b>, <b>oil</b> pressure, temperature and quantity, and <b>vibration</b>. Thrust is set on N1 or EPR; EGT is the main limit on the hot section.')
f.P('M80,100 L200,80 L560,90 L660,120 L660,180 L560,210 L200,220 L80,200 Z', 'ink', 2, 'g3')
f.R(110, 90, 20, 120, c='cool', sw=1.4, fill='cool', rx=2, op=0.6); f.R(220, 110, 120, 80, c='ink', sw=1.4, fill='steel', rx=2, op=0.5); f.R(350, 115, 60, 70, c='hot', sw=1.4, fill='hot', rx=2, op=0.6); f.R(420, 110, 100, 80, c='amber', sw=1.4, fill='amber', rx=2, op=0.5)
f.T(120, 80, 'fan', 9.5, 'cool', 'middle'); f.T(280, 104, 'compressors', 9.5, 'ink', 'middle'); f.T(380, 108, 'burner', 9.5, 'hot', 'middle'); f.T(470, 104, 'turbines', 9.5, 'amber', 'middle')
for x, lab, y in ((120, 'N1', 250), (280, 'N2', 250), (380, 'fuel flow', 250), (540, 'EGT', 250), (60, 'P inlet', 150), (680, 'P exhaust', 150), (230, 'oil, vibration', 280)):
    f.T(x, y, lab, 10.5, 'gold', 'middle' if x not in (60, 680) else ('end' if x == 60 else 'start'), bold=True)
f.L(120, 238, 120, 212, 'gold', 1.2); f.L(280, 238, 280, 192, 'gold', 1.2); f.L(380, 238, 380, 188, 'gold', 1.2); f.L(540, 238, 540, 200, 'gold', 1.2)
f.T(380, 30, 'EPR = exhaust total pressure / inlet total pressure', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('38_02', 'Engine Pressure Ratio (EPR)', 760, 300, 'A turbofan with a total pressure probe at the inlet and probes in the exhaust, both feeding an EPR transmitter that computes their ratio for the gauge',
    '<b>Thrust as a pressure ratio.</b> <b>EPR</b> is the ratio of total pressure in the <b>exhaust</b> (Pt7, after the turbine) to total pressure at the <b>inlet</b> (Pt2). Because thrust depends closely on it, EPR is used on some engines as the <b>thrust-setting</b> parameter. An inlet probe and a ring of exhaust probes feed a <b>pressure-ratio transmitter</b> (or the engine computer) that drives the gauge. Typical take-off EPR is about 1.3–1.6. An iced or blocked inlet probe reads too low a Pt2 and gives a <b>falsely high</b> EPR — so less thrust than indicated.')
f.P('M80,100 L200,80 L560,90 L660,120 L660,180 L560,210 L200,220 L80,200 Z', 'ink', 2, 'g3')
f.L(60, 150, 100, 150, 'cool', 4); f.T(54, 140, 'Pt2 probe', 10, 'cool', 'end', bold=True)
f.L(620, 120, 620, 180, 'hot', 4); f.T(626, 110, 'Pt7 probes', 10, 'hot', bold=True)
f.box(300, 240, 160, 40, ['pressure-ratio transmitter'], c='gold', size=10); f.P('M80,160 L80,260 L298,260', 'cool', 1.4, me='cool'); f.P('M620,180 L620,260 L462,260', 'hot', 1.4, me='hot')
f.T(380, 40, 'EPR = Pt7 / Pt2', 14, 'gold', 'middle', bold=True)
note(f, 480, 50, ['Blocked or iced Pt2 probe:', 'EPR reads too HIGH.'], first='hot')
IN.append(f)

f = I('38_11', 'EGT Thermocouple (Chromel–Alumel)', 760, 300, 'Two dissimilar wires, chromel and alumel, joined at a hot junction in the exhaust and a cold junction at the indicator, producing a voltage proportional to the temperature difference',
    '<b>Measuring the hottest gas.</b> A <b>thermocouple</b> is two dissimilar metals — <b>chromel</b> (positive) and <b>alumel</b> (negative) for EGT — joined at a <b>hot junction</b> in the gas stream. A small voltage (about 41 µV per °C) appears that depends on the <b>difference</b> in temperature between the hot junction and the <b>cold (reference) junction</b> at the indicator, which is compensated automatically. Several probes round the jet pipe are wired in <b>parallel</b> to give an average. It needs no power supply, and leads must be of the correct material and resistance.')
f.Ci(140, 150, 14, 'hot', 2, 'hot'); f.T(140, 196, 'hot junction', 10.5, 'hot', 'middle', bold=True); f.T(140, 212, '(in the exhaust)', 9.5, 'dim', 'middle')
f.P('M154,144 L520,110', 'warm', 4); f.P('M154,156 L520,190', 'cool', 4)
f.T(330, 112, 'chromel (+)', 10.5, 'warm', 'middle', bold=True); f.T(330, 200, 'alumel (−)', 10.5, 'cool', 'middle', bold=True)
f.R(520, 90, 160, 120, c='ink', sw=2, fill='g3', rx=8); dial(f, 600, 150, 40, -60, 60, [(0, ''), (1, '')], ptr=0.7, size=9)
f.T(600, 230, 'indicator: cold junction, compensated', 10, 'ink', 'middle', bold=True)
f.T(380, 280, 'voltage depends on the temperature DIFFERENCE between the junctions', 11, 'gold', 'middle', bold=True)
IN.append(f)

f = I('38_16', 'Manifold Pressure Gauge', 760, 300, 'A manifold pressure gauge in inches of mercury with an aneroid capsule inside connected to the engine induction manifold',
    '<b>Power on a piston engine.</b> The <b>manifold pressure</b> gauge measures the <b>absolute</b> pressure in the induction manifold, in <b>inches of mercury</b>, using an evacuated <b>aneroid capsule</b> (like an altimeter) in a case connected to the manifold. With a constant-speed propeller, manifold pressure and RPM together set the power. With the engine stopped it reads the ambient pressure (about 30 inHg at sea level); at idle it reads low (strong suction); a normally-aspirated engine cannot exceed ambient.')
dial(f, 220, 150, 110, -135, 135, [(i / 5, str(10 + i * 5)) for i in range(6)], ptr=0.72)
arc_band(f, 220, 150, 112, -135 + 270 * 0.3, -135 + 270 * 0.78, 'green', 8); f.T(220, 194, 'MAN PRESS', 10, 'white', 'middle', bold=True, check=False); f.T(220, 210, 'in Hg', 9, 'white', 'middle', check=False)
f.R(420, 80, 160, 120, c='ink', sw=2, fill='g2', rx=8); f.P('M450,140 Q500,124 550,140 Q500,156 450,140 Z', 'ink', 1.6, 'steel'); f.T(500, 180, 'aneroid capsule', 10, 'ink', 'middle', bold=True)
f.L(580, 140, 700, 140, 'cool', 4); f.T(700, 130, 'to the manifold', 10, 'cool', 'end', bold=True)
note(f, 420, 230, ['Engine stopped: reads ambient (≈ 30 inHg at MSL).'], first='ink')
IN.append(f)

f = I('38_17', 'Bourdon-Tube Pressure Gauge', 760, 300, 'A curved flattened Bourdon tube that straightens under pressure, moving a quadrant and pinion that turn the pointer',
    '<b>Measuring high pressures.</b> A <b>Bourdon tube</b> is a curved tube of <b>oval (flattened) section</b>, sealed at the free end. Pressure inside tries to make the section round, which <b>straightens</b> the curve; the free end moves, and a <b>quadrant and pinion</b> magnify the motion to turn the pointer. It is robust and suits higher pressures — oil, hydraulic, oxygen — while capsules suit low pressures (manifold, altimeter). Measured relative to the case (gauge pressure).')
f.P('M200,240 A120,120 0 1 1 320,120', 'gold', 10); f.P('M200,240 A120,120 0 1 1 320,120', '#10171b', 4)
f.L(200, 240, 200, 280, 'cool', 6); f.T(210, 290, 'pressure in', 10, 'cool', bold=True)
f.L(320, 120, 360, 150, 'ink', 2.4); f.P('M360,150 L420,120 L420,180 Z', 'ink', 1.6, 'g3'); f.Ci(430, 150, 8, 'ink', 1.6, 'steel')
f.L(430, 150, 500, 80, 'white', 3); f.T(176, 100, 'oval-section tube', 10.5, 'gold', 'end', bold=True); f.T(400, 210, 'quadrant and pinion', 10, 'ink', 'middle', bold=True); f.T(510, 76, 'pointer', 10, 'ink', bold=True)
note(f, 540, 140, ['Pressure straightens the', 'tube; the free end moves.', 'Used for oil and hydraulic', 'pressures.'], first='gold')
IN.append(f)

f = I('38_03', 'Torquemeter', 760, 300, 'A hydraulic torquemeter in a turboprop reduction gearbox where helical gear thrust is balanced by oil pressure in pistons, the oil pressure indicating torque',
    '<b>Measuring shaft power on a turboprop.</b> In a <b>hydraulic torquemeter</b>, the reduction gear’s helical teeth produce an <b>axial thrust</b> proportional to the torque. This thrust is balanced by <b>oil pressure</b> in a set of pistons; a valve meters oil until the pressure balances the thrust, so the <b>oil pressure is proportional to torque</b> and is shown on the gauge (psi, or % torque). Electronic systems measure the <b>twist</b> of the shaft by the phase shift between two toothed wheels. Shaft power = torque × RPM.')
f.R(120, 110, 200, 80, c='ink', sw=2, fill='g3', rx=6)
for k in range(6): f.L(140 + k * 30, 110, 160 + k * 30, 190, 'gold', 2.4)
f.T(220, 100, 'helical gear', 10.5, 'gold', 'middle', bold=True); f.L(320, 150, 400, 150, 'hot', 3, me='hot'); f.T(360, 140, 'axial thrust', 10, 'hot', 'middle', bold=True)
f.R(400, 120, 80, 60, c='ink', sw=2, fill='cool', rx=4, op=0.6); f.T(440, 204, 'oil pistons', 10, 'cool', 'middle', bold=True)
f.L(480, 150, 560, 150, 'cool', 3, me='cool'); dial(f, 630, 150, 60, -120, 120, [(0, '0'), (0.5, '50'), (1, '100')], ptr=0.6, size=10); f.T(630, 240, '% torque', 10, 'ink', 'middle', bold=True)
f.T(380, 280, 'oil pressure balances the gear thrust: pressure proportional to torque', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('38_04', 'Phonic-Wheel Speed Probe', 760, 300, 'A toothed wheel on a shaft passing a magnetic probe, inducing a voltage pulse for each tooth, with the frequency proportional to speed',
    '<b>Speed from pulses.</b> A <b>phonic (toothed) wheel</b> on the engine shaft passes a <b>probe</b> containing a permanent magnet and a coil. Each tooth changes the magnetic flux through the coil and <b>induces a pulse</b>; the <b>frequency</b> of the pulses is proportional to shaft speed. The electronics count them and display percentage RPM. There is no mechanical connection or drive, so it is ideal for <b>N1</b> on fans. Multiple coils give independent signals for the indicator and engine control.')
cx, cy = 220, 160; f.Ci(cx, cy, 90, 'ink', 2, 'g3')
for a in range(0, 360, 20): p, q = pol(cx, cy, 90, a), pol(cx, cy, 106, a); f.L(p[0], p[1], q[0], q[1], 'steel', 9)
f.Ci(cx, cy, 14, 'ink', 1.6, 'steel'); f.P(f'M{cx+30},{cy+110} A120,120 0 0 0 {cx+110},{cy+30}', 'gold', 1.8, me='gold')
f.R(340, 140, 80, 40, c='ink', sw=2, fill='g2', rx=4); f.T(380, 200, 'magnet + coil', 10, 'ink', 'middle', bold=True)
for k in range(5): x = 470 + k * 50; f.P(f'M{x},{160} l10,-30 l10,60 l10,-30', 'green', 2); f.L(x + 30, 160, x + 50, 160, 'green', 2)
f.T(590, 210, 'one pulse per tooth', 10.5, 'green', 'middle', bold=True); f.L(420, 160, 468, 160, 'green', 2)
f.T(380, 280, 'pulse frequency proportional to shaft speed', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('38_05', 'Drag-Cup (Eddy-Current) Tachometer', 760, 300, 'A rotating permanent magnet inside an aluminium drag cup, eddy currents dragging the cup round against a hairspring, turning the pointer',
    '<b>Turning speed into a steady pointer.</b> A <b>permanent magnet</b>, driven at engine speed (by a flexible shaft, or by a synchronous motor in a tacho-generator system), rotates inside a light <b>aluminium drag cup</b>. The moving field induces <b>eddy currents</b> in the cup, which produce a <b>drag torque</b> trying to turn the cup with the magnet. A <b>hairspring</b> resists, so the cup and pointer turn through an angle <b>proportional to speed</b>. A fixed iron ring outside concentrates the field.')
f.R(140, 110, 160, 80, c='ink', sw=1.6, fill='hot', rx=4, op=0.5); f.T(220, 155, 'rotating magnet', 10, 'white', 'middle', bold=True, check=False)
f.P('M120,90 L320,90 L320,210 L120,210', 'steel', 6); f.T(220, 80, 'aluminium drag cup', 10.5, 'ink', 'middle', bold=True)
f.L(40, 150, 140, 150, 'ink', 6); f.T(40, 140, 'engine drive', 10, 'ink', bold=True)
f.L(320, 150, 440, 150, 'ink', 3); f.P('M380,150 m-14,0 a14,14 0 1 1 28,0 a10,10 0 1 1 -20,0 a6,6 0 1 1 12,0', 'green', 1.8); f.T(380, 186, 'hairspring', 10, 'green', 'middle', bold=True)
dial(f, 560, 150, 80, -120, 120, [(i / 4, str(i * 10)) for i in range(5)], ptr=0.62, size=10); f.T(560, 186, 'RPM ×100', 9, 'white', 'middle', check=False)
f.T(380, 280, 'eddy-current drag balances the hairspring: deflection proportional to speed', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('38_06', 'Tacho-Generator System', 760, 260, 'An engine-driven three-phase AC generator wired to a synchronous motor in the indicator, which drives a drag-cup mechanism',
    '<b>Remote indication of RPM.</b> A small <b>three-phase AC generator</b> (permanent-magnet rotor) on the engine gearbox produces a voltage whose <b>frequency</b> is proportional to engine speed. Three wires carry it to the indicator, where it drives a <b>synchronous motor</b> that turns at exactly the generator’s speed. The motor spins the magnet of a <b>drag-cup</b> mechanism, which moves the pointer. Because only frequency matters, voltage drop in the wiring does not affect accuracy.')
f.box(40, 90, 160, 70, ['3-phase AC', 'tacho-generator'], c='gold', size=10.5); f.T(120, 184, 'on the engine', 9.5, 'dim', 'middle')
for k in range(3): f.L(200, 110 + k * 15, 300, 110 + k * 15, ['hot', 'gold', 'cool'][k], 2)
f.box(300, 90, 160, 70, ['synchronous', 'motor'], c='cool', size=10.5); f.L(460, 125, 520, 125, 'ink', 4); f.box(520, 90, 120, 70, ['drag cup', '+ pointer'], c='ink', size=10.5)
f.T(380, 230, 'frequency proportional to engine speed: wiring resistance does not affect the reading', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('38_07', 'Percent-RPM Gauge (N1 / N2)', 760, 300, 'Two percent RPM gauges for N1 and N2 with an expanded scale near 100 percent, digital readouts and red limit lines',
    '<b>Spool speeds in percent.</b> Twin-spool engines have two gauges: <b>N1</b> (low-pressure spool, the fan) and <b>N2</b> (high-pressure spool). Each reads in <b>% of a reference RPM</b>; the maximum may exceed 100% (e.g. 104%). A digital counter gives the exact value; a <b>red line</b> marks the limit and an <b>amber</b> band a time-limited range. On start, N2 rises first (driven by the starter), then N1 as the fan follows the gas flow.')
for k, (x, lab, p) in enumerate(((200, 'N1', 0.82), (540, 'N2', 0.9))):
    dial(f, x, 150, 100, -135, 135, [(i / 6, str(i * 20)) for i in range(7)], ptr=p / 1.2, size=10)
    ra = -135 + 270 * 1.04 / 1.2; f.L(*pol(x, 150, 88, ra), *pol(x, 150, 112, ra), 'hot', 5)
    f.R(x - 30, 196, 60, 22, c='white', sw=1.2, fill='black', rx=2); f.T(x, 212, f'{p * 100:.1f}', 11, 'green', 'middle', bold=True, mono=True, check=False)
    f.T(x, 186, lab + ' %', 10, 'white', 'middle', bold=True, check=False)
f.T(370, 290, 'N1: fan (low-pressure spool).   N2: high-pressure spool.', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('38_09', 'N1 Fan-Speed Magnetic Sensor', 760, 280, 'A magnetic speed sensor mounted in the fan case sensing the passing fan blades or a toothed wheel, sending pulses to the engine computer and indicator',
    '<b>Counting fan blades.</b> On many turbofans the <b>N1</b> signal comes from a <b>magnetic speed sensor</b> (a variable-reluctance probe) mounted on the fan case, either sensing the passing <b>fan blade</b> tips or a toothed wheel on the low-pressure shaft. Each blade or tooth induces a pulse; frequency ∝ N1. The sensor has <b>several independent coils</b>, supplying separate signals to the engine control (FADEC), the indicating system and the vibration monitor.')
cx, cy = 220, 150; f.Ci(cx, cy, 110, 'ink', 2.4, 'g2')
for a in range(0, 360, 18): t = pol(cx, cy, 102, a); f.P(f'M{cx},{cy} L{t[0]:.1f},{t[1]:.1f}', 'steel', 3)
f.Ci(cx, cy, 20, 'ink', 1.6, 'g3'); f.R(cx + 104, cy - 20, 40, 40, c='gold', sw=1.6, fill='g3', rx=4); f.T(cx + 124, cy + 40, 'speed sensor', 10, 'gold', 'middle', bold=True)
for k, lab in enumerate(('FADEC', 'N1 indicator', 'vibration monitor')): y = 70 + k * 60; f.box(520, y, 180, 40, [lab], c='cool', size=10.5); f.L(cx + 144, cy, 518, y + 20, 'cool', 1.3, me='cool')
IN.append(f)

f = I('38_10', 'Propeller Synchroscope', 760, 300, 'A synchroscope dial with a rotating disc showing whether the slave engine propeller is faster or slower than the master',
    '<b>Matching propeller speeds.</b> On twins a <b>synchroscope</b> compares the RPM of the <b>slave</b> engine with the <b>master</b>. A small <b>disc or pointer rotates</b> at a speed proportional to the difference, in the direction of the faster engine: if it turns <b>clockwise</b> (towards FAST) the slave is faster; anticlockwise, slower. When the disc <b>stops</b>, the propellers are synchronised, eliminating the annoying “beat” in cabin noise. Many aircraft have automatic synchronisers; the synchroscope then confirms them.')
cx, cy = 220, 150; f.Ci(cx, cy, 100, 'ink', 2.4, 'black')
f.Ci(cx, cy, 50, 'white', 2, 'g2'); f.raw(f'<path d="M{cx},{cy} L{cx},{cy-50} A50,50 0 0 1 {cx+50},{cy} Z" fill="#fff"/><path d="M{cx},{cy} L{cx},{cy+50} A50,50 0 0 1 {cx-50},{cy} Z" fill="#fff"/>')
f.P(f'M{cx+66},{cy-40} A78,78 0 0 1 {cx+66},{cy+40}', 'gold', 2.4, me='gold'); f.T(cx + 86, cy + 4, 'FAST', 11, 'white', bold=True, check=False)
f.P(f'M{cx-66},{cy+40} A78,78 0 0 1 {cx-66},{cy-40}', 'cool', 2.4, me='cool'); f.T(cx - 86, cy + 4, 'SLOW', 11, 'white', 'end', bold=True, check=False)
note(f, 420, 70, ['Clockwise rotation: slave', 'engine FASTER than master.'], first='gold'); note(f, 420, 140, ['Anticlockwise: slower.', 'Disc stopped: synchronised.'], first='cool')
IN.append(f)

f = I('38_18', 'Engine Vibration Monitoring', 760, 280, 'Vibration transducers on the engine casing feeding a signal conditioner with filters tuned to N1 and N2, and an indication on the engine display',
    '<b>Spotting imbalance early.</b> <b>Accelerometers</b> (piezoelectric) or velocity pickups on the engine casing measure vibration. A <b>signal conditioner</b> filters the signal at the frequencies of the N1 and N2 shafts, so the vibration from each spool can be separated, and displays it in arbitrary units (e.g. 0–5) or inches/second. A high or rising reading warns of fan damage (e.g. bird strike, ice), bearing wear or imbalance; an amber advisory appears above a set level.')
flowrow(f, [(['accelerometers', 'on the casing'], 'cool'), (['signal', 'conditioner'], 'gold'), (['filters at', 'N1 and N2'], 'ink'), (['display', '0–5 units'], 'green')], 90, h=56)
f.T(380, 200, 'High vibration: fan damage, ice, bearing wear or imbalance.', 11, 'ink', 'middle', bold=True)
IN.append(f)

f = I('38_19', 'Float-Type Fuel Gauge', 760, 280, 'A float on a pivoted arm in a fuel tank moving the wiper of a variable resistor connected to a ratiometer gauge',
    '<b>The simplest fuel gauge.</b> A <b>float</b> on a pivoted arm rides on the fuel surface; the arm moves the wiper of a <b>variable resistor</b> (potentiometer), whose resistance indicates the fuel <b>level</b>. A ratiometer gauge reads the ratio of currents, so supply voltage changes do not matter. It measures <b>volume</b>, not mass, and is affected by aircraft <b>attitude</b> and acceleration (fuel sloshing), so it reads accurately only in level, unaccelerated flight. Typical in light aircraft.')
f.R(80, 70, 360, 170, c='ink', sw=2, fill='g2', rx=6); f.R(82, 150, 356, 88, c='none', sw=0, fill='cool', rx=4, op=0.35); f.T(260, 220, 'fuel', 10.5, 'cool', 'middle', bold=True)
f.Ci(140, 90, 6, 'ink', 1.4, 'steel'); f.L(140, 90, 300, 146, 'ink', 3); f.El(300, 150, 26, 10, 'ink', 1.6, 'gold'); f.T(300, 132, 'float', 10, 'gold', 'middle', bold=True)
f.R(110, 76, 60, 14, c='hot', sw=1.4, fill='g3', rx=2); f.T(176, 62, 'variable resistor', 9.5, 'hot', bold=True)
dial(f, 600, 150, 70, -60, 60, [(0, 'E'), (0.5, '½'), (1, 'F')], ptr=0.55, size=12)
f.L(440, 150, 520, 150, 'hot', 1.4, dash='5 4'); f.T(380, 268, 'measures volume; accurate only in level, unaccelerated flight', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('38_20', 'Capacitance Fuel Quantity & Flow System', 760, 300, 'Several capacitance probes in a tank with a compensator connected to a bridge circuit and computer that indicates fuel mass, alongside a fuel flow meter in the engine feed',
    '<b>Fuel by mass.</b> Large aircraft use <b>capacitance probes</b>: concentric tubes standing in the tank. Fuel has a dielectric constant of about <b>2.1</b>, air <b>1</b>, so the capacitance rises with fuel height. Because the dielectric constant varies with fuel <b>density</b>, the system indicates <b>mass</b> (kg or lb), which is what matters for range and performance. Several probes across the tank average out attitude effects; a <b>compensator</b> probe (always immersed) corrects for fuel properties. A separate <b>flowmeter</b> in each engine feed gives mass fuel flow and fuel used.')
f.R(60, 70, 340, 170, c='ink', sw=2, fill='g2', rx=6); f.R(62, 150, 336, 88, c='none', sw=0, fill='cool', rx=4, op=0.35)
for x in (110, 190, 270, 350): f.R(x - 8, 80, 16, 156, c='gold', sw=1.6, fill='none', rx=3); f.L(x, 84, x, 232, 'gold', 1.2)
f.R(166, 212, 48, 24, c='green', sw=1.4, fill='none', rx=3); f.T(190, 260, 'compensator', 9.5, 'green', 'middle', bold=True)
f.box(460, 90, 160, 50, ['bridge + computer'], c='gold', size=10.5); f.L(400, 115, 458, 115, 'gold', 1.4, me='gold')
f.R(640, 92, 90, 46, c='white', sw=1.4, fill='black', rx=3); f.T(685, 121, '8 450 kg', 11, 'green', 'middle', bold=True, mono=True, check=False)
f.box(460, 190, 160, 50, ['flowmeter', '(engine feed)'], c='cool', size=10); f.T(685, 220, 'fuel flow', 10, 'cool', 'middle', bold=True)
f.T(230, 60, 'capacitance probes', 10.5, 'gold', 'middle', bold=True)
IN.append(f)

f = I('38_21', 'Capacitance Fuel Probe Construction', 760, 300, 'A cutaway of a capacitance probe: two concentric metal tubes separated by fuel below and air above, forming a capacitor whose value depends on fuel height',
    '<b>A capacitor made of tubes.</b> Each probe is two <b>concentric tubes</b> insulated from each other, open so fuel can enter the gap. The tubes are the <b>plates</b>; whatever fills the gap is the <b>dielectric</b>. Fuel (dielectric constant ≈ 2.1) raises the capacitance compared with air (1.0), so the total capacitance increases linearly with the height of fuel. Probes are shaped (“characterised”) to match the tank cross-section so the output is proportional to quantity. No moving parts and no spark risk with the tiny AC currents used.')
f.R(220, 40, 120, 230, c='steel', sw=4, fill='none', rx=4); f.R(260, 40, 40, 230, c='gold', sw=4, fill='none', rx=4)
f.R(224, 160, 112, 106, c='none', sw=0, fill='cool', rx=2, op=0.45); f.R(264, 160, 32, 106, c='none', sw=0, fill='g2', rx=0)
f.T(200, 100, 'air (k = 1)', 10.5, 'ink', 'end', bold=True); f.T(200, 210, 'fuel (k ≈ 2.1)', 10.5, 'cool', 'end', bold=True)
f.T(360, 60, 'outer tube (plate)', 10, 'ink', bold=True); f.T(360, 80, 'inner tube (plate)', 10, 'gold', bold=True)
note(f, 440, 140, ['More fuel in the gap:', 'more capacitance.', 'k varies with density:', 'system shows MASS.'], first='gold')
IN.append(f)

f = I('38_23', 'Fuel Flow Transmitter (Mass Flowmeter)', 760, 280, 'A mass flowmeter with a motor-driven impeller imparting swirl to the fuel and a spring-restrained turbine whose deflection is proportional to mass flow',
    '<b>Measuring mass flow.</b> In a common <b>mass flowmeter</b>, an <b>impeller</b> driven at constant speed by a motor gives the fuel a <b>swirl</b> (angular momentum). The fuel then passes through a <b>turbine</b> restrained by a calibrated <b>spring</b>; removing the swirl deflects the turbine through an angle proportional to the <b>mass flow</b> (because angular momentum depends on mass). A transmitter sends the angle to the indicator, which shows kg/h or lb/h, and the system integrates flow to show <b>fuel used</b>.')
f.R(80, 100, 600, 80, c='ink', sw=2, fill='g2', rx=10); f.R(82, 102, 596, 76, c='none', sw=0, fill='cool', rx=8, op=0.25)
f.L(30, 140, 80, 140, 'cool', 4, me='cool'); f.L(680, 140, 730, 140, 'cool', 4, me='cool'); f.T(30, 128, 'fuel in', 10, 'cool', bold=True)
f.R(200, 108, 80, 64, c='gold', sw=2, fill='none', rx=4); [f.L(204 + k * 12, 110, 216 + k * 12, 170, 'gold', 1.6) for k in range(6)]; f.T(240, 200, 'impeller (motor driven)', 10, 'gold', 'middle', bold=True)
f.R(440, 108, 80, 64, c='green', sw=2, fill='none', rx=4); [f.L(444 + k * 12, 110, 444 + k * 12, 170, 'green', 1.6) for k in range(6)]; f.T(480, 200, 'turbine + spring', 10, 'green', 'middle', bold=True)
f.P('M300,140 q20,-14 40,0 t40,0 t40,0', 'white', 1.6); f.T(360, 96, 'swirl', 10, 'white', 'middle')
f.T(380, 250, 'turbine deflection proportional to MASS flow; integrated to give fuel used', 11, 'ink', 'middle', bold=True)
IN.append(f)

# --- EICAS / ECAM ---
f = I('39_01', 'EICAS Architecture', 760, 300, 'Engine and system sensors feeding two EICAS computers which drive an upper and a lower display, with a display select panel and master caution and warning lights',
    '<b>Engine Indicating and Crew Alerting System.</b> Engine and system sensors feed <b>two EICAS computers</b> (either can run both displays). They drive the <b>upper display</b> (primary engine parameters and crew alert messages) and the <b>lower display</b> (secondary engine parameters, or system status and maintenance pages), selected on the <b>display select panel</b>. The computers also drive the <b>master warning and caution</b> lights and aural alerts. If a display fails, a compacted format puts everything on the remaining one.')
for k, lab in enumerate(('engine sensors', 'system sensors', 'display select panel')): y = 50 + k * 70; f.box(30, y, 180, 40, [lab], c='cool', size=10.5); f.L(210, y + 20, 288, 150, 'cool', 1.3, me='cool')
f.box(290, 100, 160, 100, ['EICAS', 'COMPUTERS (2)'], c='gold', size=11)
screen(f, 520, 30, 180, 110); f.T(610, 90, 'upper display', 10.5, 'cool', 'middle', bold=True)
screen(f, 520, 160, 180, 110); f.T(610, 220, 'lower display', 10.5, 'cool', 'middle', bold=True)
f.L(450, 130, 518, 85, 'gold', 1.6, me='gold'); f.L(450, 170, 518, 215, 'gold', 1.6, me='gold'); f.T(380, 236, 'master lights, aurals', 10, 'hot', 'middle', bold=True)
IN.append(f)

def eng_gauge(f, x, y, r, frac, val, lab, col_='green'):
    p, q = pol(x, y, r, 270), pol(x, y, r, 120)
    f.P(f'M{p[0]:.1f},{p[1]:.1f} A{r},{r} 0 1 1 {q[0]:.1f},{q[1]:.1f}', 'white', 1.8)
    for v in (0, 0.5, 1): a, b = pol(x, y, r - 6, 270 + 210 * v), pol(x, y, r, 270 + 210 * v); f.L(a[0], a[1], b[0], b[1], 'white', 1.4)
    t = pol(x, y, r - 3, 270 + 210 * frac); f.L(x, y, t[0], t[1], 'white', 2.6, cap='round')
    f.R(x + 2, y - r - 22, 48, 19, c='white', sw=1, fill='black', rx=1); f.T(x + 26, y - r - 8, val, 10.5, col_, 'middle', bold=True, mono=True, check=False)
    f.T(x - r * 0.25, y + r * 0.65, lab, 9.5, 'cool', 'end', bold=True, check=False)
f = I('39_02', 'EICAS Primary & Secondary Engine Displays', 760, 300, 'An upper EICAS display with N1 and EGT gauges for two engines and alert messages, and a lower display with N2, fuel flow, oil pressure, oil temperature and vibration',
    '<b>Primary and secondary parameters.</b> The <b>upper</b> display carries the <b>primary</b> parameters needed to set and monitor thrust — <b>N1</b> (or EPR) and <b>EGT</b> — as round dials with digital readouts, plus the <b>crew alert messages</b> on the right. The <b>lower</b> display carries the <b>secondary</b> parameters: <b>N2</b>, <b>fuel flow</b>, <b>oil pressure, temperature and quantity</b>, and <b>vibration</b>, shown as smaller dials or vertical tapes. Secondary parameters can be hidden in normal flight and pop up automatically if one goes out of limits.')
screen(f, 40, 20, 330, 270); f.T(205, 14, 'upper: primary', 10, 'gold', 'middle', bold=True)
for k in range(2):
    eng_gauge(f, 100 + k * 110, 90, 36, 0.8, '92.4', 'N1'); eng_gauge(f, 100 + k * 110, 190, 36, 0.62, '640', 'EGT')
f.T(290, 70, 'ENG OIL', 10, 'amber', mono=True, check=False); f.T(290, 86, 'PRESS L', 10, 'amber', mono=True, check=False)
screen(f, 400, 20, 330, 270); f.T(565, 14, 'lower: secondary', 10, 'gold', 'middle', bold=True)
for k in range(2): eng_gauge(f, 460 + k * 110, 90, 32, 0.84, '96.1', 'N2')
for k, lab in enumerate(('FF', 'OIL P', 'OIL T', 'VIB')):
    x = 440 + k * 76; f.T(x + 20, 158, lab, 9.5, 'cool', 'middle', bold=True, check=False)
    for j in range(2): f.R(x + j * 22 + 6, 170, 12, 90, c='white', sw=1, fill='none', rx=0); f.R(x + j * 22 + 6, 200 + j * 6, 12, 60 - j * 6, c='none', sw=0, fill='green', rx=0, op=0.7)
IN.append(f)

f = I('39_04', 'EICAS Status Page', 760, 300, 'A lower EICAS display showing the status page with a list of system status messages and hydraulic quantity, oxygen pressure and APU data',
    '<b>Is the aircraft fit to dispatch?</b> The <b>STATUS</b> page, selected on the display select panel, lists <b>status messages</b> — equipment faults that affect dispatch under the minimum equipment list but need no immediate crew action — together with key system values such as <b>hydraulic quantities</b>, <b>oxygen pressure</b>, and APU data. It is checked before departure and after a failure in flight to understand the remaining capabilities.')
screen(f, 200, 20, 360, 270); f.T(380, 44, 'STATUS', 12, 'white', 'middle', bold=True, mono=True, check=False)
for k, t in enumerate(('YAW DAMPER UPR', 'PACK L', 'ANTISKID')): f.T(230, 76 + k * 20, t, 10.5, 'cool', mono=True, check=False)
table(f, 230, 150, [90, 70, 70, 70], ['HYD QTY', 'L', 'C', 'R'], [('', '0.98', '1.00', '0.96')], 'gold')
f.T(230, 230, 'OXY PRESS   1 740 psi', 10.5, 'white', mono=True, check=False); f.T(230, 252, 'APU EGT 380   RPM 100', 10.5, 'white', mono=True, check=False)
note(f, 580, 80, ['Status messages:', 'dispatch-relevant', 'faults (MEL), no', 'immediate action.'], first='cool')
IN.append(f)

f = I('39_05', 'EICAS Alert Message Levels', 760, 300, 'A table of EICAS alert levels: warning in red with master warning and aural, caution in amber with master caution and beeper, advisory in amber indented with no aural, and memo in white',
    '<b>Priority by colour and position.</b> EICAS messages are ranked: <b>Warnings</b> (level A, <b>red</b>) need immediate action — the red <b>MASTER WARNING</b> lights and a distinctive aural (bell, siren, voice). <b>Cautions</b> (level B, <b>amber</b>) need prompt awareness and possible action — amber <b>MASTER CAUTION</b> and a beeper. <b>Advisories</b> (level C, amber, <b>indented</b> one space) need crew awareness only — no master light or aural. <b>Memo</b> messages (white) remind the crew of selected states (e.g. PARK BRAKE SET). Higher levels always appear at the top of the list.')
table(f, 60, 40, [150, 110, 220, 160], ['level', 'colour', 'master light / aural', 'example'], [('A: warning', 'red', 'MASTER WARNING + aural', 'FIRE ENG L'), ('B: caution', 'amber', 'MASTER CAUTION + beeper', 'ENG OIL PRESS'), ('C: advisory', 'amber, indented', 'none', ' YAW DAMPER'), ('memo', 'white', 'none', 'PARK BRAKE SET')], 'gold')
screen(f, 200, 180, 360, 110)
for k, (t, c_, ind) in enumerate((('FIRE ENG L', 'hot', 0), ('ENG OIL PRESS L', 'amber', 0), ('YAW DAMPER', 'amber', 12), ('PARK BRAKE SET', 'white', 0))): f.T(220 + ind, 202 + k * 22, t, 11, c_, bold=True, mono=True, check=False)
IN.append(f)

f = I('39_06', 'Complete EICAS Engine Display', 760, 300, 'A full upper EICAS display for a twin with EPR, N1 and EGT dials, thrust reference mode and limit, TAT, and the crew alert message area',
    '<b>Everything on one page.</b> A typical upper EICAS shows, across the top, the <b>thrust reference mode</b> (TO, CLB, CRZ, CON, GA) with the <b>limit</b> value and the <b>TAT</b>. Below are the <b>EPR</b> (or N1) dials with the command and reference (target) bugs, then <b>N1</b> and <b>EGT</b>, each with a digital readout that turns <b>amber</b> or <b>red</b> at a limit. The crew alert messages occupy the right-hand side, in priority order. Gear and flap positions may also appear here.')
screen(f, 120, 20, 520, 270)
f.T(150, 44, 'TO  1.62', 12, 'green', bold=True, mono=True, check=False); f.T(330, 44, 'TAT +14c', 11, 'white', mono=True, check=False)
for k in range(2):
    x = 190 + k * 130
    eng_gauge(f, x, 124, 36, 0.86, '1.60', 'EPR'); eng_gauge(f, x, 198, 30, 0.8, '95.0', 'N1'); eng_gauge(f, x, 262, 24, 0.6, '610', 'EGT')
    f.L(*pol(x, 124, 30, 270 + 210 * 0.88), *pol(x, 124, 42, 270 + 210 * 0.88), 'mag', 3)
f.L(470, 30, 470, 280, 'line', 1)
for k, (t, c_) in enumerate((('ENG OIL PRESS R', 'amber'), ('PACK L', 'amber'), ('APU RUNNING', 'white'))): f.T(484, 60 + k * 22, t, 10.5, c_, bold=True, mono=True, check=False)
IN.append(f)

f = I('39_07', 'Standby Engine Indicator', 760, 260, 'A small standby engine indicator with digital readouts of N1, N2 and EGT for both engines',
    '<b>Engine data if the main screens fail.</b> A <b>standby engine indicator</b> — a small self-contained LCD unit — shows the essential engine parameters, typically <b>N1</b>, <b>N2</b> and <b>EGT</b> for each engine as digital readouts. It is powered from the standby (battery) bus and takes its data from the engine sensors directly or through the engine control, so the crew can still set and monitor thrust after a total EICAS failure.')
f.R(220, 40, 320, 180, c='line', sw=2, fill='g3', rx=8); screen(f, 240, 56, 280, 140)
for r, lab in enumerate(('N1', 'N2', 'EGT')):
    y = 92 + r * 40; f.T(380, y, lab, 11, 'cool', 'middle', bold=True, check=False)
    for k, v in enumerate((('92.4', '96.1', '640'), ('92.6', '96.0', '635'))): f.T(290 + k * 180, y, v[r], 15, 'green', 'middle', bold=True, mono=True, check=False)
f.T(380, 246, 'Powered from the standby bus: thrust can still be set after an EICAS failure.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

f = I('39_08', 'ECAM Architecture', 760, 300, 'Aircraft sensors feeding system data acquisition concentrators and flight warning computers, which feed display management computers driving the engine/warning display and the system display',
    '<b>Airbus’s Electronic Centralised Aircraft Monitor.</b> Sensor data go to two <b>system data acquisition concentrators</b> (SDAC) — mainly for cautions and system pages — and to two <b>flight warning computers</b> (FWC), which generate warnings, aural alerts and the checklist actions. Three <b>display management computers</b> (DMC) draw the <b>engine/warning display</b> (E/WD, upper) and the <b>system display</b> (SD, lower). The <b>ECAM control panel</b> selects system pages and clears messages.')
for k, lab in enumerate(('aircraft systems', 'engines')): y = 70 + k * 100; f.box(20, y, 140, 44, [lab], c='cool', size=10.5)
f.box(210, 50, 140, 50, ['SDAC (2)'], c='gold', size=11); f.box(210, 180, 140, 50, ['FWC (2)'], c='hot', size=11)
for y in (92, 192): f.L(160, y, 208, 75, 'cool', 1.2, me='cool'); f.L(160, y, 208, 205, 'cool', 1.2, me='cool')
f.box(400, 110, 140, 60, ['DMC (3)'], c='green', size=11); f.L(350, 75, 398, 130, 'gold', 1.4, me='gold'); f.L(350, 205, 398, 150, 'hot', 1.4, me='hot')
screen(f, 590, 30, 150, 100); f.T(665, 85, 'E/WD (upper)', 10, 'cool', 'middle', bold=True); screen(f, 590, 160, 150, 100); f.T(665, 215, 'SD (lower)', 10, 'cool', 'middle', bold=True)
f.L(540, 130, 588, 80, 'green', 1.4, me='green'); f.L(540, 150, 588, 210, 'green', 1.4, me='green')
f.T(280, 270, 'FWC also drives master lights and aurals', 10, 'hot', 'middle', bold=True)
IN.append(f)

f = I('39_10', 'ECAM Status Page', 760, 300, 'An ECAM system display status page with inoperative systems listed on the right, limitations and procedures on the left',
    '<b>What is left after a failure.</b> After the crew has worked through the ECAM actions, the <b>STATUS</b> page appears on the system display. On the left: <b>limitations</b> (e.g. MAX SPEED 320 kt) and <b>approach procedures</b> or information (in blue/cyan); on the right: the list of <b>INOP SYS</b> — inoperative systems. A <b>STS</b> reminder remains on the E/WD while status messages exist. It is reviewed before the approach to plan the landing.')
screen(f, 180, 20, 400, 270); f.T(380, 44, 'STATUS', 12, 'white', 'middle', bold=True, mono=True, check=False); f.L(380, 56, 380, 280, 'line', 1)
for k, (t, c_) in enumerate((('MAX SPD.......320 KT', 'cool'), ('APPR PROC:', 'white'), ('- FOR LDG.USE FLAP 3', 'cool'), ('LDG DIST PROC....APPLY', 'cool'))): f.T(196, 80 + k * 22, t, 10, c_, mono=True, check=False)
f.T(400, 80, 'INOP SYS', 10.5, 'amber', bold=True, mono=True, check=False)
for k, t in enumerate(('G SYS', 'SPLR 1+5', 'AP 2', 'CAT 3 DUAL')): f.T(400, 104 + k * 22, t, 10, 'amber', mono=True, check=False)
f.T(280, 296, 'limitations and procedures', 10, 'gold', 'middle', bold=True); f.T(480, 296, 'inoperative systems', 10, 'gold', 'middle', bold=True)
IN.append(f)

f = I('39_13', 'ECAM Control Panel', 760, 260, 'An ECAM control panel with system page keys, CLR, RCL, STS, EMER CANC, ALL and T.O CONFIG buttons and display brightness knobs',
    '<b>Driving the ECAM.</b> The <b>system page keys</b> (ENG, BLEED, PRESS, ELEC, HYD, FUEL, APU, COND, DOOR, WHEEL, F/CTL) call up each synoptic on the lower display. <b>CLR</b> (lit when there is something to clear) acknowledges the current message and moves to the next; <b>RCL</b> recalls cautions that were cleared or inhibited; <b>STS</b> shows the status page; <b>ALL</b> scrolls through every page; <b>EMER CANC</b> cancels an aural warning or a caution for the rest of the flight; <b>T.O CONFIG</b> tests the take-off configuration warnings.')
f.R(20, 40, 720, 170, c='line', sw=2, fill='g3', rx=8)
for k, t in enumerate(('ENG', 'BLEED', 'PRESS', 'ELEC', 'HYD', 'FUEL', 'APU', 'COND', 'DOOR', 'WHEEL', 'F/CTL', 'ALL')):
    x = 150 + (k % 6) * 74; y = 70 + (k // 6) * 40; f.R(x, y, 64, 28, c='ink', sw=1.2, fill='g2', rx=3); f.T(x + 32, y + 18, t, 9, 'ink', 'middle', bold=True, check=False)
for k, (t, c_) in enumerate((('CLR', 'white'), ('STS', 'ink'), ('RCL', 'ink'))): x = 150 + k * 148; f.R(x, 160, 64, 28, c=c_, sw=1.6, fill='g2', rx=3); f.T(x + 32, 178, t, 10, c_, 'middle', bold=True, check=False)
f.R(36, 70, 90, 40, c='hot', sw=1.4, fill='g2', rx=3); f.T(81, 94, 'EMER CANC', 8.5, 'hot', 'middle', bold=True, check=False)
f.R(36, 140, 90, 40, c='ink', sw=1.4, fill='g2', rx=3); f.T(81, 164, 'T.O CONFIG', 8.5, 'ink', 'middle', bold=True, check=False)
f.Ci(640, 120, 24, 'ink', 1.6, 'steel'); f.T(640, 166, 'brightness', 9, 'dim', 'middle')
f.T(380, 236, 'CLR: next message.  RCL: recall.  STS: status.  EMER CANC: cancel an aural/caution.', 10.5, 'ink', 'middle', bold=True)
IN.append(f)

if __name__ == '__main__':
    gallery(IN, 'Instruments Gallery 7', 'Flight Instruments — Additional Figures (3)', 'Original figures for GPWS/TAWS, TCAS, flight recorders, engine instruments and EICAS/ECAM.', 'ins7-gallery.html')
    print(f'INS7 {len(IN)}  QA warnings: {len(WARN)}')
    for w in WARN: print('  ⚠', w)
