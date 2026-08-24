import React from 'react';
import '../../../ui/foundations/tokens.css';
import { sys } from '../../../ui/foundations/tokens';

/**
 * HomeAdsRow — Figma `Frame 1000013545` (`22244:118774`)
 *
 * Two 175-wide columns, 8 apart, inside 16 of side padding: `จิ๊ดริดหยิบโชค` fills the left
 * at 112 tall, and the right stacks two 52-tall tiles 8 apart.
 *
 * Each tile is a picture rather than a composition. In Figma they are layered vectors,
 * rasters and gradient text — `Home-Ads` alone holds a `Hidden Box` instance, a 157 x 82
 * raster and a gradient headline — and none of it is content the page owns: the Frontend
 * pulls this row from the banner API, where a scheduler swaps the artwork weekly.
 * Redrawing that in React would be copying a picture by hand and then maintaining it.
 *
 * So a tile takes a `src` and an `alt`, and the alt carries what the picture says. No
 * `aspectRatio` is declared: the file's own proportions decide, which is what stopped
 * `/profile` stretching its banners 16% wide.
 */
export interface HomeAd {
  src: string;
  /** What the artwork says, since the words are inside it. */
  alt: string;
  href?: string;
  onClick?: () => void;
}

export interface HomeAdsRowProps {
  /** The tall tile on the left. */
  feature: HomeAd;
  /** The two short tiles stacked on the right, top first. */
  stacked: HomeAd[];
  className?: string;
}

const Tile: React.FC<{ ad: HomeAd }> = ({ ad }) => {
  const picture = (
    <img src={ad.src} alt={ad.alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
  );
  return ad.href || ad.onClick ? (
    <a href={ad.href} onClick={ad.onClick} style={{ display: 'block' }}>
      {picture}
    </a>
  ) : (
    picture
  );
};

const HomeAdsRow: React.FC<HomeAdsRowProps> = ({ feature, stacked, className = '' }) => (
  <div
    className={`ltp-home-ads-row ${className}`}
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: sys('spacing-lg'),
      padding: `0 ${sys('spacing-2xl')}`,
    }}
  >
    <div style={{ flex: 1, minWidth: 0 }}>
      <Tile ad={feature} />
    </div>
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: sys('spacing-lg') }}>
      {stacked.map((ad) => (
        <Tile key={ad.alt} ad={ad} />
      ))}
    </div>
  </div>
);

export default HomeAdsRow;
