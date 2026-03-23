import React from 'react';
import {
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  TYPOGRAPHY,
  NAV_COLORS,
  NAV_DIMENSIONS,
  CART_GRADIENT,
} from './tokens';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';

// ═══════════════════════════════════════════
//  NavigationBar — Lotteryplus Design System
//  Figma component set: "navigation-bar-v2" (14291:135864)
//  10 variants: 5 states x 2 add-to-cart modes
//  States: home | order | cart | safe | profile
//  Add-to-cart: no (normal) | yes (gradient cart button)
// ═══════════════════════════════════════════

export interface NavItem {
  /** Unique key matching Figma state names */
  key: string;
  /** Display label (Thai) */
  label: string;
  /** Outline icon name (inactive state) */
  icon: string;
  /** Filled icon name (active state) */
  filledIcon: string;
  /** Label for cart mode (only for cart item) */
  cartLabel?: string;
}

export interface NavigationBarProps {
  /** Currently active tab key: 'home' | 'order' | 'cart' | 'safe' | 'profile' */
  activeKey: string;
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
  /** Container width (default 390px mobile) */
  width?: number;
  /** Additional className */
  className?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { key: 'home', label: 'หน้าแรก', icon: 'outline-Home', filledIcon: 'filled-Home' },
  { key: 'order', label: 'คำสั่งซื้อ', icon: 'outline-order', filledIcon: 'filled-order' },
  { key: 'cart', label: 'ตะกร้า', icon: 'outline-cart', filledIcon: 'filled-cart', cartLabel: 'ไปที่ตะกร้า' },
  { key: 'safe', label: 'ตู้เซฟ', icon: 'outline-safe', filledIcon: 'filled-safe' },
  { key: 'profile', label: 'สมาชิก', icon: 'outline-member', filledIcon: 'filled-member' },
];

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeKey,
  onItemClick,
  items = DEFAULT_ITEMS,
  showAddToCart = false,
  cartTimer,
  cartBadgeCount,
  showOrderBadge,
  safeBadgeCount,
  width = NAV_DIMENSIONS.outerWidth,
  className = '',
}) => {
  const itemWidth = width / items.length;

  return (
    <div
      className={`ltp-navbar ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        height: NAV_DIMENSIONS.outerHeight,
        backgroundColor: NAV_COLORS.bgWhite,
      }}
    >
      {/* ── Navbar-Mobile: 5 nav items ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width,
          height: NAV_DIMENSIONS.navbarHeight,
          // Top border: 1px colors/navigation-bar/navigation-border
          borderTop: `${BORDER_WIDTH[1]}px solid ${NAV_COLORS.border}`,
        }}
      >
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const isCart = item.key === 'cart';
          const isOrder = item.key === 'order';
          const isSafe = item.key === 'safe';

          // Badge config per item
          const showFilledBadge = isOrder && showOrderBadge;
          const outlineBadgeCount = isSafe ? safeBadgeCount : undefined;

          // Cart in add-to-cart mode
          if (isCart && showAddToCart) {
            return (
              <CartButton
                key={item.key}
                item={item}
                isActive={isActive}
                cartTimer={cartTimer}
                cartBadgeCount={cartBadgeCount}
                onClick={() => onItemClick?.(item.key)}
                width={itemWidth}
              />
            );
          }

          return (
            <NavItemButton
              key={item.key}
              item={item}
              isActive={isActive}
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
          width,
          height: NAV_DIMENSIONS.homeIndicatorContainerHeight,
          paddingBottom: 8,
        }}
      >
        <div
          style={{
            width: NAV_DIMENSIONS.homeIndicatorWidth,
            height: NAV_DIMENSIONS.homeIndicatorHeight,
            backgroundColor: NAV_DIMENSIONS.homeIndicatorColor,
            borderRadius: NAV_DIMENSIONS.homeIndicatorRadius,
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
  isActive: boolean;
  /** Show filled-Error-2 badge (Order style — red filled circle with !) */
  showFilledBadge?: boolean;
  /** Show outlined badge with count (Safe style — white bg, red stroke, number) */
  outlineBadgeCount?: number;
  onClick: () => void;
  width: number;
}

const NavItemButton: React.FC<NavItemButtonProps> = ({
  item,
  isActive,
  showFilledBadge,
  outlineBadgeCount,
  onClick,
  width,
}) => {
  return (
    <button
      type="button"
      className="ltp-navbar__item"
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width,
        height: NAV_DIMENSIONS.itemHeight,
        // Padding: top=0/right=4/bottom=12/left=4
        // spacing-none / spacing-sm / spacing-xl / spacing-sm
        paddingTop: NAV_DIMENSIONS.itemPaddingTop,
        paddingRight: NAV_DIMENSIONS.itemPaddingRight,
        paddingBottom: NAV_DIMENSIONS.itemPaddingBottom,
        paddingLeft: NAV_DIMENSIONS.itemPaddingLeft,
        gap: 0,
        backgroundColor: NAV_COLORS.bgWhite,
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {/* Selector bar: 70 x 4, bottom corners rounded 2px */}
      {/* Figma: cornerRadius bl:2 br:2, gap to content = 10px (spacing-2lg) */}
      <div
        style={{
          width: NAV_DIMENSIONS.selectorBarWidth,
          height: NAV_DIMENSIONS.selectorBarHeight,
          backgroundColor: isActive
            ? NAV_COLORS.fgRed      // colors/navigation-bar/navigation-fg-red
            : NAV_COLORS.bgWhite,   // colors/navigation-bar/navigation-bg-white (invisible)
          borderRadius: '0 0 2px 2px', // bottom-left:2 bottom-right:2
          flexShrink: 0,
        }}
      />

      {/* Content frame: icon + label, centered */}
      {/* Gap between selector bar and content: 10px (spacing-2lg) from Figma itemSpacing */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: NAV_DIMENSIONS.contentFrameWidth,
          height: NAV_DIMENSIONS.contentFrameHeight,
          gap: 0,
          marginTop: 10, // spacing-2lg gap between selector bar and content
          position: 'relative',
        }}
      >
        {/* Icon with badge wrapper */}
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Icon
            name={isActive ? item.filledIcon : item.icon}
            size={NAV_DIMENSIONS.iconSize as 24}
            color={isActive ? 'primary' : 'tertiary'}
          />

          {/* Order-style badge: filled-Error-2 icon (20×20) overlapping icon top-right */}
          {/* Figma: icons-size Size=20 Colors=Primary at x:38 y:8 → overlaps icon corner */}
          {showFilledBadge && (
            <span
              style={{
                position: 'absolute',
                top: -6,
                right: -8,
                zIndex: 1,
                display: 'flex',
              }}
            >
              <Icon
                name="filled-Error-2"
                size={20}
                customColor={NAV_COLORS.fgRed}
              />
            </span>
          )}

          {/* Safe-style badge: outlined circle (16×16) with count number */}
          {/* Figma: Badge Frame at x:39 y:-5.4 within Content, radius:24, */}
          {/* white bg + 1.5px red stroke, text 10px Medium red */}
          {outlineBadgeCount !== undefined && outlineBadgeCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -5,
                right: -7,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 16,
                height: 16,
                borderRadius: 24,
                backgroundColor: NAV_COLORS.bgWhite,
                border: `1.5px solid ${NAV_COLORS.fgRed}`,
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: 10,
                fontWeight: 500,
                lineHeight: 1,
                color: NAV_COLORS.fgRed,
              }}
            >
              {outlineBadgeCount}
            </span>
          )}
        </div>

        {/* Label text */}
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.fontSize,
            fontWeight: TYPOGRAPHY.fontWeight,
            lineHeight: TYPOGRAPHY.lineHeight,
            color: isActive
              ? NAV_COLORS.fgRed   // colors/navigation-bar/navigation-fg-red
              : NAV_COLORS.fgDark, // colors/navigation-bar/navigation-fg-dark
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          {item.label}
        </span>
      </div>
    </button>
  );
};

// ═══════════════════════════════════════════
//  Cart Button (add-to-cart mode)
//  Gradient background, timer pill, white badge
// ═══════════════════════════════════════════
interface CartButtonProps {
  item: NavItem;
  isActive: boolean;
  cartTimer?: string;
  cartBadgeCount?: number;
  onClick: () => void;
  width: number;
}

const CartButton: React.FC<CartButtonProps> = ({
  item,
  isActive,
  cartTimer,
  cartBadgeCount,
  onClick,
  width,
}) => {
  return (
    <button
      type="button"
      className="ltp-navbar__cart-button"
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height: NAV_DIMENSIONS.cartButtonHeight,
        // Padding: spacing-sm top/bottom/left/right, bottom=0
        padding: `${SPACING.sm}px ${SPACING.sm}px 0 ${SPACING.sm}px`,
        gap: 2,
        background: CART_GRADIENT,
        borderRadius: NAV_DIMENSIONS.cartButtonRadius, // radius-lg = 8px
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        alignSelf: 'flex-end',
      }}
    >
      {/* Cart icon with outlined badge overlapping top-right corner */}
      {/* Figma: Badge 16×16 at x:39.7 y:-3.4 within Content, icon at x:23 y:0 */}
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <Icon
          name={item.icon}
          size={NAV_DIMENSIONS.iconSize as 24}
          color="onBg"
        />
        {cartBadgeCount !== undefined && cartBadgeCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -3,
              right: -7,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 16,
              height: 16,
              borderRadius: 24,
              backgroundColor: NAV_COLORS.bgWhite,
              border: `1.5px solid ${NAV_COLORS.fgRed}`,
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: 10,
              fontWeight: 500,
              lineHeight: 1,
              color: NAV_COLORS.fgRed,
            }}
          >
            {cartBadgeCount}
          </span>
        )}
      </div>

      {/* Cart label: "ไปที่ตะกร้า" */}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.fontSize,
          fontWeight: TYPOGRAPHY.fontWeight,
          lineHeight: TYPOGRAPHY.lineHeight,
          color: NAV_COLORS.fgWhite,
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        {item.cartLabel || item.label}
      </span>

      {/* Timer pill: "00:14:59" */}
      {cartTimer && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: NAV_DIMENSIONS.timerPillPaddingX,
            paddingRight: NAV_DIMENSIONS.timerPillPaddingX,
            paddingTop: NAV_DIMENSIONS.timerPillPaddingY,
            paddingBottom: NAV_DIMENSIONS.timerPillPaddingY,
            border: `${NAV_DIMENSIONS.timerPillBorderWidth}px solid ${NAV_DIMENSIONS.timerPillBorderColor}`,
            borderRadius: NAV_DIMENSIONS.timerPillRadius, // radius-full
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: NAV_DIMENSIONS.timerFontSize,
            fontWeight: TYPOGRAPHY.fontWeight,
            lineHeight: 1,
            color: NAV_COLORS.fgWhite,
          }}
        >
          {cartTimer}
        </span>
      )}
    </button>
  );
};

export default NavigationBar;
