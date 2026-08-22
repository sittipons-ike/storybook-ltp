# UX — home

Everything below was read off `home-page(mobile)` (`21085:96373`) on 2026-08-22, node by node.
Where a number appears here it is the number Figma reports, not one derived from the Frontend.

## Flow

```
เปิดแอป → /  ─┬─ ค้นเลข            → SearchCard (เลือก ทั้งหมด/เดี่ยว/ชุด → กรอกเลข → ค้นหา)
              ├─ กดการ์ดสลาก        → หยิบใส่ตะกร้า
              ├─ กด "ดูเลขทั้งหมด"   → /lottoboard
              ├─ กดเมนูบริการ        → /nokcash · /nok-shop · /lottocheck · …
              └─ กดแบนเนอร์          → ปลายทางของแบนเนอร์นั้น
```

Unhappy paths the page has to be able to show, and how:

| อะไรเกิด | หน้าแสดงยังไง | prop |
|---|---|---|
| หมวดไหนไม่มีเลขขาย | หมวดนั้นหายไปทั้งก้อน ไม่ใช่แสดงหัวข้อว่าง | `sections` ไม่มีรายการนั้น |
| นาทีทองจบแล้ว | บล็อกนับถอยหลังหายไป เหลือ grid ปกติ | `flashSale` = `undefined` |
| ปิด affiliate / nokshop | เมนูนั้นหลุดจาก quick menu | `quickMenu` ไม่มีรายการนั้น |
| ไม่มีแบนเนอร์รอบนี้ | แถวแบนเนอร์ทั้งแถบหายไป ไม่เหลือช่องว่าง | `promoBanners` = `[]` |

## Screens

หน้าเดียว เลื่อนยาว 4651px (390 กว้าง) เรียงตามที่ Figma วาง:

| # | บล็อก | Figma node | สูง | ที่มา |
|---|---|---|---|---|
| 0 | StatusBar | `21084:85178` | 47 | `ui/components/StatusBar` |
| 1 | Header `type=home-page` | `21282:143458` | 154 | `ui/components/Header` variant `home` |
| 2 | `main-home-card` + `lotto-board-mobile` | `21084:85041` | 266 | `SearchBoard` ครอบ `ui/components/LottoBoard/SearchCard` |
| 3 | แถวโฆษณา 2 ช่อง | `22244:118774` | 112 | `HomeAdsRow` (รูป) |
| 4 | แบนเนอร์ + จุดบอกหน้า | `22244:118794` | 120 | `PromoBanner` + `CarouselDots` |
| 5 | บล็อกแดง — 5 หมวดสลาก | `21084:85067` | 2810 | `LotterySection` + `LotteryTile` + `CountdownPanel` |
| 6 | บริการ (quick menu 5+5) | `21086:143142` | 284 | `QuickMenuGrid` + `CarouselDots` |
| 7 | SEO | `21084:85163` | 210 | `SeoPanel` |
| 8 | บริการเสริม | `21084:85173` | 306 | `AddOnServiceCard` |
| 9 | Footer | `21084:85176` | 190 | `ui/components/Footer` — `<Footer />` เปล่าๆ |
| 10 | NavigationBar `state=home` | `21084:85180` | 124 | `ui/components/NavigationBar` |

หมวดสลากทั้ง 5 (บล็อก 5) ใช้โครงเดียวกัน ต่างกันที่หัวข้อกับชนิดการ์ด:

| หมวด | หัวข้อ | การ์ด | แถว |
|---|---|---|---|
| นาทีทอง | รูป headline + `เพียง 1,000 ชุดเท่านั้น` + นับถอยหลัง | `Type=Set` 170×124 | 3 |
| เลขชุด | `เลขชุด` (h2) | `Type=Set` 170×124 | 2 |
| เลขท้าย 2 ตัว | h2 + ไอคอน info + คำอธิบาย | `Type=Select` 170×196 | 2 |
| เลขท้าย 3 ตัว | เหมือนกัน | `Type=Select` 170×196 | 2 |
| เลขหน้า 3 ตัว | เหมือนกัน | `Type=Select` 170×196 | 2 |

## Components

