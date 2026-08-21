// ═══════════════════════════════════════════
// StatusBar Design Tokens
//
// The device's own chrome. Values sit in
// design-library/lotteryplus/components/top-and-footer.json beside device-*, because they
// describe the same thing: the phone the shell is measured against.
//
// Every number is measured off the StatusBar instance inside Figma's [Mobile] Profile
// (22483:144307), variant `Dark Mode=True, Type=Default`.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('topfoot');

export const STATUS_BAR = {
  height: t.ref('status-bar-height'),
  timeSize: t.ref('status-bar-time-size'),
  timeX: t.ref('status-bar-time-x'),
  timeY: t.ref('status-bar-time-y'),
  notchWidth: t.ref('status-bar-notch-width'),
  notchHeight: t.ref('status-bar-notch-height'),
  notchTop: t.ref('status-bar-notch-top'),
  indicatorY: t.ref('status-bar-indicator-y'),
  indicatorRight: t.ref('status-bar-indicator-right'),
  indicatorGap: t.ref('status-bar-indicator-gap'),
} as const;
