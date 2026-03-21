'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import useScrollReveal from '@/hooks/useScrollReveal';

// Import Page Components
import TimerPage from '@/app/page';
import LogPage from '@/app/log/page';
import GuidePage from '@/app/guide/page';

/**
 * SwipeNavigator Component
 * Implements a premium "Card Swipe" navigation system where each page behaves as an independent card.
 * Features simultaneous translation, depth scaling, and elevated shadowing.
 */
export function SwipeNavigator() {
  const pathname = usePathname();
  const router = useRouter();

  const pages = useMemo(() => [
    { path: '/', component: TimerPage, label: 'Page one' },
    { path: '/log', component: LogPage, label: 'Page two' },
    { path: '/guide', component: GuidePage, label: 'Page three' },
  ], []);

  const getPageIndex = useCallback((path: string) => {
    const index = pages.findIndex((p) => p.path === path);
    return index === -1 ? 0 : index;
  }, [pages]);

  // Persistent States
  const [currentPage, setCurrentPage] = useState(() => getPageIndex(pathname));
  const [liveDelta, setLiveDelta] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward' | 'none'>('none');
  const [screenWidth, setScreenWidth] = useState(0);
  
  // Entrance reveal hook for the new bottom controls
  const [controlsRef, controlsVisible] = useScrollReveal({ delay: 300 });

  // Gesture tracking refs
  const startX = useRef(0);
  const startY = useRef(0);
  const currentDelta = useRef(0);
  const isGestureActive = useRef(false);
  const directionLocked = useRef<'horizontal' | 'vertical' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigationSource = useRef<'swipe' | 'external' | ''>('');

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronize state for external navigation (Top Nav clicks)
  useEffect(() => {
    if (navigationSource.current === 'swipe') {
      navigationSource.current = '';
      return;
    }
    const index = getPageIndex(pathname);
    if (index !== currentPage) {
      setCurrentPage(index);
    }
  }, [pathname, getPageIndex, currentPage]);

  /**
   * Authoritative source of truth for committing a page transition.
   * Shared by gestures, bottom buttons, and side indicators.
   */
  const commitPageTransition = useCallback((targetIndex: number) => {
    if (isTransitioning || targetIndex === currentPage || targetIndex < 0 || targetIndex >= pages.length) return;
    
    navigationSource.current = 'swipe';
    const direction = targetIndex > currentPage ? 'forward' : 'backward';
    
    // Batch updates to trigger a single re-render for the animation
    setTransitionDirection(direction);
    setIsTransitioning(true);
    setCurrentPage(targetIndex);
    setLiveDelta(0);
  }, [currentPage, isTransitioning, pages.length]);

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
      // Immediate engagement threshold (5px)
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
      
      if (delta < -threshold && currentPage < pages.length - 1) {
        commitPageTransition(currentPage + 1);
      } else if (delta > threshold && currentPage > 0) {
        commitPageTransition(currentPage - 1);
      } else {
        // Snap back
        setIsTransitioning(true);
        setLiveDelta(0);
        setTransitionDirection('none');
      }
    }

    isGestureActive.current = false;
    directionLocked.current = null;
    currentDelta.current = 0;
  }, [currentPage, pages.length, commitPageTransition]);

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

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[calc(100vh-64px)] overflow-hidden touch-none"
    >
      {pages.map((page, i) => {
        const isActive = i === currentPage;
        const isForward = transitionDirection === 'forward';
        const isBackward = transitionDirection === 'backward';
        
        // Identify the outgoing card (the one sliding away)
        const isOutgoing = (isForward && i === currentPage - 1) || (isBackward && i === currentPage + 1);
        const isVisibleAsIncoming = (isForward && i === currentPage) || (isBackward && i === currentPage);
        
        let zIndex = 0;
        let opacity = 1;
        let transform = i < currentPage ? 'translateX(-100vw)' : 'translateX(100vw)';
        let shadow = 'none';
        let pointerEvents: 'auto' | 'none' = 'none';
        
        // Standardized transition for non-gesture events
        const isSwiping = liveDelta !== 0;
        const transitionStyle = isSwiping ? 'none' : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)';

        if (isActive) {
          zIndex = 2; // Incoming card is on top
          pointerEvents = 'auto';
          
          if (isSwiping) {
            const offset = isForward ? `calc(100vw + ${liveDelta}px)` : `calc(-100vw + ${liveDelta}px)`;
            const scale = 0.97 + (Math.abs(liveDelta) / screenWidth * 0.03); 
            transform = `translateX(${offset}) scale(${Math.min(1, scale)})`;
            shadow = '0 8px 32px rgba(0,0,0,0.18)';
          } else if (isTransitioning) {
            transform = 'translateX(0) scale(1)';
            shadow = '0 8px 32px rgba(0,0,0,0.18)';
          } else {
            transform = 'translateX(0) scale(1)';
          }
        } else if (isOutgoing) {
          zIndex = 1;
          if (isSwiping) {
            const scale = 1 - (Math.abs(liveDelta) / screenWidth * 0.05); 
            transform = `translateX(${liveDelta}px) scale(${Math.max(0.95, scale)})`;
          } else if (isTransitioning) {
            const offset = isForward ? '-100vw' : '100vw';
            transform = `translateX(${offset}) scale(0.95)`;
          } else {
            const offset = i < currentPage ? '-100vw' : '100vw';
            transform = `translateX(${offset}) scale(0.95)`;
          }
        }

        return (
          <div 
            key={page.path}
            className="absolute top-0 left-0 w-full h-full overflow-y-auto bg-background"
            style={{ 
              transform, 
              zIndex, 
              opacity, 
              boxShadow: shadow, 
              pointerEvents,
              transition: transitionStyle,
              willChange: 'transform'
            }}
            onTransitionEnd={isOutgoing ? handleTransitionEnd : undefined}
          >
            <div className="container mx-auto px-4 py-8">
              <page.component />
            </div>
          </div>
        );
      })}

      {/* Side Navigation Indicators (Pulsing Arrows) */}
      <div className="pointer-events-none absolute inset-0 z-[40]">
        <button 
          onClick={() => commitPageTransition(currentPage - 1)}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 transition-all duration-700 ease-reveal",
            currentPage === 0 ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0",
            (isTransitioning) ? "opacity-30 scale-90" : "animate-pulse-slow hover:opacity-100 hover:scale-110"
          )}
          aria-label="Previous Page"
          disabled={currentPage === 0 || isTransitioning}
        >
          <ChevronLeft className="w-8 h-8 text-primary" />
        </button>

        <button 
          onClick={() => commitPageTransition(currentPage + 1)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2 bg-background/20 transition-all duration-700 ease-reveal",
            currentPage === pages.length - 1 ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0",
            (isTransitioning) ? "opacity-30 scale-90" : "animate-pulse-slow hover:opacity-100 hover:scale-110"
          )}
          aria-label="Next Page"
          disabled={currentPage === pages.length - 1 || isTransitioning}
        >
          <ChevronRight className="w-8 h-8 text-primary" />
        </button>
      </div>

      {/* NEW: Bottom Frosted Controls & Indicators */}
      <div 
        ref={controlsRef}
        className={cn(
          "fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center gap-2.5 transition-all",
          controlsVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        {/* Navigation Button Pair */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => commitPageTransition(currentPage - 1)}
            disabled={currentPage === 0 || isTransitioning}
            aria-label="Navigate to previous page"
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-[10px] border border-white/25 bg-background/15 backdrop-blur-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] group transition-all duration-250 hover:bg-background/30 hover:border-white/50 hover:shadow-[0_6px_24px_rgba(0,0,0,0.18)] active:scale-[0.92] will-change-transform",
              currentPage === 0 ? "opacity-20 pointer-events-none" : "opacity-100"
            )}
            style={{ WebkitBackdropFilter: 'blur(12px)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white stroke-[1.5] transition-transform duration-250 group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={() => commitPageTransition(currentPage + 1)}
            disabled={currentPage === pages.length - 1 || isTransitioning}
            aria-label="Navigate to next page"
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-[10px] border border-white/25 bg-background/15 backdrop-blur-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] group transition-all duration-250 hover:bg-background/30 hover:border-white/50 hover:shadow-[0_6px_24px_rgba(0,0,0,0.18)] active:scale-[0.92] will-change-transform",
              currentPage === pages.length - 1 ? "opacity-20 pointer-events-none" : "opacity-100"
            )}
            style={{ WebkitBackdropFilter: 'blur(12px)' }}
          >
            <ChevronRight className="w-4 h-4 text-white stroke-[1.5] transition-transform duration-250 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Page Indicator Dots */}
        <div className="flex items-center gap-1.5" aria-label="Page indicator">
          {pages.map((p, idx) => (
            <div
              key={p.path}
              aria-label={p.label}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentPage === idx 
                  ? "w-5 bg-white opacity-100" 
                  : "w-1.5 bg-white opacity-25"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
