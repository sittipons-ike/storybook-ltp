import React from 'react';

// ═══════════════════════════════════════════
// Shared Color Bindings Table
// ใช้ร่วมกันในทุก component stories
// ═══════════════════════════════════════════

export interface ColorBinding {
  token: string;
  figmaVariable: string;
  hex: string;
  usage: string;
}

const Swatch: React.FC<{ hex: string }> = ({ hex }) => (
  <span
    style={{
      display: 'inline-block',
      width: 24,
      height: 24,
      backgroundColor: hex,
      borderRadius: 4,
      border: '1px solid rgba(0,0,0,0.15)',
      verticalAlign: 'middle',
    }}
  />
);

const ColorBindingsTable: React.FC<{
  componentName: string;
  figmaId?: string;
  bindings: ColorBinding[];
}> = ({ componentName, figmaId, bindings }) => (
  <div style={{ padding: 24, maxWidth: 800, fontFamily: "'Graphik TH', sans-serif" }}>
    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
      {componentName} — Color Bindings
    </h3>
    <p style={{ fontSize: 12, color: '#737373', marginBottom: 4 }}>
      สีทั้งหมดที่ component นี้ผูกไว้กับ Figma Variables
    </p>
    {figmaId && (
      <p style={{ fontSize: 11, color: '#999', marginBottom: 16 }}>
        Figma: {figmaId}
      </p>
    )}
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #E5E5E5' }}>
          {['', 'Hex', 'Token', 'Figma Variable', 'Usage'].map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 600, fontSize: 11 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bindings.map((b, i) => (
          <tr key={i} style={{ borderBottom: '1px solid #F0F0F0' }}>
            <td style={{ padding: '6px 8px' }}><Swatch hex={b.hex} /></td>
            <td style={{ padding: '6px 8px', fontFamily: 'monospace', fontSize: 12, color: '#22C55E' }}>{b.hex}</td>
            <td style={{ padding: '6px 8px', fontFamily: 'monospace', fontSize: 11, color: '#E32321' }}>{b.token}</td>
            <td style={{ padding: '6px 8px', fontFamily: 'monospace', fontSize: 10, color: '#8B8BF5' }}>{b.figmaVariable}</td>
            <td style={{ padding: '6px 8px', color: '#737373', fontSize: 12 }}>{b.usage}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div style={{ marginTop: 12, fontSize: 11, color: '#999' }}>
      {bindings.length} color binding{bindings.length !== 1 ? 's' : ''}
    </div>
  </div>
);

export default ColorBindingsTable;
