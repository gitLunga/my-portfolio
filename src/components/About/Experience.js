import React from "react";
import { Col, Row, Card } from "react-bootstrap";


function Experience() {
    return (
        <>
            <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
                <Col md={8}>
                    <Card className="experience-card">
                        <Card.Body>
                            <Card.Title className="experience-title">
                                <strong className="purple">ICEP</strong> - Junior Full Stack Developer Intern
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted experience-date">July 2024 - June 2025</Card.Subtitle>
                            <Card.Text className="experience-description">
                                During my internship, I specialized in:
                            </Card.Text>
                            <ul className="experience-list">
                                <li>Building full-stack web applications with <strong>React frontend</strong> and <strong>Node.js/ASP.NET Core backend</strong></li>
                                <li>Developing and integrating <strong>RESTful APIs</strong> with proper validation and error handling</li>
                                <li>Creating <strong>database solutions</strong> using MySQL and Microsoft SQL Server</li>
                                <li>Implementing <strong>Agile methodologies</strong> including sprint planning and code reviews</li>
                                <li>Building a log management system with <strong>SLA tracking</strong> that improved issue resolution by 30%</li>
                                <li>Developing <strong>real-time communication features</strong> including live chat and collaboration tools</li>
                                <li>Implementing <strong>QR code scanning functionality</strong> for streamlined form entry</li>
                                <li>Participating in <strong>testing, debugging, and production deployment</strong> processes</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Experience;