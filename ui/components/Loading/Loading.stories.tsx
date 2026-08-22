import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Loading from './Loading';
import {
  LOADING_VALUES,
  LOADING_SIZES,
  loadingSizeValue,
  loadingValue,
  loadingTokenNames,
  type LoadingSize,
} from './tokens';
import { sys, sysValue } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Loading Stories — Lotteryplus Design System
//  Figma: "Loading" component (14291:131477)
//
//  Nothing below hand-types a token value. Every number, hex and duration is read back
//  through `loadingValue()` / `sysValue()`, which resolve from tokens.generated.ts —
//  the same generator output the component renders with, so a table cannot drift.
// ═══════════════════════════════════════════

const sans = sys('type-body-md-regular-family');
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** Demo surfaces. These illustrate contrast contexts, they are not component tokens. */
const SURFACE_DARK = sys('color-background-dark');
const SURFACE_LIGHT = sys('color-background-light');
const SURFACE_WHITE = sys('color-background-default');

const meta: Meta<typeof Loading> = {
  title: 'Atoms/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Loading spinner component from Figma "Design Systems Web App Lotteryplus V.7.1". ' +
          'SVG-based circular spinner with track ring and animated arc indicator. ' +
          'Sizes, colours and motion all resolve from `--loading-*` tokens.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: LOADING_SIZES,
      description: 'Size preset, or an explicit pixel number',
    },
    duration: {
      control: { type: 'text' },
      description: 'Animation duration override (CSS time value)',
    },
    paused: {
      control: { type: 'boolean' },
      description: 'Pause the spinning animation',
    },
    trackColor: {
      control: { type: 'color' },
      description: 'Override track ring color',
    },
    arcColor: {
      control: { type: 'color' },
      description: 'Override spinning arc color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

// ── shared demo chrome ──────────────────────────────────────────────────────

const panel = (background: string): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: sysValue('spacing-5xl'),
  padding: sysValue('spacing-6xl'),
  background,
  borderRadius: sysValue('radius-xl'),
});

const stack: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: sysValue('spacing-xl'),
};

const caption: React.CSSProperties = {
  color: sys('color-text-state-light-gray'),
  fontSize: sys('type-body-md-regular-size'),
  fontFamily: sans,
};

// ── 1. Default ──
export const Default: Story = {
  args: {
    size: 'default',
  },
};

