import React, { useId, useState } from 'react';
import '../../foundations/tokens.css';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import { ACCORDION, ACCORDION_ICON_SIZE } from './tokens';
import './Accordion.css';

export interface AccordionProps {
  /** The row that is always visible and toggles the rest. */
  title: React.ReactNode;
  children: React.ReactNode;
  /** Start open. The Frontend always starts closed; this exists for composition. */
  defaultOpen?: boolean;
  /** Controlled mode — pass both to drive it from outside. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Accordion — Lotteryplus Design System
 *
 * No Figma component set exists (verified absent 2026-08-20), even though the Lark
 * Standard §3.4 lists `accordion-item` as a canonical molecule — so the gap is Figma's,
 * not the library's. Built from the Frontend's `common/accordion`, 3 call sites.
 *
 * The trigger reuses TitleWithUnderline's drawing: the label sits over a red rule and the
 * chevron cell over a grey one, both 4px above their border. The two components are drawn
 * the same way on purpose — the Frontend's CSS module for each is a copy of the other's.
 *
 * Content mounts and unmounts rather than animating its height, which is what the
 * Frontend does; a height transition would need a measured height the design never states.
 */
const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className = '',
}) => {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolled;
  const panelId = useId();

  const toggle = () => {
    if (!isControlled) setUncontrolled((prev) => !prev);
    onOpenChange?.(!isOpen);
  };

  return (
    <div
      className={`ltp-accordion ${className}`}
      style={{ display: 'flex', flexDirection: 'column', gap: ACCORDION.gap }}
    >
      <button
        type="button"
        className="ltp-accordion__trigger"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span
          style={{
            paddingBottom: ACCORDION.underlinePadding,
            borderBottom: `${ACCORDION.underlineWidth} solid ${ACCORDION.accentColor}`,
            whiteSpace: 'nowrap',
            fontSize: ACCORDION.titleSize,
            lineHeight: ACCORDION.titleLineHeight,
            fontWeight: ACCORDION.titleWeight as unknown as React.CSSProperties['fontWeight'],
            color: ACCORDION.titleColor,
          }}
        >
          {title}
        </span>
        <span
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBottom: ACCORDION.underlinePadding,
            borderBottom: `${ACCORDION.underlineWidth} solid ${ACCORDION.ruleColor}`,
            color: ACCORDION.titleColor,
          }}
        >
          <span className={`ltp-accordion__chevron${isOpen ? ' ltp-accordion__chevron--open' : ''}`}>
            <Icon name="arrow-down-S" size={ACCORDION_ICON_SIZE as 24} color="inherit" />
          </span>
        </span>
      </button>
      {isOpen && <div id={panelId}>{children}</div>}
    </div>
  );
};

export default Accordion;
