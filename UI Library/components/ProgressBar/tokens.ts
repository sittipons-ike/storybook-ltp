// ═══════════════════════════════════════════
// ProgressBar Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Component set: "progress-bars-lottery" (14291:136200)
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing & Layout ──
// Variable: dimension/spacing/spacing-none → spacing/0 = 0px
// Variable: dimension/spacing/spacing-sm → spacing/4 = 4px
// Variable: dimension/spacing/spacing-lg → spacing/8 = 8px
export const SPACING = {
  none: 0,   // spacing-none
  sm: 4,     // spacing-sm (gap circle to label)
  lg: 8,     // spacing-lg (container paddingLeft/Right)
} as const;

// ── From Foundation: Border Radius ──
// Variable: dimension/breakpoint/radius/radius-xxxl → radius/999 = 999px
export const RADIUS = {
  full: 999, // Radius/Radius-XXXL (step circle — full round)
} as const;

// ── From Foundation: Typography ──
// Variable: label/m-reg/font-family → font-family/Graphik TH
// Variable: label/m-reg/size → size/m = 12px
// Variable: label/m-reg/weight → weight/Medium = 500
// Variable: label/m-reg/line-height → line-height/m = 18px
export const TYPOGRAPHY = {
  fontFamily: "'Graphik TH', sans-serif",
  fontSize: 12,        // size/m
  fontWeight: 500,     // Medium
  lineHeight: '18px',  // line-height/m
} as const;

// ── From Foundation: Component Tokens (progress-bars collection) ──
// Colors bound to Figma variables

// Variable: colors/progress/progress-bg-red → #E32321 (completed/active circle + completed line)
// Variable: colors/progress/progress-bg-soft-gray → #D4D4D4 (inactive circle + inactive line)
// Variable: colors/progress/progress-fg-dark → #262626 (completed/active label)
// Variable: colors/progress/progress-fg-disable → #C9C9C9 (inactive label)
// Variable: colors/icon/on-bg → #FFFFFF (icon on colored circle)
export const PROGRESS_COLORS = {
  circle: {
    active: '#E32321',    // progress-bg-red
    inactive: '#D4D4D4',  // progress-bg-soft-gray
  },
  line: {
    active: '#E32321',    // progress-bg-red
    inactive: '#D4D4D4',  // progress-bg-soft-gray
  },
  label: {
    active: '#262626',    // progress-fg-dark
    inactive: '#C9C9C9',  // progress-fg-disable
  },
  icon: '#FFFFFF',        // Colors=On BG
} as const;

// ── Progress Bar Dimensions (from Figma Auto Layout) ──
// Circle: 40×40, Icon: 24×24, Line height: 2px
export const PROGRESS_DIMENSIONS = {
  circleSize: 40,          // step circle width/height
  iconSize: 24,            // icons-size (24×24)
  lineHeight: 2,           // connecting line stroke height
  gapCircleToLabel: 4,     // spacing-sm (gap between circle and label)
  containerPaddingX: 8,    // spacing-lg (container paddingLeft/Right)
} as const;
