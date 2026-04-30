"use client";

import { useEffect, useRef, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [hRef, hVis] = useScrollReveal({ delay: 0 });
  const [lRef, lVis] = useScrollReveal({ delay: 150 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { setIsVisible(true); }, 150);
          if (observerRef.current) observerRef.current.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (buttonRef.current) {
      observer.observe(buttonRef.current);
      observerRef.current = observer;
    }
    return () => { if (observerRef.current) observerRef.current.disconnect(); };
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12 px-6">
      <section
        ref={hRef}
        className={cn("text-center space-y-6 transition-all", hVis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          Contact Us
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Contact Us</h2>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-stretch">
        <div
          ref={lRef}
          className={cn("space-y-8 flex flex-col justify-center transition-all", lVis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
        >
          <section className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              We genuinely value user input and invite you to reach out.
            </p>
          </section>
          <Separator className="opacity-20" />
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-primary">How we can help:</h3>
            <ul className="space-y-3">
              {[
                "General questions about FasTrack",
                "Bug reports or technical issues",
                "Feature requests and suggestions",
                "Privacy or data related concerns",
                "Advertising and partnership enquiries"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground leading-tight">
                  <span className="text-primary font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="hidden md:block w-px bg-border opacity-20" />

        <div className="flex items-center justify-center py-8 md:py-0">
          <a
            ref={buttonRef}
            href="mailto:proeditz9803@gmail.com"
            className={cn(
              "group relative w-full max-w-sm flex flex-col items-center justify-center p-8 md:p-12",
              "bg-transparent text-foreground border border-border rounded-full",
              "transition-[transform,opacity,background-color,border-color] duration-150",
              "active:scale-[0.97] active:bg-foreground/10 active:border-foreground/30 active:duration-75",
              "will-change-[transform,opacity] cursor-pointer no-underline overflow-hidden",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            )}
            style={{ transitionProperty: 'transform, opacity, background-color, border-color' }}
          >
            <div className="relative flex items-center justify-center gap-4">
              <span className="text-2xl md:text-3xl font-extrabold uppercase tracking-tighter">
                Send Us an Email
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}