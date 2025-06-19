import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/LUNGA PRO PHOTO.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              💻 I am a passionate software developer who fell in love with programming from day one!
              I thrive on solving complex problems, writing clean and efficient code,
              and continuously expanding my skill set.
              <br />
              <br />🚀 I specialize in
              <i>
                <b className="purple"> Java, C#, React, and SQL, </b>
              </i>
              crafting scalable and efficient solutions. My expertise lies in developing modern
              <b className="purple"> web and mobile applications </b>
              that enhance user experience and streamline business processes.
              <br />
              <br />
              🎯 I have a strong interest in full-stack development, focusing on both
              <i>
                <b className="purple"> frontend and backend technologies.</b>
              </i>
              I love working with
              <b className="purple"> React.js, Node.js, TypeScript </b> and other modern JavaScript frameworks,
              ensuring that my applications are fast, responsive, and user-friendly.
              <br />
              <br />
              ✨ Beyond coding, I enjoy learning about AI-driven applications,
               cloud computing, and automation, constantly looking for ways 
               to push the boundaries of software development.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/gitLunga"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/lunga-ntshingila-9854742a9/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
