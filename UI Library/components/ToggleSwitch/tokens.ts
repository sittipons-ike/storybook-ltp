// ═══════════════════════════════════════════
// Toggle Switch Design Tokens
// Source: Figma "Design Systems Web App Lotteryplus V.7.1"
// Component set: "toggle-switch" (14291:131527)
// Variants: active=true | active=false
// All values reference Foundation variables ONLY
// ═══════════════════════════════════════════

// ── From Foundation: Spacing (2-semantic) ──
export const SPACING = {
  none: 0, // spacing-none → component padding & itemSpacing
} as const;

// ── From Foundation: Border Radius (2-semantic) ──
export const RADIUS = {
  none: 0,    // radius-none → component corners
  full: 9999, // radius-full → Track & Knob (fully rounded)
} as const;

// ── From Foundation: Colors (3-component / Toggle Switch) ──
export const TOGGLE_COLORS = {
  // Track background
  track: {
    on: '#22C55E',   // colors/toggle-switch/toggle-bg-green (active=true)
    off: '#E5E5E5',  // colors/toggle-switch/toggle-bg-soft-gray (active=false)
  },

  // Knob
  knob: {
    fill: '#FFFFFF',  // colors/toggle-switch/toggle-fg-white
  },
} as const;

// ── From Foundation: Shadow (dimension/shadow/md) ──
// Same shadow tokens as Modal knob — 2× DROP_SHADOW effects
export const SHADOW = {
  // Knob shadow: dimension/shadow/md
  // Shadow 1: 0px 2px 4px -1px rgba(0,0,0,0.06)
  // Shadow 2: 0px 4px 6px -1px rgba(0,0,0,0.10)
  md: '0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
} as const;

// ── Layout Dimensions from Figma ──
export const TOGGLE_DIMENSIONS = {
  // Track: 51×31 (the pill-shaped container)
  track: {
    width: 51,
    height: 31,
  },

  // Knob: 27×27 (circular)
  knob: {
    size: 27,
  },

  // Knob positions (x coordinate within Track, y always = 2)
  knobPosition: {
    off: 2,   // x when active=false (left side)
    on: 22,   // x when active=true  (right side) → 51 - 27 - 2 = 22
    y: 2,     // y always 2px from top
  },
} as const;

// ── Animation Tokens ──
export const TOGGLE_ANIMATION = {
  // Smooth slide transition for knob movement
  duration: '0.2s',
  timingFunction: 'ease-in-out',
} as const;
