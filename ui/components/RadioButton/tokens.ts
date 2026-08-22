// ═══════════════════════════════════════════
// RadioButton Design Tokens
//
// This file holds NO values. Colours come from the Figma colour mirror
// (`colors/radio-buttons` → components.json → `--radio-*`); layout, sizing and
// typography come from the hand-authored overlay at
// `design-library/lotteryplus/components/radio-buttons.json`. Both are generated into
// foundations/tokens.css (CSS custom properties) and foundations/tokens.generated.ts
// (resolved literals).
//
// What this file adds is types and lookups, so RadioButton.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify:     python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component, sys, sysValue } from '../../foundations/tokens';

/** Tier 2 binding — every token below is a `--radio-*` custom property. */
const t = component('radio');

// ── Types ──────────────────────────────────────────────────────────────────

/** Canonical states, per the Design System Standard. */
export type RadioState = 'rest' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected';

/**
 * The five interaction states. `selected` is orthogonal to these — Figma models it as
 * the component set's `type` property (none / selected), not its `status`.
 */
export type RadioInteractionState = Exclude<RadioState, 'selected'>;

export const RADIO_STATES: readonly RadioState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
  'selected',
] as const;

export const RADIO_INTERACTION_STATES: readonly RadioInteractionState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
] as const;

/** The five pieces of text the group renders, each with its own typography role. */
export type RadioTextRole = 'label' | 'required' | 'optional' | 'option' | 'error';

export const RADIO_TEXT_ROLES: readonly RadioTextRole[] = [
  'label',
  'required',
  'optional',
  'option',
  'error',
] as const;

export interface RadioTextStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

// ── Lookups ────────────────────────────────────────────────────────────────

/** CSS reference for a RadioButton token — e.g. `var(--radio-card-radius)`. */
export const radioRef = (token: string, fallback?: string): string => t.ref(token, fallback);

/** The literal a RadioButton token resolves to. Empty string when it is not declared. */
export const radioValue = (token: string): string => t.value(token);

/** Every `--radio-*` token the generator declared — what the token-chain story enumerates. */
export const radioTokenNames = (): string[] => t.names();

// ── Layout, sizing and spacing ─────────────────────────────────────────────

/** Layout the whole component renders with. Sourced from the radio-buttons overlay. */
export const RADIO_LAYOUT = {
  /** Radio circle — radius-full. */
  radius: t.ref('radius'),
  /** Radio circle — 20x20 (fixed in Figma, no semantic size scale backs it). */
  size: t.ref('size'),
  /** Check dot — 12x12 (fixed in Figma). */
  dotSize: t.ref('dot-size'),
  borderWidth: t.ref('border-width'),
  /** Press / focus ripple thickness. Storybook-local — see the overlay's `_source`. */
  ringWidth: t.ref('ring-width'),

  /** Option card — radius-lg, fixed 44px height, spacing-2xl padding. */
  cardRadius: t.ref('card-radius'),
  cardHeight: t.ref('card-height'),
  cardPadding: t.ref('card-padding'),
  /** Gap between an option's text and its radio circle — spacing-lg. */
  gap: t.ref('gap'),

  /** Group wrapper — label to options, spacing-sm. */
  groupGap: t.ref('group-gap'),
  /** Gap between option cards — spacing-2xl. */
  optionsGap: t.ref('options-gap'),
  labelPaddingLeft: t.ref('label-padding-left'),
  labelGap: t.ref('label-gap'),
} as const;

/** The same layout as resolved literals — for stories, tables and tests. */
export const RADIO_LAYOUT_VALUES: Record<keyof typeof RADIO_LAYOUT, string> = {
  radius: t.value('radius'),
  size: t.value('size'),
  dotSize: t.value('dot-size'),
  borderWidth: t.value('border-width'),
  ringWidth: t.value('ring-width'),
  cardRadius: t.value('card-radius'),
  cardHeight: t.value('card-height'),
  cardPadding: t.value('card-padding'),
  gap: t.value('gap'),
  groupGap: t.value('group-gap'),
  optionsGap: t.value('options-gap'),
  labelPaddingLeft: t.value('label-padding-left'),
  labelGap: t.value('label-gap'),
};

