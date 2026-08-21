import React from 'react';
import '../../foundations/tokens.css';
import Logo from '../../logos/Logo';
import ActionBar from '../ActionBar/ActionBar';
import {
  ERROR_STATE,
  ERROR_STATE_ILLUSTRATION,
  ERROR_STATE_ILLUSTRATION_SIZE,
  type ErrorStateType,
} from './tokens';

export interface ErrorStateProps {
  /** Which of Figma's four states to render. Decides the illustration. */
  type?: ErrorStateType;
  title: React.ReactNode;
  /** The explanation under the title. Line breaks in the string are honoured. */
  body?: React.ReactNode;

  /** Primary action. Figma labels it "กรุณาลองใหม่อีกครั้ง". */
  primary?: { label: string; onClick?: () => void };
  /** The way out. Figma draws it but hides it by default. */
  secondary?: { label: string; onClick?: () => void };

  /** Replace the illustration — for a state the design system does not model yet. */
  illustration?: React.ReactNode;
  className?: string;
}

/**
 * ErrorState — Lotteryplus Design System
 *
 * Figma's `noti-error` (15170:101685). Worth being clear about what this is, because it
 * sits on the `logos-and-graphics` page and looks like artwork: it is not. It is an
 * arrangement of three things the library already had — a mark from the logo set at 280px,
 * a heading and body, and the sticky action bar. Nothing new was drawn for it.
 *
 * That is also why it lives here and not in `assets`: the illustrations are assets, the
 * layout is a component.
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  type = 'errorOccurred',
  title,
  body,
  primary,
  secondary,
  illustration,
  className = '',
}) => (
  <div
    className={`ltp-error-state ltp-error-state--${type} ${className}`}
    role="status"
    style={{
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: ERROR_STATE.gap,
      width: '100%',
      maxWidth: ERROR_STATE.width,
      padding: `0 ${ERROR_STATE.paddingX}`,
    }}
  >
    {illustration ?? (
      <Logo name={ERROR_STATE_ILLUSTRATION[type]} alt="" size={ERROR_STATE_ILLUSTRATION_SIZE} />
    )}

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: ERROR_STATE.textGap,
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <p
          style={{
            margin: 0,
            fontSize: ERROR_STATE.titleSize,
            lineHeight: ERROR_STATE.titleLineHeight,
            fontWeight: ERROR_STATE.titleWeight as unknown as React.CSSProperties['fontWeight'],
            color: ERROR_STATE.titleForeground,
          }}
        >
          {title}
        </p>
        {body && (
          <p
            style={{
              margin: 0,
              // Figma writes these strings with a hard line break in the middle.
              whiteSpace: 'pre-line',
              fontSize: ERROR_STATE.bodySize,
              lineHeight: ERROR_STATE.bodyLineHeight,
              fontWeight: ERROR_STATE.bodyWeight as unknown as React.CSSProperties['fontWeight'],
              color: ERROR_STATE.bodyForeground,
            }}
          >
            {body}
          </p>
        )}
      </div>

      {(primary || secondary) && (
        <ActionBar
          primary={primary}
          secondary={secondary}
        />
      )}
    </div>
  </div>
);

export default ErrorState;
