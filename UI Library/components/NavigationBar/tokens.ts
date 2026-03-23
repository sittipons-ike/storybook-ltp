// ═══════════════════════════════════════════
// NavigationBar Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Component set: "navigation-bar-v2" (14291:135864)
// 10 variants: 5 states x 2 add-to-cart modes
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing (2-semantic) ──
// Variable: dimension/spacing/spacing-none → spacing/0 = 0px
// Variable: dimension/spacing/spacing-sm → spacing/4 = 4px
// Variable: dimension/spacing/spacing-xl → spacing/12 = 12px
// Variable: dimension/spacing/spacing-2lg → spacing/10 = 10px
export const SPACING = {
  none: 0,    // spacing-none → paddingTop of nav item
  sm: 4,      // spacing-sm → paddingRight/Left of nav item, cart item padding
  xl: 12,     // spacing-xl → paddingBottom of nav item
  '2lg': 10,  // spacing-2lg → gap inside nav item (icon ↔ label)
} as const;

// ── From Foundation: Border Radius ──
// Variable: dimension/breakpoint/radius/radius-lg → radius/8 = 8px
// Variable: dimension/breakpoint/radius/radius-full → radius/100 = 100px
export const RADIUS = {
  lg: 8,       // radius-lg → cart button border-radius
  full: 100,   // radius-full → home indicator pill, badge circle
} as const;

// ── From Foundation: Border Width ──
// Variable: dimension/border-width/1 → border-width/1 = 1px
export const BORDER_WIDTH = {
  1: 1, // border-width/1 → top border of nav bar
} as const;

// ── From Foundation: Typography ──
// Variable: button/xs-med/font-family → font-family/Graphik TH
// Variable: button/xs-med/size → size/xs = 10px
// Variable: button/xs-med/weight → weight/Medium = 500
// Variable: button/xs-med/line-height → line-height/xs = 18px
export const TYPOGRAPHY = {
  fontFamily: "'Graphik TH', sans-serif",
  fontSize: 10,       // button/xs-med/size → 10px
  fontWeight: 500,     // button/xs-med/weight → Medium
  lineHeight: '18px',  // button/xs-med/line-height → 18px
} as const;

// ── From Foundation: Colors (3-component / NavigationBar) ──
export const NAV_COLORS = {
  // Background
  bgWhite: '#FFFFFF',       // colors/navigation-bar/navigation-bg-white

  // Foreground
  fgRed: '#E32321',         // colors/navigation-bar/navigation-fg-red (active text, selector bar)
  fgDark: '#262626',        // colors/navigation-bar/navigation-fg-dark (inactive text)
  fgWhite: '#FFFFFF',       // colors/navigation-bar/navigation-fg-white (cart button text, badge text)

  // Border
  border: '#F5F5F5',        // colors/navigation-bar/navigation-border (top border)
} as const;

// ── Layout Dimensions from Figma ──
export const NAV_DIMENSIONS = {
  // Outer container: 390 x 124, VERTICAL, no padding/gap
  outerWidth: 390,
  outerHeight: 124,

  // Navbar-Mobile: 390 x 90, HORIZONTAL, center align bottom
  navbarHeight: 90,

  // Each nav item: 78 x 68
  itemWidth: 78,
  itemHeight: 68,

  // Item padding: top=0 right=4 bottom=12 left=4
  // spacing-none / spacing-sm / spacing-xl / spacing-sm
  itemPaddingTop: 0,     // spacing-none
  itemPaddingRight: 4,   // spacing-sm
  itemPaddingBottom: 12,  // spacing-xl
  itemPaddingLeft: 4,    // spacing-sm

  // Item internal gap: 10px (spacing-2lg)
  itemGap: 10,           // spacing-2lg

  // Selector bar: 70 x 4
  selectorBarWidth: 70,
  selectorBarHeight: 4,

  // Content frame: 70 x 42
  contentFrameWidth: 70,
  contentFrameHeight: 42,

  // Icon size: 24px
  iconSize: 24,

  // Badge: red circle
  badgeSize: 16,
  badgeMinWidth: 16,
  badgeFontSize: 10,
  badgePaddingX: 4,
  badgeTop: -4,
  badgeRight: 8,

  // Home Indicator: 390 x 34 container, pill 134 x 5
  homeIndicatorContainerHeight: 34,
  homeIndicatorWidth: 134,
  homeIndicatorHeight: 5,
  homeIndicatorRadius: 100,  // radius-full
  homeIndicatorColor: '#000000',

  // Cart button (add-to-cart=yes)
  cartButtonHeight: 90,
  cartButtonRadius: 8,     // radius-lg
  cartButtonPadding: 4,    // spacing-sm

  // Timer pill
  timerPillBorderWidth: 1,
  timerPillBorderColor: '#FFFFFF',
  timerPillRadius: 100,    // radius-full
  timerPillPaddingX: 8,
  timerPillPaddingY: 2,
  timerFontSize: 10,

  // Cart badge (white circle on cart button)
  cartBadgeSize: 20,
  cartBadgeTop: -4,
  cartBadgeRight: -4,
} as const;

// ── Cart Gradient ──
// Figma: rgba(248,92,42,1) → rgba(216,15,13,1) vertical
export const CART_GRADIENT = 'linear-gradient(180deg, #F85C2A 0%, #D80F0D 100%)' as const;
