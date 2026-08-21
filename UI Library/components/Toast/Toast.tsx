import React, { useEffect, useState, useCallback } from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import '../../foundations/tokens.css';
import {
  TOAST,
  TOAST_ICONS,
  TOAST_ICON_SIZE,
  TOAST_CLOSE_ICON,
  TOAST_CLOSE_ICON_SIZE,
  toastColors,
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
//
//  Every style value is a CSS custom property from foundations/tokens.css, which is
//  generated from Figma via design.md + components.json (colours) and
//  components/toast.json (layout, sizing, typography). There are no literal colours,
//  sizes or font values in this file — changing one means changing Figma and
//  regenerating, which is what keeps design and code from drifting apart.
// ═══════════════════════════════════════════

export interface ToastProps {
  /** Variant style — matches Figma component set (light-toast / solid-toast) */
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

  const colors = toastColors(variant, type);

  const cssClass = [
    'ltp-toast',
    `ltp-toast--${variant}`,
    `ltp-toast--${type}`,
    animated && !dismissing ? 'ltp-toast--animated' : '',
    dismissing ? 'ltp-toast--dismissing' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={cssClass}
      style={{
        // Auto Layout: HORIZONTAL, CENTER alignment
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        paddingTop: TOAST.paddingY,
        paddingRight: TOAST.paddingX,
        paddingBottom: TOAST.paddingY,
        paddingLeft: TOAST.paddingX,

        // Figma's Frame 3: 8 between the content block and the close button. The inner row
        // (icon to text) is a different gap — 16 — and using one token for both put the
        // close button twice as far out as the design says.
        gap: TOAST.closeGap,
        borderRadius: TOAST.radius,

        backgroundColor: colors.background,
        // solid-toast draws no stroke in Figma; light-toast strokes with the type hue.
        border: colors.border ? `${TOAST.borderWidth} solid ${colors.border}` : 'none',

        boxShadow: TOAST.shadow,
        boxSizing: 'border-box',

        fontFamily: TOAST.caption.fontFamily,
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
          gap: TOAST.gap,
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* ── Icon Circle ── */}
        {showIcon && (
          <div
            className="ltp-toast__icon"
            style={{
              width: TOAST.iconCircleSize,
              height: TOAST.iconCircleSize,
              minWidth: TOAST.iconCircleSize,
              borderRadius: TOAST.iconCircleRadius,
              backgroundColor: colors.iconCircle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: TOAST.iconCirclePadding,
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            <Icon
              name={TOAST_ICONS[type]}
              size={TOAST_ICON_SIZE as any}
              customColor={colors.icon}
            />
          </div>
        )}

        {/* ── Text Frame ── Figma: VERTICAL, gap 0 */}
        <div
          className="ltp-toast__text"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: TOAST.textGap,
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Title — typography/title/lg/semibold */}
          {title && (
            <div
              className="ltp-toast__title"
              style={{
                fontFamily: TOAST.title.fontFamily,
                fontSize: TOAST.title.fontSize,
                fontWeight: TOAST.title
                  .fontWeight as unknown as React.CSSProperties['fontWeight'],
                lineHeight: TOAST.title.lineHeight,
                letterSpacing: TOAST.title.letterSpacing,
                color: colors.text,
              }}
            >
              {title}
            </div>
          )}

          {/* Caption — typography/body/md/regular */}
          {caption && (
            <div
              className="ltp-toast__caption"
              style={{
                fontFamily: TOAST.caption.fontFamily,
                fontSize: TOAST.caption.fontSize,
                fontWeight: TOAST.caption
                  .fontWeight as unknown as React.CSSProperties['fontWeight'],
                lineHeight: TOAST.caption.lineHeight,
                letterSpacing: TOAST.caption.letterSpacing,
                color: colors.text,
              }}
            >
              {caption}
            </div>
          )}
        </div>
      </div>

      {/* ── Close Button ── Figma: filled-close, icons-size 20x20 */}
      {showClose && (
        <button
          className="ltp-toast__close"
          onClick={handleClose}
          aria-label="Close toast"
          style={{ color: colors.text }}
        >
          <Icon
            name={TOAST_CLOSE_ICON}
            size={TOAST_CLOSE_ICON_SIZE as any}
            customColor={colors.text}
          />
        </button>
      )}
    </div>
  );
};

export default Toast;
