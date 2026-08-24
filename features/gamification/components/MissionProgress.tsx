import React from 'react';
import '../../../ui/foundations/tokens.css';
import Text from '../../../ui/components/Text/Text';
import './MissionProgress.css';

// ═══════════════════════════════════════════
//  MissionProgress — features/gamification · scope: feature
//
//  Requirements: prd-dev.md v1.0 AC-301 #3 · ux-gamification.md §4.3
//  ("Progress X/Y + หมุดระหว่างทาง").
//
//  Reuse check before writing it: `ui/components/ProgressBar` is the checkout stepper —
//  a fixed list of named steps, each with an icon and a caption. A mission is a count
//  against a target ("38/50 ใบ") with checkpoints along the way. Nothing in ui/ draws
//  that. It moves to ui/ once a second feature needs one (Lark §3.3).
// ═══════════════════════════════════════════

export interface MissionProgressProps {
  /** `MissionProgress.current` (§5.1) — what the user has actually done. */
  current: number;
  /** `MissionProgress.target` — what finishes the mission. */
  target: number;
  /**
   * `MissionProgress.milestones[]`, in the same unit as `current`. Each becomes a pip on
   * the rail at its own value, so a long ladder reads as several short ones
   * (goal-gradient, §4.3) rather than one distant finish.
   */
  marks?: number[];
  /** Print the milestone numbers under the rail. Off on the card, where space is tight. */
  showLabels?: boolean;
  className?: string;
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

/**
 * A rail, a head, and the checkpoints — all placed by value.
 *
 * The mark for 10 out of 50 sits a fifth of the way along. That sounds obvious and it is
 * the thing this component previously got wrong: the marks were laid out in equal columns,
 * so 10 · 25 · 40 · 50 came out evenly spaced and the picture disagreed with the numbers
 * printed under it.
 */
const MissionProgress: React.FC<MissionProgressProps> = ({
  current,
  target,
  marks = [],
  showLabels = false,
  className = '',
}) => {
  const safeTarget = Math.max(1, target);
  const at = (value: number) => clamp((value / safeTarget) * 100);
  const pct = at(current);

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

        {marks.map((mark) => (
          <span
            key={mark}
            className={`ltp-mission-progress__pip${
              current >= mark ? ' ltp-mission-progress__pip--reached' : ''
            }`}
            style={{ left: `${at(mark)}%` }}
          />
        ))}

        {/* Hidden at a standing start: a knob at zero reads as a control to drag, not as
            a position reached. */}
        {current > 0 && (
          <span className="ltp-mission-progress__head" style={{ left: `${pct}%` }} />
        )}
      </div>

      {showLabels && marks.length > 0 && (
        <div className="ltp-mission-progress__labels">
          {marks.map((mark) => {
            const left = at(mark);
            // Centred on its own mark, except at the ends, where centring would hang the
            // number off the card.
            const shift = left <= 2 ? '0' : left >= 98 ? '-100%' : '-50%';
            return (
              <span
                key={mark}
                className="ltp-mission-progress__label"
                style={{ left: `${left}%`, transform: `translateX(${shift})` }}
              >
                <Text role="caption-md-regular" tone="tertiary">
                  {mark.toLocaleString('en-US')}
                </Text>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MissionProgress;
