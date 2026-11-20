#!/usr/bin/env python3
"""Airframes part 5 (chapters 13-16): oxygen, smoke and fire detection/protection, fuel systems."""
import math
from af_common import *

AFS = []
def chain(f, N, keys, c='dim'):
    for a, b in zip(keys, keys[1:]): conn(f, N, a, b, c)
def lamp(f, x, y, w, h, t, c='hot', on=True, size=10):
    f.R(x, y, w, h, c=c, sw=1.6, fill=c if on else 'black', rx=4, op=0.9 if on else None)
    f.T(x + w / 2, y + h / 2 + size * 0.36, t, size, 'white' if on else c, 'middle', bold=True, check=False)

f = AF('13_06', 'Chemical Oxygen Generator', 760, 320, 'Section of a chemical oxygen generator: sodium chlorate core, insulation, filters, firing mechanism and outlets to the passenger masks',
       'Pulling a mask down fires the generator: a percussion cap ignites the sodium chlorate core, which decomposes to release oxygen for about 15 minutes. The flow cannot be stopped once started. The casing gets very hot, so it is insulated; filters remove impurities and a relief valve protects against over-pressure.')
f.R(140, 90, 440, 140, c='ink', sw=2, fill='g2', rx=40); f.R(160, 108, 400, 104, c='none', sw=0, fill='gold', rx=30, op=0.6); f.R(190, 124, 340, 72, c='ink', sw=1.4, fill='hot', rx=24)
f.T(360, 164, 'sodium chlorate core', 11, 'white', 'middle', bold=True, check=False)
f.R(580, 140, 50, 40, c='ink', sw=1.4, fill='steel', rx=4); f.T(605, 206, 'firing mechanism', 10.5, 'ink', 'middle', bold=True)
f.R(100, 130, 40, 60, c='ink', sw=1.4, fill='steel', rx=4)
for k in range(3): f.L(110 + k * 10, 130, 110 + k * 10, 70, 'cool', 3)
f.T(120, 60, 'oxygen outlets to masks', 10.5, 'cool', 'middle', bold=True)
f.T(360, 80, 'insulation', 10.5, 'gold', 'middle', bold=True); f.T(360, 260, 'filters at both ends, relief valve, thermal insulation', 10.5, 'dim', 'middle')
f.T(380, 300, 'once fired it cannot be stopped (≈ 15 min)', 10.5, 'hot', 'middle', bold=True)
AFS.append(f)

f = AF('13_09', 'Crew Portable Oxygen', 760, 320, 'Portable oxygen cylinder with on-off valve, pressure gauge, regulator and a full-face mask',
       'Portable oxygen sets — a small cylinder with on/off valve, contents gauge and a demand or continuous-flow regulator with mask — are used for first aid and by crew moving about the cabin after depressurisation. Smoke hoods / full-face masks protect against smoke and fumes.')
