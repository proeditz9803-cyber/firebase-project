/**
 * @fileOverview Settings page for FasTrack notification preferences.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNotificationSettings } from '@/hooks/useNotificationSettings';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { RINGTONES, playRingtone, RingtoneName } from '@/utils/ringtones';
import { Play, Bell, Volume2, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { settings, updateSetting, isLoaded } = useNotificationSettings();
  const [pushError, setPushError] = useState<string | null>(null);
  
  const [hRef, hVis] = useScrollReveal({ delay: 0 });
  const [sRef, sVis] = useScrollReveal({ delay: 150 });

  const handlePushToggle = async (checked: boolean) => {
    if (checked) {
      if (!('Notification' in window)) {
        setPushError('Push notifications are not supported in this browser.');
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSetting('pushEnabled', true);
        setPushError(null);
      } else {
        updateSetting('pushEnabled', false);
        setPushError('Browser notifications were denied. Please enable them in your browser settings.');
      }
    } else {
      updateSetting('pushEnabled', false);
      setPushError(null);
    }
  };

  if (!isLoaded) return null;

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
          Preferences
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Settings
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Notifications</h2>
        </div>
      </section>

      {/* Settings Section */}
      <section 
        ref={sRef}
        className={cn(
          "space-y-8 transition-all",
          sVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">Alert Triggers</h3>
          </div>
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 space-y-2">
            <ToggleSwitch 
              label="Notify when fasting period ends" 
              checked={settings.notifyFasting} 
              onChange={(val) => updateSetting('notifyFasting', val)} 
            />
            <Separator className="opacity-10 my-2" />
            <ToggleSwitch 
              label="Notify when eating period ends" 
              checked={settings.notifyEating} 
              onChange={(val) => updateSetting('notifyEating', val)} 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Volume2 className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">Audio & Haptics</h3>
          </div>
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 space-y-4">
            <ToggleSwitch 
              label="Play sound alert on completion" 
              checked={settings.soundEnabled} 
              onChange={(val) => updateSetting('soundEnabled', val)} 
            />
            
            {settings.soundEnabled && (
              <div className="pt-4 space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Ringtone</label>
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
                label="Vibrate device on completion" 
                checked={settings.vibrationEnabled} 
                onChange={(val) => updateSetting('vibrationEnabled', val)} 
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 pb-12">
          <div className="flex items-center gap-3 mb-2">
            <Monitor className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">System Notifications</h3>
          </div>
          <div className="bg-card/30 p-6 rounded-2xl border border-border/50 space-y-2">
            <ToggleSwitch 
              label="Enable browser push notifications" 
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
