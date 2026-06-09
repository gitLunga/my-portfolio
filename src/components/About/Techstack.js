import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiGit,
  DiJava,
  DiMysql,
  DiHtml5,
  DiCss3,
  DiDocker,
} from "react-icons/di";
import {
  SiTypescript,
  SiDotnet,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiFirebase,
  SiRedux,
} from "react-icons/si";

const techData = [
  { icon: DiJava, name: "Java", color: "#f89820" },
  { icon: CgCPlusPlus, name: "C#", color: "#239120" },
  { icon: DiJavascript1, name: "JavaScript", color: "#f7df1e" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
  { icon: DiReact, name: "React", color: "#61dafb" },
  { icon: DiNodejs, name: "Node.js", color: "#339933" },
  { icon: SiRedux, name: "Redux", color: "#764abc" },
  { icon: DiHtml5, name: "HTML5", color: "#e34f26" },
  { icon: DiCss3, name: "CSS3", color: "#1572b6" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#38bdf8" },
  { icon: DiMysql, name: "MySQL", color: "#4479a1" },
  { icon: SiMongodb, name: "MongoDB", color: "#47a248" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169e1" },
  { icon: SiDotnet, name: ".NET", color: "#512bd4" },
  { icon: SiFirebase, name: "Firebase", color: "#ffca28" },
  { icon: DiDocker, name: "Docker", color: "#2496ed" },
  { icon: DiGit, name: "Git", color: "#f05032" },
];

function Techstack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techData.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const TechIcon = techData[currentIndex].icon;

  return (
    <div style={{ paddingBottom: "50px" }}>
      {/* Featured rotating tech */}
      <div className="featured-tech-wrapper">
        <h3 className="featured-tech-title">Featured Technology</h3>
        <div
          className="featured-tech-orb"
          onMouseEnter={() => setIsAutoRotating(false)}
          onMouseLeave={() => setIsAutoRotating(true)}
        >
          <div className="featured-tech-inner tech-feature-animation">
            <TechIcon
              style={{
                fontSize: "4rem",
                color: techData[currentIndex].color,
                transition: "color 0.4s",
                filter: `drop-shadow(0 0 12px ${techData[currentIndex].color}80)`,
              }}
            />
            <p className="featured-tech-name">{techData[currentIndex].name}</p>
          </div>
          <div
            className="orb-ring"
            style={{ borderColor: `${techData[currentIndex].color}40` }}
          />
        </div>

        {/* Progress dots */}
        <div className="tech-progress-dots">
          {techData.map((_, i) => (
            <button
              key={i}
              className={`tech-dot${i === currentIndex ? " tech-dot-active" : ""}`}
              onClick={() => { setCurrentIndex(i); setIsAutoRotating(false); }}
              style={i === currentIndex ? { backgroundColor: techData[i].color } : {}}
              aria-label={techData[i].name}
            />
          ))}
        </div>
      </div>

      {/* Tech Grid */}
      <Row style={{ justifyContent: "center" }}>
        {techData.map((tech) => {
          const Icon = tech.icon;
          return (
            <Col xs={4} md={2} className="tech-icons" key={tech.name}>
              <div
                className="tech-icon-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  backgroundColor: "rgba(30, 30, 50, 0.6)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(107, 114, 128, 0.4)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(55, 65, 81, 0.9)";
                  e.currentTarget.style.borderColor = tech.color;
                  e.currentTarget.style.boxShadow = `0 8px 30px -8px ${tech.color}60`;
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(30, 30, 50, 0.6)";
                  e.currentTarget.style.borderColor = "rgba(107, 114, 128, 0.4)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <Icon
                  style={{
                    fontSize: "3rem",
                    marginBottom: "0.5rem",
                    color: tech.color,
                    filter: `drop-shadow(0 0 6px ${tech.color}50)`,
                  }}
                />
                <p style={{ color: "white", fontSize: "0.8rem", fontWeight: "500", margin: 0 }}>
                  {tech.name}
                </p>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Techstack;
