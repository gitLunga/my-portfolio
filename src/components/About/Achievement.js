import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdEmojiEvents, MdTrendingUp } from "react-icons/md";
import { GiTrophy } from "react-icons/gi";

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
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {achievements.map((a, i) => (
        <Col md={4} className="achievement-card" key={i}>
          <div
            className="achievement-card-view"
            style={{ "--ach-color": a.color }}
          >
            <div className="achievement-icon" style={{ color: a.color }}>
              {a.icon}
            </div>
            <h5 className="achievement-title" style={{ color: a.color }}>
              {a.title}
            </h5>
            <p className="achievement-year">{a.year}</p>
            <p className="achievement-desc">{a.description}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Achievements;
