import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import {
  TOGGLE_COLOR_VALUES,
  TOGGLE_STATES,
  toggleValue,
  knobOffsetValue,
} from './tokens';
import { sys, sysValue } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Toggle Switch Stories — Lotteryplus Design System
//  Figma: "toggle-switch" component set (14291:131527)
//
//  Values shown here are read from foundations/tokens.generated.ts, which is generated
//  from Figma via design.md + components.json + the toggle-switch overlay. Nothing on
//  this page is typed by hand, so a table can never claim a value the component does
//  not actually render.
// ═══════════════════════════════════════════

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Atoms/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toggle Switch from Figma "Design Systems Web App Lotteryplus V.7.1". Two canonical ' +
          'states carry colour — `selected` (green track, knob right) and `rest` (soft-gray ' +
          'track, knob left) — plus `disabled`, which dims the whole control. Hover, active ' +
          'and focus are handled in CSS; Figma declares no separate fill for them.',
      },
    },
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Selected state — `selected` when true, `rest` when false',
    },
    disabled: { control: 'boolean', description: 'Disabled state' },
    ariaLabel: { control: 'text', description: 'Aria label for accessibility' },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

// ── 1. Default (Interactive) ──
export const Default: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ToggleSwitch active={active} onChange={setActive} />
        <span
          style={{
            fontFamily: sans,
            fontSize: 14,
            color: sys('color-text-primary-default'),
          }}
        >
          {active ? 'selected' : 'rest'}
        </span>
      </div>
    );
  },
};

// ── 2. Both States ──
export const BothStates: Story = {
  name: 'Both States',
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'center', padding: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <ToggleSwitch active={true} />
        <span
          style={{
            fontFamily: sans,
            fontSize: 13,
            color: sys('color-status-success-default'),
            fontWeight: 600,
          }}
        >
          selected
        </span>
        <span
          style={{ fontFamily: sans, fontSize: 11, color: sys('color-text-tertiary-default') }}
        >
          Green track, knob right
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <ToggleSwitch active={false} />
        <span
          style={{
            fontFamily: sans,
            fontSize: 13,
            color: sys('color-text-secondary-default'),
            fontWeight: 600,
          }}
        >
          rest
        </span>
        <span
          style={{ fontFamily: sans, fontSize: 11, color: sys('color-text-tertiary-default') }}
        >
          Gray track, knob left
        </span>
      </div>
    </div>
  ),
};

// ── 3. Disabled States ──
export const DisabledStates: Story = {
  name: 'Disabled States',
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'center', padding: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <ToggleSwitch active={true} disabled />
        <span
          style={{ fontFamily: sans, fontSize: 13, color: sys('color-text-tertiary-default') }}
        >
          selected + disabled
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <ToggleSwitch active={false} disabled />
        <span
          style={{ fontFamily: sans, fontSize: 13, color: sys('color-text-tertiary-default') }}
        >
          rest + disabled
        </span>
      </div>
    </div>
  ),
};

