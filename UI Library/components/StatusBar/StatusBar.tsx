import React from 'react';
import '../../foundations/tokens.css';
import { STATUS_BAR } from './tokens';

export interface StatusBarProps {
  /** Apple's own screenshot time, and the one Figma's status bar carries. */
  time?: string;
  /** Draw on a coloured header — white glyphs — or on a light page. */
  tone?: 'light' | 'dark';
  className?: string;
}

/** Signal, wifi and battery, drawn rather than iconified: they are device chrome. */
const Indicators: React.FC<{ color: string }> = ({ color }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }} aria-hidden>
    {/* signal — four rising bars */}
    <svg width="18" height="12" viewBox="0 0 18 12" fill={color}>
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
    {/* wifi */}
    <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
      <path d="M8.5 11.2 6.2 8.6a3.6 3.6 0 0 1 4.6 0L8.5 11.2Z" />
      <path
        d="M8.5 4.1c1.9 0 3.6.7 4.9 1.9l1.4-1.6A9.3 9.3 0 0 0 8.5 2 9.3 9.3 0 0 0 2.2 4.4l1.4 1.6A7.2 7.2 0 0 1 8.5 4.1Z"
        opacity="0.9"
      />
    </svg>
    {/* battery */}
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="22" height="12" rx="3.8" stroke={color} opacity="0.4" />
      <rect x="2" y="2" width="19" height="9" rx="2.5" fill={color} />
      <path d="M24.5 4.5v4a2.1 2.1 0 0 0 0-4Z" fill={color} opacity="0.4" />
    </svg>
  </span>
);

/**
 * StatusBar — Lotteryplus Design System
 *
 * The strip the phone draws above the app: the time on the left, signal, wifi and battery
 * on the right, and the Dynamic Island between them.
 *
 * It is not the product's UI, which is why it never appeared in a component audit — but
 * `AppShell` has a `statusBar` slot and every page mock needs one filled, so it was being
 * hand-drawn in stories with a literal `▮▮▮` standing in for the indicators. A page story
 * may not write a literal colour, so the strip had to become a component before the page
 * tier could use it.
 *
 * Height comes from `status-bar-height` (47), which was measured off Figma's own StatusBar
 * instance rather than guessed at.
 */
const StatusBar: React.FC<StatusBarProps> = ({ time = '9:41', tone = 'light', className = '' }) => {
  const color = tone === 'light'
    ? 'var(--sys-color-foreground-white)'
    : 'var(--sys-color-text-secondary-default)';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: STATUS_BAR.height,
        padding: `0 ${STATUS_BAR.paddingX}`,
        color,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--sys-type-label-md-semibold-family)',
          fontSize: STATUS_BAR.timeSize,
          fontWeight: 600,
          letterSpacing: 0.2,
        }}
      >
        {time}
      </span>

      {/* The Island belongs to the device, so it is black whatever the app behind it is. */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 'var(--topfoot-device-island-top)',
          width: 'var(--topfoot-device-island-width)',
          height: 'var(--topfoot-device-island-height)',
          borderRadius: 'var(--sys-radius-full)',
          background: 'var(--sys-color-foreground-black)',
        }}
      />

      <Indicators color={color} />
    </div>
  );
};

export default StatusBar;