f.raw('<g transform="rotate(-30 260 200)"><rect x="140" y="170" width="250" height="60" rx="30" fill="var(--green)" stroke="var(--chart-ink)" stroke-width="2"/></g>')
f.T(250, 214, 'OXYGEN', 12, 'black', 'middle', bold=True, check=False)
f.R(360, 70, 24, 24, c='ink', sw=1.4, fill='gold', rx=4); gauge(f, 420, 60, 16); f.R(450, 70, 50, 30, c='ink', sw=1.4, fill='g3', rx=4)
f.P('M500,86 Q600,90 600,180', 'ink', 3); f.El(600, 220, 50, 60, 'ink', 2, 'g3'); f.El(600, 210, 30, 26, 'cool', 1.6, 'sky')
f.T(352, 86, 'on/off valve', 10, 'gold', 'end', bold=True); f.T(420, 30, 'pressure gauge', 10, 'ink', 'middle', bold=True); f.T(530, 60, 'regulator', 10, 'ink', bold=True)
f.T(600, 300, 'full-face mask', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('14_01', 'Location of Smoke and Fire Detectors', 760, 360, 'Plan view of an airliner showing smoke detectors in the cargo holds, avionics bay and toilets, and fire detectors in the engines and APU',
       'Smoke detectors are fitted in the cargo compartments, the avionics (electrical/electronic) bay and the toilets (lavatories). Fire (overheat) detectors are fitted in the engine nacelles, the APU compartment, main gear bays (wheel well) and along bleed-air ducts.')
f.raw('<g transform="translate(380 180) scale(2.5)"><path d="M0,-60 C5,-56 6,-48 6,-40 L6,-8 L58,14 L58,22 L6,10 L5,38 L22,50 L22,56 L0,52 L-22,56 L-22,50 L-5,38 L-6,10 L-58,22 L-58,14 L-6,-8 L-6,-40 C-6,-48 -5,-56 0,-60 Z" fill="#c4d1d6" fill-opacity="0.35" stroke="#dfeef2" stroke-width="0.6"/></g>')
pts = (((380, 60), 'Avionics bay smoke', 'cool'), ((380, 100), 'Forward cargo smoke', 'cool'), ((380, 230), 'Aft cargo smoke', 'cool'), ((392, 270), 'Toilet smoke', 'cool'),
       ((300, 220), 'Engine fire detectors', 'hot'), ((380, 310), 'APU fire detector', 'hot'), ((410, 190), 'Wheel well overheat', 'hot'))
for i, ((x, y), t, c_) in enumerate(sorted(pts, key=lambda p: p[0][1])):
    f.Ci(x, y, 6, c_, 1.4, c_); ty = 40 + i * 44; tx = 560
    f.L(x, y, tx + (-4 if tx > 400 else 160), ty - 4, c_, 1); f.T(tx, ty, t, 10.5, c_, bold=True)
AFS.append(f)

f = AF('14_03', 'Ionisation-Type Smoke Detector', 760, 320, 'Chamber in which a radioactive source ionises the air between two electrodes; smoke particles entering reduce the current and trigger the alarm',
       'A small radioactive source ionises the air in the chamber so a small current flows between the electrodes. Smoke particles attach to the ions and reduce the current; the drop is detected and gives the warning. A reference chamber compensates for changes in pressure and temperature.')
f.R(240, 70, 280, 180, c='ink', sw=2, fill='g2', rx=8)
f.L(270, 90, 270, 230, 'hot', 4); f.L(490, 90, 490, 230, 'cool', 4); f.T(258, 160, '−', 16, 'hot', 'end', bold=True); f.T(502, 160, '+', 16, 'cool', bold=True)
f.R(360, 70, 40, 16, c='ink', sw=1.2, fill='gold', rx=2); f.T(380, 56, 'radioactive source', 10.5, 'gold', 'middle', bold=True)
for k in range(10): f.Ci(300 + (k * 37) % 170, 110 + (k * 53) % 110, 3, 'cool', 1, 'none')
for k in range(5): f.Ci(320 + k * 32, 190, 5, 'dim', 0, 'dim')
f.L(120, 160, 236, 160, 'dim', 2.4, me='dim'); f.T(120, 150, 'air + smoke in', 10.5, 'dim', bold=True); f.L(524, 160, 640, 160, 'dim', 2.4, me='dim')
f.T(380, 290, 'smoke particles reduce the ion current → alarm', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('14_04', 'Photoelectric Smoke Detector and Indicator', 760, 320, 'Light-scatter smoke detector chamber with a light source and photocell offset from the beam, and its indicator panel with test switch',
       'In the photoelectric (light-scattering) detector, the photocell is shielded from the direct beam. Smoke entering the chamber scatters light onto the cell, which triggers the warning. The panel has SMOKE lights and a TEST switch that shines a test lamp onto the cell to check the circuit.')
f.R(80, 80, 300, 160, c='ink', sw=2, fill='g2', rx=10)
f.R(100, 150, 40, 24, c='ink', sw=1.4, fill='gold', rx=4); f.L(140, 162, 360, 162, 'gold', 2, dash='6 4'); f.T(120, 196, 'light', 10, 'gold', 'middle', bold=True)
f.R(240, 90, 30, 24, c='ink', sw=1.4, fill='cool', rx=4); f.T(276, 106, 'photocell', 10, 'cool', bold=True)
for k in range(6): f.Ci(220 + k * 12, 150 + (k % 2) * 8, 3, 'dim', 0, 'dim')
f.L(230, 158, 252, 116, 'gold', 1.4, me='gold'); f.T(230, 260, 'smoke scatters light onto the cell', 10.5, 'ink', 'middle', bold=True)
f.R(460, 80, 240, 160, c='ink', sw=2, fill='g2', rx=8)
lamp(f, 490, 110, 80, 36, 'SMOKE', 'hot'); lamp(f, 590, 110, 80, 36, 'SMOKE', 'hot', on=False)
f.Ci(580, 196, 14, 'ink', 1.6, 'black'); f.T(610, 200, 'TEST', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('14_05', 'Cargo Smoke Detection Panel', 760, 340, 'Cargo smoke panel with forward and aft SMOKE warning lights, a test button and DISCH pushbuttons for two extinguishing agents',
       'Typical cargo smoke panel: a SMOKE light for each hold, a TEST button, and DISCH pushbuttons that fire the extinguisher agent(s) into the affected hold. A second agent may be discharged later at a metered rate to keep the concentration up for the diversion.')
f.R(100, 30, 560, 290, c='ink', sw=2, fill='g2', rx=10); f.T(380, 56, 'CARGO SMOKE', 13, 'ink', 'middle', bold=True)
for x, t in ((180, 'FWD'), (580, 'AFT')): f.T(x, 86, t, 11, 'ink', 'middle', bold=True); lamp(f, x - 40, 96, 80, 40, 'SMOKE', 'hot', on=(t == 'AFT'))
f.Ci(380, 116, 20, 'ink', 1.6, 'black'); f.T(380, 86, 'TEST', 11, 'ink', 'middle', bold=True)
for x, t in ((320, 'DISCH AGENT 1'), (440, 'DISCH AGENT 2')): f.R(x - 50, 190, 100, 50, c='gold', sw=1.6, fill='black', rx=4); f.T(x, 220, t, 10, 'gold', 'middle', bold=True, check=False)
f.T(380, 290, 'agent 2 metered later to hold concentration', 10.5, 'dim', 'middle')
AFS.append(f)

f = AF('14_06', 'Toilet Smoke Detection', 760, 320, 'Lavatory smoke detector with its alarm horn and light, and the cabin crew indications: chime, flashing lights and reset',
       'A smoke detector in each toilet gives an aural alarm and a red light on the detector, a cabin chime and flashing lights at the attendant panels (and often a flight deck message). Toilet waste bins also have an automatic fire extinguisher discharging into the bin.')
f.R(80, 60, 200, 220, c='ink', sw=2, fill='g2', rx=6); f.T(180, 300, 'lavatory', 10.5, 'ink', 'middle', bold=True)
f.Ci(180, 100, 26, 'ink', 1.6, 'g3'); f.Ci(200, 86, 5, 'hot', 1, 'hot'); f.T(180, 146, 'smoke detector', 10, 'ink', 'middle', bold=True)
for k in range(3): f.P(f'M{214 + k * 10},{100 - 10 - k * 4} q8,{10 + k * 4} 0,{20 + k * 8}', 'gold', 1.4)
f.R(140, 200, 80, 60, c='ink', sw=1.4, fill='steel', rx=4); f.T(180, 234, 'waste bin', 10, 'white', 'middle', bold=True, check=False); f.T(180, 196, 'bin extinguisher below', 10, 'gold', 'middle', bold=True)
N = {}
node(f, N, 'ap', 400, 60, 300, 60, ['Attendant panel', 'flashing red light + chime'], 'hot', 10)
node(f, N, 'fd', 400, 160, 300, 50, ['Flight deck message'], 'gold', 10)
node(f, N, 're', 400, 240, 300, 50, ['RESET after smoke cleared'], 'ink', 10)
f.L(280, 100, 400, 90, 'hot', 1.6, me='hot'); f.L(280, 140, 400, 185, 'gold', 1.6, me='gold')
AFS.append(f)

f = AF('14_07', 'Smoke Hood (Protective Breathing Equipment)', 760, 340, 'A smoke hood over the head with an oral-nasal mask and chemical oxygen generator, speaking diaphragm and neck seal',
       'Protective breathing equipment (PBE) protects cabin crew fighting a fire: a heat- and flame-resistant hood with a neck seal, an oral-nasal mask and a chemical oxygen supply giving at least 15 minutes. Glasses may be worn and long hair must be clear of the neck seal. The hood deflating slightly indicates expiry.')
f.P('M280,60 Q380,20 480,60 Q520,160 480,300 L280,300 Q240,160 280,60 Z', 'ink', 2, 'steel', op=0.6)
f.El(380, 150, 56, 70, 'ink', 1.6, 'g3'); f.El(380, 190, 26, 18, 'ink', 1.6, 'gold'); f.El(380, 130, 40, 16, 'cool', 1.4, 'sky')
f.R(300, 290, 160, 16, c='ink', sw=1.4, fill='hot', rx=4)
for (x, y), t, a in (((480, 80), 'protects head from heat and flame', 'start'), ((420, 130), 'visor — glasses may be worn', 'start'), ((406, 194), 'oral-nasal mask + speech diaphragm', 'start'), ((460, 298), 'neck seal (hair clear)', 'start'), ((300, 230), 'chemical O₂ ≥ 15 min'.replace('₂', '2'), 'end')):
    tx = 540 if a == 'start' else 220; f.L(x, y, tx + (-4 if a == 'start' else 4), y, 'dim', 1); f.T(tx, y + 4, t, 10.5, 'ink', a, bold=True)
AFS.append(f)

f = AF('15_01', 'The Fire Triangle', 760, 320, 'A triangle with heat, fuel and oxygen at its corners',
       'A fire needs fuel, heat and oxygen. Removing any one puts it out: cooling removes heat, smothering or inerting removes oxygen, and shutting off the supply removes fuel. Engine fire drills do all three — fuel shut off, bleed and hydraulic valves closed, then agent discharged.')
f.P('M380,40 L640,280 L120,280 Z', 'gold', 3, 'gold', op=0.2); f.P('M380,40 L640,280 L120,280 Z', 'gold', 3)
f.T(380, 30, 'FUEL', 14, 'warm', 'middle', bold=True); f.T(110, 300, 'HEAT', 14, 'hot', 'middle', bold=True); f.T(650, 300, 'OXYGEN', 14, 'cool', 'middle', bold=True)
f.T(380, 210, 'remove any side', 12, 'ink', 'middle', bold=True); f.T(380, 230, 'and the fire goes out', 12, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('15_03', 'Continuous-Wire (Fire Wire) Detector', 760, 320, 'Section of a continuous-loop detector: a centre electrode in a steel tube packed with a material whose resistance falls (or capacitance rises) with temperature, held by clamps',
       'A continuous loop runs round the area to be protected. At high temperature the core material’s resistance falls (or its capacitance rises), so current flows between the centre electrode and the earthed tube and the control unit gives a FIRE warning. Unlike spot detectors it detects anywhere along its length and resets when cool.')
f.R(80, 140, 600, 40, c='ink', sw=2, fill='steel', rx=20); f.R(90, 148, 580, 24, c='none', sw=0, fill='gold', rx=12, op=0.8); f.L(90, 160, 670, 160, 'hot', 3)
f.Ci(170, 250, 50, 'ink', 2, 'steel'); f.Ci(170, 250, 40, 'none', 0, 'gold'); f.Ci(170, 250, 6, 'ink', 1, 'hot')
f.T(240, 230, 'steel tube (earth)', 10.5, 'ink', bold=True); f.T(240, 250, 'thermistor material (−ve temp. coeff.)', 10.5, 'gold', bold=True); f.T(240, 270, 'central electrode', 10.5, 'hot', bold=True)
for x in (220, 420, 620): f.R(x - 12, 128, 24, 64, c='cool', sw=1.6, fill='none', rx=4)
f.T(420, 110, 'support clamps with grommets', 10.5, 'cool', 'middle', bold=True)
AFS.append(f)

f = AF('15_04', 'Gas-Filled (Pneumatic) Fire Detector', 760, 340, 'Sealed sensor tube containing averaging gas and a hydride core connected to a responder with an alarm switch and an integrity switch',
       'The tube contains helium (averaging gas, which expands with the overall temperature of the loop to give an overheat warning) and a hydride core that releases large amounts of hydrogen when heated locally by a fire. Either raises the pressure and closes the alarm switch in the responder. An integrity switch warns if the tube loses its gas.')
f.R(80, 140, 400, 30, c='ink', sw=2, fill='steel', rx=15); f.R(90, 148, 380, 14, c='none', sw=0, fill='cool', rx=7, op=0.6); f.L(100, 155, 460, 155, 'hot', 3)
f.R(480, 110, 140, 90, c='ink', sw=2, fill='g2', rx=6); f.T(550, 100, 'responder', 10.5, 'ink', 'middle', bold=True)
f.P('M500,170 L530,150 L560,170 L590,150', 'gold', 2); f.T(550, 190, 'diaphragm switches', 9.5, 'dim', 'middle')
f.T(100, 110, 'averaging gas (helium): overall overheat', 10.5, 'cool', bold=True); f.T(100, 210, 'hydride core: releases H₂ at a local fire'.replace('₂', '2'), 10.5, 'hot', bold=True)
f.T(640, 140, 'alarm switch', 10.5, 'hot', bold=True); f.T(640, 176, 'integrity switch', 10.5, 'gold', bold=True)
f.T(380, 290, 'loss of gas opens the integrity switch → fault warning', 10.5, 'dim', 'middle')
AFS.append(f)

f = AF('15_05', 'Fire Detection Loops — AND / OR Logic', 760, 360, 'Engine nacelle with two detection loops A and B feeding a fire detection unit with AND logic to the cockpit warning',
       'Two independent detection loops (A and B) run through each fire zone. Normally AND logic is used: both loops must detect fire before the warning is given, preventing false warnings. If one loop is found faulty, the system switches to OR logic on the remaining loop.')
f.P('M60,120 L360,100 L400,160 L360,220 L60,200 Z', 'ink', 2, '#c4d1d6', op=0.5); f.T(200, 240, 'engine nacelle', 10.5, 'ink', 'middle', bold=True)
f.P('M80,130 L340,116', 'hot', 4); f.P('M80,190 L340,204', 'gold', 4)
f.T(76, 116, 'loop A', 10.5, 'hot', bold=True); f.T(76, 222, 'loop B', 10.5, 'gold', bold=True)
f.P('M420,130 L480,130 L480,150', 'hot', 2); f.P('M420,200 L480,200 L480,180', 'gold', 2)
f.P('M470,150 L520,150 Q560,165 520,180 L470,180 Z', 'ink', 2, 'g3'); f.T(510, 170, 'AND', 10, 'ink', 'middle', bold=True)
f.L(545, 165, 620, 165, 'ink', 2, me='ink'); lamp(f, 620, 145, 110, 40, 'ENG FIRE', 'hot', size=10)
f.T(470, 240, 'fire detection unit', 10.5, 'ink', 'middle', bold=True)
f.T(60, 300, 'AND logic: both loops must detect fire (normal)', 10.5, 'ink', bold=True); f.T(60, 320, 'OR logic: either loop, used when one loop is inoperative', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('15_06', 'Fire Warning Indications', 760, 300, 'Overhead fire panel with illuminated fire handles, glareshield master warning lights and the ENG FIRE lights on the pedestal',
       'A fire warning gives a continuous repetitive chime (or bell), the red MASTER WARNING lights, the illuminated fire handle/pushbutton for that engine or APU, the FIRE light by the engine master switch and an ECAM/EICAS message.')
for i, (x, t) in enumerate(((100, 'ENG 1'), (330, 'APU'), (560, 'ENG 2'))):
    f.R(x, 40, 120, 70, c='ink', sw=1.8, fill='g2', rx=6); lamp(f, x + 15, 58, 90, 34, 'FIRE', 'hot'); f.T(x + 60, 128, t + ' fire handle', 10, 'ink', 'middle', bold=True)
lamp(f, 140, 180, 140, 40, 'MASTER WARN', 'hot', size=10); lamp(f, 480, 180, 140, 40, 'MASTER WARN', 'hot', size=10)
f.T(380, 204, 'glareshield', 10.5, 'dim', 'middle'); f.T(380, 270, '+ continuous repetitive chime + ECAM / EICAS message', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

f = AF('15_07', 'Overhead Engine Fire Panel', 760, 360, 'Engine fire pushbutton (handle) lit FIRE with PUSH guard, agent 1 and agent 2 discharge pushbuttons with SQUIB and DISCH lights, and a TEST button',
       'Pushing the guarded ENG FIRE pushbutton silences the aural warning and arms the extinguisher squibs while closing the fuel (LP) valve, hydraulic fire-shut-off valve, bleed and pack valves and de-energising the generator. AGENT 1 and 2 pushbuttons then fire the bottles: SQUIB shows armed, DISCH shows the bottle has discharged.')
f.R(100, 30, 560, 300, c='ink', sw=2, fill='g2', rx=10); f.T(380, 66, 'ENG 1', 16, 'ink', 'middle', bold=True)
f.R(240, 110, 280, 120, c='hot', sw=2, fill='black', rx=8); f.T(380, 170, 'FIRE', 22, 'hot', 'middle', bold=True, check=False); f.T(380, 204, 'PUSH', 12, 'hot', 'middle', check=False)
for x, t in ((160, 'AGENT 1'), (600, 'AGENT 2')):
    f.T(x, 96, t, 11, 'ink', 'middle', bold=True); f.R(x - 40, 110, 80, 60, c='gold', sw=1.6, fill='black', rx=4)
    f.T(x, 136, 'SQUIB', 10, 'white', 'middle', bold=True, check=False); f.T(x, 156, 'DISCH', 10, 'amber', 'middle', bold=True, check=False)
f.Ci(160, 260, 16, 'ink', 1.6, 'black'); f.T(160, 296, 'TEST', 10.5, 'ink', 'middle', bold=True)
f.T(380, 270, 'push: arms squibs, closes fuel / hyd / bleed', 10.5, 'dim', 'middle')
AFS.append(f)

f = AF('15_08', 'Pedestal Engine Master and Fire Panel', 760, 340, 'Engine master switches ON/OFF with FIRE and FAULT lights beneath, and the engine mode selector CRANK / NORM / IGN START',
       'The engine master switches control the fuel (HP) valves and ignition. Beneath each is a FIRE light (with the overhead warning) and a FAULT light. The mode selector selects CRANK, NORM or IGN/START.')
f.R(100, 30, 560, 280, c='ink', sw=2, fill='g2', rx=10)
for x, n in ((210, '1'), (550, '2')):
    f.T(x, 60, f'MASTER {n}', 11, 'ink', 'middle', bold=True); f.Ci(x, 120, 36, 'ink', 2, 'black'); f.T(x, 126, f'ENG {n}', 12, 'white', 'middle', bold=True, check=False)
    f.T(x - 56, 104, 'ON', 10, 'ink', 'end', bold=True); f.T(x - 56, 144, 'OFF', 10, 'ink', 'end', bold=True)
    lamp(f, x - 36, 190, 72, 26, 'FIRE', 'hot', size=9.5); lamp(f, x - 36, 222, 72, 26, 'FAULT', 'amber', on=False, size=9.5)
f.Ci(380, 200, 40, 'ink', 2, 'black'); f.L(380, 200, 380, 164, 'white', 4)
f.T(380, 120, 'MODE', 11, 'ink', 'middle', bold=True); f.T(310, 210, 'CRANK', 10, 'ink', 'end', bold=True); f.T(380, 146, 'NORM', 10, 'ink', 'middle', bold=True)
f.T(450, 210, 'IGN / START', 10, 'ink', bold=True)
AFS.append(f)

f = AF('15_09', 'Engine Fire Protection — Bottles and Discharge', 760, 340, 'Two fire extinguisher bottles connected through squib-fired discharge heads to spray nozzles in the engine nacelle, with the overhead fire panel',
       'Each engine has two extinguishing shots (from one or two bottles, sometimes shared between engines). Firing a squib breaks the bottle’s frangible disc and the agent (Halon) is piped to spray nozzles in the nacelle fire zone. A pressure switch shows DISCH when a bottle has been emptied; a thermal discharge indicator (red disc) shows overheat discharge.')
for x, t in ((140, 'BOTTLE 1'), (280, 'BOTTLE 2')): f.R(x - 36, 200, 72, 100, c='ink', sw=2, fill='hot', rx=30); f.T(x, 320, t, 10.5, 'ink', 'middle', bold=True); f.R(x - 12, 186, 24, 16, c='ink', sw=1.2, fill='gold', rx=2)
f.T(210, 176, 'squib + discharge head', 10, 'gold', 'middle', bold=True)
pipe(f, [(140, 186), (140, 150), (520, 150)], 'cool', 6); pipe(f, [(280, 186), (280, 150)], 'cool', 6)
f.P('M500,100 L700,120 L700,220 L500,240 Z', 'ink', 2, '#c4d1d6', op=0.5); f.T(600, 270, 'engine nacelle (fire zone)', 10.5, 'ink', 'middle', bold=True)
for k in range(3): f.L(520 + k * 50, 150, 540 + k * 50, 190, 'cool', 2, me='cool')
f.R(560, 30, 160, 40, c='ink', sw=1.6, fill='g2', rx=4); lamp(f, 590, 36, 100, 28, 'FIRE', 'hot', size=9.5); f.T(640, 90, 'overhead fire panel', 10, 'dim', 'middle')
f.P('M560,50 L400,50 L280,180', 'gold', 1.2, dash='4 3')
AFS.append(f)

f = AF('15_10', 'Fire Extinguishing System Layout (Twin Engine)', 760, 360, 'Left and right fire extinguisher bottles cross-connected to both engines, with discharge pipes and squib valves selected from the fire handles',
       'On many twins each bottle can be discharged to either engine: pulling and turning the fire handle left or right fires a bottle into that engine, so a second shot is available from the other bottle. Check valves prevent agent passing between bottles.')
N = {}
node(f, N, 'h1', 60, 30, 180, 50, ['Fire handle 1', 'pull + turn L / R'], 'hot', 9.5)
node(f, N, 'h2', 520, 30, 180, 50, ['Fire handle 2', 'pull + turn L / R'], 'hot', 9.5)
node(f, N, 'b1', 60, 150, 180, 50, ['Left bottle'], 'hot', 10)
node(f, N, 'b2', 520, 150, 180, 50, ['Right bottle'], 'hot', 10)
node(f, N, 'e1', 60, 280, 180, 50, ['Left engine'], 'ink', 10)
node(f, N, 'e2', 520, 280, 180, 50, ['Right engine'], 'ink', 10)
for a, b_ in (('h1', 'b1'), ('h2', 'b2'), ('b1', 'e1'), ('b2', 'e2'), ('b1', 'e2'), ('b2', 'e1')): conn(f, N, a, b_, 'cool' if a[0] == 'b' else 'gold')
f.T(380, 140, 'cross-feed: either bottle to either engine', 10.5, 'cool', 'middle', bold=True)
AFS.append(f)

f = AF('15_13', 'Hand-Held Fire Extinguishers', 760, 340, 'Two hand-held extinguishers: a Halon (BCF) general-purpose extinguisher and a water extinguisher, with their uses',
       'Cabin extinguishers: Halon (BCF, often colour-coded green) for general use, including electrical and fuel fires (class A, B, C); water (red) for class A fires such as paper, fabric and wood only — never on electrical or fuel fires. Use from about 2 m, aiming at the base of the fire.')
for x, c_, t, u in ((200, 'green', 'HALON (BCF)', ['general purpose:', 'electrical, fuel, solids']), (540, 'hot', 'WATER', ['class A only:', 'paper, fabric, wood'])):
    f.R(x - 40, 90, 80, 180, c='ink', sw=2, fill=c_, rx=24); f.R(x - 14, 60, 28, 30, c='ink', sw=1.4, fill='steel', rx=3); f.L(x + 14, 66, x + 60, 50, 'ink', 4)
    f.T(x, 300, t, 12, c_, 'middle', bold=True); f.T(x + 70, 160, u[0], 10.5, 'ink', bold=True); f.T(x + 70, 176, u[1], 10.5, 'ink', bold=True)
f.T(380, 330, 'never use water on electrical or fuel fires', 10.5, 'hot', 'middle', bold=True)
AFS.append(f)

f = AF('16_01', 'Light Aircraft Gravity Fuel System', 760, 360, 'High-wing light aircraft fuel system: left and right wing tanks with vented filler caps, interconnect, selector, strainer, primer and carburettor',
       'In a high-wing aircraft fuel flows by gravity from the wing tanks (joined by a vent/interconnect) through the selector (BOTH / LEFT / RIGHT / OFF) and the fuel strainer (with drain) to the carburettor. A primer pumps fuel to the cylinders for starting. Tank vents must be clear or fuel flow stops.')
f.R(60, 40, 240, 50, c='ink', sw=1.6, fill='g2', rx=4); f.R(460, 40, 240, 50, c='ink', sw=1.6, fill='g2', rx=4)
f.R(62, 62, 236, 26, c='none', sw=0, fill='fluid', rx=2); f.R(462, 62, 236, 26, c='none', sw=0, fill='fluid', rx=2)
f.T(180, 30, 'left wing tank', 10.5, 'ink', 'middle', bold=True); f.T(580, 30, 'right wing tank', 10.5, 'ink', 'middle', bold=True)
f.L(300, 50, 460, 50, 'cool', 2, dash='4 3'); f.T(380, 44, 'vent / interconnect', 10, 'cool', 'middle')
line(f, [(280, 90), (380, 170)], 'gold', 4); line(f, [(480, 90), (380, 170)], 'gold', 4); line(f, [(380, 170), (380, 320)], 'gold', 4)
f.Ci(380, 180, 14, 'ink', 1.6, 'g3'); f.T(400, 184, 'fuel selector', 10.5, 'ink', bold=True)
f.R(366, 230, 28, 30, c='ink', sw=1.4, fill='steel', rx=4); f.T(404, 250, 'strainer (gascolator) + drain', 10.5, 'ink', bold=True)
f.L(380, 270, 300, 270, 'gold', 2); f.R(260, 260, 40, 20, c='ink', sw=1.4, fill='g3', rx=3); f.T(250, 274, 'primer', 10.5, 'ink', 'end', bold=True)
f.R(350, 320, 60, 30, c='ink', sw=1.4, fill='#5d727b', rx=4); f.T(420, 340, 'carburettor', 10.5, 'ink', bold=True)
AFS.append(f)

f = AF('16_02', 'Light Aircraft Fuel System with Pumps', 760, 360, 'Low-wing light aircraft fuel system with left and right tanks, selector valve, strainer, electric and engine-driven pumps, carburettor and primer',
       'In a low-wing aircraft fuel must be pumped up to the engine. The selector chooses LEFT or RIGHT (not usually BOTH), the strainer removes water and dirt, and an electric boost pump (used for take-off, landing and tank changes) backs up the engine-driven pump. Fuel quantity gauges are fed by senders in each tank.')
f.R(40, 270, 200, 60, c='ink', sw=1.6, fill='g2', rx=4); f.R(520, 270, 200, 60, c='ink', sw=1.6, fill='g2', rx=4)
f.R(42, 292, 196, 36, c='none', sw=0, fill='fluid', rx=2); f.R(522, 292, 196, 36, c='none', sw=0, fill='fluid', rx=2)
f.T(140, 350, 'left main tank', 10.5, 'ink', 'middle', bold=True); f.T(620, 350, 'right main tank', 10.5, 'ink', 'middle', bold=True)
line(f, [(200, 290), (360, 290)], 'gold', 4); line(f, [(560, 290), (400, 290)], 'gold', 4); f.Ci(380, 290, 18, 'ink', 1.6, 'g3'); f.T(380, 326, 'selector valve', 10.5, 'ink', 'middle', bold=True)
line(f, [(380, 272), (380, 60)], 'gold', 4)
f.R(366, 230, 28, 26, c='ink', sw=1.4, fill='steel', rx=4); f.T(404, 246, 'strainer', 10.5, 'ink', bold=True)
pump(f, 380, 180, 16, 'electric boost pump'); pump(f, 380, 120, 16, 'engine-driven pump')
f.R(350, 30, 60, 30, c='ink', sw=1.4, fill='#5d727b', rx=4); f.T(420, 50, 'carburettor / fuel control', 10.5, 'ink', bold=True)
f.R(200, 60, 60, 20, c='ink', sw=1.2, fill='g3', rx=3); f.T(190, 74, 'primer', 10.5, 'ink', 'end', bold=True); f.L(260, 70, 380, 70, 'gold', 1.6)
AFS.append(f)

f = AF('16_04', 'Twin-Engine Transport Fuel System (ETOPS)', 760, 400, 'Fuel system of a modern twin with left and right wing tanks and a centre tank, two booster pumps per tank, crossfeed valve, engine LP valves and APU feed',
       'Each wing tank has two booster pumps feeding its own engine; centre-tank pumps (higher pressure) are used first. A crossfeed valve lets either side feed either engine, used to correct imbalance or after an engine failure. LP (spar) valves shut off fuel at the fire handle. The APU usually feeds from the left side.')
for x, t in ((40, 'LEFT WING TANK'), (520, 'RIGHT WING TANK')): f.R(x, 220, 200, 110, c='ink', sw=1.6, fill='g2', rx=4); f.R(x + 2, 250, 196, 78, c='none', sw=0, fill='fluid', rx=2, op=0.8); f.T(x + 100, 350, t, 10.5, 'ink', 'middle', bold=True)
f.R(280, 220, 200, 110, c='ink', sw=1.6, fill='g2', rx=4); f.R(282, 260, 196, 68, c='none', sw=0, fill='fluid', rx=2, op=0.8); f.T(380, 350, 'CENTRE TANK', 10.5, 'ink', 'middle', bold=True)
for x in (90, 190, 570, 670, 340, 420): pump(f, x, 280, 12, None)
line(f, [(90, 268), (90, 190), (190, 190), (190, 268)], 'gold', 3); line(f, [(570, 268), (570, 190), (670, 190), (670, 268)], 'gold', 3)
line(f, [(340, 268), (340, 190)], 'gold', 3); line(f, [(420, 268), (420, 190)], 'gold', 3)
line(f, [(190, 190), (570, 190)], 'gold', 3); f.R(370, 180, 20, 20, c='ink', sw=1.4, fill='gd', rx=3); f.T(380, 170, 'crossfeed valve', 10.5, 'gold', 'middle', bold=True)
for x, t in ((140, 'ENGINE 1'), (620, 'ENGINE 2')):
    line(f, [(x, 190), (x, 80)], 'gold', 3); f.R(x - 10, 120, 20, 20, c='ink', sw=1.4, fill='hot', rx=3); f.R(x - 40, 40, 80, 40, c='ink', sw=1.6, fill='#5d727b', rx=6)
    f.T(x, 64, t, 10, 'white', 'middle', bold=True, check=False); f.T(x + 18, 136, 'LP valve', 10, 'hot', bold=True)
f.T(380, 390, 'two booster pumps per tank; centre-tank pumps used first', 10, 'dim', 'middle')
AFS.append(f)

f = AF('16_05', 'Representative Jet Fuel System (Three-Engine)', 760, 380, 'Main tanks with booster pumps feeding engine manifolds through crossfeed valves, a centre tank, fuel jettison and refuel manifold',
       'A larger transport: each main tank normally feeds its own engine through its manifold; crossfeed valves connect the manifolds; a centre (and sometimes tail or stabiliser) tank supplies via override/jettison pumps. A refuel manifold fills all tanks from a single pressure-refuelling point, and a jettison system dumps fuel down to a set quantity.')
for i, x in enumerate((60, 300, 540)):
    f.R(x, 40, 160, 90, c='ink', sw=1.6, fill='g2', rx=4); f.R(x + 2, 64, 156, 64, c='none', sw=0, fill='fluid', rx=2, op=0.8); f.T(x + 80, 30, f'TANK {i + 1}', 10.5, 'ink', 'middle', bold=True)
    pump(f, x + 50, 100, 11, None); pump(f, x + 110, 100, 11, None); line(f, [(x + 80, 130), (x + 80, 220)], 'gold', 3)
    f.R(x + 70, 210, 20, 20, c='ink', sw=1.4, fill='gd', rx=3); line(f, [(x + 80, 230), (x + 80, 330)], 'gold', 3)
    f.R(x + 40, 330, 80, 36, c='ink', sw=1.6, fill='#5d727b', rx=6); f.T(x + 80, 352, f'ENGINE {i + 1}', 10, 'white', 'middle', bold=True, check=False)
line(f, [(140, 220), (620, 220)], 'gold', 3); f.T(152, 260, 'crossfeed manifold + valves', 10.5, 'gold', bold=True)
f.L(60, 160, 700, 160, 'cool', 2, dash='6 4'); f.T(700, 152, 'refuel manifold', 10, 'cool', 'end', bold=True)
f.T(152, 296, 'jettison: dump to a set qty', 10, 'hot', bold=True)
AFS.append(f)

if __name__ == '__main__':
    gallery(AFS, 'Airframes Gallery 5', 'Airframes — Oxygen, Smoke & Fire Protection, Fuel Systems', 'Original figures for oxygen, smoke and fire detection and protection, and fuel systems.', 'af5-gallery.html')
    print(len(AFS), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
