import React, { useState, useEffect, lazy, Suspense } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import BackToTop from "./components/BackToTop";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./context/ThemeContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
/*
 * Import order is load-bearing. Bootstrap used to be imported LAST, so it won
 * every specificity tie against our own rules — which is why the stylesheet
 * had accumulated 400+ `!important` declarations just to be heard. Vendor CSS
 * first, then tokens, then our styles, so normal cascade order applies.
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/tokens.css";
import "./style.css";
import "./App.css";

/*
 * Home stays in the main bundle — it is the landing route and splitting it
 * would only add a round trip. The rest are split so a visitor who never
 * opens /resume doesn't download react-pdf, which is by far the heaviest
 * dependency in the tree.
 */
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Resume = lazy(() => import("./components/Resume/ResumeNew"));
const Contact = lazy(() => import("./components/Contact/Contact"));

// Studio (Lungas Web Lab) is a fully separate namespace from the personal
// portfolio above — own layout, own data, own brand tokens — split into its
// own chunk so a visitor who only cares about the engineering portfolio
// never downloads it.
const StudioLayout = lazy(() => import("./studio/layout/StudioLayout"));
const StudioHome = lazy(() => import("./studio/pages/StudioHome"));

function RouteFallback() {
  return <div className="route-loading" aria-busy="true" aria-live="polite" />;
}

function App() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {/*
        GitHub Pages serves this project at /my-portfolio, Netlify at /.
        PUBLIC_URL carries whichever the build targeted, so routes resolve
        correctly on both without a second codepath.
      */}
      <Router basename={process.env.PUBLIC_URL}>
        <CustomCursor />
        <BackToTop />
        <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          {/* First focusable element on every page. Off-screen until it
              receives keyboard focus, at which point it becomes the fastest
              way past the nav for anyone not using a pointer. */}
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <ScrollToTop />
          {/* The only <main> landmark in the app — also what the skip link
              and route-to-route focus reset (ScrollToTop) target. tabIndex
              makes it focusable so activating the skip link actually moves
              keyboard focus, not just the scroll position. */}
          <main id="main-content" tabIndex={-1}>
            <ErrorBoundary>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/project" element={<Projects />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Lungas Web Lab — the freelance/business side, kept
                      structurally separate from the routes above. */}
                  <Route path="/studio" element={<StudioLayout />}>
                    <Route index element={<StudioHome />} />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
