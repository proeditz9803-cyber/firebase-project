"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProtocolType, FastRecord, TimerMode } from '@/lib/fasting-types';
import { cn } from '@/lib/utils';
import { Play, Square, RotateCcw, ArrowUpDown, CheckCircle2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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

  const eatingSectionRef = useRef<HTMLDivElement>(null);

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

  const getPlannedSeconds = useCallback((mode: TimerMode) => {
    if (protocol === 'Custom' || mode === 'eating') {
      const h = mode === 'fasting' ? customFastingHours : customEatingHours;
      const m = mode === 'fasting' ? customFastingMinutes : customEatingMinutes;
      return (h * 3600) + (m * 60);
    }
    const p = PROTOCOLS.find(p => p.value === protocol);
    return (p?.fasting || 16) * 3600;
  }, [protocol, customFastingHours, customFastingMinutes, customEatingHours, customEatingMinutes]);

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
    const completed = !early && actualHours >= (plannedHours - 0.001); // buffer for precision

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
    setShowNotification(false);
    localStorage.removeItem('fastrack-fasting-complete');
    setActiveMode('eating');
    startTimer('eating');
    setTimeout(() => {
      eatingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  if (!isClient) return null;

  return (
    <div className="max-w-xl mx-auto space-y-8 relative">
      {/* Notification Banner */}
      {showNotification && (
        <div className="fixed top-20 left-4 right-4 z-[60] animate-in slide-in-from-top-4 fade-in duration-500">
          <div className="bg-primary text-background p-6 rounded-xl shadow-2xl border border-primary-foreground/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="p-3 bg-background/10 rounded-full h-fit mt-1">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tighter italic">Fasting Complete</h3>
                  <p className="text-sm font-medium opacity-90 leading-tight">
                    Your fasting period has ended. Your eating period is ready to begin.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { setShowNotification(false); localStorage.removeItem('fastrack-fasting-complete'); }} 
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleStartEatingFromNotification}
                className="flex-1 bg-background text-primary hover:bg-background/90 font-bold uppercase tracking-widest text-xs h-12"
              >
                Start Eating Period
              </Button>
              <Button 
                variant="outline"
                onClick={() => { setShowNotification(false); localStorage.removeItem('fastrack-fasting-complete'); }}
                className="flex-1 border-background/20 bg-transparent text-background hover:bg-background/10 font-bold uppercase tracking-widest text-xs h-12"
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Protocol Selector */}
      <Card className="border-none shadow-xl">
        <CardContent className="pt-6 space-y-4">
          <Label className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Select Protocol</Label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {PROTOCOLS.map((p) => (
              <Button
                key={p.value}
                variant={protocol === p.value ? 'default' : 'secondary'}
                className={cn(
                  "h-12 text-sm font-bold",
                  protocol === p.value ? "bg-primary text-background hover:bg-primary/90" : "bg-secondary text-foreground hover:bg-secondary/80"
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
      <Card 
        className={cn(
          "transition-all duration-300 border-2",
          activeMode === 'fasting' ? "border-primary shadow-2xl scale-[1.02]" : "border-border/30 opacity-70 grayscale-[0.5]"
        )}
        aria-label="Fasting Period Timer"
        aria-current={activeMode === 'fasting'}
      >
        <CardContent className="pt-6 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Fasting Period</h2>
            {activeMode === 'fasting' && <Badge className="bg-primary text-background font-bold animate-pulse">ACTIVE</Badge>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hours</Label>
              <Input
                type="number"
                value={customFastingHours}
                onChange={(e) => setCustomFastingHours(parseInt(e.target.value) || 0)}
                disabled={!!fastStart || activeMode !== 'fasting'}
                className="h-12 font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Minutes</Label>
              <Input
                type="number"
                value={customFastingMinutes}
                onChange={(e) => handleMinutesChange(e.target.value, 'fasting')}
                disabled={!!fastStart || activeMode !== 'fasting'}
                className="h-12 font-bold"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-48 aspect-square">
              <svg className="w-full h-full circular-timer-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--secondary))" strokeWidth="4" />
                <circle
                  cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="4"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 - (282.7 * Math.min(100, (fastElapsedSeconds / Math.max(1, getPlannedSeconds('fasting'))) * 100)) / 100}
                  strokeLinecap="round" className="timer-progress-arc"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold tracking-tighter tabular-nums">
                  {formatTime(Math.max(0, getPlannedSeconds('fasting') - fastElapsedSeconds))}
                </span>
                <span className="text-[8px] font-bold text-muted-foreground mt-0.5 tracking-widest uppercase">FASTING</span>
              </div>
            </div>
            
            <div className="flex w-full gap-2 mt-6">
              {!fastStart ? (
                <Button 
                  className="flex-1 h-14 font-black uppercase text-xs" 
                  onClick={() => startTimer('fasting')}
                  disabled={activeMode !== 'fasting' || getPlannedSeconds('fasting') <= 0}
                >
                  <Play className="w-4 h-4 mr-2" /> Start Fast
                </Button>
              ) : (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="secondary" className="flex-1 h-14 font-black uppercase text-xs" disabled={activeMode !== 'fasting'}>
                        <Square className="w-4 h-4 mr-2" /> End Early
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogTitle>End Fast Early?</AlertDialogTitle></AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => endFast(true)}>End Fast</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button variant="outline" className="flex-1 h-14 font-black uppercase text-xs" onClick={() => resetTimer('fasting')} disabled={activeMode !== 'fasting'}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mode Toggle Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          variant="secondary"
          onClick={handleToggleMode}
          className="h-16 w-full max-w-sm rounded-none border-2 border-primary bg-background text-primary hover:bg-primary hover:text-background transition-all duration-300 font-black uppercase italic tracking-tighter text-xl group"
          aria-label={activeMode === 'fasting' ? "Switch to Eating Period" : "Switch to Fasting Period"}
        >
          <ArrowUpDown className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-500" />
          {activeMode === 'fasting' ? 'Switch to Eating Period' : 'Switch to Fasting Period'}
        </Button>
      </div>

      {/* Eating Timer Section */}
      <Card 
        ref={eatingSectionRef}
        className={cn(
          "transition-all duration-300 border-2",
          activeMode === 'eating' ? "border-primary shadow-2xl scale-[1.02]" : "border-border/30 opacity-70 grayscale-[0.5]"
        )}
        aria-label="Eating Period Timer"
        aria-current={activeMode === 'eating'}
      >
        <CardContent className="pt-6 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Eating Period</h2>
            {activeMode === 'eating' && <Badge className="bg-primary text-background font-bold animate-pulse">ACTIVE</Badge>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hours</Label>
              <Input
                type="number"
                value={customEatingHours}
                onChange={(e) => setCustomEatingHours(parseInt(e.target.value) || 0)}
                disabled={!!eatingStart || activeMode !== 'eating'}
                className="h-12 font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Minutes</Label>
              <Input
                type="number"
                value={customEatingMinutes}
                onChange={(e) => handleMinutesChange(e.target.value, 'eating')}
                disabled={!!eatingStart || activeMode !== 'eating'}
                className="h-12 font-bold"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-48 aspect-square">
              <svg className="w-full h-full circular-timer-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--secondary))" strokeWidth="4" />
                <circle
                  cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="4"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 - (282.7 * Math.min(100, (eatingElapsedSeconds / Math.max(1, getPlannedSeconds('eating'))) * 100)) / 100}
                  strokeLinecap="round" className="timer-progress-arc"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold tracking-tighter tabular-nums">
                  {formatTime(Math.max(0, getPlannedSeconds('eating') - eatingElapsedSeconds))}
                </span>
                <span className="text-[8px] font-bold text-muted-foreground mt-0.5 tracking-widest uppercase">EATING</span>
              </div>
            </div>
            
            <div className="flex w-full gap-2 mt-6">
              {!eatingStart ? (
                <Button 
                  className="flex-1 h-14 font-black uppercase text-xs" 
                  onClick={() => startTimer('eating')}
                  disabled={activeMode !== 'eating' || getPlannedSeconds('eating') <= 0}
                >
                  <Play className="w-4 h-4 mr-2" /> Start Eating
                </Button>
              ) : (
                <>
                  <Button variant="secondary" className="flex-1 h-14 font-black uppercase text-xs" onClick={() => resetTimer('eating')} disabled={activeMode !== 'eating'}>
                    <Square className="w-4 h-4 mr-2" /> End Eating
                  </Button>
                  <Button variant="outline" className="flex-1 h-14 font-black uppercase text-xs" onClick={() => resetTimer('eating')} disabled={activeMode !== 'eating'}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
