import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from './Button';
import {
  buttonColors,
  buttonColorValues,
  buttonValue,
  BUTTON_VARIANTS,
  BUTTON_STATES,
  BUTTON_SIZES,
  type ButtonVariant,
  type ButtonSize,
} from './tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  Button Stories — Lotteryplus Design System
//  Figma: "button" component set (14291:130847)
//  195 variants: Size(3) × Variant(5) × Show icon(2) × Show Text(2) × State(5)
//
//  Values shown here are read from foundations/tokens.generated.ts, which is
//  generated from Figma. Nothing on this page is typed by hand, so a table can
//  never claim a value the component does not actually render.
// ═══════════════════════════════════════════

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
      description: 'Canonical variant. `outline` and `link` are approved extensions.',
    },
    size: {
      control: 'select',
      options: BUTTON_SIZES,
      description: 'T-shirt size — lg (44px) / md (36px) / sm (28px)',
    },
    showIcon: { control: 'boolean', description: 'Figma variant: Show icon' },
    showText: { control: 'boolean', description: 'Figma variant: Show Text' },
    iconName: { control: 'text', description: 'Icon name from Components/Icon library' },
    disabled: { control: 'boolean', description: 'Canonical state: disabled' },
    fullWidth: { control: 'boolean' },
    children: { control: 'text', description: 'Figma property: Text#1891:27' },
  },
  args: {
    children: 'BUTTON',
    variant: 'primary',
    size: 'lg',
    showIcon: false,
    showText: true,
    disabled: false,
    iconName: 'outline-Home',
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Button>;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export const Default: Story = {};

// ═══════════════════════════════════════════
//  All Variants
// ═══════════════════════════════════════════
/**
 * `special` — Figma's `button-special / status=random-number` (`14291:131519`).
 *
 * The one variant that carries its own geometry: 114x54 where the size axis stops at 44, a
 * gradient rather than a flat fill, and two blurred ellipses over it. Three of its four
 * states differ in ways a colour token cannot express, so they are drawn here side by side —
 * hover and pressed drop the lower glow, focus is the only ring any Button variant draws,
 * and pressed lays a 40% scrim over the gradient.
 *
 * It arrived on 2026-08-22, when reading all twelve `button-special` variants showed the set
 * to be four unrelated controls and only this one a button. See phase3-vocabulary.md §2.
 */
export const Special: Story = {
  name: 'special — the randomise control',
  render: () => (
    <div style={{ fontFamily: sans, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        กด/โฟกัสดูได้ — state ต่างกันที่ <strong>glow ล่าง</strong> (hover · pressed ซ่อน),{' '}
        <strong>ring 4px</strong> (focus) และ <strong>scrim ดำ 40%</strong> (pressed)
      </p>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="special" showIcon iconName="filled-AI">
          สุ่มตัวเลข
        </Button>
        <Button variant="special" showIcon iconName="filled-AI" disabled>
          สุ่มตัวเลข
        </Button>
      </div>
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.8, color: sys('color-text-tertiary-default') }}>
        Figma ไม่ได้วาด state <code style={{ fontFamily: mono }}>disabled</code> ให้ตัวนี้ —
        ตัวขวาใช้ opacity ที่ใช้ร่วมกันทั้ง Button บันทึกไว้ใน{' '}
        <code style={{ fontFamily: mono }}>known_gaps</code> ให้ดีไซเนอร์วาดเพิ่ม
      </p>
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {BUTTON_VARIANTS.map((variant) => (
        <div key={variant}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--sys-color-text-tertiary-default)',
              marginBottom: 8,
              textTransform: 'capitalize',
              fontFamily: sans,
            }}
          >
            {variant}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button variant={variant} size="lg">BUTTON</Button>
            <Button variant={variant} size="lg" showIcon iconName="outline-Home">BUTTON</Button>
            <Button variant={variant} size="lg" showIcon showText={false} iconName="outline-Home" />
            <Button variant={variant} size="lg" disabled>BUTTON</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════
//  All Sizes
// ═══════════════════════════════════════════
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {BUTTON_SIZES.map((size) => (
        <div key={size}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--sys-color-text-tertiary-default)',
              marginBottom: 8,
              fontFamily: sans,
            }}
          >
            Size {size} — height {buttonValue(`${size}-height`)}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button size={size}>BUTTON</Button>
            <Button size={size} showIcon iconName="outline-Home">BUTTON</Button>
            <Button size={size} showIcon showText={false} iconName="outline-Home" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════
//  All States — the canonical five
// ═══════════════════════════════════════════
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: sans }}>
      <p style={{ margin: 0, fontSize: 12, color: 'var(--sys-color-text-tertiary-default)' }}>
        States use the canonical names from the Design System Standard:{' '}
        <code style={{ fontFamily: mono }}>rest · hover · active · focus · disabled</code>.
        Figma still calls them default / pressed / focused — that rename is queued in
        figma-rename-map.md.
      </p>
      {BUTTON_VARIANTS.map((variant) => (
        <div key={variant}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--sys-color-text-secondary-default)',
              marginBottom: 12,
              textTransform: 'capitalize',
            }}
          >
            {variant}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            {BUTTON_STATES.map((state) => {
              const colors = buttonColors(variant, state);
              const values = buttonColorValues(variant, state);
              return (
                <div key={state} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 'var(--btn-lg-height)',
                      paddingLeft: 'var(--btn-padding-x)',
                      paddingRight: 'var(--btn-padding-x)',
                      borderRadius: 'var(--btn-radius)',
                      backgroundColor: colors.background,
                      color: colors.foreground,
                      border: `var(--btn-border-width) solid ${colors.border}`,
                      fontFamily: 'var(--btn-typography-family)',
                      fontSize: 'var(--btn-typography-size)',
                      fontWeight: 'var(--btn-typography-weight)' as any,
                      lineHeight: 'var(--btn-typography-line-height)',
                      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
                    }}
                  >
                    BUTTON
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--sys-color-text-tertiary-default)', marginTop: 4 }}>
                    {state}
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--sys-color-text-state-light-gray)', fontFamily: mono }}>
                    {values.background}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  With Icons
// ═══════════════════════════════════════════
export const WithIcons: Story = {
  name: 'With Icons',
  render: () => {
    const icons = [
      'outline-Home',
      'outline-cart',
      'outline-Search',
      'outline-setting',
      'outline-notification',
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: sans }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sys-color-text-secondary-default)' }}>
          Icon + text — padding-left {buttonValue('padding-left-with-icon')}, gap {buttonValue('gap')}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {icons.map((icon) => (
            <Button key={icon} showIcon iconName={icon}>
              {icon.replace('outline-', '').toUpperCase()}
            </Button>
          ))}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--sys-color-text-secondary-default)',
            marginTop: 8,
          }}
        >
          Icon only — padding {buttonValue('lg-icon-only-padding')}, icon {buttonValue('icon-size')}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {icons.map((icon) => (
            <Button key={icon} showIcon showText={false} iconName={icon} />
          ))}
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Token chain — component alias → semantic → value
// ═══════════════════════════════════════════
export const TokenChain: Story = {
  name: '🔍 Token Chain',
  render: () => {
    const layout: Array<[string, string]> = [
      ['--btn-radius', '--sys-radius-lg'],
      ['--btn-border-width', '--sys-border-width-hairline'],
      ['--btn-padding-x', '--sys-spacing-2xl'],
      ['--btn-padding-y', '--sys-spacing-none'],
      ['--btn-padding-left-with-icon', '--sys-spacing-xl'],
      ['--btn-gap', '--sys-spacing-sm'],
      ['--btn-lg-height', '(fixed)'],
      ['--btn-md-height', '(fixed)'],
      ['--btn-sm-height', '(fixed)'],
      ['--btn-icon-size', '(fixed)'],
      ['--btn-typography-family', '--sys-type-button-md-semibold-family'],
      ['--btn-typography-size', '--sys-type-button-md-semibold-size'],
      ['--btn-typography-weight', '--sys-type-button-md-semibold-weight'],
      ['--btn-typography-line-height', '--sys-type-button-md-semibold-line-height'],
    ];

    const th: React.CSSProperties = {
      textAlign: 'left',
      padding: '8px 12px',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--sys-color-text-tertiary-default)',
      borderBottom: '2px solid var(--sys-color-border-accent-gray-soft-light)',
    };
    const td: React.CSSProperties = {
      padding: '6px 12px',
      borderBottom: '1px solid var(--sys-color-background-light)',
      fontFamily: mono,
      fontSize: 11,
    };

    return (
      <div style={{ fontFamily: sans, maxWidth: 900 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Button token chain</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--sys-color-text-tertiary-default)' }}>
          Every value flows Figma → design.md → components.json → tokens.css. The component
          renders the Tier 2 alias; the alias points at a Tier 1 semantic token; that resolves
          to the literal. Nothing below is hand-typed.
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
            {layout.map(([comp, sys]) => (
              <tr key={comp}>
                <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>{comp}</td>
                <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>{sys}</td>
                <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>
                  {buttonValue(comp.replace('--btn-', ''))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours by variant and state</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Variant</th>
              <th style={th}>State</th>
              <th style={th}>Background</th>
              <th style={th}>Foreground</th>
              <th style={th}>Border</th>
            </tr>
          </thead>
          <tbody>
            {BUTTON_VARIANTS.flatMap((variant) =>
              BUTTON_STATES.map((state) => {
                const v = buttonColorValues(variant, state);
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
                    <span style={{ color: 'var(--sys-color-text-state-light-gray)' }}>—</span>
                  );
                return (
                  <tr key={`${variant}-${state}`}>
                    <td style={{ ...td, fontFamily: sans, textTransform: 'capitalize' }}>{variant}</td>
                    <td style={td}>{state}</td>
                    <td style={td}>{swatch(v.background)}</td>
                    <td style={td}>{swatch(v.foreground)}</td>
                    <td style={td}>{swatch(v.border)}</td>
                  </tr>
                );
              }),
            )}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Full matrix
// ═══════════════════════════════════════════
export const FullMatrix: Story = {
  name: 'Full Matrix (Variant × Size)',
  render: () => (
    <div style={{ fontFamily: sans }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>Button matrix</h2>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{
                padding: '8px 16px',
                fontSize: 12,
                color: 'var(--sys-color-text-tertiary-default)',
                textAlign: 'left',
              }}
            >
              Variant \ Size
            </th>
            {BUTTON_SIZES.map((s) => (
              <th
                key={s}
                style={{ padding: '8px 16px', fontSize: 12, color: 'var(--sys-color-text-tertiary-default)' }}
              >
                {s} ({buttonValue(`${s}-height`)})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BUTTON_VARIANTS.map((variant) => (
            <tr key={variant} style={{ borderBottom: '1px solid var(--sys-color-background-light)' }}>
              <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>
                {variant}
              </td>
              {BUTTON_SIZES.map((size) => (
                <td key={size} style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant={variant} size={size}>BUTTON</Button>
                    <Button variant={variant} size={size} showIcon iconName="outline-Home">BUTTON</Button>
                    <Button variant={variant} size={size} showIcon showText={false} iconName="outline-Home" />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Color bindings — generated from the token chain
// ═══════════════════════════════════════════

/**
 * Figma still uses abbreviated names; this reconstructs them for cross-referencing.
 *
 * Two of them also disagree with the name on this side. On 2026-08-21 the variants were
 * renamed here to match what they draw — `tertiary` declared six border tokens and
 * `outline` declared none, so the two labels were the wrong way round. Figma keeps the old
 * labels until Phase 3, which makes this map the bridge between them rather than a
 * transliteration. See components.json → button._naming_correction.
 */
const figmaName = (variant: ButtonVariant, prop: string, state: string): string => {
  const v: Record<ButtonVariant, string> = {
    primary: 'pri',
    secondary: 'sec',
    outline: 'ter',   // Figma still calls the stroked one `tertiary`
    ghost: 'out',     // Figma still calls the unstroked one `outline`
    link: 'link',
    // `special` has no entry in `colors/button/*` at all — its values live in the
    // `button-special` set, not the button colour group, so there is nothing to bridge to.
    special: '',
  };
  const s: Record<string, string> = {
    rest: 'default',
    hover: 'hover',
    focus: 'focused',
    active: 'pressed',
    disabled: 'disabled',
  };
  const p = prop === 'background' ? 'bg' : prop === 'foreground' ? 'fg' : prop;
  return `colors/button/${variant}/btn-${p}-${v[variant]}-${s[state]}`;
};

export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="Button"
      figmaId="14291:130847"
      bindings={BUTTON_VARIANTS.flatMap((variant) =>
        BUTTON_STATES.flatMap((state) =>
          (['background', 'foreground', 'border'] as const)
            .map((prop) => ({
              token: `--btn-${variant}-${prop}-${state}`,
              figmaVariable: figmaName(variant, prop, state),
              hex: buttonColorValues(variant, state)[prop],
              usage: `${variant} ${prop} (${state})`,
            }))
            .filter((b) => b.hex !== ''),
        ),
      )}
    />
  ),
};

// ═══════════════════════════════════════════
//  Variant extensions — the debt register
// ═══════════════════════════════════════════
export const VariantExtensions: StoryObj = {
  name: '⚠️ Variant Extensions',
  render: () => {
    const extensions = [
      {
        name: 'ghost',
        extends: 'outline',
        expires: '2027-02-17',
        reason:
          'Low-emphasis action on a light background, with no stroke. Canonical in the Standard as `ghost` — it was called `outline` here until 2026-08-21, when reading the values showed the name was the wrong way round.',
      },
      {
        name: 'link',
        extends: 'ghost',
        expires: '2027-02-17',
        reason:
          'Inline navigational action styled as text: status.info blue, underlined on hover, no surface of its own. Not a rename of anything on the Standard\u2019s list — `destructive` is a red confirm-delete action this product does not have. Never use for destructive actions; it reads as navigation.',
      },
    ];

    return (
      <div style={{ fontFamily: sans, maxWidth: 760 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Variant extensions</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--sys-color-text-tertiary-default)', lineHeight: 1.6 }}>
          The Standard allows five canonical variants — primary, secondary, tertiary, ghost,
          destructive. Anything outside that set lives here with a reason and an expiry, so the
          list stays a deliberate register rather than somewhere variants quietly accumulate.
          At expiry each one is either promoted, folded into a canonical variant, or dropped.
        </p>
        {extensions.map((ext) => (
          <div
            key={ext.name}
            style={{
              border: '1px solid var(--sys-color-border-accent-gray-soft-light)',
              borderRadius: 'var(--sys-radius-lg)',
              padding: 16,
              marginBottom: 12,
              background: 'var(--sys-color-status-warning-soft-light)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <code style={{ fontFamily: mono, fontSize: 14, fontWeight: 600 }}>{ext.name}</code>
              <span style={{ fontSize: 11, color: 'var(--sys-color-text-tertiary-default)' }}>
                extends <code style={{ fontFamily: mono }}>{ext.extends}</code>
              </span>
              <span style={{ fontSize: 11, color: 'var(--sys-color-status-warning-dark)', marginLeft: 'auto' }}>
                review by {ext.expires}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--sys-color-text-secondary-default)', lineHeight: 1.6 }}>
              {ext.reason}
            </p>
          </div>
        ))}
        <p style={{ fontSize: 12, color: 'var(--sys-color-text-tertiary-default)', marginTop: 20, lineHeight: 1.6 }}>
          The Frontend carries six more — <code style={{ fontFamily: mono }}>green</code>,{' '}
          <code style={{ fontFamily: mono }}>green_line</code>,{' '}
          <code style={{ fontFamily: mono }}>green_light</code>,{' '}
          <code style={{ fontFamily: mono }}>red_outline</code>,{' '}
          <code style={{ fontFamily: mono }}>transparent</code>,{' '}
          <code style={{ fontFamily: mono }}>disabled</code>. The three green ones are deprecated;
          the rest fold into <code style={{ fontFamily: mono }}>outline</code> and{' '}
          <code style={{ fontFamily: mono }}>ghost</code> when the Frontend adopts this library.
        </p>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};
