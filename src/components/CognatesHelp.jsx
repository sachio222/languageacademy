import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import './CognatesHelp.css';
import { logger } from "../utils/logger";

/**
 * Select the best available voice for French
 * Same logic as LiaisonHelp for consistency
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
      !v.name.toLowerCase().includes("ralf") &&
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
      logger.log(`Cognates TTS: ${bestVoice.name} (${bestVoice.lang}) - "${text}"`);
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

const CognatesHelp = ({ onComplete, moduleId, lesson, onModuleComplete }) => {
  const [understoodSections, setUnderstoodSections] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const supabaseProgress = useSupabaseProgress();
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = supabaseProgress || {};

  // Define the cognates sections that can be marked as understood
  const cognatesSections = [
    { id: 'what-are-cognates', title: 'What Are Cognates?', index: 0 },
    { id: 'people-and-roles', title: 'People and Roles', index: 1 },
    { id: 'places-and-institutions', title: 'Places and Institutions', index: 2 },
    { id: 'objects-and-things', title: 'Objects and Things', index: 3 },
    { id: 'concepts-and-abstracts', title: 'Concepts and Abstracts', index: 4 },
    { id: 'food-and-drink', title: 'Food and Drink', index: 5 }
  ];

  // Cognates data organized by category
  const cognatesData = {
    peopleAndRoles: [
      { french: "un acteur", english: "actor" },
      { french: "une actrice", english: "actress" },
      { french: "un artiste", english: "artist" },
      { french: "un client", english: "client" },
      { french: "un étudiant", english: "student" },
      { french: "un docteur", english: "doctor" },
      { french: "un professeur", english: "professor" },
      { french: "un touriste", english: "tourist" }
    ],
    placesAndInstitutions: [
      { french: "un hôpital", english: "hospital" },
      { french: "un restaurant", english: "restaurant" },
      { french: "un musée", english: "museum" },
      { french: "une banque", english: "bank" },
      { french: "un hôtel", english: "hotel" },
      { french: "un cinéma", english: "cinema" },
      { french: "un parc", english: "park" },
      { french: "un garage", english: "garage" },
      { french: "une station", english: "station" }
    ],
    objectsAndThings: [
      { french: "un téléphone", english: "telephone" },
      { french: "une radio", english: "radio" },
      { french: "une carte", english: "card/map" },
      { french: "une table", english: "table" },
      { french: "une minute", english: "minute" },
      { french: "une machine", english: "machine" },
      { french: "un problème", english: "problem" },
      { french: "un programme", english: "program" },
      { french: "une photo", english: "photo" }
    ],
    conceptsAndAbstracts: [
      { french: "une idée", english: "idea" },
      { french: "une situation", english: "situation" },
      { french: "une conversation", english: "conversation" },
      { french: "une information", english: "information" },
      { french: "un accident", english: "accident" },
      { french: "un projet", english: "project" },
      { french: "un moment", english: "moment" },
      { french: "un sujet", english: "subject" },
      { french: "un système", english: "system" }
    ],
    foodAndDrink: [
      { french: "un café", english: "coffee" },
      { french: "un chocolat", english: "chocolate" },
      { french: "un sandwich", english: "sandwich" },
      { french: "une salade", english: "salad" },
      { french: "une banane", english: "banana" },
      { french: "un menu", english: "menu" }
    ]
  };

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

        // Filter for cognates sections and create a map of understood sections
        const understoodSet = new Set();
        data.forEach(item => {
          if (item.concept_term && item.concept_term.startsWith('cognates-')) {
            understoodSet.add(item.concept_index);
          }
        });
        setUnderstoodSections(understoodSet);
        logger.log('CognatesHelp: Loaded understood sections:', understoodSet);
      } catch (error) {
        logger.error('Error loading understood cognates sections:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnderstoodSections();
  }, [moduleId, isAuthenticated, supabaseUser, supabaseClient]);

  const toggleUnderstood = async (sectionIndex) => {
    logger.log('CognatesHelp: toggleUnderstood called', sectionIndex);
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
        const section = cognatesSections[sectionIndex];
        if (!section) {
          logger.error('CognatesHelp: Section not found at index:', sectionIndex);
          return;
        }
        const termName = `cognates-${section.id}`;
        logger.log('CognatesHelp: Saving to Supabase...', { moduleId, sectionIndex, termName, newUnderstood });
        await updateConceptUnderstanding(
          moduleId,
          sectionIndex,
          termName,
          newUnderstood
        );
        logger.log('CognatesHelp: Saved successfully');
      } catch (error) {
        logger.error('CognatesHelp: Error saving:', error);
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
      <div className="cognates-help">
        <div className="cognates-container">
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cognates-help">
      <div className="cognates-container">
        <header className="cognates-header">
          <div className="module-prefix">Module {moduleId}</div>
          <h1>Cognates - French and English Share Many Words</h1>
          <p className="cognates-subtitle">
            You might be surprised to learn that thousands of English words come from French!
            These similar words are called "cognates" and they can give you a huge head start in learning French.
          </p>
          <div className="listen-prompt">
            <span className="speaker-icon">🔊</span>
            <h3>Listen! Hear how similar these words sound</h3>
          </div>
        </header>

        {/* Section 1: What Are Cognates? */}
        <section className="cognates-section">
          <h2>What Are Cognates?</h2>
          <p className="section-intro">
            <strong>Cognates</strong> are words that look and sound similar in two languages because
            they share the same origin. English and French share thousands of cognates because
            French significantly influenced English after the Norman Conquest in 1066.
          </p>

          <div className="insight-box">
            <p>
              <strong>Did you know?</strong> Around 30% of English words come from French or Latin,
              and many of them are almost identical in both languages. This means you already know
              far more French vocabulary than you realize!
            </p>
          </div>

          <div className="key-takeaway">
            <p>
              <strong>This is great news!</strong> These cognates aren't just similar—they're
              <em>almost identical</em>. Once you learn a few pronunciation differences, you'll
              recognize hundreds of French words immediately.
            </p>
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

        {/* Section 2: People and Roles */}
        <section className="cognates-section">
          <h2>People and Roles</h2>
          <p className="section-intro">
            Many words for people and professions are nearly identical:
          </p>

          <div className="cognates-grid">
            {cognatesData.peopleAndRoles.map((item, idx) => (
              <div
                key={idx}
                className="cognate-item"
                onClick={() => speakText(item.french)}
              >
                <div className="cognate-content">
                  <div className="cognate-french">{item.french}</div>
                  <div className="cognate-english">{item.english}</div>
                </div>
                <SpeakButton text={item.french} language="fr-FR" size="small" />
              </div>
            ))}
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

        {/* Section 3: Places and Institutions */}
        <section className="cognates-section">
          <h2>Places and Institutions</h2>
          <p className="section-intro">
            Places you visit every day often have the same names:
          </p>

          <div className="cognates-grid">
            {cognatesData.placesAndInstitutions.map((item, idx) => (
              <div
                key={idx}
                className="cognate-item"
                onClick={() => speakText(item.french)}
              >
                <div className="cognate-content">
                  <div className="cognate-french">{item.french}</div>
                  <div className="cognate-english">{item.english}</div>
                </div>
                <SpeakButton text={item.french} language="fr-FR" size="small" />
              </div>
            ))}
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

        {/* Section 4: Objects and Things */}
        <section className="cognates-section">
          <h2>Objects and Things</h2>
          <p className="section-intro">
            Everyday objects you use often share the same names:
          </p>

          <div className="cognates-grid">
            {cognatesData.objectsAndThings.map((item, idx) => (
              <div
                key={idx}
                className="cognate-item"
                onClick={() => speakText(item.french)}
              >
                <div className="cognate-content">
                  <div className="cognate-french">{item.french}</div>
                  <div className="cognate-english">{item.english}</div>
                </div>
                <SpeakButton text={item.french} language="fr-FR" size="small" />
              </div>
            ))}
          </div>

          <div className="section-footer">
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
        </section>

        {/* Section 5: Concepts and Abstracts */}
        <section className="cognates-section">
          <h2>Concepts and Abstracts</h2>
          <p className="section-intro">
            Abstract ideas and concepts are often the same:
          </p>

          <div className="cognates-grid">
            {cognatesData.conceptsAndAbstracts.map((item, idx) => (
              <div
                key={idx}
                className="cognate-item"
                onClick={() => speakText(item.french)}
              >
                <div className="cognate-content">
                  <div className="cognate-french">{item.french}</div>
                  <div className="cognate-english">{item.english}</div>
                </div>
                <SpeakButton text={item.french} language="fr-FR" size="small" />
              </div>
            ))}
          </div>

          <div className="section-footer">
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
        </section>

        {/* Section 6: Food and Drink */}
        <section className="cognates-section">
          <h2>Food and Drink</h2>
          <p className="section-intro">
            Many food words are identical or very similar:
          </p>

          <div className="cognates-grid">
            {cognatesData.foodAndDrink.map((item, idx) => (
              <div
                key={idx}
                className="cognate-item"
                onClick={() => speakText(item.french)}
              >
                <div className="cognate-content">
                  <div className="cognate-french">{item.french}</div>
                  <div className="cognate-english">{item.english}</div>
                </div>
                <SpeakButton text={item.french} language="fr-FR" size="small" />
              </div>
            ))}
          </div>

          <div className="section-footer">
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
        </section>

        {/* Closing Note */}
        <section className="cognates-section">
          <div className="key-takeaway">
            <p>
              <strong>Remember:</strong> These are just a few examples! There are thousands more
              cognates between English and French. Every time you recognize a cognate, you're
              building your French vocabulary effortlessly. Keep an eye out for these similar words
              as you continue learning!
            </p>
          </div>
        </section>

        <footer className="cognates-footer">
          <button className="btn-continue" onClick={handleComplete}>
            Continue Learning
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CognatesHelp;

