import React from 'react';
import Icon, { type IconSize } from '../../icons/Icon';
import '../../foundations/tokens.css';
import {
  SET_SELECT,
  LOTTO_BOARD_COLORS,
  OPACITY,
  ICON_SIZE,
  lottoBoardText,
  type SetSelectState,
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
  /** Canonical state — Figma still labels these Default / Active / Actived */
  state?: SetSelectState;
  /** Canonical state: disabled */
  disabled?: boolean;
}

/**
 * SetSelect — Lotteryplus Design System
 *
 * Figma component: set-select
 * Label + lottery thumbnail + stepper (minus / quantity / plus).
 * The minus button is white with a hairline border, the plus button is dark.
 *
 * Every style value is a CSS custom property from foundations/tokens.css.
 */
const SetSelect: React.FC<SetSelectProps> = ({
  quantity = 1,
  min = 1,
  max = 99,
  onQuantityChange,
  state = 'rest',
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (disabled) return;
    onQuantityChange?.(Math.max(min, quantity - 1));
  };

  const handleIncrement = () => {
    if (disabled) return;
    onQuantityChange?.(Math.min(max, quantity + 1));
  };

  const atMin = quantity <= min;
  const atMax = quantity >= max;
  const displayText = `ชุด ${quantity}-${Math.min(quantity * 5, 99)} ใบ`;

  return (
    <div
      className="ltp-set-select"
      data-state={state}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SET_SELECT.gap,
        paddingLeft: SET_SELECT.paddingX,
        paddingRight: SET_SELECT.paddingX,
        opacity: disabled ? OPACITY.disabled : undefined,
      }}
    >
      {/* Label */}
      <span
        style={{
          ...lottoBoardText('title'),
          color: LOTTO_BOARD_COLORS.foregroundDark,
        }}
      >
        เลือกจำนวนชุดที่ต้องการ
      </span>

      {/* Inner row: thumbnail + stepper */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: SET_SELECT.rowGap,
        }}
      >
        {/* Lottery card thumbnail placeholder */}
        <div
          style={{
            width: SET_SELECT.imageWidth,
            height: SET_SELECT.imageHeight,
            borderRadius: SET_SELECT.imageRadius,
            backgroundColor: LOTTO_BOARD_COLORS.backgroundGray,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              ...lottoBoardText('caption'),
              color: LOTTO_BOARD_COLORS.foregroundWhite,
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
          {/* Minus */}
          <button
            className="ltp-stepper-btn"
            onClick={handleDecrement}
            disabled={disabled || atMin}
            aria-label="Decrease quantity"
            style={{
              width: SET_SELECT.stepperSize,
              height: SET_SELECT.stepperSize,
              padding: SET_SELECT.stepperPadding,
              backgroundColor: LOTTO_BOARD_COLORS.backgroundWhite,
              border: `${SET_SELECT.stepperBorderWidth} solid ${LOTTO_BOARD_COLORS.border}`,
              borderRadius: SET_SELECT.stepperRadius,
              cursor: disabled || atMin ? 'default' : 'pointer',
              opacity: atMin ? OPACITY.limitReached : undefined,
            }}
          >
            <Icon
              name="filled-minus"
              size={ICON_SIZE as IconSize}
              customColor={LOTTO_BOARD_COLORS.foregroundDark}
            />
          </button>

          {/* Quantity display */}
          <div
            style={{
              ...lottoBoardText('menu'),
              paddingLeft: SET_SELECT.quantityPaddingX,
              paddingRight: SET_SELECT.quantityPaddingX,
              color: LOTTO_BOARD_COLORS.foregroundDark,
              whiteSpace: 'nowrap',
              minWidth: SET_SELECT.quantityMinWidth,
              textAlign: 'center',
            }}
          >
            {displayText}
          </div>

          {/* Plus */}
          <button
            className="ltp-stepper-btn"
            onClick={handleIncrement}
            disabled={disabled || atMax}
            aria-label="Increase quantity"
            style={{
              width: SET_SELECT.stepperSize,
              height: SET_SELECT.stepperSize,
              padding: SET_SELECT.stepperPadding,
              backgroundColor: LOTTO_BOARD_COLORS.backgroundDark,
              border: `${SET_SELECT.stepperBorderWidth} solid transparent`,
              borderRadius: SET_SELECT.stepperRadius,
              cursor: disabled || atMax ? 'default' : 'pointer',
              opacity: atMax ? OPACITY.limitReached : undefined,
            }}
          >
            <Icon
              name="filled-add"
              size={ICON_SIZE as IconSize}
              customColor={LOTTO_BOARD_COLORS.backgroundWhite}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetSelect;
