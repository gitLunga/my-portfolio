# Portfolio — Lunga Nhlakanipho Ntshingila

Personal portfolio of **Lunga Nhlakanipho Ntshingila**, a Computer Science graduate
and full-stack developer based in Pretoria, South Africa. Also hosts **Lungas Web
Lab** (`/studio`), a separate freelance-studio namespace with its own brand
identity — see [Studio namespace](#studio-namespace) below.

**Live:** https://gitlunga.github.io/my-portfolio/

![Social preview](./public/og-image.png)

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | React 18 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| UI | React Bootstrap 5, custom CSS |
| Build | Vite 5 |
| Testing | Vitest + Testing Library |
| Icons | react-icons, lucide-react |

## Getting started

```bash
npm ci          # install exact dependency versions
npm start       # dev server, http://localhost:5173
npm run build   # production build into ./build
npm run preview # serve the production build locally
npm test        # run the test suite once
npm run test:watch  # test suite in watch mode
npm run brand   # regenerate favicons + social share card
npm run images  # re-encode src/Assets to WebP at display sizes
```

Every JSX file in `src/` is named `.js`, not `.jsx` — the Create React App
convention this project was originally built under, before its Phase 7 Vite
migration. Vite's dev server tolerates that; the production build needs a small
plugin (`loadJsAsJsx` in `vite.config.js`) to treat `.js` as JSX, since a mass
rename across every file and its imports was far riskier than the plugin.

## Project layout

```
public/            static shell, manifest, generated brand assets
scripts/           build-time asset generation, dev-only screenshot/audit tools
src/
  components/
    About/         bio, tech stack, experience timeline, achievements
    Contact/       contact form and details
    Home/          hero, intro, animated stats
    Projects/      project grid, filters, detail modal
    Resume/        embedded PDF viewer
  context/         theme provider (light/dark)
  hooks/           useFocusTrap — the project detail modal's focus trap
  studio/          Lungas Web Lab — see below, kept separate on purpose
  styles/tokens.css  design tokens — the only place colours are defined
  style.css        global styles
  utils/accessibleColor.js  nudges a brand colour's lightness until it clears
                    a WCAG contrast target, preserving hue
```

**Theming.** `tokens.css` declares primitive and semantic custom properties;
the light theme redefines the semantic layer only, under `[data-theme="light"]`.
Components reference tokens, never raw hex values, so a theme change is a token
change. Bootstrap is imported *before* our stylesheets so normal cascade order
applies — the codebase carries no `!important`.

## Studio namespace

`/studio/*` is Lungas Web Lab, the freelance side of this site — kept
structurally separate from the personal portfolio above rather than woven
through it:

- `src/studio/data/` — pricing and client-work data, entirely separate from
  `src/components/Projects/Projects.js`'s personal-portfolio project list.
  `clientWork.js` ships empty on purpose until real client work is ready to
  publish.
- `src/studio/styles/studio-tokens.css` redefines only the *accent* tokens
  (orange/violet) under `[data-brand="studio"]` — every surface/text token
  still comes from the shared `tokens.css`, so dark/light mode works
  identically on both sides without a second theme system.
- `StudioLayout` sets `data-brand="studio"` on `<html>` for the lifetime of
  any `/studio` route (via a React Router layout route) and renders the
  studio's own sub-navigation, separate from the site-wide `Navbar`.

## Brand assets

`favicon.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` and
`og-image.png` are **generated**, not hand-edited. Update the tokens or copy in
[`scripts/generate-brand-assets.mjs`](scripts/generate-brand-assets.mjs) and run:

```bash
npm run brand
```

## Images

Source art lives in `src/Assets` as WebP, encoded by
[`scripts/optimize-images.mjs`](scripts/optimize-images.mjs) at the sizes the UI
actually renders. Full-bleed backgrounds keep their native width; everything
else is capped. Re-run `npm run images` after adding artwork.

## Testing

Vitest, run against a jsdom environment configured in `vite.config.js`'s `test`
block. `src/setupTests.js` stubs several browser APIs jsdom doesn't implement
that this app depends on — `matchMedia` (theme/reduced-motion detection),
`IntersectionObserver` (every scroll-reveal animation), `window.scrollTo`, and
a canvas 2D context (the particle background) — plus registers
`afterEach(cleanup)` explicitly, which wasn't reliably auto-detected under
Vitest the way it is under Jest.

`{ hidden: true }` shows up on a couple of navbar role queries
(`Navbar.test.js`, `App.test.js`): Bootstrap's real collapsed-nav CSS applies
under jsdom (mobile-first `display: none` by default) but jsdom has no real
viewport for the desktop `@media` override to match against, so the nav is
correctly collapsed rather than broken — those queries opt out of the
visibility check on purpose rather than working around a bug that isn't there.

CI (`.github/workflows/ci.yml`) runs the suite and a production build on every
push and pull request, separately from the deploy workflow.

## Deployment

The site is deployed two ways from the same source:

- **GitHub Pages** — `.github/workflows/static.yml` builds on every push to
  `main` with `VITE_BASE_PATH=/my-portfolio/`, copies `index.html` to
  `404.html` so client-side routes survive a hard refresh or a shared deep
  link, and publishes `./build`.
- **Netlify** — `netlify.toml` doesn't set `VITE_BASE_PATH`, so Vite's `base`
  defaults to `/` (Netlify serves from the domain root) — and adds the SPA
  redirect rule plus cache headers.

`BrowserRouter` reads its `basename` from `import.meta.env.BASE_URL`
(`vite.config.js`'s `base`, trailing slash stripped), so both targets work
without a second codepath.

Building locally with a non-default base path needs the same env var:

```bash
VITE_BASE_PATH=/my-portfolio/ npm run build
```

On Windows in Git Bash specifically, MSYS mangles anything that looks like a
Unix absolute path before Node ever sees it — `/my-portfolio/` silently
becomes `/C/Program Files/Git/my-portfolio/`. Prefix with
`MSYS_NO_PATHCONV=1` to stop that:

```bash
MSYS_NO_PATHCONV=1 VITE_BASE_PATH=/my-portfolio/ npm run build
```

Source maps are disabled for every build (`vite.config.js`'s `build.sourcemap:
false`) — they were previously 24 MB of a 27 MB deploy and nothing fetches them
outside devtools.

## Licence

MIT — see the `license` field in `package.json`.
