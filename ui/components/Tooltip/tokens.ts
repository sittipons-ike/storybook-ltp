// ═══════════════════════════════════════════
// Tooltip Design Tokens
//
// This file holds NO values. Every value lives in the token pipeline and is generated
// into foundations/tokens.css (CSS custom properties) and foundations/tokens.generated.ts
// (resolved literals).
//
// Tooltip is the ONE exception in this library: Figma V.7.1 has no `colors/tooltip`
// group, so its colours are not mirrored from Figma like every other component's. They
// are authored in design-library/lotteryplus/components/tooltip.json against the Tier 1
// semantic layer (`--sys-*`) instead — see TOOLTIP_FIGMA_GAP below. The chain still ends
// in Figma, it just enters one tier higher up.
//
// Regenerate the source values: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('tooltip');

/** Where the bubble sits relative to its trigger. Also picks the caret's direction. */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export const TOOLTIP_POSITIONS: readonly TooltipPosition[] = [
  'top',
  'bottom',
  'left',
  'right',
] as const;

/** The literal a Tooltip token resolves to. Empty string when it is not declared. */
export const tooltipValue = (token: string): string => t.value(token);

/** Every Tier 2 token declared for tooltip — what the token-chain story enumerates. */
export const tooltipTokenNames = (): string[] => t.names();

/**
 * The documented gap, surfaced in code and in Storybook.
 *
 * Every other component's `figma_group` names the Figma colour group it mirrors.
 * Tooltip's is null, which is what makes its colour tokens hand-authored rather than
 * pulled. Adding `colors/tooltip` in Figma retires this.
 */
export const TOOLTIP_FIGMA_GAP = {
  figmaGroup: null,
  note:
    'Figma V.7.1 has no colors/tooltip group. Tooltip colours are authored in ' +
    'design-library/lotteryplus/components/tooltip.json against Tier 1 semantic tokens ' +
    'rather than mirrored from a component-tier Figma group.',
  /**
   * Tier 1 semantic path each hand-authored colour points at (no `--sys-` prefix, so it
   * feeds `sysValue()` directly). This is the substitute for the Figma group that does
   * not exist; the token-chain story renders it and checks both tiers still agree.
   */
  colorChain: {
    background: 'color-overlay-heavy',
    foreground: 'color-text-on-bgcolor',
    'arrow-background': 'color-overlay-heavy',
    'trigger-icon-foreground': 'color-text-secondary-default',
  } as Record<string, string>,
} as const;

/** CSS variable references — what Tooltip.tsx renders with. */
export const TOOLTIP = {
  background: t.ref('background'),
  foreground: t.ref('foreground'),
  arrowBackground: t.ref('arrow-background'),
  triggerIconForeground: t.ref('trigger-icon-foreground'),

  radius: t.ref('radius'),
  padding: t.ref('padding'),
  gap: t.ref('gap'),
  /** Distance between the caret tip and the trigger. */
  offset: t.ref('offset'),
  shadow: t.ref('shadow'),
  maxWidth: t.ref('max-width'),
  minWidth: t.ref('min-width'),

  title: {
    fontFamily: t.ref('typography-title-family'),
    fontSize: t.ref('typography-title-size'),
    fontWeight: t.ref('typography-title-weight'),
    lineHeight: t.ref('typography-title-line-height'),
    letterSpacing: t.ref('typography-title-tracking'),
  },
  body: {
    fontFamily: t.ref('typography-body-family'),
    fontSize: t.ref('typography-body-size'),
    fontWeight: t.ref('typography-body-weight'),
    lineHeight: t.ref('typography-body-line-height'),
    letterSpacing: t.ref('typography-body-tracking'),
  },
} as const;

/**
 * Numbers, not CSS references.
 *
 * The caret is drawn as an SVG path, so its dimensions have to reach the `viewBox` and
 * the `d` attribute as numbers — neither accepts a `var()`. Reading them back out of the
 * generated literals keeps the geometry on the same chain as everything else; `0` is a
 * not-declared guard, never a design value.
 */
const numeric = (token: string): number => Number.parseFloat(tooltipValue(token)) || 0;

export const TOOLTIP_ARROW = {
  width: numeric('arrow-width'),
  height: numeric('arrow-height'),
} as const;

/** `Icon` takes a number prop, not a style. */
export const TOOLTIP_TRIGGER_ICON_SIZE = numeric('trigger-icon-size');
