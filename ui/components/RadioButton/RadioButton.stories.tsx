import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import RadioButtonGroup, { RadioDot, RadioOption } from './RadioButton';
import {
  RADIO_COLOR_ROLES,
  RADIO_COLOR_TOKENS,
  RADIO_INTERACTION_STATES,
  RADIO_LAYOUT_CHAIN,
  RADIO_LAYOUT_VALUES,
  RADIO_OPTIONAL_SYS_TOKEN,
  RADIO_STATES,
  RADIO_TEXT_CHAIN,
  RADIO_TEXT_ROLES,
  radioColorToken,
  radioColorValue,
  radioOptionalColorValue,
  radioTextValues,
  type RadioColorRole,
  type RadioTextRole,
} from './tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  RadioButton Stories — Lotteryplus Design System
//  Figma: "radio-buttons" (14457:1351) + "Gender select" (14291:132236)
//
//  Values shown here are read from foundations/tokens.generated.ts, which is generated
//  from Figma via design.md + components.json + the radio-buttons overlay. Nothing on
//  this page is typed by hand, so a table can never claim a value the component does
//  not actually render.
// ═══════════════════════════════════════════

const sans = 'var(--sys-type-body-md-regular-family), sans-serif';
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const muted = 'var(--sys-color-text-tertiary-default)';
const hairline = '1px solid var(--sys-color-border-accent-gray-soft-light)';

