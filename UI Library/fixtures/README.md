# Fixtures

Real data for the page tier, in the Frontend's own shapes.

## Why this exists

A page in this library takes its data as props and never fetches. That is what makes it
the designer's copy of the product: every state — empty, full, edge — is one story away,
where the real app can only show whichever state its data happens to be in.

The values are real: taken from `lotteryplus-frontend-main/src/mock/data`, which is what
the Frontend's own MSW handlers serve. A 13-digit nok-cash balance is in there because a
balance that long is what finds a card that assumed four.

## The rule

    designer swaps it to see a state   → fixtures/          (this folder)
    part of the design, many pages     → UI Library/assets/
    part of the design, one page       → that page's own assets/

Nothing here fetches, and the split is not about where data comes from — an earlier
version of this file said "comes from an API", which was the wrong question for a repo
that has no API. The question is whether a designer changes it.

A banner is a fixture: this week's artwork, next week's, or none at all, and each is a
state worth looking at. The little nok-cash card beside the balance is an asset: it is
part of the design and nobody swaps it. Both are `.png` — the file type decides nothing.

## Shapes carry what a page draws

Not what a server sends. The first version copied the Frontend's API envelopes and ended
up with `Profile` at 21 fields for a page that renders 2, and a banner wrapped in
`{ images: [{ url, type: 'WEB' | 'MOBILE' }] }` for a page that shows one picture. That
structure described a transport nobody here uses.

Field names still match the Frontend where they overlap, so moving a page into the product
repo means feeding it real data rather than rewriting it.

## Types are copied, not imported

`@/types/...` would tie this repo to a checkout of the Frontend. The shapes are copied
into `types.ts` with the source file named on each one, so a drift is visible in a diff
rather than hidden behind a path alias.
