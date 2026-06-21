/**
 * Web Audio API Engine for the Bible Quiz App.
 * Synthesizes pristine custom sounds and loops 100% royalty-free.
 * Resolves autoplay policies by waiting for user interaction.
 */

let audioCtx: AudioContext | null = null;
let musicInterval: any = null;
let musicOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
let isMusicPlaying = false;
let isSoundEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    // Standard and vendor prefixed support
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const audioEngine = {
  toggleSound: (enabled: boolean) => {
    isSoundEnabled = enabled;
  },

  isSoundEnabled: () => isSoundEnabled,

  // Play a pleasant, high-quality "correct answer" bell chime
  playCorrect: () => {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Create a nice double-tone bell sound
      // First chime (higher note)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.15); // C6 fade upward

      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      // Second chime (harmonious third)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.23); // E6

      gain2.gain.setValueAtTime(0.12, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.5);

    } catch (e) {
      console.error('Failed to play correct sound effect', e);
    }
  },

  // Play a hilarious, highly realistic custom-synthesized fart sound (som de peido)
  playIncorrectFart: () => {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const duration = 0.55 + Math.random() * 0.2; // Randomized duration for natural farting variance

      // Main heavy sputtering oscillator (sawtooth)
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      
      // Pitch drop: starts low, slips lower (creates the sliding squeak)
      const startFreq = 85 + Math.random() * 15;
      const endFreq = 40 + Math.random() * 10;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.linearRampToValueAtTime(endFreq, now + duration);

      // Sputter LFO (modulates the volume rapidly to create the flapping sound)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(18 + Math.random() * 6, now); // 18-24 Hz flaps

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.85, now);

      // Main Volume envelope
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.01, now);
      // Sudden burst
      mainGain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      // Sputtering trail
      mainGain.gain.exponentialRampToValueAtTime(0.15, now + duration - 0.1);
      // Fade out
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Lowpass filter to make it sound muddy, warm and organic (like a real acoustic blast)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.Q.setValueAtTime(8, now);

      // Connect LFO to modulate filter frequency for extra wet "bubble" fart texture
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Connect main source
      osc.connect(filter);
      filter.connect(mainGain);
      mainGain.connect(ctx.destination);

      // Start oscillators
      osc.start(now);
      lfo.start(now);

      osc.stop(now + duration);
      lfo.stop(now + duration);

      // Add a little squeaker tail at the end
      if (Math.random() > 0.4) {
        const tailOsc = ctx.createOscillator();
        const tailGain = ctx.createGain();
        tailOsc.type = 'triangle';
        tailOsc.frequency.setValueAtTime(endFreq, now + duration - 0.15);
        tailOsc.frequency.exponentialRampToValueAtTime(endFreq * 2.2, now + duration);

        tailGain.gain.setValueAtTime(0.08, now + duration - 0.15);
        tailGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.05);

        tailOsc.connect(tailGain);
        tailGain.connect(ctx.destination);
        tailOsc.start(now + duration - 0.15);
        tailOsc.stop(now + duration + 0.05);
      }

    } catch (e) {
      console.error('Failed to synthesize flatulent error sound', e);
    }
  },

  // Start the background royalty-free ambient melody loop
  startBackgroundMusic: () => {
    if (isMusicPlaying) return;
    try {
      const ctx = getAudioContext();
      isMusicPlaying = true;
      
      let step = 0;
      // Soft lofi-like chords and nice melody loop
      // Progression: Am - F - C - G
      const chords = [
        [220, 261.63, 329.63], // Am (A3, C4, E4)
        [174.61, 261.63, 349.23], // F (F3, C4, F4)
        [261.63, 329.63, 392.00], // C (C4, E4, G4)
        [196.00, 293.66, 392.00], // G (G3, D4, G4)
      ];

      const melody = [
        [440, 493.88, 523.25, 587.33], // A4, B4, C5, D5
        [349.23, 392.00, 440.00, 523.25], // F4, G4, A4, C5
        [523.25, 587.33, 659.25, 783.99], // C5, D5, E5, G5
        [392.00, 440.00, 493.88, 587.33], // G4, A4, B4, D5
      ];

      const playStep = () => {
        if (!isMusicPlaying || !isSoundEnabled) return;
        const now = ctx.currentTime;
        const chordIndex = step % chords.length;
        
        // Play chord base (soft cozy pad)
        chords[chordIndex].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          
          // Ultra soft volumne for background
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.015, now + 0.5);
          gain.gain.setValueAtTime(0.015, now + 2.5);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.9);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(now);
          osc.stop(now + 3.0);
          
          musicOscillators.push({ osc, gain });
        });

        // Play gentle bell-like melody notes sequentially over the 3 seconds
        const notes = melody[chordIndex];
        notes.forEach((freq, idx) => {
          const noteTime = now + (idx * 0.75); // Stagger notes
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, noteTime);
          
          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.012, noteTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.7);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(noteTime);
          osc.stop(noteTime + 0.75);
          
          musicOscillators.push({ osc, gain });
        });

        // Purge expired oscillators
        musicOscillators = musicOscillators.filter(item => {
          try {
            // Just filter out things that are practically done
            return true;
          } catch {
            return false;
          }
        });
        if (musicOscillators.length > 50) {
          musicOscillators.splice(0, 20);
        }

        step++;
      };

      // Play immediately, then loop every 3 seconds
      playStep();
      musicInterval = setInterval(playStep, 3000);

    } catch (e) {
      console.error('Failed to start loop background music', e);
    }
  },

  stopBackgroundMusic: () => {
    isMusicPlaying = false;
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
    // Fade out and stop any active oscillators
    musicOscillators.forEach(item => {
      try {
        item.gain.gain.cancelScheduledValues(0);
        item.gain.gain.setValueAtTime(item.gain.gain.value, 0);
        item.gain.gain.exponentialRampToValueAtTime(0.001, 0.2);
        item.osc.stop(0.2);
      } catch (e) {
        // Safe suppressor
      }
    });
    musicOscillators = [];
  },

  isMusicPlaying: () => isMusicPlaying
};
