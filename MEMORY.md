# Project Memory — PJ-Lottery Plus

บทเรียนที่เขียนไว้ตอนทำพลาด เพื่อไม่ให้ session หน้าพลาดซ้ำ (ตาม RULE 12)

## 2026-08-19 · Figma template UI: slot ของ header/navbar สลับกันได้ง่าย
- **เกิดอะไร:** สร้าง Header จาก Figma set `header-bar-mobile` แล้ววาง `type=sub-page` ลง slot `header` ของ AppShell แต่จริงๆ มันคือ slot `top-navbar` — เพราะชื่อ set บอกว่า "header" ทั้งที่ข้างในมี 2 slot ปนกัน
- **ทำไม:** เชื่อชื่อ component set ของ Figma แทนที่จะเช็คว่าโค้ดจริงเรนเดอร์มันตรงไหน `header-bar-mobile` มี `home-page`/`success` = header block แต่ `sub-page` = top navbar
- **ครั้งหน้าทำยังไง:** ก่อน map component → slot ให้เปิด `lotteryplus-frontend-main/src/components/layout/index.tsx` ดูว่า flag ไหนเรนเดอร์อะไร (`hasTopNavbar` → TopNavbar/CompactNavbar, `hasHeader` → `<Header>`) ชื่อใน Figma ไม่ใช่หลักฐานเรื่อง slot

## 2026-08-19 · อ่าน Figma ตอน state ยังไม่นิ่ง แล้วสรุปทันที
- **เกิดอะไร:** สรุปว่า main-page template ใช้แถบ 72px และเขียนลง patterns.json + story ไปแล้ว ผู้ใช้ reset ให้ กลายเป็น `type=home-page` 146px ต้องรื้อเขียนใหม่รอบสอง
- **ทำไม:** ตอนอ่าน template มันชี้ไป component ที่ parent = null (ของค้างจากการแก้ที่ยังไม่จบ) แต่ผมอ่านค่าแล้วสรุปเลย ไม่ได้เอะใจว่า orphan = ไฟล์ยังอยู่ระหว่างแก้
- **ครั้งหน้าทำยังไง:** เจอ node ที่ `parent === null` หรือสัญญาณว่าไฟล์ยังไม่นิ่ง ให้รายงานก่อนแล้วถามว่าจะให้อ่านตอนนี้หรือรอ อย่าเพิ่งเขียนลงไฟล์ที่เป็น source of truth

## 2026-08-19 · Figma frame สูงกว่า artwork 1px คือของจริง ไม่ใช่ error
- **เกิดอะไร:** Header home ได้ 145 แทน 146 ไล่หาไม่เจอว่าหายไปไหน
- **ทำไม:** `Frame 1000012509` สูง 32 แต่ wordmark ข้างในสูง 31 — ผมเรนเดอร์แค่ artwork ไม่ได้เรนเดอร์ frame
- **ครั้งหน้าทำยังไง:** ตอนถอด layout จาก Figma ให้ไล่ทีละ frame ไม่ใช่ทีละ artwork frame ที่สูงกว่าลูก 1-2px คือ layout จริงที่ต้อง model

## 2026-08-19 · วัดขนาดที่ viewport ผิดโหมด แล้วนึกว่าเป็นบั๊ก
- **เกิดอะไร:** วัด Footer ได้ 192px ทั้งที่ Figma บอก 190 เกือบไล่แก้ค่า
- **ทำไม:** typography token เป็น responsive (mobile ที่ `:root`, desktop ใน `@media min-width:768px`) แต่ component เป็นดีไซน์ mobile-only วัดที่ viewport 1280 เลยได้ line-height ของ desktop
- **ครั้งหน้าทำยังไง:** component ที่ Figma วาดเป็น mobile (frame 390) ต้องวัดที่ viewport < 768px เสมอ ใช้ `resize_window preset mobile` ก่อนเทียบตัวเลขกับ Figma

## 2026-08-19 · Figma strokeAlign INSIDE ≠ CSS border
- **เกิดอะไร:** ActionBar สูง 111px แทนที่จะเป็น 110 ตาม Figma
- **ทำไม:** ใช้ `border-top` ซึ่งบวกความสูงเพิ่ม ส่วน Figma ใช้ `strokeAlign: INSIDE` ที่วาดเส้นอยู่ในกรอบเดิม
- **ครั้งหน้าทำยังไง:** เจอ stroke ที่ `strokeAlign === 'INSIDE'` ใน Figma ให้แปลเป็น `box-shadow: inset 0 Npx 0 <color>` ไม่ใช่ `border`

## 2026-08-19 · เอา font จริงมาก่อน แล้วค่อยตัดสินว่า UI ตรงไหม
- **เกิดอะไร:** สร้าง Header แล้วบอกว่า "ตรง Figma" ทั้งที่ Storybook เรนเดอร์ด้วย Sarabun fallback ไม่ใช่ Graphik TH ผู้ใช้ทักว่าไม่เหมือน
- **ทำไม:** เห็นในโค้ดว่า Graphik TH เป็น commercial font เลยสรุปเองว่า bundle ไม่ได้ ไม่ได้ดูว่า `lotteryplus-frontend-main/src/assets/fonts/GraphikThai/` มีไฟล์ .otf ครบ 7 น้ำหนักอยู่แล้ว
- **ครั้งหน้าทำยังไง:** ก่อนเทียบ UI กับ Figma ให้เช็ค `document.fonts.check()` ว่า font จริงโหลดแล้ว ถ้ายัง ให้หาไฟล์ใน repo ก่อน อย่าเพิ่งสรุปว่าไม่มี

## 2026-08-19 · วัดความสูงถูก ไม่ได้แปลว่า component ตรง
- **เกิดอะไร:** ยืนยันว่า Header ตรง Figma เพราะ 146/56/94 ตรง แต่จริงๆ ผิดหลายจุด — phoenix opacity 40% (Figma 70%), ไม่มี blend HARD_LIGHT, success phoenix ไม่ใช่จัตุรัส (118×125), icon-right ไม่มีกรอบปุ่มทั้งที่ Figma เป็น button Tertiary
- **ทำไม:** วัดแค่ bounding box ของตัว component ไม่ได้ไล่ property ของ node ลูกทีละตัว (opacity / blendMode / absolute offset / main component ของ instance)
- **ครั้งหน้าทำยังไง:** ตอน verify component ให้ดึง `opacity`, `blendMode`, `absoluteBoundingBox` เทียบกรอบแม่ และ `getMainComponentAsync().name` ของ instance ลูกทุกตัว ไม่ใช่แค่ w/h/padding/fill

## 2026-08-19 · mockup ขนาดปลอมทำให้ bug ซ่อน
- **เกิดอะไร:** ทำ mockup ที่ 390×844 ตาม frame Figma พอเปลี่ยนเป็น iPhone 16 จริง (393×852) เจอว่า NavigationBar กว้าง 390 ตายตัว เหลือขอบโล่ง 3px
- **ทำไม:** เอาขนาด frame ของ Figma มาเป็นขนาดเครื่อง ทั้งที่ frame คือ canvas ที่ดีไซน์เนอร์วาด ไม่ใช่สเปกเครื่องจริง
- **ครั้งหน้าทำยังไง:** mockup ใช้ขนาดเครื่องจริง (iPhone 16 = 393×852pt) ส่วนเลขจาก Figma frame ใช้เป็น reference ของสัดส่วน — component ที่ปักขอบต้อง `fullWidth` ไม่ใช่ fixed width

## 2026-08-19 · ละเมิด RULE 7 ซ้ำๆ โดยติดป้าย "storybook-local" ให้ค่าที่เดา
- **เกิดอะไร:** เดาค่าแล้วเขียน `_source: "storybook-local"` กำกับ ทำให้อ่านแล้วเหมือนมีเหตุผลรองรับ ทั้งที่แปลว่า "เดา" ผู้ใช้ทักว่ามีกฎห้ามเดาอยู่ — ถูกต้อง
- **ทำไม:** ป้าย `storybook-local` ถูกออกแบบไว้สำหรับ "Figma ไม่มีค่านี้จริงๆ" แต่ผมเอาไปใช้กับ "ผมยังไม่ได้ไปดู" ซึ่งคนละเรื่อง
- **ครั้งหน้าทำยังไง:** ก่อนเขียนค่าลง overlay ต้องมี field `_verified_from` ระบุ node id + วันที่ที่ไปอ่านมา ถ้าไม่มี ห้ามเขียนค่า ให้เขียน `"tbd"` แล้วบอก user ว่าติดตรงไหน — `storybook-local` ใช้ได้เฉพาะเมื่อยืนยันแล้วว่า Figma ไม่มี

