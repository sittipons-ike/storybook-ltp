import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Spacing & Layout',
  parameters: { layout: 'padded' },
};
export default meta;

// ═══════════════════════════════════════════
//  Spacing Scale
// ═══════════════════════════════════════════
export const SpacingScale: StoryObj = {
  name: 'Spacing',
  render: () => {
    const spacings = [
      { token: 'spacing-none', value: 0 },
      { token: 'spacing-xs', value: 2 },
      { token: 'spacing-sm', value: 4 },
      { token: 'spacing-md', value: 6 },
      { token: 'spacing-lg', value: 8 },
      { token: 'spacing-2lg', value: 10 },
      { token: 'spacing-xl', value: 12 },
      { token: 'spacing-2xl', value: 16 },
      { token: 'spacing-3xl', value: 20 },
      { token: 'spacing-4xl', value: 24 },
      { token: 'spacing-5xl', value: 32 },
      { token: 'spacing-6xl', value: 40 },
      { token: 'spacing-7xl', value: 48 },
      { token: 'spacing-8xl', value: 56 },
      { token: 'spacing-9xl', value: 64 },
      { token: 'spacing-10xl', value: 72 },
      { token: 'spacing-11xl', value: 80 },
    ];
    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Spacing Scale</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {spacings.map((s) => (
            <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 140, fontSize: 12, fontFamily: 'monospace', color: '#737373' }}>{s.token}</span>
              <span style={{ width: 40, fontSize: 12, textAlign: 'right', color: '#262626' }}>{s.value}px</span>
              <div style={{ width: s.value, height: 16, backgroundColor: '#E32321', borderRadius: 2, minWidth: s.value > 0 ? 2 : 0 }} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Border Radius
// ═══════════════════════════════════════════
export const BorderRadius: StoryObj = {
  name: 'Border Radius',
  render: () => {
    const radii = [
      { token: 'radius-none', value: 0 },
      { token: 'radius-xs', value: 2 },
      { token: 'radius-sm', value: 4 },
      { token: 'radius-md', value: 6 },
      { token: 'radius-lg', value: 8 },
      { token: 'radius-xl', value: 12 },
      { token: 'radius-2xl', value: 16 },
      { token: 'radius-3xl', value: 20 },
      { token: 'radius-4xl', value: 24 },
      { token: 'radius-5xl', value: 32 },
      { token: 'radius-full', value: 9999 },
    ];
    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Border Radius</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {radii.map((r) => (
            <div key={r.token} style={{ textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: r.value,
                backgroundColor: '#E32321',
                marginBottom: 6,
              }} />
              <div style={{ fontSize: 11, fontWeight: 600 }}>{r.token}</div>
              <div style={{ fontSize: 10, color: '#737373' }}>{r.value}px</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Shadows
// ═══════════════════════════════════════════
export const Shadows: StoryObj = {
  name: 'Shadows',
  render: () => {
    const shadows: Array<{ token: string; css: string }> = [
      { token: 'none', css: 'none' },
      { token: '2xs', css: '0 1px 0 0 rgba(0,0,0,0.05)' },
      { token: 'xs', css: '0 1px 2px 0 rgba(0,0,0,0.05)' },
      { token: 'sm', css: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)' },
      { token: 'md', css: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' },
      { token: 'lg', css: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' },
      { token: 'xl', css: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' },
      { token: '2xl', css: '0 25px 50px -12px rgba(0,0,0,0.25)' },
      { token: 'inner', css: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)' },
    ];
    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Shadows</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {shadows.map((s) => (
            <div key={s.token} style={{ textAlign: 'center' }}>
              <div style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                backgroundColor: '#FFFFFF',
                boxShadow: s.css,
                border: s.token === 'none' ? '1px solid #E5E5E5' : 'none',
                marginBottom: 8,
              }} />
              <div style={{ fontSize: 12, fontWeight: 600 }}>{s.token}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Breakpoints
// ═══════════════════════════════════════════
export const Breakpoints: StoryObj = {
  name: 'Breakpoints',
  render: () => {
    const breakpoints = [
      { name: 'mobile-321', value: 321, color: '#22C55E' },
      { name: 'mobile-361', value: 361, color: '#22C55E' },
      { name: 'mobile-390', value: 390, color: '#22C55E' },
      { name: 'tablet-768', value: 768, color: '#3B82F6' },
      { name: 'desktop-1024', value: 1024, color: '#E32321' },
      { name: 'desktop-1280', value: 1280, color: '#E32321' },
      { name: 'desktop-1440', value: 1440, color: '#E32321' },
      { name: 'desktop-1920', value: 1920, color: '#E32321' },
    ];
    const maxVal = 1920;
    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Breakpoints</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {breakpoints.map((bp) => (
            <div key={bp.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 140, fontSize: 12, fontFamily: 'monospace', color: '#737373' }}>{bp.name}</span>
              <span style={{ width: 50, fontSize: 12, textAlign: 'right' }}>{bp.value}px</span>
              <div style={{ flex: 1, height: 20, backgroundColor: '#F5F5F5', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  width: `${(bp.value / maxVal) * 100}%`,
                  height: '100%',
                  backgroundColor: bp.color,
                  borderRadius: 4,
                  opacity: 0.7,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Border Width & Opacity
// ═══════════════════════════════════════════
export const BorderWidthAndOpacity: StoryObj = {
  name: 'Border Width & Opacity',
  render: () => {
    const borderWidths = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16];
    const opacities = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Border Width</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {borderWidths.map((w) => (
            <div key={w} style={{ textAlign: 'center' }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                border: `${w}px solid #E32321`,
                backgroundColor: '#FEF2F2',
              }} />
              <div style={{ fontSize: 11, marginTop: 4 }}>{w}px</div>
            </div>
          ))}
        </div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Opacity</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {opacities.map((o) => (
            <div key={o} style={{ textAlign: 'center' }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                backgroundColor: '#E32321',
                opacity: o / 100,
              }} />
              <div style={{ fontSize: 11, marginTop: 4 }}>{o}%</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
