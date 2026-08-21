// ═══════════════════════════════════════════
// Dropdown Design Tokens
//
// This file holds NO values. Every value lives in Figma, flows through design.md
// and components.json (colours via the Figma colour mirror, layout/typography via
// design-library/lotteryplus/components/dropdown.json), and is generated into
// foundations/tokens.css and foundations/tokens.generated.ts.
//
// What this file adds is types and lookups, so Dropdown.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify:     python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component, sys, sysValue } from '../../foundations/tokens';
import type { IconSize } from '../../icons/Icon';

const t = component('dropdown');

export { sys, sysValue };

/** CSS variable reference for a Dropdown token — e.g. `dropdownRef('radius')`. */
export const dropdownRef = t.ref;

/** The literal a Dropdown token resolves to. Empty string when it is not declared. */
export const dropdownValue = t.value;

/** Every `--dropdown-*` token the generator declared. Used by the token-chain story. */
export const dropdownTokenNames = t.names;

// ── Canonical vocabulary ──────────────────────────────────────────────────────

/** Canonical interaction states, per the Design System Standard. */
export type DropdownState =
  | 'rest'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled'
  | 'selected';

/**
 * Validation status — an axis orthogonal to interaction state.
 *
 * Figma models Dropdown as eight flat states; six of them are interaction states and
 * the other two (Complete, Error) are validation outcomes that combine with any of
 * them. Splitting the two axes reproduces all eight without inventing a state name
 * the Standard does not have.
 */
export type DropdownStatus = 'default' | 'complete' | 'error';

export const DROPDOWN_STATES: readonly DropdownState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
  'selected',
] as const;

export const DROPDOWN_STATUSES: readonly DropdownStatus[] = [
  'default',
  'complete',
  'error',
] as const;

/**
 * How Figma's eight flat dropdown states decompose onto the two canonical axes.
 * Stories render this so the rename stays auditable against the Figma component set.
 */
export const DROPDOWN_FIGMA_STATES: readonly {
  figma: string;
  state: DropdownState;
  status: DropdownStatus;
}[] = [
  { figma: 'Default', state: 'rest', status: 'default' },
  { figma: 'Hover', state: 'hover', status: 'default' },
  { figma: 'Active', state: 'active', status: 'default' },
  { figma: 'Actived', state: 'selected', status: 'default' },
  { figma: 'Read Only', state: 'disabled', status: 'default' },
  { figma: 'Complete', state: 'selected', status: 'complete' },
  { figma: 'Error-Default', state: 'rest', status: 'error' },
  { figma: 'Error', state: 'selected', status: 'error' },
] as const;

// ── Layout, sizing and elevation ──────────────────────────────────────────────

/** Layout and elevation shared by every state. */
export const DROPDOWN = {
  radius: t.ref('radius'),
  borderWidth: t.ref('border-width'),
  borderWidthActive: t.ref('border-width-active'),
  elevation: t.ref('elevation'),

  wrapperGap: t.ref('wrapper-gap'),
  labelPaddingLeft: t.ref('label-padding-left'),
  labelGap: t.ref('label-gap'),
  descriptionPaddingLeft: t.ref('description-padding-left'),

  fieldPaddingY: t.ref('field-padding-y'),
  fieldPaddingRight: t.ref('field-padding-right'),
  fieldPaddingLeft: t.ref('field-padding-left'),
  fieldGap: t.ref('field-gap'),

  listOffset: t.ref('list-offset'),
  listPadding: t.ref('list-padding'),
  listGap: t.ref('list-gap'),

  optionPaddingY: t.ref('option-padding-y'),
  optionPaddingX: t.ref('option-padding-x'),
  optionGap: t.ref('option-gap'),
} as const;

/**
 * Icon edge length in px. Numeric because it is a component prop, not a style — the
 * cast is the one place the token string meets Icon's literal-union size type.
 */
export const dropdownIconSize = (): IconSize =>
  (Number(t.value('icon-size').replace('px', '')) || 24) as IconSize;

// ── Typography ────────────────────────────────────────────────────────────────

export type DropdownTypographyRole =
  | 'label'
  | 'required'
  | 'value'
  | 'option'
  | 'option-selected'
  | 'description';

export const DROPDOWN_TYPOGRAPHY_ROLES: readonly DropdownTypographyRole[] = [
  'label',
  'required',
  'value',
  'option',
  'option-selected',
  'description',
] as const;

export interface DropdownTypography {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
}

/** CSS variable references for one typography role — what Dropdown.tsx renders with. */
export const dropdownTypography = (role: DropdownTypographyRole): DropdownTypography => ({
  fontFamily: t.ref(`typography-${role}-family`),
  fontSize: t.ref(`typography-${role}-size`),
  fontWeight: t.ref(`typography-${role}-weight`),
  lineHeight: t.ref(`typography-${role}-line-height`),
  letterSpacing: t.ref(`typography-${role}-tracking`),
});

