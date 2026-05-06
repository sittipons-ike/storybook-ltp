# ⚡ Quick Start — 3 ขั้นตอน

## 1️⃣ วางไฟล์ใน project ของคุณ

```bash
cd /path/to/your-project

# แตกไฟล์ที่ดาวน์โหลดมาเข้า project
# (โครงสร้างจะเป็น: CLAUDE.md + .claude/skills/ + .claude/commands/)
```

**โครงสร้างที่ได้:**
```
your-project/
├── CLAUDE.md                    ← Context สำหรับ Claude Code
└── .claude/
    ├── skills/                  ← 4 skill files
    │   ├── audit-ui.md
    │   ├── ux-skill.md
    │   ├── ui-skill.md
    │   └── ux-writing.md
    └── commands/                ← 5 slash commands
        ├── audit.md             ← /audit
        ├── ux-plan.md           ← /ux-plan
        ├── ui-spec.md           ← /ui-spec
        ├── copy.md              ← /copy
        └── sync-skills.md       ← /sync-skills
```

## 2️⃣ เช็ค MCPs

```bash
claude mcp list
```

ต้องมี `atlassian` และ `figma` ถ้าไม่มี ดูวิธีติดตั้งใน `SETUP.md`

## 3️⃣ ทดสอบ!

เปิด Claude Code ใน project แล้วลอง:

```
/audit https://figma.com/file/YOUR_FIGMA_URL
```

หรือสั่งแบบ natural language:

```
Audit งานนี้ให้หน่อย: https://figma.com/file/xxx
Post comments บน Figma สำหรับ Critical issues
```

**เสร็จ!** 🎉

---

## 📚 อ่านต่อ

- `SETUP.md` — คู่มือติดตั้งฉบับเต็ม + troubleshooting
- `CLAUDE.md` — Context + rules ที่ Claude Code ใช้
- `.claude/skills/*.md` — skill files ทั้งหมด (แก้ไขได้)
- `.claude/commands/*.md` — slash commands (เพิ่ม/แก้ได้)

## 🔗 Source of Truth

Skills ต้นฉบับอยู่ที่ Confluence:
- [Agent Skill Library](https://7-solutions.atlassian.net/wiki/spaces/UXUI/pages/517636106/Agent+Skill+Library)

ถ้ามี update ใหม่ที่ Confluence → รัน:
```
/sync-skills
```

เพื่อดึงเวอร์ชันล่าสุดมาวาง local
