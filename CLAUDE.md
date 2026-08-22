# Claude Code Project Configuration

> บริบทของ project สำหรับ Claude Code — อ่านไฟล์นี้ก่อนเริ่มทำงานเสมอ

---

## 🗂️ Repo Structure — feature-first (2026-08-21)

```
ui/               design system กลาง — foundations / components / patterns (shared เท่านั้น)
features/<name>/  หนึ่ง feature หนึ่ง folder: prd.md · ux-<name>.md · pages/ · components/ · fixtures
brand/            brand book (md) — ไฟล์ดิบใน _source/
design-library/   spec ที่วัดจาก Figma — source of truth ของค่าทุกตัว
tools/            generators + ด่านตรวจ (npm run check)
```

### กติกาเมื่อสร้าง UI ให้ feature ใหม่ — บังคับ

> ฉบับเต็ม (ตัวจริง) อยู่ `features/_template/README.md` — แก้กฎที่นั่นที่เดียว ด้านล่างคือฉบับย่อ

1. **อ่าน `features/<name>/prd.md` + `ux-*.md` ก่อนเริ่ม** — ถ้ายังไม่มี ให้ copy `features/_template/` แล้วบอก user ว่าต้องเติมเอกสารก่อน
2. **Reuse ก่อนสร้าง** — เช็ค `ui/components` + `design-library/lotteryplus/components.json` ก่อนเสมอ
3. **Component ใหม่ลง `features/<name>/components/`** ไม่ใช่ `ui/` — จะย้ายขึ้น ui/ ได้ต่อเมื่อมีหลักฐานใช้ซ้ำ ≥2 ที่ (Lark §3.3)
4. **Figma ชนะเสมอเมื่อ Figma มี** — วัดจริง ห้ามเดา บันทึกลง design-library
5. `_source/` = ไฟล์ดิบ gitignored — เอกสารที่ agent อ่านต้องเป็น md ที่ track แล้วเท่านั้น
6. `npm run check` เขียวก่อน commit ทุกครั้ง

## 🎨 Design Skills Registry

ทีมเราใช้ **skill-based workflow** สำหรับงานออกแบบ Skills เหล่านี้เก็บไว้ที่ 2 ที่:

1. **`~/.claude/skills/`** — ติดตั้งแล้วในเครื่อง ใช้เป็น primary source
2. **github.com/sittipons-ike/uxui-agent-library** — source of truth ของทีม อัปเดตผ่าน `git pull && bash setup.sh`

### 📘 Team Skills (ของทีม UXUI — Thai, Figma-focused)

| Task | Skill Name | File |
|---|---|---|
| Audit/QA **Figma** (DS compliance) | `audit-ui` | `skills/audit-ui.md` |
| Plan UX/User flow/IA | `ux-skill` | `skills/ux-skill.md` |
| Implement UI from Blueprint | `ui-skill` | `skills/ui-skill.md` |
| Write microcopy | `ux-writing` | `skills/ux-writing.md` |

### ✨ Impeccable Skills (third-party — English, code-focused)

จาก [impeccable.style](https://impeccable.style) (Apache 2.0) — 21 skills ที่ `~/.claude/skills/`

| Category | Skills |
|---|---|
| 🛠️ Foundation | `teach-impeccable`, `frontend-design` |
| 🔍 Quality & Review | `audit`, `critique`, `polish`, `harden`, `normalize`, `extract` |
| 🎨 Visual Tuning | `bolder`, `quieter`, `colorize`, `arrange`, `typeset`, `distill` |
| ✨ Motion & Delight | `animate`, `delight`, `overdrive`, `optimize` |
| 📱 Adapt & Improve | `adapt`, `onboard`, `clarify` |

---

## 🔌 Connected MCPs

- **figma-console** (`figma-console-mcp`) — อ่าน/เขียน/ตรวจ Figma โดยตรง

---

## 🎯 Skill Invocation Rules

### When to use skills automatically

อ่าน skill ใน `~/.claude/skills/` ก่อนทำงาน ถ้า user's request ตรงกับ **Trigger Conditions** ของ skill นั้น

| User says... | Skill to use |
|---|---|
| "audit", "review", "QA" + **Figma link** | `audit-ui` (team skill) |
| "audit", "review", "QA" + **code/web/built UI** | `/audit` (Impeccable) |
| "WCAG", "a11y", "contrast", "performance", "dark mode" | `/audit` (Impeccable) |
| "DS compliance", "token usage", "น้องใช้ DS ถูกมั้ย" | `audit-ui` (team skill) |
| "plan", "blueprint", "user flow", "IA" | `ux-skill.md` |
| "build UI", "implement", "spec", "tokens" + Figma link | `ui-skill.md` |
| "write copy", "rewrite", "microcopy", "CTA" | `ux-writing.md` |

### Choosing between /audit (Impeccable) vs audit-ui (team)

```
Need to audit UI quality?
  ├─ UI in Figma (design stage) → audit-ui
  │    - DS compliance only (narrow scope)
  │    - Thai comments pinned on Figma
  │    - pre-handoff check
  │
  └─ UI in code/web (built) → /audit (Impeccable)
       - Broad quality (WCAG + perf + responsive + anti-pattern)
       - English report
       - pre-ship quality gate
```

### How to use skills

1. **อ่าน local file ก่อน** จาก `~/.claude/skills/{skill-name}.md`
2. **ทำตาม Execution Steps** ที่ระบุใน skill อย่างเคร่งครัด
3. **ใช้ Output Format** ที่ระบุ — ไม่สร้าง format เอง
4. **ไม่ละเมิด Constraints** ที่ระบุ

### Workflow Chaining

Skills ถูกออกแบบให้ทำงานต่อกันตาม workflow:

```
ux-strategist → [ui-implementation-specialist + ux-writer] → design-qa-auditor
```

ถ้า user ขอ "full design workflow" → ทำตามลำดับนี้

---

## 📋 Common Prompts Reference

### Quick QA Audit
```
Audit นี้: [Figma link]
Post comments บน Figma สำหรับ Critical issues
```
→ จะใช้ `audit-ui.md`

### UX Planning
```
ช่วยวาง UX Blueprint สำหรับฟีเจอร์ [...]
User goal: [...]
Business goal: [...]
```
→ จะใช้ `ux-skill.md`

### UI Implementation
```
Implement UI ตาม Blueprint นี้: [link]
Figma file: [link]
```
→ จะใช้ `ui-skill.md`

### Copywriting
```
Rewrite copy ใน Figma นี้: [link]
Emotional state: [rushed/anxious/excited]
```
→ จะใช้ `ux-writing.md`

---

## 🔄 อัปเดต Skills

```bash
cd ~/AI_Agent/Claude_code_Agent/uxui-skill-library
git pull
bash setup.sh
```

---

## 🛡️ Safety Rules

- **ไม่แก้ไข skill files เอง** โดยไม่มี user confirm
- **ไม่ลบ Figma comments** ที่มีอยู่เดิม (ใช้ `get_comments` เช็คก่อน `post_comment`)
- **ไม่ auto-approve** design QA ถ้ามี Critical issues
- ถ้าไม่แน่ใจ **ถาม user ก่อน** ดีกว่าเดาเอง

---

## 📝 Team Info

- **Team:** UXUI Team — 7 Solutions
- **Skill Library:** github.com/sittipons-ike/uxui-agent-library
- **Last Updated:** 2026-05-10
