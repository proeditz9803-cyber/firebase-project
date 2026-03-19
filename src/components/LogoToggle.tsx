'use client';

import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

/**
 * LogoToggle Component
 * Implements a premium "Letter Pop" reveal animation where characters
 * cascade out downwards and pop back up in a staggered sequence.
 */
export function LogoToggle() {
  const [isProfessional, setIsProfessional] = useState(false);
  const [animPhase, setAnimPhase] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const isAnimating = useRef(false);

  const logoText = "FasTrack";
  const letters = logoText.split("");
  const staggerDelay = 40; // 40ms stagger between letters
  const letterDuration = 200; // 200ms per letter animation
  const phaseDuration = (letters.length - 1) * staggerDelay + letterDuration;

  const handleToggle = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    // Keyboard accessibility
    if ('key' in e) {
      const ke = e as React.KeyboardEvent;
      if (ke.key !== 'Enter' && ke.key !== ' ') return;
      e.preventDefault();
    }

    // Prevent interruption during active animation
    if (isAnimating.current) return;

    isAnimating.current = true;
    
    // Step 1: Start Exit Animation
    setAnimPhase('exiting');

    // Step 2: Swap state mid-way after exit completes
    setTimeout(() => {
      setIsProfessional((prev) => !prev);
      setAnimPhase('entering');

      // Step 3: Return to idle after enter completes
      setTimeout(() => {
        setAnimPhase('idle');
        isAnimating.current = false;
      }, phaseDuration);

    }, phaseDuration);

  }, [phaseDuration]);

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
          const isExiting = animPhase === 'exiting';
          const isEntering = animPhase === 'entering';
          const isIdle = animPhase === 'idle';
          const isLast = index === letters.length - 1;

          // Determine which color to show
          // If idle, show current state
          // If exiting, show old state
          // If entering, show new state
          let activeColorClass = "";
          if (isIdle) {
            activeColorClass = isProfessional 
              ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50" 
              : "text-primary";
          } else if (isExiting) {
            activeColorClass = isProfessional 
              ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50" 
              : "text-primary";
          } else {
            // Entering - show what it will become
            activeColorClass = !isProfessional 
              ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50" 
              : "text-primary";
          }

          return (
            <span
              key={`${index}-${isProfessional}-${animPhase}`}
              className={cn(
                "inline-block will-change-transform opacity-100",
                activeColorClass,
                isExiting && "animate-letter-out",
                isEntering && (isLast ? "animate-letter-in-snap" : "animate-letter-in"),
                // If we aren't animating, ensure they are visible at rest
                !isExiting && !isEntering && "opacity-100 translate-y-0"
              )}
              style={{
                animationDelay: `${index * staggerDelay}ms`,
                // Maintain width during gradient text clipping
                WebkitBackgroundClip: isProfessional || (isEntering && !isProfessional) || (isExiting && isProfessional) ? 'text' : 'unset'
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
