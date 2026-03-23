import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Component Tokens',
  parameters: { layout: 'padded' },
};
export default meta;

// ── helper ──
const TokenTable = ({ title, tokens }: { title: string; tokens: Record<string, string> }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: '#262626' }}>{title}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 6 }}>
      {Object.entries(tokens).map(([name, color]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 4,
            backgroundColor: color, border: '1px solid #E5E5E5', flexShrink: 0,
          }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#262626' }}>{name}</div>
            <div style={{ fontSize: 10, color: '#A3A3A3' }}>{color}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════
//  Button Tokens
// ═══════════════════════════════════════════
export const ButtonTokens: StoryObj = {
  name: 'Button',
  render: () => (
    <div>
      <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Button Component Tokens</h2>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: '#737373' }}>Collection: 3-component (LP-light-mode)</p>
      <TokenTable title="Primary" tokens={{
        'bg-default': '#E32321', 'bg-hover': '#B91C1C', 'bg-focused': '#DC2626', 'bg-pressed': '#7F1D1D', 'bg-disabled': '#F5F5F5',
        'fg-default': '#FFFFFF', 'fg-disabled': '#C9C9C9', 'shadow': '#E323213D',
      }} />
      <TokenTable title="Secondary" tokens={{
        'bg-default': '#262626', 'bg-hover': '#4F4F4F', 'bg-pressed': '#1A1A1A', 'bg-disabled': '#F5F5F5',
        'fg-default': '#FFFFFF', 'fg-disabled': '#C9C9C9', 'shadow': '#2626263D',
      }} />
      <TokenTable title="Tertiary" tokens={{
        'bg-default': '#FFFFFF', 'bg-hover': '#FAFAFA', 'bg-pressed': '#C9C9C9', 'bg-disabled': '#F5F5F5',
        'fg-default': '#262626', 'fg-disabled': '#C9C9C9', 'border': '#D4D4D4', 'shadow': '#7373733D',
      }} />
      <TokenTable title="Outline" tokens={{
        'bg-default': '#FFFFFF', 'bg-hover': '#FAFAFA', 'bg-pressed': '#C9C9C9', 'bg-disabled': '#F5F5F5',
        'fg-default': '#262626', 'fg-disabled': '#C9C9C9',
      }} />
      <TokenTable title="Link" tokens={{
        'bg-default': '#FFFFFF', 'bg-hover': '#EFF6FF', 'bg-disabled': '#F5F5F5',
        'fg-default': '#3B82F6', 'fg-hover': '#60A5FA', 'fg-pressed': '#1D4ED8', 'fg-disabled': '#C9C9C9',
      }} />
      <TokenTable title="On Container" tokens={{
        'bg-default': '#FFFFFF', 'bg-actived': '#E32321', 'bg-disabled': '#F5F5F5',
        'fg-default': '#E32321', 'fg-actived': '#FFFFFF', 'fg-disabled': '#C9C9C9',
      }} />
    </div>
  ),
};

// ═══════════════════════════════════════════
//  Form Component Tokens
// ═══════════════════════════════════════════
export const FormTokens: StoryObj = {
  name: 'Form Components',
  render: () => (
    <div>
      <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Form Component Tokens</h2>
      <TokenTable title="TextField" tokens={{
        'bg-white': '#FFFFFF', 'bg-disable': '#F5F5F5',
        'fg-red': '#E32321', 'fg-dark': '#262626', 'fg-gray': '#737373', 'fg-green': '#22C55E',
        'fg-disable': '#C9C9C9', 'border': '#D4D4D4', 'bd-bg-active': '#E3232166',
      }} />
      <TokenTable title="Checkbox" tokens={{
        'bg-white': '#FFFFFF', 'bg-red': '#E32321', 'bg-green': '#22C55E', 'bg-disable': '#F5F5F5',
        'fg-white': '#FFFFFF', 'fg-dark': '#262626', 'fg-green': '#22C55E', 'fg-disable': '#C9C9C9',
        'border': '#D4D4D4',
      }} />
      <TokenTable title="Radio Buttons" tokens={{
        'bg-white': '#FFFFFF', 'bg-disable': '#F5F5F5', 'bg-green': '#22C55E',
        'fg-white': '#FFFFFF', 'fg-dark': '#262626', 'fg-red': '#E32321', 'fg-disable': '#C9C9C9',
        'border': '#D4D4D4', 'eff-bg-green': '#22C55E66',
      }} />
      <TokenTable title="Dropdown" tokens={{
        'bg-white': '#FFFFFF', 'bg-disable': '#F5F5F5',
        'fg-red': '#E32321', 'fg-dark': '#262626', 'fg-gray': '#737373', 'fg-green': '#22C55E',
        'fg-disable': '#C9C9C9', 'border': '#D4D4D4',
      }} />
      <TokenTable title="Toggle Switch" tokens={{
        'bg-green': '#22C55E', 'bg-soft-gray': '#E5E5E5', 'fg-white': '#FFFFFF',
      }} />
    </div>
  ),
};

