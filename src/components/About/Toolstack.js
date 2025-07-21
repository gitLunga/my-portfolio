"use client"

import React, { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { SiVisualstudiocode, SiPostman, SiSlack, SiMysql, SiSwagger, SiAndroidstudio } from "react-icons/si"

// No framer-motion import to avoid errors
// We'll use CSS animations and React state instead

function Toolstack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  const toolsData = [
    { icon: SiMysql, name: "MySQL", color: "#4479a1" },
    { icon: SiVisualstudiocode, name: "VS Code", color: "#007acc" },
    { icon: SiPostman, name: "Postman", color: "#ff6c37" },
    { icon: SiSlack, name: "Slack", color: "#4a154b" },
    { icon: SiSwagger, name: "Swagger", color: "#85ea2d" },
    { icon: SiAndroidstudio, name: "Android Studio", color: "#3ddc84" },
  ]

  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % toolsData.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [isAutoRotating, toolsData.length])

  return (
    <div style={{ paddingBottom: "50px" }}>
      {/* Featured Tool - Auto Rotating */}
      <div style={{ marginBottom: "60px", textAlign: "center" }}>
        <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", color: "white" }}>Featured Tool</h3>
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
            className="tool-feature-animation"
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
                color: toolsData[currentIndex].color,
                transition: "color 0.3s",
              }}
            >
              {React.createElement(toolsData[currentIndex].icon)}
            </div>
            <p style={{ color: "white", fontWeight: "500", margin: 0 }}>{toolsData[currentIndex].name}</p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <Row style={{ justifyContent: "center" }}>
        {toolsData.map((tool, index) => (
          <Col xs={4} md={2} className="tech-icons" key={tool.name}>
            <div
              className="tool-icon-hover"
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
                e.currentTarget.style.boxShadow = `0 15px 35px -10px ${tool.color}40`
                e.currentTarget.style.transform = "scale(1.1) rotate(10deg)"
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
                  color: tool.color,
                  transition: "all 0.3s",
                }}
                className="tool-icon"
              >
                {React.createElement(tool.icon)}
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
                {tool.name}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Toolstack
