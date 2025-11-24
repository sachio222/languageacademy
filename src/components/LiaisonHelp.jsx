import { useState, useEffect, useCallback } from 'react';
import { Check, X } from 'lucide-react';
import SpeakButton from './SpeakButton';
import UnderstoodButton from './UnderstoodButton';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { useSectionProgress } from '../contexts/SectionProgressContext';
import { extractModuleId } from '../utils/progressSync';
import { selectBestVoice } from '../utils/ttsUtils';
import { toggleSetItem } from '../utils/vocabularyUtils';
import './LiaisonHelp.css';
import { logger } from "../utils/logger";

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
      logger.log(`Liaison TTS: ${bestVoice.name} (${bestVoice.lang}) - "${text}"`);
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
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);
  const supabaseProgress = useSupabaseProgress();
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = supabaseProgress || {};
  const { completeSectionProgress } = useSectionProgress();

  const lessonModuleId = extractModuleId(lesson);

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
          .eq('module_key', moduleId);

        if (error) throw error;

        // Filter for liaison sections and create a map of understood sections
        const understoodSet = new Set();
        data.forEach(item => {
          if (item.concept_term && item.concept_term.startsWith('liaison-')) {
            understoodSet.add(item.concept_index);
          }
        });
        setUnderstoodSections(understoodSet);
        logger.log('LiaisonHelp: Loaded understood sections:', understoodSet);
      } catch (error) {
        logger.error('Error loading understood liaison sections:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnderstoodSections();
  }, [moduleId, isAuthenticated, supabaseUser, supabaseClient]);

  const toggleUnderstood = useCallback(async (sectionIndex) => {
    logger.log('LiaisonHelp: toggleUnderstood called', sectionIndex);
    const isCurrentlyUnderstood = understoodSections.has(sectionIndex);
    const newUnderstood = !isCurrentlyUnderstood;

    // Optimistic update
    setUnderstoodSections(prev => toggleSetItem(prev, sectionIndex, newUnderstood));

    // Sync with Supabase if authenticated
    if (isAuthenticated && moduleId && updateConceptUnderstanding) {
      try {
        const section = liaisonSections[sectionIndex];
        if (!section) {
          logger.error('LiaisonHelp: Section not found at index:', sectionIndex);
          return;
        }
        const termName = `liaison-${section.id}`;
        logger.log('LiaisonHelp: Saving to Supabase...', { moduleId, sectionIndex, termName, newUnderstood });
        await updateConceptUnderstanding(
          moduleId,
          sectionIndex,
          termName,
          newUnderstood
        );
        logger.log('LiaisonHelp: Saved successfully');
      } catch (error) {
        logger.error('LiaisonHelp: Error saving:', error);
        // Revert optimistic update on error
        setUnderstoodSections(prev => toggleSetItem(prev, sectionIndex, isCurrentlyUnderstood));
      }
    }
  }, [understoodSections, isAuthenticated, moduleId, updateConceptUnderstanding, liaisonSections]);

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
                  becomes a "z" sound when the next word starts with a vowel sound. This is called <em>liaison</em>!
                </p>
              </div>
            </div>
          </div>

          <div className="section-footer">
            <UnderstoodButton
              isUnderstood={understoodSections.has(0)}
              onClick={() => toggleUnderstood(0)}
            />
          </div>
        </section>

        {/* Section 2: Silent Letters Wake Up */}
        <section className="liaison-section">
          <h2>With and without</h2>
          <p className="section-intro">
            French has a lot of silent letters at the end of words. The liason simply gives a bit of extra audible structure in a language that is already very fluid. Compare with and without liaison.
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
              <strong>Hear the difference?</strong> without the liaison, the words simply blend together. They might sound like a single word. With the liaison, each word can be distinctly heard.
            </p>
          </div>

          <div className="section-footer">
            <UnderstoodButton
              isUnderstood={understoodSections.has(1)}
              onClick={() => toggleUnderstood(1)}
            />
          </div>
        </section>

        {/* Section 2.5: ils sont vs ils ont comparison */}
        <section className="liaison-section">
          <h2>A liasion can change meaning</h2>
          <p className="section-intro">
            It's very important to understand that a liasion can change the meaning of a phrase.
            For example, "ils sont" means "they are" in English, but "ils ont" means "they have".
          </p>

          <div className="comparison-layout">
            <div className="comparison-column wrong">
              <h3>
                <X size={18} />
                No liaison
              </h3>
              <div className="phrase-list">
                <div className="phrase-item wrong" onClick={() => speakText("ils sont")}>
                  <div className="phrase-content">
                    <div className="phrase-french">ils sont</div>
                    <div className="phrase-pronunciation">"sont" starts with "s" (consonant)</div>
                  </div>
                  <SpeakButton text="ils sont" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="comparison-column correct">
              <h3>
                <Check size={18} />
                With liaison
              </h3>
              <div className="phrase-list">
                <div className="phrase-item correct" onClick={() => speakText("ils ont")}>
                  <div className="phrase-content">
                    <div className="phrase-french">ils ont</div>
                    <div className="phrase-pronunciation">"ont" starts with "o" (vowel)</div>
                  </div>
                  <SpeakButton text="ils ont" language="fr-FR" size="small" />
                </div>
              </div>
            </div>
          </div>

          <div className="insight-box">
            <p>
              <strong>Did you hear a Z or an S?</strong> The "s" sound in "ils sont" comes from the start of the second word "sont". The "z" in "ils ont" is <em>carried over</em> from the end of the first word "ils".
            </p>
          </div>

          <div className="section-footer">
            <UnderstoodButton
              isUnderstood={understoodSections.has(2)}
              onClick={() => toggleUnderstood(2)}
            />
          </div>
        </section>

        {/* Section 3: More examples */}
        <section className="liaison-section">
          <h2>More examples</h2>
          <p className="section-intro">
          </p>

          <div className="examples-grid">


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
              <strong> Don't overthink it.</strong> It's fun to let that silent letter come out and play! And with just a little bit of practice, you'll get it.
            </p>
          </div>

          <div className="section-footer">
            <UnderstoodButton
              isUnderstood={understoodSections.has(3)}
              onClick={() => toggleUnderstood(3)}
            />
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
