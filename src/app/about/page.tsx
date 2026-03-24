"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, Brain, Zap, Heart, Star, ShieldCheck } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const [headerRef, headerVisible] = useScrollReveal({ delay: 0 });
  const [missionRef, missionVisible] = useScrollReveal({ delay: 150 });
  const [coverRef, coverVisible] = useScrollReveal({ delay: 300 });
  const [trustRef, trustVisible] = useScrollReveal({ delay: 450 });
  const [closingRef, closingVisible] = useScrollReveal({ delay: 600 });

  const coverageItems = [
    { icon: Timer, label: 'fasting based guide and tips' },
    { icon: Brain, label: 'mental clarity and discipline' },
    { icon: Zap, label: 'productive and healthy lifestyle' },
    { icon: Heart, label: 'Mental wellness and mindful content' },
    { icon: Star, label: 'Motivation and lifestyle inspiration' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">
      {/* 1. Brand Introduction */}
      <section 
        ref={headerRef}
        className={cn(
          "text-center space-y-6 transition-all",
          headerVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          About Us
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
          Welcome to FasTrack — your trusted destination for fitness knowledge, wellness guidance, and a healthier lifestyle.
        </p>
      </section>

      {/* 2. Mission Statement */}
      <section 
        ref={missionRef}
        className={cn(
          "relative transition-all",
          missionVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 rounded-[3rem]" />
        <div className="relative z-10 p-12 text-center space-y-4">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Heart className="text-primary w-8 h-8" />
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Our mission is to make fitness and wellbeing accessible to everyone, regardless of age, experience, or fitness level. We believe that a healthier life begins with the right information and the right mindset.
          </p>
        </div>
      </section>

      {/* 3. What We Cover */}
      <section 
        ref={coverRef}
        className={cn(
          "space-y-8 transition-all",
          coverVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">What We Cover</h2>
          <p className="text-muted-foreground">At FasTrack we provide specialized guidance in key wellness areas:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverageItems.map((item, index) => (
            <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors group">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-2xl bg-secondary group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold text-lg">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Why Trust Us */}
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
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Why Trust Us</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every piece of content on our platform is thoroughly researched and crafted to ensure accuracy, reliability, and real value to our readers.
          </p>
        </div>
      </section>

      {/* 5. Closing Statement */}
      <section 
        ref={closingRef}
        className={cn(
          "text-center py-12 border-t border-border transition-all",
          closingVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <p className="text-2xl font-bold tracking-tight mb-8">
          Whether you're just starting your fitness journey or looking to level up, <span className="text-primary">FasTrack</span> is here to guide you every step of the way.
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
