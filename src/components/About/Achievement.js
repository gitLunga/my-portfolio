import React from "react";
import { Col, Row, Card } from "react-bootstrap";

function Achievements() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            <Col md={4} className="achievement-card">
                <Card className="achievement-card-view">
                    <Card.Body>
                        <Card.Title style={{ color: "#c770f0" }}>ICEP Helping Hand Award</Card.Title>
                        <Card.Text style={{ textAlign: "center" }}>
                            2024
                        </Card.Text>
                        <Card.Text>
                            Recognized for exceptional contribution to team projects and collaboration efforts.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4} className="achievement-card">
                <Card className="achievement-card-view">
                    <Card.Body>
                        <Card.Title style={{ color: "#c770f0" }}>2X Hackathon Top 5</Card.Title>
                        <Card.Text style={{ textAlign: "center" }}>
                            2023 & 2024
                        </Card.Text>
                        <Card.Text>
                            Achieved top 5 positions in hackathons two years consecutively, showcasing problem-solving skills.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4} className="achievement-card">
                <Card className="achievement-card-view">
                    <Card.Body>
                        <Card.Title style={{ color: "#c770f0" }}>Log Management System</Card.Title>
                        <Card.Text style={{ textAlign: "center" }}>
                            2024-2025
                        </Card.Text>
                        <Card.Text>
                            Built a system with SLA tracking that improved issue resolution rate by over 30%.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Achievements;