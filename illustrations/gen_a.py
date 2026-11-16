#!/usr/bin/env python3
"""Batch A: Air Law (10), Radio Navigation (14), Flight Planning remainder (16)."""
import math
from figlib import *

AL, RN, FP = [], [], []
def note(f, x, y, lines, size=10, lh=14, c='dim', first=None):
    for i, t in enumerate(lines):
        if t: f.T(x, y + i * lh, t, size, (first or c) if i == 0 else c, bold=(i == 0 and first is not None))
def runway(f, x, y, w, h=16, num=None):
    f.R(x, y, w, h, c='ink', sw=1.2, fill='steel', rx=0)
    f.L(x + 14, y + h / 2, x + w - 14, y + h / 2, 'white', 1.2, dash='10 8')
    for i in range(4): f.L(x + 4, y + 3 + i * (h - 6) / 3, x + 10, y + 3 + i * (h - 6) / 3, 'white', 1.2)
def persp_rwy(f, cx, top, bot, wt=14, wb=40):
    poly(f, [(cx - wt, top), (cx + wt, top), (cx + wb, bot), (cx - wb, bot)], fill='steel', c='ink', sw=1.2)
    f.L(cx, top + 6, cx, bot - 6, 'white', 1.4, dash='8 7')
def lights(f, x, y, cols, r=5, gap=14):
    for i, c_ in enumerate(cols): f.Ci(x + i * gap, y, r, 'ink', 0.8, 'white' if c_ == 'W' else 'hot')

# ════════════════ AIR LAW ════════════════
def levels(fid, title, aria, cap, dials, foot):
    f = Fig(fid, title, 760, 330, aria, cap)
    for cx, head, hc, west, east in dials:
        cy = 160
        f.Ci(cx, cy, 108, 'ink', 1.8, 'g3'); f.L(cx, cy - 108, cx, cy + 108, 'ink', 1.4)
        f.T(cx, 30, head, 11.5, hc, 'middle', bold=True)
        f.T(cx - 6, cy - 114, '359°', 9.5, 'dim', 'end'); f.T(cx + 6, cy - 114, '000°', 9.5, 'dim')
        f.T(cx - 6, cy + 124, '180°', 9.5, 'dim', 'end'); f.T(cx + 6, cy + 124, '179°', 9.5, 'dim')
        f.T(cx - 54, cy - 62, west[0], 10, 'cool', 'middle', bold=True); f.T(cx + 54, cy - 62, east[0], 10, 'gold', 'middle', bold=True)
        for i, v in enumerate(west[1:]): f.T(cx - 54, cy - 38 + i * 19, v, 11, 'ink', 'middle', mono=True)
        for i, v in enumerate(east[1:]): f.T(cx + 54, cy - 38 + i * 19, v, 11, 'ink', 'middle', mono=True)
        f.T(cx - 54, cy + 66, 'WESTBOUND', 8.5, 'cool', 'middle'); f.T(cx + 54, cy + 66, 'EASTBOUND', 8.5, 'gold', 'middle')
    f.T(380, 312, foot, 10, 'dim', 'middle')
    return f
AL.append(levels('al_126_01', 'Semi-Circular Cruising Levels (below FL290)', 'Two compass dials giving IFR and VFR cruising levels for eastbound and westbound magnetic tracks',
    '<b>The semi-circular rule</b> separates opposite-direction traffic by its <b>magnetic track</b>. On tracks <b>000°–179°</b> (eastbound) IFR flights use <b>odd</b> flight levels (FL30, 50, 70…); on <b>180°–359°</b> (westbound) they use <b>even</b> levels (FL40, 60, 80…). VFR flights fly <b>500 ft higher</b>: odd + 500 eastbound (FL35, 55, 75…), even + 500 westbound (FL45, 65, 85…). This gives 1 000 ft between opposite-direction IFR traffic and 500 ft between IFR and VFR. Memory aid: “east is odd”.',
    [(200, 'IFR', 'ink', ('EVEN', 'FL 40', 'FL 60', 'FL 80', 'FL 100', 'etc.'), ('ODD', 'FL 30', 'FL 50', 'FL 70', 'FL 90', 'etc.')),
     (560, 'VFR (IFR level + 500 ft)', 'ink', ('EVEN + 500', 'FL 45', 'FL 65', 'FL 85', 'FL 105', 'etc.'), ('ODD + 500', 'FL 35', 'FL 55', 'FL 75', 'FL 95', 'etc.'))],
    'based on MAGNETIC TRACK: 000°–179° eastbound, 180°–359° westbound'))
AL.append(levels('al_126_02', 'Cruising Levels from FL290 — RVSM and Non-RVSM', 'Two compass dials giving cruising levels at and above flight level 290 with and without reduced vertical separation',
    '<b>At and above FL290</b> the spacing depends on whether <b>RVSM</b> (reduced vertical separation minimum) applies. In <b>RVSM airspace, FL290–FL410</b>, separation stays at 1 000 ft: eastbound <b>odd</b> levels FL290, 310, 330 … 410; westbound <b>even</b> levels FL300, 320 … 400. Where RVSM does <b>not</b> apply, and always above FL410, separation is <b>2 000 ft</b>: eastbound FL290, 330, 370, 410, 450; westbound FL310, 350, 390, 430. RVSM needs approved aircraft: two independent altimeters, an altitude-hold autopilot, an altitude alerter and a mode C transponder.',
    [(200, 'RVSM (FL290–FL410): 1 000 ft', 'ink', ('EVEN', 'FL 300', 'FL 320', 'FL 340', 'FL 360', 'to FL 400'), ('ODD', 'FL 290', 'FL 310', 'FL 330', 'FL 350', 'to FL 410')),
     (560, 'NON-RVSM: 2 000 ft', 'ink', ('WEST', 'FL 310', 'FL 350', 'FL 390', 'FL 430', 'etc.'), ('EAST', 'FL 290', 'FL 330', 'FL 370', 'FL 410', 'FL 450'))],
    'IFR levels by MAGNETIC TRACK. Above FL410 the spacing is always 2 000 ft.'))

def trans(fid, title, aria, cap, mode):
    f = Fig(fid, title, 760, 330, aria, cap)
    f.L(30, 290, 730, 290, 'ink', 1.6); f.R(600, 262, 14, 28, c='ink', sw=1.2, fill='steel', rx=1); f.R(594, 252, 26, 10, c='ink', sw=1.2, fill='g3', rx=2)
    f.T(607, 308, 'aerodrome', 9.5, 'dim', 'middle')
    f.L(60, 190, 700, 190, 'gold', 1.8, dash='8 5'); f.T(700, 206, 'TRANSITION ALTITUDE (TA)', 10, 'gold', 'end', bold=True)
    if mode != 'alt':
        f.L(60, 120, 700, 120, 'cool', 1.8, dash='8 5'); f.T(64, 112, 'TRANSITION LEVEL (TL)', 10, 'cool', bold=True)
    if mode == 'layer':
        f.R(60, 121, 640, 68, c='none', sw=0, fill='cool', rx=0, op=0.14); f.T(380, 160, 'TRANSITION LAYER', 11, 'ink', 'middle', bold=True)
    if mode in ('alt', 'layer'):
        f.L(110, 270, 330, 70, 'green', 2.6, me='green'); f.raw(aircraft(214, 170, -42, 0.3, flip=True))
        f.T(150, 262, 'QNH set: ALTITUDE', 10, 'green', bold=True); f.T(318, 66, '1013.25 set: FLIGHT LEVEL', 10, 'green', 'end', bold=True)
    if mode in ('lvl', 'layer'):
        f.L(400, 60, 580, 250, 'hot', 2.6, me='hot'); f.raw(aircraft(494, 160, 46, 0.3, flip=True))
        f.T(396, 50, '1013.25 set', 10, 'hot', 'end' if mode == 'lvl' else 'start', bold=True) if mode == 'lvl' else None
        f.T(590, 240, 'QNH set', 10, 'hot', bold=True)
    return f
f = trans('al_229_01', 'Transition Altitude — Climbing', 'An aircraft climbing through the transition altitude and changing from QNH to the standard pressure setting',
    '<b>Transition altitude (TA)</b> is the altitude at or below which the vertical position of an aircraft is controlled by reference to <b>altitude</b> (QNH set). <b>Climbing through the TA</b>, the pilot changes the altimeter from QNH to the <b>standard setting 1013.25 hPa</b> and from then on reports <b>flight levels</b>. The TA is fixed for each aerodrome or State, published in the AIP and on charts, and should be as low as possible but normally not below 3 000 ft.', 'alt')
note(f, 430, 232, ['Climbing: at the TA change', 'from QNH to 1013.25 hPa.', 'Above it, report flight levels.'], first='ink'); AL.append(f)
f = trans('al_230_01', 'Transition Level — Descending', 'An aircraft descending through the transition level and changing from the standard pressure setting to QNH',
    '<b>Transition level (TL)</b> is the <b>lowest flight level available for use above the transition altitude</b>. <b>Descending through the TL</b>, the pilot changes from 1013.25 hPa to the aerodrome <b>QNH</b> and from then on reports <b>altitude</b>. Unlike the TA, the TL is not fixed: it varies with the QNH of the day and is determined by ATC (the approach controller or aerodrome), then passed to pilots in the approach clearance or on the ATIS.', 'lvl')
note(f, 70, 236, ['Descending: at the TL change', 'from 1013.25 hPa to QNH.', 'Below it, report altitude.'], first='ink'); AL.append(f)
f = trans('al_231_01', 'Transition Layer', 'The transition layer between the transition altitude and the transition level with a climbing and a descending aircraft',
    '<b>The transition layer</b> is the airspace between the <b>transition altitude</b> and the <b>transition level</b>. Its depth varies with QNH but is normally at least a nominal 1 000 ft, so that aircraft on QNH below and on 1013.25 hPa above stay separated. Aircraft do not cruise in the layer. <b>Climbing</b> through it, vertical position is reported as a <b>flight level</b>; <b>descending</b> through it, as an <b>altitude</b>.', 'layer')
AL.append(f)

def declared(fid, title, cap, tag):
    f = Fig(fid, title, 760, 330, 'A runway with stopway and clearway and the four declared distances drawn as measured lines', cap)
    x0, x1 = 150, 520
    runway(f, 90, 60, 430, 20)
    f.L(x0, 54, x0, 86, 'white', 3); f.T(x0, 48, 'displaced threshold', 9.5, 'ink', 'middle')
    f.R(520, 60, 70, 20, c='gold', sw=1.2, fill='gold', rx=0, op=0.5); f.T(555, 74, 'stopway', 9.5, 'ink', 'middle')
    f.R(520, 40, 150, 60, c='green', sw=1.2, fill='none', rx=0, dash='6 4'); f.T(630, 54, 'clearway', 9.5, 'green', 'middle')
    f.L(60, 70, 84, 70, 'cool', 2.2, me='cool'); f.T(36, 60, 'take-off', 9, 'cool', 'middle'); f.T(36, 88, 'direction', 9, 'cool', 'middle')
    rows = (('TORA', 90, 520, 'ink', 'take-off run available: the runway length for the ground run'),
            ('TODA', 90, 670, 'green', 'take-off distance available = TORA + clearway'),
            ('ASDA', 90, 590, 'gold', 'accelerate-stop distance available = TORA + stopway'),
            ('LDA', 150, 520, 'cool', 'landing distance available: from the (displaced) threshold'))
    for i, (nm, a, b, c_, d) in enumerate(rows):
        y = 132 + i * 44
        f.L(a, y, b, y, c_, 2.2, me=c_, ms=c_); f.L(a, y - 7, a, y + 7, c_, 1.4); f.L(b, y - 7, b, y + 7, c_, 1.4)
        f.T(a, y + 20, nm, 11, c_, bold=True); f.T(a + 46, y + 20, d, 9.5)
    f.T(380, 318, tag, 10, 'dim', 'middle')
    return f
