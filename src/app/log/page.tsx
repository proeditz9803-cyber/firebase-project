"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FastRecord, EatingRecord } from '@/lib/fasting-types';
import { cn } from '@/lib/utils';
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
import { Trash2, History, Award, Clock, Utensils, AlertCircle } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function LogPage() {
  const [headerRef, isHeaderVisible] = useScrollReveal({ delay: 0 });
  const [statsRef, isStatsVisible] = useScrollReveal({ delay: 150 });
  const [listRef, isListVisible] = useScrollReveal({ delay: 300 });

  const [history, setHistory] = useState<FastRecord[]>([]);
  const [eatingHistory, setEatingHistory] = useState<EatingRecord[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('fastHistory');
      const savedEatingHistory = localStorage.getItem('eatingHistory');
      if (savedHistory) {
        try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error("Failed to parse fasting history", e); }
      }
      if (savedEatingHistory) {
        try { setEatingHistory(JSON.parse(savedEatingHistory)); } catch (e) { console.error("Failed to parse eating history", e); }
      }
    }
  }, []);

  const clearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fastHistory');
      localStorage.removeItem('eatingHistory');
      setHistory([]);
      setEatingHistory([]);
    }
  };

  const totalFasts = history.length;
  const completedFasts = history.filter(r => r.completed).length;
  const earlyEndedFasts = history.filter(r => !r.completed).length;
  const completedEatingPeriods = eatingHistory.length;
  const totalHours = history.reduce((acc, curr) => acc + curr.actualHours, 0);
  const averageHours = totalFasts > 0 ? totalHours / totalFasts : 0;

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const hasAnyHistory = totalFasts > 0 || completedEatingPeriods > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div ref={headerRef} className={cn("flex items-center justify-between transition-all", isHeaderVisible ? 'scroll-reveal-visible' : 'scroll-reveal-hidden')}>
        <h1 className="text-3xl font-bold tracking-tight">Fasting Log</h1>
        {isClient && hasAnyHistory && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4 mr-2" /> Reset Log
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Log?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. All your fasting and eating history will be cleared.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Dismiss</AlertDialogCancel>
                <AlertDialogAction onClick={clearHistory}>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div ref={statsRef} className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 transition-all", isStatsVisible ? 'scroll-reveal-visible' : 'scroll-reveal-hidden')}>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Award className="w-4 h-4 mr-2 text-primary" /> Completed fasts
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{isClient ? completedFasts : 0}</div></CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Utensils className="w-4 h-4 mr-2 text-amber-500" /> Completed eating periods
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{isClient ? completedEatingPeriods : 0}</div></CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-destructive" /> Early ended fasts
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{isClient ? earlyEndedFasts : 0}</div></CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" /> Total Hours
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{isClient ? totalHours.toFixed(1) : '0.0'}h</div></CardContent>
        </Card>
        <Card className="bg-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <History className="w-4 h-4 mr-2 text-primary" /> Avg. Duration
            </CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{isClient ? averageHours.toFixed(1) : '0.0'}h</div></CardContent>
        </Card>
      </div>
     
     <div ref={listRef} className={cn("space-y-4 transition-all min-h-[100px]", isListVisible ? 'scroll-reveal-visible' : 'scroll-reveal-hidden')}>
        {isClient ? (
          history.length === 0 ? (
            <div className="text-center py-20 bg-secondary/20 rounded-2xl border-2 border-dashed border-border">
              <History className="w-12 h-12 mx-auto text-muted-foreground opacity-20" />
              <p className="mt-4 text-muted-foreground">No fasting history yet. Start your first fast to see it here.</p>
            </div>
          ) : (
            history.map((record) => (
              <Card key={record.id} className="bg-card border-none shadow-md overflow-hidden">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                      {new Date(record.startTime).toLocaleDateString(undefined, {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{record.plannedProtocol}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground text-sm">
                        {new Date(record.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                        {new Date(record.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <div className="text-sm font-medium text-muted-foreground">Duration</div>
                      <div className="text-lg font-bold text-primary">{formatDuration(record.actualHours)}</div>
                    </div>
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        record.completed
                          ? "bg-primary/20 text-primary border-primary/20"
                          : "bg-amber-500/20 text-amber-500 border-amber-500/20"
                      )}
                      variant="outline"
                    >
                      {record.completed ? 'Completed' : 'Ended Early'}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))
          )
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-muted-foreground">Loading history...</div>
          </div>
        )}
      </div>
    </div>
  );
}