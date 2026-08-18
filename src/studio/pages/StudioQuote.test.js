import { render, screen, fireEvent } from "@testing-library/react";
import StudioQuote from "./StudioQuote";

// The summary total is queried by testid rather than its rendered text:
// JSX renders `{a} – {b}` as three separate text nodes, and the tier-option
// buttons above contain the same price fragments, so a getByText() on the
// combined string is ambiguous about which element it's matching.
const total = () => screen.getByTestId("quote-total").textContent.trim();

test("defaults to the first tier's price range", () => {
  render(<StudioQuote />);
  expect(total()).toBe("R600 – R1 000");
});

test("selecting a different tier updates the estimate", () => {
  render(<StudioQuote />);
  fireEvent.click(screen.getByRole("button", { name: /Payment Gateway/i }));
  // Payment Gateway (PayFast) is R2 500 - R5 000 on its own.
  expect(total()).toBe("R2 500 – R5 000");
});

test("add-ons sum onto the selected tier's range", () => {
  render(<StudioQuote />);
  fireEvent.click(screen.getByRole("button", { name: /Payment Gateway/i }));
  fireEvent.click(screen.getByRole("button", { name: /Basic SEO setup/i }));
  fireEvent.click(screen.getByRole("button", { name: /Simple logo design/i }));
  // R2 500-R5 000 + R200-R400 (SEO) + R250-R500 (logo) = R2 950-R5 900
  expect(total()).toBe("R2 950 – R5 900");
});

test("deselecting an add-on removes it from the total", () => {
  render(<StudioQuote />);
  const seoButton = screen.getByRole("button", { name: /Basic SEO setup/i });
  fireEvent.click(seoButton); // on
  fireEvent.click(seoButton); // off
  expect(total()).toBe("R600 – R1 000");
});

test("the WhatsApp link carries the selected package and totals", () => {
  render(<StudioQuote />);
  fireEvent.click(screen.getByRole("button", { name: /Small Business Site/i }));

  const link = screen.getByRole("link", { name: /Send This to WhatsApp/i });
  const message = decodeURIComponent(new URL(link.getAttribute("href")).searchParams.get("text"));

  expect(message).toContain("Small Business Site");
  expect(message).toContain("R1 000 – R2 500");
});

test("name and project details typed in step 3 are folded into the WhatsApp message", () => {
  render(<StudioQuote />);
  fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: "Thandiwe" } });
  fireEvent.change(screen.getByLabelText(/What's the project/i), {
    target: { value: "A site for my catering business" },
  });

  const link = screen.getByRole("link", { name: /Send This to WhatsApp/i });
  const message = decodeURIComponent(new URL(link.getAttribute("href")).searchParams.get("text"));

  expect(message).toContain("Thandiwe");
  expect(message).toContain("A site for my catering business");
});
