import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MdWork, MdCalendarToday, MdLocationOn, MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaCode, FaBuilding } from "react-icons/fa";
import { StaggerReveal, RevealItem } from "../ScrollReveal";

const experiences = [
  {
    company: "Malcam ICT Solutions",
    subtitle: "MICT SETA Programme",
    role: "Junior Full-Stack Developer",
    badge: "Current",
    badgeColor: "#50fa7b",
    period: "Aug 2025 – Present",
    location: "Remote",
    project: "DOJCD Connect — Enterprise Device Procurement Platform (Government Client)",
    teamNote: "3-person remote development team",
    items: [
      "Built a <strong>multi-stage approval workflow engine</strong> with real-time SLA tracking (breach, approaching, within) across Manager Review, Finance Review, and Order Placement stages using complex <strong>PostgreSQL CTEs</strong>",
      "Implemented <strong>JWT authentication</strong> with access/refresh token rotation, BCrypt password hashing, <strong>role-based access control</strong> (Admin, Manager, Finance, Approver, MTN Staff), and password reset with rate limiting",
      "Developed a complete <strong>audit trail system</strong> logging all system actions atomically within database transactions",
      "Built <strong>document management</strong> with file upload (ID, payslip, proof of residence) integrating local storage and Supabase",
      "Created an <strong>email notification service</strong> (Nodemailer) for transactional emails with fire-and-forget error isolation",
      "Built a <strong>React Native mobile app</strong> (TypeScript/Expo) for client-facing registration and application flows",
      "Developed a <strong>React admin dashboard</strong> (Material UI) with approver queues, statistics, data export (CSV/Excel), and Recharts visualisations",
      "Managed <strong>contract lifecycle, device catalogue, and procurement reporting</strong> modules",
    ],
    tech: ["Node.js", "Express.js", "PostgreSQL", "JWT", "BCrypt", "React", "React Native", "TypeScript", "Expo", "Material UI", "Supabase", "Nodemailer", "Git"],
    techColors: {
      "Node.js": "#339933", "Express.js": "#ffffff", "PostgreSQL": "#4169e1",
      "JWT": "#d63031", "BCrypt": "#6c5ce7", "React": "#61dafb",
      "React Native": "#61dafb", "TypeScript": "#3178c6", "Expo": "#000020",
      "Material UI": "#007fff", "Supabase": "#3ecf8e", "Nodemailer": "#22b573",
      "Git": "#f05032",
    },
  },
  {
    company: "ICEP",
    subtitle: null,
    role: "Junior Full-Stack Developer",
    badge: "Internship",
    badgeColor: "#c770f0",
    period: "Jul 2024 – Jun 2025",
    location: "On-site",
    project: null,
    teamNote: null,
    items: [
      "Built full-stack web applications with <strong>React frontend</strong> and <strong>Node.js / ASP.NET Core backend</strong>",
      "Developed and integrated <strong>RESTful APIs</strong> with proper validation and error handling",
      "Created <strong>database solutions</strong> using MySQL and Microsoft SQL Server",
      "Implemented <strong>Agile methodologies</strong> including sprint planning and code reviews",
      "Built a <strong>log management system</strong> with SLA tracking that improved issue resolution by 30%",
      "Developed <strong>real-time communication features</strong> including live chat and collaboration tools",
      "Implemented <strong>QR code scanning</strong> functionality for streamlined form entry",
      "Participated in <strong>testing, debugging, and production deployment</strong> processes",
    ],
    tech: ["React", "Node.js", "ASP.NET Core", "MySQL", "MSSQL", "Socket.io", "Git"],
    techColors: {
      "React": "#61dafb", "Node.js": "#339933", "ASP.NET Core": "#512bd4",
      "MySQL": "#4479a1", "MSSQL": "#cc2927", "Socket.io": "#aaaaaa", "Git": "#f05032",
    },
  },
];

function ExperienceCard({ exp, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`experience-timeline-card exp-card-${open ? "open" : "closed"}`}>
      <div className="exp-header" style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <div className="exp-icon-wrapper" style={{ borderColor: `${exp.badgeColor}40`, background: `${exp.badgeColor}12` }}>
          <MdWork size={24} style={{ color: exp.badgeColor }} />
        </div>

        <div className="exp-title-block">
          <h4 className="exp-company">
            <strong style={{ color: exp.badgeColor }}>{exp.company}</strong>
            {exp.subtitle && <span className="exp-subtitle"> · {exp.subtitle}</span>}
            <span className="exp-role"> — {exp.role}</span>
          </h4>
          <div className="exp-meta-row">
            <p className="exp-date">
              <MdCalendarToday size={13} style={{ marginRight: "5px" }} />
              {exp.period}
            </p>
            <span className="exp-location-dot">·</span>
            <p className="exp-date">
              <MdLocationOn size={13} style={{ marginRight: "4px" }} />
              {exp.location}
            </p>
          </div>
        </div>

        <div className="exp-header-right">
          <span className="exp-badge" style={{ color: exp.badgeColor, borderColor: `${exp.badgeColor}50`, background: `${exp.badgeColor}12` }}>
            {exp.badge}
          </span>
          <button className="exp-toggle-btn" aria-label="toggle">
            {open ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <div className="exp-divider" />

          {exp.project && (
            <div className="exp-project-banner">
              <FaBuilding size={13} style={{ marginRight: "7px", flexShrink: 0 }} />
              <span><strong>Project:</strong> {exp.project}</span>
              {exp.teamNote && <span className="exp-team-note">· {exp.teamNote}</span>}
            </div>
          )}

          <p className="exp-intro">
            <FaCode style={{ marginRight: "8px", color: exp.badgeColor }} />
            Key contributions:
          </p>

          <ul className="exp-list">
            {exp.items.map((item, i) => (
              <li key={i} className="exp-list-item">
                <span className="exp-bullet" style={{ color: exp.badgeColor }}>▸</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>

          <div className="exp-tech-row">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="exp-tech-badge"
                style={{
                  color: exp.techColors[t] || "#aaa",
                  borderColor: `${exp.techColors[t] || "#aaa"}45`,
                  background: `${exp.techColors[t] || "#aaa"}10`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Experience() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "40px" }}>
      <Col md={10}>
        <StaggerReveal className="exp-timeline-wrapper" stagger={0.18} delayChildren={0.05}>
          {experiences.map((exp, i) => (
            <RevealItem key={exp.company} variant="fadeLeft" className="exp-timeline-item">
              <div className="exp-timeline-line" />
              <div className="exp-timeline-dot" style={{ borderColor: exp.badgeColor, background: `${exp.badgeColor}25` }} />
              <ExperienceCard exp={exp} defaultOpen={i === 0} />
            </RevealItem>
          ))}
        </StaggerReveal>
      </Col>
    </Row>
  );
}

export default Experience;
