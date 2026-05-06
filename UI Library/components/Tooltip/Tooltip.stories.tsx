import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tooltip from './Tooltip';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import Button from '../Button/Button';
import {
  TOOLTIP_COLORS,
  TOOLTIP_DIMENSIONS,
  TYPOGRAPHY,
  RADIUS,
  SHADOW,
} from './tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';
import type { ColorBinding } from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Tooltip Stories — Lotteryplus Design System
//  Figma: tool-tip page
// ═══════════════════════════════════════════

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
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
          'Uses Icon component for trigger.',
      },
    },
  },
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

const sampleTitle = 'Title';
const sampleContent = 'Lorem ipsum dolor sit amet consectetur. Auctor nec in mauris fermentum faucibus';

// ── 1. Bubble Only (Figma match) ──
export const BubbleOnly: Story = {
  name: 'Bubble Only (Figma Match)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, padding: 40 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
        <div key={pos} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#999', fontFamily: "'Graphik TH', sans-serif" }}>
            position=&quot;{pos}&quot;
          </div>
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
      {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
        <div key={pos} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#999', fontFamily: "'Graphik TH', sans-serif" }}>
            position=&quot;{pos}&quot;
          </div>
          <Tooltip title={sampleTitle} content={sampleContent} position={pos}>
            <Icon name="outline-info" size={24} customColor="#262626" />
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
        <Icon name="outline-info" size={24} customColor="#262626" />
      </Tooltip>

      <Tooltip title="แจ้งเตือน" content="มีการอัพเดทใหม่" position="bottom">
        <Icon name="filled-Error-2" size={24} customColor="#E32321" />
      </Tooltip>

      <Tooltip content="ไม่มี title — แสดงเฉพาะ description" position="top">
        <Icon name="outline-help" size={24} customColor="#737373" />
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
        <Button type="primary" size="M">เพิ่มลงตะกร้า</Button>
      </Tooltip>

      <Tooltip content="คุณต้องเข้าสู่ระบบก่อน" position="bottom">
        <Button type="outline" size="M" disabled>เข้าสู่ระบบ</Button>
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
        <div style={{ fontSize: 11, color: '#999', marginBottom: 8, fontFamily: "'Graphik TH', sans-serif" }}>Title + Body</div>
        <Tooltip title="Title" content="Description body text" position="top" />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 8, fontFamily: "'Graphik TH', sans-serif" }}>Body Only (no title)</div>
        <Tooltip content="Description body text only" position="top" />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 8, fontFamily: "'Graphik TH', sans-serif" }}>Long Text</div>
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

