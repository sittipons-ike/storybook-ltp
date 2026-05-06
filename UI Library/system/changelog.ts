// ═══════════════════════════════════════════
// Design System Changelog
// UX/UI team อัพเดทที่นี่ → Dev (FE) เข้ามาดูและอัพเดทตาม
// ═══════════════════════════════════════════

export interface ChangelogEntry {
  version: string;
  date: string;
  author: string;
  authorRole: 'UX/UI' | 'Dev (FE)' | 'Design System';
  status: 'new' | 'updated' | 'breaking' | 'deprecated' | 'fixed';
  component: string;
  title: string;
  description: string;
  figmaLink?: string;
  devAction?: 'none' | 'update-required' | 'review-required' | 'new-component';
  devNotes?: string;
  completed?: boolean;
}

export const changelog: ChangelogEntry[] = [
  // ── Latest first ──
  {
    version: '7.1.5',
    date: '2026-03-30',
    author: 'Design System Team',
    authorRole: 'Design System',
    status: 'new',
    component: 'LottoBoard',
    title: 'เพิ่ม LottoBoard component set',
    description: 'เพิ่ม 4 sub-components: NumberSearchBox, MenuButton, SetSelect, SearchCard — ใช้สำหรับหน้าค้นหาเลขลอตเตอรี่',
    devAction: 'new-component',
    devNotes: 'SearchCard ประกอบจาก MenuButton + NumberSearchBox + SetSelect + Button',
    completed: false,
  },
  {
    version: '7.1.4',
    date: '2026-03-29',
    author: 'UX Team',
    authorRole: 'UX/UI',
    status: 'updated',
    component: 'Tabs',
    title: 'อัพเดท Badge position + Button padding',
    description: 'Badge ย้ายไปมุมบนขวาของ tab (absolute position) และ Button tab padding เปลี่ยนเป็น LR=16, TB=8',
    devAction: 'update-required',
    devNotes: 'Tabs.tsx และ tokens.ts ถูกอัพเดทแล้ว — ตรวจสอบ position: relative บน tab item',
    completed: true,
  },
  {
    version: '7.1.3',
    date: '2026-03-28',
    author: 'UX Team',
    authorRole: 'UX/UI',
    status: 'updated',
    component: 'NavigationBar',
    title: 'แก้ไข badge position + icon + แถบสีแดง',
    description: '1) Badge outline สำหรับตู้เซฟ 2) Badge ทับ icon มุมบนขวา 3) Gap ระหว่าง icon กับแถบสีแดง 4) แถบสีแดงมีความโค้งมน',
    devAction: 'update-required',
    devNotes: 'ตรวจสอบ NavigationBar.tsx — badge positioning, icon mapping, active indicator radius',
    completed: true,
  },
  {
    version: '7.1.2',
    date: '2026-03-27',
    author: 'Design System Team',
    authorRole: 'Design System',
    status: 'new',
    component: 'Multiple',
    title: 'เพิ่ม Toast, TextField, Breadcrumb, ProgressBar, RadioButton',
    description: 'เพิ่ม components ใหม่ 5 ตัวจาก Figma Design System',
    devAction: 'new-component',
    devNotes: 'แต่ละตัวมี tokens.ts + Component.tsx + Stories พร้อม Token Verification',
    completed: true,
  },
  {
    version: '7.1.1',
    date: '2026-03-26',
    author: 'UX Team',
    authorRole: 'UX/UI',
    status: 'updated',
    component: 'Modal',
    title: 'เพิ่ม Shadow + แก้ Typography variable',
    description: 'เพิ่ม DROP_SHADOW (dimension/shadow/md) บน Modal container และแก้ title typography จาก heading/h4-semb เป็น title/l-semb',
    devAction: 'update-required',
    devNotes: 'ตรวจสอบ boxShadow: SHADOW.md ใน Modal.tsx และ typography comments ใน tokens.ts',
    completed: true,
  },
  {
    version: '7.1.0',
    date: '2026-03-25',
    author: 'Design System Team',
    authorRole: 'Design System',
    status: 'new',
    component: 'Core',
    title: 'Initial Design System — Button, Modal, Dropdown, Tabs, Icon',
    description: 'สร้าง Design System แรกจาก Figma "Design Systems Web App Lotteryplus V.7.1" — 5 core components + Foundations (Colors, Typography, Spacing)',
    devAction: 'new-component',
    devNotes: 'ทุก component ผ่าน Token Verification ตรงกับ Figma',
    completed: true,
  },
];
