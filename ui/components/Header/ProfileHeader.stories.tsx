import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ProfileHeader from './ProfileHeader';
import { sys } from '../../foundations/tokens';
import { asset } from '../../foundations/asset';

// ═══════════════════════════════════════════
//  ProfileHeader — Figma `header-bar-profile-moblie` (14962:94338), 9 variants.
// ═══════════════════════════════════════════

const meta: Meta<typeof ProfileHeader> = {
  title: 'Components/Layout/ProfileHeader',
  component: ProfileHeader,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const PHOTO = asset('brand/phoenix-logo.png');

const Row: React.FC<{ label: string; sub?: string; children: React.ReactNode }> = ({
  label,
  sub,
  children,
}) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{label}</div>
    {sub && (
      <div style={{ fontSize: 11, fontFamily: mono, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
        {sub}
      </div>
    )}
    <div
      style={{
        width: 390,
        border: `1px solid ${sys('color-border-accent-gray-light')}`,
        borderRadius: sys('radius-lg'),
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  </div>
);

export const States: StoryObj = {
  name: 'All states',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 760 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>header-bar-profile-moblie</h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
        Figma แยกเป็น component set ของตัวเอง ไม่ใช่ <code style={{ fontFamily: mono }}>type</code> ของ{' '}
        <code style={{ fontFamily: mono }}>header-bar-mobile</code> — ที่นี่จึงแยกตาม 9 variant ของ Figma
        คือการผสมของ 3 อย่างที่ component นี้รับแยกกันอยู่แล้ว: มี id ไหม · โชว์ pill ไหม · มีตัวเลขแจ้งเตือนไหม
      </p>

      <Row label="login + no-active" sub="lottery · id + pill แสดง · hamburger">
        <ProfileHeader
          name="เศรษฐีจิ๊ดริดดด..."
          memberId="P6176XXX"
          avatarSrc={PHOTO}
          pillLabel="แสดง"
          pillIcon="outline-eye"
        />
      </Row>

      <Row label="login + view" sub="pill สลับเป็น ซ่อน · outline-document-copy โผล่ข้างรหัส">
        <ProfileHeader
          name="เศรษฐีจิ๊ดริดดด..."
          memberId="P6176XXX"
          avatarSrc={PHOTO}
          pillLabel="ซ่อน"
          pillIcon="outline-eye-off"
          showCopy
        />
      </Row>

      <Row label="login + actived" sub="เมนูเปิด · well สลับเป็น filled-close">
        <ProfileHeader
          name="เศรษฐีจิ๊ดริดดด..."
          memberId="P6176XXX"
          avatarSrc={PHOTO}
          pillLabel="แสดง"
          menuOpen
        />
      </Row>

      <Row label="login + noti-1" sub="nokplus · กระดิ่ง + badge">
        <ProfileHeader
          type="nokplus"
          name="เศรษฐีจิ๊ดริดดด..."
          memberId="P6176XXX"
          avatarSrc={PHOTO}
          pillLabel="แสดง"
          notiCount={2}
        />
      </Row>

      <Row label="login + noti-2" sub="nokplus · กระดิ่งเปล่า ไม่มีตัวเลข">
        <ProfileHeader
          type="nokplus"
          name="เศรษฐีจิ๊ดริดดด..."
          memberId="P6176XXX"
          avatarSrc={PHOTO}
          pillLabel="แสดง"
        />
      </Row>

      <Row label="no-log-in" sub="avatar เป็น guest + camera · ไม่มี id ไม่มี pill">
        <ProfileHeader name="ยินดีต้อนรับ" action="เข้าสู่ระบบ / สมัครสมาชิก" avatarEditable />
      </Row>

      <Row label="no-log-in + actived" sub="guest · เมนูเปิด · filled-close">
        <ProfileHeader
          name="ยินดีต้อนรับ"
          action="เข้าสู่ระบบ / สมัครสมาชิก"
          avatarEditable
          menuOpen
        />
      </Row>

      <Row label="no-log-in + noti" sub="nokplus · guest + badge">
        <ProfileHeader
          type="nokplus"
          name="ยินดีต้อนรับ"
          action="เข้าสู่ระบบ / สมัครสมาชิก"
          avatarEditable
          notiCount={2}
        />
      </Row>
    </div>
  ),
};

export const Anatomy: StoryObj = {
  name: '🔍 What Figma states',
  render: () => {
    const th: React.CSSProperties = {
      textAlign: 'left',
      padding: '7px 12px',
      fontSize: 11,
      fontWeight: 600,
      color: sys('color-text-tertiary-default'),
      borderBottom: `2px solid ${sys('color-border-accent-gray-soft-light')}`,
    };
    const td: React.CSSProperties = {
      padding: '6px 12px',
      borderBottom: `1px solid ${sys('color-background-light')}`,
      fontSize: 12.5,
      verticalAlign: 'top',
    };
    const rows: [string, string][] = [
      ['frame', '390×72 · padding 0/16 · gap 8 · topfoot-bg-red'],
      ['avatar', '56 — a 1.4× instance of the 40px base'],
      ['stack', 'padding 2 vertical · gap 6'],
      ['name', '16/24 Semibold + a 20px arrow-right-S — signed-in variants only'],
      ['meta row', '12/18 Regular · gap 4'],
      ['copy id', '16px outline-document-copy between the id and the pill — state=login+view only'],
      ['show/hide pill', 'height 20 · padding 0/8 · gap 4 · radius full · profile-fg-dark-red'],
      ['right well — lottery', '36×36 tertiary button carrying filled-navigation'],
      ['right well — lottery, actived', 'the same well carrying filled-close'],
      ['right well — nokplus', '32px outline-notification + a 16px white badge, count 10/18'],
      ['guest avatar', 'a 22px filled-user, drawn inside the avatar instance — Avatar owns it'],
    ];
    return (
      <div style={{ fontFamily: sans, maxWidth: 780 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Measured, not estimated</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
          อ่านจาก 14962:94338 ทั้ง 9 variant เมื่อ 2026-08-19 · icon ทุกตัวอ่านซ้ำ 2026-08-21
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>ส่วน</th>
              <th style={th}>Figma</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b]) => (
              <tr key={a}>
                <td style={{ ...td, fontFamily: mono, color: sys('color-primary-default') }}>{a}</td>
                <td style={{ ...td, fontFamily: mono, fontSize: 11.5 }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
