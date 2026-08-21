// ═══════════════════════════════════════════
// NavigationBar Design Tokens
//
// This file holds NO values. Colours live in Figma's `colors/navigation-bar` group and
// are mirrored into components.json by tools/gen-components.py; layout, sizing and
// typography are authored in design-library/lotteryplus/components/navigation-bar.json.
// Both flow into foundations/tokens.css (CSS custom properties, prefix `--navigation-*`)
// and foundations/tokens.generated.ts (resolved literals).
//
// What this file adds is types and lookup helpers, so NavigationBar.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify:     python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component, sys, sysValue } from '../../foundations/tokens';

/** Bound to the Figma group `colors/navigation-bar`, whose css_prefix is `navigation`. */
const t = component('navigation');

export { sys, sysValue };

/** Canonical states, per the Design System Standard. */
export type NavigationState =
  | 'rest'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled'
  | 'selected';

export const NAVIGATION_STATES: readonly NavigationState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
  'selected',
] as const;

/** The five top-level areas the bar navigates between — Figma's `state` variant axis. */
export type NavigationKey = 'home' | 'order' | 'cart' | 'safe' | 'profile';

export const NAVIGATION_KEYS: readonly NavigationKey[] = [
  'home',
  'order',
  'cart',
  'safe',
  'profile',
] as const;

/** CSS variable reference for a NavigationBar token — e.g. `var(--navigation-height)`. */
export const navigationRef = (token: string, fallback?: string): string =>
  t.ref(token, fallback);

/** The literal a NavigationBar token resolves to. Empty string when it is not declared. */
export const navigationValue = (token: string): string => t.value(token);

/** Every `--navigation-*` token declared, without the prefix. Stories enumerate this. */
export const navigationTokenNames = (): string[] => t.names();

/** Numeric form of a token, for the few places React needs a number rather than a length. */
export const navigationNumber = (token: string, fallback: number): number =>
  Number.parseFloat(t.value(token)) || fallback;

// ── Colours ──────────────────────────────────────────────────────────────────

export interface NavigationColorSet {
  /** Label colour. */
  foreground: string;
  /** Icon fill — Icon takes a colour string, so this is the same chain. */
  icon: string;
  /** Selector bar under the item; the background colour hides it when not selected. */
  selector: string;
}

const colorTokens = (state: NavigationState): Record<keyof NavigationColorSet, string> => {
  if (state === 'selected') {
    return { foreground: 'foreground-red', icon: 'foreground-red', selector: 'foreground-red' };
  }
  if (state === 'disabled') {
    return {
      foreground: 'foreground-disable',
      icon: 'foreground-disable',
      selector: 'background-white',
    };
  }
  // rest, hover, focus and active share one appearance in Figma — the component set has
  // no per-state colour for them, so they all resolve to the inactive pair.
  return { foreground: 'foreground-dark', icon: 'foreground-gray', selector: 'background-white' };
};

/** CSS variable references for one state — what NavigationBar.tsx renders with. */
export const navigationColors = (state: NavigationState): NavigationColorSet => {
  const tokens = colorTokens(state);
  return {
    foreground: t.ref(tokens.foreground),
    icon: t.ref(tokens.icon),
    selector: t.ref(tokens.selector),
  };
};

/** Resolved literals for one state — for stories, tables and tests. */
export const navigationColorValues = (state: NavigationState): NavigationColorSet => {
  const tokens = colorTokens(state);
  return {
    foreground: t.value(tokens.foreground),
    icon: t.value(tokens.icon),
    selector: t.value(tokens.selector),
  };
};

/** The Tier 2 token name behind each colour of a state — for the token-chain table. */
export const navigationColorTokens = colorTokens;

// ── Layout, sizing and typography ────────────────────────────────────────────

/** Every value NavigationBar.tsx renders with. No literals — each is a `var(--navigation-*)`. */
export const NAVIGATION = {
  // Shell
  width: t.ref('width'),
  height: t.ref('height'),
  barHeight: t.ref('bar-height'),
  borderWidth: t.ref('border-width'),
  background: t.ref('background-white'),
  borderColor: t.ref('border'),

  // Nav item
  itemHeight: t.ref('item-height'),
  itemPaddingTop: t.ref('item-padding-top'),
  itemPaddingX: t.ref('item-padding-x'),
  itemPaddingBottom: t.ref('item-padding-bottom'),
  itemGap: t.ref('item-gap'),

  // Selector bar
  selectorWidth: t.ref('selector-width'),
  selectorHeight: t.ref('selector-height'),
  selectorRadius: t.ref('selector-radius'),

  // Content frame
  contentWidth: t.ref('content-width'),
  contentHeight: t.ref('content-height'),
  contentOffset: t.ref('content-offset'),

  // Badges
  orderBadgeOffsetTop: t.ref('order-badge-offset-top'),
  orderBadgeOffsetRight: t.ref('order-badge-offset-right'),
  badgeSize: t.ref('badge-size'),
  badgeRadius: t.ref('badge-radius'),
  badgeBorderWidth: t.ref('badge-border-width'),
  badgeLineHeight: t.ref('badge-line-height'),
  badgeOffsetTop: t.ref('badge-offset-top'),
  badgeOffsetRight: t.ref('badge-offset-right'),

  // Cart button (add-to-cart mode)
  cartHeight: t.ref('cart-height'),
  cartRadius: t.ref('cart-radius'),
  cartPadding: t.ref('cart-padding'),
  cartPaddingBottom: t.ref('cart-padding-bottom'),
  cartGap: t.ref('cart-gap'),
  cartGradient: t.ref('cart-gradient'),
  cartBadgeOffsetTop: t.ref('cart-badge-offset-top'),
  cartBadgeOffsetRight: t.ref('cart-badge-offset-right'),

  // Timer pill
  timerBorderWidth: t.ref('timer-border-width'),
  timerRadius: t.ref('timer-radius'),
  timerPaddingX: t.ref('timer-padding-x'),
  timerPaddingY: t.ref('timer-padding-y'),
  timerLineHeight: t.ref('timer-line-height'),

  // Home indicator
  homeIndicatorContainerHeight: t.ref('home-indicator-container-height'),
  homeIndicatorPaddingBottom: t.ref('home-indicator-padding-bottom'),
  homeIndicatorWidth: t.ref('home-indicator-width'),
  homeIndicatorHeight: t.ref('home-indicator-height'),
  homeIndicatorRadius: t.ref('home-indicator-radius'),
  homeIndicatorColor: t.ref('foreground-home-indicator'),

  // Typography — typography/button/xs/medium
  fontFamily: t.ref('typography-family'),
  fontSize: t.ref('typography-size'),
  fontWeight: t.ref('typography-weight'),
  lineHeight: t.ref('typography-line-height'),
  tracking: t.ref('typography-tracking'),

  // Foreground colours used outside the state matrix
  foregroundOnCart: t.ref('foreground-white'),
  foregroundAccent: t.ref('foreground-red'),
} as const;

/**
 * Icon dimensions stay numeric — `size` is an Icon prop, not a CSS length, so it cannot
 * be a `var()`. The number is still read from the generated token, not hand-typed.
 */
export const NAVIGATION_ICON = {
  size: navigationNumber('icon-size', 24) as 24,
  orderBadgeSize: navigationNumber('order-badge-icon-size', 20) as 20,
} as const;

/** Default container width, for the `width` prop. Read from the token, never typed. */
export const NAVIGATION_DEFAULT_WIDTH = navigationNumber('width', 390);
