import React, { useState, useCallback } from 'react';
import Button from '../Button/Button';
import MenuButton from './MenuButton';
import NumberSearchBox from './NumberSearchBox';
import SetSelect from './SetSelect';
import Icon, { type IconSize } from '../../icons/Icon';
import '../../icons/icon-data';
import '../../foundations/tokens.css';
import {
  SEARCH_CARD,
  RANDOMIZE_ICON_SIZE,
  LOTTO_BOARD_COLORS,
  lottoBoardText,
  FONT_FAMILY,
  type SearchCardType,
  type MenuButtonType,
} from './tokens';
import './LottoBoard.css';

export interface SearchCardProps {
  /** Card type — matches the Figma "Type" variant: All | Single | Set */
  type?: SearchCardType;
  /** Date text displayed in the header */
  dateText?: string;
  /** Callback when search is clicked with the current digits */
  onSearch?: (digits: string) => void;
  /** Callback when random is clicked */
  onRandom?: () => void;
  /** Callback when clear is clicked */
  onClear?: () => void;
  /** Canonical state: disabled */
  disabled?: boolean;
}

/**
 * SearchCard — Lotteryplus Design System
 *
 * Figma component: search-card (COMPOSITE)
 * Composes MenuButton + NumberSearchBox + SetSelect (when the type is Set) and two
 * real Buttons from the shared library.
 *
 * Every style value is a CSS custom property from foundations/tokens.css.
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
        fontFamily: FONT_FAMILY,
        width: '100%',
        maxWidth: SEARCH_CARD.maxWidth,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: SEARCH_CARD.paddingX,
          paddingRight: SEARCH_CARD.paddingX,
        }}
      >
        {/* Figma lays the title and the draw date side by side on a single 24px row. */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: SEARCH_CARD.gap }}>
          <span
            style={{
              ...lottoBoardText('title'),
              color: LOTTO_BOARD_COLORS.foregroundRed,
            }}
          >
            ค้นหาเลขเด็ด !
          </span>
          <span
            style={{
              ...lottoBoardText('caption'),
              // Color/Text/Text-Secondary — body weight, not a dimmed grey.
              color: LOTTO_BOARD_COLORS.foregroundDark,
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
            ...lottoBoardText('link'),
            color: LOTTO_BOARD_COLORS.foregroundRed,
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
      <NumberSearchBox value={digits} onChange={setDigits} disabled={disabled} />

      {/* SetSelect — only shown when the type is Set */}
      {showSetSelect && (
        <SetSelect quantity={setQty} onQuantityChange={setSetQty} disabled={disabled} />
      )}

      {/* Bottom actions — Figma's `Search` row: 390x54, gap 8, 16 of side padding, children
          centred. It hugs, and the 54 comes from `button-special`; stating it as a minimum
          as well is what `search-height` is for, and keeps the row honest if the randomise
          control is ever hidden. */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: SEARCH_CARD.actionsGap,
          minHeight: SEARCH_CARD.searchHeight,
          paddingLeft: SEARCH_CARD.paddingX,
          paddingRight: SEARCH_CARD.paddingX,
        }}
      >
        {/* Randomise — Figma's `button-special` (14291:131519): a 114x54 tile filled with a
            dark-to-red gradient. It is not a Button variant in Figma, so it is not one here.
            Its glyph is `filled-AI`, read off `Frame 1000012333` on 2026-08-20. The overlay
            used to record that no glyph existed in the set; the glyph was there all along,
            inside an instance nobody had walked. */}
        <button
          type="button"
          onClick={handleRandom}
          disabled={disabled}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: SEARCH_CARD.randomizeGap,
            flex: 'none',
            width: SEARCH_CARD.randomizeWidth,
            height: SEARCH_CARD.randomizeHeight,
            borderRadius: SEARCH_CARD.randomizeRadius,
            background: SEARCH_CARD.randomizeGradient,
            color: SEARCH_CARD.randomizeForeground,
            border: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? SEARCH_CARD.opacityDisabled : undefined,
            ...lottoBoardText('menu'),
          }}
        >
          <Icon
            name="filled-AI"
            size={RANDOMIZE_ICON_SIZE as IconSize}
            customColor={SEARCH_CARD.randomizeForeground}
          />
          สุ่มตัวเลข
        </button>

        {/* Search — `Size=L, Type=Primary` with `layoutSizingVertical: FILL`, so it takes
            the row's 54 rather than L's own 44. The row is 54 because `button-special` is;
            Figma hugs it rather than stating a height twice. */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          fullHeight
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
