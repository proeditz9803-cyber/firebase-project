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

  const contactItems = [
    {
      label: "General questions about FasTrack",
      description: "Curious about how the app works, which protocol to start with, or anything else? Just ask."
    },
    {
      label: "Bug reports or technical issues",
      description: "If something is not working the way it should, let me know and I will look into it as quickly as I can."
    },
    {
      label: "Feature requests and suggestions",
      description: "Have an idea that would make FasTrack better? I genuinely want to hear it."
    },
    {
      label: "Privacy or data related concerns",
      description: "Your privacy matters. If you have any concerns about how the app handles your data, reach out directly."
    },
    {
      label: "Advertising and partnership enquiries",
      description: "For any advertising or collaboration related conversations, email is the best way to get in touch."
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12 px-6">
      <section
        ref={hRef}
        className={cn(
          "text-center space-y-6 transition-all",
          hVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold select-none">
          Contact Us
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 select-none">
          FasTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground select-none">Contact Us</h2>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-stretch">
        <div
          ref={lRef}
          className={cn(
            "space-y-8 flex flex-col justify-center transition-all",
            lVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
          )}
        >
          <section className="space-y-4">
            <p className="leading-relaxed text-muted-foreground select-none">
              FasTrack is built and maintained by one person, so when you send a message it goes straight to me. I read every single one and do my best to get back to you within a day or two. Whether you have a question, a problem, or just want to share your thoughts, I genuinely welcome it.
            </p>
            <p className="leading-relaxed text-muted-foreground select-none">
              There is no support ticket system or automated response here. Just a real person on the other end who cares about making FasTrack as good as it can be.
            </p>
          </section>

          <Separator className="opacity-20" />

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-primary select-none">How I can help:</h3>
            <ul className="space-y-5">
              {contactItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5 select-none">•</span>
                  <div className="space-y-0.5">
                    <p className="text-foreground font-medium leading-tight select-none">{item.label}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed select-none">{item.description}</p>
                  </div>
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
              "bg-transparent text-foreground border border-border rounded-full select-none",
              "transition-[transform,opacity,background-color,border-color] duration-150",
              "active:scale-[0.97] active:bg-foreground/10 active:border-foreground/30 active:duration-75",
              "will-change-[transform,opacity] cursor-pointer no-underline overflow-hidden",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            )}
            style={{ transitionProperty: 'transform, opacity, background-color, border-color' }}
          >
            <div className="relative flex flex-col items-center justify-center gap-3 text-center">
              <span className="text-2xl md:text-3xl font-extrabold uppercase tracking-tighter select-none">
                Send Us an Email
              </span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest select-none">
                proeditz9803@gmail.com
              </span>
            </div>
          </a>
        </div>
      </div>

      <section className={cn(
        "text-center border-t border-border pt-8 transition-all",
        lVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
      )}>
        <p className="text-sm text-muted-foreground select-none">
          Typical response time is within one to two days. This page was last updated on May 2, 2026.
        </p>
      </section>
    </div>
  );
}
