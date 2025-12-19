# Pronunciation Practice Setup Guide

## Overview

The pronunciation practice feature has been successfully integrated into Language Academy using **Azure Speech Service** for AI-powered phoneme-level pronunciation assessment.

## 🎯 What's Been Implemented

### 1. **Azure Speech SDK Integration** ✅

- Installed `microsoft-cognitiveservices-speech-sdk` package
- Configured for French (fr-FR) pronunciation assessment
- Phoneme-level, word-level, and overall scoring

### 2. **Configuration Files** ✅

- **`src/config/azureConfig.js`** - Azure credentials and assessment settings
- Environment variables for secure credential storage
- Configurable score thresholds and assessment granularity

### 3. **Pronunciation Service** ✅

- **`src/services/pronunciationService.js`** - Complete Azure integration
- Features:
  - Pronunciation assessment with detailed feedback
  - Phoneme-level accuracy scoring
  - Word-level analysis
  - Prosody assessment (rhythm, stress, intonation)
  - Fluency and completeness scoring
  - Human-readable feedback generation
  - Microphone access testing

### 4. **UI Components** ✅

- **`src/components/PronunciationMode.jsx`** - Full-featured UI
  - Recording controls with visual feedback
  - Real-time assessment progress
  - Detailed score breakdown (accuracy, fluency, completeness, prosody)
  - Color-coded feedback (excellent/good/okay/poor)
  - Word-by-word analysis with error detection
  - Try-again functionality
  - Progress tracking (80% completion requirement)

### 5. **Styling** ✅

- **`src/styles/PronunciationMode.css`** - Professional, responsive design
  - Animated recording indicators
  - Score visualization with colored circles and bars
  - Mobile-responsive layout
  - Accessibility-friendly design

### 6. **Test Module** ✅

- **`src/lessons/modules/reference/pronunciation-test.js`**
- Contains 25 essential French words covering:
  - Greetings (bonjour, merci, au revoir)
  - French R sound (rouge, trois, rue)
  - Nasal vowels (bon, vin, un, pain)
  - French U sound (tu, lune, plus)
  - Common verbs (je suis, tu es, il est)
  - Liaison examples (très bien, peut-être)
  - Silent letters (beaucoup, temps, nuit)

### 7. **Integration** ✅

- Added to Reference unit (module 164)
- Enabled in section registry (removed "coming soon" flag)
- Integrated into LessonView routing
- Section progress tracking enabled

---

## 🔧 Setup Instructions

### Step 1: Get Azure Credentials

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new **Speech Service** resource:
   - Click "Create a resource"
   - Search for "Speech"
   - Click "Create"
   - Choose your subscription and resource group
   - Select a region (e.g., East US)
   - Choose pricing tier (Free F0 or Standard S0)
3. Once created, go to **Keys and Endpoint**
4. Copy:
   - **KEY 1** (your subscription key)
   - **Region** (e.g., eastus)

### Step 2: Configure Environment Variables

Create or update your `.env` file in the project root:

```bash
# Azure Speech Service Configuration
VITE_AZURE_SPEECH_KEY=your_key_here
VITE_AZURE_SPEECH_REGION=eastus
```

**Important:**

- Replace `your_key_here` with your actual Azure key
- Replace `eastus` with your actual region
- The `.env` file should NOT be committed to git (already in .gitignore)

### Step 3: Test the Feature

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Navigate to the test module:

   - Open the app
   - Go to **Reference** unit
   - Select **"Pronunciation Test: Essential Words"**
   - Click the **Pronunciation** section

3. Test recording:
   - Allow microphone access when prompted
   - Click "Start Recording"
   - Say a French word (e.g., "bonjour")
   - Click "Stop Recording"
   - View your assessment results!

---

## 📊 Features Breakdown

### Assessment Scores Provided

1. **Pronunciation Score (Overall)**: 0-100

   - Combines all metrics into one score
   - Color-coded feedback (green/yellow/red)

2. **Accuracy Score**: How well you pronounced each sound

   - Phoneme-level analysis
   - Word-level breakdown

3. **Fluency Score**: How smoothly you spoke

   - Natural speaking pace
   - No unnecessary pauses

4. **Completeness Score**: Did you say the whole word?

   - Detects omissions
   - Ensures all syllables pronounced

5. **Prosody Score**: Rhythm, stress, and intonation
   - Native-like speech patterns
   - Proper word stress

### Visual Feedback

- **Score Circle**: Large colored circle with overall score
- **Score Bars**: Individual metrics with colored progress bars
- **Word Analysis**: Each word highlighted with accuracy score
- **Error Detection**: Identifies omissions, insertions, mispronunciations
- **Actionable Tips**: Specific suggestions for improvement

