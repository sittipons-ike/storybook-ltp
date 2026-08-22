# PRD — home

> Source material: Figma `[Mobile] Home` — `home-page(mobile)` (`21085:96373`), 390 × 4651,
> on page `↳ home ✅` of *Design Systems Web App Lotteryplus V.7.1*.
> Frontend counterpart: `lotteryplus-frontend-main/src/pages/index.tsx` (route `/`).

## Why now

`/` is the route every session starts on and the one page-inventory lists first, yet four of
its six body sections were marked `not_yet` — `HomeBannerSection`, `LotterySearchAndAnnouncements`,
`LotteryLists`, `PreOrder`. Until the page exists here, a designer reviewing the home screen has
only the Frontend, which can show one state at a time and only the state its store happens to hold.

## Goals

- [x] The whole page, top to bottom, as one composition a reviewer can scroll
- [x] Every value measured from the Figma node rather than read off the Frontend
- [x] Reuse the shell and the components that already exist — Header, NavigationBar, Footer,
      SearchCard, Button, Icon, Logo, Text — and add only what the home page alone draws
- [x] Each list is a prop, so an empty section, a sold-out card and a long number are stories
      rather than states nobody can reach

## Out of scope

- The desktop composition (`home-page(desktop)`, `21094:144465`) — a separate node, a separate build
- Live data. Nothing fetches; every list arrives as a prop, same rule as `/profile`
- The lottery-tile states Figma draws but this page never uses: `Add to cart=Yes`, `Sold out=Yes`,
  `Device=Desktop`. The tile takes the props, and the stories exercise them, but the page passes
  the one combination the home page shows
- `TwentyYearsModal` — a modal the Frontend mounts on `/`, not part of the Figma page

## User stories

- ในฐานะสมาชิก ฉันอยากเห็นเลขที่กำลังขายทันทีที่เปิดแอป เพื่อไม่ต้องค้นก่อนจะรู้ว่ามีอะไรให้ซื้อ
- ในฐานะคนที่มีเลขในใจ ฉันอยากค้นเลขจากหน้าแรกได้เลย เพื่อไม่ต้องเข้าหน้าค้นหาก่อน
- ในฐานะดีไซเนอร์ ฉันอยากดูทุก state ของหน้าแรกเรียงกัน เพื่อรีวิวได้โดยไม่ต้องไปตั้ง store ให้ตรง

## Success criteria

- The page renders at 393 × 852 (iPhone 16) inside `DeviceFrame` with no horizontal overflow
- Section heights match the Figma node: header 154, search card 266, ads row 112,
  promo banner 120, quick menu 284, service block 306, footer 190, tab bar 124
- `npm run check` green — including `check-pages.py`, which refuses a page that names a token
