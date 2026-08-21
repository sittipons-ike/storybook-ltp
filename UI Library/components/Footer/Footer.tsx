import React from 'react';
import '../../foundations/tokens.css';
import { sys } from '../../foundations/tokens';
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
  socials?: FooterSocial[];
  /** The white contact chips along the bottom. */
  chips?: FooterChip[];
  className?: string;
}

/**
 * Footer — Lotteryplus Design System
 *
 * Figma's `footer-mobile`, 390×190. It shares the shell's `footer` slot with ActionBar;
 * a page has one or the other, never both.
 *
 * Worth knowing before using it: the Frontend's `components/footer` returns null below
 * 1280px, so this mobile footer is designed but not currently shipped. Figma and the
 * Frontend genuinely disagree here, and the disagreement is recorded in patterns.json
 * rather than settled by this component.
 */
const Footer: React.FC<FooterProps> = ({
  followLabel = 'ติดตามเรา :',
  socials = [],
  chips = [],
  className = '',
}) => (
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

    {chips.length > 0 && (
      <div
        className="ltp-footer__chips"
        style={{ padding: `0 ${FOOTER.rowPaddingX}`, gap: FOOTER.rowGap }}
      >
        {chips.map((c, i) => {
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

export default Footer;
