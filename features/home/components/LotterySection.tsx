import React from 'react';
import '../../../ui/foundations/tokens.css';
import Text from '../../../ui/components/Text/Text';
import Button from '../../../ui/components/Button/Button';
import Icon from '../../../ui/icons/Icon';
import '../../../ui/icons/icon-data';
import { sys } from '../../../ui/foundations/tokens';
import LotteryTile, { type LotteryTileProps } from './LotteryTile';

/**
 * LotterySection — Figma `Lottery-1` … `Lottery-4` (`21084:85104`, `85117`, `85132`, `85147`)
 *
 * One heading over a two-column grid of tiles, with an optional `ดูเลขทั้งหมด` under it.
 * All four sections in the red block are the same frame with different content, so they are
 * one component with props rather than four near-copies.
 *
 * Measured 2026-08-22:
 *   header      42 tall for the title alone; 75 when a subtitle follows (4 gap, 8 below)
 *   body        16 side padding, 24 between the grid and the button
 *   grid        358 wide, two 170 columns, 16 apart, 16 between rows
 *
 * The title's Figma layer points at a text style named `typography/heading/h2`, which is not
 * in the file's local style set — the canonical one there is `h2-semb`. Measured, the layer
 * is 28/42 Medium while `h2-semb` is Semibold. `heading-h2-semibold` is used here because it
 * is the role the system has; the weight difference is written up in `ux-home.md` as a
 * question for the designer rather than papered over with an invented token.
 */
export interface LotterySectionProps {
  /** `เลขชุด`, `เลขท้าย 2 ตัว` … Omitted when a picture heads the section instead. */
  title?: string;
  /** `ซื้อลอตเตอรี่ เลขท้าย 2 ตัว (คละเลขหน้า)` */
  subtitle?: string;
  /** Figma puts `outline-info` beside the title of every `เลขท้าย` / `เลขหน้า` section. */
  info?: boolean;
  onInfoClick?: () => void;
  /** Anything that heads the section instead of a title — the นาทีทอง artwork and countdown. */
  banner?: React.ReactNode;
  tiles: LotteryTileProps[];
  /** `ดูเลขทั้งหมด`. Absent on the sections Figma draws without one. */
  action?: { label: string; onClick?: () => void };
  className?: string;
}

const LotterySection: React.FC<LotterySectionProps> = ({
  title,
  subtitle,
  info = false,
  onInfoClick,
  banner,
  tiles,
  action,
  className = '',
}) => (
  <section
    className={`ltp-lottery-section ${className}`}
    style={{ display: 'flex', flexDirection: 'column', gap: sys('spacing-2xl') }}
  >
    {banner}

    {title && (
      /* `Header` — `21084:85118`: title row, 4 gap, subtitle, 8 of room below. */
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: sys('spacing-sm'),
          paddingBottom: subtitle ? sys('spacing-lg') : undefined,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: sys('spacing-sm') }}>
          <Text role="heading-h2-semibold" tone="on-bgcolor" as="h2" align="center">
            {title}
          </Text>
          {info && (
            <button
              type="button"
              onClick={onInfoClick}
              aria-label={`เกี่ยวกับ ${title}`}
              style={{
                display: 'inline-flex',
                border: 'none',
                background: 'none',
                padding: 0,
                cursor: 'pointer',
                /* `icon+size Size=16` sits 13 down the 42-tall title row. `21084:85121` */
                alignSelf: 'flex-start',
                marginTop: 13,
              }}
            >
              <Icon name="outline-info" size="xs" color="onBg" />
            </button>
          )}
        </div>
        {subtitle && (
          <Text role="sub-title-lg-medium" tone="on-bgcolor" as="p" align="center">
            {subtitle}
          </Text>
        )}
      </div>
    )}

    {/* `Lottery-1` — `21084:85108`: 16 side padding, 24 down to the button. */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: sys('spacing-4xl'),
        padding: `0 ${sys('spacing-2xl')}`,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 170px)',
          justifyContent: 'space-between',
          gap: sys('spacing-2xl'),
        }}
      >
        {tiles.map((tile, i) => (
          <LotteryTile key={`${tile.faceAlt}-${i}`} {...tile} />
        ))}
      </div>

      {action && (
        <Button variant="secondary" size="lg" fullWidth onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  </section>
);

export default LotterySection;
