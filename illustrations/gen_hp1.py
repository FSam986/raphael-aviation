#!/usr/bin/env python3
"""Human Performance part 1 (A.6.1): circulation, respiration, vision, hearing & balance — 20 figures."""
import math
from figlib import *
from gen_common import note, gallery, pl, persp_rwy

HP = []
RED, BLU = '#c8503c', '#4b8fb0'
def lead(f, x1, y1, x2, y2, txt, anchor='start', c='ink', size=10):
    f.L(x1, y1, x2, y2, 'dim', 1); f.T(x1 + (4 if anchor == 'start' else -4), y1 + 3.5, txt, size, c, anchor)

# 05 heart
f = Fig('hp-05', 'The Heart', 760, 360, 'A schematic heart with four chambers, the great vessels and the direction of blood flow',
    '<b>The heart is two pumps side by side.</b> The <b>right side</b> receives oxygen-poor blood from the body through the venae cavae into the <b>right atrium</b>, passes it to the <b>right ventricle</b> and pumps it through the <b>pulmonary artery</b> to the lungs. Oxygen-rich blood returns through the <b>pulmonary veins</b> to the <b>left atrium</b>, passes to the <b>left ventricle</b> — the thickest, strongest chamber — and is pumped through the <b>aorta</b> to the whole body. Valves keep the flow one-way. At rest the heart beats about 70 times a minute and pumps about 5 litres a minute. (The diagram is drawn as if facing the person, so the right side of the heart is on the left of the picture.)')
f.P('M250,120 C190,90 140,140 150,200 C160,270 230,310 300,340 C370,310 440,270 450,200 C460,140 410,90 350,120 C330,100 270,100 250,120 Z', 'ink', 2, 'g3')
f.L(300, 122, 300, 330, 'ink', 2.4)
f.P('M168,196 L296,196', 'ink', 1.6, dash='6 4'); f.P('M304,196 L432,196', 'ink', 1.6, dash='6 4')
f.P('M176,150 Q230,120 294,134 L294,192 L170,192 Z', 'none', 0, BLU, op=0.55); f.P('M172,202 L294,202 L294,322 Q200,280 172,202 Z', 'none', 0, BLU, op=0.8)
f.P('M424,150 Q370,120 306,134 L306,192 L430,192 Z', 'none', 0, RED, op=0.55); f.P('M428,202 L306,202 L306,322 Q400,280 428,202 Z', 'none', 0, RED, op=0.85)
f.T(232, 170, 'RIGHT', 10, 'white', 'middle', bold=True, check=False); f.T(232, 184, 'ATRIUM', 10, 'white', 'middle', bold=True, check=False)
f.T(236, 244, 'RIGHT', 10, 'white', 'middle', bold=True, check=False); f.T(236, 258, 'VENTRICLE', 10, 'white', 'middle', bold=True, check=False)
f.T(368, 170, 'LEFT', 10, 'white', 'middle', bold=True, check=False); f.T(368, 184, 'ATRIUM', 10, 'white', 'middle', bold=True, check=False)
f.T(364, 244, 'LEFT', 10, 'white', 'middle', bold=True, check=False); f.T(364, 258, 'VENTRICLE', 10, 'white', 'middle', bold=True, check=False)
f.L(120, 60, 200, 140, BLU, 5, me='cool'); f.T(40, 50, 'from the body', 10, 'cool', bold=True); f.T(40, 64, '(venae cavae)', 9.5, 'cool')
f.L(262, 126, 262, 40, BLU, 5, me='cool'); f.T(250, 30, 'to the lungs', 10, 'cool', 'end', bold=True); f.T(250, 44, '(pulmonary artery)', 9.5, 'cool', 'end')
f.L(480, 60, 400, 140, RED, 5, me='hot'); f.T(486, 50, 'from the lungs', 10, 'hot', bold=True); f.T(486, 64, '(pulmonary veins)', 9.5, 'hot')
f.L(338, 126, 338, 40, RED, 5, me='hot'); f.T(350, 30, 'to the body', 10, 'hot', bold=True); f.T(350, 44, '(aorta)', 9.5, 'hot')
f.L(236, 198, 236, 220, 'white', 1.6, me='ink'); f.L(364, 198, 364, 220, 'white', 1.6, me='ink')
note(f, 520, 130, ['Right side: low pressure,', 'pumps to the lungs only.'], first='cool')
note(f, 520, 190, ['Left side: high pressure,', 'pumps to the whole body.'], first='hot')
note(f, 520, 250, ['Rest: about 70 beats/min,', 'about 5 litres per minute.'], first='ink')
f.R(520, 300, 12, 12, c='none', sw=0, fill=BLU, rx=2); f.T(540, 310, 'oxygen-poor blood', 9.5); f.R(520, 322, 12, 12, c='none', sw=0, fill=RED, rx=2); f.T(540, 332, 'oxygen-rich blood', 9.5)
HP.append(f)

# 06 circulation
f = Fig('hp-06', 'Pulmonary & Systemic Circulation', 760, 360, 'A figure-of-eight circuit from the heart to the lungs and from the heart to the body',
    '<b>Blood travels two circuits in series.</b> In the <b>pulmonary circulation</b> the right ventricle sends oxygen-poor blood through the pulmonary artery to the <b>lungs</b>, where it gives up carbon dioxide and takes on oxygen, returning through the pulmonary veins to the left atrium. In the <b>systemic circulation</b> the left ventricle sends that oxygen-rich blood through the aorta and arteries to the <b>body tissues</b>, where oxygen is delivered in the capillaries; veins return the oxygen-poor blood to the right atrium. Note the exception to the usual colours: the pulmonary <b>artery</b> carries oxygen-poor blood and the pulmonary <b>veins</b> oxygen-rich.')
f.box(300, 150, 160, 60, ['HEART', 'right side | left side'], c='ink', size=12)
f.El(380, 70, 90, 34, 'cool', 2, 'g3'); f.T(380, 66, 'LUNGS', 12, 'ink', 'middle', bold=True); f.T(380, 82, 'CO2 out, O2 in', 9.5, 'dim', 'middle')
f.El(380, 300, 120, 36, 'gold', 2, 'g3'); f.T(380, 296, 'BODY TISSUES', 12, 'ink', 'middle', bold=True); f.T(380, 312, 'O2 delivered, CO2 collected', 9.5, 'dim', 'middle')
f.P('M330,150 C300,130 290,110 300,88', BLU, 5, me='cool'); f.P('M462,88 C472,110 462,130 432,150', RED, 5, me='hot')
f.P('M432,210 C470,236 480,256 478,280', RED, 5, me='hot'); f.P('M282,280 C280,256 290,236 328,210', BLU, 5, me='cool')
f.T(280, 120, 'pulmonary artery', 9.5, 'cool', 'end'); f.T(480, 120, 'pulmonary veins', 9.5, 'hot')
f.T(492, 246, 'aorta and arteries', 9.5, 'hot'); f.T(270, 246, 'veins (venae cavae)', 9.5, 'cool', 'end')
note(f, 40, 40, ['PULMONARY circulation', 'heart to lungs and back:', 'gas exchange'], first='cool')
note(f, 580, 300, ['SYSTEMIC circulation', 'heart to body and back:', 'delivers oxygen'], first='gold')
f.R(40, 320, 12, 12, c='none', sw=0, fill=BLU, rx=2); f.T(60, 330, 'oxygen-poor', 9.5); f.R(140, 320, 12, 12, c='none', sw=0, fill=RED, rx=2); f.T(160, 330, 'oxygen-rich', 9.5)
HP.append(f)

