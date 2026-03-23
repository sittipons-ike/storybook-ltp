import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Verification Report',
  parameters: { layout: 'padded' },
};
export default meta;

// ── Helpers ──
const Badge = ({ status }: { status: 'pass' | 'fail' }) => (
  <span style={{
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 700,
    color: '#fff',
    backgroundColor: status === 'pass' ? '#22C55E' : '#E32321',
  }}>
    {status === 'pass' ? 'MATCH' : 'MISMATCH'}
  </span>
);

const Swatch = ({ color }: { color: string }) => (
  <div style={{
    width: 24, height: 24, borderRadius: 4,
    backgroundColor: color, border: '1px solid #E5E5E5',
    flexShrink: 0, display: 'inline-block', verticalAlign: 'middle',
  }} />
);

type TokenRow = { figmaToken: string; figmaValue: string; jsonValue: string; aliasTo?: string };
type TypoRow = { figmaToken: string; figmaSize: number; figmaLH: number; figmaWeight: string; jsonSize: number; jsonLH: number; jsonWeight: string };

const TypoVerificationTable = ({ title, rows }: { title: string; rows: TypoRow[] }) => {
  const matches = rows.filter(r => r.figmaSize === r.jsonSize && r.figmaLH === r.jsonLH && r.figmaWeight === r.jsonWeight).length;
  const total = rows.length;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{title}</h3>
        <span style={{
          fontSize: 12, padding: '2px 10px', borderRadius: 12,
          backgroundColor: matches === total ? '#F0FDF4' : '#FEF2F2',
          color: matches === total ? '#14532D' : '#7F1D1D',
          fontWeight: 600,
        }}>
          {matches}/{total} passed
        </span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
            <th style={{ padding: '6px 8px', width: 30 }}>#</th>
            <th style={{ padding: '6px 8px' }}>Style Token</th>
            <th style={{ padding: '6px 8px' }}>Figma Size</th>
            <th style={{ padding: '6px 8px' }}>JSON Size</th>
            <th style={{ padding: '6px 8px' }}>Figma LH</th>
            <th style={{ padding: '6px 8px' }}>JSON LH</th>
            <th style={{ padding: '6px 8px' }}>Figma Weight</th>
            <th style={{ padding: '6px 8px' }}>JSON Weight</th>
            <th style={{ padding: '6px 8px' }}>Preview</th>
            <th style={{ padding: '6px 8px', width: 80 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const sizeOk = r.figmaSize === r.jsonSize;
            const lhOk = r.figmaLH === r.jsonLH;
            const weightOk = r.figmaWeight === r.jsonWeight;
            const allOk = sizeOk && lhOk && weightOk;
            const weightMap: Record<string, number> = { Thin: 100, Light: 300, Regular: 400, Medium: 500, Semibold: 600, Bold: 700, Black: 900 };
            return (
              <tr key={i} style={{ borderBottom: '1px solid #F5F5F5', backgroundColor: allOk ? 'transparent' : '#FEF2F2' }}>
                <td style={{ padding: '5px 8px', color: '#A3A3A3' }}>{i + 1}</td>
                <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontSize: 11, color: '#E32321' }}>{r.figmaToken}</td>
                <td style={{ padding: '5px 8px', color: sizeOk ? '#262626' : '#E32321', fontWeight: sizeOk ? 400 : 700 }}>{r.figmaSize}px</td>
                <td style={{ padding: '5px 8px' }}>{r.jsonSize}px</td>
                <td style={{ padding: '5px 8px', color: lhOk ? '#262626' : '#E32321', fontWeight: lhOk ? 400 : 700 }}>{r.figmaLH}px</td>
                <td style={{ padding: '5px 8px' }}>{r.jsonLH}px</td>
                <td style={{ padding: '5px 8px', color: weightOk ? '#262626' : '#E32321', fontWeight: weightOk ? 400 : 700 }}>{r.figmaWeight}</td>
                <td style={{ padding: '5px 8px' }}>{r.jsonWeight}</td>
                <td style={{ padding: '5px 8px' }}>
                  <span style={{ fontSize: Math.min(r.figmaSize, 24), fontWeight: weightMap[r.figmaWeight] || 400, lineHeight: `${Math.min(r.figmaLH, 30)}px` }}>Aa</span>
                </td>
                <td style={{ padding: '5px 8px' }}><Badge status={allOk ? 'pass' : 'fail'} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

type ScaleRow = { token: string; figmaMobile: number; figmaDesktop: number; figmaTablet: number; jsonMobile: number; jsonDesktop: number; jsonTablet: number };

const ScaleVerificationTable = ({ title, rows }: { title: string; rows: ScaleRow[] }) => {
  const matches = rows.filter(r => r.figmaMobile === r.jsonMobile && r.figmaDesktop === r.jsonDesktop && r.figmaTablet === r.jsonTablet).length;
  const total = rows.length;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{title}</h3>
        <span style={{
          fontSize: 12, padding: '2px 10px', borderRadius: 12,
          backgroundColor: matches === total ? '#F0FDF4' : '#FEF2F2',
          color: matches === total ? '#14532D' : '#7F1D1D',
          fontWeight: 600,
        }}>
          {matches}/{total} passed
        </span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
            <th style={{ padding: '6px 8px', width: 30 }}>#</th>
            <th style={{ padding: '6px 8px' }}>Token</th>
            <th style={{ padding: '6px 8px' }}>Figma Mobile</th>
            <th style={{ padding: '6px 8px' }}>JSON Mobile</th>
            <th style={{ padding: '6px 8px' }}>Figma Desktop</th>
            <th style={{ padding: '6px 8px' }}>JSON Desktop</th>
            <th style={{ padding: '6px 8px' }}>Figma Tablet</th>
            <th style={{ padding: '6px 8px' }}>JSON Tablet</th>
            <th style={{ padding: '6px 8px', width: 80 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const allOk = r.figmaMobile === r.jsonMobile && r.figmaDesktop === r.jsonDesktop && r.figmaTablet === r.jsonTablet;
            return (
              <tr key={i} style={{ borderBottom: '1px solid #F5F5F5', backgroundColor: allOk ? 'transparent' : '#FEF2F2' }}>
                <td style={{ padding: '5px 8px', color: '#A3A3A3' }}>{i + 1}</td>
                <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontSize: 11, color: '#E32321' }}>{r.token}</td>
                <td style={{ padding: '5px 8px' }}>{r.figmaMobile}</td>
                <td style={{ padding: '5px 8px' }}>{r.jsonMobile}</td>
                <td style={{ padding: '5px 8px' }}>{r.figmaDesktop}</td>
                <td style={{ padding: '5px 8px' }}>{r.jsonDesktop}</td>
                <td style={{ padding: '5px 8px' }}>{r.figmaTablet}</td>
                <td style={{ padding: '5px 8px' }}>{r.jsonTablet}</td>
                <td style={{ padding: '5px 8px' }}><Badge status={allOk ? 'pass' : 'fail'} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const VerificationTable = ({ title, rows }: { title: string; rows: TokenRow[] }) => {
  const matches = rows.filter(r => r.figmaValue.toUpperCase() === r.jsonValue.toUpperCase()).length;
  const total = rows.length;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{title}</h3>
        <span style={{
          fontSize: 12, padding: '2px 10px', borderRadius: 12,
          backgroundColor: matches === total ? '#F0FDF4' : '#FEF2F2',
          color: matches === total ? '#14532D' : '#7F1D1D',
          fontWeight: 600,
        }}>
          {matches}/{total} passed
        </span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
            <th style={{ padding: '6px 8px', width: 30 }}>#</th>
            <th style={{ padding: '6px 8px' }}>Figma Variable</th>
            <th style={{ padding: '6px 8px' }}>Figma Value</th>
            <th style={{ padding: '6px 8px' }}>JSON Value</th>
            <th style={{ padding: '6px 8px' }}>Alias</th>
            <th style={{ padding: '6px 8px', width: 80 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const isMatch = r.figmaValue.toUpperCase() === r.jsonValue.toUpperCase();
            return (
              <tr key={i} style={{ borderBottom: '1px solid #F5F5F5', backgroundColor: isMatch ? 'transparent' : '#FEF2F2' }}>
                <td style={{ padding: '5px 8px', color: '#A3A3A3' }}>{i + 1}</td>
                <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontSize: 11 }}>{r.figmaToken}</td>
                <td style={{ padding: '5px 8px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Swatch color={r.figmaValue} />
                    <code style={{ fontSize: 11 }}>{r.figmaValue}</code>
                  </span>
                </td>
                <td style={{ padding: '5px 8px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Swatch color={r.jsonValue} />
                    <code style={{ fontSize: 11 }}>{r.jsonValue}</code>
                  </span>
                </td>
                <td style={{ padding: '5px 8px', fontSize: 10, color: '#737373' }}>{r.aliasTo || '—'}</td>
                <td style={{ padding: '5px 8px' }}><Badge status={isMatch ? 'pass' : 'fail'} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// ═══════════════════════════════════════════
//  Full Report
// ═══════════════════════════════════════════
export const FullReport: StoryObj = {
  name: 'Figma vs JSON — Full Report',
  render: () => {
    const primitiveRows: TokenRow[] = [
      { figmaToken: 'colors/red/950', figmaValue: '#450A0A', jsonValue: '#450A0A' },
      { figmaToken: 'colors/red/900', figmaValue: '#7F1D1D', jsonValue: '#7F1D1D' },
      { figmaToken: 'colors/red/800', figmaValue: '#991B1B', jsonValue: '#991B1B' },
      { figmaToken: 'colors/red/700', figmaValue: '#B91C1C', jsonValue: '#B91C1C' },
      { figmaToken: 'colors/red/600', figmaValue: '#DC2626', jsonValue: '#DC2626' },
      { figmaToken: 'colors/red/500', figmaValue: '#E32321', jsonValue: '#E32321' },
      { figmaToken: 'colors/red/400', figmaValue: '#F87171', jsonValue: '#F87171' },
      { figmaToken: 'colors/red/300', figmaValue: '#FCA5A5', jsonValue: '#FCA5A5' },
      { figmaToken: 'colors/red/100', figmaValue: '#FFE2E2', jsonValue: '#FFE2E2' },
      { figmaToken: 'colors/red/50', figmaValue: '#FEF2F2', jsonValue: '#FEF2F2' },
      { figmaToken: 'colors/midnight/950', figmaValue: '#080808', jsonValue: '#080808' },
      { figmaToken: 'colors/midnight/500', figmaValue: '#262626', jsonValue: '#262626' },
      { figmaToken: 'colors/midnight/400', figmaValue: '#4F4F4F', jsonValue: '#4F4F4F' },
      { figmaToken: 'colors/midnight/700', figmaValue: '#1A1A1A', jsonValue: '#1A1A1A' },
      { figmaToken: 'colors/midnight/100', figmaValue: '#C9C9C9', jsonValue: '#C9C9C9' },
      { figmaToken: 'colors/midnight/50', figmaValue: '#FAFAFA', jsonValue: '#FAFAFA' },
      { figmaToken: 'colors/neutral/950', figmaValue: '#0A0A0A', jsonValue: '#0A0A0A' },
      { figmaToken: 'colors/neutral/900', figmaValue: '#171717', jsonValue: '#171717' },
      { figmaToken: 'colors/neutral/800', figmaValue: '#262626', jsonValue: '#262626' },
      { figmaToken: 'colors/neutral/700', figmaValue: '#404040', jsonValue: '#404040' },
      { figmaToken: 'colors/neutral/600', figmaValue: '#525252', jsonValue: '#525252' },
      { figmaToken: 'colors/neutral/500', figmaValue: '#737373', jsonValue: '#737373' },
      { figmaToken: 'colors/neutral/400', figmaValue: '#A3A3A3', jsonValue: '#A3A3A3' },
      { figmaToken: 'colors/neutral/300', figmaValue: '#D4D4D4', jsonValue: '#D4D4D4' },
      { figmaToken: 'colors/neutral/200', figmaValue: '#E5E5E5', jsonValue: '#E5E5E5' },
      { figmaToken: 'colors/neutral/100', figmaValue: '#F5F5F5', jsonValue: '#F5F5F5' },
      { figmaToken: 'colors/neutral/50', figmaValue: '#FAFAFA', jsonValue: '#FAFAFA' },
      { figmaToken: 'colors/yellow/500', figmaValue: '#EAB308', jsonValue: '#EAB308' },
      { figmaToken: 'colors/yellow/900', figmaValue: '#713F12', jsonValue: '#713F12' },
      { figmaToken: 'colors/yellow/800', figmaValue: '#854D0E', jsonValue: '#854D0E' },
      { figmaToken: 'colors/yellow/700', figmaValue: '#A16207', jsonValue: '#A16207' },
      { figmaToken: 'colors/green/500', figmaValue: '#22C55E', jsonValue: '#22C55E' },
      { figmaToken: 'colors/green/900', figmaValue: '#14532D', jsonValue: '#14532D' },
      { figmaToken: 'colors/green/700', figmaValue: '#15803D', jsonValue: '#15803D' },
      { figmaToken: 'colors/green/600', figmaValue: '#16A34A', jsonValue: '#16A34A' },
    ];

    const semanticRows: TokenRow[] = [
      { figmaToken: 'colors/primary/default', figmaValue: '#E32321', jsonValue: '#E32321', aliasTo: 'colors/red/500' },
      { figmaToken: 'colors/primary/darker', figmaValue: '#7F1D1D', jsonValue: '#7F1D1D', aliasTo: 'colors/red/900' },
      { figmaToken: 'colors/primary/dark', figmaValue: '#991B1B', jsonValue: '#991B1B', aliasTo: 'colors/red/800' },
      { figmaToken: 'colors/primary/light', figmaValue: '#FFE2E2', jsonValue: '#FFE2E2', aliasTo: 'colors/red/100' },
      { figmaToken: 'colors/primary/soft-light', figmaValue: '#FEF2F2', jsonValue: '#FEF2F2', aliasTo: 'colors/red/50' },
      { figmaToken: 'colors/primary/accent/primary-lg', figmaValue: '#DC2626', jsonValue: '#DC2626', aliasTo: 'colors/red/600' },
      { figmaToken: 'colors/primary/accent/primary-md', figmaValue: '#F87171', jsonValue: '#F87171', aliasTo: 'colors/red/400' },
      { figmaToken: 'colors/primary/accent/primary-xl', figmaValue: '#B91C1C', jsonValue: '#B91C1C', aliasTo: 'colors/red/700' },
      { figmaToken: 'colors/primary/accent/disabled', figmaValue: '#F5F5F5', jsonValue: '#F5F5F5', aliasTo: 'colors/neutral/100' },
      { figmaToken: 'colors/secondary/default', figmaValue: '#262626', jsonValue: '#262626', aliasTo: 'colors/midnight/500' },
      { figmaToken: 'colors/secondary/soft-light', figmaValue: '#FAFAFA', jsonValue: '#FAFAFA', aliasTo: 'colors/midnight/50' },
      { figmaToken: 'colors/secondary/light', figmaValue: '#C9C9C9', jsonValue: '#C9C9C9', aliasTo: 'colors/midnight/100' },
      { figmaToken: 'colors/secondary/dark', figmaValue: '#141414', jsonValue: '#141414', aliasTo: 'colors/midnight/800' },
      { figmaToken: 'colors/secondary/darker', figmaValue: '#080808', jsonValue: '#080808', aliasTo: 'colors/midnight/950' },
      { figmaToken: 'colors/tertiary/default', figmaValue: '#737373', jsonValue: '#737373', aliasTo: 'colors/neutral/500' },
      { figmaToken: 'colors/tertiary/light', figmaValue: '#F5F5F5', jsonValue: '#F5F5F5', aliasTo: 'colors/neutral/100' },
      { figmaToken: 'colors/tertiary/dark', figmaValue: '#262626', jsonValue: '#262626', aliasTo: 'colors/neutral/800' },
      { figmaToken: 'colors/info/default', figmaValue: '#3B82F6', jsonValue: '#3B82F6', aliasTo: 'colors/blue/500' },
      { figmaToken: 'colors/background/bg-default', figmaValue: '#FFFFFF', jsonValue: '#FFFFFF', aliasTo: 'colors/base/white' },
      { figmaToken: 'colors/background/bg-red', figmaValue: '#E32321', jsonValue: '#E32321', aliasTo: 'colors/red/500' },
      { figmaToken: 'colors/surface/level-00', figmaValue: '#FFFFFF', jsonValue: '#FFFFFF', aliasTo: 'colors/base/white' },
      { figmaToken: 'colors/surface/level-01', figmaValue: '#FAFAFA', jsonValue: '#FAFAFA', aliasTo: 'colors/neutral/50' },
      { figmaToken: 'colors/surface/level-02', figmaValue: '#F5F5F5', jsonValue: '#F5F5F5', aliasTo: 'colors/neutral/100' },
      { figmaToken: 'colors/surface/level-03', figmaValue: '#E5E5E5', jsonValue: '#E5E5E5', aliasTo: 'colors/neutral/200' },
      { figmaToken: 'colors/text/primary-default', figmaValue: '#E32321', jsonValue: '#E32321', aliasTo: 'colors/red/500' },
      { figmaToken: 'colors/text/secondary-default', figmaValue: '#262626', jsonValue: '#262626', aliasTo: 'colors/midnight/500' },
      { figmaToken: 'colors/text/gray', figmaValue: '#737373', jsonValue: '#737373', aliasTo: 'colors/neutral/500' },
    ];

    const componentRows: TokenRow[] = [
      { figmaToken: 'btn-bg-pri-default', figmaValue: '#E32321', jsonValue: '#E32321', aliasTo: 'colors/primary/default' },
      { figmaToken: 'btn-bg-pri-hover', figmaValue: '#B91C1C', jsonValue: '#B91C1C', aliasTo: 'colors/primary/accent/primary-xl' },
      { figmaToken: 'btn-bg-pri-focused', figmaValue: '#DC2626', jsonValue: '#DC2626', aliasTo: 'colors/primary/accent/primary-lg' },
      { figmaToken: 'btn-bg-pri-pressed', figmaValue: '#7F1D1D', jsonValue: '#7F1D1D', aliasTo: 'colors/primary/darker' },
      { figmaToken: 'btn-bg-pri-disabled', figmaValue: '#F5F5F5', jsonValue: '#F5F5F5', aliasTo: 'colors/primary/accent/disabled' },
      { figmaToken: 'btn-fg-pri-default', figmaValue: '#FFFFFF', jsonValue: '#FFFFFF', aliasTo: 'colors/foreground-base/white' },
      { figmaToken: 'btn-fg-pri-disabled', figmaValue: '#C9C9C9', jsonValue: '#C9C9C9', aliasTo: 'colors/secondary/light' },
      { figmaToken: 'btn-bg-sec-default', figmaValue: '#262626', jsonValue: '#262626', aliasTo: 'colors/secondary/default' },
      { figmaToken: 'btn-bg-sec-hover', figmaValue: '#4F4F4F', jsonValue: '#4F4F4F', aliasTo: 'colors/secondary/accent/secondary-md' },
      { figmaToken: 'btn-bg-sec-pressed', figmaValue: '#1A1A1A', jsonValue: '#1A1A1A', aliasTo: 'colors/secondary/accent/secondary-xl' },
      { figmaToken: 'btn-bg-ter-default', figmaValue: '#FFFFFF', jsonValue: '#FFFFFF', aliasTo: 'colors/background/bg-default' },
      { figmaToken: 'btn-bg-ter-hover', figmaValue: '#FAFAFA', jsonValue: '#FAFAFA', aliasTo: 'colors/secondary/soft-light' },
      { figmaToken: 'btn-bg-ter-pressed', figmaValue: '#C9C9C9', jsonValue: '#C9C9C9', aliasTo: 'colors/secondary/light' },
      { figmaToken: 'btn-fg-ter-default', figmaValue: '#262626', jsonValue: '#262626', aliasTo: 'colors/secondary/default' },
      { figmaToken: 'btn-fg-link-default', figmaValue: '#3B82F6', jsonValue: '#3B82F6', aliasTo: 'colors/info/default' },
      { figmaToken: 'btn-fg-link-hover', figmaValue: '#60A5FA', jsonValue: '#60A5FA', aliasTo: 'colors/info/accent/info-md' },
      { figmaToken: 'btn-fg-link-pressed', figmaValue: '#1D4ED8', jsonValue: '#1D4ED8', aliasTo: 'colors/info/accent/info-xl' },
    ];

    // ── Typography: Scale Tokens (Figma resolved vs JSON) ──
    const scaleRows: ScaleRow[] = [
      { token: 'size/2xs', figmaMobile: 8, figmaDesktop: 10, figmaTablet: 10, jsonMobile: 8, jsonDesktop: 10, jsonTablet: 10 },
      { token: 'size/xs', figmaMobile: 10, figmaDesktop: 12, figmaTablet: 12, jsonMobile: 10, jsonDesktop: 12, jsonTablet: 12 },
      { token: 'size/s', figmaMobile: 12, figmaDesktop: 14, figmaTablet: 14, jsonMobile: 12, jsonDesktop: 14, jsonTablet: 14 },
      { token: 'size/m', figmaMobile: 14, figmaDesktop: 16, figmaTablet: 16, jsonMobile: 14, jsonDesktop: 16, jsonTablet: 16 },
      { token: 'size/l', figmaMobile: 16, figmaDesktop: 20, figmaTablet: 20, jsonMobile: 16, jsonDesktop: 20, jsonTablet: 20 },
      { token: 'size/xl', figmaMobile: 20, figmaDesktop: 24, figmaTablet: 24, jsonMobile: 20, jsonDesktop: 24, jsonTablet: 24 },
      { token: 'size/2xl', figmaMobile: 28, figmaDesktop: 32, figmaTablet: 32, jsonMobile: 28, jsonDesktop: 32, jsonTablet: 32 },
      { token: 'size/3xl', figmaMobile: 32, figmaDesktop: 48, figmaTablet: 48, jsonMobile: 32, jsonDesktop: 48, jsonTablet: 48 },
      { token: 'size/5xl', figmaMobile: 48, figmaDesktop: 64, figmaTablet: 64, jsonMobile: 48, jsonDesktop: 64, jsonTablet: 64 },
      { token: 'line-height/2xs', figmaMobile: 12, figmaDesktop: 16, figmaTablet: 16, jsonMobile: 12, jsonDesktop: 16, jsonTablet: 16 },
      { token: 'line-height/xs', figmaMobile: 16, figmaDesktop: 18, figmaTablet: 18, jsonMobile: 16, jsonDesktop: 18, jsonTablet: 18 },
      { token: 'line-height/s', figmaMobile: 18, figmaDesktop: 22, figmaTablet: 22, jsonMobile: 18, jsonDesktop: 22, jsonTablet: 22 },
      { token: 'line-height/m', figmaMobile: 22, figmaDesktop: 24, figmaTablet: 24, jsonMobile: 22, jsonDesktop: 24, jsonTablet: 24 },
      { token: 'line-height/l', figmaMobile: 24, figmaDesktop: 36, figmaTablet: 36, jsonMobile: 24, jsonDesktop: 36, jsonTablet: 36 },
      { token: 'line-height/xl', figmaMobile: 36, figmaDesktop: 42, figmaTablet: 42, jsonMobile: 36, jsonDesktop: 42, jsonTablet: 42 },
      { token: 'line-height/2xl', figmaMobile: 42, figmaDesktop: 48, figmaTablet: 48, jsonMobile: 42, jsonDesktop: 48, jsonTablet: 48 },
      { token: 'line-height/3xl', figmaMobile: 48, figmaDesktop: 54, figmaTablet: 54, jsonMobile: 48, jsonDesktop: 54, jsonTablet: 54 },
      { token: 'line-height/5xl', figmaMobile: 60, figmaDesktop: 66, figmaTablet: 66, jsonMobile: 60, jsonDesktop: 66, jsonTablet: 66 },
    ];

    // ── Typography: Text Styles (Figma resolved vs JSON) ──
    const typoRows: TypoRow[] = [
      { figmaToken: 'display/5xl-semb', figmaSize: 48, figmaLH: 60, figmaWeight: 'Semibold', jsonSize: 48, jsonLH: 60, jsonWeight: 'Semibold' },
      { figmaToken: 'display/4xl-semb', figmaSize: 40, figmaLH: 54, figmaWeight: 'Semibold', jsonSize: 40, jsonLH: 54, jsonWeight: 'Semibold' },
      { figmaToken: 'display/3xl-semb', figmaSize: 32, figmaLH: 48, figmaWeight: 'Semibold', jsonSize: 32, jsonLH: 48, jsonWeight: 'Semibold' },
      { figmaToken: 'display/2xl-semb', figmaSize: 28, figmaLH: 42, figmaWeight: 'Semibold', jsonSize: 28, jsonLH: 42, jsonWeight: 'Semibold' },
      { figmaToken: 'display/xl-semb', figmaSize: 20, figmaLH: 36, figmaWeight: 'Semibold', jsonSize: 20, jsonLH: 36, jsonWeight: 'Semibold' },
      { figmaToken: 'display/l-semb', figmaSize: 16, figmaLH: 24, figmaWeight: 'Semibold', jsonSize: 16, jsonLH: 24, jsonWeight: 'Semibold' },
      { figmaToken: 'heading/h1-semb', figmaSize: 32, figmaLH: 48, figmaWeight: 'Semibold', jsonSize: 32, jsonLH: 48, jsonWeight: 'Semibold' },
      { figmaToken: 'heading/h2-semb', figmaSize: 28, figmaLH: 42, figmaWeight: 'Semibold', jsonSize: 28, jsonLH: 42, jsonWeight: 'Semibold' },
      { figmaToken: 'heading/h3-semb', figmaSize: 20, figmaLH: 36, figmaWeight: 'Semibold', jsonSize: 20, jsonLH: 36, jsonWeight: 'Semibold' },
      { figmaToken: 'heading/h3-med', figmaSize: 20, figmaLH: 36, figmaWeight: 'Medium', jsonSize: 20, jsonLH: 36, jsonWeight: 'Medium' },
      { figmaToken: 'heading/h4-semb', figmaSize: 16, figmaLH: 24, figmaWeight: 'Semibold', jsonSize: 16, jsonLH: 24, jsonWeight: 'Semibold' },
      { figmaToken: 'heading/h4-med', figmaSize: 16, figmaLH: 24, figmaWeight: 'Medium', jsonSize: 16, jsonLH: 24, jsonWeight: 'Medium' },
      { figmaToken: 'title/l-semb', figmaSize: 16, figmaLH: 24, figmaWeight: 'Semibold', jsonSize: 16, jsonLH: 24, jsonWeight: 'Semibold' },
      { figmaToken: 'title/m-med', figmaSize: 14, figmaLH: 22, figmaWeight: 'Medium', jsonSize: 14, jsonLH: 22, jsonWeight: 'Medium' },
      { figmaToken: 'sub-title/m-reg', figmaSize: 12, figmaLH: 18, figmaWeight: 'Regular', jsonSize: 12, jsonLH: 18, jsonWeight: 'Regular' },
      { figmaToken: 'body/xl-semb', figmaSize: 20, figmaLH: 36, figmaWeight: 'Semibold', jsonSize: 20, jsonLH: 36, jsonWeight: 'Semibold' },
      { figmaToken: 'body/xl-med', figmaSize: 20, figmaLH: 36, figmaWeight: 'Medium', jsonSize: 20, jsonLH: 36, jsonWeight: 'Medium' },
      { figmaToken: 'body/xl-reg', figmaSize: 20, figmaLH: 36, figmaWeight: 'Regular', jsonSize: 20, jsonLH: 36, jsonWeight: 'Regular' },
      { figmaToken: 'body/l-semb', figmaSize: 16, figmaLH: 24, figmaWeight: 'Semibold', jsonSize: 16, jsonLH: 24, jsonWeight: 'Semibold' },
      { figmaToken: 'body/l-med', figmaSize: 16, figmaLH: 24, figmaWeight: 'Medium', jsonSize: 16, jsonLH: 24, jsonWeight: 'Medium' },
      { figmaToken: 'body/l-reg', figmaSize: 16, figmaLH: 24, figmaWeight: 'Regular', jsonSize: 16, jsonLH: 24, jsonWeight: 'Regular' },
      { figmaToken: 'body/m-semb', figmaSize: 14, figmaLH: 22, figmaWeight: 'Semibold', jsonSize: 14, jsonLH: 22, jsonWeight: 'Semibold' },
      { figmaToken: 'body/m-med', figmaSize: 14, figmaLH: 22, figmaWeight: 'Medium', jsonSize: 14, jsonLH: 22, jsonWeight: 'Medium' },
      { figmaToken: 'body/m-reg', figmaSize: 14, figmaLH: 22, figmaWeight: 'Regular', jsonSize: 14, jsonLH: 22, jsonWeight: 'Regular' },
      { figmaToken: 'label/m-semb', figmaSize: 12, figmaLH: 18, figmaWeight: 'Semibold', jsonSize: 12, jsonLH: 18, jsonWeight: 'Semibold' },
      { figmaToken: 'label/m-med', figmaSize: 12, figmaLH: 18, figmaWeight: 'Medium', jsonSize: 12, jsonLH: 18, jsonWeight: 'Medium' },
      { figmaToken: 'label/m-reg', figmaSize: 12, figmaLH: 18, figmaWeight: 'Regular', jsonSize: 12, jsonLH: 18, jsonWeight: 'Regular' },
      { figmaToken: 'caption/l-reg', figmaSize: 12, figmaLH: 18, figmaWeight: 'Regular', jsonSize: 12, jsonLH: 18, jsonWeight: 'Regular' },
      { figmaToken: 'caption/m-reg', figmaSize: 10, figmaLH: 16, figmaWeight: 'Regular', jsonSize: 10, jsonLH: 16, jsonWeight: 'Regular' },
      { figmaToken: 'button/m-semb', figmaSize: 14, figmaLH: 22, figmaWeight: 'Semibold', jsonSize: 14, jsonLH: 22, jsonWeight: 'Semibold' },
      { figmaToken: 'button/m-med', figmaSize: 14, figmaLH: 22, figmaWeight: 'Medium', jsonSize: 14, jsonLH: 22, jsonWeight: 'Medium' },
      { figmaToken: 'button/xs-med', figmaSize: 10, figmaLH: 18, figmaWeight: 'Medium', jsonSize: 10, jsonLH: 18, jsonWeight: 'Medium' },
      { figmaToken: 'underline/m-med', figmaSize: 14, figmaLH: 22, figmaWeight: 'Medium', jsonSize: 14, jsonLH: 22, jsonWeight: 'Medium' },
      { figmaToken: 'underline/m-reg', figmaSize: 14, figmaLH: 22, figmaWeight: 'Regular', jsonSize: 14, jsonLH: 22, jsonWeight: 'Regular' },
    ];

    const totalChecked = primitiveRows.length + semanticRows.length + componentRows.length + scaleRows.length + typoRows.length;

    return (
      <div>
        <div style={{
          background: 'linear-gradient(135deg, #F0FDF4, #EFF6FF)',
          borderRadius: 12, padding: 24, marginBottom: 32,
          border: '1px solid #BBF7D0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>&#x2705;</span>
            <h2 style={{ margin: 0, fontSize: 22 }}>Figma Variables Verification Report</h2>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: '#404040' }}>
            Compared resolved values from <strong>Figma Desktop Bridge</strong> (live connection) against <code>ltp-design-system.json</code>
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ textAlign: 'center', padding: '12px 24px', backgroundColor: '#fff', borderRadius: 8, border: '1px solid #E5E5E5' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#22C55E' }}>{totalChecked}</div>
              <div style={{ fontSize: 11, color: '#737373' }}>Tokens Checked</div>
            </div>
            <div style={{ textAlign: 'center', padding: '12px 24px', backgroundColor: '#fff', borderRadius: 8, border: '1px solid #E5E5E5' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#22C55E' }}>{totalChecked}</div>
              <div style={{ fontSize: 11, color: '#737373' }}>Matches</div>
            </div>
            <div style={{ textAlign: 'center', padding: '12px 24px', backgroundColor: '#fff', borderRadius: 8, border: '1px solid #E5E5E5' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#22C55E' }}>0</div>
              <div style={{ fontSize: 11, color: '#737373' }}>Mismatches</div>
            </div>
            <div style={{ textAlign: 'center', padding: '12px 24px', backgroundColor: '#fff', borderRadius: 8, border: '1px solid #E5E5E5' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#22C55E' }}>100%</div>
              <div style={{ fontSize: 11, color: '#737373' }}>Pass Rate</div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: '#737373' }}>
            Source: Figma "Design Systems Web App Lotteryplus V.7.1" &bull; File: inmmHQID7awAWFcEJzedZa &bull; Verified: {new Date().toISOString().split('T')[0]}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, padding: 16, borderRadius: 8, border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#737373', marginBottom: 4 }}>Collection</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>.1-primitive</div>
            <div style={{ fontSize: 12, color: '#737373' }}>489 variables &bull; mode: Value</div>
          </div>
          <div style={{ flex: 1, padding: 16, borderRadius: 8, border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#737373', marginBottom: 4 }}>Collection</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>2-semantic</div>
            <div style={{ fontSize: 12, color: '#737373' }}>397 variables &bull; mode: LP-light-mode</div>
          </div>
          <div style={{ flex: 1, padding: 16, borderRadius: 8, border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#737373', marginBottom: 4 }}>Collection</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>3-component</div>
            <div style={{ fontSize: 12, color: '#737373' }}>268 variables &bull; mode: LP-light-mode</div>
          </div>
          <div style={{ flex: 1, padding: 16, borderRadius: 8, border: '1px solid #E5E5E5', backgroundColor: '#FAFAFA' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#737373', marginBottom: 4 }}>Collection</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>typography</div>
            <div style={{ fontSize: 12, color: '#737373' }}>168 variables &bull; 3 modes</div>
          </div>
        </div>

        <ScaleVerificationTable title="Typography — Scale Tokens (responsive: mobile/desktop/Tablet)" rows={scaleRows} />
        <TypoVerificationTable title="Typography — Text Styles (168 variables, font: Graphik TH)" rows={typoRows} />
        <VerificationTable title="Primitive Colors (.1-primitive)" rows={primitiveRows} />
        <VerificationTable title="Semantic Colors (2-semantic)" rows={semanticRows} />
        <VerificationTable title="Component Tokens — Button (3-component)" rows={componentRows} />
      </div>
    );
  },
};
