import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * @fileOverview A reusable hook for scroll-triggered entrance animations.
 * Updated with premium 900ms duration and refined easing.
 */

interface ScrollRevealOptions {
  threshold?: number;
  delay?: number;
  once?: boolean;
}

export default function useScrollReveal(options: ScrollRevealOptions = {}): [RefObject<HTMLDivElement>, boolean] {
  const { threshold = 0.15, delay = 0, once = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
          }, delay);

          if (once && observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [threshold, delay, once]);

  return [elementRef, isVisible];
}