import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import type { NavItem } from './NavigationBar';
import {
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  TYPOGRAPHY,
  NAV_COLORS,
  NAV_DIMENSIONS,
  CART_GRADIENT,
} from './tokens';

// ═══════════════════════════════════════════
//  NavigationBar Stories — Lotteryplus Design System
//  Figma: "navigation-bar-v2" (14291:135864)
//  10 variants: 5 states x 2 add-to-cart modes
// ═══════════════════════════════════════════

const meta: Meta<typeof NavigationBar> = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Bottom navigation bar from Figma "Design Systems Web App Lotteryplus V.7.1". ' +
          'Component set: "navigation-bar-v2" (14291:135864). ' +
          '10 variants: 5 active states (home, order, cart, safe, profile) x 2 add-to-cart modes (no/yes). ' +
          'Features icon + label tabs, active selector bar, notification badges, and a special ' +
          'gradient cart button with countdown timer in add-to-cart mode. Uses Icon component.',
      },
    },
  },
  argTypes: {
    activeKey: {
      control: 'select',
      options: ['home', 'order', 'cart', 'safe', 'profile'],
      description: 'Active navigation tab key',
    },
    showAddToCart: {
      control: 'boolean',
      description: 'Enable add-to-cart mode with gradient cart button',
    },
    cartTimer: {
      control: 'text',
      description: 'Timer text displayed in cart button (add-to-cart mode)',
    },
    cartBadgeCount: {
      control: 'number',
      description: 'Badge count on cart item',
    },
    showOrderBadge: {
      control: 'boolean',
      description: 'Show order notification badge (filled-Error-2)',
    },
    safeBadgeCount: {
      control: 'number',
      description: 'Badge count on safe item',
    },
    width: {
      control: { type: 'number', min: 320, max: 430, step: 1 },
      description: 'Container width (default 390px mobile)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

// ── 1. Default (Home Active, Interactive) ──
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const [active, setActive] = useState(args.activeKey || 'home');
    return (
      <div style={{ background: '#F0F0F0', padding: 24, borderRadius: 12 }}>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 8, fontFamily: "'Graphik TH', sans-serif" }}>
          Tap to switch tabs (interactive)
        </div>
        <NavigationBar
          {...args}
          activeKey={active}
          onItemClick={(key) => setActive(key)}
        />
      </div>
    );
  },
  args: {
    activeKey: 'home',
    width: 390,
  },
};

// ── 2. All States (show all 5 active states) ──
export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const states = ['home', 'order', 'cart', 'safe', 'profile'];
    const labels = [
      'state=home',
      'state=order',
      'state=cart (not)',
      'state=safe',
      'state=profile',
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, background: '#F0F0F0', borderRadius: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Graphik TH', sans-serif" }}>
          All 5 Active States (add-to-cart=no)
        </div>
        {states.map((state, i) => (
          <div key={state}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
              {labels[i]}
            </div>
            <NavigationBar activeKey={state} />
          </div>
        ))}
      </div>
    );
  },
};

// ── 3. With Add-to-Cart (cart mode with timer) ──
export const WithAddToCart: Story = {
  name: 'With Add-to-Cart',
  render: () => {
    const states = ['home', 'order', 'cart', 'safe', 'profile'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, background: '#F0F0F0', borderRadius: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Graphik TH', sans-serif" }}>
          Add-to-Cart Mode (add-to-cart=yes)
        </div>
        {states.map((state) => (
          <div key={state}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
              state={state}, add-to-cart=yes
            </div>
            <NavigationBar
              activeKey={state}
              showAddToCart
              cartTimer="00:14:59"
              cartBadgeCount={3}
            />
          </div>
        ))}
      </div>
    );
  },
};

// ── 4. With Badges (showing notification badges) ──
export const WithBadges: Story = {
  name: 'With Badges',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, background: '#F0F0F0', borderRadius: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Graphik TH', sans-serif" }}>
        Badge Variations
      </div>

      <div>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
          Order badge=1, Safe badge=2 (normal mode)
        </div>
        <NavigationBar
          activeKey="home"
          showOrderBadge
          safeBadgeCount={2}
        />
      </div>

      <div>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
          All badges: order=5, cart=3, safe=12
        </div>
        <NavigationBar
          activeKey="home"
          showOrderBadge
          cartBadgeCount={3}
          safeBadgeCount={12}
        />
      </div>

      <div>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
          Add-to-cart mode with order=1, cart badge=3, safe=2
        </div>
        <NavigationBar
          activeKey="home"
          showAddToCart
          cartTimer="00:14:59"
          showOrderBadge
          cartBadgeCount={3}
          safeBadgeCount={2}
        />
      </div>
    </div>
  ),
};

