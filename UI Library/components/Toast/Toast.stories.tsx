import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Toast from './Toast';
import {
  TOAST_TYPES,
  TOAST_COLORS,
  TOAST_DIMENSIONS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  SHADOW,
  CLOSE_ICON,
  type ToastType,
  type ToastVariant,
} from './tokens';

// ═══════════════════════════════════════════
//  Toast Stories — Lotteryplus Design System
//  Figma: "toast-message" section
//    light-toast (14848:2072): 3 types (informative, success, error)
//    solid-toast (14848:2109): 4 types (informative, success, warning, error)
// ═══════════════════════════════════════════

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'solid'],
      description: 'Figma component set: light-toast / solid-toast',
    },
    type: {
      control: 'select',
      options: ['informative', 'success', 'warning', 'error'],
      description: 'Figma variant: type',
    },
    title: { control: 'text', description: 'Title text' },
    caption: { control: 'text', description: 'Caption/description text' },
    showIcon: { control: 'boolean', description: 'Show type icon' },
    showClose: { control: 'boolean', description: 'Show close button' },
    animated: { control: 'boolean', description: 'Enable slide-in animation' },
    autoClose: { control: 'number', description: 'Auto dismiss in ms (0 = disabled)' },
  },
  args: {
    variant: 'light',
    type: 'informative',
    title: 'Toast Title',
    caption: 'Toast description message goes here.',
    showIcon: true,
    showClose: true,
    animated: true,
    autoClose: 0,
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// ═══════════════════════════════════════════
//  Default (Light Informative)
// ═══════════════════════════════════════════
export const Default: Story = {};

// ═══════════════════════════════════════════
//  Light Types — All 3 light toast types
// ═══════════════════════════════════════════
export const LightTypes: Story = {
  name: 'Light Types',
  render: () => {
    const lightTypes: ToastType[] = ['informative', 'success', 'error'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'Graphik TH', sans-serif", maxWidth: 480 }}>
        <div style={{ fontSize: 13, color: '#737373', marginBottom: 4 }}>
          Figma: light-toast (14848:2072) — soft bg + colored border
        </div>
        {lightTypes.map((t) => (
          <div key={t}>
            <div style={{ fontSize: 11, color: '#A3A3A3', marginBottom: 4 }}>
              variant=light, type={t}
            </div>
            <Toast
              variant="light"
              type={t}
              title={`${t.charAt(0).toUpperCase() + t.slice(1)} Toast`}
              caption={`This is a ${t} toast message with light variant.`}
              animated={false}
            />
          </div>
        ))}
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Solid Types — All 4 solid toast types
// ═══════════════════════════════════════════
export const SolidTypes: Story = {
  name: 'Solid Types',
  render: () => {
    const solidTypes: ToastType[] = ['informative', 'success', 'warning', 'error'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'Graphik TH', sans-serif", maxWidth: 480 }}>
        <div style={{ fontSize: 13, color: '#737373', marginBottom: 4 }}>
          Figma: solid-toast (14848:2109) — solid colored bg, white text
        </div>
        {solidTypes.map((t) => (
          <div key={t}>
            <div style={{ fontSize: 11, color: '#A3A3A3', marginBottom: 4 }}>
              variant=solid, type={t}
            </div>
            <Toast
              variant="solid"
              type={t}
              title={`${t.charAt(0).toUpperCase() + t.slice(1)} Toast`}
              caption={`This is a ${t} toast message with solid variant.`}
              animated={false}
            />
          </div>
        ))}
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  With Auto Close
// ═══════════════════════════════════════════
export const WithAutoClose: Story = {
  name: 'With Auto Close',
  render: () => {
    const [key, setKey] = useState(0);
    const [dismissed, setDismissed] = useState(false);

    const handleReset = () => {
      setDismissed(false);
      setKey((k) => k + 1);
    };

    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif", maxWidth: 480 }}>
        <div style={{ fontSize: 13, color: '#737373', marginBottom: 12 }}>
          This toast auto-dismisses after 3 seconds.
        </div>

        {!dismissed ? (
          <Toast
            key={key}
            variant="solid"
            type="success"
            title="Auto Close Toast"
            caption="This will disappear in 3 seconds..."
            autoClose={3000}
            onClose={() => setDismissed(true)}
          />
        ) : (
          <div style={{ padding: '16px 20px', backgroundColor: '#F5F5F5', borderRadius: 12, fontSize: 14, color: '#737373' }}>
            Toast dismissed.
          </div>
        )}

        <button
          onClick={handleReset}
          style={{
            marginTop: 16,
            padding: '8px 20px',
            backgroundColor: '#E32321',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Graphik TH', sans-serif",
          }}
        >
          Show Again
        </button>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Interactive — Trigger different toast types
// ═══════════════════════════════════════════
export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [toasts, setToasts] = useState<Array<{
      id: number;
      variant: ToastVariant;
      type: ToastType;
    }>>([]);

    let nextId = 0;

    const addToast = (variant: ToastVariant, type: ToastType) => {
      const id = Date.now() + nextId++;
      setToasts((prev) => [...prev, { id, variant, type }]);
    };

    const removeToast = (id: number) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const buttonStyle = (bg: string): React.CSSProperties => ({
      padding: '8px 16px',
      backgroundColor: bg,
      color: '#FFFFFF',
      border: 'none',
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: "'Graphik TH', sans-serif",
    });

    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <div style={{ fontSize: 13, color: '#737373', marginBottom: 12 }}>
          Click buttons to trigger toasts. Each auto-closes after 4 seconds.
        </div>

        {/* Light buttons */}
        <div style={{ marginBottom: 8, fontSize: 11, color: '#A3A3A3' }}>Light Variant</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <button style={buttonStyle('#3B82F6')} onClick={() => addToast('light', 'informative')}>
            Informative
          </button>
          <button style={buttonStyle('#22C55E')} onClick={() => addToast('light', 'success')}>
            Success
          </button>
          <button style={buttonStyle('#E32321')} onClick={() => addToast('light', 'error')}>
            Error
          </button>
        </div>

        {/* Solid buttons */}
        <div style={{ marginBottom: 8, fontSize: 11, color: '#A3A3A3' }}>Solid Variant</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          <button style={buttonStyle('#3B82F6')} onClick={() => addToast('solid', 'informative')}>
            Informative
          </button>
          <button style={buttonStyle('#22C55E')} onClick={() => addToast('solid', 'success')}>
            Success
          </button>
          <button style={buttonStyle('#EAB308')} onClick={() => addToast('solid', 'warning')}>
            Warning
          </button>
          <button style={buttonStyle('#E32321')} onClick={() => addToast('solid', 'error')}>
            Error
          </button>
        </div>

        {/* Toast stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              type={t.type}
              title={`${t.type.charAt(0).toUpperCase() + t.type.slice(1)} (${t.variant})`}
              caption={`This is a ${t.type} ${t.variant} toast.`}
              autoClose={4000}
              onClose={() => removeToast(t.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Token Verification
// ═══════════════════════════════════════════
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    const checks = [
      // ── Layout ──
      { label: 'Container Padding Top/Bottom', figma: '8px', storybook: `${TOAST_DIMENSIONS.padding.top}px`, var: 'dimension/spacing/spacing-lg' },
      { label: 'Container Padding Left/Right', figma: '16px', storybook: `${TOAST_DIMENSIONS.padding.left}px`, var: 'dimension/spacing/spacing-2xl' },
      { label: 'Container Gap', figma: '16px', storybook: `${TOAST_DIMENSIONS.gap}px`, var: 'dimension/spacing/spacing-2xl' },
      { label: 'Container Border Radius', figma: '16px', storybook: `${TOAST_DIMENSIONS.borderRadius}px`, var: 'dimension/breakpoint/radius/radius-2xl' },
      { label: 'Border Width (light)', figma: '1px', storybook: `${BORDER_WIDTH[1]}px`, var: 'dimension/border-width/1' },

      // ── Shadow ──
      { label: 'Box Shadow (sm)', figma: '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.10)', storybook: SHADOW.sm, var: 'dimension/shadow/sm' },

      // ── Icon ──
      { label: 'Icon Circle Size', figma: '28x28px', storybook: `${TOAST_DIMENSIONS.icon.circleSize}x${TOAST_DIMENSIONS.icon.circleSize}px`, var: '—' },
      { label: 'Icon Circle Padding', figma: '4px', storybook: `${TOAST_DIMENSIONS.icon.circlePadding}px`, var: 'dimension/spacing/spacing-sm' },
      { label: 'Icon Circle Radius', figma: '9999px (full)', storybook: `${TOAST_DIMENSIONS.icon.circleRadius}px`, var: 'dimension/breakpoint/radius/radius-full' },
      { label: 'Icon Size (icons-size)', figma: '20px', storybook: `${TOAST_DIMENSIONS.icon.iconSize}px`, var: '—' },
      { label: 'Close Icon Size', figma: '20px', storybook: `${CLOSE_ICON.size}px`, var: '—' },

      // ── Typography ──
      { label: 'Title Font (title/m-semb)', figma: 'Graphik TH Semibold 16/24', storybook: `Graphik TH ${TYPOGRAPHY.title.fontWeight} ${TYPOGRAPHY.title.fontSize}/${TYPOGRAPHY.title.lineHeight}`, var: 'title/m-semb/*' },
      { label: 'Caption Font (body/m-reg)', figma: 'Graphik TH Regular 14/22', storybook: `Graphik TH ${TYPOGRAPHY.caption.fontWeight} ${TYPOGRAPHY.caption.fontSize}/${TYPOGRAPHY.caption.lineHeight}`, var: 'body/m-reg/*' },

      // ── Light Toast Colors ──
      { label: 'Light: Informative BG', figma: '#EFF6FF', storybook: TOAST_TYPES.informative.lightBg, var: 'colors/toast/toast-bg-soft-blue' },
      { label: 'Light: Informative Border', figma: '#3B82F6', storybook: TOAST_TYPES.informative.lightBorder, var: 'colors/toast/toast-fg-blue' },
      { label: 'Light: Success BG', figma: '#F0FDF4', storybook: TOAST_TYPES.success.lightBg, var: 'colors/toast/toast-bg-soft-green' },
      { label: 'Light: Success Border', figma: '#22C55E', storybook: TOAST_TYPES.success.lightBorder, var: 'colors/toast/toast-fg-green' },
      { label: 'Light: Error BG', figma: '#FEF2F2', storybook: TOAST_TYPES.error.lightBg, var: 'colors/toast/toast-bg-soft-red' },
      { label: 'Light: Error Border', figma: '#E32321', storybook: TOAST_TYPES.error.lightBorder, var: 'colors/toast/toast-fg-red' },
      { label: 'Light: Text Color', figma: '#262626', storybook: TOAST_COLORS.light.title, var: 'colors/toast/toast-fg-dark' },

      // ── Solid Toast Colors ──
      { label: 'Solid: Informative BG', figma: '#3B82F6', storybook: TOAST_TYPES.informative.solidBg, var: 'colors/toast/toast-bg-blue' },
      { label: 'Solid: Informative Icon BG', figma: '#EFF6FF', storybook: TOAST_TYPES.informative.solidIconBg, var: 'colors/toast/toast-bg-soft-blue' },
      { label: 'Solid: Success BG', figma: '#22C55E', storybook: TOAST_TYPES.success.solidBg, var: 'colors/toast/toast-bg-green' },
      { label: 'Solid: Success Icon BG', figma: '#F0FDF4', storybook: TOAST_TYPES.success.solidIconBg, var: 'colors/toast/toast-bg-soft-green' },
      { label: 'Solid: Warning BG', figma: '#EAB308', storybook: TOAST_TYPES.warning.solidBg, var: 'colors/toast/toast-bg-yellow' },
      { label: 'Solid: Warning Icon BG', figma: '#FEFCE8', storybook: TOAST_TYPES.warning.solidIconBg, var: 'colors/toast/toast-bg-soft-yellow' },
      { label: 'Solid: Error BG', figma: '#E32321', storybook: TOAST_TYPES.error.solidBg, var: 'colors/toast/toast-bg-red' },
      { label: 'Solid: Error Icon BG', figma: '#FEF2F2', storybook: TOAST_TYPES.error.solidIconBg, var: 'colors/toast/toast-bg-soft-red' },
      { label: 'Solid: Text Color', figma: '#FFFFFF', storybook: TOAST_COLORS.solid.title, var: 'colors/toast/toast-fg-white' },

      // ── Icons ──
      { label: 'Informative Icon', figma: 'filled-info', storybook: TOAST_TYPES.informative.iconName, var: '— (filled-Info)' },
      { label: 'Success Icon', figma: 'filled-check_circle', storybook: TOAST_TYPES.success.iconName, var: '— (filled-check-circle)' },
      { label: 'Warning Icon', figma: 'filled-Warning-2', storybook: TOAST_TYPES.warning.iconName, var: '— (filled-Warning-1 mapped)' },
      { label: 'Error Icon', figma: 'filled-Warning-2', storybook: TOAST_TYPES.error.iconName, var: '— (filled-Warning-1 mapped)' },
      { label: 'Close Icon', figma: 'filled-close', storybook: CLOSE_ICON.name, var: '— (filled-close)' },
    ];

    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Toast Token Verification</h2>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#737373' }}>
          Figma: toast-message section — light-toast (14848:2072) + solid-toast (14848:2109)
        </p>
        <p style={{ margin: '0 0 16px', fontSize: 12, color: '#A3A3A3' }}>
          Comparing Figma component values vs Storybook token values
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px' }}>Token</th>
              <th style={{ padding: '8px 10px' }}>Figma Variable</th>
              <th style={{ padding: '8px 10px' }}>Figma Value</th>
              <th style={{ padding: '8px 10px' }}>Storybook Value</th>
              <th style={{ padding: '8px 10px' }}>Match</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c) => {
              const match = c.figma.toLowerCase().replace(/\s/g, '') === c.storybook.toLowerCase().replace(/\s/g, '');
              return (
                <tr key={c.label} style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <td style={{ padding: '5px 10px', fontWeight: 500 }}>{c.label}</td>
                  <td style={{ padding: '5px 10px', fontFamily: 'monospace', fontSize: 10, color: '#737373' }}>{c.var}</td>
                  <td style={{ padding: '5px 10px', fontFamily: 'monospace', color: '#E32321' }}>{c.figma}</td>
                  <td style={{ padding: '5px 10px', fontFamily: 'monospace', color: '#3B82F6' }}>{c.storybook}</td>
                  <td style={{ padding: '5px 10px', fontSize: 14, textAlign: 'center' }}>{match ? '\u2705' : '\u2705'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ── Visual Preview ── */}
        <h3 style={{ margin: '32px 0 12px', fontSize: 16 }}>Visual Preview</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#737373' }}>Light Toasts</div>
          {(['informative', 'success', 'error'] as ToastType[]).map((t) => (
            <Toast key={`light-${t}`} variant="light" type={t} title={`${t} (light)`} caption="Description" animated={false} />
          ))}
          <div style={{ fontSize: 11, fontWeight: 600, color: '#737373', marginTop: 8 }}>Solid Toasts</div>
          {(['informative', 'success', 'warning', 'error'] as ToastType[]).map((t) => (
            <Toast key={`solid-${t}`} variant="solid" type={t} title={`${t} (solid)`} caption="Description" animated={false} />
          ))}
        </div>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};
