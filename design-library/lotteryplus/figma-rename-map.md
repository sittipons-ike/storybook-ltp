# Figma Variable Rename Map — Phase 2

> **Target file (decided 2026-08-19): `Re-naming Tokens` (`aXZZRZrCqT6pgIn62sevzu`)**
> A copy of V.7.1 — identical collections, 1321 variables, same content down to the
> `tertiary-defualt` typo — reorganised into Atoms / Molecules / Organism pages. Renaming
> a copy means a mistake costs nothing: production keeps working while the map is proven.
> Once the copy verifies clean, the same map applies to production.
>
> Source of record for values: `Design Systems Web App Lotteryplus V.7.1` (`inmmHQID7awAWFcEJzedZa`)
> Authority: Lark Wiki — *Structure - Design system (7 Solutions Team)*
> Status: **DRAFT — needs designer approval before execution**
> Executor: Claude via figma-console MCP (`figma_rename_variable`). Non-destructive — renaming a variable preserves its id, value, modes, and every binding on canvas.

## Scope — measured 2026-08-17, not estimated

1321 variables across four collections. Excluding 168 that are not design tokens
(`writing/*` Thai copy, `grid/*` layout guides, `no-1`…`no-6` and `Boolean` scratch
variables), **525 of 1153 need renaming** and 628 already comply.

| Collection | Tokens | Need rename | |
|---|---|---|---|
| `3-component` | 268 | **254** | 95% — the button group carries most of it |
| `typography` | 168 | **154** | 92% — every role bakes weight into its name |
| `2-semantic` | 314 | 106 | 34% |
| `.1-primitive` | 403 | 11 | 3% — near-clean; mostly `fuschia` and `weight/PascalCase` |

The shape of that table is the useful part: the primitive tier is almost compliant, and
nearly all the work is in the two tiers a developer actually reads.

---

## Why rename at all

The Standard's "No vocabulary swap" rule says the same word must survive every hop: `design.md` → `components.json` → `tokens.css` → the JSX a developer writes. Today Figma says `btn-bg-pri-hover`, the Standard says `background`, and `tokens.ts` says `bg`. Three names for one thing means a designer and a developer can be looking at the same token and not know it. Renaming Figma in the same window as the code rename is what closes that loop — rename only the code and Figma becomes the odd one out; rename only Figma and the code breaks.

---

## 1. Mechanical rules

Applied in order. Every rule below is a pure string transform, so the whole map can be regenerated from a fresh pull at execution time. Hit counts are from the 2026-08-17 audit; a variable can trip more than one rule, so these sum to more than 525.

| Rule | Variables hit |
|---|---|
| R1 abbreviated props (`bg`/`fg`) | 280 |
| R3 variant abbreviations | 61 |
| R2 non-canonical states | 43 |
| R8 numeric semantic dimensions | 31 |
| R10 redundant accent prefix | 26 |
| R11 spaces in names | 19 |
| R7 missing kebab / typos | 14 |
| R6 role-stop joined by dash | 13 |
| R9 device-named breakpoints | 8 |
| R5 PascalCase weights | 7 |
| R4 `size/s\|m\|l` | 6 |

| # | Rule | Before | After |
|---|---|---|---|
| R1 | Property names spelled out | `btn-bg-*` / `btn-fg-*` | `btn-background-*` / `btn-foreground-*` |
| R2 | Canonical state names | `default` · `focused` · `pressed` · `actived` | `rest` · `focus` · `active` · `selected` |
| R3 | Variant abbreviations expanded | `-pri-` · `-sec-` · `-ter-` · `-out-` · `-oncont-` | `-primary-` · `-secondary-` · `-tertiary-` · `-outline-` · `-on-container-` |
| R4 | Size scale to t-shirt | `size/s` · `size/m` · `size/l` | `size/sm` · `size/md` · `size/lg` |
| R5 | Weight names to kebab-case | `weight/Semibold` | `weight/semibold` |
| R6 | Role + stop separated by path, not dash | `colors/text/primary-default` | `colors/text/primary/default` |
| R7 | Compound words get kebab | `colors/border/onbgcolor` | `colors/border/on-bgcolor` |
| R8 | Semantic dimensions use t-shirt, not numbers | `dimension/border-width/1` | `dimension/border-width/hairline` |
| R8b | Semantic opacity names its intent, not its number | `dimension/opacity/50` · `/40` · `/25` | `dimension/opacity/disabled` · `/muted` · `/subtle` |
| R9 | Breakpoints use t-shirt, not device names | `breakpoint/mobile-321` | `breakpoint/2xs` |
| R10 | Accent sub-scale drops the redundant role prefix | `colors/primary/accent/primary-lg` | `colors/primary/accent/lg` |
| R11 | No spaces in names | `colors/bottom sheet/bottom sheet-bg-white` | `colors/bottom-sheet/bottom-sheet-background-white` |

