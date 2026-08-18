import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position on every route change, and — for every navigation
 * after the first — moves focus to the <main> landmark too.
 *
 * A client-side route change doesn't reload the document, so nothing tells
 * a screen reader a new page loaded unless focus is moved explicitly; without
 * this, focus just stays wherever it was on the link that was clicked. The
 * very first render is skipped deliberately: the browser already places
 * focus correctly on initial page load, and stealing it immediately would
 * fight that rather than help.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    document.getElementById("main-content")?.focus();
  }, [pathname]);

  return null;
}

export default ScrollToTop;
