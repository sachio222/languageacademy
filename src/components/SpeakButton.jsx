import { Volume2, Square } from "lucide-react";
import { useState, useEffect } from "react";
import { getTTSText, selectBestVoice } from "../utils/ttsUtils";
import { logger } from "../utils/logger";

/**
 * Detect if user is on Safari
 */
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

/**
 * Check if user might benefit from better TTS setup
 */
function shouldShowTTSImprovement() {
  return isSafari() && window.speechSynthesis && window.speechSynthesis.getVoices().length > 0;
}

/**
 * Reusable speaker button component
 * Provides consistent TTS UI across the app
 * Now supports stop functionality - button toggles to stop icon while playing
 */
function SpeakButton({
  text,
  ttsText, // Optional: override text for TTS pronunciation
  language,
  size = "medium",
  className = "",
  ariaLabel,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userVoice, setUserVoice] = useState(null);
  const [userSpeed, setUserSpeed] = useState(0.9);

  // Load user preferences
  useEffect(() => {
    const loadPreferences = () => {
      const savedVoiceName = localStorage.getItem('tts-voice');
      const savedSpeed = localStorage.getItem('tts-speed');
      
      if (savedSpeed) {
        setUserSpeed(parseFloat(savedSpeed));
      }
      
      if (savedVoiceName) {
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.name === savedVoiceName);
        if (voice) {
          setUserVoice(voice);
        }
      }
    };

    loadPreferences();

    // Listen for voice changes
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadPreferences;
    }

    // Listen for settings changes from modal
    const handleSettingsChange = (e) => {
      const { voice: voiceName, speed } = e.detail;
      setUserSpeed(speed);
      
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.name === voiceName);
      if (voice) {
        setUserVoice(voice);
      }
    };

    window.addEventListener('tts-settings-changed', handleSettingsChange);

    return () => {
      window.removeEventListener('tts-settings-changed', handleSettingsChange);
    };
  }, []);

  // Cleanup: Stop any playing audio when component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent triggering parent click handlers

    if (!text) return;

    // If already playing, stop it
    if (isPlaying) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      }
      return;
    }

    // Use ttsText if provided, otherwise apply global TTS corrections
    const speechText = ttsText || getTTSText(text);

    // Use Web Speech API directly
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = language || "fr-FR";
      utterance.rate = userSpeed; // Use user preference
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Track when audio starts and ends
      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      // Get voices and select the best one
      let voices = window.speechSynthesis.getVoices();

      // Handle async voice loading (some browsers load voices asynchronously)
      if (voices.length === 0) {
        window.speechSynthesis.addEventListener("voiceschanged", () => {
          voices = window.speechSynthesis.getVoices();
          // Use user-selected voice only if it matches the language, otherwise auto-select best for the language
          const langCode = utterance.lang.split("-")[0];
          const userVoiceMatchesLang = userVoice && userVoice.lang.startsWith(langCode);
          const bestVoice = userVoiceMatchesLang ? userVoice : selectBestVoice(voices, utterance.lang);
          if (bestVoice) {
            utterance.voice = bestVoice;
            logger.log(`Using voice: ${bestVoice.name} (${bestVoice.lang})`);

            // Show helpful tip for Safari users with basic voices
            if (!userVoiceMatchesLang && isSafari() && !bestVoice.name.toLowerCase().includes('enhanced') &&
              !bestVoice.name.toLowerCase().includes('premium') &&
              !bestVoice.name.toLowerCase().includes('compact')) {
              logger.log(`💡 Safari TTS Tip: For better French pronunciation, go to System Settings > Accessibility > Spoken Content > System Voice and download enhanced French voices like "Amélie" or "Thomas (French)"`);
            }
          }
          window.speechSynthesis.speak(utterance);
        });
      } else {
        // Use user-selected voice only if it matches the language, otherwise auto-select best for the language
        const langCode = utterance.lang.split("-")[0];
        const userVoiceMatchesLang = userVoice && userVoice.lang.startsWith(langCode);
        const bestVoice = userVoiceMatchesLang ? userVoice : selectBestVoice(voices, utterance.lang);
        if (bestVoice) {
          utterance.voice = bestVoice;
          logger.log(`Using voice: ${bestVoice.name} (${bestVoice.lang})`);

          // Show helpful tip for Safari users with basic voices
          if (!userVoiceMatchesLang && isSafari() && !bestVoice.name.toLowerCase().includes('enhanced') &&
            !bestVoice.name.toLowerCase().includes('premium') &&
            !bestVoice.name.toLowerCase().includes('compact')) {
            logger.log(`💡 Safari TTS Tip: For better French pronunciation, go to System Settings > Accessibility > Spoken Content > System Voice and download enhanced French voices like "Amélie" or "Thomas (French)"`);
          }
        }
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const iconSizes = {
    small: 14,
    medium: 18,
    large: 24,
  };

  return (
    <button
      className={`speak-btn speak-btn-${size} ${className} ${isPlaying ? 'is-playing' : ''}`}
      onClick={handleClick}
      aria-label={isPlaying ? "Stop audio" : (ariaLabel || `Speak: ${text}`)}
      title={isPlaying ? "Click to stop audio" : "Click to hear pronunciation"}
    >
      {isPlaying ? (
        <Square size={iconSizes[size]} className="stop-icon" />
      ) : (
        <Volume2 size={iconSizes[size]} />
      )}
    </button>
  );
}

export default SpeakButton;

