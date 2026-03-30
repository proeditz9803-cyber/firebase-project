'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNotificationSettings } from '@/hooks/useNotificationSettings';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { RINGTONES, playRingtone, RingtoneName } from '@/utils/ringtones';
import { Play, Bell, Volume2, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { settings, updateSetting } = useNotificationSettings();
  
  const [hRef, hVis] = useScrollReveal({ delay: 0 });
  const [notifRef, notifVis] = useScrollReveal({ delay: 150 });

  const handlePushToggle = async (checked: boolean) => {
    if (checked) {
      if (!('Notification' in window)) {
        alert('Push notifications not supported in this browser.');
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSetting('pushEnabled', true);
      } else {
        updateSetting('pushEnabled', false);
        alert('Notifications denied. Please check browser settings.');
      }
    } else {
      updateSetting('pushEnabled', false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 px-6">
      <section ref={hRef} className={cn("text-center space-y-6 transition-all", hVis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          App Settings
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
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
          </div>
        </div>
      </section>
    </div>
  );
}
