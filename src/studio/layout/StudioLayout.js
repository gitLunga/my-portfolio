import React, { useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { STUDIO_CONTACT, buildWhatsAppLink } from "../data/packages";
// Imported here rather than in App.js: this way it ships only in the
// studio route's own lazy chunk, not the main bundle every visitor pays
// for regardless of whether they ever open /studio.
import "../styles/studio-tokens.css";

const SUB_NAV = [
  { to: "/studio", label: "Overview", end: true },
  { to: "/studio/services", label: "Services" },
  { to: "/studio/work", label: "Work" },
  { to: "/studio/process", label: "Process" },
  { to: "/studio/quote", label: "Get a Quote" },
];

/**
 * Wraps every /studio/* route (via a parent <Route element={<StudioLayout/>}>
 * in App.js, with child routes rendered through <Outlet/>). Two jobs:
 *
 * 1. Stamps data-brand="studio" on the document root for as long as any
 *    studio route is mounted, and clears it on unmount — this is the one
 *    switch the whole orange/violet identity in studio-tokens.css hangs off
 *    of. Scoped to the document element (not a wrapper div) because fixed-
 *    position children like the navbar live outside this component's own
 *    DOM subtree but still need to inherit the custom properties.
 * 2. Renders the studio's own sub-navigation, separate from the site-wide
 *    Navbar — the same pattern a lot of "product within a site" sections
 *    use: one global nav for the whole site, a local one for this section.
 */
function StudioLayout() {
  useEffect(() => {
    document.documentElement.setAttribute("data-brand", "studio");
    return () => document.documentElement.removeAttribute("data-brand");
  }, []);

  return (
    <div className="studio-shell">
      <div className="studio-subnav-wrapper">
        <div className="studio-subnav">
          <Link to="/studio" className="studio-subnav-brand">
            Lungas Web Lab
          </Link>
          <nav className="studio-subnav-links" aria-label="Studio section">
            {SUB_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  "studio-subnav-link" + (isActive ? " studio-subnav-link-active" : "")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={buildWhatsAppLink(`Hi ${STUDIO_CONTACT.ownerName}, I'd like to ask about a website.`)}
            target="_blank"
            rel="noreferrer"
            className="studio-subnav-cta"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default StudioLayout;
