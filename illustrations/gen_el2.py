#!/usr/bin/env python3
"""Electrics part 2 (chapters 6-8): generation & regulation, DC motors & actuators, distribution — 27 figures."""
import math
from figlib import *
from gen_common import note, gallery
from elec_common import *

EL = []
def meter(f, x, y, r=22, txt='A'):
    f.Ci(x, y, r, 'ink', 2, 'g3'); t = pol(x, y, r - 6, 30); f.L(x, y + 6, t[0], t[1], 'hot', 2); f.T(x, y + r - 6, txt, 9, 'ink', 'middle', bold=True, check=False)
def hand(f, x, y, up, right, out, title, into_page=False):
    f.L(x, y, x, y - 100, 'green', 4, me='green'); f.L(x, y, x + 120, y, 'hot', 4, me='hot')
    if into_page: f.L(x, y, x + 66, y - 56, 'cool', 4, me='cool'); f.T(x + 72, y - 62, out + ' (into the page)', 11, 'cool', bold=True)
    else: f.L(x, y, x - 70, y + 60, 'cool', 4, me='cool'); f.T(x - 74, y + 78, out + ' (out of the page)', 11, 'cool', bold=True)
    f.T(x + 8, y - 96, up, 11, 'green', bold=True); f.T(x + 124, y + 4, right, 11, 'hot', bold=True)
    f.T(x + 30, 30, title, 12, 'ink', 'middle', bold=True)

# 06_01 relative motion
f = E('06_01', 'Electromagnetic Induction Needs Relative Motion', 760, 300, 'A magnet pushed into a coil connected to a meter, with the meter deflecting only while the magnet moves',
    '<b>Faraday’s discovery.</b> Moving a magnet into a coil makes the connected meter <b>deflect</b>; holding it still gives <b>no reading</b>; pulling it out deflects the meter the <b>other way</b>. An EMF is induced only while the magnetic flux linking the coil is <b>changing</b> — it does not matter whether the magnet moves, the coil moves, or the current in a nearby coil changes. This is <b>electromagnetic induction</b>, the principle of every generator, alternator and transformer.')
for i, (ttl, mv, defl) in enumerate((('magnet moving IN', 1, 30), ('magnet STATIONARY', 0, 0), ('magnet moving OUT', -1, -30))):
    x0 = 30 + i * 245
    for k in range(5): f.raw(f'<ellipse cx="{x0 + 80 + k * 14}" cy="150" rx="7" ry="36" fill="none" stroke="{col("warm")}" stroke-width="2.6"/>')
    magnet(f, x0 + 10, 136, 56, 28, 'N', 'S') if False else None
    f.R(x0 + 12, 138, 26, 24, c='ink', sw=1.2, fill='hot', rx=2); f.R(x0 + 38, 138, 26, 24, c='ink', sw=1.2, fill='cool', rx=2)
    f.T(x0 + 25, 155, 'N', 10, 'white', 'middle', bold=True, check=False); f.T(x0 + 51, 155, 'S', 10, 'white', 'middle', bold=True, check=False)
    if mv: f.L(x0 + 38 - mv * 20, 120, x0 + 38 + mv * 20, 120, 'gold', 2.4, me='gold')
    wire(f, [(x0 + 80, 186), (x0 + 80, 230), (x0 + 170, 230)]); wire(f, [(x0 + 136, 186), (x0 + 136, 210), (x0 + 170, 210)])
    f.Ci(x0 + 192, 220, 24, 'ink', 2, 'g3'); t = pol(x0 + 192, 228, 20, defl); f.L(x0 + 192, 228, t[0], t[1], 'hot', 2.4)
    f.T(x0 + 110, 60, ttl, 10.5, 'ink', 'middle', bold=True); f.T(x0 + 110, 276, ('meter deflects' if mv else 'no reading'), 10, 'hot' if mv else 'dim', 'middle', bold=True)
EL.append(f)

f = E('06_03', 'Direction of the Induced Current Follows the Motion', 760, 300, 'A magnet moved towards and away from a coil, with the induced current and meter deflection reversing',
    '<b>Lenz’s law.</b> The induced current always flows in the direction that <b>opposes the change</b> producing it. Push the north pole towards the coil and the induced current makes the near end of the coil a <b>north</b> pole, repelling the magnet; pull it away and the near end becomes a <b>south</b> pole, attracting it. So reversing the motion — or the pole — reverses the induced current and the meter swings the other way. Because the induced field always opposes the motion, mechanical work must be done to generate electricity.')
for i, (ttl, mv, defl, pole) in enumerate((('north pole moving TOWARDS the coil', -1, -30, 'N'), ('north pole moving AWAY from the coil', 1, 30, 'S'))):
    x0 = 40 + i * 370
    for k in range(5): f.raw(f'<ellipse cx="{x0 + 60 + k * 14}" cy="150" rx="7" ry="40" fill="none" stroke="{col("warm")}" stroke-width="2.6"/>')
    f.R(x0 + 150, 136, 40, 28, c='ink', sw=1.2, fill='hot', rx=2); f.R(x0 + 190, 136, 40, 28, c='ink', sw=1.2, fill='cool', rx=2)
    f.T(x0 + 170, 155, 'N', 11, 'white', 'middle', bold=True, check=False); f.T(x0 + 210, 155, 'S', 11, 'white', 'middle', bold=True, check=False)
    f.L(x0 + 190 - mv * 26, 120, x0 + 190 + mv * 26, 120, 'gold', 2.6, me='gold')
    f.T(x0 + 136, 116, pole, 14, 'hot' if pole == 'N' else 'cool', 'middle', bold=True)
    wire(f, [(x0 + 60, 190), (x0 + 60, 240), (x0 + 200, 240)]); wire(f, [(x0 + 116, 190), (x0 + 116, 220), (x0 + 200, 220)])
    f.Ci(x0 + 224, 230, 24, 'ink', 2, 'g3'); t = pol(x0 + 224, 238, 20, defl); f.L(x0 + 224, 238, t[0], t[1], 'hot', 2.4)
    f.T(x0 + 150, 60, ttl, 10.5, 'ink', 'middle', bold=True); f.T(x0 + 150, 76, ('coil end becomes N: repels' if pole == 'N' else 'coil end becomes S: attracts'), 10, 'dim', 'middle')
f.T(380, 290, 'Lenz: the induced current opposes the change that causes it.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('06_04', "Fleming's Right-Hand (Generator) Rule", 760, 300, 'Three mutually perpendicular arrows for thumb motion, first finger field and second finger current, with a conductor moving between poles',
    '<b>For generators use the right hand.</b> Hold the thumb, first finger and second finger of the <b>right</b> hand at right angles to each other. The <b>thu</b>Mb points in the direction of <b>Motion</b> of the conductor, the <b>F</b>irst finger along the <b>F</b>ield (north to south), and the se<b>C</b>ond finger then gives the direction of the induced <b>C</b>urrent (conventional). Memory aid: right for generating, left for motoring — “<b>G</b>enerators drive on the right”.')
hand(f, 140, 190, 'thuMb: Motion', 'First finger: Field', 'seCond finger: Current', 'RIGHT hand (generator)', into_page=True)
f.R(430, 100, 70, 110, c='ink', sw=1.6, fill='hot', rx=4); f.T(465, 162, 'N', 18, 'white', 'middle', bold=True, check=False)
f.R(640, 100, 70, 110, c='ink', sw=1.6, fill='cool', rx=4); f.T(675, 162, 'S', 18, 'white', 'middle', bold=True, check=False)
for dy in (-30, 0, 30): f.L(500, 155 + dy, 640, 155 + dy, 'gold', 1.2, me='gold')
into(f, 570, 155, 14); f.L(570, 136, 570, 96, 'green', 3, me='green'); f.T(580, 104, 'motion up', 10, 'green', bold=True)
f.T(570, 240, 'conductor moved up: current INTO the page', 10, 'cool', 'middle', bold=True)
EL.append(f)

f = E('06_05', 'Three Ways to Increase the Induced EMF', 760, 300, 'Three coil and meter set-ups showing more speed, a stronger magnet and more turns each giving a larger reading',
    '<b>The induced EMF is proportional to the rate of change of flux linkage</b> (Faraday’s law), so it can be increased in three ways: <b>1</b> move the conductor or magnet <b>faster</b>; <b>2</b> use a <b>stronger magnetic field</b>; <b>3</b> use <b>more turns</b> on the coil. In a generator these correspond to the <b>speed</b> of rotation, the <b>field current</b> (which sets the field strength) and the number of turns built into the armature. Since engine speed varies, aircraft generators control their output voltage by adjusting the <b>field current</b>.')
