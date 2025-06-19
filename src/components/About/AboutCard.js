import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Lunga Nhlakanipho Ntshingila </span>
            from <span className="purple"> Gauteng, Pretoria - South Africa.</span>
            <br />
            I am currently an aspiring Junior Full Stack Developer looking to leverage morden skillset to a growing environment.
            <br />
            I have completed Diploma in Computer Sciences at Tshwane University of Technology.
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
