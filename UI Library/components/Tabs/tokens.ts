// ═══════════════════════════════════════════
// Tabs Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Component sets:
//   - "horizontal-tabs-underline" (14370:9654) — underline style
//   - "horizontal-tabs_button" (14370:9710) — button/pill style
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing (2-semantic) ──
export const SPACING = {
  none: 0,   // spacing-none → component padding
  sm: 4,     // spacing-sm → button-style tab gap between items
  lg: 8,     // spacing-lg → internal gap (text ↔ badge), button-style outer gap
} as const;

// ── From Foundation: Border Radius (2-semantic) ──
export const RADIUS = {
  none: 0,   // radius-none → underline tabs, inactive button tabs
  md: 6,     // radius-md → active button tab inner corners
  lg: 8,     // radius-lg → button-style outer container
} as const;

// ── From Foundation: Border Width (2-semantic) ──
export const BORDER_WIDTH = {
  1: 1, // dimension/border-width/1 → button-style outer border, underline bottom border
} as const;

// ── From Foundation: Typography (typography collection) ──
// button/m-semb → 14px Medium, lineHeight 22px
export const TYPOGRAPHY = {
  tab: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // button/m-semb/size
    fontWeight: 500,     // button/m-med/weight → Medium
    lineHeight: '22px',  // button/m-semb/line-height
  },
} as const;

// ── From Foundation: Colors (3-component / Tabs) ──
export const TAB_COLORS = {
  // === Shared text colors ===
  text: {
    primary: '#E32321',   // colors/tabs/tabs-fg-primary (selected text underline, selected border underline)
    secondary: '#262626',  // colors/tabs/tabs-fg-secondary (unselected text)
    white: '#FFFFFF',      // colors/tabs/tabs-fg-white (selected text in button-style)
    disable: '#C9C9C9',   // colors/tabs/tabs-fg-disable (bottom border underline)
  },

  // === Button-style tab backgrounds ===
  bg: {
    white: '#FFFFFF',      // colors/tabs/tabs-bg-white (button container bg)
    primary: '#E32321',    // colors/tabs/tabs-bg-primary (active tab bg - red)
    secondary: '#262626',  // colors/tabs/tabs-bg-secondary (active tab bg - black)
  },

  // === Borders ===
  border: {
    primary: '#E32321',    // colors/tabs/tabs-fg-primary → button outer border (red)
    secondary: '#262626',  // colors/tabs/tabs-bg-secondary → button outer border (black)
    disable: '#E5E5E5',    // Color/Border/Border-Disable → separator line in underline
    underline: '#C9C9C9',  // colors/tabs/tabs-fg-disable → bottom border underline style
    activeUnderline: '#E32321', // Color/Border/Border-Primary → selected tab underline
  },
} as const;

// ── Layout Dimensions from Figma ──
export const TAB_DIMENSIONS = {
  // === Underline style ===
  underline: {
    height: 40,             // each tab item height
    paddingTop: 8,          // spacing-lg
    paddingRight: 16,       // spacing-2xl
    paddingBottom: 8,       // spacing-lg
    paddingLeft: 16,        // spacing-2xl
    gap: 8,                 // spacing-lg (text ↔ badge)
    bottomBorderWidth: 1,   // underline bottom border
    selectedBorderWidth: 2, // selected tab underline (thicker)
  },

  // === Button style ===
  button: {
    height: 40,
    outerRadius: 8,         // radius-lg
    outerBorderWidth: 1,    // dimension/border-width/1
    itemGap: 4,             // spacing-sm between tab buttons
    // Each tab item
    item: {
      paddingTop: 8,        // spacing-lg
      paddingRight: 16,     // spacing-2xl
      paddingBottom: 8,     // spacing-lg
      paddingLeft: 16,      // spacing-2xl
      gap: 8,               // spacing-lg (text ↔ badge)
      activeRadius: 6,      // radius-md → active tab inner corners
    },
  },

  // === Badge icon ===
  badgeSize: 16,            // icons-size 16px
} as const;
