import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MissionListPage from './MissionList';
import MissionDetailPage from './MissionDetail';
import AppShell from '../../../ui/patterns/AppShell/AppShell';
import DeviceFrame from '../../../ui/patterns/DeviceFrame/DeviceFrame';
import StatusBar from '../../../ui/components/StatusBar/StatusBar';
import Header from '../../../ui/components/Header/Header';
import Toast from '../../../ui/components/Toast/Toast';
import {
  MISSIONS_CLOSED,
  MISSIONS_DONE,
  MISSIONS_OPEN,
  MISSION_BANNER,
  MISSION_DETAIL_TITLE,
  MISSION_EMPTY,
  MISSION_FEATURE_TITLE,
  MISSION_TABS,
  detailFor,
  detailForClosed,
  isMissionDone,
  readyRungIndex,
  type ClosedMission,
  type LadderRung,
  type Mission,
} from '../fixtures';

// ═══════════════════════════════════════════
//  Prototype — ภารกิจคนจะรวย, tappable
//
//  The same components the pages are built from, wired to state so the flow can be walked
//  rather than described: tabs switch, a card opens its mission, the back arrow returns,
//  and a finished mission can actually be claimed — after which it is claimed, on both
//  screens, for the rest of the session.
//
//  What it does NOT invent: there is no claim sheet. MSN-300/330 has not been designed
//  yet, so claiming here flips the mission's state and says so, and the sheet stays an
//  honest gap rather than a screen made up to fill the demo.
// ═══════════════════════════════════════════

const meta: Meta = {
  title: 'Pages/Mission/Prototype กดได้',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 11,
      opacity: 0.6,
      marginBottom: 8,
      maxWidth: 380,
      lineHeight: 1.6,
    }}
  >
    {children}
  </div>
);

const Flow: React.FC = () => {
  const [tab, setTab] = React.useState<string>('open');
  const [openId, setOpenId] = React.useState<string | null>(null);
  /**
   * What has been collected during this run. A whole mission is kept as its id; a single
   * rung of a ladder as `id#index`, because a ladder pays out more than once and claiming
   * the second rung does not finish the climb.
   */
  const [claimed, setClaimed] = React.useState<string[]>([]);
  const [note, setNote] = React.useState<string | null>(null);

  const say = (text: string) => setNote(text);

  const withClaims = (m: Mission): Mission => {
    // A ladder advances instead of finishing: the rung just collected greys out, the card
    // starts leading with the next reward, and the climb carries on.
    if (m.shape === 'ladder' && m.rungs) {
      const rungs = (m.rungs as LadderRung[]).map((r, i) =>
        claimed.includes(`${m.id}#${i}`) ? { ...r, state: 'claimed' as const } : r,
      );
      const next = rungs.find((r) => r.state !== 'claimed');
      const waiting = rungs.some((r) => r.state === 'ready');
      const left = (next?.at ?? 0) - (m.current ?? 0);
      return {
        ...m,
        rungs,
        reward: next?.reward ?? m.reward,
        image: next?.image ?? m.image,
        kind: next?.kind ?? m.kind,
        tone: waiting ? 'ready' : 'doing',
        statusLabel: waiting
          ? m.statusLabel
          : next
            ? `อีก ${left.toLocaleString('en-US')} ${m.unit ?? ''} ถึงหมุดถัดไป`.trim()
            : 'รับครบทุกหมุดแล้ว',
      };
    }
    return claimed.includes(m.id)
      ? { ...m, tone: 'claimed', statusLabel: 'รับรางวัลแล้ว', daysLabel: undefined }
      : m;
  };

  // A mission claimed during this run stays in `สำเร็จแล้ว`; the two tabs never hold the
  // same mission at once.
  const open = MISSIONS_OPEN.map(withClaims);
  const done = MISSIONS_DONE.map(withClaims);

  const missions = tab === 'open' ? open : done;
  const closed: ClosedMission[] = tab === 'open' ? MISSIONS_CLOSED : [];

  const current = openId ? ([...open, ...done].find((m) => m.id === openId) ?? null) : null;
  const currentClosed = openId ? (MISSIONS_CLOSED.find((m) => m.id === openId) ?? null) : null;
  const detail = current ? detailFor(current) : currentClosed ? detailForClosed(currentClosed) : null;

  const onCta = () => {
    if (!current) return;
    // What counts as claimable differs by shape (prd §6.0), and a ladder can pay out with
    // the climb still unfinished — both questions are answered in fixtures so this screen
    // and the detail's own CTA can never disagree about the same mission.
    const rung = readyRungIndex(current);
    if (rung >= 0) {
      setClaimed((ids) => [...ids, `${current.id}#${rung}`]);
      say(`รับ ${current.rungs![rung].reward} เรียบร้อย`);
      return;
    }
    if (isMissionDone(current) && !claimed.includes(current.id)) {
      setClaimed((ids) => [...ids, current.id]);
      say(`รับ ${current.reward} เรียบร้อย`);
      return;
    }
    say('พาไปหน้าที่ทำภารกิจได้ (deep link)');
  };

  return (
    <DeviceFrame scroll homeIndicator={!detail}>
      <AppShell
        statusBar={<StatusBar />}
        topNavbar={
          <Header
            variant="sub"
            phoenix
            title={detail ? MISSION_DETAIL_TITLE : MISSION_FEATURE_TITLE}
            onBack={detail ? () => setOpenId(null) : () => say('กลับหน้าก่อนหน้า')}
          />
        }
      >
        {detail ? (
          <MissionDetailPage mission={detail} onCta={onCta} onLink={(label) => say(`ไปที่ ${label}`)} />
        ) : (
          <MissionListPage
            banner={MISSION_BANNER}
            bannerAlt={MISSION_FEATURE_TITLE}
            tabs={MISSION_TABS}
            activeTab={tab}
            onTabChange={setTab}
            missions={missions}
            closed={closed}
            empty={tab === 'open' ? MISSION_EMPTY.open : MISSION_EMPTY.done}
            onEmptyAction={() => say('กลับหน้าแรก')}
            onOpenMission={setOpenId}
          />
        )}

        {note && (
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, zIndex: 20 }}>
            {/* `caption` is passed empty on purpose: Toast defaults it to placeholder copy,
                and a one-line confirmation has nothing to add underneath. */}
            <Toast
              variant="solid"
              type="success"
              title={note}
              caption=""
              autoClose={2400}
              onClose={() => setNote(null)}
            />
          </div>
        )}
      </AppShell>
    </DeviceFrame>
  );
};

export const Prototype: StoryObj = {
  name: 'กดเล่นได้',
  render: () => (
    <div style={{ padding: 24 }}>
      <Caption>
        กดการ์ดเพื่อเข้ารายละเอียด · ลูกศรย้อนกลับพากลับมา · สลับแท็บได้ ·
        แท็บ “สำเร็จแล้ว” มี “ภารกิจคนน่ารัก” ที่ทำครบแล้ว กดรับรางวัลได้จริง ·
        ยังไม่มีหน้ายืนยันรับรางวัล (MSN-300/330) เพราะยังไม่ได้ออกแบบ — ตรงนั้นเว้นไว้ตามจริง
      </Caption>
      <Flow />
    </div>
  ),
};
