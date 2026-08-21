import React from 'react';
import '../../foundations/tokens.css';
import { sys } from '../../foundations/tokens';

export interface BareScreenProps {
  children?: React.ReactNode;
  /** Outline the single slot, for reviewing the frame rather than the content. */
  showSlots?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
}

/**
 * BareScreen — Lotteryplus Design System
 *
 * The viewport with no app chrome. Seven real pages use it: the 404, the login handoff,
 * shared prize links, affiliate links, and two standalone marketing pages.
 *
 * It exists as a named pattern rather than as "no pattern" because dropping the chrome
 * is a deliberate choice on those pages — a shared link should not show a tab bar to
 * someone who is not signed in.
 */
const BareScreen: React.FC<BareScreenProps> = ({
  children,
  showSlots = false,
  width,
  height,
  className = '',
}) => (
  <div
    className={`ltp-bare ${className}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: width ?? '100%',
      height: height ?? '100%',
      background: sys('color-background-default'),
      color: sys('color-text-secondary-default'),
      fontFamily: sys('type-body-md-regular-family'),
      overflow: 'auto',
    }}
  >
    {children ||
      (showSlots && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px dashed ${sys('color-border-accent-gray-light')}`,
            background: sys('color-background-soft-light'),
            color: sys('color-text-state-light-gray'),
            fontSize: 11,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            letterSpacing: '0.06em',
          }}
        >
          main
        </div>
      ))}
  </div>
);

export default BareScreen;
