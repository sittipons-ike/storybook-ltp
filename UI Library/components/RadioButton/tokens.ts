// ═══════════════════════════════════════════
// RadioButton Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Page: radio-buttons — Section 1
// Components: "radio-buttons" (14457:1351) + "Gender select" (14291:132236)
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing & Layout (2-semantic) ──
export const SPACING = {
  none: 0,       // spacing-none
  xs: 2,         // spacing-xs
  sm: 4,         // spacing-sm → Label↔Options gap, Label internal gap, Label paddingLeft
  lg: 8,         // spacing-lg → CheckBox internal itemSpacing
  '2xl': 16,     // spacing-2xl → CheckBox padding, Options row gap
} as const;

// ── From Foundation: Border Radius (2-semantic) ──
export const RADIUS = {
  lg: 8,         // radius-lg → Check Box Condition corner radius
  full: 9999,    // radius-full → Radio circle
} as const;

// ── From Foundation: Border Width (2-semantic) ──
export const BORDER_WIDTH = {
  1: 1,          // border-width/1 → Radio stroke, CheckBox stroke
} as const;

// ── From Foundation: Typography (typography collection) ──
// All fonts: Graphik TH
export const TYPOGRAPHY = {
  label: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // size/m
    fontWeight: 500,     // Medium
    lineHeight: '22px',  // line-height/m
  },
  required: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 12,       // size/s (mapped to label size)
    fontWeight: 500,     // Medium
    lineHeight: '18px',  // line-height/s
  },
  optional: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 12,       // size/s
    fontWeight: 500,     // Medium
    lineHeight: '22px',  // line-height/m
  },
  optionText: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // size/m — button/m-semb/size
    fontWeight: 600,     // Semibold — button/m-semb/weight
    lineHeight: '22px',  // line-height/m — button/m-semb/line-height
  },
  error: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 10,       // size/2xs (caption/m-reg)
    fontWeight: 500,     // Medium
    lineHeight: '18px',  // line-height/xs
  },
} as const;

// ── From Foundation: Component Tokens (3-component / Radio Buttons) ──
// Colors mapped from ComponentTokens.stories.tsx → Radio Buttons section
export const RADIO_COLORS = {
  // Radio circle
  radio: {
    bg: {
      default: '#FFFFFF',     // colors/radio-buttons/bg-white
      disabled: '#F5F5F5',    // colors/radio-buttons/bg-disable
    },
    border: {
      default: '#D4D4D4',    // colors/radio-buttons/border
      selected: '#22C55E',   // colors/radio-buttons/bg-green (success)
      disabled: '#D4D4D4',   // colors/radio-buttons/border
    },
    check: {
      default: '#22C55E',    // colors/radio-buttons/bg-green (success/default)
      disabled: '#C9C9C9',   // colors/radio-buttons/fg-disable
    },
    focusRing: '#22C55E66',  // colors/radio-buttons/eff-bg-green (green 40% opacity)
  },

  // Check Box Condition (option card)
  card: {
    bg: {
      default: '#FFFFFF',     // colors/radio-buttons/bg-white
      selected: '#F0FDF4',    // success/soft-light (bg-green-s-light in semantic)
      disabled: '#F5F5F5',    // colors/radio-buttons/bg-disable
    },
    border: {
      default: '#D4D4D4',    // colors/radio-buttons/border
      selected: '#22C55E',   // colors/radio-buttons/bg-green
      disabled: '#D4D4D4',   // colors/radio-buttons/border
    },
    text: {
      default: '#C9C9C9',    // colors/radio-buttons/fg-disable (unselected text)
      selected: '#262626',   // colors/radio-buttons/fg-dark
      disabled: '#C9C9C9',   // colors/radio-buttons/fg-disable
    },
  },

  // Label area
  label: {
    text: '#262626',          // colors/radio-buttons/fg-dark
    required: '#E32321',      // colors/radio-buttons/fg-red
    optional: '#A3A3A3',      // neutral/400 (tertiary/accent/md)
  },

  // Error description
  error: '#E32321',           // colors/radio-buttons/fg-red
} as const;

// ── Layout dimensions from Figma ──
export const RADIO_DIMENSIONS = {
  // Radio circle: 20×20px
  radioSize: 20,
  // Check dot: 12×12px (centered in radio)
  checkDotSize: 12,

  // Check Box Condition card
  card: {
    height: 44,               // fixed height
    padding: 16,              // spacing-2xl (all sides)
    innerGap: 8,              // spacing-lg (SPACE_BETWEEN in inner frame)
  },

  // Options row
  optionsGap: 16,             // spacing-2xl (gap between option cards)

  // Gender select wrapper
  wrapper: {
    labelToOptions: 4,        // spacing-sm (VERTICAL gap)
    labelPaddingLeft: 4,      // spacing-sm
    labelInternalGap: 4,      // spacing-sm
  },
} as const;
