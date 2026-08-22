import React from 'react';
import '../../foundations/tokens.css';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import { AVATAR, avatarBase, type AvatarSurface, type AvatarType } from './tokens';
import './Avatar.css';

export interface AvatarProps {
  /** Figma's `Type` axis. `illustration` needs artwork passed in — see `illustration`. */
  type?: AvatarType;
  /** Figma's `On bg Red` axis. The ring and the guest disc invert between the two. */
  surface?: AvatarSurface;
  /** Rendered size. Figma's base is 40; the profile header uses 56. */
  size?: number;
  /** Photo for `type="member"`. */
  src?: string;
  /** Accessible name. Required when the avatar identifies someone. */
  alt?: string;
  /** Figma's `Show Edit` axis — a camera disc on the bottom-right. */
  showEdit?: boolean;
  /**
   * Artwork for `type="illustration"`. Figma masks an illustration that lives only in
   * Figma, so there is nothing to import — the slot is here and the artwork is not.
   */
  illustration?: React.ReactNode;
  className?: string;
}

/**
 * Avatar — Lotteryplus Design System
 *
 * Figma component set `avatar` (14291:133618), ten variants across three axes.
 *
 * Everything is measured at Figma's 40px base and scaled: a 34px ring with 2.5 padding
 * and a 1.4px stroke around a 29px disc. Those fractions are deliberate — they are a
 * ratio of the avatar, not steps on a scale — and they are what makes the 56px instance
 * in the profile header land on 47 / 3.5 / 1.96 / 40 the way Figma draws it.
 */
const Avatar: React.FC<AvatarProps> = ({
  type = 'member',
  surface = 'light',
  size,
  src,
  alt,
  showEdit = false,
  illustration,
  className = '',
}) => {
  const base = avatarBase();
  const box = size ?? base.size;
  const k = box / base.size;
  const at = (n: number) => `${n * k}px`;

  const onRed = surface === 'red';
  const ring = onRed ? AVATAR.ringOnRed : AVATAR.ringOnLight;

  const innerBackground =
    type === 'guest'
      ? onRed
        ? AVATAR.guestBackgroundOnRed
        : AVATAR.guestBackgroundOnLight
      : AVATAR.illustrationBackground;

  const glyph = onRed ? AVATAR.guestGlyphOnRed : AVATAR.guestGlyphOnLight;

  return (
    <span
      className={`ltp-avatar ltp-avatar--${type} ltp-avatar--${surface} ${className}`}
      style={{ width: box, height: box }}
    >
      <span
        className="ltp-avatar__ring"
        style={{
          width: at(base.ring),
          height: at(base.ring),
          padding: at(base.ringPadding),
          // Figma strokes INSIDE, which does not eat into the padding box: a 47px circle
          // with 3.5 padding still holds a 40px disc. A CSS border would consume 2 more
          // pixels on each axis and shrink the disc. An inset shadow draws the same ring
          // without taking the space.
          boxShadow: `inset 0 0 0 ${at(base.ringBorderWidth)} ${ring}`,
        }}
      >
        <span
          className="ltp-avatar__inner"
          style={{
            width: at(base.inner),
            height: at(base.inner),
            background: type === 'member' && src ? undefined : innerBackground,
          }}
        >
          {type === 'member' && src && (
            <img className="ltp-avatar__photo" src={src} alt={alt ?? ''} />
          )}
          {type === 'guest' && (
            <Icon name="filled-user" size="xs" customColor={glyph} aria-label={alt} />
          )}
          {type === 'illustration' && illustration}
        </span>
      </span>

      {showEdit && (
        <span
          className="ltp-avatar__edit"
          style={{
            width: at(base.edit),
            height: at(base.edit),
            background: AVATAR.editBackground,
          }}
        >
          <Icon
            name="filled-Camera"
            size="2xs"
            customColor={AVATAR.editGlyph}
            className="ltp-avatar__edit-glyph"
          />
        </span>
      )}
    </span>
  );
};

export default Avatar;
