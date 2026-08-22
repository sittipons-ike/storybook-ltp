// ═══════════════════════════════════════════
// BottomSheet Design Tokens
//
// No values here. Colours mirror Figma's `colors/bottom sheet` group; layout and motion
// are authored in design-library/lotteryplus/components/bottom-sheet.json.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('bottom-sheet');

/**
 * Layout, motion and surface colours — CSS variable references.
 *
 * There is deliberately no `elevation`: the Figma component (20052:11505) carries no
 * effect at all. A sheet reads against its scrim, not against a shadow.
 */
export const BOTTOM_SHEET = {
  background: t.ref('background-white'),
  handle: t.ref('foreground-dark'),
  foreground: t.ref('foreground-dark'),
  scrim: t.ref('scrim'),

  radiusTop: t.ref('radius-top'),

  paddingX: t.ref('padding-x'),
  paddingBottom: t.ref('padding-bottom'),
  handlePaddingY: t.ref('handle-padding-y'),
  handlePaddingX: t.ref('handle-padding-x'),

  handleWidth: t.ref('handle-width'),
  handleHeight: t.ref('handle-height'),
  handleRadius: t.ref('handle-radius'),
  handleIconSize: t.ref('handle-icon-size'),

  maxHeight: t.ref('max-height'),
  transitionDuration: t.ref('transition-duration'),
  transitionTiming: t.ref('transition-timing'),
} as const;

/**
 * Drag distance past which a release closes the sheet. Numeric because it is compared
 * against pointer coordinates, not applied as a style.
 */
export const DISMISS_THRESHOLD = Number(t.value('dismiss-threshold').replace('px', '')) || 100;

/**
 * The sheet sits above page content and below nothing else in the library.
 * design.md has no z-index ladder, so this stays a named constant here — the same
 * treatment Modal gives its scrim.
 */
export const SHEET_Z_INDEX = 1000;

/** Every `--bottom-sheet-*` token declared, for the token-chain story. */
export const bottomSheetTokenNames = (): string[] => t.names();

export const bottomSheetValue = (name: string): string => t.value(name);

/**
 * Declared by Figma but unused by this component. `background-red` and `foreground-white`
 * exist in the group for sheets with a branded header, which the library does not model
 * yet; `foreground-gray` had no consumer once the handle was corrected to `foreground-dark`.
 * Listed rather than dropped so the gaps stay visible.
 */
export const BOTTOM_SHEET_UNUSED_TOKENS = [
  'background-red',
  'foreground-white',
  'foreground-gray',
] as const;

/**
 * What the 2026-08-19 Figma check corrected. Recorded in components/bottom-sheet.json
 * under `base._corrections` rather than duplicated here — it describes the Figma spec,
 * so it belongs with the spec.
 */
export { default as BOTTOM_SHEET_SPEC } from '../../../design-library/lotteryplus/components/bottom-sheet.json';
