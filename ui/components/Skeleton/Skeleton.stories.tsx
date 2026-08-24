import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Skeleton from './Skeleton';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  Skeleton — no Figma component. Built from the Frontend's common/skeleton
//  under the amended authority rule: Figma wins when it exists; here it does not.
// ═══════════════════════════════════════════

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      margin: '0 0 20px',
      maxWidth: 620,
      fontFamily: sans,
      fontSize: 13,
      lineHeight: 1.75,
      color: sys('color-text-tertiary-default'),
    }}
  >
    {children}
  </p>
);

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: mono, fontSize: 11, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
    {children}
  </div>
);

export const Shapes: StoryObj = {
  name: 'Shapes',
  render: () => (
    <div style={{ fontFamily: sans }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Skeleton</h2>
      <Note>
        ไม่มีใน Figma — ตรวจแล้ว 2026-08-20 ทั้ง token mirror และทุกหน้า สร้างจาก{' '}
        <code style={{ fontFamily: mono }}>common/skeleton</code> ของ FE (9 ที่ใช้) ตามกฎที่แก้ไว้ว่า
        Figma ชนะเมื่อ Figma มี — ไม่มีให้ตาม FE
      </Note>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 420 }}>
        <div>
          <Caption>บรรทัดข้อความ · height = line-height ของ role</Caption>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton width="100%" height={24} />
            <Skeleton width="80%" height={24} />
            <Skeleton width="60%" height={24} />
          </div>
        </div>

        <div>
          <Caption>circle · สำหรับ avatar</Caption>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Skeleton width={56} height={56} circle />
            <Skeleton width={40} height={40} circle />
            <Skeleton width={24} height={24} circle />
          </div>
        </div>

        <div>
          <Caption>บล็อก · การ์ดที่กำลังโหลด</Caption>
          <Skeleton width="100%" height={120} />
        </div>
      </div>
    </div>
  ),
};

export const InPlace: StoryObj = {
  name: 'แทนที่ของจริง',
  render: () => (
    <div style={{ fontFamily: sans }}>
      <Note>
        Skeleton บอกว่า “รูปทรงนี้กำลังจะมา” ต่างจาก Loading ที่บอกว่า “กำลังทำงาน” —
        DS มี Loading อยู่แล้วแต่ขาดตัวนี้ ซึ่งเป็นเหตุผลที่ FE เขียนเองไว้ 9 ที่
      </Note>
      <div style={{ display: 'flex', gap: 32 }}>
        {[
          { label: 'กำลังโหลด', loading: true },
          { label: 'โหลดเสร็จ', loading: false },
        ].map(({ label, loading }) => (
          <div key={label} style={{ width: 260 }}>
            <Caption>{label}</Caption>
            <div
              style={{
                display: 'flex',
                gap: 12,
                padding: sys('spacing-2xl'),
                border: `1px solid ${sys('color-border-accent-gray-light')}`,
                borderRadius: sys('radius-lg'),
              }}
            >
              {loading ? (
                <Skeleton width={48} height={48} circle />
              ) : (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: sys('color-primary-default'),
                  }}
                />
              )}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {loading ? (
                  <>
                    <Skeleton width="70%" height={20} />
                    <Skeleton width="45%" height={16} />
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>สมชาย ใจดี</div>
                    <div style={{ fontSize: 12, color: sys('color-text-tertiary-default') }}>
                      สมาชิกทั่วไป
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
