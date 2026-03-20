'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Page Components
import TimerPage from '@/app/page';
import LogPage from '@/app/log/page';
import GuidePage from '@/app/guide/page';

/**
 * SwipeNavigator Component
 * Implements a 300vw horizontal sliding layout for Timer, Log, and Guide pages.
 * Supports touch swipes, mouse drags, and direction-locked vertical scrolling.
 */
export function SwipeNavigator() {
  const pathname = usePathname();
  const router = useRouter();

  const pages = [
    { path: '/', component: TimerPage },
    { path: '/log', component: LogPage },
    { path: '/guide', component: GuidePage },
  ];

  const getPageIndex = useCallback((path: string) => {
    const index = pages.findIndex((p) => p.path === path);
    return index === -1 ? 0 : index;
  }, []);

  const [currentPage, setCurrentPage] = useState(getPageIndex(pathname));
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDelta, setSwipeDelta] = useState(0);
  const [directionLocked, setDirectionLocked] = useState<'horizontal' | 'vertical' | null>(null);

  const startX = useRef(0);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInternalNavigation = useRef(false);

  // Sync state with URL changes (from nav buttons)
  useEffect(() => {
    const index = getPageIndex(pathname);
    if (index !== currentPage) {
      setCurrentPage(index);
    }
  }, [pathname, getPageIndex, currentPage]);

  // Sync URL with state changes (from swipes)
  useEffect(() => {
    if (isInternalNavigation.current) {
      router.push(pages[currentPage].path);
      isInternalNavigation.current = false;
    }
  }, [currentPage, router]);

  const handleStart = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    setIsSwiping(true);
    setDirectionLocked(null);
  };

  const handleMove = (clientX: number, clientY: number, e?: TouchEvent | React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;

    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;

    // Determine direction lock on first significant move
    if (!directionLocked) {
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          setDirectionLocked('horizontal');
        } else {
          setDirectionLocked('vertical');
        }
      }
      return;
    }

    if (directionLocked === 'vertical') return;

    // If horizontal, suppress vertical scroll
    if (e && 'preventDefault' in e && typeof e.preventDefault === 'function') {
      try { e.preventDefault(); } catch (err) {}
    }

    // Resistance at edges
    let adjustedDelta = deltaX;
    if ((currentPage === 0 && deltaX > 0) || (currentPage === pages.length - 1 && deltaX < 0)) {
      adjustedDelta = deltaX * 0.3;
    }
    setSwipeDelta(adjustedDelta);
  };

  const handleEnd = () => {
    if (!isSwiping) return;

    if (directionLocked === 'horizontal') {
      const threshold = 80;
      if (swipeDelta < -threshold && currentPage < pages.length - 1) {
        isInternalNavigation.current = true;
        setCurrentPage((p) => p + 1);
      } else if (swipeDelta > threshold && currentPage > 0) {
        isInternalNavigation.current = true;
        setCurrentPage((p) => p - 1);
      }
    }

    setIsSwiping(false);
    setSwipeDelta(0);
    setDirectionLocked(null);
  };

  // Event Listeners
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY, e);
  const onTouchEnd = () => handleEnd();

  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleGlobalMouseUp = () => handleEnd();

    if (isSwiping) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isSwiping, handleMove, handleEnd]);

  const translateX = `calc(-${currentPage * 100}vw + ${swipeDelta}px)`;

  return (
    <div 
      className="relative w-full h-full overflow-hidden touch-none"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Sliding Content Container */}
      <div 
        className={cn(
          "flex w-[300vw] h-full will-change-transform",
          !isSwiping && "transition-transform duration-700 ease-reveal"
        )}
        style={{ transform: `translateX(${translateX})` }}
      >
        {pages.map((page, idx) => (
          <div key={page.path} className="w-[100vw] h-full overflow-y-auto px-4 py-8">
            <div className="container mx-auto">
              <page.component />
            </div>
          </div>
        ))}
      </div>

      {/* Visual Navigation Indicators */}
      {!isSwiping && (
        <>
          {currentPage > 0 && (
            <div className="fixed left-2 top-1/2 -translate-y-1/2 z-40 pointer-events-none opacity-50 animate-pulse-slow">
              <ChevronLeft className="w-8 h-8 text-primary" />
              <span className="sr-only">Swipe for previous page</span>
            </div>
          )}
          {currentPage < pages.length - 1 && (
            <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 pointer-events-none opacity-50 animate-pulse-slow">
              <ChevronRight className="w-8 h-8 text-primary" />
              <span className="sr-only">Swipe for next page</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
