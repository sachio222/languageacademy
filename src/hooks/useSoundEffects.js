import { useCallback, useRef, useEffect } from "react";
import { logger } from "../utils/logger";

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
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        logger.warn("Web Audio API not supported");
        return null;
      }

      audioContextRef.current = new AudioContextClass();
      isInitializedRef.current = true;
      logger.log("Sound effects: AudioContext initialized");
      return audioContextRef.current;
    } catch (error) {
      logger.error("Failed to initialize AudioContext:", error);
      return null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch((err) => {
          logger.error("Error closing AudioContext:", err);
        });
      }
    };
  }, []);

  /**
   * Woodblock/knock sound effect
   * Uses filtered white noise with exponential decay for crisp, percussive feedback
   */
  const playWoodblock = useCallback(
    (options = {}) => {
      const {
        volume = 0.4, // Default volume (0-1)
        duration = 0.08, // Duration in seconds (80ms - optimal for woodblock)
        pitch = 1.0, // Pitch multiplier (1.0 = normal)
      } = options;

      try {
        const ctx = audioContextRef.current || initAudioContext();
        if (!ctx) return;

        // Resume context if suspended (required for user interaction)
        if (ctx.state === "suspended") {
          ctx.resume().catch((err) => {
            logger.error("Failed to resume AudioContext:", err);
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

        gainNode.gain.linearRampToValueAtTime(
          volume,
          ctx.currentTime + attackTime
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + duration
        );

        // Create filter for frequency shaping (high-pass to remove low rumble)
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
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

        logger.debug("Woodblock sound played");
      } catch (error) {
        logger.error("Error playing woodblock sound:", error);
      }
    },
    [initAudioContext]
  );

  /**
   * Cute bubble pop sound effect
   * Simple, soft, rounded bubble pop with gentle resonance
   * Uses downward frequency sweep (like bubble deflating) with soft envelope
   */
  const playPop = useCallback(
    (options = {}) => {
      const {
        volume = 0.03, // Default volume (0-1) - 3%
        duration = 0.06, // Duration in seconds (60ms - shorter decay)
        pitch = 1.0, // Pitch multiplier (1.0 = normal)
      } = options;

      try {
        const ctx = audioContextRef.current || initAudioContext();
        if (!ctx) return;

        // Resume context if suspended (required for user interaction)
        if (ctx.state === "suspended") {
          ctx.resume().catch((err) => {
            logger.error("Failed to resume AudioContext:", err);
          });
        }

        const now = ctx.currentTime;
        const masterGain = ctx.createGain();

        // Bright transient layer - high-frequency noise burst at attack
        const transientLength = Math.floor(ctx.sampleRate * 0.008); // Very short - 8ms
        const transientBuffer = ctx.createBuffer(
          1,
          transientLength,
          ctx.sampleRate
        );
        const transientData = transientBuffer.getChannelData(0);
        for (let i = 0; i < transientLength; i++) {
          transientData[i] = (Math.random() * 2 - 1) * 0.4; // Bright noise
        }
        const transientSource = ctx.createBufferSource();
        transientSource.buffer = transientBuffer;
        const transientGain = ctx.createGain();

        // High-pass filter to emphasize high frequencies for bright transient
        const transientFilter = ctx.createBiquadFilter();
        transientFilter.type = "highpass";
        transientFilter.frequency.value = 4000 * pitch; // Very high frequencies
        transientFilter.Q.value = 1.0;

        transientGain.gain.setValueAtTime(0, now);
        transientGain.gain.linearRampToValueAtTime(volume * 0.6, now + 0.001); // Instant bright attack
        transientGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008); // Very quick decay

        transientSource.connect(transientFilter);
        transientFilter.connect(transientGain);
        transientGain.connect(masterGain);

        // Main bubble pop tone with upward frequency sweep
        // Starts lower and sweeps up (reversed)
        const osc = ctx.createOscillator();
        osc.type = "sine"; // Pure sine for soft, rounded tone
        const startFreq = 248 * pitch; // Start at lower frequency (up half octave)
        const endFreq = 2800 * pitch; // Sweep up to higher frequency (cute bubble, up 2 octaves)
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration); // Smooth upward sweep

        // Soft, rounded envelope - quick attack, sustain, then gentle decay
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume, now + 0.002); // Quick but soft attack
        gain.gain.setValueAtTime(volume, now + 0.03); // Sustain at full volume
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Gentle decay

        // Gentle low-pass filter to round off any harshness
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 3000 * pitch; // Keep it smooth and rounded
        filter.Q.value = 0.5; // Low Q for gentle slope

        // Connect: osc -> filter -> gain -> masterGain
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        // Connect master gain to destination
        masterGain.connect(ctx.destination);

        // Play the sound
        transientSource.start(now);
        osc.start(now);
        transientSource.stop(now + 0.008);
        osc.stop(now + duration);

        // Clean up after playback
        setTimeout(() => {
          try {
            transientSource.disconnect();
            transientFilter.disconnect();
            transientGain.disconnect();
            osc.disconnect();
            filter.disconnect();
            gain.disconnect();
            masterGain.disconnect();
          } catch (e) {
            // Ignore cleanup errors
          }
        }, (duration + 0.1) * 1000);

        logger.debug("Bubble pop sound played");
      } catch (error) {
        logger.error("Error playing bubble pop sound:", error);
      }
    },
    [initAudioContext]
  );

  /**
   * Check if Web Audio API is supported
   */
  const isSupported =
    typeof window !== "undefined" &&
    (window.AudioContext || window.webkitAudioContext) !== undefined;

  return {
    playPop,
    playWoodblock,
    isSupported,
  };
}
