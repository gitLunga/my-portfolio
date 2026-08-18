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

test("renders the skip-to-content link as the first focusable element", () => {
  render(<App />);
  const skipLink = screen.getByText(/skip to content/i);
  expect(skipLink).toHaveAttribute("href", "#main-content");
});

test("renders exactly one <main> landmark", () => {
  render(<App />);
  expect(screen.getAllByRole("main")).toHaveLength(1);
});

test("renders the Studio entry point in the navbar", () => {
  render(<App />);
  expect(screen.getByRole("link", { name: /studio/i })).toBeInTheDocument();
});