const OPTIONS = [
  { value: 'male', label: 'ชาย' },
  { value: 'female', label: 'หญิง' },
  { value: 'not_specified', label: 'ไม่ระบุ' },
];

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Atoms/RadioButton',
  component: RadioButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    disabled: { control: 'boolean', description: 'Canonical state: disabled' },
    error: { control: 'text' },
  },
  args: {
    label: 'เพศ',
    required: true,
    options: OPTIONS,
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

// ═══════════════════════════════════════════
//  Default — no selection (Figma: type=no select)
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
//  Male selected (Figma: type=male)
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
//  Female selected (Figma: type=female)
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
//  Not specified selected (Figma: type=not specified)
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
//  All variants side by side
// ═══════════════════════════════════════════
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: sans }}>
      {[
        { caption: 'Figma: type=no select', value: undefined },
        { caption: 'Figma: type=male', value: 'male' },
        { caption: 'Figma: type=female', value: 'female' },
        { caption: 'Figma: type=not specified', value: 'not_specified' },
      ].map((row) => (
        <div key={row.caption}>
          <div style={{ fontSize: 12, color: muted, marginBottom: 8 }}>{row.caption}</div>
          <div style={{ width: 358 }}>
            <RadioButtonGroup label="เพศ" required options={OPTIONS} value={row.value} />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Disabled
// ═══════════════════════════════════════════
export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: sans }}>
      {[
        { caption: 'Disabled — no selection', value: undefined },
        { caption: 'Disabled — with selection', value: 'male' },
      ].map((row) => (
        <div key={row.caption}>
          <div style={{ fontSize: 12, color: muted, marginBottom: 8 }}>{row.caption}</div>
          <div style={{ width: 358 }}>
            <RadioButtonGroup label="เพศ" required options={OPTIONS} value={row.value} disabled />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  With error
// ═══════════════════════════════════════════
export const WithError: Story = {
  name: 'With Error',
  render: () => (
    <div style={{ width: 358 }}>
      <RadioButtonGroup label="เพศ" required options={OPTIONS} error="กรุณาเลือกเพศ" />
    </div>
  ),
};

// ═══════════════════════════════════════════
//  Optional label
// ═══════════════════════════════════════════
export const OptionalLabel: Story = {
  name: 'Optional Label',
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div style={{ width: 358 }}>
        <RadioButtonGroup label="เพศ" optional options={OPTIONS} value={value} onChange={setValue} />
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Radio dot — canonical state matrix
// ═══════════════════════════════════════════
export const RadioDotStates: Story = {
  name: 'Radio Dot States',
  render: () => (
    <div style={{ fontFamily: sans }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>
        Radio Dot — canonical states
      </h3>
      <p style={{ margin: '0 0 16px', fontSize: 12, color: muted }}>
        Figma "radio-buttons" (14457:1351) — {RADIO_LAYOUT_VALUES.size} circle, {RADIO_LAYOUT_VALUES.dotSize} check
        dot. `selected` is Figma's `type`; the columns are its `status`. The ripple appears
        on focus and active only.
      </p>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 16px', fontSize: 11, color: muted }} />
            {RADIO_INTERACTION_STATES.map((state) => (
              <th key={state} style={{ padding: '8px 16px', fontSize: 11, color: muted }}>
                {state}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[false, true].map((selected) => (
            <tr key={String(selected)}>
              <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600 }}>
                {selected ? 'selected' : 'not selected'}
              </td>
              {RADIO_INTERACTION_STATES.map((state) => (
                <td key={state} style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <RadioDot selected={selected} state={state} />
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

// ═══════════════════════════════════════════
//  Option card on its own
// ═══════════════════════════════════════════
export const OptionCard: Story = {
  name: 'Option Card',
  render: () => (
    <div style={{ display: 'flex', gap: 16, width: 420, fontFamily: sans }}>
      <RadioOption label="ชาย" />
      <RadioOption label="หญิง" selected />
      <RadioOption label="ไม่ระบุ" disabled />
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Token chain — every value read back from the generator
// ═══════════════════════════════════════════

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

const Swatch: React.FC<{ hex: string }> = ({ hex }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: 3,
        background: hex,
        border: hairline,
      }}
    />
    {hex}
  </span>
);

export const TokenVerification: Story = {
  name: '🔍 Token Chain',
  render: () => {
    const layoutKeys = Object.keys(RADIO_LAYOUT_VALUES) as Array<keyof typeof RADIO_LAYOUT_VALUES>;

    return (
      <div style={{ fontFamily: sans, maxWidth: 900 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>RadioButton token chain</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: muted, lineHeight: 1.6 }}>
          Every value flows Figma → design.md → components.json → tokens.css. Colours come
          from the <code style={{ fontFamily: mono }}>colors/radio-buttons</code> mirror;
          layout and typography from{' '}
          <code style={{ fontFamily: mono }}>components/radio-buttons.json</code>. The
          component renders the Tier 2 alias, the alias points at a Tier 1 semantic token,
          and that resolves to the literal in the third column. Nothing below is hand-typed.
        </p>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Layout &amp; sizing</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {layoutKeys.map((key) => (
              <tr key={key}>
                <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>{key}</td>
                <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
                  {RADIO_LAYOUT_CHAIN[key]}
                </td>
                <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>
                  {RADIO_LAYOUT_VALUES[key]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Typography by text role</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Role</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Family</th>
              <th style={th}>Size</th>
              <th style={th}>Line height</th>
              <th style={th}>Weight</th>
            </tr>
          </thead>
          <tbody>
            {RADIO_TEXT_ROLES.map((role: RadioTextRole) => {
              const v = radioTextValues(role);
              return (
                <tr key={role}>
                  <td style={{ ...td, fontFamily: sans }}>{role}</td>
                  <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
                    {RADIO_TEXT_CHAIN[role]}
                  </td>
                  <td style={td}>{v.fontFamily}</td>
                  <td style={td}>{v.fontSize}</td>
                  <td style={td}>{v.lineHeight}</td>
                  <td style={td}>{v.fontWeight}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p style={{ margin: '0 0 28px', fontSize: 12, color: muted, lineHeight: 1.6 }}>
          Size and line height are responsive — the literals above are the mobile mode;
          the desktop mode takes over from the <code style={{ fontFamily: mono }}>md</code>{' '}
          breakpoint up.
        </p>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colour by part and state</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Role</th>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {RADIO_COLOR_ROLES.map((role: RadioColorRole) => (
              <tr key={role}>
                <td style={{ ...td, fontFamily: sans }}>{role}</td>
                <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>
                  {radioColorToken(role)}
                </td>
                <td style={td}>
                  <Swatch hex={radioColorValue(role)} />
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ ...td, fontFamily: sans }}>label-optional-rest</td>
              <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
                --sys-{RADIO_OPTIONAL_SYS_TOKEN}
              </td>
              <td style={td}>
                <Swatch hex={radioOptionalColorValue()} />
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ margin: '12px 0 0', fontSize: 12, color: muted, lineHeight: 1.6 }}>
          The optional hint has no token in Figma's{' '}
          <code style={{ fontFamily: mono }}>colors/radio-buttons</code> group, so it binds
          straight to Tier 1. Everything else resolves through a{' '}
          <code style={{ fontFamily: mono }}>--radio-*</code> alias.
        </p>

        <h3 style={{ fontSize: 14, margin: '28px 0 8px' }}>Canonical states</h3>
        <p style={{ margin: 0, fontSize: 12, color: muted, lineHeight: 1.6 }}>
          {RADIO_STATES.join(' · ')} — `hover` and `active` reuse the rest colours because
          Figma's component set models status as default / focused / disabled only; the
          ripple is what changes on press.
        </p>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Interactive demo
// ═══════════════════════════════════════════
export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  render: () => {
    const [gender, setGender] = useState<string | undefined>(undefined);
    const [ageGroup, setAgeGroup] = useState<string | undefined>(undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 358, fontFamily: sans }}>
        <RadioButtonGroup
          label="เพศ"
          required
          options={OPTIONS}
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

        <div
          style={{
            padding: 12,
            backgroundColor: 'var(--sys-color-background-light)',
            borderRadius: 'var(--sys-radius-lg)',
            fontSize: 12,
          }}
        >
          <strong>Selected:</strong> เพศ = {gender || '—'}, ช่วงอายุ = {ageGroup || '—'}
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Colour bindings — derived from the token chain
// ═══════════════════════════════════════════

/** Figma still uses abbreviated names; this reconstructs them for cross-referencing. */
const figmaName = (token: string): string => {
  const leaf = token
    .replace(/^ring-/, 'eff-bg-')
    .replace(/^background-/, 'bg-')
    .replace(/^foreground-/, 'fg-');
  return `colors/radio-buttons/radio-${leaf}`;
};

export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => {
    const seen = new Set<string>();
    const bindings = RADIO_COLOR_ROLES.filter((role) => {
      const token = RADIO_COLOR_TOKENS[role];
      if (seen.has(token)) return false;
      seen.add(token);
      return true;
    }).map((role) => ({
      token: radioColorToken(role),
      figmaVariable: figmaName(RADIO_COLOR_TOKENS[role]),
      hex: radioColorValue(role),
      usage: role.replace(/-/g, ' '),
    }));

    return (
      <ColorBindingsTable
        componentName="RadioButton"
        figmaId="14457:1351"
        bindings={[
          ...bindings,
          {
            token: `--sys-${RADIO_OPTIONAL_SYS_TOKEN}`,
            figmaVariable: 'tertiary/accent/md — no radio-buttons token in Figma',
            hex: radioOptionalColorValue(),
            usage: 'optional label hint',
          },
        ]}
      />
    );
  },
};
