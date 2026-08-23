# Mission & Gamification

ระบบภารกิจของ Lottery Plus — ผู้ใช้ทำเงื่อนไขครบแล้วปลดล็อกรางวัลทันที (MECH-01)

## เอกสารในโฟลเดอร์นี้

| ไฟล์ | คืออะไร |
|---|---|
| `prd-dev.md` | **v1.0 — source of truth** · mechanic, user stories, AC, state machine, ตาราง §6.1/§6.2 |
| `prd.md` | v0.2 สำหรับผู้บริหาร — **STALE ตั้งแต่ 2026-08-05** ใช้ได้เฉพาะ §6 §7 §8 |
| `ux-gamification.md` | Blueprint — screen inventory (`MSN-xxx`), IA, flow, empty/error/loading |
| `user-flow.md` | flow เดิม 29 nodes + decision points |
| `tickets.md` | T1 (mission flow ทั้งเส้น) · T2 (entry points — เฟสถัดไป) |

## ที่มาของดีไซน์

**ไม่ใช้ Figma** — ตัดสิน 2026-08-23 · mock ใน `Marketing view` (`7gVv3oV6G6xzldSjIxoSxb`) ออกจาก scope

**ดีไซน์ปัจจุบันมาจาก Claude Design** — project `b20d61e7-5cd9-4bcd-8ab5-2e382d2b5991` ›
`Mission Screens.dc.html` (artboard 2a–2e) import เข้ามา 2026-08-23

| ชั้น | authority |
|---|---|
| เนื้อหา · กลไก · AC | `prd-dev.md` v1.0 + `ux-gamification.md` |
| รูปหน้า · ลำดับ · สถานะ | Claude Design `Mission Screens.dc.html` |
| ค่าทุกตัว (สี ตัวอักษร ระยะ เงา) | `ui/foundations/tokens.css` |

ดีไซน์ถูกวาดจาก repo นี้โดยตรง — **สีทุกตัวในไฟล์ resolve เป็น `--sys-*` ที่มีอยู่แล้ว ไม่มีสีใหม่เข้าระบบ**
และ header คือ `ui/components/Header variant="sub" phoenix` ตัวเดิมไม่แก้อะไรเลย

### Contrast

**วิธีตรวจ** — เปิด story แล้ววาง `tools/contrast-audit.js` ลง console ของ iframe:

```
http://localhost:6006/iframe.html?id=<story-id>&viewMode=story
```

มันเดินทุก text run แล้วรายงานคู่ที่ไม่ผ่าน · ศูนย์แถว = ผ่าน · **รันทุกครั้งที่แตะสี** ไม่ใช่ตอนมีคนทัก

รอบแรกวัดแล้วเจอ fail 6 จุด รอบสองอีก 5 — แก้หมดแล้ว (เกณฑ์ WCAG AA — ตัวอักษรปกติ 4.5:1 · ตัวใหญ่/icon 3:1)

| จุด | เดิม | ใหม่ | |
|---|---|---|---|
| แถบรางวัล · บรรทัดรอง | ชมพู `#FFE2E2` บนแดง `#E32321` = **3.80** | ขาวบนแดงเดิม = **4.64** | user ขอให้แถบเป็น `primary` เหมือนเดิม (2026-08-23) จึงเปลี่ยนตัวอักษรแทนพื้น — แยกลำดับชั้นด้วยขนาด/น้ำหนัก/tracking ไม่ใช่โทนสี |
| hero MSN-210 | เหมือนกัน | เหมือนกัน | hero ต่อเนื่องกับ header เป็นแดงก้อนเดียวตามดีไซน์ |
| การ์ดที่ปิดแล้ว | `#A3A3A3` บน `#F5F5F5` = **2.31** | `tertiary-accent-lg` = **7.17** | จางได้ แต่ต้องอ่านออก |
| pill ของการ์ดที่ปิด | `#737373` บน `#E5E5E5` = **3.76** | `#525252` = **6.20** | |
| ติ๊กถูกในแถบสำเร็จ | ขาวบน `#22C55E` = **2.28** | บน `success-dark` `#166534` = **7.13** | icon ต้องการ 3:1 |
| หมุดที่ยังไม่ถึง | ring `#D4D4D4` บนขาว = **1.48** | `border-tertiary` `#737373` = **4.74** | หมุดคือเนื้อหา ไม่ใช่ของประดับ |
| ชื่อภารกิจ + ช่วงแคมเปญ ใน hero | `#262626` บน `#991B1B` = **1.94** | `primary-light` = **6.82** | `Text` เขียน color เป็น inline style → class ที่ตั้งไว้ไม่เคยทำงาน |
| ลิงก์รองท้ายหน้า | `Button variant="link"` `#3B82F6` บนขาว = **3.68** | แดงแบรนด์ = **4.64** | ตรงกับดีไซน์ด้วย — **เป็น defect ของ link variant ใน DS** ไม่ได้แก้ที่ `ui/` เพราะกระทบหน้าอื่น |
| แท็บที่ active | แดงบน `#FAFAFA` = **4.44** | วางแท็บบนขาว = **4.64** | `Tabs` ไม่มีพื้นของตัวเอง หน้าเป็นคนวางให้ |

