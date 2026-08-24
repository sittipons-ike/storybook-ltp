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

---

## 2. `button-special` — decided 2026-08-22, code already changed

Figma keeps a second set called `button-special` (`14291:131519`). Reading all twelve of
its variants showed it is not a second button — it is **four unrelated controls sharing a
set**:

| `status` | size | what it draws | same idea as `button`? |
|---|---|---|---|
| `random-number` ×4 states | 114×**54** | gradient `#262626 → #E32321 66%`, two blurred ellipses, `filled-AI`, `#FEF2F2` | **yes** — icon, label, radius 8, `button/m-semb` |
| `lotto-tab` ×4 | 114×44 | grey surface, `#525252` text | no — it is a tab |
| `buy-lotto` ×3 | 140×44 | Primary red, plus a `Loading` instance and a disabled treatment | nearly — Primary L with a loading slot |
| `button` ×1 | 155×44 | Primary red | **duplicate** of `Size=L, Type=Primary`, bar 8 of padding against 16 |

### What moved

Only `random-number`, as **`Button variant="special"`**. It is a button in every way the
atom already shares; what differs is a gradient instead of a flat fill, a 54 the size axis
has no step for, and a glow.

Its values live under `btn-special-*` now — including the two blurred ellipses, which
`lotto-board.json` had recorded as the `randomise-glow` gap and never drawn. The old
`randomize-*` tokens are gone from that overlay; `_moved-randomize-to-button` says where
they went, so a search for the old name lands somewhere.

Three of its four states differ in ways no colour token can carry, so `Button` reads them
from the state and `known_gaps` records each:

```
hover, pressed   the lower ellipse is hidden
focus            a 4px ring at primary/24% — the only variant that draws one at all
pressed          a 40% black scrim over the gradient
```

### What did not move, and why

`lotto-tab` is a tab. Putting it in `Button` would mean `Button` answers for the surface
`Tabs` already covers.

`buy-lotto` and `status=button` are near-duplicates of Primary L. Merging them is the right
call and a bigger one: it needs a `loading` prop on `Button`, and it changes what
`status=button` means for every canvas that instantiates it. Left for a later pass rather
than folded into a page build.

### What Phase 3 does in Figma

```
button-special / status=random-number  →  button / Type=Special
button-special / status=lotto-tab      →  tabs (or menu-button), not button
button-special / status=buy-lotto      →  button / Type=Primary + a loading property
button-special / status=button         →  delete; it is button / Size=L, Type=Primary
```

Same order of operations as §1: the code moved first because it is five call sites against
every canvas, and this file is the reason the expensive side will know what it is doing.

