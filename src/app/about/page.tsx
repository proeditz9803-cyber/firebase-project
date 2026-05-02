"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, ClipboardList, BookOpen, Heart, ShieldCheck, User } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const [headerRef, headerVisible] = useScrollReveal({ delay: 0 });
  const [missionRef, missionVisible] = useScrollReveal({ delay: 150 });
  const [coverRef, coverVisible] = useScrollReveal({ delay: 300 });
  const [creatorRef, creatorVisible] = useScrollReveal({ delay: 450 });
  const [trustRef, trustVisible] = useScrollReveal({ delay: 600 });
  const [closingRef, closingVisible] = useScrollReveal({ delay: 750 });

  const coverageItems = [
    {
      icon: Timer,
      label: "Fasting Timer",
      description: "Track your fasting and eating periods with precision using protocols like 16:8, 18:6, 20:4, OMAD, or a fully custom schedule."
    },
    {
      icon: ClipboardList,
      label: "Fasting Log",
      description: "Every completed or ended fast is recorded automatically. Your history is stored locally on your device so your data stays yours."
    },
    {
      icon: BookOpen,
      label: "Fasting Guide",
      description: "Not sure where to start? The built-in guide walks you through the science of fasting, popular protocols, and practical tips."
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">

      <section
        ref={headerRef}
        className={cn(
          "text-center space-y-6 transition-all",
          headerVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold select-none">
          About Us
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 select-none">
          FasTrack
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium select-none">
          A free, simple, and honest intermittent fasting timer built for anyone who wants to take control of their eating habits.
        </p>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed select-none">
          FasTrack does not require an account, does not collect your personal data, and does not hide features behind a paywall. You open it, set your protocol, and start fasting. That is really all there is to it.
        </p>
      </section>

      <section
        ref={missionRef}
        className={cn(
          "relative transition-all",
          missionVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 rounded-[3rem]" />
        <div className="relative z-10 p-12 text-center space-y-4">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3 select-none">
            <Heart className="text-primary w-8 h-8" />
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed select-none">
            FasTrack was built on one straightforward idea — fasting tools should be free, private, and easy to use for everyone regardless of their technical background.
          </p>
          <p className="text-base text-foreground/70 max-w-3xl mx-auto leading-relaxed select-none">
            There are plenty of fasting apps out there that lock basic features behind subscriptions or harvest your health data for advertising. FasTrack is a direct response to that. Everything runs in your browser, your history lives only on your device, and nothing is ever sent to a server.
          </p>
        </div>
      </section>

      <section
        ref={coverRef}
        className={cn(
          "space-y-8 transition-all",
          coverVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight select-none">What FasTrack Offers</h2>
          <p className="text-muted-foreground select-none">
            Three focused tools designed to support your fasting journey from start to finish.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverageItems.map((item, index) => (
            <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors group">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-2xl bg-secondary group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold text-lg select-none">{item.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed select-none">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
     <section
        ref={creatorRef}
        className={cn(
          "bg-secondary/30 rounded-3xl p-8 md:p-12 border border-border flex flex-col md:flex-row items-center gap-8 transition-all",
          creatorVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold select-none">Meet the Creator</h3>
          <p className="text-muted-foreground text-base leading-relaxed select-none">
            Hi, I am a passionate and dedicated web builder. Since I want to remain anonymous you can refer to me as Pex. I am a Reddit user and I frequently go by Pex there. I will not share any account details or personal information for privacy reasons.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed select-none">
            My only goal while making FasTrack was to provide genuine help to anyone who needs a fasting timer tool to make their fasting journey easier. I wanted a tool which is accessible, helpful, usable for the general public and valuable. I hope every user who uses FasTrack is satisfied.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed select-none">
            If you need any help or want to suggest updates, feel free to email me through the Contact Us page.
          </p>
        </div>
      </section>

      <section
        ref={trustRef}
        className={cn(
          "bg-secondary/30 rounded-3xl p-8 md:p-12 border border-border flex flex-col md:flex-row items-center gap-8 transition-all",
          trustVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold select-none">Your Privacy Matters</h3>
          <p className="text-muted-foreground text-base leading-relaxed select-none">
            FasTrack stores your fasting history directly on your device using your browser's local storage. This means your data never leaves your phone or computer and no account is needed to use any feature.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed select-none">
            The app uses Google AdSense to display ads which help keep FasTrack free. Ads may use cookies as described in our Privacy Policy. Aside from that, FasTrack itself collects absolutely nothing.
          </p>
        </div>
      </section>

      <section
        ref={closingRef}
        className={cn(
          "text-center py-12 border-t border-border transition-all",
          closingVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <p className="text-2xl font-bold tracking-tight mb-4 select-none">
          FasTrack is here to make fasting simpler, not more complicated.
        </p>
        <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed select-none">
          No subscriptions. No accounts. No data collection. Just a reliable tool that gets out of your way and lets you focus on your health.
        </p>
        <div className="flex justify-center gap-4">
          <div className="h-1 w-12 bg-primary rounded-full" />
          <div className="h-1 w-12 bg-primary/50 rounded-full" />
          <div className="h-1 w-12 bg-primary/20 rounded-full" />
        </div>
      </section>

    </div>
  );
}