import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import homeLogo from "../../Assets/icon-course-fullstack.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center">
            <Col md={7} className="home-header">
              <div className="home-badge-wrapper">
                <span className="home-badge">Available for Work</span>
              </div>

              <h1 style={{ paddingBottom: 10 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> Lunga Nhlakanipho Ntshingila</strong>
              </h1>

              <div style={{ padding: "30px 50px", textAlign: "left" }}>
                <Type />
              </div>

              <div className="hero-cta-row">
                <Button
                  className="hero-btn hero-btn-primary"
                  href="https://github.com/gitLunga"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillGithub style={{ marginRight: "8px", fontSize: "1.1em" }} />
                  GitHub Profile
                </Button>
                <Button
                  className="hero-btn hero-btn-outline"
                  href="https://www.linkedin.com/in/lunga-ntshingila-9854742a9/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn style={{ marginRight: "8px", fontSize: "1em" }} />
                  LinkedIn
                </Button>
              </div>
            </Col>

            <Col md={5} className="home-logo-col">
              <div className="hero-img-wrapper">
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid hero-logo-img"
                  style={{ maxHeight: "450px" }}
                />
                <div className="hero-img-glow" />
              </div>
            </Col>
          </Row>

          <div className="scroll-hint-wrapper">
            <a href="#about" className="scroll-hint">
              <HiArrowDown className="scroll-arrow" />
            </a>
          </div>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
