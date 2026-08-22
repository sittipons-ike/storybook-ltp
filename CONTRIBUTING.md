# Contributing

Everything below exists because it was learned the expensive way. Each rule names the
mistake it prevents, so you can judge whether it still applies rather than obeying it.

## The one idea

**Figma is the authority for values. When Figma has no answer, the Frontend is. Nothing
is invented.** Every value in this repo can be traced to a Figma node id or a Frontend
file — and if it cannot, that is a bug regardless of how right it looks.

## Before you push

```bash
npm run check
```

Ten checks. CI runs the same command on every pull request, so a red gate locally is a
red pull request. They are not style preferences:

| Check | What it caught |
|---|---|
| Generated files are up to date | eight commits that referenced an icon registry left behind |
| tokens.css matches Figma | — |
| No literal colours in component code | — |
| Every component has a verification record | components nobody had actually compared |
| Icons resolve to the icon set | `outline-search` when the set spells it `outline-Search` |
| **Icons match the ones Figma draws** | a wallet where Figma draws a bird; a bell where it draws a hamburger |
| No forbidden naming patterns | — |
| **Typography binds a role or names itself as debt** | lottery digits at 24/32/700 that no layer and no role carried |
| **Pages compose, they do not reach for tokens** | a page that knew what `--sys-elevation-card` was called |
| TypeScript | — |

## Adding or changing a component

1. **Read the Figma node in full** — the whole tree, not the first thirty lines. A header
   card lost its stepper, its dashed rule and its three counters because the file was 60
   lines and only 30 were read.
2. **Check `visible` on fills, strokes and every ancestor.** A back arrow grew a border it
   never had because `strokeWeight: 1` was read without `strokes[0].visible: false`. A
   bottom sheet appeared to carry two icons whose wrapper was hidden.
3. **Record `_verified_from`** in the overlay: node id, date, what you looked at, what you
   found. `check.sh` fails without it.
4. **Record `_figma_icons`** if the component draws any. The gate holds the source to
   exactly that set — an extra icon fails as loudly as a missing one, because an extra is
   one nobody compared.
5. **Bind typography to a role**, or list the literal by name under `_unmigrated_type`
   with the reason no role fits.

### When Figma disagrees with the Frontend

Figma wins, and you record the disagreement rather than quietly picking a side. `/profile`
was built from the Frontend alone and came out with a white card where Figma has a red
block holding two, plus a 146px header Figma does not draw at all.

### When Figma has nothing

Build from the Frontend and say so in `_verified_from` — `result: "VERIFIED ABSENT"` plus
what you searched. **Search the canvas, not the token mirror.** The mirror holds colour
groups; a frame that declares no colour group of its own can never appear there, which is
how `title-with-underline` was recorded as absent while sitting on the carts page.

## Pages

A page composes components. It may not name a token — not `sys(...)`, not `var(--sys-*)`,
not a hex. Thirty components can each hold a token; seventy-eight pages cannot, and a
rename has to find every one of them.

When you need spacing or a surface, that is what `Stack`, `Surface`, `Text` and
`DeviceFrame` are for. If something is missing, add it there rather than reaching past it —
`Text`, `Badge` and `StatusBar` all exist because this rule pushed back.

Every page carries `_frontend_route` naming the route it stands for.

## Working with Thai

- **Never let a clip box equal a bare line box.** Thai ink runs about 5px below the
  baseline at 16px, and a 24px line leaves roughly one. `ตู้` rendered as `ต้` on one
  machine and correctly on another for exactly that reason. Pad the box and hand the
  space back with a negative margin.
- **Screenshots lie about 1px marks.** A downscaled capture drops them. Measure instead:
  `document.fonts.check`, canvas ink extents, `actualBoundingBoxDescent`.

## Images

Proportions belong to the file. Do not declare `aspectRatio` over a bitmap — the banners
were stretched 16% because a Frontend `width={416} height={96}` was read as the artwork's
shape when it was the box being reserved. Check with `sips -g pixelWidth -g pixelHeight`.

## Naming

Per the Lark Standard (*Structure - Design system*):

- `.` separates **levels** — `{semantic.colors.text.on-primary}`
- `-` separates **words inside one level** — `on-primary`, `border-width`
- Figma's `/` is the same thing as `.`, in Figma's own grouping syntax

States: `rest · hover · active · focus · disabled · selected · error`.
Properties are spelled out: `background`, never `bg`.

Two deliberate deviations, both recorded: button variants were renamed to match what they
draw (`outline` has the stroke, `ghost` does not) ahead of Figma — see
`design-library/lotteryplus/phase3-vocabulary.md`; and refs carry a `design.` prefix the
Standard does not ask for.

## Where things are

```
design-library/lotteryplus/    the source of truth — design.md, overlays, inventories
tools/                          generators and the ten checks
ui/foundations/         generated; never edit by hand
ui/components/          30 components
ui/patterns/            AppShell, Stack, Surface, DeviceFrame, BareScreen
ui/pages/               the page tier
ui/fixtures/            real data, in the Frontend's shapes
MEMORY.md                       every mistake, its root cause, and what to do instead
spec.md                         where the project is and what is next
```

Read `MEMORY.md` before a big change. It is not a changelog — it is the list of traps.
