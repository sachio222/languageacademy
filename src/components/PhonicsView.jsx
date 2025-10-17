import { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import SpeakButton from './SpeakButton';
import { frenchPhonics } from '../data/frenchPhonics';
import '../styles/PhonicsView.css';

/**
 * Select the best available voice for a given language
 * Same logic as SpeakButton for consistent quality
 */
function selectBestVoice(voices, language) {
  const langCode = language.split("-")[0];
  const matchingVoices = voices.filter((v) => v.lang.startsWith(langCode));

  if (matchingVoices.length === 0) return null;

  // Priority 1: Google voices (Chrome - usually highest quality)
  const googleVoice = matchingVoices.find((v) => v.name.includes("Google"));
  if (googleVoice) return googleVoice;

  // Priority 2: Safari/macOS enhanced voices (look for specific high-quality French voices)
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

// Normalize text for search (remove diacritics/accents)
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
};

/**
 * PhonicsView Component
 * Full-page layout for French spelling patterns reference
 */
function PhonicsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(
    new Set(frenchPhonics.map((_, idx) => idx)) // Start with all expanded
  );

  const stickyBarRef = useRef(null);
  const viewRef = useRef(null);

  // Dynamically calculate and set category header sticky position
  useEffect(() => {
    const updateStickyPosition = () => {
      if (stickyBarRef.current && viewRef.current) {
        // Get the sticky bar's height
        const stickyBarHeight = stickyBarRef.current.offsetHeight;

        // App header is always 60px, sticky bar sticks at top: 60px
        const appHeaderHeight = 60;

        // Calculate position: app header + sticky bar height - 1px for border overlap
        const categoryHeaderTop = appHeaderHeight + stickyBarHeight - 4;

        // Set CSS custom property
        viewRef.current.style.setProperty('--category-sticky-top', `${categoryHeaderTop}px`);
      }
    };

    // Update on mount (with small delay to ensure DOM is ready)
    setTimeout(updateStickyPosition, 0);

    // Update on resize
    window.addEventListener('resize', updateStickyPosition);

    // Observe sticky bar size changes
    const resizeObserver = new ResizeObserver(updateStickyPosition);
    if (stickyBarRef.current) {
      resizeObserver.observe(stickyBarRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateStickyPosition);
      resizeObserver.disconnect();
    };
  }, [searchQuery]); // Re-calculate when search query changes (affects quick links visibility)

  const toggleCategory = (index) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // Filter phonics data based on search
  const filteredPhonics = useMemo(() => {
    if (!searchQuery.trim()) {
      return frenchPhonics.map((category, idx) => ({ ...category, originalIndex: idx }));
    }

    const query = normalizeText(searchQuery);
    return frenchPhonics.map((category, idx) => {
      const filteredPatterns = category.patterns.filter(pattern => {
        // Search in sound notation
        if (normalizeText(pattern.sound).includes(query)) return true;

        // Search in description
        if (normalizeText(pattern.description).includes(query)) return true;

        // Search in spellings and examples
        return pattern.spellings.some(spelling =>
          normalizeText(spelling.spelling).includes(query) ||
          spelling.examples.some(ex => normalizeText(ex).includes(query)) ||
          (spelling.notes && normalizeText(spelling.notes).includes(query))
        );
      });

      return filteredPatterns.length > 0
        ? { ...category, patterns: filteredPatterns, originalIndex: idx }
        : null;
    }).filter(Boolean);
  }, [searchQuery]);

  const handleSpeak = (text) => {
    if (!text || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    let voices = window.speechSynthesis.getVoices();

    // Handle async voice loading
    if (voices.length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", () => {
        voices = window.speechSynthesis.getVoices();
        const bestVoice = selectBestVoice(voices, utterance.lang);
        if (bestVoice) {
          utterance.voice = bestVoice;
          console.log(`PhonicsView TTS: ${bestVoice.name} (${bestVoice.lang})`);
        }
        window.speechSynthesis.speak(utterance);
      });
    } else {
      const bestVoice = selectBestVoice(voices, utterance.lang);
      if (bestVoice) {
        utterance.voice = bestVoice;
        console.log(`PhonicsView TTS: ${bestVoice.name} (${bestVoice.lang})`);
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="phonics-view" ref={viewRef}>
      {/* Header Section */}
      <div className="phonics-header">
        <h1 className="phonics-title">French Spelling Patterns</h1>
        <p className="phonics-subtitle">
          Learn how French sounds map to different spellings. Click any word to hear it pronounced.
        </p>
      </div>

      {/* Sticky Search & Quick Links */}
      <div className="phonics-sticky-bar" ref={stickyBarRef}>
        <div className="phonics-sticky-container">
          {/* Integrated Search Bar */}
          <div className="phonics-search">
            <Search className="phonics-search-icon" size={20} />
            <input
              type="text"
              className="phonics-search-input"
              placeholder="Search sounds, spellings, or words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="phonics-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Links */}
          {!searchQuery && (
            <div className="phonics-quick-links">
              {frenchPhonics.map((category, idx) => (
                <a
                  key={idx}
                  href={`#category-${idx}`}
                  className="phonics-quick-link"
                  onClick={(e) => {
                    e.preventDefault();

                    // Ensure category is expanded
                    setExpandedCategories(prev => {
                      const next = new Set(prev);
                      next.add(idx);
                      return next;
                    });

                    // Scroll to category
                    setTimeout(() => {
                      const element = document.getElementById(`category-${idx}`);
                      if (element) {
                        element.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }, 50); // Small delay to allow expand animation
                  }}
                >
                  {category.category}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="phonics-content">
        {filteredPhonics.length === 0 ? (
          <div className="phonics-empty">
            <p>No spelling patterns found for "{searchQuery}"</p>
          </div>
        ) : (
          filteredPhonics.map((category) => {
            const originalIdx = category.originalIndex;
            const isExpanded = expandedCategories.has(originalIdx);
            const patternCount = category.patterns.length;

            return (
              <div key={originalIdx} id={`category-${originalIdx}`} className={`phonics-category ${!isExpanded ? 'collapsed' : ''}`}>
                <div className="phonics-category-sticky-wrapper">
                  <div
                    className="phonics-category-header"
                    onClick={() => toggleCategory(originalIdx)}
                  >
                    <span className="phonics-category-icon">{category.icon}</span>
                    <h2 className="phonics-category-title">{category.category}</h2>
                    <span className="phonics-category-count">{patternCount} pattern{patternCount !== 1 ? 's' : ''}</span>
                    <button className="phonics-category-toggle" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="phonics-patterns">
                    {category.patterns.map((pattern, patternIdx) => (
                      <div key={patternIdx} className="phonics-pattern">
                        <div className="phonics-pattern-header">
                          <span className="phonics-sound">{pattern.sound}</span>
                          <span className="phonics-description">{pattern.description}</span>
                        </div>

                        <div className="phonics-spellings-grid">
                          {pattern.spellings.map((spelling, spellingIdx) => (
                            <div key={spellingIdx} className="phonics-spelling-card">
                              <div className="phonics-spelling-label">
                                <span className="phonics-spelling-text">{spelling.spelling}</span>
                                {spelling.notes && (
                                  <span className="phonics-spelling-note">{spelling.notes}</span>
                                )}
                              </div>
                              <div className="phonics-examples-list">
                                {spelling.examples.map((example, exampleIdx) => (
                                  <button
                                    key={exampleIdx}
                                    className="phonics-example-btn"
                                    onClick={() => handleSpeak(example)}
                                    title={`Click to hear "${example}"`}
                                  >
                                    <span className="phonics-example-text">{example}</span>
                                    <SpeakButton
                                      text={example}
                                      language="fr-FR"
                                      size="small"
                                      className="phonics-example-speaker"
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default PhonicsView;

