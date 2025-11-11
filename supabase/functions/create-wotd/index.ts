// Create Word of the Day Entry
// POST endpoint for inserting new WOTD with validation
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface WOTDRequest {
  date: string;
  word_id: string;
  word: string;
  phonetic: string;
  part_of_speech: string;
  translation: string;
  definitions: Array<{
    sense: string;
    text: string;
    register: string;
    example: string;
  }>;
  examples: Array<{
    french: string;
    english: string;
    context: string;
    note?: string;
  }>;
  grammar?: string[];
  collocations?: string[];
  idioms?: Array<{
    expression: string;
    meaning: string;
    level: string;
  }>;
  etymology?: {
    origin: string;
    period: string;
    evolution: string;
    note?: string;
  };
  related_words?: Array<{
    word: string;
    translation: string;
    relationship?: string;
  }>;
  difficulty_level: string;
  difficulty_label: string;
  frequency_rank?: string;
  frequency_note?: string;
  usage_notes?: string;
  correct_answer: string;
  wrong_options: string[];
  social_hook?: string;
  generated_by?: string;
  llm_model?: string;
  reviewed?: boolean;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    // Parse request
    const wordData: WOTDRequest = await req.json();

    // Basic validation
    if (!wordData.date || !wordData.word || !wordData.definitions || !wordData.examples) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing required fields: date, word, definitions, examples" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(wordData.date)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid date format. Use YYYY-MM-DD" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate wrong_options length
    if (!wordData.wrong_options || wordData.wrong_options.length !== 3) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "wrong_options must be an array of exactly 3 answers" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if date already has a word
    const { data: existing } = await supabaseAdmin
      .from('word_of_the_day')
      .select('id')
      .eq('date', wordData.date)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `A word already exists for ${wordData.date}. Use update endpoint instead.` 
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert into database
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('word_of_the_day')
      .insert({
        date: wordData.date,
        word_id: wordData.word_id,
        word: wordData.word,
        phonetic: wordData.phonetic,
        part_of_speech: wordData.part_of_speech,
        translation: wordData.translation,
        definitions: wordData.definitions,
        examples: wordData.examples,
        grammar: wordData.grammar || null,
        collocations: wordData.collocations || null,
        idioms: wordData.idioms || null,
        etymology: wordData.etymology || null,
        related_words: wordData.related_words || null,
        difficulty_level: wordData.difficulty_level,
        difficulty_label: wordData.difficulty_label,
        frequency_rank: wordData.frequency_rank || null,
        frequency_note: wordData.frequency_note || null,
        usage_notes: wordData.usage_notes || null,
        correct_answer: wordData.correct_answer,
        wrong_options: wordData.wrong_options,
        social_hook: wordData.social_hook || null,
        generated_by: wordData.generated_by || 'manual',
        llm_model: wordData.llm_model || null,
        reviewed: wordData.reviewed || false,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: insertError.message 
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        data: inserted,
        message: `Word of the Day created for ${wordData.date}: ${wordData.word}`
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } 
      }
    );

  } catch (error) {
    console.error("Error in create-wotd:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } 
      }
    );
  }
});

