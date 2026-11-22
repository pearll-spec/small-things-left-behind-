import { ActNumber, AudioMode, KeepsakeId } from '../types/story';

/**
 * Zero-dependency Web Audio Synthesizer for Small Things Left Behind.
 * Reliable iOS Safari & desktop unlock, warm stereo-delay felt piano across Acts I–IV,
 * delicate high solo melody voices, filtered window rain, and a dedicated Finale Lament.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private reverbSend: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private rainSource: AudioBufferSourceNode | null = null;
  private chordTimer: number | null = null;
  private finaleTimer: number | null = null;

  private musicEnabled = true;
  private rainEnabled = true;
  private currentAct: ActNumber = 1;
  private chordStep = 0;
  private finaleStep = 0;
  private isStarted = false;
  private isFinaleActive = false;
  private listeners: Set<() => void> = new Set();

  // Melancholic, bittersweet felt-piano progressions per Act (MIDI note numbers)
  private readonly actProgressions: Record<
    ActNumber,
    { bass: number; inner: number[]; melody: number[] }[]
  > = {
    // Act I: November Dusk (Aching Dm9 -> Bbmaj7 -> Fadd9 -> Csus4/E)
    1: [
      { bass: 38, inner: [50, 57, 60, 64], melody: [69, 67, 65] },
      { bass: 46, inner: [53, 57, 60, 62], melody: [69, 72] },
      { bass: 41, inner: [48, 53, 57, 60], melody: [67, 65, 64] },
      { bass: 40, inner: [48, 55, 60, 62], melody: [64, 62] },
    ],
    // Act II: Echoes in Amber (Nostalgic Fmaj7 -> Dm9 -> Am7 -> G6)
    2: [
      { bass: 41, inner: [48, 53, 57, 64], melody: [72, 71, 69] },
      { bass: 38, inner: [50, 57, 60, 64], melody: [69, 67] },
      { bass: 45, inner: [52, 55, 60, 64], melody: [67, 64, 62] },
      { bass: 43, inner: [50, 55, 59, 64], melody: [64, 62] },
    ],
    // Act III: What Went Unsaid (Heavy rain Em9 -> Cmaj7 -> Am9 -> B7sus4)
    3: [
      { bass: 40, inner: [52, 55, 59, 66], melody: [71, 69, 67] },
      { bass: 36, inner: [48, 55, 59, 64], melody: [67, 66] },
      { bass: 45, inner: [52, 55, 60, 67], melody: [64, 62, 60] },
      { bass: 35, inner: [47, 52, 57, 64], melody: [62, 59] },
    ],
    // Act IV: What Remains (Bittersweet Cmaj9 -> Am11 -> Fmaj9 -> Cmaj7)
    4: [
      { bass: 36, inner: [48, 55, 59, 62], melody: [67, 69, 71] },
      { bass: 45, inner: [52, 55, 60, 62], melody: [72, 69] },
      { bass: 41, inner: [48, 52, 55, 60], melody: [69, 67, 64] },
      { bass: 36, inner: [48, 52, 55, 59], melody: [64, 67] },
    ],
  };

  // Dedicated slow, weeping-to-dawn Finale Lament (8-bar cycle)
  private readonly finaleProgression: { bass: number; inner: number[]; melody: number[] }[] = [
    { bass: 38, inner: [50, 57, 60, 64], melody: [72, 69, 67] },
    { bass: 34, inner: [46, 53, 57, 60], melody: [65, 64] },
    { bass: 43, inner: [50, 55, 58, 62], melody: [69, 67, 65] },
    { bass: 45, inner: [52, 57, 62, 64], melody: [64, 61] },
    { bass: 41, inner: [48, 53, 57, 64], melody: [72, 71, 69] },
    { bass: 40, inner: [48, 55, 60, 64], melody: [67, 64] },
    { bass: 38, inner: [50, 57, 62, 66], melody: [69, 74, 73] },
    { bass: 38, inner: [50, 57, 62, 66], melody: [74, 78] },
  ];

  public subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public isRunning(): boolean {
    return Boolean(this.ctx && this.ctx.state === 'running');
  }

  private createContextGraph(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();

      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -16;
      this.compressor.knee.value = 18;
      this.compressor.ratio.value = 3.5;
      this.compressor.attack.value = 0.01;
      this.compressor.release.value = 0.25;
      this.compressor.connect(this.ctx.destination);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.94;
      this.masterGain.connect(this.compressor);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.musicEnabled ? 0.72 : 0;
      this.musicGain.connect(this.masterGain);

      // Warm lush room echo for felt piano notes
      this.reverbSend = this.ctx.createGain();
      this.reverbSend.gain.value = 0.42;

      const delayA = this.ctx.createDelay(1.0);
      delayA.delayTime.value = 0.34;
      const delayB = this.ctx.createDelay(1.0);
      delayB.delayTime.value = 0.53;

      const feedback = this.ctx.createGain();
      feedback.gain.value = 0.36;

      const damp = this.ctx.createBiquadFilter();
      damp.type = 'lowpass';
      damp.frequency.value = 1450;

      this.reverbSend.connect(delayA);
      delayA.connect(damp);
      damp.connect(delayB);
      delayB.connect(feedback);
      feedback.connect(delayA);

      damp.connect(this.musicGain);
      delayB.connect(this.musicGain);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.value = this.rainEnabled ? 0.30 : 0;
      this.rainGain.connect(this.masterGain);

      this.ctx.onstatechange = () => {
        this.notify();
      };
    }
    return this.ctx;
  }

  private ensureContext(): AudioContext | null {
    const ctx = this.createContextGraph();
    if (!ctx) return null;

    if (ctx.state === 'suspended') {
      ctx
        .resume()
        .then(() => {
          this.notify();
        })
        .catch(() => {
          // Wait for next user gesture
        });
    }
    return ctx;
  }

  /**
   * Must be invoked synchronously inside a user tap/click handler for iOS Safari compatibility.
   */
  public unlockAndStart() {
    const ctx = this.createContextGraph();
    if (!ctx) return;

    const beginPlayback = () => {
      if (!this.isStarted) {
        this.isStarted = true;
        this.startRainAmbience();
        this.startPianoLoop();
      } else if (this.musicEnabled && !this.isFinaleActive) {
        // Trigger a gentle chord right away if returning from suspended state
        this.triggerActPhrase();
      }
      this.notify();
    };

    if (ctx.state === 'suspended') {
      // Prime a 1-sample silent buffer synchronously inside gesture to unlock iOS Safari WebAudio
      try {
        const silent = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = silent;
        src.connect(ctx.destination);
        src.start(0);
      } catch {
        // Ignore if already unlocking
      }

      ctx
        .resume()
        .then(() => {
          beginPlayback();
        })
        .catch(() => {
          // Will retry on next gesture
        });
    } else {
      beginPlayback();
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
      this.musicGain.gain.setTargetAtTime(this.musicEnabled ? 0.72 : 0, now, 0.2);

      this.rainGain.gain.cancelScheduledValues(now);
      this.rainGain.gain.setTargetAtTime(this.rainEnabled ? 0.30 : 0, now, 0.25);
    }
    this.notify();
  }

  private midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private playFeltPianoNote(
    freq: number,
    delaySec: number,
    durationSec: number,
    velocity = 0.22
  ) {
    const ctx = this.ctx;
    if (!ctx || !this.musicGain || !this.musicEnabled) return;

    const now = ctx.currentTime + delaySec;

    // Warm felt hammer: fundamental sine + soft triangle + gentle upper octave harmonic
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc3.type = 'sine';

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq, now);
    osc3.frequency.setValueAtTime(freq * 2, now);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1650, now);
    filter.frequency.exponentialRampToValueAtTime(420, now + durationSec);

    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(velocity, now + 0.035);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.48, now + 0.85);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    const g1 = ctx.createGain();
    g1.gain.value = 0.65;
    const g2 = ctx.createGain();
    g2.gain.value = 0.35;
    const g3 = ctx.createGain();
    g3.gain.value = 0.14;

    osc1.connect(g1);
    osc2.connect(g2);
    osc3.connect(g3);
    g1.connect(filter);
    g2.connect(filter);
    g3.connect(filter);

    filter.connect(noteGain);
    noteGain.connect(this.musicGain);
    if (this.reverbSend) {
      noteGain.connect(this.reverbSend);
    }

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + durationSec + 0.08);
    osc2.stop(now + durationSec + 0.08);
    osc3.stop(now + durationSec + 0.08);
  }

  private triggerActPhrase() {
    if (!this.musicEnabled || !this.ctx || this.ctx.state !== 'running' || this.isFinaleActive) {
      return;
    }
    const prog = this.actProgressions[this.currentAct];
    const bar = prog[this.chordStep % prog.length];

    // Deep warm bass root
    this.playFeltPianoNote(this.midiToFreq(bar.bass), 0, 4.6, 0.24);

    // Gentle broken inner voices
    bar.inner.forEach((midi, idx) => {
      const strum = 0.14 + idx * 0.15 + Math.random() * 0.025;
      this.playFeltPianoNote(this.midiToFreq(midi), strum, 4.0, 0.145);
    });

    // Sparse delicate upper melody line
    bar.melody.forEach((midi, idx) => {
      const melDelay = 1.05 + idx * 0.98;
      this.playFeltPianoNote(this.midiToFreq(midi), melDelay, 3.2, 0.17);
    });

    this.chordStep = (this.chordStep + 1) % prog.length;
  }

  private startPianoLoop() {
    if (this.chordTimer !== null) return;
    this.triggerActPhrase();
    this.chordTimer = window.setInterval(() => {
      this.triggerActPhrase();
    }, 4500);
  }

  public startFinaleLament() {
    this.unlockAndStart();
    this.isFinaleActive = true;
    this.finaleStep = 0;

    if (this.finaleTimer !== null) {
      window.clearInterval(this.finaleTimer);
      this.finaleTimer = null;
    }

    const triggerFinaleBar = () => {
      if (!this.musicEnabled || !this.ctx || this.ctx.state !== 'running' || !this.isFinaleActive) {
        return;
      }
      const bar = this.finaleProgression[this.finaleStep % this.finaleProgression.length];
      this.playFeltPianoNote(this.midiToFreq(bar.bass), 0.02, 5.4, 0.25);

      bar.inner.forEach((midi, idx) => {
        this.playFeltPianoNote(this.midiToFreq(midi), 0.18 + idx * 0.18, 4.8, 0.15);
      });

      bar.melody.forEach((midi, idx) => {
        this.playFeltPianoNote(this.midiToFreq(midi), 1.3 + idx * 1.15, 3.8, 0.185);
      });

      this.finaleStep = (this.finaleStep + 1) % this.finaleProgression.length;
    };

    triggerFinaleBar();
    this.finaleTimer = window.setInterval(triggerFinaleBar, 5200);
  }

  public stopFinaleLament() {
    this.isFinaleActive = false;
    if (this.finaleTimer !== null) {
      window.clearInterval(this.finaleTimer);
      this.finaleTimer = null;
    }
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
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
      b6 = white * 0.115926;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 320;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1950;

    src.connect(hp);
    hp.connect(lp);
    lp.connect(this.rainGain);
    src.start();
    this.rainSource = src;
  }

  public playClockTick(accent = false) {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain || ctx.state !== 'running') return;
    if (!this.musicEnabled && !this.rainEnabled) return;

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
      g.gain.setValueAtTime(0.1 / (idx + 1), now + idx * 0.012);
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
    g.gain.setValueAtTime(0.22, now);
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
      g.gain.setValueAtTime(0.08, now + offset);
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
    g.gain.linearRampToValueAtTime(0.14, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    const og = ctx.createGain();
    og.gain.setValueAtTime(0.035, now);
    og.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    osc.connect(g);
    overtone.connect(og);
    og.connect(g);
    g.connect(this.masterGain);
    if (this.reverbSend) {
      g.connect(this.reverbSend);
    }

    osc.start(now);
    overtone.start(now);
    osc.stop(now + 1.55);
    overtone.stop(now + 1.55);
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
    g.gain.linearRampToValueAtTime(0.08, now + 0.04);
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

  public playTypewriterTick() {
    if (!this.musicEnabled && !this.rainEnabled) return;
    const ctx = this.ctx;
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
