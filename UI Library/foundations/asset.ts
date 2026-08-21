// ═══════════════════════════════════════════
// Static asset paths
//
// Fonts, logos and brand marks are served as files out of `UI Library/assets` via
// Storybook's `staticDirs` — they are never imported, so nothing rewrites their URLs at
// build time. That makes the path a string the code has to get right on its own.
//
// It was wrong. Every one of them was written from the domain root (`/logos/…`), which is
// correct only when the site IS the domain root. GitHub Pages serves this project under
// `/storybook-ltp/`, so every font and every logo 404'd there while working perfectly on
// localhost — the whole library rendered in a fallback font and 112 logos drew as broken
// images, and no gate noticed, because the files really were deployed and the code really
// did point at a valid-looking path.
//
// `import.meta.env.BASE_URL` is what Vite substitutes for wherever the build is mounted:
// `/` in dev, whatever `--base` says in CI. One place decides, everything else asks.
// ═══════════════════════════════════════════

/**
 * Resolve a path inside `UI Library/assets` against wherever this build is mounted.
 *
 * Pass the path without a leading slash — `asset('logos/gp-lottery.png')`. A leading slash
 * is tolerated and stripped, because that is the shape everyone will type out of habit.
 */
export const asset = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};
