/**
 * @fileOverview Settings page for FasTrack notification and language preferences.
 * Includes sections for language selection and notification alerts.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNotificationSettings } from '@/hooks/useNotificationSettings';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { RINGTONES, playRingtone, RingtoneName } from '@/utils/ringtones';
import { Play, Bell, Volume2, Smartphone, Monitor, Globe, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { LANGUAGES } from '@/utils/translations';

/**
 * Custom Tick Icon SVG
 */
const TickIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-200"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function SettingsPage() {
  const { settings, updateSetting, isLoaded } = useNotificationSettings();
  const { language, setLanguage, t } = useLanguage();
  const [pushError, setPushError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [hRef, hVis] = useScrollReveal({ delay: 0 });
  const [langRef, langVis] = useScrollReveal({ delay: 0 });
  const [searchRef, searchVis] = useScrollReveal({ delay: 150 });
  const [listRef, listVis] = useScrollReveal({ delay: 300 });
  const [resetRef, resetVis] = useScrollReveal({ delay: 450 });
  const [notifRef, notifVis] = useScrollReveal({ delay: 600 });

  const filteredLanguages = useMemo(() => {
    return LANGUAGES.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.native.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery]);

  const handlePushToggle = async (checked: boolean) => {
    if (checked) {
      if (typeof window === 'undefined' || !('Notification' in window)) {
        setPushError('Push notifications are not supported in this browser.');
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSetting('pushEnabled', true);
        setPushError(null);
      } else {
        updateSetting('pushEnabled', false);
        setPushError(t('settings.pushDenied'));
      }
    } else {
      updateSetting('pushEnabled', false);
      setPushError(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 px-6">
      {/* Brand Header */}
      <section 
        ref={hRef}
        className={cn(
          "text-center space-y-6 transition-all",
          hVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          {t('settings.title')}
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
      </section>

      {/* Language Section */}
      <section 
        ref={langRef}
        className={cn(
          "space-y-8 transition-all",
          langVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <Globe className="text-primary w-5 h-5" />
          <h3 className="text-xl font-bold">{t('settings.language')}</h3>
        </div>

        <div className="space-y-6">
          {/* Search Bar */}
          <div 
            ref={searchRef}
            className={cn(
              "relative group transition-all",
              searchVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
            )}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('settings.searchPlaceholder')}
              className="pl-11 pr-11 h-12 bg-card/30 border-border/50 focus:ring-primary/20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Language List */}
          <div 
            ref={listRef}
            className={cn(
              "bg-card/30 rounded-2xl border border-border/50 overflow-hidden transition-all",
              listVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
            )}
          >
            <ScrollArea className="h-[400px]">
              {filteredLanguages.length > 0 ? (
                <div className="divide-y divide-border/10">
                  {filteredLanguages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <div
                        key={lang.code}
                        role="button"
                        tabIndex={0}
                        onClick={() => setLanguage(lang.code)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setLanguage(lang.code);
                          }
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-6 py-4 hover:bg-primary/5 transition-all text-left group cursor-pointer",
                          isSelected && "bg-primary/5 border-l-4 border-primary"
                        )}
                      >
                        <div className="flex flex-col flex-1">
                          <span className={cn("font-medium transition-colors", isSelected && "text-primary")}>
                            {lang.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lang.native}
                          </span>
                        </div>
                        
                        {/* Dedicated Selection Tick Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLanguage(lang.code);
                          }}
                          aria-label={`Select ${lang.name}`}
                          aria-pressed={isSelected}
                          className={cn(
                            "relative flex items-center justify-center w-9 h-9 rounded-[10px] border transition-all duration-200 will-change-transform active:scale-[0.92]",
                            isSelected 
                              ? "bg-primary border-primary text-background shadow-[0_2px_8px_rgba(0,0,0,0.15)]" 
                              : "bg-transparent border-border/40 text-foreground/30 hover:bg-primary/15 hover:border-primary/60 hover:text-primary/70"
                          )}
                        >
                          <TickIcon />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <p>{t('settings.noResults')}</p>
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Restore Default */}
          <div 
            ref={resetRef}
            className={cn(
              "flex justify-center transition-all",
              resetVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
            )}
          >
            <Button 
              variant="outline" 
              onClick={() => setLanguage('en')}
              className="border-primary/20 hover:bg-primary/10 text-primary"
            >
              {t('settings.restoreDefault')}
            </Button>
          </div>
        </div>
      </section>

      <Separator className="opacity-10" />

      {/* Notifications Section */}
      <section 
        ref={notifRef}
        className={cn(
          "space-y-8 transition-all",
          notifVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">{t('settings.alertTriggers')}</h3>
          </div>
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 space-y-2">
            <ToggleSwitch 
              label={t('settings.notifyFasting')} 
              checked={settings.notifyFasting} 
              onChange={(val) => updateSetting('notifyFasting', val)} 
            />
            <Separator className="opacity-10 my-2" />
            <ToggleSwitch 
              label={t('settings.notifyEating')} 
              checked={settings.notifyEating} 
              onChange={(val) => updateSetting('notifyEating', val)} 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Volume2 className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">{t('settings.audioHaptics')}</h3>
          </div>
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 space-y-4">
            <ToggleSwitch 
              label={t('settings.soundEnabled')} 
              checked={settings.soundEnabled} 
              onChange={(val) => updateSetting('soundEnabled', val)} 
            />
            
            {settings.soundEnabled && (
              <div className="pt-4 space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('settings.selectRingtone')}</label>
                <div className="flex gap-2">
                  <Select 
                    value={settings.selectedRingtone} 
                    onValueChange={(val) => updateSetting('selectedRingtone', val as RingtoneName)}
                  >
                    <SelectTrigger className="flex-1 bg-background/50 border-border/50 h-12 font-medium">
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {RINGTONES.map((name) => (
                        <SelectItem key={name} value={name} className="flex justify-between items-center w-full">
                          <span>{name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-12 w-12 bg-primary/10 text-primary hover:bg-primary/20"
                    onClick={() => playRingtone(settings.selectedRingtone)}
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </Button>
                </div>
              </div>
            )}

            <Separator className="opacity-10 my-2" />
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-muted-foreground" />
              <ToggleSwitch 
                label={t('settings.vibrateEnabled')} 
                checked={settings.vibrationEnabled} 
                onChange={(val) => updateSetting('vibrationEnabled', val)} 
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 pb-12">
          <div className="flex items-center gap-3 mb-2">
            <Monitor className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">{t('settings.systemNotifications')}</h3>
          </div>
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 space-y-2">
            <ToggleSwitch 
              label={t('settings.pushEnabled')} 
              checked={settings.pushEnabled} 
              onChange={handlePushToggle} 
            />
            {pushError && (
              <p className="text-xs text-destructive mt-2 animate-in fade-in slide-in-from-top-1" aria-live="polite">
                {pushError}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
