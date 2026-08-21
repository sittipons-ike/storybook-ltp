import React from 'react';
import '../../foundations/tokens.css';
import Logo from '../../logos/Logo';
import {
  LOTTERY_CARD,
  lotteryCardFace,
  lotteryCardSize,
  lotteryCardSizeValue,
  type LotteryCardSize,
} from './tokens';

export interface LotteryCardProps {
  /** Figma's `Size` axis. `s` carries no id — Figma draws none at that size. */
  size?: LotteryCardSize;
  /** Member id printed on the face. Ignored at size `s`. */
  id?: string;
  /** Accessible name for the card face. */
  alt?: string;
  className?: string;
}

/**
 * LotteryCard — Lotteryplus Design System
 *
 * Figma's `Card` (14591:60095): a card face with an id printed on it, at three fixed sizes.
 *
 * The face is a raster, and Figma uses a different one per size rather than scaling a
 * single image — so the component picks the matching file instead of resizing. The id is
 * positioned absolutely because that is how Figma places it; the two offsets are not the
 * same fraction of the card, so they cannot be derived from one another.
 */
const LotteryCard: React.FC<LotteryCardProps> = ({
  size = 'l',
  id,
  alt = 'บัตรลอตเตอรี่พลัส',
  className = '',
}) => {
  const box = lotteryCardSize(size);
  const px = lotteryCardSizeValue(size);
  const showId = size !== 's' && !!id;

  return (
    <div
      className={`ltp-lottery-card ltp-lottery-card--${size} ${className}`}
      style={{
        position: 'relative',
        width: box.width,
        height: box.height,
        flex: 'none',
      }}
    >
      {/* The faces are 326x205, 154x96 and 76x48 — not square, so both axes are stated. */}
      <Logo
        name={lotteryCardFace(size)}
        alt={alt}
        width={px.width}
        height={px.height}
        className="ltp-lottery-card__face"
      />

      {showId && (
        <div
          style={{
            position: 'absolute',
            left: box.idX,
            top: box.idY,
            display: 'flex',
            alignItems: 'center',
            gap: LOTTERY_CARD.idGap,
            color: LOTTERY_CARD.idForeground,
            fontSize: LOTTERY_CARD.idSize,
            lineHeight: LOTTERY_CARD.idLineHeight,
            fontWeight: LOTTERY_CARD.idWeight as unknown as React.CSSProperties['fontWeight'],
          }}
        >
          <span>ID :</span>
          <span>{id}</span>
        </div>
      )}
    </div>
  );
};

export default LotteryCard;
