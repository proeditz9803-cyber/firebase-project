'use client';

import { useEffect, useRef, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Subtle entrance delay of 150ms as requested
          setTimeout(() => {
            setIsVisible(true);
          }, 150);
          // Disconnect after triggering once
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the button is visible
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12 px-6">
      {/* Brand Header */}
      <section className="text-center space-y-6">
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          Get In Touch
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Contact Us</h2>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-stretch">
        {/* Left Column: Informational Content */}
        <div className="space-y-8 flex flex-col justify-center">
          <section className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              We genuinely value user input and invite you to reach out with any questions, suggestions, or feedback about FasTrack. Whether you have a specific inquiry or just want to share your experience, we are here to listen and will respond as promptly as possible.
            </p>
          </section>

          <Separator className="opacity-20" />

          <section className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              We typically respond to all messages within 24 to 48 hours.
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

        {/* Vertical Divider for Desktop */}
        <div className="hidden md:block w-px bg-border opacity-20" />

        {/* Right Column: Premium Email Action */}
        <div className="flex items-center justify-center py-8 md:py-0">
          <a 
            ref={buttonRef}
            href="mailto:proeditz9803@gmail.com"
            className={cn(
              "group relative w-full max-w-sm flex flex-col items-center justify-center p-8 md:p-12",
              "bg-[#0a0a0a] text-white border border-[#1a1a1a]",
              "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-150",
              "hover:bg-white hover:text-[#0a0a0a] hover:scale-[1.02] active:scale-[0.98] active:duration-100",
              "will-change-[transform,opacity] cursor-pointer no-underline overflow-hidden",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionProperty: 'transform, opacity, background-color, color, border-color' }}
          >
            <div className="relative flex items-center justify-center gap-4">
              <span className="text-2xl md:text-3xl font-extrabold uppercase tracking-tighter">
                Send Us an Email
              </span>
              {/* Premium Arrow Icon */}
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="square" 
                strokeLinejoin="miter" 
                className="transition-transform duration-300 ease-in-out group-hover:translate-x-1.5"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <span className="text-sm font-medium mt-2 opacity-70 group-hover:opacity-70 transition-opacity">
              proeditz9803@gmail.com
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
