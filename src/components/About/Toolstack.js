import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { SiVisualstudiocode, SiPostman, SiSlack, SiMysql, SiSwagger, SiAndroidstudio } from "react-icons/si";

// Hoisted: this list never changes, so rebuilding it every render only served
// to make the rotation effect's dependencies look unstable.
const TOOLS = [
  { icon: SiMysql, name: "MySQL", color: "#4479a1" },
  { icon: SiVisualstudiocode, name: "VS Code", color: "#007acc" },
  { icon: SiPostman, name: "Postman", color: "#ff6c37" },
  { icon: SiSlack, name: "Slack", color: "#8e5b90" },
  { icon: SiSwagger, name: "Swagger", color: "#85ea2d" },
  { icon: SiAndroidstudio, name: "Android Studio", color: "#3ddc84" },
];

const ROTATE_MS = 2500;

function Toolstack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TOOLS.length);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const featured = TOOLS[currentIndex];

  return (
    <div className="toolstack">
      {/* Featured tool — rotates until hovered */}
      <div className="toolstack-featured">
        <h3 className="toolstack-featured-title">Featured Tool</h3>
        <div
          className="toolstack-featured-stage"
          onMouseEnter={() => setIsAutoRotating(false)}
          onMouseLeave={() => setIsAutoRotating(true)}
        >
          <div className="tool-feature-animation toolstack-featured-inner">
            <div
              className="toolstack-featured-icon"
              style={{ color: featured.color }}
            >
              {React.createElement(featured.icon)}
            </div>
            <p className="toolstack-featured-name">{featured.name}</p>
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <Row style={{ justifyContent: "center" }}>
        {TOOLS.map((tool) => (
          <Col xs={4} md={2} className="tech-icons" key={tool.name}>
            {/* The brand colour is passed as a custom property so the hover
                glow can be expressed in CSS rather than four JS handlers. */}
            <div className="tool-card" style={{ "--tool-color": tool.color }}>
              <div className="tool-card-icon">{React.createElement(tool.icon)}</div>
              <p className="tool-card-name">{tool.name}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Toolstack;
