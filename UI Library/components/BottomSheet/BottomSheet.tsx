import React from 'react';
import '../../foundations/tokens.css';
import { BOTTOM_SHEET, DISMISS_THRESHOLD, SHEET_Z_INDEX } from './tokens';
import './BottomSheet.css';

export interface BottomSheetProps {
  /** Whether the sheet is raised */
  open: boolean;
  /** Called when the sheet should close — scrim click, Escape, or a drag past the threshold */
  onClose: () => void;
  /** Sheet content */
  children?: React.ReactNode;
  /** Optional title rendered above the content */
  title?: string;
  /** Show the drag handle. Hiding it also disables drag-to-dismiss. */
  showHandle?: boolean;
  /** Dim the page behind the sheet */
  showScrim?: boolean;
  /** Render inside its parent rather than the viewport — for stories and embedded demos */
  contained?: boolean;
  /** Accessible name when there is no visible title */
  'aria-label'?: string;
  /** Additional className */
  className?: string;
}

/**
 * BottomSheet — Lotteryplus Design System
 *
 * Figma group `colors/bottom sheet` (5 tokens). A panel that rises from the bottom edge;
 * on a mobile-first product it is the primary way to present a choice without leaving
 * the page.
 *
 * Dismissal has three routes, because a sheet that can only be closed one way strands
 * someone: drag it down past the threshold, click the scrim, or press Escape.
 */
const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
  title,
  showHandle = true,
  showScrim = true,
  contained = false,
  'aria-label': ariaLabel,
  className = '',
}) => {
  const [dragY, setDragY] = React.useState(0);
  const dragStart = React.useRef<number | null>(null);

  // Escape closes. Bound while open only, so a page with several sheets is unambiguous.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) setDragY(0);
  }, [open]);

  const startDrag = (y: number) => {
    if (!showHandle) return;
    dragStart.current = y;
  };

  const moveDrag = (y: number) => {
    if (dragStart.current === null) return;
    // Downward only — dragging up should not lift the sheet past its own top edge.
    setDragY(Math.max(0, y - dragStart.current));
  };

  const endDrag = () => {
    if (dragStart.current === null) return;
    const travelled = dragY;
    dragStart.current = null;
    setDragY(0);
    if (travelled > DISMISS_THRESHOLD) onClose();
  };

  const position = contained ? 'absolute' : 'fixed';

  return (
    <React.Fragment>
      {showScrim && (
        <div
          className={`ltp-sheet__scrim ${open ? 'ltp-sheet__scrim--open' : ''}`}
          onClick={onClose}
          aria-hidden="true"
          style={{
            position,
            inset: 0,
            zIndex: SHEET_Z_INDEX - 1,
            background: BOTTOM_SHEET.scrim,
            pointerEvents: open ? 'auto' : 'none',
            transitionDuration: BOTTOM_SHEET.transitionDuration,
            transitionTimingFunction: BOTTOM_SHEET.transitionTiming,
          }}
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        aria-hidden={!open}
        className={`ltp-sheet ${open ? 'ltp-sheet--open' : ''} ${className}`}
        style={{
          position,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: SHEET_Z_INDEX,
          background: BOTTOM_SHEET.background,
          color: BOTTOM_SHEET.foreground,
          borderTopLeftRadius: BOTTOM_SHEET.radiusTop,
          borderTopRightRadius: BOTTOM_SHEET.radiusTop,
          transform: open ? `translateY(${dragY}px)` : 'translateY(100%)',
          // No transition while the finger is down, or the sheet lags behind the drag.
          transitionDuration: dragStart.current === null ? BOTTOM_SHEET.transitionDuration : '0s',
          transitionTimingFunction: BOTTOM_SHEET.transitionTiming,
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        {showHandle && (
          <div
            className="ltp-sheet__handle-area"
            role="button"
            tabIndex={0}
            aria-label="ลากลงเพื่อปิด"
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: BOTTOM_SHEET.handlePaddingY,
              paddingBottom: BOTTOM_SHEET.handlePaddingY,
              paddingLeft: BOTTOM_SHEET.handlePaddingX,
              paddingRight: BOTTOM_SHEET.handlePaddingX,
            }}
            onMouseDown={(e) => startDrag(e.clientY)}
            onMouseMove={(e) => moveDrag(e.clientY)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => startDrag(e.touches[0].clientY)}
            onTouchMove={(e) => moveDrag(e.touches[0].clientY)}
            onTouchEnd={endDrag}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClose();
              }
            }}
          >
            <span
              className="ltp-sheet__handle"
              style={{
                width: BOTTOM_SHEET.handleWidth,
                height: BOTTOM_SHEET.handleHeight,
                borderRadius: BOTTOM_SHEET.handleRadius,
                background: BOTTOM_SHEET.handle,
              }}
            />
          </div>
        )}

        <div
          className="ltp-sheet__content"
          style={{
            maxHeight: BOTTOM_SHEET.maxHeight,
            overflowY: 'auto',
            paddingLeft: BOTTOM_SHEET.paddingX,
            paddingRight: BOTTOM_SHEET.paddingX,
            paddingBottom: BOTTOM_SHEET.paddingBottom,
            paddingTop: showHandle ? 0 : BOTTOM_SHEET.paddingX,
          }}
        >
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BottomSheet;
