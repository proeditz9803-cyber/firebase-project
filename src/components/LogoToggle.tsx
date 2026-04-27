'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * LogoToggle Component
 * Implements a premium, parallel "Letter Pop" reveal animation.
 * Features simultaneous outgoing and incoming sequences for a more
 * dynamic, layered, and high-end brand interaction.
 */
export function LogoToggle() {
  const [isToggled, setIsToggled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isAnimatingRef = useRef(false);
  const endTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logoText = "FasTrack";
  const letters = logoText.split("");
  
  // Timing configuration for a smooth, dramatic cascade
  const staggerDelay = 60;   
  const letterDuration = 450; 
  
  // Total duration until the last letter settles in its new position
  const totalDuration = (letters.length * staggerDelay) + letterDuration;

  useEffect(() => {
    return () => {
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
    setIsAnimating(true);
    setIsToggled(prev => !prev);

    // Re-enable interactions once the parallel crossfade is complete
    endTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
    }, totalDuration + 20);

  }, [totalDuration]);

  /**
   * Renders a layer of letters for a specific brand style.
   * Logic handles whether this specific layer should animate 'in' or 'out' based on the toggle state.
   */
  const renderLogoLayer = (isPremiumStyle: boolean, animationType: 'in' | 'out' | null) => {
    const colorClass = isPremiumStyle 
      ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50" 
      : "text-primary";

    // Determine if this layer should be visible when NO animation is playing
    const isStaticVisible = !isAnimating && (isPremiumStyle === isToggled);

    return (
      <div 
        className={cn(
          "absolute inset-0 flex items-center font-bold text-xl sm:text-2xl tracking-tighter",
          !isAnimating && !isStaticVisible && "opacity-0 pointer-events-none"
        )}
      >
        {letters.map((char, index) => {
          const isLast = index === letters.length - 1;
          
          let animationClass = "";
          if (animationType === 'out') {
            animationClass = "animate-letter-out";
          } else if (animationType === 'in') {
            animationClass = isLast ? "animate-letter-in-snap" : "animate-letter-in";
          }

          return (
            <span
              key={`${index}-${isPremiumStyle}-${animationType}`}
              className={cn(
                "inline-block will-change-transform",
                colorClass,
                animationClass
              )}
              style={{
                animationDelay: `${index * staggerDelay}ms`,
                WebkitBackgroundClip: isPremiumStyle ? 'text' : 'unset'
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    );
  };

return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Toggle FasTrack Logo Branding"
      onClick={handleToggle}
      onKeyDown={handleToggle}
      className="relative cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md h-10 w-32 sm:w-36 md:w-40 select-none ml-10 overflow-hidden flex items-center"
    >
      {/* Default (Teal) Layer: Animates 'out' when toggled to premium, 'in' when toggled back */}
      {renderLogoLayer(
        false, 
        isAnimating ? (isToggled ? 'out' : 'in') : null
      )}
      
      {/* Premium (Gradient) Layer: Animates 'in' when toggled to premium, 'out' when toggled back */}
      {renderLogoLayer(
        true, 
        isAnimating ? (isToggled ? 'in' : 'out') : null
      )}
    </div>
  );
}