/**
 * Web Audio API synthesizer for offline, zero-network ambient soundscapes
 * Perfect for student focus sessions (Rain, Library Hum, Deep Brown Noise)
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private isRunning: boolean = false;
  private currentMode: 'rain' | 'library' | 'whitenoise' | 'none' = 'none';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(mode: 'rain' | 'library' | 'whitenoise', volume: number = 0.25) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentMode = mode;
    this.isRunning = true;

    // Buffer with pink / brown noise generator
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;

      if (mode === 'whitenoise') {
        output[i] = white * 0.15;
      } else if (mode === 'rain') {
        // Pink noise with subtle high-pass variation for rain patter
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      } else {
        // Deep brown noise for library atmosphere
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 1.2;
      }
    }

    const whiteNoiseSource = this.ctx.createBufferSource();
    whiteNoiseSource.buffer = buffer;
    whiteNoiseSource.loop = true;

    // Filter to shape sound
    const filter = this.ctx.createBiquadFilter();
    if (mode === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    } else if (mode === 'library') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    } else {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    }

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);

    whiteNoiseSource.connect(filter);
    filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    whiteNoiseSource.start();
    this.noiseNode = whiteNoiseSource;
  }

  public setVolume(volume: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public stop() {
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
        this.noiseNode.disconnect();
      } catch (e) {
        // Ignore already stopped errors
      }
      this.noiseNode = null;
    }
    this.isRunning = false;
    this.currentMode = 'none';
  }

  public getStatus() {
    return {
      isPlaying: this.isRunning,
      mode: this.currentMode,
    };
  }
}

export const ambientAudio = new AmbientAudioEngine();
