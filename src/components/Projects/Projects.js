import React, { useState, useEffect, useCallback } from "react"
import { Container, Row, Col } from "react-bootstrap"
import ProjectCard from "../Projects/ProjectCards"
import Particle from "../Particle"
import { BsGithub } from "react-icons/bs"
import { CgWebsite } from "react-icons/cg"
import { MdClose, MdChevronLeft, MdChevronRight, MdCheckCircle } from "react-icons/md"

import tsls from "../../Assets/Screenshot (162).png"
import eComPic from "../../Assets/Projects/e -commerce pic.png"
import hotelBookingPic from "../../Assets/Projects/hotelBookingPic.png"
import TshwaneFindPic from "../../Assets/Projects/TshwaneFindPic.jpg"

import ninoServices  from "../../Assets/Projects/nino/nino-services.png"
import ninoServices2 from "../../Assets/Projects/nino/nino-services2.png"
import ninoServices3 from "../../Assets/Projects/nino/nino-services3.png"
import ninoServices4 from "../../Assets/Projects/nino/nino-services4.png"
import ninoServices5 from "../../Assets/Projects/nino/nino-services5.png"
import ninoServices6 from "../../Assets/Projects/nino/nino-services6.png"
import ninoServices7 from "../../Assets/Projects/nino/nino-services7.png"

import djmega  from "../../Assets/Projects/djmega/mega-services.png"
import djmega2 from "../../Assets/Projects/djmega/mega-services2.png"
import djmega3 from "../../Assets/Projects/djmega/mega-services3.png"
import djmega4 from "../../Assets/Projects/djmega/mega-services4.png"

import phantom  from "../../Assets/Projects/phantom/phantom-services.png"
import phantom2 from "../../Assets/Projects/phantom/phantom-services2.png"
import phantom3 from "../../Assets/Projects/phantom/phantom-services3.png"
import phantom4 from "../../Assets/Projects/phantom/phantom-services4.png"
import phantom5 from "../../Assets/Projects/phantom/phantom-services5.png"

import rvbHome from "../../Assets/Projects/rvb/Screenshot (227).png"
import rvbber  from "../../Assets/Projects/rvb/rvb.png"
import rvbber2 from "../../Assets/Projects/rvb/rvb2.png"
import rvbber3 from "../../Assets/Projects/rvb/rvb3.png"
import rvbber4 from "../../Assets/Projects/rvb/rvb4.png"
import rvbber5 from "../../Assets/Projects/rvb/rvb5.png"
import rvbber6 from "../../Assets/Projects/rvb/rvb6.png"

const techColors = {
  React: "#61dafb", "Node.js": "#339933", "AR Technology": "#ff6b6b",
  "Payment APIs": "#f7df1e", MongoDB: "#47a248", "JWT Authentication": "#d63031",
  "Socket.io": "#010101", Redux: "#764abc", "Stripe API": "#635bff",
  Firebase: "#ffca28", CSS3: "#1572b6", TypeScript: "#3178c6",
  "WhatsApp API": "#25d366", "Framer Motion": "#e855ff", "Email.js": "#f7df1e",
  Express: "#ffffff", "Responsive Design": "#38bdf8", MySQL: "#4479a1",
  Java: "#f89820", "ASP.NET Core": "#512bd4", "REST API": "#ff9f43",
};

