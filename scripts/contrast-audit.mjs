/**
 * Walks every text-bearing element on each route, in both themes, and
 * computes the WCAG contrast ratio between its computed text color and the
 * background behind it.
 *
 * Two resolution strategies, in order:
 *   1. CSS walk - if a solid, opaque background-color is found on the
 *      element or an ancestor before hitting a background-image, use that.
 *   2. Pixel sample - for anything behind a gradient/image, take one
 *      full-page screenshot (viewport resized to the full document height,
 *      so DOM coordinates line up with image coordinates exactly) and read
 *      the actual rendered pixel just outside the element's text box.
 *
 * Strategy 2 is a heuristic (the sample point can occasionally land on
 * anti-aliased glyph edge rather than clean background) - treat its flagged
 * failures as "look at this," not as certified violations, and confirm
 * visually before treating them as real.
 *
 * Known false positive: .home-badge ("Available for Work" pill) reports
 * ~3:1 here. Its border-radius (50px) is large relative to its own height
 * (~30px), so the fixed inset that correctly samples ordinary text lands in
 * the pill's rounded-away corner instead of its fill. A dead-center sample
 * (see git history / Phase 3 notes) reads 4.83:1 - it passes. A size-aware
 * inset was tried to fix this generally and made everything else worse
 * (landed on glyph ink for short text, on icons/thumbnails for compact
 * cards) - reverted in favor of documenting this one known gap.
 *
 * Usage: node scripts/contrast-audit.mjs [baseUrl]
 */
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { existsSync } from "node:fs";

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = CHROME_CANDIDATES.find(existsSync);
if (!executablePath) throw new Error("No Chrome/Edge binary found");

const BASE = process.argv[2] || "http://localhost:4173/my-portfolio";
const ROUTES = ["/", "/about", "/project", "/resume", "/contact"];
const THEMES = ["dark", "light"];
const VIEWPORT_WIDTH = 1400;

