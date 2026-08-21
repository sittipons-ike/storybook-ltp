import React from 'react';
import '../../foundations/tokens.css';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import { ALERT, ALERT_ICON_SIZE } from './tokens';

export interface AlertProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Override the glyph. Defaults to the warning mark the Frontend draws. */
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Alert — Lotteryplus Design System
 *
 * No Figma component exists (verified absent 2026-08-20). Built from the Frontend's
 * `common/alert`, per the amended authority rule. One call site, kept because the Lark
 * Standard §3.4 lists `alert` as a canonical molecule.
 *
 * Not the same component as Toast, and the inventory's "possibly superseded by toast"
 * note is answered here: Toast is transient, has four types and a dismiss control, and
 * stacks in a corner. Alert is static, sits in the flow of a form, has one type, and
 * cannot be dismissed. Merging them would give one component two lifecycles.
 */
const Alert: React.FC<AlertProps> = ({ title, description, icon, className = '' }) => (
  <div
    role="alert"
    className={`ltp-alert ${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: ALERT.gap,
      padding: `${ALERT.paddingY} ${ALERT.paddingX}`,
      borderRadius: ALERT.radius,
      border: `${ALERT.borderWidth} solid ${ALERT.borderColor}`,
      background: ALERT.background,
      color: ALERT.textColor,
    }}
  >
    <span
      aria-hidden
      style={{
        display: 'grid',
        placeItems: 'center',
        flex: 'none',
        width: ALERT.iconCircleSize,
        height: ALERT.iconCircleSize,
        borderRadius: '50%',
        background: ALERT.iconCircleColor,
        color: ALERT.iconColor,
      }}
    >
      {icon ?? <Icon name="filled-Warning-2" size={ALERT_ICON_SIZE as 20} color="inherit" />}
    </span>
    <div style={{ minWidth: 0 }}>
      <p
        style={{
          margin: 0,
          fontSize: ALERT.titleSize,
          lineHeight: ALERT.titleLineHeight,
          fontWeight: ALERT.titleWeight as unknown as React.CSSProperties['fontWeight'],
        }}
      >
        {title}
      </p>
      {description && (
        <p
          style={{
            margin: 0,
            fontSize: ALERT.descriptionSize,
            lineHeight: ALERT.descriptionLineHeight,
            fontWeight: ALERT.descriptionWeight as unknown as React.CSSProperties['fontWeight'],
          }}
        >
          {description}
        </p>
      )}
    </div>
  </div>
);

export default Alert;
