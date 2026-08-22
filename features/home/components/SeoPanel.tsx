import React from 'react';
import '../../../ui/foundations/tokens.css';
import Text from '../../../ui/components/Text/Text';
import Icon from '../../../ui/icons/Icon';
import '../../../ui/icons/icon-data';
import { sys } from '../../../ui/foundations/tokens';
import { HOME } from './tokens';

/**
 * SeoPanel — Figma `SEO Support` (`21084:85163`)
 *
 * The block of search copy at the foot of the page: a heading, a hairline, and a body that
 * runs 1,488px if you let it — folded to 34 here, with a red fade over the cut and a
 * chevron under it.
 *
 * Figma writes the heading as one text layer with two sizes in it (28/42 Medium then 20/36
 * Medium, `21084:85165`) and the body as one layer with four (14/22 Medium then 10/16
 * Regular, `21084:85169`). A mixed-size text node is two roles wearing one layer, so the
 * component takes them apart: `title`, `subtitle`, `lead`, `body`. `subtitle` binds to
 * `heading-h3-medium` and `body` to `caption-md-regular`, both exact. `title` is the same
 * 28/42-Medium-versus-`h2-semb` question the section headings raise — see `ux-home.md`.
 *
 * The fade is Figma's `Rectangle 37` (`21084:85171`): 390 x 64, a linear gradient from the
 * section's red at zero alpha to the same red at full, running down. Written with
 * `color-mix` so the transparent end is the same red rather than CSS's `transparent`, which
 * is transparent *black* and greys the middle of the ramp in some engines.
 *
 * Scope: feature — one page has SEO copy, and it is this one.
 */
export interface SeoPanelProps {
  title: string;
  subtitle: string;
  /** The opening line, which Figma sets a size larger than the rest. */
  lead: string;
  body: string;
  /** Collapsed height of the body block. Figma folds it to 34. */
  collapsedHeight?: number;
  expanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

const SeoPanel: React.FC<SeoPanelProps> = ({
  title,
  subtitle,
  lead,
  body,
  collapsedHeight = 34,
  expanded = false,
  onToggle,
  className = '',
}) => (
  <section
    className={`ltp-seo-panel ${className}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: sys('spacing-2xl'),
      padding: `${sys('spacing-2xl')} ${sys('spacing-4xl')} ${sys('spacing-7xl')}`,
      background: HOME.sectionRed,
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text role="heading-h2-semibold" tone="on-bgcolor" as="h2" align="center">
        {title}
      </Text>
      <Text role="heading-h3-medium" tone="on-bgcolor" as="p" align="center">
        {subtitle}
      </Text>
    </div>

    {/* `End Line` (`21084:85166`) — a 1-tall frame. Its `Line` child declares 16 of top
        padding inside it, which does not add height: the frame is fixed at 1, and the room
        around the rule is the parent's own 16 gap. */}
    <div style={{ height: 1, background: HOME.hairline }} />

    <div style={{ position: 'relative' }}>
      <div style={{ maxHeight: expanded ? undefined : collapsedHeight, overflow: 'hidden' }}>
        <Text role="body-md-medium" tone="on-bgcolor" as="p">
          {lead}
        </Text>
        <Text role="caption-md-regular" tone="on-bgcolor" as="p" style={{ whiteSpace: 'pre-line' }}>
          {body}
        </Text>
      </div>

      {!expanded && (
        <button
          type="button"
          onClick={onToggle}
          aria-label="อ่านต่อ"
          style={{
            // Figma pins `Group 24596` to the *top* of the folded body and lets it run 64
            // down past it (`21084:85170`, y=128.5 against a body that starts at 128), so
            // the ramp is only about half-opaque where the last visible line is. Anchoring
            // it to the bottom instead would put the opaque end on the text and grey out
            // the first line, which is what it did before this comment existed.
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 64,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: sys('spacing-lg'),
            border: 'none',
            cursor: 'pointer',
            background: `linear-gradient(to bottom, color-mix(in srgb, ${HOME.sectionRed}, transparent 100%), ${HOME.sectionRed})`,
          }}
        >
          <Icon name="arrow-down-L" size="xs" color="onBg" />
        </button>
      )}
    </div>
  </section>
);

export default SeoPanel;
