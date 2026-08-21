# Token pipeline

The chain, and who decides what at each hop:

```
Figma V.7.1                    values (hex, px — the only place a value is authored)
    │  pull via figma-console MCP
    ├──────────────────────────┐
    ▼                          ▼
design.md                 components.figma.json     raw colour mirror, 3-component
  tokens + Standard naming     │  python3 tools/gen-components.py
    │                          ▼
    │                     components.json  ◄── components/<name>.json   layout overlays
    │                          │                (hand-authored: spacing, sizing, type)
    └──────────┬───────────────┘
               │  python3 tools/gen-tokens.py
               ▼
   tokens.css          --sys-* (Tier 1) + component aliases (Tier 2)
   tokens.generated.ts resolved literals for stories and tests
               │  imported by
               ▼
        Storybook      the thing designers and developers both open
```

Structure and naming come from the Lark Wiki Standard. Values come from Figma. When the
two disagree about a *name*, design.md uses the Standard's and the Figma-side fix is
queued in [`figma-rename-map.md`](../design-library/lotteryplus/figma-rename-map.md).
When they disagree about a *value*, Figma wins — always.

## Scripts

### `gen-tokens.py`

Reads `design.md` and `components.json`, resolves every ref, and writes two files:

```bash
python3 tools/gen-tokens.py
```

- **`UI Library/foundations/tokens.css`** — Tier 1 (`--sys-*`, semantic) and Tier 2
  (`--btn-*` and friends, per-component aliases pointing at Tier 1). This is what
  components render with.
- **`UI Library/foundations/tokens.generated.ts`** — the same tokens with every ref
  resolved to a literal. Stories and tests import this so a verification table can never
  claim a value the component does not actually render.

Details worth knowing:

- **Responsive typography.** `size` and `line-height` are `{ mobile, desktop }` pairs at
  the *primitive* tier, mirroring Figma's three-mode typography collection. The generator
  emits mobile at `:root` and desktop inside `@media (min-width: 768px)` — a mobile-first
  cascade, so no semantic role needs a `responsive:` block.
- **Two-layer shadows.** Figma models them with `-2` suffixed sub-tokens; design.md keeps
  them as a `layers[]` array and the generator composes a comma-separated `box-shadow`.
- **Alpha on a token.** `{ref}@24%` becomes `color-mix(in srgb, var(--sys-…) 24%, transparent)`
  in CSS so the alias chain survives, and the flattened hex (`#E323213D`) in TypeScript.

### `gen-components.py`

Mirrors Figma's `3-component` collection into `components.json` with Standard-compliant
names, resolving each Figma alias into a `{design.semantic.*}` ref.

```bash
python3 tools/gen-components.py          # write
python3 tools/gen-components.py --check  # exit 1 if out of date (for CI)
```

Three things it handles that are easy to get wrong by hand:

- **Two shapes of component.** Button has a real variant × state matrix and is hand-authored;
  every other component is a flat palette in Figma (`toast-bg-soft-green`) and is generated.
- **Property names.** Figma abbreviates — `bg` → `background`, `fg` → `foreground`. The
  focus outline (`bd-bg-active`) and the radio ripple (`eff-bg-*`) are both the canonical
  `ring` property under Figma-local spellings.
- **Literals that should be refs.** A few Figma tokens hold a raw hex that is really a
  semantic colour at 40%. Those become `{ref}@40%` so changing the brand red still moves the
  focus ring, which a frozen hex would not.

Layout, sizing and typography live outside Figma's colour collection, so they are authored
per component in `design-library/lotteryplus/components/<name>.json` and merged in. One file
per component means several people can work on different components without colliding.

Editorial metadata — `responsibility`, `composition_level`, `scope`, `dependencies` — is a
human judgement, not a pull, so it lives in the `META` table inside the script.

### `verify-tokens.py`

The safety net. design.md is transcribed from Figma by hand, so a single typo would ship a
wrong colour and nothing downstream would notice. This maps every Figma semantic colour to
its CSS var name and asserts the values are byte-identical.

```bash
python3 tools/verify-tokens.py          # exit 0 = clean
python3 tools/verify-tokens.py -v       # list every match
```

Run it after any edit to `design.md`, and after any rename in Figma. It has already earned
its keep — it caught a mapper bug where `border/accent/green-dark` was being read as a role
prefix rather than a hue.

### `fix-icon-paths.py`

Rebuilds an icon's path data from Figma when the export produced something the browser
rejects.

```bash
python3 tools/fix-icon-paths.py --source /tmp/figma_paths.json --dry-run
python3 tools/fix-icon-paths.py --source /tmp/figma_paths.json
```

