import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Tabs from './Tabs';
import type { TabItem } from './Tabs';
import {
  TAB_COLORS,
  TAB_DIMENSIONS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
} from './tokens';

// ═══════════════════════════════════════════
//  Tabs Stories — Lotteryplus Design System
//  Figma: "horizontal-tabs-underline" (14370:9654)
//         "horizontal-tabs_button" (14370:9710)
// ═══════════════════════════════════════════

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tabs component from Figma "Design Systems Web App Lotteryplus V.7.1". ' +
          'Two visual styles: "underline" (red bottom border) and "button" (filled pill). ' +
          'Button style supports "red" and "black" color schemes. ' +
          'Supports 2-5 tabs with optional badge indicators. Uses Icon component.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'button'],
      description: 'Visual style variant',
    },
    colorScheme: {
      control: 'select',
      options: ['red', 'black'],
      description: 'Color scheme (button variant only)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Sample data
const tabs5: TabItem[] = [
  { key: 'lottery', label: 'ลอตเตอรี่', showBadge: false },
  { key: 'nokcash', label: 'นกแคช', showBadge: true },
  { key: 'booking', label: 'จอง', showBadge: false },
  { key: 'coupon', label: 'คูปอง', showBadge: true },
  { key: 'cancel', label: 'ยกเลิก', showBadge: true },
];

const tabs4: TabItem[] = [
  { key: 'tab1', label: 'name-1', showBadge: true },
  { key: 'tab2', label: 'name-2', showBadge: true },
  { key: 'tab3', label: 'name-3', showBadge: true },
  { key: 'tab4', label: 'name-4', showBadge: true },
];

const tabs3: TabItem[] = [
  { key: 'tab1', label: 'name-1', showBadge: true },
  { key: 'tab2', label: 'name-2', showBadge: true },
  { key: 'tab3', label: 'name-3', showBadge: true },
];

const tabs2: TabItem[] = [
  { key: 'tab1', label: 'name-1', showBadge: true },
  { key: 'tab2', label: 'name-2', showBadge: true },
];

// ── 1. Underline Default (Interactive) ──
export const UnderlineDefault: Story = {
  name: 'Underline — Default',
  render: () => {
    const [active, setActive] = useState('lottery');
    return (
      <div style={{ width: 488 }}>
        <Tabs variant="underline" items={tabs5} activeKey={active} onChange={setActive} />
      </div>
    );
  },
};

// ── 2. Underline — All Selected States ──
export const UnderlineAllStates: Story = {
  name: 'Underline — All Selected States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 488 }}>
      {tabs5.map((tab) => (
        <div key={tab.key}>
          <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
            state=select-{tabs5.indexOf(tab) + 1}
          </div>
          <Tabs variant="underline" items={tabs5} activeKey={tab.key} />
        </div>
      ))}
    </div>
  ),
};

// ── 3. Underline — Tab Counts ──
export const UnderlineTabCounts: Story = {
  name: 'Underline — Tab Counts (2-5)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 488 }}>
      {[
        { label: '5 tabs', items: tabs5, active: 'lottery' },
        { label: '4 tabs', items: tabs5.slice(0, 4), active: 'lottery' },
        { label: '3 tabs', items: tabs5.slice(0, 3), active: 'lottery' },
        { label: '2 tabs', items: tabs5.slice(0, 2), active: 'lottery' },
      ].map(({ label, items, active }) => (
        <div key={label}>
          <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
            menu={label}
          </div>
          <Tabs variant="underline" items={items} activeKey={active} />
        </div>
      ))}
    </div>
  ),
};

// ── 4. Button — Red (Interactive) ──
export const ButtonRed: Story = {
  name: 'Button — Red (Interactive)',
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ width: 358 }}>
        <Tabs variant="button" items={tabs4} activeKey={active} onChange={setActive} colorScheme="red" />
      </div>
    );
  },
};