**R2 mapping in full** — the Standard's seven canonical states are `rest · hover · active · focus · disabled · selected · error`. Figma currently uses five names, two of which collide with canonical words that mean something else:

| Figma today | Standard | Note |
|---|---|---|
| `default` | `rest` | `default` is not a state in the canonical set |
| `hover` | `hover` | already correct |
| `focused` | `focus` | participle → base form |
| `pressed` | `active` | `active` is the canonical name for the pressed state |
| `disabled` | `disabled` | already correct |
| `actived` | `selected` | misspelling; semantically this is the selected state |

---

## 2. Explicit fixes (not rule-derivable)

These are one-off defects found during the 2026-08-17 pull. Each needs its own entry because no rule generates them.

| Current | Corrected | Defect |
|---|---|---|
| `colors/text/tertiary-defualt` | `colors/text/tertiary/default` | typo — "defualt" |
| `colors/fuschia/*` (11 stops) | `colors/fuchsia/*` | Tailwind spells it `fuchsia` |
| `colors/success/accent/green-lg` | `colors/success/accent/lg` | accent named by hue instead of role |
| `colors/success/accent/green-md` | `colors/success/accent/md` | same |
| `colors/success/accent/green-xl` | `colors/success/accent/xl` | same |
| `label/m-semb/line height` | `label/md/semibold/line-height` | space instead of kebab |
| `heading/h1-semb/font family` | `heading/h1/semibold/font-family` | space instead of kebab (7 more like it) |
| `dimension/spacing/spacing-2lg` | *(decision needed)* | `2lg` is not a canonical t-shirt stop — see §5 |
| `no-1` … `no-6`, `Boolean`, `Boolean 2` | *(delete or namespace)* | orphaned scratch variables |

---

## 3. Typography role renaming

Figma bakes the weight into the role name (`body/m-reg`). The Standard wants weight as its own path segment so the size scale stays a clean t-shirt ladder.

| Figma today | After |
|---|---|
| `body/m-reg/*` | `body/md/regular/*` |
| `body/m-med/*` | `body/md/medium/*` |
| `body/m-semb/*` | `body/md/semibold/*` |
| `heading/h1-semb/*` | `heading/h1/semibold/*` |
| `display/5xl-semb/*` | `display/5xl/semibold/*` |
| `label/m-reg-strike/*` | `label/md/regular/*` + `text-decoration` prop |
| `sub-title/l-med/*` | `sub-title/lg/medium/*` |
| `button/xs-med/*` | `button/xs/medium/*` |

All 35 roles follow the same shape: `{family}/{size}/{weight}/{property}`.

---

## 4. Component tier — 268 variables, 25 groups

The button group is the largest and the only one using variant abbreviations, so it carries most of the work:

```
colors/button/primary/btn-bg-pri-default    →  colors/button/primary/btn-background-rest
colors/button/primary/btn-bg-pri-hover      →  colors/button/primary/btn-background-hover
colors/button/primary/btn-bg-pri-focused    →  colors/button/primary/btn-background-focus
colors/button/primary/btn-bg-pri-pressed    →  colors/button/primary/btn-background-active
colors/button/primary/btn-bg-pri-disabled   →  colors/button/primary/btn-background-disabled
colors/button/primary/btn-fg-pri-*          →  colors/button/primary/btn-foreground-*
colors/button/on-cont/btn-bg-oncont-actived →  colors/button/on-container/btn-background-selected
```

The remaining 24 groups (`text-field`, `modal`, `toast`, `tabs`, `lotto-board`, `carts`, `orders`, `checkbox`, `dropdown`, `radio-buttons`, `progress-bars`, `navigation-bar`, `breadcrumb`, `toggle-switch`, `loading`, `icon`, `card`, `top-and-footer`, `lottery`, `jidrit-lucky`, `home`, `profile`, `bottom sheet`, `gradient`) need R1 and R11 only — they already avoid variant abbreviations, using descriptive suffixes like `toast-bg-soft-green`.

One naming question these groups raise: many of them encode the *hue* in the token name (`toast-bg-soft-green`, `modal-fg-yellow`) rather than the *role* (`toast-background-success`). That is a deeper refactor than a rename, because it changes which semantic token each one should alias to. **Out of scope for Phase 2** — logged as follow-up in §5.

---

## 5. Decisions (resolved 2026-08-17)

