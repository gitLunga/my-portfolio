# Portfolio — Lunga Nhlakanipho Ntshingila

Personal portfolio of **Lunga Nhlakanipho Ntshingila**, a Computer Science graduate
and full-stack developer based in Pretoria, South Africa.

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
| Build | Create React App (`react-scripts` 5) |
| Icons | react-icons, lucide-react |

## Getting started

```bash
npm ci          # install exact dependency versions
npm start       # dev server on http://localhost:3000
npm run build   # production build into ./build
npm test        # test runner
npm run brand   # regenerate favicons + social share card
npm run images  # re-encode src/Assets to WebP at display sizes
```

## Project layout

```
public/            static shell, manifest, generated brand assets
scripts/           build-time asset generation
src/
  components/
    About/         bio, tech stack, experience timeline, achievements
    Contact/       contact form and details
    Home/          hero, intro, animated stats
    Projects/      project grid, filters, detail modal
    Resume/        embedded PDF viewer
  context/         theme provider (light/dark)
  styles/tokens.css  design tokens — the only place colours are defined
  style.css        global styles
```**Theming.** `tokens.css` declares primitive and semantic custom properties;
the light theme redefines the semantic layer only, under `[data-theme="light"]`.
Components reference tokens, never raw hex values, so a theme change is a token
change. Bootstrap is imported *before* our stylesheets so normal cascade order
applies — the codebase carries no `!important`.

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

## Deployment

The site is deployed two ways from the same source:

- **GitHub Pages** — `.github/workflows/static.yml` builds on every push to
  `main`, copies `index.html` to `404.html` so client-side routes survive a
  hard refresh, and publishes `./build`. Served from the `/my-portfolio`
  subpath, which `homepage` in `package.json` accounts for.
- **Netlify** — `netlify.toml` overrides `PUBLIC_URL` to `/` (Netlify serves
  from the domain root) and adds the SPA redirect rule plus cache headers.

`BrowserRouter` reads its `basename` from `process.env.PUBLIC_URL`, so both
targets work without a second codepath.

`.env.production` disables source maps for released builds — they accounted for
24 MB of a 27 MB output and are of no use to visitors.

## Licence

MIT — see the `license` field in `package.json`.
