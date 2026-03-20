import { useState, useEffect } from 'react';
import { RingtoneName } from '@/utils/ringtones';

export interface NotificationSettings {
  notifyFasting: boolean;
  notifyEating: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  pushEnabled: boolean;
  selectedRingtone: RingtoneName;
}

const STORAGE_KEYS = {
  notifyFasting: 'fastrack-notify-fasting-complete',
  notifyEating: 'fastrack-notify-eating-complete',
  soundEnabled: 'fastrack-notify-sound',
  vibrationEnabled: 'fastrack-notify-vibration',
  pushEnabled: 'fastrack-notify-push',
  selectedRingtone: 'fastrack-selected-ringtone',
};

export function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    notifyFasting: true,
    notifyEating: true,
    soundEnabled: true,
    vibrationEnabled: true,
    pushEnabled: false,
    selectedRingtone: 'Gentle Chime',
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded: Partial<NotificationSettings> = {};
    
    const getStoredBool = (key: string, def: boolean) => {
      const val = localStorage.getItem(key);
      return val === null ? def : val === 'true';
    };

    loaded.notifyFasting = getStoredBool(STORAGE_KEYS.notifyFasting, true);
    loaded.notifyEating = getStoredBool(STORAGE_KEYS.notifyEating, true);
    loaded.soundEnabled = getStoredBool(STORAGE_KEYS.soundEnabled, true);
    loaded.vibrationEnabled = getStoredBool(STORAGE_KEYS.vibrationEnabled, true);
    loaded.pushEnabled = getStoredBool(STORAGE_KEYS.pushEnabled, false);
    loaded.selectedRingtone = (localStorage.getItem(STORAGE_KEYS.selectedRingtone) as RingtoneName) || 'Gentle Chime';

    setSettings(loaded as NotificationSettings);
    setIsLoaded(true);
  }, []);

  const updateSetting = <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(STORAGE_KEYS[key], value.toString());
  };

  return { settings, updateSetting, isLoaded };
}
