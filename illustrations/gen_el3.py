#!/usr/bin/env python3
"""Electrics part 3 (chapters 11-17): AC, alternators, AC distribution, transformers & rectifiers, AC motors, semiconductors, logic gates."""
import math
from figlib import *
from gen_common import note, gallery
from elec_common import *

EL = []
def axesw(f, x0, y0, x1, amp, lab='', ylab=''):
    f.L(x0, y0 - amp - 16, x0, y0 + amp + 16, 'ink', 1.4); f.L(x0, y0, x1, y0, 'ink', 1.4, me='ink')
    if lab: f.T(x1, y0 + 18, lab, 9.5, 'dim', 'end')
    if ylab: f.T(x0 - 8, y0 - amp - 4, ylab, 9.5, 'dim', 'end')

# 11_01 simple AC generator
f = E('11_01', 'Simple AC Generator — Slip Rings', 760, 300, 'A loop rotating between magnet poles with each end connected to its own slip ring and brush, feeding a load',
    '<b>Slip rings give alternating current.</b> A loop turning in a magnetic field generates an EMF that reverses every half-turn. If each end of the loop is connected to its own continuous <b>slip ring</b>, with a brush bearing on each, the connections are never swapped, so the output at the brushes <b>alternates</b> — a sine wave, one cycle per revolution in a two-pole machine. Compare the DC generator, where a split-ring commutator swaps the connections to make the output one-directional.')
f.R(60, 80, 80, 130, c='ink', sw=1.6, fill='hot', rx=4); f.T(100, 152, 'N', 18, 'white', 'middle', bold=True, check=False)
f.R(360, 80, 80, 130, c='ink', sw=1.6, fill='cool', rx=4); f.T(400, 152, 'S', 18, 'white', 'middle', bold=True, check=False)
f.P('M180,110 L320,110 L320,180 L210,180', 'warm', 4, join='round'); f.L(180, 110, 180, 200, 'warm', 4); f.L(210, 180, 210, 230, 'warm', 4)
f.El(180, 220, 16, 6, 'gold', 4); f.El(210, 250, 16, 6, 'gold', 4)
f.R(166, 226, 10, 14, c='ink', sw=1, fill='black', rx=1) if False else None
wire(f, [(196, 220), (600, 220), (600, 200)]); wire(f, [(226, 250), (640, 250), (640, 160)]); f.R(586, 120, 70, 80, c='hot', sw=1.6, fill='g2', rx=2); f.T(621, 166, 'LOAD', 10, 'hot', 'middle', bold=True)
f.T(250, 98, 'rotating loop', 10, 'warm', 'middle', bold=True); f.T(110, 238, 'slip rings', 10, 'gold', 'end', bold=True); f.T(270, 240, 'brushes', 9.5, 'dim')
wave(f, 470, 720, 60, 26, 1.5, c='green'); f.T(595, 30, 'AC output', 10, 'green', 'middle', bold=True)
f.T(380, 290, 'Each end on its own continuous ring: connections never swap, so the output alternates.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('11_04', 'Frequency — Cycles per Second', 760, 280, 'Two sine waves over the same time, one completing one cycle and the other three',
    '<b>Frequency</b> is the number of complete cycles per second, measured in <b>hertz</b> (Hz). The time for one cycle is the <b>period</b>: T = 1 ÷ f. Aircraft AC systems use <b>400 Hz</b> — much higher than the 50 or 60 Hz of mains supplies — because at higher frequency transformers, motors and generators can be made far <b>smaller and lighter</b> for the same power. The frequency of an alternator is set by its speed and number of poles: f = (rpm × pole pairs) ÷ 60, so constant frequency requires a constant-speed drive.')
for k, (y, cyc, lab, c_) in enumerate(((90, 1, '1 cycle in the period: low frequency', 'cool'), (200, 3, '3 cycles in the same time: three times the frequency', 'gold'))):
    axesw(f, 80, y, 680, 40); wave(f, 80, 660, y, 40, cyc, c=c_); f.T(92, y - 52, lab, 10.5, c_, bold=True)
f.T(380, 270, 'f = 1 / T (hertz)      aircraft AC: 400 Hz      f = rpm × pole pairs / 60', 11, 'ink', 'middle', bold=True)
EL.append(f)

f = E('11_05', 'AC Waveform — Peak, RMS & Cycle', 760, 300, 'A sine wave with the peak value, peak to peak value, the RMS value at 0.707 of peak and one cycle marked',
    '<b>Describing a sine wave.</b> The <b>peak</b> (maximum) value is reached twice a cycle, once in each direction; <b>peak-to-peak</b> is twice the peak. The useful value is the <b>RMS (root mean square)</b>: the DC value that would produce the same heating in a resistor. For a sine wave <b>RMS = 0.707 × peak</b>, and peak = 1.414 × RMS. Meters and system ratings quote RMS: the aircraft’s <b>115 V</b> AC has a peak of about 163 V. The average over a whole cycle is zero; over a half-cycle it is 0.637 × peak.')
axesw(f, 80, 150, 680, 100); wave(f, 80, 640, 150, 100, 1, c='gold')
f.L(80, 50, 680, 50, 'hot', 1, dash='4 4'); f.L(80, 79, 680, 79, 'green', 1.4, dash='6 4')
f.L(220, 148, 220, 54, 'hot', 1.8, me='hot', ms='hot'); f.T(228, 104, 'peak', 10.5, 'hot', bold=True)
f.L(710, 50, 710, 250, 'cool', 1.4, me='cool', ms='cool'); f.T(702, 200, 'peak-to-peak', 10, 'cool', 'end', bold=True)
f.T(640, 70, 'RMS = 0.707 × peak', 10.5, 'green', 'end', bold=True)
f.L(80, 274, 640, 274, 'dim', 1.2, me='dim', ms='dim'); f.T(360, 292, 'one cycle (period T)', 10, 'dim', 'middle')
note(f, 460, 210, ['115 V RMS', '= 163 V peak'], first='gold')
EL.append(f)

def phase(tag, title, shift, rel, cap):
    f = E(tag, title, 760, 300, f'Voltage and current waveforms in a {rel} circuit', cap)
    axesw(f, 80, 140, 680, 90)
    wave(f, 80, 640, 140, 90, 1.5, c='gold'); wave(f, 80, 640, 140, 60, 1.5, phase=shift, c='cool')
    f.L(560, 248, 590, 248, 'gold', 2.4); f.T(596, 252, 'voltage', 10, 'gold', bold=True); f.L(560, 272, 590, 272, 'cool', 2.4); f.T(596, 276, 'current', 10, 'cool', bold=True)
    return f
f = phase('11_06', 'Resistive Circuit — Voltage & Current in Phase', 0, 'purely resistive',
    '<b>In a pure resistance, current follows voltage exactly.</b> The current rises and falls in step with the applied voltage, reaching its peaks and passing through zero at the same instants: they are <b>in phase</b>. All the power drawn is converted to heat or light — it is <b>true (real) power</b>, measured in watts, and the power factor is 1. Lamps and heaters behave like this. Ohm’s law applies to the RMS values just as for DC: I = V ÷ R.')
f.T(380, 36, 'peaks and zeros coincide: phase angle 0°', 11, 'ink', 'middle', bold=True); EL.append(f)

f = E('11_07', 'Mutual Induction — The Transformer Principle', 760, 300, 'Two coils on a common iron core: alternating current in the first produces a changing flux that induces a voltage in the second',
    '<b>A changing current in one coil induces a voltage in another.</b> Alternating current in the <b>primary</b> coil produces an alternating magnetic flux. A common <b>iron core</b> carries almost all of that flux through the <b>secondary</b> coil, where the changing flux induces an alternating EMF — with no electrical connection between the coils. This is <b>mutual induction</b>, and it only works with a <b>changing</b> current: steady DC produces a steady flux and no output (except a brief pulse at switch-on and switch-off). It is the principle of the transformer.')
f.R(220, 70, 320, 180, c='ink', sw=2, fill='none', rx=4); f.R(250, 100, 260, 120, c='ink', sw=2, fill='bg', rx=2)
coilV(f, 220, 110, 210, 'hot', 6, 3); coilV(f, 540, 110, 210, 'cool', 6, 3)
wire(f, [(220, 110), (120, 110)]); wire(f, [(220, 210), (120, 210)]); f.Ci(100, 160, 22, 'ink', 2, 'g3'); wave(f, 86, 114, 160, 8, 1, c='gold', sw=1.6); wire(f, [(120, 110), (100, 110), (100, 138)]); wire(f, [(120, 210), (100, 210), (100, 182)])
wire(f, [(540, 110), (640, 110), (640, 130)]); lamp(f, 640, 160, 16); wire(f, [(640, 176), (640, 210), (540, 210)])
for y in (86, 234): f.L(300, y, 460, y, 'gold', 1.6, me='gold' if y == 86 else None, ms='gold' if y == 234 else None)
f.T(380, 60, 'alternating flux in the iron core', 10, 'gold', 'middle', bold=True)
f.T(200, 270, 'PRIMARY', 11, 'hot', 'middle', bold=True); f.T(560, 270, 'SECONDARY', 11, 'cool', 'middle', bold=True)
f.T(380, 290, 'No electrical connection between the coils. Works only with a changing current.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('11_08', 'Self-Inductance & Back-EMF', 760, 300, 'A coil with a lamp across it and a switch; a graph of current rising slowly after switch-on and a voltage spike at switch-off',
    '<b>A coil opposes any change in its own current.</b> When current through a coil changes, its own changing flux induces an EMF in it — <b>self-induction</b> — that opposes the change (Lenz). At <b>switch-on</b> this <b>back-EMF</b> makes the current <b>rise gradually</b> instead of instantly. At <b>switch-off</b> the collapsing field induces a large voltage spike that tries to keep the current flowing, causing <b>arcing</b> at switch contacts and possible damage to electronics — which is why relay coils often have a diode across them. Inductance is measured in <b>henries</b>.')
