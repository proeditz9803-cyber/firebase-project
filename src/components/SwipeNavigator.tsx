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
 * Implements a 300vw horizontal sliding layout with parallel animations.
 * Features parallax content offsets, opacity cross-fades, and synchronized indicators.
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

  const [currentPage, setCurrentPage] = useState(() => getPageIndex(pathname));
  const [liveDelta, setLiveDelta] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Gesture tracking refs
  const startX = useRef(0);
  const startY = useRef(0);
  const currentDelta = useRef(0);
  const isGestureActive = useRef(false);
  const directionLocked = useRef<'horizontal' | 'vertical' | null>(null);
  
  // Navigation source tracking ref to prevent double-animation bug
  const navigationSource = useRef<'swipe' | 'external' | ''>('');
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronize state with URL changes (authoritative guard)
  useEffect(() => {
    // If navigation was initiated by a swipe or arrow click, skip the redundant state update
    if (navigationSource.current === 'swipe') {
      navigationSource.current = '';
      return;
    }

    // Mark as external navigation (from top nav bar)
    navigationSource.current = 'external';

    const index = getPageIndex(pathname);
    if (index !== currentPage) {
      setCurrentPage(index);
    }

    // Reset source after processing
    navigationSource.current = '';
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
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
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
        // Set authoritative source BEFORE updating state and URL
        navigationSource.current = 'swipe';
        setCurrentPage(nextIndex);
        router.push(pages[nextIndex].path);
      }
    }

    // Synchronously batch cleanup and visual reset
    isGestureActive.current = false;
    directionLocked.current = null;
    currentDelta.current = 0;
    setLiveDelta(0);
  }, [currentPage, pages, router]);

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
    // Mark as swipe (internal) to prevent double trigger on arrow click
    navigationSource.current = 'swipe';
    setCurrentPage(index);
    router.push(pages[index].path);
  };

  const isSwiping = liveDelta !== 0;
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
        {pages.map((page, index) => {
          // Parallel Animation Calculation:
          const offsetFromCenter = (index - currentPage) * (windowWidth || 1) + liveDelta;
          const normalizedDistance = Math.abs(offsetFromCenter) / (windowWidth || 1);
          
          // Layered Effects:
          const opacity = Math.max(0, 1 - normalizedDistance * 1.5);
          const parallaxShift = (index - currentPage) * (windowWidth * 0.1) + (liveDelta * 0.15);

          return (
            <div 
              key={page.path} 
              className="w-[100vw] h-full overflow-y-auto px-4 py-8 will-change-[transform,opacity]"
              style={{ opacity }}
            >
              <div 
                className={cn(
                  "container mx-auto will-change-transform",
                  !isSwiping && "transition-transform duration-700 ease-reveal"
                )}
                style={{ transform: `translateX(${parallaxShift}px)` }}
              >
                <page.component />
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Navigation Indicators - Positioned absolutely */}
      <div className="pointer-events-none absolute inset-0 z-[50]">
        {/* Left Indicator */}
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 will-change-[transform,opacity] transition-all duration-700 ease-reveal",
            currentPage === 0 ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0",
            isSwiping ? "opacity-30 scale-90" : "animate-pulse-slow hover:opacity-100 hover:scale-110"
          )}
          aria-label="Previous Page"
          disabled={currentPage === 0}
        >
          <ChevronLeft className="w-8 h-8 text-primary" />
        </button>

        {/* Right Indicator */}
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 will-change-[transform,opacity] transition-all duration-700 ease-reveal",
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