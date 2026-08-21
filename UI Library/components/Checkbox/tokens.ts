// ═══════════════════════════════════════════
// Checkbox Design Tokens
//
// No values here. Colours mirror Figma's `colors/checkbox` group; geometry and typography
// are authored in design-library/lotteryplus/components/checkbox.json, verified against
// Figma component set `checkbox` (14291:131502).
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';
import type { IconSize } from '../../icons/Icon';

const t = component('checkbox');

/**
 * Figma declares seven states on one axis: Empty · Selected · All Seleted[sic] ·
 * Disable · Hover · Focus · Error. Two of those are really *checked* values rather than
 * interaction states, so they are split out below — a checkbox can be indeterminate
 * while also being hovered.
 */
export type CheckboxState = 'rest' | 'hover' | 'active' | 'focus' | 'disabled' | 'error';

/** Tri-state, matching Figma's Empty / Selected / All Seleted. */
export type CheckboxChecked = boolean | 'indeterminate';

/**
 * Figma's second axis, `Primary Color = Yes | No`. `No` fills the selected box with
 * success green; `Yes` fills it with the brand red — used where the checkbox agrees to
 * something consequential rather than toggling a preference.
 */
export type CheckboxTone = 'success' | 'primary';

/**
 * A surface treatment the Frontend uses and Figma does not model: `card` wraps the
 * control in a tinted, bordered box for when the checkbox is the whole choice rather
 * than one row in a list. Kept because it has real usage; flagged in the story as
 * unbacked by Figma.
 */
export type CheckboxVariant = 'default' | 'card';

export const CHECKBOX_STATES: readonly CheckboxState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
  'error',
] as const;

export const CHECKBOX_CHECKED: readonly CheckboxChecked[] = [false, true, 'indeterminate'] as const;
export const CHECKBOX_TONES: readonly CheckboxTone[] = ['success', 'primary'] as const;
export const CHECKBOX_VARIANTS: readonly CheckboxVariant[] = ['default', 'card'] as const;

/** Geometry and typography — CSS variable references. */
export const CHECKBOX = {
  size: t.ref('size'),
  padding: t.ref('padding'),
  radius: t.ref('radius'),
  borderWidthRest: t.ref('border-width-rest'),
  borderWidthEmphasis: t.ref('border-width-emphasis'),
  focusRingBlur: t.ref('focus-ring-blur'),
  focusRingSpread: t.ref('focus-ring-spread'),
  gap: t.ref('gap'),
  height: t.ref('height'),

  cardPadding: t.ref('card-padding'),
  cardRadius: t.ref('card-radius'),
  cardBorderWidth: t.ref('card-border-width'),

  fontFamily: t.ref('typography-family'),
  fontSize: t.ref('typography-size'),
  lineHeight: t.ref('typography-line-height'),
  fontWeight: t.ref('typography-weight'),
  tracking: t.ref('typography-tracking'),
} as const;

const px = (name: string, fallback: number) =>
  (Number(t.value(name).replace('px', '')) || fallback) as IconSize;

/**
 * 20px. There is one glyph size, not two: Figma places a 20px `icons-size` instance on
 * Selected and All Seleted and shows nothing at all on the other five states.
 */
export const CHECKBOX_GLYPH_SIZE: IconSize = px('glyph-size', 20);

/**
 * The two glyphs Figma actually uses, from the icon set. `outline-check` for a checked
 * box and `filled-minus` for a partly-selected one — both read off the nested instance
 * inside the Selected and All-Seleted variants, not chosen by name.
 */
export const CHECKBOX_GLYPH = {
  checked: 'outline-check',
  indeterminate: 'filled-minus',
} as const;

export interface CheckboxColorSet {
  /** The 24x24 box itself */
  background: string;
  /** Its border, or 'transparent' when Figma draws none */
  border: string;
  /** Border width — 1px at rest and disabled, 1.5px on hover, focus and error */
  borderWidth: string;
  /** Focus ring, or '' when the state has none */
  ring: string;
  /** The glyph inside a checked box */
  mark: string;
  /** Label text */
  label: string;
  /** Surface behind the whole control — only the `card` variant paints one */
  surface: string;
  /** Border of the card surface */
  cardBorder: string;
}

