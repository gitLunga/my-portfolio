import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { CgWebsite } from "react-icons/cg"
import { BsGithub, BsEye } from "react-icons/bs"

function ProjectCards(props) {
  return (
    <div
      className="project-card-animation"
      style={{
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      <Card
        className="project-card-view h-100"
        style={{
          backgroundColor: "rgba(55, 65, 81, 0.5)",
          border: "1px solid rgba(75, 85, 99, 0.5)",
          transition: "all 0.3s",
          overflow: "hidden",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(107, 114, 128, 1)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(75, 85, 99, 0.5)"
        }}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={props.imgPath}
            alt="card-img"
            style={{
              height: "200px",
              objectFit: "cover",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
          />
          <div
            className="project-card-overlay"
            style={{
              position: "absolute",
              inset: "0",
              backgroundColor: "rgba(0, 0, 0, 0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: "0",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)"
              e.currentTarget.style.opacity = "1"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0)"
              e.currentTarget.style.opacity = "0"
            }}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={props.onViewDetails}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(4px)",
                border: "none",
                color: "white",
              }}
            >
              <BsEye style={{ marginRight: "8px" }} />
              View Details
            </Button>
          </div>
        </div>

        <Card.Body style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Card.Title
            style={{
              color: "white",
              marginBottom: "1rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#a855f7"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "white"
            }}
          >
            {props.title}
          </Card.Title>
          <Card.Text
            style={{
              textAlign: "justify",
              color: "#d1d5db",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            {props.description}
          </Card.Text>

          <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
            <Button
              variant="outline-light"
              href={props.ghLink}
              target="_blank"
              size="sm"
              style={{
                flex: 1,
                backgroundColor: "transparent",
                borderColor: "rgba(107, 114, 128, 1)",
                color: "white",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(75, 85, 99, 1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <BsGithub style={{ marginRight: "8px" }} />
              {props.isBlog ? "Blog" : "GitHub"}
            </Button>

            {!props.isBlog && props.demoLink && (
              <Button
                variant="primary"
                href={props.demoLink}
                target="_blank"
                size="sm"
                style={{
                  flex: 1,
                  backgroundColor: "#7c3aed",
                  borderColor: "#7c3aed",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#6d28d9"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#7c3aed"
                }}
              >
                <CgWebsite style={{ marginRight: "8px" }} />
                Demo
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProjectCards
