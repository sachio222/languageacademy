import { useState } from 'react';
import SpeakButton from './SpeakButton';
import './VerbPatternModal.css';
import { logger } from "../utils/logger";

/**
 * Select the best available voice for French
 * Same logic as ConceptIntro for consistent quality
 */
function selectBestVoice(voices, language) {
  const langCode = language.split("-")[0];
  const matchingVoices = voices.filter((v) => v.lang.startsWith(langCode));

  if (matchingVoices.length === 0) return null;

  // Priority 1: Google voices (Chrome - usually highest quality)
  const googleVoice = matchingVoices.find((v) => v.name.includes("Google"));
  if (googleVoice) return googleVoice;

  // Priority 2: Safari/macOS enhanced voices
  if (langCode === 'fr') {
    const safariEnhancedVoice = matchingVoices.find((v) => {
      const nameLower = v.name.toLowerCase();
      return nameLower.includes("amélie") ||
        nameLower.includes("amelie") ||
        nameLower.includes("thomas") ||
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
      v.name.toLowerCase().includes("compact")
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
      !v.name.toLowerCase().includes("junior")
  );
  if (decentVoice) return decentVoice;

  // Last resort: Return first matching voice
  return matchingVoices[0];
}

/**
 * Speak text with high-quality voice selection
 */
function speakText(text) {
  if (!('speechSynthesis' in window)) {
    logger.warn('Speech synthesis not supported');
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  let voices = window.speechSynthesis.getVoices();

  const speakWithVoice = () => {
    voices = window.speechSynthesis.getVoices();
    const bestVoice = selectBestVoice(voices, utterance.lang);
    if (bestVoice) {
      utterance.voice = bestVoice;
      logger.log(`Modal TTS: ${bestVoice.name} (${bestVoice.lang}) - "${text}"`);
    }
    window.speechSynthesis.speak(utterance);
  };

  // Handle async voice loading (some browsers load voices asynchronously)
  if (voices.length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", speakWithVoice, { once: true });
  } else {
    speakWithVoice();
  }
}

const VerbPatternModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="verb-pattern-modal-backdrop" onClick={handleBackdropClick}>
      <div className="verb-pattern-modal">
        <div className="verb-pattern-modal-header">
          <h2>Verb Pattern Discovery</h2>
          <button
            className="verb-pattern-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="verb-pattern-modal-content">
          <div className="pattern-intro">
            <p>
              Verbs tell you who is doing the action, and you may be noticing
              simple patterns when it comes to many verbs!
            </p>
          </div>

          <div className="pattern-section">
            <h3>Sound-Alike Patterns Across Verbs</h3>
            <div className="verb-comparison-grid">
              <div className="verb-column">
                <h4>vouloir (to want)</h4>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("je veux")}
                  >
                    <span className="pronoun">je</span>
                    <span className="conjugation">veux</span>
                    <SpeakButton text="je veux" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("tu veux")}
                  >
                    <span className="pronoun">tu</span>
                    <span className="conjugation">veux</span>
                    <SpeakButton text="tu veux" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("il veut")}
                  >
                    <span className="pronoun">il/elle</span>
                    <span className="conjugation">veut</span>
                    <SpeakButton text="il veut" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h4>pouvoir (can/able)</h4>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("je peux")}
                  >
                    <span className="pronoun">je</span>
                    <span className="conjugation">peux</span>
                    <SpeakButton text="je peux" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("tu peux")}
                  >
                    <span className="pronoun">tu</span>
                    <span className="conjugation">peux</span>
                    <SpeakButton text="tu peux" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("il peut")}
                  >
                    <span className="pronoun">il/elle</span>
                    <span className="conjugation">peut</span>
                    <SpeakButton text="il peut" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h4>venir (to come)</h4>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("je viens")}
                  >
                    <span className="pronoun">je</span>
                    <span className="conjugation">viens</span>
                    <SpeakButton text="je viens" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("tu viens")}
                  >
                    <span className="pronoun">tu</span>
                    <span className="conjugation">viens</span>
                    <SpeakButton text="tu viens" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("il vient")}
                  >
                    <span className="pronoun">il/elle</span>
                    <span className="conjugation">vient</span>
                    <SpeakButton text="il vient" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h4>voir (to see)</h4>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("je vois")}
                  >
                    <span className="pronoun">je</span>
                    <span className="conjugation">vois</span>
                    <SpeakButton text="je vois" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("tu vois")}
                  >
                    <span className="pronoun">tu</span>
                    <span className="conjugation">vois</span>
                    <SpeakButton text="tu vois" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("il voit")}
                  >
                    <span className="pronoun">il/elle</span>
                    <span className="conjugation">voit</span>
                    <SpeakButton text="il voit" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>
            </div>

            <div className="sound-explanation">
              <p className="sound-note">
                <strong>Are you noticing the pattern?</strong> je and tu forms often sound identical,
                while il/elle is slightly different but still very similar!
              </p>
            </div>
          </div>

          <div className="pattern-section">
            <h3>The Silent -ent Ending</h3>
            <div className="verb-comparison-grid">
              <div className="verb-column">
                <h4>vouloir (to want)</h4>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("ils veulent")}
                  >
                    <span className="pronoun">ils/elles</span>
                    <span className="conjugation">veulent</span>
                    <SpeakButton text="ils veulent" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h4>pouvoir (can/able)</h4>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("ils peuvent")}
                  >
                    <span className="pronoun">ils/elles</span>
                    <span className="conjugation">peuvent</span>
                    <SpeakButton text="ils peuvent" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h4>venir (to come)</h4>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("ils viennent")}
                  >
                    <span className="pronoun">ils/elles</span>
                    <span className="conjugation">viennent</span>
                    <SpeakButton text="ils viennent" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h4>voir (to see)</h4>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("ils voient")}
                  >
                    <span className="pronoun">ils/elles</span>
                    <span className="conjugation">voient</span>
                    <SpeakButton text="ils voient" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>
            </div>

            <div className="sound-explanation">
              <p className="sound-note">
                <strong>The -ent is written but not spoken!</strong> In writing, you'll see -ent at the end of
                ils/elles forms, but when speaking, the -ent is silent. However, it can affect how the vowel
                sound before it is pronounced, making it subtly different from the singular forms.
              </p>
            </div>
          </div>

          <div className="pattern-section">
            <h3>Nous and vous as well!</h3>
            <div className="consistent-endings">
              <p className="consistency-note">
                No matter which verb group, <strong>nous</strong> and <strong>vous</strong> are remarkably consistent:
              </p>

              <div className="ending-examples-grid">
                <div className="ending-example-column">
                  <h4>nous (-ons)</h4>
                  <div className="ending-examples">
                    <div
                      className="ending-example clickable"
                      onClick={() => speakText("nous voulons")}
                    >
                      <span className="example-verb">voulons</span>
                      <span className="example-english">we want</span>
                      <SpeakButton text="nous voulons" language="fr-FR" size="small" />
                    </div>
                    <div
                      className="ending-example clickable"
                      onClick={() => speakText("nous pouvons")}
                    >
                      <span className="example-verb">pouvons</span>
                      <span className="example-english">we can</span>
                      <SpeakButton text="nous pouvons" language="fr-FR" size="small" />
                    </div>
                    <div
                      className="ending-example clickable"
                      onClick={() => speakText("nous venons")}
                    >
                      <span className="example-verb">venons</span>
                      <span className="example-english">we come</span>
                      <SpeakButton text="nous venons" language="fr-FR" size="small" />
                    </div>
                    <div
                      className="ending-example clickable"
                      onClick={() => speakText("nous voyons")}
                    >
                      <span className="example-verb">voyons</span>
                      <span className="example-english">we see</span>
                      <SpeakButton text="nous voyons" language="fr-FR" size="small" />
                    </div>
                  </div>
                </div>

                <div className="ending-example-column">
                  <h4>vous (-ez)</h4>
                  <div className="ending-examples">
                    <div
                      className="ending-example clickable"
                      onClick={() => speakText("vous voulez")}
                    >
                      <span className="example-verb">voulez</span>
                      <span className="example-english">you want</span>
                      <SpeakButton text="vous voulez" language="fr-FR" size="small" />
                    </div>
                    <div
                      className="ending-example clickable"
                      onClick={() => speakText("vous pouvez")}
                    >
                      <span className="example-verb">pouvez</span>
                      <span className="example-english">you can</span>
                      <SpeakButton text="vous pouvez" language="fr-FR" size="small" />
                    </div>
                    <div
                      className="ending-example clickable"
                      onClick={() => speakText("vous venez")}
                    >
                      <span className="example-verb">venez</span>
                      <span className="example-english">you come</span>
                      <SpeakButton text="vous venez" language="fr-FR" size="small" />
                    </div>
                    <div
                      className="ending-example clickable"
                      onClick={() => speakText("vous voyez")}
                    >
                      <span className="example-verb">voyez</span>
                      <span className="example-english">you see</span>
                      <SpeakButton text="vous voyez" language="fr-FR" size="small" />
                    </div>
                  </div>
                </div>
              </div>

              <p className="reliability-note">
                <strong>99% of French verbs</strong> follow this -ons/-ez pattern.
                Learn it once, use it everywhere!
              </p>
            </div>
          </div>


          <div className="pattern-section">
            <h3>Verb Groups & Their Origins</h3>
            <div className="verb-groups-explanation">
              <p>
                Keep an eye on these patterns as you learn new verbs. They fall into groups.
                These groups arose from <strong>centuries of language evolution</strong> and are useful for
                <strong>predicting how any French verb will sound</strong> before you even hear it!
              </p>

              <div className="group-examples">
                <div className="group-item">
                  <span className="group-label">-er verbs</span>
                  <span className="group-desc">parler, manger, chercher (most common)</span>
                </div>
                <div className="group-item">
                  <span className="group-label">-ir verbs</span>
                  <span className="group-desc">venir, finir, choisir</span>
                </div>
                <div className="group-item">
                  <span className="group-label">-oir verbs</span>
                  <span className="group-desc">vouloir, pouvoir, voir</span>
                </div>
              </div>
            </div>
          </div>



          <div className="pattern-section">
            <h3>Why This Matters</h3>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <span className="benefit-text">Recognize patterns instead of memorizing individual words</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🔊</span>
                <span className="benefit-text">Understand why some different spellings sound the same</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✨</span>
                <span className="benefit-text">Build confidence with predictable -ons and -ez endings</span>
              </div>
            </div>
          </div>
        </div>

        <div className="verb-pattern-modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Got it! Let's continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerbPatternModal;
