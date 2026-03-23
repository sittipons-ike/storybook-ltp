import React from 'react';
import {
  RADIO_COLORS,
  RADIO_DIMENSIONS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
} from './tokens';
import './RadioButton.css';

// ═══════════════════════════════════════════
//  RadioDot — The individual radio circle
//  Figma: "radio-buttons" component set (14457:1351)
//  Variants: type(none/selected) × status(default/focused/disabled)
//  Size: 20×20px, Circle (radius-full=9999)
//  Check dot: 12×12px centered, circle
// ═══════════════════════════════════════════

export interface RadioDotProps {
  selected?: boolean;
  disabled?: boolean;
  focused?: boolean;
}

export const RadioDot: React.FC<RadioDotProps> = ({
  selected = false,
  disabled = false,
  focused = false,
}) => {
  const size = RADIO_DIMENSIONS.radioSize; // 20px
  const dotSize = RADIO_DIMENSIONS.checkDotSize; // 12px

  const bgColor = disabled
    ? RADIO_COLORS.radio.bg.disabled        // #F5F5F5
    : RADIO_COLORS.radio.bg.default;        // #FFFFFF

  const borderColor = disabled
    ? RADIO_COLORS.radio.border.disabled     // #D4D4D4
    : selected
    ? RADIO_COLORS.radio.border.selected     // #22C55E
    : RADIO_COLORS.radio.border.default;     // #D4D4D4

  const checkColor = disabled
    ? RADIO_COLORS.radio.check.disabled      // #C9C9C9
    : RADIO_COLORS.radio.check.default;      // #22C55E

  return (
    <div
      className="ltp-radio-dot"
      style={{
        width: size,
        height: size,
        borderRadius: RADIUS.full,           // radius-full = 9999
        backgroundColor: bgColor,
        border: `${BORDER_WIDTH[1]}px solid ${borderColor}`, // border-width/1 = 1px
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        flexShrink: 0,
        // Focused ring from Figma: eff-bg-green
        boxShadow: focused && !disabled
          ? `0 0 0 3px ${RADIO_COLORS.radio.focusRing}` // #22C55E66
          : 'none',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      {selected && (
        <div
          className="ltp-radio-dot__check"
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: RADIUS.full,       // radius-full = 9999
            backgroundColor: checkColor,
          }}
        />
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
//  RadioOption — Single option card
//  Figma: "Check Box Condition" frame
//  Auto Layout: VERTICAL, padding:16, itemSpacing:8
//  Inner frame: HORIZONTAL, itemSpacing:8, SPACE_BETWEEN
//  Corner radius: 8 (radius-lg)
//  Stroke: 1px (border-width/1)
// ═══════════════════════════════════════════

export interface RadioOptionProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  selected = false,
  disabled = false,
  onClick,
}) => {
  const [focused, setFocused] = React.useState(false);

  const bgColor = disabled
    ? RADIO_COLORS.card.bg.disabled          // #F5F5F5
    : selected
    ? RADIO_COLORS.card.bg.selected          // #F0FDF4
    : RADIO_COLORS.card.bg.default;          // #FFFFFF

  const borderColor = disabled
    ? RADIO_COLORS.card.border.disabled      // #D4D4D4
    : selected
    ? RADIO_COLORS.card.border.selected      // #22C55E
    : RADIO_COLORS.card.border.default;      // #D4D4D4

  const textColor = disabled
    ? RADIO_COLORS.card.text.disabled        // #C9C9C9
    : selected
    ? RADIO_COLORS.card.text.selected        // #262626
    : RADIO_COLORS.card.text.default;        // #C9C9C9

  return (
    <button
      type="button"
      className={`ltp-radio-option ${selected ? 'ltp-radio-option--selected' : ''} ${
        disabled ? 'ltp-radio-option--disabled' : ''
      }`}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        // Auto Layout: VERTICAL, CENTER/CENTER
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        // Dimensions
        height: RADIO_DIMENSIONS.card.height,  // 44px
        flex: 1,

        // Padding: spacing-2xl = 16px (all sides)
        padding: RADIO_DIMENSIONS.card.padding,

        // Corner radius: radius-lg = 8px
        borderRadius: RADIUS.lg,

        // Border: border-width/1 = 1px
        border: `${BORDER_WIDTH[1]}px solid ${borderColor}`,

        // Background
        backgroundColor: bgColor,

        // Cursor
        cursor: disabled ? 'not-allowed' : 'pointer',

        // Reset button styles
        outline: 'none',
        textDecoration: 'none',

        transition: 'background-color 0.15s ease, border-color 0.15s ease',
      }}
    >
      {/* Inner frame: HORIZONTAL, SPACE_BETWEEN, itemSpacing: spacing-lg = 8px */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: RADIO_DIMENSIONS.card.innerGap, // spacing-lg = 8px
        }}
      >
        {/* Option text — Typography: 14px Semibold (button/m-semb) */}
        <span
          style={{
            fontFamily: TYPOGRAPHY.optionText.fontFamily,
            fontSize: TYPOGRAPHY.optionText.fontSize,
            fontWeight: TYPOGRAPHY.optionText.fontWeight,
            lineHeight: TYPOGRAPHY.optionText.lineHeight,
            color: textColor,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>

        {/* Radio dot instance */}
        <RadioDot selected={selected} disabled={disabled} focused={focused} />
      </div>
    </button>
  );
};

// ═══════════════════════════════════════════
//  RadioButtonGroup — Full radio button group with label
//  Figma: "Gender select" component set (14291:132236)
//  Auto Layout: VERTICAL, itemSpacing: 4 (spacing-sm)
//  Structure: Label → Options Row → Description (hidden)
// ═══════════════════════════════════════════

export interface RadioButtonOption {
  value: string;
  label: string;
}

export interface RadioButtonGroupProps {
  /** Group label text */
  label?: string;
  /** Show required indicator "(จำเป็น)" */
  required?: boolean;
  /** Show optional indicator "(ไม่จำเป็น)" */
  optional?: boolean;
  /** Options to display */
  options: RadioButtonOption[];
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  required = false,
  optional = false,
  options,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
}) => {
  return (
    <div
      className={`ltp-radio-group ${className}`}
      role="radiogroup"
      aria-label={label}
      style={{
        // Auto Layout: VERTICAL, itemSpacing: spacing-sm = 4px
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.sm, // 4px — wrapper.labelToOptions
      }}
    >
      {/* ── Label Row ── */}
      {/* Figma: "Label" frame — HORIZONTAL, paddingLeft:4, itemSpacing:4 */}
      {label && (
        <div
          className="ltp-radio-group__label"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: SPACING.sm, // spacing-sm = 4px
            gap: SPACING.sm,        // spacing-sm = 4px
          }}
        >
          {/* Label text: 14px/22px Medium, #262626 */}
          <span
            style={{
              fontFamily: TYPOGRAPHY.label.fontFamily,
              fontSize: TYPOGRAPHY.label.fontSize,
              fontWeight: TYPOGRAPHY.label.fontWeight,
              lineHeight: TYPOGRAPHY.label.lineHeight,
              color: RADIO_COLORS.label.text,
            }}
          >
            {label}
          </span>

          {/* Optional indicator: 12px/22px Medium, #A3A3A3 */}
          {optional && !required && (
            <span
              style={{
                fontFamily: TYPOGRAPHY.optional.fontFamily,
                fontSize: TYPOGRAPHY.optional.fontSize,
                fontWeight: TYPOGRAPHY.optional.fontWeight,
                lineHeight: TYPOGRAPHY.optional.lineHeight,
                color: RADIO_COLORS.label.optional,
              }}
            >
              (ไม่จำเป็น)
            </span>
          )}

          {/* Required indicator: 12px/18px Medium, #E32321 */}
          {required && (
            <span
              style={{
                fontFamily: TYPOGRAPHY.required.fontFamily,
                fontSize: TYPOGRAPHY.required.fontSize,
                fontWeight: TYPOGRAPHY.required.fontWeight,
                lineHeight: TYPOGRAPHY.required.lineHeight,
                color: RADIO_COLORS.label.required,
              }}
            >
              (จำเป็น)
            </span>
          )}
        </div>
      )}

      {/* ── Options Row ── */}
      {/* Figma: "Frame 1000012457" — HORIZONTAL, itemSpacing: spacing-2xl = 16px */}
      <div
        className="ltp-radio-group__options"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: RADIO_DIMENSIONS.optionsGap, // spacing-2xl = 16px
        }}
      >
        {options.map((option) => (
          <RadioOption
            key={option.value}
            label={option.label}
            selected={value === option.value}
            disabled={disabled}
            onClick={() => onChange?.(option.value)}
          />
        ))}
      </div>

      {/* ── Error Description ── */}
      {/* Figma: "Description" frame — HORIZONTAL, paddingLeft:4 (hidden by default) */}
      {error && (
        <div
          className="ltp-radio-group__error"
          style={{
            display: 'flex',
            paddingLeft: SPACING.sm, // spacing-sm = 4px
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.error.fontFamily,
              fontSize: TYPOGRAPHY.error.fontSize,
              fontWeight: TYPOGRAPHY.error.fontWeight,
              lineHeight: TYPOGRAPHY.error.lineHeight,
              color: RADIO_COLORS.error,
            }}
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default RadioButtonGroup;
