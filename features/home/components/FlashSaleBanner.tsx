import React from 'react';
import '../../../ui/foundations/tokens.css';
import Text from '../../../ui/components/Text/Text';
import { sys } from '../../../ui/foundations/tokens';
import CountdownPanel, { type CountdownUnit } from './CountdownPanel';

/**
 * FlashSaleBanner — Figma `Frame 43608` + `Frame 43604` (`21084:85070`, `21084:85076`)
 *
 * What heads the first lottery section instead of a title: the นาทีทอง artwork, the line
 * `เพียง 1,000 ชุดเท่านั้น` pulled up into it, and the four countdown blocks 16 below.
 *
 * Two things Figma states that a hugging box would not reproduce:
 *
 *   `itemSpacing: -8`  the note overlaps the artwork rather than following it — a negative
 *                      gap, which CSS has no word for, so it is a negative margin
 *   height 193 fixed   the frame is shorter than its contents (167.14 − 8 + 36 = 195.14).
 *                      `clipsContent` is false, so the overflow shows; only the space the
 *                      frame claims is 193, which is what the section's 763 is built from
 */
export interface FlashSaleBannerProps {
  /** The artwork, 390 x 167. `Headline_V6 2` — `21084:85073` */
  headline: string;
  headlineAlt: string;
  note: string;
  countdown: CountdownUnit[];
  className?: string;
}

const FlashSaleBanner: React.FC<FlashSaleBannerProps> = ({
  headline,
  headlineAlt,
  note,
  countdown,
  className = '',
}) => (
  <div
    className={`ltp-flash-sale ${className}`}
    style={{ display: 'flex', flexDirection: 'column', gap: sys('spacing-2xl') }}
  >
    <div style={{ height: 193, display: 'flex', flexDirection: 'column' }}>
      <img src={headline} alt={headlineAlt} style={{ display: 'block', width: '100%', height: 'auto' }} />
      <Text role="heading-h3-semibold" tone="on-bgcolor" as="p" align="center" style={{ marginTop: -8 }}>
        {note}
      </Text>
    </div>
    <CountdownPanel units={countdown} label="เวลาที่เหลือของนาทีทอง" />
  </div>
);

export default FlashSaleBanner;
