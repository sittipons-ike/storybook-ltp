# Feature template

Copy this folder when a new requirement arrives:

```bash
cp -R features/_template features/<feature-name>
```

## What goes here

| File | Who writes it | What it is |
|---|---|---|
| `prd.md` | designer/PM | What we are building and why — scope, goals, out-of-scope |
| `ux-<feature>.md` | designer | Flows, IA, edge cases — the blueprint an agent builds from |
| `pages/` | agent | Page components + stories, composed from `ui/` |
| `components/` | agent | Components that exist only for this feature so far |
| `fixtures.ts` | designer/agent | Real data the pages draw — designer state, not API envelopes |
| `_source/` | anyone | Raw material: decks, exports, briefs. **Gitignored** — heavy files live here without entering git |

## Rules for the agent building UI here

1. **Read `prd.md` and `ux-*.md` first.** Do not build from the title alone.
2. **Reuse before creating**: check `ui/components` and `design-library/lotteryplus/components.json`. A component that already exists is used, not re-drawn.
3. **New components land here**, in `features/<name>/components/` with `scope: feature` metadata — not in `ui/`. They graduate to `ui/components` only with evidence of reuse in ≥2 places (Lark Standard §3.3, share by evidence).
4. **Figma wins when Figma has it** — measure, never guess. Record what was measured in the component's overlay under `design-library`.
5. **Pages compose** — no `sys(...)`, no `var(--…)`, no hex. The gate enforces this.
6. `npm run check` green before any commit.
