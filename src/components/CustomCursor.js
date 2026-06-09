import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, .flip-card, .project-card-view, .nav-link, .popup-close-btn, .popup-arrow, .exp-toggle-btn";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // dot follows instantly
  const dotX = useSpring(mx, { stiffness: 3000, damping: 100 });
  const dotY = useSpring(my, { stiffness: 3000, damping: 100 });

  // ring lags — creates the trail feel
  const ringX = useSpring(mx, { stiffness: 110, damping: 18 });
  const ringY = useSpring(my, { stiffness: 110, damping: 18 });

  // outer glow lags even more
  const glowX = useSpring(mx, { stiffness: 55, damping: 14 });
  const glowY = useSpring(my, { stiffness: 55, damping: 14 });

  useEffect(() => {
    // only activate on pointer-fine (mouse) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const down  = () => setClicking(true);
    const up    = () => setClicking(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);

    // delegate hover detection instead of attaching to every node
    const hoverIn = (e) => { if (e.target.closest(INTERACTIVE)) setHovering(true); };
    const hoverOut = (e) => { if (e.target.closest(INTERACTIVE)) setHovering(false); };
    document.addEventListener("mouseover", hoverIn);
    document.addEventListener("mouseout", hoverOut);

    document.body.classList.add("custom-cursor-active");

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", hoverIn);
      document.removeEventListener("mouseout", hoverOut);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mx, my]);

  if (!visible) return null;

  return (
    <>
      {/* Outer glow blob — slowest */}
      <motion.div
        className="cursor-glow"
        style={{
          x: glowX, y: glowY,
          opacity: visible ? (hovering ? 0.35 : 0.15) : 0,
          scale: hovering ? 2.4 : clicking ? 0.8 : 1,
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />

      {/* Ring — medium lag */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX, y: ringY,
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.65 : clicking ? 0.7 : 1,
          borderColor: hovering ? "rgba(199,112,240,0.9)" : "rgba(199,112,240,0.5)",
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 22 } }}
      />

      {/* Dot — instant */}
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX, y: dotY,
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.6 : hovering ? 0 : 1,
        }}
        transition={{ scale: { type: "spring", stiffness: 400, damping: 20 } }}
      />
    </>
  );
}
