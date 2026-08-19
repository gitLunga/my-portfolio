import React, { useState, useMemo } from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../../components/ScrollReveal";
import { ALL_TIERS, formatZAR, STUDIO_CONTACT, buildWhatsAppLink } from "../data/packages";

// Add-ons layered on top of a base tier. Each carries its own price range so
// the running total stays an honest estimate rather than a single number
// that looks more precise than it is.
const ADD_ONS = [
  { id: "extra-pages", label: "3 extra pages", priceMin: 300, priceMax: 600 },
  { id: "seo", label: "Basic SEO setup", priceMin: 200, priceMax: 400 },
  { id: "logo", label: "Simple logo design", priceMin: 250, priceMax: 500 },
  { id: "maintenance", label: "First month of maintenance", priceMin: 150, priceMax: 600 },
];

function StudioQuote() {
  const [selectedTierId, setSelectedTierId] = useState(ALL_TIERS[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [contactInfo, setContactInfo] = useState({ name: "", detail: "" });

  const selectedTier = ALL_TIERS.find((t) => t.id === selectedTierId);

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totals = useMemo(() => {
    let min = selectedTier.priceMin;
    let max = selectedTier.priceMax;
    for (const addOnId of selectedAddOns) {
      const addOn = ADD_ONS.find((a) => a.id === addOnId);
      min += addOn.priceMin;
      max += addOn.priceMax;
    }
    return { min, max };
  }, [selectedTier, selectedAddOns]);

  const waMessage = useMemo(() => {
    const lines = [
      `Hi ${STUDIO_CONTACT.ownerName}, I'd like a quote for a website.`,
      "",
      `Package: ${selectedTier.name} (${selectedTier.category})`,
    ];
    if (selectedAddOns.length > 0) {
      const names = selectedAddOns.map((id) => ADD_ONS.find((a) => a.id === id).label);
      lines.push(`Add-ons: ${names.join(", ")}`);
    }
    lines.push(`Estimated range: ${formatZAR(totals.min)} – ${formatZAR(totals.max)}`);
    if (contactInfo.name) lines.push("", `My name: ${contactInfo.name}`);
    if (contactInfo.detail) lines.push(`Details: ${contactInfo.detail}`);
    return lines.join("\n");
  }, [selectedTier, selectedAddOns, totals, contactInfo]);

  return (
    <div className="studio-page studio-quote-page">
      <Reveal variant="fadeUp" delay={0}>
        <h1 className="studio-page-title">Get a Quote</h1>
        <p className="studio-page-subtitle">
          Pick a starting package, add anything extra you need, and see a live estimate.
          Nothing here is final — it's a starting point for a real conversation.
        </p>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.05}>
        <div className="studio-quote-step">
          <h2 className="studio-quote-step-title">1. What kind of site do you need?</h2>
          <div className="studio-quote-tier-grid">
            {ALL_TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                className={
                  "studio-quote-tier-option" +
                  (tier.id === selectedTierId ? " studio-quote-tier-option-active" : "")
                }
                onClick={() => setSelectedTierId(tier.id)}
                aria-pressed={tier.id === selectedTierId}
              >
                <span className="studio-quote-tier-option-name">{tier.name}</span>
                <span className="studio-quote-tier-option-price">
                  {formatZAR(tier.priceMin)}–{formatZAR(tier.priceMax)}
                  {tier.unit ? ` ${tier.unit}` : ""}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.1}>
        <div className="studio-quote-step">
          <h2 className="studio-quote-step-title">2. Anything extra?</h2>
          <div className="studio-quote-addon-grid">
            {ADD_ONS.map((addOn) => {
              const checked = selectedAddOns.includes(addOn.id);
              return (
                <button
                  key={addOn.id}
                  type="button"
                  className={
                    "studio-quote-addon-option" + (checked ? " studio-quote-addon-option-active" : "")
                  }
                  onClick={() => toggleAddOn(addOn.id)}
                  aria-pressed={checked}
                >
                  <span className="studio-quote-addon-check">
                    <AnimatePresence>
                      {checked && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          style={{ display: "flex" }}
                        >
                          <Check size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className="studio-quote-addon-label">{addOn.label}</span>
                  <span className="studio-quote-addon-price">
                    +{formatZAR(addOn.priceMin)}–{formatZAR(addOn.priceMax)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.15}>
        <div className="studio-quote-step">
          <h2 className="studio-quote-step-title">3. A little about you (optional)</h2>
          <div className="studio-quote-contact-grid">
            <div className="studio-quote-field">
              <label htmlFor="quote-name">Your name</label>
              <input
                id="quote-name"
                type="text"
                value={contactInfo.name}
                onChange={(e) => setContactInfo((c) => ({ ...c, name: e.target.value }))}
                placeholder="e.g. Thandiwe"
                className="form-input-custom"
              />
            </div>
            <div className="studio-quote-field">
              <label htmlFor="quote-detail">What's the project?</label>
              <input
                id="quote-detail"
                type="text"
                value={contactInfo.detail}
                onChange={(e) => setContactInfo((c) => ({ ...c, detail: e.target.value }))}
                placeholder="e.g. A site for my catering business"
                className="form-input-custom"
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.2}>
        <div className="studio-quote-summary">
          <span className="studio-quote-summary-label">Estimated range</span>
          {/* data-testid rather than matching the rendered text: JSX renders
              each {expr} as its own text node, and the tier-option buttons
              above contain the same "R600" / "R1 000" fragments, so a
              getByText("R600 – R1 000") assertion is ambiguous about which
              element it means. */}
          <span className="studio-quote-summary-price" data-testid="quote-total">
            {formatZAR(totals.min)} – {formatZAR(totals.max)}
          </span>
          <p className="studio-quote-summary-note">
            Final pricing depends on the brief — this range is a starting point, not an
            invoice.
          </p>
          <a
            href={buildWhatsAppLink(waMessage)}
            target="_blank"
            rel="noreferrer"
            className="studio-btn studio-btn-primary studio-quote-submit"
          >
            Send This to WhatsApp <ArrowRight size={18} />
          </a>
          <a href={`mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent("Website quote request")}&body=${encodeURIComponent(waMessage)}`} className="studio-quote-email-fallback">
            or email it instead
          </a>
        </div>
      </Reveal>
    </div>
  );
}

export default StudioQuote;
