import React from 'react';
import '../../foundations/tokens.css';
import { STATUS_BAR } from './tokens';

export interface StatusBarProps {
  /** Apple's screenshot time, and the one Figma's status bar carries. */
  time?: string;
  /** Paint over a coloured header (white glyphs) or a light page. */
  tone?: 'light' | 'dark';
  /** The red the header behind it uses. Omit for transparent. */
  background?: 'primary' | 'transparent';
  className?: string;
}

/**
 * Signal, wifi and battery. Drawn rather than iconified: they belong to the device, not
 * to the icon set, and none of them exists in Figma's `icons` frame.
 *
 * Sizes are Figma's: signal 18x12, wifi 17x11.8, battery 27.4x13.
 */
const Indicators: React.FC<{ color: string }> = ({ color }) => (
  <span
    aria-hidden
    style={{
      position: 'absolute',
      right: STATUS_BAR.indicatorRight,
      top: STATUS_BAR.indicatorY,
      display: 'inline-flex',
      alignItems: 'center',
      gap: STATUS_BAR.indicatorGap,
      height: 13,
    }}
  >
    <svg width="18" height="12" viewBox="0 0 18 12" fill={color}>
      <rect x="0" y="8.5" width="3" height="3.5" rx="1" />
      <rect x="5" y="5.8" width="3" height="6.2" rx="1" />
      <rect x="10" y="2.9" width="3" height="9.1" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
    <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
      <path d="M8.5 12 5.9 9a3.9 3.9 0 0 1 5.2 0L8.5 12Z" />
      <path d="M8.5 4.4c2 0 3.9.8 5.3 2.1l1.5-1.7A10 10 0 0 0 8.5 2 10 10 0 0 0 1.7 4.8l1.5 1.7a7.7 7.7 0 0 1 5.3-2.1Z" />
    </svg>
    <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
      <rect x="0.6" y="0.6" width="23" height="11.8" rx="3.4" stroke={color} strokeOpacity="0.4" strokeWidth="1.2" />
      <rect x="2.2" y="2.2" width="19.8" height="8.6" rx="2.2" fill={color} />
      <path d="M25.4 4.6c1 .3 1.6 1 1.6 1.9s-.6 1.6-1.6 1.9V4.6Z" fill={color} fillOpacity="0.4" />
    </svg>
  </span>
);

/**
 * StatusBar — Lotteryplus Design System
 *
 * The strip the phone draws above the app: the time, the notch, and the indicators.
 *
 * Not product UI, which is why no component audit ever turned it up — but `AppShell` has a
 * `statusBar` slot and every page mock has to fill it, so it was being hand-drawn in
 * stories with a literal `▮▮▮`. A page story may not write a literal colour, so the strip
 * had to become a component before the page tier could use one.
 *
 * The cut-out is a notch, 156x33, black, and it hangs 2 points above the top edge. An
 * earlier version drew a Dynamic Island because the device tokens name an iPhone 16 —
 * Figma draws the notch, and the design was made against Figma.
 */
const StatusBar: React.FC<StatusBarProps> = ({
  time = '9:41',
  tone = 'light',
  background = 'primary',
  className = '',
}) => {
  const color =
    tone === 'light'
      ? 'var(--sys-color-foreground-white)'
      : 'var(--sys-color-text-secondary-default)';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        height: STATUS_BAR.height,
        overflow: 'hidden',
        background:
          background === 'primary' ? 'var(--sys-color-primary-default)' : 'transparent',
        color,
      }}
    >
      {/* The notch belongs to the device, so it is black whatever is behind it. */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: STATUS_BAR.notchTop,
          width: STATUS_BAR.notchWidth,
          height: STATUS_BAR.notchHeight,
          borderRadius: '0 0 var(--sys-radius-3xl) var(--sys-radius-3xl)',
          background: 'var(--sys-color-foreground-black)',
        }}
      />

      <span
        style={{
          position: 'absolute',
          left: STATUS_BAR.timeX,
          top: STATUS_BAR.timeY,
          display: 'inline-flex',
          alignItems: 'center',
          height: 21,
          fontFamily: 'var(--sys-type-label-md-semibold-family)',
          fontSize: STATUS_BAR.timeSize,
          fontWeight: 600,
          letterSpacing: 0.2,
        }}
      >
        {time}
      </span>

      <Indicators color={color} />
    </div>
  );
};

export default StatusBar;
