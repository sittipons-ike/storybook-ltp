// ═══════════════════════════════════════════
// Loading Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Component: "Loading" (14291:131477)
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing & Layout (2-semantic) ──
export const SPACING = {
  none: 0, // spacing-none
} as const;

// ── From Foundation: Border Radius (2-semantic) ──
export const RADIUS = {
  none: 0, // radius-none → component corner radius
} as const;

// ── From Foundation: Colors (3-component / Loading) ──
export const LOADING_COLORS = {
  // Track ring (background): black at 80% opacity, then 25% element opacity
  // Figma bound: colors/loading/loading-bg-black-80%
  trackFill: 'rgba(0, 0, 0, 0.8)',
  trackOpacity: 0.25, // element-level opacity

  // Spinning arc indicator
  // Figma bound: colors/loading/loading-fg-white
  arcFill: '#FFFFFF',

  // Logo (hidden by default in this variant)
  // Figma bound: Color/Foreground/FG-Primary
  logoFill: '#E32321',
} as const;

// ── Component Dimensions from Figma ──
export const LOADING_DIMENSIONS = {
  // Component size: 56x56
  componentSize: 56,

  // Inner frame: 44.8x44.8 centered (offset 5.6 from edges)
  frameSize: 44.8,
  frameOffset: 5.6, // (56 - 44.8) / 2

  // Track ring vector: ~41x41
  trackSize: 41.067,

  // Arc vector: ~20.3x20.3
  arcSize: 20.344,
} as const;

// ── Animation Tokens ──
export const LOADING_ANIMATION = {
  // Spin duration (standard loading speed)
  duration: '1s',

  // Timing function: linear for continuous smooth rotation
  timingFunction: 'linear',

  // Iteration: infinite
  iterationCount: 'infinite',
} as const;