## 2026-08-19 · อ่าน node ที่ซ่อนอยู่แล้วเชื่อว่าเป็นสเปก
- **เกิดอะไร:** Checkbox สร้างผิดทั้งตัว — วาดเครื่องหมายถูกตอนยังไม่ติ๊ก และไม่มีกล่องเลย เพราะไปอ่าน `Outline/Old/Check` ซึ่ง `visible === false` และ `parent === null`
- **ทำไม:** ดึง children ของ variant มาแล้วอ่านตัวแรกที่เจอ ไม่ได้เช็ค `visible` และ `parent` ก่อน
- **ครั้งหน้าทำยังไง:** ตอน dump Figma node ให้ใส่ `visible` กับ `parent === null` ลงใน output เสมอ และข้าม node ที่ `visible === false` — ของที่ซ่อนคือซากเก่า ไม่ใช่สเปก

## 2026-08-19 · verify component ต้องไล่ทุก variant ไม่ใช่ตัวแรก
- **เกิดอะไร:** Checkbox สร้างใหม่ 3 รอบ รอบที่ 1-2 ผิดเพราะอ่านแค่ variant เดียว/บางส่วน
- **ทำไม:** เห็น component set แล้วอ่าน 1-2 variant คิดว่าที่เหลือเป็นแพทเทิร์นเดียวกัน จริงๆ Figma ให้ Hover/Focus/Error ใช้ border 1.5px กับสีคนละตัว
- **ครั้งหน้าทำยังไง:** dump **ทุก variant** ของ component set ออกมาเป็นตารางก่อนเขียนโค้ด แล้ววาง `_figma_truth_table` ลง overlay ให้ตรวจย้อนได้

## 2026-08-19 · ตัวเลขที่ "ไม่ตรง" อาจมาจาก variant ที่ไม่เกี่ยวกัน
- **เกิดอะไร:** เห็น Button ของ Figma รายงาน `gap=8` เทียบกับของเราที่ใช้ 4 เกือบแก้ทันที ที่จริง 8 มาจาก variant ที่ไม่มี icon ซึ่งมีลูกตัวเดียว gap ไม่มีผลเลย ส่วน variant ที่มี icon บอก 4 ตรงกับของเรา
- **ทำไม:** ดึงค่าจาก variant ตัวแรกที่เจอ แล้วเทียบเลยโดยไม่ดูว่า property นั้นมีผลกับ variant นั้นจริงไหม
- **ครั้งหน้าทำยังไง:** ก่อนแก้ค่าตาม Figma ให้ถามว่า "variant นี้มีลูกกี่ตัว / property นี้ส่งผลจริงไหม" — gap ที่มีลูกตัวเดียว, radius บนสี่เหลี่ยมที่ถูกทับ, stroke ที่ถูกบัง ล้วนเป็นตัวเลขที่ไม่ควรเอามาเทียบ

## 2026-08-19 · ขนาดนอกเท่ากันไม่ได้แปลว่าข้างในถูก
- **เกิดอะไร:** Button size S ของเรา padding 2 + icon 24 = 28 ส่วน Figma padding 6 + icon 16 = 28 กล่องนอกเท่ากันเป๊ะ เลยไม่มีใครเห็นว่าผิดมานาน
- **ทำไม:** verify ด้วยการวัดกรอบนอกอย่างเดียว
- **ครั้งหน้าทำยังไง:** วัด**ลูกข้างใน**ด้วยเสมอ (ขนาด glyph, padding แต่ละด้าน) ไม่ใช่แค่ bounding box ของตัว component

## 2026-08-19 · หน้า verification ที่ตัวเลขพิมพ์มือ = โกหกที่ดูน่าเชื่อที่สุด
- **เกิดอะไร:** `VerificationReport.stories.tsx` เขียนว่า "Figma Desktop Bridge (live connection) · 100% · 0 mismatches" ทั้งที่ในไฟล์ไม่มี `fetch` แม้แต่บรรทัดเดียว ตัวเลขเป็น literal ทั้งหมด อยู่หน้าแรกที่คนเปิดเจอก่อนเพื่อน
- **ทำไม:** สร้าง story ที่ "แสดงผลการตรวจ" โดยไม่มีการตรวจจริงอยู่เบื้องหลัง — เขียนหน้ารายงานก่อนที่จะมีของให้รายงาน
- **ครั้งหน้าทำยังไง:** ห้ามเขียนตัวเลขผลตรวจเป็น literal ใน story เด็ดขาด ให้เครื่องมือเขียนไฟล์ผลออกมา (`verification-result.json`, `component-verification.json`) แล้ว story `import` มาแสดง + ต้องมีอย่างน้อย 1 การตรวจที่รันสดในเบราว์เซอร์ (`getComputedStyle` เทียบ generated) และต้องพิสูจน์ได้ว่ามันแดงได้จริงโดยลองทำให้ค่าเพี้ยน

## 2026-08-19 · เขียน checker แล้วต้องกันมันรายงานผิดเอง
- **เกิดอะไร:** checker ตัวใหม่รายงาน 145 mismatch ทันทีที่รันครั้งแรก ทั้งที่ token ไม่ได้ผิดเลย — เป็นเพราะ typography เป็น responsive (generator เก็บค่า mobile ใน `TOKEN_VALUES` ส่วน CSS ที่ ≥768px ใช้ค่า desktop) และอีก 9 ตัวที่ CSS เป็น `color-mix()` แต่ literal เป็น hex
- **ทำไม:** เทียบ string ตรงๆ โดยไม่ได้ถามว่า "ค่าที่ถูกต้องของ token นี้ ขึ้นกับบริบทอะไรบ้าง"
- **ครั้งหน้าทำยังไง:** ก่อนปล่อย checker ให้รันแล้วดูว่าผลลัพธ์เป็น 0 หรือไม่ ถ้าไม่ 0 ต้องแยกให้ได้ก่อนว่า "ของผิดจริง" กับ "checker ไม่รู้บริบท" — แล้วแก้ที่ generator ให้ export บริบทออกมา (`TOKEN_VALUES_DESKTOP`, `TOKEN_VALUES_ALPHA`) ไม่ใช่ปิดตาข้ามไป

## 2026-08-19 · ขนาดไฟล์ตัดสินฟอร์แมต ไม่ใช่ความชอบ
- **เกิดอะไร:** export กราฟิก 36 ตัวเป็น SVG หมด ได้ 2.2MB ตัวเดียว (`gp-jidrit-search`) หนัก 412KB
- **ทำไม:** เหมาเอาว่า "vector = ใช้ SVG" ทั้งที่ของพวกนั้นเป็นภาพประกอบละเอียด ไม่ใช่โลโก้แบน
- **ครั้งหน้าทำยังไง:** ตอน export asset ให้ export ทั้ง 2 ฟอร์แมตแล้ววัดเทียบ เอาตัวเล็กกว่า — เกณฑ์ที่ใช้จริงคือ SVG ≤20KB ใช้ SVG ไม่งั้น PNG@3x (ที่นี่เล็กลง 6–16 เท่า)

## 2026-08-19 · ผลลัพธ์ tool ที่ใหญ่เกิน ถูกเซฟเป็นไฟล์ — ใช้เป็นทางลำเลียง
- **เกิดอะไร:** ต้องย้าย asset 109 ไฟล์ (2.6MB) จาก Figma ลงดิสก์ ถ้าให้ผ่าน context จะกินมหาศาล
- **ทำไม:** ตอนแรกคิดจะ return ข้อมูลกลับมาแล้ว echo ลงไฟล์ทีละตัว
- **ครั้งหน้าทำยังไง:** ปล่อยให้ผลลัพธ์ใหญ่เกิน limit แล้วระบบจะเซฟเป็นไฟล์เอง จากนั้นเขียน importer อ่านไฟล์นั้นตรงๆ — ข้อมูลไม่ต้องผ่าน context เลย (ถ้า payload เล็กจนกลับมา inline ให้รวมของใหญ่เข้าไปด้วยเพื่อดันให้เกิน)

