import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import type { BreadcrumbItem } from './Breadcrumb';
import {
  BREADCRUMB_COLORS,
  BREADCRUMB_DIMENSIONS,
  TYPOGRAPHY,
  SPACING,
} from './tokens';

// ═══════════════════════════════════════════
//  Breadcrumb Stories — Lotteryplus Design System
//  Figma: "breadcrumb" (14291:136385)
//  5 Variants: Step 1 through Step 5
// ═══════════════════════════════════════════

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb component from Figma "Design Systems Web App Lotteryplus V.7.1". ' +
          'Displays a navigation trail with 1-5 items. The last item is always the active/current page ' +
          '(red text, red icon, semibold). Items support optional icons and text. ' +
          'Separator uses arrow-right-S icon between items. Uses Icon component.',
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
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <Breadcrumb
          items={items3}
          onItemClick={(key) => setClicked(key)}
        />
        {clicked && (
          <div style={{ marginTop: 12, fontSize: 12, color: '#737373' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'Graphik TH', sans-serif" }}>
      {[1, 2, 3, 4, 5].map((step) => {
        const stepItems = items5.slice(0, step);
        return (
          <div key={step}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
              Step {step} ({step} item{step > 1 ? 's' : ''})
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
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
          Text-only breadcrumb (showIcon=false)
        </div>
        <Breadcrumb items={noIconItems} />
      </div>
    );
  },
};

// ── 4. Token Verification ──
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    const tokenRows = [
      {
        section: 'Layout / Spacing',
        tokens: [
          { token: 'Container gap (spacing-2xl)', figmaVar: 'dimension/spacing/spacing-2xl', value: `${BREADCRUMB_DIMENSIONS.containerGap}px`, actual: '16px' },
          { token: 'Item internal gap (spacing-lg)', figmaVar: 'dimension/spacing/spacing-lg', value: `${BREADCRUMB_DIMENSIONS.itemGap}px`, actual: '8px' },
          { token: 'Icon size', figmaVar: 'N/A (icons-size 24)', value: `${BREADCRUMB_DIMENSIONS.iconSize}px`, actual: '24px' },
        ],
      },
      {
        section: 'Spacing Tokens',
        tokens: [
          { token: 'spacing-none', figmaVar: 'dimension/spacing/spacing-none', value: `${SPACING.none}`, actual: '0' },
          { token: 'spacing-lg', figmaVar: 'dimension/spacing/spacing-lg', value: `${SPACING.lg}px`, actual: '8px' },
          { token: 'spacing-2xl', figmaVar: 'dimension/spacing/spacing-2xl', value: `${SPACING['2xl']}px`, actual: '16px' },
        ],
      },
      {
        section: 'Typography — Inactive (label/m-reg)',
        tokens: [
          { token: 'Font size (label/m-reg/size)', figmaVar: 'label/m-reg/size', value: `${TYPOGRAPHY.inactive.fontSize}px`, actual: '12px' },
          { token: 'Font weight (label/m-reg/weight)', figmaVar: 'label/m-reg/weight', value: `${TYPOGRAPHY.inactive.fontWeight}`, actual: '400' },
          { token: 'Line height (label/m-reg/line-height)', figmaVar: 'label/m-reg/line-height', value: TYPOGRAPHY.inactive.lineHeight, actual: '18px' },
        ],
      },
      {
        section: 'Typography — Active (label/m-semb)',
        tokens: [
          { token: 'Font size (label/m-semb/size)', figmaVar: 'label/m-semb/size', value: `${TYPOGRAPHY.active.fontSize}px`, actual: '12px' },
          { token: 'Font weight (label/m-semb/weight)', figmaVar: 'label/m-semb/weight', value: `${TYPOGRAPHY.active.fontWeight}`, actual: '600' },
          { token: 'Line height (label/m-semb/line-height)', figmaVar: 'label/m-semb/line-height', value: TYPOGRAPHY.active.lineHeight, actual: '18px' },
        ],
      },
      {
        section: 'Colors — Text',
        tokens: [
          { token: 'Inactive text (breadcrumb-fg-dark)', figmaVar: 'colors/breadcrumb/breadcrumb-fg-dark', value: BREADCRUMB_COLORS.text.inactive, actual: '#141414' },
          { token: 'Active text (breadcrumb-fg-red)', figmaVar: 'colors/breadcrumb/breadcrumb-fg-red', value: BREADCRUMB_COLORS.text.active, actual: '#E32321' },
        ],
      },
      {
        section: 'Colors — Icons',
        tokens: [
          { token: 'Inactive icon (icon-fg-secondary)', figmaVar: 'colors/icon/icon-fg-secondary', value: BREADCRUMB_COLORS.icon.inactive, actual: '#262626' },
          { token: 'Active icon (icon-fg-primary)', figmaVar: 'colors/icon/icon-fg-primary', value: BREADCRUMB_COLORS.icon.active, actual: '#E32321' },
          { token: 'Separator icon (icon-fg-secondary)', figmaVar: 'colors/icon/icon-fg-secondary', value: BREADCRUMB_COLORS.icon.separator, actual: '#262626' },
        ],
      },
    ];

    return (
      <div style={{ padding: 32, maxWidth: 750, fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Breadcrumb Token Verification</h2>
        <p style={{ fontSize: 14, color: '#999', marginBottom: 8 }}>
          Comparing Figma component values vs Storybook token values with bound variable names
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Figma: &quot;breadcrumb&quot; (14291:136385)
        </p>

        {/* Live previews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, background: '#F9F9F9', borderRadius: 8, marginBottom: 32, border: '1px solid #E5E5E5' }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Live Previews</div>
          <div>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>Step 3 (with icons)</div>
            <Breadcrumb items={items3} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>Step 5 (with icons)</div>
            <Breadcrumb items={items5} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>Step 3 (text only)</div>
            <Breadcrumb items={items3.map((i) => ({ ...i, showIcon: false }))} />
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