1. **`dimension/spacing/spacing-2lg` (10px) — RETIRE.** It has one real consumer: Storybook's Dropdown, which uses it for field padding and list gap. Migrating it changes the field's height by 4px either way, so the sequence matters: a designer picks 8 or 12 → the variable is deleted in Figma → design.md is re-pulled → Dropdown migrates. Deleting it from design.md ahead of Figma would leave Storybook disagreeing with Figma, which is the failure this whole pipeline is built to prevent. Until then it stays, marked deprecated.

   Unrelated but worth noting: the Frontend also defines `borderRadius['2lg'] = 10px` in `tailwind.config.js`, used in ten `.module.css` files. Figma's radius ladder has no 10px stop at all, so that one is an FE invention rather than a Figma legacy — it retires during Phase 5.

2. **Eight breakpoints — KEEP.** Figma carries both 1440 and 1920 and both are in use, so the ladder grows a `3xl` tier rather than losing a real breakpoint. Final mapping: `2xs 321 · xs 361 · sm 390 · md 768 · lg 1024 · xl 1280 · 2xl 1440 · 3xl 1920`.

3. **Hue-named component tokens — SEPARATE PHASE.** `toast-bg-soft-green`, `modal-fg-yellow`, and roughly sixty more name the hue rather than the role. Renaming them to `toast-background-success` changes what each token *means*, not just how it is spelled, so each one has to be checked against real usage — a `soft-green` background is not always a success signal. This waits until `components.json` exists and can answer that question per component. Phase 2 covers spelling only.

---

## 6. Execution plan

1. **Regenerate** the map from a fresh pull — the rules in §1 are deterministic, so the map is reproducible rather than hand-maintained.
2. **Snapshot** the current state: variable id → name → value → binding count. This is the rollback reference and the verification baseline.
3. **Present** the full diff to the designer for approval. No renames run before sign-off.
4. **Execute** in dependency order — primitive, then semantic, then component — so alias paths never dangle mid-run.
5. **Verify** by re-pulling and comparing against the snapshot: variable count identical, every id still present, every resolved value byte-identical, binding counts unchanged. Any drift on those four means stop and roll back.
6. **Land the code rename in the same window** — Storybook `tokens.ts`, `components.json`, and `tokens.css` flip vocabulary together with Figma, so there is no period where the two disagree.

Rollback is a rename in the opposite direction using the snapshot; because ids never change, nothing is lost.

---

## 7. Icon findings (2026-08-17) — separate from the rename

Auditing the Icon component turned up four things in Figma itself. None are renames, so
they are listed here rather than folded into the tables above.

### 7.1 Four components share two names

`icons` frame has 161 components but only 157 distinct names. Four names appear twice, and
each pair is a **genuinely different drawing**, not a copy:

| Name | Node A | Node B | Path length A : B |
|---|---|---|---|
| `outline-safe` | `14291:110801` | `14291:110821` | 5051 : 4543 |
| `filled-safe` | `14291:110803` | `14291:110823` | 3743 : 882 |
| `outline-Lottery` | `14291:110845` | `14291:110918` | 18477 : 11486 |
| `filled-Lottery` | `14291:110847` | `14291:110920` | 17766 : 10784 |

The exporter walked them in order and wrote both into `icon-data.ts`, where the second
entry silently overwrites the first — so **node B is what ships today and node A is dead**.
This is also the source of the four "known" TypeScript duplicate-key errors, which turn out
to describe four missing icons rather than a lint nit.

A designer needs to decide which drawing is canonical and delete the other. Until then the
exporter cannot produce a correct file, because the input is ambiguous.

### 7.2 Six icons exist in Figma but were never exported

`filled-clock` · `outline-arrow` · `outline-building` · `outline-copy` · `outline-list` ·
`outline-menu`

The diff runs clean in the other direction: nothing in `icon-data.ts` is absent from Figma,
so the export was faithful, just incomplete.

### 7.3 `filled-Randomize` does not exist

`SearchCard` asks for it for the "สุ่มตัวเลข" button, and no icon in Figma matches
`random`, `shuffle`, `dice`, or `refresh`. It has been rendering a grey `?` in production.
The nearest existing glyph is `filled-autorenew`, but substituting it is a design decision,
not a bug fix.

### 7.4 Icon names do not follow the Standard

The frame mixes conventions freely: `outline-Home` (PascalCase), `outline-radio-button`
(kebab), `outline-Red envelope` and `outline-terms and conditions` (**spaces**),
`outline_Share` (underscore), `filled-check_circle` (mixed). The Standard requires
kebab-case throughout. These are component names rather than variable names, so they rename
through a different mechanism than everything in §1–4, and every rename breaks the
corresponding key in `icon-data.ts` — do the two together or not at all.
