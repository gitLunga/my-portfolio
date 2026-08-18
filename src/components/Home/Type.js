import React from "react";
import Typewriter from "typewriter-effect";

// Every line here must be defensible in an interview — each maps to work
// that appears in the Experience or Projects data.
const ROLES = [
  "Full-Stack Developer",
  "Computer Science Graduate",
  "React & Node.js Developer",
  "Java & C# Developer",
  "PostgreSQL & REST API Design",
  "React Native & Mobile",
];

function Type() {
  return (
    <Typewriter
      options={{
        strings: ROLES,
        autoStart: true,
        loop: true,
        deleteSpeed: 40,
        delay: 60,
      }}
    />
  );
}

export default Type;
