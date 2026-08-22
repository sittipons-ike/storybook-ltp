import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import '../../foundations/tokens.css';
import {
  textFieldColors,
  textFieldTypography,
  TEXT_FIELD_BASE,
  TEXT_FIELD_TEXT,
  TEXT_FIELD_CLEAR_ICON_SIZE,
  type TextFieldState,
} from './tokens';
import './TextField.css';

// ═══════════════════════════════════════════
//  TextField — Lotteryplus Design System
//  Figma: "text-field" component set (14291:131807)
//  Structure: Label → Field → Description (error)
//
//  Every style value is a CSS custom property from foundations/tokens.css, which is
//  generated from Figma via design.md + components.json + components/text-field.json.
//  There are no literal colours, sizes, or font values in this file — changing one
//  means changing Figma and regenerating, which is what keeps design and code from
//  drifting apart.
// ═══════════════════════════════════════════

export type { TextFieldState };

export interface TextFieldProps {
  /** Label text (Figma default: "Field Name") */
  label?: string;
  /** Show label */
  showLabel?: boolean;
  /** Placeholder text (Figma default: "Place Holder") */
  placeholder?: string;
  /** Show required marker "(จำเป็น)" */
  required?: boolean;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Show the description row */
  showDescription?: boolean;
  /** Description / error message text */
  description?: string;
  /** Visual state override (for Storybook demos) */
  state?: TextFieldState;
  /** Canonical state `disabled` — Figma calls it "Read Only" */
  disabled?: boolean;
  /** Canonical state `complete` — the success affirmation, green stroke */
  complete?: boolean;
  /** Error message — triggers the `error` state and shows the description */
  error?: string;
  /** Show clear icon (filled-close) when there is a value */
  showClearIcon?: boolean;
  /** Additional className */
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label = 'Field Name',
  showLabel = true,
  placeholder = 'Place Holder',
  required = false,
  value = '',
  onChange,
  showDescription,
  description = 'Error Message',
  state: stateProp,
  disabled = false,
  complete = false,
  error,
  showClearIcon = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Canonical state precedence: disabled beats error beats complete beats focus beats hover.
  const getEffectiveState = useCallback((): TextFieldState => {
    if (stateProp) return stateProp;
    if (disabled) return 'disabled';
    if (error) return 'error';
    if (complete) return 'complete';
    if (isFocused) return 'focus';
    if (isHovered) return 'hover';
    return 'rest';
  }, [stateProp, disabled, error, complete, isFocused, isHovered]);

  const effectiveState = getEffectiveState();
  const isDisabled = disabled || effectiveState === 'disabled';
  const colors = textFieldColors(effectiveState);
  const labelType = textFieldTypography('label');
  const requiredType = textFieldTypography('required');
  const inputType = textFieldTypography('input');
  const descriptionType = textFieldTypography('description');

  const showPlaceholder = !value;

  // The description row belongs to the error state, unless the caller overrides it.
  const isDescriptionVisible =
    showDescription !== undefined ? showDescription : effectiveState === 'error';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.('');
    inputRef.current?.focus();
  };

  const descriptionText = error || description;
  const isClearVisible = showClearIcon && !!value && !isDisabled;

  return (
    <div
      className={`ltp-textfield ${className}`}
      style={{
        // Auto Layout: VERTICAL
        display: 'flex',
        flexDirection: 'column',
        gap: TEXT_FIELD_BASE.stackGap,
      }}
    >
      {/* ── Label Row ── Figma: HORIZONTAL, paddingLeft + gap */}
      {showLabel && label && (
        <div
          className="ltp-textfield__label"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: TEXT_FIELD_BASE.labelPaddingX,
            gap: TEXT_FIELD_BASE.labelGap,
          }}
        >
          {/* Label text — typography/title/md/medium */}
          <span
            style={{
              fontFamily: labelType.fontFamily,
              fontSize: labelType.fontSize,
              fontWeight: labelType.fontWeight as unknown as React.CSSProperties['fontWeight'],
              lineHeight: labelType.lineHeight,
              letterSpacing: labelType.letterSpacing,
              color: TEXT_FIELD_TEXT.label,
            }}
          >
            {label}
          </span>

          {/* Required marker — typography/label/md/medium */}
          {required && (
            <span
              style={{
                fontFamily: requiredType.fontFamily,
                fontSize: requiredType.fontSize,
                fontWeight:
                  requiredType.fontWeight as unknown as React.CSSProperties['fontWeight'],
                lineHeight: requiredType.lineHeight,
                letterSpacing: requiredType.letterSpacing,
                color: TEXT_FIELD_TEXT.required,
              }}
            >
              (จำเป็น)
            </span>
          )}
        </div>
      )}

      {/* ── Field ── Figma: HORIZONTAL, padding y/x, gap, radius */}
      <div
        className="ltp-textfield__field"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',

          paddingTop: TEXT_FIELD_BASE.paddingY,
          paddingRight: TEXT_FIELD_BASE.paddingX,
          paddingBottom: TEXT_FIELD_BASE.paddingY,
          paddingLeft: TEXT_FIELD_BASE.paddingX,

          gap: TEXT_FIELD_BASE.gap,

          borderRadius: TEXT_FIELD_BASE.radius,
          backgroundColor: colors.background,
          border: `${colors.borderWidth} solid ${colors.border}`,

          // Focus ring — Figma `text-field-bd-bg-active`, the brand red at 40%.
          boxShadow: colors.ring
            ? `0 0 0 ${TEXT_FIELD_BASE.borderWidthFocus} ${colors.ring}`
            : undefined,

          cursor: isDisabled ? 'default' : 'text',
          transition: 'border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Text input — typography/body/md/regular for both placeholder and value */}
        <input
          ref={inputRef}
          type="text"
          className={`ltp-textfield__input ${
            isDisabled ? 'ltp-textfield__input--disabled' : ''
          }`}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={isDisabled}
          aria-disabled={isDisabled}
          style={{
            fontFamily: inputType.fontFamily,
            fontSize: inputType.fontSize,
            fontWeight: inputType.fontWeight as unknown as React.CSSProperties['fontWeight'],
            lineHeight: inputType.lineHeight,
            letterSpacing: inputType.letterSpacing,
            color: showPlaceholder ? colors.placeholder : colors.foreground,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          aria-label={label}
          aria-required={required}
          aria-invalid={effectiveState === 'error'}
        />

        {/* Clear icon — filled-close, `--text-field-clear-icon-size` */}
        {isClearVisible && (
          <button
            type="button"
            className="ltp-textfield__clear-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            aria-label="Clear input"
          >
            <Icon
              name="filled-close"
              size={TEXT_FIELD_CLEAR_ICON_SIZE as never}
              customColor={colors.foreground}
            />
          </button>
        )}
      </div>

      {/* ── Description ── Figma: visible in the error state, typography/caption/md/regular */}
      {isDescriptionVisible && descriptionText && (
        <div
          className="ltp-textfield__description"
          style={{
            display: 'flex',
            paddingLeft: TEXT_FIELD_BASE.descriptionPaddingX,
          }}
        >
          <span
            style={{
              fontFamily: descriptionType.fontFamily,
              fontSize: descriptionType.fontSize,
              fontWeight:
                descriptionType.fontWeight as unknown as React.CSSProperties['fontWeight'],
              lineHeight: descriptionType.lineHeight,
              letterSpacing: descriptionType.letterSpacing,
              color: TEXT_FIELD_TEXT.description,
            }}
          >
            {descriptionText}
          </span>
        </div>
      )}
    </div>
  );
};

export default TextField;
