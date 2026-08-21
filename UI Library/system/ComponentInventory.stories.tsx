import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import '../foundations/tokens.css';
import { sys } from '../foundations/tokens';
import inventory from '../../design-library/lotteryplus/component-inventory.json';

// ═══════════════════════════════════════════
//  Component Inventory — Figma vs Storybook vs Frontend
//
//  Data comes from design-library/lotteryplus/component-inventory.json. Nothing on this
//  page is typed into the story: `feUsage` is a measured import count, and every
//  `proposed` value is labelled as a proposal until the team records a decision.
// ═══════════════════════════════════════════

const meta: Meta = {
  title: 'System/Component Inventory',
  parameters: { layout: 'padded' },
};
export default meta;

const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Section: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({
  title,
  note,
  children,
}) => (
  <section style={{ marginBottom: 40 }}>
    <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 6px' }}>{title}</h3>
    {note && (
      <p
        style={{
          fontSize: 12,
          lineHeight: 1.6,
          color: sys('color-text-tertiary-default'),
          margin: '0 0 14px',
          maxWidth: 760,
        }}
      >
        {note}
      </p>
    )}
    {children}
  </section>
);

const Tick: React.FC<{ on: boolean | null }> = ({ on }) =>
  on === null ? (
    <span style={{ color: sys('color-text-state-light-gray') }}>—</span>
  ) : on ? (
    <span style={{ color: sys('color-status-success-dark') }}>●</span>
  ) : (
    <span style={{ color: sys('color-text-state-light-gray') }}>○</span>
  );

/** Usage count rendered as a bar, so the shape of the distribution is visible at a glance. */
const Usage: React.FC<{ n: number | null; max: number }> = ({ n, max }) => {
  if (n === null) return <span style={{ color: sys('color-text-state-light-gray') }}>n/a</span>;
  const pct = max > 0 ? Math.max(2, (n / max) * 100) : 0;
  const weak = n < 2;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <span style={{ fontFamily: mono, fontSize: 11, minWidth: 26, textAlign: 'right' }}>{n}</span>
      <span
        style={{
          flex: 1,
          height: 6,
          borderRadius: sys('radius-full'),
          background: sys('color-background-light'),
          overflow: 'hidden',
          maxWidth: 120,
        }}
      >
        <span
          style={{
            display: 'block',
            width: `${pct}%`,
            height: '100%',
            background: weak ? sys('color-status-warning-default') : sys('color-primary-default'),
          }}
        />
      </span>
    </span>
  );
};

const Pill: React.FC<{ children: React.ReactNode; tone?: 'neutral' | 'warn' | 'mute' }> = ({
  children,
  tone = 'neutral',
}) => {
  const bg =
    tone === 'warn'
      ? sys('color-status-warning-soft-light')
      : tone === 'mute'
      ? sys('color-background-light')
      : sys('color-status-info-soft-light');
  const fg =
    tone === 'warn'
      ? sys('color-status-warning-dark')
      : tone === 'mute'
      ? sys('color-text-tertiary-default')
      : sys('color-status-info-dark');
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '1px 7px',
        borderRadius: sys('radius-sm'),
        background: bg,
        color: fg,
        fontSize: 10,
        fontFamily: mono,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
};

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '7px 10px',
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: sys('color-text-tertiary-default'),
  borderBottom: `${sys('border-width-thin')} solid ${sys('color-border-accent-gray-soft-light')}`,
  whiteSpace: 'nowrap',
};

const td: React.CSSProperties = {
  padding: '7px 10px',
  fontSize: 12,
  borderBottom: `${sys('border-width-hairline')} solid ${sys('color-background-light')}`,
  verticalAlign: 'top',
};

type Row = {
  name: string;
  figma?: boolean;
  storybook?: boolean;
  feUsage: number | null;
  figmaTokens?: number;
  note?: string;
  why?: string;
  proposed?: { level: string; scope: string };
  decision?: unknown;
};

