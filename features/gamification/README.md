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

ที่ตั้งใจต่างจากดีไซน์ 2 จุด:
- **empty state** ดีไซน์วาง placeholder 120×120 ไว้ — เราใช้ `gp-quick-menu-news` จาก logo set จริงแทน เพราะมีของอยู่แล้ว
- **สีเทาการ์ดที่ปิดแล้ว** `#A3A3A3` ไม่มี role ใน `colors/text` (ตัว `disable` = `#D4D4D4` จางเกินอ่าน) จึงดึงจาก tertiary accent scale ตรงๆ

**ภาพรางวัลยังไม่มี** — เป็น campaign asset ที่ยังไม่ถูกสร้าง การ์ดกับ hero ใช้กล่อง placeholder ที่เขียนบอกตัวเองว่าเป็น placeholder

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
