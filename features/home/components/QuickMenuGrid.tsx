import React from 'react';
import '../../../ui/foundations/tokens.css';
import Text from '../../../ui/components/Text/Text';
import Logo from '../../../ui/logos/Logo';
import { sys } from '../../../ui/foundations/tokens';
import CarouselDots from './CarouselDots';

/**
 * QuickMenuGrid — Figma `menu-nok-more-mobile Var.2`, `Type=Default` (`21086:143142`)
 *
 * `บริการ` over two rows of five, then the carousel dots. 284 tall: a 40 heading row
 * (8/16 padding), two 94-tall rows 16 apart, and a 32 dots row with 16 above it and 8 below.
 *
 * Each item is a 72 x 72 mark over a 12/18 label, 4 apart, and the marks are already in the
 * library — `gp-nm-nokcash`, `gp-nm-nokshop`, `gp-nm-lottocheck`, `gp-nm-affiliate`,
 * `gp-nm-news`, `gp-nm-nokpoint`, `gp-nm-scancheck`, `gp-nm-howto`, `gp-nm-gift`,
 * `gp-nm-service`. Nothing new had to be exported for this block.
 *
 * Figma lays each row out 456 wide inside a 390 frame: the fifth item is cut off, which is
 * how a horizontally scrolling row is drawn on a fixed canvas. So the row scrolls here, and
 * the items keep their measured 72 rather than being squeezed to fit five in 390.
 */
export interface QuickMenuItem {
  /** A mark from `ui/assets/logos` — `gp-nm-*` on this page. */
  logo: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface QuickMenuGridProps {
  title?: string;
  /** One array per row. Figma draws two rows of five. */
  rows: QuickMenuItem[][];
  /**
   * How many pages the block scrolls through. Figma's `Navigation` instance is 32 wide with
   * its third dot `visible: false` — 16 + 8 gap + 8 — so the drawn state is two pages, not
   * three. Separate from `rows`: the rows are both on screen at once.
   */
  pages?: number;
  /** Which page of the carousel is showing. */
  active?: number;
  className?: string;
}

const Item: React.FC<{ item: QuickMenuItem }> = ({ item }) => (
  <a
    href={item.href}
    onClick={item.onClick}
    style={{
      width: 72,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: sys('spacing-sm'),
      textDecoration: 'none',
    }}
  >
    <Logo name={item.logo} alt="" width={72} height={72} />
    {/* Figma lets a label overrun its column rather than wrap — `ศูนย์ช่วยเหลือ` measures 73
        in a 72 slot and is drawn at x=-0.5. Wrapping it costs the row 18px and breaks the
        94 every item shares. `I21086:143142;21085:106397` */}
    <Text role="label-md-medium" tone="secondary" align="center" style={{ whiteSpace: 'nowrap' }}>
      {item.label}
    </Text>
  </a>
);

const QuickMenuGrid: React.FC<QuickMenuGridProps> = ({
  title = 'บริการ',
  rows,
  pages = 2,
  active = 0,
  className = '',
}) => (
  <section
    className={`ltp-quick-menu ${className}`}
    style={{ display: 'flex', flexDirection: 'column', paddingBottom: sys('spacing-lg') }}
  >
    <div style={{ padding: `${sys('spacing-lg')} ${sys('spacing-2xl')}` }}>
      <Text role="title-lg-semibold" tone="secondary" as="h2">
        {title}
      </Text>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: sys('spacing-2xl') }}>
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: sys('spacing-2xl'),
            padding: `0 ${sys('spacing-2xl')}`,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {row.map((item) => (
            <Item key={item.label} item={item} />
          ))}
        </div>
      ))}
    </div>

    {pages > 1 && (
      <div style={{ padding: `${sys('spacing-2xl')} 0 ${sys('spacing-lg')}` }}>
        <CarouselDots count={pages} active={active} label="หน้าของเมนูบริการ" />
      </div>
    )}
  </section>
);

export default QuickMenuGrid;
