/**
 * @fileOverview Web Audio API utility for generating programmatic ringtones.
 */

export type RingtoneName = 
  | 'Gentle Chime' 
  | 'Sharp Alert' 
  | 'Ascending Tones' 
  | 'Deep Bell' 
  | 'Digital Pulse' 
  | 'Soft Ding' 
  | 'Morning Bell' 
  | 'Power Up';

export const RINGTONES: RingtoneName[] = [
  'Gentle Chime',
  'Sharp Alert',
  'Ascending Tones',
  'Deep Bell',
  'Digital Pulse',
  'Soft Ding',
  'Morning Bell',
  'Power Up'
];

function createAudioContext() {
  const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
  return new AudioContextClass();
}

export async function playRingtone(name: RingtoneName) {
  try {
    const ctx = createAudioContext();
    const now = ctx.currentTime;

    switch (name) {
      case 'Gentle Chime': {
        const freqs = [523, 659, 784];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.4);
          gain.gain.setValueAtTime(0, now + i * 0.4);
          gain.gain.linearRampToValueAtTime(0.3, now + i * 0.4 + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.4 + 0.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.4);
          osc.stop(now + i * 0.4 + 0.8);
        });
        break;
      }
      case 'Sharp Alert': {
        [0, 0.25].forEach(delay => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(880, now + delay);
          gain.gain.setValueAtTime(0.2, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.15);
        });
        break;
      }
      case 'Ascending Tones': {
        const freqs = [392, 494, 587, 698];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.2);
          gain.gain.setValueAtTime(0, now + i * 0.2);
          gain.gain.linearRampToValueAtTime(0.3, now + i * 0.2 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.2 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.2);
          osc.stop(now + i * 0.2 + 0.2);
        });
        break;
      }
      case 'Deep Bell': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
        break;
      }
      case 'Digital Pulse': {
        [0, 0.14, 0.28].forEach(delay => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(440, now + delay);
          gain.gain.setValueAtTime(0.15, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.08);
        });
        break;
      }
      case 'Soft Ding': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
        break;
      }
      case 'Morning Bell': {
        const freqs = [528, 396];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.5);
          gain.gain.setValueAtTime(0.3, now + i * 0.5);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.5 + 1.0);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.5);
          osc.stop(now + i * 0.5 + 1.0);
        });
        break;
      }
      case 'Power Up': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.5);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      }
    }

    setTimeout(() => ctx.close(), 2000);
  } catch (e) {
    console.error("Web Audio API failed", e);
  }
}
