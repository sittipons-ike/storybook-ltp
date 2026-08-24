import React from 'react';
import '../../../ui/foundations/tokens.css';
import { sys } from '../../../ui/foundations/tokens';
import Text from '../../../ui/components/Text/Text';
import Icon from '../../../ui/icons/Icon';
import '../../../ui/icons/icon-data';
import './MissionProgress.css';

// ═══════════════════════════════════════════
//  MissionProgress — features/gamification · scope: feature
//
//  Requirements: prd-dev.md v1.1 §6.0 (MT-01, MT-02) · AC-301 #3 ·
//  ux-gamification.md §4.3.
//
//  §6.0 splits missions into three shapes, and a mission's progress has to be drawn in
//  the shape it actually has. One picture for all three is what this file used to be, and
//  it hid half of what a FREQUENCY mission asks for:
//
//    ladder  — VOLUME #1. One climb with a reward waiting at each rung `[user 2026-08-24]`.
//    single  — VOLUME #2. One count, one finish, nothing in between.
//    pair    — FREQUENCY. Two counts of different kinds, both of which must fill.
//
//  Reuse check before writing any of it: `ui/components/ProgressBar` is the checkout
//  stepper — a fixed list of named steps, each with an icon and a caption. None of these
//  three is that. They move to ui/ once a second feature needs one (Lark §3.3).
// ═══════════════════════════════════════════

/** prd §6.0 — the three shapes a mission's progress can take. */
export type MissionShape = 'single' | 'ladder' | 'pair';

/**
 * Text's own `success` tone is #22C55E, which on white measures 2.28:1 — a quarter of what
 * small text needs. The darker step of the same green reads 12.31:1 and still says green.
 * It goes through `style` because Text writes its colour inline, where a class cannot
 * reach it.
 */
const DONE_COUNT = { color: sys('color-status-success-darker') } as const;

const clamp = (n: number) => Math.max(0, Math.min(100, n));

// ─────────────────────────────────────────────────────────────
//  single — one count against one target
// ─────────────────────────────────────────────────────────────

export interface MissionProgressProps {
  /** `MissionProgress.current` (§5.1) — what the user has actually done. */
  current: number;
  /** `MissionProgress.target` — what finishes the mission. */
  target: number;
  /**
   * Checkpoints in the same unit as `current`, each placed on the rail at its own value.
   * VOLUME #2 has none: §6.0 calls it `1 Task แบบต่อเนื่อง` — one run, no markers.
   */
  marks?: number[];
  /** Print the milestone numbers under the rail. Off on the card, where space is tight. */
  showLabels?: boolean;
  className?: string;
}

/**
 * A rail, a head, and any checkpoints — all placed by value.
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
          {marks.map((mark) => (
            <RailLabel key={mark} left={at(mark)}>
              {mark.toLocaleString('en-US')}
            </RailLabel>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * A number pinned under its own mark, pulled back inside the rail at either end.
 *
 * Set at 12px, not the 10 it used to be. On a ladder the rungs are drawn equal-width while
 * the numbers they stand for are not, so these labels are the only thing keeping the
 * picture honest — the smallest step in the scale is the wrong place for that job.
 */