## 2026-08-19 · `<img>` ที่ lazy ยังไม่โหลด ดูเหมือนภาพเสีย
- **เกิดอะไร:** แกลเลอรี logo โชว์ช่องขาว 12 ช่อง เกือบสรุปว่า export พัง
- **ทำไม:** `loading="lazy"` ยังไม่ดึงไฟล์ที่อยู่ใต้ fold แล้วผมไปวัด `naturalWidth === 0`
- **ครั้งหน้าทำยังไง:** ก่อนสรุปว่ารูปเสีย ให้ `fetch()` ตรวจ status ก่อน และตั้ง `loading='eager'` แล้วรอ ค่อยวัดใหม่ — ถ้าจะตรวจเนื้อภาพให้ใช้ canvas นับ pixel ที่ opaque

## 2026-08-20 · icon "resolve ได้" ไม่ได้แปลว่า "ตรง Figma"
- **เกิดอะไร:** header home ใช้ `filled-empty-wallet` + `filled-Lottery` ที่ 16px, sub-page ใช้ `outline-notification` และ hamburger ถูกวาดมือเป็น 3 div ทั้งที่ Figma ใช้ `outline-NokPoints-W` + `outline-Lottery` ที่ 24px และ `filled-navigation` (มีอยู่ในชุด icon จริง) ทั้งสองฝั่ง — user ทักเรื่อง header ซ้ำหลายรอบ แต่รอบก่อนๆ ตรวจแต่ layout/padding ไม่เคยตรวจว่า "รูปไหน"
- **ทำไม:** `check-icons.py` ถามแค่ "ชื่อนี้มีใน icon-data.ts ไหม" ซึ่ง icon ผิดแต่มีจริงก็ผ่าน — ด่านที่มีอยู่ ไม่ได้ครอบคำถามที่ user ถาม เลยเข้าใจว่า "ตรวจ icon แล้ว"
- **ครั้งหน้าทำยังไง:** ตอนสร้าง/แก้ component ให้ walk instance tree ของ Figma node เก็บชื่อ main component ที่ `parent.name === 'icons'` ลง `base._figma_icons.nodes[]` (node + sources + icons) แล้วให้ `check-figma-icons.py` บังคับ **set equality** ระหว่าง icon ในไฟล์ที่ระบุกับ Figma — icon เกิน fail เท่ากับ icon ขาด เพราะ "เกิน" คือตัวที่ไม่มีใครเทียบ

## 2026-08-20 · comment ว่า "known issue" ในสคริปต์ตรวจ = ปิดตาถาวร
- **เกิดอะไร:** `check.sh` มีบรรทัด `grep -v "icons/icon-data.ts"` พร้อมคอมเมนต์ "4 known duplicate-key errors that predate this pipeline" — พอเอาออกจริง พบว่าเป็น key ซ้ำ 4 คู่ (`outline-safe`, `filled-safe`, `outline-Lottery`, `filled-Lottery`) ที่ซ้ำมาจาก Figma เอง (161 component / 157 ชื่อ) และตอนเช็คยังพบ regex ของ registry ใช้ `[A-Za-z0-9_-]+` เลยนับ icon ที่ชื่อมีเว้นวรรค 5 ตัวไม่ได้ (รายงาน 146 ทั้งที่มี 151)
- **ทำไม:** เจอ error ตอนตั้ง pipeline แล้วเขียนคำว่า "known/predate" กลบไว้แทนที่จะไล่ให้จบ — คำว่า known ทำให้ตัวเองและคนอ่านข้ามมันทุกครั้งหลังจากนั้น
- **ครั้งหน้าทำยังไง:** ห้ามใส่ `grep -v` / ignore-list ลงด่านตรวจ ถ้ายังไม่ได้ไล่ต้นเหตุจนรู้ว่าแต่ละ error คืออะไร ถ้าจำเป็นต้องยกเว้นจริง ต้องเขียน **รายการเจาะจงทีละตัว** ที่นับได้และ fail เมื่อมีตัวใหม่โผล่ ไม่ใช่ยกเว้นทั้งไฟล์ และหลังแก้ regex/ด่านทุกครั้ง ให้เทียบตัวเลขที่ด่านรายงานกับที่นับเองด้วยมือ ถ้าไม่ตรงคือด่านมองไม่เห็นของบางอย่าง

## 2026-08-20 · `visible` ของ paint สำคัญเท่าค่าของมัน
- **เกิดอะไร:** ปุ่มย้อนกลับใน `type=sub-page` ถูกวาดกรอบขาว 1px ทั้งที่ Figma ปิดไว้ — อ่านจาก instance เดียวกัน (`button` Size=M Type=Tertiary) เห็น `strokeWeight: 1` กับ `cornerRadius: 8` แล้วสรุปว่ามีกรอบ ไม่ได้ดู `strokes[0].visible` ซึ่ง = `false` เฉพาะปุ่มนี้ (14924:3521) ส่วน hamburger ทั้งสองที่ = `true`
- **ทำไม:** Figma ใช้ instance ตัวเดียวกันทุกช่อง แล้วต่างกันที่ **flag ของ paint** ไม่ใช่ที่ค่า — พอเทียบแค่ตัวเลข ความต่างเลยหายไปทั้งหมด (เคยพลาดแบบนี้กับ node ที่ `visible: false` มาแล้วตอน Checkbox แต่ตอนนั้นสรุปบทเรียนแค่ระดับ node ไม่ได้ครอบถึง fills/strokes)
- **ครั้งหน้าทำยังไง:** ตอนอ่าน fills/strokes ห้าม map เอาแต่ `color`/`strokeWeight` ให้ดึง `visible` และ `opacity` ออกมาทุกครั้งในผลเดียวกัน แล้วถ้าเห็น instance ชื่อ/variant เหมือนกันหลายที่ ต้อง diff ทั้งสามค่า ไม่ใช่ดูตัวเดียวแล้วเหมาว่าเหมือนกันหมด

## 2026-08-20 · strokeAlign INSIDE → `box-shadow: inset` ไม่ใช่ `border` (ซ้ำรอบสอง)
- **เกิดอะไร:** ปุ่ม action 36×36 padding 6 glyph 24 — ใช้ CSS `border: 1px` ใต้ `box-sizing: border-box` ทำให้ content box เหลือ 22 แล้ว glyph 24 ล้นออกข้างละ 1px (ไม่ค่อยเห็นเพราะ Icon fix ขนาดไว้ เลยล้นแทนที่จะหด)
- **ทำไม:** เคยสรุปกฎนี้ไว้แล้วตอน Avatar (ring กิน padding box) แต่ตอนเขียน `HeaderAction` ไม่ได้เอามาใช้ เพราะคิดถึงมันตอน "แปลค่าความสูง" ไม่ได้คิดตอน "แปลกรอบ"
- **ครั้งหน้าทำยังไง:** เจอ `strokeAlign: "INSIDE"` เมื่อไหร่ ให้เขียนเป็น `box-shadow: inset 0 0 0 <w>` เสมอ ไม่ต้องคิดว่ากระทบขนาดไหม — และตรวจด้วยการวัด `slack = ปุ่ม − glyph` ต้องเท่ากับ padding ซ้าย+ขวาพอดี ถ้าน้อยกว่าคือ border กินไปแล้ว