### User Experience

- **Auto-completion**: Completes section after 80% of vocabulary practiced
- **Skip functionality**: Can skip if Azure not configured
- **Error handling**: Graceful fallbacks for API failures
- **Mobile-friendly**: Responsive design for all devices
- **Accessibility**: ARIA labels, keyboard navigation

---

## 🎨 Customization Options

### Score Thresholds

Edit `src/config/azureConfig.js`:

```javascript
thresholds: {
  excellent: 90,  // Native-like pronunciation
  good: 75,       // Very good, clear
  okay: 60,       // Understandable, needs practice
  poor: 0         // Needs significant work
}
```

### Assessment Granularity

Options in `src/config/azureConfig.js`:

- `Phoneme` - Most detailed (current setting)
- `Word` - Word-level only
- `FullText` - Sentence-level

### Enable/Disable Features

```javascript
enableProsody: true,    // Prosody assessment
enableMiscue: true,     // Error detection
```

---

## 💰 Pricing Information

### Azure Speech Service Costs

Based on our previous research:

- **Basic pronunciation**: ~$0.0029 per 8-second recording
- **With prosody**: ~$0.0098 per recording
- **With all features**: ~$0.0234 per recording

### Cost Examples

- 1,000 recordings/month: $2.90 - $23.40
- 10,000 recordings/month: $29 - $234

### Free Tier

Azure offers a free tier:

- **5 hours of audio** per month (approximately 2,250 recordings at 8 seconds each)
- Perfect for testing and small-scale usage

---

## 🔒 Security & Privacy

- API keys stored in environment variables (never committed to git)
- Audio recordings are **not stored** - sent directly to Azure and discarded
- Azure processes audio in real-time and returns scores
- No user audio data is retained by the application
- Complies with Azure's privacy policies

---

## 🐛 Troubleshooting

### "Configuration Required" Error

**Cause**: Azure credentials not set
**Solution**: Add `VITE_AZURE_SPEECH_KEY` and `VITE_AZURE_SPEECH_REGION` to `.env`

### "Microphone access denied" Error

**Cause**: Browser doesn't have microphone permission
**Solution**:

- Check browser settings
- Look for microphone icon in address bar
- Enable microphone access for the site

### "No speech detected" Error

**Cause**: Audio input too quiet or microphone not working
**Solution**:

- Speak louder
- Move closer to microphone
- Check microphone is selected in system settings
- Test microphone in system settings

### "Recognition failed" Error

**Cause**: Azure API error or network issue
**Solution**:

- Check internet connection
- Verify Azure credentials are correct
- Check Azure service status
- Review browser console for detailed errors

### Low Scores Despite Good Pronunciation

**Cause**: Background noise, microphone quality, or audio encoding
**Solution**:

- Use in quiet environment
- Use higher quality microphone
- Speak clearly and at moderate pace
- Ensure proper microphone input level

---

## 🚀 Next Steps

### Immediate

1. **Get Azure credentials** and add to `.env`
2. **Test the feature** with the pronunciation test module
3. **Adjust thresholds** if needed based on user testing

### Future Enhancements

1. **Add to all vocabulary modules** - Enable pronunciation for all lessons
2. **Recording playback** - Let users hear their recordings
3. **Progress tracking** - Show improvement over time
4. **Comparative analysis** - Compare user pronunciation to native speaker
5. **Custom word lists** - Allow users to create practice lists
6. **Offline mode** - Cache assessments when offline (requires different approach)
7. **Speech synthesis comparison** - Play native pronunciation side-by-side

---

## 📚 Reference Documentation

- [Azure Speech Service Docs](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/)
- [Pronunciation Assessment](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/how-to-pronunciation-assessment)
- [Azure Pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/)
- [Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/cognitiveservices-speech-sdk)

---

## ✅ Implementation Checklist

- [x] Install Azure Speech SDK
- [x] Create Azure configuration file
- [x] Create pronunciation service
- [x] Create PronunciationMode component
- [x] Create pronunciation CSS
- [x] Create test module with vocabulary
- [x] Add to reference unit
- [x] Enable in section registry
- [x] Integrate into LessonView
- [ ] **Get Azure credentials** (waiting on you!)
- [ ] **Test the feature**
- [ ] **Adjust settings** based on testing

---

**Status**: ✅ **Ready for testing** - Just add your Azure credentials!

The pronunciation practice feature is fully implemented and ready to use. Once you add your Azure credentials to the `.env` file, users will be able to practice pronunciation with AI-powered feedback on the "Pronunciation Test" module in the Reference section.

