import React from 'react';
import {
  MENU_BUTTON,
  TYPOGRAPHY,
  BUTTON_COLORS,
  LOTTO_BOARD_COLORS,
  MENU_BUTTON_LABELS,
  type MenuButtonType,
} from './tokens';
import './LottoBoard.css';

export interface MenuButtonProps {
  /** Currently active type — matches Figma "Type" variant property */
  activeType?: MenuButtonType;
  /** Callback when a menu button is clicked */
  onTypeChange?: (type: MenuButtonType) => void;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * MenuButton — Lotteryplus Design System
 *
 * Figma component: menu-button
 * 3 buttons in a row: ทั้งหมด / หวยเดี่ยว / หวยชุด
 * Active uses button (filled red), Inactive uses button-on-cont (white with red border)
 * Each button: 114x44px, radius 8, padding LR 16
 * Typography: button/m-semb → 14px Semibold
 */
const MenuButton: React.FC<MenuButtonProps> = ({
  activeType = 'All',
  onTypeChange,
  disabled = false,
}) => {
  const types: MenuButtonType[] = ['All', 'Single', 'Set'];

  return (
    <div
      className="ltp-menu-button"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: MENU_BUTTON.gap,
        paddingLeft: MENU_BUTTON.paddingLR,
        paddingRight: MENU_BUTTON.paddingLR,
      }}
    >
      {types.map((type) => {
        const isActive = type === activeType;
        return (
          <button
            key={type}
            className="ltp-menu-btn"
            onClick={() => !disabled && onTypeChange?.(type)}
            disabled={disabled}
            aria-pressed={isActive}
            style={{
              width: MENU_BUTTON.buttonWidth,
              height: MENU_BUTTON.buttonHeight,
              borderRadius: MENU_BUTTON.borderRadius,
              paddingLeft: MENU_BUTTON.paddingLR,
              paddingRight: MENU_BUTTON.paddingLR,
              backgroundColor: isActive
                ? BUTTON_COLORS.primary.bg
                : BUTTON_COLORS.onContainer.bg,
              color: isActive
                ? BUTTON_COLORS.primary.fg
                : BUTTON_COLORS.onContainer.fg,
              border: isActive
                ? 'none'
                : `${MENU_BUTTON.borderWidth}px solid ${LOTTO_BOARD_COLORS.fgRed}`,
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.button.fontSize,
              fontWeight: TYPOGRAPHY.button.fontWeight,
              lineHeight: TYPOGRAPHY.button.lineHeight,
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              transition: 'background-color 0.15s, color 0.15s',
            }}
          >
            {MENU_BUTTON_LABELS[type]}
          </button>
        );
      })}
    </div>
  );
};

export default MenuButton;
