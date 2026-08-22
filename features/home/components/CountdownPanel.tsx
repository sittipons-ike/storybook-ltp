import React from 'react';
import '../../../ui/foundations/tokens.css';
import Text from '../../../ui/components/Text/Text';
import { sys } from '../../../ui/foundations/tokens';
import { HOME, HOME_RADIUS } from './tokens';

/**
 * CountdownPanel — Figma `Frame 43604` (`21084:85076`)
 *
 * Four white 66 x 66 blocks at radius 8, separated by a white colon, 6 apart. Inside each
 * block the number is `heading/h1` in brand red and the unit is `label/m-med`, both centred.
 *
 * The number sits in a 36-tall box against a 48 line-height, which looks like an overflow
 * until you read `textAlignVertical: CENTER` — the line box is centred on the text box, so
 * the glyph lands in the same place either way. `absoluteRenderBounds` on `21084:85078`
 * confirms it: ink 23.55 tall, 7.8 below the block's top padding, centred.
 *
 * Distinct from `ui/components/CountdownTimer`, which counts. This one only shows.
 *
 * Scope: feature — only the นาทีทอง block draws it.
 */
export interface CountdownUnit {
  /** Two digits, as drawn. Zero padding is the caller's, because `9` and `09` differ. */
  value: string;
  unit: string;
}

export interface CountdownPanelProps {
  units: CountdownUnit[];
  /** What the countdown is counting to, for a screen reader. */
  label?: string;
  className?: string;
}

const Block: React.FC<CountdownUnit> = ({ value, unit }) => (
  <div
    style={{
      width: 66,
      height: 66,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: sys('spacing-lg'),
      borderRadius: HOME_RADIUS.countdown,
      background: HOME.countdownBackground,
      boxSizing: 'border-box',
    }}
  >
    {/* The 36-tall box Figma states, with the 48 line centred in it. */}
    <span style={{ height: 36, display: 'flex', alignItems: 'center' }}>
      <Text role="heading-h1-semibold" tone="primary">
        {value}
      </Text>
    </span>
    <Text role="label-md-medium" tone="primary">
      {unit}
    </Text>
  </div>
);

const CountdownPanel: React.FC<CountdownPanelProps> = ({
  units,
  label = 'เวลาที่เหลือ',
  className = '',
}) => (
  <div
    className={`ltp-countdown-panel ${className}`}
    aria-label={label}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sys('spacing-md'),
    }}
  >
    {units.map((u, i) => (
      <React.Fragment key={u.unit}>
        {i > 0 && (
          <span aria-hidden="true">
            <Text role="heading-h3-semibold" tone="on-bgcolor">
              :
            </Text>
          </span>
        )}
        <Block {...u} />
      </React.Fragment>
    ))}
  </div>
);

export default CountdownPanel;
