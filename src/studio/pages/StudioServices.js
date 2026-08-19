import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal, StaggerReveal, RevealItem } from "../../components/ScrollReveal";
import { PACKAGE_CATEGORIES, priceRange } from "../data/packages";

function StudioServices() {
  return (
    <div className="studio-page">
      <Reveal variant="fadeUp" delay={0}>
        <h1 className="studio-page-title">Services &amp; Pricing</h1>
        <p className="studio-page-subtitle">
          Every price below is a range, not a quote — the exact number depends on pages,
          content and how much back-and-forth the brief needs. Not sure which tier fits?{" "}
          <Link to="/studio/quote">Get a personalised estimate</Link> instead.
        </p>
      </Reveal>

      {PACKAGE_CATEGORIES.map((cat) => (
        <section key={cat.id} className="studio-services-category">
          <Reveal variant="fadeUp" delay={0}>
            <h2 className="studio-services-category-heading">{cat.label}</h2>
          </Reveal>

          <StaggerReveal className="row" stagger={0.08}>
            {cat.tiers.map((tier) => (
              <RevealItem key={tier.id} variant="fadeUp" className="col-md-6">
                <div className="studio-tier-card">
                  <div className="studio-tier-card-header">
                    <h3 className="studio-tier-name">{tier.name}</h3>
                    <span className="studio-tier-pages">{tier.pages}</span>
                  </div>
                  <p className="studio-tier-price">{priceRange(tier)}</p>
                  <ul className="studio-tier-includes">
                    {tier.includes.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={16} className="studio-tier-check" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </StaggerReveal>
        </section>
      ))}

      <Reveal variant="fadeUp" delay={0}>
        <div className="studio-services-faq">
          <h2 className="studio-section-heading">Good to know</h2>
          <div className="studio-faq-grid">
            <div className="studio-faq-item">
              <h3>How do payments work?</h3>
              <p>
                50% deposit to start, the balance on delivery. For monthly maintenance,
                billing is upfront each month.
              </p>
            </div>
            <div className="studio-faq-item">
              <h3>Do you handle hosting and domains?</h3>
              <p>
                I can set these up for you, or work with hosting/domains you already own —
                whichever you prefer.
              </p>
            </div>
            <div className="studio-faq-item">
              <h3>Who owns the code?</h3>
              <p>You do. Once the final payment clears, the source and all rights are yours.</p>
            </div>
            <div className="studio-faq-item">
              <h3>What if I need something not listed here?</h3>
              <p>
                These packages cover most small-business needs, but custom builds are
                possible — <Link to="/studio/quote">tell me what you need</Link> and I'll
                give you a straight answer on scope and price.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal variant="fadeUp" delay={0}>
        <div className="studio-packages-cta">
          <Link to="/studio/quote" className="studio-btn studio-btn-primary">
            Get a Personalised Quote <ArrowRight size={18} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

export default StudioServices;
