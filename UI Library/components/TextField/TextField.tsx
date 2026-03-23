import React, { useState, useRef, useCallback } from 'react';
import {
  TEXTFIELD_COLORS,
  TEXTFIELD_DIMENSIONS,
  TEXTFIELD_STATE_MAP,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
} from './tokens';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import './TextField.css';

// ═══════════════════════════════════════════
//  TextField — Lotteryplus Design System
//  Figma: "text-field" component set (14291:131807)
//  States: Default | Hover | Active | Actived | Read Only | Complete | Error-Default | Error
//  Structure: Label → Field → Description (error)
// ═══════════════════════════════════════════

export type TextFieldState =
  | 'default'
  | 'hover'
  | 'active'
  | 'actived'
  | 'readOnly'
  | 'complete'
  | 'errorDefault'
  | 'error';

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
  /** Show error description */
  showDescription?: boolean;
  /** Description / error message text */
  description?: string;
  /** Visual state override (for Storybook demos) */
  state?: TextFieldState;
  /** Read only mode */
  readOnly?: boolean;
  /** Complete state */
  complete?: boolean;
  /** Error message — triggers error state and shows description */
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
  readOnly = false,
  complete = false,
  error,
  showClearIcon = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine the effective state
  const getEffectiveState = useCallback((): TextFieldState => {
    if (stateProp) return stateProp;
    if (readOnly) return 'readOnly';
    if (error && value) return 'error';
    if (error) return 'errorDefault';
    if (complete) return 'complete';
    if (isFocused) return 'active';
    if (value && !isFocused) return 'actived';
    if (isHovered) return 'hover';
    return 'default';
  }, [stateProp, readOnly, error, complete, isFocused, value, isHovered]);

  const effectiveState = getEffectiveState();
  const stateConfig = TEXTFIELD_STATE_MAP[effectiveState];

  const showPlaceholder = !value;

  // Whether to show description (error message area)
  const isDescriptionVisible = showDescription !== undefined
    ? showDescription
    : stateConfig.descVisible;

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  // Handle clear
  const handleClear = () => {
    onChange?.('');
    inputRef.current?.focus();
  };

  // Description text to display
  const descriptionText = error || description;

  // Whether to show the clear button
  const isClearVisible = showClearIcon && !!value && !readOnly && effectiveState !== 'readOnly';

  return (
    <div
      className={`ltp-textfield ${className}`}
      style={{
        // Auto Layout: VERTICAL, gap: spacing-sm = 4px
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.sm, // 4px
      }}
    >
      {/* ── Label Row ── */}
      {/* Figma: HORIZONTAL, paddingLeft:4 = spacing-sm, gap:4 = spacing-sm */}
      {showLabel && label && (
        <div
          className="ltp-textfield__label"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: TEXTFIELD_DIMENSIONS.wrapper.labelPaddingLeft, // spacing-sm = 4px
            gap: TEXTFIELD_DIMENSIONS.wrapper.labelInternalGap,         // spacing-sm = 4px
          }}
        >
          {/* Label text: title/m-med → 14px/22px Medium, #262626 */}
          <span
            style={{
              fontFamily: TYPOGRAPHY.label.fontFamily,
              fontSize: TYPOGRAPHY.label.fontSize,
              fontWeight: TYPOGRAPHY.label.fontWeight,
              lineHeight: TYPOGRAPHY.label.lineHeight,
              color: TEXTFIELD_COLORS.label.text,
            }}
          >
            {label}
          </span>

          {/* Required marker: label/m-med → 12px/18px Medium, #E32321 */}
          {required && (
            <span
              style={{
                fontFamily: TYPOGRAPHY.required.fontFamily,
                fontSize: TYPOGRAPHY.required.fontSize,
                fontWeight: TYPOGRAPHY.required.fontWeight,
                lineHeight: TYPOGRAPHY.required.lineHeight,
                color: TEXTFIELD_COLORS.label.required,
              }}
            >
              (จำเป็น)
            </span>
          )}
        </div>
      )}

      {/* ── Field ── */}
      {/* Figma: HORIZONTAL, padding: 10/16/10/16, gap:8, radius:8 */}
      <div
        className="ltp-textfield__field"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',

          // Padding: spacing-2lg(10) / spacing-2xl(16) / spacing-2lg(10) / spacing-2xl(16)
          paddingTop: TEXTFIELD_DIMENSIONS.field.paddingTop,       // 10px
          paddingRight: TEXTFIELD_DIMENSIONS.field.paddingRight,   // 16px
          paddingBottom: TEXTFIELD_DIMENSIONS.field.paddingBottom,  // 10px
          paddingLeft: TEXTFIELD_DIMENSIONS.field.paddingLeft,     // 16px

          gap: TEXTFIELD_DIMENSIONS.field.gap, // spacing-lg = 8px

          // Corner radius: radius-lg = 8px
          borderRadius: RADIUS.lg,

          // Background
          backgroundColor: stateConfig.bg,

          // Border: varies by state
          border: `${stateConfig.borderWidth}px solid ${stateConfig.border}`,

          // Cursor
          cursor: readOnly || effectiveState === 'readOnly' ? 'default' : 'text',

          // Transition
          transition: 'border-color 0.15s ease, background-color 0.15s ease',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          className={`ltp-textfield__input ${
            readOnly || effectiveState === 'readOnly' ? 'ltp-textfield__input--readonly' : ''
          }`}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={readOnly || effectiveState === 'readOnly'}
          style={{
            fontFamily: showPlaceholder
              ? TYPOGRAPHY.placeholder.fontFamily
              : TYPOGRAPHY.inputText.fontFamily,
            fontSize: showPlaceholder
              ? TYPOGRAPHY.placeholder.fontSize
              : TYPOGRAPHY.inputText.fontSize,
            fontWeight: showPlaceholder
              ? TYPOGRAPHY.placeholder.fontWeight
              : TYPOGRAPHY.inputText.fontWeight,
            lineHeight: showPlaceholder
              ? TYPOGRAPHY.placeholder.lineHeight
              : TYPOGRAPHY.inputText.lineHeight,
            color: stateConfig.textColor,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          aria-label={label}
          aria-required={required}
          aria-invalid={effectiveState === 'error' || effectiveState === 'errorDefault'}
        />

        {/* Clear icon: filled-close, 16px — visible when showClearIcon && value exists */}
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
              size={TEXTFIELD_DIMENSIONS.clearIconSize}
              customColor={TEXTFIELD_COLORS.fg.dark}
            />
          </button>
        )}
      </div>

      {/* ── Description (Error message) ── */}
      {/* Figma: visible in Error states only, paddingLeft:4 */}
      {/* caption/m-reg → 10px/16px Regular, color #E32321 */}
      {isDescriptionVisible && descriptionText && (
        <div
          className="ltp-textfield__description"
          style={{
            display: 'flex',
            paddingLeft: TEXTFIELD_DIMENSIONS.wrapper.descriptionPaddingLeft, // spacing-sm = 4px
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.error.fontFamily,
              fontSize: TYPOGRAPHY.error.fontSize,
              fontWeight: TYPOGRAPHY.error.fontWeight,
              lineHeight: TYPOGRAPHY.error.lineHeight,
              color: TEXTFIELD_COLORS.fg.red,
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