// ── 4. Interactive Demo ──
export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    const labelStyle: React.CSSProperties = {
      fontFamily: sans,
      fontSize: 14,
      fontWeight: 500,
      color: sys('color-text-primary-default'),
      minWidth: 120,
    };

    const descStyle: React.CSSProperties = {
      fontFamily: sans,
      fontSize: 12,
      color: sys('color-text-tertiary-default'),
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          padding: 32,
          background: sys('color-foreground-white'),
          borderRadius: sys('radius-xl'),
          border: `${sys('border-width-hairline')} solid ${sys(
            'color-border-accent-gray-soft-light',
          )}`,
          width: 320,
        }}
      >
        <h3 style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, margin: 0 }}>Settings</h3>

        {[
          {
            label: 'Notifications',
            desc: 'Push notifications',
            value: notifications,
            setter: setNotifications,
          },
          { label: 'Dark Mode', desc: 'Use dark theme', value: darkMode, setter: setDarkMode },
          {
            label: 'Auto Save',
            desc: 'Save changes automatically',
            value: autoSave,
            setter: setAutoSave,
          },
        ].map(({ label, desc, value, setter }) => (
          <div
            key={label}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div>
              <div style={labelStyle}>{label}</div>
              <div style={descStyle}>{desc}</div>
            </div>
            <ToggleSwitch active={value} onChange={setter} ariaLabel={label} />
          </div>
        ))}
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Token chain
//
//  Every row reads its value through toggleValue() / sysValue(). Nothing is hand-typed,
//  so this table cannot drift from what the component renders.
// ═══════════════════════════════════════════
export const TokenChain: Story = {
  name: '🔍 Token Chain',
  render: () => {
    // [Tier 2 token, Tier 1 semantic it points at]
    const layout: Array<[string, string]> = [
      ['--toggle-radius', '--sys-radius-full'],
      ['--toggle-padding', '--sys-spacing-none'],
      ['--toggle-track-width', '(fixed — Figma frame)'],
      ['--toggle-track-height', '(fixed — Figma frame)'],
      ['--toggle-knob-size', '(fixed — Figma frame)'],
      ['--toggle-knob-inset', '--sys-spacing-xs'],
      ['--toggle-knob-shadow', '--sys-elevation-floating'],
      ['--toggle-focus-ring-width', '--sys-border-width-thin'],
      ['--toggle-focus-ring-offset', '--sys-spacing-xs'],
      ['--toggle-transition-duration', '(fixed — no motion group in design.md)'],
      ['--toggle-transition-timing', '(fixed — no motion group in design.md)'],
      ['--toggle-disabled-opacity', '(fixed — no opacity group in design.md)'],
    ];

    const colors: Array<[string, string, string]> = [
      ['--toggle-background-green', '--sys-color-status-success-default', 'Track — selected'],
      [
        '--toggle-background-soft-gray',
        '--sys-color-border-accent-gray-soft-light',
        'Track — rest',
      ],
      ['--toggle-foreground-white', '--sys-color-foreground-white', 'Knob fill'],
      ['--sys-color-primary-default', '(no Figma toggle token)', 'Focus ring'],
    ];

    const derived: Array<[string, string]> = [
      ['knob left — rest', knobOffsetValue(false)],
      ['knob left — selected', knobOffsetValue(true)],
    ];

    const th: React.CSSProperties = {
      textAlign: 'left',
      padding: '8px 12px',
      fontSize: 11,
      fontWeight: 600,
      color: sys('color-text-tertiary-default'),
      borderBottom: `2px solid ${sys('color-border-accent-gray-soft-light')}`,
    };
    const td: React.CSSProperties = {
      padding: '6px 12px',
      borderBottom: `1px solid ${sys('color-background-light')}`,
      fontFamily: mono,
      fontSize: 11,
    };

    const swatch = (value: string) =>
      value.startsWith('#') ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: value,
              border: '1px solid rgba(0,0,0,0.15)',
            }}
          />
          {value}
        </span>
      ) : (
        <span style={{ color: sys('color-text-state-light-gray') }}>—</span>
      );

    return (
      <div style={{ fontFamily: sans, maxWidth: 900 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Toggle Switch token chain</h2>
        <p
          style={{ margin: '0 0 20px', fontSize: 13, color: sys('color-text-tertiary-default') }}
        >
          Every value flows Figma → design.md → components.json → tokens.css. The component
          renders the Tier 2 alias; the alias points at a Tier 1 semantic token; that resolves
          to the literal. Nothing below is hand-typed.
        </p>

        {/* Live preview */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            padding: 24,
            background: sys('color-background-light'),
            borderRadius: sys('radius-lg'),
            marginBottom: 32,
            border: `${sys('border-width-hairline')} solid ${sys(
              'color-border-accent-gray-soft-light',
            )}`,
          }}
        >
          {[true, false].map((on) => (
            <div
              key={String(on)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              <ToggleSwitch active={on} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: on
                    ? sys('color-status-success-default')
                    : sys('color-text-tertiary-default'),
                }}
              >
                {on ? 'selected' : 'rest'}
              </span>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Layout, sizing &amp; motion</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {layout.map(([comp, semantic]) => (
              <tr key={comp}>
                <td style={{ ...td, color: sys('color-primary-default') }}>{comp}</td>
                <td style={{ ...td, color: sys('color-status-info-default') }}>{semantic}</td>
                <td style={{ ...td, color: sys('color-status-success-dark') }}>
                  {toggleValue(comp.replace('--toggle-', ''))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Token</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Usage</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {colors.map(([token, semantic, usage]) => {
              const value = token.startsWith('--sys-')
                ? sysValue(token.replace('--sys-', ''))
                : toggleValue(token.replace('--toggle-', ''));
              return (
                <tr key={token}>
                  <td style={{ ...td, color: sys('color-primary-default') }}>{token}</td>
                  <td style={{ ...td, color: sys('color-status-info-default') }}>{semantic}</td>
                  <td style={{ ...td, fontFamily: sans }}>{usage}</td>
                  <td style={td}>{swatch(value)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Derived positions</h3>
        <p
          style={{ margin: '0 0 8px', fontSize: 12, color: sys('color-text-tertiary-default') }}
        >
          Figma places the knob at x:2 and x:22. Only the inset is a token — the selected
          position is computed as <code>track-width − knob-size − knob-inset</code>, so it
          cannot drift from the three tokens it depends on.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Derived from tokens</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {derived.map(([label, value]) => (
              <tr key={label}>
                <td style={{ ...td, fontFamily: sans }}>{label}</td>
                <td style={{ ...td, color: sys('color-status-success-dark') }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Canonical states</h3>
        <p style={{ margin: 0, fontSize: 12, color: sys('color-text-tertiary-default') }}>
          {TOGGLE_STATES.join(' · ')} — Figma declares fills for{' '}
          <code>rest</code> and <code>selected</code> only; <code>disabled</code> is an opacity
          on the whole control, and <code>hover</code> / <code>active</code> / <code>focus</code>{' '}
          are CSS-only.
        </p>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// Kept under its previous export name so existing links resolve.
export const TokenVerification: Story = { ...TokenChain, name: 'Token Verification' };

// ── Color Bindings ──
export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="ToggleSwitch"
      figmaId="14291:131527"
      bindings={[
        {
          token: '--toggle-background-green',
          figmaVariable: 'colors/toggle-switch/toggle-bg-green',
          hex: TOGGLE_COLOR_VALUES.trackOn,
          usage: 'Track background (selected)',
        },
        {
          token: '--toggle-background-soft-gray',
          figmaVariable: 'colors/toggle-switch/toggle-bg-soft-gray',
          hex: TOGGLE_COLOR_VALUES.trackOff,
          usage: 'Track background (rest)',
        },
        {
          token: '--toggle-foreground-white',
          figmaVariable: 'colors/toggle-switch/toggle-fg-white',
          hex: TOGGLE_COLOR_VALUES.knob,
          usage: 'Knob fill colour',
        },
        {
          token: '--sys-color-primary-default',
          figmaVariable: '(none — no toggle-switch focus token in Figma)',
          hex: TOGGLE_COLOR_VALUES.focusRing,
          usage: 'Focus-visible ring',
        },
      ]}
    />
  ),
};
