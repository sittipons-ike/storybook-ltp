# LotteryPlus Design System v7.1

Design System documentation built with **Storybook**, extracted from **Figma** "Design Systems Web App Lotteryplus V.7.1".

## Quick Start

```bash
npm install
npm run storybook
```

Storybook runs at `http://localhost:6006`

### Deploy to Vercel

```bash
npm run build-storybook   # outputs to storybook-static/
```

Vercel build settings:
- **Build Command:** `npm run build-storybook`
- **Output Directory:** `storybook-static`

## Project Structure

```
PJ-Lottery Plus/
├── .storybook/              # Storybook configuration
│   ├── main.ts              # Stories glob, addons, framework
│   ├── preview.ts           # Story sort order, layout
│   └── preview.css          # Global styles (Graphik TH font)
│
├── UI Library/
│   ├── components/          # 12 Design System Components
│   │   ├── Breadcrumb/      # Navigation breadcrumbs
│   │   ├── Button/          # Primary/Secondary/Tertiary/Outline/Link × L/M/S
│   │   ├── Dropdown/        # 8 states (Default → Error)
│   │   ├── Loading/         # Animated spinner
│   │   ├── Modal/           # 5 states × 2 layouts, uses Button + Icon
│   │   ├── NavigationBar/   # Bottom nav bar, 5 tab states
│   │   ├── ProgressBar/     # Step progress with animation
│   │   ├── RadioButton/     # Selected/None × Default/Focused/Disabled
│   │   ├── Tabs/            # Underline + Button styles, red/black schemes
│   │   ├── TextField/       # Text input field
│   │   ├── Toast/           # Toast notifications
│   │   └── ToggleSwitch/    # ON/OFF with slide animation
│   │
│   ├── foundations/          # Design Tokens documentation
│   │   ├── Colors.stories.tsx
│   │   ├── Typography.stories.tsx
│   │   ├── Spacing.stories.tsx
│   │   ├── ComponentTokens.stories.tsx
│   │   └── VerificationReport.stories.tsx
│   │
│   └── icons/               # Icon library (155 icons)
│       ├── Icon.tsx          # Icon component
│       ├── Icon.stories.tsx  # All icons gallery
│       ├── icon-data.ts     # SVG path data
│       └── Icon.css
│
├── package.json
├── tsconfig.json
└── .gitignore
```

## Component Architecture

Each component follows a 3-file pattern:

| File | Purpose |
|---|---|
| `tokens.ts` | Design tokens mapped from Figma bound variables |
| `Component.tsx` | React component with inline styles referencing tokens |
| `Component.stories.tsx` | Storybook stories + Token Verification table |

### Token Flow

```
Figma boundVariables → tokens.ts → Component.tsx → Storybook
```

All values (spacing, radius, color, typography) must reference Foundation variables only:

```
.1-primitive → 2-semantic → 3-component → typography
```

## Components

| Component | Variants | Features |
|---|---|---|
| **Button** | 5 types × 3 sizes × 5 states | Icon support, fullWidth |
| **Modal** | 5 states × 2 layouts | Uses Button + Icon, shadow tokens |
| **Dropdown** | 8 states | Keyboard nav, click-outside-close |
| **Tabs** | Underline + Button styles | Red/black schemes, 2-5 tabs, badges |
| **NavigationBar** | 5 tab states | Cart badge, alert badges |
| **ProgressBar** | 3 steps + extras | Animated progression |
| **Loading** | Single | Spinning animation |
| **ToggleSwitch** | ON/OFF | Slide animation |
| **RadioButton** | Selected/None | 3 interaction states |
| **TextField** | Multiple states | Label, placeholder, error |
| **Toast** | Notification types | Auto-dismiss |
| **Breadcrumb** | Navigation | Path display |
| **Icon** | 155 icons | Filled + Outline variants |

## Component Composition

```
Modal ──uses──▶ Button + Icon
Tabs  ──uses──▶ Icon (badge indicators)
NavigationBar ──uses──▶ Icon
Dropdown ──uses──▶ Icon (arrow)
All Components ──uses──▶ Icon
```

## Token Verification

Every component includes a **Token Verification** story showing:

| Column | Description |
|---|---|
| Token | Token name (e.g. `spacing-sm`) |
| Figma Variable | Bound variable name from Figma |
| Value | Actual value used in Storybook |
| Match | ✅ pass / ❌ fail |

## Design Principles

1. **Auto Layout, Dimensions, Padding, Gap** must match Figma exactly
2. **Spacing & Layout** must reference Foundation Variables
3. **Typography** must match Foundation (font: Graphik TH)
4. **Icons** must come from Icon component only
5. **No values outside Foundation** allowed
6. **Check INSTANCE nodes** — if Figma uses other components, import and reuse them
7. **No duplicate code** — maintain composability (e.g. Modal imports Button)
8. **Check all effects** — shadows, strokes must have tokens

## Tech Stack

- **React** 19.x
- **TypeScript** 5.x
- **Storybook** 8.x (React-Vite)
- **Vite** 6.x
- **Figma** — Design Systems Web App Lotteryplus V.7.1
- **Font** — Graphik TH

## Figma Integration

Components are extracted from Figma using MCP tools:
- `figma_execute` — deep extract layout, fills, strokes, effects, boundVariables
- `figma_get_selection` — get selected component set
- `figma_capture_screenshot` — visual verification
- `figma_instantiate_component` — place real components into flow screens
- `getVariableByIdAsync()` — resolve bound variable names

## License

Internal use only — Lotteryplus Design System.
