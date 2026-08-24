import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import ProgressBar, {
  DEFAULT_STEPS,
  LOTTERY_STEPS,
  LOTTERY_EXTRA_STEPS,
  LOTTERY_SLIP_STEPS,
  NOKCASH_STEPS,
  NOKCASH_SLIP_STEPS,
  ProgressStep,
} from './ProgressBar';
import {
  PROGRESS,
  PROGRESS_FIGMA_ID,
  PROGRESS_STEP_STATES,
  PROGRESS_TRACK_TOKENS,
  progressStepColorValues,
  progressStepTokens,
  progressValue,
} from './tokens';
import { sys, sysValue } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  ProgressBar Stories — Lotteryplus Design System
//  Figma: "progress-bars-lottery" component set (14291:136200)
//  5 Variants: Step-1, Step-2, Step-3, Step-3-Extra, Step-3-Slip
//
//  Values shown here are read from foundations/tokens.generated.ts, which is
//  generated from Figma. Nothing on this page is typed by hand, so a table can
//  never claim a value the component does not actually render.
// ═══════════════════════════════════════════

const sans = sys('type-label-md-medium-family');
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Feedback/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    steps: {
      description: 'Array of step definitions',
      control: 'object',
    },
    currentStep: {
      control: { type: 'range', min: 0, max: 4, step: 1 },
      description: '0-indexed current active step',
    },
    animated: {
      control: 'boolean',
      description: 'Enable progress animation',
    },
  },
  args: {
    steps: DEFAULT_STEPS,
    currentStep: 1,
    animated: true,
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

/** Caption above a demo block — chrome only, but still token-driven. */
const caption: React.CSSProperties = {
  fontFamily: sans,
  fontSize: sys('type-label-md-semibold-size'),
  fontWeight: sys(
    'type-label-md-semibold-weight',
  ) as unknown as React.CSSProperties['fontWeight'],
  color: sys('color-text-tertiary-default'),
  marginBottom: sys('spacing-lg'),
};

// ═══════════════════════════════════════════
//  Default (4 steps, step 2 active)
// ═══════════════════════════════════════════
export const Default: Story = {
  args: {
    currentStep: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

// ═══════════════════════════════════════════
//  Interactive (buttons to advance / go back)
// ═══════════════════════════════════════════
export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const InteractiveDemo = () => {
      const [step, setStep] = useState(0);
      const maxStep = DEFAULT_STEPS.length - 1;

      const chrome = (disabled: boolean): React.CSSProperties => ({
        padding: `${sys('spacing-lg')} ${sys('spacing-2xl')}`,
        borderRadius: sys('radius-lg'),
        border: `${sys('border-width-hairline')} solid ${sys('color-border-accent-gray-light')}`,
        background: disabled ? sys('color-background-light') : sys('color-background-default'),
        color: disabled ? sys('color-secondary-light') : sys('color-secondary-default'),
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: sans,
        fontSize: sys('type-body-md-regular-size'),
      });

      return (
        <div style={{ width: 480 }}>
          <ProgressBar steps={DEFAULT_STEPS} currentStep={step} animated />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: sys('spacing-xl'),
              marginTop: sys('spacing-4xl'),
            }}
          >
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              style={chrome(step === 0)}
            >
              Previous
            </button>
            <button
              onClick={() => setStep((s) => Math.min(maxStep, s + 1))}
              disabled={step === maxStep}
              style={{
                ...chrome(step === maxStep),
                border: 'none',
                background:
                  step === maxStep
                    ? sys('color-background-light')
                    : sys('color-primary-default'),
                color:
                  step === maxStep
                    ? sys('color-secondary-light')
                    : sys('color-foreground-white'),
              }}
            >
              Next
            </button>
            <button onClick={() => setStep(0)} style={chrome(false)}>
              Reset
            </button>
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: sys('spacing-xl'),
              fontFamily: sans,
              fontSize: sys('type-label-md-regular-size'),
              color: sys('color-text-tertiary-default'),
            }}
          >
            Current: Step {step + 1} of {DEFAULT_STEPS.length}
          </div>
        </div>
      );
    };
    return <InteractiveDemo />;
  },
};

