import { readFile } from "node:fs/promises";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import esbuild from "esbuild";

// The site deploys to two places with two different base paths: GitHub
// Pages serves it from /my-portfolio/ (a project site, not a user site),
// Netlify serves it from the domain root. CRA solved this with the
// `homepage` field in package.json plus a build-time PUBLIC_URL override;
// Vite's equivalent is the `base` config option, so it's driven the same
// way — an env var the GitHub Actions workflow sets, left unset (defaulting
// to "/") everywhere else including Netlify and local dev.
const basePath = process.env.VITE_BASE_PATH || "/";

/**
 * Every JSX file in this codebase is named .js, not .jsx — the CRA/Babel
 * convention this project was built under. Vite's dev server tolerates
 * that, but the production build (Rollup) parses .js as plain JS before
 * any esbuild transform runs, and fails on the first JSX it hits — the
 * top-level `esbuild.loader`/`optimizeDeps` options don't reach this
 * earlier import-analysis step, only later transform stages.
 *
 * Renaming ~40 files, and every import of them, to fix an extension is far
 * riskier than intercepting .js loads here and transforming them as JSX
 * ourselves first. This is Vite's own documented workaround for migrating
 * a codebase that used .js for JSX (see vite.dev/guide/troubleshooting).
 */
function loadJsAsJsx() {
  return {
    name: "load-js-files-as-jsx",
    async load(id) {
      if (!id.match(/\/src\/.*\.js$/)) return null;
      const source = await readFile(id, "utf-8");
      // jsx: "automatic" to match @vitejs/plugin-react's own default for
      // .jsx files — without this esbuild defaults to the classic
      // React.createElement transform, which needs `React` in scope. Every
      // component file here happens to still `import React` (the CRA
      // convention it was generated under) so that difference was
      // invisible, but test files written without it broke immediately:
      // "React is not defined". Matching the transform mode removes the
      // inconsistency instead of papering over it with imports.
      return esbuild.transform(source, {
        loader: "jsx",
        jsx: "automatic",
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [loadJsAsJsx(), react()],
  build: {
    // Kept as "build" rather than Vite's default "dist" so the GitHub Pages
    // workflow, netlify.toml and .gitignore didn't all need a second,
    // unrelated change alongside the bundler swap.
    outDir: "build",
    // Matches the old .env.production's GENERATE_SOURCEMAP=false — the
    // maps were 24MB of a 27MB deploy and nothing fetches them outside
    // devtools.
    sourcemap: false,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    globals: true,
    css: true,
  },
});
