import React from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import '../../foundations/tokens.css';
import {
  checkboxColors,
  CHECKBOX,
  CHECKBOX_GLYPH,
  CHECKBOX_GLYPH_SIZE,
  type CheckboxChecked,
  type CheckboxState,
  type CheckboxTone,
  type CheckboxVariant,
} from './tokens';
import './Checkbox.css';

export interface CheckboxProps {
  /** Label shown next to the control */
  label?: string;
  /** `true`, `false`, or `'indeterminate'` for a partly-selected group */
  checked?: CheckboxChecked;
  /** Called with the next value. Indeterminate advances to checked. */
  onChange?: (checked: boolean) => void;
  /** Which colour a checked box takes — Figma's `Primary Color` axis */
  tone?: CheckboxTone;
  /** `default` is the bare control; `card` wraps it in a tinted surface */
  variant?: CheckboxVariant;
  /** Blocks interaction and mutes every colour */
  disabled?: boolean;
  /** Marks the label as failing validation */
  error?: boolean;
  /**
   * Force the interaction state instead of deriving it from pointer and focus.
   *
   * Needed so a documentation grid can show hover and focus side by side — without it a
   * story labelled "hover" renders rest, which is a table that lies about the component.
   * TextField, Dropdown and RadioButton all take the same escape hatch.
   */
  state?: CheckboxState;
  /** Fill the width of the parent — the usual choice for the `card` variant */
  fullWidth?: boolean;
  /** Accessible name when there is no visible label */
  'aria-label'?: string;
  /** Additional className */
  className?: string;
}

/**
 * Checkbox — Lotteryplus Design System
 *
 * Figma component set `checkbox` (14291:131502), all 14 variants read on 2026-08-19.
 *
 * The frame draws the box — fill, 1px or 1.5px stroke, radius 4 — and an icon appears
 * inside it on exactly two states: `outline-check` when checked, `filled-minus` when
 * indeterminate. Every other state shows an empty box.
 *
 * Two earlier builds got this wrong in opposite directions. The second read
 * `Outline/Old/Check`, a hidden orphaned legacy instance that sits inside every unchecked
 * variant, and concluded the whole control was an icon — which made an unticked box
 * render a tick. Hidden nodes are not the spec; checkbox.json records the full table.
 *
 * Every style value is a CSS custom property from foundations/tokens.css.
 */
const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  tone = 'success',
  variant = 'default',
  disabled = false,
  error = false,
  state: stateOverride,
  fullWidth = false,
  'aria-label': ariaLabel,
  className = '',
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const derived: CheckboxState = disabled
    ? 'disabled'
    : error
    ? 'error'
    : pressed
    ? 'active'
    : focused
    ? 'focus'
    : hovered
    ? 'hover'
    : 'rest';
  const state = stateOverride ?? derived;

  const colors = checkboxColors(checked, state, tone, variant);
  const isCard = variant === 'card';
  const marked = checked === true || checked === 'indeterminate';

  // Two glyphs, both from the icon set, both read off the nested instance in Figma's
  // Selected and All-Seleted variants. No glyph at all on the other five states.
  const glyph = marked
    ? checked === 'indeterminate'
      ? CHECKBOX_GLYPH.indeterminate
      : CHECKBOX_GLYPH.checked
    : null;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
      aria-label={ariaLabel || label}
      aria-invalid={error || undefined}
      disabled={disabled}
      className={`ltp-checkbox ltp-checkbox--${variant} ${
        disabled ? 'ltp-checkbox--disabled' : ''
      } ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: CHECKBOX.gap,
        width: fullWidth ? '100%' : undefined,
        minHeight: CHECKBOX.height,
        padding: isCard ? CHECKBOX.cardPadding : 0,
        borderRadius: isCard ? CHECKBOX.cardRadius : 0,
        backgroundColor: colors.surface,
        border: isCard ? `${CHECKBOX.cardBorderWidth} solid ${colors.cardBorder}` : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'left',
      }}
      onClick={() => !disabled && onChange?.(checked !== true)}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => {
        if (disabled) return;
        setHovered(false);
        setPressed(false);
      }}
      onFocus={() => !disabled && setFocused(true)}
      onBlur={() => !disabled && setFocused(false)}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => !disabled && setPressed(false)}
    >
      <span
        className="ltp-checkbox__control"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxSizing: 'border-box',
          width: CHECKBOX.size,
          height: CHECKBOX.size,
          padding: CHECKBOX.padding,
          borderRadius: CHECKBOX.radius,
          backgroundColor: colors.background,
          // Figma strokes the box INSIDE the 24px frame, so the border must not add to it.
          // A checked box has no stroke at all — `transparent` would still take a pixel
          // off each side of the content area and crop the 20px glyph.
          border: colors.border === 'transparent'
            ? 'none'
            : `${colors.borderWidth} solid ${colors.border}`,
          boxShadow: colors.ring
            ? `0 0 ${CHECKBOX.focusRingBlur} ${CHECKBOX.focusRingSpread} ${colors.ring}`
            : undefined,
        }}
      >
        {glyph && <Icon name={glyph} size={CHECKBOX_GLYPH_SIZE} customColor={colors.mark} />}
      </span>

      {label && (
        <span
          className="ltp-checkbox__label"
          style={{
            fontFamily: CHECKBOX.fontFamily,
            fontSize: CHECKBOX.fontSize,
            lineHeight: CHECKBOX.lineHeight,
            fontWeight: CHECKBOX.fontWeight as unknown as React.CSSProperties['fontWeight'],
            letterSpacing: CHECKBOX.tracking,
            color: colors.label,
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
};

export default Checkbox;
