import { asset } from '../ui/foundations/asset';

// ═══════════════════════════════════════════
// Graphik TH — the real product font.
//
// These seven @font-face rules lived in preview.css as `url('/fonts/…')` and were the
// reason the deployed Storybook rendered entirely in the fallback face: Vite rewrites its
// OWN emitted assets against `base`, but an absolute `url()` written by hand in CSS it
// leaves exactly as typed. Verified by building with a base set and grepping the output —
// the JS picked the base up and the CSS did not.
//
// A stylesheet cannot ask where it is mounted. This can, so the rules are built here and
// injected, which is the only way `asset()` can reach them.
//
// Same seven files the Frontend loads in `_app.tsx`, at the same weights, so a story and a
// page render identical text.
// ═══════════════════════════════════════════

const WEIGHTS: [string, number][] = [
  ['Thin', 100],
  ['Extralight', 200],
  ['Light', 300],
  ['Regular', 400],
  ['Medium', 500],
  ['Semibold', 600],
  ['Bold', 700],
];

export const graphikFontFace = (): string =>
  WEIGHTS.map(
    ([style, weight]) =>
      `@font-face{font-family:'Graphik TH';` +
      `src:url('${asset(`fonts/GraphikThai/GraphikThai-${style}.otf`)}') format('opentype');` +
      `font-weight:${weight};font-display:swap;}`,
  ).join('\n');

/** Injected once, before the first story paints, so no frame renders on the fallback. */
export const installFonts = (): void => {
  if (typeof document === 'undefined') return;
  const id = 'ltp-graphik-th';
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = graphikFontFace();
  document.head.appendChild(el);
};
