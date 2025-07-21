
import { React, useState } from "react"
import { Container, Row, Col, Modal, Button, Badge } from "react-bootstrap"
import ProjectCard from "../Projects/ProjectCards"
import Particle from "../Particle"
import { BsGithub } from "react-icons/bs"
import { CgWebsite } from "react-icons/cg"

import eComPic from "../../Assets/Projects/e -commerce pic.png"
import hotelBookingPic from "../../Assets/Projects/hotelBookingPic.png"
import TshwaneFindPic from "../../Assets/Projects/TshwaneFindPic.jpg"

//nino
import ninoServices from "../../Assets/Projects/nino-services.png"
import ninoServices2 from "../../Assets/Projects/nino-services2.png"
import ninoServices3 from "../../Assets/Projects/nino-services3.png"
import ninoServices4 from "../../Assets/Projects/nino-services4.png"
import ninoServices5 from "../../Assets/Projects/nino-services5.png"
import ninoServices6 from "../../Assets/Projects/nino-services6.png"
import ninoServices7 from "../../Assets/Projects/nino-services7.png"

//mega
import djmega from "../../Assets/Projects/mega-services.png"
import djmega2 from "../../Assets/Projects/mega-services2.png"
import djmega3 from "../../Assets/Projects/mega-services3.png"
import djmega4 from "../../Assets/Projects/mega-services4.png"

//phantom
import phantom from "../../Assets/Projects/phantom-services.png"
import phantom2 from "../../Assets/Projects/phantom-services2.png"
import phantom3 from "../../Assets/Projects/phantom-services3.png"
import phantom4 from "../../Assets/Projects/phantom-services4.png"
import phantom5 from "../../Assets/Projects/phantom-services5.png"

