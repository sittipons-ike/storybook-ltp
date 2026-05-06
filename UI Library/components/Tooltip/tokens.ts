// ═══════════════════════════════════════════
// Tooltip Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Page: tool-tip ✅
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing ──
export const SPACING = {
  none: 0,    // spacing-none
  sm: 4,      // spacing-sm
} as const;

// ── From Foundation: Border Radius ──
export const RADIUS = {
  s: 8,       // Radius/Radius-S → tooltip content corner radius
  none: 0,    // radius-none
} as const;

// ── From Foundation: Typography (typography collection) ──
export const TYPOGRAPHY = {
  title: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // body/m-med/size
    fontWeight: 500,     // body/m-med/weight → Medium
    lineHeight: '22px',  // body/m-med/line-height
  },
  body: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // body/m-reg/size
    fontWeight: 400,     // body/m-reg/weight → Regular
    lineHeight: '22px',  // body/m-reg/line-height
  },
} as const;

// ── From Foundation: Colors ──
export const TOOLTIP_COLORS = {
  bg: 'rgba(0, 0, 0, 0.80)',        // colors/overlay/overlay-black-80%
  text: '#FFFFFF',                    // Color/Text/Text-Onbgcolor
  arrow: 'rgba(0, 0, 0, 0.80)',     // colors/overlay/overlay-black-80% (same as bg)
  triggerIcon: '#262626',            // colors/icon/icon-fg-secondary
} as const;

// ── Dimensions from Figma ──
export const TOOLTIP_DIMENSIONS = {
  content: {
    padding: 12,       // 12px all sides
    maxWidth: 326,     // max width from Figma
    minWidth: 120,     // reasonable min
  },
  arrow: {
    width: 16,
    height: 8,
  },
  triggerIconSize: 24, // outline-info icon 24px
} as const;

// ── Shadow Tokens ──
export const SHADOW = {
  tooltip: '0px 0px 0px 1px rgba(0,0,0,0.05), 0px 1px 3px 0px rgba(0,0,0,0.1)',
} as const;

// ── Arrow positions ──
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
