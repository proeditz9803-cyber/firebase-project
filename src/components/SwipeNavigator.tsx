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
 * Implements a premium "Card Swipe" navigation system where each page behaves as an independent card.
 * Transitions incorporate simultaneous translation, scaling, and shadowing for a high-end feel.
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward' | 'none'>('none');
  const [isSwiping, setIsSwiping] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (isTransitioning) return;
    startX.current = clientX;
    startY.current = clientY;
    isGestureActive.current = true;
    directionLocked.current = null;
    currentDelta.current = 0;
  };

  const handleMove = useCallback((clientX: number, clientY: number, e?: TouchEvent | MouseEvent) => {
    if (!isGestureActive.current || isTransitioning) return;

    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;

    if (directionLocked.current === null) {
      // Immediate engagement threshold (5px) for responsiveness
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          directionLocked.current = 'horizontal';
          setIsSwiping(true);
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
    // Edge resistance (0.3 factor)
    if ((currentPage === 0 && deltaX > 0) || (currentPage === pages.length - 1 && deltaX < 0)) {
      adjustedDelta = deltaX * 0.3;
    }
    
    currentDelta.current = adjustedDelta;
    setLiveDelta(adjustedDelta);
    if (adjustedDelta < 0) setTransitionDirection('forward');
    else if (adjustedDelta > 0) setTransitionDirection('backward');
    else setTransitionDirection('none');
  }, [currentPage, pages.length, isTransitioning]);

  const handleEnd = useCallback(() => {
    if (!isGestureActive.current) return;

    if (directionLocked.current === 'horizontal') {
      const threshold = 80;
      const delta = currentDelta.current;
      
      let nextIndex = currentPage;
      if (delta < -threshold && currentPage < pages.length - 1) {
        nextIndex = currentPage + 1;
        setTransitionDirection('forward');
      } else if (delta > threshold && currentPage > 0) {
        nextIndex = currentPage - 1;
        setTransitionDirection('backward');
      }

      setIsTransitioning(true);
      if (nextIndex !== currentPage) {
        setCurrentPage(nextIndex);
      } else {
        // Snap back if threshold not met
        setLiveDelta(0);
        setTransitionDirection('none');
        if (delta !== 0) {
          setIsTransitioning(true);
        } else {
          setIsTransitioning(false);
        }
      }
    }

    isGestureActive.current = false;
    directionLocked.current = null;
    currentDelta.current = 0;
    setIsSwiping(false);
  }, [currentPage, pages.length]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    setTransitionDirection('none');
    setLiveDelta(0);
  };

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
    if (index < 0 || index >= pages.length || isTransitioning) return;
    setIsTransitioning(true);
    setTransitionDirection(index > currentPage ? 'forward' : 'backward');
    setCurrentPage(index);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden touch-none"
      ref={containerRef}
    >
      {pages.map((page, i) => {
        const isActive = i === currentPage;
        const isForward = transitionDirection === 'forward';
        const isBackward = transitionDirection === 'backward';
        const isOutgoing = (isForward && i === currentPage - 1) || (isBackward && i === currentPage + 1);
        
        let zIndex = 0;
        let opacity = 0;
        let transform = i < currentPage ? 'translateX(-100%)' : 'translateX(100%)';
        let shadow = 'none';
        let pointerEvents: 'auto' | 'none' = 'none';

        // Normalized progress [0, 1]
        const p = screenWidth ? Math.min(1, Math.abs(liveDelta) / screenWidth) : 0;

        if (isActive) {
          zIndex = 2; // Incoming card is on top
          opacity = 1;
          pointerEvents = 'auto';
          
          if (isSwiping) {
            const offset = isForward ? `calc(100vw + ${liveDelta}px)` : `calc(-100vw + ${liveDelta}px)`;
            const scale = 0.97 + (p * 0.03); // Scale up from 0.97 to 1
            transform = `translateX(${offset}) scale(${scale})`;
            shadow = '0 8px 32px rgba(0,0,0,0.18)';
          } else if (isTransitioning) {
            transform = 'translateX(0) scale(1)';
            shadow = '0 8px 32px rgba(0,0,0,0.18)';
          } else {
            transform = 'translateX(0) scale(1)';
          }
        } else if (isOutgoing) {
          zIndex = 1;
          opacity = 1;
          if (isSwiping) {
            const scale = 1 - (p * 0.05); // Scale down from 1 to 0.95
            transform = `translateX(${liveDelta}px) scale(${scale})`;
          } else if (isTransitioning) {
            const offset = isForward ? '-100vw' : '100vw';
            transform = `translateX(${offset}) scale(0.95)`;
          } else {
            // Already exited
            const offset = i < currentPage ? '-100vw' : '100vw';
            transform = `translateX(${offset}) scale(0.95)`;
            opacity = 0;
          }
        }

        return (
          <div 
            key={page.path}
            className={cn(
              "absolute inset-0 w-full h-full overflow-y-auto will-change-transform bg-background",
              !isSwiping && "transition-all duration-700 ease-reveal"
            )}
            style={{ transform, zIndex, opacity, boxShadow: shadow, pointerEvents }}
            onTransitionEnd={isOutgoing ? handleTransitionEnd : undefined}
          >
            <div className="container mx-auto px-4 py-8">
              <page.component />
            </div>
          </div>
        );
      })}

      {/* Visual Navigation Indicators */}
      <div className="pointer-events-none absolute inset-0 z-[50]">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 transition-all duration-700 ease-reveal",
            currentPage === 0 ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0",
            (isSwiping || isTransitioning) ? "opacity-30 scale-90" : "animate-pulse-slow hover:opacity-100 hover:scale-110"
          )}
          aria-label="Previous Page"
          disabled={currentPage === 0 || isTransitioning}
        >
          <ChevronLeft className="w-8 h-8 text-primary" />
        </button>

        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 transition-all duration-700 ease-reveal",
            currentPage === pages.length - 1 ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0",
            (isSwiping || isTransitioning) ? "opacity-30 scale-90" : "animate-pulse-slow hover:opacity-100 hover:scale-110"
          )}
          aria-label="Next Page"
          disabled={currentPage === pages.length - 1 || isTransitioning}
        >
          <ChevronRight className="w-8 h-8 text-primary" />
        </button>
      </div>
    </div>
  );
}
