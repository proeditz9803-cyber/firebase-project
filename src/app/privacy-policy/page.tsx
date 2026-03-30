"use client";

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export default function PrivacyPolicyPage() {
  const [hRef, hVis] = useScrollReveal({ delay: 0 });
  const [s1Ref, s1Vis] = useScrollReveal({ delay: 100 });
  const [s2Ref, s2Vis] = useScrollReveal({ delay: 200 });
  const [s3Ref, s3Vis] = useScrollReveal({ delay: 300 });
  const [s4Ref, s4Vis] = useScrollReveal({ delay: 400 });
  const [s5Ref, s5Vis] = useScrollReveal({ delay: 500 });
  const [s6Ref, s6Vis] = useScrollReveal({ delay: 600 });
  const [s10Ref, s10Vis] = useScrollReveal({ delay: 1000 });

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 px-6">
      {/* Brand Header */}
      <section 
        ref={hRef}
        className={cn(
          "text-center space-y-6 transition-all",
          hVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          Privacy Policy
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h2>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Effective Date: October 27, 2023
          </p>
        </div>
      </section>

      {/* 1. Introduction */}
      <section ref={s1Ref} className={cn("space-y-4 transition-all", s1Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">1. About Us</h2>
        <p className="leading-relaxed text-muted-foreground">
          We are committed to protecting your privacy.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 2. Information We Collect */}
      <section ref={s2Ref} className={cn("space-y-4 transition-all", s2Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">2. Information We Collect</h2>
        <p className="leading-relaxed text-muted-foreground">
          FasTrack does not collect any personal information.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 3. How We Use Information */}
      <section ref={s3Ref} className={cn("space-y-4 transition-all", s3Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">3. How We Use Information</h2>
        <p className="leading-relaxed text-muted-foreground">
          Since no personal data is collected, no user data is used.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 4. Google AdSense */}
      <section ref={s4Ref} className={cn("space-y-4 transition-all", s4Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">4. Google AdSense</h2>
        <p className="leading-relaxed text-muted-foreground">
          FasTrack uses Google AdSense to display advertisements.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 5. Cookies */}
      <section ref={s5Ref} className={cn("space-y-4 transition-all", s5Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">5. Cookies</h2>
        <p className="leading-relaxed text-muted-foreground">
          FasTrack itself does not set any cookies.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 6. Local Storage */}
      <section ref={s6Ref} className={cn("space-y-4 transition-all", s6Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">6. Local Storage</h2>
        <p className="leading-relaxed text-muted-foreground">
          FasTrack uses browser local storage solely to save your fasting data.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 10. Contact Us */}
      <section ref={s10Ref} className={cn("space-y-4 pb-12 transition-all", s10Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">10. Contact Us</h2>
        <p className="leading-relaxed text-muted-foreground">
          For any privacy-related questions...
        </p>
        <p className="font-bold text-foreground text-lg">
          proeditz9803@gmail.com
        </p>
      </section>
    </div>
  );
}
