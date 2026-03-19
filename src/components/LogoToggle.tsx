'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * LogoToggle Component
 * Provides a smooth crossfade interaction between the default teal FasTrack logo
 * and the professional gradient logo used in informational pages.
 */
export function LogoToggle() {
  const [isProfessional, setIsProfessional] = useState(false);

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    // Keyboard accessibility for Enter and Space keys
    if ('key' in e) {
      const ke = e as React.KeyboardEvent;
      if (ke.key !== 'Enter' && ke.key !== ' ') return;
      e.preventDefault();
    }
    setIsProfessional((prev) => !prev);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Toggle FasTrack Logo Appearance"
      onClick={handleToggle}
      onKeyDown={handleToggle}
      className="relative cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md h-10 w-28 sm:w-36 md:w-40 flex items-center select-none ml-10 transition-shadow"
    >
      {/* 
        Default Logo Container:
        Displays the vibrant teal branding used across the main interface.
      */}
      <div
        className={cn(
          "absolute inset-0 flex items-center transition-opacity duration-[400ms] ease-in-out",
          isProfessional ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight" aria-hidden="true">
          FasTrack
        </span>
      </div>

      {/* 
        Professional Logo Container:
        Displays the gradient branding found on 'About' and 'Privacy' pages.
      */}
      <div
        className={cn(
          "absolute inset-0 flex items-center transition-opacity duration-[400ms] ease-in-out",
          isProfessional ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <span 
          className="text-xl sm:text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
          aria-hidden="true"
        >
          FasTrack
        </span>
      </div>
    </div>
  );
}
