import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import type { BreadcrumbItem } from './Breadcrumb';
import {
  BREADCRUMB_BASE_VALUES,
  BREADCRUMB_ICON_SIZE_VALUE,
  BREADCRUMB_RENDERED_STATES,
  BREADCRUMB_SEPARATOR_COLOR_VALUE,
  BREADCRUMB_STATES,
  breadcrumbColorValues,
  breadcrumbFontWeightValue,
  breadcrumbTokenNames,
  breadcrumbValue,
} from './tokens';
import { sysValue } from '../../foundations/tokens';
import { TOKEN_VALUES_DESKTOP as DESKTOP } from '../../foundations/tokens.generated';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Breadcrumb Stories — Lotteryplus Design System
//  Figma: "breadcrumb" (14291:136385) — 5 variants, Step 1 through Step 5
//
//  Every value shown here is read from foundations/tokens.generated.ts, which is
//  generated from Figma. Nothing on this page is typed by hand, so a table can never
//  claim a value the component does not actually render.
// ═══════════════════════════════════════════

const sans = 'var(--sys-type-body-md-regular-family), sans-serif';
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const muted = 'var(--sys-color-text-tertiary-default)';
const hairline = '1px solid var(--sys-color-border-accent-gray-soft-light)';

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 600,
  color: muted,
  borderBottom: '2px solid var(--sys-color-border-accent-gray-soft-light)',
};

const td: React.CSSProperties = {
  padding: '6px 12px',
  borderBottom: hairline,
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
        borderRadius: 2,
        marginLeft: 6,
        verticalAlign: 'middle',
        background: value,
        border: hairline,
      }}
    />
  ) : null;

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description:
        'Crumbs (1-5). Every crumb renders in the canonical `rest` state except the ' +
        'last, which is the current page and renders `selected`.',
    },
    onItemClick: {
      action: 'itemClick',
      description: 'Fired for `rest` crumbs only — the `selected` crumb is not clickable.',
    },
    className: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb from Figma "Design Systems Web App Lotteryplus V.7.1" (14291:136385). ' +
          'A navigation trail of 1-5 crumbs. Canonical states: the last crumb is `selected` ' +
          '(the current page — red label, red icon, semibold); the rest are `rest`. Crumbs ' +
          'support optional icons and text; the separator is the arrow-right-S icon.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// ── Sample data ──
const items5: BreadcrumbItem[] = [
  { key: 'home', label: 'Home' },
  { key: 'category', label: 'Category' },
  { key: 'subcategory', label: 'Subcategory' },
  { key: 'product', label: 'Product' },
  { key: 'detail', label: 'Detail' },
];

const items3: BreadcrumbItem[] = [
  { key: 'home', label: 'Home' },
  { key: 'lottery', label: 'Lottery' },
  { key: 'result', label: 'Result' },
];

// ── 1. Default (Step 3 — Interactive) ──
export const Default: Story = {
  name: 'Default (Step 3)',
  render: () => {
    const [clicked, setClicked] = useState<string | null>(null);
    return (
      <div style={{ fontFamily: sans }}>
        <Breadcrumb items={items3} onItemClick={(key) => setClicked(key)} />
        {clicked && (
          <div style={{ marginTop: 12, fontSize: 12, color: muted }}>
            Clicked: &quot;{clicked}&quot;
          </div>
        )}
      </div>
    );
  },
};

// ── 2. AllSteps (Step 1 through Step 5, vertically) ──
export const AllSteps: Story = {
  name: 'All Steps (1-5)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: sans }}>
      {[1, 2, 3, 4, 5].map((step) => {
        const stepItems = items5.slice(0, step);
        return (
          <div key={step}>
            <div style={{ fontSize: 11, color: muted, marginBottom: 4 }}>
              Step {step} ({step} crumb{step > 1 ? 's' : ''})
            </div>
            <Breadcrumb items={stepItems} />
          </div>
        );
      })}
    </div>
  ),
};

