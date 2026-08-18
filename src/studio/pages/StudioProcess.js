import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import {
  MdOutlineChatBubbleOutline,
  MdOutlineDesignServices,
  MdOutlineCode,
  MdOutlineRocketLaunch,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { Reveal, StaggerReveal, RevealItem } from "../../components/ScrollReveal";

const STEPS = [
  {
    icon: MdOutlineChatBubbleOutline,
    title: "Brief",
    duration: "Day 1",
    body:
      "A short WhatsApp or call to understand what you need: pages, must-have features, examples of sites you like, and your budget range.",
  },
  {
    icon: MdOutlineDesignServices,
    title: "Design",
    duration: "Days 2–3",
    body:
      "A layout preview built around your content and brand colors, so you can see the site's shape before any real development starts.",
  },
  {
    icon: MdOutlineCode,
    title: "Build",
    duration: "Days 3–7",
    body:
      "The site gets built section by section. You'll get progress updates rather than radio silence until the big reveal.",
  },
  {
    icon: MdOutlineRocketLaunch,
    title: "Launch",
    duration: "Day 7–8",
    body:
      "Final review, any last tweaks, then the site goes live on your domain (or one I help you register).",
  },
  {
    icon: MdOutlineSupportAgent,
    title: "Support",
    duration: "Ongoing",
    body:
      "A launched site isn't the end — optional monthly maintenance covers backups, security checks and small edits as your business grows.",
  },
];

function StudioProcess() {
  return (
    <div className="studio-page">
      <Reveal variant="fadeUp" delay={0}>
        <h1 className="studio-page-title">How a Project Runs</h1>
        <p className="studio-page-subtitle">
          Five stages, start to finish. Most personal and small-business sites move
          through all five in about a week.
        </p>
      </Reveal>

      <StaggerReveal className="studio-process-timeline" stagger={0.12}>
        {STEPS.map((step, i) => (
          <RevealItem key={step.title} variant="fadeLeft" className="studio-process-step">
            <div className="studio-process-step-marker">
              <div className="studio-process-step-icon">
                <step.icon size={22} />
              </div>
              {i < STEPS.length - 1 && <div className="studio-process-step-line" />}
            </div>
            <div className="studio-process-step-body">
              <div className="studio-process-step-header">
                <h2 className="studio-process-step-title">
                  {i + 1}. {step.title}
                </h2>
                <span className="studio-process-step-duration">{step.duration}</span>
              </div>
              <p className="studio-process-step-desc">{step.body}</p>
            </div>
          </RevealItem>
        ))}
      </StaggerReveal>

      <Reveal variant="fadeUp" delay={0}>
        <div className="studio-packages-cta">
          <Link to="/studio/quote" className="studio-btn studio-btn-primary">
            Start With a Brief <HiArrowRight />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

export default StudioProcess;
