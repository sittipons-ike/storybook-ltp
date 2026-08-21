import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Dropdown from './Dropdown';
import type { DropdownOption } from './Dropdown';
import {
  DROPDOWN_FIGMA_STATES,
  DROPDOWN_STATES,
  DROPDOWN_STATUSES,
  DROPDOWN_TYPOGRAPHY_ROLES,
  dropdownFieldTokenNames,
  dropdownFieldValues,
  dropdownOptionValues,
  dropdownTokenNames,
  dropdownTypographyValues,
  dropdownValue,
  sysValue,
  type DropdownState,
  type DropdownStatus,
  type DropdownTypographyRole,
} from './tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';
import type { ColorBinding } from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Dropdown Stories — Lotteryplus Design System
//  Figma: "dropdown" component set (14291:131904)
//
//  Figma's eight flat states decompose onto two canonical axes:
//    state  — rest | hover | active | focus | disabled | selected
//    status — default | complete | error
//
//  Values shown here are read from foundations/tokens.generated.ts, which is
//  generated from Figma. Nothing on this page is typed by hand, so a table can
//  never claim a value the component does not actually render.
// ═══════════════════════════════════════════

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DEFAULT_OPTIONS: DropdownOption[] = [
  { value: 'text-2', label: 'Text-2' },
  { value: 'text-3', label: 'Text-3' },
  { value: 'text-4', label: 'Text-4' },
  { value: 'text-5', label: 'Text-5' },
  { value: 'text-6', label: 'Text-6' },
];