// ── 5. Token Verification ──
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    const tokenRows = [
      {
        section: 'Spacing & Padding',
        tokens: [
          { token: 'Item padding top (spacing-none)', figmaVar: 'dimension/spacing/spacing-none', value: `${SPACING.none}px`, actual: '0px' },
          { token: 'Item padding right/left (spacing-sm)', figmaVar: 'dimension/spacing/spacing-sm', value: `${SPACING.sm}px`, actual: '4px' },
          { token: 'Item padding bottom (spacing-xl)', figmaVar: 'dimension/spacing/spacing-xl', value: `${SPACING.xl}px`, actual: '12px' },
          { token: 'Item internal gap (spacing-2lg)', figmaVar: 'dimension/spacing/spacing-2lg', value: `${SPACING['2lg']}px`, actual: '10px' },
          { token: 'Cart button padding (spacing-sm)', figmaVar: 'dimension/spacing/spacing-sm', value: `${NAV_DIMENSIONS.cartButtonPadding}px`, actual: '4px' },
        ],
      },
      {
        section: 'Border Radius',
        tokens: [
          { token: 'Cart button radius (radius-lg)', figmaVar: 'dimension/breakpoint/radius/radius-lg', value: `${RADIUS.lg}px`, actual: '8px' },
          { token: 'Badge radius (radius-full)', figmaVar: 'dimension/breakpoint/radius/radius-full', value: `${RADIUS.full}px`, actual: '100px' },
          { token: 'Home indicator radius', figmaVar: 'dimension/breakpoint/radius/radius-full', value: `${NAV_DIMENSIONS.homeIndicatorRadius}px`, actual: '100px' },
          { token: 'Timer pill radius', figmaVar: 'dimension/breakpoint/radius/radius-full', value: `${NAV_DIMENSIONS.timerPillRadius}px`, actual: '100px' },
        ],
      },
      {
        section: 'Border Width',
        tokens: [
          { token: 'Top border (border-width/1)', figmaVar: 'dimension/border-width/1', value: `${BORDER_WIDTH[1]}px`, actual: '1px' },
          { token: 'Timer pill border', figmaVar: 'dimension/border-width/1', value: `${NAV_DIMENSIONS.timerPillBorderWidth}px`, actual: '1px' },
        ],
      },
      {
        section: 'Dimensions',
        tokens: [
          { token: 'Outer width', figmaVar: 'N/A (390px default)', value: `${NAV_DIMENSIONS.outerWidth}px`, actual: '390px' },
          { token: 'Outer height', figmaVar: 'N/A (fixed)', value: `${NAV_DIMENSIONS.outerHeight}px`, actual: '124px' },
          { token: 'Navbar height', figmaVar: 'N/A (fixed)', value: `${NAV_DIMENSIONS.navbarHeight}px`, actual: '90px' },
          { token: 'Item width', figmaVar: 'N/A (78px)', value: `${NAV_DIMENSIONS.itemWidth}px`, actual: '78px' },
          { token: 'Item height', figmaVar: 'N/A (68px)', value: `${NAV_DIMENSIONS.itemHeight}px`, actual: '68px' },
          { token: 'Selector bar width', figmaVar: 'N/A (70px)', value: `${NAV_DIMENSIONS.selectorBarWidth}px`, actual: '70px' },
          { token: 'Selector bar height', figmaVar: 'N/A (4px)', value: `${NAV_DIMENSIONS.selectorBarHeight}px`, actual: '4px' },
          { token: 'Icon size', figmaVar: 'icons-size/24', value: `${NAV_DIMENSIONS.iconSize}px`, actual: '24px' },
          { token: 'Home indicator: 134 x 5', figmaVar: 'N/A (fixed)', value: `${NAV_DIMENSIONS.homeIndicatorWidth}x${NAV_DIMENSIONS.homeIndicatorHeight}px`, actual: '134x5px' },
          { token: 'Cart button height', figmaVar: 'N/A (90px)', value: `${NAV_DIMENSIONS.cartButtonHeight}px`, actual: '90px' },
        ],
      },
      {
        section: 'Colors',
        tokens: [
          { token: 'Background (navigation-bg-white)', figmaVar: 'colors/navigation-bar/navigation-bg-white', value: NAV_COLORS.bgWhite, actual: '#FFFFFF' },
          { token: 'Active text/selector (navigation-fg-red)', figmaVar: 'colors/navigation-bar/navigation-fg-red', value: NAV_COLORS.fgRed, actual: '#E32321' },
          { token: 'Inactive text (navigation-fg-dark)', figmaVar: 'colors/navigation-bar/navigation-fg-dark', value: NAV_COLORS.fgDark, actual: '#262626' },
          { token: 'White text (navigation-fg-white)', figmaVar: 'colors/navigation-bar/navigation-fg-white', value: NAV_COLORS.fgWhite, actual: '#FFFFFF' },
          { token: 'Top border (navigation-border)', figmaVar: 'colors/navigation-bar/navigation-border', value: NAV_COLORS.border, actual: '#F5F5F5' },
        ],
      },
      {
        section: 'Cart Gradient',
        tokens: [
          { token: 'Cart gradient', figmaVar: 'N/A (rgba(248,92,42,1) -> rgba(216,15,13,1))', value: CART_GRADIENT, actual: 'linear-gradient(180deg, #F85C2A 0%, #D80F0D 100%)' },
        ],
      },
      {
        section: 'Typography',
        tokens: [
          { token: 'Font family', figmaVar: 'button/xs-med/font-family', value: TYPOGRAPHY.fontFamily, actual: "'Graphik TH', sans-serif" },
          { token: 'Font size (button/xs-med/size)', figmaVar: 'button/xs-med/size', value: `${TYPOGRAPHY.fontSize}px`, actual: '10px' },
          { token: 'Font weight (button/xs-med/weight)', figmaVar: 'button/xs-med/weight', value: `${TYPOGRAPHY.fontWeight}`, actual: '500' },
          { token: 'Line height (button/xs-med/line-height)', figmaVar: 'button/xs-med/line-height', value: TYPOGRAPHY.lineHeight, actual: '18px' },
        ],
      },
    ];

    return (
      <div style={{ padding: 32, maxWidth: 800, fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>NavigationBar Token Verification</h2>
        <p style={{ fontSize: 14, color: '#999', marginBottom: 8 }}>
          Comparing Figma component values vs Storybook token values with bound variable names
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Figma: &quot;navigation-bar-v2&quot; (14291:135864)
        </p>

        {/* Live previews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, background: '#F9F9F9', borderRadius: 8, marginBottom: 32, border: '1px solid #E5E5E5' }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Live Previews</div>
          <div>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>state=home, add-to-cart=no</div>
            <NavigationBar activeKey="home" />
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>state=home, add-to-cart=yes, badges</div>
            <NavigationBar
              activeKey="home"
              showAddToCart
              cartTimer="00:14:59"
              cartBadgeCount={3}
              showOrderBadge
              safeBadgeCount={2}
            />
          </div>
        </div>

        {tokenRows.map(({ section, tokens }) => (
          <div key={section} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#E32321', marginBottom: 12, borderBottom: '2px solid #E32321', paddingBottom: 4 }}>
              {section}
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Token', 'Figma Variable', 'Value', 'Match'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid #DDD', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tokens.map(({ token, figmaVar, value, actual }) => {
                  const match = value === actual;
                  return (
                    <tr key={token}>
                      <td style={{ padding: '6px 12px', borderBottom: '1px solid #EEE' }}>{token}</td>
                      <td style={{ padding: '6px 12px', borderBottom: '1px solid #EEE', color: '#8B8BF5', fontSize: 11, fontFamily: 'monospace' }}>{figmaVar}</td>
                      <td style={{ padding: '6px 12px', borderBottom: '1px solid #EEE', color: '#22C55E', fontFamily: 'monospace' }}>
                        {value}
                        {value.startsWith('#') && (
                          <span style={{ display: 'inline-block', width: 12, height: 12, backgroundColor: value, borderRadius: 2, marginLeft: 6, verticalAlign: 'middle', border: '1px solid rgba(0,0,0,0.1)' }} />
                        )}
                      </td>
                      <td style={{ padding: '6px 12px', borderBottom: '1px solid #EEE', fontSize: 16 }}>{match ? '✅' : '❌'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  },
};
