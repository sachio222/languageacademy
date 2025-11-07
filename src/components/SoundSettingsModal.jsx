import React, { useState, useEffect } from 'react';
import { X, Settings2 } from 'lucide-react';
import '../styles/SoundSettingsModal.css';

function SoundSettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [speed, setSpeed] = useState(0.9);
  const [voices, setVoices] = useState([]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const frenchVoices = availableVoices.filter(v => 
        v.lang.startsWith('fr')
      );
      
      // Only update if we actually have voices
      if (frenchVoices.length > 0) {
        // Preferred voices in priority order
        const preferredVoiceNames = ['google', 'amélie', 'amelie', 'marie', 'thomas'];
        
        // Filter to only show preferred voices if any are available
        const preferredVoices = frenchVoices.filter(v => {
          const nameLower = v.name.toLowerCase();
          return preferredVoiceNames.some(preferred => nameLower.includes(preferred));
        });
        
        // Use preferred voices if available, otherwise show all
        const voicesToShow = preferredVoices.length > 0 ? preferredVoices : frenchVoices;
        setVoices(voicesToShow);

        // Load saved preferences
        const savedVoice = localStorage.getItem('tts-voice');
        const savedSpeed = localStorage.getItem('tts-speed');
        
        if (savedVoice && voicesToShow.find(v => v.name === savedVoice)) {
          setSelectedVoice(savedVoice);
        } else {
          // Select default voice by priority
          // 1. Google French
          const googleVoice = voicesToShow.find(v => 
            v.name.toLowerCase().includes('google')
          );
          
          // 2. Amélie/Amelie
          const amelieVoice = voicesToShow.find(v => {
            const nameLower = v.name.toLowerCase();
            return nameLower.includes('amélie') || nameLower.includes('amelie');
          });
          
          // 3. Marie
          const marieVoice = voicesToShow.find(v => 
            v.name.toLowerCase().includes('marie')
          );
          
          // 4. Thomas
          const thomasVoice = voicesToShow.find(v => 
            v.name.toLowerCase().includes('thomas')
          );
          
          // Set in priority order
          const defaultVoice = googleVoice || amelieVoice || marieVoice || thomasVoice || voicesToShow[0];
          if (defaultVoice) {
            setSelectedVoice(defaultVoice.name);
          }
        }
        
        if (savedSpeed) {
          setSpeed(parseFloat(savedSpeed));
        }
      }
    };

    // Firefox needs a small delay before voices are ready
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    
    if (isFirefox) {
      // Firefox requires multiple attempts to load voices
      setTimeout(loadVoices, 100);
      setTimeout(loadVoices, 500);
      setTimeout(loadVoices, 1000);
    } else {
      loadVoices();
    }
    
    // Handle async voice loading (works in Chrome/Safari)
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Also try loading when modal opens
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVoiceChange = (e) => {
    const voiceName = e.target.value;
    setSelectedVoice(voiceName);
    localStorage.setItem('tts-voice', voiceName);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('tts-settings-changed', {
      detail: { voice: voiceName, speed }
    }));
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    localStorage.setItem('tts-speed', newSpeed.toString());
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('tts-settings-changed', {
      detail: { voice: selectedVoice, speed: newSpeed }
    }));
  };

  const testVoice = () => {
    // Reload voices first (helps with Firefox)
    reloadVoices();

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance('Bonjour, je suis votre voix française.');
    utterance.lang = 'fr-FR';
    utterance.rate = speed;
    
    if (selectedVoice) {
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const resetToDefault = () => {
    // Reset to default speed
    const defaultSpeed = 0.9;
    setSpeed(defaultSpeed);
    localStorage.setItem('tts-speed', defaultSpeed.toString());

    // Clear saved voice preference (will use auto-selected best voice)
    localStorage.removeItem('tts-voice');
    
    // Set to prioritized default voice
    if (voices.length > 0) {
      // Select default voice by priority
      const googleVoice = voices.find(v => 
        v.name.toLowerCase().includes('google')
      );
      const amelieVoice = voices.find(v => {
        const nameLower = v.name.toLowerCase();
        return nameLower.includes('amélie') || nameLower.includes('amelie');
      });
      const marieVoice = voices.find(v => 
        v.name.toLowerCase().includes('marie')
      );
      const thomasVoice = voices.find(v => 
        v.name.toLowerCase().includes('thomas')
      );
      
      const defaultVoice = googleVoice || amelieVoice || marieVoice || thomasVoice || voices[0];
      if (defaultVoice) {
        setSelectedVoice(defaultVoice.name);
      }
    }

    // Notify other components
    window.dispatchEvent(new CustomEvent('tts-settings-changed', {
      detail: { voice: '', speed: defaultSpeed }
    }));
  };

  const reloadVoices = () => {
    const availableVoices = window.speechSynthesis.getVoices();
    const frenchVoices = availableVoices.filter(v => 
      v.lang.startsWith('fr')
    );
    
    if (frenchVoices.length > 0) {
      // Preferred voices in priority order
      const preferredVoiceNames = ['google', 'amélie', 'amelie', 'marie', 'thomas'];
      
      // Filter to only show preferred voices if any are available
      const preferredVoices = frenchVoices.filter(v => {
        const nameLower = v.name.toLowerCase();
        return preferredVoiceNames.some(preferred => nameLower.includes(preferred));
      });
      
      // Use preferred voices if available, otherwise show all
      const voicesToShow = preferredVoices.length > 0 ? preferredVoices : frenchVoices;
      setVoices(voicesToShow);
      
      // Set to first voice if none selected
      if (!selectedVoice && voicesToShow.length > 0) {
        // Select default voice by priority
        const googleVoice = voicesToShow.find(v => 
          v.name.toLowerCase().includes('google')
        );
        const amelieVoice = voicesToShow.find(v => {
          const nameLower = v.name.toLowerCase();
          return nameLower.includes('amélie') || nameLower.includes('amelie');
        });
        const marieVoice = voicesToShow.find(v => 
          v.name.toLowerCase().includes('marie')
        );
        const thomasVoice = voicesToShow.find(v => 
          v.name.toLowerCase().includes('thomas')
        );
        
        const defaultVoice = googleVoice || amelieVoice || marieVoice || thomasVoice || voicesToShow[0];
        if (defaultVoice) {
          setSelectedVoice(defaultVoice.name);
        }
      }
    }
  };

  // Reload voices when modal opens
  useEffect(() => {
    if (isOpen) {
      const availableVoices = window.speechSynthesis.getVoices();
      const frenchVoices = availableVoices.filter(v => 
        v.lang.startsWith('fr')
      );
      
      if (frenchVoices.length > 0) {
        // Preferred voices in priority order
        const preferredVoiceNames = ['google', 'amélie', 'amelie', 'marie', 'thomas'];
        
        // Filter to only show preferred voices if any are available
        const preferredVoices = frenchVoices.filter(v => {
          const nameLower = v.name.toLowerCase();
          return preferredVoiceNames.some(preferred => nameLower.includes(preferred));
        });
        
        // Use preferred voices if available, otherwise show all
        const voicesToShow = preferredVoices.length > 0 ? preferredVoices : frenchVoices;
        setVoices(voicesToShow);
        
        // Set to first voice if none selected
        if (!selectedVoice && voicesToShow.length > 0) {
          // Select default voice by priority
          const googleVoice = voicesToShow.find(v => 
            v.name.toLowerCase().includes('google')
          );
          const amelieVoice = voicesToShow.find(v => {
            const nameLower = v.name.toLowerCase();
            return nameLower.includes('amélie') || nameLower.includes('amelie');
          });
          const marieVoice = voicesToShow.find(v => 
            v.name.toLowerCase().includes('marie')
          );
          const thomasVoice = voicesToShow.find(v => 
            v.name.toLowerCase().includes('thomas')
          );
          
          const defaultVoice = googleVoice || amelieVoice || marieVoice || thomasVoice || voicesToShow[0];
          if (defaultVoice) {
            setSelectedVoice(defaultVoice.name);
          }
        }
      }
    }
  }, [isOpen, selectedVoice]);

  return (
    <>
      <button
        className="sound-settings-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Sound settings"
        title="Voice and speed settings"
      >
        <Settings2 size={16} />
      </button>

      {isOpen && (
        <div className="sound-settings-overlay" onClick={() => setIsOpen(false)}>
          <div className="sound-settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sound-settings-header">
              <h3>Sound Settings</h3>
              <button
                className="sound-settings-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="sound-settings-body">
              <div className="sound-setting-group">
                <label htmlFor="voice-select">Voice</label>
                {voices.length > 0 ? (
                  <select
                    id="voice-select"
                    value={selectedVoice}
                    onChange={handleVoiceChange}
                    className="sound-setting-select"
                  >
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="no-voices-message">
                    No French voices found. Try clicking "Test Voice" to load voices, or check your browser settings.
                  </div>
                )}
              </div>

              <div className="sound-setting-group">
                <label htmlFor="speed-slider">
                  Speed: {speed.toFixed(2)}x
                </label>
                <input
                  id="speed-slider"
                  type="range"
                  min="0.25"
                  max="1.5"
                  step="0.05"
                  value={speed}
                  onChange={handleSpeedChange}
                  className="sound-setting-slider"
                />
                <div className="speed-labels">
                  <span 
                    onClick={() => handleSpeedChange({ target: { value: '0.25' } })}
                    className={Math.abs(speed - 0.25) < 0.01 ? 'active' : ''}
                  >0.25x</span>
                  <span 
                    onClick={() => handleSpeedChange({ target: { value: '0.5' } })}
                    className={Math.abs(speed - 0.5) < 0.01 ? 'active' : ''}
                  >0.5x</span>
                  <span 
                    onClick={() => handleSpeedChange({ target: { value: '0.75' } })}
                    className={Math.abs(speed - 0.75) < 0.01 ? 'active' : ''}
                  >0.75x</span>
                  <span 
                    onClick={() => handleSpeedChange({ target: { value: '0.9' } })}
                    className={Math.abs(speed - 0.9) < 0.01 ? 'active' : ''}
                  >0.9x</span>
                  <span 
                    onClick={() => handleSpeedChange({ target: { value: '1.0' } })}
                    className={Math.abs(speed - 1.0) < 0.01 ? 'active' : ''}
                  >1.0x</span>
                  <span 
                    onClick={() => handleSpeedChange({ target: { value: '1.25' } })}
                    className={Math.abs(speed - 1.25) < 0.01 ? 'active' : ''}
                  >1.25x</span>
                  <span 
                    onClick={() => handleSpeedChange({ target: { value: '1.5' } })}
                    className={Math.abs(speed - 1.5) < 0.01 ? 'active' : ''}
                  >1.5x</span>
                </div>
              </div>

              <div className="sound-settings-actions">
                <button
                  className="sound-reset-button"
                  onClick={resetToDefault}
                >
                  Reset to Default
                </button>
                <button
                  className="sound-test-button"
                  onClick={testVoice}
                >
                  Test Voice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SoundSettingsModal;

