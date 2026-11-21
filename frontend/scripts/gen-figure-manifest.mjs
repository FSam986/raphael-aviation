// Regenerate the figure manifest: which raster figure files actually exist in
// /public/figures. figures.tsx reads it to drop figures whose file hasn't been
// produced yet (so study shows text only, never an empty white figure box).
// Run after adding/removing figure images:  node scripts/gen-figure-manifest.mjs
import fs from "node:fs";
import path from "node:path";

const root = "public/figures";
const out = {};
for (const folder of fs.readdirSync(root)) {
  const dir = path.join(root, folder);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir)) {
    if (/\.(png|jpe?g|svg|webp)$/i.test(f)) out[`${folder}/${f}`] = 1;
  }
}
fs.writeFileSync("src/app/data/figure-manifest.json", JSON.stringify(out));
console.log(`figure-manifest.json: ${Object.keys(out).length} files`);
