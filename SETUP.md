# 🚀 Setup Guide: Design Skills for Claude Code

คู่มือติดตั้งและใช้งาน Design Agent Suite ใน Claude Code

---

## 📦 สิ่งที่คุณจะได้

- Claude Code รู้จัก skills ทันทีที่เปิด project
- สั่งงานสั้นๆ ได้ (ไม่ต้องอธิบายทุกครั้ง)
- มี slash commands สำหรับ tasks ที่ใช้บ่อย
- Sync กับ Confluence ได้ด้วยคำสั่งเดียว

---

## 🎬 Installation (5 นาที)

### Step 1: เตรียม MCPs

ก่อนเริ่ม ตรวจสอบว่า Claude Code มี MCPs ที่จำเป็น:

```bash
# เช็ค MCPs ที่ติดตั้งอยู่
claude mcp list
```

**ต้องมี:**
- ✅ `atlassian` (สำหรับเข้า Confluence + Jira)
- ✅ `figma` (สำหรับ design audit)

**ถ้ายังไม่มี ติดตั้งด้วย:**

```bash
# Atlassian MCP (Rovo)
claude mcp add atlassian https://mcp.atlassian.com/v1/mcp

# Figma MCP
claude mcp add figma https://mcp.figma.com/mcp
```

---

### Step 2: วางไฟล์ใน Project

```bash
# เข้าไปที่ project ของคุณ
cd /path/to/your-project

# สร้างโครงสร้าง
mkdir -p .claude/skills
mkdir -p .claude/commands

# คัดลอกไฟล์จาก setup bundle ที่ผมสร้างให้
cp /path/to/downloads/CLAUDE.md ./
cp /path/to/downloads/skills/*.md .claude/skills/
cp /path/to/downloads/commands/*.md .claude/commands/
```

**หรือใช้ git ก็ได้:**

```bash
# เก็บ Claude Code config ไว้กับ project
git add CLAUDE.md .claude/
git commit -m "Add Claude Code skills for design workflow"
```

---

### Step 3: ทดสอบ

เปิด Claude Code แล้วลองสั่ง:

```
ดูว่าคุณรู้จัก skills อะไรบ้างใน project นี้
```

Claude Code ควรตอบโดยอ้างถึง 4 skills ที่เรา setup ไว้

---

## 🎯 วิธีใช้งาน

### Pattern 1: Auto-triggered (ใช้ง่ายสุด)

ตราบใดที่คุณใช้ keyword ตรงกับ Trigger Conditions ของ skill Claude Code จะเรียก skill อัตโนมัติ

**ตัวอย่าง:**

```
Audit งานน้อง junior หน่อย: https://figma.com/file/abc123/Checkout
Post comments บน Figma ด้วย
```

Claude Code จะ:
1. ตรวจเจอ keyword "audit" + Figma link
2. Match กับ `audit-ui.md`
3. อ่าน skill → รู้ว่าต้องทำอะไร
4. ใช้ Figma MCP ตาม execution steps
5. Post comments + สร้าง QA Report

---

### Pattern 2: Slash Commands (เร็วกว่า)

ใช้ slash commands ที่ตั้งไว้:

```
/audit https://figma.com/file/abc123/Checkout
```

```
/ux-plan feature=checkout goal="quick purchase"
```

```
/ui-spec figma=[link] blueprint=[link]
```

```
/copy rewrite=[Figma link]
```

---

### Pattern 3: Explicit (ควบคุมชัดเจน)

ถ้าต้องการให้ Claude Code ทำอะไรแบบเฉพาะเจาะจง:

```
อ่าน skill design-qa-auditor จาก .claude/skills/audit-ui.md
แล้วทำตาม Steps 1-4 เท่านั้น (ข้าม step post_comment)
กับ Figma นี้: [link]
```

---

## 🔄 Sync กับ Confluence

### ดึง skill ล่าสุดมาวาง local

```
Fetch latest design-qa-auditor skill จาก Confluence แล้วเขียนทับ .claude/skills/audit-ui.md
```

### Sync ทั้งหมด

```
Sync skills ทั้งหมดจาก Confluence มาวาง .claude/skills/
```

---

## 🧪 ตัวอย่างการใช้งานจริง

### Scenario 1: Audit งานน้อง junior

**Prompt:**
```
น้อง junior ส่งงานมา review:
https://www.figma.com/file/abc123/Checkout-V2

Audit ให้หน่อย เน้น token hygiene + accessibility
Post comments บน Figma เฉพาะ Critical issues
สรุป QA Report ให้ดูใน chat
```