**Reuse จาก `ui/`** — ไม่แตะ ไม่ fork:
`StatusBar` · `Header` (variant `home`) · `NavigationBar` · `Footer` (ไม่ต้องส่ง prop — ดูด้านล่าง) · `SearchCard` (LottoBoard) ·
`Button` · `Text` · `Icon` · `Logo` · `Divider` · `Stack` · `Surface` · `DeviceFrame` · `AppShell`

**ใหม่เฉพาะ feature นี้** — อยู่ที่ `features/home/components/`, `scope: feature`
(ขึ้น `ui/` ได้ต่อเมื่อมีหลักฐานใช้ซ้ำ ≥2 ที่ ตาม Lark §3.3):

| component | Figma | ทำไมยังไม่ขึ้น ui/ |
|---|---|---|
| `LotteryTile` | `lottery-card` (`14291:138…`) | หน้าเดียวที่วาด — `/lottoboard` ยังไม่ได้ทำ พอทำแล้วค่อยย้าย |
| `LotterySection` | `Lottery-1…4` | หัวข้อ + grid + ปุ่ม ของหน้าแรกโดยเฉพาะ |
| `FlashSaleBanner` | `Frame 43608` + `Frame 43604` | รูป headline + บรรทัดที่ซ้อนขึ้นไป 8 + นับถอยหลัง |
| `CountdownPanel` | `Frame 43604` | `ui/components/CountdownTimer` เป็นตัวจับเวลาเชิงตรรกะ อันนี้คือ 4 ช่องขาวของนาทีทอง |
| `QuickMenuGrid` | `menu-nok-more-mobile Var.2` | Figma มี set นี้อยู่แล้ว แต่ยังมีที่ใช้ที่เดียว |
| `CarouselDots` | `Navigation` (`9005:33166`) | ใช้ 2 ที่ในหน้านี้ (แบนเนอร์ + quick menu) — ยังนับเป็นหน้าเดียว |
| `SeoPanel` | `SEO Support` | ข้อความยาวที่พับไว้ + เงาไล่สี + ลูกศร |
| `AddOnServiceCard` | `add-on-service` (`16821:38580`) | การ์ดบริการเสริม |
| `HomeAdsRow` | `Frame 1000013545` | โฆษณา 2 ช่อง — เป็นรูปที่ดีไซเนอร์สลับได้ |
| `PromoBanner` | `Banner Promote` | แบนเนอร์ + จุดบอกหน้า |
| `SearchBoard` | `main-home-card` | กรอบไล่สีที่ครอบ SearchCard + แถบแดงที่โผล่ใต้ header |
| `HomeRedBlock` | `Lottery` (`21084:85067`, `85173`) | พื้นแดงมุมบน 24 — มีเพื่อให้ page ไม่ต้องพูดคำว่า "แดง" |
| `HeaderCounter` | `appbar-main` (`21282:140831`) | ตัวเลขนกแคช/สลากบน header — story แตะ token ไม่ได้ เลยต้องเป็น component |

### Footer — ของที่ยกกลับขึ้นไปที่ส่วนกลาง (2026-08-22)

ตอนแรกหน้านี้มี `HomeFooter` ของตัวเอง เพราะ `ui/components/Footer` ตั้ง `socials` กับ `chips`
เป็น `[]` — เรียก `<Footer />` เปล่าๆ แล้วได้แถบแดงว่าง ทุกหน้าต้องหา glyph มาใส่เอง

พอไปอ่าน main component (`14291:133483`) พบว่า glyph ทั้ง 5 ช่องกับชิป 2 อันอยู่**ข้างใน**
`footer-mobile` เอง และ instance ที่หน้า `/` (`21084:85176`) ไม่ override อะไรเลยสักจุด
แปลว่าของพวกนี้เป็นของ component ไม่ใช่ของหน้า → ย้ายขึ้นเป็น default ของ `Footer` แล้ว
asset ไปอยู่ `ui/assets/brand/` เสิร์ฟผ่าน `asset()` (ทางเดียวกับ phoenix/wordmark ของ header)

`HomeFooter` เลยถูกลบ หน้านี้ใช้ `<Footer />` ตรงๆ

## Edge cases

