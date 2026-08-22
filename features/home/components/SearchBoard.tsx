import React from 'react';
import '../../../ui/foundations/tokens.css';
import SearchCard, { type SearchCardProps } from '../../../ui/components/LottoBoard/SearchCard';
import { sys } from '../../../ui/foundations/tokens';
import { HOME, HOME_RADIUS } from './tokens';

/**
 * SearchBoard — Figma `main-home-card`, `type=search-card` (`21084:85041`)
 *
 * The near-white card the number search sits in: 266 tall, radius 16, 16 of padding top and
 * bottom and none at the sides, filled with a #FAFAFA → #FFFFFF gradient. Inside it is
 * `lotto-board-mobile Type=All`, which `ui/components/LottoBoard/SearchCard` already draws.
 *
 * The red apron: `Top-BG` (`21084:85034`) paints brand red to y=209 while the header stops
 * at 201, so the card's first 8px sit on red rather than on the page's grey. Figma achieves
 * that by letting the header overflow a fixed-height `Top-bar` frame; here the card carries
 * its own bleed, which keeps the shell's slots honest — a slot that says 154 is 154.
 *
 * Scope: feature — the frame is the home page's, not the search card's.
 */
export interface SearchBoardProps extends SearchCardProps {
  /** Height of the red that shows behind the card's top corners. Figma: 8. */
  bleed?: number;
  className?: string;
}

const SearchBoard: React.FC<SearchBoardProps> = ({ bleed = 8, className = '', ...card }) => (
  <div className={`ltp-search-board ${className}`} style={{ position: 'relative' }}>
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: bleed,
        background: HOME.sectionRed,
      }}
    />
    <div
      style={{
        position: 'relative',
        padding: `${sys('spacing-2xl')} 0`,
        borderRadius: HOME_RADIUS.searchBoard,
        background: `linear-gradient(to bottom, ${HOME.searchBoardFrom}, ${HOME.searchBoardTo})`,
      }}
    >
      <SearchCard {...card} />
    </div>
  </div>
);

export default SearchBoard;
