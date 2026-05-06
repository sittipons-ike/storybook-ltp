import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { changelog } from './changelog';
import type { ChangelogEntry } from './changelog';

// ═══════════════════════════════════════════
// Changelog — Version Log for UX/UI → Dev (FE)
// UX/UI แก้ไขใน changelog.ts → Dev เข้ามาดูและอัพเดทตาม
// ═══════════════════════════════════════════

const meta: Meta = {
  title: 'System/Changelog',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Version Log สำหรับ Design System — UX/UI team อัพเดทการเปลี่ยนแปลงที่นี่ ให้ Dev (FE) เข้ามาดูและอัพเดทตาม\n\n' +
          '**วิธีใช้:** แก้ไขไฟล์ `UI Library/system/changelog.ts` แล้ว push ขึ้น Git',
      },
    },
  },
};
export default meta;

const statusColors: Record<ChangelogEntry['status'], { bg: string; fg: string; label: string }> = {
  new: { bg: '#DCFCE7', fg: '#166534', label: 'NEW' },
  updated: { bg: '#DBEAFE', fg: '#1E40AF', label: 'UPDATED' },
  breaking: { bg: '#FEE2E2', fg: '#991B1B', label: 'BREAKING' },
  deprecated: { bg: '#FEF3C7', fg: '#92400E', label: 'DEPRECATED' },
  fixed: { bg: '#F3E8FF', fg: '#6B21A8', label: 'FIXED' },
};

const actionColors: Record<string, { bg: string; fg: string; label: string }> = {
  'none': { bg: '#F5F5F5', fg: '#737373', label: 'No action needed' },
  'update-required': { bg: '#FEF2F2', fg: '#E32321', label: 'Update Required' },
  'review-required': { bg: '#FEF3C7', fg: '#92400E', label: 'Review Required' },
  'new-component': { bg: '#DCFCE7', fg: '#166534', label: 'New Component' },
};

const Badge: React.FC<{ bg: string; fg: string; label: string }> = ({ bg, fg, label }) => (
  <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, backgroundColor: bg, color: fg, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
    {label}
  </span>
);

