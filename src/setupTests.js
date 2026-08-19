// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// @testing-library/react is supposed to auto-register `afterEach(cleanup)`
// when it detects a global test-framework `afterEach` — which both Jest and
// Vitest (with `test.globals: true`) expose — but relying on the bare
// global here didn't reliably clean up between tests (a setup file runs
// before Vitest's globals injection is guaranteed to be live at module
// evaluation time). Importing afterEach directly from vitest sidesteps
// that ambiguity entirely.
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
afterEach(cleanup);

// jsdom doesn't implement matchMedia at all — every component that reads a
// media query (ThemeContext's OS-preference fallback, framer-motion's
// useReducedMotion, the reduced-motion CSS checks) would otherwise throw
// "window.matchMedia is not a function" the instant it rendered. Defined
// globally here rather than per-test-file since almost everything in this
// app renders through ThemeProvider one way or another.
//
// Defaults to "no match" for every query (system prefers dark, motion not
// reduced) — the same effective default the real browser APIs fall back to
// before a query is known to match.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// jsdom doesn't implement IntersectionObserver — framer-motion's
// whileInView/useInView (every Reveal/StaggerReveal on the page) reads it
// directly and throws ReferenceError without this. A no-op stub is enough:
// tests render content synchronously and don't depend on the scroll-in
// animation actually firing.
window.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// jsdom implements <canvas> but not its 2D context (that requires the
// native `canvas` package, which isn't installed here) — the particle
// background (Particle.js, rendered on most pages) tries to get one on
// mount and logs a "Not implemented" error on every single test otherwise.
// A no-op stub is enough: tests don't assert anything about the particle
// canvas's actual pixels.
HTMLCanvasElement.prototype.getContext = () => null;

// jsdom doesn't implement window.scrollTo either — ScrollToTop.js calls it
// on every route change (including the initial mount), and jsdom logs a
// "Not implemented" error rather than silently no-op'ing.
window.scrollTo = () => {};
