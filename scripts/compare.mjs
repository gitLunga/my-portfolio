/**
 * Compares two screenshot folders captured by scripts/baseline.sh and reports
 * the share of pixels that changed. Used to check a refactor kept visual
 * parity rather than trusting a spot check.
 *
 *   node scripts/compare.mjs before after
 *
 * Images are compared at a reduced, uniform size so that a few pixels of
 * layout drift don't drown out real regressions.
 */
import sharp from "sharp";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.env.SHOT_DIR;
if (!root) throw new Error("SHOT_DIR must be set");

const [aLabel, bLabel] = process.argv.slice(2);
const aDir = join(root, aLabel);
const bDir = join(root, bLabel);

const W = 400; // comparison resolution
const THRESHOLD = 12; // per-channel delta counted as "changed"

const rows = [];

for (const file of readdirSync(aDir).filter((f) => f.endsWith(".png"))) {
  const bPath = join(bDir, file);
  if (!existsSync(bPath)) {
    rows.push([file, "MISSING in " + bLabel, ""]);
    continue;
  }

  const load = (p) =>
    sharp(p).resize(W, null, { fit: "inside" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });

  const [a, b] = await Promise.all([load(join(aDir, file)), load(bPath)]);

  // Different heights mean layout changed; compare the overlapping region and
  // flag the height delta separately.
  const h = Math.min(a.info.height, b.info.height);
  const len = W * h * 3;

  let changed = 0;
  for (let i = 0; i < len; i += 3) {
    if (
      Math.abs(a.data[i] - b.data[i]) > THRESHOLD ||
      Math.abs(a.data[i + 1] - b.data[i + 1]) > THRESHOLD ||
      Math.abs(a.data[i + 2] - b.data[i + 2]) > THRESHOLD
    ) changed++;
  }

  const pct = ((changed / (len / 3)) * 100).toFixed(2);
  const heightNote =
    a.info.height === b.info.height ? "" : `height ${a.info.height}->${b.info.height}`;
  rows.push([file, `${pct}%`, heightNote]);
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad("file", 24) + pad("changed", 10) + "notes");
console.log("-".repeat(60));
for (const [f, p, n] of rows) console.log(pad(f, 24) + pad(p, 10) + n);
