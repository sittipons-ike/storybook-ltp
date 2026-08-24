import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tooltip from './Tooltip';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import Button from '../Button/Button';
import {
  TOOLTIP_POSITIONS,
  TOOLTIP_TRIGGER_ICON_SIZE,
  TOOLTIP_FIGMA_GAP,
  tooltipValue,
  tooltipTokenNames,
} from './tokens';
import { sysValue } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Tooltip Stories — Lotteryplus Design System
//  Figma: tool-tip page
//
//  Values shown here are read from foundations/tokens.generated.ts, which is generated
//  from the same source the component renders with, so a table can never claim a value
//  Tooltip does not actually paint.
//
//  ⚠️ Tooltip is the one component with NO Figma component-tier colour group. See the
//  "Figma Gap" story.
// ═══════════════════════════════════════════

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const GAP_SUMMARY =
  'Figma V.7.1 has no `colors/tooltip` group. Unlike every other component, Tooltip’s ' +
  'colour tokens are authored against the Tier 1 semantic layer instead of mirrored from ' +
  'Figma — see the “Figma Gap” story.';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: { type: 'code' },
      description: {
        component:
          'Tooltip component from Figma Design System. Dark background with title + description. ' +
          'Supports 4 positions (top/bottom/left/right). Shows on hover or controlled. ' +
          'Uses Icon component for trigger.\n\n**Token gap:** ' +
          GAP_SUMMARY,
      },
    },
  },
  argTypes: {
    position: { control: 'select', options: TOOLTIP_POSITIONS },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

const sampleTitle = 'Title';
const sampleContent = 'Lorem ipsum dolor sit amet consectetur. Auctor nec in mauris fermentum faucibus';

const caption: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--sys-color-text-tertiary-default)',
  fontFamily: sans,
};

// ── 1. Bubble Only (Figma match) ──
export const BubbleOnly: Story = {
  name: 'Bubble Only (Figma Match)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, padding: 40 }}>
      {TOOLTIP_POSITIONS.map((pos) => (
        <div key={pos} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={caption}>position=&quot;{pos}&quot;</div>
          <Tooltip title={sampleTitle} content={sampleContent} position={pos} />
        </div>
      ))}
    </div>
  ),
};

