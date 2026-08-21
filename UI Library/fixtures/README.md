# Fixtures

Real data for the page tier, in the Frontend's own shapes.

## Why this exists

A page in this library takes its data as props and never fetches. That is what makes it
the designer's copy of the product: every state — empty, loading, error, full — is one
story away, where the real app can only show whichever state its data happens to be in.

The data has to be real for that to be worth anything, so these shapes are lifted from
`lotteryplus-frontend-main/src/types` and the values from `src/mock/data`, which is what
the Frontend's own MSW handlers serve. Nothing here is invented.

## The rule

    comes from an API   → fixtures/          (this folder)
    used by many pages  → UI Library/assets/
    used by one page    → that page's own assets/

A banner is data, not artwork: the Frontend fetches `{ images: [{ url, type }] }` from
`ads-banner` and `banner-schedulers`, and the picture changes weekly on a schedule. So a
banner's URL lives in a fixture. The *frame* it sits in is a component.

## When this moves into the product repo

Swap the fixture for the API call. Nothing else changes, because the page never knew
where its props came from — which is the whole point of the arrangement.

## Types are copied, not imported

`@/types/...` would tie this repo to a checkout of the Frontend. The shapes are copied
into `types.ts` with the source file named on each one, so a drift is visible in a diff
rather than hidden behind a path alias.
