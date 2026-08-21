// ═══════════════════════════════════════════
// ProfileSummary Design Tokens
//
// Measured off `header-profile` inside Figma's [Mobile] Profile (22483:144307).
// Values live in design-library/lotteryplus/components/top-and-footer.json under
// profile-summary-*, next to the other profile-header values they sit beside on screen.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('topfoot');

export const PROFILE_SUMMARY = {
  radius: t.ref('profile-summary-radius'),
  padding: t.ref('profile-summary-padding'),
  cardRadius: t.ref('profile-summary-card-radius'),
  accentWidth: t.ref('profile-summary-accent-width'),
  accentColor: t.ref('profile-summary-accent-color'),
  borderWidth: t.ref('profile-summary-border-width'),
  borderColor: t.ref('profile-summary-border-color'),
  ruleGap: t.ref('profile-summary-rule-gap'),
  background: t.ref('header-background'),
} as const;
