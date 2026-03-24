'use client';

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNotificationSettings } from '@/hooks/useNotificationSettings';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { RINGTONES, playRingtone, RingtoneName } from '@/utils/ringtones';
import { Play, Bell, Volume2, Smartphone, Monitor, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function SettingsPage() {
  const { language, setLanguage, t, languageCodes } = useLanguage();
  const { settings, updateSetting } = useNotificationSettings();
  const [pushError, setPushError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [hRef, hVis] = useScrollReveal({ delay: 0 });
  const [langSectionRef, langSectionVis] = useScrollReveal({ delay: 150 });
  const [notifRef, notifVis] = useScrollReveal({ delay: 300 });

  const sortedLanguages = useMemo(() => {
    return Object.entries(languageCodes)
      .sort((a, b) => a[1].english.localeCompare(b[1].english))
      .filter(([_, info]) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return info.english.toLowerCase().includes(query) || info.native.toLowerCase().includes(query);
      });
  }, [languageCodes, searchQuery]);

  const handlePushToggle = async (checked: boolean) => {
    if (checked) {
      if (!('Notification' in window)) {
        setPushError('Push notifications not supported.');
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSetting('pushEnabled', true);
        setPushError(null);
      } else {
        updateSetting('pushEnabled', false);
        setPushError('Notifications denied. Please check browser settings.');
      }
    } else {
      updateSetting('pushEnabled', false);
    }
  };

  return (
    <div className="max-w-3xl auto space-y-12 py-12 px-6">
      <section ref={hRef} className={cn("text-center space-y-6 transition-all", hVis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          {t('nav_settings')}
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
      </section>

      <Separator className="opacity-10" />

      {/* Language Section */}
      <section ref={langSectionRef} className={cn("space-y-8 transition-all", langSectionVis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold">{t('settings_language_heading')}</h3>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder={t('settings_search_placeholder')}
              className="pl-10 bg-card/30 border-border/50 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="bg-card/30 rounded-2xl border border-border/50 overflow-hidden">
            <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
              {sortedLanguages.length > 0 ? (
                sortedLanguages.map(([code, info]) => (
                  <div
                    key={code}
                    className={cn(
                      "w-full flex items-center justify-between p-4 transition-all hover:bg-primary/5 group border-b border-border/10 last:border-0",
                      language === code && "bg-primary/10"
                    )}
                  >
                    <div className="flex flex-col items-start text-left flex-1">
                      <span className="font-bold">{info.english}</span>
                      <span className="text-xs text-muted-foreground">{info.native}</span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(code);
                      }}
                      aria-label={`${t('settings_select_button')} ${info.english}`}
                      aria-pressed={language === code}
                      className={cn(
                        "relative w-9 h-9 flex items-center justify-center rounded-[10px] border transition-all duration-200 active:scale-[0.92] will-change-transform",
                        language === code 
                          ? "bg-primary border-primary text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]" 
                          : "bg-transparent border-border/40 text-foreground/30 hover:bg-primary/15 hover:border-primary/60 hover:text-primary/70"
                      )}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="3 8 7 12 13 4" />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground italic">
                  {t('settings_no_results')}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => { setLanguage('en'); setSearchQuery(''); }}
              className="text-xs font-bold uppercase tracking-widest"
            >
              {t('settings_restore_default')}
            </Button>
          </div>
        </div>
      </section>

      <Separator className="opacity-10" />

      {/* Notifications Section */}
      <section ref={notifRef} className={cn("space-y-8 transition-all pb-12", notifVis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">Alert Triggers</h3>
          </div>
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 space-y-2">
            <ToggleSwitch label="Notify when fasting ends" checked={settings.notifyFasting} onChange={(val) => updateSetting('notifyFasting', val)} />
            <Separator className="opacity-10 my-2" />
            <ToggleSwitch label="Notify when eating ends" checked={settings.notifyEating} onChange={(val) => updateSetting('notifyEating', val)} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Volume2 className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">Audio & Haptics</h3>
          </div>
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 space-y-4">
            <ToggleSwitch label="Play sound alert" checked={settings.soundEnabled} onChange={(val) => updateSetting('soundEnabled', val)} />
            {settings.soundEnabled && (
              <div className="pt-4 space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Ringtone</label>
                <div className="flex gap-2">
                  <Select value={settings.selectedRingtone} onValueChange={(val) => updateSetting('selectedRingtone', val as RingtoneName)}>
                    <SelectTrigger className="flex-1 bg-background/50 border-border/50 h-12"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {RINGTONES.map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button variant="secondary" size="icon" className="h-12 w-12 bg-primary/10 text-primary" onClick={() => playRingtone(settings.selectedRingtone)}>
                    <Play className="w-4 h-4 fill-current" />
                  </Button>
                </div>
              </div>
            )}
            <Separator className="opacity-10 my-2" />
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-muted-foreground" />
              <ToggleSwitch label="Vibrate device" checked={settings.vibrationEnabled} onChange={(val) => updateSetting('vibrationEnabled', val)} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Monitor className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">System Notifications</h3>
          </div>
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 space-y-2">
            <ToggleSwitch label="Enable push notifications" checked={settings.pushEnabled} onChange={handlePushToggle} />
            {pushError && <p className="text-xs text-destructive mt-2">{pushError}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