// ═══════════════════════════════════════════
//  Navigation & Layout Tokens
// ═══════════════════════════════════════════
export const NavigationTokens: StoryObj = {
  name: 'Navigation & Layout',
  render: () => (
    <div>
      <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Navigation & Layout Component Tokens</h2>
      <TokenTable title="Navigation Bar" tokens={{
        'bg-white': '#FFFFFF', 'fg-white': '#FFFFFF', 'fg-red': '#E32321',
        'fg-dark': '#262626', 'fg-gray': '#A3A3A3', 'fg-disable': '#C9C9C9', 'border': '#F5F5F5',
      }} />
      <TokenTable title="Top & Footer" tokens={{
        'bg-red': '#E32321', 'bg-red-dark': '#DC2626', 'bg-white': '#FFFFFF',
        'fg-red': '#E32321', 'fg-white': '#FFFFFF', 'fg-darker': '#080808', 'fg-gray': '#A3A3A3',
        'border': '#D4D4D4',
      }} />
      <TokenTable title="Tabs" tokens={{
        'bg-white': '#FFFFFF', 'bg-primary': '#E32321', 'bg-secondary': '#262626', 'bg-disable': '#C9C9C9',
        'fg-white': '#FFFFFF', 'fg-primary': '#E32321', 'fg-secondary': '#262626', 'fg-disable': '#C9C9C9',
      }} />
      <TokenTable title="Breadcrumb" tokens={{
        'fg-dark': '#141414', 'fg-red': '#E32321',
      }} />
      <TokenTable title="Progress Bars" tokens={{
        'bg-red': '#E32321', 'bg-soft-gray': '#D4D4D4',
        'fg-dark': '#262626', 'fg-white': '#FFFFFF', 'fg-disable': '#C9C9C9',
      }} />
    </div>
  ),
};

// ═══════════════════════════════════════════
//  Feedback & Overlay Tokens
// ═══════════════════════════════════════════
export const FeedbackTokens: StoryObj = {
  name: 'Feedback & Overlay',
  render: () => (
    <div>
      <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Feedback & Overlay Component Tokens</h2>
      <TokenTable title="Toast" tokens={{
        'bg-red': '#E32321', 'bg-green': '#22C55E', 'bg-blue': '#3B82F6', 'bg-yellow': '#EAB308',
        'bg-soft-red': '#FEF2F2', 'bg-soft-green': '#F0FDF4', 'bg-soft-blue': '#EFF6FF', 'bg-soft-yellow': '#FEFCE8',
        'fg-white': '#FFFFFF', 'fg-dark': '#262626',
      }} />
      <TokenTable title="Modal" tokens={{
        'bg-white': '#FFFFFF', 'bg-soft-red': '#FEF2F2', 'bg-soft-green': '#F0FDF4', 'bg-soft-yellow': '#FEFCE8',
        'fg-red': '#E32321', 'fg-green': '#22C55E', 'fg-yellow': '#EAB308', 'fg-dark': '#262626',
      }} />
      <TokenTable title="Bottom Sheet" tokens={{
        'bg-white': '#FFFFFF', 'bg-red': '#E32321',
        'fg-white': '#FFFFFF', 'fg-dark': '#000000', 'fg-gray': '#A3A3A3',
      }} />
      <TokenTable title="Loading" tokens={{
        'bg-black-80%': '#000000CC', 'fg-white': '#FFFFFF',
      }} />
    </div>
  ),
};

// ═══════════════════════════════════════════
//  Feature Tokens (Lottery, Cart, etc.)
// ═══════════════════════════════════════════
export const FeatureTokens: StoryObj = {
  name: 'Feature Components',
  render: () => (
    <div>
      <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Feature Component Tokens</h2>
      <TokenTable title="Lottery" tokens={{
        'bg-white': '#FFFFFF', 'bg-red': '#E32321', 'bg-dark': '#262626', 'bg-darker': '#080808',
        'fg-white': '#FFFFFF', 'fg-red': '#E32321', 'fg-green': '#22C55E', 'fg-disable': '#C9C9C9',
      }} />
      <TokenTable title="Lotto Board" tokens={{
        'bg-white': '#FFFFFF', 'bg-red': '#E32321', 'bg-dark': '#262626',
        'fg-white': '#FFFFFF', 'fg-red': '#E32321', 'fg-gray': '#737373', 'fg-disable': '#C9C9C9',
        'border': '#D4D4D4',
      }} />
      <TokenTable title="Carts" tokens={{
        'bg-white': '#FFFFFF', 'bg-disable': '#F5F5F5', 'bg-green': '#22C55E',
        'fg-red': '#E32321', 'fg-dark': '#262626', 'fg-green': '#22C55E', 'fg-disable': '#C9C9C9',
        'border': '#D4D4D4',
      }} />
      <TokenTable title="Orders" tokens={{
        'bg-white': '#FFFFFF', 'bg-red': '#E32321', 'bg-soft-red': '#FEF2F2', 'bg-soft-green': '#F0FDF4',
        'fg-red': '#E32321', 'fg-dark': '#262626', 'fg-green': '#22C55E', 'fg-blue': '#3B82F6',
        'border': '#D4D4D4',
      }} />
      <TokenTable title="Profile" tokens={{
        'bg-white': '#FFFFFF', 'bg-light': '#F5F5F5', 'bg-red': '#E32321',
        'fg-red': '#E32321', 'fg-white': '#FFFFFF', 'fg-dark': '#262626', 'fg-gray': '#737373',
        'border': '#D4D4D4',
      }} />
      <TokenTable title="Jidrit Lucky" tokens={{
        'bg-white': '#FFFFFF', 'bg-green': '#22C55E', 'bg-red': '#E32321',
        'fg-white': '#FFFFFF', 'fg-red': '#E32321', 'fg-green': '#22C55E', 'fg-dark': '#262626',
        'border': '#D4D4D4',
      }} />
      <TokenTable title="Icon" tokens={{
        'fg-primary': '#E32321', 'fg-secondary': '#262626', 'fg-tertiary': '#737373', 'fg-white': '#FFFFFF',
      }} />
    </div>
  ),
};
