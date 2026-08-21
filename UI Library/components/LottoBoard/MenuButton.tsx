import React from 'react';
import '../../foundations/tokens.css';
import {
  MENU_BUTTON,
  LOTTO_BOARD_COLORS,
  OPACITY,
  MENU_BUTTON_LABELS,
  MENU_BUTTON_TYPES,
  lottoBoardText,
  type MenuButtonType,
} from './tokens';
import './LottoBoard.css';

export interface MenuButtonProps {
  /** Currently active type — matches the Figma "Type" variant property */
  activeType?: MenuButtonType;
  /** Callback when a menu button is clicked */
  onTypeChange?: (type: MenuButtonType) => void;
  /** Canonical state: disabled */
  disabled?: boolean;
}

/**
 * MenuButton — Lotteryplus Design System
 *
 * Figma component: menu-button
 * Three filters in a row: ทั้งหมด / หวยเดี่ยว / หวยชุด
 * The selected item is filled red; the rest are white with a red hairline border.
 *
 * Every style value is a CSS custom property from foundations/tokens.css.
 */
const MenuButton: React.FC<MenuButtonProps> = ({
  activeType = 'All',
  onTypeChange,
  disabled = false,
}) => (
  <div
    className="ltp-menu-button"
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: MENU_BUTTON.gap,
      paddingLeft: MENU_BUTTON.paddingX,
      paddingRight: MENU_BUTTON.paddingX,
    }}
  >
    {MENU_BUTTON_TYPES.map((type) => {
      const isSelected = type === activeType;
      return (
        <button
          key={type}
          className="ltp-menu-btn"
          onClick={() => !disabled && onTypeChange?.(type)}
          disabled={disabled}
          aria-pressed={isSelected}
          style={{
            ...lottoBoardText('menu'),
            width: MENU_BUTTON.itemWidth,
            height: MENU_BUTTON.itemHeight,
            borderRadius: MENU_BUTTON.itemRadius,
            paddingLeft: MENU_BUTTON.itemPaddingX,
            paddingRight: MENU_BUTTON.itemPaddingX,
            backgroundColor: isSelected
              ? LOTTO_BOARD_COLORS.backgroundRed
              : LOTTO_BOARD_COLORS.backgroundWhite,
            color: isSelected
              ? LOTTO_BOARD_COLORS.foregroundWhite
              : LOTTO_BOARD_COLORS.foregroundRed,
            border: `${MENU_BUTTON.itemBorderWidth} solid ${
              isSelected ? 'transparent' : LOTTO_BOARD_COLORS.foregroundRed
            }`,
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? OPACITY.disabled : undefined,
            transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
          }}
        >
          {MENU_BUTTON_LABELS[type]}
        </button>
      );
    })}
  </div>
);

export default MenuButton;
