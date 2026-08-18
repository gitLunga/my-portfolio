/**
 * Dev-only screenshot helper. Drives the locally installed Chrome via
 * puppeteer-core.
 *
 * Usage:
 *   node scripts/shot.mjs <url> <out.png> [--reduced] [--width=1440] [--full]
 */
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = CHROME_CANDIDATES.find(existsSync);
if (!executablePath) throw new Error("No Chrome/Edge binary found");

const [url, out] = process.argv.slice(2);
const flags = process.argv.slice(4);
const arg = (n, d) => {
  const f = flags.find((x) => x.startsWith(`--${n}=`));
  return f ? Number(f.split("=")[1]) : d;
};
const has = (n) => flags.includes(`--${n}`);

const themeFlag = flags.find((x) => x.startsWith("--theme="));
const theme = themeFlag ? themeFlag.split("=")[1] : null;

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: arg("width", 1440), height: arg("height", 900) });

// The theme is read from localStorage on first paint, so it has to be seeded
// before any script on the page runs.
if (theme) {
  await page.evaluateOnNewDocument((t) => {
    localStorage.setItem("portfolio-theme", t);
  }, theme);
}

// Reduced motion also settles every entry animation instantly, which makes
// screenshots deterministic instead of racing the reveal timings.
if (has("reduced")) {
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
}

await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, has("reduced") ? 1200 : 3000));

await page.screenshot({ path: out, fullPage: has("full") });
console.log(`wrote ${out}`);
await browser.close();