- **สระล่างไทยกับกล่องที่รัดพอดี** — ทุกข้อความในหน้านี้ไม่ตั้ง fixed height ทับ line-height
  ยกเว้นตัวเลขนับถอยหลัง ซึ่ง Figma ตั้ง `textAlignVertical: CENTER` ไว้ กล่อง 36 กับ line-height 48
  จึงวางกลางตรงกันพอดีทั้งสองฝั่ง (วัดจาก `absoluteRenderBounds` ของ `21084:85078`)
- **รูปห้ามประกาศ aspect-ratio ทับ** — แบนเนอร์และโฆษณาใช้ `width:100%; height:auto`
  ปล่อยสัดส่วนจริงของไฟล์ทำงาน (บทเรียนจาก `/profile`: การ์ดถูกยืด 16% เพราะลอกขนาดกล่องของ FE มา)
- **หัวการ์ดยาว** — แถบหัวถูกตรึงไว้ที่ 32 และ **ชื่อหมวดเป็นตัวที่ยอมย่อ** ส่วนเลขกับจำนวนใบไม่ย่อ
  (ไม่ตรึงแล้ววัดได้ 74 → การ์ดกลายเป็น 238 และใบข้างๆ สูงตามไปด้วย) มี story `หัวการ์ดยาวเกินแถว` คุมไว้
  ตอนใช้ ellipsis กับไทย กล่องตัดต้องกว้างกว่า line box — ใส่ `padding: 8px 0; margin: -8px 0` แล้ว
- **แถวสุดท้ายมีการ์ดใบเดียว** — grid เป็น 2 คอลัมน์คงที่ ใบเดียวอยู่ซ้าย (วัดได้ x=16) ไม่ยืดเต็มแถว
- **NavigationBar ทับเนื้อหา** — bar โปร่ง 22px บน AppShell จึงเผื่อ scroll padding เท่าความสูง bar ให้แล้ว

## สิ่งที่พบใน Figma และควรถามดีไซเนอร์ (ไม่ใช่งานเรา)

1. หัวข้อหมวด (`เลขชุด`, `เลขท้าย 2 ตัว`, …) ผูก text style ชื่อ `typography/heading/h2`
   และ `[NEW] Typo/Heading/H2` ซึ่ง **ไม่มีในชุด local style ของไฟล์** — ชุดจริงมีแต่ `h2-semb`
   ค่าที่วัดได้คือ 28/42 **Medium** ส่วน `h2-semb` เป็น Semibold
   หน้านี้จึงใช้ role `heading-h2-semibold` (ตัวที่ระบบมี) และบันทึกความต่างของน้ำหนักไว้ตรงนี้
   ถ้าดีไซเนอร์ยืนยันว่าตั้งใจให้เป็น Medium ระบบต้องเพิ่ม `heading.h2.medium` ก่อน แล้วค่อยเปลี่ยน
2. คำอธิบายใต้หัวข้อชี้ `[NEW] Typo/Sub-Title/L-Med` = 14/**21** ส่วน local `typography/sub-title/l-med`
   = 14/**22** — หน้านี้ผูก `sub-title-lg-medium` (ตัวที่ระบบมี) หมวดที่มีคำอธิบายจึงสูงกว่าที่ Figma
   ประกาศ 1px (499 → 500) ตัวเลขที่เหลือทั้งหน้าตรงเป๊ะ
3. `Top-bar` (`21084:85177`) สูงคงที่ 193 ทั้งที่ลูกรวมกัน 201 — header ล้นกรอบแม่ 8px
   และ `Top-BG` แดงยาวถึง 209 ผลคือการ์ดค้นหาเริ่มที่ 193 ซ้อนใต้แถบแดง
   หน้านี้จึงวางการ์ดชิดใต้ header แล้วให้พื้นแดงต่อลงมาอีก 8px (`SearchBoard bleed`)
4. การ์ด `lottery-card` ใช้ฟอนต์ดิบ (`GraphikTH/L-Medium`, `Title/GraphikTH/M-SemiBold`, `8`, `6`)
   ไม่ได้ผูก text style — ตัวเลข 8 กับ 6 ไม่มีขั้นไหนใน type scale รองรับ
   บันทึกเป็นหนี้ไว้ที่ `LotteryTile.tsx` แล้ว
