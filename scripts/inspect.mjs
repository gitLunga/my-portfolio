/**
 * Dev-only page inspector. Drives the locally installed Chrome via
 * puppeteer-core to report real computed geometry and styles, so layout
 * problems are diagnosed from measurements rather than from screenshots.
 *
 * Usage:
 *   node scripts/inspect.mjs <url> [selector ...]
 */
import puppeteer from "puppeteer-core";

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];

const { existsSync } = await import("node:fs");
const executablePath = CHROME_CANDIDATES.find(existsSync);
if (!executablePath) throw new Error("No Chrome/Edge binary found");

const url = process.argv[2] ?? "http://localhost:4173/my-portfolio/";
const selectors = process.argv.slice(3);

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(`PAGEERROR: ${e.message}`));

await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500)); // let entry animations settle

const report = await page.evaluate((sels) => {
  const describe = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 60),
      rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      display: cs.display,
      visibility: cs.visibility,
      opacity: cs.opacity,
      transform: cs.transform === "none" ? "none" : cs.transform.slice(0, 40),
      overflow: cs.overflow,
      zIndex: cs.zIndex,
    };
  };

  const out = {};
  for (const sel of sels) {
    out[sel] = [...document.querySelectorAll(sel)].map(describe);
  }

  // Anything on the page that is present but invisible to a sighted user
  const invisible = [...document.querySelectorAll("body *")]
    .filter((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const hasText = el.textContent?.trim().length > 0 || el.tagName === "IMG";
      return hasText && (cs.opacity === "0" || (r.width === 0 && r.height === 0));
    })
    .slice(0, 12)
    .map((el) => `${el.tagName.toLowerCase()}.${(el.className?.baseVal ?? el.className ?? "").toString().split(" ")[0]}`);

  return { out, invisible, docHeight: document.body.scrollHeight };
}, selectors);

console.log(JSON.stringify(report, null, 2));
if (consoleErrors.length) {
  console.log("\n--- console errors ---");
  consoleErrors.slice(0, 10).forEach((e) => console.log("  " + e));
} else {
  console.log("\nNo console errors.");
}

await browser.close();
