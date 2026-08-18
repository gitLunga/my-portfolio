/**
 * Source of truth for Lungas Web Lab's service pricing — transcribed from
 * the studio's flyer, typos corrected ("E-COMMERSE" -> "E-Commerce",
 * "INVENTOTY" -> "Inventory", "MAINTANANCE" -> "Maintenance", "WORD PRESS"
 * -> "WordPress"). Every page that shows pricing (the studio landing page,
 * /studio/services, the quote estimator) reads from this file, so a price
 * change only ever happens in one place.
 */

export const STUDIO_CONTACT = {
  ownerName: "Lunga Nhlakanipho Ntshingila",
  phoneDisplay: "081 347 9054",
  phoneE164: "27813479054",
  email: "lungamngomezulu10@gmail.com",
};

export const PACKAGE_CATEGORIES = [
  {
    id: "basic",
    label: "Basic Websites",
    tiers: [
      {
        id: "portfolio",
        name: "Personal Portfolio",
        pages: "1–3 pages",
        priceMin: 600,
        priceMax: 1000,
        includes: ["Mobile friendly", "Contact form", "1 revision"],
      },
      {
        id: "small-business",
        name: "Small Business Site",
        pages: "5 pages",
        priceMin: 1000,
        priceMax: 2500,
        includes: ["WordPress", "Basic SEO", "WhatsApp button"],
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce Websites",
    tiers: [
      {
        id: "whatsapp-orders",
        name: "WhatsApp / Email Orders",
        pages: "Orders only, no gateway",
        priceMin: 1000,
        priceMax: 2500,
        includes: ["Product gallery", '"Order Now" WhatsApp buttons', "No payment gateway"],
      },
      {
        id: "payment-gateway",
        name: "Payment Gateway (PayFast)",
        pages: "Up to 20 products",
        priceMin: 2500,
        priceMax: 5000,
        includes: ["Cart + checkout", "Inventory basics", "PayFast integration"],
      },
    ],
  },
  {
    id: "mini",
    label: "Extra Mini Services",
    tiers: [
      {
        id: "fix-my-site",
        name: '"Fix My Site" Daily Rate',
        pages: "Per day",
        priceMin: 100,
        priceMax: 250,
        unit: "/ day",
        includes: ["Bug fixes", "Small updates", "Plugin troubleshooting"],
      },
      {
        id: "maintenance",
        name: "Monthly Maintenance",
        pages: "Ongoing",
        priceMin: 150,
        priceMax: 600,
        unit: "/ month",
        includes: ["Backups", "Security checks", "Minor edits"],
      },
    ],
  },
];

/** Flattened list — the quote estimator and services table both want this shape. */
export const ALL_TIERS = PACKAGE_CATEGORIES.flatMap((cat) =>
  cat.tiers.map((tier) => ({ ...tier, category: cat.label, categoryId: cat.id }))
);

export function formatZAR(amount) {
  return "R" + amount.toLocaleString("en-ZA");
}

export function priceRange(tier) {
  const suffix = tier.unit ? ` ${tier.unit}` : "";
  return `${formatZAR(tier.priceMin)} – ${formatZAR(tier.priceMax)}${suffix}`;
}

/** Builds a wa.me deep link with the message pre-filled from a quote summary. */
export function buildWhatsAppLink(message) {
  return `https://wa.me/${STUDIO_CONTACT.phoneE164}?text=${encodeURIComponent(message)}`;
}
