import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Dropdown from './Dropdown';
import type { DropdownState, DropdownOption } from './Dropdown';
import {
  DROPDOWN_COLORS,
  DROPDOWN_DIMENSIONS,
  DROPDOWN_STATE_MAP,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  SHADOW,
} from './tokens';

// ═══════════════════════════════════════════
//  Dropdown Stories — Lotteryplus Design System
//  Figma: "dropdown" component set (14291:131904)
//  States: Default | Hover | Active | Actived | Read Only | Complete | Error-Default | Error
// ═══════════════════════════════════════════

const DEFAULT_OPTIONS: DropdownOption[] = [
  { value: 'text-2', label: 'Text-2' },
  { value: 'text-3', label: 'Text-3' },
  { value: 'text-4', label: 'Text-4' },
  { value: 'text-5', label: 'Text-5' },
  { value: 'text-6', label: 'Text-6' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    description: { control: 'text' },
    readOnly: { control: 'boolean' },
    complete: { control: 'boolean' },
    error: { control: 'text' },
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
    options: DEFAULT_OPTIONS,
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// ═══════════════════════════════════════════
//  Default — Interactive with controls
// ═══════════════════════════════════════════
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div style={{ width: 358 }}>
        <Dropdown {...args} value={value} onChange={setValue} />
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
    const states: { state: DropdownState; label: string; value?: string }[] = [
      { state: 'default', label: 'Default' },
      { state: 'hover', label: 'Hover' },
      { state: 'actived', label: 'Actived (value selected)', value: 'text-3' },
      { state: 'readOnly', label: 'Read Only', value: 'text-3' },
      { state: 'complete', label: 'Complete', value: 'text-3' },
      { state: 'errorDefault', label: 'Error-Default' },
      { state: 'error', label: 'Error (with value)', value: 'text-3' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'Graphik TH', sans-serif" }}>
        {states.map((s) => (
          <div key={s.state}>
            <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
              Figma State: {s.label}
            </div>
            <div style={{ width: 358 }}>
              <Dropdown
                label="Field Name"
                showLabel
                placeholder="Place Holder"
                required
                options={DEFAULT_OPTIONS}
                state={s.state}
                value={s.value}
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
//  With Dropdown Open (Active state)
// ═══════════════════════════════════════════
export const WithDropdownOpen: Story = {
  name: 'With Dropdown Open',
  render: () => {
    const [value, setValue] = useState<string>('text-3');

    return (
      <div style={{ width: 358, paddingBottom: 220, fontFamily: "'Graphik TH', sans-serif" }}>
        <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
          Figma State: Active (dropdown open) — click the field to toggle
        </div>
        <Dropdown
          label="Field Name"
          showLabel
          placeholder="Place Holder"
          required
          options={DEFAULT_OPTIONS}
          value={value}
          onChange={setValue}
        />
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
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'Graphik TH', sans-serif" }}>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
            Figma State: Error-Default (no value selected)
          </div>
          <div style={{ width: 358 }}>
            <Dropdown
              label="Field Name"
              showLabel
              placeholder="Place Holder"
              required
              options={DEFAULT_OPTIONS}
              error="Error Message"
            />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
            Figma State: Error (with value selected)
          </div>
          <div style={{ width: 358 }}>
            <Dropdown
              label="Field Name"
              showLabel
              placeholder="Place Holder"
              required
              options={DEFAULT_OPTIONS}
              value="text-3"
              error="Error Message"
            />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
            Interactive error dropdown — select a value to see Error state
          </div>
          <div style={{ width: 358, paddingBottom: 180 }}>
            <Dropdown
              label="Field Name"
              showLabel
              placeholder="Place Holder"
              required
              options={DEFAULT_OPTIONS}
              value={value}
              onChange={setValue}
              error="Error Message"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Read Only & Complete
// ═══════════════════════════════════════════
export const ReadOnlyAndComplete: Story = {
  name: 'Read Only & Complete',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'Graphik TH', sans-serif" }}>
      <div>
        <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
          Figma State: Read Only — BG #F5F5F5, text #737373, non-interactive
        </div>
        <div style={{ width: 358 }}>
          <Dropdown
            label="Field Name"
            showLabel
            placeholder="Place Holder"
            required
            options={DEFAULT_OPTIONS}
            value="text-3"
            readOnly
          />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#737373', marginBottom: 8 }}>
          Figma State: Complete — Border #22C55E (green)
        </div>
        <div style={{ width: 358 }}>
          <Dropdown
            label="Field Name"
            showLabel
            placeholder="Place Holder"
            required
            options={DEFAULT_OPTIONS}
            value="text-3"
            complete
          />
        </div>
      </div>
    </div>
  ),
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
      { category: 'Layout', label: 'Label paddingLeft (spacing-sm)', figma: '4px', storybook: `${DROPDOWN_DIMENSIONS.wrapper.labelPaddingLeft}px`, variable: 'spacing-sm' },
      { category: 'Layout', label: 'Label internal gap (spacing-sm)', figma: '4px', storybook: `${DROPDOWN_DIMENSIONS.wrapper.labelInternalGap}px`, variable: 'spacing-sm' },
      { category: 'Layout', label: 'Field paddingTop (spacing-2lg)', figma: '10px', storybook: `${DROPDOWN_DIMENSIONS.field.paddingTop}px`, variable: 'spacing-2lg' },
      { category: 'Layout', label: 'Field paddingRight (spacing-lg)', figma: '8px', storybook: `${DROPDOWN_DIMENSIONS.field.paddingRight}px`, variable: 'spacing-lg' },
      { category: 'Layout', label: 'Field paddingBottom (spacing-2lg)', figma: '10px', storybook: `${DROPDOWN_DIMENSIONS.field.paddingBottom}px`, variable: 'spacing-2lg' },
      { category: 'Layout', label: 'Field paddingLeft (spacing-2xl)', figma: '16px', storybook: `${DROPDOWN_DIMENSIONS.field.paddingLeft}px`, variable: 'spacing-2xl' },
      { category: 'Layout', label: 'Field gap (spacing-lg)', figma: '8px', storybook: `${DROPDOWN_DIMENSIONS.field.gap}px`, variable: 'spacing-lg' },
      { category: 'Layout', label: 'Field border-radius (radius-lg)', figma: '8px', storybook: `${RADIUS.lg}px`, variable: 'radius-lg' },
      { category: 'Layout', label: 'Icon size', figma: '24px', storybook: `${DROPDOWN_DIMENSIONS.iconSize}px`, variable: 'icons-size Size=24' },

      // Dropdown List
      { category: 'Dropdown List', label: 'List padding (spacing-lg)', figma: '8px', storybook: `${DROPDOWN_DIMENSIONS.list.padding}px`, variable: 'spacing-lg' },
      { category: 'Dropdown List', label: 'List item gap (spacing-2lg)', figma: '10px', storybook: `${DROPDOWN_DIMENSIONS.list.gap}px`, variable: 'spacing-2lg' },
      { category: 'Dropdown List', label: 'List border-radius (radius-lg)', figma: '8px', storybook: `${RADIUS.lg}px`, variable: 'radius-lg' },
      { category: 'Dropdown List', label: 'List border', figma: '1px #D4D4D4', storybook: `${BORDER_WIDTH[1]}px ${DROPDOWN_COLORS.border.default}`, variable: 'dimension/border-width/1, colors/dropdown/dropdown-border' },
      { category: 'Dropdown List', label: 'List shadow (dimension/shadow/sm)', figma: '0px 1px 2px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.10)', storybook: SHADOW.sm, variable: 'dimension/shadow/sm' },

      // Option Items
      { category: 'Option Item', label: 'Option padding (spacing-sm/spacing-2xl)', figma: '4/16/4/16', storybook: `${DROPDOWN_DIMENSIONS.option.paddingTop}/${DROPDOWN_DIMENSIONS.option.paddingRight}/${DROPDOWN_DIMENSIONS.option.paddingBottom}/${DROPDOWN_DIMENSIONS.option.paddingLeft}`, variable: 'spacing-sm, spacing-2xl' },
      { category: 'Option Item', label: 'Option border-radius (radius-lg)', figma: '8px', storybook: `${RADIUS.lg}px`, variable: 'radius-lg' },
      { category: 'Option Item', label: 'Option BG default', figma: '#FFFFFF', storybook: DROPDOWN_COLORS.option.bgDefault, variable: 'colors/dropdown/dropdown-bg-white' },
      { category: 'Option Item', label: 'Option BG hover', figma: '#E5E5E5', storybook: DROPDOWN_COLORS.option.bgHover, variable: 'colors/dropdown/dropdown-fg-soft-gray' },
      { category: 'Option Item', label: 'Option BG selected', figma: '#E32321', storybook: DROPDOWN_COLORS.option.bgSelected, variable: 'colors/dropdown/dropdown-fg-red' },
      { category: 'Option Item', label: 'Option text default', figma: '#262626', storybook: DROPDOWN_COLORS.option.textDefault, variable: 'colors/dropdown/dropdown-fg-dark' },
      { category: 'Option Item', label: 'Option text selected', figma: '#FFFFFF', storybook: DROPDOWN_COLORS.option.textSelected, variable: 'white' },

      // Typography
      { category: 'Typography', label: 'Label (title/m-med)', figma: '14px/22px Medium', storybook: `${TYPOGRAPHY.label.fontSize}px/${TYPOGRAPHY.label.lineHeight} w${TYPOGRAPHY.label.fontWeight}`, variable: 'title/m-med/*' },
      { category: 'Typography', label: 'Required (label/m-med)', figma: '12px/18px Medium', storybook: `${TYPOGRAPHY.required.fontSize}px/${TYPOGRAPHY.required.lineHeight} w${TYPOGRAPHY.required.fontWeight}`, variable: 'label/m-reg/*, label/m-med/weight' },
      { category: 'Typography', label: 'Placeholder (body/m-reg)', figma: '14px/22px Regular', storybook: `${TYPOGRAPHY.placeholder.fontSize}px/${TYPOGRAPHY.placeholder.lineHeight} w${TYPOGRAPHY.placeholder.fontWeight}`, variable: 'body/m-reg/*' },
      { category: 'Typography', label: 'Option normal (body/m-reg)', figma: '14px/22px Regular', storybook: `${TYPOGRAPHY.optionNormal.fontSize}px/${TYPOGRAPHY.optionNormal.lineHeight} w${TYPOGRAPHY.optionNormal.fontWeight}`, variable: 'body/m-reg/*' },
      { category: 'Typography', label: 'Option selected (body/m-med)', figma: '14px/22px Medium', storybook: `${TYPOGRAPHY.optionSelected.fontSize}px/${TYPOGRAPHY.optionSelected.lineHeight} w${TYPOGRAPHY.optionSelected.fontWeight}`, variable: 'body/m-med/*' },
      { category: 'Typography', label: 'Error (caption/m-reg)', figma: '10px/16px Regular', storybook: `${TYPOGRAPHY.error.fontSize}px/${TYPOGRAPHY.error.lineHeight} w${TYPOGRAPHY.error.fontWeight}`, variable: 'caption/m-reg/*' },
      { category: 'Typography', label: 'Font Family', figma: 'Graphik TH', storybook: TYPOGRAPHY.label.fontFamily, variable: 'Graphik TH' },

      // State Colors — Field BG
      { category: 'State: Default', label: 'BG', figma: '#FFFFFF', storybook: DROPDOWN_STATE_MAP.default.bg, variable: 'colors/dropdown/dropdown-bg-white' },
      { category: 'State: Default', label: 'Border', figma: '#D4D4D4', storybook: DROPDOWN_STATE_MAP.default.border, variable: 'colors/dropdown/dropdown-border' },
      { category: 'State: Default', label: 'Border Width', figma: '1px', storybook: `${DROPDOWN_STATE_MAP.default.borderWidth}px`, variable: 'dimension/border-width/1' },
      { category: 'State: Default', label: 'Text Color', figma: '#C9C9C9', storybook: DROPDOWN_STATE_MAP.default.textColor, variable: 'colors/dropdown/dropdown-fg-disable' },
      { category: 'State: Default', label: 'Icon Color', figma: '#C9C9C9', storybook: DROPDOWN_STATE_MAP.default.iconColor, variable: 'colors/dropdown/dropdown-fg-disable' },

      { category: 'State: Hover', label: 'Border', figma: '#737373', storybook: DROPDOWN_STATE_MAP.hover.border, variable: 'colors/dropdown/dropdown-fg-gray' },
      { category: 'State: Hover', label: 'Icon Color', figma: '#737373', storybook: DROPDOWN_STATE_MAP.hover.iconColor, variable: 'colors/dropdown/dropdown-fg-gray' },

      { category: 'State: Active', label: 'Border', figma: '#E32321', storybook: DROPDOWN_STATE_MAP.active.border, variable: 'colors/dropdown/dropdown-bd-bg-active' },
      { category: 'State: Active', label: 'Border Width', figma: '2px', storybook: `${DROPDOWN_STATE_MAP.active.borderWidth}px`, variable: 'dimension/border-width/2' },
      { category: 'State: Active', label: 'Text Color', figma: '#262626', storybook: DROPDOWN_STATE_MAP.active.textColor, variable: 'colors/dropdown/dropdown-fg-dark' },

      { category: 'State: Actived', label: 'Border', figma: '#D4D4D4', storybook: DROPDOWN_STATE_MAP.actived.border, variable: 'colors/dropdown/dropdown-border' },
      { category: 'State: Actived', label: 'Text Color', figma: '#262626', storybook: DROPDOWN_STATE_MAP.actived.textColor, variable: 'colors/dropdown/dropdown-fg-dark' },

      { category: 'State: Read Only', label: 'BG', figma: '#F5F5F5', storybook: DROPDOWN_STATE_MAP.readOnly.bg, variable: 'colors/dropdown/dropdown-bg-disable' },
      { category: 'State: Read Only', label: 'Text Color', figma: '#737373', storybook: DROPDOWN_STATE_MAP.readOnly.textColor, variable: 'colors/dropdown/dropdown-fg-gray' },
      { category: 'State: Read Only', label: 'Icon Color', figma: '#C9C9C9', storybook: DROPDOWN_STATE_MAP.readOnly.iconColor, variable: 'colors/dropdown/dropdown-fg-disable' },

      { category: 'State: Complete', label: 'Border', figma: '#22C55E', storybook: DROPDOWN_STATE_MAP.complete.border, variable: 'colors/dropdown/dropdown-fg-green' },

      { category: 'State: Error-Default', label: 'Border', figma: '#E32321', storybook: DROPDOWN_STATE_MAP.errorDefault.border, variable: 'colors/dropdown/dropdown-fg-red' },
      { category: 'State: Error-Default', label: 'Text Color', figma: '#C9C9C9', storybook: DROPDOWN_STATE_MAP.errorDefault.textColor, variable: 'colors/dropdown/dropdown-fg-disable' },
      { category: 'State: Error-Default', label: 'Desc Visible', figma: 'true', storybook: `${DROPDOWN_STATE_MAP.errorDefault.descVisible}`, variable: 'Show Description=true' },

      { category: 'State: Error', label: 'Border', figma: '#E32321', storybook: DROPDOWN_STATE_MAP.error.border, variable: 'colors/dropdown/dropdown-fg-red' },
      { category: 'State: Error', label: 'Text Color', figma: '#262626', storybook: DROPDOWN_STATE_MAP.error.textColor, variable: 'colors/dropdown/dropdown-fg-dark' },

      // Description
      { category: 'Description', label: 'Error text color', figma: '#E32321', storybook: DROPDOWN_COLORS.fg.red, variable: 'colors/dropdown/dropdown-fg-red' },
      { category: 'Description', label: 'Description paddingLeft', figma: '4px', storybook: `${DROPDOWN_DIMENSIONS.wrapper.descriptionPaddingLeft}px`, variable: 'spacing-sm' },
    ];

    // Group by category
    const categories = [...new Set(checks.map((c) => c.category))];

    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif", maxWidth: 900 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Dropdown Token Verification</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#737373' }}>
          Comparing Figma component values vs Storybook token values with bound variable names
        </p>
        <p style={{ margin: '0 0 16px', fontSize: 12, color: '#A3A3A3' }}>
          Figma component set: "dropdown" (14291:131904)
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
                  <th style={{ padding: '6px 10px', width: '30%' }}>Bound Variable</th>
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
