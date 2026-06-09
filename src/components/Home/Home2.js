import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/LUNGA PRO PHOTO.png";
import Tilt from "react-parallax-tilt";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Reveal, StaggerReveal, RevealItem } from "../ScrollReveal";
import { useInView } from "framer-motion";

/* ─── Animated counter ───────────────────────────────────── */
function CountUp({ target, suffix = "", duration = 1600 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView || triggered.current) return;
    triggered.current = true;

    let start = null;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="stats-value purple">
      {count}{suffix}
    </span>
  );
}

/* ─── Stats data ─────────────────────────────────────────── */
const stats = [
  { target: 1,  suffix: "+", label: "Years Experience" },
  { target: 8,  suffix: "+", label: "Projects Built" },
  { target: 2,  suffix: "×", label: "Hackathon Top 5" },
  { target: 30, suffix: "%", label: "SLA Improvement" },
];

/* ─── Component ──────────────────────────────────────────── */
function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={8} className="home-about-description">
            <Reveal variant="fadeLeft" delay={0}>
              <h1 style={{ fontSize: "2.6em" }}>
                LET ME <span className="purple"> INTRODUCE </span> MYSELF
              </h1>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.15} duration={0.7}>
              <p className="home-about-body">
                💻 I am a passionate software developer who fell in love with programming from day one!
                I thrive on solving complex problems, writing clean and efficient code,
                and continuously expanding my skill set.
                <br /><br />
                🚀 I specialize in
                <i><b className="purple"> Java, C#, React, and SQL, </b></i>
                crafting scalable and efficient solutions. My expertise spans both
                <b className="purple"> web and mobile applications </b>
                that enhance user experience and streamline business processes.
                <br /><br />
                🎯 I have a strong interest in full-stack development, focusing on both
                <i><b className="purple"> frontend and backend technologies. </b></i>
                I love working with
                <b className="purple"> React.js, Node.js, TypeScript </b> and other modern JavaScript
                frameworks, ensuring applications are fast, responsive, and user-friendly.
                <br /><br />
                ✨ Beyond coding, I enjoy exploring AI-driven applications, cloud computing,
                and automation — constantly pushing the boundaries of what software can do.
              </p>
            </Reveal>
          </Col>

          <Col md={4} className="myAvtar">
            <Reveal variant="zoomIn" delay={0.2} duration={0.8}>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.1}>
                <div className="avatar-wrapper">
                  <img src={myImg} className="img-fluid avatar-img" alt="avatar" />
                  <div className="avatar-ring" />
                </div>
              </Tilt>
            </Reveal>
          </Col>
        </Row>

        {/* Animated stats bar */}
        <StaggerReveal className="row stats-row" stagger={0.1} delayChildren={0.05}>
          {stats.map((s, i) => (
            <RevealItem key={i} variant="zoomIn" className="col-6 col-md-3 stats-col">
              <div className="stats-card">
                <CountUp target={s.target} suffix={s.suffix} duration={1700} />
                <span className="stats-label">{s.label}</span>
              </div>
            </RevealItem>
          ))}
        </StaggerReveal>

        <Row>
          <Col md={12} className="home-about-social">
            <Reveal variant="fadeUp" delay={0.1}>
              <h1>FIND ME ON</h1>
              <p>Feel free to <span className="purple">connect </span>with me</p>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.22}>
              <ul className="home-about-social-links">
                <li className="social-icons">
                  <a href="https://github.com/gitLunga" target="_blank" rel="noreferrer"
                    className="icon-colour home-social-icons" title="GitHub">
                    <AiFillGithub />
                  </a>
                </li>
                <li className="social-icons">
                  <a href="https://www.linkedin.com/in/lunga-ntshingila-9854742a9/" target="_blank" rel="noreferrer"
                    className="icon-colour home-social-icons" title="LinkedIn">
                    <FaLinkedinIn />
                  </a>
                </li>
                <li className="social-icons">
                  <a href="mailto:lungamngomezulu10@gmail.com" rel="noreferrer"
                    className="icon-colour home-social-icons" title="Email">
                    <MdEmail />
                  </a>
                </li>
              </ul>
            </Reveal>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
