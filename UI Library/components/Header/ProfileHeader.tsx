import React from 'react';
import '../../foundations/tokens.css';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import Avatar from '../Avatar/Avatar';
import {
  HEADER,
  HeaderAction,
  PROFILE_HEADER,
  PROFILE_AVATAR_SIZE,
  type ProfileHeaderType,
} from './tokens-bridge';
import './Header.css';

export interface ProfileHeaderProps {
  /** Which control sits on the right. Figma's `type` axis. */
  type?: ProfileHeaderType;

  /** Display name, or the greeting when nobody is signed in. */
  name: React.ReactNode;
  /** Member id. Omitted for a signed-out header, which shows `action` instead. */
  memberId?: React.ReactNode;
  /** The line under the name when signed out — "เข้าสู่ระบบ / สมัครสมาชิก". */
  action?: React.ReactNode;

  /** Photo for the avatar. Without one the avatar falls back to the guest treatment. */
  avatarSrc?: string;
  /** Show the camera affordance on the avatar. Figma turns it on for the guest states. */
  avatarEditable?: boolean;

  /** Label on the show/hide pill beside the id. Omit and the pill disappears. */
  pillLabel?: React.ReactNode;
  /** Glyph inside the pill — an eye, open or struck through. */
  pillIcon?: string;
  onPillClick?: () => void;

  /**
   * Figma's `login+view` state: a copy affordance between the id and the pill, drawn
   * once the id is revealed. `login+no-active` carries the same node with `visible` off
   * and `login+actived` does not draw it at all, so it is off by default.
   */
  showCopy?: boolean;
  onCopyClick?: () => void;

  /** Unread count for `type="nokplus"`. Omit for the plain bell. */
  notiCount?: number;
  /** Replaces the whole right well. */
  actionRight?: React.ReactNode;
  onMenuClick?: () => void;
  /**
   * Figma's `actived` state: while the menu is open the right well carries `filled-close`
   * rather than `filled-navigation`. Both `login+actived` and `no-log-in+actived` draw it.
   */
  menuOpen?: boolean;
  onNameClick?: () => void;

  className?: string;
}

/**
 * ProfileHeader — Lotteryplus Design System
 *
 * Figma component set `header-bar-profile-moblie` (14962:94338), nine variants across
 * `type` (lottery | nokplus) and `state` (signed in or out, and how the id is shown).
 *
 * Figma models this as its own set rather than a `type` on `header-bar-mobile`, so it is
 * its own component here. The two share the `topfoot` colour group; the show/hide pill
 * borrows `colors/profile/profile-fg-dark-red`, the one token that does not.
 *
 * `state` is not a prop. Figma's nine variants are combinations of things this component
 * already takes separately — whether there is an id, whether the pill is shown, whether
 * the id is revealed, whether the menu is open, whether there is a count — so modelling
 * it as an axis would mean nine props that contradict each other.
 *
 * The icons are the ones Figma instantiates, read variant by variant on 2026-08-21 and
 * recorded in `top-and-footer.json` under `base._figma_icons`. `filled-user` is absent
 * here on purpose: Figma draws it inside the guest `avatar` instance, so Avatar owns it.
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  type = 'lottery',
  name,
  memberId,
  action,
  avatarSrc,
  avatarEditable = false,
  pillLabel,
  pillIcon = 'outline-eye',
  onPillClick,
  showCopy = false,
  onCopyClick,
  notiCount,
  actionRight,
  onMenuClick,
  menuOpen = false,
  onNameClick,
  className = '',
}) => {
  const right =
    actionRight ??
    (type === 'nokplus' ? (
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <Icon name="outline-notification" size="lg" color="onBg" aria-label="แจ้งเตือน" />
        {notiCount !== undefined && (
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              minWidth: PROFILE_HEADER.badgeSize,
              height: PROFILE_HEADER.badgeSize,
              padding: `0 ${PROFILE_HEADER.badgePaddingX}`,
              borderRadius: PROFILE_HEADER.badgeRadius,
              background: PROFILE_HEADER.badgeBackground,
              color: PROFILE_HEADER.badgeForeground,
              fontSize: PROFILE_HEADER.badgeTextSize,
              lineHeight: PROFILE_HEADER.badgeLineHeight,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
            }}
          >
            {notiCount}
          </span>
        )}
      </span>
    ) : (
      <HeaderAction
        icon={menuOpen ? 'filled-close' : 'filled-navigation'}
        label={menuOpen ? 'ปิดเมนู' : 'เมนู'}
        onClick={onMenuClick}
      />
    ));

  return (
    <header
      className={`ltp-header ltp-header--profile ltp-header--${type} ${className}`}
      style={{
        width: '100%',
        height: PROFILE_HEADER.height,
        alignItems: 'center',
        gap: PROFILE_HEADER.gap,
        padding: `0 ${PROFILE_HEADER.paddingX}`,
        background: HEADER.background,
        color: HEADER.foreground,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: PROFILE_HEADER.gap, flex: 1, minWidth: 0 }}>
        <Avatar
          type={avatarSrc ? 'member' : 'guest'}
          surface="red"
          size={PROFILE_AVATAR_SIZE}
          src={avatarSrc}
          alt={typeof name === 'string' ? name : undefined}
          showEdit={avatarEditable}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: PROFILE_HEADER.stackGap,
            padding: `${PROFILE_HEADER.stackPaddingY} 0`,
            minWidth: 0,
            flex: 1,
          }}
        >
          <button
            type="button"
            onClick={onNameClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              padding: 0,
              border: 'none',
              background: 'transparent',
              color: 'inherit',
              cursor: onNameClick ? 'pointer' : 'default',
              minWidth: 0,
              textAlign: 'left',
            }}
          >
            <span
              className="ltp-header__title"
              style={{
                fontSize: PROFILE_HEADER.nameSize,
                lineHeight: PROFILE_HEADER.nameLineHeight,
                fontWeight: PROFILE_HEADER.nameWeight,
              }}
            >
              {name}
            </span>
            {/* Figma hangs the 20px chevron off the name on the signed-in variants only.
                The no-log-in ones hold the greeting alone in `Frame 44468`. */}
            {memberId && <Icon name="arrow-right-S" size="sm" color="onBg" />}
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: PROFILE_HEADER.metaGap,
              fontSize: PROFILE_HEADER.metaSize,
              lineHeight: PROFILE_HEADER.metaLineHeight,
              fontWeight: PROFILE_HEADER.metaWeight,
              minWidth: 0,
            }}
          >
            {memberId ? <span>รหัสสมาชิก : {memberId}</span> : <span>{action}</span>}
            {memberId && showCopy && (
              <button
                type="button"
                onClick={onCopyClick}
                aria-label="คัดลอกรหัสสมาชิก"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  lineHeight: 0,
                  flex: 'none',
                }}
              >
                <Icon name="outline-document-copy" size="xs" color="onBg" />
              </button>
            )}
            {pillLabel && (
              <button
                type="button"
                onClick={onPillClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: PROFILE_HEADER.pillGap,
                  height: PROFILE_HEADER.pillHeight,
                  padding: `0 ${PROFILE_HEADER.pillPaddingX}`,
                  borderRadius: PROFILE_HEADER.pillRadius,
                  background: PROFILE_HEADER.pillBackground,
                  color: HEADER.foreground,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  lineHeight: 1,
                  flex: 'none',
                }}
              >
                <Icon name={pillIcon} size="xs" color="onBg" />
                {pillLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className="ltp-header__action"
        style={{ width: HEADER.actionSize, height: HEADER.actionSize }}
      >
        {right}
      </div>
    </header>
  );
};

export default ProfileHeader;
