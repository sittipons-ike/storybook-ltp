import React from 'react';
import '../../foundations/tokens.css';
import {
  RADIO_LAYOUT,
  radioColor,
  radioOptionalColor,
  radioText,
  type RadioInteractionState,
} from './tokens';
import './RadioButton.css';

/** React types `fontWeight` as a number-ish union; a CSS var is a string. */
const weight = (value: string) => value as unknown as React.CSSProperties['fontWeight'];

/** Canonical precedence: disabled beats active beats focus beats hover. */
const resolveState = (
  disabled: boolean,
  active: boolean,
  focused: boolean,
  hovered: boolean,
): RadioInteractionState =>
  disabled ? 'disabled' : active ? 'active' : focused ? 'focus' : hovered ? 'hover' : 'rest';

// ═══════════════════════════════════════════
//  RadioDot — the radio circle itself
//  Figma: "radio-buttons" component set (14457:1351)
//  type(none | selected) x status(default | focused | disabled)
//
//  Every style value below is a CSS custom property from foundations/tokens.css. There
//  are no literal colours, sizes or font values in this file — changing one means
//  changing Figma (or the radio-buttons overlay) and regenerating.
// ═══════════════════════════════════════════

export interface RadioDotProps {
  /** Figma `type=selected`. Orthogonal to `state`. */
  selected?: boolean;
  /** Canonical interaction state. `disabled` also blocks pointer events upstream. */
  state?: RadioInteractionState;
}

