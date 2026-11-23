// IR Flight Performance & Planning — extra blocks for C.4.12–C.4.14 aspects
// not covered by the CPL FPP notes (Appendix 2C). Original wording; SA
// regulation text shown via `regs`.
import type { AirLawNoteBlock } from "./airlaw-notes";
import { PPL_AIRLAW_EXTRA } from "./ppl-airlaw-extra";

const aipNotam = (PPL_AIRLAW_EXTRA["5.7"] ?? []).filter((b) => /Aeronautical Information Package|NOTAM/.test(b.heading));

export const IR_FPP_EXTRA: Record<string, AirLawNoteBlock[]> = {
  "C.4.12": [
    {
      heading: "SA fuel requirements and in-flight fuel management",
      regs: ["91.07.12"],
      points: [
        "CAR 91.07.12 and SA-CATS 91.07.12 (planning criteria for aeroplanes) — shown below: IFR without a destination alternate: destination + 45 min; IFR with an alternate: destination + alternate + 45 min; VFR day + 30 min; VFR night + 45 min, at normal cruising consumption. (Helicopter criteria in para 2.)",
        "§ Fuel state awareness and log-keeping",
        "Keep a fuel log: at each waypoint/time check compare actual fuel remaining (gauges and totaliser) with the planned figure, and note the trend. Recalculate endurance and the fuel at destination and alternate. Cross-check gauges against fuel-used (flow × time) — a discrepancy may mean a leak, wrong flow setting, or a gauge fault.",
        "Know your MINIMUM fuel (final reserve) in time and quantity; declare 'MINIMUM FUEL' to ATC when any further delay may cause landing with less than final reserve, and MAYDAY FUEL when the calculated usable fuel on landing will be less than final reserve (CAR 91.07.12(3): declare an emergency if usable fuel is below final reserve).",
        "§ Unplanned events affecting the fuel state",
        "Stronger headwinds than forecast, lower levels assigned by ATC, holding/delays, weather deviations, icing (anti-ice use, higher power), a go-around and second approach, diversion, engine failure or depressurisation (drift-down to lower, less efficient levels), gear or flap stuck down (much higher drag), fuel leaks, incorrect leaning, and refuelling shortfalls. Plan contingency fuel and decide early when to divert.",
      ],
    },
  ],
  "C.4.13": [
    {
      heading: "Documents to be carried, flight manual, checklists, flight plan, folio, fuel record, CRS (CAR 91.03.1–91.03.7)",
      regs: ["91.03.1", "91.03.2", "91.03.3", "91.03.4", "91.03.5", "91.03.6", "91.03.7"],
      points: [
        "The regulation wording is shown below. Key points: the documents listed in 91.03.1 must be carried on board (see the exact list in the regulation text below); the AFM must be current and its limitations observed; approved checklists must be available and used; an ATS flight plan is required for the flights listed in 91.03.4 (e.g. IFR, crossing borders, in controlled airspace, as required) and must be closed on arrival; the flight folio records each flight and defects; the fuel record must be kept; and a valid certificate of release to service (CRS) must exist before flight after maintenance.",
        "§ Layout of an aircraft flight manual (typical GAMA/approved format)",
        "Section 1 General (dimensions, definitions), 2 Limitations (airspeeds, powerplant, weights, CG, manoeuvres, placards — APPROVED), 3 Emergency procedures, 4 Normal procedures, 5 Performance (charts and tables), 6 Weight & balance / equipment list, 7 Airplane & systems description, 8 Handling, servicing and maintenance, 9 Supplements (optional equipment — e.g. GNSS, autopilot, de-ice — which may add limitations). Use the manual for that serial number, kept up to date with amendments.",
      ],
    },
    {
      heading: "Minimum Equipment List (MEL) and MMEL",
      points: [
        "MASTER MINIMUM EQUIPMENT LIST (MMEL): produced by the manufacturer and approved by the state of design — lists equipment that may be inoperative for a flight under specified conditions for the aircraft TYPE.",
        "MINIMUM EQUIPMENT LIST (MEL): the operator's own list, based on (and no less restrictive than) the MMEL, tailored to its aircraft, operations and regulations, and approved by the SACAA. It lists items that may be inoperative at the start of a flight, with the number installed/required, the rectification interval category (A–D) and conditions: (O) operational procedures and (M) maintenance procedures (e.g. placard 'INOP', deactivate, secure).",
        "Operational use: at pre-flight, any defect is checked against the MEL; if the item is listed and conditions/procedures are met the aircraft may be dispatched within the rectification interval; if NOT listed (or the MEL doesn't permit), the aircraft is unairworthy and may not fly (unless a special flight permit). Items obviously required for safety (wings, engines, flight controls) are not listed. The MEL applies before take-off — once airborne, failures are handled with the AFM/QRH.",
        "Where no MEL is approved, all installed equipment required by the regulations/AFM must be serviceable (some states allow a Kinds of Operations Equipment List or approved alternative for light aircraft).",
      ],
    },
    ...aipNotam,
  ],
  "C.4.14": [
    {
      heading: "IFR altitudes — MEA, RNAV MEA, MRA, MAA, MOCA, MORA, MTA, MCA, RVSM, QFE/QNE/QNH",
      points: [
        "MEA (minimum en-route altitude): ensures obstacle clearance, navaid signal reception and ATS communication on the segment, and complies with the airspace structure.",
        "RNAV MEA: the MEA for an RNAV route segment (based on GNSS or DME/DME) — may be lower than the conventional MEA because it doesn't depend on reception of a ground navaid (DME/DME RNAV MEA does depend on DME coverage).",
        "MRA (minimum reception altitude): the lowest altitude at which an intersection/fix can be determined from the navaids that define it.",
        "MAA (maximum authorised altitude): the highest altitude usable on a segment, at which adequate reception is still assured (beyond it navaid interference may occur) or limited by airspace.",
        "MOCA (minimum obstacle clearance altitude): obstacle clearance only for the segment — navaid reception not assured.",
        "MORA (minimum off-route altitude, Jeppesen): Route MORA — 10 nm either side of the route; Grid MORA — within each grid square (1 000 ft clearance where terrain ≤ 5 000 ft, 2 000 ft where higher).",
        "MTA (minimum turning altitude): the altitude at or above which a turn may be made at a fix (e.g. on a departure, to clear obstacles in the turn area).",
        "MCA (minimum crossing altitude): the lowest altitude at which a fix must be crossed when proceeding in the direction of a higher MEA (so the aircraft is high enough before entering the segment with the higher MEA).",
        "RVSM (reduced vertical separation minima): 1 000 ft vertical separation between FL290 and FL410 inclusive (instead of 2 000 ft) for approved aircraft — requires two independent primary altimeters (within 200 ft of each other), an altitude-alerting system, an autopilot with altitude hold, and a Mode C/S transponder; operator approval; height-keeping monitoring. Non-approved aircraft are excluded or separated by 2 000 ft. Contingency procedures for turbulence/equipment failure.",
        "QFE: the pressure at aerodrome (threshold) level — altimeter reads HEIGHT above the aerodrome. QNE: the altimeter reading on the ground with standard setting 1013.2 hPa (pressure altitude) — the standard setting gives flight levels. QNH: aerodrome pressure reduced to MSL using ISA — altimeter reads ALTITUDE (aerodrome elevation on the ground).",
      ],
    },
  ],
};