const relLuminance = ({ r, g, b }) => {
  const lin = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

const contrastRatio = (a, b) => {
  const la = relLuminance(a);
  const lb = relLuminance(b);
  const hi = la > lb ? la : lb;
  const lo = la > lb ? lb : la;
  return (hi + 0.05) / (lo + 0.05);
};

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

const collect = async (page) =>
  page.evaluate(() => {
    const parseRGBA = (str) => {
      // color-mix() resolves through getComputedStyle as
      // "color(srgb 0.92 0.89 0.99 / 0.95)" (0-1 floats), not "rgb(...)" -
      // without this branch every color-mix() background silently failed to
      // parse and fell through to pixel-sampling, which is far less precise
      // for anything with a non-trivial border-radius (a 50px radius on a
      // ~30px-tall pill means an inset sample point can land in the
      // rounded-away corner instead of the element's actual fill).
      const colorFn = str.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/);
      if (colorFn) {
        return {
          r: parseFloat(colorFn[1]) * 255,
          g: parseFloat(colorFn[2]) * 255,
          b: parseFloat(colorFn[3]) * 255,
          a: colorFn[4] !== undefined ? parseFloat(colorFn[4]) : 1,
        };
      }
      const m = str.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const parts = m[1].split(",").map((n) => parseFloat(n));
      return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
    };

    const resolveBackground = (el) => {
      let node = el;
      while (node) {
        const cs = getComputedStyle(node);
        if (cs.backgroundImage && cs.backgroundImage !== "none") return { unresolved: true };
        const bg = parseRGBA(cs.backgroundColor);
        if (bg && bg.a > 0) {
          if (bg.a < 1) {
            const behind = resolveBackground(node.parentElement);
            if (!behind || behind.unresolved) return { unresolved: true };
            const blend = (fg, back, a) => fg * a + back * (1 - a);
            return {
              r: blend(bg.r, behind.r, bg.a),
              g: blend(bg.g, behind.g, bg.a),
              b: blend(bg.b, behind.b, bg.a),
            };
          }
          return bg;
        }
        node = node.parentElement;
      }
      return { r: 255, g: 255, b: 255 };
    };

    const isLeafText = (el) => {
      if (el.children.length > 0) {
        const inlineTags = new Set(["SPAN", "STRONG", "EM", "A", "I", "B", "SMALL", "CODE"]);
        for (const child of el.children) {
          if (!inlineTags.has(child.tagName)) return false;
        }
      }
      const text = Array.from(el.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent)
        .join("")
        .trim();
      return text.length > 1;
    };

    const resolved = [];
    const unresolved = [];
    let uid = 0;
    let skippedHoverOnly = 0;

    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (parseFloat(style.opacity) === 0) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      // Off-canvas at rest (e.g. a skip link parked above the viewport
      // until focused) is not something a sighted user can read in that
      // state, so auditing its resting position produces noise, not signal.
      if (rect.y + rect.height <= 0 || rect.x + rect.width <= 0) continue;
      if (!isLeafText(el)) continue;

      // elementFromPoint was tried here first as a generic "is this actually
      // what's painted at its own position" check, hoping it would exclude a
      // 3D-flipped card face hidden by backface-visibility. It doesn't -
      // headless Chrome still resolves hit-testing to the geometry, not the
      // paint order, so a hover-only back face kept coming back as its own
      // topmost element.
      //
      // A blanket "any ancestor has backface-visibility: hidden" check is
      // also wrong here, tempting as it looks: .flip-card-front and
      // .flip-card-back share that rule, and the front face genuinely is
      // what's rendered at rest. What actually makes .flip-card-back
      // invisible without hovering is its own unconditional
      // `transform: rotateY(180deg)` — the hover rule instead rotates the
      // *parent* .flip-card-inner, and the two 180s cancel out to face the
      // viewer. So: target the specific selector this codebase actually
      // uses for "only visible while hovered," rather than a general
      // geometric test that can't tell hidden-because-flipped-away apart
      // from hidden-because-currently-facing-the-viewer.
      if (el.closest(".flip-card-back")) { skippedHoverOnly++; continue; }

      const fg = parseRGBA(style.color);
      if (!fg) continue;
      // Deliberately transparent text (color alpha 0, distinct from the
      // element-opacity check above) is invisible on purpose — react-pdf's
      // accessible text layer overlays exactly this over its canvas render,
      // one <span> per word, so the real page rendering comes from the
      // canvas and these spans exist only for text selection/search. Text
      // with alpha 0 contributed most of the resume-page failures below,
      // reading as literal fg === bg because the sample was comparing a
      // color to itself.
      if (fg.a === 0) continue;

      const fontSize = parseFloat(style.fontSize);
      const weight = parseInt(style.fontWeight, 10) || 400;
      const isLarge = fontSize >= 24 || (fontSize >= 18.66 && weight >= 700);
      const required = isLarge ? 3.0 : 4.5;
      const label = {
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.baseVal ? el.className.baseVal : el.className || "").toString().split(" ")[0] || "(none)",
        text: el.textContent.trim().slice(0, 40),
        fg,
        required,
      };

      const bg = resolveBackground(el);
      if (bg.unresolved) {
        const id = "__contrast_" + (uid++);
        el.setAttribute("data-contrast-id", id);
        unresolved.push(Object.assign({}, label, { id, rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height } }));
      } else {
        resolved.push(Object.assign({}, label, { bg }));
      }
    }

    return { resolved, unresolved, skippedHoverOnly, pageHeight: document.documentElement.scrollHeight };
  });

