// ═══════════════════════════════════════════
// StatusBar Design Tokens
//
// The device's own chrome, not the app's. Values live in
// design-library/lotteryplus/components/top-and-footer.json alongside device-* because
// they describe the same thing: the phone the shell is measured against.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('topfoot');

export const STATUS_BAR = {
  height: t.ref('status-bar-height'),
  paddingX: t.ref('status-bar-padding-x'),
  timeSize: t.ref('status-bar-time-size'),
} as const;
