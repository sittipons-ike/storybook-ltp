// ═══════════════════════════════════════════
// TextField Design Tokens
//
// This file holds NO values. Every value lives in Figma, flows through design.md
// and components.json (colours from the Figma colour mirror, layout/typography from
// design-library/lotteryplus/components/text-field.json), and is generated into
// foundations/tokens.css (CSS custom properties) and foundations/tokens.generated.ts
// (resolved literals).
//
// What this file adds is types and lookup helpers, so TextField.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate the source values: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('text-field');

/**
 * Canonical states, per the Design System Standard, plus one approved extension.
 *
 * Figma names them Default / Hover / Active / Actived / Read Only / Complete /
 * Error-Default / Error. The mapping to canonical vocabulary is:
 *
 *   Default       → rest
 *   Hover         → hover
 *   Active        → focus   (2px red border while the caret is in the field)
 *   Actived       → rest    (a filled field is not a state — only the text colour
 *                            differs, and that is `foreground` vs `placeholder`)
 *   Read Only     → disabled
 *   Complete      → complete  ← extension: a success affirmation the canonical six
 *                              cannot express; backed by `--text-field-foreground-green`
 *   Error-Default → error   (empty)
 *   Error         → error   (filled)
 *
 * `active` (pressed) renders as `focus` — a text field has no distinct pressed look.
 */
export type TextFieldState =
  | 'rest'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled'
  | 'error'
  | 'complete';

export const TEXT_FIELD_STATES: readonly TextFieldState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
  'error',
  'complete',
] as const;

/** The canonical six. `complete` sits outside it — see TextFieldState. */
export const TEXT_FIELD_STATE_EXTENSIONS: readonly TextFieldState[] = ['complete'] as const;

export interface TextFieldColorSet {
  /** Field surface. */
  background: string;
  /** Field stroke. */
  border: string;
  /** Field stroke width — 2px while focused, 1px otherwise. */
  borderWidth: string;
  /** Input text colour once the field has a value. */
  foreground: string;
  /** Input text colour while the field is empty. */
  placeholder: string;
  /** Focus ring behind the stroke, or '' when the state draws none. */
  ring: string;
}

/** Which Tier 2 token each state binds to, by property. Names only — no values. */
const BINDINGS: Record<TextFieldState, Record<keyof TextFieldColorSet, string>> = {
  rest: {
    background: 'background-white',
    border: 'border',
    borderWidth: 'border-width',
    foreground: 'foreground-dark',
    placeholder: 'foreground-disable',
    ring: '',
  },
  hover: {
    background: 'background-white',
    border: 'foreground-gray',
    borderWidth: 'border-width',
    foreground: 'foreground-dark',
    placeholder: 'foreground-disable',
    ring: '',
  },
  // Figma models the focused field with `text-field-bd-bg-active` (brand red at 40%),
  // which is the ring behind the stroke. The stroke itself has no token of its own, so
  // it borrows the nearest one — `foreground-red`, the same brand red at full opacity.
  focus: {
    background: 'background-white',
    border: 'foreground-red',
    borderWidth: 'border-width-focus',
    foreground: 'foreground-dark',
    placeholder: 'foreground-disable',
    ring: 'ring-active',
  },
  active: {
    background: 'background-white',
    border: 'foreground-red',
    borderWidth: 'border-width-focus',
    foreground: 'foreground-dark',
    placeholder: 'foreground-disable',
    ring: 'ring-active',
  },
  disabled: {
    background: 'background-disable',
    border: 'border',
    borderWidth: 'border-width',
    foreground: 'foreground-gray',
    placeholder: 'foreground-disable',
    ring: '',
  },
  complete: {
    background: 'background-white',
    border: 'foreground-green',
    borderWidth: 'border-width',
    foreground: 'foreground-dark',
    placeholder: 'foreground-disable',
    ring: '',
  },
  error: {
    background: 'background-white',
    border: 'foreground-red',
    borderWidth: 'border-width',
    foreground: 'foreground-dark',
    placeholder: 'foreground-disable',
    ring: '',
  },
};

