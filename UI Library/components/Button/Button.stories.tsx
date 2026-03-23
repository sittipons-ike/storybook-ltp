import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from './Button';
import { BUTTON_COLORS, SIZE_CONFIG, TYPOGRAPHY, RADIUS, BORDER_WIDTH, SPACING } from './tokens';

// ═══════════════════════════════════════════
//  Button Stories — Lotteryplus Design System
//  Figma: "button" component set (14291:130847)
//  195 variants: Size(L/M/S) × Type(5) × Show icon(2) × Show Text(2) × State(5)
// ═══════════════════════════════════════════

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'outline', 'link'],
      description: 'Figma variant: Type',
    },
    size: {
      control: 'select',
      options: ['L', 'M', 'S'],
      description: 'Figma variant: Size',
    },
    showIcon: {
      control: 'boolean',
      description: 'Figma variant: Show icon',
    },
    showText: {
      control: 'boolean',
      description: 'Figma variant: Show Text',
    },
    iconName: {
      control: 'text',
      description: 'Icon name from Components/Icon library',
    },
    disabled: {
      control: 'boolean',
      description: 'Figma variant: State=Disable',
    },
    fullWidth: {
      control: 'boolean',
    },
    children: {
      control: 'text',
      description: 'Figma property: Text#1891:27 (default: "BUTTON")',
    },
  },
  args: {
    children: 'BUTTON',
    type: 'primary',
    size: 'L',
    showIcon: false,
    showText: true,
    disabled: false,
    iconName: 'outline-Home',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ═══════════════════════════════════════════
//  Default
// ═══════════════════════════════════════════
export const Default: Story = {};

// ═══════════════════════════════════════════
//  All Types (Primary, Secondary, Tertiary, Outline, Link)
// ═══════════════════════════════════════════
export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['primary', 'secondary', 'tertiary', 'outline', 'link'] as const).map((type) => (
        <div key={type}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#737373', marginBottom: 8, textTransform: 'capitalize', fontFamily: "'Graphik TH', sans-serif" }}>
            {type}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button type={type} size="L">BUTTON</Button>
            <Button type={type} size="L" showIcon iconName="outline-Home">BUTTON</Button>
            <Button type={type} size="L" showIcon showText={false} iconName="outline-Home" />
            <Button type={type} size="L" disabled>BUTTON</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════
//  All Sizes (L, M, S)
// ═══════════════════════════════════════════
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['L', 'M', 'S'] as const).map((size) => (
        <div key={size}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#737373', marginBottom: 8, fontFamily: "'Graphik TH', sans-serif" }}>
            Size: {size} — Height: {SIZE_CONFIG[size].height}px
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button size={size}>BUTTON</Button>
            <Button size={size} showIcon iconName="outline-Home">BUTTON</Button>
            <Button size={size} showIcon showText={false} iconName="outline-Home" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════
//  All States
// ═══════════════════════════════════════════
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['primary', 'secondary', 'tertiary', 'outline', 'link'] as const).map((type) => (
        <div key={type}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 12, textTransform: 'capitalize', fontFamily: "'Graphik TH', sans-serif" }}>
            {type}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {(['default', 'hover', 'focused', 'pressed', 'disabled'] as const).map((state) => {
              const colors = BUTTON_COLORS[type][state === 'disabled' ? 'disabled' : state];
              const hasBorder = !!colors.border;
              return (
                <div key={state} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: SIZE_CONFIG.L.height,
                      paddingLeft: SIZE_CONFIG.L.paddingX,
                      paddingRight: SIZE_CONFIG.L.paddingX,
                      borderRadius: RADIUS.lg,
                      backgroundColor: colors.bg,
                      color: colors.fg,
                      border: hasBorder ? `${BORDER_WIDTH[1]}px solid ${colors.border}` : 'none',
                      fontFamily: TYPOGRAPHY.fontFamily,
                      fontSize: TYPOGRAPHY.fontSize,
                      fontWeight: TYPOGRAPHY.fontWeight,
                      lineHeight: TYPOGRAPHY.lineHeight,
                      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
                      opacity: 1,
                    }}
                  >
                    BUTTON
                  </div>
                  <div style={{ fontSize: 10, color: '#A3A3A3', marginTop: 4, fontFamily: "'Graphik TH', sans-serif" }}>
                    {state}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════
//  With Icons
// ═══════════════════════════════════════════
export const WithIcons: Story = {
  name: 'With Icons',
  render: () => {
    const icons = ['outline-Home', 'outline-cart', 'outline-search', 'outline-setting', 'outline-notification'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', fontFamily: "'Graphik TH', sans-serif" }}>
          Icon + Text (paddingLeft: {SIZE_CONFIG.L.iconPaddingLeft}px, gap: {SIZE_CONFIG.L.itemSpacing}px)
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {icons.map((icon) => (
            <Button key={icon} showIcon iconName={icon}>{icon.replace('outline-', '').toUpperCase()}</Button>
          ))}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginTop: 8, fontFamily: "'Graphik TH', sans-serif" }}>
          Icon Only (padding: {SIZE_CONFIG.L.iconOnlyPadding}px, size: {SIZE_CONFIG.L.iconSize}px)
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {icons.map((icon) => (
            <Button key={icon} showIcon showText={false} iconName={icon} />
          ))}
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Token Verification — Figma vs Storybook
// ═══════════════════════════════════════════
export const TokenVerification: Story = {
  name: '🔍 Token Verification',
  render: () => {
    const checks = [
      { label: 'Font Family', figma: 'Graphik TH', storybook: TYPOGRAPHY.fontFamily },
      { label: 'Font Size (button/m-semb/size)', figma: '14px (size/m)', storybook: `${TYPOGRAPHY.fontSize}px` },
      { label: 'Font Weight (button/m-semb/weight)', figma: '600 (Semibold)', storybook: `${TYPOGRAPHY.fontWeight}` },
      { label: 'Line Height (button/m-semb/line-height)', figma: '22px (line-height/m)', storybook: TYPOGRAPHY.lineHeight },
      { label: 'Border Radius (radius-lg)', figma: '8px (radius/8)', storybook: `${RADIUS.lg}px` },
      { label: 'Padding X (spacing-2xl)', figma: '16px (spacing/16)', storybook: `${SPACING['2xl']}px` },
      { label: 'Padding Y (spacing-none)', figma: '0px (spacing/0)', storybook: `${SPACING.none}px` },
      { label: 'Gap icon+text (spacing-sm)', figma: '4px (spacing/4)', storybook: `${SPACING.sm}px` },
      { label: 'Icon Padding Left (spacing-xl)', figma: '12px', storybook: `${SPACING.xl}px` },
      { label: 'Border Width', figma: '1px (border-width/1)', storybook: `${BORDER_WIDTH[1]}px` },
      { label: 'Height L', figma: '44px', storybook: `${SIZE_CONFIG.L.height}px` },
      { label: 'Height M', figma: '36px', storybook: `${SIZE_CONFIG.M.height}px` },
      { label: 'Height S', figma: '28px', storybook: `${SIZE_CONFIG.S.height}px` },
      { label: 'Icon Size', figma: '24px (icons-size: Size=24)', storybook: `${SIZE_CONFIG.L.iconSize}px` },
      { label: 'Primary BG Default', figma: '#E32321', storybook: BUTTON_COLORS.primary.default.bg },
      { label: 'Primary BG Hover', figma: '#B91C1C', storybook: BUTTON_COLORS.primary.hover.bg },
      { label: 'Primary BG Pressed', figma: '#7F1D1D', storybook: BUTTON_COLORS.primary.pressed.bg },
      { label: 'Primary FG Default', figma: '#FFFFFF', storybook: BUTTON_COLORS.primary.default.fg },
      { label: 'Secondary BG Default', figma: '#262626', storybook: BUTTON_COLORS.secondary.default.bg },
      { label: 'Tertiary Border Default', figma: '#D4D4D4', storybook: BUTTON_COLORS.tertiary.default.border || '' },
      { label: 'Link FG Default', figma: '#3B82F6', storybook: BUTTON_COLORS.link.default.fg },
      { label: 'Disabled BG', figma: '#F5F5F5', storybook: BUTTON_COLORS.primary.disabled.bg },
      { label: 'Disabled FG', figma: '#C9C9C9', storybook: BUTTON_COLORS.primary.disabled.fg },
    ];

    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Button Token Verification</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#737373' }}>
          Comparing Figma bound variables vs Storybook token values
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>Token</th>
              <th style={{ padding: '8px 12px' }}>Figma Value</th>
              <th style={{ padding: '8px 12px' }}>Storybook Value</th>
              <th style={{ padding: '8px 12px' }}>Match</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c) => {
              const figmaClean = c.figma.replace(/\s*\(.*\)/, '').trim();
              const sbClean = c.storybook.replace(/'/g, '').replace(/, sans-serif/, '').trim();
              const match = figmaClean.toLowerCase() === sbClean.toLowerCase() ||
                c.figma.includes(sbClean) || sbClean.includes(figmaClean);
              return (
                <tr key={c.label} style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <td style={{ padding: '6px 12px', fontWeight: 500 }}>{c.label}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: '#E32321' }}>{c.figma}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: '#3B82F6' }}>{c.storybook}</td>
                  <td style={{ padding: '6px 12px', fontSize: 16 }}>{match ? '✅' : '❌'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Full Matrix — All Type × Size combinations
// ═══════════════════════════════════════════
export const FullMatrix: Story = {
  name: 'Full Matrix (Type × Size)',
  render: () => (
    <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>Button Matrix</h2>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px 16px', fontSize: 12, color: '#737373', textAlign: 'left' }}>Type \ Size</th>
            {(['L', 'M', 'S'] as const).map((s) => (
              <th key={s} style={{ padding: '8px 16px', fontSize: 12, color: '#737373' }}>
                {s} ({SIZE_CONFIG[s].height}px)
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(['primary', 'secondary', 'tertiary', 'outline', 'link'] as const).map((type) => (
            <tr key={type} style={{ borderBottom: '1px solid #F5F5F5' }}>
              <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>{type}</td>
              {(['L', 'M', 'S'] as const).map((size) => (
                <td key={size} style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Button type={type} size={size}>BUTTON</Button>
                    <Button type={type} size={size} showIcon iconName="outline-Home">BUTTON</Button>
                    <Button type={type} size={size} showIcon showText={false} iconName="outline-Home" />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  parameters: { layout: 'padded' },
};
