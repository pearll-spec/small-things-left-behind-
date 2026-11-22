import { ActNumber, AudioMode, KeepsakeId } from '../types/story';

/**
 * Zero-dependency Web Audio Synthesizer for Small Things Left Behind.
 * Generates warm felt-piano progressions shifting across Acts I–IV,
 * filtered window rain ambience, mechanical clockwork ticks, music box chimes,
 * ceramic clinks, and archival paper rustles.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private rainSource: AudioBufferSourceNode | null = null;
  private chordTimer: number | null = null;

  private musicEnabled = true;
  private rainEnabled = true;
  private currentAct: ActNumber = 1;
  private chordStep = 0;
  private isStarted = false;

  // Felt piano chord progressions per Act (MIDI note numbers)
  private readonly actProgressions: Record<ActNumber, number[][]> = {
    // Act I: November Dusk (warm melancholic Dmaj9 -> Bm7 -> Gmaj7 -> A6)
    1: [
      [50, 57, 61, 64, 66],
      [47, 54, 57, 61, 66],
      [43, 50, 54, 59, 62],
      [45, 52, 57, 61, 64],
    ],
    // Act II: Streetlights & Summers (wistful F#m7 -> Dmaj9 -> E6 -> Aadd9)
    2: [
      [42, 49, 52, 57, 61],
      [50, 57, 61, 64, 66],
      [40, 47, 52, 56, 61],
      [45, 52, 57, 59, 64],
    ],
    // Act III: Quiet Mornings (rainy Am9 -> Fmaj7 -> Dm9 -> E7sus4)
    3: [
      [45, 52, 55, 59, 64],
      [41, 48, 52, 57, 60],
      [50, 57, 60, 64, 67],
      [40, 47, 52, 57, 59],
    ],
    // Act IV: What Remains (gentle resolution Cmaj9 -> Am11 -> Fmaj9 -> G6)
    4: [
      [48, 55, 59, 62, 64],
      [45, 52, 55, 60, 62],
      [41, 48, 52, 55, 60],
      [43, 50, 55, 59, 64],
    ],
  };

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.72;
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.musicEnabled ? 0.38 : 0;
      this.musicGain.connect(this.masterGain);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.value = this.rainEnabled ? 0.22 : 0;
      this.rainGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Ignore autoplay restrictions until next user gesture
      });
    }

    return this.ctx;
  }

  public unlockAndStart() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    if (!this.isStarted) {
      this.isStarted = true;
      this.startRainAmbience();
      this.startPianoLoop();
    }
  }

  public setAct(act: ActNumber) {
    this.currentAct = act;
  }

  public applySettings(mode: AudioMode, musicEnabled: boolean, rainEnabled: boolean) {
    this.musicEnabled = mode !== 'off' && musicEnabled;
    this.rainEnabled = mode === 'piano-rain' && rainEnabled;

    if (this.ctx && this.musicGain && this.rainGain) {
      const now = this.ctx.currentTime;
      this.musicGain.gain.cancelScheduledValues(now);
      this.musicGain.gain.setTargetAtTime(this.musicEnabled ? 0.38 : 0, now, 0.25);

      this.rainGain.gain.cancelScheduledValues(now);
      this.rainGain.gain.setTargetAtTime(this.rainEnabled ? 0.22 : 0, now, 0.35);
    }
  }

  private midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private playFeltPianoNote(freq: number, delaySec: number, durationSec: number, velocity = 0.14) {
    const ctx = this.ctx;
    if (!ctx || !this.musicGain || !this.musicEnabled) return;

    const now = ctx.currentTime + delaySec;

    // Warm felt hammer: triangle + soft sine sub-harmonic through a lowpass damper
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(980, now);
    filter.frequency.exponentialRampToValueAtTime(340, now + durationSec);

    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(velocity, now + 0.045);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.42, now + 0.8);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.value = 0.2;

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec + 0.05);
    osc2.stop(now + durationSec + 0.05);
  }

  private startPianoLoop() {
    if (this.chordTimer !== null) return;

    const triggerChord = () => {
      if (this.musicEnabled && this.ctx && this.ctx.state === 'running') {
        const prog = this.actProgressions[this.currentAct];
        const chord = prog[this.chordStep % prog.length];
        chord.forEach((midi, idx) => {
          const strum = idx * 0.11 + (Math.random() * 0.03);
          const vel = idx === 0 ? 0.14 : idx === chord.length - 1 ? 0.11 : 0.095;
          this.playFeltPianoNote(this.midiToFreq(midi), strum, 4.1, vel);
        });
        this.chordStep = (this.chordStep + 1) % 16;
      }
    };

    triggerChord();
    this.chordTimer = window.setInterval(triggerChord, 4200);
  }

  private startRainAmbience() {
    const ctx = this.ctx;
    if (!ctx || !this.rainGain || this.rainSource) return;

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pink-ish noise for warm rain against window glass
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
      b6 = white * 0.115926;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 340;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1850;

    src.connect(hp);
    hp.connect(lp);
    lp.connect(this.rainGain);
    src.start();
    this.rainSource = src;
  }

  public playClockTick(accent = false) {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain || (!this.musicEnabled && !this.rainEnabled)) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(accent ? 1320 : 980, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.025);

    const g = ctx.createGain();
    g.gain.setValueAtTime(accent ? 0.12 : 0.05, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.035);
  }

  public playCeramicClink() {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    const now = ctx.currentTime;

    [1980, 2940].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.012);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.08 / (idx + 1), now + idx * 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.28 + idx * 0.05);

      osc.connect(g);
      g.connect(this.masterGain!);
      osc.start(now + idx * 0.012);
      osc.stop(now + 0.36);
    });
  }

  public playPaperRustle() {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    const now = ctx.currentTime;

    const len = Math.floor(ctx.sampleRate * 0.14);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const ch = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const env = Math.sin((i / len) * Math.PI);
      ch[i] = (Math.random() * 2 - 1) * env * 0.35;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(2100, now);
    bp.Q.value = 1.1;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    src.connect(bp);
    bp.connect(g);
    g.connect(this.masterGain);
    src.start(now);
  }

  public playLampPull() {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    const now = ctx.currentTime;

    [0, 0.065].forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(idx === 0 ? 780 : 1120, now + offset);
      osc.frequency.exponentialRampToValueAtTime(280, now + offset + 0.03);

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 1600;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.07, now + offset);
      g.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.04);

      osc.connect(lp);
      lp.connect(g);
      g.connect(this.masterGain!);
      osc.start(now + offset);
      osc.stop(now + offset + 0.045);
    });
  }

  public playMusicBoxChime(midi = 81, delay = 0) {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    const now = ctx.currentTime + delay;
    const freq = this.midiToFreq(midi);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const overtone = ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2.98, now);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.11, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);

    const og = ctx.createGain();
    og.gain.setValueAtTime(0.03, now);
    og.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(g);
    overtone.connect(og);
    og.connect(g);
    g.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + 1.4);
    overtone.stop(now + 1.4);
  }

  public playStarCollect() {
    [76, 81, 88].forEach((m, i) => this.playMusicBoxChime(m, i * 0.11));
  }

  public playWoodCreak() {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(118, now);
    osc.frequency.linearRampToValueAtTime(86, now + 0.16);
    osc.frequency.linearRampToValueAtTime(104, now + 0.28);

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(340, now);
    bp.Q.value = 3.2;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.065, now + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(bp);
    bp.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.32);
  }

  public playMirrorShimmer() {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    [62, 69, 74].forEach((m, idx) => this.playMusicBoxChime(m, idx * 0.14));
  }

  public playEpilogueCrossing() {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    // Tender movement from melancholic minor to warm major dawn resolution
    const progression = [
      { notes: [50, 57, 60, 64], delay: 0.1 },
      { notes: [48, 55, 59, 64], delay: 3.2 },
      { notes: [45, 52, 57, 61, 66], delay: 6.4 },
      { notes: [50, 57, 62, 66, 69], delay: 9.6 },
    ];
    progression.forEach(({ notes, delay }) => {
      notes.forEach((m, idx) => {
        this.playFeltPianoNote(this.midiToFreq(m), delay + idx * 0.16, 4.4, 0.12);
      });
    });
    // High sunlit chimes during the bloom reveal
    [74, 78, 81, 86].forEach((m, idx) => {
      this.playMusicBoxChime(m, 7.2 + idx * 0.34);
    });
  }

  public playTypewriterTick() {
    if (!this.musicEnabled && !this.rainEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain || ctx.state !== 'running') return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420 + Math.random() * 90, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.018);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.018, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.022);
  }

  public playKeepsakeSound(id: KeepsakeId) {
    this.unlockAndStart();
    switch (id) {
      case 'bicycle-bell': {
        this.playMusicBoxChime(84, 0);
        this.playMusicBoxChime(89, 0.09);
        break;
      }
      case 'music-box': {
        [74, 78, 81, 86, 81].forEach((m, i) => this.playMusicBoxChime(m, i * 0.19));
        break;
      }
      case 'kintsugi-mug': {
        this.playCeramicClink();
        break;
      }
      case 'field-watch': {
        [0, 0.14, 0.28, 0.42].forEach((d, idx) => {
          window.setTimeout(() => this.playClockTick(idx % 2 === 0), d * 1000);
        });
        break;
      }
      case 'snow-globe': {
        [83, 86, 90, 93].forEach((m, i) => this.playMusicBoxChime(m, i * 0.08));
        break;
      }
      case 'payphone-token': {
        this.playMusicBoxChime(79, 0);
        this.playMusicBoxChime(86, 0.05);
        break;
      }
      case 'mixtape':
      case 'polaroid-camera': {
        this.playLampPull();
        break;
      }
      default: {
        this.playPaperRustle();
        break;
      }
    }
  }
}

export const soundEngine = new SoundEngine();
