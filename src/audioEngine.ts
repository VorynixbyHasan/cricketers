/**
 * Web Audio API Engine for TOONHUB
 * Generates custom, zero-dependency procedural toon background music (BGM)
 * and interactive transition sound effects tailored to each character figurine.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentCharacterIndex: number = 0;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private bpm: number = 100;

  // Cricket Figurine theme chord progressions (frequencies in Hz)
  // 0: Virat Kohli (India) - Uplifting Sky Blue Stadium Anthem
  // 1: Babar Azam (Pakistan) - Passionate Emerald Green Crescent Anthem
  // 2: Joe Root (England) - Regal Royal Blue Fanfare
  // 3: Kane Williamson (New Zealand) - Midnight Black Stadium Anthem
  private themes = [
    {
      name: 'India Sky Blue Anthem (Virat Kohli)',
      chords: [
        { bass: 98.0, pad: [196.0, 293.66, 392.0], lead: [392.0, 493.88, 587.33, 783.99] },
        { bass: 73.42, pad: [146.83, 220.0, 293.66], lead: [293.66, 369.99, 440.0, 587.33] },
        { bass: 82.41, pad: [164.81, 246.94, 329.63], lead: [329.63, 392.0, 493.88, 659.25] },
        { bass: 65.41, pad: [130.81, 196.0, 261.63], lead: [261.63, 329.63, 392.0, 523.25] },
      ],
    },
    {
      name: 'Pakistan Green Crescent Anthem (Babar Azam)',
      chords: [
        { bass: 73.42, pad: [146.83, 220.0, 261.63], lead: [293.66, 349.23, 440.0, 587.33] },
        { bass: 82.41, pad: [164.81, 220.0, 246.94], lead: [329.63, 440.0, 493.88, 659.25] },
        { bass: 65.41, pad: [130.81, 196.0, 261.63], lead: [261.63, 329.63, 392.0, 523.25] },
        { bass: 87.31, pad: [174.61, 220.0, 261.63], lead: [349.23, 440.0, 523.25, 698.46] },
      ],
    },
    {
      name: 'England Blue Royal Fanfare (Joe Root)',
      chords: [
        { bass: 87.31, pad: [174.61, 220.0, 261.63], lead: [349.23, 440.0, 523.25, 698.46] },
        { bass: 65.41, pad: [130.81, 196.0, 261.63], lead: [261.63, 329.63, 392.0, 523.25] },
        { bass: 98.0, pad: [196.0, 246.94, 293.66], lead: [392.0, 493.88, 587.33, 783.99] },
        { bass: 73.42, pad: [146.83, 220.0, 293.66], lead: [293.66, 369.99, 440.0, 587.33] },
      ],
    },
    {
      name: 'Midnight Black Stadium Anthem (Kane Williamson)',
      chords: [
        { bass: 55.0, pad: [110.0, 164.81, 220.0], lead: [220.0, 277.18, 329.63, 440.0] },
        { bass: 65.41, pad: [130.81, 196.0, 261.63], lead: [261.63, 329.63, 392.0, 523.25] },
        { bass: 73.42, pad: [146.83, 220.0, 293.66], lead: [293.66, 369.99, 440.0, 587.33] },
        { bass: 55.0, pad: [110.0, 164.81, 220.0], lead: [220.0, 329.63, 440.0, 554.37] },
      ],
    },
    {
      name: 'Golden Yellow Stadium Anthem (Steve Smith)',
      chords: [
        { bass: 73.42, pad: [146.83, 220.0, 293.66, 369.99], lead: [293.66, 369.99, 440.0, 587.33] },
        { bass: 82.41, pad: [164.81, 246.94, 329.63, 415.30], lead: [329.63, 415.30, 493.88, 659.25] },
        { bass: 98.0, pad: [196.0, 246.94, 293.66, 392.0], lead: [392.0, 493.88, 587.33, 783.99] },
        { bass: 110.0, pad: [220.0, 277.18, 329.63, 440.0], lead: [440.0, 554.37, 659.25, 880.0] },
      ],
    },
  ];

  public getThemeName(index: number): string {
    return this.themes[index % this.themes.length]?.name || 'Cricket Figurine Theme';
  }

  private ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCharacter(index: number) {
    this.currentCharacterIndex = index % this.themes.length;
    // Play an interactive switch whoosh/chime if audio is active
    if (this.isPlaying) {
      this.playTransitionSfx();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    const intervalMs = (60 / this.bpm / 2) * 1000; // eighth-note step
    this.timerId = window.setInterval(() => {
      this.tick();
    }, intervalMs);

    this.tick();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private tick() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const theme = this.themes[this.currentCharacterIndex] || this.themes[0];

    // Measure has 8 eighth-notes. 4 chords in a cycle of 32 steps.
    const chordIndex = Math.floor((this.currentStep % 32) / 8);
    const stepInChord = this.currentStep % 8;
    const chord = theme.chords[chordIndex % theme.chords.length];

    // 1. Bass note on step 0 and step 4
    if (stepInChord === 0 || stepInChord === 4) {
      this.playTone(chord.bass, now, 0.35, 'triangle', 0.12);
    }

    // 2. Warm Pad chord on step 0 (sustained)
    if (stepInChord === 0) {
      chord.pad.forEach((freq) => {
        this.playTone(freq, now, 0.75, 'sine', 0.05);
      });
    }

    // 3. Playful Arpeggio Lead (staccato marimba / chime)
    const leadNotes = chord.lead;
    const noteFreq = leadNotes[stepInChord % leadNotes.length];
    if (stepInChord % 2 === 0 || stepInChord === 3 || stepInChord === 7) {
      this.playPluck(noteFreq, now, 0.12, 0.07);
    }

    // 4. Subtle percussion tick (soft hi-hat / shaker tap)
    if (stepInChord % 2 === 1) {
      this.playClick(now, 0.02);
    }

    this.currentStep = (this.currentStep + 1) % 32;
  }

  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, startTime);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {
      // Ignored
    }
  }

  private playPluck(freq: number, startTime: number, duration: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);
    } catch {
      // Ignored
    }
  }

  private playClick(startTime: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, startTime);
      osc.frequency.exponentialRampToValueAtTime(200, startTime + 0.03);

      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.04);
    } catch {
      // Ignored
    }
  }

  public playTransitionSfx() {
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const theme = this.themes[this.currentCharacterIndex] || this.themes[0];
      const baseFreq = theme.chords[0].pad[1] || 330;

      // Fast cute upward arpeggio
      [0, 4, 7, 12].forEach((semitone, i) => {
        const freq = baseFreq * Math.pow(2, semitone / 12);
        const startTime = now + i * 0.045;
        this.playPluck(freq, startTime, 0.15, 0.06);
      });
    } catch {
      // Ignored
    }
  }
}

export const audioEngine = new AudioEngine();
