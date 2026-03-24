import React, { useState, useCallback } from 'react';
import Button from '../Button/Button';
import Icon from '../../icons/Icon';
import MenuButton from './MenuButton';
import NumberSearchBox from './NumberSearchBox';
import SetSelect from './SetSelect';
import {
  SEARCH_CARD,
  SPACING,
  TYPOGRAPHY,
  LOTTO_BOARD_COLORS,
  BUTTON_COLORS,
  RADIUS,
  type SearchCardType,
  type MenuButtonType,
} from './tokens';
import './LottoBoard.css';

export interface SearchCardProps {
  /** Card type — matches Figma "Type" variant: All | Single | Set */
  type?: SearchCardType;
  /** Date text displayed in header */
  dateText?: string;
  /** Callback when search is clicked with current digits */
  onSearch?: (digits: string) => void;
  /** Callback when random is clicked */
  onRandom?: () => void;
  /** Callback when clear is clicked */
  onClear?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * SearchCard — Lotteryplus Design System
 *
 * Figma component: search-card (COMPOSITE)
 * Uses: MenuButton + NumberSearchBox + SetSelect (when type=Set)
 * Header: "ค้นหาเลขเด็ด !" red text + date + "ล้างค่า" link
 * Bottom: "สุ่มตัวเลข" button (special) + "ค้นหา" button (primary)
 * Layout: VERTICAL gap 16
 * Variants: Type = All (no set-select) | Single (no set-select) | Set (includes set-select)
 */
const SearchCard: React.FC<SearchCardProps> = ({
  type: initialType = 'All',
  dateText = 'งวดวันที่ 16 มี.ค. 2568',
  onSearch,
  onRandom,
  onClear,
  disabled = false,
}) => {
  const [activeType, setActiveType] = useState<MenuButtonType>(initialType);
  const [digits, setDigits] = useState('');
  const [setQty, setSetQty] = useState(1);

  const handleTypeChange = useCallback((t: MenuButtonType) => {
    setActiveType(t);
    setDigits('');
  }, []);

  const handleClear = useCallback(() => {
    setDigits('');
    setSetQty(1);
    onClear?.();
  }, [onClear]);

  const handleRandom = useCallback(() => {
    const random = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    setDigits(random);
    onRandom?.();
  }, [onRandom]);

  const handleSearch = useCallback(() => {
    onSearch?.(digits);
  }, [digits, onSearch]);

  const showSetSelect = activeType === 'Set';

  return (
    <div
      className="ltp-search-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SEARCH_CARD.gap,
        fontFamily: TYPOGRAPHY.fontFamily,
        width: '100%',
        maxWidth: 400,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: SPACING['2xl'],
          paddingRight: SPACING['2xl'],
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
          <span
            style={{
              fontSize: TYPOGRAPHY.title.fontSize,
              fontWeight: TYPOGRAPHY.title.fontWeight,
              lineHeight: TYPOGRAPHY.title.lineHeight,
              color: LOTTO_BOARD_COLORS.fgRed,
            }}
          >
            ค้นหาเลขเด็ด !
          </span>
          <span
            style={{
              fontSize: TYPOGRAPHY.caption.fontSize,
              fontWeight: TYPOGRAPHY.caption.fontWeight,
              lineHeight: TYPOGRAPHY.caption.lineHeight,
              color: LOTTO_BOARD_COLORS.fgDark,
            }}
          >
            {dateText}
          </span>
        </div>
        <button
          className="ltp-clear-link"
          onClick={handleClear}
          disabled={disabled}
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.underline.fontSize,
            fontWeight: TYPOGRAPHY.underline.fontWeight,
            lineHeight: TYPOGRAPHY.underline.lineHeight,
            color: LOTTO_BOARD_COLORS.fgRed,
            cursor: disabled ? 'default' : 'pointer',
          }}
        >
          ล้างค่า
        </button>
      </div>

      {/* MenuButton */}
      <MenuButton
        activeType={activeType}
        onTypeChange={handleTypeChange}
        disabled={disabled}
      />

      {/* NumberSearchBox */}
      <NumberSearchBox
        value={digits}
        onChange={setDigits}
        disabled={disabled}
      />

      {/* SetSelect — only shown when type is Set */}
      {showSetSelect && (
        <SetSelect
          quantity={setQty}
          onQuantityChange={setSetQty}
          disabled={disabled}
        />
      )}

      {/* Bottom buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: SPACING.lg,
          paddingLeft: SPACING['2xl'],
          paddingRight: SPACING['2xl'],
        }}
      >
        {/* Random button (special/outline style) */}
        <Button
          type="outline"
          size="L"
          showIcon
          iconName="filled-Randomize"
          onClick={handleRandom}
          disabled={disabled}
        >
          สุ่มตัวเลข
        </Button>

        {/* Search button (primary) */}
        <Button
          type="primary"
          size="L"
          fullWidth
          onClick={handleSearch}
          disabled={disabled}
        >
          ค้นหา
        </Button>
      </div>
    </div>
  );
};

export default SearchCard;
