// ═══════════════════════════════════════════
// Skeleton Design Tokens
//
// No values here. Figma has no skeleton component (verified absent 2026-08-20);
// layout is authored in design-library/lotteryplus/components/skeleton.json from
// the Frontend's common/skeleton, per the amended authority rule.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('skeleton');

export const SKELETON = {
  radius: t.ref('radius'),
  background: t.ref('background'),
} as const;
