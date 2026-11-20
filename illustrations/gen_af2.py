#!/usr/bin/env python3
"""Airframes part 2 (chapters 2-6): hydraulic components, landing gear, wheels, tyres, brakes."""
import math
from af_common import *

AFS = []
def body(f, x, y, w, h, fill='g3'): f.R(x, y, w, h, c='ink', sw=1.8, fill=fill, rx=4)

# 02_10 hand pump
f = AF('02_10', 'Double-Acting Hand Pump', 760, 360, 'Hand pump with handle, piston containing a transfer valve, inlet and outlet non-return valves and a relief valve',
       'On each stroke of the handle the pump delivers fluid. Pulling the piston up draws fluid in through the inlet NRV below while fluid above is pushed out; pushing down, the transfer valve in the piston opens and fluid passes to the upper side, the rod displacement delivering more. Used for ground servicing and emergency.')
body(f, 300, 90, 120, 200); f.R(306, 96, 108, 188, c='none', sw=0, fill='hot', rx=2, op=0.85)
f.R(306, 170, 108, 26, c='ink', sw=1.4, fill='#a9bac1', rx=2); f.Ci(360, 183, 6, 'ink', 1, 'gold'); f.R(354, 40, 12, 130, c='ink', sw=1.2, fill='#a9bac1', rx=2)
f.L(360, 40, 560, 10, 'ink', 6); f.Ci(360, 40, 6, 'ink', 1.4, 'g3'); f.T(560, 34, 'Handle', 10.5, 'ink', bold=True)
line(f, [(360, 290), (360, 340)], 'hot', 4); f.P('M352,306 L360,294 L368,306 Z', 'ink', 1.4, 'gold'); f.T(372, 330, 'Inlet NRV', 10, 'ink', bold=True); f.T(380, 352, 'from reservoir', 9.5, 'dim')
line(f, [(300, 120), (150, 120)], 'hot', 4); f.P('M226,112 L214,120 L226,128 Z', 'ink', 1.4, 'gold'); f.T(220, 106, 'Outlet NRV', 10, 'ink', 'middle', bold=True); f.T(140, 124, 'OUTLET', 10.5, 'hot', 'end', bold=True)
line(f, [(180, 120), (180, 250)], 'gold', 2, '4 3'); valvebox(f, 180, 262, 30, 22, 'Relief valve', side='left')
f.T(430, 186, 'Transfer valve (in piston)', 10.5, 'gold', bold=True); f.T(430, 210, 'Piston', 10.5, 'ink', bold=True)
AFS.append(f)

# 02_11 gear pump
f = AF('02_11', 'Gear-Type Hydraulic Pump', 760, 320, 'Two meshing gears in a close-fitting housing carrying fluid round the outside from the inlet to the outlet',
       'Fluid is trapped between the gear teeth and the housing and carried round the outside from inlet to outlet; the meshing teeth stop it returning through the middle. Delivery is proportional to speed (a constant-delivery pump), so the system needs a cut-out or relief valve.')