const projectsData = [
  {
    id: "tshwane-find",
    imgPath: TshwaneFindPic,
    title: "Tshwane Find",
    description:
      "A web application developed for TVH to streamline the management of various facilities, offering users an intuitive interface for booking and managing amenities. The system integrates multiple payment methods through APIs and incorporates augmented reality (AR) features.",
    ghLink: "https://github.com/KISMETtakk/TshwaneFind.git",
    images: [TshwaneFindPic, TshwaneFindPic, TshwaneFindPic, TshwaneFindPic],
    technologies: ["React", "Node.js", "AR Technology", "Payment APIs", "MongoDB"],
    features: ["Facility booking and management", "Multiple payment gateway integration", "Augmented Reality (AR) features", "Real-time data access", "User authentication and role management"],
  },
  {
    id: "tech-support",
    imgPath: tsls,
    title: "Technical Support Logging System",
    description:
      "A web application that allows users to log technical support requests and track their issue status. Supports user authentication, role-based access control, and real-time communication between users and technician agents.",
    ghLink: "https://github.com/gitLunga/Hotel-Booking-System.git",
    images: [tsls, hotelBookingPic, hotelBookingPic, hotelBookingPic],
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "JWT Authentication"],
    features: ["Technical support request logging", "Issue status tracking", "User authentication", "Role-based access control", "Real-time communication", "Admin dashboard for technicians"],
  },
  {
    id: "ecommerce-app",
    imgPath: eComPic,
    title: "Lunga Basic E-Commerce App",
    description:
      "A user-friendly e-commerce platform for buying and selling products online. Features product categorization, shopping cart, quantity adjustment, and simple payment integration.",
    ghLink: "https://github.com/gitLunga/basic-ecommerce-app.git",
    images: [eComPic, eComPic, eComPic, eComPic],
    technologies: ["React", "Redux", "Stripe API", "Firebase", "CSS3"],
    features: ["Product browsing and categorization", "Shopping cart functionality", "Quantity adjustment", "Payment integration", "Responsive web design"],
  },
  {
    id: "hotel-booking",
    imgPath: hotelBookingPic,
    title: "Hotel Booking System",
    description:
      "A comprehensive web application for browsing hotel rooms, booking accommodations, and managing reservations — with authentication, role-based access, and real-time communication.",
    ghLink: "https://github.com/gitLunga/Hotel-Booking-System.git",
    images: [hotelBookingPic, hotelBookingPic, hotelBookingPic, hotelBookingPic],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    features: ["Room browsing and search", "Real-time availability", "Booking management", "User authentication", "Admin and customer roles", "Integrated payment"],
  },
  {
    id: "nino-services",
    imgPath: ninoServices,
    title: "Nino Services E-Commerce",
    description:
      "A modern TypeScript/React e-commerce demo for accessories, beauty products, and home goods — with WhatsApp integration, responsive design optimized for mobile users.",
    ghLink: "https://github.com/gitLunga/nino-services-store.git",
    demoLink: "https://nino-services-store.netlify.app",
    images: [ninoServices, ninoServices2, ninoServices3, ninoServices4, ninoServices5, ninoServices6, ninoServices7],
    technologies: ["TypeScript", "React", "WhatsApp API", "Responsive Design", "CSS3"],
    features: ["Multi-category product showcase", "WhatsApp order integration", "Mobile-optimized design", "Interactive product browsing", "Clean state management"],
  },
  {
    id: "dj-mega",
    imgPath: djmega,
    title: "DJ Mega Portfolio",
    description:
      "A dynamic artist portfolio with smooth animations, music project showcase, event calendar, photo gallery, and direct booking via email integration.",
    ghLink: "https://github.com/gitLunga/djmega-portfolio.git",
    demoLink: "https://djmega-portfolio.netlify.app",
    images: [djmega, djmega2, djmega3, djmega4],
    technologies: ["React", "TypeScript", "Framer Motion", "Email.js", "CSS3"],
    features: ["Smooth animations and transitions", "Music projects showcase", "Event calendar", "Photo gallery with lightbox", "Direct booking functionality"],
  },
  {
    id: "phantom-clothing",
    imgPath: phantom,
    title: "The Phantom Clothing",
    description:
      "A React/Redux e-commerce demo specializing in premium t-shirts with WhatsApp order integration, product zoom, color selection, and wishlist — no backend dependencies.",
    ghLink: "https://github.com/gitLunga/the-phantom-clothing.git",
    demoLink: "https://thephantomclothing.netlify.app",
    images: [phantom, phantom2, phantom3, phantom4, phantom5],
    technologies: ["React", "Redux", "WhatsApp API", "CSS3", "Responsive Design"],
    features: ["Premium t-shirt catalogue", "WhatsApp order integration", "Product zoom", "Color selection", "Wishlist management"],
  },
  {
    id: "rvbber-services",
    imgPath: rvbHome,
    title: "Rvbber Graphics Portfolio",
    description:
      "A creative graphics and design portfolio showcasing visual work, services, and client projects — built with React and optimized for visual storytelling.",
    ghLink: "https://github.com/gitLunga/rvbber-services.git",
    demoLink: "https://rvbber-services.netlify.app/",
    images: [rvbber, rvbber2, rvbber3, rvbber4, rvbber5, rvbber6],
    technologies: ["React", "Redux", "WhatsApp API", "CSS3", "Responsive Design"],
    features: ["Creative portfolio layout", "Services showcase", "Visual project gallery", "WhatsApp contact integration", "Responsive across devices"],
  },
];

