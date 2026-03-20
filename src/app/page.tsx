"use client"

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProtocolType, FastRecord } from '@/lib/fasting-types';
import { cn } from '@/lib/utils';
import { Play, Square, RotateCcw } from 'lucide-react';
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
  const [fastStart, setFastStart] = useState<string | null>(null);
  const [protocol, setProtocol] = useState<ProtocolType>('16:8');
  
  // Hours and Minutes State
  const [customFastingHours, setCustomFastingHours] = useState(16);
  const [customFastingMinutes, setCustomFastingMinutes] = useState(0);
  const [customEatingHours, setCustomEatingHours] = useState(8);
  const [customEatingMinutes, setCustomEatingMinutes] = useState(0);
  
  const [history, setHistory] = useState<FastRecord[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Persistence
  useEffect(() => {
    setIsClient(true);
    const savedStart = localStorage.getItem('fastStart');
    const savedProtocol = localStorage.getItem('fastProtocol') as ProtocolType;
    const savedCustomFH = localStorage.getItem('customFastingHours');
    const savedCustomFM = localStorage.getItem('customFastingMinutes');
    const savedCustomEH = localStorage.getItem('customEatingHours');
    const savedCustomEM = localStorage.getItem('customEatingMinutes');
    const savedHistory = localStorage.getItem('fastHistory');

    if (savedStart) setFastStart(savedStart);
    if (savedProtocol) setProtocol(savedProtocol);
    if (savedCustomFH) setCustomFastingHours(parseInt(savedCustomFH));
    if (savedCustomFM) setCustomFastingMinutes(parseInt(savedCustomFM));
    if (savedCustomEH) setCustomEatingHours(parseInt(savedCustomEH));
    if (savedCustomEM) setCustomEatingMinutes(parseInt(savedCustomEM));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const saveHistory = useCallback((newHistory: FastRecord[]) => {
    setHistory(newHistory);
    localStorage.setItem('fastHistory', JSON.stringify(newHistory));
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('fastProtocol', protocol);
      localStorage.setItem('customFastingHours', customFastingHours.toString());
      localStorage.setItem('customFastingMinutes', customFastingMinutes.toString());
      localStorage.setItem('customEatingHours', customEatingHours.toString());
      localStorage.setItem('customEatingMinutes', customEatingMinutes.toString());
    }
  }, [protocol, customFastingHours, customFastingMinutes, customEatingHours, customEatingMinutes, isClient]);

  const getPlannedSeconds = useCallback(() => {
    if (protocol === 'Custom') {
      return (customFastingHours * 3600) + (customFastingMinutes * 60);
    }
    const p = PROTOCOLS.find(p => p.value === protocol);
    return (p?.fasting || 16) * 3600;
  }, [protocol, customFastingHours, customFastingMinutes]);

  const endFast = useCallback((early = false) => {
    if (!fastStart) return;

    const totalSeconds = getPlannedSeconds();
    const plannedHours = totalSeconds / 3600;
    const startTime = new Date(fastStart);
    const endTime = new Date();
    const actualHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const completed = !early && actualHours >= plannedHours;

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
  }, [fastStart, protocol, getPlannedSeconds, history, saveHistory]);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (fastStart) {
      interval = setInterval(() => {
        const start = new Date(fastStart).getTime();
        const now = Date.now();
        const diff = Math.floor((now - start) / 1000);
        setElapsedSeconds(diff);

        // Auto end if completed
        const plannedSec = getPlannedSeconds();
        if (diff >= plannedSec) {
          endFast(false);
        }
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [fastStart, endFast, getPlannedSeconds]);

  const startFast = () => {
    if (getPlannedSeconds() <= 0) return;
    const now = new Date().toISOString();
    setFastStart(now);
    localStorage.setItem('fastStart', now);
  };

  const resetFast = () => {
    setFastStart(null);
    localStorage.removeItem('fastStart');
    setElapsedSeconds(0);
  };

  // Normalization logic for minutes
  const handleMinutesChange = (val: string, type: 'fasting' | 'eating') => {
    const rawValue = parseInt(val) || 0;
    if (rawValue < 0) return;

    const overflowHours = Math.floor(rawValue / 60);
    const remainingMinutes = rawValue % 60;

    if (type === 'fasting') {
      if (overflowHours > 0) {
        setCustomFastingHours(prev => prev + overflowHours);
      }
      setCustomFastingMinutes(remainingMinutes);
    } else {
      if (overflowHours > 0) {
        setCustomEatingHours(prev => prev + overflowHours);
      }
      setCustomEatingMinutes(remainingMinutes);
    }
  };

  if (!isClient) return null;

  const totalPlannedSeconds = getPlannedSeconds();
  const remainingSeconds = Math.max(0, totalPlannedSeconds - elapsedSeconds);
  const progressPercent = totalPlannedSeconds > 0 
    ? Math.min(100, (elapsedSeconds / totalPlannedSeconds) * 100)
    : 0;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getMotivation = () => {
    const hours = elapsedSeconds / 3600;
    if (hours < 4) return "Stay strong, you are just getting started.";
    if (hours < 8) return "Your body is entering fat-burning mode.";
    if (hours < 12) return "Autophagy is beginning. Great progress.";
    return "Elite fasting zone. You are doing exceptional.";
  };

  const streakData = (() => {
    if (history.length === 0) return { current: 0, longest: 0 };
    const sorted = [...history]
      .filter(r => r.completed)
      .sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());
    if (sorted.length === 0) return { current: 0, longest: 0 };
    let current = 0;
    let longest = 0;
    let temp = 0;
    const dates = new Set(sorted.map(r => new Date(r.endTime).toDateString()));
    const uniqueDates = Array.from(dates).map(d => new Date(d));
    for (let i = 0; i < uniqueDates.length; i++) {
      const today = new Date();
      today.setHours(0,0,0,0);
      const checkDate = new Date(uniqueDates[i]);
      checkDate.setHours(0,0,0,0);
      const dayDiff = Math.floor((today.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24));
      if (i === 0) {
        if (dayDiff <= 1) temp = 1;
        else temp = 0;
      } else {
        const prevDate = new Date(uniqueDates[i-1]);
        prevDate.setHours(0,0,0,0);
        const diff = Math.floor((prevDate.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diff === 1) temp++;
        else temp = 1;
      }
      if (i === 0 && dayDiff <= 1) current = temp;
      longest = Math.max(longest, temp);
    }
    return { current, longest };
  })();

  const isStartDisabled = totalPlannedSeconds <= 0;

  return (
    <div className="max-w-xl mx-auto space-y-8">
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
                onClick={() => setProtocol(p.value)}
                disabled={!!fastStart}
              >
                {p.label}
              </Button>
            ))}
          </div>

          {protocol === 'Custom' && (
            <div className="space-y-6 mt-4 animate-in fade-in slide-in-from-top-2">
              {/* Fasting Duration Row */}
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fasting Duration</Label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="fastH" className="text-[10px] opacity-70">Hours</Label>
                    <Input
                      id="fastH"
                      type="number"
                      min="0"
                      max="99"
                      value={customFastingHours}
                      onChange={(e) => setCustomFastingHours(parseInt(e.target.value) || 0)}
                      disabled={!!fastStart}
                      className={cn(customFastingHours < 0 && "border-destructive")}
                    />
                  </div>
                  <span className="text-muted-foreground font-bold pt-6">:</span>
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="fastM" className="text-[10px] opacity-70">Minutes</Label>
                    <Input
                      id="fastM"
                      type="number"
                      min="0"
                      max="59"
                      value={customFastingMinutes}
                      onChange={(e) => handleMinutesChange(e.target.value, 'fasting')}
                      disabled={!!fastStart}
                      className={cn(customFastingMinutes < 0 && "border-destructive")}
                    />
                  </div>
                </div>
              </div>

              {/* Eating Duration Row */}
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Eating Duration</Label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="eatH" className="text-[10px] opacity-70">Hours</Label>
                    <Input
                      id="eatH"
                      type="number"
                      min="0"
                      max="99"
                      value={customEatingHours}
                      onChange={(e) => setCustomEatingHours(parseInt(e.target.value) || 0)}
                      disabled={!!fastStart}
                    />
                  </div>
                  <span className="text-muted-foreground font-bold pt-6">:</span>
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="eatM" className="text-[10px] opacity-70">Minutes</Label>
                    <Input
                      id="eatM"
                      type="number"
                      min="0"
                      max="59"
                      value={customEatingMinutes}
                      onChange={(e) => handleMinutesChange(e.target.value, 'eating')}
                      disabled={!!fastStart}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timer Circle */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative w-full max-w-[280px] aspect-square">
          <svg className="w-full h-full circular-timer-svg" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeDasharray="282.7"
              strokeDashoffset={282.7 - (282.7 * (fastStart ? progressPercent : 0)) / 100}
              strokeLinecap="round"
              className="timer-progress-arc"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold tracking-tighter tabular-nums">
              {formatTime(fastStart ? remainingSeconds : totalPlannedSeconds)}
            </span>
            <span className="text-sm font-medium text-muted-foreground mt-1">
              {fastStart ? 'FASTING' : 'READY TO START'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-3">
          {!fastStart ? (
            <Button 
              size="lg" 
              className={cn(
                "h-14 text-lg font-bold w-full rounded-xl transition-all",
                isStartDisabled 
                  ? "bg-secondary text-muted-foreground cursor-not-allowed opacity-50" 
                  : "bg-primary text-background hover:bg-primary/90"
              )}
              onClick={startFast}
              disabled={isStartDisabled}
            >
              <Play className="w-5 h-5 mr-2" /> Start Fast
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-3 w-full">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="h-14 font-bold rounded-xl"
                  >
                    <Square className="w-4 h-4 mr-2" /> End Early
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>End Fast Early?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to end your fast? Your progress will be saved as "Ended Early".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => endFast(true)}>End Fast</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="h-14 font-bold border-muted-foreground/20 rounded-xl"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Timer?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will clear the current fast data without saving it to your log.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={resetFast}>Reset</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        {/* Motivation & Streaks */}
        <div className="text-center space-y-4">
          <p className="text-sm text-foreground/80 italic min-h-[1.25rem]">
            {fastStart ? getMotivation() : "Choose a protocol and start your journey."}
          </p>
          
          <div className="flex items-center justify-center gap-8 pt-4 border-t border-border w-full">
            <div className="text-center">
              <span className="block text-2xl font-bold text-primary">{streakData.current}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Current Streak</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-primary">{streakData.longest}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Longest Streak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
