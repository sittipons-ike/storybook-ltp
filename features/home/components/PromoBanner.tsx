import React from 'react';
import '../../../ui/foundations/tokens.css';
import { sys } from '../../../ui/foundations/tokens';
import CarouselDots from './CarouselDots';

/**
 * PromoBanner — Figma `Banner Promote` (`22244:118794`)
 *
 * A 358-wide banner inside 16 of side padding, 16 above a row of carousel dots — 96 + 16 + 8
 * makes the block's 120.
 *
 * The banner itself is artwork: `Home-Banner` (`22244:118800`) is a radius-16 card with a
 * two-stop gradient, a 258 x 260 radial glow bleeding past its own frame, four isolation
 * groups of birds and two gradient-filled headlines. It is also the slot the Frontend fills
 * from the banner API. Both facts point the same way — it is a picture with a link, so it
 * is one `<img>` and its `alt` carries the words.
 *
 * With more than one banner the dots appear; with one they do not, because a single dot is
 * a control that cannot be used.
 */
export interface Promo {
  src: string;
  alt: string;
  href?: string;
  onClick?: () => void;
}

export interface PromoBannerProps {
  banners: Promo[];
  /** Which banner is showing. The page does not animate; a story picks one. */
  active?: number;
  className?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ banners, active = 0, className = '' }) => {
  if (banners.length === 0) return null;
  const shown = banners[Math.min(active, banners.length - 1)];
  const picture = (
    <img src={shown.src} alt={shown.alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
  );

  return (
    <div
      className={`ltp-promo-banner ${className}`}
      style={{ display: 'flex', flexDirection: 'column', gap: sys('spacing-2xl') }}
    >
      <div style={{ padding: `0 ${sys('spacing-2xl')}` }}>
        {shown.href || shown.onClick ? (
          <a href={shown.href} onClick={shown.onClick} style={{ display: 'block' }}>
            {picture}
          </a>
        ) : (
          picture
        )}
      </div>
      {banners.length > 1 && <CarouselDots count={banners.length} active={active} />}
    </div>
  );
};

export default PromoBanner;
