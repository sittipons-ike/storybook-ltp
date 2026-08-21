// ═══════════════════════════════════════════
// Loading Design Tokens
//
// This file holds NO values. Colours come from Figma (`colors/loading`) through
// components.figma.json → components.json; layout, sizing and motion are authored in
// design-library/lotteryplus/components/loading.json. Both are generated into
// foundations/tokens.css (CSS custom properties) and foundations/tokens.generated.ts
// (resolved literals).
//
// What this file adds is types and lookup helpers, so Loading.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify:     python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component, sys, sysValue } from '../../foundations/tokens';

const t = component('loading');

/** Size presets. `default` is the Figma component frame; the rest are library presets. */
export type LoadingSize = 'sm' | 'default' | 'lg' | 'xl';

export const LOADING_SIZES: readonly LoadingSize[] = ['sm', 'default', 'lg', 'xl'] as const;

/** The literal a Loading token resolves to. Empty string when it is not declared. */
export const loadingValue = (token: string): string => t.value(token);

/** Every `--loading-*` token declared by the generator — what the token-chain story lists. */
export const loadingTokenNames = (): string[] => t.names();

/**
 * CSS variable references — what Loading.tsx renders with.
 *
 * `logoFill` is the one colour Figma does not expose under `colors/loading`; the Figma
 * layer binds `Color/Foreground/FG-Primary` directly, so this points at the Tier 1
 * semantic token rather than inventing a `--loading-*` alias for it.
 */
export const LOADING = {
  radius: t.ref('radius'),
  padding: t.ref('padding'),

  trackFill: t.ref('background-black-80'),
  trackOpacity: t.ref('track-opacity'),
  arcFill: t.ref('foreground-white'),
  arcPrimary: t.ref('arc-primary'),
  logoFill: sys('color-foreground-primary'),

  frameSize: t.ref('frame-size'),
  frameOffset: t.ref('frame-offset'),
  trackSize: t.ref('track-size'),
  arcSize: t.ref('arc-size'),

  duration: t.ref('duration'),
  timingFunction: t.ref('timing-function'),
  iterationCount: t.ref('iteration-count'),
} as const;

/** Resolved literals for the same set — for stories, tables and tests. */
export const LOADING_VALUES = {
  radius: t.value('radius'),
  padding: t.value('padding'),

  trackFill: t.value('background-black-80'),
  trackOpacity: t.value('track-opacity'),
  arcFill: t.value('foreground-white'),
  logoFill: sysValue('color-foreground-primary'),

  frameSize: t.value('frame-size'),
  frameOffset: t.value('frame-offset'),
  trackSize: t.value('track-size'),
  arcSize: t.value('arc-size'),

  duration: t.value('duration'),
  timingFunction: t.value('timing-function'),
  iterationCount: t.value('iteration-count'),
} as const;

/** CSS reference for one size preset — e.g. `var(--loading-size-lg)`. */
export const loadingSize = (size: LoadingSize): string => t.ref(`size-${size}`);

/** Resolved literal for one size preset — e.g. `'80px'`. */
export const loadingSizeValue = (size: LoadingSize): string => t.value(`size-${size}`);
