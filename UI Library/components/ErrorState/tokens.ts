// ═══════════════════════════════════════════
// ErrorState Design Tokens
//
// Figma's `noti-error` (15170:101685) is a component set, not artwork: it arranges an
// illustration, a heading and body, and the action bar. There is no `colors/error-state`
// group — the set borrows `colors/home` — so the colours are authored in
// design-library/lotteryplus/components/error-state.json.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('error-state');

/**
 * Figma's `type` axis. `internet` shows the same illustration as `systemDown`, which is
 * recorded as an open question rather than smoothed over.
 */
export type ErrorStateType = 'lotOfUsers' | 'errorOccurred' | 'systemDown' | 'internet';

/** Which mark from the logo manifest each state shows. Read off the instances in Figma. */
export const ERROR_STATE_ILLUSTRATION: Record<ErrorStateType, string> = {
  lotOfUsers: 'gp-jidrit-lot-of-users',
  errorOccurred: 'gp-jidrit-error-occurred',
  systemDown: 'gp-jidrit-system-down',
  internet: 'gp-jidrit-system-down',
};

export const ERROR_STATE = {
  width: t.ref('width'),
  paddingX: t.ref('padding-x'),
  gap: t.ref('gap'),

  illustrationSize: t.ref('illustration-size'),

  textGap: t.ref('text-gap'),

  titleSize: t.ref('title-size'),
  titleLineHeight: t.ref('title-line-height'),
  titleWeight: t.ref('title-weight'),
  titleForeground: t.ref('title-foreground'),

  bodySize: t.ref('body-size'),
  bodyLineHeight: t.ref('body-line-height'),
  bodyWeight: t.ref('body-weight'),
  bodyForeground: t.ref('body-foreground'),
} as const;

/** Numeric, because Logo scales from it rather than styling with it. */
export const ERROR_STATE_ILLUSTRATION_SIZE =
  Number(t.value('illustration-size').replace('px', '')) || 280;

export const errorStateTokenNames = (): string[] => t.names();
export const errorStateValue = (name: string): string => t.value(name);

export { default as ERROR_STATE_SPEC } from '../../../design-library/lotteryplus/components/error-state.json';
