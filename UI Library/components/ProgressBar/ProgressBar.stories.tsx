import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import ProgressBar, { DEFAULT_STEPS, ProgressStep } from './ProgressBar';
import {
  SPACING,
  RADIUS,
  TYPOGRAPHY,
  PROGRESS_COLORS,
  PROGRESS_DIMENSIONS,
} from './tokens';

// ═══════════════════════════════════════════
//  ProgressBar Stories — Lotteryplus Design System
//  Figma: "progress-bars-lottery" component set (14291:136200)
//  5 Variants: Step-1, Step-2, Step-3, Step-3-Extra, Step-3-Slip
// ═══════════════════════════════════════════

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
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

      return (
        <div style={{ width: 480 }}>
          <ProgressBar steps={DEFAULT_STEPS} currentStep={step} animated />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginTop: 24,
            }}
          >
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid #D4D4D4',
                background: step === 0 ? '#F5F5F5' : '#FFFFFF',
                color: step === 0 ? '#C9C9C9' : '#262626',
                cursor: step === 0 ? 'not-allowed' : 'pointer',
                fontFamily: "'Graphik TH', sans-serif",
                fontSize: 14,
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setStep((s) => Math.min(maxStep, s + 1))}
              disabled={step === maxStep}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: step === maxStep ? '#F5F5F5' : '#E32321',
                color: step === maxStep ? '#C9C9C9' : '#FFFFFF',
                cursor: step === maxStep ? 'not-allowed' : 'pointer',
                fontFamily: "'Graphik TH', sans-serif",
                fontSize: 14,
              }}
            >
              Next
            </button>
            <button
              onClick={() => setStep(0)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid #D4D4D4',
                background: '#FFFFFF',
                color: '#262626',
                cursor: 'pointer',
                fontFamily: "'Graphik TH', sans-serif",
                fontSize: 14,
              }}
            >
              Reset
            </button>
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: 12,
              fontFamily: "'Graphik TH', sans-serif",
              fontSize: 12,
              color: '#737373',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 480 }}>
      {[0, 1, 2, 3].map((step) => (
        <div key={step}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#737373',
              marginBottom: 8,
              fontFamily: "'Graphik TH', sans-serif",
            }}
          >
            Step {step + 1} of 4 {step === 0 ? '(First)' : step === 3 ? '(Last)' : ''}
          </div>
          <ProgressBar steps={DEFAULT_STEPS} currentStep={step} animated={false} />
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════
//  CustomSteps (3 and 5 step examples)
// ═══════════════════════════════════════════
export const CustomSteps: Story = {
  name: 'Custom Steps',
  render: () => {
    const threeSteps: ProgressStep[] = [
      { key: 'start', label: 'Start', icon: 'outline-Home' },
      { key: 'process', label: 'Process', icon: 'outline-order' },
      { key: 'done', label: 'Done', icon: 'outline-check', completedIcon: 'outline-check' },
    ];

    const fiveSteps: ProgressStep[] = [
      { key: 'info', label: 'Info', icon: 'outline-member' },
      { key: 'details', label: 'Details', icon: 'outline-order' },
      { key: 'review', label: 'Review', icon: 'outline-safe' },
      { key: 'confirm', label: 'Confirm', icon: 'outline-check' },
      { key: 'complete', label: 'Complete', icon: 'outline-check' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: 520 }}>
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#737373',
              marginBottom: 8,
              fontFamily: "'Graphik TH', sans-serif",
            }}
          >
            3 Steps (custom icons) — Step 2 active
          </div>
          <ProgressBar steps={threeSteps} currentStep={1} animated={false} />
        </div>
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#737373',
              marginBottom: 8,
              fontFamily: "'Graphik TH', sans-serif",
            }}
          >
            5 Steps (custom icons + labels) — Step 3 active
          </div>
          <ProgressBar steps={fiveSteps} currentStep={2} animated={false} />
        </div>
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
              marginTop: 16,
              fontFamily: "'Graphik TH', sans-serif",
              fontSize: 12,
              color: '#737373',
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
//  Token Verification
// ═══════════════════════════════════════════
export const TokenVerification: Story = {
  name: 'Token Verification',
  render: () => {
    const cellStyle: React.CSSProperties = {
      padding: '6px 10px',
      borderBottom: '1px solid #E5E5E5',
      fontFamily: "'Graphik TH', sans-serif",
      fontSize: 12,
      lineHeight: '18px',
      verticalAlign: 'top',
    };
    const headerStyle: React.CSSProperties = {
      ...cellStyle,
      fontWeight: 600,
      backgroundColor: '#F5F5F5',
      color: '#262626',
    };
    const codeStyle: React.CSSProperties = {
      fontFamily: "'SF Mono', 'Fira Code', monospace",
      fontSize: 11,
      backgroundColor: '#F5F5F5',
      padding: '1px 4px',
      borderRadius: 3,
    };
    const swatchStyle = (color: string): React.CSSProperties => ({
      display: 'inline-block',
      width: 14,
      height: 14,
      borderRadius: 3,
      backgroundColor: color,
      border: '1px solid #E5E5E5',
      verticalAlign: 'middle',
      marginRight: 6,
    });

    const tokens = [
      // Spacing
      {
        category: 'Spacing',
        figmaVariable: 'dimension/spacing/spacing-none',
        token: 'SPACING.none',
        value: `${SPACING.none}px`,
        usage: 'Container paddingTop/Bottom',
      },
      {
        category: 'Spacing',
        figmaVariable: 'dimension/spacing/spacing-sm',
        token: 'SPACING.sm',
        value: `${SPACING.sm}px`,
        usage: 'Gap circle to label',
      },
      {
        category: 'Spacing',
        figmaVariable: 'dimension/spacing/spacing-lg',
        token: 'SPACING.lg',
        value: `${SPACING.lg}px`,
        usage: 'Container paddingLeft/Right',
      },
      // Radius
      {
        category: 'Radius',
        figmaVariable: 'dimension/breakpoint/radius/radius-xxxl',
        token: 'RADIUS.full',
        value: `${RADIUS.full}px`,
        usage: 'Step circle (full round)',
      },
      // Typography
      {
        category: 'Typography',
        figmaVariable: 'label/m-reg/font-family',
        token: 'TYPOGRAPHY.fontFamily',
        value: TYPOGRAPHY.fontFamily,
        usage: 'Step label font',
      },
      {
        category: 'Typography',
        figmaVariable: 'label/m-reg/size',
        token: 'TYPOGRAPHY.fontSize',
        value: `${TYPOGRAPHY.fontSize}px`,
        usage: 'Step label size',
      },
      {
        category: 'Typography',
        figmaVariable: 'label/m-reg/weight',
        token: 'TYPOGRAPHY.fontWeight',
        value: `${TYPOGRAPHY.fontWeight} (Medium)`,
        usage: 'Step label weight',
      },
      {
        category: 'Typography',
        figmaVariable: 'label/m-reg/line-height',
        token: 'TYPOGRAPHY.lineHeight',
        value: TYPOGRAPHY.lineHeight,
        usage: 'Step label line-height',
      },
      // Colors — Circle
      {
        category: 'Color',
        figmaVariable: 'colors/progress/progress-bg-red',
        token: 'PROGRESS_COLORS.circle.active',
        value: PROGRESS_COLORS.circle.active,
        color: PROGRESS_COLORS.circle.active,
        usage: 'Active/completed circle bg',
      },
      {
        category: 'Color',
        figmaVariable: 'colors/progress/progress-bg-soft-gray',
        token: 'PROGRESS_COLORS.circle.inactive',
        value: PROGRESS_COLORS.circle.inactive,
        color: PROGRESS_COLORS.circle.inactive,
        usage: 'Inactive circle bg',
      },
      // Colors — Line
      {
        category: 'Color',
        figmaVariable: 'colors/progress/progress-bg-red',
        token: 'PROGRESS_COLORS.line.active',
        value: PROGRESS_COLORS.line.active,
        color: PROGRESS_COLORS.line.active,
        usage: 'Completed line fill',
      },
      {
        category: 'Color',
        figmaVariable: 'colors/progress/progress-bg-soft-gray',
        token: 'PROGRESS_COLORS.line.inactive',
        value: PROGRESS_COLORS.line.inactive,
        color: PROGRESS_COLORS.line.inactive,
        usage: 'Inactive line track',
      },
      // Colors — Label
      {
        category: 'Color',
        figmaVariable: 'colors/progress/progress-fg-dark',
        token: 'PROGRESS_COLORS.label.active',
        value: PROGRESS_COLORS.label.active,
        color: PROGRESS_COLORS.label.active,
        usage: 'Active/completed label text',
      },
      {
        category: 'Color',
        figmaVariable: 'colors/progress/progress-fg-disable',
        token: 'PROGRESS_COLORS.label.inactive',
        value: PROGRESS_COLORS.label.inactive,
        color: PROGRESS_COLORS.label.inactive,
        usage: 'Inactive label text',
      },
      // Colors — Icon
      {
        category: 'Color',
        figmaVariable: 'colors/icon/on-bg',
        token: 'PROGRESS_COLORS.icon',
        value: PROGRESS_COLORS.icon,
        color: PROGRESS_COLORS.icon,
        usage: 'Icon on circle (white)',
      },
      // Dimensions
      {
        category: 'Dimension',
        figmaVariable: 'icons-size (component property)',
        token: 'PROGRESS_DIMENSIONS.circleSize',
        value: `${PROGRESS_DIMENSIONS.circleSize}px`,
        usage: 'Step circle width/height',
      },
      {
        category: 'Dimension',
        figmaVariable: 'icons-size (24)',
        token: 'PROGRESS_DIMENSIONS.iconSize',
        value: `${PROGRESS_DIMENSIONS.iconSize}px`,
        usage: 'Icon within circle',
      },
      {
        category: 'Dimension',
        figmaVariable: 'VECTOR strokeWeight',
        token: 'PROGRESS_DIMENSIONS.lineHeight',
        value: `${PROGRESS_DIMENSIONS.lineHeight}px`,
        usage: 'Connecting line height',
      },
    ];

    return (
      <div style={{ maxWidth: 900 }}>
        <div
          style={{
            fontFamily: "'Graphik TH', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 16,
            color: '#262626',
          }}
        >
          Token Verification — progress-bars-lottery (14291:136200)
        </div>

        {/* Live preview */}
        <div
          style={{
            padding: 24,
            marginBottom: 24,
            backgroundColor: '#FAFAFA',
            borderRadius: 8,
            border: '1px solid #E5E5E5',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#737373',
              marginBottom: 12,
              fontFamily: "'Graphik TH', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Live Preview (Step 2 of 4)
          </div>
          <ProgressBar steps={DEFAULT_STEPS} currentStep={1} animated={false} />
        </div>

        {/* Token table */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #E5E5E5',
          }}
        >
          <thead>
            <tr>
              <th style={headerStyle}>Category</th>
              <th style={headerStyle}>Figma Variable</th>
              <th style={headerStyle}>Token</th>
              <th style={headerStyle}>Value</th>
              <th style={headerStyle}>Usage</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t, i) => (
              <tr key={i}>
                <td style={cellStyle}>{t.category}</td>
                <td style={cellStyle}>
                  <span style={codeStyle}>{t.figmaVariable}</span>
                </td>
                <td style={cellStyle}>
                  <span style={codeStyle}>{t.token}</span>
                </td>
                <td style={cellStyle}>
                  {'color' in t && t.color && <span style={swatchStyle(t.color)} />}
                  <span style={codeStyle}>{t.value}</span>
                </td>
                <td style={{ ...cellStyle, color: '#737373' }}>{t.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
