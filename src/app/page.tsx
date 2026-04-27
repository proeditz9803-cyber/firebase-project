"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProtocolType, FastRecord, TimerMode } from '@/lib/fasting-types';
import { cn } from '@/lib/utils';
import { X, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useNotificationSettings } from '@/hooks/useNotificationSettings';
import { triggerCompletionNotifications } from '@/utils/notifications';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
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
  const { settings, isLoaded: settingsLoaded } = useNotificationSettings();

  const [activeMode, setActiveMode] = useState<TimerMode>('fasting');
  const [protocol, setProtocol] = useState<ProtocolType>('16:8');
  const [history, setHistory] = useState<FastRecord[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'fasting' | 'eating'>('fasting');
  const [isDismissing, setIsDismissing] = useState(false);

  const [isFastingSectionVisible, setIsFastingSectionVisible] = useState(false);
  const [isToggleButtonVisible, setIsToggleButtonVisible] = useState(false);
  const [isEatingSectionVisible, setIsEatingSectionVisible] = useState(false);

  const [fastStart, setFastStart] = useState<string | null>(null);
  const [fastElapsedSeconds, setFastElapsedSeconds] = useState(0);
  const [customFastingHours, setCustomFastingHours] = useState(16);
  const [customFastingMinutes, setCustomFastingMinutes] = useState(0);

  const [eatingStart, setEatingStart] = useState<string | null>(null);
  const [eatingElapsedSeconds, setEatingElapsedSeconds] = useState(0);
  const [eatingPaused, setEatingPaused] = useState(false);
  const [customEatingHours, setCustomEatingHours] = useState(8);
  const [customEatingMinutes, setCustomEatingMinutes] = useState(0);

  const fastingSectionRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const eatingSectionRef = useRef<HTMLDivElement>(null);
  const dismissTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [hRef, hVis] = useScrollReveal({ delay: 0 });

  useEffect(() => {
    const savedActiveMode = localStorage.getItem('fastrack-active-mode') as TimerMode;
    const savedFastStart = localStorage.getItem('fastStart');
    const savedEatingStart = localStorage.getItem('fastrack-eating-start');
    const savedEatingPaused = localStorage.getItem('fastrack-eating-paused');
    const savedEatingElapsed = localStorage.getItem('fastrack-eating-elapsed');
    const savedProtocol = localStorage.getItem('fastProtocol') as ProtocolType;
    const savedCustomFH = localStorage.getItem('customFastingHours');
    const savedCustomFM = localStorage.getItem('customFastingMinutes');
    const savedCustomEH = localStorage.getItem('fastrack-eating-hours');
    const savedCustomEM = localStorage.getItem('fastrack-eating-minutes');
    const savedHistory = localStorage.getItem('fastHistory');

    if (savedActiveMode) setActiveMode(savedActiveMode);
    if (savedFastStart) setFastStart(savedFastStart);
    if (savedEatingStart) setEatingStart(savedEatingStart);
    if (savedEatingPaused === 'true') {
      setEatingPaused(true);
      if (savedEatingElapsed) setEatingElapsedSeconds(parseInt(savedEatingElapsed));
    }
    if (savedProtocol) setProtocol(savedProtocol);
    if (savedCustomFH) setCustomFastingHours(parseInt(savedCustomFH));
    if (savedCustomFM) setCustomFastingMinutes(parseInt(savedCustomFM));
    if (savedCustomEH) setCustomEatingHours(parseInt(savedCustomEH));
    if (savedCustomEM) setCustomEatingMinutes(parseInt(savedCustomEM));
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fastrack-active-mode', activeMode);
    localStorage.setItem('fastProtocol', protocol);
    localStorage.setItem('customFastingHours', customFastingHours.toString());
    localStorage.setItem('customFastingMinutes', customFastingMinutes.toString());
    localStorage.setItem('fastrack-eating-hours', customEatingHours.toString());
    localStorage.setItem('fastrack-eating-minutes', customEatingMinutes.toString());
  }, [activeMode, protocol, customFastingHours, customFastingMinutes, customEatingHours, customEatingMinutes]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (entry.target === fastingSectionRef.current) setIsFastingSectionVisible(true);
        if (entry.target === toggleButtonRef.current) setIsToggleButtonVisible(true);
        if (entry.target === eatingSectionRef.current) setIsEatingSectionVisible(true);
      }
    }, { threshold: 0.1 });

    if (fastingSectionRef.current) observer.observe(fastingSectionRef.current);
    if (toggleButtonRef.current) observer.observe(toggleButtonRef.current);
    if (eatingSectionRef.current) observer.observe(eatingSectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    };
  }, []);

  const dismissNotification = useCallback((callback?: () => void) => {
    setIsDismissing(true);
    dismissTimeoutRef.current = setTimeout(() => {
      setShowNotification(false);
      setIsDismissing(false);
      if (callback) callback();
    }, 350);
  }, []);

  const getPlannedSeconds = useCallback((mode: TimerMode) => {
    const h = mode === 'fasting' ? customFastingHours : customEatingHours;
    const m = mode === 'fasting' ? customFastingMinutes : customEatingMinutes;
    return (h * 3600) + (m * 60);
  }, [customFastingHours, customFastingMinutes, customEatingHours, customEatingMinutes]);

  const endFast = useCallback((early = false) => {
    if (!fastStart) return;
    const startTime = new Date(fastStart);
    const endTime = new Date();
    const actualHours = (endTime.getTime() - startTime.getTime()) / (1000 * 3600);
    const plannedHours = getPlannedSeconds('fasting') / 3600;

    const newRecord: FastRecord = {
      id: crypto.randomUUID(),
      startTime: fastStart,
      endTime: endTime.toISOString(),
      plannedProtocol: protocol,
      plannedHours,
      actualHours,
      completed: !early && actualHours >= plannedHours
    };

    const newHistory = [newRecord, ...history];
    setHistory(newHistory);
    localStorage.setItem('fastHistory', JSON.stringify(newHistory));
    setFastStart(null);
    localStorage.removeItem('fastStart');
    setFastElapsedSeconds(0);

    if (newRecord.completed) {
      setNotificationType('fasting');
      setShowNotification(true);
      if (settingsLoaded) triggerCompletionNotifications('fasting', settings);
    }
  }, [fastStart, protocol, getPlannedSeconds, history, settings, settingsLoaded]);

  const startTimer = (mode: TimerMode) => {
    const now = new Date().toISOString();
    if (mode === 'fasting') {
      setFastStart(now);
      localStorage.setItem('fastStart', now);
    } else {
      setEatingStart(now);
      localStorage.setItem('fastrack-eating-start', now);
    }
  };

  const pauseEating = () => {
    setEatingPaused(true);
    setEatingStart(null);
    localStorage.removeItem('fastrack-eating-start');
    localStorage.setItem('fastrack-eating-paused', 'true');
    localStorage.setItem('fastrack-eating-elapsed', eatingElapsedSeconds.toString());
  };

  const resumeEating = () => {
    const resumeStart = new Date(Date.now() - eatingElapsedSeconds * 1000).toISOString();
    setEatingStart(resumeStart);
    localStorage.setItem('fastrack-eating-start', resumeStart);
    setEatingPaused(false);
    localStorage.removeItem('fastrack-eating-paused');
    localStorage.removeItem('fastrack-eating-elapsed');
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
      setEatingPaused(false);
      localStorage.removeItem('fastrack-eating-paused');
      localStorage.removeItem('fastrack-eating-elapsed');
    }
  };useEffect(() => {
    let interval: NodeJS.Timeout;
    if (fastStart && activeMode === 'fasting') {
      interval = setInterval(() => {
        const diff = Math.floor((Date.now() - new Date(fastStart).getTime()) / 1000);
        setFastElapsedSeconds(diff);
        if (diff >= getPlannedSeconds('fasting')) endFast(false);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [fastStart, activeMode, endFast, getPlannedSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (eatingStart && activeMode === 'eating') {
      interval = setInterval(() => {
        const diff = Math.floor((Date.now() - new Date(eatingStart).getTime()) / 1000);
        setEatingElapsedSeconds(diff);
        if (diff >= getPlannedSeconds('eating')) {
          setEatingStart(null);
          localStorage.removeItem('fastrack-eating-start');
          setEatingElapsedSeconds(0);
          setEatingPaused(false);
          localStorage.removeItem('fastrack-eating-paused');
          localStorage.removeItem('fastrack-eating-elapsed');
          setNotificationType('eating');
          setShowNotification(true);
          if (settingsLoaded) triggerCompletionNotifications('eating', settings);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [eatingStart, activeMode, getPlannedSeconds, settings, settingsLoaded]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-xl mx-auto space-y-12 pb-20">
      {showNotification && (
        <div className={cn("fixed top-[64px] left-0 right-0 z-[60]", isDismissing ? "animate-notification-out" : "animate-notification-in")}>
          <div className="bg-[#0a0f0a] border-l-4 border-primary p-6 container mx-auto max-w-xl shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">
                  {notificationType === 'fasting' ? 'Fasting Complete' : 'Eating Period Complete'}
                </h3>
                <p className="text-sm opacity-70">
                  {notificationType === 'fasting'
                    ? 'Your fasting period has ended. Your eating period is ready to begin.'
                    : 'Your eating period has ended. Ready to begin your fast.'}
                </p>
              </div>
              <button onClick={() => dismissNotification()}><X className="w-5 h-5" /></button>
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" onClick={() => dismissNotification(() => {
                setActiveMode(notificationType === 'fasting' ? 'eating' : 'fasting');
                startTimer(notificationType === 'fasting' ? 'eating' : 'fasting');
              })}>
                {notificationType === 'fasting' ? 'Start Eating Period' : 'Start Fasting'}
              </Button>
              <Button variant="outline" onClick={() => dismissNotification()}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card ref={hRef} className={cn("border-none bg-card/40 transition-all", hVis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <CardContent className="pt-6 space-y-4">
          <Label className="uppercase text-[10px] font-bold tracking-widest opacity-50">
            Fasting Protocols
          </Label>
          <div className="grid grid-cols-5 gap-2">
            {PROTOCOLS.map((p) => (
              <Button
                key={p.value}
                variant={protocol === p.value ? 'default' : 'secondary'}
                className="h-10 text-xs font-bold"
                onClick={() => { setProtocol(p.value); if (p.value !== 'Custom') { setCustomFastingHours(p.fasting); setCustomEatingHours(p.eating); setCustomFastingMinutes(0); setCustomEatingMinutes(0); } }}
                disabled={!!fastStart || !!eatingStart}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div ref={fastingSectionRef} className={cn("transition-all duration-700 p-6 sm:p-8 bg-card/20 border-l-4", isFastingSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8", activeMode === 'fasting' ? "border-primary bg-primary/5" : "border-transparent opacity-50")}>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Fasting Period</h2>
            <Badge variant={activeMode === 'fasting' ? 'default' : 'secondary'}>
              {activeMode === 'fasting' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className="flex gap-4">
            <div className="space-y-1"><Label className="text-[10px] uppercase">Hours</Label><Input type="number" value={customFastingHours} onChange={e => setCustomFastingHours(Number(e.target.value))} disabled={!!fastStart || activeMode !== 'fasting'} className="w-20" /></div>
            <div className="space-y-1"><Label className="text-[10px] uppercase">Minutes</Label><Input type="number" value={customFastingMinutes} onChange={e => setCustomFastingMinutes(Number(e.target.value))} disabled={!!fastStart || activeMode !== 'fasting'} className="w-20" /></div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-32 aspect-square">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-10" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="283" strokeDashoffset={283 - (283 * Math.min(1, fastElapsedSeconds / (getPlannedSeconds('fasting') || 1)))} className="text-primary transition-all duration-300" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold">{formatTime(Math.max(0, getPlannedSeconds('fasting') - fastElapsedSeconds))}</span>
                <span className="text-[8px] opacity-50 uppercase tracking-widest">Remaining</span>
              </div>
            </div>
            {!fastStart ? (
              <Button className="w-full h-14 uppercase font-bold tracking-widest" onClick={() => startTimer('fasting')} disabled={activeMode !== 'fasting'}>
                Start Fasting
              </Button>
            ) : (
              <div className="flex gap-2 w-full">
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="secondary" className="flex-1 h-14 font-bold">End Fast</Button></AlertDialogTrigger>
                  <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>End Fast Early?</AlertDialogTitle></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Dismiss</AlertDialogCancel><AlertDialogAction onClick={() => endFast(true)}>End Fast</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" className="flex-1 h-14 font-bold" onClick={() => resetTimer('fasting')}>
                  Reset
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button ref={toggleButtonRef} onClick={() => setActiveMode(activeMode === 'fasting' ? 'eating' : 'fasting')} className={cn("group w-full p-8 border border-border rounded-xl transition-all duration-700", isToggleButtonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8", "hover:bg-foreground hover:text-background")}>
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-widest opacity-50">
              Currently Active: {activeMode === 'fasting' ? 'Fasting Period' : 'Eating Period'}
            </span>
            <div className="text-xl font-bold flex items-center justify-center gap-2">
              {activeMode === 'fasting' ? 'Switch to Eating Period' : 'Switch to Fasting Period'}
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </div>
          </div>
        </button>
      </div>

      <div ref={eatingSectionRef} className={cn("transition-all duration-700 p-6 sm:p-8 bg-card/20 border-l-4", isEatingSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8", activeMode === 'eating' ? "border-amber-500 bg-amber-500/5" : "border-transparent opacity-50")}>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Eating Period</h2>
            <Badge variant={activeMode === 'eating' ? 'default' : 'secondary'}>
              {activeMode === 'eating' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className="flex gap-4">
            <div className="space-y-1"><Label className="text-[10px] uppercase">Hours</Label><Input type="number" value={customEatingHours} onChange={e => setCustomEatingHours(Number(e.target.value))} disabled={!!eatingStart || eatingPaused || activeMode !== 'eating'} className="w-20" /></div>
            <div className="space-y-1"><Label className="text-[10px] uppercase">Minutes</Label><Input type="number" value={customEatingMinutes} onChange={e => setCustomEatingMinutes(Number(e.target.value))} disabled={!!eatingStart || eatingPaused || activeMode !== 'eating'} className="w-20" /></div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-32 aspect-square">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-10" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="283" strokeDashoffset={283 - (283 * Math.min(1, eatingElapsedSeconds / (getPlannedSeconds('eating') || 1)))} className="text-amber-500 transition-all duration-300" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold">{formatTime(Math.max(0, getPlannedSeconds('eating') - eatingElapsedSeconds))}</span>
                <span className="text-[8px] opacity-50 uppercase tracking-widest">Remaining</span>
              </div>
            </div>
            {!eatingStart && !eatingPaused ? (
              <Button className="w-full h-14 bg-amber-500 text-black hover:bg-amber-400 font-bold" onClick={() => startTimer('eating')} disabled={activeMode !== 'eating'}>
                Start Eating Period
              </Button>
            ) : (
              <div className="flex gap-2 w-full">
                {eatingPaused ? (
                  <Button variant="secondary" className="flex-1 h-14 font-bold" onClick={resumeEating}>Resume</Button>
                ) : (
                  <Button variant="secondary" className="flex-1 h-14 font-bold" onClick={pauseEating}>Pause</Button>
                )}
                <Button variant="outline" className="flex-1 h-14 font-bold" onClick={() => resetTimer('eating')}>Reset</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}