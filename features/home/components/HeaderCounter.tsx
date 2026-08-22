import React from 'react';
import '../../../ui/foundations/tokens.css';
import Icon from '../../../ui/icons/Icon';
import '../../../ui/icons/icon-data';
import { sys } from '../../../ui/foundations/tokens';

/**
 * HeaderCounter — Figma `Button / CTA Button / Medium` inside `appbar-main` (`21282:140831`)
 *
 * The nok-cash and lottery counts in the home header: a 24 icon and a `button/md/semibold`
 * number, 4 apart, in white on the red bar. Figma models it as a button frame with its fill
 * turned off (`visible: false`), so there is no chip — an icon and a number.
 *
 * It lives here rather than in the Header story because the shell in `Home.stories.tsx`
 * needs it and `check-pages.py` holds `pages/*` — stories included — to composing: a story
 * may not name a token, and a counter is nothing but tokens.
 */
export interface HeaderCounterProps {
  /** `outline-NokPoints-W` for nok cash, `outline-Lottery` for the ticket count. */
  icon: string;
  value: string;
  label: string;
  onClick?: () => void;
}

const HeaderCounter: React.FC<HeaderCounterProps> = ({ icon, value, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`${label} ${value}`}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: sys('spacing-sm'),
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: onClick ? 'pointer' : 'default',
      color: sys('color-text-on-bgcolor'),
      fontFamily: sys('type-button-md-semibold-family'),
      fontSize: sys('type-button-md-semibold-size'),
      lineHeight: sys('type-button-md-semibold-line-height'),
      fontWeight: sys('type-button-md-semibold-weight') as unknown as React.CSSProperties['fontWeight'],
    }}
  >
    <Icon name={icon} size="md" color="onBg" />
    {value}
  </button>
);

export default HeaderCounter;