// Enhanced project data with additional details
const projectsData = [
  {
    id: "tshwane-find",
    imgPath: TshwaneFindPic,
    title: "Tshwane Find",
    description:
      "A web application developed for TVH to streamline the management of various facilities, offering users an intuitive interface for booking and managing amenities. The system integrates multiple payment methods through APIs and incorporates augmented reality (AR) features to provide an interactive experience for users.",
    ghLink: "https://github.com/KISMETtakk/TshwaneFind.git",
    images: [TshwaneFindPic, TshwaneFindPic, TshwaneFindPic, TshwaneFindPic],
    technologies: ["React", "Node.js", "AR Technology", "Payment APIs", "MongoDB"],
    features: [
      "Facility booking and management system",
      "Multiple payment gateway integration",
      "Augmented Reality (AR) features",
      "Real-time data access",
      "User authentication and role management",
      "Interactive user interface",
    ],
  },
  {
    id: "tech-support",
    imgPath: hotelBookingPic,
    title: "Technical Support Logging System",
    description:
      "A web application that allows users to log technical support requests and track their issue status. System also supports user authentication and role-based access control. Furthermore, facilitates real time communication between users and technician agents.",
    ghLink: "https://github.com/gitLunga/Hotel-Booking-System.git",
    demoLink: "https://lunga-basic-hotelbooking.netlify.app",
    images: [hotelBookingPic, hotelBookingPic, hotelBookingPic, hotelBookingPic],
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "JWT Authentication"],
    features: [
      "Technical support request logging",
      "Issue status tracking system",
      "User authentication and authorization",
      "Role-based access control",
      "Real-time communication system",
      "Admin dashboard for technicians",
    ],
  },
  {
    id: "ecommerce-app",
    imgPath: eComPic,
    title: "LUNGA BASIC E-COMMERCE APP",
    description:
      "A user-friendly e-commerce platform built to facilitate the buying and selling of products online. The app allows users to browse items, add them to their shopping cart, and proceed to checkout. It supports basic functionalities such as product categorization, quantity adjustment, and simple payment integration.",
    ghLink: "https://github.com/gitLunga/basic-ecommerce-app.git",
    demoLink: "https://lunga-basic-ecommerce-app.netlify.app",
    images: [eComPic, eComPic, eComPic, eComPic],
    technologies: ["React", "Redux", "Stripe API", "Firebase", "CSS3"],
    features: [
      "Product browsing and categorization",
      "Shopping cart functionality",
      "Quantity adjustment system",
      "Payment integration",
      "User-friendly checkout process",
      "Responsive web design",
    ],
  },
  {
    id: "hotel-booking",
    imgPath: hotelBookingPic,
    title: "Hotel Booking System",
    description:
      "A comprehensive web application designed to allow users to easily browse available hotel rooms, book accommodations, and manage their reservations. The system supports user authentication, role-based access control for admins and customers, and real-time communication between users and hotel staff.",
    ghLink: "https://github.com/gitLunga/Hotel-Booking-System.git",
    demoLink: "https://lunga-basic-hotelbooking.netlify.app",
    images: [hotelBookingPic, hotelBookingPic, hotelBookingPic, hotelBookingPic],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    features: [
      "Hotel room browsing and search",
      "Real-time availability tracking",
      "Booking and reservation management",
      "User authentication system",
      "Admin and customer role management",
      "Integrated payment system",
    ],
  },
  {
    id: "nino-services",
    imgPath: ninoServices,
    title: "Nino Services e-commerce web application",
    description:
      "A modern frontend e-commerce demo built with TypeScript and React, showcasing multi-category shopping for accessories, beauty products, and home goods. Features WhatsApp integration for product inquiries, responsive design optimized for African mobile users, and interactive product browsing.",
    ghLink: "https://github.com/gitLunga/nino-services-store.git",
    demoLink: "https://nino-services-store.netlify.app",
    images: [ninoServices, ninoServices2, ninoServices3, ninoServices4, ninoServices5, ninoServices6, ninoServices7],
    technologies: ["TypeScript", "React", "WhatsApp API", "Responsive Design", "CSS3"],
    features: [
      "Multi-category product showcase",
      "WhatsApp integration for inquiries",
      "Mobile-optimized design",
      "Interactive product browsing",
      "Clean state management",
      "Scalable UI patterns",
    ],
  },
  {
    id: "dj-mega",
    imgPath: djmega,
    title: "DJ Mega portfolio website",
    description:
      "A dynamic artist portfolio built with React and TypeScript, featuring smooth animations and transitions. Showcases music projects, event calendar, and photo gallery with a responsive layout optimized for all devices. Includes direct booking functionality via email integration and a contact form for fan inquiries",
    ghLink: "https://github.com/gitLunga/djmega-portfolio.git",
    demoLink: "https://djmega-portfolio.netlify.app",
    images: [djmega, djmega2, djmega3, djmega4],
    technologies: ["React", "TypeScript", "Framer Motion", "Email.js", "CSS3"],
    features: [
      "Dynamic artist portfolio",
      "Smooth animations and transitions",
      "Music projects showcase",
      "Event calendar integration",
      "Photo gallery with lightbox",
      "Direct booking functionality",
    ],
  },
  {
    id: "phantom-clothing",
    imgPath: phantom,
    title: "The Phantom Clothing e-commerce web application",
    description:
      "A React/Redux e-commerce demo specializing in premium t-shirts, featuring WhatsApp order integration. Includes product zoom, color selection, and responsive design. Demonstrates advanced frontend patterns for product browsing and wishlist functionality without backend dependencies.",
    ghLink: "https://github.com/gitLunga/the-phantom-clothing.git",
    demoLink: "https://thephantomclothing.netlify.app",
    images: [phantom, phantom2, phantom3, phantom4, phantom5],
    technologies: ["React", "Redux", "WhatsApp API", "CSS3", "Responsive Design"],
    features: [
      "Premium t-shirt specialization",
      "WhatsApp order integration",
      "Product zoom functionality",
      "Color selection system",
      "Wishlist management",
      "Advanced frontend patterns",
    ],
  },
]

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleShowModal = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProject(null)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
  }

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <div className="fade-in-animation">
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
          <p style={{ color: "white" }}>Here are a few projects I've worked on recently.</p>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projectsData.slice(0, 4).map((project, index) => (
            <Col md={4} className="project-card" key={project.id}>
              <div className="project-card-animation" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProjectCard
                  imgPath={project.imgPath}
                  isBlog={false}
                  title={project.title}
                  description={project.description}
                  ghLink={project.ghLink}
                  demoLink={project.demoLink}
                  onViewDetails={() => handleShowModal(project)}
                />
              </div>
            </Col>
          ))}
        </Row>

        <p style={{ color: "gray", textAlign: "center", margin: "2rem 0" }} className="fade-in-animation">
          Here are some few personal projects I have worked on.
        </p>

        <Row style={{ justifyContent: "center" }}>
          {projectsData.slice(4).map((project, index) => (
            <Col md={4} className="project-card" key={project.id}>
              <div className="project-card-animation" style={{ animationDelay: `${(index + 4) * 0.1}s` }}>
                <ProjectCard
                  imgPath={project.imgPath}
                  isBlog={false}
                  title={project.title}
                  description={project.description}
                  ghLink={project.ghLink}
                  demoLink={project.demoLink}
                  onViewDetails={() => handleShowModal(project)}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Enhanced Project Modal with Carousel */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered style={{ zIndex: 9999 }}>
        <Modal.Header
          style={{
            backgroundColor: "#1f2937",
            borderBottom: "1px solid #374151",
            color: "white",
          }}
        >
          <Modal.Title>{selectedProject?.title}</Modal.Title>
          <Button
            variant="link"
            onClick={handleCloseModal}
            style={{ color: "#9ca3af", fontSize: "1.5rem", textDecoration: "none" }}
          >
            ×
          </Button>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#111827", color: "white", padding: 0 }}>
          {selectedProject && (
            <>
              {/* Image Carousel */}
              <div style={{ position: "relative", marginBottom: "2rem" }}>
                <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                  <img
                    src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      transition: "opacity 0.3s ease",
                    }}
                    className="carousel-image-animation"
                  />
                </div>

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <Button
                      variant="dark"
                      onClick={prevImage}
                      style={{
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      &lt;
                    </Button>
                    <Button
                      variant="dark"
                      onClick={nextImage}
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      &gt;
                    </Button>
                  </>
                )}

                {/* Image Indicators */}
                {selectedProject.images.length > 1 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          border: "none",
                          backgroundColor: index === currentImageIndex ? "white" : "rgba(255, 255, 255, 0.5)",
                          cursor: "pointer",
                          transition: "background-color 0.3s",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div style={{ padding: "0 1.5rem 1.5rem" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <h5 style={{ color: "white", marginBottom: "0.75rem" }}>Description</h5>
                  <p style={{ color: "#d1d5db", lineHeight: "1.6" }}>{selectedProject.description}</p>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h5 style={{ color: "white", marginBottom: "0.75rem" }}>Technologies Used</h5>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {selectedProject.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        bg="secondary"
                        style={{
                          backgroundColor: "#374151",
                          color: "#d1d5db",
                          padding: "0.25rem 0.75rem",
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h5 style={{ color: "white", marginBottom: "0.75rem" }}>Key Features</h5>
                  <ul style={{ color: "#d1d5db", paddingLeft: "1rem" }}>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} style={{ marginBottom: "0.5rem" }}>
                        <span style={{ color: "#a855f7", marginRight: "0.5rem" }}>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: "flex", gap: "1rem", paddingTop: "1rem" }}>
                  {selectedProject.ghLink && (
                    <Button
                      variant="outline-light"
                      href={selectedProject.ghLink}
                      target="_blank"
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "#6b7280",
                        color: "white",
                      }}
                    >
                      <BsGithub style={{ marginRight: "0.5rem" }} />
                      GitHub
                    </Button>
                  )}
                  {selectedProject.demoLink && (
                    <Button
                      style={{
                        backgroundColor: "#7c3aed",
                        borderColor: "#7c3aed",
                        color: "white",
                      }}
                      href={selectedProject.demoLink}
                      target="_blank"
                    >
                      <CgWebsite style={{ marginRight: "0.5rem" }} />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Projects
