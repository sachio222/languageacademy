// Pinterest Pin Title & Description Generator
// For n8n "Generate Pin Metadata" node (after HTML generation)

const data = $json; // From previous node (HTML generation)
const wotd = data._wotd; // WOTD data passed through

const word = wotd.word;
const phonetic = wotd.phonetic || "";
const translation = wotd.translation || "";
const pos = wotd.part_of_speech || "";
const level = wotd.difficulty_level || "";
const examples = wotd.examples || [];

// Get first 2 examples for description
const example1 = examples[0] || { french: "", english: "" };
const example2 = examples[1] || { french: "", english: "" };

// ============================================
// PIN TITLE (100 chars max, SEO-optimized)
// ============================================
// Format: "French Word: [WORD] | Learn [Translation] in French | [Level]"
// Pinterest best practice: Front-load keywords, include level/context

const titleOptions = [
  `French Word: ${word} | Learn "${translation}" in French | ${level}`,
  `${word} - French Vocabulary for ${level} Learners | ${translation}`,
  `Learn French: ${word} (${translation}) | ${level} ${pos}`,
];

// Use first option (most keyword-rich)
const title = titleOptions[0];

// Truncate if over 100 chars (Pinterest displays ~60 chars in feed, 100 max)
const finalTitle = title.length > 100 ? title.substring(0, 97) + "..." : title;

// ============================================
// PIN DESCRIPTION (500 chars optimal, 800 max)
// ============================================
// Pinterest SEO strategy:
// - First 50-75 chars are crucial (shown in feed preview)
// - Include target keywords naturally (French, vocabulary, level)
// - Add value (examples, context)
// - Clear CTA
// - 3-5 relevant hashtags at end

const descriptionParts = [
  // Hook (first 75 chars - shown in feed)
  `Learn the French ${pos} "${word}" (${phonetic}) meaning "${translation}".`,
  "",
  // Value proposition
  `Perfect for ${level} French learners! See how to use "${word}" in real conversations:`,
  "",
  // Examples (adds value, encourages saves)
  `📝 ${example1.french}`,
  `   → ${example1.english}`,
  "",
  `📝 ${example2.french}`,
  `   → ${example2.english}`,
  "",
  // CTA + benefit
  `Master French vocabulary with daily word lessons. Save this pin to build your French vocabulary library!`,
  "",
  // Learn more
  `👉 Visit languageacademy.io to practice ${word} and 1000+ French words with interactive exercises.`,
  "",
  // Hashtags (3-5 focused, keyword-rich)
  `#LearnFrench #FrenchVocabulary #${level}French`,
];

const description = descriptionParts.join("\n");

// ============================================
// PINTEREST PIN LINK (to dedicated WOTD page)
// ============================================
// Format: https://languageacademy.io/?wotd=true&word=[word]-fr
// This creates trackable, shareable landing pages

const wordSlug = word.toLowerCase().replace(/[^a-z0-9]/g, ""); // Clean word for URL
const pinLink = `https://languageacademy.io/?wotd=true&word=${wordSlug}-fr`;

// ============================================
// ALT TEXT (for accessibility + SEO)
// ============================================
// Pinterest uses alt text for SEO and accessibility
// Format: Descriptive, keyword-rich, under 125 chars

const altText = `French vocabulary word "${word}" (${translation}) with pronunciation, examples, and usage guide for ${level} learners.`;

// ============================================
// BOARD SELECTION
// ============================================
// For now: Single board "French Word of the Day"
// Future: Could segment by level (A1, A2, B1...) or category (verbs, nouns...)

const boardName = "French Word of the Day";

// Note: You'll need to get the board_id from Pinterest API
// For now, we'll pass the board name and handle board_id lookup in next node

// Debug logging
console.log("Pin Title:", finalTitle);
console.log("Pin Link:", pinLink);
console.log("Description length:", description.length);

return {
  json: {
    // Pinterest API required fields
    title: finalTitle,
    description: description,
    link: pinLink,
    alt_text: altText,
    board_name: boardName,
    // board_id: "PLACEHOLDER", // Will be set after Pinterest API setup
    
    // Keep data for next node
    word: word,
    date: data.date,
    html: data.html, // Pass HTML through
    image_url: null, // Will be set after image conversion
    
    // Analytics metadata
    level: level,
    pos: pos,
    
    // Debug info
    title_length: finalTitle.length,
    description_length: description.length,
    hashtag_count: (description.match(/#/g) || []).length,
  },
};