AL.append(declared('al_381_01', 'Declared Distances — TORA, TODA, ASDA & LDA',
    '<b>Four distances are declared for every runway direction.</b> <b>TORA</b> is the length of runway available for the take-off ground run. <b>TODA</b> adds the <b>clearway</b> — an obstacle-free area beyond the runway over which the aircraft may make its initial climb to 35 ft — so TODA = TORA + clearway. <b>ASDA</b> adds the <b>stopway</b>, a prepared area for stopping after a rejected take-off: ASDA = TORA + stopway. <b>LDA</b> is the runway available for landing, measured from the threshold; a <b>displaced threshold</b> shortens it.',
    'Where there is no stopway or clearway and the threshold is not displaced, all four distances are equal.'))

f = Fig('al_407_01', 'Runway-Holding Position Marking — Pattern A', 760, 330, 'A taxiway meeting a runway with the pattern A holding position marking of two solid and two broken yellow lines',
    '<b>Pattern A</b> marks the runway-holding position <b>closest to the runway</b> and is the one used for visual operations. It is four yellow lines across the taxiway: <b>two solid lines on the holding (taxiway) side</b> and <b>two broken lines on the runway side</b>. An aircraft approaching the <b>solid</b> lines must <b>stop</b> and may not cross without ATC clearance; coming off the runway, the broken lines are met first and may be crossed. A red mandatory sign with the runway designator stands beside the marking. (Pattern B, a “ladder”, marks CAT II/III holding positions further back.)')
runway(f, 30, 40, 700, 46); f.T(380, 30, 'RUNWAY 09 / 27', 10, 'ink', 'middle', bold=True)
f.R(340, 86, 80, 224, c='ink', sw=1.2, fill='steel', rx=0); f.L(380, 100, 380, 300, 'gold', 1.6)
for y in (150, 160): f.L(342, y, 418, y, 'gold', 3, dash='9 7')
for y in (172, 182): f.L(342, y, 418, y, 'gold', 3)
f.R(250, 150, 70, 34, c='ink', sw=1.4, fill='hot', rx=3); f.T(285, 172, '09-27', 13, 'white', 'middle', bold=True)
f.P('M380,286 L372,300 L388,300 Z', 'cool', 1, 'cool'); f.L(380, 300, 380, 232, 'cool', 2, me='cool'); f.T(430, 272, 'taxiing towards the runway', 9.5, 'cool')
note(f, 440, 150, ['broken lines: RUNWAY side', '(may be crossed when vacating)'], first='gold')
note(f, 440, 186, ['solid lines: HOLDING side', 'STOP here unless cleared by ATC'], first='gold')
note(f, 60, 214, ['mandatory sign: white on red,', 'runway designator'], first='hot')
note(f, 60, 276, ['Pattern A = the holding position', 'closest to the runway'], first='ink')
AL.append(f)

f = Fig('al_411_01', 'Aerodrome Signs — Mandatory & Information', 760, 340, 'Examples of mandatory instruction signs in white on red and information signs in yellow and black',
    '<b>Two families of sign.</b> <b>Mandatory instruction signs</b> have <b>white characters on a red background</b>: runway designation at a holding position, CAT I/II/III holding positions, and NO ENTRY. An aircraft must not pass one without ATC clearance. <b>Information signs</b> use yellow and black: a <b>location</b> sign is <b>yellow on black</b> (“where you are”), while <b>direction</b> and <b>destination</b> signs are <b>black on yellow</b> with an arrow (“where it goes”). Memory aid: black square, you’re there; yellow array, points the way.')
f.T(190, 30, 'MANDATORY: white on red', 11, 'hot', 'middle', bold=True); f.T(570, 30, 'INFORMATION: yellow and black', 11, 'gold', 'middle', bold=True)
f.L(380, 20, 380, 320, 'line', 1, dash='3 5')
def sign(x, y, w, txt, kind):
    fill, tc, bc = {'man': ('hot', 'white', 'white'), 'loc': ('black', 'gold', 'gold'), 'dir': ('gold', 'black', 'black')}[kind]
    f.R(x, y, w, 34, c=bc, sw=1.6, fill=fill, rx=3); f.T(x + w / 2, y + 23, txt, 14, tc, 'middle', bold=True, mono=True)
for i, (txt, w, d) in enumerate((('09-27', 90, 'runway designation at a holding position'), ('27 CAT I', 110, 'CAT I holding position'), ('27 CAT II/III', 150, 'CAT II / III holding position'))):
    sign(30, 52 + i * 62, w, txt, 'man'); f.T(30, 104 + i * 62, d, 9.5)
f.R(30, 238, 44, 44, c='white', sw=1.6, fill='hot', rx=22); f.R(38, 255, 28, 10, c='none', sw=0, fill='white', rx=1); f.T(86, 258, 'NO ENTRY', 11, 'ink', bold=True); f.T(86, 274, 'entry prohibited', 9.5)
f.T(30, 312, 'Do not pass without ATC clearance.', 10, 'hot', bold=True)
sign(410, 52, 50, 'B', 'loc'); f.T(474, 68, 'LOCATION sign: yellow on black', 10, 'ink', bold=True); f.T(474, 82, 'the taxiway (or runway) you are on', 9.5)
sign(410, 122, 76, 'C →', 'dir'); f.T(500, 138, 'DIRECTION sign: black on yellow', 10, 'ink', bold=True); f.T(500, 152, 'taxiway C leads off to the right', 9.5)
sign(410, 192, 110, 'APRON →', 'dir'); f.T(534, 208, 'DESTINATION sign: black on', 10, 'ink', bold=True); f.T(534, 222, 'yellow; route to the apron', 9.5)
sign(410, 262, 40, 'A', 'loc'); sign(450, 262, 70, 'B →', 'dir'); f.T(534, 278, 'combined: on A, B to the right', 10, 'ink', bold=True)
AL.append(f)

f = Fig('al_433_01', 'PAPI — Approach Slope Indications', 760, 340, 'Five runways seen on approach, each with a row of four PAPI lights showing a different mix of white and red',
    '<b>Precision approach path indicator.</b> A wing bar of <b>four lights</b> beside the runway (normally the left) near the touchdown point. Each unit shows white above a set angle and red below it, so the mix tells the pilot where the aircraft is relative to the approach slope (normally 3°): <b>four white</b> — too high; <b>three white, one red</b> — slightly high; <b>two white, two red</b> — <b>on the correct slope</b>; <b>one white, three red</b> — slightly low; <b>four red</b> — too low. The red lights are always the ones <b>nearest the runway</b>.')
for i, (cols, t1, t2, c_) in enumerate((('WWWW', 'TOO HIGH', '4 white', 'ink'), ('WWWR', 'SLIGHTLY HIGH', '3 white, 1 red', 'ink'), ('WWRR', 'ON SLOPE', '2 white, 2 red', 'green'), ('WRRR', 'SLIGHTLY LOW', '1 white, 3 red', 'ink'), ('RRRR', 'TOO LOW', '4 red', 'hot'))):
    cx = 96 + i * 142
    persp_rwy(f, cx + 26, 70, 210); lights(f, cx - 62, 190, cols)
    f.T(cx, 240, t1, 10.5, c_, 'middle', bold=True); f.T(cx, 256, t2, 9.5, 'dim', 'middle')
f.T(380, 36, 'view from the cockpit on approach', 10, 'dim', 'middle')
f.Ci(250, 296, 5, 'ink', 0.8, 'white'); f.T(262, 300, 'white: above the unit’s set angle', 10); f.Ci(470, 296, 5, 'ink', 0.8, 'hot'); f.T(482, 300, 'red: below it', 10)
f.T(380, 324, 'Red is always on the side nearest the runway.', 10, 'ink', 'middle', bold=True)
AL.append(f)

f = Fig('al_434_01', 'VASI — Approach Slope Indications', 760, 330, 'Three runways seen on approach with two bars of VASI lights showing white and red combinations',
    '<b>Visual approach slope indicator.</b> Two bars of lights beside the runway, a <b>near (downwind) bar</b> and a <b>far (upwind) bar</b>. Each shows white when seen from above its set angle and red from below. <b>Both bars white</b> — too high. <b>Far bar red, near bar white</b> — on the approach slope. <b>Both bars red</b> — too low. Memory aid: “red over white, you’re all right; red over red, you’re dead; white over white, you’ll fly all night.” VASI has largely been replaced by PAPI, which gives finer indications.')
for i, (far, near, t1, t2, c_) in enumerate((('WW', 'WW', 'TOO HIGH', 'both bars white', 'ink'), ('RR', 'WW', 'ON SLOPE', 'far bar red, near bar white', 'green'), ('RR', 'RR', 'TOO LOW', 'both bars red', 'hot'))):
    cx = 150 + i * 230
    persp_rwy(f, cx + 34, 60, 220, 16, 46)
    lights(f, cx - 44, 130, far, 5, 16); lights(f, cx - 56, 180, near, 6, 18)
    f.T(cx - 62, 134, 'far', 9, 'faint', 'end'); f.T(cx - 74, 184, 'near', 9, 'faint', 'end')
    f.T(cx + 10, 250, t1, 11, c_, 'middle', bold=True); f.T(cx + 10, 266, t2, 9.5, 'dim', 'middle')
f.T(380, 36, 'view from the cockpit on approach', 10, 'dim', 'middle')
f.T(380, 304, '“Red over white, you’re all right.”', 10.5, 'ink', 'middle', bold=True)
AL.append(f)

# ════════════════ RADIO NAVIGATION ════════════════
def sine(x0, x1, y0, amp, cycles, phase=0, n=160):
    return ' '.join(f'{x0 + (x1-x0)*i/n:.1f},{y0 - amp*math.sin(2*math.pi*cycles*i/n + phase):.1f}' for i in range(n + 1))
