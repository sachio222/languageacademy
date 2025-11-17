// Pinterest Pin Title & Description Generator
// For n8n "Generate Pin Metadata" node (after HTML-to-image conversion)

// Get image URL from previous node (Convert HTML to Image - Node 8)
const imageData = $json; // From Node 8: Convert HTML to Image
let imageUrl = imageData.url; // Public URL from cloudflared tunnel

// If URL is null or base64, construct it from filePath + tunnel URL
if (!imageUrl || imageUrl.startsWith("data:image")) {
  console.warn("⚠️ URL is null or base64, constructing from filePath...");

  // Get tunnel URL from Check Tunnel Status node
  const tunnelData = $("Check Tunnel Status").first().json;
  const tunnelUrl = tunnelData.tunnelUrl;

  if (!tunnelUrl) {
    throw new Error("Cannot construct image URL: tunnel URL not available");
  }

  // Extract path parts from filePath
  const filePath = imageData.filePath; // e.g., "/shared/images/languageacademy/socials/2025-11-17-nager/pinterest/2025-11-17-nager-pinterest.png"
  const pathParts = filePath.split("/").filter((part) => part !== "");
  const socialsIndex = pathParts.indexOf("socials");

  if (socialsIndex !== -1) {
    const relativePath = pathParts.slice(socialsIndex + 1).join("/");
    imageUrl = `${tunnelUrl}/images/${relativePath}`;
    console.log("✅ Constructed URL:", imageUrl);
  } else {
    throw new Error(`Cannot construct URL from filePath: ${filePath}`);
  }
}

// Get WOTD data from HTML generation node (Node 6)
const htmlData = $("Generate Pinterest Pin HTML").first().json;
const wotd = htmlData._wotd || htmlData.data; // WOTD data passed through

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
  // Hook (first 75 chars - shown in feed) - Natural, not keyword-stuffed
  `Learn the French ${pos} "${word}" (${phonetic}) meaning "${translation}".`,
  "",
  // Value proposition - Natural and helpful
  `Perfect for ${level} French learners! See how to use "${word}" in real conversations:`,
  "",
  // Examples (adds value, encourages saves)
  `📝 ${example1.french}`,
  `   → ${example1.english}`,
  "",
  `📝 ${example2.french}`,
  `   → ${example2.english}`,
  "",
  // CTA + benefit - Clear value, not spammy
  `Master French vocabulary with daily word lessons. Save this pin to build your French vocabulary library!`,
  "",
  // Learn more - Simple CTA
  `👉 Visit languageacademy.io to practice ${word} and 1000+ French words with interactive exercises.`,
  "",
  // Hashtags (Pinterest recommends 3-5 MAXIMUM - quality over quantity)
  // Focus on most relevant, high-value topics only
  `#LearnFrench #FrenchVocabulary #LanguageLearning #${level}French`,
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

// ============================================
// PINTEREST TOPICS/INTERESTS (Algorithm Optimization)
// ============================================
// Pinterest uses these keywords to categorize and recommend pins
// These aren't directly added via API but inform description optimization
// These are the topics Pinterest's algorithm recognizes for maximum reach

const pinterestTopics = [
  "Learn French",
  "French Language",
  "Language Learning",
  "Study French",
  "French Vocabulary",
  "Educational Resources",
  "Study Tips",
  "Online Learning",
  "Self Study",
  "Language Education",
  pos === "verb"
    ? "French Verbs"
    : pos === "noun"
    ? "French Nouns"
    : "French Grammar",
  level === "A1" || level === "A2"
    ? "French For Beginners"
    : "Intermediate French",
  "Learn Languages",
  "French Culture",
];

// Note field (internal use - helps Pinterest categorize your pins)
// This doesn't display to users but can help with Pinterest's internal categorization
const note = `Language Learning | French ${pos} | ${level} Level | Educational Content | Daily Vocabulary`;

// Primary topics for description emphasis (top 5 most relevant)
const primaryTopics = pinterestTopics.slice(0, 5).join(", ");

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
    board_id: "985936612113891508", // Your actual board ID (NOT the board name!)
    // board_name: boardName, // Reference only, not sent to API

    // Pinterest algorithm optimization
    pinterest_topics: pinterestTopics, // For reference/logging
    primary_topics: primaryTopics, // Top 5 most relevant

    // Keep data for next node
    word: word,
    date: htmlData.date || imageData.date, // Use date from either node
    html: htmlData.html, // Pass HTML through from Node 6
    image_url: imageUrl, // Public URL from Node 8 (Convert HTML to Image)

    // Analytics metadata
    level: level,
    pos: pos,

    // Debug info
    title_length: finalTitle.length,
    description_length: description.length,
    hashtag_count: (description.match(/#/g) || []).length,
    topic_keywords: pinterestTopics.length,
  },
};
