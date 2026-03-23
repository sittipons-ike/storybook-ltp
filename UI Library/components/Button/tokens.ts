// ═══════════════════════════════════════════
// Button Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing & Layout ──
// Variable: dimension/spacing/spacing-none → spacing/0 = 0px
// Variable: dimension/spacing/spacing-sm → spacing/4 = 4px
// Variable: dimension/spacing/spacing-lg → spacing/8 = 8px
// Variable: dimension/spacing/spacing-xl → spacing/12 = 12px
// Variable: dimension/spacing/spacing-2xl → spacing/16 = 16px
export const SPACING = {
  none: 0,       // spacing-none (paddingTop/Bottom)
  sm: 4,         // spacing-sm (itemSpacing icon+text variant)
  lg: 8,         // spacing-lg (itemSpacing text-only variant)
  xl: 12,        // spacing-xl (paddingLeft icon variant)
  '2xl': 16,     // spacing-2xl (paddingLeft/Right)
} as const;

// ── From Foundation: Border Radius ──
// Variable: dimension/breakpoint/radius/radius-lg → radius/8 = 8px
export const RADIUS = {
  lg: 8,         // radius-lg (all button corners)
} as const;

// ── From Foundation: Border Width ──
// Variable: dimension/border-width/1 → border-width/1 = 1px
export const BORDER_WIDTH = {
  1: 1,          // border-width/1 (Tertiary stroke)
} as const;

// ── From Foundation: Typography ──
// Variable: button/m-semb/font-family → font-family/Graphik TH
// Variable: button/m-semb/size → size/m = 14px
// Variable: button/m-semb/weight → weight/Semibold = 600
// Variable: button/m-semb/line-height → line-height/m = 22px
export const TYPOGRAPHY = {
  fontFamily: "'Graphik TH', sans-serif",
  fontSize: 14,      // size/m
  fontWeight: 600,    // Semibold
  lineHeight: '22px', // line-height/m
} as const;

// ── From Foundation: Component Tokens (3-component collection) ──
// All colors reference semantic/primitive tokens via Foundation

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link';
export type ButtonState = 'default' | 'hover' | 'focused' | 'pressed' | 'disabled';
export type ButtonSize = 'L' | 'M' | 'S';

interface ButtonColorSet {
  bg: string;
  fg: string;
  border?: string;
}

// Variable mapping: colors/button/{type}/btn-bg-{type}-{state}
// Variable mapping: colors/button/{type}/btn-fg-{type}-{state}
export const BUTTON_COLORS: Record<ButtonType, Record<ButtonState, ButtonColorSet>> = {
  primary: {
    default:  { bg: '#E32321', fg: '#FFFFFF' },           // btn-bg-pri-default → colors/primary/default
    hover:    { bg: '#B91C1C', fg: '#FFFFFF' },           // btn-bg-pri-hover
    focused:  { bg: '#DC2626', fg: '#FFFFFF' },           // btn-bg-pri-focused
    pressed:  { bg: '#7F1D1D', fg: '#FFFFFF' },           // btn-bg-pri-pressed
    disabled: { bg: '#F5F5F5', fg: '#C9C9C9', border: '#C9C9C9' }, // btn-bg-pri-disabled
  },
  secondary: {
    default:  { bg: '#262626', fg: '#FFFFFF' },           // btn-bg-sec-default
    hover:    { bg: '#4F4F4F', fg: '#FFFFFF' },           // btn-bg-sec-hover
    focused:  { bg: '#262626', fg: '#FFFFFF' },           // btn-bg-sec-focused
    pressed:  { bg: '#1A1A1A', fg: '#FFFFFF' },           // btn-bg-sec-pressed
    disabled: { bg: '#F5F5F5', fg: '#C9C9C9', border: '#C9C9C9' }, // btn-bg-sec-disabled
  },
  tertiary: {
    default:  { bg: '#FFFFFF', fg: '#262626', border: '#D4D4D4' },
    hover:    { bg: '#FAFAFA', fg: '#4F4F4F', border: '#4F4F4F' },  // btn-bg-ter-hover
    focused:  { bg: '#FAFAFA', fg: '#262626', border: '#262626' },  // btn-bg-ter-focused
    pressed:  { bg: '#C9C9C9', fg: '#1A1A1A', border: '#1A1A1A' },  // btn-bg-ter-pressed
    disabled: { bg: '#F5F5F5', fg: '#C9C9C9', border: '#C9C9C9' },  // btn-bg-ter-disabled
  },
  outline: {
    default:  { bg: 'transparent', fg: '#262626' },
    hover:    { bg: 'transparent', fg: '#4F4F4F' },
    focused:  { bg: 'transparent', fg: '#262626' },
    pressed:  { bg: 'transparent', fg: '#1A1A1A' },
    disabled: { bg: 'transparent', fg: '#C9C9C9' },
  },
  link: {
    default:  { bg: 'transparent', fg: '#3B82F6' },       // info/default
    hover:    { bg: 'transparent', fg: '#60A5FA' },        // blue/400
    focused:  { bg: 'transparent', fg: '#2563EB' },        // blue/600
    pressed:  { bg: 'transparent', fg: '#1D4ED8' },        // blue/700
    disabled: { bg: 'transparent', fg: '#C9C9C9' },
  },
};

// ── Button Size Dimensions (from Figma Auto Layout) ──
// Height is FIXED per size; Width is FIXED at 155px in Figma (but we make it flexible)
interface SizeConfig {
  height: number;
  paddingX: number;           // paddingLeft + paddingRight (text-only)
  paddingY: number;           // paddingTop + paddingBottom
  iconPaddingLeft: number;    // paddingLeft when icon is shown
  iconPaddingRight: number;   // paddingRight when icon is shown
  itemSpacing: number;        // gap between icon and text
  iconOnlyPadding: number;    // equal padding for icon-only variant
  iconSize: number;           // icon dimensions
}

export const SIZE_CONFIG: Record<ButtonSize, SizeConfig> = {
  L: {
    height: 44,
    paddingX: 16,              // spacing-2xl
    paddingY: 0,               // spacing-none
    iconPaddingLeft: 12,       // spacing-xl
    iconPaddingRight: 16,      // spacing-2xl
    itemSpacing: 4,            // spacing-sm
    iconOnlyPadding: 10,       // (44 - 24) / 2
    iconSize: 24,
  },
  M: {
    height: 36,
    paddingX: 16,              // spacing-2xl
    paddingY: 0,               // spacing-none
    iconPaddingLeft: 12,       // spacing-xl
    iconPaddingRight: 16,      // spacing-2xl
    itemSpacing: 4,            // spacing-sm
    iconOnlyPadding: 6,        // (36 - 24) / 2
    iconSize: 24,
  },
  S: {
    height: 28,
    paddingX: 16,              // spacing-2xl
    paddingY: 0,               // spacing-none
    iconPaddingLeft: 12,       // spacing-xl
    iconPaddingRight: 16,      // spacing-2xl
    itemSpacing: 4,            // spacing-sm
    iconOnlyPadding: 2,        // (28 - 24) / 2
    iconSize: 24,
  },
};