const token = {
  boxWhite: 'background-white',
  boxDisabled: 'background-disable',
  boxSuccess: 'background-green',
  boxPrimary: 'background-red',
  borderRest: 'border',
  borderSuccess: 'border-success',
  borderPrimary: 'border-primary',
  borderError: 'border-error',
  ringSuccess: 'focus-ring-success',
  ringPrimary: 'focus-ring-primary',
  markOn: 'foreground-white',
  labelRest: 'foreground-dark',
  labelDisabled: 'foreground-disable',
  labelError: 'background-red',
  cardSurface: 'background-soft-green',
  cardBorder: 'foreground-green',
} as const;

/**
 * The lookup is Figma's own truth table, not a rule that happens to reproduce it.
 *
 * | state    | box            | border          | ring |
 * |----------|----------------|-----------------|------|
 * | checked  | tone fill      | none            | none |
 * | rest     | white          | grey 1px        | none |
 * | disabled | background-disable | grey 1px    | none |
 * | hover    | white          | tone 1.5px      | none |
 * | focus    | white          | tone 1.5px      | tone @35% |
 * | error    | white          | border-error 1.5px | none |
 *
 * Checked plus hover/focus/error is the one combination Figma does not draw; the checked
 * fill wins and the emphasis border is layered over it. That is an extrapolation and is
 * recorded as one in checkbox.json under `_figma_gaps.no-checked-hover`.
 */
const pick = (
  read: (name: string) => string,
  checked: CheckboxChecked,
  state: CheckboxState,
  tone: CheckboxTone,
  variant: CheckboxVariant,
): CheckboxColorSet => {
  const marked = checked === true || checked === 'indeterminate';
  const toneBox = tone === 'primary' ? token.boxPrimary : token.boxSuccess;
  const toneBorder = tone === 'primary' ? token.borderPrimary : token.borderSuccess;
  const toneRing = tone === 'primary' ? token.ringPrimary : token.ringSuccess;

  const emphasised = state === 'hover' || state === 'focus' || state === 'active' || state === 'error';

  let background: string;
  let border = '';
  let borderWidth = CHECKBOX.borderWidthRest;

  if (state === 'disabled') {
    background = read(marked ? toneBox : token.boxDisabled);
    border = marked ? '' : read(token.borderRest);
  } else if (marked) {
    background = read(toneBox);
    if (emphasised) {
      border = read(state === 'error' ? token.borderError : toneBorder);
      borderWidth = CHECKBOX.borderWidthEmphasis;
    }
  } else {
    background = read(token.boxWhite);
    border = read(
      state === 'error' ? token.borderError : emphasised ? toneBorder : token.borderRest,
    );
    if (emphasised) borderWidth = CHECKBOX.borderWidthEmphasis;
  }

  return {
    background,
    border: border || 'transparent',
    borderWidth,
    ring: state === 'focus' ? read(toneRing) : '',
    mark: read(token.markOn),
    label: read(
      state === 'disabled'
        ? token.labelDisabled
        : state === 'error'
        ? token.labelError
        : token.labelRest,
    ),
    surface: variant === 'card' ? read(token.cardSurface) : '',
    cardBorder:
      variant === 'card' ? read(state === 'disabled' ? token.labelDisabled : token.cardBorder) : '',
  };
};

/** CSS variable references — what Checkbox.tsx renders with. */
export const checkboxColors = (
  checked: CheckboxChecked,
  state: CheckboxState,
  tone: CheckboxTone = 'success',
  variant: CheckboxVariant = 'default',
): CheckboxColorSet => {
  const set = pick((n) => t.ref(n), checked, state, tone, variant);
  return { ...set, surface: set.surface || 'transparent', cardBorder: set.cardBorder || 'transparent' };
};

/** Resolved literals for the same lookup — for stories, tables and tests. */
export const checkboxColorValues = (
  checked: CheckboxChecked,
  state: CheckboxState,
  tone: CheckboxTone = 'success',
  variant: CheckboxVariant = 'default',
): CheckboxColorSet => pick((n) => t.value(n), checked, state, tone, variant);

export const checkboxTokenNames = (): string[] => t.names();
export const checkboxValue = (name: string): string => t.value(name);

/**
 * Where this component knowingly diverges from Figma — the unbound unchecked glyph
 * colour, the three states Figma declares but does not differentiate, and the `card`
 * variant Figma does not model.
 *
 * The record lives in components/checkbox.json under `base._figma_gaps`, not here: it
 * describes what Figma holds, so it belongs beside the rest of the Figma mirror, and
 * keeping one copy means the story and the spec cannot drift apart.
 */
export { default as CHECKBOX_SPEC } from '../../../design-library/lotteryplus/components/checkbox.json';
