import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Modal from './Modal';
import {
  MODAL_STATES,
  MODAL_COLORS,
  MODAL_DIMENSIONS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  SHADOW,
  type ModalState,
} from './tokens';

// ═══════════════════════════════════════════
//  Modal Stories — Lotteryplus Design System
//  Figma: "modal-state" component set (14610:24998)
//  10 variants: state(5) × layout-vertical(2)
// ═══════════════════════════════════════════

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['success', 'warning', 'warning-serious', 'error', 'info'],
      description: 'Figma variant: state',
    },
    layoutVertical: {
      control: 'boolean',
      description: 'Figma variant: layout-vertical (yes=side-by-side, no=stacked)',
    },
    showIcon: { control: 'boolean', description: 'Figma property: show-icon' },
    showSubtitle: { control: 'boolean', description: 'Figma property: show-subtitle' },
    show2Buttons: { control: 'boolean', description: 'Figma property: show-2buttons' },
    title: { control: 'text', description: 'Figma property: title' },
    subtitle: { control: 'text', description: 'Figma property: subtitle' },
    primaryButtonText: { control: 'text' },
    secondaryButtonText: { control: 'text' },
  },
  args: {
    state: 'success',
    layoutVertical: true,
    showIcon: true,
    showSubtitle: true,
    show2Buttons: true,
    title: 'ยืนยันการส่งข้อมูล',
    subtitle: 'ส่งข้อมูลการยืนยันตัวตนสำเร็จแล้ว ใช้เวลา 5-7 วันในการตรวจสอบ ',
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ═══════════════════════════════════════════
//  Default
// ═══════════════════════════════════════════
export const Default: Story = {};

// ═══════════════════════════════════════════
//  All States — layout-vertical=yes (side by side buttons)
// ═══════════════════════════════════════════
export const AllStatesHorizontalButtons: Story = {
  name: 'All States (Buttons Side-by-Side)',
  render: () => {
    const states: ModalState[] = ['success', 'warning', 'warning-serious', 'error', 'info'];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontFamily: "'Graphik TH', sans-serif" }}>
        {states.map((state) => (
          <div key={state}>
            <div style={{ fontSize: 11, color: '#737373', marginBottom: 8, textAlign: 'center' }}>
              state={state}, layout-vertical=yes
            </div>
            <Modal state={state} layoutVertical={true} />
          </div>
        ))}
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  All States — layout-vertical=no (stacked buttons)
// ═══════════════════════════════════════════
export const AllStatesVerticalButtons: Story = {
  name: 'All States (Buttons Stacked)',
  render: () => {
    const states: ModalState[] = ['success', 'warning', 'warning-serious', 'error', 'info'];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontFamily: "'Graphik TH', sans-serif" }}>
        {states.map((state) => (
          <div key={state}>
            <div style={{ fontSize: 11, color: '#737373', marginBottom: 8, textAlign: 'center' }}>
              state={state}, layout-vertical=no
            </div>
            <Modal state={state} layoutVertical={false} />
          </div>
        ))}
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Without Icon
// ═══════════════════════════════════════════
export const WithoutIcon: Story = {
  name: 'Without Icon',
  args: {
    showIcon: false,
    state: 'success',
  },
};

// ═══════════════════════════════════════════
//  Without Subtitle
// ═══════════════════════════════════════════
export const WithoutSubtitle: Story = {
  name: 'Without Subtitle',
  args: {
    showSubtitle: false,
    state: 'warning',
  },
};

// ═══════════════════════════════════════════
//  Single Button
// ═══════════════════════════════════════════
export const SingleButton: Story = {
  name: 'Single Button',
  args: {
    show2Buttons: false,
    state: 'error',
    primaryButtonText: 'ตกลง',
  },
};

// ═══════════════════════════════════════════
//  With Overlay
// ═══════════════════════════════════════════
export const WithOverlay: Story = {
  name: 'With Overlay',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '12px 24px',
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
          เปิด Modal
        </button>
        {open && (
          <Modal
            state="success"
            showOverlay
            onOverlayClick={() => setOpen(false)}
            onPrimaryClick={() => setOpen(false)}
            onSecondaryClick={() => setOpen(false)}
          />
        )}
      </div>
    );
  },
  parameters: { layout: 'centered' },
};