# 07 blood pressure
f = Fig('hp-07', 'Blood Pressure — Systolic & Diastolic', 760, 330, 'A trace of arterial pressure rising to the systolic value at each heartbeat and falling to the diastolic value between beats',
    '<b>Blood pressure is quoted as two numbers.</b> <b>Systolic</b> pressure is the peak, when the ventricles contract and push blood into the arteries; <b>diastolic</b> pressure is the lowest value, while the heart relaxes and refills between beats. A typical healthy adult reading is about <b>120/80 mmHg</b>. Persistently raised pressure — <b>hypertension</b>, generally taken as 140/90 or more — increases the risk of stroke and heart attack and can cost a pilot the medical; low pressure (<b>hypotension</b>) reduces tolerance to G and can cause fainting. Pressure rises with age, obesity, stress, smoking and lack of exercise.')
py = lambda p: 270 - (p - 40) * 2
f.L(90, 50, 90, 270, 'ink', 1.6); f.L(90, 270, 700, 270, 'ink', 1.6, me='ink')
for p in (40, 80, 120, 160): f.L(84, py(p), 90, py(p), 'ink', 1); f.T(80, py(p) + 4, str(p), 9.5, 'dim', 'end')
pts = []
for i in range(0, 561, 4):
    t = (i % 112) / 112.0
    v = 80 + 40 * (math.sin(math.pi * t / 0.3) if t < 0.3 else 0.35 * math.exp(-(t - 0.3) * 6) * (1 + 0.5 * math.sin((t - 0.3) * 18)))
    pts.append(f'{100 + i},{py(v):.1f}')
