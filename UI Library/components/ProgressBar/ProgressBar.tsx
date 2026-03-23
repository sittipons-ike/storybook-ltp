import React from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import './ProgressBar.css';
import {
  SPACING,
  RADIUS,
  TYPOGRAPHY,
  PROGRESS_COLORS,
  PROGRESS_DIMENSIONS,
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

/** Default generic steps */
export const DEFAULT_STEPS: ProgressStep[] = [
  { key: 'step1', label: 'Step 1', icon: 'outline-check' },
  { key: 'step2', label: 'Step 2', icon: 'outline-check' },
  { key: 'step3', label: 'Step 3', icon: 'outline-check' },
  { key: 'step4', label: 'Step 4', icon: 'outline-check' },
];

type StepState = 'completed' | 'active' | 'upcoming';

function getStepState(index: number, currentStep: number): StepState {
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
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  steps = DEFAULT_STEPS,
  currentStep = 0,
  animated = true,
  className = '',
}) => {
  const { circleSize, iconSize, lineHeight, gapCircleToLabel, containerPaddingX } =
    PROGRESS_DIMENSIONS;

  // Clamp currentStep to valid range
  const clampedStep = Math.max(0, Math.min(currentStep, steps.length - 1));

  return (
    <div
      className={`ltp-progress-bar ${className}`}
      style={{
        paddingLeft: containerPaddingX,
        paddingRight: containerPaddingX,
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
        const isUpcoming = state === 'upcoming';
        const isLast = index === steps.length - 1;

        // Determine circle color
        const circleBg = isUpcoming
          ? PROGRESS_COLORS.circle.inactive
          : PROGRESS_COLORS.circle.active;

        // Determine label color
        const labelColor = isUpcoming
          ? PROGRESS_COLORS.label.inactive
          : PROGRESS_COLORS.label.active;

        // Determine which icon to show
        const iconName =
          isCompleted && step.completedIcon
            ? step.completedIcon
            : step.icon || 'outline-check';

        // Animation delay class
        const delayClass = `ltp-progress-bar__step--delay-${Math.min(index, 4)}`;

        return (
          <React.Fragment key={step.key}>
            {/* Step (circle + label) */}
            <div
              className={`ltp-progress-bar__step ${delayClass}`}
              data-state={state}
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
                  width: circleSize,
                  height: circleSize,
                  borderRadius: RADIUS.full,
                  backgroundColor: circleBg,
                }}
              >
                <Icon
                  name={iconName}
                  size={iconSize as any}
                  customColor={PROGRESS_COLORS.icon}
                />
              </div>

              {/* Label */}
              <div
                className="ltp-progress-bar__label"
                style={{
                  marginTop: gapCircleToLabel,
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.fontSize,
                  fontWeight: TYPOGRAPHY.fontWeight,
                  lineHeight: TYPOGRAPHY.lineHeight,
                  color: labelColor,
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
                  // Position the line at vertical center of the circle
                  paddingTop: circleSize / 2 - lineHeight / 2,
                }}
              >
                {/* Background track (inactive color) */}
                <div
                  className="ltp-progress-bar__connector-track"
                  style={{
                    height: lineHeight,
                    backgroundColor: PROGRESS_COLORS.line.inactive,
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
                      backgroundColor: PROGRESS_COLORS.line.active,
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
