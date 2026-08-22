# Project Spec — Lotteryplus Design System
_Last updated: 2026-08-22 19:35_

## Current State
_หน้าที่สองของ page tier เสร็จ 2026-08-22: `features/home/` — `/` ทั้งหน้า 390×4651 วัดจาก Figma `21085:96373` ทีละ node · 11 feature component (+11 story) · 6 asset ของหน้า · อีก 3 component + 7 asset ยกขึ้น ui/ แล้ว · `npm run check` เขียว_

_Restructured 2026-08-21: `UI Library` → `ui` · feature tier ที่ `features/` (profile = UI ครบ, home = UI ครบ, gamification = docs ครบ, avatar = assets) · `~/Lottery+` ยุบเข้า repo ทั้งหมด (ของหนักอยู่ `_source/` gitignored, ของเก่าอยู่ `archive/`) · helper/page metadata ตรง Lark §3.7 แล้ว_


สร้าง **Storybook เป็น Single Source of Truth** ให้ทีม Design + Dev sync กันแบบ code-based
ตอนนี้ครบ 3 ชั้นแล้ว: token → component → pattern

| ชั้น | สถานะ |
|---|---|
| Token | 1,111 vars · verify ตรง Figma 169/169 · ไม่มี drift |
| Component | 26 ตัว (เพิ่ม **Avatar · ProfileHeader · Logo · ErrorState · LotteryCard**) · verify ระดับ node ครบ |
| Asset | **112 logo/graphic** จาก Figma → `assets/logos/` (26 svg · 86 png · ไม่เข้า bundle) |
| Pattern | 5 ตัว (+ **Stack · Surface · DeviceFrame** — structural primitive ที่ทำให้ page ไม่ต้องแตะ token) — AppShell (5 slot) + BareScreen · วัดจาก FE 81 หน้า และเทียบ Figma Template UI แล้ว |
| Storybook | 179 stories · จัดตาม **atomic design** แล้ว: Foundations → Atoms → Molecules → Organisms → Patterns → System |
| Gate | `check.sh` **10 ด่าน** · icon set-equality **20/20** · typography ต้องผูก role หรือบันทึกเป็นหนี้ (ด่าน 10) — เพิ่มด่าน *icon ตรงกับที่ Figma วาด* (set equality) ต่อจากด่าน icon resolve + ด่าน `_verified_from` |

**5 Source ที่ต้องตรงกัน:** Lark Standard (โครงสร้าง+ชื่อ) · Figma V.7.1 (ค่า — ชนะเสมอ) ·
Storybook (เป้าหมาย SSOT) · FE (ตัวให้ยืม implementation) · design.md (สะพาน)

## Decisions Made

- 2026-08-21 — **ProfileHeader icon set ตรง Figma แล้ว** (`14962:94338`, 9 variant)
  เพิ่ม `outline-document-copy` (state=login+view) + `filled-close` (state=*+actived)
  เข้า source · บันทึก `_figma_icons.nodes[]` record ที่ 2 ใน `top-and-footer.json`
- 2026-08-21 — **เลิกใช้ `parent.name === 'icons'` เป็นตัวกรองตอน walk instance tree**
  มันผิด 2 ทาง: ตก `arrow-right-S` (main component `parent === null` อยู่นอก frame `icons`)
  และเก็บ `filled-user` เกิน (Figma วาดใน `avatar` instance — Avatar.tsx เป็นเจ้าของ)
  วิธีที่ถูก: resolve ทุก INSTANCE ผ่าน `getMainComponentAsync()` แล้วดูว่า **component ไหนวาด**
- 2026-08-21 — icon ที่ nested component วาดเอง บันทึกด้วย key ขึ้นต้น `_`
  check-figma-icons.py ข้าม key พวกนี้ → documented แต่ไม่บังคับให้ parent source พูดชื่อซ้ำ

- 2026-08-19 — `top-and-footer` 1 กลุ่มสีของ Figma → 3 component (Header/Footer/ActionBar)
  ใช้ prefix `topfoot` ร่วมกัน **ไม่แยกกลุ่ม** เพราะแยกคือการ rename Figma = งาน Phase 2
- 2026-08-19 — ActionBar สร้างจากหลักฐานฝั่ง FE (17 call sites) ทั้งที่ Figma ไม่มี component set
  เป็นตัวเดียวในไลบรารีที่เป็นแบบนี้ ตาม Standard §3.3 (share by evidence)
