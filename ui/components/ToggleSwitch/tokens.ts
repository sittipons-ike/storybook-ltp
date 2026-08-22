// ═══════════════════════════════════════════
// Toggle Switch Design Tokens
//
// This file holds NO values. Colours live in Figma (`colors/toggle-switch`) and flow
// through components.json; layout, sizing and motion are authored in
// design-library/lotteryplus/components/toggle-switch.json. Both are generated into
// foundations/tokens.css (CSS custom properties) and foundations/tokens.generated.ts
// (resolved literals).
//
// What this file adds is types and lookup helpers, so ToggleSwitch.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate the source values: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component, sys, sysValue } from '../../foundations/tokens';

/** Canonical states, per the Design System Standard. */
export type ToggleSwitchState =
  | 'rest'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled'
  | 'selected';

export const TOGGLE_STATES: readonly ToggleSwitchState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
  'selected',
] as const;

const t = component('toggle');

/** CSS variable reference for a toggle token — e.g. `toggleRef('radius')`. */
export const toggleRef = (token: string, fallback?: string): string => t.ref(token, fallback);

/** The literal a toggle token resolves to. Empty string when it is not declared. */
export const toggleValue = (token: string): string => t.value(token);

/** Every `--toggle-*` token declared by the generator. Stories enumerate this. */
export const toggleTokenNames = (): string[] => t.names();

/** Layout, sizing and motion — what ToggleSwitch.tsx and ToggleSwitch.css render with. */
export const TOGGLE = {
  radius: t.ref('radius'),
  padding: t.ref('padding'),
  trackWidth: t.ref('track-width'),
  trackHeight: t.ref('track-height'),
  knobSize: t.ref('knob-size'),
  knobInset: t.ref('knob-inset'),
  knobShadow: t.ref('knob-shadow'),
  focusRingWidth: t.ref('focus-ring-width'),
  focusRingOffset: t.ref('focus-ring-offset'),
  transitionDuration: t.ref('transition-duration'),
  transitionTiming: t.ref('transition-timing'),
  disabledOpacity: t.ref('disabled-opacity'),
} as const;

/**
 * Colours.
 *
 * Figma's `colors/toggle-switch` group declares exactly three tokens. The focus ring is
 * not one of them — Figma models focus as an interaction, not a fill — so it points
 * straight at the nearest Tier 1 semantic token instead of inventing a fourth alias.
 */
export const TOGGLE_COLORS = {
  /** Track fill when selected. Figma: colors/toggle-switch/toggle-bg-green */
  trackOn: t.ref('background-green'),
  /** Track fill at rest. Figma: colors/toggle-switch/toggle-bg-soft-gray */
  trackOff: t.ref('background-soft-gray'),
  /** Knob fill. Figma: colors/toggle-switch/toggle-fg-white */
  knob: t.ref('foreground-white'),
  /** Focus ring — no Figma token; nearest semantic is the brand red. */
  focusRing: sys('color-primary-default'),
} as const;

/** Resolved literals for the same colours — for stories, tables and tests. */
export const TOGGLE_COLOR_VALUES = {
  trackOn: t.value('background-green'),
  trackOff: t.value('background-soft-gray'),
  knob: t.value('foreground-white'),
  focusRing: sysValue('color-primary-default'),
} as const;

/** Track fill for a selected / unselected switch. */
export const trackBackground = (selected: boolean): string =>
  selected ? TOGGLE_COLORS.trackOn : TOGGLE_COLORS.trackOff;

/**
 * Knob offset from the track's left edge.
 *
 * The "on" position is derived, not authored: Figma places the knob at x:22 inside a
 * 51px track with a 27px knob and a 2px inset, which is exactly
 * `track-width - knob-size - knob-inset`. Computing it in CSS means the three tokens
 * stay the single source and no fourth token can drift out of step with them.
 */
export const knobOffset = (selected: boolean): string =>
  selected
    ? `calc(${TOGGLE.trackWidth} - ${TOGGLE.knobSize} - ${TOGGLE.knobInset})`
    : TOGGLE.knobInset;

/** Same offset as a literal, for stories that print dimensions. */
export const knobOffsetValue = (selected: boolean): string => {
  const num = (token: string) => parseFloat(t.value(token)) || 0;
  return selected
    ? `${num('track-width') - num('knob-size') - num('knob-inset')}px`
    : t.value('knob-inset');
};
