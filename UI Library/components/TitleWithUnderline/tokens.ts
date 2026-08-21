// ═══════════════════════════════════════════
// TitleWithUnderline Design Tokens
//
// No values here. Figma has no component (verified absent 2026-08-20); authored in
// design-library/lotteryplus/components/title-with-underline.json from the
// Frontend's common/title-with-underline, per the amended authority rule.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('title-underline');

export type TitleTone = 'primary' | 'secondary';

export const TITLE_UNDERLINE = {
  gap: t.ref('gap'),
  underlinePadding: t.ref('underline-padding'),
  underlineWidth: t.ref('underline-width'),
  accentColor: t.ref('accent-color'),
  ruleColor: t.ref('rule-color'),
  titleSize: t.ref('title-size'),
  titleLineHeight: t.ref('title-line-height'),
  titleWeight: t.ref('title-weight'),
  colorPrimary: t.ref('color-primary'),
  colorSecondary: t.ref('color-secondary'),
} as const;
