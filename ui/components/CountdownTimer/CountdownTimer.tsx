import React, { useEffect, useMemo, useState } from 'react';
import '../../foundations/tokens.css';
import { TIMER, type TimerTone } from './tokens';

export interface CountdownTimerProps {
  /** When the countdown reaches zero. ISO string, epoch ms, or a Date. */
  expiresAt: string | number | Date;
  /** Which of the Frontend's three treatments to draw. */
  tone?: TimerTone;
  /**
   * Draw the small badge that hangs off the top of a card rather than the inline pill.
   * Position is the caller's: the Frontend's `notification` wrapper supplies `top-10`,
   * so that offset belongs to the parent, not here.
   */
  floating?: boolean;
  /** Called once when the countdown hits zero. */
  onExpire?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const pad = (n: number) => n.toString().padStart(2, '0');

/** Whole hours, minutes and seconds left. Never negative. */
export const remaining = (ms: number) => {
  const clamped = Math.max(0, ms);
  return {
    hours: Math.floor(clamped / 3_600_000),
    minutes: Math.floor((clamped % 3_600_000) / 60_000),
    seconds: Math.floor((clamped % 60_000) / 1000),
  };
};

/**
 * CountdownTimer — Lotteryplus Design System
 *
 * No Figma component exists (verified absent 2026-08-20). Built from the Frontend's
 * `common/notification/timer` plus its `useCountdown` hook, per the amended authority
 * rule. One call site today, kept because the PRD's 24-hour reservation flow runs on it.
 *
 * The Frontend's `notification` wrapper is not ported: its whole body is
 * `relative flex flex-col items-center` — a positioning context, which is the caller's
 * job, not a component.
 */
const CountdownTimer: React.FC<CountdownTimerProps> = ({
  expiresAt,
  tone = 'default',
  floating = false,
  onExpire,
  className = '',
  style,
}) => {
  const target = useMemo(() => new Date(expiresAt ?? 0).getTime(), [expiresAt]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const left = target - now;
  const { hours, minutes, seconds } = remaining(left);

  // Fires once: `left <= 0` stays true afterwards, so the guard is the effect's deps.
  const expired = left <= 0;
  useEffect(() => {
    if (expired) onExpire?.();
  }, [expired, onExpire]);

  const palette =
    tone === 'red'
      ? { background: TIMER.redBackground, color: TIMER.redForeground }
      : tone === 'sidebar'
        ? { background: TIMER.sidebarBackground, color: TIMER.foreground }
        : { background: TIMER.background, color: TIMER.foreground };

  return (
    <span
      className={`ltp-timer ${className}`}
      role="timer"
      aria-live="off"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 'max-content',
        padding: `0 ${TIMER.paddingX}`,
        ...palette,
        ...(floating
          ? {
              position: 'absolute',
              borderRadius: `${TIMER.floatRadius} ${TIMER.floatRadius} 0 0`,
              fontSize: TIMER.floatSize,
              lineHeight: TIMER.floatLineHeight,
              fontWeight: TIMER.floatWeight as unknown as React.CSSProperties['fontWeight'],
            }
          : {
              height: TIMER.height,
              borderRadius: TIMER.radius,
              fontSize: TIMER.size,
              lineHeight: TIMER.lineHeight,
              fontWeight: TIMER.weight as unknown as React.CSSProperties['fontWeight'],
            }),
        ...style,
      }}
    >
      {pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </span>
  );
};

export default CountdownTimer;
