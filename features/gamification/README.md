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

## ที่มาของดีไซน์ — ไม่มี Figma

**ตัดสิน 2026-08-23:** ไม่อ้างอิง Figma mock ใน `Marketing view` (`7gVv3oV6G6xzldSjIxoSxb`)
เอกสารด้านบนคือ authority เดียว และค่าทุกตัวมาจาก design system (`ui/` + `design-library/lotteryplus`)

ผลที่ตามมาที่ควรรู้ก่อนรีวิว:
- หน้าจอเป็น **mid-fi** ตามที่ ticket T1 กำหนด — โครงหน้าและลำดับข้อมูลถูกต้อง แต่ยังไม่ใช่ visual design
- ภาพรางวัลยังไม่มี — การ์ดใช้ **เครื่องหมายบอกชนิดรางวัล** (`NOKPOINT` / `E_COUPON` / `PHYSICAL`) แทนภาพสินค้า เพราะ artwork เป็น campaign data ที่ยังไม่มี
- ถ้าภายหลังทีมกลับมาใช้ Figma กฎเดิมกลับมาใช้ทันที: Figma ชนะเมื่อ Figma มี — ต้อง re-verify แล้วอัปเดตบันทึก

## Components ที่เพิ่มในเฟสนี้ (`scope: feature`)

| Component | ทำไมไม่ reuse ของเดิม |
|---|---|
| `MissionCard` | `ui/components/Card` คือหน้าสลาก คนละของ |
| `MissionProgress` | `ui/components/ProgressBar` คือ stepper ของ checkout (step มีชื่อ+ไอคอน) ส่วนภารกิจคือ **นับเทียบเป้า** เช่น `0/999 ใบ` |

ทั้งสองตัวย้ายขึ้น `ui/components` ได้เมื่อมีหลักฐานใช้ซ้ำ ≥2 feature (Lark §3.3)

## หน้าที่ทำแล้ว

| หน้าจอ | ไฟล์ |
|---|---|
| `MSN-200 / 201 / 202 / 900` + loading | `pages/MissionList.tsx` |
| `MSN-210` รายละเอียดภารกิจ · CTA 5 สถานะ | `pages/MissionDetail.tsx` |

## ที่เหลือใน T1 (ยังไม่ทำ)

`MSN-301/302/310/311/330` claim 3 เส้นทาง · `MSN-910/911/920/921/922` system states ·
loading อีก 4 จุด · state map 1 หน้า (AC22)
