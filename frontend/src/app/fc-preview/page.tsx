import { FlatTerrain, CessnaFlatSide } from "@/app/components/figures/flatCessna";

export default function Prev() {
  return (
    <div className="min-h-screen bg-zinc-950 p-6 grid gap-6 md:grid-cols-2 items-start">
      <div className="rounded-xl overflow-hidden border border-zinc-800">
        <svg viewBox="0 0 400 220" className="w-full">
          <FlatTerrain w={400} h={220} />
          <CessnaFlatSide x={230} y={90} s={1.5} rot={8} />
        </svg>
      </div>
      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-white">
        <svg viewBox="0 0 400 220" className="w-full">
          <CessnaFlatSide x={200} y={120} s={2.2} />
        </svg>
      </div>
    </div>
  );
}
