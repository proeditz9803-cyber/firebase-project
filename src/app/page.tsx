"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProtocolType, FastRecord, TimerMode } from '@/lib/fasting-types';
import { cn } from '@/lib/utils';
import { Play, Square, RotateCcw, X, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useScrollReveal from '@/hooks/useScrollReveal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PROTOCOLS: { label: string; value: ProtocolType; fasting: number; eating: number }[] = [
  { label: '16:8', value: '16:8', fasting: 16, eating: 8 },
  { label: '18:6', value: '18:6', fasting: 18, eating: 6 },
  { label: '20:4', value: '20:4', fasting: 20, eating: 4 },
  { label: 'OMAD', value: 'OMAD', fasting: 23, eating: 1 },
  { label: 'Custom', value: 'Custom', fasting: 12, eating: 12 },
];

export default function TimerPage() {
  const [isClient, setIsClient] = useState(false);
  
  // Mode & Global State
  const [activeMode, setActiveMode] = useState<TimerMode>('fasting');
  const [protocol, setProtocol] = useState<ProtocolType>('16:8');
  const [history, setHistory] = useState<FastRecord[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  // Entrance Animation States
  const [isFastingSectionVisible, setIsFastingSectionVisible] = useState(false);
  const [isToggleButtonVisible, setIsToggleButtonVisible] = useState(false);
  const [isEatingSectionVisible, setIsEatingSectionVisible] = useState(false);

  // Fasting Timer State
  const [fastStart, setFastStart] = useState<string | null>(null);
  const [fastElapsedSeconds, setFastElapsedSeconds] = useState(0);
  const [customFastingHours, setCustomFastingHours] = useState(16);
  const [customFastingMinutes, setCustomFastingMinutes] = useState(0);

  // Eating Timer State
  const [eatingStart, setEatingStart] = useState<string | null>(null);
  const [eatingElapsedSeconds, setEatingElapsedSeconds] = useState(0);
  const [customEatingHours, setCustomEatingHours] = useState(8);
  const [customEatingMinutes, setCustomEatingMinutes] = useState(0);

  // Refs for Scroll Animations
  const fastingSectionRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const eatingSectionRef = useRef<HTMLDivElement>(null);

  const fastingObserverRef = useRef<IntersectionObserver | null>(null);
  const toggleObserverRef = useRef<IntersectionObserver | null>(null);
  const eatingObserverRef = useRef<IntersectionObserver | null>(null);

  // New Global Reveal Hook for heading
  const [hRef, hVis] = useScrollReveal({ delay: 0 });

  // Persistence
  useEffect(() => {
    setIsClient(true);
    const savedActiveMode = localStorage.getItem('fastrack-active-mode') as TimerMode;
    const savedFastStart = localStorage.getItem('fastStart');
    const savedEatingStart = localStorage.getItem('fastrack-eating-start');
    const savedProtocol = localStorage.getItem('fastProtocol') as ProtocolType;
    const savedCustomFH = localStorage.getItem('customFastingHours');
    const savedCustomFM = localStorage.getItem('customFastingMinutes');
    const savedCustomEH = localStorage.getItem('fastrack-eating-hours');
    const savedCustomEM = localStorage.getItem('fastrack-eating-minutes');
    const savedHistory = localStorage.getItem('fastHistory');
    const savedNotification = localStorage.getItem('fastrack-fasting-complete');

    if (savedActiveMode) setActiveMode(savedActiveMode);
    if (savedFastStart) setFastStart(savedFastStart);
    if (savedEatingStart) setEatingStart(savedEatingStart);
    if (savedProtocol) setProtocol(savedProtocol);
    if (savedCustomFH) setCustomFastingHours(parseInt(savedCustomFH));
    if (savedCustomFM) setCustomFastingMinutes(parseInt(savedCustomFM));
    if (savedCustomEH) setCustomEatingHours(parseInt(savedCustomEH));
    if (savedCustomEM) setCustomEatingMinutes(parseInt(savedCustomEM));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedNotification === 'true') setShowNotification(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('fastrack-active-mode', activeMode);
      localStorage.setItem('fastProtocol', protocol);
      localStorage.setItem('customFastingHours', customFastingHours.toString());
      localStorage.setItem('customFastingMinutes', customFastingMinutes.toString());
      localStorage.setItem('fastrack-eating-hours', customEatingHours.toString());
      localStorage.setItem('fastrack-eating-minutes', customEatingMinutes.toString());
      localStorage.setItem('fastrack-fasting-complete', showNotification.toString());
    }
  }, [activeMode, protocol, customFastingHours, customFastingMinutes, customEatingHours, customEatingMinutes, showNotification, isClient]);

  // Entrance Animation Setup
  useEffect(() => {
    if (!isClient) return;

    // Fasting Section Observer (0ms delay)
    const fastingObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsFastingSectionVisible(true);
        fastingObserver.disconnect();
      }
    }, { threshold: 0.15 });

    // Toggle Button Observer (150ms delay)
    const toggleObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsToggleButtonVisible(true), 150);
        toggleObserver.disconnect();
      }
    }, { threshold: 0.15 });

    // Eating Section Observer (300ms delay)
    const eatingObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsEatingSectionVisible(true), 300);
        eatingObserver.disconnect();
      }
    }, { threshold: 0.15 });

    if (fastingSectionRef.current) fastingObserver.observe(fastingSectionRef.current);
    if (toggleButtonRef.current) toggleObserver.observe(toggleButtonRef.current);
    if (eatingSectionRef.current) eatingObserver.observe(eatingSectionRef.current);

    fastingObserverRef.current = fastingObserver;
    toggleObserverRef.current = toggleObserver;
    eatingObserverRef.current = eatingObserver;

    return () => {
      fastingObserverRef.current?.disconnect();
      toggleObserverRef.current?.disconnect();
      eatingObserverRef.current?.disconnect();
    };
  }, [isClient]);

  const getPlannedSeconds = useCallback((mode: TimerMode) => {
    const h = mode === 'fasting' ? customFastingHours : customEatingHours;
    const m = mode === 'fasting' ? customFastingMinutes : customEatingMinutes;
    return (h * 3600) + (m * 60);
  }, [customFastingHours, customFastingMinutes, customEatingHours, customEatingMinutes]);

  const saveHistory = useCallback((newHistory: FastRecord[]) => {
    setHistory(newHistory);
    localStorage.setItem('fastHistory', JSON.stringify(newHistory));
  }, []);

  const endFast = useCallback((early = false) => {
    if (!fastStart) return;

    const totalSeconds = getPlannedSeconds('fasting');
    const plannedHours = totalSeconds / 3600;
    const startTime = new Date(fastStart);
    const endTime = new Date();
    const actualHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const completed = !early && actualHours >= (plannedHours - 0.001);

    const newRecord: FastRecord = {
      id: crypto.randomUUID(),
      startTime: fastStart,
      endTime: endTime.toISOString(),
      plannedProtocol: protocol,
      plannedHours,
      actualHours,
      completed
    };

    saveHistory([newRecord, ...history]);
    setFastStart(null);
    localStorage.removeItem('fastStart');
    setFastElapsedSeconds(0);

    if (completed) {
      setShowNotification(true);
      setIsDismissing(false);
    }
  }, [fastStart, protocol, getPlannedSeconds, history, saveHistory]);

  const startTimer = (mode: TimerMode) => {
    if (getPlannedSeconds(mode) <= 0) return;
    const now = new Date().toISOString();
    if (mode === 'fasting') {
      setFastStart(now);
      localStorage.setItem('fastStart', now);
    } else {
      setEatingStart(now);
      localStorage.setItem('fastrack-eating-start', now);
    }
  };

  const resetTimer = (mode: TimerMode) => {
    if (mode === 'fasting') {
      setFastStart(null);
      localStorage.removeItem('fastStart');
      setFastElapsedSeconds(0);
    } else {
      setEatingStart(null);
      localStorage.removeItem('fastrack-eating-start');
      setEatingElapsedSeconds(0);
    }
  };

  const handleToggleMode = () => {
    const nextMode = activeMode === 'fasting' ? 'eating' : 'fasting';
    setActiveMode(nextMode);
  };

  const dismissNotification = () => {
    setIsDismissing(true);
    setTimeout(() => {
      setShowNotification(false);
      setIsDismissing(false);
      localStorage.removeItem('fastrack-fasting-complete');
    }, 350);
  };

  // Fasting Timer Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (fastStart && activeMode === 'fasting') {
      interval = setInterval(() => {
        const start = new Date(fastStart).getTime();
        const now = Date.now();
        const diff = Math.floor((now - start) / 1000);
        setFastElapsedSeconds(diff);

        if (diff >= getPlannedSeconds('fasting')) {
          endFast(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [fastStart, activeMode, endFast, getPlannedSeconds]);

  // Eating Timer Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (eatingStart && activeMode === 'eating') {
      interval = setInterval(() => {
        const start = new Date(eatingStart).getTime();
        const now = Date.now();
        const diff = Math.floor((now - start) / 1000);
        setEatingElapsedSeconds(diff);

        const planned = getPlannedSeconds('eating');
        if (diff >= planned) {
          setEatingStart(null);
          localStorage.removeItem('fastrack-eating-start');
          setEatingElapsedSeconds(0);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [eatingStart, activeMode, getPlannedSeconds]);

  const handleMinutesChange = (val: string, type: 'fasting' | 'eating') => {
    const rawValue = parseInt(val) || 0;
    if (rawValue < 0) return;

    const overflowHours = Math.floor(rawValue / 60);
    const remainingMinutes = rawValue % 60;

    if (type === 'fasting') {
      if (overflowHours > 0) setCustomFastingHours(prev => prev + overflowHours);
      setCustomFastingMinutes(remainingMinutes);
    } else {
      if (overflowHours > 0) setCustomEatingHours(prev => prev + overflowHours);
      setCustomEatingMinutes(remainingMinutes);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartEatingFromNotification = () => {
    dismissNotification();
    setActiveMode('eating');
    startTimer('eating');
    setTimeout(() => {
      eatingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  if (!isClient) return null;

  return (
    <div className="max-w-xl mx-auto space-y-12 relative pb-20">
      {/* Notification Banner */}
      {showNotification && (
        <div 
          className={cn(
            "fixed top-[64px] left-0 right-0 z-[60] will-change-[transform,opacity]",
            isDismissing ? "animate-notification-out" : "animate-notification-in"
          )}
          style={{ animationDelay: isDismissing ? '0ms' : '100ms' }}
        >
          <div className="bg-[#0a0f0a] border-l-4 border-primary p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] container mx-auto max-w-xl">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-white font-outfit">Fasting Complete</h3>
                <p className="text-sm font-medium text-white/70 leading-relaxed max-w-md">
                  Your fasting period has ended. Your eating period is ready to begin.
                </p>
              </div>
              <button 
                onClick={dismissNotification} 
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleStartEatingFromNotification}
                className="flex-1 bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest text-[10px] h-14 rounded-none transition-all duration-300"
              >
                Start Eating Period <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline"
                onClick={dismissNotification}
                className="flex-1 border-white/20 bg-transparent text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] h-14 rounded-none transition-all duration-300"
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Protocol Selector */}
      <Card 
        ref={hRef}
        className={cn(
          "border-none shadow-xl bg-card/40 transition-all",
          hVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <CardContent className="pt-6 space-y-4">
          <Label className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">Select Protocol</Label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {PROTOCOLS.map((p) => (
              <Button
                key={p.value}
                variant={protocol === p.value ? 'default' : 'secondary'}
                className={cn(
                  "h-12 text-xs font-bold transition-all duration-300",
                  protocol === p.value 
                    ? "bg-primary text-background shadow-lg shadow-primary/20 scale-[1.02]" 
                    : "bg-secondary/50 text-foreground hover:bg-secondary"
                )}
                onClick={() => {
                  setProtocol(p.value);
                  if (p.value !== 'Custom') {
                    setCustomFastingHours(p.fasting);
                    setCustomFastingMinutes(0);
                    setCustomEatingHours(p.eating);
                    setCustomEatingMinutes(0);
                  }
                }}
                disabled={!!fastStart || !!eatingStart}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fasting Timer Section */}
      <div 
        ref={fastingSectionRef}
        className={cn(
          "transition-all duration-900 ease-reveal border-l-4 p-6 sm:p-8 bg-card/20 group will-change-[transform,opacity]",
          isFastingSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]",
          activeMode === 'fasting' 
            ? "border-primary bg-primary/5" 
            : "border-border/20 opacity-50 grayscale-[0.3]"
        )}
        aria-label="Fasting Period Timer"
        aria-current={activeMode === 'fasting'}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight font-outfit">Fasting Period</h2>
              <Badge 
                className={cn(
                  "transition-all duration-400 font-bold tracking-widest text-[10px] px-3 py-1 rounded-full",
                  activeMode === 'fasting' 
                    ? "bg-primary text-background animate-pulse" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {activeMode === 'fasting' ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-[300px]">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Hours</Label>
              <Input
                type="number"
                value={customFastingHours}
                onChange={(e) => setCustomFastingHours(parseInt(e.target.value) || 0)}
                disabled={!!fastStart || activeMode !== 'fasting'}
                className="h-14 font-bold text-lg bg-background/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Minutes</Label>
              <Input
                type="number"
                value={customFastingMinutes}
                onChange={(e) => handleMinutesChange(e.target.value, 'fasting')}
                disabled={!!fastStart || activeMode !== 'fasting'}
                className="h-14 font-bold text-lg bg-background/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex flex-col items-center sm:flex-row gap-8">
            <div className="relative w-40 aspect-square">
              <svg className="w-full h-full circular-timer-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" className="opacity-20" />
                <circle
                  cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 - (282.7 * Math.min(100, (fastElapsedSeconds / Math.max(1, getPlannedSeconds('fasting'))) * 100)) / 100}
                  strokeLinecap="round" className="timer-progress-arc"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold tracking-tighter tabular-nums font-outfit">
                  {formatTime(Math.max(0, getPlannedSeconds('fasting') - fastElapsedSeconds))}
                </span>
                <span className="text-[8px] font-bold text-muted-foreground mt-0.5 tracking-widest uppercase">REMAINING</span>
              </div>
            </div>
            
            <div className="flex flex-col w-full gap-2">
              {!fastStart ? (
                <Button 
                  className="w-full h-16 font-bold uppercase text-xs tracking-widest rounded-none shadow-2xl shadow-primary/10 transition-all duration-300 hover:scale-[1.01]" 
                  onClick={() => startTimer('fasting')}
                  disabled={activeMode !== 'fasting' || getPlannedSeconds('fasting') <= 0}
                >
                  <Play className="w-4 h-4 mr-2" /> Start Fasting
                </Button>
              ) : (
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="secondary" className="flex-1 h-16 font-bold uppercase text-xs tracking-widest rounded-none" disabled={activeMode !== 'fasting'}>
                        <Square className="w-4 h-4 mr-2" /> End Early
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-none border-primary/20">
                      <AlertDialogHeader><AlertDialogTitle className="font-outfit uppercase">End Fast Early?</AlertDialogTitle></AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => endFast(true)} className="rounded-none bg-primary text-background">End Fast</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button variant="outline" className="flex-1 h-16 font-bold uppercase text-xs tracking-widest rounded-none" onClick={() => resetTimer('fasting')} disabled={activeMode !== 'fasting'}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mode Toggle Button */}
      <div className="flex justify-center px-4 sm:px-0">
        <button
          ref={toggleButtonRef}
          onClick={handleToggleMode}
          className={cn(
            "group relative w-full flex flex-col items-center justify-center p-8 bg-background text-foreground border border-border transition-all duration-900 ease-reveal delay-150 will-change-[transform,opacity] rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            isToggleButtonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]",
            "hover:bg-foreground hover:text-background hover:scale-[1.015] active:scale-[0.985] hover:duration-300"
          )}
          aria-label={activeMode === 'fasting' ? "Switch to Eating Period" : "Switch to Fasting Period"}
        >
          {/* Badge */}
          <div className={cn(
            "absolute top-4 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.2em] bg-white/10 group-hover:bg-black/10 transition-colors",
            activeMode === 'fasting' ? "text-primary" : "text-amber-400"
          )}>
            Currently Active: {activeMode === 'fasting' ? 'Fasting' : 'Eating'}
          </div>

          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="text-xl md:text-2xl font-bold uppercase tracking-tighter font-outfit">
              {activeMode === 'fasting' ? 'Switch to Eating Period' : 'Switch to Fasting Period'}
            </span>
            <ArrowDown className="w-6 h-6 transition-transform duration-500 group-hover:translate-y-1.5" />
          </div>
          <span className="text-[10px] font-medium mt-2 opacity-60 tracking-wider">
            Tap to switch your active timer period
          </span>
        </button>
      </div>

      {/* Eating Timer Section */}
      <div 
        ref={eatingSectionRef}
        className={cn(
          "transition-all duration-900 ease-reveal delay-300 border-l-4 p-6 sm:p-8 bg-card/20 group will-change-[transform,opacity]",
          isEatingSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]",
          activeMode === 'eating' 
            ? "border-amber-500 bg-amber-500/5" 
            : "border-border/20 opacity-50 grayscale-[0.3]"
        )}
        aria-label="Eating Period Timer"
        aria-current={activeMode === 'eating'}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight font-outfit">Eating Period</h2>
              <Badge 
                className={cn(
                  "transition-all duration-400 font-bold tracking-widest text-[10px] px-3 py-1 rounded-full",
                  activeMode === 'eating' 
                    ? "bg-amber-500 text-background animate-pulse" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {activeMode === 'eating' ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-[300px]">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Hours</Label>
              <Input
                type="number"
                value={customEatingHours}
                onChange={(e) => setCustomEatingHours(parseInt(e.target.value) || 0)}
                disabled={!!eatingStart || activeMode !== 'eating'}
                className="h-14 font-bold text-lg bg-background/50 border-none focus-visible:ring-1 focus-visible:ring-amber-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Minutes</Label>
              <Input
                type="number"
                value={customEatingMinutes}
                onChange={(e) => handleMinutesChange(e.target.value, 'eating')}
                disabled={!!eatingStart || activeMode !== 'eating'}
                className="h-14 font-bold text-lg bg-background/50 border-none focus-visible:ring-1 focus-visible:ring-amber-500/50"
              />
            </div>
          </div>

          <div className="flex flex-col items-center sm:flex-row gap-8">
            <div className="relative w-40 aspect-square">
              <svg className="w-full h-full circular-timer-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" className="opacity-20" />
                <circle
                  cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" strokeWidth="3"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 - (282.7 * Math.min(100, (eatingElapsedSeconds / Math.max(1, getPlannedSeconds('eating'))) * 100)) / 100}
                  strokeLinecap="round" className="timer-progress-arc"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold tracking-tighter tabular-nums font-outfit">
                  {formatTime(Math.max(0, getPlannedSeconds('eating') - eatingElapsedSeconds))}
                </span>
                <span className="text-[8px] font-bold text-muted-foreground mt-0.5 tracking-widest uppercase">REMAINING</span>
              </div>
            </div>
            
            <div className="flex flex-col w-full gap-2">
              {!eatingStart ? (
                <Button 
                  className="w-full h-16 font-bold uppercase text-xs tracking-widest rounded-none shadow-2xl shadow-amber-500/10 transition-all duration-300 hover:scale-[1.01] bg-amber-500 text-black hover:bg-amber-400" 
                  onClick={() => startTimer('eating')}
                  disabled={activeMode !== 'eating' || getPlannedSeconds('eating') <= 0}
                >
                  <Play className="w-4 h-4 mr-2" /> Start Eating
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1 h-16 font-bold uppercase text-xs tracking-widest rounded-none" onClick={() => resetTimer('eating')} disabled={activeMode !== 'eating'}>
                    <Square className="w-4 h-4 mr-2" /> End Eating
                  </Button>
                  <Button variant="outline" className="flex-1 h-16 font-bold uppercase text-xs tracking-widest rounded-none" onClick={() => resetTimer('eating')} disabled={activeMode !== 'eating'}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
