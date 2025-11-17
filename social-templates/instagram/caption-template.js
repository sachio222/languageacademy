// Instagram Caption Generator
// For n8n "Generate Instagram Caption" node
// Placement: After "Collect Image URLs"

const data = $json;
const wotdData = $("When Executed by Another Workflow").first().json.data;

const word = data.word || wotdData.word;
const pos = wotdData.part_of_speech;
const level = wotdData.difficulty_level;
const socialHook = wotdData.social_hook || `How well do you know "${word}"?`;

// Algorithm-optimized caption structure - build with actual newlines, not template literal newlines
const captionParts = [
  `🇫🇷 French Word of the Day: ${word}`,
  "",
  socialHook,
  "",
  "Swipe through to discover:",
  "✨ The meaning",
  "📝 Real examples",
  "💡 How to use it",
  "",
  `Level: ${level} • ${pos}`,
  "",
  "Ready to master French? Visit the link in bio! 👆",
  "",
  "━━━━━━━━━━━━━━━━",
  "#FrenchLanguage #LearnFrench #FrenchVocabulary #LanguageLearning #FrenchWords #StudyFrench #FrenchLearning #LanguageAcademy #WOTD #WordOfTheDay #FrenchLessons #SpeakFrench #FrenchGrammar #LearnLanguages #PolyglotLife #LanguageLovers #FrenchStudy #BilingualLife #FrenchTeacher #LanguageGoals",
];

const caption = captionParts.join("\n");

// Instagram best practices applied:
// - Hook in first line (emoji + clear value prop)
// - Line breaks for readability (algorithm favors longer captions with breaks)
// - Emojis (but not excessive - 5-7 total)
// - Clear CTA
// - 15-20 relevant hashtags (optimal for reach)
// - Mix of popular and niche hashtags
// - Hashtags at the end (keeps caption clean)

// Suggested location IDs for French content (boosts reach by 30%):
// Paris, France: 213385402 (most popular)
// France: 106315219 (broader reach)
// Use whichever fits your brand better

return {
  json: {
    ...data,
    caption: caption,
    captionLength: caption.length,
    hashtagCount: (caption.match(/#/g) || []).length,
    // Add location for Instagram API
    // location_id: "213385402", // Paris, France
    // location_name: "Paris, France",
  },
};
