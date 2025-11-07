import { Volume2, Square } from "lucide-react";
import { useState, useEffect } from "react";
import { getTTSText } from "../utils/ttsUtils";
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
 * Select the best available voice for a given language
 * Prioritizes: Google/natural voices > Safari enhanced voices > female voices > any available voice
 */
function selectBestVoice(voices, language) {
  const langCode = language.split("-")[0];
  const matchingVoices = voices.filter((v) => v.lang.startsWith(langCode));

  if (matchingVoices.length === 0) return null;

  // Priority 1: Google voices (Chrome - usually highest quality)
  const googleVoice = matchingVoices.find((v) => v.name.includes("Google"));
  if (googleVoice) return googleVoice;

  // Priority 2: Safari/macOS enhanced voices (look for specific high-quality French voices)
  if (langCode === 'fr') {
    // These are higher-quality French voices available on macOS/iOS
    const safariEnhancedVoice = matchingVoices.find((v) => {
      const nameLower = v.name.toLowerCase();
      return nameLower.includes("amélie") ||
        nameLower.includes("amelie") ||
        nameLower.includes("thomas") ||  // Thomas (French) is actually good quality
        nameLower.includes("audrey") ||
        nameLower.includes("marie") ||
        nameLower.includes("enhanced") ||
        nameLower.includes("premium") ||
        nameLower.includes("neural") ||
        (nameLower.includes("compact") && nameLower.includes("fr"));
    });
    if (safariEnhancedVoice) return safariEnhancedVoice;
  }

  // Priority 3: General enhanced voices
  const enhancedVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("enhanced") ||
      v.name.toLowerCase().includes("premium") ||
      v.name.toLowerCase().includes("neural") ||
      v.name.toLowerCase().includes("compact")  // Compact voices are often better quality
  );
  if (enhancedVoice) return enhancedVoice;

  // Priority 4: Female voices (often sound more natural)
  const femaleVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("samantha") ||
      v.name.toLowerCase().includes("karen") ||
      v.name.toLowerCase().includes("fiona") ||
      v.name.toLowerCase().includes("amelie") ||
      v.name.toLowerCase().includes("amélie") ||
      v.name.toLowerCase().includes("paulina") ||
      v.name.toLowerCase().includes("marie") ||
      v.name.toLowerCase().includes("celine") ||
      v.name.toLowerCase().includes("céline") ||
      v.name.toLowerCase().includes("audrey") ||
      v.name.toLowerCase().includes("aurelie") ||
      v.name.toLowerCase().includes("aurélie")
  );
  if (femaleVoice) return femaleVoice;

  // Priority 5: Avoid low-quality voices
  const decentVoice = matchingVoices.find(
    (v) =>
      !v.name.toLowerCase().includes("alex") &&
      !v.name.toLowerCase().includes("fred") &&
      !v.name.toLowerCase().includes("ralph") &&
      !v.name.toLowerCase().includes("male") &&
      !v.name.toLowerCase().includes("daniel") &&
      !v.name.toLowerCase().includes("junior")  // Avoid junior/basic voices
  );
  if (decentVoice) return decentVoice;

  // Last resort: Return first matching voice
  return matchingVoices[0];
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
          // Prefer user-selected voice, otherwise auto-select best
          const bestVoice = userVoice || selectBestVoice(voices, utterance.lang);
          if (bestVoice) {
            utterance.voice = bestVoice;
            logger.log(`Using voice: ${bestVoice.name} (${bestVoice.lang})`);

            // Show helpful tip for Safari users with basic voices
            if (!userVoice && isSafari() && !bestVoice.name.toLowerCase().includes('enhanced') &&
              !bestVoice.name.toLowerCase().includes('premium') &&
              !bestVoice.name.toLowerCase().includes('compact')) {
              logger.log(`💡 Safari TTS Tip: For better French pronunciation, go to System Settings > Accessibility > Spoken Content > System Voice and download enhanced French voices like "Amélie" or "Thomas (French)"`);
            }
          }
          window.speechSynthesis.speak(utterance);
        });
      } else {
        // Prefer user-selected voice, otherwise auto-select best
        const bestVoice = userVoice || selectBestVoice(voices, utterance.lang);
        if (bestVoice) {
          utterance.voice = bestVoice;
          logger.log(`Using voice: ${bestVoice.name} (${bestVoice.lang})`);

          // Show helpful tip for Safari users with basic voices
          if (!userVoice && isSafari() && !bestVoice.name.toLowerCase().includes('enhanced') &&
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

