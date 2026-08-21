import React from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import '../../foundations/tokens.css';
import Button from '../Button/Button'; // ← ดึง Button component มาใช้จริง
import {
  MODAL,
  MODAL_ICONS,
  MODAL_ICON_SIZE,
  modalColors,
  type ModalState,
} from './tokens';
import './Modal.css';

// ═══════════════════════════════════════════
//  Modal Component — Lotteryplus Design System
//  Figma: "modal-state" component set (14610:24998)
//  10 variants: state(5) × layout-vertical(2)
//  Properties: show-icon, title, subtitle, show-subtitle, show-2buttons
//
//  Every style value is a CSS custom property from foundations/tokens.css, which is
//  generated from Figma via design.md + components.json (+ components/modal.json for
//  layout and typography). There are no literal colours, sizes or font values in this
//  file — changing one means changing Figma and regenerating.
// ═══════════════════════════════════════════

export interface ModalProps {
  /** Modal state type — matches Figma "state" variant */
  state?: ModalState;
  /** Layout: true = buttons side-by-side (yes), false = buttons stacked (no) */
  layoutVertical?: boolean;
  /** Show icon — matches Figma "show-icon" property */
  showIcon?: boolean;
  /** Title text — matches Figma "title" property */
  title?: string;
  /** Subtitle text — matches Figma "subtitle" property */
  subtitle?: string;
  /** Show subtitle — matches Figma "show-subtitle" property */
  showSubtitle?: boolean;
  /** Show 2 buttons — matches Figma "show-2buttons" property */
  show2Buttons?: boolean;
  /** Primary button text */
  primaryButtonText?: string;
  /** Secondary button text */
  secondaryButtonText?: string;
  /** Primary button click */
  onPrimaryClick?: () => void;
  /** Secondary button click */
  onSecondaryClick?: () => void;
  /** Show overlay backdrop */
  showOverlay?: boolean;
  /** Close on overlay click */
  onOverlayClick?: () => void;
  /** Additional className */
  className?: string;
}

// Stacking order for the scrim. Not a design token — design.md has no z-index ladder.
const SCRIM_Z_INDEX = 1000;

const Modal: React.FC<ModalProps> = ({
  state = 'success',
  layoutVertical = true,
  showIcon = true,
  title = 'ยืนยันการส่งข้อมูล',
  subtitle = 'ส่งข้อมูลการยืนยันตัวตนสำเร็จแล้ว ใช้เวลา 5-7 วันในการตรวจสอบ ',
  showSubtitle = true,
  show2Buttons = true,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  showOverlay = false,
  onOverlayClick,
  className = '',
}) => {
  const colors = modalColors(state);

  // Default button texts based on layout
  const primaryText = primaryButtonText || (layoutVertical ? 'ยืนยัน' : 'ตกลง');
  const secondaryText = secondaryButtonText || 'ยกเลิก';

  const modalContent = (
    <div
      className={`ltp-modal ${className}`}
      style={{
        // Auto Layout: VERTICAL, CENTER alignment
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        width: MODAL.width,
        padding: MODAL.padding,
        gap: MODAL.gap,
        borderRadius: MODAL.radius,
        backgroundColor: MODAL.background,
        boxShadow: MODAL.elevation,
        boxSizing: 'border-box',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* ── Content Area (Icon + Wording) ── */}
      {/* Figma: "Frame 44290" — VERTICAL, CENTER */}
      <div
        className="ltp-modal__content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: MODAL.contentGap,
        }}
      >
        {/* ── Icon ── */}
        {/* Figma: "icon" frame — square, padded, fully rounded, HORIZONTAL CENTER */}
        {showIcon && (
          <div
            className="ltp-modal__icon"
            style={{
              width: MODAL.iconCircleSize,
              height: MODAL.iconCircleSize,
              borderRadius: MODAL.iconCircleRadius,
              backgroundColor: colors.background,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: MODAL.iconCirclePadding,
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            {/* icons-size component, bound in Figma at Size=48 */}
            <Icon
              name={MODAL_ICONS[state]}
              size={MODAL_ICON_SIZE as any}
              customColor={colors.foreground}
            />
          </div>
        )}

        {/* ── Wording ── */}
        {/* Figma: "Wording" — VERTICAL, CENTER */}
        <div
          className="ltp-modal__wording"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: MODAL.wordingGap,
          }}
        >
          {/* Title: title/lg-semibold, CENTER */}
          <div
            className="ltp-modal__title"
            style={{
              fontFamily: MODAL.titleFamily,
              fontSize: MODAL.titleSize,
              fontWeight: MODAL.titleWeight as unknown as React.CSSProperties['fontWeight'],
              lineHeight: MODAL.titleLineHeight,
              letterSpacing: MODAL.titleTracking,
              color: MODAL.text,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {title}
          </div>

          {/* Subtitle: body/md-regular, CENTER */}
          {showSubtitle && subtitle && (
            <div
              className="ltp-modal__subtitle"
              style={{
                fontFamily: MODAL.subtitleFamily,
                fontSize: MODAL.subtitleSize,
                fontWeight: MODAL.subtitleWeight as unknown as React.CSSProperties['fontWeight'],
                lineHeight: MODAL.subtitleLineHeight,
                letterSpacing: MODAL.subtitleTracking,
                color: MODAL.text,
                textAlign: 'center',
                width: '100%',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* ── Button Session ── */}
      {/* layout-vertical=yes: HORIZONTAL (side by side) → Button Tertiary + Primary */}
      {/* layout-vertical=no:  VERTICAL (stacked)       → Button Primary + Outline */}
      {/* ⚡ ใช้ <Button> component จริงจาก Components/Button */}
      <div
        className="ltp-modal__buttons"
        style={{
          display: 'flex',
          flexDirection: layoutVertical ? 'row' : 'column',
          gap: MODAL.buttonGap,
          width: '100%',
        }}
      >
        {/* Secondary/Cancel Button — Figma instance: button (Tertiary or Outline) */}
        {show2Buttons && (
          <div style={{ flex: layoutVertical ? 1 : undefined, order: layoutVertical ? 0 : 1 }}>
            <Button
              variant={layoutVertical ? 'outline' : 'ghost'}
              size="lg"
              fullWidth
              onClick={onSecondaryClick}
            >
              {secondaryText}
            </Button>
          </div>
        )}

        {/* Primary/Confirm Button — Figma instance: button (Primary) */}
        <div style={{ flex: layoutVertical ? 1 : undefined, order: layoutVertical ? 1 : 0 }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onPrimaryClick}
          >
            {primaryText}
          </Button>
        </div>
      </div>
    </div>
  );

  // With overlay
  if (showOverlay) {
    return (
      <div
        className="ltp-modal-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: MODAL.scrim,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: SCRIM_Z_INDEX,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onOverlayClick?.();
        }}
      >
        {modalContent}
      </div>
    );
  }

  return modalContent;
};

export default Modal;
