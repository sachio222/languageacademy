import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import './VerbPatternHelp.css';
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
      logger.log(`Help TTS: ${bestVoice.name} (${bestVoice.lang}) - "${text}"`);
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

const VerbPatternHelp = ({ onComplete, moduleId, lesson, onModuleComplete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [understoodSections, setUnderstoodSections] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const supabaseProgress = useSupabaseProgress();
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = supabaseProgress || {};

  // Define the verb pattern sections that can be marked as understood
  // Note: The order matters for concept_index in the database
  const verbPatternSections = [
    { id: 'verb-groups-origins', title: 'French Verbs Follow Patterns', index: 0 },
    { id: 'sound-alike-patterns', title: 'Sound-Alike Patterns Across Verbs', index: 1 },
    { id: 'nous-vous-patterns', title: 'Nous and vous patterns', index: 2 },
    { id: 'silent-ent-ending', title: 'The Silent -ent Ending', index: 3 },
    { id: 'irregular-je-forms', title: 'Irregular je Forms', index: 4 },
    { id: 'irregular-tu-il-elle', title: 'Irregular tu, il, and elle Forms', index: 5 },
    { id: 'irregular-ils-elles', title: 'Irregular ils and elles Forms', index: 6 },
    { id: 'aller-avoir-pattern', title: 'aller and avoir still follow the pattern', index: 7 },
    { id: 'etre-most-irregular', title: 'The Most Irregular: être', index: 8 },
    { id: 'why-this-matters', title: 'Why This Matters', index: 9 }
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

        // Filter for verb pattern sections and create a map of understood sections
        const understoodSet = new Set();
        data.forEach(item => {
          if (item.concept_term && item.concept_term.startsWith('verb-pattern-')) {
            // Use the concept_index (numeric) as the key, just like ConceptIntro
            understoodSet.add(item.concept_index);
          }
        });
        setUnderstoodSections(understoodSet);
        logger.log('VerbPatternHelp: Loaded understood sections:', understoodSet);
      } catch (error) {
        logger.error('Error loading understood verb pattern sections:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnderstoodSections();
  }, [moduleId, isAuthenticated, supabaseUser, supabaseClient]);

  const toggleUnderstood = async (sectionIndex) => {
    logger.log('VerbPatternHelp: toggleUnderstood called', sectionIndex);
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
        const section = verbPatternSections[sectionIndex];
        if (!section) {
          logger.error('VerbPatternHelp: Section not found at index:', sectionIndex);
          return;
        }
        const termName = `verb-pattern-${section.id}`;
        logger.log('VerbPatternHelp: Saving to Supabase...', { moduleId, sectionIndex, termName, newUnderstood });
        await updateConceptUnderstanding(
          moduleId,
          sectionIndex,
          termName,
          newUnderstood
        );
        logger.log('VerbPatternHelp: Saved successfully');
      } catch (error) {
        logger.error('VerbPatternHelp: Error saving:', error);
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage1 = () => (
    <>
      <div className="help-nav">
        <div className="help-nav-placeholder"></div>
        <div className="help-page-indicator">
          <span className="page-current">1</span> of <span className="page-total">3</span>
        </div>
      </div>

      <div className="help-header">
        <div className="module-prefix">
          Module {moduleId}
        </div>
        <h1>Understanding Verb Patterns</h1>
        <p className="help-subtitle">
          You may be noticing subtle patterns when it comes to many of the verbs you've learned so far. Let's take a look at some of them.
        </p>
        <div className="listen-prompt">
          <span className="speaker-icon">🔊</span>
          <h3>Listen! Use your ears to hear the patterns!</h3>
        </div>
      </div>

      <div className="help-content">
        <div className="help-section">
          <h2>French Verbs Follow Patterns</h2>
          <div className="verb-groups-explanation">
            <p>
              Have you noticed patterns in the verbs you've learned so far? <strong>French verbs belong to groups</strong> (more on those later).
              Verbs in the same group tend to follow similar patterns. This is great news! Once you recognize these
              patterns, learning new verbs becomes much simpler.
            </p>
            <p>
              You've learned the conjugations so far <em>as written</em>. Now let's listen to the patterns in how they sound.
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
          <h2>Sound-Alike Patterns Across Verbs</h2>
          <div className="verb-comparison-grid">
            <div className="verb-column">
              <h3>vouloir (to want)</h3>
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
                  <span className="pronoun">il</span>
                  <span className="conjugation">veut</span>
                  <SpeakButton text="il veut" language="fr-FR" size="small" />
                </div>
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("elle veut")}
                >
                  <span className="pronoun">elle</span>
                  <span className="conjugation">veut</span>
                  <SpeakButton text="elle veut" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>pouvoir (can/able)</h3>
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
                  <span className="pronoun">il</span>
                  <span className="conjugation">peut</span>
                  <SpeakButton text="il peut" language="fr-FR" size="small" />
                </div>
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("elle peut")}
                >
                  <span className="pronoun">elle</span>
                  <span className="conjugation">peut</span>
                  <SpeakButton text="elle peut" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>venir (to come)</h3>
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
                  <span className="pronoun">il</span>
                  <span className="conjugation">vient</span>
                  <SpeakButton text="il vient" language="fr-FR" size="small" />
                </div>
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("elle vient")}
                >
                  <span className="pronoun">elle</span>
                  <span className="conjugation">vient</span>
                  <SpeakButton text="elle vient" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>voir (to see)</h3>
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
                  <span className="pronoun">il</span>
                  <span className="conjugation">voit</span>
                  <SpeakButton text="il voit" language="fr-FR" size="small" />
                </div>
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("elle voit")}
                >
                  <span className="pronoun">elle</span>
                  <span className="conjugation">voit</span>
                  <SpeakButton text="elle voit" language="fr-FR" size="small" />
                </div>
              </div>
            </div>
          </div>

          <div className="sound-explanation">
            <p className="sound-note">
              <strong>Are you noticing the pattern?</strong> You may have to remember different spellings, but several <em>pronunciations</em> for a single verb tend to sound exactly the same when conjugated.
              This will help greatly when you try to speak and understand French.
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
          <h2>Nous and vous as well!</h2>
          <div className="consistent-endings">
            <p className="consistency-note">
              No matter which verb group, the patterns for <strong>nous</strong> and <strong>vous</strong> are remarkably consistent:
            </p>

            <div className="verb-conjugation-table">
              <div className="table-header">
                <div className="header-cell"></div>
                <div className="header-cell">nous (-ons)</div>
                <div className="header-cell">vous (-ez)</div>
              </div>

              <div className="table-row">
                <div className="infinitive-cell">vouloir</div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("nous voulons")}
                >
                  <span className="example-verb">voulons</span>
                  <span className="example-english">we want</span>
                  <SpeakButton text="nous voulons" language="fr-FR" size="small" />
                </div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("vous voulez")}
                >
                  <span className="example-verb">voulez</span>
                  <span className="example-english">you want</span>
                  <SpeakButton text="vous voulez" language="fr-FR" size="small" />
                </div>
              </div>

              <div className="table-row">
                <div className="infinitive-cell">pouvoir</div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("nous pouvons")}
                >
                  <span className="example-verb">pouvons</span>
                  <span className="example-english">we can</span>
                  <SpeakButton text="nous pouvons" language="fr-FR" size="small" />
                </div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("vous pouvez")}
                >
                  <span className="example-verb">pouvez</span>
                  <span className="example-english">you can</span>
                  <SpeakButton text="vous pouvez" language="fr-FR" size="small" />
                </div>
              </div>

              <div className="table-row">
                <div className="infinitive-cell">venir</div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("nous venons")}
                >
                  <span className="example-verb">venons</span>
                  <span className="example-english">we come</span>
                  <SpeakButton text="nous venons" language="fr-FR" size="small" />
                </div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("vous venez")}
                >
                  <span className="example-verb">venez</span>
                  <span className="example-english">you come</span>
                  <SpeakButton text="vous venez" language="fr-FR" size="small" />
                </div>
              </div>

              <div className="table-row">
                <div className="infinitive-cell">voir</div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("nous voyons")}
                >
                  <span className="example-verb">voyons</span>
                  <span className="example-english">we see</span>
                  <SpeakButton text="nous voyons" language="fr-FR" size="small" />
                </div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("vous voyez")}
                >
                  <span className="example-verb">voyez</span>
                  <span className="example-english">you see</span>
                  <SpeakButton text="vous voyez" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <p className="reliability-note">
              (Some of you may even recognize the question form of this pattern already: <strong>Voulez-vous ______</strong> avec moi? 💤)
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

        <div className="help-section">
          <h2>The Silent -ent Ending</h2>
          <div className="verb-comparison-grid">
            <div className="verb-column">
              <h3>vouloir (to want)</h3>
              <div className="verb-forms">
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("ils veulent")}
                >
                  <span className="pronoun">ils</span>
                  <span className="conjugation">veulent</span>
                  <SpeakButton text="ils veulent" language="fr-FR" size="small" />
                </div>
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("elles veulent")}
                >
                  <span className="pronoun">elles</span>
                  <span className="conjugation">veulent</span>
                  <SpeakButton text="elles veulent" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>pouvoir (can/able)</h3>
              <div className="verb-forms">
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("ils peuvent")}
                >
                  <span className="pronoun">ils</span>
                  <span className="conjugation">peuvent</span>
                  <SpeakButton text="ils peuvent" language="fr-FR" size="small" />
                </div>
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("elles peuvent")}
                >
                  <span className="pronoun">elles</span>
                  <span className="conjugation">peuvent</span>
                  <SpeakButton text="elles peuvent" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>venir (to come)</h3>
              <div className="verb-forms">
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("ils viennent")}
                >
                  <span className="pronoun">ils</span>
                  <span className="conjugation">viennent</span>
                  <SpeakButton text="ils viennent" language="fr-FR" size="small" />
                </div>
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("elles viennent")}
                >
                  <span className="pronoun">elles</span>
                  <span className="conjugation">viennent</span>
                  <SpeakButton text="elles viennent" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>voir (to see)</h3>
              <div className="verb-forms">
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("ils voient")}
                >
                  <span className="pronoun">ils</span>
                  <span className="conjugation">voient</span>
                  <SpeakButton text="ils voient" language="fr-FR" size="small" />
                </div>
                <div
                  className="verb-form clickable"
                  onClick={() => speakText("elles voient")}
                >
                  <span className="pronoun">elles</span>
                  <span className="conjugation">voient</span>
                  <SpeakButton text="elles voient" language="fr-FR" size="small" />
                </div>
              </div>
            </div>
          </div>

          <div className="sound-explanation">
            <p className="sound-note">
              <strong>The -ent is written but not spoken!</strong> In writing, you'll see -ent at the end of
              words, and that tells us immediately that many people or things are doing something.

              But when speaking, the -ent is <strong>silent</strong>.
            </p>
            <br />
            <p className="sound-note">
              However, it <em>can</em> affect how the letters before it are pronounced, making it subtly different from the singular forms.
            </p>
          </div>
          <div className="section-understood">
            <button
              className={`understood-btn ${understoodSections.has(3) ? 'understood' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleUnderstood(3);
              }}
            >
              {understoodSections.has(3) && <Check size={16} />}
              Understood
            </button>
          </div>
        </div>

        <div className="help-section">
          <div className="transition-note">
            <p>
              But not all verbs follow this pattern, do they? Let's look at the others you've learned so far...
            </p>
          </div>
        </div>
      </div>

      <div className="help-footer">
        <button className="btn-continue" onClick={() => handlePageChange(2)}>
          Continue →
        </button>
      </div>
    </>
  );

  const renderPage2 = () => (
    <>
      <div className="help-nav">
        <button className="btn-nav-back" onClick={() => handlePageChange(1)}>
          ← Previous
        </button>
        <div className="help-page-indicator">
          <span className="page-current">2</span> of <span className="page-total">3</span>
        </div>
      </div>

      <div className="help-header">
        <div className="module-prefix">
          Module {moduleId}
        </div>
        <h1>The Irregular Verbs</h1>
        <p className="help-subtitle">
          Some of the verbs you've already learned are used so frequently that they actually help shape the framework of the language itself, and therefore don't fit into common patterns. These are called "irregular verbs".
        </p>
        <div className="listen-prompt">
          <span className="speaker-icon">🔊</span>
          <h3>Listen! Use your ears to hear the patterns!</h3>
        </div>
      </div>

      <div className="help-content">
        <div className="help-section">
          <h2>The je Forms</h2>
          <div className="verb-comparison-grid verb-grid-3col">
            <div className="verb-column">
              <h3>être (to be)</h3>
              <div className="verb-forms">
                <div className="verb-form clickable" onClick={() => speakText("je suis")}>
                  <span className="pronoun">je</span>
                  <span className="conjugation">suis</span>
                  <SpeakButton text="je suis" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>avoir (to have)</h3>
              <div className="verb-forms">
                <div className="verb-form clickable" onClick={() => speakText("j'ai")}>
                  <span className="pronoun">j'</span>
                  <span className="conjugation">ai</span>
                  <SpeakButton text="j'ai" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>aller (to go)</h3>
              <div className="verb-forms">
                <div className="verb-form clickable" onClick={() => speakText("je vais")}>
                  <span className="pronoun">je</span>
                  <span className="conjugation">vais</span>
                  <SpeakButton text="je vais" language="fr-FR" size="small" />
                </div>
              </div>
            </div>
          </div>

          <div className="sound-explanation">
            <p className="sound-note">
              <strong>Common enough to remember!</strong> Even though these verbs are irregular, they occur so frequently that they are easy to remember.
            </p>
            <br />
            <p className="sound-note">
              (Think about how "to be" in English conjugates to "am", "are", and "is". No pattern there, either!)
            </p>
          </div>
          <div className="section-understood">
            <button
              className={`understood-btn ${understoodSections.has(4) ? 'understood' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleUnderstood(4);
              }}
            >
              {understoodSections.has(4) && <Check size={16} />}
              Understood
            </button>
          </div>
        </div>

        <div className="help-section">
          <h2>The tu, il, and elle Forms</h2>
          <div className="verb-comparison-grid verb-grid-3col">
            <div className="verb-column">
              <h3>être (to be)</h3>
              <div className="verb-forms">
                <div className="verb-form clickable" onClick={() => speakText("tu es")}>
                  <span className="pronoun">tu</span>
                  <span className="conjugation">es</span>
                  <SpeakButton text="tu es" language="fr-FR" size="small" />
                </div>
                <div className="verb-form clickable" onClick={() => speakText("il est")}>
                  <span className="pronoun">il</span>
                  <span className="conjugation">est</span>
                  <SpeakButton text="il est" language="fr-FR" size="small" />
                </div>
                <div className="verb-form clickable" onClick={() => speakText("elle est")}>
                  <span className="pronoun">elle</span>
                  <span className="conjugation">est</span>
                  <SpeakButton text="elle est" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>avoir (to have)</h3>
              <div className="verb-forms">
                <div className="verb-form clickable" onClick={() => speakText("tu as")}>
                  <span className="pronoun">tu</span>
                  <span className="conjugation">as</span>
                  <SpeakButton text="tu as" language="fr-FR" size="small" />
                </div>
                <div className="verb-form clickable" onClick={() => speakText("il a")}>
                  <span className="pronoun">il</span>
                  <span className="conjugation">a</span>
                  <SpeakButton text="il a" language="fr-FR" size="small" />
                </div>
                <div className="verb-form clickable" onClick={() => speakText("elle a")}>
                  <span className="pronoun">elle</span>
                  <span className="conjugation">a</span>
                  <SpeakButton text="elle a" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>aller (to go)</h3>
              <div className="verb-forms">
                <div className="verb-form clickable" onClick={() => speakText("tu vas")}>
                  <span className="pronoun">tu</span>
                  <span className="conjugation">vas</span>
                  <SpeakButton text="tu vas" language="fr-FR" size="small" />
                </div>
                <div className="verb-form clickable" onClick={() => speakText("il va")}>
                  <span className="pronoun">il</span>
                  <span className="conjugation">va</span>
                  <SpeakButton text="il va" language="fr-FR" size="small" />
                </div>
                <div className="verb-form clickable" onClick={() => speakText("elle va")}>
                  <span className="pronoun">elle</span>
                  <span className="conjugation">va</span>
                  <SpeakButton text="elle va" language="fr-FR" size="small" />
                </div>
              </div>
            </div>
          </div>

          <div className="sound-explanation">
            <p className="sound-note">
              <strong>Listen to the similarities!</strong> Again, tu and il/elle sound exactly the same when conjugated.
            </p>
          </div>
          <div className="section-understood">
            <button
              className={`understood-btn ${understoodSections.has(5) ? 'understood' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleUnderstood(5);
              }}
            >
              {understoodSections.has(5) && <Check size={16} />}
              Understood
            </button>
          </div>
        </div>

        <div className="help-section">
          <h2>Nous and vous still follow the pattern!</h2>
          <div className="consistent-endings">
            <p className="consistency-note">
              Even though they're irregular, <strong>aller</strong> and <strong>avoir</strong> keep the reliable -ons/-ez endings:
            </p>

            <div className="verb-conjugation-table">
              <div className="table-header">
                <div className="header-cell"></div>
                <div className="header-cell">nous (-ons)</div>
                <div className="header-cell">vous (-ez)</div>
              </div>

              <div className="table-row">
                <div className="infinitive-cell">avoir</div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("nous avons")}
                >
                  <span className="example-verb">avons</span>
                  <span className="example-english">we have</span>
                  <SpeakButton text="nous avons" language="fr-FR" size="small" />
                </div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("vous avez")}
                >
                  <span className="example-verb">avez</span>
                  <span className="example-english">you have</span>
                  <SpeakButton text="vous avez" language="fr-FR" size="small" />
                </div>
              </div>

              <div className="table-row">
                <div className="infinitive-cell">aller</div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("nous allons")}
                >
                  <span className="example-verb">allons</span>
                  <span className="example-english">we go</span>
                  <SpeakButton text="nous allons" language="fr-FR" size="small" />
                </div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("vous allez")}
                >
                  <span className="example-verb">allez</span>
                  <span className="example-english">you go</span>
                  <SpeakButton text="vous allez" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <p className="reliability-note">
              <strong>The -ons and -ez pattern is so strong</strong> that even most irregular verbs follow it!
            </p>
          </div>
          <div className="section-understood">
            <button
              className={`understood-btn ${understoodSections.has(7) ? 'understood' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleUnderstood(7);
              }}
            >
              {understoodSections.has(7) && <Check size={16} />}
              Understood
            </button>
          </div>
        </div>

        <div className="help-section">
          <h2>The Most Irregular: être</h2>
          <div className="consistent-endings">
            <p className="consistency-note">
              <strong>être</strong> breaks the -ons/-ez rule:
            </p>

            <div className="verb-conjugation-table">
              <div className="table-header">
                <div className="header-cell"></div>
                <div className="header-cell">nous</div>
                <div className="header-cell">vous</div>
              </div>

              <div className="table-row">
                <div className="infinitive-cell">être</div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("nous sommes")}
                >
                  <span className="example-verb">sommes</span>
                  <span className="example-english">we are</span>
                  <SpeakButton text="nous sommes" language="fr-FR" size="small" />
                </div>
                <div
                  className="conjugation-cell clickable"
                  onClick={() => speakText("vous êtes")}
                >
                  <span className="example-verb">êtes</span>
                  <span className="example-english">you are</span>
                  <SpeakButton text="vous êtes" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <p className="reliability-note">
              <strong>être breaks ALL the rules!</strong> It's the most important verb in French,
              so it gets to be completely unique.
            </p>
          </div>
          <div className="section-understood">
            <button
              className={`understood-btn ${understoodSections.has(8) ? 'understood' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleUnderstood(8);
              }}
            >
              {understoodSections.has(8) && <Check size={16} />}
              Understood
            </button>
          </div>
        </div>

        <div className="help-section">
          <h2>The ils and elles Forms</h2>
          <div className="verb-comparison-grid verb-grid-3col">
            <div className="verb-column">
              <h3>être (to be)</h3>
              <div className="verb-forms">
                <div className="verb-form clickable" onClick={() => speakText("ils sont")}>
                  <span className="pronoun">ils</span>
                  <span className="conjugation">sont</span>
                  <SpeakButton text="ils sont" language="fr-FR" size="small" />
                </div>
                <div className="verb-form clickable" onClick={() => speakText("elles sont")}>
                  <span className="pronoun">elles</span>
                  <span className="conjugation">sont</span>
                  <SpeakButton text="elles sont" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>avoir (to have)</h3>
              <div className="verb-forms">
                <div className="verb-form clickable" onClick={() => speakText("ils ont")}>
                  <span className="pronoun">ils</span>
                  <span className="conjugation">ont</span>
                  <SpeakButton text="ils ont" language="fr-FR" size="small" />
                </div>
                <div className="verb-form clickable" onClick={() => speakText("elles ont")}>
                  <span className="pronoun">elles</span>
                  <span className="conjugation">ont</span>
                  <SpeakButton text="elles ont" language="fr-FR" size="small" />
                </div>
              </div>
            </div>

            <div className="verb-column">
              <h3>aller (to go)</h3>
              <div className="verb-forms">
                <div className="verb-form clickable" onClick={() => speakText("ils vont")}>
                  <span className="pronoun">ils</span>
                  <span className="conjugation">vont</span>
                  <SpeakButton text="ils vont" language="fr-FR" size="small" />
                </div>
                <div className="verb-form clickable" onClick={() => speakText("elles vont")}>
                  <span className="pronoun">elles</span>
                  <span className="conjugation">vont</span>
                  <SpeakButton text="elles vont" language="fr-FR" size="small" />
                </div>
              </div>
            </div>
          </div>

          <div className="sound-explanation">
            <p className="sound-note">
              <strong>Notice something interesting?</strong> Listen to how the "s" sound becomes a "z" sound in the ils and elles forms for avoir, and is a clean "s" in être. Remember that! The "z" sound is called a liaison.
            </p>
          </div>
          <div className="section-understood">
            <button
              className={`understood-btn ${understoodSections.has(6) ? 'understood' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleUnderstood(6);
              }}
            >
              {understoodSections.has(6) && <Check size={16} />}
              Understood
            </button>
          </div>
        </div>

      </div>

      <div className="help-footer">
        <button className="btn-back" onClick={() => handlePageChange(1)}>
          ← Previous
        </button>
        <button className="btn-continue" onClick={() => handlePageChange(3)}>
          Continue →
        </button>
      </div>
    </>
  );

  const renderPage3 = () => (
    <>
      <div className="help-nav">
        <button className="btn-nav-back" onClick={() => handlePageChange(2)}>
          ← Previous
        </button>
        <div className="help-page-indicator">
          <span className="page-current">3</span> of <span className="page-total">3</span>
        </div>
      </div>

      <div className="help-header">
        <div className="module-prefix">
          Module {moduleId}
        </div>
        <h1>Why This Matters</h1>
        <p className="help-subtitle">
          Understanding these patterns will accelerate your French learning.
        </p>
      </div>

      <div className="help-content">
        <div className="help-section">
          <h2>It makes learning easier!</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">🔊</span>
              <span className="benefit-text"><strong>Different spellings can sound the same</strong> — those sound-alikes and consistent endings you heard will show up again and again</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎉</span>
              <span className="benefit-text"><strong>It gets easier from here!</strong> — être, avoir, aller are the 3 most irregular verbs in French, and you already know them cold</span>
            </div>

            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <span className="benefit-text"><strong>Most verbs will be even more predictable</strong> — It helps digest those verb conjugation lists much easier. Just wait till you learn the next verb coming up!</span>
            </div>

          </div>
          <div className="section-understood">
            <button
              className={`understood-btn ${understoodSections.has(9) ? 'understood' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleUnderstood(9);
              }}
            >
              {understoodSections.has(9) && <Check size={16} />}
              Understood
            </button>
          </div>
        </div>
      </div>

      <div className="help-footer">
        <button className="btn-back" onClick={() => handlePageChange(2)}>
          ← Previous
        </button>
        <button className="btn-continue" onClick={() => {
          // Use existing module completion pattern
          if (onModuleComplete && lesson) {
            logger.log('VerbPatternHelp: Marking module as completed and going to next');
            onModuleComplete(lesson.id, 100, 0, true); // moduleId, score, timeSpent, goToNext
          } else {
            // Fallback to original behavior
            onComplete();
          }
        }}>
          Continue to Next Module →
        </button>
      </div>
    </>
  );

  return (
    <div className="verb-pattern-help">
      <div className="verb-pattern-help-container">
        {currentPage === 1 && renderPage1()}
        {currentPage === 2 && renderPage2()}
        {currentPage === 3 && renderPage3()}
      </div>
    </div>
  );
};

export default VerbPatternHelp;
