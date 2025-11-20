// Add "aller" as the first Word of the Day entry
// Usage: node add-first-wotd.js
// test
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Complete "aller" data from WOTDHub.jsx
const allerData = {
  date: "2025-11-11", // Today's date
  word_id: "aller-fr",
  word: "aller",
  phonetic: "a.le",
  part_of_speech: "verb",
  translation: "to go",

  definitions: [
    {
      sense: "1",
      text: "To move or travel to a place",
      register: "universal",
      example: "Je vais à Paris",
    },
    {
      sense: "2",
      text: "To express state of health or well-being",
      register: "common",
      example: "Comment allez-vous ?",
    },
    {
      sense: "3",
      text: "To form the immediate future (auxiliary)",
      register: "grammatical",
      example: "Je vais partir",
    },
  ],

  examples: [
    {
      french: "Je vais au cinéma ce soir.",
      english: "I'm going to the cinema tonight.",
      context: "Movement · A1",
      note: "Basic directional usage",
    },
    {
      french: "Comment allez-vous ?",
      english: "How are you?",
      context: "Well-being · A1",
      note: "Formal register",
    },
    {
      french: "Nous allons partir demain.",
      english: "We're going to leave tomorrow.",
      context: "Near future · A2",
      note: "Futur proche construction",
    },
    {
      french: "Ça va bien, merci.",
      english: "It's going well, thanks.",
      context: "Expression · A1",
      note: "Most common greeting response",
    },
    {
      french: "Cette robe vous va parfaitement.",
      english: "This dress suits you perfectly.",
      context: "Fit/suitability · B1",
      note: "Extended meaning",
    },
  ],

  grammar: [
    "Irregular verb · Three stems: all-, v-, ir-",
    "Auxiliary: être (in compound tenses)",
    "Forms futur proche: aller + infinitive",
  ],

  collocations: [
    "aller à pied (walk)",
    "aller en voiture (drive)",
    "aller voir (go see)",
    "aller chercher (fetch)",
    "aller de soi (go without saying)",
  ],

  idioms: [
    {
      expression: "Allez-y !",
      meaning: "Go ahead! Help yourself!",
      level: "A2",
    },
    {
      expression: "Allons-y !",
      meaning: "Let's go! Come on!",
      level: "A2",
    },
    {
      expression: "Aller droit au but",
      meaning: "Get straight to the point",
      level: "B1",
    },
    {
      expression: "Ça va de soi",
      meaning: "That goes without saying",
      level: "B2",
    },
  ],

  etymology: {
    origin: "Latin ambulāre",
    period: "9th century",
    evolution:
      'From Latin "ambulāre" (to walk) → Vulgar Latin "*alāre" → Old French "aler" → Modern French "aller"',
    note: "Highly irregular due to multiple Latin roots preserved in conjugation",
  },

  related_words: [
    { word: "venir", translation: "to come", relationship: "antonym" },
    { word: "partir", translation: "to leave", relationship: "motion" },
    { word: "arriver", translation: "to arrive", relationship: "motion" },
  ],

  difficulty_level: "A1",
  difficulty_label: "A1-C2 · Essential",
  frequency_rank: "#8",
  frequency_note: "8th most common word in French",
  usage_notes:
    "Essential high-frequency verb ranked 8th in all French text. Appears in the top 100 most common words across spoken and written French. Critical for expressing movement, well-being, and future actions. Highly irregular conjugation requires dedicated study at all proficiency levels.",

  // Quiz data
  correct_answer: "to go",
  wrong_options: ["to have", "to want", "to make"],

  // Metadata
  social_hook: "Can you guess this essential French verb?",
  generated_by: "manual",
  reviewed: true,
};

async function addFirstWOTD() {
  console.log('📝 Adding "aller" as first Word of the Day...\n');
  console.log("   Date:", allerData.date);
  console.log("   Word:", allerData.word);
  console.log("   Translation:", allerData.translation);
  console.log("\n🚀 Calling create-wotd endpoint...\n");

  try {
    const { data, error } = await supabase.functions.invoke("create-wotd", {
      body: allerData,
    });

    if (error) {
      console.error("❌ Error creating WOTD:", error);
      console.error("   Details:", JSON.stringify(error, null, 2));
      process.exit(1);
    }

    if (!data.success) {
      console.error("❌ Failed to create WOTD:", data.error);
      process.exit(1);
    }

    console.log("✅ Word of the Day created successfully!");
    console.log("\n📊 Result:");
    console.log("   ID:", data.data.id);
    console.log("   Date:", data.data.date);
    console.log("   Word:", data.data.word);
    console.log('\n🎉 "aller" is now live as Word of the Day!');
    console.log(
      "\n🔗 View at: http://localhost:5173/?wotd=true&date=" + allerData.date
    );
    console.log("");
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
    console.error("   Stack:", err.stack);
    process.exit(1);
  }
}

addFirstWOTD();