**Claude Code จะทำ:**
1. โหลด `audit-ui.md` skill
2. `figma:get_design_context(url)` → ได้ node tree
3. `figma:get_variable_defs` → ได้ tokens ที่ใช้
4. `figma:get_styles` → ได้ tokens ที่มีใน DS
5. Compare → เจอ hard-coded `#3B82F6` (2 ที่) + contrast fail (1 ที่)
6. Classify severity → 3 Critical
7. `figma:get_comments` → check ว่ามีคอมเมนต์ซ้ำไหม
8. `figma:post_comment(node_id, msg)` × 3
9. Generate Report ใน chat

**Output ที่คุณจะได้:**

```markdown
# Design QA Report: Checkout V2

**Status:** 🟡 Needs Revision (3 critical)

## 🌟 Overall Vibe
โครงสร้างการ checkout ไหลลื่นดีมาก! Mental model ชัดเจน
user ไม่ต้องคิดเยอะ ถัดจากนี้แค่แก้ 3 จุดก็พร้อม ship ได้เลย

## 🛠️ Critical Issues

### 1. Hard-coded button color
- 📍 Node: `123:456` (Submit button)
- ❌ Issue: ใช้ #3B82F6 ตรงๆ ไม่ผูก token
- 🧠 Why: Breaks theming, ไม่รองรับ dark mode
- 💡 Fix: ใช้ var(--color-brand-primary)
...
```

### Scenario 2: Design Workflow ครบวงจร

**Prompt:**
```
วันนี้เราจะทำฟีเจอร์ใหม่: "Wishlist สำหรับ e-commerce"

User goal: เซฟสินค้าที่สนใจไว้ซื้อทีหลัง
Business goal: เพิ่ม retention + reduce cart abandonment

ทำทั้ง workflow ให้เลย:
1. UX Blueprint
2. UI Spec (ใช้ Figma file นี้: https://figma.com/file/xxx/wishlist)
3. Copywriting
4. QA Audit ก่อน handoff

Save ทุก deliverable ลง Confluence ด้วย
```

**Claude Code จะทำ:**
- เรียก 4 skills ตามลำดับ
- แต่ละ skill produce output
- save ทุกอย่างเข้า Confluence
- แสดง summary + links ให้คุณ

---

## 🐛 Troubleshooting

### ❌ Claude Code ไม่ trigger skill อัตโนมัติ

**สาเหตุ:** Keyword ในคำสั่งไม่ตรงกับ Trigger Conditions

**วิธีแก้:**
- เช็ค Trigger Conditions ใน skill file
- ใช้ keyword ที่ชัดเจนขึ้น เช่น "audit" แทน "ดูให้หน่อย"
- หรือใช้ Pattern 3 (Explicit) แทน

### ❌ MCP ไม่ทำงาน

**เช็ค:**
```bash
claude mcp list
claude mcp test atlassian
claude mcp test figma
```

**ถ้า auth หมดอายุ:**
```bash
claude mcp reauth atlassian
claude mcp reauth figma
```

### ❌ Skill file ไม่ถูกอ่าน

**เช็ค:**
- ไฟล์อยู่ใน `.claude/skills/` ใช่ไหม?
- CLAUDE.md มี reference ถูกต้องไหม?
- ลองสั่งแบบ Pattern 3 (Explicit) ดู

---

## 📚 References

- **Confluence Space:** [UXUI Team](https://7-solutions.atlassian.net/wiki/spaces/UXUI/)
- **Skills Parent Page:** [Agent Skill Library](https://7-solutions.atlassian.net/wiki/spaces/UXUI/pages/517636106/Agent+Skill+Library)
- **Design Workflow Guide:** [🔄 Design Workflow Guide](https://7-solutions.atlassian.net/wiki/spaces/UXUI/pages/518094871/Design+Workflow+Guide)

---

## 🤝 สำหรับทีม

ถ้ามีคนใหม่เข้าทีม แชร์ project นี้ให้เขา — `.claude/` folder จะ setup ให้อัตโนมัติเมื่อเปิดด้วย Claude Code

**Workflow แนะนำ:**
1. คนในทีมแก้ skill ใน Confluence (source of truth)
2. มี review + approve
3. Sync ลง local → commit เข้า git
4. ทุกคน pull ได้เวอร์ชันล่าสุด

---

*Setup guide version: 1.0.0 | Last updated: 2026-04-17*
