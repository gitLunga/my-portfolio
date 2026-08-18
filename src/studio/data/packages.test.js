import {
  PACKAGE_CATEGORIES,
  ALL_TIERS,
  STUDIO_CONTACT,
  formatZAR,
  priceRange,
  buildWhatsAppLink,
} from "./packages";

describe("formatZAR", () => {
  test("formats a plain number with the R prefix and thousands separator", () => {
    expect(formatZAR(600)).toBe("R600");
    expect(formatZAR(1000)).toBe("R1 000");
    expect(formatZAR(5000)).toBe("R5 000");
  });
});

describe("priceRange", () => {
  test("formats a min-max range without a unit suffix", () => {
    const tier = { priceMin: 600, priceMax: 1000 };
    expect(priceRange(tier)).toBe("R600 – R1 000");
  });

  test("appends the unit when the tier has one (day-rate / monthly pricing)", () => {
    const tier = { priceMin: 100, priceMax: 250, unit: "/ day" };
    expect(priceRange(tier)).toBe("R100 – R250 / day");
  });
});

describe("ALL_TIERS", () => {
  test("flattens every category's tiers into one list", () => {
    const totalTiers = PACKAGE_CATEGORIES.reduce((sum, cat) => sum + cat.tiers.length, 0);
    expect(ALL_TIERS).toHaveLength(totalTiers);
  });

  test("every flattened tier carries its parent category label", () => {
    for (const tier of ALL_TIERS) {
      expect(typeof tier.category).toBe("string");
      expect(tier.category.length).toBeGreaterThan(0);
    }
  });

  test("tier ids are unique across all categories (the quote estimator selects by id)", () => {
    const ids = ALL_TIERS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every tier has a valid, non-negative price range", () => {
    for (const tier of ALL_TIERS) {
      expect(tier.priceMin).toBeGreaterThanOrEqual(0);
      expect(tier.priceMax).toBeGreaterThanOrEqual(tier.priceMin);
    }
  });
});

describe("buildWhatsAppLink", () => {
  test("builds a wa.me link against the studio's phone number", () => {
    const link = buildWhatsAppLink("hello");
    expect(link).toContain(`https://wa.me/${STUDIO_CONTACT.phoneE164}`);
  });

  test("URL-encodes the message, including line breaks and special characters", () => {
    const link = buildWhatsAppLink("Line one\nLine two & more");
    const url = new URL(link);
    expect(url.searchParams.get("text")).toBe("Line one\nLine two & more");
  });
});