// ── 5. Button — Black (Interactive) ──
export const ButtonBlack: Story = {
  name: 'Button — Black (Interactive)',
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ width: 358 }}>
        <Tabs variant="button" items={tabs4} activeKey={active} onChange={setActive} colorScheme="black" />
      </div>
    );
  },
};

// ── 6. Button — All States (Red) ──
export const ButtonAllStatesRed: Story = {
  name: 'Button — All States (Red)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 358 }}>
      {tabs4.map((tab) => (
        <div key={tab.key}>
          <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
            status={tab.key}, colors=red
          </div>
          <Tabs variant="button" items={tabs4} activeKey={tab.key} colorScheme="red" />
        </div>
      ))}
    </div>
  ),
};

// ── 7. Button — All States (Black) ──
export const ButtonAllStatesBlack: Story = {
  name: 'Button — All States (Black)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 358 }}>
      {tabs4.map((tab) => (
        <div key={tab.key}>
          <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
            status={tab.key}, colors=black
          </div>
          <Tabs variant="button" items={tabs4} activeKey={tab.key} colorScheme="black" />
        </div>
      ))}
    </div>
  ),
};

// ── 8. Button — Tab Counts ──
export const ButtonTabCounts: Story = {
  name: 'Button — Tab Counts (2-4)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { label: '4-tabs', items: tabs4, w: 358 },
        { label: '3-tabs', items: tabs3, w: 358 },
        { label: '2-tabs', items: tabs2, w: 358 },
      ].map(({ label, items, w }) => (
        <div key={label}>
          <div style={{ fontSize: 11, color: '#999', marginBottom: 4, fontFamily: "'Graphik TH', sans-serif" }}>
            menu={label}, colors=red
          </div>
          <div style={{ width: w }}>
            <Tabs variant="button" items={items} activeKey="tab1" colorScheme="red" />
          </div>
          <div style={{ marginTop: 8, width: w }}>
            <Tabs variant="button" items={items} activeKey="tab1" colorScheme="black" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── 9. Token Verification ──
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    const tokenRows = [
      {
        section: 'Underline Style — Layout',
        tokens: [
          { token: 'Tab height', figmaVar: 'N/A (fixed)', value: `${TAB_DIMENSIONS.underline.height}px`, actual: '40px' },
          { token: 'Padding top/bottom (spacing-lg)', figmaVar: 'dimension/spacing/spacing-lg', value: `${TAB_DIMENSIONS.underline.paddingTop}px`, actual: '8px' },
          { token: 'Padding left/right', figmaVar: 'N/A (16px)', value: `${TAB_DIMENSIONS.underline.paddingRight}px`, actual: '16px' },
          { token: 'Internal gap (spacing-lg)', figmaVar: 'dimension/spacing/spacing-lg', value: `${TAB_DIMENSIONS.underline.gap}px`, actual: '8px' },
          { token: 'Bottom border width', figmaVar: 'dimension/border-width/1', value: `${TAB_DIMENSIONS.underline.bottomBorderWidth}px`, actual: '1px' },
          { token: 'Selected underline width', figmaVar: 'N/A (2px)', value: `${TAB_DIMENSIONS.underline.selectedBorderWidth}px`, actual: '2px' },
        ],
      },
      {
        section: 'Button Style — Layout',
        tokens: [
          { token: 'Container height', figmaVar: 'N/A (fixed)', value: `${TAB_DIMENSIONS.button.height}px`, actual: '40px' },
          { token: 'Container radius (radius-lg)', figmaVar: 'dimension/breakpoint/radius/radius-lg', value: `${TAB_DIMENSIONS.button.outerRadius}px`, actual: '8px' },
          { token: 'Container border (border-width/1)', figmaVar: 'dimension/border-width/1', value: `${TAB_DIMENSIONS.button.outerBorderWidth}px`, actual: '1px' },
          { token: 'Tab item gap (spacing-sm)', figmaVar: 'dimension/spacing/spacing-sm', value: `${TAB_DIMENSIONS.button.itemGap}px`, actual: '4px' },
          { token: 'Item padding TB (spacing-lg)', figmaVar: 'dimension/spacing/spacing-lg', value: `${TAB_DIMENSIONS.button.item.paddingTop}px`, actual: '8px' },
          { token: 'Item padding LR (spacing-2xl)', figmaVar: 'dimension/spacing/spacing-2xl', value: `${TAB_DIMENSIONS.button.item.paddingRight}px`, actual: '16px' },
          { token: 'Active item radius (radius-md)', figmaVar: 'N/A (6px)', value: `${TAB_DIMENSIONS.button.item.activeRadius}px`, actual: '6px' },
        ],
      },
      {
        section: 'Colors',
        tokens: [
          { token: 'Selected text (tabs-fg-primary)', figmaVar: 'colors/tabs/tabs-fg-primary', value: TAB_COLORS.text.primary, actual: '#E32321' },
          { token: 'Unselected text (tabs-fg-secondary)', figmaVar: 'colors/tabs/tabs-fg-secondary', value: TAB_COLORS.text.secondary, actual: '#262626' },
          { token: 'Active text white (tabs-fg-white)', figmaVar: 'colors/tabs/tabs-fg-white', value: TAB_COLORS.text.white, actual: '#FFFFFF' },
          { token: 'Bottom border (tabs-fg-disable)', figmaVar: 'colors/tabs/tabs-fg-disable', value: TAB_COLORS.text.disable, actual: '#C9C9C9' },
          { token: 'Active bg red (tabs-bg-primary)', figmaVar: 'colors/tabs/tabs-bg-primary', value: TAB_COLORS.bg.primary, actual: '#E32321' },
          { token: 'Active bg black (tabs-bg-secondary)', figmaVar: 'colors/tabs/tabs-bg-secondary', value: TAB_COLORS.bg.secondary, actual: '#262626' },
          { token: 'Container bg (tabs-bg-white)', figmaVar: 'colors/tabs/tabs-bg-white', value: TAB_COLORS.bg.white, actual: '#FFFFFF' },
          { token: 'Separator (Border-Disable)', figmaVar: 'Color/Border/Border-Disable', value: TAB_COLORS.border.disable, actual: '#E5E5E5' },
        ],
      },
      {
        section: 'Typography',
        tokens: [
          { token: 'Font size (button/m-semb/size)', figmaVar: 'button/m-semb/size', value: `${TYPOGRAPHY.tab.fontSize}px`, actual: '14px' },
          { token: 'Font weight (button/m-med)', figmaVar: 'button/m-med/weight', value: `${TYPOGRAPHY.tab.fontWeight}`, actual: '500' },
          { token: 'Line height (button/m-semb)', figmaVar: 'button/m-semb/line-height', value: TYPOGRAPHY.tab.lineHeight, actual: '22px' },
          { token: 'Badge icon size', figmaVar: 'N/A (icons-size 16)', value: `${TAB_DIMENSIONS.badgeSize}px`, actual: '16px' },
        ],
      },
    ];

    return (
      <div style={{ padding: 32, maxWidth: 750, fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Tabs Token Verification</h2>
        <p style={{ fontSize: 14, color: '#999', marginBottom: 8 }}>
          Comparing Figma component values vs Storybook token values with bound variable names
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Figma: &quot;horizontal-tabs-underline&quot; (14370:9654) &amp; &quot;horizontal-tabs_button&quot; (14370:9710)
        </p>

        {/* Live previews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, background: '#F9F9F9', borderRadius: 8, marginBottom: 32, border: '1px solid #E5E5E5' }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Live Previews</div>
          <div style={{ width: 400 }}>
            <Tabs variant="underline" items={tabs5.slice(0, 4)} activeKey="lottery" />
          </div>
          <div style={{ width: 358 }}>
            <Tabs variant="button" items={tabs4} activeKey="tab1" colorScheme="red" />
          </div>
          <div style={{ width: 358 }}>
            <Tabs variant="button" items={tabs4} activeKey="tab1" colorScheme="black" />
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
