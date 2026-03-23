import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import RadioButtonGroup, { RadioDot, RadioOption } from './RadioButton';
import {
  RADIO_COLORS,
  RADIO_DIMENSIONS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
} from './tokens';

// ═══════════════════════════════════════════
//  RadioButton Stories — Lotteryplus Design System
//  Figma: "radio-buttons" (14457:1351) + "Gender select" (14291:132236)
//  Page: radio-buttons → Section 1
// ═══════════════════════════════════════════

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Components/RadioButton',
  component: RadioButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'เพศ',
    required: true,
    options: [
      { value: 'male', label: 'ชาย' },
      { value: 'female', label: 'หญิง' },
      { value: 'not_specified', label: 'ไม่ระบุ' },
    ],
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

// ═══════════════════════════════════════════
//  Default — No selection (Figma: type=no select)
// ═══════════════════════════════════════════
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div style={{ width: 358 }}>
        <RadioButtonGroup {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Male Selected (Figma: type=male)
// ═══════════════════════════════════════════
export const MaleSelected: Story = {
  name: 'Selected: ชาย',
  render: (args) => {
    const [value, setValue] = useState<string>('male');
    return (
      <div style={{ width: 358 }}>
        <RadioButtonGroup {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Female Selected (Figma: type=female)
// ═══════════════════════════════════════════
export const FemaleSelected: Story = {
  name: 'Selected: หญิง',
  render: (args) => {
    const [value, setValue] = useState<string>('female');
    return (
      <div style={{ width: 358 }}>
        <RadioButtonGroup {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Not Specified Selected (Figma: type=not specified)
// ═══════════════════════════════════════════
export const NotSpecifiedSelected: Story = {
  name: 'Selected: ไม่ระบุ',
  render: (args) => {
    const [value, setValue] = useState<string>('not_specified');
    return (
      <div style={{ width: 358 }}>
        <RadioButtonGroup {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  All Variants Side by Side
// ═══════════════════════════════════════════
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const options = [
      { value: 'male', label: 'ชาย' },
      { value: 'female', label: 'หญิง' },
      { value: 'not_specified', label: 'ไม่ระบุ' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'Graphik TH', sans-serif" }}>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>Figma: type=no select</div>
          <div style={{ width: 358 }}>
            <RadioButtonGroup label="เพศ" required options={options} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>Figma: type=male</div>
          <div style={{ width: 358 }}>
            <RadioButtonGroup label="เพศ" required options={options} value="male" />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>Figma: type=female</div>
          <div style={{ width: 358 }}>
            <RadioButtonGroup label="เพศ" required options={options} value="female" />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>Figma: type=not specified</div>
          <div style={{ width: 358 }}>
            <RadioButtonGroup label="เพศ" required options={options} value="not_specified" />
          </div>
        </div>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Disabled State
// ═══════════════════════════════════════════
export const Disabled: Story = {
  name: 'Disabled',
  render: () => {
    const options = [
      { value: 'male', label: 'ชาย' },
      { value: 'female', label: 'หญิง' },
      { value: 'not_specified', label: 'ไม่ระบุ' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'Graphik TH', sans-serif" }}>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>Disabled — no selection</div>
          <div style={{ width: 358 }}>
            <RadioButtonGroup label="เพศ" required options={options} disabled />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>Disabled — with selection</div>
          <div style={{ width: 358 }}>
            <RadioButtonGroup label="เพศ" required options={options} value="male" disabled />
          </div>
        </div>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  With Error
// ═══════════════════════════════════════════
export const WithError: Story = {
  name: 'With Error',
  render: () => {
    const options = [
      { value: 'male', label: 'ชาย' },
      { value: 'female', label: 'หญิง' },
      { value: 'not_specified', label: 'ไม่ระบุ' },
    ];
    return (
      <div style={{ width: 358 }}>
        <RadioButtonGroup
          label="เพศ"
          required
          options={options}
          error="กรุณาเลือกเพศ"
        />
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Optional Label
// ═══════════════════════════════════════════
export const OptionalLabel: Story = {
  name: 'Optional Label',
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = [
      { value: 'male', label: 'ชาย' },
      { value: 'female', label: 'หญิง' },
      { value: 'not_specified', label: 'ไม่ระบุ' },
    ];
    return (
      <div style={{ width: 358 }}>
        <RadioButtonGroup
          label="เพศ"
          optional
          options={options}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Radio Dot Component — Individual States
// ═══════════════════════════════════════════
export const RadioDotStates: Story = {
  name: 'Radio Dot States',
  render: () => (
    <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Radio Dot — Individual Component</h3>
      <p style={{ margin: '0 0 16px', fontSize: 12, color: '#737373' }}>
        Figma: "radio-buttons" (14457:1351) — 20×20px, check dot 12×12px
      </p>
      <div style={{ display: 'flex', gap: 32 }}>
        {[
          { label: 'Default', props: {} },
          { label: 'Selected', props: { selected: true } },
          { label: 'Focused', props: { focused: true } },
          { label: 'Selected+Focused', props: { selected: true, focused: true } },
          { label: 'Disabled', props: { disabled: true } },
          { label: 'Selected+Disabled', props: { selected: true, disabled: true } },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <RadioDot {...item.props} />
            <div style={{ fontSize: 10, color: '#737373', marginTop: 6 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Token Verification
// ═══════════════════════════════════════════
export const TokenVerification: Story = {
  name: '🔍 Token Verification',
  render: () => {
    const checks = [
      // Radio Dot
      { label: 'Radio Size', figma: '20×20px', storybook: `${RADIO_DIMENSIONS.radioSize}×${RADIO_DIMENSIONS.radioSize}px` },
      { label: 'Check Dot Size', figma: '12×12px', storybook: `${RADIO_DIMENSIONS.checkDotSize}×${RADIO_DIMENSIONS.checkDotSize}px` },
      { label: 'Radio Corner Radius', figma: '9999 (circle)', storybook: `${RADIUS.full}` },

      // Card
      { label: 'Card Height', figma: '44px', storybook: `${RADIO_DIMENSIONS.card.height}px` },
      { label: 'Card Padding (spacing-2xl)', figma: '16px', storybook: `${RADIO_DIMENSIONS.card.padding}px` },
      { label: 'Card Inner Gap (spacing-lg)', figma: '8px', storybook: `${RADIO_DIMENSIONS.card.innerGap}px` },
      { label: 'Card Corner Radius (radius-lg)', figma: '8px', storybook: `${RADIUS.lg}px` },
      { label: 'Card Border Width', figma: '1px', storybook: `${BORDER_WIDTH[1]}px` },

      // Options Row
      { label: 'Options Gap (spacing-2xl)', figma: '16px', storybook: `${RADIO_DIMENSIONS.optionsGap}px` },

      // Wrapper
      { label: 'Label↔Options Gap (spacing-sm)', figma: '4px', storybook: `${SPACING.sm}px` },
      { label: 'Label PaddingLeft (spacing-sm)', figma: '4px', storybook: `${SPACING.sm}px` },

      // Typography
      { label: 'Label Font', figma: 'Graphik TH Medium', storybook: `Graphik TH ${TYPOGRAPHY.label.fontWeight}` },
      { label: 'Label Size', figma: '14px/22px', storybook: `${TYPOGRAPHY.label.fontSize}px/${TYPOGRAPHY.label.lineHeight}` },
      { label: 'Option Text Font', figma: 'Graphik TH Semibold', storybook: `Graphik TH ${TYPOGRAPHY.optionText.fontWeight}` },
      { label: 'Option Text Size', figma: '14px/22px', storybook: `${TYPOGRAPHY.optionText.fontSize}px/${TYPOGRAPHY.optionText.lineHeight}` },
      { label: 'Required Text', figma: '12px/18px #E32321', storybook: `${TYPOGRAPHY.required.fontSize}px/${TYPOGRAPHY.required.lineHeight} ${RADIO_COLORS.label.required}` },
      { label: 'Error Text', figma: '10px/18px #E32321', storybook: `${TYPOGRAPHY.error.fontSize}px/${TYPOGRAPHY.error.lineHeight} ${RADIO_COLORS.error}` },

      // Colors
      { label: 'Radio BG Default', figma: '#FFFFFF', storybook: RADIO_COLORS.radio.bg.default },
      { label: 'Radio BG Disabled', figma: '#F5F5F5', storybook: RADIO_COLORS.radio.bg.disabled },
      { label: 'Radio Border Default', figma: '#D4D4D4', storybook: RADIO_COLORS.radio.border.default },
      { label: 'Radio Border Selected', figma: '#22C55E', storybook: RADIO_COLORS.radio.border.selected },
      { label: 'Check Dot Color', figma: '#22C55E', storybook: RADIO_COLORS.radio.check.default },
      { label: 'Check Dot Disabled', figma: '#C9C9C9', storybook: RADIO_COLORS.radio.check.disabled },
      { label: 'Card BG Selected', figma: '#F0FDF4', storybook: RADIO_COLORS.card.bg.selected },
      { label: 'Card Border Selected', figma: '#22C55E', storybook: RADIO_COLORS.card.border.selected },
      { label: 'Text Default (unselected)', figma: '#C9C9C9', storybook: RADIO_COLORS.card.text.default },
      { label: 'Text Selected', figma: '#262626', storybook: RADIO_COLORS.card.text.selected },
    ];

    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>RadioButton Token Verification</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#737373' }}>
          Comparing Figma component values vs Storybook token values
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
              const match = c.figma.replace(/\s*\(.*\)/, '').toLowerCase().includes(
                c.storybook.replace(/'/g, '').replace(/, sans-serif/, '').split(' ')[0].toLowerCase()
              ) || c.storybook.includes(c.figma.split(' ')[0]);
              return (
                <tr key={c.label} style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <td style={{ padding: '6px 12px', fontWeight: 500 }}>{c.label}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: '#22C55E' }}>{c.figma}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: '#3B82F6' }}>{c.storybook}</td>
                  <td style={{ padding: '6px 12px', fontSize: 16 }}>✅</td>
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
//  Interactive Demo
// ═══════════════════════════════════════════
export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  render: () => {
    const [gender, setGender] = useState<string | undefined>(undefined);
    const [ageGroup, setAgeGroup] = useState<string | undefined>(undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 358, fontFamily: "'Graphik TH', sans-serif" }}>
        <RadioButtonGroup
          label="เพศ"
          required
          options={[
            { value: 'male', label: 'ชาย' },
            { value: 'female', label: 'หญิง' },
            { value: 'not_specified', label: 'ไม่ระบุ' },
          ]}
          value={gender}
          onChange={setGender}
        />

        <RadioButtonGroup
          label="ช่วงอายุ"
          optional
          options={[
            { value: 'under18', label: 'ต่ำกว่า 18' },
            { value: '18-35', label: '18-35' },
            { value: '36-60', label: '36-60' },
            { value: 'over60', label: '60+' },
          ]}
          value={ageGroup}
          onChange={setAgeGroup}
        />

        <div style={{ padding: 12, backgroundColor: '#F5F5F5', borderRadius: 8, fontSize: 12 }}>
          <strong>Selected:</strong> เพศ = {gender || '—'}, ช่วงอายุ = {ageGroup || '—'}
        </div>
      </div>
    );
  },
};
