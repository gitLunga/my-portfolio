/**
 * Client work shown on /studio/work — kept entirely separate from
 * src/components/Projects/Projects.js's personal-portfolio project data.
 * That separation is deliberate: this is commissioned work for paying
 * clients, described from the client's perspective (their business, their
 * outcome), not a technical showcase of what was built for a CV.
 *
 * Empty for now — the studio has no client work loaded yet. Add entries in
 * this shape as real projects are ready to publish; the /studio/work page
 * already handles the empty state honestly rather than shipping placeholder
 * projects that would misrepresent the studio's track record.
 *
 * {
 *   id: "unique-slug",
 *   clientName: "Business name",
 *   industry: "e.g. Hospitality, Retail",
 *   summary: "One sentence on what was built and for whom.",
 *   outcome: "The result in the client's terms, e.g. '40% more bookings'.",
 *   imgPath: importedImage,
 *   liveLink: "https://...",          // optional
 *   testimonial: { quote: "...", author: "..." }, // optional
 * }
 */
export const CLIENT_WORK = [];