const RailLabel: React.FC<{ left: number; children: React.ReactNode }> = ({ left, children }) => {
  const shift = left <= 2 ? '0' : left >= 98 ? '-100%' : '-50%';
  return (
    <span
      className="ltp-mission-progress__label"
      style={{ left: `${left}%`, transform: `translateX(${shift})` }}
    >
      <Text role="caption-lg-regular" tone="tertiary">{children}</Text>
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
//  ladder — VOLUME #1, a reward at every rung
// ─────────────────────────────────────────────────────────────

/** Where a rung stands: collected · reached and waiting to be collected · still ahead. */
export type RungState = 'claimed' | 'ready' | 'locked';

/** One rung of a ladder mission: reach `at`, and this reward is yours `[user 2026-08-24]`. */
export interface MissionRung {
  /** The count that unlocks it, in the mission's own unit. */
  at: number;
  reward: string;
  image: string;
  state: RungState;
}

export interface MissionLadderProps {
  current: number;
  rungs: MissionRung[];
  unit?: string;
  /** Print each rung's threshold under the rail. Off where space is tight. */
  showLabels?: boolean;
  className?: string;
}

/**
 * The rungs get equal widths, not their share of the final number.
 *
 * That is the opposite of what the single rail does, and deliberately so. Drawn to scale,
 * a ladder of 50 · 200 · 500 puts its first two rungs in the left tenth of the bar and
 * someone at 38 of 500 sees a bar that looks untouched — the picture would say "hopeless"
 * about a mission whose first reward is twelve tickets away. Equal rungs say "step one of
 * three", which is what the mission actually is. The thresholds are printed on the rail so
 * the even spacing never has to stand in for a number.
 */
export const MissionLadder: React.FC<MissionLadderProps> = ({
  current,
  rungs,
  unit = '',
  showLabels = false,
  className = '',
}) => {
  const n = Math.max(1, rungs.length);
  const active = rungs.findIndex((r) => current < r.at);
  const i = active === -1 ? n : active;
  const previous = i === 0 ? 0 : rungs[i - 1].at;
  const span = i >= n ? 1 : Math.max(1, rungs[i].at - previous);
  const within = i >= n ? 0 : clamp(((current - previous) / span) * 100) / 100;
  const pct = clamp(((i + within) / n) * 100);
  const final = rungs[n - 1]?.at ?? 0;

  return (
    <div
      className={`ltp-mission-progress ${className}`}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={final}
      aria-valuetext={`${current.toLocaleString('en-US')} จาก ${final.toLocaleString('en-US')} ${unit} · ผ่านแล้ว ${i} จาก ${n} หมุด`.trim()}
    >
      <div className="ltp-mission-progress__rail">
        <div className="ltp-mission-progress__fill" style={{ width: `${pct}%` }} />

        {rungs.map((rung, index) => (
          <span
            key={rung.at}
            className={`ltp-mission-progress__pip ltp-mission-progress__pip--rung${
              current >= rung.at ? ' ltp-mission-progress__pip--reached' : ''
            }`}
            style={{ left: `${((index + 1) / n) * 100}%` }}
          />
        ))}

        {/* No head knob here. On a single rail the knob is the only thing marking where
            the user is; on a ladder the rungs already do that, and the knob lands within a
            few pixels of whichever rung was just passed and reads as a fourth marker. The
            leading edge of the fill says the same thing without the collision. */}
      </div>

      {showLabels && (
        <div className="ltp-mission-progress__labels">
          {rungs.map((rung, index) => (
            <RailLabel key={rung.at} left={((index + 1) / n) * 100}>
              {rung.at.toLocaleString('en-US')}
              {unit ? ` ${unit}` : ''}
            </RailLabel>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
//  pair — FREQUENCY, two counts of different kinds
// ─────────────────────────────────────────────────────────────

/**
 * One of the counts a FREQUENCY mission tracks.
 *
 * `target: 1` means the task is done or it is not — "ใช้จิ๊ดริดกล่องสุ่ม 3" is a thing
 * you have done, not a thing you have three of — and it draws as a tick rather than a bar
 * a hair away from empty.
 */
export interface MissionTrack {
  label: string;
  current: number;
  target: number;
  unit?: string;
}

export interface MissionTracksProps {
  tracks: MissionTrack[];
  className?: string;
}

/**
 * Two counts, stacked, each with its own name and its own number.
 *
 * MT-02: a FREQUENCY mission asks for two different things at once, and one `X/Y` cannot
 * say which of them is short. Before this, "ซื้อต่อเนื่อง 3 งวด + ใช้จิ๊ดริดกล่องสุ่ม 3"
 * drew as `2/3 งวด` and the จิ๊ดริด half was invisible — the card asked for something it
 * never showed.
 */
export const MissionTracks: React.FC<MissionTracksProps> = ({ tracks, className = '' }) => (
  <div className={`ltp-mission-tracks ${className}`}>
    {tracks.map((track) => {
      const done = track.current >= track.target;
      // A task with one step has two states and no middle. Drawing it as a rail would
      // offer a position along something that has no along — the same lie the marks used
      // to tell, in miniature — so it gets a tick instead.
      const binary = track.target <= 1;
      return (
        <div
          key={track.label}
          className={`ltp-mission-tracks__row${binary ? ' ltp-mission-tracks__row--tick' : ''}`}
        >
          {binary && (
            <span
              className={`ltp-mission-tracks__mark${
                done ? ' ltp-mission-tracks__mark--done' : ''
              }`}
              aria-hidden="true"
            >
              {/* The tick is the icon from the set, not a glyph or a CSS diagonal: the same
                  mark the rest of this feature uses for "passed", at the same weight. */}
              {done && <Icon name="filled-check" size="2xs" color="inherit" />}
            </span>
          )}
          <div className="ltp-mission-tracks__head">
            {/* The label stays the same weight of dark whether or not the task is done —
                `tone="primary"` is the brand red here, and a row turning red on success
                would collide with the red the rails and counts already use. */}
            <Text role="caption-lg-regular" tone="secondary">{track.label}</Text>
            <Text
              role="label-md-semibold"
              tone="tertiary"
              style={done ? DONE_COUNT : undefined}
              className="ltp-mission-tracks__count"
            >
              {binary
                ? done
                  ? 'ทำแล้ว'
                  : 'ยังไม่ได้ทำ'
                : `${track.current.toLocaleString('en-US')}/${track.target.toLocaleString('en-US')}${
                    track.unit ? ` ${track.unit}` : ''
                  }`}
            </Text>
          </div>
          {!binary && <MissionProgress current={track.current} target={track.target} />}
        </div>
      );
    })}
  </div>
);

export default MissionProgress;
