import React from 'react';
import '../../../ui/foundations/tokens.css';
import { sys } from '../../../ui/foundations/tokens';
import { HOME } from './tokens';

/**
 * CarouselDots — Figma `Navigation` (`9005:33166`…`33168`)
 *
 * Three shapes in an 8-gap row: the page you are on is a 16 x 8 pill at radius 4 in brand
 * red, every other page is an 8 x 8 grey circle. Figma draws the set with three slots and
 * hides the ones a carousel does not need — the quick menu has two pages and its third dot
 * is `visible: false` — so the count is a prop here rather than three fixed dots.
 *
 * Scope: feature. Two carousels on this page use it; a second *page* has to before it
 * belongs in `ui/` (Lark Standard §3.3).
 */
export interface CarouselDotsProps {
  /** How many pages the carousel has. */
  count: number;
  /** Which one is showing, zero-based. */
  active?: number;
  /** Accessible name — a carousel with no label is a row of anonymous dots. */
  label?: string;
  className?: string;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
  count,
  active = 0,
  label = 'หน้าของแบนเนอร์',
  className = '',
}) => (
  <div
    className={`ltp-carousel-dots ${className}`}
    role="tablist"
    aria-label={label}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: sys('spacing-lg') }}
  >
    {Array.from({ length: count }, (_, i) => {
      const current = i === active;
      return (
        <span
          key={i}
          role="tab"
          aria-selected={current}
          aria-label={`หน้า ${i + 1}`}
          style={{
            width: current ? 16 : 8,
            height: 8,
            borderRadius: current ? sys('radius-sm') : sys('radius-full'),
            background: current ? HOME.dotActive : HOME.dotIdle,
          }}
        />
      );
    })}
  </div>
);

export default CarouselDots;
