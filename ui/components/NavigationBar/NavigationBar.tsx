import React from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import '../../foundations/tokens.css';
import {
  NAVIGATION,
  NAVIGATION_ICON,
  NAVIGATION_DEFAULT_WIDTH,
  navigationColors,
  type NavigationState,
} from './tokens';

// ═══════════════════════════════════════════
//  NavigationBar — Lotteryplus Design System
//  Figma component set: "navigation-bar-v2" (14291:135864)
//  10 variants: 5 states x 2 add-to-cart modes
//  Selected key: home | order | cart | safe | profile
//  Add-to-cart: no (normal) | yes (gradient cart button)
//
//  Every style value is a CSS custom property from foundations/tokens.css, which is
//  generated from Figma via design.md + components.json + components/navigation-bar.json.
//  There are no literal colours, sizes, or font values in this file.
// ═══════════════════════════════════════════

export interface NavItem {
  /** Unique key matching Figma state names */
  key: string;
  /** Display label (Thai) */
  label: string;
  /** Outline icon name (inactive state) */
  icon: string;
  /** Filled icon name (selected state) */
  filledIcon: string;
  /** Label for cart mode (only for cart item) */
  cartLabel?: string;
  /** Canonical `disabled` state — the item renders but cannot be chosen */
  disabled?: boolean;
}

export interface NavigationBarProps {
  /** Currently selected tab key: 'home' | 'order' | 'cart' | 'safe' | 'profile' */
  selectedKey: string;
  /** Click handler for nav items */
  onItemClick?: (key: string) => void;
  /** Nav items configuration */
  items?: NavItem[];
  /** Enable add-to-cart mode for cart item */
  showAddToCart?: boolean;
  /** Timer text for cart mode (e.g. "00:14:59") */
  cartTimer?: string;
  /** Badge count on cart item (add-to-cart mode) */
  cartBadgeCount?: number;
  /** Show order notification badge (filled-Error-2 icon) */
  showOrderBadge?: boolean;
  /** Badge count on safe item (outlined circle with number) */
  safeBadgeCount?: number;
  /** Container width (defaults to the `--navigation-width` token) */
  width?: number;
  /**
   * Span the parent instead of Figma's fixed 390.
   *
   * Figma draws the bar on a 390pt canvas and divides it into five 78pt items, so 390 is
   * the reference, not a constraint. A real iPhone 16 is 393pt wide and a fixed 390 leaves
   * a 3pt strip of page showing beside a bar that is supposed to be pinned to the edge.
   * With this on, the items divide whatever width they are given — which is what the
   * fixed numbers were describing all along.
   */
  fullWidth?: boolean;
  /** Additional className */
  className?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { key: 'home', label: 'หน้าแรก', icon: 'outline-Home', filledIcon: 'filled-Home' },
  { key: 'order', label: 'คำสั่งซื้อ', icon: 'outline-order', filledIcon: 'filled-order' },
  // The cart keeps `outline-cart` selected or not. Figma's `state` property lists
  // home | order | safe | profile | not — there is no `state=cart`, and all ten
  // variants draw the cart with the outline glyph. `filled-cart` exists in the icon
  // set but no Figma node uses it, so it is not a default here. See
  // components/navigation-bar.json > _figma_gaps > cart-has-no-selected-state.
  { key: 'cart', label: 'ตะกร้า', icon: 'outline-cart', filledIcon: 'outline-cart', cartLabel: 'ไปที่ตะกร้า' },
  { key: 'safe', label: 'ตู้เซฟ', icon: 'outline-safe', filledIcon: 'filled-safe' },
  { key: 'profile', label: 'สมาชิก', icon: 'outline-member', filledIcon: 'filled-member' },
];

/** Canonical precedence: disabled beats selected beats active beats focus beats hover. */
const resolveState = (flags: {
  disabled?: boolean;
  selected: boolean;
  active: boolean;
  focused: boolean;
  hovered: boolean;
}): NavigationState =>
  flags.disabled
    ? 'disabled'
    : flags.selected
    ? 'selected'
    : flags.active
    ? 'active'
    : flags.focused
    ? 'focus'
    : flags.hovered
    ? 'hover'
    : 'rest';

