import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Tabs from './Tabs';
import type { TabItem } from './Tabs';
import {
  TABS_COLOR_SCHEMES,
  TABS_VARIANTS,
  TABS_BADGE_SIZE,
  tabsValue,
  tabsSchemeValues,
  type TabsColorScheme,
} from './tokens';
import { sysValue } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Tabs Stories — Lotteryplus Design System
//  Figma: "horizontal-tabs-underline" (14370:9654)
//         "horizontal-tabs_button" (14370:9710)
//
//  Every literal shown below is read back from the generated tokens, never typed in.
// ═══════════════════════════════════════════

const sans = 'var(--sys-type-body-md-regular-family), sans-serif';
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const caption: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--sys-color-text-tertiary-default)',
  marginBottom: 4,
  fontFamily: sans,
};

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tabs component from Figma "Design Systems Web App Lotteryplus V.7.1". ' +
          'Two visual styles: "underline" (indicator rule) and "button" (filled pill). ' +
          'The button style takes a `primary` or `secondary` colour scheme — Figma still ' +
          'spells those `red` and `black`. Supports 2-5 tabs with optional badge ' +
          'indicators. Uses the Icon component.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: TABS_VARIANTS,
      description: 'Visual style variant',
    },
    colorScheme: {
      control: 'select',
      options: TABS_COLOR_SCHEMES,
      description: 'Colour scheme (button variant only)',
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

const tabs3: TabItem[] = tabs4.slice(0, 3);
const tabs2: TabItem[] = tabs4.slice(0, 2);

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

// ── 2. Underline — Every tab selected in turn ──
export const UnderlineAllStates: Story = {
  name: 'Underline — All Selected States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 488 }}>
      {tabs5.map((tab) => (
        <div key={tab.key}>
          <div style={caption}>selected={tab.key}</div>
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
        { label: '5 tabs', items: tabs5 },
        { label: '4 tabs', items: tabs5.slice(0, 4) },
        { label: '3 tabs', items: tabs5.slice(0, 3) },
        { label: '2 tabs', items: tabs5.slice(0, 2) },
      ].map(({ label, items }) => (
        <div key={label}>
          <div style={caption}>menu={label}</div>
          <Tabs variant="underline" items={items} activeKey="lottery" />
        </div>
      ))}
    </div>
  ),
};

// ── 4. Button — Primary (Interactive) ──
export const ButtonPrimary: Story = {
  name: 'Button — Primary (Interactive)',
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ width: 358 }}>
        <Tabs
          variant="button"
          items={tabs4}
          activeKey={active}
          onChange={setActive}
          colorScheme="primary"
        />
      </div>
    );
  },
};

// ── 5. Button — Secondary (Interactive) ──
export const ButtonSecondary: Story = {
  name: 'Button — Secondary (Interactive)',
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ width: 358 }}>
        <Tabs
          variant="button"
          items={tabs4}
          activeKey={active}
          onChange={setActive}
          colorScheme="secondary"
        />
      </div>
    );
  },
};

// ── 6. Button — All selected states (Primary) ──
export const ButtonAllStatesPrimary: Story = {
  name: 'Button — All Selected States (Primary)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 358 }}>
      {tabs4.map((tab) => (
        <div key={tab.key}>
          <div style={caption}>selected={tab.key}, colorScheme=primary</div>
          <Tabs variant="button" items={tabs4} activeKey={tab.key} colorScheme="primary" />
        </div>
      ))}
    </div>
  ),
};

