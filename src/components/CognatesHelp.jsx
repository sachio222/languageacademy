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

/**
 * Determine gender from French text (checks for articles)
 * @param {string} frenchText - The French text (e.g., "un acteur", "une actrice")
 * @returns {string|null} - "feminine", "masculine", or null if cannot determine
 */
function getGenderFromFrench(frenchText) {
  if (!frenchText) return null;

  const textLower = frenchText.toLowerCase().trim();

  // Check for feminine indefinite article
  if (textLower.startsWith("une ")) {
    return "feminine";
  }

  // Check for masculine indefinite article
  if (textLower.startsWith("un ")) {
    return "masculine";
  }

  // Check for feminine definite article
  if (textLower.startsWith("la ")) {
    return "feminine";
  }

  // Check for masculine definite articles
  if (textLower.startsWith("le ") || textLower.startsWith("les ")) {
    return "masculine";
  }

  // Check for l' (can be either gender, check specific words)
  if (textLower.startsWith("l'")) {
    // Common feminine words with l'
    const feminineLWords = ["l'eau", "l'école", "l'université", "l'église", "l'île", "l'heure", "l'idée"];
    if (feminineLWords.some(word => textLower.startsWith(word))) {
      return "feminine";
    }
    // Common masculine words with l'
    const masculineLWords = ["l'hôtel", "l'hôpital", "l'ami", "l'étudiant", "l'artiste", "l'acteur"];
    if (masculineLWords.some(word => textLower.startsWith(word))) {
      return "masculine";
    }
    // Default to masculine for l' if not in our lists
    return "masculine";
  }

  // Plural articles don't indicate gender
  if (textLower.startsWith("des ")) {
    return null;
  }

  return null;
}

const CognatesHelp = ({ onComplete, moduleId, lesson, onModuleComplete }) => {
  const [understoodSections, setUnderstoodSections] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const supabaseProgress = useSupabaseProgress();
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = supabaseProgress || {};

  // Define the cognates sections that can be marked as understood
  const cognatesSections = [
    { id: 'what-are-cognates', title: 'What Are Cognates?', index: 0 },
    { id: 'exactly-the-same', title: 'Exactly the Same', index: 1 },
    { id: 'almost-identical', title: 'Almost Identical', index: 2 },
    { id: 'very-similar', title: 'Very Similar', index: 3 }
  ];

  // Cognates organized by similarity level - SIMPLE AND DIRECT
  const cognatesBySimilarity = {
    exact: [
      { french: "un restaurant", english: "restaurant" },
      { french: "un garage", english: "garage" },
      { french: "une station", english: "station" },
      { french: "une radio", english: "radio" },
      { french: "une table", english: "table" },
      { french: "une minute", english: "minute" },
      { french: "une machine", english: "machine" },
      { french: "une photo", english: "photo" },
      { french: "un menu", english: "menu" },
      { french: "un buffet", english: "buffet" },
      { french: "un ballet", english: "ballet" },
      { french: "une situation", english: "situation" },
      { french: "une conversation", english: "conversation" },
      { french: "une information", english: "information" },
      { french: "un accident", english: "accident" },
      { french: "un moment", english: "moment" },
      { french: "un sandwich", english: "sandwich" },
      { french: "un client", english: "client" },
    ],
    almost: [
      { french: "un café", english: "café" },
      { french: "un hôtel", english: "hotel" },
      { french: "un cinéma", english: "cinema" },
      { french: "un téléphone", english: "telephone" },
      { french: "un parc", english: "park" },
      { french: "un programme", english: "program" },
      { french: "un problème", english: "problem" },
      { french: "un système", english: "system" },
      { french: "un touriste", english: "tourist" },
      { french: "un artiste", english: "artist" },
      { french: "une salade", english: "salad" },
      { french: "une banane", english: "banana" },
      { french: "un chocolat", english: "chocolate" },
    ],
    similar: [

      { french: "une banque", english: "bank" },
      { french: "une carte", english: "card/map" },
      { french: "un docteur", english: "doctor" },
      { french: "un professeur", english: "professor" },
      { french: "un acteur", english: "actor" },
      { french: "une actrice", english: "actress" },
      { french: "un hôpital", english: "hospital" },
      { french: "un musée", english: "museum" },
      { french: "un projet", english: "project" },
      { french: "un sujet", english: "subject" },
      { french: "une idée", english: "idea" },
    ],
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
              <strong>Did you know?</strong> Over 30% of English words come from French or Latin,
              and many of them are almost identical in both languages. This means you already know
              far more French vocabulary than you realize! Here are a few to kick start your vocabulary.
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



        {/* Section 2: Exactly the Same */}
        <section className="cognates-section">
          <h2>Exactly the Same</h2>
          <p className="section-intro">
            These words look <strong>identical</strong> in both languages! Just listen to how different they sound:
          </p>

          <div className="listen-prompt">
            <span className="speaker-icon">🔊</span>
            <h3>Listen! They may look similar, but they sound... oh, la la!</h3>
          </div>

          <div className="cognates-grid">
            {cognatesBySimilarity.exact.map((item, idx) => (
              <div
                key={idx}
                className="cognate-item"
                onClick={() => speakText(item.french)}
              >
                <div className="cognate-content">
                  <div className={`cognate-french ${(() => {
                    const gender = getGenderFromFrench(item.french);
                    return gender === 'feminine' ? 'feminine' : gender === 'masculine' ? 'masculine' : '';
                  })()}`}>{item.french}</div>
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

        {/* Section 3: Almost Identical */}
        <section className="cognates-section">
          <h2>Almost Identical</h2>
          <p className="section-intro">
            These words are almost the same, with just minor spelling differences (like accents):
          </p>

          <div className="cognates-grid">
            {cognatesBySimilarity.almost.map((item, idx) => (
              <div
                key={idx}
                className="cognate-item"
                onClick={() => speakText(item.french)}
              >
                <div className="cognate-content">
                  <div className={`cognate-french ${(() => {
                    const gender = getGenderFromFrench(item.french);
                    return gender === 'feminine' ? 'feminine' : gender === 'masculine' ? 'masculine' : '';
                  })()}`}>{item.french}</div>
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

        {/* Section 4: Very Similar */}
        <section className="cognates-section">
          <h2>Very Similar</h2>
          <p className="section-intro">
            These words share the same root and meaning, with clear patterns you can learn:
          </p>

          <div className="cognates-grid">
            {cognatesBySimilarity.similar.map((item, idx) => (
              <div
                key={idx}
                className="cognate-item"
                onClick={() => speakText(item.french)}
              >
                <div className="cognate-content">
                  <div className={`cognate-french ${(() => {
                    const gender = getGenderFromFrench(item.french);
                    return gender === 'feminine' ? 'feminine' : gender === 'masculine' ? 'masculine' : '';
                  })()}`}>{item.french}</div>
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

        {/* Closing Note */}
        <section className="cognates-section">
          <div className="insight-box">
            <p>
              <strong>Remember:</strong> Each noun has a gender, so you should remember them along with their gendered articles (un, une, le, la, les).
              It's very awkward to skip it like in English, for example: "I want coffee".
              <br></br><br></br>
              Instead, you must say, "I want <strong>a</strong> coffee", or "I want <strong>some</strong> coffee",
              and the articles you use must be gendered: Je veux <strong>un</strong> café, or Je veux <strong>du</strong> café.

            </p>

          </div>
        </section>
        <section className="cognates-section">
          <div className="key-takeaway">
            <p>There are thousands of cognates between English and French. Every time you recognize a cognate, you're
              building your French vocabulary effortlessly!</p>
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

