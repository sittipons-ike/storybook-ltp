// ═══════════════════════════════════════════
// Button Design Tokens
//
// This file holds NO values. Every value lives in Figma, flows through design.md
// and components.json, and is generated into foundations/tokens.css (CSS custom
// properties) and foundations/tokens.generated.ts (resolved literals).
//
// What this file adds is types and lookup helpers, so Button.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate the source values: python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { TOKEN_VALUES, type TokenName } from '../../foundations/tokens.generated';

/** Canonical variants plus the two approved extensions (see components.json). */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link';

/** Canonical states, per the Design System Standard. */
export type ButtonState = 'rest' | 'hover' | 'focus' | 'active' | 'disabled';

/** T-shirt sizes, per the Standard. */
export type ButtonSize = 'lg' | 'md' | 'sm';

export const BUTTON_VARIANTS: readonly ButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'outline',
  'link',
] as const;

export const BUTTON_STATES: readonly ButtonState[] = [
  'rest',
  'hover',
  'focus',
  'active',
  'disabled',
] as const;

export const BUTTON_SIZES: readonly ButtonSize[] = ['lg', 'md', 'sm'] as const;

export interface ButtonColorSet {
  background: string;
  foreground: string;
  border: string;
}

const has = (name: string): name is TokenName => name in TOKEN_VALUES;

/**
 * CSS variable reference for a Button token.
 *
 * The variant x state x property matrix is sparse — most variants declare no border,
 * so `--btn-link-border-rest` does not exist. The CSS var fallback covers those cases
 * without the caller having to know which combinations were declared.
 */
const ref = (token: string, fallback?: string): string =>
  fallback ? `var(--btn-${token}, ${fallback})` : `var(--btn-${token})`;

/** The literal a Button token resolves to. Empty string when it is not declared. */
export const buttonValue = (token: string): string => {
  const name = `--btn-${token}`;
  return has(name) ? TOKEN_VALUES[name] : '';
};

/** CSS variable references for one variant in one state — what Button.tsx renders with. */
export const buttonColors = (
  variant: ButtonVariant,
  state: ButtonState,
): ButtonColorSet => ({
  background: ref(`${variant}-background-${state}`),
  foreground: ref(`${variant}-foreground-${state}`),
  border: ref(`${variant}-border-${state}`, 'transparent'),
});

/** Resolved literals for one variant in one state — for stories, tables and tests. */
export const buttonColorValues = (
  variant: ButtonVariant,
  state: ButtonState,
): ButtonColorSet => ({
  background: buttonValue(`${variant}-background-${state}`),
  foreground: buttonValue(`${variant}-foreground-${state}`),
  border: buttonValue(`${variant}-border-${state}`),
});

/** Layout and typography shared by every variant. */
export const BUTTON_BASE = {
  radius: ref('radius'),
  borderWidth: ref('border-width'),
  paddingY: ref('padding-y'),
  paddingX: ref('padding-x'),
  paddingLeftWithIcon: ref('padding-left-with-icon'),
  gap: ref('gap'),
  fontFamily: ref('typography-family'),
  fontSize: ref('typography-size'),
  fontWeight: ref('typography-weight'),
  lineHeight: ref('typography-line-height'),
  tracking: ref('typography-tracking'),
} as const;

/**
 * Per-size dimensions. `iconSize` stays numeric — it is a component prop, not a style —
 * and it is per size, not global: Figma uses 24 at L and M and 16 at S.
 */
export const buttonSize = (size: ButtonSize) => ({
  height: ref(`${size}-height`),
  iconOnlyPadding: ref(`${size}-icon-only-padding`),
  iconSize: Number(buttonValue(`${size}-icon-size`).replace('px', '')) || 24,
});

/** Numeric height, for stories that print dimensions. */
export const buttonSizeValue = (size: ButtonSize) => ({
  height: buttonValue(`${size}-height`),
  iconOnlyPadding: buttonValue(`${size}-icon-only-padding`),
  iconSize: buttonValue(`${size}-icon-size`),
});