export const RadioDot: React.FC<RadioDotProps> = ({ selected = false, state = 'rest' }) => {
  const disabled = state === 'disabled';

  const background = radioColor(disabled ? 'dot-background-disabled' : 'dot-background-rest');

  const border = radioColor(
    disabled ? 'dot-border-disabled' : selected ? 'dot-border-selected' : 'dot-border-rest',
  );

  const check = radioColor(disabled ? 'dot-check-disabled' : 'dot-check-rest');

  // The ripple is Figma's `eff-bg-*` pair: green once selected, grey before.
  const ripple = !disabled && (state === 'focus' || state === 'active');
  const ring = radioColor(selected ? 'dot-ring-selected' : 'dot-ring-rest');

  return (
    <div
      className="ltp-radio-dot"
      style={{
        width: RADIO_LAYOUT.size,
        height: RADIO_LAYOUT.size,
        borderRadius: RADIO_LAYOUT.radius,
        backgroundColor: background,
        border: `${RADIO_LAYOUT.borderWidth} solid ${border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        flexShrink: 0,
        boxShadow: ripple ? `0 0 0 ${RADIO_LAYOUT.ringWidth} ${ring}` : 'none',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      {selected && (
        <div
          className="ltp-radio-dot__check"
          style={{
            width: RADIO_LAYOUT.dotSize,
            height: RADIO_LAYOUT.dotSize,
            borderRadius: RADIO_LAYOUT.radius,
            backgroundColor: check,
          }}
        />
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
//  RadioOption — a single option card
//  Figma: "Check Box Condition" frame
//  Auto Layout: VERTICAL, padding spacing-2xl, inner row SPACE_BETWEEN with gap spacing-lg
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
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const state = resolveState(disabled, active, focused, hovered);

  const background = radioColor(
    disabled
      ? 'card-background-disabled'
      : selected
      ? 'card-background-selected'
      : 'card-background-rest',
  );

  const border = radioColor(
    disabled ? 'card-border-disabled' : selected ? 'card-border-selected' : 'card-border-rest',
  );

  const foreground = radioColor(
    disabled
      ? 'card-foreground-disabled'
      : selected
      ? 'card-foreground-selected'
      : 'card-foreground-rest',
  );

  const optionText = radioText('option');

  return (
    <button
      type="button"
      className={`ltp-radio-option ${selected ? 'ltp-radio-option--selected' : ''} ${
        disabled ? 'ltp-radio-option--disabled' : ''
      }`}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => {
        if (!disabled) {
          setHovered(false);
          setActive(false);
        }
      }}
      onMouseDown={() => !disabled && setActive(true)}
      onMouseUp={() => !disabled && setActive(false)}
      onFocus={() => !disabled && setFocused(true)}
      onBlur={() => !disabled && setFocused(false)}
      style={{
        // Auto Layout: VERTICAL, CENTER / CENTER
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        height: RADIO_LAYOUT.cardHeight,
        flex: 1,
        padding: RADIO_LAYOUT.cardPadding,
        borderRadius: RADIO_LAYOUT.cardRadius,
        border: `${RADIO_LAYOUT.borderWidth} solid ${border}`,
        backgroundColor: background,

        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        textDecoration: 'none',
        transition: 'background-color 0.15s ease, border-color 0.15s ease',
      }}
    >
      {/* Inner row: HORIZONTAL, SPACE_BETWEEN, gap spacing-lg */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: RADIO_LAYOUT.gap,
        }}
      >
        {/* Option text — typography/button/md/semibold */}
        <span
          style={{
            fontFamily: optionText.fontFamily,
            fontSize: optionText.fontSize,
            fontWeight: weight(optionText.fontWeight),
            lineHeight: optionText.lineHeight,
            color: foreground,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>

        <RadioDot selected={selected} state={state} />
      </div>
    </button>
  );
};

// ═══════════════════════════════════════════
//  RadioButtonGroup — the labelled group
//  Figma: "Gender select" component set (14291:132236)
//  Auto Layout: VERTICAL, gap spacing-sm — Label → Options row → Description
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
  /** Canonical state: disabled */
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
  const labelText = radioText('label');
  const optionalText = radioText('optional');
  const requiredText = radioText('required');
  const errorText = radioText('error');

  return (
    <div
      className={`ltp-radio-group ${className}`}
      role="radiogroup"
      aria-label={label}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: RADIO_LAYOUT.groupGap,
      }}
    >
      {/* ── Label row — HORIZONTAL, paddingLeft spacing-sm, gap spacing-sm ── */}
      {label && (
        <div
          className="ltp-radio-group__label"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: RADIO_LAYOUT.labelPaddingLeft,
            gap: RADIO_LAYOUT.labelGap,
          }}
        >
          <span
            style={{
              fontFamily: labelText.fontFamily,
              fontSize: labelText.fontSize,
              fontWeight: weight(labelText.fontWeight),
              lineHeight: labelText.lineHeight,
              color: radioColor('label-foreground-rest'),
            }}
          >
            {label}
          </span>

          {optional && !required && (
            <span
              style={{
                fontFamily: optionalText.fontFamily,
                fontSize: optionalText.fontSize,
                fontWeight: weight(optionalText.fontWeight),
                lineHeight: optionalText.lineHeight,
                color: radioOptionalColor(),
              }}
            >
              (ไม่จำเป็น)
            </span>
          )}

          {required && (
            <span
              style={{
                fontFamily: requiredText.fontFamily,
                fontSize: requiredText.fontSize,
                fontWeight: weight(requiredText.fontWeight),
                lineHeight: requiredText.lineHeight,
                color: radioColor('label-required-rest'),
              }}
            >
              (จำเป็น)
            </span>
          )}
        </div>
      )}

      {/* ── Options row — HORIZONTAL, gap spacing-2xl ── */}
      <div
        className="ltp-radio-group__options"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: RADIO_LAYOUT.optionsGap,
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

      {/* ── Description — HORIZONTAL, paddingLeft spacing-sm (hidden by default) ── */}
      {error && (
        <div
          className="ltp-radio-group__error"
          style={{
            display: 'flex',
            paddingLeft: RADIO_LAYOUT.labelPaddingLeft,
          }}
        >
          <span
            style={{
              fontFamily: errorText.fontFamily,
              fontSize: errorText.fontSize,
              fontWeight: weight(errorText.fontWeight),
              lineHeight: errorText.lineHeight,
              color: radioColor('error-foreground-rest'),
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
