import React from 'react';
import '../../../ui/foundations/tokens.css';
import Text from '../../../ui/components/Text/Text';
import './MissionProgress.css';

// ═══════════════════════════════════════════
//  MissionProgress — features/gamification · scope: feature
//
//  Source: prd-dev.md v1.0 §5.1 (`MissionProgress` entity: current / target /
//  milestones[]), §5.2.1 (PENDING vs CONFIRMED), AC-301 #3, and
//  ux-gamification.md §4.3 "Progress X/Y + หมุดระหว่างทาง".
//
//  Reuse check, done before writing this: `ui/components/ProgressBar` is the checkout
//  stepper — a fixed list of named steps, each with its own icon and label. A mission is a
//  count against a target ("0/999 ใบ"), so the two only look alike. Nothing else in
//  ui/components draws a count. It moves to ui/ when a second feature needs one (Lark §3.3).
// ═══════════════════════════════════════════

export interface MissionProgressProps {
  /** `MissionProgress.current` — how far the user has actually got. */
  current: number;
  /** `MissionProgress.target` — what finishes the mission. */
  target: number;
  /**
   * Counted but not yet settled (§5.2.1). Shown on the rail in a lighter band because
   * SET-01 says the user must see it, and must not read it as earned.
   */
  pending?: number;
  /**
   * `MissionProgress.milestones[]` — the values along the way that mean something, in the
   * same unit as `current`. A pin sits at each, so a six-round mission reads as five
   * checkpoints rather than one long wait (goal-gradient, §4.3).
   */
  milestones?: number[];
  /** "งวด" · "ใบ" · "ครั้ง". Printed after the fraction so `X/Y` keeps its own shape. */
  unit?: string;
  /** Grey the rail out — a mission that expired or ran out still shows where it got to. */
  muted?: boolean;
  className?: string;
}

const clampPct = (n: number) => `${Math.max(0, Math.min(100, n))}%`;

/**
 * One rail: how far along, what is still settling, and the checkpoints in between.
 */
const MissionProgress: React.FC<MissionProgressProps> = ({
  current,
  target,
  pending = 0,
  milestones = [],
  unit,
  muted = false,
  className = '',
}) => {
  const safeTarget = Math.max(1, target);
  const confirmedPct = (Math.min(current, safeTarget) / safeTarget) * 100;
  // The pending band starts where the confirmed fill stops and cannot push past the target.
  const pendingPct =
    (Math.max(0, Math.min(current + pending, safeTarget) - Math.min(current, safeTarget)) /
      safeTarget) *
    100;

  return (
    <div
      className={`ltp-mission-progress${muted ? ' ltp-mission-progress--muted' : ''} ${className}`}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={target}
    >
      <div className="ltp-mission-progress__head">
        <Text role="label-md-semibold" tone="secondary">
          {current}/{target}
          {unit ? ` ${unit}` : ''}
        </Text>
        {pending > 0 && (
          <Text role="caption-md-regular" tone="tertiary">
            กำลังตรวจสอบอีก {pending}
            {unit ? ` ${unit}` : ''}
          </Text>
        )}
      </div>

      <div className="ltp-mission-progress__rail">
        <div className="ltp-mission-progress__track">
          <div className="ltp-mission-progress__bars">
            <div className="ltp-mission-progress__fill" style={{ width: clampPct(confirmedPct) }} />
            {pendingPct > 0 && (
              <div className="ltp-mission-progress__pending" style={{ width: clampPct(pendingPct) }} />
            )}
          </div>
        </div>

        {milestones.map((stop) => (
          <span
            key={stop}
            className={`ltp-mission-progress__pin${
              current >= stop ? ' ltp-mission-progress__pin--reached' : ''
            }`}
            style={{ left: clampPct((stop / safeTarget) * 100) }}
          />
        ))}
      </div>
    </div>
  );
};

export default MissionProgress;
