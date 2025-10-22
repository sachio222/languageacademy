import { readingVocabulary as wordTranslations } from "../../components/readingVocabulary";
import { wikipediaEntries } from "../../data/wikipediaEntries";
import { getTTSText } from "../ttsUtils";
import { convertYearToFrench } from "./numberTTSUtilsFr";
import { multiWordPhrases } from "../../components/readingVocabularyPhrases";

// Make words interactive - use paragraph index for truly unique keys
export const renderInteractiveText = (
  text,
  paragraphIndex,
  wordRefs,
  setHoveredWord,
  hoveredWord,
  tooltipPosition,
  speak
) => {
  // Check if line has speaker label
  const speakerMatch = text.match(/^\*\*([^:]+):\*\*/);

  if (speakerMatch) {
    const speaker = speakerMatch[1];
    const dialogue = text.replace(/^\*\*[^:]+:\*\*\s*/, "");

    return (
      <>
        <strong className="speaker-label">{speaker}:</strong>{" "}
        {renderWords(
          dialogue,
          paragraphIndex,
          wordRefs,
          setHoveredWord,
          hoveredWord,
          tooltipPosition,
          speak
        )}
      </>
    );
  }

  return renderWords(
    text,
    paragraphIndex,
    wordRefs,
    setHoveredWord,
    hoveredWord,
    tooltipPosition,
    speak
  );
};

