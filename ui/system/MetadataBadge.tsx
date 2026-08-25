import React from 'react';
import { metaFor, type ComponentMeta } from './metadata.generated';

/**
 * The component's contract, shown beside the component.
 *
 * `public` exists to answer one question — may I use this yet — and until now it could
 * only be answered by cloning the repo and opening a JSON file. Nine components are
 * `public: false` and in Storybook they looked identical to the forty that are not. A
 * field nobody can read is not a contract, it is a note to the machine.
 *
 * Deliberately fixed rather than wrapped around the story: a decorator in the layout flow
 * would push every story down and change what a visual review is looking at. This floats
 * in the corner, starts collapsed to one line, and never touches the story's own box.
 */

const shell: React.CSSProperties = {
  position: 'fixed',
  left: 12,
  bottom: 12,
  zIndex: 2147483000,
  fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 11,
  lineHeight: 1.5,
  maxWidth: 'min(420px, calc(100vw - 24px))',
  border: '1px solid var(--sys-color-border-accent-gray-light)',
  borderRadius: 10,
  background: 'var(--sys-color-background-default)',
  boxShadow: '0 6px 20px -8px rgba(0,0,0,.28)',
  overflow: 'hidden',
};

const bar: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 10px',
  cursor: 'pointer',
  border: 0,
  background: 'none',
  width: '100%',
  font: 'inherit',
  color: 'var(--sys-color-text-primary-default)',
  textAlign: 'left',
};

const chip = (tone: 'ok' | 'warn' | 'mute'): React.CSSProperties => ({
  padding: '1px 7px',
  borderRadius: 99,
  whiteSpace: 'nowrap',
  fontWeight: 500,
  color:
    tone === 'ok' ? 'var(--sys-color-status-success-default)'
    : tone === 'warn' ? 'var(--sys-color-primary-default)'
    : 'var(--sys-color-text-tertiary-default)',
  border: `1px solid currentColor`,
});

const row: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '124px 1fr',
  gap: 8,
  padding: '2px 0',
};
const key: React.CSSProperties = { color: 'var(--sys-color-text-tertiary-default)' };
const val: React.CSSProperties = { color: 'var(--sys-color-text-primary-default)', wordBreak: 'break-word' };

/** `[]` and `null` are shown as themselves — §3.7 keeps the heading either way. */
const show = (v: unknown): string => {
  if (v === null || v === undefined) return 'null';
  if (Array.isArray(v)) return v.length ? v.join(' · ') : '[]';
  if (typeof v === 'boolean') return String(v);
  return String(v);
};

const FIELDS: (keyof ComponentMeta)[] = [
  'name', 'type', 'responsibility',
  'composition_level', 'dependencies', 'slots', 'pattern', 'organisms',
  'scope', 'project', 'feature', 'public',
  'folder',
];

const MetadataBadge: React.FC<{ title: string }> = ({ title }) => {
  const meta = metaFor(title);
  const [open, setOpen] = React.useState(false);
  if (!meta) return null;   // documentation pages carry no manifest, and should not

  const usable = meta.public;

  return (
    <aside style={shell} aria-label="metadata ของ component นี้">
      <button type="button" style={bar} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span style={{ color: 'var(--sys-color-text-tertiary-default)' }}>{open ? '▾' : '▸'}</span>
        <span style={chip(usable ? 'ok' : 'warn')}>
          {usable ? 'public ✓ ใช้ได้' : 'public ✗ ยังไม่เปิดให้ใช้'}
        </span>
        <span style={chip('mute')}>{meta.scope}</span>
        {meta.composition_level && <span style={chip('mute')}>{meta.composition_level}</span>}
      </button>

      {open && (
        <div style={{ padding: '4px 10px 10px', borderTop: '1px solid var(--sys-color-background-light)' }}>
          {FIELDS.map((f) => (
            <div key={f} style={row}>
              <span style={key}>{f}</span>
              <span style={val}>{show(meta[f])}</span>
            </div>
          ))}
          <div style={{ ...row, marginTop: 6, color: 'var(--sys-color-text-tertiary-default)' }}>
            <span style={key}>ที่มา</span>
            <span>Lark Standard §3.7 · docs/metadata-handbook.md</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default MetadataBadge;