/* ─── Custom Popup Modal ─────────────────────────────────────── */
function ProjectPopup({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setAnimIn(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = useCallback(() => {
    setAnimIn(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const prev = () => setImgIdx((i) => (i - 1 + project.images.length) % project.images.length);
  const next = () => setImgIdx((i) => (i + 1) % project.images.length);

  return (
    <div className={`popup-overlay${animIn ? " popup-overlay-in" : ""}`} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className={`popup-panel${animIn ? " popup-panel-in" : ""}`}>

        {/* Header */}
        <div className="popup-header">
          <div className="popup-title-row">
            <h3 className="popup-title">{project.title}</h3>
            {project.demoLink && (
              <span className="popup-live-badge">● Live</span>
            )}
          </div>
          <button className="popup-close-btn" onClick={close} aria-label="Close">
            <MdClose size={22} />
          </button>
        </div>

        <div className="popup-body">
          {/* Left — image gallery */}
          <div className="popup-gallery-col">
            <div className="popup-img-frame">
              <img
                key={imgIdx}
                src={project.images[imgIdx]}
                alt={`${project.title} screenshot ${imgIdx + 1}`}
                className="popup-img popup-img-anim"
              />
              {project.images.length > 1 && (
                <>
                  <button className="popup-arrow popup-arrow-left" onClick={prev}>
                    <MdChevronLeft size={26} />
                  </button>
                  <button className="popup-arrow popup-arrow-right" onClick={next}>
                    <MdChevronRight size={26} />
                  </button>
                  <div className="popup-img-counter">
                    {imgIdx + 1} / {project.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {project.images.length > 1 && (
              <div className="popup-thumbnails">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    className={`popup-thumb${i === imgIdx ? " popup-thumb-active" : ""}`}
                    onClick={() => setImgIdx(i)}
                  >
                    <img src={img} alt={`thumb ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — details */}
          <div className="popup-details-col">
            <p className="popup-description">{project.description}</p>

            {/* Tech badges */}
            <div className="popup-section">
              <h6 className="popup-section-title">Tech Stack</h6>
              <div className="popup-badges">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="popup-badge"
                    style={{
                      background: `${techColors[t] || "#6b7280"}18`,
                      border: `1px solid ${techColors[t] || "#6b7280"}50`,
                      color: techColors[t] || "#d1d5db",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            {project.features && (
              <div className="popup-section">
                <h6 className="popup-section-title">Key Features</h6>
                <ul className="popup-features">
                  {project.features.map((f, i) => (
                    <li key={i} className="popup-feature-item">
                      <MdCheckCircle size={16} className="popup-feature-icon" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action buttons */}
            <div className="popup-actions">
              {project.ghLink && (
                <a href={project.ghLink} target="_blank" rel="noreferrer" className="popup-action-btn popup-btn-ghost">
                  <BsGithub size={18} />
                  GitHub
                </a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noreferrer" className="popup-action-btn popup-btn-primary">
                  <CgWebsite size={18} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Projects Page ──────────────────────────────────────────── */
function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <div className="fade-in-animation">
          <h1 className="project-heading">
            My Recent <strong className="purple">Works</strong>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            Here are a few projects I've worked on recently.
          </p>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projectsData.slice(0, 4).map((project, index) => (
            <Col md={4} className="project-card" key={project.id}>
              <div className="project-card-animation" style={{ animationDelay: `${index * 0.12}s` }}>
                <ProjectCard
                  imgPath={project.imgPath}
                  isBlog={false}
                  title={project.title}
                  description={project.description}
                  ghLink={project.ghLink}
                  demoLink={project.demoLink}
                  onViewDetails={() => setSelected(project)}
                />
              </div>
            </Col>
          ))}
        </Row>

        <p className="projects-divider-text fade-in-animation">
          Personal projects
        </p>

        <Row style={{ justifyContent: "center" }}>
          {projectsData.slice(4).map((project, index) => (
            <Col md={4} className="project-card" key={project.id}>
              <div className="project-card-animation" style={{ animationDelay: `${(index + 4) * 0.12}s` }}>
                <ProjectCard
                  imgPath={project.imgPath}
                  isBlog={false}
                  title={project.title}
                  description={project.description}
                  ghLink={project.ghLink}
                  demoLink={project.demoLink}
                  onViewDetails={() => setSelected(project)}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {selected && <ProjectPopup project={selected} onClose={() => setSelected(null)} />}
    </Container>
  );
}

export default Projects;