/** The Tier 1 token each layout alias points at — the middle link of the chain. */
export const RADIO_LAYOUT_CHAIN: Record<keyof typeof RADIO_LAYOUT, string> = {
  radius: '--sys-radius-full',
  size: '(fixed)',
  dotSize: '(fixed)',
  borderWidth: '--sys-border-width-hairline',
  ringWidth: '(fixed)',
  cardRadius: '--sys-radius-lg',
  cardHeight: '(fixed)',
  cardPadding: '--sys-spacing-2xl',
  gap: '--sys-spacing-lg',
  groupGap: '--sys-spacing-sm',
  optionsGap: '--sys-spacing-2xl',
  labelPaddingLeft: '--sys-spacing-sm',
  labelGap: '--sys-spacing-sm',
};

// ── Typography ─────────────────────────────────────────────────────────────

/** CSS references for one text role — what RadioButton.tsx renders with. */
export const radioText = (role: RadioTextRole): RadioTextStyle => ({
  fontFamily: t.ref(`typography-${role}-family`),
  fontSize: t.ref(`typography-${role}-size`),
  fontWeight: t.ref(`typography-${role}-weight`),
  lineHeight: t.ref(`typography-${role}-line-height`),
});

/** Resolved literals for one text role — for stories, tables and tests. */
export const radioTextValues = (role: RadioTextRole): RadioTextStyle => ({
  fontFamily: t.value(`typography-${role}-family`),
  fontSize: t.value(`typography-${role}-size`),
  fontWeight: t.value(`typography-${role}-weight`),
  lineHeight: t.value(`typography-${role}-line-height`),
});

/** The semantic typography role each piece of text is bound to. */
export const RADIO_TEXT_CHAIN: Record<RadioTextRole, string> = {
  label: 'typography.title.md.medium',
  required: 'typography.label.md.medium',
  optional: 'typography.label.md.medium',
  option: 'typography.button.md.semibold',
  error: 'typography.caption.md.regular',
};

// ── Colour ─────────────────────────────────────────────────────────────────

/**
 * Every colour the component renders, keyed by `<part>-<property>-<state>` and mapped
 * to the `--radio-*` token behind it.
 *
 * The matrix is deliberately sparse: Figma's component set is type(none/selected) x
 * status(default/focused/disabled), so `hover` and `active` reuse the rest colours and
 * only the ripple changes.
 */
export const RADIO_COLOR_TOKENS = {
  'dot-background-rest': 'background-white',
  'dot-background-disabled': 'background-disable',
  'dot-border-rest': 'border',
  'dot-border-selected': 'background-green',
  'dot-border-disabled': 'border',
  'dot-check-rest': 'foreground-green',
  'dot-check-disabled': 'foreground-disable',
  'dot-ring-rest': 'ring-gray',
  'dot-ring-selected': 'ring-green',

  'card-background-rest': 'background-white',
  'card-background-selected': 'background-soft-green',
  'card-background-disabled': 'background-disable',
  'card-border-rest': 'border',
  'card-border-selected': 'background-green',
  'card-border-disabled': 'border',
  'card-foreground-rest': 'foreground-disable',
  'card-foreground-selected': 'foreground-dark',
  'card-foreground-disabled': 'foreground-disable',

  'label-foreground-rest': 'foreground-dark',
  'label-required-rest': 'foreground-red',
  'error-foreground-rest': 'foreground-red',
} as const;

export type RadioColorRole = keyof typeof RADIO_COLOR_TOKENS;

export const RADIO_COLOR_ROLES = Object.keys(RADIO_COLOR_TOKENS) as RadioColorRole[];

/** CSS reference for a colour role — e.g. `var(--radio-background-soft-green)`. */
export const radioColor = (role: RadioColorRole): string => t.ref(RADIO_COLOR_TOKENS[role]);

/** Resolved literal for a colour role. */
export const radioColorValue = (role: RadioColorRole): string => t.value(RADIO_COLOR_TOKENS[role]);

/** The `--radio-*` token name behind a colour role, for cross-referencing tables. */
export const radioColorToken = (role: RadioColorRole): string =>
  `--radio-${RADIO_COLOR_TOKENS[role]}`;

/**
 * The "(ไม่จำเป็น)" hint.
 *
 * Figma's `colors/radio-buttons` group has no token for it, so this binds straight to
 * the Tier 1 semantic the old hand-written comment named (`tertiary/accent/md`) rather
 * than to a Tier 2 alias. Promote it to a real radio token if Figma ever adds one.
 */
export const RADIO_OPTIONAL_SYS_TOKEN = 'color-tertiary-accent-md';
export const radioOptionalColor = (): string => sys(RADIO_OPTIONAL_SYS_TOKEN);
export const radioOptionalColorValue = (): string => sysValue(RADIO_OPTIONAL_SYS_TOKEN);
