import { useState, Fragment } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { getTTSText, selectBestVoice } from '../utils/ttsUtils';
import { renderGenderSplitText, getGenderClass, hasGenderSplit } from '../utils/genderSplitUtils.jsx';
import { isNewVocabSection, createVocabRowClickHandler } from '../utils/vocabularyUtils';
import { logger } from "../utils/logger";

/**
 * Vocabulary Reference - Always-visible cheat sheet
 * Shows all vocabulary for current lesson
 */
function VocabularyReference({ vocabulary, title }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!vocabulary || vocabulary.length === 0) {
    return null;
  }

  return (
    <div className="vocab-reference">
      <div
        className="vocab-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4>📖 {title || 'Vocabulary Reference'}</h4>
        <button className="toggle-btn">
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {isExpanded && (
        <div className="vocab-table">
          <table>
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {vocabulary.map((item, idx) => {
                const isSplitWord = hasGenderSplit(item.french, item.note);
                const genderClass = getGenderClass(item.note, isSplitWord);
                const needsDivider = isNewVocabSection(item, idx);

                // Create handler outside of JSX for better performance
                const handleRowClick = createVocabRowClickHandler(
                  item.french,
                  item.ttsText,
                  getTTSText,
                  selectBestVoice,
                  logger
                );

                return (
                  <Fragment key={`vocab-${idx}`}>
                    {needsDivider && (
                      <tr className="vocab-divider">
                        <td colSpan={3}>
                          <div className="vocab-section-break"></div>
                        </td>
                      </tr>
                    )}
                    <tr
                      onClick={handleRowClick}
                      className="vocab-row-clickable"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleRowClick(e);
                        }
                      }}
                    >
                      <td className={`vocab-french ${genderClass}`}>
                        <div className="vocab-with-audio">
                          {renderGenderSplitText(item.french, item.note)}
                          <SpeakButton text={item.french} ttsText={item.ttsText} language="fr-FR" size="small" />
                        </div>
                      </td>
                      <td className="vocab-english">{item.english}</td>
                      <td className="vocab-note">{item.note || '—'}</td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VocabularyReference;