It exists because `filled-Male` and `filled-Female` shipped with `nan` coordinates: one bad
number voids the entire `d` attribute, so both glyphs rendered as nothing while the icon
gallery still showed a tidy labelled cell. Figma's own geometry was clean, so the export
script was at fault.

Figma returns a vector's path in that vector's local space, offset inside the 24×24 frame,
so the script translates by the offset before writing. It refuses to run on any path
containing an arc command, where a naive translate would corrupt the geometry.

Capture the source with this on the Desktop Bridge:

```js
const page = figma.root.children.find(p => /icon/i.test(p.name));
await page.loadAsync();
const out = {};
for (const name of ['filled-Male', 'filled-Female']) {
  const comp = page.findOne(n => n.type === 'COMPONENT' && n.name === name);
  const v = comp.findOne(c => c.type === 'VECTOR');
  out[name] = { dx: v.x, dy: v.y, data: v.vectorPaths[0].data };
}
return out;
```

### `check.sh`

The gate. Everything above plus the checks that keep component code honest.

```bash
bash tools/check.sh
```

Five steps, failing on the first problem:

1. **Generated files are up to date** — regenerating must produce no diff.
2. **tokens.css matches Figma** — runs `verify-tokens.py`.
3. **No literal colours in component code** — a `#RRGGBB` outside a story means a component
   is deciding a value the design system should own.
4. **No forbidden naming** — abbreviated (`--x-bg-*`) or snake_case token names.
5. **TypeScript** — clean, ignoring the four known duplicate-key errors in `icon-data.ts`.

Worth wiring into CI for Phase 6. It has caught two real defects so far: a TS emitter that
broke on font stacks containing single quotes, and a phantom Storybook entry created by
`export type` in a stories file (the indexer reads exports statically and cannot tell a type
from a story).

## Refreshing the Figma snapshot

`design-library/lotteryplus/figma-snapshot.json` is the verification baseline and the Phase 2
rename rollback reference. Refresh it whenever Figma changes, by running this through
`figma_execute` on the figma-console MCP bridge and saving the result into the file's
`colors` object:

```js
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const sem = cols.find(c => c.name === '2-semantic');
const vars = await figma.variables.getLocalVariablesAsync();
const byId = {}; vars.forEach(v => byId[v.id] = v);
const toHex = (c) => { const h=(n)=>Math.round(n*255).toString(16).padStart(2,'0');
  let s='#'+h(c.r)+h(c.g)+h(c.b); if(c.a!==undefined&&c.a<1)s+=h(c.a); return s.toUpperCase(); };
function deep(v, modeId, d) {
  if (d > 10) return null;
  const val = v.valuesByMode[modeId] ?? Object.values(v.valuesByMode)[0];
  if (val && val.type === 'VARIABLE_ALIAS') {
    const t = byId[val.id]; if (!t) return null;
    const tc = cols.find(c => c.id === t.variableCollectionId);
    return deep(t, tc.defaultModeId, d + 1);
  }
  return val;
}
const out = {};
for (const v of vars) {
  if (v.variableCollectionId !== sem.id || v.resolvedType !== 'COLOR') continue;
  if (!v.name.startsWith('colors/')) continue;
  const val = deep(v, sem.defaultModeId, 0);
  if (val && typeof val === 'object' && 'r' in val) out[v.name] = toHex(val);
}
return { count: Object.keys(out).length, colors: out };
```

## Rules

1. **Never hand-edit `tokens.css`, `tokens.generated.ts`, or `components.json`.** They are
   generated; an edit is lost on the next run and creates exactly the drift this pipeline
   exists to remove. Edit `design.md`, `components.figma.json`, or a
   `components/<name>.json` overlay instead.
2. **Never invent a value in `design.md`.** Author it in Figma, re-pull, then mirror it.
3. **Run `verify-tokens.py` before committing** any change to `design.md` or Figma.
4. **A new hue** gets adopted from Figma's primitive collection — 16 unreferenced Tailwind
   hues already live there — never by pasting a hex.
5. **No literal colours in component code.** A component reads its Tier 2 token through the
   `component()` helper in `UI Library/foundations/tokens.ts`; stories read the resolved
   literal from the same source, so a verification table cannot claim a value the component
   does not render.

## Adding a component

1. Add the Figma group to `components.figma.json` (or re-pull the whole mirror).
2. Add an entry to `META` in `gen-components.py` — responsibility, level, scope, prefix.
3. Author `design-library/lotteryplus/components/<name>.json` for layout and typography.
4. `python3 tools/gen-components.py && python3 tools/gen-tokens.py`
5. Point the component's `tokens.ts` at `component('<prefix>')` and render with the vars.

Two exceptions are worth knowing about.

