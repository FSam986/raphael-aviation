// Which South African Civil Aviation Regulations (full text in sa-car.json) belong
// to which syllabus section. `subparts` narrows a Part to the relevant subparts
// (by title prefix); omitted = the whole Part. Source: SACAA CPL Air Law
// compilation of the CARs (the regulations reproduced as written).
export interface RegRef { part: number; subparts?: string[] }

export const REG_MAP: Record<string, RegRef[]> = {
  // CPL Air Law (A.3)
  "A.3.1": [{ part: 1 }],
  "A.3.2": [{ part: 12 }],
  "A.3.4": [{ part: 61 }],
  "A.3.5": [{ part: 67 }],
  "A.3.6": [{ part: 91 }],
  "A.3.7": [{ part: 92 }],
  "A.3.8": [{ part: 93 }],
  "A.3.10": [{ part: 121 }],
  "A.3.12": [{ part: 135 }],
  "A.3.13": [{ part: 139 }],
  "A.3.15": [{ part: 185 }],
  // PPL Air Law (5.x)
  "5.1": [{ part: 1 }],
  "5.2": [{ part: 12 }],
  "5.3": [{ part: 61, subparts: ["Subpart 1", "Subpart 9"] }],
  "5.4": [{ part: 67 }],
  "5.5": [{ part: 91 }],
  "5.6": [{ part: 139 }],
  // IR — SA CARs: definitions, instrument rating, operating rules
  "C.3.1": [{ part: 1 }, { part: 61, subparts: ["Subpart 11"] }, { part: 91 }],
  // General Radiotelephony — Part 91 (radio communication, rules of the air)
  GR4: [{ part: 91 }],
};

/** Regulation sections not available in the supplied compilation (shown honestly in the UI). */
export const REG_MISSING: Record<string, string> = {
  "A.3.3": "CAR Part 43 (General Maintenance Rules)",
  "A.3.14": "CAR Part 172 / SA-CATS 172 (Airspace & Air Traffic Services)",
};
