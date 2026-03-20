import { playRingtone, RingtoneName } from './ringtones';

export type CompletionType = 'fasting' | 'eating';

interface NotificationOptions {
  notifyFasting: boolean;
  notifyEating: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  pushEnabled: boolean;
  selectedRingtone: RingtoneName;
}

export function triggerCompletionNotifications(type: CompletionType, settings: NotificationOptions) {
  const isEnabled = type === 'fasting' ? settings.notifyFasting : settings.notifyEating;
  if (!isEnabled) return;

  // 1. Sound Alert
  if (settings.soundEnabled) {
    playRingtone(settings.selectedRingtone);
  }

  // 2. Vibration
  if (settings.vibrationEnabled && 'vibrate' in navigator) {
    const pattern = type === 'fasting' 
      ? [300, 100, 300, 100, 600] 
      : [200, 100, 200];
    navigator.vibrate(pattern);
  }

  // 3. Push Notification
  if (settings.pushEnabled && 'Notification' in window && Notification.permission === 'granted') {
    const title = 'FasTrack';
    const body = type === 'fasting'
      ? 'Your fasting period is complete. Time to eat.'
      : 'Your eating period is complete. Time to fast.';
    
    new Notification(title, {
      body,
      icon: '/favicon.ico', // Standard favicon path
    });
  }
}
