// ═══════════════════════════════════════════
// CountdownTimer Design Tokens
//
// No values here. Figma has no timer component (verified absent 2026-08-20); authored in
// design-library/lotteryplus/components/countdown-timer.json from the Frontend's
// common/notification/timer, per the amended authority rule.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('timer');

/**
 * The Frontend spells these as three independent booleans (isFloated, isRedBackground,
 * isSideBarColor) which can contradict each other. They are mutually exclusive in every
 * call site, so they are one axis here.
 */
export type TimerTone = 'default' | 'red' | 'sidebar';

export const TIMER_TONES: readonly TimerTone[] = ['default', 'red', 'sidebar'] as const;

export const TIMER = {
  paddingX: t.ref('padding-x'),
  height: t.ref('height'),
  radius: t.ref('radius'),
  floatRadius: t.ref('float-radius'),
  background: t.ref('background'),
  foreground: t.ref('foreground'),
  redBackground: t.ref('red-background'),
  redForeground: t.ref('red-foreground'),
  sidebarBackground: t.ref('sidebar-background'),
  size: t.ref('size'),
  lineHeight: t.ref('line-height'),
  weight: t.ref('weight'),
  floatSize: t.ref('float-size'),
  floatLineHeight: t.ref('float-line-height'),
  floatWeight: t.ref('float-weight'),
} as const;
