
import React, { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { CgCPlusPlus } from "react-icons/cg"
import { DiJavascript1, DiReact, DiNodejs, DiGit, DiJava, DiCisco, DiMysql } from "react-icons/di"

// No framer-motion import to avoid errors
// We'll use CSS animations and React state instead

function Techstack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  const techData = [
    { icon: DiJava, name: "Java", color: "#f89820" },
    { icon: CgCPlusPlus, name: "C++", color: "#00599c" },
    { icon: DiJavascript1, name: "JavaScript", color: "#f7df1e" },
    { icon: DiMysql, name: "MySQL", color: "#4479a1" },
    { icon: DiNodejs, name: "Node.js", color: "#339933" },
    { icon: DiReact, name: "React", color: "#61dafb" },
    { icon: DiCisco, name: "Cisco", color: "#1ba0d7" },
    { icon: DiGit, name: "Git", color: "#f05032" },
  ]

  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techData.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isAutoRotating, techData.length])

  return (
    <div style={{ paddingBottom: "50px" }}>
      {/* Featured Tech - Auto Rotating */}
      <div style={{ marginBottom: "60px", textAlign: "center" }}>
        <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", color: "white" }}>
          Featured Technology
        </h3>
        <div
          style={{
            position: "relative",
            margin: "0 auto",
            width: "128px",
            height: "128px",
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsAutoRotating(false)}
          onMouseLeave={() => setIsAutoRotating(true)}
        >
          <div
            className="tech-feature-animation"
            style={{
              position: "absolute",
              inset: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                marginBottom: "0.5rem",
                color: techData[currentIndex].color,
                transition: "color 0.3s",
              }}
            >
              {React.createElement(techData[currentIndex].icon)}
            </div>
            <p style={{ color: "white", fontWeight: "500", margin: 0 }}>{techData[currentIndex].name}</p>
          </div>
        </div>
      </div>

      {/* Tech Grid */}
      <Row style={{ justifyContent: "center" }}>
        {techData.map((tech, index) => (
          <Col xs={4} md={2} className="tech-icons" key={tech.name}>
            <div
              className="tech-icon-hover"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(55, 65, 81, 0.5)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(75, 85, 99, 0.5)",
                transition: "all 0.3s",
                cursor: "pointer",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(55, 65, 81, 0.8)"
                e.currentTarget.style.borderColor = "rgba(107, 114, 128, 1)"
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${tech.color}40`
                e.currentTarget.style.transform = "scale(1.1) rotate(5deg)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(55, 65, 81, 0.5)"
                e.currentTarget.style.borderColor = "rgba(75, 85, 99, 0.5)"
                e.currentTarget.style.boxShadow = "none"
                e.currentTarget.style.transform = "scale(1) rotate(0)"
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "0.5rem",
                  color: tech.color,
                  transition: "all 0.3s",
                }}
                className="tech-icon"
              >
                {React.createElement(tech.icon)}
              </div>
              <p
                style={{
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  margin: 0,
                  transition: "color 0.3s",
                }}
              >
                {tech.name}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Techstack
