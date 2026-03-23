// ═══════════════════════════════════════════
// Toast Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Page: toast-message — 2 component sets:
//   light-toast (14848:2072): 3 types (informative, success, error)
//   solid-toast (14848:2109): 4 types (informative, success, warning, error)
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing & Layout (2-semantic) ──
export const SPACING = {
  sm: 4,         // spacing-sm → icon circle internal padding
  lg: 8,         // spacing-lg → container padding-top/bottom
  '2xl': 16,     // spacing-2xl → container padding-left/right, inner gap, Frame3 gap
} as const;

// ── From Foundation: Border Radius (2-semantic) ──
export const RADIUS = {
  '2xl': 16,     // radius-2xl → toast container corners
  full: 9999,    // radius-full → icon circle (fully rounded)
} as const;

// ── From Foundation: Border Width (2-semantic) ──
export const BORDER_WIDTH = {
  1: 1,          // dimension/border-width/1 → light toast border
} as const;

// ── From Foundation: Typography (typography collection) ──
// Figma boundVariables confirmed:
//   Title → title/m-semb/* (font-family, size, weight, line-height)
//   Caption → body/m-reg/* + font-family/Graphik TH
export const TYPOGRAPHY = {
  // Title: title/m-semb → 16px Semibold (Graphik TH)
  title: {
    fontFamily: "'Graphik TH', sans-serif",  // title/m-semb/font-family → font-family/Graphik TH
    fontSize: 16,       // title/m-semb/size → size/l (16px)
    fontWeight: 600,     // title/m-semb/weight → weight/Semibold
    lineHeight: '24px',  // title/m-semb/line-height → line-height/l (24px)
  },
  // Caption: body/m-reg → 14px Regular (Graphik TH)
  caption: {
    fontFamily: "'Graphik TH', sans-serif",  // font-family/Graphik TH
    fontSize: 14,       // body/m-reg/size → size/m (14px)
    fontWeight: 400,     // body/m-reg/weight → weight/Regular
    lineHeight: '22px',  // body/m-reg/line-height → line-height/m (22px)
  },
} as const;

// ── From Foundation: Shadow (2-semantic) ──
// Figma bound variable: dimension/shadow/sm
// DROP_SHADOW 1: offset(0,1) blur(2) spread(0) rgba(0,0,0,0.06)
// DROP_SHADOW 2: offset(0,1) blur(3) spread(0) rgba(0,0,0,0.10)
export const SHADOW = {
  sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
} as const;

// ── Toast Dimensions from Figma ──
export const TOAST_DIMENSIONS = {
  // Container: HORIZONTAL auto-layout
  padding: {
    top: 8,        // spacing-lg
    right: 16,     // spacing-2xl
    bottom: 8,     // spacing-lg
    left: 16,      // spacing-2xl
  },
  gap: 16,           // spacing-2xl → gap between Frame3 children
  borderRadius: 16,  // radius-2xl

  // Icon circle
  icon: {
    circleSize: 28,        // 28x28 px
    circlePadding: 4,      // spacing-sm
    circleRadius: 9999,    // radius-full (circle)
    iconSize: 20,          // icons-size: Size=20
  },

  // Text frame
  text: {
    gap: 0,  // VERTICAL, itemSpacing: 0
  },

  // Close button
  close: {
    size: 20,  // icons-size: Size=20
  },
} as const;

// ── Toast Type Definitions ──
export type ToastType = 'informative' | 'success' | 'warning' | 'error';
export type ToastVariant = 'light' | 'solid';

interface ToastTypeConfig {
  iconName: string;        // Figma icon component name
  lightBg: string;         // Light toast background
  lightBorder: string;     // Light toast border color
  lightIconBg: string;     // Light toast icon circle bg (same as border)
  solidBg: string;         // Solid toast background
  solidIconBg: string;     // Solid toast icon circle bg
  // Figma variable names
  varLightBg: string;
  varLightBorder: string;
  varSolidBg: string;
  varSolidIconBg: string;
}

// All colors mapped from Foundation ComponentTokens → Toast section
export const TOAST_TYPES: Record<ToastType, ToastTypeConfig> = {
  informative: {
    iconName: 'filled-info',
    lightBg: '#EFF6FF',          // toast-bg-soft-blue
    lightBorder: '#3B82F6',      // toast-fg-blue
    lightIconBg: '#3B82F6',      // toast-fg-blue
    solidBg: '#3B82F6',          // toast-bg-blue
    solidIconBg: '#EFF6FF',      // toast-bg-soft-blue
    varLightBg: 'colors/toast/toast-bg-soft-blue',
    varLightBorder: 'colors/toast/toast-fg-blue',
    varSolidBg: 'colors/toast/toast-bg-blue',
    varSolidIconBg: 'colors/toast/toast-bg-soft-blue',
  },
  success: {
    iconName: 'filled-check_circle',
    lightBg: '#F0FDF4',          // toast-bg-soft-green
    lightBorder: '#22C55E',      // toast-fg-green
    lightIconBg: '#22C55E',      // toast-fg-green
    solidBg: '#22C55E',          // toast-bg-green
    solidIconBg: '#F0FDF4',      // toast-bg-soft-green
    varLightBg: 'colors/toast/toast-bg-soft-green',
    varLightBorder: 'colors/toast/toast-fg-green',
    varSolidBg: 'colors/toast/toast-bg-green',
    varSolidIconBg: 'colors/toast/toast-bg-soft-green',
  },
  warning: {
    // Warning only exists in solid variant
    iconName: 'filled-Warning-2',
    lightBg: '#FEFCE8',          // (not used in light — warning is solid-only)
    lightBorder: '#EAB308',      // (not used in light)
    lightIconBg: '#EAB308',      // (not used in light)
    solidBg: '#EAB308',          // toast-bg-yellow
    solidIconBg: '#FEFCE8',      // toast-bg-soft-yellow
    varLightBg: '—',
    varLightBorder: '—',
    varSolidBg: 'colors/toast/toast-bg-yellow',
    varSolidIconBg: 'colors/toast/toast-bg-soft-yellow',
  },
  error: {
    iconName: 'filled-Warning-2',
    lightBg: '#FEF2F2',          // toast-bg-soft-red
    lightBorder: '#E32321',      // toast-fg-red
    lightIconBg: '#E32321',      // toast-fg-red
    solidBg: '#E32321',          // toast-bg-red
    solidIconBg: '#FEF2F2',      // toast-bg-soft-red
    varLightBg: 'colors/toast/toast-bg-soft-red',
    varLightBorder: 'colors/toast/toast-fg-red',
    varSolidBg: 'colors/toast/toast-bg-red',
    varSolidIconBg: 'colors/toast/toast-bg-soft-red',
  },
};

// ── Text Colors ──
export const TOAST_COLORS = {
  light: {
    title: '#262626',    // toast-fg-dark
    caption: '#262626',  // toast-fg-dark
    closeIcon: '#262626',// toast-fg-dark
  },
  solid: {
    title: '#FFFFFF',    // toast-fg-white
    caption: '#FFFFFF',  // toast-fg-white
    closeIcon: '#FFFFFF',// toast-fg-white
  },
} as const;

// ── Close Icon ──
export const CLOSE_ICON = {
  name: 'filled-close',
  size: 20,
} as const;
