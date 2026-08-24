import React from 'react';
import '../../../ui/foundations/tokens.css';
import Icon from '../../../ui/icons/Icon';
import '../../../ui/icons/icon-data';
import { sys } from '../../../ui/foundations/tokens';
import { HOME, HOME_RADIUS, unbound } from './tokens';

/**
 * LotteryTile — Figma `lottery-card`, `Device=Mobile`
 *
 * Read from `21084:85095` (`Type=Set`) and `21084:85127` (`Type=Select`) on 2026-08-22.
 * Both are 170 wide with an 8 radius; what differs is which bands the card stacks:
 *
 *   Type=Set     84 ticket + 40 cart                        = 124
 *   Type=Select  32 heading + 84 ticket + 40 buy + 40 cart  = 196
 *
 * The ticket face is a picture — Figma fills `lottery-main` with a raster, and the number
 * printed on it lives in that raster rather than in a text layer. So the tile takes a
 * `face` and never renders the number itself; a different number is a different picture.
 *
 * Scope: feature. It graduates to `ui/components` when a second page draws one, which will
 * be `/lottoboard` (Lark Standard §3.3 — share by evidence, not by anticipation).
 */
export type LotteryTileType = 'set' | 'select';

export interface LotteryTileProps {
  type?: LotteryTileType;
  /** The ticket face, 170 x 84. `lottery-main` — `I21084:85095;14291:138147` */
  face: string;
  /** Alt text for the face, since the number is inside the picture. */
  faceAlt: string;

  /** `Type=Set` — the black flag down the left edge: `เลขชุด 5 ใบ` over `30 ล้าน`. */
  setSize?: { label: string; value: string; unit: string };
  setPrize?: { value: string; unit: string };

  /** `Type=Select` — the heading band: `เลขท้าย` `39` `( 60 ใบ )`. */
  category?: string;
  number?: string;
  stock?: string;
  stockUnit?: string;

  /** `Type=Select` — the buy row: `ซื้อ [ 5 ▾ ] ใบ`. */
  buyLabel?: string;
  quantity?: string;
  quantityUnit?: string;
  onQuantityClick?: () => void;

  /** The cart band both types end with. */
  cartLabel?: string;
  onAddToCart?: () => void;
  className?: string;
}