## 2026-08-20 · component ที่รับ icon เป็น data ก็ยังมี default ที่ต้องมาจาก Figma
- **เกิดอะไร:** ไล่ `_figma_icons` ครบ 20 component เจอของแต่งเอง 4 จุด — `ProgressBar.DEFAULT_STEPS` เป็น "Step 1..4" + `outline-check` ทั้งที่ Figma มีสองสายจริง (lottery 4 ขั้น: Added_Cart→qrcode-scan→payment→check_circle · nokcash 3 ขั้น: NokPoints-W→payment→check_circle) · `Button.iconName` default `outline-Home` ทั้งที่ Figma ใช้ `outline-document-copy` · `NavigationBar` cart มี `filled-cart` ทั้งที่ทั้ง 10 variant ใช้ `outline-cart` และไม่มี `state=cart` เลย · `SetSelect` ใช้ outline-add/minus ทั้งที่ Figma เป็น filled
- **ทำไม:** พอ prop เป็น data ("`steps` รับ array") เลยคิดว่าไม่ต้องเทียบ Figma — แต่ **ค่า default คือการตัดสินใจของ design ไม่ใช่ payload** ของที่แต่งขึ้นเลยไหลเข้าไปอยู่ในโค้ดโดยไม่มีใครทัก
- **ครั้งหน้าทำยังไง:** แยกให้ชัดว่าไฟล์ไหน "fix ค่าไว้" กับไฟล์ไหน "แค่ส่ง payload" — แล้วใส่เฉพาะไฟล์กลุ่มแรกลง `_figma_icons.nodes[].sources` (เช่น ProgressBar.tsx ใส่ · ProgressBar.stories.tsx ไม่ใส่) ส่วน default ทุกตัวต้องชี้ไป node ของ Figma ได้ ถ้าชี้ไม่ได้แปลว่าแต่งเอง

## 2026-08-20 · `visible` ต้องดูทั้งสายบรรพบุรุษ ไม่ใช่แค่ตัวมันเอง
- **เกิดอะไร:** สรุปว่า `bottom-sheet` มี `filled-Home` + `filled-close` โผล่อยู่ เพราะ instance ทั้งสองตัว `visible: true` — แต่ wrapper `icons-size` ที่ครอบอยู่ `visible: false` จริงๆ คือ Figma วาด header row ไว้แล้วปิดทิ้ง
- **ทำไม:** walk แบบไม่ track visibility ของ parent (รอบแรกที่ sweep 13 component ผม track ไว้ พอมาเช็คเพิ่มทีหลังเขียน walk ใหม่แบบง่ายๆ แล้วลืม)
- **ครั้งหน้าทำยังไง:** เขียน walk ครั้งเดียวแล้วส่ง `shown = parentShown && n.visible !== false` ลงไปทุกชั้นเสมอ ห้ามเขียน walk เวอร์ชันย่อสำหรับ "เช็คเร็วๆ" — และเวลารายงานให้แยก `visible` กับ `hiddenOnly` ออกจากกัน ไม่ยุบเป็นลิสต์เดียว

## 2026-08-20 · field ที่เป็นได้ทั้ง string และ list = บั๊กที่วนกลับมา
- **เกิดอะไร:** `components.json → storybook` เป็น `"Avatar"` (string) สำหรับ component ทั่วไป แต่เป็น `["Header","Footer","ActionBar"]` สำหรับ top-and-footer — โค้ดที่ `for c in storybook` เลยวน**ทีละตัวอักษร** พลาดแบบนี้ 2 รอบในวันเดียว: สคริปต์ inventory (รายงาน 0 icon ทุกตัว) และตัว gate เอง (รายงาน "source does not exist" 15 บรรทัด)
- **ทำไม:** schema ยอมสองรูปแบบ แล้วโค้ดฝั่งใช้ไม่ได้ normalize — บั๊กไม่ throw มันแค่ให้ผลว่าง ซึ่งอ่านเหมือน "ไม่มีของ"
- **ครั้งหน้าทำยังไง:** อ่าน field แบบนี้ต้อง `if isinstance(x, str): x = [x]` ทันทีที่รับค่า ก่อนใช้ — และถ้าเจอผลลัพธ์ที่เป็น 0/ว่างทั้งกระดาน ให้สงสัย normalize ก่อนเชื่อว่าไม่มีของจริง

## 2026-08-20 · label ที่อยู่ใน flow ทำให้เส้นเชื่อมขาด
- **เกิดอะไร:** เส้นระหว่างขั้นของ ProgressBar ขาดๆ ไม่เท่ากัน — เพราะ `.ltp-progress-bar__step` ปล่อยให้ label ดันความกว้าง (40/82/49/40) วงกลมอยู่กลางคอลัมน์ เส้นเลยไปชนขอบ *label* ข้างหนึ่งและชน *วงกลม* อีกข้างหนึ่ง ห่างไม่เท่ากัน 21px
- **ทำไม:** ตอนอ่าน Figma ดูแต่ box ของ text (w/h) ไม่ได้ดู `layoutPositioning` — Figma ตั้ง label เป็น **ABSOLUTE + negative x** ทำให้มันลอยทับกลางวงกลมและล้นออกสองข้างโดยไม่ดันคอลัมน์ `Step` เลยกว้าง 40 คงที่ทุกขั้น และ `Line 1 (Stroke)` กว้าง 73 ใน frame 60.7 ที่ x=-6 คือตั้งใจให้เส้น**มุดใต้วงกลม** 6px สองข้าง ไม่ใช่จบที่ช่องว่าง
- **ครั้งหน้าทำยังไง:** อ่าน text node ใน Figma ต้องดึง `layoutPositioning` + `layoutSizingHorizontal` + `textAutoResize` มาด้วยเสมอ ไม่ใช่แค่ x/y/w/h — ABSOLUTE แปลว่า "ไม่กินพื้นที่ layout" ต้องแปลเป็น `position:absolute` ไม่ใช่ flex child และ vector ที่กว้างเกิน frame ที่ครอบ = ตั้งใจให้ overlap ต้องแปลเป็น negative offset ไม่ใช่ปัดทิ้ง

## 2026-08-20 · สรุปกฎจาก set เดียว แล้วกฎนั้นผิด
- **เกิดอะไร:** เห็น lottery มี label ขั้นแรก/ขั้นสุดท้ายเป็น AUTO ส่วนขั้นกลางเป็น ABSOLUTE เลยเขียน CSS แยก `--edge` ให้หัวท้าย wrap ผลคือ `เติมนกแคช` ของ nokcash (ซึ่งเป็น**ขั้นแรก**) ถูกบีบเหลือ 40px แตกเป็น 3 บรรทัด
- **ทำไม:** กฎจริงคือ "label กว้างเกิน 40 เมื่อไหร่ → ABSOLUTE" ไม่เกี่ยวกับตำแหน่ง — lottery บังเอิญมีแค่หัวท้ายที่พอดี 40 เลยดูเหมือนกฎตำแหน่ง ผมสรุปจาก set เดียวทั้งที่มีสอง set ให้เทียบอยู่ตรงหน้า
- **ครั้งหน้าทำยังไง:** ถ้า component มีมากกว่า 1 component set หรือหลาย variant ห้ามสรุปกฎจากอันเดียว — ดึงค่าที่จะใช้ตั้งกฎ (เช่น `pos`, `w`) ของ**ทุก variant ทุก set** มาวางเทียบกันก่อน แล้วหาว่าอะไรคือ predicate จริง (ที่นี่คือ `w > column` ไม่ใช่ `index === 0`)

## 2026-08-20 · กฎ authority แก้ไขโดย user: "Figma ชนะเสมอ *เมื่อ Figma มี*"
- **เกิดอะไร:** 7 component ที่ FE มีแต่ Figma ไม่มี (title-with-underline, skeleton, image-upload, accordion, infinity-scroll, countdown-timer, alert·notification) ถูกบล็อกไว้ใน `blocked_on_figma` เพราะกฎเดิม "Figma ชนะเสมอ" — user ตัดสิน 2026-08-20: ถ้า Figma ไม่มี ให้สร้างตาม FE ได้เลย
- **ทำไม:** กฎเดิมตีความแบบสุดทาง ทำให้ของที่ทีมใช้จริง (usage 3-12) ค้างอยู่ไม่มีกำหนด
- **ครั้งหน้าทำยังไง:** ลำดับ authority คือ Figma → FE → ห้ามแต่งเอง · component ที่สร้างจาก FE ต้องบันทึก `_verified_from` ชี้ไฟล์ FE + วันที่ + ระบุชัดว่า "no Figma node — FE is the authority per user decision 2026-08-20" (precedent: ActionBar, divider) และเมื่อ Figma วาดขึ้นมาทีหลัง Figma กลับมาชนะ — ต้อง re-verify กับ Figma แล้วอัปเดต record