ที่ตั้งใจต่างจากดีไซน์อีก 2 จุด:
- **empty state** ดีไซน์วาง placeholder 120×120 ไว้ — เราใช้ `gp-quick-menu-news` จาก logo set จริงแทน เพราะมีของอยู่แล้ว
- **สีเทาการ์ดที่ปิดแล้ว** `#A3A3A3` ไม่มี role ใน `colors/text` (ตัว `disable` = `#D4D4D4` จางเกินอ่าน) จึงดึงจาก tertiary accent scale ตรงๆ

**แบนเนอร์** — `mission-banner.png` 1560×480 ย่อเหลือ 1170 · วางเต็มความกว้างเหนือแท็บใน MSN-201

**ภาพรางวัล** — ทีมส่งมา 2026-08-23 · ย่อเหลือ 320px แล้ว track ที่ `assets/` (ต้นฉบับอยู่ `_source/rewards-asset/` ซึ่ง gitignored)
เข้ามาทาง `fixtures.ts` เพราะเป็น campaign data — งวดใหม่เปลี่ยนรูป แต่กรอบไม่ขยับ

3 จุดที่ต้องเคลียร์ก่อน ship:
- `nokpoint.png` มี **"+100 Point"** อยู่ในรูป แต่ §6.1 จ่าย 10 กับ 20 พอยต์ — การ์ดจะขัดกันเอง ต้องขอรูปเหรียญเปล่า หรือแยกรูปตามจำนวน
- `iphone` เป็นรูป **iPhone 17 Pro** แต่ §6.2 เขียนว่า iPhone 18 Pro
- `dyson` ส่งมาชื่อ `amplifyer.png` — รูปเป็น Dyson Purifier Big+Quiet ตรงกับ §6.2 จึงตั้งชื่อตามของที่เห็น

รูปทุกใบ `object-fit: cover` เต็มกล่อง

**hero ของ MSN-210 เป็นรูปเต็มบล็อก ข้อความวางทับ** (ขอโดย user 2026-08-23) — อ่านชัดเพราะ
**เฟดเป็นแดงแบรนด์ทึบก่อนถึงบรรทัดแรก** ไม่ใช่แค่ทำให้มืดลง:

- เฟดใช้ px ไม่ใช่ % → ทึบเต็มที่ `256px` ส่วนข้อความเริ่มที่ `264px` เว้นไว้ 8px
- ตัวอักษรจึงนั่งบน `#E32321` ทึบ = คู่สีที่วัดแล้ว **4.64:1** ไม่ขึ้นกับว่ารูปแคมเปญหน้าสว่างหรือมืด
- ถ้าใช้ scrim ดำธรรมดา ค่า contrast จะแปรตามรูป ซึ่งเปลี่ยนทุกงวด — เชื่อไม่ได้

## Components ที่เพิ่มในเฟสนี้ (`scope: feature`)

| Component | ทำไมไม่ reuse ของเดิม |
|---|---|
| `MissionCard` + `MissionClosedCard` | `ui/components/Card` คือหน้าสลาก คนละของ |
| `MissionProgress` | `ui/components/ProgressBar` คือ stepper ของ checkout (step มีชื่อ+ไอคอน) ส่วนภารกิจคือ **นับเทียบเป้า** เช่น `38/50 ใบ` |
| `MissionDetailBlocks` | section ของ MSN-210 (hero · progress · steps · facts · footer) — อยู่ชั้น component เพราะถือ token ส่วน page ถือไม่ได้ (`check-pages.py`) |

ทั้งหมดย้ายขึ้น `ui/components` ได้เมื่อมีหลักฐานใช้ซ้ำ ≥2 feature (Lark §3.3)

**ที่ reuse ตรงๆ ไม่แก้:** `Header` · `Tabs` · `Button` · `Divider` · `Skeleton` · `Logo` · `Icon` · `Text` · `Surface` · `Stack` · `AppShell` · `DeviceFrame` · `StatusBar`

## หน้าที่ทำแล้ว

| หน้าจอ | ไฟล์ |
|---|---|
| `MSN-200 / 201 / 202 / 900` + loading | `pages/MissionList.tsx` |
| `MSN-210` รายละเอียดภารกิจ · CTA 5 สถานะ | `pages/MissionDetail.tsx` |

## ที่เหลือใน T1 (ยังไม่ทำ)

`MSN-301/302/310/311/330` claim 3 เส้นทาง · `MSN-910/911/920/921/922` system states ·
loading อีก 4 จุด · state map 1 หน้า (AC22)

> ⚠️ **รีวิวที่ browser แคบกว่า 768px** — typography ของ design system ผูกกับ viewport ไม่ใช่ container
> จอกว้างจะได้ type ขนาด desktop แล้วเทียบขนาดไม่ตรงกับดีไซน์
