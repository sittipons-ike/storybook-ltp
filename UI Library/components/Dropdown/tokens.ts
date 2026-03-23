// ═══════════════════════════════════════════
// Dropdown Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Component set: "dropdown" (14291:131904)
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing & Layout (2-semantic) ──
export const SPACING = {
  none: 0,       // spacing-none
  sm: 4,         // spacing-sm → Label row paddingLeft, Label↔Field gap, wrapper gap
  lg: 8,         // spacing-lg → Field internal gap, dropdown list padding, option item gap
  '2lg': 10,     // spacing-2lg → Field paddingTop/paddingBottom, dropdown list item spacing
  '2xl': 16,     // spacing-2xl → Field paddingLeft, option item paddingLeft/paddingRight
} as const;

// ── From Foundation: Border Radius (2-semantic) ──
export const RADIUS = {
  lg: 8,         // radius-lg → Field corner radius, dropdown list radius, option item radius
} as const;

// ── From Foundation: Border Width (2-semantic) ──
export const BORDER_WIDTH = {
  1: 1,          // dimension/border-width/1 → Default/Hover/Actived/ReadOnly/Complete/Error states
  2: 2,          // dimension/border-width/2 → Active state
} as const;

// ── From Foundation: Typography (typography collection) ──
// All fonts: Graphik TH
export const TYPOGRAPHY = {
  label: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // title/m-med/size → size/m
    fontWeight: 500,     // title/m-med/weight → Medium
    lineHeight: '22px',  // title/m-med/line-height → line-height/m
  },
  required: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 12,       // label/m-reg/size → size/s
    fontWeight: 500,     // label/m-med/weight → Medium
    lineHeight: '18px',  // label/m-reg/line-height → line-height/s
  },
  placeholder: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // body/m-reg/size → size/m
    fontWeight: 400,     // body/m-reg/weight → Regular
    lineHeight: '22px',  // body/m-reg/line-height → line-height/m
  },
  selectedText: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // body/m-reg/size → size/m
    fontWeight: 400,     // body/m-reg/weight → Regular
    lineHeight: '22px',  // body/m-reg/line-height → line-height/m
  },
  optionNormal: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // body/m-reg/size → size/m
    fontWeight: 400,     // body/m-reg/weight → Regular
    lineHeight: '22px',  // body/m-reg/line-height → line-height/m
  },
  optionSelected: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // body/m-med/size → size/m
    fontWeight: 500,     // body/m-med/weight → Medium
    lineHeight: '22px',  // body/m-med/line-height → line-height/m
  },
  error: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 10,       // caption/m-reg/size → size/2xs
    fontWeight: 400,     // caption/m-reg/weight → Regular
    lineHeight: '16px',  // caption/m-reg/line-height → line-height/2xs
  },
} as const;

// ── From Foundation: Component Tokens (3-component / Dropdown) ──
export const DROPDOWN_COLORS = {
  // Field backgrounds
  bg: {
    white: '#FFFFFF',      // colors/dropdown/dropdown-bg-white
    disable: '#F5F5F5',    // colors/dropdown/dropdown-bg-disable (Read Only)
  },

  // Field borders per state
  border: {
    default: '#D4D4D4',   // colors/dropdown/dropdown-border (Default/Actived/ReadOnly)
    hover: '#737373',      // colors/dropdown/dropdown-fg-gray (Hover)
    active: '#E32321',     // colors/dropdown/dropdown-bd-bg-active (Active)
    complete: '#22C55E',   // colors/dropdown/dropdown-fg-green (Complete)
    error: '#E32321',      // colors/dropdown/dropdown-fg-red (Error-Default/Error)
  },

  // Text colors
  fg: {
    dark: '#262626',       // colors/dropdown/dropdown-fg-dark (label, active/actived text, icons)
    placeholder: '#C9C9C9', // colors/dropdown/dropdown-fg-disable (placeholder text, default icon)
    gray: '#737373',       // colors/dropdown/dropdown-fg-gray (hover icon, read-only text)
    red: '#E32321',        // colors/dropdown/dropdown-fg-red (required marker, error text)
    green: '#22C55E',      // colors/dropdown/dropdown-fg-green (complete border)
    softGray: '#E5E5E5',   // colors/dropdown/dropdown-fg-soft-gray (option hover bg)
  },

  // Label area
  label: {
    text: '#262626',       // colors/dropdown/dropdown-fg-dark
    required: '#E32321',   // colors/dropdown/dropdown-fg-red
  },

  // Dropdown list option items
  option: {
    bgDefault: '#FFFFFF',  // colors/dropdown/dropdown-bg-white
    bgHover: '#E5E5E5',    // colors/dropdown/dropdown-fg-soft-gray
    bgSelected: '#E32321', // colors/dropdown/dropdown-fg-red
    textDefault: '#262626', // colors/dropdown/dropdown-fg-dark
    textSelected: '#FFFFFF', // white text on selected item
  },
} as const;