## 2026-08-20 · `box-sizing` ของ FE มาจาก Tailwind preflight — ยกโค้ดมาแล้วหาย
- **เกิดอะไร:** ยก `image-upload` จาก FE มา ตั้ง `h-10` → `height: 40` แต่วัดได้ 58 เพราะ span เปล่าใน Storybook เป็น `content-box` เลยกลายเป็น 40 + padding 8×2 + border 1×2 · ช่องชื่อไฟล์สูงกว่าปุ่มข้างๆ 18px · dropzone `min-h-[170px]` ก็เกินเป็น 172
- **ทำไม:** FE รันใต้ Tailwind preflight ที่ตั้ง `box-sizing: border-box` ให้ทุก element ทั้งหน้า — เป็น context ที่มองไม่เห็นในโค้ดที่ยกมา พอย้ายมาที่ไม่มี preflight ค่าที่เคยหมายถึง "ทั้งกล่อง" กลายเป็น "เนื้อใน" (ตระกูลเดียวกับ strokeAlign INSIDE ของ Figma)
- **ครั้งหน้าทำยังไง:** ยก component จาก FE ทุกครั้ง ให้สร้าง `<Name>.css` ที่มี `.ltp-<name>, .ltp-<name> * { box-sizing: border-box }` เป็นไฟล์แรกก่อนเขียน TSX — และ verify ด้วยการวัดว่าของที่ควรสูงเท่ากันมันเท่ากันจริง (ช่อง input กับปุ่มที่ต่อกัน) ไม่ใช่ดูแค่ว่า render ออก

## 2026-08-20 · วัดค่าใน Storybook ตอน pane ซ่อน = ตัวเลขที่เชื่อไม่ได้
- **เกิดอะไร:** เกือบสรุปว่า Skeleton พัง (`width: 0`) และ InfiniteScroll ไม่ทำงาน — ที่จริง `document.hidden === true` ทำให้ `#storybook-root` กว้าง 0 (`%` ทุกตัวเลยเป็น 0), `window.innerHeight` = 0 (IntersectionObserver intersect ไม่ได้เลย), และ `setTimeout` ถูก throttle เป็น ≥1000ms
- **ทำไม:** อ่านตัวเลขที่วัดได้โดยไม่ถามว่า environment วัดได้จริงมั้ย — เคยพลาดแบบเดียวกันมาแล้วตอน CSS animation ค้างที่ keyframe 0%
- **ครั้งหน้าทำยังไง:** ก่อนสรุปว่าอะไรพังจากตัวเลขใน browser ให้เช็ค `document.hidden` + `innerHeight` ก่อนเสมอ ถ้าซ่อนอยู่ให้เชื่อเฉพาะค่าที่ไม่ขึ้นกับ viewport (px คงที่, computed style, DOM structure) และสิ่งที่ต้องมี viewport (`%`, IntersectionObserver, animation, timer) ต้องหาทางพิสูจน์ทางอื่น — เช่นใส่ปุ่มเรียก callback เดียวกันใน story

## 2026-08-21 · สคริปต์ commit ที่ไล่ path เองมือ = ตกของแบบเงียบๆ
- **เกิดอะไร:** `commit-plan.sh` ไล่ directory ใต้ `ui/` ด้วยมือ 6 ตัว แต่มี 8 ตัว — `icons/` กับ `pages/` ตกไป commit 6 ก้อนผ่านหมดดูเรียบร้อย ทั้งที่ `icon-data.ts` (ตัวแก้ key ซ้ำ 4 คู่) ไม่ได้เข้า → ที่ HEAD component จะ import icon จากไฟล์เวอร์ชันเก่าที่ยัง duplicate อยู่
- **ทำไม:** `check.sh` รันกับ working tree ไม่ใช่กับ HEAD เลยเขียวทั้งที่ commit ไม่ครบ — ไม่มีใครถาม git ว่า "เหลืออะไรอีก" มีแต่เชื่อลิสต์ที่พิมพ์เอง
- **ครั้งหน้าทำยังไง:** สคริปต์ commit ทุกตัวต้องมี coverage check ปิดท้าย — `git status --porcelain -uall` ลบ path ที่ตั้งใจข้าม ถ้าเหลืออะไรให้ร้อง และหลัง commit ชุดใหญ่ให้ `git clone` แบรนช์นั้นออกมาที่อื่นแล้วรัน gate จาก clone จริง ไม่ใช่จาก working tree

## 2026-08-21 · ด่านที่ห้ามอย่างเดียวโดยไม่มีทางออก = ดันให้เขียนแย่กว่าเดิม
- **เกิดอะไร:** ตั้งด่าน "page ห้ามแตะ token" แล้วเขียนหน้า `/profile` ตัวแรก — ด่านแดงทันที 10 จุด ทั้งหมดเป็น `borderRadius`/`background`/`boxShadow` ของการ์ดขาวมุมมน กับ `gap`/`padding` ของ layout ซึ่งหน้าจำเป็นต้องใช้จริง
- **ทำไม:** ตั้งกฎห้ามโดยไม่ได้ถามว่า "แล้วให้เขียนที่ไหนแทน" — ถ้าปล่อยไว้แบบนั้น คนเขียนจะหนีไปใส่เลขดิบ (`gap: 16`) ซึ่งแย่กว่า token เพราะ 16 ไม่บอกว่าเป็นขั้นไหนของ scale และ rename ก็หาไม่เจอเหมือนกัน
- **ครั้งหน้าทำยังไง:** เวลาตั้งด่านห้ามอะไร ให้เขียน "ทางออกที่ถูก" มาพร้อมกันเสมอ แล้วทดสอบด่านกับของจริง 1 ชิ้นก่อนประกาศใช้ — ที่นี่คือ `Stack` (ถือ spacing, รับชื่อขั้น `gap="2xl"`), `Surface` (การ์ด: radius+bg+elevation), `DeviceFrame` (กรอบเครื่อง) ทั้งสามเป็น structural primitive ที่ Figma ไม่มีและไม่ควรมี เพราะใน Figma มันคือ auto-layout frame ธรรมดา

## 2026-08-21 · แยก asset 3 ชั้นตามอายุของมัน ไม่ใช่ตามชนิดไฟล์
- **เกิดอะไร:** ต้องตัดสินว่ารูปแบนเนอร์เก็บที่ไหน — เกือบเหมาว่า "รูปทั้งหมด → assets/"
- **ทำไม:** ดูจากชนิดไฟล์ (เป็น .png เหมือนกัน) แทนที่จะดูว่าใครเป็นเจ้าของและเปลี่ยนบ่อยแค่ไหน — FE ดึงแบนเนอร์จาก API เป็น `{ images: [{url, type}] }` มี scheduler เปลี่ยนทุกสัปดาห์
- **ครั้งหน้าทำยังไง:** ถามว่า "ของนี้มาจากไหน" ไม่ใช่ "เป็นไฟล์อะไร" — มาจาก API → `fixtures/` (เป็น URL ในข้อมูล) · หลายหน้าใช้ร่วม → `ui/assets/` · หน้าเดียวใช้ → `pages/<หน้า>/assets/` แล้ว import เข้ามาเป็น URL ผ่าน Vite (มี `images.d.ts` ให้ TS) ไฟล์หายจะพังตอน build ไม่ใช่รูปแตกตอนรัน

## 2026-08-21 · React ลบ shorthand ทิ้ง ถ้า longhand ตามหลังเป็น undefined
- **เกิดอะไร:** `Stack` เขียน `{ padding: '16px', paddingLeft: undefined, paddingRight: undefined, ... }` — ผลคือ **ไม่มี padding เลยสักด้าน** การ์ดทุกใบใน `/profile` แบนติดกันหมด และ inline style ที่ออกมาไม่มีคำว่า padding ปรากฏเลย
- **ทำไม:** React เขียน style ตามลำดับ key ผ่าน `setProperty`/`removeProperty` — `paddingLeft: undefined` แปลเป็น removeProperty ซึ่ง**ลบสิ่งที่ shorthand ตั้งไว้ก่อนหน้า** ทีละด้านจนหมด · ไม่ throw ไม่ warn เห็นได้ทางเดียวคือวัด computed style
- **ครั้งหน้าทำยังไง:** ใน component ที่รับ padding/margin เป็น prop ห้ามผสม shorthand กับ longhand — resolve เป็น 4 ด้านก่อนเสมอ (`paddingTop: space(paddingY ?? padding)` …) และเวลาตรวจงาน layout ให้ดู `getComputedStyle().padding` ไม่ใช่ดูว่า prop ถูกส่งไปแล้วหรือยัง

