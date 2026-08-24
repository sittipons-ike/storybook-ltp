import React from 'react';
import '../../foundations/tokens.css';
import { sys } from '../../foundations/tokens';
import { asset } from '../../foundations/asset';
import { FOOTER } from './tokens';
import './Footer.css';

export interface FooterSocial {
  /** Accessible name for the channel. */
  label: string;
  href?: string;
  /**
   * The channel's own brand colour. Deliberately not a design token: Facebook blue is
   * Facebook's, and pinning it to a Lotteryplus token would make it drift with the brand.
   */
  color: string;
  icon?: React.ReactNode;
}

export interface FooterChip {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

export interface FooterProps {
  /** Heading above the social row. */
  followLabel?: React.ReactNode;
  /** Defaults to the five channels Figma draws. Pass a list to override. */
  socials?: FooterSocial[];
  /** The white chips along the bottom. Defaults to Figma's visitor count and DBD mark. */
  chips?: FooterChip[];
  /** The number on the visitor chip. Ignored once `chips` is passed. */
  visitorCount?: string;
  className?: string;
}

/**
 * The glyph inside a social tile.
 *
 * Served out of `ui/assets/brand` through `asset()`, the same route the header's phoenix and
 * wordmark take: nothing rewrites a `staticDirs` path, so it has to resolve against
 * `import.meta.env.BASE_URL` or it works on localhost and 404s under GitHub Pages' `/<repo>/`.
 */
const glyph = (file: string) => (
  <img
    src={asset(`brand/${file}`)}
    alt=""
    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

/**
 * `Frame 43983` (`14291:133486`) — the five channels, their tiles' own fills, in order.
 *
 * These are defaults rather than a story's fixture because they are the component: the
 * glyphs live inside `footer-mobile` in Figma, and the home page's instance overrides none
 * of them. The stories used to stand in unrelated icons — a bell for Facebook, a tick for
 * TikTok — which resolved fine and drew the wrong thing, exactly the failure `icon "resolve
 * ได้" ไม่ได้แปลว่า "ตรง Figma"` describes.
 *
 * The colours stay literals for the reason `FooterSocial.color` gives.
 */
export const FOOTER_SOCIALS: readonly FooterSocial[] = [
  { label: 'Facebook', color: '#337FFF', icon: glyph('footer-social-facebook.svg') },
  { label: 'TikTok', color: '#000000', icon: glyph('footer-social-tiktok.svg') },
  { label: 'X', color: '#000000', icon: glyph('footer-social-x.svg') },
  { label: 'LINE', color: '#3ACE01', icon: glyph('footer-social-line.svg') },
  { label: 'YouTube', color: '#FF0000', icon: glyph('footer-social-youtube.svg') },
];

/** `Frame 43624` (`14291:133509`) — two 171 x 48 chips: the live counter and the DBD mark. */
const defaultChips = (visitorCount: string): FooterChip[] => [
  {
    icon: (
      <img src={asset('brand/footer-visitors-icon.svg')} alt="" width={32} height={32} style={{ display: 'block' }} />
    ),
    label: (
      <span style={{ display: 'block' }}>
        {visitorCount}
        <br />
        ผู้เข้าชมปัจจุบัน
      </span>
    ),
  },
  {
    label: (
      <img
        src={asset('brand/footer-dbd-registered.png')}
        alt="จดทะเบียนพาณิชย์อิเล็กทรอนิกส์ กรมพัฒนาธุรกิจการค้า"
        style={{ display: 'block', width: 88, height: 'auto' }}
      />
    ),
  },
];

/**
 * Footer — Lotteryplus Design System
 *
 * Figma's `footer-mobile` (`14291:133483`), 390×190. It shares the shell's `footer` slot
 * with ActionBar; a page has one or the other, never both.
 *
 * `<Footer />` with no props draws what Figma draws. It did not before: the socials and
 * chips were required props with empty defaults, so the component rendered an empty red
 * band and each page had to re-supply artwork that belongs to the component. `/` did
 * exactly that, and its copy was the right one — this is that copy, moved to where it
 * belongs.
 *
 * Worth knowing before using it: the Frontend's `components/footer` returns null below
 * 1280px, so this mobile footer is designed but not currently shipped. Figma and the
 * Frontend genuinely disagree here, and the disagreement is recorded in patterns.json
 * rather than settled by this component.
 */
const Footer: React.FC<FooterProps> = ({
  followLabel = 'ติดตามเรา :',
  socials = FOOTER_SOCIALS as FooterSocial[],
  chips,
  visitorCount = '210,358',
  className = '',
}) => {
  const shownChips = chips ?? defaultChips(visitorCount);

  return (
  <footer
    className={`ltp-footer ${className}`}
    style={{
      background: FOOTER.background,
      color: FOOTER.foreground,
      paddingTop: FOOTER.paddingTop,
      paddingBottom: FOOTER.paddingBottom,
      gap: FOOTER.gap,
    }}
  >
    {socials.length > 0 && (
      <div className="ltp-footer__follow" style={{ gap: FOOTER.followGap }}>
        <p
          className="ltp-footer__follow-label"
          style={{
            fontSize: sys('type-body-md-semibold-size'),
            lineHeight: sys('type-body-md-semibold-line-height'),
            fontWeight: sys('type-body-md-semibold-weight'),
          }}
        >
          {followLabel}
        </p>
        <div className="ltp-footer__socials" style={{ gap: FOOTER.socialGap }}>
          {socials.map((s) => {
            const inner = (
              <span
                className="ltp-footer__social"
                style={{
                  width: FOOTER.socialSize,
                  height: FOOTER.socialSize,
                  padding: FOOTER.socialPadding,
                  borderRadius: FOOTER.socialRadius,
                  background: s.color,
                  color: FOOTER.foreground,
                }}
              >
                {s.icon}
              </span>
            );
            return s.href ? (
              <a key={s.label} href={s.href} aria-label={s.label}>
                {inner}
              </a>
            ) : (
              <span key={s.label} aria-label={s.label} role="img">
                {inner}
              </span>
            );
          })}
        </div>
      </div>
    )}

    {shownChips.length > 0 && (
      <div
        className="ltp-footer__chips"
        style={{ padding: `0 ${FOOTER.rowPaddingX}`, gap: FOOTER.rowGap }}
      >
        {shownChips.map((c, i) => {
          const style: React.CSSProperties = {
            height: FOOTER.chipHeight,
            padding: `${FOOTER.chipPaddingY} ${FOOTER.chipPaddingX}`,
            gap: FOOTER.chipGap,
            borderRadius: FOOTER.chipRadius,
            background: FOOTER.chipBackground,
            boxShadow: FOOTER.chipShadow,
            color: sys('color-text-secondary-default'),
            fontSize: sys('type-body-md-semibold-size'),
            lineHeight: sys('type-body-md-semibold-line-height'),
            fontWeight: sys('type-body-md-semibold-weight'),
          };
          const key = typeof c.label === 'string' ? c.label : String(i);
          return c.href ? (
            <a key={key} className="ltp-footer__chip" href={c.href} style={style}>
              {c.icon}
              {c.label}
            </a>
          ) : (
            <span key={key} className="ltp-footer__chip" style={style}>
              {c.icon}
              {c.label}
            </span>
          );
        })}
      </div>
    )}
  </footer>
  );
};

export default Footer;
