import React from 'react';
import HomeRedBlock from './HomeRedBlock';

/**
 * The bits every story on this page repeats.
 *
 * Not a component of the design — a story-only helper, which is why it carries no Figma
 * node and draws nothing the page draws. It lives beside the components rather than in
 * each story file so the thirteen of them do not each keep their own copy of a caption.
 */
export const sans = "'Graphik TH', sans-serif";
export const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** A label above a specimen: what it is, and the Figma node it was measured from. */
export const Spec: React.FC<{
  title: string;
  node: string;
  size?: string;
  children: React.ReactNode;
  /** Several components only make sense on the section's red ground. */
  onRed?: boolean;
  /** Constrain to the phone width Figma drew at. */
  width?: number;
}> = ({ title, node, size, children, onRed = false, width = 390 }) => (
  <div style={{ fontFamily: sans }}>
    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{title}</div>
    <div style={{ fontFamily: mono, fontSize: 11, opacity: 0.6, marginBottom: 8 }}>
      {node}
      {size ? ` · ${size}` : ''}
    </div>
    <div style={{ width, overflow: 'hidden' }}>
      {onRed ? <HomeRedBlock flat>{children}</HomeRedBlock> : children}
    </div>
  </div>
);

/** Specimens side by side, wrapping on a narrow screen. */
export const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', padding: 24 }}>
    {children}
  </div>
);