## 2026-08-21 · bezel ของ mockup ต้องอยู่นอกจอ ไม่ใช่กินจอ
- **เกิดอะไร:** `DeviceFrame` ตั้ง `width: 393` + `border: 10px` + `box-sizing: border-box` → พื้นที่จอจริงเหลือ **373** ทุกอย่างที่วัดข้างในเลยเตี้ย/แคบกว่าเครื่องจริง 20pt โดยที่ตัวเลข 393 ยังโชว์อยู่ในโค้ด
- **ทำไม:** ใส่ border-box อัตโนมัติเพราะเป็นนิสัยจากการทำ component (ที่นั่นถูก) แต่ frame ของเครื่องคนละเรื่อง — 393 คือ **ขนาดจอ** ขอบเครื่องอยู่นอกนั้น
- **ครั้งหน้าทำยังไง:** frame จำลองอุปกรณ์ให้ใช้ `box-sizing: content-box` แล้ววัดยืนยันว่า element ในสุด (`.ltp-shell`) กว้างเท่าสเปกเป๊ะ ก่อนเชื่อว่า mock ถูก

## 2026-08-21 · เดา device chrome จาก spec เครื่อง ทั้งที่ Figma วาดไว้แล้ว
- **เกิดอะไร:** วาด Dynamic Island 125×37 ลอยห่างขอบ 11 ให้ `StatusBar` เพราะ token `device-*` เขียนว่า iPhone 16 — แต่ Figma วาด **Notch 156×33 ชิดขอบบน (y=-2)** ซึ่งเป็นรอยบากรุ่น iPhone 14 · ตำแหน่งเวลาก็เดาเป็น padding 32 ทั้งที่ Figma วาง absolute ที่ x=27 y=14 กล่อง 54×21
- **ทำไม:** คิดว่า "chrome ของเครื่องไม่ใช่ UI ของ product เลยไม่น่าอยู่ใน Figma" แล้วไม่ได้ค้น — ที่จริง `StatusBar` เป็น component set ใน Figma มี variant `Dark Mode=True, Type=Default` ครบ
- **ครั้งหน้าทำยังไง:** ก่อนวาดอะไรก็ตามที่คิดว่า "Figma คงไม่มี" ให้ `findOne(n => n.name === 'X')` ในหน้าที่กำลังทำก่อนเสมอ — ต้นทุน 1 query ส่วนการเดาทำให้ต้องรื้อทั้ง component และค่าที่บันทึกไว้ใน overlay ก็ผิดตามไปด้วย

## 2026-08-21 · ค่าที่ "ให้ความหมายร่วมกัน" ต้องอยู่ใน component เดียว
- **เกิดอะไร:** บล็อกยอดเงินของ Figma คือการ์ดขาว 2 ใบต่อกันเป็นใบเดียว — บนมุม 16/16/0/0 + ขอบทอง 3px เฉพาะด้านบน, กลางเป็นเส้นประขาว 1px dash 4/4 เว้นบน 16, ล่างมุม 0/0/16/16 + ขอบขาว 1px รอบ ทั้งหมดอยู่ในกรอบแดงมุมล่าง 24 · ตอนแรกผมเขียนกระจายอยู่ในไฟล์ page
- **ทำไม:** มองเป็น "หลายกล่องซ้อนกัน" เลยประกอบด้วย Surface หลายใบในหน้า — แต่ 6 ค่านี้ไม่มีความหมายเดี่ยวๆ มันมีความหมายเพราะอยู่ด้วยกัน หน้าที่ต้องสะกดออกมาทั้งหมด = หน้ากำลังวาดรูป
- **ครั้งหน้าทำยังไง:** ถ้าชุดค่าอธิบายรอยต่อ (มุมที่ตัดกัน ขอบที่มีแค่บางด้าน เส้นคั่นที่อยู่ระหว่างสองกล่อง) ให้ยกเป็น component ชื่อเดียวทันที — เกณฑ์คือ "ลบค่าใดค่าหนึ่งแล้วที่เหลือยังอ่านรู้เรื่องไหม" ถ้าไม่ แปลว่ามันเป็นชิ้นเดียว

## 2026-08-21 · สระล่างไทยหาย ทั้งที่ทุกอย่าง "ถูก" — clip box รัดพอดี line box
- **เกิดอะไร:** `ตู้เซฟของฉัน` ใน Header กลายเป็น `ต้เซฟของฉัน` บนจอ user แต่เครื่องผม render ครบ — ไล่ 8 ทาง (codepoint, font โหลด, กล่องตัด, fallback, pixel zoom) ไม่เจอ จนวัดเรขาคณิต: ink ของ ◌ู ลึก 4.8px ใต้ baseline แต่ `height:24 + overflow:hidden` เหลือที่ให้แค่ **1.2px** — engine ต่างกันวาง baseline ต่างกัน 1-2px ก็ตัดแล้ว
- **ทำไม:** เอา clip box (จำเป็นเพราะ `text-overflow: ellipsis`) ไปรัดที่ line box พอดีเป๊ะ — ภาษาละตินรอดเพราะ descender ตื้น ภาษาไทยมีสระล่าง+วรรณยุกต์บนที่กิน ink เกิน em box · "ทำงานบนเครื่องเรา" ไม่พิสูจน์อะไรเมื่อ margin เหลือระดับ 1px
- **ครั้งหน้าทำยังไง:** ทุกที่ที่ใช้ nowrap+ellipsis กับข้อความไทย **clip box ต้องไม่ใช่ line box เปล่า** — ถ้า element มี padding แนวตั้งจริงอยู่แล้ว (input, field) ปลอดภัยเพราะ overflow ตัดที่ padding box · ถ้าไม่มี ให้ `padding: 8px 0; margin: -8px 0` (ขยาย clip box, คืนพื้นที่ให้ layout) และห้ามตั้ง fixed height บนตัว text ซ้ำกับ line-height · ตอนวัดให้เทียบ `actualBoundingBoxDescent` กับที่ว่างใต้ baseline — margin < 2px = จะพังบนเครื่องใครสักคน

## 2026-08-21 · typography ที่ไม่ถูกบังคับให้ผูก role = ที่ซ่อนของค่าแต่งเอง
- **เกิดอะไร:** user ถามว่า "มี component ไหนไม่ผูก typo ตามกฎอีกไหม" — สแกนทั้ง 28 overlay เจอเลขสลอตโต้ใช้ `24/32 weight 700` ทั้งที่ Figma ตั้ง text style `typography/display/xl-semb` (20/36 Semibold) ไว้บน layer เลย — ค่าแต่งเองล้วนที่รอดมาหลายวันเพราะด่านสีมีแต่ด่าน typo ไม่มี
- **ทำไม:** ด่าน "no literal colours" มีมานาน แต่ typography literal ไม่เคยถูกตรวจ — และตัวหลอกเยอะ (`avatar-size`, `badge-size` เป็น geometry ไม่ใช่ฟอนต์) เลยไม่มีใครกล้าเขียนกฎ
- **ครั้งหน้าทำยังไง:** `check-typography.py` (ด่าน 10) — token ที่ลงท้าย `-line-height/-weight/-family/-tracking` = typography เสมอ · `-size` = typography เมื่อ prefix เดียวกันมี weight/family หรือ line-height แบบ px · ทุกตัวต้องผูก `{design.semantic.typography...}` หรือมีชื่ออยู่ใน `_unmigrated_type` พร้อมเหตุผล · ref ผิด tier (spacing เป็น font size) ก็ fail · ชื่อ geometry ที่กำกวมให้เปลี่ยนชื่อหนี (`badge-size`→`badge-diameter`) ไม่ใช่เพิ่มข้อยกเว้น

