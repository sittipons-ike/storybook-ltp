# LotteryPlus Design System v7.1

Design System documentation built with **Storybook**, extracted from **Figma** "Design Systems Web App Lotteryplus V.7.1".

## Quick Start

```bash
npm install
npm run storybook
```

Storybook จะเปิดที่ `http://localhost:6006`

## Project Structure

```
PJ-Lottery Plus/
├── .storybook/              # Storybook configuration
│   ├── main.ts              # Stories glob, addons, framework
│   ├── preview.ts           # Story sort order, layout
│   └── preview.css          # Global styles
│
├── UI Library/
│   ├── components/          # 12 Design System Components
│   │   ├── Button/          # Primary/Secondary/Tertiary/Outline/Link × L/M/S
│   │   ├── Breadcrumb/      # Navigation breadcrumbs
│   │   ├── Dropdown/        # 8 states (Default→Error)
│   │   ├── Loading/         # Animated spinner
│   │   ├── Modal/           # 5 states × 2 layouts, uses Button + Icon
│   │   ├── NavigationBar/   # Bottom nav bar, 5 tab states
│   │   ├── ProgressBar/     # Step progress with animation
│   │   ├── RadioButton/     # Selected/None × Default/Focused/Disabled
│   │   ├── Tabs/            # Underline + Button styles, 2 color schemes
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
│       ├── Icon.tsx
│       ├── Icon.stories.tsx
│       ├── icon-data.ts     # All icon SVG data
│       └── Icon.css
│
├── package.json
└── tsconfig.json
```

## Component Architecture

แต่ละ component มี 3 ไฟล์:

| File | Purpose |
|---|---|
| `tokens.ts` | Design tokens mapped from Figma bound variables |
| `Component.tsx` | React component with inline styles from tokens |
| `Component.stories.tsx` | Storybook stories + Token Verification |

### Token Flow

```
Figma boundVariables → tokens.ts → Component.tsx → Storybook
```

ทุกค่า (spacing, radius, color, typography) ต้อง reference จาก Foundation variables เท่านั้น:

```
.1-primitive → 2-semantic → 3-component → typography
```

## Design Principles

1. **Auto Layout, Dimensions, Padding, Gap** ต้องตรงกับ Figma
2. **Spacing & Layout** ต้อง reference Foundation Variables
3. **Typography** ต้องตรง Foundation (Graphik TH)
4. **Icons** ใช้จาก Components/Icon เท่านั้น
5. **ห้ามใช้ค่านอก Foundation**
6. **ตรวจ INSTANCE nodes** — ถ้า Figma ใช้ component อื่นประกอบ ต้อง import มาใช้จริง
7. **ไม่ duplicate code** — import component ที่มีอยู่แล้ว (เช่น Modal ใช้ Button)
8. **ตรวจ effects** — shadows, strokes ทุกตัวต้องมี token

## Component Composition

```
Modal ──uses──▶ Button + Icon
Tabs  ──uses──▶ Icon (badge)
NavigationBar ──uses──▶ Icon
All Components ──uses──▶ Icon
```

## Token Verification

ทุก component มี **Token Verification** story ที่แสดง:

| Column | Description |
|---|---|
| Token | ชื่อ token (เช่น `spacing-sm`) |
| Figma Variable | ชื่อ bound variable จาก Figma |
| Value | ค่าที่ใช้จริงใน Storybook |
| Match | ✅ ตรงกัน / ❌ ไม่ตรง |

## Tech Stack

- **React** 19.x
- **TypeScript** 5.x
- **Storybook** 8.x (React-Vite)
- **Figma** — Design Systems Web App Lotteryplus V.7.1
- **Font** — Graphik TH

## Figma Integration

ใช้ Figma MCP tools ในการ extract:
- `figma_execute` — deep extract layout, fills, strokes, effects, boundVariables
- `figma_get_selection` — get selected component set
- `figma_capture_screenshot` — visual verification
- `figma_instantiate_component` — instantiate real components into flows
- `getVariableByIdAsync()` — resolve bound variable names

## License

Internal use only — Lotteryplus Design System.