def pl(f, pts, c, sw=2.4, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    f.raw(f'<polyline points="{pts}" fill="none" stroke="{col(c)}" stroke-width="{sw}"{d}/>')

f = Fig('rn_1964', 'Radio Waves — Wavelength, Period & Frequency', 760, 330, 'A sine wave with one wavelength, the amplitude and one period marked',
    '<b>A radio wave is a repeating oscillation.</b> One complete oscillation is a <b>cycle</b>. The <b>period (T)</b> is the time one cycle takes; the <b>frequency (f)</b> is the number of cycles per second, in hertz, so f = 1 ÷ T. The <b>wavelength (λ)</b> is the distance travelled during one cycle. All radio waves travel at the speed of light, c = 300 000 000 m/s, which links the two: <b>λ = c ÷ f</b>. Higher frequency means shorter wavelength: 300 kHz is 1 000 m, 300 MHz is 1 m. <b>Amplitude</b> is the maximum displacement from the mean and represents the strength of the signal.')
f.L(50, 160, 720, 160, 'ink', 1.4, me='ink'); f.L(50, 50, 50, 270, 'ink', 1.4)
pl(f, sine(50, 690, 160, 78, 2), 'cool', 2.8)
f.L(130, 60, 450, 60, 'gold', 1.8, me='gold', ms='gold'); f.L(130, 66, 130, 82, 'gold', 1, dash='3 3'); f.L(450, 66, 450, 82, 'gold', 1, dash='3 3')
f.T(290, 50, 'one wavelength (λ), or one period (T) in time', 10.5, 'gold', 'middle', bold=True)
f.L(130, 158, 130, 86, 'hot', 1.8, me='hot'); f.T(138, 146, 'amplitude', 10, 'hot')
f.T(716, 150, 'distance or time', 9.5, 'dim', 'end'); 
f.T(380, 298, 'f = 1 / T    |    λ = c / f    |    c = 300 000 000 m/s', 11, 'ink', 'middle', bold=True)
f.T(380, 318, 'example: 300 kHz = 1 000 m wavelength;  300 MHz = 1 m', 10, 'dim', 'middle')
RN.append(f)

f = Fig('rn_12037', 'Amplitude Modulation vs Frequency Modulation', 760, 400, 'A carrier wave, an audio signal, the amplitude modulated carrier and the frequency modulated carrier',
    '<b>Modulation</b> impresses information (an audio tone, speech, data) onto a steady radio-frequency <b>carrier</b>. In <b>amplitude modulation (AM)</b> the carrier’s <b>amplitude</b> rises and falls with the signal while its frequency stays constant — simple, but vulnerable to static. In <b>frequency modulation (FM)</b> the carrier’s <b>frequency</b> swings above and below its mean while its amplitude stays constant — much less affected by static, but needs more bandwidth and more complex receivers. VHF aviation voice and the NDB use AM; the VOR reference signal uses FM.')
rows = ((60, 'unmodulated carrier', 'ink'), (140, 'modulating (audio) signal', 'gold'), (230, 'amplitude modulated (AM)', 'cool'), (330, 'frequency modulated (FM)', 'green'))
for y, lab, c_ in rows: f.L(200, y, 720, y, 'line', 1); f.T(30, y + 4, lab, 10.5, c_, bold=True)
n = 600
pl(f, ' '.join(f'{200+520*i/n:.1f},{60-22*math.sin(2*math.pi*26*i/n):.1f}' for i in range(n + 1)), 'ink', 1.6)
pl(f, ' '.join(f'{200+520*i/n:.1f},{140-26*math.sin(2*math.pi*2*i/n):.1f}' for i in range(n + 1)), 'gold', 2.4)
pl(f, ' '.join(f'{200+520*i/n:.1f},{230-(22+14*math.sin(2*math.pi*2*i/n))*math.sin(2*math.pi*26*i/n):.1f}' for i in range(n + 1)), 'cool', 1.6)
pl(f, ' '.join(f'{200+520*i/n:.1f},{230-(22+14*math.sin(2*math.pi*2*i/n)):.1f}' for i in range(n + 1)), 'gold', 1, '4 3')
pl(f, ' '.join(f'{200+520*i/n:.1f},{330-22*math.sin(2*math.pi*26*i/n - 5.5*math.cos(2*math.pi*2*i/n)):.1f}' for i in range(n + 1)), 'green', 1.6)
f.T(30, 248, 'amplitude varies,', 9.5); f.T(30, 261, 'frequency constant', 9.5)
f.T(30, 348, 'frequency varies,', 9.5); f.T(30, 361, 'amplitude constant', 9.5)
f.T(460, 384, 'AM: VHF voice, NDB.   FM: VOR reference signal.', 10, 'dim', 'middle')
RN.append(f)

def card(f, cx, cy, R, hdg, step=30, lab=True):
    f.Ci(cx, cy, R + 14, 'ink', 2.2, 'black')
    for a in range(0, 360, 5):
        r0 = R - (12 if a % 30 == 0 else 8 if a % 10 == 0 else 5)
        p, q = pol(cx, cy, r0, a - hdg), pol(cx, cy, R, a - hdg); f.L(p[0], p[1], q[0], q[1], 'white', 1.6 if a % 30 == 0 else 0.9)
    if lab:
        for a in range(0, 360, 30):
            x, y = pol(cx, cy, R - 24, a - hdg); t = {0: 'N', 90: 'E', 180: 'S', 270: 'W'}.get(a, str(a // 10))
            f.T(x, y + 4, t, 11, 'white', 'middle', bold=True, check=False)
    f.P(f'M{cx},{cy-R-2} L{cx-6},{cy-R-13} L{cx+6},{cy-R-13} Z', 'gold', 1, 'gold')

f = Fig('rn_13186', 'Radio Magnetic Indicator (RMI)', 760, 340, 'A radio magnetic indicator with a rotating compass card and a needle pointing to the station',
    '<b>The RMI combines heading and bearing in one display.</b> The compass card is driven by the gyro-magnetic compass, so the aircraft’s <b>magnetic heading</b> is always under the top index. The needle points at the station (NDB or VOR): its <b>head reads the QDM</b> — the magnetic track to fly to the station — and its <b>tail reads the QDR</b>, the magnetic bearing from the station (the radial, for a VOR). No mental arithmetic is needed, unlike a fixed-card ADF where relative bearing must be added to heading. Here the heading is 090°, the QDM is 270° and the QDR is 090°.')
card(f, 200, 170, 110, 90)
hx, hy = pol(200, 170, 82, 180); tx, ty = pol(200, 170, 82, 0)
f.L(tx, ty, hx, hy, 'gold', 5, cap='round'); f.P(f'M{hx},{hy+12} L{hx-9},{hy-6} L{hx+9},{hy-6} Z', 'gold', 1, 'gold'); f.Ci(200, 170, 6, 'ink', 1.2, 'steel')
f.badge(200, 30, 1); f.badge(200, 312, 2); f.badge(262, 46, 3); f.L(254, 52, 204, 96, 'gold', 1); f.badge(322, 262, 4)
f.legend(420, 70, [(1, 'Heading index', 'magnetic heading (090°) reads under the index'), (2, 'Needle head: QDM', 'magnetic track TO the station: 270°'),
                   (3, 'Needle tail: QDR', 'magnetic bearing FROM the station: 090°'), (4, 'Compass card', 'rotates with the gyro-magnetic compass')], step=48)
f.T(420, 278, 'QDM = heading + relative bearing', 10.5, 'ink', bold=True); f.T(420, 296, '090° + 180° = 270°: the station is directly behind', 10)
RN.append(f)

f = Fig('rn_12044', 'Radio Bearings — QDM, QDR, QTE & QUJ', 760, 340, 'An aircraft and a ground direction-finding station with the bearing line and the four Q-code bearings',
    '<b>Four ways to state one bearing line.</b> Measured at the station, <b>QDR</b> is the <b>magnetic bearing of the aircraft from the station</b> and <b>QTE</b> the <b>true bearing from the station</b>. Their reciprocals are flown by the pilot: <b>QDM</b>, the <b>magnetic heading to steer to the station</b> in still air, and <b>QUJ</b>, the true track to the station. Here the aircraft is south-east of the station: QDR 110°, so QDM 290°. With 10°W variation at the station, QTE = 110° − 10° = 100° and QUJ 280°. VDF bearings are classed A ±2°, B ±5°, C ±10°, D worse than C.')
S = (200, 150); A = pol(200, 150, 330, 110)
f.L(S[0], S[1], S[0], 40, 'ink', 1.6, me='ink'); f.T(S[0] + 8, 46, 'TRUE N', 9.5, 'ink')
mn = pol(S[0], S[1], 110, -10); f.L(S[0], S[1], mn[0], mn[1], 'gold', 1.6, me='gold'); f.T(mn[0] - 6, mn[1] - 4, 'MAG N', 9.5, 'gold', 'end')
f.L(S[0], S[1], A[0], A[1], 'hot', 2.2); f.Ci(S[0], S[1], 6, 'ink', 1.2, 'hot'); f.T(S[0] - 12, S[1] + 22, 'VDF station', 10, 'ink', 'end', bold=True)
e = pol(S[0], S[1], 60, 110); f.P(f'M{S[0]},{S[1]-60} A60,60 0 0 1 {e[0]:.1f},{e[1]:.1f}', 'cool', 1.8, me='cool')
s2 = pol(S[0], S[1], 86, -10); e2 = pol(S[0], S[1], 86, 110); f.P(f'M{s2[0]:.1f},{s2[1]:.1f} A86,86 0 0 1 {e2[0]:.1f},{e2[1]:.1f}', 'gold', 1.8, me='gold')
f.T(326, 84, 'QTE 100°', 10, 'cool', bold=True); f.L(322, 86, 240, 104, 'cool', 1); f.T(296, 130, 'QDR 110°', 10, 'gold', bold=True)
f.raw(aircraft(A[0], A[1], 20, 0.34, flip=False)); f.T(A[0] + 6, A[1] + 36, 'aircraft', 10, 'ink', 'middle', bold=True)
m = pol(S[0], S[1], 190, 110); f.T(m[0] + 4, m[1] - 12, 'QDM 290° (to the station)', 10, 'hot', bold=True)
table(f, 440, 30, [70, 250], ['code', 'meaning'], [('QDM', 'magnetic heading TO the station (nil wind)'), ('QDR', 'magnetic bearing FROM the station'), ('QTE', 'true bearing FROM the station'), ('QUJ', 'true track TO the station')], 'gold')
f.T(60, 318, 'variation 10°W:  QTE = QDR − 10°.   QDM = QDR ± 180°.   QUJ = QTE ± 180°.', 10.5, 'ink', bold=True)
RN.append(f)

f = Fig('rn_1965', 'VOR — Phase Comparison', 760, 350, 'Reference and variable 30 hertz signals drawn in phase and 90 degrees apart, giving the radial',
    '<b>How a VOR gives bearing.</b> The station transmits two <b>30 Hz</b> signals. The <b>reference</b> signal has the same phase in every direction (it is frequency-modulated on a 9 960 Hz sub-carrier). The <b>variable</b> signal comes from a rotating pattern, so its phase is different in every direction (amplitude-modulated). The two are <b>in phase on magnetic north</b>, and the variable signal lags by one degree for every degree clockwise round the station. The receiver measures the <b>phase difference</b>, which equals the <b>radial</b> — the magnetic bearing <b>from</b> the station: 90° of phase difference means the 090 radial.')
for i, (x0, ttl, ph, sub) in enumerate(((50, 'on the 360 radial (magnetic north)', 0, 'in phase: difference 0°'), (410, 'on the 090 radial (east)', -math.pi / 2, 'variable lags by 90°'))):
    f.T(x0 + 150, 34, ttl, 11, 'ink', 'middle', bold=True)
    f.L(x0, 150, x0 + 300, 150, 'line', 1.2); f.L(x0, 60, x0, 240, 'ink', 1.2)
    pl(f, sine(x0, x0 + 300, 150, 70, 1.5), 'cool', 2.6)
    pl(f, sine(x0, x0 + 300, 150, 70 if ph else 62, 1.5, ph), 'hot', 2.4, '7 4')
    f.T(x0 + 150, 262, sub, 10.5, 'gold', 'middle', bold=True)
f.L(410, 50, 460, 50, 'gold', 1.6, me='gold', ms='gold'); f.T(468, 54, '90° of phase', 9.5, 'gold')
f.L(410, 56, 410, 150, 'gold', 1, dash='3 3'); f.L(460, 56, 460, 80, 'gold', 1, dash='3 3')
f.L(180, 300, 214, 300, 'cool', 2.6); f.T(222, 304, 'reference signal (same in all directions)', 10); f.L(450, 300, 484, 300, 'hot', 2.4, dash='7 4'); f.T(492, 304, 'variable signal (rotating pattern)', 10)
f.T(380, 332, 'phase difference between the two 30 Hz signals = the radial (magnetic bearing FROM the station)', 10.5, 'ink', 'middle', bold=True)
RN.append(f)

f = Fig('rn_13192', 'VOR — Cone of Confusion', 760, 340, 'An aircraft flying over a VOR station through an inverted cone of unreliable signal',
    '<b>Directly above the station there is no usable signal.</b> The VOR aerial radiates very little energy vertically, leaving an inverted cone overhead — the <b>cone of confusion</b>. The system must give usable signals up to at least <b>40° of elevation</b>, so the cone can extend up to 50° either side of the vertical; its width grows with height (at 30 000 ft it can be several miles across). Passing through it, the <b>CDI needle swings</b> from side to side, the <b>TO/FROM flag changes</b> and the OFF flag may show briefly. Hold the heading and wait for the indications to settle on the far side.')
f.L(30, 290, 730, 290, 'ink', 1.6); f.R(372, 274, 16, 16, c='ink', sw=1.2, fill='steel', rx=2); f.T(380, 310, 'VOR', 10.5, 'ink', 'middle', bold=True)
poly(f, [(380, 274), (220, 80), (540, 80)], fill='gold', c='gold', sw=1.4, op=0.28)
f.L(380, 274, 220, 80, 'gold', 1.6); f.L(380, 274, 540, 80, 'gold', 1.6)
f.T(380, 150, 'CONE OF', 11, 'ink', 'middle', bold=True); f.T(380, 166, 'CONFUSION', 11, 'ink', 'middle', bold=True)
f.L(60, 100, 700, 100, 'cool', 1.4, dash='7 5')
for x in (110, 380, 650): f.raw(aircraft(x, 96, 0, 0.32, flip=True))
e = pol(380, 274, 90, 39.5); f.P(f'M470,274 A90,90 0 0 0 {e[0]:.1f},{e[1]:.1f}', 'ink', 1.4); f.T(478, 240, '40° elevation:', 9.5, 'ink'); f.T(478, 253, 'usable signal up to here', 9.5)
note(f, 40, 150, ['Approaching: TO flag,', 'needle steady'], first='cool')
note(f, 580, 150, ['Beyond: FROM flag,', 'needle steady again'], first='cool')
note(f, 40, 220, ['In the cone: needle swings,', 'flag flips, OFF flag may show.', 'Hold heading.'], first='gold')
RN.append(f)

def cdi(f, cx, cy, R, obs, dots, flag, lab=True):
    card(f, cx, cy, R, obs, lab=lab)
    for i in (-5, -4, -3, -2, -1, 1, 2, 3, 4, 5): f.Ci(cx + i * R * 0.13, cy, 2.2 if R > 60 else 1.4, 'white', 0.6, 'white')
    f.Ci(cx, cy, 5 if R > 60 else 3, 'white', 1.4, 'black')
    x = cx + dots * R * 0.13; f.L(x, cy - R * 0.62, x, cy + R * 0.62, 'gold', 3.2 if R > 60 else 2, cap='round')
    if flag:
        tx, ty = cx + R * 0.42, cy - R * 0.3
        pts = f'M{tx},{ty-9} L{tx-8},{ty+6} L{tx+8},{ty+6} Z' if flag == 'TO' else f'M{tx},{ty+9} L{tx-8},{ty-6} L{tx+8},{ty-6} Z'
        if R > 60: f.P(pts, 'white', 1, 'white')
f = Fig('rn_13193', 'VOR Course Deviation Indicator (CDI) & OBS', 760, 340, 'A VOR course deviation indicator with the omni bearing selector, deviation needle, dots and to-from flag',
    '<b>Reading the CDI.</b> The pilot selects a course with the <b>omni bearing selector (OBS)</b>; it appears under the top index. The <b>deviation needle</b> shows whether the selected course is to the left or right: fly <b>towards the needle</b> to regain it. Full-scale deflection is <b>10°</b> either side, so each of the five dots is <b>2°</b>. The <b>TO/FROM flag</b> shows whether the selected course would take the aircraft to or from the station. The indication is independent of heading — it depends only on where the aircraft is. Here course 090 is selected, flag TO, needle two dots right: the aircraft is 4° left of course.')
cdi(f, 200, 170, 110, 90, 2, 'TO')
f.Ci(96, 276, 16, 'ink', 1.4, 'steel'); f.T(96, 280, 'OBS', 8.5, 'ink', 'middle', bold=True, check=False)
f.badge(200, 30, 1); f.badge(344, 236, 2); f.L(336, 232, 230, 212, 'gold', 1); f.badge(52, 110, 3); f.L(60, 114, 148, 166, 'gold', 1); f.badge(344, 96, 4); f.L(336, 100, 256, 134, 'gold', 1); f.badge(64, 250, 5)
f.legend(420, 62, [(1, 'Course index', 'the selected course (090°) reads here'), (2, 'Deviation needle', 'two dots right: the course is to the right'),
                   (3, 'Deviation dots', '5 each side, 2° per dot: full scale 10°'), (4, 'TO / FROM flag', 'TO: the course selected leads to the station'), (5, 'OBS knob', 'omni bearing selector: rotates the card')], step=46)
f.T(420, 306, 'Fly towards the needle to regain the selected course.', 10.5, 'ink', bold=True)
RN.append(f)

f = Fig('rn_13197', 'Tracking a VOR Radial', 760, 340, 'A desired track through a VOR with three aircraft positions and the CDI indication at each',
    '<b>The needle shows where the track is.</b> With the correct course selected and the aircraft heading roughly along it, the CDI is a <b>command instrument</b>: needle centred, on track; needle <b>left</b>, the track is to the <b>left</b> — turn left to intercept; needle <b>right</b>, turn right. Once back on track, apply a wind-correction angle and keep the needle centred. If the reciprocal course were selected by mistake, the needle would work in the reverse sense — always check the TO/FROM flag agrees with the direction of flight.')
f.L(40, 190, 720, 190, 'gold', 2, me='gold'); f.T(700, 180, 'required track 090°', 10, 'gold', 'end', bold=True)
f.Ci(560, 190, 7, 'ink', 1.4, 'hot'); f.T(560, 214, 'VOR', 10, 'ink', 'middle', bold=True)
for x, y, dots, lab1, lab2 in ((140, 110, 3, 'LEFT of track:', 'needle right, turn right'), (300, 190, 0, 'ON track:', 'needle centred'), (140, 270, -3, 'RIGHT of track:', 'needle left, turn left')):
    f.raw(aircraft(x, y - 4, 0, 0.3, flip=True))
for (cx, cy, dots, a, b) in ((430, 70, 3, 'LEFT of track', 'needle right: turn right'), (430, 290, -3, 'RIGHT of track', 'needle left: turn left')):
    cdi(f, cx, cy, 34, 90, dots, None, lab=False); f.T(cx + 60, cy - 2, a, 10.5, 'ink', bold=True); f.T(cx + 60, cy + 13, b, 9.5)
cdi(f, 300, 262, 34, 90, 0, None, lab=False); f.T(300, 322, 'on track: centred', 9.5, 'dim', 'middle')
f.L(170, 110, 380, 74, 'dim', 1, dash='3 4'); f.L(170, 268, 380, 288, 'dim', 1, dash='3 4'); f.L(300, 200, 300, 214, 'dim', 1, dash='3 4')
f.T(60, 40, 'course 090° selected, flag TO', 10.5, 'ink', bold=True)
RN.append(f)

f = Fig('rn_13201', 'VOR Course Deviation — Degrees Off Track', 760, 340, 'A selected course line through a VOR with an aircraft six degrees to the right and the matching CDI showing three dots left',
    '<b>Converting dots to degrees and distance.</b> Each dot on the CDI is <b>2°</b>. Here the course selected is 360° FROM the station and the aircraft is actually on the 006 radial: it is <b>6° right</b> of the required course, so the needle is <b>three dots left</b>. To turn degrees into distance use the <b>1-in-60 rule</b>: one degree is one nautical mile off track at 60 nm, so 6° at 30 nm from the station is 3 nm off track. The deviation is angular, so the same number of dots means a smaller distance error closer to the station.')
S = (230, 290)
f.L(S[0], S[1], S[0], 50, 'gold', 2, me='gold'); f.T(S[0] - 8, 60, 'course selected 360°', 10, 'gold', 'end', bold=True)
a = pol(S[0], S[1], 230, 6 * 2.2); f.L(S[0], S[1], a[0], a[1], 'hot', 2, dash='7 4'); f.T(a[0] + 6, a[1] + 2, '006 radial (actual)', 10, 'hot', bold=True)
p = pol(S[0], S[1], 196, 6 * 2.2); f.raw(aircraft(p[0], p[1], -80, 0.3, flip=True))
e = pol(S[0], S[1], 96, 13.2); f.P(f'M{S[0]},{S[1]-96} A96,96 0 0 1 {e[0]:.1f},{e[1]:.1f}', 'ink', 1.4); f.T(S[0] + 26, S[1] - 104, '6°', 10.5, 'ink', bold=True)
f.Ci(S[0], S[1], 7, 'ink', 1.4, 'hot'); f.T(S[0], S[1] + 22, 'VOR', 10, 'ink', 'middle', bold=True)
f.T(40, 150, 'angles exaggerated', 9, 'faint')
cdi(f, 560, 130, 80, 0, -3, 'FROM')
f.T(560, 244, 'needle 3 dots LEFT = 6° right of course', 10.5, 'ink', 'middle', bold=True)
f.T(560, 264, '2° per dot; full scale 10°', 10, 'dim', 'middle')
f.T(560, 296, '1-in-60 rule: 6° at 30 nm = 3 nm off track', 10.5, 'gold', 'middle', bold=True)
RN.append(f)

f = Fig('rn_12038', 'ILS Localiser — 90 Hz and 150 Hz Lobes', 760, 340, 'Plan view of a runway with the localiser aerial at the far end radiating a 90 hertz lobe on the left and a 150 hertz lobe on the right of the approach',
    '<b>The localiser gives guidance in azimuth.</b> Its aerial is at the <b>far (stop) end</b> of the runway and radiates two overlapping lobes on one carrier in the band <b>108–111.975 MHz</b> (odd first decimals). Seen from an approaching aircraft, the lobe on the <b>left is modulated at 90 Hz</b> and the lobe on the <b>right at 150 Hz</b>. The receiver compares the depth of the two tones: equal means on the centreline; more 90 Hz means the aircraft is left of it, and the needle shows <b>fly right</b>. Coverage is 25 nm within ±10° of the centreline and 17 nm out to ±35°.')
runway(f, 470, 150, 200, 22); f.R(690, 146, 10, 30, c='ink', sw=1.4, fill='gold', rx=1); f.T(695, 136, 'localiser aerial', 9.5, 'gold', 'middle')
f.P('M695,161 Q380,60 60,110 Q40,136 60,161 Z', 'gold', 1.4, 'gold', op=0.3); f.P('M695,161 Q380,262 60,212 Q40,186 60,161 Z', 'cool', 1.4, 'cool', op=0.3)
f.L(40, 161, 690, 161, 'ink', 1.4, dash='10 6')
f.T(250, 112, '90 Hz predominates', 11, 'gold', 'middle', bold=True); f.T(250, 218, '150 Hz predominates', 11, 'cool', 'middle', bold=True)
f.T(250, 154, 'equisignal: the extended centreline', 9.5, 'ink', 'middle')
f.raw(aircraft(110, 130, 0, 0.3, flip=True)); f.L(40, 60, 100, 60, 'ink', 1.8, me='ink'); f.T(40, 50, 'approach direction', 9.5, 'ink')
f.T(40, 86, 'left of centreline: fly right', 9.5, 'gold'); f.T(40, 250, 'right of centreline: fly left', 9.5, 'cool')
f.T(380, 296, 'Memory aid on approach: 90 Hz on the left, 150 Hz on the right (the glide path has 90 Hz above, 150 Hz below).', 10, 'dim', 'middle')
f.T(380, 318, 'Frequency: 108–111.975 MHz, odd first decimals.  Coverage: 25 nm within ±10°, 17 nm to ±35°.', 10, 'ink', 'middle')
RN.append(f)

f = Fig('rn_13216', 'Marker Beacons — Patterns & Identification', 760, 340, 'Plan-view radiation patterns of fan and Z marker beacons and a table of the outer, middle and inner marker identifications',
    '<b>Marker beacons</b> transmit a narrow <b>vertical</b> beam on <b>75 MHz</b>, heard and seen only when the aircraft is directly overhead. The beam is fan-shaped — narrow along track, wide across it — and may be elliptical or “bone” shaped in plan; a <b>Z marker</b> is a small circular cone, once used over a range station. On an ILS: the <b>outer marker</b> (about 4 nm from the threshold) gives low-pitched <b>dashes</b> and a <b>blue</b> light; the <b>middle marker</b> (about 1 050 m) alternate <b>dots and dashes</b>, <b>amber</b>; the <b>inner marker</b> (75–450 m) high-pitched <b>dots</b>, <b>white</b>. Many are now replaced by a DME.')
f.T(150, 30, 'radiation patterns (plan view)', 11, 'ink', 'middle', bold=True)
f.El(150, 76, 96, 16, 'cool', 1.6, 'cool'); f.T(150, 110, 'elliptical (fan) pattern', 10, 'ink', 'middle')
f.P('M60,160 C80,134 124,140 150,152 C176,140 220,134 240,160 C220,186 176,180 150,168 C124,180 80,186 60,160 Z', 'cool', 1.6, 'cool'); f.T(150, 206, 'bone pattern', 10, 'ink', 'middle')
f.Ci(150, 258, 26, 'cool', 1.6, 'cool'); f.T(150, 304, 'Z marker (circular cone)', 10, 'ink', 'middle')
f.L(30, 76, 270, 76, 'ink', 1, dash='4 4'); f.L(30, 160, 270, 160, 'ink', 1, dash='4 4'); f.T(274, 64, 'track', 9, 'faint', 'end')
table(f, 310, 44, [78, 92, 70, 100, 90], ['marker', 'from threshold', 'light', 'keying', 'tone'],
      [('Outer (OM)', 'about 4 nm', 'blue', 'dashes, 2 per sec', '400 Hz (low)'), ('Middle (MM)', 'about 1 050 m', 'amber', 'dot-dash', '1 300 Hz'), ('Inner (IM)', '75–450 m', 'white', 'dots, 6 per sec', '3 000 Hz (high)')], 'gold')
for i, c_ in enumerate(('cool', 'amber', 'white')): f.Ci(534, 76 + i * 20, 4.5, 'ink', 0.8, c_)
f.T(310, 168, 'All markers transmit on 75 MHz, vertically upwards.', 10.5, 'ink', bold=True)
note(f, 310, 196, ['Closer to the runway: higher tone, faster keying.', 'A fan marker is narrow along track, so it is heard', 'for only a few seconds as the aircraft passes over.', '', 'Set the marker receiver to LOW sensitivity on the', 'approach to sharpen the indication.'])
RN.append(f)

f = Fig('rn_13217', 'ILS Approach Profile', 760, 340, 'Side view of an ILS approach showing the glide path, the outer, middle and inner markers, the decision height and the runway',
    '<b>The ILS in the vertical plane.</b> The <b>glide path</b> transmitter (329.15–335 MHz, UHF, paired automatically with the localiser frequency) sits about 300 m in from the threshold beside the runway and defines a slope, normally <b>3°</b>, that crosses the threshold at about 50 ft. The aircraft intercepts it <b>from below</b>, at the final approach point, to avoid false glide paths that exist at steeper multiples of the true angle. The <b>outer marker</b> gives a height check at about 4 nm, the <b>middle marker</b> at about 1 050 m (roughly the CAT I decision height), and the <b>inner marker</b> close to the threshold. Rule of thumb: on a 3° slope, height is about <b>300 ft per nm</b>.')
f.L(30, 280, 730, 280, 'ink', 1.6); f.R(600, 280, 120, 8, c='ink', sw=1, fill='dim', rx=0); f.T(660, 304, 'runway', 9.5, 'dim', 'middle')
f.L(620, 280, 90, 110, 'hot', 2.4); f.L(30, 110, 90, 110, 'hot', 2.4); f.raw(aircraft(60, 104, 0, 0.3, flip=True))
f.T(36, 132, 'intermediate approach', 9.5, 'dim'); f.Ci(90, 110, 4.5, 'ink', 1, 'ink'); f.T(96, 96, 'glide path intercepted from below', 9.5, 'ink')
for x, lab, c_, d in ((200, 'OM', 'cool', 'about 4 nm'), (480, 'MM', 'amber', 'about 1 050 m'), (566, 'IM', 'white', '75–450 m')):
    poly(f, [(x, 280), (x - 9, 150), (x + 9, 150)], fill=c_, c=c_, sw=1, op=0.45); f.T(x, 142, lab, 10.5, c_, 'middle', bold=True); f.T(x, 298, d, 9, 'dim', 'middle')
e = pol(620, 280, 150, -72.2); f.P(f'M470,280 A150,150 0 0 1 {620-150*math.cos(math.radians(17.8)):.1f},{280-150*math.sin(math.radians(17.8)):.1f}', 'ink', 1.2)
f.T(440, 266, '3°', 10.5, 'ink', bold=True)
f.L(400, 235, 480, 235, 'gold', 1.4, dash='4 3'); f.T(394, 232, 'decision height', 9.5, 'gold', 'end', bold=True); f.T(394, 244, '(CAT I: 200 ft)', 9.5, 'gold', 'end')
f.T(380, 40, 'glide path: 329.15–335 MHz (UHF), normally 3°, crossing the threshold at about 50 ft', 10.5, 'ink', 'middle', bold=True)
f.T(380, 58, 'vertical scale exaggerated', 9, 'faint', 'middle')
f.T(380, 326, 'On a 3° glide path: height is about 300 ft per nm; rate of descent is about 5 × ground speed (ft/min).', 10, 'dim', 'middle')
RN.append(f)

f = Fig('rn_12041', 'Airborne Radar — Beam & Ground Illumination', 760, 340, 'An aircraft with a radar beam angled down to the ground, showing the beamwidth, slant range and the illuminated footprint',
    '<b>Radar measures range by timing an echo</b>: a pulse travels out and back at the speed of light, so range = (c × time) ÷ 2. What the aircraft measures is the <b>slant range</b> along the beam, not the distance along the ground. The <b>beamwidth</b> depends on wavelength and aerial size (roughly 70 × λ ÷ D degrees), so a small airborne dish needs a short wavelength — about 3 cm (9 375 MHz, X-band) — to make a narrow beam. The beam illuminates a <b>footprint</b> on the surface that grows with range; two targets inside one beamwidth merge into a single echo. Tilting the beam down maps the ground; tilting it up looks for weather.')
f.L(30, 290, 730, 290, 'ink', 1.6)
f.raw(aircraft(130, 70, 0, 0.5, flip=True)); T0 = (178, 74)
poly(f, [T0, (470, 290), (640, 290)], fill='gold', c='gold', sw=1.2, op=0.2)
f.L(T0[0], T0[1], 470, 290, 'gold', 1.4); f.L(T0[0], T0[1], 640, 290, 'gold', 1.4)
f.L(T0[0], T0[1], 555, 290, 'hot', 1.8, dash='7 4'); f.T(490, 206, 'slant range (dashed)', 10.5, 'hot', bold=True)
f.L(T0[0], T0[1], T0[0], 290, 'cool', 1.4, dash='4 4'); f.T(T0[0] - 8, 190, 'height', 9.5, 'cool', 'end')
f.L(T0[0], 304, 555, 304, 'cool', 1.4, me='cool', ms='cool'); f.T(366, 322, 'ground range (shorter than slant range)', 9.5, 'cool', 'middle')
f.El(555, 290, 85, 9, 'gold', 1.6, 'gold'); f.T(660, 276, 'footprint', 10, 'gold', bold=True)
a1 = (T0[0] + 90 * (470 - T0[0]) / 363.0, T0[1] + 90 * 216 / 363.0); a2 = (T0[0] + 90 * (640 - T0[0]) / 510.0, T0[1] + 90 * 216 / 510.0)
f.P(f'M{a1[0]:.1f},{a1[1]:.1f} A90,90 0 0 0 {a2[0]:.1f},{a2[1]:.1f}', 'ink', 1.4); f.T(268, 106, 'beamwidth', 10, 'ink', bold=True)
note(f, 470, 60, ['range = (speed of light × echo time) / 2', 'beamwidth ≈ 70 × wavelength / aerial diameter', 'airborne weather radar: 9 375 MHz (3 cm, X-band)'], first='ink')
RN.append(f)

f = Fig('rn_13234', 'Radar Aerial Feed Types', 760, 320, 'Three parabolic reflector aerials seen from the side with a dipole feed, a horn feed and a Cassegrain feed',
    '<b>A parabolic reflector turns a point source into a beam.</b> Energy leaving the <b>focus</b> of a parabola is reflected as parallel rays, so the job of the <b>feed</b> is to put the transmitter’s energy at the focus. A <b>dipole feed</b> is a small aerial at the focus with a reflector plate behind it. A <b>horn feed</b> is the open, flared end of a waveguide pointing at the dish. A <b>Cassegrain feed</b> radiates from a horn at the centre of the dish onto a small convex <b>sub-reflector</b> at the focus, which throws it back onto the main dish — keeping the heavy waveguide short and behind the dish. Modern weather radars use a flat-plate (slotted planar array) aerial instead, with fewer side lobes.')
def dish(cx, cy):
    f.P(f'M{cx+40},{cy-80} Q{cx-40},{cy} {cx+40},{cy+80}', 'ink', 3.4)
    for dy in (-56, -28, 28, 56):
        x = cx + (dy * dy) / 160.0; f.L(cx + 86, cy, x + 2, cy + dy, 'gold', 1, dash='3 3'); f.L(x + 2, cy + dy, cx + 190, cy + dy, 'gold', 1.4, me='gold')
for cx, ttl in ((50, 'DIPOLE FEED'), (300, 'HORN FEED'), (550, 'CASSEGRAIN FEED')): dish(cx, 140); f.T(cx + 90, 260, ttl, 11, 'ink', 'middle', bold=True)
f.L(30, 140, 136, 140, 'steel', 5); f.L(136, 124, 136, 156, 'hot', 3.4); f.L(146, 128, 146, 152, 'ink', 2)
f.T(140, 284, 'dipole at the focus', 9.5, 'dim', 'middle')
f.P('M290,220 L350,220 Q376,220 380,190 L384,156', 'steel', 5); f.P('M376,160 L392,160 L396,140 L372,140 Z', 'ink', 1.4, 'hot')
f.T(390, 284, 'waveguide horn at the focus', 9.5, 'dim', 'middle')
f.L(510, 140, 556, 140, 'steel', 5); f.P('M556,132 L556,148 L572,154 L572,126 Z', 'ink', 1.4, 'hot'); f.P('M640,118 Q626,140 640,162', 'cool', 3.4)
f.L(572, 134, 634, 128, 'cool', 1, dash='3 3'); f.L(572, 146, 634, 152, 'cool', 1, dash='3 3')
f.T(640, 284, 'horn + convex sub-reflector', 9.5, 'dim', 'middle')
f.T(380, 26, 'energy from the focus of a parabola leaves as a parallel beam', 10.5, 'ink', 'middle', bold=True)
RN.append(f)

# ════════════════ FLIGHT PLANNING ════════════════
def nam(fid, title, cap, head):
    f = Fig(fid, title, 760, 320, 'Air distance and ground distance compared for a flight with a ' + ('headwind' if head else 'tailwind'), cap)
    f.L(40, 250, 720, 250, 'ink', 1.6); poly(f, [(40, 250), (720, 250), (720, 262), (40, 262)], fill=LAND, c='none', sw=0)
    x0 = 80; xa = 660 if head else 520; xg = 520 if head else 660
    f.raw(aircraft(x0, 150, 0, 0.3, flip=True)); f.raw(aircraft(xg, 150, 0, 0.3, flip=True)); f.T(x0, 182, 'start', 9.5, 'dim', 'middle'); f.T(xg, 182, 'end', 9.5, 'dim', 'middle')
    f.L(x0, 60, x0, 240, 'faint', 1, dash='3 4'); f.L(xa, 60, xa, 110, 'faint', 1, dash='3 4'); f.L(xg, 120, xg, 240, 'faint', 1, dash='3 4')
    f.L(x0, 90, xa, 90, 'cool', 2.2, me='cool', ms='cool'); f.T((x0 + xa) / 2, 80, 'AIR DISTANCE (NAM) = TAS × time', 10.5, 'cool', 'middle', bold=True)
    f.L(x0, 216, xg, 216, 'gold', 2.2, me='gold', ms='gold'); f.T((x0 + xg) / 2, 236, 'GROUND DISTANCE (NGM) = GS × time', 10.5, 'gold', 'middle', bold=True)
    a, b = (xg, xa) if head else (xa, xg)
    f.L(b if head else a, 130, a if head else b, 130, 'hot', 2.4, me='hot'); f.T((a + b) / 2, 120, 'headwind' if head else 'tailwind', 10, 'hot', 'middle', bold=True)
    f.T(380, 290, ('Headwind: GS is less than TAS, so the aircraft flies MORE air miles than ground miles.' if head else 'Tailwind: GS is greater than TAS, so the aircraft flies FEWER air miles than ground miles.'), 10.5, 'ink', 'middle', bold=True)
    f.T(380, 308, 'NAM = NGM × TAS / GS', 10.5, 'gold', 'middle', bold=True)
    return f
FP.append(nam('fig_03_01', 'Nautical Air Miles vs Ground Miles — Headwind',
    '<b>Air distance and ground distance are different things.</b> <b>Nautical air miles (NAM)</b> are the distance flown <b>through the air mass</b>: TAS × time. <b>Nautical ground miles (NGM)</b> are the distance covered <b>over the ground</b>: ground speed × time. With a <b>headwind</b> the air mass is moving back along track, so the aircraft must fly <b>more air miles than ground miles</b> to cover the route. Fuel burn depends on air miles, which is why headwinds cost fuel. Convert with <b>NAM = NGM × TAS ÷ GS</b>.', True))
FP.append(nam('fig_03_02', 'Nautical Air Miles vs Ground Miles — Tailwind',
    '<b>With a tailwind the air mass carries the aircraft forward</b>, so ground speed exceeds TAS and the aircraft covers the ground distance in <b>fewer air miles</b>: NAM is less than NGM. The same formula applies, <b>NAM = NGM × TAS ÷ GS</b>. Example: 600 NGM at TAS 240 kt with a 40 kt tailwind (GS 280 kt) is 600 × 240 ÷ 280 = 514 NAM. Fuel tables and specific range figures are given in air miles, so always convert the ground distance first.', False))

f = Fig('fig_14_02', 'Point of Safe Return — Deriving the Formula', 760, 340, 'A track from A outbound to the point of safe return and back, with the algebra that gives the PSR formula',
    '<b>Where the formula comes from.</b> Let <b>E</b> be the safe endurance, <b>T</b> the time out to the PSR, <b>O</b> the ground speed out and <b>H</b> the ground speed home. The time left for the return is E − T. By definition the <b>distance out equals the distance home</b>, so T × O = (E − T) × H. Multiply out and collect T: T × O + T × H = E × H, hence <b>T = E × H ÷ (O + H)</b>. Multiply T by O for the distance. Because O + H is largest when there is no wind component, <b>any wind reduces the distance to the PSR</b>.')
f.L(80, 80, 440, 80, 'cool', 2.2, me='cool'); f.L(440, 110, 80, 110, 'gold', 2.2, me='gold')
f.Ci(80, 95, 6, 'ink', 1.2, 'ink'); f.T(66, 99, 'A', 12, 'ink', 'end', bold=True); f.P('M440,95 L452,86 L452,104 Z', 'hot', 1, 'hot'); f.T(460, 99, 'PSR', 11, 'hot', bold=True)
f.T(260, 68, 'out: time T at ground speed O', 10, 'cool', 'middle', bold=True); f.T(260, 130, 'home: time (E − T) at ground speed H', 10, 'gold', 'middle', bold=True)
note(f, 540, 60, ['E = safe endurance', 'T = time out to the PSR', 'E − T = time home', 'O = ground speed out', 'H = ground speed home'], lh=16, first='ink')
steps = ['distance out = distance home', 'T × O = (E − T) × H', 'T × O = E × H − T × H', 'T × O + T × H = E × H', 'T × (O + H) = E × H']
for i, t in enumerate(steps): f.T(260, 174 + i * 22, t, 11.5, 'ink' if i else 'dim', 'middle', mono=bool(i))
f.R(120, 284, 280, 36, c='gold', sw=1.6, fill='g2'); f.T(260, 307, 'T = E × H / (O + H)', 13, 'gold', 'middle', bold=True, mono=True)
note(f, 470, 250, ['Distance to PSR = T × O', 'Any wind component, head or tail,', 'moves the PSR closer to A.'], lh=16, first='ink')
FP.append(f)

f = Fig('fig_14_03', 'PSR on the Navigation Computer', 760, 320, 'The circular slide rule of a navigation computer set up to solve the point of safe return',
    '<b>One setting solves it.</b> The formula T = E × H ÷ (O + H) is a simple proportion: <b>T ÷ E = H ÷ (O + H)</b>. On the circular slide rule of the navigation computer, set the <b>safe endurance E on the inner scale against (O + H) on the outer scale</b>. Then, opposite <b>H on the outer scale</b>, read <b>T on the inner scale</b> — the time to the PSR. Example: E = 300 min, O = 200 kt, H = 250 kt. Set 300 against 450; against 250 read T = 167 min. Distance to PSR = 167 min at 200 kt = 556 nm.')
cx, cy = 300, 430
for r, c_ in ((330, 'ink'), (290, 'gold')):
    a, b = pol(cx, cy, r, -40), pol(cx, cy, r, 40); f.P(f'M{a[0]:.1f},{a[1]:.1f} A{r},{r} 0 0 1 {b[0]:.1f},{b[1]:.1f}', c_, 2)
for i in range(-38, 39, 4):
    p, q = pol(cx, cy, 330, i), pol(cx, cy, 338, i); f.L(p[0], p[1], q[0], q[1], 'ink', 1)
    p, q = pol(cx, cy, 290, i), pol(cx, cy, 282, i); f.L(p[0], p[1], q[0], q[1], 'gold', 1)
for ang, top, bot in ((-22, 'H = 250', 'T = 167 min'), (18, 'O + H = 450', 'E = 300 min')):
    p, q = pol(cx, cy, 276, ang), pol(cx, cy, 346, ang); f.L(p[0], p[1], q[0], q[1], 'hot', 2.4)
    t = pol(cx, cy, 362, ang); b = pol(cx, cy, 256, ang)
    f.T(t[0], t[1], top, 11, 'ink', 'middle', bold=True); f.T(b[0], b[1] + 6, bot, 11, 'gold', 'middle', bold=True)
f.T(300, 40, 'OUTER scale: speed', 10, 'ink', 'middle'); f.T(300, 240, 'INNER scale: time', 10, 'gold', 'middle')
note(f, 540, 70, ['1  Set E (inner) against', '    O + H (outer).', '2  Opposite H (outer),', '    read T (inner).', '3  Distance = T at speed O.'], lh=17, first='ink')
f.R(520, 190, 220, 56, c='gold', sw=1.4, fill='g2'); f.T(630, 212, 'T / E = H / (O + H)', 12, 'gold', 'middle', bold=True, mono=True); f.T(630, 232, '167 / 300 = 250 / 450', 10.5, 'dim', 'middle', mono=True)
f.T(380, 300, 'Example: E 300 min, O 200 kt, H 250 kt gives T = 167 min and a distance of 556 nm.', 10.5, 'ink', 'middle', bold=True)
FP.append(f)

f = Fig('fig_mb_2_2', 'Balance Arms — Datum, Arm, Moment & CG', 760, 340, 'An aircraft side view with a datum line, the balance arms to three loads and the resulting centre of gravity',
    '<b>Every load has a position as well as a mass.</b> The <b>datum</b> is a fixed reference plane chosen by the manufacturer, from which all positions are measured. The distance from the datum to a load is its <b>balance arm</b>: positive aft of the datum, negative forward. <b>Moment = mass × arm</b>. Add all the masses and all the moments, and the <b>centre of gravity is total moment ÷ total mass</b>. In the example: total mass 1 200 kg, total moment 3 120 000 kg·mm, so the CG is 2 600 mm aft of the datum. It must lie between the forward and aft limits at all times.')
f.L(110, 30, 110, 250, 'hot', 1.8, dash='8 4'); f.T(110, 24, 'DATUM', 10.5, 'hot', 'middle', bold=True)
f.raw(aircraft(380, 96, 0, 1.0, flip=True, gear=True))
f.L(110, 190, 700, 190, 'ink', 1.4)
for x, lab, c_ in ((230, 'A', 'cool'), (400, 'B', 'cool'), (560, 'C', 'cool')):
    f.L(x, 150, x, 184, c_, 2.4, me=c_); f.T(x, 142, lab, 11, c_, 'middle', bold=True)
    f.L(110, 204 + 'ABC'.index(lab) * 16, x, 204 + 'ABC'.index(lab) * 16, 'gold', 1.4, me='gold')
f.T(240, 208, 'arm A', 9.5, 'gold'); f.T(410, 224, 'arm B', 9.5, 'gold'); f.T(570, 240, 'arm C', 9.5, 'gold')
f.P('M370,184 L360,166 L380,166 Z', 'green', 1, 'green'); f.T(354, 180, 'CG', 11, 'green', 'end', bold=True)
table(f, 150, 256, [70, 110, 110, 170], ['load', 'mass (kg)', 'arm (mm)', 'moment (kg mm)'], [('A', '300', '+2 000', '600 000'), ('B', '700', '+2 600', '1 820 000'), ('C', '200', '+3 500', '700 000')], 'gold')
note(f, 620, 266, ['total 1 200 kg', '3 120 000 kg mm', 'CG = 2 600 mm'], lh=16, first='green')
FP.append(f)

f = Fig('fig_mb_2_10', 'Centre-of-Gravity Envelope', 760, 350, 'A graph of aircraft mass against centre of gravity position with the permitted envelope and a loaded point inside it',
    '<b>The CG envelope shows every permitted combination of mass and CG position.</b> The left edge is the <b>forward limit</b> and the right edge the <b>aft limit</b>; the top is the <b>maximum take-off mass</b>, with the maximum landing and maximum zero-fuel masses below it. The forward limit often moves aft at high mass, because a heavy, nose-heavy aircraft needs more elevator than is available at low speed. Plot the <b>take-off</b>, <b>landing</b> and <b>zero-fuel</b> points: all three must lie inside, because the CG moves as fuel burns. A CG too far <b>forward</b> means heavy controls, higher stall speed and more drag; too far <b>aft</b> means reduced stability and difficult stall recovery.')
f.L(110, 40, 110, 290, 'ink', 1.6); f.L(110, 290, 520, 290, 'ink', 1.6)
poly(f, [(190, 270), (190, 150), (250, 70), (430, 70), (430, 270)], fill='green', c='green', sw=2, op=0.18)
f.P('M190,270 L190,150 L250,70 L430,70 L430,270 Z', 'green', 2.2)
for y, lab in ((70, 'MTOM'), (130, 'MLM'), (190, 'MZFM')):
    f.L(104, y, 110, y, 'ink', 1.2); f.T(100, y + 4, lab, 9.5, 'ink', 'end', bold=True); f.L(110, y, 430, y, 'line', 0.8, dash='3 4')
f.T(180, 220, 'forward', 9.5, 'cool', 'end'); f.T(180, 233, 'limit', 9.5, 'cool', 'end'); f.T(440, 220, 'aft', 9.5, 'cool'); f.T(440, 233, 'limit', 9.5, 'cool')
pts = ((330, 96, 'take-off', 'gold'), (316, 150, 'landing', 'gold'), (300, 210, 'zero fuel', 'gold'))
f.L(330, 96, 316, 150, 'gold', 1.4, dash='4 3'); f.L(316, 150, 300, 210, 'gold', 1.4, dash='4 3')
for x, y, lab, c_ in pts: f.Ci(x, y, 5, c_, 1, c_); f.T(x + 12, y + 4, lab, 10, c_, bold=True)
f.T(315, 316, 'CG position (aft of datum, or % MAC) →', 9.5, 'dim', 'middle'); f.T(40, 170, 'mass', 9.5, 'dim', 'middle', rot=-90)
note(f, 550, 70, ['Inside the envelope:', 'safe to fly.'], first='green')
note(f, 550, 120, ['CG too far FORWARD:', 'heavy controls, higher', 'stall speed, more drag,', 'may not flare.'], first='cool')
note(f, 550, 204, ['CG too far AFT:', 'less stable, light controls,', 'poor stall and spin recovery.'], first='hot')
FP.append(f)

def lever(fid, title, cap, mode):
    f = Fig(fid, title, 760, 320, 'A beam diagram of an aircraft with a load ' + ('moved from one station to another' if mode == 'move' else 'added at a station') + ' and the resulting shift of the centre of gravity', cap)
    f.R(80, 140, 600, 14, c='ink', sw=1.4, fill='steel', rx=4); f.L(80, 100, 80, 200, 'hot', 1.6, dash='7 4'); f.T(80, 92, 'datum', 9.5, 'hot', 'middle')
    f.P('M360,154 L348,176 L372,176 Z', 'dim', 1, 'dim'); f.T(360, 192, 'old CG', 9.5, 'dim', 'middle')
    f.P('M410,154 L398,176 L422,176 Z', 'green', 1, 'green'); f.T(414, 192, 'new CG', 9.5, 'green', 'middle', bold=True)
    f.L(360, 208, 410, 208, 'green', 1.6, me='green'); f.T(385, 224, 'change of CG', 9.5, 'green', 'middle')
    if mode == 'move':
        f.R(180, 116, 30, 24, c='dim', sw=1.2, fill='none', rx=2, dash='4 3'); f.R(560, 116, 30, 24, c='gold', sw=1.4, fill='gold', rx=2)
        f.P('M195,112 Q385,40 575,112', 'gold', 1.8, me='gold'); f.T(385, 66, 'mass m moved a distance d', 10.5, 'gold', 'middle', bold=True)
        f.L(195, 250, 575, 250, 'gold', 1.4, me='gold', ms='gold'); f.T(385, 266, 'd', 11, 'gold', 'middle', bold=True)
        f.T(240, 300, 'm / M = change of CG / d', 11.5, 'ink', 'middle', bold=True); f.T(540, 300, 'change of CG = m × d / M', 11.5, 'gold', 'middle', bold=True)
    else:
        f.R(560, 116, 30, 24, c='gold', sw=1.4, fill='gold', rx=2); f.L(575, 60, 575, 110, 'gold', 2, me='gold'); f.T(575, 52, 'mass m added', 10.5, 'gold', 'middle', bold=True)
        f.L(360, 250, 575, 250, 'gold', 1.4, me='gold', ms='gold'); f.T(468, 266, 'd: from the OLD CG to the load', 10, 'gold', 'middle', bold=True)
        f.T(385, 300, 'm / new total mass = change of CG / d', 11.5, 'ink', 'middle', bold=True)
    return f
FP.append(lever('fig_mb_2_12', 'Repositioning Mass — CG Shift',
    '<b>Moving a load inside the aircraft</b> does not change the total mass, only the total moment. The CG moves <b>in the same direction as the load</b>, by an amount given by a simple ratio: <b>mass moved ÷ total mass = change of CG ÷ distance moved</b>. So change of CG = m × d ÷ M. Example: moving 100 kg aft by 4 m in a 5 000 kg aircraft shifts the CG 100 × 4 ÷ 5 000 = 0.08 m aft. The same ratio, rearranged, tells you how much mass to move to bring an out-of-limits CG back inside.', 'move'))
FP.append(lever('fig_mb_2_15', 'Adding or Removing Mass — CG Shift',
    '<b>Adding or removing a load changes both the total mass and the total moment.</b> The ratio becomes: <b>mass added (or removed) ÷ new total mass = change of CG ÷ distance from the old CG to the load</b>. Adding mass moves the CG <b>towards</b> the load; removing mass moves it <b>away</b>. Example: adding 200 kg at a point 3 m aft of the CG of a 4 800 kg aircraft gives a new mass of 5 000 kg and moves the CG 200 × 3 ÷ 5 000 = 0.12 m aft. Always use the <b>new</b> total mass and measure the distance from the <b>old</b> CG.', 'add'))

f = Fig('fig_mb_2_19', 'Stabiliser Trim Setting vs CG Position (% MAC)', 760, 340, 'A wing chord with the centre of gravity expressed as a percentage of mean aerodynamic chord, and a graph of take-off trim setting against that percentage',
    '<b>Large aircraft express the CG as a percentage of the mean aerodynamic chord</b>: <b>% MAC = (CG − leading edge of MAC) ÷ MAC length × 100</b>. The take-off <b>stabiliser trim setting</b> is then read from a graph or table against % MAC. A <b>forward CG</b> (low % MAC) makes the aircraft nose-heavy, so it needs <b>more nose-up trim</b>; an <b>aft CG</b> needs less. Setting the trim for the actual CG gives the correct stick force at rotation — a wrong setting can make the aircraft rotate too early or refuse to rotate. Example: CG 12.0 m, LEMAC 11.0 m, MAC 4.0 m gives 25% MAC.')
f.P('M50,110 C70,80 200,76 330,104 L330,112 C200,122 90,126 50,110 Z', 'ink', 1.6, 'g3')
f.L(50, 150, 330, 150, 'gold', 1.6, me='gold', ms='gold'); f.T(190, 168, 'MAC length', 10, 'gold', 'middle', bold=True)
f.L(50, 60, 50, 156, 'ink', 1, dash='3 4'); f.T(50, 52, 'LEMAC (0%)', 9.5, 'ink', 'middle'); f.L(330, 60, 330, 156, 'ink', 1, dash='3 4'); f.T(318, 52, '100%', 9.5, 'ink', 'middle')
f.P('M120,104 L112,86 L128,86 Z', 'green', 1, 'green'); f.T(120, 80, 'CG at 25% MAC', 10, 'green', 'middle', bold=True)
f.T(190, 208, '% MAC = (CG − LEMAC) / MAC × 100', 11, 'ink', 'middle', bold=True); f.T(190, 228, '(12.0 − 11.0) / 4.0 × 100 = 25%', 10.5, 'dim', 'middle')
f.L(450, 60, 450, 260, 'ink', 1.6); f.L(450, 260, 720, 260, 'ink', 1.6)
f.L(470, 90, 700, 230, 'cool', 2.8)
for i, v in enumerate(('10', '15', '20', '25', '30', '35')): x = 470 + i * 46; f.L(x, 260, x, 265, 'ink', 1); f.T(x, 278, v, 9.5, 'dim', 'middle')
for i, v in enumerate(('2', '3', '4', '5', '6')): y = 244 - i * 40; f.L(444, y, 450, y, 'ink', 1); f.T(440, y + 4, v, 9.5, 'dim', 'end')
f.L(608, 260, 608, 174, 'green', 1.2, dash='4 3'); f.L(608, 174, 450, 174, 'green', 1.2, dash='4 3'); f.Ci(608, 174, 4.5, 'green', 1, 'green')
f.T(585, 298, 'CG position (% MAC)', 9.5, 'dim', 'middle'); f.T(414, 150, 'trim units (nose-up)', 9.5, 'dim', 'middle', rot=-90)
f.T(480, 76, 'forward CG: more nose-up trim', 9.5, 'cool', bold=True); f.T(716, 170, 'aft CG: less trim', 9.5, 'cool', 'end', bold=True)
f.T(380, 326, 'Illustrative values. Use the trim table or graph in the aircraft’s loading manual.', 9.5, 'faint', 'middle')
FP.append(f)

FP.append(declared('fig_pf_2_4', 'Declared Distances for Performance',
    '<b>Performance calculations start from the declared distances.</b> The take-off <b>run</b> required must fit within <b>TORA</b>; the take-off <b>distance</b> required (to 35 ft, or 50 ft for small aeroplanes) within <b>TODA</b>, which includes the <b>clearway</b>; and the accelerate-stop distance required within <b>ASDA</b>, which includes the <b>stopway</b>. The landing distance required must fit within <b>LDA</b>. A clearway may not be longer than half the TORA. If no stopway or clearway is declared, TORA, TODA and ASDA are all equal to the runway length.',
    'TODA = TORA + clearway.   ASDA = TORA + stopway.   A clearway may not exceed half the TORA.'))

f = Fig('fig_pf_2_11', 'Forces During the Take-Off Run', 760, 330, 'An aircraft on the runway with thrust, aerodynamic drag, wheel friction, lift, weight and the runway reaction drawn as arrows',
    '<b>Acceleration depends on the excess of thrust over retarding forces.</b> <b>Thrust</b> acts forward. Against it act <b>aerodynamic drag</b>, which grows with the square of speed, and <b>wheel (rolling) friction</b>, which equals the friction coefficient times the load on the wheels — weight minus lift — and so <b>falls as lift builds</b>. Net accelerating force = thrust − drag − friction; acceleration = that force ÷ mass. A heavier aircraft accelerates more slowly <b>and</b> needs a higher lift-off speed, so take-off distance rises roughly with the square of mass. An upslope adds a weight component rearwards; soft or contaminated surfaces raise the friction.')
f.L(30, 250, 730, 250, 'ink', 1.6); f.R(30, 250, 700, 8, c='line', sw=1, fill='steel', rx=0)
f.raw(aircraft(380, 216, 0, 1.0, flip=True, gear=True))
f.L(300, 206, 150, 206, 'green', 3.2, me='green'); f.T(150, 196, 'THRUST', 11, 'green', bold=True)
f.L(470, 196, 600, 196, 'hot', 3.2, me='hot'); f.T(600, 186, 'DRAG', 11, 'hot', 'end', bold=True)
f.L(374, 246, 470, 246, 'warm', 2.6, me='warm'); f.T(478, 240, 'wheel friction = μ × (W − L)', 10.5, 'warm', bold=True)
f.L(380, 190, 380, 90, 'cool', 3.2, me='cool'); f.T(390, 100, 'LIFT (grows with speed²)', 11, 'cool', bold=True)
f.L(360, 222, 360, 310, 'ink', 3.2, me='ink'); f.T(350, 306, 'WEIGHT', 11, 'ink', 'end', bold=True)
f.L(400, 300, 400, 262, 'gold', 2.6, me='gold'); f.T(410, 296, 'runway reaction = W − L', 10.5, 'gold', bold=True)
f.T(60, 60, 'direction of take-off', 9.5, 'dim'); f.L(60, 70, 130, 70, 'dim', 1.6, ms='dim')
f.T(380, 36, 'acceleration = (thrust − drag − wheel friction) / mass', 11.5, 'ink', 'middle', bold=True)
FP.append(f)

f = Fig('fig_pf_6_7', 'Runway Contamination & Stopping Distance', 760, 330, 'Bar chart comparing stopping distance on dry, wet and contaminated runways, with the hydroplaning speed formula',
    '<b>Stopping distance depends on tyre-to-runway friction.</b> A <b>wet</b> runway (surface soaked, no significant standing water) gives less braking than a dry one, so the regulations add a margin: the landing distance required on a wet runway is <b>1.15 ×</b> the dry figure. A <b>contaminated</b> runway — standing water, slush, snow or ice over more than 25% of the area in use — reduces braking far more and adds drag to the take-off roll. <b>Dynamic hydroplaning</b> starts when the tyre rides up on a film of water: about <b>9 × √(tyre pressure in psi)</b> knots for a rotating tyre and 7.7 × √P for a non-rotating one. Use reported braking action (good, medium, poor) to pick the correct data.')
f.L(190, 50, 190, 250, 'ink', 1.4)
for i, (lab, w, c_, t) in enumerate((('DRY', 200, 'green', 'reference'), ('WET', 240, 'cool', 'required distance × 1.15'), ('STANDING WATER / SLUSH', 290, 'gold', 'braking poor; risk of hydroplaning'), ('COMPACTED SNOW', 340, 'warm', 'braking medium to poor'), ('ICE', 400, 'hot', 'braking poor to nil'))):
    y = 66 + i * 38
    f.R(190, y, w, 20, c=c_, sw=1, fill=c_, rx=3, op=0.85); f.T(182, y + 14, lab, 9.5, 'ink', 'end', bold=True); f.T(198 + w, y + 14, t, 9.5)
f.T(430, 40, 'relative stopping distance (illustrative, not to scale)', 9.5, 'faint', 'middle')
f.R(60, 266, 640, 50, c='gold', sw=1.4, fill='g2')
f.T(380, 286, 'Dynamic hydroplaning speed ≈ 9 × √P kt (rotating tyre),  7.7 × √P kt (non-rotating)', 10.5, 'gold', 'middle', bold=True)
f.T(380, 304, 'P = tyre pressure in psi.  Example: 100 psi gives 90 kt.', 10, 'dim', 'middle')
FP.append(f)

f = Fig('fig_pf_4_14', 'Wind Effect on Descent Angle & Range', 760, 330, 'Three glide paths from the same height in a headwind, still air and a tailwind, reaching the ground at different distances',
    '<b>Wind changes the path over the ground, not the path through the air.</b> At a given airspeed the aircraft descends through the air mass at the same angle and the same <b>rate of descent</b> whatever the wind, so the <b>time to descend is unchanged</b>. But the air mass itself is moving: a <b>headwind</b> reduces ground speed, making the descent <b>steeper over the ground</b> and the <b>range shorter</b>; a <b>tailwind</b> makes it shallower and the range longer. For maximum glide range, fly a little faster than best-glide speed into a headwind and a little slower with a tailwind.')
f.L(40, 270, 730, 270, 'ink', 1.6); f.raw(aircraft(84, 76, 8, 0.34, flip=True))
for x, lab, c_, d in ((360, 'headwind', 'hot', 'steeper, shorter range'), (520, 'still air', 'ink', 'reference'), (680, 'tailwind', 'green', 'shallower, longer range')):
    f.L(110, 84, x, 270, c_, 2.4); f.L(x, 264, x, 290, c_, 1.4); f.T(x, 304, lab, 10.5, c_, 'middle', bold=True); f.T(x, 318, d, 9, 'dim', 'middle')
f.L(110, 84, 110, 270, 'cool', 1.2, dash='4 4'); f.T(102, 180, 'same height', 9.5, 'cool', 'end')
f.L(300, 60, 220, 60, 'hot', 2.2, me='hot'); f.T(310, 64, 'headwind', 9.5, 'hot'); f.L(520, 60, 600, 60, 'green', 2.2, me='green'); f.T(512, 64, 'tailwind', 9.5, 'green', 'end')
note(f, 440, 110, ['Unchanged by wind:', 'rate of descent, time to', 'descend, angle through the air.'], first='ink')
note(f, 440, 176, ['Changed by wind:', 'ground speed, descent angle', 'over the ground, range.'], first='ink')
FP.append(f)

f = Fig('fig_pf_5_5', 'Thrust Required & Thrust Available — Minimum & Maximum Speed', 760, 350, 'A drag curve against true airspeed with a thrust available line cutting it at the minimum and maximum level flight speeds',
    '<b>Level flight is possible only where thrust available equals or exceeds drag.</b> The <b>drag (thrust required) curve</b> is the sum of induced drag, which falls with speed, and parasite drag, which rises with speed squared; it is lowest at <b>VMD</b>, the minimum-drag speed. The <b>thrust available</b> from a jet is roughly constant with speed. Where the two lines cross are the <b>minimum</b> and <b>maximum</b> level-flight speeds at that weight and altitude (the low-speed limit is often set by the stall first). The gap between the lines is <b>excess thrust</b>, which is available for climb or acceleration; it is greatest near VMD, which is why a jet’s best angle of climb is close to VMD.')
px = lambda v: 100 + (v - 80) * 1.5
py = lambda d: 290 - d * 22
drag = lambda v: 2.4 * (200.0 / v) ** 2 + 2.4 * (v / 200.0) ** 2
f.L(100, 50, 100, 290, 'ink', 1.6); f.L(100, 290, 720, 290, 'ink', 1.6, me='ink')
pl(f, ' '.join(f'{px(v):.1f},{py(drag(v)):.1f}' for v in range(110, 421, 4)), 'hot', 2.8)
ta = 8.0; f.L(px(100), py(ta), px(440), py(ta), 'green', 2.6)
import math as _m
k = ta / 2.4; r1 = (k - _m.sqrt(k * k - 4)) / 2; r2 = (k + _m.sqrt(k * k - 4)) / 2; v1, v2 = 200 * _m.sqrt(r1), 200 * _m.sqrt(r2)
for v, lab in ((v1, 'minimum speed'), (v2, 'maximum speed')):
    f.Ci(px(v), py(ta), 5, 'ink', 1, 'ink'); f.L(px(v), py(ta), px(v), 290, 'ink', 1, dash='4 4'); f.T(px(v), 308, lab, 10, 'ink', 'middle', bold=True)
f.Ci(px(200), py(4.8), 5, 'gold', 1, 'gold'); f.L(px(200), py(4.8), px(200), 290, 'gold', 1, dash='4 4'); f.T(px(200), 324, 'VMD (minimum drag)', 10, 'gold', 'middle', bold=True)
f.L(px(200), py(4.8) - 6, px(200), py(ta) + 6, 'cool', 1.8, me='cool', ms='cool'); f.T(px(200) + 10, py(6.4) + 4, 'excess thrust', 10, 'cool', bold=True)
f.T(px(430), py(ta) - 8, 'thrust available (jet)', 10, 'green', 'end', bold=True); f.T(px(336), py(drag(300)) + 30, 'drag = thrust required', 10, 'hot', 'end', bold=True)
f.T(716, 280, 'TAS', 9.5, 'dim', 'end'); f.T(60, 170, 'thrust / drag', 9.5, 'dim', 'middle', rot=-90)
FP.append(f)

f = Fig('fig_pf_5_10', 'CAS, TAS & Mach Number with Altitude', 760, 350, 'Two altitude against speed charts: a climb at constant calibrated airspeed and a climb at constant Mach number',
    '<b>The three speeds drift apart as altitude changes.</b> Climbing at <b>constant CAS</b>, falling air density makes <b>TAS increase</b>, and because the speed of sound falls with temperature, <b>Mach number increases</b> even faster. Above the <b>crossover altitude</b> the climb continues at <b>constant Mach</b>: now <b>TAS decreases</b> (the speed of sound is falling) and <b>CAS decreases</b> faster still. Above the tropopause temperature is constant, so at constant Mach the TAS stays constant. Memory aid for the order of the lines left to right: <b>E-C-T-M</b> (EAS, CAS, TAS, Mach) — whichever is held constant is vertical, those to its right increase in the climb and those to its left decrease.')
def panel(x0, ttl, lines, sub):
    f.T(x0 + 150, 34, ttl, 11, 'ink', 'middle', bold=True)
    f.L(x0, 60, x0, 270, 'ink', 1.6); f.L(x0, 270, x0 + 300, 270, 'ink', 1.6, me='ink')
    f.T(x0 - 26, 165, 'altitude', 9.5, 'dim', 'middle', rot=-90); f.T(x0 + 290, 290, 'speed', 9.5, 'dim', 'end')
    for lab, xb, xt, c_, lx in lines:
        f.L(x0 + xb, 270, x0 + xt, 80, c_, 2.6); f.T(x0 + xt + lx, 74, lab, 10.5, c_, 'middle', bold=True)
    f.T(x0 + 150, 312, sub, 10, 'dim', 'middle')
panel(60, 'climb at CONSTANT CAS', (('CAS', 110, 110, 'cool', 0), ('TAS', 110, 190, 'gold', 0), ('Mach', 110, 260, 'hot', 0)), 'TAS increases; Mach increases more')
panel(430, 'climb at CONSTANT MACH', (('CAS', 190, 50, 'cool', 0), ('TAS', 190, 120, 'gold', 0), ('Mach', 190, 190, 'hot', 0)), 'TAS decreases; CAS decreases more')
f.T(380, 336, 'E-C-T-M: the speed held constant is vertical; lines to its right increase in the climb, lines to its left decrease.', 10, 'ink', 'middle', bold=True)
FP.append(f)

f = Fig('fig_pf_14_1', 'Balanced Field Length — The Ideal V1', 760, 350, 'A graph of distance against V1 with the accelerate-stop distance rising and the continued take-off distance falling, crossing at the balanced field V1',
    '<b>V1 is the decision speed.</b> If an engine fails below V1 the take-off is rejected; at or above V1 it is continued. Choosing a <b>higher V1</b> means the aircraft is going faster when the stop begins, so the <b>accelerate-stop distance increases</b>; but it has less far to accelerate on the remaining engines, so the <b>continued take-off distance (engine out) decreases</b>. The V1 at which the two distances are <b>equal</b> gives the <b>balanced field length</b> — the shortest runway from which the take-off can be made at that mass. V1 may never be less than VMCG nor greater than VR or VMBE (maximum brake energy speed).')
f.L(110, 50, 110, 280, 'ink', 1.6); f.L(110, 280, 560, 280, 'ink', 1.6, me='ink')
f.P('M130,240 Q330,200 540,80', 'hot', 2.8); f.P('M130,84 Q330,150 540,236', 'cool', 2.8)
f.Ci(337, 172, 6, 'gold', 1, 'gold'); f.L(337, 172, 337, 280, 'gold', 1.2, dash='4 4'); f.L(337, 172, 110, 172, 'gold', 1.2, dash='4 4')
f.T(337, 298, 'balanced V1', 10.5, 'gold', 'middle', bold=True); f.T(102, 160, 'balanced', 9.5, 'gold', 'end', bold=True); f.T(102, 174, 'field', 9.5, 'gold', 'end', bold=True); f.T(102, 188, 'length', 9.5, 'gold', 'end', bold=True)
f.T(548, 70, 'accelerate-stop', 10, 'hot', 'end', bold=True); f.T(548, 252, 'continued take-off', 10, 'cool', 'end', bold=True); f.T(548, 266, '(one engine inoperative)', 9.5, 'cool', 'end')
f.T(335, 322, 'V1 chosen →', 9.5, 'dim', 'middle'); f.T(40, 100, 'distance', 9.5, 'dim', 'middle', rot=-90)
note(f, 580, 80, ['Low V1:', 'short stop, long', 'continued take-off.'], first='cool')
note(f, 580, 150, ['High V1:', 'long stop, short', 'continued take-off.'], first='hot')
note(f, 580, 220, ['VMCG ≤ V1 ≤ VR', 'and V1 ≤ VMBE'], first='gold')
FP.append(f)

# ════════════════ output ════════════════
def gallery(figs, title, h1, lede, out):
    head = open('instruments-gallery.html').read()
    head = head[:head.index('<header>')].replace('<title>Instruments Gallery</title>', f'<title>{title}</title>')
    n = len(figs)
    open(out, 'w').write(head + f'<header>\n    <h1>{h1}</h1>\n    <p class="lede">{lede}</p>\n    <div class="prog"><span class="pct">{n} / {n} drawn</span><div class="bar"><i></i></div><span class="pct">complete</span></div>\n  </header>\n'
                         + ''.join(g.html(i + 1) for i, g in enumerate(figs)) + f'\n  <footer>\n    {h1}: {n} original figures.\n  </footer>\n</div>\n</body></html>')
gallery(AL, 'Air Law Gallery', 'Air Law — Illustrations', 'Original figures for Air Law: cruising levels, altimeter setting procedures, declared distances and visual aids.', 'airlaw-gallery.html')
gallery(RN, 'Radio Navigation Gallery', 'Radio Navigation — Illustrations', 'Original figures for Radio Navigation: radio theory, bearings, VOR, ILS and radar.', 'radionav-gallery.html')
gallery(FP, 'Flight Planning Gallery B', 'Flight Planning & Performance — Illustrations (part 2)', 'Original figures for air and ground distance, the PSR, mass and balance, and performance.', 'fpp-b-gallery.html')
print(f'AL {len(AL)}  RN {len(RN)}  FP {len(FP)}  QA warnings: {len(WARN)}')
for w in WARN: print('  ⚠', w)
