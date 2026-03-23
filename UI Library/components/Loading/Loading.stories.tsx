import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Loading from './Loading';
import {
  LOADING_COLORS,
  LOADING_DIMENSIONS,
  LOADING_ANIMATION,
  RADIUS,
} from './tokens';

// ═══════════════════════════════════════════
//  Loading Stories — Lotteryplus Design System
//  Figma: "Loading" component (14291:131477)
// ═══════════════════════════════════════════

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Loading spinner component from Figma "Design Systems Web App Lotteryplus V.7.1". ' +
          'SVG-based circular spinner with track ring and animated arc indicator. ' +
          'Supports multiple sizes, custom colors, and pause control.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Size preset (sm=24, default=56, lg=80, xl=120)',
    },
    duration: {
      control: { type: 'text' },
      description: 'Animation duration (CSS value)',
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        padding: 40,
        background: '#1a1a2e',
        borderRadius: 12,
      }}
    >
      {(['sm', 'default', 'lg', 'xl'] as const).map((size) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Loading size={size} />
          <span
            style={{
              color: '#999',
              fontSize: 12,
              fontFamily: "'Graphik TH', sans-serif",
            }}
          >
            {size === 'sm' ? '24px' : size === 'default' ? '56px' : size === 'lg' ? '80px' : '120px'}
          </span>
          <span
            style={{
              color: '#ccc',
              fontSize: 11,
              fontFamily: "'Graphik TH', sans-serif",
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        padding: 40,
        background: '#1a1a2e',
        borderRadius: 12,
      }}
    >
      {[16, 32, 48, 64, 96].map((px) => (
        <div
          key={px}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Loading size={px} />
          <span style={{ color: '#999', fontSize: 12, fontFamily: "'Graphik TH', sans-serif" }}>
            {px}px
          </span>
        </div>
      ))}
    </div>
  ),
};

// ── 4. Speed Variations ──
export const SpeedVariations: Story = {
  name: 'Speed Variations',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        padding: 40,
        background: '#1a1a2e',
        borderRadius: 12,
      }}
    >
      {[
        { label: 'Slow (2s)', duration: '2s' },
        { label: 'Default (1s)', duration: '1s' },
        { label: 'Fast (0.5s)', duration: '0.5s' },
        { label: 'Ultra (0.25s)', duration: '0.25s' },
      ].map(({ label, duration }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Loading size="default" duration={duration} />
          <span style={{ color: '#ccc', fontSize: 12, fontFamily: "'Graphik TH', sans-serif" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ── 5. On Different Backgrounds ──
export const OnBackgrounds: Story = {
  name: 'On Different Backgrounds',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24 }}>
      {/* Dark background (default use case) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          padding: 32,
          background: '#1a1a2e',
          borderRadius: 12,
          minWidth: 120,
        }}
      >
        <Loading size="default" />
        <span style={{ color: '#999', fontSize: 12, fontFamily: "'Graphik TH', sans-serif" }}>
          Dark BG
        </span>
      </div>

      {/* Light background with custom colors */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          padding: 32,
          background: '#F5F5F5',
          borderRadius: 12,
          minWidth: 120,
        }}
      >
        <Loading size="default" trackColor="rgba(0,0,0,0.15)" arcColor="#E32321" />
        <span style={{ color: '#666', fontSize: 12, fontFamily: "'Graphik TH', sans-serif" }}>
          Light BG (red arc)
        </span>
      </div>

      {/* White background with brand colors */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          padding: 32,
          background: '#FFFFFF',
          borderRadius: 12,
          border: '1px solid #E5E5E5',
          minWidth: 120,
        }}
      >
        <Loading size="default" trackColor="rgba(227,35,33,0.2)" arcColor="#E32321" />
        <span style={{ color: '#666', fontSize: 12, fontFamily: "'Graphik TH', sans-serif" }}>
          White BG (brand)
        </span>
      </div>

      {/* Overlay simulation */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          padding: 32,
          background: 'rgba(0,0,0,0.5)',
          borderRadius: 12,
          minWidth: 120,
        }}
      >
        <Loading size="lg" />
        <span style={{ color: '#ccc', fontSize: 12, fontFamily: "'Graphik TH', sans-serif" }}>
          Overlay
        </span>
      </div>
    </div>
  ),
};

// ── 6. Paused State ──
export const PausedState: Story = {
  name: 'Paused vs Playing',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        padding: 40,
        background: '#1a1a2e',
        borderRadius: 12,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Loading size="default" paused={false} />
        <span style={{ color: '#22C55E', fontSize: 12, fontFamily: "'Graphik TH', sans-serif" }}>
          Playing
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Loading size="default" paused={true} />
        <span style={{ color: '#E32321', fontSize: 12, fontFamily: "'Graphik TH', sans-serif" }}>
          Paused
        </span>
      </div>
    </div>
  ),
};

