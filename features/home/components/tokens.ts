import { sys } from '../../../ui/foundations/tokens';

/**
 * The token bindings this feature's components draw with, in one place.
 *
 * Feature components may reach for a semantic token — that is what the component tier is
 * for, and `check-pages.py` only holds the page tier to composing. Binding them here means
 * the page's palette is one file to read rather than ten, and a Phase 2 rename has one
 * place to visit for `/`.
 *
 * Every entry names the Figma node the colour was read from, so a value can be checked
 * against the file rather than trusted.
 */
export const HOME = {
  /** `home-page(mobile)` fill — the page's own grey. `21085:96373` */
  pageBackground: sys('color-background-light'),
  /** `Lottery` / `SEO Support` / `Service` section fill. `21084:85067` `21084:85163` */
  sectionRed: sys('color-background-accent-red'),
  /** `main-home-card` gradient runs #FAFAFA → #FFFFFF top to bottom. `21084:85041` */
  searchBoardFrom: sys('color-background-soft-light'),
  searchBoardTo: sys('color-background-default'),
  /** `Frame 43580` / `Frame 43583` — the tile's darkest band. `I21084:85127;14291:138124` */
  tileBandDark: sys('color-secondary-darker'),
  /** `Frame 43579` / `Frame 43581` — the cart band. `I21084:85095;14291:138148` */
  tileBandCart: sys('color-background-dark'),
  /** Text on those bands. */
  tileForeground: sys('color-text-on-bgcolor'),
  /** The white quantity chip inside a `Type=Select` tile. `I21084:85127;14291:138138` */
  tileChipBackground: sys('color-background-default'),
  tileChipForeground: sys('color-text-secondary-default'),
  /** `Days` / `Hours` / … blocks. `21084:85077` */
  countdownBackground: sys('color-background-default'),
  countdownValue: sys('color-text-primary-default'),
  /** `Navigation` — active pill vs the rest. `I22244:121667;9005:33166` `…33167` */
  dotActive: sys('color-primary-default'),
  dotIdle: sys('color-background-gray'),
  /** `End Line` inside `add-on-service` and `SEO Support`. `I21086:148859;16821:38128` */
  hairline: sys('color-background-gray-light'),
  /** `บริการเสริม จากลอตเตอรี่พลัส`. `I21086:148859;16821:38124` */
  serviceHeading: sys('color-text-primary-default'),
  serviceCardBackground: sys('color-background-default'),
} as const;

/** Radii Figma states on this page, by the node that states them. */
export const HOME_RADIUS = {
  /** `main-home-card` — 16 on all four corners. `21084:85041` */
  searchBoard: sys('radius-2xl'),
  /** `Lottery` — 24 top only. `21084:85067` */
  section: sys('radius-4xl'),
  /** `lottery-card` — 8. `21084:85095` */
  tile: sys('radius-lg'),
  /** `Home-Banner` — 16. `22244:118800` */
  banner: sys('radius-2xl'),
  /** `Days` — 8. `21084:85077` */
  countdown: sys('radius-lg'),
} as const;

/**
 * Type this page draws that the scale cannot express — recorded, not hidden.
 *
 * `lottery-card` predates the type scale: its layers point at `GraphikTH/L-Medium`,
 * `GraphikTH/M-Medium`, `Title/GraphikTH/M-SemiBold` and two unnamed 8px and 6px settings.
 * None of those is a role in `design.md`; the closest roles differ in line-height (14/24 vs
 * `body-md-medium` 14/22, 16/26 vs `title-lg-semibold` 16/24), and 8/10 has no step at all.
 *
 * Writing the nearest role would silently reshape the card, and writing bare numbers with no
 * note is how `24/32/700` shipped for digits Figma draws at 20/36/600 (MEMORY 2026-08-21).
 * So the literals live here, each against the node that states it, countable and greppable.
 * When the designer binds the card to the scale, this table empties.
 */
export const UNBOUND_TYPE = {
  'tile-label': { size: 14, lineHeight: 24, weight: 500, figma: 'GraphikTH/L-Medium', node: 'I21084:85095;14291:138151' },
  'tile-caption': { size: 12, lineHeight: 22, weight: 500, figma: 'GraphikTH/M-Medium', node: 'I21084:85127;14291:138126' },
  'tile-note': { size: 14, lineHeight: 24, weight: 400, figma: 'Title/Body/GraphikTH/M-Regular', node: 'I21084:85127;14291:138130' },
  'tile-flag-value': { size: 16, lineHeight: 26, weight: 600, figma: 'Title/GraphikTH/M-SemiBold', node: 'I21084:85095;14291:138155' },
  'tile-flag-unit': { size: 8, lineHeight: 10, weight: 500, figma: '(no style)', node: 'I21084:85095;14291:138154' },
} as const;

export type UnboundType = keyof typeof UNBOUND_TYPE;

/** The CSS an unbound setting resolves to. Kept in one function so the debt is one grep. */
export const unbound = (name: UnboundType) => {
  const t = UNBOUND_TYPE[name];
  return {
    fontSize: t.size,
    lineHeight: `${t.lineHeight}px`,
    fontWeight: t.weight,
  } as const;
};
