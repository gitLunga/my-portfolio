import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Container fluid className="footer">
      <Row className="footer-inner">
        <Col md={4} className="footer-brand-col">
          <h4 className="footer-name purple">Lunga.dev</h4>
          <p className="footer-tagline">Building digital experiences that matter.</p>
        </Col>

        <Col md={4} className="footer-links-col">
          <ul className="footer-nav-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/project" className="footer-link">Projects</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </Col>

        <Col md={4} className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a href="https://github.com/gitLunga" style={{ color: "white" }} target="_blank" rel="noopener noreferrer" title="GitHub">
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a href="https://www.linkedin.com/in/lunga-ntshingila-9854742a9/" style={{ color: "white" }} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a href="https://www.instagram.com/lunga.mngomezulu" style={{ color: "white" }} target="_blank" rel="noopener noreferrer" title="Instagram">
                <AiFillInstagram />
              </a>
            </li>
            <li className="social-icons">
              <a href="mailto:lungamngomezulu10@gmail.com" style={{ color: "white" }} rel="noopener noreferrer" title="Email">
                <MdEmail />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="footer-copyright">
          <p>
            © {year} <span className="purple">Lunga Nhlakanipho Ntshingila</span>. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