// ── 7. Token Verification ──
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    const tokenRows = [
      // Layout
      {
        section: 'Layout',
        tokens: [
          {
            token: 'Component size',
            figmaVar: 'N/A (fixed)',
            value: `${LOADING_DIMENSIONS.componentSize}px`,
            actual: '56px',
          },
          {
            token: 'Frame size',
            figmaVar: 'N/A (fixed)',
            value: `${LOADING_DIMENSIONS.frameSize}px`,
            actual: '44.8px',
          },
          {
            token: 'Frame offset (centered)',
            figmaVar: 'N/A (calc)',
            value: `${LOADING_DIMENSIONS.frameOffset}px`,
            actual: '5.6px',
          },
          {
            token: 'Corner radius (radius-none)',
            figmaVar: 'dimension/breakpoint/radius/radius-none',
            value: `${RADIUS.none}px`,
            actual: '0px',
          },
        ],
      },
      // Colors
      {
        section: 'Colors',
        tokens: [
          {
            token: 'Track fill',
            figmaVar: 'colors/loading/loading-bg-black-80%',
            value: LOADING_COLORS.trackFill,
            actual: 'rgba(0, 0, 0, 0.8)',
          },
          {
            token: 'Track opacity (element)',
            figmaVar: 'N/A (Figma opacity)',
            value: `${LOADING_COLORS.trackOpacity}`,
            actual: '0.25',
          },
          {
            token: 'Arc fill',
            figmaVar: 'colors/loading/loading-fg-white',
            value: LOADING_COLORS.arcFill,
            actual: '#FFFFFF',
          },
          {
            token: 'Logo fill (hidden)',
            figmaVar: 'Color/Foreground/FG-Primary',
            value: LOADING_COLORS.logoFill,
            actual: '#E32321',
          },
        ],
      },
      // Animation
      {
        section: 'Animation',
        tokens: [
          {
            token: 'Duration',
            figmaVar: 'N/A (code animation)',
            value: LOADING_ANIMATION.duration,
            actual: '1s',
          },
          {
            token: 'Timing function',
            figmaVar: 'N/A (code animation)',
            value: LOADING_ANIMATION.timingFunction,
            actual: 'linear',
          },
          {
            token: 'Iteration count',
            figmaVar: 'N/A (code animation)',
            value: LOADING_ANIMATION.iterationCount,
            actual: 'infinite',
          },
        ],
      },
      // Vector Dimensions
      {
        section: 'Vector Dimensions',
        tokens: [
          {
            token: 'Track ring size',
            figmaVar: 'N/A (vector)',
            value: `${LOADING_DIMENSIONS.trackSize}px`,
            actual: '41.067px',
          },
          {
            token: 'Arc indicator size',
            figmaVar: 'N/A (vector)',
            value: `${LOADING_DIMENSIONS.arcSize}px`,
            actual: '20.344px',
          },
        ],
      },
    ];

    return (
      <div style={{ padding: 32, maxWidth: 700, fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          Loading Token Verification
        </h2>
        <p style={{ fontSize: 14, color: '#999', marginBottom: 8 }}>
          Comparing Figma component values vs Storybook token values with bound variable names
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Figma component: &quot;Loading&quot; (14291:131477)
        </p>

        {/* Live preview */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            padding: 24,
            background: '#1a1a2e',
            borderRadius: 8,
            marginBottom: 32,
          }}
        >
          <Loading size="default" />
          <div>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Live Preview</div>
            <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
              56×56px · 1s linear infinite spin
            </div>
          </div>
        </div>

        {tokenRows.map(({ section, tokens }) => (
          <div key={section} style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#E32321',
                marginBottom: 12,
                borderBottom: '2px solid #E32321',
                paddingBottom: 4,
              }}
            >
              {section}
            </h3>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 13,
              }}
            >
              <thead>
                <tr>
                  {['Token', 'Figma Variable', 'Value', 'Match'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderBottom: '2px solid #333',
                        fontWeight: 600,
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
                      <td
                        style={{
                          padding: '6px 12px',
                          borderBottom: '1px solid #333',
                        }}
                      >
                        {token}
                      </td>
                      <td
                        style={{
                          padding: '6px 12px',
                          borderBottom: '1px solid #333',
                          color: '#8B8BF5',
                          fontSize: 11,
                          fontFamily: 'monospace',
                        }}
                      >
                        {figmaVar}
                      </td>
                      <td
                        style={{
                          padding: '6px 12px',
                          borderBottom: '1px solid #333',
                          color: '#22C55E',
                          fontFamily: 'monospace',
                        }}
                      >
                        {value}
                        {(value.startsWith('#') || value.startsWith('rgba')) && (
                          <span
                            style={{
                              display: 'inline-block',
                              width: 12,
                              height: 12,
                              backgroundColor: value,
                              borderRadius: 2,
                              marginLeft: 6,
                              verticalAlign: 'middle',
                              border: '1px solid rgba(255,255,255,0.2)',
                            }}
                          />
                        )}
                      </td>
                      <td
                        style={{
                          padding: '6px 12px',
                          borderBottom: '1px solid #333',
                          fontSize: 16,
                        }}
                      >
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
