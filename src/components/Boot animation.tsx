'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AnimationPhase = 'idle' | 'text-in' | 'line-in' | 'glow-in' | 'exit' | 'done';

export default function BootAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasPlayed = sessionStorage.getItem('fastrack-boot-played');
    if (hasPlayed) {
      setPhase('done');
      return;
    }

    const timers: NodeJS.Timeout[] = [
      setTimeout(() => setPhase('text-in'), 100),
      setTimeout(() => setPhase('line-in'), 800),
      setTimeout(() => setPhase('glow-in'), 1000),
      setTimeout(() => setPhase('exit'), 1900),
      setTimeout(() => {
        setPhase('done');
        sessionStorage.setItem('fastrack-boot-played', 'true');
      }, 2500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === 'done') return null;

  const textVisible = ['text-in', 'line-in', 'glow-in', 'exit'].includes(phase);
  const lineVisible = ['line-in', 'glow-in', 'exit'].includes(phase);
  const glowVisible = ['glow-in', 'exit'].includes(phase);
  const exiting = phase === 'exit';

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808]',
        'transition-opacity',
        exiting ? 'opacity-0 duration-[600ms]' : 'opacity-100 duration-0',
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.7, 0, 0.84, 0)' }}
    >
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            'absolute rounded-full border border-primary/10 transition-all',
            glowVisible
              ? 'w-80 h-80 opacity-100 duration-[1000ms]'
              : 'w-0 h-0 opacity-0 duration-0',
          )}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        <div
          className={cn(
            'absolute rounded-full border border-primary/20 bg-primary/5 transition-all',
            glowVisible
              ? 'w-48 h-48 opacity-100 duration-700'
              : 'w-0 h-0 opacity-0 duration-0',
          )}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        <div
          className={cn(
            'relative z-10 transition-all duration-700',
            textVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-3 scale-[0.92]',
          )}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <h1
            className="text-5xl font-bold tracking-tighter select-none text-white"
            style={{ fontFamily: 'var(--font-clash-display)' }}
          >
            FasTrack
          </h1>
        </div>
        <div className="relative z-10 mt-3 h-px w-32 overflow-hidden">
          <div
            className={cn(
              'h-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500',
              lineVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0',
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </div>
      </div>
    </div>
  );
}