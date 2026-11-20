#!/usr/bin/env python3
"""Human Performance part 2 (A.6.2, A.6.3): sleep, stress, information processing, error, personality, CRM — 28 figures."""
import math
from figlib import *
from gen_common import note, gallery, pl

HP = []
def axes(f, x0, y0, x1, y1, xl=None, yl=None):
    f.L(x0, y1, x0, y0, 'ink', 1.6); f.L(x0, y0, x1, y0, 'ink', 1.6, me='ink')
    if xl: f.T((x0 + x1) / 2, y0 + 34, xl, 9.5, 'dim', 'middle')
    if yl: f.T(x0 - 44, (y0 + y1) / 2, yl, 9.5, 'dim', 'middle', rot=-90)
def flow(f, boxes, y, h=44, c='ink', gap=24, x0=30, w=None, size=10.5):
    n = len(boxes); w = w or (700 - gap * (n - 1)) / n
    for i, b in enumerate(boxes):
        x = x0 + i * (w + gap); lines, cc = (b if isinstance(b, tuple) else (b, c))
        f.box(x, y, w, h, lines if isinstance(lines, list) else [lines], c=cc, size=size)
        if i < n - 1: f.L(x + w + 2, y + h / 2, x + w + gap - 2, y + h / 2, 'dim', 1.8, me='dim')
    return w

# 40 sleep credit
f = Fig('hp-40', 'Sleep Credit & Deficit — The Sleep/Wake Cycle', 760, 340, 'A sawtooth graph of sleep credit rising during eight hours of sleep and falling during sixteen hours awake',
    '<b>Sleep works like a bank account.</b> Each hour of sleep earns about <b>two hours of wakefulness</b>: eight hours asleep builds a credit of <b>16 points</b>, which is then spent at one point per hour through a 16-hour day. The credit cannot be stored beyond about 16 points, so “sleeping in advance” does not work, and a shortened night leaves a <b>sleep deficit</b> that carries into the next duty. Performance falls as the credit runs out, worst when a low credit coincides with the <b>circadian low</b> between about 0200 and 0600. A deficit is repaid with slightly longer, deeper sleep, not hour for hour.')
