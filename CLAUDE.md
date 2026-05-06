# Claude Code Project Configuration

> บริบทของ project สำหรับ Claude Code — อ่านไฟล์นี้ก่อนเริ่มทำงานเสมอ

---

## 🎨 Design Skills Registry

ทีมเราใช้ **skill-based workflow** สำหรับงานออกแบบ Skills เหล่านี้เก็บไว้ที่ 2 ที่:

1. **Local** (เร็วสุด): `.claude/skills/` — ใช้ files เหล่านี้เป็น primary source
2. **Confluence** (source of truth): UXUI Team space — sync เวอร์ชันล่าสุดจากที่นี่

### 📘 Team Skills (ของทีม UXUI — Thai, Figma-focused)

| Task | Skill Name | Location | Confluence Page ID |
|---|---|---|---|
| Audit/QA **Figma** (DS compliance) | `audit-ui` | `.claude/skills/audit-ui.md` | 518160385 |
| Plan UX/User flow/IA | `ux-skill` | `.claude/skills/ux-skill.md` | 518094850 |
| Implement UI from Blueprint | `ui-skill` | `.claude/skills/ui-skill.md` | 517931029 |
| Write microcopy | `ux-writing` | `.claude/skills/ux-writing.md` | 518127617 |

### ✨ Impeccable Skills (third-party — English, code-focused)

จาก [impeccable.style](https://impeccable.style) (Apache 2.0) — 21 skills ที่ `~/.agents/skills/` (symlink → `~/.claude/skills/`)

**Index + category pages บน Confluence:**

| Category | Confluence Page ID | Skills |
|---|---|---|
| ✨ **Impeccable Skills (Index)** | **519012367** | ภาพรวม + เทียบกับ Team Skills |
| 🛠️ Foundation | 519012393 | `teach-impeccable`, `frontend-design` |
| 🔍 Quality & Review | 519012417 | `audit`, `critique`, `polish`, `harden`, `normalize`, `extract` |
| 🎨 Visual Tuning | 519372801 | `bolder`, `quieter`, `colorize`, `arrange`, `typeset`, `distill` |
| ✨ Motion & Delight | 519241740 | `animate`, `delight`, `overdrive`, `optimize` |
| 📱 Adapt & Improve | 519405570 | `adapt`, `onboard`, `clarify` |

**Comparison audit vs audit-ui:** อยู่ในหน้า Quality & Review Skills (519012417) section "🆚 audit vs audit-ui"

**Confluence Base URL:** `https://7-solutions.atlassian.net/wiki/spaces/UXUI/pages/{page_id}`

**Atlassian Cloud ID:** `131ad226-f4a8-42b6-9148-b5b945a2617f`

---

## 🔌 Connected MCPs

- **atlassian** — Confluence pages, Jira issues, comments
- **figma** — Design context, tokens, styles, comments

---

## 🎯 Skill Invocation Rules

### When to use skills automatically

อ่าน skill ใน `.claude/skills/` ก่อนทำงาน ถ้า user's request ตรงกับ **Trigger Conditions** ของ skill นั้น

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

ดูรายละเอียดเปรียบเทียบ: [🔍 Quality & Review Skills (Confluence 519012417)](https://7-solutions.atlassian.net/wiki/spaces/UXUI/pages/519012417) section "audit vs audit-ui"

### How to use skills

1. **อ่าน local file ก่อน** (เร็วกว่า) — จาก `.claude/skills/{skill-name}.md`
2. **ถ้า user ขอ "latest" หรือ "fetch from Confluence"** → ใช้ `atlassian:getConfluencePage` ดึงเวอร์ชันล่าสุด
3. **ทำตาม Execution Steps** ที่ระบุใน skill อย่างเคร่งครัด
4. **Use Output Format** ที่ระบุ — ไม่สร้าง format เอง
5. **ไม่ละเมิด Constraints** ที่ระบุ

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

## 🔄 Syncing Skills from Confluence

เมื่อ user ขอให้ sync skills:

```
# Fetch latest skill from Confluence
atlassian:getConfluencePage(
  cloudId: "131ad226-f4a8-42b6-9148-b5b945a2617f",
  pageId: "518160385"  # design-qa-auditor
)
```

แล้ว save ทับไฟล์ local ใน `.claude/skills/`

---

## 🛡️ Safety Rules

- **ไม่แก้ไข skill files เอง** โดยไม่มี user confirm
- **ไม่ลบ Figma comments** ที่มีอยู่เดิม (ใช้ `get_comments` เช็คก่อน `post_comment`)
- **ไม่ auto-approve** design QA ถ้ามี Critical issues
- ถ้าไม่แน่ใจ **ถาม user ก่อน** ดีกว่าเดาเอง

---

## 📝 Team Info

- **Team:** UXUI Team
- **Confluence Space:** UXUI (`https://7-solutions.atlassian.net/wiki/spaces/UXUI/`)
- **Primary Skills Parent Page:** Agent Skill Library
- **Last Updated:** 2026-04-19
