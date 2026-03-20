
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Page Components
import TimerPage from '@/app/page';
import LogPage from '@/app/log/page';
import GuidePage from '@/app/guide/page';

/**
 * SwipeNavigator Component
 * Standardized horizontal sliding layout that matches menu button animations.
 * Synchronizes with URL for active navigation highlights.
 */
export function SwipeNavigator() {
  const pathname = usePathname();
  const router = useRouter();

  const pages = useMemo(() => [
    { path: '/', component: TimerPage },
    { path: '/log', component: LogPage },
    { path: '/guide', component: GuidePage },
  ], []);

  const getPageIndex = useCallback((path: string) => {
    const index = pages.findIndex((p) => p.path === path);
    return index === -1 ? 0 : index;
  }, [pages]);

  const [currentPage, setCurrentPage] = useState(() => getPageIndex(pathname));
  const [liveDelta, setLiveDelta] = useState(0);

  // Gesture tracking refs
  const startX = useRef(0);
  const startY = useRef(0);
  const currentDelta = useRef(0);
  const isGestureActive = useRef(false);
  const directionLocked = useRef<'horizontal' | 'vertical' | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize state for external navigation (Top Nav clicks)
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

    if (directionLocked.current === null) {
      // Immediate engagement threshold (5px) for responsiveness
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          directionLocked.current = 'horizontal';
        } else {
          directionLocked.current = 'vertical';
        }
      }
      return;
    }

    if (directionLocked.current === 'vertical') return;

    if (e && e.cancelable) {
      e.preventDefault();
    }

    let adjustedDelta = deltaX;
    if ((currentPage === 0 && deltaX > 0) || (currentPage === pages.length - 1 && deltaX < 0)) {
      adjustedDelta = deltaX * 0.3; // Edge resistance
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
        // Update URL to trigger menu highlights
        router.replace(pages[nextIndex].path);
      }
    }

    isGestureActive.current = false;
    directionLocked.current = null;
    currentDelta.current = 0;
    setLiveDelta(0);
  }, [currentPage, pages.length, router]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY, e);
    const onTouchEnd = () => handleEnd();

    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY, e);
    const onMouseUp = () => handleEnd();

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('mousedown', onMouseDown, { passive: true });
    
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
    router.replace(pages[index].path);
  };

  const isSwiping = liveDelta !== 0;
  // Match the animation feel of the menu buttons
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
          !isSwiping && "transition-transform duration-600 ease-reveal"
        )}
        style={{ transform: `translateX(${translateX})` }}
      >
        {pages.map((page) => (
          <div 
            key={page.path} 
            className="w-[100vw] h-full overflow-y-auto px-4 py-8"
          >
            <div className="container mx-auto">
              <page.component />
            </div>
          </div>
        ))}
      </div>

      {/* Visual Navigation Indicators */}
      <div className="pointer-events-none absolute inset-0 z-[50]">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 transition-all duration-600 ease-reveal",
            currentPage === 0 ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0",
            isSwiping ? "opacity-30 scale-90" : "animate-pulse-slow hover:opacity-100 hover:scale-110"
          )}
          aria-label="Previous Page"
          disabled={currentPage === 0}
        >
          <ChevronLeft className="w-8 h-8 text-primary" />
        </button>

        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 transition-all duration-600 ease-reveal",
            currentPage === pages.length - 1 ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0",
            isSwiping ? "opacity-30 scale-90" : "animate-pulse-slow hover:opacity-100 hover:scale-110"
          )}
          aria-label="Next Page"
          disabled={currentPage === pages.length - 1}
        >
          <ChevronRight className="w-8 h-8 text-primary" />
        </button>
      </div>
    </div>
  );
}