## 2026-08-21 · ขนาดกล่องที่ FE จอง ≠ สัดส่วนของรูป
- **เกิดอะไร:** แบนเนอร์ทุกใบใน /profile ถูกยืดแบน — ผมตั้ง `aspectRatio: 416/96` (4.33) จาก `<Image width={416} height={96}>` ของ FE แต่ไฟล์จริงเป็น 1432×384 (3.73) ต่างกัน 16% นกเลยอ้วนกว่าที่วาด
- **ทำไม:** เอา prop ของ next/Image มาเป็น "สัดส่วนรูป" ทั้งที่มันคือ**ขนาดกล่องที่จอง** — FE เองก็ยืดรูปด้วยค่านี้เหมือนกัน แปลว่า copy ความผิดของ FE มาแบบซื่อสัตย์เกิน
- **ครั้งหน้าทำยังไง:** สัดส่วนรูปเป็นของไฟล์ — ห้ามประกาศ aspectRatio ทับรูป bitmap ให้ใช้ `width:100%; height:auto` แล้วปล่อย intrinsic ratio ทำงาน · ก่อนเชื่อ dimension prop ใดๆ ให้ `sips -g pixelWidth -g pixelHeight` เทียบไฟล์จริงก่อน · ตรวจ distortion ด้วย `rendered ratio vs naturalWidth/naturalHeight` ต่างเกิน 0.02 = ยืด

## 2026-08-21 · icon บางตัวเป็น stroke ไม่ใช่ fill — เติมสีลงเส้นกลางได้ก้อนดำ
- **เกิดอะไร:** import 6 icon ที่ Figma มีแต่ไม่เคย export — 4 ใน 6 (`outline-arrow/building/copy/list`) SVG เป็น `stroke="#262626" stroke-width="1.5" fill="none"` ไม่ใช่ path ปิดที่เติมสี · ถ้ายัดเข้า `iconData.paths` ตามปกติ Icon.tsx จะ `fill` มันแล้วได้ก้อนดำหรือหายไปเลย
- **ทำไม:** `IconData` มีแค่ `paths` + `fillRule` เพราะ 151 ตัวแรกเป็น fill หมด — สมมติว่าทั้งชุดเป็นแบบเดียวกันโดยไม่เคยตรวจ
- **ครั้งหน้าทำยังไง:** ตอน export icon ให้อ่าน SVG จริงดูว่ามี `stroke=` ไหม ไม่ใช่ดูแค่ `d` — ถ้ามีให้เก็บ `stroke: { width }` ไว้ใน data แล้ว render ด้วย `stroke` + `fill="none"` · ตรวจผลด้วยการนับ `path[stroke]` ในหน้า gallery ไม่ใช่ดูว่ามี svg กี่ตัว

## 2026-08-21 · ถามข้างเดียวว่า "โค้ดขาดอะไร" ไม่เคยเจอว่า Figma มีอะไรที่เราไม่มี
- **เกิดอะไร:** ด่าน icon ถามแค่ "ชื่อในโค้ด resolve ได้ไหม" → 6 icon ที่ Figma วาดไว้แต่ไม่เคย export เลยไม่มีใครเห็น จนไปนับ 161 component / 157 ชื่อ / ship 151 ถึงรู้
- **ทำไม:** ด่านตรวจทิศเดียว (โค้ด → registry) ไม่เคยตรวจทิศกลับ (Figma → registry) — ของที่ "ไม่มีใครเรียกใช้" จึงมองไม่เห็นตลอดกาล
- **ครั้งหน้าทำยังไง:** ด่านที่เทียบสองชุดต้องเป็น **set equality** เสมอ ไม่ใช่ subset — เก็บรายชื่อฝั่ง Figma ลงไฟล์ (`figma-icon-names.json`) แล้ว fail ทั้งสองทิศ · ทดสอบ exit code ตรงๆ ไม่ใช่ผ่าน pipe เพราะ `| head` กลืน exit code ทำให้ด่านที่พังดูเหมือนผ่าน

## 2026-08-21 · เส้นคั่นที่มีในโค้ด สีถูก แต่มองไม่เห็น — เพราะแปลผิดว่าเส้นวาดบนอะไร
- **เกิดอะไร:** user ทัก "ขาดเส้น divider" ใน ProfileSummary ทั้งที่โค้ดมีเส้นอยู่ — Figma วาด `Line` สูง 1px **ไม่มี fill** ปล่อยพื้นแดงของบล็อกทะลุขึ้นมา แล้วขีดเส้นประ**ขาว** 4/4 ทับ ตาเห็นเป็นเส้นประแดงเพราะช่องว่างคือสีแดง · ผมแปลเป็น "เส้นประขาวบนการ์ดขาว" = ค่าถูกทุกตัว ผลลัพธ์คือไม่มีอะไรให้เห็น · แถม `border-top` 3px ทอง add ความสูงเข้า card (81 แทน 80) เพราะ Figma stroke เป็น INSIDE
- **ทำไม:** อ่านค่า (ขาว, dash 4/4, 1px) แต่ไม่อ่าน**บริบทที่เส้นถูกวาดทับ** — เส้นสีขาวมีความหมายเฉพาะเมื่อพื้นหลังไม่ขาว · และ strokeTopWeight ของ frame รายงาน 1 เสมอแม้ `strokes: []` — น้ำหนักบอกว่า "ถ้ามี stroke จะหนาเท่าไร" ไม่ได้บอกว่ามี
- **ครั้งหน้าทำยังไง:** ทุกเส้น/ขอบที่อ่านจาก Figma ให้บันทึก 3 อย่างพร้อมกัน: paint list (`strokes` ว่างไหม + visible), สีของ**พื้นที่เส้นทาบอยู่** (fill ของ node เอง — ว่าง = พื้นข้างหลังทะลุ), และ strokeAlign (INSIDE = ห้ามใช้ CSS border ที่กินพื้นที่ ใช้ inset shadow หรือ gradient) · dash ที่ Figma ระบุตัวเลขให้วาดด้วย repeating-linear-gradient ไม่ใช่ border dashed เพราะ CSS เลือกความยาว dash เอง

## 2026-08-21 · ส่วนโปร่งใสของ component มีความหมายก็ต่อเมื่อมีของอยู่ข้างหลังจริง
- **เกิดอะไร:** user ทัก "พื้นเทาโผล่บน nav-bar ทั้งที่ตกลงกันว่าโปร่ง" — NavigationBar โปร่งจริงตามที่แก้ไว้ แต่ AppShell วางมันเป็น flex item ล่างสุด: ข้างหลัง strip โปร่ง 22px คือพื้นเทาของ shell ไม่ใช่เนื้อหาเพจ
- **ทำไม:** แก้ "ความโปร่ง" ที่ตัว component แต่ไม่ได้แก้ **การวาง** — ใน flex stack ไม่มีอะไรอยู่ข้างหลัง item เลย ความโปร่งเลยโชว์พื้น shell · แอปจริง navbar เป็น fixed overlay ทับ content
- **ครั้งหน้าทำยังไง:** component ที่มีส่วนโปร่งโดยตั้งใจ (fill NONE บน container) ต้องถามต่อทันทีว่า "ใน Figma template มันซ้อนทับอะไร" — ถ้าซ้อนทับ content ให้ shell วางเป็น absolute overlay + เผื่อ scroll padding เท่าความสูง bar ไม่ใช่วางเรียงใน flow