for i, (ttl, l1, turns, mag, speed) in enumerate((('1  MORE SPEED', 'move the magnet faster', 5, 1, 2), ('2  STRONGER FIELD', 'a stronger magnet', 5, 2, 1), ('3  MORE TURNS', 'more turns on the coil', 9, 1, 1))):
    x0 = 30 + i * 245
    for k in range(turns): f.raw(f'<ellipse cx="{x0 + 70 + k * 10}" cy="140" rx="6" ry="34" fill="none" stroke="{col("warm")}" stroke-width="2.4"/>')
    f.R(x0 + 10, 126, 40, 28, c='ink', sw=1.2 * mag, fill='hot', rx=2); f.T(x0 + 30, 145, 'N', 11, 'white', 'middle', bold=True, check=False)
    for k in range(speed): f.L(x0 + 12 + k * 12, 110, x0 + 46 + k * 12, 110 - k * 0, 'gold', 2.4, me='gold')
    f.Ci(x0 + 180, 150, 24, 'ink', 2, 'g3'); t = pol(x0 + 180, 158, 20, 50); f.L(x0 + 180, 158, t[0], t[1], 'hot', 2.4)
    wire(f, [(x0 + 70, 174), (x0 + 70, 200), (x0 + 156, 200), (x0 + 156, 160)])
    f.T(x0 + 110, 60, ttl, 11, 'ink', 'middle', bold=True); f.T(x0 + 110, 236, l1, 10, 'dim', 'middle')
f.T(380, 286, 'Aircraft generators regulate their voltage by controlling the FIELD current.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('06_08', 'Split-Ring Commutator — Making DC', 760, 300, 'A single loop rotating between magnet poles with its ends on a two-segment commutator and brushes feeding a load',
    '<b>How a DC generator gets direct current.</b> A loop rotating in a magnetic field generates an EMF that reverses every half-turn. The loop’s ends are connected to the two halves of a <b>split ring</b> — the <b>commutator</b> — and fixed carbon <b>brushes</b> press on it. Every half-turn, just as the EMF in the loop reverses, the commutator also swaps the connections to the brushes, so the output at the brushes is always in the <b>same direction</b>: pulsating DC. The commutator and brushes wear and spark, which limits DC generators’ speed and output.')
f.R(60, 90, 80, 120, c='ink', sw=1.6, fill='hot', rx=4); f.T(100, 156, 'N', 18, 'white', 'middle', bold=True, check=False)
f.R(360, 90, 80, 120, c='ink', sw=1.6, fill='cool', rx=4); f.T(400, 156, 'S', 18, 'white', 'middle', bold=True, check=False)
f.P('M180,120 L320,120 L320,180 L180,180', 'warm', 4, join='round')
f.L(180, 120, 180, 150, 'warm', 4); f.L(180, 180, 180, 160, 'warm', 4)
f.P('M196,134 A16,16 0 0 0 196,166', 'hot', 6); f.P('M200,134 A16,16 0 0 1 200,166', 'cool', 6)
f.R(150, 136, 20, 28, c='ink', sw=1, fill='black', rx=2) if False else None
f.R(186, 112, 24, 14, c='ink', sw=1, fill='black', rx=2); f.R(186, 174, 24, 14, c='ink', sw=1, fill='black', rx=2)
wire(f, [(198, 112), (198, 60), (560, 60), (560, 120)]); resV(f, 560, 120, 200); wire(f, [(560, 200), (560, 250), (198, 250), (198, 188)])
f.T(580, 166, 'LOAD', 10.5, 'hot', bold=True); f.T(260, 110, 'rotating loop', 10, 'warm', 'middle', bold=True)
f.T(198, 216, 'split-ring commutator', 9.5, 'ink', 'middle'); f.T(232, 96, 'brush', 9.5, 'ink'); f.T(232, 200, 'brush', 9.5, 'ink')
note(f, 600, 60, ['Every half-turn', 'the commutator', 'swaps the loop', 'connections:', 'output stays one', 'direction (DC).'], first='gold')
EL.append(f)

f = E('06_09', 'Single-Loop DC Output Waveform', 760, 280, 'The output of a single loop with a commutator: a series of half sine waves all on the positive side',
    '<b>Pulsating DC.</b> Without a commutator one loop gives a sine wave that goes positive for half a turn and negative for the next. The commutator reverses the connections each half-turn, flipping the negative halves positive, so the output is a series of <b>humps</b> — always in one direction, but rising to a peak at 90° and 270° (when the loop cuts the flux at right angles) and falling to <b>zero</b> at 0°, 180° and 360° (when it moves along the flux). Usable DC needs many coils, as the next figure shows.')
