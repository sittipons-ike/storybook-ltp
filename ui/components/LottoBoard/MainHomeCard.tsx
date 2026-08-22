import React from 'react';
import '../../foundations/tokens.css';
import SearchCard, { type SearchCardProps } from './SearchCard';
import { lottoBoardRef } from './tokens';

/**
 * MainHomeCard — Figma `main-home-card` (`14854:33344`)
 *
 * The near-white card the number search sits in on the home page: 390×266, radius 16, 16 of
 * padding top and bottom and none at the sides, filled #FAFAFA → #FFFFFF. Inside it is
 * `lotto-board-mobile Type=All`, which `SearchCard` already draws.
 *
 * It belongs here rather than beside the page. Figma models it as a seven-variant component
 * set in the `lotto state` section — the same board with the state that replaced it —
 * and the instance on `/` (`21084:85041`) overrides nothing. Only `type=search-card` is
 * built; `lotto-board.json → _figma_gaps` lists the six that are not, with their heights,
 * rather than stubbing variants that would render an empty frame and read as done.
 *
 * The bleed: `Top-BG` (`21084:85034`) paints the page red to y=209 while the header stops at
 * 201, so the card's first 8px sit on red rather than on the page background. Figma achieves
 * that by letting the header overflow a fixed-height `Top-bar` frame; the card carries its
 * own bleed here instead, which keeps the shell's slots honest — a slot that says 154 is 154.
 */
export type MainHomeCardType = 'search-card';

export interface MainHomeCardProps extends SearchCardProps {
  /**
   * Which state the card is in. One value today; the type is the axis Figma declares, so a
   * page asking for a state nobody has built fails to compile rather than rendering nothing.
   */
  variant?: MainHomeCardType;
  /**
   * Height of the red that shows behind the card's top corners. Figma: 8. Pass `0` on a page
   * whose header does not leave an apron under it.
   */
  bleed?: number | string;
  className?: string;
}

const MainHomeCard: React.FC<MainHomeCardProps> = ({
  variant = 'search-card',
  bleed = lottoBoardRef('main-bleed-height'),
  className = '',
  ...card
}) => (
  <div className={`ltp-main-home-card ltp-main-home-card--${variant} ${className}`} style={{ position: 'relative' }}>
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: bleed,
        background: lottoBoardRef('main-bleed-background'),
      }}
    />
    <div
      style={{
        position: 'relative',
        padding: `${lottoBoardRef('main-padding-y')} 0`,
        borderRadius: lottoBoardRef('main-radius'),
        background: lottoBoardRef('main-gradient'),
      }}
    >
      <SearchCard {...card} />
    </div>
  </div>
);

export default MainHomeCard;
