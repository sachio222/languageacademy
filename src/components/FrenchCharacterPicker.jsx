/**
 * French Character Picker Component
 * Provides clickable special French characters for users without French keyboards
 */
import '../styles/FrenchCharacterPicker.css';

const FRENCH_CHARACTERS = [
  { char: 'à', label: 'à' },
  { char: 'â', label: 'â' },
  { char: 'æ', label: 'æ' },
  { char: 'ç', label: 'ç' },
  { char: 'é', label: 'é' },
  { char: 'è', label: 'è' },
  { char: 'ê', label: 'ê' },
  { char: 'ë', label: 'ë' },
  { char: 'î', label: 'î' },
  { char: 'ï', label: 'ï' },
  { char: 'ô', label: 'ô' },
  { char: 'œ', label: 'œ' },
  { char: 'ù', label: 'ù' },
  { char: 'û', label: 'û' },
  { char: 'ü', label: 'ü' },
  { char: 'ÿ', label: 'ÿ' },
];

function FrenchCharacterPicker({ onCharacterClick, onCharacterSelect, inputRef }) {
  /**
   * Insert character at cursor position in input/textarea
   */
  const handleCharacterClick = (char) => {
    // New API - just call the callback
    if (onCharacterSelect) {
      onCharacterSelect(char);
      return;
    }

    // Old API - for backward compatibility
    if (!inputRef?.current) return;

    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const currentValue = input.value;

    // Insert character at cursor position
    const newValue = currentValue.substring(0, start) + char + currentValue.substring(end);

    // Update the input value
    if (onCharacterClick) {
      onCharacterClick(newValue);
    }

    // Set cursor position after inserted character
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  return (
    <div className="french-character-picker">
      <div className="character-picker-label">Special French characters:</div>
      <div className="character-buttons">
        {FRENCH_CHARACTERS.map(({ char, label }) => (
          <button
            key={char}
            type="button"
            className="character-btn"
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent input from losing focus
            }}
            onClick={() => handleCharacterClick(char)}
            title={`Insert ${char}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FrenchCharacterPicker;

