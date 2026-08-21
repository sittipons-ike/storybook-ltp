// ═══════════════════════════════════════════
// TitleWithUnderline Design Tokens
//
// Measured off Figma's `Head` (23599:392870) on the carts page.
// Authored in design-library/lotteryplus/components/title-with-underline.json.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('title-underline');

export type TitleTone = 'primary' | 'secondary';

export const TITLE_UNDERLINE = {
  paddingX: t.ref('padding-x'),
  gap: t.ref('gap'),
  iconGap: t.ref('icon-gap'),
  lineWidth: t.ref('line-width'),
  accentColor: t.ref('accent-color'),
  ruleColor: t.ref('rule-color'),
  titleSize: t.ref('title-size'),
  titleLineHeight: t.ref('title-line-height'),
  titleWeight: t.ref('title-weight'),
  colorPrimary: t.ref('color-primary'),
  colorSecondary: t.ref('color-secondary'),
} as const;
