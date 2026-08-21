import React from 'react';
import '../../foundations/tokens.css';

export interface DeviceFrameProps {
  children?: React.ReactNode;
  /**
   * Cut the frame short. A page story often wants several devices side by side at less
   * than full height; the width and radius stay real so the layout inside is not lying.
   */
  height?: number | string;
  /** Let the content scroll inside the frame, as it does on a phone. */
  scroll?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DeviceFrame — Lotteryplus Design System
 *
 * An iPhone 16 at its real logical size: 393 x 852 points, 47pt corners. The numbers are
 * tokens (`--topfoot-device-*`), not constants, because they were measured once and the
 * mock should not drift from what the shell was measured against.
 *
 * It exists for the page tier. Every page story needs a phone to sit in, and drawing one
 * by hand means a literal border colour in each — which `check-pages.py` refuses, rightly:
 * a page that hardcodes a colour is a page the rename has to visit. AppShell's own stories
 * hand-rolled this three times before it had a name.
 */
const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  height,
  scroll = true,
  className = '',
  style,
}) => (
  <div
    className={className}
    style={{
      boxSizing: 'border-box',
      width: 'var(--topfoot-device-width)',
      height: height ?? 'var(--topfoot-device-height)',
      borderRadius: 'var(--topfoot-device-radius)',
      border: '1px solid var(--sys-color-border-accent-gray-light)',
      overflow: 'hidden',
      background: 'var(--sys-color-background-default)',
      flex: 'none',
      ...style,
    }}
  >
    {scroll ? <div style={{ height: '100%', overflowY: 'auto' }}>{children}</div> : children}
  </div>
);

export default DeviceFrame;
