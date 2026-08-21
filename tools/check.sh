#!/usr/bin/env bash
# Design-system gate. Run before committing; wire into CI for Phase 6 governance.
#
#   bash tools/check.sh
#
# Exits non-zero on the first failure so a broken chain cannot land silently.

set -uo pipefail
cd "$(dirname "$0")/.."

fail=0
step() { printf '\n\033[1m▸ %s\033[0m\n' "$1"; }
bad()  { printf '  \033[31m✗ %s\033[0m\n' "$1"; fail=1; }
ok()   { printf '  \033[32m✓ %s\033[0m\n' "$1"; }

step "Generated files are up to date"
python3 tools/gen-components.py >/dev/null && python3 tools/gen-tokens.py >/dev/null
python3 tools/verify-tokens.py >/dev/null
python3 tools/collect-verification.py >/dev/null
python3 tools/gen-logo-manifest.py >/dev/null
if git diff --quiet -- "UI Library/foundations/tokens.css" \
      "UI Library/foundations/tokens.generated.ts" \
      "design-library/lotteryplus/components.json" \
      "design-library/lotteryplus/verification-result.json" \
      "design-library/lotteryplus/component-verification.json" \
      "UI Library/logos/logos.generated.ts" 2>/dev/null; then
  ok "regenerating changed nothing"
else
  bad "regenerating changed a tracked file — commit the regenerated output"
fi

step "tokens.css matches Figma"
python3 tools/verify-tokens.py | sed 's/^/  /' || bad "token verification failed"

step "No literal colours in component code"
# Scan every source directory, not just components/ — Icon lives in icons/ and went
# unchecked for the whole first pass because this list was too narrow.
hits=$(grep -rnE "#[0-9A-Fa-f]{6}\b" "UI Library/components" "UI Library/icons" "UI Library/system" \
        --include='*.ts' --include='*.tsx' --include='*.css' 2>/dev/null \
        | grep -v '\.stories\.tsx' \
        | grep -v 'icon-data\.ts' || true)
if [ -z "$hits" ]; then
  ok "none found"
else
  bad "literal colours found:"
  printf '%s\n' "$hits" | sed 's/^/      /'
fi

step "Every component has a verification record"
python3 tools/collect-verification.py | sed 's/^/  /' || bad "a component overlay has no _verified_from — nobody has checked it against Figma"

step "Icons resolve to the icon set"
python3 tools/check-icons.py | sed 's/^/  /' || bad "an icon name does not exist in icon-data.ts"

step "Icons match the ones Figma draws"
python3 tools/check-figma-icons.py | sed 's/^/  /' || bad "an icon resolves but is not the one Figma uses"

step "No forbidden naming patterns"
# snake_case tokens and abbreviated CSS properties both violate the Standard.
naming=$(grep -rnE -- "--[a-z-]+-(bg|fg)-|[a-z]+_[a-z]+:" "UI Library/foundations/tokens.css" 2>/dev/null || true)
if [ -z "$naming" ]; then
  ok "none found"
else
  bad "abbreviated or snake_case token names:"
  printf '%s\n' "$naming" | sed 's/^/      /'
fi

step "Typography binds a role or names itself as debt"
python3 tools/check-typography.py | sed 's/^/  /' || bad "a typography literal is neither bound nor recorded — that is how 24/32/700 shipped for digits Figma draws at 20/36/600"

step "Pages compose, they do not reach for tokens"
python3 tools/check-pages.py | sed 's/^/  /' || bad "a page reads a token directly — that is what the rename has to find later"

step "Static assets resolve against the base path"
# Fonts, logos and brand marks are served as plain files out of `staticDirs`. Nothing
# rewrites their URLs, so a path written from the domain root works on localhost and 404s
# under GitHub Pages' /<repo>/ — which is exactly what shipped: every font and all 112
# logos were broken in production while the local Storybook looked perfect. `asset()`
# resolves against import.meta.env.BASE_URL; this refuses any path that skips it.
asset_hits=$(grep -rnoE "['\"\`(]/(fonts|logos|brand|assets|images|img)/[^'\"\`)]*" \
        "UI Library" .storybook \
        --include='*.ts' --include='*.tsx' --include='*.css' 2>/dev/null \
        | grep -v 'foundations/asset.ts' \
        | grep -v '\.storybook/fonts.ts' \
        | grep -v 'node_modules' || true)
if [ -z "$asset_hits" ]; then
  ok "every static asset path goes through asset()"
else
  bad "asset path written from the domain root — wrap it in asset() from foundations/asset:"
  printf '%s\n' "$asset_hits" | sed 's/^/      /'
fi

step "TypeScript"
tsc_out=$(npx tsc --noEmit -p tsconfig.json 2>&1 || true)
unexpected=$(printf '%s\n' "$tsc_out" | grep -E "error TS" || true)
if [ -z "$unexpected" ]; then
  ok "clean"
else
  bad "type errors:"
  printf '%s\n' "$unexpected" | sed 's/^/      /'
fi

echo
if [ "$fail" -eq 0 ]; then
  printf '\033[32mAll checks passed.\033[0m\n'
else
  printf '\033[31mChecks failed.\033[0m\n'
fi
exit "$fail"
