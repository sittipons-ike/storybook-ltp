import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Modal from './Modal';
import {
  MODAL_STATES,
  MODAL_ICONS,
  modalColorValues,
  modalStateTokens,
  modalValue,
  type ModalState,
} from './tokens';
import { sys, sysValue } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';
import type { ColorBinding } from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Modal Stories — Lotteryplus Design System
//  Figma: "modal-state" component set (14610:24998)
//  10 variants: state(5) × layout-vertical(2)
//
//  Values shown here are read from foundations/tokens.generated.ts, which is
//  generated from Figma. Nothing on this page is typed by hand, so a table can
//  never claim a value the component does not actually render.
// ═══════════════════════════════════════════

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const meta: Meta<typeof Modal> = {
  title: 'Components/Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: MODAL_STATES,
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
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: sys('spacing-4xl'),
        fontFamily: sans,
      }}
    >
      {MODAL_STATES.map((state) => (
        <div key={state}>
          <div
            style={{
              fontSize: sys('type-caption-md-regular-size'),
              color: sys('color-text-tertiary-default'),
              marginBottom: sys('spacing-lg'),
              textAlign: 'center',
            }}
          >
            state={state}, layout-vertical=yes
          </div>
          <Modal state={state} layoutVertical={true} />
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  All States — layout-vertical=no (stacked buttons)
// ═══════════════════════════════════════════
export const AllStatesVerticalButtons: Story = {
  name: 'All States (Buttons Stacked)',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: sys('spacing-4xl'),
        fontFamily: sans,
      }}
    >
      {MODAL_STATES.map((state) => (
        <div key={state}>
          <div
            style={{
              fontSize: sys('type-caption-md-regular-size'),
              color: sys('color-text-tertiary-default'),
              marginBottom: sys('spacing-lg'),
              textAlign: 'center',
            }}
          >
            state={state}, layout-vertical=no
          </div>
          <Modal state={state} layoutVertical={false} />
        </div>
      ))}
    </div>
  ),
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
      <div style={{ fontFamily: sans }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: `${sysValue('spacing-xl')} ${sysValue('spacing-4xl')}`,
            backgroundColor: sys('color-primary-default'),
            color: sys('color-foreground-white'),
            border: 'none',
            borderRadius: sys('radius-lg'),
            fontSize: sys('type-button-md-semibold-size'),
            fontWeight: sys('type-button-md-semibold-weight') as unknown as React.CSSProperties['fontWeight'],
            cursor: 'pointer',
            fontFamily: sans,
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
  render: () => (
    <div style={{ fontFamily: sans }}>
      <h2 style={{ margin: `0 0 ${sysValue('spacing-2xl')}`, fontSize: 20 }}>Modal Matrix</h2>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{
                padding: `${sysValue('spacing-lg')} ${sysValue('spacing-2xl')}`,
                fontSize: 12,
                color: sys('color-text-tertiary-default'),
                textAlign: 'left',
              }}
            >
              State
            </th>
            <th
              style={{
                padding: `${sysValue('spacing-lg')} ${sysValue('spacing-2xl')}`,
                fontSize: 12,
                color: sys('color-text-tertiary-default'),
              }}
            >
              layout-vertical=yes
            </th>
            <th
              style={{
                padding: `${sysValue('spacing-lg')} ${sysValue('spacing-2xl')}`,
                fontSize: 12,
                color: sys('color-text-tertiary-default'),
              }}
            >
              layout-vertical=no
            </th>
          </tr>
        </thead>
        <tbody>
          {MODAL_STATES.map((state) => (
            <tr key={state} style={{ borderBottom: `1px solid ${sysValue('color-background-light')}` }}>
              <td style={{ padding: sys('spacing-xl'), fontSize: 12, fontWeight: 600 }}>{state}</td>
              <td style={{ padding: sys('spacing-xl') }}>
                <Modal state={state} layoutVertical={true} />
              </td>
              <td style={{ padding: sys('spacing-xl') }}>
                <Modal state={state} layoutVertical={false} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Token Verification — the chain, read from the generated tokens
// ═══════════════════════════════════════════

/** Tier 2 token → the Tier 1 semantic token it aliases. `(fixed)` = a literal px value. */
const LAYOUT_CHAIN: Array<[string, string]> = [
  ['--modal-width', '(fixed)'],
  ['--modal-radius', '--sys-radius-2xl'],
  ['--modal-padding', '--sys-spacing-4xl'],
  ['--modal-gap', '--sys-spacing-4xl'],
  ['--modal-content-gap', '--sys-spacing-2xl'],
  ['--modal-wording-gap', '--sys-spacing-lg'],
  ['--modal-button-gap', '--sys-spacing-2xl'],
  ['--modal-elevation', '--sys-elevation-modal'],
  ['--modal-scrim', '--sys-color-overlay-default'],
  ['--modal-icon-circle-size', '(fixed)'],
  ['--modal-icon-circle-padding', '--sys-spacing-lg'],
  ['--modal-icon-circle-radius', '--sys-radius-full'],
  ['--modal-icon-size', '(fixed)'],
  ['--modal-typography-title-family', '--sys-type-title-lg-semibold-family'],
  ['--modal-typography-title-size', '--sys-type-title-lg-semibold-size'],
  ['--modal-typography-title-line-height', '--sys-type-title-lg-semibold-line-height'],
  ['--modal-typography-title-weight', '--sys-type-title-lg-semibold-weight'],
  ['--modal-typography-title-tracking', '--sys-type-title-lg-semibold-tracking'],
  ['--modal-typography-subtitle-family', '--sys-type-body-md-regular-family'],
  ['--modal-typography-subtitle-size', '--sys-type-body-md-regular-size'],
  ['--modal-typography-subtitle-line-height', '--sys-type-body-md-regular-line-height'],
  ['--modal-typography-subtitle-weight', '--sys-type-body-md-regular-weight'],
  ['--modal-typography-subtitle-tracking', '--sys-type-body-md-regular-tracking'],
];

/** Container colours the modal renders directly, outside the per-state palette. */
const CONTAINER_COLOURS: Array<[string, string, string]> = [
  ['--modal-background-white', '--sys-color-background-default', 'Modal surface'],
  ['--modal-foreground-dark', '--sys-color-secondary-default', 'Title & subtitle text'],
  ['--modal-scrim', '--sys-color-overlay-default', 'Scrim behind the modal (black 60%)'],
];

export const TokenVerification: Story = {
  name: '🔍 Token Verification',
  render: () => {
    const th: React.CSSProperties = {
      textAlign: 'left',
      padding: '8px 12px',
      fontSize: 11,
      fontWeight: 600,
      color: sys('color-text-tertiary-default'),
      borderBottom: `2px solid ${sysValue('color-border-accent-gray-soft-light')}`,
    };
    const td: React.CSSProperties = {
      padding: '6px 12px',
      borderBottom: `1px solid ${sysValue('color-background-light')}`,
      fontFamily: mono,
      fontSize: 11,
    };

    const swatch = (hex: string) =>
      hex ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: hex,
              border: '1px solid rgba(0,0,0,0.15)',
            }}
          />
          {hex}
        </span>
      ) : (
        <span style={{ color: sys('color-text-state-light-gray') }}>—</span>
      );

    return (
      <div style={{ fontFamily: sans, maxWidth: 960 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Modal token chain</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: sys('color-text-tertiary-default') }}>
          Every value flows Figma → design.md → components.json → tokens.css. The component
          renders the Tier 2 alias; the alias points at a Tier 1 semantic token; that resolves
          to the literal. Nothing below is hand-typed — the “Value” column is read from
          foundations/tokens.generated.ts, so it cannot claim a value Modal does not render.
        </p>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Layout &amp; typography</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {LAYOUT_CHAIN.map(([comp, semantic]) => (
              <tr key={comp}>
                <td style={{ ...td, color: sys('color-primary-default') }}>{comp}</td>
                <td style={{ ...td, color: sys('color-status-info-default') }}>{semantic}</td>
                <td style={{ ...td, color: sys('color-status-success-dark') }}>
                  {modalValue(comp.replace('--modal-', ''))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Container colours</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Value</th>
              <th style={th}>Usage</th>
            </tr>
          </thead>
          <tbody>
            {CONTAINER_COLOURS.map(([comp, semantic, usage]) => (
              <tr key={comp}>
                <td style={{ ...td, color: sys('color-primary-default') }}>{comp}</td>
                <td style={{ ...td, color: sys('color-status-info-default') }}>{semantic}</td>
                <td style={td}>{swatch(modalValue(comp.replace('--modal-', '')))}</td>
                <td style={{ ...td, fontFamily: sans }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours by state</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>State</th>
              <th style={th}>Icon</th>
              <th style={th}>Foreground token</th>
              <th style={th}>Foreground</th>
              <th style={th}>Background token</th>
              <th style={th}>Background</th>
            </tr>
          </thead>
          <tbody>
            {MODAL_STATES.map((state) => {
              const names = modalStateTokens(state);
              const v = modalColorValues(state);
              return (
                <tr key={state}>
                  <td style={{ ...td, fontFamily: sans }}>{state}</td>
                  <td style={td}>{MODAL_ICONS[state]}</td>
                  <td style={{ ...td, color: sys('color-primary-default') }}>
                    {`--modal-${names.foreground}`}
                  </td>
                  <td style={td}>{swatch(v.foreground)}</td>
                  <td style={{ ...td, color: sys('color-primary-default') }}>
                    {`--modal-${names.background}`}
                  </td>
                  <td style={td}>{swatch(v.background)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ── Color Bindings ──
const stateBindings: ColorBinding[] = MODAL_STATES.flatMap((state: ModalState) => {
  const names = modalStateTokens(state);
  const values = modalColorValues(state);
  return [
    {
      token: `modal-${names.foreground}`,
      figmaVariable: `colors/modal/${names.foreground.replace('foreground-', 'modal-fg-')}`,
      hex: values.foreground,
      usage: `${state} — icon glyph`,
    },
    {
      token: `modal-${names.background}`,
      figmaVariable: `colors/modal/${names.background.replace('background-', 'modal-bg-')}`,
      hex: values.background,
      usage: `${state} — icon circle background`,
    },
  ];
});

// The palette is shared between states (error and warning-serious both read red), so
// dedupe on the token name rather than listing the same row twice.
const uniqueStateBindings = stateBindings.filter(
  (binding, i, all) => all.findIndex((b) => b.token === binding.token) === i,
);

export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="Modal"
      figmaId="14610:24998"
      bindings={[
        {
          token: 'modal-background-white',
          figmaVariable: 'colors/modal/modal-bg-white',
          hex: modalValue('background-white'),
          usage: 'Modal surface',
        },
        {
          token: 'modal-foreground-dark',
          figmaVariable: 'colors/modal/modal-fg-dark',
          hex: modalValue('foreground-dark'),
          usage: 'Title & subtitle text',
        },
        {
          token: 'modal-scrim',
          figmaVariable: 'colors/overlay/overlay-default',
          hex: sysValue('color-overlay-default'),
          usage: 'Scrim behind the modal (black 60%)',
        },
        ...uniqueStateBindings,
      ]}
    />
  ),
};
