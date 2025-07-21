import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { CgWebsite } from "react-icons/cg"
import { BsGithub } from "react-icons/bs"
import { motion } from "framer-motion"; // Add this import
// Either remove this or use it
import { Eye } from "lucide-react"; // Example import if using Lucide icons

function ProjectCards(props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="project-card h-100"
    >
      <Card
        className="project-card-view h-100"
        style={{
          backgroundColor: "rgba(55, 65, 81, 0.5)",
          border: "1px solid rgba(75, 85, 99, 0.5)",
          transition: "all 0.3s",
          overflow: "hidden",
          maxWidth: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(107, 114, 128, 1)"
          e.currentTarget.style.transform = "translateY(-3px)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(75, 85, 99, 0.5)"
          e.currentTarget.style.transform = "translateY(0)"
        }}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={props.imgPath}
            alt="card-img"
            style={{
              height: "140px",
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
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: "0",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                fontSize: "0.75rem",
                padding: "4px 8px",
              }}
            >
              <Eye size={14} style={{ marginRight: "4px" }} />
              View Details
            </Button>
          </motion.div>
        </div>

        <Card.Body style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1rem" }}>
          <Card.Title
            style={{
              color: "white",
              marginBottom: "0.5rem",
              transition: "color 0.3s",
              fontSize: "1rem",
              fontWeight: "bold",
              lineHeight: "1.2",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
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
              fontSize: "0.75rem",
              lineHeight: "1.4",
              marginBottom: "1rem",
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
                fontSize: "0.75rem",
                padding: "4px 8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(75, 85, 99, 1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <BsGithub style={{ marginRight: "4px", fontSize: "0.75rem" }} />
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
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#6d28d9"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#7c3aed"
                }}
              >
                <CgWebsite style={{ marginRight: "4px", fontSize: "0.75rem" }} />
                Demo
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default ProjectCards
