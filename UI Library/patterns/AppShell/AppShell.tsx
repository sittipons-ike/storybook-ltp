import React from 'react';
import '../../foundations/tokens.css';
import { sys, component } from '../../foundations/tokens';
import './AppShell.css';

export type ShellNavbar = 'compact' | 'default' | 'profile' | 'big-title';
export type ShellHeader = 'default' | 'phoenix' | 'squared' | 'curved';

const t = component('topfoot');

export interface AppShellProps {
  /**
   * The device's own status strip. Neither Frontend page draws one — a browser has no
   * status bar — but both templates in Figma's `Guidline-UI Template › Layout` do, so the
   * shell has to be able to hold one or a design review is comparing different things.
   */
  statusBar?: React.ReactNode;
  /** The persistent bar at the top of the viewport. On in 67 of 69 real pages. */
  topNavbar?: React.ReactNode;
  /** The page title bar below the navbar. */
  header?: React.ReactNode;
  /** The page's own content — the only slot every page fills. */
  children?: React.ReactNode;
  /** The tab bar pinned to the bottom. Only on top-level destinations. */
  bottomNavbar?: React.ReactNode;
  /** Site footer, or a sticky action bar. */
  footer?: React.ReactNode;

  /** Which navigation treatment the shell mounts. Cosmetic here; the fill decides. */
  navbar?: ShellNavbar;
  /** Which header treatment. Cosmetic here; the fill decides. */
  headerStyle?: ShellHeader;

  /**
   * Draw empty slots with a dashed outline and a label — how a pattern is reviewed, since
   * you are looking at the frame rather than at content.
   *
   * `true` outlines every slot. An array outlines only the slots named, which is how a
   * single composition is shown: a slot the composition does not use is absent, not empty,
   * and the two have to look different or the diagram lies.
   */
  showSlots?: boolean | ReadonlyArray<string>;
  /** Constrain to a device width instead of filling the viewport. */
  width?: number | string;
  /** Fixed height, for a shell shown inside a docs page. */
  height?: number | string;
  className?: string;
}

const Slot: React.FC<{
  name: string;
  filled: React.ReactNode;
  show: boolean | ReadonlyArray<string>;
  grow?: boolean;
  minHeight?: number;
}> = ({ name, filled, show, grow, minHeight }) => {
  const outline = Array.isArray(show) ? show.includes(name) : show;
  if (filled) {
    return <div className={`ltp-shell__slot ltp-shell__slot--${name}`} style={grow ? { flex: 1, minHeight: 0, overflow: 'auto' } : undefined}>{filled}</div>;
  }
  if (!outline) return null;
  return (
    <div
      className={`ltp-shell__placeholder ltp-shell__slot--${name}`}
      style={{
        flex: grow ? 1 : undefined,
        minHeight: minHeight ?? 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px dashed ${sys('color-border-accent-gray-light')}`,
        background: sys('color-background-soft-light'),
        color: sys('color-text-state-light-gray'),
        fontSize: 11,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        letterSpacing: '0.06em',
      }}
    >
      {name}
    </div>
  );
};

/**
 * AppShell — Lotteryplus Design System
 *
 * The frame every in-app page sits in. Derived by parsing the `<Layout>` call on all 81
 * Frontend pages: 31 flag combinations collapse to 8 slot compositions, and those 8 are
 * this one shell with four optional slots.
 *
 * Figma's own page templates — `Guidline-UI Template › Layout` — describe the same frame
 * and were checked against it on 2026-08-19. They agree on every slot and add one the
 * Frontend cannot have: the device status bar.
 *
 * It holds slots and nothing else. The Frontend's own `layout/index.tsx` imports ten API
 * modules and eleven stores — that is a page container. Bringing it here would drag the
 * data layer into the design system, so the shape is modelled instead of the code ported.
 */
const AppShell: React.FC<AppShellProps> = ({
  statusBar,
  topNavbar,
  header,
  children,
  bottomNavbar,
  footer,
  navbar = 'compact',
  headerStyle = 'default',
  showSlots = false,
  width,
  height,
  className = '',
}) => (
  <div
    className={`ltp-shell ltp-shell--navbar-${navbar} ltp-shell--header-${headerStyle} ${className}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: width ?? '100%',
      height: height ?? '100%',
      background: t.ref('page-background'),
      color: sys('color-text-secondary-default'),
      fontFamily: sys('type-body-md-regular-family'),
      overflow: 'hidden',
    }}
  >
    <Slot name="status-bar" filled={statusBar} show={showSlots} minHeight={47} />
    <Slot name="top-navbar" filled={topNavbar} show={showSlots} minHeight={56} />
    <Slot name="header" filled={header} show={showSlots} minHeight={64} />
    <Slot name="main" filled={children} show={showSlots} grow minHeight={120} />
    <Slot name="footer" filled={footer} show={showSlots} minHeight={56} />
    <Slot name="bottom-navbar" filled={bottomNavbar} show={showSlots} minHeight={64} />
  </div>
);

export default AppShell;
