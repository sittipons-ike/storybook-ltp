import React, { useCallback, useEffect, useRef } from 'react';

export interface InfiniteScrollProps {
  /** Called when the sentinel scrolls into view and there is more to fetch. */
  loadMore: () => void;
  hasMore: boolean;
  /** While true the observer stays disconnected, so one scroll cannot fire twice. */
  loading: boolean;
  children: React.ReactNode;
  /** How far ahead of the end to fire, as an IntersectionObserver rootMargin. */
  rootMargin?: string;
  className?: string;
}

/**
 * InfiniteScroll — Lotteryplus Design System
 *
 * A `helper` in the Lark Standard's sense: a behaviour with no drawing, no variants and
 * no states. Figma has nothing to hold it, correctly — verified absent 2026-08-20.
 *
 * Built from the Frontend's `common/infinity-scroll` (3 call sites): a sentinel div after
 * the children, watched by an IntersectionObserver that calls `loadMore` on intersection.
 * Two things differ from the Frontend's copy, both bugs rather than choices:
 * the observer is disconnected on unmount, and `rootMargin` is exposed so a list can start
 * fetching before the user reaches the very bottom.
 */
const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  loading,
  children,
  rootMargin = '0px',
  className = '',
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) loadMore();
        },
        { rootMargin },
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore, rootMargin],
  );

  // The Frontend never disconnects, so an unmounted list keeps an observer alive.
  useEffect(() => () => observer.current?.disconnect(), []);

  return (
    <div className={className} data-testid="infinite-scroll">
      {children}
      <div ref={sentinelRef} aria-hidden />
    </div>
  );
};

export default InfiniteScroll;
