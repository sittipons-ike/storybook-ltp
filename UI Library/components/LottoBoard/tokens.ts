// ═══════════════════════════════════════════
// LottoBoard Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Sub-components: NumberSearchBox, MenuButton, SetSelect, SearchCard
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing & Layout ──
// Variable: dimension/spacing/spacing-none → spacing/0 = 0px
// Variable: dimension/spacing/spacing-sm → spacing/4 = 4px
// Variable: dimension/spacing/spacing-lg → spacing/8 = 8px
// Variable: dimension/spacing/spacing-xl → spacing/12 = 12px
// Variable: dimension/spacing/spacing-2xl → spacing/16 = 16px
export const SPACING = {
  none: 0,   // spacing-none
  sm: 4,     // spacing-sm
  lg: 8,     // spacing-lg
  xl: 12,    // spacing-xl
  '2xl': 16, // spacing-2xl
} as const;

// ── From Foundation: Border Radius ──
// Variable: dimension/breakpoint/radius/radius-none → radius/0 = 0px
// Variable: dimension/breakpoint/radius/radius-lg → radius/8 = 8px
export const RADIUS = {
  none: 0, // radius-none
  lg: 8,   // radius-lg
} as const;

// ── From Foundation: Border Width ──
// Variable: dimension/border-width/0 → 0px
// Variable: dimension/border-width/1 → 1px
export const BORDER_WIDTH = {
  0: 0,
  1: 1,
} as const;

// ── From Foundation: Shadow ──
// Variable: dimension/shadow/sm
export const SHADOW = {
  sm: '0px 1px 2px 0px rgba(0,0,0,0.06), 0px 1px 3px 0px rgba(0,0,0,0.10)',
} as const;

// ── From Foundation: Typography ──
// Variable: title/l-semb → 16px/24px Semibold, Graphik TH
// Variable: button/m-semb → 14px/22px Semibold, Graphik TH
// Variable: underline/m-med → 14px/22px Medium, Graphik TH
// Variable: caption → 12px/18px Medium, Graphik TH
export const TYPOGRAPHY = {
  fontFamily: "'Graphik TH', sans-serif",
  title: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
  button: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
  underline: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '22px',
  },
  caption: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
  },
  numberBox: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '32px',
  },
} as const;

// ── From Foundation: Component Colors (3-component collection) ──
// Variable mapping: colors/lotto-board/*

export const LOTTO_BOARD_COLORS = {
  /** colors/lotto-board/lotto-board-bg-white → #FFFFFF */
  bgWhite: '#FFFFFF',
  /** colors/lotto-board/lotto-board-bg-dark → #262626 */
  bgDark: '#262626',
  /** colors/lotto-board/lotto-board-bg-gray → #C9C9C9 */
  bgGray: '#C9C9C9',
  /** colors/lotto-board/lotto-board-border → #D4D4D4 */
  border: '#D4D4D4',
  /** colors/lotto-board/lotto-board-fg-dark → #262626 */
  fgDark: '#262626',
  /** colors/lotto-board/lotto-board-fg-red → #E32321 */
  fgRed: '#E32321',
} as const;

// ── From Foundation: Button Colors (used by MenuButton) ──
// Variable mapping: colors/button/primary/*
// Variable mapping: colors/button/on-container/*

export const BUTTON_COLORS = {
  primary: {
    bg: '#E32321',    // btn-bg-pri-default
    fg: '#FFFFFF',    // btn-fg-pri-default
  },
  onContainer: {
    bg: '#FFFFFF',    // btn-bg-oncont-default
    fg: '#E32321',    // btn-fg-oncont-default
  },
} as const;

// ── NumberSearchBox Config ──
export const NUMBER_BOX = {
  width: 53,
  height: 64,
  padding: SPACING.lg,        // 8px all sides
  gap: SPACING.lg,            // 8px between boxes
  wrapperPaddingLR: SPACING['2xl'], // 16px
  borderRadius: RADIUS.lg,    // 8px
  borderWidth: BORDER_WIDTH[1], // 1px
  shadow: SHADOW.sm,
} as const;

// ── MenuButton Config ──
export const MENU_BUTTON = {
  buttonWidth: 114,
  buttonHeight: 44,
  gap: SPACING.lg,            // 8px
  paddingLR: SPACING['2xl'],  // 16px
  borderRadius: RADIUS.lg,    // 8px
  borderWidth: BORDER_WIDTH[1],
} as const;

// ── SetSelect Config ──
export const SET_SELECT = {
  gap: SPACING.sm,             // 4px vertical gap
  paddingLR: SPACING['2xl'],   // 16px
  innerGap: SPACING['2xl'],    // 16px horizontal gap
  imageWidth: 72,
  imageHeight: 69,
  stepperButtonSize: 48,
  stepperPadding: SPACING.xl,  // 12px
  stepperRadius: RADIUS.lg,    // 8px
} as const;

// ── SearchCard Config ──
export const SEARCH_CARD = {
  gap: SPACING['2xl'],         // 16px vertical gap
} as const;

// ── Variant Types ──
export type NumberSearchBoxVariant = 'Empty' | '6' | 'Front 3' | 'Back 3' | 'Back 2' | '1';
export type MenuButtonType = 'All' | 'Single' | 'Set';
export type SetSelectStatus = 'Default' | 'Active' | 'Actived';
export type SearchCardType = 'All' | 'Single' | 'Set';

// Maps variant to which boxes are selected (true = selected/active)
export const NUMBER_BOX_VARIANT_MAP: Record<NumberSearchBoxVariant, boolean[]> = {
  'Empty':   [false, false, false, false, false, false],
  '6':       [true,  true,  true,  true,  true,  true],
  'Front 3': [true,  true,  true,  false, false, false],
  'Back 3':  [false, false, false, true,  true,  true],
  'Back 2':  [false, false, false, false, true,  true],
  '1':       [false, false, false, false, false, true],
};

// Menu button labels (Thai)
export const MENU_BUTTON_LABELS: Record<MenuButtonType, string> = {
  All: 'ทั้งหมด',
  Single: 'หวยเดี่ยว',
  Set: 'หวยชุด',
};
