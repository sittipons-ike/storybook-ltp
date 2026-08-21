// ═══════════════════════════════════════════
// Modal Design Tokens
//
// This file holds NO values. Every value lives in Figma, flows through design.md
// and components.json (layout/typography via components/modal.json), and is
// generated into foundations/tokens.css (CSS custom properties) and
// foundations/tokens.generated.ts (resolved literals).
//
// What this file adds is types and lookup helpers, so Modal.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate the source values: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('modal');

/** Figma variant property `state` — 5 stops. */
export type ModalState = 'success' | 'warning' | 'warning-serious' | 'error' | 'info';

export const MODAL_STATES: readonly ModalState[] = [
  'success',
  'warning',
  'warning-serious',
  'error',
  'info',
] as const;

export interface ModalColorSet {
  /** Icon glyph fill. */
  foreground: string;
  /** Icon circle background. */
  background: string;
}

/**
 * Which Tier 2 colour token each state reaches for.
 *
 * Figma models modal colours as a flat palette (`modal-fg-green`, `modal-bg-soft-green`)
 * rather than a state matrix, so the state → token mapping is the component's own
 * editorial decision and lives here. The values behind those names do not.
 */
const STATE_TOKENS: Record<ModalState, ModalColorSet> = {
  success: { foreground: 'foreground-green', background: 'background-soft-green' },
  warning: { foreground: 'foreground-yellow', background: 'background-soft-yellow' },
  'warning-serious': { foreground: 'foreground-red', background: 'background-soft-red' },
  error: { foreground: 'foreground-red', background: 'background-soft-red' },
  info: { foreground: 'foreground-dark', background: 'background-soft-dark' },
};

/** Icon glyph per state. A component-library name, not a design token. */
export const MODAL_ICONS: Record<ModalState, string> = {
  success: 'outline-check_circle',
  warning: 'outline-Warning-2',
  'warning-serious': 'outline-Warning-2',
  error: 'outline-Error-1',
  info: 'outline-info',
};

/** The Tier 2 token names behind a state — for stories that print the chain. */
export const modalStateTokens = (state: ModalState): ModalColorSet => STATE_TOKENS[state];

/** CSS variable references for one state — what Modal.tsx renders with. */
export const modalColors = (state: ModalState): ModalColorSet => ({
  foreground: t.ref(STATE_TOKENS[state].foreground),
  background: t.ref(STATE_TOKENS[state].background),
});

/** Resolved literals for one state — for stories, tables and tests. */
export const modalColorValues = (state: ModalState): ModalColorSet => ({
  foreground: t.value(STATE_TOKENS[state].foreground),
  background: t.value(STATE_TOKENS[state].background),
});

/** CSS variable reference for any Modal token. */
export const modalRef = (token: string, fallback?: string): string => t.ref(token, fallback);

/** The literal a Modal token resolves to. Empty string when it is not declared. */
export const modalValue = (token: string): string => t.value(token);

/** Every Tier 2 token declared for `modal`, sorted — what the token-chain story enumerates. */
export const modalTokenNames = (): string[] => t.names();

/** Container, layout and typography — shared by every state. */
export const MODAL = {
  width: t.ref('width'),
  radius: t.ref('radius'),
  padding: t.ref('padding'),
  /** Gap between the content block and the button session. */
  gap: t.ref('gap'),
  /** Gap between the icon and the wording block. */
  contentGap: t.ref('content-gap'),
  /** Gap between title and subtitle. */
  wordingGap: t.ref('wording-gap'),
  /** Gap between the two buttons, in either layout direction. */
  buttonGap: t.ref('button-gap'),
  elevation: t.ref('elevation'),
  scrim: t.ref('scrim'),
  background: t.ref('background-white'),
  text: t.ref('foreground-dark'),

  iconCircleSize: t.ref('icon-circle-size'),
  iconCirclePadding: t.ref('icon-circle-padding'),
  iconCircleRadius: t.ref('icon-circle-radius'),

  titleFamily: t.ref('typography-title-family'),
  titleSize: t.ref('typography-title-size'),
  titleLineHeight: t.ref('typography-title-line-height'),
  titleWeight: t.ref('typography-title-weight'),
  titleTracking: t.ref('typography-title-tracking'),

  subtitleFamily: t.ref('typography-subtitle-family'),
  subtitleSize: t.ref('typography-subtitle-size'),
  subtitleLineHeight: t.ref('typography-subtitle-line-height'),
  subtitleWeight: t.ref('typography-subtitle-weight'),
  subtitleTracking: t.ref('typography-subtitle-tracking'),
} as const;

/**
 * Icon glyph size in points. Numeric because `<Icon size>` is a component prop, not a
 * style — same treatment Button gives its own `icon-size`.
 */
export const MODAL_ICON_SIZE = Number(t.value('icon-size').replace('px', '')) || 48;
