import React, { useEffect, useState, useCallback } from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import {
  TOAST_TYPES,
  TOAST_COLORS,
  TOAST_DIMENSIONS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  SHADOW,
  CLOSE_ICON,
  type ToastType,
  type ToastVariant,
} from './tokens';
import './Toast.css';

// ═══════════════════════════════════════════
//  Toast Component — Lotteryplus Design System
//  Figma: "toast-message" section
//    light-toast (14848:2072): 3 types (informative, success, error)
//    solid-toast (14848:2109): 4 types (informative, success, warning, error)
//
//  Structure: Container → Frame3 → Frame2 (icon + text) + close
//  All values bound to Foundation variables:
//  - Spacing: dimension/spacing/* (2-semantic)
//  - Radius: dimension/breakpoint/radius/* (2-semantic)
//  - Typography: title/m-semb, body/m-reg
//  - Colors: colors/toast/* (3-component)
//  - Shadow: dimension/shadow/sm
//  - Icons: icons-size component (Size=20)
// ═══════════════════════════════════════════

export interface ToastProps {
  /** Variant style — matches Figma component set */
  variant?: ToastVariant;
  /** Toast type — matches Figma "type" variant property */
  type?: ToastType;
  /** Title text */
  title?: string;
  /** Caption/description text */
  caption?: string;
  /** Show type icon — default true */
  showIcon?: boolean;
  /** Show close button — default true */
  showClose?: boolean;
  /** Close button callback */
  onClose?: () => void;
  /** Additional className */
  className?: string;
  /** Enable slide-in animation — default true */
  animated?: boolean;
  /** Auto dismiss in ms (0 = no auto close) */
  autoClose?: number;
}

const Toast: React.FC<ToastProps> = ({
  variant = 'light',
  type = 'informative',
  title = 'Toast Title',
  caption = 'Toast description message goes here.',
  showIcon = true,
  showClose = true,
  onClose,
  className = '',
  animated = true,
  autoClose = 0,
}) => {
  const [dismissing, setDismissing] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleClose = useCallback(() => {
    setDismissing(true);
    // Wait for fade-out animation to complete
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 250);
  }, [onClose]);

  // Auto close timer
  useEffect(() => {
    if (autoClose && autoClose > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, handleClose]);

  if (!visible) return null;

  const typeConfig = TOAST_TYPES[type];
  const colors = TOAST_COLORS[variant];

  // Determine container colors based on variant
  const containerBg = variant === 'light' ? typeConfig.lightBg : typeConfig.solidBg;
  const containerBorder = variant === 'light'
    ? `${BORDER_WIDTH[1]}px solid ${typeConfig.lightBorder}`
    : 'none';

  // Icon circle bg
  const iconCircleBg = variant === 'light' ? typeConfig.lightIconBg : typeConfig.solidIconBg;
  // Icon SVG color (white on light-toast icon circle, colored on solid-toast icon circle)
  const iconSvgColor = variant === 'light' ? '#FFFFFF' : typeConfig.solidBg;

  // Build CSS class
  const cssClass = [
    'ltp-toast',
    animated && !dismissing ? 'ltp-toast--animated' : '',
    dismissing ? 'ltp-toast--dismissing' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cssClass}
      style={{
        // Auto Layout: HORIZONTAL, CENTER alignment
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        // Padding: spacing-lg (8) top/bottom, spacing-2xl (16) left/right
        paddingTop: TOAST_DIMENSIONS.padding.top,
        paddingRight: TOAST_DIMENSIONS.padding.right,
        paddingBottom: TOAST_DIMENSIONS.padding.bottom,
        paddingLeft: TOAST_DIMENSIONS.padding.left,

        // Gap: spacing-2xl = 16px
        gap: TOAST_DIMENSIONS.gap,

        // Corner Radius: radius-2xl = 16px
        borderRadius: TOAST_DIMENSIONS.borderRadius,

        // Background & Border
        backgroundColor: containerBg,
        border: containerBorder,

        // Shadow: dimension/shadow/sm
        boxShadow: SHADOW.sm,

        // Box sizing
        boxSizing: 'border-box',

        // Font family
        fontFamily: "'Graphik TH', sans-serif",
      }}
      role="alert"
      aria-live="polite"
    >
      {/* ── Frame3 → Frame2 (Icon + Text) ── */}
      <div
        className="ltp-toast__inner"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: TOAST_DIMENSIONS.gap, // spacing-2xl = 16px
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* ── Icon Circle ── */}
        {/* Figma: 28x28, radius-full, padding spacing-sm (4px) */}
        {showIcon && (
          <div
            className="ltp-toast__icon"
            style={{
              width: TOAST_DIMENSIONS.icon.circleSize,     // 28px
              height: TOAST_DIMENSIONS.icon.circleSize,    // 28px
              minWidth: TOAST_DIMENSIONS.icon.circleSize,
              borderRadius: TOAST_DIMENSIONS.icon.circleRadius, // radius-full = 9999
              backgroundColor: iconCircleBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: TOAST_DIMENSIONS.icon.circlePadding, // spacing-sm = 4px
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            <Icon
              name={typeConfig.iconName}
              size={TOAST_DIMENSIONS.icon.iconSize as any} // 20px
              customColor={iconSvgColor}
            />
          </div>
        )}

        {/* ── Text Frame ── */}
        {/* Figma: VERTICAL, gap 0 */}
        <div
          className="ltp-toast__text"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: TOAST_DIMENSIONS.text.gap, // 0
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Title: title/m-semb → 16px Semibold */}
          {title && (
            <div
              className="ltp-toast__title"
              style={{
                fontFamily: TYPOGRAPHY.title.fontFamily,
                fontSize: TYPOGRAPHY.title.fontSize,
                fontWeight: TYPOGRAPHY.title.fontWeight,
                lineHeight: TYPOGRAPHY.title.lineHeight,
                color: colors.title,
              }}
            >
              {title}
            </div>
          )}

          {/* Caption: body/m-reg → 14px Regular */}
          {caption && (
            <div
              className="ltp-toast__caption"
              style={{
                fontFamily: TYPOGRAPHY.caption.fontFamily,
                fontSize: TYPOGRAPHY.caption.fontSize,
                fontWeight: TYPOGRAPHY.caption.fontWeight,
                lineHeight: TYPOGRAPHY.caption.lineHeight,
                color: colors.caption,
              }}
            >
              {caption}
            </div>
          )}
        </div>
      </div>

      {/* ── Close Button ── */}
      {/* Figma: filled-close, icons-size 20x20 */}
      {showClose && (
        <button
          className="ltp-toast__close"
          onClick={handleClose}
          aria-label="Close toast"
          style={{ color: colors.closeIcon }}
        >
          <Icon
            name={CLOSE_ICON.name}
            size={CLOSE_ICON.size as any}
            customColor={colors.closeIcon}
          />
        </button>
      )}
    </div>
  );
};

export default Toast;
