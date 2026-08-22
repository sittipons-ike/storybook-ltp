import React from 'react';
import '../../foundations/tokens.css';

export interface DeviceFrameProps {
  children?: React.ReactNode;
  /**
   * Cut the frame short. Several devices side by side rarely need the full 852; the width
   * and the radius stay real so the layout inside is not being lied to.
   */
  height?: number | string;
  /** Let the content scroll inside the frame, as it does on a phone. */
  scroll?: boolean;
  /**
   * The bezel and drop shadow that make it read as a device rather than a div.
   * Off when the frame is only there to constrain width.
   */
  chrome?: boolean;
  /** The bar the phone draws at the bottom. On by default — the device always has one. */
  homeIndicator?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DeviceFrame — Lotteryplus Design System
 *
 * An iPhone 16 at its real logical size: 393 x 852 points, 47pt corners. The numbers are
 * tokens (`--topfoot-device-*`) rather than constants, because they were measured once and
 * a mock that drifts from the size the shell was measured against is worse than no mock.
 *
 * Note that Figma's own template frames are 390 x 844 — an iPhone 14-class canvas. The
 * three points of width and eight of height land in the `main` slot, which is what a
 * responsive shell is supposed to absorb. The device the spec names wins over the canvas
 * the templates happen to be drawn on.
 *
 * The home indicator is drawn here rather than by the page: it is the phone's, not the
 * app's, and a page that had to remember to add one would eventually forget.
 */
const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  height,
  scroll = true,
  chrome = true,
  homeIndicator = true,
  className = '',
  style,
}) => (
  <div
    className={className}
    style={{
      // content-box, so the bezel sits *outside* the screen. Under border-box a 10px
      // bezel eats 20 points of a 393-point screen and every measurement inside the
      // frame comes out 20 short of the device it claims to be.
      boxSizing: 'content-box',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: 'var(--topfoot-device-width)',
      height: height ?? 'var(--topfoot-device-height)',
      borderRadius: 'var(--topfoot-device-radius)',
      // A real bezel, not a hairline: the phone's edge is dark and thick enough to read.
      border: chrome
        ? '10px solid var(--sys-color-background-super-darker)'
        : '1px solid var(--sys-color-border-accent-gray-light)',
      boxShadow: chrome ? 'var(--sys-elevation-hero)' : undefined,
      overflow: 'hidden',
      background: 'var(--sys-color-background-default)',
      flex: 'none',
      ...style,
    }}
  >
    <div style={{ flex: 1, minHeight: 0, overflowY: scroll ? 'auto' : 'hidden' }}>{children}</div>

    {homeIndicator && (
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 'var(--topfoot-home-indicator-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            width: 'var(--topfoot-home-indicator-bar-width)',
            height: 'var(--topfoot-home-indicator-bar-height)',
            borderRadius: 'var(--topfoot-home-indicator-bar-radius)',
            background: 'var(--topfoot-home-indicator-foreground)',
          }}
        />
      </div>
    )}
  </div>
);

export default DeviceFrame;
