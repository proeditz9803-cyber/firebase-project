'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * LogoToggle Component
 * Implements a premium, slowed, and dramatic "Letter Pop" reveal animation.
 * Features precisely synchronized design swaps at the invisible midpoint.
 */
export function LogoToggle() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  
  const isAnimatingRef = useRef(false);
  const startToggledRef = useRef(false);
  const midpointTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logoText = "FasTrack";
  const letters = logoText.split("");
  
  // Refined timing for a more luxurious, dramatic experience
  const staggerDelay = 60;   // Increased from 40ms for more visible "drama"
  const letterDuration = 450; // Increased from 200ms for a "slowed" feel
  
  /**
   * Midpoint calculation:
   * Precisely synchronizes the visual state swap when all outgoing letters
   * are invisible, before the first incoming letter appears.
   */
  const midpoint = (letters.length * staggerDelay) + letterDuration;
  const totalDuration = (midpoint * 2) + 40; // Total cycle + safety buffer

  useEffect(() => {
    return () => {
      if (midpointTimeoutRef.current) clearTimeout(midpointTimeoutRef.current);
      if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
    };
  }, []);

  const handleToggle = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    if ('key' in e) {
      const ke = e as React.KeyboardEvent;
      if (ke.key !== 'Enter' && ke.key !== ' ') return;
      e.preventDefault();
    }

    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    startToggledRef.current = isToggled;
    setIsAnimating(true);

    // Step 2: Swap the design at the invisible seam (all letters vanished)
    midpointTimeoutRef.current = setTimeout(() => {
      setIsToggled(prev => !prev);
    }, midpoint);

    // Step 3: Re-enable interactions after the glorious landing is complete
    endTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
    }, totalDuration);

  }, [isToggled, midpoint, totalDuration]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Toggle FasTrack Logo Branding"
      onClick={handleToggle}
      onKeyDown={handleToggle}
      className="relative cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md h-10 w-32 sm:w-36 md:w-40 select-none ml-10 overflow-hidden flex items-center"
    >
      <div className="relative flex items-center font-bold text-xl sm:text-2xl tracking-tighter">
        {letters.map((char, index) => {
          // Phase synchronization logic
          const isExiting = isAnimating && isToggled === startToggledRef.current;
          const isEntering = isAnimating && isToggled !== startToggledRef.current;
          const isLast = index === letters.length - 1;

          // Design variant styles
          const activeColorClass = isToggled 
            ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50" 
            : "text-primary";

          return (
            <span
              key={`${index}-${isToggled}-${isAnimating}`}
              className={cn(
                "inline-block will-change-transform",
                activeColorClass,
                isExiting && "animate-letter-out",
                isEntering && (isLast ? "animate-letter-in-snap" : "animate-letter-in"),
                !isAnimating && "opacity-100 translate-y-0"
              )}
              style={{
                animationDelay: `${index * staggerDelay}ms`,
                WebkitBackgroundClip: isToggled ? 'text' : 'unset'
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