- 2026-08-19 — หลังดีไซเนอร์ reset template: main-page ใช้ `type=home-page` 146px ที่มี app bar
  อยู่ในตัว **ไม่มี** แถบ 72px แยก → ไม่ต้องสร้าง top navbar เพิ่ม
- 2026-08-19 — Figma เปิด slot บนช่องเดียว FE เปิดสองช่อง (TopNavbar + Header)
  shell เก็บ 2 slot ตาม FE แล้ว template ของ Figma ปล่อย `top-navbar` ว่าง
- 2026-08-19 — brand asset (นกฟีนิกซ์, wordmark) copy เข้า `ui/assets/brand/`
  ไม่ใช่อ้างไปที่ FE public เพื่อให้ story ไม่ผูกกับการ checkout FE
- 2026-08-19 — **Graphik TH ของจริง** 7 น้ำหนัก (.otf) เข้า `ui/assets/fonts/GraphikThai/`
  + `@font-face` ใน preview.css — ชุดเดียวกับที่ FE โหลดใน `_app.tsx` Sarabun เหลือเป็น fallback
- 2026-08-19 — **mockup ใช้ขนาด iPhone 16 จริง** 393×852pt (token `--topfoot-device-*`)
  ไม่ใช้ 390×844 ของ Figma frame เพราะ frame = canvas ที่วาด ไม่ใช่สเปกเครื่อง
- 2026-08-19 — `NavigationBar` เพิ่ม prop `fullWidth` (item flex แทน fixed 78)
  เพราะ 390 ตายตัวทำให้เหลือขอบโล่ง 3px บนเครื่องจริง
- 2026-08-20 — **ProgressBar step กว้างคงที่ 40 · label ลอย absolute**
  ตาม Figma: label ที่กว้างเกินคอลัมน์เป็น ABSOLUTE + negative x (ล้นได้ ไม่ดันคอลัมน์)
  เส้นเชื่อมมุดใต้วงกลม 6px สองข้าง (token `progress-line-overhang`) เส้นเลยไม่ขาด
- 2026-08-20 — **default ของ component ต้องมาจาก Figma แม้ prop จะรับเป็น data**
  `ProgressBar` เลิกใช้ "Step 1..4" ที่แต่งเอง → `LOTTERY_STEPS` (4 ขั้น) + `NOKCASH_STEPS` (3 ขั้น)
  พร้อม `*_SLIP_STEPS` / `*_EXTRA_STEPS` ที่ derive จากสายหลัก · `Button.iconName` → `outline-document-copy`
- 2026-08-20 — **cart ใน NavigationBar ไม่มี selected state** ทั้ง 10 variant ใช้ `outline-cart`
  และ property `state` ไม่มีค่า `cart` → เอา `filled-cart` ออก บันทึกเป็นคำถามถึงดีไซเนอร์แทน
- 2026-08-20 — **ไฟล์ที่เป็น payload ไม่นับเป็น source** ของ `_figma_icons`
  (`ProgressBar.stories.tsx`, `Button.stories.tsx`, `Tooltip.stories.tsx`)
  icon ที่ Figma ซ่อนไว้ default นับเข้า `icons` ต่อเมื่อ component ทำ state นั้นจริง ไม่งั้นลง `_figma_gaps`
- 2026-08-20 — **กรอบปุ่ม action เป็น property ไม่ใช่ของตายตัว** `HeaderAction` มี prop `bordered`
  Figma ปิด stroke เฉพาะปุ่มย้อนกลับ (14924:3521) hamburger ทั้งสองที่ยังมี
  และวาดด้วย `box-shadow: inset` ไม่ใช่ `border` เพราะ strokeAlign = INSIDE
- 2026-08-20 — **icon ต้องบันทึกว่า Figma ใช้ตัวไหน** ไม่ใช่แค่ resolve ได้
  `base._figma_icons.nodes[]` เก็บ node + sources + icon ที่ Figma instantiate จริง
  `check-figma-icons.py` บังคับ **set equality** — icon เกิน fail เท่ากับ icon ขาด
- 2026-08-20 — **เอา `grep -v "icons/icon-data.ts"` ออกจาก `check.sh`**
  ที่กลบไว้ว่า "known duplicates" คือ key ซ้ำ 4 คู่จริง (Figma เองมี component ชื่อซ้ำ 161/157)
  ตัวที่ shadow อยู่ตรงกับ Figma แล้ว จึงลบตัวแรกทิ้ง ไม่ใช่แก้ค่า
