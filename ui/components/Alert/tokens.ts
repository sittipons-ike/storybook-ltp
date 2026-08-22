// ═══════════════════════════════════════════
// Alert Design Tokens
//
// No values here. Figma has no alert component (verified absent 2026-08-20); authored in
// design-library/lotteryplus/components/alert.json from the Frontend's common/alert,
// per the amended authority rule.
//
// The Frontend hardcodes its border and background as raw hex. Both turned out to be
// byte-identical to status.warning.default and status.warning.soft-light — the literal
// was the system colour all along, so the overlay binds the roles rather than copying
// the values. The two hex strings are recorded in components/alert.json, which is where
// provenance belongs; repeating them here would be a literal colour in component code.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('alert');

export const ALERT = {
  gap: t.ref('gap'),
  paddingX: t.ref('padding-x'),
  paddingY: t.ref('padding-y'),
  radius: t.ref('radius'),
  borderWidth: t.ref('border-width'),
  borderColor: t.ref('border-color'),
  background: t.ref('background'),
  iconCircleSize: t.ref('icon-circle-size'),
  iconCircleColor: t.ref('icon-circle-color'),
  iconColor: t.ref('icon-color'),
  textColor: t.ref('text-color'),
  titleSize: t.ref('title-size'),
  titleLineHeight: t.ref('title-line-height'),
  titleWeight: t.ref('title-weight'),
  descriptionSize: t.ref('description-size'),
  descriptionLineHeight: t.ref('description-line-height'),
  descriptionWeight: t.ref('description-weight'),
} as const;

/** Icon size stays numeric — it is a prop on `<Icon size>`, not a style. */
export const ALERT_ICON_SIZE = Number(t.value('icon-size').replace('px', '')) || 20;
