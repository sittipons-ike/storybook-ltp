import React from 'react';
import '../../foundations/tokens.css';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import LtpMark from './LtpMark';
import { HEADER } from './tokens';
import './Header.css';

/**
 * Figma's `type` property on `header-bar-mobile`.
 *
 * `main` is Figma's `type=type4` (23625:34736), added to the set on 2026-08-21: a 68-tall
 * bar with the page title on the left and the counters on the right. The Frontend draws
 * the same shape as `nav_big_title` at 96; Figma says 68 and Figma is the authority.
 *
 * The set spans two shell slots, which its name hides. `home` and `success` are headers —
 * the tall red block the Frontend renders behind `hasHeader`. `sub` is a top navbar — the
 * 56px bar the Frontend renders behind `hasTopNavbar`. They are kept in one component
 * because Figma models them as one set, and Figma is the structure authority; the slot
 * each belongs to is recorded here so a composition cannot get it wrong by accident.
 */
export type HeaderVariant = 'home' | 'main' | 'sub' | 'success';

/** Which AppShell slot each variant fills. Checked against `components/layout/index.tsx`. */
export const HEADER_VARIANT_SLOT: Record<HeaderVariant, 'header' | 'top-navbar'> = {
  home: 'header',
  success: 'header',
  main: 'top-navbar',
  sub: 'top-navbar',
};

export interface HeaderProps {
  /** Which of Figma's three header shapes to render. */
  variant?: HeaderVariant;

  /** Page title. Figma calls this `text-center`; `sub` centres it, `success` leads with it. */
  title?: React.ReactNode;
  /** The slogan the home header shows instead of a title. */
  slogan?: React.ReactNode;

  /** Left action well. `sub` defaults to a back arrow; the others leave it empty. */
  actionLeft?: React.ReactNode;
  /** Right action well — the hamburger on `home`, notifications on `sub`. */
  actionRight?: React.ReactNode;
  /** Called when the default back arrow is pressed. Ignored if `actionLeft` is given. */
  onBack?: () => void;

  /** Figma's `Show LTP logo`. On for `home` and `success`, which carry the app bar. */
  showLogo?: boolean;
  /** Figma's `DBD` — the registration badge. Off in Figma's default instance. */
  showDbd?: boolean;
  /** Figma's `show-bg`. Turning it off leaves the header transparent over the page. */
  showBackground?: boolean;
  /**
   * The watermark bird. Figma paints it on `home` and `success` and hides it on `sub`,
   * so the default follows the variant unless this is set.
   */
  phoenix?: boolean;

  /** `success` only — the label and value of the order number row. */
  metaLabel?: React.ReactNode;
  metaValue?: React.ReactNode;
  /** `success` only — the glyph before the title. */
  successIcon?: React.ReactNode;

  className?: string;
}

const PHOENIX_SRC = '/brand/phoenix-logo.png';
/**
 * The Thai wordmark. Figma draws it as a 246×31 vector inside the header's `heading`
 * frame; served here as the same raster the Frontend ships, because the design system owns
 * a copy rather than reaching into the Frontend's public folder.
 */
const WORDMARK_SRC = '/brand/ltpplus-w_logo-flat.png';

/**
 * The watermark bird, bled off the header's right and bottom edges and clipped.
 *
 * Every number here is measured per variant: Figma gives it a different box and offset on
 * `home` than on `success`, hides it on `sub`, sets it to 70% and composites it with
 * HARD_LIGHT so it catches the gradient behind rather than sitting flat on top.
 */
const Phoenix: React.FC<{
  width: string;
  height: string;
  right: string;
  bottom: string;
}> = ({ width, height, right, bottom }) => (
  <img
    src={PHOENIX_SRC}
    alt=""
    aria-hidden
    className="ltp-header__phoenix"
    style={{
      width,
      height,
      right,
      bottom,
      opacity: HEADER.phoenixOpacity,
      mixBlendMode: HEADER.phoenixBlend as React.CSSProperties['mixBlendMode'],
    }}
  />
);

/** The 36×36 well either action sits in. Empty is a valid state — it holds the gap open. */
const ActionWell: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="ltp-header__action" style={{ width: HEADER.actionSize, height: HEADER.actionSize }}>
    {children}
  </div>
);

