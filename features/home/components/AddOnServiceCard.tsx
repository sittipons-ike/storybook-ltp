import React from 'react';
import '../../../ui/foundations/tokens.css';
import Text from '../../../ui/components/Text/Text';
import Button from '../../../ui/components/Button/Button';
import { sys } from '../../../ui/foundations/tokens';
import { HOME, HOME_RADIUS } from './tokens';

/**
 * AddOnServiceCard — Figma `add-on-service` (`16821:38580`, placed as `21086:148859`)
 *
 * A white 358 x 258 card at 24 of padding: the red heading `บริการเสริม จากลอตเตอรี่พลัส`,
 * then rows of `Service-mobile-molecules` — a 128-wide tertiary button and a two-line
 * description — separated by hairlines with 16 above each.
 *
 * The Figma instance draws three rows and hides the first (`Type=Safe Slot, Disabled=Yes`,
 * `visible: false`), which is why the card is 258 rather than 327. Hidden is not spec, so
 * the rows arrive as a prop and the page passes the two that are shown.
 *
 * Scope: feature. Figma keeps the molecule in its own `extra-service` section, so it has a
 * home to graduate to once a second page draws one.
 */
export interface AddOnService {
  /** The tertiary button: an icon and a short label. `จัดส่ง`, `สลาก 80` */
  action: { icon: string; label: string; onClick?: () => void };
  /** `บริการ` — the small line above the name. */
  kicker: string;
  /** `การจัดส่งลอตเตอรี่`, `ซื้อสลากด้วยตนเอง` */
  name: string;
}

export interface AddOnServiceCardProps {
  title?: string;
  services: AddOnService[];
  className?: string;
}

const AddOnServiceCard: React.FC<AddOnServiceCardProps> = ({
  title = 'บริการเสริม จากลอตเตอรี่พลัส',
  services,
  className = '',
}) => (
  <section
    className={`ltp-add-on-service ${className}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: sys('spacing-4xl'),
      padding: sys('spacing-4xl'),
      borderRadius: HOME_RADIUS.searchBoard,
      background: HOME.serviceCardBackground,
    }}
  >
    <Text role="title-lg-semibold" as="h2" style={{ color: HOME.serviceHeading }}>
      {title}
    </Text>

    <div style={{ display: 'flex', flexDirection: 'column', gap: sys('spacing-4xl') }}>
      {services.map((service) => (
        <React.Fragment key={service.name}>
          {/* `End Line` (`I21086:148859;16821:38127`) — a 1-tall frame. The 16 of top
              padding its `Line` child declares sits inside that 1px and adds nothing; the
              room around the rule is the card's own 24 gap. */}
          <div style={{ height: 1, background: HOME.hairline }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: sys('spacing-2xl') }}>
            {/* Figma says `Type=Tertiary`; the library calls it `outline`. The two names were
                swapped in Figma — `tertiary` declared the six border tokens and `outline`
                declared none — and `button._naming_correction` records the fix. */}
            <div style={{ width: 128, flex: 'none' }}>
              <Button
                variant="outline"
                size="lg"
                showIcon
                iconName={service.action.icon}
                onClick={service.action.onClick}
                fullWidth
              >
                {service.action.label}
              </Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <Text role="body-md-regular" tone="tertiary">
                {service.kicker}
              </Text>
              <Text role="body-md-medium" tone="secondary">
                {service.name}
              </Text>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </section>
);

export default AddOnServiceCard;
