// ═══════════════════════════════════════════
// Modal Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Page: modal — "modal-state" component set (14610:24998)
// 10 variants: state(5) × layout-vertical(2)
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing & Layout (2-semantic) ──
export const SPACING = {
  none: 0,       // spacing-none
  lg: 8,         // spacing-lg → Wording internal gap (title↔subtitle)
  '2xl': 16,     // spacing-2xl → icon↔wording gap, button session gap
  '4xl': 24,     // spacing-4xl → Modal padding (all sides), main sections gap
} as const;

// ── From Foundation: Border Radius (2-semantic) ──
export const RADIUS = {
  lg: 8,         // radius-lg → Button corners
  '2xl': 16,     // radius-2xl → Modal container corners
  '5xl': 48,     // radius-5xl → Icon circle background (mapped to 48 in Figma)
} as const;

// ── From Foundation: Border Width (2-semantic) ──
export const BORDER_WIDTH = {
  1: 1,          // border-width/1 → Tertiary button stroke
} as const;

// ── From Foundation: Typography (typography collection) ──
// Figma boundVariables confirmed:
//   Title → title/l-semb/* (font-family, size, weight, line-height)
//   Subtitle → body/m-reg/* + font-family/Graphik TH
//   Button → button/m-semb/* (via Button component)
export const TYPOGRAPHY = {
  // Title: title/l-semb → 16px/24px Semibold (Graphik TH)
  title: {
    fontFamily: "'Graphik TH', sans-serif",  // title/l-semb/font-family → font-family/Graphik TH
    fontSize: 16,       // title/l-semb/size → size/l
    fontWeight: 600,     // title/l-semb/weight → weight/Semibold
    lineHeight: '24px',  // title/l-semb/line-height → line-height/l (24px)
  },
  // Subtitle: body/m-reg → 14px/22px Regular (Graphik TH)
  subtitle: {
    fontFamily: "'Graphik TH', sans-serif",  // font-family/Graphik TH
    fontSize: 14,       // body/m-reg/size → size/m
    fontWeight: 400,     // body/m-reg/weight → weight/Regular
    lineHeight: '22px',  // body/m-reg/line-height → line-height/m (22px)
  },
  // Button text: button/m-semb → 14px/22px Semibold (via Button component)
  button: {
    fontFamily: "'Graphik TH', sans-serif",
    fontSize: 14,       // button/m-semb/size → size/m
    fontWeight: 600,     // button/m-semb/weight → weight/Semibold
    lineHeight: '22px',  // button/m-semb/line-height → line-height/m (22px)
  },
} as const;

// ── From Foundation: Shadow (2-semantic) ──
// Figma bound variable: dimension/shadow/md/color-2
// Actual effects on modal container:
//   DROP_SHADOW 1: offset(0, 2) blur(4) spread(-1) rgba(0,0,0,0.06)
//   DROP_SHADOW 2: offset(0, 4) blur(6) spread(-1) rgba(0,0,0,0.10)
// → Maps to Foundation shadow/md token
export const SHADOW = {
  md: '0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
} as const;

// ── From Foundation: Component Tokens (3-component / Modal) ──
export type ModalState = 'success' | 'warning' | 'warning-serious' | 'error' | 'info';

interface ModalStateConfig {
  iconName: string;      // Icon from Components/Icon library
  iconColor: string;     // Icon SVG fill color
  iconBg: string;        // Icon circle background
}

// All colors mapped from Foundation ComponentTokens → Modal section
export const MODAL_STATES: Record<ModalState, ModalStateConfig> = {
  success: {
    iconName: 'outline-check_circle',
    iconColor: '#22C55E',     // colors/modal/fg-green → success/default
    iconBg: '#F0FDF4',        // colors/modal/bg-soft-green → success/soft-light
  },
  warning: {
    iconName: 'outline-Warning-2',
    iconColor: '#EAB308',     // colors/modal/fg-yellow → warning/default
    iconBg: '#FEFCE8',        // colors/modal/bg-soft-yellow → warning/soft-light
  },
  'warning-serious': {
    iconName: 'outline-Warning-2',
    iconColor: '#E32321',     // colors/modal/fg-red → error/default (red warning)
    iconBg: '#FEF2F2',        // colors/modal/bg-soft-red → error/soft-light
  },
  error: {
    iconName: 'outline-Error-1',
    iconColor: '#E32321',     // colors/modal/fg-red → error/default
    iconBg: '#FEF2F2',        // colors/modal/bg-soft-red → error/soft-light
  },
  info: {
    iconName: 'outline-info',
    iconColor: '#262626',     // colors/modal/fg-dark → secondary/default
    iconBg: '#FAFAFA',        // colors/modal/bg → neutral/50
  },
};

// Modal container colors
export const MODAL_COLORS = {
  bg: '#FFFFFF',              // colors/modal/bg-white → base/white
  titleText: '#262626',       // colors/modal/fg-dark → secondary/default
  subtitleText: '#262626',    // colors/modal/fg-dark → secondary/default

  // Primary button (confirm) — uses Button Primary tokens
  primaryBtn: {
    bg: '#E32321',            // colors/button/primary/btn-bg-pri-default
    text: '#FFFFFF',          // colors/button/primary/btn-fg-pri-default
  },
  // Secondary button (cancel) — uses Button Tertiary tokens
  secondaryBtn: {
    bg: '#FFFFFF',            // colors/button/tertiary/btn-bg-ter-default
    text: '#262626',          // colors/button/tertiary/btn-fg-ter-default
    border: '#D4D4D4',        // colors/button/tertiary border
  },
  // Link button (cancel in vertical=no) — text only
  linkBtn: {
    text: '#262626',          // colors/button/outline fg
  },

  // Overlay background
  overlay: '#00000099',       // overlay-default (black 60%)
} as const;

// ── Layout Dimensions from Figma ──
export const MODAL_DIMENSIONS = {
  // Modal container
  width: 358,                 // Fixed width
  padding: 24,               // spacing-4xl (all sides)
  sectionGap: 24,            // spacing-4xl (between icon+wording and buttons)
  cornerRadius: 16,          // radius-2xl

  // Icon area
  icon: {
    containerSize: 64,       // 64×64px circle
    iconSize: 48,            // icons-size: Size=48
    padding: 8,              // (64-48)/2 = 8px spacing-lg
    borderRadius: 48,        // radius-5xl (circle)
  },

  // Wording area
  wording: {
    iconToWording: 16,       // spacing-2xl
    titleToSubtitle: 8,      // spacing-lg
  },

  // Button session — layout-vertical=yes (side by side)
  buttonsHorizontal: {
    gap: 16,                 // spacing-2xl
    height: 44,              // Button L height
  },

  // Button session — layout-vertical=no (stacked)
  buttonsVertical: {
    gap: 16,                 // spacing-2xl
    height: 44,              // Button L height
  },
} as const;