// ── 3. WithoutIcons (text only breadcrumb) ──
export const WithoutIcons: Story = {
  name: 'Without Icons',
  render: () => {
    const noIconItems: BreadcrumbItem[] = items5.slice(0, 4).map((item) => ({
      ...item,
      showIcon: false,
    }));
    return (
      <div style={{ fontFamily: sans }}>
        <div style={{ fontSize: 11, color: muted, marginBottom: 4 }}>
          Text-only breadcrumb (showIcon=false)
        </div>
        <Breadcrumb items={noIconItems} />
      </div>
    );
  },
};

// ── 4. States (rest vs selected) ──
export const States: Story = {
  name: 'States',
  render: () => (
    <div style={{ fontFamily: sans, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>
        Canonical states: {BREADCRUMB_STATES.join(' · ')}.
        <br />
        Breadcrumb renders {BREADCRUMB_RENDERED_STATES.join(' and ')} today — every crumb
        is <code>rest</code> except the last, which is the current page and renders{' '}
        <code>selected</code>.
      </div>

      <Breadcrumb items={items3} />

      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>State</th>
            <th style={th}>Label</th>
            <th style={th}>Icon</th>
            <th style={th}>Weight</th>
          </tr>
        </thead>
        <tbody>
          {BREADCRUMB_RENDERED_STATES.map((state) => {
            const v = breadcrumbColorValues(state);
            return (
              <tr key={state}>
                <td style={{ ...td, fontFamily: sans }}>{state}</td>
                <td style={td}>
                  {v.text}
                  <Swatch value={v.text} />
                </td>
                <td style={td}>
                  {v.icon}
                  <Swatch value={v.icon} />
                </td>
                <td style={td}>{breadcrumbFontWeightValue(state)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Token chain — Figma → design.md → components.json → tokens.css → component
//  Every "Value" cell is read from the generated literals, never hand-typed.
// ═══════════════════════════════════════════

export const TokenVerification: Story = {
  name: '🔍 Token Chain',
  render: () => {
    /** [Tier 2 component token, Tier 1 semantic token, resolved literal] */
    const layout: Array<[string, string, string]> = [
      ['--breadcrumb-gap', '--sys-spacing-2xl', breadcrumbValue('gap')],
      ['--breadcrumb-item-gap', '--sys-spacing-lg', breadcrumbValue('item-gap')],
      [
        '--breadcrumb-typography-family',
        '--sys-type-label-md-regular-family',
        breadcrumbValue('typography-family'),
      ],
      [
        '--breadcrumb-typography-size',
        '--sys-type-label-md-regular-size',
        breadcrumbValue('typography-size'),
      ],
      [
        '--breadcrumb-typography-line-height',
        '--sys-type-label-md-regular-line-height',
        breadcrumbValue('typography-line-height'),
      ],
      [
        '--breadcrumb-typography-tracking',
        '--sys-type-label-md-regular-tracking',
        breadcrumbValue('typography-tracking'),
      ],
      [
        '--breadcrumb-typography-weight-rest',
        '--sys-type-label-md-regular-weight',
        breadcrumbValue('typography-weight-rest'),
      ],
      [
        '--breadcrumb-typography-weight-selected',
        '--sys-type-label-md-semibold-weight',
        breadcrumbValue('typography-weight-selected'),
      ],
      ['--breadcrumb-icon-size', '(fixed — no Figma token)', breadcrumbValue('icon-size')],
    ];

    /** [what it paints, token the component references, resolved literal] */
    const colors: Array<[string, string, string]> = [
      [
        'Label — rest',
        '--breadcrumb-foreground-dark → --sys-color-secondary-dark',
        breadcrumbColorValues('rest').text,
      ],
      [
        'Label — selected',
        '--breadcrumb-foreground-red → --sys-color-primary-default',
        breadcrumbColorValues('selected').text,
      ],
      [
        'Icon — rest',
        '--sys-color-secondary-default (no breadcrumb token in Figma)',
        breadcrumbColorValues('rest').icon,
      ],
      [
        'Icon — selected',
        '--sys-color-primary-default (no breadcrumb token in Figma)',
        breadcrumbColorValues('selected').icon,
      ],
      [
        'Separator chevron',
        '--sys-color-secondary-default (no breadcrumb token in Figma)',
        BREADCRUMB_SEPARATOR_COLOR_VALUE,
      ],
    ];

    return (
      <div style={{ fontFamily: sans, maxWidth: 940 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Breadcrumb token chain</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: muted }}>
          Every value flows Figma → design.md → components.json → tokens.css. The component
          renders the Tier 2 alias; the alias points at a Tier 1 semantic token; that
          resolves to the literal. Nothing below is hand-typed — the Value column is read
          from <code>tokens.generated.ts</code>.
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 12, fontWeight: 600 }}>
          Figma: &quot;breadcrumb&quot; (14291:136385)
        </p>

        {/* Live previews */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 24,
            marginBottom: 32,
            background: 'var(--sys-color-background-light)',
            border: hairline,
            borderRadius: 8,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600 }}>Live previews</div>
          <div>
            <div style={{ fontSize: 11, color: muted, marginBottom: 4 }}>Step 3 (with icons)</div>
            <Breadcrumb items={items3} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: muted, marginBottom: 4 }}>Step 5 (with icons)</div>
            <Breadcrumb items={items5} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: muted, marginBottom: 4 }}>Step 3 (text only)</div>
            <Breadcrumb items={items3.map((i) => ({ ...i, showIcon: false }))} />
          </div>
        </div>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Layout &amp; typography</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {layout.map(([comp, semantic, value]) => (
              <tr key={comp}>
                <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>{comp}</td>
                <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
                  {semantic}
                </td>
                <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours by state</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Paints</th>
              <th style={th}>Token the component references</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {colors.map(([what, token, value]) => (
              <tr key={what}>
                <td style={{ ...td, fontFamily: sans }}>{what}</td>
                <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>{token}</td>
                <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>
                  {value}
                  <Swatch value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>
          Every declared <code>--breadcrumb-*</code> token
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Token</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {breadcrumbTokenNames().map((name) => (
              <tr key={name}>
                <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>
                  --breadcrumb-{name}
                </td>
                <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>
                  {breadcrumbValue(name)}
                  <Swatch value={breadcrumbValue(name)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: 20, fontSize: 11, color: muted, lineHeight: 1.6 }}>
          Base layer as rendered: gap {BREADCRUMB_BASE_VALUES.gap} · item-gap{' '}
          {BREADCRUMB_BASE_VALUES.itemGap} · {BREADCRUMB_BASE_VALUES.fontFamily}{' '}
          {BREADCRUMB_BASE_VALUES.fontSize}/{BREADCRUMB_BASE_VALUES.lineHeight} · icon{' '}
          {BREADCRUMB_ICON_SIZE_VALUE}.
          <br />
          Typography size and line-height are responsive. The literals above are the
          mobile mode ({sysValue('type-label-md-regular-size')}/
          {sysValue('type-label-md-regular-line-height')}); from the{' '}
          <code>md</code> breakpoint ({sysValue('breakpoint-md')}) up they resolve to{' '}
          {DESKTOP['--sys-type-label-md-regular-size']}/
          {DESKTOP['--sys-type-label-md-regular-line-height']}.
        </p>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ── Color Bindings ──
export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="Breadcrumb"
      figmaId="14291:136385"
      bindings={[
        {
          token: '--breadcrumb-foreground-dark',
          figmaVariable: 'colors/breadcrumb/breadcrumb-fg-dark',
          hex: breadcrumbColorValues('rest').text,
          usage: 'Crumb label — rest',
        },
        {
          token: '--breadcrumb-foreground-red',
          figmaVariable: 'colors/breadcrumb/breadcrumb-fg-red',
          hex: breadcrumbColorValues('selected').text,
          usage: 'Crumb label — selected (current page)',
        },
        {
          token: '--sys-color-secondary-default',
          figmaVariable: 'colors/icon/icon-fg-secondary (no breadcrumb token)',
          hex: breadcrumbColorValues('rest').icon,
          usage: 'Crumb icon — rest, and the separator chevron',
        },
        {
          token: '--sys-color-primary-default',
          figmaVariable: 'colors/icon/icon-fg-primary (no breadcrumb token)',
          hex: breadcrumbColorValues('selected').icon,
          usage: 'Crumb icon — selected',
        },
      ]}
    />
  ),
};
