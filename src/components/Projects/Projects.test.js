import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { ThemeProvider } from "../../context/ThemeContext";
import Projects from "./Projects";

function renderProjects() {
  return render(
    <ThemeProvider>
      <Projects />
    </ThemeProvider>
  );
}

test("renders the full project grid by default", () => {
  renderProjects();
  expect(screen.getByRole("heading", { name: /My Recent Works/i })).toBeInTheDocument();
  // The "All" filter tab shows the total count as a live check that the
  // grid and the tab counts didn't drift apart.
  const allTab = screen.getByRole("button", { name: /All/i });
  expect(within(allTab).getByText("8")).toBeInTheDocument();
});

test("filtering narrows the grid to the selected category", async () => {
  renderProjects();
  fireEvent.click(screen.getByRole("button", { name: /Frontend/i }));
  // Tshwane Find is Full-Stack, not Frontend — it should disappear once
  // the Frontend filter is active. AnimatePresence keeps it mounted through
  // its exit transition, so this has to wait rather than assert instantly.
  await waitFor(() => expect(screen.queryByText("Tshwane Find")).not.toBeInTheDocument());
  expect(screen.getByText("DJ Mega Portfolio")).toBeInTheDocument();
});

test("a project with no public repo shows 'Private source' instead of a dead GitHub link", () => {
  renderProjects();
  expect(screen.getByText(/Private source/i)).toBeInTheDocument();
});

test("opening a project's details renders it as a labelled dialog", () => {
  renderProjects();
  fireEvent.click(screen.getAllByRole("button", { name: /View Details/i })[0]);

  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
  // The dialog's accessible name should come from the project title it
  // opened for, via aria-labelledby, not be unlabelled.
  expect(within(dialog).getByText("Tshwane Find")).toBeInTheDocument();
});

test("Escape closes the open dialog", async () => {
  renderProjects();
  fireEvent.click(screen.getAllByRole("button", { name: /View Details/i })[0]);
  expect(screen.getByRole("dialog")).toBeInTheDocument();

  fireEvent.keyDown(window, { key: "Escape" });

  // The popup plays a 280ms close animation before actually unmounting
  // (see ProjectPopup's close()), so this can't be a synchronous assertion.
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(), {
    timeout: 1000,
  });
});
