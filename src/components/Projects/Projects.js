import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

//import leaf from "../../Assets/Projects/leaf.png";
//import emotion from "../../Assets/Projects/emotion.png";
//import editor from "../../Assets/Projects/codeEditor.png";
//import chatify from "../../Assets/Projects/chatify.png";
//import suicide from "../../Assets/Projects/suicide.png";
//import bitsOfCode from "../../Assets/Projects/blog.png";

import eComPic from "../../Assets/Projects/e -commerce pic.png";
import hotelBookingPic from "../../Assets/Projects/hotelBookingPic.png";
import TshwaneFindPic from "../../Assets/Projects/TshwaneFindPic.jpg";

import ninoServices from "../../Assets/Projects/nino-services.png";
import djmega from "../../Assets/Projects/mega-services.png";
import phantom from "../../Assets/Projects/phantom-services.png";

//import tslsPic from "../../Assets/Projects/tslsPic.jpg";


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
              imgPath={TshwaneFindPic}
              isBlog={false}
              title="Tshwane Find"
              description="A web application developed for TVH to streamline the management of various facilities, offering users an intuitive interface for booking and managing amenities. The system integrates multiple payment methods through APIs and incorporates augmented reality (AR) features to provide an interactive experience for users. This project aims to enhance the user experience with real-time data access, making it a versatile tool for both administrative users and clients."
              ghLink="https://github.com/KISMETtakk/TshwaneFind.git"
            // demoLink="https://editor.soumya-jit.tech/"
            />
          </Col>
          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={tslsPic}
              isBlog={false}
              title="Technical Support Logging System"
              description="technical Support "
              ghLink="https://github.com/soumyajit4419/Chatify"
              demoLink="https://chatify-49.web.app/"
            />
          </Col> */}

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={hotelBookingPic}
              isBlog={false}
              title="Technical Support Logging System"
              description="A web application that allows users to log technical support requests and track their issue status.
               System also supports user authentication and role-based access control. Furthermore, facilitates real time communication between users and technician agents."
              ghLink="https://github.com/gitLunga/Hotel-Booking-System.git"
              demoLink="https://lunga-basic-hotelbooking.netlify.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={eComPic}
              isBlog={false}
              title="LUNGA BASIC E-COMMERCE APP"
              description="A user-friendly e-commerce platform built to facilitate the buying and selling of products online. The app allows users to browse items, add them to their shopping cart, and proceed to checkout. It supports basic functionalities such as product categorization, quantity adjustment, and simple payment integration. Designed with simplicity in mind, this app serves as an entry-level e-commerce solution for individuals looking to start selling products online."
              ghLink="https://github.com/gitLunga/basic-ecommerce-app.git"
              demoLink="https://lunga-basic-ecommerce-app.netlify.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={hotelBookingPic}
              isBlog={false}
              title="Hotel Booking System"
              description="A comprehensive web application designed to allow users to easily browse available hotel rooms, book accommodations, and manage their reservations. The system supports user authentication, role-based access control for admins and customers, and real-time communication between users and hotel staff. It includes features like search filters, room availability tracking, and an integrated payment system, providing a seamless experience for both customers and service providers."
              ghLink="https://github.com/gitLunga/Hotel-Booking-System.git"
              demoLink="https://lunga-basic-hotelbooking.netlify.app"
            />
          </Col>

          <p style={{ color: "gray" }}>
            Here are some few personal projects I have worked on.
          </p>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ninoServices}
              isBlog={false}
              title="Nino Services e-commerce web application"
              description="A modern frontend e-commerce demo built with TypeScript and React, showcasing multi-category shopping for accessories, beauty products, and home goods. Features WhatsApp integration for product inquiries, responsive design optimized for African mobile users, and interactive product browsing. Demonstrates clean state management and UI patterns for scalable e-commerce applications"
              ghLink="https://github.com/gitLunga/nino-services-store.git"
              demoLink="https://nino-services-store.netlify.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={djmega}
              isBlog={false}
              title="DJ Mega portfolio website"
              description="A dynamic artist portfolio built with React and TypeScript, featuring smooth animations and transitions. 
    Showcases music projects, event calendar, and photo gallery with a responsive layout optimized for all devices. 
    Includes direct booking functionality via email integration and a contact form for fan inquiries"
              ghLink="https://github.com/gitLunga/djmega-portfolio.git"
              demoLink="https://djmega-portfolio.netlify.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={phantom}
              isBlog={false}
              title="The Phantom Clothing e-commerce web application"
              description="A React/Redux e-commerce demo specializing in premium t-shirts, featuring WhatsApp order integration. 
    Includes product zoom, color selection, and responsive design. Demonstrates advanced frontend patterns 
    for product browsing and wishlist functionality without backend dependencies."
              ghLink="https://github.com/gitLunga/the-phantom-clothing.git"
              demoLink="https://thephantomclothing.netlify.app"
            />
          </Col>







        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
