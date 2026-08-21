import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { sys, TOKEN_VALUES } from './tokens';
import { TOKEN_VALUES_DESKTOP, TOKEN_VALUES_ALPHA } from './tokens.generated';
import './tokens.css';
import tokenResult from '../../design-library/lotteryplus/verification-result.json';
import componentResult from '../../design-library/lotteryplus/component-verification.json';

// ═══════════════════════════════════════════
//  Verification Report
//
//  This page reports; it does not assert. Everything below comes from one of three
//  places, and every one of them can come back bad:
//
//    1. getComputedStyle in this document, against tokens.generated.ts
//    2. verification-result.json      — written by tools/verify-tokens.py
//    3. component-verification.json   — written by tools/collect-verification.py
//
//  The previous version of this file claimed a live Figma connection and a 100% pass
//  rate. It had no fetch, no comparison, and both numbers were literals. Nothing here is
//  typed by hand: if a token drifts, a row below turns red on its own.
// ═══════════════════════════════════════════

const meta: Meta = {
  title: 'System/Verification Report',
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const ok = () => sys('color-status-success-default');
const bad = () => sys('color-status-error-default');
const muted = () => sys('color-text-tertiary-default');

const Stat: React.FC<{ label: string; value: React.ReactNode; tone?: 'ok' | 'bad' | 'plain' }> = ({
  label,
  value,
  tone = 'plain',
}) => (
  <div
    style={{
      padding: '12px 20px',
      background: sys('color-background-default'),
      border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
      borderRadius: sys('radius-lg'),
      minWidth: 118,
    }}
  >
    <div
      style={{
        fontSize: 26,
        fontWeight: 700,
        color: tone === 'ok' ? ok() : tone === 'bad' ? bad() : sys('color-text-secondary-default'),
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 11, color: muted() }}>{label}</div>
  </div>
);

const Section: React.FC<{ n: number; title: string; source: string; children: React.ReactNode }> = ({
  n,
  title,
  source,
  children,
}) => (
  <section style={{ marginBottom: 44 }}>
    <h2 style={{ fontSize: 18, margin: '0 0 2px' }}>
      {n}. {title}
    </h2>
    <div style={{ fontSize: 11, fontFamily: mono, color: muted(), marginBottom: 16 }}>{source}</div>
    {children}
  </section>
);

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '7px 12px',
  fontSize: 11,
  fontWeight: 600,
  color: muted(),
  borderBottom: `2px solid ${sys('color-border-accent-gray-soft-light')}`,
};
const td: React.CSSProperties = {
  padding: '6px 12px',
  borderBottom: `1px solid ${sys('color-background-light')}`,
  fontSize: 12,
  verticalAlign: 'top',
};