/** The Tier 2 token name behind one state/property pair — for docs and tables. */
export const textFieldTokenName = (
  state: TextFieldState,
  prop: keyof TextFieldColorSet,
): string => {
  const token = BINDINGS[state][prop];
  return token ? `--text-field-${token}` : '';
};

/** The literal a TextField token resolves to. Empty string when it is not declared. */
export const textFieldValue = (token: string): string => t.value(token);

/** Every Tier 2 token declared for this component — what the token-chain story enumerates. */
export const textFieldTokenNames = (): string[] => t.names();

/** CSS variable references for one state — what TextField.tsx renders with. */
export const textFieldColors = (state: TextFieldState): TextFieldColorSet => {
  const b = BINDINGS[state];
  return {
    background: t.ref(b.background),
    border: t.ref(b.border),
    borderWidth: t.ref(b.borderWidth),
    foreground: t.ref(b.foreground),
    placeholder: t.ref(b.placeholder),
    ring: b.ring ? t.ref(b.ring) : '',
  };
};

/** Resolved literals for one state — for stories, tables and tests. */
export const textFieldColorValues = (state: TextFieldState): TextFieldColorSet => {
  const b = BINDINGS[state];
  return {
    background: t.value(b.background),
    border: t.value(b.border),
    borderWidth: t.value(b.borderWidth),
    foreground: t.value(b.foreground),
    placeholder: t.value(b.placeholder),
    ring: b.ring ? t.value(b.ring) : '',
  };
};

/**
 * Colours that do not vary with the field's state — the label row and the description.
 * Figma draws all three from the flat palette directly, not from a state variant.
 */
export const TEXT_FIELD_TEXT = {
  label: t.ref('foreground-dark'),
  required: t.ref('foreground-red'),
  description: t.ref('foreground-red'),
} as const;

/** Resolved literals for the state-independent text colours. */
export const TEXT_FIELD_TEXT_VALUES = {
  label: t.value('foreground-dark'),
  required: t.value('foreground-red'),
  description: t.value('foreground-red'),
} as const;

/** Layout shared by every state. */
export const TEXT_FIELD_BASE = {
  radius: t.ref('radius'),
  borderWidth: t.ref('border-width'),
  borderWidthFocus: t.ref('border-width-focus'),
  paddingY: t.ref('padding-y'),
  paddingX: t.ref('padding-x'),
  gap: t.ref('gap'),
  stackGap: t.ref('stack-gap'),
  labelPaddingX: t.ref('label-padding-x'),
  labelGap: t.ref('label-gap'),
  descriptionPaddingX: t.ref('description-padding-x'),
} as const;

/** Icon size stays numeric — it is a component prop, not a style. */
export const TEXT_FIELD_CLEAR_ICON_SIZE =
  Number(t.value('clear-icon-size').replace('px', '')) || 16;

/** Typography roles. `placeholder` shares `input` — one Figma role, body/md/regular. */
export type TextFieldTypographyRole = 'label' | 'required' | 'input' | 'description';

export const TEXT_FIELD_TYPOGRAPHY_ROLES: readonly TextFieldTypographyRole[] = [
  'label',
  'required',
  'input',
  'description',
] as const;

export interface TextFieldTypeSet {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
}

/** CSS variable references for one typography role. */
export const textFieldTypography = (role: TextFieldTypographyRole): TextFieldTypeSet => ({
  fontFamily: t.ref(`typography-${role}-family`),
  fontSize: t.ref(`typography-${role}-size`),
  fontWeight: t.ref(`typography-${role}-weight`),
  lineHeight: t.ref(`typography-${role}-line-height`),
  letterSpacing: t.ref(`typography-${role}-tracking`),
});

/** Resolved literals for one typography role — for stories and tables. */
export const textFieldTypographyValues = (
  role: TextFieldTypographyRole,
): TextFieldTypeSet => ({
  fontFamily: t.value(`typography-${role}-family`),
  fontSize: t.value(`typography-${role}-size`),
  fontWeight: t.value(`typography-${role}-weight`),
  lineHeight: t.value(`typography-${role}-line-height`),
  letterSpacing: t.value(`typography-${role}-tracking`),
});
