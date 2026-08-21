import React, { useRef, useCallback } from 'react';
import '../../foundations/tokens.css';
import {
  NUMBER_BOX,
  LOTTO_BOARD_COLORS,
  OPACITY,
  lottoBoardText,
  NUMBER_BOX_VARIANT_MAP,
  type NumberSearchBoxVariant,
} from './tokens';
import './LottoBoard.css';

export interface NumberSearchBoxProps {
  /** 6-character digit string, e.g. "123456" or "12" (partial) */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Figma variant — controls which cells appear selected when there is no value */
  variant?: NumberSearchBoxVariant;
  /** Canonical state: disabled */
  disabled?: boolean;
}

/**
 * NumberSearchBox — Lotteryplus Design System
 *
 * Figma component: number-search-box-2
 * Six digit cells in a row. Typing fills left-to-right, backspace removes.
 * Variants: Empty · 6 · Front 3 · Back 3 · Back 2 · 1
 *
 * Every style value is a CSS custom property from foundations/tokens.css. This is the
 * one place the design system deliberately breaks "one primary action per screen" —
 * every cell is an independent action — so the cells sit on their own `cell-*` gap
 * rather than the card's spacing.
 */
const NumberSearchBox: React.FC<NumberSearchBoxProps> = ({
  value = '',
  onChange,
  variant = 'Empty',
  disabled = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(6, '').slice(0, 6).split('');
  const variantSelection = NUMBER_BOX_VARIANT_MAP[variant];

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
      // Find first empty cell and focus it, or focus the clicked cell
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
        paddingLeft: NUMBER_BOX.rowPaddingX,
        paddingRight: NUMBER_BOX.rowPaddingX,
        opacity: disabled ? OPACITY.disabled : undefined,
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const hasDigit = Boolean(digits[i] && digits[i] !== ' ');
        // A typed digit always selects; with no value the Figma variant drives the look.
        const isSelected = hasDigit || (!value && variantSelection[i]);

        return (
          <div
            key={i}
            className="ltp-number-box"
            onClick={() => handleClick(i)}
            style={{
              width: NUMBER_BOX.width,
              height: NUMBER_BOX.height,
              padding: NUMBER_BOX.padding,
              borderRadius: NUMBER_BOX.radius,
              border: `${NUMBER_BOX.borderWidth} solid ${
                isSelected ? LOTTO_BOARD_COLORS.foregroundRed : LOTTO_BOARD_COLORS.border
              }`,
              backgroundColor: LOTTO_BOARD_COLORS.backgroundWhite,
              boxShadow: NUMBER_BOX.shadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: disabled ? 'default' : 'pointer',
            }}
          >
            <input
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
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
                ...lottoBoardText('number'),
                width: '100%',
                height: '100%',
                color: LOTTO_BOARD_COLORS.foregroundDark,
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
