import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import {
  NAVIGATION_KEYS,
  NAVIGATION_STATES,
  navigationColorTokens,
  navigationColorValues,
  navigationValue,
  sys,
  sysValue,
} from './tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  NavigationBar Stories — Lotteryplus Design System
//  Figma: "navigation-bar-v2" (14291:135864)
//  10 variants: 5 selected states x 2 add-to-cart modes
//
//  Values shown here are read from foundations/tokens.generated.ts, which is generated
//  from Figma. Nothing on this page is typed by hand, so a table can never claim a value
//  the component does not actually render.
// ═══════════════════════════════════════════

const sans = sys('type-button-xs-medium-family');
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** Neutral stage behind the bar, so the white surface reads as a surface. */
const stage: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: sys('spacing-4xl'),
  padding: sys('spacing-4xl'),
  background: sys('color-background-light'),
  borderRadius: sys('radius-xl'),
  fontFamily: sans,
};

const caption: React.CSSProperties = {
  fontFamily: sans,
  fontSize: sys('type-caption-md-regular-size'),
  color: sys('color-text-tertiary-default'),
  marginBottom: sys('spacing-sm'),
};

const sectionTitle: React.CSSProperties = {
  fontFamily: sans,
  fontSize: sys('type-label-md-semibold-size'),
  fontWeight: 600,
};

const meta: Meta<typeof NavigationBar> = {
  title: 'Organisms/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Bottom navigation bar from Figma "Design Systems Web App Lotteryplus V.7.1". ' +
          'Component set: "navigation-bar-v2" (14291:135864). ' +
          '10 variants: 5 selected keys (home, order, cart, safe, profile) x 2 add-to-cart modes (no/yes). ' +
          'Features icon + label tabs, a selector bar on the selected tab, notification badges, and a ' +
          'gradient cart button with countdown timer in add-to-cart mode. Uses the Icon component. ' +
          'Every style value is a `--navigation-*` custom property generated from Figma.',
      },
    },
  },
  argTypes: {
    selectedKey: {
      control: 'select',
      options: NAVIGATION_KEYS,
      description: 'Canonical `selected` state — which top-level area is current',
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
      description: 'Container width (defaults to the --navigation-width token)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

// ── 1. Default (Home selected, interactive) ──
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const [selected, setSelected] = useState(args.selectedKey || 'home');
    return (
      <div style={stage}>
        <div style={caption}>Tap to switch tabs (interactive)</div>
        <NavigationBar
          {...args}
          selectedKey={selected}
          onItemClick={(key) => setSelected(key)}
        />
      </div>
    );
  },
  args: {
    selectedKey: 'home',
  },
};

// ── 2. All Selected Keys (the 5 states of the Figma `state` axis) ──
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={stage}>
      <div style={sectionTitle}>All 5 selected keys (add-to-cart=no)</div>
      {NAVIGATION_KEYS.map((key) => (
        <div key={key}>
          <div style={caption}>selected={key}</div>
          <NavigationBar selectedKey={key} />
        </div>
      ))}
    </div>
  ),
};

// ── 3. With Add-to-Cart (cart mode with timer) ──
export const WithAddToCart: Story = {
  name: 'With Add-to-Cart',
  render: () => (
    <div style={stage}>
      <div style={sectionTitle}>Add-to-cart mode (add-to-cart=yes)</div>
      {NAVIGATION_KEYS.map((key) => (
        <div key={key}>
          <div style={caption}>selected={key}, add-to-cart=yes</div>
          <NavigationBar
            selectedKey={key}
            showAddToCart
            cartTimer="00:14:59"
            cartBadgeCount={3}
          />
        </div>
      ))}
    </div>
  ),
};

