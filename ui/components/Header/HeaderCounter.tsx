import React from 'react';
import '../../foundations/tokens.css';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import { sys } from '../../foundations/tokens';

/**
 * HeaderCounter — Figma `Button / CTA Button / Medium` inside `appbar-main` (`21282:140831`)
 *
 * The nok-cash and lottery counts in the home header: a 24 icon and a `button/md/semibold`
 * number, 4 apart, in white on the red bar. Figma models it as a button frame with its fill
 * turned off (`visible: false`), so there is no chip — an icon and a number.
 *
 * It lives beside Header because Figma draws it inside `header-bar-mobile`, and the home
 * instance on `/` (`21282:143458`) overrides nothing. It was briefly a feature component,
 * which was the wrong home for the same reason the footer's glyphs were: artwork that is
 * part of a component is not the page's to re-supply.
 *
 * The *values* are the page's, though — a balance and a ticket count are per-member — so
 * Header takes the assembled row as `actionRight` rather than owning the numbers. What the
 * component owns is which icon, which type role, and the 4 between them.
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
