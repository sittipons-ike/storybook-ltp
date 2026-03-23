import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import {
  TOGGLE_COLORS,
  TOGGLE_DIMENSIONS,
  TOGGLE_ANIMATION,
  SHADOW,
  RADIUS,
  SPACING,
} from './tokens';

// ═══════════════════════════════════════════
//  Toggle Switch Stories — Lotteryplus Design System
//  Figma: "toggle-switch" component set (14291:131527)
// ═══════════════════════════════════════════

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toggle Switch component from Figma "Design Systems Web App Lotteryplus V.7.1". ' +
          'Two states: active=true (green, knob right) and active=false (gray, knob left). ' +
          'Smooth CSS transition animation on toggle.',
      },
    },
  },
  argTypes: {
    active: { control: 'boolean', description: 'Toggle active state' },
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
        <span style={{ fontFamily: "'Graphik TH', sans-serif", fontSize: 14, color: '#262626' }}>
          {active ? 'ON' : 'OFF'}
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
        <span style={{ fontFamily: "'Graphik TH', sans-serif", fontSize: 13, color: '#22C55E', fontWeight: 600 }}>
          active=true
        </span>
        <span style={{ fontFamily: "'Graphik TH', sans-serif", fontSize: 11, color: '#999' }}>
          Green track, knob right
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <ToggleSwitch active={false} />
        <span style={{ fontFamily: "'Graphik TH', sans-serif", fontSize: 13, color: '#737373', fontWeight: 600 }}>
          active=false
        </span>
        <span style={{ fontFamily: "'Graphik TH', sans-serif", fontSize: 11, color: '#999' }}>
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
        <span style={{ fontFamily: "'Graphik TH', sans-serif", fontSize: 13, color: '#999' }}>
          ON + Disabled
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <ToggleSwitch active={false} disabled />
        <span style={{ fontFamily: "'Graphik TH', sans-serif", fontSize: 13, color: '#999' }}>
          OFF + Disabled
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
      fontFamily: "'Graphik TH', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: '#262626',
      minWidth: 120,
    };

    const descStyle: React.CSSProperties = {
      fontFamily: "'Graphik TH', sans-serif",
      fontSize: 12,
      color: '#999',
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          padding: 32,
          background: '#FFFFFF',
          borderRadius: 12,
          border: '1px solid #E5E5E5',
          width: 320,
        }}
      >
        <h3 style={{ fontFamily: "'Graphik TH', sans-serif", fontSize: 16, fontWeight: 600, margin: 0 }}>
          Settings
        </h3>

        {[
          { label: 'Notifications', desc: 'Push notifications', value: notifications, setter: setNotifications },
          { label: 'Dark Mode', desc: 'Use dark theme', value: darkMode, setter: setDarkMode },
          { label: 'Auto Save', desc: 'Save changes automatically', value: autoSave, setter: setAutoSave },
        ].map(({ label, desc, value, setter }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
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

// ── 5. Token Verification ──
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    const tokenRows = [
      {
        section: 'Layout',
        tokens: [
          { token: 'Track width', figmaVar: 'N/A (fixed)', value: `${TOGGLE_DIMENSIONS.track.width}px`, actual: '51px' },
          { token: 'Track height', figmaVar: 'N/A (fixed)', value: `${TOGGLE_DIMENSIONS.track.height}px`, actual: '31px' },
          { token: 'Knob size', figmaVar: 'N/A (fixed)', value: `${TOGGLE_DIMENSIONS.knob.size}px`, actual: '27px' },
          { token: 'Knob Y offset', figmaVar: 'N/A (fixed)', value: `${TOGGLE_DIMENSIONS.knobPosition.y}px`, actual: '2px' },
          { token: 'Knob X (OFF)', figmaVar: 'N/A (position)', value: `${TOGGLE_DIMENSIONS.knobPosition.off}px`, actual: '2px' },
          { token: 'Knob X (ON)', figmaVar: 'N/A (position)', value: `${TOGGLE_DIMENSIONS.knobPosition.on}px`, actual: '22px' },
          { token: 'Track radius (radius-full)', figmaVar: 'dimension/breakpoint/radius/radius-full', value: `${RADIUS.full}`, actual: '9999' },
          { token: 'Component padding (spacing-none)', figmaVar: 'dimension/spacing/spacing-none', value: `${SPACING.none}px`, actual: '0px' },
        ],
      },
      {
        section: 'Colors',
        tokens: [
          { token: 'Track ON (toggle-bg-green)', figmaVar: 'colors/toggle-switch/toggle-bg-green', value: TOGGLE_COLORS.track.on, actual: '#22C55E' },
          { token: 'Track OFF (toggle-bg-soft-gray)', figmaVar: 'colors/toggle-switch/toggle-bg-soft-gray', value: TOGGLE_COLORS.track.off, actual: '#E5E5E5' },
          { token: 'Knob fill (toggle-fg-white)', figmaVar: 'colors/toggle-switch/toggle-fg-white', value: TOGGLE_COLORS.knob.fill, actual: '#FFFFFF' },
        ],
      },
      {
        section: 'Shadow (Knob)',
        tokens: [
          { token: 'Knob shadow (dimension/shadow/md)', figmaVar: 'dimension/shadow/md/*', value: SHADOW.md, actual: '0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)' },
        ],
      },
      {
        section: 'Animation',
        tokens: [
          { token: 'Transition duration', figmaVar: 'N/A (code)', value: TOGGLE_ANIMATION.duration, actual: '0.2s' },
          { token: 'Timing function', figmaVar: 'N/A (code)', value: TOGGLE_ANIMATION.timingFunction, actual: 'ease-in-out' },
        ],
      },
    ];

    return (
      <div style={{ padding: 32, maxWidth: 750, fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          Toggle Switch Token Verification
        </h2>
        <p style={{ fontSize: 14, color: '#999', marginBottom: 8 }}>
          Comparing Figma component values vs Storybook token values with bound variable names
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Figma component set: &quot;toggle-switch&quot; (14291:131527)
        </p>

        {/* Live preview */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            padding: 24,
            background: '#F9F9F9',
            borderRadius: 8,
            marginBottom: 32,
            border: '1px solid #E5E5E5',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <ToggleSwitch active={true} />
            <span style={{ fontSize: 12, color: '#22C55E', fontWeight: 600 }}>active=true</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <ToggleSwitch active={false} />
            <span style={{ fontSize: 12, color: '#999', fontWeight: 600 }}>active=false</span>
          </div>
        </div>

        {tokenRows.map(({ section, tokens }) => (
          <div key={section} style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontSize: 16, fontWeight: 600, color: '#E32321',
                marginBottom: 12, borderBottom: '2px solid #E32321', paddingBottom: 4,
              }}
            >
              {section}
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Token', 'Figma Variable', 'Value', 'Match'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left', padding: '8px 12px',
                        borderBottom: '2px solid #DDD', fontWeight: 600,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tokens.map(({ token, figmaVar, value, actual }) => {
                  const match = value === actual;
                  return (
                    <tr key={token}>
                      <td style={{ padding: '6px 12px', borderBottom: '1px solid #EEE' }}>{token}</td>
                      <td style={{ padding: '6px 12px', borderBottom: '1px solid #EEE', color: '#8B8BF5', fontSize: 11, fontFamily: 'monospace' }}>
                        {figmaVar}
                      </td>
                      <td style={{ padding: '6px 12px', borderBottom: '1px solid #EEE', color: '#22C55E', fontFamily: 'monospace' }}>
                        {value}
                        {(value.startsWith('#') || value.startsWith('rgba')) && (
                          <span
                            style={{
                              display: 'inline-block', width: 12, height: 12,
                              backgroundColor: value, borderRadius: 2, marginLeft: 6,
                              verticalAlign: 'middle', border: '1px solid rgba(0,0,0,0.1)',
                            }}
                          />
                        )}
                      </td>
                      <td style={{ padding: '6px 12px', borderBottom: '1px solid #EEE', fontSize: 16 }}>
                        {match ? '✅' : '❌'}
                      </td>
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
