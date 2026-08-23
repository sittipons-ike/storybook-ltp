import React from 'react';
import '../../../ui/foundations/tokens.css';
import Text from '../../../ui/components/Text/Text';
import './MissionProgress.css';

// ═══════════════════════════════════════════
//  MissionProgress — features/gamification · scope: feature
//
//  Design: Claude Design project b20d61e7 › `Mission Screens.dc.html` (2026-08-23),
//  which was itself drawn against this repo's tokens and components.
//  Requirements: prd-dev.md v1.0 AC-301 #3 · ux-gamification.md §4.3.
//
//  Reuse check before writing it: `ui/components/ProgressBar` is the checkout stepper —
//  a fixed list of named steps, each with an icon and a caption. A mission is a count
//  against a target ("38/50 ใบ") with marks along the way. Nothing in ui/ draws that.
//  It moves to ui/ once a second feature needs one (Lark §3.3).
// ═══════════════════════════════════════════

export interface MissionProgressProps {
  /** `MissionProgress.current` (§5.1) — what the user has actually done. */
  current: number;
  /** `MissionProgress.target` — what finishes the mission. */
  target: number;
  /**
   * `MissionProgress.milestones[]`, in the same unit as `current`. Each becomes a dot
   * with its number under it, so a long ladder reads as several short ones
   * (goal-gradient, §4.3) rather than one distant finish.
   */
  marks?: number[];
  className?: string;
}

const MissionProgress: React.FC<MissionProgressProps> = ({
  current,
  target,
  marks = [],
  className = '',
}) => {
  const safeTarget = Math.max(1, target);
  const pct = Math.min(100, Math.round((current / safeTarget) * 100));

  return (
    <div
      className={`ltp-mission-progress ${className}`}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={target}
    >
      <div className="ltp-mission-progress__rail">
        <div className="ltp-mission-progress__fill" style={{ width: `${pct}%` }} />
      </div>

      {marks.length > 0 && (
        <div className="ltp-mission-progress__marks">
          {marks.map((mark) => (
            <span className="ltp-mission-progress__mark" key={mark}>
              <span
                className={`ltp-mission-progress__dot${
                  current >= mark ? ' ltp-mission-progress__dot--reached' : ''
                }`}
              />
              <Text role="caption-md-regular" tone="tertiary" className="ltp-mission-progress__label">
                {mark.toLocaleString('en-US')}
              </Text>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionProgress;
