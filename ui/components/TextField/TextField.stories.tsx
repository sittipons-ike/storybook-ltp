import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TextField from './TextField';
import {
  textFieldColorValues,
  textFieldTokenName,
  textFieldTokenNames,
  textFieldTypographyValues,
  textFieldValue,
  TEXT_FIELD_STATES,
  TEXT_FIELD_STATE_EXTENSIONS,
  TEXT_FIELD_TYPOGRAPHY_ROLES,
  type TextFieldState,
  type TextFieldColorSet,
} from './tokens';
import { sysValue } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  TextField Stories — Lotteryplus Design System
//  Figma: "text-field" component set (14291:131807)
//
//  Values shown here are read from foundations/tokens.generated.ts, which is generated
//  from Figma. Nothing on this page is typed by hand, so a table can never claim a value
//  the component does not actually render.
// ═══════════════════════════════════════════

const meta: Meta<typeof TextField> = {
  title: 'Components/Forms/TextField',
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
    disabled: { control: 'boolean', description: 'Canonical state: disabled (Figma "Read Only")' },
    complete: { control: 'boolean', description: 'Canonical state: complete (approved extension)' },
    error: { control: 'text', description: 'Sets the canonical state: error' },
    showClearIcon: { control: 'boolean' },
    state: {
      control: 'select',
      options: TEXT_FIELD_STATES,
      description: 'Canonical state. `complete` is an approved extension — see 🔍 Token Chain.',
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

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

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
//  All States — one row per Figma state
// ═══════════════════════════════════════════
export const AllStates: Story = {
  name: 'All States',
  render: () => {
    // Figma names eight states; two pairs collapse onto one canonical state because the
    // only difference is whether the field holds a value, which is content, not state.
    const rows: { state: TextFieldState; figma: string; value?: string }[] = [
      { state: 'rest', figma: 'Default' },
      { state: 'hover', figma: 'Hover' },
      { state: 'focus', figma: 'Active (focused)', value: 'Typing...' },
      { state: 'rest', figma: 'Actived (rest, has value)', value: 'Text-3' },
      { state: 'disabled', figma: 'Read Only', value: 'Text-3' },
      { state: 'complete', figma: 'Complete', value: 'Text-3' },
      { state: 'error', figma: 'Error-Default' },
      { state: 'error', figma: 'Error (with value)', value: 'Text-3' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: sans }}>
        {rows.map((row) => (
          <div key={`${row.state}-${row.figma}`}>
            <div
              style={{
                fontSize: 12,
                color: 'var(--sys-color-text-tertiary-default)',
                marginBottom: 8,
              }}
            >
              Figma: {row.figma} &nbsp;→&nbsp; canonical: <code style={{ fontFamily: mono }}>{row.state}</code>
            </div>
            <div style={{ width: 358 }}>
              <TextField
                label="Field Name"
                showLabel
                placeholder="Place Holder"
                required
                state={row.state}
                value={row.value || ''}
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
    const caption: React.CSSProperties = {
      fontSize: 12,
      color: 'var(--sys-color-text-tertiary-default)',
      marginBottom: 8,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: sans }}>
        <div>
          <div style={caption}>Interactive — type text and click the close icon to clear</div>
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
          <div style={caption}>
            Figma: Actived with clear icon (filled-close, {textFieldValue('clear-icon-size')})
          </div>
          <div style={{ width: 358 }}>
            <TextField
              label="Field Name"
              showLabel
              placeholder="Place Holder"
              required
              state="rest"
              value="Text-3"
              showClearIcon
            />
          </div>
        </div>
        <div>
          <div style={caption}>Empty value — clear icon hidden</div>
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
//  Token Chain — Tier 2 → Tier 1 → literal
// ═══════════════════════════════════════════

/** Tier 2 token → the Tier 1 semantic path it aliases. `null` = fixed, no semantic token. */
const LAYOUT_CHAIN: Array<[token: string, semantic: string | null]> = [
  ['radius', 'radius-lg'],
  ['border-width', 'border-width-hairline'],
  ['border-width-focus', 'border-width-thin'],
  ['padding-y', 'spacing-2lg'],
  ['padding-x', 'spacing-2xl'],
  ['gap', 'spacing-lg'],
  ['stack-gap', 'spacing-sm'],
  ['label-padding-x', 'spacing-sm'],
  ['label-gap', 'spacing-sm'],
  ['description-padding-x', 'spacing-sm'],
  ['clear-icon-size', null],
];

/** Typography role → the Tier 1 semantic role it aliases. */
const TYPOGRAPHY_CHAIN: Record<(typeof TEXT_FIELD_TYPOGRAPHY_ROLES)[number], string> = {
  label: 'type-title-md-medium',
  required: 'type-label-md-medium',
  input: 'type-body-md-regular',
  description: 'type-caption-md-regular',
};

const TYPE_PROPS = ['family', 'size', 'line-height', 'weight', 'tracking'] as const;

const COLOR_PROPS: Array<keyof TextFieldColorSet> = [
  'background',
  'border',
  'borderWidth',
  'foreground',
  'placeholder',
  'ring',
];

export const TokenVerification: Story = {
  name: '🔍 Token Chain',
  render: () => {
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
    const tier2 = { ...td, color: 'var(--sys-color-primary-default)' };
    const tier1 = { ...td, color: 'var(--sys-color-status-info-default)' };
    const literal = { ...td, color: 'var(--sys-color-status-success-dark)' };
    const dash = <span style={{ color: 'var(--sys-color-text-state-light-gray)' }}>—</span>;

    const swatch = (hex: string) =>
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
        dash
      );

    return (
      <div style={{ fontFamily: sans, maxWidth: 960 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>TextField token chain</h2>
        <p
          style={{
            margin: '0 0 20px',
            fontSize: 13,
            color: 'var(--sys-color-text-tertiary-default)',
            lineHeight: 1.6,
          }}
        >
          Every value flows Figma → design.md → components.json → tokens.css. The component
          renders the Tier 2 alias; the alias points at a Tier 1 semantic token; that resolves
          to the literal. Both value columns are read from{' '}
          <code style={{ fontFamily: mono }}>tokens.generated.ts</code> — nothing below is
          hand-typed, so the two can only agree.
        </p>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Layout</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Tier 1 value</th>
              <th style={th}>Rendered value</th>
            </tr>
          </thead>
          <tbody>
            {LAYOUT_CHAIN.map(([token, semantic]) => (
              <tr key={token}>
                <td style={tier2}>--text-field-{token}</td>
                <td style={tier1}>{semantic ? `--sys-${semantic}` : '(fixed)'}</td>
                <td style={td}>{semantic ? sysValue(semantic) : dash}</td>
                <td style={literal}>{textFieldValue(token)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Typography</h3>
        <p
          style={{
            margin: '0 0 8px',
            fontSize: 12,
            color: 'var(--sys-color-text-tertiary-default)',
          }}
        >
          Placeholder and input text share the <code style={{ fontFamily: mono }}>input</code>{' '}
          role — one Figma role, body/md/regular; only the colour differs. Sizes and
          line-heights are responsive and shown at their mobile mode.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Role</th>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Tier 1 value</th>
              <th style={th}>Rendered value</th>
            </tr>
          </thead>
          <tbody>
            {TEXT_FIELD_TYPOGRAPHY_ROLES.flatMap((role) =>
              TYPE_PROPS.map((prop) => (
                <tr key={`${role}-${prop}`}>
                  <td style={{ ...td, fontFamily: sans }}>{role}</td>
                  <td style={tier2}>--text-field-typography-{role}-{prop}</td>
                  <td style={tier1}>--sys-{TYPOGRAPHY_CHAIN[role]}-{prop}</td>
                  <td style={td}>{sysValue(`${TYPOGRAPHY_CHAIN[role]}-${prop}`)}</td>
                  <td style={literal}>{textFieldValue(`typography-${role}-${prop}`)}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours by state</h3>
        <p
          style={{
            margin: '0 0 8px',
            fontSize: 12,
            color: 'var(--sys-color-text-tertiary-default)',
          }}
        >
          Rows marked with ✳ are approved extensions to the canonical state set.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>State</th>
              {COLOR_PROPS.map((prop) => (
                <th key={prop} style={th}>
                  {prop}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TEXT_FIELD_STATES.map((state) => {
              const v = textFieldColorValues(state);
              const isExtension = TEXT_FIELD_STATE_EXTENSIONS.includes(state);
              return (
                <tr key={state}>
                  <td style={{ ...td, fontFamily: sans }}>
                    {state}
                    {isExtension ? ' ✳' : ''}
                  </td>
                  {COLOR_PROPS.map((prop) => (
                    <td key={prop} style={td} title={textFieldTokenName(state, prop)}>
                      {prop === 'borderWidth' ? v[prop] || dash : swatch(v[prop])}
                    </td>
                  ))}
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
//  Color bindings — generated from the token chain
// ═══════════════════════════════════════════

/** Figma still uses abbreviated names; this reconstructs them for cross-referencing. */
const figmaName = (token: string): string => {
  const short = token
    .replace(/^ring-/, 'bd-bg-')
    .replace(/^background-?/, 'bg-')
    .replace(/^foreground-?/, 'fg-')
    .replace(/-$/, '');
  return `colors/text-field/text-field-${short}`;
};

const USAGE: Record<string, string> = {
  'background-white': 'Field background (rest / hover / focus / complete / error)',
  'background-disable': 'Field background (disabled)',
  border: 'Field stroke (rest / disabled)',
  'foreground-gray': 'Field stroke (hover), input text (disabled)',
  'foreground-red': 'Field stroke (focus / error), required marker, description text',
  'foreground-green': 'Field stroke (complete)',
  'foreground-dark': 'Label text, input text once the field has a value',
  'foreground-disable': 'Placeholder text',
  'foreground-soft-gray': 'Declared in Figma; not used by this component',
  'ring-active': 'Focus ring behind the stroke — brand red at 40%',
};

export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="TextField"
      figmaId="14291:131807"
      bindings={textFieldTokenNames()
        .filter((token) => textFieldValue(token).startsWith('#'))
        .map((token) => ({
          token: `--text-field-${token}`,
          figmaVariable: figmaName(token),
          hex: textFieldValue(token),
          usage: USAGE[token] ?? '—',
        }))}
    />
  ),
};

// ═══════════════════════════════════════════
//  State extensions — the debt register
// ═══════════════════════════════════════════
export const StateExtensions: StoryObj = {
  name: '⚠️ State Extensions',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 760 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>State extensions</h2>
      <p
        style={{
          margin: '0 0 20px',
          fontSize: 13,
          color: 'var(--sys-color-text-tertiary-default)',
          lineHeight: 1.6,
        }}
      >
        The Standard names six canonical states — rest, hover, active, focus, disabled, error.
        Anything outside that set lives here with a reason, so the list stays a deliberate
        register rather than somewhere states quietly accumulate.
      </p>
      <div
        style={{
          border: '1px solid var(--sys-color-border-accent-gray-soft-light)',
          borderRadius: 'var(--sys-radius-lg)',
          padding: 16,
          background: 'var(--sys-color-status-warning-soft-light)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
          <code style={{ fontFamily: mono, fontSize: 14, fontWeight: 600 }}>complete</code>
          <span style={{ fontSize: 11, color: 'var(--sys-color-text-tertiary-default)' }}>
            backed by <code style={{ fontFamily: mono }}>--text-field-foreground-green</code>
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: 'var(--sys-color-text-secondary-default)',
            lineHeight: 1.6,
          }}
        >
          Figma's "Complete" state affirms a passing validation with a green stroke. The
          canonical six have no success state, and the token already exists in the Figma
          colour mirror, so it is carried as an extension rather than folded into{' '}
          <code style={{ fontFamily: mono }}>rest</code>.
        </p>
      </div>
      <p
        style={{
          fontSize: 12,
          color: 'var(--sys-color-text-tertiary-default)',
          marginTop: 20,
          lineHeight: 1.6,
        }}
      >
        Figma's "Actived" is <em>not</em> an extension — a filled field is{' '}
        <code style={{ fontFamily: mono }}>rest</code> whose input text uses the{' '}
        <code style={{ fontFamily: mono }}>foreground</code> colour instead of{' '}
        <code style={{ fontFamily: mono }}>placeholder</code>. Likewise "Error-Default" and
        "Error" are one <code style={{ fontFamily: mono }}>error</code> state.
      </p>
    </div>
  ),
  parameters: { layout: 'padded' },
};