// ── 2. All Positions ──
export const AllPositions: Story = {
  name: 'All Positions',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 120, justifyContent: 'center', padding: 200 }}>
      {TOOLTIP_POSITIONS.map((pos) => (
        <div key={pos} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={caption}>position=&quot;{pos}&quot;</div>
          <Tooltip title={sampleTitle} content={sampleContent} position={pos}>
            <Icon
              name="outline-info"
              size={TOOLTIP_TRIGGER_ICON_SIZE as any}
              customColor={tooltipValue('trigger-icon-foreground')}
            />
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};

// ── 3. Interactive (Hover) ──
export const Interactive: Story = {
  name: 'Interactive — Hover Icon',
  render: () => (
    <div style={{ padding: 100, display: 'flex', gap: 48, justifyContent: 'center' }}>
      <Tooltip title="ข้อมูลเพิ่มเติม" content="Hover เพื่อดูรายละเอียดเพิ่มเติม" position="top">
        <Icon
          name="outline-info"
          size={TOOLTIP_TRIGGER_ICON_SIZE as any}
          customColor={tooltipValue('trigger-icon-foreground')}
        />
      </Tooltip>

      <Tooltip title="แจ้งเตือน" content="มีการอัพเดทใหม่" position="bottom">
        <Icon
          name="filled-Error-2"
          size={TOOLTIP_TRIGGER_ICON_SIZE as any}
          customColor={sysValue('color-status-error-default')}
        />
      </Tooltip>

      <Tooltip content="ไม่มี title — แสดงเฉพาะ description" position="top">
        <Icon
          name="outline-Help"
          size={TOOLTIP_TRIGGER_ICON_SIZE as any}
          customColor={sysValue('color-text-tertiary-default')}
        />
      </Tooltip>
    </div>
  ),
};

// ── 4. With Button Trigger ──
export const WithButton: Story = {
  name: 'With Button Trigger',
  render: () => (
    <div style={{ padding: 100, display: 'flex', gap: 48, justifyContent: 'center' }}>
      <Tooltip title="ซื้อสินค้า" content="กดปุ่มเพื่อเพิ่มสินค้าในตะกร้า" position="top">
        <Button variant="primary" size="md">เพิ่มลงตะกร้า</Button>
      </Tooltip>

      <Tooltip content="คุณต้องเข้าสู่ระบบก่อน" position="bottom">
        <Button variant="ghost" size="md" disabled>เข้าสู่ระบบ</Button>
      </Tooltip>
    </div>
  ),
};

// ── 5. Title Only / Body Only ──
export const Variations: Story = {
  name: 'Variations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', padding: 40 }}>
      <div>
        <div style={{ ...caption, marginBottom: 8 }}>Title + Body</div>
        <Tooltip title="Title" content="Description body text" position="top" />
      </div>
      <div>
        <div style={{ ...caption, marginBottom: 8 }}>Body Only (no title)</div>
        <Tooltip content="Description body text only" position="top" />
      </div>
      <div>
        <div style={{ ...caption, marginBottom: 8 }}>Long Text</div>
        <Tooltip
          title="Long Title Example"
          content="Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
          position="top"
          maxWidth={280}
        />
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════
//  Token chain
//
//  Tier 1 partner for every Tier 2 token. Colours come from TOOLTIP_FIGMA_GAP.colorChain
//  — the hand-authored substitute for the Figma group Tooltip does not have. Tokens
//  missing from this map carry no semantic partner and are marked "(fixed)".
// ═══════════════════════════════════════════
const TIER1: Record<string, string> = {
  ...TOOLTIP_FIGMA_GAP.colorChain,

  radius: 'radius-lg',
  padding: 'spacing-xl',
  gap: 'spacing-none',
  offset: 'spacing-sm',
  shadow: 'elevation-card',

  'typography-title-family': 'type-body-md-medium-family',
  'typography-title-size': 'type-body-md-medium-size',
  'typography-title-line-height': 'type-body-md-medium-line-height',
  'typography-title-weight': 'type-body-md-medium-weight',
  'typography-title-tracking': 'type-body-md-medium-tracking',

  'typography-body-family': 'type-body-md-regular-family',
  'typography-body-size': 'type-body-md-regular-size',
  'typography-body-line-height': 'type-body-md-regular-line-height',
  'typography-body-weight': 'type-body-md-regular-weight',
  'typography-body-tracking': 'type-body-md-regular-tracking',
};

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

// ── 6. Token Verification ──
export const TokenVerification: StoryObj = {
  name: '🔍 Token Chain',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 900, padding: 32 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Tooltip token chain</h2>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--sys-color-text-tertiary-default)' }}>
        The component renders the Tier 2 alias; the alias points at a Tier 1 semantic
        token; that resolves to the literal. Every value below is read from
        <code style={{ fontFamily: mono }}> tokens.generated.ts</code> — nothing is hand-typed,
        so this table cannot drift from what Tooltip paints.
      </p>

      <div
        style={{
          padding: 24,
          background: 'var(--sys-color-background-soft-light)',
          borderRadius: 'var(--sys-radius-lg)',
          border: '1px solid var(--sys-color-border-accent-gray-soft-light)',
          marginBottom: 28,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Tooltip title={sampleTitle} content={sampleContent} position="top" />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Tier 2 — component</th>
            <th style={th}>Tier 1 — semantic</th>
            <th style={th}>Value</th>
            <th style={th}>Tiers agree</th>
          </tr>
        </thead>
        <tbody>
          {tooltipTokenNames().map((token) => {
            const path = TIER1[token];
            const value = tooltipValue(token);
            return (
              <tr key={token}>
                <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>
                  --tooltip-{token}
                </td>
                <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
                  {path ? `--sys-${path}` : '(fixed)'}
                </td>
                <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>{value}</td>
                <td style={td}>
                  {path ? (sysValue(path) === value ? '✅' : '❌') : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ── 7. Color Bindings ──
export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <div>
      <ColorBindingsTable
        componentName="Tooltip"
        figmaId="tool-tip page — NO component-tier colour group (see Figma Gap)"
        bindings={[
          {
            token: '--tooltip-background',
            figmaVariable: '— (authored) → --sys-color-overlay-heavy',
            hex: tooltipValue('background'),
            usage: 'Tooltip bubble background',
          },
          {
            token: '--tooltip-arrow-background',
            figmaVariable: '— (authored) → --sys-color-overlay-heavy',
            hex: tooltipValue('arrow-background'),
            usage: 'Caret fill',
          },
          {
            token: '--tooltip-foreground',
            figmaVariable: '— (authored) → --sys-color-text-on-bgcolor',
            hex: tooltipValue('foreground'),
            usage: 'Title + body text',
          },
          {
            token: '--tooltip-trigger-icon-foreground',
            figmaVariable: '— (authored) → --sys-color-text-secondary-default',
            hex: tooltipValue('trigger-icon-foreground'),
            usage: 'Trigger info icon colour',
          },
        ]}
      />
      <p style={{ ...caption, maxWidth: 800, padding: '0 24px', lineHeight: 1.6 }}>
        Every other component binds these to a Figma variable. Tooltip has none to bind to —
        the “Figma Variable” column shows the semantic token standing in for it.
      </p>
    </div>
  ),
};

// ── 8. Figma Gap — the reason this component is different ──
export const FigmaGap: StoryObj = {
  name: '⚠️ Figma Gap',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 820, padding: 32, lineHeight: 1.6 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Tooltip has no Figma colour group</h2>

      <div
        style={{
          background: 'var(--sys-color-status-warning-soft-light)',
          border: '1px solid var(--sys-color-border-warning)',
          borderRadius: 'var(--sys-radius-lg)',
          padding: 16,
          fontSize: 13,
          margin: '0 0 24px',
        }}
      >
        {TOOLTIP_FIGMA_GAP.note}
      </div>

      <p style={{ fontSize: 13, margin: '0 0 16px' }}>
        For every other component the chain runs
        <code style={{ fontFamily: mono }}> Figma colors/&lt;component&gt; → components.json → --&lt;prefix&gt;-* </code>.
        Tooltip skips the first hop: <code style={{ fontFamily: mono }}>figma_group</code> is{' '}
        <code style={{ fontFamily: mono }}>{String(TOOLTIP_FIGMA_GAP.figmaGroup)}</code> and the
        colours are authored in{' '}
        <code style={{ fontFamily: mono }}>design-library/lotteryplus/components/tooltip.json</code>{' '}
        against Tier 1 directly.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={th}>Tier 2 — component</th>
            <th style={th}>Figma group</th>
            <th style={th}>Tier 1 stand-in</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(TOOLTIP_FIGMA_GAP.colorChain).map(([token, path]) => (
            <tr key={token}>
              <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>--tooltip-{token}</td>
              <td style={{ ...td, color: 'var(--sys-color-text-state-light-gray)' }}>— none —</td>
              <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>--sys-{path}</td>
              <td style={td}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: sysValue(path),
                      border: '1px solid var(--sys-color-border-accent-gray-light)',
                    }}
                  />
                  {sysValue(path)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>What closes the gap</h3>
      <p style={{ fontSize: 13, margin: 0 }}>
        A designer adds a <code style={{ fontFamily: mono }}>colors/tooltip</code> group in Figma
        bound to the same semantic variables. The next pull mirrors it, the{' '}
        <code style={{ fontFamily: mono }}>tokens</code> block in{' '}
        <code style={{ fontFamily: mono }}>components/tooltip.json</code> is deleted, and Tooltip
        stops being the exception — nothing in this component changes.
      </p>
    </div>
  ),
  parameters: { layout: 'padded' },
};
