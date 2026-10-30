"use client";

import { useState } from "react";

// On-screen reference: the CAP 697 SEP1 cruise-power tables (Fig 2.2 / 2.3).
// Values transcribed directly from the manual so students can see and INTERPOLATE
// on the app, instead of being told only to "open your CAP manual". Each table is
// tabulated every 2 000 ft within three ISA-deviation blocks (ISA−20, ISA, ISA+20);
// non-tabulated altitudes/temperatures are interpolated (Table §3.1, step d).
//
// Row = [pressAltFt, ioatC, mapInHg, pph, gph, kias, ktas]. "null" = not published
// (shaded / out-of-range cells in the manual).

type Row = [number, number, number, number, number, number, number];
interface CruiseTable {
  id: string;
  title: string;
  blocks: { isaDev: string; rows: Row[] }[];
}

const TABLES: CruiseTable[] = [
  {
    id: "2.2.1", title: "Table 2.2.1 — 25.0 in Hg / 2 500 rpm (recommended cruise, lean, 3 400 lb)",
    blocks: [
      { isaDev: "ISA−20", rows: [[0,-3,25.0,86.3,14.4,168,159],[2000,-6,25.0,89.3,14.9,168,164],[4000,-10,25.0,92.3,15.4,168,169],[6000,-14,24.1,89.8,15.0,164,170],[8000,-18,22.3,82.6,13.8,157,168],[10000,-22,20.6,76.0,12.7,150,165],[12000,-26,19.1,70.2,11.7,143,162],[14000,-30,17.7,65.5,10.9,135,158],[16000,-35,16.3,60.8,10.1,126,152]] },
      { isaDev: "ISA (0)", rows: [[0,17,25.0,82.9,13.8,163,160],[2000,14,25.0,85.6,14.3,163,165],[4000,10,25.0,88.5,14.8,163,170],[6000,6,24.1,86.1,14.4,159,171],[8000,2,22.3,79.3,13.2,152,169],[10000,-2,20.6,73.3,12.2,145,166],[12000,-6,19.1,67.8,11.3,137,162],[14000,-10,17.7,63.5,10.6,129,157],[16000,-15,16.3,59.1,9.9,120,150]] },
      { isaDev: "ISA+20", rows: [[0,37,25.0,79.5,13.3,158,161],[2000,34,25.0,82.1,13.7,158,166],[4000,30,25.0,84.7,14.1,158,171],[6000,26,24.1,82.5,13.8,154,172],[8000,22,22.3,76.2,12.7,147,169],[10000,18,20.6,70.5,11.8,140,165],[12000,14,19.1,65.5,10.9,132,161],[14000,10,17.7,61.5,10.3,123,155],[16000,5,16.3,57.5,9.6,113,146]] },
    ],
  },
  {
    id: "2.2.2", title: "Table 2.2.2 — 25.0 in Hg / 2 100 rpm (recommended cruise, lean, 3 400 lb)",
    blocks: [
      { isaDev: "ISA−20", rows: [[0,-3,25.0,63.8,10.6,148,140],[2000,-7,25.0,66.4,11.1,149,145],[4000,-11,25.0,68.9,11.5,149,150],[6000,-15,24.3,68.3,11.4,147,152],[8000,-19,22.5,63.9,10.7,139,148],[10000,-23,20.8,60.1,10.0,132,144],[12000,-27,19.3,56.7,9.5,123,139],[14000,-31,17.9,54.5,9.1,113,132],[16000,-35,16.5,52.2,8.7,95,114]] },
      { isaDev: "ISA (0)", rows: [[0,17,25.0,61.9,10.3,143,140],[2000,13,25.0,64.2,10.7,143,145],[4000,9,25.0,66.6,11.1,144,150],[6000,5,24.3,66.1,11.0,141,152],[8000,1,22.5,61.9,10.3,134,148],[10000,-3,20.8,58.5,9.8,126,143],[12000,-7,19.3,55.6,9.3,116,136],[14000,-11,17.9,53.5,8.9,103,125]] },
      { isaDev: "ISA+20", rows: [[0,37,25.0,60.1,10.0,138,140],[2000,33,25.0,62.1,10.4,138,145],[4000,29,25.0,64.4,10.7,139,150],[6000,25,24.3,63.9,10.7,136,151],[8000,21,22.5,60.2,10.0,128,147],[10000,17,20.8,56.8,9.5,119,141],[12000,13,19.3,54.5,9.1,108,131]] },
    ],
  },
  {
    id: "2.2.3", title: "Table 2.2.3 — 23.0 in Hg / 2 300 rpm (recommended cruise, lean, 3 400 lb)",
    blocks: [
      { isaDev: "ISA−20", rows: [[0,-3,23.0,67.6,11.3,152,144],[2000,-7,23.0,69.7,11.6,152,149],[4000,-11,23.0,72.1,12.0,153,154],[6000,-15,23.0,74.4,12.4,153,158],[8000,-18,22.4,73.8,12.3,150,160],[10000,-23,20.7,68.4,11.4,143,157],[12000,-27,19.2,63.8,10.6,135,153],[14000,-31,17.8,60.0,10.0,127,148],[16000,-35,16.4,56.3,9.4,117,141]] },
      { isaDev: "ISA (0)", rows: [[0,17,23.0,65.4,10.9,147,145],[2000,13,23.0,67.4,11.2,147,149],[4000,9,23.0,69.4,11.6,148,154],[6000,5,23.0,71.7,12.0,148,159],[8000,2,22.4,71.1,11.9,145,160],[10000,-3,20.7,66.2,11.0,137,157],[12000,-7,19.2,61.8,10.3,129,152],[14000,-11,17.8,58.5,9.8,120,146],[16000,-15,16.4,55.3,9.2,109,137]] },
      { isaDev: "ISA+20", rows: [[0,37,23.0,63.2,10.5,142,145],[2000,33,23.0,65.1,10.9,143,149],[4000,29,23.0,67.1,11.2,143,154],[6000,25,23.0,69.0,11.5,142,158],[8000,22,22.4,68.5,11.4,140,160],[10000,17,20.7,64.0,10.7,132,156],[12000,13,19.2,60.0,10.0,123,151],[14000,9,17.8,57.1,9.5,113,142]] },
    ],
  },
  {
    id: "2.3.1", title: "Table 2.3.1 — 21.0 in Hg / 2 100 rpm (economy cruise, lean, 3 400 lb)",
    blocks: [
      { isaDev: "ISA−20", rows: [[0,-4,21.0,52.7,8.8,126,120],[2000,-8,21.0,54.0,9.0,128,125],[4000,-11,21.0,55.4,9.2,130,130],[6000,-15,21.0,56.9,9.5,131,136],[8000,-19,21.0,58.9,9.8,132,141],[10000,-23,20.8,60.1,10.0,132,144],[12000,-27,19.3,56.7,9.5,123,139],[14000,-31,17.9,54.5,9.1,113,132],[16000,-35,16.5,52.2,8.7,95,114]] },
      { isaDev: "ISA (0)", rows: [[0,16,21.0,51.8,8.6,120,118],[2000,12,21.0,53.1,8.9,123,124],[4000,9,21.0,54.4,9.1,124,129],[6000,5,21.0,55.7,9.3,125,134],[8000,1,21.0,57.3,9.6,126,140],[10000,-3,20.8,58.5,9.8,126,143],[12000,-7,19.3,55.6,9.3,116,137],[14000,-11,17.9,53.5,8.9,103,125]] },
      { isaDev: "ISA+20", rows: [[0,36,21.0,50.8,8.5,114,115],[2000,32,21.0,52.1,8.7,116,121],[4000,29,21.0,53.4,8.9,118,127],[6000,25,21.0,54.7,9.1,119,132],[8000,21,21.0,55.9,9.3,120,137],[10000,17,20.8,56.8,9.5,119,141],[12000,13,19.3,54.5,9.1,108,131]] },
    ],
  },
];

