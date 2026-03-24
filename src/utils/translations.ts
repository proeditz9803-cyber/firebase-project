/**
 * @fileOverview Centralized translation dictionary for FasTrack.
 * Organized by component and page for easy maintenance.
 */

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'zh-CN', name: 'Chinese', native: '简体中文' }
];

export const translations: Record<string, any> = {
  en: {
    navigation: {
      timer: 'Timer',
      log: 'Log',
      guide: 'Guide',
      settings: 'Settings',
      aboutUs: 'About Us',
      privacyPolicy: 'Privacy Policy',
      contactUs: 'Contact Us',
      terms: 'Terms'
    },
    timer: {
      protocolLabel: 'Select Protocol',
      fastingPeriod: 'Fasting Period',
      eatingPeriod: 'Eating Period',
      hours: 'Hours',
      minutes: 'Minutes',
      remaining: 'REMAINING',
      startFasting: 'Start Fasting',
      startEating: 'Start Eating',
      endEarly: 'End Early',
      reset: 'Reset',
      active: 'ACTIVE',
      inactive: 'INACTIVE',
      confirmEndTitle: 'End Fast Early?',
      confirmEndCancel: 'Cancel',
      confirmEndAction: 'End Fast',
      switchMode: 'Switch to {mode}',
      tapToSwitch: 'Tap to switch your active timer period',
      currentlyActive: 'Currently Active: {mode}',
      fastingComplete: 'Fasting Complete',
      fastingCompleteDesc: 'Your fasting period is complete. Time to eat.',
      eatingComplete: 'Eating Complete',
      eatingCompleteDesc: 'Your eating period has ended. Ready to begin your fast.'
    },
    log: {
      title: 'Fasting History',
      clearHistory: 'Clear History',
      totalFasts: 'Total Fasts',
      totalHours: 'Total Hours',
      avgDuration: 'Avg. Duration',
      noHistory: 'No history yet. Start your first fast!',
      duration: 'Duration',
      completed: 'Completed',
      endedEarly: 'Ended Early',
      confirmClearTitle: 'Clear All History?',
      confirmClearDesc: 'This action cannot be undone.',
      confirmClearCancel: 'Cancel',
      confirmClearAction: 'Clear All'
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      alertTriggers: 'Alert Triggers',
      notifyFasting: 'Notify when fasting ends',
      notifyEating: 'Notify when eating ends',
      audioHaptics: 'Audio & Haptics',
      soundEnabled: 'Play sound alert',
      selectRingtone: 'Select Ringtone',
      vibrateEnabled: 'Vibrate device',
      systemNotifications: 'System Notifications',
      pushEnabled: 'Enable push notifications',
      searchPlaceholder: 'Search languages...',
      noResults: 'No languages found',
      restoreDefault: 'Restore Default',
      pushDenied: 'Notifications denied. Please check browser settings.'
    },
    common: {
      dismiss: 'Dismiss',
      getInTouch: 'Get In Touch'
    }
  },
  es: {
    navigation: {
      timer: 'Temporizador',
      log: 'Registro',
      guide: 'Guía',
      settings: 'Ajustes',
      aboutUs: 'Nosotros',
      privacyPolicy: 'Privacidad',
      contactUs: 'Contacto',
      terms: 'Términos'
    },
    timer: {
      protocolLabel: 'Seleccionar Protocolo',
      fastingPeriod: 'Periodo de Ayuno',
      eatingPeriod: 'Periodo de Comer',
      hours: 'Horas',
      minutes: 'Minutos',
      remaining: 'RESTANTE',
      startFasting: 'Empezar Ayuno',
      startEating: 'Empezar a Comer',
      endEarly: 'Terminar Antes',
      reset: 'Reiniciar',
      active: 'ACTIVO',
      inactive: 'INACTIVO'
    },
    settings: {
      title: 'Ajustes',
      language: 'Idioma'
    }
  }
};
