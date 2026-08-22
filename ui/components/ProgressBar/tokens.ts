// ═══════════════════════════════════════════
// ProgressBar Design Tokens
//
// This file holds NO values. Every value lives in Figma, flows through design.md
// (colours) and design-library/lotteryplus/components/progress-bars.json (layout,
// sizing, typography), and is generated into foundations/tokens.css (CSS custom
// properties) and foundations/tokens.generated.ts (resolved literals).
//
// What this file adds is types and lookup helpers, so ProgressBar.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate the source values: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('progress');

/** Figma component set: progress-bars-lottery (14291:136200). */
export const PROGRESS_FIGMA_ID = '14291:136200';

/** How far a step is relative to `currentStep`. */
export type ProgressStepState = 'completed' | 'active' | 'upcoming';

export const PROGRESS_STEP_STATES: readonly ProgressStepState[] = [
  'completed',
  'active',
  'upcoming',
] as const;

/** The literal a ProgressBar token resolves to. Empty string when it is not declared. */
export const progressValue = (token: string): string => t.value(token);

/** Every Tier 2 token declared for progress — what the token-chain story enumerates. */
export const progressTokenNames = (): string[] => t.names();

/**
 * Layout and typography, shared by every step.
 *
 * `trackOffset` is derived rather than authored: the connector line has to sit on the
 * vertical centre of the circle, which is a function of two other tokens, so it stays a
 * calc() over them instead of a fourth number that could fall out of step.
 */
export const PROGRESS = {
  radius: t.ref('radius'),
  paddingY: t.ref('padding-y'),
  paddingX: t.ref('padding-x'),
  gap: t.ref('gap'),

  circleSize: t.ref('circle-size'),
  trackHeight: t.ref('track-height'),
  trackOffset: `calc((${t.ref('circle-size')} - ${t.ref('track-height')}) / 2)`,
  /** How far the rule runs under the circles at each end. */
  lineOverhang: t.ref('line-overhang'),
  /** Circle + gap + one line of label — Figma's row is 62 tall and never changes. */
  rowHeight: `calc(${t.ref('circle-size')} + ${t.ref('gap')} + ${t.ref('typography-line-height')})`,
  labelTop: `calc(${t.ref('circle-size')} + ${t.ref('gap')})`,

  fontFamily: t.ref('typography-family'),
  fontSize: t.ref('typography-size'),
  fontWeight: t.ref('typography-weight'),
  lineHeight: t.ref('typography-line-height'),
  letterSpacing: t.ref('typography-tracking'),
} as const;

/** Icon size stays numeric — `Icon` takes a number prop, not a style. */
export const PROGRESS_ICON_SIZE =
  Number(progressValue('icon-size').replace('px', '')) || 24;

export interface ProgressStepSlots<T> {
  /** Step circle fill. */
  circle: T;
  /** Icon glyph fill, which sits on the circle. */
  icon: T;
  /** Step label text. */
  label: T;
}

/**
 * Token names (without the `--progress-` prefix) for one step state.
 *
 * Figma models progress as a flat palette rather than a variant x state matrix: a
 * completed step and the active step share the brand-red slot, and only an upcoming
 * step drops to the muted pair. Nothing here is a colour — only the tail of a name.
 */
export const progressStepTokens = (
  state: ProgressStepState,
): ProgressStepSlots<string> => ({
  circle: state === 'upcoming' ? 'background-soft-gray' : 'background-red',
  icon: 'foreground-white',
  label: state === 'upcoming' ? 'foreground-disable' : 'foreground-dark',
});

/** CSS variable references for one step state — what ProgressBar.tsx renders with. */
export const progressStepColors = (
  state: ProgressStepState,
): ProgressStepSlots<string> => {
  const tokens = progressStepTokens(state);
  return {
    circle: t.ref(tokens.circle),
    icon: t.ref(tokens.icon),
    label: t.ref(tokens.label),
  };
};

/** Resolved literals for one step state — for stories, tables and tests. */
export const progressStepColorValues = (
  state: ProgressStepState,
): ProgressStepSlots<string> => {
  const tokens = progressStepTokens(state);
  return {
    circle: progressValue(tokens.circle),
    icon: progressValue(tokens.icon),
    label: progressValue(tokens.label),
  };
};

export interface ProgressTrackSlots<T> {
  /** The full-width rail behind the fill. */
  track: T;
  /** The portion of the rail covered once the step before it is complete. */
  fill: T;
}

/** Token names (without the `--progress-` prefix) for the connector rail. */
export const PROGRESS_TRACK_TOKENS: ProgressTrackSlots<string> = {
  track: 'background-soft-gray',
  fill: 'background-red',
};

/** CSS variable references for the connector rail. */
export const PROGRESS_TRACK_COLORS: ProgressTrackSlots<string> = {
  track: t.ref(PROGRESS_TRACK_TOKENS.track),
  fill: t.ref(PROGRESS_TRACK_TOKENS.fill),
};

/** Resolved literals for the connector rail. */
export const PROGRESS_TRACK_COLOR_VALUES: ProgressTrackSlots<string> = {
  track: progressValue(PROGRESS_TRACK_TOKENS.track),
  fill: progressValue(PROGRESS_TRACK_TOKENS.fill),
};
