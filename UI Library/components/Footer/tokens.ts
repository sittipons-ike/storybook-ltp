// ═══════════════════════════════════════════
// Footer Design Tokens
//
// No values here. Colours mirror Figma's `colors/top-and-footer` group; layout is
// authored in design-library/lotteryplus/components/top-and-footer.json.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('topfoot');

/**
 * Figma instance `footer-mobile` on page `↳  footer ✅`, 390×190.
 *
 * Its background is `topfoot-bg-red-dark`, one step darker than the header — the pair
 * is what the group name `top-and-footer` refers to.
 */
export const FOOTER = {
  background: t.ref('footer-background'),
  foreground: t.ref('footer-foreground'),

  paddingTop: t.ref('footer-padding-top'),
  paddingBottom: t.ref('footer-padding-bottom'),
  gap: t.ref('footer-gap'),

  followGap: t.ref('footer-follow-gap'),
  socialSize: t.ref('footer-social-size'),
  socialPadding: t.ref('footer-social-padding'),
  socialRadius: t.ref('footer-social-radius'),
  socialGap: t.ref('footer-social-gap'),

  chipBackground: t.ref('footer-chip-background'),
  chipHeight: t.ref('footer-chip-height'),
  chipPaddingX: t.ref('footer-chip-padding-x'),
  chipPaddingY: t.ref('footer-chip-padding-y'),
  chipGap: t.ref('footer-chip-gap'),
  chipRadius: t.ref('footer-chip-radius'),
  chipShadow: t.ref('footer-chip-shadow'),

  rowPaddingX: t.ref('footer-row-padding-x'),
  rowGap: t.ref('footer-row-gap'),
} as const;
