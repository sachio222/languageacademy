// Get Used WOTD Words - Check what's already been featured
// GET endpoint to prevent duplicates
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    // Get all used words
    const { data: words, error } = await supabaseAdmin
      .from('word_of_the_day')
      .select('word_id, word, date, translation')
      .order('date', { ascending: false });

    if (error) {
      console.error("Query error:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error.message 
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get list of used word_ids for easy checking
    const usedWordIds = words.map(w => w.word_id);
    const usedWords = words.map(w => w.word);
    const usedDates = words.map(w => w.date);

    return new Response(
      JSON.stringify({ 
        success: true,
        total: words.length,
        used_word_ids: usedWordIds,
        used_words: usedWords,
        used_dates: usedDates,
        all_entries: words
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } 
      }
    );

  } catch (error) {
    console.error("Error in get-used-words:", error);
    
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

