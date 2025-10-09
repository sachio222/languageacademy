import { useState, useEffect } from 'react';
import { X, Volume2, Info } from 'lucide-react';

/**
 * Safari TTS Helper - Shows guidance for improving TTS quality on Safari
 */
function SafariTTSHelper() {
  const [showHelper, setShowHelper] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Detect if user is on Safari
  const isSafari = () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  };

  // Check if user has basic/low-quality voices
  const hasBasicVoices = () => {
    if (!window.speechSynthesis) return false;

    const voices = window.speechSynthesis.getVoices();
    const frenchVoices = voices.filter(v => v.lang.startsWith('fr'));

    if (frenchVoices.length === 0) return false;

    // Check if all French voices are basic (no enhanced/premium/compact voices)
    const hasEnhancedVoice = frenchVoices.some(v => {
      const nameLower = v.name.toLowerCase();
      return nameLower.includes('enhanced') ||
        nameLower.includes('premium') ||
        nameLower.includes('compact') ||
        nameLower.includes('amélie') ||
        nameLower.includes('thomas');
    });

    return !hasEnhancedVoice;
  };

  useEffect(() => {
    // Check if we should show the helper
    const checkShowHelper = () => {
      if (!isSafari() || dismissed) return;

      // Check localStorage to see if user has dismissed this before
      const hasBeenDismissed = localStorage.getItem('safari-tts-helper-dismissed');
      if (hasBeenDismissed) {
        setDismissed(true);
        return;
      }

      // Wait for voices to load, then check if they're basic
      if (window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          // Voices not loaded yet, wait for them
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            if (hasBasicVoices()) {
              setShowHelper(true);
            }
          });
        } else {
          if (hasBasicVoices()) {
            setShowHelper(true);
          }
        }
      }
    };

    // Small delay to let the app load
    const timer = setTimeout(checkShowHelper, 2000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = () => {
    setShowHelper(false);
    setDismissed(true);
    localStorage.setItem('safari-tts-helper-dismissed', 'true');
  };

  const handleDismissTemp = () => {
    setShowHelper(false);
  };

  if (!showHelper) return null;

  return (
    <div className="safari-tts-helper">
      <div className="tts-helper-content">
        <div className="tts-helper-header">
          <Volume2 size={20} />
          <h4>Improve French Pronunciation</h4>
          <button onClick={handleDismissTemp} className="tts-helper-close">
            <X size={16} />
          </button>
        </div>

        <div className="tts-helper-body">
          <p>
            <Info size={16} className="info-icon" />
            For better French pronunciation quality on Safari:
          </p>

          <ol>
            <li>Go to <strong>System Settings</strong> → <strong>Accessibility</strong> → <strong>Spoken Content</strong></li>
            <li>Click <strong>System Voice</strong></li>
            <li>Download enhanced French voices like <strong>"Amélie"</strong> or <strong>"Thomas (French)"</strong></li>
          </ol>

          <p className="tts-helper-note">
            These voices provide much more natural pronunciation for language learning.
          </p>
        </div>

        <div className="tts-helper-actions">
          <button onClick={handleDismissTemp} className="btn-secondary">
            Later
          </button>
          <button onClick={handleDismiss} className="btn-primary">
            Got it, don't show again
          </button>
        </div>
      </div>
    </div>
  );
}

export default SafariTTSHelper;

