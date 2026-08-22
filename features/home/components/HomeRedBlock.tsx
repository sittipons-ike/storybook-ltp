import React from 'react';
import '../../../ui/foundations/tokens.css';
import { sys } from '../../../ui/foundations/tokens';
import { HOME, HOME_RADIUS } from './tokens';

/**
 * HomeRedBlock — Figma `Lottery` (`21084:85067` and `21084:85173`)
 *
 * The brand-red ground the lottery sections and the service card sit on. Two shapes, both
 * measured 2026-08-22:
 *
 *   sections   radius 24 on the top corners only, 32 between children, 32 below
 *   flat       no radius, 16 above, 32 between children, 32 below
 *
 * It exists so the page never says "red". `check-pages.py` refuses a page that names a
 * colour, and it is right to: the section background is a decision the design system owns,
 * not a string a page repeats.
 */
export interface HomeRedBlockProps {
  children?: React.ReactNode;
  /**
   * The second block — the one under the SEO copy — has square corners and 16 of room above
   * rather than a rounded lip. `21084:85173`
   */
  flat?: boolean;
  className?: string;
}

const HomeRedBlock: React.FC<HomeRedBlockProps> = ({ children, flat = false, className = '' }) => (
  <div
    className={`ltp-home-red-block ${flat ? 'ltp-home-red-block--flat' : ''} ${className}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: sys('spacing-5xl'),
      paddingTop: flat ? sys('spacing-2xl') : undefined,
      paddingBottom: sys('spacing-5xl'),
      background: HOME.sectionRed,
      borderTopLeftRadius: flat ? undefined : HOME_RADIUS.section,
      borderTopRightRadius: flat ? undefined : HOME_RADIUS.section,
    }}
  >
    {children}
  </div>
);

export default HomeRedBlock;
