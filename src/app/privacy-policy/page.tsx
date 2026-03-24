"use client";

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const effectiveDate = "October 27, 2023";

  // Use hook for sections
  const [hRef, hVis] = useScrollReveal({ delay: 0 });
  const [s1Ref, s1Vis] = useScrollReveal({ delay: 100 });
  const [s2Ref, s2Vis] = useScrollReveal({ delay: 200 });
  const [s3Ref, s3Vis] = useScrollReveal({ delay: 300 });
  const [s4Ref, s4Vis] = useScrollReveal({ delay: 400 });
  const [s5Ref, s5Vis] = useScrollReveal({ delay: 500 });
  const [s6Ref, s6Vis] = useScrollReveal({ delay: 600 });
  const [s7Ref, s7Vis] = useScrollReveal({ delay: 700 });
  const [s8Ref, s8Vis] = useScrollReveal({ delay: 800 });
  const [s9Ref, s9Vis] = useScrollReveal({ delay: 900 });
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
          {t('nav_privacy')}
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{t('privacy_heading')}</h2>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {t('privacy_effective_date')}
          </p>
        </div>
      </section>

      {/* 1. Introduction */}
      <section ref={s1Ref} className={cn("space-y-4 transition-all", s1Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">1. Introduction</h2>
        <p className="leading-relaxed text-muted-foreground">
          {t('privacy_intro')}
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 2. Information We Collect */}
      <section ref={s2Ref} className={cn("space-y-4 transition-all", s2Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">2. {t('privacy_collection_heading')}</h2>
        <p className="leading-relaxed text-muted-foreground">
          {t('privacy_collection_body')}
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 3. How We Use Information */}
      <section ref={s3Ref} className={cn("space-y-4 transition-all", s3Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">3. {t('privacy_use_heading')}</h2>
        <p className="leading-relaxed text-muted-foreground">
          {t('privacy_use_body')}
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 4. Google AdSense and Third Party Advertising */}
      <section ref={s4Ref} className={cn("space-y-4 transition-all", s4Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">4. {t('privacy_adsense_heading')}</h2>
        <div className="space-y-4 leading-relaxed text-muted-foreground">
          <p>
            {t('privacy_adsense_body')}
          </p>
        </div>
        <Separator className="opacity-20" />
      </section>

      {/* 5. Cookies */}
      <section ref={s5Ref} className={cn("space-y-4 transition-all", s5Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">5. {t('privacy_cookies_heading')}</h2>
        <p className="leading-relaxed text-muted-foreground">
          {t('privacy_cookies_body')}
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 6. Local Storage */}
      <section ref={s6Ref} className={cn("space-y-4 transition-all", s6Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">6. {t('privacy_storage_heading')}</h2>
        <p className="leading-relaxed text-muted-foreground">
          {t('privacy_storage_body')}
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 7. Third Party Links */}
      <section ref={s7Ref} className={cn("space-y-4 transition-all", s7Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">7. {t('privacy_links_heading')}</h2>
        <p className="leading-relaxed text-muted-foreground">
          {t('privacy_links_body')}
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 8. Children's Privacy */}
      <section ref={s8Ref} className={cn("space-y-4 transition-all", s8Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">8. {t('privacy_children_heading')}</h2>
        <p className="leading-relaxed text-muted-foreground">
          {t('privacy_children_body')}
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 9. Changes to This Policy */}
      <section ref={s9Ref} className={cn("space-y-4 transition-all", s9Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">9. {t('privacy_changes_heading')}</h2>
        <p className="leading-relaxed text-muted-foreground">
          {t('privacy_changes_body')}
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 10. Contact Us */}
      <section ref={s10Ref} className={cn("space-y-4 pb-12 transition-all", s10Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary">10. {t('privacy_contact_heading')}</h2>
        <p className="leading-relaxed text-muted-foreground">
          {t('privacy_contact_body')}
        </p>
        <p className="font-bold text-foreground text-lg">
          {t('contact_email_address')}
        </p>
      </section>
    </div>
  );
}
