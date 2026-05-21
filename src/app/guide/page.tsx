"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { guideArticles } from '@/lib/guide-articles';

export default function GuidePage() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [introExiting, setIntroExiting] = useState(false);
  const [introRevealed, setIntroRevealed] = useState(false);
  const [articlesVisible, setArticlesVisible] = useState(false);
  const [pageRevealed, setPageRevealed] = useState(false);

  useEffect(() => {
    const permanentlyDismissed = localStorage.getItem('fastrack-guide-intro-dismissed');
    const sessionSeen = sessionStorage.getItem('fastrack-guide-intro-seen');
    if (!permanentlyDismissed && !sessionSeen) {
      setShowIntro(true);
    } else {
      setArticlesVisible(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setIntroRevealed(true), 80);
      return () => clearTimeout(timer);
    } else {
      setIntroRevealed(false);
    }
  }, [showIntro]);

  useEffect(() => {
    if (pathname === '/guide' && !showIntro) {
      const timer = setTimeout(() => setPageRevealed(true), 80);
      return () => {
        clearTimeout(timer);
        setPageRevealed(false);
      };
    }
  }, [pathname, showIntro]);

  const handleProceed = () => {
    sessionStorage.setItem('fastrack-guide-intro-seen', 'true');
    setIntroExiting(true);
    setTimeout(() => {
      setShowIntro(false);
      setIntroExiting(false);
      setArticlesVisible(true);
    }, 500);
  };

  const handleProceedPermanent = () => {
    localStorage.setItem('fastrack-guide-intro-dismissed', 'true');
    sessionStorage.setItem('fastrack-guide-intro-seen', 'true');
    setIntroExiting(true);
    setTimeout(() => {
      setShowIntro(false);
      setIntroExiting(false);
      setArticlesVisible(true);
    }, 500);
  };

  const protocols = [
    { name: '16:8 Protocol', desc: 'The most popular method. You fast for 16 hours and eat within an 8-hour window. Ideal for beginners.' },
    { name: '18:6 Protocol', desc: 'An intermediate step with a tighter eating window, providing slightly more time in a fasted state.' },
    { name: '20:4 (Warrior Diet)', desc: 'An advanced method involving 20 hours of fasting and a 4-hour eating window, often late in the day.' },
    { name: 'OMAD (23:1)', desc: 'One Meal A Day. You consume all your daily calories in a single 1-hour window.' },
  ];

  const milestones = [
    { time: '4 Hours', effect: 'Your blood sugar begins to normalize and insulin levels drop as the last of your meal is digested.' },
    { time: '8 Hours', effect: 'Glycogen stores in the liver start to deplete. Your body begins preparing to switch to fat for energy.' },
    { time: '12 Hours', effect: 'Fat burning starts in earnest. Growth hormone levels increase to preserve muscle mass.' },
    { time: '16 Hours', effect: 'Autophagy (cellular repair) begins. Your cells start recycling old proteins and damaged components.' },
    { time: '24 Hours', effect: 'Ketosis is typically fully reached. Cellular regeneration and stem cell production increase.' },
  ];

  if (!ready) return <div className="max-w-3xl mx-auto min-h-[80vh]" />;

  if (showIntro) {
    return (
      <div className={cn(
        "max-w-3xl mx-auto min-h-[80vh] flex flex-col justify-center py-12 space-y-10",
        introExiting
          ? "opacity-0 translate-y-4 pointer-events-none transition-all duration-500"
          : "transition-none"
      )}>
        <div
          className={cn(
            "space-y-2 transition-all",
            introRevealed ? "scroll-reveal-visible" : "scroll-reveal-hidden"
          )}
          style={{ transitionDelay: introRevealed ? '0ms' : '0ms' }}
        >
          <p className="text-xs font-medium text-primary uppercase tracking-widest select-none">New feature</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground select-none">
            Introducing the new FasTrack Guide Articles
          </h1>
        </div>
        <div className="space-y-8">
          <div
            className={cn(
              "space-y-3 transition-all",
              introRevealed ? "scroll-reveal-visible" : "scroll-reveal-hidden"
            )}
            style={{ transitionDelay: introRevealed ? '150ms' : '0ms' }}
          >
            <h2 className="text-base font-bold text-foreground select-none">What you'd learn:</h2>
            <p className="text-sm text-muted-foreground leading-relaxed select-none">
              How intermittent fasting works, the key differences between popular protocols, and how to start safely as a beginner.
            </p>
          </div>
          <div
            className={cn(
              "space-y-3 transition-all",
              introRevealed ? "scroll-reveal-visible" : "scroll-reveal-hidden"
            )}
            style={{ transitionDelay: introRevealed ? '300ms' : '0ms' }}
          >
            <h2 className="text-base font-bold text-foreground select-none">What you'd not learn:</h2>
            <p className="text-sm text-muted-foreground leading-relaxed select-none">
              Specific meal plans, calorie targets, or medical advice. These articles focus on fasting structure and timing only.
            </p>
          </div>
          <div
            className={cn(
              "space-y-3 transition-all",
              introRevealed ? "scroll-reveal-visible" : "scroll-reveal-hidden"
            )}
            style={{ transitionDelay: introRevealed ? '450ms' : '0ms' }}
          >
            <h2 className="text-base font-bold text-foreground select-none">The help you'd get:</h2>
            <p className="text-sm text-muted-foreground leading-relaxed select-none">
              Beginner-friendly guidance written in plain language, structured to help you make informed decisions about your fasting routine.
            </p>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-wrap gap-3 transition-all",
            introRevealed ? "scroll-reveal-visible" : "scroll-reveal-hidden"
          )}
          style={{ transitionDelay: introRevealed ? '600ms' : '0ms' }}
        >
          <button
            onClick={handleProceed}
            className="px-6 py-3 rounded-full border border-border text-sm font-medium text-foreground bg-card hover:bg-secondary active:scale-95 transition-all duration-200 select-none"
          >
            Proceed
          </button>
          <button
            onClick={handleProceedPermanent}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all duration-200 select-none"
          >
            Proceed and don't show this again
          </button>
        </div>
      </div>
    );
  }

