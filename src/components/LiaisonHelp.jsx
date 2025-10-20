import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import './VerbPatternHelp.css'; // Reuse the same styles

/**
 * Select the best available voice for French
 * Same logic as VerbPatternHelp for consistency
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
    console.warn('Speech synthesis not supported');
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
      console.log(`Liaison TTS: ${bestVoice.name} (${bestVoice.lang}) - "${text}"`);
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

const LiaisonHelp = ({ onComplete, moduleId, lesson, onModuleComplete }) => {
  const [understoodSections, setUnderstoodSections] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const supabaseProgress = useSupabaseProgress();
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = supabaseProgress || {};

  // Define the liaison sections that can be marked as understood
  const liaisonSections = [
    { id: 'french-words-connect', title: 'French Words Connect', index: 0 },
    { id: 'silent-letters-wake-up', title: 'Silent Letters Wake Up', index: 1 },
    { id: 'you-already-know', title: 'You Already Know This!', index: 2 }
  ];

  // Load understood sections from database when component loads
  useEffect(() => {
    const loadUnderstoodSections = async () => {
      if (!isAuthenticated || !supabaseUser || !moduleId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .from('concept_understanding')
          .select('concept_index, concept_term')
          .eq('user_id', supabaseUser.id)
          .eq('module_id', moduleId);

        if (error) throw error;

        // Filter for liaison sections and create a map of understood sections
        const understoodSet = new Set();
        data.forEach(item => {
          if (item.concept_term && item.concept_term.startsWith('liaison-')) {
            understoodSet.add(item.concept_index);
          }
        });
        setUnderstoodSections(understoodSet);
        console.log('LiaisonHelp: Loaded understood sections:', understoodSet);
      } catch (error) {
        console.error('Error loading understood liaison sections:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnderstoodSections();
  }, [moduleId, isAuthenticated, supabaseUser, supabaseClient]);

  const toggleUnderstood = async (sectionIndex) => {
    console.log('LiaisonHelp: toggleUnderstood called', sectionIndex);
    const isCurrentlyUnderstood = understoodSections.has(sectionIndex);
    const newUnderstood = !isCurrentlyUnderstood;

    // Optimistic update
    setUnderstoodSections(prev => {
      const newSet = new Set(prev);
      if (newUnderstood) {
        newSet.add(sectionIndex);
      } else {
        newSet.delete(sectionIndex);
      }
      return newSet;
    });

    // Sync with Supabase if authenticated
    if (isAuthenticated && moduleId && updateConceptUnderstanding) {
      try {
        const section = liaisonSections[sectionIndex];
        if (!section) {
          console.error('LiaisonHelp: Section not found at index:', sectionIndex);
          return;
        }
        const termName = `liaison-${section.id}`;
        console.log('LiaisonHelp: Saving to Supabase...', { moduleId, sectionIndex, termName, newUnderstood });
        await updateConceptUnderstanding(
          moduleId,
          sectionIndex,
          termName,
          newUnderstood
        );
        console.log('LiaisonHelp: Saved successfully');
      } catch (error) {
        console.error('LiaisonHelp: Error saving:', error);
        // Revert optimistic update on error
        setUnderstoodSections(prev => {
          const newSet = new Set(prev);
          if (isCurrentlyUnderstood) {
            newSet.add(sectionIndex);
          } else {
            newSet.delete(sectionIndex);
          }
          return newSet;
        });
      }
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  if (loading) {
    return (
      <div className="verb-pattern-help">
        <div className="verb-pattern-help-container">
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="verb-pattern-help">
      <div className="verb-pattern-help-container">
        <div className="help-nav">
          <div className="help-nav-placeholder"></div>
          <div className="help-page-indicator">
            <span className="page-current">1</span> of <span className="page-total">1</span>
          </div>
        </div>

        <div className="help-header">
          <div className="module-prefix">
            Module {moduleId}
          </div>
          <h1>French Flow - Liaison</h1>
          <p className="help-subtitle">
            You've been hearing something special in French - words that flow together smoothly. Let's discover how this works using words you already know!
          </p>
          <div className="listen-prompt">
            <span className="speaker-icon">🔊</span>
            <h3>Listen! Use your ears to hear the connections!</h3>
          </div>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>French Words Connect</h2>
            <div className="verb-groups-explanation">
              <p>
                Unlike English, <strong>French words flow together smoothly</strong> without pauses.
                When a word ending in a consonant meets a word starting with a vowel, they connect!
              </p>
              <p>
                You've already been hearing this in words you know. Let's listen to some examples:
              </p>
            </div>

            <div className="verb-comparison-grid">
              <div className="verb-column">
                <h3>Words You Know</h3>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("les amis")}
                  >
                    <span className="pronoun">les</span>
                    <span className="conjugation">amis</span>
                    <SpeakButton text="les amis" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("vous êtes")}
                  >
                    <span className="pronoun">vous</span>
                    <span className="conjugation">êtes</span>
                    <SpeakButton text="vous êtes" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("ils ont")}
                  >
                    <span className="pronoun">ils</span>
                    <span className="conjugation">ont</span>
                    <SpeakButton text="ils ont" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h3>How They Sound</h3>
                <div className="verb-forms">
                  <div className="verb-form">
                    <span className="pronoun">lay</span>
                    <span className="conjugation">za-mee</span>
                  </div>
                  <div className="verb-form">
                    <span className="pronoun">voo</span>
                    <span className="conjugation">zet</span>
                  </div>
                  <div className="verb-form">
                    <span className="pronoun">eel</span>
                    <span className="conjugation">zon</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sound-explanation">
              <p className="sound-note">
                <strong>Notice the "z" sound?</strong> The silent "s" at the end of "les", "vous", and "ils"
                becomes a "z" sound when the next word starts with a vowel. This is called <em>liaison</em>!
              </p>
            </div>

            <div className="section-understood">
              <button
                className={`understood-btn ${understoodSections.has(0) ? 'understood' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUnderstood(0);
                }}
              >
                {understoodSections.has(0) && <Check size={16} />}
                Understood
              </button>
            </div>
          </div>

          <div className="help-section">
            <h2>Silent Letters Wake Up</h2>
            <div className="verb-groups-explanation">
              <p>
                Some letters that are normally silent become pronounced when the next word starts with a vowel.
                It's like they "wake up" to help the words flow together!
              </p>
            </div>

            <div className="verb-comparison-grid">
              <div className="verb-column">
                <h3>With Consonant</h3>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("les chats")}
                  >
                    <span className="pronoun">les</span>
                    <span className="conjugation">chats</span>
                    <SpeakButton text="les chats" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("vous avez")}
                  >
                    <span className="pronoun">vous</span>
                    <span className="conjugation">avez</span>
                    <SpeakButton text="vous avez" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h3>With Vowel</h3>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("les amis")}
                  >
                    <span className="pronoun">les</span>
                    <span className="conjugation">amis</span>
                    <SpeakButton text="les amis" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("vous êtes")}
                  >
                    <span className="pronoun">vous</span>
                    <span className="conjugation">êtes</span>
                    <SpeakButton text="vous êtes" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>
            </div>

            <div className="sound-explanation">
              <p className="sound-note">
                <strong>Hear the difference?</strong> With consonants (chats, avez), the "s" stays silent.
                With vowels (amis, êtes), the "s" becomes a "z" sound to connect the words smoothly.
              </p>
            </div>

            <div className="section-understood">
              <button
                className={`understood-btn ${understoodSections.has(1) ? 'understood' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUnderstood(1);
                }}
              >
                {understoodSections.has(1) && <Check size={16} />}
                Understood
              </button>
            </div>
          </div>

          <div className="help-section">
            <h2>You Already Know This!</h2>
            <div className="verb-groups-explanation">
              <p>
                <strong>Don't worry about memorizing rules!</strong> You've already been hearing and learning
                these connections naturally. Your ear is getting used to French flow.
              </p>
              <p>
                Here are more examples with words you know:
              </p>
            </div>

            <div className="verb-comparison-grid verb-grid-3col">
              <div className="verb-column">
                <h3>un + vowel</h3>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("un ami")}
                  >
                    <span className="conjugation">un ami</span>
                    <SpeakButton text="un ami" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("un enfant")}
                  >
                    <span className="conjugation">un enfant</span>
                    <SpeakButton text="un enfant" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("un homme")}
                  >
                    <span className="conjugation">un homme</span>
                    <SpeakButton text="un homme" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h3>ils/elles + vowel</h3>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("ils ont")}
                  >
                    <span className="conjugation">ils ont</span>
                    <SpeakButton text="ils ont" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("elles ont")}
                  >
                    <span className="conjugation">elles ont</span>
                    <SpeakButton text="elles ont" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("ils sont")}
                  >
                    <span className="conjugation">ils sont</span>
                    <SpeakButton text="ils sont" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>

              <div className="verb-column">
                <h3>More examples</h3>
                <div className="verb-forms">
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("nous avons")}
                  >
                    <span className="conjugation">nous avons</span>
                    <SpeakButton text="nous avons" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("vous avez")}
                  >
                    <span className="conjugation">vous avez</span>
                    <SpeakButton text="vous avez" language="fr-FR" size="small" />
                  </div>
                  <div
                    className="verb-form clickable"
                    onClick={() => speakText("les enfants")}
                  >
                    <span className="conjugation">les enfants</span>
                    <SpeakButton text="les enfants" language="fr-FR" size="small" />
                  </div>
                </div>
              </div>
            </div>

            <div className="transition-note">
              <p>
                <strong>The key takeaway:</strong> French flows like music. Don't stress about the rules -
                just listen and let your ear guide you. You're already doing great!
              </p>
            </div>

            <div className="section-understood">
              <button
                className={`understood-btn ${understoodSections.has(2) ? 'understood' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUnderstood(2);
                }}
              >
                {understoodSections.has(2) && <Check size={16} />}
                Understood
              </button>
            </div>
          </div>
        </div>

        <div className="help-footer">
          <button className="btn-continue" onClick={handleComplete}>
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiaisonHelp;
