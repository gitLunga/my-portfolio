import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdWork, MdCalendarToday } from "react-icons/md";
import { FaCode } from "react-icons/fa";

const experienceItems = [
  "Building full-stack web applications with React frontend and Node.js / ASP.NET Core backend",
  "Developing and integrating RESTful APIs with proper validation and error handling",
  "Creating database solutions using MySQL and Microsoft SQL Server",
  "Implementing Agile methodologies including sprint planning and code reviews",
  "Built a log management system with SLA tracking that improved issue resolution by 30%",
  "Developing real-time communication features including live chat and collaboration tools",
  "Implementing QR code scanning functionality for streamlined form entry",
  "Participating in testing, debugging, and production deployment processes",
];

function Experience() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "40px" }}>
      <Col md={10}>
        <div className="experience-timeline-card">
          <div className="exp-header">
            <div className="exp-icon-wrapper">
              <MdWork size={28} />
            </div>
            <div className="exp-title-block">
              <h4 className="exp-company">
                <strong className="purple">ICEP</strong>
                <span className="exp-role"> — Junior Full Stack Developer Intern</span>
              </h4>
              <p className="exp-date">
                <MdCalendarToday size={14} style={{ marginRight: "6px" }} />
                July 2024 – June 2025
              </p>
            </div>
            <span className="exp-badge">Internship</span>
          </div>

          <div className="exp-divider" />

          <p className="exp-intro">
            <FaCode style={{ marginRight: "8px", color: "#c770f0" }} />
            During my internship at ICEP, I specialized in:
          </p>

          <ul className="exp-list">
            {experienceItems.map((item, i) => (
              <li key={i} className="exp-list-item">
                <span className="exp-bullet purple">▸</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>
  );
}

export default Experience;