const auditPage = async (url, theme) => {
  const page = await browser.newPage();
  await page.setViewport({ width: VIEWPORT_WIDTH, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.evaluateOnNewDocument((t) => localStorage.setItem("portfolio-theme", t), theme);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1000));

  // Resize the viewport to the full document height so element coordinates
  // from getBoundingClientRect() line up exactly with a single screenshot -
  // no scroll offset to reconcile.
  const { pageHeight } = await page.evaluate(() => ({
    pageHeight: document.documentElement.scrollHeight,
  }));
  await page.setViewport({ width: VIEWPORT_WIDTH, height: Math.min(pageHeight, 16000) });
  await new Promise((r) => setTimeout(r, 200));

  const collected = await collect(page);
  const resolved = collected.resolved;
  const unresolved = collected.unresolved;

  const fails = [];
  for (const item of resolved) {
    const ratio = contrastRatio(item.fg, item.bg);
    if (ratio < item.required) {
      fails.push(Object.assign({}, item, {
        ratio: Math.round(ratio * 100) / 100,
        source: "css",
        bgLabel: "rgb(" + Math.round(item.bg.r) + "," + Math.round(item.bg.g) + "," + Math.round(item.bg.b) + ")",
      }));
    }
  }

  let sampledFails = [];
  if (unresolved.length > 0) {
    const shot = await page.screenshot({ type: "png" });
    const meta = await sharp(shot).metadata();

    for (const item of unresolved) {
      // Sample inside the box's top-left corner, not above it. Above-the-box
      // seemed safer at first (line-height normally leaves clean space there
      // before the glyph ink starts) but it misses small, tightly-padded
      // elements entirely — a pill badge with little vertical margin above
      // it samples whatever's behind the badge instead of the badge itself.
      //
      // Scaling the inset up for large-border-radius pills was tried next,
      // to clear .home-badge's rounded-away corner — and made things much
      // worse everywhere else: on short text ("2+", a stat value) a larger
      // inset lands on the glyph itself rather than beside it (giving the
      // absurd fg === bg readings below), and on compact cards it wanders
      // onto a neighboring icon or thumbnail image instead of the text's own
      // background. A small fixed inset mis-samples one unusually-shaped
      // pill; a large one mis-samples dozens of ordinary elements. Reverted
      // to fixed — that single case was already confirmed by eye (see the
      // Phase 3 notes on .home-badge) rather than by this heuristic.
      const inset = 3;
      const sx = Math.min(Math.max(Math.round(item.rect.x + inset), 0), meta.width - 1);
      const sy = Math.min(Math.max(Math.round(item.rect.y + inset), 0), meta.height - 1);
      let px;
      try {
        px = await sharp(shot)
          .extract({ left: sx, top: sy, width: 1, height: 1 })
          .raw()
          .toBuffer();
      } catch (e) {
        continue;
      }
      const bg = { r: px[0], g: px[1], b: px[2] };
      const ratio = contrastRatio(item.fg, bg);
      if (ratio < item.required) {
        sampledFails.push(Object.assign({}, item, {
          ratio: Math.round(ratio * 100) / 100,
          source: "pixel-sample",
          bgLabel: "rgb(" + bg.r + "," + bg.g + "," + bg.b + ")",
        }));
      }
    }
  }

  await page.close();
  return {
    checked: resolved.length,
    unresolved: unresolved.length,
    skippedHoverOnly: collected.skippedHoverOnly,
    fails: fails.concat(sampledFails),
  };
};

let totalFails = 0;
let totalSampled = 0;
let totalSkipped = 0;
for (const route of ROUTES) {
  for (const theme of THEMES) {
    const url = BASE + route;
    const r = await auditPage(url, theme);
    const label = (route === "/" ? "home" : route.slice(1)) + " [" + theme + "]";
    console.log(
      label.padEnd(20) + " css-checked " + String(r.checked).padStart(3) + "  " +
      "pixel-sampled " + String(r.unresolved).padStart(3) + "  " +
      "skipped(hover-only) " + String(r.skippedHoverOnly).padStart(3) + "  fails " + r.fails.length
    );
    for (const f of r.fails) {
      console.log(
        "    [" + f.source + "] " + f.ratio + ":1 (need " + f.required + ":1)  <" + f.tag + "." + f.cls + ">  \"" + f.text + "\"  " +
        "fg=rgb(" + Math.round(f.fg.r) + "," + Math.round(f.fg.g) + "," + Math.round(f.fg.b) + ") on bg=" + f.bgLabel
      );
    }
    totalFails += r.fails.length;
    totalSampled += r.unresolved;
    totalSkipped += r.skippedHoverOnly;
  }
}

console.log("\n" + totalSampled + " elements resolved by pixel sampling across all runs.");
if (totalSkipped > 0) {
  console.log(
    totalSkipped + " elements skipped as hover-only reveals (.flip-card-back) - " +
    "not visible at rest, so a resting-state screenshot can't audit them. " +
    "Verified separately: see accessibleTextColor() calls in Techstack.js and " +
    "the fixed color on .flip-back-name in style.css."
  );
}
console.log("Total contrast failures: " + totalFails);
await browser.close();
process.exit(totalFails > 0 ? 1 : 0);
