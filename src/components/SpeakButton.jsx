import { Volume2 } from "lucide-react";

/**
 * Select the best available voice for a given language
 * Prioritizes: Google/natural voices > female voices > any available voice
 */
function selectBestVoice(voices, language) {
  const langCode = language.split("-")[0];
  const matchingVoices = voices.filter((v) => v.lang.startsWith(langCode));

  if (matchingVoices.length === 0) return null;

  // Priority 1: Google voices (usually highest quality)
  const googleVoice = matchingVoices.find((v) => v.name.includes("Google"));
  if (googleVoice) return googleVoice;

  // Priority 2: Voices with "enhanced" or "premium" in the name
  const enhancedVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("enhanced") ||
      v.name.toLowerCase().includes("premium") ||
      v.name.toLowerCase().includes("neural")
  );
  if (enhancedVoice) return enhancedVoice;

  // Priority 3: Female voices (often sound more natural)
  const femaleVoice = matchingVoices.find(
    (v) =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("samantha") ||
      v.name.toLowerCase().includes("karen") ||
      v.name.toLowerCase().includes("fiona") ||
      v.name.toLowerCase().includes("amelie") ||
      v.name.toLowerCase().includes("paulina")
  );
  if (femaleVoice) return femaleVoice;

  // Priority 4: Avoid "Alex" and other robotic-sounding voices
  const nonRoboticVoice = matchingVoices.find(
    (v) =>
      !v.name.toLowerCase().includes("alex") &&
      !v.name.toLowerCase().includes("fred") &&
      !v.name.toLowerCase().includes("ralph")
  );
  if (nonRoboticVoice) return nonRoboticVoice;

  // Fallback: Return first matching voice
  return matchingVoices[0];
}

/**
 * Reusable speaker button component
 * Provides consistent TTS UI across the app
 */
function SpeakButton({
  text,
  language,
  size = "medium",
  className = "",
  ariaLabel,
}) {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent triggering parent click handlers

    if (!text) return;

    // Use Web Speech API directly
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language || "fr-FR";
      utterance.rate = 0.9; // Slightly slower for learning
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Get voices and select the best one
      let voices = window.speechSynthesis.getVoices();

      // Handle async voice loading (some browsers load voices asynchronously)
      if (voices.length === 0) {
        window.speechSynthesis.addEventListener("voiceschanged", () => {
          voices = window.speechSynthesis.getVoices();
          const bestVoice = selectBestVoice(voices, utterance.lang);
          if (bestVoice) {
            utterance.voice = bestVoice;
            console.log(`Using voice: ${bestVoice.name} (${bestVoice.lang})`);
          }
          window.speechSynthesis.speak(utterance);
        });
      } else {
        const bestVoice = selectBestVoice(voices, utterance.lang);
        if (bestVoice) {
          utterance.voice = bestVoice;
          console.log(`Using voice: ${bestVoice.name} (${bestVoice.lang})`);
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
      className={`speak-btn speak-btn-${size} ${className}`}
      onClick={handleClick}
      aria-label={ariaLabel || `Speak: ${text}`}
      title="Click to hear pronunciation"
    >
      <Volume2 size={iconSizes[size]} />
    </button>
  );
}

export default SpeakButton;

