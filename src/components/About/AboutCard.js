import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi, I'm <span className="purple">Lunga Nhlakanipho Ntshingila</span> — a
            Computer Science graduate and full-stack developer based in
            <span className="purple"> Pretoria, Gauteng, South Africa.</span>
            <br />
            <br />
            I hold a <span className="purple">Diploma in Computer Science</span> from
            Tshwane University of Technology, and I build production software for
            government and enterprise clients. My current work is a device
            procurement platform with a multi-stage approval engine, real-time SLA
            tracking and role-based access control.
            <br />
            <br />
            I work across the stack — <span className="purple">React</span> and
            <span className="purple"> React Native</span> on the front end,
            <span className="purple"> Node.js, Express</span> and
            <span className="purple"> ASP.NET Core</span> on the back end, with
            <span className="purple"> PostgreSQL</span> and SQL Server behind them.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Code Review and Analysis
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">LN NTSHINGILA</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
