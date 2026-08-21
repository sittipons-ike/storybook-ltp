import React from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import '../../foundations/tokens.css';
import './ProgressBar.css';
import {
  PROGRESS,
  PROGRESS_ICON_SIZE,
  PROGRESS_TRACK_COLORS,
  progressStepColors,
  type ProgressStepState,
} from './tokens';

// ═══════════════════════════════════════════
//  ProgressBar — Lotteryplus Design System
//  Figma: "progress-bars-lottery" component set (14291:136200)
//  5 Variants: Step-1 through Step-3-Slip
//  Generic reusable step progress indicator
// ═══════════════════════════════════════════

export interface ProgressStep {
  /** Unique key for the step */
  key: string;
  /** Display label below the circle */
  label: string;
  /** Icon name (from Icon library) for this step */
  icon?: string;
  /** Icon to display when the step is completed */
  completedIcon?: string;
}

export interface ProgressBarProps {
  /** Array of step definitions (2-5 steps typical) */
  steps: ProgressStep[];
  /** 0-indexed current active step */
  currentStep: number;
  /** Enable progress animation (default: true) */
  animated?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Figma does not draw a generic progress bar. It draws two named checkout flows, and the
 * icons and labels below are read off them — `progress-bars-lottery` (14291:136200, 5
 * variants) and `progress-bars-nokcash` (14291:136316, 4 variants), on 2026-08-20.
 *
 * The component still takes `steps` as data, because the two flows differ in length and a
 * third could be added. What changed is the defaults: this file used to ship four steps
 * labelled "Step 1".."Step 4" carrying `outline-check`, which no Figma node contains.
 */
export const LOTTERY_STEPS: ProgressStep[] = [
  { key: 'cart', label: 'ตะกร้า', icon: 'filled-Added_Cart' },
  { key: 'channel', label: 'เลือกช่องทาง', icon: 'filled-qrcode-scan' },
  { key: 'pay', label: 'ชำระเงิน', icon: 'filled-payment' },
  { key: 'done', label: 'สำเร็จ', icon: 'filled-check_circle' },
];

export const NOKCASH_STEPS: ProgressStep[] = [
  { key: 'topup', label: 'เติมนกแคช', icon: 'outline-NokPoints-W' },
  { key: 'pay', label: 'ชำระเงิน', icon: 'filled-payment' },
  { key: 'done', label: 'สำเร็จ', icon: 'filled-check_circle' },
];

/**
 * The `Slip` variants of both sets swap the payment step for a receipt — `Step-3-Slip` on
 * lottery, `Step-2-Slip` on nokcash — and relabel it. They are the same flow with one step
 * exchanged, so they are built from the flow above rather than written out again.
 */
const withSlip = (steps: ProgressStep[], at: number): ProgressStep[] =>
  steps.map((step, i) =>
    i === at ? { ...step, label: 'แนบสลิปเพิ่ม', icon: 'filled-receipt' } : step,
  );

export const LOTTERY_SLIP_STEPS = withSlip(LOTTERY_STEPS, 2);
export const NOKCASH_SLIP_STEPS = withSlip(NOKCASH_STEPS, 1);

/** The `Extra` variants keep every icon and relabel the payment step only. */
const withExtra = (steps: ProgressStep[], at: number): ProgressStep[] =>
  steps.map((step, i) => (i === at ? { ...step, label: 'ชำระเงินเพิ่ม' } : step));

export const LOTTERY_EXTRA_STEPS = withExtra(LOTTERY_STEPS, 2);
export const NOKCASH_EXTRA_STEPS = withExtra(NOKCASH_STEPS, 1);

/** Figma's primary flow. Kept under the old name so existing imports keep working. */
export const DEFAULT_STEPS: ProgressStep[] = LOTTERY_STEPS;

export type { ProgressStepState };

function getStepState(index: number, currentStep: number): ProgressStepState {
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'active';
  return 'upcoming';
}

/**
 * ProgressBar (Step Progress) component
 *
 * Renders a horizontal step progress indicator with animated transitions.
 * Each step has a circle with an icon and a label below.
 * Connecting lines between steps fill when steps are completed.
 *
 * Layout mirrors Figma: HORIZONTAL, center-aligned, padding 0/8/0/8.
 *
 * Every style value is a CSS custom property from foundations/tokens.css, which is
 * generated from Figma via design.md + components.json. There are no literal colours,
 * sizes, or font values in this file — changing one means changing Figma (or the
 * progress-bars overlay) and regenerating, which is what keeps design and code from
 * drifting apart.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  steps = DEFAULT_STEPS,
  currentStep = 0,
  animated = true,
  className = '',
}) => {
  // Clamp currentStep to valid range
  const clampedStep = Math.max(0, Math.min(currentStep, steps.length - 1));

  return (
    <div
      className={`ltp-progress-bar ${className}`}
      style={{
        paddingTop: PROGRESS.paddingY,
        paddingBottom: PROGRESS.paddingY,
        paddingLeft: PROGRESS.paddingX,
        paddingRight: PROGRESS.paddingX,
      }}
      role="progressbar"
      aria-valuenow={clampedStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Step ${clampedStep + 1} of ${steps.length}`}
    >
      {steps.map((step, index) => {
        const state = getStepState(index, clampedStep);
        const isCompleted = state === 'completed';
        const isActive = state === 'active';
        const isLast = index === steps.length - 1;
        const colors = progressStepColors(state);

        // Determine which icon to show
        const iconName =
          isCompleted && step.completedIcon
            ? step.completedIcon
            : step.icon || 'filled-check_circle';

        // Animation delay class
        const delayClass = `ltp-progress-bar__step--delay-${Math.min(index, 4)}`;

        return (
          <React.Fragment key={step.key}>
            {/* Step (circle + label) */}
            <div
              className={`ltp-progress-bar__step ${delayClass}`}
              data-state={state}
              style={{ width: PROGRESS.circleSize, height: PROGRESS.rowHeight }}
            >
              {/* Circle */}
              <div
                className={[
                  'ltp-progress-bar__circle',
                  animated ? 'ltp-progress-bar__circle--animated' : '',
                  isActive ? 'ltp-progress-bar__circle--active' : '',
                  isCompleted ? 'ltp-progress-bar__circle--completed' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  width: PROGRESS.circleSize,
                  height: PROGRESS.circleSize,
                  borderRadius: PROGRESS.radius,
                  backgroundColor: colors.circle,
                }}
              >
                <Icon
                  name={iconName}
                  size={PROGRESS_ICON_SIZE as any}
                  customColor={colors.icon}
                />
              </div>

              {/* Label */}
              <div
                className="ltp-progress-bar__label"
                style={{
                  top: PROGRESS.labelTop,
                  fontFamily: PROGRESS.fontFamily,
                  fontSize: PROGRESS.fontSize,
                  fontWeight: PROGRESS.fontWeight as unknown as React.CSSProperties['fontWeight'],
                  lineHeight: PROGRESS.lineHeight,
                  letterSpacing: PROGRESS.letterSpacing,
                  color: colors.label,
                }}
              >
                {step.label}
              </div>
            </div>

            {/* Connector line (between steps, not after last) */}
            {!isLast && (
              <div
                className={`ltp-progress-bar__connector ltp-progress-bar__connector--delay-${Math.min(index, 4)}`}
                style={{
                  // Position the line at the vertical centre of the circle
                  paddingTop: PROGRESS.trackOffset,
                }}
              >
                {/* Background track (inactive color) */}
                <div
                  className="ltp-progress-bar__connector-track"
                  style={{
                    height: PROGRESS.trackHeight,
                    left: `calc(-1 * ${PROGRESS.lineOverhang})`,
                    right: `calc(-1 * ${PROGRESS.lineOverhang})`,
                    backgroundColor: PROGRESS_TRACK_COLORS.track,
                  }}
                >
                  {/* Fill overlay (active color, animates via scaleX) */}
                  <div
                    className={[
                      'ltp-progress-bar__connector-fill',
                      index < clampedStep
                        ? 'ltp-progress-bar__connector-fill--completed'
                        : '',
                      animated && index < clampedStep
                        ? 'ltp-progress-bar__connector-fill--animated'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{
                      backgroundColor: PROGRESS_TRACK_COLORS.fill,
                    }}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
