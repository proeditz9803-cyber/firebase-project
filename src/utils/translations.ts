/**
 * @fileOverview Centralized translation strings for FasTrack.
 * Includes major world languages with English fallback for all keys.
 */

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'zh-CN', name: 'Chinese Simplified', native: '简体中文' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' }
];

export const translations = {
  en: {
    navigation: {
      timer: 'Timer',
      log: 'Log',
      guide: 'Guide',
      settings: 'Settings',
      aboutUs: 'About Us',
      privacyPolicy: 'Privacy Policy',
      contactUs: 'Contact Us',
      terms: 'Terms and Conditions'
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
      eatingComplete: 'Eating Period Complete',
      eatingCompleteDesc: 'Your eating period has ended. Ready to begin your fast.'
    },
    log: {
      title: 'Fasting History',
      clearHistory: 'Clear History',
      totalFasts: 'Total Fasts',
      totalHours: 'Total Hours',
      avgDuration: 'Avg. Duration',
      noHistory: 'No fasting history yet. Start your first fast!',
      duration: 'Duration',
      completed: 'Completed',
      endedEarly: 'Ended Early',
      confirmClearTitle: 'Clear All History?',
      confirmClearDesc: 'This action cannot be undone. All your past fasting records will be permanently deleted.',
      confirmClearCancel: 'Cancel',
      confirmClearAction: 'Clear All'
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      alertTriggers: 'Alert Triggers',
      notifyFasting: 'Notify when fasting period ends',
      notifyEating: 'Notify when eating period ends',
      audioHaptics: 'Audio & Haptics',
      soundEnabled: 'Play sound alert on completion',
      selectRingtone: 'Select Ringtone',
      vibrateEnabled: 'Vibrate device on completion',
      systemNotifications: 'System Notifications',
      pushEnabled: 'Enable browser push notifications',
      searchPlaceholder: 'Search languages in English',
      noResults: 'No languages found',
      restoreDefault: 'Restore Default',
      pushDenied: 'Browser notifications were denied. Please enable them in your browser settings.'
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
      protocolLabel: 'Seleccionar protocolo',
      fastingPeriod: 'Periodo de ayuno',
      eatingPeriod: 'Periodo de comer',
      hours: 'Horas',
      minutes: 'Minutos',
      remaining: 'RESTANTE',
      startFasting: 'Empezar ayuno',
      startEating: 'Empezar a comer',
      endEarly: 'Terminar antes',
      reset: 'Reiniciar',
      active: 'ACTIVO',
      inactive: 'INACTIVO'
    }
  },
  fr: {
    navigation: {
      timer: 'Minuteur',
      log: 'Journal',
      guide: 'Guide',
      settings: 'Paramètres',
      aboutUs: 'À propos',
      privacyPolicy: 'Confidentialité',
      contactUs: 'Contact',
      terms: 'Conditions'
    },
    timer: {
      protocolLabel: 'Choisir le protocole',
      fastingPeriod: 'Période de jeûne',
      eatingPeriod: "Période d'alimentation",
      hours: 'Heures',
      minutes: 'Minutes',
      remaining: 'RESTANT',
      startFasting: 'Commencer le jeûne',
      startEating: 'Commencer à manger',
      endEarly: 'Finir tôt',
      reset: 'Réinitialiser',
      active: 'ACTIF',
      inactive: 'INACTIF'
    }
  }
};
