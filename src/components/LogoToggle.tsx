'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * LogoToggle Component
 * Implements a premium "Letter Pop" reveal animation with precise 
 * synchronization between visual design changes and motion.
 */
export function LogoToggle() {
  // Separate animation trigger state from design toggle state
  const [isAnimating, setIsAnimating] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  
  // Refs for tracking animation lock and cleaning up timeouts
  const isAnimatingRef = useRef(false);
  const startToggledRef = useRef(false);
  const midpointTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logoText = "FasTrack";
  const letters = logoText.split("");
  const staggerDelay = 40; // 40ms stagger between letters
  const letterDuration = 200; // 200ms per letter animation
  
  // Dynamically calculate timing based on character count
  // midpoint = time when the last outgoing letter finishes its 200ms exit
  const midpoint = (letters.length - 1) * staggerDelay + letterDuration;
  const totalDuration = midpoint * 2 + 20; // total cycle time + 20ms buffer

  // Cleanup timeouts on unmount to prevent memory leaks or stale state updates
  useEffect(() => {
    return () => {
      if (midpointTimeoutRef.current) clearTimeout(midpointTimeoutRef.current);
      if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
    };
  }, []);

  const handleToggle = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    // Keyboard accessibility for Enter and Space keys
    if ('key' in e) {
      const ke = e as React.KeyboardEvent;
      if (ke.key !== 'Enter' && ke.key !== ' ') return;
      e.preventDefault();
    }

    // Prevent interruption during an active animation cycle
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    startToggledRef.current = isToggled;
    setIsAnimating(true);

    // Step 2: Trigger design change at the exact invisible midpoint seam
    midpointTimeoutRef.current = setTimeout(() => {
      setIsToggled(prev => !prev);
    }, midpoint);

    // Step 3: Reset animation state after the full cycle (outgoing + incoming) completes
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
          // Phase detection:
          // isExiting: We are animating and still have the 'start' design state
          // isEntering: We are animating and the state has flipped to the 'target' design state
          const isExiting = isAnimating && isToggled === startToggledRef.current;
          const isEntering = isAnimating && isToggled !== startToggledRef.current;
          const isLast = index === letters.length - 1;

          // Determine design classes based on the current toggle state
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
                // Ensure text clipping works correctly for the gradient text state
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
