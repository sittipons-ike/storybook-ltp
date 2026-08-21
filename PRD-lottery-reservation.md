# PRD: Lottery Reservation & On-Site Pickup

> **Project:** PJ-Lottery Plus
> **Target:** ทีม Dev / Designer
> **Version:** 0.1 (draft)
> **Last updated:** 2026-06-23
> **Primary KPI:** Activation rate (pickup completion)

---

## 1. Executive Summary

User เลือกและ **จอง** ลอตเตอรี่ในแอพ → ระบบ lock เลขนั้นไว้ → user เดินทางมาจ่ายเงินรับของจริงที่บริษัท (on-site) **ภายใน 24 ชั่วโมง**

ตอน user มาถึง: แจ้ง **Order No.** ให้ Admin → Admin gen **QR-Code** จาก order นั้น → user **scan QR เพื่อจ่าย** → รับลอตเตอรี่ การที่ scan QR ของ order ตัวเองได้ = **verify ตัวตนโดยปริยาย** (Admin เป็นคน trigger gen QR = human checkpoint อีกชั้น)

**Core loop:** เลือกเลข → จอง (hold 24h) → มาถึง on-site → Admin gen QR → scan จ่าย → รับของ

**Primary KPI — Activation rate**
- นิยาม: `% ของ booking ที่จบที่ on-site pickup สำเร็จ (completed) / booking ทั้งหมด`
- Baseline: `TBD` (ยังไม่มีระบบเดิม — เก็บ data รอบแรกเป็น baseline)
- Target แนะนำ: pickup completion ≥ 60% ใน 3 เดือนแรก

---

## 2. User Personas & User Stories

### Persona A — ผู้ซื้อ (Buyer)
อยากจองเลขที่ถูกใจไว้ก่อน ไม่ต้องถือเงินสด/จ่ายออนไลน์ทันที มารับเองที่ร้าน

### Persona B — เจ้าหน้าที่ on-site (Admin / Cashier)
ต้องยืนยันว่าคนที่มา = เจ้าของ booking จริง ก่อนรับเงินส่งของ

---

### US-01 — เลือก & จองเลข
> As a buyer, I want to reserve a lottery number in the app so that ไม่มีใครแย่งเลขก่อนผมไปจ่าย

**Acceptance Criteria**
- [ ] เลือกได้เฉพาะเลขที่ status = `available`
- [ ] กดจอง → สร้าง **Order No.** + เลขเปลี่ยนเป็น `reserved` + ออก **expiry timestamp (now + 24h)**
- [ ] เลขที่ `reserved` ห้ามถูกจองซ้ำโดย user อื่น (atomic concurrency lock)
- [ ] แสดง countdown เวลาที่เหลือก่อนหมดอายุ

### US-02 — Booking หมดอายุอัตโนมัติ
> As the system, I want to auto-release expired reservations so that เลขที่ไม่มารับกลับมาขายได้

**Acceptance Criteria**
- [ ] เกิน 24h ยังไม่ pickup → status กลับเป็น `available`
- [ ] user เห็น order เป็น `expired` ในประวัติ
- [ ] release เกิดแม้ app ปิด (server-side job — ไม่ใช่ client timer)
- [ ] order ที่ `expired` คืน quota กลับให้ user (ดู US-05)

### US-03 — Admin gen QR จาก order
> As staff, I want to generate a payment QR from the buyer's order so that user จ่ายแล้ว verify ในขั้นเดียว

**Acceptance Criteria**
- [ ] Admin ค้น order ด้วย Order No. → เห็น detail (เลข, ราคา, expiry, status)
- [ ] gen QR ได้เฉพาะ order status = `reserved` **และยังไม่หมดอายุ**
- [ ] order ที่ `expired` / `completed` → ปุ่ม gen QR disabled + แจ้งเหตุผล
- [ ] QR ผูกกับ order เดียวเท่านั้น (1 QR : 1 order)
- [ ] QR มี TTL ของตัวเอง กัน QR ค้าง — ระยะเวลา `TBD`

### US-04 — User scan จ่าย & รับของ
> As a buyer, I want to scan the QR to pay so that ปิด order + รับลอตเตอรี่

**Acceptance Criteria**
- [ ] scan QR → จ่ายสำเร็จ → order = `completed`
- [ ] `completed` = นับเป็น **activation** (KPI)
- [ ] จ่ายซ้ำไม่ได้ — QR ใช้แล้วใช้ซ้ำไม่ได้ (idempotent)
- [ ] จ่ายเสร็จออกหลักฐาน / ใบเสร็จ

### US-05 — Limit 100 ใบ/user
> As the system, I want to cap reservations at 100 per user so that กันกักตุน

