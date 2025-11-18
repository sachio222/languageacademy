import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const { user_id, module_id } = await req.json();
    
    if (!user_id) {
      return new Response(JSON.stringify({
        success: false,
        error: "user_id parameter required"
      }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    // Get user profile info
    const { data: userProfile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('email, first_name, streak_days')
      .eq('id', user_id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      return new Response(JSON.stringify({
        success: false,
        error: "User not found"
      }), { status: 404 });
    }

    // Get module progress stats
    const { data: progressData, error: progressError } = await supabaseAdmin
      .from('module_progress')
      .select('module_id, score, completed_at')
      .eq('user_id', user_id)
      .eq('completed', true)
      .order('completed_at', { ascending: false });

    if (progressError) {
      console.error('Progress error:', progressError);
    }

    const completedModules = progressData || [];
    const patternsCompleted = completedModules.length;
    
    // Calculate top 100 coverage (rough estimate: 2% per module for first 50 modules)
    const top100Coverage = Math.min(100, Math.floor(patternsCompleted * 1.8));
    
    // Calculate possible combinations (exponential growth, but reasonable)
    const possibleCombinations = Math.min(10000, Math.pow(patternsCompleted + 1, 2) * 8);
    
    // Get recent performance stats
    const { data: exerciseData, error: exerciseError } = await supabaseAdmin
      .from('exercise_completions')
      .select('is_correct, attempt_number, completed_at')
      .eq('user_id', user_id)
      .gte('completed_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days
      .order('completed_at', { ascending: false })
      .limit(100);

    let retentionRate = 75; // Default
    let firstTryAccuracy = 70; // Default
    
    if (exerciseData && exerciseData.length > 0) {
      // Calculate retention rate (% correct overall)
      const correctAnswers = exerciseData.filter(ex => ex.is_correct).length;
      retentionRate = Math.round((correctAnswers / exerciseData.length) * 100);
      
      // Calculate first-try accuracy
      const firstTryExercises = exerciseData.filter(ex => ex.attempt_number === 1);
      if (firstTryExercises.length > 0) {
        const firstTryCorrect = firstTryExercises.filter(ex => ex.is_correct).length;
        firstTryAccuracy = Math.round((firstTryCorrect / firstTryExercises.length) * 100);
      }
    }

    // Get last score
    const lastScore = completedModules.length > 0 ? completedModules[0].score || 85 : 85;
    
    // Calculate current position
    const currentModule = completedModules.length > 0 ? Math.max(...completedModules.map(m => m.module_id)) + 1 : 1;
    const currentUnit = Math.ceil(currentModule / 12);
    
    // Calculate progress percentage (rough estimate)
    const totalModules = 150; // Approximate total modules
    const progressPercentage = Math.min(100, Math.round((patternsCompleted / totalModules) * 100));

    return new Response(JSON.stringify({
      success: true,
      data: {
        // User info
        user_id: user_id,
        email: userProfile.email,
        first_name: userProfile.first_name,
        
        // Progress stats
        patterns_mastered: patternsCompleted,
        top_100_coverage: top100Coverage,
        possible_combinations: possibleCombinations,
        current_module: currentModule,
        current_unit: currentUnit,
        progress_percentage: progressPercentage,
        
        // Performance stats
        last_score: lastScore,
        days_streak: userProfile.streak_days || 0,
        retention_rate: retentionRate,
        first_try_accuracy: firstTryAccuracy,
        
        // Calculated fields for emails
        capabilities_count: Math.floor(patternsCompleted * 1.2), // Rough estimate
        modules_until_milestone: Math.max(1, (Math.ceil(currentModule / 5) * 5) - currentModule),
        next_milestone: `Unit ${Math.ceil(currentModule / 12)} Complete`,
        
        // Comparison data for pace reassurance
        comparison_low: Math.max(1, currentModule - 10),
        comparison_high: currentModule + 15,
        average_retention: 75,
        average_accuracy: 70,
        trend_direction: retentionRate > 75 ? "Improving" : "Steady",
        trend_color: retentionRate > 75 ? "#22c55e" : "#3b82f6",
        trend_icon: retentionRate > 75 ? "📈" : "➡️"
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });

  } catch (error) {
    console.error('Error in get-user-email-stats:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
});
