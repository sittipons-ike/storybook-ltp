import React from 'react';
import Icon from '../../icons/Icon';
import {
  SET_SELECT,
  TYPOGRAPHY,
  LOTTO_BOARD_COLORS,
  RADIUS,
  BORDER_WIDTH,
  type SetSelectStatus,
} from './tokens';
import './LottoBoard.css';

export interface SetSelectProps {
  /** Current quantity of sets */
  quantity?: number;
  /** Min quantity (default 1) */
  min?: number;
  /** Max quantity (default 99) */
  max?: number;
  /** Callback when quantity changes */
  onQuantityChange?: (qty: number) => void;
  /** Figma variant: Status = Default | Active | Actived */
  status?: SetSelectStatus;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * SetSelect — Lotteryplus Design System
 *
 * Figma component: set-select
 * Label + lottery image + stepper (minus/number/plus)
 * Stepper buttons: 48x48, minus=white bg + border, plus=dark bg
 * Layout: VERTICAL gap 4, paddingLR 16
 * Inner row: HORIZONTAL gap 16
 */
const SetSelect: React.FC<SetSelectProps> = ({
  quantity = 1,
  min = 1,
  max = 99,
  onQuantityChange,
  status = 'Default',
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (disabled) return;
    const next = Math.max(min, quantity - 1);
    onQuantityChange?.(next);
  };

  const handleIncrement = () => {
    if (disabled) return;
    const next = Math.min(max, quantity + 1);
    onQuantityChange?.(next);
  };

  const ticketsPerSet = quantity;
  const displayText = `ชุด ${ticketsPerSet}-${ticketsPerSet * 5 > 99 ? 99 : ticketsPerSet * 5} ใบ`;

  return (
    <div
      className="ltp-set-select"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SET_SELECT.gap,
        paddingLeft: SET_SELECT.paddingLR,
        paddingRight: SET_SELECT.paddingLR,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.title.fontSize,
          fontWeight: TYPOGRAPHY.title.fontWeight,
          lineHeight: TYPOGRAPHY.title.lineHeight,
          color: LOTTO_BOARD_COLORS.fgDark,
        }}
      >
        เลือกจำนวนชุดที่ต้องการ
      </span>

      {/* Inner row: image + stepper */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: SET_SELECT.innerGap,
        }}
      >
        {/* Lottery card image placeholder */}
        <div
          style={{
            width: SET_SELECT.imageWidth,
            height: SET_SELECT.imageHeight,
            borderRadius: RADIUS.lg,
            backgroundColor: LOTTO_BOARD_COLORS.bgGray,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.caption.fontSize,
              color: LOTTO_BOARD_COLORS.bgWhite,
              fontWeight: TYPOGRAPHY.caption.fontWeight,
            }}
          >
            LOTTO
          </span>
        </div>

        {/* Stepper */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: SET_SELECT.stepperRadius,
            overflow: 'hidden',
          }}
        >
          {/* Minus button */}
          <button
            className="ltp-stepper-btn"
            onClick={handleDecrement}
            disabled={disabled || quantity <= min}
            aria-label="Decrease quantity"
            style={{
              width: SET_SELECT.stepperButtonSize,
              height: SET_SELECT.stepperButtonSize,
              padding: SET_SELECT.stepperPadding,
              backgroundColor: LOTTO_BOARD_COLORS.bgWhite,
              border: `${BORDER_WIDTH[1]}px solid ${LOTTO_BOARD_COLORS.border}`,
              borderRadius: SET_SELECT.stepperRadius,
              cursor: disabled || quantity <= min ? 'default' : 'pointer',
              opacity: quantity <= min ? 0.4 : 1,
            }}
          >
            <Icon name="outline-minus" size={24} customColor={LOTTO_BOARD_COLORS.fgDark} />
          </button>

          {/* Quantity display */}
          <div
            style={{
              padding: `0 ${SET_SELECT.innerGap}px`,
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.button.fontSize,
              fontWeight: TYPOGRAPHY.button.fontWeight,
              lineHeight: TYPOGRAPHY.button.lineHeight,
              color: LOTTO_BOARD_COLORS.fgDark,
              whiteSpace: 'nowrap',
              minWidth: 100,
              textAlign: 'center',
            }}
          >
            {displayText}
          </div>

          {/* Plus button */}
          <button
            className="ltp-stepper-btn"
            onClick={handleIncrement}
            disabled={disabled || quantity >= max}
            aria-label="Increase quantity"
            style={{
              width: SET_SELECT.stepperButtonSize,
              height: SET_SELECT.stepperButtonSize,
              padding: SET_SELECT.stepperPadding,
              backgroundColor: LOTTO_BOARD_COLORS.bgDark,
              border: 'none',
              borderRadius: SET_SELECT.stepperRadius,
              cursor: disabled || quantity >= max ? 'default' : 'pointer',
              opacity: quantity >= max ? 0.4 : 1,
            }}
          >
            <Icon name="outline-add" size={24} customColor={LOTTO_BOARD_COLORS.bgWhite} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetSelect;
