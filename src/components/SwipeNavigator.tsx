'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import useScrollReveal from '@/hooks/useScrollReveal';

interface SwipeNavigatorProps {
  pageNodes: React.ReactNode[];
}

export function SwipeNavigator({ pageNodes }: SwipeNavigatorProps) {
  const pathname = usePathname();
  const router = useRouter();

  const pages = useMemo(() => [
    { path: '/', label: 'Page one' },
    { path: '/log', label: 'Page two' },
    { path: '/guide', label: 'Page three' },
  ], []);

  const getPageIndex = useCallback((path: string) => {
    const index = pages.findIndex((p) => p.path === path);
    return index === -1 ? 0 : index;
  }, [pages]);

  const [currentPage, setCurrentPage] = useState(() => getPageIndex(pathname));
  const [liveDelta, setLiveDelta] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward' | 'none'>('none');
  const [screenWidth, setScreenWidth] = useState(0);

  const [controlsRef, controlsVisible] = useScrollReveal({ delay: 300 });

  const startX = useRef(0);
  const startY = useRef(0);
  const currentDelta = useRef(0);
  const isGestureActive = useRef(false);
  const directionLocked = useRef<'horizontal' | 'vertical' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigationSource = useRef<'internal' | 'external' | ''>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (navigationSource.current === 'internal') {
      navigationSource.current = '';
      return;
    }
    const index = getPageIndex(pathname);
    if (index !== currentPage) {
      setCurrentPage(index);
    }
  }, [pathname, getPageIndex, currentPage]);

  const commitPageTransition = useCallback((targetIndex: number) => {
    if (isTransitioning || targetIndex === currentPage || targetIndex < 0 || targetIndex >= pages.length) return;

    navigationSource.current = 'internal';
    const direction = targetIndex > currentPage ? 'forward' : 'backward';

    setTransitionDirection(direction);
    setIsTransitioning(true);
    setCurrentPage(targetIndex);
    setLiveDelta(0);

    const targetPath = pages[targetIndex].path;
    router.replace(targetPath);
  }, [currentPage, isTransitioning, pages, router]);

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
      adjustedDelta = deltaX * 0.3;
    }

    currentDelta.current = adjustedDelta;
    setLiveDelta(adjustedDelta);
  }, [currentPage, pages.length, isTransitioning]); const handleEnd = useCallback(() => {
    if (!isGestureActive.current) return;

    if (directionLocked.current === 'horizontal') {
      const threshold = 80;
      const delta = currentDelta.current;

      if (delta < -threshold && currentPage < pages.length - 1) {
        commitPageTransition(currentPage + 1);
      } else if (delta > threshold && currentPage > 0) {
        commitPageTransition(currentPage - 1);
      } else {
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

        const isOutgoing = (isForward && i === currentPage - 1) || (isBackward && i === currentPage + 1);

        let zIndex = 0;
        let transform = i < currentPage ? 'translateX(-100vw)' : 'translateX(100vw)';
        let shadow = 'none';
        let pointerEvents: 'auto' | 'none' = 'none';

        const isSwiping = liveDelta !== 0;
        const transitionStyle = isSwiping ? 'none' : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)';

        if (isActive) {
          zIndex = 2;
          pointerEvents = 'auto';

          if (isSwiping) {
            transform = `translateX(${liveDelta}px) scale(1)`;
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
        } else {
          if (isSwiping) {
            const incomingTarget = liveDelta < 0 ? currentPage + 1 : currentPage - 1;
            if (i === incomingTarget) {
              zIndex = 2;
              const basePos = liveDelta < 0 ? screenWidth : -screenWidth;
              transform = `translateX(${basePos + liveDelta}px) scale(0.97)`;
              shadow = '0 8px 32px rgba(0,0,0,0.18)';
            }
          }
        }
return (
          <div
            key={page.path}
            className="absolute top-0 left-0 w-full h-full overflow-y-auto bg-background"
            style={{
              transform,
              zIndex,
              boxShadow: shadow,
              pointerEvents,
              transition: transitionStyle,
              willChange: 'transform'
            }}
            onTransitionEnd={isOutgoing ? handleTransitionEnd : undefined}
          >
            <div className="container mx-auto px-4 py-8">
              {pageNodes[i]}
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none fixed inset-0 z-[50]">
        <button
          onClick={() => commitPageTransition(currentPage - 1)}
          disabled={currentPage === 0 || isTransitioning}
          aria-label="Navigate to previous page"
          className={cn(
            "pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-[10px] border border-white/20 bg-white/10 backdrop-blur-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] group transition-all duration-250 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_6px_24px_rgba(0,0,0,0.18)] active:scale-[0.92] will-change-transform",
            currentPage === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100",
            controlsVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
          )}
          style={{ WebkitBackdropFilter: 'blur(12px)', transitionProperty: 'transform, opacity, background-color, border-color, box-shadow' }}
        >
          <ChevronLeft className="w-4 h-4 text-white stroke-[1.5] transition-transform duration-250 group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={() => commitPageTransition(currentPage + 1)}
          disabled={currentPage === pages.length - 1 || isTransitioning}
          aria-label="Navigate to next page"
          className={cn(
            "pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-[10px] border border-white/20 bg-white/10 backdrop-blur-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] group transition-all duration-250 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_6px_24px_rgba(0,0,0,0.18)] active:scale-[0.92] will-change-transform",
            currentPage === pages.length - 1 ? "opacity-20 cursor-not-allowed" : "opacity-100",
            controlsVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
          )}
          style={{ WebkitBackdropFilter: 'blur(12px)', transitionProperty: 'transform, opacity, background-color, border-color, box-shadow' }}
        >
          <ChevronRight className="w-4 h-4 text-white stroke-[1.5] transition-transform duration-250 group-hover:translate-x-0.5" />
        </button>
      </div>

      <div
        ref={controlsRef}
        className={cn(
          "fixed bottom-5 left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center gap-2.5 transition-all pointer-events-none",
          controlsVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
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