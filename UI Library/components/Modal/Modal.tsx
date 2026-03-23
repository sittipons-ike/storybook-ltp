import React from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import Button from '../Button/Button'; // ← ดึง Button component มาใช้จริง
import {
  MODAL_STATES,
  MODAL_COLORS,
  MODAL_DIMENSIONS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  SHADOW,
  type ModalState,
} from './tokens';
import './Modal.css';

// ═══════════════════════════════════════════
//  Modal Component — Lotteryplus Design System
//  Figma: "modal-state" component set (14610:24998)
//  10 variants: state(5) × layout-vertical(2)
//  Properties: show-icon, title, subtitle, show-subtitle, show-2buttons
//
//  All values bound to Foundation variables:
//  - Spacing: dimension/spacing/* (2-semantic)
//  - Radius: dimension/breakpoint/radius/* (2-semantic)
//  - Typography: heading/h4-semb, body/m-reg, button/m-semb
//  - Colors: colors/modal/* (3-component)
//  - Icons: icons-size component (Size=48)
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
  const stateConfig = MODAL_STATES[state];

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

        // Dimensions
        width: MODAL_DIMENSIONS.width,  // 358px

        // Padding: spacing-4xl = 24px (all sides)
        padding: MODAL_DIMENSIONS.padding,

        // Gap: spacing-4xl = 24px (between sections)
        gap: MODAL_DIMENSIONS.sectionGap,

        // Corner Radius: radius-2xl = 16px
        borderRadius: MODAL_DIMENSIONS.cornerRadius,

        // Background
        backgroundColor: MODAL_COLORS.bg, // #FFFFFF → colors/modal/modal-bg-white

        // Shadow: dimension/shadow/md (bound variable: dimension/shadow/md/color-2)
        // DROP_SHADOW 1: offset(0,2) blur(4) spread(-1) rgba(0,0,0,0.06)
        // DROP_SHADOW 2: offset(0,4) blur(6) spread(-1) rgba(0,0,0,0.10)
        boxShadow: SHADOW.md,

        // Box sizing
        boxSizing: 'border-box',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* ── Content Area (Icon + Wording) ── */}
      {/* Figma: "Frame 44290" — VERTICAL, itemSpacing:16, CENTER */}
      <div
        className="ltp-modal__content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: MODAL_DIMENSIONS.wording.iconToWording, // spacing-2xl = 16px
        }}
      >
        {/* ── Icon ── */}
        {/* Figma: "icon" frame — 64×64, padding:8, cornerRadius:48, HORIZONTAL CENTER */}
        {showIcon && (
          <div
            className="ltp-modal__icon"
            style={{
              width: MODAL_DIMENSIONS.icon.containerSize,   // 64px
              height: MODAL_DIMENSIONS.icon.containerSize,  // 64px
              borderRadius: MODAL_DIMENSIONS.icon.borderRadius, // radius-5xl = 48 (circle)
              backgroundColor: stateConfig.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: MODAL_DIMENSIONS.icon.padding,       // spacing-lg = 8px
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            {/* icons-size: Size=48 */}
            <Icon
              name={stateConfig.iconName}
              size={MODAL_DIMENSIONS.icon.iconSize as any}  // 48px
              customColor={stateConfig.iconColor}
            />
          </div>
        )}

        {/* ── Wording ── */}
        {/* Figma: "Wording" — VERTICAL, itemSpacing:8, CENTER */}
        <div
          className="ltp-modal__wording"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: MODAL_DIMENSIONS.wording.titleToSubtitle, // spacing-lg = 8px
          }}
        >
          {/* Title: heading/h4-semb → 16px/24px Semibold, CENTER */}
          <div
            className="ltp-modal__title"
            style={{
              fontFamily: TYPOGRAPHY.title.fontFamily,
              fontSize: TYPOGRAPHY.title.fontSize,
              fontWeight: TYPOGRAPHY.title.fontWeight,
              lineHeight: TYPOGRAPHY.title.lineHeight,
              color: MODAL_COLORS.titleText,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {title}
          </div>

          {/* Subtitle: body/m-reg → 14px/22px Regular, CENTER */}
          {showSubtitle && subtitle && (
            <div
              className="ltp-modal__subtitle"
              style={{
                fontFamily: TYPOGRAPHY.subtitle.fontFamily,
                fontSize: TYPOGRAPHY.subtitle.fontSize,
                fontWeight: TYPOGRAPHY.subtitle.fontWeight,
                lineHeight: TYPOGRAPHY.subtitle.lineHeight,
                color: MODAL_COLORS.subtitleText,
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
      {/* layout-vertical=yes: HORIZONTAL, gap:16 (side by side) → Button Tertiary + Primary */}
      {/* layout-vertical=no: VERTICAL, gap:16 (stacked) → Button Primary + Outline */}
      {/* ⚡ ใช้ <Button> component จริงจาก Components/Button */}
      <div
        className="ltp-modal__buttons"
        style={{
          display: 'flex',
          flexDirection: layoutVertical ? 'row' : 'column',
          gap: layoutVertical
            ? MODAL_DIMENSIONS.buttonsHorizontal.gap   // spacing-2xl = 16px
            : MODAL_DIMENSIONS.buttonsVertical.gap,    // spacing-2xl = 16px
          width: '100%',
        }}
      >
        {/* Secondary/Cancel Button — Figma instance: button (Tertiary or Outline) */}
        {show2Buttons && (
          <div style={{ flex: layoutVertical ? 1 : undefined, order: layoutVertical ? 0 : 1 }}>
            <Button
              type={layoutVertical ? 'tertiary' : 'outline'}
              size="L"
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
            type="primary"
            size="L"
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
          backgroundColor: MODAL_COLORS.overlay, // overlay-default #00000099
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
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
