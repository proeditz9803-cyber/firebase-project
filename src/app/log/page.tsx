"use client"

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FastRecord, EatingRecord } from '@/lib/fasting-types';
import { cn } from '@/lib/utils';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, History, Award, Clock, Utensils, AlertCircle } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

type UnifiedRecord =
  | { recordType: 'fasting'; data: FastRecord }
  | { recordType: 'eating'; data: EatingRecord };

export default function LogPage() {
  const [headerRef, isHeaderVisible] = useScrollReveal({ delay: 0 });
  const [statsRef, isStatsVisible] = useScrollReveal({ delay: 150 });
  const [listRef, isListVisible] = useScrollReveal({ delay: 300 });

  const [history, setHistory] = useState<FastRecord[]>([]);
  const [eatingHistory, setEatingHistory] = useState<EatingRecord[]>([]);
  const [isClient, setIsClient] = useState(false);

  const loadHistory = useCallback(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('fastHistory');
      const savedEatingHistory = localStorage.getItem('eatingHistory');
      if (savedHistory) {
        try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error("Failed to parse fasting history", e); }
      } else { setHistory([]); }
      if (savedEatingHistory) {
        try { setEatingHistory(JSON.parse(savedEatingHistory)); } catch (e) { console.error("Failed to parse eating history", e); }
      } else { setEatingHistory([]); }
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    const handleHistoryUpdate = () => loadHistory();
    window.addEventListener('fastrack-history-updated', handleHistoryUpdate);
    return () => window.removeEventListener('fastrack-history-updated', handleHistoryUpdate);
  }, [loadHistory]);

  const clearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fastHistory');
      localStorage.removeItem('eatingHistory');
      setHistory([]); setEatingHistory([]);
    }
  };

  const totalFasts = history.length;
  const completedFasts = history.filter(r => r.completed).length;
  const earlyEndedFasts = history.filter(r => !r.completed).length;
  const completedEatingPeriods = eatingHistory.filter(r => r.completed).length;
  const earlyEndedEatingPeriods = eatingHistory.filter(r => !r.completed).length;
  const totalHours = history.reduce((acc, curr) => acc + curr.actualHours, 0);
  const averageHours = totalFasts > 0 ? totalHours / totalFasts : 0;
  const hasAnyHistory = totalFasts > 0 || eatingHistory.length > 0;

  const unifiedRecords: UnifiedRecord[] = [
    ...history.map(r => ({ recordType: 'fasting' as const, data: r })),
    ...eatingHistory.map(r => ({ recordType: 'eating' as const, data: r })),
  ].sort((a, b) => new Date(b.data.startTime).getTime() - new Date(a.data.startTime).getTime());

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div ref={headerRef} className={cn("flex items-center justify-between transition-all", isHeaderVisible ? 'scroll-reveal-visible' : 'scroll-reveal-hidden')}>
        <h1 className="text-3xl font-bold tracking-tight select-none">Fasting Log</h1>
        {isClient && hasAnyHistory && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 select-none">
                <Trash2 className="w-4 h-4 mr-2" /> Reset Log
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="select-none">Reset Log?</AlertDialogTitle>
                <AlertDialogDescription className="select-none">This action cannot be undone. All your fasting and eating history will be cleared.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="select-none">Dismiss</AlertDialogCancel>
                <AlertDialogAction className="select-none" onClick={clearHistory}>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div ref={statsRef} className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 transition-all", isStatsVisible ? 'scroll-reveal-visible' : 'scroll-reveal-hidden')}>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center select-none">
              <Award className="w-4 h-4 mr-2 text-primary" /> Completed fasts
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold select-none">{isClient ? completedFasts : 0}</div></CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center select-none">
              <Utensils className="w-4 h-4 mr-2 text-amber-500" /> Completed eating periods
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold select-none">{isClient ? completedEatingPeriods : 0}</div></CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center select-none">
              <AlertCircle className="w-4 h-4 mr-2 text-destructive" /> Early ended fasts
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold select-none">{isClient ? earlyEndedFasts : 0}</div></CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center select-none">
              <AlertCircle className="w-4 h-4 mr-2 text-destructive" /> Early ended eating periods
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold select-none">{isClient ? earlyEndedEatingPeriods : 0}</div></CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center select-none">
              <Clock className="w-4 h-4 mr-2 text-primary" /> Total Hours
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold select-none">{isClient ? totalHours.toFixed(1) : '0.0'}h</div></CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center select-none">
              <History className="w-4 h-4 mr-2 text-primary" /> Avg. Duration
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold select-none">{isClient ? averageHours.toFixed(1) : '0.0'}h</div></CardContent>
        </Card>
      </div>

    <div ref={listRef} className={cn("space-y-4 transition-all min-h-[100px]", isListVisible ? 'scroll-reveal-visible' : 'scroll-reveal-hidden')}>
        {isClient ? (
          unifiedRecords.length === 0 ? (
            <div className="text-center py-20 bg-secondary/20 rounded-2xl border-2 border-dashed border-border">
              <History className="w-12 h-12 mx-auto text-muted-foreground opacity-20" />
              <p className="mt-4 text-muted-foreground select-none">No history yet. Start your first fast to see it here.</p>
            </div>
          ) : (
            unifiedRecords.map((record) => {
              const isFasting = record.recordType === 'fasting';
              const data = record.data;
              const isCompleted = data.completed;
              const protocol = isFasting ? (data as FastRecord).plannedProtocol : null;
              const badgeClass = isFasting
                ? isCompleted
                  ? "bg-primary/20 text-primary border-primary/20"
                  : "bg-amber-500/20 text-amber-500 border-amber-500/20"
                : isCompleted
                  ? "bg-amber-500/20 text-amber-500 border-amber-500/20"
                  : "bg-destructive/20 text-destructive border-destructive/20";
              const badgeLabel = isCompleted ? 'Completed' : 'Ended Early';
              return (
                <Card key={data.id} className="bg-card border-none shadow-md overflow-hidden">
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest select-none px-2 py-0.5 rounded-full", isFasting ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-500")}>
                          {isFasting ? 'Fasting' : 'Eating Period'}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest select-none">
                        {new Date(data.startTime).toLocaleDateString(undefined, {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        {protocol && <span className="text-lg font-bold select-none">{protocol}</span>}
                        {protocol && <span className="text-muted-foreground select-none">•</span>}
                        <span className="text-muted-foreground text-sm select-none">
                          {new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                          {new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="text-right">
                        <div className="text-sm font-medium text-muted-foreground select-none">Duration</div>
                        <div className={cn("text-lg font-bold select-none", isFasting ? "text-primary" : "text-amber-500")}>
                          {formatDuration(data.actualHours)}
                        </div>
                      </div>
                      <Badge className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider select-none", badgeClass)} variant="outline">
                        {badgeLabel}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })
          )
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-muted-foreground select-none">Loading history...</div>
          </div>
        )}
      </div>
    </div>
  );
}