/** Shared label typography — typography/button/xs/medium. */
const labelStyle: React.CSSProperties = {
  fontFamily: NAVIGATION.fontFamily,
  fontSize: NAVIGATION.fontSize,
  fontWeight: NAVIGATION.fontWeight as unknown as React.CSSProperties['fontWeight'],
  lineHeight: NAVIGATION.lineHeight,
  letterSpacing: NAVIGATION.tracking,
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

/** Shared count-badge chrome — white disc, accent ring, accent numeral. */
const badgeStyle: React.CSSProperties = {
  position: 'absolute',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: NAVIGATION.badgeSize,
  height: NAVIGATION.badgeSize,
  borderRadius: NAVIGATION.badgeRadius,
  backgroundColor: NAVIGATION.background,
  border: `${NAVIGATION.badgeBorderWidth} solid ${NAVIGATION.foregroundAccent}`,
  fontFamily: NAVIGATION.fontFamily,
  fontSize: NAVIGATION.fontSize,
  fontWeight: NAVIGATION.fontWeight as unknown as React.CSSProperties['fontWeight'],
  lineHeight: NAVIGATION.badgeLineHeight,
  color: NAVIGATION.foregroundAccent,
};

const NavigationBar: React.FC<NavigationBarProps> = ({
  selectedKey,
  onItemClick,
  items = DEFAULT_ITEMS,
  showAddToCart = false,
  cartTimer,
  cartBadgeCount,
  showOrderBadge,
  safeBadgeCount,
  width = NAVIGATION_DEFAULT_WIDTH,
  fullWidth = false,
  className = '',
}) => {
  const boxWidth: number | string = fullWidth ? '100%' : width;
  // When the bar flexes, the items flex with it; otherwise they keep Figma's 78pt.
  const itemWidth = fullWidth ? undefined : width / items.length;

  return (
    <div
      className={`ltp-navbar ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: boxWidth,
        height: NAVIGATION.height,
        // No background. Figma paints white on the 68px items and on the home-indicator
        // strip, not on the container — so the top 22px of the bar is see-through and the
        // page shows behind it. Checked on all 10 variants: root fill NONE, bar fill NONE.
      }}
    >
      {/* ── Navbar-Mobile: 5 nav items ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: boxWidth,
          height: NAVIGATION.barHeight,
        }}
      >
        {items.map((item) => {
          const selected = item.key === selectedKey;
          const isCart = item.key === 'cart';
          const isOrder = item.key === 'order';
          const isSafe = item.key === 'safe';

          // Badge config per item
          const showFilledBadge = isOrder && showOrderBadge;
          const outlineBadgeCount = isSafe ? safeBadgeCount : undefined;

          // Cart in add-to-cart mode
          if (isCart && showAddToCart) {
            // Figma nests this: the `Cart` item is a white 78x90 cell and the gradient card
            // fills it. The card's 8px corners are where the white actually shows.
            return (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  width: itemWidth,
                  flex: itemWidth === undefined ? 1 : undefined,
                  minWidth: 0,
                  height: NAVIGATION.cartHeight,
                  backgroundColor: NAVIGATION.background,
                }}
              >
                <CartButton
                  item={item}
                  selected={selected}
                  cartTimer={cartTimer}
                  cartBadgeCount={cartBadgeCount}
                  onClick={() => onItemClick?.(item.key)}
                />
              </div>
            );
          }

          return (
            <NavItemButton
              key={item.key}
              item={item}
              selected={selected}
              showFilledBadge={showFilledBadge}
              outlineBadgeCount={outlineBadgeCount}
              onClick={() => onItemClick?.(item.key)}
              width={itemWidth}
            />
          );
        })}
      </div>

      {/* ── Home Indicator ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: boxWidth,
          height: NAVIGATION.homeIndicatorContainerHeight,
          paddingBottom: NAVIGATION.homeIndicatorPaddingBottom,
          backgroundColor: NAVIGATION.background,
        }}
      >
        <div
          style={{
            width: NAVIGATION.homeIndicatorWidth,
            height: NAVIGATION.homeIndicatorHeight,
            backgroundColor: NAVIGATION.homeIndicatorColor,
            borderRadius: NAVIGATION.homeIndicatorRadius,
          }}
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
//  Nav Item Button (normal mode)
// ═══════════════════════════════════════════
interface NavItemButtonProps {
  item: NavItem;
  selected: boolean;
  /** Show filled-Error-2 badge (Order style — accent filled circle with !) */
  showFilledBadge?: boolean;
  /** Show outlined badge with count (Safe style — white bg, accent ring, number) */
  outlineBadgeCount?: number;
  onClick: () => void;
  /** Fixed item width, or undefined when the bar flexes and items share it evenly. */
  width?: number;
}

const NavItemButton: React.FC<NavItemButtonProps> = ({
  item,
  selected,
  showFilledBadge,
  outlineBadgeCount,
  onClick,
  width,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const state = resolveState({
    disabled: item.disabled,
    selected,
    active,
    focused,
    hovered,
  });
  const colors = navigationColors(state);
  const disabled = state === 'disabled';

  return (
    <button
      type="button"
      className="ltp-navbar__item"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-current={selected ? 'page' : undefined}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => {
        if (!disabled) {
          setHovered(false);
          setActive(false);
        }
      }}
      onFocus={() => !disabled && setFocused(true)}
      onBlur={() => !disabled && setFocused(false)}
      onMouseDown={() => !disabled && setActive(true)}
      onMouseUp={() => !disabled && setActive(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // No fixed width means the bar is flexing; share the row evenly instead.
        width,
        flex: width === undefined ? 1 : undefined,
        minWidth: 0,
        height: NAVIGATION.itemHeight,
        paddingTop: NAVIGATION.itemPaddingTop,
        paddingRight: NAVIGATION.itemPaddingX,
        paddingBottom: NAVIGATION.itemPaddingBottom,
        paddingLeft: NAVIGATION.itemPaddingX,
        gap: NAVIGATION.itemGap,
        backgroundColor: NAVIGATION.background,
        // Figma strokes 1px INSIDE on the item's top edge only. The five items tile with no
        // gap, so their strokes form the continuous line across the bar.
        border: 'none',
        borderTop: `${NAVIGATION.borderWidth} solid ${NAVIGATION.borderColor}`,
        boxSizing: 'border-box',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
      }}
    >
      {/* Selector bar — bottom corners rounded, hidden by taking the bar background */}
      <div
        style={{
          width: NAVIGATION.selectorWidth,
          height: NAVIGATION.selectorHeight,
          backgroundColor: colors.selector,
          borderRadius: `0 0 ${NAVIGATION.selectorRadius} ${NAVIGATION.selectorRadius}`,
          flexShrink: 0,
        }}
      />

      {/* Content frame: icon + label, centered */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: NAVIGATION.contentWidth,
          height: NAVIGATION.contentHeight,
          gap: NAVIGATION.itemGap,
          marginTop: NAVIGATION.contentOffset,
          position: 'relative',
        }}
      >
        {/* Icon with badge wrapper */}
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Icon
            name={selected ? item.filledIcon : item.icon}
            size={NAVIGATION_ICON.size}
            customColor={colors.icon}
          />

          {/* Order-style badge: filled-Error-2 icon overlapping the icon's top-right */}
          {showFilledBadge && (
            <span
              style={{
                position: 'absolute',
                top: NAVIGATION.orderBadgeOffsetTop,
                right: NAVIGATION.orderBadgeOffsetRight,
                zIndex: 1,
                display: 'flex',
              }}
            >
              <Icon
                name="filled-Error-2"
                size={NAVIGATION_ICON.orderBadgeSize}
                customColor={NAVIGATION.foregroundAccent}
              />
            </span>
          )}

          {/* Safe-style badge: outlined circle with count number */}
          {outlineBadgeCount !== undefined && outlineBadgeCount > 0 && (
            <span
              style={{
                ...badgeStyle,
                top: NAVIGATION.badgeOffsetTop,
                right: NAVIGATION.badgeOffsetRight,
              }}
            >
              {outlineBadgeCount}
            </span>
          )}
        </div>

        {/* Label text */}
        <span style={{ ...labelStyle, color: colors.foreground }}>{item.label}</span>
      </div>
    </button>
  );
};

// ═══════════════════════════════════════════
//  Cart Button (add-to-cart mode)
//  Gradient background, timer pill, count badge
// ═══════════════════════════════════════════
interface CartButtonProps {
  item: NavItem;
  selected: boolean;
  cartTimer?: string;
  cartBadgeCount?: number;
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({
  item,
  selected,
  cartTimer,
  cartBadgeCount,
  onClick,
}) => {
  const disabled = item.disabled === true;

  return (
    <button
      type="button"
      className="ltp-navbar__cart-button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-current={selected ? 'page' : undefined}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingTop: NAVIGATION.cartPadding,
        paddingRight: NAVIGATION.cartPadding,
        paddingBottom: NAVIGATION.cartPaddingBottom,
        paddingLeft: NAVIGATION.cartPadding,
        gap: NAVIGATION.cartGap,
        background: NAVIGATION.cartGradient,
        borderRadius: NAVIGATION.cartRadius,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
      }}
    >
      {/* Cart icon with outlined badge overlapping the top-right corner */}
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <Icon
          name={item.icon}
          size={NAVIGATION_ICON.size}
          customColor={NAVIGATION.foregroundOnCart}
        />
        {cartBadgeCount !== undefined && cartBadgeCount > 0 && (
          <span
            style={{
              ...badgeStyle,
              top: NAVIGATION.cartBadgeOffsetTop,
              right: NAVIGATION.cartBadgeOffsetRight,
            }}
          >
            {cartBadgeCount}
          </span>
        )}
      </div>

      {/* Cart label: "ไปที่ตะกร้า" */}
      <span style={{ ...labelStyle, color: NAVIGATION.foregroundOnCart }}>
        {item.cartLabel || item.label}
      </span>

      {/* Timer pill: "00:14:59" */}
      {cartTimer && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: NAVIGATION.timerPaddingX,
            paddingRight: NAVIGATION.timerPaddingX,
            paddingTop: NAVIGATION.timerPaddingY,
            paddingBottom: NAVIGATION.timerPaddingY,
            border: `${NAVIGATION.timerBorderWidth} solid ${NAVIGATION.foregroundOnCart}`,
            borderRadius: NAVIGATION.timerRadius,
            fontFamily: NAVIGATION.fontFamily,
            fontSize: NAVIGATION.fontSize,
            fontWeight: NAVIGATION.fontWeight as unknown as React.CSSProperties['fontWeight'],
            lineHeight: NAVIGATION.timerLineHeight,
            color: NAVIGATION.foregroundOnCart,
          }}
        >
          {cartTimer}
        </span>
      )}
    </button>
  );
};

export default NavigationBar;