// ── 6. Token Verification ──
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    const tokens = [
      { section: 'Layout', items: [
        { token: 'Content padding', figmaVar: 'N/A (12px)', value: `${TOOLTIP_DIMENSIONS.content.padding}px`, actual: '12px' },
        { token: 'Content max-width', figmaVar: 'N/A (326px)', value: `${TOOLTIP_DIMENSIONS.content.maxWidth}px`, actual: '326px' },
        { token: 'Content radius (Radius-S)', figmaVar: 'Radius/Radius-S', value: `${RADIUS.s}px`, actual: '8px' },
        { token: 'Arrow width', figmaVar: 'N/A (16px)', value: `${TOOLTIP_DIMENSIONS.arrow.width}px`, actual: '16px' },
        { token: 'Arrow height', figmaVar: 'N/A (8px)', value: `${TOOLTIP_DIMENSIONS.arrow.height}px`, actual: '8px' },
        { token: 'Trigger icon size', figmaVar: 'N/A (24px)', value: `${TOOLTIP_DIMENSIONS.triggerIconSize}px`, actual: '24px' },
      ]},
      { section: 'Colors', items: [
        { token: 'BG (overlay-black-80%)', figmaVar: 'colors/overlay/overlay-black-80%', value: TOOLTIP_COLORS.bg, actual: 'rgba(0, 0, 0, 0.80)' },
        { token: 'Text (Text-Onbgcolor)', figmaVar: 'Color/Text/Text-Onbgcolor', value: TOOLTIP_COLORS.text, actual: '#FFFFFF' },
        { token: 'Arrow fill', figmaVar: 'colors/overlay/overlay-black-80%', value: TOOLTIP_COLORS.arrow, actual: 'rgba(0, 0, 0, 0.80)' },
        { token: 'Trigger icon (icon-fg-secondary)', figmaVar: 'colors/icon/icon-fg-secondary', value: TOOLTIP_COLORS.triggerIcon, actual: '#262626' },
      ]},
      { section: 'Typography', items: [
        { token: 'Title fontSize (body/m-med)', figmaVar: 'body/m-med/size', value: `${TYPOGRAPHY.title.fontSize}px`, actual: '14px' },
        { token: 'Title fontWeight', figmaVar: 'body/m-med/weight', value: `${TYPOGRAPHY.title.fontWeight}`, actual: '500' },
        { token: 'Title lineHeight', figmaVar: 'body/m-med/line-height', value: TYPOGRAPHY.title.lineHeight, actual: '22px' },
        { token: 'Body fontSize (body/m-reg)', figmaVar: 'body/m-reg/size', value: `${TYPOGRAPHY.body.fontSize}px`, actual: '14px' },
        { token: 'Body fontWeight', figmaVar: 'body/m-reg/weight', value: `${TYPOGRAPHY.body.fontWeight}`, actual: '400' },
        { token: 'Body lineHeight', figmaVar: 'body/m-reg/line-height', value: TYPOGRAPHY.body.lineHeight, actual: '22px' },
      ]},
    ];

    return (
      <div style={{ padding: 32, maxWidth: 700, fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Tooltip Token Verification</h2>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 24 }}>Figma: tool-tip page</p>

        {/* Live preview */}
        <div style={{ padding: 24, background: '#F9F9F9', borderRadius: 8, marginBottom: 32, border: '1px solid #E5E5E5', display: 'flex', justifyContent: 'center' }}>
          <Tooltip title={sampleTitle} content={sampleContent} position="top" />
        </div>

        {tokens.map(({ section, items }) => (
          <div key={section} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#E32321', borderBottom: '2px solid #E32321', paddingBottom: 4, marginBottom: 12 }}>{section}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>{['Token', 'Figma Variable', 'Value', 'Match'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', borderBottom: '2px solid #DDD', fontWeight: 600 }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {items.map(({ token, figmaVar, value, actual }) => (
                  <tr key={token}>
                    <td style={{ padding: '5px 10px', borderBottom: '1px solid #EEE' }}>{token}</td>
                    <td style={{ padding: '5px 10px', borderBottom: '1px solid #EEE', color: '#8B8BF5', fontSize: 11, fontFamily: 'monospace' }}>{figmaVar}</td>
                    <td style={{ padding: '5px 10px', borderBottom: '1px solid #EEE', color: '#22C55E', fontFamily: 'monospace' }}>{value}</td>
                    <td style={{ padding: '5px 10px', borderBottom: '1px solid #EEE', fontSize: 16 }}>{value === actual ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  },
};

// ── 7. Color Bindings ──
export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="Tooltip"
      figmaId="tool-tip page"
      bindings={[
        { token: 'overlay-black-80%', figmaVariable: 'colors/overlay/overlay-black-80%', hex: '#000000CC', usage: 'Tooltip background + arrow' },
        { token: 'Text-Onbgcolor', figmaVariable: 'Color/Text/Text-Onbgcolor', hex: '#FFFFFF', usage: 'Title + body text' },
        { token: 'icon-fg-secondary', figmaVariable: 'colors/icon/icon-fg-secondary', hex: '#262626', usage: 'Trigger info icon color' },
      ]}
    />
  ),
};
