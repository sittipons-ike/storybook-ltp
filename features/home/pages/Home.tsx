import React from 'react';
import Stack from '../../../ui/patterns/Stack/Stack';
import Footer from '../../../ui/components/Footer/Footer';
import SearchBoard from '../components/SearchBoard';
import HomeAdsRow, { type HomeAd } from '../components/HomeAdsRow';
import PromoBanner, { type Promo } from '../components/PromoBanner';
import LotterySection, { type LotterySectionProps } from '../components/LotterySection';
import FlashSaleBanner, { type FlashSaleBannerProps } from '../components/FlashSaleBanner';
import QuickMenuGrid, { type QuickMenuItem } from '../components/QuickMenuGrid';
import SeoPanel, { type SeoPanelProps } from '../components/SeoPanel';
import AddOnServiceCard, { type AddOnService } from '../components/AddOnServiceCard';
import HomeRedBlock from '../components/HomeRedBlock';

/**
 * _frontend_route: /
 * Figma:           [Mobile] Home — home-page(mobile) (21085:96373), 390 x 4651
 * Frontend page:   src/pages/index.tsx
 *
 * Built from Figma, node by node, on 2026-08-22. Where the Frontend and Figma disagree the
 * Figma node wins; where Figma is silent, `ux-home.md` says so rather than the code guessing.
 */

export interface HomePageProps {
  /** The number search at the top. Its state belongs to `SearchCard`. */
  onSearch?: (digits: string) => void;

  /** `Frame 1000013545` — the two ad tiles. */
  adFeature: HomeAd;
  adStacked: HomeAd[];

  /** `Banner Promote`. An empty array removes the block rather than leaving a gap. */
  promoBanners: Promo[];

  /** The นาทีทอง artwork and its countdown. Omit it once the sale is over. */
  flashSale?: Omit<FlashSaleBannerProps, 'className'>;

  /** The red block's sections, in order. The first one carries the flash sale. */
  sections: Omit<LotterySectionProps, 'banner'>[];

  quickMenu: QuickMenuItem[][];
  /** The four pieces Figma writes as two mixed-size text layers — see `SeoPanel`. */
  seo: Pick<SeoPanelProps, 'title' | 'subtitle' | 'lead' | 'body'>;
  addOnServices: AddOnService[];
}

/**
 * HomePage — /
 *
 * Every list arrives as a prop and nothing is fetched, so a section with no numbers, a
 * finished flash sale and a week with no banner are each one story rather than a state
 * nobody can reach.
 *
 * Spacing goes through `Stack`. A page may not name a token (`check-pages.py`): 78 pages
 * writing raw tokens is a rename nobody finishes. Colour and radius live in the feature's
 * own components, which is why the red block is `HomeRedBlock` rather than a `background`
 * written here.
 */
const HomePage: React.FC<HomePageProps> = ({
  onSearch,
  adFeature,
  adStacked,
  promoBanners,
  flashSale,
  sections,
  quickMenu,
  seo,
  addOnServices,
}) => {
  const [first, ...rest] = sections;

  return (
    <Stack gap="2xl">
      {/* ── main-home-card ─────────────────────────────────────────────────
          The search card, on the red the header leaves behind it. `21084:85041` */}
      <SearchBoard type="All" onSearch={onSearch} />

      {/* ── Frame 1000013549: the ad row and the promo banner. `22244:118772` ── */}
      <Stack gap="2xl">
        <HomeAdsRow feature={adFeature} stacked={adStacked} />
        <PromoBanner banners={promoBanners} />
      </Stack>

      {/* ── Frame 1000013528: everything below, with no gap between blocks. ──
          The red block's own 24 top corners are what separate it from the banner. */}
      <Stack gap="none">
        <HomeRedBlock>
          {first && (
            <LotterySection
              {...first}
              banner={flashSale && <FlashSaleBanner {...flashSale} />}
            />
          )}
          {rest.map((section) => (
            <LotterySection key={section.title} {...section} />
          ))}
        </HomeRedBlock>

        <QuickMenuGrid rows={quickMenu} />

        <SeoPanel title={seo.title} subtitle={seo.subtitle} lead={seo.lead} body={seo.body} />

        {/* ── Lottery (`21084:85173`): the service card on red, 16 above and 32 below ── */}
        <HomeRedBlock flat>
          <Stack paddingX="2xl" paddingY="none">
            <AddOnServiceCard services={addOnServices} />
          </Stack>
        </HomeRedBlock>

        {/* `footer-mobile` (`21084:85176`) — the instance overrides nothing, so the
            component's own defaults are what this page wants. */}
        <Footer />
      </Stack>
    </Stack>
  );
};

export default HomePage;
