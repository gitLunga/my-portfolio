import { accessibleTextColor, tintedBackground, DARK_SURFACE, LIGHT_SURFACE } from "./accessibleColor";

// WCAG relative luminance / contrast ratio, computed independently of the
// implementation under test so a bug in accessibleTextColor can't also hide
// itself from its own test.
function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function relLuminance({ r, g, b }) {
  const lin = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrastRatio(aHex, bHex) {
  const a = relLuminance(hexToRgb(aHex));
  const b = relLuminance(hexToRgb(bHex));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

describe("accessibleTextColor", () => {
  test("leaves an already-compliant color untouched", () => {
    // white on the dark surface already clears 4.5:1 comfortably
    expect(accessibleTextColor("#ffffff", DARK_SURFACE, 4.5)).toBe("#ffffff");
  });

  test("lightens a color that fails against a dark background", () => {
    // near-black navy — the real "Expo" badge color that measured 1.16:1
    // against a dark card in the live contrast audit
    const result = accessibleTextColor("#000020", DARK_SURFACE, 4.5);
    expect(contrastRatio(result, DARK_SURFACE)).toBeGreaterThanOrEqual(4.5);
  });

  test("darkens a color that fails against a light background", () => {
    // the studio's orange accent — measured 4.17:1 against pure white,
    // short of the 4.5:1 this call asks for
    const result = accessibleTextColor("#d94e00", LIGHT_SURFACE, 4.5);
    expect(contrastRatio(result, LIGHT_SURFACE)).toBeGreaterThanOrEqual(4.5);
  });

  test("preserves hue while adjusting lightness", () => {
    // React's brand cyan, adjusted for a light background — should still
    // read as "blue/cyan family", not swing to an unrelated hue
    const result = accessibleTextColor("#61dafb", LIGHT_SURFACE, 4.5);
    const rgb = hexToRgb(result);
    // blue channel should still dominate red for a cyan-family color
    expect(rgb.b).toBeGreaterThan(rgb.r);
  });

  test("falls back to black/white when a color can't hit the target by hue-preserving lightness alone", () => {
    // pure white has no hue (s=0) — on a white background the only
    // mathematically valid answer is to fall through to black
    const result = accessibleTextColor("#ffffff", "#ffffff", 4.5);
    expect(contrastRatio(result, "#ffffff")).toBeGreaterThanOrEqual(4.5);
  });
});

describe("tintedBackground", () => {
  test("returns the surface color unchanged at 0% alpha", () => {
    expect(tintedBackground("#f25c05", "#ffffff", 0)).toBe("#ffffff");
  });

  test("returns the tint color unchanged at 100% alpha", () => {
    expect(tintedBackground("#f25c05", "#ffffff", 1)).toBe("#f25c05");
  });

  test("blends proportionally at a fractional alpha", () => {
    // a 50% mix of black into white should land at mid-gray
    const result = tintedBackground("#000000", "#ffffff", 0.5);
    const rgb = hexToRgb(result);
    expect(rgb.r).toBeCloseTo(128, -1);
  });
});
