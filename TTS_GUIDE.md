# Text-to-Speech Implementation Guide

## Overview

The Language Academy now includes **free text-to-speech (TTS)** functionality using the Web Speech API. This feature is built into modern browsers and requires no external libraries or API keys.

## Supported Languages

The TTS system supports all the languages needed for this language learning app:

- 🇫🇷 **French** (`fr-FR`)
- 🇬🇧 **English** (`en-US`)
- 🇯🇵 **Japanese** (`ja-JP`)
- 🇪🇸 **Spanish** (`es-ES`)
- 🇳🇱 **Dutch** (`nl-NL`)
- 🇩🇪 **German** (`de-DE`)
- 🇨🇳 **Chinese** (`zh-CN`)

## Where TTS is Available

### 1. Vocabulary Tables

- **Location**: Concept Introduction page & Vocabulary Reference panel
- **Usage**: Click the 🔊 icon next to any French word to hear its pronunciation
- **Language**: Automatically uses French (fr-FR)

### 2. Flashcards (Study Mode)

- **Location**: Flashcard study mode
- **Usage**: Click the 🔊 icon on questions and answers
- **Language**: Automatically detects language (French/English)

### 3. Reading Passages

- **Location**: Reading comprehension modules
- **Usage**: Click the 🔊 button in the passage header to read the entire story aloud
- **Language**: Uses French (fr-FR)

## Browser Support

The Web Speech API is supported by:

- ✅ Chrome/Edge (best support)
- ✅ Safari (good support)
- ✅ Firefox (limited voices)

**Note**: The quality and number of available voices varies by browser and operating system. Chrome/Edge typically offer the best experience.

## Implementation Details

### Components Created

1. **`useSpeech.js`** - Custom React hook for TTS functionality

   - Manages speech synthesis
   - Handles language detection
   - Provides language code mappings

2. **`SpeakButton.jsx`** - Reusable speaker button component
   - Consistent UI across the app
   - Three sizes: small, medium, large
   - Automatic voice selection

### How Language Detection Works

The `detectLanguage()` function uses pattern matching to identify:

- **French**: Accented characters (é, à, ç) and common French words
- **Japanese**: Hiragana, Katakana, and Kanji characters
- **Chinese**: CJK characters (without Japanese kana)
- **Spanish**: Accented characters (á, ñ, ¿, ¡) and Spanish articles
- **German**: Umlauts (ä, ö, ü, ß) and German articles
- **Dutch**: Dutch-specific articles and pronouns
- **English**: Default fallback

### Speech Settings

For optimal language learning:

- **Rate**: 0.9 (slightly slower than normal for better comprehension)
- **Pitch**: 1.0 (normal)
- **Volume**: 1.0 (maximum)

### Voice Selection Priority

The system intelligently selects the best available voice for each language:

1. **Google voices** (Chrome) - Highest quality neural voices
2. **Enhanced/Premium/Neural voices** - Platform-specific high-quality voices
3. **Female voices** - Often more natural sounding (Samantha, Karen, Fiona, etc.)
4. **Avoid robotic voices** - Specifically excludes "Alex", "Fred", "Ralph"
5. **Fallback** - Any available voice for the language

**Note**: Check your browser console to see which voice is being used. The system logs: `Using voice: [Voice Name] ([Language Code])`

## Usage for Developers

### Using the SpeakButton Component

```jsx
import SpeakButton from "./SpeakButton";

// Basic usage
<SpeakButton text="Bonjour" language="fr-FR" size="small" />;

// With auto-detection
import { detectLanguage } from "../hooks/useSpeech";
<SpeakButton text={myText} language={detectLanguage(myText)} size="medium" />;
```

### Using the useSpeech Hook

```jsx
import { useSpeech, LANGUAGE_CODES } from "../hooks/useSpeech";

function MyComponent() {
  const { speak, stop, isSupported } = useSpeech();

  const handleSpeak = () => {
    speak("Bonjour tout le monde", LANGUAGE_CODES.french);
  };

  return <button onClick={handleSpeak}>Speak French</button>;
}
```

## Troubleshooting

### No Sound?

- Check browser compatibility
- Ensure volume is not muted
- Try Chrome/Edge for best results

### Wrong Voice?

- The browser selects voices automatically
- Some browsers have limited voice options
- Voice quality depends on OS language packs

### Voice List Empty?

- The `speechSynthesis.getVoices()` may need time to load
- Some browsers require user interaction before loading voices

## Future Enhancements

Possible improvements:

- Voice selection dropdown (let users choose preferred voice)
- Playback speed control
- Highlight words as they're spoken
- Download audio for offline use
- Custom pronunciation for difficult words
