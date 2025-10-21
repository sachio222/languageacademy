import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import './LiaisonHelp.css';

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
      <div className="liaison-help">
        <div className="liaison-container">
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="liaison-help">
      <div className="liaison-container">
        <header className="liaison-header">
          <div className="module-prefix">Module {moduleId}</div>
          <h1>French Flow - Liaison</h1>
          <p className="liaison-subtitle">
            When words in French flow together smoothly, there are rules that help them connect. Let's discover how this works using words you already know!
          </p>
          <div className="listen-prompt">
            <span className="speaker-icon">🔊</span>
            <h3>Listen! Use your ears to hear the connections</h3>
          </div>
        </header>

        {/* Section 1: The Rules of Liaison */}
        <section className="liaison-section">
          <h2>The Rules of Liaison</h2>
          <p className="section-intro">
            Where two words meet and the second word <strong>starts with a vowel sound (a, e, i, o, u, or h)</strong>, the <strong>silent, last letter of the first word</ strong> "wakes up" to create a smooth sounding connection!
          </p>

          <div className="comparison-layout">
            <div className="comparison-column">
              <h3>Words You Know</h3>
              <div className="phrase-list">
                <div className="phrase-item" onClick={() => speakText("les amis")}>
                  <div className="phrase-content">
                    <div className="phrase-french">les amis</div>
                    <div className="phrase-pronunciation">lay za-mee</div>
                  </div>
                  <SpeakButton text="les amis" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item" onClick={() => speakText("vous êtes")}>
                  <div className="phrase-content">
                    <div className="phrase-french">vous êtes</div>
                    <div className="phrase-pronunciation">voo zet</div>
                  </div>
                  <SpeakButton text="vous êtes" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item" onClick={() => speakText("ils ont")}>
                  <div className="phrase-content">
                    <div className="phrase-french">ils ont</div>
                    <div className="phrase-pronunciation">eel zon</div>
                  </div>
                  <SpeakButton text="ils ont" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="comparison-column">
              <h3>What's Happening</h3>
              <div className="insight-box">
                <p>
                  <strong>Notice the "z" sound?</strong> The silent "s" at the end of "les", "vous", and "ils"
                  becomes a "z" sound when the next word starts with a vowel or an "h". This is called <em>liaison</em>!
                </p>
              </div>
            </div>
          </div>

          <div className="section-footer">
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
        </section>

        {/* Section 2: Silent Letters Wake Up */}
        <section className="liaison-section">
          <h2>With and without</h2>
          <p className="section-intro">
            French has a lot of silent letters at the end of words. The liason simply gives a bit of extra audible structure in a language that is already very quick. Compare with and without liaison.
          </p>

          <div className="comparison-layout">
            <div className="comparison-column wrong">
              <h3>
                <X size={18} />
                No liaison
              </h3>
              <div className="phrase-list">
                <div className="phrase-item wrong" onClick={() => speakText("vou avez")}>
                  <div className="phrase-content">
                    <div className="phrase-french">vous avez</div>
                  </div>
                  <SpeakButton text="vous avez" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item wrong" onClick={() => speakText("leh hommes")}>
                  <div className="phrase-content">
                    <div className="phrase-french">les hommes</div>
                  </div>
                  <SpeakButton text="les hommes" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="comparison-column correct">
              <h3>
                <Check size={18} />
                With liaison
              </h3>
              <div className="phrase-list">
                <div className="phrase-item correct" onClick={() => speakText("vous avez")}>
                  <div className="phrase-content">
                    <div className="phrase-french">vous avez</div>
                  </div>
                  <SpeakButton text="vous avez" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item correct" onClick={() => speakText("les hommes")}>
                  <div className="phrase-content">
                    <div className="phrase-french">les hommes</div>
                  </div>
                  <SpeakButton text="les hommes" language="fr-FR" size="small" />
                </div>
              </div>
            </div>




          </div>

          <div className="insight-box">
            <p>
              <strong>Hear the difference?</strong> without the liaison, the words simply blend together, and sound like a single word. With the liaison, the words can be heard as two separate words.
            </p>
          </div>

          <div className="section-footer">
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
        </section>

        {/* Section 3: You Already Know This */}
        <section className="liaison-section">
          <h2>You Already Know This!</h2>
          <p className="section-intro">
            <strong>Don't worry about memorizing rules!</strong> You've already been hearing and learning
            these connections naturally. Your ear is getting used to French flow.
          </p>

          <div className="examples-grid">
            <div className="example-group">
              <h3>un + vowel</h3>
              <div className="phrase-list">
                <div className="phrase-item" onClick={() => speakText("un ami")}>
                  <div className="phrase-content">
                    <div className="phrase-french">un ami</div>
                  </div>
                  <SpeakButton text="un ami" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item" onClick={() => speakText("un enfant")}>
                  <div className="phrase-content">
                    <div className="phrase-french">un enfant</div>
                  </div>
                  <SpeakButton text="un enfant" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item" onClick={() => speakText("un homme")}>
                  <div className="phrase-content">
                    <div className="phrase-french">un homme</div>
                  </div>
                  <SpeakButton text="un homme" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="example-group">
              <h3>ils/elles + vowel</h3>
              <div className="phrase-list">
                <div className="phrase-item" onClick={() => speakText("ils ont")}>
                  <div className="phrase-content">
                    <div className="phrase-french">ils ont</div>
                  </div>
                  <SpeakButton text="ils ont" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item" onClick={() => speakText("elles ont")}>
                  <div className="phrase-content">
                    <div className="phrase-french">elles ont</div>
                  </div>
                  <SpeakButton text="elles ont" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item" onClick={() => speakText("ils sont")}>
                  <div className="phrase-content">
                    <div className="phrase-french">ils sont</div>
                  </div>
                  <SpeakButton text="ils sont" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="example-group">
              <h3>More examples</h3>
              <div className="phrase-list">
                <div className="phrase-item" onClick={() => speakText("nous avons")}>
                  <div className="phrase-content">
                    <div className="phrase-french">nous avons</div>
                  </div>
                  <SpeakButton text="nous avons" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item" onClick={() => speakText("vous avez")}>
                  <div className="phrase-content">
                    <div className="phrase-french">vous avez</div>
                  </div>
                  <SpeakButton text="vous avez" language="fr-FR" size="small" />
                </div>

                <div className="phrase-item" onClick={() => speakText("les enfants")}>
                  <div className="phrase-content">
                    <div className="phrase-french">les enfants</div>
                  </div>
                  <SpeakButton text="les enfants" language="fr-FR" size="small" />
                </div>
              </div>
            </div>
          </div>

          <div className="key-takeaway">
            <p>
              <strong>The key takeaway:</strong> French flows like music. Don't stress about the rules -
              just listen and let your ear guide you. You're already doing great!
            </p>
          </div>

          <div className="section-footer">
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
        </section>

        <footer className="liaison-footer">
          <button className="btn-continue" onClick={handleComplete}>
            Continue Learning
          </button>
        </footer>
      </div>
    </div>
  );
};

export default LiaisonHelp;
