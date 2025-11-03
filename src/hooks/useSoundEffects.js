import { useCallback, useRef, useEffect } from 'react';
import { logger } from '../utils/logger';

/**
 * High-quality sound effects generator hook
 * Uses Web Audio API to generate sounds programmatically (no file loading)
 * Optimized for bandwidth efficiency and professional sound quality
 */
export function useSoundEffects() {
  const audioContextRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Initialize AudioContext lazily (only when first sound is played)
  // This avoids issues with browser autoplay policies
  const initAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        logger.warn('Web Audio API not supported');
        return null;
      }

      audioContextRef.current = new AudioContextClass();
      isInitializedRef.current = true;
      logger.log('Sound effects: AudioContext initialized');
      return audioContextRef.current;
    } catch (error) {
      logger.error('Failed to initialize AudioContext:', error);
      return null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch((err) => {
          logger.error('Error closing AudioContext:', err);
        });
      }
    };
  }, []);

  /**
   * Woodblock/knock sound effect
   * Uses filtered white noise with exponential decay for crisp, percussive feedback
   */
  const playWoodblock = useCallback((options = {}) => {
    const {
      volume = 0.4, // Default volume (0-1)
      duration = 0.08, // Duration in seconds (80ms - optimal for woodblock)
      pitch = 1.0, // Pitch multiplier (1.0 = normal)
    } = options;

    try {
      const ctx = audioContextRef.current || initAudioContext();
      if (!ctx) return;

      // Resume context if suspended (required for user interaction)
      if (ctx.state === 'suspended') {
        ctx.resume().catch((err) => {
          logger.error('Failed to resume AudioContext:', err);
        });
      }

      // Create white noise buffer
      const sampleRate = ctx.sampleRate;
      const bufferLength = Math.floor(sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferLength, sampleRate);
      const data = buffer.getChannelData(0);

      // Generate filtered white noise
      // Use a combination of frequencies for rich, natural sound
      const baseFreq = 1000 * pitch; // Base frequency in Hz
      const noiseAmplitude = 0.3;

      for (let i = 0; i < bufferLength; i++) {
        const t = i / sampleRate;
        
        // White noise component
        const noise = (Math.random() * 2 - 1) * noiseAmplitude;
        
        // Sine wave component for tone (gives it character, not just noise)
        const sineComponent = Math.sin(2 * Math.PI * baseFreq * t) * 0.15;
        
        // Slight frequency sweep for polish (subtle chirp)
        const sweepFreq = baseFreq * (1 + t * 0.3);
        const sweepComponent = Math.sin(2 * Math.PI * sweepFreq * t) * 0.1;
        
        // Combine components
        data[i] = noise + sineComponent + sweepComponent;
      }

      // Create buffer source
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Create gain node for volume control and envelope
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      
      // Exponential decay envelope (very fast attack, smooth decay)
      // Creates that satisfying "knock" feel
      const attackTime = 0.001; // 1ms attack (instant)
      const decayTime = duration - attackTime;
      
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + attackTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      // Create filter for frequency shaping (high-pass to remove low rumble)
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = baseFreq;
      filter.Q.value = 2.0; // Quality factor for resonance

      // Connect nodes: source -> filter -> gain -> destination
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Play the sound
      source.start(0);
      
      // Clean up after playback
      source.onended = () => {
        try {
          source.disconnect();
          filter.disconnect();
          gainNode.disconnect();
        } catch (e) {
          // Ignore cleanup errors
        }
      };

      logger.debug('Woodblock sound played');
    } catch (error) {
      logger.error('Error playing woodblock sound:', error);
    }
  }, [initAudioContext]);

  /**
   * Cute bubble pop sound effect
   * Simple, soft, rounded bubble pop with gentle resonance
   * Uses downward frequency sweep (like bubble deflating) with soft envelope
   */
  const playPop = useCallback((options = {}) => {
    const {
      volume = 0.45, // Default volume (0-1)
      duration = 0.1, // Duration in seconds (100ms - gentle bubble pop)
      pitch = 1.0, // Pitch multiplier (1.0 = normal)
    } = options;

    try {
      const ctx = audioContextRef.current || initAudioContext();
      if (!ctx) return;

      // Resume context if suspended (required for user interaction)
      if (ctx.state === 'suspended') {
        ctx.resume().catch((err) => {
          logger.error('Failed to resume AudioContext:', err);
        });
      }

      const now = ctx.currentTime;

      // Main bubble pop tone with downward frequency sweep
      // Starts higher (like a bubble) and sweeps down as it pops
      const osc = ctx.createOscillator();
      osc.type = 'sine'; // Pure sine for soft, rounded tone
      const startFreq = 700 * pitch; // Start at higher frequency (cute bubble)
      const endFreq = 350 * pitch; // Sweep down to lower frequency (pop)
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration); // Smooth downward sweep

      // Soft, rounded envelope - quick attack, gentle decay
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.002); // Quick but soft attack
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Gentle decay

      // Gentle low-pass filter to round off any harshness
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 3000 * pitch; // Keep it smooth and rounded
      filter.Q.value = 0.5; // Low Q for gentle slope

      // Connect: osc -> filter -> gain -> destination
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Play the sound
      osc.start(now);
      osc.stop(now + duration);

      // Clean up after playback
      setTimeout(() => {
        try {
          osc.disconnect();
          filter.disconnect();
          gain.disconnect();
        } catch (e) {
          // Ignore cleanup errors
        }
      }, (duration + 0.1) * 1000);

      logger.debug('Bubble pop sound played');
    } catch (error) {
      logger.error('Error playing bubble pop sound:', error);
    }
  }, [initAudioContext]);

  /**
   * Check if Web Audio API is supported
   */
  const isSupported = typeof window !== 'undefined' && 
    (window.AudioContext || window.webkitAudioContext) !== undefined;

  return {
    playPop,
    playWoodblock,
    isSupported,
  };
}

