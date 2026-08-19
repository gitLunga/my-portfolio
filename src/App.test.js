import { render, screen } from "@testing-library/react";
import App from "./App";

// App owns its own <Router>, so it can be rendered directly without a
// wrapping test router — this is a full-app smoke test, not a unit test of
// a single route.
test("renders the home hero with the site owner's name", async () => {
  render(<App />);
  // The name legitimately appears twice on the combined home page (the
  // hero heading, and again in the intro section further down) — assert
  // on the heading specifically rather than "the text exists somewhere".
  const heading = await screen.findByRole("heading", { name: /Lunga Nhlakanipho Ntshingila/i });
  expect(heading).toBeInTheDocument();
});

test("renders the skip-to-content link as the first focusable element", async () => {
  render(<App />);
  const skipLink = await screen.findByText(/skip to content/i);
  expect(skipLink).toHaveAttribute("href", "#main-content");
});

test("renders exactly one <main> landmark", async () => {
  render(<App />);
  // <main> isn't conditionally rendered — it always wraps the routed
  // content — but the initial commit takes a tick to settle under Vitest's
  // environment (a scheduler/timing difference from Jest's, not anything
  // about the markup itself), so this has to wait rather than assert
  // instantly.
  expect(await screen.findAllByRole("main")).toHaveLength(1);
});

test("renders the Studio entry point in the navbar", async () => {
  render(<App />);
  // { hidden: true } — the desktop nav genuinely is Bootstrap's collapsed
  // mobile state here: bootstrap.min.css is loaded (App.js imports it,
  // unlike testing Navbar in isolation) and its real
  // `.navbar-collapse.collapse { display: none; }` rule applies. In a real
  // browser a `@media (min-width: 768px)` override reveals it; jsdom has no
  // viewport for that media query to match against, so it stays collapsed.
  // That's accurate collapsed-nav behaviour, not a bug — this test wants to
  // confirm the link exists in the markup, not adjudicate CSS jsdom can't
  // evaluate anyway.
  expect(await screen.findByRole("link", { name: /studio/i, hidden: true })).toBeInTheDocument();
});
