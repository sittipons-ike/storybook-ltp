// ═══════════════════════════════════════════
// Divider Design Tokens
//
// No values here. Figma has no divider component set — only a `colors/divider` semantic
// group — so the tone axis is that group, one role to one tone. Layout is authored in
// design-library/lotteryplus/components/divider.json.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('divider');

/**
 * Figma's five `colors/divider` roles. This is not a palette chosen for the component —
 * it is the group Figma already declares, mapped straight through.
 */
export type DividerTone = 'light-gray' | 'gray' | 'dark-gray' | 'primary' | 'inverse';

/**
 * `dashed` is what the Frontend's `common/dash-line` draws across 46 call sites.
 * `solid` has its own evidence on the Figma side: the component tier already holds
 * `carts-divider` and `orders-divider`, both solid lines.
 */
export type DividerStyle = 'dashed' | 'solid';

export const DIVIDER_TONES: readonly DividerTone[] = [
  'light-gray',
  'gray',
  'dark-gray',
  'primary',
  'inverse',
] as const;

export const DIVIDER_STYLES: readonly DividerStyle[] = ['dashed', 'solid'] as const;

export const DIVIDER = {
  thickness: t.ref('thickness'),
  spacing: t.ref('spacing'),
} as const;

/** Tone -> CSS variable reference. */
export const dividerColor = (tone: DividerTone): string => t.ref(`color-${tone}`);

/** Tone -> the literal it resolves to, for tables and tests. */
export const dividerColorValue = (tone: DividerTone): string => t.value(`color-${tone}`);

export const dividerTokenNames = (): string[] => t.names();
export const dividerValue = (name: string): string => t.value(name);

export { default as DIVIDER_SPEC } from '../../../design-library/lotteryplus/components/divider.json';
