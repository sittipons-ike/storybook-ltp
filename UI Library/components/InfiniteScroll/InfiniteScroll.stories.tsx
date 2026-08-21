import type { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
import Skeleton from '../Skeleton/Skeleton';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  InfiniteScroll — a `helper` in the Lark Standard's sense: behaviour, no drawing.
//  Figma has nothing to hold it, correctly.
// ═══════════════════════════════════════════

const meta: Meta<typeof InfiniteScroll> = {
  title: 'Helpers/InfiniteScroll',
  component: InfiniteScroll,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const PAGE = 8;
const TOTAL = 40;

export const Demo: StoryObj = {
  name: 'เลื่อนแล้วโหลดต่อ',
  render: () => {
    const Inner = () => {
      const [count, setCount] = useState(PAGE);
      const [loading, setLoading] = useState(false);
      const hasMore = count < TOTAL;

      const loadMore = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
          setCount((prev) => Math.min(prev + PAGE, TOTAL));
          setLoading(false);
        }, 600);
      }, []);

      return (
        <div style={{ fontFamily: sans, maxWidth: 480 }}>
          <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>infinity-scroll</h2>
          <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
            เป็น <strong>behaviour</strong> ไม่ใช่หน้าตา — Standard เรียกว่า{' '}
            <code style={{ fontFamily: mono }}>helper</code> ไม่มี variant ไม่มี state ไม่มี token
            ยกมาจาก FE (3 ที่ใช้) แก้ 2 อย่างที่เป็นบั๊ก: disconnect observer ตอน unmount
            และเปิด <code style={{ fontFamily: mono }}>rootMargin</code> ให้เริ่มโหลดก่อนถึงก้นจริง
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: mono,
              fontSize: 11,
              color: sys('color-text-tertiary-default'),
              marginBottom: 8,
            }}
          >
            <span>
              {count}/{TOTAL} · {hasMore ? 'ยังมีต่อ' : 'ครบแล้ว'} · {loading ? 'กำลังโหลด' : 'ว่าง'}
            </span>
            {/* The observer needs a real viewport to fire, which a headless or hidden
                frame does not have. This calls the same loadMore so the paging contract
                stays demonstrable — and testable — without one. */}
            <button
              type="button"
              data-testid="load-more"
              onClick={loadMore}
              disabled={!hasMore || loading}
              style={{
                font: 'inherit',
                padding: '2px 10px',
                borderRadius: sys('radius-sm'),
                border: `1px solid ${sys('color-border-accent-gray-light')}`,
                background: 'transparent',
                color: 'inherit',
                cursor: !hasMore || loading ? 'default' : 'pointer',
              }}
            >
              โหลดเพิ่ม
            </button>
          </div>

          <div
            style={{
              height: 340,
              overflowY: 'auto',
              padding: sys('spacing-lg'),
              border: `1px solid ${sys('color-border-accent-gray-light')}`,
              borderRadius: sys('radius-lg'),
            }}
          >
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loading={loading} rootMargin="120px">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Array.from({ length: count }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      padding: sys('spacing-lg'),
                      borderRadius: sys('radius-md'),
                      background: sys('color-background-soft-light'),
                      fontSize: 14,
                    }}
                  >
                    รายการที่ {i + 1}
                  </div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Skeleton width="100%" height={42} />
                    <Skeleton width="100%" height={42} />
                  </div>
                )}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      );
    };
    return <Inner />;
  },
};