// ═══════════════════════════════════════════
//  AllSteps (show each step state: 1/4, 2/4, 3/4, 4/4)
// ═══════════════════════════════════════════
export const AllSteps: Story = {
  name: 'All Steps',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: sys('spacing-5xl'),
        width: 480,
      }}
    >
      {[0, 1, 2, 3].map((step) => (
        <div key={step}>
          <div style={caption}>
            Step {step + 1} of 4 {step === 0 ? '(First)' : step === 3 ? '(Last)' : ''}
          </div>
          <ProgressBar steps={DEFAULT_STEPS} currentStep={step} animated={false} />
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════
//  The two flows Figma actually draws
// ═══════════════════════════════════════════
export const CustomSteps: Story = {
  name: 'Figma flows',
  render: () => {
    const rows: { caption: string; steps: ProgressStep[]; at: number }[] = [
      { caption: 'progress-bars-lottery · State=Step-2 — 4 ขั้น', steps: LOTTERY_STEPS, at: 1 },
      { caption: 'progress-bars-lottery · State=Step-3-Extra — ชำระเงินเพิ่ม', steps: LOTTERY_EXTRA_STEPS, at: 2 },
      { caption: 'progress-bars-lottery · State=Step-3-Slip — สลิปแทน QR', steps: LOTTERY_SLIP_STEPS, at: 2 },
      { caption: 'progress-bars-nokcash · State=Step-1 — 3 ขั้น', steps: NOKCASH_STEPS, at: 0 },
      { caption: 'progress-bars-nokcash · State=Step-2-Slip', steps: NOKCASH_SLIP_STEPS, at: 1 },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: sys('spacing-6xl'), width: 520 }}>
        <p style={{ ...caption, maxWidth: 520, lineHeight: 1.7 }}>
          Figma ไม่มี progress bar แบบ generic — มีสองสายที่ตั้งชื่อไว้ชัดเจน คนละความยาว
          `steps` ยังรับเป็น data ได้เหมือนเดิม แต่ค่า default มาจากสองสายนี้ ไม่ใช่ที่แต่งขึ้นเอง
        </p>
        {rows.map((row) => (
          <div key={row.caption}>
            <div style={caption}>{row.caption}</div>
            <ProgressBar steps={row.steps} currentStep={row.at} animated={false} />
          </div>
        ))}
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  AnimationDemo (auto-advancing every 2 seconds)
// ═══════════════════════════════════════════
export const AnimationDemo: Story = {
  name: 'Animation Demo',
  render: () => {
    const AnimationDemoInner = () => {
      const [step, setStep] = useState(0);
      const totalSteps = DEFAULT_STEPS.length;

      useEffect(() => {
        const timer = setInterval(() => {
          setStep((prev) => (prev + 1) % totalSteps);
        }, 2000);
        return () => clearInterval(timer);
      }, [totalSteps]);

      return (
        <div style={{ width: 480 }}>
          <ProgressBar steps={DEFAULT_STEPS} currentStep={step} animated />
          <div
            style={{
              textAlign: 'center',
              marginTop: sys('spacing-2xl'),
              fontFamily: sans,
              fontSize: sys('type-label-md-regular-size'),
              color: sys('color-text-tertiary-default'),
            }}
          >
            Auto-advancing every 2 seconds (Step {step + 1}/{totalSteps})
          </div>
        </div>
      );
    };
    return <AnimationDemoInner />;
  },
};

// ═══════════════════════════════════════════
//  Token Chain / Verification
//
//  Tier 2 (--progress-*) → Tier 1 (--sys-*) → literal. The literal column is read
//  from tokens.generated.ts, so it cannot drift from what the component renders.
// ═══════════════════════════════════════════

/** Tier 2 token → the Tier 1 semantic token it aliases, per progress-bars.json. */
const LAYOUT_CHAIN: Array<[token: string, semantic: string, usage: string]> = [
  ['radius', 'radius-full', 'Step circle (full round)'],
  ['padding-y', 'spacing-none', 'Container paddingTop/Bottom'],
  ['padding-x', 'spacing-lg', 'Container paddingLeft/Right'],
  ['gap', 'spacing-sm', 'Gap circle to label'],
  ['circle-size', '(fixed)', 'Step circle width/height'],
  ['icon-size', '(fixed)', 'Icon within circle'],
  ['track-height', 'border-width-thin', 'Connector line height'],
  ['typography-family', 'type-label-md-medium-family', 'Step label font'],
  ['typography-size', 'type-label-md-medium-size', 'Step label size'],
  ['typography-weight', 'type-label-md-medium-weight', 'Step label weight'],
  ['typography-line-height', 'type-label-md-medium-line-height', 'Step label line-height'],
  ['typography-tracking', 'type-label-md-medium-tracking', 'Step label tracking'],
];

/** Colour token → Tier 1 semantic → Figma variable it mirrors. */
const COLOUR_CHAIN: Array<[token: string, semantic: string, figma: string, usage: string]> = [
  [
    'background-red',
    'color-primary-default',
    'colors/progress-bars/progress-bg-red',
    'Active/completed circle & line fill',
  ],
  [
    'background-soft-gray',
    'color-border-accent-gray-light',
    'colors/progress-bars/progress-bg-soft-gray',
    'Upcoming circle & line track',
  ],
  [
    'foreground-dark',
    'color-secondary-default',
    'colors/progress-bars/progress-fg-dark',
    'Active/completed label text',
  ],
  [
    'foreground-disable',
    'color-secondary-light',
    'colors/progress-bars/progress-fg-disable',
    'Upcoming label text',
  ],
  [
    'foreground-white',
    'color-foreground-white',
    'colors/progress-bars/progress-fg-white',
    'Icon on coloured circle',
  ],
];

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 600,
  fontFamily: sans,
  color: sys('color-text-tertiary-default'),
  borderBottom: `2px solid ${sys('color-border-accent-gray-soft-light')}`,
};

const td: React.CSSProperties = {
  padding: '6px 12px',
  borderBottom: `1px solid ${sys('color-background-light')}`,
  fontFamily: mono,
  fontSize: 11,
};

const Swatch: React.FC<{ hex: string }> = ({ hex }) =>
  hex ? (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          background: hex,
          border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
        }}
      />
      {hex}
    </span>
  ) : (
    <span style={{ color: sys('color-text-state-light-gray') }}>—</span>
  );

export const TokenVerification: Story = {
  name: '🔍 Token Chain',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 960 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>ProgressBar token chain</h2>
      <p
        style={{
          margin: '0 0 20px',
          fontSize: 13,
          color: sys('color-text-tertiary-default'),
        }}
      >
        Every value flows Figma → design.md + components/progress-bars.json →
        components.json → tokens.css. The component renders the Tier 2 alias; the alias
        points at a Tier 1 semantic token; that resolves to the literal. Nothing below is
        hand-typed. Figma: {PROGRESS_FIGMA_ID}.
      </p>

      {/* Live preview */}
      <div
        style={{
          padding: 24,
          marginBottom: 24,
          backgroundColor: sys('color-background-soft-light'),
          borderRadius: sys('radius-lg'),
          border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
        }}
      >
        <ProgressBar steps={DEFAULT_STEPS} currentStep={1} animated={false} />
      </div>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Layout &amp; typography</h3>
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
          {LAYOUT_CHAIN.map(([token, semantic, usage]) => (
            <tr key={token}>
              <td style={{ ...td, color: sys('color-primary-default') }}>
                --progress-{token}
              </td>
              <td style={{ ...td, color: sys('color-status-info-default') }}>
                {semantic === '(fixed)' ? '(fixed)' : `--sys-${semantic}`}
              </td>
              <td style={{ ...td, color: sys('color-status-success-dark') }}>
                {progressValue(token)}
                {semantic !== '(fixed)' && sysValue(semantic) !== progressValue(token) && (
                  <span style={{ color: sys('color-primary-default') }}>
                    {' '}
                    ≠ {sysValue(semantic)}
                  </span>
                )}
              </td>
              <td style={{ ...td, fontFamily: sans, color: sys('color-text-tertiary-default') }}>
                {usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
        <thead>
          <tr>
            <th style={th}>Tier 2 — component</th>
            <th style={th}>Tier 1 — semantic</th>
            <th style={th}>Figma variable</th>
            <th style={th}>Value</th>
            <th style={th}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {COLOUR_CHAIN.map(([token, semantic, figma, usage]) => (
            <tr key={token}>
              <td style={{ ...td, color: sys('color-primary-default') }}>
                --progress-{token}
              </td>
              <td style={{ ...td, color: sys('color-status-info-default') }}>
                --sys-{semantic}
              </td>
              <td style={{ ...td, color: sys('color-text-tertiary-default') }}>{figma}</td>
              <td style={td}>
                <Swatch hex={progressValue(token)} />
              </td>
              <td style={{ ...td, fontFamily: sans, color: sys('color-text-tertiary-default') }}>
                {usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours by step state</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Step state</th>
            <th style={th}>Circle</th>
            <th style={th}>Icon</th>
            <th style={th}>Label</th>
          </tr>
        </thead>
        <tbody>
          {PROGRESS_STEP_STATES.map((state) => {
            const names = progressStepTokens(state);
            const values = progressStepColorValues(state);
            return (
              <tr key={state}>
                <td style={{ ...td, fontFamily: sans, textTransform: 'capitalize' }}>
                  {state}
                </td>
                <td style={td}>
                  <Swatch hex={values.circle} />
                  <div style={{ color: sys('color-text-tertiary-default') }}>
                    --progress-{names.circle}
                  </div>
                </td>
                <td style={td}>
                  <Swatch hex={values.icon} />
                  <div style={{ color: sys('color-text-tertiary-default') }}>
                    --progress-{names.icon}
                  </div>
                </td>
                <td style={td}>
                  <Swatch hex={values.label} />
                  <div style={{ color: sys('color-text-tertiary-default') }}>
                    --progress-{names.label}
                  </div>
                </td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...td, fontFamily: sans }}>Connector</td>
            <td style={td}>
              <Swatch hex={progressValue(PROGRESS_TRACK_TOKENS.track)} />
              <div style={{ color: sys('color-text-tertiary-default') }}>
                --progress-{PROGRESS_TRACK_TOKENS.track} (track)
              </div>
            </td>
            <td style={td}>
              <Swatch hex={progressValue(PROGRESS_TRACK_TOKENS.fill)} />
              <div style={{ color: sys('color-text-tertiary-default') }}>
                --progress-{PROGRESS_TRACK_TOKENS.fill} (fill)
              </div>
            </td>
            <td style={td}>
              <span style={{ color: sys('color-text-state-light-gray') }}>—</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p
        style={{
          marginTop: 20,
          fontSize: 12,
          fontFamily: sans,
          color: sys('color-text-tertiary-default'),
        }}
      >
        Rendered offset for the connector line:{' '}
        <code style={{ fontFamily: mono }}>{PROGRESS.trackOffset}</code>
      </p>
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ── Color Bindings ──
export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="ProgressBar"
      figmaId={PROGRESS_FIGMA_ID}
      bindings={COLOUR_CHAIN.map(([token, , figma, usage]) => ({
        token: `--progress-${token}`,
        figmaVariable: figma,
        hex: progressValue(token),
        usage,
      }))}
    />
  ),
};
