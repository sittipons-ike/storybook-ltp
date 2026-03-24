import React, { useRef, useCallback } from 'react';
import {
  SPACING,
  NUMBER_BOX,
  TYPOGRAPHY,
  LOTTO_BOARD_COLORS,
  SHADOW,
  type NumberSearchBoxVariant,
} from './tokens';
import './LottoBoard.css';

export interface NumberSearchBoxProps {
  /** 6-character digit string, e.g. "123456" or "12" (partial) */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Figma variant — controls which boxes appear selected (visual only if no value) */
  variant?: NumberSearchBoxVariant;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * NumberSearchBox — Lotteryplus Design System
 *
 * Figma component: number-search-box-2
 * 6 digit input boxes in a row. Typing fills left-to-right, backspace removes.
 * Each box: 53x64px, padding 8, radius 8, border 1px, shadow sm
 * Variants: Empty, 6, Front 3, Back 3, Back 2, 1
 */
const NumberSearchBox: React.FC<NumberSearchBoxProps> = ({
  value = '',
  onChange,
  variant = 'Empty',
  disabled = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(6, '').slice(0, 6).split('');

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        const newDigits = [...digits];
        if (newDigits[index] && newDigits[index] !== ' ') {
          newDigits[index] = '';
        } else if (index > 0) {
          newDigits[index - 1] = '';
          inputRefs.current[index - 1]?.focus();
        }
        const newValue = newDigits.join('').replace(/ /g, '');
        onChange?.(newValue);
      } else if (/^\d$/.test(e.key)) {
        e.preventDefault();
        const newDigits = [...digits];
        newDigits[index] = e.key;
        const newValue = newDigits.join('').replace(/ /g, '');
        onChange?.(newValue);
        if (index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < 5) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }
    },
    [digits, disabled, onChange],
  );

  const handleClick = useCallback(
    (index: number) => {
      if (disabled) return;
      // Find first empty box and focus it, or focus clicked box
      const firstEmpty = digits.findIndex((d) => !d || d === ' ');
      const targetIndex = firstEmpty >= 0 ? Math.min(index, firstEmpty) : index;
      inputRefs.current[targetIndex]?.focus();
    },
    [digits, disabled],
  );

  return (
    <div
      className="ltp-number-search-box"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: NUMBER_BOX.gap,
        paddingLeft: NUMBER_BOX.wrapperPaddingLR,
        paddingRight: NUMBER_BOX.wrapperPaddingLR,
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const hasDigit = digits[i] && digits[i] !== ' ';
        const isSelected = hasDigit;

        return (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: NUMBER_BOX.width,
              height: NUMBER_BOX.height,
              padding: NUMBER_BOX.padding,
              borderRadius: NUMBER_BOX.borderRadius,
              border: `${NUMBER_BOX.borderWidth}px solid ${
                isSelected ? LOTTO_BOARD_COLORS.fgRed : LOTTO_BOARD_COLORS.border
              }`,
              backgroundColor: LOTTO_BOARD_COLORS.bgWhite,
              boxShadow: NUMBER_BOX.shadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.5 : 1,
            }}
          >
            <input
              ref={(el) => { inputRefs.current[i] = el; }}
              className="ltp-number-box-input"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={hasDigit ? digits[i] : ''}
              readOnly
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={disabled}
              aria-label={`Digit ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.numberBox.fontSize,
                fontWeight: TYPOGRAPHY.numberBox.fontWeight,
                lineHeight: TYPOGRAPHY.numberBox.lineHeight,
                color: LOTTO_BOARD_COLORS.fgDark,
                textAlign: 'center',
                padding: 0,
                margin: 0,
                cursor: disabled ? 'default' : 'pointer',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NumberSearchBox;