/**
 * The control both action wells hold. Figma fills them with the same instance on every
 * variant — `button` Size=M, Type=Tertiary, icon only: 36×36, radius-lg, 6px of padding
 * around a 24px glyph.
 *
 * The border is not part of that instance, it is a property of it. Figma keeps the same
 * 1px white stroke on all three wells and switches `visible` off on exactly one: the back
 * arrow (14924:3521). The hamburger on `sub` (14924:5615) and on `home` (21282:140842)
 * both keep it. Reading `strokeWeight: 1` without reading `visible` is how the back arrow
 * ended up in a box it never had.
 */
export const HeaderAction: React.FC<{
  icon: string;
  label: string;
  onClick?: () => void;
  /** Figma's stroke visibility on this well. Off only for the back arrow. */
  bordered?: boolean;
}> = ({ icon, label, onClick, bordered = true }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="ltp-header__action-button"
    style={{
      width: HEADER.actionSize,
      height: HEADER.actionSize,
      padding: HEADER.actionPadding,
      borderRadius: HEADER.actionRadius,
      border: 'none',
      // Figma's stroke is strokeAlign INSIDE: it paints over the frame without taking
      // space from it, so the 24px glyph still gets all 24px between the 6px paddings.
      // A CSS `border` under border-box eats two of them and crops the glyph, so the
      // stroke is drawn as an inset shadow instead — the same translation Avatar uses.
      boxShadow: bordered ? `inset 0 0 0 ${HEADER.actionBorderWidth} ${HEADER.foreground}` : undefined,
      color: HEADER.foreground,
    }}
  >
    <Icon name={icon} size="md" color="inherit" />
  </button>
);

/**
 * Header — Lotteryplus Design System
 *
 * Figma component set `header-bar-mobile` (14924:2118). Four variants, and the page
 * template in `Guidline-UI Template › Layout` says which goes where: `home` on a
 * destination reached from the tab bar, `sub` on anything reached another way.
 *
 * The Frontend splits the same job across two files — `components/header` draws the tall
 * red slogan block and `components/navbar/compact-navbar` draws the short bar with the
 * back arrow. Figma models them as one component with a `type` property, and the Standard
 * makes Figma the structure, so they are one component here.
 */
