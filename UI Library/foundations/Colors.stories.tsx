import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// ── helpers ──
const Swatch = ({ color, name }: { color: string; name: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 6,
        backgroundColor: color,
        border: '1px solid #E5E5E5',
        flexShrink: 0,
      }}
    />
    <div style={{ fontSize: 12, lineHeight: 1.4 }}>
      <div style={{ fontWeight: 600, color: '#262626' }}>{name}</div>
      <div style={{ color: '#737373' }}>{color}</div>
    </div>
  </div>
);

const PaletteRow = ({ name, shades }: { name: string; shades: Record<string, string> }) => (
  <div style={{ marginBottom: 24 }}>
    <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, textTransform: 'capitalize' }}>{name}</h4>
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {Object.entries(shades).map(([shade, color]) => (
        <div key={shade} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 56,
              height: 40,
              borderRadius: 6,
              backgroundColor: color,
              border: '1px solid #E5E5E5',
            }}
          />
          <div style={{ fontSize: 10, color: '#737373', marginTop: 2 }}>{shade}</div>
          <div style={{ fontSize: 9, color: '#A3A3A3' }}>{color}</div>
        </div>
      ))}
    </div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#262626', borderBottom: '1px solid #E5E5E5', paddingBottom: 8 }}>
      {title}
    </h3>
    {children}
  </div>
);

// ── meta ──
const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
};
export default meta;

