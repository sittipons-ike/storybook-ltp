// ═══════════════════════════════════════════
// Tabs Design Tokens
//
// This file holds NO values. Every value lives in Figma, flows through design.md and
// components.json (+ the layout overlay at design-library/lotteryplus/components/tabs.json),
// and is generated into foundations/tokens.css (CSS custom properties) and
// foundations/tokens.generated.ts (resolved literals).
//
// What this file adds is types and lookup helpers, so Tabs.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Figma component sets:
//   - "horizontal-tabs-underline" (14370:9654)
//   - "horizontal-tabs_button"    (14370:9710)
//
// Regenerate the source values: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component, sys, sysValue } from '../../foundations/tokens';

const t = component('tabs');

// ── Vocabulary ──────────────────────────────────────────────────────────────

/** Visual styles, one per Figma component set. */
export type TabsVariant = 'underline' | 'button';

/**
 * Colour scheme for the button style. Figma spells the variant property `colors=red|black`;
 * the tokens it binds are `tabs-bg-primary` / `tabs-bg-secondary`, so the Standard's
 * primary/secondary vocabulary is what the props use. Queued in figma-rename-map.md terms:
 * red → primary, black → secondary.
 */
export type TabsColorScheme = 'primary' | 'secondary';

/** Canonical states, per the Design System Standard. */
export type TabsState = 'rest' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected';

export const TABS_VARIANTS: readonly TabsVariant[] = ['underline', 'button'] as const;

export const TABS_COLOR_SCHEMES: readonly TabsColorScheme[] = ['primary', 'secondary'] as const;

export const TABS_STATES: readonly TabsState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
  'selected',
] as const;

// ── Lookups ─────────────────────────────────────────────────────────────────

/** The literal a Tabs token resolves to. Empty string when it is not declared. */
export const tabsValue = (token: string): string => t.value(token);

/** CSS variable reference for a Tabs token. */
export const tabsRef = (token: string, fallback?: string): string => t.ref(token, fallback);

/** Every `--tabs-*` token the generator declared — what the token-chain story enumerates. */
export const tabsTokenNames = (): string[] => t.names();

// ── Layout and typography, shared by both variants ──────────────────────────

export const TABS_BASE = {
  height: t.ref('height'),
  radius: t.ref('radius'),
  radiusActive: t.ref('radius-active'),
  paddingX: t.ref('padding-x'),
  paddingY: t.ref('padding-y'),
  gap: t.ref('gap'),
  itemGap: t.ref('item-gap'),
  borderWidth: t.ref('border-width'),
  indicatorWidth: t.ref('indicator-width'),
  fontFamily: t.ref('typography-family'),
  fontSize: t.ref('typography-size'),
  fontWeight: t.ref('typography-weight'),
  lineHeight: t.ref('typography-line-height'),
  tracking: t.ref('typography-tracking'),
} as const;

/** Resolved literals for the same set — for stories, tables and tests. */
export const TABS_BASE_VALUES = {
  height: t.value('height'),
  radius: t.value('radius'),
  radiusActive: t.value('radius-active'),
  paddingX: t.value('padding-x'),
  paddingY: t.value('padding-y'),
  gap: t.value('gap'),
  itemGap: t.value('item-gap'),
  borderWidth: t.value('border-width'),
  indicatorWidth: t.value('indicator-width'),
  fontFamily: t.value('typography-family'),
  fontSize: t.value('typography-size'),
  fontWeight: t.value('typography-weight'),
  lineHeight: t.value('typography-line-height'),
  tracking: t.value('typography-tracking'),
} as const;

/**
 * Badge icon size. Numeric because `<Icon size>` is a component prop, not a style —
 * same treatment Button gives its icon size.
 */
export const TABS_BADGE_SIZE = Number(t.value('badge-size').replace('px', '')) || 16;

// ── Colours ─────────────────────────────────────────────────────────────────

export const TABS_COLORS = {
  /** Underline container's bottom rule — colors/tabs/tabs-fg-disable. */
  rule: t.ref('foreground-disable'),
  /** Vertical divider between underline tabs — see tabs.json `_source-separator`. */
  separator: t.ref('separator'),
  /** Button container surface — colors/tabs/tabs-bg-white. */
  surface: t.ref('background-white'),
  /** Label of a tab that is not selected — colors/tabs/tabs-fg-secondary. */
  labelRest: t.ref('foreground-secondary'),
  /** Selected label, underline style — colors/tabs/tabs-fg-primary. */
  labelSelectedUnderline: t.ref('foreground-primary'),
  /** Selected label, button style — colors/tabs/tabs-fg-white. */
  labelSelectedButton: t.ref('foreground-white'),
  /** Selected underline indicator — colors/tabs/tabs-fg-primary. */
  indicator: t.ref('foreground-primary'),
  /** Badge pictogram in the underline style — colors/tabs/tabs-fg-primary. */
  badgeUnderline: t.ref('foreground-primary'),
} as const;

export const TABS_COLOR_VALUES = {
  rule: t.value('foreground-disable'),
  separator: t.value('separator'),
  surface: t.value('background-white'),
  labelRest: t.value('foreground-secondary'),
  labelSelectedUnderline: t.value('foreground-primary'),
  labelSelectedButton: t.value('foreground-white'),
  indicator: t.value('foreground-primary'),
  badgeUnderline: t.value('foreground-primary'),
} as const;

export interface TabsSchemeColors {
  /** Fill behind the selected tab. */
  background: string;
  /** Outer border of the button container, and the badge pictogram. */
  accent: string;
}

/** CSS variable references for one button-style colour scheme — what Tabs.tsx renders with. */
export const tabsScheme = (scheme: TabsColorScheme): TabsSchemeColors => ({
  background: t.ref(`background-${scheme}`),
  accent: t.ref(`foreground-${scheme}`),
});

/** Resolved literals for the same scheme — for stories, tables and tests. */
export const tabsSchemeValues = (scheme: TabsColorScheme): TabsSchemeColors => ({
  background: t.value(`background-${scheme}`),
  accent: t.value(`foreground-${scheme}`),
});

// ── Focus ring ──────────────────────────────────────────────────────────────

/**
 * Focus affordance. Tabs has no Figma token of its own for it, so it borrows the
 * semantic radius that the rest of the system uses for small inner corners.
 */
export const TABS_FOCUS = {
  ringColor: t.ref('foreground-primary'),
  ringWidth: t.ref('indicator-width'),
  radius: sys('radius-sm'),
} as const;

export const TABS_FOCUS_VALUES = {
  ringColor: t.value('foreground-primary'),
  ringWidth: t.value('indicator-width'),
  radius: sysValue('radius-sm'),
} as const;
