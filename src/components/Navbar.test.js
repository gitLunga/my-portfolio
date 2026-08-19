import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "./Navbar";

function renderNavbar() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </MemoryRouter>
  );
}

test("renders every primary nav destination, including Studio", () => {
  renderNavbar();
  // { hidden: true } — this test doesn't import bootstrap.min.css (only
  // App.js does), so the real .navbar-collapse.collapse { display: none }
  // rule never actually applies here and these queries pass either way.
  // Included anyway so this stays correct if that ever changes — see
  // App.test.js's "Studio entry point" test for the full explanation of
  // why the collapsed nav is expected, accurate behaviour under jsdom
  // rather than something to work around.
  for (const name of [/home/i, /about/i, /projects/i, /resume/i, /studio/i, /contact/i]) {
    expect(screen.getByRole("link", { name, hidden: true })).toBeInTheDocument();
  }
});

test("the theme toggle button flips data-theme on <html>", () => {
  document.documentElement.setAttribute("data-theme", "dark");
  renderNavbar();

  fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

  expect(document.documentElement.getAttribute("data-theme")).toBe("light");
});

test("the scroll listener is cleaned up on unmount (regression: it used to attach a new one on every render)", () => {
  const addSpy = vi.spyOn(window, "addEventListener");
  const removeSpy = vi.spyOn(window, "removeEventListener");

  const { unmount } = renderNavbar();
  const scrollAddCalls = addSpy.mock.calls.filter(([event]) => event === "scroll").length;
  expect(scrollAddCalls).toBe(1);

  unmount();
  const scrollRemoveCalls = removeSpy.mock.calls.filter(([event]) => event === "scroll").length;
  expect(scrollRemoveCalls).toBe(1);

  addSpy.mockRestore();
  removeSpy.mockRestore();
});