// ═══════════════════════════════════════════
//  Primitive Colors (full palette)
// ═══════════════════════════════════════════
export const PrimitiveColors: StoryObj = {
  name: 'Primitive Colors',
  render: () => {
    const palettes: Record<string, Record<string, string>> = {
      red: { '950': '#450A0A', '900': '#7F1D1D', '800': '#991B1B', '700': '#B91C1C', '600': '#DC2626', '500': '#E32321', '400': '#F87171', '300': '#FCA5A5', '200': '#FECACA', '100': '#FFE2E2', '50': '#FEF2F2' },
      orange: { '950': '#431407', '900': '#7C2D12', '800': '#9A3412', '700': '#C2410C', '600': '#EA580C', '500': '#F97316', '400': '#FB923C', '300': '#FDBA74', '200': '#FED7AA', '100': '#FFEDD5', '50': '#FFF7ED' },
      amber: { '950': '#451A03', '900': '#78350F', '800': '#92400E', '700': '#B45309', '600': '#D97706', '500': '#F59E0B', '400': '#FBBF24', '300': '#FCD34D', '200': '#FDE68A', '100': '#FEF3C7', '50': '#FFFBEB' },
      yellow: { '950': '#422006', '900': '#713F12', '800': '#854D0E', '700': '#A16207', '600': '#CA8A04', '500': '#EAB308', '400': '#FACC15', '300': '#FDE047', '200': '#FEF08A', '100': '#FEF9C3', '50': '#FEFCE8' },
      green: { '950': '#052E16', '900': '#14532D', '800': '#166534', '700': '#15803D', '600': '#16A34A', '500': '#22C55E', '400': '#4ADE80', '300': '#86EFAC', '200': '#BBF7D0', '100': '#DCFCE7', '50': '#F0FDF4' },
      blue: { '950': '#172554', '900': '#1E3A8A', '800': '#1E40AF', '700': '#1D4ED8', '600': '#2563EB', '500': '#3B82F6', '400': '#60A5FA', '300': '#93C5FD', '200': '#BFDBFE', '100': '#DBEAFE', '50': '#EFF6FF' },
      neutral: { '950': '#0A0A0A', '900': '#171717', '800': '#262626', '700': '#404040', '600': '#525252', '500': '#737373', '400': '#A3A3A3', '300': '#D4D4D4', '200': '#E5E5E5', '100': '#F5F5F5', '50': '#FAFAFA' },
      midnight: { '950': '#080808', '900': '#0D0D0D', '800': '#141414', '700': '#1A1A1A', '600': '#202020', '500': '#262626', '400': '#4F4F4F', '300': '#787878', '200': '#A1A1A1', '100': '#C9C9C9', '50': '#FAFAFA' },
    };
    return (
      <div>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Primitive Colors</h2>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: '#737373' }}>
          Collection: .1-primitive &mdash; Raw design primitives, the lowest level tokens.
        </p>
        {Object.entries(palettes).map(([name, shades]) => (
          <PaletteRow key={name} name={name} shades={shades} />
        ))}
        <PaletteRow name="base" shades={{ white: '#FFFFFF', 'white-60%': '#FFFFFF99', black: '#000000', 'black-60%': '#00000099', 'black-80%': '#000000CC' }} />
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Semantic Colors
// ═══════════════════════════════════════════
export const SemanticColors: StoryObj = {
  name: 'Semantic Colors',
  render: () => {
    const groups: Record<string, Array<{ name: string; color: string }>> = {
      Primary: [
        { name: 'default', color: '#E32321' },
        { name: 'soft-light', color: '#FEF2F2' },
        { name: 'light', color: '#FFE2E2' },
        { name: 'dark', color: '#991B1B' },
        { name: 'darker', color: '#7F1D1D' },
        { name: 'accent/md', color: '#F87171' },
        { name: 'accent/lg', color: '#DC2626' },
        { name: 'accent/xl', color: '#B91C1C' },
        { name: 'accent/disabled', color: '#F5F5F5' },
      ],
      Secondary: [
        { name: 'default', color: '#262626' },
        { name: 'soft-light', color: '#FAFAFA' },
        { name: 'light', color: '#C9C9C9' },
        { name: 'dark', color: '#141414' },
        { name: 'darker', color: '#080808' },
        { name: 'accent/md', color: '#4F4F4F' },
        { name: 'accent/lg', color: '#262626' },
        { name: 'accent/xl', color: '#1A1A1A' },
        { name: 'accent/disabled', color: '#F5F5F5' },
      ],
      Tertiary: [
        { name: 'default', color: '#737373' },
        { name: 'soft-light', color: '#FAFAFA' },
        { name: 'light', color: '#F5F5F5' },
        { name: 'dark', color: '#262626' },
        { name: 'darker', color: '#171717' },
        { name: 'accent/xs', color: '#E5E5E5' },
        { name: 'accent/md', color: '#A3A3A3' },
        { name: 'accent/lg', color: '#525252' },
        { name: 'accent/xl', color: '#404040' },
        { name: 'accent/disabled', color: '#F5F5F5' },
      ],
      Info: [
        { name: 'default', color: '#3B82F6' },
        { name: 'soft-light', color: '#EFF6FF' },
        { name: 'light', color: '#DBEAFE' },
        { name: 'dark', color: '#1E40AF' },
        { name: 'darker', color: '#1E3A8A' },
      ],
      Success: [
        { name: 'default', color: '#22C55E' },
        { name: 'soft-light', color: '#F0FDF4' },
        { name: 'light', color: '#DCFCE7' },
        { name: 'dark', color: '#166534' },
        { name: 'darker', color: '#14532D' },
      ],
      Warning: [
        { name: 'default', color: '#EAB308' },
        { name: 'soft-light', color: '#FEFCE8' },
        { name: 'light', color: '#FEF9C3' },
        { name: 'dark', color: '#854D0E' },
        { name: 'darker', color: '#713F12' },
      ],
      Error: [
        { name: 'default', color: '#E32321' },
        { name: 'soft-light', color: '#FEF2F2' },
        { name: 'light', color: '#FFE2E2' },
        { name: 'dark', color: '#991B1B' },
        { name: 'darker', color: '#7F1D1D' },
      ],
    };
    return (
      <div>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Semantic Colors</h2>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: '#737373' }}>
          Collection: 2-semantic (LP-light-mode) &mdash; Maps brand intent to primitive values.
        </p>
        {Object.entries(groups).map(([group, swatches]) => (
          <Section key={group} title={group}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
              {swatches.map((s) => (
                <Swatch key={s.name} name={s.name} color={s.color} />
              ))}
            </div>
          </Section>
        ))}
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Background & Surface Colors
// ═══════════════════════════════════════════
export const BackgroundSurfaceColors: StoryObj = {
  name: 'Background & Surface',
  render: () => {
    const backgrounds: Array<{ name: string; color: string }> = [
      { name: 'bg-default', color: '#FFFFFF' },
      { name: 'bg-s-light', color: '#FAFAFA' },
      { name: 'bg-light', color: '#F5F5F5' },
      { name: 'bg-gray-s-light', color: '#E5E5E5' },
      { name: 'bg-gray-light', color: '#D4D4D4' },
      { name: 'bg-gray', color: '#A3A3A3' },
      { name: 'bg-dark', color: '#262626' },
      { name: 'bg-darker', color: '#171717' },
      { name: 'bg-super-darker', color: '#000000' },
      { name: 'bg-red', color: '#E32321' },
      { name: 'bg-red-dark', color: '#B91C1C' },
      { name: 'bg-red-s-light', color: '#FEF2F2' },
      { name: 'bg-green', color: '#22C55E' },
      { name: 'bg-green-s-light', color: '#F0FDF4' },
      { name: 'bg-blue', color: '#3B82F6' },
      { name: 'bg-blue-s-light', color: '#EFF6FF' },
      { name: 'bg-yellow', color: '#EAB308' },
      { name: 'bg-yellow-s-light', color: '#FEFCE8' },
    ];
    const surfaces: Array<{ name: string; color: string }> = [
      { name: 'level-00', color: '#FFFFFF' },
      { name: 'level-01', color: '#FAFAFA' },
      { name: 'level-02', color: '#F5F5F5' },
      { name: 'level-03', color: '#E5E5E5' },
    ];
    const overlays: Array<{ name: string; color: string }> = [
      { name: 'overlay-default', color: '#00000099' },
      { name: 'overlay-black-80%', color: '#000000CC' },
      { name: 'overlay-inverse', color: '#FFFFFF99' },
    ];
    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Background & Surface Colors</h2>
        <Section title="Backgrounds">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
            {backgrounds.map((s) => <Swatch key={s.name} name={s.name} color={s.color} />)}
          </div>
        </Section>
        <Section title="Surfaces">
          <div style={{ display: 'flex', gap: 16 }}>
            {surfaces.map((s) => (
              <div key={s.name} style={{ textAlign: 'center' }}>
                <div style={{ width: 100, height: 64, borderRadius: 8, backgroundColor: s.color, border: '1px solid #E5E5E5' }} />
                <div style={{ fontSize: 11, marginTop: 4, fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 10, color: '#737373' }}>{s.color}</div>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Overlays">
          <div style={{ display: 'flex', gap: 16 }}>
            {overlays.map((s) => (
              <div key={s.name} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 100, height: 64, borderRadius: 8, backgroundColor: s.color,
                  border: '1px solid #E5E5E5',
                  backgroundImage: 'repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%)',
                  backgroundSize: '16px 16px',
                }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: 8, backgroundColor: s.color }} />
                </div>
                <div style={{ fontSize: 11, marginTop: 4, fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 10, color: '#737373' }}>{s.color}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Text & Border Colors
// ═══════════════════════════════════════════
export const TextBorderColors: StoryObj = {
  name: 'Text & Border',
  render: () => {
    const textColors: Array<{ name: string; color: string }> = [
      { name: 'primary-default', color: '#E32321' },
      { name: 'secondary-default', color: '#262626' },
      { name: 'onbgcolor-default', color: '#FFFFFF' },
      { name: 'dark-gray', color: '#262626' },
      { name: 'gray', color: '#737373' },
      { name: 'light-gray', color: '#D4D4D4' },
      { name: 'inverse', color: '#FAFAFA' },
      { name: 'accent/error', color: '#E32321' },
      { name: 'accent/warning', color: '#EAB308' },
      { name: 'accent/success', color: '#22C55E' },
      { name: 'accent/info', color: '#3B82F6' },
      { name: 'accent/disable', color: '#D4D4D4' },
    ];
    const borderColors: Array<{ name: string; color: string }> = [
      { name: 'primary', color: '#E32321' },
      { name: 'secondary', color: '#262626' },
      { name: 'tertiary', color: '#737373' },
      { name: 'disable', color: '#D4D4D4' },
      { name: 'error', color: '#E32321' },
      { name: 'warning', color: '#EAB308' },
      { name: 'success', color: '#22C55E' },
      { name: 'info', color: '#3B82F6' },
      { name: 'accent/gray-light', color: '#D4D4D4' },
      { name: 'accent/gray-s-light', color: '#E5E5E5' },
    ];
    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Text & Border Colors</h2>
        <Section title="Text Colors">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
            {textColors.map((t) => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: t.color, fontSize: 16, fontWeight: 600, backgroundColor: t.color === '#FFFFFF' || t.color === '#FAFAFA' ? '#262626' : 'transparent', padding: '2px 6px', borderRadius: 4 }}>Aa</span>
                <span style={{ fontSize: 12 }}>{t.name}</span>
                <span style={{ fontSize: 11, color: '#A3A3A3' }}>{t.color}</span>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Border Colors">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
            {borderColors.map((b) => (
              <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 40, height: 24, borderRadius: 6, border: `2px solid ${b.color}`, backgroundColor: '#fff' }} />
                <span style={{ fontSize: 12 }}>{b.name}</span>
                <span style={{ fontSize: 11, color: '#A3A3A3' }}>{b.color}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  },
};
