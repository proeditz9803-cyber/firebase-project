import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * @fileOverview A reusable hook for scroll-triggered entrance animations.
 * Supports a default variant (first visit) and a refined variant (all subsequent visits).
 * Variant selection is automatic based on localStorage state.
 * The refined variant applies via a data attribute on the html element,
 * requiring zero changes to any consuming page component.
 */

interface ScrollRevealOptions {
  threshold?: number;
  delay?: number;
  once?: boolean;
}

const VARIANT_KEY = 'fastrack-scroll-variant';

function resolveVariant(): 'default' | 'refined' {
  if (typeof window === 'undefined') return 'default';
  const existing = localStorage.getItem(VARIANT_KEY);
  if (!existing) {
    localStorage.setItem(VARIANT_KEY, 'default');
    document.documentElement.removeAttribute('data-scroll-variant');
    return 'default';
  } else if (existing === 'default') {
    localStorage.setItem(VARIANT_KEY, 'refined');
    document.documentElement.setAttribute('data-scroll-variant', 'refined');
    return 'refined';
  } else {
    document.documentElement.setAttribute('data-scroll-variant', 'refined');
    return 'refined';
  }
}

export default function useScrollReveal(
  options: ScrollRevealOptions = {}
): [RefObject<HTMLDivElement>, boolean] {
  const { threshold = 0.15, delay = 0, once = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const variant = resolveVariant();
    const isRefined = variant === 'refined';
    const resolvedThreshold = isRefined ? 0.08 : threshold;
    const resolvedDelay = isRefined ? 0 : delay;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
          }, resolvedDelay);

          if (once && observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      { threshold: resolvedThreshold }
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