// ── Full Changelog ──
export const FullChangelog: StoryObj = {
  name: 'Full Changelog',
  render: () => {
    const [filterStatus, setFilterStatus] = React.useState<string>('all');
    const [showCompleted, setShowCompleted] = React.useState(true);

    const filtered = changelog.filter((entry) => {
      if (filterStatus !== 'all' && entry.status !== filterStatus) return false;
      if (!showCompleted && entry.completed) return false;
      return true;
    });

    const pendingCount = changelog.filter((e) => !e.completed && e.devAction !== 'none').length;

    return (
      <div style={{ padding: 32, maxWidth: 900, fontFamily: "'Graphik TH', sans-serif" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Changelog</h2>
            <p style={{ fontSize: 14, color: '#737373', marginTop: 4 }}>
              UX/UI Team อัพเดทการเปลี่ยนแปลง → Dev (FE) เข้ามาดูและอัพเดทตาม
            </p>
          </div>
          {pendingCount > 0 && (
            <div style={{ padding: '8px 16px', borderRadius: 8, backgroundColor: '#FEF2F2', border: '1px solid #E32321' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#E32321' }}>
                {pendingCount} pending update{pendingCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          {['all', 'new', 'updated', 'breaking', 'fixed', 'deprecated'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                border: filterStatus === s ? '2px solid #262626' : '1px solid #D4D4D4',
                backgroundColor: filterStatus === s ? '#262626' : '#FFFFFF',
                color: filterStatus === s ? '#FFFFFF' : '#262626',
                fontWeight: filterStatus === s ? 600 : 400,
                fontFamily: "'Graphik TH', sans-serif",
              }}
            >
              {s === 'all' ? 'All' : statusColors[s as ChangelogEntry['status']].label}
            </button>
          ))}
          <span style={{ width: 1, height: 20, backgroundColor: '#D4D4D4', margin: '0 4px' }} />
          <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <input type="checkbox" checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} />
            Show completed
          </label>
        </div>

        <div style={{ fontSize: 12, color: '#999', marginBottom: 16 }}>
          {filtered.length} / {changelog.length} entries
        </div>

        {/* Entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((entry, i) => (
            <div
              key={i}
              style={{
                padding: 20,
                borderRadius: 12,
                border: entry.completed ? '1px solid #E5E5E5' : '1px solid #FCA5A5',
                backgroundColor: entry.completed ? '#FFFFFF' : '#FFFBFB',
                opacity: entry.completed ? 0.85 : 1,
              }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Badge {...statusColors[entry.status]} />
                  <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#262626' }}>v{entry.version}</span>
                  <span style={{ fontSize: 12, color: '#999' }}>{entry.date}</span>
                </div>
                {entry.completed && (
                  <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 600 }}>Completed</span>
                )}
              </div>

              {/* Title + Component */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ padding: '1px 6px', borderRadius: 4, backgroundColor: '#F0F0F0', fontSize: 11, fontWeight: 600 }}>
                  {entry.component}
                </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#262626' }}>{entry.title}</span>
              </div>

              {/* Description */}
              <p style={{ fontSize: 13, color: '#525252', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                {entry.description}
              </p>

              {/* Author + Dev Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#999' }}>by</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{entry.author}</span>
                  <span style={{ padding: '1px 6px', borderRadius: 4, backgroundColor: entry.authorRole === 'UX/UI' ? '#DBEAFE' : '#F3E8FF', fontSize: 10, fontWeight: 600, color: entry.authorRole === 'UX/UI' ? '#1E40AF' : '#6B21A8' }}>
                    {entry.authorRole}
                  </span>
                </div>
                {entry.devAction && entry.devAction !== 'none' && (
                  <Badge {...actionColors[entry.devAction]} />
                )}
              </div>

              {/* Dev Notes */}
              {entry.devNotes && (
                <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 6, backgroundColor: '#F5F5F5', borderLeft: '3px solid #E32321' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#E32321', textTransform: 'uppercase', letterSpacing: 0.5 }}>Dev Notes:</span>
                  <p style={{ fontSize: 12, color: '#525252', margin: '4px 0 0 0' }}>{entry.devNotes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* How to use */}
        <div style={{ marginTop: 32, padding: 20, borderRadius: 12, backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>How to update</h4>
          <ol style={{ fontSize: 13, color: '#525252', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>UX/UI: แก้ไข <code style={{ backgroundColor: '#E5E5E5', padding: '1px 4px', borderRadius: 3, fontSize: 12 }}>UI Library/system/changelog.ts</code></li>
            <li>เพิ่ม entry ใหม่ที่ด้านบนสุดของ array (latest first)</li>
            <li>ระบุ <code style={{ backgroundColor: '#E5E5E5', padding: '1px 4px', borderRadius: 3, fontSize: 12 }}>devAction: 'update-required'</code> ถ้าต้องการให้ Dev อัพเดท</li>
            <li>Dev (FE): อัพเดทตาม notes แล้วเปลี่ยน <code style={{ backgroundColor: '#E5E5E5', padding: '1px 4px', borderRadius: 3, fontSize: 12 }}>completed: true</code></li>
            <li>Push ขึ้น Git → Vercel auto-deploy → ทุกคนเห็นตรงกัน</li>
          </ol>
        </div>
      </div>
    );
  },
};

// ── Pending Actions Only ──
export const PendingActions: StoryObj = {
  name: 'Pending Actions — Dev Todo',
  render: () => {
    const pending = changelog.filter((e) => !e.completed && e.devAction !== 'none');

    return (
      <div style={{ padding: 32, maxWidth: 800, fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Pending Actions</h2>
        <p style={{ fontSize: 14, color: '#737373', marginBottom: 24 }}>
          รายการที่ UX/UI team ขอให้ Dev (FE) อัพเดท — {pending.length} items
        </p>

        {pending.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', borderRadius: 12, backgroundColor: '#DCFCE7', border: '1px solid #22C55E' }}>
            <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>All caught up!</span>
            <span style={{ fontSize: 14, color: '#166534' }}>ไม่มี pending actions — ทุกอย่างอัพเดทแล้ว</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pending.map((entry, i) => (
              <div key={i} style={{ padding: 16, borderRadius: 12, border: '2px solid #FCA5A5', backgroundColor: '#FFFBFB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Badge {...statusColors[entry.status]} />
                  <span style={{ fontWeight: 700 }}>v{entry.version}</span>
                  <span style={{ padding: '1px 6px', borderRadius: 4, backgroundColor: '#F0F0F0', fontSize: 11, fontWeight: 600 }}>{entry.component}</span>
                  {entry.devAction && <Badge {...actionColors[entry.devAction]} />}
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px 0' }}>{entry.title}</p>
                {entry.devNotes && (
                  <div style={{ padding: '6px 10px', borderRadius: 6, backgroundColor: '#F5F5F5', borderLeft: '3px solid #E32321', fontSize: 12, color: '#525252' }}>
                    {entry.devNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};