const Header: React.FC<HeaderProps> = ({
  variant = 'home',
  title,
  slogan,
  actionLeft,
  actionRight,
  onBack,
  showLogo,
  showDbd = false,
  showBackground = true,
  phoenix,
  metaLabel,
  metaValue,
  successIcon,
  className = '',
}) => {
  const showPhoenix = phoenix ?? variant !== 'sub';
  const withLogo = showLogo ?? variant !== 'sub';
  const background = showBackground ? HEADER.background : 'transparent';

  const base: React.CSSProperties = {
    width: '100%',
    background,
    color: HEADER.foreground,
    fontFamily: 'inherit',
  };

  const AppBar = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: HEADER.appbarHeight,
        flex: 'none',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {withLogo ? <LtpMark size={HEADER.logoSize} /> : <span />}
      {/* Figma's `Frame 1000012514`: a 12px-gap row holding whatever the page puts on the
          right — counters, chips, the hamburger. Not an action well; the app bar's right
          side is a row, and only the sub-page variant has fixed 36px wells. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: HEADER.appbarGap }}>
        {showDbd && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: HEADER.appbarHeight,
              padding: `0 ${HEADER.subGap}`,
              borderRadius: HEADER.actionRadius,
              background: HEADER.foreground,
              color: HEADER.background,
              // sub-title/lg/medium — the same 14 the badge always drew, from a real
              // role now that the subtitle literal it borrowed is gone.
              fontSize: HEADER.sloganSize,
              fontWeight: HEADER.titleWeight,
            }}
          >
            DBD
          </span>
        )}
        {actionRight}
      </div>
    </div>
  );

  if (variant === 'home') {
    return (
      <header
        className={`ltp-header ltp-header--home ${className}`}
        style={{
          ...base,
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: HEADER.homeHeight,
          padding: `${HEADER.homePaddingTop} ${HEADER.homePaddingX} ${HEADER.homePaddingBottom}`,
          gap: HEADER.homeGap,
        }}
      >
        {showPhoenix && (
          <Phoenix
            width={HEADER.homePhoenixWidth}
            height={HEADER.homePhoenixHeight}
            right={HEADER.homePhoenixRight}
            bottom={HEADER.homePhoenixBottom}
          />
        )}
        {AppBar}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {title ? (
            <p
              className="ltp-header__title"
              style={{
                fontSize: HEADER.titleSize,
                lineHeight: HEADER.titleLineHeight,
                fontWeight: HEADER.titleWeight,
              }}
            >
              {title}
            </p>
          ) : (
            <>
              {/* Figma's `Frame 1000012509` — a 32px row around a 31px wordmark. */}
              <span style={{ display: 'flex', alignItems: 'center', height: HEADER.wordmarkRowHeight }}>
                <img
                  src={WORDMARK_SRC}
                  alt="Lotteryplus"
                  style={{
                    display: 'block',
                    width: HEADER.wordmarkWidth,
                    height: HEADER.wordmarkHeight,
                  }}
                />
              </span>
              <p
                className="ltp-header__slogan"
                style={{
                  fontSize: HEADER.sloganSize,
                  lineHeight: HEADER.sloganLineHeight,
                  fontWeight: HEADER.sloganWeight,
                }}
              >
                {slogan ?? 'จำหน่ายสลากกินแบ่งรัฐบาล ที่ถูกต้องตามกฎหมาย'}
              </p>
            </>
          )}
        </div>
      </header>
    );
  }

  if (variant === 'success') {
    return (
      <header
        className={`ltp-header ltp-header--success ${className}`}
        style={{
          ...base,
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: HEADER.successHeight,
          padding: HEADER.successPadding,
          gap: HEADER.successGap,
        }}
      >
        {showPhoenix && (
          <Phoenix
            width={HEADER.successPhoenixWidth}
            height={HEADER.successPhoenixHeight}
            right={HEADER.successPhoenixRight}
            bottom={HEADER.successPhoenixBottom}
          />
        )}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: HEADER.successGap,
          }}
        >
          {successIcon}
          <span
            className="ltp-header__title"
            style={{
              fontSize: HEADER.successTitleSize,
              lineHeight: HEADER.successTitleLineHeight,
              fontWeight: HEADER.successTitleWeight,
            }}
          >
            {title}
          </span>
        </div>
        {(metaLabel || metaValue) && (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: HEADER.successGap,
              fontSize: HEADER.successMetaSize,
              lineHeight: HEADER.successMetaLineHeight,
            }}
          >
            <span>{metaLabel}</span>
            <span style={{ fontWeight: HEADER.titleWeight }}>{metaValue}</span>
          </div>
        )}
      </header>
    );
  }

  if (variant === 'main') {
    return (
      <header
        className={`ltp-header ltp-header--main ${className}`}
        style={{
          ...base,
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: HEADER.mainHeight,
          padding: HEADER.mainPadding,
          gap: HEADER.mainGap,
        }}
      >
        {/* Figma's `heading` column. Both it and the app bar grow, so the title takes
            whatever the counters leave rather than a width of its own. */}
        <p
          className="ltp-header__title"
          style={{
            flex: 1,
            minWidth: 0,
            textAlign: 'left',
            fontSize: HEADER.mainTitleSize,
            lineHeight: HEADER.mainTitleLineHeight,
            fontWeight: HEADER.mainTitleWeight,
          }}
        >
          {title}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: HEADER.appbarGap,
            flex: 1,
            minWidth: 0,
          }}
        >
          {actionRight}
        </div>
      </header>
    );
  }

  return (
    <header
      className={`ltp-header ltp-header--sub ${className}`}
      style={{
        ...base,
        alignItems: 'center',
        height: HEADER.subHeight,
        padding: `0 ${HEADER.subPaddingX}`,
        gap: HEADER.subGap,
      }}
    >
      {showPhoenix && (
        <Phoenix
          width={HEADER.homePhoenixWidth}
          height={HEADER.homePhoenixHeight}
          right={HEADER.homePhoenixRight}
          bottom={HEADER.homePhoenixBottom}
        />
      )}
      <ActionWell>
        {actionLeft ?? (
          <HeaderAction icon="arrow-left-L" label="ย้อนกลับ" onClick={onBack} bordered={false} />
        )}
      </ActionWell>
      {/* Figma's `heading` frame: 16 of vertical padding around a 24px title line.
          Figma also draws a hidden subtitle layer in here (งวดวันที่ …); the product never
          shows it, so it is not modelled — decided with the user 2026-08-21. */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: HEADER.subHeadingPaddingY,
          paddingBottom: HEADER.subHeadingPaddingY,
        }}
      >
        <p
          className="ltp-header__title"
          style={{
            fontSize: HEADER.titleSize,
            lineHeight: HEADER.titleLineHeight,
            fontWeight: HEADER.titleWeight,
            // No fixed height: line-height already sets the 24px line, and a fixed
            // height would re-shrink the padded clip box the CSS just grew.
          }}
        >
          {title}
        </p>
      </div>
      <ActionWell>{actionRight}</ActionWell>
    </header>
  );
};

export default Header;
