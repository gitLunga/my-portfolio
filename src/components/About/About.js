import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import Achievement from "./Achievement";
import Experience from "./Experience";
import { Reveal } from "../ScrollReveal";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col md={7} style={{ justifyContent: "center", paddingTop: "30px", paddingBottom: "50px" }}>
            <Reveal variant="fadeLeft" delay={0}>
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                Know Who <strong className="purple">I'M</strong>
              </h1>
              <Aboutcard />
            </Reveal>
          </Col>
          <Col md={5} style={{ paddingTop: "120px", paddingBottom: "50px" }} className="about-img">
            <Reveal variant="fadeRight" delay={0.15} duration={0.8}>
              <img src={laptopImg} alt="about" className="img-fluid" />
            </Reveal>
          </Col>
        </Row>

        <Reveal variant="blurUp" delay={0}>
          <h1 className="project-heading">
            Professional <strong className="purple">Skillset</strong>
          </h1>
        </Reveal>
        <Techstack />

        <Reveal variant="blurUp" delay={0}>
          <h1 className="project-heading">
            <strong className="purple">Tools</strong> I use
          </h1>
        </Reveal>
        <Toolstack />

        <Reveal variant="blurUp" delay={0}>
          <h1 className="project-heading">
            <strong className="purple">Professional Experience</strong>
          </h1>
        </Reveal>
        <Experience />

        <Reveal variant="blurUp" delay={0}>
          <h1 className="project-heading">
            <strong className="purple">Achievements</strong>
          </h1>
        </Reveal>
        <Achievement />
      </Container>
    </Container>
  );
}

export default About;