pl(f, ' '.join(pts), 'hot', 2.6)
f.L(90, py(120), 690, py(120), 'gold', 1.2, dash='6 4'); f.T(696, py(120) - 6, 'systolic 120', 10, 'gold', 'end', bold=True)
f.L(90, py(80), 690, py(80), 'cool', 1.2, dash='6 4'); f.T(696, py(80) + 16, 'diastolic 80', 10, 'cool', 'end', bold=True)
f.T(40, 160, 'pressure (mmHg)', 9.5, 'dim', 'middle', rot=-90); f.T(690, 290, 'time', 9.5, 'dim', 'end')
f.L(117, 290, 229, 290, 'dim', 1.2, me='dim', ms='dim'); f.T(173, 308, 'one heartbeat', 9.5, 'dim', 'middle')
f.T(380, 36, 'systolic: ventricles contracting  |  diastolic: heart relaxed, refilling', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 08 smell
f = Fig('hp-08', 'The Sense of Smell — Olfactory System', 760, 330, 'A side section of the nose showing air drawn up to the olfactory receptors under the olfactory bulb',
    '<b>Smell is a chemical sense.</b> Molecules carried in the inhaled air dissolve in the mucus high in the nasal cavity and stimulate <b>olfactory receptor cells</b>. Their nerve fibres pass up through the skull to the <b>olfactory bulb</b>, which sends the signal to the brain. The sense is very sensitive but <b>adapts quickly</b>: a continuous smell fades from awareness within minutes, so a pilot may stop noticing fumes, fuel or smoke — never dismiss a smell that was noticed earlier just because it seems to have gone. Smell is degraded by a cold, by hypoxia and by smoking.')
f.P('M150,300 L150,160 C150,110 190,70 250,66 L330,66 C300,100 286,130 280,160 C260,190 230,214 200,222 C214,236 220,246 214,256 L250,262 L250,300', 'ink', 2, 'g3')
f.P('M214,246 C260,236 330,230 400,220 C430,196 430,150 400,120', 'cool', 1.4, 'g2', op=0.9)
f.P('M222,244 C280,228 340,214 392,176', 'cool', 2.4, me='cool'); f.T(300, 264, 'inhaled air', 10, 'cool')
f.R(330, 104, 110, 10, c='ink', sw=1, fill='dim', rx=2); f.T(446, 113, 'bone (roof of the nasal cavity)', 9.5)
for x in range(340, 436, 12): f.L(x, 114, x, 132, 'gold', 1.6); f.Ci(x, 134, 2.4, 'gold', 0.6, 'gold'); f.L(x, 104, x, 92, 'gold', 1.2)
f.El(385, 82, 58, 12, 'gold', 1.8, 'g3'); f.T(385, 86, 'olfactory bulb', 9.5, 'ink', 'middle', bold=True)
f.L(443, 80, 520, 60, 'gold', 2.2, me='gold'); f.T(526, 58, 'to the brain', 10, 'gold', bold=True)
lead(f, 470, 150, 432, 136, 'olfactory receptor cells');
note(f, 500, 200, ['Very sensitive, but adapts fast:', 'a steady smell fades from', 'awareness in minutes.', '', 'Do not ignore a smell of fumes,', 'fuel or smoke because it', '“went away”.'], first='ink')
HP.append(f)

# 09 respiratory
f = Fig('hp-09', 'The Respiratory System — Lungs & Alveoli', 760, 360, 'The airway from the trachea to the lungs, with an enlarged alveolus exchanging oxygen and carbon dioxide with a capillary',
    '<b>External respiration brings oxygen to the blood.</b> Air passes down the <b>trachea</b>, through the <b>bronchi</b> and ever-smaller bronchioles to about 300 million tiny air sacs, the <b>alveoli</b>. Each is wrapped in capillaries with walls one cell thick: <b>oxygen diffuses into the blood</b> and <b>carbon dioxide diffuses out</b>, each moving from high partial pressure to low. Breathing is driven by the <b>diaphragm</b> and rib muscles and its rate is controlled mainly by the <b>carbon dioxide</b> level in the blood, not the oxygen level. At rest: 12–16 breaths a minute, about 500 ml each. As altitude increases the partial pressure of oxygen in the alveoli falls — the cause of <b>hypoxia</b>.')
f.R(184, 30, 22, 80, c='ink', sw=1.6, fill='g3', rx=6); f.P('M195,108 L150,150', 'ink', 8); f.P('M195,108 L240,150', 'ink', 8)
f.P('M150,110 C80,120 60,200 70,270 C110,290 160,280 176,250 L176,130 Z', 'ink', 2, '#5a3a3a'); f.P('M240,110 C310,120 330,200 320,270 C280,290 230,280 214,250 L214,130 Z', 'ink', 2, '#5a3a3a')
for (x1, y1, x2, y2) in ((150, 150, 120, 190), (150, 150, 150, 210), (120, 190, 100, 230), (240, 150, 270, 190), (240, 150, 240, 210), (270, 190, 290, 230)): f.L(x1, y1, x2, y2, 'ink', 2.4)
f.P('M60,290 Q195,250 330,290', 'gold', 3.4); f.T(195, 308, 'diaphragm', 10, 'gold', 'middle', bold=True)
f.T(214, 46, 'trachea', 10, 'ink'); lead(f, 60, 130, 132, 160, 'bronchi', 'end'); f.T(195, 330, 'lungs', 10, 'dim', 'middle')
f.Ci(292, 232, 9, 'gold', 1.6); f.L(300, 228, 452, 150, 'gold', 1, dash='4 3'); f.L(300, 238, 452, 270, 'gold', 1, dash='4 3')
f.Ci(530, 190, 74, 'ink', 2, 'g3'); f.T(530, 170, 'ALVEOLUS', 11, 'ink', 'middle', bold=True); f.T(530, 186, '(air sac)', 9.5, 'dim', 'middle')
f.P('M440,280 C480,300 580,300 620,280', RED, 14); f.P('M440,280 C470,296 500,298 530,298', BLU, 14)
f.T(530, 326, 'capillary: blood flows past', 9.5, 'dim', 'middle')
f.L(520, 220, 500, 284, 'hot', 2.6, me='hot'); f.T(498, 232, 'O2', 11, 'hot', 'end', bold=True)
f.L(560, 284, 546, 222, 'cool', 2.6, me='cool'); f.T(566, 240, 'CO2', 11, 'cool', bold=True)
f.T(530, 100, 'gas exchange by diffusion', 10.5, 'ink', 'middle', bold=True)
note(f, 630, 150, ['Rest: 12–16', 'breaths/min,', '500 ml each.', '', 'Rate is driven', 'by CO2 level.'], first='ink')
HP.append(f)

# 14 eye
f = Fig('hp-14', 'Structure of the Eye', 760, 350, 'A horizontal section through the eye with the cornea, iris, pupil, lens, retina, fovea, blind spot and optic nerve',
    '<b>The eye works like a camera.</b> Light is bent mainly by the <b>cornea</b> (about 70% of the focusing) and fine-focused by the <b>lens</b>, whose shape is changed by the ciliary muscles — <b>accommodation</b>. The <b>iris</b> adjusts the size of the <b>pupil</b> to control the light entering. The image falls on the <b>retina</b>, which has two kinds of receptor: <b>cones</b>, concentrated at the <b>fovea</b>, give sharp colour vision in good light; <b>rods</b>, in the surrounding retina, work in dim light but see no colour and little detail. Where the <b>optic nerve</b> leaves there are no receptors — the <b>blind spot</b>.')
cx, cy, R = 300, 175, 120
f.Ci(cx, cy, R, 'ink', 2.2, 'g3'); f.P(f'M{cx-104},{cy-60} Q{cx-150},{cy} {cx-104},{cy+60}', 'cool', 3)
a1, a2 = pol(cx, cy, R - 6, 40), pol(cx, cy, R - 6, 140)
f.P(f'M{a1[0]:.1f},{a1[1]:.1f} A{R-6},{R-6} 0 1 1 {pol(cx,cy,R-6,-40)[0]:.1f},{pol(cx,cy,R-6,-40)[1]:.1f}', 'gold', 4)
f.El(cx - 78, cy, 16, 38, 'ink', 1.6, '#9fc0cb')
f.L(cx - 100, cy - 58, cx - 86, cy - 22, 'warm', 5); f.L(cx - 100, cy + 58, cx - 86, cy + 22, 'warm', 5)
f.Ci(cx + R - 5, cy, 5, 'hot', 1, 'hot')
f.P(f'M{cx+110},{cy+44} L{cx+190},{cy+74} L{cx+186},{cy+92} L{cx+102},{cy+60} Z', 'ink', 1.6, 'gold')
for dy in (-26, 0, 26): f.L(cx - 200, cy + dy, cx - 132, cy + dy * 0.8, 'dim', 1.2, me='dim')
f.T(cx - 206, cy - 36, 'light', 10, 'dim', 'end')
lead(f, 96, 82, cx - 128, cy - 30, 'cornea', 'end'); lead(f, 96, 268, cx - 94, cy + 46, 'iris', 'end'); lead(f, 110, 308, cx - 92, cy + 4, 'pupil (the opening)', 'end')
lead(f, 250, 30, cx - 74, cy - 34, 'lens'); lead(f, 430, 60, cx + 70, cy - 92, 'retina (rods and cones)')
lead(f, 470, 176, cx + R, cy, 'fovea: cones only, sharpest vision'); lead(f, 500, 262, cx + 150, cy + 66, 'optic nerve')
lead(f, 470, 216, cx + 112, cy + 46, 'blind spot: no receptors')
f.T(cx, cy + 6, 'vitreous humour', 9.5, 'faint', 'middle')
note(f, 520, 300, ['Cones: colour and detail, need good light.', 'Rods: dim light, no colour, peripheral.'], first='ink')
HP.append(f)

# 15 acuity
f = Fig('hp-15', 'Visual Acuity Falls Away from the Fovea', 760, 340, 'A graph of visual acuity against angle from the fovea, falling steeply either side of the centre, with a gap at the blind spot',
    '<b>Sharp vision covers only a tiny area.</b> Acuity is highest at the <b>fovea</b>, where the cones are packed most densely, but it collapses as the image moves off-centre: about <b>half at 5°</b>, a quarter at 10° and a tenth at 20°. So only what the pilot looks at directly, within about 1° to 2°, is seen in full detail; an aircraft a few degrees to the side may not be noticed until it moves. The <b>blind spot</b> lies about 15° to the nasal side. At night the cones stop working and the best sensitivity is found <b>10° to 15° off-centre</b>, where the rods are most numerous — look slightly to the side of a dim object.')
px = lambda a: 380 + a * 5.2
py = lambda v: 270 - v * 200
f.L(70, 270, 700, 270, 'ink', 1.6); f.L(380, 50, 380, 270, 'faint', 1, dash='3 4')
left = [(a, 1 / (1 + abs(a) / 2.2)) for a in range(-60, 1)]; right = [(a, 1 / (1 + abs(a) / 2.2)) for a in range(0, 61)]
pl(f, ' '.join(f'{px(a):.1f},{py(v):.1f}' for a, v in left + right), 'cool', 2.8)
f.R(px(13), 60, px(18) - px(13), 210, c='none', sw=0, fill='hot', rx=0, op=0.3); f.T(px(15.5), 52, 'blind spot', 9.5, 'hot', 'middle', bold=True)
for a in (-60, -40, -20, 0, 20, 40, 60): f.L(px(a), 270, px(a), 275, 'ink', 1); f.T(px(a), 288, f'{abs(a)}°', 9.5, 'dim', 'middle')
for v, lab in ((1, '100%'), (0.5, '50%'), (0.1, '10%')): f.L(64, py(v), 70, py(v), 'ink', 1); f.T(60, py(v) + 4, lab, 9.5, 'dim', 'end'); f.L(70, py(v), 700, py(v), 'line', 0.7, dash='2 4')
f.T(388, 64, 'fovea', 10.5, 'gold', bold=True)
f.T(380, 310, 'angle from the fovea', 9.5, 'dim', 'middle'); f.T(24, 160, 'relative acuity', 9.5, 'dim', 'middle', rot=-90)
note(f, 90, 70, ['Full detail: only within', '1° to 2° of where you look.'], first='ink')
note(f, 520, 110, ['By night: look 10° to 15°', 'to one side of a dim object', '(the rods are off-centre).'], first='ink')
f.T(150, 330, 'temporal side', 9, 'faint', 'middle'); f.T(610, 330, 'nasal side', 9, 'faint', 'middle')
HP.append(f)

# 16 scan
f = Fig('hp-16', 'Lookout — The Sector Scan & Empty-Field Myopia', 760, 340, 'A windscreen divided into sectors with a fixation point in each and arrows showing the scan order',
    '<b>The eyes only see detail when they are still.</b> During the jump between fixations (a <b>saccade</b>) vision is effectively switched off, so sweeping the eyes smoothly across the sky sees very little. The effective lookout is the <b>sector scan</b>: divide the sky into blocks of about <b>10°</b>, fixate on each for <b>1 to 2 seconds</b>, then move on, covering the area ahead and to both sides methodically. With nothing to focus on — an empty sky, haze, darkness — the eyes relax to a focus of only <b>1 to 2 metres</b> (<b>empty-field myopia</b>), so distant aircraft go unseen: refocus regularly on a distant object such as a wingtip or cloud edge.')
f.P('M60,250 L100,80 Q380,40 660,80 L700,250 Z', 'ink', 2.2, 'g3')
xs = [130, 230, 330, 430, 530, 630]
for i, x in enumerate(xs):
    if i: f.L(x - 50, 78 - abs(i - 3) * 2, x - 50, 248, 'line', 1, dash='4 4')
    f.Ci(x, 150, 6, 'gold', 1.6); f.Ci(x, 150, 2, 'gold', 1, 'gold'); f.T(x, 132, str(i + 1), 10, 'gold', 'middle', bold=True)
    if i < 5: f.L(x + 12, 150, x + 88, 150, 'cool', 1.6, me='cool')
f.L(130, 266, 180, 266, 'ink', 1.2, me='ink', ms='ink'); f.T(190, 270, 'each block about 10° wide', 10)
f.T(380, 290, 'fixate 1 to 2 seconds on each point, then move to the next block', 10.5, 'ink', 'middle', bold=True)
f.T(380, 310, 'Vision is suppressed while the eyes are moving: a smooth sweep sees almost nothing.', 10, 'dim', 'middle')
f.T(380, 328, 'Empty sky: the eyes rest at a focus of 1 to 2 m. Refocus on a wingtip or distant cloud.', 10, 'dim', 'middle')
f.T(380, 28, 'view through the windscreen', 9.5, 'faint', 'middle')
HP.append(f)

# 17 long / short sight
f = Fig('hp-17', 'Long Sight & Short Sight', 760, 340, 'Three eyes in section: normal focus on the retina, long sight focusing behind it and short sight focusing in front of it, with correcting lenses',
    '<b>Focus errors come from the shape of the eye.</b> In a normal eye, light from a distant object is focused exactly on the retina. In <b>long sight (hypermetropia)</b> the eyeball is too short, so the focus would fall <b>behind</b> the retina: near objects are blurred, and it is corrected with a <b>convex</b> (converging) lens. In <b>short sight (myopia)</b> the eyeball is too long and the focus falls <b>in front</b> of the retina: distant objects are blurred, corrected with a <b>concave</b> (diverging) lens. <b>Presbyopia</b> is the loss of accommodation with age (from about 40–50) as the lens stiffens — near vision goes first. A pilot who needs correction must carry a spare pair of spectacles.')
def eye(cx, ttl, rx, fx, sub, lens, c_):
    cy = 150
    f.El(cx, cy, rx, 62, 'ink', 2, 'g3'); f.El(cx - rx + 14, cy, 8, 24, 'ink', 1.4, '#9fc0cb')
    for dy in (-30, 30):
        f.L(cx - rx - 70, cy + dy, cx - rx + 14, cy + dy * 0.75, c_, 1.6); f.L(cx - rx + 14, cy + dy * 0.75, fx, cy, c_, 1.6)
    f.Ci(fx, cy, 4, c_, 1, c_)
    f.T(cx, 50, ttl, 11, 'ink', 'middle', bold=True); f.T(cx, 66, sub, 9.5, 'dim', 'middle')
    if lens == 'convex': f.El(cx - rx - 36, cy, 7, 40, 'gold', 1.8, 'g2')
    if lens == 'concave': f.P(f'M{cx-rx-44},{cy-40} Q{cx-rx-34},{cy} {cx-rx-44},{cy+40} L{cx-rx-28},{cy+40} Q{cx-rx-38},{cy} {cx-rx-28},{cy-40} Z', 'gold', 1.8, 'g2')
eye(140, 'NORMAL', 62, 202, 'focus on the retina', None, 'green')
eye(380, 'LONG SIGHT (hypermetropia)', 50, 452, 'eyeball too short', None, 'hot')
eye(630, 'SHORT SIGHT (myopia)', 76, 668, 'eyeball too long', None, 'hot')
f.T(140, 236, 'sharp at all distances', 9.5, 'green', 'middle')
f.T(380, 236, 'focus falls BEHIND the retina', 9.5, 'hot', 'middle'); f.T(380, 250, 'near objects blurred', 9.5, 'dim', 'middle')
f.T(630, 236, 'focus falls IN FRONT of the retina', 9.5, 'hot', 'middle'); f.T(630, 250, 'distant objects blurred', 9.5, 'dim', 'middle')
f.El(350, 296, 6, 22, 'gold', 1.8, 'g2'); f.T(366, 300, 'corrected by a CONVEX lens', 10, 'gold', bold=True)
f.P('M590,274 Q598,296 590,318 L604,318 Q596,296 604,274 Z', 'gold', 1.8, 'g2'); f.T(614, 300, 'CONCAVE lens', 10, 'gold', bold=True)
f.T(140, 300, 'Presbyopia: the lens stiffens with', 9.5, 'dim', 'middle'); f.T(140, 314, 'age; near vision is lost first.', 9.5, 'dim', 'middle')
HP.append(f)

# 38 collision closure
f = Fig('hp-38', 'Collision Course — Constant Bearing, Late “Blossom”', 760, 350, 'Two aircraft converging on a constant relative bearing, and a graph of the apparent size of the other aircraft growing suddenly in the last seconds',
    '<b>An aircraft on a collision course does not move across the windscreen.</b> If the <b>relative bearing stays constant</b> and the range is closing, the two aircraft will collide — and with no relative movement the eye, which detects movement best, is slow to notice it. Worse, its apparent size grows very slowly at first: the image <b>doubles each time the range halves</b>, so it stays a tiny dot for most of the approach and then “blossoms” in the last few seconds. Recognising, deciding and manoeuvring takes about <b>10–12 seconds</b>; by the time the other aircraft looks alarming it may be too late. An aircraft that appears stationary in the windscreen is the dangerous one.')
C = (200, 60)
for i, t in enumerate((0, 1, 2)):
    a = (60 + i * 55, 250 - i * 75); b = (340 - i * 55, 250 - i * 75)
    f.L(a[0], a[1], b[0], b[1], 'gold', 1, dash='4 4')
f.L(40, 278, 196, 64, 'cool', 2, me='cool'); f.L(360, 278, 204, 64, 'hot', 2, me='hot')
f.raw(aircraft(64, 248, -54, 0.26, flip=True)); f.raw(aircraft(336, 248, 54, 0.26))
f.P('M192,52 L208,68 M208,52 L192,68', 'hot', 3); f.T(200, 40, 'collision point', 10, 'hot', 'middle', bold=True)
f.T(200, 300, 'sight lines stay parallel:', 9.5, 'gold', 'middle'); f.T(200, 314, 'constant relative bearing', 9.5, 'gold', 'middle', bold=True)
f.L(440, 60, 440, 270, 'ink', 1.6); f.L(440, 270, 720, 270, 'ink', 1.6)
pl(f, ' '.join(f'{450 + i*2.6:.1f},{270 - min(200, 9.0/((100-i)/100.0 + 0.045)):.1f}' for i in range(0, 100)), 'hot', 2.8)
for i, lab in enumerate(('60', '45', '30', '15', '0')): x = 450 + i * 65; f.L(x, 270, x, 275, 'ink', 1); f.T(x, 288, lab, 9.5, 'dim', 'middle')
f.T(580, 308, 'seconds to impact', 9.5, 'dim', 'middle'); f.T(424, 160, 'apparent size', 9.5, 'dim', 'middle', rot=-90)
f.R(632, 60, 78, 210, c='none', sw=0, fill='hot', rx=0, op=0.16); f.T(626, 90, 'time needed to react:', 9.5, 'hot', 'end'); f.T(626, 104, 'about 10–12 seconds', 9.5, 'hot', 'end', bold=True)
f.T(452, 222, 'a small dot for most of the approach', 9.5, 'dim')
HP.append(f)

# 31 false horizon
f = Fig('hp-31', 'False Horizon — Sloping Cloud Bank', 760, 330, 'An aircraft banked to line up with a sloping cloud bank instead of the true horizon',
    '<b>The eye takes the most prominent line for the horizon.</b> A <b>sloping cloud bank</b>, a tilted layer of haze, a coastline or a line of lights at night can be mistaken for the true horizon, and the pilot unconsciously rolls the aircraft to put the wings “level” with it — leaving the aircraft <b>banked and turning</b> while feeling level. It is most likely when the real horizon is hidden or indistinct, and at night over sparsely lit ground where stars and ground lights merge. The cure is the same as for every disorientation illusion: <b>believe the instruments</b>, especially the attitude indicator.')
f.R(30, 30, 700, 250, c='line', sw=1.4, fill='g2', rx=8)
f.L(40, 200, 720, 200, 'cool', 1.6, dash='8 5'); f.T(712, 216, 'true horizon (hidden in haze)', 10, 'cool', 'end')
poly(f, [(40, 150), (720, 86), (720, 130), (40, 196)], fill=CLOUD, c='none', sw=0, op=0.75)
f.L(40, 150, 720, 86, 'white', 2); f.T(50, 112, 'sloping cloud top: the false horizon', 10, 'ink', bold=True)
f.raw(f'<g transform="translate(380 150) rotate(-5.4)"><line x1="-90" y1="0" x2="90" y2="0" stroke="{col("gold")}" stroke-width="6" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="14" ry="12" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="1.4"/><line x1="0" y1="-12" x2="0" y2="-34" stroke="{col("gold")}" stroke-width="5" stroke-linecap="round"/></g>')
f.T(380, 250, 'wings aligned with the cloud top: the aircraft is actually banked and turning', 10.5, 'hot', 'middle', bold=True)
f.T(380, 306, 'When the real horizon is unclear, trust the attitude indicator, not the outside picture.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 32 aiming point
f = Fig('hp-32', 'Approach Angle & the Visual Aiming Point', 760, 340, 'Side view of three approach paths, too steep, correct and too shallow, with the windscreen picture of the runway for each',
    '<b>On a steady approach the aiming point does not move.</b> The point on the ground towards which the aircraft is actually flying stays <b>fixed in the windscreen</b>; everything beyond it appears to move up and everything short of it to move down. If the chosen aiming point <b>drifts up</b> the windscreen the aircraft is <b>undershooting</b> (too low / too shallow); if it <b>drifts down</b> it is overshooting. The runway’s shape also tells the angle: on a normal <b>3°</b> approach it has a familiar perspective; <b>too high</b>, it looks longer and narrower; <b>too low</b>, it looks short and flat.')
f.L(30, 210, 500, 210, 'ink', 1.6); f.R(380, 210, 110, 7, c='ink', sw=1, fill='dim', rx=0)
for (y0, c_, lab) in ((40, 'hot', 'too steep'), (110, 'green', 'correct, about 3°'), (160, 'cool', 'too shallow')):
    f.L(60, y0, 400, 210, c_, 2.2); f.T(64, y0 - 6, lab, 10, c_, bold=True)
f.Ci(400, 210, 5, 'gold', 1, 'gold'); f.T(414, 196, 'aiming point', 10, 'gold', bold=True)
def wind(cx, ttl, wt, wb, top, bot, c_):
    f.R(cx - 60, 250, 120, 76, c='line', sw=1.2, fill='g2', rx=6); persp_rwy(f, cx, top, bot, wt, wb); f.T(cx, 244, ttl, 9.5, c_, 'middle', bold=True)
wind(110, 'too high: long and narrow', 8, 14, 258, 320, 'hot'); wind(270, 'correct', 9, 24, 270, 320, 'green'); wind(430, 'too low: short and flat', 14, 44, 292, 320, 'cool')
note(f, 540, 60, ['The aiming point stays', 'fixed in the windscreen.'], first='gold')
note(f, 540, 120, ['It drifts UP:', 'you will land short.'], first='cool')
note(f, 540, 180, ['It drifts DOWN:', 'you will land long.'], first='hot')
HP.append(f)

# 33 sloping runway
f = Fig('hp-33', 'Sloping-Runway & Runway-Width Illusions', 760, 350, 'Side views of an approach to an upsloping and a downsloping runway showing the false impression of height and the resulting flight path',
    '<b>Pilots judge height from the runway’s perspective, so an unusual runway fools them.</b> An <b>upsloping runway</b> looks longer and steeper, as if seen from higher up: the pilot feels <b>too high</b> and flies a <b>low, shallow approach</b> — risk of <b>undershoot</b>. A <b>downsloping runway</b> looks short and flat: the pilot feels <b>too low</b> and flies <b>high</b> — risk of overshoot and a long landing. Width works the same way: a <b>narrower</b> runway than usual looks further away, so the pilot feels high and flies low, flaring late; a <b>wider</b> one makes the pilot feel low, fly high and flare too early. Upsloping terrain in the undershoot has the same effect as an upsloping runway.')
def slope(x0, up, ttl):
    y = 200
    f.L(x0, y, x0 + 190, y, 'ink', 1.4)
    f.L(x0 + 190, y, x0 + 330, y - (26 if up else -26), 'white', 5); f.T(x0 + 165, 44, ttl, 11, 'ink', 'middle', bold=True)
    f.L(x0 + 10, 80, x0 + 200, y - 2, 'green', 1.6, dash='7 5'); f.T(x0 + 20, 72, 'normal 3° path', 9.5, 'green')
    if up: f.P(f'M{x0+10},110 Q{x0+110},176 {x0+176},{y-2}', 'hot', 2.4, me='hot')
    else: f.P(f'M{x0+10},70 Q{x0+140},110 {x0+250},{y+8}', 'hot', 2.4, me='hot')
    f.T(x0 + 165, 246, ('feels TOO HIGH: flies LOW' if up else 'feels TOO LOW: flies HIGH'), 10.5, 'hot', 'middle', bold=True)
    f.T(x0 + 165, 262, ('risk: undershoot' if up else 'risk: overshoot, long landing'), 9.5, 'dim', 'middle')
slope(30, True, 'UPSLOPING runway'); slope(400, False, 'DOWNSLOPING runway')
f.L(380, 30, 380, 270, 'line', 1, dash='3 5')
table(f, 110, 284, [150, 190, 200], ['runway is…', 'pilot feels…', 'and tends to…'], [('narrower than usual', 'high (runway looks far off)', 'fly low, flare late'), ('wider than usual', 'low (runway looks close)', 'fly high, flare early')], 'gold')
HP.append(f)

# 36 aiming vs touchdown
f = Fig('hp-36', 'Aiming Point vs Touchdown Point', 760, 320, 'An approach path to the aiming point with the flare carrying the aircraft beyond it to the touchdown point, and the wheels path below the eye path',
    '<b>The aircraft does not land where it is aimed.</b> The pilot flies the eye towards the <b>aiming point</b>, but the <b>flare</b> reduces the rate of descent and carries the aircraft along the runway, so the <b>touchdown point is beyond the aiming point</b>. On a large aircraft the effect of geometry matters too: the <b>main wheels are well below and behind the pilot’s eyes</b>, so they cross the threshold much lower than the eye path — aiming at the very start of the runway would put the wheels in the undershoot. That is why the aiming-point markings are painted about 300 m (in the range 150–400 m) in from the threshold.')
f.L(30, 250, 730, 250, 'ink', 1.6); f.R(300, 250, 420, 8, c='ink', sw=1, fill='dim', rx=0)
f.L(300, 236, 300, 262, 'white', 3); f.T(300, 280, 'threshold', 9.5, 'ink', 'middle')
f.R(430, 250, 30, 8, c='none', sw=0, fill='white', rx=0); f.T(445, 280, 'aiming point', 9.5, 'gold', 'middle', bold=True)
f.L(60, 60, 445, 250, 'gold', 1.6, dash='7 5'); f.T(64, 52, 'eye path, towards the aiming point', 10, 'gold')
f.P('M60,84 L360,232 Q470,250 560,250', 'hot', 2.4); f.T(120, 142, 'main-wheel path', 10, 'hot', 'end')
f.raw(aircraft(180, 122, 26, 0.36, flip=True, gear=True))
f.Ci(560, 250, 5, 'hot', 1, 'hot'); f.T(560, 280, 'touchdown point', 9.5, 'hot', 'middle', bold=True)
f.L(445, 300, 560, 300, 'cool', 1.4, me='cool', ms='cool'); f.T(502, 314, 'distance used in the flare', 9.5, 'cool', 'middle')
f.L(300, 196, 300, 232, 'cool', 1.4, me='cool', ms='cool'); f.T(60, 206, 'wheels cross the threshold', 9.5, 'cool'); f.T(60, 219, 'lower than the eye', 9.5, 'cool'); f.L(186, 210, 296, 214, 'cool', 1)
f.T(560, 60, 'vertical scale exaggerated', 9, 'faint', 'middle')
HP.append(f)

# 39 rain refraction
f = Fig('hp-39', 'Rain on the Windscreen — Refraction Illusion', 760, 330, 'Light from the runway bent downward by a layer of water on the windscreen so the runway appears lower than it is',
    '<b>Water on the windscreen bends the light.</b> A layer of rain acts as a prism and refracts light from the runway <b>downwards</b>, so the runway and horizon appear <b>lower</b> than they really are. Seeing the runway lower in the windscreen, the pilot believes the aircraft is <b>higher</b> than it is and descends — a <b>low approach and undershoot</b>. The error can be of the order of <b>200 ft at 1 nm</b> from the runway. Heavy rain also reduces visibility and makes lights appear dimmer and further away, reinforcing the impression of height. Use the glide-slope, PAPI and the altimeter rather than the picture.')
f.L(30, 270, 730, 270, 'ink', 1.6); f.R(520, 270, 190, 8, c='ink', sw=1, fill='dim', rx=0); f.T(615, 296, 'runway', 9.5, 'dim', 'middle')
f.L(190, 60, 250, 200, 'cool', 6); f.T(170, 50, 'windscreen with a film of water', 10, 'cool', 'middle', bold=True)
f.Ci(120, 130, 9, 'ink', 1.6, 'g3'); f.T(120, 160, "pilot's eye", 9.5, 'dim', 'middle')
f.L(560, 268, 222, 134, 'green', 1.8); f.L(222, 134, 129, 130, 'green', 1.8, me='green'); f.T(420, 190, 'actual light path from the runway', 9.5, 'green')
f.L(222, 134, 560, 150, 'hot', 1.8, dash='7 5')
f.T(566, 146, 'where the runway APPEARS to be', 9.5, 'hot', bold=True)
f.L(590, 160, 590, 262, 'hot', 1.4, me='hot'); f.T(598, 214, 'the runway looks lower', 9.5, 'hot')
note(f, 40, 220, ['Runway seems lower, so the', 'pilot feels HIGH and descends:', 'risk of undershoot.'], first='ink')
f.T(380, 320, 'Error can be about 200 ft at 1 nm. Cross-check PAPI, glide slope and altimeter.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 10 ear
f = Fig('hp-10', 'Structure of the Ear', 760, 350, 'A section of the ear with the outer ear, ear canal, eardrum, the three ossicles, Eustachian tube, cochlea, semicircular canals and auditory nerve',
    '<b>Three parts, two jobs.</b> The <b>outer ear</b> collects sound and channels it down the ear canal to the <b>eardrum</b>. In the air-filled <b>middle ear</b> three tiny bones, the <b>ossicles</b> (malleus, incus, stapes), pass the vibration to the fluid-filled <b>inner ear</b>, where the <b>cochlea</b> turns it into nerve signals — <b>hearing</b>. The inner ear also contains the <b>vestibular apparatus</b> (semicircular canals and otoliths) — <b>balance</b>. The <b>Eustachian tube</b> links the middle ear to the throat to equalise pressure; it opens easily in the climb but can stay shut in the descent, especially with a cold, causing pain and possible eardrum damage (<b>otic barotrauma</b>). Noise above about 85–90 dB damages the cochlea permanently.')
f.P('M70,90 C20,110 20,230 70,260 C100,250 110,220 96,190 C120,180 124,150 104,140 C116,120 100,96 70,90 Z', 'ink', 2, 'g3')
f.R(100, 162, 180, 28, c='ink', sw=1.6, fill='bg', rx=4); f.L(280, 150, 280, 204, 'gold', 4)
f.R(282, 130, 120, 100, c='line', sw=1.2, fill='g2', rx=8)
f.P('M284,170 L312,160 L330,178 L352,170 L372,184', 'warm', 3.2, join='round'); f.Ci(376, 186, 6, 'warm', 1.6, 'g3')
f.P('M392,230 Q400,290 470,318', 'cool', 6); f.T(482, 324, 'Eustachian tube, to the throat', 10, 'cool')
for i, r in enumerate((30, 22, 14, 7)): f.Ci(470 + i * 3, 200, r, 'ink', 2)
for (a, b) in ((-34, -74), (0, -84), (34, -70)): f.El(452 + a, 138 + (b + 78) * 0.3, 20, 30, 'gold', 2.2)
f.P('M500,200 L600,170', 'gold', 5); f.T(606, 170, 'auditory nerve', 10, 'gold', bold=True); f.T(606, 184, 'to the brain', 9.5, 'gold')
lead(f, 150, 60, 80, 110, 'outer ear (pinna)'); lead(f, 150, 240, 190, 192, 'ear canal'); lead(f, 250, 100, 280, 152, 'eardrum', 'end')
lead(f, 300, 60, 330, 166, 'ossicles: malleus, incus, stapes'); lead(f, 560, 250, 494, 214, 'cochlea: hearing'); lead(f, 540, 70, 474, 104, 'semicircular canals: balance')
f.T(70, 300, 'OUTER EAR', 10, 'dim', bold=True); f.T(284, 250, 'MIDDLE EAR (air)', 10, 'dim', bold=True); f.T(440, 262, 'INNER EAR (fluid)', 10, 'dim', bold=True)
HP.append(f)

# 11 vestibular
f = Fig('hp-11', 'The Vestibular Apparatus', 760, 340, 'The three semicircular canals at right angles and the two otolith organs, the utricle and saccule',
    '<b>The balance organ of the inner ear has two kinds of sensor.</b> Three <b>semicircular canals</b>, set at right angles to one another, detect <b>angular acceleration</b> in pitch, roll and yaw. Two <b>otolith organs</b> — the <b>utricle</b> (mainly horizontal movement) and the <b>saccule</b> (mainly vertical) — detect <b>linear acceleration</b> and the direction of <b>gravity</b>. Both work well on the ground but were never designed for flight: the canals cannot sense a steady turn or a very slow rate of roll, and the otoliths cannot tell acceleration from tilt. Without outside visual reference they produce powerful false sensations — <b>spatial disorientation</b>.')
f.El(250, 120, 70, 90, 'cool', 6); f.El(330, 150, 90, 46, 'gold', 6); f.P('M190,170 C150,120 170,60 240,52', 'green', 6)
f.El(270, 240, 62, 34, 'ink', 2, 'g3'); f.El(350, 270, 36, 28, 'ink', 2, 'g3')
f.T(270, 244, 'utricle', 10, 'ink', 'middle', bold=True); f.T(350, 274, 'saccule', 10, 'ink', 'middle', bold=True)
f.Ci(250, 206, 9, 'ink', 1.4, 'hot'); f.Ci(398, 186, 9, 'ink', 1.4, 'hot'); f.Ci(196, 176, 9, 'ink', 1.4, 'hot')
lead(f, 430, 60, 300, 70, 'semicircular canals (three, at right angles)'); lead(f, 430, 110, 404, 180, 'ampulla with the cupula (sensor)')
lead(f, 430, 250, 330, 244, 'otolith organs')
note(f, 470, 140, ['Canals: ANGULAR acceleration', 'in pitch, roll and yaw.'], first='cool')
note(f, 470, 280, ['Otoliths: LINEAR acceleration', 'and the direction of gravity.'], first='gold')
f.T(250, 320, 'one canal for each axis of rotation', 9.5, 'dim', 'middle')
HP.append(f)

# 12 macula & canals
f = Fig('hp-12', 'How the Semicircular Canals & Otoliths Work', 760, 350, 'A canal with its cupula upright at rest and bent during angular acceleration, and an otolith membrane level at rest and displaced during linear acceleration',
    '<b>Both sensors rely on inertia.</b> A <b>semicircular canal</b> is a ring of fluid (endolymph) with a jelly-like flap, the <b>cupula</b>, across it. When the head starts to turn, the fluid lags behind and <b>bends the cupula</b>, signalling rotation. In a <b>steady</b> turn the fluid catches up within about 20 seconds, the cupula straightens and the sensation of turning <b>stops</b>; when the turn ends the fluid carries on and signals a turn the <b>other way</b>. An <b>otolith organ</b> is a bed of hair cells under a gel layer weighted with chalk crystals; <b>linear acceleration or tilt</b> makes the heavy layer slide and bend the hairs — and the brain cannot tell the two apart.')
def canal(cx, bent, ttl, sub):
    f.Ci(cx, 130, 60, 'cool', 9); f.Ci(cx, 130, 60, 'bg', 4)
    f.P(f'M{cx},{190} Q{cx + (16 if bent else 0)},{160} {cx + (22 if bent else 0)},{136}', 'hot', 6)
    f.T(cx, 44, ttl, 10.5, 'ink', 'middle', bold=True); f.T(cx, 216, sub, 9.5, 'dim', 'middle')
    if bent:
        a, b = pol(cx, 130, 78, 150), pol(cx, 130, 78, 210); f.P(f'M{a[0]:.1f},{a[1]:.1f} A78,78 0 0 1 {b[0]:.1f},{b[1]:.1f}', 'gold', 2, me='gold')
        a, b = pol(cx, 130, 44, 300), pol(cx, 130, 44, 240); f.P(f'M{a[0]:.1f},{a[1]:.1f} A44,44 0 0 0 {b[0]:.1f},{b[1]:.1f}', 'cool', 1.6, me='cool')
canal(110, False, 'CANAL: at rest', 'cupula upright'); canal(290, True, 'CANAL: turn begins', 'fluid lags, cupula bends')
f.T(200, 240, 'gold: head turns  |  blue: fluid lags behind', 9.5, 'dim', 'middle')
def oto(x0, shift, ttl, sub):
    f.R(x0, 150, 150, 14, c='ink', sw=1.4, fill='steel', rx=3)
    for i in range(7): f.L(x0 + 15 + i * 20, 150, x0 + 15 + i * 20 + shift, 122, 'hot', 2)
    f.R(x0 + 4 + shift, 100, 142, 22, c='gold', sw=1.6, fill='gold', rx=8, op=0.7)
    f.T(x0 + 75, 44, ttl, 10.5, 'ink', 'middle', bold=True); f.T(x0 + 75, 190, sub, 9.5, 'dim', 'middle')
oto(410, 0, 'OTOLITH: at rest', 'hairs upright'); oto(590, -14, 'OTOLITH: accelerating', 'heavy layer lags, hairs bend')
f.L(700, 80, 740, 80, 'gold', 2, me='gold'); f.T(720, 70, 'accel.', 9, 'gold', 'middle')
f.L(380, 30, 380, 250, 'line', 1, dash='3 5')
f.T(190, 290, 'In a steady turn the fluid catches up (about 20 s):', 10, 'ink', 'middle', bold=True); f.T(190, 306, 'the sensation of turning fades. Stopping the turn', 10, 'dim', 'middle'); f.T(190, 322, 'feels like turning the opposite way.', 10, 'dim', 'middle')
f.T(570, 290, 'Tilting the head back bends the hairs exactly as', 10, 'ink', 'middle', bold=True); f.T(570, 306, 'forward acceleration does: the brain cannot', 10, 'dim', 'middle'); f.T(570, 322, 'tell acceleration from tilt.', 10, 'dim', 'middle')
HP.append(f)

# 13 the leans
f = Fig('hp-13', 'The Leans — Semicircular-Canal Disorientation', 760, 340, 'Three stages seen from behind: an aircraft rolling slowly unnoticed, the pilot correcting quickly, and the pilot leaning while the aircraft is level',
    '<b>The most common disorientation illusion.</b> The semicircular canals have a threshold: a roll slower than about <b>2° per second</b> is not felt. If the aircraft banks that slowly — while the pilot is distracted — the pilot still feels level. On noticing the attitude indicator, the pilot rolls back to level briskly; <b>that</b> movement is above the threshold and is felt as a roll the <b>other way</b>. The aircraft is now level, but the pilot feels banked in the opposite direction and may <b>lean</b> to one side, or even re-enter the original bank, to feel upright. The sensation can last for many minutes. Remedy: believe the instruments and fly the attitude indicator.')
def rear(cx, bank, lean, ttl, l1, l2, c_):
    f.L(cx - 90, 210, cx + 90, 210, 'cool', 1.2, dash='6 4')
    f.raw(f'<g transform="translate({cx} 170) rotate({bank})"><line x1="-80" y1="0" x2="80" y2="0" stroke="{col("gold")}" stroke-width="6" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="20" ry="18" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="1.4"/><line x1="0" y1="-18" x2="0" y2="-44" stroke="{col("gold")}" stroke-width="5" stroke-linecap="round"/>'
          f'<g transform="rotate({lean})"><circle cx="0" cy="-4" r="6" fill="{col("hot")}"/><line x1="0" y1="2" x2="0" y2="12" stroke="{col("hot")}" stroke-width="3"/></g></g>')
    f.T(cx, 50, ttl, 11, 'ink', 'middle', bold=True); f.T(cx, 250, l1, 10, c_, 'middle', bold=True); f.T(cx, 266, l2, 9.5, 'dim', 'middle')
rear(130, 18, 0, '1  Slow roll, unnoticed', 'feels LEVEL', 'roll rate below the threshold', 'hot')
rear(380, 0, 0, '2  Quick correction to level', 'feels like a roll the other way', 'this roll IS above the threshold', 'hot')
rear(630, 0, -20, '3  Aircraft level, pilot leans', 'feels BANKED, leans to compensate', 'the false sensation persists', 'hot')
f.L(240, 170, 276, 170, 'dim', 1.6, me='dim'); f.L(490, 170, 526, 170, 'dim', 1.6, me='dim')
f.T(380, 300, 'Threshold of the semicircular canals: about 2° per second.', 10.5, 'ink', 'middle', bold=True)
f.T(380, 320, 'Seen from behind. Blue dashed line: the true horizon.', 9.5, 'faint', 'middle')
HP.append(f)

# 37 somatogravic
f = Fig('hp-37', 'Somatogravic Illusion — Acceleration Felt as Pitch-Up', 760, 340, 'A pilot in level flight with gravity acting straight down, and during acceleration with the resultant force tilted back so that level flight feels like a climb',
    '<b>The otoliths cannot tell acceleration from tilt.</b> In steady flight the only force on them is gravity, straight down. During a strong <b>forward acceleration</b> — a take-off or go-around, especially at night or in cloud — inertia adds a rearward force, and the <b>resultant</b> of the two points down and <b>back</b>. The brain takes that resultant for “down”, so the pilot feels <b>tilted backwards, as if pitching up</b>, and instinctively <b>pushes the nose down</b> — into the ground. Deceleration gives the opposite illusion, a false pitch-down. With no visual horizon the sensation is completely convincing: fly the attitude indicator and hold the correct climb attitude.')
def seat(cx, tilt, ttl):
    f.raw(f'<g transform="translate({cx} 170) rotate({tilt})"><rect x="-70" y="24" width="150" height="12" rx="4" fill="{col("steel")}" stroke="{col("ink")}" stroke-width="1.2"/>'
          f'<circle cx="0" cy="-34" r="14" fill="#c4d1d6" stroke="{col("ink")}" stroke-width="1.4"/><path d="M0,-20 L0,16 L34,16 L34,40" fill="none" stroke="{col("ink")}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M-16,-16 L-16,22 L-10,22" fill="none" stroke="{col("dim")}" stroke-width="5" stroke-linecap="round"/></g>')
    f.T(cx, 44, ttl, 11, 'ink', 'middle', bold=True)
seat(150, 0, 'STEADY FLIGHT'); f.L(150, 150, 150, 250, 'cool', 3, me='cool'); f.T(160, 246, 'gravity', 10, 'cool', bold=True)
f.T(150, 290, 'feels level', 10.5, 'green', 'middle', bold=True)
seat(400, 0, 'ACCELERATING (actual)'); f.L(400, 150, 400, 250, 'cool', 3, me='cool'); f.L(400, 150, 340, 150, 'gold', 3, me='gold'); f.L(400, 150, 342, 248, 'hot', 3, me='hot')
f.T(410, 246, 'gravity', 10, 'cool', bold=True); f.T(334, 140, 'inertia', 10, 'gold', 'end', bold=True); f.T(336, 266, 'resultant', 10, 'hot', 'end', bold=True)
f.L(470, 120, 520, 120, 'gold', 2.4, me='gold'); f.T(495, 110, 'acceleration', 9.5, 'gold', 'middle')
f.T(400, 290, 'aircraft is level', 10.5, 'ink', 'middle', bold=True)
seat(640, -31, 'WHAT IS FELT'); f.L(640, 150, 640, 250, 'hot', 3, me='hot'); f.T(650, 246, 'felt as “down”', 10, 'hot', bold=True)
f.T(640, 290, 'feels pitched UP', 10.5, 'hot', 'middle', bold=True)
f.L(270, 170, 300, 170, 'dim', 1.6, me='dim'); f.L(530, 170, 560, 170, 'dim', 1.6, me='dim')
f.T(380, 324, 'Danger on take-off or go-around at night: the pilot pushes forward to correct a climb that is not there.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

gallery(HP, 'Human Performance Gallery 1', 'Human Performance — Physiology', 'Original figures for circulation, respiration, vision, hearing and balance, and the related illusions.', 'hp1-gallery.html')
print(f'HP1 {len(HP)}  QA warnings: {len(WARN)}')
for w in WARN: print('  ⚠', w)