const caption: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--sys-color-text-tertiary-default)',
  marginBottom: 8,
};

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    description: { control: 'text' },
    readOnly: { control: 'boolean', description: 'Renders the canonical `disabled` state' },
    complete: { control: 'boolean', description: 'Renders the canonical `complete` status' },
    error: { control: 'text', description: 'Sets the `error` status and shows the description' },
    state: {
      control: 'select',
      options: DROPDOWN_STATES,
      description: 'Canonical interaction state, per the Design System Standard',
    },
    status: {
      control: 'select',
      options: DROPDOWN_STATUSES,
      description: 'Validation status — an axis orthogonal to interaction state',
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
//  All States — one row per Figma state, labelled with its canonical pair
// ═══════════════════════════════════════════
export const AllStates: Story = {
  name: 'All States',
  render: () => {
    // A selected value is what makes `selected` observable; `rest`/`hover` show the
    // placeholder. Everything else about each row comes from the canonical pair.
    const valueFor = (state: DropdownState) => (state === 'selected' ? 'text-3' : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: sans }}>
        {DROPDOWN_FIGMA_STATES.filter((s) => s.state !== 'active').map((s) => (
          <div key={s.figma}>
            <div style={caption}>
              Figma “{s.figma}” → state=<code>{s.state}</code> status=<code>{s.status}</code>
            </div>
            <div style={{ width: 358 }}>
              <Dropdown
                label="Field Name"
                showLabel
                placeholder="Place Holder"
                required
                options={DEFAULT_OPTIONS}
                state={s.state}
                status={s.status}
                value={valueFor(s.state)}
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
//  Focus ring — --dropdown-ring-active
// ═══════════════════════════════════════════
export const FocusRing: Story = {
  name: 'Focus Ring',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: sans }}>
      <div>
        <div style={caption}>
          state=<code>focus</code> — 2px brand-red border plus the{' '}
          <code>--dropdown-ring-active</code> glow ({dropdownValue('ring-active')}), brand red
          at 40%.
        </div>
        <div style={{ width: 358 }}>
          <Dropdown
            label="Field Name"
            showLabel
            placeholder="Place Holder"
            required
            options={DEFAULT_OPTIONS}
            state="focus"
          />
        </div>
      </div>
      <div>
        <div style={caption}>
          Tab into this one to see the ring driven by real focus rather than an override.
        </div>
        <div style={{ width: 358 }}>
          <Dropdown
            label="Field Name"
            showLabel
            placeholder="Place Holder"
            required
            options={DEFAULT_OPTIONS}
          />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  With Dropdown Open (active state)
// ═══════════════════════════════════════════
export const WithDropdownOpen: Story = {
  name: 'With Dropdown Open',
  render: () => {
    const [value, setValue] = useState<string>('text-3');

    return (
      <div style={{ width: 358, paddingBottom: 220, fontFamily: sans }}>
        <div style={caption}>
          state=<code>active</code> (list open) — click the field to toggle
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: sans }}>
        <div>
          <div style={caption}>
            Figma “Error-Default” → state=<code>rest</code> status=<code>error</code>
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
          <div style={caption}>
            Figma “Error” → state=<code>selected</code> status=<code>error</code>
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
          <div style={caption}>
            Interactive — picking a value moves it from <code>rest</code> to{' '}
            <code>selected</code>, status stays <code>error</code>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: sans }}>
      <div>
        <div style={caption}>
          Figma “Read Only” → state=<code>disabled</code> — background{' '}
          {dropdownValue('background-disable')}, text {dropdownValue('foreground-gray')},
          non-interactive
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
        <div style={caption}>
          Figma “Complete” → status=<code>complete</code> — border{' '}
          {dropdownValue('foreground-green')}
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
//  Token Chain — every value read, never typed
// ═══════════════════════════════════════════
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

const Swatch: React.FC<{ hex: string }> = ({ hex }) =>
  hex ? (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          background: hex,
          border: '1px solid rgba(0,0,0,0.15)',
        }}
      />
      {hex}
    </span>
  ) : (
    <span style={{ color: 'var(--sys-color-text-state-light-gray)' }}>—</span>
  );

export const TokenChain: Story = {
  name: '🔍 Token Chain',
  render: () => {
    // Tier 2 -> Tier 1. Only the pairing is written here; both values are read.
    const layout: Array<[string, string]> = [
      ['radius', 'radius-lg'],
      ['border-width', 'border-width-hairline'],
      ['border-width-active', 'border-width-thin'],
      ['elevation', 'elevation-card'],
      ['wrapper-gap', 'spacing-sm'],
      ['label-padding-left', 'spacing-sm'],
      ['label-gap', 'spacing-sm'],
      ['description-padding-left', 'spacing-sm'],
      ['field-padding-y', 'spacing-2lg'],
      ['field-padding-right', 'spacing-lg'],
      ['field-padding-left', 'spacing-2xl'],
      ['field-gap', 'spacing-lg'],
      ['list-offset', 'spacing-sm'],
      ['list-padding', 'spacing-lg'],
      ['list-gap', 'spacing-2lg'],
      ['option-padding-y', 'spacing-sm'],
      ['option-padding-x', 'spacing-2xl'],
      ['option-gap', 'spacing-lg'],
      ['icon-size', ''],
    ];

    const typographyRole: Record<DropdownTypographyRole, string> = {
      label: 'type-title-md-medium',
      required: 'type-label-md-medium',
      value: 'type-body-md-regular',
      option: 'type-body-md-regular',
      'option-selected': 'type-body-md-medium',
      description: 'type-caption-md-regular',
    };

    const typographyProps: Array<[keyof ReturnType<typeof dropdownTypographyValues>, string]> = [
      ['fontFamily', 'family'],
      ['fontSize', 'size'],
      ['lineHeight', 'line-height'],
      ['fontWeight', 'weight'],
      ['letterSpacing', 'tracking'],
    ];

    const pairs = DROPDOWN_FIGMA_STATES.map(
      (s): [DropdownState, DropdownStatus] => [s.state, s.status],
    );

    return (
      <div style={{ fontFamily: sans, maxWidth: 980 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Dropdown token chain</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--sys-color-text-tertiary-default)' }}>
          Every value flows Figma → design.md → components.json → tokens.css. The component
          renders the Tier 2 alias; the alias points at a Tier 1 semantic token; that resolves
          to the literal. Nothing below is hand-typed — layout and typography are authored in{' '}
          <code>design-library/lotteryplus/components/dropdown.json</code>, colours are mirrored
          from Figma’s <code>colors/dropdown</code> group.
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
            {layout.map(([token, semantic]) => (
              <tr key={token}>
                <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>
                  --dropdown-{token}
                </td>
                <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
                  {semantic ? `--sys-${semantic}` : '(fixed)'}
                </td>
                <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>
                  {dropdownValue(token)}
                  {semantic && dropdownValue(token) !== sysValue(semantic) ? ' ⚠︎' : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Typography roles</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Role</th>
              <th style={th}>Tier 1 — semantic</th>
              {typographyProps.map(([, label]) => (
                <th key={label} style={th}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DROPDOWN_TYPOGRAPHY_ROLES.map((role) => {
              const v = dropdownTypographyValues(role);
              return (
                <tr key={role}>
                  <td style={{ ...td, fontFamily: sans }}>{role}</td>
                  <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
                    --sys-{typographyRole[role]}-*
                  </td>
                  {typographyProps.map(([key, label]) => (
                    <td key={label} style={td}>
                      {v[key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Field colours by state × status</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Figma state</th>
              <th style={th}>state</th>
              <th style={th}>status</th>
              <th style={th}>Background</th>
              <th style={th}>Border</th>
              <th style={th}>Width</th>
              <th style={th}>Text</th>
              <th style={th}>Icon</th>
              <th style={th}>Ring</th>
            </tr>
          </thead>
          <tbody>
            {DROPDOWN_FIGMA_STATES.map(({ figma, state, status }) => {
              const v = dropdownFieldValues(state, status);
              const names = dropdownFieldTokenNames(state, status);
              return (
                <tr key={figma}>
                  <td style={{ ...td, fontFamily: sans }}>{figma}</td>
                  <td style={td}>{state}</td>
                  <td style={td}>{status}</td>
                  <td style={td} title={`--dropdown-${names.background}`}>
                    <Swatch hex={v.background} />
                  </td>
                  <td style={td} title={`--dropdown-${names.border}`}>
                    <Swatch hex={v.border} />
                  </td>
                  <td style={td} title={`--dropdown-${names.borderWidth}`}>
                    {v.borderWidth}
                  </td>
                  <td style={td} title={`--dropdown-${names.foreground}`}>
                    <Swatch hex={v.foreground} />
                  </td>
                  <td style={td} title={`--dropdown-${names.icon}`}>
                    <Swatch hex={v.icon} />
                  </td>
                  <td style={td} title={names.ring ? `--dropdown-${names.ring}` : ''}>
                    <Swatch hex={v.ring} />
                  </td>
                </tr>
              );
            })}
            {/* Canonical states Figma has no dedicated frame for. */}
            {DROPDOWN_STATES.filter(
              (s) => !pairs.some(([state, status]) => state === s && status === 'default'),
            ).map((state) => {
              const v = dropdownFieldValues(state, 'default');
              return (
                <tr key={`extra-${state}`}>
                  <td style={{ ...td, fontFamily: sans, opacity: 0.6 }}>(no Figma frame)</td>
                  <td style={td}>{state}</td>
                  <td style={td}>default</td>
                  <td style={td}>
                    <Swatch hex={v.background} />
                  </td>
                  <td style={td}>
                    <Swatch hex={v.border} />
                  </td>
                  <td style={td}>{v.borderWidth}</td>
                  <td style={td}>
                    <Swatch hex={v.foreground} />
                  </td>
                  <td style={td}>
                    <Swatch hex={v.icon} />
                  </td>
                  <td style={td}>
                    <Swatch hex={v.ring} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Option rows</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Row</th>
              <th style={th}>Background</th>
              <th style={th}>Text</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ['rest', false, false],
                ['hover', false, true],
                ['selected', true, false],
              ] as Array<[string, boolean, boolean]>
            ).map(([label, selected, hovered]) => {
              const v = dropdownOptionValues(selected, hovered);
              return (
                <tr key={label}>
                  <td style={{ ...td, fontFamily: sans }}>{label}</td>
                  <td style={td}>
                    <Swatch hex={v.background} />
                  </td>
                  <td style={td}>
                    <Swatch hex={v.foreground} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>
          Every declared token ({dropdownTokenNames().length})
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Token</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {dropdownTokenNames().map((name) => (
              <tr key={name}>
                <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>
                  --dropdown-{name}
                </td>
                <td style={td}>{dropdownValue(name)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ── Color Bindings ──
const BINDINGS: ColorBinding[] = [
  {
    token: 'dropdown-background-white',
    figmaVariable: 'colors/dropdown/dropdown-bg-white',
    hex: dropdownValue('background-white'),
    usage: 'Field background, list surface, default option row',
  },
  {
    token: 'dropdown-background-disable',
    figmaVariable: 'colors/dropdown/dropdown-bg-disable',
    hex: dropdownValue('background-disable'),
    usage: 'Field background — state=disabled (Figma “Read Only”)',
  },
  {
    token: 'dropdown-border',
    figmaVariable: 'colors/dropdown/dropdown-border',
    hex: dropdownValue('border'),
    usage: 'Field border — rest / selected / disabled; list border',
  },
  {
    token: 'dropdown-foreground-gray',
    figmaVariable: 'colors/dropdown/dropdown-fg-gray',
    hex: dropdownValue('foreground-gray'),
    usage: 'Field border and icon on hover; text when disabled',
  },
  {
    token: 'dropdown-ring-active',
    figmaVariable: 'colors/dropdown/dropdown-bd-bg-active',
    hex: dropdownValue('ring-active'),
    usage: 'Focus ring — state=active / focus (brand red at 40%)',
  },
  {
    token: 'dropdown-foreground-green',
    figmaVariable: 'colors/dropdown/dropdown-fg-green',
    hex: dropdownValue('foreground-green'),
    usage: 'Field border — status=complete',
  },
  {
    token: 'dropdown-foreground-red',
    figmaVariable: 'colors/dropdown/dropdown-fg-red',
    hex: dropdownValue('foreground-red'),
    usage: 'Field border on status=error and state=active/focus; required marker; description text; selected option background',
  },
  {
    token: 'dropdown-foreground-dark',
    figmaVariable: 'colors/dropdown/dropdown-fg-dark',
    hex: dropdownValue('foreground-dark'),
    usage: 'Label text, value text, icons, default option text',
  },
  {
    token: 'dropdown-foreground-disable',
    figmaVariable: 'colors/dropdown/dropdown-fg-disable',
    hex: dropdownValue('foreground-disable'),
    usage: 'Placeholder text, rest-state icon',
  },
  {
    token: 'dropdown-foreground-soft-gray',
    figmaVariable: 'colors/dropdown/dropdown-fg-soft-gray',
    hex: dropdownValue('foreground-soft-gray'),
    usage: 'Option row background on hover',
  },
  {
    token: 'dropdown-foreground-white',
    figmaVariable: 'colors/dropdown/dropdown-fg-white',
    hex: dropdownValue('foreground-white'),
    usage: 'Selected option text',
  },
];

export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="Dropdown"
      figmaId="14291:131904"
      bindings={BINDINGS}
    />
  ),
};
