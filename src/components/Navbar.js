import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import portfolioLogo from "../Assets/portfolioLogo.webp";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineMail,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { MdOutlineStorefront } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    // Was called directly in the render body, which attached a NEW listener
    // on every render and never removed one — a growing pile of duplicate
    // scroll handlers for the lifetime of the page.
    const scrollHandler = () => updateNavbar(window.scrollY >= 20);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img src={portfolioLogo} className="img-fluid logo" alt="brand" />
          <span className="navbar-brand-text">Lunga.dev</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => updateExpanded(false)}
                className={isActive("/") ? "nav-link-active" : ""}
              >
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
                className={isActive("/about") ? "nav-link-active" : ""}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
                className={isActive("/project") ? "nav-link-active" : ""}
              >
                <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} />{" "}
                Projects
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                onClick={() => updateExpanded(false)}
                className={isActive("/resume") ? "nav-link-active" : ""}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Resume
              </Nav.Link>
            </Nav.Item>

            {/* Entry point into the separate Lungas Web Lab namespace — given
                its own accent color here on purpose, so it reads as "a
                different offering" even before the studio's own brand
                layer (data-brand="studio") takes over past this link. */}
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/studio"
                onClick={() => updateExpanded(false)}
                className={"nav-studio-btn" + (location.pathname.startsWith("/studio") ? " nav-link-active" : "")}
              >
                <MdOutlineStorefront style={{ marginBottom: "2px" }} /> Studio
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/contact"
                onClick={() => updateExpanded(false)}
                className={`nav-contact-btn${isActive("/contact") ? " nav-link-active" : ""}`}
              >
                <AiOutlineMail style={{ marginBottom: "2px" }} /> Contact
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="d-flex align-items-center">
              <motion.button
                className="theme-toggle-btn"
                onClick={toggle}
                animate={{ rotate: theme === "light" ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <BsSun size={16} /> : <BsMoon size={16} />}
              </motion.button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