**Tooltip** — Figma has no `colors/tooltip` group, so its colour tokens are authored in the
overlay against the semantic layer rather than mirrored. `figma_group: None` in `META` is
what keeps the entry alive through a group-driven generator.

**top-and-footer** — one Figma colour group backs three components: Header, Footer and
ActionBar. `META["top-and-footer"]["storybook"]` is therefore a list, and every layout token
in the overlay is namespaced under the shared `topfoot` prefix (`header-*`, `footer-*`,
`action-*`). The group was not split to match: the three share a prefix because Figma names
them as one group, and renaming that group is a Phase 2 decision about Figma, not about the
library. ActionBar goes further — it has no Figma component set at all, only a frame drawn
inside the page template plus 17 Frontend call sites. It is the only component here built on
Frontend evidence rather than a Figma component, and `patterns.json` records why.

## Verification

Three files carry the evidence, and all three are generated:

| file | written by | holds |
|---|---|---|
| `verification-result.json` | `verify-tokens.py` | tokens.css vs the Figma colour snapshot, with the pull date |
| `component-verification.json` | `collect-verification.py` | every overlay's `_verified_from` — node id, date, scope, corrections, open gaps |
| `tokens.generated.ts` | `gen-tokens.py` | resolved literals, plus `TOKEN_VALUES_DESKTOP` and `TOKEN_VALUES_ALPHA` |

`System / Verification Report` renders those verbatim and adds one live check of its own:
it reads every token back out of the document with `getComputedStyle` and compares it
against the generated literal. Two independent sources, so a row can genuinely turn red.

Two things that check has to know, or it reports mismatches that are not mismatches:

- **Typography is responsive.** A component token aliasing a responsive role is responsive
  too, so `TOKEN_VALUES_DESKTOP` covers Tier 2 as well as `--sys-*`, and the story picks a
  side from the viewport width.
- **Alpha refs are `color-mix()` in CSS and a flattened hex in the literal.** Same colour,
  never the same string. `TOKEN_VALUES_ALPHA` names them so the comparison skips them
  instead of calling them drift.

`check.sh` regenerates all three and fails if the committed copies differ, so what
Storybook shows cannot fall behind what the tools found. It also fails if any overlay has
no `_verified_from` — a component nobody has checked is the one the report most needs to
surface.

## Brand assets

`UI Library/assets/` is served by Storybook via `staticDirs` in `.storybook/main.ts`. The
phoenix watermark and the flat wordmark live in `assets/brand/` because Header renders them.
They are copies, not references: reading them out of `lotteryplus-frontend-main/public`
would make every Header story depend on the Frontend being checked out beside this repo.

## Importing logos and graphics

The `logos-and-graphics` page holds 107 marks — bank and social logos, and the `gp-*`
illustrations. They are not icons: 70 of them carry unbound multi-colour fills (229
distinct colours across the page), several are third-party brand marks, and none may be
recoloured. Putting them in `icon-data.ts` would hand every caller a `color` prop that
tints a bank's logo, so they live in `UI Library/assets/logos/` and are served as files.

Format is decided by measurement, not preference. Export the SVG; if it is 20KB or under
the artwork is flat enough for SVG to win, and if it is over, a 3x PNG is between 6 and 16
times smaller — `gp-jidrit-search` is 412KB as SVG and 26KB as a PNG.

Run this in `figma_execute`, adjust `FROM`, and feed the saved result to the importer:

```js
await figma.loadAllPagesAsync();
const page = figma.root.children.find(p => p.name.indexOf('logos-and-graphics') >= 0);
const comps = page.findAllWithCriteria({types: ['COMPONENT']})
  .filter(c => !(c.parent && c.parent.type === 'COMPONENT_SET') && Math.round(c.width) === 80);
const FROM = 0, COUNT = 14;
const out = [];
for (const n of comps.slice(FROM, FROM + COUNT)) {
  const svg = await n.exportAsync({format: 'SVG'});
  let useSvg = svg.length <= 20480, bytes = svg, kind = 'svg';
  if (!useSvg) {
    const png = await n.exportAsync({format: 'PNG', constraint: {type: 'SCALE', value: 3}});
    if (png.length < svg.length) { bytes = png; kind = 'png'; }
  }
  let s = ''; const CH = 8192;
  for (let i = 0; i < bytes.length; i += CH) s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
  out.push({name: n.name, kind, bytes: bytes.length, data: kind === 'png' ? btoa(s) : s});
}
return {count: out.length, items: out};
```

```bash
python3 tools/import-figma-logos.py <saved-result.txt>
```

`noti-error` and `Card` are on the same page but are neither 80x80 nor marks — they are a
notification illustration set and a card graphic, and they need their own decision before
anything imports them.
