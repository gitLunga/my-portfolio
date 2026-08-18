/**
 * Generates every brand raster the site serves, from one set of tokens:
 *
 *   public/og-image.png        1200x630  social share card
 *   public/icon-512.png         512x512  PWA / install prompt
 *   public/icon-192.png         192x192  PWA / Android home screen
 *   public/apple-touch-icon.png 180x180  iOS home screen
 *   public/favicon.png           64x64   browser tab
 *
 * Run: npm run brand
 *
 * The shipped favicon was 24x24 — too small for a tab on a HiDPI display and
 * far too small for the PWA manifest — and neither logo asset was square, so
 * the icons are drawn as an LN monogram rather than upscaled from a bitmap.
 */
import sharp from "sharp";
import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = (f) => resolve(__dirname, "../public", f);

/* ─── Brand tokens ─────────────────────────────────────────── */
const INK = "#140f23";
const VIOLET = "#c770f0";
const BLUE = "#5f9bf5";
const DEEP = "#7c3aed";

// librsvg resolves fonts through fontconfig — stick to faces present on
// Windows, macOS and the Linux CI runner alike.
const SANS = "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif";

/* ─── Social card ──────────────────────────────────────────── */
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="${INK}"/>
      <stop offset="55%"  stop-color="#171029"/>
      <stop offset="100%" stop-color="#0d0a18"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.22" r="0.55">
      <stop offset="0%"   stop-color="${DEEP}" stop-opacity="0.45"/>
      <stop offset="60%"  stop-color="${DEEP}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${DEEP}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${VIOLET}"/>
      <stop offset="100%" stop-color="${BLUE}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="80" y="150" width="96" height="6" rx="3" fill="url(#rule)"/>

  <text x="80" y="245" font-family="${SANS}" font-size="66" font-weight="700" fill="#f8fafc">Lunga Nhlakanipho</text>
  <text x="80" y="322" font-family="${SANS}" font-size="66" font-weight="700" fill="#f8fafc">Ntshingila</text>
  <text x="80" y="392" font-family="${SANS}" font-size="33" font-weight="600" fill="${VIOLET}">Full-Stack Developer &#183; Computer Science Graduate</text>
  <text x="80" y="452" font-family="${SANS}" font-size="25" fill="#94a3b8">React &#183; Node.js &#183; PostgreSQL &#183; ASP.NET Core &#183; React Native</text>
  <text x="80" y="540" font-family="${SANS}" font-size="23" fill="#64748b">Pretoria, South Africa</text>

  <rect x="0" y="622" width="1200" height="8" fill="url(#rule)"/>
</svg>`;

/* ─── Monogram icon ────────────────────────────────────────── */
// `size` drives every dimension so the mark stays optically identical
// from 512px down to a 16px tab favicon.
const iconSvg = (size) => {
  const r = size * 0.22; // corner radius
  const fs = size * 0.42; // cap height
  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="${DEEP}"/>
      <stop offset="100%" stop-color="${BLUE}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${r}" fill="url(#ig)"/>
  <text x="50%" y="50%" font-family="${SANS}" font-size="${fs}" font-weight="700"
        fill="#ffffff" text-anchor="middle" dominant-baseline="central"
        letter-spacing="${size * 0.01}">LN</text>
</svg>`;
};

/* ─── Emit ─────────────────────────────────────────────────── */
const targets = [
  ["og-image.png", ogSvg],
  ["icon-512.png", iconSvg(512)],
  ["icon-192.png", iconSvg(192)],
  ["apple-touch-icon.png", iconSvg(180)],
  ["favicon.png", iconSvg(64)],
];

for (const [name, svg] of targets) {
  const out = pub(name);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
  const { width, height } = await sharp(out).metadata();
  const { size } = statSync(out);
  console.log(`  ${name.padEnd(22)} ${width}x${height}  ${(size / 1024).toFixed(1)} kB`);
}

console.log("\nBrand assets regenerated.");