/** `Frame 43578` — the 138-wide row every band centres its content in. */
const Band: React.FC<{
  background: string;
  padding: string;
  radius?: React.CSSProperties['borderRadius'];
  gap: string;
  /** Stated when Figma fixes the band's height, so long content cannot grow the card. */
  height?: number;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ background, padding, radius, gap, height, children, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap,
      padding,
      height,
      background,
      borderRadius: radius,
      color: HOME.tileForeground,
      cursor: onClick ? 'pointer' : undefined,
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

/**
 * `Frame 43585` / `Frame 43586` — a value over its unit.
 *
 * Figma states `itemSpacing: -1`, which is an overlap, not a gap: CSS has no negative gap,
 * so it is a negative margin on the following line. The same applies one level up, where
 * the two flags overlap by 2.
 */
const Flag: React.FC<{ label?: string; value: string; unit: string }> = ({ label, value, unit }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {label && <span style={{ ...unbound('tile-flag-unit'), textAlign: 'center' }}>{label}</span>}
    <span style={{ ...unbound('tile-flag-value'), marginTop: -1 }}>{value}</span>
    <span style={{ ...unbound('tile-flag-unit'), marginTop: -1 }}>{unit}</span>
  </div>
);

const LotteryTile: React.FC<LotteryTileProps> = ({
  type = 'set',
  face,
  faceAlt,
  setSize,
  setPrize,
  category = 'เลขท้าย',
  number,
  stock,
  stockUnit = 'ใบ',
  buyLabel = 'ซื้อ',
  quantity = '1',
  quantityUnit = 'ใบ',
  onQuantityClick,
  cartLabel = 'หยิบใส่ตะกร้า',
  onAddToCart,
  className = '',
}) => (
  <article
    className={`ltp-lottery-tile ltp-lottery-tile--${type} ${className}`}
    style={{
      position: 'relative',
      width: 170,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: HOME_RADIUS.tile,
      // `Frame 43583` runs to the card's own top-left corner, so the corner has to cut the
      // strip rather than the strip having to know the corner.
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}
  >
    {/* ── Type=Select: the heading band. `I21084:85127;14291:138124`, 32 tall, 4/16 pad ──
        Height is stated rather than hugged, and the category ellipsizes. Figma only ever
        draws `เลขท้าย 39 ( 60 ใบ )`, which fits the 138-wide row; a longer category wraps
        without this, the band grows to 74, and the tile beside it grows with it — one long
        name and the whole row is a different height. The number and the stock are what the
        card is for, so the name is what gives way.

        The 8/-8 padding on the clipped span is not decoration: `overflow: hidden` cuts at
        the padding box, and Thai vowel marks run ~5px below the baseline, so a bare line box
        loses them on whichever engine rounds the other way (MEMORY 2026-08-21, `ตู้` → `ต้`). */}
    {type === 'select' && (
      <Band
        background={HOME.tileBandDark}
        padding={`${sys('spacing-sm')} ${sys('spacing-2xl')}`}
        gap={sys('spacing-sm')}
        height={32}
      >
        <span
          style={{
            ...unbound('tile-caption'),
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            padding: '8px 0',
            margin: '-8px 0',
          }}
        >
          {category}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: sys('spacing-sm'), flex: 'none' }}>
          <span style={unbound('tile-label')}>{number}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: sys('spacing-xs') }}>
            <span style={unbound('tile-note')}>(</span>
            <span style={unbound('tile-label')}>{stock}</span>
            <span style={unbound('tile-note')}>{stockUnit}</span>
            <span style={unbound('tile-note')}>)</span>
          </span>
        </span>
      </Band>
    )}

    {/* ── The ticket face. A picture at its own proportions — never stretched. ── */}
    <img
      src={face}
      alt={faceAlt}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />

    {/* ── Type=Set: the flag pinned down the left of the face. `…;14291:138152` ── */}
    {type === 'set' && setSize && setPrize && (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 32,
          height: 84,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: HOME.tileBandDark,
          borderTopLeftRadius: HOME_RADIUS.tile,
          color: HOME.tileForeground,
        }}
      >
        <Flag label={setSize.label} value={setSize.value} unit={setSize.unit} />
        <div style={{ marginTop: -2 }}>
          <Flag value={setPrize.value} unit={setPrize.unit} />
        </div>
      </div>
    )}

    {/* ── Type=Select: the buy row. `…;14291:138135`, 40 tall, 6/16 pad ── */}
    {type === 'select' && (
      <Band background={HOME.tileBandDark} padding={`${sys('spacing-md')} ${sys('spacing-2xl')}`} gap={sys('spacing-lg')}>
        <span style={unbound('tile-label')}>{buyLabel}</span>
        <button
          type="button"
          onClick={onQuantityClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: sys('spacing-lg'),
            padding: `0 ${sys('spacing-lg')}`,
            // `Frame 43584` is 30 tall inside a 28-tall row, drawn at y=-1: the chip
            // overflows the row rather than growing it, which is what keeps the band at 40.
            height: 30,
            marginTop: -1,
            marginBottom: -1,
            border: 'none',
            borderRadius: sys('radius-sm'),
            background: HOME.tileChipBackground,
            color: HOME.tileChipForeground,
            font: 'inherit',
            cursor: 'pointer',
          }}
        >
          <span style={unbound('tile-label')}>{quantity}</span>
          <Icon name="arrow-down-S" size="sm" color="secondary" />
        </button>
        <span style={unbound('tile-label')}>{quantityUnit}</span>
      </Band>
    )}

    {/* ── The cart band. 40 tall, 8/16 pad, and the card's bottom corners. ── */}
    <Band
      background={HOME.tileBandCart}
      padding={`${sys('spacing-lg')} ${sys('spacing-2xl')}`}
      gap={sys('spacing-lg')}
      onClick={onAddToCart}
    >
      <Icon name="outline-cart" size="md" color="onBg" />
      <span style={unbound('tile-label')}>{cartLabel}</span>
    </Band>
  </article>
);

export default LotteryTile;