f.L(80, 220, 700, 220, 'ink', 1.6, me='ink'); f.L(80, 230, 80, 60, 'ink', 1.6, me='ink')
wave(f, 80, 680, 220, 130, 1, c='gold', fn=lambda a: abs(math.sin(a)))
for d, x in ((0, 80), (90, 230), (180, 380), (270, 530), (360, 680)): f.L(x, 220, x, 226, 'ink', 1); f.T(x, 242, f'{d}°', 10, 'dim', 'middle')
f.T(230, 76, 'peak', 10, 'gold', 'middle', bold=True); f.T(530, 76, 'peak', 10, 'gold', 'middle', bold=True); f.T(380, 208, 'zero', 10, 'dim', 'middle')
f.T(60, 140, 'EMF', 10, 'dim', 'end'); f.T(700, 210, 'rotation', 10, 'dim', 'end')
f.T(380, 270, 'Pulsating DC: always one direction, but falling to zero every half-turn.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

def dcgen(tag, title, kind, cap):
    f = E(tag, title, 760, 300, f'Circuit of a {kind} DC generator, its load characteristic and a diagrammatic view', cap)
    circ(f, 140, 150, 34, 'G', 'ink', 'g3', 14)
    if kind in ('series', 'compound'):
        wire(f, [(140, 116), (140, 70), (200, 70)]); coilH(f, 200, 280, 70, 'cool', 6); wire(f, [(280, 70), (340, 70), (340, 120)]); f.T(240, 52, 'series field', 9.5, 'cool', 'middle')
    else:
        wire(f, [(140, 116), (140, 70), (340, 70), (340, 120)])
    if kind in ('shunt', 'compound'):
        wire(f, [(110, 150), (60, 150), (60, 120)]); coilV(f, 60, 120, 200, 'gold', 5); wire(f, [(60, 200), (60, 230), (140, 230)]); f.T(30, 160, 'shunt', 9.5, 'gold', 'end'); f.T(30, 174, 'field', 9.5, 'gold', 'end')
    resV(f, 340, 120, 200); f.T(356, 166, 'LOAD', 10, 'hot', bold=True); wire(f, [(340, 200), (340, 230), (140, 230), (140, 184)])
    f.L(440, 240, 440, 60, 'ink', 1.6, me='ink'); f.L(440, 240, 700, 240, 'ink', 1.6, me='ink'); f.T(430, 150, 'volts', 9.5, 'dim', 'middle', rot=-90); f.T(570, 270, 'load current', 9.5, 'dim', 'middle')
    if kind == 'series': f.P('M440,240 Q520,110 680,90', 'gold', 2.6); f.T(560, 80, 'voltage RISES with load', 10, 'gold', 'middle', bold=True)
    else: f.L(440, 120, 690, 120, 'gold', 2.6); f.T(565, 108, 'voltage nearly constant', 10, 'gold', 'middle', bold=True)
    return f
EL.append(dcgen('06_10', 'Series-Wound DC Generator', 'series',
    '<b>Field in series with the load.</b> All the load current flows through the <b>series field</b> winding, which has a few turns of heavy wire. With no load there is almost no field and almost no output; as the load increases, the field strengthens and the <b>voltage rises</b> with load (until the iron saturates). That makes the output voltage depend on the load, so a series generator is unsuitable for supplying an aircraft bus-bar. Series windings are used, however, in compound generators and in motors.'))
f = E('06_11', 'Single vs Multiple Coil — Smoothing the DC', 760, 300, 'The output of a single coil as humps falling to zero, and the combined output of many coils as a nearly steady voltage',
    '<b>More coils, smoother DC.</b> A single coil gives humps that fall to zero twice a revolution. A practical armature has <b>many coils</b> spaced round it, each connected to its own pair of commutator segments, so the brushes always pick up the coil that is near its peak. The overlapping humps combine into a nearly <b>steady</b> output with only a small <b>ripple</b>. The more coils and segments, the smaller the ripple.')
f.T(60, 40, 'single coil', 10.5, 'ink', bold=True); f.L(60, 130, 700, 130, 'ink', 1.2); wave(f, 60, 700, 130, 70, 2, c='gold', fn=lambda a: abs(math.sin(a)))
f.T(60, 170, 'multiple coils', 10.5, 'ink', bold=True); f.L(60, 270, 700, 270, 'ink', 1.2)
for k in range(4): wave(f, 60, 700, 270, 70, 2, phase=k * math.pi / 4, c='line', sw=1, fn=lambda a: abs(math.sin(a)))
wave(f, 60, 700, 270, 70, 2, c='green', sw=2.8, fn=lambda a: max(abs(math.sin(a + k * math.pi / 4)) for k in range(4)))
f.T(700, 192, 'resultant: nearly steady', 10, 'green', 'end', bold=True)
EL.append(f)
EL.append(dcgen('06_13', 'Compound-Wound DC Generator', 'compound',
    '<b>Shunt and series fields together.</b> A <b>shunt field</b> (many turns of fine wire, connected across the output) provides the main field and keeps the voltage up at light load. A small <b>series field</b> carries the load current and adds flux as the load rises, compensating for the voltage drop inside the armature. Proportioned correctly (“level compounded”) the output voltage stays <b>nearly constant</b> from no load to full load. Aircraft DC generators are usually shunt or compound wound, with a voltage regulator controlling the shunt field current.'))

f = E('06_14', 'DC Generator vs Alternator', 760, 320, 'A DC generator with a rotating armature, stationary field and commutator beside an alternator with a rotating field, stationary armature and rectifier',
    '<b>Swap what rotates.</b> In a <b>DC generator</b> the field is <b>stationary</b> and the <b>armature rotates</b>, so the full load current has to pass through the <b>commutator and brushes</b> — heavy, sparking and limiting at high speed or altitude. An <b>alternator</b> turns this round: the <b>field rotates</b> (it needs only a small current, fed through slip rings) and the output is taken from a <b>stationary armature</b> (stator) by fixed connections. Its AC output is <b>rectified</b> by diodes to DC for a light-aircraft bus. Alternators are lighter, give useful output at low engine speed and need far less maintenance — but, unlike a DC generator, cannot self-excite from a flat battery.')
f.T(190, 40, 'DC GENERATOR', 11.5, 'ink', 'middle', bold=True)
f.R(80, 90, 50, 110, c='ink', sw=1.6, fill='hot', rx=4); f.R(250, 90, 50, 110, c='ink', sw=1.6, fill='cool', rx=4); f.T(105, 150, 'N', 14, 'white', 'middle', bold=True, check=False); f.T(275, 150, 'S', 14, 'white', 'middle', bold=True, check=False)
f.Ci(190, 145, 36, 'warm', 3, 'g3'); f.T(190, 150, 'armature', 9.5, 'ink', 'middle')
circle_arrows(f, 190, 145, 50, True, 'gold', 2)
f.T(190, 236, 'stationary field, ROTATING armature', 10, 'dim', 'middle'); f.T(190, 252, 'load current through the commutator', 10, 'hot', 'middle')
f.L(380, 30, 380, 290, 'line', 1, dash='3 5')
f.T(570, 40, 'ALTERNATOR', 11.5, 'ink', 'middle', bold=True)
f.Ci(570, 145, 80, 'warm', 6, 'g3'); f.R(546, 110, 48, 70, c='ink', sw=1.4, fill='hot', rx=4); f.T(570, 136, 'N', 12, 'white', 'middle', bold=True, check=False); f.T(570, 168, 'S', 12, 'white', 'middle', bold=True, check=False)
circle_arrows(f, 570, 145, 50, True, 'gold', 2)
f.T(570, 252, 'ROTATING field, stationary armature (stator)', 10, 'dim', 'middle'); f.T(570, 268, 'output rectified by diodes', 10, 'green', 'middle')
f.T(380, 306, 'Alternator: lighter, output at low rpm, little brush wear — but needs the battery to excite the field.', 10, 'ink', 'middle', bold=True)
EL.append(f)

f = E('06_15', 'Carbon-Pile Voltage Regulator', 760, 320, 'A pile of carbon discs in series with the generator field, compressed by a spring and released by an electromagnet sensing output voltage',
    '<b>Controlling the field current to hold the voltage.</b> A stack of <b>carbon discs</b> is in series with the generator’s <b>shunt field</b>. A <b>spring</b> squeezes the pile: tightly compressed, its resistance is low, field current high. An <b>electromagnet</b> connected across the generator output pulls against the spring. If the output voltage rises — say with engine speed — the electromagnet pulls harder, the pile <b>loosens</b>, its resistance <b>rises</b>, the field current falls and the voltage drops back. If the voltage falls, the opposite happens. The action is smooth and continuous, without contacts opening and closing.')
circ(f, 100, 160, 30, 'G', 'ink', 'g3', 14)
wire(f, [(100, 130), (100, 60), (660, 60)]); wire(f, [(100, 190), (100, 270), (660, 270)]); f.T(670, 64, '+ to bus', 10, 'ink'); f.T(670, 274, '−', 10, 'ink')
coilV(f, 230, 110, 200, 'gold', 4); f.T(200, 160, 'field', 10, 'gold', 'end'); wire(f, [(100, 100), (230, 100), (230, 110)])
wire(f, [(230, 200), (230, 230), (330, 230), (330, 210)])
for k in range(8): f.R(310, 120 + k * 11, 40, 9, c='ink', sw=1, fill='black', rx=2)
f.T(370, 160, 'carbon pile', 10, 'ink', bold=True); wire(f, [(330, 120), (330, 100)]); f.P('M330,100 L330,96', 'ink', 1)
f.P('M300,98 L360,98', 'ink', 3); f.P('M330,98 L330,84 L322,80 L338,74 L322,68 L338,62 L330,58', 'green', 2); f.T(346, 86, 'spring compresses', 9.5, 'green')
coilV(f, 470, 110, 200, 'cool', 5); f.T(486, 160, 'voltage coil', 10, 'cool', bold=True); wire(f, [(470, 60), (470, 110)]); wire(f, [(470, 200), (470, 270)])
f.L(450, 120, 370, 110, 'cool', 2, me='cool', dash='5 4'); f.T(420, 140, 'pulls against the spring', 9.5, 'cool', 'middle')
note(f, 560, 110, ['Voltage high: pile loosens,', 'resistance up, field', 'current down.'], first='hot')
note(f, 560, 190, ['Voltage low: pile compresses,', 'resistance down, field', 'current up.'], first='green')
EL.append(f)

f = E('06_16', 'Vibrating-Contact Voltage & Current Regulator', 760, 320, 'A voltage regulator relay and a current limiter relay whose contacts open and close rapidly to insert a resistor in the field circuit',
    '<b>The older light-aircraft regulator.</b> The generator field is fed through two sets of <b>vibrating contacts</b> in series. The <b>voltage regulator</b> coil is across the output: when the voltage reaches the set value it pulls its contacts open, inserting a <b>resistor</b> into the field circuit, the field weakens and the voltage falls; the contacts close again and the cycle repeats many times a second, holding a steady average voltage. The <b>current limiter</b> coil carries the load current and opens its contacts in the same way if the generator is overloaded. Spring tension sets each operating point.')
circ(f, 90, 170, 30, 'G', 'ink', 'g3', 14)
wire(f, [(90, 140), (90, 60), (690, 60)]); f.T(694, 64, 'to bus', 10, 'ink')
for i, (x, ttl, c_) in enumerate(((300, 'VOLTAGE REGULATOR', 'cool'), (520, 'CURRENT LIMITER', 'gold'))):
    f.R(x - 70, 90, 160, 150, c=c_, sw=1.6, fill='g2', rx=8); f.T(x + 10, 260, ttl, 10.5, c_, 'middle', bold=True)
    coilV(f, x - 30, 130, 210, c_, 5); f.L(x, 120, x + 60, 112, 'ink', 3); f.Ci(x, 120, 3, 'ink', 1, 'ink')
    f.R(x + 56, 116, 10, 8, c='ink', sw=1, fill='steel', rx=1); f.P(f'M{x+30},{116} L{x+30},{100} L{x+24},{104}', 'green', 1.6)
    resH(f, x + 10, x + 70, 200, 'hot', 1.6, 3)
f.T(300, 108, 'contacts', 9.5, 'dim', 'middle'); f.T(520, 108, 'contacts', 9.5, 'dim', 'middle')
coilV(f, 140, 220, 280, 'warm', 3); f.T(160, 256, 'generator field', 9.5, 'warm')
f.T(380, 304, 'Contacts vibrate open and shut, inserting a resistor into the field: average field current holds the voltage.', 10, 'ink', 'middle', bold=True)
EL.append(f)

f = E('06_17', 'Generator, Bus-Bar & Battery', 760, 300, 'A generator and a battery both connected to a bus-bar feeding the loads',
    '<b>The basic DC power system.</b> The <b>generator</b> supplies the <b>bus-bar</b>, from which every load is fed in parallel through its own circuit breaker. The <b>battery</b> is also connected to the bus. With the engine running the generator voltage (about 28 V on a 24 V system) is slightly higher than the battery’s, so the generator powers the loads <b>and charges the battery</b>. If the generator fails or the engine is stopped, the battery takes over automatically and supplies the bus for a limited time — so the pilot must reduce the load. The ammeter shows whether the battery is charging or discharging.')
f.R(250, 50, 260, 24, c='ink', sw=1.6, fill='steel', rx=3); f.T(380, 67, 'BUS-BAR', 11, 'white', 'middle', bold=True, check=False)
circ(f, 140, 170, 36, 'G', 'ink', 'g3', 16); wire(f, [(140, 134), (140, 62), (250, 62)]); wire(f, [(140, 206), (140, 260)]); ground(f, 140, 260)
for k in range(3): x = 300 + k * 60; wire(f, [(x, 74), (x, 120)]); lamp(f, x, 134); wire(f, [(x, 146), (x, 230)]); ground(f, x, 230)
f.T(360, 270, 'loads (in parallel)', 10, 'ink', 'middle')
wire(f, [(510, 62), (620, 62), (620, 150)]); battV(f, 620, 166, label='24 V', cells=2); wire(f, [(620, 182), (620, 230)]); ground(f, 620, 230)
f.T(140, 120, 'generator', 10, 'ink', 'middle', bold=True); f.T(660, 140, 'battery', 10, 'ink', bold=True)
f.L(560, 40, 600, 40, 'green', 2, me='green'); f.T(560, 32, 'charging', 9.5, 'green')
EL.append(f)

f = E('06_18', 'Paralleled DC Generators with Load Sharing', 760, 320, 'Two generators each with a voltage regulator, connected to a common bus with an equalising circuit between the regulators',
    '<b>Sharing the load evenly.</b> When two or more DC generators feed the same bus, small differences in their voltages would make one take most of the load. An <b>equalising (load-sharing) circuit</b> links the regulators: a small resistor (or the series-field interpole winding) in each generator’s negative lead produces a voltage proportional to its load, and an <b>equalising coil</b> in each regulator compares them. The more heavily loaded generator has its field reduced and the lighter one has its field increased until the loads are equal. Each generator is connected to the bus through its own reverse-current cut-out.')
for i, x in enumerate((140, 620)):
    circ(f, x, 200, 32, 'G', 'ink', 'g3', 14); f.T(x, 254, f'generator {i+1}', 10, 'ink', 'middle', bold=True)
    wire(f, [(x, 168), (x, 70)]); f.box(x - 60, 90, 120, 44, ['voltage', 'regulator'], c='cool', size=10)
f.R(140, 40, 480, 20, c='ink', sw=1.6, fill='steel', rx=3); f.T(380, 55, 'BUS-BAR', 10.5, 'white', 'middle', bold=True, check=False)
f.L(200, 112, 560, 112, 'gold', 2.4, dash='8 5'); f.T(380, 104, 'equalising circuit', 10.5, 'gold', 'middle', bold=True)
f.T(380, 150, 'the regulators compare loads and adjust the fields', 10, 'dim', 'middle')
f.T(380, 300, 'Heavily loaded generator: field reduced.  Lightly loaded: field increased.  Loads equalise.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('07_01', "Fleming's Left-Hand (Motor) Rule", 760, 300, 'Three mutually perpendicular arrows for thumb thrust, first finger field and second finger current, with a conductor forced between poles',
    '<b>For motors use the left hand.</b> Hold the thumb, first and second fingers of the <b>left</b> hand at right angles. The <b>F</b>irst finger points along the <b>F</b>ield (north to south), the se<b>C</b>ond finger along the <b>C</b>urrent (conventional), and the <b>thu</b>Mb then shows the direction of <b>M</b>otion — the force on the conductor. Reverse either the field or the current and the motion reverses; reverse both and it does not change, which is why a series-wound DC motor also runs on AC.')
hand(f, 140, 170, 'thuMb: Motion (force)', 'First finger: Field', 'seCond finger: Current', 'LEFT hand (motor)')
f.R(430, 100, 70, 110, c='ink', sw=1.6, fill='hot', rx=4); f.T(465, 162, 'N', 18, 'white', 'middle', bold=True, check=False)
f.R(640, 100, 70, 110, c='ink', sw=1.6, fill='cool', rx=4); f.T(675, 162, 'S', 18, 'white', 'middle', bold=True, check=False)
for dy in (-30, 0, 30): f.L(500, 155 + dy, 640, 155 + dy, 'gold', 1.2, me='gold')
outof(f, 570, 155, 14); f.L(570, 136, 570, 96, 'green', 3, me='green'); f.T(580, 104, 'force up', 10, 'green', bold=True)
f.T(570, 240, 'current OUT of the page: force UP', 10, 'cool', 'middle', bold=True)
EL.append(f)

f = E('07_02', 'DC Motor — Loop & Multi-Coil Armature', 760, 300, 'A single loop between poles with forces in opposite directions on its two sides producing a turning torque, fed through a commutator',
    '<b>How the armature turns.</b> Current flows <b>in</b> along one side of the loop and <b>out</b> along the other, so by the left-hand rule one side is pushed <b>up</b> and the other <b>down</b>: a turning <b>couple</b>. The commutator reverses the current in the loop each half-turn, so the torque always acts in the same rotational direction. With one loop the torque falls to zero twice per revolution; a real armature has many coils in slots round an iron core, so the torque is <b>smooth</b> and the motor will start from any position.')
f.R(60, 80, 90, 140, c='ink', sw=1.6, fill='hot', rx=4); f.T(105, 156, 'N', 18, 'white', 'middle', bold=True, check=False)
f.R(470, 80, 90, 140, c='ink', sw=1.6, fill='cool', rx=4); f.T(515, 156, 'S', 18, 'white', 'middle', bold=True, check=False)
into(f, 230, 150, 16); outof(f, 390, 150, 16); f.raw(f'<ellipse cx="310" cy="150" rx="80" ry="30" fill="none" stroke="{col("warm")}" stroke-width="2" stroke-dasharray="6 4"/>')
f.L(230, 130, 230, 86, 'green', 3, me='green'); f.L(390, 170, 390, 214, 'green', 3, me='green'); f.T(244, 96, 'force', 10, 'green', bold=True); f.T(404, 206, 'force', 10, 'green', bold=True)
circle_arrows(f, 310, 150, 100, True, 'gold', 2); f.T(310, 270, 'turning couple (torque)', 10.5, 'gold', 'middle', bold=True)
note(f, 590, 80, ['Commutator keeps the', 'torque in one direction.'], first='ink')
note(f, 590, 160, ['Many coils give smooth', 'torque and self-starting.'], first='green')
EL.append(f)

f = E('07_03', 'DC Motor Construction', 760, 300, 'A section of a DC motor showing the yoke, pole pieces with field coils, the armature on its shaft, commutator, brushes and bearings',
    '<b>Inside a DC machine</b> (a motor and a generator are built the same way). The outer <b>yoke</b> carries the <b>pole pieces</b> wound with <b>field coils</b>. The <b>armature</b> — a laminated iron core with coils in its slots — turns on a shaft in <b>ball and roller bearings</b>. One end of the armature carries the <b>commutator</b>, a ring of copper segments insulated from each other, on which spring-loaded carbon <b>brushes</b> in brush holders bear. A <b>fan</b> on the shaft draws cooling air through. The laminations reduce eddy-current losses in the iron.')
f.R(110, 70, 420, 160, c='ink', sw=2.2, fill='g3', rx=14)
f.R(200, 76, 240, 30, c='ink', sw=1.4, fill='steel', rx=3); f.R(200, 194, 240, 30, c='ink', sw=1.4, fill='steel', rx=3)
for y in (82, 200): coilH(f, 210, 430, y + 22, 'cool', 10, 1.6)
f.R(200, 112, 240, 76, c='ink', sw=1.6, fill='warm', rx=6, op=0.8)
for k in range(12): f.L(210 + k * 20, 116, 210 + k * 20, 184, 'hot', 1.2)
f.L(40, 150, 720, 150, 'ink', 4); f.R(150, 120, 40, 60, c='ink', sw=1.4, fill='gold', rx=3, op=0.8)
for y in (110, 190): f.R(160, y - 12 if y < 150 else y - 4, 20, 16, c='ink', sw=1, fill='black', rx=2)
f.Ci(118, 150, 14, 'ink', 1.4, 'steel'); f.Ci(522, 150, 14, 'ink', 1.4, 'steel'); f.P('M560,120 L580,150 L560,180', 'ink', 2)
for (x, y, t, tx, ty, a) in ((320, 70, 'yoke', 320, 50, 'middle'), (440, 90, 'pole piece and field coil', 470, 50, 'start'), (320, 150, 'armature (laminated)', 320, 268, 'middle'),
                             (170, 150, 'commutator', 150, 268, 'middle'), (170, 100, 'brushes', 60, 50, 'start'), (118, 150, 'bearing', 60, 268, 'middle'), (570, 150, 'fan', 610, 120, 'start')):
    f.T(tx, ty, t, 10, 'ink', a, bold=True); f.L(tx, ty + (4 if ty > 150 else 4) - (14 if ty > 150 else 0), x, y, 'dim', 1)
EL.append(f)

f = E('07_04', 'Starter Motor with Slow-Start Resistor', 760, 300, 'A starter motor circuit with a slow-start resistor in series, shorted out by a time switch once the engine has begun to turn',
    '<b>Limiting the starting surge.</b> A motor standing still has no back-EMF, so at switch-on its current is limited only by the low resistance of its windings — a huge <b>inrush</b> that would pull the bus voltage down and strain the battery, gears and engine. A <b>slow-start resistor</b> in series limits the current for the first few seconds while the engine is turning over; then a <b>time switch or centrifugal switch</b> shorts the resistor out and the motor receives full voltage. As the motor speeds up its back-EMF rises and the current falls naturally.')
wire(f, [(80, 250), (80, 80), (200, 80)]); resH(f, 200, 320, 80, 'hot'); f.T(260, 60, 'slow-start resistor', 10, 'hot', 'middle', bold=True)
wire(f, [(320, 80), (520, 80), (520, 130)]); circ(f, 520, 160, 30, 'M', 'ink', 'g3', 14); f.T(560, 164, 'starter motor', 10, 'ink', bold=True)
wire(f, [(180, 80), (180, 140)]); switchH(f, 180, 340, 140); wire(f, [(340, 140), (340, 80)]); f.T(260, 170, 'time / centrifugal switch: shorts the', 9.5, 'gold', 'middle'); f.T(260, 184, 'resistor once the engine turns', 9.5, 'gold', 'middle')
wire(f, [(520, 190), (520, 250), (80, 250)]); f.R(280, 240, 30, 20, c='none', sw=0, fill='bg', rx=0); battH(f, 295, 250, label='battery')
switchH(f, 80, 80, 0) if False else None
note(f, 580, 230, ['Stationary motor: no', 'back-EMF, huge inrush.'], first='hot')
EL.append(f)

def motor(tag, title, kind, cap):
    f = E(tag, title, 760, 300, f'Circuit of a {kind}-wound DC motor and its speed and torque characteristics', cap)
    circ(f, 150, 160, 32, 'M', 'ink', 'g3', 14); f.T(150, 210, 'armature', 9.5, 'dim', 'middle')
    if kind == 'series': wire(f, [(150, 128), (150, 70), (200, 70)]); coilH(f, 200, 280, 70, 'cool', 6); wire(f, [(280, 70), (340, 70), (340, 250), (150, 250), (150, 192)]); f.T(240, 52, 'series field', 9.5, 'cool', 'middle')
    else: wire(f, [(150, 128), (150, 70), (340, 70), (340, 250), (150, 250), (150, 192)]); wire(f, [(260, 70), (260, 110)]); coilV(f, 260, 110, 210, 'gold', 6); wire(f, [(260, 210), (260, 250)]); f.T(278, 160, 'shunt field', 9.5, 'gold')
    f.Ci(340, 120, 4, 'hot', 1, 'hot'); f.Ci(340, 200, 4, 'cool', 1, 'cool'); f.T(356, 124, '+', 12, 'hot', bold=True); f.T(356, 204, '−', 12, 'cool', bold=True)
    f.L(440, 240, 440, 60, 'ink', 1.6, me='ink'); f.L(440, 240, 700, 240, 'ink', 1.6, me='ink'); f.T(570, 270, 'load', 9.5, 'dim', 'middle')
    if kind == 'series':
        f.P('M450,70 Q500,200 690,220', 'gold', 2.6); f.T(520, 110, 'speed falls sharply with load', 10, 'gold', bold=True)
        f.P('M450,226 Q560,200 690,80', 'hot', 2.6); f.T(686, 160, 'torque', 10, 'hot', 'end', bold=True)
    else:
        f.L(450, 110, 690, 128, 'gold', 2.6); f.T(470, 100, 'speed nearly constant', 10, 'gold', bold=True)
        f.L(450, 226, 690, 150, 'hot', 2.6); f.T(690, 170, 'torque', 10, 'hot', 'end', bold=True)
    return f
EL.append(motor('07_05', 'Series-Wound DC Motor', 'series',
    '<b>Huge starting torque.</b> The field is in series with the armature, so at start the large current flows through both and the torque is very high (roughly proportional to the current squared). As speed rises the back-EMF reduces the current, the field weakens, and the motor speeds up further — so the speed varies widely with load, and with <b>no load</b> it can <b>run away</b> to destructive speed. Series motors are therefore used where they are always loaded and high starting torque is needed: <b>engine starters</b>, landing-gear and flap actuators, and they are never run off-load.'))
EL.append(motor('07_06', 'Shunt-Wound DC Motor', 'shunt',
    '<b>Steady speed.</b> The field is connected in parallel (shunt) with the armature, so it has the full supply voltage across it and a constant field strength regardless of load. The motor therefore runs at a nearly <b>constant speed</b> from no load to full load, but its starting torque is modest. Shunt motors are used for loads that need a steady speed — fans, pumps and some instrument drives. A compound motor combines series and shunt fields for good starting torque with limited speed variation.'))

f = E('07_07', 'Starter-Generator', 760, 300, 'One machine connected as a series motor for starting, then switched to act as a shunt-wound generator once the engine runs',
    '<b>One machine, two jobs.</b> Many turboprop and small turbine engines use a <b>starter-generator</b> mounted on the accessory gearbox. For starting, it is connected as a <b>compound or series motor</b> to give high torque and turns the engine; once the engine is self-sustaining, the starter circuit drops out and the machine is switched to run as a <b>shunt-wound generator</b> supplying the bus under the control of its voltage regulator. It saves the weight of a separate starter motor and generator, at the cost of brush wear and a more complex control system.')
for i, (x0, ttl, mode) in enumerate(((60, 'START: motor mode', 'M'), (420, 'RUN: generator mode', 'G'))):
    f.T(x0 + 140, 40, ttl, 11.5, 'ink', 'middle', bold=True)
    f.box(x0, 120, 70, 50, ['engine'], c='steel', size=10); f.L(x0 + 70, 145, x0 + 110, 145, 'ink', 6)
    circ(f, x0 + 140, 145, 30, mode, 'gold' if mode == 'M' else 'green', 'g3', 14)
    f.L(x0 + 110 if mode == 'M' else x0 + 70, 200, x0 + 70 if mode == 'M' else x0 + 110, 200, 'gold' if mode == 'M' else 'green', 2.4, me='gold' if mode == 'M' else 'green')
    f.T(x0 + 90, 222, 'drives the engine' if mode == 'M' else 'driven by the engine', 9.5, 'dim', 'middle')
    f.box(x0 + 190, 120, 110, 50, (['battery / GPU', 'supplies it'] if mode == 'M' else ['supplies', 'the bus']), c='gold' if mode == 'M' else 'green', size=10)
    f.L(x0 + 190, 145, x0 + 172, 145, 'ink', 2, me='ink') if mode == 'M' else f.L(x0 + 172, 145, x0 + 190, 145, 'ink', 2, me='ink')
f.L(380, 30, 380, 260, 'line', 1, dash='3 5')
f.T(380, 286, 'Series/compound motor for starting torque; shunt generator with a regulator once running.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('07_08', 'Reversible Split-Field Actuator Motor', 760, 320, 'A series motor with two field windings, one for each direction, selected by a switch, with limit switches and a brake coil',
    '<b>Running an actuator both ways.</b> A <b>split-field series motor</b> has <b>two field windings</b> wound in opposite senses. Selecting OPEN energises one field and the motor turns one way; selecting SHUT energises the other and it turns the other way. A <b>limit switch</b> in each field circuit opens when the actuator reaches the end of its travel, stopping the motor and preparing the opposite circuit. An electromagnetic <b>brake</b>, released while the motor is powered, locks the output the moment power is removed so the actuator does not overrun or creep.')
f.R(320, 40, 120, 20, c='ink', sw=1.6, fill='steel', rx=3); f.T(380, 55, '28 V DC BUS', 10, 'white', 'middle', bold=True, check=False)
wire(f, [(380, 60), (380, 100)]); f.Ci(380, 100, 3, 'ink', 1.4, 'bg'); f.L(380, 100, 330, 134, 'ink', 2.2)
f.Ci(320, 140, 3, 'ink', 1.4, 'bg'); f.Ci(440, 140, 3, 'ink', 1.4, 'bg'); f.T(310, 132, 'OPEN', 10, 'green', 'end', bold=True); f.T(450, 132, 'SHUT', 10, 'hot', bold=True); f.T(390, 92, 'control switch', 9.5, 'dim')
wire(f, [(320, 143), (320, 160), (200, 160)]); switchH(f, 160, 200, 160, True); wire(f, [(160, 160), (120, 160), (120, 190)]); coilV(f, 120, 190, 240, 'green', 4); f.T(100, 220, 'OPEN field', 9.5, 'green', 'end')
wire(f, [(440, 143), (440, 160), (560, 160)]); switchH(f, 560, 600, 160, True); wire(f, [(600, 160), (640, 160), (640, 190)]); coilV(f, 640, 190, 240, 'hot', 4); f.T(660, 220, 'SHUT field', 9.5, 'hot')
f.T(180, 146, 'limit switch', 9.5, 'dim', 'middle'); f.T(580, 146, 'limit switch', 9.5, 'dim', 'middle')
wire(f, [(120, 240), (120, 270), (340, 270)]); wire(f, [(640, 240), (640, 270), (420, 270)]); circ(f, 380, 270, 30, 'M', 'ink', 'g3', 14)
coilH(f, 420, 480, 214, 'gold', 4); f.T(450, 200, 'brake coil', 9.5, 'gold', 'middle')
f.T(380, 314, 'Limit switches stop the motor at each end of travel; the brake locks it when power is removed.', 10, 'ink', 'middle', bold=True)
EL.append(f)

f = E('07_09', 'Rotary Electric Actuator', 760, 300, 'A motor driving through a clutch and reduction gearbox to an output shaft, with a brake, limit switches and a position indicator',
    '<b>Turning a valve or flap.</b> A small high-speed <b>reversible motor</b> drives through a <b>reduction gearbox</b> to an output shaft that turns through a limited angle — for example to open or shut a fuel or bleed valve. A <b>clutch</b> (often a friction or magnetic clutch) protects the motor if the output jams. <b>Limit switches</b>, operated by cams on the output shaft, cut the motor at each end of travel, and an electromagnetic <b>brake</b> holds the shaft when the motor stops. A position switch drives a cockpit indicator such as a <b>doll’s eye</b> or flow-bar.')
w = 108
for i, (ttl, c_) in enumerate(((['MOTOR'], 'ink'), (['BRAKE'], 'gold'), (['CLUTCH'], 'cool'), (['REDUCTION', 'GEARBOX'], 'warm'), (['OUTPUT', 'SHAFT'], 'green'))):
    x = 30 + i * (w + 34); f.box(x, 120, w, 60, ttl, c=c_, size=10.5, bold_first=False, sub='ink')
    if i < 4: f.L(x + w, 150, x + w + 34, 150, 'ink', 4)
f.box(474, 220, 150, 40, ['limit switches (cams)'], c='hot', size=10); f.L(549, 220, 549, 182, 'hot', 1.6, me='hot', ms='hot')
f.box(474, 40, 150, 40, ["position indicator"], c='green', size=10); f.L(668, 120, 600, 82, 'green', 1.6, me='green')
f.T(380, 290, 'High-speed motor, low-speed high-torque output; limits stop it, the brake holds it.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('07_10', 'Linear (Screw-Jack) Actuator', 760, 300, 'A motor turning a screw shaft through gearing so that a nut and ram extend or retract, with limit switches at each end',
    '<b>Turning rotation into a push or pull.</b> A reversible motor drives, through reduction gears, a threaded <b>screw shaft</b>. A <b>nut</b> on the screw is prevented from turning, so as the screw rotates the nut — and the <b>ram</b> fixed to it — moves along: in or out, depending on the direction of rotation. Linear actuators move trim tabs, flaps on light aircraft, and cowl flaps. <b>Limit switches</b> stop the motor at full extension and retraction, a brake prevents creep, and the screw is often self-locking so loads cannot back-drive it.')
f.box(40, 110, 110, 70, ['MOTOR'], c='ink', size=11); f.box(160, 110, 90, 70, ['gears'], c='warm', size=10)
f.R(250, 136, 360, 18, c='ink', sw=1.4, fill='steel', rx=2)
for x in range(256, 606, 10): f.L(x, 136, x + 6, 154, 'ink', 1)
f.R(400, 120, 50, 50, c='ink', sw=1.6, fill='gold', rx=4, op=0.85); f.T(425, 112, 'nut', 10, 'gold', 'middle', bold=True)
f.R(450, 128, 220, 34, c='ink', sw=1.6, fill='g3', rx=4); f.T(560, 150, 'RAM', 11, 'ink', 'middle', bold=True)
f.L(560, 200, 720, 200, 'green', 2.4, me='green', ms='green'); f.T(640, 222, 'extends / retracts', 10, 'green', 'middle', bold=True)
circle_arrows(f, 300, 145, 30, True, 'gold', 2); f.T(300, 196, 'screw rotates', 10, 'gold', 'middle')
f.R(258, 230, 30, 20, c='hot', sw=1.4, fill='g2', rx=2); f.R(600, 230, 30, 20, c='hot', sw=1.4, fill='g2', rx=2); f.T(444, 246, 'limit switches at each end of travel', 10, 'hot', 'middle')
EL.append(f)

f = E('07_11', "Magnetic Position Indicators — Doll's Eye & Flow-Bar", 760, 300, "A doll's eye indicator showing a line in line with a pipe when a valve is open and across it when shut, and a magnetic barber's-pole indicator",
    '<b>Simple electrical position repeaters.</b> A <b>doll’s eye</b> (magnetic) indicator has a small rotating disc marked with a bar, turned by an electromagnet: when a valve is <b>open</b> the bar lines up with the flow line printed on the panel; when <b>shut</b> it lies across it; in transit, or with no power, it shows a third position (often cross-hatched). A <b>magnetic indicator</b> (“barber’s pole” or prism type) shows a striped or coloured face when a component is in transit or a system is unpowered. Because they need power to move, they show the last commanded state, not a measured position — check that power is available.')
for i, (ttl, ang, c_) in enumerate((('OPEN: in line with flow', 0, 'green'), ('SHUT: across the flow', 90, 'hot'), ('IN TRANSIT / no power', None, 'gold'))):
    cx = 120 + i * 200
    f.L(cx - 80, 130, cx - 34, 130, 'cool', 6); f.L(cx + 34, 130, cx + 80, 130, 'cool', 6)
    f.Ci(cx, 130, 30, 'ink', 2.2, 'black')
    if ang is not None:
        p, q = pol(cx, 130, 24, 90 + ang), pol(cx, 130, 24, 270 + ang); f.L(p[0], p[1], q[0], q[1], c_, 7, cap='round')
    else:
        for k in range(-3, 4): f.L(cx - 20 + k * 6, 110, cx - 20 + k * 6 + 22, 150, 'gold', 2)
    f.T(cx, 196, ttl, 10, c_, 'middle', bold=True)
f.R(640, 90, 60, 80, c='ink', sw=2, fill='black', rx=4)
for k in range(5): f.L(646, 98 + k * 16, 694, 110 + k * 16, 'white', 4)
f.T(670, 196, 'barber’s pole', 10, 'ink', 'middle', bold=True)
f.T(380, 266, 'Doll’s eye and magnetic indicators show the commanded state and need power to move.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('08_01', 'Generator → Bus-Bar → Parallel Loads (Two-Wire)', 760, 300, 'A generator feeding a bus-bar with four loads connected in parallel, each with its own return wire',
    '<b>Every load in parallel across the bus.</b> The generator feeds a <b>bus-bar</b> — a heavy conductor that distributes power — and each load is connected between the bus and the return, in parallel, so every load gets the full system voltage and each can be switched or fail without affecting the others. In this <b>two-wire (dipole)</b> system each load has its own return wire back to the negative side. It is used where the structure is non-conducting (composite airframes) or where currents must be kept separate to avoid interference, but it doubles the amount of cable.')
f.R(230, 40, 360, 26, c='ink', sw=1.6, fill='steel', rx=3); f.T(410, 58, 'BUS-BAR', 11, 'white', 'middle', bold=True, check=False)
circ(f, 120, 170, 34, 'G', 'ink', 'g3', 16); f.T(80, 128, '+', 14, 'hot', bold=True); f.T(80, 228, '−', 14, 'cool', bold=True)
wire(f, [(120, 136), (120, 53), (230, 53)]); wire(f, [(120, 204), (120, 260), (650, 260)])
for k in range(4): x = 290 + k * 90; wire(f, [(x, 66), (x, 120)]); f.R(x - 18, 120, 36, 90, c='hot', sw=1.6, fill='g2', rx=2); f.T(x, 170, 'LOAD', 9, 'hot', 'middle', bold=True, rot=-90); wire(f, [(x, 210), (x, 260)])
f.T(470, 286, 'separate return wire for every load (two-wire system)', 10, 'cool', 'middle', bold=True)
EL.append(f)

f = E('08_02', 'Earth-Return (Single-Pole) Distribution', 760, 300, 'A generator feeding a bus-bar with four loads, each returning its current through the metal airframe to earth',
    '<b>The airframe carries the return current.</b> In an <b>earth-return (single-pole)</b> system each load is fed by a single wire from the bus, and its other side is connected — <b>bonded</b> — to the metal airframe, which serves as the return conductor back to the generator and battery negative. This roughly halves the weight of cable, which is why it is standard in metal aircraft. Good <b>bonding</b> of every part is essential, both for the return path and to prevent static build-up, sparks and radio interference. Composite aircraft must provide a return network instead.')
f.R(230, 40, 360, 26, c='ink', sw=1.6, fill='steel', rx=3); f.T(410, 58, 'BUS-BAR', 11, 'white', 'middle', bold=True, check=False)
circ(f, 120, 160, 34, 'G', 'ink', 'g3', 16); wire(f, [(120, 126), (120, 53), (230, 53)]); wire(f, [(120, 194), (120, 220)]); ground(f, 120, 220)
for k in range(4): x = 290 + k * 90; wire(f, [(x, 66), (x, 120)]); f.R(x - 18, 120, 36, 80, c='hot', sw=1.6, fill='g2', rx=2); f.T(x, 166, 'LOAD', 9, 'hot', 'middle', bold=True, rot=-90); wire(f, [(x, 200), (x, 220)]); ground(f, x, 220)
f.R(60, 248, 640, 12, c='none', sw=0, fill='steel', rx=4, op=0.6); f.T(380, 284, 'the metal airframe is the return path (earth)', 10, 'cool', 'middle', bold=True)
EL.append(f)

f = E('08_03', 'Reverse-Current Cut-Out', 760, 320, 'A relay between the generator and the bus with a voltage coil closing the contacts and a current coil opening them if current flows back into the generator',
    '<b>Stopping the battery motoring the generator.</b> When generator voltage is below battery voltage — at low engine speed or on shutdown — current would flow <b>backwards</b> from the battery into the generator, discharging the battery and trying to drive the generator as a motor. The <b>reverse-current cut-out</b> prevents this. A <b>voltage (shunt) coil</b> closes the contacts once the generator voltage exceeds the battery’s; the load current then flows through a <b>current (series) coil</b> that helps hold them closed. If the current <b>reverses</b>, the series coil’s field opposes the shunt coil’s, the contacts spring <b>open</b>, and the generator is disconnected from the bus.')
circ(f, 90, 170, 32, 'G', 'ink', 'g3', 14); wire(f, [(90, 138), (90, 80), (260, 80)])
f.R(260, 60, 220, 180, c='ink', sw=1.6, fill='g2', rx=8); f.T(370, 258, 'REVERSE-CURRENT CUT-OUT', 10.5, 'ink', 'middle', bold=True)
coilH(f, 290, 400, 80, 'gold', 6); f.T(345, 106, 'current (series) coil', 9.5, 'gold', 'middle')
coilV(f, 300, 130, 210, 'cool', 5); f.T(318, 176, 'voltage (shunt) coil', 9.5, 'cool')
f.L(400, 80, 430, 80, 'ink', 1.8); switchH(f, 430, 470, 80, True); wire(f, [(470, 80), (560, 80)])
f.R(560, 66, 160, 28, c='ink', sw=1.6, fill='steel', rx=3); f.T(640, 85, 'BUS (+ battery)', 10, 'white', 'middle', bold=True, check=False)
f.T(450, 60, 'contacts', 9.5, 'dim', 'middle')
note(f, 520, 140, ['Generator volts > battery:', 'contacts CLOSE.'], first='green')
note(f, 520, 200, ['Current flows backwards:', 'coils oppose, contacts OPEN.'], first='hot')
f.T(380, 306, 'Prevents the battery discharging into the generator at low rpm or shutdown.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('08_04', 'Moving-Coil Meter Movement', 760, 300, 'A coil pivoted between the curved poles of a permanent magnet with a soft-iron core, hairsprings and a pointer over a scale',
    '<b>The basis of most analogue electrical meters.</b> A light <b>coil</b> on a pivot sits in the gap between the curved pole pieces of a <b>permanent magnet</b>, around a fixed soft-iron <b>core</b> that makes the field <b>radial</b> and uniform. Current through the coil produces a torque (motor principle) that turns it against two <b>hairsprings</b>, which also carry the current in and out. The deflection is proportional to the current, so the <b>scale is linear</b>. It responds only to DC; with a series resistor (multiplier) it becomes a voltmeter, and with a shunt it measures large currents.')
cx, cy = 240, 170
f.P(f'M{cx-110},{cy-80} L{cx-60},{cy-80} A70,70 0 0 0 {cx-60},{cy+80} L{cx-110},{cy+80} Z', 'ink', 1.6, 'hot'); f.T(cx - 92, cy + 4, 'N', 16, 'white', 'middle', bold=True, check=False)
f.P(f'M{cx+110},{cy-80} L{cx+60},{cy-80} A70,70 0 0 1 {cx+60},{cy+80} L{cx+110},{cy+80} Z', 'ink', 1.6, 'cool'); f.T(cx + 92, cy + 4, 'S', 16, 'white', 'middle', bold=True, check=False)
f.Ci(cx, cy, 34, 'ink', 1.6, 'steel'); f.T(cx, cy + 4, 'core', 9, 'ink', 'middle', check=False)
f.R(cx - 54, cy - 46, 108, 92, c='warm', sw=3, fill='none', rx=6)
f.L(cx, cy, cx + 30, cy - 150, 'white', 2.4); f.P(f'M{cx-120},{cy-150} A170,170 0 0 1 {cx+120},{cy-150}', 'ink', 1.4)
f.T(cx + 150, cy - 100, 'pointer over a linear scale', 10, 'ink', bold=True)
f.P(f'M{cx-10},{cy+52} q-6,6 0,12 q6,6 0,12 q-6,6 0,12', 'gold', 1.6); f.T(cx + 10, cy + 84, 'hairspring', 9.5, 'gold')
f.T(cx + 150, cy - 30, 'moving coil', 10, 'warm', bold=True); f.L(cx + 146, cy - 34, cx + 54, cy - 30, 'dim', 1)
note(f, 470, 150, ['Radial field from the', 'curved poles and core:', 'deflection proportional', 'to current; linear scale.'], first='ink')
note(f, 470, 240, ['DC only. Add a series', 'multiplier for a voltmeter,', 'a shunt for large currents.'], first='gold')
EL.append(f)

f = E('08_05', 'Left-Zero vs Centre-Zero Ammeter', 760, 300, 'Two ammeter dials: a left zero meter reading generator load, and a centre zero meter showing battery charge or discharge',
    '<b>Two ways of showing current.</b> A <b>left-zero</b> ammeter (loadmeter) reads from zero upwards and is fitted in the <b>generator</b> lead to show how much current — or what fraction of rated load — the generator is supplying. A <b>centre-zero</b> ammeter is fitted in the <b>battery</b> lead: a needle to the right (+) shows the battery is <b>charging</b>; to the left (−) shows it is <b>discharging</b>, meaning the generator is not carrying the load. A steady discharge reading in flight is a generator failure warning.')
for i, (cx, ttl, sub, mid) in enumerate(((200, 'LEFT-ZERO (loadmeter)', 'in the generator lead', False), (560, 'CENTRE-ZERO', 'in the battery lead', True))):
    cy = 170; f.Ci(cx, cy, 100, 'ink', 2.2, 'black')
    for k in range(11):
        a = -60 + k * 12; p, q = pol(cx, cy, 80, a), pol(cx, cy, 92, a); f.L(p[0], p[1], q[0], q[1], 'white', 1.6 if k % 5 == 0 else 1)
    labs = (('0', -60), ('50', 0), ('100', 60)) if not mid else (('−', -60), ('0', 0), ('+', 60))
    for t, a in labs: x, y = pol(cx, cy, 66, a); f.T(x, y + 5, t, 13, 'white', 'middle', bold=True, check=False)
    t = pol(cx, cy, 80, -20 if not mid else 24); f.L(cx, cy, t[0], t[1], 'gold', 3, cap='round'); f.Ci(cx, cy, 6, 'ink', 1, 'steel')
    f.T(cx, 40, ttl, 11, 'ink', 'middle', bold=True); f.T(cx, 290, sub, 10, 'dim', 'middle')
f.T(640, 230, 'charging', 9.5, 'green', bold=True); f.T(480, 230, 'discharging', 9.5, 'hot', 'end', bold=True)
EL.append(f)

f = E('08_07', 'Aircraft Battery Installation', 760, 300, 'A battery in a sealed container with a vent tube inlet and overboard outlet, a quick-disconnect plug and a sump jar',
    '<b>Containing the hazards.</b> The aircraft battery sits in a box or compartment that is <b>vented</b>: air enters through one tube and leaves overboard through another, carrying away the <b>hydrogen</b> given off during charging (explosive in air) and any acid or alkali fumes. On lead-acid installations the outlet often passes through a <b>sump jar</b> of neutralising agent. A <b>quick-disconnect</b> plug allows fast removal without loose terminals. The battery must be secured against crash loads, and on Ni-Cd installations a <b>temperature sensor</b> warns of thermal runaway.')
f.R(200, 90, 300, 150, c='ink', sw=2.2, fill='g3', rx=6); f.T(350, 170, 'BATTERY', 14, 'ink', 'middle', bold=True)
for k in range(6): f.R(220 + k * 46, 104, 36, 20, c='ink', sw=1, fill='steel', rx=3)
f.L(200, 120, 90, 120, 'cool', 6); f.L(90, 120, 90, 60, 'cool', 6); f.L(100, 80, 140, 80, 'cool', 2, me='cool') if False else None
f.T(90, 50, 'air in', 10, 'cool', 'middle', bold=True); f.L(76, 70, 76, 100, 'cool', 2, me='cool')
f.L(500, 120, 620, 120, 'gold', 6); f.R(620, 100, 50, 60, c='gold', sw=1.6, fill='g2', rx=4); f.T(645, 178, 'sump jar', 10, 'gold', 'middle', bold=True)
f.L(670, 130, 720, 130, 'gold', 6); f.L(706, 112, 740, 112, 'gold', 2, me='gold'); f.T(720, 100, 'overboard', 9.5, 'gold', 'middle')
f.R(320, 240, 60, 30, c='ink', sw=1.6, fill='steel', rx=4); f.T(390, 260, 'quick-disconnect plug', 10, 'ink', bold=True)
f.Ci(470, 220, 8, 'hot', 1.4, 'hot'); f.T(512, 224, 'temperature sensor (Ni-Cd)', 9.5, 'hot'); f.L(480, 220, 508, 220, 'hot', 1)
f.T(380, 294, 'Venting removes hydrogen (explosive) and corrosive fumes.', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

f = E('08_08', 'Light-Aircraft DC System', 760, 340, 'A complete single-engine DC system with battery, master contactor, alternator, regulator, starter and bus-bar with circuit breakers',
    '<b>Putting it together.</b> The <b>battery</b> is connected to the bus through the <b>battery master contactor</b>, a solenoid operated by the master switch. The <b>starter</b> is fed straight from the battery side through its own heavy contactor, operated by the ignition key. The <b>alternator</b> charges the bus through its output circuit breaker; its field is supplied, via the alternator side of the master switch, through the <b>voltage regulator</b>, with an <b>over-voltage relay</b> to trip the field if the regulator fails. Loads are fed from the bus through <b>circuit breakers</b>, and the <b>ammeter</b> shows battery charge/discharge.')
battV(f, 80, 180, label='BATT', cells=2); wire(f, [(80, 166), (80, 90), (140, 90)]); wire(f, [(80, 194), (80, 270)]); ground(f, 80, 270)
f.box(140, 66, 110, 48, ['master', 'contactor'], c='gold', size=10); wire(f, [(250, 90), (300, 90)])
f.R(300, 70, 300, 40, c='ink', sw=1.6, fill='steel', rx=3); f.T(450, 95, 'BUS-BAR', 11, 'white', 'middle', bold=True, check=False)
wire(f, [(110, 90), (110, 160), (150, 160)]); f.box(150, 140, 100, 40, ['starter', 'contactor'], c='hot', size=10); wire(f, [(250, 160), (290, 160)]); circ(f, 310, 160, 20, 'M', 'hot', 'g3', 12); f.T(310, 196, 'starter', 9.5, 'hot', 'middle')
circ(f, 640, 210, 30, 'ALT', 'green', 'g3', 11); wire(f, [(640, 180), (640, 90), (600, 90)]); f.T(660, 140, 'alternator', 9.5, 'green')
f.box(500, 250, 120, 40, ['voltage regulator'], c='cool', size=10); wire(f, [(620, 270), (640, 270), (640, 240)])
for k in range(4): x = 340 + k * 60; f.R(x - 8, 110, 16, 14, c='ink', sw=1, fill='g3', rx=2); wire(f, [(x, 124), (x, 200)]); lamp(f, x, 214, 10)
f.T(430, 250, 'loads via circuit breakers', 9.5, 'dim', 'middle')
f.Ci(275, 90, 12, 'ink', 1.6, 'g3'); f.T(275, 94, 'A', 9, 'ink', 'middle', bold=True, check=False); f.T(275, 60, 'ammeter', 9.5, 'dim', 'middle')
f.T(380, 324, 'Master switch → battery contactor; key → starter contactor; alternator field via the regulator.', 10, 'ink', 'middle', bold=True)
EL.append(f)

f = E('08_09', 'Single-Alternator System — Split Master Switch', 760, 300, 'The split master switch with BAT and ALT halves, the alternator field fed through the ALT side and the regulator, and an over-voltage protector',
    '<b>Why the master switch is split.</b> On most light aircraft the master is a <b>split rocker</b>: the <b>BAT</b> half operates the battery contactor; the <b>ALT</b> half supplies the alternator <b>field</b> through the voltage regulator. ALT can be switched off on its own — to isolate a faulty alternator or a runaway over-voltage — but it cannot be switched on without BAT, because an alternator needs battery power to excite its field. An <b>over-voltage protector</b> opens the field circuit automatically if the bus voltage rises too high, and a low-voltage light warns the pilot.')
f.R(60, 80, 140, 120, c='ink', sw=2, fill='black', rx=8); f.R(70, 90, 56, 100, c='hot', sw=1.4, fill='g3', rx=4); f.R(134, 90, 56, 100, c='green', sw=1.4, fill='g3', rx=4)
f.T(98, 146, 'BAT', 12, 'hot', 'middle', bold=True, check=False); f.T(162, 146, 'ALT', 12, 'green', 'middle', bold=True, check=False); f.T(130, 222, 'split master switch', 10, 'ink', 'middle', bold=True)
f.box(270, 60, 140, 44, ['battery contactor'], c='hot', size=10); f.L(126, 110, 270, 82, 'hot', 1.6, me='hot')
f.box(270, 150, 140, 44, ['over-voltage', 'protector'], c='gold', size=10); f.L(190, 160, 270, 170, 'green', 1.6, me='green')
f.box(450, 150, 120, 44, ['voltage', 'regulator'], c='cool', size=10); f.L(410, 172, 450, 172, 'green', 1.6, me='green')
circ(f, 650, 172, 32, 'ALT', 'green', 'g3', 11); f.L(570, 172, 618, 172, 'green', 1.6, me='green'); f.T(650, 220, 'field', 9.5, 'green', 'middle')
f.T(380, 262, 'ALT can be switched off alone; it cannot be on without BAT (the field needs battery power).', 10.5, 'ink', 'middle', bold=True)
EL.append(f)

if __name__ == '__main__':
    gallery(EL, 'Electrics Gallery 2', 'Electrics — Generation, Motors & Distribution', 'Original figures for electromagnetic induction, DC generators and regulators, DC motors and actuators, and DC distribution.', 'el2-gallery.html')
    print(f'EL2 {len(EL)}  QA warnings: {len(WARN)}')
    for w in WARN: print('  ⚠', w)
