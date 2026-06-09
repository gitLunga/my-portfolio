import React from "react";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1, DiReact, DiNodejs, DiGit,
  DiJava, DiMysql, DiHtml5, DiCss3, DiDocker,
} from "react-icons/di";
import {
  SiTypescript, SiDotnet, SiMongodb, SiPostgresql,
  SiTailwindcss, SiFirebase, SiRedux, SiExpress,
} from "react-icons/si";

const row1 = [
  { icon: DiJava,        name: "Java",        color: "#f89820", category: "Backend" },
  { icon: CgCPlusPlus,   name: "C#",          color: "#239120", category: "Backend" },
  { icon: DiJavascript1, name: "JavaScript",  color: "#f7df1e", category: "Language" },
  { icon: SiTypescript,  name: "TypeScript",  color: "#3178c6", category: "Language" },
  { icon: DiReact,       name: "React",       color: "#61dafb", category: "Frontend" },
  { icon: DiNodejs,      name: "Node.js",     color: "#339933", category: "Backend" },
  { icon: SiExpress,     name: "Express",     color: "#ffffff", category: "Backend" },
  { icon: SiRedux,       name: "Redux",       color: "#764abc", category: "State" },
  { icon: SiDotnet,      name: ".NET",        color: "#512bd4", category: "Backend" },
];

const row2 = [
  { icon: DiHtml5,       name: "HTML5",      color: "#e34f26", category: "Frontend" },
  { icon: DiCss3,        name: "CSS3",       color: "#1572b6", category: "Frontend" },
  { icon: SiTailwindcss, name: "Tailwind",   color: "#38bdf8", category: "Frontend" },
  { icon: DiMysql,       name: "MySQL",      color: "#4479a1", category: "Database" },
  { icon: SiMongodb,     name: "MongoDB",    color: "#47a248", category: "Database" },
  { icon: SiPostgresql,  name: "PostgreSQL", color: "#4169e1", category: "Database" },
  { icon: SiFirebase,    name: "Firebase",   color: "#ffca28", category: "Cloud" },
  { icon: DiDocker,      name: "Docker",     color: "#2496ed", category: "DevOps" },
  { icon: DiGit,         name: "Git",        color: "#f05032", category: "DevOps" },
];

function TechCard({ icon: Icon, name, color, category }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front" style={{ "--tc": color }}>
          <div className="flip-icon-glow" style={{ background: `radial-gradient(circle, ${color}25, transparent 70%)` }} />
          <Icon className="flip-icon" style={{ color, filter: `drop-shadow(0 0 10px ${color}70)` }} />
          <span className="flip-name">{name}</span>
        </div>
        {/* Back */}
        <div className="flip-card-back" style={{ "--tc": color }}>
          <div className="flip-back-icon-sm">
            <Icon style={{ color, fontSize: "1.6rem" }} />
          </div>
          <span className="flip-back-name">{name}</span>
          <span className="flip-back-category" style={{ color }}>{category}</span>
        </div>
      </div>
    </div>
  );
}

function ScrollRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className={`scroll-track-wrapper${reverse ? " scroll-reverse" : ""}`}>
      <div className="scroll-track">
        {doubled.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} {...tech} />
        ))}
      </div>
    </div>
  );
}

function Techstack() {
  return (
    <div className="techstack-scroller-wrapper">
      <ScrollRow items={row1} reverse={false} />
      <ScrollRow items={row2} reverse={true} />
    </div>
  );
}

export default Techstack;