## 2026-08-21 · deploy ที่ subpath — absolute asset path พังเงียบ
- **เกิดอะไร:** Storybook deploy ขึ้น GitHub Pages ที่ `/storybook-ltp/` แล้วฟอนต์ Graphik TH ทั้ง 7 น้ำหนัก + โลโก้ 112 ตัว + brand mark 404 ทั้งหมด ทั้งเว็บเรนเดอร์ด้วยฟอนต์ fallback และรูปแตกเป็นกล่อง `?` — ตอน dev ที่ localhost ปกติทุกอย่าง ผู้ใช้เห็นก่อน ไม่ใช่ผมหรือด่าน 10 ขั้น
- **ทำไม:** ไฟล์ใน `staticDirs` ไม่ได้ถูก import จึงไม่มีอะไร rewrite URL ให้ — path เป็น string ที่โค้ดต้องเขียนถูกเอง และทุกที่เขียนจาก domain root (`/logos/…`, `url('/fonts/…')`) ซึ่งถูกเฉพาะตอนเว็บอยู่ที่ root พอ mount ใต้ `/<repo>/` ก็ชี้ผิดทันที ด่านที่มีอยู่มองไม่เห็นเพราะไฟล์ deploy ครบจริงและ path ก็ดูถูกต้องดี — สิ่งที่ผิดคือความสัมพันธ์ระหว่าง path กับที่ที่เว็บถูก mount ซึ่งไม่มีใครตรวจ
- **ครั้งหน้าทำยังไง:** static asset ทุกตัวต้องผ่าน `asset()` (`ui/foundations/asset.ts`) ที่ resolve กับ `import.meta.env.BASE_URL` เสมอ ห้ามเขียน `/fonts/…` `/logos/…` `/brand/…` ตรงๆ — ด่าน "Static assets resolve against the base path" ใน check.sh บล็อกให้แล้ว และ CI ส่ง `STORYBOOK_BASE_PATH` จากชื่อ repo
- **จุดที่เกือบพลาดซ้ำ:** เดาว่า Vite rewrite `url()` ใน CSS ให้ตาม base — **ไม่จริง** Vite แก้ให้เฉพาะ asset ที่ตัวเองปล่อยออกมา ส่วน absolute `url()` ที่คนพิมพ์เองมันปล่อยผ่าน พิสูจน์ด้วยการ build จริงแล้ว grep output ก่อนเชื่อ เลยต้องย้าย `@font-face` ออกจาก CSS ไปสร้างใน `.storybook/fonts.ts`
- **บทเรียนกว้างกว่านั้น:** ทุกด่านที่เขียนมาตรวจ "ค่าถูกไหม" แต่บั๊กนี้คือ "ค่าถูกในบริบทไหน" — build แล้วเสิร์ฟที่ path จริงคือวิธีเดียวที่จับได้ ตรวจแต่ source ไม่พอ

## 2026-08-22 · text style ที่ layer ชี้ไป ไม่ใช่ชุด style ของไฟล์เสมอไป
- **เกิดอะไร:** หัวข้อหมวดใน `[Mobile] Home` รายงาน style `typography/heading/h2` และ `[NEW] Typo/Heading/H2` = 28/42 **Medium** เกือบสรุปว่า DS ขาด role `heading.h2.medium` แล้วจะไปเพิ่ม token ใหม่ทั้งชั้น
- **ทำไม:** อ่าน `textStyleId` → resolve ชื่อ แล้วเชื่อทันที ทั้งที่ `getLocalTextStylesAsync()` ของไฟล์มีแค่ `h1-semb h2-semb h3-semb h3-med h4-semb h4-med` — ตัวที่ layer ชี้ไปคือ style เก่า/remote ที่ค้างอยู่ ไม่ใช่ระบบปัจจุบัน
- **ครั้งหน้าทำยังไง:** ก่อนสรุปว่า "DS ขาด role" ให้ `getLocalTextStylesAsync()` มาเทียบก่อนเสมอ — ถ้าชื่อที่ layer ชี้ไม่อยู่ในลิสต์ = legacy ให้ใช้ role ที่ระบบมี แล้วบันทึกความต่างเป็นคำถามถึงดีไซเนอร์ ห้ามเพิ่ม token เพราะ layer ตัวเดียว (เจอ 2 ที่ในหน้าเดียว: หัวข้อหมวด 28/42 Medium และ subtitle 14/21 ทั้งที่ local `sub-title/l-med` = 14/22)

## 2026-08-22 · frame ที่ตั้ง height FIXED เตี้ยกว่าลูก คือเลขที่ใช้ประกอบหน้า
- **เกิดอะไร:** บล็อกนาทีทองประกอบแล้วได้ 765.33 แทน 763 · `Top-bar` ก็สูง 193 ทั้งที่ StatusBar 47 + header 154 = 201
- **ทำไม:** เอาผลรวมของลูกมาเป็นความสูง แต่ Figma ตั้ง `layoutSizingVertical: FIXED` ไว้ต่ำกว่า content (`Frame 43608` = 193 ทั้งที่ 167.14 − 8 + 36 = 195.14) และ `clipsContent: false` ทำให้ล้นออกมาแบบเห็นได้ — พื้นที่ที่ frame **จอง** กับพื้นที่ที่ content **ใช้** คนละค่า
- **ครั้งหน้าทำยังไง:** ตอนถอด layout ให้ดึง `layoutSizingVertical` มาด้วยทุก frame — เจอ FIXED ให้เขียน `height: <ค่าที่ Figma บอก>` ตรงๆ แล้วปล่อยลูกล้น (overflow visible) ห้ามให้ hug เพราะความสูงที่พี่น้องมันเรียงต่อกันคิดจากค่า FIXED ไม่ใช่จาก content

## 2026-08-22 · frame สูง 1px ที่มี padding ข้างใน — padding ไม่เพิ่มความสูง
- **เกิดอะไร:** การ์ด `add-on-service` ได้ 290 แทน 258 และ SEO ได้ 225 แทน 210 — เกินที่ละ 16 ต่อเส้นคั่น
- **ทำไม:** `End Line` เป็น frame สูง 1 ที่มีลูกชื่อ `Line` ประกาศ `paddingTop: 16` — อ่านแล้วแปลเป็น `<div style="paddingTop:16"><hr/></div>` ซึ่งสูง 17 แต่ของจริงกรอบมันสูง 1 คงที่ padding เลยไม่มีผล ระยะรอบเส้นมาจาก gap ของพ่อ
- **ครั้งหน้าทำยังไง:** เจอ padding ในกรอบที่สูง/กว้างน้อยกว่า padding นั้น ให้ถือว่า padding นั้นไม่มีผล — เช็คด้วย `frame.height` เทียบ `paddingTop + paddingBottom` ถ้ากรอบเล็กกว่า แปลว่า FIXED ทับอยู่ อย่าแปล padding เป็น CSS

## 2026-08-22 · gradient overlay ผิดที่ยึด = อ่านข้อความไม่ออกทั้งที่ค่าถูก
- **เกิดอะไร:** เงาไล่สีบน SEO ทำให้บรรทัดแรกจางจนอ่านไม่ออก ทั้งที่ stop สี/ทิศทาง/ความสูง 64 ตรง Figma หมด
- **ทำไม:** ผมยึด `bottom: 0` ให้ ramp จบที่ก้นกล่อง 34px → ช่วงที่มองเห็นได้ alpha วิ่ง 0.47→1.0 · Figma ยึด **บน** (`Group 24596` y=128.5 ในขณะที่ body เริ่ม 128) ปล่อยให้ 64px ล้นลงไปทับ padding ข้างล่าง → ช่วงที่เห็น alpha แค่ 0→0.53
- **ครั้งหน้าทำยังไง:** overlay ที่สูงไม่เท่ากล่องที่มันทับ ต้องอ่าน `absoluteBoundingBox.y` ของ overlay เทียบกับ `y` ของกล่อง แล้วยึดด้านที่ตรงกัน — "ขนาดถูก + สีถูก" ยังให้ผลตรงข้ามได้ถ้ายึดคนละด้าน

## 2026-08-22 · label ที่ Figma ปล่อยให้ล้นคอลัมน์ ห้าม wrap
- **เกิดอะไร:** quick menu สูง 302 แทน 284 — เกิน 18 พอดี 1 บรรทัด
- **ทำไม:** `ศูนย์ช่วยเหลือ` กว้าง 73 ในคอลัมน์ 72 Figma วางที่ x=-0.5 ให้ล้นออกข้างละครึ่ง แต่ CSS ตัดขึ้นบรรทัดใหม่ ทำให้ทุกแถวสูงขึ้น
- **ครั้งหน้าทำยังไง:** ตอนอ่าน text ใน grid ให้เทียบ `text.width` กับ `parent.width` — กว้างกว่า + `x` ติดลบ = ตั้งใจให้ล้น ต้องใส่ `white-space: nowrap` ไม่ใช่ปล่อยให้ wrap (ตระกูลเดียวกับบทเรียน ProgressBar ABSOLUTE + negative x)
