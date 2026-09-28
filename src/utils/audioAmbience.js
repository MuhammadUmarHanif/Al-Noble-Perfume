// Ambient Soundscape Synthesizer for AL NOBLE AMEER using Web Audio API
// Generates a warm, luxurious, low-frequency atmospheric drone with golden harmonics

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);

    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.masterGain.connect(filter);
    filter.connect(this.ctx.destination);

    // Frequencies for a royal warm meditative chord (D minor9 / golden overtone)
    // 58.27Hz (Bb1), 73.42Hz (D2), 110Hz (A2), 146.83Hz (D3), 220Hz (A3)
    const baseFreqs = [58.27, 73.42, 110.0, 146.83, 220.0];

    baseFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Micro detune for celestial shimmer
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.ctx.currentTime);

      const amp = (0.12 / (i + 1)) * 0.4;
      gain.gain.setValueAtTime(amp, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscillators.push({ osc, gain });
    });
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Fade out
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      this.isPlaying = false;
    } else {
      // Fade in
      this.masterGain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 2.0);
      this.isPlaying = true;
    }
    return this.isPlaying;
  }

  playMistChime() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(880 + Math.random() * 200, this.ctx.currentTime);
      chimeGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chimeOsc.start();
      chimeOsc.stop(this.ctx.currentTime + 1.5);
    } catch {
      // Silent catch
    }
  }
}

export const luxuryAudio = new SoundManager();