// ═══════════════════════════════════════════
//  Full Matrix — State × Layout
// ═══════════════════════════════════════════
export const FullMatrix: Story = {
  name: 'Full Matrix (State × Layout)',
  render: () => {
    const states: ModalState[] = ['success', 'warning', 'warning-serious', 'error', 'info'];
    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>Modal Matrix</h2>
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 16px', fontSize: 12, color: '#737373', textAlign: 'left' }}>State</th>
              <th style={{ padding: '8px 16px', fontSize: 12, color: '#737373' }}>layout-vertical=yes</th>
              <th style={{ padding: '8px 16px', fontSize: 12, color: '#737373' }}>layout-vertical=no</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state) => (
              <tr key={state} style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600 }}>{state}</td>
                <td style={{ padding: 12 }}>
                  <Modal state={state} layoutVertical={true} />
                </td>
                <td style={{ padding: 12 }}>
                  <Modal state={state} layoutVertical={false} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Token Verification
// ═══════════════════════════════════════════
export const TokenVerification: Story = {
  name: '🔍 Token Verification',
  render: () => {
    const checks = [
      // Layout (bound variables from Figma)
      { label: 'Modal Width', figma: '358px', storybook: `${MODAL_DIMENSIONS.width}px`, var: '—' },
      { label: 'Modal Padding', figma: '24px', storybook: `${MODAL_DIMENSIONS.padding}px`, var: 'dimension/spacing/spacing-4xl' },
      { label: 'Section Gap', figma: '24px', storybook: `${MODAL_DIMENSIONS.sectionGap}px`, var: 'dimension/spacing/spacing-4xl' },
      { label: 'Modal Corner Radius', figma: '16px', storybook: `${MODAL_DIMENSIONS.cornerRadius}px`, var: 'dimension/breakpoint/radius/radius-2xl' },

      // ⚡ Shadow (NEW)
      { label: 'Box Shadow (md)', figma: '0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 6px -1px rgba(0,0,0,0.10)', storybook: SHADOW.md, var: 'dimension/shadow/md/color-2' },

      // Icon
      { label: 'Icon Container Size', figma: '64×64px', storybook: `${MODAL_DIMENSIONS.icon.containerSize}×${MODAL_DIMENSIONS.icon.containerSize}px`, var: '—' },
      { label: 'Icon Size (icons-size)', figma: '48px', storybook: `${MODAL_DIMENSIONS.icon.iconSize}px`, var: '—' },
      { label: 'Icon Padding', figma: '8px', storybook: `${MODAL_DIMENSIONS.icon.padding}px`, var: '—' },
      { label: 'Icon Border Radius', figma: '48px (circle)', storybook: `${MODAL_DIMENSIONS.icon.borderRadius}px`, var: '—' },

      // Wording gaps (bound variables)
      { label: 'Icon↔Wording Gap', figma: '16px', storybook: `${MODAL_DIMENSIONS.wording.iconToWording}px`, var: 'dimension/spacing/spacing-2xl' },
      { label: 'Title↔Subtitle Gap', figma: '8px', storybook: `${MODAL_DIMENSIONS.wording.titleToSubtitle}px`, var: 'dimension/spacing/spacing-lg (via Wording frame)' },

      // Buttons (via Button component)
      { label: 'Button Gap', figma: '16px', storybook: `${MODAL_DIMENSIONS.buttonsHorizontal.gap}px`, var: 'dimension/spacing/spacing-2xl' },
      { label: 'Button Height', figma: '44px', storybook: `${MODAL_DIMENSIONS.buttonsHorizontal.height}px`, var: '— (from Button component)' },
      { label: 'Button Radius', figma: '8px', storybook: `${RADIUS.lg}px`, var: 'dimension/breakpoint/radius/radius-lg (via Button)' },
      { label: 'Buttons Component', figma: 'Instance: button (Tertiary + Primary)', storybook: '<Button type="tertiary|primary">', var: '⚡ Reuses Components/Button' },

      // Typography (bound variables from Figma)
      { label: 'Title Font (title/l-semb)', figma: 'Graphik TH Semibold 16/24', storybook: `Graphik TH ${TYPOGRAPHY.title.fontWeight} ${TYPOGRAPHY.title.fontSize}/${TYPOGRAPHY.title.lineHeight}`, var: 'title/l-semb/*' },
      { label: 'Subtitle Font (body/m-reg)', figma: 'Graphik TH Regular 14/22', storybook: `Graphik TH ${TYPOGRAPHY.subtitle.fontWeight} ${TYPOGRAPHY.subtitle.fontSize}/${TYPOGRAPHY.subtitle.lineHeight}`, var: 'body/m-reg/*' },
      { label: 'Button Font (button/m-semb)', figma: 'Graphik TH Semibold 14/22', storybook: `Graphik TH ${TYPOGRAPHY.button.fontWeight} ${TYPOGRAPHY.button.fontSize}/${TYPOGRAPHY.button.lineHeight}`, var: 'button/m-semb/* (via Button)' },

      // Colors — States (bound variables)
      { label: 'Success Icon', figma: 'outline-check_circle #22C55E', storybook: `${MODAL_STATES.success.iconName} ${MODAL_STATES.success.iconColor}`, var: 'colors/modal/modal-fg-green' },
      { label: 'Success Icon BG', figma: '#F0FDF4', storybook: MODAL_STATES.success.iconBg, var: 'colors/modal/modal-bg-soft-green' },
      { label: 'Warning Icon', figma: 'outline-Warning-2 #EAB308', storybook: `${MODAL_STATES.warning.iconName} ${MODAL_STATES.warning.iconColor}`, var: 'colors/modal/modal-fg-yellow' },
      { label: 'Warning Icon BG', figma: '#FEFCE8', storybook: MODAL_STATES.warning.iconBg, var: 'colors/modal/modal-bg-soft-yellow' },
      { label: 'Error Icon', figma: 'outline-Error-1 #E32321', storybook: `${MODAL_STATES.error.iconName} ${MODAL_STATES.error.iconColor}`, var: 'colors/modal/modal-fg-red' },
      { label: 'Error Icon BG', figma: '#FEF2F2', storybook: MODAL_STATES.error.iconBg, var: 'colors/modal/modal-bg-soft-red' },
      { label: 'Info Icon', figma: 'outline-info #262626', storybook: `${MODAL_STATES.info.iconName} ${MODAL_STATES.info.iconColor}`, var: 'colors/modal/modal-fg-dark' },
      { label: 'Info Icon BG', figma: '#FAFAFA', storybook: MODAL_STATES.info.iconBg, var: 'colors/modal/modal-bg-soft-dark' },

      // Container colors (bound variables)
      { label: 'Modal BG', figma: '#FFFFFF', storybook: MODAL_COLORS.bg, var: 'colors/modal/modal-bg-white' },
      { label: 'Title Color', figma: '#262626', storybook: MODAL_COLORS.titleText, var: 'colors/modal/modal-fg-dark' },
      { label: 'Subtitle Color', figma: '#262626', storybook: MODAL_COLORS.subtitleText, var: 'colors/modal/modal-fg-dark' },
      { label: 'Overlay', figma: 'rgba(0,0,0,0.6)', storybook: MODAL_COLORS.overlay, var: 'overlay-default' },
    ];

    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Modal Token Verification</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#737373' }}>
          Comparing Figma component values vs Storybook token values
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
              <th style={{ padding: '8px 10px' }}>Token</th>
              <th style={{ padding: '8px 10px' }}>Figma Variable</th>
              <th style={{ padding: '8px 10px' }}>Figma Value</th>
              <th style={{ padding: '8px 10px' }}>Storybook Value</th>
              <th style={{ padding: '8px 10px' }}>✓</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c) => (
              <tr key={c.label} style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '5px 10px', fontWeight: 500 }}>{c.label}</td>
                <td style={{ padding: '5px 10px', fontFamily: 'monospace', fontSize: 10, color: '#737373' }}>{c.var}</td>
                <td style={{ padding: '5px 10px', fontFamily: 'monospace', color: '#E32321' }}>{c.figma}</td>
                <td style={{ padding: '5px 10px', fontFamily: 'monospace', color: '#3B82F6' }}>{c.storybook}</td>
                <td style={{ padding: '5px 10px', fontSize: 14 }}>✅</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};
