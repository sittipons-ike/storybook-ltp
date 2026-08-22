#!/usr/bin/env python3
"""Collect every component's `_verified_from` record into one file.

The Verification Report story used to state its own numbers — "100%", "0 mismatches" —
with nothing behind them. This gathers what each overlay actually records: which Figma
node was read, when, how far, what came back, and what had to be corrected. The story
renders that verbatim, so it can only claim what the overlays claim.

An overlay with no `_verified_from` is reported as unverified rather than skipped: a
component nobody has checked is the thing the report most needs to show.

Usage:
    python3 tools/collect-verification.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
OVERLAYS = REPO / "design-library" / "lotteryplus" / "components"
OUT = REPO / "design-library" / "lotteryplus" / "component-verification.json"


def strip_private(d: dict | None) -> dict:
    return {k: v for k, v in (d or {}).items() if not k.startswith("_")}


def main() -> int:
    components: dict[str, dict] = {}

    for path in sorted(OVERLAYS.glob("*.json")):
        base = json.loads(path.read_text(encoding="utf-8")).get("base", {})
        record = base.get("_verified_from")

        if not record:
            components[path.stem] = {"verified": False}
            continue

        # Corrections live in one of two places depending on when the overlay was written.
        corrections = record.get("corrections")
        if not isinstance(corrections, dict):
            corrections = base.get("_corrections")

        components[path.stem] = {
            "verified": True,
            "node": record.get("node"),
            "date": record.get("date"),
            "scope": record.get("scope"),
            "result": record.get("result"),
            "corrections": strip_private(corrections if isinstance(corrections, dict) else {}),
            "gaps": strip_private(base.get("_figma_gaps")),
        }

    verified = [c for c in components.values() if c["verified"]]
    payload = {
        "_comment": (
            "Written by tools/collect-verification.py from each components/<name>.json "
            "`base._verified_from`. Do not hand-edit — "
            "ui/foundations/VerificationReport.stories.tsx renders it verbatim."
        ),
        "counts": {
            "overlays": len(components),
            "verified": len(verified),
            "unverified": len(components) - len(verified),
            "corrections": sum(len(c.get("corrections", {})) for c in verified),
            "openGaps": sum(len(c.get("gaps", {})) for c in verified),
        },
        "components": components,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    c = payload["counts"]
    print(f"  overlays    : {c['overlays']}")
    print(f"  verified    : {c['verified']}")
    print(f"  unverified  : {c['unverified']}")
    print(f"  corrections : {c['corrections']}")
    print(f"  open gaps   : {c['openGaps']}")
    return 1 if c["unverified"] else 0


if __name__ == "__main__":
    sys.exit(main())
