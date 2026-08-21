// ═══════════════════════════════════════════
// Accordion Design Tokens
//
// No values here. Figma has no accordion component set (verified absent 2026-08-20)
// even though the Lark Standard §3.4 lists accordion-item as canonical — the gap is on
// the Figma side. Authored in design-library/lotteryplus/components/accordion.json from
// the Frontend's common/accordion, per the amended authority rule.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('accordion');

export const ACCORDION = {
  gap: t.ref('gap'),
  underlinePadding: t.ref('underline-padding'),
  underlineWidth: t.ref('underline-width'),
  accentColor: t.ref('accent-color'),
  ruleColor: t.ref('rule-color'),
  titleSize: t.ref('title-size'),
  titleLineHeight: t.ref('title-line-height'),
  titleWeight: t.ref('title-weight'),
  titleColor: t.ref('title-color'),
} as const;

/** Icon size stays numeric — it is a prop on `<Icon size>`, not a style. */
export const ACCORDION_ICON_SIZE = Number(t.value('icon-size').replace('px', '')) || 24;