def gear(cx, cy, r, n, c_='#a9bac1'):
    pts = []
    for k in range(n * 2):
        a = math.pi * k / n; rr = r if k % 2 == 0 else r - 10
        for da in (-0.25, 0.25): pts.append((cx + rr * math.cos(a + da * math.pi / n), cy + rr * math.sin(a + da * math.pi / n)))
    f.P('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + ' Z', 'ink', 1.4, c_); f.Ci(cx, cy, 8, 'ink', 1.2, 'g3')
f.R(250, 60, 260, 200, c='ink', sw=2, fill='g2', rx=90)
gear(330, 160, 70, 12); gear(440, 160, 70, 12, 'steel')
f.L(130, 160, 250, 160, 'cool', 6, me='cool'); f.L(510, 160, 640, 160, 'hot', 6, me='hot')
f.T(140, 146, 'INLET', 11, 'cool', bold=True); f.T(630, 146, 'OUTLET', 11, 'hot', 'end', bold=True)
f.P('M330,82 A78,78 0 0 0 262,180', 'gold', 2, me='gold')
f.P('M440,238 A78,78 0 0 0 508,140', 'gold', 2, me='gold')
f.T(380, 290, 'fluid carried round the outside, between teeth and casing', 10.5, 'gold', 'middle', bold=True)
AFS.append(f)

# swash plate pumps
def swash(tag, title, ang, which, aria, cap):
    f = AF(tag, title, 760, 360, aria, cap)
    body(f, 360, 100, 200, 140); f.T(460, 260, 'Cylinder block (rotating)', 10.5, 'ink', 'middle', bold=True)
    for k, y in enumerate((120, 150, 190, 220)):
        ext = 30 + (ang / 30) * 40 * (0.5 + 0.5 * math.sin(k * 1.4)); f.R(360 - ext, y - 7, ext + 100, 14, c='ink', sw=1.2, fill='#a9bac1', rx=3)
    a = math.radians(ang); cx, cy = 260, 170
    f.L(cx - 110 * math.sin(a), cy - 110 * math.cos(a), cx + 110 * math.sin(a), cy + 110 * math.cos(a), 'hot', 10)
    f.T(cx - 110, 320, 'Yoke / swash plate', 10.5, 'hot', bold=True)
    f.L(560, 170, 660, 170, 'ink', 6); f.T(668, 174, 'Drive shaft', 10.5, 'ink', bold=True)
    f.L(640, 120, 562, 120, 'gold', 3, me='gold'); f.T(648, 124, 'Inlet', 10.5, 'gold', bold=True)
    f.L(562, 220, 640, 220, 'hot', 3, me='hot'); f.T(648, 224, 'Outlet', 10.5, 'hot', bold=True)
    body(f, 140, 40, 120, 40, 'g2'); f.R(150, 46, 50, 28, c='ink', sw=1.2, fill='mag', rx=2); f.T(200, 30, 'Control piston', 10.5, 'mag', 'middle', bold=True)
    f.L(200, 80, cx - 40 * math.sin(a), cy - 40 * math.cos(a) - 50, 'mag', 2)
    f.T(380, 345, which, 11, 'gold', 'middle', bold=True)
    return f
AFS.append(swash('02_13', 'Constant Pressure Pump at Maximum Stroke', 28, 'Low system pressure: yoke at maximum angle, full stroke, maximum delivery', 'Swash-plate pump with the yoke at a large angle giving maximum piston stroke',
    'When system pressure is low, the control piston lets the spring hold the yoke at its maximum angle: the pistons move through their full stroke and the pump delivers maximum flow.'))
AFS.append(swash('02_14', 'Constant Pressure Pump at Minimum Stroke', 3, 'System pressure reached: yoke almost upright, minimum stroke (just enough for leakage and cooling)', 'Swash-plate pump with the yoke nearly upright giving almost no piston stroke',
    'As system pressure reaches its maximum, pressure on the control piston moves the yoke towards upright, reducing the stroke until the pump delivers only enough to make up leakage and keep itself lubricated and cool.'))

# 02_15 ACOV
f = AF('02_15', 'Automatic Cut-Out Valve (ACOV)', 760, 360, 'Cut-out valve with a piston sensing system pressure that opens a poppet valve to return pump flow to the reservoir, while a non-return valve holds system pressure',
       'With a constant-delivery pump, when system pressure reaches the cut-out value the piston lifts the poppet valve and pump output flows back to the reservoir at low pressure (the pump idles). The NRV keeps the system and accumulator charged. When pressure falls to the cut-in value, the poppet closes and the pump charges the system again.')
body(f, 220, 80, 260, 180)
f.R(230, 100, 240, 40, c='none', sw=0, fill='hot', rx=0); f.R(230, 150, 240, 40, c='none', sw=0, fill='gold', rx=0, op=0.8); f.R(230, 200, 240, 24, c='ink', sw=1.2, fill='steel', rx=0)
f.R(340, 90, 20, 140, c='ink', sw=1.2, fill='#a9bac1', rx=2)
line(f, [(80, 300), (560, 300)], 'hot', 4); nrv(f, 400, 300, False); f.T(400, 326, 'NRV', 10.5, 'ink', 'middle', bold=True)
line(f, [(160, 300), (160, 120), (230, 120)], 'hot', 3); line(f, [(470, 120), (640, 120)], 'cool', 3, )
line(f, [(520, 300), (520, 212), (480, 212)], 'hot', 2)
f.T(80, 290, 'from pump', 10.5, 'ink', bold=True); f.T(560, 290, 'to system', 10.5, 'ink', bold=True); f.T(650, 124, 'to reservoir', 10.5, 'cool', bold=True)
f.T(500, 70, 'Poppet valve', 10.5, 'ink', bold=True); f.L(496, 74, 360, 110, 'dim', 1)
f.T(560, 232, 'Piston (system P)', 10.5, 'ink', bold=True); f.L(556, 228, 470, 212, 'dim', 1)
f.T(160, 60, 'idling flow when cut out', 10, 'cool', bold=True)
AFS.append(f)

# 02_16 accumulators
f = AF('02_16', 'Hydraulic Accumulators', 760, 360, 'Piston-type accumulator with gas above a floating piston and liquid below, and a spherical accumulator with a flexible diaphragm, each with a charging point and gauge',
       'An accumulator stores fluid under pressure using a compressed gas (nitrogen) charge separated from the fluid by a floating piston or flexible diaphragm. It damps pressure surges, supplies peak demands, provides emergency pressure and allows for thermal expansion. The gas pre-charge is checked with the system depressurised.')
f.R(150, 80, 100, 220, c='ink', sw=2, fill='g2', rx=30); f.R(152, 82, 96, 120, c='none', sw=0, fill='cool', rx=28, op=0.6); f.R(152, 214, 96, 84, c='none', sw=0, fill='gold', rx=20, op=0.8)
f.R(152, 200, 96, 14, c='ink', sw=1.2, fill='steel', rx=0); f.T(200, 140, 'GAS', 11, 'black', 'middle', bold=True); f.T(200, 260, 'LIQUID', 11, 'black', 'middle', bold=True)
f.T(200, 330, 'Floating piston type', 10.5, 'ink', 'middle', bold=True); f.L(200, 80, 200, 50, 'ink', 3); gauge(f, 200, 36, 14)
f.Ci(520, 190, 100, 'ink', 2, 'g2'); f.P('M420,190 Q520,240 620,190 A100,100 0 0 1 420,190 Z', 'none', 0, 'gold', op=0.8)
f.P('M420,190 A100,100 0 0 1 620,190 Q520,240 420,190 Z', 'none', 0, 'cool', op=0.6); f.P('M424,192 Q520,240 616,192', 'ink', 2.4)
f.T(520, 160, 'GAS', 11, 'black', 'middle', bold=True); f.T(520, 256, 'LIQUID', 11, 'black', 'middle', bold=True)
f.T(520, 330, 'Spherical, flexible diaphragm', 10.5, 'ink', 'middle', bold=True); f.L(520, 90, 520, 50, 'ink', 3); gauge(f, 520, 36, 14)
f.T(360, 40, 'gas charging point + gauge', 10, 'cool', 'middle', bold=True)
AFS.append(f)

# 02_17 actuators
f = AF('02_17', 'Hydraulic Actuators', 760, 340, 'Single-acting actuator with spring return, balanced actuator with rod both sides, and double-acting unbalanced actuator',
       'Single-acting: pressure moves the piston one way, a spring returns it. Balanced (double-ended rod): equal areas, so equal force and speed both ways. Double-acting unbalanced: pressure either side; the rod reduces the area on one side, so it is stronger extending than retracting.')
def act(cx, kind):
    f.R(cx - 40, 70, 80, 180, c='ink', sw=2, fill='g2', rx=2)
    py = 150
    if kind == 'single':
        f.R(cx - 38, 72, 76, py - 72, c='none', sw=0, fill='steel', rx=0)
        for k in range(6): f.P(f'M{cx - 30},{80 + k * 12} L{cx + 30},{86 + k * 12}', 'cool', 2)
        f.R(cx - 38, py + 10, 76, 88, c='none', sw=0, fill='hot', rx=0)
    else:
        f.R(cx - 38, 72, 76, py - 72, c='none', sw=0, fill='hot', rx=0, op=0.9); f.R(cx - 38, py + 10, 76, 88, c='none', sw=0, fill='hot' if kind == 'balanced' else 'gold', rx=0, op=0.9)
    f.R(cx - 38, py, 76, 10, c='ink', sw=1.4, fill='#a9bac1', rx=1); f.R(cx - 5, py + 10, 10, 140, c='ink', sw=1.2, fill='#a9bac1', rx=1)
    if kind == 'balanced': f.R(cx - 5, 20, 10, 130, c='ink', sw=1.2, fill='#a9bac1', rx=1)
for cx, k, t in ((140, 'single', 'SINGLE ACTING'), (380, 'balanced', 'BALANCED'), (620, 'double', 'DOUBLE ACTING')):
    act(cx, k); f.T(cx, 320, t, 11, 'gold', 'middle', bold=True)
f.T(200, 100, 'spring', 10, 'cool', bold=True); f.T(200, 200, 'pressure', 10, 'hot', bold=True)
f.T(680, 200, 'smaller', 10, 'gold', bold=True); f.T(680, 214, 'area side', 10, 'gold', bold=True)
AFS.append(f)

# valve figures (compact schematic)
def valve_fig(tag, title, aria, cap, draw):
    f = AF(tag, title, 760, 320, aria, cap); draw(f); AFS.append(f)
def pmv(f):
    body(f, 280, 60, 140, 200); f.R(330, 70, 40, 60, c='ink', sw=1, fill='none', rx=0)
    for k in range(6): f.P(f'M332,{72 + k * 10} L368,{78 + k * 10}', 'cool', 2)
    f.R(320, 130, 60, 30, c='ink', sw=1.4, fill='#a9bac1', rx=2)
    line(f, [(120, 210), (280, 210)], 'hot', 4); line(f, [(420, 210), (600, 210)], 'hot', 4); line(f, [(420, 150), (600, 150)], 'gold', 4)
    f.T(110, 214, 'Pressure inlet', 10.5, 'ink', 'end', bold=True); f.T(610, 214, 'Primary services (always)', 10.5, 'hot', bold=True)
    f.T(610, 154, 'Secondary services', 10.5, 'gold', bold=True); f.T(610, 170, '(only above set pressure)', 9.5, 'dim')
valve_fig('02_18', 'Pressure Maintaining Valve', 'Valve feeding primary services directly and opening to secondary services only when pressure exceeds its spring setting',
          'If pump output falls (e.g. one pump failed), the pressure maintaining valve closes the supply to secondary services so that the primary services (e.g. flying controls, brakes) keep sufficient pressure.', pmv)
def prv(f):
    body(f, 280, 50, 120, 230); f.R(320, 60, 40, 60, c='ink', sw=1, fill='none', rx=0)
    for k in range(6): f.P(f'M322,{62 + k * 10} L358,{68 + k * 10}', 'cool', 2)
    f.R(320, 120, 40, 120, c='ink', sw=1.2, fill='#a9bac1', rx=2)
    for y, t, c_ in ((150, 'Return', 'cool'), (190, 'Inlet (system pressure)', 'hot'), (240, 'Low-pressure sub-system', 'gold')): line(f, [(400, y), (560, y)], c_, 4); f.T(570, y + 4, t, 10.5, c_, bold=True)
    f.T(250, 160, 'spring sets', 10, 'dim', 'end'); f.T(250, 174, 'the reduced pressure', 10, 'dim', 'end')
valve_fig('02_19', 'Pressure Reducing Valve', 'Spring-loaded valve supplying a sub-system at a reduced pressure, with inlet, outlet and return ports',
          'A pressure reducing valve supplies a sub-system (e.g. wheel brakes) at a lower pressure than the main system. The valve throttles the inlet as outlet pressure approaches the spring setting, and vents to return if it is exceeded.', prv)
def nrvfig(f):
    f.R(80, 110, 600, 100, c='ink', sw=2, fill='g3', rx=10); f.R(90, 130, 580, 60, c='none', sw=0, fill='hot', rx=0, op=0.9)
    f.R(280, 120, 180, 80, c='ink', sw=1.4, fill='g2', rx=4)
    for k in range(6): f.P(f'M{300 + k * 18},126 L{308 + k * 18},194', 'cool', 2.4)
    f.R(410, 140, 20, 40, c='ink', sw=1.2, fill='steel', rx=2); f.Ci(470, 160, 30, 'ink', 1.6, 'black'); f.R(500, 130, 170, 60, c='none', sw=0, fill='gold', rx=0, op=0.85)
    f.T(120, 250, 'OUTLET PORT', 11, 'ink', bold=True); f.T(640, 250, 'INLET PORT', 11, 'ink', 'end', bold=True)
    f.L(680, 90, 560, 90, 'gold', 2.4, me='gold'); f.T(700, 76, 'flow from inlet lifts ball against spring', 10, 'gold', 'end', bold=True)
    f.T(380, 290, 'reverse flow seats the ball: no flow back', 10.5, 'hot', 'middle', bold=True)
valve_fig('02_20', 'A Simple Non-Return Valve', 'Ball-type non-return valve with a spring holding the ball on its seat, inlet and outlet ports',
          'A non-return (check) valve allows flow in one direction only. Inlet pressure lifts the ball off its seat against a light spring; flow in the reverse direction pushes the ball onto the seat and stops it.', nrvfig)
def restr(f):
    for row, (y, t, full) in enumerate(((100, 'FULL FLOW', True), (230, 'RESTRICTED FLOW', False))):
        f.R(160, y - 40, 480, 80, c='ink', sw=2, fill='g3', rx=10); f.R(170, y - 26, 460, 52, c='none', sw=0, fill='hot', rx=0, op=0.9)
        f.R(320, y - 26, 26, 52, c='ink', sw=1.4, fill='steel', rx=2)
        if full: f.R(346, y - 26, 0, 0, c='none', sw=0)
        for k in range(3): f.L(220 + k * 50 if full else 300 - k * 50, y, 250 + k * 50 if full else 270 - k * 50, y, 'ink', 2.4, me='ink')
        f.T(500, y + 4, t, 11, 'white', 'middle', bold=True, check=False)
        f.Ci(80, y, 34, 'ink', 1.6, 'g2')
        for k in range(6): p = pol(80, y, 20, k * 60); f.Ci(p[0], p[1], 4 if full else 0.1, 'ink', 1, 'bg')
        f.Ci(80, y, 5, 'ink', 1, 'bg')
    f.T(80, 154, 'plate: many holes', 9.5, 'dim', 'middle'); f.T(80, 284, 'plate: one small hole', 9.5, 'dim', 'middle')
valve_fig('02_21', 'One-Way Restrictor Valve', 'Restrictor valve allowing full flow in one direction through a plate with many holes, and restricted flow in the other through a single small orifice',
          'A one-way restrictor allows free flow one way and slows the flow the other way, e.g. to slow the extension of the landing gear or flaps under gravity and air loads.', restr)
def rot4(f):
    f.Ci(400, 160, 70, 'ink', 2, 'g3'); f.P('M400,92 Q400,160 332,160', 'hot', 14); f.P('M400,228 Q400,160 468,160', 'cool', 14)
    for (x, y), t, c_ in (((400, 70), 'Pressure', 'hot'), ((400, 250), 'Return', 'cool')): line(f, [(x, y), (400, 90 if y < 160 else 230)], c_, 6); f.T(x, y - 10 if y < 160 else y + 18, t, 10.5, c_, 'middle', bold=True)
    line(f, [(330, 160), (200, 160)], 'hot', 6); line(f, [(470, 160), (600, 160)], 'cool', 6)
    f.T(200, 146, 'to actuator (extend)', 10.5, 'hot', bold=True); f.T(600, 146, 'from actuator', 10.5, 'cool', 'end', bold=True)
    f.T(400, 300, 'rotating the plug 90° reverses the connections', 10.5, 'ink', 'middle', bold=True)
valve_fig('02_22', 'Typical Four-Port Rotary Selector', 'Rotary selector valve with pressure, return and two actuator ports connected through passages in a rotating plug',
          'A four-port selector connects pressure to one side of the actuator and return to the other. Turning the selector reverses the connections; in the neutral position all ports may be blocked (hydraulic lock).', rot4)
def spool(f):
    f.R(120, 120, 520, 80, c='ink', sw=2, fill='g3', rx=4); f.R(130, 140, 500, 40, c='none', sw=0, fill='bg', rx=0)
    for x in (240, 400, 520): f.R(x - 22, 136, 44, 48, c='ink', sw=1.4, fill='#a9bac1', rx=2)
    f.L(130, 160, 640, 160, 'ink', 4)
    for x, t, c_ in ((320, 'Pressure', 'hot'), (470, 'Return', 'cool')): line(f, [(x, 40), (x, 120)], c_, 6); f.T(x, 32, t, 10.5, c_, 'middle', bold=True)
    for x, t in ((240, 'to actuator A'), (400, 'to actuator B')): line(f, [(x, 200), (x, 280)], 'dim', 6); f.T(x, 300, t, 10.5, 'ink', 'middle', bold=True)
    f.T(660, 156, 'Pilot / mechanical', 10, 'ink', bold=True); f.T(660, 170, 'input', 10, 'ink', bold=True)
    f.T(560, 300, 'Neutral: lands block both', 10, 'gold', bold=True); f.T(560, 314, 'lines = hydraulic lock', 10, 'gold', bold=True)
valve_fig('02_23', 'Linear (Spool) Selector Valve', 'Spool selector valve with lands controlling pressure and return ports to two actuator lines',
          'Moving the spool connects pressure to one actuator line and return to the other. In neutral the lands block both actuator lines, trapping the fluid (hydraulic lock) so the actuator holds its position.', spool)
def shuttle(f):
    f.R(140, 120, 480, 100, c='ink', sw=2, fill='g3', rx=6); f.R(150, 130, 460, 80, c='none', sw=0, fill='hot', rx=0, op=0.85)
    f.R(160, 128, 60, 84, c='ink', sw=1.4, fill='#a9bac1', rx=4)
    line(f, [(40, 170), (140, 170)], 'gold', 6); line(f, [(720, 170), (620, 170)], 'hot', 6); line(f, [(380, 120), (380, 30)], 'hot', 6)
    f.T(40, 156, 'Alternate supply', 10.5, 'gold', bold=True); f.T(720, 156, 'Normal supply', 10.5, 'hot', 'end', bold=True); f.T(392, 40, 'Service', 10.5, 'ink', bold=True)
    f.T(190, 250, 'Shuttle', 10.5, 'ink', 'middle', bold=True)
    f.T(380, 290, 'normal pressure holds the shuttle over the alternate port', 10.5, 'ink', 'middle', bold=True)
valve_fig('02_24', 'Shuttle Valve', 'Shuttle valve with normal and alternate supply ports either end and a service port, the shuttle held against the alternate port',
          'A shuttle valve lets a service be supplied from either the normal or the alternate (emergency) system. Whichever supply has the higher pressure pushes the shuttle across and closes the other port, keeping the two systems separate.', shuttle)

# 02_26 control panel
f = AF('02_26', 'Hydraulic System Control Panel', 760, 390, 'Overhead panel for three hydraulic systems with engine pump and electric pump switches, fault lights, PTU and RAT controls',
       'A typical overhead hydraulic panel: engine-driven pump (EDP) switches with fault lights for each system, electric pump switches, the power transfer unit (PTU) and RAT manual deployment. A FAULT light indicates low pressure, overheat or low reservoir level.')
f.R(40, 30, 680, 340, c='ink', sw=2, fill='g2', rx=10)
for i, (n, c_) in enumerate((('GREEN', 'green'), ('BLUE', 'cool'), ('YELLOW', 'gold'))):
    x = 120 + i * 220; f.T(x + 40, 60, n, 12, c_, 'middle', bold=True)
    for j, lbl in enumerate(('ENG PUMP', 'ELEC PUMP' if i else 'PTU')):
        y = 90 + j * 110; f.R(x, y, 80, 70, c='ink', sw=1.6, fill='black', rx=6)
        f.T(x + 40, y + 28, 'FAULT', 10, 'amber', 'middle', bold=True, check=False); f.T(x + 40, y + 52, 'OFF', 10, 'white', 'middle', bold=True, check=False)
        f.T(x + 40, y + 88, lbl, 10, 'ink', 'middle', bold=True)
f.R(560, 322, 140, 30, c='hot', sw=1.6, fill='black', rx=4); f.T(630, 342, 'RAT MAN ON', 10, 'hot', 'middle', bold=True, check=False)
AFS.append(f)

# 02_27 ECAM HYD page
f = AF('02_27', 'ECAM Hydraulic System Page', 760, 380, 'ECAM hydraulic page showing green, blue and yellow systems at 3000 psi with pumps, PTU, RAT, electric pump and fire shut-off valves',
       'The ECAM HYD page shows each system pressure, pump status, the PTU between green and yellow, the RAT and electric pump on blue, the fire shut-off valves and reservoir quantities. Amber indicates an abnormal state.')
screen = lambda: f.R(40, 20, 680, 340, c='line', sw=2, fill='black', rx=8)
screen(); f.T(380, 46, 'HYD', 13, 'white', 'middle', bold=True)
for i, (n, c_) in enumerate((('GREEN', 'green'), ('BLUE', 'green'), ('YELLOW', 'green'))):
    x = 150 + i * 230
    f.T(x, 80, n, 12, 'white', 'middle', bold=True); f.T(x, 104, '3000', 14, 'green', 'middle', bold=True)
    f.L(x, 112, x, 300, 'green', 3)
    f.R(x - 18, 180, 36, 30, c='green', sw=2, fill='black', rx=2); f.T(x + 24, 200, ['ENG 1 PUMP', 'ELEC PUMP', 'ENG 2 PUMP'][i], 9.5, 'white', check=False)
    f.R(x - 10, 300, 20, 40, c='white', sw=1.4, fill='black', rx=0); f.R(x - 8, 312, 16, 26, c='none', sw=0, fill='green', rx=0)
f.L(150, 150, 610, 150, 'green', 1.6, dash='6 4'); f.T(265, 142, 'PTU', 11, 'green', 'middle', bold=True)
f.T(320, 186, 'RAT', 11, 'green', 'end', bold=True); f.T(470, 326, 'reservoir levels', 9.5, 'cool', 'middle', check=False)
AFS.append(f)

# 02_28 pressure relay (transmitter)
f = AF('02_28', 'Pressure Relay (Transmitter)', 760, 320, 'A pressure relay with a floating piston separating system hydraulic fluid from the instrument fluid that operates a remote gauge',
       'A pressure relay keeps high-pressure hydraulic fluid out of the cockpit. System pressure acts on one side of a free piston; the other side transmits the same pressure through a low-volume instrument line (or a transmitter converts it electrically) to the gauge.')
body(f, 300, 60, 100, 200); f.R(306, 160, 88, 94, c='none', sw=0, fill='hot', rx=0, op=0.9); f.R(306, 66, 88, 84, c='none', sw=0, fill='mag', rx=0, op=0.7)
f.R(306, 148, 88, 14, c='ink', sw=1.4, fill='steel', rx=1)
line(f, [(350, 260), (350, 310)], 'hot', 8); f.T(362, 304, 'system pressure', 10.5, 'hot', bold=True)
line(f, [(400, 100), (560, 100)], 'mag', 4); dial(f, 620, 100, 44, 225, 495, [(0, '0'), (0.5, '2'), (1, '4')], ptr=0.75, minor=5, size=9); f.T(620, 172, 'psi ×1000', 10, 'ink', 'middle', bold=True)
f.T(240, 110, 'instrument fluid', 10, 'mag', 'end', bold=True); f.T(240, 160, 'free piston', 10, 'ink', 'end', bold=True); f.T(240, 210, 'hydraulic fluid', 10, 'hot', 'end', bold=True)
AFS.append(f)

# 02_30 typical aircraft hydraulic system
f = AF('02_30', 'A Typical Aircraft Hydraulic System', 760, 400, 'Hydraulic system with engine-driven pump, reservoir, filter, accumulator and selector valves for the landing gear, flaps and brakes, plus a hand pump for emergency',
       'A complete system: the engine-driven pump supplies the main services through a filter, with an accumulator to store pressure and damp surges. A hand pump (or electric pump) drawing from a reserve in the reservoir provides emergency operation.')
N = {}
node(f, N, 'res', 30, 30, 140, 50, ['Reservoir'], 'cool')
node(f, N, 'edp', 30, 130, 140, 50, ['Engine-driven pump'], 'hot', 9.5)
node(f, N, 'hp', 220, 130, 120, 50, ['Hand pump', '(emergency)'], 'gold', 9.5)
node(f, N, 'fil', 30, 230, 140, 40, ['Filter + relief'], 'hot', 9.5)
node(f, N, 'acc', 220, 230, 120, 40, ['Accumulator'], 'hot', 9.5)
for i, t in enumerate(('Landing gear selector', 'Flap selector', 'Brake valves')):
    node(f, N, f's{i}', 420, 40 + i * 110, 160, 44, [t], 'gold', 9.5); node(f, N, f'a{i}', 620, 40 + i * 110, 120, 44, [['Gear jacks', 'Flap motor', 'Brakes'][i]], 'ink', 9.5)
    conn(f, N, f's{i}', f'a{i}', 'hot')
conn(f, N, 'res', 'edp', 'cool'); conn(f, N, 'edp', 'fil', 'hot'); conn(f, N, 'fil', 'acc', 'hot'); conn(f, N, 'res', 'hp', 'cool')
f.L(340, 250, 400, 250, 'hot', 2.4); f.L(400, 62, 400, 300, 'hot', 2.4)
for i in range(3): f.L(400, 62 + i * 110, 418, 62 + i * 110, 'hot', 2.4, me='hot')
f.P('M280,180 L280,210 L400,210', 'gold', 1.8, dash='4 3')
f.T(30, 330, 'red: pressure   blue: return / suction   gold dashed: emergency', 10, 'dim')
AFS.append(f)

# 02_31 pneumatic system
f = AF('02_31', 'High-Pressure Pneumatic System (F27 type)', 760, 380, 'Engine-driven compressors charging storage bottles through a moisture separator, chemical dryer and filter, supplying landing gear, brakes and nosewheel steering through a pressure reducing valve, with an emergency bottle',
       'Some aircraft (e.g. the F27) use high-pressure compressed air instead of hydraulics. Engine-driven compressors charge storage bottles to about 3300 psi; the air passes a moisture separator, chemical dryer and filter because water would freeze. Pressure reducing valves supply the services; a separate emergency bottle lowers the gear and applies the brakes.')
N = {}
node(f, N, 'c', 20, 40, 150, 50, ['Engine-driven', 'compressors'], 'cool', 9.5)
node(f, N, 'ms', 20, 130, 150, 40, ['Moisture separator'], 'cool', 9.5)
node(f, N, 'cd', 20, 210, 150, 40, ['Chemical dryer'], 'cool', 9.5)
node(f, N, 'fl', 20, 290, 150, 40, ['Filter'], 'cool', 9.5)
node(f, N, 'b', 240, 280, 150, 60, ['Storage bottles', '≈ 3300 psi'], 'hot', 9.5)
node(f, N, 'prv', 240, 160, 150, 50, ['Pressure reducing', 'valve'], 'gold', 9.5)
for i, t in enumerate(('Landing gear', 'Wheel brakes', 'Nosewheel steering')): node(f, N, f'v{i}', 470, 40 + i * 80, 150, 40, [t], 'ink', 9.5); conn(f, N, 'prv', f'v{i}', 'hot')
node(f, N, 'e', 470, 300, 150, 50, ['Emergency bottle', 'gear down, brakes'], 'hot', 9.5)
for a, b in (('c', 'ms'), ('ms', 'cd'), ('cd', 'fl'), ('fl', 'b'), ('b', 'prv')): conn(f, N, a, b, 'cool' if a in 'c ms cd' else 'hot')
f.P('M620,325 L680,325 L680,60 L622,60', 'hot', 1.8, dash='5 3', me='hot')
AFS.append(f)

# 03_01 oleo
f = AF('03_01', 'An Oleo-Pneumatic Shock Absorber', 760, 440, 'Oleo strut with an upper cylinder containing nitrogen and hydraulic fluid, a piston with orifice and recoil valve, a sliding lower cylinder, torque links and axle',
       'On landing the lower cylinder slides up, forcing fluid through the orifice (absorbing energy as heat) and compressing the nitrogen, which acts as the spring. On extension the recoil (flutter) valve restricts the return flow to prevent bounce. Torque links keep the wheel aligned; the strut is serviced through the charging valve.')
f.R(300, 40, 80, 220, c='ink', sw=2, fill='g2', rx=6); f.R(304, 44, 72, 90, c='none', sw=0, fill='cool', rx=4, op=0.6); f.R(304, 134, 72, 122, c='none', sw=0, fill='hot', rx=0, op=0.85)
f.T(340, 90, 'nitrogen', 10, 'black', 'middle', bold=True, check=False)
f.R(310, 190, 60, 12, c='ink', sw=1.4, fill='steel', rx=1); f.Ci(340, 196, 3, 'gold', 1, 'gold')
f.R(316, 200, 48, 160, c='ink', sw=1.8, fill='#a9bac1', rx=4)
f.P('M300,230 L250,280 L316,320', 'ink', 3); f.Ci(250, 280, 5, 'ink', 1.2, 'g3')
f.L(300, 370, 380, 370, 'ink', 8); f.Ci(340, 370, 46, 'ink', 2, 'none'); f.Ci(340, 370, 8, 'ink', 1.4, 'g3')
f.R(334, 26, 12, 14, c='ink', sw=1, fill='gold', rx=1)
for (x, y), t in (((346, 32), 'Charging valve'), ((376, 90), 'Upper cylinder (gas)'), ((376, 160), 'Hydraulic fluid'), ((370, 196), 'Orifice + recoil (flutter) valve'), ((364, 300), 'Lower cylinder (piston)'), ((386, 372), 'Axle')):
    f.L(x, y, 470, y, 'dim', 1); f.T(476, y + 4, t, 10.5, 'ink', bold=True)
f.T(240, 270, 'Torque links', 10.5, 'ink', 'end', bold=True)
AFS.append(f)

# 03_02 main gear
f = AF('03_02', 'A Wing-Mounted Main Landing Gear', 760, 400, 'Main landing gear leg with side stay, lock stay, downlock actuator, retraction actuator, torque links, bogie beam, pitch trimmer and brake rods',
       'The main oleo leg is braced by a folding side stay held over-centre by the lock stay (and downlock springs and actuator). The retraction actuator swings the leg up into the wing. On a bogie gear the pitch trimmer positions the bogie for stowage, and brake torque rods react brake torque.')
f.L(380, 40, 380, 300, 'ink', 14); f.L(380, 40, 380, 300, '#a9bac1', 10)
f.L(380, 80, 600, 60, 'gold', 6); f.L(500, 70, 540, 120, 'cool', 4); f.L(380, 90, 200, 60, 'hot', 6)
f.L(220, 300, 540, 300, 'ink', 8); f.Ci(250, 330, 34, 'ink', 2, 'g3'); f.Ci(510, 330, 34, 'ink', 2, 'g3')
f.P('M380,230 L350,260 L380,290', 'ink', 3); f.L(380, 300, 300, 330, 'dim', 2)
f.L(380, 260, 470, 290, 'mag', 4)
for (x, y), t, a in (((600, 60), 'Side stay (folding)', 'start'), ((540, 120), 'Lock stay + downlock actuator', 'start'), ((200, 60), 'Retraction actuator', 'end'), ((380, 150), 'Main oleo leg', 'start'),
                    ((350, 260), 'Torque links', 'end')):
    f.T(x + (8 if a == 'start' else -8), y + (16 if y > 200 else -6), t, 10.5, 'ink', a, bold=True)
f.T(480, 280, 'Pitch trimmer', 10.5, 'mag', bold=True); f.T(548, 318, 'Bogie beam', 10.5, 'ink', bold=True)
f.T(190, 300, 'Brake rod', 10.5, 'ink', 'end', bold=True); f.L(194, 296, 300, 330, 'dim', 1)
AFS.append(f)

# 03_03 nose gear
f = AF('03_03', 'A Nose Landing Gear', 760, 380, 'Nose gear leg with drag stay, lock stay, retraction actuator, downlock actuator, steering mechanism and torque links',
       'The nose leg is braced fore-and-aft by a folding drag stay locked over-centre by the lock stay. It usually retracts forward so that air loads help it to extend in an emergency. The steering mechanism at the top of the leg turns the lower leg; torque links connect it to the wheel axle.')
f.L(380, 40, 380, 290, 'ink', 14); f.L(380, 40, 380, 290, '#a9bac1', 10)
f.L(380, 120, 200, 40, 'gold', 6); f.L(290, 80, 260, 140, 'cool', 4); f.L(380, 60, 560, 40, 'hot', 6)
f.R(366, 150, 28, 30, c='ink', sw=1.4, fill='green', rx=3); f.P('M380,230 L350,255 L380,280', 'ink', 3)
f.Ci(380, 310, 46, 'ink', 2, 'g3'); f.Ci(380, 310, 8, 'ink', 1.4, 'g2')
for (x, y), t, a in (((200, 40), 'Drag stay', 'end'), ((260, 140), 'Lock stay + downlock actuator', 'end'), ((560, 40), 'Retraction actuator', 'start'),
                    ((394, 165), 'Steering mechanism', 'start'), ((350, 255), 'Torque links', 'end')):
    f.T(x + (8 if a == 'start' else -8), y + 4, t, 10.5, 'ink', a, bold=True)
f.L(600, 200, 660, 200, 'dim', 2, me='dim'); f.T(630, 220, 'forward', 9.5, 'dim', 'middle')
AFS.append(f)

# 03_04 nose steering hydraulics
f = AF('03_04', 'Nosewheel Steering — Hydraulic Layout', 760, 360, 'Steering control valve fed from the hydraulic system through a shuttle valve, driving two steering jacks, with a centring cam and accumulator',
       'The tiller (or rudder pedals) moves the steering control valve, which sends pressure to the steering jacks to turn the nose leg; the follow-up linkage closes the valve when the selected angle is reached. A shuttle valve allows an alternate supply, restrictors damp shimmy, and a centring cam straightens the wheel as the leg extends after take-off.')
N = {}
node(f, N, 'sys', 20, 40, 150, 40, ['Normal pressure'], 'hot', 9.5); node(f, N, 'alt', 20, 120, 150, 40, ['Alternate / accumulator'], 'gold', 9.5)
node(f, N, 'sh', 230, 80, 110, 40, ['Shuttle valve'], 'ink', 9.5)
node(f, N, 'cv', 400, 70, 160, 60, ['Steering control', 'valve'], 'gold', 9.5)
node(f, N, 'til', 400, 0 + 8, 160, 34, ['Tiller / pedals'], 'cool', 9.5)
node(f, N, 'j', 400, 200, 160, 50, ['Steering jacks', '(push-pull)'], 'hot', 9.5)
node(f, N, 'leg', 620, 200, 120, 50, ['Nose leg'], 'ink', 9.5)
node(f, N, 'cc', 620, 290, 120, 50, ['Centring cam'], 'cool', 9.5)
for a, b, c_ in (('sys', 'sh', 'hot'), ('alt', 'sh', 'gold'), ('sh', 'cv', 'hot'), ('til', 'cv', 'cool'), ('cv', 'j', 'hot'), ('j', 'leg', 'ink'), ('cc', 'leg', 'cool')): conn(f, N, a, b, c_)
f.P('M680,200 L680,100 L560,100', 'dim', 1.4, dash='4 3', me='dim'); f.T(690, 150, 'follow-up', 9.5, 'dim')
f.T(400, 290, 'restrictors in the jack lines damp shimmy', 10, 'dim')
AFS.append(f)

# 03_06 gear locking
f = AF('03_06', 'Landing Gear Retraction and Locking — Hydraulic Sequence', 760, 380, 'Gear selector valve sending pressure through up and down lines to the main gear jacks, uplock and downlock jacks, door jacks and sequence valves',
       'Selecting UP: pressure first unlocks the downlock, then retracts the gear; a sequence valve then closes the doors and the uplock engages. Selecting DOWN: doors open, the uplock releases, the gear extends and the downlock engages. Restrictors slow the extension and sequence valves ensure the order.')
N = {}
node(f, N, 'sel', 290, 20, 180, 50, ['Gear selector valve'], 'gold')
node(f, N, 'up', 60, 120, 160, 40, ['UP line'], 'hot', 9.5); node(f, N, 'dn', 540, 120, 160, 40, ['DOWN line'], 'cool', 9.5)
node(f, N, 'dl', 40, 210, 180, 44, ['Downlock jack', '(unlocks first)'], 'ink', 9.5)
node(f, N, 'mj', 290, 210, 180, 44, ['Main gear jack'], 'hot', 9.5)
node(f, N, 'sv', 290, 300, 180, 44, ['Sequence valve'], 'gold', 9.5)
node(f, N, 'dj', 540, 300, 180, 44, ['Door jack'], 'ink', 9.5)
node(f, N, 'ul', 540, 210, 180, 44, ['Uplock jack'], 'ink', 9.5)
for a, b, c_ in (('sel', 'up', 'hot'), ('sel', 'dn', 'cool'), ('up', 'dl', 'hot'), ('up', 'mj', 'hot'), ('mj', 'sv', 'gold'), ('sv', 'dj', 'gold'), ('dn', 'ul', 'cool'), ('dn', 'mj', 'cool')): conn(f, N, a, b, c_)
AFS.append(f)

# 03_10 electric retraction
f = AF('03_10', 'Electric Gear Retraction (Light Aircraft)', 760, 360, 'Electric motor driving through a clutch and gearbox to a torque tube and push-pull links retracting the gear, with a manual operating lever and lock-assist spring',
       'On some light aircraft an electric motor drives a gearbox and screw jack (or torque tube); push-pull rods or flexible cables move each leg, and a slip clutch protects the motor. Limit and selector switches stop the motor at each end; a lock-assist spring holds the side stay over-centre, and a manual lever or hand crank allows emergency extension.')
N = {}
node(f, N, 'sw', 300, 20, 160, 40, ['Selector switch'], 'gold', 9.5)
node(f, N, 'm', 300, 100, 160, 40, ['Electric motor'], 'hot', 9.5)
node(f, N, 'cl', 300, 170, 160, 40, ['Clutch + gearbox'], 'ink', 9.5)
node(f, N, 'tt', 300, 240, 160, 40, ['Torque tube / screw'], 'ink', 9.5)
node(f, N, 'man', 520, 170, 200, 40, ['Manual operating lever'], 'cool', 9.5)
node(f, N, 'mg', 40, 300, 200, 44, ['Main gear: side stay', '+ lock-assist spring'], 'ink', 9.5)
node(f, N, 'ng', 520, 300, 200, 44, ['Nose gear: drag strut'], 'ink', 9.5)
for a, b, c_ in (('sw', 'm', 'gold'), ('m', 'cl', 'hot'), ('cl', 'tt', 'ink'), ('man', 'cl', 'cool'), ('tt', 'mg', 'ink'), ('tt', 'ng', 'ink')): conn(f, N, a, b, c_)
f.T(40, 270, 'flexible cables / push-pull rods', 9.5, 'dim')
AFS.append(f)

# 03_12 ECAM wheel page
f = AF('03_12', 'ECAM Wheel Page — Gear and Door Indications', 760, 380, 'ECAM wheel page with three gear position triangles, door indications, brake temperatures and anti-skid status',
       'Each gear shows two green triangles when down and locked (from two independent detection channels), red when in transit or not locked, and nothing when up and locked. Door symbols turn amber if not closed. Brake temperatures and anti-skid / autobrake status are also shown.')
f.R(40, 20, 680, 340, c='line', sw=2, fill='black', rx=8); f.T(380, 46, 'WHEEL', 13, 'white', 'middle', bold=True)
for x in (190, 380, 570):
    for dx in (-18, 18): f.P(f'M{x + dx - 14},90 L{x + dx + 14},90 L{x + dx},112 Z', 'green', 1.6, 'green')
    f.L(x - 40, 80, x + 40, 80, 'green', 2)
f.T(190, 136, 'LH gear', 10, 'white', 'middle', check=False); f.T(380, 136, 'nose gear', 10, 'white', 'middle', check=False); f.T(570, 136, 'RH gear', 10, 'white', 'middle', check=False)
for i, x in enumerate((130, 230, 530, 630)):
    f.T(x, 220, f'{[120, 130, 115, 125][i]} °C', 12, 'green', 'middle', bold=True, check=False); f.R(x - 22, 230, 44, 30, c='white', sw=1.4, fill='none', rx=4); f.T(x, 250, str(i + 1), 11, 'white', 'middle', check=False)
f.T(380, 230, 'ANTI SKID', 11, 'green', 'middle', bold=True, check=False); f.T(380, 260, 'AUTO BRK  LO', 11, 'green', 'middle', bold=True, check=False)
f.T(380, 330, 'two green triangles per gear = down and locked', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

# 04_01 / 04_02 wheels
def wheel(tag, title, divided, aria, cap):
    f = AF(tag, title, 760, 380, aria, cap)
    cx, cy = 300, 190
    f.P(f'M{cx - 120},{cy - 140} Q{cx - 160},{cy} {cx - 120},{cy + 140} L{cx + 120},{cy + 140} Q{cx + 160},{cy} {cx + 120},{cy - 140} Z', 'ink', 2, 'steel')
    f.R(cx - 110, cy - 110, 220, 220, c='ink', sw=1.6, fill='#a9bac1', rx=8); f.R(cx - 40, cy - 30, 80, 60, c='ink', sw=1.6, fill='g3', rx=4)
    if divided:
        f.L(cx, cy - 110, cx, cy + 110, 'ink', 3)
        for y in (cy - 80, cy - 40, cy + 40, cy + 80): f.R(cx - 26, y - 4, 52, 8, c='ink', sw=1, fill='gold', rx=2)
        f.Ci(cx - 80, cy + 80, 8, 'ink', 1.4, 'hot')
        labs = (((cx + 20, cy - 80), 'Tie bolts join the two halves'), ((cx - 80, cy + 80), 'Fusible plug (melts if overheated)'), ((cx - 80, cy - 110), 'Inflation valve'), ((cx, cy - 20), 'Bearing'), ((cx + 110, cy), 'Seal between halves'))
    else:
        f.R(cx + 90, cy - 116, 24, 232, c='ink', sw=1.6, fill='gold', rx=4); f.R(cx + 112, cy - 116, 8, 232, c='ink', sw=1, fill='hot', rx=2)
        labs = (((cx + 102, cy - 100), 'Loose (detachable) flange'), ((cx + 116, cy - 40), 'Lock ring'), ((cx - 80, cy - 110), 'Inflation valve'), ((cx, cy - 20), 'Bearing'), ((cx - 110, cy + 60), 'Body / hub'), ((cx - 60, cy + 100), 'Drive blocks (brake keys)'))
    f.Ci(cx - 80, cy - 110, 6, 'ink', 1.2, 'cool')
    for i, ((x, y), t) in enumerate(labs):
        ty = 50 + i * 54; f.L(x, y, 500, ty - 4, 'dim', 1); f.Ci(x, y, 2.4, 'dim', 1, 'dim'); f.T(506, ty, t, 10.5, 'ink', bold=True)
    f.T(cx, 362, 'tyre (section)', 10, 'dim', 'middle')
    return f
AFS.append(wheel('04_01', 'Loose-Flange Wheel', False, 'Section of a wheel with a detachable outer flange held by a lock ring, inflation valve, bearings and brake drive blocks',
    'The outer flange is removed (after deflation) by releasing the lock ring, so the tyre can be slid off the one-piece hub. Drive blocks transmit brake torque from the rotating brake discs.'))
AFS.append(wheel('04_02', 'Divided Wheel with Fusible Plug', True, 'Section of a two-piece wheel bolted together, with an inflation valve, seal and fusible plug',
    'A divided (split) wheel is made of two halves bolted together with a seal between them; the tyre is changed by unbolting the halves, only after full deflation. Fusible plugs melt at a set temperature to deflate the tyre before overheated brakes can cause it to burst.'))

# 05_01 tyre construction
f = AF('05_01', 'Tyre Construction — Bias and Radial', 760, 380, 'Tyre sections showing plies crossing at an angle in a bias tyre and running radially with a belt in a radial tyre, with tread, breaker, sidewall, bead and bead wire',
       'Bias (cross-ply) tyres have plies laid at alternating angles from bead to bead with breaker strips under the tread. Radial tyres have plies running at 90° to the tread and a stiff belt under the tread, giving lower weight, less heat build-up and longer tread life.')
for k, (x0, rad, name) in enumerate(((60, False, 'BIAS (cross-ply)'), (420, True, 'RADIAL'))):
    f.P(f'M{x0 + 40},300 L{x0 + 40},140 Q{x0 + 40},60 {x0 + 140},60 Q{x0 + 240},60 {x0 + 240},140 L{x0 + 240},300', 'ink', 18)
    f.P(f'M{x0 + 40},300 L{x0 + 40},140 Q{x0 + 40},60 {x0 + 140},60 Q{x0 + 240},60 {x0 + 240},140 L{x0 + 240},300', 'steel', 14)
    f.R(x0 + 70, 40, 140, 14, c='ink', sw=1.4, fill='g3', rx=4)
    for j in range(8):
        xx = x0 + 70 + j * 18
        if rad: f.L(xx, 58, xx, 68, 'cool', 2)
        else: f.L(xx, 58, xx + 10, 68, 'cool', 2); f.L(xx + 10, 58, xx, 68, 'hot', 2)
    if rad: f.R(x0 + 76, 68, 128, 6, c='none', sw=0, fill='gold', rx=0)
    for sx in (40, 240): f.Ci(x0 + sx, 300, 10, 'ink', 1.4, 'gold')
    f.T(x0 + 140, 340, name, 11.5, 'gold', 'middle', bold=True)
f.T(380, 30, 'tread', 10.5, 'ink', 'middle', bold=True); f.T(380, 190, 'sidewall', 10.5, 'ink', 'middle', bold=True); f.T(380, 304, 'bead wires', 10.5, 'gold', 'middle', bold=True)
f.T(660, 84, 'belt', 10, 'gold', bold=True)
AFS.append(f)

f = AF('05_02', 'Regions of the Tyre', 760, 340, 'Half section of a tyre labelled crown, shoulder, sidewall and bead',
       'The crown carries the tread in contact with the runway; the shoulder joins the crown to the sidewall and is where heat build-up is greatest; the sidewall flexes and protects the plies; the bead seats the tyre on the wheel rim and contains the bead wires.')
f.P('M200,300 L200,140 Q200,60 320,60 Q440,60 440,140 L440,300', 'ink', 30); f.P('M200,300 L200,140 Q200,60 320,60 Q440,60 440,140 L440,300', 'steel', 24)
for y, t in ((60, 'CROWN'), (100, 'SHOULDER'), (200, 'SIDEWALL'), (290, 'BEAD')):
    f.L(460, y, 560, y, 'dim', 1, dash='3 3'); f.T(570, y + 4, t, 11, 'ink', bold=True)
AFS.append(f)

f = AF('05_03', 'Tread Wear Indicators', 760, 300, 'Tyre tread section with circumferential grooves and a wear indicator groove or tie bar showing the minimum tread depth',
       'Tread wear is judged from the remaining groove depth or from wear indicators (a groove, tie bars or a different-coloured layer). A tyre is replaced when worn to the indicator or the limit in the maintenance manual, or if cords are exposed.')
f.P('M80,140 L680,140 L680,240 L80,240 Z', 'ink', 2, 'steel')
for x in (180, 300, 420, 540): f.R(x, 140, 30, 60, c='ink', sw=1.4, fill='bg', rx=0)
f.R(300, 186, 30, 14, c='ink', sw=1, fill='gold', rx=0); f.T(315, 120, 'tie bar / wear indicator', 10.5, 'gold', 'middle', bold=True)
f.L(560, 140, 560, 200, 'dim', 1.4, me='dim', ms='dim'); f.T(600, 176, 'groove depth', 10.5, 'ink', bold=True)
f.T(380, 280, 'replace when the tread is worn down to the indicator', 10.5, 'ink', 'middle', bold=True)
AFS.append(f)

# 06_01 multi-disc brake
f = AF('06_01', 'Multi-Disc Brake Assembly', 760, 380, 'Section of a multi-disc brake with alternate rotor discs keyed to the wheel and stator discs keyed to the torque tube, hydraulic pistons, pressure plate and thrust plate',
       'Rotor discs are keyed to the wheel and turn with it; stator discs are keyed to the stationary torque tube. Hydraulic pistons push the pressure plate, squeezing the stack against the thrust plate. Carbon discs are lighter and absorb more heat than steel.')
f.R(140, 120, 400, 30, c='ink', sw=1.6, fill='steel', rx=2); f.T(340, 112, 'Torque tube (stationary)', 10.5, 'ink', 'middle', bold=True)
for k in range(9):
    x = 200 + k * 34; rot = k % 2 == 0
    f.R(x, 150 if not rot else 170, 16, 150, c='ink', sw=1.4, fill='hot' if rot else '#a9bac1', rx=2)
f.R(160, 150, 30, 150, c='ink', sw=1.6, fill='gd', rx=2); f.R(510, 150, 30, 150, c='ink', sw=1.6, fill='steel', rx=2)
for y in (180, 240): f.R(100, y, 60, 30, c='ink', sw=1.4, fill='gold', rx=4)
f.R(140, 320, 400, 20, c='ink', sw=1.6, fill='g3', rx=2); f.T(340, 360, 'Wheel (rotor keys)', 10.5, 'ink', 'middle', bold=True)
f.T(90, 280, 'Pistons', 10.5, 'gold', 'end', bold=True); f.T(120, 80, 'Pressure plate', 10.5, 'gold', bold=True)
f.L(160, 84, 174, 148, 'gold', 1); f.T(560, 230, 'Thrust plate', 10.5, 'ink', bold=True)
f.T(600, 170, 'rotors (red)', 10.5, 'hot', bold=True); f.T(600, 190, 'stators (grey)', 10.5, 'ink', bold=True)
AFS.append(f)

if __name__ == '__main__':
    gallery(AFS, 'Airframes Gallery 2', 'Airframes — Hydraulic Components, Landing Gear, Wheels & Tyres', 'Original figures for hydraulic components, landing gear, wheels, tyres and brakes.', 'af2-gallery.html')
    print(len(AFS), 'figs', len(WARN), 'warnings'); print('\n'.join(WARN))
