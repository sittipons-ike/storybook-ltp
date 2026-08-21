import React from 'react';
import '../foundations/tokens.css';
import { sys } from '../foundations/tokens';

// ═══════════════════════════════════════════
// Shared Color Bindings Table
// ใช้ร่วมกันในทุก component stories
//
// This table is what a designer reads to check a component against Figma, so its own
// chrome uses tokens too — a documentation surface that hardcoded its colours would be
// making the exact mistake it exists to catch.
// ═══════════════════════════════════════════

export interface ColorBinding {
  token: string;
  figmaVariable: string;
  hex: string;
  usage: string;
}

const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Swatch: React.FC<{ hex: string }> = ({ hex }) => (
  <span
    style={{
      display: 'inline-block',
      width: 24,
      height: 24,
      backgroundColor: hex,
      borderRadius: sys('radius-sm'),
      border: `${sys('border-width-hairline')} solid ${sys('color-border-accent-gray-soft-light')}`,
      verticalAlign: 'middle',
    }}
  />
);

const cell: React.CSSProperties = { padding: '6px 8px' };

const ColorBindingsTable: React.FC<{
  componentName: string;
  figmaId?: string;
  bindings: ColorBinding[];
}> = ({ componentName, figmaId, bindings }) => (
  <div
    style={{
      padding: sys('spacing-4xl'),
      maxWidth: 800,
      fontFamily: sys('type-body-md-regular-family'),
      color: sys('color-text-secondary-default'),
    }}
  >
    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
      {componentName} — Color Bindings
    </h3>
    <p style={{ fontSize: 12, color: sys('color-text-tertiary-default'), marginBottom: 4 }}>
      สีทั้งหมดที่ component นี้ผูกไว้กับ Figma Variables
    </p>
    {figmaId && (
      <p style={{ fontSize: 11, color: sys('color-text-state-light-gray'), marginBottom: 16 }}>
        Figma: {figmaId}
      </p>
    )}
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr
          style={{
            borderBottom: `${sys('border-width-thin')} solid ${sys('color-border-accent-gray-soft-light')}`,
          }}
        >
          {['', 'Hex', 'Token', 'Figma Variable', 'Usage'].map((h) => (
            <th key={h} style={{ ...cell, textAlign: 'left', fontWeight: 600, fontSize: 11 }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bindings.map((b, i) => (
          <tr
            key={i}
            style={{
              borderBottom: `${sys('border-width-hairline')} solid ${sys('color-background-light')}`,
            }}
          >
            <td style={cell}>
              <Swatch hex={b.hex} />
            </td>
            <td style={{ ...cell, fontFamily: mono, fontSize: 12, color: sys('color-status-success-default') }}>
              {b.hex}
            </td>
            <td style={{ ...cell, fontFamily: mono, fontSize: 11, color: sys('color-primary-default') }}>
              {b.token}
            </td>
            <td style={{ ...cell, fontFamily: mono, fontSize: 10, color: sys('color-status-info-default') }}>
              {b.figmaVariable}
            </td>
            <td style={{ ...cell, color: sys('color-text-tertiary-default'), fontSize: 12 }}>
              {b.usage}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div style={{ marginTop: 12, fontSize: 11, color: sys('color-text-state-light-gray') }}>
      {bindings.length} color binding{bindings.length !== 1 ? 's' : ''}
    </div>
  </div>
);

export default ColorBindingsTable;