wire(f, [(80, 220), (80, 80), (120, 80)]); switchH(f, 120, 170, 80, True); wire(f, [(170, 80), (260, 80), (260, 110)]); coilV(f, 260, 110, 190, 'cool', 5, 3); wire(f, [(260, 190), (260, 220), (80, 220)])
f.R(65, 140, 30, 20, c='none', sw=0, fill='bg', rx=0); battV(f, 80, 150); f.T(280, 154, 'coil (inductance L)', 10, 'cool', bold=True)
f.L(420, 240, 420, 60, 'ink', 1.4, me='ink'); f.L(420, 240, 720, 240, 'ink', 1.4, me='ink'); f.T(720, 258, 'time', 9.5, 'dim', 'end')
f.P('M420,240 C470,120 520,100 600,96 L640,96', 'cool', 2.6); f.L(640, 96, 640, 238, 'cool', 2.6)
f.T(500, 82, 'current rises gradually', 10, 'cool', 'middle', bold=True); f.T(636, 70, 'switch-off: voltage spike', 10, 'hot', 'end', bold=True); f.L(650, 76, 656, 240, 'hot', 2.4)
f.T(380, 290, 'The induced EMF always opposes the change in current. Unit of inductance: the henry (H).', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = phase('11_09', 'Inductive Circuit — Current Lags by 90°', -math.pi / 2, 'purely inductive',
    '<b>In a pure inductance the current lags the voltage by 90°.</b> The back-EMF opposes every change, so the current reaches its peak a quarter-cycle <b>after</b> the voltage. The opposition is <b>inductive reactance</b>, X<sub>L</sub> = 2πfL ohms, which <b>rises with frequency</b>. Because voltage and current are 90° out of phase, energy is stored in the magnetic field and returned each half-cycle: a pure inductance consumes <b>no true power</b>, only reactive power. Memory aid: <b>CIVIL</b> — in a capacitor (C) current (I) leads voltage (V); voltage (V) leads current (I) in an inductor (L).')
f.T(380, 36, 'current peaks a quarter-cycle (90°) after the voltage', 11, 'ink', 'middle', bold=True); f.T(80, 270, 'CIVIL: V before I in L', 10.5, 'gold', bold=True); EL.append(f)

f = E('11_10', 'Capacitor Charge & Discharge', 760, 300, 'Graphs of capacitor voltage rising exponentially while charging through a resistor and falling exponentially while discharging, with the time constant marked',
    '<b>A capacitor charges and discharges gradually through a resistance.</b> Connected to a supply through a resistor, its voltage rises quickly at first and then more slowly: it reaches <b>63%</b> of the supply voltage in one <b>time constant</b>, τ = R × C seconds, and is effectively fully charged after about <b>5τ</b>. Discharging through a resistor, the voltage falls to 37% in one time constant. Time constants are used for timing circuits and to smooth the output of rectifiers.')
for k, (x0, ttl, up) in enumerate(((60, 'CHARGING', True), (420, 'DISCHARGING', False))):
    f.L(x0, 240, x0, 60, 'ink', 1.4, me='ink'); f.L(x0, 240, x0 + 300, 240, 'ink', 1.4, me='ink'); f.T(x0 + 150, 50, ttl, 11, 'ink', 'middle', bold=True)
    pts = ' '.join(f'{x0 + t * 56:.1f},{240 - 160 * ((1 - math.exp(-t)) if up else math.exp(-t)):.1f}' for t in [i / 20 for i in range(0, 101)])
    f.raw(f'<polyline points="{pts}" fill="none" stroke="{col("gold")}" stroke-width="2.6"/>')
    yv = 240 - 160 * (0.63 if up else 0.37); f.L(x0, yv, x0 + 56, yv, 'cool', 1.2, dash='4 3'); f.L(x0 + 56, yv, x0 + 56, 240, 'cool', 1.2, dash='4 3')
    f.T(x0 + 56, 258, 'τ', 11, 'cool', 'middle', bold=True); f.T(x0 + 280, 258, '5τ', 11, 'cool', 'middle', bold=True); f.T(x0 + 64, yv - 6, '63%' if up else '37%', 10, 'cool', bold=True)
f.T(380, 290, 'time constant τ = R × C seconds; effectively complete after 5τ', 11, 'ink', 'middle', bold=True)
EL.append(f)

f = E('11_11', 'Capacitor in an AC Circuit', 760, 280, 'A capacitor in series with a lamp: the lamp stays dark on DC but lights on AC because the capacitor charges and discharges each half cycle',
    '<b>A capacitor blocks DC but passes AC.</b> On <b>DC</b> the capacitor charges once and then no further current flows: the lamp stays dark. On <b>AC</b> the capacitor charges, discharges and charges the opposite way every half-cycle, so current flows back and forth through the lamp continuously and it lights, although no current actually crosses the dielectric. The opposition is <b>capacitive reactance</b>, X<sub>C</sub> = 1 ÷ (2πfC), which <b>falls</b> as frequency rises. Capacitors are used to block DC while passing signals, and for suppression and filtering.')
for k, (x0, ttl, ac) in enumerate(((60, 'DC supply: lamp dark', False), (420, 'AC supply: lamp lit', True))):
    wire(f, [(x0 + 40, 200), (x0 + 40, 90), (x0 + 120, 90)]); cap(f, x0 + 126, 90); wire(f, [(x0 + 130, 90), (x0 + 220, 90), (x0 + 220, 120)])
    lamp(f, x0 + 220, 140, 16, 'gold' if ac else 'dim'); wire(f, [(x0 + 220, 156), (x0 + 220, 200), (x0 + 40, 200)])
    if ac: f.Ci(x0 + 40, 160, 18, 'ink', 2, 'g3'); wave(f, x0 + 28, x0 + 52, 160, 7, 1, c='gold', sw=1.6)
    else: f.R(x0 + 25, 150, 30, 20, c='none', sw=0, fill='bg', rx=0); battV(f, x0 + 40, 160)
    if ac: [f.L(x0 + 220 + dx, 140 + dy, x0 + 220 + dx * 1.8, 140 + dy * 1.8, 'gold', 1.6) for dx, dy in ((20, 0), (14, -14), (14, 14))]
    f.T(x0 + 130, 240, ttl, 11, 'gold' if ac else 'dim', 'middle', bold=True)
f.T(380, 272, 'XC = 1 / (2πfC): falls as frequency rises', 11, 'ink', 'middle', bold=True)
EL.append(f)

f = phase('11_12', 'Capacitive Circuit — Current Leads by 90°', math.pi / 2, 'purely capacitive',
    '<b>In a pure capacitance the current leads the voltage by 90°.</b> The current is greatest when the voltage is changing fastest — as it passes through zero — and zero when the voltage is at its peak, so the current reaches its peak a quarter-cycle <b>before</b> the voltage. Like an inductance, a pure capacitance stores and returns energy each half-cycle and consumes <b>no true power</b>. Memory aid: <b>CIVIL</b> — in C, I leads V.')
f.T(380, 36, 'current peaks a quarter-cycle (90°) before the voltage', 11, 'ink', 'middle', bold=True); f.T(80, 270, 'CIVIL: I before V in C', 10.5, 'gold', bold=True); EL.append(f)

f = E('11_13', 'Impedance Triangle', 760, 300, 'A right-angled triangle with resistance on the base, reactance vertical and impedance as the hypotenuse, with the phase angle',
    '<b>Adding resistance and reactance.</b> Resistance and reactance are 90° apart in phase, so they cannot simply be added. They combine like the sides of a right-angled triangle: <b>resistance R</b> along the base, <b>reactance X</b> (X<sub>L</sub> − X<sub>C</sub>) at right angles, and the total opposition — the <b>impedance Z</b> — as the hypotenuse: <b>Z = √(R² + X²)</b>. The angle φ between R and Z is the <b>phase angle</b> between voltage and current, and <b>cos φ</b> is the <b>power factor</b>. Example: R = 30 Ω, X = 40 Ω gives Z = 50 Ω and a power factor of 0.6.')
f.P('M120,250 L480,250 L480,70 Z', 'gold', 2.4, 'g3')
f.T(300, 274, 'resistance R = 30 Ω', 11, 'hot', 'middle', bold=True); f.T(492, 156, 'reactance X', 11, 'cool', bold=True); f.T(492, 172, '= 40 Ω', 11, 'cool', bold=True); f.T(270, 146, 'impedance Z = 50 Ω', 11, 'gold', 'end', bold=True)
f.R(466, 236, 14, 14, c='ink', sw=1, fill='none', rx=0)
ang = math.degrees(math.atan2(180, 360)); f.P(f'M200,250 A80,80 0 0 0 {120 + 80 * math.cos(math.radians(ang)):.1f},{250 - 80 * math.sin(math.radians(ang)):.1f}', 'white', 1.6); f.T(212, 240, 'φ', 13, 'white', bold=True)
f.R(600, 80, 150, 120, c='gold', sw=1.6, fill='g2'); f.T(675, 108, 'Z = √(R² + X²)', 12, 'gold', 'middle', bold=True); f.T(675, 136, 'power factor', 10.5, 'ink', 'middle'); f.T(675, 156, '= cos φ = R / Z = 0.6', 10.5, 'ink', 'middle'); f.T(675, 184, 'X = XL − XC', 10, 'dim', 'middle')
EL.append(f)

f = E('11_14', 'Reactance vs Frequency & Resonance', 760, 300, 'Graph with inductive reactance rising and capacitive reactance falling with frequency, crossing at the resonant frequency',
    '<b>Two reactances that move in opposite directions.</b> <b>Inductive reactance</b> X<sub>L</sub> = 2πfL <b>rises</b> in proportion to frequency; <b>capacitive reactance</b> X<sub>C</sub> = 1 ÷ (2πfC) <b>falls</b> as frequency rises. At one frequency they are <b>equal</b> and cancel: the <b>resonant frequency</b>, f = 1 ÷ (2π√LC). A series circuit at resonance has its <b>minimum impedance</b> (just R) and maximum current; a parallel circuit has its maximum impedance. Resonant (tuned) circuits select one frequency from many — the basis of radio tuning and filters.')
f.L(100, 260, 100, 50, 'ink', 1.4, me='ink'); f.L(100, 260, 680, 260, 'ink', 1.4, me='ink'); f.T(680, 280, 'frequency', 9.5, 'dim', 'end'); f.T(92, 60, 'reactance', 9.5, 'dim', 'end')
f.L(100, 260, 640, 60, 'hot', 2.6); f.T(640, 54, 'XL = 2πfL', 11, 'hot', 'end', bold=True)
pts = ' '.join(f'{100 + x:.1f},{max(60, 260 - 9000 / (x + 20)):.1f}' for x in range(20, 541, 6)); f.raw(f'<polyline points="{pts}" fill="none" stroke="{col("cool")}" stroke-width="2.6"/>')
f.T(150, 90, 'XC = 1 / 2πfC', 11, 'cool', bold=True)
xr = 100 + (-20 + math.sqrt(400 + 4 * 9000 * 540 / 200 * 0.0 + 4 * 9000 * 0.37)) / 2
xi = None
for x in range(20, 540):
    if 260 - 200 * x / 540 <= 260 - 9000 / (x + 20): xi = x; break
f.L(100 + xi, 260 - 200 * xi / 540, 100 + xi, 260, 'gold', 1.4, dash='4 3'); f.Ci(100 + xi, 260 - 200 * xi / 540, 5, 'gold', 1, 'gold')
f.T(100 + xi + 8, 278, 'resonant frequency: XL = XC', 10.5, 'gold', bold=True)
f.T(300, 70, 'f resonant = 1 / (2π√LC)', 11.5, 'ink', bold=True)
EL.append(f)

f = E('11_15', 'True (Real) Power', 760, 300, 'Voltage, current and power waveforms for a resistive load, with the power curve always positive',
    '<b>True power does useful work.</b> Instantaneous power is voltage × current at each instant. In a resistive circuit, voltage and current are in phase, so their product is <b>always positive</b> — power flows from the source to the load the whole cycle, at twice the supply frequency, averaging half the peak. This is <b>true (real) power</b>, measured in <b>watts</b> (W): P = V × I × cos φ, where cos φ (the power factor) is 1 for a pure resistance. It is the power converted to heat, light or mechanical work.')
axesw(f, 80, 170, 680, 80)
wave(f, 80, 640, 170, 70, 1.5, c='gold', sw=1.8); wave(f, 80, 640, 170, 50, 1.5, c='cool', sw=1.8)
pts = ' '.join(f'{80 + 560 * i / 300:.1f},{170 - 110 * math.sin(2 * math.pi * 1.5 * i / 300) ** 2:.1f}' for i in range(301)); f.raw(f'<polyline points="{pts}" fill="none" stroke="{col("hot")}" stroke-width="2.8"/>')
f.L(80, 115, 640, 115, 'hot', 1, dash='4 4'); f.T(646, 119, 'average power', 9.5, 'hot')
f.L(470, 268, 500, 268, 'gold', 2); f.T(506, 272, 'voltage', 9.5); f.L(570, 268, 600, 268, 'cool', 2); f.T(606, 272, 'current', 9.5); f.L(370, 268, 400, 268, 'hot', 2.8); f.T(406, 272, 'power', 9.5)
f.T(380, 36, 'in phase: power is always positive (true power, watts)', 11, 'ink', 'middle', bold=True)
f.T(80, 292, 'P = V × I × cos φ  (W)', 10.5, 'gold', bold=True)
EL.append(f)

f = E('11_17', 'Reactive & Apparent Power — The Power Triangle', 760, 300, 'A power triangle with true power in watts, reactive power in volt-amperes reactive and apparent power in volt-amperes',
    '<b>Three kinds of power in an AC circuit.</b> <b>Apparent power</b>, V × I, is measured in <b>volt-amperes (VA, kVA)</b> — what the generator and cables must actually carry. Of it, <b>true power</b> (watts) is the part doing useful work, V × I × cos φ; <b>reactive power</b>, V × I × sin φ, measured in <b>volt-amperes reactive (VAR, kVAR)</b>, simply surges back and forth between source and the inductances and capacitances each cycle. The three form a right-angled triangle, and <b>power factor = true ÷ apparent = cos φ</b>. That is why aircraft AC generators are rated in <b>kVA</b>, not kW.')
f.P('M120,250 L480,250 L480,70 Z', 'gold', 2.4, 'g3')
f.T(300, 274, 'TRUE power: watts (W)', 11, 'hot', 'middle', bold=True); f.T(492, 156, 'REACTIVE power:', 11, 'cool', bold=True); f.T(492, 172, 'VAR', 11, 'cool', bold=True)
f.T(270, 146, 'APPARENT power: VA', 11, 'gold', 'end', bold=True); f.R(466, 236, 14, 14, c='ink', sw=1, fill='none', rx=0); f.T(212, 240, 'φ', 13, 'white', bold=True)
f.R(560, 70, 180, 140, c='gold', sw=1.6, fill='g2'); f.T(650, 98, 'power factor', 11, 'gold', 'middle', bold=True); f.T(650, 120, '= W / VA = cos φ', 11, 'ink', 'middle')
f.T(650, 150, 'generators are', 10, 'dim', 'middle'); f.T(650, 166, 'rated in kVA', 10, 'dim', 'middle', bold=True); f.T(650, 190, '(e.g. 90 kVA)', 10, 'dim', 'middle')
EL.append(f)

# 12 alternators
f = E('12_01', 'Rotating-Field Alternator', 760, 300, 'A cross-section of an alternator with a rotating two-pole field magnet inside stationary stator windings',
    '<b>Aircraft alternators spin the magnet, not the windings.</b> The <b>field</b> — an electromagnet fed with DC — is on the <b>rotor</b>; the output windings are fixed in slots in the <b>stator</b>. As the field sweeps past each stator coil, an alternating EMF is induced in it. Because the output windings are stationary, the heavy output current is taken off through fixed connections, with no slip rings or brushes carrying it, and the windings are easy to insulate and cool. Only the small field current needs to reach the rotor.')
cx, cy = 230, 155
f.Ci(cx, cy, 120, 'ink', 2.4, 'g3'); f.Ci(cx, cy, 84, 'ink', 1.4, 'bg')
for k in range(12):
    p = pol(cx, cy, 100, k * 30); f.R(p[0] - 8, p[1] - 8, 16, 16, c='warm', sw=1.6, fill='warm', rx=3, op=0.85)
f.R(cx - 26, cy - 70, 52, 140, c='ink', sw=1.6, fill='steel', rx=10); f.T(cx, cy - 40, 'N', 18, 'hot', 'middle', bold=True); f.T(cx, cy + 54, 'S', 18, 'cool', 'middle', bold=True)
circle_arrows(f, cx, cy, 60, True, 'gold', 2)
f.T(430, 70, 'stator: stationary output windings', 11, 'warm', bold=True); f.L(426, 66, 316, 110, 'dim', 1)
f.T(430, 150, 'rotor: rotating DC field magnet', 11, 'ink', bold=True); f.L(426, 146, 258, 150, 'dim', 1)
note(f, 430, 210, ['Output taken from fixed connections;', 'only the small field current goes', 'to the rotor.'], first='gold')
EL.append(f)

f = E('12_02', 'Single-Phase Alternator Output', 760, 280, 'A rotating field passing one stator winding and the single sine wave it produces',
    '<b>One winding, one sine wave.</b> With a single set of stator coils the alternator produces one alternating output — <b>single-phase</b> AC — rising to a peak as a pole passes the coil and reversing as the opposite pole passes. Single-phase power is used in aircraft for many smaller loads (instruments, lighting, avionics), taken from one phase of the three-phase system. Its disadvantage for large machines is that its power pulsates at twice the supply frequency.')
cx, cy = 150, 140; f.Ci(cx, cy, 80, 'ink', 2.2, 'g3'); f.R(cx - 18, cy - 50, 36, 100, c='ink', sw=1.4, fill='steel', rx=8); f.T(cx, cy - 26, 'N', 13, 'hot', 'middle', bold=True); f.T(cx, cy + 38, 'S', 13, 'cool', 'middle', bold=True)
f.R(cx - 14, cy - 98, 28, 18, c='warm', sw=1.6, fill='warm', rx=3); f.R(cx - 14, cy + 80, 28, 18, c='warm', sw=1.6, fill='warm', rx=3); f.T(cx + 22, cy - 86, 'phase winding', 9.5, 'warm')
axesw(f, 300, 140, 720, 80); wave(f, 300, 700, 140, 80, 2, c='gold'); f.T(500, 40, 'single-phase output', 11, 'gold', 'middle', bold=True)
EL.append(f)

f = E('12_03', 'Three-Phase Alternator — Phases 120° Apart', 760, 300, 'A stator with three windings spaced 120 degrees apart and the three output sine waves displaced by 120 degrees',
    '<b>Three windings, three outputs.</b> The stator carries <b>three separate windings</b> spaced <b>120°</b> apart round the machine. The rotating field passes each in turn, producing three sine waves of the same voltage and frequency, each <b>120° out of phase</b> with the next — phases A, B and C. At any instant the three add to zero. Three-phase generation gives <b>constant total power</b> (no pulsation), lets motors produce a rotating field without starting devices, and transmits more power per weight of cable. Aircraft systems are typically <b>115/200 V, 3-phase, 400 Hz</b>.')
cx, cy = 150, 150; f.Ci(cx, cy, 90, 'ink', 2.2, 'g3'); f.R(cx - 16, cy - 56, 32, 112, c='ink', sw=1.4, fill='steel', rx=8)
for k, (c_, lab) in enumerate((('hot', 'A'), ('gold', 'B'), ('cool', 'C'))):
    for a in (k * 120, k * 120 + 180):
        p = pol(cx, cy, 104, a); f.R(p[0] - 10, p[1] - 10, 20, 20, c=c_, sw=1.6, fill=c_, rx=3, op=0.85)
    p = pol(cx, cy, 128, k * 120); f.T(p[0], p[1] + 5, lab, 13, c_, 'middle', bold=True)
axesw(f, 300, 150, 720, 90)
for k, c_ in enumerate(('hot', 'gold', 'cool')): wave(f, 300, 700, 150, 90, 2, phase=-k * 2 * math.pi / 3, c=c_, sw=2.2)
f.T(510, 40, 'three outputs, 120° apart', 11, 'ink', 'middle', bold=True); f.T(510, 290, 'aircraft: 115/200 V, 3-phase, 400 Hz', 10.5, 'gold', 'middle', bold=True)
EL.append(f)

f = E('12_04', 'Star vs Delta Connection', 760, 300, 'Three windings joined at a common neutral point in a star, and three windings joined end to end in a delta',
    '<b>Two ways to join three windings.</b> In a <b>star (wye)</b> connection one end of each winding is joined to a common <b>neutral</b> point and the other ends are the three line outputs; a fourth wire can be taken from the neutral, giving two voltages — phase-to-neutral and line-to-line. Aircraft generators are star-connected with the neutral earthed to the airframe. In a <b>delta</b> connection the windings are joined end to end in a closed triangle with the lines taken from the corners; there is no neutral and only one voltage. Transformer windings and some motors use delta.')
cx, cy = 200, 160
for k, c_ in enumerate(('hot', 'gold', 'cool')):
    a = k * 120; p = pol(cx, cy, 90, a); f.L(cx, cy, p[0], p[1], c_, 3); q = pol(cx, cy, 120, a); f.L(p[0], p[1], q[0], q[1], 'ink', 1.6); f.T(q[0] + (10 if k == 1 else -10 if k == 2 else 8), q[1] - 4 if k == 0 else q[1] + 14, f'line {"ABC"[k]}', 10, c_, 'middle', bold=True)
f.Ci(cx, cy, 6, 'ink', 1, 'ink'); f.T(cx + 12, cy + 4, 'neutral (N)', 10, 'ink', bold=True); f.L(cx, cy, cx - 90, cy, 'dim', 1.4, dash='4 3'); ground(f, cx - 90, cy)
f.T(cx, 286, 'STAR (wye): has a neutral', 11.5, 'ink', 'middle', bold=True)
P = [pol(560, 170, 100, a) for a in (0, 120, 240)]
for k, c_ in enumerate(('hot', 'gold', 'cool')): f.L(P[k][0], P[k][1], P[(k + 1) % 3][0], P[(k + 1) % 3][1], c_, 3)
for k in range(3): f.Ci(P[k][0], P[k][1], 5, 'ink', 1, 'ink')
f.T(560, 286, 'DELTA: no neutral', 11.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('12_05', 'Star Connection — Line & Phase Values', 760, 300, 'A star connection with the phase voltage between a line and neutral and the line voltage between two lines',
    '<b>In a star, line voltage is √3 times phase voltage.</b> The <b>phase voltage</b> is measured across one winding — between a line and the neutral; the <b>line voltage</b> is between any two lines. Because the two phase voltages that make up a line voltage are 120° apart, <b>V<sub>line</sub> = √3 × V<sub>phase</sub></b> = 1.732 × V<sub>phase</sub>. So the aircraft’s <b>115 V</b> phase-to-neutral system gives <b>200 V</b> line-to-line. The <b>line current equals the phase current</b>, because each line connects straight to one winding.')
cx, cy = 230, 160
for k, c_ in enumerate(('hot', 'gold', 'cool')):
    a = k * 120; p = pol(cx, cy, 100, a); f.L(cx, cy, p[0], p[1], c_, 3); f.Ci(p[0], p[1], 5, 'ink', 1, 'ink')
A, B = pol(cx, cy, 100, 0), pol(cx, cy, 100, 120)
f.L(cx - 14, cy - 4, A[0] - 14, A[1] + 6, 'green', 1.6, me='green', ms='green'); f.T(cx - 22, cy - 56, '115 V', 11, 'green', 'end', bold=True); f.T(cx - 22, cy - 42, 'phase', 9.5, 'green', 'end')
f.L(A[0] + 10, A[1], B[0] + 10, B[1], 'gold', 1.6, dash='5 4', me='gold', ms='gold'); f.T(B[0] + 20, B[1] - 50, '200 V line', 11, 'gold', bold=True)
f.Ci(cx, cy, 5, 'ink', 1, 'ink'); f.T(cx - 12, cy + 4, 'N', 11, 'ink', 'end', bold=True)
f.R(460, 80, 270, 130, c='gold', sw=1.6, fill='g2'); f.T(595, 112, 'STAR', 12, 'gold', 'middle', bold=True)
f.T(595, 138, 'V line = √3 × V phase', 11.5, 'ink', 'middle', bold=True); f.T(595, 160, 'I line = I phase', 11.5, 'ink', 'middle', bold=True); f.T(595, 188, '115 V × 1.732 = 200 V', 10.5, 'dim', 'middle')
EL.append(f)

f = E('12_06', 'Delta Connection — Line & Phase Values', 760, 300, 'A delta connection with the line voltage equal to the phase voltage and the line current root three times the phase current',
    '<b>In a delta, line voltage equals phase voltage.</b> Each winding is connected directly between two lines, so <b>V<sub>line</sub> = V<sub>phase</sub></b>. But each line current is the combination of two winding currents 120° apart, so <b>I<sub>line</sub> = √3 × I<sub>phase</sub></b>. For the same power, delta windings carry less current and star windings less voltage; transformers often have one of each (for example a delta primary and star secondary). Power in any balanced three-phase system is √3 × V<sub>line</sub> × I<sub>line</sub> × cos φ.')
P = [pol(230, 170, 110, a) for a in (0, 120, 240)]
for k, c_ in enumerate(('hot', 'gold', 'cool')): f.L(P[k][0], P[k][1], P[(k + 1) % 3][0], P[(k + 1) % 3][1], c_, 3)
for k in range(3): f.Ci(P[k][0], P[k][1], 5, 'ink', 1, 'ink'); q = pol(230, 170, 150, k * 120); f.L(P[k][0], P[k][1], q[0], q[1], 'ink', 1.8)
f.T(110, 120, 'V line = V phase', 10.5, 'green', 'end', bold=True)
f.R(460, 80, 270, 130, c='gold', sw=1.6, fill='g2'); f.T(595, 112, 'DELTA', 12, 'gold', 'middle', bold=True)
f.T(595, 138, 'V line = V phase', 11.5, 'ink', 'middle', bold=True); f.T(595, 160, 'I line = √3 × I phase', 11.5, 'ink', 'middle', bold=True); f.T(595, 188, 'no neutral connection', 10.5, 'dim', 'middle')
f.T(380, 290, 'Three-phase power = √3 × V line × I line × cos φ (either connection)', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('12_07', 'Alternator Excitation & Voltage Regulation', 760, 300, 'A voltage regulator sensing the output voltage and adjusting the DC field current to the alternator rotor',
    '<b>The field current sets the voltage.</b> An alternator’s output voltage depends on its speed and on the strength of its rotating field. The <b>voltage regulator</b> (in a generator control unit) continuously <b>senses</b> the output voltage, compares it with a reference, and adjusts the DC <b>excitation</b> current to the rotor field: more field current if the voltage is low, less if it is high. Frequency, by contrast, depends only on speed and is controlled separately by the constant-speed drive.')
circ(f, 200, 150, 50, 'ALT', 'green', 'g3', 14); f.L(200, 200, 560, 200, 'green', 3); f.L(560, 200, 620, 200, 'green', 3, me='green'); f.T(626, 204, 'AC output', 10, 'green')
f.box(380, 60, 160, 60, ['voltage regulator', 'senses output, sets field'], c='cool', size=10.5)
f.L(460, 200, 460, 122, 'cool', 1.8, me='cool', dash='5 4'); f.T(470, 166, 'voltage sense', 9.5, 'cool')
f.L(380, 90, 250, 120, 'gold', 2.4, me='gold'); f.T(300, 86, 'DC field current', 10, 'gold', 'middle', bold=True)
note(f, 40, 240, ['Voltage low: field current up. Voltage high: field current down.', 'Frequency depends only on speed (constant-speed drive).'], first='ink')
EL.append(f)

f = E('12_08', 'Brushless Alternator — Exciter & Rotating Rectifier', 760, 320, 'Three machines on one shaft: a permanent magnet generator, an exciter with rotating armature and rectifier, and the main alternator with rotating field',
    '<b>No brushes at all.</b> The modern aircraft generator has three stages on one shaft. A <b>permanent-magnet generator (PMG)</b> produces AC to power the generator control unit, independent of any other supply. The GCU feeds controlled DC to the <b>stationary field</b> of an <b>exciter</b>, whose <b>rotating armature</b> produces AC that is converted to DC by <b>rectifier diodes mounted on the shaft</b>. That DC feeds the <b>rotating main field</b>, which induces the 115/200 V output in the stationary <b>main stator</b>. With no brushes or slip rings there is nothing to wear or spark, allowing high speed and reliability at altitude.')
f.L(40, 160, 720, 160, 'ink', 5)
for x0, w, ttl, sub, c_ in ((80, 120, 'PMG', 'permanent magnets', 'gold'), (240, 140, 'EXCITER', 'rotating armature', 'cool'), (420, 70, 'diodes', 'rotate with shaft', 'hot'), (530, 160, 'MAIN ALTERNATOR', 'rotating field', 'green')):
    f.R(x0, 110, w, 100, c=c_, sw=2, fill='g2', rx=8); f.T(x0 + w / 2, 100, ttl, 11, c_, 'middle', bold=True); f.T(x0 + w / 2, 230, sub, 9.5, 'dim', 'middle')
f.box(200, 260, 220, 44, ['generator control unit (GCU)'], c='ink', size=10.5)
f.L(140, 210, 220, 262, 'gold', 1.6, me='gold'); f.L(330, 262, 310, 212, 'cool', 1.6, me='cool'); f.T(326, 250, 'DC to exciter field', 9.5, 'cool')
f.L(610, 210, 610, 280, 'green', 2.4); f.L(610, 280, 700, 280, 'green', 2.4, me='green'); f.T(704, 284, '115/200 V', 9.5, 'green')
f.T(380, 40, 'no brushes or slip rings: nothing to wear or spark', 11, 'ink', 'middle', bold=True)
EL.append(f)

f = E('12_10', 'Paralleling AC Generators — Synchronising Conditions', 760, 300, 'Two sets of three-phase waveforms that must match in voltage, frequency, phase angle and phase sequence before the breaker is closed',
    '<b>Four things must match before two AC generators are connected together.</b> Their <b>voltages</b> must be equal, their <b>frequencies</b> equal, their waveforms <b>in phase</b> at the instant of connection, and their <b>phase sequence</b> (A-B-C) the same. If they are not, large circulating currents and torque shocks result when the breaker closes. The generator control system checks these conditions automatically — synchronisation — before allowing the <b>bus-tie breaker</b> to close. Many twin-engine aircraft avoid the problem by running their AC generators in <b>split-bus</b> (non-parallel) mode.')
axesw(f, 80, 130, 680, 80); wave(f, 80, 660, 130, 80, 2, c='gold', sw=2.6); wave(f, 80, 660, 130, 80, 2, phase=0.05, c='cool', sw=1.6)
f.T(380, 36, 'generator 1 and generator 2 waveforms must coincide', 11, 'ink', 'middle', bold=True)
for k, t in enumerate(('equal VOLTAGE', 'equal FREQUENCY', 'IN PHASE', 'same PHASE SEQUENCE')):
    x = 100 + k * 160; f.box(x, 236, 140, 40, [t], c='green', size=10)
EL.append(f)

f = E('12_12', 'Real-Load Sharing — Speed Governors', 760, 300, 'Two paralleled generators, with the constant-speed drive of the more heavily loaded one slowed and the other speeded up to equalise real load',
    '<b>Real (kW) load is shared by adjusting the drive torque.</b> Paralleled AC generators are locked to the same frequency, so neither can simply run faster. The one whose drive applies more torque pushes its rotor slightly ahead in phase and takes more of the <b>real load</b>. The load-sharing system compares the real load of each generator and trims each <b>constant-speed drive</b> (CSD or IDG governor): the more heavily loaded drive is reduced and the lighter one increased until the kW loads are equal.')
for i, x in enumerate((140, 560)):
    f.box(x - 80, 70, 160, 50, [f'CSD {i+1}', 'speed governor'], c='gold', size=10.5); f.L(x, 120, x, 150, 'ink', 4)
    circ(f, x, 180, 30, f'G{i+1}', 'ink', 'g3', 12); f.L(x, 210, x, 240, 'green', 3)
f.R(140, 240, 420, 16, c='ink', sw=1.4, fill='steel', rx=3); f.T(350, 252, 'AC BUS (paralleled)', 9.5, 'white', 'middle', bold=True, check=False)
f.box(260, 120, 180, 50, ['load-sharing control', 'compares real load (kW)'], c='cool', size=10)
f.L(260, 145, 222, 100, 'cool', 1.6, me='cool'); f.L(440, 145, 478, 100, 'cool', 1.6, me='cool')
f.T(140, 286, 'more load: governor trimmed DOWN', 10, 'hot', 'middle', bold=True); f.T(560, 286, 'less load: governor trimmed UP', 10, 'green', 'middle', bold=True)
EL.append(f)

f = E('12_13', 'Reactive-Load Sharing — Field Control', 760, 300, 'Two paralleled generators with their excitation adjusted by the voltage regulators to equalise reactive load',
    '<b>Reactive (kVAR) load is shared by adjusting the excitation.</b> Changing a paralleled generator’s field current does not change its real load; it changes how much <b>reactive</b> current it supplies. The generator with the stronger field takes more of the kVAR. The reactive load-sharing circuit compares the reactive currents and adjusts each <b>voltage regulator</b>: the generator taking too much reactive load has its excitation reduced, the other’s increased, keeping the bus voltage constant while the kVAR is shared equally.')
for i, x in enumerate((140, 560)):
    circ(f, x, 160, 30, f'G{i+1}', 'ink', 'g3', 12); f.box(x - 80, 60, 160, 50, [f'voltage regulator {i+1}', 'sets field current'], c='cool', size=10); f.L(x, 110, x, 130, 'cool', 2, me='cool'); f.L(x, 190, x, 230, 'green', 3)
f.R(140, 230, 420, 16, c='ink', sw=1.4, fill='steel', rx=3); f.T(350, 242, 'AC BUS (paralleled)', 9.5, 'white', 'middle', bold=True, check=False)
f.box(260, 120, 180, 50, ['reactive load-sharing', 'compares kVAR'], c='gold', size=10); f.L(260, 145, 222, 100, 'gold', 1.6, me='gold'); f.L(440, 145, 478, 100, 'gold', 1.6, me='gold')
f.T(380, 286, 'Real load (kW): drive torque.   Reactive load (kVAR): field excitation.', 11, 'ink', 'middle', bold=True)
EL.append(f)

# 13 AC distribution
f = E('13_01', 'AC Generation & Distribution Layout', 760, 320, 'Two engine-driven generators and an APU generator feeding AC buses through breakers, with a bus-tie, external power and transformer-rectifier units supplying DC',
    '<b>A typical twin-engine AC system.</b> Each engine drives a generator (through a constant-speed drive or IDG) that feeds its own <b>AC bus</b> through its <b>generator circuit breaker (GCB)</b>. The <b>APU generator</b> and <b>external (ground) power</b> can supply either bus through the <b>bus-tie breakers (BTB)</b>, which also let one engine generator power both buses if the other fails. <b>Transformer-rectifier units (TRUs)</b> convert AC to 28 V DC for the DC buses and battery charging, and the <b>static inverter</b> can supply essential AC from the battery if all generation is lost.')
for i, (x, lab) in enumerate(((120, 'GEN 1'), (380, 'APU GEN'), (640, 'GEN 2'))):
    circ(f, x, 70, 28, lab.split()[0] if i != 1 else 'APU', 'green' if i != 1 else 'gold', 'g3', 11); f.T(x, 30, lab, 10, 'ink', 'middle', bold=True)
f.R(60, 160, 240, 22, c='ink', sw=1.6, fill='steel', rx=3); f.T(180, 176, 'AC BUS 1', 10, 'white', 'middle', bold=True, check=False)
f.R(460, 160, 240, 22, c='ink', sw=1.6, fill='steel', rx=3); f.T(580, 176, 'AC BUS 2', 10, 'white', 'middle', bold=True, check=False)
for x in (120, 640): f.L(x, 98, x, 160, 'green', 2.4); f.R(x - 12, 118, 24, 18, c='ink', sw=1.4, fill='g2', rx=2); f.T(x + 18, 132, 'GCB', 9, 'dim')
f.L(380, 98, 380, 140, 'gold', 2.4); f.L(300, 140, 460, 140, 'gold', 2.4); f.L(300, 140, 300, 160, 'gold', 2); f.L(460, 140, 460, 160, 'gold', 2)
f.R(320, 132, 24, 16, c='ink', sw=1.4, fill='g2', rx=2); f.R(416, 132, 24, 16, c='ink', sw=1.4, fill='g2', rx=2); f.T(380, 128, 'bus-tie breakers', 9, 'dim', 'middle')
f.box(320, 190, 120, 34, ['external power'], c='ink', size=9.5); f.L(380, 190, 380, 148, 'dim', 1.4, me='dim')
for x in (180, 580): f.box(x - 50, 220, 100, 40, ['TRU'], c='cool', size=10.5); f.L(x, 182, x, 220, 'cool', 2)
f.R(80, 280, 600, 18, c='ink', sw=1.4, fill='steel', rx=3); f.T(380, 293, '28 V DC BUSES (battery, static inverter)', 9.5, 'white', 'middle', bold=True, check=False)
for x in (180, 580): f.L(x, 260, x, 280, 'cool', 2)
f.T(380, 316, 'GCB: generator circuit breaker.  TRU: transformer-rectifier unit.', 9.5, 'faint', 'middle')
EL.append(f)

f = E('13_02', 'Split AC/DC Bus Architecture', 760, 300, 'Left and right AC and DC buses kept separate in normal operation, with essential and battery buses fed from either side',
    '<b>Keeping failures on one side.</b> In a <b>split-bus</b> system each engine generator normally supplies only its own side — left AC and DC buses, right AC and DC buses — and the two are <b>not paralleled</b>, so a fault on one side cannot take down the other and the generators need not be synchronised. If a generator fails, the bus-tie closes automatically and the remaining generator (or the APU) supplies both sides. The <b>essential</b> and <b>battery</b> buses carry the most important loads and can be fed from either side or, in the last resort, from the battery and static inverter.')
for i, (x, side) in enumerate(((80, 'LEFT'), (460, 'RIGHT'))):
    circ(f, x + 110, 56, 24, 'G', 'green', 'g3', 11); f.T(x + 110, 22, f'{side} GEN', 9.5, 'ink', 'middle', bold=True)
    f.R(x, 100, 220, 22, c='ink', sw=1.6, fill='steel', rx=3); f.T(x + 110, 116, f'{side} AC BUS', 9.5, 'white', 'middle', bold=True, check=False)
    f.L(x + 110, 80, x + 110, 100, 'green', 2.4); f.box(x + 60, 140, 100, 34, ['TRU'], c='cool', size=10); f.L(x + 110, 122, x + 110, 140, 'cool', 2)
    f.R(x, 196, 220, 22, c='ink', sw=1.6, fill='steel', rx=3); f.T(x + 110, 212, f'{side} DC BUS', 9.5, 'white', 'middle', bold=True, check=False); f.L(x + 110, 174, x + 110, 196, 'cool', 2)
f.L(300, 111, 460, 111, 'gold', 2, dash='6 4'); f.T(380, 96, 'bus tie: OPEN in normal', 9.5, 'gold', 'middle', bold=True)
f.R(270, 250, 220, 22, c='hot', sw=1.6, fill='g2', rx=3); f.T(380, 266, 'ESSENTIAL / BATTERY BUS', 9.5, 'hot', 'middle', bold=True)
f.L(190, 218, 300, 250, 'hot', 1.4, dash='4 3'); f.L(570, 218, 460, 250, 'hot', 1.4, dash='4 3')
f.T(380, 292, 'Each generator feeds its own side; a tie closes only after a failure.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

def panel_gen(f, x, y, lab):
    f.Ci(x, y, 26, 'green', 2, 'g3'); f.T(x, y + 4, lab, 10, 'green', 'middle', bold=True, check=False)
    f.R(x - 22, y + 40, 44, 26, c='green', sw=1.4, fill='g2', rx=3); f.T(x, y + 57, 'GCB', 8.5, 'green', 'middle', bold=True, check=False)
f = E('13_03', 'Electrical Control Panel — Twin Generator', 760, 320, 'A synoptic overhead electrical panel with two generator switches, an APU generator switch, bus-tie switches, external power and battery switches',
    '<b>Reading the overhead electrical panel.</b> Most modern panels are <b>synoptic</b>: the switches are laid out on a line diagram of the system, so the pilot can see at a glance how power flows. Typical controls: a <b>generator switch</b> for each engine generator and the APU, <b>bus-tie</b> switches (usually AUTO), an <b>external power</b> switch lit AVAIL when ground power is connected, the <b>battery</b> switch, and a <b>generator drive disconnect</b> (guarded) to separate a failing IDG from the engine — which can only be reset on the ground. FAULT and OFF legends in the switch-lights show abnormal states.')
f.R(40, 30, 680, 260, c='line', sw=1.6, fill='g2', rx=10)
panel_gen(f, 160, 70, 'GEN 1'); panel_gen(f, 380, 70, 'APU'); panel_gen(f, 600, 70, 'GEN 2')
f.L(160, 136, 600, 136, 'cool', 3); f.T(380, 160, 'AC TIE', 9.5, 'cool', 'middle', bold=True)
for x in (270, 490): f.R(x - 26, 146, 52, 30, c='cool', sw=1.4, fill='black', rx=3); f.T(x, 166, 'AUTO', 9.5, 'green', 'middle', bold=True, check=False)
f.T(270, 192, 'bus-tie 1', 9.5, 'dim', 'middle'); f.T(490, 192, 'bus-tie 2', 9.5, 'dim', 'middle')
f.R(90, 210, 90, 44, c='hot', sw=1.6, fill='black', rx=3); f.T(135, 230, 'DRIVE', 9.5, 'hot', 'middle', bold=True, check=False); f.T(135, 246, 'DISC', 9.5, 'hot', 'middle', bold=True, check=False); f.T(135, 272, 'guarded', 9, 'dim', 'middle')
f.R(335, 210, 90, 44, c='gold', sw=1.6, fill='black', rx=3); f.T(380, 230, 'EXT PWR', 9.5, 'gold', 'middle', bold=True, check=False); f.T(380, 246, 'AVAIL', 9.5, 'green', 'middle', bold=True, check=False)
f.R(580, 210, 90, 44, c='ink', sw=1.6, fill='black', rx=3); f.T(625, 236, 'BAT', 11, 'ink', 'middle', bold=True, check=False)
f.T(380, 308, 'Synoptic layout: switches sit on a line diagram of the system.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('13_04', 'Electrical System Display Page', 760, 320, 'A generic electronic display page showing generator voltage, frequency and load, the bus layout, and battery and TRU indications',
    '<b>The electrical synoptic on the systems display.</b> Glass-cockpit aircraft show the electrical system on an ECAM or EICAS page. For each AC generator the page shows <b>load</b> (percentage of rating, or kVA), <b>voltage</b> (about 115 V) and <b>frequency</b> (about 400 Hz), and a line diagram shows which buses are powered and from where — powered lines in green, unpowered or failed items in amber. DC values show <b>TRU</b> and <b>battery</b> voltage and current. Parameters going out of limits change colour, giving an early warning before a failure.')
f.R(60, 30, 640, 260, c='line', sw=2, fill='black', rx=10)
for i, (x, lab) in enumerate(((150, 'GEN 1'), (380, 'APU GEN'), (610, 'GEN 2'))):
    f.R(x - 60, 50, 120, 76, c='white', sw=1.2, fill='none', rx=4); f.T(x, 66, lab, 10, 'white', 'middle', bold=True, check=False)
    for k, (v, u) in enumerate((('45', '%'), ('115', 'V'), ('400', 'HZ'))): f.T(x + 6, 86 + k * 14, v, 10, 'green', 'end', bold=True, mono=True, check=False); f.T(x + 14, 86 + k * 14, u, 9, 'cool', check=False)
f.L(150, 126, 150, 160, 'green', 2.4); f.L(610, 126, 610, 160, 'green', 2.4); f.L(380, 126, 380, 146, 'dim', 2)
f.R(90, 160, 160, 22, c='green', sw=1.6, fill='none', rx=3); f.T(170, 176, 'AC 1', 10, 'green', 'middle', bold=True, check=False)
f.R(510, 160, 160, 22, c='green', sw=1.6, fill='none', rx=3); f.T(590, 176, 'AC 2', 10, 'green', 'middle', bold=True, check=False)
f.T(380, 176, 'APU GEN: not on line', 9.5, 'amber', 'middle', check=False)
for x, lab in ((170, 'TR 1  28 V  60 A'), (590, 'TR 2  28 V  55 A')): f.L(x, 182, x, 210, 'green', 2); f.T(x, 228, lab, 10, 'green', 'middle', mono=True, check=False)
f.T(380, 262, 'BAT  27 V  0 A', 10, 'green', 'middle', mono=True, check=False)
f.T(380, 312, 'Green: normal / powered.  Amber: abnormal or not available.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('13_06', 'Four-Generator Electrical Control Panel', 760, 320, 'An overhead electrical panel for a four-engine aircraft with four generators, bus-tie breakers and a synchronising bus',
    '<b>Four engines, four generators.</b> On a four-engine aircraft each generator feeds its own AC bus through its <b>GCB</b>, and each bus can be connected to a common <b>synchronising (tie) bus</b> through its <b>bus-tie breaker (BTB)</b>. Depending on the design the generators are run <b>paralleled</b> through the sync bus, with real and reactive load sharing, or <b>split</b>. Each generator has its own <b>field</b> and <b>drive disconnect</b> controls, and the panel includes split-system breakers to divide the system into halves if a fault occurs. The layout is synoptic, matching the system diagram.')
f.R(40, 30, 680, 260, c='line', sw=1.6, fill='g2', rx=10)
for k in range(4):
    x = 130 + k * 167; panel_gen(f, x, 70, f'GEN {k+1}'); f.L(x, 136, x, 170, 'cool', 2.4)
    f.R(x - 22, 170, 44, 26, c='cool', sw=1.4, fill='black', rx=3); f.T(x, 188, 'BTB', 9, 'cool', 'middle', bold=True, check=False)
    f.L(x, 196, x, 226, 'cool', 2.4)
f.L(130, 226, 631, 226, 'gold', 3.4); f.T(380, 248, 'SYNCHRONISING (TIE) BUS', 10, 'gold', 'middle', bold=True)
f.R(355, 214, 50, 24, c='hot', sw=1.4, fill='black', rx=3); f.T(380, 230, 'SPLIT', 8.5, 'hot', 'middle', bold=True, check=False)
f.T(380, 310, 'Generators paralleled through the sync bus, or split into halves by the split-system breaker.', 10, 'ink', 'middle', bold=True)
EL.append(f)

f = E('13_07', 'Four-Generator Electrical Synoptic', 760, 320, 'A display page for a four-generator system showing each generator load, voltage and frequency, the generator and bus-tie breakers and the synchronising bus',
    '<b>The four-generator systems page</b> repeats the panel layout as a live diagram: each generator box shows <b>load</b>, <b>voltage</b> and <b>frequency</b>; breakers are drawn closed (in line) or open (across the line); powered buses and lines are green. In the example all four generators are on line and the bus-ties are closed, so the generators are paralleled on the synchronising bus and share the load equally. A tripped breaker, an off-line generator or a parameter out of limits would be shown in amber.')
f.R(40, 30, 680, 260, c='line', sw=2, fill='black', rx=10)
for k in range(4):
    x = 130 + k * 167
    f.R(x - 58, 46, 116, 70, c='white', sw=1.2, fill='none', rx=4); f.T(x, 62, f'GEN {k+1}', 10, 'white', 'middle', bold=True, check=False)
    for j, (v, u) in enumerate((('40', '%'), ('115', 'V'), ('400', 'HZ'))): f.T(x + 4, 80 + j * 13, v, 9.5, 'green', 'end', bold=True, mono=True, check=False); f.T(x + 10, 80 + j * 13, u, 8.5, 'cool', check=False)
    f.L(x, 116, x, 226, 'green', 2.4); f.Ci(x, 150, 9, 'green', 1.6, 'black'); f.L(x, 141, x, 159, 'green', 2)
    f.Ci(x, 196, 9, 'green', 1.6, 'black'); f.L(x, 187, x, 205, 'green', 2)
f.L(130, 226, 631, 226, 'green', 3.4); f.T(380, 250, 'SYNC BUS', 10, 'green', 'middle', bold=True, check=False)
f.T(700, 154, 'GCB', 9, 'cool', 'end', check=False); f.T(700, 200, 'BTB', 9, 'cool', 'end', check=False)
f.T(380, 310, 'Breaker symbol in line with the bus = closed; across it = open.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

# 14 transformers & rectifiers
f = E('14_01', 'Transformer Construction', 760, 300, 'A laminated iron core with a primary winding on one limb and a secondary winding on the other',
    '<b>Two windings on a laminated core.</b> The <b>primary</b> winding receives the supply; the <b>secondary</b> delivers the output. Both are wound on a common core of thin, insulated <b>laminations</b> of silicon steel, which carries the alternating flux from one winding to the other while the insulation between laminations blocks the <b>eddy currents</b> that would otherwise heat a solid core. Transformers have no moving parts and are very efficient (often 95–98%). They work <b>only on AC</b>.')
f.R(220, 60, 320, 200, c='ink', sw=2, fill='steel', rx=4); f.R(270, 100, 220, 120, c='ink', sw=2, fill='bg', rx=2)
for k in range(1, 8): f.L(220, 60 + k * 25, 270, 60 + k * 25, 'line', 1); f.L(490, 60 + k * 25, 540, 60 + k * 25, 'line', 1)
for k in range(7): f.R(204, 92 + k * 18, 82, 12, c='hot', sw=1.4, fill='hot', rx=6, op=0.85)
for k in range(10): f.R(474, 86 + k * 14, 82, 9, c='cool', sw=1.2, fill='cool', rx=4, op=0.85)
f.T(160, 160, 'PRIMARY', 11, 'hot', 'end', bold=True); f.T(160, 176, '(input)', 9.5, 'dim', 'end'); f.T(600, 160, 'SECONDARY', 11, 'cool', bold=True); f.T(600, 176, '(output)', 9.5, 'dim')
f.T(380, 50, 'laminated silicon-steel core', 10.5, 'ink', 'middle', bold=True); f.T(380, 166, 'laminations reduce eddy currents', 9.5, 'dim', 'middle')
f.T(380, 290, 'No moving parts; efficiency 95–98%; AC only.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('14_02', 'Step-Up vs Step-Down Transformer', 760, 300, 'Two transformers, one with more turns on the secondary raising the voltage and one with fewer turns lowering it',
    '<b>The turns ratio sets the voltage.</b> <b>V<sub>s</sub> ÷ V<sub>p</sub> = N<sub>s</sub> ÷ N<sub>p</sub></b>: the secondary voltage is the primary voltage multiplied by the ratio of turns. More turns on the secondary <b>steps up</b> the voltage; fewer <b>steps down</b>. Power is (almost) conserved, so current changes the opposite way: <b>I<sub>s</sub> ÷ I<sub>p</sub> = N<sub>p</sub> ÷ N<sub>s</sub></b> — stepping the voltage down steps the current up. Example: 115 V with a 4 : 1 turns ratio gives 28.75 V, the basis of the TRU supply for the DC system.')
for i, (x0, ttl, np_, ns, vin, vout) in enumerate(((40, 'STEP-UP', 4, 8, '115 V', '230 V'), (400, 'STEP-DOWN', 12, 3, '115 V', '28.75 V'))):
    f.T(x0 + 160, 40, ttl, 12, 'ink', 'middle', bold=True)
    f.R(x0 + 100, 70, 120, 150, c='ink', sw=2, fill='none', rx=4)
    coilV(f, x0 + 100, 90, 200, 'hot', np_, 2.6); coilV(f, x0 + 220, 90, 200, 'cool', ns, 2.6)
    f.T(x0 + 70, 150, vin, 11, 'hot', 'end', bold=True); f.T(x0 + 250, 150, vout, 11, 'cool', bold=True)
    f.T(x0 + 160, 244, f'{np_} : {ns} turns (ratio {np_ // ns if np_ >= ns else 1} : {ns // np_ if ns > np_ else 1})', 10, 'dim', 'middle')
f.T(380, 286, 'Vs / Vp = Ns / Np      Is / Ip = Np / Ns', 12, 'gold', 'middle', bold=True)
EL.append(f)

f = E('14_03', 'Autotransformer', 760, 300, 'A single tapped winding with the output taken between one end and a tapping point',
    '<b>One winding does both jobs.</b> An <b>autotransformer</b> has a single winding with a <b>tapping</b>: the supply is connected across the whole winding (or part of it) and the output taken from a tapping point, so part of the winding is common to both input and output. It is <b>smaller, lighter and cheaper</b> than a two-winding transformer for small voltage changes — for example 115 V to 26 V for instruments — but there is <b>no electrical isolation</b> between input and output, so a fault in the winding can put the full input voltage on the output.')
f.R(320, 60, 40, 200, c='ink', sw=1.6, fill='steel', rx=4); coilV(f, 300, 70, 250, 'gold', 9, 2.8)
wire(f, [(300, 70), (160, 70)]); wire(f, [(300, 250), (160, 250)]); f.T(140, 74, '115 V in', 11, 'hot', 'end', bold=True)
wire(f, [(300, 190), (480, 190)]); wire(f, [(300, 250), (480, 250)]); f.T(500, 224, '26 V out', 11, 'cool', bold=True); f.Ci(300, 190, 5, 'cool', 1, 'cool'); f.T(260, 186, 'tapping', 10, 'cool', 'end')
f.L(140, 74, 140, 250, 'hot', 1.2, me='hot', ms='hot') if False else None
note(f, 520, 70, ['One tapped winding:', 'small, light, cheap.'], first='gold')
note(f, 520, 130, ['No isolation between', 'input and output.'], first='hot')
EL.append(f)

f = E('14_04', 'Half-Wave Rectifier', 760, 300, 'A single diode feeding a load, with the input sine wave and the output consisting of positive half cycles only',
    '<b>One diode, half the wave.</b> A <b>diode</b> conducts in one direction only. In series with the load, it passes the <b>positive</b> half-cycles and blocks the negative ones, so the output is a series of positive humps with gaps between — <b>half-wave rectified DC</b>. It is simple, but wastes half of each cycle and has a large ripple at the supply frequency, so it is used only for small, undemanding loads. The arrow in the diode symbol points in the direction of conventional current flow.')
f.Ci(90, 150, 26, 'ink', 2, 'g3'); wave(f, 72, 108, 150, 10, 1, c='gold', sw=1.6)
wire(f, [(90, 124), (90, 80), (200, 80)]); f.P('M200,66 L200,94 L228,80 Z', 'hot', 1.6, 'hot'); f.L(228, 66, 228, 94, 'hot', 2.6); wire(f, [(228, 80), (320, 80), (320, 110)])
resV(f, 320, 110, 190); wire(f, [(320, 190), (320, 220), (90, 220), (90, 176)]); f.T(336, 156, 'LOAD', 10, 'hot', bold=True); f.T(214, 60, 'diode', 10, 'hot', 'middle', bold=True)
axesw(f, 420, 90, 720, 40, 'input'); wave(f, 420, 700, 90, 40, 2, c='gold')
axesw(f, 420, 220, 720, 40, 'output'); wave(f, 420, 700, 220, 40, 2, c='green', fn=lambda a: max(0, math.sin(a)))
EL.append(f)

f = E('14_05', 'Full-Wave Bridge Rectifier', 760, 300, 'Four diodes in a bridge feeding a load, with both halves of the input wave turned into positive humps',
    '<b>Four diodes use the whole wave.</b> In a <b>bridge rectifier</b>, on one half-cycle two diodes conduct and on the other half-cycle the other two, and in both cases the current passes through the load in the <b>same direction</b>. The output is a continuous series of positive humps at <b>twice</b> the supply frequency — much smoother than half-wave and easily smoothed further with a capacitor. Bridges are used in alternator output stages and battery chargers.')
cx, cy = 200, 150
for (a, b) in ((pol(cx, cy, 70, 270), pol(cx, cy, 70, 0)), (pol(cx, cy, 70, 180), pol(cx, cy, 70, 90)), (pol(cx, cy, 70, 270), pol(cx, cy, 70, 180)), (pol(cx, cy, 70, 0), pol(cx, cy, 70, 90))): f.L(a[0], a[1], b[0], b[1], 'ink', 1.8)
for (a, b) in ((pol(cx, cy, 70, 270), pol(cx, cy, 70, 0)), (pol(cx, cy, 70, 180), pol(cx, cy, 70, 90)), (pol(cx, cy, 70, 270), pol(cx, cy, 70, 180)), (pol(cx, cy, 70, 0), pol(cx, cy, 70, 90))):
    m = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2); f.Ci(m[0], m[1], 9, 'hot', 1.6, 'hot')
f.T(cx - 60, 244, 'four diodes in a bridge', 10, 'hot', 'middle', bold=True)
L, R = pol(cx, cy, 70, 270), pol(cx, cy, 70, 90); T, B = pol(cx, cy, 70, 0), pol(cx, cy, 70, 180)
wire(f, [(L[0], L[1]), (60, L[1])]); wire(f, [(R[0], R[1]), (60 + 0, R[1])]) if False else None
f.T(60, L[1] + 4, 'AC in', 10, 'gold', 'end', bold=True); f.L(64, L[1], L[0], L[1], 'gold', 1.6); f.L(R[0], R[1], 300, R[1], 'gold', 1.6); f.T(304, R[1] - 8, 'AC in', 10, 'gold', bold=True)
wire(f, [T, (T[0], 40), (340, 40), (340, 110)]); resV(f, 340, 110, 190); wire(f, [(340, 190), (340, 270), (B[0], 270), B])
f.T(356, 156, 'LOAD', 10, 'hot', bold=True)
axesw(f, 430, 90, 720, 40, 'input'); wave(f, 430, 700, 90, 40, 2, c='gold')
axesw(f, 430, 220, 720, 40, 'output'); wave(f, 430, 700, 220, 40, 2, c='green', fn=lambda a: abs(math.sin(a)))
EL.append(f)

f = E('14_06', 'Three-Phase Rectifier — Transformer-Rectifier Unit (TRU)', 760, 300, 'A three-phase transformer stepping 115/200 V down, feeding a six-diode bridge that produces 28 V DC with small ripple',
    '<b>The TRU makes the DC.</b> A <b>transformer-rectifier unit</b> takes the aircraft’s 115/200 V three-phase AC, <b>steps it down</b> with a three-phase transformer, and rectifies it with a <b>six-diode bridge</b> to about <b>28 V DC</b>, typically 100–200 A. With three phases overlapping, the output has <b>six</b> pulses per cycle and very little ripple, so little or no smoothing is needed. TRUs feed the DC buses and charge the battery; they are cooled by a fan, with overheat warning, and have no voltage regulation of their own — their output varies slightly with load.')
f.box(40, 110, 130, 80, ['115/200 V', '3-phase AC'], c='gold', size=11)
f.L(170, 150, 220, 150, 'gold', 2.4, me='gold'); f.box(220, 100, 140, 100, ['3-phase', 'step-down', 'transformer'], c='ink', size=10.5)
f.L(360, 150, 410, 150, 'ink', 2.4, me='ink'); f.box(410, 100, 140, 100, ['6-diode', 'bridge', 'rectifier'], c='hot', size=10.5)
f.L(550, 150, 600, 150, 'green', 2.4, me='green'); f.box(600, 110, 130, 80, ['28 V DC', '100–200 A'], c='green', size=11)
f.L(80, 250, 700, 250, 'ink', 1.2); wave(f, 80, 700, 250, 18, 6, c='green', fn=lambda a: 0.85 + 0.15 * abs(math.cos(a)))
f.T(380, 280, 'six pulses per cycle: small ripple', 10, 'green', 'middle', bold=True); f.T(380, 60, 'TRANSFORMER-RECTIFIER UNIT', 11.5, 'ink', 'middle', bold=True)
EL.append(f)

# 15 AC motors
f = E('15_01', 'Rotating Magnetic Field from a Three-Phase Stator', 760, 300, 'A stator with three windings fed by three phases, and the resultant field arrow rotating as the phases peak in turn',
    '<b>Three phases make a field that turns.</b> Feed three stator windings, 120° apart round the machine, with three-phase current. Each produces a pulsating field along its own axis, and as the three phases peak in turn, their combined field has <b>constant strength</b> and <b>rotates</b> round the stator at the <b>synchronous speed</b>: n = (60 × f) ÷ pole pairs — 24 000 rpm for a two-pole machine on 400 Hz. Swapping any two supply leads reverses the direction of rotation. This rotating field is what drives every three-phase AC motor, with no commutator or brushes.')
cx, cy = 200, 150; f.Ci(cx, cy, 110, 'ink', 2.2, 'g3'); f.Ci(cx, cy, 70, 'ink', 1, 'bg')
for k, c_ in enumerate(('hot', 'gold', 'cool')):
    for a in (k * 120, k * 120 + 180): p = pol(cx, cy, 90, a); f.R(p[0] - 12, p[1] - 12, 24, 24, c=c_, sw=1.6, fill=c_, rx=4, op=0.85)
t = pol(cx, cy, 64, 30); f.L(cx, cy, t[0], t[1], 'green', 5, me='green'); circle_arrows(f, cx, cy, 44, True, 'green', 3)
f.T(cx, 286, 'resultant field rotates', 11, 'green', 'middle', bold=True)
axesw(f, 380, 150, 720, 80)
for k, c_ in enumerate(('hot', 'gold', 'cool')): wave(f, 380, 700, 150, 80, 1.5, phase=-k * 2 * math.pi / 3, c=c_, sw=2.2)
f.T(550, 40, 'phases A, B and C peak in turn', 11, 'ink', 'middle', bold=True)
f.T(550, 286, 'synchronous speed = 60 × f / pole pairs', 11, 'gold', 'middle', bold=True)
EL.append(f)

f = E('15_02', 'Squirrel-Cage Induction Motor', 760, 300, 'A cage of copper bars joined by end rings forming the rotor, inside a three-phase stator',
    '<b>The workhorse AC motor.</b> The rotor is a <b>squirrel cage</b>: copper or aluminium bars set in a laminated iron core and shorted together by <b>end rings</b> — no electrical connection to the outside at all. The stator’s rotating field sweeps past the bars and <b>induces</b> currents in them; those currents, in the field, produce torque (motor principle), and the rotor follows the field. It must always run slightly <b>slower</b> than the field — the difference is the <b>slip</b>, a few per cent — otherwise no current would be induced. Simple, rugged and brushless, it drives aircraft fuel pumps, hydraulic pumps and fans.')
for k in range(8): x = 180 + k * 28; f.L(x, 90, x, 220, 'warm', 6)
f.El(278, 90, 110, 16, 'warm', 5); f.El(278, 220, 110, 16, 'warm', 5)
f.T(278, 60, 'end ring', 10, 'warm', 'middle', bold=True); f.T(278, 252, 'end ring', 10, 'warm', 'middle', bold=True); f.T(278, 290, 'conductor bars shorted by the end rings', 10, 'warm', 'middle', bold=True)
note(f, 470, 60, ['Rotating stator field', 'induces currents in', 'the bars: torque.'], first='ink')
note(f, 470, 140, ['Rotor runs slightly', 'slower than the field:', 'the slip.'], first='gold')
note(f, 470, 220, ['No brushes or', 'connections to the rotor.'], first='green')
EL.append(f)

# 16 semiconductors
f = E('16_01', 'The Silicon Atom', 760, 280, 'A silicon atom with a nucleus and three shells of electrons, four of which are valence electrons in the outer shell',
    '<b>Why silicon is a semiconductor.</b> A silicon atom has 14 electrons in three shells, the outermost containing <b>four valence electrons</b>. Germanium, the other common semiconductor, also has four. Those four outer electrons are shared with neighbouring atoms in a crystal, and at very low temperature none is free, so pure silicon is an insulator. At room temperature a few gain enough energy to break free and conduct — far fewer than in a metal, hence “semi”-conductor. Adding impurities (doping) changes this dramatically.')
cx, cy = 200, 140
for r in (36, 64, 92): f.Ci(cx, cy, r, 'line', 1.4)
f.Ci(cx, cy, 20, 'hot', 1.4, 'hot'); f.T(cx, cy + 4, '+14', 10, 'white', 'middle', bold=True, check=False)
for r, n in ((36, 2), (64, 8), (92, 4)):
    for k in range(n): p = pol(cx, cy, r, k * 360 / n + 20); f.Ci(p[0], p[1], 6, 'ink', 1, 'cool' if r < 92 else 'gold')
f.T(400, 80, 'Silicon: 14 electrons in three shells', 11, 'ink', bold=True)
f.Ci(410, 120, 6, 'ink', 1, 'gold'); f.T(424, 124, 'four valence electrons in the outer shell', 10.5, 'gold', bold=True)
note(f, 400, 170, ['Pure silicon: almost an insulator.', 'A few electrons break free at room', 'temperature: a semiconductor.'], first='ink')
EL.append(f)

def lattice(f, x0, y0, special=None):
    for i in range(4):
        for j in range(3):
            x, y = x0 + i * 70, y0 + j * 70
            if i < 3: f.L(x + 18, y - 4, x + 52, y - 4, 'line', 1.4); f.L(x + 18, y + 4, x + 52, y + 4, 'line', 1.4); f.Ci(x + 30, y - 4, 3.4, 'gold', 1, 'gold'); f.Ci(x + 40, y + 4, 3.4, 'gold', 1, 'gold')
            if j < 2: f.L(x - 4, y + 18, x - 4, y + 52, 'line', 1.4); f.L(x + 4, y + 18, x + 4, y + 52, 'line', 1.4); f.Ci(x - 4, y + 30, 3.4, 'gold', 1, 'gold'); f.Ci(x + 4, y + 40, 3.4, 'gold', 1, 'gold')
    for i in range(4):
        for j in range(3):
            x, y = x0 + i * 70, y0 + j * 70; lab = 'Si'; c_ = 'steel'
            if special and (i, j) == (1, 1): lab, c_ = special
            f.Ci(x, y, 17, 'ink', 1.4, c_); f.T(x, y + 4, lab, 10, 'white', 'middle', bold=True, check=False)
f = E('16_02', 'Covalent Bonds in a Silicon Crystal', 760, 280, 'A grid of silicon atoms each sharing its four valence electrons with four neighbours in pairs',
    '<b>Atoms share electrons to complete their shells.</b> In a silicon <b>crystal</b> each atom sits at the centre of four neighbours and shares one of its four valence electrons with each, so every bond is a <b>pair</b> of shared electrons — a <b>covalent bond</b>. Each atom then behaves as if it had a full outer shell of eight, and the electrons are tightly held: pure (intrinsic) silicon conducts very poorly. Heat or light can break a bond, freeing an electron and leaving a gap — a <b>hole</b> — so conductivity rises with temperature, the opposite of a metal.')
lattice(f, 100, 70)
note(f, 420, 80, ['Each pair of gold dots is a', 'covalent bond: two shared', 'electrons.'], first='gold')
note(f, 420, 160, ['Every atom effectively has a', 'full outer shell of eight.'], first='ink')
note(f, 420, 220, ['Conductivity rises with', 'temperature (unlike a metal).'], first='hot')
EL.append(f)

f = E('16_03', 'N-Type Doping — A Free Electron', 760, 280, 'A silicon crystal with one atom replaced by a phosphorus atom, which has a fifth valence electron left free',
    '<b>Adding electrons.</b> If a tiny amount of a <b>pentavalent</b> impurity — one with <b>five</b> valence electrons, such as phosphorus, arsenic or antimony — is added, each impurity atom bonds with four silicon neighbours and has <b>one electron left over</b>, very loosely held and free to move. The impurity is called a <b>donor</b>. The material now conducts mainly by these free <b>negative</b> electrons, so it is <b>N-type</b> silicon. It is still electrically neutral overall: the donor atom has an extra proton for its extra electron.')
lattice(f, 100, 70, ('P', 'cool')); f.Ci(206, 160, 6, 'hot', 1, 'hot'); f.L(216, 164, 250, 180, 'hot', 1.6, me='hot')
note(f, 420, 80, ['Phosphorus (5 valence electrons)', 'replaces one silicon atom.'], first='cool')
note(f, 420, 150, ['Its fifth electron is free:', 'a NEGATIVE charge carrier.'], first='hot')
note(f, 420, 220, ['Donor impurity: N-type.', 'Majority carriers: electrons.'], first='ink')
EL.append(f)

f = E('16_04', 'P-Type Doping — A Hole', 760, 280, 'A silicon crystal with one atom replaced by a boron atom, which has only three valence electrons and leaves a hole in one bond',
    '<b>Adding holes.</b> A <b>trivalent</b> impurity — with only <b>three</b> valence electrons, such as boron, gallium or indium — bonds with four silicon neighbours but leaves <b>one bond short of an electron</b>: a <b>hole</b>. A neighbouring electron can jump in to fill it, leaving a hole where it came from, so the hole effectively moves through the crystal like a <b>positive</b> charge. The impurity is an <b>acceptor</b>, and the material is <b>P-type</b>, with holes as the majority carriers.')
lattice(f, 100, 70, ('B', 'hot')); f.Ci(200, 136, 6, 'hot', 2, 'bg')
note(f, 420, 80, ['Boron (3 valence electrons)', 'replaces one silicon atom.'], first='hot')
note(f, 420, 150, ['One bond is missing an electron:', 'a HOLE, acting as a', 'positive charge carrier.'], first='gold')
note(f, 420, 230, ['Acceptor impurity: P-type.', 'Majority carriers: holes.'], first='ink')
EL.append(f)

f = E('16_05', 'The PN Junction & Depletion Layer', 760, 280, 'P-type and N-type material joined, with a thin depletion layer at the junction where free carriers have combined',
    '<b>Where P meets N.</b> When P-type and N-type silicon are formed in one crystal, free electrons near the junction diffuse across and fill holes on the other side. This leaves a thin region on both sides with <b>no free carriers</b> — the <b>depletion layer</b> — containing fixed negative ions on the P side and positive ions on the N side. Their charge creates a <b>barrier potential</b> (about <b>0.6–0.7 V</b> for silicon, 0.3 V for germanium) that stops further diffusion. The junction is now a one-way valve: the basis of the diode.')
f.R(100, 90, 240, 120, c='ink', sw=1.6, fill='hot', rx=2, op=0.35); f.R(400, 90, 240, 120, c='ink', sw=1.6, fill='cool', rx=2, op=0.35)
f.R(340, 90, 60, 120, c='ink', sw=1.6, fill='g3', rx=0)
import random
random.seed(2)
for k in range(18): f.Ci(110 + random.random() * 220, 100 + random.random() * 100, 5, 'hot', 1.6, 'bg')
for k in range(18): f.Ci(410 + random.random() * 220, 100 + random.random() * 100, 5, 'cool', 1, 'cool')
for y in (110, 140, 170, 196): f.T(354, y, '−', 13, 'hot', 'middle', bold=True); f.T(386, y, '+', 13, 'cool', 'middle', bold=True)
f.T(220, 76, 'P-TYPE: holes', 11, 'hot', 'middle', bold=True); f.T(520, 76, 'N-TYPE: free electrons', 11, 'cool', 'middle', bold=True)
f.T(370, 234, 'depletion layer', 10.5, 'gold', 'middle', bold=True); f.T(370, 250, '(no free carriers)', 9.5, 'dim', 'middle')
f.T(380, 274, 'Barrier potential: about 0.6–0.7 V for silicon, 0.3 V for germanium.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('16_06', 'Forward vs Reverse Bias', 760, 300, 'A PN junction connected with positive to P giving a narrow depletion layer and current flow, and reversed giving a wide depletion layer and no current',
    '<b>The junction conducts one way.</b> <b>Forward bias</b>: positive to the P side, negative to the N side. The supply pushes carriers towards the junction, the depletion layer <b>narrows</b>, and once the barrier potential (about 0.6 V for silicon) is overcome a large current flows. <b>Reverse bias</b>: positive to N, negative to P. Carriers are pulled away from the junction, the depletion layer <b>widens</b>, and only a tiny leakage current flows — until, at the <b>breakdown voltage</b>, the junction suddenly conducts heavily (avalanche), which normally destroys an ordinary diode.')
for i, (x0, ttl, w, cur, sgn) in enumerate(((40, 'FORWARD BIAS: conducts', 16, True, 1), (420, 'REVERSE BIAS: blocks', 60, False, -1))):
    f.T(x0 + 150, 40, ttl, 11.5, 'green' if cur else 'hot', 'middle', bold=True)
    f.R(x0 + 30, 90, 120, 70, c='ink', sw=1.6, fill='hot', rx=2, op=0.35); f.R(x0 + 150 + w, 90, 120, 70, c='ink', sw=1.6, fill='cool', rx=2, op=0.35); f.R(x0 + 150, 90, w, 70, c='ink', sw=1.4, fill='g3', rx=0)
    f.T(x0 + 90, 130, 'P', 16, 'hot', 'middle', bold=True); f.T(x0 + 210 + w, 130, 'N', 16, 'cool', 'middle', bold=True)
    wire(f, [(x0 + 30, 125), (x0 + 10, 125), (x0 + 10, 220), (x0 + 120, 220)]); wire(f, [(x0 + 270 + w, 125), (x0 + 290 + w, 125), (x0 + 290 + w, 220), (x0 + 160, 220)])
    f.L(x0 + 136 + (4 if sgn > 0 else -4), 206, x0 + 136 + (4 if sgn > 0 else -4), 234, 'ink', 2.4); f.L(x0 + 144 - (4 if sgn > 0 else -4), 212, x0 + 144 - (4 if sgn > 0 else -4), 228, 'ink', 4)
    f.T(x0 + 120 if sgn > 0 else x0 + 168, 204, '+', 12, 'hot', 'middle', bold=True); f.T(x0 + 168 if sgn > 0 else x0 + 120, 204, '−', 12, 'cool', 'middle', bold=True)
    f.T(x0 + 150 + w / 2, 180, 'narrow' if cur else 'wide', 9.5, 'gold', 'middle')
    f.T(x0 + 150, 262, 'current flows' if cur else 'tiny leakage only', 10.5, 'green' if cur else 'hot', 'middle', bold=True)
f.T(380, 292, 'Reverse breakdown at a set voltage: avalanche (a Zener diode uses this deliberately).', 10, 'ink', 'middle')
EL.append(f)

f = E('16_07', 'The Diode & Its Symbol', 760, 280, 'A diode package with a band marking the cathode, its circuit symbol and its current against voltage characteristic',
    '<b>Reading a diode.</b> The circuit symbol is an <b>arrow (anode)</b> meeting a <b>bar (cathode)</b>; the arrow points in the direction of conventional current. On the component itself the cathode end is marked with a <b>band</b>. The characteristic shows almost no forward current until about <b>0.6 V</b> (silicon), then a steep rise; in reverse only a tiny leakage until <b>breakdown</b>. A <b>Zener diode</b> is designed to break down at a precise voltage without damage and is used as a voltage reference; a <b>light-emitting diode (LED)</b> gives off light when forward-biased.')
f.R(80, 70, 160, 40, c='ink', sw=1.6, fill='black', rx=8); f.R(214, 70, 14, 40, c='none', sw=0, fill='white', rx=0); f.L(40, 90, 80, 90, 'ink', 2.4); f.L(240, 90, 280, 90, 'ink', 2.4)
f.T(160, 132, 'band marks the cathode', 10, 'ink', 'middle')
f.L(60, 200, 130, 200, 'ink', 2.2); f.P('M130,184 L130,216 L162,200 Z', 'hot', 1.6, 'hot'); f.L(162, 184, 162, 216, 'hot', 3); f.L(162, 200, 230, 200, 'ink', 2.2)
f.T(110, 236, 'anode', 10, 'ink', 'middle', bold=True); f.T(182, 236, 'cathode', 10, 'ink', 'middle', bold=True)
f.L(340, 170, 720, 170, 'ink', 1.4, me='ink'); f.L(520, 270, 520, 40, 'ink', 1.4, me='ink'); f.T(716, 188, 'voltage', 9.5, 'dim', 'end'); f.T(528, 50, 'current', 9.5, 'dim')
f.P('M520,170 L590,168 Q608,160 616,60', 'green', 2.6); f.T(624, 80, 'forward: conducts', 10, 'green', bold=True); f.T(590, 186, '0.6 V', 9.5, 'green', 'middle')
f.P('M520,170 L400,172 L392,180 L384,260', 'hot', 2.6); f.T(380, 248, 'breakdown', 10, 'hot', 'end', bold=True); f.T(460, 160, 'leakage', 9.5, 'hot', 'middle')
EL.append(f)

f = E('16_08', 'Transistor — NPN & PNP', 760, 280, 'The layer structure and circuit symbols of NPN and PNP bipolar transistors with collector, base and emitter',
    '<b>Three layers, three leads.</b> A bipolar transistor is a sandwich of two PN junctions: <b>NPN</b> (a thin P-type base between two N-type layers) or <b>PNP</b>. The three terminals are the <b>collector</b>, <b>base</b> and <b>emitter</b>. In the symbol the arrow on the <b>emitter</b> points in the direction of conventional current: <b>out</b> for NPN (“Not Pointing iN”), <b>in</b> for PNP. A small base current controls a much larger collector current, so the transistor can act as an <b>amplifier</b> or a <b>switch</b>.')
for i, (x0, lay, ttl, outward) in enumerate(((60, ('N', 'P', 'N'), 'NPN', True), (420, ('P', 'N', 'P'), 'PNP', False))):
    f.T(x0 + 140, 40, ttl, 13, 'ink', 'middle', bold=True)
    for k, l in enumerate(lay): f.R(x0 + k * 50, 70, 50 if k != 1 else 30, 80, c='ink', sw=1.4, fill='cool' if l == 'N' else 'hot', rx=0, op=0.5) if False else None
    xs = (x0, x0 + 50, x0 + 80)
    for k, (l, w) in enumerate(zip(lay, (50, 30, 50))): f.R(xs[k], 70, w, 80, c='ink', sw=1.4, fill='cool' if l == 'N' else 'hot', rx=0, op=0.5); f.T(xs[k] + w / 2, 116, l, 14, 'ink', 'middle', bold=True)
    f.T(x0 + 25, 170, 'collector', 9.5, 'dim', 'middle'); f.T(x0 + 65, 190, 'base', 9.5, 'dim', 'middle'); f.T(x0 + 105, 170, 'emitter', 9.5, 'dim', 'middle')
    cx_, cy_ = x0 + 240, 130; f.Ci(cx_, cy_, 40, 'ink', 1.6)
    f.L(cx_ - 50, cy_, cx_ - 12, cy_, 'ink', 2.2); f.L(cx_ - 12, cy_ - 24, cx_ - 12, cy_ + 24, 'ink', 3.4)
    f.L(cx_ - 12, cy_ - 10, cx_ + 20, cy_ - 34, 'ink', 2.2); f.L(cx_ + 20, cy_ - 34, cx_ + 20, cy_ - 60, 'ink', 2.2)
    if outward: f.L(cx_ - 12, cy_ + 10, cx_ + 20, cy_ + 34, 'hot', 2.2, me='hot')
    else: f.L(cx_ + 20, cy_ + 34, cx_ - 10, cy_ + 12, 'hot', 2.2, me='hot')
    f.L(cx_ + 20, cy_ + 34, cx_ + 20, cy_ + 60, 'ink', 2.2)
    f.T(cx_ + 28, cy_ - 52, 'C', 11, 'ink', bold=True); f.T(cx_ - 54, cy_ - 6, 'B', 11, 'ink', 'end', bold=True); f.T(cx_ + 28, cy_ + 58, 'E', 11, 'ink', bold=True)
f.T(380, 262, 'Emitter arrow: OUT for NPN (Not Pointing iN), IN for PNP.', 11, 'ink', 'middle', bold=True)
EL.append(f)

f = E('16_09', 'Transistor as a Switch', 760, 300, 'An NPN transistor switching a lamp: with no base current it is off, with a small base current it turns fully on',
    '<b>A small current switches a large one.</b> With <b>no base current</b>, the base-emitter junction is not forward-biased and almost no collector current flows: the transistor is <b>OFF</b> (cut-off) and the lamp is dark. Apply a small base current through a resistor and the transistor turns <b>fully ON</b> (saturated): a collector current many times larger — typically 20 to 200 times — flows and the lamp lights. With no moving parts, transistor switches are fast, silent and do not wear; they replace relays throughout modern avionics and power control.')
for i, (x0, on) in enumerate(((60, False), (420, True))):
    cx_, cy_ = x0 + 140, 170; f.Ci(cx_, cy_, 30, 'ink', 1.6)
    f.L(cx_ - 8, cy_ - 18, cx_ - 8, cy_ + 18, 'ink', 3); f.L(cx_ - 8, cy_ - 8, cx_ + 16, cy_ - 26, 'ink', 2); f.L(cx_ - 8, cy_ + 8, cx_ + 16, cy_ + 26, 'hot', 2, me='hot')
    wire(f, [(cx_ + 16, cy_ - 26), (cx_ + 16, 100)]); lamp(f, cx_ + 16, 86, 14, 'gold' if on else 'dim'); wire(f, [(cx_ + 16, 72), (cx_ + 16, 50), (x0 + 280, 50)]); f.T(x0 + 286, 54, '+28 V', 10, 'ink')
    wire(f, [(cx_ + 16, cy_ + 26), (cx_ + 16, 250)]); ground(f, cx_ + 16, 250)
    wire(f, [(cx_ - 40, cy_), (cx_ - 8, cy_)]); resH(f, x0 + 20, cx_ - 40, cy_, 'cool', 1.8, 3); f.T(x0 + 20, cy_ - 14, 'base', 9.5, 'cool')
    f.T(x0 + 140, 296, 'no base current: OFF, lamp dark' if not on else 'small base current: ON, lamp lit', 11, 'gold' if on else 'dim', 'middle', bold=True)
    if on: f.L(x0 + 20, cy_ + 20, x0 + 60, cy_ + 20, 'cool', 1.6, me='cool'); f.L(cx_ + 34, 120, cx_ + 34, 200, 'gold', 2, me='gold'); f.T(cx_ + 42, 160, 'large collector current', 9.5, 'gold')
EL.append(f)

# 17 logic gates
def gate(f, x, y, kind, label):
    s = 1.0
    if kind in ('AND', 'NAND'): f.P(f'M{x},{y-28} L{x+30},{y-28} A28,28 0 0 1 {x+30},{y+28} L{x},{y+28} Z', 'ink', 2, 'g3'); out = x + 58
    elif kind in ('OR', 'NOR', 'XOR'):
        f.P(f'M{x},{y-28} Q{x+40},{y-28} {x+62},{y} Q{x+40},{y+28} {x},{y+28} Q{x+14},{y} {x},{y-28} Z', 'ink', 2, 'g3'); out = x + 62
        if kind == 'XOR': f.P(f'M{x-8},{y-28} Q{x+6},{y} {x-8},{y+28}', 'ink', 2)
    else: f.P(f'M{x},{y-24} L{x+44},{y} L{x},{y+24} Z', 'ink', 2, 'g3'); out = x + 44
    if kind in ('NAND', 'NOR', 'NOT'): f.Ci(out + 5, y, 5, 'ink', 2, 'bg'); out += 10
    if kind != 'NOT': f.L(x - 40, y - 14, x + 4, y - 14, 'ink', 2); f.L(x - 40, y + 14, x + 4, y + 14, 'ink', 2); f.T(x - 46, y - 10, 'A', 11, 'ink', 'end', bold=True); f.T(x - 46, y + 18, 'B', 11, 'ink', 'end', bold=True)
    else: f.L(x - 40, y, x, y, 'ink', 2); f.T(x - 46, y + 4, 'A', 11, 'ink', 'end', bold=True)
    f.L(out, y, out + 40, y, 'ink', 2); f.T(out + 46, y + 4, 'Q', 11, 'ink', bold=True)
    f.T(x + 20, y - 44, label, 12, 'gold', 'middle', bold=True)
def truth(f, x, y, rows, two=True):
    table(f, x, y, [44, 44, 52] if two else [52, 52], ['A', 'B', 'Q'] if two else ['A', 'Q'], rows, 'gold')
GATES = (('17_01', 'AND', 'AND Gate', [('0', '0', '0'), ('0', '1', '0'), ('1', '0', '0'), ('1', '1', '1')], 'Output is 1 only when ALL inputs are 1.', 'two switches in SERIES: both must be closed',
          '<b>AND: all inputs must be true.</b> The output Q is 1 (high) only when input A <b>and</b> input B are both 1; any 0 input gives a 0 output. It is equivalent to two switches in <b>series</b> controlling a lamp: the lamp lights only if both are closed. Typical use: a warning that should come on only when two conditions exist together, e.g. throttle at take-off power AND flaps not set — the take-off configuration warning.'),
         ('17_02', 'OR', 'OR Gate', [('0', '0', '0'), ('0', '1', '1'), ('1', '0', '1'), ('1', '1', '1')], 'Output is 1 when ANY input is 1.', 'two switches in PARALLEL: either closes the circuit',
          '<b>OR: any input true.</b> The output is 1 when input A <b>or</b> input B (or both) is 1; only when all inputs are 0 is the output 0. It is equivalent to two switches in <b>parallel</b>: either one lights the lamp. Typical use: a master caution light that comes on if any one of several faults is present.'),
         ('17_03', 'NOT', 'NOT Gate (Inverter)', [('0', '1'), ('1', '0')], 'Output is the opposite of the input.', 'the small circle (bubble) means “inverted”',
          '<b>NOT: the inverter.</b> A single input, and the output is always the <b>opposite</b>: 1 in gives 0 out, 0 in gives 1 out. The small circle (<b>bubble</b>) on the output is the symbol for inversion, and appears on NAND and NOR gates too. Typical use: turning a “gear down and locked” signal into a “gear not locked” warning.'),
         ('17_04', 'NAND', 'NAND Gate', [('0', '0', '1'), ('0', '1', '1'), ('1', '0', '1'), ('1', '1', '0')], 'Output is 0 only when ALL inputs are 1.', 'an AND gate followed by a NOT',
          '<b>NAND: NOT-AND.</b> An AND gate with its output inverted: the output is 0 only when all inputs are 1, and 1 otherwise. NAND is a <b>universal gate</b> — any other logic function can be built from NAND gates alone — so it is widely used in integrated circuits.'),
         ('17_05', 'NOR', 'NOR Gate', [('0', '0', '1'), ('0', '1', '0'), ('1', '0', '0'), ('1', '1', '0')], 'Output is 1 only when ALL inputs are 0.', 'an OR gate followed by a NOT',
          '<b>NOR: NOT-OR.</b> An OR gate with its output inverted: the output is 1 only when <b>all</b> inputs are 0; any 1 input gives 0. Like NAND, NOR is a universal gate. Typical use: an “all normal” indication that is lit only when none of several fault signals is present.'),
         ('17_06', 'XOR', 'XOR (Exclusive-OR) Gate', [('0', '0', '0'), ('0', '1', '1'), ('1', '0', '1'), ('1', '1', '0')], 'Output is 1 when the inputs are DIFFERENT.', 'compares two signals: 1 if they disagree',
          '<b>XOR: exclusive OR.</b> The output is 1 when the inputs are <b>different</b> — one or the other, but not both — and 0 when they are the same. That makes it a natural <b>comparator</b>: fed with the outputs of two duplicated systems, an XOR gate signals a <b>disagreement</b> between them, as in comparator warnings between two attitude or air-data sources. It is also the core of binary addition.'))
for tag, kind, title, rows, rule, sub, cap in GATES:
    f = E(tag, title, 760, 260, f'The {kind} gate symbol and its truth table', cap)
    gate(f, 140, 120, kind, kind)
    truth(f, 420, 50, rows, kind != 'NOT')
    f.T(380, 222, rule, 11.5, 'ink', 'middle', bold=True); f.T(380, 244, sub, 10, 'dim', 'middle')
    EL.append(f)

if __name__ == '__main__':
    gallery(EL, 'Electrics Gallery 3', 'Electrics — AC, Electronics & Logic', 'Original figures for AC theory, alternators, AC distribution, transformers and rectifiers, AC motors, semiconductors and logic gates.', 'el3-gallery.html')
    print(f'EL3 {len(EL)}  QA warnings: {len(WARN)}')
    for w in WARN: print('  ⚠', w)