// ── State-specific mappings (for Token Verification) ──
export const DROPDOWN_STATE_MAP = {
  default:       { bg: '#FFFFFF', border: '#D4D4D4', borderWidth: 1, textColor: '#C9C9C9', iconColor: '#C9C9C9', descVisible: false },
  hover:         { bg: '#FFFFFF', border: '#737373', borderWidth: 1, textColor: '#C9C9C9', iconColor: '#737373', descVisible: false },
  active:        { bg: '#FFFFFF', border: '#E32321', borderWidth: 2, textColor: '#262626', iconColor: '#262626', descVisible: false },
  actived:       { bg: '#FFFFFF', border: '#D4D4D4', borderWidth: 1, textColor: '#262626', iconColor: '#262626', descVisible: false },
  readOnly:      { bg: '#F5F5F5', border: '#D4D4D4', borderWidth: 1, textColor: '#737373', iconColor: '#C9C9C9', descVisible: false },
  complete:      { bg: '#FFFFFF', border: '#22C55E', borderWidth: 1, textColor: '#262626', iconColor: '#262626', descVisible: false },
  errorDefault:  { bg: '#FFFFFF', border: '#E32321', borderWidth: 1, textColor: '#C9C9C9', iconColor: '#262626', descVisible: true },
  error:         { bg: '#FFFFFF', border: '#E32321', borderWidth: 1, textColor: '#262626', iconColor: '#262626', descVisible: true },
} as const;

// ── Layout dimensions from Figma ──
export const DROPDOWN_DIMENSIONS = {
  // Field padding: top/right/bottom/left → 10/8/10/16
  field: {
    paddingTop: 10,        // spacing-2lg
    paddingRight: 8,       // spacing-lg
    paddingBottom: 10,     // spacing-2lg
    paddingLeft: 16,       // spacing-2xl
    gap: 8,                // spacing-lg (between text and icon)
  },

  // Icon
  iconSize: 24,            // icons-size Size=24

  // Dropdown list container
  list: {
    padding: 8,            // spacing-lg
    gap: 10,               // spacing-2lg
  },

  // Option item: padding 4/16/4/16
  option: {
    paddingTop: 4,         // spacing-sm
    paddingRight: 16,      // spacing-2xl
    paddingBottom: 4,      // spacing-sm
    paddingLeft: 16,       // spacing-2xl
    gap: 8,                // spacing-lg
  },

  // Wrapper
  wrapper: {
    labelToFieldGap: 4,    // spacing-sm (VERTICAL gap)
    labelPaddingLeft: 4,   // spacing-sm
    labelInternalGap: 4,   // spacing-sm
    descriptionPaddingLeft: 4, // spacing-sm
  },
} as const;

// ── Shadow Tokens ──
export const SHADOW = {
  sm: '0px 1px 2px 0px rgba(0,0,0,0.06), 0px 1px 3px 0px rgba(0,0,0,0.10)', // dimension/shadow/sm
} as const;
