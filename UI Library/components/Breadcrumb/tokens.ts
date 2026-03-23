// ═══════════════════════════════════════════
// Breadcrumb Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Component set: "breadcrumb" (14291:136385)
// 5 Variants: Step 1 through Step 5
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing (2-semantic) ──
export const SPACING = {
  none: 0,    // spacing-none
  lg: 8,      // spacing-lg → gap between icon and text within an item
  '2xl': 16,  // spacing-2xl → gap between breadcrumb items (including separator)
} as const;

// ── From Foundation: Typography (typography collection) ──
export const TYPOGRAPHY = {
  // label/m-reg → inactive breadcrumb item text
  inactive: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 12,        // label/m-reg/size
    fontWeight: 400,     // label/m-reg/weight → Regular
    lineHeight: '18px',  // label/m-reg/line-height
  },
  // label/m-semb → active breadcrumb item text (last/current)
  active: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 12,        // label/m-semb/size
    fontWeight: 600,     // label/m-semb/weight → Semibold
    lineHeight: '18px',  // label/m-semb/line-height
  },
} as const;

// ── From Foundation: Colors (3-component / Breadcrumb) ──
export const BREADCRUMB_COLORS = {
  text: {
    inactive: '#141414',  // colors/breadcrumb/breadcrumb-fg-dark
    active: '#E32321',    // colors/breadcrumb/breadcrumb-fg-red
  },
  icon: {
    inactive: '#262626',  // colors/icon/icon-fg-secondary
    active: '#E32321',    // colors/icon/icon-fg-primary
    separator: '#262626', // colors/icon/icon-fg-secondary
  },
} as const;

// ── Layout Dimensions from Figma ──
export const BREADCRUMB_DIMENSIONS = {
  containerGap: 16,  // spacing-2xl → gap between breadcrumb items
  itemGap: 8,        // spacing-lg → gap between icon and text within item
  iconSize: 24,      // icons-size 24px → item icon & separator icon
} as const;