// ═══════════════════════════════════════════
export const FullReport: StoryObj = {
  name: 'Full Report',
  render: () => {
    const probe = React.useRef<HTMLDivElement>(null);
    const [chain, setChain] = React.useState<{
      checked: number;
      mismatches: [string, string, string][];
      responsive: number;
      skippedAlpha: number;
      desktopMode: boolean;
    } | null>(null);

    // Section 1 runs for real: every token the generator emitted is read back out of this
    // document and compared with what the generator wrote. Two independent sources.
    //
    // Typography is responsive — the generator writes the mobile value to TOKEN_VALUES and
    // the desktop override to TOKEN_VALUES_DESKTOP, and the stylesheet swaps at 768px. The
    // first version of this check compared everything against the mobile map and reported
    // 145 mismatches that were nothing of the kind. Which value is correct depends on the
    // width this page is being read at, so the check asks.
    React.useEffect(() => {
      const el = probe.current;
      if (!el) return;
      const desktopMode = window.matchMedia('(min-width: 768px)').matches;
      const desktop = TOKEN_VALUES_DESKTOP as Record<string, string>;
      // color-mix in CSS, flattened hex in the literal — same colour, different string.
      const alpha = new Set<string>(TOKEN_VALUES_ALPHA);
      const style = getComputedStyle(el);
      const mismatches: [string, string, string][] = [];
      const names = Object.keys(TOKEN_VALUES).filter((n) => !alpha.has(n));
      names.forEach((name) => {
        const computed = style.getPropertyValue(name).trim();
        const expected = String(
          desktopMode && name in desktop ? desktop[name] : (TOKEN_VALUES as Record<string, string>)[name],
        ).trim();
        if (computed !== expected) mismatches.push([name, computed || '(not declared)', expected]);
      });
      setChain({
        checked: names.length,
        mismatches,
        responsive: Object.keys(desktop).length,
        skippedAlpha: alpha.size,
        desktopMode,
      });
    }, []);

    const tr = tokenResult as any;
    const cr = componentResult as any;
    const comps = Object.entries(cr.components as Record<string, any>);
    const withCorrections = comps.filter(([, c]) => c.verified && Object.keys(c.corrections || {}).length);
    const withGaps = comps.filter(([, c]) => c.verified && Object.keys(c.gaps || {}).length);
    const unverified = comps.filter(([, c]) => !c.verified);

    const chainClean = chain && chain.mismatches.length === 0;
    const tokensClean = tr.counts.missing === 0 && tr.counts.drift === 0;
    const allVerified = cr.counts.unverified === 0;
    const everythingClean = chainClean && tokensClean && allVerified;

    return (
      <div ref={probe} style={{ fontFamily: sans, maxWidth: 960 }}>
        <div
          style={{
            padding: '18px 22px',
            borderRadius: sys('radius-xl'),
            border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
            borderLeft: `4px solid ${everythingClean ? ok() : bad()}`,
            background: sys('color-background-soft-light'),
            marginBottom: 34,
          }}
        >
          <h1 style={{ margin: '0 0 4px', fontSize: 22 }}>Verification Report</h1>
          <p style={{ margin: '0 0 16px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-secondary-default'), maxWidth: 640 }}>
            หน้านี้<strong>รายงาน</strong> ไม่ได้<strong>ยืนยัน</strong> — ทุกตัวเลขข้างล่างอ่านมาจากไฟล์ที่เครื่องมือเขียน
            หรือคำนวณสดในเบราว์เซอร์ ไม่มีอันไหนพิมพ์มือ ถ้าค่าไหนเพี้ยน แถวนั้นจะแดงเอง
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Stat label="tokens re-read live" value={chain ? chain.checked : '…'} />
            <Stat
              label="chain mismatches"
              value={chain ? chain.mismatches.length : '…'}
              tone={chain ? (chain.mismatches.length ? 'bad' : 'ok') : 'plain'}
            />
            <Stat label="Figma colours checked" value={tr.counts.figmaColours} />
            <Stat
              label="drift + missing"
              value={tr.counts.drift + tr.counts.missing}
              tone={tokensClean ? 'ok' : 'bad'}
            />
            <Stat
              label="components verified"
              value={`${cr.counts.verified}/${cr.counts.overlays}`}
              tone={allVerified ? 'ok' : 'bad'}
            />
            <Stat label="corrections made" value={cr.counts.corrections} />
            <Stat label="open Figma gaps" value={cr.counts.openGaps} />
          </div>
        </div>

        {/* ── 1 ─────────────────────────────────────── */}
        <Section
          n={1}
          title="Token chain — live"
          source="getComputedStyle in this document  vs  UI Library/foundations/tokens.generated.ts"
        >
          <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.75, color: muted(), maxWidth: 660 }}>
            อ่านค่าที่หน้านี้ resolve จริงทุกตัว แล้วเทียบกับที่ generator เขียนไว้ — คนละแหล่งกัน
            ถ้า token ถูกลบหรือถูก override ที่ไหน แถวจะโผล่ทันที
          </p>
          {chain && (
            <p style={{ margin: '0 0 12px', fontSize: 12.5, lineHeight: 1.75, color: muted(), maxWidth: 660 }}>
              typography เป็น responsive — {chain.responsive} token มีค่า desktop แยก หน้านี้กว้าง{' '}
              <strong>{chain.desktopMode ? '≥768px' : '<768px'}</strong> จึงเทียบกับชุด{' '}
              <code style={{ fontFamily: mono }}>{chain.desktopMode ? 'TOKEN_VALUES_DESKTOP' : 'TOKEN_VALUES'}</code>{' '}
              ย่อ/ขยายหน้าต่างแล้วโหลดใหม่ จะสลับชุดเทียบเอง · ข้าม {chain.skippedAlpha} token ที่ CSS เป็น{' '}
              <code style={{ fontFamily: mono }}>color-mix()</code> แต่ literal เป็น hex — สีเดียวกันแต่คนละสตริง
              เทียบตรงๆ ไม่ได้
            </p>
          )}
          {!chain ? (
            <div style={{ fontSize: 13, color: muted() }}>กำลังอ่าน…</div>
          ) : chain.mismatches.length === 0 ? (
            <div style={{ fontSize: 14, fontWeight: 600, color: ok() }}>
              {chain.checked} tokens — ตรงทั้งหมด
            </div>
          ) : (
            <>
              <div style={{ fontSize: 14, fontWeight: 600, color: bad(), marginBottom: 10 }}>
                {chain.mismatches.length} / {chain.checked} ไม่ตรง
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={th}>Token</th>
                    <th style={th}>Computed here</th>
                    <th style={th}>Generated</th>
                  </tr>
                </thead>
                <tbody>
                  {chain.mismatches.map(([n, c, g]) => (
                    <tr key={n}>
                      <td style={{ ...td, fontFamily: mono, color: bad() }}>{n}</td>
                      <td style={{ ...td, fontFamily: mono }}>{c}</td>
                      <td style={{ ...td, fontFamily: mono, color: muted() }}>{g}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Section>

        {/* ── 2 ─────────────────────────────────────── */}
        <Section
          n={2}
          title="Tokens vs Figma"
          source="design-library/lotteryplus/verification-result.json  ←  tools/verify-tokens.py"
        >
          <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.75, color: muted(), maxWidth: 660 }}>
            <strong>ไม่ได้ต่อ Figma สด</strong> — เบราว์เซอร์ต่อไม่ได้ ตัวเลขนี้มาจาก snapshot ที่ดึงผ่าน Desktop
            Bridge เมื่อ <code style={{ fontFamily: mono }}>{tr.ranAgainst.snapshotPulledAt}</code> แล้ว{' '}
            <code style={{ fontFamily: mono }}>check.sh</code> รันเทียบใหม่ทุกครั้ง ถ้าไม่ตรงคือ build พัง
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 14 }}>
            <tbody>
              {[
                ['Figma file', `${tr.ranAgainst.figmaFile} (${tr.ranAgainst.figmaFileKey})`],
                ['Collection · mode', `${tr.ranAgainst.collection} · ${tr.ranAgainst.mode}`],
                ['Snapshot pulled', tr.ranAgainst.snapshotPulledAt],
                ['Compared against', tr.ranAgainst.css],
                ['Matched', `${tr.counts.matched} / ${tr.counts.figmaColours}`],
                ['Missing', String(tr.counts.missing)],
                ['Drift', String(tr.counts.drift)],
                ['Skipped', String(tr.counts.skipped)],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td style={{ ...td, width: 190, color: muted() }}>{k}</td>
                  <td style={{ ...td, fontFamily: mono }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(tr.drift.length > 0 || tr.missing.length > 0) && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Figma name</th>
                  <th style={th}>CSS var</th>
                  <th style={th}>Figma</th>
                  <th style={th}>CSS</th>
                </tr>
              </thead>
              <tbody>
                {tr.drift.map((d: any) => (
                  <tr key={d.figma}>
                    <td style={{ ...td, fontFamily: mono, color: bad() }}>{d.figma}</td>
                    <td style={{ ...td, fontFamily: mono }}>{d.cssVar}</td>
                    <td style={{ ...td, fontFamily: mono }}>{d.figmaValue}</td>
                    <td style={{ ...td, fontFamily: mono }}>{d.cssValue}</td>
                  </tr>
                ))}
                {tr.missing.map((m: any) => (
                  <tr key={m.figma}>
                    <td style={{ ...td, fontFamily: mono, color: bad() }}>{m.figma}</td>
                    <td style={{ ...td, fontFamily: mono }}>{m.cssVar}</td>
                    <td style={td} colSpan={2}>
                      absent from tokens.css
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>

        {/* ── 3 ─────────────────────────────────────── */}
        <Section
          n={3}
          title="Components vs Figma"
          source="design-library/lotteryplus/component-verification.json  ←  tools/collect-verification.py"
        >
          <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.75, color: muted(), maxWidth: 680 }}>
            แต่ละแถวคือสิ่งที่ overlay ของ component นั้นบันทึกไว้จริง — node id ที่อ่าน, วันที่, ขอบเขต
            component ไหนไม่มีบันทึกจะขึ้น <strong>unverified</strong> และ{' '}
            <code style={{ fontFamily: mono }}>check.sh</code> จะ fail
          </p>
          {unverified.length > 0 && (
            <div style={{ fontSize: 13, fontWeight: 600, color: bad(), marginBottom: 12 }}>
              {unverified.length} unverified: {unverified.map(([n]) => n).join(', ')}
            </div>
          )}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>Component</th>
                <th style={th}>Figma node</th>
                <th style={th}>Checked</th>
                <th style={th}>Fixes</th>
                <th style={th}>Open gaps</th>
              </tr>
            </thead>
            <tbody>
              {comps.map(([name, c]) => (
                <tr key={name}>
                  <td style={{ ...td, fontFamily: mono, color: c.verified ? sys('color-primary-default') : bad() }}>
                    {name}
                  </td>
                  <td style={{ ...td, fontFamily: mono, fontSize: 11, maxWidth: 330 }}>
                    {c.verified ? c.node ?? '— (verified absent)' : 'never checked'}
                  </td>
                  <td style={{ ...td, fontFamily: mono, fontSize: 11 }}>{c.date ?? '—'}</td>
                  <td style={{ ...td, fontFamily: mono, color: Object.keys(c.corrections || {}).length ? bad() : muted() }}>
                    {Object.keys(c.corrections || {}).length || '—'}
                  </td>
                  <td style={{ ...td, fontFamily: mono, color: muted() }}>
                    {Object.keys(c.gaps || {}).length || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* ── 4 ─────────────────────────────────────── */}
        <Section n={4} title="What was wrong, and what Figma still owes" source="same file, expanded">
          <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>
            แก้ไปแล้ว {cr.counts.corrections} จุด
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
            <tbody>
              {withCorrections.map(([name, c]) =>
                Object.entries(c.corrections as Record<string, string>).map(([k, v]) => (
                  <tr key={name + k}>
                    <td style={{ ...td, fontFamily: mono, width: 130, color: sys('color-primary-default') }}>{name}</td>
                    <td style={{ ...td, fontFamily: mono, width: 190, fontSize: 11 }}>{k}</td>
                    <td style={{ ...td, color: sys('color-text-secondary-default'), lineHeight: 1.7 }}>{v}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>

          <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>
            ค้างที่ฝั่ง Figma {cr.counts.openGaps} เรื่อง
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {withGaps.map(([name, c]) =>
                Object.entries(c.gaps as Record<string, string>).map(([k, v]) => (
                  <tr key={name + k}>
                    <td style={{ ...td, fontFamily: mono, width: 130, color: sys('color-status-warning-default') }}>
                      {name}
                    </td>
                    <td style={{ ...td, fontFamily: mono, width: 190, fontSize: 11 }}>{k}</td>
                    <td style={{ ...td, color: sys('color-text-secondary-default'), lineHeight: 1.7 }}>{v}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </Section>

        {/* ── 5 ─────────────────────────────────────── */}
        <Section n={5} title="What this page does not check" source="stated, so the gaps are not mistaken for passes">
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.9, color: sys('color-text-secondary-default'), maxWidth: 720 }}>
            <li>
              <strong>ไม่ได้ต่อ Figma สด</strong> — เทียบกับ snapshot ที่ดึงเมื่อ{' '}
              <code style={{ fontFamily: mono }}>{tr.ranAgainst.snapshotPulledAt}</code> ถ้ามีคนแก้ Figma หลังจากนั้น
              หน้านี้ไม่รู้ ต้องดึง snapshot ใหม่
            </li>
            <li>
              section 2 เช็คเฉพาะ <strong>สี semantic</strong> ({tr.counts.figmaColours} ค่า) — typography, spacing,
              radius ยังไม่มี snapshot ให้เทียบ
            </li>
            <li>
              section 3 บอกว่า<strong>มีใครไปอ่าน Figma มาแล้ว</strong> ไม่ได้พิสูจน์ว่า pixel ตรง — การวัดจริงทำตอน
              audit และบันทึกไว้ในช่อง result
            </li>
            <li>ยังไม่มี visual regression — ไม่มีอะไรจับได้ถ้า layout เพี้ยนโดยที่ token ไม่เปลี่ยน</li>
          </ul>
        </Section>
      </div>
    );
  },
};
