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
  }, [pages]);

  // Page index state for visual transition - drives the main slider position
  const [currentPage, setCurrentPage] = useState(getPageIndex(pathname));
  // liveDelta is the only state updated during active movement for minimal re-renders
  const [liveDelta, setLiveDelta] = useState(0);

  // Gesture tracking refs to ensure high-performance tracking and avoid stale closure issues
  const startX = useRef(0);
  const startY = useRef(0);
  const currentDelta = useRef(0);
  const isGestureActive = useRef(false);
  const directionLocked = useRef<'horizontal' | 'vertical' | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state with URL changes (e.g. from top navigation bar buttons)
  useEffect(() => {
    const index = getPageIndex(pathname);
    if (index !== currentPage) {
      setCurrentPage(index);
    }
  }, [pathname, getPageIndex, currentPage]);

  const handleStart = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    isGestureActive.current = true;
    directionLocked.current = null;
    currentDelta.current = 0;
  };

  const handleMove = useCallback((clientX: number, clientY: number, e?: TouchEvent | MouseEvent) => {
    if (!isGestureActive.current) return;

    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;

    // Determine direction lock on first significant move (10px threshold)
    if (directionLocked.current === null) {
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          directionLocked.current = 'horizontal';
        } else {
          directionLocked.current = 'vertical';
        }
      }
      return;
    }

    // If locked to vertical, let native scrolling take over
    if (directionLocked.current === 'vertical') return;

    // If locked to horizontal, suppress vertical scroll (requires { passive: false } on listener)
    if (e && e.cancelable) {
      e.preventDefault();
    }

    // Resistance at edges to communicate boundaries
    let adjustedDelta = deltaX;
    if ((currentPage === 0 && deltaX > 0) || (currentPage === pages.length - 1 && deltaX < 0)) {
      adjustedDelta = deltaX * 0.3;
    }
    
    currentDelta.current = adjustedDelta;
    setLiveDelta(adjustedDelta);
  }, [currentPage, pages.length]);

  const handleEnd = useCallback(() => {
    if (!isGestureActive.current) return;

    if (directionLocked.current === 'horizontal') {
      const threshold = 80;
      const delta = currentDelta.current;
      
      let nextIndex = currentPage;
      if (delta < -threshold && currentPage < pages.length - 1) {
        nextIndex = currentPage + 1;
      } else if (delta > threshold && currentPage > 0) {
        nextIndex = currentPage - 1;
      }

      if (nextIndex !== currentPage) {
        setCurrentPage(nextIndex);
        router.push(pages[nextIndex].path);
      }
    }

    // Reset all tracking variables
    isGestureActive.current = false;
    directionLocked.current = null;
    currentDelta.current = 0;
    setLiveDelta(0);
  }, [currentPage, pages, router]);

  // Imperative event listener attachment to handle { passive: false } for touchmove
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY, e);
    const onTouchEnd = () => handleEnd();

    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY, e);
    const onMouseUp = () => handleEnd();

    // Attach to container for local detection
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('mousedown', onMouseDown, { passive: true });
    
    // Attach to document for global follow-through (avoids "losing" the gesture on fast drags)
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('mousedown', onMouseDown);
      
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [handleMove, handleEnd]);

  const handlePageChange = (index: number) => {
    if (index < 0 || index >= pages.length) return;
    setCurrentPage(index);
    router.push(pages[index].path);
  };

  const isSwiping = liveDelta !== 0;
  // Calculate final transform based on current page + live drag offset
  const translateX = `calc(-${currentPage * 100}vw + ${liveDelta}px)`;

  return (
    <div 
      className="relative w-full h-full overflow-hidden touch-none"
      ref={containerRef}
    >
      {/* Sliding Content Container */}
      <div 
        className={cn(
          "flex w-[300vw] h-full will-change-transform",
          !isSwiping && "transition-transform duration-700 ease-reveal"
        )}
        style={{ transform: `translateX(${translateX})` }}
      >
        {pages.map((page) => (
          <div key={page.path} className="w-[100vw] h-full overflow-y-auto px-4 py-8">
            <div className="container mx-auto">
              <page.component />
            </div>
          </div>
        ))}
      </div>

      {/* Visual Navigation Indicators - Positioned absolutely as direct children of the outer container */}
      {!isSwiping && (
        <>
          {currentPage > 0 && (
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-[50] opacity-50 animate-pulse-slow pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 transition-all hover:opacity-100 hover:scale-110"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-8 h-8 text-primary" />
              <span className="sr-only">Go to previous page</span>
            </button>
          )}
          {currentPage < pages.length - 1 && (
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-[50] opacity-50 animate-pulse-slow pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 transition-all hover:opacity-100 hover:scale-110"
              aria-label="Next Page"
            >
              <ChevronRight className="w-8 h-8 text-primary" />
              <span className="sr-only">Go to next page</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
