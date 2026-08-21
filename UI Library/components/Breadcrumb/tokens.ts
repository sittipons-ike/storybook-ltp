// ═══════════════════════════════════════════
// Breadcrumb Design Tokens
//
// This file holds NO values. Every value lives in Figma, flows through design.md and
// components.json (+ design-library/lotteryplus/components/breadcrumb.json for the
// layout/typography overlay), and is generated into foundations/tokens.css (CSS custom
// properties) and foundations/tokens.generated.ts (resolved literals).
//
// What this file adds is types and lookup helpers, so Breadcrumb.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate the source values: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component, sys, sysValue } from '../../foundations/tokens';

/**
 * Canonical states, per the Design System Standard.
 *
 * Breadcrumb renders two of them today: every crumb is `rest` except the last, which is
 * the current page and therefore `selected` (Figma calls that variant "actived").
 * `hover` / `active` / `focus` / `disabled` are declared so the vocabulary stays
 * canonical and a future state has a name waiting for it.
 */
export type BreadcrumbState =
  | 'rest'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled'
  | 'selected';

export const BREADCRUMB_STATES: readonly BreadcrumbState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
  'selected',
] as const;

/** The two states Breadcrumb actually renders — what the stories enumerate. */
export const BREADCRUMB_RENDERED_STATES: readonly BreadcrumbState[] = [
  'rest',
  'selected',
] as const;

const t = component('breadcrumb');

/** CSS variable reference for a Breadcrumb Tier 2 token. */
export const breadcrumbRef = (token: string, fallback?: string): string =>
  t.ref(token, fallback);

/** The literal a Breadcrumb token resolves to. Empty string when it is not declared. */
export const breadcrumbValue = (token: string): string => t.value(token);

/** Every `--breadcrumb-*` token declared by the generator. */
export const breadcrumbTokenNames = (): string[] => t.names();

export interface BreadcrumbColorSet {
  /** Crumb label colour. */
  text: string;
  /** Crumb icon colour. */
  icon: string;
}

/**
 * Colour references for one state.
 *
 * `text` is backed by Figma — `colors/breadcrumb` declares exactly two tokens,
 * `breadcrumb-fg-dark` and `breadcrumb-fg-red`.
 *
 * `icon` is NOT backed by that group. Figma paints breadcrumb icons from the shared
 * `colors/icon` group, so these point straight at the nearest Tier 1 semantic tokens —
 * the same ones `--icon-foreground-secondary` / `--icon-foreground-primary` alias.
 * Referencing the semantic token rather than another component's Tier 2 alias keeps
 * Breadcrumb off a sibling component's contract.
 */
export const breadcrumbColors = (state: BreadcrumbState): BreadcrumbColorSet =>
  state === 'selected'
    ? { text: t.ref('foreground-red'), icon: sys('color-primary-default') }
    : { text: t.ref('foreground-dark'), icon: sys('color-secondary-default') };

/** Resolved literals for one state — for stories, tables and tests. */
export const breadcrumbColorValues = (state: BreadcrumbState): BreadcrumbColorSet =>
  state === 'selected'
    ? { text: t.value('foreground-red'), icon: sysValue('color-primary-default') }
    : { text: t.value('foreground-dark'), icon: sysValue('color-secondary-default') };

/** Separator chevron between crumbs — same semantic token as a `rest` crumb icon. */
export const BREADCRUMB_SEPARATOR_COLOR = sys('color-secondary-default');
export const BREADCRUMB_SEPARATOR_COLOR_VALUE = sysValue('color-secondary-default');

/** Font weight reference for one state. */
export const breadcrumbFontWeight = (state: BreadcrumbState): string =>
  state === 'selected' ? t.ref('typography-weight-selected') : t.ref('typography-weight-rest');

export const breadcrumbFontWeightValue = (state: BreadcrumbState): string =>
  state === 'selected'
    ? t.value('typography-weight-selected')
    : t.value('typography-weight-rest');

/** Layout and typography shared by every crumb — what Breadcrumb.tsx renders with. */
export const BREADCRUMB_BASE = {
  /** Gap between crumbs, separators included. */
  gap: t.ref('gap'),
  /** Gap between a crumb's icon and its label. */
  itemGap: t.ref('item-gap'),
  fontFamily: t.ref('typography-family'),
  fontSize: t.ref('typography-size'),
  lineHeight: t.ref('typography-line-height'),
  tracking: t.ref('typography-tracking'),
} as const;

/** Resolved literals for the base layer. */
export const BREADCRUMB_BASE_VALUES = {
  gap: t.value('gap'),
  itemGap: t.value('item-gap'),
  fontFamily: t.value('typography-family'),
  fontSize: t.value('typography-size'),
  lineHeight: t.value('typography-line-height'),
  tracking: t.value('typography-tracking'),
} as const;

/**
 * Icon edge length. Stays numeric because it is an `<Icon size>` prop, not a style —
 * the same shape Button uses. The token itself is a plain `24px` in the overlay; Figma's
 * iconography sizes are still `tbd` in design.md, so nothing semantic backs it yet.
 */
export const BREADCRUMB_ICON_SIZE =
  Number(t.value('icon-size').replace('px', '')) || 24;

export const BREADCRUMB_ICON_SIZE_VALUE = t.value('icon-size');
