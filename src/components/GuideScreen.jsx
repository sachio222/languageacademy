import { Fragment, useState, useEffect, useCallback } from 'react';
import UnderstoodButton from './UnderstoodButton';
import SpeakButton from './SpeakButton';
import IncompleteWarning from './IncompleteWarning';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { useHelpModuleCompletion } from '../hooks/useHelpModuleCompletion';
import { extractModuleId } from '../utils/progressSync';
import { splitTitle } from '../utils/moduleUtils';
import { logger } from '../utils/logger';
import './GuideScreen.css';

// Progress rows for a guide's cards are stored in concept_understanding under this term prefix.
const TERM_PREFIX = 'guide-';

// English text with French in curly quotes (“ne … pas”): the French is shown without the quotes, styled and tagged
// as French so a screen reader and the browser read it in French.
function Mixed({ text }) {
  if (!text) return null;
  const parts = String(text).split(/“([^”]+)”/);
  return parts.map((part, i) => (i % 2 === 1
    ? <span key={i} className="guide-fr" lang="fr">{part}</span>
    : <Fragment key={i}>{part}</Fragment>));
}

function FrenchLine({ french, english, note, size = 'small' }) {
  return (
    <li className="guide-line">
      <div className="guide-line-text">
        <span className="guide-line-french" lang="fr">{french}</span>
        <span className="guide-line-english">{english}</span>
        {note && <span className="guide-line-note"><Mixed text={note} /></span>}
      </div>
      <SpeakButton text={french} language="fr-FR" size={size} ariaLabel={`Listen: ${french}`} />
    </li>
  );
}

const toggleSetItem = (set, item, shouldAdd) => {
  const next = new Set(set);
  if (shouldAdd) next.add(item);
  else next.delete(item);
  return next;
};

/**
 * GuideScreen - renders a help module from its `guide` data:
 * { sections: [{ heading, rule, rows: [{ french, english, note? }], examples: [{ french, english }] }] }
 * Each section is a card the learner marks as understood; the module completes once every card is.
 */
const GuideScreen = ({ module, onComplete }) => {
  const sections = module?.guide?.sections ?? [];
  const moduleKey = extractModuleId(module);
  const [understood, setUnderstood] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const supabaseProgress = useSupabaseProgress();
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = supabaseProgress || {};

  useEffect(() => {
    const load = async () => {
      if (!isAuthenticated || !supabaseUser || !supabaseClient) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabaseClient
          .from('concept_understanding')
          .select('concept_index, concept_term')
          .eq('user_id', supabaseUser.id)
          .eq('module_key', moduleKey);
        if (error) throw error;
        setUnderstood(new Set((data ?? [])
          .filter((row) => row.concept_term?.startsWith(TERM_PREFIX))
          .map((row) => row.concept_index)));
      } catch (error) {
        logger.error('GuideScreen: error loading understood cards:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [moduleKey, isAuthenticated, supabaseUser, supabaseClient]);

  const { showIncompleteWarning, warningKey, getWarningMessage, handleComplete, isComplete } = useHelpModuleCompletion(
    moduleKey,
    understood,
    sections.length,
    isAuthenticated
  );

  const toggleUnderstood = useCallback(async (index) => {
    const was = understood.has(index);
    setUnderstood((prev) => toggleSetItem(prev, index, !was));
    if (!isAuthenticated || !updateConceptUnderstanding) return;
    try {
      await updateConceptUnderstanding(moduleKey, index, `${TERM_PREFIX}${index}`, !was);
    } catch (error) {
      logger.error('GuideScreen: error saving understood card:', error);
      setUnderstood((prev) => toggleSetItem(prev, index, was));
    }
  }, [understood, isAuthenticated, updateConceptUnderstanding, moduleKey]);

  if (loading) {
    return (
      <div className="guide-screen">
        <div className="guide-container">
          <p className="guide-loading">Loading...</p>
        </div>
      </div>
    );
  }

  const { mainTitle } = splitTitle(module.title ?? '');
  const done = understood.size;
  const total = sections.length;

  return (
    <div className="guide-screen">
      <div className="guide-container">
        <header className="guide-header">
          <div className="guide-kicker">Module {module.id} · Guide</div>
          <h1>{mainTitle}</h1>
          {module.description && <p className="guide-intro">{module.description}</p>}
        </header>

        {sections.map((section, i) => (
          <section className="guide-card" key={i} aria-labelledby={`guide-heading-${i}`}>
            <div className="guide-card-head">
              <h2 id={`guide-heading-${i}`}><Mixed text={section.heading} /></h2>
              {section.rule && <p className="guide-rule"><Mixed text={section.rule} /></p>}
            </div>

            {section.rows?.length > 0 && (
              <ul className="guide-rows">
                {section.rows.map((row, j) => <FrenchLine key={j} {...row} />)}
              </ul>
            )}

            {section.examples?.length > 0 && (
              <div className="guide-examples">
                <h3>Examples</h3>
                <ul>
                  {section.examples.map((ex, j) => <FrenchLine key={j} {...ex} />)}
                </ul>
              </div>
            )}

            <div className="guide-card-foot">
              <UnderstoodButton isUnderstood={understood.has(i)} onClick={() => toggleUnderstood(i)} />
            </div>
          </section>
        ))}

        <IncompleteWarning key={warningKey} show={showIncompleteWarning} message={getWarningMessage()} />

        <div className={`guide-focal ${isComplete ? 'is-done' : ''}`}>
          <div className="guide-focal-text">
            {isComplete && <span className="guide-focal-badge">Done</span>}
            <p className="guide-focal-title">
              {isComplete ? 'All cards understood' : `${done} of ${total} cards understood`}
            </p>
            <p className="guide-focal-sub">This guide stays open. Come back to it any time.</p>
          </div>
          <button
            type="button"
            className="guide-focal-button"
            onClick={() => handleComplete(() => onComplete?.())}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideScreen;