const Table: React.FC<{ rows: Row[]; max: number; showSources?: boolean }> = ({
  rows,
  max,
  showSources = true,
}) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
      <thead>
        <tr>
          <th style={th}>Component</th>
          {showSources && (
            <>
              <th style={{ ...th, textAlign: 'center' }}>Figma</th>
              <th style={{ ...th, textAlign: 'center' }}>Storybook</th>
            </>
          )}
          <th style={th}>Frontend usage</th>
          <th style={th}>Proposed</th>
          <th style={th}>Decision</th>
          <th style={{ ...th, width: '38%' }}>Note</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td style={{ ...td, fontFamily: mono, fontSize: 11 }}>{r.name}</td>
            {showSources && (
              <>
                <td style={{ ...td, textAlign: 'center' }}>
                  <Tick on={r.figma ?? false} />
                </td>
                <td style={{ ...td, textAlign: 'center' }}>
                  <Tick on={r.storybook ?? false} />
                </td>
              </>
            )}
            <td style={{ ...td, minWidth: 170 }}>
              <Usage n={r.feUsage} max={max} />
            </td>
            <td style={td}>
              {r.proposed ? (
                <span style={{ display: 'inline-flex', gap: 4 }}>
                  <Pill tone={r.proposed.level === 'not-a-component' ? 'mute' : 'neutral'}>
                    {r.proposed.level}
                  </Pill>
                  <Pill tone="mute">{r.proposed.scope}</Pill>
                </span>
              ) : (
                <span style={{ color: sys('color-text-state-light-gray') }}>—</span>
              )}
            </td>
            <td style={td}>
              {r.decision ? (
                <Pill>{String(r.decision)}</Pill>
              ) : (
                <Pill tone="warn">open</Pill>
              )}
            </td>
            <td style={{ ...td, color: sys('color-text-tertiary-default'), lineHeight: 1.5 }}>
              {r.why || r.note || ''}
              {r.figmaTokens !== undefined && (
                <span style={{ fontFamily: mono, fontSize: 10 }}>
                  {r.why || r.note ? ' ' : ''}({r.figmaTokens} Figma tokens)
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const FullInventory: StoryObj = {
  name: 'Figma vs Storybook vs Frontend',
  render: () => {
    const inv = inventory as any;
    const aligned: Row[] = inv.aligned.items;
    const missing: Row[] = inv.missing_from_storybook.items;
    const strong: Row[] = inv.frontend_only.strong_candidates;
    const weak: Row[] = inv.frontend_only.weak_candidates;
    const product: Row[] = inv.frontend_only.product_specific;
    const dead: Row[] = inv.frontend_only.dead_code;

    const all = [...aligned, ...missing, ...strong, ...weak, ...product, ...dead];
    const max = Math.max(...all.map((r) => r.feUsage ?? 0));

    const gaps = missing.filter((r) => r.proposed?.level !== 'not-a-component' && r.proposed?.level !== 'pattern');
    const surfaces = missing.filter((r) => r.proposed?.level === 'not-a-component' || r.proposed?.level === 'pattern');

    const stat = (n: number | string, label: string, tone?: string) => (
      <div
        style={{
          padding: '14px 18px',
          borderRadius: sys('radius-lg'),
          background: sys('color-background-soft-light'),
          border: `${sys('border-width-hairline')} solid ${sys('color-border-accent-gray-soft-light')}`,
          minWidth: 128,
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: tone || sys('color-text-secondary-default') }}>
          {n}
        </div>
        <div style={{ fontSize: 11, color: sys('color-text-tertiary-default'), marginTop: 2 }}>{label}</div>
      </div>
    );

    return (
      <div
        style={{
          fontFamily: sys('type-body-md-regular-family'),
          color: sys('color-text-secondary-default'),
          maxWidth: 1100,
        }}
      >
        <h2 style={{ fontSize: 22, margin: '0 0 8px' }}>Component inventory</h2>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: sys('color-text-tertiary-default'), maxWidth: 760 }}>
          What exists where, so the team can decide what the design system should contain before
          anyone builds more of it. <strong>Frontend usage</strong> is a measured import count —
          the Standard's rule for promoting something to shared is two real usages, and an amber
          bar marks anything below that. Every <strong>Proposed</strong> value is a
          recommendation from the audit; the <strong>Decision</strong> column is what the team
          agreed, and every row is still open.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '22px 0 34px' }}>
          {stat(aligned.length, 'aligned across all three', sys('color-status-success-dark'))}
          {stat(gaps.length, 'gaps in the library', sys('color-primary-default'))}
          {stat(surfaces.length, 'app surfaces with tokens')}
          {stat(strong.length + weak.length, 'Frontend-only candidates', sys('color-status-warning-dark'))}
          {stat(dead.length, 'unused in the Frontend')}
        </div>

        <Section
          title="Aligned — the working core"
          note={inv.aligned._note}
        >
          <Table rows={aligned} max={max} />
        </Section>

        <Section
          title="In Figma, missing from Storybook"
          note={inv.missing_from_storybook._note}
        >
          <Table rows={missing} max={max} />
        </Section>

        <Section
          title="Frontend-only — strong candidates"
          note={inv.frontend_only._note}
        >
          <Table rows={strong} max={max} showSources={false} />
        </Section>

        <Section title="Frontend-only — weak candidates" note="One usage each. Low usage is not proof that something does not belong — countdown-timer is central to the reservation flow in the PRD — but it does mean the case has to be argued rather than counted.">
          <Table rows={weak} max={max} showSources={false} />
        </Section>

        <Section title="Frontend-only — product specific" note="Clearly Lotteryplus-specific. If any of these enter the library they belong at project or feature scope, in projects/lotteryplus/, not global/.">
          <Table rows={product} max={max} showSources={false} />
        </Section>

        <Section title="Unused in the Frontend" note="Imported by nothing. `lotteries` is 13 files that no page references.">
          <Table rows={dead} max={max} showSources={false} />
        </Section>

        <Section
          title="Duplicates to resolve"
          note={inv.duplicates_to_resolve._note}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={th}>Frontend components</th>
                  <th style={th}>Usage</th>
                  <th style={th}>Design system models</th>
                  <th style={{ ...th, width: '45%' }}>Note</th>
                </tr>
              </thead>
              <tbody>
                {inv.duplicates_to_resolve.items.map((d: any) => (
                  <tr key={d.pair.join('+')}>
                    <td style={{ ...td, fontFamily: mono, fontSize: 11 }}>{d.pair.join('  vs  ')}</td>
                    <td style={{ ...td, fontFamily: mono, fontSize: 11 }}>{d.usage.join(' / ')}</td>
                    <td style={td}>
                      {d.in_ds ? <Pill>{d.in_ds}</Pill> : <Pill tone="warn">nothing</Pill>}
                    </td>
                    <td style={{ ...td, color: sys('color-text-tertiary-default'), lineHeight: 1.5 }}>
                      {d.note || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Questions for the team" note="Each of these blocks work that would otherwise be guesswork.">
          <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8, maxWidth: 820 }}>
            {inv.questions_for_the_team.map((q: string) => (
              <li key={q} style={{ marginBottom: 8 }}>
                {q}
              </li>
            ))}
          </ol>
        </Section>

        <p
          style={{
            fontSize: 11,
            color: sys('color-text-state-light-gray'),
            borderTop: `${sys('border-width-hairline')} solid ${sys('color-background-light')}`,
            paddingTop: 12,
          }}
        >
          Source: {inv.$meta.sources.figma} · {inv.$meta.sources.storybook} ·{' '}
          {inv.$meta.sources.frontend} — generated {inv.$meta.generated}
        </p>
      </div>
    );
  },
};
