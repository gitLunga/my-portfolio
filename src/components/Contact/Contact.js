import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particle from "../Particle";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { HiPaperAirplane } from "react-icons/hi";

const contactInfo = [
  {
    icon: <MdEmail size={28} />,
    label: "Email",
    value: "lungamngomezulu10@gmail.com",
    href: "mailto:lungamngomezulu10@gmail.com",
  },
  {
    icon: <FaLinkedinIn size={24} />,
    label: "LinkedIn",
    value: "lunga-ntshingila",
    href: "https://www.linkedin.com/in/lunga-ntshingila-9854742a9/",
  },
  {
    icon: <AiFillGithub size={26} />,
    label: "GitHub",
    value: "gitLunga",
    href: "https://github.com/gitLunga",
  },
  {
    icon: <MdLocationOn size={28} />,
    label: "Location",
    value: "Pretoria, South Africa",
    href: null,
  },
];

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:lungamngomezulu10@gmail.com?subject=${encodeURIComponent(subject || `Portfolio Contact from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <Container fluid className="contact-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Col md={12} className="contact-heading-wrapper">
            <h1 className="project-heading">
              Get In <strong className="purple">Touch</strong>
            </h1>
            <p className="contact-subheading">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </Col>
        </Row>

        <Row className="contact-main-row">
          {/* Left – Contact Info */}
          <Col md={4} className="contact-info-col">
            <div className="contact-info-card">
              <h3 className="contact-info-title">Let's Connect</h3>
              <p className="contact-info-desc">
                I'm currently open to new opportunities and interesting projects.
                Whether you have a question or just want to say hi — my inbox is always open!
              </p>

              <div className="contact-info-list">
                {contactInfo.map((item, i) => (
                  <div className="contact-info-item" key={i}>
                    <div className="contact-info-icon purple">{item.icon}</div>
                    <div className="contact-info-text">
                      <span className="contact-info-label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer" className="contact-info-value">
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-info-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-social-row">
                <a href="https://github.com/gitLunga" target="_blank" rel="noreferrer" className="icon-colour home-social-icons">
                  <AiFillGithub />
                </a>
                <a href="https://www.linkedin.com/in/lunga-ntshingila-9854742a9/" target="_blank" rel="noreferrer" className="icon-colour home-social-icons">
                  <FaLinkedinIn />
                </a>
                <a href="mailto:lungamngomezulu10@gmail.com" rel="noreferrer" className="icon-colour home-social-icons">
                  <MdEmail />
                </a>
              </div>
            </div>
          </Col>

          {/* Right – Form */}
          <Col md={8} className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="contact-form-title">Send a Message</h3>
              <Form onSubmit={handleSubmit} className="contact-form">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Lunga Ntshingila"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input-custom"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input-custom"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Project collaboration / Job opportunity / Just saying hi"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input-custom"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label-custom">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder="Tell me about your project or idea..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-input-custom form-textarea-custom"
                  />
                </Form.Group>

                <Button type="submit" className="contact-submit-btn">
                  {sent ? (
                    "Opening email client..."
                  ) : (
                    <>
                      Send Message
                      <HiPaperAirplane style={{ marginLeft: "8px", transform: "rotate(90deg)" }} />
                    </>
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;
