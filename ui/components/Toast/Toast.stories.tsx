import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Toast from './Toast';
import {
  TOAST_VARIANTS,
  TOAST_TYPES,
  TOAST_LIGHT_TYPES,
  TOAST_ICONS,
  TOAST_CLOSE_ICON,
  toastColors,
  toastColorTokens,
  toastColorValues,
  toastValue,
  type ToastType,
  type ToastVariant,
} from './tokens';
import { sysValue } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';
import type { ColorBinding } from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Toast Stories — Lotteryplus Design System
//  Figma: "toast-message" section
//    light-toast (14848:2072): 3 types (informative, success, error)
//    solid-toast (14848:2109): 4 types (informative, success, warning, error)
//
//  Values shown here are read from foundations/tokens.generated.ts, which is
//  generated from Figma. Nothing on this page is typed by hand, so a table can
//  never claim a value the component does not actually render.
// ═══════════════════════════════════════════

const sans = 'var(--sys-type-body-md-regular-family), sans-serif';
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const muted = 'var(--sys-color-text-tertiary-default)';
const faint = 'var(--sys-color-text-state-light-gray)';

const meta: Meta<typeof Toast> = {
  title: 'Components/Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: TOAST_VARIANTS,
      description: 'Figma component set: light-toast / solid-toast',
    },
    type: {
      control: 'select',
      options: TOAST_TYPES,
      description: 'Figma variant: type. `warning` exists only on solid-toast.',
    },
    title: { control: 'text', description: 'Title text — typography/title/lg/semibold' },
    caption: { control: 'text', description: 'Caption text — typography/body/md/regular' },
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
//  Light Types — the 3 types the light-toast set ships
// ═══════════════════════════════════════════
export const LightTypes: Story = {
  name: 'Light Types',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sys-spacing-2xl)',
        fontFamily: sans,
        maxWidth: 480,
      }}
    >
      <div style={{ fontSize: 13, color: muted, marginBottom: 'var(--sys-spacing-sm)' }}>
        Figma: light-toast (14848:2072) — soft bg + coloured border
      </div>
      {TOAST_LIGHT_TYPES.map((t) => (
        <div key={t}>
          <div style={{ fontSize: 11, color: faint, marginBottom: 'var(--sys-spacing-sm)' }}>
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
  ),
};

// ═══════════════════════════════════════════
//  Solid Types — all 4 solid toast types
// ═══════════════════════════════════════════
export const SolidTypes: Story = {
  name: 'Solid Types',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sys-spacing-2xl)',
        fontFamily: sans,
        maxWidth: 480,
      }}
    >
      <div style={{ fontSize: 13, color: muted, marginBottom: 'var(--sys-spacing-sm)' }}>
        Figma: solid-toast (14848:2109) — solid coloured bg, white text
      </div>
      {TOAST_TYPES.map((t) => (
        <div key={t}>
          <div style={{ fontSize: 11, color: faint, marginBottom: 'var(--sys-spacing-sm)' }}>
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
  ),
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
      <div style={{ fontFamily: sans, maxWidth: 480 }}>
        <div style={{ fontSize: 13, color: muted, marginBottom: 'var(--sys-spacing-xl)' }}>
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
          <div
            style={{
              padding: 'var(--sys-spacing-2xl) var(--sys-spacing-3xl)',
              backgroundColor: 'var(--sys-color-background-light)',
              borderRadius: 'var(--sys-radius-xl)',
              fontSize: 14,
              color: muted,
            }}
          >
            Toast dismissed.
          </div>
        )}

        <button
          onClick={handleReset}
          style={{
            marginTop: 'var(--sys-spacing-2xl)',
            padding: 'var(--sys-spacing-lg) var(--sys-spacing-3xl)',
            backgroundColor: 'var(--sys-color-primary-default)',
            color: 'var(--sys-color-foreground-white)',
            border: 'none',
            borderRadius: 'var(--sys-radius-lg)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: sans,
          }}
        >
          Show Again
        </button>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Interactive — trigger toasts of every variant x type