export const renderWords = (
  text,
  paragraphIndex,
  wordRefs,
  setHoveredWord,
  hoveredWord,
  tooltipPosition,
  speak
) => {
  let remainingText = text;
  const elements = [];
  let charPosition = 0;

  while (remainingText.length > 0) {
    let matched = false;

    // Check for italic formatting first
    const italicMatch = remainingText.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      const italicText = italicMatch[1];
      const uniqueKey = `p${paragraphIndex}-c${charPosition}-italic`;

      // Render the italic text as interactive words
      elements.push(
        <em key={uniqueKey}>
          {renderWords(
            italicText,
            paragraphIndex,
            wordRefs,
            setHoveredWord,
            hoveredWord,
            tooltipPosition,
            speak
          )}
        </em>
      );

      remainingText = remainingText.slice(italicMatch[0].length);
      charPosition += italicMatch[0].length;
      continue;
    }

    // Check for multi-word phrases
    for (const { phrase, translation } of multiWordPhrases) {
      if (remainingText.toLowerCase().startsWith(phrase.toLowerCase())) {
        const matchedText = remainingText.slice(0, phrase.length);
        const uniqueKey = `p${paragraphIndex}-c${charPosition}`;
        const wikiEntry =
          wikipediaEntries[matchedText] ||
          wikipediaEntries[matchedText.toLowerCase()];

        elements.push(
          <span
            key={uniqueKey}
            ref={(el) => {
              if (el) wordRefs.current[uniqueKey] = el;
            }}
            className="interactive-word"
            onMouseEnter={() => setHoveredWord(uniqueKey)}
            onMouseLeave={() => setHoveredWord(null)}
            onClick={() => speak(getTTSText(matchedText), "fr-FR")}
            style={{ cursor: "pointer" }}
          >
            {matchedText}
            {hoveredWord === uniqueKey && wikiEntry && (
              <span
                className="word-tooltip wiki-tooltip"
                style={{
                  "--tooltip-shift": `${tooltipPosition.shift}px`,
                  "--arrow-shift": `${tooltipPosition.arrowShift}px`,
                  visibility: tooltipPosition.isVisible ? "visible" : "hidden",
                }}
              >
                <span className="wiki-content">
                  <img
                    src={wikiEntry.image}
                    alt={wikiEntry.name}
                    className="wiki-image"
                  />
                  <span className="wiki-text">
                    <strong>{wikiEntry.name}</strong>
                    <span>{wikiEntry.description}</span>
                    <a
                      href={wikiEntry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wiki-link"
                    >
                      📖 Wikipedia
                    </a>
                  </span>
                </span>
              </span>
            )}
            {hoveredWord === uniqueKey && !wikiEntry && (
              <span className="word-tooltip">{translation}</span>
            )}
          </span>
        );
        remainingText = remainingText.slice(phrase.length);
        charPosition += phrase.length;
        matched = true;
        break;
      }
    }

    if (matched) continue;

    // Check for years (4-digit numbers) - make them clickable for French pronunciation
    const yearMatch = remainingText.match(/^(18\d{2}|19\d{2}|20\d{2})/);
    if (yearMatch) {
      const year = yearMatch[1];
      const uniqueKey = `p${paragraphIndex}-c${charPosition}`;

      // Convert year to French words for TTS
      const yearInFrench = convertYearToFrench(year);

      elements.push(
        <span
          key={uniqueKey}
          ref={(el) => {
            if (el) wordRefs.current[uniqueKey] = el;
          }}
          className="interactive-word"
          onMouseEnter={() => setHoveredWord(uniqueKey)}
          onMouseLeave={() => setHoveredWord(null)}
          onClick={() => speak(yearInFrench, "fr-FR")}
          style={{ cursor: "pointer" }}
        >
          {year}
          {hoveredWord === uniqueKey && (
            <span
              className="word-tooltip"
              style={{
                "--tooltip-shift": `${tooltipPosition.shift}px`,
                "--arrow-shift": `${tooltipPosition.arrowShift}px`,
                visibility: tooltipPosition.isVisible ? "visible" : "hidden",
              }}
            >
              {yearInFrench}
            </span>
          )}
        </span>
      );

      remainingText = remainingText.slice(year.length);
      charPosition += year.length;
      continue;
    }

    // Check for single words (including accented characters)
    const wordMatch = remainingText.match(/^([a-zàâäæçéèêëïîôùûüœ']+)/i);
    if (wordMatch) {
      const word = wordMatch[1];
      const cleanWord = word.toLowerCase();
      const translation = wordTranslations[word] || wordTranslations[cleanWord];
      const uniqueKey = `p${paragraphIndex}-c${charPosition}`;

      if (translation) {
        const wikiEntry = wikipediaEntries[word] || wikipediaEntries[cleanWord];

        elements.push(
          <span
            key={uniqueKey}
            ref={(el) => {
              if (el) wordRefs.current[uniqueKey] = el;
            }}
            className="interactive-word"
            onMouseEnter={() => setHoveredWord(uniqueKey)}
            onMouseLeave={() => setHoveredWord(null)}
            onClick={() => speak(getTTSText(word), "fr-FR")}
            style={{ cursor: "pointer" }}
          >
            {word}
            {hoveredWord === uniqueKey && wikiEntry && (
              <span
                className="word-tooltip wiki-tooltip"
                style={{
                  "--tooltip-shift": `${tooltipPosition.shift}px`,
                  "--arrow-shift": `${tooltipPosition.arrowShift}px`,
                  visibility: tooltipPosition.isVisible ? "visible" : "hidden",
                }}
              >
                <span className="wiki-content">
                  <img
                    src={wikiEntry.image}
                    alt={wikiEntry.name}
                    className="wiki-image"
                  />
                  <span className="wiki-text">
                    <strong>{wikiEntry.name}</strong>
                    <span>{wikiEntry.description}</span>
                    <a
                      href={wikiEntry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wiki-link"
                    >
                      📖 Wikipedia
                    </a>
                  </span>
                </span>
              </span>
            )}
            {hoveredWord === uniqueKey && !wikiEntry && (
              <span className="word-tooltip">{translation}</span>
            )}
          </span>
        );
      } else {
        // Log missing words for debugging
        console.warn(`Missing translation for: "${word}"`);
        elements.push(
          <span
            key={uniqueKey}
            className="missing-translation"
            title={`Translation missing for: ${word}`}
          >
            {word}
          </span>
        );
      }

      remainingText = remainingText.slice(word.length);
      charPosition += word.length;
      continue;
    }

    // Match spaces and punctuation
    const otherMatch = remainingText.match(/^(\s+|[.!?,;:])/);
    if (otherMatch) {
      elements.push(
        <span key={`p${paragraphIndex}-c${charPosition}`}>{otherMatch[1]}</span>
      );
      remainingText = remainingText.slice(otherMatch[1].length);
      charPosition += otherMatch[1].length;
      continue;
    }

    // Fallback
    const char = remainingText[0];
    elements.push(
      <span key={`p${paragraphIndex}-c${charPosition}`}>{char}</span>
    );
    remainingText = remainingText.slice(1);
    charPosition++;
  }

  return elements;
};
