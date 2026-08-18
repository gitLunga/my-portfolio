import React from "react";
import Card from "react-bootstrap/Card";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { Eye, Lock } from "lucide-react";

/*
 * Presentation lives in style.css under .project-card-*. This component used
 * to carry ~120 lines of inline style objects plus a `hovered` state flag,
 * which meant every mouse-enter re-rendered the card and reallocated each
 * style object. Inline styles also can't be themed — they always won over the
 * stylesheet, so the grid stayed dark in light mode. CSS :hover does the same
 * job with no React state.
 */
function ProjectCards({ imgPath, title, description, ghLink, demoLink, isBlog, isPrivate, onViewDetails }) {
  return (
    <Card className="project-card-view h-100">
      <div className="project-card-media">
        <Card.Img
          variant="top"
          src={imgPath}
          alt={`${title} screenshot`}
          className="project-card-img"
          loading="lazy"
          decoding="async"
        />
        <div className="project-card-overlay">
          <button
            type="button"
            className="project-card-view-btn"
            onClick={onViewDetails}
          >
            <Eye size={14} />
            View Details
          </button>
        </div>
      </div>

      <Card.Body className="project-card-body">
        <Card.Title as="h3" className="project-card-title">{title}</Card.Title>
        <Card.Text className="project-card-text">{description}</Card.Text>

        <div className="project-card-actions">
          {/* Client and internship work has no public repo — say so plainly
              rather than rendering a link that goes nowhere. */}
          {isPrivate ? (
            <span className="project-card-btn project-card-btn-private" title="Source code is not public">
              <Lock size={12} />
              Private source
            </span>
          ) : (
            <a
              href={ghLink}
              target="_blank"
              rel="noreferrer"
              className="project-card-btn project-card-btn-ghost"
            >
              <BsGithub size={13} />
              {isBlog ? "Blog" : "GitHub"}
            </a>
          )}

          {!isBlog && demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noreferrer"
              className="project-card-btn project-card-btn-primary"
            >
              <CgWebsite size={13} />
              Demo
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