// ═══════════════════════════════════════════
export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [toasts, setToasts] = useState<
      Array<{ id: number; variant: ToastVariant; type: ToastType }>
    >([]);

    let nextId = 0;

    const addToast = (variant: ToastVariant, type: ToastType) => {
      const id = Date.now() + nextId++;
      setToasts((prev) => [...prev, { id, variant, type }]);
    };

    const removeToast = (id: number) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    /** The trigger swatch reuses the toast's own solid background token. */
    const triggerStyle = (type: ToastType): React.CSSProperties => ({
      padding: 'var(--sys-spacing-lg) var(--sys-spacing-2xl)',
      backgroundColor: toastColors('solid', type).background,
      color: 'var(--sys-color-foreground-white)',
      border: 'none',
      borderRadius: 'var(--sys-radius-lg)',
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: sans,
      textTransform: 'capitalize',
    });

    const row = (variant: ToastVariant, types: readonly ToastType[]) => (
      <>
        <div style={{ marginBottom: 'var(--sys-spacing-lg)', fontSize: 11, color: faint }}>
          {variant} variant
        </div>
        <div
          style={{
            display: 'flex',
            gap: 'var(--sys-spacing-lg)',
            marginBottom: 'var(--sys-spacing-2xl)',
            flexWrap: 'wrap',
          }}
        >
          {types.map((type) => (
            <button
              key={`${variant}-${type}`}
              style={triggerStyle(type)}
              onClick={() => addToast(variant, type)}
            >
              {type}
            </button>
          ))}
        </div>
      </>
    );

    return (
      <div style={{ fontFamily: sans }}>
        <div style={{ fontSize: 13, color: muted, marginBottom: 'var(--sys-spacing-xl)' }}>
          Click a trigger to raise a toast. Each auto-closes after 4 seconds.
        </div>

        {row('light', TOAST_LIGHT_TYPES)}
        {row('solid', TOAST_TYPES)}

        {/* Toast stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sys-spacing-lg)',
            maxWidth: 480,
          }}
        >
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
//  Token chain — Tier 2 alias → Tier 1 semantic → literal
// ═══════════════════════════════════════════

/** Tier 2 token → the Tier 1 semantic it aliases. `(fixed)` = no semantic backs it. */
const LAYOUT_CHAIN: Array<[string, string]> = [
  ['radius', 'radius-2xl'],
  ['border-width', 'border-width-hairline'],
  ['padding-y', 'spacing-lg'],
  ['padding-x', 'spacing-2xl'],
  ['gap', 'spacing-2xl'],
  ['text-gap', 'spacing-none'],
  ['shadow', 'elevation-card'],
  ['icon-circle-size', ''],
  ['icon-circle-padding', 'spacing-sm'],
  ['icon-circle-radius', 'radius-full'],
  ['icon-size', ''],
  ['close-icon-size', ''],
  ['typography-title-family', 'type-title-lg-semibold-family'],
  ['typography-title-size', 'type-title-lg-semibold-size'],
  ['typography-title-line-height', 'type-title-lg-semibold-line-height'],
  ['typography-title-weight', 'type-title-lg-semibold-weight'],
  ['typography-title-tracking', 'type-title-lg-semibold-tracking'],
  ['typography-caption-family', 'type-body-md-regular-family'],
  ['typography-caption-size', 'type-body-md-regular-size'],
  ['typography-caption-line-height', 'type-body-md-regular-line-height'],
  ['typography-caption-weight', 'type-body-md-regular-weight'],
  ['typography-caption-tracking', 'type-body-md-regular-tracking'],
];

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 600,
  color: muted,
  borderBottom: '2px solid var(--sys-color-border-accent-gray-soft-light)',
};

const td: React.CSSProperties = {
  padding: '6px 12px',
  borderBottom: '1px solid var(--sys-color-background-light)',
  fontFamily: mono,
  fontSize: 11,
};

const Swatch: React.FC<{ hex?: string }> = ({ hex }) =>
  hex ? (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 'var(--sys-radius-xs)',
          background: hex,
          border: '1px solid var(--sys-color-border-accent-gray-soft-light)',
        }}
      />
      {hex}
    </span>
  ) : (
    <span style={{ color: faint }}>—</span>
  );

