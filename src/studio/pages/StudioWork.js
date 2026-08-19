import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, StaggerReveal, RevealItem } from "../../components/ScrollReveal";
import LottiePlayer from "../components/LottiePlayer";
import comingSoonAnimation from "../assets/lottie/coming-soon.json";
import { CLIENT_WORK } from "../data/clientWork";
import { STUDIO_CONTACT, buildWhatsAppLink } from "../data/packages";

function StudioWork() {
  return (
    <div className="studio-page">
      <Reveal variant="fadeUp" delay={0}>
        <h1 className="studio-page-title">Client Work</h1>
        <p className="studio-page-subtitle">
          A look at what I've built for real businesses — separate from the engineering
          portfolio, because this is about the client's outcome, not the tech stack.
        </p>
      </Reveal>

      {CLIENT_WORK.length === 0 ? (
        <Reveal variant="fadeUp" delay={0.1}>
          <div className="studio-work-empty">
            <LottiePlayer animationData={comingSoonAnimation} className="studio-work-empty-lottie" />
            <h2>Case studies coming soon</h2>
            <p>
              Lungas Web Lab is newly public — client projects will be added here as they
              launch, with the client's permission. In the meantime,{" "}
              <a
                href={buildWhatsAppLink(
                  `Hi ${STUDIO_CONTACT.ownerName}, do you have examples of past client work I could see?`
                )}
                target="_blank"
                rel="noreferrer"
              >
                ask me directly on WhatsApp
              </a>{" "}
              — I'm happy to walk you through recent work.
            </p>
          </div>
        </Reveal>
      ) : (
        <StaggerReveal className="row" stagger={0.1}>
          {CLIENT_WORK.map((project) => (
            <RevealItem key={project.id} variant="fadeUp" className="col-md-6">
              <div className="studio-work-card">
                {project.imgPath && (
                  <img src={project.imgPath} alt={`${project.clientName} website`} className="studio-work-img" />
                )}
                <div className="studio-work-card-body">
                  <span className="studio-work-industry">{project.industry}</span>
                  <h3 className="studio-work-client">{project.clientName}</h3>
                  <p className="studio-work-summary">{project.summary}</p>
                  {project.outcome && <p className="studio-work-outcome">{project.outcome}</p>}
                  {project.testimonial && (
                    <blockquote className="studio-work-testimonial">
                      "{project.testimonial.quote}"
                      <cite>— {project.testimonial.author}</cite>
                    </blockquote>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="studio-work-link">
                      Visit site <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </StaggerReveal>
      )}

      <Reveal variant="fadeUp" delay={0}>
        <div className="studio-packages-cta">
          <Link to="/studio/quote" className="studio-btn studio-btn-primary">
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

export default StudioWork;