- 2026-08-19 — **checkbox error `#EF4444` เอาตาม Figma** (ทีมตัดสิน) แม้จะเป็น Tailwind red.500
  ที่ระบบ override เป็น `#E32321` ไปแล้ว เก็บเป็น literal ใน `border-error` ไม่สลับเงียบๆ
- 2026-08-19 — **`Divider` สร้างจาก token** (ทีมตัดสิน) เพราะ Figma มี `colors/divider` 5 role
  อยู่แล้ว ขาดแค่ component · สีที่ FE ใช้ (#B9B9B9 ฯลฯ) เป็น Tailwind เก่า ไม่ลอกมา
- 2026-08-19 — **Storybook แยกตาม atomic design** โดยอ่าน `composition_level` จาก
  `components.json` ไม่ได้จัดมือ → sidebar หลุดจาก spec ไม่ได้
- 2026-08-19 — **เพิ่มด่าน `check-icons.py`** เข้า `check.sh` ทุกชื่อ icon ต้อง resolve ได้
  จับ `outline-search` ที่พิมพ์ผิด (set ใช้ `outline-Search`) ซึ่งทำให้ story มีปุ่มว่างมานาน
- 2026-08-19 — **logo/graphic เก็บเป็นไฟล์ ไม่ใช่ icon** (ทีมตัดสิน) เพราะ 70/107 สีตายตัวไม่ผูก
  variable และหลายตัวเป็นโลโก้ของคนอื่น เรนเดอร์เป็น `<img>` = เปลี่ยนสีไม่ได้โดยโครงสร้าง
- 2026-08-19 — **ฟอร์แมต logo ตัดสินด้วยการวัด** SVG ถ้า ≤20KB ไม่งั้น PNG@3x
  (`gp-jidrit-search` 412KB → 26KB · `logo-bank-gsb` 187KB → 18KB)
- 2026-08-19 — `header-bar-profile-moblie` แยกเป็น **ProfileHeader** ตาม Figma ที่แยก set
  ไม่ยัดเป็น `type` ของ Header · ต้องมี **Avatar** ก่อน จึงสร้าง Avatar เป็น atom
- 2026-08-19 — **เส้นแบ่ง asset ↔ component**: รูปคือ asset · การจัดวางรูปคือ component
  `noti-error` อยู่หน้ารูปแต่เป็น component set → **ErrorState** (ภาพทั้ง 3 มีใน manifest แล้ว)
  `Card` → **LotteryCard** (หน้าการ์ด 3 ไฟล์ คนละขนาด ไม่ใช่ย่อรูปเดียว)
- ก่อนหน้า — ไม่ port `layout/index.tsx` ของ FE (import 10 API + 11 stores) model รูปร่างแทน

## ผล audit ทาบ Figma ทีละ node (2026-08-19)

ไล่ครบทุก component · ทุก variant · ทุก property (`visible`, `opacity`, `blendMode`,
`absoluteBoundingBox`, `mainComponent` ของ instance ลูก) · ทุกตัวมี `_verified_from`
บันทึก node id + วันที่ + ขอบเขต → ตรวจซ้ำได้

**18/18 overlay verified · แก้ 24 จุด**

| component | ผล |
|---|---|
| Breadcrumb · Dropdown · TextField · Modal · ProgressBar · ToggleSwitch | ตรงหมด |
| RadioButton | ring 3 → **4** (Figma บอกไว้ แต่ไฟล์เขียนว่า "Figma ไม่กำหนด") |
| Toast | ระยะปุ่มปิด 16 → **8** (Figma ซ้อน 2 แถวคนละ gap) |
| Tabs | root สูง 41 → **40** (Figma ตีเส้น INSIDE) |
| Tooltip | เงา `elevation.card` → **`#3F3F44` วงแหวน 1px + เงา** · Figma มี artwork แต่ไม่ได้ทำเป็น component |
| Loading | เพิ่ม variant **arc สีแดง** ที่ Figma มีแต่เราไม่มี |
| NavigationBar | ขาวทาผิดที่ · เส้นขอบสูงเกิน 22px · ตะกร้าไม่มีเซลล์ขาวรอง |
| LottoBoard | header ซ้อน → **เรียงแถว** · ปุ่มสุ่มขาว → **gradient ดำ→แดง** |
| Button | icon-only ไม่เป็นสี่เหลี่ยมจัตุรัส · icon size S 24 → **16** · padding S 2 → **6** |
| Checkbox | รื้อใหม่ทั้งตัว (อ่าน node ที่ซ่อนอยู่) |
| Header/Footer/ActionBar | phoenix opacity 40 → **70** · เพิ่ม HARD_LIGHT · logo ผิดตัว |
| Divider | **ยืนยันว่า Figma ไม่มีจริง** — ค้นทุกหน้าแล้ว |

### สิ่งที่ Figma ควรแก้ (ไม่ใช่งานเรา)
- `#EF4444` ของ checkbox error = Tailwind red เก่าที่ override ไปแล้ว (ทีมเลือกคงไว้)
- `#3F3F44` ของเงา tooltip ไม่มีในระบบเลย
- Tooltip เป็น FRAME ลอย ไม่ใช่ component → instance ไม่ได้
- `tabs-for-orders` เป็นชุดที่ 3 · `search-card` ซ้ำกับ `lotto-board-mobile`
- `button-special` (ปุ่มสุ่ม) แยกเป็น set ของตัวเอง ไม่ใช่ variant ของ button
- ไม่มี glyph สำหรับปุ่มสุ่ม
- ToggleSwitch ไม่มี focus/disabled variant (เราเติมเองเพื่อ accessibility)
- `progress-bars-nokcash` เป็นชุดที่ 2 ที่เรายังไม่ทำ

## แผนอุด gap ระหว่าง FE ↔ Storybook

วัดจาก FE 458 component dir · นับ import จริง · เกณฑ์ ≥2 usage · atomic level มาจากการ compose
รายละเอียดเต็มอยู่ที่ `design-library/lotteryplus/frontend-gap-inventory.json`

**45 ตัวที่ FE มีแต่ Storybook ยังไม่มี** → atom 21 · molecule 8 · organism 1 · data 15

### Phase A — atom ที่ Figma มีของให้อ้างอิงแล้ว
- [x] ~~`avatar`~~ → **สร้างแล้ว** 10 variant · สเกลจากฐาน 40 (1.4× = 56 ในหน้า profile)
- [ ] **`Typography` component** (210 + 17 usage) ← Figma `Text Container` (22496:24403, 3 variants)
      **หมายเหตุ:** `Foundations/Typography` ที่มีอยู่คือ *ตารางโชว์ token* (type scale / weight /
      line-height) เป็นเอกสาร ไม่ใช่ของที่ dev `import` ไปใช้ ที่ขาดคือ component ที่แยก
      `variant` (h1/h2/p/span/label = semantic HTML) ออกจาก `size` (type role) คนละแกน —
      เพราะ SEO: `<h1>` ไม่จำเป็นต้องตัวใหญ่สุด
- [ ] `contacts-information` (3) ← Figma `contact` (14291:122990)
- [ ] `header-banner-safe` (5) ← Figma `safe banner` gift/lottery/jidrit (20229:8507-8509)

### Phase B — ติดที่ Figma ยังไม่มี component
- [x] ~~`dash-line` (46 usage)~~ → **สร้างเป็น `Divider` แล้ว** จาก `colors/divider` 5 role ของ Figma
      (Figma ไม่มี component แต่มี token) · token chain 7/7 match
- [ ] เหลือ 8 ตัว: `skeleton` (8) · `title-with-underline` (6) · `accordion` (3) · `badge` (3) ·
      `new-feature-label` (3) · `infinity-scroll` (3) · `timer` (2) · `textarea` (2)

### Phase C — molecule/organism (9 ตัว) ยังไม่ได้ค้น Figma
รอ Phase A/B จบก่อน เพราะหลายตัว compose จาก atom ที่ยังไม่มี

### ไม่ทำ — data (15 ตัว)
ผูก store / API / router → ควรอยู่ใน Storybook ตัวที่ 2 ใน repo FE ที่มี mock อยู่แล้ว
ไม่ใช่ลากเข้ามาที่นี่

## Roadmap — Page Tier (ตัดสิน 2026-08-20)

**Goal:** Storybook มี page ครบทุกหน้าที่ FE มี (82 page files / ~50 หน้า) โดยทุกชิ้นในหน้า
ดึงจาก repo นี้เท่านั้น — **ห้าม page เรียก `sys()` / `--sys-*` ตรง** ต้องผ่าน component/pattern API
**AC:** component ทุกตัวถูก rename ตามกฎ (Lark Standard) แล้ว ก่อนปิดงาน

| Phase | งาน | สถานะ / บล็อกอะไร |
|---|---|---|
| P0 | gen ตาราง rename 508 รายการ + 17 decisions → ส่งดีไซเนอร์ | ✅ `figma-rename-table.md` — รออนุมัติ |
| P1 | component ให้ครบก่อนประกอบหน้า | ✅ **7 ตัวจาก FE เสร็จ** (Skeleton · TitleWithUnderline · Accordion · InfiniteScroll · CountdownTimer · Alert · ImageUpload) 14 stories · วัดเทียบ FE ตรงทุกค่า · เหลือ ProfileHeader (อีก session) + 6 icon ที่ขาด |
| P2 | รัน rename บนไฟล์ copy → verify (id/value/binding ครบ) → production + flip โค้ดในหน้าต่างเดียวกัน | ⏸ บล็อกที่ลายเซ็นดีไซเนอร์ |
| P3 | inventory + Pages/ + ด่าน no-raw-sys | ✅ **inventory เสร็จ** `page-inventory.json` — 78 route · 6 หน้าแรกแมป slot ครบ · ✅ **ด่าน 9 ทำงานแล้ว** พิสูจน์แดง/เขียวจริง · ⏸ รอตอบ 3 คำถามก่อนสร้างหน้าแรก |
| AC | หน้าถูกนับว่าเสร็จเมื่อ component ในหน้า rename ครบ + gate ผ่าน | — |

- 2026-08-20 — **กฎ authority แก้:** "Figma ชนะเสมอ*เมื่อ Figma มี* — ไม่มีให้ตาม FE"
  (user ตัดสิน) → 7 ตัวใน `blocked_on_figma` ปลดล็อก สร้างจาก FE พร้อม `_verified_from` ระบุที่มา

## Page Tier — โครงที่ตกลงแล้ว (2026-08-21)

```
ui/
  fixtures/            ← ข้อมูลจริง ยก type จาก FE (types.ts · user.ts)
  pages/profile/
    Profile.tsx        ← รับข้อมูลเป็น prop ไม่ fetch · ไม่แตะ token
    Profile.stories.tsx
    fixtures.ts        ← banner = URL (มาจาก API) + artwork เฉพาะหน้า
    assets/            ← 14 รูปของหน้านี้
```

**กฎเก็บรูป:** มาจาก API → `fixtures/` · หลายหน้าใช้ → `ui/assets/` · หน้าเดียว → อยู่กับหน้านั้น

**หน้าแรกเสร็จแล้ว** `/profile` · 5 state (ปกติ · อายุไม่ถึง 20 · ไม่มีบัญชีธนาคาร · ปิด flag · ยอด 13 หลัก)
ยืนยันแล้วว่ายอด `5,239,822,249,018` ไม่ทำการ์ดแตก

**หน้าที่สองเสร็จแล้ว** `/` (2026-08-22) · `features/home/` ตามโครง `features/_template`
prd.md · ux-home.md · page.yaml (§3.7) · fixtures.ts · components/ 11 ตัว · pages/ 3 story

| บล็อก | Figma | วัดได้ |
|---|---|---|
| header `type=home-page` | 154 | 154 ✅ |
| `main-home-card` + search | 266 | 266 ✅ |
| แถวโฆษณา | 112 | 112 ✅ |
| แบนเนอร์ + จุด | 120 | 120 ✅ |
| นาทีทอง (`Lottery-1`) | 763 | 763 ✅ |
| เลขชุด | 390 | 390 ✅ |
| เลขท้าย 2/3 · เลขหน้า 3 | 499 | 500 (ดู debt ข้างล่าง) |
| quick menu | 284 | 284 ✅ |
| SEO | 210 | 209 |
| บริการเสริม | 306 · การ์ด 258 | 306 · 258 ✅ |
| footer | 190 | 190 ✅ |

**Feature component (scope: feature — ขึ้น `ui/` เมื่อมีที่ใช้ซ้ำ ≥2 ตาม §3.3):**
`LotteryTile` · `LotterySection` · `FlashSaleBanner` · `CountdownPanel` · `QuickMenuGrid` ·
`CarouselDots` · `SeoPanel` · `AddOnServiceCard` · `HomeAdsRow` · `PromoBanner` ·
`HomeRedBlock`
ทุกตัวมี `.stories.tsx` ของตัวเองแล้ว → เห็นใน Storybook กลุ่ม `Features/Home/*`

**หนี้ที่บันทึกไว้ (ไม่ใช่บั๊กของเรา — Figma ใช้ style เก่า):**
- หัวข้อหมวด + หัว SEO ชี้ `typography/heading/h2` / `[NEW] Typo/Heading/H2` = 28/42 **Medium**
  แต่ชุด local style ของไฟล์มีแค่ `h2-semb` (Semibold) → ใช้ `heading-h2-semibold`
- subtitle ชี้ `[NEW] Typo/Sub-Title/L-Med` = 14/**21** ส่วน local `sub-title/l-med` = 14/**22**
  → หมวดที่มี subtitle เลยสูงกว่า Figma 1px (499 → 500)
- `lottery-card` ใช้ฟอนต์ดิบทั้งใบ (14/24, 12/22, 16/26, 8/10) ไม่มี role รองรับ
  บันทึกเป็น `UNBOUND_TYPE` ใน `features/home/components/tokens.ts` พร้อม node id
- `tools/import-figma-assets.py` ตัวใหม่ — ทางลำเลียง asset จาก Figma ลง `features/<name>/assets`

- 2026-08-22 — **Footer มี default ของตัวเองแล้ว** `<Footer />` เปล่าๆ วาดตรง Figma
  glyph 5 ช่อง + ชิป visitor/DBD อยู่ใน main component (`14291:133483`) ไม่ใช่ของหน้า
  → ย้ายเข้า `ui/assets/brand/` เสิร์ฟผ่าน `asset()` · story เดิมที่ใช้ icon มั่วๆ แทน (กระดิ่ง=Facebook)
  ถูกเอาออก · `features/home/components/HomeFooter.tsx` ลบทิ้ง
- 2026-08-22 — **3 ตัวที่ทำผิดที่ ยกขึ้น `ui/` แล้ว** (user ทัก ถูกทั้งสามครั้ง)
  หลักฐานเดียวกันทุกตัว: Figma model มันเป็น component ของระบบ และ instance ที่ `/` **override 0**
  · `SearchBoard` → `ui/components/LottoBoard/MainHomeCard` — `main-home-card` เป็น COMPONENT_SET
    **7 variant** (`14854:33344`) ทำแล้ว 1 · อีก 6 ลง `_figma_gaps` พร้อมความสูง ไม่ stub เปล่า
    ได้ token namespace `main-*` ต่อจาก cell-/menu-/set-/card-
  · `HeaderCounter` → `ui/components/Header/` — อยู่ใน main component `type=home-page` (`21282:140741`)
    `Header.stories.tsx` เคยมี `Counter` ของตัวเองซ้ำอีกตัว เอาออกแล้ว ใช้ตัวเดียวกับที่ page ใช้
  · `HomeFooter` → default ของ `ui/components/Footer`
  **ข้อสังเกต:** ทั้งสามเกิดจากถามว่า "หน้านี้ต้องการอะไร" แทนที่จะถามว่า "Figma วาดของนี้ไว้ที่ไหน"
  เกณฑ์ที่ใช้ได้จริง = ดึง main component แล้วดู `overrides.length` ถ้า 0 แปลว่าเป็นของ component
- 2026-08-22 — **ด่านสีเปลี่ยนเป็นนับได้** `tools/check-literal-colours.py` แทน `grep -v` ทั้งไฟล์
  ยกเว้นทีละ literal พร้อมเหตุผล + node · fail ทั้งตอนมีตัวใหม่และตอน entry ค้าง (ทดสอบทั้งสองทางแล้ว)
  story ยังไม่บังคับ แต่**นับให้เห็นทุกครั้ง** — ตอนนี้ 40 ตัวใน 6 ไฟล์ เป็นงานแยกต่างหาก

- 2026-08-21 — **variant ปุ่มเปลี่ยนชื่อให้ตรงกับที่มันวาด** (ตัดสิน: ทางเลือก A)
  `tertiary`→`outline` (มีเส้น 6 token) · `outline`→`ghost` (ไม่มีเส้นเลย) · `link` ขึ้นทะเบียน extension
  **แก้ฝั่งโค้ดก่อน Figma ยังใช้ชื่อเก่า** — ตั้งใจให้ต่างกันชั่วคราว เหตุผลอยู่ใน `phase3-vocabulary.md`
  และ `Button.stories.tsx → figmaName()` เป็นตัวเชื่อมระหว่างสองฝั่ง

- 2026-08-21 — **CI รัน `check.sh` ทุก PR** (`.github/workflows/design-system.yml`)
  พิสูจน์บน clean clone แล้วว่าผ่าน 10 ด่าน และ **แดงจริง** เมื่อใส่ค่าแต่งเอง (exit 1)
  build Storybook เป็นขั้นสุดท้าย — gate ที่ผ่านบน tree ที่ build ไม่ได้คือ gate ที่โกหก
- 2026-08-21 — **deploy Storybook ขึ้น GitHub Pages** จาก build เดียวกับที่ผ่าน gate
  (artifact เก็บทุก PR ให้ reviewer โหลดไปกดดูได้)
- 2026-08-21 — **`CONTRIBUTING.md`** — กฎทั้งหมดพร้อมเหตุผลว่ากันบั๊กตัวไหน

- 2026-08-21 — **Header ได้ variant ที่ 4: `main`** จาก Figma `type=type4` (23625:34736)
  390×68 · หัวข้อชิดซ้าย `display/xl-semb` + counters ขวา — คือ `big_title` ที่ FE วาดที่ 96, Figma บอก 68
- 2026-08-21 — **หัวข้อใหญ่ทั้งสองที่ใช้ `display/xl/semibold`** (main + success) ตามที่ดีไซเนอร์ restyle
- 2026-08-21 — **icon ครบ 157 = เท่า Figma เป๊ะ** เพิ่ม 6 ตัวที่ขาด · `IconData` รองรับ stroke icon แล้ว
  ด่าน icon เป็น **set equality** ทั้งสองทิศ (`figma-icon-names.json`)


### 2026-08-21 (เย็น) — hug ทั้ง header set · ProfileSummary divider · navbar overlay

- **`header-bar-mobile` ทุก variant เปลี่ยนเป็น hug + ดีไซเนอร์ย้าย padding** — อ่านรอบสาม:
  home 146→**154** (padding-top 8→16), sub 56→**68** (padding 16 ย้ายจาก heading ขึ้น bar,
  heading กลายเป็นกล่อง FIXED 36), success 94→**96** (ปิด gap 94-vs-96 ตามทิศที่ library
  render อยู่แล้ว) — วัดในเบราว์เซอร์ตรงทุกตัว
- **ProfileSummary เส้นคั่นกลับมาเห็นได้** — Figma วาด `Line` ไม่มี fill ให้พื้นแดงทะลุ + เส้นประขาวทับ
  ผมเคยแปลเป็นขาวบนขาว = ล่องหน · แก้เป็น 1px แดงทะลุ + repeating-linear-gradient ขาว 4/4 ·
  ขอบทอง 3px เปลี่ยน border-top → inset shadow (INSIDE ห้ามกินพื้นที่) · การ์ดล่าง**ไม่มี** border
  (strokes ว่าง — เคยอ่าน strokeWeight แทน paint list) · บล็อกวัดได้ 187 = 16+80+1+74+16 ตรง Figma
- **ProfileSummary มี story ตัวเองแล้ว** (`Organisms/ProfileSummary`) + ตอบ user: ก้อนนี้เป็น
  component อยู่ที่ `ui/components/ProfileSummary/` · ข้างในยังเป็น slot เพราะ Figma
  componentise `nokcash-profile` + `summary-icon-profile` ไว้แล้วแต่ library ยังไม่มี —
  บันทึกลง component-inventory.json (page profile: 9 sets, unmodelled 8)
- **AppShell: bottom-navbar เป็น overlay แล้ว** — user ทักพื้นเทาโผล่บน strip โปร่ง 22px ·
  สาเหตุ: bar โปร่งจริงแต่ flex stack ไม่มีอะไรข้างหลัง · แก้เป็น absolute bottom + main
  เผื่อ paddingBottom = var(--navigation-height) · ยืนยันแล้ว banner ทะลุ strip

## Next Up

- [x] ~~**asset path พังบน Pages**~~ — แก้แล้ว 2026-08-21: `asset()` + base จากชื่อ repo + ด่านที่ 11
- [ ] **Storybook ยัง public — ตั้งใจพักไว้ (2026-08-21)** · `sittipons-ike.github.io/storybook-ltp`
      ใครมีลิงก์เปิดได้ · GitHub Pages ไม่มีระบบจำกัดคนดูนอกจาก Enterprise Cloud
      ถ้าจะ private ต้องย้าย host: Chromatic (ผูกสิทธิ์กับ collaborator, คนดูต้องมี GitHub)
      หรือ Cloudflare Pages + Access (email OTP, ไม่ต้องมี GitHub) — ยังไม่ได้เช็ค pricing จริง
- [ ] **required status check ยังไม่ได้ตั้ง** — Settings → Branches → `main` → require `check`
      ตอนนี้ด่าน 10 ขั้นรายงานอย่างเดียว ยังบล็อก merge ไม่ได้
- [ ] `gh auth login` ยังไม่ได้ทำ — gh 2.98.0 ลงแล้วที่ `/opt/homebrew/opt/gh/bin/gh` (symlink หาย, `brew link --overwrite gh`)

- [x] ~~`Verification Report` ปลอม~~ → **เขียนใหม่แล้ว** อ่านจาก 3 แหล่งจริง:
      live `getComputedStyle` (1187 token) · `verification-result.json` · `component-verification.json`
      ทดสอบแล้วว่าจับ error ได้จริง (แก้ token → รายงานทันที)
- [ ] **Phase 4 ที่เหลือ** — ~700 hardcoded hex ใน foundation/system stories
      (หน้าโชว์สีที่ไม่ได้อ่านสีจากระบบ) · gate ยกเว้น `.stories.tsx` อยู่
- [ ] **Phase 2** — rename 525/1153 vars ใน Figma file `Re-naming Tokens` (map พร้อมแล้วที่
      `design-library/lotteryplus/figma-rename-map.md`) ต้อง gen รายการ before→after ให้ดีไซเนอร์อนุมัติก่อน
- [ ] คัด organism 183 ไฟล์จาก FE ที่ยกเข้า Storybook ได้ (เกณฑ์ ≥2 usage)
- [ ] top navbar 72px — รอคำตอบว่าใช้ component ตัวไหน
- [x] ~~ลง `_figma_icons` ให้ครบ~~ → **20/20 แล้ว** (ทุกตัวที่มีทั้ง figma_node และ source)
      เหลือ `icon` ตัวเดียวที่ยังไม่ลง — เป็น registry เอง จะ lock ได้ต้อง import 6 icon ที่ขาดก่อน
      เจอของแต่งเอง 4 จุดระหว่างทาง แก้หมดแล้ว (ProgressBar · Button · NavigationBar cart · SetSelect)
- [ ] 🔄 **ProfileHeader ไม่ตรง Figma** (กำลังรันอยู่อีก session) — `header-bar-profile-moblie` (14962:94338) ใช้
      `outline-document-copy` · `filled-close` · `filled-user` ที่ยังไม่มีใน source
      และ source ใช้ `arrow-right-S` ที่ Figma ไม่ได้วาดไว้ (ยังไม่ยืนยันว่า chevron เป็น vector ดิบ)
- [ ] **6 icon ใน Figma ที่ยังไม่ import** (ทำแล้วจะ lock `icon` ด้วย set equality ได้) — `filled-clock` · `outline-arrow` · `outline-building` ·
      `outline-copy` · `outline-list` · `outline-menu` (ของที่ ship อยู่ 151 ตัว ไม่มีตัวไหนที่ Figma ไม่มี)

## Blocked — รอทีมตอบ

อยู่ครบใน `design-library/lotteryplus/patterns.json → open_questions` (8 ข้อ) และ
`component-inventory.json → questions_for_the_team` ข้อที่ด่วนที่สุด:

1. template 2 หน้าแก้แล้ว แต่ยังมี **35 instance** ที่อื่น (หน้า tabs / orders / All page in App)
   ชี้ไป component ที่ parent = null — `top-navigation-mobile/lottery/main-page` (14924:2116)
   และ `.../nokplus/sub-page-noti` (15416:3648)
2. text style 4 ตัวใน `header-bar-mobile` ยังไม่ได้ย้ายเข้า token system (14/24 กับ 22/34 ไม่มี role รองรับ)
3. พื้นหลังหน้าเพจ Figma เขียนไว้ 2 ที่ไม่ตรงกัน — artwork = `bg-s-light` (#FAFAFA), annotation = `bg-light` (#F5F5F5)
