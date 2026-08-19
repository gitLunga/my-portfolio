import React from "react";
import { LottieLight } from "lottie-react";
import { useReducedMotion } from "framer-motion";

/**
 * Thin wrapper around lottie-react for the two decorative Studio animations
 * (hero accent, work-page empty state). Both are purely ornamental — no
 * information lives in them that isn't already in surrounding text — so a
 * reduced-motion request is handled by rendering nothing at all rather than
 * a frozen frame: one less moving thing to reason about, and no layout is
 * built around the animation being present.
 *
 * LottieLight (svg-only, no expression engine) rather than the full Lottie
 * build: both animations here are hand-authored shape layers animating only
 * position/scale/rotation/opacity — no expressions, no non-svg renderer
 * needed — and the light build is the smaller of the two for that case.
 */
function LottiePlayer({ animationData, className, style }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return null;
  }

  return (
    <LottieLight
      src={animationData}
      loop
      autoplay
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}

export default LottiePlayer;
