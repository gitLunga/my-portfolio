import React from "react";
import { MdEmojiEvents, MdTrendingUp } from "react-icons/md";
import { GiTrophy } from "react-icons/gi";
import { StaggerReveal, RevealItem } from "../ScrollReveal";

const achievements = [
  {
    icon: <MdEmojiEvents size={36} />,
    title: "ICEP Helping Hand Award",
    year: "2024",
    description: "Recognized for exceptional contribution to team projects and outstanding collaboration efforts within the organization.",
    color: "#c770f0",
  },
  {
    icon: <GiTrophy size={36} />,
    title: "2× Hackathon Top 5",
    year: "2023 & 2024",
    description: "Achieved top 5 positions in competitive hackathons two years consecutively, demonstrating strong problem-solving and rapid prototyping skills.",
    color: "#ffd700",
  },
  {
    icon: <MdTrendingUp size={36} />,
    title: "Log Management System",
    year: "2024–2025",
    description: "Built a production SLA tracking system that improved issue resolution rates by over 30%, directly impacting business performance.",
    color: "#50fa7b",
  },
];

function Achievements() {
  return (
    <StaggerReveal className="row" style={{ justifyContent: "center", paddingBottom: "50px" }} stagger={0.13} delayChildren={0.05}>
      {achievements.map((a, i) => (
        <RevealItem key={i} variant="zoomIn" className="col-md-4 achievement-card">
          <div className="achievement-card-view" style={{ "--ach-color": a.color }}>
            <div className="achievement-icon" style={{ color: a.color }}>{a.icon}</div>
            <h5 className="achievement-title" style={{ color: a.color }}>{a.title}</h5>
            <p className="achievement-year">{a.year}</p>
            <p className="achievement-desc">{a.description}</p>
          </div>
        </RevealItem>
      ))}
    </StaggerReveal>
  );
}

export default Achievements;