// ── 2. All Sizes ──
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={panel(SURFACE_DARK)}>
      {LOADING_SIZES.map((size) => (
        <div key={size} style={stack}>
          <Loading size={size} />
          <span style={caption}>{loadingSizeValue(size)}</span>
          <span
            style={{
              ...caption,
              color: sys('color-text-inverse'),
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ── 3. Custom Numeric Size ──
export const CustomSize: Story = {
  name: 'Custom Numeric Size',
  render: () => (
    <div style={panel(SURFACE_DARK)}>
      {[16, 32, 48, 64, 96].map((px) => (
        <div key={px} style={stack}>
          <Loading size={px} />
          <span style={caption}>{px}px</span>
        </div>
      ))}
    </div>
  ),
};

// ── 4. Speed Variations ──
export const SpeedVariations: Story = {
  name: 'Speed Variations',
  render: () => (
    <div style={panel(SURFACE_DARK)}>
      {[
        { label: 'Slow (2s)', duration: '2s' },
        { label: `Token default (${LOADING_VALUES.duration})`, duration: undefined },
        { label: 'Fast (0.5s)', duration: '0.5s' },
        { label: 'Ultra (0.25s)', duration: '0.25s' },
      ].map(({ label, duration }) => (
        <div key={label} style={stack}>
          <Loading size="default" duration={duration} />
          <span style={{ ...caption, color: sys('color-text-inverse') }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ── 5. On Different Backgrounds ──
export const OnBackgrounds: Story = {
  name: 'On Different Backgrounds',
  render: () => (
    <div style={{ display: 'flex', gap: sysValue('spacing-4xl'), padding: sysValue('spacing-4xl') }}>
      {/* Dark background — the default use case */}
      <div style={{ ...panel(SURFACE_DARK), ...stack, minWidth: 120 }}>
        <Loading size="default" />
        <span style={caption}>Dark BG</span>
      </div>

      {/* Light background with the brand red arc */}
      <div style={{ ...panel(SURFACE_LIGHT), ...stack, minWidth: 120 }}>
        <Loading
          size="default"
          trackColor={sys('color-background-gray-light')}
          arcColor={sys('color-primary-default')}
        />
        <span style={{ ...caption, color: sys('color-text-tertiary-default') }}>
          Light BG (red arc)
        </span>
      </div>

      {/* White background with brand colours */}
      <div
        style={{
          ...panel(SURFACE_WHITE),
          ...stack,
          minWidth: 120,
          border: `${sysValue('border-width-hairline')} solid ${sys('color-border-accent-gray-light')}`,
        }}
      >
        <Loading
          size="default"
          trackColor={sys('color-primary-light')}
          arcColor={sys('color-primary-default')}
        />
        <span style={{ ...caption, color: sys('color-text-tertiary-default') }}>
          White BG (brand)
        </span>
      </div>

      {/* Overlay simulation */}
      <div style={{ ...panel(sys('color-overlay-default')), ...stack, minWidth: 120 }}>
        <Loading size="lg" />
        <span style={caption}>Overlay</span>
      </div>
    </div>
  ),
};

// ── 6. Paused State ──
export const PausedState: Story = {
  name: 'Paused vs Playing',
  render: () => (
    <div style={panel(SURFACE_DARK)}>
      <div style={stack}>
        <Loading size="default" paused={false} />
        <span style={{ ...caption, color: sys('color-text-state-success') }}>Playing</span>
      </div>
      <div style={stack}>
        <Loading size="default" paused={true} />
        <span style={{ ...caption, color: sys('color-text-state-error') }}>Paused</span>
      </div>
    </div>
  ),
};

// ── 7. Token Verification ──
//
// Tier 2 -> Tier 1 -> literal. The literal column is read from tokens.generated.ts, so
// it always reports what the component actually renders.
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    type Row = { token: string; tier1: string };
    const sections: Array<{ section: string; rows: Row[] }> = [
      {
        section: 'Layout',
        rows: [
          { token: 'radius', tier1: '--sys-radius-none' },
          { token: 'padding', tier1: '--sys-spacing-none' },
          { token: 'size-default', tier1: '(fixed — Figma frame)' },
          { token: 'size-sm', tier1: '(fixed — library preset)' },
          { token: 'size-lg', tier1: '(fixed — library preset)' },
          { token: 'size-xl', tier1: '(fixed — library preset)' },
        ],
      },
      {
        section: 'Colours',
        rows: [
          { token: 'background-black-80', tier1: '--sys-color-overlay-heavy' },
          { token: 'foreground-white', tier1: '--sys-color-foreground-white' },
          { token: 'track-opacity', tier1: '(fixed — Figma element opacity)' },
        ],
      },
      {
        section: 'Vector geometry',
        rows: [
          { token: 'frame-size', tier1: '(fixed — Figma vector)' },
          { token: 'frame-offset', tier1: '(fixed — derived)' },
          { token: 'track-size', tier1: '(fixed — Figma vector)' },
          { token: 'arc-size', tier1: '(fixed — Figma vector)' },
        ],
      },
      {
        section: 'Motion',
        rows: [
          { token: 'duration', tier1: '(fixed — no motion group in design.md)' },
          { token: 'timing-function', tier1: '(fixed — no motion group in design.md)' },
          { token: 'iteration-count', tier1: '(fixed — no motion group in design.md)' },
        ],
      },
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

    const isColour = (v: string) => v.startsWith('#') || v.startsWith('rgb');

    return (
      <div style={{ fontFamily: sans, maxWidth: 900 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Loading token chain</h2>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: sys('color-text-tertiary-default') }}>
          Every value flows Figma → components.figma.json / components/loading.json →
          components.json → tokens.css. The component renders the Tier 2 alias; where a Tier 1
          semantic token backs it, the alias points there. The value column is read from
          tokens.generated.ts — nothing below is hand-typed.
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 12, fontWeight: 600 }}>
          Figma component: &quot;Loading&quot; (14291:131477) · {loadingTokenNames().length} tokens
          declared
        </p>

        {/* Live preview */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: sysValue('spacing-4xl'),
            padding: sysValue('spacing-4xl'),
            background: SURFACE_DARK,
            borderRadius: sysValue('radius-lg'),
            marginBottom: sysValue('spacing-5xl'),
          }}
        >
          <Loading size="default" />
          <div>
            <div style={{ color: sys('color-text-on-bgcolor'), fontSize: 14, fontWeight: 600 }}>
              Live Preview
            </div>
            <div style={{ color: sys('color-text-state-light-gray'), fontSize: 12, marginTop: 4 }}>
              {loadingSizeValue('default')} · {LOADING_VALUES.duration}{' '}
              {LOADING_VALUES.timingFunction} {LOADING_VALUES.iterationCount}
            </div>
          </div>
        </div>

        {sections.map(({ section, rows }) => (
          <div key={section} style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>{section}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Tier 2 — component</th>
                  <th style={th}>Tier 1 — semantic</th>
                  <th style={th}>Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ token, tier1 }) => {
                  const value = loadingValue(token);
                  return (
                    <tr key={token}>
                      <td style={{ ...td, color: sys('color-primary-default') }}>
                        --loading-{token}
                      </td>
                      <td style={{ ...td, color: sys('color-status-info-default') }}>{tier1}</td>
                      <td style={{ ...td, color: sys('color-status-success-dark') }}>
                        {value || '—'}
                        {isColour(value) && (
                          <span
                            style={{
                              display: 'inline-block',
                              width: 12,
                              height: 12,
                              background: value,
                              borderRadius: 2,
                              marginLeft: 6,
                              verticalAlign: 'middle',
                              border: `1px solid ${sys('color-border-accent-gray-light')}`,
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}

        {/* Colours Figma does not expose under colors/loading */}
        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Unbacked by a --loading-* token</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Use</th>
              <th style={th}>Semantic token referenced directly</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...td, fontFamily: sans }}>Logo fill (hidden in this variant)</td>
              <td style={{ ...td, color: sys('color-status-info-default') }}>
                --sys-color-foreground-primary
              </td>
              <td style={{ ...td, color: sys('color-status-success-dark') }}>
                {LOADING_VALUES.logoFill}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ── 8. Color Bindings ──
export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="Loading"
      figmaId="14291:131477"
      bindings={[
        {
          token: 'loading-background-black-80',
          figmaVariable: 'colors/loading/loading-bg-black-80%',
          hex: LOADING_VALUES.trackFill,
          usage: `Track ring fill (element opacity ${LOADING_VALUES.trackOpacity})`,
        },
        {
          token: 'loading-foreground-white',
          figmaVariable: 'colors/loading/loading-fg-white',
          hex: LOADING_VALUES.arcFill,
          usage: 'Spinning arc indicator',
        },
        {
          token: 'sys-color-foreground-primary',
          figmaVariable: 'Color/Foreground/FG-Primary',
          hex: LOADING_VALUES.logoFill,
          usage: 'Logo fill (hidden by default) — no colors/loading token backs it',
        },
      ]}
    />
  ),
};

// No re-exports here. Storybook's indexer reads exports statically and cannot tell a
// type from a story, so `export type { LoadingSize }` produced a phantom
// `components-loading--loading-size` entry that failed at runtime. The type already
// lives in ./tokens, which is where consumers should import it from.
