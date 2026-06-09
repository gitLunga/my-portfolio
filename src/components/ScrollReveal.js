import React from "react";
import { motion } from "framer-motion";

/* ─── Variants ────────────────────────────────────────────── */
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -36 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.82 },
    visible: { opacity: 1, scale: 1 },
  },
  blurUp: {
    hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: 20, y: 40 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
};

const spring = [0.22, 1, 0.36, 1]; // custom ease — snappy with natural settle

/* ─── Reveal — scroll-triggered, fires once ──────────────── */
export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.65,
  className = "",
  style = {},
  as = "div",
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration, delay, ease: spring }}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}

/* ─── StaggerReveal — parent that staggers children ─────── */
export function StaggerReveal({
  children,
  stagger = 0.11,
  delayChildren = 0.05,
  className = "",
  style = {},
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── RevealItem — child of StaggerReveal ───────────────── */
export function RevealItem({
  children,
  variant = "fadeUp",
  duration = 0.6,
  className = "",
  style = {},
}) {
  return (
    <motion.div
      variants={variants[variant]}
      transition={{ duration, ease: spring }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── HeroReveal — above-the-fold, animate on mount ─────── */
export function HeroReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  className = "",
  style = {},
}) {
  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      animate="visible"
      transition={{ duration, delay, ease: spring }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