px = lambda h: 80 + h * 12.5
py = lambda c: 270 - c * 12.5
axes(f, 80, 270, 700, 50, 'time of day (two days)', 'sleep credit (points)')
pts = [(0, 16), (16, 0), (24, 16), (40, 0), (48, 16)]
pl(f, ' '.join(f'{px(a)},{py(b)}' for a, b in pts), 'cool', 2.8)
for a, b in ((16, 24), (40, 48)): f.R(px(a), 56, px(b) - px(a), 214, c='none', sw=0, fill='cool', rx=0, op=0.14); f.T((px(a) + px(b)) / 2, 72, 'ASLEEP', 9.5, 'cool', 'middle', bold=True)
for h, lab in ((0, '0700'), (16, '2300'), (24, '0700'), (40, '2300'), (48, '0700')): f.L(px(h), 270, px(h), 275, 'ink', 1); f.T(px(h), 288, lab, 9.5, 'dim', 'middle')
for c in (0, 8, 16): f.L(74, py(c), 80, py(c), 'ink', 1); f.T(70, py(c) + 4, str(c), 9.5, 'dim', 'end')
f.T(px(5), py(14), 'awake: −1 point per hour', 10, 'ink', bold=True); f.T(px(33), py(13), 'awake', 10, 'ink', bold=True)
f.T(px(20) + 4, py(8) + 4, '+2 per', 9.5, 'cool', bold=True); f.T(px(20) + 4, py(8) + 17, 'hour', 9.5, 'cool', bold=True)
f.T(380, 326, '1 hour of sleep = 2 hours awake. Maximum credit: 16 points.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 41 body temperature rhythm
f = Fig('hp-41', 'Circadian Rhythm — Body Temperature', 760, 340, 'A graph of body temperature over 24 hours with a minimum in the early morning and a maximum in the early evening',
    '<b>The body runs on a daily clock.</b> Body temperature, alertness, hormone levels and performance all follow a <b>circadian rhythm</b>. Temperature is lowest at about <b>0500</b> and highest at about <b>1700</b>; alertness and performance follow it, so the hours between about <b>0200 and 0600</b> — the “window of circadian low” — are when errors are most likely and staying awake is hardest. Left without time cues the clock runs slow, with a period of about <b>25 hours</b>; it is reset each day by <b>zeitgebers</b> (“time givers”): light and dark above all, plus meals, activity and social routine.')
px = lambda h: 80 + h * 25.5
py = lambda t: 270 - (t - 36.0) * 180
axes(f, 80, 270, 710, 50, 'time of day', 'body temperature (°C)')
pl(f, ' '.join(f'{px(h/4):.1f},{py(36.55 + 0.4 * math.cos(2 * math.pi * (h/4 - 17) / 24)):.1f}' for h in range(0, 97)), 'hot', 2.8)
f.R(px(2), 56, px(6) - px(2), 214, c='none', sw=0, fill='cool', rx=0, op=0.16); f.T(px(4), 72, 'circadian low', 9.5, 'cool', 'middle', bold=True)
for h in (0, 4, 8, 12, 16, 20, 24): f.L(px(h), 270, px(h), 275, 'ink', 1); f.T(px(h), 288, f'{h:02d}00', 9.5, 'dim', 'middle')
for t in (36.2, 36.6, 37.0): f.L(74, py(t), 80, py(t), 'ink', 1); f.T(70, py(t) + 4, f'{t}', 9.5, 'dim', 'end')
f.Ci(px(5), py(36.15), 4.5, 'cool', 1, 'cool'); f.T(px(5) + 10, py(36.15) + 16, 'minimum about 0500', 10, 'cool', bold=True)
f.Ci(px(17), py(36.95), 4.5, 'hot', 1, 'hot'); f.T(px(17), py(36.95) - 12, 'maximum about 1700', 10, 'hot', 'middle', bold=True)
f.T(380, 326, 'Free-running period about 25 hours; reset daily by zeitgebers (light, meals, activity).', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 42 sleep stages
f = Fig('hp-42', 'Sleep Stages & REM Cycles', 760, 340, 'A hypnogram of one night showing repeated ninety-minute cycles through four stages of sleep and REM periods that lengthen towards morning',
    '<b>A night’s sleep is a series of cycles</b>, each about <b>90 minutes</b>. Sleep deepens from stage 1 (drowsy) through stage 2 to stages 3 and 4, the deep <b>slow-wave sleep</b> that restores the <b>body</b>, then lightens into <b>REM</b> (rapid eye movement) sleep, when dreaming occurs and which restores the <b>mind</b> and consolidates learning. Slow-wave sleep dominates the <b>early</b> cycles and REM the <b>later</b> ones, so cutting sleep short loses mostly REM. After deprivation the body takes slow-wave sleep first. Waking from deep sleep causes <b>sleep inertia</b> — grogginess for several minutes — so in-flight naps are best kept short (about 20–30 minutes).')
lv = {'awake': 60, 'REM': 92, '1': 124, '2': 156, '3': 188, '4': 220}
for k, y in lv.items(): f.L(110, y, 710, y, 'line', 0.8, dash='2 4'); f.T(100, y + 4, ('stage ' + k) if k.isdigit() else k, 9.5, 'hot' if k == 'REM' else 'dim', 'end', bold=(k == 'REM'))
f.L(110, 46, 110, 240, 'ink', 1.6); f.L(110, 240, 716, 240, 'ink', 1.6, me='ink')
px = lambda h: 110 + h * 74
seq = [(0, 'awake'), (0.15, '1'), (0.3, '2'), (0.5, '3'), (0.7, '4'), (1.2, '4'), (1.3, '2'), (1.4, 'REM'), (1.55, 'REM'), (1.6, '2'), (1.9, '3'), (2.1, '4'), (2.6, '4'), (2.7, '2'), (2.85, 'REM'), (3.1, 'REM'),
       (3.15, '2'), (3.5, '3'), (4.0, '3'), (4.1, '2'), (4.3, 'REM'), (4.7, 'REM'), (4.75, '2'), (5.4, '2'), (5.6, 'REM'), (6.2, 'REM'), (6.25, '2'), (6.9, '2'), (7.1, 'REM'), (7.7, 'REM'), (7.8, '1'), (8.0, 'awake')]
d = f'M{px(0)},{lv["awake"]}'
for (h, k), (h2, k2) in zip(seq, seq[1:]): d += f' L{px(h2):.1f},{lv[k]} L{px(h2):.1f},{lv[k2]}'
f.P(d, 'cool', 2.2, join='round')
for (h, k), (h2, k2) in zip(seq, seq[1:]):
    if k == 'REM' and k2 == 'REM': f.L(px(h), lv['REM'], px(h2), lv['REM'], 'hot', 6)
for h in range(0, 9): f.L(px(h), 240, px(h), 245, 'ink', 1); f.T(px(h), 258, str(h), 9.5, 'dim', 'middle')
f.T(410, 278, 'hours asleep', 9.5, 'dim', 'middle')
f.L(px(0), 290, px(1.5), 290, 'gold', 1.6, me='gold', ms='gold'); f.T(px(0.75), 306, 'one cycle: about 90 min', 9.5, 'gold', 'middle', bold=True)
f.T(px(6.6), 80, 'REM periods lengthen', 9.5, 'hot', 'middle', bold=True)
f.T(540, 316, 'Slow-wave sleep restores the body; REM restores the mind.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 43 jet lag
f = Fig('hp-43', 'Jet Lag — Westbound vs Eastbound', 760, 330, 'Two bars comparing the body clock with local time after flying west, which lengthens the day, and east, which shortens it',
    '<b>Crossing time zones leaves the body clock behind.</b> Flying <b>west</b> lengthens the day: the body must <b>delay</b> its clock, which is the direction it drifts naturally (its free-running period is about 25 hours), so adjustment is easier — roughly <b>1.5 hours per day</b>. Flying <b>east</b> shortens the day and the clock must be <b>advanced</b>, which is harder — roughly <b>1 hour per day</b>. Until the clock resynchronises the result is <b>circadian dysrhythmia</b>: poor sleep, daytime fatigue, reduced performance and digestive upset. On a short stopover (under about 24 hours) stay on home time; on a long one, adopt local time and seek daylight.')
def bars(y, ttl, off, c_, txt1, txt2):
    f.T(40, y - 12, ttl, 11, c_, bold=True)
    f.R(160, y, 380, 22, c='ink', sw=1.2, fill='g3', rx=4); f.T(84, y + 15, 'local time', 9.5, 'dim', 'end')
    f.R(160 + off, y + 34, 380, 22, c=c_, sw=1.4, fill='g2', rx=4); f.T(84, y + 49, 'body clock', 9.5, 'dim', 'end')
    for x0, yy in ((160, y), (160 + off, y + 34)):
        f.R(x0 + 250, yy, 130, 22, c='none', sw=0, fill='cool', rx=4, op=0.35); f.T(x0 + 315, yy + 15, 'night', 9, 'ink', 'middle')
    f.T(624, y + 16, txt1, 10, 'ink', bold=True); f.T(624, y + 32, txt2, 9.5)
bars(70, 'WESTBOUND: the day is lengthened', -60, 'green', 'easier', 'about 1.5 h per day')
bars(190, 'EASTBOUND: the day is shortened', 60, 'hot', 'harder', 'about 1 h per day')
f.T(380, 290, 'The body clock naturally runs slow (about 25 h), so delaying it is easier than advancing it.', 10.5, 'ink', 'middle', bold=True)
f.T(380, 310, 'Short stopover: stay on home time.  Long stopover: adopt local time, get daylight.', 10, 'dim', 'middle')
HP.append(f)

# 19 stress model
f = Fig('hp-19', 'The Stress Model — Perceived Demand vs Perceived Ability', 760, 330, 'A balance with perceived demand on one side and perceived ability on the other, tipping towards stress when demand is greater',
    '<b>Stress comes from the mismatch a person perceives, not from the task itself.</b> The mind weighs the <b>perceived demand</b> of a situation against its <b>perceived ability</b> to cope. If the two balance, the person is comfortable and performs well. If demand appears to <b>exceed</b> ability, stress results — and it is the <b>perception</b> that counts: an experienced pilot and a novice face the same crosswind but feel very different stress. Feedback matters too: coping successfully raises perceived ability for next time, while failure lowers it. Training, preparation and experience all work by raising perceived ability.')
f.P('M380,250 L360,290 L400,290 Z', 'ink', 1.6, 'steel'); f.L(160, 176, 600, 216, 'ink', 4)
f.box(100, 116, 170, 56, ['PERCEIVED', 'DEMAND'], c='hot', size=12); f.box(500, 158, 170, 56, ['PERCEIVED', 'ABILITY'], c='green', size=12)
f.L(185, 60, 185, 110, 'hot', 2.4, me='hot'); f.T(196, 80, 'actual demand, as the person sees it', 9.5, 'hot')
f.L(585, 102, 585, 152, 'green', 2.4, me='green'); f.T(574, 122, 'actual ability, as the person sees it', 9.5, 'green', 'end')
f.T(380, 320, 'Demand seen as greater than ability = STRESS.  Balanced = comfortable.  Feedback from the outcome adjusts both.', 10, 'ink', 'middle', bold=True)
f.T(380, 244, 'the balance', 9.5, 'faint', 'middle')
HP.append(f)

# 20 arousal
f = Fig('hp-20', 'Arousal & Performance — The Inverted U', 760, 340, 'An inverted U curve of performance against arousal, low at both ends and best in the middle',
    '<b>Performance is best at a moderate level of arousal</b> (the Yerkes–Dodson law). When arousal is <b>too low</b> — boredom, a long quiet cruise, fatigue — attention wanders and events are missed. As arousal rises performance improves to an <b>optimum</b>. Beyond that, <b>over-arousal</b> degrades it: attention narrows onto one item (<b>tunnelling</b> or fixation), other information is shed, and in the extreme the pilot freezes or panics. The optimum is <b>lower for complex or unfamiliar tasks</b> than for simple, well-practised ones, which is why emergencies are trained until the response is automatic.')
axes(f, 100, 270, 690, 50, 'arousal (stress level)', 'performance')
pl(f, ' '.join(f'{100 + i * 5.7:.1f},{270 - 190 * math.exp(-((i - 50) / 24.0) ** 2):.1f}' for i in range(0, 101)), 'gold', 3)
f.Ci(385, 80, 5, 'green', 1, 'green'); f.T(385, 66, 'optimum', 10.5, 'green', 'middle', bold=True)
f.R(100, 56, 150, 214, c='none', sw=0, fill='cool', rx=0, op=0.12); f.R(540, 56, 150, 214, c='none', sw=0, fill='hot', rx=0, op=0.12)
note(f, 112, 150, ['UNDER-AROUSED', 'boredom, fatigue,', 'missed events'], first='cool'); note(f, 552, 150, ['OVER-AROUSED', 'fixation, overload,', 'panic'], first='hot')
f.T(380, 326, 'The optimum is lower for complex or unfamiliar tasks than for simple, practised ones.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 21 stressors
f = Fig('hp-21', 'Sources of Stress — Stressors', 760, 340, 'Four groups of stressors feeding into a central total stress load',
    '<b>Stress is cumulative.</b> A <b>stressor</b> is anything that produces stress, and the effects of different stressors <b>add together</b>: a pilot already loaded by a domestic problem and a poor night’s sleep has less capacity left for a technical failure. <b>Environmental (physical)</b> stressors include heat, noise, vibration and low humidity. <b>Physiological</b> ones include fatigue, hunger and illness. <b>Psychological</b> stressors include fear, workload and time pressure. <b>Life stress</b> — bereavement, divorce, money, moving house — is carried into the cockpit. The comfortable cockpit is about 21°C with 40–60% relative humidity.')
f.box(290, 140, 180, 60, ['TOTAL STRESS', 'the effects add up'], c='gold', size=12)
g = (((30, 30), 'ENVIRONMENTAL', ['heat or cold, noise,', 'vibration, low humidity'], 'cool'), ((510, 30), 'PHYSIOLOGICAL', ['fatigue, lack of sleep,', 'hunger, illness'], 'green'),
     ((30, 240), 'PSYCHOLOGICAL', ['fear, workload,', 'time pressure'], 'hot'), ((510, 240), 'LIFE STRESS', ['bereavement, divorce,', 'money, family'], 'warm'))
for (x, y), ttl, lines, c_ in g:
    f.R(x, y, 220, 76, c=c_, sw=1.8, fill='g2'); f.T(x + 110, y + 24, ttl, 11, c_, 'middle', bold=True)
    for i, t in enumerate(lines): f.T(x + 110, y + 44 + i * 14, t, 9.5, 'dim', 'middle')
    f.L(x + (220 if x < 300 else 0), y + 38, 300 if x < 300 else 460, 170 + (-22 if y < 100 else 22), c_, 2, me=c_)
f.T(380, 108, 'stressors', 9.5, 'faint', 'middle')
HP.append(f)

# 18 digestive
f = Fig('hp-18', 'The Digestive System', 760, 350, 'A schematic of the digestive tract from mouth through oesophagus, stomach and intestines, with the liver and pancreas',
    '<b>Digestion turns food into fuel.</b> Food passes from the <b>mouth</b> down the <b>oesophagus</b> to the <b>stomach</b>, where acid and enzymes begin to break it down. Most nutrients are absorbed in the <b>small intestine</b>, helped by bile from the <b>liver</b> and enzymes from the <b>pancreas</b>; the <b>large intestine</b> recovers water. Carbohydrate becomes <b>glucose</b>, the brain’s only fuel: a missed meal can cause <b>hypoglycaemia</b> (low blood sugar) — headache, shakiness, poor concentration. For flight: gas in the gut <b>expands with altitude</b> (avoid fizzy drinks and gas-forming food), and <b>food poisoning</b> is a leading cause of in-flight incapacitation, which is why the two pilots eat different meals.')
f.El(140, 50, 26, 18, 'ink', 1.8, 'g3'); f.T(176, 54, 'mouth', 10, 'ink')
f.P('M140,68 L140,130', 'warm', 9); f.T(152, 104, 'oesophagus', 10, 'ink')
f.P('M130,130 C190,120 230,150 216,196 C200,226 150,220 132,196 Z', 'ink', 1.8, 'warm'); f.T(232, 168, 'stomach: acid and enzymes', 10, 'ink')
f.P('M40,130 C40,110 110,112 124,134 C116,160 60,164 40,150 Z', 'ink', 1.8, '#7a4a3a'); f.T(30, 184, 'liver: bile,', 10, 'ink'); f.T(30, 197, 'stores glycogen', 10, 'ink')
f.El(170, 228, 44, 9, 'ink', 1.4, 'gold'); f.T(224, 232, 'pancreas: enzymes, insulin', 10, 'ink')
f.P('M150,216 C120,236 96,240 96,256 C96,270 190,262 190,276 C190,290 96,284 96,298 C96,312 190,306 190,318', 'gold', 7)
f.T(204, 284, 'small intestine: absorbs nutrients', 10, 'ink')
f.P('M72,318 L72,246 Q72,236 82,236 M72,318 Q72,332 90,332 L206,332 Q222,332 222,318 L222,300', 'cool', 9)
f.T(236, 326, 'large intestine: recovers water', 10, 'ink')
note(f, 480, 60, ['Fuel', 'carbohydrate becomes glucose,', 'the brain’s only fuel'], first='gold')
note(f, 480, 130, ['Missed meals', 'low blood sugar: headache,', 'shakiness, poor concentration'], first='hot')
note(f, 480, 200, ['Altitude', 'gas in the gut expands:', 'avoid fizzy drinks before flight'], first='cool')
note(f, 480, 270, ['Food poisoning', 'a leading cause of in-flight', 'incapacitation'], first='hot')
HP.append(f)

# 24 information processing
f = Fig('hp-24', 'The Information-Processing Model', 760, 350, 'Boxes showing stimuli passing through the senses, sensory memory, perception, decision making and response, with attention, working memory, long-term memory and feedback',
    '<b>How a pilot turns a stimulus into an action.</b> The <b>senses</b> detect a stimulus and hold it briefly in <b>sensory memory</b> (about 1 second for sight, up to 8 for sound). <b>Perception</b> gives it meaning, coloured by experience and expectation. The <b>central decision-maker</b> then chooses a response — it is a <b>single channel</b>, handling one conscious decision at a time, so <b>attention</b> is the limiting resource. It draws on <b>working (short-term) memory</b>, which holds about <b>7 ± 2 items</b> for 10–20 seconds unless rehearsed, and on <b>long-term memory</b>. The <b>response</b> is carried out and <b>feedback</b> confirms the result, closing the loop.')
w = flow(f, [['STIMULI'], ['SENSES', 'receptors'], ['SENSORY', 'MEMORY'], ['PERCEPTION'], (['DECISION', 'one at a time'], 'gold'), ['RESPONSE']], 120, h=56, gap=18, size=10)
f.box(250, 30, 260, 40, ['ATTENTION: the limiting resource'], c='hot', size=10.5)
f.L(380, 70, 380, 118, 'hot', 1.8, me='hot')
f.box(330, 226, 170, 50, ['WORKING MEMORY', '7 ± 2 items, 10–20 s'], c='cool', size=10); f.box(520, 226, 150, 50, ['LONG-TERM MEMORY', 'knowledge and skills'], c='cool', size=10)
f.L(520, 226, 546, 178, 'cool', 1.6, me='cool', ms='cool'); f.L(610, 226, 580, 178, 'cool', 1.6, me='cool', ms='cool'); f.L(502, 251, 518, 251, 'cool', 1.6, me='cool', ms='cool')
f.P('M700,176 L700,312 L84,312 L84,178', 'green', 1.8, dash='7 4', me='green', join='round'); f.T(200, 304, 'FEEDBACK', 10, 'green', 'middle', bold=True)
f.T(380, 338, 'Perception is shaped by expectation: we tend to see what we expect to see.', 10, 'dim', 'middle')
HP.append(f)

# 28 geometric illusions
f = Fig('hp-28', 'Geometric Optical Illusions', 760, 330, 'Three classic illusions: two equal lines with arrow heads that look unequal, two equal bars between converging lines, and equal vertical and horizontal lines',
    '<b>The eye measures by comparison, and context fools it.</b> In the <b>Müller-Lyer</b> figure the two shafts are the same length, but the one with outward-pointing fins looks longer. In the <b>Ponzo</b> figure two identical bars lie between converging lines; the upper one looks longer because the brain reads the converging lines as depth — exactly the cue used to judge a runway on approach. In the <b>vertical–horizontal</b> illusion a vertical line looks longer than an equal horizontal one. The lesson for flying: judgements of size, distance and slope made by eye are unreliable when the surroundings are unfamiliar, so cross-check with instruments.')
f.T(130, 40, 'Müller-Lyer', 11, 'ink', 'middle', bold=True)
for y, out in ((110, True), (190, False)):
    f.L(60, y, 200, y, 'gold', 3)
    for x, s in ((60, -1), (200, 1)):
        d = (1 if out else -1) * s
        f.L(x, y, x + d * 20, y - 18, 'ink', 2); f.L(x, y, x + d * 20, y + 18, 'ink', 2)
f.T(130, 250, 'the gold lines are equal', 10, 'dim', 'middle')
f.T(380, 40, 'Ponzo', 11, 'ink', 'middle', bold=True)
f.L(300, 230, 360, 60, 'ink', 2); f.L(460, 230, 400, 60, 'ink', 2); f.L(345, 100, 415, 100, 'gold', 4); f.L(345, 200, 415, 200, 'gold', 4)
f.T(380, 250, 'the gold bars are equal', 10, 'dim', 'middle')
f.T(630, 40, 'Vertical–horizontal', 11, 'ink', 'middle', bold=True)
f.L(560, 220, 700, 220, 'gold', 3); f.L(630, 220, 630, 80, 'gold', 3)
f.T(630, 250, 'the two lines are equal', 10, 'dim', 'middle')
f.L(250, 30, 250, 260, 'line', 1, dash='3 5'); f.L(510, 30, 510, 260, 'line', 1, dash='3 5')
f.T(380, 296, 'Size and distance judged by eye depend on the surroundings.', 10.5, 'ink', 'middle', bold=True)
f.T(380, 314, 'The Ponzo effect is the same cue that makes an unusually narrow or sloping runway misleading.', 10, 'dim', 'middle')
HP.append(f)

# 29 impossible figure
f = Fig('hp-29', 'Impossible Figures', 760, 330, 'A Penrose triangle, which appears to be a solid three-dimensional object but could not exist',
    '<b>The brain insists on building a 3-D object from a 2-D picture.</b> An impossible figure such as the <b>Penrose triangle</b> is drawn so that each corner, taken alone, is a perfectly reasonable solid joint — yet the three corners cannot belong to the same object. The eye accepts each part and only notices the contradiction when it tries to follow the whole shape round. It shows that perception is an active <b>construction</b> based on assumptions, not a recording, and that the brain will happily supply a confident interpretation that is wrong. In flight the equivalent is building a convincing mental picture from incomplete cues and failing to test it.')
S3 = math.sqrt(3)
def LP(x, y, u=30, ox=130, oy=262): return (ox + u * (x + y / 2.0), oy - u * y * S3 / 2.0)
for pts, c_ in (([(1, 0), (7, 0), (6, 1), (2, 5), (2, 4), (5, 1), (0, 1)], 'gold'),
                ([(7, 1), (1, 7), (1, 6), (1, 2), (2, 2), (2, 5), (7, 0)], 'cool'),
                ([(0, 7), (0, 1), (1, 1), (5, 1), (4, 2), (1, 2), (1, 7)], 'warm')):
    poly(f, [LP(x, y) for x, y in pts], fill=c_, c='ink', sw=1.8, op=0.85)
f.T(250, 296, 'the Penrose triangle', 10.5, 'ink', 'middle', bold=True)
note(f, 440, 70, ['Each corner looks like a normal', 'solid right-angled joint.'], first='ink')
note(f, 440, 130, ['Together they cannot exist:', 'the three bars would have to', 'meet at right angles and still', 'close into a triangle.'], first='hot')
note(f, 440, 226, ['Perception is a construction.', 'The brain will supply a confident', 'picture from incomplete cues,', 'even when it is wrong.'], first='gold')
HP.append(f)

# 25 expectation
f = Fig('hp-25', 'Expectation — Seeing What We Expect', 760, 320, 'A triangle containing the words a bird in the the hand, with the word the repeated on two lines',
    '<b>Read the phrase in the triangle, then read it again word by word.</b> Most people read “a bird in the hand” and miss the repeated word, because the brain recognises a familiar pattern and <b>fills in what it expects</b> instead of processing what is actually there. This is <b>expectancy</b> (or “mental set”), and it is strongest when we are busy, tired or doing something routine. In the cockpit it produces the classic errors: hearing the clearance you expected, not the one given; seeing three greens because the gear is always down by now; reading back a frequency or level incorrectly without noticing. Defence: read the instrument, do not assume it — and cross-check with the other pilot.')
f.P('M200,270 L380,40 L560,270 Z', 'gold', 2.4, 'g3')
for y, t in ((140, 'A'), (176, 'BIRD'), (212, 'IN THE'), (248, 'THE HAND')): f.T(380, y, t, 20, 'ink', 'middle', bold=True)
note(f, 40, 70, ['What do you read?', 'Most people see the', 'familiar saying and', 'miss the extra word.'], first='ink')
note(f, 590, 70, ['In the cockpit:', 'hearing the clearance', 'you expected; seeing', 'what is usually there.'], first='hot')
f.T(380, 304, 'We tend to perceive what we expect, not what is there. Read it; do not assume it.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 49 basic T
def gauge(f, cx, cy, r, lab, c_='ink', ang=None, fill='g3'):
    f.Ci(cx, cy, r, c_, 2, fill)
    if ang is not None: t = pol(cx, cy, r - 6, ang); f.L(cx, cy, t[0], t[1], 'white', 2.4, cap='round')
    f.Ci(cx, cy, 3, 'ink', 1, 'white')
    if lab: f.T(cx, cy + r + 15, lab, 9.5, 'dim', 'middle')
f = Fig('hp-49', 'The Basic-T Instrument Layout & Scan', 760, 350, 'Six flight instruments in two rows with the four forming a T highlighted and scan arrows radiating from the attitude indicator',
    '<b>The standard layout puts the key instruments where the eye needs them.</b> The <b>attitude indicator</b> is top centre — it is the master instrument and the hub of the scan. The <b>airspeed indicator</b> is to its left, the <b>altimeter</b> to its right and the <b>heading indicator</b> directly below: together they form the <b>basic T</b>, the same in every aircraft so that a pilot’s scan transfers between types. The turn co-ordinator and vertical speed indicator fill the lower corners. The usual scan is <b>selective radial</b>: start at the attitude indicator, glance out to one instrument, return to the attitude indicator, then out to the next.')
pos = {'ASI': (220, 90), 'AI': (380, 90), 'ALT': (540, 90), 'TC': (220, 246), 'HI': (380, 246), 'VSI': (540, 246)}
f.P('M150,30 L610,30 L610,166 L450,166 L450,318 L310,318 L310,166 L150,166 Z', 'gold', 1.6, 'gold', op=0.12)
f.P('M150,30 L610,30 L610,166 L450,166 L450,318 L310,318 L310,166 L150,166 Z', 'gold', 1.8, dash='7 4')
names = {'ASI': 'airspeed', 'AI': 'attitude', 'ALT': 'altimeter', 'TC': 'turn co-ordinator', 'HI': 'heading', 'VSI': 'vertical speed'}
for k, (x, y) in pos.items():
    gauge(f, x, y, 44, None, 'ink', {'ASI': 220, 'ALT': 40, 'TC': 0, 'HI': 0, 'VSI': 270}.get(k))
    f.T(x + (12 if k == 'AI' else 0), y + 60, names[k], 9.5, 'dim', 'start' if k == 'AI' else 'middle')
x, y = pos['AI']; f.raw(f'<defs><clipPath id="t49"><circle cx="{x}" cy="{y}" r="42"/></clipPath></defs><g clip-path="url(#t49)"><rect x="{x-44}" y="{y-44}" width="88" height="44" fill="{C["sky"]}"/><rect x="{x-44}" y="{y}" width="88" height="44" fill="{C["gnd"]}"/></g>')
f.L(x - 22, y, x + 22, y, 'gold', 3)
for k in ('ASI', 'ALT', 'HI'):
    a, b = pos['AI'], pos[k]; dx, dy = b[0] - a[0], b[1] - a[1]; L_ = math.hypot(dx, dy)
    f.L(a[0] + dx / L_ * 50, a[1] + dy / L_ * 50, b[0] - dx / L_ * 50, b[1] - dy / L_ * 50, 'hot', 2, me='hot', ms='hot')
f.T(660, 60, 'the basic T', 10.5, 'gold', 'middle', bold=True); f.T(660, 76, '(shaded)', 9.5, 'gold', 'middle')
note(f, 30, 250, ['Selective radial scan:', 'attitude, out to one', 'instrument, back to', 'attitude, then the next.'], first='hot')
f.T(380, 342, 'The attitude indicator is the centre of the scan.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 50 three pointer altimeter
f = Fig('hp-50', 'Three-Pointer Altimeter — The 10 000 ft Misreading', 760, 340, 'A three pointer altimeter face reading thirteen thousand four hundred and sixty feet, with a small pointer for tens of thousands that is easily missed',
    '<b>A notorious design-induced error.</b> The three-pointer altimeter uses a <b>long</b> pointer for hundreds of feet, a <b>short</b> pointer for thousands and a <b>third, very small</b> pointer for <b>tens of thousands</b>. The small pointer is easily overlooked or hidden by the others, so the instrument can be misread by exactly <b>10 000 ft</b> — and it has caused fatal accidents, with crews descending into terrain believing they were 10 000 ft higher. The reading here is <b>13 460 ft</b>; a hurried glance gives 3 460 ft. Modern altimeters fix it with a <b>counter-pointer</b> display (digits for thousands, one pointer for hundreds) and a striped low-altitude flag below 10 000 ft.')
cx, cy = 210, 170
f.Ci(cx, cy, 124, 'ink', 2.4, 'black')
for i in range(50):
    a = i * 7.2; p, q = pol(cx, cy, 112 if i % 5 else 104, a), pol(cx, cy, 122, a); f.L(p[0], p[1], q[0], q[1], 'white', 1.8 if i % 5 == 0 else 0.9)
for i in range(10): x, y = pol(cx, cy, 88, i * 36); f.T(x, y + 5, str(i), 14, 'white', 'middle', bold=True, check=False)
t = pol(cx, cy, 100, 4.6 * 36); f.L(cx, cy, t[0], t[1], 'white', 3, cap='round')
t = pol(cx, cy, 64, 3.46 * 36); f.L(cx, cy, t[0], t[1], 'white', 7, cap='round')
t = pol(cx, cy, 44, 1.346 * 36); f.L(cx, cy, t[0], t[1], 'hot', 3, cap='round'); f.P(f'M{t[0]:.1f},{t[1]-7:.1f} L{t[0]+7:.1f},{t[1]+5:.1f} L{t[0]-7:.1f},{t[1]+5:.1f} Z', 'hot', 1, 'hot')
f.Ci(cx, cy, 7, 'ink', 1.2, 'steel')
f.badge(390, 70, 1); f.badge(390, 130, 2); f.badge(390, 190, 3)
for (y, ttl, d, c_) in ((70, 'Long pointer: hundreds of feet', 'reads 460', 'ink'), (130, 'Short, broad pointer: thousands', 'reads 3 (thousand)', 'ink'), (190, 'Smallest pointer: tens of thousands', 'reads 1 (ten thousand): easily missed', 'hot')):
    f.T(408, y - 1, ttl, 11, c_, bold=True); f.T(408, y + 13, d, 9.5)
f.R(396, 230, 340, 70, c='gold', sw=1.6, fill='g2')
f.T(566, 254, 'correct reading: 13 460 ft', 12, 'green', 'middle', bold=True); f.T(566, 274, 'misread as: 3 460 ft', 12, 'hot', 'middle', bold=True); f.T(566, 291, 'an error of exactly 10 000 ft', 9.5, 'dim', 'middle')
HP.append(f)

# 51 glass cockpit PFD
f = Fig('hp-51', 'Glass-Cockpit Primary Flight Display', 760, 350, 'An electronic primary flight display with the attitude display in the centre, a speed tape on the left, an altitude tape on the right and a heading scale below',
    '<b>The basic T, rebuilt on one screen.</b> The <b>attitude display</b> stays in the centre. The round airspeed dial becomes a vertical <b>speed tape</b> on the left and the altimeter an <b>altitude tape</b> on the right, each with a fixed window showing the current value in digits; heading runs along the bottom and vertical speed down the right edge. The advantages are a compact scan and extra cues (trend arrows, speed limits, flight-mode annunciations). The cost is that a <b>moving tape gives rate and trend information less intuitively than a pointer</b> sweeping round a dial, and that the flight-mode annunciator must be read deliberately — mode confusion is the characteristic error of the glass cockpit.')
f.R(40, 20, 380, 310, c='line', sw=2, fill='black', rx=12)
f.R(60, 34, 340, 22, c='#3b474d', sw=1, fill='#232b30', rx=2)
for i, t in enumerate(('SPD', 'ALT', 'HDG')): f.T(117 + i * 113, 50, t, 10, '#7ccf6a', 'middle', mono=True, bold=True)
f.R(60, 70, 56, 200, c='#3b474d', sw=1, fill='#232b30', rx=2); f.R(344, 70, 56, 200, c='#3b474d', sw=1, fill='#232b30', rx=2)
for i, v in enumerate((160, 140, 120, 100)): f.T(88, 100 + i * 48, str(v), 11, 'white', 'middle', mono=True, check=False)
for i, v in enumerate(('60', '50', '40', '30')): f.T(372, 100 + i * 48, v, 11, 'white', 'middle', mono=True, check=False)
f.R(56, 158, 64, 24, c='gold', sw=1.6, fill='black', rx=2); f.T(88, 175, '132', 12, 'white', 'middle', bold=True, mono=True, check=False)
f.R(340, 158, 64, 24, c='gold', sw=1.6, fill='black', rx=2); f.T(372, 175, '4500', 12, 'white', 'middle', bold=True, mono=True, check=False)
f.raw(f'<defs><clipPath id="p51"><rect x="130" y="76" width="200" height="188" rx="46"/></clipPath></defs><g clip-path="url(#p51)"><rect x="130" y="76" width="200" height="94" fill="{C["sky"]}"/><rect x="130" y="170" width="200" height="94" fill="{C["gnd"]}"/><line x1="130" y1="170" x2="330" y2="170" stroke="#fff" stroke-width="2"/></g>')
for dy in (-34, 34): f.L(206, 170 + dy, 254, 170 + dy, 'white', 1.4)
f.L(160, 170, 206, 170, 'gold', 4); f.L(254, 170, 300, 170, 'gold', 4); f.R(225, 165, 10, 10, c='gold', sw=1.6, fill='black', rx=0)
f.R(130, 284, 200, 28, c='#3b474d', sw=1, fill='#232b30', rx=2)
for i, v in enumerate(('08', '09', '10')): f.T(180 + i * 50, 303, v, 10, 'white', 'middle', mono=True, check=False)
f.P('M230,284 L224,274 L236,274 Z', 'gold', 1, 'gold')
f.badge(26, 45, 1); f.badge(26, 170, 2); f.badge(230, 110, 3); f.badge(434, 170, 4); f.badge(434, 298, 5)
f.L(36, 45, 58, 45, 'gold', 1); f.L(36, 170, 54, 170, 'gold', 1); f.L(424, 170, 406, 170, 'gold', 1); f.L(424, 298, 332, 298, 'gold', 1)
f.legend(476, 60, [(1, 'Flight-mode annunciator', 'what the automation is doing'), (2, 'Speed tape', 'current speed in the window'), (3, 'Attitude display', 'pitch and roll: centre of the scan'),
                   (4, 'Altitude tape', 'current altitude in the window'), (5, 'Heading scale', 'heading under the pointer')], step=48)
f.T(600, 318, 'Tapes show trend less intuitively than pointers.', 9.5, 'dim', 'middle')
HP.append(f)

# 52 odd gauge
f = Fig('hp-52', 'Pattern Scanning — Spotting the Odd Gauge', 760, 330, 'Two panels of eight gauges: one with all needles pointing the same way except one, and one with needles in random positions',
    '<b>The eye is very good at spotting the one that does not fit.</b> If a bank of gauges is arranged so that every needle points the <b>same way</b> when things are normal — typically 9 o’clock or 12 o’clock — then an abnormal reading stands out instantly as a break in the pattern, and the whole panel can be checked at a glance without reading a single number. If each gauge’s normal position is different, every one must be read and compared with a remembered value, which is slow and error-prone. This is why engine instruments are aligned on multi-engine aircraft and why pilots cross-check “all needles matched”.')
def panel(x0, ttl, sub, aligned):
    f.R(x0, 50, 330, 200, c='line', sw=1.4, fill='g2', rx=8); f.T(x0 + 165, 36, ttl, 11, 'ink', 'middle', bold=True); f.T(x0 + 165, 274, sub, 10, 'dim', 'middle')
    rnd = [20, 250, 130, 320, 80, 200, 290, 160]
    for i in range(8):
        cx, cy = x0 + 48 + (i % 4) * 78, 100 + (i // 4) * 96
        odd = (i == 5)
        gauge(f, cx, cy, 30, None, 'hot' if (odd and aligned) else 'ink', (60 if odd else 0) if aligned else rnd[i])
panel(30, 'needles aligned when normal', 'the odd one is seen at a glance', True); panel(400, 'normal positions all different', 'each gauge must be read individually', False)
f.T(380, 308, 'Arrange instruments so that “normal” makes a pattern: abnormal then breaks it.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 01 accident trend
f = Fig('hp-01', 'Airline Accident Rate Over Time', 760, 340, 'A graph of the airline accident rate falling steeply from the nineteen fifties and then levelling off',
    '<b>Flying became dramatically safer, then the improvement slowed.</b> The accident rate per million departures fell steeply through the 1950s and 1960s as jet engines, pressurisation, radar and better navigation aids removed many <b>technical</b> causes. From about the 1970s the curve <b>flattened</b>: the aircraft had become so reliable that the remaining accidents were mostly due to <b>people</b> — the crew, and the organisation behind them. Because traffic keeps growing, a flat <b>rate</b> would mean a rising <b>number</b> of accidents, so further gains have to come from human factors: crew resource management, better procedures, error-tolerant design and safety management.')
axes(f, 100, 270, 700, 50, 'year', 'accidents per million departures')
pl(f, ' '.join(f'{100 + i * 5.8:.1f},{270 - (200 * math.exp(-i / 14.0) + 14):.1f}' for i in range(0, 101)), 'hot', 2.8)
for i, y in enumerate(('1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020')): x = 100 + i * 82.8; f.L(x, 270, x, 275, 'ink', 1); f.T(x, 288, y, 9.5, 'dim', 'middle')
f.R(100, 56, 170, 214, c='none', sw=0, fill='cool', rx=0, op=0.12); f.R(270, 56, 420, 214, c='none', sw=0, fill='gold', rx=0, op=0.08)
note(f, 286, 90, ['Technical improvements', 'jets, radar, navigation aids,', 'reliability'], first='cool')
note(f, 470, 170, ['Rate levels off', 'the remaining accidents are', 'mainly human factors'], first='gold')
f.T(380, 326, 'Shape of the trend only; not to scale.', 9.5, 'faint', 'middle')
HP.append(f)

# 03 causes
f = Fig('hp-03', 'Causes of Accidents — The Human Factor', 760, 320, 'A horizontal bar divided to show that about seventy percent of accidents involve human factors, with the rest technical or environmental',
    '<b>About 70% of aircraft accidents are attributed to human factors</b> — the proportion usually quoted is 70–75%. The remainder are mainly <b>technical</b> failures and <b>environmental</b> causes such as weather. The human share is so large not because pilots have become worse but because the machine has become so reliable. And “human factors” is wider than pilot error: it includes maintenance, air traffic control, design, training and management. Most accidents have <b>several contributing causes</b> in a chain, and breaking any one link would have prevented them — which is the whole purpose of studying human performance.')
f.R(60, 90, 448, 60, c='hot', sw=1.4, fill='hot', rx=6, op=0.8); f.R(508, 90, 112, 60, c='cool', sw=1.4, fill='cool', rx=0, op=0.8); f.R(620, 90, 80, 60, c='gold', sw=1.4, fill='gold', rx=6, op=0.8)
f.T(284, 118, 'HUMAN FACTORS', 13, 'white', 'middle', bold=True, check=False); f.T(284, 136, 'about 70%', 11, 'white', 'middle', check=False)
f.T(564, 174, 'technical', 10, 'cool', 'middle', bold=True); f.T(660, 174, 'environment', 10, 'gold', 'middle', bold=True)
f.T(380, 60, 'share of accidents by main cause (approximate)', 10.5, 'ink', 'middle', bold=True)
flow(f, [['flight crew'], ['maintenance'], ['air traffic control'], ['design'], ['management']], 226, h=36, gap=14, size=10, c='hot')
f.T(380, 212, '“human factors” covers everyone in the system:', 10, 'dim', 'middle')
f.T(380, 296, 'Accidents usually have several causes in a chain; breaking one link prevents them.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 04 swiss cheese
f = Fig('hp-04', 'The Swiss-Cheese Model (Reason)', 760, 340, 'Four slices with holes representing layers of defence, and a line passing through holes that happen to line up, ending in an accident',
    '<b>Accidents happen when the holes line up.</b> James Reason pictured an organisation’s defences as slices of Swiss cheese. Each layer — <b>organisational decisions</b>, <b>supervision</b>, the <b>preconditions</b> of the day (fatigue, weather, pressure) and the <b>acts of the crew</b> — has weaknesses, the holes. Usually a hazard that passes one layer is stopped by the next. An accident needs holes in <b>every</b> layer to align at once. <b>Latent failures</b> are holes created long before, by designers and managers, lying dormant; <b>active failures</b> are the errors and violations of front-line people, with immediate effect. Blaming the last person in the chain leaves the latent holes in place.')
slices = (('Organisation', 'latent failures', 140), ('Supervision', 'latent failures', 280), ('Preconditions', 'fatigue, weather', 420), ('Unsafe acts', 'active failures', 560))
holes = {140: [(0, 0), (-14, -52), (14, 48)], 280: [(0, -13), (-16, 42), (14, -58)], 420: [(0, -27), (14, 32), (-14, 58)], 560: [(0, -40), (-14, 22), (12, 60)]}
for ttl, sub, x in slices:
    f.raw(f'<g transform="translate({x} 150) skewY(-12)"><rect x="-34" y="-84" width="68" height="168" rx="8" fill="{col("gold")}" opacity=".75" stroke="{col("ink")}" stroke-width="1.4"/>' +
          ''.join(f'<ellipse cx="{dx}" cy="{dy}" rx="9" ry="11" fill="{col("bg")}" stroke="{col("ink")}" stroke-width="1"/>' for dx, dy in holes[x]) + '</g>')
    f.T(x, 262, ttl, 10.5, 'ink', 'middle', bold=True); f.T(x, 277, sub, 9.5, 'dim', 'middle')
f.L(40, 160, 656, 100, 'hot', 2.6, me='hot'); f.T(40, 182, 'hazard', 10.5, 'hot', bold=True)
f.P('M668,88 L688,108 M688,88 L668,108', 'hot', 3.4); f.T(700, 132, 'ACCIDENT', 11, 'hot', 'middle', bold=True)
f.T(380, 306, 'A hazard is normally stopped by the next layer. An accident needs a hole in every layer at once.', 10.5, 'ink', 'middle', bold=True)
f.T(380, 326, 'Latent failures: created earlier, lie dormant.  Active failures: errors at the sharp end.', 10, 'dim', 'middle')
HP.append(f)

# 54 error tolerant
f = Fig('hp-54', 'Error-Tolerant vs Vulnerable Systems', 760, 330, 'Two flow diagrams: in a vulnerable system an error leads straight to an accident, in an error-tolerant system the error is detected and corrected',
    '<b>People will always make errors; a good system survives them.</b> In a <b>vulnerable</b> system a single error leads straight to an unsafe outcome — nothing stands between the slip and the accident. An <b>error-tolerant</b> system is designed on the assumption that errors will occur: it makes them <b>hard to commit</b> (guards, interlocks, clear design), <b>easy to detect</b> (warnings, cross-checks by a second pilot, checklists) and <b>recoverable</b> before harm is done (margins, time to correct). Examples: the gear lever that cannot be raised on the ground, the altitude alerter, the read-back of a clearance, the two-pilot challenge-and-response checklist.')
f.T(40, 46, 'VULNERABLE SYSTEM', 11, 'hot', bold=True)
flow(f, [(['error'], 'hot'), (['no defence'], 'dim'), (['ACCIDENT'], 'hot')], 60, h=44, x0=40, w=200, gap=40, size=11)
f.T(40, 166, 'ERROR-TOLERANT SYSTEM', 11, 'green', bold=True)
flow(f, [(['error'], 'hot'), (['DETECTED', 'warning, cross-check'], 'gold'), (['CORRECTED', 'safe outcome'], 'green')], 180, h=50, x0=40, w=200, gap=40, size=11)
f.P('M380,232 L380,256 L140,256 L140,234', 'green', 1.6, dash='6 4', me='green', join='round'); f.T(260, 272, 'time and margin to recover', 9.5, 'green', 'middle')
f.T(380, 306, 'Design for error: make it hard to commit, easy to detect and possible to recover from.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 55 design induced error
f = Fig('hp-55', 'Design-Induced Error — Control/Display Compatibility', 760, 340, 'Two layouts of four displays and four controls: one where the controls do not match the layout of the displays and one where they do',
    '<b>Good design makes the right action the natural one.</b> When the arrangement of the <b>controls</b> matches the arrangement of the <b>displays</b> they affect (<b>spatial compatibility</b>), the pilot reaches for the correct one without thinking. When it does not — four displays in a square but their knobs in a row — the pilot has to remember an arbitrary mapping, and under stress will sooner or later operate the wrong one. Controls should also move in the <b>expected direction</b> (forward or up for “more”), and controls that must not be confused should <b>feel different</b> — hence the wheel-shaped gear lever and the flap-shaped flap lever. Errors invited by the equipment are <b>design-induced</b>.')
def layout(x0, ttl, good):
    f.T(x0 + 150, 40, ttl, 11, 'green' if good else 'hot', 'middle', bold=True)
    labs = ('A', 'B', 'C', 'D'); dp = [(x0 + 100, 90), (x0 + 200, 90), (x0 + 100, 170), (x0 + 200, 170)]
    for (x, y), l in zip(dp, labs): f.R(x - 34, y - 28, 68, 56, c='ink', sw=1.6, fill='g3', rx=6); f.T(x, y + 5, l, 14, 'ink', 'middle', bold=True)
    kp = [(x0 + 100, 250), (x0 + 200, 250), (x0 + 100, 296), (x0 + 200, 296)] if good else [(x0 + 60 + i * 60, 270) for i in range(4)]
    order = labs if good else ('C', 'A', 'D', 'B')
    for (x, y), l in zip(kp, order): f.Ci(x, y, 16, 'gold', 2, 'g2'); f.T(x, y + 4, l, 11, 'gold', 'middle', bold=True)
    f.T(x0 + 280, 96, 'displays', 9.5, 'dim'); f.T(x0 + 280, 276, 'controls', 9.5, 'dim')
layout(20, 'POOR: controls do not match the displays', False); layout(390, 'GOOD: controls mirror the displays', True)
f.L(380, 30, 380, 320, 'line', 1, dash='3 5')
f.T(190, 326, 'which knob works display C? it must be remembered', 9.5, 'hot', 'middle'); f.T(560, 326, 'each control sits where its display is', 9.5, 'green', 'middle')
HP.append(f)

# 26 Maslow
f = Fig('hp-26', "Maslow's Hierarchy of Needs", 760, 340, 'A pyramid of five levels of human need from physiological at the base to self-fulfilment at the top',
    '<b>Needs are satisfied from the bottom up.</b> Maslow arranged human motivation as a hierarchy: a person is driven first by <b>physiological</b> needs (air, food, water, sleep), then <b>safety and security</b>, then <b>belonging</b> (love, acceptance by the group), then <b>esteem</b> (respect, recognition, self-respect) and finally <b>self-fulfilment</b> (achieving one’s potential — “self-actualisation”). A lower need must be reasonably satisfied before the next one becomes a motivator, and if a lower need is threatened attention drops back to it. A crew member who is exhausted, frightened or feels excluded is not going to be motivated by pride in the job.')
lv = (('SELF-FULFILMENT', 'achieving potential', 'gold'), ('ESTEEM', 'respect, recognition', 'warm'), ('BELONGING', 'love, acceptance', 'green'), ('SAFETY', 'security, stability', 'cool'), ('PHYSIOLOGICAL', 'air, food, water, sleep', 'hot'))
for i, (a, b, c_) in enumerate(lv):
    y0, y1 = 40 + i * 50, 90 + i * 50; w0, w1 = 30 + i * 50, 80 + i * 50
    poly(f, [(280 - w0, y0), (280 + w0, y0), (280 + w1, y1), (280 - w1, y1)], fill=c_, c='ink', sw=1.4, op=0.75)
    f.L(280 + (w0 + w1) / 2 + 6, (y0 + y1) / 2, 560, (y0 + y1) / 2, 'dim', 1); f.T(566, (y0 + y1) / 2 - 2, a, 10.5, c_, bold=True); f.T(566, (y0 + y1) / 2 + 12, b, 9.5)
f.L(40, 280, 40, 60, 'ink', 1.6, me='ink'); f.T(28, 170, 'satisfied in this order', 9.5, 'dim', 'middle', rot=-90)
f.T(380, 318, 'A lower need must be met before the next becomes a motivator.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 27 motivation model
f = Fig('hp-27', 'Motivation — Effort, Performance & Reward', 760, 320, 'A loop from effort to performance to reward to satisfaction, feeding back into effort',
    '<b>People put in effort when they expect it to pay off.</b> In this model <b>effort</b> leads to <b>performance</b> only if the person also has the <b>ability</b> and understands the task. Performance leads to a <b>reward</b> — <b>extrinsic</b> (pay, promotion, praise) or <b>intrinsic</b> (the satisfaction of a job well done). If the reward is seen as fair and worth having it produces <b>satisfaction</b>, which feeds back and strengthens the willingness to make the effort next time. Break any link — no ability, no recognition, a reward that is not valued — and motivation falls. Performance is roughly ability multiplied by motivation; too much motivation (“press-on-itis”) is as dangerous as too little.')
w = flow(f, [(['EFFORT'], 'gold'), (['PERFORMANCE'], 'ink'), (['REWARD', 'extrinsic or intrinsic'], 'green'), (['SATISFACTION'], 'cool')], 110, h=60, gap=34, size=11.5)
f.box(214, 30, 150, 40, ['ability + task clarity'], c='dim', size=10); f.L(289, 70, 289, 108, 'dim', 1.6, me='dim')
f.P('M651,172 L651,230 L109,230 L109,172', 'cool', 1.8, dash='7 4', me='cool', join='round'); f.T(380, 222, 'satisfaction strengthens the will to make the effort again', 10, 'cool', 'middle')
f.T(380, 268, 'performance = ability × motivation', 12, 'gold', 'middle', bold=True)
f.T(380, 296, 'Too little motivation: complacency.  Too much: “press-on-itis”, taking risks to finish the job.', 10, 'dim', 'middle')
HP.append(f)

# 44 somatotypes
f = Fig('hp-44', 'Somatotypes — Body Types', 760, 330, 'Three simple body outlines: round endomorph, muscular mesomorph and thin ectomorph',
    '<b>Sheldon’s three body types.</b> The <b>endomorph</b> is round and soft with a tendency to store fat; the <b>mesomorph</b> is muscular and broad-shouldered; the <b>ectomorph</b> is thin and lightly built. Sheldon believed each type went with a temperament — easy-going, assertive and reserved respectively — but that link is <b>not supported by evidence</b> and is no longer accepted. What does matter in aviation is body <b>size</b>: cockpits are designed by <b>anthropometry</b> to fit the range from the 5th to the 95th percentile, and the seat is adjusted to bring every pilot’s eyes to the <b>design eye position</b>. Body mass index (weight ÷ height²) over 30 is classed as obese, a risk factor for heart disease and diabetes.')
def body(cx, hw, sw_, ww, ttl, sub, c_):
    f.Ci(cx, 70, 18, 'ink', 1.6, 'g3')
    f.P(f'M{cx-sw_},{96} Q{cx},{90} {cx+sw_},{96} L{cx+ww},{180} Q{cx+hw},{196} {cx+hw*0.7},{250} L{cx-hw*0.7},{250} Q{cx-hw},{196} {cx-ww},{180} Z', 'ink', 1.8, c_, op=0.8)
    f.T(cx, 278, ttl, 11.5, 'ink', 'middle', bold=True); f.T(cx, 294, sub, 9.5, 'dim', 'middle')
body(140, 58, 40, 58, 'ENDOMORPH', 'round, soft, stores fat', 'gold'); body(380, 34, 62, 30, 'MESOMORPH', 'muscular, broad shoulders', 'hot'); body(620, 22, 28, 20, 'ECTOMORPH', 'thin, lightly built', 'cool')
f.T(380, 320, 'The supposed link between body type and personality is not supported by evidence.', 10.5, 'ink', 'middle', bold=True)
f.T(380, 34, 'Cockpits are sized for the 5th to 95th percentile of body dimensions.', 10, 'dim', 'middle')
HP.append(f)

# 45 Eysenck
f = Fig('hp-45', "Eysenck's Personality Dimensions", 760, 350, 'Two crossed axes, extravert to introvert and stable to unstable, giving four quadrants',
    '<b>Two independent scales describe personality.</b> Eysenck measured it along an <b>extravert–introvert</b> axis (outgoing and sociable, or quiet and reserved) and a <b>stable–unstable</b> axis (calm and even-tempered, or anxious and moody; the unstable end is also called neurotic). The four quadrants correspond to the classical temperaments. The <b>stable extravert</b> — sociable, easy-going, responsive — is the type most often associated with a good pilot and crew member, though a stable introvert is equally safe. Personality is largely fixed by early adulthood and changes little; <b>attitudes</b> and <b>behaviour</b>, by contrast, can be changed by training.')
f.L(380, 40, 380, 310, 'ink', 1.8, me='ink', ms='ink'); f.L(120, 175, 640, 175, 'ink', 1.8, me='ink', ms='ink')
f.T(380, 30, 'UNSTABLE (anxious)', 10.5, 'hot', 'middle', bold=True); f.T(380, 330, 'STABLE (calm)', 10.5, 'green', 'middle', bold=True)
f.T(112, 179, 'INTROVERT', 10.5, 'cool', 'end', bold=True); f.T(648, 179, 'EXTRAVERT', 10.5, 'gold', bold=True)
q = ((510, 100, 'touchy, restless, aggressive,', 'excitable, impulsive', 'ink'), (250, 100, 'moody, anxious, rigid,', 'pessimistic, reserved', 'ink'),
     (250, 240, 'calm, reliable, controlled,', 'thoughtful, careful', 'ink'), (510, 240, 'sociable, easy-going, lively,', 'responsive, leadership', 'green'))
for x, y, a, b, c_ in q: f.T(x, y, a, 10, c_, 'middle', bold=(c_ == 'green')); f.T(x, y + 15, b, 10, c_ if c_ == 'green' else 'dim', 'middle')
f.R(396, 196, 228, 96, c='green', sw=1.4, fill='none', rx=8, dash='6 4'); f.T(510, 284, 'the “ideal pilot” quadrant', 9.5, 'green', 'middle')
HP.append(f)

# 46 leadership grid
f = Fig('hp-46', 'Leadership Styles — Goal vs Person Orientation', 760, 350, 'A two by two grid of leadership styles with concern for the goal on one axis and concern for people on the other',
    '<b>Two things a commander must care about.</b> <b>Goal-directed (G)</b> behaviour is concern for getting the task done; <b>person-directed (P)</b> behaviour is concern for the people doing it. A leader high on both, <b>P+ G+</b>, is the ideal: the job is done and the crew are involved and willing to speak up. <b>P− G+</b> is the <b>autocrat</b>: efficient but overbearing, the crew stop offering information. <b>P+ G−</b> is too <b>democratic</b>: a pleasant atmosphere but no direction and decisions drift. <b>P− G−</b> is <b>laissez-faire</b>: the leader has opted out. A good commander shifts style with the situation — more directive in an emergency, more consultative when time allows.')
x0, y0, s = 250, 290, 120
f.L(x0, y0, x0, 34, 'ink', 1.6, me='ink'); f.L(x0, y0, x0 + 280, y0, 'ink', 1.6, me='ink')
cells = ((0, 1, 'P+ G−', 'democratic', 'too friendly, no direction', 'cool'), (1, 1, 'P+ G+', 'IDEAL', 'task done, crew involved', 'green'), (0, 0, 'P− G−', 'laissez-faire', 'leader has opted out', 'dim'), (1, 0, 'P− G+', 'autocratic', 'efficient but overbearing', 'hot'))
for cx_, cy_, code, nm, d, c_ in cells:
    x, y = x0 + 8 + cx_ * 130, y0 - 8 - (cy_ + 1) * 120
    f.R(x, y, 122, 112, c=c_, sw=1.8, fill='g2'); f.T(x + 61, y + 34, code, 14, c_ if c_ != 'dim' else 'ink', 'middle', bold=True, mono=True); f.T(x + 61, y + 58, nm, 11, 'ink', 'middle', bold=True)
    for i, t in enumerate((d[:d.index(',') + 1], d[d.index(',') + 2:]) if ',' in d else (d, '')): f.T(x + 61, y + 78 + i * 13, t, 9, 'dim', 'middle')
f.T(x0 + 140, 320, 'concern for the GOAL (G) →', 10, 'ink', 'middle', bold=True); f.T(226, 160, 'concern for PEOPLE (P) →', 10, 'ink', 'middle', bold=True, rot=-90)
note(f, 560, 80, ['Ideal: P+ G+', 'adapts to the situation:', 'directive in an emergency,', 'consultative when there', 'is time.'], first='green')
note(f, 30, 80, ['G = goal-directed', '(the task)'], first='ink'); note(f, 30, 130, ['P = person-directed', '(the crew)'], first='ink')
HP.append(f)

# 47 authority gradient
f = Fig('hp-47', 'Cockpit Authority Gradient', 760, 330, 'Three pairs of captain and first officer with a line between them that is too steep, about right and too flat',
    '<b>The “slope” of authority between the two pilots.</b> A gradient that is <b>too steep</b> — a domineering captain and a timid or very junior first officer — stops the first officer questioning a mistake; many accidents show a co-pilot who saw the error and said nothing, or said it too gently. A gradient that is <b>too flat</b> — two captains together, or a captain who will not lead — means nobody takes the decision, or both act at once. The <b>optimum</b> is a moderate slope: the captain is clearly in command but the first officer feels free, and is expected, to speak up. Captains set it by inviting input; first officers keep it by stating concerns clearly.')
def pair(cx, dy, ttl, l1, l2, c_):
    yc, yf = 150 - dy, 150 + dy
    f.L(cx - 60, yc, cx + 60, yf, c_, 3)
    f.Ci(cx - 60, yc - 14, 12, 'ink', 1.6, 'g3'); f.R(cx - 74, yc, 28, 30, c='ink', sw=1.6, fill='g3', rx=6); f.T(cx - 60, yc + 50, 'Captain', 9.5, 'dim', 'middle')
    f.Ci(cx + 60, yf - 14, 12, 'ink', 1.6, 'g3'); f.R(cx + 46, yf, 28, 30, c='ink', sw=1.6, fill='g3', rx=6); f.T(cx + 60, yf + 50, 'F/O', 9.5, 'dim', 'middle')
    f.T(cx, 44, ttl, 11, c_, 'middle', bold=True); f.T(cx, 266, l1, 10, 'ink', 'middle', bold=True); f.T(cx, 282, l2, 9.5, 'dim', 'middle')
pair(130, 50, 'TOO STEEP', 'F/O will not challenge', 'autocratic captain', 'hot'); pair(380, 18, 'OPTIMUM', 'clear command, open input', 'F/O speaks up', 'green'); pair(630, 0, 'TOO FLAT', 'nobody decides', 'no clear leader', 'cool')
f.T(380, 314, 'The captain sets the gradient; the first officer maintains it by speaking up clearly.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

# 48 SHELL
f = Fig('hp-48', 'The SHELL Model', 760, 350, 'A central block labelled liveware surrounded by four blocks: software, hardware, environment and liveware',
    '<b>Human factors is about interfaces.</b> In the SHELL model the human operator — <b>Liveware</b> — is at the centre, and must fit with four surrounding elements. <b>L–S, Software</b>: procedures, checklists, manuals, symbology. <b>L–H, Hardware</b>: the machine — seats, controls, displays. <b>L–E, Environment</b>: noise, temperature, weather, time of day, the organisation’s climate. <b>L–L, Liveware</b>: other people — crew, ATC, ground staff. The edges of the blocks are drawn <b>ragged</b> because people vary; the other elements must be matched to the human, not the other way round. A mismatch at any interface is where human error arises. (Hawkins’ model, developed from Edwards.)')
c = (380, 170); s = 96
def blk(x, y, letter, name, sub, c_):
    f.R(x - 48, y - 40, 96, 80, c=c_, sw=2.2, fill='g2', rx=4, dash='10 3 3 3'); f.T(x, y - 4, letter, 26, c_, 'middle', bold=True); f.T(x, y + 18, name, 9.5, 'ink', 'middle', bold=True)
blk(380, 170, 'L', 'LIVEWARE', '', 'gold'); blk(380, 76, 'H', 'HARDWARE', '', 'cool'); blk(380, 264, 'E', 'ENVIRONMENT', '', 'green'); blk(278, 170, 'S', 'SOFTWARE', '', 'warm'); blk(482, 170, 'L', 'LIVEWARE', '', 'hot')
note(f, 550, 60, ['L–H  Hardware', 'the machine: controls,', 'displays, seats'], first='cool')
note(f, 550, 150, ['L–L  Liveware', 'other people: crew,', 'ATC, ground staff'], first='hot')
note(f, 550, 250, ['L–E  Environment', 'noise, heat, weather,', 'time, company culture'], first='green')
note(f, 40, 150, ['L–S  Software', 'procedures, checklists,', 'manuals, symbols'], first='warm')
note(f, 40, 250, ['Centre L: the operator', 'everything else must be', 'matched to the human'], first='gold')
f.T(380, 336, 'Error arises at a mismatched interface between the human and one of the other elements.', 10.5, 'ink', 'middle', bold=True)
HP.append(f)

gallery(HP, 'Human Performance Gallery 2', 'Human Performance — Sleep, Stress, Cognition & CRM', 'Original figures for sleep and circadian rhythm, stress, information processing, error models, personality and crew resource management.', 'hp2-gallery.html')
print(f'HP2 {len(HP)}  QA warnings: {len(WARN)}')
for w in WARN: print('  ⚠', w)
