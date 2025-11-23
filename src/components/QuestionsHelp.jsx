import { useState, useEffect } from 'react';
import UnderstoodButton from './UnderstoodButton';
import SpeakButton from './SpeakButton';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { useSpeech } from '../hooks/useSpeech';
import './QuestionsHelp.css';
import { logger } from "../utils/logger";

const QuestionsHelp = ({ onComplete, moduleId, lesson, onModuleComplete }) => {
  const [understoodSections, setUnderstoodSections] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const supabaseProgress = useSupabaseProgress();
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = supabaseProgress || {};
  const { speak } = useSpeech();

  // Define the question sections that can be marked as understood
  const questionSections = [
    { id: 'three-methods', title: 'Three Ways to Ask Questions', index: 0 },
    { id: 'method-1-est-ce-que', title: 'Method 1: Est-ce que (Easiest)', index: 1 },
    { id: 'method-2-intonation', title: 'Method 2: Rising Intonation', index: 2 },
    { id: 'method-3-inversion', title: 'Method 3: Inversion (Formal)', index: 3 },
    { id: 'when-to-use', title: 'When to Use Each Method', index: 4 }
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

        // Filter for question sections and create a map of understood sections
        const understoodSet = new Set();
        data.forEach(item => {
          if (item.concept_term && item.concept_term.startsWith('questions-help-')) {
            understoodSet.add(item.concept_index);
          }
        });
        setUnderstoodSections(understoodSet);
        logger.log('QuestionsHelp: Loaded understood sections:', understoodSet);
      } catch (error) {
        logger.error('Error loading understood question sections:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnderstoodSections();
  }, [moduleId, isAuthenticated, supabaseUser, supabaseClient]);

  const toggleUnderstood = useCallback(async (sectionIndex) => {
    logger.log('QuestionsHelp: toggleUnderstood called', sectionIndex);
    const isCurrentlyUnderstood = understoodSections.has(sectionIndex);
    const newUnderstood = !isCurrentlyUnderstood;

    // Optimistic update
    setUnderstoodSections(prev => toggleSetItem(prev, sectionIndex, newUnderstood));

    // Sync with Supabase if authenticated
    if (isAuthenticated && moduleId && updateConceptUnderstanding) {
      try {
        const section = questionSections[sectionIndex];
        if (!section) {
          logger.error('QuestionsHelp: Section not found at index:', sectionIndex);
          return;
        }
        const termName = `questions-help-${section.id}`;
        logger.log('QuestionsHelp: Saving to Supabase...', { moduleId, sectionIndex, termName, newUnderstood });
        await updateConceptUnderstanding(
          moduleId,
          sectionIndex,
          termName,
          newUnderstood
        );
        logger.log('QuestionsHelp: Saved successfully');
      } catch (error) {
        logger.error('QuestionsHelp: Error saving:', error);
        // Revert optimistic update on error
        setUnderstoodSections(prev => toggleSetItem(prev, sectionIndex, isCurrentlyUnderstood));
      }
    }
  }, [understoodSections, isAuthenticated, moduleId, updateConceptUnderstanding, questionSections]);

  if (loading) {
    return (
      <div className="questions-help">
        <div className="questions-container">
          <div className="help-loading">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="questions-help">
      <div className="questions-container">
        <header className="questions-header">
          <div className="module-prefix">Module {moduleId}</div>
          <h1>The Power to Ask Anything</h1>
          <p className="questions-subtitle">
            Any statement can be turned into a question using these three methods.
          </p>
        </header>

        {/* Section 1: The Three Methods */}
        <section className="questions-section">
          <h2>Three Methods, Infinite Questions</h2>
          <p className="section-intro">
            Every question in French uses one of these three approaches. Master them, and you can ask about anything:
          </p>

          <div className="methods-grid">
            <div className="method-overview-card beginner">
              <div className="method-number">1</div>
              <h3>Est-ce que</h3>
              <p className="method-description">The beginner's best friend</p>
              <p className="method-usage">Perfect for everything</p>
            </div>
            <div className="method-overview-card casual">
              <div className="method-number">2</div>
              <h3>Rising Tone</h3>
              <p className="method-description">Casual & conversational</p>
              <p className="method-usage">Friends & family</p>
            </div>
            <div className="method-overview-card formal">
              <div className="method-number">3</div>
              <h3>Inversion</h3>
              <p className="method-description">Elegant & formal</p>
              <p className="method-usage">Writing & formal speech</p>
            </div>
          </div>

          <div className="key-insight">
            <p>
              <strong>Start with est-ce que.</strong> It works for every single question and requires zero grammar changes.
              Once you're comfortable, the other methods will feel natural.
            </p>
          </div>

          <div className="section-footer">
            <UnderstoodButton
              isUnderstood={understoodSections.has(0)}
              onClick={() => toggleUnderstood(0)}
            />
          </div>
        </section>

        {/* Section 2: Est-ce que - Your Question Superpower */}
        <section className="questions-section">
          <h2>Est-ce que - The question maker</h2>
          <p className="section-intro">
            This is the <strong>universal question maker</strong>. Literally translates to "is it that?" or "is it the case that?" in English. Add "est-ce que" to any statement, and boom - it's a question.
          </p>

          <div className="transformation-demo">
            <div className="transform-step">
              <div className="step-label">Any Statement</div>
              <div className="french-container clickable" onClick={() => speak("Tu as un chat", 'fr-FR')}>
                <div className="french-text statement">Tu as un chat</div>
                <SpeakButton text="Tu as un chat" language="fr-FR" size="small" />
              </div>
              <div className="english-text">You have a cat</div>
            </div>
            <div className="transform-arrow">+</div>
            <div className="transform-step magic">
              <div className="step-label">Magic Words</div>
              <div className="french-container clickable" onClick={() => speak("Est-ce que", 'fr-FR')}>
                <div className="french-text magic-words">Est-ce que</div>
                <SpeakButton text="Est-ce que" language="fr-FR" size="small" />
              </div>
              <div className="english-text">Question maker</div>
            </div>
            <div className="transform-arrow">=</div>
            <div className="transform-step">
              <div className="step-label">Instant Question</div>
              <div className="french-container clickable" onClick={() => speak("Est-ce que tu as un chat?", 'fr-FR')}>
                <div className="french-text question">Est-ce que tu as un chat?</div>
                <SpeakButton text="Est-ce que tu as un chat?" language="fr-FR" size="small" />
              </div>
              <div className="english-text">Do you have a cat?</div>
            </div>
          </div>

          <div className="power-examples">
            <h4>With Question Words</h4>
            <div className="example-pair">
              <div className="example-item clickable" onClick={() => speak("Où est-ce que tu es?", 'fr-FR')}>
                <div className="french-text">Où est-ce que tu es?</div>
                <div className="english-text">Where are you?</div>
                <SpeakButton text="Où est-ce que tu es?" language="fr-FR" size="small" />
              </div>
              <div className="example-item clickable" onClick={() => speak("Quand est-ce que tu viens?", 'fr-FR')}>
                <div className="french-text">Quand est-ce que tu viens?</div>
                <div className="english-text">When are you coming?</div>
                <SpeakButton text="Quand est-ce que tu viens?" language="fr-FR" size="small" />
              </div>
            </div>
          </div>

          <div className="section-footer">
            <UnderstoodButton
              isUnderstood={understoodSections.has(1)}
              onClick={() => toggleUnderstood(1)}
            />
          </div>
        </section>

        {/* Section 3: Rising Intonation - The Casual Way */}
        <section className="questions-section">
          <h2>Rising Intonation: The Casual Way</h2>
          <p className="section-intro">
            In everyday conversation, French speakers often skip the grammar and just <strong>raise their voice at the end</strong>.
          </p>

          <div className="intonation-demo">
            <div className="intonation-example">
              <div className="statement-version clickable" onClick={() => speak("Tu viens ce soir", 'fr-FR')}>
                <div className="intonation-content">
                  <div className="french-text">Tu viens ce soir</div>
                  <div className="tone-indicator flat">→</div>
                  <div className="english-text">You're coming tonight</div>
                </div>
                <SpeakButton text="Tu viens ce soir" language="fr-FR" size="small" />
              </div>
              <div className="question-version clickable" onClick={() => speak("Tu viens ce soir?", 'fr-FR')}>
                <div className="intonation-content">
                  <div className="french-text">Tu viens ce soir?</div>
                  <div className="tone-indicator rising">↗</div>
                  <div className="english-text">Are you coming tonight?</div>
                </div>
                <SpeakButton text="Tu viens ce soir?" language="fr-FR" size="small" />
              </div>
            </div>
          </div>

          <div className="casual-note">
            <p>
              This is how friends talk to each other. Same words, different tone.
              The rising intonation <span className="tone-symbol">↗</span> does all the work.
            </p>
          </div>

          <div className="section-footer">
            <UnderstoodButton
              isUnderstood={understoodSections.has(2)}
              onClick={() => toggleUnderstood(2)}
            />
          </div>
        </section>

        {/* Section 4: Inversion - The Elegant Way */}
        <section className="questions-section">
          <h2>Inversion: The Elegant Way</h2>
          <p className="section-intro">
            For formal situations, French flips the verb and subject with a hyphen.
            It is quite easy to do and is considered more sophisticated and is common in writing. Here is an example of how to do it:
          </p>

          <div className="inversion-demo">
            <div className="flip-example">
              <div className="before clickable" onClick={() => speak("Tu es prêt", 'fr-FR')}>
                <div className="french-text">Tu es prêt</div>
                <div className="parts">
                  <span className="subject">Tu</span>
                  <span className="verb">es</span>
                  <span className="rest">prêt</span>
                </div>
                <SpeakButton text="Tu es prêt" language="fr-FR" size="small" />
              </div>
              <div className="flip-arrow">flip</div>
              <div className="after clickable" onClick={() => speak("Es-tu prêt?", 'fr-FR')}>
                <div className="french-text">Es-tu prêt?</div>
                <div className="parts">
                  <span className="verb">Es</span>
                  <span className="hyphen">-</span>
                  <span className="subject">tu</span>
                  <span className="rest">prêt?</span>
                </div>
                <SpeakButton text="Es-tu prêt?" language="fr-FR" size="small" />
              </div>
            </div>
          </div>

          <div className="elegance-note">
            <p>
              This is the method you'll see in literature, formal emails, and academic writing.
              It adds a touch of sophistication to your French.
            </p>
          </div>

          <div className="section-footer">
            <UnderstoodButton
              isUnderstood={understoodSections.has(3)}
              onClick={() => toggleUnderstood(3)}
            />
          </div>
        </section>

        {/* Section 5: Choose Your Style */}
        <section className="questions-section">
          <h2>Choose Your Style</h2>

          <div className="style-guide">
            <div className="style-card recommended">
              <div className="style-header">
                <h4>Est-ce que</h4>
                <div className="recommendation">Recommended</div>
              </div>
              <p>Use everywhere. Safe, clear, and always correct.</p>
              <div className="use-when">Perfect for beginners and all situations</div>
            </div>

            <div className="style-card casual">
              <div className="style-header">
                <h4>Rising Intonation</h4>
                <div className="context">Casual</div>
              </div>
              <p>Natural in conversation with friends and family.</p>
              <div className="use-when">When you want to sound relaxed</div>
            </div>

            <div className="style-card formal">
              <div className="style-header">
                <h4>Inversion</h4>
                <div className="context">Formal</div>
              </div>
              <p>Elegant for writing and formal speech.</p>
              <div className="use-when">When you want to sound sophisticated</div>
            </div>
          </div>

          <div className="final-wisdom">
            <p>
              <strong>Your journey:</strong> Start with est-ce que for everything.
              As you hear more French, you'll naturally start using the other methods when they feel right.
            </p>
          </div>

          <div className="section-footer">
            <UnderstoodButton
              isUnderstood={understoodSections.has(4)}
              onClick={() => toggleUnderstood(4)}
            />
          </div>
        </section>

        <div className="questions-footer">
          <button
            className="btn-continue"
            onClick={() => {
              if (onModuleComplete) {
                onModuleComplete(lesson.moduleKey);
              }
              onComplete();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsHelp;