return (
    <div className="max-w-3xl mx-auto space-y-12">
      <section
        className={cn("space-y-4 transition-all", pageRevealed || articlesVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
        style={{ transitionDelay: '0ms' }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-primary select-none">Fasting Guide</h1>
        <p className="text-muted-foreground leading-relaxed select-none">
          Intermittent fasting is an eating pattern that cycles between periods of fasting and eating.
          Unlike traditional diets, it doesn't specify which foods you should eat, but rather when
          you should eat them. It is essentially an "eating pattern" rather than a diet.
        </p>
      </section>

      <section
        className={cn("space-y-6 transition-all", pageRevealed || articlesVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
        style={{ transitionDelay: pageRevealed ? '150ms' : '0ms' }}
      >
        <h2 className="text-2xl font-bold select-none">Popular Protocols</h2>
        <div className="grid gap-4">
          {protocols.map((p) => (
            <div key={p.name} className="p-6 bg-card rounded-2xl border border-border">
              <h3 className="text-lg font-bold text-primary mb-2 select-none">{p.name}</h3>
              <p className="text-sm text-muted-foreground select-none">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={cn("space-y-6 transition-all", pageRevealed || articlesVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
        style={{ transitionDelay: pageRevealed ? '300ms' : '0ms' }}
      >
        <h2 className="text-2xl font-bold select-none">What Happens to Your Body?</h2>
        <div className="space-y-4">
          {milestones.map((m) => (
            <div key={m.time} className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-bold text-primary select-none">{m.time}</div>
              <div className="text-sm text-muted-foreground border-l border-border pl-4 pb-4 select-none">
                {m.effect}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className={cn("space-y-6 transition-all", pageRevealed || articlesVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
        style={{ transitionDelay: pageRevealed ? '450ms' : '0ms' }}
      >
        <h2 className="text-2xl font-bold select-none">Common Mistakes</h2>
        <ul className="space-y-4 list-disc pl-6 text-muted-foreground text-sm">
          <li className="select-none">
            <strong className="text-foreground">Diving in too fast:</strong> Starting with 20:4 or OMAD can be stressful for the body. Start with 12:12 or 14:10.
          </li>
          <li className="select-none">
            <strong className="text-foreground">Dehydration:</strong> Many people forget to drink water. Coffee and tea are okay (without sugar/milk), but water is essential.
          </li>
          <li className="select-none">
            <strong className="text-foreground">Overeating during the window:</strong> Fasting isn't a license to eat junk food. Focus on nutrient-dense meals.
          </li>
          <li className="select-none">
            <strong className="text-foreground">Breaking fasts too aggressively:</strong> Large, heavy meals can cause digestive distress. Start with something light.
          </li>
        </ul>
      </section>

      <section
        className={cn("p-8 bg-primary/10 rounded-2xl border border-primary/20 transition-all", pageRevealed || articlesVisible ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
        style={{ transitionDelay: pageRevealed ? '600ms' : '0ms' }}
      >
        <h2 className="text-xl font-bold mb-4 select-none">Pro Tip for Success</h2>
        <p className="text-sm text-muted-foreground leading-relaxed select-none">
          Consistency is more important than perfection. If you have to break your fast early one day,
          don't worry. Just resume your schedule the following day. Listen to your body — fasting
          should feel challenging but never painful or dangerous.
        </p>
      </section>

      <section
        className={cn(
          "space-y-6 transition-all duration-700",
          articlesVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        )}
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold select-none">Guide Articles</h2>
          <p className="text-sm text-muted-foreground select-none">
            Beginner-friendly reads to deepen your understanding of intermittent fasting.
          </p>
        </div>
        <div className="grid gap-4">
          {guideArticles.map((article) => (
            <Link href={`/guide/${article.id}`} key={article.id} className="block">
              <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/40 transition-colors cursor-pointer">
                <h3 className="text-base font-bold text-foreground mb-2 select-none">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 select-none">{article.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="select-none">{article.date}</span>
                  <span className="select-none">·</span>
                  <span className="select-none">{article.readTime}</span>
                  <span className="select-none">·</span>
                  <span className="select-none">{article.size}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}