import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeContext";

function Probe() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggle}>toggle</button>
    </>
  );
}

// jsdom's matchMedia isn't implemented by default — stub it so
// getInitialTheme's OS-preference fallback has something to read.
function mockMatchMedia(prefersLight) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === "(prefers-color-scheme: light)" ? prefersLight : false,
    media: query,
    addListener: () => {},
    removeListener: () => {},
  }));
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

test("defaults to the OS preference when nothing is stored", () => {
  mockMatchMedia(true); // OS prefers light
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );
  expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
});

test("falls back to dark when the OS has no light preference", () => {
  mockMatchMedia(false);
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );
  expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
});

test("a stored preference overrides the OS default", () => {
  mockMatchMedia(false); // OS says dark
  localStorage.setItem("portfolio-theme", "light"); // but the user chose light last time
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );
  expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
});

test("toggling flips the theme, persists it, and sets data-theme on <html>", () => {
  mockMatchMedia(false);
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );

  fireEvent.click(screen.getByText("toggle"));

  expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
  expect(localStorage.getItem("portfolio-theme")).toBe("light");
  expect(document.documentElement.getAttribute("data-theme")).toBe("light");
});