// ── 7. Button — All selected states (Secondary) ──
export const ButtonAllStatesSecondary: Story = {
  name: 'Button — All Selected States (Secondary)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 358 }}>
      {tabs4.map((tab) => (
        <div key={tab.key}>
          <div style={caption}>selected={tab.key}, colorScheme=secondary</div>
          <Tabs variant="button" items={tabs4} activeKey={tab.key} colorScheme="secondary" />
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
        { label: '4-tabs', items: tabs4 },
        { label: '3-tabs', items: tabs3 },
        { label: '2-tabs', items: tabs2 },
      ].map(({ label, items }) => (
        <div key={label} style={{ width: 358 }}>
          <div style={caption}>menu={label}</div>
          {TABS_COLOR_SCHEMES.map((scheme) => (
            <div key={scheme} style={{ marginTop: 8 }}>
              <Tabs variant="button" items={items} activeKey="tab1" colorScheme={scheme} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════
//  9. Token chain — Figma vs Storybook
//
//  Both columns are read from the generated tokens: the Tier 2 literal from
//  `tabsValue()`, the Tier 1 literal from `sysValue()`. A mismatch means the alias
//  stopped pointing where the table says it points — it cannot be papered over by
//  editing a string here, because there are no strings to edit.
// ═══════════════════════════════════════════
type ChainRow = {
  /** Tier 2 token, without the `--tabs-` prefix. */
  token: string;
  /** Tier 1 semantic token, without the `--sys-` prefix. `null` = fixed pixel value. */
  semantic: string | null;
  /** Where the value is authored in Figma. */
  figma: string;
};

const layoutChain: ChainRow[] = [
  { token: 'height', semantic: null, figma: 'frame height (fixed)' },
  { token: 'radius', semantic: 'radius-lg', figma: 'dimension/radius/radius-lg' },
  { token: 'radius-active', semantic: 'radius-md', figma: 'dimension/radius/radius-md' },
  { token: 'padding-x', semantic: 'spacing-2xl', figma: 'dimension/spacing/spacing-2xl' },
  { token: 'padding-y', semantic: 'spacing-lg', figma: 'dimension/spacing/spacing-lg' },
  { token: 'gap', semantic: 'spacing-lg', figma: 'dimension/spacing/spacing-lg' },
  { token: 'item-gap', semantic: 'spacing-sm', figma: 'dimension/spacing/spacing-sm' },
  { token: 'border-width', semantic: 'border-width-hairline', figma: 'dimension/border-width/1' },
  { token: 'indicator-width', semantic: 'border-width-thin', figma: 'dimension/border-width/2' },
  { token: 'badge-size', semantic: null, figma: 'icons-size 16 (fixed)' },
];

const typographyChain: ChainRow[] = [
  { token: 'typography-family', semantic: 'type-button-md-medium-family', figma: 'button/m-med/family' },
  { token: 'typography-size', semantic: 'type-button-md-medium-size', figma: 'button/m-semb/size' },
  { token: 'typography-line-height', semantic: 'type-button-md-medium-line-height', figma: 'button/m-semb/line-height' },
  { token: 'typography-weight', semantic: 'type-button-md-medium-weight', figma: 'button/m-med/weight' },
  { token: 'typography-tracking', semantic: 'type-button-md-medium-tracking', figma: 'button/m-med/tracking' },
];

const colourChain: ChainRow[] = [
  { token: 'foreground-primary', semantic: 'color-primary-default', figma: 'colors/tabs/tabs-fg-primary' },
  { token: 'foreground-secondary', semantic: 'color-secondary-default', figma: 'colors/tabs/tabs-fg-secondary' },
  { token: 'foreground-white', semantic: 'color-foreground-white', figma: 'colors/tabs/tabs-fg-white' },
  { token: 'foreground-disable', semantic: 'color-secondary-light', figma: 'colors/tabs/tabs-fg-disable' },
  { token: 'background-primary', semantic: 'color-primary-default', figma: 'colors/tabs/tabs-bg-primary' },
  { token: 'background-secondary', semantic: 'color-secondary-default', figma: 'colors/tabs/tabs-bg-secondary' },
  { token: 'background-white', semantic: 'color-background-default', figma: 'colors/tabs/tabs-bg-white' },
  { token: 'background-disable', semantic: 'color-secondary-light', figma: 'colors/tabs/tabs-bg-disable' },
  {
    token: 'separator',
    semantic: 'color-border-accent-gray-soft-light',
    figma: 'Color/Border/Border-Gray-Soft-Light',
  },
];

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--sys-color-text-tertiary-default)',
  borderBottom: '2px solid var(--sys-color-border-accent-gray-soft-light)',
};
const td: React.CSSProperties = {
  padding: '6px 12px',
  borderBottom: '1px solid var(--sys-color-background-light)',
  fontFamily: mono,
  fontSize: 11,
};

const Swatch: React.FC<{ value: string }> = ({ value }) =>
  value.startsWith('#') ? (
    <span
      style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        backgroundColor: value,
        borderRadius: 2,
        marginLeft: 6,
        verticalAlign: 'middle',
        border: '1px solid var(--sys-color-border-accent-gray-light)',
      }}
    />
  ) : null;

const ChainTable: React.FC<{ title: string; rows: ChainRow[] }> = ({ title, rows }) => (
  <>
    <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>{title}</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
      <thead>
        <tr>
          <th style={th}>Figma</th>
          <th style={th}>Tier 1 — semantic</th>
          <th style={th}>Tier 2 — component</th>
          <th style={th}>Value</th>
          <th style={th}>Match</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ token, semantic, figma }) => {
          const value = tabsValue(token);
          const expected = semantic ? sysValue(semantic) : value;
          const match = value !== '' && value === expected;
          return (
            <tr key={token}>
              <td style={{ ...td, color: 'var(--sys-color-text-tertiary-default)' }}>{figma}</td>
              <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
                {semantic ? `--sys-${semantic}` : '(fixed)'}
              </td>
              <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>{`--tabs-${token}`}</td>
              <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>
                {value || '—'}
                <Swatch value={value} />
              </td>
              <td style={{ ...td, fontSize: 14 }}>{match ? '✅' : '❌'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>
);

export const TokenVerification: Story = {
  name: '🔍 Token Chain',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 940 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Tabs token chain</h2>
      <p
        style={{
          margin: '0 0 20px',
          fontSize: 13,
          color: 'var(--sys-color-text-tertiary-default)',
        }}
      >
        Every value flows Figma → design.md → components.json (+ components/tabs.json) →
        tokens.css. The component renders the Tier 2 alias; the alias points at a Tier 1
        semantic token; that resolves to the literal. Nothing below is hand-typed — the
        Value column is read from the generated tokens and Match compares it against the
        Tier 1 literal, so the table cannot drift from what the component renders.
      </p>

      {/* Live previews */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: 24,
          background: 'var(--sys-color-background-soft-light)',
          borderRadius: 8,
          marginBottom: 32,
          border: '1px solid var(--sys-color-border-accent-gray-soft-light)',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600 }}>Live previews</div>
        <div style={{ width: 400 }}>
          <Tabs variant="underline" items={tabs5.slice(0, 4)} activeKey="lottery" />
        </div>
        {TABS_COLOR_SCHEMES.map((scheme) => (
          <div key={scheme} style={{ width: 358 }}>
            <Tabs variant="button" items={tabs4} activeKey="tab1" colorScheme={scheme} />
          </div>
        ))}
      </div>

      <ChainTable title="Layout and sizing" rows={layoutChain} />
      <ChainTable title="Typography" rows={typographyChain} />
      <ChainTable title="Colours" rows={colourChain} />

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colour schemes (button style)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
        <thead>
          <tr>
            <th style={th}>Scheme</th>
            <th style={th}>Selected background</th>
            <th style={th}>Border &amp; badge accent</th>
          </tr>
        </thead>
        <tbody>
          {TABS_COLOR_SCHEMES.map((scheme: TabsColorScheme) => {
            const v = tabsSchemeValues(scheme);
            return (
              <tr key={scheme}>
                <td style={{ ...td, fontFamily: sans, textTransform: 'capitalize' }}>{scheme}</td>
                <td style={td}>
                  {v.background}
                  <Swatch value={v.background} />
                </td>
                <td style={td}>
                  {v.accent}
                  <Swatch value={v.accent} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p style={{ fontSize: 12, color: 'var(--sys-color-text-tertiary-default)' }}>
        Badge icon renders at {TABS_BADGE_SIZE}px, read from <code>--tabs-badge-size</code>.
        Typography size and line-height are responsive: the literals above are the mobile
        mode; the desktop mode takes over from the <code>md</code> breakpoint up.
      </p>
    </div>
  ),
};

// ── 10. Color Bindings ──
export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="Tabs"
      figmaId="14370:9654"
      bindings={[
        {
          token: 'tabs-foreground-primary',
          figmaVariable: 'colors/tabs/tabs-fg-primary',
          hex: tabsValue('foreground-primary'),
          usage: 'Selected label (underline), indicator, badge',
        },
        {
          token: 'tabs-foreground-secondary',
          figmaVariable: 'colors/tabs/tabs-fg-secondary',
          hex: tabsValue('foreground-secondary'),
          usage: 'Unselected label',
        },
        {
          token: 'tabs-foreground-white',
          figmaVariable: 'colors/tabs/tabs-fg-white',
          hex: tabsValue('foreground-white'),
          usage: 'Selected label in the button style',
        },
        {
          token: 'tabs-foreground-disable',
          figmaVariable: 'colors/tabs/tabs-fg-disable',
          hex: tabsValue('foreground-disable'),
          usage: 'Bottom rule of the underline style',
        },
        {
          token: 'tabs-background-white',
          figmaVariable: 'colors/tabs/tabs-bg-white',
          hex: tabsValue('background-white'),
          usage: 'Button container surface',
        },
        {
          token: 'tabs-background-primary',
          figmaVariable: 'colors/tabs/tabs-bg-primary',
          hex: tabsValue('background-primary'),
          usage: 'Selected tab fill (primary scheme)',
        },
        {
          token: 'tabs-background-secondary',
          figmaVariable: 'colors/tabs/tabs-bg-secondary',
          hex: tabsValue('background-secondary'),
          usage: 'Selected tab fill (secondary scheme)',
        },
        {
          token: 'tabs-background-disable',
          figmaVariable: 'colors/tabs/tabs-bg-disable',
          hex: tabsValue('background-disable'),
          usage: 'Declared in Figma; not yet rendered by any state',
        },
        {
          token: 'tabs-separator',
          figmaVariable: 'Color/Border/Border-Gray-Soft-Light',
          hex: tabsValue('separator'),
          usage: 'Divider between underline tabs',
        },
      ]}
    />
  ),
};
