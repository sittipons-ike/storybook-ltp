# Phase 3 — Vocabulary

> Renaming the *words*, not the spelling. Phase 2 fixes how names are written
> (`bg` → `background`); this one fixes names that describe the wrong thing.
> Status: **code is done, Figma is not.** The two disagree on purpose until this runs.

---

## 1. Button variants — decided 2026-08-21, code already changed

The Standard's five are `primary · secondary · tertiary · ghost · destructive`.
Reading the token values showed two of ours were the wrong way round.

| Draws | Figma calls it | Code called it | **Code calls it now** |
|---|---|---|---|
| white surface, **6 border tokens** | `tertiary` | `tertiary` | **`outline`** |
| white surface, **no border token at all** | `outline` | `outline` | **`ghost`** |
| `status.info` blue, underlined on hover | `link` | `link` | `link` — extension |

The variant named for a stroke was the one without one. `outline` and `ghost` are both
real and both canonical; the difference between them *is* the stroke, which is why this
is a rename and not a merge.

### Why the code moved first

The values in Figma are right — a designer chose them and the UI is built on them. Only
the labels are wrong, and they have been for long enough that the team who set them has
moved on. Changing the labels in Figma touches every binding on every canvas; changing
them in code touches five call sites. The cheap side went first, and this file is the
reason the expensive side will know what it is doing.

Until Phase 3 runs, `Button.stories.tsx → figmaName()` is the bridge:

```ts
outline: 'ter',   // Figma still calls the stroked one `tertiary`
ghost:   'out',   // Figma still calls the unstroked one `outline`
```

### What Phase 3 does in Figma

```
colors/button/tertiary/*  →  colors/button/outline/*
colors/button/outline/*   →  colors/button/ghost/*
colors/button/link/*      →  unchanged
```

Order matters: `tertiary → outline` must land before `outline → ghost`, or the second
rename overwrites the first. Run it as two passes with a verify in between, or rename
`outline → ghost` first and `tertiary → outline` second — the latter has no collision.

### `destructive` is not built

Nothing in the product is a destructive action yet: there is no confirm-delete button
anywhere in the Frontend. The variant is left unbuilt rather than invented, and `link`
does **not** stand in for it — `link` reads as navigation, and dressing a delete as
navigation is how people delete things by accident.

---

## 2. Token ref prefix — not yet decided

| | |
|---|---|
| Standard | `{semantic.colors.primary.default}` — start at the root, no partial path |
| Ours | `{design.semantic.colors.primary.default}` |

485 refs across every overlay carry the extra `design.` segment.

Nothing is broken by it — the generator resolves either — so this is a consistency
question, not a bug. It is listed here because the Standard is explicit ("เริ่มจาก root
เสมอ ... ไม่มี partial path") and a deviation nobody wrote down becomes a deviation
nobody remembers choosing.

**Needs a decision:** drop the prefix to match the Standard, or record it as a
deliberate deviation in `design.md` beside the breakpoint one.

---

## 3. Known deviations already recorded

Listed so this file is the whole vocabulary picture rather than half of it.

| Deviation | Where it is recorded |
|---|---|
| 8 breakpoints instead of the Standard's 7 (`3xl` added) | `design.md` → Known Gaps |
| `spacing`/`radius` run to `10xl`/`11xl`; Standard stops at `9xl` | `design.md` → Known Gaps |
| No `motion` group at any tier | `design.md` → Known Gaps |
