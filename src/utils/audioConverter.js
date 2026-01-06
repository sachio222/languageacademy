/**
 * Audio Converter - WebM to WAV
 * Converts browser-recorded webm audio to WAV format for Azure SDK
 */

import { logger } from "./logger";

/**
 * Convert webm audio blob to WAV format
 * Azure SDK requires WAV with specific format (16kHz, 16-bit, mono)
 */
export const convertWebmToWav = async (webmBlob) => {
  try {
    // Decode webm using Web Audio API
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Resample to 16kHz mono (Azure requirement)
    const targetSampleRate = 16000;
    const offlineContext = new OfflineAudioContext(
      1, // mono
      audioBuffer.duration * targetSampleRate,
      targetSampleRate
    );

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();

    const resampled = await offlineContext.startRendering();

    // Convert to WAV
    const wavBlob = audioBufferToWav(resampled);

    logger.log("Audio converted to WAV", {
      originalSize: webmBlob.size,
      wavSize: wavBlob.size,
      duration: audioBuffer.duration,
      sampleRate: targetSampleRate,
    });

    return wavBlob;
  } catch (error) {
    logger.error("Audio conversion failed:", error);
    throw new Error("Failed to convert audio format");
  }
};

/**
 * Convert AudioBuffer to WAV blob
 */
const audioBufferToWav = (audioBuffer) => {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const length = audioBuffer.length * numberOfChannels * 2;

  const buffer = new ArrayBuffer(44 + length);
  const view = new DataView(buffer);
  const channels = [];
  let offset = 0;
  let pos = 0;

  // Write WAV header
  setString(view, 0, "RIFF");
  view.setUint32(4, 36 + length, true);
  setString(view, 8, "WAVE");
  setString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // fmt chunk length
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2 * numberOfChannels, true); // byte rate
  view.setUint16(32, numberOfChannels * 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  setString(view, 36, "data");
  view.setUint32(40, length, true);

  // Get audio data from all channels
  for (let i = 0; i < numberOfChannels; i++) {
    channels.push(audioBuffer.getChannelData(i));
  }

  // Write interleaved audio data
  offset = 44;
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, channels[channel][i]));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true
      );
      offset += 2;
    }
  }

  return new Blob([buffer], { type: "audio/wav" });
};

/**
 * Helper to write string to DataView
 */
const setString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};