// ── 4. With Badges ──
export const WithBadges: Story = {
  name: 'With Badges',
  render: () => (
    <div style={stage}>
      <div style={sectionTitle}>Badge variations</div>

      <div>
        <div style={caption}>Order badge, safe badge=2 (normal mode)</div>
        <NavigationBar selectedKey="home" showOrderBadge safeBadgeCount={2} />
      </div>

      <div>
        <div style={caption}>All badges: order, cart=3, safe=12</div>
        <NavigationBar
          selectedKey="home"
          showOrderBadge
          cartBadgeCount={3}
          safeBadgeCount={12}
        />
      </div>

      <div>
        <div style={caption}>Add-to-cart mode with order, cart badge=3, safe=2</div>
        <NavigationBar
          selectedKey="home"
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

// ── 5. Disabled item (canonical `disabled` state) ──
export const DisabledItem: Story = {
  name: 'Disabled Item',
  render: () => (
    <div style={stage}>
      <div style={sectionTitle}>Canonical `disabled` state on one item</div>
      <div style={caption}>
        The safe tab is disabled — it takes --navigation-foreground-disable and stops
        responding to hover, focus and click.
      </div>
      <NavigationBar
        selectedKey="home"
        items={[
          { key: 'home', label: 'หน้าแรก', icon: 'outline-Home', filledIcon: 'filled-Home' },
          { key: 'order', label: 'คำสั่งซื้อ', icon: 'outline-order', filledIcon: 'filled-order' },
          {
            key: 'cart',
            label: 'ตะกร้า',
            icon: 'outline-cart',
            // outline in both states, like every Figma variant — see NavigationBar.tsx
            filledIcon: 'outline-cart',
            cartLabel: 'ไปที่ตะกร้า',
          },
          {
            key: 'safe',
            label: 'ตู้เซฟ',
            icon: 'outline-safe',
            filledIcon: 'filled-safe',
            disabled: true,
          },
          { key: 'profile', label: 'สมาชิก', icon: 'outline-member', filledIcon: 'filled-member' },
        ]}
      />
    </div>
  ),
};

// ── 6. Token Chain ──
//
// Every row reads its value through navigationValue() / sysValue(), so the table cannot
// drift from what the component renders.
export const TokenChain: StoryObj = {
  name: '🔍 Token Chain',
  render: () => {
    type Row = [component: string, semantic: string];

    const groups: Array<{ title: string; rows: Row[] }> = [
      {
        title: 'Shell',
        rows: [
          ['width', '(fixed)'],
          ['height', '(fixed)'],
          ['bar-height', '(fixed)'],
          ['border-width', '--sys-border-width-hairline'],
        ],
      },
      {
        title: 'Nav item',
        rows: [
          ['item-height', '(fixed)'],
          ['item-padding-top', '--sys-spacing-none'],
          ['item-padding-x', '--sys-spacing-sm'],
          ['item-padding-bottom', '--sys-spacing-xl'],
          ['item-gap', '--sys-spacing-none'],
          ['selector-width', '(fixed)'],
          ['selector-height', '(fixed)'],
          ['selector-radius', '--sys-radius-xs'],
          ['content-width', '(fixed)'],
          ['content-height', '(fixed)'],
          ['content-offset', '--sys-spacing-2lg'],
          ['icon-size', '(fixed)'],
        ],
      },
      {
        title: 'Badges',
        rows: [
          ['order-badge-icon-size', '(fixed)'],
          ['order-badge-offset-top', '(fixed)'],
          ['order-badge-offset-right', '(fixed)'],
          ['badge-size', '(fixed)'],
          ['badge-radius', '--sys-radius-full'],
          ['badge-border-width', '(storybook-local — Figma strokes 1.5px)'],
          ['badge-line-height', '(storybook-local — unitless)'],
          ['badge-offset-top', '(fixed)'],
          ['badge-offset-right', '(fixed)'],
        ],
      },
      {
        title: 'Cart button & timer',
        rows: [
          ['cart-height', '(fixed)'],
          ['cart-radius', '--sys-radius-lg'],
          ['cart-padding', '--sys-spacing-sm'],
          ['cart-padding-bottom', '--sys-spacing-none'],
          ['cart-gap', '--sys-spacing-xs'],
          ['cart-gradient', '(storybook-local — raw Figma gradient fill)'],
          ['cart-badge-offset-top', '(fixed)'],
          ['cart-badge-offset-right', '(fixed)'],
          ['timer-border-width', '--sys-border-width-hairline'],
          ['timer-radius', '--sys-radius-full'],
          ['timer-padding-x', '--sys-spacing-lg'],
          ['timer-padding-y', '--sys-spacing-xs'],
          ['timer-line-height', '(storybook-local — unitless)'],
        ],
      },
      {
        title: 'Home indicator',
        rows: [
          ['home-indicator-container-height', '(fixed)'],
          ['home-indicator-padding-bottom', '--sys-spacing-lg'],
          ['home-indicator-width', '(fixed)'],
          ['home-indicator-height', '(fixed)'],
          ['home-indicator-radius', '--sys-radius-full'],
          ['foreground-home-indicator', '--sys-color-foreground-black'],
        ],
      },
      {
        title: 'Typography — typography/button/xs/medium',
        rows: [
          ['typography-family', '--sys-type-button-xs-medium-family'],
          ['typography-size', '--sys-type-button-xs-medium-size'],
          ['typography-weight', '--sys-type-button-xs-medium-weight'],
          ['typography-line-height', '--sys-type-button-xs-medium-line-height'],
          ['typography-tracking', '--sys-type-button-xs-medium-tracking'],
        ],
      },
    ];

    const th: React.CSSProperties = {
      textAlign: 'left',
      padding: `${sysValue('spacing-lg')} ${sysValue('spacing-xl')}`,
      fontSize: sys('type-caption-md-regular-size'),
      fontWeight: 600,
      color: sys('color-text-tertiary-default'),
      borderBottom: `${sys('border-width-thin')} solid ${sys('color-border-accent-gray-soft-light')}`,
    };
    const td: React.CSSProperties = {
      padding: `${sysValue('spacing-md')} ${sysValue('spacing-xl')}`,
      borderBottom: `${sys('border-width-hairline')} solid ${sys('color-background-light')}`,
      fontFamily: mono,
      fontSize: sys('type-caption-md-regular-size'),
    };

    return (
      <div style={{ fontFamily: sans, maxWidth: 900, padding: sys('spacing-5xl') }}>
        <h2 style={{ margin: 0, fontSize: sys('type-heading-h3-semibold-size') }}>
          NavigationBar token chain
        </h2>
        <p
          style={{
            margin: `${sysValue('spacing-lg')} 0 ${sysValue('spacing-4xl')}`,
            fontSize: sys('type-sub-title-md-regular-size'),
            color: sys('color-text-tertiary-default'),
          }}
        >
          Every value flows Figma → design.md + components/navigation-bar.json →
          components.json → tokens.css. The component renders the Tier 2 alias; the alias
          points at a Tier 1 semantic token; that resolves to the literal. Nothing below is
          hand-typed.
        </p>

        {/* Live previews — the same tokens, rendered */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: sys('spacing-2xl'),
            padding: sys('spacing-4xl'),
            background: sys('color-background-soft-light'),
            borderRadius: sys('radius-lg'),
            marginBottom: sys('spacing-5xl'),
            border: `${sys('border-width-hairline')} solid ${sys('color-border-accent-gray-soft-light')}`,
          }}
        >
          <div style={sectionTitle}>Live previews</div>
          <div>
            <div style={caption}>selected=home, add-to-cart=no</div>
            <NavigationBar selectedKey="home" />
          </div>
          <div>
            <div style={caption}>selected=home, add-to-cart=yes, badges</div>
            <NavigationBar
              selectedKey="home"
              showAddToCart
              cartTimer="00:14:59"
              cartBadgeCount={3}
              showOrderBadge
              safeBadgeCount={2}
            />
          </div>
        </div>

        {groups.map(({ title, rows }) => (
          <div key={title} style={{ marginBottom: sysValue('spacing-5xl') }}>
            <h3 style={{ fontSize: sysValue('type-body-md-semibold-size'), margin: `0 0 ${sysValue('spacing-lg')}` }}>
              {title}
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Tier 2 — component</th>
                  <th style={th}>Tier 1 — semantic</th>
                  <th style={th}>Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([token, semantic]) => (
                  <tr key={token}>
                    <td style={{ ...td, color: sys('color-primary-default') }}>
                      {`--navigation-${token}`}
                    </td>
                    <td style={{ ...td, color: sys('color-status-info-default') }}>{semantic}</td>
                    <td style={{ ...td, color: sys('color-status-success-dark') }}>
                      {navigationValue(token)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <h3 style={{ fontSize: sysValue('type-body-md-semibold-size'), margin: `0 0 ${sysValue('spacing-lg')}` }}>
          Colours by state
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>State</th>
              <th style={th}>Label</th>
              <th style={th}>Icon</th>
              <th style={th}>Selector bar</th>
            </tr>
          </thead>
          <tbody>
            {NAVIGATION_STATES.map((state) => {
              const tokens = navigationColorTokens(state);
              const values = navigationColorValues(state);
              return (
                <tr key={state}>
                  <td style={{ ...td, color: sys('color-primary-default') }}>{state}</td>
                  {(['foreground', 'icon', 'selector'] as const).map((slot) => (
                    <td key={slot} style={td}>
                      <span style={{ color: sys('color-status-info-default') }}>
                        {`--navigation-${tokens[slot]}`}
                      </span>
                      <br />
                      <span style={{ color: sys('color-status-success-dark') }}>{values[slot]}</span>
                      <span
                        style={{
                          display: 'inline-block',
                          width: sys('spacing-xl'),
                          height: sys('spacing-xl'),
                          backgroundColor: values[slot],
                          borderRadius: sys('radius-xs'),
                          marginLeft: sys('spacing-md'),
                          verticalAlign: 'middle',
                          border: `${sys('border-width-hairline')} solid ${sys('color-border-accent-gray-soft-light')}`,
                        }}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
};

// ── 7. Color Bindings ──
export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="NavigationBar"
      figmaId="14291:135864"
      bindings={[
        {
          token: '--navigation-background-white',
          figmaVariable: 'colors/navigation-bar/navigation-bg-white',
          hex: navigationValue('background-white'),
          usage: 'Nav bar background, unselected selector bar, badge disc',
        },
        {
          token: '--navigation-foreground-red',
          figmaVariable: 'colors/navigation-bar/navigation-fg-red',
          hex: navigationValue('foreground-red'),
          usage: 'Selected label & icon, selector bar, badge ring and numeral',
        },
        {
          token: '--navigation-foreground-dark',
          figmaVariable: 'colors/navigation-bar/navigation-fg-dark',
          hex: navigationValue('foreground-dark'),
          usage: 'Unselected label',
        },
        {
          token: '--navigation-foreground-gray',
          figmaVariable: 'colors/navigation-bar/navigation-fg-gray',
          hex: navigationValue('foreground-gray'),
          usage: 'Unselected icon',
        },
        {
          token: '--navigation-foreground-disable',
          figmaVariable: 'colors/navigation-bar/navigation-fg-disable',
          hex: navigationValue('foreground-disable'),
          usage: 'Disabled label & icon',
        },
        {
          token: '--navigation-foreground-white',
          figmaVariable: 'colors/navigation-bar/navigation-fg-white',
          hex: navigationValue('foreground-white'),
          usage: 'Cart button label, cart icon, timer pill border and text',
        },
        {
          token: '--navigation-border',
          figmaVariable: 'colors/navigation-bar/navigation-border',
          hex: navigationValue('border'),
          usage: 'Top border of the bar',
        },
        {
          token: '--navigation-foreground-home-indicator',
          figmaVariable: '(none — mapped to foreground/fg-black)',
          hex: navigationValue('foreground-home-indicator'),
          usage: 'Home indicator pill',
        },
        {
          token: '--navigation-cart-gradient',
          figmaVariable: '(none — raw gradient fill on the add-to-cart button)',
          hex: navigationValue('cart-gradient'),
          usage: 'Cart button background',
        },
      ]}
    />
  ),
};
