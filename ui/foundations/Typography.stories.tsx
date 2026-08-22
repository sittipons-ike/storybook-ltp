import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded' },
};
export default meta;

// ═══════════════════════════════════════════
//  Type Scale (responsive)
// ═══════════════════════════════════════════
export const TypeScale: StoryObj = {
  name: 'Type Scale',
  render: () => {
    const scale = [
      { token: 'size/2xs', mobile: 8, desktop: 10, tablet: 10 },
      { token: 'size/xs', mobile: 10, desktop: 12, tablet: 12 },
      { token: 'size/s', mobile: 12, desktop: 14, tablet: 14 },
      { token: 'size/m', mobile: 14, desktop: 16, tablet: 16 },
      { token: 'size/l', mobile: 16, desktop: 20, tablet: 20 },
      { token: 'size/xl', mobile: 20, desktop: 24, tablet: 24 },
      { token: 'size/2xl', mobile: 28, desktop: 32, tablet: 32 },
      { token: 'size/3xl', mobile: 32, desktop: 48, tablet: 48 },
      { token: 'size/4xl', mobile: 40, desktop: 56, tablet: 56 },
      { token: 'size/5xl', mobile: 48, desktop: 64, tablet: 64 },
    ];
    return (
      <div>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Type Scale</h2>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: '#737373' }}>
          Font family: Graphik TH &mdash; Responsive across Mobile / Desktop / Tablet
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>Token</th>
              <th style={{ padding: '8px 12px' }}>Mobile</th>
              <th style={{ padding: '8px 12px' }}>Tablet</th>
              <th style={{ padding: '8px 12px' }}>Desktop</th>
              <th style={{ padding: '8px 12px' }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {scale.map((s) => (
              <tr key={s.token} style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: '#E32321' }}>{s.token}</td>
                <td style={{ padding: '8px 12px' }}>{s.mobile}px</td>
                <td style={{ padding: '8px 12px' }}>{s.tablet}px</td>
                <td style={{ padding: '8px 12px' }}>{s.desktop}px</td>
                <td style={{ padding: '8px 12px', fontSize: s.desktop, lineHeight: 1.2, whiteSpace: 'nowrap' }}>Lotteryplus</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Font Weights
// ═══════════════════════════════════════════
export const FontWeights: StoryObj = {
  name: 'Font Weights',
  render: () => {
    const weights = [
      { name: 'Thin', css: 100 },
      { name: 'Light', css: 300 },
      { name: 'Regular', css: 400 },
      { name: 'Medium', css: 500 },
      { name: 'Semibold', css: 600 },
      { name: 'Bold', css: 700 },
      { name: 'Black', css: 900 },
    ];
    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Font Weights</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {weights.map((w) => (
            <div key={w.name} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ width: 100, fontSize: 12, color: '#737373', fontFamily: 'monospace' }}>{w.name}</span>
              <span style={{ fontSize: 24, fontWeight: w.css }}>Lotteryplus Design System</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Text Styles
// ═══════════════════════════════════════════
export const TextStyles: StoryObj = {
  name: 'Text Styles',
  render: () => {
    type StyleDef = { size: number; lineHeight: number; weight: string; decoration?: string };
    const styles: Record<string, StyleDef> = {
      'display/5xl-semb': { size: 48, lineHeight: 60, weight: 'Semibold' },
      'display/4xl-semb': { size: 40, lineHeight: 54, weight: 'Semibold' },
      'display/3xl-semb': { size: 32, lineHeight: 48, weight: 'Semibold' },
      'display/2xl-semb': { size: 28, lineHeight: 42, weight: 'Semibold' },
      'display/xl-semb': { size: 20, lineHeight: 36, weight: 'Semibold' },
      'heading/h1-semb': { size: 32, lineHeight: 48, weight: 'Semibold' },
      'heading/h2-semb': { size: 28, lineHeight: 42, weight: 'Semibold' },
      'heading/h3-semb': { size: 20, lineHeight: 36, weight: 'Semibold' },
      'heading/h3-med': { size: 20, lineHeight: 36, weight: 'Medium' },
      'heading/h4-semb': { size: 16, lineHeight: 24, weight: 'Semibold' },
      'heading/h4-med': { size: 16, lineHeight: 24, weight: 'Medium' },
      'title/l-semb': { size: 16, lineHeight: 24, weight: 'Semibold' },
      'title/m-med': { size: 14, lineHeight: 22, weight: 'Medium' },
      'body/xl-semb': { size: 20, lineHeight: 36, weight: 'Semibold' },
      'body/xl-reg': { size: 20, lineHeight: 36, weight: 'Regular' },
      'body/l-semb': { size: 16, lineHeight: 24, weight: 'Semibold' },
      'body/l-reg': { size: 16, lineHeight: 24, weight: 'Regular' },
      'body/m-semb': { size: 14, lineHeight: 22, weight: 'Semibold' },
      'body/m-reg': { size: 14, lineHeight: 22, weight: 'Regular' },
      'label/m-semb': { size: 12, lineHeight: 18, weight: 'Semibold' },
      'label/m-reg': { size: 12, lineHeight: 18, weight: 'Regular' },
      'caption/l-reg': { size: 12, lineHeight: 18, weight: 'Regular' },
      'caption/m-reg': { size: 10, lineHeight: 16, weight: 'Regular' },
      'button/m-semb': { size: 14, lineHeight: 22, weight: 'Semibold' },
      'underline/m-med': { size: 14, lineHeight: 22, weight: 'Medium', decoration: 'underline' },
    };
    const weightMap: Record<string, number> = { Thin: 100, Light: 300, Regular: 400, Medium: 500, Semibold: 600, Bold: 700, Black: 900 };

    const categories = ['display', 'heading', 'title', 'body', 'label', 'caption', 'button', 'underline'];

    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Text Styles</h2>
        {categories.map((cat) => {
          const items = Object.entries(styles).filter(([k]) => k.startsWith(cat + '/'));
          if (!items.length) return null;
          return (
            <div key={cat} style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, textTransform: 'capitalize', color: '#E32321' }}>{cat}</h3>
              {items.map(([token, s]) => (
                <div key={token} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
                  <span style={{ width: 180, fontSize: 11, fontFamily: 'monospace', color: '#737373', flexShrink: 0 }}>{token}</span>
                  <span style={{ fontSize: 11, color: '#A3A3A3', width: 120, flexShrink: 0 }}>
                    {s.size}px / {s.lineHeight}px / {s.weight}
                  </span>
                  <span style={{
                    fontSize: s.size,
                    lineHeight: `${s.lineHeight}px`,
                    fontWeight: weightMap[s.weight] || 400,
                    textDecoration: s.decoration || 'none',
                  }}>
                    Lotteryplus
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Line Heights
// ═══════════════════════════════════════════
export const LineHeights: StoryObj = {
  name: 'Line Heights',
  render: () => {
    const lineHeights = [
      { token: 'line-height/2xs', mobile: 12, desktop: 16 },
      { token: 'line-height/xs', mobile: 16, desktop: 18 },
      { token: 'line-height/s', mobile: 18, desktop: 22 },
      { token: 'line-height/m', mobile: 22, desktop: 24 },
      { token: 'line-height/l', mobile: 24, desktop: 36 },
      { token: 'line-height/xl', mobile: 36, desktop: 42 },
      { token: 'line-height/2xl', mobile: 42, desktop: 48 },
      { token: 'line-height/3xl', mobile: 48, desktop: 54 },
      { token: 'line-height/4xl', mobile: 54, desktop: 60 },
      { token: 'line-height/5xl', mobile: 60, desktop: 66 },
    ];
    return (
      <div>
        <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Line Heights</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>Token</th>
              <th style={{ padding: '8px 12px' }}>Mobile</th>
              <th style={{ padding: '8px 12px' }}>Desktop</th>
            </tr>
          </thead>
          <tbody>
            {lineHeights.map((lh) => (
              <tr key={lh.token} style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: '#E32321' }}>{lh.token}</td>
                <td style={{ padding: '8px 12px' }}>{lh.mobile}px</td>
                <td style={{ padding: '8px 12px' }}>{lh.desktop}px</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
