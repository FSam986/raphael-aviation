// SACAA General Radiotelephony Operator's Certificate — theoretical-knowledge
// syllabus. Source of truth: Appendix 1.5 A to SA-CATS (Syllabus of Theoretical
// Knowledge for the General Radiotelephony Operator's Certificate Examination,
// aeroplane & helicopter). Aspect numbering GR1–GR9 mirrors that appendix.
// A single-subject rating in the Ratings division (alongside the IR).
// examQuestions/passPercent are SA-CATS 61 exam-format placeholders.

import type { SyllabusSubject } from "@/app/data/sacaa-syllabus";

const sec = (id: string, title: string, topics: string[]) => ({
  id,
  title,
  items: topics.map((t, i) => ({ id: `${id}.${String.fromCharCode(97 + i)}`, topic: t })),
});

export const GR_SYLLABUS: SyllabusSubject[] = [
  {
    id: "general-radiotelephony",
    code: "RTF",
    title: "General Radiotelephony",
    examQuestions: 40,
    passPercent: 75,
    sections: [
      sec("GR1", "Basic Radio Theory", [
        "Electromagnetic waves — frequency, wavelength, cycle, phase, amplitude; frequency bands; sidebands; bandwidth; carrier, modulation/demodulation; AM, FM, pulse modulation",
        "Antennas — characteristics, polarisation, polar diagram, types",
        "Wave propagation — ground/direct/sky waves, ionosphere, critical angle, skip distance, dead space, refraction, fading, factors affecting propagation",
      ]),
      sec("GR2", "Principles of Radio Operation", [
        "Basic principles of operation of VHF radios",
        "VHF frequency band",
        "Factors affecting reception & transmission range of VHF radios",
        "Basic principles of operation of HF radios",
        "HF frequency band",
        "Factors affecting reception & transmission range of HF radios",
      ]),
      sec("GR3", "Airspace", [
        "Air traffic services — objectives; ATC, advisory, flight information, alerting, AFIS",
        "ICAO airspace classification & associated air traffic services",
        "Airspace structure — FIRs, controlled (ATZ/CTR/TMA/CTA/airways), uncontrolled, danger/restricted/prohibited, SRAs",
        "Recognition of airspace / classes of airspace on aeronautical charts",
      ]),
      sec("GR4", "SA Civil Aviation Regulations (Part 91)", [
        "Mandatory radio communication in controlled airspace",
        "Mandatory radio communication in advisory airspace",
        "Compliance with rules of the air and air traffic control clearances",
        "Signals (ground/visual signals & markings)",
      ]),
      sec("GR5", "Radiotelephony Phraseology & Procedures", [
        "Time (UTC), Morse code, standard abbreviations, ATU/ATS call signs",
        "Test procedures & readability scale; listening out & establishing contact",
        "Acknowledgement, corrections & repetitions, common phraseology",
        "Categories of messages & order of priority; relaying messages",
        "TIBA & IATA IFBP (AFI region) procedures",
        "Weather information (ATIS) & reports (PIREPs)",
        "Transponder use & procedures; TCAS/ACAS phraseology; Q-codes",
      ]),
      sec("GR6", "Wake Turbulence", [
        "Categories",
        "Separation & phraseology",
        "Application",
      ]),
      sec("GR7", "Filing of Flight Plans & Search and Rescue (SAR)", [
        "Applicability & filing requirements",
        "Procedures for submission of a flight plan",
        "Completion of flight plans",
        "Application of Search and Rescue (SAR) elements",
      ]),
      sec("GR8", "Emergency & Urgency Phraseology & Procedures", [
        "Identification & interception of aircraft; the 5 golden rules",
        "VHF direction-finding (VDF); distress/urgency procedures & signals",
        "SAR guard frequencies; MAYDAY (distress) & PAN (urgency) calls",
        "Emergency Locator Transmitter (ELT); survivor action",
      ]),
      sec("GR9", "Radio Communications Failure (RCF)", [
        "Basic fault-finding actions following suspected RCF",
        "RCF procedures (VFR in VMC)",
        "Transmitting blind",
      ]),
    ],
  },
];
