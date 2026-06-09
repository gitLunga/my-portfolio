import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import { CgWebsite } from "react-icons/cg"
import { BsGithub } from "react-icons/bs"
import { Eye } from "lucide-react"

function ProjectCards(props) {
  const [hovered, setHovered] = useState(false)

  return (
    <Card
      className="project-card-view h-100"
      style={{
        backgroundColor: "rgba(20, 20, 45, 0.75)",
        border: "1px solid rgba(107, 114, 128, 0.3)",
        borderRadius: "18px",
        overflow: "hidden",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(124, 58, 237, 0.25)" : "0 4px 16px rgba(0,0,0,0.3)",
        borderColor: hovered ? "rgba(199, 112, 240, 0.45)" : "rgba(107, 114, 128, 0.3)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with hover overlay */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt="card-img"
          style={{
            height: "160px",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
        {/* View Details overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <button
            onClick={props.onViewDetails}
            style={{
              background: "rgba(124, 58, 237, 0.8)",
              border: "1px solid rgba(199, 112, 240, 0.5)",
              borderRadius: "50px",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: "600",
              padding: "8px 18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backdropFilter: "blur(4px)",
              transition: "transform 0.2s",
              transform: hovered ? "translateY(0) scale(1)" : "translateY(8px) scale(0.95)",
            }}
          >
            <Eye size={14} />
            View Details
          </button>
        </div>
      </div>

      <Card.Body style={{ display: "flex", flexDirection: "column", padding: "16px" }}>
        <Card.Title
          style={{
            color: hovered ? "#c770f0" : "white",
            transition: "color 0.3s",
            fontSize: "0.98rem",
            fontWeight: "700",
            lineHeight: "1.25",
            marginBottom: "8px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {props.title}
        </Card.Title>

        <Card.Text
          style={{
            color: "rgba(209, 213, 219, 0.75)",
            fontSize: "0.78rem",
            lineHeight: "1.5",
            marginBottom: "14px",
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {props.description}
        </Card.Text>

        <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
          <a
            href={props.ghLink}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "7px 8px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.75rem",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          >
            <BsGithub size={13} />
            {props.isBlog ? "Blog" : "GitHub"}
          </a>

          {!props.isBlog && props.demoLink && (
            <a
              href={props.demoLink}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                padding: "7px 8px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(95,157,248,0.7))",
                border: "none",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <CgWebsite size={13} />
              Demo
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProjectCards
