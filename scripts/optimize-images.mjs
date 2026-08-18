/**
 * Converts raster assets to WebP at display-appropriate dimensions.
 *
 *   npm run images
 *
 * The originals were full-resolution PNG screenshots (up to 1884px wide,
 * 2.6 MB each) bundled through webpack and served at ~300px in a card or
 * ~600px in the modal. PNG is also the wrong container for a screenshot with
 * photographic content. Every original stays in git history, so this is
 * reversible.
 *
 * Pass --write to modify files; default is a dry run.
 */
import sharp from "sharp";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, dirname, basename } from "node:path";

const WRITE = process.argv.includes("--write");
const ROOT = "src/Assets";

// Widths chosen from measured render sizes, doubled for HiDPI.
const RULES = [
  // Full-bleed CSS background: must stay viewport-width or `cover` will
  // upscale it and soften the whole hero.
  { match: /home-bg/i,        maxWidth: 1920, quality: 80, note: "hero background, full-bleed" },
  { match: /LUNGA PRO PHOTO/i, maxWidth: 700, quality: 82, note: "avatar, renders ~300px circle" },
  { match: /about\.png$/i,     maxWidth: 900, quality: 80, note: "about illustration" },
  { match: /portfolioLogo/i,   maxWidth: 320, quality: 88, note: "navbar mark" },
  { match: /.*/,               maxWidth: 1200, quality: 78, note: "project screenshot" },
];

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );

const targets = walk(ROOT).filter((f) => /\.(png|jpe?g)$/i.test(f));

let before = 0, after = 0;
const rows = [];

for (const src of targets) {
  const rule = RULES.find((r) => r.match.test(src));
  const out = join(dirname(src), basename(src, extname(src)) + ".webp");

  const srcSize = statSync(src).size;
  before += srcSize;

  const img = sharp(src);
  const meta = await img.metadata();
  const width = Math.min(meta.width, rule.maxWidth);

  const buf = await img
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: rule.quality, effort: 5 })
    .toBuffer();

  after += buf.length;
  rows.push([srcSize, buf.length, `${meta.width}->${width}`, src]);

  if (WRITE) {
    const { writeFileSync } = await import("node:fs");
    writeFileSync(out, buf);
  }
}

rows.sort((a, b) => b[0] - a[0]);
for (const [b, a, dim, f] of rows.slice(0, 14)) {
  console.log(
    `${(b / 1024).toFixed(0).padStart(6)} kB -> ${(a / 1024).toFixed(0).padStart(5)} kB  ` +
    `${String(dim).padEnd(12)} ${f}`
  );
}
console.log("-".repeat(70));
console.log(
  `${targets.length} images   ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(2)} MB  ` +
  `(${(100 - (after / before) * 100).toFixed(1)}% smaller)`
);
console.log(WRITE ? "\n.webp files written." : "\nDry run — pass --write to emit files.");
