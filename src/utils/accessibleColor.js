/**
 * Brand colors (React blue, Node green, Java orange...) are fixed identity
 * marks, chosen for recognizability rather than contrast. Used directly as
 * text color they routinely fail WCAG against a themed card background —
 * several measured at 1:1 to 1.6:1 in this codebase, i.e. functionally
 * invisible.
 *
 * accessibleTextColor(hex, bgHex, minRatio) nudges a color's HSL lightness —
 * darker against a light background, lighter against a dark one — until it
 * clears minRatio against bgHex, preserving hue and saturation so it still
 * reads as "the same" brand color. Everything here is plain arithmetic on a
 * handful of static values, safe to compute at module scope once rather than
 * per render.
 */

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex({ r, g, b }) {
  const c = (v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToRgb({ h, s, l }) {
  if (s === 0) {
    const v = l * 255;
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: hue2rgb(p, q, h + 1 / 3) * 255,
    g: hue2rgb(p, q, h) * 255,
    b: hue2rgb(p, q, h - 1 / 3) * 255,
  };
}

function relLuminance({ r, g, b }) {
  const lin = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(a, b) {
  const la = relLuminance(a);
  const lb = relLuminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * @param {string} hex     brand color, e.g. "#61dafb"
 * @param {string} bgHex   the solid background it will sit on
 * @param {number} minRatio  WCAG target, e.g. 4.5 for normal text
 * @returns {string} hex color, same hue/saturation, adjusted lightness
 */
// Flattened solid approximations of --card-bg / --popup-bg over --bg-base,
// one per theme. Used only for contrast math below — if those tokens move,
// update these to match.
export const DARK_SURFACE = "#14142d";
export const LIGHT_SURFACE = "#ffffff";

/**
 * Several badge styles in this codebase paint their own background as a low
 * alpha tint of the brand color itself (e.g. `background: ${color}10`) over
 * a themed surface. That tint measurably shifts the true background's
 * luminance — using the flat surface color alone as a stand-in undershoots
 * the real number by a few tenths, which is exactly what happened here the
 * first time (several badges landed at 3.9-4.4:1 against a flat-surface
 * target of 4.5). This computes the actual blended color so the contrast
 * check is exact rather than approximated.
 *
 * @param {string} tintHex  the color providing the tint (usually the same
 *   brand color as the text)
 * @param {string} surfaceHex  the flat surface the tint sits over
 * @param {number} alpha  0-1
 */
export function tintedBackground(tintHex, surfaceHex, alpha) {
  const tint = hexToRgb(tintHex);
  const surface = hexToRgb(surfaceHex);
  const mix = (a, b) => a * alpha + b * (1 - alpha);
  return rgbToHex({
    r: mix(tint.r, surface.r),
    g: mix(tint.g, surface.g),
    b: mix(tint.b, surface.b),
  });
}

export function accessibleTextColor(hex, bgHex, minRatio = 4.5) {
  const bg = hexToRgb(bgHex);
  const base = hexToRgb(hex);
  if (contrastRatio(base, bg) >= minRatio) return hex;

  const hsl = rgbToHsl(base);
  const bgIsDark = relLuminance(bg) < 0.5;
  // Against a dark background we need a lighter mark; against a light one,
  // darker. Walk in that direction in small steps until the ratio clears.
  const step = bgIsDark ? 0.02 : -0.02;

  let l = hsl.l;
  for (let i = 0; i < 50; i++) {
    l = Math.min(1, Math.max(0, l + step));
    const candidate = hslToRgb({ h: hsl.h, s: hsl.s, l });
    if (contrastRatio(candidate, bg) >= minRatio) {
      return rgbToHex(candidate);
    }
    if (l === 0 || l === 1) break;
  }
  // Saturated out without reaching the target (can happen for colors close
  // to the background's own lightness with very low saturation) — fall back
  // to pure black/white, whichever the background calls for.
  return bgIsDark ? "#ffffff" : "#000000";
}

/**
 * Precomputes both theme variants for a color list at module load time, so
 * components don't recompute HSL math on every render. Returns the same
 * array shape with `colorDark` / `colorLight` added alongside `color`.
 */
export function withAccessibleVariants(items, { darkBg, lightBg, minRatio = 4.5 }) {
  return items.map((item) => ({
    ...item,
    colorDark: accessibleTextColor(item.color, darkBg, minRatio),
    colorLight: accessibleTextColor(item.color, lightBg, minRatio),
  }));
}