export const TokenChain: Story = {
  name: '🔍 Token Chain',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 980 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Toast token chain</h2>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: muted }}>
        Every value flows Figma → design.md + components/toast.json → components.json →
        tokens.css. The component renders the Tier 2 alias; the alias points at a Tier 1
        semantic token; that resolves to the literal. Nothing below is hand-typed — the
        Value columns are read from tokens.generated.ts.
      </p>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Layout, sizing &amp; typography</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
        <thead>
          <tr>
            <th style={th}>Tier 2 — component</th>
            <th style={th}>Tier 1 — semantic</th>
            <th style={th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {LAYOUT_CHAIN.map(([token, semantic]) => (
            <tr key={token}>
              <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>
                --toast-{token}
              </td>
              <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
                {semantic ? `--sys-${semantic}` : '(fixed — no semantic token)'}
              </td>
              <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>
                {toastValue(token)}
                {semantic && sysValue(semantic) !== toastValue(token) ? ' ⚠︎ drift' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours by variant and type</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
        <thead>
          <tr>
            <th style={th}>Variant</th>
            <th style={th}>Type</th>
            <th style={th}>Background</th>
            <th style={th}>Border</th>
            <th style={th}>Icon circle</th>
            <th style={th}>Icon</th>
            <th style={th}>Text</th>
          </tr>
        </thead>
        <tbody>
          {TOAST_VARIANTS.flatMap((variant) =>
            (variant === 'light' ? TOAST_LIGHT_TYPES : TOAST_TYPES).map((type) => {
              const v = toastColorValues(variant, type);
              return (
                <tr key={`${variant}-${type}`}>
                  <td style={{ ...td, fontFamily: sans, textTransform: 'capitalize' }}>
                    {variant}
                  </td>
                  <td style={td}>{type}</td>
                  <td style={td}>
                    <Swatch hex={v.background} />
                  </td>
                  <td style={td}>
                    <Swatch hex={v.border} />
                  </td>
                  <td style={td}>
                    <Swatch hex={v.iconCircle} />
                  </td>
                  <td style={td}>
                    <Swatch hex={v.icon} />
                  </td>
                  <td style={td}>
                    <Swatch hex={v.text} />
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Icons</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
        <thead>
          <tr>
            <th style={th}>Slot</th>
            <th style={th}>Icon component</th>
            <th style={th}>Size</th>
          </tr>
        </thead>
        <tbody>
          {TOAST_TYPES.map((type) => (
            <tr key={type}>
              <td style={{ ...td, fontFamily: sans }}>{type}</td>
              <td style={td}>{TOAST_ICONS[type]}</td>
              <td style={td}>{toastValue('icon-size')}</td>
            </tr>
          ))}
          <tr>
            <td style={{ ...td, fontFamily: sans }}>close</td>
            <td style={td}>{TOAST_CLOSE_ICON}</td>
            <td style={td}>{toastValue('close-icon-size')}</td>
          </tr>
        </tbody>
      </table>

      {/* ── Visual Preview ── */}
      <h3 style={{ fontSize: 14, margin: '0 0 12px' }}>Visual preview</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sys-spacing-xl)',
          maxWidth: 480,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 600, color: muted }}>Light toasts</div>
        {TOAST_LIGHT_TYPES.map((t) => (
          <Toast
            key={`light-${t}`}
            variant="light"
            type={t}
            title={`${t} (light)`}
            caption="Description"
            animated={false}
          />
        ))}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: muted,
            marginTop: 'var(--sys-spacing-lg)',
          }}
        >
          Solid toasts
        </div>
        {TOAST_TYPES.map((t) => (
          <Toast
            key={`solid-${t}`}
            variant="solid"
            type={t}
            title={`${t} (solid)`}
            caption="Description"
            animated={false}
          />
        ))}
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Color bindings — generated from the token chain
// ═══════════════════════════════════════════

/** Figma still abbreviates bg/fg; this reconstructs the variable path. */
const figmaName = (token: string): string =>
  `colors/toast/toast-${token.replace(/^background-/, 'bg-').replace(/^foreground-/, 'fg-')}`;

/** Which slot(s) each colour token feeds, derived from the same map the component uses. */
const usageOf = (token: string): string => {
  const uses: string[] = [];
  for (const variant of TOAST_VARIANTS) {
    for (const type of variant === 'light' ? TOAST_LIGHT_TYPES : TOAST_TYPES) {
      const slots = toastColorTokens(variant, type);
      for (const [slot, name] of Object.entries(slots)) {
        if (name === token) uses.push(`${variant} ${type} ${slot}`);
      }
    }
  }
  return uses.length ? uses.join(', ') : 'declared in Figma, unused by this component';
};

const COLOR_BINDINGS: ColorBinding[] = [
  'background-soft-blue',
  'foreground-blue',
  'background-soft-green',
  'foreground-green',
  'background-soft-red',
  'foreground-red',
  'background-soft-yellow',
  'foreground-yellow',
  'foreground-dark',
  'background-blue',
  'background-green',
  'background-yellow',
  'background-red',
  'foreground-white',
].map((token) => ({
  token: `--toast-${token}`,
  figmaVariable: figmaName(token),
  hex: toastValue(token),
  usage: usageOf(token),
}));

export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="Toast"
      figmaId="14848:2072 (light) / 14848:2109 (solid)"
      bindings={COLOR_BINDINGS}
    />
  ),
};
