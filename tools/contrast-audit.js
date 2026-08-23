/**
 * Walk a rendered page and report every text run that fails WCAG AA contrast.
 *
 * This exists because three contrast failures shipped on the mission screens and none of
 * them was visible to the person who wrote them: the colours all came from `--sys-*`
 * tokens, and a token says a colour is in the system — never that a given PAIR can be
 * read. Contrast is a property of the pair.
 *
 * Usage, until it runs in CI: open a story's iframe, paste this into the console.
 *
 *   http://localhost:6006/iframe.html?id=<story-id>&viewMode=story
 *
 * It reports one row per failing text run: what it says, its size, the two colours, the
 * ratio it got and the ratio it owed. Zero rows is the pass.
 *
 * Thresholds are WCAG 2.1 1.4.3: 4.5:1 for body text, 3:1 once text is 24px, or 18.66px
 * at 700 weight. Disabled controls are exempt (1.4.3 covers them explicitly) and are
 * skipped — which is not permission for them to be illegible.
 *
 * What it does NOT check, and still needs a human: icons and meaningful graphics (1.4.11,
 * 3:1 — a progress mark, a status dot, a tick on a coloured disc), and text sitting on a
 * photograph, where the background is not one colour.
 */
(() => {
  const relLum = (r, g, b) => {
    const f = (x) => {
      x /= 255;
      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const channels = (css) => (css.match(/[\d.]+/g) || [0, 0, 0, 1]).slice(0, 4).map(Number);
  const ratio = (fg, bg) => {
    const a = relLum(...channels(fg));
    const b = relLum(...channels(bg));
    const [hi, lo] = a > b ? [a, b] : [b, a];
    return (hi + 0.05) / (lo + 0.05);
  };

  // The nearest ancestor that actually paints. A transparent parent is not the background:
  // the tab strip read 4.44 instead of 4.64 because it inherited the page behind it.
  const backdrop = (el) => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const c = getComputedStyle(n).backgroundColor;
      const alpha = channels(c)[3];
      if (alpha === undefined || alpha > 0.5) return c;
    }
    return 'rgb(255, 255, 255)';
  };

  const failures = [];
  for (const el of document.querySelectorAll('*')) {
    // Only elements holding their own text — otherwise every wrapper reports its child's.
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
      .map((n) => n.textContent.trim())
      .join(' ');
    if (!text) continue;
    if (el.disabled || el.closest('button')?.disabled) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.1) continue;

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3 : 4.5;
    const got = ratio(cs.color, backdrop(el));
    if (got < need) {
      failures.push({
        text: text.slice(0, 32),
        size,
        weight,
        foreground: cs.color,
        background: backdrop(el),
        ratio: +got.toFixed(2),
        needs: need,
      });
    }
  }

  if (failures.length === 0) console.log('contrast: no failures');
  else console.table(failures);
  return failures.length;
})();
