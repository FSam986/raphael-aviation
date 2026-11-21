#!/usr/bin/env python3
"""Electrics part 1 (chapters 1-5): DC principles, switches, protection, capacitors, batteries, magnetism."""
import math
from figlib import *
from gen_common import note, gallery
from elec_common import *

EL = []

# 01_01 atom
f = E('01_01', 'Structure of an Atom', 760, 320, 'A nucleus of protons and neutrons with electrons orbiting in shells',
    '<b>All matter is made of atoms.</b> At the centre is the <b>nucleus</b>, containing positively charged <b>protons</b> and uncharged <b>neutrons</b>. Around it, in shells, move negatively charged <b>electrons</b>. A normal atom has equal numbers of protons and electrons and so is electrically neutral. Electrons in the outermost shell (the <b>valence</b> electrons) are only loosely held; in a <b>conductor</b> such as copper they drift freely from atom to atom, and that movement of electrons is an electric current. In an <b>insulator</b> they are tightly bound.')
cx, cy = 230, 160
for rx, ry, rot in ((140, 46, 0), (140, 46, 60), (140, 46, 120)): f.raw(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" transform="rotate({rot} {cx} {cy})" fill="none" stroke="{col("line")}" stroke-width="1.4"/>')
for dx, dy, c_ in ((-8, -6, 'hot'), (8, -6, 'steel'), (0, 7, 'hot'), (-10, 8, 'steel'), (10, 8, 'hot'), (0, -12, 'steel')): f.Ci(cx + dx, cy + dy, 8, 'ink', 1, c_)
for rot, t in ((0, 0.2), (60, 0.55), (120, 0.85), (0, 0.65)):
    a = 2 * math.pi * t; x, y = 140 * math.cos(a), 46 * math.sin(a); r = math.radians(rot)
    f.Ci(cx + x * math.cos(r) - y * math.sin(r), cy + x * math.sin(r) + y * math.cos(r), 6, 'ink', 1, 'cool')
f.T(cx, cy + 46, 'nucleus', 9.5, 'dim', 'middle')
f.Ci(450, 90, 8, 'ink', 1, 'hot'); f.T(468, 94, 'proton: positive (+)', 10.5, 'ink', bold=True)
f.Ci(450, 130, 8, 'ink', 1, 'steel'); f.T(468, 134, 'neutron: no charge', 10.5, 'ink', bold=True)
f.Ci(450, 170, 6, 'ink', 1, 'cool'); f.T(468, 174, 'electron: negative (−)', 10.5, 'ink', bold=True)
note(f, 440, 220, ['Neutral atom: protons = electrons.', 'Loosely held outer electrons drift', 'freely in a conductor: a current.'])
EL.append(f)

# 01_02 electron flow vs conventional
f = E('01_02', 'Electron Flow vs Conventional Current', 760, 300, 'A battery and a conductor with electrons moving from negative to positive and conventional current shown from positive to negative',
    '<b>Two conventions for the direction of current.</b> Electrons are negative, so in a wire they actually flow from the <b>negative</b> terminal, round the circuit, to the <b>positive</b> terminal — <b>electron flow</b>. Long before the electron was discovered, current was defined as flowing from <b>positive to negative</b>, and that <b>conventional current</b> is still the direction used on circuit diagrams, in the motor and generator rules and for arrow symbols on diodes and transistors. Both describe the same current; only the stated direction differs.')
f.R(80, 120, 600, 40, c='ink', sw=1.6, fill='g3', rx=20)
circ(f, 80, 140, 34, '+', 'hot', 'g2', 26); circ(f, 680, 140, 34, '−', 'cool', 'g2', 26)
for x in range(150, 620, 36): f.Ci(x, 140, 5, 'ink', 1, 'cool')
f.L(560, 80, 200, 80, 'cool', 3, me='cool'); f.T(380, 66, 'ELECTRON FLOW: negative to positive', 11, 'cool', 'middle', bold=True)
f.L(200, 210, 560, 210, 'hot', 3, me='hot'); f.T(380, 236, 'CONVENTIONAL CURRENT: positive to negative', 11, 'hot', 'middle', bold=True)
f.T(380, 280, 'Circuit diagrams, Fleming’s rules and diode arrows all use conventional current.', 10, 'dim', 'middle')
EL.append(f)

# 01_03 water analogy
f = E('01_03', 'Voltage Drives Current — The Water Analogy', 760, 320, 'Two water tanks at different pressures beside two batteries of different voltage, showing that higher pressure or voltage drives more flow',
    '<b>Voltage is electrical pressure.</b> A tank of water with a high level pushes water through a pipe faster than a tank with a low level; in the same way a <b>higher voltage</b> (potential difference) drives a <b>larger current</b> through the same resistance. Voltage is measured in <b>volts</b>, current — the rate of flow of charge — in <b>amperes</b>, and the opposition to flow, like the narrowness of the pipe, is <b>resistance</b> in <b>ohms</b>. Ohm’s law ties them together: <b>V = I × R</b>.')
for x0, lvl, lab, flow in ((80, 120, '12 psi', 'high flow'), (420, 40, '2 psi', 'low flow')):
    f.R(x0, 40, 90, 150, c='ink', sw=1.6, fill='g2', rx=2); f.R(x0 + 2, 190 - lvl, 86, lvl - 2, c='none', sw=0, fill='cool', rx=0, op=0.8)
    f.T(x0 + 45, 182, lab, 10, 'white', 'middle', bold=True, check=False)
    f.R(x0 + 90, 170, 100, 14, c='ink', sw=1.4, fill='cool', rx=0, op=0.8)
    f.L(x0 + 200, 177, x0 + (290 if lvl > 60 else 240), 177, 'cool', 3 if lvl > 60 else 1.6, me='cool'); f.T(x0 + 210, 166, flow, 9.5, 'cool')
for x0, v, big in ((80, '12 V', True), (420, '2 V', False)):
    f.R(x0, 220, 90, 60, c='ink', sw=1.6, fill='g3', rx=4); f.T(x0 + 45, 256, v, 14, 'gold', 'middle', bold=True)
    f.L(x0 + 92, 250, x0 + (220 if big else 170), 250, 'hot', 3 if big else 1.6, me='hot'); f.T(x0 + 100, 240, 'large current' if big else 'small current', 9.5, 'hot')
f.T(380, 312, 'V = I × R        voltage (volts) = current (amperes) × resistance (ohms)', 11, 'ink', 'middle', bold=True)
EL.append(f)

# 01_04 resistor symbols
f = E('01_04', 'Resistor Symbols — Fixed & Variable', 760, 280, 'Circuit symbols for a fixed resistor in zigzag and box form, and for a variable resistor and potentiometer',
    '<b>Two drawing styles.</b> A fixed resistor is drawn either as a <b>zigzag</b> (US and older diagrams) or as a <b>rectangle</b> (IEC style). A <b>variable resistor</b> (rheostat) has an arrow drawn diagonally through it, showing that its resistance can be adjusted. A <b>potentiometer</b> has three terminals: the arrow is a sliding contact — the wiper — touching the resistive track, so it can tap off any voltage between the two ends. Resistors are rated in <b>ohms</b> and for the <b>power</b> they can dissipate as heat.')
resH(f, 80, 220, 90); f.T(150, 130, 'fixed (zigzag)', 10, 'ink', 'middle', bold=True)
f.L(60, 190, 100, 190, 'ink', 1.8); f.R(100, 180, 100, 20, c='hot', sw=2, fill='none', rx=0); f.L(200, 190, 240, 190, 'ink', 1.8); f.T(150, 230, 'fixed (box)', 10, 'ink', 'middle', bold=True)
resH(f, 330, 470, 90); f.L(340, 116, 460, 64, 'gold', 2, me='gold'); f.T(400, 130, 'variable (rheostat)', 10, 'ink', 'middle', bold=True)
f.L(310, 190, 350, 190, 'ink', 1.8); f.R(350, 180, 100, 20, c='hot', sw=2, fill='none', rx=0); f.L(450, 190, 490, 190, 'ink', 1.8); f.L(360, 214, 440, 166, 'gold', 2, me='gold'); f.T(400, 230, 'variable (box)', 10, 'ink', 'middle', bold=True)
resH(f, 560, 700, 120); f.L(630, 70, 630, 108, 'gold', 2, me='gold'); f.T(630, 160, 'potentiometer', 10, 'ink', 'middle', bold=True); f.T(630, 176, '(wiper taps a voltage)', 9.5, 'dim', 'middle')
f.T(380, 266, 'Resistance in ohms (Ω); power rating in watts.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

def loopcircuit(f, x0, y0, x1, y1, v='12 V'):
    wire(f, [(x0, y0), (x1, y0), (x1, y1), (x0, y1), (x0, y0)])
def series():
    f = E('01_05', 'Series Circuit', 760, 300, 'Three resistors of four, six and ten ohms in series with a twelve volt battery',
        '<b>In a series circuit there is only one path</b>, so the <b>same current</b> flows through every component. The <b>total resistance</b> is the sum: R = 4 + 6 + 10 = <b>20 Ω</b>. The current is I = V ÷ R = 12 ÷ 20 = <b>0.6 A</b>. The supply voltage is shared in proportion to resistance: 2.4 V, 3.6 V and 6 V, adding up to 12 V. If any one component fails open-circuit, <b>all</b> of them stop — which is why aircraft loads are not wired in series.')
    wire(f, [(100, 220), (100, 80), (180, 80)]); resH(f, 180, 250, 80); wire(f, [(250, 80), (330, 80)]); resH(f, 330, 400, 80); wire(f, [(400, 80), (480, 80)]); resH(f, 480, 550, 80); wire(f, [(550, 80), (620, 80), (620, 220), (100, 220)])
    f.R(280, 210, 30, 20, c='none', sw=0, fill='bg', rx=0); battH(f, 295, 220, label='12 V')
    for x, r, v in ((215, '4 Ω', '2.4 V'), (365, '6 Ω', '3.6 V'), (515, '10 Ω', '6 V')): f.T(x, 60, r, 11, 'hot', 'middle', bold=True); f.T(x, 110, v, 10, 'gold', 'middle')
    f.L(620, 140, 620, 160, 'cool', 2.4, me='cool'); f.T(632, 154, 'I = 0.6 A everywhere', 10, 'cool', bold=True)
    f.T(380, 290, 'R total = 4 + 6 + 10 = 20 Ω      I = 12 / 20 = 0.6 A', 11, 'ink', 'middle', bold=True)
    return f
EL.append(series())

f = E('01_06', 'Parallel Circuit', 760, 300, 'Three resistors of four, six and ten ohms in parallel across a twelve volt battery',
    '<b>In a parallel circuit every branch has the full supply voltage</b> across it, and the currents add. Each branch current is V ÷ R: 12 ÷ 4 = 3 A, 12 ÷ 6 = 2 A, 12 ÷ 10 = 1.2 A; total <b>6.2 A</b>. The total resistance is found from <b>1/R = 1/R1 + 1/R2 + 1/R3</b>, and is always <b>less than the smallest</b> branch: here about <b>1.94 Ω</b>. Each branch works independently, so one failing does not affect the others — which is why aircraft loads are connected in parallel across the bus-bar.')
wire(f, [(120, 70), (600, 70)]); wire(f, [(120, 250), (600, 250)]); wire(f, [(120, 70), (120, 140)]); wire(f, [(120, 180), (120, 250)]); battV(f, 120, 160, label='12 V')
for x, r, i in ((300, '4 Ω', '3 A'), (430, '6 Ω', '2 A'), (560, '10 Ω', '1.2 A')):
    wire(f, [(x, 70), (x, 110)]); resV(f, x, 110, 210); wire(f, [(x, 210), (x, 250)]); f.T(x + 16, 160, r, 11, 'hot', bold=True); f.T(x + 16, 176, i, 10, 'cool')
f.T(380, 290, '1/R = 1/4 + 1/6 + 1/10  →  R ≈ 1.94 Ω      I total = 3 + 2 + 1.2 = 6.2 A', 11, 'ink', 'middle', bold=True)
EL.append(f)

f = E('01_07', 'Series-Parallel Circuit', 760, 300, 'A four ohm resistor in series with a ten ohm and a six ohm resistor in parallel, across twelve volts',
    '<b>Solve it in stages.</b> First reduce the parallel group to one equivalent resistance: 10 Ω and 6 Ω in parallel = (10 × 6) ÷ (10 + 6) = <b>3.75 Ω</b> (product over sum works for two resistors). Then add the series resistor: 4 + 3.75 = <b>7.75 Ω</b>. The supply current is 12 ÷ 7.75 = <b>1.55 A</b>. It all flows through the 4 Ω resistor (dropping 6.2 V), leaving 5.8 V across the parallel pair, which share the current: 0.58 A through 10 Ω and 0.97 A through 6 Ω.')
wire(f, [(100, 250), (100, 80), (160, 80)]); resH(f, 160, 240, 80); wire(f, [(240, 80), (360, 80)]); f.T(200, 62, '4 Ω', 11, 'hot', 'middle', bold=True)
wire(f, [(360, 50), (360, 110)]); wire(f, [(360, 50), (420, 50)]); resH(f, 420, 500, 50); wire(f, [(500, 50), (560, 50), (560, 110)]); f.T(460, 36, '10 Ω', 11, 'hot', 'middle', bold=True)
wire(f, [(360, 110), (420, 110)]); resH(f, 420, 500, 110); wire(f, [(500, 110), (560, 110)]); f.T(460, 136, '6 Ω', 11, 'hot', 'middle', bold=True)
wire(f, [(560, 80), (620, 80), (620, 250), (100, 250)]); f.R(340, 240, 30, 20, c='none', sw=0, fill='bg', rx=0); battH(f, 355, 250, label='12 V')
f.T(380, 180, 'parallel pair: 10 × 6 / (10 + 6) = 3.75 Ω', 10.5, 'gold', 'middle')
f.T(380, 294, 'R = 4 + 3.75 = 7.75 Ω      I = 12 / 7.75 = 1.55 A', 11, 'ink', 'middle', bold=True)
EL.append(f)

f = E('01_08', "Kirchhoff's Current Law", 760, 280, 'Two currents flowing into a junction and their sum flowing out',
    '<b>What flows into a junction must flow out.</b> Charge cannot pile up at a point, so at any junction the <b>sum of the currents entering equals the sum leaving</b>: here I3 = I1 + I2. It is the reason the currents in parallel branches add up to the supply current, and the basis of the reverse-current and differential protection used in aircraft generator systems.')
J = (380, 140); f.Ci(J[0], J[1], 6, 'ink', 1, 'ink')
wire(f, [(120, 50), (220, 50)]); resH(f, 220, 300, 50, n=4); wire(f, [(300, 50), J])
wire(f, [(120, 230), (220, 230)]); resH(f, 220, 300, 230, n=4); wire(f, [(300, 230), J])
wire(f, [J, (480, 140)]); resH(f, 480, 560, 140, n=4); wire(f, [(560, 140), (660, 140)])
f.L(320, 66, 352, 108, 'cool', 2.4, me='cool'); f.T(312, 96, 'I1', 12, 'cool', 'end', bold=True)
f.L(320, 214, 352, 172, 'cool', 2.4, me='cool'); f.T(312, 194, 'I2', 12, 'cool', 'end', bold=True)
f.L(410, 124, 460, 124, 'gold', 2.4, me='gold'); f.T(436, 112, 'I3', 12, 'gold', 'middle', bold=True)
f.T(380, 270, 'I3 = I1 + I2      current in = current out', 12, 'ink', 'middle', bold=True)
EL.append(f)

f = E('01_09', "Kirchhoff's Voltage Law", 760, 300, 'Resistors of two, four and six ohms in series across twelve volts with the voltage drop across each',
    '<b>Round any closed loop, the voltage drops add up to the supply voltage.</b> With 2 Ω, 4 Ω and 6 Ω in series across 12 V, the current is 12 ÷ 12 = 1 A, and the drops are 2 V, 4 V and 6 V — which total 12 V. The largest resistance takes the largest share of the voltage. The law is used to find the voltage at any point in a circuit and explains why a high-resistance connection (a corroded terminal) steals voltage from the load.')
wire(f, [(100, 240), (100, 100), (160, 100)])
for i, (r, v) in enumerate((('2 Ω', '2 V'), ('4 Ω', '4 V'), ('6 Ω', '6 V'))):
    x = 160 + i * 160; resH(f, x, x + 80, 100); wire(f, [(x + 80, 100), (x + 160, 100)])
    f.L(x - 4, 66, x + 84, 66, 'gold', 1.6, me='gold', ms='gold'); f.L(x, 70, x, 90, 'gold', 1, dash='3 3'); f.L(x + 80, 70, x + 80, 90, 'gold', 1, dash='3 3')
    f.T(x + 40, 56, v, 11, 'gold', 'middle', bold=True); f.T(x + 40, 132, r, 11, 'hot', 'middle', bold=True)
wire(f, [(640, 100), (640, 240), (100, 240)]); f.R(355, 230, 30, 20, c='none', sw=0, fill='bg', rx=0); battH(f, 370, 240, label='12 V')
f.T(380, 292, '2 V + 4 V + 6 V = 12 V      sum of the drops = supply voltage', 11.5, 'ink', 'middle', bold=True)
EL.append(f)

# 02_01 switches
f = E('02_01', 'Two- and Three-Position Switches', 760, 300, 'Circuit diagrams of a two position on-off toggle switch and a three position in-off-out switch',
    '<b>Toggle switches</b> are the commonest cockpit switch. A <b>two-position</b> switch is simply <b>ON or OFF</b>: one pole, one throw (SPST). A <b>three-position</b> switch has a centre OFF and two ON positions, each routing the supply to a different circuit — for example IN / OFF / OUT for a reversible actuator, or a landing light that may be TAXI / OFF / LAND. Some positions are <b>spring-loaded</b> to return to OFF (momentary), and important switches may be <b>gated</b> or <b>guarded</b> so they cannot be moved accidentally.')
wire(f, [(60, 160), (120, 160)]); switchH(f, 120, 180, 160); wire(f, [(180, 160), (300, 160)]); lamp(f, 316, 160)
f.T(60, 150, '28 V', 10, 'ink'); f.T(190, 100, 'TWO-POSITION', 11, 'ink', 'middle', bold=True); f.T(190, 116, 'ON / OFF', 10, 'dim', 'middle')
wire(f, [(420, 160), (500, 160)]); f.Ci(500, 160, 3, 'ink', 1.4, 'bg'); f.L(502, 158, 558, 160, 'ink', 2.2, dash='4 3')
f.Ci(560, 110, 3, 'ink', 1.4, 'bg'); f.Ci(560, 160, 3, 'ink', 1.4, 'bg'); f.Ci(560, 210, 3, 'ink', 1.4, 'bg')
wire(f, [(563, 110), (680, 110)]); wire(f, [(563, 210), (680, 210)]); f.T(690, 114, 'IN circuit', 10, 'ink'); f.T(690, 214, 'OUT circuit', 10, 'ink'); f.T(574, 156, 'OFF (centre)', 9.5, 'dim')
f.L(502, 158, 556, 112, 'ink', 2.2); f.T(420, 150, '28 V', 10, 'ink')
f.T(560, 60, 'THREE-POSITION', 11, 'ink', 'middle', bold=True); f.T(560, 76, 'IN / OFF / OUT', 10, 'dim', 'middle')
f.T(380, 290, 'Spring-loaded positions return to OFF; guarded switches prevent accidental operation.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

# 02_02 switch lights
f = E('02_02', 'Guarded Switches & Switch-Lights', 760, 300, 'A guarded toggle switch with its cover, and an illuminated push-button switch-light with an annunciation legend',
    '<b>Preventing the wrong selection.</b> A <b>guarded switch</b> has a hinged cover that must be lifted before the switch can be moved — used for irreversible or critical selections such as fuel cut-off or fire handles; often the guard holds the switch in its normal position when closed. A <b>switch-light</b> (push-button annunciator) combines a push-switch with a lit legend: the upper and lower halves can show status such as <b>ON</b>, <b>OFF</b>, <b>FAULT</b> or <b>OPEN</b>. On large aircraft a <b>flow-bar</b> lit inside the switch shows whether a valve or circuit in a synoptic line is open.')
f.R(80, 70, 140, 170, c='ink', sw=1.6, fill='g3', rx=6); f.L(150, 160, 150, 110, 'ink', 6, cap='round'); f.Ci(150, 160, 10, 'ink', 1.4, 'steel')
f.P('M100,180 L200,180 L200,90 L100,90 Z', 'hot', 2.2, 'hot', op=0.35); f.T(150, 262, 'guarded toggle switch', 10.5, 'ink', 'middle', bold=True); f.T(150, 278, 'lift the guard to operate', 9.5, 'dim', 'middle')
f.T(220, 86, 'guard', 10, 'hot', bold=True)
for i, (top, bot, tc, bc) in enumerate((('ON', '', 'green', 'bg'), ('FAULT', 'OFF', 'amber', 'white'))):
    x = 340 + i * 160
    f.R(x, 90, 110, 110, c='ink', sw=2, fill='black', rx=6)
    f.R(x + 8, 100, 94, 40, c=tc, sw=1.4, fill='g2', rx=3); f.T(x + 55, 126, top, 13, tc, 'middle', bold=True, check=False)
    f.R(x + 8, 150, 94, 40, c='line', sw=1.4, fill='g2', rx=3); f.T(x + 55, 176, bot, 13, bc if bot else 'dim', 'middle', bold=True, check=False)
f.T(475, 230, 'push-button switch-lights', 10.5, 'ink', 'middle', bold=True); f.T(475, 246, 'legends show status and faults', 9.5, 'dim', 'middle')
f.R(660, 80, 60, 140, c='line', sw=1.2, fill='g2', rx=4); f.R(666, 140, 48, 22, c='green', sw=1.4, fill='green', rx=2, op=0.8); f.T(690, 240, 'flow-bar', 10, 'ink', 'middle', bold=True)
EL.append(f)

# 02_03 microswitch
f = E('02_03', 'Microswitch — Internal Construction', 760, 300, 'A microswitch with an operating plunger pressing a moving contact over from one fixed terminal to the other',
    '<b>A small, precise snap-action switch.</b> A tiny movement of the <b>operating plunger</b> — often less than a millimetre — makes a spring-loaded <b>moving contact</b> snap over from one fixed contact to the other. The snap action gives a fast, clean make-and-break regardless of how slowly the plunger moves, which reduces arcing. Most have three terminals: <b>common</b>, <b>normally open</b> and <b>normally closed</b>. Microswitches are used as limit switches in actuators, landing-gear and door position sensing, and throttle and flap position switches.')
f.R(140, 80, 380, 160, c='ink', sw=2, fill='g3', rx=6)
f.R(300, 40, 30, 50, c='ink', sw=1.6, fill='steel', rx=3); f.L(315, 20, 315, 36, 'gold', 2.4, me='gold'); f.T(338, 32, 'operating plunger', 10.5, 'gold', bold=True)
f.P('M180,190 L300,120 L340,150 L440,140', 'hot', 3, join='round'); f.Ci(180, 190, 5, 'ink', 1, 'ink')
f.R(440, 120, 26, 10, c='ink', sw=1, fill='steel', rx=1); f.R(440, 150, 26, 10, c='ink', sw=1, fill='steel', rx=1)
f.T(470, 112, 'NC contact', 9.5, 'ink'); f.T(470, 178, 'NO contact', 9.5, 'ink'); f.T(260, 106, 'moving contact (snap spring)', 9.5, 'hot', 'middle', bold=True)
for x, lab in ((180, 'COM'), (300, 'NO'), (420, 'NC')): f.L(x, 240, x, 272, 'ink', 3); f.T(x, 290, lab, 10.5, 'ink', 'middle', bold=True)
note(f, 560, 90, ['Tiny plunger movement', 'snaps the contact over:', 'fast, clean switching.'], first='ink')
note(f, 560, 170, ['Uses', 'limit switches, gear and', 'door position, flap and', 'throttle switches'], first='gold')
EL.append(f)

# 02_04 proximity switch
f = E('02_04', 'Proximity Switch / Sensor', 760, 300, 'A proximity sensor with a coil facing a metal target; with the target near the coil inductance changes and the electronics switch',
    '<b>Switching without contact.</b> A proximity sensor contains a <b>coil</b> fed with alternating current by its electronics unit. When a ferrous <b>target</b> fixed to the moving part comes within a few millimetres, it changes the <b>inductance</b> of the coil; the electronics detect the change and switch an output to “target near” or “target far”. With no moving contacts there is nothing to wear, stick or arc, and the sensor is sealed against water, ice and dirt — so proximity sensors have largely replaced microswitches for <b>landing-gear, door and flap</b> position sensing on modern aircraft.')
f.R(80, 110, 180, 80, c='ink', sw=2, fill='g3', rx=8); coilV(f, 250, 120, 180, 'cool', 4, 2.4); f.T(170, 156, 'sensor', 11, 'ink', 'middle', bold=True)
f.R(300, 120, 40, 60, c='gold', sw=1.6, fill='gold', rx=3, op=0.8); f.T(320, 210, 'target', 10.5, 'gold', 'middle', bold=True); f.T(320, 226, '(on the moving part)', 9.5, 'dim', 'middle')
f.L(276, 100, 296, 100, 'dim', 1.2, me='dim', ms='dim'); f.T(286, 90, 'gap: a few mm', 9.5, 'dim', 'middle')
wire(f, [(80, 150), (40, 150), (40, 250), (440, 250)]); f.box(440, 226, 150, 48, ['electronics unit', 'target near / far'], c='cool', size=10)
f.L(590, 250, 650, 250, 'green', 2.2, me='green'); f.T(656, 254, 'to indication', 10, 'green')
note(f, 440, 90, ['Target near: inductance', 'changes, output switches.', 'No contacts to wear or stick.'], first='ink')
EL.append(f)

# 02_05 magnetic pickup
f = E('02_05', 'Magnetic (Variable-Reluctance) Speed Pickup', 760, 300, 'A permanent magnet and pole piece with a coil facing the teeth of a rotating gear wheel, producing a pulse as each tooth passes',
    '<b>Measuring speed with a passing tooth.</b> The pickup is a <b>permanent magnet</b> with a <b>pole piece</b> and a <b>coil</b>, mounted facing a toothed wheel of ferrous metal. As each tooth passes, the gap — and so the magnetic <b>reluctance</b> — changes, the flux through the coil rises and falls, and a small voltage <b>pulse</b> is induced. The <b>pulse frequency</b> is proportional to the wheel’s speed. The device needs no power supply and no contact, and is used for engine N1/N2 speed signals and the wheel-speed transducers of anti-skid systems.')
f.R(80, 120, 120, 60, c='ink', sw=1.6, fill='hot', rx=2, op=0.9); f.T(140, 156, 'MAGNET', 11, 'white', 'middle', bold=True, check=False)
f.R(200, 136, 120, 28, c='ink', sw=1.6, fill='steel', rx=2); coilH(f, 220, 300, 136, 'gold', 5, 2.4); f.T(260, 194, 'coil on pole piece', 10, 'gold', 'middle', bold=True)
cx, cy, R = 450, 150, 110
f.P(f'M{cx-R},{cy-60} A{R},{R} 0 0 1 {cx-R},{cy+60}', 'ink', 0)
for k in range(-3, 4):
    a = 270 + k * 12; p, q = pol(cx, cy, R - 30, a), pol(cx, cy, R, a); f.L(p[0], p[1], q[0], q[1], 'ink', 10)
f.Ci(cx, cy, R - 30, 'ink', 2, 'g3'); f.T(cx + 10, cy + 4, 'rotating toothed wheel', 10, 'ink', bold=True)
for i in range(6): x = 560 + i * 26; f.L(x, 260, x, 236, 'green', 2); f.L(x, 236, x + 6, 260, 'green', 2)
f.T(620, 280, 'one pulse per tooth', 10, 'green', 'middle', bold=True)
f.T(380, 36, 'pulse frequency proportional to speed', 12, 'gold', 'middle', bold=True)
EL.append(f)

# 02_06 gear proximity sensors
f = E('02_06', 'Proximity Sensors on the Landing Gear', 760, 300, 'A schematic main landing gear with proximity sensors and targets for down-lock, up-lock and weight-on-wheels',
    '<b>Where the sensors go.</b> On a typical landing gear, proximity sensors and their targets detect: <b>down-locked</b> (on the side brace lock), <b>up-locked</b> (at the uplock hook in the wheel bay), and <b>weight on wheels</b> — the oleo compressed under load, the <b>air/ground</b> signal. The signals feed the gear indicating lights, the warning system and many other systems: the air/ground logic inhibits gear retraction on the ground, arms spoilers and thrust reversers, and switches pressurisation, anti-skid and other modes between air and ground.')
f.L(200, 40, 200, 230, 'ink', 8); f.Ci(200, 250, 30, 'ink', 2, 'g3'); f.R(180, 150, 40, 70, c='ink', sw=1.6, fill='steel', rx=4)
f.L(200, 90, 300, 60, 'ink', 5); f.L(300, 60, 360, 40, 'ink', 5); f.T(330, 34, 'side brace', 9.5, 'dim')
for (x, y, lab, sub) in ((290, 72, 'DOWN-LOCK', 'brace locked'), (200, 36, 'UP-LOCK', 'gear stowed in the bay'), (220, 176, 'WEIGHT ON WHEELS', 'oleo compressed: air/ground')):
    f.R(x - 6, y - 6, 12, 12, c='gold', sw=1.4, fill='gold', rx=2); f.Ci(x + 12, y, 4, 'cool', 1, 'cool')
f.T(410, 70, 'DOWN-LOCK sensor', 10.5, 'gold', bold=True); f.L(406, 66, 304, 70, 'gold', 1)
f.T(410, 120, 'UP-LOCK sensor', 10.5, 'gold', bold=True); f.L(406, 116, 214, 40, 'gold', 1)
f.T(410, 170, 'WEIGHT-ON-WHEELS sensor', 10.5, 'gold', bold=True); f.L(406, 166, 236, 176, 'gold', 1)
f.R(410, 200, 12, 12, c='gold', sw=1.4, fill='gold', rx=2); f.T(428, 210, 'target', 9.5); f.Ci(500, 206, 4, 'cool', 1, 'cool'); f.T(510, 210, 'sensor face', 9.5)
f.T(410, 246, 'Air/ground logic inhibits retraction on the ground,', 9.5); f.T(410, 260, 'arms spoilers and reversers, switches system modes.', 9.5)
EL.append(f)

# 03_01 fuse
f = E('03_01', 'Fuse Construction', 760, 300, 'A cartridge fuse with end caps, a fuse element inside a ceramic barrel and sand filling, and its circuit symbol',
    '<b>A fuse is a deliberate weak link.</b> A <b>fuse element</b> of low-melting-point metal is enclosed in a glass or <b>ceramic barrel</b> between two metal <b>end caps</b>; larger fuses are packed with <b>sand</b> to quench the arc. If the current exceeds the rating, the element heats and <b>melts</b>, breaking the circuit and protecting the wiring. Fuses are rated in amperes; they protect the <b>wiring</b>, not the equipment, and must be replaced with one of the <b>same rating</b>. Aircraft usually carry spare fuses — typically 10% or at least three of each rating used.')
f.R(140, 110, 360, 80, c='ink', sw=2, fill='g3', rx=10); f.R(100, 100, 60, 100, c='ink', sw=2, fill='steel', rx=6); f.R(480, 100, 60, 100, c='ink', sw=2, fill='steel', rx=6)
for x in range(170, 470, 10):
    for y in range(124, 180, 10): f.Ci(x + (y % 20) / 2, y, 1.6, 'gold', 0.5, 'gold')
f.P('M160,150 L220,150 L230,140 L250,160 L270,140 L290,160 L310,150 L480,150', 'hot', 3)
f.T(130, 90, 'end cap', 10, 'ink', 'middle', bold=True); f.T(320, 98, 'ceramic barrel', 10, 'ink', 'middle', bold=True)
f.T(320, 214, 'sand filling quenches the arc', 10, 'gold', 'middle'); f.T(520, 96, 'fuse element', 10, 'hot', bold=True); f.L(516, 100, 300, 148, 'hot', 1)
f.L(590, 150, 620, 150, 'ink', 2); f.R(620, 140, 60, 20, c='hot', sw=2, fill='none', rx=0); f.L(620, 150, 680, 150, 'hot', 2); f.L(680, 150, 710, 150, 'ink', 2); f.T(650, 186, 'circuit symbol', 10, 'ink', 'middle', bold=True)
f.T(380, 280, 'Overcurrent melts the element. Protects the wiring. Replace only with the same rating.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

# 03_02 current limiter
f = E('03_02', 'High-Current Fuse — Current Limiter', 760, 300, 'A bolt-in current limiter with a copper element designed to carry a short overload before melting',
    '<b>A slow-blow fuse for heavy circuits.</b> A <b>current limiter</b> has a thick <b>copper</b> element with a narrowed section, bolted into the circuit by its two lugs. Copper has a high melting point and a large thermal mass, so it carries a <b>short overload</b> — such as the inrush current when a motor starts or a generator is connected — without blowing, but melts under a <b>sustained</b> overload or fault. It is used to protect heavy-current feeders, for example between the battery or generator and the main bus-bar, where an ordinary fuse would blow needlessly.')
f.P('M100,130 L230,130 L230,110 L300,110 L320,140 L360,140 L380,110 L450,110 L450,130 L580,130 L580,170 L450,170 L450,190 L380,190 L360,160 L320,160 L300,190 L230,190 L230,170 L100,170 Z', 'ink', 2, 'warm', op=0.9)
for x in (140, 540): f.Ci(x, 150, 12, 'ink', 1.6, 'bg')
f.R(230, 100, 220, 100, c='cool', sw=1.4, fill='cool', rx=8, op=0.2); f.T(340, 90, 'clear window', 10, 'cool', 'middle')
f.T(340, 152, 'neck', 10, 'ink', 'middle', bold=True); f.T(140, 196, 'mounting lug', 10, 'ink', 'middle'); f.T(540, 196, 'mounting lug', 10, 'ink', 'middle')
note(f, 100, 230, ['Copper element: carries a short overload', '(motor start, generator connection),', 'melts under a sustained fault.'], first='ink')
note(f, 460, 230, ['Used on heavy feeders:', 'battery and generator to bus-bar.'], first='gold')
EL.append(f)

# 03_03 circuit breaker
f = E('03_03', 'Circuit Breaker Construction', 760, 300, 'A thermal circuit breaker with a bimetallic strip that bends when overheated, tripping a latch and popping out the push-pull button',
    '<b>A fuse that can be reset.</b> In a <b>thermal circuit breaker</b> the current flows through a <b>bimetallic strip</b> of two metals that expand at different rates. A sustained overload heats the strip, it <b>bends</b>, releases a spring-loaded <b>latch</b> and the contacts snap open; the <b>push-pull button</b> pops out, showing a white band. It can be reset by pushing it in once it has cooled — but a breaker that trips again must <b>not</b> be reset repeatedly in flight. Breakers are “trip-free”: the contacts cannot be held closed against a fault. The button can also be pulled to isolate a circuit manually.')
f.R(100, 60, 340, 180, c='ink', sw=2, fill='g3', rx=8)
f.R(240, 20, 60, 44, c='ink', sw=1.6, fill='steel', rx=4); f.R(240, 50, 60, 10, c='white', sw=0, fill='white', rx=0); f.T(310, 34, 'push-pull button', 10, 'ink', bold=True); f.T(310, 48, 'white band shows when tripped', 9.5, 'dim')
f.L(160, 200, 160, 120, 'warm', 6); f.L(166, 200, 166, 120, 'cool', 6); f.P('M163,120 Q170,100 200,96', 'warm', 4)
f.T(120, 140, 'bimetallic', 9.5, 'ink', 'end'); f.T(120, 154, 'strip', 9.5, 'ink', 'end')
f.L(200, 96, 260, 96, 'ink', 3); f.L(260, 96, 270, 70, 'ink', 3); f.T(230, 88, 'latch', 9.5, 'ink', 'middle')
f.R(330, 170, 50, 10, c='ink', sw=1, fill='steel', rx=1); f.L(330, 190, 380, 180, 'ink', 3); f.T(400, 176, 'contacts', 10, 'ink')
for x in (160, 360): f.L(x, 240, x, 272, 'ink', 3)
f.T(160, 290, 'terminal', 10, 'dim', 'middle'); f.T(360, 290, 'terminal', 10, 'dim', 'middle')
note(f, 480, 90, ['Overload heats and bends', 'the strip; latch releases,', 'contacts open, button pops.'], first='ink')
note(f, 480, 170, ['Reset once, after cooling.', 'Trip-free: cannot be held', 'closed against a fault.'], first='hot')
EL.append(f)

# 03_04 capacitor construction
f = E('03_04', 'Capacitor Construction', 760, 300, 'Two metal plates separated by an insulating dielectric with connections to each plate',
    '<b>Two conductors separated by an insulator.</b> A capacitor is two metal <b>plates</b> with an insulating <b>dielectric</b> (air, paper, mica, ceramic, plastic film) between them. Connected to a supply, electrons pile up on one plate and leave the other, storing energy in the electric field across the dielectric. <b>Capacitance</b>, measured in <b>farads</b> (practical values in µF, nF and pF), is <b>increased</b> by larger plates, a <b>thinner</b> dielectric, or a dielectric with a higher <b>permittivity</b>: C = εA ÷ d. A capacitor blocks steady DC but passes AC.')
poly(f, [(200, 60), (280, 100), (280, 260), (200, 220)], fill='steel', c='ink', sw=1.6); poly(f, [(240, 60), (320, 100), (320, 260), (240, 220)], fill='hot', c='ink', sw=1.4, op=0.55); poly(f, [(280, 60), (360, 100), (360, 260), (280, 220)], fill='steel', c='ink', sw=1.6)
f.L(240, 180, 140, 180, 'ink', 2); f.L(320, 180, 440, 180, 'ink', 2)
f.T(240, 46, 'metal plate', 10, 'ink', 'middle'); f.T(330, 46, 'metal plate', 10, 'ink', 'middle'); f.T(300, 280, 'dielectric (insulator)', 10, 'hot', 'middle', bold=True)
f.T(140, 172, 'connection', 9.5, 'dim'); f.T(440, 172, 'connection', 9.5, 'dim', 'end')
f.R(480, 60, 250, 70, c='gold', sw=1.6, fill='g2'); f.T(605, 90, 'C = ε × A / d', 14, 'gold', 'middle', bold=True); f.T(605, 112, 'unit: farad (µF, nF, pF)', 10, 'dim', 'middle')
note(f, 480, 160, ['More capacitance:', 'larger plate area A', 'thinner dielectric d', 'higher permittivity ε'], first='ink')
EL.append(f)

# 03_05 capacitor symbols
f = E('03_05', 'Capacitor Symbols', 760, 280, 'Circuit symbols for fixed non-polarised, fixed polarised, variable and preset capacitors',
    '<b>Reading the symbols.</b> A capacitor is drawn as two parallel plates. A <b>polarised</b> (electrolytic) capacitor has one plate marked <b>+</b> (or drawn curved) and must be connected the right way round — reversed, it can overheat and burst. A <b>variable</b> capacitor has a diagonal arrow through it (as for tuning a radio receiver); a <b>preset</b> (trimmer) capacitor has a short bar instead, showing it is adjusted once with a tool and then left.')
for i, (ttl, kind) in enumerate((('fixed (non-polarised)', 'n'), ('fixed (polarised)', 'p'), ('variable', 'v'), ('preset (trimmer)', 't'))):
    x = 110 + i * 180; y = 120
    f.L(x - 60, y, x - 6, y, 'ink', 2); f.L(x + 6, y, x + 60, y, 'ink', 2)
    f.L(x - 6, y - 26, x - 6, y + 26, 'gold', 3.4)
    if kind == 'p': f.P(f'M{x+12},{y-26} Q{x+2},{y} {x+12},{y+26}', 'gold', 3.4); f.T(x - 18, y - 30, '+', 14, 'hot', bold=True)
    else: f.L(x + 6, y - 26, x + 6, y + 26, 'gold', 3.4)
    if kind == 'v': f.L(x - 30, y + 34, x + 30, y - 34, 'cool', 2, me='cool')
    if kind == 't': f.L(x - 30, y + 34, x + 26, y - 30, 'cool', 2); f.L(x + 20, y - 36, x + 32, y - 24, 'cool', 2.4)
    f.T(x, 196, ttl, 10.5, 'ink', 'middle', bold=True)
f.T(380, 250, 'Polarised (electrolytic) capacitors must be fitted the right way round.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

# 03_09 capacitors in series
f = E('03_09', 'Capacitors in Series and Parallel', 760, 300, 'Two capacitors in series and two in parallel with the rules for their combined capacitance',
    '<b>The rules are the reverse of those for resistors.</b> Capacitors in <b>parallel</b> simply add, because together they present a larger plate area: <b>C = C1 + C2</b>. Capacitors in <b>series</b> combine like resistors in parallel, because the effective dielectric thickness increases: <b>1/C = 1/C1 + 1/C2</b>, so the total is always <b>less</b> than the smallest. Two 10 µF capacitors give 20 µF in parallel but only 5 µF in series. Series connection is used to raise the voltage rating of the combination.')
f.T(190, 50, 'SERIES', 12, 'ink', 'middle', bold=True)
f.L(60, 120, 140, 120, 'ink', 2); cap(f, 146, 120); f.L(150, 120, 230, 120, 'ink', 2); cap(f, 236, 120); f.L(240, 120, 320, 120, 'ink', 2)
f.T(146, 160, 'C1', 11, 'gold', 'middle', bold=True); f.T(236, 160, 'C2', 11, 'gold', 'middle', bold=True)
f.T(190, 210, '1/C = 1/C1 + 1/C2', 13, 'gold', 'middle', bold=True); f.T(190, 232, '10 µF and 10 µF → 5 µF', 10.5, 'dim', 'middle')
f.L(380, 30, 380, 260, 'line', 1, dash='3 5')
f.T(570, 30, 'PARALLEL', 12, 'ink', 'middle', bold=True)
wire(f, [(450, 120), (500, 120), (500, 80), (566, 80)]); cap(f, 570, 80); wire(f, [(574, 80), (640, 80), (640, 120), (690, 120)])
wire(f, [(500, 120), (500, 160), (566, 160)]); cap(f, 570, 160); wire(f, [(574, 160), (640, 160), (640, 120)])
f.T(570, 54, 'C1', 11, 'gold', 'middle', bold=True); f.T(570, 194, 'C2', 11, 'gold', 'middle', bold=True)
f.T(570, 226, 'C = C1 + C2', 13, 'gold', 'middle', bold=True); f.T(570, 248, '10 µF and 10 µF → 20 µF', 10.5, 'dim', 'middle')
f.T(380, 290, 'Opposite to resistors: series capacitance is less than the smallest.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

# 04_01 basic cell
f = E('04_01', 'Basic Cell — Electrodes & Electrolyte', 760, 300, 'Two different metal electrodes in an electrolyte, with chemical action producing a voltage between them',
    '<b>A cell turns chemical energy into electrical energy.</b> Two <b>electrodes</b> of different materials stand in an <b>electrolyte</b> — a liquid or paste that conducts. Chemical reactions at the electrodes leave one with a surplus of electrons (the <b>negative</b> terminal) and the other with a deficit (<b>positive</b>), producing a potential difference. Connect a load and electrons flow through it from negative to positive while the reaction continues. The voltage depends only on the <b>materials</b> (about 1.5 V for a dry cell, 2 V for lead-acid, 1.2 V for nickel-cadmium); the <b>size</b> of the cell sets its capacity.')
f.R(200, 90, 300, 170, c='ink', sw=2, fill='g2', rx=4); f.R(202, 130, 296, 128, c='none', sw=0, fill='cool', rx=0, op=0.3)
f.R(240, 70, 26, 170, c='ink', sw=1.6, fill='steel', rx=2); f.R(434, 70, 26, 170, c='ink', sw=1.6, fill='warm', rx=2)
f.T(253, 60, '−', 18, 'cool', 'middle', bold=True); f.T(447, 60, '+', 18, 'hot', 'middle', bold=True)
wire(f, [(253, 70), (253, 30), (447, 30), (447, 70)]); lamp(f, 350, 30)
f.L(280, 22, 320, 22, 'cool', 2, me='cool'); f.L(380, 22, 420, 22, 'cool', 2, me='cool'); f.T(560, 200, 'electrons flow through the', 9.5, 'cool'); f.T(560, 214, 'lamp from − to +', 9.5, 'cool')
f.T(350, 280, 'electrolyte', 10.5, 'cool', 'middle', bold=True); f.T(160, 150, 'electrode', 10, 'ink', 'end'); f.T(540, 150, 'electrode', 10, 'ink')
table(f, 560, 40, [100, 70], ['cell', 'volts'], [('dry (zinc-carbon)', '1.5'), ('lead-acid', '2.0'), ('nickel-cadmium', '1.2')], 'gold')
EL.append(f)

# 04_02 dry cell
f = E('04_02', 'Dry (Primary) Cell', 760, 300, 'A section of a zinc carbon dry cell with a central carbon rod, a paste electrolyte and a zinc case',
    '<b>The common torch battery.</b> The <b>zinc case</b> is the negative electrode; a central <b>carbon rod</b> is the positive, surrounded by a depolariser of manganese dioxide; between them is an electrolyte in <b>paste</b> form, so it cannot spill — hence “dry”. It gives about <b>1.5 V</b>. It is a <b>primary</b> cell: the chemical action is not reversible, so once exhausted it must be discarded and cannot be recharged. Primary cells are used in torches, emergency locator transmitters and some standby equipment.')
f.R(250, 70, 140, 200, c='ink', sw=2, fill='steel', rx=10); f.R(262, 82, 116, 176, c='none', sw=0, fill='warm', rx=6, op=0.5); f.R(306, 60, 28, 190, c='ink', sw=1.6, fill='black', rx=4)
f.T(320, 50, '+', 18, 'hot', 'middle', bold=True); f.T(410, 280, '−', 18, 'cool', 'middle', bold=True)
f.T(440, 100, 'carbon rod: positive (+)', 10.5, 'ink', bold=True); f.L(436, 96, 336, 110, 'dim', 1)
f.T(440, 160, 'electrolyte paste', 10.5, 'warm', bold=True); f.T(440, 174, '(with depolariser)', 9.5); f.L(436, 156, 372, 160, 'dim', 1)
f.T(440, 230, 'zinc case: negative (−)', 10.5, 'cool', bold=True); f.L(436, 226, 390, 220, 'dim', 1)
note(f, 40, 120, ['About 1.5 V', 'PRIMARY cell:', 'not rechargeable'], first='gold')
EL.append(f)

# 04_03 cells series vs parallel
f = E('04_03', 'Cells in Series vs Parallel', 760, 300, 'Three two volt ten ampere hour cells in series giving six volts ten ampere hours, and in parallel giving two volts thirty ampere hours',
    '<b>Series raises voltage; parallel raises capacity.</b> Cells in <b>series</b> (positive to negative) add their <b>voltages</b> but the capacity stays that of one cell: three 2 V, 10 Ah cells give <b>6 V, 10 Ah</b>. Cells in <b>parallel</b> (positive to positive) keep the voltage of one cell but add their <b>capacities</b>: <b>2 V, 30 Ah</b>. A 24 V aircraft lead-acid battery is 12 cells of 2 V in series; a 24 V nickel-cadmium battery is 19 or 20 cells of 1.2 V in series.')
f.T(190, 40, 'SERIES', 12, 'ink', 'middle', bold=True)
for i in range(3):
    x = 100 + i * 90; f.L(x - 4, 90, x - 4, 130, 'ink', 2.4); f.L(x + 4, 100, x + 4, 120, 'ink', 4); f.T(x, 80, '2 V', 9.5, 'dim', 'middle')
    if i < 2: f.L(x + 4, 110, x + 86, 110, 'ink', 1.8)
wire(f, [(96, 110), (60, 110), (60, 190)]); wire(f, [(284, 110), (320, 110), (320, 190)]); f.Ci(60, 190, 4, 'hot', 1, 'hot'); f.Ci(320, 190, 4, 'cool', 1, 'cool')
f.T(190, 196, '6 V, 10 Ah', 13, 'gold', 'middle', bold=True)
f.L(380, 30, 380, 240, 'line', 1, dash='3 5')
f.T(570, 40, 'PARALLEL', 12, 'ink', 'middle', bold=True)
for i in range(3):
    y = 80 + i * 44; f.L(560, y - 16, 600, y - 16, 'ink', 2.4); f.L(570, y - 8, 590, y - 8, 'ink', 4); f.T(610, y - 8, '2 V', 9.5, 'dim')
    wire(f, [(580, y - 16), (580, y - 24), (680, y - 24)]); wire(f, [(580, y - 8), (580, y), (480, y)])
f.L(680, 56, 680, 160, 'ink', 1.8); f.L(480, 80, 480, 168, 'ink', 1.8); f.Ci(680, 160, 4, 'hot', 1, 'hot'); f.Ci(480, 168, 4, 'cool', 1, 'cool')
f.T(570, 196, '2 V, 30 Ah', 13, 'gold', 'middle', bold=True)
f.T(380, 272, '24 V aircraft battery: 12 lead-acid cells (2 V) or 19–20 Ni-Cd cells (1.2 V) in series.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

# 04_04 lead-acid construction
f = E('04_04', 'Lead-Acid Cell Construction', 760, 300, 'A lead acid cell with interleaved positive and negative plate groups, separators, terminal posts and a vented cap',
    '<b>Inside a lead-acid cell.</b> Two groups of plates are <b>interleaved</b>: the <b>positive</b> plates carry lead peroxide (dark brown) and the <b>negative</b> plates spongy lead (grey). There is always one more negative plate, so every positive plate works on both faces. Porous <b>separators</b> stop the plates touching, and the whole stack stands in dilute <b>sulphuric acid</b>. Each group is joined to a <b>terminal post</b>. A <b>vent cap</b> lets hydrogen and oxygen escape while charging — they form an explosive mixture, so batteries must be well ventilated — and in aircraft is non-spill.')
f.R(140, 80, 300, 190, c='ink', sw=2, fill='g2', rx=6); f.R(142, 120, 296, 148, c='none', sw=0, fill='cool', rx=0, op=0.25)
for i in range(9):
    x = 170 + i * 30; c_ = 'steel' if i % 2 == 0 else 'warm'
    f.R(x, 100, 14, 156, c='ink', sw=1, fill=c_, rx=1)
    if i < 8: f.R(x + 16, 104, 6, 150, c='none', sw=0, fill='white', rx=0, op=0.35)
f.R(190, 50, 20, 40, c='ink', sw=1.4, fill='steel', rx=3); f.R(370, 50, 20, 40, c='ink', sw=1.4, fill='warm', rx=3); f.T(200, 42, '−', 16, 'cool', 'middle', bold=True); f.T(380, 42, '+', 16, 'hot', 'middle', bold=True)
f.R(278, 60, 24, 22, c='ink', sw=1.4, fill='g3', rx=4); f.T(290, 52, 'vent cap', 9.5, 'ink', 'middle')
note(f, 470, 70, ['Negative plates: spongy lead', '(one more than positive)'], first='cool')
note(f, 470, 126, ['Positive plates: lead peroxide'], first='warm')
note(f, 470, 166, ['Separators: porous insulator', 'between the plates'], first='ink')
note(f, 470, 222, ['Electrolyte: dilute', 'sulphuric acid'], first='cool')
EL.append(f)

# 04_05 lead-acid chemistry
f = E('04_05', 'Lead-Acid Cell — Charge & Discharge', 760, 320, 'The plate materials and electrolyte of a lead acid cell when charged and discharged, with the specific gravity readings',
    '<b>The chemistry tells you the state of charge.</b> <b>Charged</b>: positive plate lead peroxide, negative plate spongy lead, electrolyte strong sulphuric acid with a specific gravity of about <b>1.270–1.285</b>. On <b>discharge</b> both plates turn to <b>lead sulphate</b> and the acid is used up, leaving more water, so the specific gravity falls to about <b>1.170</b> or less. The state of charge of a lead-acid cell can therefore be checked with a <b>hydrometer</b>. Each cell gives about 2 V (2.2 V at full charge). A lead-acid battery must not be left discharged or the sulphate hardens and the plates are ruined.')
table(f, 60, 60, [130, 190, 190], ['', 'CHARGED', 'DISCHARGED'],
      [('positive plate', 'lead peroxide (PbO2)', 'lead sulphate'), ('negative plate', 'spongy lead (Pb)', 'lead sulphate'), ('electrolyte', 'sulphuric acid', 'more water'), ('specific gravity', 'about 1.270 – 1.285', 'about 1.170'), ('cell voltage', 'about 2.2 V', 'falls below 2 V')], 'gold')
f.L(250, 210, 440, 210, 'hot', 2.2, me='hot'); f.T(345, 230, 'discharge', 10, 'hot', 'middle', bold=True)
f.L(440, 250, 250, 250, 'green', 2.2, me='green'); f.T(345, 270, 'charge', 10, 'green', 'middle', bold=True)
note(f, 600, 70, ['Check state of', 'charge with a', 'hydrometer', '(specific gravity).'], first='ink')
note(f, 600, 170, ['Do not leave', 'discharged: the', 'sulphate hardens.'], first='hot')
EL.append(f)

# 04_09 lead acid vs alkaline
f = E('04_09', 'Secondary Batteries — Lead-Acid vs Nickel-Cadmium', 760, 320, 'A comparison table of lead acid and nickel cadmium aircraft batteries',
    '<b>Two kinds of rechargeable aircraft battery.</b> <b>Lead-acid</b> is cheaper and simpler; its state of charge shows in the specific gravity. <b>Nickel-cadmium (alkaline)</b> is lighter for its capacity, delivers very high currents for engine starting and holds its voltage almost to the end of discharge — but its electrolyte’s specific gravity does <b>not</b> change with charge, so a hydrometer is no use, and it is prone to <b>thermal runaway</b>: a rising temperature lowers its internal resistance, increasing the charging current and heating it further. Ni-Cd batteries have temperature monitoring. <b>Never</b> mix the two in one battery room: acid fumes destroy alkaline cells and vice versa. Spills are neutralised with sodium bicarbonate (acid) or boric acid (alkali).')
table(f, 40, 40, [150, 270, 270], ['', 'LEAD-ACID', 'NICKEL-CADMIUM (alkaline)'],
      [('positive plate', 'lead peroxide', 'nickel hydroxide'), ('negative plate', 'spongy lead', 'cadmium'), ('electrolyte', 'dilute sulphuric acid', 'potassium hydroxide'),
       ('cell voltage', '2 V', '1.2 V'), ('state of charge', 'hydrometer (SG 1.27 → 1.17)', 'SG does NOT change'), ('main hazard', 'hydrogen gas, acid burns', 'thermal runaway'), ('spill neutraliser', 'sodium bicarbonate', 'boric acid')], 'gold')
f.T(380, 300, 'Never service lead-acid and nickel-cadmium batteries in the same room.', 10.5, 'hot', 'middle', bold=True)
EL.append(f)

# 05_01 field patterns
f = E('05_01', 'Magnetic Field Patterns & Poles', 760, 320, 'The field of a single bar magnet, and the fields between unlike poles which attract and like poles which repel',
    '<b>Lines of magnetic flux</b> leave a magnet at its <b>north</b> pole and enter at its <b>south</b> pole, forming closed loops through the magnet. They never cross, they behave as if under tension (trying to shorten), and they push sideways against each other. Between <b>unlike</b> poles the lines join up and pull the poles together: <b>attraction</b>. Between <b>like</b> poles the lines are pushed apart, leaving a neutral point between them, and the poles <b>repel</b>. The density of the lines shows the strength of the field.')
magnet(f, 60, 140, 160, 40)
for k in (40, 70, 100):
    f.raw(f'<ellipse cx="140" cy="160" rx="{80 + k * 0.4}" ry="{k}" fill="none" stroke="{col("gold")}" stroke-width="1.2" stroke-dasharray="5 4"/>')
f.T(140, 290, 'single bar magnet: N to S outside', 10, 'ink', 'middle', bold=True)
magnet(f, 290, 70, 80, 30, 'S', 'N'); magnet(f, 420, 70, 80, 30, 'S', 'N')
for dy in (-8, 0, 8): f.L(372, 85 + dy, 418, 85 + dy, 'gold', 1.4, me='gold')
f.T(395, 130, 'unlike poles: ATTRACT', 10.5, 'green', 'middle', bold=True)
magnet(f, 290, 190, 80, 30, 'S', 'N'); magnet(f, 420, 190, 80, 30, 'N', 'S')
for dy in (-14, 0, 14): f.P(f'M372,{205 + dy} Q392,{205 + dy * 2.4} 372,{205 + dy * 3.6}', 'gold', 1.4); f.P(f'M418,{205 + dy} Q398,{205 + dy * 2.4} 418,{205 + dy * 3.6}', 'gold', 1.4)
f.T(395, 270, 'like poles: REPEL', 10.5, 'hot', 'middle', bold=True)
note(f, 540, 70, ['Flux lines', 'leave N, enter S;', 'never cross;', 'try to shorten.'], first='ink')
EL.append(f)

# 05_02 flux concentration
f = E('05_02', 'Soft Iron in a Magnetic Field', 760, 300, 'A piece of soft iron between two magnets drawing the lines of flux through itself and becoming a temporary magnet',
    '<b>Flux takes the easiest path.</b> Soft iron has a high <b>permeability</b> — magnetic flux passes through it far more easily than through air — so a piece of soft iron placed in a field draws the lines of flux into itself and becomes a <b>temporary magnet</b>, with poles induced opposite to those of the magnets nearby. When the field is removed it loses almost all its magnetism. The same effect is used to <b>screen</b> sensitive instruments: a soft-iron case carries stray flux round the instrument instead of through it. It also explains why soft iron in an aircraft causes compass deviation that changes with heading.')
magnet(f, 40, 120, 120, 50, 'N', 'N'); magnet(f, 600, 120, 120, 50, 'S', 'S')
f.R(300, 120, 160, 50, c='ink', sw=1.6, fill='steel', rx=4); f.T(330, 152, 'S', 13, 'white', 'middle', bold=True, check=False); f.T(430, 152, 'N', 13, 'white', 'middle', bold=True, check=False)
for dy in (-50, -26, 0, 26, 50):
    f.P(f'M160,{145 + dy * 0.4} C230,{145 + dy * 1.6} 270,{145 + dy * 0.6} 300,{145 + dy * 0.3}', 'gold', 1.2); f.P(f'M460,{145 + dy * 0.3} C490,{145 + dy * 0.6} 530,{145 + dy * 1.6} 600,{145 + dy * 0.4}', 'gold', 1.2)
f.T(380, 106, 'soft iron', 11, 'ink', 'middle', bold=True); f.T(380, 200, 'flux is concentrated through the iron;', 10, 'dim', 'middle'); f.T(380, 216, 'it becomes a temporary magnet', 10, 'dim', 'middle')
f.T(380, 280, 'High permeability: used for magnetic screening of instruments.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

# 05_03 domains
f = E('05_03', 'Domain Theory — Unmagnetised, Magnetised, Saturated', 760, 300, 'Three bars of iron with tiny molecular magnets arranged at random, mostly aligned, and fully aligned',
    '<b>Magnetism comes from tiny aligned regions.</b> A ferromagnetic material is made of microscopic <b>domains</b>, each a tiny magnet. In an <b>unmagnetised</b> bar they point at random and cancel out. Applying a magnetising field turns them into line, and the bar becomes a <b>magnet</b>. When every domain is aligned the material is <b>saturated</b> — a stronger field can add no more magnetism. Hard steel keeps its alignment (a permanent magnet); soft iron loses it when the field is removed. Heating, hammering or an alternating field will scramble the domains and demagnetise the bar.')
import random
random.seed(4)
for k, (ttl, mode) in enumerate((('UNMAGNETISED', 'rand'), ('MAGNETISED', 'most'), ('SATURATED', 'all'))):
    x0 = 40 + k * 240; f.R(x0, 90, 200, 110, c='ink', sw=1.6, fill='g3', rx=8); f.T(x0 + 100, 70, ttl, 11, 'ink', 'middle', bold=True)
    for i in range(5):
        for j in range(3):
            cx_, cy_ = x0 + 24 + i * 38, 112 + j * 34
            a = random.uniform(0, 360) if mode == 'rand' else (90 + random.uniform(-40, 40) if mode == 'most' else 90)
            p, q = pol(cx_, cy_, 12, a), pol(cx_, cy_, 12, a + 180)
            f.L(q[0], q[1], p[0], p[1], 'hot', 2.4); f.Ci(p[0], p[1], 2.6, 'hot', 1, 'hot')
f.T(140, 230, 'random: effects cancel', 10, 'dim', 'middle'); f.T(380, 230, 'mostly aligned', 10, 'dim', 'middle'); f.T(620, 230, 'all aligned: no more possible', 10, 'dim', 'middle')
f.T(380, 280, 'Red dot: the north end of each domain.', 9.5, 'faint', 'middle')
EL.append(f)

# 05_04 field around conductor
f = E('05_04', 'Magnetic Field Around a Current-Carrying Conductor', 760, 300, 'A straight conductor carrying current upward through a flat card, with concentric circles of magnetic field around it',
    '<b>Every current produces a magnetic field.</b> Around a straight wire carrying current the lines of flux form <b>concentric circles</b> in planes at right angles to the wire, strongest close to it and weakening with distance. The direction is given by the <b>right-hand grip rule</b>: grip the wire with the right hand, thumb pointing in the direction of <b>conventional current</b>, and the fingers curl in the direction of the field. Reverse the current and the field reverses. Increase the current and the field strengthens. This is the basis of every electromagnet, relay, motor and generator.')
poly(f, [(120, 200), (380, 200), (460, 130), (200, 130)], fill='g3', c='ink', sw=1.4)
f.L(290, 280, 290, 40, 'gold', 4, me='gold'); f.T(300, 40, 'conventional current', 10.5, 'gold', bold=True)
for rx, ry in ((40, 12), (80, 24), (120, 36)): f.raw(f'<ellipse cx="290" cy="165" rx="{rx}" ry="{ry}" fill="none" stroke="{col("cool")}" stroke-width="1.6"/>')
f.P('M330,177 L346,174', 'cool', 2, me='cool'); f.P('M250,153 L234,156', 'cool', 2, me='cool')
f.T(410, 196, 'magnetic field: concentric circles', 10, 'cool', bold=True)
note(f, 500, 60, ['Right-hand grip rule', 'thumb: conventional current', 'fingers: direction of the field'], first='gold')
note(f, 500, 150, ['Field is strongest close', 'to the wire. More current,', 'stronger field.'], first='ink')
EL.append(f)

# 05_05 into/out of paper
f = E('05_05', 'Current Into and Out of the Paper', 760, 300, 'Cross-sections of two conductors: a cross for current into the page with a clockwise field, and a dot for current out of the page with an anticlockwise field',
    '<b>Drawing a wire end-on.</b> A conductor seen in cross-section is marked with a <b>cross (×)</b> when conventional current flows <b>into</b> the paper — the tail feathers of an arrow going away — and a <b>dot (·)</b> when it flows <b>out</b> of the paper — the point of an arrow coming towards you. By the right-hand grip rule, current <b>into</b> the paper produces a <b>clockwise</b> field and current <b>out</b> of the paper an <b>anticlockwise</b> field. This shorthand is used in every motor and generator diagram.')
into(f, 200, 150, 22); circle_arrows(f, 200, 150, 60, True, 'cool'); circle_arrows(f, 200, 150, 90, True, 'cool')
f.T(200, 270, 'current INTO the paper (cross)', 11, 'ink', 'middle', bold=True); f.T(200, 286, 'field CLOCKWISE', 10, 'cool', 'middle')
outof(f, 540, 150, 22); circle_arrows(f, 540, 150, 60, False, 'cool'); circle_arrows(f, 540, 150, 90, False, 'cool')
f.T(540, 270, 'current OUT of the paper (dot)', 11, 'ink', 'middle', bold=True); f.T(540, 286, 'field ANTICLOCKWISE', 10, 'cool', 'middle')
f.T(380, 40, 'cross: arrow tail going away  |  dot: arrow point coming towards you', 10, 'dim', 'middle')
EL.append(f)

# 05_06 force between parallel conductors
f = E('05_06', 'Force Between Parallel Conductors', 760, 300, 'Two pairs of parallel conductors: currents in the same direction attract, currents in opposite directions repel',
    '<b>Currents interact through their fields.</b> Two parallel conductors carrying current in the <b>same direction</b> produce fields that oppose each other between the wires and combine outside them, so the wires are pushed <b>together</b>: they <b>attract</b>. Currents in <b>opposite</b> directions produce fields that combine between the wires, pushing them <b>apart</b>: they <b>repel</b>. The force is proportional to the product of the two currents. Under a heavy fault current the forces between bus-bars or cable cores can be large enough to cause mechanical damage.')
for i, (a, b, ttl, c_, d) in enumerate((('in', 'in', 'SAME direction: ATTRACT', 'green', 1), ('in', 'out', 'OPPOSITE directions: REPEL', 'hot', -1))):
    cx_ = 200 + i * 360
    for k, s in enumerate((a, b)):
        x = cx_ - 70 + k * 140
        (into if s == 'in' else outof)(f, x, 140, 16); circle_arrows(f, x, 140, 40, s == 'in', 'cool', 3)
    f.L(cx_ - 46, 140, cx_ - 46 + 26 * d, 140, c_, 3, me=c_); f.L(cx_ + 46, 140, cx_ + 46 - 26 * d, 140, c_, 3, me=c_)
    f.T(cx_, 230, ttl, 11, c_, 'middle', bold=True)
f.T(380, 280, 'Force is proportional to the product of the two currents.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

# 05_07 solenoid field
f = E('05_07', 'Solenoid — The Field of a Coil', 760, 300, 'A coil of wire carrying current with lines of flux passing through the coil and returning outside it, giving north and south poles',
    '<b>Coiling the wire concentrates the field.</b> When a conductor is wound into a <b>coil (solenoid)</b>, the fields of the individual turns add together inside the coil and produce a field like that of a bar magnet, with a <b>north</b> pole at one end and a <b>south</b> at the other. Its strength — the <b>magnetomotive force</b> — depends on the <b>ampere-turns</b>: the current multiplied by the number of turns. A <b>soft-iron core</b> inside multiplies it many times. The polarity follows the right-hand grip rule applied to the coil: fingers in the direction of current round the turns, thumb points to <b>north</b>.')
for i in range(8):
    x = 230 + i * 36; f.raw(f'<ellipse cx="{x}" cy="150" rx="12" ry="54" fill="none" stroke="{col("warm")}" stroke-width="3"/>')
f.R(214, 132, 288, 36, c='ink', sw=1.2, fill='steel', rx=4, op=0.5)
for dy in (-14, 0, 14): f.L(200, 150 + dy, 520, 150 + dy, 'gold', 1.4, me='gold')
for s in (-1, 1): f.P(f'M520,{150 + s * 20} C600,{150 + s * 100} 120,{150 + s * 100} 200,{150 + s * 20}', 'gold', 1.2, me='gold')
f.T(180, 156, 'S', 18, 'cool', 'end', bold=True); f.T(540, 156, 'N', 18, 'hot', bold=True)
wire(f, [(230, 204), (230, 260), (300, 260)]); battH(f, 330, 260); wire(f, [(334, 260), (482, 260), (482, 204)])
f.T(560, 70, 'soft-iron core', 10, 'ink'); f.L(556, 66, 480, 138, 'dim', 1)
note(f, 580, 150, ['Strength proportional', 'to ampere-turns', '(current × turns).', 'An iron core multiplies it.'], first='gold')
EL.append(f)

# 05_08 solenoid vs relay
f = E('05_08', 'Solenoid vs Relay', 760, 320, 'A solenoid with a moving plunger closing heavy contacts and a relay with a fixed core attracting a hinged armature',
    '<b>Both let a small current switch a large one.</b> A small current from a cockpit switch energises a coil; the magnetism closes contacts in a separate heavy-current circuit, so the heavy cables can be kept short and away from the cockpit. A <b>solenoid</b> (contactor) has a <b>moving core</b> (plunger) drawn into the coil — strong pull, used for heavy loads such as the battery master or starter. A <b>relay</b> has a <b>fixed core</b> that attracts a hinged <b>armature</b> — lighter, faster, often with several sets of contacts. A spring opens the contacts when the coil is de-energised.')
for i, (x0, ttl) in enumerate(((60, 'SOLENOID (moving core)'), (420, 'RELAY (fixed core)'))):
    f.T(x0 + 140, 36, ttl, 11, 'ink', 'middle', bold=True)
    coilV(f, x0 + 70, 100, 200, 'cool', 6, 2.4); f.T(x0 + 40, 150, 'coil', 9.5, 'cool', 'end')
    wire(f, [(x0 + 70, 100), (x0 + 10, 100), (x0 + 10, 260)]); f.T(x0 + 10, 280, 'small current', 9.5, 'cool', 'middle')
    if i == 0:
        f.R(x0 + 82, 120, 22, 70, c='ink', sw=1.4, fill='steel', rx=2); f.L(x0 + 93, 120, x0 + 93, 70, 'ink', 3); f.L(x0 + 70, 70, x0 + 116, 70, 'gold', 4)
        f.R(x0 + 60, 56, 10, 10, c='ink', sw=1, fill='steel', rx=1); f.R(x0 + 116, 56, 10, 10, c='ink', sw=1, fill='steel', rx=1)
        f.T(x0 + 130, 140, 'plunger', 9.5, 'ink'); f.T(x0 + 130, 66, 'heavy contacts', 9.5, 'gold')
    else:
        f.R(x0 + 82, 110, 22, 80, c='ink', sw=1.4, fill='steel', rx=2); f.L(x0 + 100, 100, x0 + 200, 90, 'ink', 4); f.Ci(x0 + 100, 100, 4, 'ink', 1, 'ink')
        f.R(x0 + 196, 70, 10, 10, c='ink', sw=1, fill='steel', rx=1); f.T(x0 + 130, 150, 'fixed core', 9.5, 'ink'); f.T(x0 + 150, 76, 'armature', 9.5, 'ink'); f.T(x0 + 212, 80, 'contacts', 9.5, 'gold')
    f.L(x0 + 150, 230, x0 + 260, 230, 'hot', 3.4); f.T(x0 + 205, 254, 'heavy-current circuit', 9.5, 'hot', 'middle', bold=True)
f.T(380, 306, 'A small control current switches a large load current; a spring opens the contacts when de-energised.', 10, 'ink', 'middle', bold=True)
EL.append(f)

# 05_09 catapult field
f = E('05_09', 'Motor Principle — The Catapult Field', 760, 300, 'A current-carrying conductor in the field between two poles; the fields combine on one side and oppose on the other, pushing the conductor',
    '<b>Why a motor turns.</b> Place a conductor carrying current across the field between two magnet poles. Its own circular field <b>adds to</b> the main field on one side and <b>opposes</b> it on the other. The flux crowds onto the strong side; like stretched rubber bands the lines try to straighten, and they throw the conductor towards the <b>weak</b> side — the <b>catapult field</b>. The force is proportional to flux density × current × length (F = BIL). Its direction is given by <b>Fleming’s left-hand rule</b>; reversing either the field or the current reverses the force.')
f.R(60, 90, 90, 120, c='ink', sw=1.6, fill='hot', rx=4); f.T(105, 156, 'N', 20, 'white', 'middle', bold=True, check=False)
f.R(470, 90, 90, 120, c='ink', sw=1.6, fill='cool', rx=4); f.T(515, 156, 'S', 20, 'white', 'middle', bold=True, check=False)
for dy in (-48, -30, -16): f.P(f'M150,{150 + dy} Q310,{150 + dy - 34} 470,{150 + dy}', 'gold', 1.4, me='gold')
for dy in (16, 40): f.P(f'M150,{150 + dy} Q310,{150 + dy + 8} 470,{150 + dy}', 'gold', 1.4, me='gold')
into(f, 310, 150, 16)
f.L(310, 170, 310, 250, 'green', 4, me='green'); f.T(322, 236, 'FORCE', 11, 'green', bold=True)
f.T(310, 60, 'flux crowded: strong field', 10, 'gold', 'middle'); f.T(310, 280, 'weak field: conductor pushed this way', 10, 'dim', 'middle')
note(f, 590, 90, ['F = B × I × L', 'direction by', "Fleming's left-hand", 'rule'], first='ink')
EL.append(f)

def hand(f, x, y, labels, title, c3):
    """three mutually perpendicular arrows: thumb up, first finger right, second finger out (down-left)."""
    f.L(x, y, x, y - 110, 'green', 4, me='green'); f.L(x, y, x + 130, y, 'hot', 4, me='hot'); f.L(x, y, x - 80, y + 70, c3, 4, me=c3)
    f.T(x + 8, y - 110, labels[0], 11, 'green', bold=True); f.T(x + 134, y + 4, labels[1], 11, 'hot', bold=True); f.T(x - 86, y + 84, labels[2], 11, c3, 'end' if False else 'start', bold=True)
    f.T(x + 20, y - 150, title, 12, 'ink', 'middle', bold=True)

# chapter 6 begins in part 2 — keep a few here
EL_TAGS = [g.fid for g in EL]
if __name__ == '__main__':
    gallery(EL, 'Electrics Gallery 1', 'Electrics — DC Principles, Components & Magnetism', 'Original figures for DC circuits, switches, protection, capacitors, batteries and magnetism.', 'el1-gallery.html')
    print(f'EL1 {len(EL)}  QA warnings: {len(WARN)}')
    for w in WARN: print('  ⚠', w)
