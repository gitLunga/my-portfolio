import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdSpeed, MdOutlineAttachMoney, MdChatBubbleOutline } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import { Reveal, StaggerReveal, RevealItem } from "../../components/ScrollReveal";
import { PACKAGE_CATEGORIES, priceRange, STUDIO_CONTACT, buildWhatsAppLink } from "../data/packages";

const PILLARS = [
  {
    icon: MdSpeed,
    title: "Fast turnaround",
    body: "Most sites launch in days, not months — you'll see progress every step of the way.",
  },
  {
    icon: MdOutlineAttachMoney,
    title: "Fair, transparent pricing",
    body: "Every package has a clear price range up front. No surprise invoices.",
  },
  {
    icon: MdChatBubbleOutline,
    title: "WhatsApp-first",
    body: "Talk to me directly — no ticket systems, no runaround. Quick questions get quick answers.",
  },
];

function StudioHome() {
  return (
    <>
      <Container fluid className="studio-hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <Reveal variant="fadeUp" delay={0}>
                <span className="studio-hero-badge">Available for new projects</span>
                <h1 className="studio-hero-title">
                  Websites for small businesses,
                  <span className="studio-accent-text"> built fast and priced fair.</span>
                </h1>
                <p className="studio-hero-body">
                  I'm {STUDIO_CONTACT.ownerName} — a full-stack developer running Lungas Web
                  Lab on the side. This is the business half of my work: portfolio sites,
                  small e-commerce, and ongoing maintenance for real clients, kept separate
                  from my engineering portfolio on purpose.
                </p>
                <div className="studio-hero-cta-row">
                  <Link to="/studio/quote" className="studio-btn studio-btn-primary">
                    Get a Quote <HiArrowRight />
                  </Link>
                  <a
                    href={buildWhatsAppLink(`Hi ${STUDIO_CONTACT.ownerName}, I'd like to ask about a website.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="studio-btn studio-btn-outline"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </Reveal>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="studio-pillars-section">
        <StaggerReveal className="row" stagger={0.1}>
          {PILLARS.map((p) => (
            <RevealItem key={p.title} variant="fadeUp" className="col-md-4">
              <div className="studio-pillar-card">
                <div className="studio-pillar-icon">
                  <p.icon size={26} />
                </div>
                <h3 className="studio-pillar-title">{p.title}</h3>
                <p className="studio-pillar-body">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </StaggerReveal>
      </Container>

      <Container className="studio-packages-preview">
        <Reveal variant="fadeUp" delay={0}>
          <h2 className="studio-section-heading">What I build</h2>
          <p className="studio-section-subheading">
            Three tiers, starting from R100. Full pricing and what's included on the
            services page.
          </p>
        </Reveal>

        <StaggerReveal className="row" stagger={0.1}>
          {PACKAGE_CATEGORIES.map((cat) => (
            <RevealItem key={cat.id} variant="fadeUp" className="col-md-4">
              <div className="studio-category-card">
                <h3 className="studio-category-title">{cat.label}</h3>
                <ul className="studio-category-tiers">
                  {cat.tiers.map((tier) => (
                    <li key={tier.id} className="studio-category-tier">
                      <span className="studio-category-tier-name">{tier.name}</span>
                      <span className="studio-category-tier-price">{priceRange(tier)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </StaggerReveal>

        <Reveal variant="fadeUp" delay={0.1}>
          <div className="studio-packages-cta">
            <Link to="/studio/services" className="studio-btn studio-btn-outline">
              See full pricing & what's included <HiArrowRight />
            </Link>
          </div>
        </Reveal>
      </Container>

      <Container fluid className="studio-cta-banner">
        <Container>
          <Reveal variant="fadeUp" delay={0}>
            <h2 className="studio-cta-banner-title">Have a project in mind?</h2>
            <p className="studio-cta-banner-body">
              Tell me what you need — I'll get back to you the same day, usually within
              the hour.
            </p>
            <div className="studio-hero-cta-row studio-cta-banner-row">
              <Link to="/studio/quote" className="studio-btn studio-btn-primary">
                Start a Quote <HiArrowRight />
              </Link>
              <a href={`mailto:${STUDIO_CONTACT.email}`} className="studio-btn studio-btn-outline">
                Email Me
              </a>
            </div>
          </Reveal>
        </Container>
      </Container>
    </>
  );
}

export default StudioHome;