const COLS = ["Press Alt (ft)", "IOAT °C", "MAP in Hg", "FF PPH", "FF GPH", "KIAS", "KTAS"];

export function CruiseTables() {
  const [active, setActive] = useState(TABLES[0].id);
  const table = TABLES.find((t) => t.id === active)!;

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
      <div className="text-sm text-white font-semibold mb-1">CAP 697 SEP1 — Cruise-Power Reference Tables</div>
      <div className="text-xs text-zinc-400 mb-3">
        Transcribed from the manual (Fig 2.2 / 2.3). Read directly at a tabulated altitude & ISA block;
        <span className="text-zinc-200"> interpolate</span> between rows (altitude) or blocks (temperature) for in-between values.
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {TABLES.map((t) => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${active === t.id ? "bg-sky-500/15 border-sky-500/40 text-sky-200" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>
            {t.id}
          </button>
        ))}
      </div>

      <div className="text-xs text-zinc-300 font-medium mb-2">{table.title}</div>
      <div className="overflow-x-auto rounded-lg border border-zinc-900">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-900/70">
              <th className="text-left px-2 py-1.5 text-zinc-500 font-medium">ISA dev</th>
              {COLS.map((c) => <th key={c} className="text-right px-2 py-1.5 text-zinc-500 font-medium whitespace-nowrap">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {table.blocks.map((b) => (
              b.rows.map((r, ri) => (
                <tr key={`${b.isaDev}-${r[0]}`} className={ri === 0 ? "border-t-2 border-zinc-700" : "border-t border-zinc-900"}>
                  <td className="px-2 py-1 text-sky-300/80 whitespace-nowrap">{ri === 0 ? b.isaDev : ""}</td>
                  {r.map((v, ci) => (
                    <td key={ci} className="text-right px-2 py-1 text-zinc-200 tabular-nums whitespace-nowrap">
                      {ci === 0 ? v.toLocaleString() : ci === 1 ? (v > 0 ? `+${v}` : v) : v.toFixed(ci >= 3 && ci <= 4 ? 1 : ci === 2 ? 1 : 0)}
                    </td>
                  ))}
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-[10px] text-zinc-600 mt-2">
        Reference data for study/interpolation practice. Confirm against your own CAP 697 in the exam. Shaded/out-of-range cells are omitted.
      </div>
    </div>
  );
}