**Acceptance Criteria**
- [ ] นับเฉพาะ order ที่ active — นิยาม "นับ status ไหนบ้าง" `TBD` (Q3)
- [ ] ถึง 100 → จองเพิ่มไม่ได้ + แจ้ง limit
- [ ] order ที่ `expired` คืน quota กลับ

---

## 3. Non-Goals

- ❌ จ่ายเงินสดที่เคาน์เตอร์ — จ่ายผ่าน **QR scan** (เช่น PromptPay) เท่านั้น *(วิธีจ่ายยืนยัน `TBD` — Q1)*
- ❌ จัดส่งลอตเตอรี่ทางไปรษณีย์
- ❌ ขายต่อ / โอน order ให้คนอื่น
- ❌ ระบบ refund (จองฟรี ไม่มีเงินมัดจำใน v1)
- ❌ verify ด้วยบัตรประชาชน / OTP (ใช้ Order No. + Admin-gen QR แทน)

---

## 4. Technical Specifications

> ⚠️ **NO MAGIC:** ยังไม่เห็น tech stack ใน repo (มีแต่ `slide/` + design system) — ส่วนนี้ mark `TBD` รอ confirm (Q2)

### Order State Machine
```
available → reserved → completed
              ↓
           expired → available   (auto-release)
```

| State | ความหมาย | ออกจาก state เมื่อ |
|---|---|---|
| `available` | เลขว่าง จองได้ | user กดจอง |
| `reserved` | ถูกจอง hold 24h | scan จ่ายสำเร็จ / หมดอายุ |
| `completed` | จ่าย + รับของแล้ว (terminal) | — |
| `expired` | ไม่มารับใน 24h (terminal) | คืนเลขเป็น available |

### Integration points
| ส่วน | ต้องมี | สถานะ |
|---|---|---|
| Auth (user login) | ผูก order กับ identity | `TBD` |
| QR generation | gen QR ผูก order + TTL | ต้องสร้าง |
| Payment | scan QR จ่าย — payment provider จริง หรือ verify token? | **Open Q1** |
| Staff app / POS | หน้า Admin ค้น order + gen QR + confirm | `TBD` (Q4) |
| Expiry job | server-side scheduled / TTL-based release | ต้องสร้าง |
| Notification | เตือนก่อน order หมดอายุ | `TBD` (push/SMS?) |

### Security & Privacy
- Order No. + QR payload ต้องเดาไม่ได้ (random, ไม่ sequential)
- QR TTL สั้น กัน capture/replay
- จ่ายต้อง idempotent — กัน double-charge / double-pickup
- Audit log ทุก gen-QR + payment (ใคร / เมื่อไหร่ / ผลลัพธ์)
- ถ้า payment เป็น provider จริง → ตรวจ PCI/PromptPay compliance

---

## 5. Risks & Roadmap

### Risks
| Risk | Impact | Mitigation |
|---|---|---|
| Double-booking เลขเดียวกัน | สูง — ขายซ้ำ ของไม่พอ | atomic lock + DB transaction |
| QR ถูก capture/ใช้โดยคนอื่น | สูง — สวมรอยจ่าย | QR TTL สั้น + ผูก order + Admin gen ต่อหน้า |
| No-show (จองฟรี ไม่มีมัดจำ) | **สูง** — lock เลขเปล่า เสียโอกาสขาย | countdown + เตือนก่อนหมด + จับ pattern no-show |
| Client timer เพี้ยน → lock ค้าง | กลาง | expiry เป็น server-side เท่านั้น |
| กักตุนเลขดี (เพดาน 100 สูง) | กลาง | limit + monitor ผู้จองรายใหญ่ |

### Roadmap
- **MVP:** US-01 → US-05 (จอง → Admin gen QR → scan จ่าย → release/limit) + activation tracking
- **v1.1:** notification เตือนก่อนหมดอายุ, staff dashboard
- **v2.0:** มัดจำ/refund, multi-branch pickup, analytics dashboard

---

## 6. Open Questions (ต้อง confirm ก่อนลงโค้ดจริง)

| # | คำถาม | กระทบ | block อะไร |
|---|---|---|---|
| Q1 | QR เป็น payment QR จริง (PromptPay) หรือแค่ verify token? | architecture + payment scope | dev เริ่ม backend |
| Q2 | Tech stack (frontend/backend/DB)? | technical spec | sprint planning |
| Q3 | "นับ 100 ใบ" นับ status ไหนบ้าง (รวม completed รอบนี้?) | US-05 AC | impl US-05 |
| Q4 | มี POS/แอพ Admin อยู่แล้ว หรือสร้างใหม่? | effort estimate | scope/timeline |
