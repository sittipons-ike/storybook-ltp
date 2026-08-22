import React from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import '../../foundations/tokens.css';
import {
  buttonColors,
  buttonSize,
  BUTTON_BASE,
  type ButtonVariant,
  type ButtonSize,
  type ButtonState,
} from './tokens';
import './Button.css';

export interface ButtonProps {
  /** Button label text */
  children?: string;
  /** Visual variant. `outline` and `link` are approved extensions — see components.json */
  variant?: ButtonVariant;
  /** Size — lg (44px) / md (36px) / sm (28px) */
  size?: ButtonSize;
  /** Show icon — matches Figma "Show icon" variant property */
  showIcon?: boolean;
  /** Show text — matches Figma "Show Text" variant property */
  showText?: boolean;
  /** Icon name from the design system icon library */
  iconName?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Full width */
  fullWidth?: boolean;
  /**
   * Fill the row's height instead of standing at the size's own.
   *
   * Figma's Auto Layout sizes on both axes and this component only modelled one. The search
   * row on the home page is where it showed: `button` there is `Size=L` with
   * `layoutSizingVertical: FILL` (`I21084:85041;14854:25314` → `Search`), so it stretches to
   * the 54 that `button-special` beside it sets, while L on its own is 44. Without this the
   * two controls in that row are 10px apart in height.
   *
   * `minHeight` still holds the size's own height, so a shorter row cannot squash it.
   */
  fullHeight?: boolean;
  /** HTML button type */
  htmlType?: 'button' | 'submit' | 'reset';
  /** Additional className */
  className?: string;
}

/**
 * Button — Lotteryplus Design System
 *
 * Built from the Figma component set "button" (14291:130847).
 * 195 variants: Size(3) x Variant(5) x Show icon(2) x Show Text(2) x State(5)
 *
 * Every style value is a CSS custom property from foundations/tokens.css, which is
 * generated from Figma via design.md + components.json. There are no literal colours,
 * sizes, or font values in this file — changing one means changing Figma and
 * regenerating, which is what keeps design and code from drifting apart.
 */
const Button: React.FC<ButtonProps> = ({
  children = 'BUTTON',
  variant = 'primary',
  size = 'lg',
  showIcon = false,
  showText = true,
  // Figma's own placeholder in the `button` set (14291:130847): every Show icon=Yes
  // variant instantiates `outline-document-copy`. The icon is a slot, so this only
  // matters when a caller turns the icon on without naming one — but the default it
  // used to carry, `outline-Home`, came from nowhere.
  iconName = 'outline-document-copy',
  disabled = false,
  onClick,
  fullWidth = false,
  fullHeight = false,
  htmlType = 'button',
  className = '',
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [active, setActive] = React.useState(false);

  // Canonical state precedence: disabled beats active beats focus beats hover.
  const state: ButtonState = disabled
    ? 'disabled'
    : active
    ? 'active'
    : focused
    ? 'focus'
    : hovered
    ? 'hover'
    : 'rest';

  const colors = buttonColors(variant, state);
  const dimensions = buttonSize(size);
  const isIconOnly = showIcon && !showText;

  const containerStyle: React.CSSProperties = {
    // Auto Layout: HORIZONTAL, CENTER / CENTER
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: fullHeight ? 'auto' : dimensions.height,
    alignSelf: fullHeight ? 'stretch' : undefined,
    minHeight: fullHeight ? dimensions.height : undefined,
    // Figma draws the icon-only button as a square — 44, 36 or 28 on a side. Letting the
    // width come from content made it 2px wider than tall, because the transparent 1px
    // border every variant carries counts toward an auto width under border-box.
    width: fullWidth ? '100%' : isIconOnly ? dimensions.height : undefined,

    paddingTop: BUTTON_BASE.paddingY,
    paddingBottom: BUTTON_BASE.paddingY,
    paddingLeft: isIconOnly
      ? dimensions.iconOnlyPadding
      : showIcon
      ? BUTTON_BASE.paddingLeftWithIcon
      : BUTTON_BASE.paddingX,
    paddingRight: isIconOnly ? dimensions.iconOnlyPadding : BUTTON_BASE.paddingX,

    gap: showIcon && showText ? BUTTON_BASE.gap : 0,

    borderRadius: BUTTON_BASE.radius,
    backgroundColor: colors.background,
    color: colors.foreground,
    border: `${BUTTON_BASE.borderWidth} solid ${colors.border}`,

    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
    userSelect: 'none',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: BUTTON_BASE.fontFamily,
    fontSize: BUTTON_BASE.fontSize,
    fontWeight: BUTTON_BASE.fontWeight as unknown as React.CSSProperties['fontWeight'],
    lineHeight: BUTTON_BASE.lineHeight,
    letterSpacing: BUTTON_BASE.tracking,
    color: colors.foreground,
    whiteSpace: 'nowrap',
  };

  return (
    <button
      type={htmlType}
      className={`ltp-button ltp-button--${variant} ltp-button--${size} ${
        isIconOnly ? 'ltp-button--icon-only' : ''
      } ${disabled ? 'ltp-button--disabled' : ''} ${className}`}
      style={containerStyle}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => {
        if (!disabled) {
          setHovered(false);
          setActive(false);
        }
      }}
      onFocus={() => !disabled && setFocused(true)}
      onBlur={() => !disabled && setFocused(false)}
      onMouseDown={() => !disabled && setActive(true)}
      onMouseUp={() => !disabled && setActive(false)}
    >
      {/* Icon — icons-size component (Size=24, Colors=On BG) */}
      {showIcon && (
        <Icon
          name={iconName}
          size={dimensions.iconSize as any}
          customColor={colors.foreground}
        />
      )}

      {/* Text — typography/button/md/semibold */}
      {showText && (
        <span className="ltp-button__text" style={textStyle}>
          {children}
        </span>
      )}
    </button>
  );
};

export default Button;
