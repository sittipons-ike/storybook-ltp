import React from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import {
  BUTTON_COLORS,
  SIZE_CONFIG,
  TYPOGRAPHY,
  RADIUS,
  BORDER_WIDTH,
  type ButtonType,
  type ButtonSize,
  type ButtonState,
} from './tokens';
import './Button.css';

export interface ButtonProps {
  /** Button label text */
  children?: string;
  /** Visual type — matches Figma "Type" variant property */
  type?: ButtonType;
  /** Size — matches Figma "Size" variant property (L/M/S) */
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
  /** HTML button type */
  htmlType?: 'button' | 'submit' | 'reset';
  /** Additional className */
  className?: string;
}

/**
 * Button Component — Lotteryplus Design System
 *
 * Built from Figma component set "button" (14291:130847)
 * 195 variants: Size(L/M/S) × Type(5) × Show icon(2) × Show Text(2) × State(5)
 *
 * All values are bound to Foundation variables:
 * - Spacing: dimension/spacing/* (2-semantic)
 * - Radius: dimension/breakpoint/radius/* (2-semantic)
 * - Typography: button/m-semb/* (typography collection)
 * - Colors: colors/button/* (3-component collection)
 * - Icons: icons-size component (Size=24, Colors=On BG)
 */
const Button: React.FC<ButtonProps> = ({
  children = 'BUTTON',
  type = 'primary',
  size = 'L',
  showIcon = false,
  showText = true,
  iconName = 'outline-Home',
  disabled = false,
  onClick,
  fullWidth = false,
  htmlType = 'button',
  className = '',
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  // Determine current state (matches Figma "State" variant property)
  const currentState: ButtonState = disabled
    ? 'disabled'
    : pressed
    ? 'pressed'
    : focused
    ? 'focused'
    : hovered
    ? 'hover'
    : 'default';

  const colors = BUTTON_COLORS[type][currentState];
  const sizeConfig = SIZE_CONFIG[size];
  const isIconOnly = showIcon && !showText;

  // ── Auto Layout mapping from Figma ──
  // layoutMode: HORIZONTAL
  // primaryAxisAlignItems: CENTER
  // counterAxisAlignItems: CENTER
  const containerStyle: React.CSSProperties = {
    // Auto Layout: HORIZONTAL, CENTER/CENTER
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // Dimensions (counterAxisSizingMode: FIXED, primaryAxisSizingMode: FIXED in Figma → we use auto width)
    height: sizeConfig.height,
    width: fullWidth ? '100%' : undefined,

    // Padding from Foundation spacing tokens
    paddingTop: sizeConfig.paddingY,     // dimension/spacing/spacing-none = 0
    paddingBottom: sizeConfig.paddingY,  // dimension/spacing/spacing-none = 0
    paddingLeft: isIconOnly
      ? sizeConfig.iconOnlyPadding
      : showIcon
      ? sizeConfig.iconPaddingLeft       // dimension/spacing/spacing-xl = 12
      : sizeConfig.paddingX,             // dimension/spacing/spacing-2xl = 16
    paddingRight: isIconOnly
      ? sizeConfig.iconOnlyPadding
      : sizeConfig.paddingX,             // dimension/spacing/spacing-2xl = 16

    // Gap from Foundation spacing tokens
    gap: showIcon && showText
      ? sizeConfig.itemSpacing           // dimension/spacing/spacing-sm = 4
      : 0,

    // Border Radius from Foundation
    borderRadius: RADIUS.lg,             // dimension/breakpoint/radius/radius-lg = 8

    // Colors from Component Tokens (3-component)
    backgroundColor: colors.bg,
    color: colors.fg,

    // Border (Tertiary type uses stroke)
    border: colors.border
      ? `${BORDER_WIDTH[1]}px solid ${colors.border}`  // dimension/border-width/1 = 1px
      : type === 'tertiary'
      ? `${BORDER_WIDTH[1]}px solid transparent`
      : 'none',

    // Cursor
    cursor: disabled ? 'not-allowed' : 'pointer',

    // Transition
    transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',

    // No text selection
    userSelect: 'none',
  };

  // ── Typography from Foundation ──
  // button/m-semb: font-family/Graphik TH, size/m=14, weight/Semibold=600, line-height/m=22px
  const textStyle: React.CSSProperties = {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.fontSize,
    fontWeight: TYPOGRAPHY.fontWeight,
    lineHeight: TYPOGRAPHY.lineHeight,
    color: colors.fg,
    whiteSpace: 'nowrap',
    letterSpacing: 0, // Figma: 0%
  };

  // ── Icon color mapping ──
  // Figma uses icons-size component with Colors="On BG" for primary/secondary
  // For tertiary/outline/link, icon inherits text color
  const getIconColor = (): string => {
    return colors.fg;
  };

  return (
    <button
      type={htmlType}
      className={`ltp-button ltp-button--${type} ltp-button--${size.toLowerCase()} ${
        isIconOnly ? 'ltp-button--icon-only' : ''
      } ${disabled ? 'ltp-button--disabled' : ''} ${className}`}
      style={containerStyle}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => {
        if (!disabled) {
          setHovered(false);
          setPressed(false);
        }
      }}
      onFocus={() => !disabled && setFocused(true)}
      onBlur={() => !disabled && setFocused(false)}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => !disabled && setPressed(false)}
    >
      {/* Icon — uses design system Icon component (icons-size: Size=24, Colors=On BG) */}
      {showIcon && (
        <Icon
          name={iconName}
          size={sizeConfig.iconSize as any}
          customColor={getIconColor()}
        />
      )}

      {/* Text — Typography: button/m-semb */}
      {showText && (
        <span className="ltp-button__text" style={textStyle}>
          {children}
        </span>
      )}
    </button>
  );
};

export default Button;