/** Resolved literals for one typography role — for stories, tables and tests. */
export const dropdownTypographyValues = (
  role: DropdownTypographyRole,
): DropdownTypography => ({
  fontFamily: t.value(`typography-${role}-family`),
  fontSize: t.value(`typography-${role}-size`),
  fontWeight: t.value(`typography-${role}-weight`),
  lineHeight: t.value(`typography-${role}-line-height`),
  letterSpacing: t.value(`typography-${role}-tracking`),
});

// ── Field colours by state x status ───────────────────────────────────────────

export interface DropdownFieldTokens {
  background: string;
  border: string;
  borderWidth: string;
  foreground: string;
  icon: string;
  /** Focus ring colour, or '' when the state does not draw one. */
  ring: string;
}

/** True when Figma shows the description (error message) row. */
export const dropdownDescriptionVisible = (status: DropdownStatus): boolean =>
  status === 'error';

/** True when the field draws the `ring-active` glow. */
const ringed = (state: DropdownState): boolean => state === 'active' || state === 'focus';

/** Which `--dropdown-*` token each field property resolves to, as bare token names. */
const fieldTokenNames = (
  state: DropdownState,
  status: DropdownStatus,
): Record<keyof DropdownFieldTokens, string> => {
  const background = state === 'disabled' ? 'background-disable' : 'background-white';

  let border = 'border';
  if (status === 'error') border = 'foreground-red';
  else if (status === 'complete') border = 'foreground-green';
  else if (ringed(state)) border = 'foreground-red';
  else if (state === 'hover') border = 'foreground-gray';

  const borderWidth = ringed(state) ? 'border-width-active' : 'border-width';

  let foreground = 'foreground-dark';
  if (state === 'disabled') foreground = 'foreground-gray';
  else if (state === 'rest' || state === 'hover') foreground = 'foreground-disable';

  let icon = 'foreground-dark';
  if (state === 'disabled') icon = 'foreground-disable';
  else if (state === 'hover') icon = 'foreground-gray';
  else if (state === 'rest') icon = status === 'error' ? 'foreground-dark' : 'foreground-disable';

  return {
    background,
    border,
    borderWidth,
    foreground,
    icon,
    ring: ringed(state) ? 'ring-active' : '',
  };
};

/** CSS variable references for one state x status — what Dropdown.tsx renders with. */
export const dropdownField = (
  state: DropdownState,
  status: DropdownStatus = 'default',
): DropdownFieldTokens => {
  const names = fieldTokenNames(state, status);
  return {
    background: t.ref(names.background),
    border: t.ref(names.border),
    borderWidth: t.ref(names.borderWidth),
    foreground: t.ref(names.foreground),
    icon: t.ref(names.icon),
    ring: names.ring ? t.ref(names.ring) : '',
  };
};

/** Resolved literals for one state x status — for stories, tables and tests. */
export const dropdownFieldValues = (
  state: DropdownState,
  status: DropdownStatus = 'default',
): DropdownFieldTokens => {
  const names = fieldTokenNames(state, status);
  return {
    background: t.value(names.background),
    border: t.value(names.border),
    borderWidth: t.value(names.borderWidth),
    foreground: t.value(names.foreground),
    icon: t.value(names.icon),
    ring: names.ring ? t.value(names.ring) : '',
  };
};

/** The bare `--dropdown-*` token names behind one state x status — for the chain story. */
export const dropdownFieldTokenNames = fieldTokenNames;

// ── Dropdown list and option items ────────────────────────────────────────────

export interface DropdownOptionTokens {
  background: string;
  foreground: string;
}

const optionTokenNames = (
  selected: boolean,
  hovered: boolean,
): Record<keyof DropdownOptionTokens, string> => {
  if (selected) return { background: 'foreground-red', foreground: 'foreground-white' };
  if (hovered) return { background: 'foreground-soft-gray', foreground: 'foreground-dark' };
  return { background: 'background-white', foreground: 'foreground-dark' };
};

/** CSS variable references for one option row. */
export const dropdownOption = (
  selected: boolean,
  hovered = false,
): DropdownOptionTokens => {
  const names = optionTokenNames(selected, hovered);
  return { background: t.ref(names.background), foreground: t.ref(names.foreground) };
};

/** Resolved literals for one option row. */
export const dropdownOptionValues = (
  selected: boolean,
  hovered = false,
): DropdownOptionTokens => {
  const names = optionTokenNames(selected, hovered);
  return { background: t.value(names.background), foreground: t.value(names.foreground) };
};

/** Surface tokens for the open list container. */
export const DROPDOWN_LIST = {
  background: t.ref('background-white'),
  border: t.ref('border'),
} as const;

/** Colours for the label row and the description (error) row. */
export const DROPDOWN_TEXT = {
  label: t.ref('foreground-dark'),
  required: t.ref('foreground-red'),
  description: t.ref('foreground-red'),
} as const;
