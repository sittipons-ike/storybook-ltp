// ═══════════════════════════════════════════
// ActionBar Design Tokens
//
// No values here. Layout is authored in
// design-library/lotteryplus/components/top-and-footer.json; the colours it reaches for
// belong to `colors/background` and `colors/navigation-border`, not to a group of its own.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('topfoot');

/**
 * The sticky bar of actions pinned to the bottom of a page.
 *
 * This is the one component in the library with no Figma component set behind it. It
 * exists in Figma only as a frame drawn inside the page template — confusingly named
 * `Navbar`, though it is not one — and in the Frontend as `components/common/footer-button`
 * with 17 call sites. Volume like that is what §3.3 of the Standard means by evidence, so
 * it is modelled here and Figma should componentise it.
 */
export const ACTION_BAR = {
  background: t.ref('action-background'),
  border: t.ref('action-border'),
  borderWidth: t.ref('action-border-width'),
  padding: t.ref('action-padding'),
  gap: t.ref('action-gap'),
  buttonHeight: t.ref('action-button-height'),
  secondaryBasis: t.ref('action-secondary-basis'),

  homeIndicatorHeight: t.ref('home-indicator-height'),
  homeIndicatorBarWidth: t.ref('home-indicator-bar-width'),
  homeIndicatorBarHeight: t.ref('home-indicator-bar-height'),
  homeIndicatorBarRadius: t.ref('home-indicator-bar-radius'),
  homeIndicatorForeground: t.ref('home-indicator-foreground'),
} as const;
