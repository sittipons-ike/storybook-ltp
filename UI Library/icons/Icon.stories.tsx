import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Icon, { ICONS } from './Icon';
import './Icon.css';
import './icon-data'; // registers all icons

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(ICONS),
      description: 'Icon name from Figma',
    },
    size: {
      control: 'select',
      options: [12, 16, 20, 24, 32, 40, 48, 56, 64, 72],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'onBg', 'inherit'],
    },
    customColor: { control: 'color' },
  },
  args: {
    name: 'outline-Home',
    size: 24,
    color: 'secondary',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Primary: Story = {
  args: { name: 'filled-Home', color: 'primary', size: 32 },
};

export const OnBackground: Story = {
  args: { name: 'outline-cart', color: 'onBg', size: 32 },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#E32321', padding: 24, borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
};

// === Sizes ===
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {([12, 16, 20, 24, 32, 40, 48, 56, 64, 72] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon name="outline-Home" size={size} />
          <div style={{ fontSize: 10, color: '#737373', marginTop: 4 }}>{size}px</div>
        </div>
      ))}
    </div>
  ),
};

// === Colors ===
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['primary', 'secondary', 'tertiary', 'onBg'] as const).map((color) => (
        <div
          key={color}
          style={{
            textAlign: 'center',
            padding: 16,
            borderRadius: 8,
            backgroundColor: color === 'onBg' ? '#262626' : '#FFFFFF',
            border: '1px solid #E5E5E5',
          }}
        >
          <Icon name="filled-Home" size={32} color={color} />
          <div style={{ fontSize: 11, color: color === 'onBg' ? '#FFFFFF' : '#737373', marginTop: 6 }}>{color}</div>
        </div>
      ))}
    </div>
  ),
};

// === Full Icon Gallery ===
export const IconGallery: Story = {
  name: 'All Icons (155)',
  render: () => {
    const [search, setSearch] = useState('');
    const [selectedColor, setSelectedColor] = useState<'primary' | 'secondary' | 'tertiary'>('secondary');
    const allNames = Object.keys(ICONS);
    const filtered = search
      ? allNames.filter((n) => n.toLowerCase().includes(search.toLowerCase()))
      : allNames;

    const outlineIcons = filtered.filter((n) => n.startsWith('outline-'));
    const filledIcons = filtered.filter((n) => n.startsWith('filled-'));
    const arrowIcons = filtered.filter((n) => n.startsWith('arrow-'));
    const otherIcons = filtered.filter(
      (n) => !n.startsWith('outline-') && !n.startsWith('filled-') && !n.startsWith('arrow-')
    );

    const Section = ({ title, icons }: { title: string; icons: string[] }) =>
      icons.length ? (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#262626' }}>
            {title} ({icons.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8 }}>
            {icons.map((name) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  padding: '12px 4px',
                  borderRadius: 8,
                  border: '1px solid #F5F5F5',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}
                title={name}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#E32321')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#F5F5F5')}
              >
                <Icon name={name} size={24} color={selectedColor} />
                <span style={{ fontSize: 9, color: '#737373', textAlign: 'center', wordBreak: 'break-all', lineHeight: 1.3 }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null;

    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Icon Gallery</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#737373' }}>
          155 icons from Figma "Design Systems Web App Lotteryplus V.7.1" — frame: icons
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #D4D4D4',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: 4 }}>
            {(['primary', 'secondary', 'tertiary'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: selectedColor === c ? '2px solid #E32321' : '1px solid #D4D4D4',
                  background: selectedColor === c ? '#FEF2F2' : '#FFF',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: selectedColor === c ? 600 : 400,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#A3A3A3', marginBottom: 16 }}>
          Showing {filtered.length} of {allNames.length} icons
        </div>

        <Section title="Outline" icons={outlineIcons} />
        <Section title="Filled" icons={filledIcons} />
        <Section title="Arrows" icons={arrowIcons} />
        <Section title="Other" icons={otherIcons} />
      </div>
    );
  },
  parameters: { layout: 'padded' },
};
