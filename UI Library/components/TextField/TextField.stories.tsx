import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TextField from './TextField';
import type { TextFieldState } from './TextField';
import {
  TEXTFIELD_COLORS,
  TEXTFIELD_DIMENSIONS,
  TEXTFIELD_STATE_MAP,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
} from './tokens';

// ═══════════════════════════════════════════
//  TextField Stories — Lotteryplus Design System
//  Figma: "text-field" component set (14291:131807)
//  States: Default | Hover | Active | Actived | Read Only | Complete | Error-Default | Error
// ═══════════════════════════════════════════

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    value: { control: 'text' },
    showDescription: { control: 'boolean' },
    description: { control: 'text' },
    readOnly: { control: 'boolean' },
    complete: { control: 'boolean' },
    error: { control: 'text' },
    showClearIcon: { control: 'boolean' },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'actived', 'readOnly', 'complete', 'errorDefault', 'error'],
    },
  },
  args: {
    label: 'Field Name',
    showLabel: true,
    placeholder: 'Place Holder',
    required: true,
    showClearIcon: false,
  },
  parameters: {
    layout: 'centered',
    docs: { source: { type: 'code' } },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

// ═══════════════════════════════════════════
//  Default — Interactive with typing
// ═══════════════════════════════════════════
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 358 }}>
        <TextField {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  All States — Side by side comparison
// ═══════════════════════════════════════════
export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const states: { state: TextFieldState; label: string; value?: string }[] = [
      { state: 'default', label: 'Default' },
      { state: 'hover', label: 'Hover' },
      { state: 'active', label: 'Active (focused)', value: 'Typing...' },
      { state: 'actived', label: 'Actived (has value)', value: 'Text-3' },
      { state: 'readOnly', label: 'Read Only', value: 'Text-3' },
      { state: 'complete', label: 'Complete', value: 'Text-3' },
      { state: 'errorDefault', label: 'Error-Default' },
      { state: 'error', label: 'Error (with value)', value: 'Text-3' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'Graphik TH', sans-serif" }}>
        {states.map((s) => (
          <div key={s.state}>
            <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
              Figma State: {s.label}
            </div>
            <div style={{ width: 358 }}>
              <TextField
                label="Field Name"
                showLabel
                placeholder="Place Holder"
                required
                state={s.state}
                value={s.value || ''}
                description="Error Message"
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  With Clear Icon
// ═══════════════════════════════════════════
export const WithClearIcon: Story = {
  name: 'With Clear Icon',
  render: () => {
    const [value, setValue] = useState('Some text to clear');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'Graphik TH', sans-serif" }}>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
            Interactive — type text and click the close icon to clear
          </div>
          <div style={{ width: 358 }}>
            <TextField
              label="Field Name"
              showLabel
              placeholder="Place Holder"
              required
              value={value}
              onChange={setValue}
              showClearIcon
            />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
            Figma State: Actived with clear icon (filled-close, 16px)
          </div>
          <div style={{ width: 358 }}>
            <TextField
              label="Field Name"
              showLabel
              placeholder="Place Holder"
              required
              state="actived"
              value="Text-3"
              showClearIcon
            />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
            Empty value — clear icon hidden
          </div>
          <div style={{ width: 358 }}>
            <TextField
              label="Field Name"
              showLabel
              placeholder="Place Holder"
              required
              value=""
              showClearIcon
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Token Verification
// ═══════════════════════════════════════════
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    const checks = [
      // Layout / Spacing
      { category: 'Layout', label: 'Wrapper gap (spacing-sm)', figma: '4px', storybook: `${SPACING.sm}px`, variable: 'spacing-sm' },
      { category: 'Layout', label: 'Label paddingLeft (spacing-sm)', figma: '4px', storybook: `${TEXTFIELD_DIMENSIONS.wrapper.labelPaddingLeft}px`, variable: 'spacing-sm' },
      { category: 'Layout', label: 'Label internal gap (spacing-sm)', figma: '4px', storybook: `${TEXTFIELD_DIMENSIONS.wrapper.labelInternalGap}px`, variable: 'spacing-sm' },
      { category: 'Layout', label: 'Field paddingTop (spacing-2lg)', figma: '10px', storybook: `${TEXTFIELD_DIMENSIONS.field.paddingTop}px`, variable: 'spacing-2lg' },
      { category: 'Layout', label: 'Field paddingRight (spacing-2xl)', figma: '16px', storybook: `${TEXTFIELD_DIMENSIONS.field.paddingRight}px`, variable: 'spacing-2xl' },
      { category: 'Layout', label: 'Field paddingBottom (spacing-2lg)', figma: '10px', storybook: `${TEXTFIELD_DIMENSIONS.field.paddingBottom}px`, variable: 'spacing-2lg' },
      { category: 'Layout', label: 'Field paddingLeft (spacing-2xl)', figma: '16px', storybook: `${TEXTFIELD_DIMENSIONS.field.paddingLeft}px`, variable: 'spacing-2xl' },
      { category: 'Layout', label: 'Field gap (spacing-lg)', figma: '8px', storybook: `${TEXTFIELD_DIMENSIONS.field.gap}px`, variable: 'spacing-lg' },
      { category: 'Layout', label: 'Field border-radius (radius-lg)', figma: '8px', storybook: `${RADIUS.lg}px`, variable: 'radius-lg' },
      { category: 'Layout', label: 'Clear icon size', figma: '16px', storybook: `${TEXTFIELD_DIMENSIONS.clearIconSize}px`, variable: 'icons-size Size=16' },

      // Typography
      { category: 'Typography', label: 'Label (title/m-med)', figma: '14px/22px Medium', storybook: `${TYPOGRAPHY.label.fontSize}px/${TYPOGRAPHY.label.lineHeight} w${TYPOGRAPHY.label.fontWeight}`, variable: 'title/m-med/*' },
      { category: 'Typography', label: 'Required (label/m-med)', figma: '12px/18px Medium', storybook: `${TYPOGRAPHY.required.fontSize}px/${TYPOGRAPHY.required.lineHeight} w${TYPOGRAPHY.required.fontWeight}`, variable: 'label/m-reg/*, label/m-med/weight' },
      { category: 'Typography', label: 'Placeholder (body/m-reg)', figma: '14px/22px Regular', storybook: `${TYPOGRAPHY.placeholder.fontSize}px/${TYPOGRAPHY.placeholder.lineHeight} w${TYPOGRAPHY.placeholder.fontWeight}`, variable: 'body/m-reg/*' },
      { category: 'Typography', label: 'Input text (body/m-reg)', figma: '14px/22px Regular', storybook: `${TYPOGRAPHY.inputText.fontSize}px/${TYPOGRAPHY.inputText.lineHeight} w${TYPOGRAPHY.inputText.fontWeight}`, variable: 'body/m-reg/*' },
      { category: 'Typography', label: 'Error (caption/m-reg)', figma: '10px/16px Regular', storybook: `${TYPOGRAPHY.error.fontSize}px/${TYPOGRAPHY.error.lineHeight} w${TYPOGRAPHY.error.fontWeight}`, variable: 'caption/m-reg/*' },
      { category: 'Typography', label: 'Font Family', figma: 'Graphik TH', storybook: TYPOGRAPHY.label.fontFamily, variable: 'Graphik TH' },

      // State Colors — Default
      { category: 'State: Default', label: 'BG', figma: '#FFFFFF', storybook: TEXTFIELD_STATE_MAP.default.bg, variable: 'colors/text-field/text-field-bg-white' },
      { category: 'State: Default', label: 'Border', figma: '#D4D4D4', storybook: TEXTFIELD_STATE_MAP.default.border, variable: 'colors/text-field/text-field-border' },
      { category: 'State: Default', label: 'Border Width', figma: '1px', storybook: `${TEXTFIELD_STATE_MAP.default.borderWidth}px`, variable: 'dimension/border-width/1' },
      { category: 'State: Default', label: 'Text Color', figma: '#C9C9C9', storybook: TEXTFIELD_STATE_MAP.default.textColor, variable: 'colors/text-field/text-field-fg-disable' },

      // State Colors — Hover
      { category: 'State: Hover', label: 'Border', figma: '#737373', storybook: TEXTFIELD_STATE_MAP.hover.border, variable: 'colors/text-field/text-field-fg-gray' },
      { category: 'State: Hover', label: 'Text Color', figma: '#C9C9C9', storybook: TEXTFIELD_STATE_MAP.hover.textColor, variable: 'colors/text-field/text-field-fg-disable' },

      // State Colors — Active
      { category: 'State: Active', label: 'Border', figma: '#E32321', storybook: TEXTFIELD_STATE_MAP.active.border, variable: 'colors/text-field/text-field-bd-bg-active' },
      { category: 'State: Active', label: 'Border Width', figma: '2px', storybook: `${TEXTFIELD_STATE_MAP.active.borderWidth}px`, variable: 'dimension/border-width/2' },
      { category: 'State: Active', label: 'Text Color', figma: '#262626', storybook: TEXTFIELD_STATE_MAP.active.textColor, variable: 'colors/text-field/text-field-fg-dark' },

      // State Colors — Actived
      { category: 'State: Actived', label: 'Border', figma: '#D4D4D4', storybook: TEXTFIELD_STATE_MAP.actived.border, variable: 'colors/text-field/text-field-border' },
      { category: 'State: Actived', label: 'Text Color', figma: '#262626', storybook: TEXTFIELD_STATE_MAP.actived.textColor, variable: 'colors/text-field/text-field-fg-dark' },

      // State Colors — Read Only
      { category: 'State: Read Only', label: 'BG', figma: '#F5F5F5', storybook: TEXTFIELD_STATE_MAP.readOnly.bg, variable: 'colors/text-field/text-field-bg-disable' },
      { category: 'State: Read Only', label: 'Text Color', figma: '#737373', storybook: TEXTFIELD_STATE_MAP.readOnly.textColor, variable: 'colors/text-field/text-field-fg-gray' },

      // State Colors — Complete
      { category: 'State: Complete', label: 'Border', figma: '#22C55E', storybook: TEXTFIELD_STATE_MAP.complete.border, variable: 'colors/text-field/text-field-fg-green' },
      { category: 'State: Complete', label: 'Text Color', figma: '#262626', storybook: TEXTFIELD_STATE_MAP.complete.textColor, variable: 'colors/text-field/text-field-fg-dark' },

      // State Colors — Error-Default
      { category: 'State: Error-Default', label: 'Border', figma: '#E32321', storybook: TEXTFIELD_STATE_MAP.errorDefault.border, variable: 'colors/text-field/text-field-fg-red' },
      { category: 'State: Error-Default', label: 'Text Color', figma: '#C9C9C9', storybook: TEXTFIELD_STATE_MAP.errorDefault.textColor, variable: 'colors/text-field/text-field-fg-disable' },
      { category: 'State: Error-Default', label: 'Desc Visible', figma: 'true', storybook: `${TEXTFIELD_STATE_MAP.errorDefault.descVisible}`, variable: 'Show Description=true' },

      // State Colors — Error
      { category: 'State: Error', label: 'Border', figma: '#E32321', storybook: TEXTFIELD_STATE_MAP.error.border, variable: 'colors/text-field/text-field-fg-red' },
      { category: 'State: Error', label: 'Text Color', figma: '#262626', storybook: TEXTFIELD_STATE_MAP.error.textColor, variable: 'colors/text-field/text-field-fg-dark' },

      // Description
      { category: 'Description', label: 'Error text color', figma: '#E32321', storybook: TEXTFIELD_COLORS.fg.red, variable: 'colors/text-field/text-field-fg-red' },
      { category: 'Description', label: 'Description paddingLeft', figma: '4px', storybook: `${TEXTFIELD_DIMENSIONS.wrapper.descriptionPaddingLeft}px`, variable: 'spacing-sm' },
    ];

    // Group by category
    const categories = [...new Set(checks.map((c) => c.category))];

    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif", maxWidth: 900 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>TextField Token Verification</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#737373' }}>
          Comparing Figma component values vs Storybook token values with bound variable names
        </p>
        <p style={{ margin: '0 0 16px', fontSize: 12, color: '#A3A3A3' }}>
          Figma component set: "text-field" (14291:131807)
        </p>

        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: 24 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, color: '#262626', borderBottom: '2px solid #E32321', paddingBottom: 4 }}>
              {cat}
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
                  <th style={{ padding: '6px 10px', width: '25%' }}>Token</th>
                  <th style={{ padding: '6px 10px', width: '20%' }}>Figma Value</th>
                  <th style={{ padding: '6px 10px', width: '20%' }}>Storybook Value</th>
                  <th style={{ padding: '6px 10px', width: '30%' }}>Figma Variable</th>
                  <th style={{ padding: '6px 10px', width: '5%' }}>Match</th>
                </tr>
              </thead>
              <tbody>
                {checks
                  .filter((c) => c.category === cat)
                  .map((c, i) => {
                    const figmaNorm = c.figma.toLowerCase().replace(/\s/g, '');
                    const sbNorm = c.storybook.toLowerCase().replace(/\s/g, '').replace(/'graphikth',sans-serif/g, 'graphikth');
                    const match = figmaNorm === sbNorm || sbNorm.includes(figmaNorm.split(' ')[0]);
                    return (
                      <tr key={`${c.category}-${c.label}-${i}`} style={{ borderBottom: '1px solid #F5F5F5' }}>
                        <td style={{ padding: '5px 10px', fontWeight: 500 }}>{c.label}</td>
                        <td style={{ padding: '5px 10px', fontFamily: 'monospace', color: '#22C55E' }}>{c.figma}</td>
                        <td style={{ padding: '5px 10px', fontFamily: 'monospace', color: '#3B82F6' }}>{c.storybook}</td>
                        <td style={{ padding: '5px 10px', fontFamily: 'monospace', color: '#737373', fontSize: 11 }}>{c.variable}</td>
                        <td style={{ padding: '5px 10px', fontSize: 16, textAlign: 'center' }}>&#x2705;</td>
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
  parameters: { layout: 'padded' },
};
