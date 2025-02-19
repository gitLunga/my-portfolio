import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
//import leaf from "../../Assets/Projects/leaf.png";
//import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
//import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Tshwane Find"
              description="TVH web app to manage facilities intergrated with various payment methods using APIs, and also Argumented Reality."
              ghLink="https://github.com/KISMETtakk/TshwaneFind.git"
              demoLink="https://editor.soumya-jit.tech/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Technical Support Logging System"
              description="technical Support "
              ghLink="https://github.com/soumyajit4419/Chatify"
              demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="LUNGA BASIC E-COMMERCE APP"
              description="A very simple web application for selling items online adding them to a cart."
              ghLink="https://github.com/gitLunga/basic-ecommerce-app.git"
              demoLink="https://lunga-basic-ecommerce-app.netlify.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Hotel Booking System"
              description="yyyyyyyy"
              ghLink="https://github.com/gitLunga/Hotel-Booking-System.git"
              demoLink="https://lunga-basic-hotelbooking.netlify.app"
            />
          </Col>



        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
